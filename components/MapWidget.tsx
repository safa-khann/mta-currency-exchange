// import Image from "next/image";

// // components/SimpleMap.tsx
// const SimpleMap = () => {
//   // Your coordinates
//   const lat = 51.477685298640665;
//   const lng = 0.32253361288651994;
//   const zoom = 16; // Adjust zoom level (13-19)
  
//   return (
//     <div className="relative px-0 md:px-10 w-full h-[400px] overflow-hidden">
//       <div className="absolute p-2 top-2 left-2 md:left-12 bg-white">
//         <div className="flex flex-col sm:flex-row">
//         <div className="w-80"> 
//            <p className="font-bold text-sm">54-56 High ST N</p>
//            <p className="font-medium text-gray-700 text-xs">54-56 High St, Grays RM17 6NA, United Kingdom</p>
//         </div>
//          <div className="w-full sm:w-20 flex flex-row sm:flex-col items-end justify-start sm:justify-center sm:items-center">
//             <Image
//             src="/images/Directions.png"
//             alt="#"
//             width={50}
//             height={10}
//             className="w-5 mt-2 sm:mt-0 sm:w-10 me-2 sm:mx-auto mb-0 sm:mb-2"
//             /> 
//            <a href="https://www.google.com/maps/dir//MTA+worldwide+Currency+Exchange+%26+Money+Transfer,+54-56+High+St,+Grays+RM17+6NA,+United+Kingdom/@51.4769911,0.3200895,17z/data=!4m17!1m7!3m6!1s0x47d8b792e960dbdb:0x19994416c2535aa9!2sMTA+worldwide+Currency+Exchange+%26+Money+Transfer!8m2!3d51.4769918!4d0.3226627!16s%2Fg%2F11m5fjwvxt!4m8!1m0!1m5!1m1!1s0x47d8b792e960dbdb:0x19994416c2535aa9!2m2!1d0.3226627!2d51.4769918!3e0?authuser=0&entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D" 
//               target="_blank" className="text-xs text-blue-500 hover:text-blue-700">Directions</a>
//            <a href="https://maps.app.goo.gl/q1FFEuoKTSGVqJNw6" target="_blank" className="ms-auto flex sm:hidden text-xs block text-blue-500 hover:text-blue-700">View Larger Map</a>
     
//         </div>
//         </div>
//         <a href="https://maps.app.goo.gl/q1FFEuoKTSGVqJNw6" target="_blank" className="hidden sm:flex text-xs block text-blue-500 hover:text-blue-700">View Larger Map</a>
//       </div>
//       <iframe
//         width="100%"
//         height="100%"
//         frameBorder="0"
//         scrolling="no"
//         marginHeight={0}
//         marginWidth={0}
//         src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.005}%2C${lat-0.005}%2C${lng+0.005}%2C${lat+0.005}&layer=mapnik&marker=${lat}%2C${lng}`}
//         className="border-0"
//         title="MTA Currency Exchange Location - Grays"
//         loading="lazy"
//         allowFullScreen
//       />
//       <div className="text-center text-white py-3 bg-gray-50 border-t">
//         <a 
//           href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=${zoom}/${lat}/${lng}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-blue-600 hover:underline text-sm inline-flex items-center justify-center gap-1 font-medium"
//         >
//           <span>Open Larger Map</span>
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//           </svg>
//         </a>
//       </div>
//       {/* <div className='w-full bg-white mt-[20px] text-black h-20 z-80'>dnjs sdsn</div> */}
//     </div>
//   );
// };

// export default SimpleMap;
import Image from "next/image";

const SimpleMap = () => {
  return (
    <div className="relative px-0 md:px-10 w-full h-[400px] overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d155.3107414555592!2d0.3225797117627375!3d51.4770307641742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8b792e960dbdb%3A0x19994416c2535aa9!2sMTA%20worldwide%20Currency%20Exchange%20%26%20Money%20Transfer!5e0!3m2!1sen!2s!4v1769934282783!5m2!1sen!2s"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="MTA Currency Exchange - Google Maps"
        className="absolute top-0 left-0"
      />
    </div>
  );
};

export default SimpleMap;