import { useEffect, useRef, useState } from "react"

import Navbar from "../../components/navbar/navbar"
import BreadCrumbs from "../../components/breadcrumbs/breadcrumbs"
import SearchBar from "../../components/searchbar/searchbar"
import ProductsSlide from "../../components/products-slide/products_slide"

import capitalize from "../../utils/capitalizeFirstLetter"

import useCategories from "../../customhooks/useCategories"

import getProducts from "../../services/product"

import './product-category.scss'

export function ProductCategory({ params: { category } }) {
    const [srchCriteria, setSrchCriteria] = useState('')
    const [pdts, setPdts] = useState([])
    const initialPdts = useRef()
    const categories = useCategories()

    useEffect(() => {
        if(!categories.length) return

        const {id: idCtg} = categories.find((ctg) => ctg.name === category)

        const fetchProducts = async () => {
            const products = await getProducts(idCtg)
            initialPdts.current = products
            setPdts(products)
        }

        fetchProducts()
    }, [categories, category])

    const filterPdts = () => {
        const regex = new RegExp(srchCriteria, 'i')
        const matches = initialPdts.current.filter(pdt => regex.test(pdt.name))
        setPdts(matches)
    }

    return (
        <div>
            <Navbar></Navbar>
            <BreadCrumbs routes={[{ name: category, route: `products/${category}` }]} />
            <SearchBar
                placeholder={'Nombre'}
                value={srchCriteria}
                onChange={txt => setSrchCriteria(txt)}
                onSubmit={filterPdts}
            />
            <ProductsSlide
                title={capitalize(category)}
                productsArray={pdts}
                vertical
            />
        </div>
    )
}