import * as git from 'isomorphic-git';
import { set, get } from 'idb-keyval';

// lingv (languages) + aro (a set of)
const REPO_DIR = 'lingvaro';

// Initialize a Git repository
export async function initRepo() {
  await git.init({ fs: new IndexedDBFS(), dir: REPO_DIR });
  console.log('Git repository initialized in IndexedDB');
}

// Commit changes
export async function commitChanges(message: string) {
  await git.add({ fs: new IndexedDBFS(), dir: REPO_DIR, filepath: '.' });
  const sha = await git.commit({
    fs: new IndexedDBFS(),
    dir: REPO_DIR,
    message,
    author: { name: 'User', email: 'user@example.com' },
  });
  console.log('Commit SHA:', sha);
}

// Read commit history
export async function getCommitHistory() {
  const commits = await git.log({ fs: new IndexedDBFS(), dir: REPO_DIR });
  return commits.map(commit => ({
    message: commit.commit.message,
    author: commit.commit.author.name,
    date: commit.commit.author.timestamp,
  }));
}

// Mock filesystem using IndexedDB
class IndexedDBFS {
  async readFile(filepath: string) {
    return (await get(filepath)) || new Uint8Array();
  }
  async writeFile(filepath: string, data: Uint8Array) {
    await set(filepath, data);
  }
  async unlink(filepath: string) {
    await set(filepath, null);
  }
  async readdir() {
    return [];
  }
}
