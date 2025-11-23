export default function Chip({ children, active=false, onClick }:{
  children:React.ReactNode; active?:boolean; onClick?:()=>void;
}) {
  return (
    <button onClick={onClick}
      className={`rounded-full px-3 py-1 text-xs ring-1 transition
      ${active ? "bg-slate-900 text-white ring-slate-900 dark:bg-white dark:text-slate-900 dark:ring-white"
               : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700 dark:hover:bg-slate-800"}`}>
      {children}
    </button>
  );
}
