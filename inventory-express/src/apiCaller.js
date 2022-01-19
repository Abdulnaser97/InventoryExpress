const BASE_URI = "http://localhost:8080/";
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

    if (res.status !== 200) {
      throw new Error(`Error calling resource ${BASE_URI}${resource}`);
    }
    res = await res.json();
    return res;
  } catch (e) {
    console.log(e);
  }
}

export async function addWarehouse(address, location) {
  const data = {
    location: location,
    address: address,
  };
  return await perform("post", "/addwarehouse", data);
}

export async function addItemBatch(warehouseID, itemName, newQuantity) {
  const data = {
    warehouseID: warehouseID,
    itemName: itemName,
    newQuantity: newQuantity,
  };
  return await perform("post", "/additembatch", data);
}

export async function updateWarehouseItemQuantiy(
  warehouseID,
  itemID,
  newQuantity
) {
  const data = {
    warehouseID: warehouseID,
    itemID: itemID,
    newQuantity: newQuantity,
  };

  return await perform("post", "/updatewarehouse", data);
}
