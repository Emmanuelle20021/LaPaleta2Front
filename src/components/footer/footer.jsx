import './footer.scss';

export default function Footer() {
    return <section className='footer-container'>
        <a className="social-media-icon" href="#">
            <img src="src/assets/facebook-icon.svg" alt="Facebook icono" />
        </a>
        <a className="social-media-icon" href="#">
            <img className='footer-img' src="src/assets/instagram-icon.svg" alt="Instagram icono" />
        </a>
    </section>
}