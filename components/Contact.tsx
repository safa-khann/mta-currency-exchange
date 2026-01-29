import React from 'react';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Clock,
  MessageSquare,
  Send,
  MailIcon,
  MailPlus
} from 'lucide-react';
import Link from 'next/link';
import HeroSection from './common/HeroSection';
import SocialLinks from './common/SocialLinks';
import SimpleMap from './MapWidget';

const ContactPage = () => {
  return (
    <>
        <HeroSection heading="Contact Us" description='We Cant Wait to Hear From You!'/>
        {/* Contact Box */}
        <div className="bg-blue-100/60 mt-5 rounded-2xl mb-10 shadow-equal-md overflow-hidden max-w-md mx-4 sm:mx-auto">
          <div className="px-8 pt-6 pb-8">
            <h2 className='font-bold text-2xl border-b mb-5 pb-4 text-center'>Get In Touch</h2>
            {/* Contact Info Grid - Centered */}
            <div className="grid grid-cols-1  border-b pb-5 gap-8 md:gap-8 justify-items-start ml-0 sm:ml-6">
              
              {/* Location */}
              <div className="flex items-end">
                <div className="w-10 h-10 rounded-full flex bg-darkbluegray items-center justify-center flex-shrink-0 mr-4">
                  <MapPin className="w-12 text-blue-900/50" fill='#dbeafe' stroke='#385b8b ' />
                </div>
                <div className="flex flex-col text-start">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-0">Location</h3>
                  <a  href=''className="text-sm text-gray-800 leading-tight">
                    54 56 high street Grays RM17 6NA, UK
                  </a>
                </div>
              </div>
              
              {/* Email */}
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-darkbluegray flex items-center justify-center flex-shrink-0 mr-4" >
                  <MailPlus className="w-6 text-blue-900/60" fill='#385b8b' stroke='#dbeafe' />
                </div>
                <div className="flex flex-col text-start">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-0">Email Us</h3>
                  <a href='mailto:mtaworldwidelimited@gmail.com' className="text-sm text-gray-800 leading-tight">
                    mtaworldwidelimited@gmail.com
                  </a>
                </div>
              </div>
              
              {/* Call Us */}
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-darkbluegray flex items-center justify-center flex-shrink-0 mr-4">
                  <Phone className="w-8 " fill='#dbeafe' stroke='#385b8b'/>
                </div>
                <div className="flex flex-col text-start">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-0">Call Us</h3>
                  <a href='tel:+441375413554' className="text-sm text-gray-800 leading-tight">
                    +44 1375 413554
                  </a>
                </div>
              </div>
            </div>
            </div></div>

            <h2 className='text-center font-bold mb-4 text-2xl'>Follow Our Social Media</h2>
            <SocialLinks className='w-5 h-5 text-white' circleClass='bg-darkbluegray w-8 h-8 '/>

            <div className='text-center bg-yellow-500/30 my-12 py-8 sm:py-15 sm:px-4'>
            <h2 className='text-center font-bold mb-5 text-3xl'>Working Hours</h2>
            <p className='text-center font-bold text-xl inline'>Monday to Saturday: </p><span className='text-xl font-medium block sm:inline'> 9:00am to 6:00pm</span>
            </div>
            <h2 className='text-center font-bold text-3xl mt-8 mb-8'>Locate Us</h2>
            <SimpleMap/>
            <div className='w-full bg-white mt-[-18px] h-10 absolute z-80 mb-20'></div>
            </>
);}
export default ContactPage;
            