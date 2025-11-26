import { describe, it } from "node:test";
import assert from "node:assert";
import {
  buildFSTreeFromDirectories,
  DirectoryTreeNode,
  findNodeByPath,
  markChildrenLoaded,
  mergeDirectoriesIntoTree,
  filterDirectoriesByParent,
} from "./directories";
import { Directory } from "@/generated/slskd-api";

describe("buildFSTreeFromDirectories", () => {
  it("should create an empty tree for an empty array", () => {
    const result = buildFSTreeFromDirectories([]);

    assert.strictEqual(result.node, "");
    assert.strictEqual(result.children.size, 0);
  });

  it("should skip directories with no name", () => {
    const directories: Directory[] = [{ name: undefined }, { name: "" }];
    const result = buildFSTreeFromDirectories(directories);

    assert.strictEqual(result.children.size, 0);
  });

  it("should build a tree with a single directory", () => {
    const directories: Directory[] = [{ name: "folder1" }];
    const result = buildFSTreeFromDirectories(directories);

    assert.strictEqual(result.children.size, 1);
    assert.strictEqual(result.children.has("folder1"), true);

    const folder1 = result.children.get("folder1");
    assert.strictEqual(folder1?.node, "folder1");
    assert.strictEqual(folder1?.children.size, 0);
  });

  it("should build a tree with nested directories", () => {
    const directories: Directory[] = [{ name: "parent/child" }];
    const result = buildFSTreeFromDirectories(directories);

    assert.strictEqual(result.children.size, 1);
    assert.strictEqual(result.children.has("parent"), true);

    const parent = result.children.get("parent");
    assert.strictEqual(parent?.node, "parent");
    assert.strictEqual(parent?.children.size, 1);

    const child = parent?.children.get("child");
    assert.strictEqual(child?.node, "child");
    assert.strictEqual(child?.children.size, 0);
  });

  it("should build a tree with deeply nested directories", () => {
    const directories: Directory[] = [{ name: "level1/level2/level3/level4" }];
    const result = buildFSTreeFromDirectories(directories);

    const level1 = result.children.get("level1");
    const level2 = level1?.children.get("level2");
    const level3 = level2?.children.get("level3");
    const level4 = level3?.children.get("level4");

    assert.strictEqual(level1?.node, "level1");
    assert.strictEqual(level2?.node, "level2");
    assert.strictEqual(level3?.node, "level3");
    assert.strictEqual(level4?.node, "level4");
    assert.strictEqual(level4?.children.size, 0);
  });

  it("should build a tree with multiple directories at the same level", () => {
    const directories: Directory[] = [{ name: "folder1" }, { name: "folder2" }, { name: "folder3" }];
    const result = buildFSTreeFromDirectories(directories);

    assert.strictEqual(result.children.size, 3);
    assert.strictEqual(result.children.has("folder1"), true);
    assert.strictEqual(result.children.has("folder2"), true);
    assert.strictEqual(result.children.has("folder3"), true);
  });

  it("should merge overlapping directory paths", () => {
    const directories: Directory[] = [{ name: "parent/child1" }, { name: "parent/child2" }];
    const result = buildFSTreeFromDirectories(directories);

    assert.strictEqual(result.children.size, 1);

    const parent = result.children.get("parent");
    assert.strictEqual(parent?.node, "parent");
    assert.strictEqual(parent?.children.size, 2);

    assert.strictEqual(parent?.children.has("child1"), true);
    assert.strictEqual(parent?.children.has("child2"), true);
  });

  it("should handle a complex directory structure", () => {
    const directories: Directory[] = [
      { name: "root/folder1/subfolder1" },
      { name: "root/folder1/subfolder2" },
      { name: "root/folder2" },
      { name: "other/path" },
    ];
    const result = buildFSTreeFromDirectories(directories);

    assert.strictEqual(result.children.size, 2);
    assert.strictEqual(result.children.has("root"), true);
    assert.strictEqual(result.children.has("other"), true);

    const root = result.children.get("root");
    assert.strictEqual(root?.children.size, 2);

    const folder1 = root?.children.get("folder1");
    assert.strictEqual(folder1?.children.size, 2);
    assert.strictEqual(folder1?.children.has("subfolder1"), true);
    assert.strictEqual(folder1?.children.has("subfolder2"), true);

    const folder2 = root?.children.get("folder2");
    assert.strictEqual(folder2?.children.size, 0);
  });

  it("should handle paths with leading slashes", () => {
    const directories: Directory[] = [{ name: "/folder/subfolder" }];
    const result = buildFSTreeFromDirectories(directories);

    assert.strictEqual(result.children.size, 1);
    assert.strictEqual(result.children.has("folder"), true);

    const folder = result.children.get("folder");
    assert.strictEqual(folder?.children.has("subfolder"), true);
  });

  it("should handle paths with trailing slashes", () => {
    const directories: Directory[] = [{ name: "folder/subfolder/" }];
    const result = buildFSTreeFromDirectories(directories);

    assert.strictEqual(result.children.size, 1);
    const folder = result.children.get("folder");
    assert.strictEqual(folder?.children.has("subfolder"), true);
  });

  it("should handle paths with multiple consecutive slashes", () => {
    const directories: Directory[] = [{ name: "folder//subfolder" }];
    const result = buildFSTreeFromDirectories(directories);

    assert.strictEqual(result.children.size, 1);
    const folder = result.children.get("folder");
    assert.strictEqual(folder?.children.has("subfolder"), true);
  });

  it("should create intermediate nodes for nested paths", () => {
    const directories: Directory[] = [{ name: "a/b/c/d" }];
    const result = buildFSTreeFromDirectories(directories);

    const a = result.children.get("a");
    const b = a?.children.get("b");
    const c = b?.children.get("c");
    const d = c?.children.get("d");

    assert.strictEqual(a?.node, "a");
    assert.strictEqual(b?.node, "b");
    assert.strictEqual(c?.node, "c");
    assert.strictEqual(d?.node, "d");
  });

  it("should handle directory appearing both as leaf and parent", () => {
    const directories: Directory[] = [{ name: "parent" }, { name: "parent/child" }];
    const result = buildFSTreeFromDirectories(directories);

    const parent = result.children.get("parent");
    assert.strictEqual(parent?.children.size, 1);

    const child = parent?.children.get("child");
    assert.ok(child);
  });

  it("should handle paths with backslashes (Windows-style)", () => {
    const directories: Directory[] = [{ name: "folder\\subfolder" }];
    const result = buildFSTreeFromDirectories(directories);

    assert.strictEqual(result.children.size, 1);
    assert.strictEqual(result.children.has("folder"), true);

    const folder = result.children.get("folder");
    assert.strictEqual(folder?.children.has("subfolder"), true);
  });

  it("should handle deeply nested backslash paths", () => {
    const directories: Directory[] = [{ name: "C:\\Users\\Documents\\Projects" }];
    const result = buildFSTreeFromDirectories(directories);

    const c = result.children.get("C:");
    const users = c?.children.get("Users");
    const docs = users?.children.get("Documents");
    const projects = docs?.children.get("Projects");

    assert.strictEqual(c?.node, "C:");
    assert.strictEqual(users?.node, "Users");
    assert.strictEqual(docs?.node, "Documents");
    assert.strictEqual(projects?.node, "Projects");
  });

  it("should handle multiple backslash directories", () => {
    const directories: Directory[] = [{ name: "root\\folder1" }, { name: "root\\folder2" }, { name: "other\\path" }];
    const result = buildFSTreeFromDirectories(directories);

    assert.strictEqual(result.children.size, 2);
    assert.strictEqual(result.children.has("root"), true);
    assert.strictEqual(result.children.has("other"), true);

    const root = result.children.get("root");
    assert.strictEqual(root?.children.size, 2);
    assert.strictEqual(root?.children.has("folder1"), true);
    assert.strictEqual(root?.children.has("folder2"), true);
  });

  it("should auto-detect backslash separator when most paths use backslashes", () => {
    const directories: Directory[] = [
      { name: "folder1\\subfolder1" },
      { name: "folder2\\subfolder2" },
      { name: "folder3\\subfolder3" },
      { name: "mixed/path" }, // This one uses forward slash but should be outvoted
    ];
    const result = buildFSTreeFromDirectories(directories);

    // Should detect backslash as separator
    assert.strictEqual(result.children.size, 4);
    assert.strictEqual(result.children.has("folder1"), true);
    assert.strictEqual(result.children.has("folder2"), true);
    assert.strictEqual(result.children.has("folder3"), true);

    const folder1 = result.children.get("folder1");
    assert.strictEqual(folder1?.children.has("subfolder1"), true);
  });

  it("should handle leading backslashes", () => {
    const directories: Directory[] = [{ name: "\\folder\\subfolder" }];
    const result = buildFSTreeFromDirectories(directories);

    assert.strictEqual(result.children.size, 1);
    assert.strictEqual(result.children.has("folder"), true);

    const folder = result.children.get("folder");
    assert.strictEqual(folder?.children.has("subfolder"), true);
  });

  it("should handle trailing backslashes", () => {
    const directories: Directory[] = [{ name: "folder\\subfolder\\" }];
    const result = buildFSTreeFromDirectories(directories);

    assert.strictEqual(result.children.size, 1);
    const folder = result.children.get("folder");
    assert.strictEqual(folder?.children.has("subfolder"), true);
  });

  it("should handle multiple consecutive backslashes", () => {
    const directories: Directory[] = [{ name: "folder\\\\subfolder" }];
    const result = buildFSTreeFromDirectories(directories);

    assert.strictEqual(result.children.size, 1);
    const folder = result.children.get("folder");
    assert.strictEqual(folder?.children.has("subfolder"), true);
  });
});

