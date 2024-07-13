import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function EditProduct() {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8000/products/${id}`)
                .then(response => {
                    setProduct(response.data);
                    setName(response.data.name);
                    setType(response.data.type);
                    setPrice(response.data.price);
                    setDescription(response.data.description);
                })
                .catch(error => console.error('Error fetching data: ', error));
        }
    }, [id]);

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/products/${id}`, { name, type, price, description });
            alert('Product updated successfully');
            router.push('/');
        } catch (error) {
            console.error('Error updating product: ', error);
        }
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div className="container">
            <h1 className="my-4">Edit Product</h1>
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
                        <button type="submit" className="btn btn-success">Update</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
