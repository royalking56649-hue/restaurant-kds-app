'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Utensils } from 'lucide-react';

export default function WaiterDashboard() {
  const tables = Array.from({ length: 20 }, (_, i) => i + 1);

  const sendOrder = async (tableNum) => {
    // Simplified logic: Sending a dummy burger for testing
    const { error } = await supabase.from('orders').insert([{
      table_number: tableNum,
      items: [{ name: 'Double Smash Burger', qty: 1 }, { name: 'Fries', qty: 1 }],
      status: 'pending'
    }]);
    
    if (!error) alert(`Order sent for Table ${tableNum}`);
  };

  return (
    <main className="p-6 bg-zinc-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Table Layout</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
        {tables.map(num => (
          <button
            key={num}
            onClick={() => sendOrder(num)}
            className="h-32 rounded-2xl bg-white border-2 border-zinc-200 shadow-sm flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform hover:border-blue-500"
          >
            <Utensils className="text-zinc-400" />
            <span className="text-2xl font-bold">Table {num}</span>
          </button>
        ))}
      </div>
    </main>
  );
}
