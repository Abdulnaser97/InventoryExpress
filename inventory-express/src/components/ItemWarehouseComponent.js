import { IconButton, ListItem, ListItemText, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";

export default function ItemWarehouseComponent(props) {
  const [quantity, setQuantity] = useState(null);
  const [editQuantity, setEditQuantity] = useState(false);

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };
  return (
    <ListItem
      style={{ marginLeft: "20px", borderRadius: "10px" }}
      key={props.warehouseId + props.itemId}
    >
      {!editQuantity && (
        <IconButton
          edge="end"
          aria-label="Edit Quantity"
          onClick={() => {
            setEditQuantity(true);
          }}
        >
          <EditIcon />
        </IconButton>
      )}

      {editQuantity && (
        <>
          <IconButton
            edge="end"
            aria-label="Done Edit Quantity"
            onClick={() => {
              setEditQuantity(false);
              props.editItemWarehouseQt(
                props.warehouseId,
                props.itemId,
                quantity
              );
            }}
          >
            <CheckIcon />
          </IconButton>
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            style={{ marginLeft: "10px", width: "20%" }}
            onChange={(e) =>
              handleQuantityChange(e, props.warehouseId, props.itemId)
            }
            value={quantity}
          />
        </>
      )}
      <ListItemText
        primary={props.warehouse.address}
        style={{ marginLeft: "20px" }}
      />
      <ListItemText style={{ marginLeft: "20px" }}>
        {`Qt: ${props.warehouseQuantity}`}
      </ListItemText>
    </ListItem>
  );
}
