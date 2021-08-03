import { BASE_URL } from '../../config/Config';

export default function Header() {
    return (
        <div className={'header-div'}>
            <div className="navbar">
            <img src={`mage-icon.png`} className={"mage-image"} alt={"mage"}/>
            <a href={`${BASE_URL}/`}>Home</a>
            <a href={`${BASE_URL}/sims`}>Sims</a>
            <div className="dropdown">
                <button className="dropbtn">Guides
                <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                {/*<a href={`${BASE_URL}/guides?spec=arcane`}>Arcane</a>
                <a href={`${BASE_URL}/guides?spec=frost`}>Frost</a>
    <a href={`${BASE_URL}/guides?spec=fire`}>Fire</a>*/}

                <a href={`https://tinyurl.com/arcane-mage-compendium`} target={"_blank"} rel={"noreferrer"}>Arcane</a>
                <a href={`https://tinyurl.com/frost-mage-compendium`} target={"_blank"} rel={"noreferrer"}>Frost</a>
                <a href={`https://tinyurl.com/fire-mage-compendium`} target={"_blank"} rel={"noreferrer"}>Fire</a>
                </div>
            </div>
        
            <a href={`${BASE_URL}/vods`}>VODs</a>
            <a href={`${BASE_URL}/faq`}>FAQ</a>
            </div>
        </div>
    )
}