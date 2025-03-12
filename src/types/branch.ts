export interface Branch {
  id: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  coverageRadius: number; // in kilometers
  isActive: boolean;
  contactPhone: string;
  contactEmail: string;
  operatingHours: {
    open: string;
    close: string;
  };
}