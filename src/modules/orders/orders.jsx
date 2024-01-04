import BreadCrumbs from "../../components/breadcrumbs/breadcrumbs";
import Navbar from "../../components/navbar/navbar";
import capitalize from "../../utils/capitalizeFirstLetter";

export function Orders() {

    return (
        <div>
            <Navbar></Navbar>
            <BreadCrumbs routes={[{name: 'Ordenes', route: 'orders'}]}/>
            <h1>Estas en {capitalize('Ordenes')}</h1>
        </div>
    )
}