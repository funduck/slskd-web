# Search Files Implementation

## Overview
This implementation provides a file search page for the slskd-web application, allowing users to search for files across the Soulseek network.

## Files Created

### `/app/search_files/SearchContext.tsx`
- React Context provider for managing search state
- Handles search queries, responses, loading states, and file selection
- Provides methods to perform searches and manage selected files
- Includes UUID generation utility for search IDs

### `/app/search_files/actions.ts`
- Server actions for interacting with the slskd Searches API
- `searchFilesAction()` - Initiates a new search request
- `getSearchResultsAction()` - Fetches results for a specific search
- `getAllSearchesAction()` - Gets list of all searches
- `deleteSearchAction()` - Deletes a search by ID

### `/app/search_files/SearchInput.tsx`
- Search input component with search button
- Supports Enter key to trigger search
- Shows loading state during search

### `/app/search_files/Results.tsx`
- Displays search results grouped by username
- Uses Mantine Accordion for collapsible user sections
- Shows file details in tables (filename, size, bitrate, duration)
- Supports file selection with checkboxes
- Shows summary of results (file count, user count, selected count)

### `/app/search_files/DownloadButton.tsx`
- Download button that appears when files are selected
- Shows count of selected files
- Placeholder for download functionality

### `/app/search_files/page.tsx`
- Main search page component
- Wraps content with SearchProvider
- Layout includes search input, results display, and download button

## Files Modified

### `/lib/api-clients.ts`
- Added `SearchesApi` import and export
- Added `searchesApiClient` initialization

## Important Notes

### Asynchronous Search API
The slskd search API is **asynchronous**:
- `POST /api/v0/searches` initiates a search but returns immediately (void)
- Results must be fetched separately via `GET /api/v0/searches/{id}?includeResponses=true`
- The current implementation initiates the search but **does not yet poll for results**

### TODO: Implement Result Polling
To make the search fully functional, you need to implement one of these approaches:

1. **Polling Approach**: 
   - After initiating search, periodically call `getSearchResultsAction()` 
   - Update the SearchContext with results as they arrive
   - Stop polling when search is complete

2. **WebSocket/SSE Approach**:
   - Use real-time connection to receive search updates
   - More efficient than polling
   - Provides better user experience

### Example Polling Implementation
```typescript
// In SearchContext.tsx, after initiating search:
const pollResults = async (searchId: string) => {
  const pollInterval = setInterval(async () => {
    const results = await getSearchResultsAction(token!, searchId);
    if (typeof results !== "string") {
      // Process and update responses
      updateResponses(results);
      
      // Check if search is complete and stop polling
      if (results.isComplete) {
        clearInterval(pollInterval);
      }
    }
  }, 2000); // Poll every 2 seconds
};
```

## UI Features

- Clean, modern interface using Mantine components
- Responsive design
- File selection with checkboxes
- Grouped results by username
- File metadata display (size, bitrate, duration)
- Loading states
- Error handling

## Integration

The search page is already integrated into the navigation (Navigation.tsx already had the link).

## Next Steps

1. **Implement result polling** in SearchContext to fetch actual search results
2. **Implement download functionality** in DownloadButton
3. **Add advanced search options** (filters, limits, timeouts)
4. **Add search history** management
5. **Add ability to stop/cancel** ongoing searches
6. **Improve error handling** with user-friendly messages
7. **Add pagination** for large result sets
8. **Add sorting and filtering** of results
