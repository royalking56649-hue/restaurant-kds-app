import { CheckCircle, Clock, Archive } from 'lucide-react';

export default function OrderCard({ order, onUpdateStatus }) {
  const statusColors = {
    pending: 'bg-red-900 border-red-500',
    ready: 'bg-green-900 border-green-500',
    served: 'bg-zinc-800 border-zinc-700'
  };

  return (
    <div className={`p-6 border-l-8 rounded-xl shadow-xl transition-all ${statusColors[order.status]}`}>
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-3xl font-black">TABLE {order.table_number}</h2>
        <span className="flex items-center gap-2 text-zinc-300">
          <Clock size={18} /> {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      
      <ul className="space-y-2 mb-6">
        {order.items.map((item, i) => (
          <li key={i} className="text-xl font-medium bg-black/20 p-2 rounded">
            {item.qty}x {item.name}
          </li>
        ))}
      </ul>

      {order.status === 'pending' && (
        <button 
          onClick={() => onUpdateStatus(order.id, 'ready')}
          className="w-full py-4 bg-green-600 hover:bg-green-500 rounded-lg font-bold flex justify-center items-center gap-2"
        >
          <CheckCircle size={24} /> MARK READY
        </button>
      )}

      {order.status === 'ready' && (
        <button 
          onClick={() => onUpdateStatus(order.id, 'served')}
          className="w-full py-4 bg-zinc-600 hover:bg-zinc-500 rounded-lg font-bold flex justify-center items-center gap-2"
        >
          <Archive size={24} /> ARCHIVE
        </button>
      )}
    </div>
  );
}
