const cd = require("../cd")
const assert = require('assert').strict

describe("cd", () => {
    it("should resolve absolute path", () => {
        assert.equal("http://8.8.8.8:80", cd("http://8.8.8.8:80/ws", "/"))
        assert.equal("http://8.8.8.8:80/path", cd("http://8.8.8.8:80/ws", "/path"))
        assert.equal("file:///", cd("file:///", "/"))
        assert.equal("file:///path", cd("file:///", "/path"))
    })

    it("should resolve simple relative path", () => {
        assert.equal("http://8.8.8.8:80/ws", cd("http://8.8.8.8:80/ws", "./"))
        assert.equal("http://8.8.8.8:80/ws", cd("http://8.8.8.8:80/ws#hash", "./"))
        assert.equal("http://8.8.8.8:80/ws", cd("http://8.8.8.8:80/ws?query", "./"))
        assert.equal("http://8.8.8.8:80/ws/path", cd("http://8.8.8.8:80/ws", "./path"))
        assert.equal("http://8.8.8.8:80/ws/path", cd("http://8.8.8.8:80/ws#hash", "./path"))
        assert.equal("http://8.8.8.8:80/ws/path", cd("http://8.8.8.8:80/ws?query", "./path"))
    })

    it("should resolve 'level up' relative path", () => {
        assert.equal("http://8.8.8.8:80", cd("http://8.8.8.8:80/ws", ".."))
        assert.equal("http://8.8.8.8:80", cd("http://8.8.8.8:80/ws#hash", ".."))
        assert.equal("http://8.8.8.8:80", cd("http://8.8.8.8:80/ws?query", ".."))
        assert.equal("http://8.8.8.8:80/path", cd("http://8.8.8.8:80/ws", "../path"))
        assert.equal("http://8.8.8.8:80", cd("http://8.8.8.8:80/ws", "../.."))
    })

    it("should resolve complex relative path", () => {
        assert.equal("http://8.8.8.8:80/path", cd("http://8.8.8.8:80/ws", "/path/../path"))
        assert.equal("http://8.8.8.8:80/path", cd("http://8.8.8.8:80/ws", "./path/../../path"))
        assert.equal("http://8.8.8.8:80/path", cd("http://8.8.8.8:80/ws", "../path/../path"))
    })

    it("should preserve trailing slash in path", () => {
        assert.equal("https://ftp.mozilla.org/pub/", cd("https://ftp.mozilla.org/favicon.ico", "/pub/"))
        assert.equal("https://ftp.mozilla.org/pub/firefox/", cd("https://ftp.mozilla.org/pub/", "./firefox/"))
        assert.equal("https://ftp.mozilla.org/pub/", cd("https://ftp.mozilla.org/pub/firefox/", "../"))
    })
})