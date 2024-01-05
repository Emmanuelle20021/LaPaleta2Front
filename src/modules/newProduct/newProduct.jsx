import { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa6";
import './newProduct.scss'
import Navbar from '../../components/navbar/navbar.jsx'
import BreadCrumps from '../../components/breadcrumbs/breadcrumbs.jsx'
import getCategories from '../../services/categories.js';
import { getSubcategories } from '../../services/subcategories.js';
import { addProduct } from '../../services/product.js';

export function NewProduct() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState(0)
    const [subcategory, setSubcategory] = useState(0)
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)

    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await getCategories();
            setCategories(categories)
        }
        const fetchSubcategories = async () => {
            const subcategories = await getSubcategories();
            setSubcategories(subcategories)
        }
        fetchCategories()
        fetchSubcategories()
    }, [])

    const handleForm = async (event) => {
        event.preventDefault()
        const $selecC = document.querySelector('#category-input-add')
        const $selecS = document.querySelector('#subcategory-input-add')

        setCategory($selecC.options[$selecC.selectedIndex].value)
        setSubcategory($selecS.options[$selecS.selectedIndex].value)

        if(category == 0 || subcategory == 0) return;

        const response = await addProduct(title,description,category,subcategory,price,file)

        return response
    }

    const imageChange = () => {

        const $selecFiles = document.querySelector('#input-upload-image')
        const $imagePreview = document.querySelector('#image-upload-preview')
    
        const files = $selecFiles.files
        if (!files || !files.length) {
            $imagePreview.src = 'https://placehold.co/600x400?text=No+hay+imagen';
            return null;
        }
    
        const firstFile = files[0];
    
        const objectUrl = URL.createObjectURL(firstFile)
    
        $imagePreview.src = objectUrl;
        setFile(firstFile);
    }

    return (
        <div className='page'>
            <nav className='nav-container'>
                <Navbar></Navbar>
            </nav>
            <section className='add-product-page'>
                <h1 className='title'>Añadir producto</h1>
                <BreadCrumps routes={[{ name: 'Producto', route: 'products/' }, { name: 'Nuevo', route: 'products/new' }]}></BreadCrumps>
                <form onSubmit={handleForm} className='adding-product-container' encType='multipart/formdata'>
                    <div className='img-container'>
                        <img src="https://placehold.co/600x400?text=No+hay+imagen" alt="imagen del producto" id='image-upload-preview' />
                        <button type="button" onClick={upload} className='add-button'>
                            <FaPlus></FaPlus>
                        </button>
                        <input type="file" onChange={imageChange} required accept='.png,.jpg,.gif,.jpeg' className='input-upload-image' id='input-upload-image' name='input-upload-image' />
                    </div>
                    <div className='form-fields'>
                        <label htmlFor="title-input-add">Titulo:</label>
                        <input value={title} onChange={({ target }) => setTitle(target.value)} required id="title-input-add" name="title-input" placeholder="Titulo" type="text" />
                        <label htmlFor="description-input-add">Descripción:</label>
                        <textarea value={description} onChange={({ target }) => setDescription(target.value)} required id="description-input-add" name="description-input" placeholder="Descripción" type="text"></textarea>
                        <label htmlFor="category-input-add">Categoría:</label>
                        <select value={category} onChange={({ target }) => setCategory(target.value)} required id="category-input-add" name="category-input" placeholder="Categoria" type="text">
                            <option value="0">--Seleccionar--</option>
                            {
                                Categories(categories)
                            }
                        </select>
                        <label htmlFor="subcategory-input-add">Subcategoría:</label>
                        <select onChange={({ target }) => setSubcategory(target[target.selectedIndex].value)} required id="subcategory-input-add" name="subcategory-input" placeholder="Subcategoria" type="text">
                            <option value="0">--Seleccionar--</option>
                            {
                                Subcategories(subcategories)
                            }
                        </select>
                        <label htmlFor="price-input-add">Precio:</label>
                        <input className="price-input-add" value={price} onChange={({ target }) => setPrice(target.value)} required id="price-input-add" name="price-input" placeholder="Precio" type="number" />
                        <button type="submit" className='form-submit-button'>Agregar</button>
                    </div>
                </form>
            </section>
        </div>
    )
}

const upload = () => {

    const $selecFiles = document.querySelector('#input-upload-image')

    $selecFiles.click();

}

function Categories(categories) {
    let options = []
    categories.forEach((element) => {
        options.push(<option value={element.id} id={'option-' + element.id} key={'option-' + element.id}>{element.name}</option>)
    })
    return (options)
}

function Subcategories(subcategories) {
    let options = []
    subcategories.forEach((element) => {
        options.push(<option value={element.idsubcategoria} id={'option-subcategory-' + element.idsubcategoria} key={'option-subcategory-' + element.idsubcategoria}>{element.nombre}</option>)
    })
    return (options)
}