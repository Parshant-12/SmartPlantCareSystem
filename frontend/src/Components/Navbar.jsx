import React from 'react';
import plant_logo from '../img/plant.png';
import { GrDashboard } from "react-icons/gr";
import { IoMdContact } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import { VscGraphLine } from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import { IoCameraOutline } from "react-icons/io5";
import { useAuth0 } from "@auth0/auth0-react";
import { PiPottedPlantBold } from "react-icons/pi";

function Nav({ menuOpen, setMenuOpen }) {
  const { user, isAuthenticated, logout } = useAuth0();

  return (
    <nav>
      <div className={`w-full h-screen flex flex-col gap-6 max-lg:gap-2 py-6 px-2 max-lg:fixed z-50 max-lg:bg-[#001202] max-lg:w-[250px] transition-all duration-300 ease-in-out ${menuOpen ? 'left-0' : 'max-lg:left-[-115%]'}`}>

        {/* Logo Section */}
        <div className='mt-2'>
          <h1 className='text-2xl flex justify-center items-center gap-2 max-lg:hidden'>
            <img className='w-8' src={plant_logo} alt="Logo" />
            <div>
              <div className='font-semibold text-3xl'>Smart<span className='text-[#59a45e]'>Plant</span></div>
              <div className='border border-[#e77442] rounded-lg mt-1'></div>
            </div>
          </h1>
        </div>

        {/* Navigation Links */}
        <div className='flex flex-col gap-2'>
          <hr className='text-gray-400' />
          <ul className='text-lg flex flex-col gap-1'>
            <li><NavLink to='/' onClick={() => setMenuOpen(false)} className={({ isActive }) => `flex items-center gap-2 px-2.5 py-3 font-semibold rounded-lg hover:bg-[#272727] hover:text-[#59a45e] transition-all duration-200 ${isActive ? "text-[#59a45e]" : ""}`}><GrDashboard className='text-2xl' /> Dashboard </NavLink></li>
            <li><NavLink to='/Plantinfo' onClick={() => setMenuOpen(false)} className={({ isActive }) => `flex items-center gap-2 px-2.5 py-3 font-semibold rounded-lg hover:bg-[#272727] hover:text-[#59a45e] transition-all duration-200 ${isActive ? "text-[#59a45e]" : ""}`}><PiPottedPlantBold  className='text-2xl' />Plant Info</NavLink></li>
            <li><NavLink to='/Analysis' onClick={() => setMenuOpen(false)} className={({ isActive }) => `flex items-center gap-2 px-2.5 py-3 font-semibold rounded-lg hover:bg-[#272727] hover:text-[#59a45e] transition-all duration-200 ${isActive ? "text-[#59a45e]" : ""}`}><VscGraphLine className='text-2xl' />Analysis</NavLink></li>
            <li><NavLink to='/Camera' onClick={() => setMenuOpen(false)} className={({ isActive }) => `flex items-center gap-2 px-2.5 py-3 font-semibold rounded-lg hover:bg-[#272727] hover:text-[#59a45e] transition-all duration-200 ${isActive ? "text-[#59a45e]" : ""}`}><IoCameraOutline className='text-2xl' />Camera</NavLink></li>
            <li><NavLink to='/About' onClick={() => setMenuOpen(false)} className={({ isActive }) => `flex items-center gap-2 px-2.5 py-3 font-semibold rounded-lg hover:bg-[#272727] hover:text-[#59a45e] transition-all duration-200 ${isActive ? "text-[#59a45e]" : ""}`}><IoInformationCircleOutline className='text-2xl' />About</NavLink></li>
            <li><NavLink to='/Contact' onClick={() => setMenuOpen(false)} className={({ isActive }) => `flex items-center gap-2 px-2.5 py-3 font-semibold rounded-lg hover:bg-[#272727] hover:text-[#59a45e] transition-all duration-200 ${isActive ? "text-[#59a45e]" : ""}`}><IoMdContact className='text-2xl' />Contact</NavLink></li>
          </ul>
          <hr className='text-gray-400' />
        </div>

        <div className='h-full flex flex-col justify-between max-lg:justify-start max-lg:gap-[250px]'>
          {isAuthenticated && (
            <div className='flex flex-col gap-2 px-4'>
              <h1 className='text-xl font-semibold'>Hello! 👋</h1>
              <h2 className='text-xl font-semibold'>{user.name}</h2>
            </div>
          )}

          {/* Logout Button */}
          {isAuthenticated && (
            <div className='flex justify-center items-center gap-2'>
              <img className='w-12 h-12 rounded-full border-2 border-[#59a45e]' src={user.picture} alt={user.name} />
              <button
                onClick={() => logout({ returnTo: window.location.origin })}
                className='w-full py-1 border border-[#e77442] bg-trasparent text-[#e77442] rounded-lg text-xl font-semibold hover:bg-[#e77442] hover:text-white cursor-pointer hover:shadow-[0_0_20px_#c96336] transition-all duration-300'>Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
