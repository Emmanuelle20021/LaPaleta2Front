import BreadCrumbs from "../../components/breadcrumbs/breadcrumbs";
import Navbar from "../../components/navbar/navbar";
import capitalize from "../../utils/capitalizeFirstLetter";

export function Account() {

    return (
        <div>
            <Navbar></Navbar>
            <BreadCrumbs routes={[{name: 'Cuenta', route: 'account'}]}/>
            <h3 className='category-title'>{}</h3>
            <h1>Estas en {capitalize('Cuenta')}</h1>
        </div>
    )
}