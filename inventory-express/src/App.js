import React, { useEffect } from "react";
import "./App.css";
import { insertItemBatch, onItemClick } from "./utils";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import NewItemBatchForm from "./components/BatchForm";
import { addItemBatch } from "./apiCaller";
import { Alert, Snackbar } from "@mui/material";

function syntaxHighlight(json) {
  if (typeof json != "string") {
    json = JSON.stringify(json, undefined, 2);
  }
  json = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      var cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
        } else {
          cls = "string";
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }
      return '<span class="' + cls + '">' + match + "</span>";
    }
  );
}

function App() {
  const [itemName, setItemName] = useState("");
  const [warehouseID, setwarehouseID] = useState("");
  const [quantity, setQuantity] = useState("");
  const [warehouseByID, setWarehouseByID] = useState(null);
  const [itemByID, setItemByID] = useState(null);
  const [itemBatchByID, setItemBatchByID] = useState(null);

  const [newBatchForm, setNewBatchForm] = useState(true);
  const [curBatchForm, setcurBatchForm] = useState(true);

  const [notificaton, setNotification] = useState(null);

  const handleNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };
  const handlewarehouseIDChange = (event) => {
    setwarehouseID(parseInt(event.target.value));
  };

  useEffect(() => {
    document.getElementById(1).innerHTML = syntaxHighlight(warehouseByID);
    document.getElementById(2).innerHTML = syntaxHighlight(itemByID);
    document.getElementById(3).innerHTML = syntaxHighlight(itemBatchByID);
    console.log(itemByID);
  }, [warehouseByID, itemByID, itemBatchByID]);

  return (
    <div className="App">
      {notificaton && (
        <Snackbar
          style={{
            position: "fixed",
            "max-height": "fit-content",
            "min-width": "15vw",
            top: "5vh",
            left: "30vw",
          }}
          open={notificaton.message}
          autoHideDuration={4000}
          onClose={() => setNotification(null)}
        >
          <Alert
            severity={notificaton.type}
            onClose={() => setNotification(null)}
          >
            {notificaton.message}
          </Alert>
        </Snackbar>
      )}

      {newBatchForm && (
        <NewItemBatchForm
          setNewBatchForm={setNewBatchForm}
          setNotification={setNotification}
        />
      )}

      <div>
        <form>
          <TextField
            style={{ width: "200px", margin: "5px" }}
            type="text"
            label="name"
            variant="outlined"
            onChange={handleNameChange}
            value={itemName}
          />
          <br />
          <TextField
            style={{ width: "200px", margin: "5px" }}
            type="text"
            label="quantity"
            variant="outlined"
            onChange={handleQuantityChange}
            value={quantity}
          />
          <br />
          <TextField
            style={{ width: "200px", margin: "5px" }}
            type="text"
            label="warehouseID"
            variant="outlined"
            onChange={handlewarehouseIDChange}
            value={warehouseID}
          />
          <br />

          <Button
            variant="contained"
            color="primary"
            onClick={() => () =>
              addItemBatch(warehouseID, itemName, null, quantity)}
          >
            Register item batch
          </Button>
        </form>
      </div>

      <div>
        <pre id="1" />
        <pre id="2" />

        <pre id="3" />
      </div>
    </div>
  );
}

export default App;
