import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addListing, CATEGORIES, CONDITIONS } from "@/lib/listings";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/list")({
  head: () => ({
    meta: [
      { title: "List a Part — FRC Parts Exchange" },
      { name: "description", content: "List an FRC robot part for trade or donation in under a minute." },
    ],
  }),
  component: ListPart,
});

function ListPart() {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();
  const [type, setType] = useState<"Trade" | "Donation">("Trade");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [condition, setCondition] = useState(CONDITIONS[1]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  if (loading || !user) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center text-muted-foreground">
        <p>Checking your session...</p>
        <p className="mt-2 text-sm">
          Not signed in? <Link to="/auth" className="text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    );
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    addListing({
      name: String(fd.get("name") || "").trim(),
      team: String(fd.get("team") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      location: String(fd.get("location") || "").trim(),
      notes: String(fd.get("notes") || "").trim(),
      type,
      category,
      condition,
    });
    setTimeout(() => navigate({ to: "/browse" }), 200);
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12 lg:py-16">
      <div className="mb-8">
        <p className="font-mono-tabular text-xs uppercase tracking-widest text-primary">List a part</p>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Post a part in under a minute.</h1>
        <p className="mt-2 text-muted-foreground">
          Other teams will contact you directly via the email you provide.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
        {/* Type toggle */}
        <div>
          <Label className="mb-2 block">Listing type</Label>
          <div className="grid grid-cols-2 gap-2">
            {(["Trade", "Donation"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-smooth ${
                  type === t
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-muted-foreground hover:border-primary/40"
                }`}
              >
                {type === t && <Check className="h-4 w-4" />} {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="name">Part name</Label>
          <Input id="name" name="name" required placeholder="e.g. NEO Brushless Motor (x2)" className="mt-1.5" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1.5 flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <Label htmlFor="condition">Condition</Label>
            <select
              id="condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="mt-1.5 flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {CONDITIONS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="team">FRC team #</Label>
            <Input id="team" name="team" required inputMode="numeric" placeholder="1234" className="mt-1.5" defaultValue={profile?.team_number ?? ""} />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" required placeholder="City, State" className="mt-1.5" />
          </div>
        </div>

        <div>
          <Label htmlFor="email">Contact email</Label>
          <Input id="email" name="email" type="email" required placeholder="parts@yourteam.org" className="mt-1.5" defaultValue={profile?.email ?? user.email ?? ""} />
          <p className="mt-1.5 text-xs text-muted-foreground">
            Other teams will email you directly here. Use a team-shared inbox if possible.
          </p>
        </div>

        <div>
          <Label htmlFor="notes">Notes (optional)</Label>
          <Textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder="Anything else? Quantity, defects, what you're looking to trade for..."
            className="mt-1.5"
          />
        </div>

        <Button type="submit" variant="hero" size="xl" className="w-full" disabled={submitting}>
          <Plus /> {submitting ? "Posting..." : "Post listing"}
        </Button>
      </form>
    </div>
  );
}