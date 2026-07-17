import { ReactNode } from "react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: ReactNode;
    description?: string;
}
export default function StatCard({ title, value, icon, description }: StatCardProps) {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-mdtransition">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-slate-500 mb-2">{title}</p>
                    <h2 className=" text-3xl font-black text-blue-950">{value}</h2>
                    { description && <p className="text-xs text-slate-400 mt-2"> {description}</p> }
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center text-2xl"> {icon} </div>
            </div>
        </div>
    )
}