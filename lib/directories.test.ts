import { describe, it } from "node:test";
import assert from "node:assert";
import { buildFSTreeFromDirectories } from "./directories";
import { Directory } from "@/generated/slskd-api";

describe("buildFSTreeFromDirectories", () => {
  it("should create an empty tree for an empty array", () => {
    const result = buildFSTreeFromDirectories([]);

    assert.strictEqual(result.node, undefined);
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
