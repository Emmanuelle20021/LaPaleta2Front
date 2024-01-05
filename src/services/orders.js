import { API } from "../constants/properties"

export async function makeOrder(token) {
    const response = await fetch(`${API}/order/add`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            estado: 'Proceso'
        })
    })

    const body = await response.json()

    return { status: response.status, ...body }

}

export async function addOrderDetail(token, idorder, products) {
    const response = await fetch(`${API}/cooler/add`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id_pedido: idorder, productos: products })
    })

    const body = await response.json()

    return { status: response.status, ...body }
}

export async function getOrdersDetails(token, id) {
    const response = await fetch(`${API}/order/user/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const body = await response.json()

    return { status: response.status, body }

}