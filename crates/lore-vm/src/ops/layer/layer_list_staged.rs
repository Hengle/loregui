//! `layer layer_list_staged` operation — binds `lore::layer::layer_list_staged`.
//!
//! Lists configured layers that have staged changes, returning the target path,
//! source repository ID, and staged file count for each layer with pending changes.

use crate::api::LoreApi;
use crate::collect::collect_events;
use crate::error::{LoreError, Result};

use lore::layer::LoreLayerListStagedArgs;
use serde::{Deserialize, Serialize};

/// Arguments for [`layer_list_staged`].
///
/// Empty struct — the upstream lore API takes no parameters for this operation.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LayerListStagedArgs {}

impl LayerListStagedArgs {
    fn into_lore(self) -> LoreLayerListStagedArgs {
        LoreLayerListStagedArgs {}
    }
}

/// A single layer entry with staged changes.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LayerStagedEntry {
    /// Path in the outer repository where the layer is placed.
    pub target_path: String,
    /// Identifier of the source repository.
    pub source_repository: String,
    /// Number of staged files in the layer.
    pub staged_file_count: u64,
}

/// Result returned on successful `layer_list_staged` call.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LayerListStagedResult {
    /// List of layers with staged changes.
    pub entries: Vec<LayerStagedEntry>,
}

/// Lists configured layers that have staged changes.
///
/// Calls the upstream `lore::layer::layer_list_staged` in-process and collects
/// all `LayerStagedEntry` events to return a typed result. Used by the CLI to
/// drive the per-layer commit-message prompt.
pub async fn layer_list_staged(
    api: &LoreApi,
    args: LayerListStagedArgs,
) -> Result<LayerListStagedResult> {
    let (callback, rx) = collect_events();

    let status =
        lore::layer::layer_list_staged(api.globals().build(), args.into_lore(), callback).await;

    let stream = rx
        .await
        .map_err(|e| LoreError::CommandFailed(format!("event stream cancelled: {e}")))?;

    if !stream.is_ok() {
        return Err(LoreError::CommandFailed(stream.error.unwrap_or_else(
            || format!("layer_list_staged failed with status {status}"),
        )));
    }

    let entries = stream
        .layer_staged_entries()
        .into_iter()
        .map(|(target_path, source_repository, staged_file_count)| LayerStagedEntry {
            target_path,
            source_repository,
            staged_file_count,
        })
        .collect();

    Ok(LayerListStagedResult { entries })
}
