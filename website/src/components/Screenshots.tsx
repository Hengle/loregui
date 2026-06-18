import { Container } from "@/components/ui/Container";
import { AppWindow } from "@/components/mockups/AppWindow";
import { HistoryMockup } from "@/components/mockups/HistoryMockup";
import { BranchesMockup } from "@/components/mockups/BranchesMockup";
import { StatusMockup } from "@/components/mockups/StatusMockup";

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
          {/* Wide: status */}
          <AppWindow title="LoreGUI — Status · feature/boss-ai">
            <StatusMockup />
          </AppWindow>

          {/* Two-up: history + branches */}
          <div className="grid gap-8 lg:grid-cols-2">
            <AppWindow title="LoreGUI — History">
              <HistoryMockup />
            </AppWindow>
            <AppWindow title="LoreGUI — Branches & Locks">
              <BranchesMockup />
            </AppWindow>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-brand-muted">
          Interface mockups. Real product screenshots land with the first public
          release.
        </p>
      </Container>
    </section>
  );
}
