import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from '../Navbar/Navbar'
import { deleteImageFromServer, deleteProductRedux, deleteUserRedux, editProductStart, getUsers, storeImageInServer } from '../../store/admin-actions';
import { useNavigate } from 'react-router-dom';
import './AdminPage.scss'
import { addProduct, fetchProduct } from '../../store/admin-actions';
import { logoutFunc } from '../../store/auth-actions';
import api from '../api';
import ProductEditPage from '../ProductEditPage/ProductEditPage';
const AdminPage = () => {
    const navigate = useNavigate()
    const [file, setFile] = useState('');
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [description, setDescription] = useState('');
    const [age, setAge] = useState('');
    const [category, setCategory] = useState('');
    const users = useSelector((state) => state.admin.users)
    const products = useSelector((state) => state.product.products)
    const editProductForm = useSelector((state) => state.admin.editProductForm)
    const [editId, setEditId] = useState(null)
    const dispatch = useDispatch()
    const onChange = e => {
        setFile(e.target.files[0]);
    };
    const addProd = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('myImage', file);
        dispatch(storeImageInServer(formData))
        dispatch(addProduct(file.name, name, breed, description, age, category))
        window.location.reload(true)
    };
    const handleLogout = async () => {
        dispatch(logoutFunc())
        navigate('/')
    }
    useEffect(() => {
        dispatch(fetchProduct())
    }, [])
    useEffect(() => {
        dispatch(getUsers());
    }, [])
    const deleteUser = async (id) => {
        window.location.reload(true)
        dispatch(deleteUserRedux(id))
    }
    const deleteProduct = async (prodID, img) => {
        window.location.reload(true)
        dispatch(deleteProductRedux(prodID))
        dispatch(deleteImageFromServer(img))
    }
    const editProduct = async (prodID) => {
        setEditId(prodID)
        dispatch(editProductStart())
    }



    // HERE Code TO Display Products on Table Function
    // Also try to make separate component of both user and product table
    return (
        <div className='main'>
            <Navbar onFireLogout={handleLogout} />
            <div className="body">
                <div className="info">
                    <h1>ADMIN PANEL</h1>
                    <p>Permissions : CRUD on Products and get a list of all the users</p>
                </div>
                <div className="ops">

                    <div className="left">
                        <form onSubmit={addProd}>
                            <input type='file' className='inputField' name='myImage' onChange={onChange} />
                            <input type='text' className='inputField' name='name' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required={true} />
                            <input type='text' className='inputField' name='breed' placeholder='Breed' value={breed} onChange={(e) => setBreed(e.target.value)} required={true} />
                            <input type='text' className='inputField' name='description' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} required={true} />
                            <input type='text' className='inputField' name='age' placeholder='Age' value={age} onChange={(e) => setAge(e.target.value)} required={true} />
                            <input type='text' className='inputField' name='category' placeholder='Category' value={category} onChange={(e) => setCategory(e.target.value)} required={true} />
                            <button type='submit'>Add to DB!</button>
                        </form>
                        {/* <button onClick={addProd}>ADD</button> */}
                        {/* {JSON.stringify(products)} */}
                        <p>PRODUCTS</p>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Breed</th>
                                    <th>Description</th>
                                    <th>Age</th>
                                    <th>Category</th>
                                    <th>Edit/Delete</th>

                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={product._id}>
                                        <td>{index + 1}</td>
                                        <td><img src={`http://localhost:4000/uploads/${product.image}`} style={{ width: '50%' }} /></td>
                                        <td>{product.name}</td>
                                        <td>{product.breed}</td>
                                        <td>{product.description}</td>
                                        <td>{product.age}</td>
                                        <td>{product.category}</td>
                                        <td>
                                            <button onClick={() => editProduct(product._id)}>Edit</button>
                                            <button onClick={() => deleteProduct(product._id, product.image)}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {editProductForm && editId ?
                            <ProductEditPage data={editId} /> : ""}
                    </div>
                    <div className="right">
                        <p>USERS</p>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Is Admin</th>
                                    <th>ID</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user._id}>
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                                        <td>{user._id}</td>
                                        <td><button onClick={() => deleteUser(user._id)}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AdminPage


