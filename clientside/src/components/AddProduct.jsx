import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Joi from "joi";
import Cookie from "js-cookie"
import axios from 'axios';

const AddProduct = () => {

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [data, setData] = useState({
        title: "",
        category: "",
        price: "",
        description: ""
    });

    // authentication using jwt token
    const token = Cookie.get("token")
    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
    }, [])

    const productSchema = Joi.object({
        title: Joi.string().required(),
        category: Joi.string().required(),
        price: Joi.string().required(),
        description: Joi.string().required()
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    console.log("data", data);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error } = productSchema.validate(data, { abortEarly: true });

        if (error) {
            const valErr = {};
            error.details.forEach((err) => {
                valErr[err.path[0]] = err.message;
            });
            console.log("Validation: ", valErr)
            setErrors(valErr);
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/api/products/add", data);
            console.log("Response data is: ", response.data)
            if (response.status === 201) {
                alert("Product created successfully");
                navigate('/dashboard');
            } else {
                console.log("Error creating products");
            }
        } catch (error) {
            console.error("Error during fetch operation:", error);
            alert("Product already exists")
        }

        setLoading(false);
        setErrors({});
    };

    return (
        <div className="container mt-5 w-50">
            <form className='w-50 mx-auto p-4 shadow-lg border' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={data.title} onChange={handleChange} />
                    <small className="text-danger">{errors.title}</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <input type="text" className="form-control" id="category" name="category" value={data.category} onChange={handleChange} />
                    <small className="text-danger">{errors.category}</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" className="form-control" id="price" name="price" value={data.price} onChange={handleChange} />
                    <small className="text-danger">{errors.price}</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea id="description" className="form-control" rows={6} cols={20} name="description" value={data.description} onChange={handleChange} ></textarea>
                    <small className="text-danger">{errors.description}</small>
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>{loading ? 'Loading...' : 'Add Product'}</button>
            </form>
        </div>
    );
};

export default AddProduct;
