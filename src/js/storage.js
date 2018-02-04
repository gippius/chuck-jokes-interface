// used in httpGet class

export default class Storage {
    constructor(options) {
        // list of URLS which need to be cached
        this.cachingURL = options.cachingURL;
    }

    getFromCache(url) {
        return localStorage.getItem(url);
    }

    setToCache(url, response) {
        localStorage.setItem(url, response);
    }
}