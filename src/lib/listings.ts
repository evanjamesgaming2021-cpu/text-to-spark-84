import { useEffect, useState } from "react";

export type Listing = {
  id: string;
  name: string;
  category: string;
  condition: string;
  type: "Trade" | "Donation";
  team: string;
  email: string;
  location: string;
  notes?: string;
  createdAt: number;
};

export const CATEGORIES = [
  "Motors",
  "Drivetrain",
  "Pneumatics",
  "Structural",
  "Sensors",
  "Control",
  "Electronics",
  "Wheels",
  "Kit of Parts",
  "Other",
];

export const CONDITIONS = ["New", "Used – Excellent", "Used – Good", "Used – Fair"];

const KEY = "frc-listings-v1";
const MINE_KEY = "frc-my-listings-v1";

const SEED: Listing[] = [
  { id: "s1", name: "NEO Brushless Motor (x2)", category: "Motors", condition: "Used – Excellent", type: "Trade", team: "2046", email: "parts@team2046.example", location: "Kirkland, WA", createdAt: Date.now() - 86400000 },
  { id: "s2", name: "Falcon 500 Motor", category: "Motors", condition: "Used – Good", type: "Trade", team: "254", email: "trade@team254.example", location: "San Jose, CA", createdAt: Date.now() - 172800000 },
  { id: "s3", name: "VersaPlanetary Gearbox", category: "Drivetrain", condition: "New", type: "Donation", team: "1678", email: "donate@team1678.example", location: "Davis, CA", createdAt: Date.now() - 3600000 },
  { id: "s4", name: "Pneumatic Compressor", category: "Pneumatics", condition: "Used – Good", type: "Trade", team: "1114", email: "shop@team1114.example", location: "Stoney Creek, ON", createdAt: Date.now() - 7200000 },
  { id: "s5", name: "REV Through Bore Encoder", category: "Sensors", condition: "New", type: "Donation", team: "118", email: "give@team118.example", location: "Houston, TX", createdAt: Date.now() - 200000 },
  { id: "s6", name: "1×1 Aluminum Extrusion (10ft)", category: "Structural", condition: "Used – Fair", type: "Donation", team: "33", email: "killerbees@team33.example", location: "Auburn Hills, MI", createdAt: Date.now() - 500000 },
];

function read(): Listing[] {
  if (typeof window === "undefined") return SEED;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return SEED;
    return JSON.parse(raw) as Listing[];
  } catch {
    return SEED;
  }
}

function write(items: Listing[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("frc-listings-changed"));
}

function readMine(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(MINE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeMine(ids: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(MINE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event("frc-listings-changed"));
}

export function useListings() {
  const [items, setItems] = useState<Listing[]>(SEED);

  useEffect(() => {
    setItems(read());
    const onChange = () => setItems(read());
    window.addEventListener("frc-listings-changed", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("frc-listings-changed", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  return items;
}

export function addListing(l: Omit<Listing, "id" | "createdAt">) {
  const items = read();
  const next: Listing = { ...l, id: crypto.randomUUID(), createdAt: Date.now() };
  write([next, ...items]);
  writeMine([next.id, ...readMine()]);
  return next;
}

export function deleteListing(id: string) {
  write(read().filter((l) => l.id !== id));
  writeMine(readMine().filter((mine) => mine !== id));
}

export function useMyListings() {
  const all = useListings();
  const [mineIds, setMineIds] = useState<string[]>([]);

  useEffect(() => {
    setMineIds(readMine());
    const onChange = () => setMineIds(readMine());
    window.addEventListener("frc-listings-changed", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("frc-listings-changed", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const set = new Set(mineIds);
  return all.filter((l) => set.has(l.id));
}

export function buildContactMailto(l: Listing) {
  const subject = `FRC Parts Exchange — interested in "${l.name}"`;
  const body = `Hi Team ${l.team},\n\nI saw your "${l.name}" listing on FRC Parts Exchange and I'm interested${l.type === "Donation" ? " in claiming it" : " in trading"}.\n\nCould we coordinate pickup or shipping?\n\nThanks!`;
  return `mailto:${encodeURIComponent(l.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}