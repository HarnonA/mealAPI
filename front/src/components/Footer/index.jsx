import './index.css'
import { FaMapMarkerAlt, FaFacebook, FaInstagram } from 'react-icons/fa';


function Footer() {
  return (
    <div className="Footer">
      <div className="contact">
        <p>101, Some Fictional Street</p>
        <p>Big Mall, room 1000</p>
        <p>São Paulo, SP, Brazil</p>
        <p>Phone: +55 11 123456789</p>
      </div>
      <div className="social">
        <a href="https://www.google.com/maps/@-23.6815302,-46.8761859,10z"><FaMapMarkerAlt size='2rem'/></a>
        <a href="https://www.facebook.com"><FaFacebook size='2rem'/></a>
        <a href="https://www.instagram.com"><FaInstagram size='2rem'/></a>
      </div>

    </div>
  );
}

export default Footer;
