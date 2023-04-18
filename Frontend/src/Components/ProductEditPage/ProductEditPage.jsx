import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { editProductCancel, editProductRedux, storeImageInServer } from '../../store/admin-actions';
import './ProductEditPage.scss'
import api from '../api';
const ProductEditPage = (props) => {
    const product = useSelector((state) =>
        state.product.products.find((prod) => prod._id === props.data)
    );
    const dispatch = useDispatch()
    const [name, setName] = useState(product.name);
    const [breed, setBreed] = useState(product.breed);
    const [description, setDescription] = useState(product.description);
    const [age, setAge] = useState(product.age);
    const [category, setCategory] = useState(product.category);
    const [file, setFile] = useState('');
    const onChange = e => {
        setFile(e.target.files[0]);
    };
    const editProduct = async () => {
        const formData = new FormData();
        formData.append('myImage', file);
        dispatch(editProductRedux(product._id, file.name, name, breed, description, age, category))
        dispatch(storeImageInServer(formData))
        window.location.reload(true)

    }
    const editCancel = async () => {
        dispatch(editProductCancel())
    }
    return (
        <div className='editForm'>
            <form onSubmit={editProduct}>
                <input type='file' className='inputField' name='myImage' onChange={onChange} />
                <input type='text' className='inputField' name='name' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required={true} />
                <input type='text' className='inputField' name='breed' placeholder='Breed' value={breed} onChange={(e) => setBreed(e.target.value)} required={true} />
                <input type='text' className='inputField' name='description' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} required={true} />
                <input type='text' className='inputField' name='age' placeholder='Age' value={age} onChange={(e) => setAge(e.target.value)} required={true} />
                <input type='text' className='inputField' name='category' placeholder='Category' value={category} onChange={(e) => setCategory(e.target.value)} required={true} />
                <button type='submit'>Update</button>
                <button onClick={editCancel}>Cancel</button>
            </form>
        </div>
    )
}

export default ProductEditPage
