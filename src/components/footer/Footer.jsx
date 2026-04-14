import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookF, faXTwitter } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
        <div className=''>
            <footer className="bg-green-900 w-full p-10 text-center rounded-3xl my-10 ">

  <h1 className="text-white text-5xl font-bold mb-4">KeenKeeper</h1>
  <p className="text-gray-300 text-sm mb-6">Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.</p>

  <p className="text-white font-medium mb-3">Social Links</p>
  <div className="flex justify-center gap-4 mb-10">
    <a href="https://www.instagram.com/" className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
      <span className="text-black text-sm font-bold"><FontAwesomeIcon icon={faInstagram} /></span>
    </a>
    <a href="https://www.facebook.com/" className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
      <span className="text-black text-sm font-bold"><FontAwesomeIcon icon={faFacebookF} /></span>
    </a>
    <a href="https://x.com/" className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
      <span className="text-black text-sm font-bold"><FontAwesomeIcon icon={faXTwitter} /></span>
    </a>
  </div>

  <div className="border-t border-white/20 pt-6 flex flex-col sm:flex-row justify-between px-10 text-gray-400 text-xs">
    <span>© 2026 KeenKeeper. All rights reserved.</span>
    <div className="flex gap-6 mt-2 sm:mt-0">
      <a href="#" className="hover:text-white">Privacy Policy</a>
      <a href="#" className="hover:text-white">Terms of Service</a>
      <a href="#" className="hover:text-white">Cookies</a>
    </div>
  </div>

</footer>
        </div>
    );
};

export default Footer;