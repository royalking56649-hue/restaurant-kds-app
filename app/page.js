import Link from 'next/link';
import { UtensilsCrossed, ChefHat } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-5xl font-black mb-2 tracking-tighter">LINESPEED</h1>
      <p className="text-zinc-500 mb-12 font-medium">Select your station to begin</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        <Link href="/waiter" className="group p-8 bg-white rounded-3xl shadow-xl hover:ring-4 ring-orange-500 transition-all flex flex-col items-center">
          <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <UtensilsCrossed size={40} />
          </div>
          <h2 className="text-2xl font-bold">Waiter Station</h2>
          <p className="text-zinc-400">Take orders & send to kitchen</p>
        </Link>

        <Link href="/chef" className="group p-8 bg-zinc-900 text-white rounded-3xl shadow-xl hover:ring-4 ring-zinc-500 transition-all flex flex-col items-center">
          <div className="w-20 h-20 bg-zinc-800 text-zinc-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <ChefHat size={40} />
          </div>
          <h2 className="text-2xl font-bold text-white">Kitchen Display</h2>
          <p className="text-zinc-500">Manage incoming orders</p>
        </Link>
      </div>
    </main>
  );
}
