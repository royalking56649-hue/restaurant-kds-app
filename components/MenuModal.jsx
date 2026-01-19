'use client';
import { useState } from 'react';
import { Plus, Send, Zap } from 'lucide-react';

const MENU_DATA = {
  items: [
    { id: 'm1', name: 'Butter Chicken', price: 350, category: 'Main', upsell: 'Butter Naan' },
    { id: 'm2', name: 'Paneer Tikka', price: 280, category: 'Starter', upsell: 'Mint Chutney' },
    { id: 'm3', name: 'Veg Biryani', price: 250, category: 'Main', upsell: 'Raita' },
  ],
  sides: [
    { id: 's1', name: 'Butter Naan', price: 40 },
    { id: 's2', name: 'Mint Chutney', price: 20 },
    { id: 's3', name: 'Raita', price: 50 },
    { id: 's4', name: 'Coke', price: 45 },
  ]
};

export default function MenuModal({ isOpen, tableNumber, onClose, onSubmit }) {
  const [cart, setCart] = useState([]);
  const [suggestion, setSuggestion] = useState(null);

  if (!isOpen) return null;

  const addItem = (item) => {
    setCart([...cart, { ...item, tempId: Date.now() }]);
    
    // Upsell Logic: Find if this item has a suggested side
    const upsellItem = MENU_DATA.sides.find(s => s.name === item.upsell);
    if (upsellItem) {
      setSuggestion(upsellItem);
    } else {
      setSuggestion(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-[3rem] overflow-hidden flex flex-col max-h-[90vh] shadow-2xl">
        
        {/* Header */}
        <div className="p-8 border-b flex justify-between items-center bg-orange-50">
          <div>
            <h2 className="text-3xl font-black text-orange-950">TABLE {tableNumber}</h2>
            <p className="text-orange-700 font-bold">{cart.length} Items Selected</p>
          </div>
          <button onClick={onClose} className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center font-bold text-xl">✕</button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <p className="text-xs font-black text-zinc-400 uppercase tracking-widest">Main Menu</p>
          {MENU_DATA.items.map(item => (
            <button key={item.id} onClick={() => addItem(item)} className="w-full p-5 bg-zinc-100 rounded-3xl flex justify-between items-center hover:bg-orange-100 transition-colors group">
              <span className="text-xl font-bold">{item.name}</span>
              <span className="px-4 py-2 bg-white rounded-2xl shadow-sm font-black text-orange-600">₹{item.price}</span>
            </button>
          ))}

          {/* Dynamic Upsell UI */}
          {suggestion && (
            <div className="mt-8 p-6 bg-blue-600 rounded-[2.5rem] text-white animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2 mb-3">
                <Zap size={20} fill="white" />
                <span className="font-black uppercase text-sm tracking-tighter">Recommended with that</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold">Add {suggestion.name}?</p>
                <button 
                  onClick={() => { addItem(suggestion); setSuggestion(null); }}
                  className="bg-white text-blue-600 px-6 py-3 rounded-2xl font-black shadow-lg active:scale-90 transition-transform"
                >
                  + ₹{suggestion.price}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="p-8 border-t">
          <button 
            onClick={() => { onSubmit(cart); setCart([]); onClose(); }}
            disabled={cart.length === 0}
            className="w-full py-6 bg-orange-500 disabled:bg-zinc-300 text-white rounded-[2rem] font-black text-2xl shadow-xl shadow-orange-200 flex items-center justify-center gap-3 transition-all"
          >
            <Send /> SEND TO KITCHEN
          </button>
        </div>
      </div>
    </div>
  );
}
