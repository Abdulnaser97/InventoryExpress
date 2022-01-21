import "./AddItemBatch.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { insertItemBatch } from "../inventoryControllers";

export default function AddItemBatch(props) {
  const [warehouseID, setwarehouseID] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleNameChange = (event) => {
    props.setItemName(event.target.value);
  };
  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };
  const handlewarehouseIDChange = (event) => {
    setwarehouseID(event.target.value);
  };

  if (props.itemName) {
    console.log("name exists");
  }

  return (
    <div className="item-control">
      <Typography variant="h6" my={2}>
        Add Item Batch
      </Typography>
      <TextField
        style={{ margin: "8px", width: "90%" }}
        type="text"
        label="item name"
        variant="outlined"
        onChange={handleNameChange}
        value={props.itemName}
      />

      <TextField
        style={{ margin: "8px", width: "90%" }}
        type="text"
        label="Batch quantity"
        variant="outlined"
        onChange={handleQuantityChange}
        value={quantity}
      />

      <FormControl
        style={{ width: "90%", marginBottom: "16px", marginTop: "8px" }}
      >
        <InputLabel>Warehouse</InputLabel>
        <Select
          value={warehouseID}
          label="Warehouse"
          onChange={handlewarehouseIDChange}
        >
          {props.warehouses &&
            Object.entries(props.warehouses).map((wh) => {
              return <MenuItem value={wh[0]}>{wh[1].address}</MenuItem>;
            })}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          insertItemBatch(
            warehouseID,
            props.itemName,
            null,
            quantity,
            props.setNotification
          )
        }
      >
        + Batch
      </Button>
    </div>
  );
}
