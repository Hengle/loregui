import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function DocsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-brand-text-bright mb-8">
            LoreGUI Documentation
          </h1>
          <div className="space-y-6 text-brand-muted">
            <p>
              Welcome to the LoreGUI documentation. The docs are currently under construction.
              For now, please visit the{" "}
              <a href="/guide" className="text-brand-accent hover:underline">
                User Guide
              </a>{" "}
              for information on using LoreGUI.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
