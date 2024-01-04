import { useEffect, useState } from "react"
import getCategories from "../services/categories"

export default function useCategories() {
    const [categories, setCategories] = useState([])

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

        fetchCtgs()
    }, [])

    return categories
}