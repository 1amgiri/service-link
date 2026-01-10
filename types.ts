
export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Professional {
  id: string;
  serviceId: string;
  name: string;
  description: string;
  fees: string;
  experience: string;
  rating: number;
  imageUrl: string;
  isUserAdded?: boolean;
  ownerEmail?: string;
}

export interface BookingRequest {
  id: string;
  userEmail: string;
  serviceName: string;
  professionalName: string;
  professionalEmail?: string;
  date: string;
  time: string;
  description: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: number;
}

export type AppState = 'login' | 'dashboard' | 'professionals' | 'book' | 'requests' | 'profile';
