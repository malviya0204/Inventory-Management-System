# Inventory Management System

## 1. Project Description

The Inventory Management System is a backend application developed to manage products and inventory efficiently. It allows users to add, view, update and delete products, manage stock quantities and generate inventory reports.

## 2. Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JavaScript
- Thunder Client

## 3. Main Features

- Add new products
- View all products
- Search products
- Filter products by category
- Sort products
- Paginate product listings
- View individual product details
- Update product information
- Delete products
- Adjust stock quantities
- Generate low-stock reports
- Generate category summary reports

## 4. Project Structure

```text
Inventory-Management-System/
│
├── src/
│   ├── models/
│   │   └── Product.js
│   ├── routes/
│   │   └── productRoutes.js
│   └── middleware/
│
├── server.js
├── package.json
├── package-lock.json
├── .env
└── README.md
```

## 5. Installation

1. Install Node.js.
2. Open the project folder in VS Code.
3. Open the terminal.
4. Install dependencies:

```bash
npm install
```

5. Configure the MongoDB connection in the `.env` file.

## 6. Running the Application

Run the following command:

```bash
node server.js
```

The server runs on port 5000 by default.

## 7. API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/products | Add a product |
| GET | /api/products | View products |
| GET | /api/products/:id | View one product |
| PUT | /api/products/:id | Update a product |
| DELETE | /api/products/:id | Delete a product |
| PATCH | /api/products/:id/stock | Adjust stock |
| GET | /api/products/reports/low-stock | Low-stock report |
| GET | /api/products/reports/category-summary | Category summary |

## 8. API Testing

The API endpoints were tested using Thunder Client in Visual Studio Code.

Testing included product creation, retrieval, updating, deletion, stock adjustment, searching, filtering, sorting, pagination and inventory reports.

## 9. Conclusion

The Inventory Management System provides a simple backend solution for managing products and stock. It uses Node.js, Express.js and MongoDB to perform inventory management operations.

## API Testing Screenshots (Postman)
![alt text](<- 07-postman-category-summary.png>) ![alt text](01-postman-product-list.png) ![alt text](02-postman-product-creation.png) ![alt text](03-postman-product-update.png) ![alt text](04-postman-stock-update.png) ![alt text](05-postman-delete-product.png) ![alt text](06-postman-low-stock-report.png)