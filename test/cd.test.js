const cd = require("../cd")
const assert = require("assert").strict

describe("cd", () => {
    it("should resolve absolute path", () => {
        assert.equal(cd("http://8.8.8.8:8080/ws", "/"), "http://8.8.8.8:8080")
        assert.equal(cd("http://8.8.8.8:8080/ws", "/path"), "http://8.8.8.8:8080/path")
        assert.equal(cd("file:///", "/"), "file:///")
        assert.equal(cd("file:///", "/path"), "file:///path")
    })

    it("should resolve simple relative path", () => {
        assert.equal(cd("http://8.8.8.8:8080/ws", "./"), "http://8.8.8.8:8080/ws")
        assert.equal(cd("http://8.8.8.8:8080/ws#hash", "./"), "http://8.8.8.8:8080/ws")
        assert.equal(cd("http://8.8.8.8:8080/ws?query", "./"), "http://8.8.8.8:8080/ws")
        assert.equal(cd("http://8.8.8.8:8080/ws", "./path"), "http://8.8.8.8:8080/ws/path")
        assert.equal(cd("http://8.8.8.8:8080/ws#hash", "./path"), "http://8.8.8.8:8080/ws/path")
        assert.equal(cd("http://8.8.8.8:8080/ws?query", "./path"), "http://8.8.8.8:8080/ws/path")
    })

    it("should resolve 'level up' relative path", () => {
        assert.equal(cd("http://8.8.8.8:8080/ws", ".."), "http://8.8.8.8:8080")
        assert.equal(cd("http://8.8.8.8:8080/ws#hash", ".."), "http://8.8.8.8:8080")
        assert.equal(cd("http://8.8.8.8:8080/ws?query", ".."), "http://8.8.8.8:8080")
        assert.equal(cd("http://8.8.8.8:8080/ws", "../path"), "http://8.8.8.8:8080/path")
        assert.equal(cd("http://8.8.8.8:8080/ws", "../.."), "http://8.8.8.8:8080")
    })

    it("should resolve complex relative path", () => {
        assert.equal(cd("http://8.8.8.8:8080/ws", "/path/../path"), "http://8.8.8.8:8080/path")
        assert.equal(cd("http://8.8.8.8:8080/ws", "./path/../../path"), "http://8.8.8.8:8080/path")
        assert.equal(cd("http://8.8.8.8:8080/ws", "../path/../path"), "http://8.8.8.8:8080/path")
    })

    it("should preserve trailing slash in path", () => {
        assert.equal(cd("https://ftp.mozilla.org/favicon.ico", "/pub/"), "https://ftp.mozilla.org/pub/")
        assert.equal(cd("https://ftp.mozilla.org/pub/", "./firefox/"), "https://ftp.mozilla.org/pub/firefox/")
        assert.equal(cd("https://ftp.mozilla.org/pub/firefox/", "../"), "https://ftp.mozilla.org/pub/")
    })
})