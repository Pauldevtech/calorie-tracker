import React from 'react';
import logo from '../assets/logonb.png';
const Navbar: React.FC = () => {
 return (
 <nav className="bg-green-700 p-2 text-white flex justify-center pr-8 sm:justify-start items-center">
 <div className='flex items-center'>
  <img src={logo} alt="Logo" className="h-6 w-auto mr-3 md:block sm:h-8" /> {/* Show the logo on medium screens and above */}
  <h1 className="text-lg font-bold sm:text-xl">Calorie Tracker</h1> {/* Center the text horizontally */}
 </div>
 <div>
  {/* Add your navigation links here */}
 </div>
 </nav>
 );
};

export default Navbar;