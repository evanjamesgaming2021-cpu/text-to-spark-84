import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  MapPin,
  Search,
  HandCoins,
  ShieldCheck,
  Cpu,
  Cog,
  Zap,
  Wrench,
  Wind,
  Radar,
  CircuitBoard,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

const stats = [
  { value: "200+", label: "Teams pre-registered" },
  { value: "500+", label: "Parts ready to trade" },
  { value: "50mi", label: "Average match radius" },
];

const features = [
  {
    icon: Search,
    title: "Find parts fast",
    body: "Search by category, condition, and team number. Filter to listings within driving distance of your shop.",
  },
  {
    icon: MapPin,
    title: "Location-aware",
    body: "Set your team's home location once. We surface what's nearby — perfect for pickup before a regional.",
  },
  {
    icon: HandCoins,
    title: "Trade or donate",
    body: "Offer parts in exchange for others, or donate KOP surplus to rookie teams who need a hand.",
  },
  {
    icon: ShieldCheck,
    title: "Verified teams",
    body: "Every account is anchored to an official FRC team number so you know who you're talking to.",
  },
];

const categories = [
  { icon: Zap, name: "Motors & Drive", count: "120+ listings" },
  { icon: Cpu, name: "Electronics", count: "85 listings" },
  { icon: Wind, name: "Pneumatics", count: "60 listings" },
  { icon: Wrench, name: "Structural", count: "210 listings" },
  { icon: Radar, name: "Sensors", count: "44 listings" },
  { icon: CircuitBoard, name: "Control", count: "38 listings" },
  { icon: Cog, name: "Gears & Pulleys", count: "95 listings" },
  { icon: Package, name: "Kit of Parts", count: "150+ listings" },
];

const steps = [
  {
    n: "01",
    title: "Register your team",
    body: "Sign up with your official FRC team number, set your shop location, and you're verified.",
  },
  {
    n: "02",
    title: "List or browse",
    body: "Post surplus parts in minutes with photos and condition. Or browse what nearby teams have.",
  },
  {
    n: "03",
    title: "Connect & exchange",
    body: "Message teams directly through the platform. Coordinate pickup, trade, or donation.",
  },
];

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero text-hero-foreground">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute -right-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              <span className="font-mono-tabular tracking-wider text-white/80">PRE-LAUNCH · BUILD SEASON 2026</span>
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              The marketplace built for
              <span className="block bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                FRC teams.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/70">
              Trade and donate robot parts with nearby FIRST Robotics teams. Cut procurement costs, clear out the storeroom, and help rookie teams compete.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="hero" size="xl" className="group">
                Register your team
                <ArrowRight className="transition-smooth group-hover:translate-x-0.5" />
              </Button>
              <Button asChild variant="outline" size="xl" className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                <Link to="/browse">Browse parts</Link>
              </Button>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-2xl font-bold text-white sm:text-3xl">{s.value}</dt>
                  <dd className="mt-1 text-xs text-white/60 sm:text-sm">{s.label}</dd>
                </div>
              ))}
            </dl>
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
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-hero/90 to-transparent p-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono-tabular text-white/80">TEAM #2046 · BEAR METAL</span>
                  <span className="rounded-full bg-primary/20 px-2 py-0.5 font-mono-tabular text-primary-glow">
                    18 PARTS LISTED
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="max-w-2xl">
          <p className="font-mono-tabular text-xs uppercase tracking-widest text-primary">Why teams use it</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Built around how FRC teams actually work.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every feature is designed for the realities of build season — tight budgets, ticking clocks, and pit-side decisions.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono-tabular text-xs uppercase tracking-widest text-primary">Browse by category</p>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
                Every part of the robot.
              </h2>
            </div>
            <Link
              to="/browse"
              className="group inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary"
            >
              View all listings
              <ArrowRight className="h-4 w-4 transition-smooth group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((c) => (
              <button
                key={c.name}
                className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 text-left transition-smooth hover:border-primary/40 hover:shadow-card"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-accent transition-smooth group-hover:bg-gradient-primary group-hover:text-primary-foreground">
                  <c.icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold">{c.name}</span>
                  <span className="block text-xs text-muted-foreground font-mono-tabular">{c.count}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="max-w-2xl">
          <p className="font-mono-tabular text-xs uppercase tracking-widest text-primary">How it works</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">From listing to handoff in three steps.</h2>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={s.n}
              className="relative rounded-2xl border border-border bg-card p-7 shadow-card"
            >
              <span className="font-display text-5xl font-bold text-primary/20">{s.n}</span>
              <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              {i < steps.length - 1 && (
                <ArrowRight className="absolute right-6 top-7 hidden h-5 w-5 text-muted-foreground/40 md:block" />
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-hero px-6 py-16 text-hero-foreground sm:px-12 sm:py-20">
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
              Ready to clear your shelves — or stock up?
            </h2>
            <p className="mt-4 text-lg text-white/70">
              Join the teams already using FRC Parts Exchange to make the most of every motor, sensor, and screw.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="hero" size="xl">
                Register your team
                <ArrowRight />
              </Button>
              <Button asChild variant="outline" size="xl" className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                <Link to="/how-it-works">Learn more</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
