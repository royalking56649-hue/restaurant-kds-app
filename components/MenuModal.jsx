import React from 'react';

const INDIAN_MENU = [
  { id: 1, name: 'Paneer Butter Masala', price: 280, category: 'Main' },
  { id: 2, name: 'Chicken Tikka', price: 320, category: 'Starter' },
  { id: 3, name: 'Dal Makhani', price: 220, category: 'Main' },
  { id: 4, name: 'Butter Naan', price: 40, category: 'Bread' },
  { id: 5, name: 'Hyderabadi Biryani', price: 350, category: 'Rice' },
  { id: 6, name: 'Masala Dosa', price: 120, category: 'South Indian' }
];

export default function MenuModal({ isOpen, onClose, onAddOrder }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50">
          <h2 className="text-xl font-black tracking-tight">ADD TO ORDER</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-black font-bold">✕</button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
          {INDIAN_MENU.map((item) => (
            <button
              key={item.id}
              onClick={() => onAddOrder(item)}
              className="w-full flex justify-between items-center p-4 bg-zinc-50 hover:bg-orange-50 rounded-2xl border border-zinc-100 hover:border-orange-200 transition-all group"
            >
              <div className="text-left">
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">{item.category}</span>
                <p className="font-bold text-zinc-900 group-hover:text-orange-700">{item.name}</p>
              </div>
              <p className="font-black text-zinc-500 group-hover:text-orange-600">₹{item.price}</p>
            </button>
          ))}
        </div>
        
        <div className="p-4 bg-white border-t border-zinc-100">
          <button 
            onClick={onClose}
            className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-black"
          >
            Done Selecting
          </button>
        </div>
      </div>
    </div>
  );
}
