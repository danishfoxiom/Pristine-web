// import React from 'react';
// import { useLoading } from '../../context/LoadingContext';
// import Lottie from 'lottie-react';
// import loaderAnimation from '../../asset/image/Soft ui loader (1).json';

// const GlobalLoader: React.FC = () => {
//   const { isLoading, loadingMessage } = useLoading();

//   if (!isLoading) return null;

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 flex flex-col items-center justify-center min-w-[200px]">
//         <div className="w-12 h-12">
//           <Lottie 
//             animationData={loaderAnimation}
//             loop={true}
//             autoplay={true}
//             style={{ width: '100%', height: '100%' }}
//           />
//         </div>
//         <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm font-medium text-center">
//           {loadingMessage}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default GlobalLoader;
