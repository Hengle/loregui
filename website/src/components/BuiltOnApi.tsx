import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { CheckIcon, ApiIcon } from "@/components/icons";

const surfaces = [
  "Repository init, clone & config",
  "Staging, commit & amend",
  "Branch, tag & ref management",
  "Three-way merge & rebase",
  "Diff, blame & history queries",
  "Sparse checkout & hydration",
  "Exclusive & shared file locks",
  "Remote sync, fetch & push",
  "Chunk & object-store inspection",
  "Garbage collection & verify",
  "Hooks & policy enforcement",
  "Status, stash & worktrees",
];

const stats = [
  { value: "124", label: "native operations driven" },
  { value: "0", label: "shell-outs to a CLI" },
  { value: "1:1", label: "GUI action ↔ API call" },
];

export function BuiltOnApi() {
  return (
    <section
      id="api"
      className="relative overflow-hidden border-y border-brand-muted/10 bg-brand-deep-light/40 py-20 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/4 top-0 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-brand-gold/5 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Badge variant="gold" className="mb-6">
              <ApiIcon className="mr-1.5 h-4 w-4" />
              Native bindings, not a CLI wrapper
            </Badge>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-text-bright sm:text-4xl">
              Built on the full Lore API
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-muted">
              Most desktop clients scrape the output of a command-line tool and
              break the moment a flag changes. LoreGUI is different: it binds
              Lore&rsquo;s complete native API — all{" "}
              <span className="font-semibold text-brand-text">
                124 operations
              </span>{" "}
              — directly in-process.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-brand-muted">
              That means every capability Lore exposes is reachable from the
              GUI, with structured results, typed errors and progress streams —
              no parsing terminal text, no missing features, no daemon in the
              middle.
            </p>

            <dl className="mt-8 grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-brand-muted/15 bg-brand-surface p-4 text-center"
                >
                  <dt className="font-heading text-2xl font-bold text-brand-accent sm:text-3xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-brand-muted">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-2xl border border-brand-muted/20 bg-brand-surface p-6 shadow-xl shadow-brand-accent/5">
            <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wide text-brand-muted">
              Every surface, reachable
            </h3>
            <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2" role="list">
              {surfaces.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-vapor-green" />
                  <span className="text-sm text-brand-text">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-brand-muted/10 pt-4 text-xs text-brand-muted">
              …and the rest of Lore&rsquo;s native surface, exposed as
              first-class GUI actions.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
