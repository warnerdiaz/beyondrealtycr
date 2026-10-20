export interface PropertyMedia {
  type: "image" | "video" | "cover";
  poster?: string;
  url: string;
}

export interface PropertyTranslation {
  description: string;
  location: string;
  title: string;
}

export interface Property {
  id: string;
  landSize: string;
  media: Record<"en" | "es", PropertyMedia[]>;
  price: string;
  translations: Record<"en" | "es", PropertyTranslation>;
  bathrooms?: number;
  bedrooms?: number;
  buildingSize?: string;
  jacuzzi?: number;
}