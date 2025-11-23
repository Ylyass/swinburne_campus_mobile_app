"use client";
import { useState, useEffect } from "react";
import AssistantChat from "./AssistantChat";

export default function ChatLauncher() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Prevent body scroll when chat is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return (
    <>
      {/* Floating chat button - positioned above bottom nav */}
      <button
        onClick={handleOpen}
        className="fixed bottom-24 right-4 z-[60] group rounded-full shadow-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white px-4 py-3 backdrop-blur-md hover:from-blue-600 hover:to-purple-700 transition-all duration-200 hover:scale-105 hover:shadow-2xl"
        aria-label="Open Campus Assistant"
        style={{ 
          bottom: 'calc(env(safe-area-inset-bottom) + 5rem)',
          right: 'max(1rem, env(safe-area-inset-right))'
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">🤖</span>
          <span className="text-sm font-medium hidden sm:block">Assistant</span>
        </div>
        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 animate-pulse"></div>
      </button>

      {/* Assistant Chat */}
      {open && <AssistantChat onClose={handleClose} />}
    </>
  );
}