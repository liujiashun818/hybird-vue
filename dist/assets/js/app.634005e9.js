(function(e){function a(a){for(var n,s,c=a[0],i=a[1],d=a[2],u=0,l=[];u<c.length;u++)s=c[u],r[s]&&l.push(r[s][0]),r[s]=0;for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n]);f&&f(a);while(l.length)l.shift()();return o.push.apply(o,d||[]),t()}function t(){for(var e,a=0;a<o.length;a++){for(var t=o[a],n=!0,s=1;s<t.length;s++){var c=t[s];0!==r[c]&&(n=!1)}n&&(o.splice(a--,1),e=i(i.s=t[0]))}return e}var n={},s={app:0},r={app:0},o=[];function c(e){return i.p+"assets/js/"+({}[e]||e)+"."+{"chunk-222cee6e":"53a8ee14","chunk-2f3dbb11":"664d6489","chunk-50318490":"23b86a1b","chunk-59b7bb7f":"ecc25f31","chunk-5b1af0de":"2ec9b278","chunk-7438ed9e":"2c54cbb1","chunk-aa64f9a4":"60ee0334"}[e]+".js"}function i(a){if(n[a])return n[a].exports;var t=n[a]={i:a,l:!1,exports:{}};return e[a].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var a=[],t={"chunk-222cee6e":1,"chunk-2f3dbb11":1,"chunk-50318490":1,"chunk-59b7bb7f":1,"chunk-5b1af0de":1,"chunk-7438ed9e":1,"chunk-aa64f9a4":1};s[e]?a.push(s[e]):0!==s[e]&&t[e]&&a.push(s[e]=new Promise(function(a,t){for(var n="assets/css/"+({}[e]||e)+"."+{"chunk-222cee6e":"ff26748a","chunk-2f3dbb11":"c322ee82","chunk-50318490":"71b75003","chunk-59b7bb7f":"6251b895","chunk-5b1af0de":"e1d7e856","chunk-7438ed9e":"36e15a6a","chunk-aa64f9a4":"7ed8be55"}[e]+".css",r=i.p+n,o=document.getElementsByTagName("link"),c=0;c<o.length;c++){var d=o[c],u=d.getAttribute("data-href")||d.getAttribute("href");if("stylesheet"===d.rel&&(u===n||u===r))return a()}var l=document.getElementsByTagName("style");for(c=0;c<l.length;c++){d=l[c],u=d.getAttribute("data-href");if(u===n||u===r)return a()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=a,f.onerror=function(a){var n=a&&a.target&&a.target.src||r,o=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=n,delete s[e],f.parentNode.removeChild(f),t(o)},f.href=r;var p=document.getElementsByTagName("head")[0];p.appendChild(f)}).then(function(){s[e]=0}));var n=r[e];if(0!==n)if(n)a.push(n[2]);else{var o=new Promise(function(a,t){n=r[e]=[a,t]});a.push(n[2]=o);var d,u=document.createElement("script");u.charset="utf-8",u.timeout=120,i.nc&&u.setAttribute("nonce",i.nc),u.src=c(e),d=function(a){u.onerror=u.onload=null,clearTimeout(l);var t=r[e];if(0!==t){if(t){var n=a&&("load"===a.type?"missing":a.type),s=a&&a.target&&a.target.src,o=new Error("Loading chunk "+e+" failed.\n("+n+": "+s+")");o.type=n,o.request=s,t[1](o)}r[e]=void 0}};var l=setTimeout(function(){d({type:"timeout",target:u})},12e4);u.onerror=u.onload=d,document.head.appendChild(u)}return Promise.all(a)},i.m=e,i.c=n,i.d=function(e,a,t){i.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,a){if(1&a&&(e=i(e)),8&a)return e;if(4&a&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var n in e)i.d(t,n,function(a){return e[a]}.bind(null,n));return t},i.n=function(e){var a=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(a,"a",a),a},i.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},i.p="",i.oe=function(e){throw console.error(e),e};var d=window["webpackJsonp"]=window["webpackJsonp"]||[],u=d.push.bind(d);d.push=a,d=d.slice();for(var l=0;l<d.length;l++)a(d[l]);var f=u;o.push([0,"chunk-vendors"]),t()})({0:function(e,a,t){t("9f45"),e.exports=t("56d7")},"0d95":function(e,a,t){"use strict";var n=t("de8a"),s=t.n(n);s.a},"56d7":function(e,a,t){"use strict";t.r(a);var n={};t.r(n),t.d(n,"dateCompared",function(){return P});t("1b79"),t("e3d0"),t("3e2e"),t("c29f"),t("ea5e"),t("1f70");var s=t("6e6d"),r=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{attrs:{id:"app"}},[t("div",{staticClass:"wrap"},["Download"!==e.$route.name&&e.isSharePage?t("Share"):e._e(),t("router-view")],1)])},o=[],c=(t("3596"),t("ae82")),i=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[e.showPage?t("div",{staticClass:"share"}):e._e(),t("a",{attrs:{id:"openApp"}}),e.isOpenMask?t("div",{class:["mask",e.phoneType+"-tip"],on:{click:e.toggleMask}}):e._e()])},d=[],u=t("e20c"),l=(t("7209"),t("5221"),t("d05b"),t("f144"),t("bfe5")),f=t.n(l),p=t("591a"),h={data:function(){return{phoneType:"",isOpenMask:!1}},watch:{wakeData:{handler:function(e){console.log("watch wakeData()",e),document.title=e.title||"山西日报，讲山西故事";var a={articleId:"",type:"",sysCode:"",officeType:""};if(this.$route.path.includes("/paper"))a={articleId:this.$route.params.id,sysCode:"paper",type:"paper",officeType:""};else if(this.$route.path.includes("/detail")){var t=this.wakeData,n=t.sysCode,s=t.type;a={articleId:this.$route.params.id,sysCode:n,type:s,officeType:""}}else this.$route.path.includes("/thematic")?a={articleId:this.$route.params.articleId,sysCode:"subject",type:"subject",officeType:""}:this.$route.path.includes("/live")?a={articleId:this.$route.params.articleId,sysCode:"live",type:"live",officeType:""}:this.$route.path.includes("/local")?(a={articleId:this.$route.params.categoryId,sysCode:"",type:"",officeType:"1"},document.title=e.cityName||"山西日报，讲山西故事"):this.$route.path.includes("/shanxi")&&(a={articleId:this.$route.params.id,sysCode:"",type:"",officeType:"2"},document.title=e.office.name||"山西日报，讲山西故事");new Mlink({mlink:"AbGz",button:document.querySelector("a#openApp"),autoLaunchApp:!1,autoRedirectToDownloadUrl:!0,downloadWhenUniversalLinkFailed:!1,inapp:!1,params:a})},deep:!0}},methods:{openApp:function(){if("1"===localStorage.isWeiXin)return this.phoneType=localStorage.phoneType,this.toggleMask(),!1;var e=null;if(this.$route.path.includes("/paper"))e={param:{articleId:this.$route.params.id,sysCode:"paper",type:"paper"},path:"detail"};else if(this.$route.path.includes("/detail")){var a=this.wakeData,t=a.sysCode,n=a.type;e={param:{articleId:this.$route.params.id,sysCode:t,type:n},path:"detail"}}else this.$route.path.includes("/thematic")?e={param:{articleId:this.$route.params.articleId,sysCode:"subject",type:"subject"},path:"detail"}:this.$route.path.includes("/live")?e={param:{articleId:this.$route.params.articleId,sysCode:"live",type:"live"},path:"detail"}:this.$route.path.includes("/local")?e={param:{id:this.$route.params.categoryId,officeType:"1"},path:"gov"}:this.$route.path.includes("/shanxi")&&(e={param:{id:this.$route.params.id,officeType:"2"},path:"gov"});e.callback=function(){var e=localStorage.phoneType;window.location.href="ios"===e?"https://itunes.apple.com/cn/app/%E5%B1%B1%E8%A5%BF%E6%97%A5%E6%8A%A5%E5%AE%98%E6%96%B9%E7%89%88/id859098148?mt=8":"https://a.app.qq.com/o/simple.jsp?pkgname=com.shanxidaily.activity"};var s={scheme:{protocol:"sxrbapp"},appstore:"https://itunes.apple.com/cn/app/%E5%B1%B1%E8%A5%BF%E6%97%A5%E6%8A%A5%E5%AE%98%E6%96%B9%E7%89%88/id859098148?mt=8",yingyongbao:"https://a.app.qq.com/o/simple.jsp?pkgname=com.shanxidaily.activity",fallback:window.location.href},r=new f.a(s);r.open(e)},toggleMask:function(){this.isOpenMask=!this.isOpenMask}},computed:Object(u["a"])({},Object(p["b"])(["wakeData","showPage"]))},m=h,b=(t("0d95"),t("17cc")),j=Object(b["a"])(m,i,d,!1,null,"77bda538",null),g=j.exports,v={data:function(){return{}},created:function(){this.isSharePage=c["a"].isSharePage(),localStorage.phoneType=this.phoneType(),localStorage.isWeiXin=this.isWeiXin()},methods:{phoneType:function(){var e=navigator.userAgent,a=!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),t=e.indexOf("Android")>-1||e.indexOf("Adr")>-1;return a?"ios":t?"android":""},isWeiXin:function(){var e=window.navigator.userAgent.toLowerCase();return"micromessenger"==e.match(/MicroMessenger/i)?"1":"0"}},components:{Share:g}},y=v,k=(t("65ab"),Object(b["a"])(y,r,o,!1,null,"76d8912c",null)),w=k.exports,_=t("1e6f");s["default"].use(_["a"]);var M,S=new _["a"]({routes:[{path:"/thematic/:articleId",name:"Thematic",component:function(){return t.e("chunk-59b7bb7f").then(t.bind(null,"043d"))}},{path:"/detail/:type/:id",name:"Detail",component:function(){return t.e("chunk-aa64f9a4").then(t.bind(null,"1000"))}},{path:"/local/:categoryId",name:"Local",component:function(){return t.e("chunk-7438ed9e").then(t.bind(null,"ffe3"))}},{path:"/localist/:id",name:"LocalList",component:function(){return t.e("chunk-5b1af0de").then(t.bind(null,"13c6"))}},{path:"/live/:articleId",name:"Live",component:function(){return t.e("chunk-2f3dbb11").then(t.bind(null,"50a5"))}},{path:"/shanxi/:id",name:"ShanXi",component:function(){return t.e("chunk-50318490").then(t.bind(null,"4def"))}},{path:"/download",name:"Download",component:function(){return t.e("chunk-222cee6e").then(t.bind(null,"565b"))}}]}),x="get_date",O="save_data",D="set_show_page",T={getDate:function(e,a){var t=e.commit;t(x,a)},saveData:function(e,a){var t=e.commit;t(O,a)},setShowPage:function(e,a){var t=e.commit;t(D,a)}},$={getDate:function(e,a){return a.slice(0,-2)+":00"},wakeData:function(e){return e.wakeData},showPage:function(e){return e.showPage}},Y=t("cb1d"),A=(M={},Object(Y["a"])(M,x,function(e,a){return a.slice(0,-2)+":00"}),Object(Y["a"])(M,O,function(e,a){e.wakeData=a}),Object(Y["a"])(M,D,function(e,a){e.showPage=a}),M);s["default"].use(p["a"]);var L={wakeData:null,showPage:!1},z=new p["a"].Store({state:L,actions:T,getters:$,mutations:A}),C=(t("e71a"),t("6bf2")),E=t.n(C);E.a.locale("zh-cn",{months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"周日_周一_周二_周三_周四_周五_周六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"YYYY年MM月DD日",LLL:"YYYY年MM月DD日Ah点mm分",LLLL:"YYYY年MM月DD日ddddAh点mm分",l:"YYYY-M-D",ll:"YYYY年M月D日",lll:"YYYY年M月D日 HH:mm",llll:"YYYY年M月D日dddd HH:mm"},meridiemParse:/凌晨|早上|上午|中午|下午|晚上/,meridiemHour:function(e,a){return 12===e&&(e=0),"凌晨"===a||"早上"===a||"上午"===a?e:"下午"===a||"晚上"===a?e+12:e>=11?e:e+12},meridiem:function(e,a,t){var n=100*e+a;return n<600?"凌晨":n<900?"早上":n<1130?"上午":n<1230?"中午":n<1800?"下午":"晚上"},calendar:{sameDay:"[今天]LT",nextDay:"[明天]LT",nextWeek:"[下]ddddLT",lastDay:"[昨天]LT",lastWeek:"[上]ddddLT",sameElse:"L"},dayOfMonthOrdinalParse:/\d{1,2}(日|月|周)/,ordinal:function(e,a){switch(a){case"d":case"D":case"DDD":return e+"日";case"M":return e+"月";case"w":case"W":return e+"周";default:return e}},relativeTime:{future:"%s内",past:"%s前",s:"几秒",ss:"%d秒",m:"1分钟",mm:"%d分钟",h:"1小时",hh:"%d小时",d:"1天",dd:"%d天",M:"1个月",MM:"%d个月",y:"1年",yy:"%d年"},week:{dow:1,doy:4}});var P=function(e){var a=E()(e).startOf("minute").fromNow();return(a.indexOf("天")>-1||a.indexOf("月")>-1||a.indexOf("年")>-1)&&(a=E()(e).format("YYYY-MM-DD HH:mm")),a},I=(t("370b"),t("7f43")),H=t.n(I),U=t("660a"),N=t.n(U),B="";switch("production"){case"development":B="//sxapi.sxrbw.com/";break;case"production":B="//sxapi.sxrbw.com/";break}var W=B;H.a.defaults.baseURL=W,H.a.interceptors.request.use(function(e){return e.headers.common={"Content-Type":"application/x-www-form-urlencoded"},e.timeout=12e3,e},function(e){return null}),H.a.interceptors.response.use(function(e){var a=e.data;return a},function(e){if(-1!=e.toString().indexOf("timeout")&&console.log(e),e&&e.response){switch(e.response.status){case 400:e.message="请求错误";break;case 401:e.message="未授权，请登录";break;case 403:e.message="拒绝访问";break;case 404:e.message="请求地址出错: ".concat(e.response.config.url);break;case 405:e.message="请求地址出错:";break;case 408:e.message="请求超时";break;case 500:e.message="服务器开个小差，请稍后再试";break;case 501:e.message="服务器开个小差，请稍后再试";break;case 502:e.message="服务器开个小差，请稍后再试";break;case 503:e.message="服务器开个小差，请稍后再试";break;case 504:e.message="服务器开个小差，请稍后再试";break;case 505:e.message="HTTP版本不受支持";break;default:}e.response.data.message&&(e.message=e.response.data.message),Object(U["Toast"])({message:e.message})}return Promise.reject(e)});var q=H.a,F=t("ecd2");t("4f89"),t("70a2"),t("6183"),t("9f45"),t("eaa7");s["default"].prototype.$axios=q,s["default"].prototype.$BScroll=F["a"],s["default"].prototype.$url="//sxzwapi.sxrbw.com",Object.keys(n).map(function(e){s["default"].filter(e,n[e])}),s["default"].use(N.a),s["default"].config.productionTip=!1,new s["default"]({router:S,store:z,render:function(e){return e(w)}}).$mount("#app")},6183:function(e,a,t){},"65ab":function(e,a,t){"use strict";var n=t("9bc1"),s=t.n(n);s.a},"70a2":function(e,a,t){},"77d2":function(e,a,t){var n={"./af":"fbac","./af.js":"fbac","./ar":"f96f","./ar-dz":"e63c","./ar-dz.js":"e63c","./ar-kw":"b7bd","./ar-kw.js":"b7bd","./ar-ly":"968f","./ar-ly.js":"968f","./ar-ma":"9f9d","./ar-ma.js":"9f9d","./ar-sa":"aea5","./ar-sa.js":"aea5","./ar-tn":"d44b","./ar-tn.js":"d44b","./ar.js":"f96f","./az":"c7ed","./az.js":"c7ed","./be":"5a28","./be.js":"5a28","./bg":"1251","./bg.js":"1251","./bm":"2809","./bm.js":"2809","./bn":"b4fc","./bn.js":"b4fc","./bo":"5484","./bo.js":"5484","./br":"5adc","./br.js":"5adc","./bs":"ac10","./bs.js":"ac10","./ca":"e381","./ca.js":"e381","./cs":"aef2","./cs.js":"aef2","./cv":"6566","./cv.js":"6566","./cy":"1390","./cy.js":"1390","./da":"1ece","./da.js":"1ece","./de":"5f10","./de-at":"09c4","./de-at.js":"09c4","./de-ch":"89a2","./de-ch.js":"89a2","./de.js":"5f10","./dv":"e662","./dv.js":"e662","./el":"196b","./el.js":"196b","./en-SG":"0a32","./en-SG.js":"0a32","./en-au":"94ed","./en-au.js":"94ed","./en-ca":"2806","./en-ca.js":"2806","./en-gb":"b0dd","./en-gb.js":"b0dd","./en-ie":"7a6e","./en-ie.js":"7a6e","./en-il":"1f0f","./en-il.js":"1f0f","./en-nz":"1606","./en-nz.js":"1606","./eo":"f214","./eo.js":"f214","./es":"7d58","./es-do":"737b","./es-do.js":"737b","./es-us":"a894","./es-us.js":"a894","./es.js":"7d58","./et":"a888","./et.js":"a888","./eu":"1357","./eu.js":"1357","./fa":"0a48","./fa.js":"0a48","./fi":"c2b1","./fi.js":"c2b1","./fo":"52c4","./fo.js":"52c4","./fr":"04e6","./fr-ca":"6ad1","./fr-ca.js":"6ad1","./fr-ch":"b12f","./fr-ch.js":"b12f","./fr.js":"04e6","./fy":"ad13","./fy.js":"ad13","./ga":"369e","./ga.js":"369e","./gd":"22de","./gd.js":"22de","./gl":"f808","./gl.js":"f808","./gom-latn":"50d5","./gom-latn.js":"50d5","./gu":"e67a","./gu.js":"e67a","./he":"037c","./he.js":"037c","./hi":"3d53","./hi.js":"3d53","./hr":"678b","./hr.js":"678b","./hu":"1783","./hu.js":"1783","./hy-am":"2873","./hy-am.js":"2873","./id":"de99","./id.js":"de99","./is":"6aa2","./is.js":"6aa2","./it":"1f93","./it-ch":"2db9","./it-ch.js":"2db9","./it.js":"1f93","./ja":"6bf8","./ja.js":"6bf8","./jv":"6e55","./jv.js":"6e55","./ka":"e65f","./ka.js":"e65f","./kk":"7167","./kk.js":"7167","./km":"4668","./km.js":"4668","./kn":"e3d24","./kn.js":"e3d24","./ko":"b058","./ko.js":"b058","./ku":"017e","./ku.js":"017e","./ky":"b2bd","./ky.js":"b2bd","./lb":"e50c","./lb.js":"e50c","./lo":"ca14","./lo.js":"ca14","./lt":"3e84","./lt.js":"3e84","./lv":"ce1d","./lv.js":"ce1d","./me":"9d38","./me.js":"9d38","./mi":"3e2e8","./mi.js":"3e2e8","./mk":"d532","./mk.js":"d532","./ml":"db61","./ml.js":"db61","./mn":"7493","./mn.js":"7493","./mr":"52d8","./mr.js":"52d8","./ms":"b559","./ms-my":"7462","./ms-my.js":"7462","./ms.js":"b559","./mt":"c055","./mt.js":"c055","./my":"49e0","./my.js":"49e0","./nb":"eb1c","./nb.js":"eb1c","./ne":"0acb","./ne.js":"0acb","./nl":"7497","./nl-be":"3114","./nl-be.js":"3114","./nl.js":"7497","./nn":"9a9c","./nn.js":"9a9c","./pa-in":"c595","./pa-in.js":"c595","./pl":"801c","./pl.js":"801c","./pt":"5b08","./pt-br":"155f","./pt-br.js":"155f","./pt.js":"5b08","./ro":"05fc","./ro.js":"05fc","./ru":"90b3","./ru.js":"90b3","./sd":"99bf","./sd.js":"99bf","./se":"20d6","./se.js":"20d6","./si":"7c0b","./si.js":"7c0b","./sk":"90fc","./sk.js":"90fc","./sl":"871b","./sl.js":"871b","./sq":"b045","./sq.js":"b045","./sr":"ac81","./sr-cyrl":"a2d0","./sr-cyrl.js":"a2d0","./sr.js":"ac81","./ss":"b093","./ss.js":"b093","./sv":"12e5","./sv.js":"12e5","./sw":"38a0","./sw.js":"38a0","./ta":"a462","./ta.js":"a462","./te":"18cb","./te.js":"18cb","./tet":"0c11","./tet.js":"0c11","./tg":"d707","./tg.js":"d707","./th":"883f","./th.js":"883f","./tl-ph":"6cc0","./tl-ph.js":"6cc0","./tlh":"ab53","./tlh.js":"ab53","./tr":"e523","./tr.js":"e523","./tzl":"b192","./tzl.js":"b192","./tzm":"5604","./tzm-latn":"9f95","./tzm-latn.js":"9f95","./tzm.js":"5604","./ug-cn":"9f4f","./ug-cn.js":"9f4f","./uk":"8bd6","./uk.js":"8bd6","./ur":"9a78","./ur.js":"9a78","./uz":"4d4c","./uz-latn":"da73","./uz-latn.js":"da73","./uz.js":"4d4c","./vi":"b766","./vi.js":"b766","./x-pseudo":"2a69","./x-pseudo.js":"2a69","./yo":"fd2e","./yo.js":"fd2e","./zh-cn":"35d0","./zh-cn.js":"35d0","./zh-hk":"7b45","./zh-hk.js":"7b45","./zh-tw":"fa66","./zh-tw.js":"fa66"};function s(e){var a=r(e);return t(a)}function r(e){var a=n[e];if(!(a+1)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a}s.keys=function(){return Object.keys(n)},s.resolve=r,e.exports=s,s.id="77d2"},"9bc1":function(e,a,t){},ae82:function(e,a,t){"use strict";t("7209");var n=t("4964"),s=t("3d92"),r=(t("0cf5"),t("6b50"),t("3596"),t("debc")),o=t.n(r),c=navigator.userAgent,i=!!c.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),d=c.indexOf("Android")>-1||c.indexOf("Adr")>-1,u={changeFontSize:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3;$vm.fontSizeNum=e},refreshSub:function(e){$vm.isFollow=1*e},loadNetState:function(e,a){if(1==e&&0==a){var t=o()($vm.saveVideo).attr("size");t?(t=t/1024/1024,t=t.toFixed(1),t+="M"):t="";var n=confirm("播放视频需要消耗".concat(t,"流量，是否继续？"));n&&$vm.saveVideo.play()}else $vm.saveVideo.play()},changeNetwork:function(){var e=o()("video"),a=Array.from(e);a.map(function(e,a){if(!e.paused){$vm.saveVideo=e,e.pause();var t=o()(e).attr("size");t?(t=t/1024/1024,t=t.toFixed(1),t+="M"):t="";var n=confirm("播放视频需要消耗".concat(t,"流量，是否继续？"));n&&e.play()}})},isSharePage:function(){var e=!0;if(d)try{console.log(Object(s["a"])(window.jsobj.voiceRead)),e=!1}catch(a){}else if(i)try{console.log(Object(s["a"])(window.webkit.messageHandlers.voiceRead.postMessage)),e=!1}catch(a){}return e},checkTerminal:function(){var e="";return i?e="ios":d&&(e="android"),e},appendComment:function(e){if(e){$vm.$forceUpdate();var a=JSON.parse(e||"{}"),t=[a].concat(Object(n["a"])($vm.comments));$vm.comments=t}},loadPhraiseData:function(e){$vm.handleLikes(JSON.parse(e||"[]"))},appPostMessage:function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";if(d)try{window.jsobj[e](a)}catch(t){}else if(i)try{window.webkit.messageHandlers[e].postMessage(a)}catch(t){}}};a["a"]=u},de8a:function(e,a,t){},f144:function(e,a,t){"use strict";t("e71a");var n=function(e,a){var t=e.title,n=e.imgUrl,s=encodeURIComponent(window.location.href.split("#")[0]);a.$axios.get("/api/v2/wechat/getWechatInfo?url=".concat(s)).then(function(e){var a=e.item;console.log("getWechatInfo:",a),n||(n="http://img.sxrbw.com/data/sxapp4/dir2/20190426/code_sxrb74ee0559-dd34-4694-ac6a-954a103028fc.png"),console.log({title:t,imgUrl:n}),wx.config({debug:!1,appId:a.appId,timestamp:a.timestamp,nonceStr:a.nonceStr,signature:a.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareQZone","onMenuShareWeibo"]}),wx.ready(function(){var e={link:window.location.href,desc:"山西日报，讲山西故事",title:t,imgUrl:n};wx.onMenuShareTimeline(e),wx.onMenuShareAppMessage(e),wx.onMenuShareQQ(e),wx.onMenuShareWeibo(e),wx.onMenuShareQZone(e)}),wx.error(function(e){console.log(e)})}).catch(function(e){console.log(e)})};a["a"]=n}});
//# sourceMappingURL=app.634005e9.js.map