# Tea-Products-FastAPI-NEXT.js

# Tea Products Management

This project is a simple web application for managing tea products. It includes a backend API built with FastAPI and a frontend built with Next.js. Users can perform CRUD (Create, Read, Update, Delete) operations on tea products.

## Project Overview

The application allows users to:
- View a list of all tea products.
- View details of a single tea product.
- Create a new tea product.
- Edit an existing tea product.
- Delete a tea product.
- Search for tea products by name or type.
- Paginate through the list of tea products.

## Technologies Used

- **Backend**: FastAPI, SQLAlchemy, SQLite
- **Frontend**: Next.js, React, Axios, Bootstrap

## Requirements

- Python 3.7+
- Node.js 14+

## Setup Instructions

### Backend (FastAPI)

1. **Clone the Repository**

   ```bash
   git clone https://github.com/MalindaGamage/Tea-Products-FastAPI-NEXT.js.git
   cd Tea-Products-FastAPI-NEXT.js
   ```

2. **Navigate to Backend Directory**

   ```bash
   cd tea-products-backend
   ```

3. **Create a Virtual Environment**

   ```bash
   python -m venv env
   source env/bin/activate  # On Windows use `env\Scripts\activate`
   ```

4. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

5. **Run the FastAPI Server**

   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

   The backend server will start at `http://localhost:8000`.

### Frontend (Next.js)

1. **Navigate to Frontend Directory**

   ```bash
   cd ../tea-products-frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Next.js Development Server**

   ```bash
   npm run dev
   ```

   The frontend server will start at `http://localhost:3000`.

## Project Structure

### Backend

- `app/main.py`: Main application file where the FastAPI instance and routes are defined.
- `app/models.py`: SQLAlchemy models for the database.
- `app/schemas.py`: Pydantic schemas for request and response validation.
- `app/crud.py`: CRUD operations for the database.
- `app/database.py`: Database setup and dependency.

### Frontend

- `pages/index.js`: Displays a list of all tea products.
- `pages/products/[id].js`: Displays details of a single tea product.
- `pages/products/create.js`: Form to create a new tea product.
- `pages/products/edit/[id].js`: Form to edit an existing tea product.
- `components/Search.js`: Component for searching tea products by name or type.
- `components/Pagination.js`: Component for paginating the list of tea products.

## Features

- **CRUD Operations**: Create, Read, Update, Delete tea products.
- **Search**: Filter tea products by name or type.
- **Pagination**: Navigate through multiple pages of tea products.
- **Responsive Design**: Basic styling using Bootstrap.

## Usage

1. **Create Product**
   - Navigate to the "Create New Product" page.
   - Fill in the product details and click "Create".

2. **Edit Product**
   - Navigate to the product details page.
   - Click "Edit" and modify the product details.
   - Click "Update Product".

3. **Delete Product**
   - Navigate to the product details page.
   - Click "Delete" to remove the product.

4. **Search Product**
   - Use the search bar on the homepage to filter products by name or type.

5. **Pagination**
   - Use the pagination controls at the bottom of the homepage to navigate through multiple pages of products.

## Unit Tests

To run unit tests for the backend and frontend:

### Backend

```bash
cd tea-products-backend
pytest
```

### Frontend

```bash
cd tea-products-frontend
npm test
```

## License

This project is licensed under the MIT License.
