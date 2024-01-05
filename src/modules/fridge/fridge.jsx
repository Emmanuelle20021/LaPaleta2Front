import { useContext } from "react";
import swal from "sweetalert";

import BreadCrumbs from "../../components/breadcrumbs/breadcrumbs";
import FridgeClose from "../../components/fridge-close/fridge-close";
import FridgeItem from "../../components/fridge-item/fridgeItem";
import Navbar from "../../components/navbar/navbar";
import Title from "../../components/order-title/title";
import ToOrder from "../../components/order-to-order/to-order";

import ValidationError from "../../utils/ValidationError";

import useFridge from "../../customhooks/useFridgeContext";

import { addOrderDetail, makeOrder } from "../../services/orders";

import { AuthContext } from "../../contexts/auth";

import "./fridge.scss"
import { navigate } from "wouter/use-location";

export function Fridge() {

    const { token, cleanToken } = useContext(AuthContext)
    const { reduceProduct, addProduct, products, removeAllProducts } = useFridge()
    const total = products.length && products.reduce((total, pdt) => total + pdt.amount * pdt.price, 0)

    const goToLogin = async () => {
        await swal({
            title: "Alto",
            text: "Su sesión ha expirado, necesita iniciar sesión",
            className: "warning",
            button: "Ir",
            closeOnClickOutside: false
        })

        cleanToken()
        navigate("/login" )
    }

    const hadleOrder = async () => {
        try {
            if (!products.length) throw new ValidationError("Agregue almenos un producto a la nevera")
            
            const order = await makeOrder(token)
            if(order.status === 401) return await goToLogin()

            const orderDetail = await addOrderDetail(token, order.idpedido, products)
            if(orderDetail.status !== 201) throw new Error('Hubo un problema intente de nuevo')

            removeAllProducts()

        } catch (err) {
            console.error(err)
            if (err instanceof ValidationError) {
                await swal({
                    title: "Advertencia",
                    text: err.message,
                    className: "warning"
                })
            }
        }
    }

    return (
        <div>
            <Navbar></Navbar>
            <h2 className="fridge-title">Mi nevera ({products.length})</h2>
            <BreadCrumbs routes={[{ name: 'Nevera', route: 'fridge' }]} />
            <div className="fridge-page">
                <div className="fridge-pdts-container">
                    {
                        products.map((pdt) =>
                            <FridgeItem
                                amount={pdt.amount}
                                product={pdt}
                                onMinus={() => reduceProduct(pdt)}
                                onPlus={() => addProduct(pdt)}
                            />)
                    }
                </div>
                <FridgeClose
                    top={<Title />}
                    bottom={<ToOrder cost={total} onClean={removeAllProducts} onOrder={hadleOrder} />}
                />
            </div>
        </div>
    )
}
