import { Box, Flex, Heading, Text, Button, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { fadeInUp, fadeInRight, buttonTap, scrollAnimationProps } from '@/components/animations';

// Create motion components
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);
const MotionImage = motion(Image);

export function BookingCallToAction() {
  return (
    <Box 
      py={12} 
      px={{ base: 4, md: 16 }}
    >
      <MotionBox
        bg="#D7E8DC"
        borderRadius="40px"
        overflow="hidden"
        position="relative"
        boxShadow="0px 4px 24px rgba(0, 0, 0, 0.2)"
        variants={fadeInUp}
        {...scrollAnimationProps}
      >
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          h={{ base: 'auto', lg: '600px' }}
        >
          {/* Left Content */}
          <MotionFlex 
            p={{ base: 10, lg: 16 }} 
            maxW={{ base: '100%', lg: '50%' }}
            zIndex={1}
            direction="column"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.2, duration: 0.6 }}
          >
            <MotionHeading 
              as="h2" 
              fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
              fontWeight="bold"
              color="#1A2E1D"
              lineHeight="1.1"
              mb={6}
              variants={fadeInUp}
            >
              Ready to Book Your Next Adventure?
            </MotionHeading>

            <MotionText 
              fontSize={{ base: 'lg', md: 'xl' }}
              color="#1A2E1D"
              mb={10}
              maxW="550px"
              variants={fadeInUp}
            >
              Get exclusive deals and immersive previews with our smart booking platform.
            </MotionText>

            <MotionButton
              bg="#4C7F64"
              color="white"
              size="lg"
              height="60px"
              px={10}
              fontSize="xl"
              fontWeight="semibold"
              borderRadius="full"
              _hover={{
                bg: '#3A6149',
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
              }}
              _active={{
                transform: 'scale(0.98)'
              }}
              variants={fadeInUp}
              {...buttonTap}
            >
              Book now
            </MotionButton>
          </MotionFlex>

          {/* Right Image */}
          <MotionBox 
            h={{ base: '300px', lg: '100%' }} 
            w={{ base: '100%', lg: '50%' }} 
            position="relative"
            variants={fadeInRight}
            {...scrollAnimationProps}
          >
            <MotionImage
              src="/images/egypt-resort.png"
              alt="Egyptian luxury resort"
              width="100%"
              height="100%"
              objectFit="cover"
              objectPosition="center"
              // Fallback options
              fallbackSrc="/images/egypt-resort-placeholder.jpg"
              // Preload important image (workaround for priority)
              sx={{
                '&': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  backgroundImage: 'url(/images/egypt-resort.png)',
                  backgroundSize: '0 0',
                }
              }}
            />
          </MotionBox>
        </Flex>
      </MotionBox>
    </Box>
  );
}