// The six home services shown on the page.
// `icon` stores a Lucide icon component, so each card can render it directly.
import { Sparkles, Droplets, Zap, AirVent, WashingMachine, Bug } from 'lucide-react';

export const services = [
  {
    id: 's1',
    name: 'Home Cleaning',
    description: 'Deep cleaning for kitchens, bathrooms and living spaces by trained professionals.',
    duration: '2–4 hrs',
    icon: Sparkles,
  },
  {
    id: 's2',
    name: 'Plumbing',
    description: 'Leaks, taps, drainage and fittings handled quickly and neatly.',
    duration: '1–2 hrs',
    icon: Droplets,
  },
  {
    id: 's3',
    name: 'Electrical Repairs',
    description: 'Safe wiring, switchboard, lighting and fan installation work.',
    duration: '1–2 hrs',
    icon: Zap,
  },
  {
    id: 's4',
    name: 'AC Servicing',
    description: 'Filter cleaning, gas checks and seasonal maintenance for cooler rooms.',
    duration: '1 hr',
    icon: AirVent,
  },
  {
    id: 's5',
    name: 'Appliance Repair',
    description: 'Washing machines, refrigerators and microwaves diagnosed and fixed.',
    duration: '1–3 hrs',
    icon: WashingMachine,
  },
  {
    id: 's6',
    name: 'Pest Control',
    description: 'Odour-free, family-safe treatments for a cleaner, healthier home.',
    duration: '2 hrs',
    icon: Bug,
  },
];
