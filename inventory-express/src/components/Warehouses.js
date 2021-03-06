import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { addWarehouse } from "../inventoryControllers";
import { useState } from "react";

export default function Warehouses(props) {
  const [address, setAddress] = useState(undefined);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleWarehouseDelete = (warehouseId) => {
    if (warehouseId in props.warehouses) {
      const warehouse = props.warehouses[warehouseId];
      Object.entries(warehouse.inventory).forEach(([itemId, quantity]) => {
        const item = props.items[itemId];
        if (item) {
          item.quantity -= quantity;
          if (warehouseId in item.warehouseIds) {
            delete item.warehouseIds[warehouseId];
          }
          props.setItems({ ...props.items, [itemId]: item });
        }
      });
      props.setWarehouses((prevState) => {
        const state = { ...prevState };
        delete state[warehouseId];
        return state;
      });
    }
  };

  return (
    <div className="warehouse-view">
      <Typography
        variant="h6"
        style={{
          color: "#5c5c5c",
          fontWeight: "bold",
          marginBottom: "15px",
          borderRadius: "10px",
          height: "10%",
        }}
      >
        Warehouses
      </Typography>
      <TextField
        type="text"
        label="warehouse Address"
        variant="outlined"
        size="small"
        style={{ width: "90%", marginBottom: "15px", height: "12%" }}
        onChange={handleAddressChange}
        value={address}
      />
      <Button
        variant="contained"
        color="primary"
        style={{
          minWidth: "30%",
          marginBottom: "15px",
          borderRadius: "30px",
          height: "12%",
        }}
        onClick={() =>
          addWarehouse(address, props.setWarehouses, props.setNotification)
        }
      >
        + Warehouse
      </Button>
      <div className="flex-list" style={{ minHeight: "20%", maxHeight: "30%" }}>
        <List>
          {props.warehouses &&
            Object.entries(props.warehouses).map((wh) => {
              return (
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleWarehouseDelete(wh[0])}
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
  );
}
