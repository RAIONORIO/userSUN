
import React from 'react';
import { User } from '../types';
import { EditIcon, TrashIcon } from './Icons';

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const roleColorMap = {
  Admin: 'bg-red-500/20 text-red-300 border-red-500/30',
  Editor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Viewer: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
};

const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
  if (users.length === 0) {
    return <div className="text-center py-10 bg-slate-800 rounded-lg"><p className="text-slate-400">No users found. Add a new user to get started!</p></div>;
  }
  
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-slate-300">
          <thead className="text-xs text-amber-400 uppercase bg-slate-700/50">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Role</th>
              <th scope="col" className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors duration-200">
                <td className="px-6 py-4 font-medium text-slate-100 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${roleColorMap[user.role]}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end items-center gap-4">
                    <button onClick={() => onEdit(user)} className="text-blue-400 hover:text-blue-300 transition-colors" aria-label={`Edit ${user.name}`}>
                      <EditIcon />
                    </button>
                    <button onClick={() => onDelete(user.id)} className="text-red-400 hover:text-red-300 transition-colors" aria-label={`Delete ${user.name}`}>
                      <TrashIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
