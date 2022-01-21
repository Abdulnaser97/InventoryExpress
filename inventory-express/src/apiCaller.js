// export async function updateItemQuantityInAWarehouse(
//   warehouseID,
//   itemID,
//   newQuantity,
//   setNotification
// ) {
//   const data = {
//     warehouseID: warehouseID,
//     itemID: itemID,
//     newQuantity: newQuantity,
//   };
//   const token = sessionStorage.getItem("access_token");
//   if (!token) {
//     setNotification({
//       type: "error",
//       message: "no access token, please refresh",
//     });
//     return;
//   }
//   const res = await perform("post", "/updatewarehouse", data);
//   if (res.status !== 200 && res.status !== 201) {
//     setNotification({ type: "error", message: "Error updating warehouse" });
//   } else {
//     setNotification({
//       type: "success",
//       message: "warehouse quantity updated successfully",
//     });
//   }
// }

// export async function getItem(itemID, setNotification) {
//   const token = sessionStorage.getItem("access_token");
//   if (!token) {
//     setNotification({
//       type: "error",
//       message: "no access token, please refresh",
//     });
//     return;
//   }
//   const data = {
//     itemID: itemID,
//   };
//   const res = await perform("get", `/getitem?id=${itemID}`, data);
//   if (res.status !== 200 && res.status !== 201) {
//     setNotification({ type: "error", message: "Error retrieving item data" });
//   } else {
//     setNotification({
//       type: "success",
//       message: "Successfully retrieved item data",
//     });
//   }
// }

// export async function getItemBatch(itemBatchID, setNotification) {
//   const token = sessionStorage.getItem("access_token");
//   if (!token) {
//     setNotification({
//       type: "error",
//       message: "no access token, please refresh",
//     });
//     return;
//   }
//   const data = {
//     itemBatchID: itemBatchID,
//   };

//   const res = await perform("get", "/getitembatch", data);
//   if (res.status !== 200 && res.status !== 201) {
//     setNotification({
//       type: "error",
//       message: "Error retrieving item batch data",
//     });
//   } else {
//     setNotification({
//       type: "success",
//       message: "Successfully retrieved item batch data",
//     });
//   }
// }

// export async function getWarehouses(setNotification, setWarehouses) {
//   const token = sessionStorage.getItem("access_token");
//   if (!token) {
//     setNotification({
//       type: "error",
//       message: "no access token, please refresh",
//     });
//     return;
//   }
//   const res = await perform("get", "/getwarehouses");
//   const warehouses = await res.json();
//   if (res.status !== 200 && res.status !== 201) {
//     setNotification({
//       type: "error",
//       message: "Error getting warehouses",
//     });
//   } else {
//     setNotification({
//       type: "success",
//       message: "Successfully retrieved warehouses!",
//     });
//     setWarehouses(warehouses);
//   }
// }

// export async function getItems(setNotification, setItems) {
//   const token = sessionStorage.getItem("access_token");
//   if (!token) {
//     setNotification({
//       type: "error",
//       message: "no access token, please refresh",
//     });
//     return;
//   }
//   const res = await perform("get", "/getitems");
//   const items = await res.json();
//   if (res.status !== 200 && res.status !== 201) {
//     setNotification({
//       type: "error",
//       message: "Error getting items",
//     });
//   } else {
//     setNotification({
//       type: "success",
//       message: "Successfully retrieved items!",
//     });
//     setItems(items);
//   }
// }

// export async function login(setNotification) {
//   const res = await perform("get", "/login");
//   const { token } = await await res.json();
//   if ((res.status !== 200 && res.status !== 201) || !token) {
//     setNotification({
//       type: "error",
//       message: "Error retrieving session key",
//     });
//   } else {
//     setNotification({
//       type: "success",
//       message: "Successfully retrieved session key!",
//     });
//     return token;
//   }
// }
