import { useContext, useEffect, useState } from "react"
import getCategories from "../services/categories"
import { AuthContext } from "../contexts/auth"
import { ROL } from "../constants/properties"

export default function useCategories() {
    const [categories, setCategories] = useState([])
    const { usrData } = useContext(AuthContext)

    useEffect(() => {
        const fetchCtgs = async () => {
            if (categories.length) return

            let ctgs = window.localStorage.getItem('lapltaCtgs')

            if (!ctgs) {
                ctgs = await getCategories()
                window.localStorage.setItem('lapltaCtgs', JSON.stringify(ctgs))
            } else {
                ctgs = JSON.parse(ctgs)
            }

            setCategories(ctgs)
        }

        if (usrData.id_rol === ROL.ADMIN) {
            setCategories([{ name: 'Pedidos', ref:'orders' }, { name: 'Productos', ref: 'products' }])
            return
        }

        fetchCtgs()

    }, [usrData])

    return categories
}