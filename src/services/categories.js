import { API } from "../constants/properties"

export default async function getCategories() {
    const response = await fetch(`${API}/category/`)

    const ctgs = await response.json()

    const mapCtgs = ctgs.map((pdt) => ({
        id: pdt.idcategoria,
        name: pdt.nombre,
    }))

    return mapCtgs
}