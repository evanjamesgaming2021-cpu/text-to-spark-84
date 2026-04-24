import { Link } from "@tanstack/react-router";
import { Cog } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
                <Cog className="h-5 w-5" strokeWidth={2.5} />
              </span>
              <span className="font-display text-lg font-bold">FRC Parts Exchange</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              A community-driven marketplace for FIRST Robotics teams to share parts, cut costs, and build together.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Platform</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/browse" className="hover:text-foreground">Browse parts</Link></li>
              <li><Link to="/how-it-works" className="hover:text-foreground">How it works</Link></li>
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Community</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Guidelines</li>
              <li>Contact</li>
              <li>Terms</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} FRC Parts Exchange. Built by the community, for the community.</p>
          <p className="font-mono-tabular">Not affiliated with FIRST®</p>
        </div>
      </div>
    </footer>
  );
}