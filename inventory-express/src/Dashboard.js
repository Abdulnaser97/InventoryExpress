import { Typography, TextField, Button, Snackbar, Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import ItemComponent from "./ItemComponent";
import {
  addItemBatch,
  addWarehouse,
  updateItemQuantityInAWarehouse,
  getItem,
  getItemBatch,
  getWarehouses,
  getItems,
} from "./apiCaller";

export default function Dashboard() {
  const [items, setItems] = useState(null);

  const [itemName, setItemName] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [retrievedItem, setRetrievedItem] = useState(null);
  const [warehouses, setWarehouses] = useState(null);
  const [warehouseID, setwarehouseID] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notificaton, setNotification] = useState(null);
  const [address, setAddress] = useState("");

  const handleNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };
  const handlewarehouseIDChange = (event) => {
    setwarehouseID(parseInt(event.target.value));
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const searchItem = async () => {
    setSelectedItem({ id: "sth", name: "item name" });
  };

  useEffect(() => {
    if (selectedItem && selectedItem.id) {
      setRetrievedItem(getItem(selectedItem.id, setNotification));
    }
  }, [selectedItem]);

  useEffect(() => {
    // async function add() {
    //   const as = await addItemBatch(7, 'as', null,  9, setNotification)
    //   console.log(as)
    // }
    // add()
  }, []);

  useEffect(() => {
    getItems(setNotification, setItems);
  }, []);

  return (
    <div className="dashboard-container">
      {notificaton && (
        <Snackbar
          style={{
            position: "fixed",
            "max-height": "fit-content",
            "min-width": "15vw",
            top: "5vh",
            left: "30vw",
          }}
          open={notificaton.message}
          autoHideDuration={4000}
          onClose={() => setNotification(null)}
        >
          <Alert
            severity={notificaton.type}
            onClose={() => setNotification(null)}
          >
            {notificaton.message}
          </Alert>
        </Snackbar>
      )}

      <div className="search-div">
        <Typography variant="h4" my={2}>
          Inventory Management
        </Typography>
        <div>
          <TextField
            style={{ margin: "5px" }}
            type="text"
            label="search"
            variant="outlined"
            onChange={handleNameChange}
            value={itemName}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => searchItem()}
          >
            Search Item
          </Button>
        </div>
      </div>
      <div className="content-view">
        <div className="item-viewer">
          <div className="item-viewer-container">
            {selectedItem ? (
              <ItemComponent
                warehouses={[]}
                itemId={1}
                name={"pencil"}
                batches={[]}
                quantity={12}
              />
            ) : (
              <Typography variant={"h4"}>
                Select an item to view information
              </Typography>
            )}
          </div>
          <div className="item-viewer-container">
            <div className="warehouse-list">
              <Typography variant="h6" m={2}>
                Item batches
              </Typography>
              {/* {selectedItem.batches.map((batch) => {
                <p> {batch} </p>
              })} */}
            </div>
            <div className="warehouse-list">
              <Typography variant="h6" m={2}>
                Waehouses with item in stock
              </Typography>
              {/* {selectedItem.warehouses.map((warehouse) => {
                <p> {warehouse} </p>
              }) */}
            </div>
          </div>
        </div>

        <div className="control-view">
          <div className="item-control">
            <Typography variant="h6" my={2}>
              Add Item Batch
            </Typography>
            <TextField
              style={{ margin: "5px" }}
              type="text"
              label="name"
              variant="outlined"
              onChange={handleNameChange}
              value={itemName}
            />

            <TextField
              style={{ margin: "5px" }}
              type="text"
              label="quantity"
              variant="outlined"
              onChange={handleQuantityChange}
              value={quantity}
            />

            <TextField
              style={{ margin: "5px" }}
              type="text"
              label="warehouseID"
              variant="outlined"
              onChange={handlewarehouseIDChange}
              value={warehouseID}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                addItemBatch(
                  warehouseID,
                  itemName,
                  null,
                  quantity,
                  setNotification
                )
              }
            >
              + Batch
            </Button>
          </div>

          <div className="warehouse-view">
            <div className="warehouse-control">
              <Typography variant="h6">Warehouses</Typography>
              <TextField
                style={{ margin: "10px" }}
                type="text"
                label="warehouseID"
                variant="outlined"
                onChange={handleAddressChange}
                value={address}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => addWarehouse(address, setNotification)}
              >
                + Warehouse
              </Button>
            </div>
            <div className="warehouse-list"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
