
import { Outlet, Link } from 'react-router-dom';

const Footer = () => {
    return ( 
        <div id='footer'>
            <Link to={'/nosotros'}>Nosotros</Link>
            <Link to={''}>FQA</Link>
            <Link to={''}>Algo mas</Link>
        </div>
     );
}
 
export default Footer;