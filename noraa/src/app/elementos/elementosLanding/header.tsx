"use client";
import React from 'react';

const Header: React.FC = () => {
  return (
      <nav className="bg-orange-200 border-gray-400 rounded-lg">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <span className="self-center lg:text-3xl font-bold whitespace-nowrap text-orange-700 text-lg">Noraa</span>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button type='button' className='lg:mr-4 text-orange-700 lg:text-lg bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-orange-200 font-medium rounded-2xl px-4 py-2 text-center text-sm'>Quienes somos?</button>
            <button type="button" className="text-orange-700 lg:text-lg bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-orange-200 font-medium rounded-2xl px-4 py-2 text-center text-sm">Descubre Noraa</button>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
          </div>
        </div>
      </nav>
    
  );
};

export default Header;
