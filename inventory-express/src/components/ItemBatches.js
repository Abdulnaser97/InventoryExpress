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
        const warehouse = props.warehouses[itemBatch.warehouseID];
        if (warehouse && warehouse.inventory[itemBatch.itemID]) {
          warehouse.inventory[itemBatch.itemID] -= itemBatch.quantity;
          props.setWarehouses({
            ...props.warehouses,
            [itemBatch.warehouseID]: warehouse,
          });
        }

        // Update warehouse quantity
        const item = props.items[itemBatch.itemID];
        if (item && item.quantity > 0) {
          item.quantity -= itemBatch.quantity;
          props.setItems({
            ...props.items,
            [itemBatch.itemID]: item,
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
    if (props.itemBatches) {
      let itemBatchList = Object.entries(props.itemBatches).map(
        ([itemBatchId, itemBatch]) => {
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
        }
      );
      setBatchesComponent(itemBatchList);
    }
  }, [props.itemBatches]);

  return (
    <div className="item-viewer-container">
      {props.selectedItem ? (
        <ListItem
          warehouses={[]}
          itemId={1}
          name={"pencil"}
          batches={[]}
          quantity={12}
        />
      ) : (
        <List>{props.itemBatches && batchesComponent}</List>
      )}
    </div>
  );
}
