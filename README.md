# Interface for API https://jokes.marwyntwelve.com

## Running locally:

* npm install
* npm run build
* Open /dist/index.html

## Working online demo:

https://jokes.marwyntwelve.com/

## Short documentation

Files __header__nav__ и __section__*__ have classes inside them, which contain 
HTML of corresponding sections and all related JS code.

__http.js__ is a http-request wrapped together with caching mechanism.

__storage.js__ - class for working with localStorage methods. Used in __http.js__.

Entry point is __app.js__. After launch app creates one exemplar for each section
class, using incoming parameters.

The project is made with vanilla JS and CSS. JS-files are packed in bundle with
Webpack, which uses __babel-polyfills module__.

## Caching

There is selecting caching built-in inside requests in __http.js__, data is
stored in "URL: response" format inside localStorage.

Before sending actual request, __http.js__ checks if there is any response
cached for this URL, and if it is, returns it immediately.

The only section which requests are cached is __Search Section__.

## Search section

__Search section__ isn't working because API doesn't have corresponding method working.
