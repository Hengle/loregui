//! `revision revert_abort` operation — binds `lore::revision::revert_abort`.
//!
//! Aborts an in-progress revert and restores the working directory to its
//! prior state. Takes no arguments beyond the repository context. Emits
//! `RevertAbortBegin` / `RevertAbortEnd` events.

use crate::api::LoreApi;
use crate::collect::collect_events;
use crate::error::{LoreError, Result};

use lore::revision::LoreRevisionRevertAbortArgs;
use serde::{Deserialize, Serialize};

/// Arguments for [`revert_abort`].
///
/// The upstream `LoreRevisionRevertAbortArgs` is an empty struct —
/// only the repository context (provided by `LoreApi`) is needed.
#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct RevertAbortArgs {}

impl RevertAbortArgs {
    fn into_lore(self) -> LoreRevisionRevertAbortArgs {
        LoreRevisionRevertAbortArgs {}
    }
}

/// Result returned on successful revert abort.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RevertAbortResult {
    /// Whether the abort completed successfully.
    pub aborted: bool,
}

/// Abort an in-progress revert operation.
///
/// Calls the upstream `lore::revision::revert_abort` in-process and checks
/// the completion status. Returns success when the revert is fully aborted.
pub async fn revert_abort(api: &LoreApi, args: RevertAbortArgs) -> Result<RevertAbortResult> {
    let (callback, rx) = collect_events();

    let status =
        lore::revision::revert_abort(api.globals().build(), args.into_lore(), callback).await;

    let stream = rx
        .await
        .map_err(|e| LoreError::CommandFailed(format!("event stream cancelled: {e}")))?;

    if !stream.is_ok() {
        return Err(LoreError::CommandFailed(stream.error.unwrap_or_else(
            || format!("revert_abort failed with status {status}"),
        )));
    }

    Ok(RevertAbortResult { aborted: true })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn revert_abort_args_serializes() {
        let args = RevertAbortArgs {};
        let json = serde_json::to_string(&args).expect("should serialize");
        assert_eq!(json, "{}");
    }

    #[test]
    fn revert_abort_args_deserializes() {
        let json = "{}";
        let _args: RevertAbortArgs = serde_json::from_str(json).expect("should deserialize");
    }

    #[test]
    fn revert_abort_args_into_lore_conversion() {
        let args = RevertAbortArgs {};
        let _lore_args = args.into_lore();
    }

    #[test]
    fn revert_abort_result_serializes() {
        let result = RevertAbortResult { aborted: true };
        let json = serde_json::to_string(&result).expect("should serialize");
        assert!(json.contains("true"));
    }

    #[test]
    fn revert_abort_result_deserializes() {
        let json = r#"{"aborted": true}"#;
        let result: RevertAbortResult = serde_json::from_str(json).expect("should deserialize");
        assert!(result.aborted);
    }

    #[test]
    fn revert_abort_args_default() {
        let args = RevertAbortArgs::default();
        let json = serde_json::to_string(&args).expect("should serialize");
        assert_eq!(json, "{}");
    }
}
