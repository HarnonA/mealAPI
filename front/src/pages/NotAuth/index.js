import { FaArrowLeft } from 'react-icons/fa'
import { useHistory } from 'react-router-dom';

import './index.css'

function NotAuth() {
    const history = useHistory();
    return (

        <div className="NotAuth">
            <p>You are not logged in.</p>
            <button onClick={()=>history.push("/login")}>
                <FaArrowLeft /> go back </button>

        </div>

    );
}
export default NotAuth;



