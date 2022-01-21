import {
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  ListItem,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { insertItemBatch, addWarehouse } from "./inventoryControllers";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import FolderIcon from "@mui/icons-material/Folder";
import AddItemBatch from "./components/AddItemBatch";

export default function Dashboard() {
  const [items, setItems] = useState(null);
  const [itemName, setItemName] = useState("");
  const [itemComponents, setItemComponents] = useState(null);
  const [selectedItem, setSelectedItem] = useState("");
  const [retrievedItem, setRetrievedItem] = useState(null);
  const [warehouses, setWarehouses] = useState(null);
  const [notificaton, setNotification] = useState(null);
  const [address, setAddress] = useState("");

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleNameChange = (event) => {
    setItemName(event.target.value);
  };
  const handleDelete = (warehouseId) => {
    if (warehouseId in warehouses) {
      const warehouse = warehouses[warehouseId];
      Object.entries(warehouse.inventory).forEach(([itemId, quantity]) => {
        const item = items[itemId];
        if (item) {
          item.quantity -= quantity;
          if (warehouseId in item.warehouseIDs) {
            item.warehouseIDs.delete(warehouseId);
          }
          setItems({ ...items, [itemId]: item });
        }
      });
      setWarehouses((prevState) => {
        const state = { ...prevState };
        delete state[warehouseId];
        return state;
      });
    }
  };

  const searchItem = async () => {
    setSelectedItem({ id: "sth", name: "item name" });
  };

  useEffect(() => {
    sessionStorage.setItem("warehouses", JSON.stringify(warehouses));
  }, [warehouses]);

  useEffect(() => {
    const sessionWarehouses = sessionStorage.getItem("warehouses");
    if (JSON.parse(sessionWarehouses)) {
      setWarehouses(JSON.parse(sessionWarehouses));
    }
    console.log(warehouses);
  }, []);

  useEffect(() => {
    if (items) {
      let itemList = Object.entries(items).map(([item]) => {
        return (
          <ListItem
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(item[0])}
              >
                <DeleteIcon />
              </IconButton>
            }
            key={item[0]}
          >
            <ListItemText primary={item[1].name} />
          </ListItem>
        );
      });
      setItemComponents(itemList);
    }
  }, [items, warehouses]);

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
              <ListItem
                warehouses={[]}
                itemId={1}
                name={"pencil"}
                batches={[]}
                quantity={12}
              />
            ) : (
              <List>{items && itemComponents}</List>
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
          <AddItemBatch
            setNotification={setNotification}
            setItemName={setItemName}
            itemName={itemName}
            warehouses={warehouses}
          />

          <div className="warehouse-view">
            <div className="warehouse-control">
              <Typography variant="h6">Warehouses</Typography>
              <TextField
                style={{ margin: "10px" }}
                type="text"
                label="warehouse Address"
                variant="outlined"
                onChange={handleAddressChange}
                value={address}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  addWarehouse(address, setWarehouses, setNotification)
                }
              >
                + Warehouse
              </Button>
            </div>
            <div className="warehouse-list">
              <List>
                {warehouses &&
                  Object.entries(warehouses).map((wh) => {
                    return (
                      <ListItem
                        secondaryAction={
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDelete(wh[0])}
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                        key={wh[0]}
                      >
                        <ListItemText primary={wh[1].address} />
                      </ListItem>
                    );
                  })}
              </List>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
