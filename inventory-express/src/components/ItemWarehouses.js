import { IconButton, ListItem, ListItemText, List } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ItemWarehouses(props) {
  const [itemWarehouseComponents, setItemWarehouseComponents] =
    useState(undefined);

  const editItemWarehouseQt = (warehouseId, itemId, newQuantity) => {
    try {
      if (newQuantity < 0 || typeof newQuantity !== "number") {
        props.setNotification({
          type: "error",
          message: "Please enter a valid quantity",
        });
        throw new Error("Please enter a valid quantity");
      }

      if (warehouseId in props.warehouses) {
        let item = props.items[itemId];
        let oldQuantity;
        // Update warehouse quantity
        const warehouse = props.warehouses[warehouseId];
        if (warehouse && warehouse.inventory[item.id]) {
          oldQuantity = warehouse.inventory[item.id];
          warehouse.inventory[item.id] = newQuantity;
          props.setWarehouses({
            ...props.warehouses,
            [warehouseId]: warehouse,
          });
        }

        // Update global item quantity
        if (item && item.quantity > 0) {
          item.quantity -= oldQuantity;
          item.quantity += newQuantity;
          props.setItems({
            ...props.items,
            [item.id]: item,
          });
        }
      }
    } catch (e) {
      console.log(`Error deleting updating quantity`);
      props.setNotification({
        type: "error",
        message: `Error updating quantity`,
      });
    }
  };

  useEffect(() => {
    try {
      if (!props.itemName || !props.itemResults) {
        setItemWarehouseComponents(undefined);
        return;
      }
      if (
        props.warehouses &&
        props.itemResults &&
        props.itemResults.length > 0
      ) {
        let warehouseList = [];
        props.itemResults.map((itemResult) => {
          const { id, warehouseIds } = itemResult;
          let warehouseIdsArr = Array.from(warehouseIds);
          let itemWarehouseList = warehouseIdsArr.map((warehouseId) => {
            let warehouse = props.warehouses[warehouseId];
            let warehouseQuantity = warehouse.inventory[id];

            return (
              <ListItem
                style={{ marginLeft: "20px", borderRadius: "7px" }}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="edit Quantity"
                    onClick={() => editItemWarehouseQt(warehouseId, id, 22)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
                key={warehouseId + id}
              >
                <ListItemText
                  primary={warehouse.address}
                  style={{ marginLeft: "20px" }}
                />
                <ListItemText style={{ marginLeft: "20px" }}>
                  {`Qt: ${warehouseQuantity}`}
                </ListItemText>
              </ListItem>
            );
          });
          warehouseList.push(...itemWarehouseList);
        });
        setItemWarehouseComponents(warehouseList);
      }
    } catch (e) {
      console.log(`Error rendering item warehouses`);
      props.setNotification({
        type: "error",
        message: `Error rendering item warehouses`,
      });
    }
  }, [
    props.selectedItemId,
    props.warehouses,
    props.itemResults,
    props.itemName,
  ]);

  return (
    <div className="item-viewer-container">
      <List>{props.warehouses && itemWarehouseComponents}</List>
    </div>
  );
}
