function cd(urlString, path) {
    urlString = stripQueryAndHash(urlString)
    if (!urlString.endsWith("/")) {
        urlString = urlString + "/"
    }
    // if (path == "./") {
    //     const newUrl = new URL(urlString)
    //     newUrl.search = ""
    //     newUrl.hash = ""
    //     return newUrl.href
    // }
    const res = new URL(path, urlString).href
    if (path.endsWith("/")) {
        return res.endsWith("/") ? res : res + "/"
    } else {
        return res.endsWith("/") ? res.substring(0, res.length - 1) : res
    }
}

function stripQueryAndHash(urlString) {
    const newUrl = new URL(urlString)
    newUrl.search = ""
    newUrl.hash = ""
    return newUrl.href
}

//TODO It isn't supported in Web Extensions so we get an error in background script console.
module.exports = cd
