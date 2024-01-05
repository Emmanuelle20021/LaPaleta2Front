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
        description: pdt.descripción,
        price: pdt.precio,
        category: pdt.id_categoria
    }))

    return mapPdts
}

export async function addProduct(title,description,category,subcategory,price,file){

    const formData = new FormData();
    formData.append('image', file);
    formData.append('nombre', title);
    formData.append('descripcion', description);
    formData.append('id_categoria', category);
    formData.append('id_subcategoria', subcategory);
    formData.append('precio', price);
    formData.append('foto_producto', file.name);

    const response = await fetch(`${API}/product/add`, {
        method: 'POST',
        body: formData
    })

    const body = await response.json()
    return { status: response.status, ...body }
}