import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { AppWindow } from "@/components/mockups/AppWindow";

export function Screenshots() {
  return (
    <section id="screens" className="py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-text-bright sm:text-4xl">
            Your whole repo, made legible
          </h2>
          <p className="mt-4 text-lg text-brand-muted">
            One window for status, history and branches — purpose-built for
            projects where the binaries are bigger than the code.
          </p>
        </div>

        <div className="mt-16 grid gap-8">
          {/* Wide: full app — status + branches + history */}
          <AppWindow title="LoreGUI — astral-engine · feature/boss-ai">
            <Image
              src="/screenshots/app-full.png"
              alt="LoreGUI desktop app: branches, staged and unstaged changes, commit box, and revision history side by side."
              width={2880}
              height={1240}
              className="w-full"
              priority
            />
          </AppWindow>

          {/* Two-up: status close-up + history */}
          <div className="grid items-start gap-8 lg:grid-cols-2">
            <AppWindow title="LoreGUI — Status">
              <Image
                src="/screenshots/app-status.png"
                alt="LoreGUI status view: staged and unstaged file changes with add, modify, delete and untracked markers, and a commit message box."
                width={1080}
                height={962}
                className="w-full"
              />
            </AppWindow>
            <AppWindow title="LoreGUI — History">
              <Image
                src="/screenshots/app-history.png"
                alt="LoreGUI history view: a list of revisions with short hashes, commit messages and authors."
                width={640}
                height={996}
                className="w-full"
              />
            </AppWindow>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-brand-muted">
          Real screenshots of the LoreGUI desktop app.
        </p>
      </Container>
    </section>
  );
}
