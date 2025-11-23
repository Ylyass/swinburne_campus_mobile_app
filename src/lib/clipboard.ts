/**
 * Safe clipboard helper with fallback for iOS Safari and HTTP contexts
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // Modern clipboard API (requires HTTPS or localhost)
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    
    // Fallback for older browsers or insecure contexts
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-999999px';
    textarea.style.top = '-999999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    
    return success;
  } catch (err) {
    console.error('Copy failed:', err);
    return false;
  }
}

/**
 * Show a toast notification
 */
export function showToast(message: string, duration: number = 2000): void {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] px-4 py-2 bg-slate-900 text-white text-sm rounded-full shadow-lg backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('animate-out', 'fade-out', 'slide-out-to-bottom-2');
    setTimeout(() => document.body.removeChild(toast), 200);
  }, duration);
}


