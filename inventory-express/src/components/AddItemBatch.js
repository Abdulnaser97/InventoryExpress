import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { insertItemBatch } from "../inventoryControllers";

export default function AddItemBatch(props) {
  const [warehouseId, setwarehouseId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [itemId, setItemId] = useState("");

  const handleNameChange = (event) => {
    props.setItemName(event.target.value);
  };
  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };
  const handlewarehouseIdChange = (event) => {
    setwarehouseId(event.target.value);
  };

  // Check if item name exists. If so, set itemId
  useEffect(() => {
    let searchResultItemId = null;
    if (props.itemResults && props.itemResults.length > 0) {
      props.itemResults.forEach((item) => {
        const { id, warehouseIds, name } = item;
        if (props.items[id]) {
          for (let itemWhId of Array.from(warehouseIds)) {
            if (itemWhId === warehouseId && props.itemName === name) {
              searchResultItemId = id;
              break;
            }
          }
        }
      });
    }
    setItemId(searchResultItemId);
  }, [props.itemResults, props.itemName]);

  return (
    <div className="item-control">
      <Typography
        variant="h6"
        style={{
          color: "#5c5c5c",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        Add Item Batch
      </Typography>
      <TextField
        style={{ margin: "8px", width: "90%" }}
        size="small"
        type="text"
        label="item name"
        variant="outlined"
        onChange={handleNameChange}
        value={props.itemName}
      />

      <TextField
        style={{ margin: "8px", width: "90%" }}
        size="small"
        type="text"
        label="Batch quantity"
        variant="outlined"
        onChange={handleQuantityChange}
        value={quantity}
      />

      <FormControl
        style={{ width: "90%", marginBottom: "15px", marginTop: "8px" }}
        size="small"
      >
        <InputLabel>Warehouse</InputLabel>
        <Select
          value={warehouseId}
          label="Warehouse"
          onChange={handlewarehouseIdChange}
        >
          {props.warehouses &&
            Object.entries(props.warehouses).map((wh) => {
              return (
                <MenuItem key={wh[0]} value={wh[0]}>
                  {wh[1].address}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        style={{ width: "30%", borderRadius: "10px" }}
        onClick={() =>
          insertItemBatch(
            warehouseId,
            props.itemName,
            itemId,
            quantity,
            props.setNotification,
            props.items,
            props.setItems,
            props.warehouses,
            props.setWarehouses,
            props.itemBatches,
            props.setItemBatches
          )
        }
      >
        + Batch
      </Button>
    </div>
  );
}
