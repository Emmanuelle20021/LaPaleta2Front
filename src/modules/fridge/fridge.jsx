import BreadCrumbs from "../../components/breadcrumbs/breadcrumbs";
import Navbar from "../../components/navbar/navbar";
import capitalize from "../../utils/capitalizeFirstLetter";

export function Fridge() {
    return (
        <div>
            <Navbar></Navbar>
            <BreadCrumbs routes={[{ name: 'Nevera', route: 'fridge' }]} />
            <h1>Estas en {capitalize('Nevera')}</h1>
        </div>
    )
}
