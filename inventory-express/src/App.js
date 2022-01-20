import React, { useEffect } from "react";
import "./App.css";
import { insertItemBatch, onItemClick } from "./utils";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import NewItemBatchForm from "./components/BatchForm";
import {
  addItemBatch,
  addWarehouse,
  login,
  updateWarehouseItemQuantiy,
} from "./apiCaller";
import Dashboard from "./Dashboard";

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
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
