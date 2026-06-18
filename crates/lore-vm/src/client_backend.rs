//! In-process adapter over Lore's own `lore-client` crate — no subprocess.
//!
//! This is the architectural destination: linking `lore-client` directly is what
//! lets `lore-vm` become the shared foundation StudioBrain's desktop app embeds
//! (the same way model-manager links in). It's stubbed because the lore-client
//! API is pre-1.0 and must be pinned to an exact rev before wiring.
//!
//! To activate:
//!   1. Uncomment `lore-client` in the workspace Cargo.toml and pin `rev`.
//!   2. Build with `--features client-backend` (drop `cli-backend`).
//!   3. Replace each `todo!()` with the corresponding lore-client call. The trait
//!      method names mirror the CLI verbs, so the mapping is mechanical.

#![cfg(feature = "client-backend")]

use crate::backend::LoreBackend;
use crate::error::{LoreError, Result};
use crate::model::{Branch, RepoStatus, Revision};
use std::path::PathBuf;

pub struct ClientBackend {
    #[allow(dead_code)]
    working_dir: PathBuf,
    // client: lore_client::Client,   // <- hold the real handle here
}

impl ClientBackend {
    pub fn new(working_dir: PathBuf) -> Self {
        Self { working_dir }
    }

    #[allow(dead_code)]
    fn unimplemented(verb: &str) -> LoreError {
        LoreError::Client(format!(
            "client-backend `{verb}` not wired yet — pin lore-client and replace the todo!()"
        ))
    }
}

#[async_trait::async_trait]
impl LoreBackend for ClientBackend {
    async fn status(&self) -> Result<RepoStatus> {
        todo!("map lore_client status -> RepoStatus")
    }
    async fn log(&self, _limit: usize) -> Result<Vec<Revision>> {
        todo!("walk the revision chain -> Vec<Revision>")
    }
    async fn branches(&self) -> Result<Vec<Branch>> {
        todo!("read branch pointers from the mutable KV store")
    }
    async fn stage(&self, _paths: &[String]) -> Result<()> {
        todo!()
    }
    async fn unstage(&self, _paths: &[String]) -> Result<()> {
        todo!()
    }
    async fn commit(&self, _message: &str) -> Result<String> {
        todo!()
    }
    async fn create_branch(&self, _name: &str) -> Result<()> {
        todo!()
    }
    async fn switch_branch(&self, _name: &str) -> Result<()> {
        todo!()
    }
    async fn merge_branch(&self, _name: &str) -> Result<()> {
        todo!()
    }
    async fn push(&self) -> Result<()> {
        todo!()
    }
    async fn sync(&self) -> Result<()> {
        todo!()
    }
    async fn create_repository(&self, _path: PathBuf, _name: &str) -> Result<String> {
        todo!()
    }
    async fn clone(&self, _url: &str, _dest: PathBuf) -> Result<()> {
        todo!()
    }
}
