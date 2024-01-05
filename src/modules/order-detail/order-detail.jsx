import { useContext, useEffect, useState } from "react";
import BreadCrumbs from "../../components/breadcrumbs/breadcrumbs";
import FridgeItem from "../../components/fridge-item/fridgeItem";
import Navbar from "../../components/navbar/navbar";
import FridgeClose from "../../components/fridge-close/fridge-close";
import Title from "../../components/order-title/title";

import ToOrder from "../../components/order-to-order/to-order";
import "../fridge/fridge.scss";

import "./order-detail.scss"
import { getOrderDetail } from "../../services/orders";
import { AuthContext } from "../../contexts/auth";
import { API_ASSETS, ROL } from "../../constants/properties";
import Confirmation from "../../components/order-confirmation/confirmation";
import Detail from "../../components/order-detail/detail";
import { navigate } from "wouter/use-location";

export default function OrderDetail({ params: { id } }) {
    const { token, usrData, cleanToken } = useContext(AuthContext)
    const [pdts, setPdts] = useState([])
    const [orderDetail, setOrderDetail] = useState({})

    const goToLogin = async () => {
        await swal({
            title: "Alto",
            text: "Su sesión ha expirado, necesita iniciar sesión",
            className: "warning",
            button: "Ir",
            closeOnClickOutside: false
        })

        navigate("/login")
    }

    useEffect(() => {

        const fetchDetail = async () => {
            const response = await getOrderDetail(token, id)

            if (response.status === 401) return await goToLogin()

            const { order, products } = response.body

            setPdts(products)
            setOrderDetail(order)
        }

        if (usrData.id === ROL.NOT_USER) return

        fetchDetail()
    }, [usrData])

    const total = pdts.reduce((total, pdt) => total + pdt.total_cantidad * pdt.precio, 0)

    console.log(pdts, orderDetail)

    return (
        <div>
            <Navbar></Navbar>
            <h2 className="order-detail-title">Pedido </h2>
            <BreadCrumbs routes={[{ name: 'Pedidos', route: 'orders' }, { name: `Pedido #${id}`, route: id }]} />
            <div className="fridge-page">
                <div className="fridge-pdts-container">
                    {
                        pdts.map((pdt) =>
                            <FridgeItem
                                amount={pdt.total_cantidad}
                                product={{ img: pdt.foto_producto, name: pdt.nombre, price: pdt.precio }}
                            />)
                    }
                </div>
                <FridgeClose
                    top={
                        <Detail
                            id={orderDetail.idpedido}
                            state={orderDetail.estado}
                            cost={total}
                            date={new Date(orderDetail.fecha).toLocaleDateString()}
                        />
                    }
                    bottom={<Confirmation />}
                />
            </div>
        </div>
    )
}