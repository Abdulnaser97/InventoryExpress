import { Item, ItemBatch, Warehouse } from "./schema";

export function insertItemBatch(
  warehouseId,
  itemName,
  itemId,
  quantity,
  setNotification,
  items,
  setItems,
  warehouses,
  setWarehouses,
  itemBatches,
  setItemBatches
) {
  try {
    // Update global item quantity

    if (!warehouseId) {
      setNotification({ type: "error", message: "Warehouse name is required" });

      throw new Error("Warehouse name is required");
    }
    let item;
    if (!items || !itemId || !items[itemId]) {
      // If no item exists in database, create a new one
      item = new Item(itemName, quantity);
    } else {
      item = items[itemId];
      item.quantity += quantity;
    }
    item.warehouseIds.add(warehouseId);

    setItems((prevState) => {
      const state = { ...prevState };
      state[item.id] = item;
      return state;
    });

    // Update itemBatchById
    const itemBatchObj = new ItemBatch(
      itemName,
      item.id,
      quantity,
      warehouseId
    );
    setItemBatches({ ...itemBatches, [itemBatchObj.batchId]: itemBatchObj });

    // Update warehouse inventory
    const warehouse = warehouses[itemBatchObj.warehouseId];
    if (!warehouse) {
      setNotification({ type: "error", message: "Warehouse not found" });
      throw new Error("Warehouse not found");
    }

    if (itemBatchObj.itemId in warehouse.inventory) {
      warehouse.inventory[itemBatchObj.itemId] += itemBatchObj.quantity;
    } else {
      warehouse.inventory[itemBatchObj.itemId] = itemBatchObj.quantity;
    }

    setWarehouses({ ...warehouses, [itemBatchObj.warehouseId]: warehouse });

    setNotification({
      type: "success",
      message: "Item Batch added successfully",
    });
  } catch (error) {
    console.log(`insertItemBatch: ${error}`);
    setNotification({ type: "error", message: "Error adding item Batch" });
  }
}

export function addWarehouse(address, setWarehouses, setNotification) {
  try {
    if (!address) {
      setNotification({ type: "error", message: "Address is required" });
      throw new Error("Address is required");
    }

    let warehouses = JSON.parse(sessionStorage.getItem("warehouses"));
    if (!warehouses) {
      warehouses = {};
    }

    Object.keys(warehouses).forEach(function (key) {
      if (warehouses[key].address === address) {
        throw new Error("Warehouse already exists");
      }
    });

    const warehouse = new Warehouse(address);

    warehouses[warehouse.id] = warehouse;

    setWarehouses(warehouses);
    setNotification({
      type: "success",
      message: `Successfully added warehouse ${address}`,
    });
  } catch (error) {
    console.log(`addWarehouse: ${error}`);
    // return response message, warehouse not found
    setNotification({
      type: "error",
      message: `Error adding warehouse ${address}`,
    });
  }
}
