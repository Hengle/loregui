//! `layer layer_add` operation — binds `lore::layer::layer_add`.
//!
//! Adds a layer from a source repository into the current repository at the
//! specified target path. Emits `LoreEvent::LayerAdd` on success containing
//! the target path, source repository, source path, metadata key, and revision.

use crate::api::LoreApi;
use crate::collect::collect_events;
use crate::error::{LoreError, Result};

use lore::interface::LoreEvent;
use lore::interface::LoreString;
use lore::layer::LoreLayerAddArgs;
use serde::{Deserialize, Serialize};

/// Arguments for [`layer_add`].
///
/// Mirrors `LoreLayerAddArgs` from the upstream `lore` crate
/// but uses plain `String` so it serialises cleanly across the Tauri boundary.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LayerAddArgs {
    /// Path in the current repository where the layer should be placed.
    pub target_path: String,
    /// Repository to add as a layer.
    pub source_repository: String,
    /// Path in the layer repository where the layer should start.
    pub source_path: String,
    /// Metadata key to use to match revisions.
    pub metadata: String,
}

impl LayerAddArgs {
    fn into_lore(self) -> LoreLayerAddArgs {
        LoreLayerAddArgs {
            target_path: LoreString::from_str(&self.target_path),
            source_repository: LoreString::from_str(&self.source_repository),
            source_path: LoreString::from_str(&self.source_path),
            metadata: LoreString::from_str(&self.metadata),
        }
    }
}

/// Result returned on successful layer addition.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LayerAddResult {
    /// Path in the outer repository where the layer is placed.
    pub target_path: String,
    /// Identifier of the source repository.
    pub source_repository: String,
    /// Path inside the source repository where the layer starts.
    pub source_path: String,
    /// Metadata key used to match revisions.
    pub metadata: String,
    /// Revision of the source repository.
    pub revision: String,
}

/// Add a layer from a source repository into the current repository.
///
/// Calls the upstream `lore::layer::layer_add` in-process and collects the
/// `LayerAdd` event to return a typed result.
pub async fn layer_add(api: &LoreApi, args: LayerAddArgs) -> Result<LayerAddResult> {
    let (callback, rx) = collect_events();

    let status = lore::layer::layer_add(api.globals().build(), args.into_lore(), callback).await;

    let stream = rx
        .await
        .map_err(|e| LoreError::CommandFailed(format!("event stream cancelled: {e}")))?;

    if !stream.is_ok() {
        return Err(LoreError::CommandFailed(stream.error.unwrap_or_else(
            || format!("layer_add failed with status {status}"),
        )));
    }

    let layer_add_event = stream
        .events
        .iter()
        .find_map(|e| {
            if let LoreEvent::LayerAdd(data) = e {
                Some(data)
            } else {
                None
            }
        })
        .ok_or_else(|| {
            LoreError::Parse("layer_add succeeded but no LayerAdd event emitted".into())
        })?;

    Ok(LayerAddResult {
        target_path: layer_add_event.target_path.as_str().to_string(),
        source_repository: format!("{}", layer_add_event.source_repository),
        source_path: layer_add_event.source_path.as_str().to_string(),
        metadata: layer_add_event.metadata.as_str().to_string(),
        revision: format!("{}", layer_add_event.revision),
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn layer_add_args_deserialise() {
        let json = r#"{
            "target_path": "/layers/assets",
            "source_repository": "https://example.com/repo",
            "source_path": "/content",
            "metadata": "branch"
        }"#;
        let args: LayerAddArgs = serde_json::from_str(json).expect("should deserialize");
        assert_eq!(args.target_path, "/layers/assets");
        assert_eq!(args.source_repository, "https://example.com/repo");
        assert_eq!(args.source_path, "/content");
        assert_eq!(args.metadata, "branch");
    }

    #[test]
    fn layer_add_args_into_lore() {
        let args = LayerAddArgs {
            target_path: "/layers/art".into(),
            source_repository: "https://example.com/art-repo".into(),
            source_path: "/assets".into(),
            metadata: "tag".into(),
        };
        let lore_args = args.into_lore();
        assert_eq!(lore_args.target_path.as_str(), "/layers/art");
        assert_eq!(
            lore_args.source_repository.as_str(),
            "https://example.com/art-repo"
        );
        assert_eq!(lore_args.source_path.as_str(), "/assets");
        assert_eq!(lore_args.metadata.as_str(), "tag");
    }

    #[test]
    fn layer_add_result_serializes() {
        let result = LayerAddResult {
            target_path: "/layers/assets".into(),
            source_repository: "repo-abc123".into(),
            source_path: "/".into(),
            metadata: "branch".into(),
            revision: "def456".into(),
        };
        let json = serde_json::to_string(&result).expect("should serialize");
        assert!(json.contains("/layers/assets"));
        assert!(json.contains("repo-abc123"));
        assert!(json.contains("def456"));
    }
}
