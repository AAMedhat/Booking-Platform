import { Box } from '@chakra-ui/react';
import { Navbar } from '@/components/common/Navbar';
import { HeroSection } from '@/components/home/HeroSection';
import { HotelCardsSection } from '@/components/home/HotelCardsSection';
import { CitiesSection } from '@/components/home/CitiesSection';
import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection';
import { TrendingDestinationsSection } from '@/components/home/TrendingDestinationsSection';
import { BookingCallToAction } from '@/components/home/BookingCallToAction';
import { Footer } from '@/components/common/Footer';
import { motion } from 'framer-motion';
import { useAuth } from '@/app/context/AuthContext';

// Create motion components
const MotionBox = motion(Box);

export function HomePage() {
  const { user } = useAuth();
  
  return (
    <MotionBox 
      minH="100vh" 
      bg="#121212"
      
    >
      <Navbar />
      <HeroSection userName={user?.name} />
      <HotelCardsSection />
      <CitiesSection />
      <WhyChooseUsSection />
      <TrendingDestinationsSection />
      <BookingCallToAction />
      <Footer />
    </MotionBox>
  );
}