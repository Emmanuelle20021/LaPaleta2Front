import { API } from "../constants/properties";

export async function updateUser(token, { name = '', email = '', phone = '', pwd = '' }) {
    let dataToUpdate = {}

    if (name.length > 0) dataToUpdate.nombre = name
    if (email.length > 0) dataToUpdate.correo = email
    if (phone.length > 0) dataToUpdate.telefono = phone
    if (pwd.length > 0) dataToUpdate.contraseña = pwd

    const response = await fetch(`${API}/user/update`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToUpdate)
    })

    const body = await response.json()

    return { status: response.status, ...body }
}

export async function verifyPwd(token, pwd) {

    const response = await fetch(`${API}/user/verifypwd`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ contraseña: pwd })
    })

    if (response.status === 200) {
        return { status: response.status }
    }
    else {
        const body = await response.json()
        return { status: response.status, ...body }
    }
}

export async function getUserData(token, id) {
    const response = await fetch(`${API}/user/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const body = await response.json()

    return { status: response.status, ...body }
}