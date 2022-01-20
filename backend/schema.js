const { v4: uuidv4 } = require("uuid");

class Warehouse {
  constructor(address) {
    this.id = uuidv4();
    this.location = null;
    this.address = address;
    this.inventory = {}; // {itemID: quantity}
    this.distance = null; // needs to be removed
  }
}

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
  constructor(name, itemID, quantity, warehouseID) {
    this.name = name;
    this.itemID = itemID;
    this.batchId = uuidv4();
    this.quantity = quantity;
    this.warehouseID = warehouseID;
    this.dateAdded = new Date();
  }
}

module.exports = { Warehouse, Item, ItemBatch };
