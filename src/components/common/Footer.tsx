import { Box, Container, Flex, Text, Button, HStack, Link, VStack, Image } from '@chakra-ui/react'
import { motion } from 'framer-motion'
// Create motion components
const MotionBox = motion(Box)
const MotionButton = motion(Button)
const MotionLink = motion(Link)
const MotionVStack = motion(VStack)

export function Footer() {
  const socialLinks = [
    { name: 'Instagram', url: 'https://www.instagram.com', image: "/images/Insta.png" },
    { name: 'Facebook',  url: 'https://www.facebook.com', image: "/images/Facebook.png" },
    { name: 'TikTok', url: 'https://www.tiktok.com', image: "/images/TikTok.png" },
    { name: 'x',url: 'https://www.x.com', image: "/images/X.png" },
    { name: 'LinkedIn', url: 'https://www.linkedin.com', image: "/images/LinkedIn.png" }

  ]


  return (
    <MotionBox
      as="footer"
      position="relative"
      overflow="hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      py={0}
      px={{ base: 4, md: 16 }}
      bgGradient="radial-gradient(circle at bottom center, rgba(212, 142, 113, 0.1) 15%, rgba(212, 143, 113, 0.02) 55%, #121212 80%)"

    >
      {/* Gradient overlay */}

      <Container minW="1460px"  position="relative" zIndex={2} py={12}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "center", md: "center" }}
          gap={4}
        >
          {/* Left Column - Logo, Tagline, Button and Navigation */}
          <MotionVStack
            align={{ base: "center", md: "flex-start" }}
            spacing={3}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}          >
            {/* Logo */}
            <Image
              src="/images/logo2.png"
              alt="logo2"
              style={{ objectFit: 'contain' }}
            />
            {/* Tagline */}
            <Text
              color="white"
              fontSize="2xl"
              fontWeight="semibold"
              mb={4}
              textAlign={{ base: "center", md: "left" }}
              alignSelf={{ base: "center", md: "flex-start" }}
              whiteSpace="normal"
            >
              Lorem, Ipsum Lorem, Ipsum, <br />
              Lorem, Ipsum or less.
            </Text>

            {/* Discover More button */}
            <MotionButton
              bg="#d2aa70"
              border="1px solid"
              borderColor="#d2aa70"
              color="white"
              borderRadius="full"
              px={10}
              py={5}
              mb={4}
              alignSelf={{ base: "center", md: "flex-start" }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(210, 172, 113, 0.15)",
                transition: { duration: 0.2 }
              }}
            >
              Discover More
            </MotionButton>

            {/* Navigation Links - Horizontal */}
            <HStack
              spacing={{ base: 4, md: 8 }}
              flexWrap="wrap"
              justify={{ base: "center", md: "flex-start" }}
              alignSelf="stretch"
            >
              <MotionLink
                color="white"
                fontSize="md"
                fontWeight="medium"
                _hover={{ color: "rgba(210, 172, 113, 0.15)" }}
                transition={{ duration: 0.2 }}
                textDecoration="none"
                whileHover={{ y: -2 }}
                mb={2}
                href="/"

              >
                <Text color='white' fontWeight="regular">Home</Text>
              </MotionLink>

              {['Book', 'Explore', 'Tales', 'Treasure'].map((item) => (
                <MotionLink
                  key={item} href={`/egy${item.toLowerCase()}`}
                  color="white"
                  fontSize="md"
                  fontWeight="medium"
                  _hover={{ color: "rgba(210, 172, 113, 0.15)" }}
                  transition={{ duration: 0.2 }}
                  textDecoration="none"
                  whileHover={{ y: -2 }}
                  mb={2}
                >
                  <Text as="span" fontWeight="bold" color='#d2aa70'>Egy</Text>
                  <Text as="span" fontWeight="regular" color='#FFFFFF'>{item}</Text>
                </MotionLink>
              ))}

            </HStack>
          </MotionVStack>

          {/* Right Column - Social Icons and Copyright */}
          <MotionVStack
            align={{ base: "center", md: "flex-end" }}
            spacing={3}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            justifyContent="flex-end"
            alignSelf="stretch"
            mt={{ base: 0, md: "auto" }}
          >
            {/* Social Icons */}
            <HStack spacing={4} mb={4} justify={{ base: "center", md: "flex-end" }}>
              {socialLinks.map((social, index) => (
                <MotionLink
                  key={social.name}
                  href={social.url}
                  isExternal
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width="45px"
                  height="45px"
                  bg="#d2aa70"
                  borderRadius="15px"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                  _hover={{
                    transform: "scale(1.1)",
                    bg: "rgba(210, 172, 113, 0.15)",
                  }}
                  aria-label={social.name}
                >
                  <Image
                    src={social.image}
                    alt={social.name}
                    boxSize="35px"
                    objectFit="contain"
                  />
                </MotionLink>
              ))}
            </HStack>

            {/* Copyright */}
            <VStack spacing={1} align={{ base: "center", md: "flex-end" }}>
              <Text color="rgba(255, 255, 255, 0.6)" fontSize="sm">
                Copyright Gates of Egypt © {new Date().getFullYear()}
              </Text>
              <Text color="rgba(255, 255, 255, 0.4)" fontSize="sm">
                All rights reserved
              </Text>
            </VStack>
          </MotionVStack>
        </Flex>
      </Container>
    </MotionBox>
  )
} 