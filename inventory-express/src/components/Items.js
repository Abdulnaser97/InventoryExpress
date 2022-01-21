import { IconButton, ListItem, ListItemText, List } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Items(props) {
  const [itemComponents, setItemComponents] = useState(undefined);

  const handleItemDelete = (itemId) => {
    try {
      if (itemId in props.items) {
        const item = props.items[itemId];
        Object.entries(item.warehouseIDs).forEach((warehouseId) => {
          const warehouse = props.warehouses[warehouseId];
          if (warehouse && warehouse.inventory[itemId]) {
            delete warehouse.inventory[itemId];

            props.setWarehouses({
              ...props.warehouses,
              [warehouseId]: warehouse,
            });
          }
        });
        props.setItems((prevState) => {
          const state = { ...prevState };
          delete state[itemId];
          return state;
        });
      }
    } catch (e) {
      console.log(`Error deleting item ${itemId}`);
      props.setNotification({
        type: "error",
        message: `Error deleting item ${itemId}`,
      });
    }
  };

  useEffect(() => {
    if (props.items) {
      let itemList = Object.entries(props.items).map(([itemId, item]) => {
        return (
          <ListItem
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleItemDelete(itemId)}
              >
                <DeleteIcon />
              </IconButton>
            }
            key={itemId}
          >
            <ListItemText primary={item.name} />
            <ListItemText style={{ marginLeft: "1em" }}>
              {`Qt: ${item.quantity}`}
            </ListItemText>
          </ListItem>
        );
      });
      setItemComponents(itemList);
    }
  }, [props.items, props.warehouses]);

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
        <List>{props.items && itemComponents}</List>
      )}
    </div>
  );
}
