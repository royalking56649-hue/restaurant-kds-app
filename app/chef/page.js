'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import OrderCard from '@/components/OrderCard';

export default function ChefDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // 1. Initial Fetch
    const fetchOrders = async () => {
      const { data } = await supabase
        .from('orders')
        .select('*')
        .neq('status', 'served')
        .order('created_at', { ascending: true });
      setOrders(data || []);
    };

    fetchOrders();

    // 2. Real-time Subscription
    const channel = supabase
      .channel('kitchen-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setOrders((prev) => [...prev, payload.new]);
        } else if (payload.eventType === 'UPDATE') {
          setOrders((prev) => 
            payload.new.status === 'served' 
              ? prev.filter(o => o.id !== payload.new.id)
              : prev.map(o => o.id === payload.new.id ? payload.new : o)
          );
        }
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const updateStatus = async (id, status) => {
    await supabase.from('orders').update({ status }).eq('id', id);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6">
      <header className="mb-8 flex justify-between items-center border-b border-zinc-800 pb-4">
        <h1 className="text-4xl font-black tracking-tighter uppercase">Kitchen Display System</h1>
        <div className="px-4 py-2 bg-red-600 animate-pulse rounded-full text-sm font-bold">LIVE</div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {orders.map(order => (
          <OrderCard key={order.id} order={order} onUpdateStatus={updateStatus} />
        ))}
      </div>
    </main>
  );
}
