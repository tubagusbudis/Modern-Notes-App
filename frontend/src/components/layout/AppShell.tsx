import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen h-screen w-full bg-[#FAF4EB] dark:bg-[#121212] p-2 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center overflow-hidden relative">
      {/* Playful Floating Geometric Accents in Background */}
      <div className="absolute top-3 right-8 w-6 h-6 bg-[#FFE066] border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000] rotate-12 pointer-events-none hidden sm:block z-0" />
      <div className="absolute top-7 right-20 w-4 h-4 bg-[#B4E4FF] border-2 border-black rounded-md shadow-[2px_2px_0px_0px_#000] -rotate-12 pointer-events-none hidden sm:block z-0" />
      <div className="absolute bottom-6 left-8 w-5 h-5 bg-[#FF7890] border-2 border-black rounded-full shadow-[2px_2px_0px_0px_#000] pointer-events-none hidden sm:block z-0" />
      <div className="absolute bottom-10 left-16 w-3 h-3 bg-[#A3F7CF] border-2 border-black rounded-sm shadow-[1.5px_1.5px_0px_0px_#000] rotate-45 pointer-events-none hidden sm:block z-0" />

      {/* Main Framed Neo-Brutalist Workspace Container */}
      <div className="w-full h-full max-w-[1600px] bg-white dark:bg-[#1E1E1E] rounded-3xl border-3 sm:border-4 border-black shadow-[6px_6px_0px_0px_#000000] sm:shadow-[8px_8px_0px_0px_#000000] flex overflow-hidden relative z-10">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white dark:bg-[#1E1E1E]">
          <TopBar onOpenSidebar={() => setSidebarOpen(true)} />
          
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-white dark:bg-[#1E1E1E]">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
