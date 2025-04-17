export interface HotelCard {
  id: number;
  title: string;
  image: string;
  location: string;
  price: number;
  rating: number;
  description?: string;
}

export const hotelCards: HotelCard[] = [
  {
    id: 1,
    title: "Giza Pyramids View Hotel",
    location: "Giza",
    price: 199,
    rating: 4.8,
    image: "/images/pyramids.jpg", // Ensure these images exist in the public folder
    description: "Experience the majesty of the Pyramids from your room"
  },
  {
    id: 2,
    title: "Luxor Temple Resort",
    location: "Luxor",
    price: 179,
    rating: 4.7,
    image: "/images/luxor.jpg",
    description: "Luxury accommodations near the temples of Luxor"
  },
  {
    id: 3,
    title: "Alexandria Corniche Hotel",
    location: "Alexandria",
    price: 149,
    rating: 4.6,
    image: "/images/alexandria.jpg",
    description: "Stunning Mediterranean views and historical charm"
  },
  {
    id: 4,
    title: "Red Sea Coral Resort",
    location: "Hurghada",
    price: 229,
    rating: 4.9,
    image: "/images/redsea.jpg",
    description: "Dive into crystal clear waters and colorful reefs"
  },
  {
    id: 5,
    title: "Aswan Nile Palace",
    location: "Aswan",
    price: 189,
    rating: 4.7,
    image: "/images/aswan.jpg",
    description: "Tranquil accommodations along the Nile River"
  },
  {
    id: 6,
    title: "Cairo Khan el-Khalili Boutique",
    location: "Cairo",
    price: 159,
    rating: 4.5,
    image: "/images/cairo.jpg",
    description: "Authentic experiences in the heart of Cairo"
  }
]; 