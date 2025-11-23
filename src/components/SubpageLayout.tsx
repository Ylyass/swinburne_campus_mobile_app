import { ReactNode } from "react";

export default function SubpageLayout({
  icon, title, description, children, extra,
}: {
  icon: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
  extra?: ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="maxw container-px py-8">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          {icon} {title}
        </h1>
        {description && <p className="text-sm text-slate-600 mt-1">{description}</p>}
      </div>

      <div className="maxw container-px grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {children}
      </div>

      {extra && <div className="maxw container-px mt-8">{extra}</div>}
    </div>
  );
}
