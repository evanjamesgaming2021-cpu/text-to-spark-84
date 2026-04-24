import { Link } from "@tanstack/react-router";
import { Cog } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
              <Cog className="h-4 w-4" strokeWidth={2.5} />
            </span>
            <span className="font-display text-sm font-bold">FRC Parts Exchange</span>
          </div>
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/browse" className="hover:text-foreground">Browse</Link>
            <Link to="/list" className="hover:text-foreground">List a part</Link>
          </nav>
        </div>
        <div className="mt-6 flex flex-col items-start justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} FRC Parts Exchange. Built by the community, for the community.</p>
          <p className="font-mono-tabular">Not affiliated with FIRST®</p>
        </div>
      </div>
    </footer>
  );
}