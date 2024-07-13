import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from '../components/Search';
import Pagination from '../components/Pagination';
import './Home.css';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const productsPerPage = 10;

    useEffect(() => {
        fetchProducts(currentPage, searchQuery);
    }, [currentPage, searchQuery]);

    const fetchProducts = async (page, query) => {
        const skip = (page - 1) * productsPerPage;
        try {
            const response = await axios.get(`http://localhost:8000/products?skip=${skip}&limit=${productsPerPage}&search=${query}`);
            setProducts(response.data);
            setTotalProducts(parseInt(response.headers['x-total-count'] || 0));
        } catch (error) {
            console.error('Error fetching data: ', error);
            alert('Error fetching data, please check console for details');
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/products/${id}`);
            fetchProducts(currentPage, searchQuery); // Refresh the product list after deletion
        } catch (error) {
            console.error('Error deleting product: ', error);
            alert('Error deleting product, please check console for details');
        }
    };

    return (
        <div className="container">
            <h1 className="my-4">Tea Products</h1>
            <Search onSearch={handleSearch} />
            <div className="mb-4">
                <button className="btn btn-primary" onClick={() => window.location.href = '/products/create'}>Create New Product</button>
            </div>
            <div className="list-group mb-4">
                {products.map(product => (
                    <div key={product.id} className="list-group-item">
                        <h5>{product.name} - ${product.price}</h5>
                        <p>{product.description}</p>
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-info" onClick={() => window.location.href = `/products/edit/${product.id}`}>Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
}
