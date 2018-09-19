import { EntityState } from '@ngrx/entity';

// export interface Restaurant {
//   id: string;
//   title: string;
//   author: string;
//   description: string;
// }

export interface RestaurantState extends EntityState<Restaurant> {
  selectedRestaurantId: string | null;
}


export interface Contact {
  phone: string;
  formattedPhone: string;
  twitter: string;
}

export interface Location {
  address: string;
  crossStreet: string;
  lat: number;
  lng: number;
  postalCode: string;
  cc: string;
  city: string;
  state: string;
  country: string;
  formattedAddress: string[];
}

export interface Restaurant {
  id: string;
  name: string;
  backgroundImageURL: string;
  category: string;
  contact: Contact;
  location: Location;
}
