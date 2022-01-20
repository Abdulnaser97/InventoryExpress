const BASE_URI = "http://localhost:8080";
export async function perform(method, resource, data) {
  try {
    let reqParams;
    if (method === "post" || method === "put") {
      reqParams = {
        method: method,
        credentials: "include",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(data),
      };
    } else {
      reqParams = {
        method: method,
        credentials: "include",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      };
    }

    let res = await fetch(`${BASE_URI}${resource}`, reqParams);

    return res;
  } catch (e) {
    console.log(e);
  }
}

export async function addItemBatch(
  warehouseID,
  itemName,
  itemID,
  newQuantity,
  setNotification
) {
  const data = {
    warehouseID: warehouseID,
    itemName: itemName,
    newQuantity: newQuantity,
    itemID: itemID,
  };

  console.log(data);
  const res = await perform("post", "/additembatch", data);
  if (res.status !== 200 && res.status !== 201) {
    setNotification({ type: "error", message: "Error adding item Batch" });
  } else {
    setNotification({
      type: "success",
      message: "Item Batch added successfully",
    });
  }
}

export async function addWarehouse(address, setNotification) {
  const data = {
    address: address,
  };

  const res = await perform("set", "/addwarehouse", data);
  if (res.status !== 200 && res.status !== 201) {
    setNotification({
      type: "error",
      message: `Error adding warehouse ${address}`,
    });
  } else {
    setNotification({
      type: "success",
      message: `Successfully added warehouse ${address}`,
    });
  }
}

export async function updateItemQuantityInAWarehouse(
  warehouseID,
  itemID,
  newQuantity,
  setNotification
) {
  const data = {
    warehouseID: warehouseID,
    itemID: itemID,
    newQuantity: newQuantity,
  };

  const res = await perform("post", "/updatewarehouse", data);
  if (res.status !== 200 && res.status !== 201) {
    setNotification({ type: "error", message: "Error updating warehouse" });
  } else {
    setNotification({
      type: "success",
      message: "warehouse quantity updated successfully",
    });
  }
}

export async function getItem(itemID, setNotification) {
  const data = {
    itemID: itemID,
  };
  const res = await perform("get", `/getitem?id=${itemID}`, data);
  if (res.status !== 200 && res.status !== 201) {
    setNotification({ type: "error", message: "Error retrieving item data" });
  } else {
    setNotification({
      type: "success",
      message: "Successfully retrieved item data",
    });
  }
}

export async function getItemBatch(itemBatchID, setNotification) {
  const data = {
    itemBatchID: itemBatchID,
  };

  const res = await perform("get", "/getitembatch", data);
  if (res.status !== 200 && res.status !== 201) {
    setNotification({
      type: "error",
      message: "Error retrieving item batch data",
    });
  } else {
    setNotification({
      type: "success",
      message: "Successfully retrieved item batch data",
    });
  }
}

export async function getWarehouses(setNotification, setWarehouses) {
  const res = await perform("get", "/getwarehouses");
  const warehouses = await res.json();
  if (res.status !== 200 && res.status !== 201) {
    setNotification({
      type: "error",
      message: "Error getting warehouses",
    });
  } else {
    setNotification({
      type: "success",
      message: "Successfully retrieved warehouses!",
    });
    setWarehouses(warehouses);
  }
}

export async function getItems(setNotification, setItems) {
  const res = await perform("get", "/getitems");
  const items = await res.json();
  if (res.status !== 200 && res.status !== 201) {
    setNotification({
      type: "error",
      message: "Error getting items",
    });
  } else {
    setNotification({
      type: "success",
      message: "Successfully retrieved items!",
    });
    setItems(items);
  }
}
