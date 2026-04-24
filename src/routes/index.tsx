import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Plus, Search, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ListingCard } from "@/components/ListingCard";
import { useListings } from "@/lib/listings";
import heroImg from "@/assets/parts-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FRC Parts Exchange — Trade & Donate FIRST Robotics Parts" },
      {
        name: "description",
        content:
          "List, find, and trade FRC robot parts with nearby teams. Cut costs, reduce waste, build community.",
      },
      { property: "og:title", content: "FRC Parts Exchange" },
      {
        property: "og:description",
        content: "Community marketplace for FRC teams to trade and donate robot parts.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const recent = useListings().slice(0, 6);
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero text-hero-foreground">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute -right-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:py-24">
          <div className="flex flex-col justify-center">
            <h1 className="font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              Trade & donate parts with
              <span className="block bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                FRC teams.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/70">
              List a surplus part in under a minute. Browse what nearby teams have. Email the lister directly — no accounts, no friction.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl" className="group">
                <Link to="/list">
                  <Plus /> List a part
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                <Link to="/browse">
                  <Search /> Browse parts
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-primary opacity-20 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-elegant">
              <img
                src={heroImg}
                alt="Flat lay of FRC robot parts: motors, gears, aluminum extrusion, wheels, and wiring"
                width={1536}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — three quick steps */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { icon: Plus, title: "1. Post it", body: "Name, condition, team #, contact email. That's the form." },
            { icon: Search, title: "2. Browse it", body: "Filter by category and search by team or location." },
            { icon: Mail, title: "3. Email the team", body: "Tap Contact and your email opens, prefilled to the lister." },
          ].map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RECENT LISTINGS */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Recent listings</h2>
          <Link to="/browse" className="group inline-flex items-center gap-1 text-sm font-medium hover:text-primary">
            View all <ArrowRight className="h-4 w-4 transition-smooth group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recent.map((l) => <ListingCard key={l.id} listing={l} />)}
        </div>
      </section>
    </>
  );
}