describe("DirectoryTreeNode.filter", () => {
  it("should return null when filter doesn't match", () => {
    const directories: Directory[] = [{ name: "music/rock" }, { name: "music/jazz" }];
    const tree = buildFSTreeFromDirectories(directories);

    const music = tree.children.get("music");
    const filtered = music?.filter({ name: "classical" });

    assert.strictEqual(filtered, null);
  });

  it("should return the node when its name matches", () => {
    const directories: Directory[] = [{ name: "music/rock" }];
    const tree = buildFSTreeFromDirectories(directories);

    const music = tree.children.get("music");
    const filtered = music?.filter({ name: "music" });

    assert.ok(filtered);
    assert.strictEqual(filtered.node, "music");
  });

  it("should return node when searching for partial name match", () => {
    const directories: Directory[] = [{ name: "music/rock/classic" }];
    const tree = buildFSTreeFromDirectories(directories);

    const music = tree.children.get("music");
    const filtered = music?.filter({ name: "rock" });

    assert.ok(filtered);
    assert.strictEqual(filtered.node, "music");
    assert.strictEqual(filtered.children.size, 1);
    assert.strictEqual(filtered.children.has("rock"), true);
  });

  it("should include all matching children", () => {
    const directories: Directory[] = [
      { name: "music/rock/classic" },
      { name: "music/rock/modern" },
      { name: "music/jazz" },
    ];
    const tree = buildFSTreeFromDirectories(directories);

    const filtered = tree.filter({ name: "rock" });

    assert.ok(filtered);
    // Should have music node that contains matching rock children
    assert.strictEqual(filtered.children.size, 1);

    const music = filtered.children.get("music");
    assert.ok(music);
    assert.strictEqual(music.children.size, 1);
    const rock = music.children.get("rock");
    assert.ok(rock);
    // Both rock/classic and rock/modern match, so both should be included
    assert.strictEqual(rock.children.size, 2);
  });

  it("should exclude non-matching children", () => {
    const directories: Directory[] = [
      { name: "music/rock/classic" },
      { name: "music/jazz" },
      { name: "videos/concerts" },
    ];
    const tree = buildFSTreeFromDirectories(directories);

    const filtered = tree.filter({ name: "rock" });

    assert.ok(filtered);
    assert.strictEqual(filtered.children.size, 1);

    const music = filtered.children.get("music");
    assert.ok(music);
    assert.strictEqual(music.children.has("rock"), true);
    assert.strictEqual(music.children.has("jazz"), false);
  });

  it("should filter deeply nested structures", () => {
    const directories: Directory[] = [
      { name: "media/music/rock/classic/bands" },
      { name: "media/music/jazz" },
      { name: "media/videos" },
    ];
    const tree = buildFSTreeFromDirectories(directories);

    const filtered = tree.filter({ name: "bands" });

    assert.ok(filtered);
    assert.strictEqual(filtered.children.size, 1);

    const media = filtered.children.get("media");
    assert.ok(media);

    const music = media.children.get("music");
    assert.ok(music);

    const rock = music.children.get("rock");
    assert.ok(rock);

    const classic = rock.children.get("classic");
    assert.ok(classic);

    const bands = classic.children.get("bands");
    assert.ok(bands);
  });

  it("should preserve node properties in filtered tree", () => {
    const directories: Directory[] = [
      {
        name: "music/rock",
        files: [{ filename: "song1.mp3" }, { filename: "song2.mp3" }] as any,
      },
    ];
    const tree = buildFSTreeFromDirectories(directories);

    const filtered = tree.filter({ name: "rock" });

    assert.ok(filtered);
    const music = filtered.children.get("music");
    const rock = music?.children.get("rock");

    assert.ok(rock);
    assert.strictEqual(rock.files?.length, 2);
  });

  it("should handle filtering with multiple matching branches", () => {
    const directories: Directory[] = [
      { name: "music/rock/classic" },
      { name: "music/rock/modern" },
      { name: "videos/rock/concerts" },
    ];
    const tree = buildFSTreeFromDirectories(directories);

    const filtered = tree.filter({ name: "rock" });

    assert.ok(filtered);
    assert.strictEqual(filtered.children.size, 2);
    assert.strictEqual(filtered.children.has("music"), true);
    assert.strictEqual(filtered.children.has("videos"), true);

    const music = filtered.children.get("music");
    const musicRock = music?.children.get("rock");
    assert.ok(musicRock);
    assert.strictEqual(musicRock.children.size, 2);

    const videos = filtered.children.get("videos");
    const videosRock = videos?.children.get("rock");
    assert.ok(videosRock);
    assert.strictEqual(videosRock.children.size, 1);
  });

  it("should return null for empty tree when filtering", () => {
    const tree = buildFSTreeFromDirectories([]);
    const filtered = tree.filter({ name: "anything" });

    assert.strictEqual(filtered, null);
  });

  it("should handle case-sensitive filtering", () => {
    const directories: Directory[] = [{ name: "Music/Rock" }];
    const tree = buildFSTreeFromDirectories(directories);

    const filtered = tree.filter({ name: "rock" });

    // Should not match due to case sensitivity
    assert.strictEqual(filtered, null);
  });
});

