
import React from 'react';
import { Service, Professional } from './types';

export const SERVICES: Service[] = [
  {
    id: 'electrician',
    name: 'Electrician',
    description: 'Expert electrical repairs, wiring, and installations for your home.',
    icon: '⚡'
  },
  {
    id: 'plumber',
    name: 'Plumber',
    description: 'Fixing leaks, pipes, and clogged drains with professional care.',
    icon: '🚰'
  },
  {
    id: 'salon',
    name: 'Salon & Grooming',
    description: 'Professional haircuts, styling, and spa treatments at your doorstep.',
    icon: '✂️'
  },
  {
    id: 'painter',
    name: 'House Painter',
    description: 'Transform your living space with high-quality interior and exterior painting.',
    icon: '🎨'
  },
  {
    id: 'cleaning',
    name: 'Cleaning Service',
    description: 'Deep cleaning for houses, apartments, and offices.',
    icon: '🧹'
  }
];

export const PROFESSIONALS: Professional[] = [
  {
    id: 'p1',
    serviceId: 'electrician',
    name: 'John Doe',
    description: 'Certified master electrician with 10+ years of residential experience.',
    fees: '₹500/hr',
    experience: '12 Years',
    rating: 4.8,
    imageUrl: '' // Removed
  },
  {
    id: 'p2',
    serviceId: 'electrician',
    name: 'Sarah Watts',
    description: 'Specialist in smart home installations and electrical safety audits.',
    fees: '₹650/hr',
    experience: '8 Years',
    rating: 4.9,
    imageUrl: '' // Removed
  },
  {
    id: 'p3',
    serviceId: 'plumber',
    name: 'Mike Ross',
    description: 'Expert in leak detection and emergency plumbing repairs.',
    fees: '₹450/hr',
    experience: '15 Years',
    rating: 4.7,
    imageUrl: '' // Removed
  },
  {
    id: 'p4',
    serviceId: 'salon',
    name: 'Elena Gilbert',
    description: 'Professional hair stylist and makeup artist for all occasions.',
    fees: '₹800/session',
    experience: '6 Years',
    rating: 5.0,
    imageUrl: '' // Removed
  }
];

export const API_BASE_URL = 'http://localhost:5000/api';
