webpackJsonp([10],{8759:function(e,t,n){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function a(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function r(a,i){try{var o=t[a](i),u=o.value}catch(e){return void n(e)}if(!o.done)return Promise.resolve(u).then(function(e){r("next",e)},function(e){r("throw",e)});e(u)}return r("next")})}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(15),o=n.n(i),u=n(0),c=n.n(u),s=n(14),l=n.n(s),f=n(155),p=n(250),d=(n(251),n(805)),m=(n.n(d),this),h=function(){function e(e,t){var n=[],r=!0,a=!1,i=void 0;try{for(var o,u=e[Symbol.iterator]();!(r=(o=u.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){a=!0,i=e}finally{try{!r&&u.return&&u.return()}finally{if(a)throw i}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),v=function(e){var t=e.hashtagsFound,n=e.iHootId,i=Object(u.useState)([]),s=h(i,2),d=s[0],v=s[1],y=Object(u.useState)(!0),w=h(y,2),b=w[0],g=w[1],x=Object(u.useState)(2),S=h(x,2),k=S[0],j=S[1],A="https://soapboxapi.megahoot.net";Object(u.useEffect)(function(){!function(){var e=a(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.a.get(A+"/upload/public/p?page=1&limit=10").then(function(e){v(e.data.results)});case 2:case"end":return e.stop()}},e,m)}));return function(){return e.apply(this,arguments)}}()()},[]);var E=function(){var e=a(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.a.get(A+"/upload/public/p?page="+k+"&limit=10").then(function(e){var t=e.data.results;v([].concat(r(d),r(t))),(0===t||t<10)&&g(!1)});case 2:j(k+1);case 3:case"end":return e.stop()}},e,m)}));return function(){return e.apply(this,arguments)}}();return c.a.createElement("div",{className:"feed"},d&&c.a.createElement(f.a,{dataLength:d.length,next:E,hasMore:b},d.filter(function(e){return e.id!==n}).map(function(e){return c.a.createElement("div",{key:e.id},t.some(function(t){return e.caption.includes(t)})?c.a.createElement(p.a,{hootId:e.id,username:e.authorUsername,mimeType:e.mimeType,hootImgId:e.image,audioPoster:e.audioPoster,likes:e.likes,views:e.views,followers:e.followers,caption:e.caption,link:e.link,ephemeral:e.ephemeral,privateHoot:e.private,expiryDate:e.expiryDate,timeStamp:e.timeStamp,edited:e.edited,editedTimeStamp:e.editedTimeStamp}):null)})))};t.default=v}});
//# sourceMappingURL=BrowseMoreHoots.32618503.chunk.js.map