import { IconButton, ListItemText, List, ListItemButton } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Items(props) {
  const [itemComponents, setItemComponents] = useState(undefined);

  const handleItemSelect = (itemId) => {
    if (props.selectedItemId === itemId) {
      props.setSelectedItemId(undefined);
      return;
    }

    props.setSelectedItemId(itemId);
  };

  const handleItemDelete = (itemId) => {
    try {
      if (itemId in props.items) {
        const item = props.items[itemId];
        Object.entries(item.warehouseIds).forEach((warehouseId) => {
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

  // Filter items to render matches only
  useEffect(() => {
    let itemList;
    if (props.itemResults && props.itemResults.length > 0) {
      itemList = props.itemResults;
    } else if (props.items) {
      itemList = Object.values(props.items);
    } else {
      setItemComponents(undefined);
      return;
    }
    let itemListComp = itemList.map((item) => {
      const { id, name, quantity } = item;
      return (
        <ListItemButton
          key={id}
          style={{ marginLeft: "20px", borderRadius: "7px" }}
          onClick={() => handleItemSelect(id)}
          selected={props.selectedItemId === id}
        >
          <ListItemText primary={name} style={{ marginLeft: "20px" }} />
          <ListItemText style={{ marginLeft: "20px" }}>
            {`Qt: ${quantity}`}
          </ListItemText>
          <IconButton
            style={{ marginLeft: "20px", marginRight: "20px" }}
            edge="end"
            aria-label="delete"
            onClick={() => handleItemDelete(id)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemButton>
      );
    });
    setItemComponents(itemListComp);
  }, [props.items, props.warehouses, props.selectedItemId, props.itemResults]);

  return (
    <div
      className="flex-list"
      style={{ height: "75%", width: "95%", marginTop: "10px" }}
    >
      <List>{itemComponents}</List>
    </div>
  );
}
