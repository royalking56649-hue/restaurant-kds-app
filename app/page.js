import Link from 'next/link';
import { Utensils, ChefHat } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-zinc-50">
      <h1 className="text-5xl font-black mb-8 tracking-tighter">LINESPEED</h1>
      
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
        <Link href="/waiter" className="flex-1 bg-white p-10 rounded-3xl shadow-xl border-4 border-transparent hover:border-orange-500 transition-all text-center group">
          <Utensils className="mx-auto mb-4 text-orange-500 group-hover:scale-110 transition-transform" size={48} />
          <h2 className="text-2xl font-bold">Waiter View</h2>
        </Link>

        <Link href="/chef" className="flex-1 bg-zinc-900 text-white p-10 rounded-3xl shadow-xl border-4 border-transparent hover:border-zinc-700 transition-all text-center group">
          <ChefHat className="mx-auto mb-4 text-zinc-400 group-hover:scale-110 transition-transform" size={48} />
          <h2 className="text-2xl font-bold">Chef View</h2>
        </Link>
      </div>
    </main>
  );
}