describe("findNodeByPath", () => {
  it("should return root for empty path", () => {
    const directories: Directory[] = [{ name: "folder1" }];
    const tree = buildFSTreeFromDirectories(directories);

    const found = findNodeByPath(tree, "");
    assert.strictEqual(found, tree);
  });

  it("should find a top-level node", () => {
    const directories: Directory[] = [{ name: "folder1" }, { name: "folder2" }];
    const tree = buildFSTreeFromDirectories(directories);

    const found = findNodeByPath(tree, "folder1");
    assert.ok(found);
    assert.strictEqual(found.node, "folder1");
  });

  it("should find a nested node", () => {
    const directories: Directory[] = [{ name: "parent/child/grandchild" }];
    const tree = buildFSTreeFromDirectories(directories);

    const found = findNodeByPath(tree, "parent/child/grandchild");
    assert.ok(found);
    assert.strictEqual(found.node, "grandchild");
  });

  it("should return null for non-existent path", () => {
    const directories: Directory[] = [{ name: "folder1" }];
    const tree = buildFSTreeFromDirectories(directories);

    const found = findNodeByPath(tree, "nonexistent");
    assert.strictEqual(found, null);
  });

  it("should handle backslash paths", () => {
    const directories: Directory[] = [{ name: "parent\\child" }];
    const tree = buildFSTreeFromDirectories(directories);

    const found = findNodeByPath(tree, "parent\\child");
    assert.ok(found);
    assert.strictEqual(found.node, "child");
  });

  it("should auto-detect separator", () => {
    const directories: Directory[] = [{ name: "parent/child" }];
    const tree = buildFSTreeFromDirectories(directories);

    const found = findNodeByPath(tree, "parent/child");
    assert.ok(found);
    assert.strictEqual(found.node, "child");
  });

  it("should handle explicit separator parameter", () => {
    const directories: Directory[] = [{ name: "parent/child" }];
    const tree = buildFSTreeFromDirectories(directories);

    const found = findNodeByPath(tree, "parent/child", "/");
    assert.ok(found);
    assert.strictEqual(found.node, "child");
  });
});

