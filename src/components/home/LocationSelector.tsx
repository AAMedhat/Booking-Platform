'use client';

import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

interface Location {
  id: number;
  name: string;
  displayName: string;
  description: string;
}

interface LocationSelectorProps {
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  textColor?: string;
  accentColor?: string;
}

const locations: Location[] = [
  { id: 1, name: 'Cairo', displayName: 'Cairo, Egypt', description: 'City in Egypt' },
  { id: 2, name: 'Alexandria', displayName: 'Alexandria, Egypt', description: 'City in Egypt' },
  { id: 3, name: 'Luxor', displayName: 'Luxor, Egypt', description: 'City in Egypt' },
  { id: 4, name: 'Aswan', displayName: 'Aswan, Egypt', description: 'City in Egypt' },
  { id: 5, name: 'Giza', displayName: 'Giza, Egypt', description: 'City in Egypt' },
  { id: 6, name: 'Hurghada', displayName: 'Hurghada, Egypt', description: 'City in Egypt' },
  { id: 7, name: 'Sharm El Sheikh', displayName: 'Sharm El Sheikh, Egypt', description: 'City in Egypt' },
  { id: 8, name: 'Marsa Alam', displayName: 'Marsa Alam, Egypt', description: 'City in Egypt' },
  { id: 9, name: 'Dahab', displayName: 'Dahab, Egypt', description: 'City in Egypt' },
  { id: 10, name: 'Abu Simbel', displayName: 'Abu Simbel, Egypt', description: 'City in Egypt' },
];

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  selectedLocation,
  setSelectedLocation,
  textColor = 'white',
  accentColor = '#D2AC71',
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleSelectLocation = (locationDisplayName: string) => {
    setSelectedLocation(locationDisplayName);
    onClose();
  };

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="bottom-start"
      closeOnBlur={true}
      gutter={8}
      lazyBehavior="unmount"
    >
      <PopoverTrigger>
        <Button
          ref={buttonRef}
          variant="ghost"
          color={textColor}
          fontSize="md"
          fontWeight="medium"
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          width="100%"
          height="100%"
          bg="transparent"
          leftIcon={
            <Box
              as="svg"
              xmlns="http://www.w3.org/2000/svg"
              width="16px"
              height="22px"
              fill="none"
              mr="2"
            >
              <path
                fill={accentColor}
                d="M8 21.833c-.253 0-.47-.072-.65-.216a1.317 1.317 0 0 1-.406-.57 15.073 15.073 0 0 0-1.3-2.843c-.506-.885-1.219-1.923-2.14-3.114-.92-1.192-1.67-2.33-2.248-3.413-.56-1.083-.84-2.392-.84-3.927 0-2.113.732-3.9 2.195-5.363C4.09.907 5.888.167 8 .167c2.112 0 3.9.74 5.362 2.22 1.48 1.463 2.22 3.25 2.22 5.363 0 1.643-.316 3.015-.947 4.117a28.46 28.46 0 0 1-2.14 3.223c-.975 1.3-1.715 2.383-2.22 3.25a15.297 15.297 0 0 0-1.22 2.708c-.09.253-.234.451-.433.596a1.06 1.06 0 0 1-.623.19Zm0-3.873c.307-.614.65-1.218 1.03-1.814.396-.596.974-1.39 1.733-2.384.776-1.01 1.408-1.94 1.895-2.79.506-.866.759-1.94.759-3.222 0-1.499-.533-2.772-1.598-3.819C10.772 2.866 9.499 2.333 8 2.333s-2.78.533-3.846 1.598c-1.047 1.047-1.57 2.32-1.57 3.819 0 1.282.243 2.356.73 3.223a29.168 29.168 0 0 0 1.924 2.79c.758.992 1.327 1.787 1.706 2.383.397.596.75 1.2 1.056 1.814Zm0-7.502c.758 0 1.4-.261 1.923-.785.524-.524.785-1.165.785-1.923s-.261-1.4-.785-1.923C9.399 5.303 8.758 5.042 8 5.042s-1.4.261-1.923.785c-.523.524-.785 1.165-.785 1.923s.262 1.4.785 1.923c.524.524 1.165.785 1.923.785Z"
              />
            </Box>
          }
          rightIcon={<ChevronDownIcon fontSize="sm" color={textColor} />}
          _hover={{ bg: 'transparent', transform: 'scale(1.05)' }}
          _active={{ bg: 'transparent' }}
          transition="all 0.2s"
        >
          <Text noOfLines={1} maxW="100%" textOverflow="ellipsis">
            {selectedLocation}
          </Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        w={{ base: "250px", sm: "300px" }}
        bg="rgba(68, 68, 68, 1)"
        backdropFilter="blur(5px)"
        mt={2}
        maxH="220px"
        css={{
          overflowY: "scroll",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "&:focus, &:focus-visible": {
            outline: "none",
            boxShadow: "none"
          }
        }}
        borderRadius="34px"
        borderColor="transparent"
        shadow="xl"
        zIndex={1500}
        _focus={{
          outline: "none"
        }}
        overflow="visible"
        position="relative"
      >
        <PopoverBody p={0} _focus={{ outline: "none" }} tabIndex={-1}>
          <VStack align="stretch" spacing={0}>
            <Box p={4}>
              <VStack align="stretch" spacing={0}>
                {locations.map((location) => (
                  <Flex
                    key={location.id}
                    py={3}
                    px={3}
                    align="center"
                    gap={3}
                    _hover={{ bg: 'rgba(210, 172, 113, 0.3)', cursor: 'pointer', borderRadius: '24px' }}
                    borderBottom="1px solid"
                    borderColor="transparent"
                    onClick={() => handleSelectLocation(location.displayName)}
                  >
                    <Box
                      w="45px"
                      h="45px"
                      bg="rgb(255, 255, 255)"
                      borderRadius="15px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="22" fill="none">
                        <path fill="black" d="M8 21.833c-.253 0-.47-.072-.65-.216a1.317 1.317 0 0 1-.406-.57 15.073 15.073 0 0 0-1.3-2.843c-.506-.885-1.219-1.923-2.14-3.114-.92-1.192-1.67-2.33-2.248-3.413-.56-1.083-.84-2.392-.84-3.927 0-2.113.732-3.9 2.195-5.363C4.09.907 5.888.167 8 .167c2.112 0 3.9.74 5.362 2.22 1.48 1.463 2.22 3.25 2.22 5.363 0 1.643-.316 3.015-.947 4.117a28.46 28.46 0 0 1-2.14 3.223c-.975 1.3-1.715 2.383-2.22 3.25a15.297 15.297 0 0 0-1.22 2.708c-.09.253-.234.451-.433.596a1.06 1.06 0 0 1-.623.19Zm0-3.873c.307-.614.65-1.218 1.03-1.814.396-.596.974-1.39 1.733-2.384.776-1.01 1.408-1.94 1.895-2.79.506-.866.759-1.94.759-3.222 0-1.499-.533-2.772-1.598-3.819C10.772 2.866 9.499 2.333 8 2.333s-2.78.533-3.846 1.598c-1.047 1.047-1.57 2.32-1.57 3.819 0 1.282.243 2.356.73 3.223a29.168 29.168 0 0 0 1.924 2.79c.758.992 1.327 1.787 1.706 2.383.397.596.75 1.2 1.056 1.814Zm0-7.502c.758 0 1.4-.261 1.923-.785.524-.524.785-1.165.785-1.923s-.261-1.4-.785-1.923C9.399 5.303 8.758 5.042 8 5.042s-1.4.261-1.923.785c-.523.524-.785 1.165-.785 1.923s.262 1.4.785 1.923c.524.524 1.165.785 1.923.785Z" />
                      </svg>
                    </Box>
                    <Box flex={1}>
                      <Text fontWeight="medium" color={selectedLocation === location.displayName ? accentColor : textColor}>
                        {location.name}
                      </Text>
                      <Text fontSize="sm" color="gray.400">
                        {location.description}
                      </Text>
                    </Box>
                  </Flex>
                ))}
              </VStack>
            </Box>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default LocationSelector; 