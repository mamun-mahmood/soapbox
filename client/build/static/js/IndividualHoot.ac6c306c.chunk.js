<<<<<<< HEAD:client/build/static/js/IndividualHoot.a47a5631.chunk.js
webpackJsonp([3],{8550:function(e,t,a){"use strict";function n(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,a){function n(r,o){try{var i=t[r](o),c=i.value}catch(e){return void a(e)}if(!i.done)return Promise.resolve(c).then(function(e){n("next",e)},function(e){n("throw",e)});e(c)}return n("next")})}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(16),o=a.n(r),i=a(0),c=a.n(i),m=a(15),l=a.n(m),u=a(37),s=a(224),p=a(17),d=a(348),h=(a.n(d),a(724)),f=(a.n(h),a(103)),v=a.n(f),E=a(128),w=a(8554),g=a(28),y=this,b=function(){function e(e,t){var a=[],n=!0,r=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(n=(i=c.next()).done)&&(a.push(i.value),!t||a.length!==t);n=!0);}catch(e){r=!0,o=e}finally{try{!n&&c.return&&c.return()}finally{if(r)throw o}}return a}return function(t,a){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,a);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),x=v()({loader:function(){return a.e(7).then(a.bind(null,8555))},loading:function(){return c.a.createElement(E.a,null)}}),j=function(){var e=Object(p.i)(),t=e.id;t=atob(t);var a=Object(i.useState)([]),r=b(a,2),m=r[0],d=r[1],h="https://soapboxapi.megahoot.net",f=Object(p.g)();Object(i.useEffect)(function(){(function(){var e=n(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.a.get(h+"/hoot/public/"+t).then(function(e){1==e.data[0].private?f.push("/"+Object(g.a)()+"/private/Club/"+e.data[0].authorUsername+"/"+Object(g.a)()):d(e.data)});case 2:case"end":return e.stop()}},e,y)}));return function(){return e.apply(this,arguments)}})()(),window.scrollTo(0,0)},[t]);var v=[],E="";return c.a.createElement(i.Fragment,null,m&&c.a.createElement("div",{className:"individualHoot"},m.map(function(e){var t="https://www.megahoot.net/hoot/"+e.id,a=e.authorUsername,n=e.caption,r="@"+a+" on MegaHoot Soapbox: "+n;v=e.caption.split(" ").filter(function(e){return e.startsWith("#")}),E=e.id;var o=h+"/images/"+e.image;return c.a.createElement("div",{className:"top-margin",key:e.id},c.a.createElement(s.a,{hootId:e.id,username:e.authorUsername,mimeType:e.mimeType,hootImgId:e.image,audioPoster:e.audioPoster,likes:e.likes,views:e.views,followers:e.followers,caption:e.caption,link:e.link,ephemeral:e.ephemeral,privateHoot:e.private,expiryDate:e.expiryDate,timeStamp:e.timeStamp,edited:e.edited,editedTimeStamp:e.editedTimeStamp}),c.a.createElement(u.a,null,c.a.createElement("title",null,r),c.a.createElement("meta",{name:"description",content:n}),c.a.createElement("meta",{name:"twitter:card",content:"summary"}),c.a.createElement("meta",{name:"twitter:creator",content:a}),c.a.createElement("meta",{name:"twitter:title",content:r}),c.a.createElement("meta",{name:"twitter:description",content:n}),c.a.createElement("meta",{name:"twitter:image",content:o}),c.a.createElement("meta",{property:"og:url",content:t}),c.a.createElement("meta",{property:"og:title",content:r}),c.a.createElement("meta",{property:"og:description",content:n}),c.a.createElement("meta",{property:"og:image",content:o})))}),c.a.createElement("div",{style:{padding:"1rem 0.5rem 0 0.5rem"}},c.a.createElement("h2",{className:"browse-more"},"Browse more Hoots",c.a.createElement("hr",{style:{marginBottom:"0.2rem"}}))),v?c.a.createElement(x,{hashtagsFound:v,iHootId:E}):c.a.createElement("div",{style:{padding:"1rem 0.5rem 0 0.5rem"}},c.a.createElement("h6",{className:"browse-more"},"Related hoots will be shown here")),c.a.createElement(w.a,null)))};t.default=j},8554:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(17),i=function(){return r.a.createElement("p",{className:"end-hoot-msg"},r.a.createElement(o.b,{to:"/create"}," Create Hoot ")," with"," ",r.a.createElement("a",{href:"soapbox:;"},"#hashtags")," ","to get listed")};t.a=i}});
//# sourceMappingURL=IndividualHoot.a47a5631.chunk.js.map
=======
webpackJsonp([5],{8541:function(e,t,a){"use strict";function n(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,a){function n(r,o){try{var i=t[r](o),c=i.value}catch(e){return void a(e)}if(!i.done)return Promise.resolve(c).then(function(e){n("next",e)},function(e){n("throw",e)});e(c)}return n("next")})}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(16),o=a.n(r),i=a(0),c=a.n(i),m=a(15),l=a.n(m),u=a(36),s=a(224),p=a(17),d=a(348),h=(a.n(d),a(724)),f=(a.n(h),a(103)),v=a.n(f),E=a(128),w=a(8547),y=a(28),g=this,b=function(){function e(e,t){var a=[],n=!0,r=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(n=(i=c.next()).done)&&(a.push(i.value),!t||a.length!==t);n=!0);}catch(e){r=!0,o=e}finally{try{!n&&c.return&&c.return()}finally{if(r)throw o}}return a}return function(t,a){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,a);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),x=v()({loader:function(){return a.e(7).then(a.bind(null,8548))},loading:function(){return c.a.createElement(E.a,null)}}),j=function(){var e=Object(p.h)(),t=e.id;t=atob(t);var a=Object(i.useState)([]),r=b(a,2),m=r[0],d=r[1],h="https://soapboxapi.megahoot.net",f=Object(p.f)();Object(i.useEffect)(function(){(function(){var e=n(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.a.get(h+"/hoot/public/"+t).then(function(e){1==e.data[0].private?f.push("/"+Object(y.a)()+"/private/Club/"+e.data[0].authorUsername+"/"+Object(y.a)()):d(e.data)});case 2:case"end":return e.stop()}},e,g)}));return function(){return e.apply(this,arguments)}})()(),window.scrollTo(0,0)},[t]);var v=[],E="";return c.a.createElement(i.Fragment,null,m&&c.a.createElement("div",{className:"individualHoot"},m.map(function(e){var t="https://www.megahoot.net/hoot/"+e.id,a=e.authorUsername,n=e.caption,r="@"+a+" on MegaHoot Soapbox: "+n;v=e.caption.split(" ").filter(function(e){return e.startsWith("#")}),E=e.id;var o=h+"/images/"+e.image;return c.a.createElement("div",{className:"top-margin",key:e.id},c.a.createElement(s.a,{hootId:e.id,username:e.authorUsername,mimeType:e.mimeType,hootImgId:e.image,audioPoster:e.audioPoster,likes:e.likes,views:e.views,followers:e.followers,caption:e.caption,link:e.link,ephemeral:e.ephemeral,privateHoot:e.private,expiryDate:e.expiryDate,timeStamp:e.timeStamp,edited:e.edited,editedTimeStamp:e.editedTimeStamp}),c.a.createElement(u.a,null,c.a.createElement("title",null,r),c.a.createElement("meta",{name:"description",content:n}),c.a.createElement("meta",{name:"twitter:card",content:"summary"}),c.a.createElement("meta",{name:"twitter:creator",content:a}),c.a.createElement("meta",{name:"twitter:title",content:r}),c.a.createElement("meta",{name:"twitter:description",content:n}),c.a.createElement("meta",{name:"twitter:image",content:o}),c.a.createElement("meta",{property:"og:url",content:t}),c.a.createElement("meta",{property:"og:title",content:r}),c.a.createElement("meta",{property:"og:description",content:n}),c.a.createElement("meta",{property:"og:image",content:o})))}),c.a.createElement("div",{style:{padding:"1rem 0.5rem 0 0.5rem"}},c.a.createElement("h2",{className:"browse-more"},"Browse more Hoots",c.a.createElement("hr",{style:{marginBottom:"0.2rem"}}))),v?c.a.createElement(x,{hashtagsFound:v,iHootId:E}):c.a.createElement("div",{style:{padding:"1rem 0.5rem 0 0.5rem"}},c.a.createElement("h6",{className:"browse-more"},"Related hoots will be shown here")),c.a.createElement(w.a,null)))};t.default=j},8547:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(17),i=function(){return r.a.createElement("p",{className:"end-hoot-msg"},r.a.createElement(o.b,{to:"/create"}," Create Hoot ")," with"," ",r.a.createElement("a",{href:"soapbox:;"},"#hashtags")," ","to get listed")};t.a=i}});
//# sourceMappingURL=IndividualHoot.ac6c306c.chunk.js.map
>>>>>>> 626386f40bbfbcfb49f034d335a31332b9e0a893:client/build/static/js/IndividualHoot.ac6c306c.chunk.js