describe("markChildrenLoaded", () => {
  it("should mark node as having loaded children", () => {
    const directories: Directory[] = [{ name: "parent/child1" }, { name: "parent/child2" }];
    const tree = buildFSTreeFromDirectories(directories);
    const parent = tree.children.get("parent")!;

    assert.strictEqual(parent.childrenLoaded, false);

    markChildrenLoaded(parent);

    assert.strictEqual(parent.childrenLoaded, true);
    assert.strictEqual(parent.hasChildren, true);
  });

  it("should set hasChildren based on actual children", () => {
    const directories: Directory[] = [{ name: "parent" }];
    const tree = buildFSTreeFromDirectories(directories);
    const parent = tree.children.get("parent")!;

    markChildrenLoaded(parent);

    assert.strictEqual(parent.childrenLoaded, true);
    assert.strictEqual(parent.hasChildren, false);
  });
});

describe("mergeDirectoriesIntoTree", () => {
  it("should merge new directories into existing tree", () => {
    const initialDirs: Directory[] = [{ name: "folder1" }];
    const tree = buildFSTreeFromDirectories(initialDirs);

    const newDirs: Directory[] = [{ name: "folder2" }];
    const merged = mergeDirectoriesIntoTree(tree, newDirs);

    assert.strictEqual(merged.children.size, 2);
    assert.strictEqual(merged.children.has("folder1"), true);
    assert.strictEqual(merged.children.has("folder2"), true);
  });

  it("should mark parent as loaded when merging with parentPath", () => {
    const initialDirs: Directory[] = [{ name: "parent" }];
    const tree = buildFSTreeFromDirectories(initialDirs);

    const newDirs: Directory[] = [{ name: "parent/child1" }, { name: "parent/child2" }];
    const merged = mergeDirectoriesIntoTree(tree, newDirs, "parent");

    const parent = merged.children.get("parent")!;
    assert.strictEqual(parent.childrenLoaded, true);
    assert.strictEqual(parent.hasChildren, true);
    assert.strictEqual(parent.children.size, 2);
  });

  it("should mark root as loaded when no parentPath provided", () => {
    const tree = buildFSTreeFromDirectories([]);

    const newDirs: Directory[] = [{ name: "folder1" }, { name: "folder2" }];
    const merged = mergeDirectoriesIntoTree(tree, newDirs);

    assert.strictEqual(merged.childrenLoaded, true);
    assert.strictEqual(merged.hasChildren, true);
  });

  it("should handle deep merges", () => {
    const initialDirs: Directory[] = [{ name: "a/b" }];
    const tree = buildFSTreeFromDirectories(initialDirs);

    const newDirs: Directory[] = [{ name: "a/b/c" }, { name: "a/b/d" }];
    const merged = mergeDirectoriesIntoTree(tree, newDirs, "a/b");

    const b = findNodeByPath(merged, "a/b")!;
    assert.strictEqual(b.childrenLoaded, true);
    assert.strictEqual(b.children.size, 2);
  });
});

