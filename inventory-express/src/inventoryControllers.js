const { Item, ItemBatch, Warehouse } = require("./schema");
const { v4: uuidv4 } = require("uuid");

// Warehouses
const farthestWareHouse = new Warehouse("123 Main St", {
  longitute: 43.65516733516912,
  latitude: -79.43054855252032,
});
const secondClosestWareHouse = new Warehouse("12543 Fort St", {
  longitute: 43.65104366699908,
  latitude: -79.3906793523954,
});
const closestWareHouse = new Warehouse("1 Baby St", {
  longitute: 43.63729881158868,
  latitude: -79.39599249915359,
});

const pencil = new Item("pencil", 10);
const pencilId = pencil.id;
const book = new Item("book", 12);
const bookId = book.id;
const paper = new Item("paper", 15);
const paperId = paper.id;

var itemByID = {};
itemByID[pencilId] = pencil;
itemByID[bookId] = book;
itemByID[paperId] = paper;

var itemBatchByID = {};
// export var warehouseByID = {
//   7: farthestWareHouse,
//   8: secondClosestWareHouse,
//   9: closestWareHouse,
// }; //{id: Warehouse, ...}

export function insertItemBatch(
  warehouseID,
  itemName,
  itemID,
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
    let item;
    if (!items || !items[itemID]) {
      // If no item exists in database, create a new one
      item = new Item(itemName, quantity);
      item.warehouseIDs.add(warehouseID);
    } else {
      item = items[itemID];
      item.quantity += quantity;
      item.warehouseIDs.add(warehouseID);
    }
    setItems({ ...items, [item.id]: item });

    // Update itemBatchByID
    const itemBatchObj = new ItemBatch(
      itemName,
      item.id,
      quantity,
      warehouseID
    );
    setItemBatches({ ...itemBatches, [itemBatchObj.batchId]: itemBatchObj });

    // Update warehouse inventory
    const warehouse = warehouses[itemBatchObj.warehouseID];
    if (!warehouse) {
      setNotification({ type: "error", message: "Warehouse not found" });
      throw new Error("Warehouse not found");
    }

    if (itemBatchObj.itemID in warehouse.inventory) {
      warehouse.inventory[itemBatchObj.itemID] += itemBatchObj.quantity;
    } else {
      warehouse.inventory[itemBatchObj.itemID] = itemBatchObj.quantity;
    }

    setWarehouses({ ...warehouses, [itemBatchObj.warehouseID]: warehouse });

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

// function updateItemQuantityInAWarehouse() {
//   return async (req, res) => {
//     try {
//       let { authorization } = req.headers;
//       if (!authorization) {
//         res.status(400).json({
//           message: error.message,
//         });
//         throw new Error("Authorization header not found");
//       }
//       var { warehouseID, itemID, newQuantity } = req.body;

//       const warehouse = warehouseByID[warehouseID];
//       if (!warehouse) {
//         throw new Error("Warehouse not found");
//       }

//       if (!itemID) {
//         throw new Error(`ItemID not found in ${warehouse.address}`);
//       }
//       warehouse.inventory[itemID] = newQuantity;
//       warehouseByID[warehouseID] = warehouse;

//       res.status(200).send("item quantity updated successfully");
//     } catch (error) {
//       console.log(`updateItemQuantityInAWarehouse: ${error}`);
//       // return response message, warehouse not found
//       res.status(400).json({
//         message: error.message,
//       });
//     }
//   };
// }

// function getItem() {
//   return async (req, res) => {
//     try {
//       let { authorization } = req.headers;
//       if (!authorization) {
//         res.status(400).json({
//           message: error.message,
//         });
//         throw new Error("Authorization header not found");
//       }
//       var itemID = req.query.id;
//       const item = itemByID[itemID];
//       if (!item) {
//         throw new Error("Item not found");
//       }
//       res.status(200).send(item);
//     } catch (error) {
//       console.log(`getItem: ${error}`);
//       // return response message, warehouse not found
//       res.status(400).json({
//         message: error.message,
//       });
//     }
//   };
// }
