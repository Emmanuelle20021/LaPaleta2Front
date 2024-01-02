import './navbar.scss'
import SearchIcon from '../../assets/search.jsx'
import UserIcon from '../../assets/user.jsx'
import KitchenIcon from '../../assets/kitchen.jsx';
import { useContext, useEffect, useRef, useState } from 'react';
import Account from '../account/accountmodal.jsx';
import useFridge from '../../customhooks/useFridgeContext.jsx';
import { useLocation, useRoute } from 'wouter'
import { AuthContext } from '../../contexts/auth.jsx';

const categories = [
    {
        name: 'paletas',
        ref: 'paletas'
    },
    {
        name: 'helados',
        ref: 'helados'
    },
    {
        name: 'waffles',
        ref: 'waffles'
    },
    {
        name: 'alimentos',
        ref: 'alimentos'
    },
    {
        name: 'bebidas',
        ref: 'bebidas'
    },
];

export default function Navbar() {
    const { token, cleanToken } = useContext(AuthContext)
    const { showFridge } = useFridge()
    const [showed, setShowed] = useState(false) 
    const [showModal, setShowModal] = useState(false)
    const [_, navigate] = useLocation()
    const [isHere] = useRoute("/products/:category");

    const btnUserIcon = useRef()

    useEffect(() => {
        const closeModalOnClickOutside = ({target}) => {
            if(!btnUserIcon) return

            if(btnUserIcon.current.contains(target)) return

            setShowModal(false)
        }

        document.addEventListener('mousedown', closeModalOnClickOutside)

        return () => document.removeEventListener('mousedown', closeModalOnClickOutside)
    }, [])

    function swapNavbar() {
        const categoriesContainer = document.getElementById('categories-container')
        const navbar = document.getElementById('navbar')
        if (showed) {
            navbar.classList.replace('navbar', 'navbar-ajust')
            categoriesContainer.classList.replace('showed', 'hidden')
        } else {
            navbar.classList.replace('navbar-ajust', 'navbar')
            categoriesContainer.classList.replace('hidden', 'showed')
        }
        setShowed(!showed)
    }

    function goTo(ref) {
        return () => {
            if (isHere) navigate(`./${ref}`)
            else navigate(`products/${ref}`)
        }
    }

    function returnToMenu() {
        navigate("/")
    }

    function manageModalAccount() {
        if(token) setShowModal(true)
        else navigate("/login")
    }

    function handleLogout() {
        cleanToken()
        navigate('/login')
    }

    return (
        <section className='navbar-container'>
            <nav id='navbar' className='navbar-ajust'>
                <button onClick={returnToMenu} className='logo-container'>
                    <img className='logo' src="/src/assets/LaPaletaLogo.png" alt="Logo la paleta" />
                </button>
                <section id='categories-container' className='categories-container hidden'>
                    <ul className='list-categories'>
                        {
                            categories.map(categorie => {
                                return (
                                    <li key={categorie.name + categorie.ref} className='categories-item'>
                                        <button className='categorie-button' onClick={goTo(categorie.ref)}>{categorie.name}</button>
                                    </li>
                                );
                            })
                        }
                        <li className='categories-item icon-nav-container'>
                            <button className='categorie-button'>
                                <SearchIcon></SearchIcon>
                            </button>
                            <button ref={btnUserIcon} className='categorie-button' onClick={manageModalAccount}>
                                <UserIcon></UserIcon>
                            </button>
                            { token && <button className='categorie-button' onClick={showFridge}>
                                <KitchenIcon></KitchenIcon>
                            </button>
                            }
                            <Account showModal={showModal} onClickAccount={ () => navigate('/account') } onLogout={handleLogout}  />
                        </li>
                    </ul>
                </section>
                <div className='icon-container'>
                    <button className='hamburger-menu' onClick={swapNavbar}>
                    {
                    showed?
                        <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                        </svg>
                        :
                        <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                        </svg>
                    }
                    </button>
                </div>
            </nav>
            <div className='wave-container'></div>
        </section>
    )
}
