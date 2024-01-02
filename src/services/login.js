import { API } from "../constants/properties";

export default async function login(email, pwd) {
    const response = await fetch(`${API}/user/login`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            correo: email,
            contraseña: pwd
        })
    })

    const body = await response.json()

    return { status: response.status, ...body }
} 