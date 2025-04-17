'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  VStack,
  Divider,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  Link,
  MenuItem,
  Avatar,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Stack,
  HStack,
  Checkbox,
  useToast,
  Spinner,
  Tooltip,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton
} from '@chakra-ui/react';
import { SearchIcon, ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { useAuth } from '../../app/context/AuthContext';
import { useFavorites } from '../../app/context/FavoritesContext';
import { FaHeart, FaRegHeart, FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const MotionLink = motion(Link)
const MotionButton = motion(Button)
const EGYPT_LOCATIONS = [
  { id: 1, name: 'Cairo', description: 'City in Egypt' },
  { id: 2, name: 'Alexandria', description: 'City in Egypt' },
  { id: 3, name: 'Luxor', description: 'City in Egypt' },
  { id: 4, name: 'Aswan', description: 'City in Egypt' },
  { id: 5, name: 'Giza', description: 'City in Egypt' },
  { id: 6, name: 'Hurghada', description: 'City in Egypt' },
  { id: 7, name: 'Sharm El Sheikh', description: 'City in Egypt' },
  { id: 8, name: 'Marsa Alam', description: 'City in Egypt' },
  { id: 9, name: 'Dahab', description: 'City in Egypt' },
  { id: 10, name: 'Abu Simbel', description: 'City in Egypt' },
];

export function Navbar() {
  const [language, setLanguage] = useState('EN');
  const [searchQuery, setSearchQuery] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose
  } = useDisclosure();
  const {
    isOpen: isSignupOpen,
    onOpen: onSignupOpen,
    onClose: onSignupClose
  } = useDisclosure();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose
  } = useDisclosure();

  // Add dedicated disclosure hooks for favorites and cart popovers
  const {
    isOpen: isFavoritesOpen,
    onOpen: onFavoritesOpen,
    onClose: onFavoritesClose
  } = useDisclosure();

  const {
    isOpen: isCartOpen,
    onOpen: onCartOpen,
    onClose: onCartClose
  } = useDisclosure();

  // Auth state
  const { isLoggedIn, user, login, signup, logout, checkUserExists } = useAuth();
  const { favorites, removeFavorite } = useFavorites();
  const router = useRouter();

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [loginError, setLoginError] = useState('');
  const [signupError, setSignupError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const loginRef = useRef<HTMLDivElement>(null);
  const signupRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  const accentColor = '#d2aa70';
  const textColor = '#FFFFFF';
  const bgColor = '#121212';
  const filteredLocations = EGYPT_LOCATIONS.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popularDestinations = EGYPT_LOCATIONS.slice(0, 5);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        onClose();
      }
      if (loginRef.current && !loginRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('.login-popover-content')) {
        onLoginClose();
      }
      if (signupRef.current && !signupRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('.signup-popover-content')) {
        onSignupClose();
      }

      // Close favorites popover when clicking outside
      const favoritesIconElement = document.getElementById('favorites-icon');

      // Check if the click target is not inside the favorites icon or popover
      if (isFavoritesOpen &&
        favoritesIconElement &&
        !favoritesIconElement.contains(event.target as Node) &&
        !(event.target as Element).closest('.chakra-popover__content')) {
        onFavoritesClose();
      }

      // Close cart popover when clicking outside
      const cartIconElement = document.getElementById('cart-icon');

      if (isCartOpen &&
        cartIconElement &&
        !cartIconElement.contains(event.target as Node) &&
        !(event.target as Element).closest('.cart-popover-content')) {
        onCartClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose, onLoginClose, onSignupClose, isFavoritesOpen, onFavoritesClose, isCartOpen, onCartClose]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);

    try {
      // Simple validation
      if (!loginEmail || !loginPassword) {
        setLoginError('All fields are required');
        setIsLoading(false);
        return;
      }

      // First check if the user exists
      const userExists = await checkUserExists(loginEmail);

      if (!userExists) {
        setLoginError('No account found with this email');
        setIsLoading(false);
        return;
      }

      // If user exists, try to login
      const success = await login(loginEmail, loginPassword);

      if (success) {
        onLoginClose();
        // Reset form
        setLoginEmail('');
        setLoginPassword('');
      } else {
        setLoginError('Invalid password');
      }
    } catch (error) {
      setLoginError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');
    setIsLoading(true);

    try {
      // Simple validation
      if (!signupName || !signupEmail || !signupPassword || !signupConfirmPassword) {
        setSignupError('All fields are required');
        setIsLoading(false);
        return;
      }

      if (signupPassword !== signupConfirmPassword) {
        setSignupError('Passwords do not match');
        setIsLoading(false);
        return;
      }

      const result = await signup(signupName, signupEmail, signupPassword);

      if (result.success) {
        onSignupClose();
        // Reset form
        setSignupName('');
        setSignupEmail('');
        setSignupPassword('');
        setSignupConfirmPassword('');
      } else if (result.exists) {
        // User already exists, switch to login form
        setSignupError('Account already exists with this email');

        // Pre-fill login form with the email
        setLoginEmail(signupEmail);

        // Close signup and open login after a short delay
        setTimeout(() => {
          onSignupClose();
          setTimeout(() => {
            onLoginOpen();
          }, 300);
        }, 1500);
      }
    } catch (error) {
      setSignupError('An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  // Function to close other popovers when opening one (including cart now)
  const handlePopoverOpen = (popoverType: string) => {
    if (popoverType === 'search') {
      onFavoritesClose();
      onCartClose();
      onLoginClose();
      onSignupClose();
      onOpen();
    } else if (popoverType === 'favorites') {
      onClose();
      onCartClose();
      onLoginClose();
      onSignupClose();
      onFavoritesOpen();
    } else if (popoverType === 'cart') {
      onClose();
      onFavoritesClose();
      onLoginClose();
      onSignupClose();
      onCartOpen();
    } else if (popoverType === 'login') {
      onClose();
      onFavoritesClose();
      onCartClose();
      onSignupClose();
      onLoginOpen();
    } else if (popoverType === 'signup') {
      onClose();
      onFavoritesClose();
      onCartClose();
      onLoginClose();
      onSignupOpen();
    }
  };

  return (
    <VStack
      as="nav"
      bg={bgColor}
      h="80px"
      position="sticky"
      top="0"
      zIndex="sticky"
      alignItems="center"
      borderBottom="1px solid"
      borderColor="gray.800"
    >
      <Flex
        justify="center"
        align="center"
        h="full"
        w="full"
        mx="auto"
      >

        <Flex align="center" gap={25} ref={searchRef}>

          {/* Left - Logo */}
          <MotionLink href="/">
            <Image
              src="/images/logo.jpg"
              alt="Logo"
              w="100px"
              h="58px"
              objectFit="contain"
            />
          </MotionLink>

          {/* Center - Search And Navigation Links */}
          <Flex align="center" gap={12} position="relative">
            {/* Search Component - Single Element Toggle */}
            <Flex align="center" position="relative">
              {isOpen ? (
                <Popover
                  isOpen={isOpen}
                  autoFocus={false}
                  placement="bottom-start"
                  closeOnBlur={false}
                >
                  <PopoverTrigger>
                    <InputGroup w="350px">
                      <InputLeftElement pointerEvents="none">
                        <SearchIcon color="#d2aa70" />
                      </InputLeftElement>
                      <Input
                        ref={inputRef}
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        color="white"
                        bg="rgba(68, 68, 68, 1)"
                        borderRadius="34px"
                        variant="ghost"
                        _focus={{ borderColor: accentColor }}
                        onKeyDown={(e) => {
                          if (e.key === 'Escape') {
                            onClose();
                            setSearchQuery('');
                          }
                        }}
                      />
                    </InputGroup>
                  </PopoverTrigger>
                  <PopoverContent
                    w="350px"
                    bg="rgba(68, 68, 68, 1)"
                    backdropFilter="blur(5px)"
                    mt={2}
                    maxH="320px"
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
                    _focus={{
                      outline: "none"
                    }}
                  >
                    <PopoverBody p={0} _focus={{ outline: "none" }} tabIndex={-1}>
                      <VStack align="stretch" spacing={0}>
                        <Box p={4}>
                          <Text fontSize="sm" color="#d2aa70" mb={2}>
                            {searchQuery ? 'Locations' : 'Most Popular'}
                          </Text>
                          {(searchQuery ? filteredLocations : popularDestinations).map((location) => (
                            <Flex
                              key={location.id}
                              py={3}
                              px={3}
                              align="center"
                              gap={3}
                              _hover={{ bg: 'rgba(210, 172, 113, 0.3)', cursor: 'pointer', borderRadius: '24px' }}
                              borderBottom="1px solid"
                              borderColor="transparent"
                            >
                              {/* Square box with SVG before location name */}
                              <Box
                                w="45px"
                                h="45px"
                                bg="rgb(255, 255, 255)"
                                borderRadius="15px"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="22" fill="none"><path fill="black" d="M8 21.833c-.253 0-.47-.072-.65-.216a1.317 1.317 0 0 1-.406-.57 15.073 15.073 0 0 0-1.3-2.843c-.506-.885-1.219-1.923-2.14-3.114-.92-1.192-1.67-2.33-2.248-3.413-.56-1.083-.84-2.392-.84-3.927 0-2.113.732-3.9 2.195-5.363C4.09.907 5.888.167 8 .167c2.112 0 3.9.74 5.362 2.22 1.48 1.463 2.22 3.25 2.22 5.363 0 1.643-.316 3.015-.947 4.117a28.46 28.46 0 0 1-2.14 3.223c-.975 1.3-1.715 2.383-2.22 3.25a15.297 15.297 0 0 0-1.22 2.708c-.09.253-.234.451-.433.596a1.06 1.06 0 0 1-.623.19Zm0-3.873c.307-.614.65-1.218 1.03-1.814.396-.596.974-1.39 1.733-2.384.776-1.01 1.408-1.94 1.895-2.79.506-.866.759-1.94.759-3.222 0-1.499-.533-2.772-1.598-3.819C10.772 2.866 9.499 2.333 8 2.333s-2.78.533-3.846 1.598c-1.047 1.047-1.57 2.32-1.57 3.819 0 1.282.243 2.356.73 3.223a29.168 29.168 0 0 0 1.924 2.79c.758.992 1.327 1.787 1.706 2.383.397.596.75 1.2 1.056 1.814Zm0-7.502c.758 0 1.4-.261 1.923-.785.524-.524.785-1.165.785-1.923s-.261-1.4-.785-1.923C9.399 5.303 8.758 5.042 8 5.042s-1.4.261-1.923.785c-.523.524-.785 1.165-.785 1.923s.262 1.4.785 1.923c.524.524 1.165.785 1.923.785Z" /></svg>                              </Box>

                              <Box flex={1}>
                                <Text fontWeight="medium">{location.name}</Text>
                                <Text fontSize="sm" color="gray.400">
                                  {location.description}
                                </Text>
                              </Box>
                            </Flex>
                          ))}
                          {searchQuery && filteredLocations.length === 0 && (
                            <Text py={3} px={3} color="white.400">
                              No results found for "{searchQuery}"
                            </Text>
                          )}
                        </Box>

                        <Divider borderColor="transparent" shadow="0px 0px 10px 0px rgba(210, 172, 113, 0.5)" />

                        <Flex
                          px={6}
                          pb={3}
                          align="center"
                          justify="space-between"
                          _hover={{ bg: 'rgba(210, 172, 113, 0.3)' }}
                          cursor="pointer"
                        >
                          <Text fontSize="sm" color="white.400">
                            {searchQuery
                              ? `See all ${filteredLocations.length} results for "${searchQuery}"`
                              : 'Explore all Egyptian destinations'}
                          </Text>

                          {/* Chevron right SVG icon at the end */}
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.125 7.5H11.875M11.875 7.5L7.5 3.125M11.875 7.5L7.5 11.875" stroke="#F6EEE5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>

                        </Flex>
                      </VStack>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              ) : (
                <IconButton
                  aria-label="Search"
                  icon={<SearchIcon />}
                  colorScheme="gray"
                  bg="rgba(68, 68, 68, 0.25)"
                  w="40px"
                  h="40px"
                  borderRadius="full"
                  variant="ghost"
                  color={accentColor}
                  _hover={{ bg: "rgba(210, 172, 113, 0.15)" }}
                  onClick={() => handlePopoverOpen('search')}
                />
              )}
            </Flex>

            {/* Center - Navigation Links */}
            <Flex
              gap={12}
              pt={2}
              align="center"
              fontSize="sm"
              display={{ base: 'none', md: 'flex' }}
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
                <Text color={accentColor} fontWeight="medium">GOE</Text>
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
            </Flex>

          </Flex>

          {/* Right - Language & Auth Buttons */}
          <Flex gap={8}>

            {/* Language Toggle */}
            <Flex alignItems="center" height="40px">

              <Box
                as="svg"
                xmlns="http://www.w3.org/2000/svg"
                width="28px"
                height="28px"
                fill="none"
              >
                <path
                  fill="#F6EEE5"
                  d="M14 25.67c-1.6 0-3.1-.31-4.52-.92a11.83 11.83 0 0 1-6.23-6.23A11.29 11.29 0 0 1 2.33 14c0-1.61.31-3.13.92-4.54a11.88 11.88 0 0 1 6.23-6.2c1.42-.62 2.93-.93 4.52-.93 1.61 0 3.13.31 4.54.92a11.88 11.88 0 0 1 6.2 6.21c.62 1.41.93 2.93.93 4.54 0 1.6-.3 3.1-.92 4.52a11.83 11.83 0 0 1-6.21 6.23c-1.41.61-2.93.92-4.54.92Zm0-2.4a14.82 14.82 0 0 0 2.22-4.6h-4.44a13.8 13.8 0 0 0 2.22 4.6Zm-3.03-.46a16.16 16.16 0 0 1-1.58-4.14H5.95a9.68 9.68 0 0 0 2.11 2.53 8.4 8.4 0 0 0 2.9 1.6Zm6.06 0a8.4 8.4 0 0 0 2.9-1.6 9.68 9.68 0 0 0 2.12-2.54h-3.44a17.13 17.13 0 0 1-1.58 4.14ZM4.96 16.33h3.97a16.08 16.08 0 0 1 0-4.66H4.96a9.98 9.98 0 0 0-.22 3.51c.05.38.12.76.22 1.15Zm6.3 0h5.48a16.06 16.06 0 0 0 0-4.66h-5.48a16.12 16.12 0 0 0 0 4.66Zm7.82 0h3.96a9.96 9.96 0 0 0 .22-3.51 9.97 9.97 0 0 0-.22-1.15h-3.96a16.12 16.12 0 0 1 0 4.66Zm-.47-7h3.44a9.68 9.68 0 0 0-2.11-2.53 8.4 8.4 0 0 0-2.9-1.6 16.17 16.17 0 0 1 1.57 4.13Zm-6.83 0h4.44A13.81 13.81 0 0 0 14 4.73a14.8 14.8 0 0 0-2.22 4.6Zm-5.83 0h3.44a17.13 17.13 0 0 1 1.58-4.14 8.4 8.4 0 0 0-2.9 1.6 9.68 9.68 0 0 0-2.12 2.54Z"
                />
              </Box>

              {/* Language Toggle */}
              <Menu>
                <MenuButton
                  as={Button}
                  variant="ghost"
                  color={textColor}
                  fontSize="md"
                  fontWeight="regular"
                  rightIcon={<ChevronDownIcon fontSize="xs" />}
                  _hover={{ bg: 'transparent' }}
                  _active={{ bg: 'transparent' }}
                >
                  {language}
                </MenuButton>
                <MenuList
                  bg="#F6EEE5"
                  borderColor="transparent"
                  borderRadius="24px"
                  py={2}
                  px={5}
                  boxShadow="0px 4px 20px rgba(0, 0, 0, 0.15)"
                  minW="100px"
                >
                  <MenuItem
                    onClick={() => setLanguage('EN')}
                    color={language === 'EN' ? "#C9AB7A" : "#333333"}
                    fontWeight={language === 'EN' ? "semibold" : "normal"}
                    bg="transparent"
                    _hover={{ bg: "rgba(201, 171, 122, 0.1)" }}
                    borderRadius="12px"
                    py={1}
                  >
                    EN
                  </MenuItem>
                  <MenuItem
                    onClick={() => setLanguage('AR')}
                    color={language === 'AR' ? "#C9AB7A" : "#333333"}
                    fontWeight={language === 'AR' ? "semibold" : "normal"}
                    bg="transparent"
                    _hover={{ bg: "rgba(201, 171, 122, 0.1)" }}
                    borderRadius="12px"
                    py={1}
                  >
                    AR
                  </MenuItem>
                </MenuList>
              </Menu>

            </Flex>

            {/* drawer Menu Button - Visible on all screen sizes */}
            <IconButton
              aria-label="Open menu"
              icon={<HamburgerIcon />}
              colorScheme="blackAlpha"
              variant="ghost"
              color={accentColor}
              fontSize="24px"
              onClick={onDrawerOpen}
              _hover={{ bg: 'rgba(210, 172, 113, 0.15)' }}
            />

            {/* Auth Components */}
            <Flex gap={4} ref={loginRef}>
              {isLoggedIn ? (
                <Flex alignItems="center" gap={4}>
                  {/* Vertical Divider */}
                  <Box
                    h="28px"
                    w="1px"
                    bg="rgba(246, 238, 229, 0.4)"
                    mx={2}
                  />

                  {/* Favorite Icon */}
                  <Box position="relative">
                    <Popover placement="bottom" closeOnBlur={true} isLazy isOpen={isFavoritesOpen} onClose={onFavoritesClose}>
                      <PopoverTrigger>
                        <Box
                          as="svg"
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                          cursor="pointer"
                          transition="all 0.2s"
                          _hover={{ transform: "scale(1.1)", filter: "drop-shadow(0 0 2px #d2aa70)" }}
                          role="button"
                          aria-label="Favorites"
                          mr={1}
                          id="favorites-icon"
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            handlePopoverOpen('favorites');
                          }}
                          _focus={{ outline: "none", boxShadow: "none" }}
                        >
                          <path
                            d="M22.5766 4.99416C22.0233 4.44058 21.3663 4.00144 20.6433 3.70184C19.9202 3.40223 19.1452 3.24802 18.3625 3.24802C17.5798 3.24802 16.8047 3.40223 16.0817 3.70184C15.3586 4.00144 14.7016 4.44058 14.1483 4.99416L13 6.14249L11.8516 4.99416C10.734 3.87649 9.21809 3.2486 7.63747 3.2486C6.05685 3.2486 4.54097 3.87649 3.4233 4.99416C2.30563 6.11183 1.67773 7.62771 1.67773 9.20833C1.67773 10.7889 2.30563 12.3048 3.4233 13.4225L13 22.9992L22.5766 13.4225C23.1302 12.8692 23.5693 12.2122 23.869 11.4891C24.1686 10.766 24.3228 9.99102 24.3228 9.20833C24.3228 8.42563 24.1686 7.65061 23.869 6.92753C23.5693 6.20445 23.1302 5.54748 22.5766 4.99416Z"
                            stroke="#F6EEE5"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </Box>
                      </PopoverTrigger>
                      <PopoverContent
                        w="350px"
                        bg="rgba(68, 68, 68, 1)"
                        backdropFilter="blur(5px)"
                        mt={2}
                        maxH="350px"
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
                        _focus={{
                          outline: "none"
                        }}
                      >
                        <PopoverBody p={0} _focus={{ outline: "none" }} tabIndex={-1}>
                          <VStack align="stretch" spacing={0}>
                            <Box p={4}>
                              <Text fontSize="sm" color="#d2aa70" mb={2}>
                                {favorites && favorites.length > 0 ? `Favorites (${favorites.length})` : 'Favorites'}
                              </Text>
                              <VStack align="stretch" spacing={0}>
                                {!favorites || favorites.length === 0 ? (
                                  <Flex
                                    py={3}
                                    px={3}
                                    align="center"
                                    justify="center"
                                    direction="column"
                                    gap={2}
                                  >
                                    <Box fontSize="2xl" color="#d2aa70">
                                      <FaRegHeart />
                                    </Box>
                                    <Text color="white" textAlign="center">No favorites yet</Text>
                                    <Text fontSize="sm" color="gray.400" textAlign="center">
                                      Click the heart icon on hotels to add them to your favorites
                                    </Text>
                                  </Flex>
                                ) : (
                                  <>
                                    {favorites.map(hotel => (
                                      <Flex
                                        key={hotel.id}
                                        py={3}
                                        px={3}
                                        align="center"
                                        gap={3}
                                        _hover={{ bg: 'rgba(210, 172, 113, 0.3)', cursor: 'pointer', borderRadius: '24px' }}
                                        borderBottom="1px solid"
                                        borderColor="transparent"
                                        position="relative"
                                      >
                                        <Image
                                          src={hotel.image}
                                          fallbackSrc="https://via.placeholder.com/50"
                                          alt={hotel.title}
                                          w="45px"
                                          h="45px"
                                          borderRadius="15px"
                                          objectFit="cover"
                                        />
                                        <Box flex={1}>
                                          <Text fontWeight="medium">{hotel.title}</Text>
                                          <Flex justify="space-between">
                                            <Text fontSize="sm" color="gray.400">
                                              {hotel.location}
                                            </Text>
                                            <Text fontSize="sm" color="#d2aa70" fontWeight="bold">
                                              ${hotel.price}
                                            </Text>
                                          </Flex>
                                        </Box>
                                        <IconButton
                                          aria-label="Remove from favorites"
                                          icon={<FaTrash />}
                                          size="xs"
                                          colorScheme="red"
                                          variant="ghost"
                                          opacity={0.7}
                                          _hover={{ opacity: 1 }}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            removeFavorite(hotel.id);
                                          }}
                                        />
                                      </Flex>
                                    ))}
                                  </>
                                )}
                              </VStack>
                            </Box>
                            {favorites && favorites.length > 0 && (
                              <>
                                <Divider borderColor="transparent" shadow="0px 0px 10px 0px rgba(210, 172, 113, 0.5)" />
                                <Flex
                                  px={6}
                                  pb={3}
                                  align="center"
                                  justify="space-between"
                                  _hover={{ bg: 'rgba(210, 172, 113, 0.3)' }}
                                  cursor="pointer"
                                >
                                  <Text fontSize="sm" color="white.400">
                                    View all favorites
                                  </Text>
                                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.125 7.5H11.875M11.875 7.5L7.5 3.125M11.875 7.5L7.5 11.875" stroke="#F6EEE5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </Flex>
                              </>
                            )}
                          </VStack>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Box>

                  {/* Cart Icon */}
                  <Box position="relative" ref={cartRef}>
                    <Popover placement="bottom-end" closeOnBlur={true} isLazy isOpen={isCartOpen} onClose={onCartClose}>
                      <PopoverTrigger>
                        <Box
                          position="relative"
                          cursor="pointer"
                          id="cart-icon"
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            handlePopoverOpen('cart');
                          }}
                          _focus={{ outline: "none", boxShadow: "none" }}
                        >
                          <Box
                            as="svg"
                            xmlns="http://www.w3.org/2000/svg"
                            width="26"
                            height="26"
                            viewBox="0 0 26 26"
                            fill="none"
                            transition="all 0.2s"
                            _hover={{ transform: "scale(1.1)", filter: "drop-shadow(0 0 2px #d2aa70)" }}
                            aria-label="Cart"
                            _focus={{ outline: "none" }}
                          >
                            <path
                              d="M1.08337 1.08333H5.41671L8.32004 15.5892C8.4191 16.0879 8.69044 16.536 9.08655 16.8548C9.48266 17.1737 9.9783 17.3431 10.4867 17.3333H21.0167C21.5251 17.3431 22.0208 17.1737 22.4169 16.8548C22.813 16.536 23.0843 16.0879 23.1834 15.5892L24.9167 6.5H6.50004M10.8334 22.75C10.8334 23.3483 10.3483 23.8333 9.75004 23.8333C9.15173 23.8333 8.66671 23.3483 8.66671 22.75C8.66671 22.1517 9.15173 21.6667 9.75004 21.6667C10.3483 21.6667 10.8334 22.1517 10.8334 22.75ZM22.75 22.75C22.75 23.3483 22.265 23.8333 21.6667 23.8333C21.0684 23.8333 20.5834 23.3483 20.5834 22.75C20.5834 22.1517 21.0684 21.6667 21.6667 21.6667C22.265 21.6667 22.75 22.1517 22.75 22.75Z"
                              stroke="#F6EEE5"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </Box>
                          {/* Cart Badge */}
                          <Box
                            position="absolute"
                            top="-2px"
                            right="-2px"
                            bg="#FF5757"
                            w="12px"
                            h="12px"
                            borderRadius="full"
                            border="2px solid"
                            borderColor="#121212"
                          />
                        </Box>
                      </PopoverTrigger>
                      <PopoverContent
                        w="300px"
                        bg="rgba(68, 68, 68, 1)"
                        backdropFilter="blur(5px)"
                        mt={2}
                        maxH="300px"
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
                        _focus={{
                          outline: "none"
                        }}
                        className="cart-popover-content"
                      >
                        <PopoverBody p={0} _focus={{ outline: "none" }} tabIndex={-1}>
                          <VStack align="stretch" spacing={0} _focus={{ outline: "none" }}>
                            <Box p={4}>
                              <Text fontSize="sm" color="#d2aa70" mb={2}>
                                Your Cart
                              </Text>
                              <VStack align="stretch" spacing={0}>
                                <Flex
                                  py={3}
                                  px={3}
                                  align="center"
                                  gap={3}
                                  _hover={{ bg: 'rgba(210, 172, 113, 0.3)', cursor: 'pointer', borderRadius: '24px' }}
                                  borderBottom="1px solid"
                                  borderColor="transparent"
                                >
                                  <Image
                                    src="/images/tour.jpg"
                                    fallbackSrc="https://via.placeholder.com/50"
                                    alt="Egypt Tour"
                                    w="45px"
                                    h="45px"
                                    borderRadius="15px"
                                    objectFit="cover"
                                  />
                                  <Box flex={1}>
                                    <Text fontWeight="medium">Egypt Explorer Package</Text>
                                    <Flex justify="space-between" mt={1}>
                                      <Text fontSize="xs" color="gray.400">
                                        1 × $1,299
                                      </Text>
                                      <Text fontSize="xs" color="#d2aa70" fontWeight="bold">
                                        $1,299
                                      </Text>
                                    </Flex>
                                  </Box>
                                </Flex>
                              </VStack>
                            </Box>
                            <Divider borderColor="transparent" shadow="0px 0px 10px 0px rgba(210, 172, 113, 0.5)" />
                            <Flex
                              px={6}
                              py={3}
                              align="center"
                              justify="space-between"
                            >
                              <Text fontSize="sm" color="white" fontWeight="medium">Total</Text>
                              <Text color="#d2aa70" fontWeight="bold">$1,299</Text>
                            </Flex>
                            <Divider borderColor="transparent" shadow="0px 0px 10px 0px rgba(210, 172, 113, 0.5)" />
                            <Flex
                              px={6}
                              pb={3}
                              align="center"
                              justify="space-between"
                              _hover={{ bg: 'rgba(210, 172, 113, 0.3)' }}
                              cursor="pointer"
                            >
                              <Text fontSize="sm" color="white.400">
                                View cart
                              </Text>
                              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.125 7.5H11.875M11.875 7.5L7.5 3.125M11.875 7.5L7.5 11.875" stroke="#F6EEE5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </Flex>
                          </VStack>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Box>

                  <Menu placement="bottom-end" offset={[0, 10]} autoSelect={false}>
                    <MenuButton
                      as={Box}
                      transition="all 0.2s"
                      _hover={{ transform: "scale(1.05)" }}
                      _active={{ bg: "transparent", outline: "none" }}
                      _focus={{ outline: "none", boxShadow: "none" }}
                      p={0}
                    >
                      <Avatar
                        size="md"
                        name={user?.name || user?.email || 'User'}
                        src=""
                        bg="#d2aa70"
                        cursor="pointer"
                        border="2px solid"
                        borderColor="#d2aa70"
                      />
                    </MenuButton>
                    <MenuList
                      bg="#F6EEE5"
                      borderColor="transparent"
                      borderRadius="24px"
                      py={4}
                      px={5}
                      boxShadow="0px 4px 20px rgba(0, 0, 0, 0.15)"
                      minW="200px"
                    >
                      <VStack align="stretch" spacing={2}>
                        <MenuItem
                          color="#C9AB7A"
                          fontWeight="semibold"
                          fontSize="16px"
                          bg="transparent"
                          _hover={{ bg: "rgba(201, 171, 122, 0.1)" }}
                          borderRadius="12px"
                          py={2}
                        >
                          My profile
                        </MenuItem>
                        <MenuItem
                          color="#333333"
                          bg="transparent"
                          _hover={{ bg: "rgba(201, 171, 122, 0.1)" }}
                          borderRadius="12px"
                          py={2}
                        >
                          Saved bundles
                        </MenuItem>
                        <MenuItem
                          color="#333333"
                          bg="transparent"
                          _hover={{ bg: "rgba(201, 171, 122, 0.1)" }}
                          borderRadius="12px"
                          py={2}
                        >
                          Invite friends
                        </MenuItem>
                        {user?.email === "admin@example.com" && (
                          <MenuItem
                            color="#C9AB7A"
                            fontWeight="medium"
                            bg="transparent"
                            _hover={{ bg: "rgba(201, 171, 122, 0.1)" }}
                            borderRadius="12px"
                            py={2}
                            onClick={() => router.push('/admin')}
                          >
                            Admin Panel
                          </MenuItem>
                        )}
                        <MenuItem
                          color="#333333"
                          bg="transparent"
                          _hover={{ bg: "rgba(201, 171, 122, 0.1)" }}
                          borderRadius="12px"
                          py={2}
                        >
                          Settings
                        </MenuItem>
                        <MenuItem
                          color="#FF5757"
                          fontWeight="medium"
                          bg="transparent"
                          _hover={{ bg: "rgba(255, 87, 87, 0.1)" }}
                          borderRadius="12px"
                          py={2}
                          onClick={handleLogout}
                        >
                          Log out
                        </MenuItem>
                      </VStack>
                    </MenuList>
                  </Menu>
                </Flex>
              ) : (
                <>
                  {/* Login Button and Popup */}
                  <Popover
                    isOpen={isLoginOpen}
                    onClose={onLoginClose}
                    placement="bottom-end"
                    closeOnBlur={true}
                  >
                    <PopoverTrigger>
              <MotionButton
                        onClick={() => handlePopoverOpen('login')}
                bg="#d2aa70"
                border="1px solid"
                borderColor="#d2aa70"
                color="white"
                px={6}
                py={2}
                borderRadius="md"
                fontWeight="medium"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(210, 172, 113, 0.15)",
                  transition: { duration: 0.2 }
                }}
              >
                Login
              </MotionButton>
                    </PopoverTrigger>
                    <PopoverContent
                      w="350px"
                      bg="rgba(68, 68, 68, 1)"
                      backdropFilter="blur(5px)"
                      mt={2}
                      maxH="500px"
                      css={{
                        overflowY: "auto",
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
                      _focus={{
                        outline: "none"
                      }}
                      className="login-popover-content"
                    >
                      <PopoverBody p={0} _focus={{ outline: "none" }} tabIndex={-1}>
                        <VStack align="stretch" spacing={0}>
                          <Box p={4} pb={2}>
                            <Text fontSize="sm" color="#d2aa70" mb={3}>
                              Welcome Back
                            </Text>
                            <form onSubmit={handleLogin}>
                              <VStack spacing={4} align="stretch">
                                <FormControl isRequired isInvalid={!!loginError}>
                                  <FormLabel color="white" fontSize="sm">Email</FormLabel>
                                  <Input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    color="white"
                                    bg="rgba(40, 40, 40, 0.5)"
                                    borderColor="gray.600"
                                    borderRadius="12px"
                                    height="42px"
                                    _focus={{ outline: "none", borderColor: accentColor }}
                                  />
                                </FormControl>
                                <FormControl isRequired isInvalid={!!loginError}>
                                  <FormLabel color="white" fontSize="sm">Password</FormLabel>
                                  <Input
                                    type="password"
                                    placeholder="Your password"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    color="white"
                                    bg="rgba(40, 40, 40, 0.5)"
                                    borderColor="gray.600"
                                    borderRadius="12px"
                                    height="42px"
                                    _focus={{ outline: "none", borderColor: accentColor }}
                                  />
                                  {loginError && (
                                    <FormErrorMessage>{loginError}</FormErrorMessage>
                                  )}
                                </FormControl>
                                <HStack justify="space-between" w="full">
                                  <Checkbox colorScheme="orange" color="white" size="sm">
                                    Remember me
                                  </Checkbox>
                                  <Link color={accentColor} fontSize="sm">
                                    Forgot password?
                                  </Link>
                                </HStack>
                                <Button
                                  type="submit"
                                  w="full"
                                  bg={accentColor}
                                  color="white"
                                  _hover={{ bg: "rgba(210, 172, 113, 0.8)" }}
                                  borderRadius="12px"
                                  height="42px"
                                  isLoading={isLoading}
                                  loadingText="Logging in"
                                >
                                  Login
                                </Button>
                              </VStack>
                            </form>
                          </Box>
                          <Divider borderColor="transparent" shadow="0px 0px 10px 0px rgba(210, 172, 113, 0.5)" />
                          <Flex
                            px={6}
                            py={3}
                            align="center"
                            justify="center"
                            _hover={{ bg: 'rgba(210, 172, 113, 0.3)' }}
                            cursor="pointer"
                            onClick={() => {
                              onLoginClose();
                              setTimeout(() => handlePopoverOpen('signup'), 100);
                            }}
                          >
                            <Text fontSize="sm" color="white">
                              Don't have an account?
                            </Text>
                            <Text fontSize="sm" color={accentColor} ml={1} fontWeight="medium">
                              Sign up
                            </Text>
                            <Box ml={1}>
                              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.125 7.5H11.875M11.875 7.5L7.5 3.125M11.875 7.5L7.5 11.875" stroke="#F6EEE5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </Box>
                          </Flex>
                        </VStack>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>

                  {/* Signup Button and Popup */}
                  <Popover
                    isOpen={isSignupOpen}
                    onClose={onSignupClose}
                    placement="bottom-end"
                    closeOnBlur={true}
                  >
                    <PopoverTrigger>
              <MotionButton
                        onClick={() => handlePopoverOpen('signup')}
                bg="#d2aa70"
                border="1px solid"
                borderColor="#d2aa70"
                color="white"
                px={6}
                py={2}
                borderRadius="md"
                fontWeight="medium"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(210, 172, 113, 0.15)",
                  transition: { duration: 0.2 }
                }}
              >
                Sign up
              </MotionButton>
                    </PopoverTrigger>
                    <PopoverContent
                      w="350px"
                      bg="rgba(68, 68, 68, 1)"
                      backdropFilter="blur(5px)"
                      mt={2}
                      maxH="600px"
                      css={{
                        overflowY: "auto",
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
                      _focus={{
                        outline: "none"
                      }}
                      ref={signupRef}
                      className="signup-popover-content"
                    >
                      <PopoverBody p={0} _focus={{ outline: "none" }} tabIndex={-1}>
                        <VStack align="stretch" spacing={0}>
                          <Box p={4} pb={2}>
                            <Text fontSize="sm" color="#d2aa70" mb={3}>
                              Create Account
                            </Text>
                            <form onSubmit={handleSignup}>
                              <VStack spacing={4} align="stretch">
                                <FormControl isRequired isInvalid={!!signupError}>
                                  <FormLabel color="white" fontSize="sm">Name</FormLabel>
                                  <Input
                                    type="text"
                                    placeholder="Your name"
                                    value={signupName}
                                    onChange={(e) => setSignupName(e.target.value)}
                                    color="white"
                                    bg="rgba(40, 40, 40, 0.5)"
                                    borderColor="gray.600"
                                    borderRadius="12px"
                                    height="42px"
                                    _focus={{ outline: "none", borderColor: accentColor }}
                                  />
                                </FormControl>
                                <FormControl isRequired isInvalid={!!signupError}>
                                  <FormLabel color="white" fontSize="sm">Email</FormLabel>
                                  <Input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={signupEmail}
                                    onChange={(e) => setSignupEmail(e.target.value)}
                                    color="white"
                                    bg="rgba(40, 40, 40, 0.5)"
                                    borderColor="gray.600"
                                    borderRadius="12px"
                                    height="42px"
                                    _focus={{ outline: "none", borderColor: accentColor }}
                                  />
                                </FormControl>
                                <FormControl isRequired isInvalid={!!signupError}>
                                  <FormLabel color="white" fontSize="sm">Password</FormLabel>
                                  <Input
                                    type="password"
                                    placeholder="Create password"
                                    value={signupPassword}
                                    onChange={(e) => setSignupPassword(e.target.value)}
                                    color="white"
                                    bg="rgba(40, 40, 40, 0.5)"
                                    borderColor="gray.600"
                                    borderRadius="12px"
                                    height="42px"
                                    _focus={{ outline: "none", borderColor: accentColor }}
                                  />
                                </FormControl>
                                <FormControl isRequired isInvalid={!!signupError}>
                                  <FormLabel color="white" fontSize="sm">Confirm Password</FormLabel>
                                  <Input
                                    type="password"
                                    placeholder="Confirm password"
                                    value={signupConfirmPassword}
                                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                                    color="white"
                                    bg="rgba(40, 40, 40, 0.5)"
                                    borderColor="gray.600"
                                    borderRadius="12px"
                                    height="42px"
                                    _focus={{ outline: "none", borderColor: accentColor }}
                                  />
                                  {signupError && (
                                    <FormErrorMessage>{signupError}</FormErrorMessage>
                                  )}
                                </FormControl>
                                <Button
                                  type="submit"
                                  w="full"
                                  bg={accentColor}
                                  color="white"
                                  _hover={{ bg: "rgba(210, 172, 113, 0.8)" }}
                                  borderRadius="12px"
                                  height="42px"
                                  isLoading={isLoading}
                                  loadingText="Creating account"
                                >
                                  Sign up
                                </Button>
                              </VStack>
                            </form>
                          </Box>
                          <Divider borderColor="transparent" shadow="0px 0px 10px 0px rgba(210, 172, 113, 0.5)" />
                          <Flex
                            px={6}
                            py={3}
                            align="center"
                            justify="center"
                            _hover={{ bg: 'rgba(210, 172, 113, 0.3)' }}
                            cursor="pointer"
                            onClick={() => {
                              onSignupClose();
                              setTimeout(() => handlePopoverOpen('login'), 100);
                            }}
                          >
                            <Text fontSize="sm" color="white">
                              Already have an account?
                            </Text>
                            <Text fontSize="sm" color={accentColor} ml={1} fontWeight="medium">
                              Login
                            </Text>
                            <Box ml={1}>
                              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.125 7.5H11.875M11.875 7.5L7.5 3.125M11.875 7.5L7.5 11.875" stroke="#F6EEE5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </Box>
                          </Flex>
                        </VStack>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </>
              )}
            </Flex>
          </Flex>

        </Flex>

      </Flex>

      {/* Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        placement="right"
        onClose={onDrawerClose}
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent bg={bgColor}>
          <DrawerCloseButton color={accentColor} />
          <DrawerHeader borderBottomWidth="1px" borderColor="transparent">

          </DrawerHeader>
          <DrawerBody display="flex" flexDirection="column" justifyContent="space-between">
            <VStack align="stretch" spacing={6} mt={4}>
              {!isLoggedIn ? (
                // Not logged in state
                <>
                  <Flex direction="column" gap={4}>
                    <Flex align="center" gap={3} cursor="pointer" onClick={() => router.push('/egybook')}>
                      <MotionLink
                        color="white"
                        fontSize="md"
                        fontWeight="medium"
                        _hover={{ color: "rgba(210, 172, 113, 0.15)" }}
                        transition={{ duration: 0.2 }}
                        textDecoration="none"
                        display="flex"
                        alignItems="center"
                        href="/"
                      >
                        <Text as="span" fontWeight="bold" color={accentColor}>Egy</Text>
                        <Text as="span" fontWeight="regular" color="white">Book</Text>
                      </MotionLink>
                    </Flex>

                    <Flex align="center">
                      <Menu>
                        <MenuButton
                          as={Button}
                          variant="ghost"
                          color={textColor}
                          fontSize="16px"
                          fontWeight="medium"
                          leftIcon={
                            <Box
                              as="svg"
                              xmlns="http://www.w3.org/2000/svg"
                              width="28px"
                              height="28px"
                              fill="none"
                            >
                              <path
                                fill="#F6EEE5"
                                d="M14 25.67c-1.6 0-3.1-.31-4.52-.92a11.83 11.83 0 0 1-6.23-6.23A11.29 11.29 0 0 1 2.33 14c0-1.61.31-3.13.92-4.54a11.88 11.88 0 0 1 6.23-6.2c1.42-.62 2.93-.93 4.52-.93 1.61 0 3.13.31 4.54.92a11.88 11.88 0 0 1 6.2 6.21c.62 1.41.93 2.93.93 4.54 0 1.6-.3 3.1-.92 4.52a11.83 11.83 0 0 1-6.21 6.23c-1.41.61-2.93.92-4.54.92Zm0-2.4a14.82 14.82 0 0 0 2.22-4.6h-4.44a13.8 13.8 0 0 0 2.22 4.6Zm-3.03-.46a16.16 16.16 0 0 1-1.58-4.14H5.95a9.68 9.68 0 0 0 2.11 2.53 8.4 8.4 0 0 0 2.9 1.6Zm6.06 0a8.4 8.4 0 0 0 2.9-1.6 9.68 9.68 0 0 0 2.12-2.54h-3.44a17.13 17.13 0 0 1-1.58 4.14ZM4.96 16.33h3.97a16.08 16.08 0 0 1 0-4.66H4.96a9.98 9.98 0 0 0-.22 3.51c.05.38.12.76.22 1.15Zm6.3 0h5.48a16.06 16.06 0 0 0 0-4.66h-5.48a16.12 16.12 0 0 0 0 4.66Zm7.82 0h3.96a9.96 9.96 0 0 0 .22-3.51 9.97 9.97 0 0 0-.22-1.15h-3.96a16.12 16.12 0 0 1 0 4.66Zm-.47-7h3.44a9.68 9.68 0 0 0-2.11-2.53 8.4 8.4 0 0 0-2.9-1.6 16.17 16.17 0 0 1 1.57 4.13Zm-6.83 0h4.44A13.81 13.81 0 0 0 14 4.73a14.8 14.8 0 0 0-2.22 4.6Zm-5.83 0h3.44a17.13 17.13 0 0 1 1.58-4.14 8.4 8.4 0 0 0-2.9 1.6 9.68 9.68 0 0 0-2.12 2.54Z"
                              />
                            </Box>
                          }
                          rightIcon={<ChevronDownIcon fontSize="xs" />}
                          _hover={{ bg: 'transparent' }}
                          _active={{ bg: 'transparent' }}
                          pl={0}
                        >
                          {language}
                        </MenuButton>
                        <MenuList
                          bg="#F6EEE5"
                          borderColor="transparent"
                          borderRadius="24px"
                          py={2}
                          px={5}
                          boxShadow="0px 4px 20px rgba(0, 0, 0, 0.15)"
                          minW="100px"
                        >
                          <MenuItem
                            onClick={() => setLanguage('EN')}
                            color={language === 'EN' ? "#C9AB7A" : "#333333"}
                            fontWeight={language === 'EN' ? "semibold" : "normal"}
                            bg="transparent"
                            _hover={{ bg: "rgba(201, 171, 122, 0.1)" }}
                            borderRadius="12px"
                            py={1}
                          >
                            EN
                          </MenuItem>
                          <MenuItem
                            onClick={() => setLanguage('AR')}
                            color={language === 'AR' ? "#C9AB7A" : "#333333"}
                            fontWeight={language === 'AR' ? "semibold" : "normal"}
                            bg="transparent"
                            _hover={{ bg: "rgba(201, 171, 122, 0.1)" }}
                            borderRadius="12px"
                            py={1}
                          >
                            AR
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Flex>

                    <Flex align="center" gap={3} cursor="pointer" onClick={() => {
                      // First close the drawer
                      onDrawerClose();
                      // After a short delay, open the login popover
                      setTimeout(() => {
                        // Open login directly without the handlePopoverOpen function
                        onLoginOpen();
                      }, 300);
                    }}>
                      <Text color="white" fontWeight="medium" fontSize="16px">Login</Text>
                    </Flex>

                    <Flex align="center" gap={3} cursor="pointer" onClick={() => {
                      // First close the drawer
                      onDrawerClose();
                      // After a short delay, open the signup popover
                      setTimeout(() => {
                        // Open signup directly without the handlePopoverOpen function
                        onSignupOpen();
                      }, 300);
                    }}>
                      <Text color="white" fontWeight="medium" fontSize="16px">Sign up</Text>
                    </Flex>
                  </Flex>

                </>
              ) : user?.email === "admin@example.com" ? (
                // Admin state
                <>
                  <Flex direction="column" gap={4}>
                    <Flex align="center" gap={3} cursor="pointer" onClick={() => router.push('/admin')}>
                      <Text color={accentColor} fontWeight="bold">Admin Panel</Text>
                    </Flex>

                    <Divider borderColor="transparent" />

                    <Flex align="center" gap={3} cursor="pointer" onClick={() => router.push('/egybook')}>
                      <MotionLink
                        color="white"
                        fontSize="md"
                        fontWeight="medium"
                        _hover={{ color: "rgba(210, 172, 113, 0.15)" }}
                        transition={{ duration: 0.2 }}
                        textDecoration="none"
                        display="flex"
                        alignItems="center"
                        href="/"
                      >
                        <Text as="span" fontWeight="bold" color={accentColor}>Egy</Text>
                        <Text as="span" fontWeight="regular" color="white">Book</Text>
                      </MotionLink>
                    </Flex>

                    <Flex
                      align="center"
                      gap={3}
                      cursor="pointer"
                      onClick={() => {
                        onDrawerClose();
                        setTimeout(() => {
                          onFavoritesOpen();
                        }, 300);
                      }}
                    >
                      <Box
                        as="svg"
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                        fill="none"
                      >
                        <path
                          d="M22.5766 4.99416C22.0233 4.44058 21.3663 4.00144 20.6433 3.70184C19.9202 3.40223 19.1452 3.24802 18.3625 3.24802C17.5798 3.24802 16.8047 3.40223 16.0817 3.70184C15.3586 4.00144 14.7016 4.44058 14.1483 4.99416L13 6.14249L11.8516 4.99416C10.734 3.87649 9.21809 3.2486 7.63747 3.2486C6.05685 3.2486 4.54097 3.87649 3.4233 4.99416C2.30563 6.11183 1.67773 7.62771 1.67773 9.20833C1.67773 10.7889 2.30563 12.3048 3.4233 13.4225L13 22.9992L22.5766 13.4225C23.1302 12.8692 23.5693 12.2122 23.869 11.4891C24.1686 10.766 24.3228 9.99102 24.3228 9.20833C24.3228 8.42563 24.1686 7.65061 23.869 6.92753C23.5693 6.20445 23.1302 5.54748 22.5766 4.99416Z"
                          stroke="#F6EEE5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </Box>
                      <Text color="white" fontWeight="medium" fontSize="16px">Favorites ({favorites?.length || 0})</Text>
                    </Flex>

                    <Flex
                      align="center"
                      gap={3}
                      cursor="pointer"
                      onClick={() => {
                        onDrawerClose();
                        setTimeout(() => {
                          onCartOpen();
                        }, 300);
                      }}
                    >
                      <Box
                        as="svg"
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                        fill="none"
                      >
                        <path
                          d="M1.08337 1.08333H5.41671L8.32004 15.5892C8.4191 16.0879 8.69044 16.536 9.08655 16.8548C9.48266 17.1737 9.9783 17.3431 10.4867 17.3333H21.0167C21.5251 17.3431 22.0208 17.1737 22.4169 16.8548C22.813 16.536 23.0843 16.0879 23.1834 15.5892L24.9167 6.5H6.50004M10.8334 22.75C10.8334 23.3483 10.3483 23.8333 9.75004 23.8333C9.15173 23.8333 8.66671 23.3483 8.66671 22.75C8.66671 22.1517 9.15173 21.6667 9.75004 21.6667C10.3483 21.6667 10.8334 22.1517 10.8334 22.75ZM22.75 22.75C22.75 23.3483 22.265 23.8333 21.6667 23.8333C21.0684 23.8333 20.5834 23.3483 20.5834 22.75C20.5834 22.1517 21.0684 21.6667 21.6667 21.6667C22.265 21.6667 22.75 22.1517 22.75 22.75Z"
                          stroke="#F6EEE5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </Box>
                      <Text color="white" fontWeight="medium" fontSize="16px">Cart</Text>
                    </Flex>

                    <Flex align="center">
                      <Menu>
                        <MenuButton
                          as={Button}
                          variant="ghost"
                          color={textColor}
                          fontSize="16px"
                          fontWeight="medium"
                          leftIcon={
                            <Box
                              as="svg"
                              xmlns="http://www.w3.org/2000/svg"
                              width="28px"
                              height="28px"
                              fill="none"
                            >
                              <path
                                fill="#F6EEE5"
                                d="M14 25.67c-1.6 0-3.1-.31-4.52-.92a11.83 11.83 0 0 1-6.23-6.23A11.29 11.29 0 0 1 2.33 14c0-1.61.31-3.13.92-4.54a11.88 11.88 0 0 1 6.23-6.2c1.42-.62 2.93-.93 4.52-.93 1.61 0 3.13.31 4.54.92a11.88 11.88 0 0 1 6.2 6.21c.62 1.41.93 2.93.93 4.54 0 1.6-.3 3.1-.92 4.52a11.83 11.83 0 0 1-6.21 6.23c-1.41.61-2.93.92-4.54.92Zm0-2.4a14.82 14.82 0 0 0 2.22-4.6h-4.44a13.8 13.8 0 0 0 2.22 4.6Zm-3.03-.46a16.16 16.16 0 0 1-1.58-4.14H5.95a9.68 9.68 0 0 0 2.11 2.53 8.4 8.4 0 0 0 2.9 1.6Zm6.06 0a8.4 8.4 0 0 0 2.9-1.6 9.68 9.68 0 0 0 2.12-2.54h-3.44a17.13 17.13 0 0 1-1.58 4.14ZM4.96 16.33h3.97a16.08 16.08 0 0 1 0-4.66H4.96a9.98 9.98 0 0 0-.22 3.51c.05.38.12.76.22 1.15Zm6.3 0h5.48a16.06 16.06 0 0 0 0-4.66h-5.48a16.12 16.12 0 0 0 0 4.66Zm7.82 0h3.96a9.96 9.96 0 0 0 .22-3.51 9.97 9.97 0 0 0-.22-1.15h-3.96a16.12 16.12 0 0 1 0 4.66Zm-.47-7h3.44a9.68 9.68 0 0 0-2.11-2.53 8.4 8.4 0 0 0-2.9-1.6 16.17 16.17 0 0 1 1.57 4.13Zm-6.83 0h4.44A13.81 13.81 0 0 0 14 4.73a14.8 14.8 0 0 0-2.22 4.6Zm-5.83 0h3.44a17.13 17.13 0 0 1 1.58-4.14 8.4 8.4 0 0 0-2.9 1.6 9.68 9.68 0 0 0-2.12 2.54Z"
                              />
                            </Box>
                          }
                          rightIcon={<ChevronDownIcon fontSize="xs" />}
                          _hover={{ bg: 'transparent' }}
                          _active={{ bg: 'transparent' }}
                          pl={0}
                        >
                          {language}
                        </MenuButton>
                        <MenuList
                          bg="#F6EEE5"
                          borderColor="transparent"
                          borderRadius="24px"
                          py={2}
                          px={5}
                          boxShadow="0px 4px 20px rgba(0, 0, 0, 0.15)"
                          minW="100px"
                        >
                          <MenuItem
                            onClick={() => setLanguage('EN')}
                            color={language === 'EN' ? "#C9AB7A" : "#333333"}
                            fontWeight={language === 'EN' ? "semibold" : "normal"}
                            bg="transparent"
                            _hover={{ bg: "rgba(201, 171, 122, 0.1)" }}
                            borderRadius="12px"
                            py={1}
                          >
                            EN
                          </MenuItem>
                          <MenuItem
                            onClick={() => setLanguage('AR')}
                            color={language === 'AR' ? "#C9AB7A" : "#333333"}
                            fontWeight={language === 'AR' ? "semibold" : "normal"}
                            bg="transparent"
                            _hover={{ bg: "rgba(201, 171, 122, 0.1)" }}
                            borderRadius="12px"
                            py={1}
                          >
                            AR
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Flex>

                    <Divider borderColor="transparent" />

                    <Flex align="center" gap={3} cursor="pointer">
                      <Text color={accentColor} fontWeight="medium" fontSize="16px">My profile</Text>
                    </Flex>

                    <Flex align="center" gap={3} cursor="pointer">
                      <Text color="white" fontWeight="medium" fontSize="16px">Saved bundles</Text>
                    </Flex>

                    <Flex align="center" gap={3} cursor="pointer">
                      <Text color="white" fontWeight="medium" fontSize="16px">Invite friends</Text>
                    </Flex>

                    <Flex align="center" gap={3} cursor="pointer">
                      <Text color="white" fontWeight="medium" fontSize="16px">Settings</Text>
                    </Flex>

                    <Divider borderColor="transparent" />

                    <Flex align="center" gap={3} cursor="pointer" onClick={handleLogout}>
                      <Text color="#FF5757" fontWeight="medium" fontSize="16px">Log out</Text>
                    </Flex>
                  </Flex>
                </>
              ) : (
                // Regular user state
                <>
                  <Flex direction="column" gap={4}>
                    <Flex align="center" gap={3} cursor="pointer" onClick={() => router.push('/egybook')}>
                      <MotionLink
                        color="white"
                        fontSize="md"
                        fontWeight="medium"
                        _hover={{ color: "rgba(210, 172, 113, 0.15)" }}
                        transition={{ duration: 0.2 }}
                        textDecoration="none"
                        display="flex"
                        alignItems="center"
                        href="/"
                      >
                        <Text as="span" fontWeight="bold" color={accentColor}>Egy</Text>
                        <Text as="span" fontWeight="regular" color="white">Book</Text>
                      </MotionLink>
                    </Flex>

                    <Flex
                      align="center"
                      gap={3}
                      cursor="pointer"
                      onClick={() => {
                        onDrawerClose();
                        setTimeout(() => {
                          onFavoritesOpen();
                        }, 300);
                      }}
                    >
                      <Box
                        as="svg"
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                        fill="none"
                      >
                        <path
                          d="M22.5766 4.99416C22.0233 4.44058 21.3663 4.00144 20.6433 3.70184C19.9202 3.40223 19.1452 3.24802 18.3625 3.24802C17.5798 3.24802 16.8047 3.40223 16.0817 3.70184C15.3586 4.00144 14.7016 4.44058 14.1483 4.99416L13 6.14249L11.8516 4.99416C10.734 3.87649 9.21809 3.2486 7.63747 3.2486C6.05685 3.2486 4.54097 3.87649 3.4233 4.99416C2.30563 6.11183 1.67773 7.62771 1.67773 9.20833C1.67773 10.7889 2.30563 12.3048 3.4233 13.4225L13 22.9992L22.5766 13.4225C23.1302 12.8692 23.5693 12.2122 23.869 11.4891C24.1686 10.766 24.3228 9.99102 24.3228 9.20833C24.3228 8.42563 24.1686 7.65061 23.869 6.92753C23.5693 6.20445 23.1302 5.54748 22.5766 4.99416Z"
                          stroke="#F6EEE5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </Box>
                      <Text color="white" fontWeight="medium" fontSize="16px">Favorites ({favorites?.length || 0})</Text>
                    </Flex>

                    <Flex
                      align="center"
                      gap={3}
                      cursor="pointer"
                      onClick={() => {
                        onDrawerClose();
                        setTimeout(() => {
                          onCartOpen();
                        }, 300);
                      }}
                    >
                      <Box
                        as="svg"
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                        fill="none"
                      >
                        <path
                          d="M1.08337 1.08333H5.41671L8.32004 15.5892C8.4191 16.0879 8.69044 16.536 9.08655 16.8548C9.48266 17.1737 9.9783 17.3431 10.4867 17.3333H21.0167C21.5251 17.3431 22.0208 17.1737 22.4169 16.8548C22.813 16.536 23.0843 16.0879 23.1834 15.5892L24.9167 6.5H6.50004M10.8334 22.75C10.8334 23.3483 10.3483 23.8333 9.75004 23.8333C9.15173 23.8333 8.66671 23.3483 8.66671 22.75C8.66671 22.1517 9.15173 21.6667 9.75004 21.6667C10.3483 21.6667 10.8334 22.1517 10.8334 22.75ZM22.75 22.75C22.75 23.3483 22.265 23.8333 21.6667 23.8333C21.0684 23.8333 20.5834 23.3483 20.5834 22.75C20.5834 22.1517 21.0684 21.6667 21.6667 21.6667C22.265 21.6667 22.75 22.1517 22.75 22.75Z"
                          stroke="#F6EEE5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </Box>
                      <Text color="white" fontWeight="medium" fontSize="16px">Cart</Text>
                    </Flex>

                    <Flex align="center">
                      <Menu>
                        <MenuButton
                          as={Button}
                          variant="ghost"
                          color={textColor}
                          fontSize="16px"
                          fontWeight="medium"
                          leftIcon={
                            <Box
                              as="svg"
                              xmlns="http://www.w3.org/2000/svg"
                              width="28px"
                              height="28px"
                              fill="none"
                            >
                              <path
                                fill="#F6EEE5"
                                d="M14 25.67c-1.6 0-3.1-.31-4.52-.92a11.83 11.83 0 0 1-6.23-6.23A11.29 11.29 0 0 1 2.33 14c0-1.61.31-3.13.92-4.54a11.88 11.88 0 0 1 6.23-6.2c1.42-.62 2.93-.93 4.52-.93 1.61 0 3.13.31 4.54.92a11.88 11.88 0 0 1 6.2 6.21c.62 1.41.93 2.93.93 4.54 0 1.6-.3 3.1-.92 4.52a11.83 11.83 0 0 1-6.21 6.23c-1.41.61-2.93.92-4.54.92Zm0-2.4a14.82 14.82 0 0 0 2.22-4.6h-4.44a13.8 13.8 0 0 0 2.22 4.6Zm-3.03-.46a16.16 16.16 0 0 1-1.58-4.14H5.95a9.68 9.68 0 0 0 2.11 2.53 8.4 8.4 0 0 0 2.9 1.6Zm6.06 0a8.4 8.4 0 0 0 2.9-1.6 9.68 9.68 0 0 0 2.12-2.54h-3.44a17.13 17.13 0 0 1-1.58 4.14ZM4.96 16.33h3.97a16.08 16.08 0 0 1 0-4.66H4.96a9.98 9.98 0 0 0-.22 3.51c.05.38.12.76.22 1.15Zm6.3 0h5.48a16.06 16.06 0 0 0 0-4.66h-5.48a16.12 16.12 0 0 0 0 4.66Zm7.82 0h3.96a9.96 9.96 0 0 0 .22-3.51 9.97 9.97 0 0 0-.22-1.15h-3.96a16.12 16.12 0 0 1 0 4.66Zm-.47-7h3.44a9.68 9.68 0 0 0-2.11-2.53 8.4 8.4 0 0 0-2.9-1.6 16.17 16.17 0 0 1 1.57 4.13Zm-6.83 0h4.44A13.81 13.81 0 0 0 14 4.73a14.8 14.8 0 0 0-2.22 4.6Zm-5.83 0h3.44a17.13 17.13 0 0 1 1.58-4.14 8.4 8.4 0 0 0-2.9 1.6 9.68 9.68 0 0 0-2.12 2.54Z"
                              />
                            </Box>
                          }
                          rightIcon={<ChevronDownIcon fontSize="xs" />}
                          _hover={{ bg: 'transparent' }}
                          _active={{ bg: 'transparent' }}
                          pl={0}
                        >
                          {language}
                        </MenuButton>
                        <MenuList
                          bg="#F6EEE5"
                          borderColor="transparent"
                          borderRadius="24px"
                          py={2}
                          px={5}
                          boxShadow="0px 4px 20px rgba(0, 0, 0, 0.15)"
                          minW="100px"
                        >
                          <MenuItem
                            onClick={() => setLanguage('EN')}
                            color={language === 'EN' ? "#C9AB7A" : "#333333"}
                            fontWeight={language === 'EN' ? "semibold" : "normal"}
                            bg="transparent"
                            _hover={{ bg: "rgba(201, 171, 122, 0.1)" }}
                            borderRadius="12px"
                            py={1}
                          >
                            EN
                          </MenuItem>
                          <MenuItem
                            onClick={() => setLanguage('AR')}
                            color={language === 'AR' ? "#C9AB7A" : "#333333"}
                            fontWeight={language === 'AR' ? "semibold" : "normal"}
                            bg="transparent"
                            _hover={{ bg: "rgba(201, 171, 122, 0.1)" }}
                            borderRadius="12px"
                            py={1}
                          >
                            AR
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Flex>

                    <Divider borderColor="transparent" />

                    <Flex align="center" gap={3} cursor="pointer">
                      <Text color={accentColor} fontWeight="medium" fontSize="16px">My profile</Text>
                    </Flex>

                    <Flex align="center" gap={3} cursor="pointer">
                      <Text color="white" fontWeight="medium" fontSize="16px">Saved bundles</Text>
                    </Flex>

                    <Flex align="center" gap={3} cursor="pointer">
                      <Text color="white" fontWeight="medium" fontSize="16px">Invite friends</Text>
                    </Flex>

                    <Flex align="center" gap={3} cursor="pointer">
                      <Text color="white" fontWeight="medium" fontSize="16px">Settings</Text>
                    </Flex>

                    <Divider borderColor="transparent" />

                    <Flex align="center" gap={3} cursor="pointer" onClick={handleLogout}>
                      <Text color="#FF5757" fontWeight="medium" fontSize="16px">Log out</Text>
                    </Flex>
                  </Flex>
                </>
              )}
            </VStack>

            {/* Logo footer */}
            <Flex justifyContent="center" w="100%" mb={6} mt={4}>
              <Image
                src="/images/logo2.png"
                alt="Logo"
                maxW="180px"
                objectFit="contain"
                opacity={0.9}
              />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </VStack>
  );
}