import { createFileRoute, Link } from "@tanstack/react-router";
import { UserPlus, Upload, Search, MessageSquare, Handshake, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — FRC Parts Exchange" },
      { name: "description", content: "Learn how FRC teams register, list parts, search nearby inventory, and connect to trade or donate." },
      { property: "og:title", content: "How FRC Parts Exchange Works" },
      { property: "og:description", content: "From sign-up to handoff — here's how teams trade and donate parts on FRC Parts Exchange." },
    ],
  }),
  component: HowItWorks,
});

const flow = [
  { icon: UserPlus, title: "Register your team", body: "Sign up using your official FRC team number. Confirm your shop's location for nearby matching." },
  { icon: Upload, title: "List your parts", body: "Upload photos, set the condition, and pick trade or donation. Listings go live instantly." },
  { icon: Search, title: "Browse & search", body: "Filter by category, distance, and condition. See what teams in your region have right now." },
  { icon: MessageSquare, title: "Contact the team", body: "Send a message through the platform. No emails exposed — just team-to-team conversations." },
  { icon: Handshake, title: "Trade or pickup", body: "Coordinate the exchange directly. Many teams meet at regionals to keep it easy." },
  { icon: ShieldCheck, title: "Build trust", body: "Successful trades earn badges, helping reliable teams stand out across the community." },
];

function HowItWorks() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:py-24">
      <div className="text-center">
        <p className="font-mono-tabular text-xs uppercase tracking-widest text-primary">How it works</p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">From shop shelf to another team's robot.</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          A simple six-step flow designed around the realities of FRC build season and competition travel.
        </p>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {flow.map((step, i) => (
          <div key={step.title} className="relative rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                <step.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-mono-tabular text-xs text-muted-foreground">STEP {String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl bg-gradient-hero p-10 text-center text-hero-foreground">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">Ready to join the exchange?</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/70">
          Registration takes under a minute. Your team only needs an FRC team number and a contact email.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button variant="hero" size="xl">Register your team</Button>
          <Button asChild variant="outline" size="xl" className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white">
            <Link to="/browse">Browse parts</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}