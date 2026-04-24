import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ListingCard } from "@/components/ListingCard";
import { CATEGORIES, useListings } from "@/lib/listings";

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

function BrowsePage() {
  const listings = useListings();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return listings.filter((l) => {
      if (cat !== "All" && l.category !== cat) return false;
      if (!needle) return true;
      return (
        l.name.toLowerCase().includes(needle) ||
        l.team.includes(needle) ||
        l.location.toLowerCase().includes(needle)
      );
    });
  }, [listings, q, cat]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">Browse parts</h1>
          <p className="mt-1 text-muted-foreground">{filtered.length} {filtered.length === 1 ? "listing" : "listings"}</p>
        </div>
        <Button asChild variant="hero">
          <Link to="/list"><Plus /> List a part</Link>
        </Button>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search parts, team #, or location"
            className="pl-9"
          />
        </div>
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="flex h-9 rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:w-56"
        >
          <option value="All">All categories</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-border bg-muted/40 p-10 text-center">
          <p className="text-sm text-muted-foreground">No listings match your filters.</p>
          <Button asChild variant="hero" className="mt-4">
            <Link to="/list"><Plus /> List the first one</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((l) => <ListingCard key={l.id} listing={l} />)}
        </div>
      )}
    </div>
  );
}