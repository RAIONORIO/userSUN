
import { useState, useCallback } from 'react';
import { User } from '../types';

const initialUsers: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice.j@example.com', role: 'Admin' },
  { id: 2, name: 'Bob Williams', email: 'bob.w@example.com', role: 'Editor' },
  { id: 3, name: 'Charlie Brown', email: 'charlie.b@example.com', role: 'Viewer' },
  { id: 4, name: 'Diana Miller', email: 'diana.m@example.com', role: 'Editor' },
];

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const addUser = useCallback((user: Omit<User, 'id'>) => {
    setUsers(prevUsers => [
      ...prevUsers,
      { ...user, id: Date.now() }, // Use timestamp for unique ID in this mock
    ]);
  }, []);

  const updateUser = useCallback((updatedUser: User) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
  }, []);

  const deleteUser = useCallback((id: number) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
  }, []);

  return { users, addUser, updateUser, deleteUser };
};
