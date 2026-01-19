const handleAddItem = async (item) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([
      { 
        item_name: item.name, 
        status: 'pending', 
        table_number: currentTable, // Make sure you have a table state
        price: item.price,
        created_at: new Date().toISOString()
      }
    ]);

  if (error) {
    console.error('Error sending order:', error);
  } else {
    // Optional: Play a small "Success" sound or show a toast
    console.log('Order sent for:', item.name);
  }
};
