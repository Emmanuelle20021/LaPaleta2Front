import { jwtDecode } from 'jwt-decode'
import { createContext, useEffect, useState } from 'react'
import { ROL } from '../constants/properties'

export const AuthContext = createContext()

const NOT_USER = {
    id: -1,
    id_rol: ROL.NOT_USER,
    email: ''
}

export default function AuthContextProvider({ children }) {
    const [token, setTokenState] = useState(null)
    const [usrData, setUsrData] = useState(NOT_USER)

    useEffect(() => {
        let token = window.localStorage.getItem('loggedLaPta')
        setTokenState(token)
    }, [])

    useEffect(() => {
        if (!token) return setUsrData(NOT_USER)
        const { id, id_rol, correo } = jwtDecode(token)
        setUsrData({ id, id_rol, email: correo })
    }, [token])

    const setToken = (accessToken) => {
        window.localStorage.setItem('loggedLaPta', (accessToken))
        setTokenState(accessToken)
    }

    const cleanToken = () => {
        window.localStorage.removeItem('loggedLaPta')
        setTokenState(null)
    }

    return (
        <AuthContext.Provider value={{ token, usrData, setToken, cleanToken }}>
            {children}
        </AuthContext.Provider>
    )
}