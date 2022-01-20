// Retrieve all warehouses that has the item
export function retrieveWarehouses(item, warehouseByID) {
  const warehouses = [];
  for (let warehouseID of item.warehouseIDs) {
    const warehouse = warehouseByID[warehouseID];
    warehouses.push({
      name: warehouse.name,
      location: warehouse.location,
      address: warehouse.address,
      quantity: warehouse.inventory[item.id],
    });
  }
  return warehouses;
}
