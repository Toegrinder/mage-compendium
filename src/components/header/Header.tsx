import { BASE_URL } from '../../config/Config';

export default function Header() {
    return (
        <div className={'header-div'}>
            <div className="navbar">
            <a href={`${BASE_URL}/`}>Home</a>
            <a href={`${BASE_URL}/sims`}>Sims</a>
            <div className="dropdown">
                <button className="dropbtn">Guides
                <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                <a href={`${BASE_URL}/guides?spec=arcane`}>Arcane</a>
                <a href={`${BASE_URL}/guides?spec=frost`}>Frost</a>
                <a href={`${BASE_URL}/guides?spec=fire`}>Fire</a>
                </div>
            </div>
        
            <a href={`${BASE_URL}/vods`}>VODs</a>
            </div>
        </div>
    )
}