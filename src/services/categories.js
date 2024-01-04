import { API } from "../constants/properties";

export async function getCategories(){
    const response = await fetch(`${API}/category/`, {method: 'GET'})
    let pdts = await response.json()
    return pdts;
}