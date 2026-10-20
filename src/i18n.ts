import { createContext, useContext } from "react";

export type Language = "en" | "es";

const translations = {
  en: {
    bathrooms: "Bathrooms",
    bedrooms: "Bedrooms",
    building: "Building",
    contactUs: "Contact Us",
    description:
      "Costa Rica is a growing hotspot for investment, thanks to its booming tourism 🌺, stunning beaches 🏖️, lush mountains ⛰️, and vibrant rainforests 🌿. The country offers endless opportunities in real estate, hospitality, and eco-tourism. Beyond nature, Costa Ricans are warm and welcoming 😊, creating a great environment for business and visitors alike. With growth, beauty, and friendly people, Costa Rica is truly a paradise to invest in! 💼✨",
    errorMessage: "An unexpected error occurred. Please try again.",
    errorTitle: "Something went wrong",
    jacuzzi: "Jacuzzi",
    landArea: "Total Area",
    loading: "Loading...",
    notFound: "Property not found",
    pageNotFound: "Page not found",
    returnHome: "Return to home",
    returnListings: "Return to listings",
    sellDescription:
      "We connect sellers with buyers across Costa Rica and around the world. Share your property and get a free valuation.",
    sellTitle: "Do you want to sell your property through us?",
    tryAgain: "Try again",
    viewDetails: "View details",
    viewListings: "View Listings",
    whyInvest: "Why Invest in Costa Rica?",
    tourism:
      "Booming tourism industry 🌺 attracting millions every year.",
    nature:
      "Stunning natural beauty: beaches 🌊, mountains ⛰️, and rainforests 🌿🌴.",
    people:
      "Friendly and welcoming people 😊 making business and life enjoyable.",
    opportunities:
      "Strong growth opportunities in real estate, hospitality, and eco-tourism 💼✨.",
    allRightsReserved: "All rights reserved.",
    phone: "Phone",
    language: "Language",
    home: "Beyond Realty home",
    propertyGallery: "Open property gallery",
    galleryItem: "Open property gallery item",
    video: "Video",
    heroTitle: "Discover Exceptional Properties in Costa Rica",
    footerBrand: "© Beyond Realty Costa Rica",
  },
  es: {
    bathrooms: "Baños",
    bedrooms: "Habitaciones",
    building: "Construcción",
    contactUs: "Contáctenos",
    description:
      "Costa Rica es un destino en crecimiento para la inversión gracias a su pujante turismo 🌺, sus hermosas playas 🏖️, montañas ⛰️ y exuberantes bosques tropicales 🌿. El país ofrece oportunidades en bienes raíces, hotelería y ecoturismo. Además, la calidez de su gente 😊 crea un excelente entorno para los negocios y la vida. Con su crecimiento y belleza, ¡Costa Rica es un paraíso para invertir! 💼✨",
    errorMessage: "Ocurrió un error inesperado. Inténtelo de nuevo.",
    errorTitle: "Algo salió mal",
    jacuzzi: "Jacuzzi",
    landArea: "Área total",
    loading: "Cargando...",
    notFound: "Propiedad no encontrada",
    pageNotFound: "Página no encontrada",
    returnHome: "Volver al inicio",
    returnListings: "Volver a las propiedades",
    sellDescription:
      "Conectamos a vendedores con compradores en Costa Rica y en todo el mundo. Comparta su propiedad y obtenga una valoración gratuita.",
    sellTitle: "¿Desea vender su propiedad con nosotros?",
    tryAgain: "Intentar de nuevo",
    viewDetails: "Ver detalles",
    viewListings: "Ver propiedades",
    whyInvest: "¿Por qué invertir en Costa Rica?",
    tourism:
      "Una industria turística en auge 🌺 que atrae a millones de visitantes cada año.",
    nature:
      "Una naturaleza impresionante: playas 🌊, montañas ⛰️ y bosques tropicales 🌿🌴.",
    people:
      "Gente amable y acogedora 😊 que hace más agradable vivir y hacer negocios.",
    opportunities:
      "Grandes oportunidades de crecimiento en bienes raíces, hotelería y ecoturismo 💼✨.",
    allRightsReserved: "Todos los derechos reservados.",
    phone: "Teléfono",
    language: "Idioma",
    home: "Inicio de Beyond Realty",
    propertyGallery: "Abrir galería de la propiedad",
    galleryItem: "Abrir elemento de la galería",
    video: "Video",
    heroTitle: "Descubra propiedades excepcionales en Costa Rica",
    footerBrand: "© Beyond Realty Costa Rica",
  },
} as const;

type TranslationKey = keyof typeof translations.en;

export interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export const getTranslation = (language: Language, key: TranslationKey) =>
  translations[language][key];

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
