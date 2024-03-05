import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Joi from "joi";
import axios from 'axios';

const Register = () => {

    const [loading, setLoading] = useState(false);      // loading state
    const [errors, setErrors] = useState({});           // joi errors
    const navigate = useNavigate();

    // Form validation
    const registerSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] }
        }).required(),
        password: Joi.string().min(3).max(12).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({ 'any.only': 'Passwords must match', })
    });

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    console.log("data", data);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error } = registerSchema.validate(data, { abortEarly: true });

        // getting the errors in valErr
        if (error) {
            const valErr = {};
            error.details.map((err) => {
                valErr[err.path[0]] = err.message;
            });
            console.log("Validation: ", valErr)
            setErrors(valErr);
            // console.log(valErr)
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/api/register", data);

            if (response.status === 200) {
                console.log("Data response is: ", response);
                alert(response.data.message)
                navigate("/login")
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
        <div className="container mt-5 w-50">
            <form className='w-50 p-4 shadow-lg border mx-auto' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={data.name} onChange={handleChange} />
                    <small className="text-danger">{errors.name}</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={data.email} onChange={handleChange} />
                    <small className="text-danger">{errors.email}</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={data.password} onChange={handleChange} />
                    <small className="text-danger">{errors.password}</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={data.confirmPassword} onChange={handleChange} />
                    <small className="text-danger">{errors.confirmPassword}</small>
                </div>
                <p>Already have an account?<span><NavLink to="/login" className="text-decoration-none"> Login</NavLink></span></p>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>{loading ? 'Loading...' : 'Register'}</button>
            </form>
        </div>
    );
};

export default Register;
