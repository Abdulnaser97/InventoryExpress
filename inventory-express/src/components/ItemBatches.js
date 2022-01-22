import { IconButton, ListItem, ListItemText, List } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ItemBatches(props) {
  const [batchesComponent, setBatchesComponent] = useState(undefined);

  const handleItemBatchDelete = (batchId) => {
    try {
      if (batchId in props.itemBatches) {
        const itemBatch = props.itemBatches[batchId];
        // Update warehouse quantity
        const warehouse = props.warehouses[itemBatch.warehouseId];
        if (warehouse && warehouse.inventory[itemBatch.itemId]) {
          warehouse.inventory[itemBatch.itemId] -= itemBatch.quantity;
          props.setWarehouses({
            ...props.warehouses,
            [itemBatch.warehouseId]: warehouse,
          });
        }

        // Update warehouse quantity
        const item = props.items[itemBatch.itemId];
        if (item && item.quantity > 0) {
          item.quantity -= itemBatch.quantity;
          props.setItems({
            ...props.items,
            [itemBatch.itemId]: item,
          });
        }

        props.setItemBatches((prevState) => {
          const state = { ...prevState };
          delete state[batchId];
          return state;
        });
      }
    } catch (e) {
      console.log(`Error deleting item batch ${batchId}`);
      props.setNotification({
        type: "error",
        message: `Error deleting item batch ${batchId}`,
      });
    }
  };

  useEffect(() => {
    try {
      if (props.itemBatches) {
        let itemBatches;
        if (props.selectedItemId && props.items[props.selectedItemId]) {
          let item = props.items[props.selectedItemId];
          itemBatches = Object.entries(props.itemBatches).filter(
            (itemBatch) => itemBatch[1].itemId === item.id
          );
        } else {
          itemBatches = Object.entries(props.itemBatches);
        }
        let itemBatchList = itemBatches.map(([itemBatchId, itemBatch]) => {
          return (
            <ListItem
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleItemBatchDelete(itemBatchId)}
                >
                  <DeleteIcon />
                </IconButton>
              }
              key={itemBatchId}
            >
              <ListItemText primary={itemBatch.name} />
              <ListItemText
                primary={itemBatch.dateAdded}
                style={{ marginLeft: "1em" }}
              />
              <ListItemText style={{ marginLeft: "1em" }}>
                {`Qt: ${itemBatch.quantity}`}
              </ListItemText>
            </ListItem>
          );
        });
        setBatchesComponent(itemBatchList);
      }
    } catch (e) {
      console.log(e);
      props.setNotification({
        type: "error",
        message: "Error loading item batches",
      });
    }
  }, [props.itemBatches, props.selectedItemId]);

  return (
    <div className="item-viewer-container">
      <List>{props.itemBatches && batchesComponent}</List>
    </div>
  );
}
