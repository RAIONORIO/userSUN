
import React from 'react';
import { SunIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-sm shadow-lg sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center gap-3">
        <SunIcon />
        <h1 className="text-2xl font-bold text-amber-400">usersSUN Dashboard</h1>
      </div>
    </header>
  );
};

export default Header;
