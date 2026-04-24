import { createFileRoute } from "@tanstack/react-router";
import { Recycle, Users, DollarSign, Globe } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — FRC Parts Exchange" },
      { name: "description", content: "FRC Parts Exchange is a community-driven marketplace built to reduce waste, cut costs, and strengthen collaboration between FIRST Robotics teams." },
      { property: "og:title", content: "About FRC Parts Exchange" },
      { property: "og:description", content: "Why we built a marketplace for FIRST Robotics teams to trade and donate parts." },
    ],
  }),
  component: About,
});

const values = [
  { icon: Recycle, title: "Less waste", body: "Surplus parts shouldn't end up in landfills. We give them a second robot." },
  { icon: DollarSign, title: "Lower budgets", body: "Make every dollar of team funding go further — especially for rookie and Title I schools." },
  { icon: Users, title: "Stronger community", body: "Build relationships with regional teams long before you meet them in the queue." },
  { icon: Globe, title: "Open by default", body: "Built by mentors and students, free for every team. No paywalls, no listing fees." },
];

function About() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:py-24">
      <div className="max-w-3xl">
        <p className="font-mono-tabular text-xs uppercase tracking-widest text-primary">About</p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">A marketplace built by the community, for the community.</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          FRC Parts Exchange started with a simple observation: every season, teams end up with surplus motors, gears, and electronics while other teams scramble to source the same parts at full price. We're closing that gap.
        </p>
        <p className="mt-4 text-lg text-muted-foreground">
          The platform is free, open to every FIRST Robotics Competition team, and designed to be useful both during build season and in the off-season — when good homes for unused parts are hardest to find.
        </p>
      </div>

      <div className="mt-16 grid gap-5 sm:grid-cols-2">
        {values.map((v) => (
          <div key={v.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow">
              <v.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-lg font-semibold">{v.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-border bg-muted/40 p-8 text-sm text-muted-foreground">
        <p>
          <strong className="text-foreground">Not affiliated with FIRST®.</strong> FIRST®, FRC®, and the FIRST® logo
          are trademarks of For Inspiration and Recognition of Science and Technology (FIRST). FRC Parts Exchange is an
          independent community project.
        </p>
      </div>
    </div>
  );
}