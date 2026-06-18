//! View-model types. Deliberately UI- and transport-agnostic so the same shapes
//! serialize to the Tauri frontend, to StudioBrain, or to anything else.

use serde::{Deserialize, Serialize};

/// How a file differs from the committed revision.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum ChangeKind {
    Added,
    Modified,
    Deleted,
    Renamed,
    Untracked,
}

/// A single changed path in the working tree.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct FileChange {
    pub path: String,
    pub kind: ChangeKind,
    /// True once `stage` has included this path in the next revision.
    pub staged: bool,
}

/// Snapshot of the working tree — what the GUI's main panel renders.
#[derive(Debug, Clone, Default, PartialEq, Eq, Serialize, Deserialize)]
pub struct RepoStatus {
    pub repo_id: String,
    pub branch: String,
    /// Short form of the current revision hash (BLAKE3).
    pub revision: String,
    pub changes: Vec<FileChange>,
    /// Revisions committed locally but not yet pushed.
    pub ahead: u32,
    /// Revisions on the remote not yet synced locally.
    pub behind: u32,
}

impl RepoStatus {
    pub fn staged(&self) -> impl Iterator<Item = &FileChange> {
        self.changes.iter().filter(|c| c.staged)
    }
    pub fn unstaged(&self) -> impl Iterator<Item = &FileChange> {
        self.changes.iter().filter(|c| !c.staged)
    }
}

/// A branch pointer (Lore's mutable KV store).
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Branch {
    pub name: String,
    pub id: String,
    pub latest_revision: String,
    pub is_current: bool,
}

/// One entry in the immutable revision chain.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Revision {
    /// BLAKE3 hash signature of the revision.
    pub hash: String,
    pub message: String,
    pub author: String,
    /// RFC3339 timestamp.
    pub timestamp: String,
    pub parent: Option<String>,
}
