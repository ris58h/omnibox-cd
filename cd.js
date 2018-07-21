function cd(urlString, path) {
    // return null unless @hasFullUrlPrefix urlString

    const urlHostIndex = urlString.indexOf("://") + 3
    const urlPathIndex = urlString.indexOf("/", urlHostIndex)
    const urlOrigin = 0 <= urlPathIndex ? urlString.substring(0, urlPathIndex) : urlString
    const urlHost = urlOrigin.substring(urlHostIndex)
    let urlPath = 0 <= urlPathIndex ? urlString.substring(urlPathIndex + 1) : ""
    if (urlPath.includes('#')) {
        urlPath = urlPath.substring(0, urlPath.indexOf('#'))
    }
    if (urlPath.includes('?')) {
        urlPath = urlPath.substring(0, urlPath.indexOf('?'))
    }

    const urlPathParts = urlPath.split("/")
    if (path == "/") {
        parts = []
    } else if (path.startsWith("/")) {
        parts = path.substring(1).split("/")
    } else if (path.startsWith("./")) {
        pathParts = path.substring(2).split("/")
        parts = urlPathParts.concat(pathParts)
    } else if (path == "..") {
        parts = urlPathParts.concat("..")
    } else if (path.startsWith("../")) {
        pathParts = path.split("/")
        parts = urlPathParts.concat(pathParts)
    } else {
        return null
    }

    const resolvedParts = []
    for (const part of parts) {
        if (0 < part.length) {
            if (part == "..") {
                if (0 < resolvedParts.length) {
                    resolvedParts.pop()
                }
            } else {
                resolvedParts.push(part)
            }
        }
    }
    if (resolvedParts.length == 0) {
        return urlHost.length == 0 ? urlOrigin + "/" : urlOrigin
    } else {
        const trailingSlash = path.endsWith("/") && path.length > 2
        return urlOrigin + "/" + resolvedParts.join("/") + (trailingSlash ? "/" : "")
    }
}

//TODO It isn't supported in Web Extensions so we get an error in background script console.
module.exports = cd
