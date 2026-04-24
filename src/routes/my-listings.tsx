import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Plus, PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ListingCard } from "@/components/ListingCard";
import { useMyListings } from "@/lib/listings";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/my-listings")({
  head: () => ({
    meta: [
      { title: "My Listings — FRC Parts Exchange" },
      { name: "description", content: "Manage the parts you've listed on FRC Parts Exchange." },
    ],
  }),
  component: MyListings,
});

function MyListings() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const mine = useMyListings();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  if (loading || !user) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center text-muted-foreground">
        Checking your session...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">My listings</h1>
          <p className="mt-1 text-muted-foreground">
            {mine.length} {mine.length === 1 ? "part" : "parts"} posted from this device.
          </p>
        </div>
        <Button asChild variant="hero">
          <Link to="/list">
            <Plus /> New listing
          </Link>
        </Button>
      </div>

      {mine.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-border bg-muted/40 p-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-accent">
            <PackageOpen className="h-6 w-6" />
          </div>
          <h2 className="mt-4 font-display text-lg font-semibold">No listings yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Post a part and it'll show up here so you can manage or remove it.
          </p>
          <Button asChild variant="hero" className="mt-5">
            <Link to="/list">
              <Plus /> List your first part
            </Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mine.map((l) => (
            <ListingCard key={l.id} listing={l} owned />
          ))}
        </div>
      )}
    </div>
  );
}