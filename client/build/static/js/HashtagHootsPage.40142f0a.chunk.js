webpackJsonp([1],{6579:function(e,t,r){"use strict";function n(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}function a(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,r){function n(a,o){try{var i=t[a](o),s=i.value}catch(e){return void r(e)}if(!i.done)return Promise.resolve(s).then(function(e){n("next",e)},function(e){n("throw",e)});e(s)}return n("next")})}}Object.defineProperty(t,"__esModule",{value:!0});var o=r(17),i=r.n(o),s=r(12),A=r.n(s),l=r(24),c=r(0),h=r.n(c),m=r(64),d=(r(147),r(10)),u=(r(148),r(6582)),p=r(455),f=r(6584),g=(r.n(f),this),B=function(){function e(e,t){var r=[],n=!0,a=!1,o=void 0;try{for(var i,s=e[Symbol.iterator]();!(n=(i=s.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){a=!0,o=e}finally{try{!n&&s.return&&s.return()}finally{if(a)throw o}}return r}return function(t,r){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),x=function(){var e=Object(d.h)(),t=e.hashtag,r=Object(c.useState)([]),o=B(r,2),s=o[0],f=o[1],x=Object(c.useState)([]),C=B(x,2),v=C[0],w=C[1],y=Object(c.useState)(!0),b=B(y,2),E=(b[0],b[1]),k=Object(c.useState)(2),j=B(k,2),I=j[0],S=j[1],D="https://soapboxapi.megahoot.net";Object(c.useEffect)(function(){!function(){var e=a(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A.a.all[(A.a.get(D+"/upload/p?page=1&limit=10").then(function(e){f(e.data.results)}),A.a.get(D+"/upload").then(function(e){w(e.data)}))];case 2:case"end":return e.stop()}},e,g)}));return function(){return e.apply(this,arguments)}}()()},[]);var H=(function(){var e=a(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A.a.get(D+"/upload/p?page="+I+"&limit=10").then(function(e){var t=e.data.results;f([].concat(n(s),n(t))),(0===t||t<10)&&E(!1)});case 2:S(I+1);case 3:case"end":return e.stop()}},e,g)}))}(),"#"+t),O=0;v.map(function(e){return h.a.createElement("div",{key:e.id},e.caption.includes(H)?O+=e.views:null)});return h.a.createElement(c.Fragment,null,h.a.createElement("div",{className:"hashtag-hoots-main"},h.a.createElement("div",{className:"home"},h.a.createElement("div",{className:"hashtag-hoot-wrapper"},h.a.createElement("div",{className:"hashtag-hoots-name"},h.a.createElement("div",{className:"hashtag-header"},h.a.createElement(m.a,null),t.toLowerCase()),h.a.createElement("span",null,function(e){return e<1e3?e:e>=1e3&&e<1e6?+(e/1e3).toFixed(1):e>=1e6&&e<1e9?+(e/1e6).toFixed(1):e>=1e9&&e<1e12?+(e/1e9).toFixed(1):e>=1e12?+(e/1e12).toFixed(1):void 0}(O)+function(e){return e<1e3?"":e>=1e3&&e<1e6?"K":e>=1e6&&e<1e9?"M":e>=1e9&&e<1e12?"B":e>=1e12?"T":void 0}(O)," Views")))),v.map(function(e){return h.a.createElement("div",{key:e.id},e.caption.includes(H)?h.a.createElement(p.a,{hootId:e.id,username:e.authorUsername,mimeType:e.mimeType,hootImgId:e.image,likes:e.likes,views:e.views,caption:e.caption,link:e.link,ephemeral:e.ephemeral,privateHoot:e.private,expiryDate:e.expiryDate,timeStamp:e.timeStamp,edited:e.edited,editedTimeStamp:e.editedTimeStamp}):null)}),h.a.createElement(u.a,null)),h.a.createElement(l.a,null,h.a.createElement("title",null,"#",t," Hoots on MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels")))};t.default=x},6582:function(e,t,r){"use strict";var n=r(0),a=r.n(n),o=r(10),i=function(){return a.a.createElement("p",{className:"end-hoot-msg"},a.a.createElement(o.b,{to:"/create"}," Create Hoot ")," with"," ",a.a.createElement("a",{href:"soapbox:;"},"#hashtags")," ","to get listed")};t.a=i},6584:function(e,t,r){var n=r(6585);"string"===typeof n&&(n=[[e.i,n,""]]);var a={hmr:!1};a.transform=void 0;r(6574)(n,a);n.locals&&(e.exports=n.locals)},6585:function(e,t,r){t=e.exports=r(6573)(!0),t.push([e.i,".hashtag-hoots-main::-webkit-scrollbar{display:none}.hashtag-hoots-main{width:100%;overflow-x:hidden}.hashtag-hoot-wrapper{padding-top:5rem;width:650px;height:auto;margin:0 auto}.hashtag-header{gap:.3rem;-ms-flex-align:center;align-items:center}.hashtag-header,.hashtag-hoots-name{display:-ms-flexbox;display:flex;-ms-flex-pack:start;justify-content:flex-start}.hashtag-hoots-name{width:100%;min-height:100px;-ms-flex-direction:column;flex-direction:column;word-break:break-all;padding:.5rem 1rem;font-size:2rem;font-weight:500;color:var(--primary-color);background-color:#ededff;border-radius:.5rem;border:1px solid var(--border-color);border-top:10px solid var(--secondary-color);cursor:pointer}.hashtag-hoots-name span{font-size:medium;font-weight:600;color:var(--text-color);padding-left:.2rem}@media only screen and (max-width:1050px){.hashtag-hoot-wrapper{width:auto;max-width:650px}}","",{version:3,sources:["E:/GitHub/soapbox-frontend/client/src/components/HashtagHoots/hashtagHoots.css"],names:[],mappings:"AAAA,uCACI,YAAc,CACjB,AAED,oBACI,WAAY,AACZ,iBAAmB,CACtB,AAED,sBACI,iBAAkB,AAClB,YAAa,AACb,YAAa,AACb,aAAe,CAClB,AACD,gBAGI,UAAY,AAGZ,sBAAuB,AACnB,kBAAoB,CAC3B,AACD,oCARI,oBAAqB,AACrB,aAAc,AAEd,oBAAqB,AACjB,0BAA4B,CAkCnC,AA9BD,oBACI,WAAY,AACZ,iBAAkB,AAMlB,0BAA2B,AACvB,sBAAuB,AAK3B,qBAAsB,AAEtB,mBAAqB,AAErB,eAAgB,AAChB,gBAAiB,AAGjB,2BAA4B,AAC5B,yBAAqC,AAErC,oBAAsB,AACtB,qCAAsC,AACtC,6CAA8C,AAE9C,cAAgB,CACnB,AAED,yBACI,iBAAkB,AAClB,gBAAiB,AACjB,wBAAyB,AACzB,kBAAqB,CACxB,AAGD,0CACI,sBACE,WAAY,AACZ,eAAiB,CAClB,CACJ",file:"hashtagHoots.css",sourcesContent:[".hashtag-hoots-main::-webkit-scrollbar {\r\n    display: none;\r\n}\r\n\r\n.hashtag-hoots-main {\r\n    width: 100%;\r\n    overflow-x: hidden;\r\n}\r\n\r\n.hashtag-hoot-wrapper {\r\n    padding-top: 5rem;\r\n    width: 650px;\r\n    height: auto;\r\n    margin: 0 auto;\r\n}\r\n.hashtag-header {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    gap: 0.3rem;\r\n    -ms-flex-pack: start;\r\n        justify-content: flex-start;\r\n    -ms-flex-align: center;\r\n        align-items: center;\r\n}\r\n.hashtag-hoots-name {\r\n    width: 100%;\r\n    min-height: 100px;\r\n\r\n    display: -ms-flexbox;\r\n\r\n    display: flex;\r\n    /* gap: 0.3rem; */\r\n    -ms-flex-direction: column;\r\n        flex-direction: column;\r\n    -ms-flex-pack: start;\r\n        justify-content: flex-start;\r\n    /* align-items: center; */\r\n\r\n    word-break: break-all;\r\n\r\n    padding: 0.5rem 1rem;\r\n\r\n    font-size: 2rem;\r\n    font-weight: 500;\r\n\r\n    /* color: var(--text-color); */\r\n    color: var(--primary-color);\r\n    background-color: rgb(237, 237, 255);\r\n\r\n    border-radius: 0.5rem;\r\n    border: 1px solid var(--border-color);\r\n    border-top: 10px solid var(--secondary-color);\r\n\r\n    cursor: pointer;\r\n}\r\n\r\n.hashtag-hoots-name span {\r\n    font-size: medium;\r\n    font-weight: 600;\r\n    color: var(--text-color);\r\n    padding-left: 0.2rem;\r\n}\r\n\r\n\r\n@media only screen and (max-width: 1050px) {\r\n    .hashtag-hoot-wrapper {\r\n      width: auto;\r\n      max-width: 650px;\r\n    }\r\n}"],sourceRoot:""}])}});
//# sourceMappingURL=HashtagHootsPage.40142f0a.chunk.js.map