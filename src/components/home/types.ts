export interface HotelCard {
    id: number;
    title: string;
    location: string;
    rating: string;
    price: string;
    image: string;
    isFavorite: boolean;
  }
  

export interface CityCard {
  id: number;
  name: string;
  image: string;
}

export interface TrendingDestination {
  id: number;
  name: string;
  description: string;
  image: string;
  gradientColors: {
    start: string;
    end: string;
  };
}
  
  export const hotelCards: HotelCard[] = [
    {
      id: 1,
      title: "Kempinski Hotel Soma Bay",
      location: "Soma Bay",
      rating: "4.2 (1,274)",
      price: "214",
      image: "/images/SomaBay_H.png",
      isFavorite: true,
    },
    {
      id: 2,
      title: "JW Marriott Hotel Cairo",
      location: "Cairo",
      rating: "4.6 (2,274)",
      price: "194",
      image: "/images/Cairo_JW_M_H.png",
      isFavorite: false,
    },
    {
      id: 3,
      title: "Kempinski Hotel Soma Bay",
      location: "Soma Bay",
      rating: "4.2 (1,274)",
      price: "214",
      image: "/images/SomaBay_H.png",
      isFavorite: false,
    },
    {
      id: 4,
      title: "JW Marriott Hotel Cairo",
      location: "Cairo",
      rating: "4.6 (2,274)",
      price: "194",
      image: "/images/Cairo_JW_M_H.png",
      isFavorite: true,
    },
    {
      id: 5,
      title: "Kempinski Hotel Soma Bay",
      location: "Soma Bay",
      rating: "4.2 (1,274)",
      price: "214",
      image: "/images/SomaBay_H.png",
      isFavorite: false,
    },
    {
      id: 6,
      title: "JW Marriott Hotel Cairo",
      location: "Cairo",
      rating: "4.6 (2,274)",
      price: "194",
      image: "/images/Cairo_JW_M_H.png",
      isFavorite: true,
    }
  ];

  export const cityCards: CityCard[] = [
    {
      id: 1,
      name: "Red Sea",
      image: "/images/red-sea.png",
    },
    {
      id: 2,
      name: "Soma Bay",
      image: "/images/soma-bay.png"
    },
    {
      id: 3,
      name: "Giza",
      image: "/images/Giza.png"
    },
    {
      id: 4,
      name: "Nile",
      image: "/images/Nile.png"
    },
    {
      id: 5,
      name: "Nabq Bay",
      image: "/images/nabq-bay.png"
    },
    {
      id: 6,
      name: "Other",
      image: "/images/Other.png"
    }
  ];

  export const trendingDestinations: TrendingDestination[] = [
    {
      id: 1,
      name: "Cairo",
      description: "Unveil secrets of ancient wonders.",
      image: "/images/cairo-trending.png",
      gradientColors: {
        start: "rgba(252, 142, 80, 1)",
        end: "rgba(252, 142, 80, 0)"
      }
    },
    {
      id: 2,
      name: "Hurghada",
      description: "Sunshine, beaches, and vibrant reefs.",
      image: "/images/hurghada-trending.png",
      gradientColors: {
        start: "rgba(100, 151, 196, 1)",
        end: "rgba(100, 151, 196, 0)"
      }
    },
    {
      id: 3,
      name: "Sharm El-Sheikh",
      description: "Dive into breathtaking underwater vistas.",
      image: "/images/sharm-trending.png",
      gradientColors: {
        start: "rgba(187, 80, 80, 1)",
        end: "rgba(187, 80, 80, 0)"
      }
    },
    {
      id: 4,
      name: "Luxor & Aswan",
      description: "Journey through timeless historic treasures.",
      image: "/images/luxor-trending.png",
      gradientColors: {
        start: "rgba(242, 158, 34, 1)",
        end: "rgba(242, 158, 34, 0)"
      }
    }
  ];