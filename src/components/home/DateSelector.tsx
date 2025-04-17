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
  SimpleGrid,
  HStack,
  Grid,
  GridItem,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface DateSelectorProps {
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  textColor?: string;
  accentColor?: string;
}

export const DateSelector: React.FC<DateSelectorProps> = ({
  dateRange,
  setDateRange,
  textColor = 'white',
  accentColor = '#D2AC71',
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Current displayed months
  const [currentMonths, setCurrentMonths] = useState<[Date, Date]>(() => {
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);
    return [today, nextMonth];
  });
  
  // Selection state
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  
  // Format dates for display
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  // Format display text
  const displayText = (): string => {
    if (dateRange.startDate && dateRange.endDate) {
      return `${formatDate(dateRange.startDate)} - ${formatDate(dateRange.endDate)}`;
    } else if (dateRange.startDate) {
      return `${formatDate(dateRange.startDate)} - Select end date`;
    } else {
      return 'Select dates';
    }
  };
  
  // Calculate short display text (for button)
  const shortDisplayText = (): string => {
    if (dateRange.startDate && dateRange.endDate) {
      const startOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
      const endOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
      return `${dateRange.startDate.toLocaleDateString('en-US', startOptions)} - ${dateRange.endDate.toLocaleDateString('en-US', endOptions)}`;
    } else if (dateRange.startDate) {
      return `${formatDate(dateRange.startDate)} - Select end date`;
    } else {
      return 'Select dates';
    }
  };
  
  // Navigate to previous or next month
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonths(prev => {
      const [firstMonth, secondMonth] = prev;
      const newFirstMonth = new Date(firstMonth);
      const newSecondMonth = new Date(secondMonth);
      
      if (direction === 'prev') {
        newFirstMonth.setMonth(firstMonth.getMonth() - 1);
        newSecondMonth.setMonth(secondMonth.getMonth() - 1);
      } else {
        newFirstMonth.setMonth(firstMonth.getMonth() + 1);
        newSecondMonth.setMonth(secondMonth.getMonth() + 1);
      }
      
      return [newFirstMonth, newSecondMonth];
    });
  };
  
  // Generate array of days for a month
  const getDaysInMonth = (date: Date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    
    // Get the day of the week of the first day (0 = Sunday, 6 = Saturday)
    const firstDayWeekday = firstDayOfMonth.getDay();
    
    const days: (Date | null)[] = [];
    
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };
  
  // Check if a date is the current day
  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };
  
  // Check if a date is in the past
  const isPastDate = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };
  
  // Check if a date is selected (start or end date)
  const isSelected = (date: Date): boolean => {
    if (!date) return false;
    
    const isStartDate = dateRange.startDate && 
                        date.getDate() === dateRange.startDate.getDate() && 
                        date.getMonth() === dateRange.startDate.getMonth() && 
                        date.getFullYear() === dateRange.startDate.getFullYear();
                        
    const isEndDate = dateRange.endDate && 
                      date.getDate() === dateRange.endDate.getDate() && 
                      date.getMonth() === dateRange.endDate.getMonth() && 
                      date.getFullYear() === dateRange.endDate.getFullYear();
                      
    return isStartDate || isEndDate;
  };
  
  // Check if a date is specifically the start date
  const isStartDate = (date: Date): boolean => {
    if (!date || !dateRange.startDate) return false;
    
    return date.getDate() === dateRange.startDate.getDate() && 
           date.getMonth() === dateRange.startDate.getMonth() && 
           date.getFullYear() === dateRange.startDate.getFullYear();
  };
  
  // Check if a date is specifically the end date
  const isEndDate = (date: Date): boolean => {
    if (!date || !dateRange.endDate) return false;
    
    return date.getDate() === dateRange.endDate.getDate() && 
           date.getMonth() === dateRange.endDate.getMonth() && 
           date.getFullYear() === dateRange.endDate.getFullYear();
  };
  
  // Check if a date is in the selected range (between start and end)
  const isInRange = (date: Date): boolean => {
    if (!date || !dateRange.startDate) return false;
    
    if (dateRange.endDate) {
      return date > dateRange.startDate && date < dateRange.endDate;
    }
    
    if (hoverDate && dateRange.startDate < hoverDate) {
      return date > dateRange.startDate && date < hoverDate;
    }
    
    return false;
  };
  
  // Handle date click
  const handleDateClick = (date: Date) => {
    if (!date || isPastDate(date)) return;
    
    if (!dateRange.startDate || (dateRange.startDate && dateRange.endDate)) {
      // If no start date or both dates are selected, set start date
      setDateRange({
        startDate: date,
        endDate: null
      });
    } else {
      // If only start date is selected
      if (date < dateRange.startDate) {
        // If clicked date is before start date, swap them
        setDateRange({
          startDate: date,
          endDate: dateRange.startDate
        });
      } else {
        // Set end date
        setDateRange({
          startDate: dateRange.startDate,
          endDate: date
        });
      }
    }
  };
  
  // Handle mouse hover on date
  const handleDateHover = (date: Date | null) => {
    setHoverDate(date);
  };
  
  // Render month calendar
  const renderMonth = (date: Date) => {
    const monthName = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const days = getDaysInMonth(date);
    
    return (
      <Box>
        <Text fontWeight="bold" mb={3} textAlign="center" color={textColor} fontSize="md">{monthName} {year}</Text>
        <Grid templateColumns="repeat(7, 1fr)" gap={1}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
            <GridItem key={i} textAlign="center">
              <Text fontSize="xs" color="gray.400" mb={2}>{day}</Text>
            </GridItem>
          ))}
          
          {days.map((day, i) => (
            <GridItem 
              key={i} 
              textAlign="center" 
              position="relative"
            >
              {day && isInRange(day) && (
                <Box
                  position="absolute"
                  top="50%"
                  left={0}
                  right={0}
                  height="36px"
                  transform="translateY(-50%)"
                  bg="rgba(228, 212, 168, 0.25)"
                  zIndex={0}
                />
              )}
              
              {day && isStartDate(day) && dateRange.endDate && (
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  right={0}
                  height="36px"
                  transform="translateY(-50%)"
                  bg="rgba(228, 212, 168, 0.25)"
                  zIndex={0}
                />
              )}
              
              {day && isEndDate(day) && dateRange.startDate && (
                <Box
                  position="absolute"
                  top="50%"
                  left={0}
                  right="50%"
                  height="36px"
                  transform="translateY(-50%)"
                  bg="rgba(228, 212, 168, 0.25)"
                  zIndex={0}
                />
              )}
              
              {day ? (
                <Box
                  w="36px"
                  h="36px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="full"
                  cursor={isPastDate(day) ? "not-allowed" : "pointer"}
                  bg={
                    isSelected(day) 
                      ? "rgba(228, 212, 168, 0.85)" 
                      : isToday(day) 
                        ? 'rgba(255, 255, 255, 0.15)' 
                        : 'transparent'
                  }
                  border={isSelected(day) ? "2px solid rgba(160, 138, 95, 0.9)" : "none"}
                  color={
                    isPastDate(day) ? "gray.500" : 
                    isSelected(day) ? "#222222" : 
                    isToday(day) ? "#D2AC71" : textColor
                  }
                  fontWeight={isToday(day) || isSelected(day) ? "semibold" : "normal"}
                  opacity={isPastDate(day) ? 0.5 : 1}
                  _hover={{
                    bg: !isPastDate(day) && !isSelected(day) ? "rgba(228, 212, 168, 0.4)" : undefined,
                    transform: !isPastDate(day) ? 'scale(1.1)' : undefined,
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => handleDateClick(day)}
                  onMouseEnter={() => handleDateHover(day)}
                  onMouseLeave={() => handleDateHover(null)}
                  transition="all 0.2s ease"
                  position="relative"
                  zIndex={1}
                >
                  {day.getDate()}
                </Box>
              ) : (
                <Box w="36px" h="36px" />
              )}
            </GridItem>
          ))}
        </Grid>
      </Box>
    );
  };
  
  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="bottom"
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
                d="M17.333 2.167V6.5M8.667 2.167V6.5M3.25 10.833h19.5m-17.333-6.5h15.166c1.197 0 2.167.97 2.167 2.167v15.167c0 1.196-.97 2.166-2.167 2.166H5.417a2.167 2.167 0 0 1-2.167-2.166V6.5c0-1.197.97-2.167 2.167-2.167Z"
              />
            </Box>
          }
          rightIcon={<ChevronDownIcon fontSize="sm" color={textColor} />}
          _hover={{ bg: 'transparent', transform: 'scale(1.05)' }}
          _active={{ bg: 'transparent' }}
          transition="all 0.2s"
        >
          <Text noOfLines={1} maxW="100%" textOverflow="ellipsis">
            {shortDisplayText()}
          </Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        w={{ base: "300px", md: "640px" }}
        bg="#444444"
        backdropFilter="blur(5px)"
        mt={2}
        p={6}
        maxH={{ base: "auto" }}
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
          <Flex justify="space-between" mb={6} align="center">
            <IconButton
              aria-label="Previous month"
              icon={<ChevronLeftIcon />}
              variant="ghost"
              color={textColor}
              onClick={() => navigateMonth('prev')}
              size="sm"
            />
            <Text color={textColor} fontWeight="bold" fontSize="lg">
              {displayText()}
            </Text>
            <IconButton
              aria-label="Next month"
              icon={<ChevronRightIcon />}
              variant="ghost"
              color={textColor}
              onClick={() => navigateMonth('next')}
              size="sm"
            />
          </Flex>
          
          <Flex 
            direction={{ base: "column", md: "row" }} 
            gap={8} 
            justify="space-between"
          >
            {renderMonth(currentMonths[0])}
            {renderMonth(currentMonths[1])}
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default DateSelector; 