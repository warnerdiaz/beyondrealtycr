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
    listingsPlaceholder:
      "Our curated catalog of fincas and lotes is coming soon. Check back shortly to explore exceptional properties across Costa Rica.",
    propertyTypeFinca: "Acreage",
    propertyTypeLote: "Lot",
    bedsAbbr: "bd",
    bathsAbbr: "ba",
    propertyType: "Type",
    landSize: "Land size",
    region: "Region",
    featureWater: "Water",
    featureElectricity: "Electricity",
    featureForest: "Forest",
    featureZoning: "Zoning",
    featureAccess: "Access",
    featureView: "View",
    galleryThumbAlt: "Photo",
    playVideo: "Play video tour",
    closeGallery: "Close gallery",
    previousImage: "Previous image",
    nextImage: "Next image",
    sellWithUsTitle: "Sell your property with us",
    sellWithUsDescription:
      "List your finca or lote with Beyond Realty Costa Rica and reach buyers searching for Costa Rican land. Share a few details and we'll follow up with a free valuation.",
    sellWithUsCta: "Get a free valuation",
    propertyFeatures: "Property Features",
    contactSectionTitle: "Interested in this property?",
    contactSectionDescription:
      "Reach out on WhatsApp for a fast reply, or send us a message below.",
    whatsAppCta: "Chat on WhatsApp",
    contactFormName: "Name",
    contactFormEmail: "Email",
    contactFormMessage: "Message",
    contactFormNamePlaceholder: "Your name",
    contactFormEmailPlaceholder: "you@example.com",
    contactFormSubmit: "Send message",
    contactFormSubmitting: "Sending...",
    contactFormSuccess:
      "Thanks! Your message has been sent. We'll get back to you shortly.",
    contactFormError:
      "We couldn't send your message right now. Please try again or reach us on WhatsApp.",
    contactFormNotConfigured:
      "Email contact isn't set up yet. Please reach us on WhatsApp instead.",
    filterAllTypes: "All types",
    filterAllProvinces: "All provinces",
    filterAllRegions: "All regions",
    filterType: "Type",
    filterProvince: "Province",
    filterRegion: "Region",
    filterPriceRange: "Price range (USD)",
    filterLandSizeRange: "Land size range (acres)",
    filterMinPlaceholder: "Min",
    filterMaxPlaceholder: "Max",
    filterClear: "Clear filters",
    filterResultsCountSingular: "property",
    filterResultsCountPlural: "properties",
    filterEmptyState:
      "No properties match your filters. Try adjusting or clearing them.",
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
    listingsPlaceholder:
      "Nuestro catálogo seleccionado de fincas y lotes estará disponible muy pronto. Vuelva en breve para explorar propiedades excepcionales en Costa Rica.",
    propertyTypeFinca: "Finca",
    propertyTypeLote: "Lote",
    bedsAbbr: "hab",
    bathsAbbr: "baños",
    propertyType: "Tipo",
    landSize: "Tamaño del terreno",
    region: "Región",
    featureWater: "Agua",
    featureElectricity: "Electricidad",
    featureForest: "Bosque",
    featureZoning: "Zonificación",
    featureAccess: "Acceso",
    featureView: "Vista",
    galleryThumbAlt: "Foto",
    playVideo: "Reproducir recorrido en video",
    closeGallery: "Cerrar galería",
    previousImage: "Imagen anterior",
    nextImage: "Imagen siguiente",
    sellWithUsTitle: "Venda su propiedad con nosotros",
    sellWithUsDescription:
      "Publique su finca o lote con Beyond Realty Costa Rica y llegue a compradores que buscan terrenos en Costa Rica. Cuéntenos algunos detalles y le responderemos con una valoración gratuita.",
    sellWithUsCta: "Obtener valoración gratuita",
    propertyFeatures: "Características de la propiedad",
    contactSectionTitle: "¿Le interesa esta propiedad?",
    contactSectionDescription:
      "Escríbanos por WhatsApp para una respuesta rápida, o envíenos un mensaje a continuación.",
    whatsAppCta: "Chatear por WhatsApp",
    contactFormName: "Nombre",
    contactFormEmail: "Correo electrónico",
    contactFormMessage: "Mensaje",
    contactFormNamePlaceholder: "Su nombre",
    contactFormEmailPlaceholder: "usted@ejemplo.com",
    contactFormSubmit: "Enviar mensaje",
    contactFormSubmitting: "Enviando...",
    contactFormSuccess:
      "¡Gracias! Su mensaje ha sido enviado. Le responderemos en breve.",
    contactFormError:
      "No pudimos enviar su mensaje en este momento. Inténtelo de nuevo o escríbanos por WhatsApp.",
    contactFormNotConfigured:
      "El contacto por correo aún no está configurado. Por favor escríbanos por WhatsApp.",
    filterAllTypes: "Todos los tipos",
    filterAllProvinces: "Todas las provincias",
    filterAllRegions: "Todas las regiones",
    filterType: "Tipo",
    filterProvince: "Provincia",
    filterRegion: "Región",
    filterPriceRange: "Rango de precio (USD)",
    filterLandSizeRange: "Rango de tamaño (acres)",
    filterMinPlaceholder: "Mín",
    filterMaxPlaceholder: "Máx",
    filterClear: "Limpiar filtros",
    filterResultsCountSingular: "propiedad",
    filterResultsCountPlural: "propiedades",
    filterEmptyState:
      "Ninguna propiedad coincide con sus filtros. Intente ajustarlos o límpielos.",
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
