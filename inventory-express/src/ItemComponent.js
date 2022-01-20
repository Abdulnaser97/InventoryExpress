import React, { useEffect } from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { getItemBatch } from "./apiCaller";

export default function ItemComponent(props) {
  const { warehouses, itemId, name, batches, quantity } = props;

  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="item-component">
      <div>
        <Typography m={10} variant={"h3"}>
          {name}
        </Typography>
      </div>
      <Typography m={10} variant={"h3"}>
        {quantity}
      </Typography>
      <Typography m={10} variant={"h3"}>
        {itemId}
      </Typography>
    </div>
  );
}
