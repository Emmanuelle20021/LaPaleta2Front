import { useEffect, useRef, useState } from "react"
import { FaBacon, FaBlender, FaBottleDroplet, FaBottleWater, FaBowlFood, FaCandyCane, FaCubesStacked, FaIceCream, FaMugHot } from "react-icons/fa6"
import { MdBakeryDining, MdLunchDining } from "react-icons/md"

import Navbar from "../../components/navbar/navbar"
import BreadCrumbs from "../../components/breadcrumbs/breadcrumbs"
import SearchBar from "../../components/searchbar/searchbar"
import ProductsSlide from "../../components/products-slide/products_slide"

import capitalize from "../../utils/capitalizeFirstLetter"

import useCategories from "../../customhooks/useCategories"

import getProducts from "../../services/product"

import './product-category.scss'

const sizeIcon = 40

export function ProductCategory({ params: { category } }) {
    const [srchCriteria, setSrchCriteria] = useState('')
    const [pdts, setPdts] = useState([])
    const initialPdts = useRef()
    const categories = useCategories()
    const [currentCtg, setCurrentCtg] = useState(null)

    useEffect(() => {
        if (!categories.length) return

        const ctg = categories.find((ctg) => ctg.name === category)
        setCurrentCtg(ctg)

        const fetchProducts = async () => {
            const products = await getProducts(ctg.id)
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

    const handleSubctgFilter = (id) => () => {
        const matches = initialPdts.current.filter(pdt => pdt.subcategory === id)
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
            <div className="subctgs">
                {currentCtg?.subctgs.map(subctg =>
                    <button onClick={handleSubctgFilter(subctg.idsubcategoria)}>
                        {(subctg.idsubcategoria === 1 ? <FaBottleDroplet size={sizeIcon} /> : null)}
                        {(subctg.idsubcategoria === 2 ? <FaBottleWater size={sizeIcon} /> : null)}
                        {(subctg.idsubcategoria === 3 ? <FaBowlFood size={sizeIcon} /> : null)}
                        {(subctg.idsubcategoria === 4 ? <FaBacon size={sizeIcon} /> : null)}
                        {(subctg.idsubcategoria === 5 ? <FaCandyCane size={sizeIcon} /> : null)}
                        {(subctg.idsubcategoria === 6 ? <FaIceCream size={sizeIcon} /> : null)}
                        {(subctg.idsubcategoria === 7 ? <MdBakeryDining size={sizeIcon} /> : null)}
                        {(subctg.idsubcategoria === 8 ? <MdLunchDining size={sizeIcon} /> : null)}
                        {(subctg.idsubcategoria === 9 ? <FaMugHot size={sizeIcon} /> : null)}
                        {(subctg.idsubcategoria === 10 ? <FaCubesStacked size={sizeIcon} /> : null)}
                        {(subctg.idsubcategoria === 11 ? <FaBlender size={sizeIcon} /> : null)}
                        {(subctg.idsubcategoria === 12 ? <FaBlender size={sizeIcon} /> : null)}
                        {subctg.nombre}
                    </button>
                )}
            </div>
            <ProductsSlide
                title={capitalize(category)}
                productsArray={pdts}
                vertical
            />
        </div>
    )
}