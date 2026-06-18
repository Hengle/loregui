import { useCallback, useState } from "react";
import { api } from "../../api";

type Step = "idle" | "starting" | "running" | "error";

/**
 * ServiceSetup — onboarding wizard step that starts the Lore service
 * via api.serviceStart() with an optional Windows autorun install.
 *
 * Uses inline styles referencing CSS variables from styles.css so it
 * renders correctly even before the onboarding shell adds dedicated
 * onboarding CSS classes.
 */
export default function ServiceSetup() {
  const [step, setStep] = useState<Step>("idle");
  const [installAutorun, setInstallAutorun] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleStart = useCallback(async () => {
    try {
      setStep("starting");
      setError(null);
      await api.serviceStart(installAutorun);
      setStep("running");
    } catch (e) {
      setError(typeof e === "string" ? e : JSON.stringify(e));
      setStep("error");
    }
  }, [installAutorun]);

  const handleReset = useCallback(() => {
    setStep("idle");
    setError(null);
  }, []);

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>Start Lore Service</h2>
      <p style={styles.description}>
        The Lore service handles repository synchronization and background
        operations. Start the service now to continue setup.
      </p>

      {step !== "running" && (
        <label style={styles.checkbox}>
          <input
            type="checkbox"
            checked={installAutorun}
            onChange={(e) => setInstallAutorun(e.target.checked)}
            disabled={step === "starting"}
          />
          <span>Install as Windows service / autorun on login</span>
        </label>
      )}

      {error && <div style={styles.errorBox}>{error}</div>}

      {step === "idle" && (
        <button style={styles.primaryButton} onClick={handleStart}>
          Start Service
        </button>
      )}

      {step === "starting" && (
        <button style={{ ...styles.primaryButton, ...styles.disabledButton }} disabled>
          Starting&hellip;
        </button>
      )}

      {step === "running" && (
        <div style={styles.successRow}>
          <span style={styles.successIcon}>&#10003;</span>
          <span>Service is running</span>
          <button style={styles.button} onClick={handleReset}>
            Back
          </button>
        </div>
      )}

      {step === "error" && (
        <button style={styles.primaryButton} onClick={handleStart}>
          Retry
        </button>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: "var(--panel)",
    border: "1px solid var(--border)",
    borderRadius: "10px",
    padding: "24px",
    maxWidth: "480px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  heading: {
    fontSize: "16px",
    fontWeight: 700,
    margin: "0 0 4px",
  },
  description: {
    margin: "0 0 8px",
    color: "var(--muted)",
    fontSize: "13px",
    lineHeight: 1.6,
  },
  checkbox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: "var(--text)",
    cursor: "pointer",
  },
  errorBox: {
    background: "rgba(248,81,73,0.12)",
    color: "var(--red)",
    padding: "10px 14px",
    borderRadius: "6px",
    fontSize: "12px",
    whiteSpace: "pre-wrap",
    border: "1px solid rgba(248,81,73,0.25)",
  },
  primaryButton: {
    background: "var(--accent)",
    borderColor: "var(--accent)",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    border: "none",
    alignSelf: "flex-start",
  },
  button: {
    background: "var(--panel2)",
    color: "var(--text)",
    border: "1px solid var(--border)",
    borderRadius: "6px",
    padding: "4px 10px",
    cursor: "pointer",
    fontSize: "12px",
  },
  disabledButton: {
    opacity: 0.4,
    cursor: "not-allowed",
  },
  successRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "var(--green)",
    fontSize: "14px",
    fontWeight: 600,
  },
  successIcon: {
    color: "var(--green)",
    fontSize: "18px",
  },
};
