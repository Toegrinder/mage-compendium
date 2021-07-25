
export function formatText(text: string) {
    return titleCase(
        text.replaceAll("_", " ")
        .replaceAll("-", " ")
    )
}

function titleCase(str: string) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }

 export function setQueryParam(key: string, value: string) {
    const pathname = window.location;
    const params = new URLSearchParams(pathname.search);
    params.set(key, value)
    window.history.replaceState({}, "", `${window.location.pathname}?${params}`)
}

export function getQueryParam(key: string) {
    const pathname = window.location;
    const params = new URLSearchParams(pathname.search);
    return params.get(key)
}