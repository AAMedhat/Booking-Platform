'use client';

import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Flex,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  VStack,
  useDisclosure,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { ChevronDownIcon, AddIcon, MinusIcon } from '@chakra-ui/icons';

interface TravelerCounts {
  adults: number;
  children: number;
  rooms: number;
}

interface TravelersSelectorProps {
  travelerCounts: TravelerCounts;
  setTravelerCounts: (counts: TravelerCounts) => void;
  textColor?: string;
  accentColor?: string;
}

export const TravelersSelector: React.FC<TravelersSelectorProps> = ({
  travelerCounts,
  setTravelerCounts,
  textColor = 'white',
  accentColor = '#D2AC71',
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleIncrement = (type: 'adults' | 'children' | 'rooms') => {
    const maxValues = {
      adults: 10,
      children: 6,
      rooms: 8
    };
    
    if (travelerCounts[type] < maxValues[type]) {
      setTravelerCounts({
        ...travelerCounts,
        [type]: travelerCounts[type] + 1
      });
    }
  };

  const handleDecrement = (type: 'adults' | 'children' | 'rooms') => {
    const minValues = {
      adults: 1,
      children: 0,
      rooms: 1
    };
    
    if (travelerCounts[type] > minValues[type]) {
      setTravelerCounts({
        ...travelerCounts,
        [type]: travelerCounts[type] - 1
      });
    }
  };

  const displayText = () => {
    const { adults, children, rooms } = travelerCounts;
    const roomText = rooms === 1 ? 'Room' : 'Rooms';
    let text = `${adults} Adult${adults !== 1 ? 's' : ''}`;
    
    if (children > 0) {
      text += `, ${children} Child${children !== 1 ? 'ren' : ''}`;
    }
    
    text += `, ${rooms} ${roomText}`;
    
    return text;
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
              width="26px"
              height="26px"
              fill="none"
              mr="2"
            >
              <path
                stroke={accentColor}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18.417 22.75v-2.167a4.333 4.333 0 0 0-4.334-4.333H5.418a4.333 4.333 0 0 0-4.333 4.333v2.167m23.833 0v-2.167a4.333 4.333 0 0 0-3.25-4.192m-4.334-13a4.333 4.333 0 0 1 0 8.396m-3.25-4.204a4.333 4.333 0 1 1-8.666 0 4.333 4.333 0 0 1 8.667 0Z"
              />
            </Box>
          }
          rightIcon={<ChevronDownIcon fontSize="sm" color={textColor} />}
          _hover={{ bg: 'transparent', transform: 'scale(1.05)' }}
          _active={{ bg: 'transparent' }}
          transition="all 0.2s"
        >
          <Text noOfLines={1} maxW="100%" textOverflow="ellipsis">
            {displayText()}
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
        <PopoverBody p={4} _focus={{ outline: "none" }} tabIndex={-1}>
          <VStack align="stretch" spacing={3}>
            {/* Adults */}
            <Flex justify="space-between" align="center">
              <Box>
                <Text fontWeight="medium" color={textColor}>Adults</Text>
                <Text fontSize="xs" color="gray.400">Ages 18 or above</Text>
              </Box>
              <HStack spacing={2}>
                <IconButton
                  aria-label="Decrease adults"
                  icon={<MinusIcon />}
                  isRound
                  size="sm"
                  bg="rgba(100, 100, 100, 0.4)"
                  color={textColor}
                  _hover={{ bg: 'rgba(210, 172, 113, 0.4)', color: accentColor }}
                  onClick={() => handleDecrement('adults')}
                  isDisabled={travelerCounts.adults <= 1}
                />
                <Text fontWeight="medium" color={textColor} width="20px" textAlign="center">
                  {travelerCounts.adults}
                </Text>
                <IconButton
                  aria-label="Increase adults"
                  icon={<AddIcon />}
                  isRound
                  size="sm"
                  bg="rgba(100, 100, 100, 0.4)"
                  color={textColor}
                  _hover={{ bg: 'rgba(210, 172, 113, 0.4)', color: accentColor }}
                  onClick={() => handleIncrement('adults')}
                  isDisabled={travelerCounts.adults >= 10}
                />
              </HStack>
            </Flex>
            
            {/* Children */}
            <Flex justify="space-between" align="center">
              <Box>
                <Text fontWeight="medium" color={textColor}>Children</Text>
                <Text fontSize="xs" color="gray.400">Under 18</Text>
              </Box>
              <HStack spacing={2}>
                <IconButton
                  aria-label="Decrease children"
                  icon={<MinusIcon />}
                  isRound
                  size="sm"
                  bg="rgba(100, 100, 100, 0.4)"
                  color={textColor}
                  _hover={{ bg: 'rgba(210, 172, 113, 0.4)', color: accentColor }}
                  onClick={() => handleDecrement('children')}
                  isDisabled={travelerCounts.children <= 0}
                />
                <Text fontWeight="medium" color={textColor} width="20px" textAlign="center">
                  {travelerCounts.children}
                </Text>
                <IconButton
                  aria-label="Increase children"
                  icon={<AddIcon />}
                  isRound
                  size="sm"
                  bg="rgba(100, 100, 100, 0.4)"
                  color={textColor}
                  _hover={{ bg: 'rgba(210, 172, 113, 0.4)', color: accentColor }}
                  onClick={() => handleIncrement('children')}
                  isDisabled={travelerCounts.children >= 6}
                />
              </HStack>
            </Flex>
            
            {/* Rooms */}
            <Flex justify="space-between" align="center">
              <Box>
                <Text fontWeight="medium" color={textColor}>Rooms</Text>
              </Box>
              <HStack spacing={2}>
                <IconButton
                  aria-label="Decrease rooms"
                  icon={<MinusIcon />}
                  isRound
                  size="sm"
                  bg="rgba(100, 100, 100, 0.4)"
                  color={textColor}
                  _hover={{ bg: 'rgba(210, 172, 113, 0.4)', color: accentColor }}
                  onClick={() => handleDecrement('rooms')}
                  isDisabled={travelerCounts.rooms <= 1}
                />
                <Text fontWeight="medium" color={textColor} width="20px" textAlign="center">
                  {travelerCounts.rooms}
                </Text>
                <IconButton
                  aria-label="Increase rooms"
                  icon={<AddIcon />}
                  isRound
                  size="sm"
                  bg="rgba(100, 100, 100, 0.4)"
                  color={textColor}
                  _hover={{ bg: 'rgba(210, 172, 113, 0.4)', color: accentColor }}
                  onClick={() => handleIncrement('rooms')}
                  isDisabled={travelerCounts.rooms >= 8}
                />
              </HStack>
            </Flex>
            
            <Text fontSize="xs" color="gray.400" mt={1}>
              You can search for up to 16 travelers
            </Text>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default TravelersSelector; 