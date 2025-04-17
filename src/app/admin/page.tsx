'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Container,
  useToast,
  Badge,
  Flex
} from '@chakra-ui/react';
import { FaTrash, FaUser, FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

// Define user type for display
interface UserDisplay {
  email: string;
  name: string;
}

export default function AdminPanel() {
  const [users, setUsers] = useState<UserDisplay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    // Redirect if not logged in or not admin
    if (!isLoggedIn || user?.email !== 'admin@example.com') {
      router.push('/');
      toast({
        title: 'Access Denied',
        description: 'You do not have permission to access this page',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Load users from localStorage
    const loadUsers = () => {
      try {
        const storedUsers = localStorage.getItem('egypt-travel-users');
        if (storedUsers) {
          const parsedUsers = JSON.parse(storedUsers);
          const userList: UserDisplay[] = Object.entries(parsedUsers).map(
            ([email, data]: [string, any]) => ({
              email,
              name: data.name,
            })
          );
          setUsers(userList);
        }
      } catch (error) {
        console.error('Failed to load users', error);
        toast({
          title: 'Error',
          description: 'Failed to load user data',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, [isLoggedIn, user, router, toast]);

  const handleDeleteUser = (email: string) => {
    try {
      // Don't allow deleting the admin account
      if (email === 'admin@example.com') {
        toast({
          title: 'Cannot Delete Admin',
          description: 'The admin account cannot be deleted',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Get current users
      const storedUsers = localStorage.getItem('egypt-travel-users');
      if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers);
        
        // Delete the user
        delete parsedUsers[email];
        
        // Save back to localStorage
        localStorage.setItem('egypt-travel-users', JSON.stringify(parsedUsers));
        
        // Update state
        setUsers(users.filter(u => u.email !== email));
        
        toast({
          title: 'User Deleted',
          description: `User ${email} has been deleted`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Failed to delete user', error);
      toast({
        title: 'Error',
        description: 'Failed to delete user',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.xl" py={10}>
      <Box
        bg="#121212"
        minH="100vh"
        color="white"
        p={8}
        borderRadius="md"
      >
        <VStack align="stretch" spacing={8}>
          <HStack justify="space-between">
            <Heading color="#d2aa70">Admin Panel</Heading>
            <Button 
              leftIcon={<FaArrowLeft />}
              colorScheme="gray" 
              onClick={() => router.push('/')}
            >
              Back to Homepage
            </Button>
          </HStack>
          
          <Box p={6} bg="rgba(68, 68, 68, 0.6)" borderRadius="xl">
            <VStack align="stretch" spacing={4}>
              <Heading size="md" color="#d2aa70">User Management</Heading>
              
              {isLoading ? (
                <Text>Loading users...</Text>
              ) : (
                <Table variant="simple" colorScheme="gray">
                  <Thead>
                    <Tr>
                      <Th color="#d2aa70">Email</Th>
                      <Th color="#d2aa70">Name</Th>
                      <Th color="#d2aa70">Role</Th>
                      <Th color="#d2aa70" isNumeric>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {users.map((user) => (
                      <Tr key={user.email}>
                        <Td>{user.email}</Td>
                        <Td>{user.name}</Td>
                        <Td>
                          {user.email === 'admin@example.com' ? (
                            <Badge colorScheme="red">Admin</Badge>
                          ) : (
                            <Badge colorScheme="green">User</Badge>
                          )}
                        </Td>
                        <Td isNumeric>
                          <Button
                            size="sm"
                            colorScheme="red"
                            leftIcon={<FaTrash />}
                            onClick={() => handleDeleteUser(user.email)}
                            isDisabled={user.email === 'admin@example.com'}
                          >
                            Delete
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                    {users.length === 0 && (
                      <Tr>
                        <Td colSpan={4} textAlign="center">No users found</Td>
                      </Tr>
                    )}
                  </Tbody>
                </Table>
              )}
              
              <Flex direction="column" mt={4} p={4} bg="rgba(68, 68, 68, 0.3)" borderRadius="md">
                <Heading size="sm" color="#d2aa70" mb={2}>Admin Information</Heading>
                <Text fontSize="sm">• Admin users can manage all user accounts</Text>
                <Text fontSize="sm">• The admin account cannot be deleted</Text>
                <Text fontSize="sm">• To create an admin account, use email: admin@example.com and password: 1234</Text>
              </Flex>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Container>
  );
} 