'use client';
import { useState } from 'react';
import { X, Plus, Minus, Send } from 'lucide-react';

const MENU_ITEMS = [
  { id: 'b1', name: 'Cheeseburger', price: 12, category: 'Burgers' },
  { id: 'b2', name: 'Veggie Burger', price: 11, category: 'Burgers' },
  { id: 'p1', name: 'Margherita Pizza', price: 14, category: 'Pizza' },
  { id: 'd1', name: 'Coke', price: 3, category: 'Drinks' },
];

export default function MenuModal({ isOpen, tableNumber, onClose, onSubmit }) {
  const [cart, setCart] = useState({});

  if (!isOpen) return null;

  const updateQty = (name, delta) => {
    setCart((prev) => {
      const currentQty = prev[name] || 0;
      const newQty = Math.max(0, currentQty + delta);
      if (newQty === 0) {
        const { [name]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [name]: newQty };
    });
  };

  const handleSend = () => {
    const itemsArray = Object.entries(cart).map(([name, qty]) => ({ name, qty }));
    if (itemsArray.length === 0) return alert("Add items first!");
    onSubmit(itemsArray);
    setCart({}); // Clear cart for next order
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-zinc-50">
          <h2 className="text-2xl font-black">TABLE {tableNumber} ORDER</h2>
          <button onClick={onClose} className="p-2 bg-zinc-200 rounded-full"><X /></button>
        </div>

        {/* Menu List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {MENU_ITEMS.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-zinc-100 rounded-2xl">
              <div>
                <p className="font-bold text-lg">{item.name}</p>
                <p className="text-zinc-500">${item.price}</p>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => updateQty(item.name, -1)}
                  className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm active:bg-zinc-200"
                >
                  <Minus size={20} />
                </button>
                <span className="text-2xl font-black w-8 text-center">{cart[item.name] || 0}</span>
                <button 
                  onClick={() => updateQty(item.name, 1)}
                  className="w-12 h-12 flex items-center justify-center bg-zinc-800 text-white rounded-xl shadow-sm active:bg-black"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t bg-zinc-50">
          <button 
            onClick={handleSend}
            className="w-full py-5 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-colors shadow-lg"
          >
            <Send size={24} /> SEND TO KITCHEN
          </button>
        </div>
      </div>
    </div>
  );
}
