import { Typography, TextField, Snackbar, Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddItemBatch from "./components/AddItemBatch";
import Warehouses from "./components/Warehouses";
import Items from "./components/Items";
import ItemBatches from "./components/ItemBatches";
import ItemWarehouses from "./components/ItemWarehouses";
import Fuse from "fuse.js";

export default function Dashboard() {
  const [warehouses, setWarehouses] = useState(undefined);
  const [items, setItems] = useState(undefined);
  const [itemBatches, setItemBatches] = useState(undefined);
  const [itemName, setItemName] = useState(undefined);
  const [selectedItemId, setSelectedItemId] = useState(undefined);
  const [notificaton, setNotification] = useState(null);
  const [fuse, setFuse] = useState(null); // Fuse.js instance for searching items
  const [itemResults, setItemResults] = useState([]); // Result of item name search

  const onSearch = (event) => {
    setItemName(event.target.value);
  };

  // Update item results when item name changes
  useEffect(() => {
    if (fuse && itemName) {
      const results = fuse.search(itemName);
      const resultValues =
        results.length > 0 ? results.map((it) => it.item) : [];
      setItemResults(resultValues);
    } else if (!itemName && items) {
      setItemResults(Object.values(items));
    }
  }, [itemName, fuse]);

  // Update items in sessionStorage and sets fuse.js instance for searching items
  useEffect(() => {
    if (items !== undefined) {
      sessionStorage.setItem("items", JSON.stringify(items));
      const itemsArray = Object.values(items);
      const fuse = new Fuse(itemsArray, {
        keys: ["name"],
        threshold: 0.3,
      });
      setFuse(fuse);
    }
  }, [items]);

  // Update warehouses in sessionStorage
  useEffect(() => {
    if (warehouses !== undefined) {
      sessionStorage.setItem("warehouses", JSON.stringify(warehouses));
    }
  }, [warehouses]);

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
        <Typography
          variant="h4"
          my={2}
          style={{ color: "#5c5c5c", fontWeight: "bold", marginBottom: "20px" }}
        >
          Inventory Express
        </Typography>
        <TextField
          style={{ margin: "5px", width: "100%", backgroundColor: "#f5f5f5" }}
          type="text"
          label="Search Inventory Items"
          variant="outlined"
          onChange={onSearch}
          value={itemName}
        />
      </div>
      <div className="content-view">
        <div className="item-viewer">
          <div className="items">
            <Typography
              variant="h6"
              m={1}
              style={{ color: "#5c5c5c", fontWeight: "bold" }}
            >
              Global Inventory
            </Typography>
            <Items
              selectedItemId={selectedItemId}
              setSelectedItemId={setSelectedItemId}
              warehouses={warehouses}
              setWarehouses={setWarehouses}
              setNotification={setNotification}
              items={items}
              setItems={setItems}
              itemBatches={itemBatches}
              setItemBatches={setItemBatches}
              itemResults={itemResults}
            />
          </div>
          <div className="item-batches">
            <Typography
              variant="h6"
              m={1}
              style={{ color: "#5c5c5c", fontWeight: "bold" }}
            >
              Item Batches
            </Typography>

            <ItemBatches
              selectedItemId={selectedItemId}
              warehouses={warehouses}
              setWarehouses={setWarehouses}
              setNotification={setNotification}
              items={items}
              setItems={setItems}
              itemBatches={itemBatches}
              setItemBatches={setItemBatches}
              itemResults={itemResults}
              itemName={itemName}
            />
          </div>
          <div className="item-warehouses">
            <Typography
              variant="h6"
              m={1}
              style={{ color: "#5c5c5c", fontWeight: "bold" }}
            >
              Warehouses With Item In Stock
            </Typography>
            <ItemWarehouses
              selectedItemId={selectedItemId}
              warehouses={warehouses}
              setWarehouses={setWarehouses}
              setNotification={setNotification}
              items={items}
              setItems={setItems}
              itemBatches={itemBatches}
              setItemBatches={setItemBatches}
              itemResults={itemResults}
              itemName={itemName}
            />
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
            itemResults={itemResults}
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