describe("filterDirectoriesByParent", () => {
  it("should return root-level directories for empty parent", () => {
    const directories: Directory[] = [{ name: "folder1" }, { name: "folder2" }, { name: "folder3/subfolder" }];

    const filtered = filterDirectoriesByParent(directories, "");

    assert.strictEqual(filtered.length, 2);
    assert.strictEqual(
      filtered.some((d) => d.name === "folder1"),
      true
    );
    assert.strictEqual(
      filtered.some((d) => d.name === "folder2"),
      true
    );
  });

  it("should return direct children of a parent path", () => {
    const directories: Directory[] = [
      { name: "parent/child1" },
      { name: "parent/child2" },
      { name: "parent/child1/grandchild" },
      { name: "other/path" },
    ];

    const filtered = filterDirectoriesByParent(directories, "parent");

    assert.strictEqual(filtered.length, 2);
    assert.strictEqual(
      filtered.some((d) => d.name === "parent/child1"),
      true
    );
    assert.strictEqual(
      filtered.some((d) => d.name === "parent/child2"),
      true
    );
  });

  it("should handle nested parent paths", () => {
    const directories: Directory[] = [{ name: "a/b/c" }, { name: "a/b/d" }, { name: "a/b/c/e" }];

    const filtered = filterDirectoriesByParent(directories, "a/b");

    assert.strictEqual(filtered.length, 2);
    assert.strictEqual(
      filtered.some((d) => d.name === "a/b/c"),
      true
    );
    assert.strictEqual(
      filtered.some((d) => d.name === "a/b/d"),
      true
    );
  });

  it("should handle backslash separator", () => {
    const directories: Directory[] = [
      { name: "parent\\child1" },
      { name: "parent\\child2" },
      { name: "parent\\child1\\grandchild" },
    ];

    const filtered = filterDirectoriesByParent(directories, "parent", "\\");

    assert.strictEqual(filtered.length, 2);
    assert.strictEqual(
      filtered.some((d) => d.name === "parent\\child1"),
      true
    );
    assert.strictEqual(
      filtered.some((d) => d.name === "parent\\child2"),
      true
    );
  });

  it("should auto-detect separator from directories", () => {
    const directories: Directory[] = [{ name: "parent\\child1" }, { name: "parent\\child2" }];

    const filtered = filterDirectoriesByParent(directories, "parent");

    assert.strictEqual(filtered.length, 2);
  });

  it("should handle trailing slashes in parent path", () => {
    const directories: Directory[] = [{ name: "parent/child1" }, { name: "parent/child2" }];

    const filtered = filterDirectoriesByParent(directories, "parent/");

    assert.strictEqual(filtered.length, 2);
  });

  it("should return empty array when no matches", () => {
    const directories: Directory[] = [{ name: "folder1" }, { name: "folder2" }];

    const filtered = filterDirectoriesByParent(directories, "nonexistent");

    assert.strictEqual(filtered.length, 0);
  });

  it("should skip directories with no name", () => {
    const directories: Directory[] = [{ name: undefined }, { name: "" }, { name: "folder1" }];

    const filtered = filterDirectoriesByParent(directories, "");

    assert.strictEqual(filtered.length, 1);
    assert.strictEqual(filtered[0].name, "folder1");
  });
});

