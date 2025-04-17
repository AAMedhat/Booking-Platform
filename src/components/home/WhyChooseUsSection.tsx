import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { fadeInUp, scrollAnimationProps, staggerContainer } from '@/components/animations';
import Image from 'next/image';

// Create motion components
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionVStack = motion(VStack);

export function WhyChooseUsSection() {
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
        <Text as="span" fontWeight="bold" color="white"> Why choose </Text>
        <Text as="span" fontWeight="bold" color="#d2aa70">Egy</Text>
        <Text as="span" fontWeight="medium" color="white">Book?</Text>
      </MotionHeading>

      <MotionFlex 
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        alignItems="flex-start"
        gap={{ base: 8, md: 4 }}
        width="full"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Feature 1 - Seamless & Smart Booking */}
        <MotionVStack 
          align="flex-start" 
          spacing={4} 
          flex={1}
          maxW="380px"
          px={{ md: 2 }}
          variants={fadeInUp}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
        >
          <MotionBox 
            p={3} 
            borderRadius="lg" 
            mb={2}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.15, 
              rotate: 5,
              transition: { duration: 0.3 }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="53" height="59" fill="none"><g clipPath="url(#a)"><path fill="#346D52" d="M41.74 58.73a2.72 2.72 0 0 1-2.38 0 2.68 2.68 0 0 1-.83-.58 2.5 2.5 0 0 1-.31-.42l-4.4-7.14-3.74 4.32a7.5 7.5 0 0 1-1.1 1.05l-.05.02a5.93 5.93 0 0 1-1.67.88 3.03 3.03 0 0 1-1.48.08 3.01 3.01 0 0 1-1.09-.44 3.01 3.01 0 0 1-.44-.37 3.51 3.51 0 0 1-.37-.48l-.05-.1-.05-.1-.62-1.67v-.09l-3.3-32.92a2.15 2.15 0 0 1 0-.64 2.05 2.05 0 0 1 1.8-1.68 2.11 2.11 0 0 1 1.23.24l.15.07c6.55 4.25 12.66 8.2 18.75 12.13l9.22 5.95a5.71 5.71 0 0 1 .88.7l.03.03a3.58 3.58 0 0 1 1 1.92 3.14 3.14 0 0 1-.11 1.15 3.13 3.13 0 0 1-.79 1.3 5.07 5.07 0 0 1-1.61 1.1 6.98 6.98 0 0 1-1.46.48c-1.34.26-2.68.59-4.01.9l-1.58.37 4.37 7.18a2.66 2.66 0 0 1 .3 2.02v.05a2.63 2.63 0 0 1-.74 1.26 2.9 2.9 0 0 1-.4.32l-.97.62a40.38 40.38 0 0 1-4.18 2.49ZM18.26 9.34a1.9 1.9 0 0 1-.75 2.56 1.96 1.96 0 0 1-2.6-.64l-3.89-6.72a1.9 1.9 0 0 1 .77-2.52 1.96 1.96 0 0 1 2.58.6l3.92 6.72h-.03ZM10.98 31.8a1.96 1.96 0 0 1 2.55.76 1.9 1.9 0 0 1-.6 2.56l-6.8 3.87a1.96 1.96 0 0 1-2.55-.76 1.9 1.9 0 0 1 .6-2.56l6.8-3.87Zm-1-12.67a1.9 1.9 0 0 1 .42 3.47c-.43.26-.94.34-1.43.24l-7.51-2.02a1.9 1.9 0 0 1-.42-3.43c.41-.26.9-.36 1.39-.28l7.53 2.02h.02Zm29.81.64a1.96 1.96 0 0 1-2.54-.76 1.9 1.9 0 0 1 .6-2.56l6.8-3.87a1.96 1.96 0 0 1 2.54.76 1.9 1.9 0 0 1-.6 2.56l-6.8 3.87Zm-9-9.9a1.91 1.91 0 0 1-1.61 1.54 1.96 1.96 0 0 1-2-1 1.9 1.9 0 0 1-.12-1.52l2-7.45c.15-.46.48-.84.91-1.06a1.96 1.96 0 0 1 2.55.65c.27.4.37.9.28 1.37l-2 7.48Zm9.8 46.27 4.69-2.81c-1.64-2.7-4.3-6.5-5.59-9.2a1.14 1.14 0 0 1 .1-1.04c.16-.27.42-.45.72-.52 2.61-.59 5.28-1.14 7.87-1.79.3-.06.6-.16.88-.28.22-.1.44-.22.63-.36.07-.06.13-.12.18-.19a.43.43 0 0 0 .07-.11l-.03-.09c-.05-.1-.13-.18-.21-.25a2.8 2.8 0 0 0-.4-.3L22.84 21.96c1.02 10.25 2.52 21.17 3.13 31.35.01.17.04.33.09.48l.12.3.07.07h.14l.24-.08c.23-.1.44-.23.62-.38.24-.2.46-.4.66-.64.94-1.09 4.66-5.83 5.53-6.33a1.18 1.18 0 0 1 1.6.4l5.55 9Z"/></g><defs><clipPath id="a"><path fill="#121212" d="M0 0h53v59H0z"/></clipPath></defs></svg>
          </MotionBox>
          <Box>
            <MotionText 
              fontSize="xl" 
              fontWeight="bold" 
              color="white"
              lineHeight="tall"
              variants={fadeInUp}
              whileHover={{ 
                color: "#d2aa70",
                transition: { duration: 0.2 }
              }}
            >
              <Text as="span" fontWeight="bold" color="#d2aa70">Seamless </Text>
              <Text as="span" fontWeight="medium" color="white">& </Text>
              <Text as="span" fontWeight="bold" color="#346D52">Smart </Text>
              <Text as="span" fontWeight="medium" color="white">Booking</Text>
            </MotionText>
          </Box>
          <Box width="100%">
            <Text
              color="white"
              fontSize="md"
              fontWeight="medium"
              lineHeight="tall"
              opacity={0.8}
              _groupHover={{ opacity: 1, fontWeight: "semibold" }}
            >
              Quick, user-friendly platform that simplifies the reservation process
            </Text>
          </Box>
        </MotionVStack>

        {/* Feature 2 - VR */}
        <MotionVStack 
          align="flex-start" 
          spacing={4} 
          flex={1}
          maxW="380px"
          px={{ md: 2 }}
          variants={fadeInUp}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
          role="group"
        >
          <MotionBox 
            p={3} 
            borderRadius="lg" 
            mb={2}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.15, 
              rotateY: 10,
              transition: { duration: 0.3 }
            }}
          >
            <Image
              src= "/images/VR.png"
              alt= "logo2"
              width={60}
              height={50}
              style={{ objectFit: 'contain' }}
            />
          </MotionBox>
          <Box>
            <MotionText 
              fontSize="xl" 
              fontWeight="bold" 
              color="white"
              lineHeight="tall"
              variants={fadeInUp}
              whileHover={{ 
                color: "#346D52",
                transition: { duration: 0.2 }
              }}
            >
              <Text as="span" fontWeight="bold" fontStyle="italic" color="#346D52">Immersive </Text>
              <Text as="span" fontWeight="bold" color="white">VR Previews</Text>
            </MotionText>
          </Box>
          <Box width="100%">
            <Text
              color="white"
              fontSize="md"
              fontWeight="medium"
              lineHeight="tall"
              opacity={0.8}
              _groupHover={{ opacity: 1, fontWeight: "semibold" }}
            >
              Explore hotels and rooms in 360° before you book—giving you total confidence.
            </Text>
          </Box>
        </MotionVStack>

        {/* Feature 3 - Exclusive Best-Price Deals */}
        <MotionVStack 
          align="flex-start" 
          spacing={4} 
          flex={1}
          maxW="380px"
          px={{ md: 2 }}
          variants={fadeInUp}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
          role="group"
        >
          <MotionBox 
            p={3} 
            width="63" 
            borderRadius="lg" 
            mb={2}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.15, 
              y: -5,
              transition: { 
                duration: 0.3,
                type: "spring",
                stiffness: 200
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="63" height="65" fill="none"><path fill="#346D52" fillRule="evenodd" d="M47.96 35.4a2.72 2.72 0 0 1 2.5 1.64 2.64 2.64 0 0 1-.59 2.91 2.7 2.7 0 0 1-1.91.78c-1.49 0-2.7-1.2-2.7-2.66 0-1.48 1.2-2.68 2.7-2.68ZM32 11.64a1.54 1.54 0 0 0-.6-1.14 2 2 0 0 0-.94-.36v2.82l.7.15c.68.15 1.28.34 1.8.58.51.25.95.54 1.3.87.35.33.62.72.8 1.15.19.44.28.93.29 1.47 0 .85-.23 1.58-.66 2.2a4.07 4.07 0 0 1-1.86 1.4c-.67.27-1.46.43-2.37.47v1.53h-1.1v-1.53a7.53 7.53 0 0 1-2.43-.5 4.19 4.19 0 0 1-1.98-1.53 4.64 4.64 0 0 1-.73-2.62h3.16c.03.43.15.8.35 1.08.21.3.5.51.87.66.23.1.49.16.76.2v-2.98l-.98-.22a6.25 6.25 0 0 1-2.8-1.3 3.07 3.07 0 0 1-1-2.44c0-.84.22-1.57.68-2.2a4.5 4.5 0 0 1 1.9-1.47 6.6 6.6 0 0 1 2.2-.5V5.9h1.1v1.52c.83.05 1.58.22 2.22.51.78.36 1.39.85 1.82 1.5.43.63.65 1.37.66 2.2H32Zm-2.64-1.5c-.19.02-.36.07-.51.12-.29.11-.5.27-.64.46s-.22.4-.22.65c0 .2.03.38.12.54.1.15.23.29.4.4a2.8 2.8 0 0 0 .85.38v-2.55Zm1.1 8.4c.2-.04.39-.09.55-.15.32-.12.56-.28.73-.5.17-.2.25-.45.26-.72a1 1 0 0 0-.24-.66c-.16-.18-.4-.34-.72-.47a5.7 5.7 0 0 0-.58-.2v2.7ZM4.08 42.21a7.61 7.61 0 0 1-3.7-4.78c-.69-2.49-.37-5.35.4-7.77a1.08 1.08 0 0 1 1.34-.69l1.53.48c.56.18.88.78.7 1.33-.5 1.55-.81 3.44-.5 5.1.1.54.27 1.06.53 1.54.47-2.12 1.4-4.18 2.72-6.11 1.6-2.35 3.5-4.26 5.63-5.78a24.57 24.57 0 0 1 4.56-2.56 14.69 14.69 0 0 1 1.9-18.64A15.01 15.01 0 0 1 29.8 0c4.13 0 7.87 1.66 10.58 4.34a14.69 14.69 0 0 1 3.74 14.8l.17-.07c1.1-.37 3.66-.4 4.88-.42 1-.02 2.03 0 3.02.1.56.05 1.04.13 1.39.23 1.03.29 1.4.98 1.52 1.97.14 1.21-.41 2.25-1.22 3.12-.7.76-1.56 1.38-2.26 1.85-.37.25-.72.49-1 .7l.3.2c1.62.96 3.25 2.5 4.56 4.25 1.28 1.7 2.27 3.6 2.69 5.38l.01.06c.05.28.1.57.2.84h.14a9.82 9.82 0 0 0 .78-.05c.65-.05 1.16-.08 1.75.21l.07.04c.53.29.96.8 1.33 1.76l.02.05c.43 1.13.58 2.63.53 4.13-.06 1.63-.36 3.3-.8 4.49a3.52 3.52 0 0 1-2.11 2.66c-.92.4-1.96.45-3.04.45l-1.08-.03h-.1l-.12.16c-.64.8-1.37 1.56-2.13 2.28-.77.72-1.55 1.38-2.28 1.98l-.06.05-.15.12.19.43.22.53.81 1.91.02.06.86 1.91.18.4c.27.6.36 1.15.33 1.64-.04.49-.21.92-.5 1.28-.26.34-.61.6-1.04.78-.54.24-1.2.33-1.92.29h-4.16a3.9 3.9 0 0 1-2.88-1 6.7 6.7 0 0 1-1.58-2.3l-.01-.02c-.18-.37-.34-.75-.55-1.11l-.21.08-.64.22c-6.05 2.04-11.53 1.76-17.6-.05-.25-.01-.34.15-.45.39l-.25.54c-.72 1.55-1.39 3-3.58 3.36h-.21l-4.38-.02c-.44 0-1 .02-1.44-.04a2.74 2.74 0 0 1-2.4-2.76 3.32 3.32 0 0 1 .36-1.49l1.14-2.46.8-1.7.24-.52c.06-.11.07-.18-.02-.28-.06-.07-.14-.12-.22-.17-4.33-3.17-7.64-8-8.15-13.33ZM6.1 39.6v.18l-.02 1.76v.1c.32 4.88 3.35 9.31 7.26 12.21.14.1.28.2.42.32 1.09.83 1.17 1.28.83 2.1-.14.34-.3.67-.46 1l-.85 1.81-1.18 2.54c-.23.51-.17 1.05.28 1.25.22.1.53.08.77.08l4.95.04c1.05-.2 1.49-1.17 1.96-2.2l.43-.9c.33-.63.65-1.08 1.4-1.2.55-.08 1 0 1.52.14 5.58 1.63 10.6 1.88 16.16.01.6-.2 1.57-.7 2.14-.5.27.08.5.26.73.51.21.24.4.56.58.9v.01c.2.37.34.68.47.98l.01.03c.28.62.63 1.2 1.08 1.6a1.92 1.92 0 0 0 1.52.49h4.26c.4.03.76 0 1-.12a.6.6 0 0 0 .25-.16.35.35 0 0 0 .06-.2c.02-.17-.03-.4-.15-.67l-.18-.39-.86-1.93-.02-.05-.84-1.95-.21-.52-.2-.46c-.23-.48-.34-.74-.27-1.17.1-.53.34-.72.85-1.13l.18-.14.05-.04c.71-.59 1.47-1.23 2.17-1.9a24.27 24.27 0 0 0 1.94-2.05c.64-.94.54-.97 1.65-.94h.23c.24.02.53.03 1.02.03.85 0 1.66-.04 2.22-.28.44-.19.77-.56.93-1.26a12.8 12.8 0 0 0 .75-4.1c.04-.96-.02-1.9-.2-2.68-.07-.31-.35-1.24-.6-1.41l-.02-.01c-.13-.07-1 .02-1.22.04a4.1 4.1 0 0 1-1.16-.06c-.69-.15-1-.53-1.25-1.14a6.33 6.33 0 0 1-.33-1.29 13.06 13.06 0 0 0-2.33-4.59 14.93 14.93 0 0 0-4.49-4.06c-.4-.26-.95-.63-1.08-1.11-.18-.68.15-1.26.76-1.81.39-.34.9-.7 1.44-1.06.6-.4 1.35-.93 1.9-1.53.44-.48.76-1 .7-1.53a1.3 1.3 0 0 0-.06-.26 8.1 8.1 0 0 0-1.01-.17c-.92-.08-1.87-.1-2.79-.08-.8.02-2.79.04-3.84.22-.55.1-1.03.32-1.52.59l-1 .58a14.89 14.89 0 0 1-6.58 6.11c1.2.25 2.4.56 3.61.93.9.27 1.4 1.2 1.12 2.1a1.7 1.7 0 0 1-2.11 1.1 31.9 31.9 0 0 0-9.2-1.48c-3-.01-6 .46-8.93 1.46a1.7 1.7 0 0 1-2.15-1.03c-.3-.88.16-1.83 1.05-2.13a30.7 30.7 0 0 1 3.57-1 15 15 0 0 1-4.64-3.48 22.72 22.72 0 0 0-4.66 2.54 20.72 20.72 0 0 0-5.12 5.26 15.02 15.02 0 0 0-2.7 7.15Zm23.67-37.7a13 13 0 0 1 13.07 12.92 13 13 0 0 1-13.07 12.92 13 13 0 0 1-13.06-12.92A13 13 0 0 1 29.78 1.9Z" clipRule="evenodd"/></svg>
          </MotionBox>
          <Box>
            <MotionText 
              fontSize="xl" 
              fontWeight="bold" 
              color="white"
              lineHeight="tall"
              variants={fadeInUp}
              whileHover={{ 
                color: "#346D52",
                transition: { duration: 0.2 }
              }}
            >
              <Text as="span" fontWeight="bold" color="#346D52">Exclusive </Text>
              <Text as="span" fontWeight="bold" color="white">Best-Price Deals</Text>
            </MotionText>
          </Box>
          <Box width="100%">
            <Text
              color="white"
              fontSize="md"
              fontWeight="medium"
              lineHeight="tall"
              opacity={0.8}
              _groupHover={{ opacity: 1, fontWeight: "semibold" }}
            >
              Save more with special offers and real-time price comparisons.
            </Text>
          </Box>
        </MotionVStack>
      </MotionFlex>
    </MotionBox>
  );
}