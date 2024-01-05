import { useContext, useEffect, useState } from "react"
import { FaEllipsisVertical } from "react-icons/fa6"

import { API_ASSETS } from "../../constants/properties"

import { getUserData } from "../../services/user"

import "./order-card.scss"
import { AuthContext } from "../../contexts/auth"

const datatest = {
    "idpedido": 1,
    "id_cliente": 2,
    "fecha": "2024-01-05T13:29:47.000Z",
    "estado": "Proceso"
}

const pdtsTest = [
    {
        "idproducto": 12,
        "nombre": "Frappé de taro",
        "precio": "80",
        "descripción": "Frappé exótico de sabor a taro",
        "habilitado": 1,
        "id_categoria": 5,
        "id_subcategoria": 10,
        "foto_producto": "frappe_taro.png",
        "createdAt": "2024-01-05T07:24:56.000Z",
        "updatedAt": "2024-01-05T07:24:56.000Z",
        "total_cantidad": "3"
    },
    {
        "idproducto": 58,
        "nombre": "Waffle con helado de beso de ángel",
        "precio": "80",
        "descripción": "Exquisito waffle con helado suave y dulce",
        "habilitado": 1,
        "id_categoria": 3,
        "id_subcategoria": 6,
        "foto_producto": "waffleHelado_fresasConCrema.png",
        "createdAt": "2024-01-05T07:24:56.000Z",
        "updatedAt": "2024-01-05T07:24:56.000Z",
        "total_cantidad": "3"
    },
    // {
    //     "idproducto": 62,
    //     "nombre": "Waffle con ferrero",
    //     "precio": "65",
    //     "descripción": "Waffle con sabor a Ferrero",
    //     "habilitado": 1,
    //     "id_categoria": 3,
    //     "id_subcategoria": 5,
    //     "foto_producto": "waffleDulce_ferrero.png",
    //     "createdAt": "2024-01-05T07:24:56.000Z",
    //     "updatedAt": "2024-01-05T07:24:56.000Z",
    //     "total_cantidad": "1"
    // }
]

export default function OrderCard({ data = datatest, pdts = pdtsTest, onClick }) {
    const { token } = useContext(AuthContext)
    const [clientName, setClientName] = useState('')
    const total = pdts.reduce((total, pdt) => total + pdt.total_cantidad * pdt.precio, 0)

    useEffect(() => {
        const fetchClientName = async () => {
            const { nombre } = await getUserData(token, data.id_cliente)
            setClientName(nombre)
        }

        fetchClientName()
    }, [])

    return (
        <div className="order-card-container" onClick={onClick}>
            <div className="order-card-header">
                <p className="id-order">{data.idpedido}</p>

                <div className="order-card-datetime">
                    <p>{new Date(data.fecha).toLocaleDateString()}</p>
                    <p>{new Date(data.fecha).toLocaleTimeString()}</p>
                </div>
            </div>
            <p className="order-clientname">{clientName}</p>
            <div className="order-card-pdts-detail">
                {
                    pdts.length <= 2
                        ? pdts.map(pdt => (
                            <div className="order-card-row-detail">
                                <img src={`${API_ASSETS}${pdt.foto_producto}`} alt={pdt.nombre} />
                                <p className="amount-pdt">{pdt.total_cantidad}</p>
                                <p className="name-pdt">{pdt.nombre}</p>
                            </div>
                        ))
                        : pdts.slice(0, 3).map((pdt, index) =>
                            index !== 2 ? (
                                <div className="order-card-row-detail">
                                    <img src={`${API_ASSETS}${pdt.foto_producto}`} alt={pdt.nombre} />
                                    <p className="amount-pdt">{pdt.total_cantidad}</p>
                                    <p className="name-pdt">{pdt.nombre}</p>
                                </div>)
                                : (
                                    <div className="elipsis">
                                        <FaEllipsisVertical size={16} />
                                    </div>
                                )
                        )
                }
            </div>
            <div className="order-card-footer">
                <p className="order-card-state">{data.estado}</p>
                <p className="order-card-total">{total}</p>
            </div>
        </div>
    )
}