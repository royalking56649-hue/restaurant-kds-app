'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import OrderCard from '@/components/OrderCard';

export default function ChefDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Pre-load the notification sound
   const notificationSound = new Audio('/ping.mp3');
    const channel = supabase
      .channel('kitchen-updates')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, (payload) => {
        // PLAY SOUND ON NEW ORDER
        notificationSound.play().catch(e => console.log("Audio play blocked until user interaction."));
        
        setOrders((prev) => [...prev, payload.new]);
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders' }, (payload) => {
        // Handle updates/archives as before
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* IMPORTANT: Browser security prevents audio from playing 
         unless the user clicks SOMETHING on the page first.
      */}
      <div className="bg-zinc-800 p-4 rounded-2xl mb-8 text-center border border-zinc-700">
        <p className="text-zinc-400 text-sm font-bold tracking-widest uppercase">System Active</p>
        <p className="text-xs text-zinc-500 italic">Tap anywhere on screen to enable audio alerts</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {orders.map(o => <OrderCard key={o.id} order={o} />)}
      </div>
    </div>
  );
}
