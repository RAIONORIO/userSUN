
import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface UserFormProps {
  currentUser: User | null;
  onSubmit: (user: Omit<User, 'id'> | User) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ currentUser, onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'Admin' | 'Editor' | 'Viewer'>('Viewer');

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setRole(currentUser.role);
    } else {
      setName('');
      setEmail('');
      setRole('Viewer');
    }
  }, [currentUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Please fill in all fields.');
      return;
    }
    const userData = { name, email, role };
    if (currentUser) {
      onSubmit({ ...userData, id: currentUser.id });
    } else {
      onSubmit(userData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-slate-700 border border-slate-600 text-white sm:text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
          placeholder="John Doe"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-slate-700 border border-slate-600 text-white sm:text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
          placeholder="name@company.com"
          required
        />
      </div>
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-slate-300 mb-1">
          Role
        </label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value as 'Admin' | 'Editor' | 'Viewer')}
          className="bg-slate-700 border border-slate-600 text-white sm:text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
        >
          <option value="Viewer">Viewer</option>
          <option value="Editor">Editor</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <div className="flex items-center justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="py-2 px-4 bg-slate-600 hover:bg-slate-500 text-white font-bold rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="py-2 px-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg transition-colors"
        >
          {currentUser ? 'Update User' : 'Create User'}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
