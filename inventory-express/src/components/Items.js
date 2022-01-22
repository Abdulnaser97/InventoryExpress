import {
  IconButton,
  CardContent,
  Grid,
  Card,
  Typography,
  CardActionArea,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
  },
});

export default function Items(props) {
  const [itemComponents, setItemComponents] = useState(undefined);
  const classes = useStyles();

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
        Object.keys(item.warehouseIds).forEach((warehouseId) => {
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
        // <ListItemButton
        //   key={id}
        //   style={{ marginLeft: "20px", borderRadius: "7px" }}
        //   onClick={() => handleItemSelect(id)}
        //   selected={props.selectedItemId === id}
        // >
        //   <ListItemText primary={name} style={{ marginLeft: "20px" }} />
        //   <ListItemText style={{ marginLeft: "20px" }}>
        //     {`Qt: ${quantity}`}
        //   </ListItemText>
        //   <IconButton
        //     style={{ marginLeft: "20px", marginRight: "20px" }}
        //     edge="end"
        //     aria-label="delete"
        //     onClick={() => handleItemDelete(id)}
        //   >
        //     <DeleteIcon />
        //   </IconButton>
        // </ListItemButton>

        <Grid
          key={id}
          item
          xs={5}
          sm={4}
          md={3}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <CardActionArea
            onClick={() => handleItemSelect(id)}
            selected={props.selectedItemId === id}
          >
            <Card
              key={id}
              style={{
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "middle",
              }}
            >
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "3px",
                  marginLeft: "5px",
                  marginRight: "7px",
                }}
              >
                <Typography
                  sx={{ mb: 1.5 }}
                  style={{ fontWeight: "bold", marginBottom: "0" }}
                >
                  {name}
                </Typography>
                <Typography sx={{ mb: 1 }} style={{ marginBottom: "0" }}>
                  {`Qt: ${quantity}`}
                </Typography>
                <br />

                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleItemDelete(id)}
                  style={{ zIndex: 9 }}
                >
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          </CardActionArea>
        </Grid>
      );
    });
    setItemComponents(itemListComp);
  }, [props.items, props.warehouses, props.selectedItemId, props.itemResults]);

  return (
    <div
      className="flex-list"
      style={{ height: "75%", width: "95%", marginTop: "10px" }}
    >
      <Grid
        container
        spacing={4}
        className={classes.gridContainer}
        justify="center"
        style={{ marginTop: "10px" }}
      >
        {itemComponents}
      </Grid>
    </div>
  );
}
