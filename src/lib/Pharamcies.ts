export interface Pharmacy {
    id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    phone?: string;
    hours?: string;
  }
  
  export function getNearbyPharmacies(latitude: number, longitude: number, radius: number = 5000): Promise<Pharmacy[]> {
    // This is a placeholder function that would typically call a pharmacy API
    return Promise.resolve([]);
  }
  
  export function formatPharmacyHours(hours: string | undefined): string {
    if (!hours) return 'Hours not available';
    return hours;
  } 