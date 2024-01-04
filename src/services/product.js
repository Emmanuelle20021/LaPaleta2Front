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

export async function addProduct(title,description,category,subcategory,price,file){

    const response = fetch(`${API}/product/add`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        enctype: "multipart/form-data",
        body: JSON.stringify({
            nombre:title,
            descripción:description,
            id_categoria: Number(category),
            id_subcategoria: Number(subcategory),
            precio:Number(price),
            foto_producto: file.name
        })
    })

    console.log(file)

    return response
}