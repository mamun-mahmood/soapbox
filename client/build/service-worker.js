"use strict";var precacheConfig=[["/index.html","49e55046abe1c49595a7eeb7f1a60f25"],["/static/css/main.96b4b360.css","d58418588ca52fbee1ccebb1491a6f18"],["/static/js/BrowseMoreHoots.b27b0287.chunk.js","0082144981d7325719545170b949c509"],["/static/js/Explore.076a7742.chunk.js","623747ca2d778b282b13a0f62ee208b0"],["/static/js/Feed.593e95a5.chunk.js","32b4e5582c1696e1950c4f437744d1d8"],["/static/js/HashtagHootsPage.0f9e72e7.chunk.js","54d42d977f7125e635e2fe30f24028fa"],["/static/js/IndividualHoot.d3112297.chunk.js","7226de0e76a52dc1500200aa678f65cd"],["/static/js/LoginComp.d89c2d9d.chunk.js","9ea78f97944f4f9d78773b007d7d1250"],["/static/js/SignupComp.81685a43.chunk.js","42e79f188f77bbfd579c80dc3d20292f"],["/static/js/StockHootsPage.ff8ca588.chunk.js","b82cabe8d7e8f43cc1a2bf2d7dd589e8"],["/static/media/Soapbox.194cc850.png","194cc8506ad45ed9f225f88aa5430c51"],["/static/media/banner-3.02e6bd37.jfif","02e6bd373acc6c3dd806cfc596032685"],["/static/media/frame.82441d96.png","82441d9614527ac041c71ebf36bac35c"],["/static/media/groupcall.1aa4121b.png","1aa4121b2d9ca10fce5348bc002c690e"],["/static/media/membershipGraphic.e5db9036.png","e5db9036ab1e37cb5a69aa183e1fb742"],["/static/media/new-hoot-public.98e5f3b2.png","98e5f3b2bedb0a1cb9f4e3a8b8091906"],["/static/media/oneonone.ab126205.png","ab126205da83c56996b7d0b42b45f127"],["/static/media/personalmessage.fb2e9be1.png","fb2e9be1522437909ceedfbaac7ca18b"],["/static/media/roombg.aff73605.png","aff736054686d8ab8762e15281286df9"],["/static/media/shutter-click.a2ae3071.wav","a2ae30717bcf25c3bb4a9d92d37f9ff2"],["/static/media/stickerIcon.ba9f54dd.png","ba9f54dd1cf9518e2a0f1bdd8ec56da8"],["/static/media/xmg-logo.bbe5ccf5.png","bbe5ccf5646fa31f9e6cad4f27256e5e"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,n){var c=new URL(e);return n&&c.pathname.match(n)||(c.search+=(c.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),c.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),c=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),e=urlsToCacheKeys.has(a));var c="/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(c,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});