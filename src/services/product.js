import { API } from "../constants/properties";

export async function mostSell(){
    const response = await fetch(`${API}/product/mostsell`, {method: 'GET'})
    let pdts = await response.json()
    pdts = pdts.filter((pdt)=> pdt)
    const mappdts = pdts.map((pdt) => ({
        id: pdt.idproducto,
        name: pdt.nombre,
        category: pdt.id_categoria,
        img: pdt.foto_producto,
        description: pdt.descripción,
        price: pdt.precio
    }))
    return mappdts;
}

export default async function getProducts(category, subcategory) {
    let URL = `${API}/product/`

    if(category) URL = `${URL}?category=${category}`
    if(category && subcategory) URL = `${URL}?subcategory=${subcategory}`

    const response = await fetch(URL)

    const pdts = await response.json()

    const mapPdts = pdts.map((pdt) => ({
        id: pdt.idproducto,
        name: pdt.nombre,
        img: pdt.foto_producto,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        price: pdt.precio,
        category: pdt.id_categoria
    }))

    return mapPdts
}