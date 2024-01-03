import { FaHouse, FaAnglesRight } from "react-icons/fa6";
import { useLocation } from "wouter";
import capitalize from "../../utils/capitalizeFirstLetter";
import "./breadcrumbs.scss"

export default function BreadCrumbs({ routes }) {
    //routes = [{name: 'Cuenta', route: 'account'}]
    // -> Cuenta
    // domain.com/account
    //detail = [{name: 'Helados', route: 'products/helados'}, {name: '#1', route: '1'}] 
    // -> helados > #1
    // domain.com/products/helados/1

    const [_, navigate] = useLocation()

    const goTo = (path) => () => navigate(path, { replace: true })
    let fullPath = ''

    const mapRoutes = routes.map((ele) => {
        fullPath += `/${ele.route}` 
        return {...ele, route: fullPath}
    })

    return (
        <div className="wrapper-breadcrumbs">
            <FaHouse size={20} onClick={goTo('/')} className="breadcrumbs-el" />
            {
                mapRoutes.map(({ name, route }) => (
                    <div key={name} className="wrapper-breadcrumbs-el">
                        <FaAnglesRight size={20} className="breadcrumbs-separator" />
                        <p onClick={goTo(route)} className="breadcrumbs-el">{capitalize(name)}</p>
                    </div>

                ))
            }
        </div>
    )
}