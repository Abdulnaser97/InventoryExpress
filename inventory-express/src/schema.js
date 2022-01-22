import { v4 as uuidv4 } from "uuid";

export class Warehouse {
  constructor(address) {
    this.id = uuidv4();
    this.location = null;
    this.address = address;
    this.inventory = {}; // {itemId: quantity}
    this.distance = null; // needs to be removed
  }
}

export class Item {
  constructor(name, quantity, imageURL) {
    this.warehouseIds = {}; // Would have been better to use a set here, but set can't be stored as string in sessionStorage
    this.id = uuidv4();
    this.name = name;
    this.quantity = quantity;
    this.imageURL = imageURL ? imageURL : "";
    this.batches = []; // FIFO queue implemented as a list since popping first element in JS is pretty efficient
  }
}

export class ItemBatch {
  constructor(name, itemId, quantity, warehouseId) {
    this.name = name;
    this.itemId = itemId;
    this.batchId = uuidv4();
    this.quantity = quantity;
    this.warehouseId = warehouseId;
    this.dateAdded = new Date().toISOString();
  }
}
