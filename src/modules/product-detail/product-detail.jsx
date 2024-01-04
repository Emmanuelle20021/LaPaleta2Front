import { useContext, useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { MdOutlineKitchen } from "react-icons/md";

import BreadCrumbs from "../../components/breadcrumbs/breadcrumbs";
import Navbar from "../../components/navbar/navbar";
import ProductsSlide from "../../components/products-slide/products_slide";

import useCategories from "../../customhooks/useCategories";
import useFridge from "../../customhooks/useFridgeContext";

import getProducts from "../../services/product";

import { API_ASSETS } from "../../constants/properties";

import './product-detail.scss'
import { AuthContext } from "../../contexts/auth";
import swal from "sweetalert";
import { navigate } from "wouter/use-location";

export function ProductDetail({ params: { category, idProduct } }) {

    const [pdts, setPdts] = useState([])
    const [currentPdt, setCurrentPdt] = useState(null)
    const [amount, setAmount] = useState(1)

    const categories = useCategories()
    const { showFridge, addProduct } = useFridge()
    const { token } = useContext(AuthContext)

    useEffect(() => {
        if (!categories.length) return

        const { id: idCtg } = categories.find((ctg) => ctg.name === category)

        const fetchProducts = async () => {
            const products = await getProducts(idCtg)

            const currentPdt = products.find((pdt) => pdt.id === Number(idProduct))
            const others = products.filter(pdt => pdt.id !== Number(idProduct))

            setCurrentPdt(currentPdt)
            setPdts(others)
        }

        fetchProducts()
    }, [categories, category, idProduct])

    const handleMinus = () => {
        if (amount - 1 === 0) return
        setAmount(prevAmount => --prevAmount)
    }

    const handlePlus = () => {
        setAmount(prevAmount => ++prevAmount)
    }

    const addToFridge = async () => {
        if (!token) {
            const goToLogin = await swal({
                title: "Alto",
                text: "Necesita iniciar sesión",
                className: "warning",
                buttons: ['Cancelar', 'Ir']
            })

            if (goToLogin) navigate('/login', { replace: true })

            return
        }

        addProduct(currentPdt, amount)
        showFridge()
    }

    return (
        <div>
            <Navbar></Navbar>
            <h2 className="product-detail-title"> Detalle del producto</h2>
            <BreadCrumbs routes={[{ name: category, route: `products/${category}` }, { name: `#${idProduct}`, route: idProduct }]} />

            <div className="product-detail-container">
                <div className="img-pdt-deail-container">
                    <img
                        className="img-pdt-detail"
                        src={`${API_ASSETS + currentPdt?.img}`}
                        alt={currentPdt?.name}
                    />
                </div>
                <div className="dcpt-pdt">
                    <section className="dcpt-pdt-detail">
                        <h3 className="dcpt-pdt-detail-title" >{currentPdt?.name}</h3>
                        <p className="dcpt-pdt-detail-text">{currentPdt?.description}</p>
                        <p className="dcpt-pdt-detail-price">{currentPdt?.price}</p>
                    </section>
                    <section className="manage-fridge">
                        <p>Cantidad:</p>
                        <div className="manage-amount">
                            <button onClick={handleMinus} className="manage-fridge-btn minus"> <FaMinus size={16} /> </button>
                            <p>{amount}</p>
                            <button onClick={handlePlus} className="manage-fridge-btn plus"> <FaPlus /> </button>
                        </div>
                        <button className="add-fridge" onClick={addToFridge}>
                            <MdOutlineKitchen size={24} className="add-fridge-icon" />
                            Agregar a la nevera
                        </button>
                    </section>
                </div>
            </div>

            <ProductsSlide title={'Productos relacionados'} productsArray={pdts} />
        </div>
    )
}