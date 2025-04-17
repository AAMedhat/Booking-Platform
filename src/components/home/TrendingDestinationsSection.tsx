import { useState, useRef, useEffect } from 'react';
import { Box, Flex, Text, Heading, IconButton, Button, Image } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { TrendingDestination, trendingDestinations } from './types';
import { motion } from 'framer-motion';
import { fadeInUp, carouselItem, buttonTap, scrollAnimationProps } from '@/components/animations';

// Create motion components
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionText = motion(Text);
const MotionHeading = motion(Heading);
const MotionButton = motion(Button);
const MotionImage = motion(Image);

export function TrendingDestinationsSection() {
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
        Trending Destinations
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
            {trendingDestinations.map((destination) => (
              <DestinationCardComponent
                key={destination.id}
                destination={destination}
              />
            ))}
            {/* Add duplicate items for seamless looping */}
            {trendingDestinations.map((destination) => (
              <DestinationCardComponent
                key={`duplicate-${destination.id}`}
                destination={destination}
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

function DestinationCardComponent({ destination }: { destination: TrendingDestination }) {
  return (
    <MotionBox
      display="inline-block"
      w="450px"
      h="400px"
      flexShrink={0}
      borderRadius="42px"
      overflow="hidden"
      position="relative"
      variants={carouselItem}
      whileHover={{
        translateY: -5,
        transition: { duration: 0.3 },
        boxShadow: '0 10px 20px rgba(94, 76, 48, 0.5)'
      }}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient={`linear(to-br, ${destination.gradientColors.start} 35%, ${destination.gradientColors.end} 80%  )`}
        opacity={0.7}
        zIndex={1}
      />
      <MotionImage
        src={destination.image}
        alt={destination.name}
        width="100%"
        height="100%"
        objectFit="cover"
        fallbackSrc="/placeholder-image.jpg" // Add fallback image
        // Preload important image (workaround for priority)
        sx={{
          '&': {
            content: '""',
            display: 'block',
            position: 'absolute',
            backgroundImage: `url(${destination.image})`,
            backgroundSize: '0 0',
          }
        }}
      />
      <MotionBox
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        top={5}
        p={4}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        zIndex={2}
        variants={fadeInUp}
      >
        <Box>
          <MotionText
            color="white"
            fontWeight="bold"
            fontSize="5xl"
            variants={fadeInUp}
          >
            {destination.name}
          </MotionText>
          <MotionText
            color="white"
            fontWeight="semibold"
            fontSize="2xl"
            maxW="350px"
            whiteSpace="normal"
            variants={fadeInUp}
          >
            {destination.description}
          </MotionText>
        </Box>

        <MotionButton
          variant="outline"
          color="black"
          bg="rgba(246, 238, 229, 0.9)"
          borderColor="white"
          borderRadius="full"
          fontWeight="semibold"
          size="md"
          width="200px"
          _hover={{
            bg: 'rgba(94, 76, 48, 0.5)'
          }}
          variants={fadeInUp}
          {...buttonTap}
        >
          See Hotels
        </MotionButton>
      </MotionBox>
    </MotionBox>
  );
}