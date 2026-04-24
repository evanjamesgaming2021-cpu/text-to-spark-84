import { Mail, MapPin, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildContactMailto, deleteListing, type Listing } from "@/lib/listings";

export function ListingCard({ listing, owned = false }: { listing: Listing; owned?: boolean }) {
  return (
    <article className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-card transition-smooth hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elegant">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold leading-tight">{listing.name}</h3>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-mono-tabular uppercase tracking-wider ${
            listing.type === "Donation" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"
          }`}
        >
          {listing.type}
        </span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        {listing.category} · {listing.condition}
      </p>
      {listing.notes && (
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground/90">{listing.notes}</p>
      )}
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-mono-tabular">Team #{listing.team}</span>
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3 w-3" /> {listing.location}
        </span>
      </div>
      {owned ? (
        <Button
          variant="outline"
          className="mt-4 w-full text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={() => {
            if (confirm(`Delete "${listing.name}"?`)) deleteListing(listing.id);
          }}
        >
          <Trash2 /> Delete listing
        </Button>
      ) : (
        <Button asChild variant="hero" className="mt-4 w-full">
          <a href={buildContactMailto(listing)}>
            <Mail /> Contact team
          </a>
        </Button>
      )}
    </article>
  );
}