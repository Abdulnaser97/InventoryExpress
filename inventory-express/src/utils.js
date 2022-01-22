// const handleWarehouseDelete = (warehouseId) => {
//   if (warehouseId in warehouses) {
//     const warehouse = warehouses[warehouseId];
//     Object.entries(warehouse.inventory).forEach(([itemId, quantity]) => {
//       const item = items[itemId];
//       if (item) {
//         item.quantity -= quantity;
//         if (warehouseId in item.warehouseIds) {
//           item.warehouseIds.delete(warehouseId);
//         }
//         setItems({ ...items, [itemId]: item });
//       }
//     });
//     setWarehouses((prevState) => {
//       const state = { ...prevState };
//       delete state[warehouseId];
//       return state;
//     });
//   }
// };

// const handleItemDelete = (itemId) => {
//   if (itemId in items) {
//     const warehouse = warehouses[itemId];
//     Object.entries(warehouse.inventory).forEach(([itemId, quantity]) => {
//       const item = items[itemId];
//       if (item) {
//         item.quantity -= quantity;
//         if (itemId in item.itemIds) {
//           item.itemIds.delete(itemId);
//         }
//         setItems({ ...items, [itemId]: item });
//       }
//     });
//     setWarehouses((prevState) => {
//       const state = { ...prevState };
//       delete state[itemId];
//       return state;
//     });
//   }
// };
