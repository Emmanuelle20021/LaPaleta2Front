import { useContext, useEffect, useState } from "react";
import BreadCrumbs from "../../components/breadcrumbs/breadcrumbs";
import Navbar from "../../components/navbar/navbar";
import OrderCard from "../../components/order-card/order-card";

import "./orders.scss"
import { getOrdersDetails } from "../../services/orders";
import { AuthContext } from "../../contexts/auth";
import { ROL } from "../../constants/properties";
import { navigate } from "wouter/use-location";

export function Orders() {
    const { token, usrData } = useContext(AuthContext)
    const [orders, setOrders] = useState([])

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
        const fetchOrders = async () => {
            const response = await getOrdersDetails(token, usrData.id)

            if (response.status === 401) return await goToLogin()

            setOrders(response.body)
        }

        if (usrData.id === ROL.NOT_USER) return

        fetchOrders()

    }, [usrData])

    return (
        <div>
            <Navbar></Navbar>
            <h2 className="orders-title">Pedidos </h2>
            <BreadCrumbs routes={[{ name: 'Pedidos', route: 'orders' }]} />
            <div className="orders-cards">
                {
                    orders.map(({data, products}) => <OrderCard data={data} pdts={products}/>)
                }
            </div>
        </div>
    )
}