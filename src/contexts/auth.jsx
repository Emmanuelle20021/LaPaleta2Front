import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export default function AuthContextProvider({ children }) {
    const [token, setTokenState] = useState(null)

    useEffect(() => {
        let token = window.localStorage.getItem('loggedLaPta')
        setTokenState(token)
    }, [])

    const setToken = (accessToken) => {
        window.localStorage.setItem('loggedLaPta', (accessToken))
        setTokenState(accessToken)
    }

    const cleanToken = () => {
        window.localStorage.removeItem('loggedLaPta')
        setTokenState(null)
    }

    return (
        <AuthContext.Provider value={{ token, setToken, cleanToken }}>
            {children}
        </AuthContext.Provider>
    )
}