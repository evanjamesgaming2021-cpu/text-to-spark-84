import { createFileRoute } from "@tanstack/react-router";
import { Search, MapPin, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/browse")({
  head: () => ({
    meta: [
      { title: "Browse Parts — FRC Parts Exchange" },
      { name: "description", content: "Search FRC robot parts listed by teams near you. Filter by category, condition, and distance." },
      { property: "og:title", content: "Browse FRC Parts" },
      { property: "og:description", content: "Find robot parts listed by FIRST Robotics teams near you." },
    ],
  }),
  component: BrowsePage,
});

const sampleListings = [
  { team: "#2046", name: "NEO Brushless Motor (x2)", category: "Motors", condition: "Used – Excellent", distance: "12 mi", type: "Trade" },
  { team: "#254", name: "Falcon 500 Motor", category: "Motors", condition: "Used – Good", distance: "34 mi", type: "Trade" },
  { team: "#1678", name: "VersaPlanetary Gearbox", category: "Drivetrain", condition: "New", distance: "21 mi", type: "Donation" },
  { team: "#1114", name: "Pneumatic Compressor", category: "Pneumatics", condition: "Used – Good", distance: "55 mi", type: "Trade" },
  { team: "#118", name: "REV Through Bore Encoder", category: "Sensors", condition: "New", distance: "8 mi", type: "Donation" },
  { team: "#33", name: "1×1 Aluminum Extrusion (10ft)", category: "Structural", condition: "Used – Fair", distance: "18 mi", type: "Donation" },
  { team: "#3309", name: "RoboRIO 2.0", category: "Control", condition: "Used – Excellent", distance: "42 mi", type: "Trade" },
  { team: "#3476", name: "Colson Wheels (set of 4)", category: "Wheels", condition: "New", distance: "27 mi", type: "Trade" },
  { team: "#971", name: "Limelight 3", category: "Sensors", condition: "Used – Excellent", distance: "61 mi", type: "Trade" },
];

function BrowsePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
      <div className="mb-10">
        <p className="font-mono-tabular text-xs uppercase tracking-widest text-primary">Marketplace</p>
        <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Browse parts</h1>
        <p className="mt-2 text-muted-foreground">Discover what nearby FRC teams have available right now.</p>
      </div>

      {/* Search bar */}
      <div className="rounded-2xl border border-border bg-card p-4 shadow-card sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search motors, gears, sensors..." className="pl-9" />
          </div>
          <div className="relative w-full lg:w-64">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="ZIP or city" className="pl-9" />
          </div>
          <Button variant="hero" className="lg:w-auto">
            <Search /> Search
          </Button>
          <Button variant="outline">
            <Filter /> Filters
          </Button>
        </div>
      </div>

      {/* Active filters */}
      <div className="mt-5 flex flex-wrap gap-2">
        <Badge variant="secondary" className="rounded-full">Within 50 mi</Badge>
        <Badge variant="secondary" className="rounded-full">All categories</Badge>
        <Badge variant="secondary" className="rounded-full">Any condition</Badge>
      </div>

      {/* Results */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sampleListings.map((l) => (
          <article
            key={l.name}
            className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-card transition-smooth hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elegant"
          >
            <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-gradient-to-br from-secondary to-muted text-accent">
              <span className="font-mono-tabular text-xs uppercase tracking-wider text-muted-foreground">{l.category}</span>
            </div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold leading-tight">{l.name}</h3>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-mono-tabular uppercase tracking-wider ${l.type === "Donation" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"}`}>
                {l.type}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{l.condition}</p>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
              <span className="font-mono-tabular">Team {l.team}</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {l.distance}
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-border bg-muted/40 p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Sample listings shown. Register your team to post and contact other teams.
        </p>
        <Button variant="hero" className="mt-4">Register your team</Button>
      </div>
    </div>
  );
}