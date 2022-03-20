import './CryptoBookmarks.css';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faChartLine, faNewspaper } from '@fortawesome/free-solid-svg-icons';

const CryptoBookmarks = () => {
    return (
        <div id='bookmark-menu-container'>
            <NavLink to="/bookmark/list" className="bookmarked-crypto-price-tag">
                <div>북마크한 암호화폐 가격</div>
                <FontAwesomeIcon icon={faList}  className="font-awesome-icons"/>
            </NavLink>
            <NavLink to="/bookmark/graph" className="bookmarked-crypto-price-tag">
                <div>북마크한 암호화폐 그래프</div>
                <FontAwesomeIcon icon={faChartLine} className="font-awesome-icons" />
            </NavLink>
            <NavLink to="/bookmark/list" className="bookmarked-crypto-price-tag">
                <div>북마크한 암호화폐 뉴스</div>
                <FontAwesomeIcon icon={faNewspaper}  className="font-awesome-icons"/>
            </NavLink>
        </div>
    );
}

export default CryptoBookmarks;