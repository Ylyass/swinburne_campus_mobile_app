export default function HelpTip({ text }: { text:string }) {
  return (
    <span className="ml-1 cursor-help select-none rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600" title={text}>?</span>
  );
}
