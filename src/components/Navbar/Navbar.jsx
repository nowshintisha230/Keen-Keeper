'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faClock, faChartLine } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const pathname = usePathname();

  const linkClass = (path) =>
    pathname === path
      ? "bg-green-900 text-white font-bold flex items-center gap-2"
      : "text-black flex items-center gap-2 hover:text-green-500";

  return (
    <div className="navbar bg-base-100 rounded-xl shadow-sm mt-1">
      
   
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            ☰
          </div>

          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
            
            <li>
              <Link className={linkClass("/")} href="/">
                <FontAwesomeIcon icon={faHouse} />
                Home
              </Link>
            </li>

            <li>
              <Link className={linkClass("/timeline")} href="/timeline">
                <FontAwesomeIcon icon={faClock} />
                Timeline
              </Link>
            </li>

            <li>
              <Link className={linkClass("/stats")} href="/stats">
                <FontAwesomeIcon icon={faChartLine} />
                Stats
              </Link>
            </li>

          </ul>
        </div>

        <a className="text-4xl">
          <span className="font-bold">Keen</span>Keeper
        </a>
      </div>

   
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">

          <li>
            <Link className={linkClass("/")} href="/">
              <FontAwesomeIcon icon={faHouse} />
              Home
            </Link>
          </li>

          <li>
            <Link className={linkClass("/timeline")} href="/timeline">
              <FontAwesomeIcon icon={faClock} />
              Timeline
            </Link>
          </li>

          <li>
            <Link className={linkClass("/stats")} href="/stats">
              <FontAwesomeIcon icon={faChartLine} />
              Stats
            </Link>
          </li>

        </ul>
      </div>

    </div>
  );
};

export default Navbar;