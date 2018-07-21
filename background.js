// browser.omnibox.setDefaultSuggestion({
//     description: "cd"
// })

chrome.omnibox.onInputEntered.addListener(function (text) {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        const tab = tabs[0]
        const newUrl = cd(tab.url, text)
        chrome.tabs.update(tab.id, { url: newUrl })
    })
})
