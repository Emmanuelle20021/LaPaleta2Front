import { API, ROL } from "../constants/properties";

export default async function register(name, email, cellphone ,pwd) {
    const response = await fetch(`${API}/user/register`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            nombre: name,
            correo: email,
            telefono: cellphone,
            contraseña: pwd,
            id_rol: ROL.COSTUMER
        })
    })
    return { status: response.status }
} 