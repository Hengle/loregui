import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import {
  DatabaseIcon,
  CloudDownloadIcon,
  GitCompareIcon,
  LockIcon,
  BoltIcon,
  PlatformsIcon,
} from "@/components/icons";

const features = [
  {
    icon: DatabaseIcon,
    title: "Content-addressed storage",
    description:
      "Every file is chunked and hashed with BLAKE3, so identical data is stored exactly once. Massive repos stay small, and integrity is verifiable down to the chunk.",
  },
  {
    icon: CloudDownloadIcon,
    title: "Sparse, on-demand hydration",
    description:
      "Clone multi-terabyte projects in seconds. LoreGUI hydrates only the files you actually open, streaming the rest on demand instead of pulling the whole history.",
  },
  {
    icon: GitCompareIcon,
    title: "Visual branch, merge & diff",
    description:
      "Read the commit DAG at a glance, compare any two revisions side by side, and resolve merges in a focused three-way view — no command line required.",
  },
  {
    icon: LockIcon,
    title: "File locking for binaries",
    description:
      "Textures, meshes and audio can't be merged. Claim an exclusive lock before you edit, see who holds what in real time, and release with one click when you're done.",
  },
  {
    icon: BoltIcon,
    title: "In-process, no daemon",
    description:
      "LoreGUI binds Lore's native API directly in the same process. No background service to babysit, no IPC round-trips — operations run at native speed.",
  },
  {
    icon: PlatformsIcon,
    title: "Cross-platform, one install",
    description:
      "A single installer for Windows, macOS and Linux. On Windows it can optionally register a service so your team's checkouts stay synced and autorun on boot.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-text-bright sm:text-4xl">
            Built for code <span className="text-brand-muted">and</span> giant
            binary assets
          </h2>
          <p className="mt-4 text-lg text-brand-muted">
            LoreGUI surfaces what makes Lore different from traditional VCS —
            designed for game and film pipelines, not just text files.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} hover>
              <div className="mb-4 inline-flex rounded-lg bg-brand-accent/10 p-3">
                <feature.icon className="h-6 w-6 text-brand-accent" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-brand-text-bright">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
