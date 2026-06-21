//! `branch push` operation — binds `lore::branch::push`.
//!
//! Pushes the current or specified branch and its revisions to the remote.
//! Emits `LoreEvent::BranchPush` on start with branch and revision info.

use crate::api::LoreApi;
use crate::collect::collect_events;
use crate::error::{LoreError, Result};

use lore::branch::LoreBranchPushArgs;
use lore::interface::{LoreEvent, LoreString};
use serde::{Deserialize, Serialize};

/// Arguments for [`push`].
///
/// Mirrors `LoreBranchPushArgs` from the upstream `lore` crate but uses plain
/// `String` so it serialises cleanly across the Tauri boundary.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BranchPushArgs {
    /// Branch to push; empty string defaults to the current branch.
    #[serde(default)]
    pub branch: String,
    /// Allow the server to fast-forward merge if the target branch head has moved.
    #[serde(default)]
    pub fast_forward_merge: bool,
}

impl BranchPushArgs {
    fn into_lore(self) -> LoreBranchPushArgs {
        LoreBranchPushArgs {
            branch: LoreString::from_str(&self.branch),
            fast_forward_merge: u8::from(self.fast_forward_merge),
        }
    }
}

/// Result returned on a successful branch push.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BranchPushResult {
    /// The branch that was pushed.
    pub branch_name: String,
    /// The local revision that was pushed (hex string).
    pub local_revision: String,
    /// The remote revision before the push (hex string).
    pub remote_revision: String,
    /// Number of local revisions that were pushed.
    pub local_history: u64,
    /// True when the local revision was already present on the remote.
    pub already_pushed: bool,
}

/// Push the current or specified branch to the remote.
///
/// Calls the upstream `lore::branch::push` in-process and collects the
/// `BranchPush` event to return a typed result.
pub async fn push(api: &LoreApi, args: BranchPushArgs) -> Result<BranchPushResult> {
    let (callback, rx) = collect_events();

    let status = lore::branch::push(api.globals().build(), args.into_lore(), callback).await;

    let stream = rx
        .await
        .map_err(|e| LoreError::CommandFailed(format!("event stream cancelled: {e}")))?;

    if !stream.is_ok() {
        return Err(LoreError::CommandFailed(stream.error.unwrap_or_else(
            || format!("branch push failed with status {status}"),
        )));
    }

    let data = stream
        .events
        .iter()
        .find_map(|event| {
            if let LoreEvent::BranchPush(data) = event {
                Some(data.clone())
            } else {
                None
            }
        })
        .ok_or_else(|| {
            LoreError::Parse("branch pushed successfully but no BranchPush event emitted".into())
        })?;

    let local_revision = if data.local_revision.is_zero() {
        String::new()
    } else {
        format!("{}", data.local_revision)
    };

    let remote_revision = if data.remote_revision.is_zero() {
        String::new()
    } else {
        format!("{}", data.remote_revision)
    };

    Ok(BranchPushResult {
        branch_name: data.branch_name.as_str().to_string(),
        local_revision,
        remote_revision,
        local_history: data.local_history,
        already_pushed: data.flag_already_pushed != 0,
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn push_args_serializes() {
        let args = BranchPushArgs {
            branch: "main".into(),
            fast_forward_merge: true,
        };
        let json = serde_json::to_string(&args).expect("should serialize");
        assert!(json.contains("main"));
        assert!(json.contains("true"));
    }

    #[test]
    fn push_args_deserializes_with_defaults() {
        let json = r#"{}"#;
        let args: BranchPushArgs = serde_json::from_str(json).expect("should deserialize");
        assert_eq!(args.branch, "");
        assert!(!args.fast_forward_merge);
    }

    #[test]
    fn push_args_into_lore_conversion() {
        let args = BranchPushArgs {
            branch: "feature/x".into(),
            fast_forward_merge: true,
        };
        let lore_args = args.into_lore();
        assert_eq!(lore_args.branch.as_str(), "feature/x");
        assert_eq!(lore_args.fast_forward_merge, 1);
    }

    #[test]
    fn push_args_into_lore_no_ff() {
        let args = BranchPushArgs {
            branch: String::new(),
            fast_forward_merge: false,
        };
        let lore_args = args.into_lore();
        assert_eq!(lore_args.branch.as_str(), "");
        assert_eq!(lore_args.fast_forward_merge, 0);
    }

    #[test]
    fn push_result_serializes() {
        let result = BranchPushResult {
            branch_name: "main".into(),
            local_revision: "abc123".into(),
            remote_revision: "def456".into(),
            local_history: 3,
            already_pushed: false,
        };
        let json = serde_json::to_string(&result).expect("should serialize");
        assert!(json.contains("main"));
        assert!(json.contains("abc123"));
        assert!(json.contains("def456"));
    }
}
