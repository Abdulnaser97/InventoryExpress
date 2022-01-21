import { Typography, TextField, Button, Snackbar, Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddItemBatch from "./components/AddItemBatch";
import Warehouses from "./components/Warehouses";
import Items from "./components/Items";
import ItemBatches from "./components/ItemBatches";

export default function Dashboard() {
  const [warehouses, setWarehouses] = useState(undefined);
  const [items, setItems] = useState(undefined);
  const [itemBatches, setItemBatches] = useState(undefined);
  const [itemName, setItemName] = useState(undefined);
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [retrievedItem, setRetrievedItem] = useState(undefined);
  const [notificaton, setNotification] = useState(null);

  const handleNameChange = (event) => {
    setItemName(event.target.value);
  };

  const searchItem = async () => {
    setSelectedItem({ id: "sth", name: "item name" });
  };

  // Update warehouses in sessionStorage
  useEffect(() => {
    if (warehouses !== undefined) {
      sessionStorage.setItem("warehouses", JSON.stringify(warehouses));
    }
  }, [warehouses]);

  // Update items in sessionStorage
  useEffect(() => {
    if (items !== undefined) {
      sessionStorage.setItem("items", JSON.stringify(items));
    }
  }, [items]);

  // Update item batches in sessionStorage
  useEffect(() => {
    if (itemBatches !== undefined) {
      sessionStorage.setItem("itemBatches", JSON.stringify(itemBatches));
    }
  }, [itemBatches]);

  // Reload states from sessionStorage
  useEffect(() => {
    const sessionWarehouses = sessionStorage.getItem("warehouses");
    if (JSON.parse(sessionWarehouses)) {
      setWarehouses(JSON.parse(sessionWarehouses));
    }

    const sessionItems = sessionStorage.getItem("items");
    if (JSON.parse(sessionItems)) {
      setItems(JSON.parse(sessionItems));
    }

    const sessionItemBatches = sessionStorage.getItem("itemBatches");
    if (JSON.parse(sessionItemBatches)) {
      setItemBatches(JSON.parse(sessionItemBatches));
    }
    console.log(warehouses);
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
          <Items
            selectedItem={selectedItem}
            warehouses={warehouses}
            setWarehouses={setWarehouses}
            setNotification={setNotification}
            items={items}
            setItems={setItems}
            itemBatches={itemBatches}
            setItemBatches={setItemBatches}
          />
          <div className="item-viewer-container">
            <div className="warehouse-list">
              <Typography variant="h6" m={2}>
                Item batches
              </Typography>

              <ItemBatches
                selectedItem={selectedItem}
                warehouses={warehouses}
                setWarehouses={setWarehouses}
                setNotification={setNotification}
                items={items}
                setItems={setItems}
                itemBatches={itemBatches}
                setItemBatches={setItemBatches}
              />
            </div>
            <div className="warehouse-list">
              <Typography variant="h6" m={2}>
                Waehouses with item in stock
              </Typography>
            </div>
          </div>
        </div>

        <div className="control-view">
          <AddItemBatch
            setNotification={setNotification}
            itemName={itemName}
            setItemName={setItemName}
            warehouses={warehouses}
            setWarehouses={setWarehouses}
            items={items}
            setItems={setItems}
            itemBatches={itemBatches}
            setItemBatches={setItemBatches}
          />

          <Warehouses
            warehouses={warehouses}
            setWarehouses={setWarehouses}
            setNotification={setNotification}
            items={items}
            setItems={setItems}
          />
        </div>
      </div>
    </div>
  );
}
