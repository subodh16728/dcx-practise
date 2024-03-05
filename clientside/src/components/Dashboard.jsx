import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import "bootstrap/dist/css/bootstrap.min.css"
import { fetchProducts } from '../store/slice/getProductsSlice'
import { useDispatch, useSelector } from 'react-redux'
import $ from 'jquery';
import 'tablesorter';

const Dashboard = () => {
    const [search, setSearch] = useState('')

    useEffect(() => {
        $("#sort-table").tablesorter();
    })


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    const data = useSelector((state) => (
        state.api.data
    ))

    // console.log(data)
    // console.log(search);

    const handleChange = (event) => {
        setSearch(event.target.value)
    }

    return (
        <>

            <div className="container mt-5">
                <Container>
                    <Form>
                        <InputGroup className='my-3'>
                            <Form.Control onChange={handleChange} placeholder='Search products' className='me-1' />
                            <Button variant="secondary"><NavLink className="nav-link active" to="/addproduct">Add Product</NavLink></Button>
                        </InputGroup>
                    </Form>
                    <table id='sort-table' class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Category</th>
                                <th scope="col">Price</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                data && data.filter((item) => {
                                    return search.toLowerCase() === "" ? item : item.category.toLowerCase().includes(search)
                                }).map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>{item.category}</td>
                                        <td>{item.price}</td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </Container>
            </div>

        </>
    )
}

export default Dashboard