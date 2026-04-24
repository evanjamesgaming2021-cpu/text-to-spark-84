import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Cog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — FRC Parts Exchange" },
      { name: "description", content: "Sign in or create an account to list and manage FRC robot parts." },
    ],
  }),
  component: AuthPage,
});

const signInSchema = z.object({
  email: z.string().trim().email("Invalid email").max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(72),
});

const signUpSchema = signInSchema.extend({
  display_name: z.string().trim().min(1, "Required").max(100),
  team_number: z.string().trim().min(1, "Required").max(10).regex(/^\d+$/, "Numbers only"),
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [submitting, setSubmitting] = useState(false);

  // Redirect if already signed in
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/my-listings" });
    });
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    try {
      if (mode === "signup") {
        const parsed = signUpSchema.safeParse({
          email: fd.get("email"),
          password: fd.get("password"),
          display_name: fd.get("display_name"),
          team_number: fd.get("team_number"),
        });
        if (!parsed.success) {
          toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
          return;
        }
        const { error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              display_name: parsed.data.display_name,
              team_number: parsed.data.team_number,
            },
          },
        });
        if (error) {
          toast.error(error.message);
          return;
        }
        toast.success("Account created!");
        navigate({ to: "/my-listings" });
      } else {
        const parsed = signInSchema.safeParse({
          email: fd.get("email"),
          password: fd.get("password"),
        });
        if (!parsed.success) {
          toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
          return;
        }
        const { error } = await supabase.auth.signInWithPassword(parsed.data);
        if (error) {
          toast.error(error.message);
          return;
        }
        toast.success("Welcome back!");
        navigate({ to: "/my-listings" });
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-6 py-12 lg:py-16">
      <Link to="/" className="mx-auto flex items-center gap-2.5">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow">
          <Cog className="h-5 w-5" strokeWidth={2.5} />
        </span>
        <span className="font-display text-lg font-bold tracking-tight">
          FRC Parts <span className="text-primary">Exchange</span>
        </span>
      </Link>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
        <h1 className="font-display text-2xl font-bold">
          {mode === "signin" ? "Sign in" : "Create your account"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "signin"
            ? "Welcome back. Sign in to manage your listings."
            : "Tell us about your team so other teams can reach you."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {mode === "signup" && (
            <>
              <div>
                <Label htmlFor="display_name">Your name or team name</Label>
                <Input id="display_name" name="display_name" required maxLength={100} className="mt-1.5" placeholder="Team Spartans / Jane Doe" />
              </div>
              <div>
                <Label htmlFor="team_number">FRC team #</Label>
                <Input id="team_number" name="team_number" required inputMode="numeric" maxLength={10} className="mt-1.5" placeholder="1234" />
              </div>
            </>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required maxLength={255} className="mt-1.5" placeholder="parts@yourteam.org" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required minLength={6} maxLength={72} className="mt-1.5" />
          </div>

          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={submitting}>
            {submitting ? "Please wait..." : mode === "signin" ? "Sign in" : "Create account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {mode === "signin" ? "No account yet?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="font-medium text-primary hover:underline"
          >
            {mode === "signin" ? "Create one" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}