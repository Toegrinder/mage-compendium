import {createBrowserHistory} from "history"

const basename = window.location.pathname.startsWith("/mage-compendium") ? "/mage-compendium" : "/"

export default createBrowserHistory( { basename });
