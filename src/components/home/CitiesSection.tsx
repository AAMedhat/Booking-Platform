import { useState, useRef, useEffect } from 'react';
import { Box, Flex, Text, Heading, IconButton } from '@chakra-ui/react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { CityCard, cityCards } from './types';
import { motion } from 'framer-motion';
import { fadeInUp, carouselItem, scrollAnimationProps } from '@/components/animations';

// Create motion components
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionText = motion(Text);
const MotionHeading = motion(Heading);

export function CitiesSection() {
  const [autoScroll, setAutoScroll] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

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
        initial="hidden"
        animate="visible"
        whileHover={{ 
          scale: 1,
          y: -10, 
          transition: { duration: 0.3, ease: "easeOut" },
          textShadow: "0px 0px 10px rgba(210, 170, 112, 0.8)"
        }}
        cursor="pointer"
      >
        Discover New Places
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
            {cityCards.map((city) => (
              <CityCardComponent 
                key={city.id}
                city={city}
              />
            ))}
            {/* Add duplicate items for seamless looping */}
            {cityCards.map((city) => (
              <CityCardComponent 
                key={`duplicate-${city.id}`}
                city={city}
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

function CityCardComponent({ city }: { city: CityCard }) {
  return (
    <MotionBox 
      display="inline-block"
      w="200px"
      h="300px"
      flexShrink={0}
      borderRadius="24px"
      overflow="hidden"
      position="relative"
      variants={carouselItem}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.3 } 
      }}
    >
      <Image
        src={city.image}
        alt={city.name}
        fill
        style={{ objectFit: "cover" }}
        priority
      />
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        bgGradient="linear(to-b, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.9))"
        p={2}
      >
        <MotionText 
          color="white" 
          fontWeight="semibold"
          fontSize={{ base: "sm", md: "md" }}
          pl={3}
          pb={3}
          variants={fadeInUp}
        >
          {city.name}
        </MotionText>
      </Box>
    </MotionBox>
  );
}