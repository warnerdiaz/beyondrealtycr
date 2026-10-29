import type { Property } from "../types/Property";

const mediaUrl = (path: string) => `media/${path}`;

export const properties: Property[] = [
  {
    id: "p1",
    landSize: "37 acres (15 ha)",
    media: {
      en: [
        {
          type: "video",
          url: mediaUrl("properties/cahuita/en/tour.mp4"),
          poster: mediaUrl("properties/cahuita/en/cover.jpg"),
        },
        { type: "cover", url: mediaUrl("properties/cahuita/en/cover.jpg") },
      ],
      es: [
        {
          type: "video",
          url: mediaUrl("properties/cahuita/es/tour.mp4"),
          poster: mediaUrl("properties/cahuita/es/cover.jpg"),
        },
        { type: "cover", url: mediaUrl("properties/cahuita/es/cover.jpg") },
      ],
    },
    price: "$400,000",
    translations: {
      en: {
        description:
          "Exceptional property for sale featuring private forest and 2 cozy cabins. Perfect for an Airbnb/vacation rental project, a private family retreat, or an eco-tourism investment.",
        location: "Cahuita, Limón",
        title: "Property with 2 Cabins & Private Forest",
      },
      es: {
        description:
          "Excelente propiedad en venta con bosque privado y dos acogedoras cabañas. Ideal para un proyecto de Airbnb o alquiler vacacional, un refugio familiar o una inversión en ecoturismo.",
        location: "Cahuita, Limón",
        title: "Propiedad con 2 cabañas y bosque privado",
      },
    },
  },
];