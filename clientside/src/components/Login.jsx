import React from 'react'
import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from "axios";
import Joi from "joi";
import Cookie from "js-cookie"

const Login = () => {

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    // Form validation
    const loginSchema = Joi.object({
        email: Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] }
        }).required(),
        password: Joi.string().min(3).max(12).required()
    });

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    console.log("data", data)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error } = loginSchema.validate(data, { abortEarly: true });

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
            const response = await axios.post("http://localhost:5000/api/login", data);
            if (response.status === 200) {
                console.log("Data response is: ", response);
                const dataResponse = await response.data
                Cookie.set('token', dataResponse.token);
                navigate('/dashboard');
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error("Error during login operation:", error);
            const message = error.response.data.message
            alert(message);
        }

        setLoading(false);
        setErrors({});
    };

    return (

        <>
            <div className="container mt-5 w-50">
                <form className='w-50 mx-auto p-4 shadow-lg border' onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={data.email} onChange={handleChange} />
                        <small className="text-danger">{errors.email}</small>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" name='password' value={data.password} onChange={handleChange} />
                        <small className="text-danger">{errors.password}</small>
                    </div>
                    <p>New User?<span><NavLink to="/register" className="text-decoration-none"> Register</NavLink></span></p>
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
                </form>
            </div>

        </>
    )
}

export default Login