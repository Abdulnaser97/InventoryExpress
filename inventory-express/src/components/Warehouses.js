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
            item.warehouseIds.delete(warehouseId);
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
            addWarehouse(address, props.setWarehouses, props.setNotification)
          }
        >
          + Warehouse
        </Button>
      </div>
      <div className="warehouse-list">
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
