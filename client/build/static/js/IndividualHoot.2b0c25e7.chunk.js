webpackJsonp([4],{8752:function(e,t,a){"use strict";function n(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,a){function n(r,o){try{var i=t[r](o),l=i.value}catch(e){return void a(e)}if(!i.done)return Promise.resolve(l).then(function(e){n("next",e)},function(e){n("throw",e)});e(l)}return n("next")})}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(15),o=a.n(r),i=a(0),l=a.n(i),m=a(14),c=a.n(m),s=a(39),u=a(250),p=a(16),d=a(404),f=(a.n(d),a(806)),h=(a.n(f),a(156)),v=a.n(h),y=a(157),E=a(8759),w=a(22),g=this,b=function(){function e(e,t){var a=[],n=!0,r=!1,o=void 0;try{for(var i,l=e[Symbol.iterator]();!(n=(i=l.next()).done)&&(a.push(i.value),!t||a.length!==t);n=!0);}catch(e){r=!0,o=e}finally{try{!n&&l.return&&l.return()}finally{if(r)throw o}}return a}return function(t,a){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,a);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),S=v()({loader:function(){return a.e(10).then(a.bind(null,8761))},loading:function(){return l.a.createElement(y.a,null)}}),x=function(){var e=Object(p.i)(),t=e.id;t=atob(t);var a=Object(i.useState)([]),r=b(a,2),m=r[0],d=r[1],f="https://soapboxapi.megahoot.net",h=Object(p.g)(),v=function(){var e=n(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.a.get(f+"/hoot/public/"+t).then(function(e){e.data[0]&&1==e.data[0].private?h.push("/"+Object(w.a)()+"/private/Club/"+e.data[0].authorUsername+"/"+Object(w.a)()):d(e.data)});case 2:case"end":return e.stop()}},e,g)}));return function(){return e.apply(this,arguments)}}();Object(i.useEffect)(function(){v(),window.scrollTo(0,0)},[t]);var y=[],x="";return l.a.createElement(i.Fragment,null,m&&l.a.createElement("div",{className:"individualHoot"},m.map(function(e){var t="https://www.megahoot.net/hoot/"+e.id,a=e.authorUsername,n=e.caption,r="@"+a+" on MegaHoot Soapbox: "+n;y=e.caption.split(" ").filter(function(e){return e.startsWith("#")}),x=e.id;var o;if(e.fontFamilyStyle.includes("fontFamily")){o=JSON.parse(e.fontFamilyStyle);var i=o.fontFamily||"Arial",m=o.fontSize||"20px",c=o.color||"black"}else var i=e.fontFamilyStyle||"Arial",m="20px",c="black";var p=0;e.isSensitive&&(p=e.isSensitive);var d=f+"/images/"+e.image;return l.a.createElement("div",{className:"top-margin",key:e.id},l.a.createElement(u.a,{hootId:e.id,username:e.authorUsername,mimeType:e.mimeType,hootImgId:e.image,audioPoster:e.audioPoster,likes:e.likes,views:e.views,followers:e.followers,caption:e.caption,link:e.link,ephemeral:e.ephemeral,privateHoot:e.private,expiryDate:e.expiryDate,timeStamp:e.timeStamp,edited:e.edited,editedTimeStamp:e.editedTimeStamp,fontFamilyStyle:i,fontStyleSize:m,fontColor:c,sensitivity:p}),l.a.createElement(s.a,null,l.a.createElement("title",null,r),l.a.createElement("meta",{name:"description",content:n}),l.a.createElement("meta",{name:"twitter:card",content:"summary"}),l.a.createElement("meta",{name:"twitter:creator",content:a}),l.a.createElement("meta",{name:"twitter:title",content:r}),l.a.createElement("meta",{name:"twitter:description",content:n}),l.a.createElement("meta",{name:"twitter:image",content:d}),l.a.createElement("meta",{property:"og:url",content:t}),l.a.createElement("meta",{property:"og:title",content:r}),l.a.createElement("meta",{property:"og:description",content:n}),l.a.createElement("meta",{property:"og:image",content:d})))}),l.a.createElement("div",{style:{padding:"1rem 0.5rem 0 0.5rem"}},l.a.createElement("h2",{className:"browse-more"},"Browse more Hoots",l.a.createElement("hr",{style:{marginBottom:"0.2rem"}}))),y?l.a.createElement(S,{hashtagsFound:y,iHootId:x}):l.a.createElement("div",{style:{padding:"1rem 0.5rem 0 0.5rem"}},l.a.createElement("h6",{className:"browse-more"},"Related hoots will be shown here")),l.a.createElement(E.a,null)))};t.default=x},8759:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(16),i=function(){return r.a.createElement("p",{className:"end-hoot-msg"},r.a.createElement(o.b,{to:"/create"}," Create Hoot ")," with"," ",r.a.createElement("a",{href:"soapbox:;"},"#hashtags")," ","to get listed")};t.a=i}});
//# sourceMappingURL=IndividualHoot.2b0c25e7.chunk.js.map