import { API } from "../constants/properties";

export async function getSubcategories(){
    const response = await fetch(`${API}/subcategory/`, {method: 'GET'})
    let pdts = await response.json()
    return pdts;
}