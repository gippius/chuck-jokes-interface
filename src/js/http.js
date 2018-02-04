import storage from '../app.js';

export default function httpGet(url) {
    return new Promise(function (resolve, reject) {
        
        const urlRegExp = new RegExp('^' + storage.cachingURL);
        const cachedResponse = storage.getFromCache(url);
        // cachedResponse: { null || JSONString}

        // resolving cached response, if any
        if (url.match(urlRegExp) && cachedResponse) {
            resolve(cachedResponse);
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function () {
            if (this.status == 200) {

                if (url.match(urlRegExp)) {
                    storage.setToCache(url, this.response);
                }
                
                resolve(this.response);
            } else {
                const error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };

        xhr.onerror = function () {
            reject(new Error("Network Error"));
        };

        xhr.send();
    });

}