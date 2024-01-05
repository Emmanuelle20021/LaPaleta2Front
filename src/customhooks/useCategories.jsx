import { useContext, useEffect, useState } from "react"
import getCategories from "../services/categories"
import { AuthContext } from "../contexts/auth"
import { ROL } from "../constants/properties"
import { getSubcategories } from "../services/subcategories"

export default function useCategories() {
    const [categories, setCategories] = useState([])
    const { usrData } = useContext(AuthContext)

    useEffect(() => {
        const fetchCtgs = async () => {
            if (categories.length) return

            let ctgs = window.localStorage.getItem('lapltaCtgs')

            if (!ctgs) {
                ctgs = await getCategories()
                const subcategories = await getSubcategories()
                ctgs = ctgs.map(ctg => {
                    if(ctg.id === 1) return {...ctg, subctgs: subcategories.slice(0,3)}
                    if(ctg.id === 2) return {...ctg, subctgs: []}
                    if(ctg.id === 3) return {...ctg, subctgs: subcategories.slice(3,6)}
                    if(ctg.id === 4) return {...ctg, subctgs: subcategories.slice(6,8)}
                    if(ctg.id === 5) return {...ctg, subctgs: subcategories.slice(8)}
                })
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