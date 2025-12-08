"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * State for a single UserFilesBrowser instance
 */
interface UserFilesState {
  /** Currently selected directory path */
  selectedDirectory: string | null;
  /** Set of expanded directory paths */
  expandedDirectories: Set<string>;
}

/**
 * Actions for managing UserFilesBrowser state
 */
interface UserFilesActions {
  selectDirectory: (directory: string | null) => void;
  toggleDirectoryExpansion: (path: string) => void;
}

interface UserFilesContextValue {
  /**
   * Get state and actions for a specific user at the current location
   * @param username - The username to get state for
   * @returns State and actions for this user's file browser
   */
  getUserFilesState: (username: string) => UserFilesState & UserFilesActions;
}

const UserFilesContext = createContext<UserFilesContextValue | undefined>(undefined);

/**
 * Creates a unique key for storing state based on pathname and username
 */
function getStateKey(pathname: string, username: string): string {
  return `${pathname}::${username}`;
}

export function UserFilesProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Store all states indexed by key (pathname::username)
  const [states, setStates] = useState<Map<string, UserFilesState>>(new Map());

  /**
   * Get or initialize state for a specific key from a given states map
   */
  const getOrInitState = useCallback((statesMap: Map<string, UserFilesState>, key: string): UserFilesState => {
    return (
      statesMap.get(key) || {
        selectedDirectory: null,
        expandedDirectories: new Set(),
      }
    );
  }, []);

  /**
   * Update state for a specific key
   */
  const updateState = useCallback(
    (key: string, updater: (prev: UserFilesState) => UserFilesState) => {
      setStates((prevStates) => {
        const newStates = new Map(prevStates);
        const currentState = getOrInitState(prevStates, key);
        newStates.set(key, updater(currentState));
        return newStates;
      });
    },
    [getOrInitState]
  );

  /**
   * Get state and actions for a specific username at current location
   */
  const getUserFilesState = useCallback(
    (username: string): UserFilesState & UserFilesActions => {
      const key = getStateKey(pathname || "/", username);
      const state = getOrInitState(states, key);

      return {
        ...state,

        selectDirectory: (directory: string | null) => {
          console.debug("UserFilesContext selecting directory:", directory);
          updateState(key, (prev) => ({
            ...prev,
            selectedDirectory: directory,
          }));
        },

        toggleDirectoryExpansion: (path: string) => {
          console.debug("UserFilesContext toggling directory expansion for path:", path);
          updateState(key, (prev) => {
            console.debug("UserFilesContext (updateState) toggling directory expansion for path:", path);
            const newExpandedDirectories = new Set(prev.expandedDirectories);
            if (newExpandedDirectories.has(path)) {
              newExpandedDirectories.delete(path);
            } else {
              newExpandedDirectories.add(path);
            }
            return {
              ...prev,
              expandedDirectories: newExpandedDirectories,
            };
          });
        },
      };
    },
    [pathname, states, getOrInitState, updateState]
  );

  return <UserFilesContext.Provider value={{ getUserFilesState }}>{children}</UserFilesContext.Provider>;
}

/**
 * Hook to access UserFiles state for a specific username
 * @param username - The username to get state for
 * @returns State and actions for this user's file browser
 */
export function useUserFiles(username: string) {
  const context = useContext(UserFilesContext);
  if (!context) {
    throw new Error("useUserFiles must be used within UserFilesProvider");
  }
  return context.getUserFilesState(username);
}
