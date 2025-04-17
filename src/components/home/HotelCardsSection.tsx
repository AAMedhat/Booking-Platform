import { useState, useRef, useEffect } from 'react';
import { Box, Flex, Text, Heading, IconButton, Badge, useToast } from '@chakra-ui/react';
import Image from 'next/image';
import { FaHeart, FaRegHeart, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { HotelCard, hotelCards } from './types';
import { motion } from 'framer-motion';
import { fadeInUp, carouselItem, scrollAnimationProps } from '@/components/animations';
import { useFavorites } from '@/app/context/FavoritesContext';
import { useAuth } from '@/app/context/AuthContext';

// Create motion components
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionText = motion(Text);
const MotionHeading = motion(Heading);
const MotionBadge = motion(Badge);

export function HotelCardsSection() {
  const [autoScroll, setAutoScroll] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { isLoggedIn } = useAuth();
  const toast = useToast();

  useEffect(() => {
    if (!autoScroll || !carouselRef.current || isHovering) return;

    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        const maxScroll = scrollWidth - clientWidth;
        const nextScroll = (scrollLeft + 300) % (maxScroll + 300); // Circular scroll
        
        carouselRef.current.scrollTo({ 
          left: nextScroll, 
          behavior: 'smooth' 
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [autoScroll, isHovering]);

  const toggleFavorite = (hotel: HotelCard) => {
    if (!isLoggedIn) {
      toast({
        title: "Login required",
        description: "Please log in to save favorites",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
      return;
    }
    
    if (isFavorite(hotel.id)) {
      removeFavorite(hotel.id);
    } else {
      addFavorite(hotel);
      toast({
        title: "Added to favorites",
        description: `${hotel.title} has been added to your favorites`,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right"
      });
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth } = carouselRef.current;
      const scrollAmount = 300;
      
      let newScroll;
      if (direction === 'left') {
        newScroll = (scrollLeft - scrollAmount + scrollWidth) % scrollWidth;
      } else {
        newScroll = (scrollLeft + scrollAmount) % scrollWidth;
      }
      
      carouselRef.current.scrollTo({ 
        left: newScroll, 
        behavior: 'smooth' 
      });
      
      setAutoScroll(false);
      setTimeout(() => setAutoScroll(true), 10000);
    }
  };

  return (
    <MotionBox 
      py={12} 
      px={{ base: 4, md: 16 }} 
      position="relative"
      variants={fadeInUp}
      {...scrollAnimationProps}
    >
      <MotionHeading 
        as="h2" 
        fontSize="2xl" 
        fontWeight="bold" 
        color="white" 
        mb={8}
        textAlign="left"
        variants={fadeInUp}
        whileHover={{ 
          scale: 1,
          y: -10, 
          transition: { duration: 0.3, ease: "easeOut" },
          textShadow: "0px 0px 10px rgba(210, 170, 112, 0.8)"
        }}
        cursor="pointer"
      >
        The Most Relevant
      </MotionHeading>

      <Box position="relative">
        <IconButton
          aria-label="Scroll left"
          icon={<FaChevronLeft />}
          position="absolute"
          left="-15px"
          top="50%"
          transform="translateY(-50%)"
          zIndex="2"
          bg="rgba(246, 238, 229, 0.7)"
          color="#d2aa70"
          borderRadius="full"
          size="lg"
          onClick={() => scroll('left')}
          _hover={{ bg: 'rgba(94, 76, 48, 0.5)' }}
        />
        
        <Box 
          ref={carouselRef}
          overflowX="hidden"
          whiteSpace="nowrap"
          scrollBehavior="smooth"
          position="relative"
          py={4}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          css={{
            '&::-webkit-scrollbar': {
              display: 'none'
            },
          }}
        >
          <MotionFlex 
            gap={6} 
            display="inline-flex"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="visible"
          >
            {hotelCards.map((hotel) => (
              <HotelCardComponent 
                key={hotel.id}
                hotel={hotel}
                isFavorite={isFavorite(hotel.id)}
                toggleFavorite={toggleFavorite}
              />
            ))}
            {/* Add duplicate items for seamless looping */}
            {hotelCards.map((hotel) => (
              <HotelCardComponent 
                key={`duplicate-${hotel.id}`}
                hotel={hotel}
                isFavorite={isFavorite(hotel.id)}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </MotionFlex>
        </Box>

        <IconButton
          aria-label="Scroll right"
          icon={<FaChevronRight />}
          position="absolute"
          right="-15px"
          top="50%"
          transform="translateY(-50%)"
          zIndex="2"
          bg="rgba(246, 238, 229, 0.7)"
          color="#d2aa70"
          borderRadius="full"
          size="lg"
          onClick={() => scroll('right')}
          _hover={{ bg: 'rgba(94, 76, 48, 0.5)' }}
        />
      </Box>
    </MotionBox>
  );
}

function HotelCardComponent({ hotel, isFavorite, toggleFavorite }: { 
  hotel: HotelCard, 
  isFavorite: boolean, 
  toggleFavorite: (hotel: HotelCard) => void 
}) {
  return (
    <MotionBox 
      display="inline-block"
      w="450px"
      h="400px"
      flexShrink={0}
      bg="rgba(246, 238, 229, 1)"
      borderRadius="42px" // More circular radius
      overflow="hidden"
      position="relative"
      variants={carouselItem}
      whileHover={{ 
        y: -5,
        boxShadow: '0 10px 20px rgba(94, 76, 48, 0.5)',
        transition: { duration: 0.3 }
      }}
    >
      <Box position="relative"
        h="300px" 
        borderRadius="42px"
        overflow="hidden" 
        >
        <Image
          src={hotel.image}
          alt={hotel.title}
          fill
          style={{ objectFit: 'cover' }}
        />
        {/* Location Badge - Top Right */}
        <MotionBox
          position="absolute"
          top={6}
          left={8}
          bg="rgba(246, 238, 229, 0.7)"
          color="black"
          px={3}
          py={1}
          borderRadius="full"
          fontSize="md"
          fontWeight="bold"
          backdropFilter="blur(5px)"
          variants={fadeInUp}
        >
          {hotel.location}
        </MotionBox>
        
        {/* Favorite Button */}
        <IconButton
          aria-label="Add to favorites"
          icon={isFavorite ? <FaHeart color="#d2aa70" /> : <FaRegHeart color="black" />}
          position="absolute"
          top={6}
          right={8}
          bg="rgba(246, 238, 229, 0.7)"
          borderRadius="full"
          border="2px solid #d2aa70" 
          onClick={() => toggleFavorite(hotel)}
          _hover={{ 
            bg: 'rgba(94, 76, 48, 0.5)',
            borderColor: '#d2aa70' 
          }}
          _active={{
            transform: 'scale(0.95)' 
          }}
        />
      </Box>
      
      <MotionBox p={4} whiteSpace="normal" variants={fadeInUp}>
        <MotionFlex justify="space-between" align="center" mb={2} variants={fadeInUp}>
          <MotionText fontWeight="bold" fontSize="xl" color="black" variants={fadeInUp}>{hotel.title}</MotionText>
        </MotionFlex>

        <MotionFlex justify="space-between" align="center" mb={3} variants={fadeInUp}>
          <MotionText fontSize="md" color="black" variants={fadeInUp}>
            From ${hotel.price} per person
          </MotionText>
          <MotionBadge 
            bg="rgba(246, 238, 229, 0)"
            color="#d2aa70"
            display="flex" 
            alignItems="center"
            px={3}
            py={1}
            borderRadius="full"
            backdropFilter="blur(5px)"
            variants={fadeInUp}
          >
            <FaStar style={{ marginRight: '4px' }} />
            <Text fontWeight="medium" color="black">{hotel.rating}</Text>
          </MotionBadge>
        </MotionFlex>
      </MotionBox>
    </MotionBox>
  );
}