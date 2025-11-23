export default function HealthHeatmap({ rows, cols, cells }:{
  rows:string[]; cols:string[]; cells:number[][];
}) {
  const tone = ["bg-emerald-100","bg-amber-200","bg-rose-300","bg-sky-200"];
  const label = ["Operational","Degraded","Outage","Maintenance"];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="mb-2 text-sm font-semibold">System health (by area)</div>
      <div className="overflow-auto">
        <table className="text-xs">
          <thead>
            <tr>
              <th className="p-2 text-left text-slate-500">Area</th>
              {cols.map(c => <th key={c} className="p-2 text-left text-slate-500">{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((r,i)=>(
              <tr key={r}>
                <td className="p-2 pr-4 font-medium">{r}</td>
                {cells[i].map((v,j)=>(
                  <td key={`${i}-${j}`} className="p-2">
                    <span className={`inline-block h-4 w-4 rounded ${tone[v]}`} title={label[v]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
