/**
 * Real production assets, referenced by absolute URL so they resolve both in
 * local preview and once deployed to the live domain.
 */
const CDN = "https://www.followuphub.ai";
const a = (p: string) => `${CDN}${p}`;

export const IMG = {
  logo: a("/__l5e/assets-v1/ade88837-8e3a-4579-94b6-3cffbea0c549/followuphub-logo.png"),
  logoLight: a("/__l5e/assets-v1/4a8a70d2-4ae5-4db3-ba46-1d79ae9cee23/followuphub-logo-light.png"),
  hero: a("/__l5e/assets-v1/6e4e9167-e19c-4074-9807-84fa89a51e2f/fuh-hero.jpg"),
} as const;

export const BROKERAGES = [
  { name: "Royal LePage", src: a("/assets/royal-lepage-Cny0JIs0.png") },
  { name: "eXp Realty", src: a("/__l5e/assets-v1/58a2061e-db25-4e2c-ab5b-d7c3b4e5a8ca/exp-realty.jpg") },
  { name: "RE/MAX", src: a("/assets/remax-DgnOnl2W.png") },
  { name: "Century 21", src: a("/assets/century21-CNJwpkOu.png") },
  { name: "Keller Williams", src: a("/assets/keller-williams-DVF3yIQR.png") },
  { name: "Sutton Group", src: a("/__l5e/assets-v1/3eb0ab34-d490-418c-a36a-730d3d9b7fa1/sutton-group.jpg") },
  { name: "Coldwell Banker", src: a("/assets/coldwell-banker-B9ow80FW.png") },
  { name: "Right at Home Realty", src: a("/assets/right-at-home-CLHbJPdT.png") },
  { name: "Real Brokerage", src: a("/__l5e/assets-v1/f2c4135b-4570-4b48-bc48-16ac34fdb1ba/real-brokerage.jpg") },
] as const;

export type Person = { name: string; role: string; photo: string };

export const PEOPLE: Record<string, Person> = {
  grace: {
    name: "Grace Lim",
    role: "Team Lead, Royal LePage",
    photo: a("/__l5e/assets-v1/ac08b6cf-a8a9-44ff-859c-d56b39b2c362/FB2.jpg"),
  },
  sanjay: {
    name: "Sanjay Gupta",
    role: "Broker, eXp Realty",
    photo: a("/__l5e/assets-v1/02cb1f10-815a-4286-9efc-6d4aad5e6146/sanjay.png"),
  },
  mateo: {
    name: "Mateo Alvarez",
    role: "Real Estate Agent, RE/MAX",
    photo: a("/__l5e/assets-v1/270aaca9-113f-41bd-9bea-f31908913591/FB4.jpg"),
  },
  rohan: {
    name: "Rohan Desai",
    role: "Sales Representative, Real Brokerage",
    photo: a("/__l5e/assets-v1/040494fb-8900-4644-96a1-40740cd5731f/FB10.jpg"),
  },
  amara: {
    name: "Amara Okafor",
    role: "Team Lead, Royal LePage",
    photo: a("/__l5e/assets-v1/629a7f6f-11b1-4f5e-9de0-6bab9aa2c277/FB9.jpg"),
  },
  omar: {
    name: "Omar Haddad",
    role: "Real Estate Agent, eXp Realty",
    photo: a("/__l5e/assets-v1/9c0ec5c8-2d98-4f02-ae4a-b12e708cde0e/FB1.jpg"),
  },
  karen: {
    name: "Karen Whitfield",
    role: "Team Lead, Century 21",
    photo: a("/__l5e/assets-v1/22192226-e169-48a0-9e27-8cc27fa99d2b/FB6.jpg"),
  },
  marissa: {
    name: "Marissa Santos",
    role: "Sales Representative, Sutton Group",
    photo: a("/__l5e/assets-v1/1a4779d5-b6af-4c55-8d7f-f0b7ac58f15d/FB7.jpg"),
  },
  andre: {
    name: "Andre Bennett",
    role: "Real Estate Agent, Keller Williams",
    photo: a("/__l5e/assets-v1/0535d063-8c39-45a1-84a8-1e90590959c9/FB8.jpg"),
  },
  elias: {
    name: "Elias Karam",
    role: "Sales Representative, Right at Home Realty",
    photo: a("/__l5e/assets-v1/fff5980f-fc83-4199-9889-45fe038e5aad/FB3.jpg"),
  },
  daniel: {
    name: "Daniel Rosen",
    role: "Real Estate Agent, Coldwell Banker",
    photo: a("/__l5e/assets-v1/b01ef1e5-ef48-4ac1-ba9e-5e610d1373e2/FB11.jpg"),
  },
};
