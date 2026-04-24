import { Link } from "@tanstack/react-router";
import { Cog } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow transition-smooth group-hover:scale-105">
            <Cog className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            FRC Parts <span className="text-primary">Exchange</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/browse" className="text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground" activeProps={{ className: "text-foreground" }}>
            Browse Parts
          </Link>
          <Link to="/how-it-works" className="text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground" activeProps={{ className: "text-foreground" }}>
            How it Works
          </Link>
          <Link to="/about" className="text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground" activeProps={{ className: "text-foreground" }}>
            About
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Sign in
          </Button>
          <Button size="sm" variant="hero">
            Register team
          </Button>
        </div>
      </div>
    </header>
  );
}