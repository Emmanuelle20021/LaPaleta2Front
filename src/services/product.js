import { API } from "../constants/properties";

export async function mostSell(){
    const response = await fetch(`${API}/product/mostsell`, {method: 'GET'})
    let pdts = await response.json()
    pdts = pdts.filter((pdt)=> pdt)
    const mappdts = pdts.map((pdt) => ({
        name: pdt.nombre,
        img: pdt.foto_producto,
        description: pdt.descripción,
        price: pdt.precio
    }))
    console.log(mappdts)
    return mappdts;
}