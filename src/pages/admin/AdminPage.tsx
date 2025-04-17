'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useToast,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure
} from '@chakra-ui/react';
import { SearchIcon, DeleteIcon } from '@chakra-ui/icons';
import { Navbar } from '@/components/common/Navbar';
import { useAuth } from '@/app/context/AuthContext';

interface User {
  email: string;
  name: string;
  password: string;
}

const USERS_STORAGE_KEY = 'egypt-travel-users';

export default function AdminPage() {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();
  const toast = useToast();
  const [users, setUsers] = useState<Record<string, User>>({});
  const [filteredUsers, setFilteredUsers] = useState<Record<string, User>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Check if the current user is an admin
  useEffect(() => {
    if (!isLoggedIn || user?.email !== 'admin@example.com') {
      toast({
        title: 'Access Denied',
        description: 'You must be logged in as an administrator to view this page.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top'
      });
      router.push('/home');
    }
  }, [isLoggedIn, user, router, toast]);

  // Load users from localStorage
  useEffect(() => {
    const loadUsers = () => {
      const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
      if (storedUsers) {
        try {
          const parsedUsers = JSON.parse(storedUsers);
          setUsers(parsedUsers);
          setFilteredUsers(parsedUsers);
        } catch (error) {
          console.error('Failed to parse users data', error);
        }
      }
    };

    loadUsers();
  }, []);

  // Filter users when search query changes
  useEffect(() => {
    if (searchQuery) {
      const filtered = Object.entries(users).reduce((acc, [email, userData]) => {
        if (
          email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          userData.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          acc[email] = userData;
        }
        return acc;
      }, {} as Record<string, User>);
      
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchQuery, users]);

  const handleDeleteUser = (email: string) => {
    setUserToDelete(email);
    onOpen();
  };

  const confirmDelete = () => {
    if (!userToDelete) return;

    // Don't allow deleting the admin account
    if (userToDelete === 'admin@example.com') {
      toast({
        title: 'Cannot Delete Admin',
        description: 'The administrator account cannot be deleted.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top'
      });
      onClose();
      return;
    }

    const updatedUsers = { ...users };
    delete updatedUsers[userToDelete];

    // Save updated users to localStorage
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    setUsers(updatedUsers);

    toast({
      title: 'User Deleted',
      description: `${userToDelete} has been deleted successfully.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top'
    });

    onClose();
  };

  if (!isLoggedIn || user?.email !== 'admin@example.com') {
    return null; // Don't render anything if not admin
  }

  return (
    <>
      <Navbar />
      <Box bg="#121212" minH="calc(100vh - 80px)" py={8} px={8}>
        <Flex direction="column" maxW="1200px" mx="auto">
          <Heading color="white" mb={2}>Admin Panel</Heading>
          <Text color="gray.400" mb={8}>Manage user accounts</Text>

          {/* Search and statistics */}
          <Flex justifyContent="space-between" alignItems="center" mb={6}>
            <InputGroup maxW="400px">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.500" />
              </InputLeftElement>
              <Input
                placeholder="Search users by email or name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                bg="rgba(255, 255, 255, 0.1)"
                color="white"
                borderRadius="md"
                _focus={{ borderColor: '#d2aa70' }}
              />
            </InputGroup>
            <Text color="white">
              Total Users: <Badge colorScheme="yellow" fontSize="md" ml={1}>{Object.keys(users).length}</Badge>
            </Text>
          </Flex>

          {/* User table */}
          <Box
            bg="rgba(255, 255, 255, 0.05)"
            borderRadius="xl"
            overflow="hidden"
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
          >
            <Table variant="simple">
              <Thead bg="rgba(0, 0, 0, 0.2)">
                <Tr>
                  <Th color="#d2aa70">Email</Th>
                  <Th color="#d2aa70">Name</Th>
                  <Th color="#d2aa70">Status</Th>
                  <Th color="#d2aa70" isNumeric>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {Object.entries(filteredUsers).length > 0 ? (
                  Object.entries(filteredUsers).map(([email, userData]) => (
                    <Tr key={email} _hover={{ bg: 'rgba(255, 255, 255, 0.05)' }}>
                      <Td color="white">{email}</Td>
                      <Td color="white">{userData.name}</Td>
                      <Td>
                        {email === 'admin@example.com' ? (
                          <Badge colorScheme="purple">Administrator</Badge>
                        ) : (
                          <Badge colorScheme="blue">User</Badge>
                        )}
                      </Td>
                      <Td isNumeric>
                        <IconButton
                          aria-label="Delete user"
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => handleDeleteUser(email)}
                          opacity={email === 'admin@example.com' ? 0.5 : 1}
                          _hover={{ 
                            bg: email === 'admin@example.com' ? 'transparent' : 'rgba(255, 0, 0, 0.1)'
                          }}
                          cursor={email === 'admin@example.com' ? 'not-allowed' : 'pointer'}
                        />
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={4} textAlign="center" py={8} color="gray.400">
                      No users found matching your search criteria.
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </Box>
        </Flex>

        {/* Delete confirmation dialog */}
        <AlertDialog isOpen={isOpen} leastDestructiveRef={undefined} onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent bg="#1E1E1E" borderColor="#d2aa70" borderWidth="1px">
              <AlertDialogHeader fontSize="lg" fontWeight="bold" color="white">
                Delete User
              </AlertDialogHeader>

              <AlertDialogBody color="gray.300">
                Are you sure you want to delete {userToDelete}? This action cannot be undone.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button onClick={onClose} variant="outline" borderColor="#d2aa70" color="#d2aa70">
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </>
  );
} 