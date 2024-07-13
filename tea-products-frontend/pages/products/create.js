import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CreateProduct() {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = {
            name,
            type,
            price: parseFloat(price),
            description
        };

        try {
            const response = await axios.post('http://localhost:8000/products/', payload);
            alert('Product created successfully');
            window.location.href = '/';
        } catch (error) {
            console.error('Error creating product:', error.response?.data || error.message); 
            alert('Error creating product, please check console for details');
        }
    };

    return (
        <div className="container">
            <h1 className="my-4">Create New Product</h1>
            <form onSubmit={handleSubmit} className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="name" className="col-sm-2 control-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="type" className="col-sm-2 control-label">Type</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="type" value={type} onChange={(e) => setType(e.target.value)} required />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="price" className="col-sm-2 control-label">Price</label>
                    <div className="col-sm-10">
                        <input type="number" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="description" className="col-sm-2 control-label">Description</label>
                    <div className="col-sm-10">
                        <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" className="btn btn-success">Create</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
