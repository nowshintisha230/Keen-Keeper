import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
const Navbar = () => {
    return (
        <div>
            <div className="navbar bg-base-100 rounded-xl shadow-sm mt-1">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><a><FontAwesomeIcon icon={faHouse} /> 
        <Link href="/">Home</Link></a></li>
        <li><a>
        <FontAwesomeIcon icon={faClock} />Timeline
         </a>
        </li>
        <li><a><FontAwesomeIcon icon={faChartLine} />Stats</a></li>
      </ul>
    </div>
    <a className="text-4xl"><span className='font-bold'>Keen</span>Keeper</a>
  </div>
  <div className="navbar-end hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a><FontAwesomeIcon icon={faHouse} /> <Link href="/">Home</Link> </a></li>
      <li><a><FontAwesomeIcon icon={faClock} />Timeline
      </a></li>
      <li><a><FontAwesomeIcon icon={faChartLine} />Stats</a></li>
    </ul>
  </div>
  
</div>
        </div>
    );
};

export default Navbar;