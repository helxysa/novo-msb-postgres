'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// import { auth } from '@/lib/firebaseConfig';
import { useRouter } from 'next/navigation';
// import { onAuthStateChanged, signOut } from 'firebase/auth';
// import { User } from 'firebase/auth';

export default function Nav() {
  const router = useRouter();
//   const [user, setUser] = useState<User | null>(null);
  

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;
  

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeMenu();
    }
  };

  const onTouchStart = (e: TouchEvent | React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent | React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setIsMenuOpen(false);
    } else if (isRightSwipe) {
      setIsMenuOpen(true);
    }
  };

  
  
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       router.push('/'); 
//     } catch (error) {
//       console.error('Erro ao fazer logout:', error);
//     }
//   };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <Link href="/" className="flex-shrink-0" prefetch={true}
            shallow={true} >
        {/* <Image src="/images/logo-msb.wepb" alt="MSB Logo" width={80} height={80} className="object-contain" /> */}
      </Link>

      <div className="lg:hidden">
        <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors" onClick={toggleMenu}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <ul className="hidden lg:flex lg:items-center lg:space-x-8 font-montserrat">
        <li>
          <Link 
            href="/todas-vagas/" 
            prefetch={true}
            shallow={true} 
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
          >
            <svg className="w-5 h-5 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">Vagas</span>
          </Link>
          
        </li>

        <li>
          {/* {user && ( */}
          <Link 
            href="/atas-de-preco/"
            prefetch={true}
            shallow={true} 
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
          >
            <svg className="w-5 h-5 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="font-medium">Atas de Preços</span>
          </Link>
          {/* )} */}
        </li>
          
        <li>
          <Link 
            href="/sobre-nos/"
            prefetch={true}
            shallow={true} 
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
          >
            <svg className="w-5 h-5 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Sobre Nós</span>
          </Link>
        </li>
      </ul>

      <div className="hidden lg:flex lg:items-center lg:space-x-4">
        {/* {user && ( */}
          <>
            <Link 
              href="/admin" prefetch={true}
              shallow={true} 
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Área de Administração</span>
            </Link>
            <button
            //   onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="font-medium">Sair</span>
            </button>
          </>
        {/* )} */}
      </div>
    </div>

      
      {isMenuOpen && (
      <div className="navbar-menu relative z-50 lg:hidden ">
        <div 
      className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-40 transition-opacity duration-300"
      onClick={handleBackdropClick}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    ></div>
    <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-[280px] max-w-sm py-6 px-6 bg-white border-r transform transition-transform duration-300 ease-in-out">
      <div className="flex items-center justify-between mb-8">
      <Link href="/" onClick={closeMenu}> 
              <Image 
                src="/images/logo-msb.png" 
                alt="MSB Logo" 
                width={100} 
                height={100}
              />
            </Link>
        <button 
          onClick={closeMenu}
          className="rounded-full p-2 hover:bg-gray-100 transition-colors duration-200"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      {/* Links de Navegação */}
      <div className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link 
              href="/todas-vagas/" 
              prefetch={true}
              shallow={true} 
              className="flex items-center p-3 text-base font-medium text-gray-900 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 group"
              onClick={closeMenu}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Vagas
            </Link>
          </li>
          <li>
            {/* {user && ( */}
            <Link 
              href="/atas-de-preco/"
              prefetch={true}
              shallow={true} 
              className="flex items-center p-3 text-base font-medium text-gray-900 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 group"
              onClick={closeMenu}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Atas de Preços
            </Link>
            {/* )} */}
          </li>
          <li>
            <Link 
              href="/sobre-nos/"
              prefetch={true}
              shallow={true} 
              className="flex items-center p-3 text-base font-medium text-gray-900 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 group"
              onClick={closeMenu}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Sobre Nós
            </Link>
          </li>
        </ul>
          </div>
        </nav>
        </div>
      )}
    </nav>
  );
}