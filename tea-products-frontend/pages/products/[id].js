import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function EditProduct() {
    const router = useRouter();
    const { id } = router.query;
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8000/products/${id}`)
                .then(response => {
                    const product = response.data;
                    setName(product.name);
                    setType(product.type);
                    setPrice(product.price);
                    setDescription(product.description);
                })
                .catch(error => {
                    console.error('Error fetching product data: ', error);
                    alert('Error fetching product data, please check console for details');
                });
        }
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8000/products/${id}`, {
            name,
            type,
            price: parseFloat(price),
            description
        })
        .then(() => {
            alert('Product updated successfully');
            window.location.href = '/';
        })
        .catch(error => {
            console.error('Error updating product: ', error);
            alert('Error updating product, please check console for details');
        });
    };

    return (
        <div className="container">
            <h1 className="my-4">Edit Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Type</label>
                    <input type="text" className="form-control" value={type} onChange={(e) => setType(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <button type="submit" className="btn btn-success mt-3">Update</button>
            </form>
        </div>
    );
}