describe("DirectoryTreeNode.toPlain and fromPlain", () => {
  it("should serialize and deserialize a tree structure", () => {
    const directories: Directory[] = [
      { name: "Music/Rock/Beatles", files: [{ filename: "song1.mp3" } as any] },
      { name: "Music/Rock/Stones", files: [{ filename: "song2.mp3" } as any] },
      { name: "Music/Jazz", files: [{ filename: "jazz1.mp3" } as any] },
      { name: "Videos" },
    ];

    const originalTree = buildFSTreeFromDirectories(directories);

    // Serialize to plain object
    const plain = originalTree.toPlain();

    // Verify plain object structure
    assert.strictEqual(plain.node, "");
    assert.ok(Array.isArray(plain.children));
    assert.strictEqual(plain.children.length, 2); // Music and Videos

    // Deserialize back to tree
    const restoredTree = DirectoryTreeNode.fromPlain(plain);

    // Verify structure is preserved
    assert.strictEqual(restoredTree.node, "");
    assert.strictEqual(restoredTree.children.size, 2);

    const music = restoredTree.children.get("Music");
    assert.ok(music);
    assert.strictEqual(music.node, "Music");
    assert.strictEqual(music.children.size, 2);

    const rock = music.children.get("Rock");
    assert.ok(rock);
    assert.strictEqual(rock.node, "Rock");
    assert.strictEqual(rock.children.size, 2);

    const beatles = rock.children.get("Beatles");
    assert.ok(beatles);
    assert.strictEqual(beatles.node, "Beatles");
    assert.strictEqual(beatles.name, "Music/Rock/Beatles");
    assert.strictEqual(beatles.files?.length, 1);
    assert.strictEqual(beatles.files?.[0].filename, "song1.mp3");

    const stones = rock.children.get("Stones");
    assert.ok(stones);
    assert.strictEqual(stones.node, "Stones");
    assert.strictEqual(stones.files?.[0].filename, "song2.mp3");

    const jazz = music.children.get("Jazz");
    assert.ok(jazz);
    assert.strictEqual(jazz.node, "Jazz");
    assert.strictEqual(jazz.files?.[0].filename, "jazz1.mp3");

    const videos = restoredTree.children.get("Videos");
    assert.ok(videos);
    assert.strictEqual(videos.node, "Videos");
    assert.strictEqual(videos.children.size, 0);

    // Verify parent references are set correctly
    assert.strictEqual(music.parent, restoredTree);
    assert.strictEqual(rock.parent, music);
    assert.strictEqual(beatles.parent, rock);
  });
});
