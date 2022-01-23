# Inventory Express

### A lightweight inventory management tool
# [Demo](https://main.d3bjqfdm8plgib.amplifyapp.com/)

Some CSS properties are missing when the app is built and deployed (demo above), for full features, install locally using the instructions below.

![Logo](https://inventory-express.s3.us-east-2.amazonaws.com/Screen+Shot+2022-01-22+at+5.56.34+PM.png)





## Some Context

The logic of the app operates over 3 categories of data

![DataTypes](https://inventory-express.s3.us-east-2.amazonaws.com/Screen+Shot+2022-01-22+at+6.40.11+PM.png)


| `ItemBatch`|    `Warehouse`              |      `Item`                 |
| :-------- | :------------------------- | :------------------------- |
| An event describing a new shipment of `ItemId` with `batchQuantity` to `warehouseId` | Contains a key:value table of `itemId`:`quanity` that represents the current inventory at the warehouse  |  Contains a set of `warehouseId`s at which the item exists |

The App consists of 3 viewer windows (screenshot above):
1. Global Inventory: Displays the global quantity of an item at all warehouses. 
2. Warehouses With Item In Stock: Lists all the warehouses that contain the selected item in stock
3. Item Batches: Lists all inbound shipments to warehouses for the selected item. 
   If no item is selected, this window shows the shipments log for all items


## Features

* Under Warehouses window, Create warehouses
* Add item batches by specifying the name, batch quantity and the warehouse at which you'd like to deposit the batch
* When adding multiple item batches with the same name, the global quantity of the item is incremented by the size the item batch added
* Decrease item quantity by clicking on the edit button of the warehouse where you'd like to remove items from
* All data is maintained is session storage

![DataFlow](https://inventory-express.s3.us-east-2.amazonaws.com/Screen+Shot+2022-01-22+at+6.45.57+PM.png)


## Nice to have but didn't have time for

* There are some props drilling throughout the app which could have been simplified with a redux store implementation.
* Jest unit tests
* The app uses Material UI, some MUI styling is not applied when app is deployed to server so run locally for best experience.



## Usage

* Demo: [here](https://main.d3bjqfdm8plgib.amplifyapp.com/)
* Or locally by cloning the repo and running `cd inventory-express && npm i && npm start`



## Wanna Chat?

Email: labwani.com@gmail.com

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://www.labwani.com/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/abdulnaser-allabwani/)

## License

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
