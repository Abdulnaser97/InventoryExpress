import { Item, ItemBatch } from "./schema";

// Optimizing for time complexity at the expense fo space complexity because #space_is_cheap
export function onItemClick(item, warehousesById) {
  const warehouses = [];
  for (let warehouseId of item.warehouseIds) {
    const warehouse = warehousesById[warehouseId];
    warehouses.push({
      name: warehouse.name,
      location: warehouse.location,
      address: warehouse.address,
      quantity: warehouse.inventory[item.id],
    });
  }
  return warehouses;
}

export function insertItemBatch(
  itemName,
  quantity,
  warehouseId,
  warehousesById,
  itemById,
  itemBatchById,
  setWarehouseById,
  setItemById,
  setItemBatchById
) {
  const itemBatchObj = new ItemBatch(itemName, null, quantity, warehouseId);
  // Update warehouse inventory
  try {
    const warehouse = warehousesById[itemBatchObj.warehouseId];
    if (!warehouse) {
      throw new Error("Warehouse not found");
    }

    if (
      itemBatchObj.itemId in warehousesById[itemBatchObj.warehouseId].inventory
    ) {
      warehousesById[itemBatchObj.warehouseId].inventory[itemBatchObj.itemId] +=
        itemBatchObj.quantity;
    } else {
      warehousesById[itemBatchObj.warehouseId].inventory[itemBatchObj.itemId] =
        itemBatchObj.quantity;
    }
    setWarehouseById({ ...warehousesById });

    // Update global item quantity
    if (itemBatchObj.itemId && itemBatchObj.itemId in itemById) {
      itemById[itemBatchObj.itemId].quantity += itemBatchObj.quantity;
      itemById[itemBatchObj.itemId].warehouseIds.add(itemBatchObj.warehouseId);
    } else {
      const item = new Item(itemBatchObj.name, itemBatchObj.quantity);
      item.warehouseIds.add(itemBatchObj.warehouseId);
      itemById[item.id] = item;
    }

    setItemById({ ...itemById });

    // Update itemBatchById
    itemBatchById[itemBatchObj.batchId] = itemBatchObj;
    setItemBatchById({ ...itemBatchById });
  } catch (e) {
    console.log("Error inserting item batch", e);
  }
}
