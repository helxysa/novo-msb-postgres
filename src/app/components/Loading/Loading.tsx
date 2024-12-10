'use client';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-white bg-opacity-90 z-50">
      <div className="relative">
        <div className="flex items-center gap-8">
          <span 
            className="text-8xl font-black text-blue-500 animate-bounce hover:animate-none transition-all duration-300 hover:scale-125 hover:rotate-12 hover:text-blue-600 cursor-pointer relative"
            style={{animationDelay: '0ms'}}
          >
            M
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full animate-ping"></div>
          </span>
          
          <span 
            className="text-8xl font-black text-blue-600 animate-bounce hover:animate-none transition-all duration-300 hover:scale-125 hover:-rotate-12 hover:text-blue-700 cursor-pointer relative"
            style={{animationDelay: '150ms'}}
          >
            S
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full animate-ping" style={{animationDelay: '200ms'}}></div>
          </span>
          
          <span 
            className="text-8xl font-black text-blue-700 animate-bounce hover:animate-none transition-all duration-300 hover:scale-125 hover:rotate-12 hover:text-blue-800 cursor-pointer relative"
            style={{animationDelay: '300ms'}}
          >
            B
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-600 rounded-full animate-ping" style={{animationDelay: '400ms'}}></div>
          </span>
        </div>

        <div className="absolute -inset-10 flex items-center justify-center -z-10">
          <div className="w-48 h-48 border-4 border-blue-200 rounded-full animate-spin" style={{animationDuration: '3s'}}></div>
          <div className="absolute w-36 h-36 border-4 border-blue-300 rounded-full animate-spin" style={{animationDuration: '2s'}}></div>
          <div className="absolute w-24 h-24 border-4 border-blue-400 rounded-full animate-spin" style={{animationDuration: '1s'}}></div>
        </div>

        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: '300ms'}}></div>
          <div className="w-3 h-3 bg-blue-700 rounded-full animate-pulse" style={{animationDelay: '600ms'}}></div>
        </div>

        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-48 h-1.5 bg-blue-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"
            style={{
              width: '100%',
              animation: 'progressBar 1.5s ease-in-out infinite'
            }}
          ></div>
        </div>

        <style jsx>{`
          @keyframes progressBar {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Loading;