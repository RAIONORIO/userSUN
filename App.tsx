
import React, { useState, useCallback } from 'react';
import { User } from './types';
import { useUsers } from './hooks/useUsers';
import Header from './components/Header';
import UserList from './components/UserList';
import Modal from './components/Modal';
import UserForm from './components/UserForm';
import { PlusIcon } from './components/Icons';

const App: React.FC = () => {
  const { users, addUser, updateUser, deleteUser } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleOpenModalForCreate = useCallback(() => {
    setEditingUser(null);
    setIsModalOpen(true);
  }, []);

  const handleOpenModalForEdit = useCallback((user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingUser(null);
  }, []);

  const handleFormSubmit = useCallback((user: Omit<User, 'id'> | User) => {
    if ('id' in user) {
      updateUser(user);
    } else {
      addUser(user);
    }
    handleCloseModal();
  }, [addUser, updateUser, handleCloseModal]);

  const handleDeleteUser = useCallback((id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(id);
    }
  }, [deleteUser]);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-100">User Management</h1>
          <button
            onClick={handleOpenModalForCreate}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            <PlusIcon />
            Add New User
          </button>
        </div>
        <UserList
          users={users}
          onEdit={handleOpenModalForEdit}
          onDelete={handleDeleteUser}
        />
      </main>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingUser ? 'Edit User' : 'Add New User'}
      >
        <UserForm
          currentUser={editingUser}
          onSubmit={handleFormSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default App;
