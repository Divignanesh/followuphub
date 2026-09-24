/**
 * Every image is served from this site's own /images directory. These used to
 * be hotlinked from the previous site on www.followuphub.ai, and all of them
 * went 404 the moment the domain was pointed at this build.
 */
/**
 * Self-hosted photography. The production CSP is `img-src 'self'`, so any
 * external stock URL would be blocked in the browser — these are served from
 * our own /images directory instead. Sources are listed in
 * public/images/CREDITS.md.
 */
export const LISTINGS = [
  { src: "/images/listing-1.jpg", alt: "Red brick two-storey home with a manicured front lawn" },
  { src: "/images/listing-2.jpg", alt: "Detached family home with a covered porch and wide driveway" },
  { src: "/images/listing-3.jpg", alt: "Two-storey home with blue shingle gable and double garage" },
  { src: "/images/listing-4.jpg", alt: "Suburban house with a large lawn and mature trees" },
] as const;

export const IMG = {
  ogImage: "/images/og-image.jpg",
  logo: "/images/brand/followuphub-logo.png",
  logoLight: "/images/brand/followuphub-logo-light.png",
  hero: "/images/hero-team-celebrating.jpg",
  agent: "/images/agent-with-clients.jpg",
  close: "/images/agent-at-close.jpg",
} as const;

export const BROKERAGES = [
  { name: "Royal LePage", src: "/images/brokerages/royal-lepage.png" },
  { name: "eXp Realty", src: "/images/brokerages/exp-realty.png" },
  { name: "RE/MAX", src: "/images/brokerages/remax.png" },
  { name: "Century 21", src: "/images/brokerages/century21.png" },
  { name: "Keller Williams", src: "/images/brokerages/keller-williams.png" },
  { name: "Sutton Group", src: "/images/brokerages/sutton-group.jpg" },
  { name: "Coldwell Banker", src: "/images/brokerages/coldwell-banker.png" },
  { name: "Right at Home Realty", src: "/images/brokerages/right-at-home.png" },
  { name: "Real Brokerage", src: "/images/brokerages/real-brokerage.jpg" },
] as const;

export type Person = { name: string; role: string; photo: string };

export const PEOPLE: Record<string, Person> = {
  grace: {
    name: "Grace Lim",
    role: "Team Lead, Royal LePage",
    photo: "/images/people/FB2.jpg",
  },
  sanjay: {
    name: "Sanjay Gupta",
    role: "Broker, eXp Realty",
    photo: "/images/people/sanjay.png",
  },
  mateo: {
    name: "Mateo Alvarez",
    role: "Real Estate Agent, RE/MAX",
    photo: "/images/people/FB4.jpg",
  },
  rohan: {
    name: "Rohan Desai",
    role: "Sales Representative, Real Brokerage",
    photo: "/images/people/FB10.jpg",
  },
  amara: {
    name: "Amara Okafor",
    role: "Team Lead, Royal LePage",
    photo: "/images/people/FB9.jpg",
  },
  omar: {
    name: "Omar Haddad",
    role: "Real Estate Agent, eXp Realty",
    photo: "/images/people/FB1.jpg",
  },
  karen: {
    name: "Karen Whitfield",
    role: "Team Lead, Century 21",
    photo: "/images/people/FB6.jpg",
  },
  marissa: {
    name: "Marissa Santos",
    role: "Sales Representative, Sutton Group",
    photo: "/images/people/FB7.jpg",
  },
  andre: {
    name: "Andre Bennett",
    role: "Real Estate Agent, Keller Williams",
    photo: "/images/people/FB8.jpg",
  },
  elias: {
    name: "Elias Karam",
    role: "Sales Representative, Right at Home Realty",
    photo: "/images/people/FB3.jpg",
  },
  daniel: {
    name: "Daniel Rosen",
    role: "Real Estate Agent, Coldwell Banker",
    photo: "/images/people/FB11.jpg",
  },
};
