import { Box, Flex, Heading, Button, Container } from '@chakra-ui/react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import LocationSelector from './LocationSelector';
import TravelersSelector from './TravelersSelector';
import DateSelector from './DateSelector';

// Create motion components
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionHeading = motion(Heading);
const MotionButton = motion(Button);

interface HeroSectionProps {
  userName?: string;
}

export function HeroSection({ userName }: HeroSectionProps) { 
  const [selectedLocation, setSelectedLocation] = useState('Cairo, Egypt');
  const [travelerCounts, setTravelerCounts] = useState({
    adults: 2,
    children: 1,
    rooms: 1
  });
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: new Date(2025, 2, 12), // March 12, 2025
    endDate: new Date(2025, 2, 27)    // March 27, 2025
  });

  return (
    <MotionBox
      h="540px"
      position="relative"
      w="full"
      overflow="visible"
      initial={{ scale: 1.05, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <Image
        src="/images/main_page.png"
        alt="Egyptian landscape"
        fill
        style={{
          objectFit: 'cover',
          objectPosition: 'center'
        }}
        priority
      />

      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="rgba(0, 0, 0, 0.6)"
        zIndex={1}
      />

      <MotionFlex
        position="relative"
        zIndex={2}
        justifyContent="center"
        alignItems="center"
        py={{ md: "134px", base: "20px" }}
        h="full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        overflow="visible"
      >
        <Container
          display="flex"
          justifyContent="center"
          px={{ md: "0px", base: "40px" }}
          overflow="visible"
          position="relative"
          zIndex={5}
        >
          <MotionFlex 
            flexDirection="column" 
            alignItems="flex-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <MotionFlex 
              alignItems="center" 
              height="40px"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Box
                as="svg"
                xmlns="http://www.w3.org/2000/svg"
                width="26px"
                height="26px"
                fill="none"
                mr="2"
                sx={{
                  "&:hover": {
                    transform: "rotate(45deg) scale(1.2)",
                    transition: "transform 0.3s ease"
                  }
                }}
              >
                <path
                  fill="#fff"
                  d="M3.6 13.2 26.4 2.4 15.6 25.2l-2.4-9.6-9.6-2.4Z"
                />
              </Box>
              <MotionHeading
                as="h1"
                fontWeight="semibold"
                fontSize="md"
                color="white"
                lineHeight="1"
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.2 } 
                }}
              >
                Egypt
              </MotionHeading>
            </MotionFlex>

            <MotionHeading
              size="xl"
              fontWeight="semibold"
              color="white"
              textAlign="left"
              as="h1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ 
                scale: 1.03,
                x: 5,
                textShadow: "0px 0px 8px rgba(255, 255, 255, 0.5)",
                transition: { duration: 0.2 } 
              }}
            >
              Hey{userName ? `, ${userName}` : ''}!
            </MotionHeading>

            <MotionHeading
              size="xl"
              fontWeight="semibold"
              color="white"
              textAlign="left"
              as="h1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ 
                scale: 1.03,
                x: 5,
                textShadow: "0px 0px 8px rgba(255, 255, 255, 0.5)",
                transition: { duration: 0.2 } 
              }}
            >
              Tell us where you want to stay
            </MotionHeading>

            <MotionHeading
              size="md"
              as="h1"
              color="white"
              fontWeight="md"
              textAlign="left"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ 
                scale: 1.03,
                x: 5,
                textShadow: "0px 0px 8px rgba(255, 255, 255, 0.5)",
                transition: { duration: 0.2 } 
              }}
            >
              Book 450+ Curated Egyptian Hotels
            </MotionHeading>

            <MotionFlex
              mt="22px"
              bg="rgba(255, 255, 255, 0.15)"
              justifyContent="space-between"
              alignItems="center"
              p={{ base: "12px", md: "8px" }}
              mx={{ md: "40px", base: "0px" }}
              borderRadius="34px"
              flexDirection={{ md: "row", base: "column" }}
              backdropFilter="blur(5px)"
              gap={{ base: "10px", md: "0" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              whileHover={{
                boxShadow: "0px 0px 15px rgba(210, 172, 113, 0.3)",
                transition: { duration: 0.3 }
              }}
              position="relative"
              zIndex={10}
              overflow="visible"
            >
              <Flex 
                px={{ base: "20px", sm: "32px" }}
                minW={{ base: "100%", md: "auto" }}
                flex={{ base: "1", md: "0 0 auto" }}
                justifyContent="flex-start"
              >
                <LocationSelector 
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                  textColor="white"
                  accentColor="#D2AC71"
                />
              </Flex>

              <Flex
                flex={{ base: "1", md: "1" }}
                justifyContent="center"
                alignItems="center"
                alignSelf={{ md: "auto", base: "stretch" }}
                flexDirection={{ md: "row", base: "column" }}
              >
                <Flex
                  flex="1"
                  justifyContent="center"
                  alignItems="center"
                  px={{ md: "48px", base: "20px" }}
                  alignSelf={{ md: "auto", base: "stretch" }}
                  flexDirection={{ base: "column", sm: "row" }}
                >
                  <Box
                    h={{ base: "1px", sm: "42px" }}
                    bg="rgba(255, 255, 255, 0.2)"
                    w={{ base: "42px", sm: "1px" }}
                    my={{ base: "2", sm: "0" }}
                  />

                  <Flex
                    flex={{ base: "1", md: "0 0 auto" }}
                    minW={{ md: "260px" }}
                    justifyContent="center"
                    alignItems="center"
                    px="6px"
                    alignSelf={{ base: "stretch", sm: "auto" }}
                  >
                    <DateSelector
                      dateRange={dateRange}
                      setDateRange={setDateRange}
                      textColor="white"
                      accentColor="#D2AC71"
                    />
                  </Flex>

                  <Box
                    h={{ base: "1px", sm: "42px" }}
                    ml={{ base: "0px", sm: "8px" }}
                    bg="rgba(255, 255, 255, 0.2)"
                    w={{ base: "42px", sm: "1px" }}
                    my={{ base: "2", sm: "0" }}
                  />

                  <Flex 
                    flex={{ base: "1", md: "0 0 auto" }}
                    minW={{ md: "230px" }}
                    px="8px" 
                    alignSelf={{ base: "stretch", sm: "auto" }}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <TravelersSelector
                      travelerCounts={travelerCounts}
                      setTravelerCounts={setTravelerCounts}
                      textColor="white"
                      accentColor="#D2AC71"
                    />
                  </Flex>
                </Flex>

                <MotionButton
                  size="lg"
                  bg="#356e54"
                  color="white"
                  fontWeight={600}
                  minW="204px"
                  borderRadius="26px"
                  _hover={{ bg: '#2a5a44' }}
                  mt={{ base: "4", md: "0" }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0px 0px 15px rgba(53, 110, 84, 0.7)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                >
                  Explore Stays
                </MotionButton>
              </Flex>
            </MotionFlex>
          </MotionFlex>
        </Container>
      </MotionFlex>
    </MotionBox>
  );
}