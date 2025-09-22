import React from 'react';
import { assets, footer_data } from '../assets/assets';
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const socialLinks = {
    facebook: { icon: FaFacebookF, url: 'https://facebook.com' },
    twitter: { icon: FaTwitter, url: 'https://twitter.com' },
    instagram: { icon: FaInstagram, url: 'https://instagram.com' },
    youtube: { icon: FaYoutube, url: 'https://youtube.com' },
  };

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-blue-50'>
      <div className='flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500'>
        <div>
          <img src={assets.logo} alt="logo" className='w-32 sm:w-44' />
          <p className='max-w-[410px] mt-6'>Blogsy is a simple and powerful blogging platform that lets you write, publish, and share ideas instantly with ease, creativity, and flexibility.</p>
        </div>
        <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
          {footer_data.map((section, index) => (
            <div key={index}>
              <h3 className='font-semibold text-base text-gray-900 md:mb-5 mb-2'>{section.title}</h3>
              {section.title === 'Follow Us' ? (
                <div className="flex items-center gap-4 mt-2">
                  {section.links.map((link, i) => {
                    const social = socialLinks[link.toLowerCase()];
                    if (!social) return null;
                    const IconComponent = social.icon;
                    return (
                      <a href={social.url} key={i} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition" aria-label={link} >
                        <IconComponent size={22} />
                      </a>
                    );
                  })}
                </div>
              ) : (
                <ul className='text-sm space-y-1'>
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className='hover:underline transition'>{link}</a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
      <p className='py-4 text-center text-sm md:base text-gray-500/80'>Copyright &copy; 2025 Blogsy All Right Reserved.</p>
    </div>
  );
};

export default Footer;