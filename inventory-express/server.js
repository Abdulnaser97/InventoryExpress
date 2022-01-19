import { v4 as uuidv4 } from "uuid";

//const itemNamesSearchTrie = new Trie();

class Warehouse {
  constructor(name, address, location) {
    this.id = uuidv4();
    this.name = name;
    this.location = location;
    this.address = address;
    this.inventory = {}; // {itemId: quantity}
    this.distance = null; // needs to be removed
  }
}

// 1. User selects warehouse They wanna add to
//    a. immediately retrieve all the names of items in warehouse.inventory and put them in a trie with the node value being id of item
// 2. User starts typing down item name, if no match found, create a new Item class object and add it to warehouse.inventory
//    b. if item found, then
// if none found, we create a new item object and added it to itemById table
// if found

class Item {
  constructor(name, quantity, imageURL) {
    this.warehouseIDs = new Set();
    this.id = uuidv4();
    this.name = name;
    this.quantity = quantity;
    this.imageURL = imageURL ? imageURL : "";
    this.batches = []; // FIFO queue implemented as a list since popping first element in JS is pretty efficient
  }
}

class ItemBatch {
  constructor(name, itemId, quantity, warehouseID) {
    this.name = name;
    this.itemId = itemId;
    this.batchId = uuidv4();
    this.quantity = quantity;
    this.warehouseID = warehouseID;
    this.dateAdded = new Date();
  }
}

// function retrieveWarehouseInfo(warehouse) {
//   try {
//     const wareHouseInfo = wareHouseById[warehouse.id];
//   } catch (e) {
//     console.log("Error retrieving warehouse info");
//   }
// }

// function onSearchItemName(name) {
//   const itemObjectsArray = itemNamesSearchTrie.find(name); // Needs implementation
// }

// Optimizing for time complexity at the expense fo space complexity because #space_is_cheap
export function onItemClick(item) {
  const warehouses = [];
  for (let warehouseID of item.warehouseIDs) {
    const warehouse = warehousesById[warehouseID];
    warehouses.push({
      name: warehouse.name,
      location: warehouse.location,
      address: warehouse.address,
      quantity: warehouse.inventory[item.id],
    });
  }
  return warehouses;
}

export function insertItemBatch(itemBatchObj) {
  // Update warehouse inventory
  try {
    const warehouse = warehousesById[itemBatchObj.warehouseID];
    if (!warehouse) {
      throw new Error("Warehouse not found");
    }

    if (
      itemBatchObj.itemId in warehousesById[itemBatchObj.warehouseID].inventory
    ) {
      warehousesById[itemBatchObj.warehouseID].inventory[itemBatchObj.itemId] +=
        itemBatchObj.quantity;
    } else {
      warehousesById[itemBatchObj.warehouseID].inventory[itemBatchObj.itemId] =
        itemBatchObj.quantity;
    }

    // Update global item quantity
    if (itemBatchObj.itemId in itemById) {
      itemById[itemBatchObj.itemId].quantity += itemBatchObj.quantity;
    } else {
      const item = new Item(itemBatchObj.name, itemBatchObj.quantity);
      item.quantity += itemBatchObj.quantity;
      item.warehouseIDs.add(itemBatchObj.warehouseID);
      itemById[itemBatchObj.itemId] = item;
    }

    // Update itemBatchById
    itemBatchById[itemBatchObj.batchId] = itemBatchObj;
  } catch (e) {
    console.log("Error inserting item batch");
  }
}

// Items

// Warehouses
const farthestWareHouse = new Warehouse(7, "farthestWareHouse", "123 Main St", {
  longitute: 43.65516733516912,
  latitude: -79.43054855252032,
});
const secondClosestWareHouse = new Warehouse(
  8,
  "secondClosestWareHouse",
  "12543 Fort St",
  { longitute: 43.65104366699908, latitude: -79.3906793523954 }
);
const closestWareHouse = new Warehouse(9, "closestWareHouse", "1 Baby St", {
  longitute: 43.63729881158868,
  latitude: -79.39599249915359,
});

const itemById = {}; //{itemId: Item, ...}
const itemBatchById = {}; //{id: ItemBatchx, ...}

const warehousesById = {
  7: farthestWareHouse,
  8: secondClosestWareHouse,
  9: closestWareHouse,
}; //{id: Warehouse1} // Need to be ptr to warehouse object};
