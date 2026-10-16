var TE=Object.defineProperty;var bE=(t,e,n)=>e in t?TE(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var qa=(t,e,n)=>(bE(t,typeof e!="symbol"?e+"":e,n),n);function AE(t,e){for(var n=0;n<e.length;n++){const r=e[n];if(typeof r!="string"&&!Array.isArray(r)){for(const i in r)if(i!=="default"&&!(i in t)){const o=Object.getOwnPropertyDescriptor(r,i);o&&Object.defineProperty(t,i,o.get?o:{enumerable:!0,get:()=>r[i]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();function w_(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var M_={exports:{}},iu={},T_={exports:{}},Je={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ia=Symbol.for("react.element"),RE=Symbol.for("react.portal"),CE=Symbol.for("react.fragment"),PE=Symbol.for("react.strict_mode"),LE=Symbol.for("react.profiler"),DE=Symbol.for("react.provider"),NE=Symbol.for("react.context"),IE=Symbol.for("react.forward_ref"),UE=Symbol.for("react.suspense"),OE=Symbol.for("react.memo"),kE=Symbol.for("react.lazy"),Um=Symbol.iterator;function FE(t){return t===null||typeof t!="object"?null:(t=Um&&t[Um]||t["@@iterator"],typeof t=="function"?t:null)}var b_={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},A_=Object.assign,R_={};function _s(t,e,n){this.props=t,this.context=e,this.refs=R_,this.updater=n||b_}_s.prototype.isReactComponent={};_s.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};_s.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function C_(){}C_.prototype=_s.prototype;function qh(t,e,n){this.props=t,this.context=e,this.refs=R_,this.updater=n||b_}var Yh=qh.prototype=new C_;Yh.constructor=qh;A_(Yh,_s.prototype);Yh.isPureReactComponent=!0;var Om=Array.isArray,P_=Object.prototype.hasOwnProperty,Kh={current:null},L_={key:!0,ref:!0,__self:!0,__source:!0};function D_(t,e,n){var r,i={},o=null,s=null;if(e!=null)for(r in e.ref!==void 0&&(s=e.ref),e.key!==void 0&&(o=""+e.key),e)P_.call(e,r)&&!L_.hasOwnProperty(r)&&(i[r]=e[r]);var a=arguments.length-2;if(a===1)i.children=n;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];i.children=l}if(t&&t.defaultProps)for(r in a=t.defaultProps,a)i[r]===void 0&&(i[r]=a[r]);return{$$typeof:Ia,type:t,key:o,ref:s,props:i,_owner:Kh.current}}function BE(t,e){return{$$typeof:Ia,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Zh(t){return typeof t=="object"&&t!==null&&t.$$typeof===Ia}function zE(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var km=/\/+/g;function od(t,e){return typeof t=="object"&&t!==null&&t.key!=null?zE(""+t.key):e.toString(36)}function Zl(t,e,n,r,i){var o=typeof t;(o==="undefined"||o==="boolean")&&(t=null);var s=!1;if(t===null)s=!0;else switch(o){case"string":case"number":s=!0;break;case"object":switch(t.$$typeof){case Ia:case RE:s=!0}}if(s)return s=t,i=i(s),t=r===""?"."+od(s,0):r,Om(i)?(n="",t!=null&&(n=t.replace(km,"$&/")+"/"),Zl(i,e,n,"",function(c){return c})):i!=null&&(Zh(i)&&(i=BE(i,n+(!i.key||s&&s.key===i.key?"":(""+i.key).replace(km,"$&/")+"/")+t)),e.push(i)),1;if(s=0,r=r===""?".":r+":",Om(t))for(var a=0;a<t.length;a++){o=t[a];var l=r+od(o,a);s+=Zl(o,e,n,l,i)}else if(l=FE(t),typeof l=="function")for(t=l.call(t),a=0;!(o=t.next()).done;)o=o.value,l=r+od(o,a++),s+=Zl(o,e,n,l,i);else if(o==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return s}function Ya(t,e,n){if(t==null)return t;var r=[],i=0;return Zl(t,r,"","",function(o){return e.call(n,o,i++)}),r}function HE(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var hn={current:null},Jl={transition:null},VE={ReactCurrentDispatcher:hn,ReactCurrentBatchConfig:Jl,ReactCurrentOwner:Kh};function N_(){throw Error("act(...) is not supported in production builds of React.")}Je.Children={map:Ya,forEach:function(t,e,n){Ya(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Ya(t,function(){e++}),e},toArray:function(t){return Ya(t,function(e){return e})||[]},only:function(t){if(!Zh(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Je.Component=_s;Je.Fragment=CE;Je.Profiler=LE;Je.PureComponent=qh;Je.StrictMode=PE;Je.Suspense=UE;Je.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=VE;Je.act=N_;Je.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=A_({},t.props),i=t.key,o=t.ref,s=t._owner;if(e!=null){if(e.ref!==void 0&&(o=e.ref,s=Kh.current),e.key!==void 0&&(i=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(l in e)P_.call(e,l)&&!L_.hasOwnProperty(l)&&(r[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)r.children=n;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];r.children=a}return{$$typeof:Ia,type:t.type,key:i,ref:o,props:r,_owner:s}};Je.createContext=function(t){return t={$$typeof:NE,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:DE,_context:t},t.Consumer=t};Je.createElement=D_;Je.createFactory=function(t){var e=D_.bind(null,t);return e.type=t,e};Je.createRef=function(){return{current:null}};Je.forwardRef=function(t){return{$$typeof:IE,render:t}};Je.isValidElement=Zh;Je.lazy=function(t){return{$$typeof:kE,_payload:{_status:-1,_result:t},_init:HE}};Je.memo=function(t,e){return{$$typeof:OE,type:t,compare:e===void 0?null:e}};Je.startTransition=function(t){var e=Jl.transition;Jl.transition={};try{t()}finally{Jl.transition=e}};Je.unstable_act=N_;Je.useCallback=function(t,e){return hn.current.useCallback(t,e)};Je.useContext=function(t){return hn.current.useContext(t)};Je.useDebugValue=function(){};Je.useDeferredValue=function(t){return hn.current.useDeferredValue(t)};Je.useEffect=function(t,e){return hn.current.useEffect(t,e)};Je.useId=function(){return hn.current.useId()};Je.useImperativeHandle=function(t,e,n){return hn.current.useImperativeHandle(t,e,n)};Je.useInsertionEffect=function(t,e){return hn.current.useInsertionEffect(t,e)};Je.useLayoutEffect=function(t,e){return hn.current.useLayoutEffect(t,e)};Je.useMemo=function(t,e){return hn.current.useMemo(t,e)};Je.useReducer=function(t,e,n){return hn.current.useReducer(t,e,n)};Je.useRef=function(t){return hn.current.useRef(t)};Je.useState=function(t){return hn.current.useState(t)};Je.useSyncExternalStore=function(t,e,n){return hn.current.useSyncExternalStore(t,e,n)};Je.useTransition=function(){return hn.current.useTransition()};Je.version="18.3.1";T_.exports=Je;var O=T_.exports;const ys=w_(O),GE=AE({__proto__:null,default:ys},[O]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var WE=O,$E=Symbol.for("react.element"),jE=Symbol.for("react.fragment"),XE=Object.prototype.hasOwnProperty,qE=WE.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,YE={key:!0,ref:!0,__self:!0,__source:!0};function I_(t,e,n){var r,i={},o=null,s=null;n!==void 0&&(o=""+n),e.key!==void 0&&(o=""+e.key),e.ref!==void 0&&(s=e.ref);for(r in e)XE.call(e,r)&&!YE.hasOwnProperty(r)&&(i[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)i[r]===void 0&&(i[r]=e[r]);return{$$typeof:$E,type:t,key:o,ref:s,props:i,_owner:qE.current}}iu.Fragment=jE;iu.jsx=I_;iu.jsxs=I_;M_.exports=iu;var Jh=M_.exports;const bf=Jh.Fragment,S=Jh.jsx,k=Jh.jsxs;var Af={},U_={exports:{}},Nn={},O_={exports:{}},k_={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(G,V){var H=G.length;G.push(V);e:for(;0<H;){var D=H-1>>>1,L=G[D];if(0<i(L,V))G[D]=V,G[H]=L,H=D;else break e}}function n(G){return G.length===0?null:G[0]}function r(G){if(G.length===0)return null;var V=G[0],H=G.pop();if(H!==V){G[0]=H;e:for(var D=0,L=G.length,Y=L>>>1;D<Y;){var Z=2*(D+1)-1,se=G[Z],B=Z+1,xe=G[B];if(0>i(se,H))B<L&&0>i(xe,se)?(G[D]=xe,G[B]=H,D=B):(G[D]=se,G[Z]=H,D=Z);else if(B<L&&0>i(xe,H))G[D]=xe,G[B]=H,D=B;else break e}}return V}function i(G,V){var H=G.sortIndex-V.sortIndex;return H!==0?H:G.id-V.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;t.unstable_now=function(){return o.now()}}else{var s=Date,a=s.now();t.unstable_now=function(){return s.now()-a}}var l=[],c=[],u=1,f=null,h=3,v=!1,_=!1,y=!1,p=typeof setTimeout=="function"?setTimeout:null,d=typeof clearTimeout=="function"?clearTimeout:null,m=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function g(G){for(var V=n(c);V!==null;){if(V.callback===null)r(c);else if(V.startTime<=G)r(c),V.sortIndex=V.expirationTime,e(l,V);else break;V=n(c)}}function x(G){if(y=!1,g(G),!_)if(n(l)!==null)_=!0,ee(w);else{var V=n(c);V!==null&&J(x,V.startTime-G)}}function w(G,V){_=!1,y&&(y=!1,d(C),C=-1),v=!0;var H=h;try{for(g(V),f=n(l);f!==null&&(!(f.expirationTime>V)||G&&!W());){var D=f.callback;if(typeof D=="function"){f.callback=null,h=f.priorityLevel;var L=D(f.expirationTime<=V);V=t.unstable_now(),typeof L=="function"?f.callback=L:f===n(l)&&r(l),g(V)}else r(l);f=n(l)}if(f!==null)var Y=!0;else{var Z=n(c);Z!==null&&J(x,Z.startTime-V),Y=!1}return Y}finally{f=null,h=H,v=!1}}var A=!1,T=null,C=-1,E=5,b=-1;function W(){return!(t.unstable_now()-b<E)}function j(){if(T!==null){var G=t.unstable_now();b=G;var V=!0;try{V=T(!0,G)}finally{V?ne():(A=!1,T=null)}}else A=!1}var ne;if(typeof m=="function")ne=function(){m(j)};else if(typeof MessageChannel<"u"){var N=new MessageChannel,q=N.port2;N.port1.onmessage=j,ne=function(){q.postMessage(null)}}else ne=function(){p(j,0)};function ee(G){T=G,A||(A=!0,ne())}function J(G,V){C=p(function(){G(t.unstable_now())},V)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(G){G.callback=null},t.unstable_continueExecution=function(){_||v||(_=!0,ee(w))},t.unstable_forceFrameRate=function(G){0>G||125<G?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):E=0<G?Math.floor(1e3/G):5},t.unstable_getCurrentPriorityLevel=function(){return h},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(G){switch(h){case 1:case 2:case 3:var V=3;break;default:V=h}var H=h;h=V;try{return G()}finally{h=H}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(G,V){switch(G){case 1:case 2:case 3:case 4:case 5:break;default:G=3}var H=h;h=G;try{return V()}finally{h=H}},t.unstable_scheduleCallback=function(G,V,H){var D=t.unstable_now();switch(typeof H=="object"&&H!==null?(H=H.delay,H=typeof H=="number"&&0<H?D+H:D):H=D,G){case 1:var L=-1;break;case 2:L=250;break;case 5:L=1073741823;break;case 4:L=1e4;break;default:L=5e3}return L=H+L,G={id:u++,callback:V,priorityLevel:G,startTime:H,expirationTime:L,sortIndex:-1},H>D?(G.sortIndex=H,e(c,G),n(l)===null&&G===n(c)&&(y?(d(C),C=-1):y=!0,J(x,H-D))):(G.sortIndex=L,e(l,G),_||v||(_=!0,ee(w))),G},t.unstable_shouldYield=W,t.unstable_wrapCallback=function(G){var V=h;return function(){var H=h;h=V;try{return G.apply(this,arguments)}finally{h=H}}}})(k_);O_.exports=k_;var KE=O_.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ZE=O,Dn=KE;function fe(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var F_=new Set,da={};function uo(t,e){ns(t,e),ns(t+"Capture",e)}function ns(t,e){for(da[t]=e,t=0;t<e.length;t++)F_.add(e[t])}var Vr=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Rf=Object.prototype.hasOwnProperty,JE=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Fm={},Bm={};function QE(t){return Rf.call(Bm,t)?!0:Rf.call(Fm,t)?!1:JE.test(t)?Bm[t]=!0:(Fm[t]=!0,!1)}function ew(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function tw(t,e,n,r){if(e===null||typeof e>"u"||ew(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function pn(t,e,n,r,i,o,s){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=o,this.removeEmptyString=s}var qt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){qt[t]=new pn(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];qt[e]=new pn(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){qt[t]=new pn(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){qt[t]=new pn(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){qt[t]=new pn(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){qt[t]=new pn(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){qt[t]=new pn(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){qt[t]=new pn(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){qt[t]=new pn(t,5,!1,t.toLowerCase(),null,!1,!1)});var Qh=/[\-:]([a-z])/g;function ep(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Qh,ep);qt[e]=new pn(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Qh,ep);qt[e]=new pn(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Qh,ep);qt[e]=new pn(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){qt[t]=new pn(t,1,!1,t.toLowerCase(),null,!1,!1)});qt.xlinkHref=new pn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){qt[t]=new pn(t,1,!1,t.toLowerCase(),null,!0,!0)});function tp(t,e,n,r){var i=qt.hasOwnProperty(e)?qt[e]:null;(i!==null?i.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(tw(e,n,i,r)&&(n=null),r||i===null?QE(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):i.mustUseProperty?t[i.propertyName]=n===null?i.type===3?!1:"":n:(e=i.attributeName,r=i.attributeNamespace,n===null?t.removeAttribute(e):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var Xr=ZE.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ka=Symbol.for("react.element"),Io=Symbol.for("react.portal"),Uo=Symbol.for("react.fragment"),np=Symbol.for("react.strict_mode"),Cf=Symbol.for("react.profiler"),B_=Symbol.for("react.provider"),z_=Symbol.for("react.context"),rp=Symbol.for("react.forward_ref"),Pf=Symbol.for("react.suspense"),Lf=Symbol.for("react.suspense_list"),ip=Symbol.for("react.memo"),ti=Symbol.for("react.lazy"),H_=Symbol.for("react.offscreen"),zm=Symbol.iterator;function Ps(t){return t===null||typeof t!="object"?null:(t=zm&&t[zm]||t["@@iterator"],typeof t=="function"?t:null)}var xt=Object.assign,sd;function js(t){if(sd===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);sd=e&&e[1]||""}return`
`+sd+t}var ad=!1;function ld(t,e){if(!t||ad)return"";ad=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var r=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){r=c}t.call(e.prototype)}else{try{throw Error()}catch(c){r=c}t()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var i=c.stack.split(`
`),o=r.stack.split(`
`),s=i.length-1,a=o.length-1;1<=s&&0<=a&&i[s]!==o[a];)a--;for(;1<=s&&0<=a;s--,a--)if(i[s]!==o[a]){if(s!==1||a!==1)do if(s--,a--,0>a||i[s]!==o[a]){var l=`
`+i[s].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=s&&0<=a);break}}}finally{ad=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?js(t):""}function nw(t){switch(t.tag){case 5:return js(t.type);case 16:return js("Lazy");case 13:return js("Suspense");case 19:return js("SuspenseList");case 0:case 2:case 15:return t=ld(t.type,!1),t;case 11:return t=ld(t.type.render,!1),t;case 1:return t=ld(t.type,!0),t;default:return""}}function Df(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Uo:return"Fragment";case Io:return"Portal";case Cf:return"Profiler";case np:return"StrictMode";case Pf:return"Suspense";case Lf:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case z_:return(t.displayName||"Context")+".Consumer";case B_:return(t._context.displayName||"Context")+".Provider";case rp:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case ip:return e=t.displayName||null,e!==null?e:Df(t.type)||"Memo";case ti:e=t._payload,t=t._init;try{return Df(t(e))}catch{}}return null}function rw(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Df(e);case 8:return e===np?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function bi(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function V_(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function iw(t){var e=V_(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,o=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return i.call(this)},set:function(s){r=""+s,o.call(this,s)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(s){r=""+s},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Za(t){t._valueTracker||(t._valueTracker=iw(t))}function G_(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=V_(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function yc(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Nf(t,e){var n=e.checked;return xt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Hm(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=bi(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function W_(t,e){e=e.checked,e!=null&&tp(t,"checked",e,!1)}function If(t,e){W_(t,e);var n=bi(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Uf(t,e.type,n):e.hasOwnProperty("defaultValue")&&Uf(t,e.type,bi(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Vm(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Uf(t,e,n){(e!=="number"||yc(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Xs=Array.isArray;function qo(t,e,n,r){if(t=t.options,e){e={};for(var i=0;i<n.length;i++)e["$"+n[i]]=!0;for(n=0;n<t.length;n++)i=e.hasOwnProperty("$"+t[n].value),t[n].selected!==i&&(t[n].selected=i),i&&r&&(t[n].defaultSelected=!0)}else{for(n=""+bi(n),e=null,i=0;i<t.length;i++){if(t[i].value===n){t[i].selected=!0,r&&(t[i].defaultSelected=!0);return}e!==null||t[i].disabled||(e=t[i])}e!==null&&(e.selected=!0)}}function Of(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(fe(91));return xt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Gm(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(fe(92));if(Xs(n)){if(1<n.length)throw Error(fe(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:bi(n)}}function $_(t,e){var n=bi(e.value),r=bi(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function Wm(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function j_(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function kf(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?j_(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Ja,X_=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,i){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,i)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Ja=Ja||document.createElement("div"),Ja.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Ja.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function fa(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Js={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},ow=["Webkit","ms","Moz","O"];Object.keys(Js).forEach(function(t){ow.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Js[e]=Js[t]})});function q_(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Js.hasOwnProperty(t)&&Js[t]?(""+e).trim():e+"px"}function Y_(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=q_(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,i):t[n]=i}}var sw=xt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ff(t,e){if(e){if(sw[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(fe(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(fe(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(fe(61))}if(e.style!=null&&typeof e.style!="object")throw Error(fe(62))}}function Bf(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var zf=null;function op(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Hf=null,Yo=null,Ko=null;function $m(t){if(t=ka(t)){if(typeof Hf!="function")throw Error(fe(280));var e=t.stateNode;e&&(e=cu(e),Hf(t.stateNode,t.type,e))}}function K_(t){Yo?Ko?Ko.push(t):Ko=[t]:Yo=t}function Z_(){if(Yo){var t=Yo,e=Ko;if(Ko=Yo=null,$m(t),e)for(t=0;t<e.length;t++)$m(e[t])}}function J_(t,e){return t(e)}function Q_(){}var cd=!1;function ey(t,e,n){if(cd)return t(e,n);cd=!0;try{return J_(t,e,n)}finally{cd=!1,(Yo!==null||Ko!==null)&&(Q_(),Z_())}}function ha(t,e){var n=t.stateNode;if(n===null)return null;var r=cu(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(fe(231,e,typeof n));return n}var Vf=!1;if(Vr)try{var Ls={};Object.defineProperty(Ls,"passive",{get:function(){Vf=!0}}),window.addEventListener("test",Ls,Ls),window.removeEventListener("test",Ls,Ls)}catch{Vf=!1}function aw(t,e,n,r,i,o,s,a,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(u){this.onError(u)}}var Qs=!1,xc=null,Sc=!1,Gf=null,lw={onError:function(t){Qs=!0,xc=t}};function cw(t,e,n,r,i,o,s,a,l){Qs=!1,xc=null,aw.apply(lw,arguments)}function uw(t,e,n,r,i,o,s,a,l){if(cw.apply(this,arguments),Qs){if(Qs){var c=xc;Qs=!1,xc=null}else throw Error(fe(198));Sc||(Sc=!0,Gf=c)}}function fo(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function ty(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function jm(t){if(fo(t)!==t)throw Error(fe(188))}function dw(t){var e=t.alternate;if(!e){if(e=fo(t),e===null)throw Error(fe(188));return e!==t?null:t}for(var n=t,r=e;;){var i=n.return;if(i===null)break;var o=i.alternate;if(o===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===o.child){for(o=i.child;o;){if(o===n)return jm(i),t;if(o===r)return jm(i),e;o=o.sibling}throw Error(fe(188))}if(n.return!==r.return)n=i,r=o;else{for(var s=!1,a=i.child;a;){if(a===n){s=!0,n=i,r=o;break}if(a===r){s=!0,r=i,n=o;break}a=a.sibling}if(!s){for(a=o.child;a;){if(a===n){s=!0,n=o,r=i;break}if(a===r){s=!0,r=o,n=i;break}a=a.sibling}if(!s)throw Error(fe(189))}}if(n.alternate!==r)throw Error(fe(190))}if(n.tag!==3)throw Error(fe(188));return n.stateNode.current===n?t:e}function ny(t){return t=dw(t),t!==null?ry(t):null}function ry(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=ry(t);if(e!==null)return e;t=t.sibling}return null}var iy=Dn.unstable_scheduleCallback,Xm=Dn.unstable_cancelCallback,fw=Dn.unstable_shouldYield,hw=Dn.unstable_requestPaint,Mt=Dn.unstable_now,pw=Dn.unstable_getCurrentPriorityLevel,sp=Dn.unstable_ImmediatePriority,oy=Dn.unstable_UserBlockingPriority,Ec=Dn.unstable_NormalPriority,mw=Dn.unstable_LowPriority,sy=Dn.unstable_IdlePriority,ou=null,_r=null;function gw(t){if(_r&&typeof _r.onCommitFiberRoot=="function")try{_r.onCommitFiberRoot(ou,t,void 0,(t.current.flags&128)===128)}catch{}}var ar=Math.clz32?Math.clz32:yw,vw=Math.log,_w=Math.LN2;function yw(t){return t>>>=0,t===0?32:31-(vw(t)/_w|0)|0}var Qa=64,el=4194304;function qs(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function wc(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,i=t.suspendedLanes,o=t.pingedLanes,s=n&268435455;if(s!==0){var a=s&~i;a!==0?r=qs(a):(o&=s,o!==0&&(r=qs(o)))}else s=n&~i,s!==0?r=qs(s):o!==0&&(r=qs(o));if(r===0)return 0;if(e!==0&&e!==r&&!(e&i)&&(i=r&-r,o=e&-e,i>=o||i===16&&(o&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-ar(e),i=1<<n,r|=t[n],e&=~i;return r}function xw(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Sw(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,i=t.expirationTimes,o=t.pendingLanes;0<o;){var s=31-ar(o),a=1<<s,l=i[s];l===-1?(!(a&n)||a&r)&&(i[s]=xw(a,e)):l<=e&&(t.expiredLanes|=a),o&=~a}}function Wf(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function ay(){var t=Qa;return Qa<<=1,!(Qa&4194240)&&(Qa=64),t}function ud(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Ua(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-ar(e),t[e]=n}function Ew(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var i=31-ar(n),o=1<<i;e[i]=0,r[i]=-1,t[i]=-1,n&=~o}}function ap(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-ar(n),i=1<<r;i&e|t[r]&e&&(t[r]|=e),n&=~i}}var ot=0;function ly(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var cy,lp,uy,dy,fy,$f=!1,tl=[],fi=null,hi=null,pi=null,pa=new Map,ma=new Map,ii=[],ww="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function qm(t,e){switch(t){case"focusin":case"focusout":fi=null;break;case"dragenter":case"dragleave":hi=null;break;case"mouseover":case"mouseout":pi=null;break;case"pointerover":case"pointerout":pa.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":ma.delete(e.pointerId)}}function Ds(t,e,n,r,i,o){return t===null||t.nativeEvent!==o?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[i]},e!==null&&(e=ka(e),e!==null&&lp(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,i!==null&&e.indexOf(i)===-1&&e.push(i),t)}function Mw(t,e,n,r,i){switch(e){case"focusin":return fi=Ds(fi,t,e,n,r,i),!0;case"dragenter":return hi=Ds(hi,t,e,n,r,i),!0;case"mouseover":return pi=Ds(pi,t,e,n,r,i),!0;case"pointerover":var o=i.pointerId;return pa.set(o,Ds(pa.get(o)||null,t,e,n,r,i)),!0;case"gotpointercapture":return o=i.pointerId,ma.set(o,Ds(ma.get(o)||null,t,e,n,r,i)),!0}return!1}function hy(t){var e=Xi(t.target);if(e!==null){var n=fo(e);if(n!==null){if(e=n.tag,e===13){if(e=ty(n),e!==null){t.blockedOn=e,fy(t.priority,function(){uy(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Ql(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=jf(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);zf=r,n.target.dispatchEvent(r),zf=null}else return e=ka(n),e!==null&&lp(e),t.blockedOn=n,!1;e.shift()}return!0}function Ym(t,e,n){Ql(t)&&n.delete(e)}function Tw(){$f=!1,fi!==null&&Ql(fi)&&(fi=null),hi!==null&&Ql(hi)&&(hi=null),pi!==null&&Ql(pi)&&(pi=null),pa.forEach(Ym),ma.forEach(Ym)}function Ns(t,e){t.blockedOn===e&&(t.blockedOn=null,$f||($f=!0,Dn.unstable_scheduleCallback(Dn.unstable_NormalPriority,Tw)))}function ga(t){function e(i){return Ns(i,t)}if(0<tl.length){Ns(tl[0],t);for(var n=1;n<tl.length;n++){var r=tl[n];r.blockedOn===t&&(r.blockedOn=null)}}for(fi!==null&&Ns(fi,t),hi!==null&&Ns(hi,t),pi!==null&&Ns(pi,t),pa.forEach(e),ma.forEach(e),n=0;n<ii.length;n++)r=ii[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<ii.length&&(n=ii[0],n.blockedOn===null);)hy(n),n.blockedOn===null&&ii.shift()}var Zo=Xr.ReactCurrentBatchConfig,Mc=!0;function bw(t,e,n,r){var i=ot,o=Zo.transition;Zo.transition=null;try{ot=1,cp(t,e,n,r)}finally{ot=i,Zo.transition=o}}function Aw(t,e,n,r){var i=ot,o=Zo.transition;Zo.transition=null;try{ot=4,cp(t,e,n,r)}finally{ot=i,Zo.transition=o}}function cp(t,e,n,r){if(Mc){var i=jf(t,e,n,r);if(i===null)xd(t,e,r,Tc,n),qm(t,r);else if(Mw(i,t,e,n,r))r.stopPropagation();else if(qm(t,r),e&4&&-1<ww.indexOf(t)){for(;i!==null;){var o=ka(i);if(o!==null&&cy(o),o=jf(t,e,n,r),o===null&&xd(t,e,r,Tc,n),o===i)break;i=o}i!==null&&r.stopPropagation()}else xd(t,e,r,null,n)}}var Tc=null;function jf(t,e,n,r){if(Tc=null,t=op(r),t=Xi(t),t!==null)if(e=fo(t),e===null)t=null;else if(n=e.tag,n===13){if(t=ty(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Tc=t,null}function py(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(pw()){case sp:return 1;case oy:return 4;case Ec:case mw:return 16;case sy:return 536870912;default:return 16}default:return 16}}var si=null,up=null,ec=null;function my(){if(ec)return ec;var t,e=up,n=e.length,r,i="value"in si?si.value:si.textContent,o=i.length;for(t=0;t<n&&e[t]===i[t];t++);var s=n-t;for(r=1;r<=s&&e[n-r]===i[o-r];r++);return ec=i.slice(t,1<r?1-r:void 0)}function tc(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function nl(){return!0}function Km(){return!1}function In(t){function e(n,r,i,o,s){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=o,this.target=s,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(o):o[a]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?nl:Km,this.isPropagationStopped=Km,this}return xt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=nl)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=nl)},persist:function(){},isPersistent:nl}),e}var xs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},dp=In(xs),Oa=xt({},xs,{view:0,detail:0}),Rw=In(Oa),dd,fd,Is,su=xt({},Oa,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:fp,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Is&&(Is&&t.type==="mousemove"?(dd=t.screenX-Is.screenX,fd=t.screenY-Is.screenY):fd=dd=0,Is=t),dd)},movementY:function(t){return"movementY"in t?t.movementY:fd}}),Zm=In(su),Cw=xt({},su,{dataTransfer:0}),Pw=In(Cw),Lw=xt({},Oa,{relatedTarget:0}),hd=In(Lw),Dw=xt({},xs,{animationName:0,elapsedTime:0,pseudoElement:0}),Nw=In(Dw),Iw=xt({},xs,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Uw=In(Iw),Ow=xt({},xs,{data:0}),Jm=In(Ow),kw={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Fw={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Bw={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function zw(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=Bw[t])?!!e[t]:!1}function fp(){return zw}var Hw=xt({},Oa,{key:function(t){if(t.key){var e=kw[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=tc(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Fw[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:fp,charCode:function(t){return t.type==="keypress"?tc(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?tc(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Vw=In(Hw),Gw=xt({},su,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Qm=In(Gw),Ww=xt({},Oa,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:fp}),$w=In(Ww),jw=xt({},xs,{propertyName:0,elapsedTime:0,pseudoElement:0}),Xw=In(jw),qw=xt({},su,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Yw=In(qw),Kw=[9,13,27,32],hp=Vr&&"CompositionEvent"in window,ea=null;Vr&&"documentMode"in document&&(ea=document.documentMode);var Zw=Vr&&"TextEvent"in window&&!ea,gy=Vr&&(!hp||ea&&8<ea&&11>=ea),eg=String.fromCharCode(32),tg=!1;function vy(t,e){switch(t){case"keyup":return Kw.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function _y(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Oo=!1;function Jw(t,e){switch(t){case"compositionend":return _y(e);case"keypress":return e.which!==32?null:(tg=!0,eg);case"textInput":return t=e.data,t===eg&&tg?null:t;default:return null}}function Qw(t,e){if(Oo)return t==="compositionend"||!hp&&vy(t,e)?(t=my(),ec=up=si=null,Oo=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return gy&&e.locale!=="ko"?null:e.data;default:return null}}var e1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ng(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!e1[t.type]:e==="textarea"}function yy(t,e,n,r){K_(r),e=bc(e,"onChange"),0<e.length&&(n=new dp("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var ta=null,va=null;function t1(t){Py(t,0)}function au(t){var e=Bo(t);if(G_(e))return t}function n1(t,e){if(t==="change")return e}var xy=!1;if(Vr){var pd;if(Vr){var md="oninput"in document;if(!md){var rg=document.createElement("div");rg.setAttribute("oninput","return;"),md=typeof rg.oninput=="function"}pd=md}else pd=!1;xy=pd&&(!document.documentMode||9<document.documentMode)}function ig(){ta&&(ta.detachEvent("onpropertychange",Sy),va=ta=null)}function Sy(t){if(t.propertyName==="value"&&au(va)){var e=[];yy(e,va,t,op(t)),ey(t1,e)}}function r1(t,e,n){t==="focusin"?(ig(),ta=e,va=n,ta.attachEvent("onpropertychange",Sy)):t==="focusout"&&ig()}function i1(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return au(va)}function o1(t,e){if(t==="click")return au(e)}function s1(t,e){if(t==="input"||t==="change")return au(e)}function a1(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var ur=typeof Object.is=="function"?Object.is:a1;function _a(t,e){if(ur(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Rf.call(e,i)||!ur(t[i],e[i]))return!1}return!0}function og(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function sg(t,e){var n=og(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=og(n)}}function Ey(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Ey(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function wy(){for(var t=window,e=yc();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=yc(t.document)}return e}function pp(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function l1(t){var e=wy(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&Ey(n.ownerDocument.documentElement,n)){if(r!==null&&pp(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var i=n.textContent.length,o=Math.min(r.start,i);r=r.end===void 0?o:Math.min(r.end,i),!t.extend&&o>r&&(i=r,r=o,o=i),i=sg(n,o);var s=sg(n,r);i&&s&&(t.rangeCount!==1||t.anchorNode!==i.node||t.anchorOffset!==i.offset||t.focusNode!==s.node||t.focusOffset!==s.offset)&&(e=e.createRange(),e.setStart(i.node,i.offset),t.removeAllRanges(),o>r?(t.addRange(e),t.extend(s.node,s.offset)):(e.setEnd(s.node,s.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var c1=Vr&&"documentMode"in document&&11>=document.documentMode,ko=null,Xf=null,na=null,qf=!1;function ag(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;qf||ko==null||ko!==yc(r)||(r=ko,"selectionStart"in r&&pp(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),na&&_a(na,r)||(na=r,r=bc(Xf,"onSelect"),0<r.length&&(e=new dp("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=ko)))}function rl(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Fo={animationend:rl("Animation","AnimationEnd"),animationiteration:rl("Animation","AnimationIteration"),animationstart:rl("Animation","AnimationStart"),transitionend:rl("Transition","TransitionEnd")},gd={},My={};Vr&&(My=document.createElement("div").style,"AnimationEvent"in window||(delete Fo.animationend.animation,delete Fo.animationiteration.animation,delete Fo.animationstart.animation),"TransitionEvent"in window||delete Fo.transitionend.transition);function lu(t){if(gd[t])return gd[t];if(!Fo[t])return t;var e=Fo[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in My)return gd[t]=e[n];return t}var Ty=lu("animationend"),by=lu("animationiteration"),Ay=lu("animationstart"),Ry=lu("transitionend"),Cy=new Map,lg="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Pi(t,e){Cy.set(t,e),uo(e,[t])}for(var vd=0;vd<lg.length;vd++){var _d=lg[vd],u1=_d.toLowerCase(),d1=_d[0].toUpperCase()+_d.slice(1);Pi(u1,"on"+d1)}Pi(Ty,"onAnimationEnd");Pi(by,"onAnimationIteration");Pi(Ay,"onAnimationStart");Pi("dblclick","onDoubleClick");Pi("focusin","onFocus");Pi("focusout","onBlur");Pi(Ry,"onTransitionEnd");ns("onMouseEnter",["mouseout","mouseover"]);ns("onMouseLeave",["mouseout","mouseover"]);ns("onPointerEnter",["pointerout","pointerover"]);ns("onPointerLeave",["pointerout","pointerover"]);uo("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));uo("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));uo("onBeforeInput",["compositionend","keypress","textInput","paste"]);uo("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));uo("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));uo("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ys="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),f1=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ys));function cg(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,uw(r,e,void 0,t),t.currentTarget=null}function Py(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],i=r.event;r=r.listeners;e:{var o=void 0;if(e)for(var s=r.length-1;0<=s;s--){var a=r[s],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==o&&i.isPropagationStopped())break e;cg(i,a,c),o=l}else for(s=0;s<r.length;s++){if(a=r[s],l=a.instance,c=a.currentTarget,a=a.listener,l!==o&&i.isPropagationStopped())break e;cg(i,a,c),o=l}}}if(Sc)throw t=Gf,Sc=!1,Gf=null,t}function ht(t,e){var n=e[Qf];n===void 0&&(n=e[Qf]=new Set);var r=t+"__bubble";n.has(r)||(Ly(e,t,2,!1),n.add(r))}function yd(t,e,n){var r=0;e&&(r|=4),Ly(n,t,r,e)}var il="_reactListening"+Math.random().toString(36).slice(2);function ya(t){if(!t[il]){t[il]=!0,F_.forEach(function(n){n!=="selectionchange"&&(f1.has(n)||yd(n,!1,t),yd(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[il]||(e[il]=!0,yd("selectionchange",!1,e))}}function Ly(t,e,n,r){switch(py(e)){case 1:var i=bw;break;case 4:i=Aw;break;default:i=cp}n=i.bind(null,e,n,t),i=void 0,!Vf||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(i=!0),r?i!==void 0?t.addEventListener(e,n,{capture:!0,passive:i}):t.addEventListener(e,n,!0):i!==void 0?t.addEventListener(e,n,{passive:i}):t.addEventListener(e,n,!1)}function xd(t,e,n,r,i){var o=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var a=r.stateNode.containerInfo;if(a===i||a.nodeType===8&&a.parentNode===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&(l=s.stateNode.containerInfo,l===i||l.nodeType===8&&l.parentNode===i))return;s=s.return}for(;a!==null;){if(s=Xi(a),s===null)return;if(l=s.tag,l===5||l===6){r=o=s;continue e}a=a.parentNode}}r=r.return}ey(function(){var c=o,u=op(n),f=[];e:{var h=Cy.get(t);if(h!==void 0){var v=dp,_=t;switch(t){case"keypress":if(tc(n)===0)break e;case"keydown":case"keyup":v=Vw;break;case"focusin":_="focus",v=hd;break;case"focusout":_="blur",v=hd;break;case"beforeblur":case"afterblur":v=hd;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":v=Zm;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":v=Pw;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":v=$w;break;case Ty:case by:case Ay:v=Nw;break;case Ry:v=Xw;break;case"scroll":v=Rw;break;case"wheel":v=Yw;break;case"copy":case"cut":case"paste":v=Uw;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":v=Qm}var y=(e&4)!==0,p=!y&&t==="scroll",d=y?h!==null?h+"Capture":null:h;y=[];for(var m=c,g;m!==null;){g=m;var x=g.stateNode;if(g.tag===5&&x!==null&&(g=x,d!==null&&(x=ha(m,d),x!=null&&y.push(xa(m,x,g)))),p)break;m=m.return}0<y.length&&(h=new v(h,_,null,n,u),f.push({event:h,listeners:y}))}}if(!(e&7)){e:{if(h=t==="mouseover"||t==="pointerover",v=t==="mouseout"||t==="pointerout",h&&n!==zf&&(_=n.relatedTarget||n.fromElement)&&(Xi(_)||_[Gr]))break e;if((v||h)&&(h=u.window===u?u:(h=u.ownerDocument)?h.defaultView||h.parentWindow:window,v?(_=n.relatedTarget||n.toElement,v=c,_=_?Xi(_):null,_!==null&&(p=fo(_),_!==p||_.tag!==5&&_.tag!==6)&&(_=null)):(v=null,_=c),v!==_)){if(y=Zm,x="onMouseLeave",d="onMouseEnter",m="mouse",(t==="pointerout"||t==="pointerover")&&(y=Qm,x="onPointerLeave",d="onPointerEnter",m="pointer"),p=v==null?h:Bo(v),g=_==null?h:Bo(_),h=new y(x,m+"leave",v,n,u),h.target=p,h.relatedTarget=g,x=null,Xi(u)===c&&(y=new y(d,m+"enter",_,n,u),y.target=g,y.relatedTarget=p,x=y),p=x,v&&_)t:{for(y=v,d=_,m=0,g=y;g;g=po(g))m++;for(g=0,x=d;x;x=po(x))g++;for(;0<m-g;)y=po(y),m--;for(;0<g-m;)d=po(d),g--;for(;m--;){if(y===d||d!==null&&y===d.alternate)break t;y=po(y),d=po(d)}y=null}else y=null;v!==null&&ug(f,h,v,y,!1),_!==null&&p!==null&&ug(f,p,_,y,!0)}}e:{if(h=c?Bo(c):window,v=h.nodeName&&h.nodeName.toLowerCase(),v==="select"||v==="input"&&h.type==="file")var w=n1;else if(ng(h))if(xy)w=s1;else{w=i1;var A=r1}else(v=h.nodeName)&&v.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(w=o1);if(w&&(w=w(t,c))){yy(f,w,n,u);break e}A&&A(t,h,c),t==="focusout"&&(A=h._wrapperState)&&A.controlled&&h.type==="number"&&Uf(h,"number",h.value)}switch(A=c?Bo(c):window,t){case"focusin":(ng(A)||A.contentEditable==="true")&&(ko=A,Xf=c,na=null);break;case"focusout":na=Xf=ko=null;break;case"mousedown":qf=!0;break;case"contextmenu":case"mouseup":case"dragend":qf=!1,ag(f,n,u);break;case"selectionchange":if(c1)break;case"keydown":case"keyup":ag(f,n,u)}var T;if(hp)e:{switch(t){case"compositionstart":var C="onCompositionStart";break e;case"compositionend":C="onCompositionEnd";break e;case"compositionupdate":C="onCompositionUpdate";break e}C=void 0}else Oo?vy(t,n)&&(C="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(C="onCompositionStart");C&&(gy&&n.locale!=="ko"&&(Oo||C!=="onCompositionStart"?C==="onCompositionEnd"&&Oo&&(T=my()):(si=u,up="value"in si?si.value:si.textContent,Oo=!0)),A=bc(c,C),0<A.length&&(C=new Jm(C,t,null,n,u),f.push({event:C,listeners:A}),T?C.data=T:(T=_y(n),T!==null&&(C.data=T)))),(T=Zw?Jw(t,n):Qw(t,n))&&(c=bc(c,"onBeforeInput"),0<c.length&&(u=new Jm("onBeforeInput","beforeinput",null,n,u),f.push({event:u,listeners:c}),u.data=T))}Py(f,e)})}function xa(t,e,n){return{instance:t,listener:e,currentTarget:n}}function bc(t,e){for(var n=e+"Capture",r=[];t!==null;){var i=t,o=i.stateNode;i.tag===5&&o!==null&&(i=o,o=ha(t,n),o!=null&&r.unshift(xa(t,o,i)),o=ha(t,e),o!=null&&r.push(xa(t,o,i))),t=t.return}return r}function po(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function ug(t,e,n,r,i){for(var o=e._reactName,s=[];n!==null&&n!==r;){var a=n,l=a.alternate,c=a.stateNode;if(l!==null&&l===r)break;a.tag===5&&c!==null&&(a=c,i?(l=ha(n,o),l!=null&&s.unshift(xa(n,l,a))):i||(l=ha(n,o),l!=null&&s.push(xa(n,l,a)))),n=n.return}s.length!==0&&t.push({event:e,listeners:s})}var h1=/\r\n?/g,p1=/\u0000|\uFFFD/g;function dg(t){return(typeof t=="string"?t:""+t).replace(h1,`
`).replace(p1,"")}function ol(t,e,n){if(e=dg(e),dg(t)!==e&&n)throw Error(fe(425))}function Ac(){}var Yf=null,Kf=null;function Zf(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Jf=typeof setTimeout=="function"?setTimeout:void 0,m1=typeof clearTimeout=="function"?clearTimeout:void 0,fg=typeof Promise=="function"?Promise:void 0,g1=typeof queueMicrotask=="function"?queueMicrotask:typeof fg<"u"?function(t){return fg.resolve(null).then(t).catch(v1)}:Jf;function v1(t){setTimeout(function(){throw t})}function Sd(t,e){var n=e,r=0;do{var i=n.nextSibling;if(t.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){t.removeChild(i),ga(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);ga(e)}function mi(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function hg(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Ss=Math.random().toString(36).slice(2),vr="__reactFiber$"+Ss,Sa="__reactProps$"+Ss,Gr="__reactContainer$"+Ss,Qf="__reactEvents$"+Ss,_1="__reactListeners$"+Ss,y1="__reactHandles$"+Ss;function Xi(t){var e=t[vr];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Gr]||n[vr]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=hg(t);t!==null;){if(n=t[vr])return n;t=hg(t)}return e}t=n,n=t.parentNode}return null}function ka(t){return t=t[vr]||t[Gr],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Bo(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(fe(33))}function cu(t){return t[Sa]||null}var eh=[],zo=-1;function Li(t){return{current:t}}function mt(t){0>zo||(t.current=eh[zo],eh[zo]=null,zo--)}function dt(t,e){zo++,eh[zo]=t.current,t.current=e}var Ai={},nn=Li(Ai),_n=Li(!1),no=Ai;function rs(t,e){var n=t.type.contextTypes;if(!n)return Ai;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var i={},o;for(o in n)i[o]=e[o];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=i),i}function yn(t){return t=t.childContextTypes,t!=null}function Rc(){mt(_n),mt(nn)}function pg(t,e,n){if(nn.current!==Ai)throw Error(fe(168));dt(nn,e),dt(_n,n)}function Dy(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in e))throw Error(fe(108,rw(t)||"Unknown",i));return xt({},n,r)}function Cc(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Ai,no=nn.current,dt(nn,t),dt(_n,_n.current),!0}function mg(t,e,n){var r=t.stateNode;if(!r)throw Error(fe(169));n?(t=Dy(t,e,no),r.__reactInternalMemoizedMergedChildContext=t,mt(_n),mt(nn),dt(nn,t)):mt(_n),dt(_n,n)}var Ur=null,uu=!1,Ed=!1;function Ny(t){Ur===null?Ur=[t]:Ur.push(t)}function x1(t){uu=!0,Ny(t)}function Di(){if(!Ed&&Ur!==null){Ed=!0;var t=0,e=ot;try{var n=Ur;for(ot=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}Ur=null,uu=!1}catch(i){throw Ur!==null&&(Ur=Ur.slice(t+1)),iy(sp,Di),i}finally{ot=e,Ed=!1}}return null}var Ho=[],Vo=0,Pc=null,Lc=0,Fn=[],Bn=0,ro=null,kr=1,Fr="";function Vi(t,e){Ho[Vo++]=Lc,Ho[Vo++]=Pc,Pc=t,Lc=e}function Iy(t,e,n){Fn[Bn++]=kr,Fn[Bn++]=Fr,Fn[Bn++]=ro,ro=t;var r=kr;t=Fr;var i=32-ar(r)-1;r&=~(1<<i),n+=1;var o=32-ar(e)+i;if(30<o){var s=i-i%5;o=(r&(1<<s)-1).toString(32),r>>=s,i-=s,kr=1<<32-ar(e)+i|n<<i|r,Fr=o+t}else kr=1<<o|n<<i|r,Fr=t}function mp(t){t.return!==null&&(Vi(t,1),Iy(t,1,0))}function gp(t){for(;t===Pc;)Pc=Ho[--Vo],Ho[Vo]=null,Lc=Ho[--Vo],Ho[Vo]=null;for(;t===ro;)ro=Fn[--Bn],Fn[Bn]=null,Fr=Fn[--Bn],Fn[Bn]=null,kr=Fn[--Bn],Fn[Bn]=null}var Pn=null,Rn=null,vt=!1,nr=null;function Uy(t,e){var n=Gn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function gg(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Pn=t,Rn=mi(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Pn=t,Rn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=ro!==null?{id:kr,overflow:Fr}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Gn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Pn=t,Rn=null,!0):!1;default:return!1}}function th(t){return(t.mode&1)!==0&&(t.flags&128)===0}function nh(t){if(vt){var e=Rn;if(e){var n=e;if(!gg(t,e)){if(th(t))throw Error(fe(418));e=mi(n.nextSibling);var r=Pn;e&&gg(t,e)?Uy(r,n):(t.flags=t.flags&-4097|2,vt=!1,Pn=t)}}else{if(th(t))throw Error(fe(418));t.flags=t.flags&-4097|2,vt=!1,Pn=t}}}function vg(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Pn=t}function sl(t){if(t!==Pn)return!1;if(!vt)return vg(t),vt=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Zf(t.type,t.memoizedProps)),e&&(e=Rn)){if(th(t))throw Oy(),Error(fe(418));for(;e;)Uy(t,e),e=mi(e.nextSibling)}if(vg(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(fe(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Rn=mi(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Rn=null}}else Rn=Pn?mi(t.stateNode.nextSibling):null;return!0}function Oy(){for(var t=Rn;t;)t=mi(t.nextSibling)}function is(){Rn=Pn=null,vt=!1}function vp(t){nr===null?nr=[t]:nr.push(t)}var S1=Xr.ReactCurrentBatchConfig;function Us(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(fe(309));var r=n.stateNode}if(!r)throw Error(fe(147,t));var i=r,o=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===o?e.ref:(e=function(s){var a=i.refs;s===null?delete a[o]:a[o]=s},e._stringRef=o,e)}if(typeof t!="string")throw Error(fe(284));if(!n._owner)throw Error(fe(290,t))}return t}function al(t,e){throw t=Object.prototype.toString.call(e),Error(fe(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function _g(t){var e=t._init;return e(t._payload)}function ky(t){function e(d,m){if(t){var g=d.deletions;g===null?(d.deletions=[m],d.flags|=16):g.push(m)}}function n(d,m){if(!t)return null;for(;m!==null;)e(d,m),m=m.sibling;return null}function r(d,m){for(d=new Map;m!==null;)m.key!==null?d.set(m.key,m):d.set(m.index,m),m=m.sibling;return d}function i(d,m){return d=yi(d,m),d.index=0,d.sibling=null,d}function o(d,m,g){return d.index=g,t?(g=d.alternate,g!==null?(g=g.index,g<m?(d.flags|=2,m):g):(d.flags|=2,m)):(d.flags|=1048576,m)}function s(d){return t&&d.alternate===null&&(d.flags|=2),d}function a(d,m,g,x){return m===null||m.tag!==6?(m=Cd(g,d.mode,x),m.return=d,m):(m=i(m,g),m.return=d,m)}function l(d,m,g,x){var w=g.type;return w===Uo?u(d,m,g.props.children,x,g.key):m!==null&&(m.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===ti&&_g(w)===m.type)?(x=i(m,g.props),x.ref=Us(d,m,g),x.return=d,x):(x=lc(g.type,g.key,g.props,null,d.mode,x),x.ref=Us(d,m,g),x.return=d,x)}function c(d,m,g,x){return m===null||m.tag!==4||m.stateNode.containerInfo!==g.containerInfo||m.stateNode.implementation!==g.implementation?(m=Pd(g,d.mode,x),m.return=d,m):(m=i(m,g.children||[]),m.return=d,m)}function u(d,m,g,x,w){return m===null||m.tag!==7?(m=Ji(g,d.mode,x,w),m.return=d,m):(m=i(m,g),m.return=d,m)}function f(d,m,g){if(typeof m=="string"&&m!==""||typeof m=="number")return m=Cd(""+m,d.mode,g),m.return=d,m;if(typeof m=="object"&&m!==null){switch(m.$$typeof){case Ka:return g=lc(m.type,m.key,m.props,null,d.mode,g),g.ref=Us(d,null,m),g.return=d,g;case Io:return m=Pd(m,d.mode,g),m.return=d,m;case ti:var x=m._init;return f(d,x(m._payload),g)}if(Xs(m)||Ps(m))return m=Ji(m,d.mode,g,null),m.return=d,m;al(d,m)}return null}function h(d,m,g,x){var w=m!==null?m.key:null;if(typeof g=="string"&&g!==""||typeof g=="number")return w!==null?null:a(d,m,""+g,x);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Ka:return g.key===w?l(d,m,g,x):null;case Io:return g.key===w?c(d,m,g,x):null;case ti:return w=g._init,h(d,m,w(g._payload),x)}if(Xs(g)||Ps(g))return w!==null?null:u(d,m,g,x,null);al(d,g)}return null}function v(d,m,g,x,w){if(typeof x=="string"&&x!==""||typeof x=="number")return d=d.get(g)||null,a(m,d,""+x,w);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Ka:return d=d.get(x.key===null?g:x.key)||null,l(m,d,x,w);case Io:return d=d.get(x.key===null?g:x.key)||null,c(m,d,x,w);case ti:var A=x._init;return v(d,m,g,A(x._payload),w)}if(Xs(x)||Ps(x))return d=d.get(g)||null,u(m,d,x,w,null);al(m,x)}return null}function _(d,m,g,x){for(var w=null,A=null,T=m,C=m=0,E=null;T!==null&&C<g.length;C++){T.index>C?(E=T,T=null):E=T.sibling;var b=h(d,T,g[C],x);if(b===null){T===null&&(T=E);break}t&&T&&b.alternate===null&&e(d,T),m=o(b,m,C),A===null?w=b:A.sibling=b,A=b,T=E}if(C===g.length)return n(d,T),vt&&Vi(d,C),w;if(T===null){for(;C<g.length;C++)T=f(d,g[C],x),T!==null&&(m=o(T,m,C),A===null?w=T:A.sibling=T,A=T);return vt&&Vi(d,C),w}for(T=r(d,T);C<g.length;C++)E=v(T,d,C,g[C],x),E!==null&&(t&&E.alternate!==null&&T.delete(E.key===null?C:E.key),m=o(E,m,C),A===null?w=E:A.sibling=E,A=E);return t&&T.forEach(function(W){return e(d,W)}),vt&&Vi(d,C),w}function y(d,m,g,x){var w=Ps(g);if(typeof w!="function")throw Error(fe(150));if(g=w.call(g),g==null)throw Error(fe(151));for(var A=w=null,T=m,C=m=0,E=null,b=g.next();T!==null&&!b.done;C++,b=g.next()){T.index>C?(E=T,T=null):E=T.sibling;var W=h(d,T,b.value,x);if(W===null){T===null&&(T=E);break}t&&T&&W.alternate===null&&e(d,T),m=o(W,m,C),A===null?w=W:A.sibling=W,A=W,T=E}if(b.done)return n(d,T),vt&&Vi(d,C),w;if(T===null){for(;!b.done;C++,b=g.next())b=f(d,b.value,x),b!==null&&(m=o(b,m,C),A===null?w=b:A.sibling=b,A=b);return vt&&Vi(d,C),w}for(T=r(d,T);!b.done;C++,b=g.next())b=v(T,d,C,b.value,x),b!==null&&(t&&b.alternate!==null&&T.delete(b.key===null?C:b.key),m=o(b,m,C),A===null?w=b:A.sibling=b,A=b);return t&&T.forEach(function(j){return e(d,j)}),vt&&Vi(d,C),w}function p(d,m,g,x){if(typeof g=="object"&&g!==null&&g.type===Uo&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case Ka:e:{for(var w=g.key,A=m;A!==null;){if(A.key===w){if(w=g.type,w===Uo){if(A.tag===7){n(d,A.sibling),m=i(A,g.props.children),m.return=d,d=m;break e}}else if(A.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===ti&&_g(w)===A.type){n(d,A.sibling),m=i(A,g.props),m.ref=Us(d,A,g),m.return=d,d=m;break e}n(d,A);break}else e(d,A);A=A.sibling}g.type===Uo?(m=Ji(g.props.children,d.mode,x,g.key),m.return=d,d=m):(x=lc(g.type,g.key,g.props,null,d.mode,x),x.ref=Us(d,m,g),x.return=d,d=x)}return s(d);case Io:e:{for(A=g.key;m!==null;){if(m.key===A)if(m.tag===4&&m.stateNode.containerInfo===g.containerInfo&&m.stateNode.implementation===g.implementation){n(d,m.sibling),m=i(m,g.children||[]),m.return=d,d=m;break e}else{n(d,m);break}else e(d,m);m=m.sibling}m=Pd(g,d.mode,x),m.return=d,d=m}return s(d);case ti:return A=g._init,p(d,m,A(g._payload),x)}if(Xs(g))return _(d,m,g,x);if(Ps(g))return y(d,m,g,x);al(d,g)}return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,m!==null&&m.tag===6?(n(d,m.sibling),m=i(m,g),m.return=d,d=m):(n(d,m),m=Cd(g,d.mode,x),m.return=d,d=m),s(d)):n(d,m)}return p}var os=ky(!0),Fy=ky(!1),Dc=Li(null),Nc=null,Go=null,_p=null;function yp(){_p=Go=Nc=null}function xp(t){var e=Dc.current;mt(Dc),t._currentValue=e}function rh(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function Jo(t,e){Nc=t,_p=Go=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(vn=!0),t.firstContext=null)}function $n(t){var e=t._currentValue;if(_p!==t)if(t={context:t,memoizedValue:e,next:null},Go===null){if(Nc===null)throw Error(fe(308));Go=t,Nc.dependencies={lanes:0,firstContext:t}}else Go=Go.next=t;return e}var qi=null;function Sp(t){qi===null?qi=[t]:qi.push(t)}function By(t,e,n,r){var i=e.interleaved;return i===null?(n.next=n,Sp(e)):(n.next=i.next,i.next=n),e.interleaved=n,Wr(t,r)}function Wr(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var ni=!1;function Ep(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function zy(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Hr(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function gi(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,it&2){var i=r.pending;return i===null?e.next=e:(e.next=i.next,i.next=e),r.pending=e,Wr(t,n)}return i=r.interleaved,i===null?(e.next=e,Sp(r)):(e.next=i.next,i.next=e),r.interleaved=e,Wr(t,n)}function nc(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,ap(t,n)}}function yg(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var s={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?i=o=s:o=o.next=s,n=n.next}while(n!==null);o===null?i=o=e:o=o.next=e}else i=o=e;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:o,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Ic(t,e,n,r){var i=t.updateQueue;ni=!1;var o=i.firstBaseUpdate,s=i.lastBaseUpdate,a=i.shared.pending;if(a!==null){i.shared.pending=null;var l=a,c=l.next;l.next=null,s===null?o=c:s.next=c,s=l;var u=t.alternate;u!==null&&(u=u.updateQueue,a=u.lastBaseUpdate,a!==s&&(a===null?u.firstBaseUpdate=c:a.next=c,u.lastBaseUpdate=l))}if(o!==null){var f=i.baseState;s=0,u=c=l=null,a=o;do{var h=a.lane,v=a.eventTime;if((r&h)===h){u!==null&&(u=u.next={eventTime:v,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var _=t,y=a;switch(h=e,v=n,y.tag){case 1:if(_=y.payload,typeof _=="function"){f=_.call(v,f,h);break e}f=_;break e;case 3:_.flags=_.flags&-65537|128;case 0:if(_=y.payload,h=typeof _=="function"?_.call(v,f,h):_,h==null)break e;f=xt({},f,h);break e;case 2:ni=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,h=i.effects,h===null?i.effects=[a]:h.push(a))}else v={eventTime:v,lane:h,tag:a.tag,payload:a.payload,callback:a.callback,next:null},u===null?(c=u=v,l=f):u=u.next=v,s|=h;if(a=a.next,a===null){if(a=i.shared.pending,a===null)break;h=a,a=h.next,h.next=null,i.lastBaseUpdate=h,i.shared.pending=null}}while(1);if(u===null&&(l=f),i.baseState=l,i.firstBaseUpdate=c,i.lastBaseUpdate=u,e=i.shared.interleaved,e!==null){i=e;do s|=i.lane,i=i.next;while(i!==e)}else o===null&&(i.shared.lanes=0);oo|=s,t.lanes=s,t.memoizedState=f}}function xg(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(fe(191,i));i.call(r)}}}var Fa={},yr=Li(Fa),Ea=Li(Fa),wa=Li(Fa);function Yi(t){if(t===Fa)throw Error(fe(174));return t}function wp(t,e){switch(dt(wa,e),dt(Ea,t),dt(yr,Fa),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:kf(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=kf(e,t)}mt(yr),dt(yr,e)}function ss(){mt(yr),mt(Ea),mt(wa)}function Hy(t){Yi(wa.current);var e=Yi(yr.current),n=kf(e,t.type);e!==n&&(dt(Ea,t),dt(yr,n))}function Mp(t){Ea.current===t&&(mt(yr),mt(Ea))}var _t=Li(0);function Uc(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var wd=[];function Tp(){for(var t=0;t<wd.length;t++)wd[t]._workInProgressVersionPrimary=null;wd.length=0}var rc=Xr.ReactCurrentDispatcher,Md=Xr.ReactCurrentBatchConfig,io=0,yt=null,Nt=null,zt=null,Oc=!1,ra=!1,Ma=0,E1=0;function Yt(){throw Error(fe(321))}function bp(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!ur(t[n],e[n]))return!1;return!0}function Ap(t,e,n,r,i,o){if(io=o,yt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,rc.current=t===null||t.memoizedState===null?b1:A1,t=n(r,i),ra){o=0;do{if(ra=!1,Ma=0,25<=o)throw Error(fe(301));o+=1,zt=Nt=null,e.updateQueue=null,rc.current=R1,t=n(r,i)}while(ra)}if(rc.current=kc,e=Nt!==null&&Nt.next!==null,io=0,zt=Nt=yt=null,Oc=!1,e)throw Error(fe(300));return t}function Rp(){var t=Ma!==0;return Ma=0,t}function mr(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return zt===null?yt.memoizedState=zt=t:zt=zt.next=t,zt}function jn(){if(Nt===null){var t=yt.alternate;t=t!==null?t.memoizedState:null}else t=Nt.next;var e=zt===null?yt.memoizedState:zt.next;if(e!==null)zt=e,Nt=t;else{if(t===null)throw Error(fe(310));Nt=t,t={memoizedState:Nt.memoizedState,baseState:Nt.baseState,baseQueue:Nt.baseQueue,queue:Nt.queue,next:null},zt===null?yt.memoizedState=zt=t:zt=zt.next=t}return zt}function Ta(t,e){return typeof e=="function"?e(t):e}function Td(t){var e=jn(),n=e.queue;if(n===null)throw Error(fe(311));n.lastRenderedReducer=t;var r=Nt,i=r.baseQueue,o=n.pending;if(o!==null){if(i!==null){var s=i.next;i.next=o.next,o.next=s}r.baseQueue=i=o,n.pending=null}if(i!==null){o=i.next,r=r.baseState;var a=s=null,l=null,c=o;do{var u=c.lane;if((io&u)===u)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:t(r,c.action);else{var f={lane:u,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=f,s=r):l=l.next=f,yt.lanes|=u,oo|=u}c=c.next}while(c!==null&&c!==o);l===null?s=r:l.next=a,ur(r,e.memoizedState)||(vn=!0),e.memoizedState=r,e.baseState=s,e.baseQueue=l,n.lastRenderedState=r}if(t=n.interleaved,t!==null){i=t;do o=i.lane,yt.lanes|=o,oo|=o,i=i.next;while(i!==t)}else i===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function bd(t){var e=jn(),n=e.queue;if(n===null)throw Error(fe(311));n.lastRenderedReducer=t;var r=n.dispatch,i=n.pending,o=e.memoizedState;if(i!==null){n.pending=null;var s=i=i.next;do o=t(o,s.action),s=s.next;while(s!==i);ur(o,e.memoizedState)||(vn=!0),e.memoizedState=o,e.baseQueue===null&&(e.baseState=o),n.lastRenderedState=o}return[o,r]}function Vy(){}function Gy(t,e){var n=yt,r=jn(),i=e(),o=!ur(r.memoizedState,i);if(o&&(r.memoizedState=i,vn=!0),r=r.queue,Cp(jy.bind(null,n,r,t),[t]),r.getSnapshot!==e||o||zt!==null&&zt.memoizedState.tag&1){if(n.flags|=2048,ba(9,$y.bind(null,n,r,i,e),void 0,null),Vt===null)throw Error(fe(349));io&30||Wy(n,e,i)}return i}function Wy(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=yt.updateQueue,e===null?(e={lastEffect:null,stores:null},yt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function $y(t,e,n,r){e.value=n,e.getSnapshot=r,Xy(e)&&qy(t)}function jy(t,e,n){return n(function(){Xy(e)&&qy(t)})}function Xy(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!ur(t,n)}catch{return!0}}function qy(t){var e=Wr(t,1);e!==null&&lr(e,t,1,-1)}function Sg(t){var e=mr();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ta,lastRenderedState:t},e.queue=t,t=t.dispatch=T1.bind(null,yt,t),[e.memoizedState,t]}function ba(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=yt.updateQueue,e===null?(e={lastEffect:null,stores:null},yt.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function Yy(){return jn().memoizedState}function ic(t,e,n,r){var i=mr();yt.flags|=t,i.memoizedState=ba(1|e,n,void 0,r===void 0?null:r)}function du(t,e,n,r){var i=jn();r=r===void 0?null:r;var o=void 0;if(Nt!==null){var s=Nt.memoizedState;if(o=s.destroy,r!==null&&bp(r,s.deps)){i.memoizedState=ba(e,n,o,r);return}}yt.flags|=t,i.memoizedState=ba(1|e,n,o,r)}function Eg(t,e){return ic(8390656,8,t,e)}function Cp(t,e){return du(2048,8,t,e)}function Ky(t,e){return du(4,2,t,e)}function Zy(t,e){return du(4,4,t,e)}function Jy(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Qy(t,e,n){return n=n!=null?n.concat([t]):null,du(4,4,Jy.bind(null,e,t),n)}function Pp(){}function ex(t,e){var n=jn();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&bp(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function tx(t,e){var n=jn();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&bp(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function nx(t,e,n){return io&21?(ur(n,e)||(n=ay(),yt.lanes|=n,oo|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,vn=!0),t.memoizedState=n)}function w1(t,e){var n=ot;ot=n!==0&&4>n?n:4,t(!0);var r=Md.transition;Md.transition={};try{t(!1),e()}finally{ot=n,Md.transition=r}}function rx(){return jn().memoizedState}function M1(t,e,n){var r=_i(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},ix(t))ox(e,n);else if(n=By(t,e,n,r),n!==null){var i=fn();lr(n,t,r,i),sx(n,e,r)}}function T1(t,e,n){var r=_i(t),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(ix(t))ox(e,i);else{var o=t.alternate;if(t.lanes===0&&(o===null||o.lanes===0)&&(o=e.lastRenderedReducer,o!==null))try{var s=e.lastRenderedState,a=o(s,n);if(i.hasEagerState=!0,i.eagerState=a,ur(a,s)){var l=e.interleaved;l===null?(i.next=i,Sp(e)):(i.next=l.next,l.next=i),e.interleaved=i;return}}catch{}finally{}n=By(t,e,i,r),n!==null&&(i=fn(),lr(n,t,r,i),sx(n,e,r))}}function ix(t){var e=t.alternate;return t===yt||e!==null&&e===yt}function ox(t,e){ra=Oc=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function sx(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,ap(t,n)}}var kc={readContext:$n,useCallback:Yt,useContext:Yt,useEffect:Yt,useImperativeHandle:Yt,useInsertionEffect:Yt,useLayoutEffect:Yt,useMemo:Yt,useReducer:Yt,useRef:Yt,useState:Yt,useDebugValue:Yt,useDeferredValue:Yt,useTransition:Yt,useMutableSource:Yt,useSyncExternalStore:Yt,useId:Yt,unstable_isNewReconciler:!1},b1={readContext:$n,useCallback:function(t,e){return mr().memoizedState=[t,e===void 0?null:e],t},useContext:$n,useEffect:Eg,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,ic(4194308,4,Jy.bind(null,e,t),n)},useLayoutEffect:function(t,e){return ic(4194308,4,t,e)},useInsertionEffect:function(t,e){return ic(4,2,t,e)},useMemo:function(t,e){var n=mr();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=mr();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=M1.bind(null,yt,t),[r.memoizedState,t]},useRef:function(t){var e=mr();return t={current:t},e.memoizedState=t},useState:Sg,useDebugValue:Pp,useDeferredValue:function(t){return mr().memoizedState=t},useTransition:function(){var t=Sg(!1),e=t[0];return t=w1.bind(null,t[1]),mr().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=yt,i=mr();if(vt){if(n===void 0)throw Error(fe(407));n=n()}else{if(n=e(),Vt===null)throw Error(fe(349));io&30||Wy(r,e,n)}i.memoizedState=n;var o={value:n,getSnapshot:e};return i.queue=o,Eg(jy.bind(null,r,o,t),[t]),r.flags|=2048,ba(9,$y.bind(null,r,o,n,e),void 0,null),n},useId:function(){var t=mr(),e=Vt.identifierPrefix;if(vt){var n=Fr,r=kr;n=(r&~(1<<32-ar(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=Ma++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=E1++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},A1={readContext:$n,useCallback:ex,useContext:$n,useEffect:Cp,useImperativeHandle:Qy,useInsertionEffect:Ky,useLayoutEffect:Zy,useMemo:tx,useReducer:Td,useRef:Yy,useState:function(){return Td(Ta)},useDebugValue:Pp,useDeferredValue:function(t){var e=jn();return nx(e,Nt.memoizedState,t)},useTransition:function(){var t=Td(Ta)[0],e=jn().memoizedState;return[t,e]},useMutableSource:Vy,useSyncExternalStore:Gy,useId:rx,unstable_isNewReconciler:!1},R1={readContext:$n,useCallback:ex,useContext:$n,useEffect:Cp,useImperativeHandle:Qy,useInsertionEffect:Ky,useLayoutEffect:Zy,useMemo:tx,useReducer:bd,useRef:Yy,useState:function(){return bd(Ta)},useDebugValue:Pp,useDeferredValue:function(t){var e=jn();return Nt===null?e.memoizedState=t:nx(e,Nt.memoizedState,t)},useTransition:function(){var t=bd(Ta)[0],e=jn().memoizedState;return[t,e]},useMutableSource:Vy,useSyncExternalStore:Gy,useId:rx,unstable_isNewReconciler:!1};function Qn(t,e){if(t&&t.defaultProps){e=xt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function ih(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:xt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var fu={isMounted:function(t){return(t=t._reactInternals)?fo(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=fn(),i=_i(t),o=Hr(r,i);o.payload=e,n!=null&&(o.callback=n),e=gi(t,o,i),e!==null&&(lr(e,t,i,r),nc(e,t,i))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=fn(),i=_i(t),o=Hr(r,i);o.tag=1,o.payload=e,n!=null&&(o.callback=n),e=gi(t,o,i),e!==null&&(lr(e,t,i,r),nc(e,t,i))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=fn(),r=_i(t),i=Hr(n,r);i.tag=2,e!=null&&(i.callback=e),e=gi(t,i,r),e!==null&&(lr(e,t,r,n),nc(e,t,r))}};function wg(t,e,n,r,i,o,s){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,o,s):e.prototype&&e.prototype.isPureReactComponent?!_a(n,r)||!_a(i,o):!0}function ax(t,e,n){var r=!1,i=Ai,o=e.contextType;return typeof o=="object"&&o!==null?o=$n(o):(i=yn(e)?no:nn.current,r=e.contextTypes,o=(r=r!=null)?rs(t,i):Ai),e=new e(n,o),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=fu,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=o),e}function Mg(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&fu.enqueueReplaceState(e,e.state,null)}function oh(t,e,n,r){var i=t.stateNode;i.props=n,i.state=t.memoizedState,i.refs={},Ep(t);var o=e.contextType;typeof o=="object"&&o!==null?i.context=$n(o):(o=yn(e)?no:nn.current,i.context=rs(t,o)),i.state=t.memoizedState,o=e.getDerivedStateFromProps,typeof o=="function"&&(ih(t,e,o,n),i.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(e=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),e!==i.state&&fu.enqueueReplaceState(i,i.state,null),Ic(t,n,i,r),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308)}function as(t,e){try{var n="",r=e;do n+=nw(r),r=r.return;while(r);var i=n}catch(o){i=`
Error generating stack: `+o.message+`
`+o.stack}return{value:t,source:e,stack:i,digest:null}}function Ad(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function sh(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var C1=typeof WeakMap=="function"?WeakMap:Map;function lx(t,e,n){n=Hr(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){Bc||(Bc=!0,gh=r),sh(t,e)},n}function cx(t,e,n){n=Hr(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var i=e.value;n.payload=function(){return r(i)},n.callback=function(){sh(t,e)}}var o=t.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){sh(t,e),typeof r!="function"&&(vi===null?vi=new Set([this]):vi.add(this));var s=e.stack;this.componentDidCatch(e.value,{componentStack:s!==null?s:""})}),n}function Tg(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new C1;var i=new Set;r.set(e,i)}else i=r.get(e),i===void 0&&(i=new Set,r.set(e,i));i.has(n)||(i.add(n),t=G1.bind(null,t,e,n),e.then(t,t))}function bg(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Ag(t,e,n,r,i){return t.mode&1?(t.flags|=65536,t.lanes=i,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Hr(-1,1),e.tag=2,gi(n,e,1))),n.lanes|=1),t)}var P1=Xr.ReactCurrentOwner,vn=!1;function cn(t,e,n,r){e.child=t===null?Fy(e,null,n,r):os(e,t.child,n,r)}function Rg(t,e,n,r,i){n=n.render;var o=e.ref;return Jo(e,i),r=Ap(t,e,n,r,o,i),n=Rp(),t!==null&&!vn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,$r(t,e,i)):(vt&&n&&mp(e),e.flags|=1,cn(t,e,r,i),e.child)}function Cg(t,e,n,r,i){if(t===null){var o=n.type;return typeof o=="function"&&!Fp(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=o,ux(t,e,o,r,i)):(t=lc(n.type,null,r,e,e.mode,i),t.ref=e.ref,t.return=e,e.child=t)}if(o=t.child,!(t.lanes&i)){var s=o.memoizedProps;if(n=n.compare,n=n!==null?n:_a,n(s,r)&&t.ref===e.ref)return $r(t,e,i)}return e.flags|=1,t=yi(o,r),t.ref=e.ref,t.return=e,e.child=t}function ux(t,e,n,r,i){if(t!==null){var o=t.memoizedProps;if(_a(o,r)&&t.ref===e.ref)if(vn=!1,e.pendingProps=r=o,(t.lanes&i)!==0)t.flags&131072&&(vn=!0);else return e.lanes=t.lanes,$r(t,e,i)}return ah(t,e,n,r,i)}function dx(t,e,n){var r=e.pendingProps,i=r.children,o=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},dt($o,An),An|=n;else{if(!(n&1073741824))return t=o!==null?o.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,dt($o,An),An|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,dt($o,An),An|=r}else o!==null?(r=o.baseLanes|n,e.memoizedState=null):r=n,dt($o,An),An|=r;return cn(t,e,i,n),e.child}function fx(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function ah(t,e,n,r,i){var o=yn(n)?no:nn.current;return o=rs(e,o),Jo(e,i),n=Ap(t,e,n,r,o,i),r=Rp(),t!==null&&!vn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,$r(t,e,i)):(vt&&r&&mp(e),e.flags|=1,cn(t,e,n,i),e.child)}function Pg(t,e,n,r,i){if(yn(n)){var o=!0;Cc(e)}else o=!1;if(Jo(e,i),e.stateNode===null)oc(t,e),ax(e,n,r),oh(e,n,r,i),r=!0;else if(t===null){var s=e.stateNode,a=e.memoizedProps;s.props=a;var l=s.context,c=n.contextType;typeof c=="object"&&c!==null?c=$n(c):(c=yn(n)?no:nn.current,c=rs(e,c));var u=n.getDerivedStateFromProps,f=typeof u=="function"||typeof s.getSnapshotBeforeUpdate=="function";f||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(a!==r||l!==c)&&Mg(e,s,r,c),ni=!1;var h=e.memoizedState;s.state=h,Ic(e,r,s,i),l=e.memoizedState,a!==r||h!==l||_n.current||ni?(typeof u=="function"&&(ih(e,n,u,r),l=e.memoizedState),(a=ni||wg(e,n,a,r,h,l,c))?(f||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(e.flags|=4194308)):(typeof s.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=l),s.props=r,s.state=l,s.context=c,r=a):(typeof s.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{s=e.stateNode,zy(t,e),a=e.memoizedProps,c=e.type===e.elementType?a:Qn(e.type,a),s.props=c,f=e.pendingProps,h=s.context,l=n.contextType,typeof l=="object"&&l!==null?l=$n(l):(l=yn(n)?no:nn.current,l=rs(e,l));var v=n.getDerivedStateFromProps;(u=typeof v=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(a!==f||h!==l)&&Mg(e,s,r,l),ni=!1,h=e.memoizedState,s.state=h,Ic(e,r,s,i);var _=e.memoizedState;a!==f||h!==_||_n.current||ni?(typeof v=="function"&&(ih(e,n,v,r),_=e.memoizedState),(c=ni||wg(e,n,c,r,h,_,l)||!1)?(u||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(r,_,l),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(r,_,l)),typeof s.componentDidUpdate=="function"&&(e.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof s.componentDidUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=_),s.props=r,s.state=_,s.context=l,r=c):(typeof s.componentDidUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),r=!1)}return lh(t,e,n,r,o,i)}function lh(t,e,n,r,i,o){fx(t,e);var s=(e.flags&128)!==0;if(!r&&!s)return i&&mg(e,n,!1),$r(t,e,o);r=e.stateNode,P1.current=e;var a=s&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&s?(e.child=os(e,t.child,null,o),e.child=os(e,null,a,o)):cn(t,e,a,o),e.memoizedState=r.state,i&&mg(e,n,!0),e.child}function hx(t){var e=t.stateNode;e.pendingContext?pg(t,e.pendingContext,e.pendingContext!==e.context):e.context&&pg(t,e.context,!1),wp(t,e.containerInfo)}function Lg(t,e,n,r,i){return is(),vp(i),e.flags|=256,cn(t,e,n,r),e.child}var ch={dehydrated:null,treeContext:null,retryLane:0};function uh(t){return{baseLanes:t,cachePool:null,transitions:null}}function px(t,e,n){var r=e.pendingProps,i=_t.current,o=!1,s=(e.flags&128)!==0,a;if((a=s)||(a=t!==null&&t.memoizedState===null?!1:(i&2)!==0),a?(o=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(i|=1),dt(_t,i&1),t===null)return nh(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(s=r.children,t=r.fallback,o?(r=e.mode,o=e.child,s={mode:"hidden",children:s},!(r&1)&&o!==null?(o.childLanes=0,o.pendingProps=s):o=mu(s,r,0,null),t=Ji(t,r,n,null),o.return=e,t.return=e,o.sibling=t,e.child=o,e.child.memoizedState=uh(n),e.memoizedState=ch,t):Lp(e,s));if(i=t.memoizedState,i!==null&&(a=i.dehydrated,a!==null))return L1(t,e,s,r,a,i,n);if(o){o=r.fallback,s=e.mode,i=t.child,a=i.sibling;var l={mode:"hidden",children:r.children};return!(s&1)&&e.child!==i?(r=e.child,r.childLanes=0,r.pendingProps=l,e.deletions=null):(r=yi(i,l),r.subtreeFlags=i.subtreeFlags&14680064),a!==null?o=yi(a,o):(o=Ji(o,s,n,null),o.flags|=2),o.return=e,r.return=e,r.sibling=o,e.child=r,r=o,o=e.child,s=t.child.memoizedState,s=s===null?uh(n):{baseLanes:s.baseLanes|n,cachePool:null,transitions:s.transitions},o.memoizedState=s,o.childLanes=t.childLanes&~n,e.memoizedState=ch,r}return o=t.child,t=o.sibling,r=yi(o,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function Lp(t,e){return e=mu({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function ll(t,e,n,r){return r!==null&&vp(r),os(e,t.child,null,n),t=Lp(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function L1(t,e,n,r,i,o,s){if(n)return e.flags&256?(e.flags&=-257,r=Ad(Error(fe(422))),ll(t,e,s,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(o=r.fallback,i=e.mode,r=mu({mode:"visible",children:r.children},i,0,null),o=Ji(o,i,s,null),o.flags|=2,r.return=e,o.return=e,r.sibling=o,e.child=r,e.mode&1&&os(e,t.child,null,s),e.child.memoizedState=uh(s),e.memoizedState=ch,o);if(!(e.mode&1))return ll(t,e,s,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var a=r.dgst;return r=a,o=Error(fe(419)),r=Ad(o,r,void 0),ll(t,e,s,r)}if(a=(s&t.childLanes)!==0,vn||a){if(r=Vt,r!==null){switch(s&-s){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|s)?0:i,i!==0&&i!==o.retryLane&&(o.retryLane=i,Wr(t,i),lr(r,t,i,-1))}return kp(),r=Ad(Error(fe(421))),ll(t,e,s,r)}return i.data==="$?"?(e.flags|=128,e.child=t.child,e=W1.bind(null,t),i._reactRetry=e,null):(t=o.treeContext,Rn=mi(i.nextSibling),Pn=e,vt=!0,nr=null,t!==null&&(Fn[Bn++]=kr,Fn[Bn++]=Fr,Fn[Bn++]=ro,kr=t.id,Fr=t.overflow,ro=e),e=Lp(e,r.children),e.flags|=4096,e)}function Dg(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),rh(t.return,e,n)}function Rd(t,e,n,r,i){var o=t.memoizedState;o===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(o.isBackwards=e,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i)}function mx(t,e,n){var r=e.pendingProps,i=r.revealOrder,o=r.tail;if(cn(t,e,r.children,n),r=_t.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Dg(t,n,e);else if(t.tag===19)Dg(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(dt(_t,r),!(e.mode&1))e.memoizedState=null;else switch(i){case"forwards":for(n=e.child,i=null;n!==null;)t=n.alternate,t!==null&&Uc(t)===null&&(i=n),n=n.sibling;n=i,n===null?(i=e.child,e.child=null):(i=n.sibling,n.sibling=null),Rd(e,!1,i,n,o);break;case"backwards":for(n=null,i=e.child,e.child=null;i!==null;){if(t=i.alternate,t!==null&&Uc(t)===null){e.child=i;break}t=i.sibling,i.sibling=n,n=i,i=t}Rd(e,!0,n,null,o);break;case"together":Rd(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function oc(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function $r(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),oo|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(fe(153));if(e.child!==null){for(t=e.child,n=yi(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=yi(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function D1(t,e,n){switch(e.tag){case 3:hx(e),is();break;case 5:Hy(e);break;case 1:yn(e.type)&&Cc(e);break;case 4:wp(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,i=e.memoizedProps.value;dt(Dc,r._currentValue),r._currentValue=i;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(dt(_t,_t.current&1),e.flags|=128,null):n&e.child.childLanes?px(t,e,n):(dt(_t,_t.current&1),t=$r(t,e,n),t!==null?t.sibling:null);dt(_t,_t.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return mx(t,e,n);e.flags|=128}if(i=e.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),dt(_t,_t.current),r)break;return null;case 22:case 23:return e.lanes=0,dx(t,e,n)}return $r(t,e,n)}var gx,dh,vx,_x;gx=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};dh=function(){};vx=function(t,e,n,r){var i=t.memoizedProps;if(i!==r){t=e.stateNode,Yi(yr.current);var o=null;switch(n){case"input":i=Nf(t,i),r=Nf(t,r),o=[];break;case"select":i=xt({},i,{value:void 0}),r=xt({},r,{value:void 0}),o=[];break;case"textarea":i=Of(t,i),r=Of(t,r),o=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=Ac)}Ff(n,r);var s;n=null;for(c in i)if(!r.hasOwnProperty(c)&&i.hasOwnProperty(c)&&i[c]!=null)if(c==="style"){var a=i[c];for(s in a)a.hasOwnProperty(s)&&(n||(n={}),n[s]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(da.hasOwnProperty(c)?o||(o=[]):(o=o||[]).push(c,null));for(c in r){var l=r[c];if(a=i!=null?i[c]:void 0,r.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(s in a)!a.hasOwnProperty(s)||l&&l.hasOwnProperty(s)||(n||(n={}),n[s]="");for(s in l)l.hasOwnProperty(s)&&a[s]!==l[s]&&(n||(n={}),n[s]=l[s])}else n||(o||(o=[]),o.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(o=o||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(o=o||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(da.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&ht("scroll",t),o||a===l||(o=[])):(o=o||[]).push(c,l))}n&&(o=o||[]).push("style",n);var c=o;(e.updateQueue=c)&&(e.flags|=4)}};_x=function(t,e,n,r){n!==r&&(e.flags|=4)};function Os(t,e){if(!vt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function Kt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=t,i=i.sibling;else for(i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=t,i=i.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function N1(t,e,n){var r=e.pendingProps;switch(gp(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Kt(e),null;case 1:return yn(e.type)&&Rc(),Kt(e),null;case 3:return r=e.stateNode,ss(),mt(_n),mt(nn),Tp(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(sl(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,nr!==null&&(yh(nr),nr=null))),dh(t,e),Kt(e),null;case 5:Mp(e);var i=Yi(wa.current);if(n=e.type,t!==null&&e.stateNode!=null)vx(t,e,n,r,i),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(fe(166));return Kt(e),null}if(t=Yi(yr.current),sl(e)){r=e.stateNode,n=e.type;var o=e.memoizedProps;switch(r[vr]=e,r[Sa]=o,t=(e.mode&1)!==0,n){case"dialog":ht("cancel",r),ht("close",r);break;case"iframe":case"object":case"embed":ht("load",r);break;case"video":case"audio":for(i=0;i<Ys.length;i++)ht(Ys[i],r);break;case"source":ht("error",r);break;case"img":case"image":case"link":ht("error",r),ht("load",r);break;case"details":ht("toggle",r);break;case"input":Hm(r,o),ht("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},ht("invalid",r);break;case"textarea":Gm(r,o),ht("invalid",r)}Ff(n,o),i=null;for(var s in o)if(o.hasOwnProperty(s)){var a=o[s];s==="children"?typeof a=="string"?r.textContent!==a&&(o.suppressHydrationWarning!==!0&&ol(r.textContent,a,t),i=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(o.suppressHydrationWarning!==!0&&ol(r.textContent,a,t),i=["children",""+a]):da.hasOwnProperty(s)&&a!=null&&s==="onScroll"&&ht("scroll",r)}switch(n){case"input":Za(r),Vm(r,o,!0);break;case"textarea":Za(r),Wm(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=Ac)}r=i,e.updateQueue=r,r!==null&&(e.flags|=4)}else{s=i.nodeType===9?i:i.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=j_(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=s.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=s.createElement(n,{is:r.is}):(t=s.createElement(n),n==="select"&&(s=t,r.multiple?s.multiple=!0:r.size&&(s.size=r.size))):t=s.createElementNS(t,n),t[vr]=e,t[Sa]=r,gx(t,e,!1,!1),e.stateNode=t;e:{switch(s=Bf(n,r),n){case"dialog":ht("cancel",t),ht("close",t),i=r;break;case"iframe":case"object":case"embed":ht("load",t),i=r;break;case"video":case"audio":for(i=0;i<Ys.length;i++)ht(Ys[i],t);i=r;break;case"source":ht("error",t),i=r;break;case"img":case"image":case"link":ht("error",t),ht("load",t),i=r;break;case"details":ht("toggle",t),i=r;break;case"input":Hm(t,r),i=Nf(t,r),ht("invalid",t);break;case"option":i=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},i=xt({},r,{value:void 0}),ht("invalid",t);break;case"textarea":Gm(t,r),i=Of(t,r),ht("invalid",t);break;default:i=r}Ff(n,i),a=i;for(o in a)if(a.hasOwnProperty(o)){var l=a[o];o==="style"?Y_(t,l):o==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&X_(t,l)):o==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&fa(t,l):typeof l=="number"&&fa(t,""+l):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(da.hasOwnProperty(o)?l!=null&&o==="onScroll"&&ht("scroll",t):l!=null&&tp(t,o,l,s))}switch(n){case"input":Za(t),Vm(t,r,!1);break;case"textarea":Za(t),Wm(t);break;case"option":r.value!=null&&t.setAttribute("value",""+bi(r.value));break;case"select":t.multiple=!!r.multiple,o=r.value,o!=null?qo(t,!!r.multiple,o,!1):r.defaultValue!=null&&qo(t,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(t.onclick=Ac)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Kt(e),null;case 6:if(t&&e.stateNode!=null)_x(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(fe(166));if(n=Yi(wa.current),Yi(yr.current),sl(e)){if(r=e.stateNode,n=e.memoizedProps,r[vr]=e,(o=r.nodeValue!==n)&&(t=Pn,t!==null))switch(t.tag){case 3:ol(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&ol(r.nodeValue,n,(t.mode&1)!==0)}o&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[vr]=e,e.stateNode=r}return Kt(e),null;case 13:if(mt(_t),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(vt&&Rn!==null&&e.mode&1&&!(e.flags&128))Oy(),is(),e.flags|=98560,o=!1;else if(o=sl(e),r!==null&&r.dehydrated!==null){if(t===null){if(!o)throw Error(fe(318));if(o=e.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(fe(317));o[vr]=e}else is(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Kt(e),o=!1}else nr!==null&&(yh(nr),nr=null),o=!0;if(!o)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||_t.current&1?It===0&&(It=3):kp())),e.updateQueue!==null&&(e.flags|=4),Kt(e),null);case 4:return ss(),dh(t,e),t===null&&ya(e.stateNode.containerInfo),Kt(e),null;case 10:return xp(e.type._context),Kt(e),null;case 17:return yn(e.type)&&Rc(),Kt(e),null;case 19:if(mt(_t),o=e.memoizedState,o===null)return Kt(e),null;if(r=(e.flags&128)!==0,s=o.rendering,s===null)if(r)Os(o,!1);else{if(It!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(s=Uc(t),s!==null){for(e.flags|=128,Os(o,!1),r=s.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)o=n,t=r,o.flags&=14680066,s=o.alternate,s===null?(o.childLanes=0,o.lanes=t,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=s.childLanes,o.lanes=s.lanes,o.child=s.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=s.memoizedProps,o.memoizedState=s.memoizedState,o.updateQueue=s.updateQueue,o.type=s.type,t=s.dependencies,o.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return dt(_t,_t.current&1|2),e.child}t=t.sibling}o.tail!==null&&Mt()>ls&&(e.flags|=128,r=!0,Os(o,!1),e.lanes=4194304)}else{if(!r)if(t=Uc(s),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Os(o,!0),o.tail===null&&o.tailMode==="hidden"&&!s.alternate&&!vt)return Kt(e),null}else 2*Mt()-o.renderingStartTime>ls&&n!==1073741824&&(e.flags|=128,r=!0,Os(o,!1),e.lanes=4194304);o.isBackwards?(s.sibling=e.child,e.child=s):(n=o.last,n!==null?n.sibling=s:e.child=s,o.last=s)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=Mt(),e.sibling=null,n=_t.current,dt(_t,r?n&1|2:n&1),e):(Kt(e),null);case 22:case 23:return Op(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?An&1073741824&&(Kt(e),e.subtreeFlags&6&&(e.flags|=8192)):Kt(e),null;case 24:return null;case 25:return null}throw Error(fe(156,e.tag))}function I1(t,e){switch(gp(e),e.tag){case 1:return yn(e.type)&&Rc(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return ss(),mt(_n),mt(nn),Tp(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Mp(e),null;case 13:if(mt(_t),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(fe(340));is()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return mt(_t),null;case 4:return ss(),null;case 10:return xp(e.type._context),null;case 22:case 23:return Op(),null;case 24:return null;default:return null}}var cl=!1,Qt=!1,U1=typeof WeakSet=="function"?WeakSet:Set,Ae=null;function Wo(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Et(t,e,r)}else n.current=null}function fh(t,e,n){try{n()}catch(r){Et(t,e,r)}}var Ng=!1;function O1(t,e){if(Yf=Mc,t=wy(),pp(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var s=0,a=-1,l=-1,c=0,u=0,f=t,h=null;t:for(;;){for(var v;f!==n||i!==0&&f.nodeType!==3||(a=s+i),f!==o||r!==0&&f.nodeType!==3||(l=s+r),f.nodeType===3&&(s+=f.nodeValue.length),(v=f.firstChild)!==null;)h=f,f=v;for(;;){if(f===t)break t;if(h===n&&++c===i&&(a=s),h===o&&++u===r&&(l=s),(v=f.nextSibling)!==null)break;f=h,h=f.parentNode}f=v}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Kf={focusedElem:t,selectionRange:n},Mc=!1,Ae=e;Ae!==null;)if(e=Ae,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Ae=t;else for(;Ae!==null;){e=Ae;try{var _=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(_!==null){var y=_.memoizedProps,p=_.memoizedState,d=e.stateNode,m=d.getSnapshotBeforeUpdate(e.elementType===e.type?y:Qn(e.type,y),p);d.__reactInternalSnapshotBeforeUpdate=m}break;case 3:var g=e.stateNode.containerInfo;g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(fe(163))}}catch(x){Et(e,e.return,x)}if(t=e.sibling,t!==null){t.return=e.return,Ae=t;break}Ae=e.return}return _=Ng,Ng=!1,_}function ia(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&t)===t){var o=i.destroy;i.destroy=void 0,o!==void 0&&fh(e,n,o)}i=i.next}while(i!==r)}}function hu(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function hh(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function yx(t){var e=t.alternate;e!==null&&(t.alternate=null,yx(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[vr],delete e[Sa],delete e[Qf],delete e[_1],delete e[y1])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function xx(t){return t.tag===5||t.tag===3||t.tag===4}function Ig(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||xx(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function ph(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Ac));else if(r!==4&&(t=t.child,t!==null))for(ph(t,e,n),t=t.sibling;t!==null;)ph(t,e,n),t=t.sibling}function mh(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(mh(t,e,n),t=t.sibling;t!==null;)mh(t,e,n),t=t.sibling}var $t=null,er=!1;function Yr(t,e,n){for(n=n.child;n!==null;)Sx(t,e,n),n=n.sibling}function Sx(t,e,n){if(_r&&typeof _r.onCommitFiberUnmount=="function")try{_r.onCommitFiberUnmount(ou,n)}catch{}switch(n.tag){case 5:Qt||Wo(n,e);case 6:var r=$t,i=er;$t=null,Yr(t,e,n),$t=r,er=i,$t!==null&&(er?(t=$t,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):$t.removeChild(n.stateNode));break;case 18:$t!==null&&(er?(t=$t,n=n.stateNode,t.nodeType===8?Sd(t.parentNode,n):t.nodeType===1&&Sd(t,n),ga(t)):Sd($t,n.stateNode));break;case 4:r=$t,i=er,$t=n.stateNode.containerInfo,er=!0,Yr(t,e,n),$t=r,er=i;break;case 0:case 11:case 14:case 15:if(!Qt&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var o=i,s=o.destroy;o=o.tag,s!==void 0&&(o&2||o&4)&&fh(n,e,s),i=i.next}while(i!==r)}Yr(t,e,n);break;case 1:if(!Qt&&(Wo(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(a){Et(n,e,a)}Yr(t,e,n);break;case 21:Yr(t,e,n);break;case 22:n.mode&1?(Qt=(r=Qt)||n.memoizedState!==null,Yr(t,e,n),Qt=r):Yr(t,e,n);break;default:Yr(t,e,n)}}function Ug(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new U1),e.forEach(function(r){var i=$1.bind(null,t,r);n.has(r)||(n.add(r),r.then(i,i))})}}function qn(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var o=t,s=e,a=s;e:for(;a!==null;){switch(a.tag){case 5:$t=a.stateNode,er=!1;break e;case 3:$t=a.stateNode.containerInfo,er=!0;break e;case 4:$t=a.stateNode.containerInfo,er=!0;break e}a=a.return}if($t===null)throw Error(fe(160));Sx(o,s,i),$t=null,er=!1;var l=i.alternate;l!==null&&(l.return=null),i.return=null}catch(c){Et(i,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Ex(e,t),e=e.sibling}function Ex(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(qn(e,t),hr(t),r&4){try{ia(3,t,t.return),hu(3,t)}catch(y){Et(t,t.return,y)}try{ia(5,t,t.return)}catch(y){Et(t,t.return,y)}}break;case 1:qn(e,t),hr(t),r&512&&n!==null&&Wo(n,n.return);break;case 5:if(qn(e,t),hr(t),r&512&&n!==null&&Wo(n,n.return),t.flags&32){var i=t.stateNode;try{fa(i,"")}catch(y){Et(t,t.return,y)}}if(r&4&&(i=t.stateNode,i!=null)){var o=t.memoizedProps,s=n!==null?n.memoizedProps:o,a=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{a==="input"&&o.type==="radio"&&o.name!=null&&W_(i,o),Bf(a,s);var c=Bf(a,o);for(s=0;s<l.length;s+=2){var u=l[s],f=l[s+1];u==="style"?Y_(i,f):u==="dangerouslySetInnerHTML"?X_(i,f):u==="children"?fa(i,f):tp(i,u,f,c)}switch(a){case"input":If(i,o);break;case"textarea":$_(i,o);break;case"select":var h=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!o.multiple;var v=o.value;v!=null?qo(i,!!o.multiple,v,!1):h!==!!o.multiple&&(o.defaultValue!=null?qo(i,!!o.multiple,o.defaultValue,!0):qo(i,!!o.multiple,o.multiple?[]:"",!1))}i[Sa]=o}catch(y){Et(t,t.return,y)}}break;case 6:if(qn(e,t),hr(t),r&4){if(t.stateNode===null)throw Error(fe(162));i=t.stateNode,o=t.memoizedProps;try{i.nodeValue=o}catch(y){Et(t,t.return,y)}}break;case 3:if(qn(e,t),hr(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{ga(e.containerInfo)}catch(y){Et(t,t.return,y)}break;case 4:qn(e,t),hr(t);break;case 13:qn(e,t),hr(t),i=t.child,i.flags&8192&&(o=i.memoizedState!==null,i.stateNode.isHidden=o,!o||i.alternate!==null&&i.alternate.memoizedState!==null||(Ip=Mt())),r&4&&Ug(t);break;case 22:if(u=n!==null&&n.memoizedState!==null,t.mode&1?(Qt=(c=Qt)||u,qn(e,t),Qt=c):qn(e,t),hr(t),r&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!u&&t.mode&1)for(Ae=t,u=t.child;u!==null;){for(f=Ae=u;Ae!==null;){switch(h=Ae,v=h.child,h.tag){case 0:case 11:case 14:case 15:ia(4,h,h.return);break;case 1:Wo(h,h.return);var _=h.stateNode;if(typeof _.componentWillUnmount=="function"){r=h,n=h.return;try{e=r,_.props=e.memoizedProps,_.state=e.memoizedState,_.componentWillUnmount()}catch(y){Et(r,n,y)}}break;case 5:Wo(h,h.return);break;case 22:if(h.memoizedState!==null){kg(f);continue}}v!==null?(v.return=h,Ae=v):kg(f)}u=u.sibling}e:for(u=null,f=t;;){if(f.tag===5){if(u===null){u=f;try{i=f.stateNode,c?(o=i.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(a=f.stateNode,l=f.memoizedProps.style,s=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=q_("display",s))}catch(y){Et(t,t.return,y)}}}else if(f.tag===6){if(u===null)try{f.stateNode.nodeValue=c?"":f.memoizedProps}catch(y){Et(t,t.return,y)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===t)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===t)break e;for(;f.sibling===null;){if(f.return===null||f.return===t)break e;u===f&&(u=null),f=f.return}u===f&&(u=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:qn(e,t),hr(t),r&4&&Ug(t);break;case 21:break;default:qn(e,t),hr(t)}}function hr(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(xx(n)){var r=n;break e}n=n.return}throw Error(fe(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(fa(i,""),r.flags&=-33);var o=Ig(t);mh(t,o,i);break;case 3:case 4:var s=r.stateNode.containerInfo,a=Ig(t);ph(t,a,s);break;default:throw Error(fe(161))}}catch(l){Et(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function k1(t,e,n){Ae=t,wx(t)}function wx(t,e,n){for(var r=(t.mode&1)!==0;Ae!==null;){var i=Ae,o=i.child;if(i.tag===22&&r){var s=i.memoizedState!==null||cl;if(!s){var a=i.alternate,l=a!==null&&a.memoizedState!==null||Qt;a=cl;var c=Qt;if(cl=s,(Qt=l)&&!c)for(Ae=i;Ae!==null;)s=Ae,l=s.child,s.tag===22&&s.memoizedState!==null?Fg(i):l!==null?(l.return=s,Ae=l):Fg(i);for(;o!==null;)Ae=o,wx(o),o=o.sibling;Ae=i,cl=a,Qt=c}Og(t)}else i.subtreeFlags&8772&&o!==null?(o.return=i,Ae=o):Og(t)}}function Og(t){for(;Ae!==null;){var e=Ae;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Qt||hu(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!Qt)if(n===null)r.componentDidMount();else{var i=e.elementType===e.type?n.memoizedProps:Qn(e.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=e.updateQueue;o!==null&&xg(e,o,r);break;case 3:var s=e.updateQueue;if(s!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}xg(e,s,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var u=c.memoizedState;if(u!==null){var f=u.dehydrated;f!==null&&ga(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(fe(163))}Qt||e.flags&512&&hh(e)}catch(h){Et(e,e.return,h)}}if(e===t){Ae=null;break}if(n=e.sibling,n!==null){n.return=e.return,Ae=n;break}Ae=e.return}}function kg(t){for(;Ae!==null;){var e=Ae;if(e===t){Ae=null;break}var n=e.sibling;if(n!==null){n.return=e.return,Ae=n;break}Ae=e.return}}function Fg(t){for(;Ae!==null;){var e=Ae;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{hu(4,e)}catch(l){Et(e,n,l)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var i=e.return;try{r.componentDidMount()}catch(l){Et(e,i,l)}}var o=e.return;try{hh(e)}catch(l){Et(e,o,l)}break;case 5:var s=e.return;try{hh(e)}catch(l){Et(e,s,l)}}}catch(l){Et(e,e.return,l)}if(e===t){Ae=null;break}var a=e.sibling;if(a!==null){a.return=e.return,Ae=a;break}Ae=e.return}}var F1=Math.ceil,Fc=Xr.ReactCurrentDispatcher,Dp=Xr.ReactCurrentOwner,Wn=Xr.ReactCurrentBatchConfig,it=0,Vt=null,Pt=null,Xt=0,An=0,$o=Li(0),It=0,Aa=null,oo=0,pu=0,Np=0,oa=null,mn=null,Ip=0,ls=1/0,Ir=null,Bc=!1,gh=null,vi=null,ul=!1,ai=null,zc=0,sa=0,vh=null,sc=-1,ac=0;function fn(){return it&6?Mt():sc!==-1?sc:sc=Mt()}function _i(t){return t.mode&1?it&2&&Xt!==0?Xt&-Xt:S1.transition!==null?(ac===0&&(ac=ay()),ac):(t=ot,t!==0||(t=window.event,t=t===void 0?16:py(t.type)),t):1}function lr(t,e,n,r){if(50<sa)throw sa=0,vh=null,Error(fe(185));Ua(t,n,r),(!(it&2)||t!==Vt)&&(t===Vt&&(!(it&2)&&(pu|=n),It===4&&oi(t,Xt)),xn(t,r),n===1&&it===0&&!(e.mode&1)&&(ls=Mt()+500,uu&&Di()))}function xn(t,e){var n=t.callbackNode;Sw(t,e);var r=wc(t,t===Vt?Xt:0);if(r===0)n!==null&&Xm(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&Xm(n),e===1)t.tag===0?x1(Bg.bind(null,t)):Ny(Bg.bind(null,t)),g1(function(){!(it&6)&&Di()}),n=null;else{switch(ly(r)){case 1:n=sp;break;case 4:n=oy;break;case 16:n=Ec;break;case 536870912:n=sy;break;default:n=Ec}n=Lx(n,Mx.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function Mx(t,e){if(sc=-1,ac=0,it&6)throw Error(fe(327));var n=t.callbackNode;if(Qo()&&t.callbackNode!==n)return null;var r=wc(t,t===Vt?Xt:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=Hc(t,r);else{e=r;var i=it;it|=2;var o=bx();(Vt!==t||Xt!==e)&&(Ir=null,ls=Mt()+500,Zi(t,e));do try{H1();break}catch(a){Tx(t,a)}while(1);yp(),Fc.current=o,it=i,Pt!==null?e=0:(Vt=null,Xt=0,e=It)}if(e!==0){if(e===2&&(i=Wf(t),i!==0&&(r=i,e=_h(t,i))),e===1)throw n=Aa,Zi(t,0),oi(t,r),xn(t,Mt()),n;if(e===6)oi(t,r);else{if(i=t.current.alternate,!(r&30)&&!B1(i)&&(e=Hc(t,r),e===2&&(o=Wf(t),o!==0&&(r=o,e=_h(t,o))),e===1))throw n=Aa,Zi(t,0),oi(t,r),xn(t,Mt()),n;switch(t.finishedWork=i,t.finishedLanes=r,e){case 0:case 1:throw Error(fe(345));case 2:Gi(t,mn,Ir);break;case 3:if(oi(t,r),(r&130023424)===r&&(e=Ip+500-Mt(),10<e)){if(wc(t,0)!==0)break;if(i=t.suspendedLanes,(i&r)!==r){fn(),t.pingedLanes|=t.suspendedLanes&i;break}t.timeoutHandle=Jf(Gi.bind(null,t,mn,Ir),e);break}Gi(t,mn,Ir);break;case 4:if(oi(t,r),(r&4194240)===r)break;for(e=t.eventTimes,i=-1;0<r;){var s=31-ar(r);o=1<<s,s=e[s],s>i&&(i=s),r&=~o}if(r=i,r=Mt()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*F1(r/1960))-r,10<r){t.timeoutHandle=Jf(Gi.bind(null,t,mn,Ir),r);break}Gi(t,mn,Ir);break;case 5:Gi(t,mn,Ir);break;default:throw Error(fe(329))}}}return xn(t,Mt()),t.callbackNode===n?Mx.bind(null,t):null}function _h(t,e){var n=oa;return t.current.memoizedState.isDehydrated&&(Zi(t,e).flags|=256),t=Hc(t,e),t!==2&&(e=mn,mn=n,e!==null&&yh(e)),t}function yh(t){mn===null?mn=t:mn.push.apply(mn,t)}function B1(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],o=i.getSnapshot;i=i.value;try{if(!ur(o(),i))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function oi(t,e){for(e&=~Np,e&=~pu,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-ar(e),r=1<<n;t[n]=-1,e&=~r}}function Bg(t){if(it&6)throw Error(fe(327));Qo();var e=wc(t,0);if(!(e&1))return xn(t,Mt()),null;var n=Hc(t,e);if(t.tag!==0&&n===2){var r=Wf(t);r!==0&&(e=r,n=_h(t,r))}if(n===1)throw n=Aa,Zi(t,0),oi(t,e),xn(t,Mt()),n;if(n===6)throw Error(fe(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Gi(t,mn,Ir),xn(t,Mt()),null}function Up(t,e){var n=it;it|=1;try{return t(e)}finally{it=n,it===0&&(ls=Mt()+500,uu&&Di())}}function so(t){ai!==null&&ai.tag===0&&!(it&6)&&Qo();var e=it;it|=1;var n=Wn.transition,r=ot;try{if(Wn.transition=null,ot=1,t)return t()}finally{ot=r,Wn.transition=n,it=e,!(it&6)&&Di()}}function Op(){An=$o.current,mt($o)}function Zi(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,m1(n)),Pt!==null)for(n=Pt.return;n!==null;){var r=n;switch(gp(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Rc();break;case 3:ss(),mt(_n),mt(nn),Tp();break;case 5:Mp(r);break;case 4:ss();break;case 13:mt(_t);break;case 19:mt(_t);break;case 10:xp(r.type._context);break;case 22:case 23:Op()}n=n.return}if(Vt=t,Pt=t=yi(t.current,null),Xt=An=e,It=0,Aa=null,Np=pu=oo=0,mn=oa=null,qi!==null){for(e=0;e<qi.length;e++)if(n=qi[e],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,o=n.pending;if(o!==null){var s=o.next;o.next=i,r.next=s}n.pending=r}qi=null}return t}function Tx(t,e){do{var n=Pt;try{if(yp(),rc.current=kc,Oc){for(var r=yt.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}Oc=!1}if(io=0,zt=Nt=yt=null,ra=!1,Ma=0,Dp.current=null,n===null||n.return===null){It=1,Aa=e,Pt=null;break}e:{var o=t,s=n.return,a=n,l=e;if(e=Xt,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,u=a,f=u.tag;if(!(u.mode&1)&&(f===0||f===11||f===15)){var h=u.alternate;h?(u.updateQueue=h.updateQueue,u.memoizedState=h.memoizedState,u.lanes=h.lanes):(u.updateQueue=null,u.memoizedState=null)}var v=bg(s);if(v!==null){v.flags&=-257,Ag(v,s,a,o,e),v.mode&1&&Tg(o,c,e),e=v,l=c;var _=e.updateQueue;if(_===null){var y=new Set;y.add(l),e.updateQueue=y}else _.add(l);break e}else{if(!(e&1)){Tg(o,c,e),kp();break e}l=Error(fe(426))}}else if(vt&&a.mode&1){var p=bg(s);if(p!==null){!(p.flags&65536)&&(p.flags|=256),Ag(p,s,a,o,e),vp(as(l,a));break e}}o=l=as(l,a),It!==4&&(It=2),oa===null?oa=[o]:oa.push(o),o=s;do{switch(o.tag){case 3:o.flags|=65536,e&=-e,o.lanes|=e;var d=lx(o,l,e);yg(o,d);break e;case 1:a=l;var m=o.type,g=o.stateNode;if(!(o.flags&128)&&(typeof m.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(vi===null||!vi.has(g)))){o.flags|=65536,e&=-e,o.lanes|=e;var x=cx(o,a,e);yg(o,x);break e}}o=o.return}while(o!==null)}Rx(n)}catch(w){e=w,Pt===n&&n!==null&&(Pt=n=n.return);continue}break}while(1)}function bx(){var t=Fc.current;return Fc.current=kc,t===null?kc:t}function kp(){(It===0||It===3||It===2)&&(It=4),Vt===null||!(oo&268435455)&&!(pu&268435455)||oi(Vt,Xt)}function Hc(t,e){var n=it;it|=2;var r=bx();(Vt!==t||Xt!==e)&&(Ir=null,Zi(t,e));do try{z1();break}catch(i){Tx(t,i)}while(1);if(yp(),it=n,Fc.current=r,Pt!==null)throw Error(fe(261));return Vt=null,Xt=0,It}function z1(){for(;Pt!==null;)Ax(Pt)}function H1(){for(;Pt!==null&&!fw();)Ax(Pt)}function Ax(t){var e=Px(t.alternate,t,An);t.memoizedProps=t.pendingProps,e===null?Rx(t):Pt=e,Dp.current=null}function Rx(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=I1(n,e),n!==null){n.flags&=32767,Pt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{It=6,Pt=null;return}}else if(n=N1(n,e,An),n!==null){Pt=n;return}if(e=e.sibling,e!==null){Pt=e;return}Pt=e=t}while(e!==null);It===0&&(It=5)}function Gi(t,e,n){var r=ot,i=Wn.transition;try{Wn.transition=null,ot=1,V1(t,e,n,r)}finally{Wn.transition=i,ot=r}return null}function V1(t,e,n,r){do Qo();while(ai!==null);if(it&6)throw Error(fe(327));n=t.finishedWork;var i=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(fe(177));t.callbackNode=null,t.callbackPriority=0;var o=n.lanes|n.childLanes;if(Ew(t,o),t===Vt&&(Pt=Vt=null,Xt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||ul||(ul=!0,Lx(Ec,function(){return Qo(),null})),o=(n.flags&15990)!==0,n.subtreeFlags&15990||o){o=Wn.transition,Wn.transition=null;var s=ot;ot=1;var a=it;it|=4,Dp.current=null,O1(t,n),Ex(n,t),l1(Kf),Mc=!!Yf,Kf=Yf=null,t.current=n,k1(n),hw(),it=a,ot=s,Wn.transition=o}else t.current=n;if(ul&&(ul=!1,ai=t,zc=i),o=t.pendingLanes,o===0&&(vi=null),gw(n.stateNode),xn(t,Mt()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)i=e[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(Bc)throw Bc=!1,t=gh,gh=null,t;return zc&1&&t.tag!==0&&Qo(),o=t.pendingLanes,o&1?t===vh?sa++:(sa=0,vh=t):sa=0,Di(),null}function Qo(){if(ai!==null){var t=ly(zc),e=Wn.transition,n=ot;try{if(Wn.transition=null,ot=16>t?16:t,ai===null)var r=!1;else{if(t=ai,ai=null,zc=0,it&6)throw Error(fe(331));var i=it;for(it|=4,Ae=t.current;Ae!==null;){var o=Ae,s=o.child;if(Ae.flags&16){var a=o.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(Ae=c;Ae!==null;){var u=Ae;switch(u.tag){case 0:case 11:case 15:ia(8,u,o)}var f=u.child;if(f!==null)f.return=u,Ae=f;else for(;Ae!==null;){u=Ae;var h=u.sibling,v=u.return;if(yx(u),u===c){Ae=null;break}if(h!==null){h.return=v,Ae=h;break}Ae=v}}}var _=o.alternate;if(_!==null){var y=_.child;if(y!==null){_.child=null;do{var p=y.sibling;y.sibling=null,y=p}while(y!==null)}}Ae=o}}if(o.subtreeFlags&2064&&s!==null)s.return=o,Ae=s;else e:for(;Ae!==null;){if(o=Ae,o.flags&2048)switch(o.tag){case 0:case 11:case 15:ia(9,o,o.return)}var d=o.sibling;if(d!==null){d.return=o.return,Ae=d;break e}Ae=o.return}}var m=t.current;for(Ae=m;Ae!==null;){s=Ae;var g=s.child;if(s.subtreeFlags&2064&&g!==null)g.return=s,Ae=g;else e:for(s=m;Ae!==null;){if(a=Ae,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:hu(9,a)}}catch(w){Et(a,a.return,w)}if(a===s){Ae=null;break e}var x=a.sibling;if(x!==null){x.return=a.return,Ae=x;break e}Ae=a.return}}if(it=i,Di(),_r&&typeof _r.onPostCommitFiberRoot=="function")try{_r.onPostCommitFiberRoot(ou,t)}catch{}r=!0}return r}finally{ot=n,Wn.transition=e}}return!1}function zg(t,e,n){e=as(n,e),e=lx(t,e,1),t=gi(t,e,1),e=fn(),t!==null&&(Ua(t,1,e),xn(t,e))}function Et(t,e,n){if(t.tag===3)zg(t,t,n);else for(;e!==null;){if(e.tag===3){zg(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(vi===null||!vi.has(r))){t=as(n,t),t=cx(e,t,1),e=gi(e,t,1),t=fn(),e!==null&&(Ua(e,1,t),xn(e,t));break}}e=e.return}}function G1(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=fn(),t.pingedLanes|=t.suspendedLanes&n,Vt===t&&(Xt&n)===n&&(It===4||It===3&&(Xt&130023424)===Xt&&500>Mt()-Ip?Zi(t,0):Np|=n),xn(t,e)}function Cx(t,e){e===0&&(t.mode&1?(e=el,el<<=1,!(el&130023424)&&(el=4194304)):e=1);var n=fn();t=Wr(t,e),t!==null&&(Ua(t,e,n),xn(t,n))}function W1(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Cx(t,n)}function $1(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,i=t.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(fe(314))}r!==null&&r.delete(e),Cx(t,n)}var Px;Px=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||_n.current)vn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return vn=!1,D1(t,e,n);vn=!!(t.flags&131072)}else vn=!1,vt&&e.flags&1048576&&Iy(e,Lc,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;oc(t,e),t=e.pendingProps;var i=rs(e,nn.current);Jo(e,n),i=Ap(null,e,r,t,i,n);var o=Rp();return e.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,yn(r)?(o=!0,Cc(e)):o=!1,e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,Ep(e),i.updater=fu,e.stateNode=i,i._reactInternals=e,oh(e,r,t,n),e=lh(null,e,r,!0,o,n)):(e.tag=0,vt&&o&&mp(e),cn(null,e,i,n),e=e.child),e;case 16:r=e.elementType;e:{switch(oc(t,e),t=e.pendingProps,i=r._init,r=i(r._payload),e.type=r,i=e.tag=X1(r),t=Qn(r,t),i){case 0:e=ah(null,e,r,t,n);break e;case 1:e=Pg(null,e,r,t,n);break e;case 11:e=Rg(null,e,r,t,n);break e;case 14:e=Cg(null,e,r,Qn(r.type,t),n);break e}throw Error(fe(306,r,""))}return e;case 0:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Qn(r,i),ah(t,e,r,i,n);case 1:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Qn(r,i),Pg(t,e,r,i,n);case 3:e:{if(hx(e),t===null)throw Error(fe(387));r=e.pendingProps,o=e.memoizedState,i=o.element,zy(t,e),Ic(e,r,null,n);var s=e.memoizedState;if(r=s.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},e.updateQueue.baseState=o,e.memoizedState=o,e.flags&256){i=as(Error(fe(423)),e),e=Lg(t,e,r,n,i);break e}else if(r!==i){i=as(Error(fe(424)),e),e=Lg(t,e,r,n,i);break e}else for(Rn=mi(e.stateNode.containerInfo.firstChild),Pn=e,vt=!0,nr=null,n=Fy(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(is(),r===i){e=$r(t,e,n);break e}cn(t,e,r,n)}e=e.child}return e;case 5:return Hy(e),t===null&&nh(e),r=e.type,i=e.pendingProps,o=t!==null?t.memoizedProps:null,s=i.children,Zf(r,i)?s=null:o!==null&&Zf(r,o)&&(e.flags|=32),fx(t,e),cn(t,e,s,n),e.child;case 6:return t===null&&nh(e),null;case 13:return px(t,e,n);case 4:return wp(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=os(e,null,r,n):cn(t,e,r,n),e.child;case 11:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Qn(r,i),Rg(t,e,r,i,n);case 7:return cn(t,e,e.pendingProps,n),e.child;case 8:return cn(t,e,e.pendingProps.children,n),e.child;case 12:return cn(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,i=e.pendingProps,o=e.memoizedProps,s=i.value,dt(Dc,r._currentValue),r._currentValue=s,o!==null)if(ur(o.value,s)){if(o.children===i.children&&!_n.current){e=$r(t,e,n);break e}}else for(o=e.child,o!==null&&(o.return=e);o!==null;){var a=o.dependencies;if(a!==null){s=o.child;for(var l=a.firstContext;l!==null;){if(l.context===r){if(o.tag===1){l=Hr(-1,n&-n),l.tag=2;var c=o.updateQueue;if(c!==null){c=c.shared;var u=c.pending;u===null?l.next=l:(l.next=u.next,u.next=l),c.pending=l}}o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),rh(o.return,n,e),a.lanes|=n;break}l=l.next}}else if(o.tag===10)s=o.type===e.type?null:o.child;else if(o.tag===18){if(s=o.return,s===null)throw Error(fe(341));s.lanes|=n,a=s.alternate,a!==null&&(a.lanes|=n),rh(s,n,e),s=o.sibling}else s=o.child;if(s!==null)s.return=o;else for(s=o;s!==null;){if(s===e){s=null;break}if(o=s.sibling,o!==null){o.return=s.return,s=o;break}s=s.return}o=s}cn(t,e,i.children,n),e=e.child}return e;case 9:return i=e.type,r=e.pendingProps.children,Jo(e,n),i=$n(i),r=r(i),e.flags|=1,cn(t,e,r,n),e.child;case 14:return r=e.type,i=Qn(r,e.pendingProps),i=Qn(r.type,i),Cg(t,e,r,i,n);case 15:return ux(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Qn(r,i),oc(t,e),e.tag=1,yn(r)?(t=!0,Cc(e)):t=!1,Jo(e,n),ax(e,r,i),oh(e,r,i,n),lh(null,e,r,!0,t,n);case 19:return mx(t,e,n);case 22:return dx(t,e,n)}throw Error(fe(156,e.tag))};function Lx(t,e){return iy(t,e)}function j1(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Gn(t,e,n,r){return new j1(t,e,n,r)}function Fp(t){return t=t.prototype,!(!t||!t.isReactComponent)}function X1(t){if(typeof t=="function")return Fp(t)?1:0;if(t!=null){if(t=t.$$typeof,t===rp)return 11;if(t===ip)return 14}return 2}function yi(t,e){var n=t.alternate;return n===null?(n=Gn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function lc(t,e,n,r,i,o){var s=2;if(r=t,typeof t=="function")Fp(t)&&(s=1);else if(typeof t=="string")s=5;else e:switch(t){case Uo:return Ji(n.children,i,o,e);case np:s=8,i|=8;break;case Cf:return t=Gn(12,n,e,i|2),t.elementType=Cf,t.lanes=o,t;case Pf:return t=Gn(13,n,e,i),t.elementType=Pf,t.lanes=o,t;case Lf:return t=Gn(19,n,e,i),t.elementType=Lf,t.lanes=o,t;case H_:return mu(n,i,o,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case B_:s=10;break e;case z_:s=9;break e;case rp:s=11;break e;case ip:s=14;break e;case ti:s=16,r=null;break e}throw Error(fe(130,t==null?t:typeof t,""))}return e=Gn(s,n,e,i),e.elementType=t,e.type=r,e.lanes=o,e}function Ji(t,e,n,r){return t=Gn(7,t,r,e),t.lanes=n,t}function mu(t,e,n,r){return t=Gn(22,t,r,e),t.elementType=H_,t.lanes=n,t.stateNode={isHidden:!1},t}function Cd(t,e,n){return t=Gn(6,t,null,e),t.lanes=n,t}function Pd(t,e,n){return e=Gn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function q1(t,e,n,r,i){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ud(0),this.expirationTimes=ud(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ud(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Bp(t,e,n,r,i,o,s,a,l){return t=new q1(t,e,n,a,l),e===1?(e=1,o===!0&&(e|=8)):e=0,o=Gn(3,null,null,e),t.current=o,o.stateNode=t,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ep(o),t}function Y1(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Io,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function Dx(t){if(!t)return Ai;t=t._reactInternals;e:{if(fo(t)!==t||t.tag!==1)throw Error(fe(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(yn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(fe(171))}if(t.tag===1){var n=t.type;if(yn(n))return Dy(t,n,e)}return e}function Nx(t,e,n,r,i,o,s,a,l){return t=Bp(n,r,!0,t,i,o,s,a,l),t.context=Dx(null),n=t.current,r=fn(),i=_i(n),o=Hr(r,i),o.callback=e??null,gi(n,o,i),t.current.lanes=i,Ua(t,i,r),xn(t,r),t}function gu(t,e,n,r){var i=e.current,o=fn(),s=_i(i);return n=Dx(n),e.context===null?e.context=n:e.pendingContext=n,e=Hr(o,s),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=gi(i,e,s),t!==null&&(lr(t,i,s,o),nc(t,i,s)),s}function Vc(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Hg(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function zp(t,e){Hg(t,e),(t=t.alternate)&&Hg(t,e)}function K1(){return null}var Ix=typeof reportError=="function"?reportError:function(t){console.error(t)};function Hp(t){this._internalRoot=t}vu.prototype.render=Hp.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(fe(409));gu(t,e,null,null)};vu.prototype.unmount=Hp.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;so(function(){gu(null,t,null,null)}),e[Gr]=null}};function vu(t){this._internalRoot=t}vu.prototype.unstable_scheduleHydration=function(t){if(t){var e=dy();t={blockedOn:null,target:t,priority:e};for(var n=0;n<ii.length&&e!==0&&e<ii[n].priority;n++);ii.splice(n,0,t),n===0&&hy(t)}};function Vp(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function _u(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Vg(){}function Z1(t,e,n,r,i){if(i){if(typeof r=="function"){var o=r;r=function(){var c=Vc(s);o.call(c)}}var s=Nx(e,r,t,0,null,!1,!1,"",Vg);return t._reactRootContainer=s,t[Gr]=s.current,ya(t.nodeType===8?t.parentNode:t),so(),s}for(;i=t.lastChild;)t.removeChild(i);if(typeof r=="function"){var a=r;r=function(){var c=Vc(l);a.call(c)}}var l=Bp(t,0,!1,null,null,!1,!1,"",Vg);return t._reactRootContainer=l,t[Gr]=l.current,ya(t.nodeType===8?t.parentNode:t),so(function(){gu(e,l,n,r)}),l}function yu(t,e,n,r,i){var o=n._reactRootContainer;if(o){var s=o;if(typeof i=="function"){var a=i;i=function(){var l=Vc(s);a.call(l)}}gu(e,s,t,i)}else s=Z1(n,e,t,i,r);return Vc(s)}cy=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=qs(e.pendingLanes);n!==0&&(ap(e,n|1),xn(e,Mt()),!(it&6)&&(ls=Mt()+500,Di()))}break;case 13:so(function(){var r=Wr(t,1);if(r!==null){var i=fn();lr(r,t,1,i)}}),zp(t,1)}};lp=function(t){if(t.tag===13){var e=Wr(t,134217728);if(e!==null){var n=fn();lr(e,t,134217728,n)}zp(t,134217728)}};uy=function(t){if(t.tag===13){var e=_i(t),n=Wr(t,e);if(n!==null){var r=fn();lr(n,t,e,r)}zp(t,e)}};dy=function(){return ot};fy=function(t,e){var n=ot;try{return ot=t,e()}finally{ot=n}};Hf=function(t,e,n){switch(e){case"input":if(If(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var i=cu(r);if(!i)throw Error(fe(90));G_(r),If(r,i)}}}break;case"textarea":$_(t,n);break;case"select":e=n.value,e!=null&&qo(t,!!n.multiple,e,!1)}};J_=Up;Q_=so;var J1={usingClientEntryPoint:!1,Events:[ka,Bo,cu,K_,Z_,Up]},ks={findFiberByHostInstance:Xi,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Q1={bundleType:ks.bundleType,version:ks.version,rendererPackageName:ks.rendererPackageName,rendererConfig:ks.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Xr.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=ny(t),t===null?null:t.stateNode},findFiberByHostInstance:ks.findFiberByHostInstance||K1,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var dl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!dl.isDisabled&&dl.supportsFiber)try{ou=dl.inject(Q1),_r=dl}catch{}}Nn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=J1;Nn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Vp(e))throw Error(fe(200));return Y1(t,e,null,n)};Nn.createRoot=function(t,e){if(!Vp(t))throw Error(fe(299));var n=!1,r="",i=Ix;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(i=e.onRecoverableError)),e=Bp(t,1,!1,null,null,n,!1,r,i),t[Gr]=e.current,ya(t.nodeType===8?t.parentNode:t),new Hp(e)};Nn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(fe(188)):(t=Object.keys(t).join(","),Error(fe(268,t)));return t=ny(e),t=t===null?null:t.stateNode,t};Nn.flushSync=function(t){return so(t)};Nn.hydrate=function(t,e,n){if(!_u(e))throw Error(fe(200));return yu(null,t,e,!0,n)};Nn.hydrateRoot=function(t,e,n){if(!Vp(t))throw Error(fe(405));var r=n!=null&&n.hydratedSources||null,i=!1,o="",s=Ix;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(s=n.onRecoverableError)),e=Nx(e,null,t,1,n??null,i,!1,o,s),t[Gr]=e.current,ya(t),r)for(t=0;t<r.length;t++)n=r[t],i=n._getVersion,i=i(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,i]:e.mutableSourceEagerHydrationData.push(n,i);return new vu(e)};Nn.render=function(t,e,n){if(!_u(e))throw Error(fe(200));return yu(null,t,e,!1,n)};Nn.unmountComponentAtNode=function(t){if(!_u(t))throw Error(fe(40));return t._reactRootContainer?(so(function(){yu(null,null,t,!1,function(){t._reactRootContainer=null,t[Gr]=null})}),!0):!1};Nn.unstable_batchedUpdates=Up;Nn.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!_u(n))throw Error(fe(200));if(t==null||t._reactInternals===void 0)throw Error(fe(38));return yu(t,e,n,!1,r)};Nn.version="18.3.1-next-f1338f8080-20240426";function Ux(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ux)}catch(t){console.error(t)}}Ux(),U_.exports=Nn;var eM=U_.exports,Gg=eM;Af.createRoot=Gg.createRoot,Af.hydrateRoot=Gg.hydrateRoot;/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ra(){return Ra=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},Ra.apply(this,arguments)}var li;(function(t){t.Pop="POP",t.Push="PUSH",t.Replace="REPLACE"})(li||(li={}));const Wg="popstate";function tM(t){t===void 0&&(t={});function e(r,i){let{pathname:o,search:s,hash:a}=r.location;return xh("",{pathname:o,search:s,hash:a},i.state&&i.state.usr||null,i.state&&i.state.key||"default")}function n(r,i){return typeof i=="string"?i:Gc(i)}return rM(e,n,null,t)}function Tt(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function Gp(t,e){if(!t){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function nM(){return Math.random().toString(36).substr(2,8)}function $g(t,e){return{usr:t.state,key:t.key,idx:e}}function xh(t,e,n,r){return n===void 0&&(n=null),Ra({pathname:typeof t=="string"?t:t.pathname,search:"",hash:""},typeof e=="string"?Es(e):e,{state:n,key:e&&e.key||r||nM()})}function Gc(t){let{pathname:e="/",search:n="",hash:r=""}=t;return n&&n!=="?"&&(e+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(e+=r.charAt(0)==="#"?r:"#"+r),e}function Es(t){let e={};if(t){let n=t.indexOf("#");n>=0&&(e.hash=t.substr(n),t=t.substr(0,n));let r=t.indexOf("?");r>=0&&(e.search=t.substr(r),t=t.substr(0,r)),t&&(e.pathname=t)}return e}function rM(t,e,n,r){r===void 0&&(r={});let{window:i=document.defaultView,v5Compat:o=!1}=r,s=i.history,a=li.Pop,l=null,c=u();c==null&&(c=0,s.replaceState(Ra({},s.state,{idx:c}),""));function u(){return(s.state||{idx:null}).idx}function f(){a=li.Pop;let p=u(),d=p==null?null:p-c;c=p,l&&l({action:a,location:y.location,delta:d})}function h(p,d){a=li.Push;let m=xh(y.location,p,d);n&&n(m,p),c=u()+1;let g=$g(m,c),x=y.createHref(m);try{s.pushState(g,"",x)}catch(w){if(w instanceof DOMException&&w.name==="DataCloneError")throw w;i.location.assign(x)}o&&l&&l({action:a,location:y.location,delta:1})}function v(p,d){a=li.Replace;let m=xh(y.location,p,d);n&&n(m,p),c=u();let g=$g(m,c),x=y.createHref(m);s.replaceState(g,"",x),o&&l&&l({action:a,location:y.location,delta:0})}function _(p){let d=i.location.origin!=="null"?i.location.origin:i.location.href,m=typeof p=="string"?p:Gc(p);return m=m.replace(/ $/,"%20"),Tt(d,"No window.location.(origin|href) available to create URL for href: "+m),new URL(m,d)}let y={get action(){return a},get location(){return t(i,s)},listen(p){if(l)throw new Error("A history only accepts one active listener");return i.addEventListener(Wg,f),l=p,()=>{i.removeEventListener(Wg,f),l=null}},createHref(p){return e(i,p)},createURL:_,encodeLocation(p){let d=_(p);return{pathname:d.pathname,search:d.search,hash:d.hash}},push:h,replace:v,go(p){return s.go(p)}};return y}var jg;(function(t){t.data="data",t.deferred="deferred",t.redirect="redirect",t.error="error"})(jg||(jg={}));function iM(t,e,n){return n===void 0&&(n="/"),oM(t,e,n,!1)}function oM(t,e,n,r){let i=typeof e=="string"?Es(e):e,o=Wp(i.pathname||"/",n);if(o==null)return null;let s=Ox(t);sM(s);let a=null;for(let l=0;a==null&&l<s.length;++l){let c=vM(o);a=mM(s[l],c,r)}return a}function Ox(t,e,n,r){e===void 0&&(e=[]),n===void 0&&(n=[]),r===void 0&&(r="");let i=(o,s,a)=>{let l={relativePath:a===void 0?o.path||"":a,caseSensitive:o.caseSensitive===!0,childrenIndex:s,route:o};l.relativePath.startsWith("/")&&(Tt(l.relativePath.startsWith(r),'Absolute route path "'+l.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),l.relativePath=l.relativePath.slice(r.length));let c=xi([r,l.relativePath]),u=n.concat(l);o.children&&o.children.length>0&&(Tt(o.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+c+'".')),Ox(o.children,e,u,c)),!(o.path==null&&!o.index)&&e.push({path:c,score:hM(c,o.index),routesMeta:u})};return t.forEach((o,s)=>{var a;if(o.path===""||!((a=o.path)!=null&&a.includes("?")))i(o,s);else for(let l of kx(o.path))i(o,s,l)}),e}function kx(t){let e=t.split("/");if(e.length===0)return[];let[n,...r]=e,i=n.endsWith("?"),o=n.replace(/\?$/,"");if(r.length===0)return i?[o,""]:[o];let s=kx(r.join("/")),a=[];return a.push(...s.map(l=>l===""?o:[o,l].join("/"))),i&&a.push(...s),a.map(l=>t.startsWith("/")&&l===""?"/":l)}function sM(t){t.sort((e,n)=>e.score!==n.score?n.score-e.score:pM(e.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const aM=/^:[\w-]+$/,lM=3,cM=2,uM=1,dM=10,fM=-2,Xg=t=>t==="*";function hM(t,e){let n=t.split("/"),r=n.length;return n.some(Xg)&&(r+=fM),e&&(r+=cM),n.filter(i=>!Xg(i)).reduce((i,o)=>i+(aM.test(o)?lM:o===""?uM:dM),r)}function pM(t,e){return t.length===e.length&&t.slice(0,-1).every((r,i)=>r===e[i])?t[t.length-1]-e[e.length-1]:0}function mM(t,e,n){n===void 0&&(n=!1);let{routesMeta:r}=t,i={},o="/",s=[];for(let a=0;a<r.length;++a){let l=r[a],c=a===r.length-1,u=o==="/"?e:e.slice(o.length)||"/",f=qg({path:l.relativePath,caseSensitive:l.caseSensitive,end:c},u),h=l.route;if(!f&&c&&n&&!r[r.length-1].route.index&&(f=qg({path:l.relativePath,caseSensitive:l.caseSensitive,end:!1},u)),!f)return null;Object.assign(i,f.params),s.push({params:i,pathname:xi([o,f.pathname]),pathnameBase:EM(xi([o,f.pathnameBase])),route:h}),f.pathnameBase!=="/"&&(o=xi([o,f.pathnameBase]))}return s}function qg(t,e){typeof t=="string"&&(t={path:t,caseSensitive:!1,end:!0});let[n,r]=gM(t.path,t.caseSensitive,t.end),i=e.match(n);if(!i)return null;let o=i[0],s=o.replace(/(.)\/+$/,"$1"),a=i.slice(1);return{params:r.reduce((c,u,f)=>{let{paramName:h,isOptional:v}=u;if(h==="*"){let y=a[f]||"";s=o.slice(0,o.length-y.length).replace(/(.)\/+$/,"$1")}const _=a[f];return v&&!_?c[h]=void 0:c[h]=(_||"").replace(/%2F/g,"/"),c},{}),pathname:o,pathnameBase:s,pattern:t}}function gM(t,e,n){e===void 0&&(e=!1),n===void 0&&(n=!0),Gp(t==="*"||!t.endsWith("*")||t.endsWith("/*"),'Route path "'+t+'" will be treated as if it were '+('"'+t.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+t.replace(/\*$/,"/*")+'".'));let r=[],i="^"+t.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(s,a,l)=>(r.push({paramName:a,isOptional:l!=null}),l?"/?([^\\/]+)?":"/([^\\/]+)"));return t.endsWith("*")?(r.push({paramName:"*"}),i+=t==="*"||t==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?i+="\\/*$":t!==""&&t!=="/"&&(i+="(?:(?=\\/|$))"),[new RegExp(i,e?void 0:"i"),r]}function vM(t){try{return t.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return Gp(!1,'The URL path "'+t+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),t}}function Wp(t,e){if(e==="/")return t;if(!t.toLowerCase().startsWith(e.toLowerCase()))return null;let n=e.endsWith("/")?e.length-1:e.length,r=t.charAt(n);return r&&r!=="/"?null:t.slice(n)||"/"}const _M=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,yM=t=>_M.test(t);function xM(t,e){e===void 0&&(e="/");let{pathname:n,search:r="",hash:i=""}=typeof t=="string"?Es(t):t,o;if(n)if(yM(n))o=n;else{if(n.includes("//")){let s=n;n=n.replace(/\/\/+/g,"/"),Gp(!1,"Pathnames cannot have embedded double slashes - normalizing "+(s+" -> "+n))}n.startsWith("/")?o=Yg(n.substring(1),"/"):o=Yg(n,e)}else o=e;return{pathname:o,search:wM(r),hash:MM(i)}}function Yg(t,e){let n=e.replace(/\/+$/,"").split("/");return t.split("/").forEach(i=>{i===".."?n.length>1&&n.pop():i!=="."&&n.push(i)}),n.length>1?n.join("/"):"/"}function Ld(t,e,n,r){return"Cannot include a '"+t+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function SM(t){return t.filter((e,n)=>n===0||e.route.path&&e.route.path.length>0)}function $p(t,e){let n=SM(t);return e?n.map((r,i)=>i===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function jp(t,e,n,r){r===void 0&&(r=!1);let i;typeof t=="string"?i=Es(t):(i=Ra({},t),Tt(!i.pathname||!i.pathname.includes("?"),Ld("?","pathname","search",i)),Tt(!i.pathname||!i.pathname.includes("#"),Ld("#","pathname","hash",i)),Tt(!i.search||!i.search.includes("#"),Ld("#","search","hash",i)));let o=t===""||i.pathname==="",s=o?"/":i.pathname,a;if(s==null)a=n;else{let f=e.length-1;if(!r&&s.startsWith("..")){let h=s.split("/");for(;h[0]==="..";)h.shift(),f-=1;i.pathname=h.join("/")}a=f>=0?e[f]:"/"}let l=xM(i,a),c=s&&s!=="/"&&s.endsWith("/"),u=(o||s===".")&&n.endsWith("/");return!l.pathname.endsWith("/")&&(c||u)&&(l.pathname+="/"),l}const xi=t=>t.join("/").replace(/\/\/+/g,"/"),EM=t=>t.replace(/\/+$/,"").replace(/^\/*/,"/"),wM=t=>!t||t==="?"?"":t.startsWith("?")?t:"?"+t,MM=t=>!t||t==="#"?"":t.startsWith("#")?t:"#"+t;function TM(t){return t!=null&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.internal=="boolean"&&"data"in t}const Fx=["post","put","patch","delete"];new Set(Fx);const bM=["get",...Fx];new Set(bM);/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ca(){return Ca=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},Ca.apply(this,arguments)}const Xp=O.createContext(null),AM=O.createContext(null),Ni=O.createContext(null),xu=O.createContext(null),qr=O.createContext({outlet:null,matches:[],isDataRoute:!1}),Bx=O.createContext(null);function RM(t,e){let{relative:n}=e===void 0?{}:e;ws()||Tt(!1);let{basename:r,navigator:i}=O.useContext(Ni),{hash:o,pathname:s,search:a}=Hx(t,{relative:n}),l=s;return r!=="/"&&(l=s==="/"?r:xi([r,s])),i.createHref({pathname:l,search:a,hash:o})}function ws(){return O.useContext(xu)!=null}function Ba(){return ws()||Tt(!1),O.useContext(xu).location}function zx(t){O.useContext(Ni).static||O.useLayoutEffect(t)}function br(){let{isDataRoute:t}=O.useContext(qr);return t?HM():CM()}function CM(){ws()||Tt(!1);let t=O.useContext(Xp),{basename:e,future:n,navigator:r}=O.useContext(Ni),{matches:i}=O.useContext(qr),{pathname:o}=Ba(),s=JSON.stringify($p(i,n.v7_relativeSplatPath)),a=O.useRef(!1);return zx(()=>{a.current=!0}),O.useCallback(function(c,u){if(u===void 0&&(u={}),!a.current)return;if(typeof c=="number"){r.go(c);return}let f=jp(c,JSON.parse(s),o,u.relative==="path");t==null&&e!=="/"&&(f.pathname=f.pathname==="/"?e:xi([e,f.pathname])),(u.replace?r.replace:r.push)(f,u.state,u)},[e,r,s,o,t])}function Su(){let{matches:t}=O.useContext(qr),e=t[t.length-1];return e?e.params:{}}function Hx(t,e){let{relative:n}=e===void 0?{}:e,{future:r}=O.useContext(Ni),{matches:i}=O.useContext(qr),{pathname:o}=Ba(),s=JSON.stringify($p(i,r.v7_relativeSplatPath));return O.useMemo(()=>jp(t,JSON.parse(s),o,n==="path"),[t,s,o,n])}function PM(t,e){return LM(t,e)}function LM(t,e,n,r){ws()||Tt(!1);let{navigator:i}=O.useContext(Ni),{matches:o}=O.useContext(qr),s=o[o.length-1],a=s?s.params:{};s&&s.pathname;let l=s?s.pathnameBase:"/";s&&s.route;let c=Ba(),u;if(e){var f;let p=typeof e=="string"?Es(e):e;l==="/"||(f=p.pathname)!=null&&f.startsWith(l)||Tt(!1),u=p}else u=c;let h=u.pathname||"/",v=h;if(l!=="/"){let p=l.replace(/^\//,"").split("/");v="/"+h.replace(/^\//,"").split("/").slice(p.length).join("/")}let _=iM(t,{pathname:v}),y=OM(_&&_.map(p=>Object.assign({},p,{params:Object.assign({},a,p.params),pathname:xi([l,i.encodeLocation?i.encodeLocation(p.pathname).pathname:p.pathname]),pathnameBase:p.pathnameBase==="/"?l:xi([l,i.encodeLocation?i.encodeLocation(p.pathnameBase).pathname:p.pathnameBase])})),o,n,r);return e&&y?O.createElement(xu.Provider,{value:{location:Ca({pathname:"/",search:"",hash:"",state:null,key:"default"},u),navigationType:li.Pop}},y):y}function DM(){let t=zM(),e=TM(t)?t.status+" "+t.statusText:t instanceof Error?t.message:JSON.stringify(t),n=t instanceof Error?t.stack:null,i={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"},o=null;return O.createElement(O.Fragment,null,O.createElement("h2",null,"Unexpected Application Error!"),O.createElement("h3",{style:{fontStyle:"italic"}},e),n?O.createElement("pre",{style:i},n):null,o)}const NM=O.createElement(DM,null);class IM extends O.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,n){return n.location!==e.location||n.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:n.error,location:n.location,revalidation:e.revalidation||n.revalidation}}componentDidCatch(e,n){console.error("React Router caught the following error during render",e,n)}render(){return this.state.error!==void 0?O.createElement(qr.Provider,{value:this.props.routeContext},O.createElement(Bx.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function UM(t){let{routeContext:e,match:n,children:r}=t,i=O.useContext(Xp);return i&&i.static&&i.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=n.route.id),O.createElement(qr.Provider,{value:e},r)}function OM(t,e,n,r){var i;if(e===void 0&&(e=[]),n===void 0&&(n=null),r===void 0&&(r=null),t==null){var o;if(!n)return null;if(n.errors)t=n.matches;else if((o=r)!=null&&o.v7_partialHydration&&e.length===0&&!n.initialized&&n.matches.length>0)t=n.matches;else return null}let s=t,a=(i=n)==null?void 0:i.errors;if(a!=null){let u=s.findIndex(f=>f.route.id&&(a==null?void 0:a[f.route.id])!==void 0);u>=0||Tt(!1),s=s.slice(0,Math.min(s.length,u+1))}let l=!1,c=-1;if(n&&r&&r.v7_partialHydration)for(let u=0;u<s.length;u++){let f=s[u];if((f.route.HydrateFallback||f.route.hydrateFallbackElement)&&(c=u),f.route.id){let{loaderData:h,errors:v}=n,_=f.route.loader&&h[f.route.id]===void 0&&(!v||v[f.route.id]===void 0);if(f.route.lazy||_){l=!0,c>=0?s=s.slice(0,c+1):s=[s[0]];break}}}return s.reduceRight((u,f,h)=>{let v,_=!1,y=null,p=null;n&&(v=a&&f.route.id?a[f.route.id]:void 0,y=f.route.errorElement||NM,l&&(c<0&&h===0?(VM("route-fallback",!1),_=!0,p=null):c===h&&(_=!0,p=f.route.hydrateFallbackElement||null)));let d=e.concat(s.slice(0,h+1)),m=()=>{let g;return v?g=y:_?g=p:f.route.Component?g=O.createElement(f.route.Component,null):f.route.element?g=f.route.element:g=u,O.createElement(UM,{match:f,routeContext:{outlet:u,matches:d,isDataRoute:n!=null},children:g})};return n&&(f.route.ErrorBoundary||f.route.errorElement||h===0)?O.createElement(IM,{location:n.location,revalidation:n.revalidation,component:y,error:v,children:m(),routeContext:{outlet:null,matches:d,isDataRoute:!0}}):m()},null)}var Vx=function(t){return t.UseBlocker="useBlocker",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t}(Vx||{}),Wc=function(t){return t.UseBlocker="useBlocker",t.UseLoaderData="useLoaderData",t.UseActionData="useActionData",t.UseRouteError="useRouteError",t.UseNavigation="useNavigation",t.UseRouteLoaderData="useRouteLoaderData",t.UseMatches="useMatches",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t.UseRouteId="useRouteId",t}(Wc||{});function kM(t){let e=O.useContext(Xp);return e||Tt(!1),e}function FM(t){let e=O.useContext(AM);return e||Tt(!1),e}function BM(t){let e=O.useContext(qr);return e||Tt(!1),e}function Gx(t){let e=BM(),n=e.matches[e.matches.length-1];return n.route.id||Tt(!1),n.route.id}function zM(){var t;let e=O.useContext(Bx),n=FM(Wc.UseRouteError),r=Gx(Wc.UseRouteError);return e!==void 0?e:(t=n.errors)==null?void 0:t[r]}function HM(){let{router:t}=kM(Vx.UseNavigateStable),e=Gx(Wc.UseNavigateStable),n=O.useRef(!1);return zx(()=>{n.current=!0}),O.useCallback(function(i,o){o===void 0&&(o={}),n.current&&(typeof i=="number"?t.navigate(i):t.navigate(i,Ca({fromRouteId:e},o)))},[t,e])}const Kg={};function VM(t,e,n){!e&&!Kg[t]&&(Kg[t]=!0)}function GM(t,e){t==null||t.v7_startTransition,(t==null?void 0:t.v7_relativeSplatPath)===void 0&&(!e||e.v7_relativeSplatPath),e&&(e.v7_fetcherPersist,e.v7_normalizeFormMethod,e.v7_partialHydration,e.v7_skipActionErrorRevalidation)}function Yn(t){let{to:e,replace:n,state:r,relative:i}=t;ws()||Tt(!1);let{future:o,static:s}=O.useContext(Ni),{matches:a}=O.useContext(qr),{pathname:l}=Ba(),c=br(),u=jp(e,$p(a,o.v7_relativeSplatPath),l,i==="path"),f=JSON.stringify(u);return O.useEffect(()=>c(JSON.parse(f),{replace:n,state:r,relative:i}),[c,f,i,n,r]),null}function Ct(t){Tt(!1)}function WM(t){let{basename:e="/",children:n=null,location:r,navigationType:i=li.Pop,navigator:o,static:s=!1,future:a}=t;ws()&&Tt(!1);let l=e.replace(/^\/*/,"/"),c=O.useMemo(()=>({basename:l,navigator:o,static:s,future:Ca({v7_relativeSplatPath:!1},a)}),[l,a,o,s]);typeof r=="string"&&(r=Es(r));let{pathname:u="/",search:f="",hash:h="",state:v=null,key:_="default"}=r,y=O.useMemo(()=>{let p=Wp(u,l);return p==null?null:{location:{pathname:p,search:f,hash:h,state:v,key:_},navigationType:i}},[l,u,f,h,v,_,i]);return y==null?null:O.createElement(Ni.Provider,{value:c},O.createElement(xu.Provider,{children:n,value:y}))}function $M(t){let{children:e,location:n}=t;return PM(Sh(e),n)}new Promise(()=>{});function Sh(t,e){e===void 0&&(e=[]);let n=[];return O.Children.forEach(t,(r,i)=>{if(!O.isValidElement(r))return;let o=[...e,i];if(r.type===O.Fragment){n.push.apply(n,Sh(r.props.children,o));return}r.type!==Ct&&Tt(!1),!r.props.index||!r.props.children||Tt(!1);let s={id:r.props.id||o.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(s.children=Sh(r.props.children,o)),n.push(s)}),n}/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Eh(){return Eh=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},Eh.apply(this,arguments)}function jM(t,e){if(t==null)return{};var n={},r=Object.keys(t),i,o;for(o=0;o<r.length;o++)i=r[o],!(e.indexOf(i)>=0)&&(n[i]=t[i]);return n}function XM(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}function qM(t,e){return t.button===0&&(!e||e==="_self")&&!XM(t)}const YM=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],KM="6";try{window.__reactRouterVersion=KM}catch{}const ZM="startTransition",Zg=GE[ZM];function JM(t){let{basename:e,children:n,future:r,window:i}=t,o=O.useRef();o.current==null&&(o.current=tM({window:i,v5Compat:!0}));let s=o.current,[a,l]=O.useState({action:s.action,location:s.location}),{v7_startTransition:c}=r||{},u=O.useCallback(f=>{c&&Zg?Zg(()=>l(f)):l(f)},[l,c]);return O.useLayoutEffect(()=>s.listen(u),[s,u]),O.useEffect(()=>GM(r),[r]),O.createElement(WM,{basename:e,children:n,location:a.location,navigationType:a.action,navigator:s,future:r})}const QM=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",eT=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,tT=O.forwardRef(function(e,n){let{onClick:r,relative:i,reloadDocument:o,replace:s,state:a,target:l,to:c,preventScrollReset:u,viewTransition:f}=e,h=jM(e,YM),{basename:v}=O.useContext(Ni),_,y=!1;if(typeof c=="string"&&eT.test(c)&&(_=c,QM))try{let g=new URL(window.location.href),x=c.startsWith("//")?new URL(g.protocol+c):new URL(c),w=Wp(x.pathname,v);x.origin===g.origin&&w!=null?c=w+x.search+x.hash:y=!0}catch{}let p=RM(c,{relative:i}),d=nT(c,{replace:s,state:a,target:l,preventScrollReset:u,relative:i,viewTransition:f});function m(g){r&&r(g),g.defaultPrevented||d(g)}return O.createElement("a",Eh({},h,{href:_||p,onClick:y||o?r:m,ref:n,target:l}))});var Jg;(function(t){t.UseScrollRestoration="useScrollRestoration",t.UseSubmit="useSubmit",t.UseSubmitFetcher="useSubmitFetcher",t.UseFetcher="useFetcher",t.useViewTransitionState="useViewTransitionState"})(Jg||(Jg={}));var Qg;(function(t){t.UseFetcher="useFetcher",t.UseFetchers="useFetchers",t.UseScrollRestoration="useScrollRestoration"})(Qg||(Qg={}));function nT(t,e){let{target:n,replace:r,state:i,preventScrollReset:o,relative:s,viewTransition:a}=e===void 0?{}:e,l=br(),c=Ba(),u=Hx(t,{relative:s});return O.useCallback(f=>{if(qM(f,n)){f.preventDefault();let h=r!==void 0?r:Gc(c)===Gc(u);l(t,{replace:h,state:i,preventScrollReset:o,relative:s,viewTransition:a})}},[c,l,u,r,i,n,t,o,s,a])}const Mr=Object.create(null);Mr.open="0";Mr.close="1";Mr.ping="2";Mr.pong="3";Mr.message="4";Mr.upgrade="5";Mr.noop="6";const cc=Object.create(null);Object.keys(Mr).forEach(t=>{cc[Mr[t]]=t});const wh={type:"error",data:"parser error"},Wx=typeof Blob=="function"||typeof Blob<"u"&&Object.prototype.toString.call(Blob)==="[object BlobConstructor]",$x=typeof ArrayBuffer=="function",jx=t=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(t):t&&t.buffer instanceof ArrayBuffer,qp=({type:t,data:e},n,r)=>Wx&&e instanceof Blob?n?r(e):e0(e,r):$x&&(e instanceof ArrayBuffer||jx(e))?n?r(e):e0(new Blob([e]),r):r(Mr[t]+(e||"")),e0=(t,e)=>{const n=new FileReader;return n.onload=function(){const r=n.result.split(",")[1];e("b"+(r||""))},n.readAsDataURL(t)};function t0(t){return t instanceof Uint8Array?t:t instanceof ArrayBuffer?new Uint8Array(t):new Uint8Array(t.buffer,t.byteOffset,t.byteLength)}let Dd;function rT(t,e){if(Wx&&t.data instanceof Blob)return t.data.arrayBuffer().then(t0).then(e);if($x&&(t.data instanceof ArrayBuffer||jx(t.data)))return e(t0(t.data));qp(t,!1,n=>{Dd||(Dd=new TextEncoder),e(Dd.encode(n))})}const n0="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Ks=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(let t=0;t<n0.length;t++)Ks[n0.charCodeAt(t)]=t;const iT=t=>{let e=t.length*.75,n=t.length,r,i=0,o,s,a,l;t[t.length-1]==="="&&(e--,t[t.length-2]==="="&&e--);const c=new ArrayBuffer(e),u=new Uint8Array(c);for(r=0;r<n;r+=4)o=Ks[t.charCodeAt(r)],s=Ks[t.charCodeAt(r+1)],a=Ks[t.charCodeAt(r+2)],l=Ks[t.charCodeAt(r+3)],u[i++]=o<<2|s>>4,u[i++]=(s&15)<<4|a>>2,u[i++]=(a&3)<<6|l&63;return c},oT=typeof ArrayBuffer=="function",Yp=(t,e)=>{if(typeof t!="string")return{type:"message",data:Xx(t,e)};const n=t.charAt(0);return n==="b"?{type:"message",data:sT(t.substring(1),e)}:cc[n]?t.length>1?{type:cc[n],data:t.substring(1)}:{type:cc[n]}:wh},sT=(t,e)=>{if(oT){const n=iT(t);return Xx(n,e)}else return{base64:!0,data:t}},Xx=(t,e)=>{switch(e){case"blob":return t instanceof Blob?t:new Blob([t]);case"arraybuffer":default:return t instanceof ArrayBuffer?t:t.buffer}},qx=String.fromCharCode(30),aT=(t,e)=>{const n=t.length,r=new Array(n);let i=0;t.forEach((o,s)=>{qp(o,!1,a=>{r[s]=a,++i===n&&e(r.join(qx))})})},lT=(t,e)=>{const n=t.split(qx),r=[];for(let i=0;i<n.length;i++){const o=Yp(n[i],e);if(r.push(o),o.type==="error")break}return r};function cT(){return new TransformStream({transform(t,e){rT(t,n=>{const r=n.length;let i;if(r<126)i=new Uint8Array(1),new DataView(i.buffer).setUint8(0,r);else if(r<65536){i=new Uint8Array(3);const o=new DataView(i.buffer);o.setUint8(0,126),o.setUint16(1,r)}else{i=new Uint8Array(9);const o=new DataView(i.buffer);o.setUint8(0,127),o.setBigUint64(1,BigInt(r))}t.data&&typeof t.data!="string"&&(i[0]|=128),e.enqueue(i),e.enqueue(n)})}})}let Nd;function fl(t){return t.reduce((e,n)=>e+n.length,0)}function hl(t,e){if(t[0].length===e)return t.shift();const n=new Uint8Array(e);let r=0;for(let i=0;i<e;i++)n[i]=t[0][r++],r===t[0].length&&(t.shift(),r=0);return t.length&&r<t[0].length&&(t[0]=t[0].slice(r)),n}function uT(t,e){Nd||(Nd=new TextDecoder);const n=[];let r=0,i=-1,o=!1;return new TransformStream({transform(s,a){for(n.push(s);;){if(r===0){if(fl(n)<1)break;const l=hl(n,1);o=(l[0]&128)===128,i=l[0]&127,i<126?r=3:i===126?r=1:r=2}else if(r===1){if(fl(n)<2)break;const l=hl(n,2);i=new DataView(l.buffer,l.byteOffset,l.length).getUint16(0),r=3}else if(r===2){if(fl(n)<8)break;const l=hl(n,8),c=new DataView(l.buffer,l.byteOffset,l.length),u=c.getUint32(0);if(u>Math.pow(2,53-32)-1){a.enqueue(wh);break}i=u*Math.pow(2,32)+c.getUint32(4),r=3}else{if(fl(n)<i)break;const l=hl(n,i);a.enqueue(Yp(o?l:Nd.decode(l),e)),r=0}if(i===0||i>t){a.enqueue(wh);break}}}})}const Yx=4;function Lt(t){if(t)return dT(t)}function dT(t){for(var e in Lt.prototype)t[e]=Lt.prototype[e];return t}Lt.prototype.on=Lt.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e),this};Lt.prototype.once=function(t,e){function n(){this.off(t,n),e.apply(this,arguments)}return n.fn=e,this.on(t,n),this};Lt.prototype.off=Lt.prototype.removeListener=Lt.prototype.removeAllListeners=Lt.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},arguments.length==0)return this._callbacks={},this;var n=this._callbacks["$"+t];if(!n)return this;if(arguments.length==1)return delete this._callbacks["$"+t],this;for(var r,i=0;i<n.length;i++)if(r=n[i],r===e||r.fn===e){n.splice(i,1);break}return n.length===0&&delete this._callbacks["$"+t],this};Lt.prototype.emit=function(t){this._callbacks=this._callbacks||{};for(var e=new Array(arguments.length-1),n=this._callbacks["$"+t],r=1;r<arguments.length;r++)e[r-1]=arguments[r];if(n){n=n.slice(0);for(var r=0,i=n.length;r<i;++r)n[r].apply(this,e)}return this};Lt.prototype.emitReserved=Lt.prototype.emit;Lt.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]};Lt.prototype.hasListeners=function(t){return!!this.listeners(t).length};const Eu=(()=>typeof Promise=="function"&&typeof Promise.resolve=="function"?e=>Promise.resolve().then(e):(e,n)=>n(e,0))(),zn=(()=>typeof self<"u"?self:typeof window<"u"?window:Function("return this")())(),fT="arraybuffer";function Kx(t,...e){return e.reduce((n,r)=>(t.hasOwnProperty(r)&&(n[r]=t[r]),n),{})}const hT=zn.setTimeout,pT=zn.clearTimeout;function wu(t,e){e.useNativeTimers?(t.setTimeoutFn=hT.bind(zn),t.clearTimeoutFn=pT.bind(zn)):(t.setTimeoutFn=zn.setTimeout.bind(zn),t.clearTimeoutFn=zn.clearTimeout.bind(zn))}const mT=1.33;function gT(t){return typeof t=="string"?vT(t):Math.ceil((t.byteLength||t.size)*mT)}function vT(t){let e=0,n=0;for(let r=0,i=t.length;r<i;r++)e=t.charCodeAt(r),e<128?n+=1:e<2048?n+=2:e<55296||e>=57344?n+=3:(r++,n+=4);return n}function Zx(){return Date.now().toString(36).substring(3)+Math.random().toString(36).substring(2,5)}function _T(t){let e="";for(let n in t)t.hasOwnProperty(n)&&(e.length&&(e+="&"),e+=encodeURIComponent(n)+"="+encodeURIComponent(t[n]));return e}function yT(t){let e={},n=t.split("&");for(let r=0,i=n.length;r<i;r++){let o=n[r].split("=");e[decodeURIComponent(o[0])]=decodeURIComponent(o[1])}return e}class xT extends Error{constructor(e,n,r){super(e),this.description=n,this.context=r,this.type="TransportError"}}class Kp extends Lt{constructor(e){super(),this.writable=!1,wu(this,e),this.opts=e,this.query=e.query,this.socket=e.socket,this.supportsBinary=!e.forceBase64}onError(e,n,r){return super.emitReserved("error",new xT(e,n,r)),this}open(){return this.readyState="opening",this.doOpen(),this}close(){return(this.readyState==="opening"||this.readyState==="open")&&(this.doClose(),this.onClose()),this}send(e){this.readyState==="open"&&this.write(e)}onOpen(){this.readyState="open",this.writable=!0,super.emitReserved("open")}onData(e){const n=Yp(e,this.socket.binaryType);this.onPacket(n)}onPacket(e){super.emitReserved("packet",e)}onClose(e){this.readyState="closed",super.emitReserved("close",e)}pause(e){}createUri(e,n={}){return e+"://"+this._hostname()+this._port()+this.opts.path+this._query(n)}_hostname(){const e=this.opts.hostname;return e.indexOf(":")===-1?e:"["+e+"]"}_port(){return this.opts.port&&(this.opts.secure&&Number(this.opts.port)!==443||!this.opts.secure&&Number(this.opts.port)!==80)?":"+this.opts.port:""}_query(e){const n=_T(e);return n.length?"?"+n:""}}class ST extends Kp{constructor(){super(...arguments),this._polling=!1}get name(){return"polling"}doOpen(){this._poll()}pause(e){this.readyState="pausing";const n=()=>{this.readyState="paused",e()};if(this._polling||!this.writable){let r=0;this._polling&&(r++,this.once("pollComplete",function(){--r||n()})),this.writable||(r++,this.once("drain",function(){--r||n()}))}else n()}_poll(){this._polling=!0,this.doPoll(),this.emitReserved("poll")}onData(e){const n=r=>{if(this.readyState==="opening"&&r.type==="open"&&this.onOpen(),r.type==="close")return this.onClose({description:"transport closed by the server"}),!1;this.onPacket(r)};lT(e,this.socket.binaryType).forEach(n),this.readyState!=="closed"&&(this._polling=!1,this.emitReserved("pollComplete"),this.readyState==="open"&&this._poll())}doClose(){const e=()=>{this.write([{type:"close"}])};this.readyState==="open"?e():this.once("open",e)}write(e){this.writable=!1,aT(e,n=>{this.doWrite(n,()=>{this.writable=!0,this.emitReserved("drain")})})}uri(){const e=this.opts.secure?"https":"http",n=this.query||{};return this.opts.timestampRequests!==!1&&(n[this.opts.timestampParam]=Zx()),!this.supportsBinary&&!n.sid&&(n.b64=1),this.createUri(e,n)}}let Jx=!1;try{Jx=typeof XMLHttpRequest<"u"&&"withCredentials"in new XMLHttpRequest}catch{}const ET=Jx;function wT(){}class MT extends ST{constructor(e){if(super(e),typeof location<"u"){const n=location.protocol==="https:";let r=location.port;r||(r=n?"443":"80"),this.xd=typeof location<"u"&&e.hostname!==location.hostname||r!==e.port}}doWrite(e,n){const r=this.request({method:"POST",data:e});r.on("success",n),r.on("error",(i,o)=>{this.onError("xhr post error",i,o)})}doPoll(){const e=this.request();e.on("data",this.onData.bind(this)),e.on("error",(n,r)=>{this.onError("xhr poll error",n,r)}),this.pollXhr=e}}class xr extends Lt{constructor(e,n,r){super(),this.createRequest=e,wu(this,r),this._opts=r,this._method=r.method||"GET",this._uri=n,this._data=r.data!==void 0?r.data:null,this._create()}_create(){var e;const n=Kx(this._opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");n.xdomain=!!this._opts.xd;const r=this._xhr=this.createRequest(n);try{r.open(this._method,this._uri,!0);try{if(this._opts.extraHeaders){r.setDisableHeaderCheck&&r.setDisableHeaderCheck(!0);for(let i in this._opts.extraHeaders)this._opts.extraHeaders.hasOwnProperty(i)&&r.setRequestHeader(i,this._opts.extraHeaders[i])}}catch{}if(this._method==="POST")try{r.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch{}try{r.setRequestHeader("Accept","*/*")}catch{}(e=this._opts.cookieJar)===null||e===void 0||e.addCookies(r),"withCredentials"in r&&(r.withCredentials=this._opts.withCredentials),this._opts.requestTimeout&&(r.timeout=this._opts.requestTimeout),r.onreadystatechange=()=>{var i;r.readyState===3&&((i=this._opts.cookieJar)===null||i===void 0||i.parseCookies(r.getResponseHeader("set-cookie"))),r.readyState===4&&(r.status===200||r.status===1223?this._onLoad():this.setTimeoutFn(()=>{this._onError(typeof r.status=="number"?r.status:0)},0))},r.send(this._data)}catch(i){this.setTimeoutFn(()=>{this._onError(i)},0);return}typeof document<"u"&&(this._index=xr.requestsCount++,xr.requests[this._index]=this)}_onError(e){this.emitReserved("error",e,this._xhr),this._cleanup(!0)}_cleanup(e){if(!(typeof this._xhr>"u"||this._xhr===null)){if(this._xhr.onreadystatechange=wT,e)try{this._xhr.abort()}catch{}typeof document<"u"&&delete xr.requests[this._index],this._xhr=null}}_onLoad(){const e=this._xhr.responseText;e!==null&&(this.emitReserved("data",e),this.emitReserved("success"),this._cleanup())}abort(){this._cleanup()}}xr.requestsCount=0;xr.requests={};if(typeof document<"u"){if(typeof attachEvent=="function")attachEvent("onunload",r0);else if(typeof addEventListener=="function"){const t="onpagehide"in zn?"pagehide":"unload";addEventListener(t,r0,!1)}}function r0(){for(let t in xr.requests)xr.requests.hasOwnProperty(t)&&xr.requests[t].abort()}const TT=function(){const t=Qx({xdomain:!1});return t&&t.responseType!==null}();class bT extends MT{constructor(e){super(e);const n=e&&e.forceBase64;this.supportsBinary=TT&&!n}request(e={}){return Object.assign(e,{xd:this.xd},this.opts),new xr(Qx,this.uri(),e)}}function Qx(t){const e=t.xdomain;try{if(typeof XMLHttpRequest<"u"&&(!e||ET))return new XMLHttpRequest}catch{}if(!e)try{return new zn[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")}catch{}}const eS=typeof navigator<"u"&&typeof navigator.product=="string"&&navigator.product.toLowerCase()==="reactnative";class AT extends Kp{get name(){return"websocket"}doOpen(){const e=this.uri(),n=this.opts.protocols,r=eS?{}:Kx(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(r.headers=this.opts.extraHeaders);try{this.ws=this.createSocket(e,n,r)}catch(i){return this.emitReserved("error",i)}this.ws.binaryType=this.socket.binaryType,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=e=>this.onClose({description:"websocket connection closed",context:e}),this.ws.onmessage=e=>this.onData(e.data),this.ws.onerror=e=>this.onError("websocket error",e)}write(e){this.writable=!1;for(let n=0;n<e.length;n++){const r=e[n],i=n===e.length-1;qp(r,this.supportsBinary,o=>{try{this.doWrite(r,o)}catch{}i&&Eu(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){typeof this.ws<"u"&&(this.ws.onerror=()=>{},this.ws.close(),this.ws=null)}uri(){const e=this.opts.secure?"wss":"ws",n=this.query||{};return this.opts.timestampRequests&&(n[this.opts.timestampParam]=Zx()),this.supportsBinary||(n.b64=1),this.createUri(e,n)}}const Id=zn.WebSocket||zn.MozWebSocket;class RT extends AT{createSocket(e,n,r){return eS?new Id(e,n,r):n?new Id(e,n):new Id(e)}doWrite(e,n){this.ws.send(n)}}class CT extends Kp{get name(){return"webtransport"}doOpen(){try{this._transport=new WebTransport(this.createUri("https"),this.opts.transportOptions[this.name])}catch(e){return this.emitReserved("error",e)}this._transport.closed.then(()=>{this.onClose()}).catch(e=>{this.onError("webtransport error",e)}),this._transport.ready.then(()=>{this._transport.createBidirectionalStream().then(e=>{const n=uT(Number.MAX_SAFE_INTEGER,this.socket.binaryType),r=e.readable.pipeThrough(n).getReader(),i=cT();i.readable.pipeTo(e.writable),this._writer=i.writable.getWriter();const o=()=>{r.read().then(({done:a,value:l})=>{a||(this.onPacket(l),o())}).catch(a=>{})};o();const s={type:"open"};this.query.sid&&(s.data=`{"sid":"${this.query.sid}"}`),this._writer.write(s).then(()=>this.onOpen())})})}write(e){this.writable=!1;for(let n=0;n<e.length;n++){const r=e[n],i=n===e.length-1;this._writer.write(r).then(()=>{i&&Eu(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){var e;(e=this._transport)===null||e===void 0||e.close()}}const PT={websocket:RT,webtransport:CT,polling:bT},LT=/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,DT=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function Mh(t){if(t.length>8e3)throw"URI too long";const e=t,n=t.indexOf("["),r=t.indexOf("]");n!=-1&&r!=-1&&(t=t.substring(0,n)+t.substring(n,r).replace(/:/g,";")+t.substring(r,t.length));let i=LT.exec(t||""),o={},s=14;for(;s--;)o[DT[s]]=i[s]||"";return n!=-1&&r!=-1&&(o.source=e,o.host=o.host.substring(1,o.host.length-1).replace(/;/g,":"),o.authority=o.authority.replace("[","").replace("]","").replace(/;/g,":"),o.ipv6uri=!0),o.pathNames=NT(o,o.path),o.queryKey=IT(o,o.query),o}function NT(t,e){const n=/\/{2,9}/g,r=e.replace(n,"/").split("/");return(e.slice(0,1)=="/"||e.length===0)&&r.splice(0,1),e.slice(-1)=="/"&&r.splice(r.length-1,1),r}function IT(t,e){const n={};return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(r,i,o){i&&(n[i]=o)}),n}const Th=typeof addEventListener=="function"&&typeof removeEventListener=="function",uc=[];Th&&addEventListener("offline",()=>{uc.forEach(t=>t())},!1);class Si extends Lt{constructor(e,n){if(super(),this.binaryType=fT,this.writeBuffer=[],this._prevBufferLen=0,this._pingInterval=-1,this._pingTimeout=-1,this._maxPayload=-1,this._pingTimeoutTime=1/0,e&&typeof e=="object"&&(n=e,e=null),e){const r=Mh(e);n.hostname=r.host,n.secure=r.protocol==="https"||r.protocol==="wss",n.port=r.port,r.query&&(n.query=r.query)}else n.host&&(n.hostname=Mh(n.host).host);wu(this,n),this.secure=n.secure!=null?n.secure:typeof location<"u"&&location.protocol==="https:",n.hostname&&!n.port&&(n.port=this.secure?"443":"80"),this.hostname=n.hostname||(typeof location<"u"?location.hostname:"localhost"),this.port=n.port||(typeof location<"u"&&location.port?location.port:this.secure?"443":"80"),this.transports=[],this._transportsByName={},n.transports.forEach(r=>{const i=r.prototype.name;this.transports.push(i),this._transportsByName[i]=r}),this.opts=Object.assign({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,addTrailingSlash:!0,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!1},n),this.opts.path=this.opts.path.replace(/\/$/,"")+(this.opts.addTrailingSlash?"/":""),typeof this.opts.query=="string"&&(this.opts.query=yT(this.opts.query)),Th&&(this.opts.closeOnBeforeunload&&(this._beforeunloadEventListener=()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},addEventListener("beforeunload",this._beforeunloadEventListener,!1)),this.hostname!=="localhost"&&(this._offlineEventListener=()=>{this._onClose("transport close",{description:"network connection lost"})},uc.push(this._offlineEventListener))),this.opts.withCredentials&&(this._cookieJar=void 0),this._open()}createTransport(e){const n=Object.assign({},this.opts.query);n.EIO=Yx,n.transport=e,this.id&&(n.sid=this.id);const r=Object.assign({},this.opts,{query:n,socket:this,hostname:this.hostname,secure:this.secure,port:this.port},this.opts.transportOptions[e]);return new this._transportsByName[e](r)}_open(){if(this.transports.length===0){this.setTimeoutFn(()=>{this.emitReserved("error","No transports available")},0);return}const e=this.opts.rememberUpgrade&&Si.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1?"websocket":this.transports[0];this.readyState="opening";const n=this.createTransport(e);n.open(),this.setTransport(n)}setTransport(e){this.transport&&this.transport.removeAllListeners(),this.transport=e,e.on("drain",this._onDrain.bind(this)).on("packet",this._onPacket.bind(this)).on("error",this._onError.bind(this)).on("close",n=>this._onClose("transport close",n))}onOpen(){this.readyState="open",Si.priorWebsocketSuccess=this.transport.name==="websocket",this.emitReserved("open"),this.flush()}_onPacket(e){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")switch(this.emitReserved("packet",e),this.emitReserved("heartbeat"),e.type){case"open":this.onHandshake(JSON.parse(e.data));break;case"ping":this._sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong"),this._resetPingTimeout();break;case"error":const n=new Error("server error");n.code=e.data,this._onError(n);break;case"message":this.emitReserved("data",e.data),this.emitReserved("message",e.data);break}}onHandshake(e){this.emitReserved("handshake",e),this.id=e.sid,this.transport.query.sid=e.sid,this._pingInterval=e.pingInterval,this._pingTimeout=e.pingTimeout,this._maxPayload=e.maxPayload,this.onOpen(),this.readyState!=="closed"&&this._resetPingTimeout()}_resetPingTimeout(){this.clearTimeoutFn(this._pingTimeoutTimer);const e=this._pingInterval+this._pingTimeout;this._pingTimeoutTime=Date.now()+e,this._pingTimeoutTimer=this.setTimeoutFn(()=>{this._onClose("ping timeout")},e),this.opts.autoUnref&&this._pingTimeoutTimer.unref()}_onDrain(){this.writeBuffer.splice(0,this._prevBufferLen),this._prevBufferLen=0,this.writeBuffer.length===0?this.emitReserved("drain"):this.flush()}flush(){if(this.readyState!=="closed"&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){const e=this._getWritablePackets();this.transport.send(e),this._prevBufferLen=e.length,this.emitReserved("flush")}}_getWritablePackets(){if(!(this._maxPayload&&this.transport.name==="polling"&&this.writeBuffer.length>1))return this.writeBuffer;let n=1;for(let r=0;r<this.writeBuffer.length;r++){const i=this.writeBuffer[r].data;if(i&&(n+=gT(i)),r>0&&n>this._maxPayload)return this.writeBuffer.slice(0,r);n+=2}return this.writeBuffer}_hasPingExpired(){if(!this._pingTimeoutTime)return!0;const e=Date.now()>this._pingTimeoutTime;return e&&(this._pingTimeoutTime=0,Eu(()=>{this._onClose("ping timeout")},this.setTimeoutFn)),e}write(e,n,r){return this._sendPacket("message",e,n,r),this}send(e,n,r){return this._sendPacket("message",e,n,r),this}_sendPacket(e,n,r,i){if(typeof n=="function"&&(i=n,n=void 0),typeof r=="function"&&(i=r,r=null),this.readyState==="closing"||this.readyState==="closed")return;r=r||{},r.compress=r.compress!==!1;const o={type:e,data:n,options:r};this.emitReserved("packetCreate",o),this.writeBuffer.push(o),i&&this.once("flush",i),this.flush()}close(){const e=()=>{this._onClose("forced close"),this.transport.close()},n=()=>{this.off("upgrade",n),this.off("upgradeError",n),e()},r=()=>{this.once("upgrade",n),this.once("upgradeError",n)};return(this.readyState==="opening"||this.readyState==="open")&&(this.readyState="closing",this.writeBuffer.length?this.once("drain",()=>{this.upgrading?r():e()}):this.upgrading?r():e()),this}_onError(e){if(Si.priorWebsocketSuccess=!1,this.opts.tryAllTransports&&this.transports.length>1&&this.readyState==="opening")return this.transports.shift(),this._open();this.emitReserved("error",e),this._onClose("transport error",e)}_onClose(e,n){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing"){if(this.clearTimeoutFn(this._pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),Th&&(this._beforeunloadEventListener&&removeEventListener("beforeunload",this._beforeunloadEventListener,!1),this._offlineEventListener)){const r=uc.indexOf(this._offlineEventListener);r!==-1&&uc.splice(r,1)}this.readyState="closed",this.id=null,this.emitReserved("close",e,n),this.writeBuffer=[],this._prevBufferLen=0}}}Si.protocol=Yx;class UT extends Si{constructor(){super(...arguments),this._upgrades=[]}onOpen(){if(super.onOpen(),this.readyState==="open"&&this.opts.upgrade)for(let e=0;e<this._upgrades.length;e++)this._probe(this._upgrades[e])}_probe(e){let n=this.createTransport(e),r=!1;Si.priorWebsocketSuccess=!1;const i=()=>{r||(n.send([{type:"ping",data:"probe"}]),n.once("packet",f=>{if(!r)if(f.type==="pong"&&f.data==="probe"){if(this.upgrading=!0,this.emitReserved("upgrading",n),!n)return;Si.priorWebsocketSuccess=n.name==="websocket",this.transport.pause(()=>{r||this.readyState!=="closed"&&(u(),this.setTransport(n),n.send([{type:"upgrade"}]),this.emitReserved("upgrade",n),n=null,this.upgrading=!1,this.flush())})}else{const h=new Error("probe error");h.transport=n.name,this.emitReserved("upgradeError",h)}}))};function o(){r||(r=!0,u(),n.close(),n=null)}const s=f=>{const h=new Error("probe error: "+f);h.transport=n.name,o(),this.emitReserved("upgradeError",h)};function a(){s("transport closed")}function l(){s("socket closed")}function c(f){n&&f.name!==n.name&&o()}const u=()=>{n.removeListener("open",i),n.removeListener("error",s),n.removeListener("close",a),this.off("close",l),this.off("upgrading",c)};n.once("open",i),n.once("error",s),n.once("close",a),this.once("close",l),this.once("upgrading",c),this._upgrades.indexOf("webtransport")!==-1&&e!=="webtransport"?this.setTimeoutFn(()=>{r||n.open()},200):n.open()}onHandshake(e){this._upgrades=this._filterUpgrades(e.upgrades),super.onHandshake(e)}_filterUpgrades(e){const n=[];for(let r=0;r<e.length;r++)~this.transports.indexOf(e[r])&&n.push(e[r]);return n}}let OT=class extends UT{constructor(e,n={}){const r=typeof e=="object"?e:n;(!r.transports||r.transports&&typeof r.transports[0]=="string")&&(r.transports=(r.transports||["polling","websocket","webtransport"]).map(i=>PT[i]).filter(i=>!!i)),super(e,r)}};function kT(t,e="",n){let r=t;n=n||typeof location<"u"&&location,t==null&&(t=n.protocol+"//"+n.host),typeof t=="string"&&(t.charAt(0)==="/"&&(t.charAt(1)==="/"?t=n.protocol+t:t=n.host+t),/^(https?|wss?):\/\//.test(t)||(typeof n<"u"?t=n.protocol+"//"+t:t="https://"+t),r=Mh(t)),r.port||(/^(http|ws)$/.test(r.protocol)?r.port="80":/^(http|ws)s$/.test(r.protocol)&&(r.port="443")),r.path=r.path||"/";const o=r.host.indexOf(":")!==-1?"["+r.host+"]":r.host;return r.id=r.protocol+"://"+o+":"+r.port+e,r.href=r.protocol+"://"+o+(n&&n.port===r.port?"":":"+r.port),r}const FT=typeof ArrayBuffer=="function",BT=t=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(t):t.buffer instanceof ArrayBuffer,tS=Object.prototype.toString,zT=typeof Blob=="function"||typeof Blob<"u"&&tS.call(Blob)==="[object BlobConstructor]",HT=typeof File=="function"||typeof File<"u"&&tS.call(File)==="[object FileConstructor]";function Zp(t){return FT&&(t instanceof ArrayBuffer||BT(t))||zT&&t instanceof Blob||HT&&t instanceof File}function dc(t,e){if(!t||typeof t!="object")return!1;if(Array.isArray(t)){for(let n=0,r=t.length;n<r;n++)if(dc(t[n]))return!0;return!1}if(Zp(t))return!0;if(t.toJSON&&typeof t.toJSON=="function"&&arguments.length===1)return dc(t.toJSON(),!0);for(const n in t)if(Object.prototype.hasOwnProperty.call(t,n)&&dc(t[n]))return!0;return!1}function VT(t){const e=[],n=t.data,r=t;return r.data=bh(n,e),r.attachments=e.length,{packet:r,buffers:e}}function bh(t,e){if(!t)return t;if(Zp(t)){const n={_placeholder:!0,num:e.length};return e.push(t),n}else if(Array.isArray(t)){const n=new Array(t.length);for(let r=0;r<t.length;r++)n[r]=bh(t[r],e);return n}else if(typeof t=="object"&&!(t instanceof Date)){const n={};for(const r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=bh(t[r],e));return n}return t}function GT(t,e){return t.data=Ah(t.data,e),delete t.attachments,t}function Ah(t,e){if(!t)return t;if(t&&t._placeholder===!0){if(typeof t.num=="number"&&t.num>=0&&t.num<e.length)return e[t.num];throw new Error("illegal attachments")}else if(Array.isArray(t))for(let n=0;n<t.length;n++)t[n]=Ah(t[n],e);else if(typeof t=="object")for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&(t[n]=Ah(t[n],e));return t}const nS=["connect","connect_error","disconnect","disconnecting","newListener","removeListener"],WT=5;var Ye;(function(t){t[t.CONNECT=0]="CONNECT",t[t.DISCONNECT=1]="DISCONNECT",t[t.EVENT=2]="EVENT",t[t.ACK=3]="ACK",t[t.CONNECT_ERROR=4]="CONNECT_ERROR",t[t.BINARY_EVENT=5]="BINARY_EVENT",t[t.BINARY_ACK=6]="BINARY_ACK"})(Ye||(Ye={}));class $T{constructor(e){this.replacer=e}encode(e){return(e.type===Ye.EVENT||e.type===Ye.ACK)&&dc(e)?this.encodeAsBinary({type:e.type===Ye.EVENT?Ye.BINARY_EVENT:Ye.BINARY_ACK,nsp:e.nsp,data:e.data,id:e.id}):[this.encodeAsString(e)]}encodeAsString(e){let n=""+e.type;return(e.type===Ye.BINARY_EVENT||e.type===Ye.BINARY_ACK)&&(n+=e.attachments+"-"),e.nsp&&e.nsp!=="/"&&(n+=e.nsp+","),e.id!=null&&(n+=e.id),e.data!=null&&(n+=JSON.stringify(e.data,this.replacer)),n}encodeAsBinary(e){const n=VT(e),r=this.encodeAsString(n.packet),i=n.buffers;return i.unshift(r),i}}class Jp extends Lt{constructor(e){super(),this.reviver=e}add(e){let n;if(typeof e=="string"){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");n=this.decodeString(e);const r=n.type===Ye.BINARY_EVENT;r||n.type===Ye.BINARY_ACK?(n.type=r?Ye.EVENT:Ye.ACK,this.reconstructor=new jT(n),n.attachments===0&&super.emitReserved("decoded",n)):super.emitReserved("decoded",n)}else if(Zp(e)||e.base64)if(this.reconstructor)n=this.reconstructor.takeBinaryData(e),n&&(this.reconstructor=null,super.emitReserved("decoded",n));else throw new Error("got binary data when not reconstructing a packet");else throw new Error("Unknown type: "+e)}decodeString(e){let n=0;const r={type:Number(e.charAt(0))};if(Ye[r.type]===void 0)throw new Error("unknown packet type "+r.type);if(r.type===Ye.BINARY_EVENT||r.type===Ye.BINARY_ACK){const o=n+1;for(;e.charAt(++n)!=="-"&&n!=e.length;);const s=e.substring(o,n);if(s!=Number(s)||e.charAt(n)!=="-")throw new Error("Illegal attachments");r.attachments=Number(s)}if(e.charAt(n+1)==="/"){const o=n+1;for(;++n&&!(e.charAt(n)===","||n===e.length););r.nsp=e.substring(o,n)}else r.nsp="/";const i=e.charAt(n+1);if(i!==""&&Number(i)==i){const o=n+1;for(;++n;){const s=e.charAt(n);if(s==null||Number(s)!=s){--n;break}if(n===e.length)break}r.id=Number(e.substring(o,n+1))}if(e.charAt(++n)){const o=this.tryParse(e.substr(n));if(Jp.isPayloadValid(r.type,o))r.data=o;else throw new Error("invalid payload")}return r}tryParse(e){try{return JSON.parse(e,this.reviver)}catch{return!1}}static isPayloadValid(e,n){switch(e){case Ye.CONNECT:return $c(n);case Ye.DISCONNECT:return n===void 0;case Ye.CONNECT_ERROR:return typeof n=="string"||$c(n);case Ye.EVENT:case Ye.BINARY_EVENT:return Array.isArray(n)&&(typeof n[0]=="number"||typeof n[0]=="string"&&nS.indexOf(n[0])===-1);case Ye.ACK:case Ye.BINARY_ACK:return Array.isArray(n)}}destroy(){this.reconstructor&&(this.reconstructor.finishedReconstruction(),this.reconstructor=null)}}class jT{constructor(e){this.packet=e,this.buffers=[],this.reconPack=e}takeBinaryData(e){if(this.buffers.push(e),this.buffers.length===this.reconPack.attachments){const n=GT(this.reconPack,this.buffers);return this.finishedReconstruction(),n}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}}function XT(t){return typeof t=="string"}const qT=Number.isInteger||function(t){return typeof t=="number"&&isFinite(t)&&Math.floor(t)===t};function YT(t){return t===void 0||qT(t)}function $c(t){return Object.prototype.toString.call(t)==="[object Object]"}function KT(t,e){switch(t){case Ye.CONNECT:return e===void 0||$c(e);case Ye.DISCONNECT:return e===void 0;case Ye.EVENT:return Array.isArray(e)&&(typeof e[0]=="number"||typeof e[0]=="string"&&nS.indexOf(e[0])===-1);case Ye.ACK:return Array.isArray(e);case Ye.CONNECT_ERROR:return typeof e=="string"||$c(e);default:return!1}}function ZT(t){return XT(t.nsp)&&YT(t.id)&&KT(t.type,t.data)}const JT=Object.freeze(Object.defineProperty({__proto__:null,Decoder:Jp,Encoder:$T,get PacketType(){return Ye},isPacketValid:ZT,protocol:WT},Symbol.toStringTag,{value:"Module"}));function tr(t,e,n){return t.on(e,n),function(){t.off(e,n)}}const QT=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1});class rS extends Lt{constructor(e,n,r){super(),this.connected=!1,this.recovered=!1,this.receiveBuffer=[],this.sendBuffer=[],this._queue=[],this._queueSeq=0,this.ids=0,this.acks={},this.flags={},this.io=e,this.nsp=n,r&&r.auth&&(this.auth=r.auth),this._opts=Object.assign({},r),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;const e=this.io;this.subs=[tr(e,"open",this.onopen.bind(this)),tr(e,"packet",this.onpacket.bind(this)),tr(e,"error",this.onerror.bind(this)),tr(e,"close",this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected?this:(this.subEvents(),this.io._reconnecting||this.io.open(),this.io._readyState==="open"&&this.onopen(),this)}open(){return this.connect()}send(...e){return e.unshift("message"),this.emit.apply(this,e),this}emit(e,...n){var r,i,o;if(QT.hasOwnProperty(e))throw new Error('"'+e.toString()+'" is a reserved event name');if(n.unshift(e),this._opts.retries&&!this.flags.fromQueue&&!this.flags.volatile)return this._addToQueue(n),this;const s={type:Ye.EVENT,data:n};if(s.options={},s.options.compress=this.flags.compress!==!1,typeof n[n.length-1]=="function"){const u=this.ids++,f=n.pop();this._registerAckCallback(u,f),s.id=u}const a=(i=(r=this.io.engine)===null||r===void 0?void 0:r.transport)===null||i===void 0?void 0:i.writable,l=this.connected&&!(!((o=this.io.engine)===null||o===void 0)&&o._hasPingExpired());return this.flags.volatile&&!a||(l?(this.notifyOutgoingListeners(s),this.packet(s)):this.sendBuffer.push(s)),this.flags={},this}_registerAckCallback(e,n){var r;const i=(r=this.flags.timeout)!==null&&r!==void 0?r:this._opts.ackTimeout;if(i===void 0){this.acks[e]=n;return}const o=this.io.setTimeoutFn(()=>{delete this.acks[e];for(let a=0;a<this.sendBuffer.length;a++)this.sendBuffer[a].id===e&&this.sendBuffer.splice(a,1);n.call(this,new Error("operation has timed out"))},i),s=(...a)=>{this.io.clearTimeoutFn(o),n.apply(this,a)};s.withError=!0,this.acks[e]=s}emitWithAck(e,...n){return new Promise((r,i)=>{const o=(s,a)=>s?i(s):r(a);o.withError=!0,n.push(o),this.emit(e,...n)})}_addToQueue(e){let n;typeof e[e.length-1]=="function"&&(n=e.pop());const r={id:this._queueSeq++,tryCount:0,pending:!1,args:e,flags:Object.assign({fromQueue:!0},this.flags)};e.push((i,...o)=>(this._queue[0],i!==null?r.tryCount>this._opts.retries&&(this._queue.shift(),n&&n(i)):(this._queue.shift(),n&&n(null,...o)),r.pending=!1,this._drainQueue())),this._queue.push(r),this._drainQueue()}_drainQueue(e=!1){if(!this.connected||this._queue.length===0)return;const n=this._queue[0];n.pending&&!e||(n.pending=!0,n.tryCount++,this.flags=n.flags,this.emit.apply(this,n.args))}packet(e){e.nsp=this.nsp,this.io._packet(e)}onopen(){typeof this.auth=="function"?this.auth(e=>{this._sendConnectPacket(e)}):this._sendConnectPacket(this.auth)}_sendConnectPacket(e){this.packet({type:Ye.CONNECT,data:this._pid?Object.assign({pid:this._pid,offset:this._lastOffset},e):e})}onerror(e){this.connected||this.emitReserved("connect_error",e)}onclose(e,n){this.connected=!1,delete this.id,this.emitReserved("disconnect",e,n),this._clearAcks()}_clearAcks(){Object.keys(this.acks).forEach(e=>{if(!this.sendBuffer.some(r=>String(r.id)===e)){const r=this.acks[e];delete this.acks[e],r.withError&&r.call(this,new Error("socket has been disconnected"))}})}onpacket(e){if(e.nsp===this.nsp)switch(e.type){case Ye.CONNECT:e.data&&e.data.sid?this.onconnect(e.data.sid,e.data.pid):this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case Ye.EVENT:case Ye.BINARY_EVENT:this.onevent(e);break;case Ye.ACK:case Ye.BINARY_ACK:this.onack(e);break;case Ye.DISCONNECT:this.ondisconnect();break;case Ye.CONNECT_ERROR:this.destroy();const r=new Error(e.data.message);r.data=e.data.data,this.emitReserved("connect_error",r);break}}onevent(e){const n=e.data||[];e.id!=null&&n.push(this.ack(e.id)),this.connected?this.emitEvent(n):this.receiveBuffer.push(Object.freeze(n))}emitEvent(e){if(this._anyListeners&&this._anyListeners.length){const n=this._anyListeners.slice();for(const r of n)r.apply(this,e)}super.emit.apply(this,e),this._pid&&e.length&&typeof e[e.length-1]=="string"&&(this._lastOffset=e[e.length-1])}ack(e){const n=this;let r=!1;return function(...i){r||(r=!0,n.packet({type:Ye.ACK,id:e,data:i}))}}onack(e){const n=this.acks[e.id];typeof n=="function"&&(delete this.acks[e.id],n.withError&&e.data.unshift(null),n.apply(this,e.data))}onconnect(e,n){this.id=e,this.recovered=n&&this._pid===n,this._pid=n,this.connected=!0,this.emitBuffered(),this._drainQueue(!0),this.emitReserved("connect")}emitBuffered(){this.receiveBuffer.forEach(e=>this.emitEvent(e)),this.receiveBuffer=[],this.sendBuffer.forEach(e=>{this.notifyOutgoingListeners(e),this.packet(e)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose("io server disconnect")}destroy(){this.subs&&(this.subs.forEach(e=>e()),this.subs=void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:Ye.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}close(){return this.disconnect()}compress(e){return this.flags.compress=e,this}get volatile(){return this.flags.volatile=!0,this}timeout(e){return this.flags.timeout=e,this}onAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(e),this}prependAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(e),this}offAny(e){if(!this._anyListeners)return this;if(e){const n=this._anyListeners;for(let r=0;r<n.length;r++)if(e===n[r])return n.splice(r,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(e),this}prependAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(e),this}offAnyOutgoing(e){if(!this._anyOutgoingListeners)return this;if(e){const n=this._anyOutgoingListeners;for(let r=0;r<n.length;r++)if(e===n[r])return n.splice(r,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(e){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){const n=this._anyOutgoingListeners.slice();for(const r of n)r.apply(this,e.data)}}}function Ms(t){t=t||{},this.ms=t.min||100,this.max=t.max||1e4,this.factor=t.factor||2,this.jitter=t.jitter>0&&t.jitter<=1?t.jitter:0,this.attempts=0}Ms.prototype.duration=function(){var t=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var e=Math.random(),n=Math.floor(e*this.jitter*t);t=Math.floor(e*10)&1?t+n:t-n}return Math.min(t,this.max)|0};Ms.prototype.reset=function(){this.attempts=0};Ms.prototype.setMin=function(t){this.ms=t};Ms.prototype.setMax=function(t){this.max=t};Ms.prototype.setJitter=function(t){this.jitter=t};class Rh extends Lt{constructor(e,n){var r;super(),this.nsps={},this.subs=[],e&&typeof e=="object"&&(n=e,e=void 0),n=n||{},n.path=n.path||"/socket.io",this.opts=n,wu(this,n),this.reconnection(n.reconnection!==!1),this.reconnectionAttempts(n.reconnectionAttempts||1/0),this.reconnectionDelay(n.reconnectionDelay||1e3),this.reconnectionDelayMax(n.reconnectionDelayMax||5e3),this.randomizationFactor((r=n.randomizationFactor)!==null&&r!==void 0?r:.5),this.backoff=new Ms({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(n.timeout==null?2e4:n.timeout),this._readyState="closed",this.uri=e;const i=n.parser||JT;this.encoder=new i.Encoder,this.decoder=new i.Decoder,this._autoConnect=n.autoConnect!==!1,this._autoConnect&&this.open()}reconnection(e){return arguments.length?(this._reconnection=!!e,e||(this.skipReconnect=!0),this):this._reconnection}reconnectionAttempts(e){return e===void 0?this._reconnectionAttempts:(this._reconnectionAttempts=e,this)}reconnectionDelay(e){var n;return e===void 0?this._reconnectionDelay:(this._reconnectionDelay=e,(n=this.backoff)===null||n===void 0||n.setMin(e),this)}randomizationFactor(e){var n;return e===void 0?this._randomizationFactor:(this._randomizationFactor=e,(n=this.backoff)===null||n===void 0||n.setJitter(e),this)}reconnectionDelayMax(e){var n;return e===void 0?this._reconnectionDelayMax:(this._reconnectionDelayMax=e,(n=this.backoff)===null||n===void 0||n.setMax(e),this)}timeout(e){return arguments.length?(this._timeout=e,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&this.backoff.attempts===0&&this.reconnect()}open(e){if(~this._readyState.indexOf("open"))return this;this.engine=new OT(this.uri,this.opts);const n=this.engine,r=this;this._readyState="opening",this.skipReconnect=!1;const i=tr(n,"open",function(){r.onopen(),e&&e()}),o=a=>{this.cleanup(),this._readyState="closed",this.emitReserved("error",a),e?e(a):this.maybeReconnectOnOpen()},s=tr(n,"error",o);if(this._timeout!==!1){const a=this._timeout,l=this.setTimeoutFn(()=>{i(),o(new Error("timeout")),n.close()},a);this.opts.autoUnref&&l.unref(),this.subs.push(()=>{this.clearTimeoutFn(l)})}return this.subs.push(i),this.subs.push(s),this}connect(e){return this.open(e)}onopen(){this.cleanup(),this._readyState="open",this.emitReserved("open");const e=this.engine;this.subs.push(tr(e,"ping",this.onping.bind(this)),tr(e,"data",this.ondata.bind(this)),tr(e,"error",this.onerror.bind(this)),tr(e,"close",this.onclose.bind(this)),tr(this.decoder,"decoded",this.ondecoded.bind(this)))}onping(){this.emitReserved("ping")}ondata(e){try{this.decoder.add(e)}catch(n){this.onclose("parse error",n)}}ondecoded(e){Eu(()=>{this.emitReserved("packet",e)},this.setTimeoutFn)}onerror(e){this.emitReserved("error",e)}socket(e,n){let r=this.nsps[e];return r?this._autoConnect&&!r.active&&r.connect():(r=new rS(this,e,n),this.nsps[e]=r),r}_destroy(e){const n=Object.keys(this.nsps);for(const r of n)if(this.nsps[r].active)return;this._close()}_packet(e){const n=this.encoder.encode(e);for(let r=0;r<n.length;r++)this.engine.write(n[r],e.options)}cleanup(){this.subs.forEach(e=>e()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close")}disconnect(){return this._close()}onclose(e,n){var r;this.cleanup(),(r=this.engine)===null||r===void 0||r.close(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",e,n),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;const e=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{const n=this.backoff.duration();this._reconnecting=!0;const r=this.setTimeoutFn(()=>{e.skipReconnect||(this.emitReserved("reconnect_attempt",e.backoff.attempts),!e.skipReconnect&&e.open(i=>{i?(e._reconnecting=!1,e.reconnect(),this.emitReserved("reconnect_error",i)):e.onreconnect()}))},n);this.opts.autoUnref&&r.unref(),this.subs.push(()=>{this.clearTimeoutFn(r)})}}onreconnect(){const e=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",e)}}const Fs={};function fc(t,e){typeof t=="object"&&(e=t,t=void 0),e=e||{};const n=kT(t,e.path||"/socket.io"),r=n.source,i=n.id,o=n.path,s=Fs[i]&&o in Fs[i].nsps,a=e.forceNew||e["force new connection"]||e.multiplex===!1||s;let l;return a?l=new Rh(r,e):(Fs[i]||(Fs[i]=new Rh(r,e)),l=Fs[i]),n.query&&!e.query&&(e.query=n.queryKey),l.socket(n.path,e)}Object.assign(fc,{Manager:Rh,Socket:rS,io:fc,connect:fc});var iS={exports:{}},lt={};/**
 * @license React
 * react-is.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Qp=Symbol.for("react.transitional.element"),em=Symbol.for("react.portal"),Mu=Symbol.for("react.fragment"),Tu=Symbol.for("react.strict_mode"),bu=Symbol.for("react.profiler"),Au=Symbol.for("react.consumer"),Ru=Symbol.for("react.context"),Cu=Symbol.for("react.forward_ref"),Pu=Symbol.for("react.suspense"),Lu=Symbol.for("react.suspense_list"),Du=Symbol.for("react.memo"),Nu=Symbol.for("react.lazy"),eb=Symbol.for("react.view_transition"),tb=Symbol.for("react.client.reference");function Xn(t){if(typeof t=="object"&&t!==null){var e=t.$$typeof;switch(e){case Qp:switch(t=t.type,t){case Mu:case bu:case Tu:case Pu:case Lu:case eb:return t;default:switch(t=t&&t.$$typeof,t){case Ru:case Cu:case Nu:case Du:return t;case Au:return t;default:return e}}case em:return e}}}lt.ContextConsumer=Au;lt.ContextProvider=Ru;lt.Element=Qp;lt.ForwardRef=Cu;lt.Fragment=Mu;lt.Lazy=Nu;lt.Memo=Du;lt.Portal=em;lt.Profiler=bu;lt.StrictMode=Tu;lt.Suspense=Pu;lt.SuspenseList=Lu;lt.isContextConsumer=function(t){return Xn(t)===Au};lt.isContextProvider=function(t){return Xn(t)===Ru};lt.isElement=function(t){return typeof t=="object"&&t!==null&&t.$$typeof===Qp};lt.isForwardRef=function(t){return Xn(t)===Cu};lt.isFragment=function(t){return Xn(t)===Mu};lt.isLazy=function(t){return Xn(t)===Nu};lt.isMemo=function(t){return Xn(t)===Du};lt.isPortal=function(t){return Xn(t)===em};lt.isProfiler=function(t){return Xn(t)===bu};lt.isStrictMode=function(t){return Xn(t)===Tu};lt.isSuspense=function(t){return Xn(t)===Pu};lt.isSuspenseList=function(t){return Xn(t)===Lu};lt.isValidElementType=function(t){return typeof t=="string"||typeof t=="function"||t===Mu||t===bu||t===Tu||t===Pu||t===Lu||typeof t=="object"&&t!==null&&(t.$$typeof===Nu||t.$$typeof===Du||t.$$typeof===Ru||t.$$typeof===Au||t.$$typeof===Cu||t.$$typeof===tb||t.getModuleId!==void 0)};lt.typeOf=Xn;iS.exports=lt;var oS=iS.exports;function nb(t){function e(L,Y,Z,se,B){for(var xe=0,oe=0,Te=0,De=0,Ee,z,rt=0,we=0,_e,Re=_e=Ee=0,Ie=0,Ce=0,Be=0,Fe=0,ft=Z.length,gt=ft-1,P,M="",$="",he="",ce="",ue;Ie<ft;){if(z=Z.charCodeAt(Ie),Ie===gt&&oe+De+Te+xe!==0&&(oe!==0&&(z=oe===47?10:47),De=Te=xe=0,ft++,gt++),oe+De+Te+xe===0){if(Ie===gt&&(0<Ce&&(M=M.replace(h,"")),0<M.trim().length)){switch(z){case 32:case 9:case 59:case 13:case 10:break;default:M+=Z.charAt(Ie)}z=59}switch(z){case 123:for(M=M.trim(),Ee=M.charCodeAt(0),_e=1,Fe=++Ie;Ie<ft;){switch(z=Z.charCodeAt(Ie)){case 123:_e++;break;case 125:_e--;break;case 47:switch(z=Z.charCodeAt(Ie+1)){case 42:case 47:e:{for(Re=Ie+1;Re<gt;++Re)switch(Z.charCodeAt(Re)){case 47:if(z===42&&Z.charCodeAt(Re-1)===42&&Ie+2!==Re){Ie=Re+1;break e}break;case 10:if(z===47){Ie=Re+1;break e}}Ie=Re}}break;case 91:z++;case 40:z++;case 34:case 39:for(;Ie++<gt&&Z.charCodeAt(Ie)!==z;);}if(_e===0)break;Ie++}switch(_e=Z.substring(Fe,Ie),Ee===0&&(Ee=(M=M.replace(f,"").trim()).charCodeAt(0)),Ee){case 64:switch(0<Ce&&(M=M.replace(h,"")),z=M.charCodeAt(1),z){case 100:case 109:case 115:case 45:Ce=Y;break;default:Ce=ee}if(_e=e(Y,Ce,_e,z,B+1),Fe=_e.length,0<G&&(Ce=n(ee,M,Be),ue=a(3,_e,Ce,Y,ne,j,Fe,z,B,se),M=Ce.join(""),ue!==void 0&&(Fe=(_e=ue.trim()).length)===0&&(z=0,_e="")),0<Fe)switch(z){case 115:M=M.replace(A,s);case 100:case 109:case 45:_e=M+"{"+_e+"}";break;case 107:M=M.replace(m,"$1 $2"),_e=M+"{"+_e+"}",_e=q===1||q===2&&o("@"+_e,3)?"@-webkit-"+_e+"@"+_e:"@"+_e;break;default:_e=M+_e,se===112&&(_e=($+=_e,""))}else _e="";break;default:_e=e(Y,n(Y,M,Be),_e,se,B+1)}he+=_e,_e=Be=Ce=Re=Ee=0,M="",z=Z.charCodeAt(++Ie);break;case 125:case 59:if(M=(0<Ce?M.replace(h,""):M).trim(),1<(Fe=M.length))switch(Re===0&&(Ee=M.charCodeAt(0),Ee===45||96<Ee&&123>Ee)&&(Fe=(M=M.replace(" ",":")).length),0<G&&(ue=a(1,M,Y,L,ne,j,$.length,se,B,se))!==void 0&&(Fe=(M=ue.trim()).length)===0&&(M="\0\0"),Ee=M.charCodeAt(0),z=M.charCodeAt(1),Ee){case 0:break;case 64:if(z===105||z===99){ce+=M+Z.charAt(Ie);break}default:M.charCodeAt(Fe-1)!==58&&($+=i(M,Ee,z,M.charCodeAt(2)))}Be=Ce=Re=Ee=0,M="",z=Z.charCodeAt(++Ie)}}switch(z){case 13:case 10:oe===47?oe=0:1+Ee===0&&se!==107&&0<M.length&&(Ce=1,M+="\0"),0<G*H&&a(0,M,Y,L,ne,j,$.length,se,B,se),j=1,ne++;break;case 59:case 125:if(oe+De+Te+xe===0){j++;break}default:switch(j++,P=Z.charAt(Ie),z){case 9:case 32:if(De+xe+oe===0)switch(rt){case 44:case 58:case 9:case 32:P="";break;default:z!==32&&(P=" ")}break;case 0:P="\\0";break;case 12:P="\\f";break;case 11:P="\\v";break;case 38:De+oe+xe===0&&(Ce=Be=1,P="\f"+P);break;case 108:if(De+oe+xe+N===0&&0<Re)switch(Ie-Re){case 2:rt===112&&Z.charCodeAt(Ie-3)===58&&(N=rt);case 8:we===111&&(N=we)}break;case 58:De+oe+xe===0&&(Re=Ie);break;case 44:oe+Te+De+xe===0&&(Ce=1,P+="\r");break;case 34:case 39:oe===0&&(De=De===z?0:De===0?z:De);break;case 91:De+oe+Te===0&&xe++;break;case 93:De+oe+Te===0&&xe--;break;case 41:De+oe+xe===0&&Te--;break;case 40:if(De+oe+xe===0){if(Ee===0)switch(2*rt+3*we){case 533:break;default:Ee=1}Te++}break;case 64:oe+Te+De+xe+Re+_e===0&&(_e=1);break;case 42:case 47:if(!(0<De+xe+Te))switch(oe){case 0:switch(2*z+3*Z.charCodeAt(Ie+1)){case 235:oe=47;break;case 220:Fe=Ie,oe=42}break;case 42:z===47&&rt===42&&Fe+2!==Ie&&(Z.charCodeAt(Fe+2)===33&&($+=Z.substring(Fe,Ie+1)),P="",oe=0)}}oe===0&&(M+=P)}we=rt,rt=z,Ie++}if(Fe=$.length,0<Fe){if(Ce=Y,0<G&&(ue=a(2,$,Ce,L,ne,j,Fe,se,B,se),ue!==void 0&&($=ue).length===0))return ce+$+he;if($=Ce.join(",")+"{"+$+"}",q*N!==0){switch(q!==2||o($,2)||(N=0),N){case 111:$=$.replace(x,":-moz-$1")+$;break;case 112:$=$.replace(g,"::-webkit-input-$1")+$.replace(g,"::-moz-$1")+$.replace(g,":-ms-input-$1")+$}N=0}}return ce+$+he}function n(L,Y,Z){var se=Y.trim().split(p);Y=se;var B=se.length,xe=L.length;switch(xe){case 0:case 1:var oe=0;for(L=xe===0?"":L[0]+" ";oe<B;++oe)Y[oe]=r(L,Y[oe],Z).trim();break;default:var Te=oe=0;for(Y=[];oe<B;++oe)for(var De=0;De<xe;++De)Y[Te++]=r(L[De]+" ",se[oe],Z).trim()}return Y}function r(L,Y,Z){var se=Y.charCodeAt(0);switch(33>se&&(se=(Y=Y.trim()).charCodeAt(0)),se){case 38:return Y.replace(d,"$1"+L.trim());case 58:return L.trim()+Y.replace(d,"$1"+L.trim());default:if(0<1*Z&&0<Y.indexOf("\f"))return Y.replace(d,(L.charCodeAt(0)===58?"":"$1")+L.trim())}return L+Y}function i(L,Y,Z,se){var B=L+";",xe=2*Y+3*Z+4*se;if(xe===944){L=B.indexOf(":",9)+1;var oe=B.substring(L,B.length-1).trim();return oe=B.substring(0,L).trim()+oe+";",q===1||q===2&&o(oe,1)?"-webkit-"+oe+oe:oe}if(q===0||q===2&&!o(B,1))return B;switch(xe){case 1015:return B.charCodeAt(10)===97?"-webkit-"+B+B:B;case 951:return B.charCodeAt(3)===116?"-webkit-"+B+B:B;case 963:return B.charCodeAt(5)===110?"-webkit-"+B+B:B;case 1009:if(B.charCodeAt(4)!==100)break;case 969:case 942:return"-webkit-"+B+B;case 978:return"-webkit-"+B+"-moz-"+B+B;case 1019:case 983:return"-webkit-"+B+"-moz-"+B+"-ms-"+B+B;case 883:if(B.charCodeAt(8)===45)return"-webkit-"+B+B;if(0<B.indexOf("image-set(",11))return B.replace(W,"$1-webkit-$2")+B;break;case 932:if(B.charCodeAt(4)===45)switch(B.charCodeAt(5)){case 103:return"-webkit-box-"+B.replace("-grow","")+"-webkit-"+B+"-ms-"+B.replace("grow","positive")+B;case 115:return"-webkit-"+B+"-ms-"+B.replace("shrink","negative")+B;case 98:return"-webkit-"+B+"-ms-"+B.replace("basis","preferred-size")+B}return"-webkit-"+B+"-ms-"+B+B;case 964:return"-webkit-"+B+"-ms-flex-"+B+B;case 1023:if(B.charCodeAt(8)!==99)break;return oe=B.substring(B.indexOf(":",15)).replace("flex-","").replace("space-between","justify"),"-webkit-box-pack"+oe+"-webkit-"+B+"-ms-flex-pack"+oe+B;case 1005:return _.test(B)?B.replace(v,":-webkit-")+B.replace(v,":-moz-")+B:B;case 1e3:switch(oe=B.substring(13).trim(),Y=oe.indexOf("-")+1,oe.charCodeAt(0)+oe.charCodeAt(Y)){case 226:oe=B.replace(w,"tb");break;case 232:oe=B.replace(w,"tb-rl");break;case 220:oe=B.replace(w,"lr");break;default:return B}return"-webkit-"+B+"-ms-"+oe+B;case 1017:if(B.indexOf("sticky",9)===-1)break;case 975:switch(Y=(B=L).length-10,oe=(B.charCodeAt(Y)===33?B.substring(0,Y):B).substring(L.indexOf(":",7)+1).trim(),xe=oe.charCodeAt(0)+(oe.charCodeAt(7)|0)){case 203:if(111>oe.charCodeAt(8))break;case 115:B=B.replace(oe,"-webkit-"+oe)+";"+B;break;case 207:case 102:B=B.replace(oe,"-webkit-"+(102<xe?"inline-":"")+"box")+";"+B.replace(oe,"-webkit-"+oe)+";"+B.replace(oe,"-ms-"+oe+"box")+";"+B}return B+";";case 938:if(B.charCodeAt(5)===45)switch(B.charCodeAt(6)){case 105:return oe=B.replace("-items",""),"-webkit-"+B+"-webkit-box-"+oe+"-ms-flex-"+oe+B;case 115:return"-webkit-"+B+"-ms-flex-item-"+B.replace(C,"")+B;default:return"-webkit-"+B+"-ms-flex-line-pack"+B.replace("align-content","").replace(C,"")+B}break;case 973:case 989:if(B.charCodeAt(3)!==45||B.charCodeAt(4)===122)break;case 931:case 953:if(b.test(L)===!0)return(oe=L.substring(L.indexOf(":")+1)).charCodeAt(0)===115?i(L.replace("stretch","fill-available"),Y,Z,se).replace(":fill-available",":stretch"):B.replace(oe,"-webkit-"+oe)+B.replace(oe,"-moz-"+oe.replace("fill-",""))+B;break;case 962:if(B="-webkit-"+B+(B.charCodeAt(5)===102?"-ms-"+B:"")+B,Z+se===211&&B.charCodeAt(13)===105&&0<B.indexOf("transform",10))return B.substring(0,B.indexOf(";",27)+1).replace(y,"$1-webkit-$2")+B}return B}function o(L,Y){var Z=L.indexOf(Y===1?":":"{"),se=L.substring(0,Y!==3?Z:10);return Z=L.substring(Z+1,L.length-1),V(Y!==2?se:se.replace(E,"$1"),Z,Y)}function s(L,Y){var Z=i(Y,Y.charCodeAt(0),Y.charCodeAt(1),Y.charCodeAt(2));return Z!==Y+";"?Z.replace(T," or ($1)").substring(4):"("+Y+")"}function a(L,Y,Z,se,B,xe,oe,Te,De,Ee){for(var z=0,rt=Y,we;z<G;++z)switch(we=J[z].call(u,L,rt,Z,se,B,xe,oe,Te,De,Ee)){case void 0:case!1:case!0:case null:break;default:rt=we}if(rt!==Y)return rt}function l(L){switch(L){case void 0:case null:G=J.length=0;break;default:if(typeof L=="function")J[G++]=L;else if(typeof L=="object")for(var Y=0,Z=L.length;Y<Z;++Y)l(L[Y]);else H=!!L|0}return l}function c(L){return L=L.prefix,L!==void 0&&(V=null,L?typeof L!="function"?q=1:(q=2,V=L):q=0),c}function u(L,Y){var Z=L;if(33>Z.charCodeAt(0)&&(Z=Z.trim()),D=Z,Z=[D],0<G){var se=a(-1,Y,Z,Z,ne,j,0,0,0,0);se!==void 0&&typeof se=="string"&&(Y=se)}var B=e(ee,Z,Y,0,0);return 0<G&&(se=a(-2,B,Z,Z,ne,j,B.length,0,0,0),se!==void 0&&(B=se)),D="",N=0,j=ne=1,B}var f=/^\0+/g,h=/[\0\r\f]/g,v=/: */g,_=/zoo|gra/,y=/([,: ])(transform)/g,p=/,\r+?/g,d=/([\t\r\n ])*\f?&/g,m=/@(k\w+)\s*(\S*)\s*/,g=/::(place)/g,x=/:(read-only)/g,w=/[svh]\w+-[tblr]{2}/,A=/\(\s*(.*)\s*\)/g,T=/([\s\S]*?);/g,C=/-self|flex-/g,E=/[^]*?(:[rp][el]a[\w-]+)[^]*/,b=/stretch|:\s*\w+\-(?:conte|avail)/,W=/([^-])(image-set\()/,j=1,ne=1,N=0,q=1,ee=[],J=[],G=0,V=null,H=0,D="";return u.use=l,u.set=c,t!==void 0&&c(t),u}var rb={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function ib(t){var e=Object.create(null);return function(n){return e[n]===void 0&&(e[n]=t(n)),e[n]}}var ob=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,i0=ib(function(t){return ob.test(t)||t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)<91}),sS={exports:{}},st={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Wt=typeof Symbol=="function"&&Symbol.for,tm=Wt?Symbol.for("react.element"):60103,nm=Wt?Symbol.for("react.portal"):60106,Iu=Wt?Symbol.for("react.fragment"):60107,Uu=Wt?Symbol.for("react.strict_mode"):60108,Ou=Wt?Symbol.for("react.profiler"):60114,ku=Wt?Symbol.for("react.provider"):60109,Fu=Wt?Symbol.for("react.context"):60110,rm=Wt?Symbol.for("react.async_mode"):60111,Bu=Wt?Symbol.for("react.concurrent_mode"):60111,zu=Wt?Symbol.for("react.forward_ref"):60112,Hu=Wt?Symbol.for("react.suspense"):60113,sb=Wt?Symbol.for("react.suspense_list"):60120,Vu=Wt?Symbol.for("react.memo"):60115,Gu=Wt?Symbol.for("react.lazy"):60116,ab=Wt?Symbol.for("react.block"):60121,lb=Wt?Symbol.for("react.fundamental"):60117,cb=Wt?Symbol.for("react.responder"):60118,ub=Wt?Symbol.for("react.scope"):60119;function Un(t){if(typeof t=="object"&&t!==null){var e=t.$$typeof;switch(e){case tm:switch(t=t.type,t){case rm:case Bu:case Iu:case Ou:case Uu:case Hu:return t;default:switch(t=t&&t.$$typeof,t){case Fu:case zu:case Gu:case Vu:case ku:return t;default:return e}}case nm:return e}}}function aS(t){return Un(t)===Bu}st.AsyncMode=rm;st.ConcurrentMode=Bu;st.ContextConsumer=Fu;st.ContextProvider=ku;st.Element=tm;st.ForwardRef=zu;st.Fragment=Iu;st.Lazy=Gu;st.Memo=Vu;st.Portal=nm;st.Profiler=Ou;st.StrictMode=Uu;st.Suspense=Hu;st.isAsyncMode=function(t){return aS(t)||Un(t)===rm};st.isConcurrentMode=aS;st.isContextConsumer=function(t){return Un(t)===Fu};st.isContextProvider=function(t){return Un(t)===ku};st.isElement=function(t){return typeof t=="object"&&t!==null&&t.$$typeof===tm};st.isForwardRef=function(t){return Un(t)===zu};st.isFragment=function(t){return Un(t)===Iu};st.isLazy=function(t){return Un(t)===Gu};st.isMemo=function(t){return Un(t)===Vu};st.isPortal=function(t){return Un(t)===nm};st.isProfiler=function(t){return Un(t)===Ou};st.isStrictMode=function(t){return Un(t)===Uu};st.isSuspense=function(t){return Un(t)===Hu};st.isValidElementType=function(t){return typeof t=="string"||typeof t=="function"||t===Iu||t===Bu||t===Ou||t===Uu||t===Hu||t===sb||typeof t=="object"&&t!==null&&(t.$$typeof===Gu||t.$$typeof===Vu||t.$$typeof===ku||t.$$typeof===Fu||t.$$typeof===zu||t.$$typeof===lb||t.$$typeof===cb||t.$$typeof===ub||t.$$typeof===ab)};st.typeOf=Un;sS.exports=st;var db=sS.exports,im=db,fb={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},hb={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},pb={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},lS={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},om={};om[im.ForwardRef]=pb;om[im.Memo]=lS;function o0(t){return im.isMemo(t)?lS:om[t.$$typeof]||fb}var mb=Object.defineProperty,gb=Object.getOwnPropertyNames,s0=Object.getOwnPropertySymbols,vb=Object.getOwnPropertyDescriptor,_b=Object.getPrototypeOf,a0=Object.prototype;function cS(t,e,n){if(typeof e!="string"){if(a0){var r=_b(e);r&&r!==a0&&cS(t,r,n)}var i=gb(e);s0&&(i=i.concat(s0(e)));for(var o=o0(t),s=o0(e),a=0;a<i.length;++a){var l=i[a];if(!hb[l]&&!(n&&n[l])&&!(s&&s[l])&&!(o&&o[l])){var c=vb(e,l);try{mb(t,l,c)}catch{}}}}return t}var yb=cS;const xb=w_(yb);function Br(){return(Br=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}var l0=function(t,e){for(var n=[t[0]],r=0,i=e.length;r<i;r+=1)n.push(e[r],t[r+1]);return n},Ch=function(t){return t!==null&&typeof t=="object"&&(t.toString?t.toString():Object.prototype.toString.call(t))==="[object Object]"&&!oS.typeOf(t)},jc=Object.freeze([]),Ei=Object.freeze({});function Pa(t){return typeof t=="function"}function c0(t){return t.displayName||t.name||"Component"}function sm(t){return t&&typeof t.styledComponentId=="string"}var cs=typeof process<"u"&&process.env!==void 0&&({}.REACT_APP_SC_ATTR||{}.SC_ATTR)||"data-styled",am=typeof window<"u"&&"HTMLElement"in window,Sb=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&process.env!==void 0&&({}.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&{}.REACT_APP_SC_DISABLE_SPEEDY!==""?{}.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&{}.REACT_APP_SC_DISABLE_SPEEDY:{}.SC_DISABLE_SPEEDY!==void 0&&{}.SC_DISABLE_SPEEDY!==""&&{}.SC_DISABLE_SPEEDY!=="false"&&{}.SC_DISABLE_SPEEDY));function za(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];throw new Error("An error occurred. See https://git.io/JUIaE#"+t+" for more information."+(n.length>0?" Args: "+n.join(", "):""))}var Eb=function(){function t(n){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=n}var e=t.prototype;return e.indexOfGroup=function(n){for(var r=0,i=0;i<n;i++)r+=this.groupSizes[i];return r},e.insertRules=function(n,r){if(n>=this.groupSizes.length){for(var i=this.groupSizes,o=i.length,s=o;n>=s;)(s<<=1)<0&&za(16,""+n);this.groupSizes=new Uint32Array(s),this.groupSizes.set(i),this.length=s;for(var a=o;a<s;a++)this.groupSizes[a]=0}for(var l=this.indexOfGroup(n+1),c=0,u=r.length;c<u;c++)this.tag.insertRule(l,r[c])&&(this.groupSizes[n]++,l++)},e.clearGroup=function(n){if(n<this.length){var r=this.groupSizes[n],i=this.indexOfGroup(n),o=i+r;this.groupSizes[n]=0;for(var s=i;s<o;s++)this.tag.deleteRule(i)}},e.getGroup=function(n){var r="";if(n>=this.length||this.groupSizes[n]===0)return r;for(var i=this.groupSizes[n],o=this.indexOfGroup(n),s=o+i,a=o;a<s;a++)r+=this.tag.getRule(a)+`/*!sc*/
`;return r},t}(),hc=new Map,Xc=new Map,aa=1,pl=function(t){if(hc.has(t))return hc.get(t);for(;Xc.has(aa);)aa++;var e=aa++;return hc.set(t,e),Xc.set(e,t),e},wb=function(t){return Xc.get(t)},Mb=function(t,e){e>=aa&&(aa=e+1),hc.set(t,e),Xc.set(e,t)},Tb="style["+cs+'][data-styled-version="5.3.11"]',bb=new RegExp("^"+cs+'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),Ab=function(t,e,n){for(var r,i=n.split(","),o=0,s=i.length;o<s;o++)(r=i[o])&&t.registerName(e,r)},Rb=function(t,e){for(var n=(e.textContent||"").split(`/*!sc*/
`),r=[],i=0,o=n.length;i<o;i++){var s=n[i].trim();if(s){var a=s.match(bb);if(a){var l=0|parseInt(a[1],10),c=a[2];l!==0&&(Mb(c,l),Ab(t,c,a[3]),t.getTag().insertRules(l,r)),r.length=0}else r.push(s)}}},Cb=function(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null},uS=function(t){var e=document.head,n=t||e,r=document.createElement("style"),i=function(a){for(var l=a.childNodes,c=l.length;c>=0;c--){var u=l[c];if(u&&u.nodeType===1&&u.hasAttribute(cs))return u}}(n),o=i!==void 0?i.nextSibling:null;r.setAttribute(cs,"active"),r.setAttribute("data-styled-version","5.3.11");var s=Cb();return s&&r.setAttribute("nonce",s),n.insertBefore(r,o),r},Pb=function(){function t(n){var r=this.element=uS(n);r.appendChild(document.createTextNode("")),this.sheet=function(i){if(i.sheet)return i.sheet;for(var o=document.styleSheets,s=0,a=o.length;s<a;s++){var l=o[s];if(l.ownerNode===i)return l}za(17)}(r),this.length=0}var e=t.prototype;return e.insertRule=function(n,r){try{return this.sheet.insertRule(r,n),this.length++,!0}catch{return!1}},e.deleteRule=function(n){this.sheet.deleteRule(n),this.length--},e.getRule=function(n){var r=this.sheet.cssRules[n];return r!==void 0&&typeof r.cssText=="string"?r.cssText:""},t}(),Lb=function(){function t(n){var r=this.element=uS(n);this.nodes=r.childNodes,this.length=0}var e=t.prototype;return e.insertRule=function(n,r){if(n<=this.length&&n>=0){var i=document.createTextNode(r),o=this.nodes[n];return this.element.insertBefore(i,o||null),this.length++,!0}return!1},e.deleteRule=function(n){this.element.removeChild(this.nodes[n]),this.length--},e.getRule=function(n){return n<this.length?this.nodes[n].textContent:""},t}(),Db=function(){function t(n){this.rules=[],this.length=0}var e=t.prototype;return e.insertRule=function(n,r){return n<=this.length&&(this.rules.splice(n,0,r),this.length++,!0)},e.deleteRule=function(n){this.rules.splice(n,1),this.length--},e.getRule=function(n){return n<this.length?this.rules[n]:""},t}(),u0=am,Nb={isServer:!am,useCSSOMInjection:!Sb},dS=function(){function t(n,r,i){n===void 0&&(n=Ei),r===void 0&&(r={}),this.options=Br({},Nb,{},n),this.gs=r,this.names=new Map(i),this.server=!!n.isServer,!this.server&&am&&u0&&(u0=!1,function(o){for(var s=document.querySelectorAll(Tb),a=0,l=s.length;a<l;a++){var c=s[a];c&&c.getAttribute(cs)!=="active"&&(Rb(o,c),c.parentNode&&c.parentNode.removeChild(c))}}(this))}t.registerId=function(n){return pl(n)};var e=t.prototype;return e.reconstructWithOptions=function(n,r){return r===void 0&&(r=!0),new t(Br({},this.options,{},n),this.gs,r&&this.names||void 0)},e.allocateGSInstance=function(n){return this.gs[n]=(this.gs[n]||0)+1},e.getTag=function(){return this.tag||(this.tag=(i=(r=this.options).isServer,o=r.useCSSOMInjection,s=r.target,n=i?new Db(s):o?new Pb(s):new Lb(s),new Eb(n)));var n,r,i,o,s},e.hasNameForId=function(n,r){return this.names.has(n)&&this.names.get(n).has(r)},e.registerName=function(n,r){if(pl(n),this.names.has(n))this.names.get(n).add(r);else{var i=new Set;i.add(r),this.names.set(n,i)}},e.insertRules=function(n,r,i){this.registerName(n,r),this.getTag().insertRules(pl(n),i)},e.clearNames=function(n){this.names.has(n)&&this.names.get(n).clear()},e.clearRules=function(n){this.getTag().clearGroup(pl(n)),this.clearNames(n)},e.clearTag=function(){this.tag=void 0},e.toString=function(){return function(n){for(var r=n.getTag(),i=r.length,o="",s=0;s<i;s++){var a=wb(s);if(a!==void 0){var l=n.names.get(a),c=r.getGroup(s);if(l&&c&&l.size){var u=cs+".g"+s+'[id="'+a+'"]',f="";l!==void 0&&l.forEach(function(h){h.length>0&&(f+=h+",")}),o+=""+c+u+'{content:"'+f+`"}/*!sc*/
`}}}return o}(this)},t}(),Ib=/(a)(d)/gi,d0=function(t){return String.fromCharCode(t+(t>25?39:97))};function Ph(t){var e,n="";for(e=Math.abs(t);e>52;e=e/52|0)n=d0(e%52)+n;return(d0(e%52)+n).replace(Ib,"$1-$2")}var jo=function(t,e){for(var n=e.length;n;)t=33*t^e.charCodeAt(--n);return t},fS=function(t){return jo(5381,t)};function Ub(t){for(var e=0;e<t.length;e+=1){var n=t[e];if(Pa(n)&&!sm(n))return!1}return!0}var Ob=fS("5.3.11"),kb=function(){function t(e,n,r){this.rules=e,this.staticRulesId="",this.isStatic=(r===void 0||r.isStatic)&&Ub(e),this.componentId=n,this.baseHash=jo(Ob,n),this.baseStyle=r,dS.registerId(n)}return t.prototype.generateAndInjectStyles=function(e,n,r){var i=this.componentId,o=[];if(this.baseStyle&&o.push(this.baseStyle.generateAndInjectStyles(e,n,r)),this.isStatic&&!r.hash)if(this.staticRulesId&&n.hasNameForId(i,this.staticRulesId))o.push(this.staticRulesId);else{var s=us(this.rules,e,n,r).join(""),a=Ph(jo(this.baseHash,s)>>>0);if(!n.hasNameForId(i,a)){var l=r(s,"."+a,void 0,i);n.insertRules(i,a,l)}o.push(a),this.staticRulesId=a}else{for(var c=this.rules.length,u=jo(this.baseHash,r.hash),f="",h=0;h<c;h++){var v=this.rules[h];if(typeof v=="string")f+=v;else if(v){var _=us(v,e,n,r),y=Array.isArray(_)?_.join(""):_;u=jo(u,y+h),f+=y}}if(f){var p=Ph(u>>>0);if(!n.hasNameForId(i,p)){var d=r(f,"."+p,void 0,i);n.insertRules(i,p,d)}o.push(p)}}return o.join(" ")},t}(),Fb=/^\s*\/\/.*$/gm,Bb=[":","[",".","#"];function zb(t){var e,n,r,i,o=t===void 0?Ei:t,s=o.options,a=s===void 0?Ei:s,l=o.plugins,c=l===void 0?jc:l,u=new nb(a),f=[],h=function(y){function p(d){if(d)try{y(d+"}")}catch{}}return function(d,m,g,x,w,A,T,C,E,b){switch(d){case 1:if(E===0&&m.charCodeAt(0)===64)return y(m+";"),"";break;case 2:if(C===0)return m+"/*|*/";break;case 3:switch(C){case 102:case 112:return y(g[0]+m),"";default:return m+(b===0?"/*|*/":"")}case-2:m.split("/*|*/}").forEach(p)}}}(function(y){f.push(y)}),v=function(y,p,d){return p===0&&Bb.indexOf(d[n.length])!==-1||d.match(i)?y:"."+e};function _(y,p,d,m){m===void 0&&(m="&");var g=y.replace(Fb,""),x=p&&d?d+" "+p+" { "+g+" }":g;return e=m,n=p,r=new RegExp("\\"+n+"\\b","g"),i=new RegExp("(\\"+n+"\\b){2,}"),u(d||!p?"":p,x)}return u.use([].concat(c,[function(y,p,d){y===2&&d.length&&d[0].lastIndexOf(n)>0&&(d[0]=d[0].replace(r,v))},h,function(y){if(y===-2){var p=f;return f=[],p}}])),_.hash=c.length?c.reduce(function(y,p){return p.name||za(15),jo(y,p.name)},5381).toString():"",_}var hS=ys.createContext();hS.Consumer;var pS=ys.createContext(),Hb=(pS.Consumer,new dS),Lh=zb();function Vb(){return O.useContext(hS)||Hb}function Gb(){return O.useContext(pS)||Lh}var Wb=function(){function t(e,n){var r=this;this.inject=function(i,o){o===void 0&&(o=Lh);var s=r.name+o.hash;i.hasNameForId(r.id,s)||i.insertRules(r.id,s,o(r.rules,s,"@keyframes"))},this.toString=function(){return za(12,String(r.name))},this.name=e,this.id="sc-keyframes-"+e,this.rules=n}return t.prototype.getName=function(e){return e===void 0&&(e=Lh),this.name+e.hash},t}(),$b=/([A-Z])/,jb=/([A-Z])/g,Xb=/^ms-/,qb=function(t){return"-"+t.toLowerCase()};function f0(t){return $b.test(t)?t.replace(jb,qb).replace(Xb,"-ms-"):t}var h0=function(t){return t==null||t===!1||t===""};function us(t,e,n,r){if(Array.isArray(t)){for(var i,o=[],s=0,a=t.length;s<a;s+=1)(i=us(t[s],e,n,r))!==""&&(Array.isArray(i)?o.push.apply(o,i):o.push(i));return o}if(h0(t))return"";if(sm(t))return"."+t.styledComponentId;if(Pa(t)){if(typeof(c=t)!="function"||c.prototype&&c.prototype.isReactComponent||!e)return t;var l=t(e);return us(l,e,n,r)}var c;return t instanceof Wb?n?(t.inject(n,r),t.getName(r)):t:Ch(t)?function u(f,h){var v,_,y=[];for(var p in f)f.hasOwnProperty(p)&&!h0(f[p])&&(Array.isArray(f[p])&&f[p].isCss||Pa(f[p])?y.push(f0(p)+":",f[p],";"):Ch(f[p])?y.push.apply(y,u(f[p],p)):y.push(f0(p)+": "+(v=p,(_=f[p])==null||typeof _=="boolean"||_===""?"":typeof _!="number"||_===0||v in rb||v.startsWith("--")?String(_).trim():_+"px")+";"));return h?[h+" {"].concat(y,["}"]):y}(t):t.toString()}var p0=function(t){return Array.isArray(t)&&(t.isCss=!0),t};function Yb(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return Pa(t)||Ch(t)?p0(us(l0(jc,[t].concat(n)))):n.length===0&&t.length===1&&typeof t[0]=="string"?t:p0(us(l0(t,n)))}var Kb=function(t,e,n){return n===void 0&&(n=Ei),t.theme!==n.theme&&t.theme||e||n.theme},Zb=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Jb=/(^-|-$)/g;function Ud(t){return t.replace(Zb,"-").replace(Jb,"")}var Qb=function(t){return Ph(fS(t)>>>0)};function ml(t){return typeof t=="string"&&!0}var Dh=function(t){return typeof t=="function"||typeof t=="object"&&t!==null&&!Array.isArray(t)},eA=function(t){return t!=="__proto__"&&t!=="constructor"&&t!=="prototype"};function tA(t,e,n){var r=t[n];Dh(e)&&Dh(r)?mS(r,e):t[n]=e}function mS(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];for(var i=0,o=n;i<o.length;i++){var s=o[i];if(Dh(s))for(var a in s)eA(a)&&tA(t,s[a],a)}return t}var gS=ys.createContext();gS.Consumer;var Od={};function vS(t,e,n){var r=sm(t),i=!ml(t),o=e.attrs,s=o===void 0?jc:o,a=e.componentId,l=a===void 0?function(m,g){var x=typeof m!="string"?"sc":Ud(m);Od[x]=(Od[x]||0)+1;var w=x+"-"+Qb("5.3.11"+x+Od[x]);return g?g+"-"+w:w}(e.displayName,e.parentComponentId):a,c=e.displayName,u=c===void 0?function(m){return ml(m)?"styled."+m:"Styled("+c0(m)+")"}(t):c,f=e.displayName&&e.componentId?Ud(e.displayName)+"-"+e.componentId:e.componentId||l,h=r&&t.attrs?Array.prototype.concat(t.attrs,s).filter(Boolean):s,v=e.shouldForwardProp;r&&t.shouldForwardProp&&(v=e.shouldForwardProp?function(m,g,x){return t.shouldForwardProp(m,g,x)&&e.shouldForwardProp(m,g,x)}:t.shouldForwardProp);var _,y=new kb(n,f,r?t.componentStyle:void 0),p=y.isStatic&&s.length===0,d=function(m,g){return function(x,w,A,T){var C=x.attrs,E=x.componentStyle,b=x.defaultProps,W=x.foldedComponentIds,j=x.shouldForwardProp,ne=x.styledComponentId,N=x.target,q=function(se,B,xe){se===void 0&&(se=Ei);var oe=Br({},B,{theme:se}),Te={};return xe.forEach(function(De){var Ee,z,rt,we=De;for(Ee in Pa(we)&&(we=we(oe)),we)oe[Ee]=Te[Ee]=Ee==="className"?(z=Te[Ee],rt=we[Ee],z&&rt?z+" "+rt:z||rt):we[Ee]}),[oe,Te]}(Kb(w,O.useContext(gS),b)||Ei,w,C),ee=q[0],J=q[1],G=function(se,B,xe,oe){var Te=Vb(),De=Gb(),Ee=B?se.generateAndInjectStyles(Ei,Te,De):se.generateAndInjectStyles(xe,Te,De);return Ee}(E,T,ee),V=A,H=J.$as||w.$as||J.as||w.as||N,D=ml(H),L=J!==w?Br({},w,{},J):w,Y={};for(var Z in L)Z[0]!=="$"&&Z!=="as"&&(Z==="forwardedAs"?Y.as=L[Z]:(j?j(Z,i0,H):!D||i0(Z))&&(Y[Z]=L[Z]));return w.style&&J.style!==w.style&&(Y.style=Br({},w.style,{},J.style)),Y.className=Array.prototype.concat(W,ne,G!==ne?G:null,w.className,J.className).filter(Boolean).join(" "),Y.ref=V,O.createElement(H,Y)}(_,m,g,p)};return d.displayName=u,(_=ys.forwardRef(d)).attrs=h,_.componentStyle=y,_.displayName=u,_.shouldForwardProp=v,_.foldedComponentIds=r?Array.prototype.concat(t.foldedComponentIds,t.styledComponentId):jc,_.styledComponentId=f,_.target=r?t.target:t,_.withComponent=function(m){var g=e.componentId,x=function(A,T){if(A==null)return{};var C,E,b={},W=Object.keys(A);for(E=0;E<W.length;E++)C=W[E],T.indexOf(C)>=0||(b[C]=A[C]);return b}(e,["componentId"]),w=g&&g+"-"+(ml(m)?m:Ud(c0(m)));return vS(m,Br({},x,{attrs:h,componentId:w}),n)},Object.defineProperty(_,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(m){this._foldedDefaultProps=r?mS({},t.defaultProps,m):m}}),Object.defineProperty(_,"toString",{value:function(){return"."+_.styledComponentId}}),i&&xb(_,t,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0,withComponent:!0}),_}var Nh=function(t){return function e(n,r,i){if(i===void 0&&(i=Ei),!oS.isValidElementType(r))return za(1,String(r));var o=function(){return n(r,i,Yb.apply(void 0,arguments))};return o.withConfig=function(s){return e(n,r,Br({},i,{},s))},o.attrs=function(s){return e(n,r,Br({},i,{attrs:Array.prototype.concat(i.attrs,s).filter(Boolean)}))},o}(vS,t)};["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","textPath","tspan"].forEach(function(t){Nh[t]=Nh(t)});const U=Nh;function _S(t,e){return function(){return t.apply(e,arguments)}}const{toString:nA}=Object.prototype,{getPrototypeOf:lm}=Object,{iterator:Wu,toStringTag:yS}=Symbol,$u=(t=>e=>{const n=nA.call(e);return t[n]||(t[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),dr=t=>(t=t.toLowerCase(),e=>$u(e)===t),ju=t=>e=>typeof e===t,{isArray:Ts}=Array,ds=ju("undefined");function Ha(t){return t!==null&&!ds(t)&&t.constructor!==null&&!ds(t.constructor)&&Sn(t.constructor.isBuffer)&&t.constructor.isBuffer(t)}const xS=dr("ArrayBuffer");function rA(t){let e;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?e=ArrayBuffer.isView(t):e=t&&t.buffer&&xS(t.buffer),e}const iA=ju("string"),Sn=ju("function"),SS=ju("number"),Va=t=>t!==null&&typeof t=="object",oA=t=>t===!0||t===!1,pc=t=>{if($u(t)!=="object")return!1;const e=lm(t);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(yS in t)&&!(Wu in t)},sA=t=>{if(!Va(t)||Ha(t))return!1;try{return Object.keys(t).length===0&&Object.getPrototypeOf(t)===Object.prototype}catch{return!1}},aA=dr("Date"),lA=dr("File"),cA=dr("Blob"),uA=dr("FileList"),dA=t=>Va(t)&&Sn(t.pipe),fA=t=>{let e;return t&&(typeof FormData=="function"&&t instanceof FormData||Sn(t.append)&&((e=$u(t))==="formdata"||e==="object"&&Sn(t.toString)&&t.toString()==="[object FormData]"))},hA=dr("URLSearchParams"),[pA,mA,gA,vA]=["ReadableStream","Request","Response","Headers"].map(dr),_A=t=>t.trim?t.trim():t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Ga(t,e,{allOwnKeys:n=!1}={}){if(t===null||typeof t>"u")return;let r,i;if(typeof t!="object"&&(t=[t]),Ts(t))for(r=0,i=t.length;r<i;r++)e.call(null,t[r],r,t);else{if(Ha(t))return;const o=n?Object.getOwnPropertyNames(t):Object.keys(t),s=o.length;let a;for(r=0;r<s;r++)a=o[r],e.call(null,t[a],a,t)}}function ES(t,e){if(Ha(t))return null;e=e.toLowerCase();const n=Object.keys(t);let r=n.length,i;for(;r-- >0;)if(i=n[r],e===i.toLowerCase())return i;return null}const Ki=(()=>typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global)(),wS=t=>!ds(t)&&t!==Ki;function Ih(){const{caseless:t,skipUndefined:e}=wS(this)&&this||{},n={},r=(i,o)=>{const s=t&&ES(n,o)||o;pc(n[s])&&pc(i)?n[s]=Ih(n[s],i):pc(i)?n[s]=Ih({},i):Ts(i)?n[s]=i.slice():(!e||!ds(i))&&(n[s]=i)};for(let i=0,o=arguments.length;i<o;i++)arguments[i]&&Ga(arguments[i],r);return n}const yA=(t,e,n,{allOwnKeys:r}={})=>(Ga(e,(i,o)=>{n&&Sn(i)?t[o]=_S(i,n):t[o]=i},{allOwnKeys:r}),t),xA=t=>(t.charCodeAt(0)===65279&&(t=t.slice(1)),t),SA=(t,e,n,r)=>{t.prototype=Object.create(e.prototype,r),t.prototype.constructor=t,Object.defineProperty(t,"super",{value:e.prototype}),n&&Object.assign(t.prototype,n)},EA=(t,e,n,r)=>{let i,o,s;const a={};if(e=e||{},t==null)return e;do{for(i=Object.getOwnPropertyNames(t),o=i.length;o-- >0;)s=i[o],(!r||r(s,t,e))&&!a[s]&&(e[s]=t[s],a[s]=!0);t=n!==!1&&lm(t)}while(t&&(!n||n(t,e))&&t!==Object.prototype);return e},wA=(t,e,n)=>{t=String(t),(n===void 0||n>t.length)&&(n=t.length),n-=e.length;const r=t.indexOf(e,n);return r!==-1&&r===n},MA=t=>{if(!t)return null;if(Ts(t))return t;let e=t.length;if(!SS(e))return null;const n=new Array(e);for(;e-- >0;)n[e]=t[e];return n},TA=(t=>e=>t&&e instanceof t)(typeof Uint8Array<"u"&&lm(Uint8Array)),bA=(t,e)=>{const r=(t&&t[Wu]).call(t);let i;for(;(i=r.next())&&!i.done;){const o=i.value;e.call(t,o[0],o[1])}},AA=(t,e)=>{let n;const r=[];for(;(n=t.exec(e))!==null;)r.push(n);return r},RA=dr("HTMLFormElement"),CA=t=>t.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,r,i){return r.toUpperCase()+i}),m0=(({hasOwnProperty:t})=>(e,n)=>t.call(e,n))(Object.prototype),PA=dr("RegExp"),MS=(t,e)=>{const n=Object.getOwnPropertyDescriptors(t),r={};Ga(n,(i,o)=>{let s;(s=e(i,o,t))!==!1&&(r[o]=s||i)}),Object.defineProperties(t,r)},LA=t=>{MS(t,(e,n)=>{if(Sn(t)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const r=t[n];if(Sn(r)){if(e.enumerable=!1,"writable"in e){e.writable=!1;return}e.set||(e.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},DA=(t,e)=>{const n={},r=i=>{i.forEach(o=>{n[o]=!0})};return Ts(t)?r(t):r(String(t).split(e)),n},NA=()=>{},IA=(t,e)=>t!=null&&Number.isFinite(t=+t)?t:e;function UA(t){return!!(t&&Sn(t.append)&&t[yS]==="FormData"&&t[Wu])}const OA=t=>{const e=new Array(10),n=(r,i)=>{if(Va(r)){if(e.indexOf(r)>=0)return;if(Ha(r))return r;if(!("toJSON"in r)){e[i]=r;const o=Ts(r)?[]:{};return Ga(r,(s,a)=>{const l=n(s,i+1);!ds(l)&&(o[a]=l)}),e[i]=void 0,o}}return r};return n(t,0)},kA=dr("AsyncFunction"),FA=t=>t&&(Va(t)||Sn(t))&&Sn(t.then)&&Sn(t.catch),TS=((t,e)=>t?setImmediate:e?((n,r)=>(Ki.addEventListener("message",({source:i,data:o})=>{i===Ki&&o===n&&r.length&&r.shift()()},!1),i=>{r.push(i),Ki.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",Sn(Ki.postMessage)),BA=typeof queueMicrotask<"u"?queueMicrotask.bind(Ki):typeof process<"u"&&process.nextTick||TS,zA=t=>t!=null&&Sn(t[Wu]),Q={isArray:Ts,isArrayBuffer:xS,isBuffer:Ha,isFormData:fA,isArrayBufferView:rA,isString:iA,isNumber:SS,isBoolean:oA,isObject:Va,isPlainObject:pc,isEmptyObject:sA,isReadableStream:pA,isRequest:mA,isResponse:gA,isHeaders:vA,isUndefined:ds,isDate:aA,isFile:lA,isBlob:cA,isRegExp:PA,isFunction:Sn,isStream:dA,isURLSearchParams:hA,isTypedArray:TA,isFileList:uA,forEach:Ga,merge:Ih,extend:yA,trim:_A,stripBOM:xA,inherits:SA,toFlatObject:EA,kindOf:$u,kindOfTest:dr,endsWith:wA,toArray:MA,forEachEntry:bA,matchAll:AA,isHTMLForm:RA,hasOwnProperty:m0,hasOwnProp:m0,reduceDescriptors:MS,freezeMethods:LA,toObjectSet:DA,toCamelCase:CA,noop:NA,toFiniteNumber:IA,findKey:ES,global:Ki,isContextDefined:wS,isSpecCompliantForm:UA,toJSONObject:OA,isAsyncFn:kA,isThenable:FA,setImmediate:TS,asap:BA,isIterable:zA};function je(t,e,n,r,i){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=t,this.name="AxiosError",e&&(this.code=e),n&&(this.config=n),r&&(this.request=r),i&&(this.response=i,this.status=i.status?i.status:null)}Q.inherits(je,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:Q.toJSONObject(this.config),code:this.code,status:this.status}}});const bS=je.prototype,AS={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(t=>{AS[t]={value:t}});Object.defineProperties(je,AS);Object.defineProperty(bS,"isAxiosError",{value:!0});je.from=(t,e,n,r,i,o)=>{const s=Object.create(bS);Q.toFlatObject(t,s,function(u){return u!==Error.prototype},c=>c!=="isAxiosError");const a=t&&t.message?t.message:"Error",l=e==null&&t?t.code:e;return je.call(s,a,l,n,r,i),t&&s.cause==null&&Object.defineProperty(s,"cause",{value:t,configurable:!0}),s.name=t&&t.name||"Error",o&&Object.assign(s,o),s};const HA=null;function Uh(t){return Q.isPlainObject(t)||Q.isArray(t)}function RS(t){return Q.endsWith(t,"[]")?t.slice(0,-2):t}function g0(t,e,n){return t?t.concat(e).map(function(i,o){return i=RS(i),!n&&o?"["+i+"]":i}).join(n?".":""):e}function VA(t){return Q.isArray(t)&&!t.some(Uh)}const GA=Q.toFlatObject(Q,{},null,function(e){return/^is[A-Z]/.test(e)});function Xu(t,e,n){if(!Q.isObject(t))throw new TypeError("target must be an object");e=e||new FormData,n=Q.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(y,p){return!Q.isUndefined(p[y])});const r=n.metaTokens,i=n.visitor||u,o=n.dots,s=n.indexes,l=(n.Blob||typeof Blob<"u"&&Blob)&&Q.isSpecCompliantForm(e);if(!Q.isFunction(i))throw new TypeError("visitor must be a function");function c(_){if(_===null)return"";if(Q.isDate(_))return _.toISOString();if(Q.isBoolean(_))return _.toString();if(!l&&Q.isBlob(_))throw new je("Blob is not supported. Use a Buffer instead.");return Q.isArrayBuffer(_)||Q.isTypedArray(_)?l&&typeof Blob=="function"?new Blob([_]):Buffer.from(_):_}function u(_,y,p){let d=_;if(_&&!p&&typeof _=="object"){if(Q.endsWith(y,"{}"))y=r?y:y.slice(0,-2),_=JSON.stringify(_);else if(Q.isArray(_)&&VA(_)||(Q.isFileList(_)||Q.endsWith(y,"[]"))&&(d=Q.toArray(_)))return y=RS(y),d.forEach(function(g,x){!(Q.isUndefined(g)||g===null)&&e.append(s===!0?g0([y],x,o):s===null?y:y+"[]",c(g))}),!1}return Uh(_)?!0:(e.append(g0(p,y,o),c(_)),!1)}const f=[],h=Object.assign(GA,{defaultVisitor:u,convertValue:c,isVisitable:Uh});function v(_,y){if(!Q.isUndefined(_)){if(f.indexOf(_)!==-1)throw Error("Circular reference detected in "+y.join("."));f.push(_),Q.forEach(_,function(d,m){(!(Q.isUndefined(d)||d===null)&&i.call(e,d,Q.isString(m)?m.trim():m,y,h))===!0&&v(d,y?y.concat(m):[m])}),f.pop()}}if(!Q.isObject(t))throw new TypeError("data must be an object");return v(t),e}function v0(t){const e={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g,function(r){return e[r]})}function cm(t,e){this._pairs=[],t&&Xu(t,this,e)}const CS=cm.prototype;CS.append=function(e,n){this._pairs.push([e,n])};CS.toString=function(e){const n=e?function(r){return e.call(this,r,v0)}:v0;return this._pairs.map(function(i){return n(i[0])+"="+n(i[1])},"").join("&")};function WA(t){return encodeURIComponent(t).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function PS(t,e,n){if(!e)return t;const r=n&&n.encode||WA;Q.isFunction(n)&&(n={serialize:n});const i=n&&n.serialize;let o;if(i?o=i(e,n):o=Q.isURLSearchParams(e)?e.toString():new cm(e,n).toString(r),o){const s=t.indexOf("#");s!==-1&&(t=t.slice(0,s)),t+=(t.indexOf("?")===-1?"?":"&")+o}return t}class $A{constructor(){this.handlers=[]}use(e,n,r){return this.handlers.push({fulfilled:e,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(e){Q.forEach(this.handlers,function(r){r!==null&&e(r)})}}const _0=$A,LS={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},jA=typeof URLSearchParams<"u"?URLSearchParams:cm,XA=typeof FormData<"u"?FormData:null,qA=typeof Blob<"u"?Blob:null,YA={isBrowser:!0,classes:{URLSearchParams:jA,FormData:XA,Blob:qA},protocols:["http","https","file","blob","url","data"]},um=typeof window<"u"&&typeof document<"u",Oh=typeof navigator=="object"&&navigator||void 0,KA=um&&(!Oh||["ReactNative","NativeScript","NS"].indexOf(Oh.product)<0),ZA=(()=>typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function")(),JA=um&&window.location.href||"http://localhost",QA=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:um,hasStandardBrowserEnv:KA,hasStandardBrowserWebWorkerEnv:ZA,navigator:Oh,origin:JA},Symbol.toStringTag,{value:"Module"})),tn={...QA,...YA};function eR(t,e){return Xu(t,new tn.classes.URLSearchParams,{visitor:function(n,r,i,o){return tn.isNode&&Q.isBuffer(n)?(this.append(r,n.toString("base64")),!1):o.defaultVisitor.apply(this,arguments)},...e})}function tR(t){return Q.matchAll(/\w+|\[(\w*)]/g,t).map(e=>e[0]==="[]"?"":e[1]||e[0])}function nR(t){const e={},n=Object.keys(t);let r;const i=n.length;let o;for(r=0;r<i;r++)o=n[r],e[o]=t[o];return e}function DS(t){function e(n,r,i,o){let s=n[o++];if(s==="__proto__")return!0;const a=Number.isFinite(+s),l=o>=n.length;return s=!s&&Q.isArray(i)?i.length:s,l?(Q.hasOwnProp(i,s)?i[s]=[i[s],r]:i[s]=r,!a):((!i[s]||!Q.isObject(i[s]))&&(i[s]=[]),e(n,r,i[s],o)&&Q.isArray(i[s])&&(i[s]=nR(i[s])),!a)}if(Q.isFormData(t)&&Q.isFunction(t.entries)){const n={};return Q.forEachEntry(t,(r,i)=>{e(tR(r),i,n,0)}),n}return null}function rR(t,e,n){if(Q.isString(t))try{return(e||JSON.parse)(t),Q.trim(t)}catch(r){if(r.name!=="SyntaxError")throw r}return(n||JSON.stringify)(t)}const dm={transitional:LS,adapter:["xhr","http","fetch"],transformRequest:[function(e,n){const r=n.getContentType()||"",i=r.indexOf("application/json")>-1,o=Q.isObject(e);if(o&&Q.isHTMLForm(e)&&(e=new FormData(e)),Q.isFormData(e))return i?JSON.stringify(DS(e)):e;if(Q.isArrayBuffer(e)||Q.isBuffer(e)||Q.isStream(e)||Q.isFile(e)||Q.isBlob(e)||Q.isReadableStream(e))return e;if(Q.isArrayBufferView(e))return e.buffer;if(Q.isURLSearchParams(e))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let a;if(o){if(r.indexOf("application/x-www-form-urlencoded")>-1)return eR(e,this.formSerializer).toString();if((a=Q.isFileList(e))||r.indexOf("multipart/form-data")>-1){const l=this.env&&this.env.FormData;return Xu(a?{"files[]":e}:e,l&&new l,this.formSerializer)}}return o||i?(n.setContentType("application/json",!1),rR(e)):e}],transformResponse:[function(e){const n=this.transitional||dm.transitional,r=n&&n.forcedJSONParsing,i=this.responseType==="json";if(Q.isResponse(e)||Q.isReadableStream(e))return e;if(e&&Q.isString(e)&&(r&&!this.responseType||i)){const s=!(n&&n.silentJSONParsing)&&i;try{return JSON.parse(e,this.parseReviver)}catch(a){if(s)throw a.name==="SyntaxError"?je.from(a,je.ERR_BAD_RESPONSE,this,null,this.response):a}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:tn.classes.FormData,Blob:tn.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};Q.forEach(["delete","get","head","post","put","patch"],t=>{dm.headers[t]={}});const fm=dm,iR=Q.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),oR=t=>{const e={};let n,r,i;return t&&t.split(`
`).forEach(function(s){i=s.indexOf(":"),n=s.substring(0,i).trim().toLowerCase(),r=s.substring(i+1).trim(),!(!n||e[n]&&iR[n])&&(n==="set-cookie"?e[n]?e[n].push(r):e[n]=[r]:e[n]=e[n]?e[n]+", "+r:r)}),e},y0=Symbol("internals");function Bs(t){return t&&String(t).trim().toLowerCase()}function mc(t){return t===!1||t==null?t:Q.isArray(t)?t.map(mc):String(t)}function sR(t){const e=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(t);)e[r[1]]=r[2];return e}const aR=t=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());function kd(t,e,n,r,i){if(Q.isFunction(r))return r.call(this,e,n);if(i&&(e=n),!!Q.isString(e)){if(Q.isString(r))return e.indexOf(r)!==-1;if(Q.isRegExp(r))return r.test(e)}}function lR(t){return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(e,n,r)=>n.toUpperCase()+r)}function cR(t,e){const n=Q.toCamelCase(" "+e);["get","set","has"].forEach(r=>{Object.defineProperty(t,r+n,{value:function(i,o,s){return this[r].call(this,e,i,o,s)},configurable:!0})})}class qu{constructor(e){e&&this.set(e)}set(e,n,r){const i=this;function o(a,l,c){const u=Bs(l);if(!u)throw new Error("header name must be a non-empty string");const f=Q.findKey(i,u);(!f||i[f]===void 0||c===!0||c===void 0&&i[f]!==!1)&&(i[f||l]=mc(a))}const s=(a,l)=>Q.forEach(a,(c,u)=>o(c,u,l));if(Q.isPlainObject(e)||e instanceof this.constructor)s(e,n);else if(Q.isString(e)&&(e=e.trim())&&!aR(e))s(oR(e),n);else if(Q.isObject(e)&&Q.isIterable(e)){let a={},l,c;for(const u of e){if(!Q.isArray(u))throw TypeError("Object iterator must return a key-value pair");a[c=u[0]]=(l=a[c])?Q.isArray(l)?[...l,u[1]]:[l,u[1]]:u[1]}s(a,n)}else e!=null&&o(n,e,r);return this}get(e,n){if(e=Bs(e),e){const r=Q.findKey(this,e);if(r){const i=this[r];if(!n)return i;if(n===!0)return sR(i);if(Q.isFunction(n))return n.call(this,i,r);if(Q.isRegExp(n))return n.exec(i);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,n){if(e=Bs(e),e){const r=Q.findKey(this,e);return!!(r&&this[r]!==void 0&&(!n||kd(this,this[r],r,n)))}return!1}delete(e,n){const r=this;let i=!1;function o(s){if(s=Bs(s),s){const a=Q.findKey(r,s);a&&(!n||kd(r,r[a],a,n))&&(delete r[a],i=!0)}}return Q.isArray(e)?e.forEach(o):o(e),i}clear(e){const n=Object.keys(this);let r=n.length,i=!1;for(;r--;){const o=n[r];(!e||kd(this,this[o],o,e,!0))&&(delete this[o],i=!0)}return i}normalize(e){const n=this,r={};return Q.forEach(this,(i,o)=>{const s=Q.findKey(r,o);if(s){n[s]=mc(i),delete n[o];return}const a=e?lR(o):String(o).trim();a!==o&&delete n[o],n[a]=mc(i),r[a]=!0}),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){const n=Object.create(null);return Q.forEach(this,(r,i)=>{r!=null&&r!==!1&&(n[i]=e&&Q.isArray(r)?r.join(", "):r)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([e,n])=>e+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e,...n){const r=new this(e);return n.forEach(i=>r.set(i)),r}static accessor(e){const r=(this[y0]=this[y0]={accessors:{}}).accessors,i=this.prototype;function o(s){const a=Bs(s);r[a]||(cR(i,s),r[a]=!0)}return Q.isArray(e)?e.forEach(o):o(e),this}}qu.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);Q.reduceDescriptors(qu.prototype,({value:t},e)=>{let n=e[0].toUpperCase()+e.slice(1);return{get:()=>t,set(r){this[n]=r}}});Q.freezeMethods(qu);const cr=qu;function Fd(t,e){const n=this||fm,r=e||n,i=cr.from(r.headers);let o=r.data;return Q.forEach(t,function(a){o=a.call(n,o,i.normalize(),e?e.status:void 0)}),i.normalize(),o}function NS(t){return!!(t&&t.__CANCEL__)}function bs(t,e,n){je.call(this,t??"canceled",je.ERR_CANCELED,e,n),this.name="CanceledError"}Q.inherits(bs,je,{__CANCEL__:!0});function IS(t,e,n){const r=n.config.validateStatus;!n.status||!r||r(n.status)?t(n):e(new je("Request failed with status code "+n.status,[je.ERR_BAD_REQUEST,je.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function uR(t){const e=/^([-+\w]{1,25})(:?\/\/|:)/.exec(t);return e&&e[1]||""}function dR(t,e){t=t||10;const n=new Array(t),r=new Array(t);let i=0,o=0,s;return e=e!==void 0?e:1e3,function(l){const c=Date.now(),u=r[o];s||(s=c),n[i]=l,r[i]=c;let f=o,h=0;for(;f!==i;)h+=n[f++],f=f%t;if(i=(i+1)%t,i===o&&(o=(o+1)%t),c-s<e)return;const v=u&&c-u;return v?Math.round(h*1e3/v):void 0}}function fR(t,e){let n=0,r=1e3/e,i,o;const s=(c,u=Date.now())=>{n=u,i=null,o&&(clearTimeout(o),o=null),t(...c)};return[(...c)=>{const u=Date.now(),f=u-n;f>=r?s(c,u):(i=c,o||(o=setTimeout(()=>{o=null,s(i)},r-f)))},()=>i&&s(i)]}const qc=(t,e,n=3)=>{let r=0;const i=dR(50,250);return fR(o=>{const s=o.loaded,a=o.lengthComputable?o.total:void 0,l=s-r,c=i(l),u=s<=a;r=s;const f={loaded:s,total:a,progress:a?s/a:void 0,bytes:l,rate:c||void 0,estimated:c&&a&&u?(a-s)/c:void 0,event:o,lengthComputable:a!=null,[e?"download":"upload"]:!0};t(f)},n)},x0=(t,e)=>{const n=t!=null;return[r=>e[0]({lengthComputable:n,total:t,loaded:r}),e[1]]},S0=t=>(...e)=>Q.asap(()=>t(...e)),hR=tn.hasStandardBrowserEnv?((t,e)=>n=>(n=new URL(n,tn.origin),t.protocol===n.protocol&&t.host===n.host&&(e||t.port===n.port)))(new URL(tn.origin),tn.navigator&&/(msie|trident)/i.test(tn.navigator.userAgent)):()=>!0,pR=tn.hasStandardBrowserEnv?{write(t,e,n,r,i,o,s){if(typeof document>"u")return;const a=[`${t}=${encodeURIComponent(e)}`];Q.isNumber(n)&&a.push(`expires=${new Date(n).toUTCString()}`),Q.isString(r)&&a.push(`path=${r}`),Q.isString(i)&&a.push(`domain=${i}`),o===!0&&a.push("secure"),Q.isString(s)&&a.push(`SameSite=${s}`),document.cookie=a.join("; ")},read(t){if(typeof document>"u")return null;const e=document.cookie.match(new RegExp("(?:^|; )"+t+"=([^;]*)"));return e?decodeURIComponent(e[1]):null},remove(t){this.write(t,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function mR(t){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)}function gR(t,e){return e?t.replace(/\/?\/$/,"")+"/"+e.replace(/^\/+/,""):t}function US(t,e,n){let r=!mR(e);return t&&(r||n==!1)?gR(t,e):e}const E0=t=>t instanceof cr?{...t}:t;function ao(t,e){e=e||{};const n={};function r(c,u,f,h){return Q.isPlainObject(c)&&Q.isPlainObject(u)?Q.merge.call({caseless:h},c,u):Q.isPlainObject(u)?Q.merge({},u):Q.isArray(u)?u.slice():u}function i(c,u,f,h){if(Q.isUndefined(u)){if(!Q.isUndefined(c))return r(void 0,c,f,h)}else return r(c,u,f,h)}function o(c,u){if(!Q.isUndefined(u))return r(void 0,u)}function s(c,u){if(Q.isUndefined(u)){if(!Q.isUndefined(c))return r(void 0,c)}else return r(void 0,u)}function a(c,u,f){if(f in e)return r(c,u);if(f in t)return r(void 0,c)}const l={url:o,method:o,data:o,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,withXSRFToken:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:a,headers:(c,u,f)=>i(E0(c),E0(u),f,!0)};return Q.forEach(Object.keys({...t,...e}),function(u){const f=l[u]||i,h=f(t[u],e[u],u);Q.isUndefined(h)&&f!==a||(n[u]=h)}),n}const OS=t=>{const e=ao({},t);let{data:n,withXSRFToken:r,xsrfHeaderName:i,xsrfCookieName:o,headers:s,auth:a}=e;if(e.headers=s=cr.from(s),e.url=PS(US(e.baseURL,e.url,e.allowAbsoluteUrls),t.params,t.paramsSerializer),a&&s.set("Authorization","Basic "+btoa((a.username||"")+":"+(a.password?unescape(encodeURIComponent(a.password)):""))),Q.isFormData(n)){if(tn.hasStandardBrowserEnv||tn.hasStandardBrowserWebWorkerEnv)s.setContentType(void 0);else if(Q.isFunction(n.getHeaders)){const l=n.getHeaders(),c=["content-type","content-length"];Object.entries(l).forEach(([u,f])=>{c.includes(u.toLowerCase())&&s.set(u,f)})}}if(tn.hasStandardBrowserEnv&&(r&&Q.isFunction(r)&&(r=r(e)),r||r!==!1&&hR(e.url))){const l=i&&o&&pR.read(o);l&&s.set(i,l)}return e},vR=typeof XMLHttpRequest<"u",_R=vR&&function(t){return new Promise(function(n,r){const i=OS(t);let o=i.data;const s=cr.from(i.headers).normalize();let{responseType:a,onUploadProgress:l,onDownloadProgress:c}=i,u,f,h,v,_;function y(){v&&v(),_&&_(),i.cancelToken&&i.cancelToken.unsubscribe(u),i.signal&&i.signal.removeEventListener("abort",u)}let p=new XMLHttpRequest;p.open(i.method.toUpperCase(),i.url,!0),p.timeout=i.timeout;function d(){if(!p)return;const g=cr.from("getAllResponseHeaders"in p&&p.getAllResponseHeaders()),w={data:!a||a==="text"||a==="json"?p.responseText:p.response,status:p.status,statusText:p.statusText,headers:g,config:t,request:p};IS(function(T){n(T),y()},function(T){r(T),y()},w),p=null}"onloadend"in p?p.onloadend=d:p.onreadystatechange=function(){!p||p.readyState!==4||p.status===0&&!(p.responseURL&&p.responseURL.indexOf("file:")===0)||setTimeout(d)},p.onabort=function(){p&&(r(new je("Request aborted",je.ECONNABORTED,t,p)),p=null)},p.onerror=function(x){const w=x&&x.message?x.message:"Network Error",A=new je(w,je.ERR_NETWORK,t,p);A.event=x||null,r(A),p=null},p.ontimeout=function(){let x=i.timeout?"timeout of "+i.timeout+"ms exceeded":"timeout exceeded";const w=i.transitional||LS;i.timeoutErrorMessage&&(x=i.timeoutErrorMessage),r(new je(x,w.clarifyTimeoutError?je.ETIMEDOUT:je.ECONNABORTED,t,p)),p=null},o===void 0&&s.setContentType(null),"setRequestHeader"in p&&Q.forEach(s.toJSON(),function(x,w){p.setRequestHeader(w,x)}),Q.isUndefined(i.withCredentials)||(p.withCredentials=!!i.withCredentials),a&&a!=="json"&&(p.responseType=i.responseType),c&&([h,_]=qc(c,!0),p.addEventListener("progress",h)),l&&p.upload&&([f,v]=qc(l),p.upload.addEventListener("progress",f),p.upload.addEventListener("loadend",v)),(i.cancelToken||i.signal)&&(u=g=>{p&&(r(!g||g.type?new bs(null,t,p):g),p.abort(),p=null)},i.cancelToken&&i.cancelToken.subscribe(u),i.signal&&(i.signal.aborted?u():i.signal.addEventListener("abort",u)));const m=uR(i.url);if(m&&tn.protocols.indexOf(m)===-1){r(new je("Unsupported protocol "+m+":",je.ERR_BAD_REQUEST,t));return}p.send(o||null)})},yR=(t,e)=>{const{length:n}=t=t?t.filter(Boolean):[];if(e||n){let r=new AbortController,i;const o=function(c){if(!i){i=!0,a();const u=c instanceof Error?c:this.reason;r.abort(u instanceof je?u:new bs(u instanceof Error?u.message:u))}};let s=e&&setTimeout(()=>{s=null,o(new je(`timeout ${e} of ms exceeded`,je.ETIMEDOUT))},e);const a=()=>{t&&(s&&clearTimeout(s),s=null,t.forEach(c=>{c.unsubscribe?c.unsubscribe(o):c.removeEventListener("abort",o)}),t=null)};t.forEach(c=>c.addEventListener("abort",o));const{signal:l}=r;return l.unsubscribe=()=>Q.asap(a),l}},xR=yR,SR=function*(t,e){let n=t.byteLength;if(!e||n<e){yield t;return}let r=0,i;for(;r<n;)i=r+e,yield t.slice(r,i),r=i},ER=async function*(t,e){for await(const n of wR(t))yield*SR(n,e)},wR=async function*(t){if(t[Symbol.asyncIterator]){yield*t;return}const e=t.getReader();try{for(;;){const{done:n,value:r}=await e.read();if(n)break;yield r}}finally{await e.cancel()}},w0=(t,e,n,r)=>{const i=ER(t,e);let o=0,s,a=l=>{s||(s=!0,r&&r(l))};return new ReadableStream({async pull(l){try{const{done:c,value:u}=await i.next();if(c){a(),l.close();return}let f=u.byteLength;if(n){let h=o+=f;n(h)}l.enqueue(new Uint8Array(u))}catch(c){throw a(c),c}},cancel(l){return a(l),i.return()}},{highWaterMark:2})},M0=64*1024,{isFunction:gl}=Q,MR=(({Request:t,Response:e})=>({Request:t,Response:e}))(Q.global),{ReadableStream:T0,TextEncoder:b0}=Q.global,A0=(t,...e)=>{try{return!!t(...e)}catch{return!1}},TR=t=>{t=Q.merge.call({skipUndefined:!0},MR,t);const{fetch:e,Request:n,Response:r}=t,i=e?gl(e):typeof fetch=="function",o=gl(n),s=gl(r);if(!i)return!1;const a=i&&gl(T0),l=i&&(typeof b0=="function"?(_=>y=>_.encode(y))(new b0):async _=>new Uint8Array(await new n(_).arrayBuffer())),c=o&&a&&A0(()=>{let _=!1;const y=new n(tn.origin,{body:new T0,method:"POST",get duplex(){return _=!0,"half"}}).headers.has("Content-Type");return _&&!y}),u=s&&a&&A0(()=>Q.isReadableStream(new r("").body)),f={stream:u&&(_=>_.body)};i&&["text","arrayBuffer","blob","formData","stream"].forEach(_=>{!f[_]&&(f[_]=(y,p)=>{let d=y&&y[_];if(d)return d.call(y);throw new je(`Response type '${_}' is not supported`,je.ERR_NOT_SUPPORT,p)})});const h=async _=>{if(_==null)return 0;if(Q.isBlob(_))return _.size;if(Q.isSpecCompliantForm(_))return(await new n(tn.origin,{method:"POST",body:_}).arrayBuffer()).byteLength;if(Q.isArrayBufferView(_)||Q.isArrayBuffer(_))return _.byteLength;if(Q.isURLSearchParams(_)&&(_=_+""),Q.isString(_))return(await l(_)).byteLength},v=async(_,y)=>{const p=Q.toFiniteNumber(_.getContentLength());return p??h(y)};return async _=>{let{url:y,method:p,data:d,signal:m,cancelToken:g,timeout:x,onDownloadProgress:w,onUploadProgress:A,responseType:T,headers:C,withCredentials:E="same-origin",fetchOptions:b}=OS(_),W=e||fetch;T=T?(T+"").toLowerCase():"text";let j=xR([m,g&&g.toAbortSignal()],x),ne=null;const N=j&&j.unsubscribe&&(()=>{j.unsubscribe()});let q;try{if(A&&c&&p!=="get"&&p!=="head"&&(q=await v(C,d))!==0){let D=new n(y,{method:"POST",body:d,duplex:"half"}),L;if(Q.isFormData(d)&&(L=D.headers.get("content-type"))&&C.setContentType(L),D.body){const[Y,Z]=x0(q,qc(S0(A)));d=w0(D.body,M0,Y,Z)}}Q.isString(E)||(E=E?"include":"omit");const ee=o&&"credentials"in n.prototype,J={...b,signal:j,method:p.toUpperCase(),headers:C.normalize().toJSON(),body:d,duplex:"half",credentials:ee?E:void 0};ne=o&&new n(y,J);let G=await(o?W(ne,b):W(y,J));const V=u&&(T==="stream"||T==="response");if(u&&(w||V&&N)){const D={};["status","statusText","headers"].forEach(se=>{D[se]=G[se]});const L=Q.toFiniteNumber(G.headers.get("content-length")),[Y,Z]=w&&x0(L,qc(S0(w),!0))||[];G=new r(w0(G.body,M0,Y,()=>{Z&&Z(),N&&N()}),D)}T=T||"text";let H=await f[Q.findKey(f,T)||"text"](G,_);return!V&&N&&N(),await new Promise((D,L)=>{IS(D,L,{data:H,headers:cr.from(G.headers),status:G.status,statusText:G.statusText,config:_,request:ne})})}catch(ee){throw N&&N(),ee&&ee.name==="TypeError"&&/Load failed|fetch/i.test(ee.message)?Object.assign(new je("Network Error",je.ERR_NETWORK,_,ne),{cause:ee.cause||ee}):je.from(ee,ee&&ee.code,_,ne)}}},bR=new Map,kS=t=>{let e=t&&t.env||{};const{fetch:n,Request:r,Response:i}=e,o=[r,i,n];let s=o.length,a=s,l,c,u=bR;for(;a--;)l=o[a],c=u.get(l),c===void 0&&u.set(l,c=a?new Map:TR(e)),u=c;return c};kS();const hm={http:HA,xhr:_R,fetch:{get:kS}};Q.forEach(hm,(t,e)=>{if(t){try{Object.defineProperty(t,"name",{value:e})}catch{}Object.defineProperty(t,"adapterName",{value:e})}});const R0=t=>`- ${t}`,AR=t=>Q.isFunction(t)||t===null||t===!1;function RR(t,e){t=Q.isArray(t)?t:[t];const{length:n}=t;let r,i;const o={};for(let s=0;s<n;s++){r=t[s];let a;if(i=r,!AR(r)&&(i=hm[(a=String(r)).toLowerCase()],i===void 0))throw new je(`Unknown adapter '${a}'`);if(i&&(Q.isFunction(i)||(i=i.get(e))))break;o[a||"#"+s]=i}if(!i){const s=Object.entries(o).map(([l,c])=>`adapter ${l} `+(c===!1?"is not supported by the environment":"is not available in the build"));let a=n?s.length>1?`since :
`+s.map(R0).join(`
`):" "+R0(s[0]):"as no adapter specified";throw new je("There is no suitable adapter to dispatch the request "+a,"ERR_NOT_SUPPORT")}return i}const FS={getAdapter:RR,adapters:hm};function Bd(t){if(t.cancelToken&&t.cancelToken.throwIfRequested(),t.signal&&t.signal.aborted)throw new bs(null,t)}function C0(t){return Bd(t),t.headers=cr.from(t.headers),t.data=Fd.call(t,t.transformRequest),["post","put","patch"].indexOf(t.method)!==-1&&t.headers.setContentType("application/x-www-form-urlencoded",!1),FS.getAdapter(t.adapter||fm.adapter,t)(t).then(function(r){return Bd(t),r.data=Fd.call(t,t.transformResponse,r),r.headers=cr.from(r.headers),r},function(r){return NS(r)||(Bd(t),r&&r.response&&(r.response.data=Fd.call(t,t.transformResponse,r.response),r.response.headers=cr.from(r.response.headers))),Promise.reject(r)})}const BS="1.13.2",Yu={};["object","boolean","number","function","string","symbol"].forEach((t,e)=>{Yu[t]=function(r){return typeof r===t||"a"+(e<1?"n ":" ")+t}});const P0={};Yu.transitional=function(e,n,r){function i(o,s){return"[Axios v"+BS+"] Transitional option '"+o+"'"+s+(r?". "+r:"")}return(o,s,a)=>{if(e===!1)throw new je(i(s," has been removed"+(n?" in "+n:"")),je.ERR_DEPRECATED);return n&&!P0[s]&&(P0[s]=!0,console.warn(i(s," has been deprecated since v"+n+" and will be removed in the near future"))),e?e(o,s,a):!0}};Yu.spelling=function(e){return(n,r)=>(console.warn(`${r} is likely a misspelling of ${e}`),!0)};function CR(t,e,n){if(typeof t!="object")throw new je("options must be an object",je.ERR_BAD_OPTION_VALUE);const r=Object.keys(t);let i=r.length;for(;i-- >0;){const o=r[i],s=e[o];if(s){const a=t[o],l=a===void 0||s(a,o,t);if(l!==!0)throw new je("option "+o+" must be "+l,je.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new je("Unknown option "+o,je.ERR_BAD_OPTION)}}const gc={assertOptions:CR,validators:Yu},pr=gc.validators;class Yc{constructor(e){this.defaults=e||{},this.interceptors={request:new _0,response:new _0}}async request(e,n){try{return await this._request(e,n)}catch(r){if(r instanceof Error){let i={};Error.captureStackTrace?Error.captureStackTrace(i):i=new Error;const o=i.stack?i.stack.replace(/^.+\n/,""):"";try{r.stack?o&&!String(r.stack).endsWith(o.replace(/^.+\n.+\n/,""))&&(r.stack+=`
`+o):r.stack=o}catch{}}throw r}}_request(e,n){typeof e=="string"?(n=n||{},n.url=e):n=e||{},n=ao(this.defaults,n);const{transitional:r,paramsSerializer:i,headers:o}=n;r!==void 0&&gc.assertOptions(r,{silentJSONParsing:pr.transitional(pr.boolean),forcedJSONParsing:pr.transitional(pr.boolean),clarifyTimeoutError:pr.transitional(pr.boolean)},!1),i!=null&&(Q.isFunction(i)?n.paramsSerializer={serialize:i}:gc.assertOptions(i,{encode:pr.function,serialize:pr.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),gc.assertOptions(n,{baseUrl:pr.spelling("baseURL"),withXsrfToken:pr.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let s=o&&Q.merge(o.common,o[n.method]);o&&Q.forEach(["delete","get","head","post","put","patch","common"],_=>{delete o[_]}),n.headers=cr.concat(s,o);const a=[];let l=!0;this.interceptors.request.forEach(function(y){typeof y.runWhen=="function"&&y.runWhen(n)===!1||(l=l&&y.synchronous,a.unshift(y.fulfilled,y.rejected))});const c=[];this.interceptors.response.forEach(function(y){c.push(y.fulfilled,y.rejected)});let u,f=0,h;if(!l){const _=[C0.bind(this),void 0];for(_.unshift(...a),_.push(...c),h=_.length,u=Promise.resolve(n);f<h;)u=u.then(_[f++],_[f++]);return u}h=a.length;let v=n;for(;f<h;){const _=a[f++],y=a[f++];try{v=_(v)}catch(p){y.call(this,p);break}}try{u=C0.call(this,v)}catch(_){return Promise.reject(_)}for(f=0,h=c.length;f<h;)u=u.then(c[f++],c[f++]);return u}getUri(e){e=ao(this.defaults,e);const n=US(e.baseURL,e.url,e.allowAbsoluteUrls);return PS(n,e.params,e.paramsSerializer)}}Q.forEach(["delete","get","head","options"],function(e){Yc.prototype[e]=function(n,r){return this.request(ao(r||{},{method:e,url:n,data:(r||{}).data}))}});Q.forEach(["post","put","patch"],function(e){function n(r){return function(o,s,a){return this.request(ao(a||{},{method:e,headers:r?{"Content-Type":"multipart/form-data"}:{},url:o,data:s}))}}Yc.prototype[e]=n(),Yc.prototype[e+"Form"]=n(!0)});const vc=Yc;class pm{constructor(e){if(typeof e!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(o){n=o});const r=this;this.promise.then(i=>{if(!r._listeners)return;let o=r._listeners.length;for(;o-- >0;)r._listeners[o](i);r._listeners=null}),this.promise.then=i=>{let o;const s=new Promise(a=>{r.subscribe(a),o=a}).then(i);return s.cancel=function(){r.unsubscribe(o)},s},e(function(o,s,a){r.reason||(r.reason=new bs(o,s,a),n(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const n=this._listeners.indexOf(e);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const e=new AbortController,n=r=>{e.abort(r)};return this.subscribe(n),e.signal.unsubscribe=()=>this.unsubscribe(n),e.signal}static source(){let e;return{token:new pm(function(i){e=i}),cancel:e}}}const PR=pm;function LR(t){return function(n){return t.apply(null,n)}}function DR(t){return Q.isObject(t)&&t.isAxiosError===!0}const kh={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(kh).forEach(([t,e])=>{kh[e]=t});const NR=kh;function zS(t){const e=new vc(t),n=_S(vc.prototype.request,e);return Q.extend(n,vc.prototype,e,{allOwnKeys:!0}),Q.extend(n,e,null,{allOwnKeys:!0}),n.create=function(i){return zS(ao(t,i))},n}const Dt=zS(fm);Dt.Axios=vc;Dt.CanceledError=bs;Dt.CancelToken=PR;Dt.isCancel=NS;Dt.VERSION=BS;Dt.toFormData=Xu;Dt.AxiosError=je;Dt.Cancel=Dt.CanceledError;Dt.all=function(e){return Promise.all(e)};Dt.spread=LR;Dt.isAxiosError=DR;Dt.mergeConfig=ao;Dt.AxiosHeaders=cr;Dt.formToJSON=t=>DS(Q.isHTMLForm(t)?new FormData(t):t);Dt.getAdapter=FS.getAdapter;Dt.HttpStatusCode=NR;Dt.default=Dt;const Cn=Dt,IR=U.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`,UR=U.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 2rem;
`,OR=U.section`
  margin-bottom: 2rem;
`,kR=U.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
`,FR=U.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`,BR=U.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`,zR=U.div`
  height: 200px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-style: italic;
`,HR=U.div`
  padding: 1rem;
`,VR=U.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: #333;
`,GR=U.p`
  margin: 0 0 0.5rem 0;
  color: #666;
  font-weight: 500;
`,WR=U.p`
  margin: 0;
  color: #888;
  font-size: 0.9rem;
  line-height: 1.4;
`,$R=()=>{const[t,e]=O.useState([]),[n,r]=O.useState(!0);return O.useEffect(()=>{(async()=>{try{const o=await Cn.get("/api/artworks");e(o.data.slice(0,6))}catch(o){console.error("Ошибка при загрузке экспонатов:",o)}finally{r(!1)}})()},[]),k(IR,{children:[k(UR,{children:[S("h1",{children:"Добро пожаловать в виртуальную галерею искусств"}),S("p",{children:"Исследуйте мировые шедевры искусства в уникальной интерактивной среде"})]}),k(OR,{children:[S(kR,{children:"Популярные экспонаты"}),n?S("p",{children:"Загрузка экспонатов..."}):S(FR,{children:t.map(i=>{var o;return k(BR,{children:[S(zR,{children:i.image_url?S("img",{src:i.image_url,alt:i.title,style:{width:"100%",height:"100%",objectFit:"cover"}}):S("span",{children:"Изображение недоступно"})}),k(HR,{children:[S(VR,{children:i.title}),k(GR,{children:["Автор: ",i.artist_name]}),S(WR,{children:((o=i.description)==null?void 0:o.substring(0,100))+"..."})]})]},i.artwork_id)})})]})]})},jR=U.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`,L0=U.h2`
  color: #333;
  margin-bottom: 1.5rem;
`,XR=U.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`,vl=U.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  text-align: center;
`,_l=U.p`
  font-size: 2rem;
  font-weight: bold;
  color: #6200ee;
  margin: 0.5rem 0;
`,qR=U.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  overflow: hidden;
`,YR=U.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background-color: #f8f9fa;
    font-weight: 600;
  }
`,D0=U.button`
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    opacity: 0.9;
  }
`,KR=()=>{const[t,e]=O.useState([]),[n,r]=O.useState(!0);O.useEffect(()=>{(async()=>{try{const a=await Cn.get("/api/admin/users",{headers:{Authorization:`Bearer ${localStorage.getItem("authToken")}`}});e(a.data)}catch(a){console.error("Ошибка при загрузке пользователей:",a)}finally{r(!1)}})()},[]);const i=async(s,a)=>{try{await Cn.put(`/api/admin/users/${s}/role`,{role:a},{headers:{Authorization:`Bearer ${localStorage.getItem("authToken")}`,"Content-Type":"application/json"}}),e(l=>l.map(c=>c.user_id===s?{...c,role:a}:c))}catch(l){console.error("Ошибка при обновлении роли пользователя:",l)}},o=async s=>{if(window.confirm("Вы уверены, что хотите удалить этого пользователя?"))try{await Cn.delete(`/api/admin/users/${s}`,{headers:{Authorization:`Bearer ${localStorage.getItem("authToken")}`}}),e(a=>a.filter(l=>l.user_id!==s))}catch(a){console.error("Ошибка при удалении пользователя:",a)}};return k(jR,{children:[S(L0,{children:"Административная панель"}),k(XR,{children:[k(vl,{children:[S("h3",{children:"Всего пользователей"}),S(_l,{children:t.length})]}),k(vl,{children:[S("h3",{children:"Администраторы"}),S(_l,{children:t.filter(s=>s.role==="admin").length})]}),k(vl,{children:[S("h3",{children:"Кураторы"}),S(_l,{children:t.filter(s=>s.role==="curator").length})]}),k(vl,{children:[S("h3",{children:"Сотрудники"}),S(_l,{children:t.filter(s=>s.role==="staff").length})]})]}),S(L0,{children:"Управление пользователями"}),n?S("p",{children:"Загрузка пользователей..."}):S(qR,{children:k(YR,{children:[S("thead",{children:k("tr",{children:[S("th",{children:"ID"}),S("th",{children:"Имя пользователя"}),S("th",{children:"Email"}),S("th",{children:"Роль"}),S("th",{children:"Дата регистрации"}),S("th",{children:"Действия"})]})}),S("tbody",{children:t.map(s=>k("tr",{children:[S("td",{children:s.user_id}),S("td",{children:s.username}),S("td",{children:s.email}),S("td",{children:k("select",{value:s.role,onChange:a=>i(s.user_id,a.target.value),children:[S("option",{value:"user",children:"Пользователь"}),S("option",{value:"admin",children:"Администратор"}),S("option",{value:"curator",children:"Куратор"}),S("option",{value:"staff",children:"Сотрудник"}),S("option",{value:"tour_guide",children:"Организатор туров"}),S("option",{value:"auction_participant",children:"Участник аукциона"})]})}),S("td",{children:new Date(s.created_at).toLocaleDateString()}),k("td",{children:[S(D0,{onClick:()=>i(s.user_id,"admin"),style:{backgroundColor:"#6200ee",color:"white"},children:"Сделать админом"}),S(D0,{onClick:()=>o(s.user_id),style:{backgroundColor:"#f44336",color:"white"},children:"Удалить"})]})]},s.user_id))})]})})]})},ZR=U.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`,JR=U.h2`
  color: #333;
  margin-bottom: 1.5rem;
`,QR=U.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 1.5rem;
`,zd=U.button`
  padding: 0.75rem 1.5rem;
  border: none;
  background: ${({active:t})=>t?"#6200ee":"#f5f5f5"};
  color: ${({active:t})=>t?"white":"#333"};
  cursor: pointer;
  border-radius: 4px 4px 0 0;
  margin-right: 0.25rem;

  &:hover {
    background: ${({active:t})=>t?"#3700b3":"#e0e0e0"};
  }
`,eC=U.div`
  padding: 1.5rem 0;
`,tC=U.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`,nC=U.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
`,rC=U.h3`
  margin: 0 0 0.5rem 0;
  color: #333;
`,iC=U.p`
  margin: 0 0 1rem 0;
  color: #666;
`,oC=U.div`
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 0.9rem;
`,sC=U.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
`,N0=U.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`,aC=U.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
`,lC=U.button`
  padding: 0.75rem;
  background-color: #6200ee;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #3700b3;
  }
`,cC=()=>{const[t,e]=O.useState("dashboard"),[n,r]=O.useState([]),[i,o]=O.useState([]),[s,a]=O.useState(!0),[l,c]=O.useState(""),[u,f]=O.useState(""),[h,v]=O.useState(""),[_,y]=O.useState([]);O.useEffect(()=>{(async()=>{try{const g=await Cn.get("/api/ai/collections",{headers:{Authorization:`Bearer ${localStorage.getItem("authToken")}`}}),x=await Cn.get("/api/artworks",{headers:{Authorization:`Bearer ${localStorage.getItem("authToken")}`}});r(g.data),o(x.data)}catch(g){console.error("Ошибка при загрузке данных:",g)}finally{a(!1)}})()},[]);const p=async m=>{m.preventDefault();try{await Cn.post("/api/ai/collections/generate",{name:l,description:u,theme:h,artworks:_,isPublic:!1},{headers:{Authorization:`Bearer ${localStorage.getItem("authToken")}`,"Content-Type":"application/json"}}),c(""),f(""),v(""),y([]);const g=await Cn.get("/api/ai/collections",{headers:{Authorization:`Bearer ${localStorage.getItem("authToken")}`}});r(g.data)}catch(g){console.error("Ошибка при создании коллекции:",g)}},d=m=>{y(g=>g.includes(m)?g.filter(x=>x!==m):[...g,m])};return k(ZR,{children:[S(JR,{children:"Панель куратора"}),k(QR,{children:[S(zd,{active:t==="dashboard",onClick:()=>e("dashboard"),children:"Панель управления"}),S(zd,{active:t==="collections",onClick:()=>e("collections"),children:"Коллекции"}),S(zd,{active:t==="ai-curation",onClick:()=>e("ai-curation"),children:"AI-курирование"})]}),k(eC,{children:[t==="dashboard"&&k("div",{children:[S("h3",{children:"Статистика"}),k("p",{children:["Активных коллекций: ",n.length]}),k("p",{children:["Всего экспонатов: ",i.length]})]}),t==="collections"&&k("div",{children:[S("h3",{children:"Управление коллекциями"}),s?S("p",{children:"Загрузка коллекций..."}):S(tC,{children:n.map(m=>k(nC,{children:[S(rC,{children:m.name}),S(iC,{children:m.description||"Без описания"}),k(oC,{children:[k("span",{children:[m.artworks_count||0," экспонатов"]}),S("span",{children:m.theme||"Без темы"})]})]},m.collection_id))})]}),t==="ai-curation"&&k("div",{children:[S("h3",{children:"Создать новую коллекцию"}),k(sC,{onSubmit:p,children:[k("div",{children:[S("label",{htmlFor:"name",children:"Название коллекции:"}),S(N0,{id:"name",type:"text",value:l,onChange:m=>c(m.target.value),required:!0})]}),k("div",{children:[S("label",{htmlFor:"description",children:"Описание:"}),S(aC,{id:"description",value:u,onChange:m=>f(m.target.value)})]}),k("div",{children:[S("label",{htmlFor:"theme",children:"Тема:"}),S(N0,{id:"theme",type:"text",value:h,onChange:m=>v(m.target.value)})]}),k("div",{children:[S("label",{children:"Выберите экспонаты:"}),S("div",{style:{maxHeight:"200px",overflowY:"auto",border:"1px solid #ddd",borderRadius:"4px",padding:"0.5rem"},children:i.map(m=>S("div",{style:{marginBottom:"0.5rem"},children:k("label",{style:{display:"flex",alignItems:"center"},children:[S("input",{type:"checkbox",checked:_.includes(m.artwork_id),onChange:()=>d(m.artwork_id),style:{marginRight:"0.5rem"}}),m.title," - ",m.artist_name]})},m.artwork_id))})]}),S(lC,{type:"submit",children:"Создать коллекцию"})]})]})]})]})},uC="/api",$e=Cn.create({baseURL:uC,timeout:1e4,headers:{"Content-Type":"application/json"}});$e.interceptors.request.use(t=>{const e=localStorage.getItem("authToken");return e&&(t.headers.Authorization=`Bearer ${e}`),t},t=>Promise.reject(t));$e.interceptors.response.use(t=>t,t=>{var e;return((e=t.response)==null?void 0:e.status)===401&&localStorage.removeItem("authToken"),Promise.reject(t)});const La={async getAllArtworks(){return(await $e.get("/artworks")).data},async getArtworkById(t){return(await $e.get(`/artworks/${t}`)).data},async searchArtworks(t){return(await $e.get(`/artworks/search/${encodeURIComponent(t)}`)).data},async filterArtworksByTags(t){return(await $e.get(`/artworks/filter/${t.join(",")}`)).data},async createArtwork(t){return(await $e.post("/artworks",t)).data},async updateArtwork(t,e){return(await $e.put(`/artworks/${t}`,e)).data},async deleteArtwork(t){await $e.delete(`/artworks/${t}`)},async getRecommendedArtworks(t){return(await $e.get(`/artworks/recommendations${t?`?count=${t}`:""}`)).data},async getSimilarArtworks(t,e){return(await $e.get(`/artworks/${t}/similar${e?`?count=${e}`:""}`)).data},async getArtworkAnalytics(t){return(await $e.get(`/artworks/${t}/analytics`)).data}},ci={async getAllGalleries(){return(await $e.get("/galleries")).data},async getGalleryById(t){return(await $e.get(`/galleries/${t}`)).data},async createGallery(t){return(await $e.post("/galleries",t)).data},async updateGallery(t,e){return(await $e.put(`/galleries/${t}`,e)).data},async deleteGallery(t){await $e.delete(`/galleries/${t}`)},async getRooms(t){return(await $e.get(`/galleries/${t}/rooms`)).data},async getRoomById(t){return(await $e.get(`/rooms/${t}`)).data},async createRoom(t,e){return(await $e.post(`/galleries/${t}/rooms`,e)).data},async updateRoom(t,e){return(await $e.put(`/rooms/${t}`,e)).data},async deleteRoom(t){await $e.delete(`/rooms/${t}`)},async getExhibitions(t){return(await $e.get(`/galleries/${t}/exhibitions`)).data},async getExhibitionById(t){return(await $e.get(`/exhibitions/${t}`)).data},async createExhibition(t,e){return(await $e.post(`/galleries/${t}/exhibitions`,e)).data},async updateExhibition(t,e){return(await $e.put(`/exhibitions/${t}`,e)).data},async deleteExhibition(t){await $e.delete(`/exhibitions/${t}`)},async getVirtualTours(t){return(await $e.get(`/galleries/${t}/virtual-tours`)).data},async getVirtualTourById(t){return(await $e.get(`/virtual-tours/${t}`)).data},async createVirtualTour(t,e){return(await $e.post(`/galleries/${t}/virtual-tours`,e)).data},async updateVirtualTour(t,e){return(await $e.put(`/virtual-tours/${t}`,e)).data},async deleteVirtualTour(t){await $e.delete(`/virtual-tours/${t}`)}},sr={async uploadImage(t,e){const n=new FormData;return n.append("image",t),n.append("uploaded_by",e.toString()),(await $e.post("/api/artworks/upload",n,{headers:{"Content-Type":"multipart/form-data"},onUploadProgress:i=>{const o=Math.round(i.loaded*100/(i.total||1));console.log(`Загрузка: ${o}%`)}})).data},async analyzeImage(t){return(await $e.post(`/artworks/${t}/analyze`)).data},async getImageAnalysis(t){return(await $e.get(`/artworks/${t}/analysis`)).data},async submitArtworkForReview(t){return(await $e.post("/artworks/submit-for-review",t)).data},async getUserUploads(t){return(await $e.get(`/users/${t}/uploads`)).data},async getSubmissionsForReview(){return(await $e.get("/artworks/submissions-for-review")).data},async approveSubmission(t,e){await $e.post(`/artworks/submissions/${t}/approve`,e)},async rejectSubmission(t,e){await $e.post(`/artworks/submissions/${t}/reject`,{reason:e})},async reanalyzeImage(t){return(await $e.post(`/artworks/${t}/reanalyze`)).data},async generateNFT(t,e){return(await $e.post("/artworks/generate-nft",{artworkId:t,ownerInfo:e})).data}},dC=U.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`,fC=U.div`
  height: 200px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-style: italic;
`,hC=U.div`
  padding: 1rem;
`,pC=U.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: #333;
`,mC=U.p`
  margin: 0 0 0.5rem 0;
  color: #666;
  font-weight: 500;
`,gC=U.p`
  margin: 0;
  color: #888;
  font-size: 0.9rem;
  line-height: 1.4;
`,vC=U.div`
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`,Kc=({artwork:t,onClick:e})=>{var n;return k(dC,{onClick:e,children:[S(fC,{children:t.image_url?S("img",{src:t.image_url,alt:t.title,style:{width:"100%",height:"100%",objectFit:"cover"}}):S("span",{children:"Изображение недоступно"})}),k(hC,{children:[S(pC,{children:t.title}),k(mC,{children:["Автор: ",t.artist_name]}),S(gC,{children:((n=t.description)==null?void 0:n.substring(0,100))+"..."}),k(vC,{children:[S("span",{children:t.year_created||"Неизвестно"}),S("span",{children:t.medium||"Неизвестно"})]})]})]})},_C=U.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`,yC=U.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`,xC=U.h1`
  color: #333;
  margin: 0;
`,SC=U.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`,EC=U.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  flex: 1;
  max-width: 300px;
`,wC=U.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`,MC=U.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`,TC=()=>{const[t,e]=O.useState([]),[n,r]=O.useState([]),[i,o]=O.useState(!0),[s,a]=O.useState(""),[l,c]=O.useState("all"),u=br();O.useEffect(()=>{(async()=>{try{const v=await La.getAllArtworks();e(v),r(v)}catch(v){console.error("Ошибка при загрузке экспонатов:",v)}finally{o(!1)}})()},[]),O.useEffect(()=>{let h=t;s&&(h=h.filter(v=>{var _;return v.title.toLowerCase().includes(s.toLowerCase())||v.artist_name.toLowerCase().includes(s.toLowerCase())||((_=v.description)==null?void 0:_.toLowerCase().includes(s.toLowerCase()))})),l!=="all"&&(l==="favorites"||(h=h.filter(v=>v.medium===l))),r(h)},[s,l,t]);const f=h=>{u(`/artworks/${h}`)};return k(_C,{children:[S(yC,{children:S(xC,{children:"Экспонаты галереи"})}),k(SC,{children:[S(EC,{type:"text",placeholder:"Поиск экспонатов...",value:s,onChange:h=>a(h.target.value)}),k(wC,{value:l,onChange:h=>c(h.target.value),children:[S("option",{value:"all",children:"Все категории"}),S("option",{value:"painting",children:"Живопись"}),S("option",{value:"sculpture",children:"Скульптура"}),S("option",{value:"photography",children:"Фотография"}),S("option",{value:"drawing",children:"Графика"}),S("option",{value:"favorites",children:"Избранные"})]})]}),i?S("p",{children:"Загрузка экспонатов..."}):S(MC,{children:n.map(h=>S(Kc,{artwork:h,onClick:()=>f(h.artwork_id)},h.artwork_id))}),n.length===0&&!i&&S("p",{children:"Экспонаты не найдены"})]})},I0=U.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`,bC=U.div`
  margin-bottom: 2rem;
`,AC=U.h1`
  color: #333;
  margin: 0 0 0.5rem 0;
`,RC=U.p`
  color: #666;
  margin: 0;
`,CC=U.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`,PC=U.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`,LC=U.div`
  height: 200px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-style: italic;
`,DC=U.div`
  padding: 1.5rem;
`,NC=U.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: #333;
`,IC=U.p`
  margin: 0 0 1rem 0;
  color: #666;
  line-height: 1.4;
`,UC=U.div`
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`,OC=U.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #6200ee;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #3700b3;
  }
`,kC=()=>{const[t,e]=O.useState([]),[n,r]=O.useState(!0),i=br();O.useEffect(()=>{(async()=>{try{const a=await ci.getAllGalleries();e(a)}catch(a){console.error("Ошибка при загрузке галерей:",a)}finally{r(!1)}})()},[]);const o=s=>{i(`/galleries/${s}`)};return n?S(I0,{children:"Загрузка галерей..."}):k(I0,{children:[k(bC,{children:[S(AC,{children:"Галереи"}),S(RC,{children:"Просмотрите различные галереи и их залы"})]}),S(CC,{children:t.map(s=>{var a;return k(PC,{children:[S(LC,{children:S("span",{children:"Изображение галереи"})}),k(DC,{children:[S(NC,{children:s.name}),S(IC,{children:s.description||"Описание отсутствует"}),k(UC,{children:[((a=s.rooms)==null?void 0:a.length)||0," залов"]}),S(OC,{onClick:()=>o(s.gallery_id),children:"Посмотреть галерею"})]})]},s.gallery_id)})}),t.length===0&&S("p",{children:"Галерей не найдено"})]})},U0=({title:t})=>k("div",{style:{padding:"2rem",textAlign:"center"},children:[S("h1",{children:t}),S("p",{children:"Раздел находится в разработке."})]}),FC=U.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`,BC=U.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`,O0=U.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`,zC=U.button`
  padding: 0.75rem;
  background-color: #6200ee;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #3700b3;
  }
`,HC=U.p`
  color: red;
  text-align: center;
`,VC=({onLogin:t})=>{const[e,n]=O.useState(""),[r,i]=O.useState(""),[o,s]=O.useState(""),a=br();return k(FC,{children:[S("h2",{children:"Вход в аккаунт"}),o&&S(HC,{children:o}),k(BC,{onSubmit:async c=>{var u,f;c.preventDefault();try{const h=await Cn.post("/api/auth/login",{email:e,password:r}),{token:v,..._}=h.data;localStorage.setItem("authToken",v),t(_),a("/")}catch(h){s(((f=(u=h.response)==null?void 0:u.data)==null?void 0:f.error)||"Ошибка входа")}},children:[S("div",{children:S(O0,{type:"email",placeholder:"Email",value:e,onChange:c=>n(c.target.value),required:!0})}),S("div",{children:S(O0,{type:"password",placeholder:"Пароль",value:r,onChange:c=>i(c.target.value),required:!0})}),S(zC,{type:"submit",children:"Войти"})]}),k("p",{children:["Нет аккаунта? ",S("a",{href:"/register",children:"Зарегистрируйтесь"})]})]})},GC=U.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`,WC=U.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`,Hd=U.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`,$C=U.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`,jC=U.button`
  padding: 0.75rem;
  background-color: #6200ee;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #3700b3;
  }
`,XC=U.p`
  color: red;
  text-align: center;
`,qC=({onRegister:t})=>{const[e,n]=O.useState(""),[r,i]=O.useState(""),[o,s]=O.useState(""),[a,l]=O.useState("user"),[c,u]=O.useState(""),f=br();return k(GC,{children:[S("h2",{children:"Регистрация"}),c&&S(XC,{children:c}),k(WC,{onSubmit:async v=>{var _,y;v.preventDefault();try{const p=await Cn.post("/api/auth/register",{username:e,email:r,password:o,role:a}),{token:d,...m}=p.data;localStorage.setItem("authToken",d),t(m),f("/")}catch(p){u(((y=(_=p.response)==null?void 0:_.data)==null?void 0:y.error)||"Ошибка регистрации")}},children:[S("div",{children:S(Hd,{type:"text",placeholder:"Имя пользователя",value:e,onChange:v=>n(v.target.value),required:!0})}),S("div",{children:S(Hd,{type:"email",placeholder:"Email",value:r,onChange:v=>i(v.target.value),required:!0})}),S("div",{children:S(Hd,{type:"password",placeholder:"Пароль",value:o,onChange:v=>s(v.target.value),required:!0})}),S("div",{children:k($C,{value:a,onChange:v=>l(v.target.value),children:[S("option",{value:"user",children:"Обычный пользователь"}),S("option",{value:"tour_guide",children:"Организатор туров"}),S("option",{value:"auction_participant",children:"Участник аукционов"})]})}),S(jC,{type:"submit",children:"Зарегистрироваться"})]}),k("p",{children:["Уже есть аккаунт? ",S("a",{href:"/login",children:"Войдите"})]})]})},Vd=U.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`,YC=U.button`
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background-color: #6200ee;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #3700b3;
  }
`,KC=U.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`,ZC=U.div`
  flex: 1;
  height: 400px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
`,JC=U.div`
  flex: 1;
`,QC=U.h1`
  margin: 0 0 1rem 0;
  color: #333;
`,eP=U.h2`
  margin: 0 0 1.5rem 0;
  color: #666;
  font-weight: 500;
`,tP=U.p`
  color: #555;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`,nP=U.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
`,yl=U.div`
  display: flex;
  flex-direction: column;
`,zs=U.span`
  font-weight: bold;
  color: #666;
  margin-bottom: 0.25rem;
`,xl=U.span`
  color: #333;
`,rP=U.div`
  margin-top: 1.5rem;
`,iP=U.span`
  display: inline-block;
  background-color: #6200ee;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`,oP=U.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
`,HS=U.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    opacity: 0.9;
  }
`,sP=U(HS)`
  background-color: ${({isFavorite:t})=>t?"#f44336":"#2196f3"};
  color: white;
`,aP=U(HS)`
  background-color: #4caf50;
  color: white;
`,lP=U.div`
  margin-top: 3rem;
`,cP=U.h3`
  margin-bottom: 1.5rem;
  color: #333;
`,uP=U.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`,dP=()=>{const{id:t}=Su(),e=br(),[n,r]=O.useState(null),[i,o]=O.useState([]),[s,a]=O.useState(!0),[l,c]=O.useState(!1);O.useEffect(()=>{(async()=>{try{if(t){const _=await La.getArtworkById(parseInt(t));r(_);const y=await La.getSimilarArtworks(parseInt(t),6);o(y)}}catch(_){console.error("Ошибка при загрузке экспоната:",_)}finally{a(!1)}})()},[t]);const u=()=>{e(-1)},f=()=>{c(!l)},h=()=>{navigator.share?navigator.share({title:n==null?void 0:n.title,text:`Посмотрите это удивительное произведение искусства: ${n==null?void 0:n.title} от ${n==null?void 0:n.artist_name}`,url:window.location.href}).catch(console.error):navigator.clipboard.writeText(window.location.href).then(()=>{alert("Ссылка скопирована в буфер обмена!")})};return s?S(Vd,{children:"Загрузка экспоната..."}):n?k(Vd,{children:[S(YC,{onClick:u,children:"← Назад"}),k(KC,{children:[S(ZC,{children:n.image_url?S("img",{src:n.image_url,alt:n.title,style:{width:"100%",height:"100%",objectFit:"contain"}}):S("span",{children:"Изображение недоступно"})}),k(JC,{children:[S(QC,{children:n.title}),S(eP,{children:n.artist_name}),S(tP,{children:n.description}),k(nP,{children:[k(yl,{children:[S(zs,{children:"Год создания"}),S(xl,{children:n.year_created||"Неизвестно"})]}),k(yl,{children:[S(zs,{children:"Техника"}),S(xl,{children:n.medium||"Неизвестно"})]}),k(yl,{children:[S(zs,{children:"Размеры"}),S(xl,{children:n.dimensions||"Неизвестны"})]}),k(yl,{children:[S(zs,{children:"Стиль"}),S(xl,{children:n.style||"Неизвестно"})]})]}),k(rP,{children:[S(zs,{children:"Теги:"}),n.tags&&n.tags.length>0?n.tags.map((v,_)=>S(iP,{children:v},_)):S("span",{children:"Теги отсутствуют"})]}),k(oP,{children:[S(sP,{isFavorite:l,onClick:f,children:l?"Удалить из избранного":"Добавить в избранное"}),S(aP,{onClick:h,children:"Поделиться"})]})]})]}),i.length>0&&k(lP,{children:[S(cP,{children:"Похожие экспонаты"}),S(uP,{children:i.map(v=>k("div",{onClick:()=>e(`/artworks/${v.artwork_id}`),style:{cursor:"pointer"},children:[S("img",{src:v.image_url||"",alt:v.title,style:{width:"100%",height:"150px",objectFit:"cover",borderRadius:"4px"}}),k("div",{children:[S("h4",{children:v.title}),S("p",{children:v.artist_name})]})]},v.artwork_id))})]})]}):S(Vd,{children:"Экспонат не найден"})};/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const mm="158",mo={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},go={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},fP=0,k0=1,hP=2,VS=1,pP=2,Nr=3,Ri=0,En=1,Or=2,wi=0,es=1,F0=2,B0=3,z0=4,mP=5,$i=100,gP=101,vP=102,H0=103,V0=104,_P=200,yP=201,xP=202,SP=203,Fh=204,Bh=205,EP=206,wP=207,MP=208,TP=209,bP=210,AP=211,RP=212,CP=213,PP=214,LP=0,DP=1,NP=2,Zc=3,IP=4,UP=5,OP=6,kP=7,GS=0,FP=1,BP=2,Mi=0,zP=1,HP=2,VP=3,GP=4,WP=5,WS=300,fs=301,hs=302,zh=303,Hh=304,Ku=306,Vh=1e3,ir=1001,Gh=1002,un=1003,G0=1004,Gd=1005,Hn=1006,$P=1007,Da=1008,Ti=1009,jP=1010,XP=1011,gm=1012,$S=1013,ui=1014,di=1015,Na=1016,jS=1017,XS=1018,Qi=1020,qP=1021,or=1023,YP=1024,KP=1025,eo=1026,ps=1027,ZP=1028,qS=1029,JP=1030,YS=1031,KS=1033,Wd=33776,$d=33777,jd=33778,Xd=33779,W0=35840,$0=35841,j0=35842,X0=35843,QP=36196,q0=37492,Y0=37496,K0=37808,Z0=37809,J0=37810,Q0=37811,ev=37812,tv=37813,nv=37814,rv=37815,iv=37816,ov=37817,sv=37818,av=37819,lv=37820,cv=37821,qd=36492,uv=36494,dv=36495,e2=36283,fv=36284,hv=36285,pv=36286,ZS=3e3,to=3001,t2=3200,n2=3201,JS=0,r2=1,Vn="",jt="srgb",jr="srgb-linear",vm="display-p3",Zu="display-p3-linear",Jc="linear",pt="srgb",Qc="rec709",eu="p3",vo=7680,mv=519,i2=512,o2=513,s2=514,a2=515,l2=516,c2=517,u2=518,d2=519,gv=35044,vv="300 es",Wh=1035,zr=2e3,tu=2001;class ho{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(n)===-1&&r[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const r=this._listeners;return r[e]!==void 0&&r[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const o=i.indexOf(n);o!==-1&&i.splice(o,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const r=this._listeners[e.type];if(r!==void 0){e.target=this;const i=r.slice(0);for(let o=0,s=i.length;o<s;o++)i[o].call(this,e);e.target=null}}}const Zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let _v=1234567;const la=Math.PI/180,ms=180/Math.PI;function As(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Zt[t&255]+Zt[t>>8&255]+Zt[t>>16&255]+Zt[t>>24&255]+"-"+Zt[e&255]+Zt[e>>8&255]+"-"+Zt[e>>16&15|64]+Zt[e>>24&255]+"-"+Zt[n&63|128]+Zt[n>>8&255]+"-"+Zt[n>>16&255]+Zt[n>>24&255]+Zt[r&255]+Zt[r>>8&255]+Zt[r>>16&255]+Zt[r>>24&255]).toLowerCase()}function en(t,e,n){return Math.max(e,Math.min(n,t))}function _m(t,e){return(t%e+e)%e}function f2(t,e,n,r,i){return r+(t-e)*(i-r)/(n-e)}function h2(t,e,n){return t!==e?(n-t)/(e-t):0}function ca(t,e,n){return(1-n)*t+n*e}function p2(t,e,n,r){return ca(t,e,1-Math.exp(-n*r))}function m2(t,e=1){return e-Math.abs(_m(t,e*2)-e)}function g2(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*(3-2*t))}function v2(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*t*(t*(t*6-15)+10))}function _2(t,e){return t+Math.floor(Math.random()*(e-t+1))}function y2(t,e){return t+Math.random()*(e-t)}function x2(t){return t*(.5-Math.random())}function S2(t){t!==void 0&&(_v=t);let e=_v+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function E2(t){return t*la}function w2(t){return t*ms}function $h(t){return(t&t-1)===0&&t!==0}function M2(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))}function nu(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function T2(t,e,n,r,i){const o=Math.cos,s=Math.sin,a=o(n/2),l=s(n/2),c=o((e+r)/2),u=s((e+r)/2),f=o((e-r)/2),h=s((e-r)/2),v=o((r-e)/2),_=s((r-e)/2);switch(i){case"XYX":t.set(a*u,l*f,l*h,a*c);break;case"YZY":t.set(l*h,a*u,l*f,a*c);break;case"ZXZ":t.set(l*f,l*h,a*u,a*c);break;case"XZX":t.set(a*u,l*_,l*v,a*c);break;case"YXY":t.set(l*v,a*u,l*_,a*c);break;case"ZYZ":t.set(l*_,l*v,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function No(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function an(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}const b2={DEG2RAD:la,RAD2DEG:ms,generateUUID:As,clamp:en,euclideanModulo:_m,mapLinear:f2,inverseLerp:h2,lerp:ca,damp:p2,pingpong:m2,smoothstep:g2,smootherstep:v2,randInt:_2,randFloat:y2,randFloatSpread:x2,seededRandom:S2,degToRad:E2,radToDeg:w2,isPowerOfTwo:$h,ceilPowerOfTwo:M2,floorPowerOfTwo:nu,setQuaternionFromProperEuler:T2,normalize:an,denormalize:No};class Ge{constructor(e=0,n=0){Ge.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,r=this.y,i=e.elements;return this.x=i[0]*n+i[3]*r+i[6],this.y=i[1]*n+i[4]*r+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(n,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const r=this.dot(e)/n;return Math.acos(en(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,r=this.y-e.y;return n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,r){return this.x=e.x+(n.x-e.x)*r,this.y=e.y+(n.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const r=Math.cos(n),i=Math.sin(n),o=this.x-e.x,s=this.y-e.y;return this.x=o*r-s*i+e.x,this.y=o*i+s*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ze{constructor(e,n,r,i,o,s,a,l,c){Ze.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,r,i,o,s,a,l,c)}set(e,n,r,i,o,s,a,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=n,u[4]=o,u[5]=l,u[6]=r,u[7]=s,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,r=e.elements;return n[0]=r[0],n[1]=r[1],n[2]=r[2],n[3]=r[3],n[4]=r[4],n[5]=r[5],n[6]=r[6],n[7]=r[7],n[8]=r[8],this}extractBasis(e,n,r){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const r=e.elements,i=n.elements,o=this.elements,s=r[0],a=r[3],l=r[6],c=r[1],u=r[4],f=r[7],h=r[2],v=r[5],_=r[8],y=i[0],p=i[3],d=i[6],m=i[1],g=i[4],x=i[7],w=i[2],A=i[5],T=i[8];return o[0]=s*y+a*m+l*w,o[3]=s*p+a*g+l*A,o[6]=s*d+a*x+l*T,o[1]=c*y+u*m+f*w,o[4]=c*p+u*g+f*A,o[7]=c*d+u*x+f*T,o[2]=h*y+v*m+_*w,o[5]=h*p+v*g+_*A,o[8]=h*d+v*x+_*T,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],r=e[1],i=e[2],o=e[3],s=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return n*s*u-n*a*c-r*o*u+r*a*l+i*o*c-i*s*l}invert(){const e=this.elements,n=e[0],r=e[1],i=e[2],o=e[3],s=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=u*s-a*c,h=a*l-u*o,v=c*o-s*l,_=n*f+r*h+i*v;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/_;return e[0]=f*y,e[1]=(i*c-u*r)*y,e[2]=(a*r-i*s)*y,e[3]=h*y,e[4]=(u*n-i*l)*y,e[5]=(i*o-a*n)*y,e[6]=v*y,e[7]=(r*l-c*n)*y,e[8]=(s*n-r*o)*y,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,r,i,o,s,a){const l=Math.cos(o),c=Math.sin(o);return this.set(r*l,r*c,-r*(l*s+c*a)+s+e,-i*c,i*l,-i*(-c*s+l*a)+a+n,0,0,1),this}scale(e,n){return this.premultiply(Yd.makeScale(e,n)),this}rotate(e){return this.premultiply(Yd.makeRotation(-e)),this}translate(e,n){return this.premultiply(Yd.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),r=Math.sin(e);return this.set(n,-r,0,r,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,r=e.elements;for(let i=0;i<9;i++)if(n[i]!==r[i])return!1;return!0}fromArray(e,n=0){for(let r=0;r<9;r++)this.elements[r]=e[r+n];return this}toArray(e=[],n=0){const r=this.elements;return e[n]=r[0],e[n+1]=r[1],e[n+2]=r[2],e[n+3]=r[3],e[n+4]=r[4],e[n+5]=r[5],e[n+6]=r[6],e[n+7]=r[7],e[n+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Yd=new Ze;function QS(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function ru(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function A2(){const t=ru("canvas");return t.style.display="block",t}const yv={};function ua(t){t in yv||(yv[t]=!0,console.warn(t))}const xv=new Ze().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Sv=new Ze().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Sl={[jr]:{transfer:Jc,primaries:Qc,toReference:t=>t,fromReference:t=>t},[jt]:{transfer:pt,primaries:Qc,toReference:t=>t.convertSRGBToLinear(),fromReference:t=>t.convertLinearToSRGB()},[Zu]:{transfer:Jc,primaries:eu,toReference:t=>t.applyMatrix3(Sv),fromReference:t=>t.applyMatrix3(xv)},[vm]:{transfer:pt,primaries:eu,toReference:t=>t.convertSRGBToLinear().applyMatrix3(Sv),fromReference:t=>t.applyMatrix3(xv).convertLinearToSRGB()}},R2=new Set([jr,Zu]),at={enabled:!0,_workingColorSpace:jr,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(t){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!t},get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(t){if(!R2.has(t))throw new Error(`Unsupported working color space, "${t}".`);this._workingColorSpace=t},convert:function(t,e,n){if(this.enabled===!1||e===n||!e||!n)return t;const r=Sl[e].toReference,i=Sl[n].fromReference;return i(r(t))},fromWorkingColorSpace:function(t,e){return this.convert(t,this._workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this._workingColorSpace)},getPrimaries:function(t){return Sl[t].primaries},getTransfer:function(t){return t===Vn?Jc:Sl[t].transfer}};function ts(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function Kd(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let _o;class eE{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{_o===void 0&&(_o=ru("canvas")),_o.width=e.width,_o.height=e.height;const r=_o.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=_o}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=ru("canvas");n.width=e.width,n.height=e.height;const r=n.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const i=r.getImageData(0,0,e.width,e.height),o=i.data;for(let s=0;s<o.length;s++)o[s]=ts(o[s]/255)*255;return r.putImageData(i,0,0),n}else if(e.data){const n=e.data.slice(0);for(let r=0;r<n.length;r++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[r]=Math.floor(ts(n[r]/255)*255):n[r]=ts(n[r]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let C2=0;class tE{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:C2++}),this.uuid=As(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},i=this.data;if(i!==null){let o;if(Array.isArray(i)){o=[];for(let s=0,a=i.length;s<a;s++)i[s].isDataTexture?o.push(Zd(i[s].image)):o.push(Zd(i[s]))}else o=Zd(i);r.url=o}return n||(e.images[this.uuid]=r),r}}function Zd(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?eE.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let P2=0;class Ln extends ho{constructor(e=Ln.DEFAULT_IMAGE,n=Ln.DEFAULT_MAPPING,r=ir,i=ir,o=Hn,s=Da,a=or,l=Ti,c=Ln.DEFAULT_ANISOTROPY,u=Vn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:P2++}),this.uuid=As(),this.name="",this.source=new tE(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=o,this.minFilter=s,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ge(0,0),this.repeat=new Ge(1,1),this.center=new Ge(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(ua("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===to?jt:Vn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),n||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==WS)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Vh:e.x=e.x-Math.floor(e.x);break;case ir:e.x=e.x<0?0:1;break;case Gh:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Vh:e.y=e.y-Math.floor(e.y);break;case ir:e.y=e.y<0?0:1;break;case Gh:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return ua("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===jt?to:ZS}set encoding(e){ua("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===to?jt:Vn}}Ln.DEFAULT_IMAGE=null;Ln.DEFAULT_MAPPING=WS;Ln.DEFAULT_ANISOTROPY=1;class Ht{constructor(e=0,n=0,r=0,i=1){Ht.prototype.isVector4=!0,this.x=e,this.y=n,this.z=r,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,r,i){return this.x=e,this.y=n,this.z=r,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,r=this.y,i=this.z,o=this.w,s=e.elements;return this.x=s[0]*n+s[4]*r+s[8]*i+s[12]*o,this.y=s[1]*n+s[5]*r+s[9]*i+s[13]*o,this.z=s[2]*n+s[6]*r+s[10]*i+s[14]*o,this.w=s[3]*n+s[7]*r+s[11]*i+s[15]*o,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,r,i,o;const l=e.elements,c=l[0],u=l[4],f=l[8],h=l[1],v=l[5],_=l[9],y=l[2],p=l[6],d=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-y)<.01&&Math.abs(_-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+y)<.1&&Math.abs(_+p)<.1&&Math.abs(c+v+d-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const g=(c+1)/2,x=(v+1)/2,w=(d+1)/2,A=(u+h)/4,T=(f+y)/4,C=(_+p)/4;return g>x&&g>w?g<.01?(r=0,i=.707106781,o=.707106781):(r=Math.sqrt(g),i=A/r,o=T/r):x>w?x<.01?(r=.707106781,i=0,o=.707106781):(i=Math.sqrt(x),r=A/i,o=C/i):w<.01?(r=.707106781,i=.707106781,o=0):(o=Math.sqrt(w),r=T/o,i=C/o),this.set(r,i,o,n),this}let m=Math.sqrt((p-_)*(p-_)+(f-y)*(f-y)+(h-u)*(h-u));return Math.abs(m)<.001&&(m=1),this.x=(p-_)/m,this.y=(f-y)/m,this.z=(h-u)/m,this.w=Math.acos((c+v+d-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(n,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,r){return this.x=e.x+(n.x-e.x)*r,this.y=e.y+(n.y-e.y)*r,this.z=e.z+(n.z-e.z)*r,this.w=e.w+(n.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class L2 extends ho{constructor(e=1,n=1,r={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new Ht(0,0,e,n),this.scissorTest=!1,this.viewport=new Ht(0,0,e,n);const i={width:e,height:n,depth:1};r.encoding!==void 0&&(ua("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),r.colorSpace=r.encoding===to?jt:Vn),r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Hn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},r),this.texture=new Ln(i,r.mapping,r.wrapS,r.wrapT,r.magFilter,r.minFilter,r.format,r.type,r.anisotropy,r.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=r.generateMipmaps,this.texture.internalFormat=r.internalFormat,this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.depthTexture=r.depthTexture,this.samples=r.samples}setSize(e,n,r=1){(this.width!==e||this.height!==n||this.depth!==r)&&(this.width=e,this.height=n,this.depth=r,this.texture.image.width=e,this.texture.image.height=n,this.texture.image.depth=r,this.dispose()),this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new tE(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class lo extends L2{constructor(e=1,n=1,r={}){super(e,n,r),this.isWebGLRenderTarget=!0}}class nE extends Ln{constructor(e=null,n=1,r=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:r,depth:i},this.magFilter=un,this.minFilter=un,this.wrapR=ir,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class D2 extends Ln{constructor(e=null,n=1,r=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:r,depth:i},this.magFilter=un,this.minFilter=un,this.wrapR=ir,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ci{constructor(e=0,n=0,r=0,i=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=r,this._w=i}static slerpFlat(e,n,r,i,o,s,a){let l=r[i+0],c=r[i+1],u=r[i+2],f=r[i+3];const h=o[s+0],v=o[s+1],_=o[s+2],y=o[s+3];if(a===0){e[n+0]=l,e[n+1]=c,e[n+2]=u,e[n+3]=f;return}if(a===1){e[n+0]=h,e[n+1]=v,e[n+2]=_,e[n+3]=y;return}if(f!==y||l!==h||c!==v||u!==_){let p=1-a;const d=l*h+c*v+u*_+f*y,m=d>=0?1:-1,g=1-d*d;if(g>Number.EPSILON){const w=Math.sqrt(g),A=Math.atan2(w,d*m);p=Math.sin(p*A)/w,a=Math.sin(a*A)/w}const x=a*m;if(l=l*p+h*x,c=c*p+v*x,u=u*p+_*x,f=f*p+y*x,p===1-a){const w=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=w,c*=w,u*=w,f*=w}}e[n]=l,e[n+1]=c,e[n+2]=u,e[n+3]=f}static multiplyQuaternionsFlat(e,n,r,i,o,s){const a=r[i],l=r[i+1],c=r[i+2],u=r[i+3],f=o[s],h=o[s+1],v=o[s+2],_=o[s+3];return e[n]=a*_+u*f+l*v-c*h,e[n+1]=l*_+u*h+c*f-a*v,e[n+2]=c*_+u*v+a*h-l*f,e[n+3]=u*_-a*f-l*h-c*v,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,r,i){return this._x=e,this._y=n,this._z=r,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n){const r=e._x,i=e._y,o=e._z,s=e._order,a=Math.cos,l=Math.sin,c=a(r/2),u=a(i/2),f=a(o/2),h=l(r/2),v=l(i/2),_=l(o/2);switch(s){case"XYZ":this._x=h*u*f+c*v*_,this._y=c*v*f-h*u*_,this._z=c*u*_+h*v*f,this._w=c*u*f-h*v*_;break;case"YXZ":this._x=h*u*f+c*v*_,this._y=c*v*f-h*u*_,this._z=c*u*_-h*v*f,this._w=c*u*f+h*v*_;break;case"ZXY":this._x=h*u*f-c*v*_,this._y=c*v*f+h*u*_,this._z=c*u*_+h*v*f,this._w=c*u*f-h*v*_;break;case"ZYX":this._x=h*u*f-c*v*_,this._y=c*v*f+h*u*_,this._z=c*u*_-h*v*f,this._w=c*u*f+h*v*_;break;case"YZX":this._x=h*u*f+c*v*_,this._y=c*v*f+h*u*_,this._z=c*u*_-h*v*f,this._w=c*u*f-h*v*_;break;case"XZY":this._x=h*u*f-c*v*_,this._y=c*v*f-h*u*_,this._z=c*u*_+h*v*f,this._w=c*u*f+h*v*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return n!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const r=n/2,i=Math.sin(r);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,r=n[0],i=n[4],o=n[8],s=n[1],a=n[5],l=n[9],c=n[2],u=n[6],f=n[10],h=r+a+f;if(h>0){const v=.5/Math.sqrt(h+1);this._w=.25/v,this._x=(u-l)*v,this._y=(o-c)*v,this._z=(s-i)*v}else if(r>a&&r>f){const v=2*Math.sqrt(1+r-a-f);this._w=(u-l)/v,this._x=.25*v,this._y=(i+s)/v,this._z=(o+c)/v}else if(a>f){const v=2*Math.sqrt(1+a-r-f);this._w=(o-c)/v,this._x=(i+s)/v,this._y=.25*v,this._z=(l+u)/v}else{const v=2*Math.sqrt(1+f-r-a);this._w=(s-i)/v,this._x=(o+c)/v,this._y=(l+u)/v,this._z=.25*v}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let r=e.dot(n)+1;return r<Number.EPSILON?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(en(this.dot(e),-1,1)))}rotateTowards(e,n){const r=this.angleTo(e);if(r===0)return this;const i=Math.min(1,n/r);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const r=e._x,i=e._y,o=e._z,s=e._w,a=n._x,l=n._y,c=n._z,u=n._w;return this._x=r*u+s*a+i*c-o*l,this._y=i*u+s*l+o*a-r*c,this._z=o*u+s*c+r*l-i*a,this._w=s*u-r*a-i*l-o*c,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const r=this._x,i=this._y,o=this._z,s=this._w;let a=s*e._w+r*e._x+i*e._y+o*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=s,this._x=r,this._y=i,this._z=o,this;const l=1-a*a;if(l<=Number.EPSILON){const v=1-n;return this._w=v*s+n*this._w,this._x=v*r+n*this._x,this._y=v*i+n*this._y,this._z=v*o+n*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),f=Math.sin((1-n)*u)/c,h=Math.sin(n*u)/c;return this._w=s*f+this._w*h,this._x=r*f+this._x*h,this._y=i*f+this._y*h,this._z=o*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,n,r){return this.copy(e).slerp(n,r)}random(){const e=Math.random(),n=Math.sqrt(1-e),r=Math.sqrt(e),i=2*Math.PI*Math.random(),o=2*Math.PI*Math.random();return this.set(n*Math.cos(i),r*Math.sin(o),r*Math.cos(o),n*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class K{constructor(e=0,n=0,r=0){K.prototype.isVector3=!0,this.x=e,this.y=n,this.z=r}set(e,n,r){return r===void 0&&(r=this.z),this.x=e,this.y=n,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Ev.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Ev.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,r=this.y,i=this.z,o=e.elements;return this.x=o[0]*n+o[3]*r+o[6]*i,this.y=o[1]*n+o[4]*r+o[7]*i,this.z=o[2]*n+o[5]*r+o[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,r=this.y,i=this.z,o=e.elements,s=1/(o[3]*n+o[7]*r+o[11]*i+o[15]);return this.x=(o[0]*n+o[4]*r+o[8]*i+o[12])*s,this.y=(o[1]*n+o[5]*r+o[9]*i+o[13])*s,this.z=(o[2]*n+o[6]*r+o[10]*i+o[14])*s,this}applyQuaternion(e){const n=this.x,r=this.y,i=this.z,o=e.x,s=e.y,a=e.z,l=e.w,c=2*(s*i-a*r),u=2*(a*n-o*i),f=2*(o*r-s*n);return this.x=n+l*c+s*f-a*u,this.y=r+l*u+a*c-o*f,this.z=i+l*f+o*u-s*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,r=this.y,i=this.z,o=e.elements;return this.x=o[0]*n+o[4]*r+o[8]*i,this.y=o[1]*n+o[5]*r+o[9]*i,this.z=o[2]*n+o[6]*r+o[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(n,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,r){return this.x=e.x+(n.x-e.x)*r,this.y=e.y+(n.y-e.y)*r,this.z=e.z+(n.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const r=e.x,i=e.y,o=e.z,s=n.x,a=n.y,l=n.z;return this.x=i*l-o*a,this.y=o*s-r*l,this.z=r*a-i*s,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const r=e.dot(this)/n;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return Jd.copy(this).projectOnVector(e),this.sub(Jd)}reflect(e){return this.sub(Jd.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const r=this.dot(e)/n;return Math.acos(en(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,r=this.y-e.y,i=this.z-e.z;return n*n+r*r+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,r){const i=Math.sin(n)*e;return this.x=i*Math.sin(r),this.y=Math.cos(n)*e,this.z=i*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,r){return this.x=e*Math.sin(n),this.y=r,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=r,this.z=i,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,n=Math.random()*Math.PI*2,r=Math.sqrt(1-e**2);return this.x=r*Math.cos(n),this.y=r*Math.sin(n),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Jd=new K,Ev=new Ci;class Wa{constructor(e=new K(1/0,1/0,1/0),n=new K(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,r=e.length;n<r;n+=3)this.expandByPoint(Kn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,r=e.count;n<r;n++)this.expandByPoint(Kn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,r=e.length;n<r;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const r=Kn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const o=r.getAttribute("position");if(n===!0&&o!==void 0&&e.isInstancedMesh!==!0)for(let s=0,a=o.count;s<a;s++)e.isMesh===!0?e.getVertexPosition(s,Kn):Kn.fromBufferAttribute(o,s),Kn.applyMatrix4(e.matrixWorld),this.expandByPoint(Kn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),El.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),El.copy(r.boundingBox)),El.applyMatrix4(e.matrixWorld),this.union(El)}const i=e.children;for(let o=0,s=i.length;o<s;o++)this.expandByObject(i[o],n);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Kn),Kn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,r;return e.normal.x>0?(n=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),n<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Hs),wl.subVectors(this.max,Hs),yo.subVectors(e.a,Hs),xo.subVectors(e.b,Hs),So.subVectors(e.c,Hs),Kr.subVectors(xo,yo),Zr.subVectors(So,xo),ki.subVectors(yo,So);let n=[0,-Kr.z,Kr.y,0,-Zr.z,Zr.y,0,-ki.z,ki.y,Kr.z,0,-Kr.x,Zr.z,0,-Zr.x,ki.z,0,-ki.x,-Kr.y,Kr.x,0,-Zr.y,Zr.x,0,-ki.y,ki.x,0];return!Qd(n,yo,xo,So,wl)||(n=[1,0,0,0,1,0,0,0,1],!Qd(n,yo,xo,So,wl))?!1:(Ml.crossVectors(Kr,Zr),n=[Ml.x,Ml.y,Ml.z],Qd(n,yo,xo,So,wl))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Kn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Kn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Rr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Rr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Rr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Rr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Rr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Rr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Rr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Rr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Rr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Rr=[new K,new K,new K,new K,new K,new K,new K,new K],Kn=new K,El=new Wa,yo=new K,xo=new K,So=new K,Kr=new K,Zr=new K,ki=new K,Hs=new K,wl=new K,Ml=new K,Fi=new K;function Qd(t,e,n,r,i){for(let o=0,s=t.length-3;o<=s;o+=3){Fi.fromArray(t,o);const a=i.x*Math.abs(Fi.x)+i.y*Math.abs(Fi.y)+i.z*Math.abs(Fi.z),l=e.dot(Fi),c=n.dot(Fi),u=r.dot(Fi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const N2=new Wa,Vs=new K,ef=new K;class ym{constructor(e=new K,n=-1){this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const r=this.center;n!==void 0?r.copy(n):N2.setFromPoints(e).getCenter(r);let i=0;for(let o=0,s=e.length;o<s;o++)i=Math.max(i,r.distanceToSquared(e[o]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const r=this.center.distanceToSquared(e);return n.copy(e),r>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Vs.subVectors(e,this.center);const n=Vs.lengthSq();if(n>this.radius*this.radius){const r=Math.sqrt(n),i=(r-this.radius)*.5;this.center.addScaledVector(Vs,i/r),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ef.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Vs.copy(e.center).add(ef)),this.expandByPoint(Vs.copy(e.center).sub(ef))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Cr=new K,tf=new K,Tl=new K,Jr=new K,nf=new K,bl=new K,rf=new K;class xm{constructor(e=new K,n=new K(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Cr)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const r=n.dot(this.direction);return r<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Cr.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Cr.copy(this.origin).addScaledVector(this.direction,n),Cr.distanceToSquared(e))}distanceSqToSegment(e,n,r,i){tf.copy(e).add(n).multiplyScalar(.5),Tl.copy(n).sub(e).normalize(),Jr.copy(this.origin).sub(tf);const o=e.distanceTo(n)*.5,s=-this.direction.dot(Tl),a=Jr.dot(this.direction),l=-Jr.dot(Tl),c=Jr.lengthSq(),u=Math.abs(1-s*s);let f,h,v,_;if(u>0)if(f=s*l-a,h=s*a-l,_=o*u,f>=0)if(h>=-_)if(h<=_){const y=1/u;f*=y,h*=y,v=f*(f+s*h+2*a)+h*(s*f+h+2*l)+c}else h=o,f=Math.max(0,-(s*h+a)),v=-f*f+h*(h+2*l)+c;else h=-o,f=Math.max(0,-(s*h+a)),v=-f*f+h*(h+2*l)+c;else h<=-_?(f=Math.max(0,-(-s*o+a)),h=f>0?-o:Math.min(Math.max(-o,-l),o),v=-f*f+h*(h+2*l)+c):h<=_?(f=0,h=Math.min(Math.max(-o,-l),o),v=h*(h+2*l)+c):(f=Math.max(0,-(s*o+a)),h=f>0?o:Math.min(Math.max(-o,-l),o),v=-f*f+h*(h+2*l)+c);else h=s>0?-o:o,f=Math.max(0,-(s*h+a)),v=-f*f+h*(h+2*l)+c;return r&&r.copy(this.origin).addScaledVector(this.direction,f),i&&i.copy(tf).addScaledVector(Tl,h),v}intersectSphere(e,n){Cr.subVectors(e.center,this.origin);const r=Cr.dot(this.direction),i=Cr.dot(Cr)-r*r,o=e.radius*e.radius;if(i>o)return null;const s=Math.sqrt(o-i),a=r-s,l=r+s;return l<0?null:a<0?this.at(l,n):this.at(a,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/n;return r>=0?r:null}intersectPlane(e,n){const r=this.distanceToPlane(e);return r===null?null:this.at(r,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let r,i,o,s,a,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(r=(e.min.x-h.x)*c,i=(e.max.x-h.x)*c):(r=(e.max.x-h.x)*c,i=(e.min.x-h.x)*c),u>=0?(o=(e.min.y-h.y)*u,s=(e.max.y-h.y)*u):(o=(e.max.y-h.y)*u,s=(e.min.y-h.y)*u),r>s||o>i||((o>r||isNaN(r))&&(r=o),(s<i||isNaN(i))&&(i=s),f>=0?(a=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(a=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),r>l||a>i)||((a>r||r!==r)&&(r=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(r>=0?r:i,n)}intersectsBox(e){return this.intersectBox(e,Cr)!==null}intersectTriangle(e,n,r,i,o){nf.subVectors(n,e),bl.subVectors(r,e),rf.crossVectors(nf,bl);let s=this.direction.dot(rf),a;if(s>0){if(i)return null;a=1}else if(s<0)a=-1,s=-s;else return null;Jr.subVectors(this.origin,e);const l=a*this.direction.dot(bl.crossVectors(Jr,bl));if(l<0)return null;const c=a*this.direction.dot(nf.cross(Jr));if(c<0||l+c>s)return null;const u=-a*Jr.dot(rf);return u<0?null:this.at(u/s,o)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ut{constructor(e,n,r,i,o,s,a,l,c,u,f,h,v,_,y,p){Ut.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,r,i,o,s,a,l,c,u,f,h,v,_,y,p)}set(e,n,r,i,o,s,a,l,c,u,f,h,v,_,y,p){const d=this.elements;return d[0]=e,d[4]=n,d[8]=r,d[12]=i,d[1]=o,d[5]=s,d[9]=a,d[13]=l,d[2]=c,d[6]=u,d[10]=f,d[14]=h,d[3]=v,d[7]=_,d[11]=y,d[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ut().fromArray(this.elements)}copy(e){const n=this.elements,r=e.elements;return n[0]=r[0],n[1]=r[1],n[2]=r[2],n[3]=r[3],n[4]=r[4],n[5]=r[5],n[6]=r[6],n[7]=r[7],n[8]=r[8],n[9]=r[9],n[10]=r[10],n[11]=r[11],n[12]=r[12],n[13]=r[13],n[14]=r[14],n[15]=r[15],this}copyPosition(e){const n=this.elements,r=e.elements;return n[12]=r[12],n[13]=r[13],n[14]=r[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,r){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,n,r){return this.set(e.x,n.x,r.x,0,e.y,n.y,r.y,0,e.z,n.z,r.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,r=e.elements,i=1/Eo.setFromMatrixColumn(e,0).length(),o=1/Eo.setFromMatrixColumn(e,1).length(),s=1/Eo.setFromMatrixColumn(e,2).length();return n[0]=r[0]*i,n[1]=r[1]*i,n[2]=r[2]*i,n[3]=0,n[4]=r[4]*o,n[5]=r[5]*o,n[6]=r[6]*o,n[7]=0,n[8]=r[8]*s,n[9]=r[9]*s,n[10]=r[10]*s,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,r=e.x,i=e.y,o=e.z,s=Math.cos(r),a=Math.sin(r),l=Math.cos(i),c=Math.sin(i),u=Math.cos(o),f=Math.sin(o);if(e.order==="XYZ"){const h=s*u,v=s*f,_=a*u,y=a*f;n[0]=l*u,n[4]=-l*f,n[8]=c,n[1]=v+_*c,n[5]=h-y*c,n[9]=-a*l,n[2]=y-h*c,n[6]=_+v*c,n[10]=s*l}else if(e.order==="YXZ"){const h=l*u,v=l*f,_=c*u,y=c*f;n[0]=h+y*a,n[4]=_*a-v,n[8]=s*c,n[1]=s*f,n[5]=s*u,n[9]=-a,n[2]=v*a-_,n[6]=y+h*a,n[10]=s*l}else if(e.order==="ZXY"){const h=l*u,v=l*f,_=c*u,y=c*f;n[0]=h-y*a,n[4]=-s*f,n[8]=_+v*a,n[1]=v+_*a,n[5]=s*u,n[9]=y-h*a,n[2]=-s*c,n[6]=a,n[10]=s*l}else if(e.order==="ZYX"){const h=s*u,v=s*f,_=a*u,y=a*f;n[0]=l*u,n[4]=_*c-v,n[8]=h*c+y,n[1]=l*f,n[5]=y*c+h,n[9]=v*c-_,n[2]=-c,n[6]=a*l,n[10]=s*l}else if(e.order==="YZX"){const h=s*l,v=s*c,_=a*l,y=a*c;n[0]=l*u,n[4]=y-h*f,n[8]=_*f+v,n[1]=f,n[5]=s*u,n[9]=-a*u,n[2]=-c*u,n[6]=v*f+_,n[10]=h-y*f}else if(e.order==="XZY"){const h=s*l,v=s*c,_=a*l,y=a*c;n[0]=l*u,n[4]=-f,n[8]=c*u,n[1]=h*f+y,n[5]=s*u,n[9]=v*f-_,n[2]=_*f-v,n[6]=a*u,n[10]=y*f+h}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(I2,e,U2)}lookAt(e,n,r){const i=this.elements;return Tn.subVectors(e,n),Tn.lengthSq()===0&&(Tn.z=1),Tn.normalize(),Qr.crossVectors(r,Tn),Qr.lengthSq()===0&&(Math.abs(r.z)===1?Tn.x+=1e-4:Tn.z+=1e-4,Tn.normalize(),Qr.crossVectors(r,Tn)),Qr.normalize(),Al.crossVectors(Tn,Qr),i[0]=Qr.x,i[4]=Al.x,i[8]=Tn.x,i[1]=Qr.y,i[5]=Al.y,i[9]=Tn.y,i[2]=Qr.z,i[6]=Al.z,i[10]=Tn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const r=e.elements,i=n.elements,o=this.elements,s=r[0],a=r[4],l=r[8],c=r[12],u=r[1],f=r[5],h=r[9],v=r[13],_=r[2],y=r[6],p=r[10],d=r[14],m=r[3],g=r[7],x=r[11],w=r[15],A=i[0],T=i[4],C=i[8],E=i[12],b=i[1],W=i[5],j=i[9],ne=i[13],N=i[2],q=i[6],ee=i[10],J=i[14],G=i[3],V=i[7],H=i[11],D=i[15];return o[0]=s*A+a*b+l*N+c*G,o[4]=s*T+a*W+l*q+c*V,o[8]=s*C+a*j+l*ee+c*H,o[12]=s*E+a*ne+l*J+c*D,o[1]=u*A+f*b+h*N+v*G,o[5]=u*T+f*W+h*q+v*V,o[9]=u*C+f*j+h*ee+v*H,o[13]=u*E+f*ne+h*J+v*D,o[2]=_*A+y*b+p*N+d*G,o[6]=_*T+y*W+p*q+d*V,o[10]=_*C+y*j+p*ee+d*H,o[14]=_*E+y*ne+p*J+d*D,o[3]=m*A+g*b+x*N+w*G,o[7]=m*T+g*W+x*q+w*V,o[11]=m*C+g*j+x*ee+w*H,o[15]=m*E+g*ne+x*J+w*D,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],r=e[4],i=e[8],o=e[12],s=e[1],a=e[5],l=e[9],c=e[13],u=e[2],f=e[6],h=e[10],v=e[14],_=e[3],y=e[7],p=e[11],d=e[15];return _*(+o*l*f-i*c*f-o*a*h+r*c*h+i*a*v-r*l*v)+y*(+n*l*v-n*c*h+o*s*h-i*s*v+i*c*u-o*l*u)+p*(+n*c*f-n*a*v-o*s*f+r*s*v+o*a*u-r*c*u)+d*(-i*a*u-n*l*f+n*a*h+i*s*f-r*s*h+r*l*u)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,r){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=n,i[14]=r),this}invert(){const e=this.elements,n=e[0],r=e[1],i=e[2],o=e[3],s=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=e[9],h=e[10],v=e[11],_=e[12],y=e[13],p=e[14],d=e[15],m=f*p*c-y*h*c+y*l*v-a*p*v-f*l*d+a*h*d,g=_*h*c-u*p*c-_*l*v+s*p*v+u*l*d-s*h*d,x=u*y*c-_*f*c+_*a*v-s*y*v-u*a*d+s*f*d,w=_*f*l-u*y*l-_*a*h+s*y*h+u*a*p-s*f*p,A=n*m+r*g+i*x+o*w;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/A;return e[0]=m*T,e[1]=(y*h*o-f*p*o-y*i*v+r*p*v+f*i*d-r*h*d)*T,e[2]=(a*p*o-y*l*o+y*i*c-r*p*c-a*i*d+r*l*d)*T,e[3]=(f*l*o-a*h*o-f*i*c+r*h*c+a*i*v-r*l*v)*T,e[4]=g*T,e[5]=(u*p*o-_*h*o+_*i*v-n*p*v-u*i*d+n*h*d)*T,e[6]=(_*l*o-s*p*o-_*i*c+n*p*c+s*i*d-n*l*d)*T,e[7]=(s*h*o-u*l*o+u*i*c-n*h*c-s*i*v+n*l*v)*T,e[8]=x*T,e[9]=(_*f*o-u*y*o-_*r*v+n*y*v+u*r*d-n*f*d)*T,e[10]=(s*y*o-_*a*o+_*r*c-n*y*c-s*r*d+n*a*d)*T,e[11]=(u*a*o-s*f*o-u*r*c+n*f*c+s*r*v-n*a*v)*T,e[12]=w*T,e[13]=(u*y*i-_*f*i+_*r*h-n*y*h-u*r*p+n*f*p)*T,e[14]=(_*a*i-s*y*i-_*r*l+n*y*l+s*r*p-n*a*p)*T,e[15]=(s*f*i-u*a*i+u*r*l-n*f*l-s*r*h+n*a*h)*T,this}scale(e){const n=this.elements,r=e.x,i=e.y,o=e.z;return n[0]*=r,n[4]*=i,n[8]*=o,n[1]*=r,n[5]*=i,n[9]*=o,n[2]*=r,n[6]*=i,n[10]*=o,n[3]*=r,n[7]*=i,n[11]*=o,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,r,i))}makeTranslation(e,n,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,r,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,n,-r,0,0,r,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),r=Math.sin(e);return this.set(n,0,r,0,0,1,0,0,-r,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),r=Math.sin(e);return this.set(n,-r,0,0,r,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const r=Math.cos(n),i=Math.sin(n),o=1-r,s=e.x,a=e.y,l=e.z,c=o*s,u=o*a;return this.set(c*s+r,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+r,u*l-i*s,0,c*l-i*a,u*l+i*s,o*l*l+r,0,0,0,0,1),this}makeScale(e,n,r){return this.set(e,0,0,0,0,n,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,n,r,i,o,s){return this.set(1,r,o,0,e,1,s,0,n,i,1,0,0,0,0,1),this}compose(e,n,r){const i=this.elements,o=n._x,s=n._y,a=n._z,l=n._w,c=o+o,u=s+s,f=a+a,h=o*c,v=o*u,_=o*f,y=s*u,p=s*f,d=a*f,m=l*c,g=l*u,x=l*f,w=r.x,A=r.y,T=r.z;return i[0]=(1-(y+d))*w,i[1]=(v+x)*w,i[2]=(_-g)*w,i[3]=0,i[4]=(v-x)*A,i[5]=(1-(h+d))*A,i[6]=(p+m)*A,i[7]=0,i[8]=(_+g)*T,i[9]=(p-m)*T,i[10]=(1-(h+y))*T,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,n,r){const i=this.elements;let o=Eo.set(i[0],i[1],i[2]).length();const s=Eo.set(i[4],i[5],i[6]).length(),a=Eo.set(i[8],i[9],i[10]).length();this.determinant()<0&&(o=-o),e.x=i[12],e.y=i[13],e.z=i[14],Zn.copy(this);const c=1/o,u=1/s,f=1/a;return Zn.elements[0]*=c,Zn.elements[1]*=c,Zn.elements[2]*=c,Zn.elements[4]*=u,Zn.elements[5]*=u,Zn.elements[6]*=u,Zn.elements[8]*=f,Zn.elements[9]*=f,Zn.elements[10]*=f,n.setFromRotationMatrix(Zn),r.x=o,r.y=s,r.z=a,this}makePerspective(e,n,r,i,o,s,a=zr){const l=this.elements,c=2*o/(n-e),u=2*o/(r-i),f=(n+e)/(n-e),h=(r+i)/(r-i);let v,_;if(a===zr)v=-(s+o)/(s-o),_=-2*s*o/(s-o);else if(a===tu)v=-s/(s-o),_=-s*o/(s-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=v,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,r,i,o,s,a=zr){const l=this.elements,c=1/(n-e),u=1/(r-i),f=1/(s-o),h=(n+e)*c,v=(r+i)*u;let _,y;if(a===zr)_=(s+o)*f,y=-2*f;else if(a===tu)_=o*f,y=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-v,l[2]=0,l[6]=0,l[10]=y,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,r=e.elements;for(let i=0;i<16;i++)if(n[i]!==r[i])return!1;return!0}fromArray(e,n=0){for(let r=0;r<16;r++)this.elements[r]=e[r+n];return this}toArray(e=[],n=0){const r=this.elements;return e[n]=r[0],e[n+1]=r[1],e[n+2]=r[2],e[n+3]=r[3],e[n+4]=r[4],e[n+5]=r[5],e[n+6]=r[6],e[n+7]=r[7],e[n+8]=r[8],e[n+9]=r[9],e[n+10]=r[10],e[n+11]=r[11],e[n+12]=r[12],e[n+13]=r[13],e[n+14]=r[14],e[n+15]=r[15],e}}const Eo=new K,Zn=new Ut,I2=new K(0,0,0),U2=new K(1,1,1),Qr=new K,Al=new K,Tn=new K,wv=new Ut,Mv=new Ci;class gs{constructor(e=0,n=0,r=0,i=gs.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,r,i=this._order){return this._x=e,this._y=n,this._z=r,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,r=!0){const i=e.elements,o=i[0],s=i[4],a=i[8],l=i[1],c=i[5],u=i[9],f=i[2],h=i[6],v=i[10];switch(n){case"XYZ":this._y=Math.asin(en(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,v),this._z=Math.atan2(-s,o)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-en(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,v),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,o),this._z=0);break;case"ZXY":this._x=Math.asin(en(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,v),this._z=Math.atan2(-s,c)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-en(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,v),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-s,c));break;case"YZX":this._z=Math.asin(en(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,o)):(this._x=0,this._y=Math.atan2(a,v));break;case"XZY":this._z=Math.asin(-en(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,o)):(this._x=Math.atan2(-u,v),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,r){return wv.makeRotationFromQuaternion(e),this.setFromRotationMatrix(wv,n,r)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Mv.setFromEuler(this),this.setFromQuaternion(Mv,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}gs.DEFAULT_ORDER="XYZ";class Sm{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let O2=0;const Tv=new K,wo=new Ci,Pr=new Ut,Rl=new K,Gs=new K,k2=new K,F2=new Ci,bv=new K(1,0,0),Av=new K(0,1,0),Rv=new K(0,0,1),B2={type:"added"},z2={type:"removed"};class Gt extends ho{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:O2++}),this.uuid=As(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Gt.DEFAULT_UP.clone();const e=new K,n=new gs,r=new Ci,i=new K(1,1,1);function o(){r.setFromEuler(n,!1)}function s(){n.setFromQuaternion(r,void 0,!1)}n._onChange(o),r._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ut},normalMatrix:{value:new Ze}}),this.matrix=new Ut,this.matrixWorld=new Ut,this.matrixAutoUpdate=Gt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=Gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new Sm,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return wo.setFromAxisAngle(e,n),this.quaternion.multiply(wo),this}rotateOnWorldAxis(e,n){return wo.setFromAxisAngle(e,n),this.quaternion.premultiply(wo),this}rotateX(e){return this.rotateOnAxis(bv,e)}rotateY(e){return this.rotateOnAxis(Av,e)}rotateZ(e){return this.rotateOnAxis(Rv,e)}translateOnAxis(e,n){return Tv.copy(e).applyQuaternion(this.quaternion),this.position.add(Tv.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(bv,e)}translateY(e){return this.translateOnAxis(Av,e)}translateZ(e){return this.translateOnAxis(Rv,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Pr.copy(this.matrixWorld).invert())}lookAt(e,n,r){e.isVector3?Rl.copy(e):Rl.set(e,n,r);const i=this.parent;this.updateWorldMatrix(!0,!1),Gs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pr.lookAt(Gs,Rl,this.up):Pr.lookAt(Rl,Gs,this.up),this.quaternion.setFromRotationMatrix(Pr),i&&(Pr.extractRotation(i.matrixWorld),wo.setFromRotationMatrix(Pr),this.quaternion.premultiply(wo.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(B2)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(z2)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Pr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Pr.multiply(e.parent.matrixWorld)),e.applyMatrix4(Pr),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let r=0,i=this.children.length;r<i;r++){const s=this.children[r].getObjectByProperty(e,n);if(s!==void 0)return s}}getObjectsByProperty(e,n){let r=[];this[e]===n&&r.push(this);for(let i=0,o=this.children.length;i<o;i++){const s=this.children[i].getObjectsByProperty(e,n);s.length>0&&(r=r.concat(s))}return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gs,e,k2),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gs,F2,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let r=0,i=n.length;r<i;r++)n[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let r=0,i=n.length;r<i;r++)n[r].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let r=0,i=n.length;r<i;r++){const o=n[r];(o.matrixWorldAutoUpdate===!0||e===!0)&&o.updateMatrixWorld(e)}}updateWorldMatrix(e,n){const r=this.parent;if(e===!0&&r!==null&&r.matrixWorldAutoUpdate===!0&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),n===!0){const i=this.children;for(let o=0,s=i.length;o<s;o++){const a=i[o];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const n=e===void 0||typeof e=="string",r={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON()));function o(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=o(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];o(e.shapes,f)}else o(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(o(e.materials,this.material[l]));i.material=a}else i.material=o(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(o(e.animations,l))}}if(n){const a=s(e.geometries),l=s(e.materials),c=s(e.textures),u=s(e.images),f=s(e.shapes),h=s(e.skeletons),v=s(e.animations),_=s(e.nodes);a.length>0&&(r.geometries=a),l.length>0&&(r.materials=l),c.length>0&&(r.textures=c),u.length>0&&(r.images=u),f.length>0&&(r.shapes=f),h.length>0&&(r.skeletons=h),v.length>0&&(r.animations=v),_.length>0&&(r.nodes=_)}return r.object=i,r;function s(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let r=0;r<e.children.length;r++){const i=e.children[r];this.add(i.clone())}return this}}Gt.DEFAULT_UP=new K(0,1,0);Gt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Jn=new K,Lr=new K,of=new K,Dr=new K,Mo=new K,To=new K,Cv=new K,sf=new K,af=new K,lf=new K;let Cl=!1;class rr{constructor(e=new K,n=new K,r=new K){this.a=e,this.b=n,this.c=r}static getNormal(e,n,r,i){i.subVectors(r,n),Jn.subVectors(e,n),i.cross(Jn);const o=i.lengthSq();return o>0?i.multiplyScalar(1/Math.sqrt(o)):i.set(0,0,0)}static getBarycoord(e,n,r,i,o){Jn.subVectors(i,n),Lr.subVectors(r,n),of.subVectors(e,n);const s=Jn.dot(Jn),a=Jn.dot(Lr),l=Jn.dot(of),c=Lr.dot(Lr),u=Lr.dot(of),f=s*c-a*a;if(f===0)return o.set(-2,-1,-1);const h=1/f,v=(c*l-a*u)*h,_=(s*u-a*l)*h;return o.set(1-v-_,_,v)}static containsPoint(e,n,r,i){return this.getBarycoord(e,n,r,i,Dr),Dr.x>=0&&Dr.y>=0&&Dr.x+Dr.y<=1}static getUV(e,n,r,i,o,s,a,l){return Cl===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Cl=!0),this.getInterpolation(e,n,r,i,o,s,a,l)}static getInterpolation(e,n,r,i,o,s,a,l){return this.getBarycoord(e,n,r,i,Dr),l.setScalar(0),l.addScaledVector(o,Dr.x),l.addScaledVector(s,Dr.y),l.addScaledVector(a,Dr.z),l}static isFrontFacing(e,n,r,i){return Jn.subVectors(r,n),Lr.subVectors(e,n),Jn.cross(Lr).dot(i)<0}set(e,n,r){return this.a.copy(e),this.b.copy(n),this.c.copy(r),this}setFromPointsAndIndices(e,n,r,i){return this.a.copy(e[n]),this.b.copy(e[r]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,n,r,i){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Jn.subVectors(this.c,this.b),Lr.subVectors(this.a,this.b),Jn.cross(Lr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return rr.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return rr.getBarycoord(e,this.a,this.b,this.c,n)}getUV(e,n,r,i,o){return Cl===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Cl=!0),rr.getInterpolation(e,this.a,this.b,this.c,n,r,i,o)}getInterpolation(e,n,r,i,o){return rr.getInterpolation(e,this.a,this.b,this.c,n,r,i,o)}containsPoint(e){return rr.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return rr.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const r=this.a,i=this.b,o=this.c;let s,a;Mo.subVectors(i,r),To.subVectors(o,r),sf.subVectors(e,r);const l=Mo.dot(sf),c=To.dot(sf);if(l<=0&&c<=0)return n.copy(r);af.subVectors(e,i);const u=Mo.dot(af),f=To.dot(af);if(u>=0&&f<=u)return n.copy(i);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return s=l/(l-u),n.copy(r).addScaledVector(Mo,s);lf.subVectors(e,o);const v=Mo.dot(lf),_=To.dot(lf);if(_>=0&&v<=_)return n.copy(o);const y=v*c-l*_;if(y<=0&&c>=0&&_<=0)return a=c/(c-_),n.copy(r).addScaledVector(To,a);const p=u*_-v*f;if(p<=0&&f-u>=0&&v-_>=0)return Cv.subVectors(o,i),a=(f-u)/(f-u+(v-_)),n.copy(i).addScaledVector(Cv,a);const d=1/(p+y+h);return s=y*d,a=h*d,n.copy(r).addScaledVector(Mo,s).addScaledVector(To,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const rE={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ei={h:0,s:0,l:0},Pl={h:0,s:0,l:0};function cf(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class nt{constructor(e,n,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,r)}set(e,n,r){if(n===void 0&&r===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,n,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=jt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,at.toWorkingColorSpace(this,n),this}setRGB(e,n,r,i=at.workingColorSpace){return this.r=e,this.g=n,this.b=r,at.toWorkingColorSpace(this,i),this}setHSL(e,n,r,i=at.workingColorSpace){if(e=_m(e,1),n=en(n,0,1),r=en(r,0,1),n===0)this.r=this.g=this.b=r;else{const o=r<=.5?r*(1+n):r+n-r*n,s=2*r-o;this.r=cf(s,o,e+1/3),this.g=cf(s,o,e),this.b=cf(s,o,e-1/3)}return at.toWorkingColorSpace(this,i),this}setStyle(e,n=jt){function r(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let o;const s=i[1],a=i[2];switch(s){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return r(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,n);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return r(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,n);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return r(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const o=i[1],s=o.length;if(s===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,n);if(s===6)return this.setHex(parseInt(o,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=jt){const r=rE[e.toLowerCase()];return r!==void 0?this.setHex(r,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ts(e.r),this.g=ts(e.g),this.b=ts(e.b),this}copyLinearToSRGB(e){return this.r=Kd(e.r),this.g=Kd(e.g),this.b=Kd(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=jt){return at.fromWorkingColorSpace(Jt.copy(this),e),Math.round(en(Jt.r*255,0,255))*65536+Math.round(en(Jt.g*255,0,255))*256+Math.round(en(Jt.b*255,0,255))}getHexString(e=jt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=at.workingColorSpace){at.fromWorkingColorSpace(Jt.copy(this),n);const r=Jt.r,i=Jt.g,o=Jt.b,s=Math.max(r,i,o),a=Math.min(r,i,o);let l,c;const u=(a+s)/2;if(a===s)l=0,c=0;else{const f=s-a;switch(c=u<=.5?f/(s+a):f/(2-s-a),s){case r:l=(i-o)/f+(i<o?6:0);break;case i:l=(o-r)/f+2;break;case o:l=(r-i)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,n=at.workingColorSpace){return at.fromWorkingColorSpace(Jt.copy(this),n),e.r=Jt.r,e.g=Jt.g,e.b=Jt.b,e}getStyle(e=jt){at.fromWorkingColorSpace(Jt.copy(this),e);const n=Jt.r,r=Jt.g,i=Jt.b;return e!==jt?`color(${e} ${n.toFixed(3)} ${r.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(r*255)},${Math.round(i*255)})`}offsetHSL(e,n,r){return this.getHSL(ei),this.setHSL(ei.h+e,ei.s+n,ei.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,r){return this.r=e.r+(n.r-e.r)*r,this.g=e.g+(n.g-e.g)*r,this.b=e.b+(n.b-e.b)*r,this}lerpHSL(e,n){this.getHSL(ei),e.getHSL(Pl);const r=ca(ei.h,Pl.h,n),i=ca(ei.s,Pl.s,n),o=ca(ei.l,Pl.l,n);return this.setHSL(r,i,o),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,r=this.g,i=this.b,o=e.elements;return this.r=o[0]*n+o[3]*r+o[6]*i,this.g=o[1]*n+o[4]*r+o[7]*i,this.b=o[2]*n+o[5]*r+o[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Jt=new nt;nt.NAMES=rE;let H2=0;class $a extends ho{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:H2++}),this.uuid=As(),this.name="",this.type="Material",this.blending=es,this.side=Ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fh,this.blendDst=Bh,this.blendEquation=$i,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new nt(0,0,0),this.blendAlpha=0,this.depthFunc=Zc,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=mv,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=vo,this.stencilZFail=vo,this.stencilZPass=vo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const r=e[n];if(r===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const i=this[n];if(i===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(r):i&&i.isVector3&&r&&r.isVector3?i.copy(r):this[n]=r}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const r={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==es&&(r.blending=this.blending),this.side!==Ri&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==Fh&&(r.blendSrc=this.blendSrc),this.blendDst!==Bh&&(r.blendDst=this.blendDst),this.blendEquation!==$i&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==Zc&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==mv&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==vo&&(r.stencilFail=this.stencilFail),this.stencilZFail!==vo&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==vo&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function i(o){const s=[];for(const a in o){const l=o[a];delete l.metadata,s.push(l)}return s}if(n){const o=i(e.textures),s=i(e.images);o.length>0&&(r.textures=o),s.length>0&&(r.images=s)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let r=null;if(n!==null){const i=n.length;r=new Array(i);for(let o=0;o!==i;++o)r[o]=n[o].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class iE extends $a{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=GS,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Rt=new K,Ll=new Ge;class Sr{constructor(e,n,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=r,this.usage=gv,this.updateRange={offset:0,count:-1},this.gpuType=di,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,r){e*=this.itemSize,r*=n.itemSize;for(let i=0,o=this.itemSize;i<o;i++)this.array[e+i]=n.array[r+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,r=this.count;n<r;n++)Ll.fromBufferAttribute(this,n),Ll.applyMatrix3(e),this.setXY(n,Ll.x,Ll.y);else if(this.itemSize===3)for(let n=0,r=this.count;n<r;n++)Rt.fromBufferAttribute(this,n),Rt.applyMatrix3(e),this.setXYZ(n,Rt.x,Rt.y,Rt.z);return this}applyMatrix4(e){for(let n=0,r=this.count;n<r;n++)Rt.fromBufferAttribute(this,n),Rt.applyMatrix4(e),this.setXYZ(n,Rt.x,Rt.y,Rt.z);return this}applyNormalMatrix(e){for(let n=0,r=this.count;n<r;n++)Rt.fromBufferAttribute(this,n),Rt.applyNormalMatrix(e),this.setXYZ(n,Rt.x,Rt.y,Rt.z);return this}transformDirection(e){for(let n=0,r=this.count;n<r;n++)Rt.fromBufferAttribute(this,n),Rt.transformDirection(e),this.setXYZ(n,Rt.x,Rt.y,Rt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let r=this.array[e*this.itemSize+n];return this.normalized&&(r=No(r,this.array)),r}setComponent(e,n,r){return this.normalized&&(r=an(r,this.array)),this.array[e*this.itemSize+n]=r,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=No(n,this.array)),n}setX(e,n){return this.normalized&&(n=an(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=No(n,this.array)),n}setY(e,n){return this.normalized&&(n=an(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=No(n,this.array)),n}setZ(e,n){return this.normalized&&(n=an(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=No(n,this.array)),n}setW(e,n){return this.normalized&&(n=an(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,r){return e*=this.itemSize,this.normalized&&(n=an(n,this.array),r=an(r,this.array)),this.array[e+0]=n,this.array[e+1]=r,this}setXYZ(e,n,r,i){return e*=this.itemSize,this.normalized&&(n=an(n,this.array),r=an(r,this.array),i=an(i,this.array)),this.array[e+0]=n,this.array[e+1]=r,this.array[e+2]=i,this}setXYZW(e,n,r,i,o){return e*=this.itemSize,this.normalized&&(n=an(n,this.array),r=an(r,this.array),i=an(i,this.array),o=an(o,this.array)),this.array[e+0]=n,this.array[e+1]=r,this.array[e+2]=i,this.array[e+3]=o,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==gv&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}}class oE extends Sr{constructor(e,n,r){super(new Uint16Array(e),n,r)}}class sE extends Sr{constructor(e,n,r){super(new Uint32Array(e),n,r)}}class Er extends Sr{constructor(e,n,r){super(new Float32Array(e),n,r)}}let V2=0;const kn=new Ut,uf=new Gt,bo=new K,bn=new Wa,Ws=new Wa,Bt=new K;class Ii extends ho{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:V2++}),this.uuid=As(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(QS(e)?sE:oE)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,r=0){this.groups.push({start:e,count:n,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const o=new Ze().getNormalMatrix(e);r.applyNormalMatrix(o),r.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return kn.makeRotationFromQuaternion(e),this.applyMatrix4(kn),this}rotateX(e){return kn.makeRotationX(e),this.applyMatrix4(kn),this}rotateY(e){return kn.makeRotationY(e),this.applyMatrix4(kn),this}rotateZ(e){return kn.makeRotationZ(e),this.applyMatrix4(kn),this}translate(e,n,r){return kn.makeTranslation(e,n,r),this.applyMatrix4(kn),this}scale(e,n,r){return kn.makeScale(e,n,r),this.applyMatrix4(kn),this}lookAt(e){return uf.lookAt(e),uf.updateMatrix(),this.applyMatrix4(uf.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(bo).negate(),this.translate(bo.x,bo.y,bo.z),this}setFromPoints(e){const n=[];for(let r=0,i=e.length;r<i;r++){const o=e[r];n.push(o.x,o.y,o.z||0)}return this.setAttribute("position",new Er(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wa);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new K(-1/0,-1/0,-1/0),new K(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let r=0,i=n.length;r<i;r++){const o=n[r];bn.setFromBufferAttribute(o),this.morphTargetsRelative?(Bt.addVectors(this.boundingBox.min,bn.min),this.boundingBox.expandByPoint(Bt),Bt.addVectors(this.boundingBox.max,bn.max),this.boundingBox.expandByPoint(Bt)):(this.boundingBox.expandByPoint(bn.min),this.boundingBox.expandByPoint(bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ym);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new K,1/0);return}if(e){const r=this.boundingSphere.center;if(bn.setFromBufferAttribute(e),n)for(let o=0,s=n.length;o<s;o++){const a=n[o];Ws.setFromBufferAttribute(a),this.morphTargetsRelative?(Bt.addVectors(bn.min,Ws.min),bn.expandByPoint(Bt),Bt.addVectors(bn.max,Ws.max),bn.expandByPoint(Bt)):(bn.expandByPoint(Ws.min),bn.expandByPoint(Ws.max))}bn.getCenter(r);let i=0;for(let o=0,s=e.count;o<s;o++)Bt.fromBufferAttribute(e,o),i=Math.max(i,r.distanceToSquared(Bt));if(n)for(let o=0,s=n.length;o<s;o++){const a=n[o],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Bt.fromBufferAttribute(a,c),l&&(bo.fromBufferAttribute(e,c),Bt.add(bo)),i=Math.max(i,r.distanceToSquared(Bt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=e.array,i=n.position.array,o=n.normal.array,s=n.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Sr(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let b=0;b<a;b++)c[b]=new K,u[b]=new K;const f=new K,h=new K,v=new K,_=new Ge,y=new Ge,p=new Ge,d=new K,m=new K;function g(b,W,j){f.fromArray(i,b*3),h.fromArray(i,W*3),v.fromArray(i,j*3),_.fromArray(s,b*2),y.fromArray(s,W*2),p.fromArray(s,j*2),h.sub(f),v.sub(f),y.sub(_),p.sub(_);const ne=1/(y.x*p.y-p.x*y.y);isFinite(ne)&&(d.copy(h).multiplyScalar(p.y).addScaledVector(v,-y.y).multiplyScalar(ne),m.copy(v).multiplyScalar(y.x).addScaledVector(h,-p.x).multiplyScalar(ne),c[b].add(d),c[W].add(d),c[j].add(d),u[b].add(m),u[W].add(m),u[j].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:r.length}]);for(let b=0,W=x.length;b<W;++b){const j=x[b],ne=j.start,N=j.count;for(let q=ne,ee=ne+N;q<ee;q+=3)g(r[q+0],r[q+1],r[q+2])}const w=new K,A=new K,T=new K,C=new K;function E(b){T.fromArray(o,b*3),C.copy(T);const W=c[b];w.copy(W),w.sub(T.multiplyScalar(T.dot(W))).normalize(),A.crossVectors(C,W);const ne=A.dot(u[b])<0?-1:1;l[b*4]=w.x,l[b*4+1]=w.y,l[b*4+2]=w.z,l[b*4+3]=ne}for(let b=0,W=x.length;b<W;++b){const j=x[b],ne=j.start,N=j.count;for(let q=ne,ee=ne+N;q<ee;q+=3)E(r[q+0]),E(r[q+1]),E(r[q+2])}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new Sr(new Float32Array(n.count*3),3),this.setAttribute("normal",r);else for(let h=0,v=r.count;h<v;h++)r.setXYZ(h,0,0,0);const i=new K,o=new K,s=new K,a=new K,l=new K,c=new K,u=new K,f=new K;if(e)for(let h=0,v=e.count;h<v;h+=3){const _=e.getX(h+0),y=e.getX(h+1),p=e.getX(h+2);i.fromBufferAttribute(n,_),o.fromBufferAttribute(n,y),s.fromBufferAttribute(n,p),u.subVectors(s,o),f.subVectors(i,o),u.cross(f),a.fromBufferAttribute(r,_),l.fromBufferAttribute(r,y),c.fromBufferAttribute(r,p),a.add(u),l.add(u),c.add(u),r.setXYZ(_,a.x,a.y,a.z),r.setXYZ(y,l.x,l.y,l.z),r.setXYZ(p,c.x,c.y,c.z)}else for(let h=0,v=n.count;h<v;h+=3)i.fromBufferAttribute(n,h+0),o.fromBufferAttribute(n,h+1),s.fromBufferAttribute(n,h+2),u.subVectors(s,o),f.subVectors(i,o),u.cross(f),r.setXYZ(h+0,u.x,u.y,u.z),r.setXYZ(h+1,u.x,u.y,u.z),r.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,r=e.count;n<r;n++)Bt.fromBufferAttribute(e,n),Bt.normalize(),e.setXYZ(n,Bt.x,Bt.y,Bt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,f=a.normalized,h=new c.constructor(l.length*u);let v=0,_=0;for(let y=0,p=l.length;y<p;y++){a.isInterleavedBufferAttribute?v=l[y]*a.data.stride+a.offset:v=l[y]*u;for(let d=0;d<u;d++)h[_++]=c[v++]}return new Sr(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Ii,r=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,r);n.setAttribute(a,c)}const o=this.morphAttributes;for(const a in o){const l=[],c=o[a];for(let u=0,f=c.length;u<f;u++){const h=c[u],v=e(h,r);l.push(v)}n.morphAttributes[a]=l}n.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let a=0,l=s.length;a<l;a++){const c=s[a];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const r=this.attributes;for(const l in r){const c=r[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let o=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const v=c[f];u.push(v.toJSON(e.data))}u.length>0&&(i[l]=u,o=!0)}o&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone(n));const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(n))}const o=e.morphAttributes;for(const c in o){const u=[],f=o[c];for(let h=0,v=f.length;h<v;h++)u.push(f[h].clone(n));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let c=0,u=s.length;c<u;c++){const f=s[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Pv=new Ut,Bi=new xm,Dl=new ym,Lv=new K,Ao=new K,Ro=new K,Co=new K,df=new K,Nl=new K,Il=new Ge,Ul=new Ge,Ol=new Ge,Dv=new K,Nv=new K,Iv=new K,kl=new K,Fl=new K;class ut extends Gt{constructor(e=new Ii,n=new iE){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,r=Object.keys(n);if(r.length>0){const i=n[r[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=i.length;o<s;o++){const a=i[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(e,n){const r=this.geometry,i=r.attributes.position,o=r.morphAttributes.position,s=r.morphTargetsRelative;n.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(o&&a){Nl.set(0,0,0);for(let l=0,c=o.length;l<c;l++){const u=a[l],f=o[l];u!==0&&(df.fromBufferAttribute(f,e),s?Nl.addScaledVector(df,u):Nl.addScaledVector(df.sub(n),u))}n.add(Nl)}return n}raycast(e,n){const r=this.geometry,i=this.material,o=this.matrixWorld;i!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),Dl.copy(r.boundingSphere),Dl.applyMatrix4(o),Bi.copy(e.ray).recast(e.near),!(Dl.containsPoint(Bi.origin)===!1&&(Bi.intersectSphere(Dl,Lv)===null||Bi.origin.distanceToSquared(Lv)>(e.far-e.near)**2))&&(Pv.copy(o).invert(),Bi.copy(e.ray).applyMatrix4(Pv),!(r.boundingBox!==null&&Bi.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,n,Bi)))}_computeIntersections(e,n,r){let i;const o=this.geometry,s=this.material,a=o.index,l=o.attributes.position,c=o.attributes.uv,u=o.attributes.uv1,f=o.attributes.normal,h=o.groups,v=o.drawRange;if(a!==null)if(Array.isArray(s))for(let _=0,y=h.length;_<y;_++){const p=h[_],d=s[p.materialIndex],m=Math.max(p.start,v.start),g=Math.min(a.count,Math.min(p.start+p.count,v.start+v.count));for(let x=m,w=g;x<w;x+=3){const A=a.getX(x),T=a.getX(x+1),C=a.getX(x+2);i=Bl(this,d,e,r,c,u,f,A,T,C),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=p.materialIndex,n.push(i))}}else{const _=Math.max(0,v.start),y=Math.min(a.count,v.start+v.count);for(let p=_,d=y;p<d;p+=3){const m=a.getX(p),g=a.getX(p+1),x=a.getX(p+2);i=Bl(this,s,e,r,c,u,f,m,g,x),i&&(i.faceIndex=Math.floor(p/3),n.push(i))}}else if(l!==void 0)if(Array.isArray(s))for(let _=0,y=h.length;_<y;_++){const p=h[_],d=s[p.materialIndex],m=Math.max(p.start,v.start),g=Math.min(l.count,Math.min(p.start+p.count,v.start+v.count));for(let x=m,w=g;x<w;x+=3){const A=x,T=x+1,C=x+2;i=Bl(this,d,e,r,c,u,f,A,T,C),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=p.materialIndex,n.push(i))}}else{const _=Math.max(0,v.start),y=Math.min(l.count,v.start+v.count);for(let p=_,d=y;p<d;p+=3){const m=p,g=p+1,x=p+2;i=Bl(this,s,e,r,c,u,f,m,g,x),i&&(i.faceIndex=Math.floor(p/3),n.push(i))}}}}function G2(t,e,n,r,i,o,s,a){let l;if(e.side===En?l=r.intersectTriangle(s,o,i,!0,a):l=r.intersectTriangle(i,o,s,e.side===Ri,a),l===null)return null;Fl.copy(a),Fl.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(Fl);return c<n.near||c>n.far?null:{distance:c,point:Fl.clone(),object:t}}function Bl(t,e,n,r,i,o,s,a,l,c){t.getVertexPosition(a,Ao),t.getVertexPosition(l,Ro),t.getVertexPosition(c,Co);const u=G2(t,e,n,r,Ao,Ro,Co,kl);if(u){i&&(Il.fromBufferAttribute(i,a),Ul.fromBufferAttribute(i,l),Ol.fromBufferAttribute(i,c),u.uv=rr.getInterpolation(kl,Ao,Ro,Co,Il,Ul,Ol,new Ge)),o&&(Il.fromBufferAttribute(o,a),Ul.fromBufferAttribute(o,l),Ol.fromBufferAttribute(o,c),u.uv1=rr.getInterpolation(kl,Ao,Ro,Co,Il,Ul,Ol,new Ge),u.uv2=u.uv1),s&&(Dv.fromBufferAttribute(s,a),Nv.fromBufferAttribute(s,l),Iv.fromBufferAttribute(s,c),u.normal=rr.getInterpolation(kl,Ao,Ro,Co,Dv,Nv,Iv,new K),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new K,materialIndex:0};rr.getNormal(Ao,Ro,Co,f.normal),u.face=f}return u}class Tr extends Ii{constructor(e=1,n=1,r=1,i=1,o=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:r,widthSegments:i,heightSegments:o,depthSegments:s};const a=this;i=Math.floor(i),o=Math.floor(o),s=Math.floor(s);const l=[],c=[],u=[],f=[];let h=0,v=0;_("z","y","x",-1,-1,r,n,e,s,o,0),_("z","y","x",1,-1,r,n,-e,s,o,1),_("x","z","y",1,1,e,r,n,i,s,2),_("x","z","y",1,-1,e,r,-n,i,s,3),_("x","y","z",1,-1,e,n,r,i,o,4),_("x","y","z",-1,-1,e,n,-r,i,o,5),this.setIndex(l),this.setAttribute("position",new Er(c,3)),this.setAttribute("normal",new Er(u,3)),this.setAttribute("uv",new Er(f,2));function _(y,p,d,m,g,x,w,A,T,C,E){const b=x/T,W=w/C,j=x/2,ne=w/2,N=A/2,q=T+1,ee=C+1;let J=0,G=0;const V=new K;for(let H=0;H<ee;H++){const D=H*W-ne;for(let L=0;L<q;L++){const Y=L*b-j;V[y]=Y*m,V[p]=D*g,V[d]=N,c.push(V.x,V.y,V.z),V[y]=0,V[p]=0,V[d]=A>0?1:-1,u.push(V.x,V.y,V.z),f.push(L/T),f.push(1-H/C),J+=1}}for(let H=0;H<C;H++)for(let D=0;D<T;D++){const L=h+D+q*H,Y=h+D+q*(H+1),Z=h+(D+1)+q*(H+1),se=h+(D+1)+q*H;l.push(L,Y,se),l.push(Y,Z,se),G+=6}a.addGroup(v,G,E),v+=G,h+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Tr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function vs(t){const e={};for(const n in t){e[n]={};for(const r in t[n]){const i=t[n][r];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][r]=null):e[n][r]=i.clone():Array.isArray(i)?e[n][r]=i.slice():e[n][r]=i}}return e}function ln(t){const e={};for(let n=0;n<t.length;n++){const r=vs(t[n]);for(const i in r)e[i]=r[i]}return e}function W2(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function aE(t){return t.getRenderTarget()===null?t.outputColorSpace:at.workingColorSpace}const $2={clone:vs,merge:ln};var j2=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,X2=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class co extends $a{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=j2,this.fragmentShader=X2,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=vs(e.uniforms),this.uniformsGroups=W2(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const i in this.uniforms){const s=this.uniforms[i].value;s&&s.isTexture?n.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?n.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?n.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?n.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?n.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?n.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?n.uniforms[i]={type:"m4",value:s.toArray()}:n.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const r={};for(const i in this.extensions)this.extensions[i]===!0&&(r[i]=!0);return Object.keys(r).length>0&&(n.extensions=r),n}}class lE extends Gt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ut,this.projectionMatrix=new Ut,this.projectionMatrixInverse=new Ut,this.coordinateSystem=zr}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class dn extends lE{constructor(e=50,n=1,r=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=i,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=ms*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(la*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ms*2*Math.atan(Math.tan(la*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,n,r,i,o,s){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=r,this.view.offsetY=i,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(la*.5*this.fov)/this.zoom,r=2*n,i=this.aspect*r,o=-.5*i;const s=this.view;if(this.view!==null&&this.view.enabled){const l=s.fullWidth,c=s.fullHeight;o+=s.offsetX*i/l,n-=s.offsetY*r/c,i*=s.width/l,r*=s.height/c}const a=this.filmOffset;a!==0&&(o+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+i,n,n-r,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Po=-90,Lo=1;class q2 extends Gt{constructor(e,n,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new dn(Po,Lo,e,n);i.layers=this.layers,this.add(i);const o=new dn(Po,Lo,e,n);o.layers=this.layers,this.add(o);const s=new dn(Po,Lo,e,n);s.layers=this.layers,this.add(s);const a=new dn(Po,Lo,e,n);a.layers=this.layers,this.add(a);const l=new dn(Po,Lo,e,n);l.layers=this.layers,this.add(l);const c=new dn(Po,Lo,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[r,i,o,s,a,l]=n;for(const c of n)this.remove(c);if(e===zr)r.up.set(0,1,0),r.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===tu)r.up.set(0,-1,0),r.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[o,s,a,l,c,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),v=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const y=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0,i),e.render(n,o),e.setRenderTarget(r,1,i),e.render(n,s),e.setRenderTarget(r,2,i),e.render(n,a),e.setRenderTarget(r,3,i),e.render(n,l),e.setRenderTarget(r,4,i),e.render(n,c),r.texture.generateMipmaps=y,e.setRenderTarget(r,5,i),e.render(n,u),e.setRenderTarget(f,h,v),e.xr.enabled=_,r.texture.needsPMREMUpdate=!0}}class cE extends Ln{constructor(e,n,r,i,o,s,a,l,c,u){e=e!==void 0?e:[],n=n!==void 0?n:fs,super(e,n,r,i,o,s,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Y2 extends lo{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},i=[r,r,r,r,r,r];n.encoding!==void 0&&(ua("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===to?jt:Vn),this.texture=new cE(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Hn}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Tr(5,5,5),o=new co({name:"CubemapFromEquirect",uniforms:vs(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:En,blending:wi});o.uniforms.tEquirect.value=n;const s=new ut(i,o),a=n.minFilter;return n.minFilter===Da&&(n.minFilter=Hn),new q2(1,10,this).update(e,s),n.minFilter=a,s.geometry.dispose(),s.material.dispose(),this}clear(e,n,r,i){const o=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(n,r,i);e.setRenderTarget(o)}}const ff=new K,K2=new K,Z2=new Ze;class ri{constructor(e=new K(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,r,i){return this.normal.set(e,n,r),this.constant=i,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,r){const i=ff.subVectors(r,n).cross(K2.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const r=e.delta(ff),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/i;return o<0||o>1?null:n.copy(e.start).addScaledVector(r,o)}intersectsLine(e){const n=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return n<0&&r>0||r<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const r=n||Z2.getNormalMatrix(e),i=this.coplanarPoint(ff).applyMatrix4(e),o=this.normal.applyMatrix3(r).normalize();return this.constant=-i.dot(o),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const zi=new ym,zl=new K;class Em{constructor(e=new ri,n=new ri,r=new ri,i=new ri,o=new ri,s=new ri){this.planes=[e,n,r,i,o,s]}set(e,n,r,i,o,s){const a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(r),a[3].copy(i),a[4].copy(o),a[5].copy(s),this}copy(e){const n=this.planes;for(let r=0;r<6;r++)n[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,n=zr){const r=this.planes,i=e.elements,o=i[0],s=i[1],a=i[2],l=i[3],c=i[4],u=i[5],f=i[6],h=i[7],v=i[8],_=i[9],y=i[10],p=i[11],d=i[12],m=i[13],g=i[14],x=i[15];if(r[0].setComponents(l-o,h-c,p-v,x-d).normalize(),r[1].setComponents(l+o,h+c,p+v,x+d).normalize(),r[2].setComponents(l+s,h+u,p+_,x+m).normalize(),r[3].setComponents(l-s,h-u,p-_,x-m).normalize(),r[4].setComponents(l-a,h-f,p-y,x-g).normalize(),n===zr)r[5].setComponents(l+a,h+f,p+y,x+g).normalize();else if(n===tu)r[5].setComponents(a,f,y,g).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),zi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),zi.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(zi)}intersectsSprite(e){return zi.center.set(0,0,0),zi.radius=.7071067811865476,zi.applyMatrix4(e.matrixWorld),this.intersectsSphere(zi)}intersectsSphere(e){const n=this.planes,r=e.center,i=-e.radius;for(let o=0;o<6;o++)if(n[o].distanceToPoint(r)<i)return!1;return!0}intersectsBox(e){const n=this.planes;for(let r=0;r<6;r++){const i=n[r];if(zl.x=i.normal.x>0?e.max.x:e.min.x,zl.y=i.normal.y>0?e.max.y:e.min.y,zl.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(zl)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let r=0;r<6;r++)if(n[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function uE(){let t=null,e=!1,n=null,r=null;function i(o,s){n(o,s),r=t.requestAnimationFrame(i)}return{start:function(){e!==!0&&n!==null&&(r=t.requestAnimationFrame(i),e=!0)},stop:function(){t.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(o){n=o},setContext:function(o){t=o}}}function J2(t,e){const n=e.isWebGL2,r=new WeakMap;function i(c,u){const f=c.array,h=c.usage,v=t.createBuffer();t.bindBuffer(u,v),t.bufferData(u,f,h),c.onUploadCallback();let _;if(f instanceof Float32Array)_=t.FLOAT;else if(f instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(n)_=t.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=t.UNSIGNED_SHORT;else if(f instanceof Int16Array)_=t.SHORT;else if(f instanceof Uint32Array)_=t.UNSIGNED_INT;else if(f instanceof Int32Array)_=t.INT;else if(f instanceof Int8Array)_=t.BYTE;else if(f instanceof Uint8Array)_=t.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)_=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:v,type:_,bytesPerElement:f.BYTES_PER_ELEMENT,version:c.version}}function o(c,u,f){const h=u.array,v=u.updateRange;t.bindBuffer(f,c),v.count===-1?t.bufferSubData(f,0,h):(n?t.bufferSubData(f,v.offset*h.BYTES_PER_ELEMENT,h,v.offset,v.count):t.bufferSubData(f,v.offset*h.BYTES_PER_ELEMENT,h.subarray(v.offset,v.offset+v.count)),v.count=-1),u.onUploadCallback()}function s(c){return c.isInterleavedBufferAttribute&&(c=c.data),r.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=r.get(c);u&&(t.deleteBuffer(u.buffer),r.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const h=r.get(c);(!h||h.version<c.version)&&r.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const f=r.get(c);f===void 0?r.set(c,i(c,u)):f.version<c.version&&(o(f.buffer,c,u),f.version=c.version)}return{get:s,remove:a,update:l}}class wr extends Ii{constructor(e=1,n=1,r=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:r,heightSegments:i};const o=e/2,s=n/2,a=Math.floor(r),l=Math.floor(i),c=a+1,u=l+1,f=e/a,h=n/l,v=[],_=[],y=[],p=[];for(let d=0;d<u;d++){const m=d*h-s;for(let g=0;g<c;g++){const x=g*f-o;_.push(x,-m,0),y.push(0,0,1),p.push(g/a),p.push(1-d/l)}}for(let d=0;d<l;d++)for(let m=0;m<a;m++){const g=m+c*d,x=m+c*(d+1),w=m+1+c*(d+1),A=m+1+c*d;v.push(g,x,A),v.push(x,w,A)}this.setIndex(v),this.setAttribute("position",new Er(_,3)),this.setAttribute("normal",new Er(y,3)),this.setAttribute("uv",new Er(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wr(e.width,e.height,e.widthSegments,e.heightSegments)}}var Q2=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,eL=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,tL=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,nL=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rL=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,iL=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,oL=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,sL=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,aL=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,lL=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,cL=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,uL=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,dL=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,fL=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,hL=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,pL=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,mL=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,gL=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,vL=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,_L=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,yL=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,xL=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,SL=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,EL=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,wL=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ML=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,TL=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,bL=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,AL="gl_FragColor = linearToOutputTexel( gl_FragColor );",RL=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,CL=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,PL=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,LL=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,DL=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,NL=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,IL=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,UL=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,OL=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,kL=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,FL=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,BL=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,zL=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,HL=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,VL=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,GL=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,WL=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,$L=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,jL=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,XL=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,qL=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,YL=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	anisotropyV /= material.anisotropy;
	material.anisotropy = saturate( material.anisotropy );
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x - tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x + tbn[ 0 ] * anisotropyV.y;
#endif`,KL=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ZL=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,JL=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,QL=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,eD=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,tD=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nD=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,rD=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,iD=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,oD=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,sD=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,aD=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,lD=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,cD=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,uD=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,dD=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,fD=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,hD=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,pD=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,mD=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,gD=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vD=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_D=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,yD=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,xD=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,SD=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ED=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,wD=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,MD=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,TD=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,bD=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,AD=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,RD=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,CD=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,PD=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,LD=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,DD=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,ND=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ID=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,UD=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,OD=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,kD=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,FD=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,BD=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,zD=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,HD=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,VD=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,GD=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,WD=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,$D=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,jD=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,XD=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,qD=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,YD=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const KD=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ZD=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,JD=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,QD=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,e3=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,t3=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,n3=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,r3=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,i3=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,o3=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,s3=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,a3=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,l3=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,c3=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,u3=`#include <common>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,d3=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,f3=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,h3=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,p3=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,m3=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,g3=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,v3=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,_3=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,y3=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,x3=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,S3=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,E3=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,w3=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,M3=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,T3=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,b3=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,A3=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,R3=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,C3=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,qe={alphahash_fragment:Q2,alphahash_pars_fragment:eL,alphamap_fragment:tL,alphamap_pars_fragment:nL,alphatest_fragment:rL,alphatest_pars_fragment:iL,aomap_fragment:oL,aomap_pars_fragment:sL,begin_vertex:aL,beginnormal_vertex:lL,bsdfs:cL,iridescence_fragment:uL,bumpmap_pars_fragment:dL,clipping_planes_fragment:fL,clipping_planes_pars_fragment:hL,clipping_planes_pars_vertex:pL,clipping_planes_vertex:mL,color_fragment:gL,color_pars_fragment:vL,color_pars_vertex:_L,color_vertex:yL,common:xL,cube_uv_reflection_fragment:SL,defaultnormal_vertex:EL,displacementmap_pars_vertex:wL,displacementmap_vertex:ML,emissivemap_fragment:TL,emissivemap_pars_fragment:bL,colorspace_fragment:AL,colorspace_pars_fragment:RL,envmap_fragment:CL,envmap_common_pars_fragment:PL,envmap_pars_fragment:LL,envmap_pars_vertex:DL,envmap_physical_pars_fragment:WL,envmap_vertex:NL,fog_vertex:IL,fog_pars_vertex:UL,fog_fragment:OL,fog_pars_fragment:kL,gradientmap_pars_fragment:FL,lightmap_fragment:BL,lightmap_pars_fragment:zL,lights_lambert_fragment:HL,lights_lambert_pars_fragment:VL,lights_pars_begin:GL,lights_toon_fragment:$L,lights_toon_pars_fragment:jL,lights_phong_fragment:XL,lights_phong_pars_fragment:qL,lights_physical_fragment:YL,lights_physical_pars_fragment:KL,lights_fragment_begin:ZL,lights_fragment_maps:JL,lights_fragment_end:QL,logdepthbuf_fragment:eD,logdepthbuf_pars_fragment:tD,logdepthbuf_pars_vertex:nD,logdepthbuf_vertex:rD,map_fragment:iD,map_pars_fragment:oD,map_particle_fragment:sD,map_particle_pars_fragment:aD,metalnessmap_fragment:lD,metalnessmap_pars_fragment:cD,morphcolor_vertex:uD,morphnormal_vertex:dD,morphtarget_pars_vertex:fD,morphtarget_vertex:hD,normal_fragment_begin:pD,normal_fragment_maps:mD,normal_pars_fragment:gD,normal_pars_vertex:vD,normal_vertex:_D,normalmap_pars_fragment:yD,clearcoat_normal_fragment_begin:xD,clearcoat_normal_fragment_maps:SD,clearcoat_pars_fragment:ED,iridescence_pars_fragment:wD,opaque_fragment:MD,packing:TD,premultiplied_alpha_fragment:bD,project_vertex:AD,dithering_fragment:RD,dithering_pars_fragment:CD,roughnessmap_fragment:PD,roughnessmap_pars_fragment:LD,shadowmap_pars_fragment:DD,shadowmap_pars_vertex:ND,shadowmap_vertex:ID,shadowmask_pars_fragment:UD,skinbase_vertex:OD,skinning_pars_vertex:kD,skinning_vertex:FD,skinnormal_vertex:BD,specularmap_fragment:zD,specularmap_pars_fragment:HD,tonemapping_fragment:VD,tonemapping_pars_fragment:GD,transmission_fragment:WD,transmission_pars_fragment:$D,uv_pars_fragment:jD,uv_pars_vertex:XD,uv_vertex:qD,worldpos_vertex:YD,background_vert:KD,background_frag:ZD,backgroundCube_vert:JD,backgroundCube_frag:QD,cube_vert:e3,cube_frag:t3,depth_vert:n3,depth_frag:r3,distanceRGBA_vert:i3,distanceRGBA_frag:o3,equirect_vert:s3,equirect_frag:a3,linedashed_vert:l3,linedashed_frag:c3,meshbasic_vert:u3,meshbasic_frag:d3,meshlambert_vert:f3,meshlambert_frag:h3,meshmatcap_vert:p3,meshmatcap_frag:m3,meshnormal_vert:g3,meshnormal_frag:v3,meshphong_vert:_3,meshphong_frag:y3,meshphysical_vert:x3,meshphysical_frag:S3,meshtoon_vert:E3,meshtoon_frag:w3,points_vert:M3,points_frag:T3,shadow_vert:b3,shadow_frag:A3,sprite_vert:R3,sprite_frag:C3},ye={common:{diffuse:{value:new nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ze}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ze},normalScale:{value:new Ge(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0},uvTransform:{value:new Ze}},sprite:{diffuse:{value:new nt(16777215)},opacity:{value:1},center:{value:new Ge(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}}},gr={basic:{uniforms:ln([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:qe.meshbasic_vert,fragmentShader:qe.meshbasic_frag},lambert:{uniforms:ln([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new nt(0)}}]),vertexShader:qe.meshlambert_vert,fragmentShader:qe.meshlambert_frag},phong:{uniforms:ln([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new nt(0)},specular:{value:new nt(1118481)},shininess:{value:30}}]),vertexShader:qe.meshphong_vert,fragmentShader:qe.meshphong_frag},standard:{uniforms:ln([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag},toon:{uniforms:ln([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new nt(0)}}]),vertexShader:qe.meshtoon_vert,fragmentShader:qe.meshtoon_frag},matcap:{uniforms:ln([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:qe.meshmatcap_vert,fragmentShader:qe.meshmatcap_frag},points:{uniforms:ln([ye.points,ye.fog]),vertexShader:qe.points_vert,fragmentShader:qe.points_frag},dashed:{uniforms:ln([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qe.linedashed_vert,fragmentShader:qe.linedashed_frag},depth:{uniforms:ln([ye.common,ye.displacementmap]),vertexShader:qe.depth_vert,fragmentShader:qe.depth_frag},normal:{uniforms:ln([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:qe.meshnormal_vert,fragmentShader:qe.meshnormal_frag},sprite:{uniforms:ln([ye.sprite,ye.fog]),vertexShader:qe.sprite_vert,fragmentShader:qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qe.background_vert,fragmentShader:qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:qe.backgroundCube_vert,fragmentShader:qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qe.cube_vert,fragmentShader:qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qe.equirect_vert,fragmentShader:qe.equirect_frag},distanceRGBA:{uniforms:ln([ye.common,ye.displacementmap,{referencePosition:{value:new K},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qe.distanceRGBA_vert,fragmentShader:qe.distanceRGBA_frag},shadow:{uniforms:ln([ye.lights,ye.fog,{color:{value:new nt(0)},opacity:{value:1}}]),vertexShader:qe.shadow_vert,fragmentShader:qe.shadow_frag}};gr.physical={uniforms:ln([gr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ze},clearcoatNormalScale:{value:new Ge(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ze},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ze},sheen:{value:0},sheenColor:{value:new nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ze},transmissionSamplerSize:{value:new Ge},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ze},attenuationDistance:{value:0},attenuationColor:{value:new nt(0)},specularColor:{value:new nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ze},anisotropyVector:{value:new Ge},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ze}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag};const Hl={r:0,b:0,g:0};function P3(t,e,n,r,i,o,s){const a=new nt(0);let l=o===!0?0:1,c,u,f=null,h=0,v=null;function _(p,d){let m=!1,g=d.isScene===!0?d.background:null;g&&g.isTexture&&(g=(d.backgroundBlurriness>0?n:e).get(g)),g===null?y(a,l):g&&g.isColor&&(y(g,1),m=!0);const x=t.xr.getEnvironmentBlendMode();x==="additive"?r.buffers.color.setClear(0,0,0,1,s):x==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,s),(t.autoClear||m)&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),g&&(g.isCubeTexture||g.mapping===Ku)?(u===void 0&&(u=new ut(new Tr(1,1,1),new co({name:"BackgroundCubeMaterial",uniforms:vs(gr.backgroundCube.uniforms),vertexShader:gr.backgroundCube.vertexShader,fragmentShader:gr.backgroundCube.fragmentShader,side:En,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,A,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),u.material.uniforms.envMap.value=g,u.material.uniforms.flipEnvMap.value=g.isCubeTexture&&g.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=d.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,u.material.toneMapped=at.getTransfer(g.colorSpace)!==pt,(f!==g||h!==g.version||v!==t.toneMapping)&&(u.material.needsUpdate=!0,f=g,h=g.version,v=t.toneMapping),u.layers.enableAll(),p.unshift(u,u.geometry,u.material,0,0,null)):g&&g.isTexture&&(c===void 0&&(c=new ut(new wr(2,2),new co({name:"BackgroundMaterial",uniforms:vs(gr.background.uniforms),vertexShader:gr.background.vertexShader,fragmentShader:gr.background.fragmentShader,side:Ri,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=g,c.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,c.material.toneMapped=at.getTransfer(g.colorSpace)!==pt,g.matrixAutoUpdate===!0&&g.updateMatrix(),c.material.uniforms.uvTransform.value.copy(g.matrix),(f!==g||h!==g.version||v!==t.toneMapping)&&(c.material.needsUpdate=!0,f=g,h=g.version,v=t.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function y(p,d){p.getRGB(Hl,aE(t)),r.buffers.color.setClear(Hl.r,Hl.g,Hl.b,d,s)}return{getClearColor:function(){return a},setClearColor:function(p,d=1){a.set(p),l=d,y(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,y(a,l)},render:_}}function L3(t,e,n,r){const i=t.getParameter(t.MAX_VERTEX_ATTRIBS),o=r.isWebGL2?null:e.get("OES_vertex_array_object"),s=r.isWebGL2||o!==null,a={},l=p(null);let c=l,u=!1;function f(N,q,ee,J,G){let V=!1;if(s){const H=y(J,ee,q);c!==H&&(c=H,v(c.object)),V=d(N,J,ee,G),V&&m(N,J,ee,G)}else{const H=q.wireframe===!0;(c.geometry!==J.id||c.program!==ee.id||c.wireframe!==H)&&(c.geometry=J.id,c.program=ee.id,c.wireframe=H,V=!0)}G!==null&&n.update(G,t.ELEMENT_ARRAY_BUFFER),(V||u)&&(u=!1,C(N,q,ee,J),G!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,n.get(G).buffer))}function h(){return r.isWebGL2?t.createVertexArray():o.createVertexArrayOES()}function v(N){return r.isWebGL2?t.bindVertexArray(N):o.bindVertexArrayOES(N)}function _(N){return r.isWebGL2?t.deleteVertexArray(N):o.deleteVertexArrayOES(N)}function y(N,q,ee){const J=ee.wireframe===!0;let G=a[N.id];G===void 0&&(G={},a[N.id]=G);let V=G[q.id];V===void 0&&(V={},G[q.id]=V);let H=V[J];return H===void 0&&(H=p(h()),V[J]=H),H}function p(N){const q=[],ee=[],J=[];for(let G=0;G<i;G++)q[G]=0,ee[G]=0,J[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:q,enabledAttributes:ee,attributeDivisors:J,object:N,attributes:{},index:null}}function d(N,q,ee,J){const G=c.attributes,V=q.attributes;let H=0;const D=ee.getAttributes();for(const L in D)if(D[L].location>=0){const Z=G[L];let se=V[L];if(se===void 0&&(L==="instanceMatrix"&&N.instanceMatrix&&(se=N.instanceMatrix),L==="instanceColor"&&N.instanceColor&&(se=N.instanceColor)),Z===void 0||Z.attribute!==se||se&&Z.data!==se.data)return!0;H++}return c.attributesNum!==H||c.index!==J}function m(N,q,ee,J){const G={},V=q.attributes;let H=0;const D=ee.getAttributes();for(const L in D)if(D[L].location>=0){let Z=V[L];Z===void 0&&(L==="instanceMatrix"&&N.instanceMatrix&&(Z=N.instanceMatrix),L==="instanceColor"&&N.instanceColor&&(Z=N.instanceColor));const se={};se.attribute=Z,Z&&Z.data&&(se.data=Z.data),G[L]=se,H++}c.attributes=G,c.attributesNum=H,c.index=J}function g(){const N=c.newAttributes;for(let q=0,ee=N.length;q<ee;q++)N[q]=0}function x(N){w(N,0)}function w(N,q){const ee=c.newAttributes,J=c.enabledAttributes,G=c.attributeDivisors;ee[N]=1,J[N]===0&&(t.enableVertexAttribArray(N),J[N]=1),G[N]!==q&&((r.isWebGL2?t:e.get("ANGLE_instanced_arrays"))[r.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](N,q),G[N]=q)}function A(){const N=c.newAttributes,q=c.enabledAttributes;for(let ee=0,J=q.length;ee<J;ee++)q[ee]!==N[ee]&&(t.disableVertexAttribArray(ee),q[ee]=0)}function T(N,q,ee,J,G,V,H){H===!0?t.vertexAttribIPointer(N,q,ee,G,V):t.vertexAttribPointer(N,q,ee,J,G,V)}function C(N,q,ee,J){if(r.isWebGL2===!1&&(N.isInstancedMesh||J.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;g();const G=J.attributes,V=ee.getAttributes(),H=q.defaultAttributeValues;for(const D in V){const L=V[D];if(L.location>=0){let Y=G[D];if(Y===void 0&&(D==="instanceMatrix"&&N.instanceMatrix&&(Y=N.instanceMatrix),D==="instanceColor"&&N.instanceColor&&(Y=N.instanceColor)),Y!==void 0){const Z=Y.normalized,se=Y.itemSize,B=n.get(Y);if(B===void 0)continue;const xe=B.buffer,oe=B.type,Te=B.bytesPerElement,De=r.isWebGL2===!0&&(oe===t.INT||oe===t.UNSIGNED_INT||Y.gpuType===$S);if(Y.isInterleavedBufferAttribute){const Ee=Y.data,z=Ee.stride,rt=Y.offset;if(Ee.isInstancedInterleavedBuffer){for(let we=0;we<L.locationSize;we++)w(L.location+we,Ee.meshPerAttribute);N.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=Ee.meshPerAttribute*Ee.count)}else for(let we=0;we<L.locationSize;we++)x(L.location+we);t.bindBuffer(t.ARRAY_BUFFER,xe);for(let we=0;we<L.locationSize;we++)T(L.location+we,se/L.locationSize,oe,Z,z*Te,(rt+se/L.locationSize*we)*Te,De)}else{if(Y.isInstancedBufferAttribute){for(let Ee=0;Ee<L.locationSize;Ee++)w(L.location+Ee,Y.meshPerAttribute);N.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let Ee=0;Ee<L.locationSize;Ee++)x(L.location+Ee);t.bindBuffer(t.ARRAY_BUFFER,xe);for(let Ee=0;Ee<L.locationSize;Ee++)T(L.location+Ee,se/L.locationSize,oe,Z,se*Te,se/L.locationSize*Ee*Te,De)}}else if(H!==void 0){const Z=H[D];if(Z!==void 0)switch(Z.length){case 2:t.vertexAttrib2fv(L.location,Z);break;case 3:t.vertexAttrib3fv(L.location,Z);break;case 4:t.vertexAttrib4fv(L.location,Z);break;default:t.vertexAttrib1fv(L.location,Z)}}}}A()}function E(){j();for(const N in a){const q=a[N];for(const ee in q){const J=q[ee];for(const G in J)_(J[G].object),delete J[G];delete q[ee]}delete a[N]}}function b(N){if(a[N.id]===void 0)return;const q=a[N.id];for(const ee in q){const J=q[ee];for(const G in J)_(J[G].object),delete J[G];delete q[ee]}delete a[N.id]}function W(N){for(const q in a){const ee=a[q];if(ee[N.id]===void 0)continue;const J=ee[N.id];for(const G in J)_(J[G].object),delete J[G];delete ee[N.id]}}function j(){ne(),u=!0,c!==l&&(c=l,v(c.object))}function ne(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:f,reset:j,resetDefaultState:ne,dispose:E,releaseStatesOfGeometry:b,releaseStatesOfProgram:W,initAttributes:g,enableAttribute:x,disableUnusedAttributes:A}}function D3(t,e,n,r){const i=r.isWebGL2;let o;function s(c){o=c}function a(c,u){t.drawArrays(o,c,u),n.update(u,o,1)}function l(c,u,f){if(f===0)return;let h,v;if(i)h=t,v="drawArraysInstanced";else if(h=e.get("ANGLE_instanced_arrays"),v="drawArraysInstancedANGLE",h===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}h[v](o,c,u,f),n.update(u,o,f)}this.setMode=s,this.render=a,this.renderInstances=l}function N3(t,e,n){let r;function i(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(T){if(T==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const s=typeof WebGL2RenderingContext<"u"&&t.constructor.name==="WebGL2RenderingContext";let a=n.precision!==void 0?n.precision:"highp";const l=o(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=s||e.has("WEBGL_draw_buffers"),u=n.logarithmicDepthBuffer===!0,f=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),h=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=t.getParameter(t.MAX_TEXTURE_SIZE),_=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),y=t.getParameter(t.MAX_VERTEX_ATTRIBS),p=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),d=t.getParameter(t.MAX_VARYING_VECTORS),m=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),g=h>0,x=s||e.has("OES_texture_float"),w=g&&x,A=s?t.getParameter(t.MAX_SAMPLES):0;return{isWebGL2:s,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:o,precision:a,logarithmicDepthBuffer:u,maxTextures:f,maxVertexTextures:h,maxTextureSize:v,maxCubemapSize:_,maxAttributes:y,maxVertexUniforms:p,maxVaryings:d,maxFragmentUniforms:m,vertexTextures:g,floatFragmentTextures:x,floatVertexTextures:w,maxSamples:A}}function I3(t){const e=this;let n=null,r=0,i=!1,o=!1;const s=new ri,a=new Ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const v=f.length!==0||h||r!==0||i;return i=h,r=f.length,v},this.beginShadows=function(){o=!0,u(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(f,h){n=u(f,h,0)},this.setState=function(f,h,v){const _=f.clippingPlanes,y=f.clipIntersection,p=f.clipShadows,d=t.get(f);if(!i||_===null||_.length===0||o&&!p)o?u(null):c();else{const m=o?0:r,g=m*4;let x=d.clippingState||null;l.value=x,x=u(_,h,g,v);for(let w=0;w!==g;++w)x[w]=n[w];d.clippingState=x,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=m}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function u(f,h,v,_){const y=f!==null?f.length:0;let p=null;if(y!==0){if(p=l.value,_!==!0||p===null){const d=v+y*4,m=h.matrixWorldInverse;a.getNormalMatrix(m),(p===null||p.length<d)&&(p=new Float32Array(d));for(let g=0,x=v;g!==y;++g,x+=4)s.copy(f[g]).applyMatrix4(m,a),s.normal.toArray(p,x),p[x+3]=s.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,p}}function U3(t){let e=new WeakMap;function n(s,a){return a===zh?s.mapping=fs:a===Hh&&(s.mapping=hs),s}function r(s){if(s&&s.isTexture&&s.isRenderTargetTexture===!1){const a=s.mapping;if(a===zh||a===Hh)if(e.has(s)){const l=e.get(s).texture;return n(l,s.mapping)}else{const l=s.image;if(l&&l.height>0){const c=new Y2(l.height/2);return c.fromEquirectangularTexture(t,s),e.set(s,c),s.addEventListener("dispose",i),n(c.texture,s.mapping)}else return null}}return s}function i(s){const a=s.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function o(){e=new WeakMap}return{get:r,dispose:o}}class dE extends lE{constructor(e=-1,n=1,r=1,i=-1,o=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=r,this.bottom=i,this.near=o,this.far=s,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,r,i,o,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=r,this.view.offsetY=i,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let o=r-e,s=r+e,a=i+n,l=i-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=c*this.view.offsetX,s=o+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(o,s,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const Xo=4,Uv=[.125,.215,.35,.446,.526,.582],ji=20,hf=new dE,Ov=new nt;let pf=null,mf=0,gf=0;const Wi=(1+Math.sqrt(5))/2,Do=1/Wi,kv=[new K(1,1,1),new K(-1,1,1),new K(1,1,-1),new K(-1,1,-1),new K(0,Wi,Do),new K(0,Wi,-Do),new K(Do,0,Wi),new K(-Do,0,Wi),new K(Wi,Do,0),new K(-Wi,Do,0)];class Fv{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,r=.1,i=100){pf=this._renderer.getRenderTarget(),mf=this._renderer.getActiveCubeFace(),gf=this._renderer.getActiveMipmapLevel(),this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,r,i,o),n>0&&this._blur(o,0,0,n),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Hv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=zv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(pf,mf,gf),e.scissorTest=!1,Vl(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===fs||e.mapping===hs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),pf=this._renderer.getRenderTarget(),mf=this._renderer.getActiveCubeFace(),gf=this._renderer.getActiveMipmapLevel();const r=n||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,r={magFilter:Hn,minFilter:Hn,generateMipmaps:!1,type:Na,format:or,colorSpace:jr,depthBuffer:!1},i=Bv(e,n,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Bv(e,n,r);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=O3(o)),this._blurMaterial=k3(o,e,n)}return i}_compileMaterial(e){const n=new ut(this._lodPlanes[0],e);this._renderer.compile(n,hf)}_sceneToCubeUV(e,n,r,i){const a=new dn(90,1,n,r),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,h=u.toneMapping;u.getClearColor(Ov),u.toneMapping=Mi,u.autoClear=!1;const v=new iE({name:"PMREM.Background",side:En,depthWrite:!1,depthTest:!1}),_=new ut(new Tr,v);let y=!1;const p=e.background;p?p.isColor&&(v.color.copy(p),e.background=null,y=!0):(v.color.copy(Ov),y=!0);for(let d=0;d<6;d++){const m=d%3;m===0?(a.up.set(0,l[d],0),a.lookAt(c[d],0,0)):m===1?(a.up.set(0,0,l[d]),a.lookAt(0,c[d],0)):(a.up.set(0,l[d],0),a.lookAt(0,0,c[d]));const g=this._cubeSize;Vl(i,m*g,d>2?g:0,g,g),u.setRenderTarget(i),y&&u.render(_,a),u.render(e,a)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=h,u.autoClear=f,e.background=p}_textureToCubeUV(e,n){const r=this._renderer,i=e.mapping===fs||e.mapping===hs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Hv()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=zv());const o=i?this._cubemapMaterial:this._equirectMaterial,s=new ut(this._lodPlanes[0],o),a=o.uniforms;a.envMap.value=e;const l=this._cubeSize;Vl(n,0,0,3*l,2*l),r.setRenderTarget(n),r.render(s,hf)}_applyPMREM(e){const n=this._renderer,r=n.autoClear;n.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const o=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),s=kv[(i-1)%kv.length];this._blur(e,i-1,i,o,s)}n.autoClear=r}_blur(e,n,r,i,o){const s=this._pingPongRenderTarget;this._halfBlur(e,s,n,r,i,"latitudinal",o),this._halfBlur(s,e,r,r,i,"longitudinal",o)}_halfBlur(e,n,r,i,o,s,a){const l=this._renderer,c=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new ut(this._lodPlanes[i],c),h=c.uniforms,v=this._sizeLods[r]-1,_=isFinite(o)?Math.PI/(2*v):2*Math.PI/(2*ji-1),y=o/_,p=isFinite(o)?1+Math.floor(u*y):ji;p>ji&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ji}`);const d=[];let m=0;for(let T=0;T<ji;++T){const C=T/y,E=Math.exp(-C*C/2);d.push(E),T===0?m+=E:T<p&&(m+=2*E)}for(let T=0;T<d.length;T++)d[T]=d[T]/m;h.envMap.value=e.texture,h.samples.value=p,h.weights.value=d,h.latitudinal.value=s==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:g}=this;h.dTheta.value=_,h.mipInt.value=g-r;const x=this._sizeLods[i],w=3*x*(i>g-Xo?i-g+Xo:0),A=4*(this._cubeSize-x);Vl(n,w,A,3*x,2*x),l.setRenderTarget(n),l.render(f,hf)}}function O3(t){const e=[],n=[],r=[];let i=t;const o=t-Xo+1+Uv.length;for(let s=0;s<o;s++){const a=Math.pow(2,i);n.push(a);let l=1/a;s>t-Xo?l=Uv[s-t+Xo-1]:s===0&&(l=0),r.push(l);const c=1/(a-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],v=6,_=6,y=3,p=2,d=1,m=new Float32Array(y*_*v),g=new Float32Array(p*_*v),x=new Float32Array(d*_*v);for(let A=0;A<v;A++){const T=A%3*2/3-1,C=A>2?0:-1,E=[T,C,0,T+2/3,C,0,T+2/3,C+1,0,T,C,0,T+2/3,C+1,0,T,C+1,0];m.set(E,y*_*A),g.set(h,p*_*A);const b=[A,A,A,A,A,A];x.set(b,d*_*A)}const w=new Ii;w.setAttribute("position",new Sr(m,y)),w.setAttribute("uv",new Sr(g,p)),w.setAttribute("faceIndex",new Sr(x,d)),e.push(w),i>Xo&&i--}return{lodPlanes:e,sizeLods:n,sigmas:r}}function Bv(t,e,n){const r=new lo(t,e,n);return r.texture.mapping=Ku,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function Vl(t,e,n,r,i){t.viewport.set(e,n,r,i),t.scissor.set(e,n,r,i)}function k3(t,e,n){const r=new Float32Array(ji),i=new K(0,1,0);return new co({name:"SphericalGaussianBlur",defines:{n:ji,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:wm(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function zv(){return new co({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:wm(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function Hv(){return new co({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:wm(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function wm(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function F3(t){let e=new WeakMap,n=null;function r(a){if(a&&a.isTexture){const l=a.mapping,c=l===zh||l===Hh,u=l===fs||l===hs;if(c||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let f=e.get(a);return n===null&&(n=new Fv(t)),f=c?n.fromEquirectangular(a,f):n.fromCubemap(a,f),e.set(a,f),f.texture}else{if(e.has(a))return e.get(a).texture;{const f=a.image;if(c&&f&&f.height>0||u&&f&&i(f)){n===null&&(n=new Fv(t));const h=c?n.fromEquirectangular(a):n.fromCubemap(a);return e.set(a,h),a.addEventListener("dispose",o),h.texture}else return null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function o(a){const l=a.target;l.removeEventListener("dispose",o);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function s(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:s}}function B3(t){const e={};function n(r){if(e[r]!==void 0)return e[r];let i;switch(r){case"WEBGL_depth_texture":i=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=t.getExtension(r)}return e[r]=i,i}return{has:function(r){return n(r)!==null},init:function(r){r.isWebGL2?n("EXT_color_buffer_float"):(n("WEBGL_depth_texture"),n("OES_texture_float"),n("OES_texture_half_float"),n("OES_texture_half_float_linear"),n("OES_standard_derivatives"),n("OES_element_index_uint"),n("OES_vertex_array_object"),n("ANGLE_instanced_arrays")),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture")},get:function(r){const i=n(r);return i===null&&console.warn("THREE.WebGLRenderer: "+r+" extension not supported."),i}}}function z3(t,e,n,r){const i={},o=new WeakMap;function s(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const _ in h.attributes)e.remove(h.attributes[_]);for(const _ in h.morphAttributes){const y=h.morphAttributes[_];for(let p=0,d=y.length;p<d;p++)e.remove(y[p])}h.removeEventListener("dispose",s),delete i[h.id];const v=o.get(h);v&&(e.remove(v),o.delete(h)),r.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,n.memory.geometries--}function a(f,h){return i[h.id]===!0||(h.addEventListener("dispose",s),i[h.id]=!0,n.memory.geometries++),h}function l(f){const h=f.attributes;for(const _ in h)e.update(h[_],t.ARRAY_BUFFER);const v=f.morphAttributes;for(const _ in v){const y=v[_];for(let p=0,d=y.length;p<d;p++)e.update(y[p],t.ARRAY_BUFFER)}}function c(f){const h=[],v=f.index,_=f.attributes.position;let y=0;if(v!==null){const m=v.array;y=v.version;for(let g=0,x=m.length;g<x;g+=3){const w=m[g+0],A=m[g+1],T=m[g+2];h.push(w,A,A,T,T,w)}}else if(_!==void 0){const m=_.array;y=_.version;for(let g=0,x=m.length/3-1;g<x;g+=3){const w=g+0,A=g+1,T=g+2;h.push(w,A,A,T,T,w)}}else return;const p=new(QS(h)?sE:oE)(h,1);p.version=y;const d=o.get(f);d&&e.remove(d),o.set(f,p)}function u(f){const h=o.get(f);if(h){const v=f.index;v!==null&&h.version<v.version&&c(f)}else c(f);return o.get(f)}return{get:a,update:l,getWireframeAttribute:u}}function H3(t,e,n,r){const i=r.isWebGL2;let o;function s(h){o=h}let a,l;function c(h){a=h.type,l=h.bytesPerElement}function u(h,v){t.drawElements(o,v,a,h*l),n.update(v,o,1)}function f(h,v,_){if(_===0)return;let y,p;if(i)y=t,p="drawElementsInstanced";else if(y=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",y===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}y[p](o,v,a,h*l,_),n.update(v,o,_)}this.setMode=s,this.setIndex=c,this.render=u,this.renderInstances=f}function V3(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(o,s,a){switch(n.calls++,s){case t.TRIANGLES:n.triangles+=a*(o/3);break;case t.LINES:n.lines+=a*(o/2);break;case t.LINE_STRIP:n.lines+=a*(o-1);break;case t.LINE_LOOP:n.lines+=a*o;break;case t.POINTS:n.points+=a*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:i,update:r}}function G3(t,e){return t[0]-e[0]}function W3(t,e){return Math.abs(e[1])-Math.abs(t[1])}function $3(t,e,n){const r={},i=new Float32Array(8),o=new WeakMap,s=new Ht,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,u,f){const h=c.morphTargetInfluences;if(e.isWebGL2===!0){const _=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,y=_!==void 0?_.length:0;let p=o.get(u);if(p===void 0||p.count!==y){let q=function(){ne.dispose(),o.delete(u),u.removeEventListener("dispose",q)};var v=q;p!==void 0&&p.texture.dispose();const g=u.morphAttributes.position!==void 0,x=u.morphAttributes.normal!==void 0,w=u.morphAttributes.color!==void 0,A=u.morphAttributes.position||[],T=u.morphAttributes.normal||[],C=u.morphAttributes.color||[];let E=0;g===!0&&(E=1),x===!0&&(E=2),w===!0&&(E=3);let b=u.attributes.position.count*E,W=1;b>e.maxTextureSize&&(W=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const j=new Float32Array(b*W*4*y),ne=new nE(j,b,W,y);ne.type=di,ne.needsUpdate=!0;const N=E*4;for(let ee=0;ee<y;ee++){const J=A[ee],G=T[ee],V=C[ee],H=b*W*4*ee;for(let D=0;D<J.count;D++){const L=D*N;g===!0&&(s.fromBufferAttribute(J,D),j[H+L+0]=s.x,j[H+L+1]=s.y,j[H+L+2]=s.z,j[H+L+3]=0),x===!0&&(s.fromBufferAttribute(G,D),j[H+L+4]=s.x,j[H+L+5]=s.y,j[H+L+6]=s.z,j[H+L+7]=0),w===!0&&(s.fromBufferAttribute(V,D),j[H+L+8]=s.x,j[H+L+9]=s.y,j[H+L+10]=s.z,j[H+L+11]=V.itemSize===4?s.w:1)}}p={count:y,texture:ne,size:new Ge(b,W)},o.set(u,p),u.addEventListener("dispose",q)}let d=0;for(let g=0;g<h.length;g++)d+=h[g];const m=u.morphTargetsRelative?1:1-d;f.getUniforms().setValue(t,"morphTargetBaseInfluence",m),f.getUniforms().setValue(t,"morphTargetInfluences",h),f.getUniforms().setValue(t,"morphTargetsTexture",p.texture,n),f.getUniforms().setValue(t,"morphTargetsTextureSize",p.size)}else{const _=h===void 0?0:h.length;let y=r[u.id];if(y===void 0||y.length!==_){y=[];for(let x=0;x<_;x++)y[x]=[x,0];r[u.id]=y}for(let x=0;x<_;x++){const w=y[x];w[0]=x,w[1]=h[x]}y.sort(W3);for(let x=0;x<8;x++)x<_&&y[x][1]?(a[x][0]=y[x][0],a[x][1]=y[x][1]):(a[x][0]=Number.MAX_SAFE_INTEGER,a[x][1]=0);a.sort(G3);const p=u.morphAttributes.position,d=u.morphAttributes.normal;let m=0;for(let x=0;x<8;x++){const w=a[x],A=w[0],T=w[1];A!==Number.MAX_SAFE_INTEGER&&T?(p&&u.getAttribute("morphTarget"+x)!==p[A]&&u.setAttribute("morphTarget"+x,p[A]),d&&u.getAttribute("morphNormal"+x)!==d[A]&&u.setAttribute("morphNormal"+x,d[A]),i[x]=T,m+=T):(p&&u.hasAttribute("morphTarget"+x)===!0&&u.deleteAttribute("morphTarget"+x),d&&u.hasAttribute("morphNormal"+x)===!0&&u.deleteAttribute("morphNormal"+x),i[x]=0)}const g=u.morphTargetsRelative?1:1-m;f.getUniforms().setValue(t,"morphTargetBaseInfluence",g),f.getUniforms().setValue(t,"morphTargetInfluences",i)}}return{update:l}}function j3(t,e,n,r){let i=new WeakMap;function o(l){const c=r.render.frame,u=l.geometry,f=e.get(l,u);if(i.get(f)!==c&&(e.update(f),i.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;i.get(h)!==c&&(h.update(),i.set(h,c))}return f}function s(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:o,dispose:s}}const fE=new Ln,hE=new nE,pE=new D2,mE=new cE,Vv=[],Gv=[],Wv=new Float32Array(16),$v=new Float32Array(9),jv=new Float32Array(4);function Rs(t,e,n){const r=t[0];if(r<=0||r>0)return t;const i=e*n;let o=Vv[i];if(o===void 0&&(o=new Float32Array(i),Vv[i]=o),e!==0){r.toArray(o,0);for(let s=1,a=0;s!==e;++s)a+=n,t[s].toArray(o,a)}return o}function Ot(t,e){if(t.length!==e.length)return!1;for(let n=0,r=t.length;n<r;n++)if(t[n]!==e[n])return!1;return!0}function kt(t,e){for(let n=0,r=e.length;n<r;n++)t[n]=e[n]}function Ju(t,e){let n=Gv[e];n===void 0&&(n=new Int32Array(e),Gv[e]=n);for(let r=0;r!==e;++r)n[r]=t.allocateTextureUnit();return n}function X3(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function q3(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ot(n,e))return;t.uniform2fv(this.addr,e),kt(n,e)}}function Y3(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Ot(n,e))return;t.uniform3fv(this.addr,e),kt(n,e)}}function K3(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ot(n,e))return;t.uniform4fv(this.addr,e),kt(n,e)}}function Z3(t,e){const n=this.cache,r=e.elements;if(r===void 0){if(Ot(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),kt(n,e)}else{if(Ot(n,r))return;jv.set(r),t.uniformMatrix2fv(this.addr,!1,jv),kt(n,r)}}function J3(t,e){const n=this.cache,r=e.elements;if(r===void 0){if(Ot(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),kt(n,e)}else{if(Ot(n,r))return;$v.set(r),t.uniformMatrix3fv(this.addr,!1,$v),kt(n,r)}}function Q3(t,e){const n=this.cache,r=e.elements;if(r===void 0){if(Ot(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),kt(n,e)}else{if(Ot(n,r))return;Wv.set(r),t.uniformMatrix4fv(this.addr,!1,Wv),kt(n,r)}}function eN(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function tN(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ot(n,e))return;t.uniform2iv(this.addr,e),kt(n,e)}}function nN(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ot(n,e))return;t.uniform3iv(this.addr,e),kt(n,e)}}function rN(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ot(n,e))return;t.uniform4iv(this.addr,e),kt(n,e)}}function iN(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function oN(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ot(n,e))return;t.uniform2uiv(this.addr,e),kt(n,e)}}function sN(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ot(n,e))return;t.uniform3uiv(this.addr,e),kt(n,e)}}function aN(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ot(n,e))return;t.uniform4uiv(this.addr,e),kt(n,e)}}function lN(t,e,n){const r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(t.uniform1i(this.addr,i),r[0]=i),n.setTexture2D(e||fE,i)}function cN(t,e,n){const r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(t.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(e||pE,i)}function uN(t,e,n){const r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(t.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(e||mE,i)}function dN(t,e,n){const r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(t.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(e||hE,i)}function fN(t){switch(t){case 5126:return X3;case 35664:return q3;case 35665:return Y3;case 35666:return K3;case 35674:return Z3;case 35675:return J3;case 35676:return Q3;case 5124:case 35670:return eN;case 35667:case 35671:return tN;case 35668:case 35672:return nN;case 35669:case 35673:return rN;case 5125:return iN;case 36294:return oN;case 36295:return sN;case 36296:return aN;case 35678:case 36198:case 36298:case 36306:case 35682:return lN;case 35679:case 36299:case 36307:return cN;case 35680:case 36300:case 36308:case 36293:return uN;case 36289:case 36303:case 36311:case 36292:return dN}}function hN(t,e){t.uniform1fv(this.addr,e)}function pN(t,e){const n=Rs(e,this.size,2);t.uniform2fv(this.addr,n)}function mN(t,e){const n=Rs(e,this.size,3);t.uniform3fv(this.addr,n)}function gN(t,e){const n=Rs(e,this.size,4);t.uniform4fv(this.addr,n)}function vN(t,e){const n=Rs(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function _N(t,e){const n=Rs(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function yN(t,e){const n=Rs(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function xN(t,e){t.uniform1iv(this.addr,e)}function SN(t,e){t.uniform2iv(this.addr,e)}function EN(t,e){t.uniform3iv(this.addr,e)}function wN(t,e){t.uniform4iv(this.addr,e)}function MN(t,e){t.uniform1uiv(this.addr,e)}function TN(t,e){t.uniform2uiv(this.addr,e)}function bN(t,e){t.uniform3uiv(this.addr,e)}function AN(t,e){t.uniform4uiv(this.addr,e)}function RN(t,e,n){const r=this.cache,i=e.length,o=Ju(n,i);Ot(r,o)||(t.uniform1iv(this.addr,o),kt(r,o));for(let s=0;s!==i;++s)n.setTexture2D(e[s]||fE,o[s])}function CN(t,e,n){const r=this.cache,i=e.length,o=Ju(n,i);Ot(r,o)||(t.uniform1iv(this.addr,o),kt(r,o));for(let s=0;s!==i;++s)n.setTexture3D(e[s]||pE,o[s])}function PN(t,e,n){const r=this.cache,i=e.length,o=Ju(n,i);Ot(r,o)||(t.uniform1iv(this.addr,o),kt(r,o));for(let s=0;s!==i;++s)n.setTextureCube(e[s]||mE,o[s])}function LN(t,e,n){const r=this.cache,i=e.length,o=Ju(n,i);Ot(r,o)||(t.uniform1iv(this.addr,o),kt(r,o));for(let s=0;s!==i;++s)n.setTexture2DArray(e[s]||hE,o[s])}function DN(t){switch(t){case 5126:return hN;case 35664:return pN;case 35665:return mN;case 35666:return gN;case 35674:return vN;case 35675:return _N;case 35676:return yN;case 5124:case 35670:return xN;case 35667:case 35671:return SN;case 35668:case 35672:return EN;case 35669:case 35673:return wN;case 5125:return MN;case 36294:return TN;case 36295:return bN;case 36296:return AN;case 35678:case 36198:case 36298:case 36306:case 35682:return RN;case 35679:case 36299:case 36307:return CN;case 35680:case 36300:case 36308:case 36293:return PN;case 36289:case 36303:case 36311:case 36292:return LN}}class NN{constructor(e,n,r){this.id=e,this.addr=r,this.cache=[],this.setValue=fN(n.type)}}class IN{constructor(e,n,r){this.id=e,this.addr=r,this.cache=[],this.size=n.size,this.setValue=DN(n.type)}}class UN{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,r){const i=this.seq;for(let o=0,s=i.length;o!==s;++o){const a=i[o];a.setValue(e,n[a.id],r)}}}const vf=/(\w+)(\])?(\[|\.)?/g;function Xv(t,e){t.seq.push(e),t.map[e.id]=e}function ON(t,e,n){const r=t.name,i=r.length;for(vf.lastIndex=0;;){const o=vf.exec(r),s=vf.lastIndex;let a=o[1];const l=o[2]==="]",c=o[3];if(l&&(a=a|0),c===void 0||c==="["&&s+2===i){Xv(n,c===void 0?new NN(a,t,e):new IN(a,t,e));break}else{let f=n.map[a];f===void 0&&(f=new UN(a),Xv(n,f)),n=f}}}class _c{constructor(e,n){this.seq=[],this.map={};const r=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let i=0;i<r;++i){const o=e.getActiveUniform(n,i),s=e.getUniformLocation(n,o.name);ON(o,s,this)}}setValue(e,n,r,i){const o=this.map[n];o!==void 0&&o.setValue(e,r,i)}setOptional(e,n,r){const i=n[r];i!==void 0&&this.setValue(e,r,i)}static upload(e,n,r,i){for(let o=0,s=n.length;o!==s;++o){const a=n[o],l=r[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,n){const r=[];for(let i=0,o=e.length;i!==o;++i){const s=e[i];s.id in n&&r.push(s)}return r}}function qv(t,e,n){const r=t.createShader(e);return t.shaderSource(r,n),t.compileShader(r),r}const kN=37297;let FN=0;function BN(t,e){const n=t.split(`
`),r=[],i=Math.max(e-6,0),o=Math.min(e+6,n.length);for(let s=i;s<o;s++){const a=s+1;r.push(`${a===e?">":" "} ${a}: ${n[s]}`)}return r.join(`
`)}function zN(t){const e=at.getPrimaries(at.workingColorSpace),n=at.getPrimaries(t);let r;switch(e===n?r="":e===eu&&n===Qc?r="LinearDisplayP3ToLinearSRGB":e===Qc&&n===eu&&(r="LinearSRGBToLinearDisplayP3"),t){case jr:case Zu:return[r,"LinearTransferOETF"];case jt:case vm:return[r,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",t),[r,"LinearTransferOETF"]}}function Yv(t,e,n){const r=t.getShaderParameter(e,t.COMPILE_STATUS),i=t.getShaderInfoLog(e).trim();if(r&&i==="")return"";const o=/ERROR: 0:(\d+)/.exec(i);if(o){const s=parseInt(o[1]);return n.toUpperCase()+`

`+i+`

`+BN(t.getShaderSource(e),s)}else return i}function HN(t,e){const n=zN(e);return`vec4 ${t}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function VN(t,e){let n;switch(e){case zP:n="Linear";break;case HP:n="Reinhard";break;case VP:n="OptimizedCineon";break;case GP:n="ACESFilmic";break;case WP:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}function GN(t){return[t.extensionDerivatives||t.envMapCubeUVHeight||t.bumpMap||t.normalMapTangentSpace||t.clearcoatNormalMap||t.flatShading||t.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(t.extensionFragDepth||t.logarithmicDepthBuffer)&&t.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",t.extensionDrawBuffers&&t.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(t.extensionShaderTextureLOD||t.envMap||t.transmission)&&t.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Zs).join(`
`)}function WN(t){const e=[];for(const n in t){const r=t[n];r!==!1&&e.push("#define "+n+" "+r)}return e.join(`
`)}function $N(t,e){const n={},r=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){const o=t.getActiveAttrib(e,i),s=o.name;let a=1;o.type===t.FLOAT_MAT2&&(a=2),o.type===t.FLOAT_MAT3&&(a=3),o.type===t.FLOAT_MAT4&&(a=4),n[s]={type:o.type,location:t.getAttribLocation(e,s),locationSize:a}}return n}function Zs(t){return t!==""}function Kv(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Zv(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const jN=/^[ \t]*#include +<([\w\d./]+)>/gm;function jh(t){return t.replace(jN,qN)}const XN=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function qN(t,e){let n=qe[e];if(n===void 0){const r=XN.get(e);if(r!==void 0)n=qe[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return jh(n)}const YN=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Jv(t){return t.replace(YN,KN)}function KN(t,e,n,r){let i="";for(let o=parseInt(e);o<parseInt(n);o++)i+=r.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return i}function Qv(t){let e="precision "+t.precision+` float;
precision `+t.precision+" int;";return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function ZN(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===VS?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===pP?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===Nr&&(e="SHADOWMAP_TYPE_VSM"),e}function JN(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case fs:case hs:e="ENVMAP_TYPE_CUBE";break;case Ku:e="ENVMAP_TYPE_CUBE_UV";break}return e}function QN(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case hs:e="ENVMAP_MODE_REFRACTION";break}return e}function eI(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case GS:e="ENVMAP_BLENDING_MULTIPLY";break;case FP:e="ENVMAP_BLENDING_MIX";break;case BP:e="ENVMAP_BLENDING_ADD";break}return e}function tI(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:r,maxMip:n}}function nI(t,e,n,r){const i=t.getContext(),o=n.defines;let s=n.vertexShader,a=n.fragmentShader;const l=ZN(n),c=JN(n),u=QN(n),f=eI(n),h=tI(n),v=n.isWebGL2?"":GN(n),_=WN(o),y=i.createProgram();let p,d,m=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(p=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(Zs).join(`
`),p.length>0&&(p+=`
`),d=[v,"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(Zs).join(`
`),d.length>0&&(d+=`
`)):(p=[Qv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors&&n.isWebGL2?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zs).join(`
`),d=[v,Qv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+u:"",n.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Mi?"#define TONE_MAPPING":"",n.toneMapping!==Mi?qe.tonemapping_pars_fragment:"",n.toneMapping!==Mi?VN("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",qe.colorspace_pars_fragment,HN("linearToOutputTexel",n.outputColorSpace),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Zs).join(`
`)),s=jh(s),s=Kv(s,n),s=Zv(s,n),a=jh(a),a=Kv(a,n),a=Zv(a,n),s=Jv(s),a=Jv(a),n.isWebGL2&&n.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,p=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,d=["precision mediump sampler2DArray;","#define varying in",n.glslVersion===vv?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===vv?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const g=m+p+s,x=m+d+a,w=qv(i,i.VERTEX_SHADER,g),A=qv(i,i.FRAGMENT_SHADER,x);i.attachShader(y,w),i.attachShader(y,A),n.index0AttributeName!==void 0?i.bindAttribLocation(y,0,n.index0AttributeName):n.morphTargets===!0&&i.bindAttribLocation(y,0,"position"),i.linkProgram(y);function T(W){if(t.debug.checkShaderErrors){const j=i.getProgramInfoLog(y).trim(),ne=i.getShaderInfoLog(w).trim(),N=i.getShaderInfoLog(A).trim();let q=!0,ee=!0;if(i.getProgramParameter(y,i.LINK_STATUS)===!1)if(q=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(i,y,w,A);else{const J=Yv(i,w,"vertex"),G=Yv(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(y,i.VALIDATE_STATUS)+`

Program Info Log: `+j+`
`+J+`
`+G)}else j!==""?console.warn("THREE.WebGLProgram: Program Info Log:",j):(ne===""||N==="")&&(ee=!1);ee&&(W.diagnostics={runnable:q,programLog:j,vertexShader:{log:ne,prefix:p},fragmentShader:{log:N,prefix:d}})}i.deleteShader(w),i.deleteShader(A),C=new _c(i,y),E=$N(i,y)}let C;this.getUniforms=function(){return C===void 0&&T(this),C};let E;this.getAttributes=function(){return E===void 0&&T(this),E};let b=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=i.getProgramParameter(y,kN)),b},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(y),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=FN++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=w,this.fragmentShader=A,this}let rI=0;class iI{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,r=e.fragmentShader,i=this._getShaderStage(n),o=this._getShaderStage(r),s=this._getShaderCacheForMaterial(e);return s.has(i)===!1&&(s.add(i),i.usedTimes++),s.has(o)===!1&&(s.add(o),o.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const r of n)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let r=n.get(e);return r===void 0&&(r=new Set,n.set(e,r)),r}_getShaderStage(e){const n=this.shaderCache;let r=n.get(e);return r===void 0&&(r=new oI(e),n.set(e,r)),r}}class oI{constructor(e){this.id=rI++,this.code=e,this.usedTimes=0}}function sI(t,e,n,r,i,o,s){const a=new Sm,l=new iI,c=[],u=i.isWebGL2,f=i.logarithmicDepthBuffer,h=i.vertexTextures;let v=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(E){return E===0?"uv":`uv${E}`}function p(E,b,W,j,ne){const N=j.fog,q=ne.geometry,ee=E.isMeshStandardMaterial?j.environment:null,J=(E.isMeshStandardMaterial?n:e).get(E.envMap||ee),G=J&&J.mapping===Ku?J.image.height:null,V=_[E.type];E.precision!==null&&(v=i.getMaxPrecision(E.precision),v!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",v,"instead."));const H=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,D=H!==void 0?H.length:0;let L=0;q.morphAttributes.position!==void 0&&(L=1),q.morphAttributes.normal!==void 0&&(L=2),q.morphAttributes.color!==void 0&&(L=3);let Y,Z,se,B;if(V){const bt=gr[V];Y=bt.vertexShader,Z=bt.fragmentShader}else Y=E.vertexShader,Z=E.fragmentShader,l.update(E),se=l.getVertexShaderID(E),B=l.getFragmentShaderID(E);const xe=t.getRenderTarget(),oe=ne.isInstancedMesh===!0,Te=!!E.map,De=!!E.matcap,Ee=!!J,z=!!E.aoMap,rt=!!E.lightMap,we=!!E.bumpMap,_e=!!E.normalMap,Re=!!E.displacementMap,Ie=!!E.emissiveMap,Ce=!!E.metalnessMap,Be=!!E.roughnessMap,Fe=E.anisotropy>0,ft=E.clearcoat>0,gt=E.iridescence>0,P=E.sheen>0,M=E.transmission>0,$=Fe&&!!E.anisotropyMap,he=ft&&!!E.clearcoatMap,ce=ft&&!!E.clearcoatNormalMap,ue=ft&&!!E.clearcoatRoughnessMap,Le=gt&&!!E.iridescenceMap,ge=gt&&!!E.iridescenceThicknessMap,Se=P&&!!E.sheenColorMap,I=P&&!!E.sheenRoughnessMap,me=!!E.specularMap,le=!!E.specularColorMap,ze=!!E.specularIntensityMap,Ne=M&&!!E.transmissionMap,ke=M&&!!E.thicknessMap,Pe=!!E.gradientMap,be=!!E.alphaMap,Qe=E.alphaTest>0,F=!!E.alphaHash,ve=!!E.extensions,de=!!q.attributes.uv1,ae=!!q.attributes.uv2,pe=!!q.attributes.uv3;let Oe=Mi;return E.toneMapped&&(xe===null||xe.isXRRenderTarget===!0)&&(Oe=t.toneMapping),{isWebGL2:u,shaderID:V,shaderType:E.type,shaderName:E.name,vertexShader:Y,fragmentShader:Z,defines:E.defines,customVertexShaderID:se,customFragmentShaderID:B,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:v,instancing:oe,instancingColor:oe&&ne.instanceColor!==null,supportsVertexTextures:h,outputColorSpace:xe===null?t.outputColorSpace:xe.isXRRenderTarget===!0?xe.texture.colorSpace:jr,map:Te,matcap:De,envMap:Ee,envMapMode:Ee&&J.mapping,envMapCubeUVHeight:G,aoMap:z,lightMap:rt,bumpMap:we,normalMap:_e,displacementMap:h&&Re,emissiveMap:Ie,normalMapObjectSpace:_e&&E.normalMapType===r2,normalMapTangentSpace:_e&&E.normalMapType===JS,metalnessMap:Ce,roughnessMap:Be,anisotropy:Fe,anisotropyMap:$,clearcoat:ft,clearcoatMap:he,clearcoatNormalMap:ce,clearcoatRoughnessMap:ue,iridescence:gt,iridescenceMap:Le,iridescenceThicknessMap:ge,sheen:P,sheenColorMap:Se,sheenRoughnessMap:I,specularMap:me,specularColorMap:le,specularIntensityMap:ze,transmission:M,transmissionMap:Ne,thicknessMap:ke,gradientMap:Pe,opaque:E.transparent===!1&&E.blending===es,alphaMap:be,alphaTest:Qe,alphaHash:F,combine:E.combine,mapUv:Te&&y(E.map.channel),aoMapUv:z&&y(E.aoMap.channel),lightMapUv:rt&&y(E.lightMap.channel),bumpMapUv:we&&y(E.bumpMap.channel),normalMapUv:_e&&y(E.normalMap.channel),displacementMapUv:Re&&y(E.displacementMap.channel),emissiveMapUv:Ie&&y(E.emissiveMap.channel),metalnessMapUv:Ce&&y(E.metalnessMap.channel),roughnessMapUv:Be&&y(E.roughnessMap.channel),anisotropyMapUv:$&&y(E.anisotropyMap.channel),clearcoatMapUv:he&&y(E.clearcoatMap.channel),clearcoatNormalMapUv:ce&&y(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ue&&y(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Le&&y(E.iridescenceMap.channel),iridescenceThicknessMapUv:ge&&y(E.iridescenceThicknessMap.channel),sheenColorMapUv:Se&&y(E.sheenColorMap.channel),sheenRoughnessMapUv:I&&y(E.sheenRoughnessMap.channel),specularMapUv:me&&y(E.specularMap.channel),specularColorMapUv:le&&y(E.specularColorMap.channel),specularIntensityMapUv:ze&&y(E.specularIntensityMap.channel),transmissionMapUv:Ne&&y(E.transmissionMap.channel),thicknessMapUv:ke&&y(E.thicknessMap.channel),alphaMapUv:be&&y(E.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(_e||Fe),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,vertexUv1s:de,vertexUv2s:ae,vertexUv3s:pe,pointsUvs:ne.isPoints===!0&&!!q.attributes.uv&&(Te||be),fog:!!N,useFog:E.fog===!0,fogExp2:N&&N.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:ne.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:D,morphTextureStride:L,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:E.dithering,shadowMapEnabled:t.shadowMap.enabled&&W.length>0,shadowMapType:t.shadowMap.type,toneMapping:Oe,useLegacyLights:t._useLegacyLights,decodeVideoTexture:Te&&E.map.isVideoTexture===!0&&at.getTransfer(E.map.colorSpace)===pt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Or,flipSided:E.side===En,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionDerivatives:ve&&E.extensions.derivatives===!0,extensionFragDepth:ve&&E.extensions.fragDepth===!0,extensionDrawBuffers:ve&&E.extensions.drawBuffers===!0,extensionShaderTextureLOD:ve&&E.extensions.shaderTextureLOD===!0,rendererExtensionFragDepth:u||r.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||r.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||r.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()}}function d(E){const b=[];if(E.shaderID?b.push(E.shaderID):(b.push(E.customVertexShaderID),b.push(E.customFragmentShaderID)),E.defines!==void 0)for(const W in E.defines)b.push(W),b.push(E.defines[W]);return E.isRawShaderMaterial===!1&&(m(b,E),g(b,E),b.push(t.outputColorSpace)),b.push(E.customProgramCacheKey),b.join()}function m(E,b){E.push(b.precision),E.push(b.outputColorSpace),E.push(b.envMapMode),E.push(b.envMapCubeUVHeight),E.push(b.mapUv),E.push(b.alphaMapUv),E.push(b.lightMapUv),E.push(b.aoMapUv),E.push(b.bumpMapUv),E.push(b.normalMapUv),E.push(b.displacementMapUv),E.push(b.emissiveMapUv),E.push(b.metalnessMapUv),E.push(b.roughnessMapUv),E.push(b.anisotropyMapUv),E.push(b.clearcoatMapUv),E.push(b.clearcoatNormalMapUv),E.push(b.clearcoatRoughnessMapUv),E.push(b.iridescenceMapUv),E.push(b.iridescenceThicknessMapUv),E.push(b.sheenColorMapUv),E.push(b.sheenRoughnessMapUv),E.push(b.specularMapUv),E.push(b.specularColorMapUv),E.push(b.specularIntensityMapUv),E.push(b.transmissionMapUv),E.push(b.thicknessMapUv),E.push(b.combine),E.push(b.fogExp2),E.push(b.sizeAttenuation),E.push(b.morphTargetsCount),E.push(b.morphAttributeCount),E.push(b.numDirLights),E.push(b.numPointLights),E.push(b.numSpotLights),E.push(b.numSpotLightMaps),E.push(b.numHemiLights),E.push(b.numRectAreaLights),E.push(b.numDirLightShadows),E.push(b.numPointLightShadows),E.push(b.numSpotLightShadows),E.push(b.numSpotLightShadowsWithMaps),E.push(b.numLightProbes),E.push(b.shadowMapType),E.push(b.toneMapping),E.push(b.numClippingPlanes),E.push(b.numClipIntersection),E.push(b.depthPacking)}function g(E,b){a.disableAll(),b.isWebGL2&&a.enable(0),b.supportsVertexTextures&&a.enable(1),b.instancing&&a.enable(2),b.instancingColor&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),E.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.skinning&&a.enable(4),b.morphTargets&&a.enable(5),b.morphNormals&&a.enable(6),b.morphColors&&a.enable(7),b.premultipliedAlpha&&a.enable(8),b.shadowMapEnabled&&a.enable(9),b.useLegacyLights&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),E.push(a.mask)}function x(E){const b=_[E.type];let W;if(b){const j=gr[b];W=$2.clone(j.uniforms)}else W=E.uniforms;return W}function w(E,b){let W;for(let j=0,ne=c.length;j<ne;j++){const N=c[j];if(N.cacheKey===b){W=N,++W.usedTimes;break}}return W===void 0&&(W=new nI(t,b,E,o),c.push(W)),W}function A(E){if(--E.usedTimes===0){const b=c.indexOf(E);c[b]=c[c.length-1],c.pop(),E.destroy()}}function T(E){l.remove(E)}function C(){l.dispose()}return{getParameters:p,getProgramCacheKey:d,getUniforms:x,acquireProgram:w,releaseProgram:A,releaseShaderCache:T,programs:c,dispose:C}}function aI(){let t=new WeakMap;function e(o){let s=t.get(o);return s===void 0&&(s={},t.set(o,s)),s}function n(o){t.delete(o)}function r(o,s,a){t.get(o)[s]=a}function i(){t=new WeakMap}return{get:e,remove:n,update:r,dispose:i}}function lI(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function e_(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function t_(){const t=[];let e=0;const n=[],r=[],i=[];function o(){e=0,n.length=0,r.length=0,i.length=0}function s(f,h,v,_,y,p){let d=t[e];return d===void 0?(d={id:f.id,object:f,geometry:h,material:v,groupOrder:_,renderOrder:f.renderOrder,z:y,group:p},t[e]=d):(d.id=f.id,d.object=f,d.geometry=h,d.material=v,d.groupOrder=_,d.renderOrder=f.renderOrder,d.z=y,d.group=p),e++,d}function a(f,h,v,_,y,p){const d=s(f,h,v,_,y,p);v.transmission>0?r.push(d):v.transparent===!0?i.push(d):n.push(d)}function l(f,h,v,_,y,p){const d=s(f,h,v,_,y,p);v.transmission>0?r.unshift(d):v.transparent===!0?i.unshift(d):n.unshift(d)}function c(f,h){n.length>1&&n.sort(f||lI),r.length>1&&r.sort(h||e_),i.length>1&&i.sort(h||e_)}function u(){for(let f=e,h=t.length;f<h;f++){const v=t[f];if(v.id===null)break;v.id=null,v.object=null,v.geometry=null,v.material=null,v.group=null}}return{opaque:n,transmissive:r,transparent:i,init:o,push:a,unshift:l,finish:u,sort:c}}function cI(){let t=new WeakMap;function e(r,i){const o=t.get(r);let s;return o===void 0?(s=new t_,t.set(r,[s])):i>=o.length?(s=new t_,o.push(s)):s=o[i],s}function n(){t=new WeakMap}return{get:e,dispose:n}}function uI(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new K,color:new nt};break;case"SpotLight":n={position:new K,direction:new K,color:new nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new K,color:new nt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new K,skyColor:new nt,groundColor:new nt};break;case"RectAreaLight":n={color:new nt,position:new K,halfWidth:new K,halfHeight:new K};break}return t[e.id]=n,n}}}function dI(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge};break;case"SpotLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge};break;case"PointLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let fI=0;function hI(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function pI(t,e){const n=new uI,r=dI(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new K);const o=new K,s=new Ut,a=new Ut;function l(u,f){let h=0,v=0,_=0;for(let j=0;j<9;j++)i.probe[j].set(0,0,0);let y=0,p=0,d=0,m=0,g=0,x=0,w=0,A=0,T=0,C=0,E=0;u.sort(hI);const b=f===!0?Math.PI:1;for(let j=0,ne=u.length;j<ne;j++){const N=u[j],q=N.color,ee=N.intensity,J=N.distance,G=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)h+=q.r*ee*b,v+=q.g*ee*b,_+=q.b*ee*b;else if(N.isLightProbe){for(let V=0;V<9;V++)i.probe[V].addScaledVector(N.sh.coefficients[V],ee);E++}else if(N.isDirectionalLight){const V=n.get(N);if(V.color.copy(N.color).multiplyScalar(N.intensity*b),N.castShadow){const H=N.shadow,D=r.get(N);D.shadowBias=H.bias,D.shadowNormalBias=H.normalBias,D.shadowRadius=H.radius,D.shadowMapSize=H.mapSize,i.directionalShadow[y]=D,i.directionalShadowMap[y]=G,i.directionalShadowMatrix[y]=N.shadow.matrix,x++}i.directional[y]=V,y++}else if(N.isSpotLight){const V=n.get(N);V.position.setFromMatrixPosition(N.matrixWorld),V.color.copy(q).multiplyScalar(ee*b),V.distance=J,V.coneCos=Math.cos(N.angle),V.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),V.decay=N.decay,i.spot[d]=V;const H=N.shadow;if(N.map&&(i.spotLightMap[T]=N.map,T++,H.updateMatrices(N),N.castShadow&&C++),i.spotLightMatrix[d]=H.matrix,N.castShadow){const D=r.get(N);D.shadowBias=H.bias,D.shadowNormalBias=H.normalBias,D.shadowRadius=H.radius,D.shadowMapSize=H.mapSize,i.spotShadow[d]=D,i.spotShadowMap[d]=G,A++}d++}else if(N.isRectAreaLight){const V=n.get(N);V.color.copy(q).multiplyScalar(ee),V.halfWidth.set(N.width*.5,0,0),V.halfHeight.set(0,N.height*.5,0),i.rectArea[m]=V,m++}else if(N.isPointLight){const V=n.get(N);if(V.color.copy(N.color).multiplyScalar(N.intensity*b),V.distance=N.distance,V.decay=N.decay,N.castShadow){const H=N.shadow,D=r.get(N);D.shadowBias=H.bias,D.shadowNormalBias=H.normalBias,D.shadowRadius=H.radius,D.shadowMapSize=H.mapSize,D.shadowCameraNear=H.camera.near,D.shadowCameraFar=H.camera.far,i.pointShadow[p]=D,i.pointShadowMap[p]=G,i.pointShadowMatrix[p]=N.shadow.matrix,w++}i.point[p]=V,p++}else if(N.isHemisphereLight){const V=n.get(N);V.skyColor.copy(N.color).multiplyScalar(ee*b),V.groundColor.copy(N.groundColor).multiplyScalar(ee*b),i.hemi[g]=V,g++}}m>0&&(e.isWebGL2||t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ye.LTC_FLOAT_1,i.rectAreaLTC2=ye.LTC_FLOAT_2):t.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=ye.LTC_HALF_1,i.rectAreaLTC2=ye.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=h,i.ambient[1]=v,i.ambient[2]=_;const W=i.hash;(W.directionalLength!==y||W.pointLength!==p||W.spotLength!==d||W.rectAreaLength!==m||W.hemiLength!==g||W.numDirectionalShadows!==x||W.numPointShadows!==w||W.numSpotShadows!==A||W.numSpotMaps!==T||W.numLightProbes!==E)&&(i.directional.length=y,i.spot.length=d,i.rectArea.length=m,i.point.length=p,i.hemi.length=g,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=A,i.spotShadowMap.length=A,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=A+T-C,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=E,W.directionalLength=y,W.pointLength=p,W.spotLength=d,W.rectAreaLength=m,W.hemiLength=g,W.numDirectionalShadows=x,W.numPointShadows=w,W.numSpotShadows=A,W.numSpotMaps=T,W.numLightProbes=E,i.version=fI++)}function c(u,f){let h=0,v=0,_=0,y=0,p=0;const d=f.matrixWorldInverse;for(let m=0,g=u.length;m<g;m++){const x=u[m];if(x.isDirectionalLight){const w=i.directional[h];w.direction.setFromMatrixPosition(x.matrixWorld),o.setFromMatrixPosition(x.target.matrixWorld),w.direction.sub(o),w.direction.transformDirection(d),h++}else if(x.isSpotLight){const w=i.spot[_];w.position.setFromMatrixPosition(x.matrixWorld),w.position.applyMatrix4(d),w.direction.setFromMatrixPosition(x.matrixWorld),o.setFromMatrixPosition(x.target.matrixWorld),w.direction.sub(o),w.direction.transformDirection(d),_++}else if(x.isRectAreaLight){const w=i.rectArea[y];w.position.setFromMatrixPosition(x.matrixWorld),w.position.applyMatrix4(d),a.identity(),s.copy(x.matrixWorld),s.premultiply(d),a.extractRotation(s),w.halfWidth.set(x.width*.5,0,0),w.halfHeight.set(0,x.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),y++}else if(x.isPointLight){const w=i.point[v];w.position.setFromMatrixPosition(x.matrixWorld),w.position.applyMatrix4(d),v++}else if(x.isHemisphereLight){const w=i.hemi[p];w.direction.setFromMatrixPosition(x.matrixWorld),w.direction.transformDirection(d),p++}}}return{setup:l,setupView:c,state:i}}function n_(t,e){const n=new pI(t,e),r=[],i=[];function o(){r.length=0,i.length=0}function s(f){r.push(f)}function a(f){i.push(f)}function l(f){n.setup(r,f)}function c(f){n.setupView(r,f)}return{init:o,state:{lightsArray:r,shadowsArray:i,lights:n},setupLights:l,setupLightsView:c,pushLight:s,pushShadow:a}}function mI(t,e){let n=new WeakMap;function r(o,s=0){const a=n.get(o);let l;return a===void 0?(l=new n_(t,e),n.set(o,[l])):s>=a.length?(l=new n_(t,e),a.push(l)):l=a[s],l}function i(){n=new WeakMap}return{get:r,dispose:i}}class gI extends $a{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=t2,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class vI extends $a{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const _I=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,yI=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function xI(t,e,n){let r=new Em;const i=new Ge,o=new Ge,s=new Ht,a=new gI({depthPacking:n2}),l=new vI,c={},u=n.maxTextureSize,f={[Ri]:En,[En]:Ri,[Or]:Or},h=new co({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ge},radius:{value:4}},vertexShader:_I,fragmentShader:yI}),v=h.clone();v.defines.HORIZONTAL_PASS=1;const _=new Ii;_.setAttribute("position",new Sr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new ut(_,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=VS;let d=this.type;this.render=function(w,A,T){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;const C=t.getRenderTarget(),E=t.getActiveCubeFace(),b=t.getActiveMipmapLevel(),W=t.state;W.setBlending(wi),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const j=d!==Nr&&this.type===Nr,ne=d===Nr&&this.type!==Nr;for(let N=0,q=w.length;N<q;N++){const ee=w[N],J=ee.shadow;if(J===void 0){console.warn("THREE.WebGLShadowMap:",ee,"has no shadow.");continue}if(J.autoUpdate===!1&&J.needsUpdate===!1)continue;i.copy(J.mapSize);const G=J.getFrameExtents();if(i.multiply(G),o.copy(J.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(o.x=Math.floor(u/G.x),i.x=o.x*G.x,J.mapSize.x=o.x),i.y>u&&(o.y=Math.floor(u/G.y),i.y=o.y*G.y,J.mapSize.y=o.y)),J.map===null||j===!0||ne===!0){const H=this.type!==Nr?{minFilter:un,magFilter:un}:{};J.map!==null&&J.map.dispose(),J.map=new lo(i.x,i.y,H),J.map.texture.name=ee.name+".shadowMap",J.camera.updateProjectionMatrix()}t.setRenderTarget(J.map),t.clear();const V=J.getViewportCount();for(let H=0;H<V;H++){const D=J.getViewport(H);s.set(o.x*D.x,o.y*D.y,o.x*D.z,o.y*D.w),W.viewport(s),J.updateMatrices(ee,H),r=J.getFrustum(),x(A,T,J.camera,ee,this.type)}J.isPointLightShadow!==!0&&this.type===Nr&&m(J,T),J.needsUpdate=!1}d=this.type,p.needsUpdate=!1,t.setRenderTarget(C,E,b)};function m(w,A){const T=e.update(y);h.defines.VSM_SAMPLES!==w.blurSamples&&(h.defines.VSM_SAMPLES=w.blurSamples,v.defines.VSM_SAMPLES=w.blurSamples,h.needsUpdate=!0,v.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new lo(i.x,i.y)),h.uniforms.shadow_pass.value=w.map.texture,h.uniforms.resolution.value=w.mapSize,h.uniforms.radius.value=w.radius,t.setRenderTarget(w.mapPass),t.clear(),t.renderBufferDirect(A,null,T,h,y,null),v.uniforms.shadow_pass.value=w.mapPass.texture,v.uniforms.resolution.value=w.mapSize,v.uniforms.radius.value=w.radius,t.setRenderTarget(w.map),t.clear(),t.renderBufferDirect(A,null,T,v,y,null)}function g(w,A,T,C){let E=null;const b=T.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(b!==void 0)E=b;else if(E=T.isPointLight===!0?l:a,t.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const W=E.uuid,j=A.uuid;let ne=c[W];ne===void 0&&(ne={},c[W]=ne);let N=ne[j];N===void 0&&(N=E.clone(),ne[j]=N),E=N}if(E.visible=A.visible,E.wireframe=A.wireframe,C===Nr?E.side=A.shadowSide!==null?A.shadowSide:A.side:E.side=A.shadowSide!==null?A.shadowSide:f[A.side],E.alphaMap=A.alphaMap,E.alphaTest=A.alphaTest,E.map=A.map,E.clipShadows=A.clipShadows,E.clippingPlanes=A.clippingPlanes,E.clipIntersection=A.clipIntersection,E.displacementMap=A.displacementMap,E.displacementScale=A.displacementScale,E.displacementBias=A.displacementBias,E.wireframeLinewidth=A.wireframeLinewidth,E.linewidth=A.linewidth,T.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const W=t.properties.get(E);W.light=T}return E}function x(w,A,T,C,E){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&E===Nr)&&(!w.frustumCulled||r.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,w.matrixWorld);const j=e.update(w),ne=w.material;if(Array.isArray(ne)){const N=j.groups;for(let q=0,ee=N.length;q<ee;q++){const J=N[q],G=ne[J.materialIndex];if(G&&G.visible){const V=g(w,G,C,E);t.renderBufferDirect(T,null,j,V,w,J)}}}else if(ne.visible){const N=g(w,ne,C,E);t.renderBufferDirect(T,null,j,N,w,null)}}const W=w.children;for(let j=0,ne=W.length;j<ne;j++)x(W[j],A,T,C,E)}}function SI(t,e,n){const r=n.isWebGL2;function i(){let F=!1;const ve=new Ht;let de=null;const ae=new Ht(0,0,0,0);return{setMask:function(pe){de!==pe&&!F&&(t.colorMask(pe,pe,pe,pe),de=pe)},setLocked:function(pe){F=pe},setClear:function(pe,Oe,et,bt,On){On===!0&&(pe*=bt,Oe*=bt,et*=bt),ve.set(pe,Oe,et,bt),ae.equals(ve)===!1&&(t.clearColor(pe,Oe,et,bt),ae.copy(ve))},reset:function(){F=!1,de=null,ae.set(-1,0,0,0)}}}function o(){let F=!1,ve=null,de=null,ae=null;return{setTest:function(pe){pe?Te(t.DEPTH_TEST):De(t.DEPTH_TEST)},setMask:function(pe){ve!==pe&&!F&&(t.depthMask(pe),ve=pe)},setFunc:function(pe){if(de!==pe){switch(pe){case LP:t.depthFunc(t.NEVER);break;case DP:t.depthFunc(t.ALWAYS);break;case NP:t.depthFunc(t.LESS);break;case Zc:t.depthFunc(t.LEQUAL);break;case IP:t.depthFunc(t.EQUAL);break;case UP:t.depthFunc(t.GEQUAL);break;case OP:t.depthFunc(t.GREATER);break;case kP:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}de=pe}},setLocked:function(pe){F=pe},setClear:function(pe){ae!==pe&&(t.clearDepth(pe),ae=pe)},reset:function(){F=!1,ve=null,de=null,ae=null}}}function s(){let F=!1,ve=null,de=null,ae=null,pe=null,Oe=null,et=null,bt=null,On=null;return{setTest:function(ct){F||(ct?Te(t.STENCIL_TEST):De(t.STENCIL_TEST))},setMask:function(ct){ve!==ct&&!F&&(t.stencilMask(ct),ve=ct)},setFunc:function(ct,rn,fr){(de!==ct||ae!==rn||pe!==fr)&&(t.stencilFunc(ct,rn,fr),de=ct,ae=rn,pe=fr)},setOp:function(ct,rn,fr){(Oe!==ct||et!==rn||bt!==fr)&&(t.stencilOp(ct,rn,fr),Oe=ct,et=rn,bt=fr)},setLocked:function(ct){F=ct},setClear:function(ct){On!==ct&&(t.clearStencil(ct),On=ct)},reset:function(){F=!1,ve=null,de=null,ae=null,pe=null,Oe=null,et=null,bt=null,On=null}}}const a=new i,l=new o,c=new s,u=new WeakMap,f=new WeakMap;let h={},v={},_=new WeakMap,y=[],p=null,d=!1,m=null,g=null,x=null,w=null,A=null,T=null,C=null,E=new nt(0,0,0),b=0,W=!1,j=null,ne=null,N=null,q=null,ee=null;const J=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,V=0;const H=t.getParameter(t.VERSION);H.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(H)[1]),G=V>=1):H.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),G=V>=2);let D=null,L={};const Y=t.getParameter(t.SCISSOR_BOX),Z=t.getParameter(t.VIEWPORT),se=new Ht().fromArray(Y),B=new Ht().fromArray(Z);function xe(F,ve,de,ae){const pe=new Uint8Array(4),Oe=t.createTexture();t.bindTexture(F,Oe),t.texParameteri(F,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(F,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let et=0;et<de;et++)r&&(F===t.TEXTURE_3D||F===t.TEXTURE_2D_ARRAY)?t.texImage3D(ve,0,t.RGBA,1,1,ae,0,t.RGBA,t.UNSIGNED_BYTE,pe):t.texImage2D(ve+et,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,pe);return Oe}const oe={};oe[t.TEXTURE_2D]=xe(t.TEXTURE_2D,t.TEXTURE_2D,1),oe[t.TEXTURE_CUBE_MAP]=xe(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),r&&(oe[t.TEXTURE_2D_ARRAY]=xe(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),oe[t.TEXTURE_3D]=xe(t.TEXTURE_3D,t.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Te(t.DEPTH_TEST),l.setFunc(Zc),Ce(!1),Be(k0),Te(t.CULL_FACE),Re(wi);function Te(F){h[F]!==!0&&(t.enable(F),h[F]=!0)}function De(F){h[F]!==!1&&(t.disable(F),h[F]=!1)}function Ee(F,ve){return v[F]!==ve?(t.bindFramebuffer(F,ve),v[F]=ve,r&&(F===t.DRAW_FRAMEBUFFER&&(v[t.FRAMEBUFFER]=ve),F===t.FRAMEBUFFER&&(v[t.DRAW_FRAMEBUFFER]=ve)),!0):!1}function z(F,ve){let de=y,ae=!1;if(F)if(de=_.get(ve),de===void 0&&(de=[],_.set(ve,de)),F.isWebGLMultipleRenderTargets){const pe=F.texture;if(de.length!==pe.length||de[0]!==t.COLOR_ATTACHMENT0){for(let Oe=0,et=pe.length;Oe<et;Oe++)de[Oe]=t.COLOR_ATTACHMENT0+Oe;de.length=pe.length,ae=!0}}else de[0]!==t.COLOR_ATTACHMENT0&&(de[0]=t.COLOR_ATTACHMENT0,ae=!0);else de[0]!==t.BACK&&(de[0]=t.BACK,ae=!0);ae&&(n.isWebGL2?t.drawBuffers(de):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(de))}function rt(F){return p!==F?(t.useProgram(F),p=F,!0):!1}const we={[$i]:t.FUNC_ADD,[gP]:t.FUNC_SUBTRACT,[vP]:t.FUNC_REVERSE_SUBTRACT};if(r)we[H0]=t.MIN,we[V0]=t.MAX;else{const F=e.get("EXT_blend_minmax");F!==null&&(we[H0]=F.MIN_EXT,we[V0]=F.MAX_EXT)}const _e={[_P]:t.ZERO,[yP]:t.ONE,[xP]:t.SRC_COLOR,[Fh]:t.SRC_ALPHA,[bP]:t.SRC_ALPHA_SATURATE,[MP]:t.DST_COLOR,[EP]:t.DST_ALPHA,[SP]:t.ONE_MINUS_SRC_COLOR,[Bh]:t.ONE_MINUS_SRC_ALPHA,[TP]:t.ONE_MINUS_DST_COLOR,[wP]:t.ONE_MINUS_DST_ALPHA,[AP]:t.CONSTANT_COLOR,[RP]:t.ONE_MINUS_CONSTANT_COLOR,[CP]:t.CONSTANT_ALPHA,[PP]:t.ONE_MINUS_CONSTANT_ALPHA};function Re(F,ve,de,ae,pe,Oe,et,bt,On,ct){if(F===wi){d===!0&&(De(t.BLEND),d=!1);return}if(d===!1&&(Te(t.BLEND),d=!0),F!==mP){if(F!==m||ct!==W){if((g!==$i||A!==$i)&&(t.blendEquation(t.FUNC_ADD),g=$i,A=$i),ct)switch(F){case es:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case F0:t.blendFunc(t.ONE,t.ONE);break;case B0:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case z0:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case es:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case F0:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case B0:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case z0:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}x=null,w=null,T=null,C=null,E.set(0,0,0),b=0,m=F,W=ct}return}pe=pe||ve,Oe=Oe||de,et=et||ae,(ve!==g||pe!==A)&&(t.blendEquationSeparate(we[ve],we[pe]),g=ve,A=pe),(de!==x||ae!==w||Oe!==T||et!==C)&&(t.blendFuncSeparate(_e[de],_e[ae],_e[Oe],_e[et]),x=de,w=ae,T=Oe,C=et),(bt.equals(E)===!1||On!==b)&&(t.blendColor(bt.r,bt.g,bt.b,On),E.copy(bt),b=On),m=F,W=!1}function Ie(F,ve){F.side===Or?De(t.CULL_FACE):Te(t.CULL_FACE);let de=F.side===En;ve&&(de=!de),Ce(de),F.blending===es&&F.transparent===!1?Re(wi):Re(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),l.setFunc(F.depthFunc),l.setTest(F.depthTest),l.setMask(F.depthWrite),a.setMask(F.colorWrite);const ae=F.stencilWrite;c.setTest(ae),ae&&(c.setMask(F.stencilWriteMask),c.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),c.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),ft(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?Te(t.SAMPLE_ALPHA_TO_COVERAGE):De(t.SAMPLE_ALPHA_TO_COVERAGE)}function Ce(F){j!==F&&(F?t.frontFace(t.CW):t.frontFace(t.CCW),j=F)}function Be(F){F!==fP?(Te(t.CULL_FACE),F!==ne&&(F===k0?t.cullFace(t.BACK):F===hP?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):De(t.CULL_FACE),ne=F}function Fe(F){F!==N&&(G&&t.lineWidth(F),N=F)}function ft(F,ve,de){F?(Te(t.POLYGON_OFFSET_FILL),(q!==ve||ee!==de)&&(t.polygonOffset(ve,de),q=ve,ee=de)):De(t.POLYGON_OFFSET_FILL)}function gt(F){F?Te(t.SCISSOR_TEST):De(t.SCISSOR_TEST)}function P(F){F===void 0&&(F=t.TEXTURE0+J-1),D!==F&&(t.activeTexture(F),D=F)}function M(F,ve,de){de===void 0&&(D===null?de=t.TEXTURE0+J-1:de=D);let ae=L[de];ae===void 0&&(ae={type:void 0,texture:void 0},L[de]=ae),(ae.type!==F||ae.texture!==ve)&&(D!==de&&(t.activeTexture(de),D=de),t.bindTexture(F,ve||oe[F]),ae.type=F,ae.texture=ve)}function $(){const F=L[D];F!==void 0&&F.type!==void 0&&(t.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function he(){try{t.compressedTexImage2D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ce(){try{t.compressedTexImage3D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ue(){try{t.texSubImage2D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Le(){try{t.texSubImage3D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ge(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Se(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function I(){try{t.texStorage2D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function me(){try{t.texStorage3D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function le(){try{t.texImage2D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ze(){try{t.texImage3D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ne(F){se.equals(F)===!1&&(t.scissor(F.x,F.y,F.z,F.w),se.copy(F))}function ke(F){B.equals(F)===!1&&(t.viewport(F.x,F.y,F.z,F.w),B.copy(F))}function Pe(F,ve){let de=f.get(ve);de===void 0&&(de=new WeakMap,f.set(ve,de));let ae=de.get(F);ae===void 0&&(ae=t.getUniformBlockIndex(ve,F.name),de.set(F,ae))}function be(F,ve){const ae=f.get(ve).get(F);u.get(ve)!==ae&&(t.uniformBlockBinding(ve,ae,F.__bindingPointIndex),u.set(ve,ae))}function Qe(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),r===!0&&(t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null)),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),h={},D=null,L={},v={},_=new WeakMap,y=[],p=null,d=!1,m=null,g=null,x=null,w=null,A=null,T=null,C=null,E=new nt(0,0,0),b=0,W=!1,j=null,ne=null,N=null,q=null,ee=null,se.set(0,0,t.canvas.width,t.canvas.height),B.set(0,0,t.canvas.width,t.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:Te,disable:De,bindFramebuffer:Ee,drawBuffers:z,useProgram:rt,setBlending:Re,setMaterial:Ie,setFlipSided:Ce,setCullFace:Be,setLineWidth:Fe,setPolygonOffset:ft,setScissorTest:gt,activeTexture:P,bindTexture:M,unbindTexture:$,compressedTexImage2D:he,compressedTexImage3D:ce,texImage2D:le,texImage3D:ze,updateUBOMapping:Pe,uniformBlockBinding:be,texStorage2D:I,texStorage3D:me,texSubImage2D:ue,texSubImage3D:Le,compressedTexSubImage2D:ge,compressedTexSubImage3D:Se,scissor:Ne,viewport:ke,reset:Qe}}function EI(t,e,n,r,i,o,s){const a=i.isWebGL2,l=i.maxTextures,c=i.maxCubemapSize,u=i.maxTextureSize,f=i.maxSamples,h=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,v=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),_=new WeakMap;let y;const p=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(P,M){return d?new OffscreenCanvas(P,M):ru("canvas")}function g(P,M,$,he){let ce=1;if((P.width>he||P.height>he)&&(ce=he/Math.max(P.width,P.height)),ce<1||M===!0)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap){const ue=M?nu:Math.floor,Le=ue(ce*P.width),ge=ue(ce*P.height);y===void 0&&(y=m(Le,ge));const Se=$?m(Le,ge):y;return Se.width=Le,Se.height=ge,Se.getContext("2d").drawImage(P,0,0,Le,ge),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+P.width+"x"+P.height+") to ("+Le+"x"+ge+")."),Se}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+P.width+"x"+P.height+")."),P;return P}function x(P){return $h(P.width)&&$h(P.height)}function w(P){return a?!1:P.wrapS!==ir||P.wrapT!==ir||P.minFilter!==un&&P.minFilter!==Hn}function A(P,M){return P.generateMipmaps&&M&&P.minFilter!==un&&P.minFilter!==Hn}function T(P){t.generateMipmap(P)}function C(P,M,$,he,ce=!1){if(a===!1)return M;if(P!==null){if(t[P]!==void 0)return t[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let ue=M;if(M===t.RED&&($===t.FLOAT&&(ue=t.R32F),$===t.HALF_FLOAT&&(ue=t.R16F),$===t.UNSIGNED_BYTE&&(ue=t.R8)),M===t.RED_INTEGER&&($===t.UNSIGNED_BYTE&&(ue=t.R8UI),$===t.UNSIGNED_SHORT&&(ue=t.R16UI),$===t.UNSIGNED_INT&&(ue=t.R32UI),$===t.BYTE&&(ue=t.R8I),$===t.SHORT&&(ue=t.R16I),$===t.INT&&(ue=t.R32I)),M===t.RG&&($===t.FLOAT&&(ue=t.RG32F),$===t.HALF_FLOAT&&(ue=t.RG16F),$===t.UNSIGNED_BYTE&&(ue=t.RG8)),M===t.RGBA){const Le=ce?Jc:at.getTransfer(he);$===t.FLOAT&&(ue=t.RGBA32F),$===t.HALF_FLOAT&&(ue=t.RGBA16F),$===t.UNSIGNED_BYTE&&(ue=Le===pt?t.SRGB8_ALPHA8:t.RGBA8),$===t.UNSIGNED_SHORT_4_4_4_4&&(ue=t.RGBA4),$===t.UNSIGNED_SHORT_5_5_5_1&&(ue=t.RGB5_A1)}return(ue===t.R16F||ue===t.R32F||ue===t.RG16F||ue===t.RG32F||ue===t.RGBA16F||ue===t.RGBA32F)&&e.get("EXT_color_buffer_float"),ue}function E(P,M,$){return A(P,$)===!0||P.isFramebufferTexture&&P.minFilter!==un&&P.minFilter!==Hn?Math.log2(Math.max(M.width,M.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?M.mipmaps.length:1}function b(P){return P===un||P===G0||P===Gd?t.NEAREST:t.LINEAR}function W(P){const M=P.target;M.removeEventListener("dispose",W),ne(M),M.isVideoTexture&&_.delete(M)}function j(P){const M=P.target;M.removeEventListener("dispose",j),q(M)}function ne(P){const M=r.get(P);if(M.__webglInit===void 0)return;const $=P.source,he=p.get($);if(he){const ce=he[M.__cacheKey];ce.usedTimes--,ce.usedTimes===0&&N(P),Object.keys(he).length===0&&p.delete($)}r.remove(P)}function N(P){const M=r.get(P);t.deleteTexture(M.__webglTexture);const $=P.source,he=p.get($);delete he[M.__cacheKey],s.memory.textures--}function q(P){const M=P.texture,$=r.get(P),he=r.get(M);if(he.__webglTexture!==void 0&&(t.deleteTexture(he.__webglTexture),s.memory.textures--),P.depthTexture&&P.depthTexture.dispose(),P.isWebGLCubeRenderTarget)for(let ce=0;ce<6;ce++){if(Array.isArray($.__webglFramebuffer[ce]))for(let ue=0;ue<$.__webglFramebuffer[ce].length;ue++)t.deleteFramebuffer($.__webglFramebuffer[ce][ue]);else t.deleteFramebuffer($.__webglFramebuffer[ce]);$.__webglDepthbuffer&&t.deleteRenderbuffer($.__webglDepthbuffer[ce])}else{if(Array.isArray($.__webglFramebuffer))for(let ce=0;ce<$.__webglFramebuffer.length;ce++)t.deleteFramebuffer($.__webglFramebuffer[ce]);else t.deleteFramebuffer($.__webglFramebuffer);if($.__webglDepthbuffer&&t.deleteRenderbuffer($.__webglDepthbuffer),$.__webglMultisampledFramebuffer&&t.deleteFramebuffer($.__webglMultisampledFramebuffer),$.__webglColorRenderbuffer)for(let ce=0;ce<$.__webglColorRenderbuffer.length;ce++)$.__webglColorRenderbuffer[ce]&&t.deleteRenderbuffer($.__webglColorRenderbuffer[ce]);$.__webglDepthRenderbuffer&&t.deleteRenderbuffer($.__webglDepthRenderbuffer)}if(P.isWebGLMultipleRenderTargets)for(let ce=0,ue=M.length;ce<ue;ce++){const Le=r.get(M[ce]);Le.__webglTexture&&(t.deleteTexture(Le.__webglTexture),s.memory.textures--),r.remove(M[ce])}r.remove(M),r.remove(P)}let ee=0;function J(){ee=0}function G(){const P=ee;return P>=l&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+l),ee+=1,P}function V(P){const M=[];return M.push(P.wrapS),M.push(P.wrapT),M.push(P.wrapR||0),M.push(P.magFilter),M.push(P.minFilter),M.push(P.anisotropy),M.push(P.internalFormat),M.push(P.format),M.push(P.type),M.push(P.generateMipmaps),M.push(P.premultiplyAlpha),M.push(P.flipY),M.push(P.unpackAlignment),M.push(P.colorSpace),M.join()}function H(P,M){const $=r.get(P);if(P.isVideoTexture&&ft(P),P.isRenderTargetTexture===!1&&P.version>0&&$.__version!==P.version){const he=P.image;if(he===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(he.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Te($,P,M);return}}n.bindTexture(t.TEXTURE_2D,$.__webglTexture,t.TEXTURE0+M)}function D(P,M){const $=r.get(P);if(P.version>0&&$.__version!==P.version){Te($,P,M);return}n.bindTexture(t.TEXTURE_2D_ARRAY,$.__webglTexture,t.TEXTURE0+M)}function L(P,M){const $=r.get(P);if(P.version>0&&$.__version!==P.version){Te($,P,M);return}n.bindTexture(t.TEXTURE_3D,$.__webglTexture,t.TEXTURE0+M)}function Y(P,M){const $=r.get(P);if(P.version>0&&$.__version!==P.version){De($,P,M);return}n.bindTexture(t.TEXTURE_CUBE_MAP,$.__webglTexture,t.TEXTURE0+M)}const Z={[Vh]:t.REPEAT,[ir]:t.CLAMP_TO_EDGE,[Gh]:t.MIRRORED_REPEAT},se={[un]:t.NEAREST,[G0]:t.NEAREST_MIPMAP_NEAREST,[Gd]:t.NEAREST_MIPMAP_LINEAR,[Hn]:t.LINEAR,[$P]:t.LINEAR_MIPMAP_NEAREST,[Da]:t.LINEAR_MIPMAP_LINEAR},B={[i2]:t.NEVER,[d2]:t.ALWAYS,[o2]:t.LESS,[a2]:t.LEQUAL,[s2]:t.EQUAL,[u2]:t.GEQUAL,[l2]:t.GREATER,[c2]:t.NOTEQUAL};function xe(P,M,$){if($?(t.texParameteri(P,t.TEXTURE_WRAP_S,Z[M.wrapS]),t.texParameteri(P,t.TEXTURE_WRAP_T,Z[M.wrapT]),(P===t.TEXTURE_3D||P===t.TEXTURE_2D_ARRAY)&&t.texParameteri(P,t.TEXTURE_WRAP_R,Z[M.wrapR]),t.texParameteri(P,t.TEXTURE_MAG_FILTER,se[M.magFilter]),t.texParameteri(P,t.TEXTURE_MIN_FILTER,se[M.minFilter])):(t.texParameteri(P,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(P,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),(P===t.TEXTURE_3D||P===t.TEXTURE_2D_ARRAY)&&t.texParameteri(P,t.TEXTURE_WRAP_R,t.CLAMP_TO_EDGE),(M.wrapS!==ir||M.wrapT!==ir)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),t.texParameteri(P,t.TEXTURE_MAG_FILTER,b(M.magFilter)),t.texParameteri(P,t.TEXTURE_MIN_FILTER,b(M.minFilter)),M.minFilter!==un&&M.minFilter!==Hn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),M.compareFunction&&(t.texParameteri(P,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(P,t.TEXTURE_COMPARE_FUNC,B[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const he=e.get("EXT_texture_filter_anisotropic");if(M.magFilter===un||M.minFilter!==Gd&&M.minFilter!==Da||M.type===di&&e.has("OES_texture_float_linear")===!1||a===!1&&M.type===Na&&e.has("OES_texture_half_float_linear")===!1)return;(M.anisotropy>1||r.get(M).__currentAnisotropy)&&(t.texParameterf(P,he.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),r.get(M).__currentAnisotropy=M.anisotropy)}}function oe(P,M){let $=!1;P.__webglInit===void 0&&(P.__webglInit=!0,M.addEventListener("dispose",W));const he=M.source;let ce=p.get(he);ce===void 0&&(ce={},p.set(he,ce));const ue=V(M);if(ue!==P.__cacheKey){ce[ue]===void 0&&(ce[ue]={texture:t.createTexture(),usedTimes:0},s.memory.textures++,$=!0),ce[ue].usedTimes++;const Le=ce[P.__cacheKey];Le!==void 0&&(ce[P.__cacheKey].usedTimes--,Le.usedTimes===0&&N(M)),P.__cacheKey=ue,P.__webglTexture=ce[ue].texture}return $}function Te(P,M,$){let he=t.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(he=t.TEXTURE_2D_ARRAY),M.isData3DTexture&&(he=t.TEXTURE_3D);const ce=oe(P,M),ue=M.source;n.bindTexture(he,P.__webglTexture,t.TEXTURE0+$);const Le=r.get(ue);if(ue.version!==Le.__version||ce===!0){n.activeTexture(t.TEXTURE0+$);const ge=at.getPrimaries(at.workingColorSpace),Se=M.colorSpace===Vn?null:at.getPrimaries(M.colorSpace),I=M.colorSpace===Vn||ge===Se?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,I);const me=w(M)&&x(M.image)===!1;let le=g(M.image,me,!1,u);le=gt(M,le);const ze=x(le)||a,Ne=o.convert(M.format,M.colorSpace);let ke=o.convert(M.type),Pe=C(M.internalFormat,Ne,ke,M.colorSpace,M.isVideoTexture);xe(he,M,ze);let be;const Qe=M.mipmaps,F=a&&M.isVideoTexture!==!0,ve=Le.__version===void 0||ce===!0,de=E(M,le,ze);if(M.isDepthTexture)Pe=t.DEPTH_COMPONENT,a?M.type===di?Pe=t.DEPTH_COMPONENT32F:M.type===ui?Pe=t.DEPTH_COMPONENT24:M.type===Qi?Pe=t.DEPTH24_STENCIL8:Pe=t.DEPTH_COMPONENT16:M.type===di&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),M.format===eo&&Pe===t.DEPTH_COMPONENT&&M.type!==gm&&M.type!==ui&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),M.type=ui,ke=o.convert(M.type)),M.format===ps&&Pe===t.DEPTH_COMPONENT&&(Pe=t.DEPTH_STENCIL,M.type!==Qi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),M.type=Qi,ke=o.convert(M.type))),ve&&(F?n.texStorage2D(t.TEXTURE_2D,1,Pe,le.width,le.height):n.texImage2D(t.TEXTURE_2D,0,Pe,le.width,le.height,0,Ne,ke,null));else if(M.isDataTexture)if(Qe.length>0&&ze){F&&ve&&n.texStorage2D(t.TEXTURE_2D,de,Pe,Qe[0].width,Qe[0].height);for(let ae=0,pe=Qe.length;ae<pe;ae++)be=Qe[ae],F?n.texSubImage2D(t.TEXTURE_2D,ae,0,0,be.width,be.height,Ne,ke,be.data):n.texImage2D(t.TEXTURE_2D,ae,Pe,be.width,be.height,0,Ne,ke,be.data);M.generateMipmaps=!1}else F?(ve&&n.texStorage2D(t.TEXTURE_2D,de,Pe,le.width,le.height),n.texSubImage2D(t.TEXTURE_2D,0,0,0,le.width,le.height,Ne,ke,le.data)):n.texImage2D(t.TEXTURE_2D,0,Pe,le.width,le.height,0,Ne,ke,le.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){F&&ve&&n.texStorage3D(t.TEXTURE_2D_ARRAY,de,Pe,Qe[0].width,Qe[0].height,le.depth);for(let ae=0,pe=Qe.length;ae<pe;ae++)be=Qe[ae],M.format!==or?Ne!==null?F?n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,ae,0,0,0,be.width,be.height,le.depth,Ne,be.data,0,0):n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,ae,Pe,be.width,be.height,le.depth,0,be.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):F?n.texSubImage3D(t.TEXTURE_2D_ARRAY,ae,0,0,0,be.width,be.height,le.depth,Ne,ke,be.data):n.texImage3D(t.TEXTURE_2D_ARRAY,ae,Pe,be.width,be.height,le.depth,0,Ne,ke,be.data)}else{F&&ve&&n.texStorage2D(t.TEXTURE_2D,de,Pe,Qe[0].width,Qe[0].height);for(let ae=0,pe=Qe.length;ae<pe;ae++)be=Qe[ae],M.format!==or?Ne!==null?F?n.compressedTexSubImage2D(t.TEXTURE_2D,ae,0,0,be.width,be.height,Ne,be.data):n.compressedTexImage2D(t.TEXTURE_2D,ae,Pe,be.width,be.height,0,be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):F?n.texSubImage2D(t.TEXTURE_2D,ae,0,0,be.width,be.height,Ne,ke,be.data):n.texImage2D(t.TEXTURE_2D,ae,Pe,be.width,be.height,0,Ne,ke,be.data)}else if(M.isDataArrayTexture)F?(ve&&n.texStorage3D(t.TEXTURE_2D_ARRAY,de,Pe,le.width,le.height,le.depth),n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,Ne,ke,le.data)):n.texImage3D(t.TEXTURE_2D_ARRAY,0,Pe,le.width,le.height,le.depth,0,Ne,ke,le.data);else if(M.isData3DTexture)F?(ve&&n.texStorage3D(t.TEXTURE_3D,de,Pe,le.width,le.height,le.depth),n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,Ne,ke,le.data)):n.texImage3D(t.TEXTURE_3D,0,Pe,le.width,le.height,le.depth,0,Ne,ke,le.data);else if(M.isFramebufferTexture){if(ve)if(F)n.texStorage2D(t.TEXTURE_2D,de,Pe,le.width,le.height);else{let ae=le.width,pe=le.height;for(let Oe=0;Oe<de;Oe++)n.texImage2D(t.TEXTURE_2D,Oe,Pe,ae,pe,0,Ne,ke,null),ae>>=1,pe>>=1}}else if(Qe.length>0&&ze){F&&ve&&n.texStorage2D(t.TEXTURE_2D,de,Pe,Qe[0].width,Qe[0].height);for(let ae=0,pe=Qe.length;ae<pe;ae++)be=Qe[ae],F?n.texSubImage2D(t.TEXTURE_2D,ae,0,0,Ne,ke,be):n.texImage2D(t.TEXTURE_2D,ae,Pe,Ne,ke,be);M.generateMipmaps=!1}else F?(ve&&n.texStorage2D(t.TEXTURE_2D,de,Pe,le.width,le.height),n.texSubImage2D(t.TEXTURE_2D,0,0,0,Ne,ke,le)):n.texImage2D(t.TEXTURE_2D,0,Pe,Ne,ke,le);A(M,ze)&&T(he),Le.__version=ue.version,M.onUpdate&&M.onUpdate(M)}P.__version=M.version}function De(P,M,$){if(M.image.length!==6)return;const he=oe(P,M),ce=M.source;n.bindTexture(t.TEXTURE_CUBE_MAP,P.__webglTexture,t.TEXTURE0+$);const ue=r.get(ce);if(ce.version!==ue.__version||he===!0){n.activeTexture(t.TEXTURE0+$);const Le=at.getPrimaries(at.workingColorSpace),ge=M.colorSpace===Vn?null:at.getPrimaries(M.colorSpace),Se=M.colorSpace===Vn||Le===ge?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);const I=M.isCompressedTexture||M.image[0].isCompressedTexture,me=M.image[0]&&M.image[0].isDataTexture,le=[];for(let ae=0;ae<6;ae++)!I&&!me?le[ae]=g(M.image[ae],!1,!0,c):le[ae]=me?M.image[ae].image:M.image[ae],le[ae]=gt(M,le[ae]);const ze=le[0],Ne=x(ze)||a,ke=o.convert(M.format,M.colorSpace),Pe=o.convert(M.type),be=C(M.internalFormat,ke,Pe,M.colorSpace),Qe=a&&M.isVideoTexture!==!0,F=ue.__version===void 0||he===!0;let ve=E(M,ze,Ne);xe(t.TEXTURE_CUBE_MAP,M,Ne);let de;if(I){Qe&&F&&n.texStorage2D(t.TEXTURE_CUBE_MAP,ve,be,ze.width,ze.height);for(let ae=0;ae<6;ae++){de=le[ae].mipmaps;for(let pe=0;pe<de.length;pe++){const Oe=de[pe];M.format!==or?ke!==null?Qe?n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,pe,0,0,Oe.width,Oe.height,ke,Oe.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,pe,be,Oe.width,Oe.height,0,Oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Qe?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,pe,0,0,Oe.width,Oe.height,ke,Pe,Oe.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,pe,be,Oe.width,Oe.height,0,ke,Pe,Oe.data)}}}else{de=M.mipmaps,Qe&&F&&(de.length>0&&ve++,n.texStorage2D(t.TEXTURE_CUBE_MAP,ve,be,le[0].width,le[0].height));for(let ae=0;ae<6;ae++)if(me){Qe?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,le[ae].width,le[ae].height,ke,Pe,le[ae].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,be,le[ae].width,le[ae].height,0,ke,Pe,le[ae].data);for(let pe=0;pe<de.length;pe++){const et=de[pe].image[ae].image;Qe?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,pe+1,0,0,et.width,et.height,ke,Pe,et.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,pe+1,be,et.width,et.height,0,ke,Pe,et.data)}}else{Qe?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,ke,Pe,le[ae]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,be,ke,Pe,le[ae]);for(let pe=0;pe<de.length;pe++){const Oe=de[pe];Qe?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,pe+1,0,0,ke,Pe,Oe.image[ae]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,pe+1,be,ke,Pe,Oe.image[ae])}}}A(M,Ne)&&T(t.TEXTURE_CUBE_MAP),ue.__version=ce.version,M.onUpdate&&M.onUpdate(M)}P.__version=M.version}function Ee(P,M,$,he,ce,ue){const Le=o.convert($.format,$.colorSpace),ge=o.convert($.type),Se=C($.internalFormat,Le,ge,$.colorSpace);if(!r.get(M).__hasExternalTextures){const me=Math.max(1,M.width>>ue),le=Math.max(1,M.height>>ue);ce===t.TEXTURE_3D||ce===t.TEXTURE_2D_ARRAY?n.texImage3D(ce,ue,Se,me,le,M.depth,0,Le,ge,null):n.texImage2D(ce,ue,Se,me,le,0,Le,ge,null)}n.bindFramebuffer(t.FRAMEBUFFER,P),Fe(M)?h.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,he,ce,r.get($).__webglTexture,0,Be(M)):(ce===t.TEXTURE_2D||ce>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&ce<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,he,ce,r.get($).__webglTexture,ue),n.bindFramebuffer(t.FRAMEBUFFER,null)}function z(P,M,$){if(t.bindRenderbuffer(t.RENDERBUFFER,P),M.depthBuffer&&!M.stencilBuffer){let he=a===!0?t.DEPTH_COMPONENT24:t.DEPTH_COMPONENT16;if($||Fe(M)){const ce=M.depthTexture;ce&&ce.isDepthTexture&&(ce.type===di?he=t.DEPTH_COMPONENT32F:ce.type===ui&&(he=t.DEPTH_COMPONENT24));const ue=Be(M);Fe(M)?h.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ue,he,M.width,M.height):t.renderbufferStorageMultisample(t.RENDERBUFFER,ue,he,M.width,M.height)}else t.renderbufferStorage(t.RENDERBUFFER,he,M.width,M.height);t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,P)}else if(M.depthBuffer&&M.stencilBuffer){const he=Be(M);$&&Fe(M)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,he,t.DEPTH24_STENCIL8,M.width,M.height):Fe(M)?h.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,he,t.DEPTH24_STENCIL8,M.width,M.height):t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_STENCIL,M.width,M.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.RENDERBUFFER,P)}else{const he=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let ce=0;ce<he.length;ce++){const ue=he[ce],Le=o.convert(ue.format,ue.colorSpace),ge=o.convert(ue.type),Se=C(ue.internalFormat,Le,ge,ue.colorSpace),I=Be(M);$&&Fe(M)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,I,Se,M.width,M.height):Fe(M)?h.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,I,Se,M.width,M.height):t.renderbufferStorage(t.RENDERBUFFER,Se,M.width,M.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function rt(P,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,P),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!r.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),H(M.depthTexture,0);const he=r.get(M.depthTexture).__webglTexture,ce=Be(M);if(M.depthTexture.format===eo)Fe(M)?h.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,he,0,ce):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,he,0);else if(M.depthTexture.format===ps)Fe(M)?h.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,he,0,ce):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,he,0);else throw new Error("Unknown depthTexture format")}function we(P){const M=r.get(P),$=P.isWebGLCubeRenderTarget===!0;if(P.depthTexture&&!M.__autoAllocateDepthBuffer){if($)throw new Error("target.depthTexture not supported in Cube render targets");rt(M.__webglFramebuffer,P)}else if($){M.__webglDepthbuffer=[];for(let he=0;he<6;he++)n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer[he]),M.__webglDepthbuffer[he]=t.createRenderbuffer(),z(M.__webglDepthbuffer[he],P,!1)}else n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=t.createRenderbuffer(),z(M.__webglDepthbuffer,P,!1);n.bindFramebuffer(t.FRAMEBUFFER,null)}function _e(P,M,$){const he=r.get(P);M!==void 0&&Ee(he.__webglFramebuffer,P,P.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),$!==void 0&&we(P)}function Re(P){const M=P.texture,$=r.get(P),he=r.get(M);P.addEventListener("dispose",j),P.isWebGLMultipleRenderTargets!==!0&&(he.__webglTexture===void 0&&(he.__webglTexture=t.createTexture()),he.__version=M.version,s.memory.textures++);const ce=P.isWebGLCubeRenderTarget===!0,ue=P.isWebGLMultipleRenderTargets===!0,Le=x(P)||a;if(ce){$.__webglFramebuffer=[];for(let ge=0;ge<6;ge++)if(a&&M.mipmaps&&M.mipmaps.length>0){$.__webglFramebuffer[ge]=[];for(let Se=0;Se<M.mipmaps.length;Se++)$.__webglFramebuffer[ge][Se]=t.createFramebuffer()}else $.__webglFramebuffer[ge]=t.createFramebuffer()}else{if(a&&M.mipmaps&&M.mipmaps.length>0){$.__webglFramebuffer=[];for(let ge=0;ge<M.mipmaps.length;ge++)$.__webglFramebuffer[ge]=t.createFramebuffer()}else $.__webglFramebuffer=t.createFramebuffer();if(ue)if(i.drawBuffers){const ge=P.texture;for(let Se=0,I=ge.length;Se<I;Se++){const me=r.get(ge[Se]);me.__webglTexture===void 0&&(me.__webglTexture=t.createTexture(),s.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&P.samples>0&&Fe(P)===!1){const ge=ue?M:[M];$.__webglMultisampledFramebuffer=t.createFramebuffer(),$.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let Se=0;Se<ge.length;Se++){const I=ge[Se];$.__webglColorRenderbuffer[Se]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,$.__webglColorRenderbuffer[Se]);const me=o.convert(I.format,I.colorSpace),le=o.convert(I.type),ze=C(I.internalFormat,me,le,I.colorSpace,P.isXRRenderTarget===!0),Ne=Be(P);t.renderbufferStorageMultisample(t.RENDERBUFFER,Ne,ze,P.width,P.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Se,t.RENDERBUFFER,$.__webglColorRenderbuffer[Se])}t.bindRenderbuffer(t.RENDERBUFFER,null),P.depthBuffer&&($.__webglDepthRenderbuffer=t.createRenderbuffer(),z($.__webglDepthRenderbuffer,P,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(ce){n.bindTexture(t.TEXTURE_CUBE_MAP,he.__webglTexture),xe(t.TEXTURE_CUBE_MAP,M,Le);for(let ge=0;ge<6;ge++)if(a&&M.mipmaps&&M.mipmaps.length>0)for(let Se=0;Se<M.mipmaps.length;Se++)Ee($.__webglFramebuffer[ge][Se],P,M,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Se);else Ee($.__webglFramebuffer[ge],P,M,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0);A(M,Le)&&T(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(ue){const ge=P.texture;for(let Se=0,I=ge.length;Se<I;Se++){const me=ge[Se],le=r.get(me);n.bindTexture(t.TEXTURE_2D,le.__webglTexture),xe(t.TEXTURE_2D,me,Le),Ee($.__webglFramebuffer,P,me,t.COLOR_ATTACHMENT0+Se,t.TEXTURE_2D,0),A(me,Le)&&T(t.TEXTURE_2D)}n.unbindTexture()}else{let ge=t.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(a?ge=P.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),n.bindTexture(ge,he.__webglTexture),xe(ge,M,Le),a&&M.mipmaps&&M.mipmaps.length>0)for(let Se=0;Se<M.mipmaps.length;Se++)Ee($.__webglFramebuffer[Se],P,M,t.COLOR_ATTACHMENT0,ge,Se);else Ee($.__webglFramebuffer,P,M,t.COLOR_ATTACHMENT0,ge,0);A(M,Le)&&T(ge),n.unbindTexture()}P.depthBuffer&&we(P)}function Ie(P){const M=x(P)||a,$=P.isWebGLMultipleRenderTargets===!0?P.texture:[P.texture];for(let he=0,ce=$.length;he<ce;he++){const ue=$[he];if(A(ue,M)){const Le=P.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:t.TEXTURE_2D,ge=r.get(ue).__webglTexture;n.bindTexture(Le,ge),T(Le),n.unbindTexture()}}}function Ce(P){if(a&&P.samples>0&&Fe(P)===!1){const M=P.isWebGLMultipleRenderTargets?P.texture:[P.texture],$=P.width,he=P.height;let ce=t.COLOR_BUFFER_BIT;const ue=[],Le=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ge=r.get(P),Se=P.isWebGLMultipleRenderTargets===!0;if(Se)for(let I=0;I<M.length;I++)n.bindFramebuffer(t.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+I,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,ge.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+I,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,ge.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ge.__webglFramebuffer);for(let I=0;I<M.length;I++){ue.push(t.COLOR_ATTACHMENT0+I),P.depthBuffer&&ue.push(Le);const me=ge.__ignoreDepthValues!==void 0?ge.__ignoreDepthValues:!1;if(me===!1&&(P.depthBuffer&&(ce|=t.DEPTH_BUFFER_BIT),P.stencilBuffer&&(ce|=t.STENCIL_BUFFER_BIT)),Se&&t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,ge.__webglColorRenderbuffer[I]),me===!0&&(t.invalidateFramebuffer(t.READ_FRAMEBUFFER,[Le]),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[Le])),Se){const le=r.get(M[I]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,le,0)}t.blitFramebuffer(0,0,$,he,0,0,$,he,ce,t.NEAREST),v&&t.invalidateFramebuffer(t.READ_FRAMEBUFFER,ue)}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),Se)for(let I=0;I<M.length;I++){n.bindFramebuffer(t.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+I,t.RENDERBUFFER,ge.__webglColorRenderbuffer[I]);const me=r.get(M[I]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,ge.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+I,t.TEXTURE_2D,me,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ge.__webglMultisampledFramebuffer)}}function Be(P){return Math.min(f,P.samples)}function Fe(P){const M=r.get(P);return a&&P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function ft(P){const M=s.render.frame;_.get(P)!==M&&(_.set(P,M),P.update())}function gt(P,M){const $=P.colorSpace,he=P.format,ce=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||P.format===Wh||$!==jr&&$!==Vn&&(at.getTransfer($)===pt?a===!1?e.has("EXT_sRGB")===!0&&he===or?(P.format=Wh,P.minFilter=Hn,P.generateMipmaps=!1):M=eE.sRGBToLinear(M):(he!==or||ce!==Ti)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",$)),M}this.allocateTextureUnit=G,this.resetTextureUnits=J,this.setTexture2D=H,this.setTexture2DArray=D,this.setTexture3D=L,this.setTextureCube=Y,this.rebindTextures=_e,this.setupRenderTarget=Re,this.updateRenderTargetMipmap=Ie,this.updateMultisampleRenderTarget=Ce,this.setupDepthRenderbuffer=we,this.setupFrameBufferTexture=Ee,this.useMultisampledRTT=Fe}function wI(t,e,n){const r=n.isWebGL2;function i(o,s=Vn){let a;const l=at.getTransfer(s);if(o===Ti)return t.UNSIGNED_BYTE;if(o===jS)return t.UNSIGNED_SHORT_4_4_4_4;if(o===XS)return t.UNSIGNED_SHORT_5_5_5_1;if(o===jP)return t.BYTE;if(o===XP)return t.SHORT;if(o===gm)return t.UNSIGNED_SHORT;if(o===$S)return t.INT;if(o===ui)return t.UNSIGNED_INT;if(o===di)return t.FLOAT;if(o===Na)return r?t.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(o===qP)return t.ALPHA;if(o===or)return t.RGBA;if(o===YP)return t.LUMINANCE;if(o===KP)return t.LUMINANCE_ALPHA;if(o===eo)return t.DEPTH_COMPONENT;if(o===ps)return t.DEPTH_STENCIL;if(o===Wh)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(o===ZP)return t.RED;if(o===qS)return t.RED_INTEGER;if(o===JP)return t.RG;if(o===YS)return t.RG_INTEGER;if(o===KS)return t.RGBA_INTEGER;if(o===Wd||o===$d||o===jd||o===Xd)if(l===pt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(o===Wd)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(o===$d)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(o===jd)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(o===Xd)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(o===Wd)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(o===$d)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(o===jd)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(o===Xd)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(o===W0||o===$0||o===j0||o===X0)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(o===W0)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(o===$0)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(o===j0)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(o===X0)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(o===QP)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(o===q0||o===Y0)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(o===q0)return l===pt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(o===Y0)return l===pt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(o===K0||o===Z0||o===J0||o===Q0||o===ev||o===tv||o===nv||o===rv||o===iv||o===ov||o===sv||o===av||o===lv||o===cv)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(o===K0)return l===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(o===Z0)return l===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(o===J0)return l===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(o===Q0)return l===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(o===ev)return l===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(o===tv)return l===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(o===nv)return l===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(o===rv)return l===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(o===iv)return l===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(o===ov)return l===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(o===sv)return l===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(o===av)return l===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(o===lv)return l===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(o===cv)return l===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(o===qd||o===uv||o===dv)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(o===qd)return l===pt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(o===uv)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(o===dv)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(o===e2||o===fv||o===hv||o===pv)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(o===qd)return a.COMPRESSED_RED_RGTC1_EXT;if(o===fv)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(o===hv)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(o===pv)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return o===Qi?r?t.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):t[o]!==void 0?t[o]:null}return{convert:i}}class MI extends dn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Gl extends Gt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const TI={type:"move"};class _f{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Gl,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Gl,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new K,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new K),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Gl,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new K,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new K),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const r of e.hand.values())this._getHandJoint(n,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,r){let i=null,o=null,s=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){s=!0;for(const y of e.hand.values()){const p=n.getJointPose(y,r),d=this._getHandJoint(c,y);p!==null&&(d.matrix.fromArray(p.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=p.radius),d.visible=p!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),v=.02,_=.005;c.inputState.pinching&&h>v+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=v-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(o=n.getPose(e.gripSpace,r),o!==null&&(l.matrix.fromArray(o.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,o.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(o.linearVelocity)):l.hasLinearVelocity=!1,o.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(o.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=n.getPose(e.targetRaySpace,r),i===null&&o!==null&&(i=o),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(TI)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=o!==null),c!==null&&(c.visible=s!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const r=new Gl;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[n.jointName]=r,e.add(r)}return e.joints[n.jointName]}}class bI extends Ln{constructor(e,n,r,i,o,s,a,l,c,u){if(u=u!==void 0?u:eo,u!==eo&&u!==ps)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");r===void 0&&u===eo&&(r=ui),r===void 0&&u===ps&&(r=Qi),super(null,i,o,s,a,l,u,r,c),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=a!==void 0?a:un,this.minFilter=l!==void 0?l:un,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class AI extends ho{constructor(e,n){super();const r=this;let i=null,o=1,s=null,a="local-floor",l=1,c=null,u=null,f=null,h=null,v=null,_=null;const y=n.getContextAttributes();let p=null,d=null;const m=[],g=[],x=new dn;x.layers.enable(1),x.viewport=new Ht;const w=new dn;w.layers.enable(2),w.viewport=new Ht;const A=[x,w],T=new MI;T.layers.enable(1),T.layers.enable(2);let C=null,E=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(D){let L=m[D];return L===void 0&&(L=new _f,m[D]=L),L.getTargetRaySpace()},this.getControllerGrip=function(D){let L=m[D];return L===void 0&&(L=new _f,m[D]=L),L.getGripSpace()},this.getHand=function(D){let L=m[D];return L===void 0&&(L=new _f,m[D]=L),L.getHandSpace()};function b(D){const L=g.indexOf(D.inputSource);if(L===-1)return;const Y=m[L];Y!==void 0&&(Y.update(D.inputSource,D.frame,c||s),Y.dispatchEvent({type:D.type,data:D.inputSource}))}function W(){i.removeEventListener("select",b),i.removeEventListener("selectstart",b),i.removeEventListener("selectend",b),i.removeEventListener("squeeze",b),i.removeEventListener("squeezestart",b),i.removeEventListener("squeezeend",b),i.removeEventListener("end",W),i.removeEventListener("inputsourceschange",j);for(let D=0;D<m.length;D++){const L=g[D];L!==null&&(g[D]=null,m[D].disconnect(L))}C=null,E=null,e.setRenderTarget(p),v=null,h=null,f=null,i=null,d=null,H.stop(),r.isPresenting=!1,r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(D){o=D,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(D){a=D,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||s},this.setReferenceSpace=function(D){c=D},this.getBaseLayer=function(){return h!==null?h:v},this.getBinding=function(){return f},this.getFrame=function(){return _},this.getSession=function(){return i},this.setSession=async function(D){if(i=D,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",b),i.addEventListener("selectstart",b),i.addEventListener("selectend",b),i.addEventListener("squeeze",b),i.addEventListener("squeezestart",b),i.addEventListener("squeezeend",b),i.addEventListener("end",W),i.addEventListener("inputsourceschange",j),y.xrCompatible!==!0&&await n.makeXRCompatible(),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const L={antialias:i.renderState.layers===void 0?y.antialias:!0,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:o};v=new XRWebGLLayer(i,n,L),i.updateRenderState({baseLayer:v}),d=new lo(v.framebufferWidth,v.framebufferHeight,{format:or,type:Ti,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil})}else{let L=null,Y=null,Z=null;y.depth&&(Z=y.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,L=y.stencil?ps:eo,Y=y.stencil?Qi:ui);const se={colorFormat:n.RGBA8,depthFormat:Z,scaleFactor:o};f=new XRWebGLBinding(i,n),h=f.createProjectionLayer(se),i.updateRenderState({layers:[h]}),d=new lo(h.textureWidth,h.textureHeight,{format:or,type:Ti,depthTexture:new bI(h.textureWidth,h.textureHeight,Y,void 0,void 0,void 0,void 0,void 0,void 0,L),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0});const B=e.properties.get(d);B.__ignoreDepthValues=h.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(l),c=null,s=await i.requestReferenceSpace(a),H.setContext(i),H.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function j(D){for(let L=0;L<D.removed.length;L++){const Y=D.removed[L],Z=g.indexOf(Y);Z>=0&&(g[Z]=null,m[Z].disconnect(Y))}for(let L=0;L<D.added.length;L++){const Y=D.added[L];let Z=g.indexOf(Y);if(Z===-1){for(let B=0;B<m.length;B++)if(B>=g.length){g.push(Y),Z=B;break}else if(g[B]===null){g[B]=Y,Z=B;break}if(Z===-1)break}const se=m[Z];se&&se.connect(Y)}}const ne=new K,N=new K;function q(D,L,Y){ne.setFromMatrixPosition(L.matrixWorld),N.setFromMatrixPosition(Y.matrixWorld);const Z=ne.distanceTo(N),se=L.projectionMatrix.elements,B=Y.projectionMatrix.elements,xe=se[14]/(se[10]-1),oe=se[14]/(se[10]+1),Te=(se[9]+1)/se[5],De=(se[9]-1)/se[5],Ee=(se[8]-1)/se[0],z=(B[8]+1)/B[0],rt=xe*Ee,we=xe*z,_e=Z/(-Ee+z),Re=_e*-Ee;L.matrixWorld.decompose(D.position,D.quaternion,D.scale),D.translateX(Re),D.translateZ(_e),D.matrixWorld.compose(D.position,D.quaternion,D.scale),D.matrixWorldInverse.copy(D.matrixWorld).invert();const Ie=xe+_e,Ce=oe+_e,Be=rt-Re,Fe=we+(Z-Re),ft=Te*oe/Ce*Ie,gt=De*oe/Ce*Ie;D.projectionMatrix.makePerspective(Be,Fe,ft,gt,Ie,Ce),D.projectionMatrixInverse.copy(D.projectionMatrix).invert()}function ee(D,L){L===null?D.matrixWorld.copy(D.matrix):D.matrixWorld.multiplyMatrices(L.matrixWorld,D.matrix),D.matrixWorldInverse.copy(D.matrixWorld).invert()}this.updateCamera=function(D){if(i===null)return;T.near=w.near=x.near=D.near,T.far=w.far=x.far=D.far,(C!==T.near||E!==T.far)&&(i.updateRenderState({depthNear:T.near,depthFar:T.far}),C=T.near,E=T.far);const L=D.parent,Y=T.cameras;ee(T,L);for(let Z=0;Z<Y.length;Z++)ee(Y[Z],L);Y.length===2?q(T,x,w):T.projectionMatrix.copy(x.projectionMatrix),J(D,T,L)};function J(D,L,Y){Y===null?D.matrix.copy(L.matrixWorld):(D.matrix.copy(Y.matrixWorld),D.matrix.invert(),D.matrix.multiply(L.matrixWorld)),D.matrix.decompose(D.position,D.quaternion,D.scale),D.updateMatrixWorld(!0),D.projectionMatrix.copy(L.projectionMatrix),D.projectionMatrixInverse.copy(L.projectionMatrixInverse),D.isPerspectiveCamera&&(D.fov=ms*2*Math.atan(1/D.projectionMatrix.elements[5]),D.zoom=1)}this.getCamera=function(){return T},this.getFoveation=function(){if(!(h===null&&v===null))return l},this.setFoveation=function(D){l=D,h!==null&&(h.fixedFoveation=D),v!==null&&v.fixedFoveation!==void 0&&(v.fixedFoveation=D)};let G=null;function V(D,L){if(u=L.getViewerPose(c||s),_=L,u!==null){const Y=u.views;v!==null&&(e.setRenderTargetFramebuffer(d,v.framebuffer),e.setRenderTarget(d));let Z=!1;Y.length!==T.cameras.length&&(T.cameras.length=0,Z=!0);for(let se=0;se<Y.length;se++){const B=Y[se];let xe=null;if(v!==null)xe=v.getViewport(B);else{const Te=f.getViewSubImage(h,B);xe=Te.viewport,se===0&&(e.setRenderTargetTextures(d,Te.colorTexture,h.ignoreDepthValues?void 0:Te.depthStencilTexture),e.setRenderTarget(d))}let oe=A[se];oe===void 0&&(oe=new dn,oe.layers.enable(se),oe.viewport=new Ht,A[se]=oe),oe.matrix.fromArray(B.transform.matrix),oe.matrix.decompose(oe.position,oe.quaternion,oe.scale),oe.projectionMatrix.fromArray(B.projectionMatrix),oe.projectionMatrixInverse.copy(oe.projectionMatrix).invert(),oe.viewport.set(xe.x,xe.y,xe.width,xe.height),se===0&&(T.matrix.copy(oe.matrix),T.matrix.decompose(T.position,T.quaternion,T.scale)),Z===!0&&T.cameras.push(oe)}}for(let Y=0;Y<m.length;Y++){const Z=g[Y],se=m[Y];Z!==null&&se!==void 0&&se.update(Z,L,c||s)}G&&G(D,L),L.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:L}),_=null}const H=new uE;H.setAnimationLoop(V),this.setAnimationLoop=function(D){G=D},this.dispose=function(){}}}function RI(t,e){function n(p,d){p.matrixAutoUpdate===!0&&p.updateMatrix(),d.value.copy(p.matrix)}function r(p,d){d.color.getRGB(p.fogColor.value,aE(t)),d.isFog?(p.fogNear.value=d.near,p.fogFar.value=d.far):d.isFogExp2&&(p.fogDensity.value=d.density)}function i(p,d,m,g,x){d.isMeshBasicMaterial||d.isMeshLambertMaterial?o(p,d):d.isMeshToonMaterial?(o(p,d),f(p,d)):d.isMeshPhongMaterial?(o(p,d),u(p,d)):d.isMeshStandardMaterial?(o(p,d),h(p,d),d.isMeshPhysicalMaterial&&v(p,d,x)):d.isMeshMatcapMaterial?(o(p,d),_(p,d)):d.isMeshDepthMaterial?o(p,d):d.isMeshDistanceMaterial?(o(p,d),y(p,d)):d.isMeshNormalMaterial?o(p,d):d.isLineBasicMaterial?(s(p,d),d.isLineDashedMaterial&&a(p,d)):d.isPointsMaterial?l(p,d,m,g):d.isSpriteMaterial?c(p,d):d.isShadowMaterial?(p.color.value.copy(d.color),p.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function o(p,d){p.opacity.value=d.opacity,d.color&&p.diffuse.value.copy(d.color),d.emissive&&p.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(p.map.value=d.map,n(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,n(d.alphaMap,p.alphaMapTransform)),d.bumpMap&&(p.bumpMap.value=d.bumpMap,n(d.bumpMap,p.bumpMapTransform),p.bumpScale.value=d.bumpScale,d.side===En&&(p.bumpScale.value*=-1)),d.normalMap&&(p.normalMap.value=d.normalMap,n(d.normalMap,p.normalMapTransform),p.normalScale.value.copy(d.normalScale),d.side===En&&p.normalScale.value.negate()),d.displacementMap&&(p.displacementMap.value=d.displacementMap,n(d.displacementMap,p.displacementMapTransform),p.displacementScale.value=d.displacementScale,p.displacementBias.value=d.displacementBias),d.emissiveMap&&(p.emissiveMap.value=d.emissiveMap,n(d.emissiveMap,p.emissiveMapTransform)),d.specularMap&&(p.specularMap.value=d.specularMap,n(d.specularMap,p.specularMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);const m=e.get(d).envMap;if(m&&(p.envMap.value=m,p.flipEnvMap.value=m.isCubeTexture&&m.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=d.reflectivity,p.ior.value=d.ior,p.refractionRatio.value=d.refractionRatio),d.lightMap){p.lightMap.value=d.lightMap;const g=t._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=d.lightMapIntensity*g,n(d.lightMap,p.lightMapTransform)}d.aoMap&&(p.aoMap.value=d.aoMap,p.aoMapIntensity.value=d.aoMapIntensity,n(d.aoMap,p.aoMapTransform))}function s(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,d.map&&(p.map.value=d.map,n(d.map,p.mapTransform))}function a(p,d){p.dashSize.value=d.dashSize,p.totalSize.value=d.dashSize+d.gapSize,p.scale.value=d.scale}function l(p,d,m,g){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.size.value=d.size*m,p.scale.value=g*.5,d.map&&(p.map.value=d.map,n(d.map,p.uvTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,n(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function c(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.rotation.value=d.rotation,d.map&&(p.map.value=d.map,n(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,n(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function u(p,d){p.specular.value.copy(d.specular),p.shininess.value=Math.max(d.shininess,1e-4)}function f(p,d){d.gradientMap&&(p.gradientMap.value=d.gradientMap)}function h(p,d){p.metalness.value=d.metalness,d.metalnessMap&&(p.metalnessMap.value=d.metalnessMap,n(d.metalnessMap,p.metalnessMapTransform)),p.roughness.value=d.roughness,d.roughnessMap&&(p.roughnessMap.value=d.roughnessMap,n(d.roughnessMap,p.roughnessMapTransform)),e.get(d).envMap&&(p.envMapIntensity.value=d.envMapIntensity)}function v(p,d,m){p.ior.value=d.ior,d.sheen>0&&(p.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),p.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(p.sheenColorMap.value=d.sheenColorMap,n(d.sheenColorMap,p.sheenColorMapTransform)),d.sheenRoughnessMap&&(p.sheenRoughnessMap.value=d.sheenRoughnessMap,n(d.sheenRoughnessMap,p.sheenRoughnessMapTransform))),d.clearcoat>0&&(p.clearcoat.value=d.clearcoat,p.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(p.clearcoatMap.value=d.clearcoatMap,n(d.clearcoatMap,p.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,n(d.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(p.clearcoatNormalMap.value=d.clearcoatNormalMap,n(d.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===En&&p.clearcoatNormalScale.value.negate())),d.iridescence>0&&(p.iridescence.value=d.iridescence,p.iridescenceIOR.value=d.iridescenceIOR,p.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(p.iridescenceMap.value=d.iridescenceMap,n(d.iridescenceMap,p.iridescenceMapTransform)),d.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=d.iridescenceThicknessMap,n(d.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),d.transmission>0&&(p.transmission.value=d.transmission,p.transmissionSamplerMap.value=m.texture,p.transmissionSamplerSize.value.set(m.width,m.height),d.transmissionMap&&(p.transmissionMap.value=d.transmissionMap,n(d.transmissionMap,p.transmissionMapTransform)),p.thickness.value=d.thickness,d.thicknessMap&&(p.thicknessMap.value=d.thicknessMap,n(d.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=d.attenuationDistance,p.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(p.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(p.anisotropyMap.value=d.anisotropyMap,n(d.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=d.specularIntensity,p.specularColor.value.copy(d.specularColor),d.specularColorMap&&(p.specularColorMap.value=d.specularColorMap,n(d.specularColorMap,p.specularColorMapTransform)),d.specularIntensityMap&&(p.specularIntensityMap.value=d.specularIntensityMap,n(d.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,d){d.matcap&&(p.matcap.value=d.matcap)}function y(p,d){const m=e.get(d).light;p.referencePosition.value.setFromMatrixPosition(m.matrixWorld),p.nearDistance.value=m.shadow.camera.near,p.farDistance.value=m.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function CI(t,e,n,r){let i={},o={},s=[];const a=n.isWebGL2?t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(m,g){const x=g.program;r.uniformBlockBinding(m,x)}function c(m,g){let x=i[m.id];x===void 0&&(_(m),x=u(m),i[m.id]=x,m.addEventListener("dispose",p));const w=g.program;r.updateUBOMapping(m,w);const A=e.render.frame;o[m.id]!==A&&(h(m),o[m.id]=A)}function u(m){const g=f();m.__bindingPointIndex=g;const x=t.createBuffer(),w=m.__size,A=m.usage;return t.bindBuffer(t.UNIFORM_BUFFER,x),t.bufferData(t.UNIFORM_BUFFER,w,A),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,g,x),x}function f(){for(let m=0;m<a;m++)if(s.indexOf(m)===-1)return s.push(m),m;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(m){const g=i[m.id],x=m.uniforms,w=m.__cache;t.bindBuffer(t.UNIFORM_BUFFER,g);for(let A=0,T=x.length;A<T;A++){const C=x[A];if(v(C,A,w)===!0){const E=C.__offset,b=Array.isArray(C.value)?C.value:[C.value];let W=0;for(let j=0;j<b.length;j++){const ne=b[j],N=y(ne);typeof ne=="number"?(C.__data[0]=ne,t.bufferSubData(t.UNIFORM_BUFFER,E+W,C.__data)):ne.isMatrix3?(C.__data[0]=ne.elements[0],C.__data[1]=ne.elements[1],C.__data[2]=ne.elements[2],C.__data[3]=ne.elements[0],C.__data[4]=ne.elements[3],C.__data[5]=ne.elements[4],C.__data[6]=ne.elements[5],C.__data[7]=ne.elements[0],C.__data[8]=ne.elements[6],C.__data[9]=ne.elements[7],C.__data[10]=ne.elements[8],C.__data[11]=ne.elements[0]):(ne.toArray(C.__data,W),W+=N.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,E,C.__data)}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function v(m,g,x){const w=m.value;if(x[g]===void 0){if(typeof w=="number")x[g]=w;else{const A=Array.isArray(w)?w:[w],T=[];for(let C=0;C<A.length;C++)T.push(A[C].clone());x[g]=T}return!0}else if(typeof w=="number"){if(x[g]!==w)return x[g]=w,!0}else{const A=Array.isArray(x[g])?x[g]:[x[g]],T=Array.isArray(w)?w:[w];for(let C=0;C<A.length;C++){const E=A[C];if(E.equals(T[C])===!1)return E.copy(T[C]),!0}}return!1}function _(m){const g=m.uniforms;let x=0;const w=16;let A=0;for(let T=0,C=g.length;T<C;T++){const E=g[T],b={boundary:0,storage:0},W=Array.isArray(E.value)?E.value:[E.value];for(let j=0,ne=W.length;j<ne;j++){const N=W[j],q=y(N);b.boundary+=q.boundary,b.storage+=q.storage}if(E.__data=new Float32Array(b.storage/Float32Array.BYTES_PER_ELEMENT),E.__offset=x,T>0){A=x%w;const j=w-A;A!==0&&j-b.boundary<0&&(x+=w-A,E.__offset=x)}x+=b.storage}return A=x%w,A>0&&(x+=w-A),m.__size=x,m.__cache={},this}function y(m){const g={boundary:0,storage:0};return typeof m=="number"?(g.boundary=4,g.storage=4):m.isVector2?(g.boundary=8,g.storage=8):m.isVector3||m.isColor?(g.boundary=16,g.storage=12):m.isVector4?(g.boundary=16,g.storage=16):m.isMatrix3?(g.boundary=48,g.storage=48):m.isMatrix4?(g.boundary=64,g.storage=64):m.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",m),g}function p(m){const g=m.target;g.removeEventListener("dispose",p);const x=s.indexOf(g.__bindingPointIndex);s.splice(x,1),t.deleteBuffer(i[g.id]),delete i[g.id],delete o[g.id]}function d(){for(const m in i)t.deleteBuffer(i[m]);s=[],i={},o={}}return{bind:l,update:c,dispose:d}}class Qu{constructor(e={}){const{canvas:n=A2(),context:r=null,depth:i=!0,stencil:o=!0,alpha:s=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let h;r!==null?h=r.getContextAttributes().alpha:h=s;const v=new Uint32Array(4),_=new Int32Array(4);let y=null,p=null;const d=[],m=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=jt,this._useLegacyLights=!1,this.toneMapping=Mi,this.toneMappingExposure=1;const g=this;let x=!1,w=0,A=0,T=null,C=-1,E=null;const b=new Ht,W=new Ht;let j=null;const ne=new nt(0);let N=0,q=n.width,ee=n.height,J=1,G=null,V=null;const H=new Ht(0,0,q,ee),D=new Ht(0,0,q,ee);let L=!1;const Y=new Em;let Z=!1,se=!1,B=null;const xe=new Ut,oe=new Ge,Te=new K,De={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ee(){return T===null?J:1}let z=r;function rt(R,X){for(let te=0;te<R.length;te++){const re=R[te],ie=n.getContext(re,X);if(ie!==null)return ie}return null}try{const R={alpha:!0,depth:i,stencil:o,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${mm}`),n.addEventListener("webglcontextlost",Qe,!1),n.addEventListener("webglcontextrestored",F,!1),n.addEventListener("webglcontextcreationerror",ve,!1),z===null){const X=["webgl2","webgl","experimental-webgl"];if(g.isWebGL1Renderer===!0&&X.shift(),z=rt(X,R),z===null)throw rt(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&z instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),z.getShaderPrecisionFormat===void 0&&(z.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let we,_e,Re,Ie,Ce,Be,Fe,ft,gt,P,M,$,he,ce,ue,Le,ge,Se,I,me,le,ze,Ne,ke;function Pe(){we=new B3(z),_e=new N3(z,we,e),we.init(_e),ze=new wI(z,we,_e),Re=new SI(z,we,_e),Ie=new V3(z),Ce=new aI,Be=new EI(z,we,Re,Ce,_e,ze,Ie),Fe=new U3(g),ft=new F3(g),gt=new J2(z,_e),Ne=new L3(z,we,gt,_e),P=new z3(z,gt,Ie,Ne),M=new j3(z,P,gt,Ie),I=new $3(z,_e,Be),Le=new I3(Ce),$=new sI(g,Fe,ft,we,_e,Ne,Le),he=new RI(g,Ce),ce=new cI,ue=new mI(we,_e),Se=new P3(g,Fe,ft,Re,M,h,l),ge=new xI(g,M,_e),ke=new CI(z,Ie,_e,Re),me=new D3(z,we,Ie,_e),le=new H3(z,we,Ie,_e),Ie.programs=$.programs,g.capabilities=_e,g.extensions=we,g.properties=Ce,g.renderLists=ce,g.shadowMap=ge,g.state=Re,g.info=Ie}Pe();const be=new AI(g,z);this.xr=be,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const R=we.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=we.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(R){R!==void 0&&(J=R,this.setSize(q,ee,!1))},this.getSize=function(R){return R.set(q,ee)},this.setSize=function(R,X,te=!0){if(be.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=R,ee=X,n.width=Math.floor(R*J),n.height=Math.floor(X*J),te===!0&&(n.style.width=R+"px",n.style.height=X+"px"),this.setViewport(0,0,R,X)},this.getDrawingBufferSize=function(R){return R.set(q*J,ee*J).floor()},this.setDrawingBufferSize=function(R,X,te){q=R,ee=X,J=te,n.width=Math.floor(R*te),n.height=Math.floor(X*te),this.setViewport(0,0,R,X)},this.getCurrentViewport=function(R){return R.copy(b)},this.getViewport=function(R){return R.copy(H)},this.setViewport=function(R,X,te,re){R.isVector4?H.set(R.x,R.y,R.z,R.w):H.set(R,X,te,re),Re.viewport(b.copy(H).multiplyScalar(J).floor())},this.getScissor=function(R){return R.copy(D)},this.setScissor=function(R,X,te,re){R.isVector4?D.set(R.x,R.y,R.z,R.w):D.set(R,X,te,re),Re.scissor(W.copy(D).multiplyScalar(J).floor())},this.getScissorTest=function(){return L},this.setScissorTest=function(R){Re.setScissorTest(L=R)},this.setOpaqueSort=function(R){G=R},this.setTransparentSort=function(R){V=R},this.getClearColor=function(R){return R.copy(Se.getClearColor())},this.setClearColor=function(){Se.setClearColor.apply(Se,arguments)},this.getClearAlpha=function(){return Se.getClearAlpha()},this.setClearAlpha=function(){Se.setClearAlpha.apply(Se,arguments)},this.clear=function(R=!0,X=!0,te=!0){let re=0;if(R){let ie=!1;if(T!==null){const Me=T.texture.format;ie=Me===KS||Me===YS||Me===qS}if(ie){const Me=T.texture.type,Ue=Me===Ti||Me===ui||Me===gm||Me===Qi||Me===jS||Me===XS,He=Se.getClearColor(),Ve=Se.getClearAlpha(),Ke=He.r,We=He.g,Xe=He.b;Ue?(v[0]=Ke,v[1]=We,v[2]=Xe,v[3]=Ve,z.clearBufferuiv(z.COLOR,0,v)):(_[0]=Ke,_[1]=We,_[2]=Xe,_[3]=Ve,z.clearBufferiv(z.COLOR,0,_))}else re|=z.COLOR_BUFFER_BIT}X&&(re|=z.DEPTH_BUFFER_BIT),te&&(re|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z.clear(re)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",Qe,!1),n.removeEventListener("webglcontextrestored",F,!1),n.removeEventListener("webglcontextcreationerror",ve,!1),ce.dispose(),ue.dispose(),Ce.dispose(),Fe.dispose(),ft.dispose(),M.dispose(),Ne.dispose(),ke.dispose(),$.dispose(),be.dispose(),be.removeEventListener("sessionstart",On),be.removeEventListener("sessionend",ct),B&&(B.dispose(),B=null),rn.stop()};function Qe(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),x=!0}function F(){console.log("THREE.WebGLRenderer: Context Restored."),x=!1;const R=Ie.autoReset,X=ge.enabled,te=ge.autoUpdate,re=ge.needsUpdate,ie=ge.type;Pe(),Ie.autoReset=R,ge.enabled=X,ge.autoUpdate=te,ge.needsUpdate=re,ge.type=ie}function ve(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function de(R){const X=R.target;X.removeEventListener("dispose",de),ae(X)}function ae(R){pe(R),Ce.remove(R)}function pe(R){const X=Ce.get(R).programs;X!==void 0&&(X.forEach(function(te){$.releaseProgram(te)}),R.isShaderMaterial&&$.releaseShaderCache(R))}this.renderBufferDirect=function(R,X,te,re,ie,Me){X===null&&(X=De);const Ue=ie.isMesh&&ie.matrixWorld.determinant()<0,He=SE(R,X,te,re,ie);Re.setMaterial(re,Ue);let Ve=te.index,Ke=1;if(re.wireframe===!0){if(Ve=P.getWireframeAttribute(te),Ve===void 0)return;Ke=2}const We=te.drawRange,Xe=te.attributes.position;let wt=We.start*Ke,wn=(We.start+We.count)*Ke;Me!==null&&(wt=Math.max(wt,Me.start*Ke),wn=Math.min(wn,(Me.start+Me.count)*Ke)),Ve!==null?(wt=Math.max(wt,0),wn=Math.min(wn,Ve.count)):Xe!=null&&(wt=Math.max(wt,0),wn=Math.min(wn,Xe.count));const Ft=wn-wt;if(Ft<0||Ft===1/0)return;Ne.setup(ie,re,He,te,Ve);let Ar,St=me;if(Ve!==null&&(Ar=gt.get(Ve),St=le,St.setIndex(Ar)),ie.isMesh)re.wireframe===!0?(Re.setLineWidth(re.wireframeLinewidth*Ee()),St.setMode(z.LINES)):St.setMode(z.TRIANGLES);else if(ie.isLine){let tt=re.linewidth;tt===void 0&&(tt=1),Re.setLineWidth(tt*Ee()),ie.isLineSegments?St.setMode(z.LINES):ie.isLineLoop?St.setMode(z.LINE_LOOP):St.setMode(z.LINE_STRIP)}else ie.isPoints?St.setMode(z.POINTS):ie.isSprite&&St.setMode(z.TRIANGLES);if(ie.isInstancedMesh)St.renderInstances(wt,Ft,ie.count);else if(te.isInstancedBufferGeometry){const tt=te._maxInstanceCount!==void 0?te._maxInstanceCount:1/0,td=Math.min(te.instanceCount,tt);St.renderInstances(wt,Ft,td)}else St.render(wt,Ft)};function Oe(R,X,te){R.transparent===!0&&R.side===Or&&R.forceSinglePass===!1?(R.side=En,R.needsUpdate=!0,Xa(R,X,te),R.side=Ri,R.needsUpdate=!0,Xa(R,X,te),R.side=Or):Xa(R,X,te)}this.compile=function(R,X,te=null){te===null&&(te=R),p=ue.get(te),p.init(),m.push(p),te.traverseVisible(function(ie){ie.isLight&&ie.layers.test(X.layers)&&(p.pushLight(ie),ie.castShadow&&p.pushShadow(ie))}),R!==te&&R.traverseVisible(function(ie){ie.isLight&&ie.layers.test(X.layers)&&(p.pushLight(ie),ie.castShadow&&p.pushShadow(ie))}),p.setupLights(g._useLegacyLights);const re=new Set;return R.traverse(function(ie){const Me=ie.material;if(Me)if(Array.isArray(Me))for(let Ue=0;Ue<Me.length;Ue++){const He=Me[Ue];Oe(He,te,ie),re.add(He)}else Oe(Me,te,ie),re.add(Me)}),m.pop(),p=null,re},this.compileAsync=function(R,X,te=null){const re=this.compile(R,X,te);return new Promise(ie=>{function Me(){if(re.forEach(function(Ue){Ce.get(Ue).currentProgram.isReady()&&re.delete(Ue)}),re.size===0){ie(R);return}setTimeout(Me,10)}we.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let et=null;function bt(R){et&&et(R)}function On(){rn.stop()}function ct(){rn.start()}const rn=new uE;rn.setAnimationLoop(bt),typeof self<"u"&&rn.setContext(self),this.setAnimationLoop=function(R){et=R,be.setAnimationLoop(R),R===null?rn.stop():rn.start()},be.addEventListener("sessionstart",On),be.addEventListener("sessionend",ct),this.render=function(R,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(x===!0)return;R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),be.enabled===!0&&be.isPresenting===!0&&(be.cameraAutoUpdate===!0&&be.updateCamera(X),X=be.getCamera()),R.isScene===!0&&R.onBeforeRender(g,R,X,T),p=ue.get(R,m.length),p.init(),m.push(p),xe.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),Y.setFromProjectionMatrix(xe),se=this.localClippingEnabled,Z=Le.init(this.clippingPlanes,se),y=ce.get(R,d.length),y.init(),d.push(y),fr(R,X,0,g.sortObjects),y.finish(),g.sortObjects===!0&&y.sort(G,V),this.info.render.frame++,Z===!0&&Le.beginShadows();const te=p.state.shadowsArray;if(ge.render(te,R,X),Z===!0&&Le.endShadows(),this.info.autoReset===!0&&this.info.reset(),Se.render(y,R),p.setupLights(g._useLegacyLights),X.isArrayCamera){const re=X.cameras;for(let ie=0,Me=re.length;ie<Me;ie++){const Ue=re[ie];Cm(y,R,Ue,Ue.viewport)}}else Cm(y,R,X);T!==null&&(Be.updateMultisampleRenderTarget(T),Be.updateRenderTargetMipmap(T)),R.isScene===!0&&R.onAfterRender(g,R,X),Ne.resetDefaultState(),C=-1,E=null,m.pop(),m.length>0?p=m[m.length-1]:p=null,d.pop(),d.length>0?y=d[d.length-1]:y=null};function fr(R,X,te,re){if(R.visible===!1)return;if(R.layers.test(X.layers)){if(R.isGroup)te=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(X);else if(R.isLight)p.pushLight(R),R.castShadow&&p.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||Y.intersectsSprite(R)){re&&Te.setFromMatrixPosition(R.matrixWorld).applyMatrix4(xe);const Ue=M.update(R),He=R.material;He.visible&&y.push(R,Ue,He,te,Te.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||Y.intersectsObject(R))){const Ue=M.update(R),He=R.material;if(re&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Te.copy(R.boundingSphere.center)):(Ue.boundingSphere===null&&Ue.computeBoundingSphere(),Te.copy(Ue.boundingSphere.center)),Te.applyMatrix4(R.matrixWorld).applyMatrix4(xe)),Array.isArray(He)){const Ve=Ue.groups;for(let Ke=0,We=Ve.length;Ke<We;Ke++){const Xe=Ve[Ke],wt=He[Xe.materialIndex];wt&&wt.visible&&y.push(R,Ue,wt,te,Te.z,Xe)}}else He.visible&&y.push(R,Ue,He,te,Te.z,null)}}const Me=R.children;for(let Ue=0,He=Me.length;Ue<He;Ue++)fr(Me[Ue],X,te,re)}function Cm(R,X,te,re){const ie=R.opaque,Me=R.transmissive,Ue=R.transparent;p.setupLightsView(te),Z===!0&&Le.setGlobalState(g.clippingPlanes,te),Me.length>0&&xE(ie,Me,X,te),re&&Re.viewport(b.copy(re)),ie.length>0&&ja(ie,X,te),Me.length>0&&ja(Me,X,te),Ue.length>0&&ja(Ue,X,te),Re.buffers.depth.setTest(!0),Re.buffers.depth.setMask(!0),Re.buffers.color.setMask(!0),Re.setPolygonOffset(!1)}function xE(R,X,te,re){if((te.isScene===!0?te.overrideMaterial:null)!==null)return;const Me=_e.isWebGL2;B===null&&(B=new lo(1,1,{generateMipmaps:!0,type:we.has("EXT_color_buffer_half_float")?Na:Ti,minFilter:Da,samples:Me?4:0})),g.getDrawingBufferSize(oe),Me?B.setSize(oe.x,oe.y):B.setSize(nu(oe.x),nu(oe.y));const Ue=g.getRenderTarget();g.setRenderTarget(B),g.getClearColor(ne),N=g.getClearAlpha(),N<1&&g.setClearColor(16777215,.5),g.clear();const He=g.toneMapping;g.toneMapping=Mi,ja(R,te,re),Be.updateMultisampleRenderTarget(B),Be.updateRenderTargetMipmap(B);let Ve=!1;for(let Ke=0,We=X.length;Ke<We;Ke++){const Xe=X[Ke],wt=Xe.object,wn=Xe.geometry,Ft=Xe.material,Ar=Xe.group;if(Ft.side===Or&&wt.layers.test(re.layers)){const St=Ft.side;Ft.side=En,Ft.needsUpdate=!0,Pm(wt,te,re,wn,Ft,Ar),Ft.side=St,Ft.needsUpdate=!0,Ve=!0}}Ve===!0&&(Be.updateMultisampleRenderTarget(B),Be.updateRenderTargetMipmap(B)),g.setRenderTarget(Ue),g.setClearColor(ne,N),g.toneMapping=He}function ja(R,X,te){const re=X.isScene===!0?X.overrideMaterial:null;for(let ie=0,Me=R.length;ie<Me;ie++){const Ue=R[ie],He=Ue.object,Ve=Ue.geometry,Ke=re===null?Ue.material:re,We=Ue.group;He.layers.test(te.layers)&&Pm(He,X,te,Ve,Ke,We)}}function Pm(R,X,te,re,ie,Me){R.onBeforeRender(g,X,te,re,ie,Me),R.modelViewMatrix.multiplyMatrices(te.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),ie.onBeforeRender(g,X,te,re,R,Me),ie.transparent===!0&&ie.side===Or&&ie.forceSinglePass===!1?(ie.side=En,ie.needsUpdate=!0,g.renderBufferDirect(te,X,re,ie,R,Me),ie.side=Ri,ie.needsUpdate=!0,g.renderBufferDirect(te,X,re,ie,R,Me),ie.side=Or):g.renderBufferDirect(te,X,re,ie,R,Me),R.onAfterRender(g,X,te,re,ie,Me)}function Xa(R,X,te){X.isScene!==!0&&(X=De);const re=Ce.get(R),ie=p.state.lights,Me=p.state.shadowsArray,Ue=ie.state.version,He=$.getParameters(R,ie.state,Me,X,te),Ve=$.getProgramCacheKey(He);let Ke=re.programs;re.environment=R.isMeshStandardMaterial?X.environment:null,re.fog=X.fog,re.envMap=(R.isMeshStandardMaterial?ft:Fe).get(R.envMap||re.environment),Ke===void 0&&(R.addEventListener("dispose",de),Ke=new Map,re.programs=Ke);let We=Ke.get(Ve);if(We!==void 0){if(re.currentProgram===We&&re.lightsStateVersion===Ue)return Dm(R,He),We}else He.uniforms=$.getUniforms(R),R.onBuild(te,He,g),R.onBeforeCompile(He,g),We=$.acquireProgram(He,Ve),Ke.set(Ve,We),re.uniforms=He.uniforms;const Xe=re.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Xe.clippingPlanes=Le.uniform),Dm(R,He),re.needsLights=wE(R),re.lightsStateVersion=Ue,re.needsLights&&(Xe.ambientLightColor.value=ie.state.ambient,Xe.lightProbe.value=ie.state.probe,Xe.directionalLights.value=ie.state.directional,Xe.directionalLightShadows.value=ie.state.directionalShadow,Xe.spotLights.value=ie.state.spot,Xe.spotLightShadows.value=ie.state.spotShadow,Xe.rectAreaLights.value=ie.state.rectArea,Xe.ltc_1.value=ie.state.rectAreaLTC1,Xe.ltc_2.value=ie.state.rectAreaLTC2,Xe.pointLights.value=ie.state.point,Xe.pointLightShadows.value=ie.state.pointShadow,Xe.hemisphereLights.value=ie.state.hemi,Xe.directionalShadowMap.value=ie.state.directionalShadowMap,Xe.directionalShadowMatrix.value=ie.state.directionalShadowMatrix,Xe.spotShadowMap.value=ie.state.spotShadowMap,Xe.spotLightMatrix.value=ie.state.spotLightMatrix,Xe.spotLightMap.value=ie.state.spotLightMap,Xe.pointShadowMap.value=ie.state.pointShadowMap,Xe.pointShadowMatrix.value=ie.state.pointShadowMatrix),re.currentProgram=We,re.uniformsList=null,We}function Lm(R){if(R.uniformsList===null){const X=R.currentProgram.getUniforms();R.uniformsList=_c.seqWithValue(X.seq,R.uniforms)}return R.uniformsList}function Dm(R,X){const te=Ce.get(R);te.outputColorSpace=X.outputColorSpace,te.instancing=X.instancing,te.instancingColor=X.instancingColor,te.skinning=X.skinning,te.morphTargets=X.morphTargets,te.morphNormals=X.morphNormals,te.morphColors=X.morphColors,te.morphTargetsCount=X.morphTargetsCount,te.numClippingPlanes=X.numClippingPlanes,te.numIntersection=X.numClipIntersection,te.vertexAlphas=X.vertexAlphas,te.vertexTangents=X.vertexTangents,te.toneMapping=X.toneMapping}function SE(R,X,te,re,ie){X.isScene!==!0&&(X=De),Be.resetTextureUnits();const Me=X.fog,Ue=re.isMeshStandardMaterial?X.environment:null,He=T===null?g.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:jr,Ve=(re.isMeshStandardMaterial?ft:Fe).get(re.envMap||Ue),Ke=re.vertexColors===!0&&!!te.attributes.color&&te.attributes.color.itemSize===4,We=!!te.attributes.tangent&&(!!re.normalMap||re.anisotropy>0),Xe=!!te.morphAttributes.position,wt=!!te.morphAttributes.normal,wn=!!te.morphAttributes.color;let Ft=Mi;re.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(Ft=g.toneMapping);const Ar=te.morphAttributes.position||te.morphAttributes.normal||te.morphAttributes.color,St=Ar!==void 0?Ar.length:0,tt=Ce.get(re),td=p.state.lights;if(Z===!0&&(se===!0||R!==E)){const Mn=R===E&&re.id===C;Le.setState(re,R,Mn)}let At=!1;re.version===tt.__version?(tt.needsLights&&tt.lightsStateVersion!==td.state.version||tt.outputColorSpace!==He||ie.isInstancedMesh&&tt.instancing===!1||!ie.isInstancedMesh&&tt.instancing===!0||ie.isSkinnedMesh&&tt.skinning===!1||!ie.isSkinnedMesh&&tt.skinning===!0||ie.isInstancedMesh&&tt.instancingColor===!0&&ie.instanceColor===null||ie.isInstancedMesh&&tt.instancingColor===!1&&ie.instanceColor!==null||tt.envMap!==Ve||re.fog===!0&&tt.fog!==Me||tt.numClippingPlanes!==void 0&&(tt.numClippingPlanes!==Le.numPlanes||tt.numIntersection!==Le.numIntersection)||tt.vertexAlphas!==Ke||tt.vertexTangents!==We||tt.morphTargets!==Xe||tt.morphNormals!==wt||tt.morphColors!==wn||tt.toneMapping!==Ft||_e.isWebGL2===!0&&tt.morphTargetsCount!==St)&&(At=!0):(At=!0,tt.__version=re.version);let Ui=tt.currentProgram;At===!0&&(Ui=Xa(re,X,ie));let Nm=!1,Cs=!1,nd=!1;const on=Ui.getUniforms(),Oi=tt.uniforms;if(Re.useProgram(Ui.program)&&(Nm=!0,Cs=!0,nd=!0),re.id!==C&&(C=re.id,Cs=!0),Nm||E!==R){on.setValue(z,"projectionMatrix",R.projectionMatrix),on.setValue(z,"viewMatrix",R.matrixWorldInverse);const Mn=on.map.cameraPosition;Mn!==void 0&&Mn.setValue(z,Te.setFromMatrixPosition(R.matrixWorld)),_e.logarithmicDepthBuffer&&on.setValue(z,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(re.isMeshPhongMaterial||re.isMeshToonMaterial||re.isMeshLambertMaterial||re.isMeshBasicMaterial||re.isMeshStandardMaterial||re.isShaderMaterial)&&on.setValue(z,"isOrthographic",R.isOrthographicCamera===!0),E!==R&&(E=R,Cs=!0,nd=!0)}if(ie.isSkinnedMesh){on.setOptional(z,ie,"bindMatrix"),on.setOptional(z,ie,"bindMatrixInverse");const Mn=ie.skeleton;Mn&&(_e.floatVertexTextures?(Mn.boneTexture===null&&Mn.computeBoneTexture(),on.setValue(z,"boneTexture",Mn.boneTexture,Be),on.setValue(z,"boneTextureSize",Mn.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const rd=te.morphAttributes;if((rd.position!==void 0||rd.normal!==void 0||rd.color!==void 0&&_e.isWebGL2===!0)&&I.update(ie,te,Ui),(Cs||tt.receiveShadow!==ie.receiveShadow)&&(tt.receiveShadow=ie.receiveShadow,on.setValue(z,"receiveShadow",ie.receiveShadow)),re.isMeshGouraudMaterial&&re.envMap!==null&&(Oi.envMap.value=Ve,Oi.flipEnvMap.value=Ve.isCubeTexture&&Ve.isRenderTargetTexture===!1?-1:1),Cs&&(on.setValue(z,"toneMappingExposure",g.toneMappingExposure),tt.needsLights&&EE(Oi,nd),Me&&re.fog===!0&&he.refreshFogUniforms(Oi,Me),he.refreshMaterialUniforms(Oi,re,J,ee,B),_c.upload(z,Lm(tt),Oi,Be)),re.isShaderMaterial&&re.uniformsNeedUpdate===!0&&(_c.upload(z,Lm(tt),Oi,Be),re.uniformsNeedUpdate=!1),re.isSpriteMaterial&&on.setValue(z,"center",ie.center),on.setValue(z,"modelViewMatrix",ie.modelViewMatrix),on.setValue(z,"normalMatrix",ie.normalMatrix),on.setValue(z,"modelMatrix",ie.matrixWorld),re.isShaderMaterial||re.isRawShaderMaterial){const Mn=re.uniformsGroups;for(let id=0,ME=Mn.length;id<ME;id++)if(_e.isWebGL2){const Im=Mn[id];ke.update(Im,Ui),ke.bind(Im,Ui)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Ui}function EE(R,X){R.ambientLightColor.needsUpdate=X,R.lightProbe.needsUpdate=X,R.directionalLights.needsUpdate=X,R.directionalLightShadows.needsUpdate=X,R.pointLights.needsUpdate=X,R.pointLightShadows.needsUpdate=X,R.spotLights.needsUpdate=X,R.spotLightShadows.needsUpdate=X,R.rectAreaLights.needsUpdate=X,R.hemisphereLights.needsUpdate=X}function wE(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(R,X,te){Ce.get(R.texture).__webglTexture=X,Ce.get(R.depthTexture).__webglTexture=te;const re=Ce.get(R);re.__hasExternalTextures=!0,re.__hasExternalTextures&&(re.__autoAllocateDepthBuffer=te===void 0,re.__autoAllocateDepthBuffer||we.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),re.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(R,X){const te=Ce.get(R);te.__webglFramebuffer=X,te.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(R,X=0,te=0){T=R,w=X,A=te;let re=!0,ie=null,Me=!1,Ue=!1;if(R){const Ve=Ce.get(R);Ve.__useDefaultFramebuffer!==void 0?(Re.bindFramebuffer(z.FRAMEBUFFER,null),re=!1):Ve.__webglFramebuffer===void 0?Be.setupRenderTarget(R):Ve.__hasExternalTextures&&Be.rebindTextures(R,Ce.get(R.texture).__webglTexture,Ce.get(R.depthTexture).__webglTexture);const Ke=R.texture;(Ke.isData3DTexture||Ke.isDataArrayTexture||Ke.isCompressedArrayTexture)&&(Ue=!0);const We=Ce.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(We[X])?ie=We[X][te]:ie=We[X],Me=!0):_e.isWebGL2&&R.samples>0&&Be.useMultisampledRTT(R)===!1?ie=Ce.get(R).__webglMultisampledFramebuffer:Array.isArray(We)?ie=We[te]:ie=We,b.copy(R.viewport),W.copy(R.scissor),j=R.scissorTest}else b.copy(H).multiplyScalar(J).floor(),W.copy(D).multiplyScalar(J).floor(),j=L;if(Re.bindFramebuffer(z.FRAMEBUFFER,ie)&&_e.drawBuffers&&re&&Re.drawBuffers(R,ie),Re.viewport(b),Re.scissor(W),Re.setScissorTest(j),Me){const Ve=Ce.get(R.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+X,Ve.__webglTexture,te)}else if(Ue){const Ve=Ce.get(R.texture),Ke=X||0;z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,Ve.__webglTexture,te||0,Ke)}C=-1},this.readRenderTargetPixels=function(R,X,te,re,ie,Me,Ue){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let He=Ce.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ue!==void 0&&(He=He[Ue]),He){Re.bindFramebuffer(z.FRAMEBUFFER,He);try{const Ve=R.texture,Ke=Ve.format,We=Ve.type;if(Ke!==or&&ze.convert(Ke)!==z.getParameter(z.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Xe=We===Na&&(we.has("EXT_color_buffer_half_float")||_e.isWebGL2&&we.has("EXT_color_buffer_float"));if(We!==Ti&&ze.convert(We)!==z.getParameter(z.IMPLEMENTATION_COLOR_READ_TYPE)&&!(We===di&&(_e.isWebGL2||we.has("OES_texture_float")||we.has("WEBGL_color_buffer_float")))&&!Xe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=R.width-re&&te>=0&&te<=R.height-ie&&z.readPixels(X,te,re,ie,ze.convert(Ke),ze.convert(We),Me)}finally{const Ve=T!==null?Ce.get(T).__webglFramebuffer:null;Re.bindFramebuffer(z.FRAMEBUFFER,Ve)}}},this.copyFramebufferToTexture=function(R,X,te=0){const re=Math.pow(2,-te),ie=Math.floor(X.image.width*re),Me=Math.floor(X.image.height*re);Be.setTexture2D(X,0),z.copyTexSubImage2D(z.TEXTURE_2D,te,0,0,R.x,R.y,ie,Me),Re.unbindTexture()},this.copyTextureToTexture=function(R,X,te,re=0){const ie=X.image.width,Me=X.image.height,Ue=ze.convert(te.format),He=ze.convert(te.type);Be.setTexture2D(te,0),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,te.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,te.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,te.unpackAlignment),X.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,re,R.x,R.y,ie,Me,Ue,He,X.image.data):X.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,re,R.x,R.y,X.mipmaps[0].width,X.mipmaps[0].height,Ue,X.mipmaps[0].data):z.texSubImage2D(z.TEXTURE_2D,re,R.x,R.y,Ue,He,X.image),re===0&&te.generateMipmaps&&z.generateMipmap(z.TEXTURE_2D),Re.unbindTexture()},this.copyTextureToTexture3D=function(R,X,te,re,ie=0){if(g.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Me=R.max.x-R.min.x+1,Ue=R.max.y-R.min.y+1,He=R.max.z-R.min.z+1,Ve=ze.convert(re.format),Ke=ze.convert(re.type);let We;if(re.isData3DTexture)Be.setTexture3D(re,0),We=z.TEXTURE_3D;else if(re.isDataArrayTexture)Be.setTexture2DArray(re,0),We=z.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,re.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,re.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,re.unpackAlignment);const Xe=z.getParameter(z.UNPACK_ROW_LENGTH),wt=z.getParameter(z.UNPACK_IMAGE_HEIGHT),wn=z.getParameter(z.UNPACK_SKIP_PIXELS),Ft=z.getParameter(z.UNPACK_SKIP_ROWS),Ar=z.getParameter(z.UNPACK_SKIP_IMAGES),St=te.isCompressedTexture?te.mipmaps[0]:te.image;z.pixelStorei(z.UNPACK_ROW_LENGTH,St.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,St.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,R.min.x),z.pixelStorei(z.UNPACK_SKIP_ROWS,R.min.y),z.pixelStorei(z.UNPACK_SKIP_IMAGES,R.min.z),te.isDataTexture||te.isData3DTexture?z.texSubImage3D(We,ie,X.x,X.y,X.z,Me,Ue,He,Ve,Ke,St.data):te.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),z.compressedTexSubImage3D(We,ie,X.x,X.y,X.z,Me,Ue,He,Ve,St.data)):z.texSubImage3D(We,ie,X.x,X.y,X.z,Me,Ue,He,Ve,Ke,St),z.pixelStorei(z.UNPACK_ROW_LENGTH,Xe),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,wt),z.pixelStorei(z.UNPACK_SKIP_PIXELS,wn),z.pixelStorei(z.UNPACK_SKIP_ROWS,Ft),z.pixelStorei(z.UNPACK_SKIP_IMAGES,Ar),ie===0&&re.generateMipmaps&&z.generateMipmap(We),Re.unbindTexture()},this.initTexture=function(R){R.isCubeTexture?Be.setTextureCube(R,0):R.isData3DTexture?Be.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?Be.setTexture2DArray(R,0):Be.setTexture2D(R,0),Re.unbindTexture()},this.resetState=function(){w=0,A=0,T=null,Re.reset(),Ne.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=e===vm?"display-p3":"srgb",n.unpackColorSpace=at.workingColorSpace===Zu?"display-p3":"srgb"}get physicallyCorrectLights(){return console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights}set physicallyCorrectLights(e){console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!e}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===jt?to:ZS}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===to?jt:jr}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class PI extends Qu{}PI.prototype.isWebGL1Renderer=!0;class Mm extends Gt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n}}class ed extends Ii{constructor(e=1,n=1,r=1,i=32,o=1,s=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:r,radialSegments:i,heightSegments:o,openEnded:s,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),o=Math.floor(o);const u=[],f=[],h=[],v=[];let _=0;const y=[],p=r/2;let d=0;m(),s===!1&&(e>0&&g(!0),n>0&&g(!1)),this.setIndex(u),this.setAttribute("position",new Er(f,3)),this.setAttribute("normal",new Er(h,3)),this.setAttribute("uv",new Er(v,2));function m(){const x=new K,w=new K;let A=0;const T=(n-e)/r;for(let C=0;C<=o;C++){const E=[],b=C/o,W=b*(n-e)+e;for(let j=0;j<=i;j++){const ne=j/i,N=ne*l+a,q=Math.sin(N),ee=Math.cos(N);w.x=W*q,w.y=-b*r+p,w.z=W*ee,f.push(w.x,w.y,w.z),x.set(q,T,ee).normalize(),h.push(x.x,x.y,x.z),v.push(ne,1-b),E.push(_++)}y.push(E)}for(let C=0;C<i;C++)for(let E=0;E<o;E++){const b=y[E][C],W=y[E+1][C],j=y[E+1][C+1],ne=y[E][C+1];u.push(b,W,ne),u.push(W,j,ne),A+=6}c.addGroup(d,A,0),d+=A}function g(x){const w=_,A=new Ge,T=new K;let C=0;const E=x===!0?e:n,b=x===!0?1:-1;for(let j=1;j<=i;j++)f.push(0,p*b,0),h.push(0,b,0),v.push(.5,.5),_++;const W=_;for(let j=0;j<=i;j++){const N=j/i*l+a,q=Math.cos(N),ee=Math.sin(N);T.x=E*ee,T.y=p*b,T.z=E*q,f.push(T.x,T.y,T.z),h.push(0,b,0),A.x=q*.5+.5,A.y=ee*.5*b+.5,v.push(A.x,A.y),_++}for(let j=0;j<i;j++){const ne=w+j,N=W+j;x===!0?u.push(N,N+1,ne):u.push(N+1,N,ne),C+=3}c.addGroup(d,C,x===!0?1:2),d+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ed(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class gn extends $a{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new nt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=JS,this.normalScale=new Ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Tm extends Gt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new nt(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),n}}const yf=new Ut,r_=new K,i_=new K;class gE{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ge(512,512),this.map=null,this.mapPass=null,this.matrix=new Ut,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Em,this._frameExtents=new Ge(1,1),this._viewportCount=1,this._viewports=[new Ht(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,r=this.matrix;r_.setFromMatrixPosition(e.matrixWorld),n.position.copy(r_),i_.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(i_),n.updateMatrixWorld(),yf.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(yf),r.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),r.multiply(yf)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class LI extends gE{constructor(){super(new dn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const n=this.camera,r=ms*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,o=e.distance||n.far;(r!==n.fov||i!==n.aspect||o!==n.far)&&(n.fov=r,n.aspect=i,n.far=o,n.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class vE extends Tm{constructor(e,n,r=0,i=Math.PI/3,o=0,s=2){super(e,n),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Gt.DEFAULT_UP),this.updateMatrix(),this.target=new Gt,this.distance=r,this.angle=i,this.penumbra=o,this.decay=s,this.map=null,this.shadow=new LI}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class DI extends gE{constructor(){super(new dE(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class bm extends Tm{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Gt.DEFAULT_UP),this.updateMatrix(),this.target=new Gt,this.shadow=new DI}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Am extends Tm{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}class _E{constructor(e,n,r=0,i=1/0){this.ray=new xm(e,n),this.near=r,this.far=i,this.camera=null,this.layers=new Sm,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,n){this.ray.set(e,n)}setFromCamera(e,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(n.near+n.far)/(n.near-n.far)).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):console.error("THREE.Raycaster: Unsupported camera type: "+n.type)}intersectObject(e,n=!0,r=[]){return Xh(e,this,r,n),r.sort(o_),r}intersectObjects(e,n=!0,r=[]){for(let i=0,o=e.length;i<o;i++)Xh(e[i],this,r,n);return r.sort(o_),r}}function o_(t,e){return t.distance-e.distance}function Xh(t,e,n,r){if(t.layers.test(e.layers)&&t.raycast(e,n),r===!0){const i=t.children;for(let o=0,s=i.length;o<s;o++)Xh(i[o],e,n,!0)}}class s_{constructor(e=1,n=0,r=0){return this.radius=e,this.phi=n,this.theta=r,this}set(e,n,r){return this.radius=e,this.phi=n,this.theta=r,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,n,r){return this.radius=Math.sqrt(e*e+n*n+r*r),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,r),this.phi=Math.acos(en(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:mm}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=mm);const a_={type:"change"},xf={type:"start"},l_={type:"end"},Wl=new xm,c_=new ri,NI=Math.cos(70*b2.DEG2RAD);class Rm extends ho{constructor(e,n){super(),this.object=e,this.domElement=n,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new K,this.cursor=new K,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:mo.ROTATE,MIDDLE:mo.DOLLY,RIGHT:mo.PAN},this.touches={ONE:go.ROTATE,TWO:go.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(I){I.addEventListener("keydown",M),this._domElementKeyEvents=I},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",M),this._domElementKeyEvents=null},this.saveState=function(){r.target0.copy(r.target),r.position0.copy(r.object.position),r.zoom0=r.object.zoom},this.reset=function(){r.target.copy(r.target0),r.object.position.copy(r.position0),r.object.zoom=r.zoom0,r.object.updateProjectionMatrix(),r.dispatchEvent(a_),r.update(),o=i.NONE},this.update=function(){const I=new K,me=new Ci().setFromUnitVectors(e.up,new K(0,1,0)),le=me.clone().invert(),ze=new K,Ne=new Ci,ke=new K,Pe=2*Math.PI;return function(Qe=null){const F=r.object.position;I.copy(F).sub(r.target),I.applyQuaternion(me),a.setFromVector3(I),r.autoRotate&&o===i.NONE&&W(E(Qe)),r.enableDamping?(a.theta+=l.theta*r.dampingFactor,a.phi+=l.phi*r.dampingFactor):(a.theta+=l.theta,a.phi+=l.phi);let ve=r.minAzimuthAngle,de=r.maxAzimuthAngle;isFinite(ve)&&isFinite(de)&&(ve<-Math.PI?ve+=Pe:ve>Math.PI&&(ve-=Pe),de<-Math.PI?de+=Pe:de>Math.PI&&(de-=Pe),ve<=de?a.theta=Math.max(ve,Math.min(de,a.theta)):a.theta=a.theta>(ve+de)/2?Math.max(ve,a.theta):Math.min(de,a.theta)),a.phi=Math.max(r.minPolarAngle,Math.min(r.maxPolarAngle,a.phi)),a.makeSafe(),r.enableDamping===!0?r.target.addScaledVector(u,r.dampingFactor):r.target.add(u),r.target.sub(r.cursor),r.target.clampLength(r.minTargetRadius,r.maxTargetRadius),r.target.add(r.cursor),r.zoomToCursor&&A||r.object.isOrthographicCamera?a.radius=V(a.radius):a.radius=V(a.radius*c),I.setFromSpherical(a),I.applyQuaternion(le),F.copy(r.target).add(I),r.object.lookAt(r.target),r.enableDamping===!0?(l.theta*=1-r.dampingFactor,l.phi*=1-r.dampingFactor,u.multiplyScalar(1-r.dampingFactor)):(l.set(0,0,0),u.set(0,0,0));let ae=!1;if(r.zoomToCursor&&A){let pe=null;if(r.object.isPerspectiveCamera){const Oe=I.length();pe=V(Oe*c);const et=Oe-pe;r.object.position.addScaledVector(x,et),r.object.updateMatrixWorld()}else if(r.object.isOrthographicCamera){const Oe=new K(w.x,w.y,0);Oe.unproject(r.object),r.object.zoom=Math.max(r.minZoom,Math.min(r.maxZoom,r.object.zoom/c)),r.object.updateProjectionMatrix(),ae=!0;const et=new K(w.x,w.y,0);et.unproject(r.object),r.object.position.sub(et).add(Oe),r.object.updateMatrixWorld(),pe=I.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),r.zoomToCursor=!1;pe!==null&&(this.screenSpacePanning?r.target.set(0,0,-1).transformDirection(r.object.matrix).multiplyScalar(pe).add(r.object.position):(Wl.origin.copy(r.object.position),Wl.direction.set(0,0,-1).transformDirection(r.object.matrix),Math.abs(r.object.up.dot(Wl.direction))<NI?e.lookAt(r.target):(c_.setFromNormalAndCoplanarPoint(r.object.up,r.target),Wl.intersectPlane(c_,r.target))))}else r.object.isOrthographicCamera&&(r.object.zoom=Math.max(r.minZoom,Math.min(r.maxZoom,r.object.zoom/c)),r.object.updateProjectionMatrix(),ae=!0);return c=1,A=!1,ae||ze.distanceToSquared(r.object.position)>s||8*(1-Ne.dot(r.object.quaternion))>s||ke.distanceToSquared(r.target)>0?(r.dispatchEvent(a_),ze.copy(r.object.position),Ne.copy(r.object.quaternion),ke.copy(r.target),ae=!1,!0):!1}}(),this.dispose=function(){r.domElement.removeEventListener("contextmenu",ce),r.domElement.removeEventListener("pointerdown",Ce),r.domElement.removeEventListener("pointercancel",Fe),r.domElement.removeEventListener("wheel",P),r.domElement.removeEventListener("pointermove",Be),r.domElement.removeEventListener("pointerup",Fe),r._domElementKeyEvents!==null&&(r._domElementKeyEvents.removeEventListener("keydown",M),r._domElementKeyEvents=null)};const r=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let o=i.NONE;const s=1e-6,a=new s_,l=new s_;let c=1;const u=new K,f=new Ge,h=new Ge,v=new Ge,_=new Ge,y=new Ge,p=new Ge,d=new Ge,m=new Ge,g=new Ge,x=new K,w=new Ge;let A=!1;const T=[],C={};function E(I){return I!==null?2*Math.PI/60*r.autoRotateSpeed*I:2*Math.PI/60/60*r.autoRotateSpeed}function b(){return Math.pow(.95,r.zoomSpeed)}function W(I){l.theta-=I}function j(I){l.phi-=I}const ne=function(){const I=new K;return function(le,ze){I.setFromMatrixColumn(ze,0),I.multiplyScalar(-le),u.add(I)}}(),N=function(){const I=new K;return function(le,ze){r.screenSpacePanning===!0?I.setFromMatrixColumn(ze,1):(I.setFromMatrixColumn(ze,0),I.crossVectors(r.object.up,I)),I.multiplyScalar(le),u.add(I)}}(),q=function(){const I=new K;return function(le,ze){const Ne=r.domElement;if(r.object.isPerspectiveCamera){const ke=r.object.position;I.copy(ke).sub(r.target);let Pe=I.length();Pe*=Math.tan(r.object.fov/2*Math.PI/180),ne(2*le*Pe/Ne.clientHeight,r.object.matrix),N(2*ze*Pe/Ne.clientHeight,r.object.matrix)}else r.object.isOrthographicCamera?(ne(le*(r.object.right-r.object.left)/r.object.zoom/Ne.clientWidth,r.object.matrix),N(ze*(r.object.top-r.object.bottom)/r.object.zoom/Ne.clientHeight,r.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),r.enablePan=!1)}}();function ee(I){r.object.isPerspectiveCamera||r.object.isOrthographicCamera?c/=I:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),r.enableZoom=!1)}function J(I){r.object.isPerspectiveCamera||r.object.isOrthographicCamera?c*=I:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),r.enableZoom=!1)}function G(I){if(!r.zoomToCursor)return;A=!0;const me=r.domElement.getBoundingClientRect(),le=I.clientX-me.left,ze=I.clientY-me.top,Ne=me.width,ke=me.height;w.x=le/Ne*2-1,w.y=-(ze/ke)*2+1,x.set(w.x,w.y,1).unproject(r.object).sub(r.object.position).normalize()}function V(I){return Math.max(r.minDistance,Math.min(r.maxDistance,I))}function H(I){f.set(I.clientX,I.clientY)}function D(I){G(I),d.set(I.clientX,I.clientY)}function L(I){_.set(I.clientX,I.clientY)}function Y(I){h.set(I.clientX,I.clientY),v.subVectors(h,f).multiplyScalar(r.rotateSpeed);const me=r.domElement;W(2*Math.PI*v.x/me.clientHeight),j(2*Math.PI*v.y/me.clientHeight),f.copy(h),r.update()}function Z(I){m.set(I.clientX,I.clientY),g.subVectors(m,d),g.y>0?ee(b()):g.y<0&&J(b()),d.copy(m),r.update()}function se(I){y.set(I.clientX,I.clientY),p.subVectors(y,_).multiplyScalar(r.panSpeed),q(p.x,p.y),_.copy(y),r.update()}function B(I){G(I),I.deltaY<0?J(b()):I.deltaY>0&&ee(b()),r.update()}function xe(I){let me=!1;switch(I.code){case r.keys.UP:I.ctrlKey||I.metaKey||I.shiftKey?j(2*Math.PI*r.rotateSpeed/r.domElement.clientHeight):q(0,r.keyPanSpeed),me=!0;break;case r.keys.BOTTOM:I.ctrlKey||I.metaKey||I.shiftKey?j(-2*Math.PI*r.rotateSpeed/r.domElement.clientHeight):q(0,-r.keyPanSpeed),me=!0;break;case r.keys.LEFT:I.ctrlKey||I.metaKey||I.shiftKey?W(2*Math.PI*r.rotateSpeed/r.domElement.clientHeight):q(r.keyPanSpeed,0),me=!0;break;case r.keys.RIGHT:I.ctrlKey||I.metaKey||I.shiftKey?W(-2*Math.PI*r.rotateSpeed/r.domElement.clientHeight):q(-r.keyPanSpeed,0),me=!0;break}me&&(I.preventDefault(),r.update())}function oe(){if(T.length===1)f.set(T[0].pageX,T[0].pageY);else{const I=.5*(T[0].pageX+T[1].pageX),me=.5*(T[0].pageY+T[1].pageY);f.set(I,me)}}function Te(){if(T.length===1)_.set(T[0].pageX,T[0].pageY);else{const I=.5*(T[0].pageX+T[1].pageX),me=.5*(T[0].pageY+T[1].pageY);_.set(I,me)}}function De(){const I=T[0].pageX-T[1].pageX,me=T[0].pageY-T[1].pageY,le=Math.sqrt(I*I+me*me);d.set(0,le)}function Ee(){r.enableZoom&&De(),r.enablePan&&Te()}function z(){r.enableZoom&&De(),r.enableRotate&&oe()}function rt(I){if(T.length==1)h.set(I.pageX,I.pageY);else{const le=Se(I),ze=.5*(I.pageX+le.x),Ne=.5*(I.pageY+le.y);h.set(ze,Ne)}v.subVectors(h,f).multiplyScalar(r.rotateSpeed);const me=r.domElement;W(2*Math.PI*v.x/me.clientHeight),j(2*Math.PI*v.y/me.clientHeight),f.copy(h)}function we(I){if(T.length===1)y.set(I.pageX,I.pageY);else{const me=Se(I),le=.5*(I.pageX+me.x),ze=.5*(I.pageY+me.y);y.set(le,ze)}p.subVectors(y,_).multiplyScalar(r.panSpeed),q(p.x,p.y),_.copy(y)}function _e(I){const me=Se(I),le=I.pageX-me.x,ze=I.pageY-me.y,Ne=Math.sqrt(le*le+ze*ze);m.set(0,Ne),g.set(0,Math.pow(m.y/d.y,r.zoomSpeed)),ee(g.y),d.copy(m)}function Re(I){r.enableZoom&&_e(I),r.enablePan&&we(I)}function Ie(I){r.enableZoom&&_e(I),r.enableRotate&&rt(I)}function Ce(I){r.enabled!==!1&&(T.length===0&&(r.domElement.setPointerCapture(I.pointerId),r.domElement.addEventListener("pointermove",Be),r.domElement.addEventListener("pointerup",Fe)),ue(I),I.pointerType==="touch"?$(I):ft(I))}function Be(I){r.enabled!==!1&&(I.pointerType==="touch"?he(I):gt(I))}function Fe(I){Le(I),T.length===0&&(r.domElement.releasePointerCapture(I.pointerId),r.domElement.removeEventListener("pointermove",Be),r.domElement.removeEventListener("pointerup",Fe)),r.dispatchEvent(l_),o=i.NONE}function ft(I){let me;switch(I.button){case 0:me=r.mouseButtons.LEFT;break;case 1:me=r.mouseButtons.MIDDLE;break;case 2:me=r.mouseButtons.RIGHT;break;default:me=-1}switch(me){case mo.DOLLY:if(r.enableZoom===!1)return;D(I),o=i.DOLLY;break;case mo.ROTATE:if(I.ctrlKey||I.metaKey||I.shiftKey){if(r.enablePan===!1)return;L(I),o=i.PAN}else{if(r.enableRotate===!1)return;H(I),o=i.ROTATE}break;case mo.PAN:if(I.ctrlKey||I.metaKey||I.shiftKey){if(r.enableRotate===!1)return;H(I),o=i.ROTATE}else{if(r.enablePan===!1)return;L(I),o=i.PAN}break;default:o=i.NONE}o!==i.NONE&&r.dispatchEvent(xf)}function gt(I){switch(o){case i.ROTATE:if(r.enableRotate===!1)return;Y(I);break;case i.DOLLY:if(r.enableZoom===!1)return;Z(I);break;case i.PAN:if(r.enablePan===!1)return;se(I);break}}function P(I){r.enabled===!1||r.enableZoom===!1||o!==i.NONE||(I.preventDefault(),r.dispatchEvent(xf),B(I),r.dispatchEvent(l_))}function M(I){r.enabled===!1||r.enablePan===!1||xe(I)}function $(I){switch(ge(I),T.length){case 1:switch(r.touches.ONE){case go.ROTATE:if(r.enableRotate===!1)return;oe(),o=i.TOUCH_ROTATE;break;case go.PAN:if(r.enablePan===!1)return;Te(),o=i.TOUCH_PAN;break;default:o=i.NONE}break;case 2:switch(r.touches.TWO){case go.DOLLY_PAN:if(r.enableZoom===!1&&r.enablePan===!1)return;Ee(),o=i.TOUCH_DOLLY_PAN;break;case go.DOLLY_ROTATE:if(r.enableZoom===!1&&r.enableRotate===!1)return;z(),o=i.TOUCH_DOLLY_ROTATE;break;default:o=i.NONE}break;default:o=i.NONE}o!==i.NONE&&r.dispatchEvent(xf)}function he(I){switch(ge(I),o){case i.TOUCH_ROTATE:if(r.enableRotate===!1)return;rt(I),r.update();break;case i.TOUCH_PAN:if(r.enablePan===!1)return;we(I),r.update();break;case i.TOUCH_DOLLY_PAN:if(r.enableZoom===!1&&r.enablePan===!1)return;Re(I),r.update();break;case i.TOUCH_DOLLY_ROTATE:if(r.enableZoom===!1&&r.enableRotate===!1)return;Ie(I),r.update();break;default:o=i.NONE}}function ce(I){r.enabled!==!1&&I.preventDefault()}function ue(I){T.push(I)}function Le(I){delete C[I.pointerId];for(let me=0;me<T.length;me++)if(T[me].pointerId==I.pointerId){T.splice(me,1);return}}function ge(I){let me=C[I.pointerId];me===void 0&&(me=new Ge,C[I.pointerId]=me),me.set(I.pageX,I.pageY)}function Se(I){const me=I.pointerId===T[0].pointerId?T[1]:T[0];return C[me.pointerId]}r.domElement.addEventListener("contextmenu",ce),r.domElement.addEventListener("pointerdown",Ce),r.domElement.addEventListener("pointercancel",Fe),r.domElement.addEventListener("wheel",P,{passive:!1}),this.update()}}class II{constructor(){qa(this,"state",{isSupported:!1,isSessionActive:!1});qa(this,"onFrameCallback");qa(this,"lastFrameTime",0);this.checkSupport()}async checkSupport(){if("xr"in navigator)try{this.state.isSupported=await navigator.xr.isSessionSupported("immersive-vr"),console.log("WebXR VR support:",this.state.isSupported)}catch(e){console.error("Error checking WebXR support:",e),this.state.isSupported=!1}else console.log("WebXR not supported in this browser"),this.state.isSupported=!1}async requestSession(e={}){if(!this.state.isSupported)return console.error("WebXR is not supported"),!1;try{const n=e.requiredFeatures||["local-floor"],r=[...e.optionalFeatures||[],"hand-tracking","dom-overlay","layers"],i=await navigator.xr.requestSession("immersive-vr",{requiredFeatures:n,optionalFeatures:r});return this.state.session=i,this.state.isSessionActive=!0,i.addEventListener("end",this.onSessionEnded.bind(this)),i.addEventListener("inputsourceschange",this.onInputSourcesChange.bind(this)),this.state.referenceSpace=await i.requestReferenceSpace("local-floor"),i.requestAnimationFrame(this.onXRFrame.bind(this)),console.log("WebXR session started successfully"),!0}catch(n){return console.error("Error requesting WebXR session:",n),!1}}onXRFrame(e,n){this.state.frame=n,this.state.referenceSpace&&(this.state.viewerPose=n.getViewerPose(this.state.referenceSpace));const r=this.lastFrameTime>0?(e-this.lastFrameTime)/1e3:0;this.lastFrameTime=e,this.onFrameCallback&&this.onFrameCallback(n,r),this.state.session&&this.state.session.requestAnimationFrame(this.onXRFrame.bind(this))}onSessionEnded(){this.state.isSessionActive=!1,this.state.session=void 0,this.state.referenceSpace=void 0,this.state.viewerPose=void 0,console.log("WebXR session ended")}onInputSourcesChange(e){if(console.log("XR Input Sources Changed:",e),this.state.session){const n=this.state.session.inputSources;console.log("Current input sources:",n)}}setFrameCallback(e){this.onFrameCallback=e}getViewerPose(){return this.state.viewerPose}getReferenceSpace(){return this.state.referenceSpace}getSession(){return this.state.session}getFrame(){return this.state.frame}getState(){return{...this.state}}async exitSession(){this.state.session&&await this.state.session.end()}getSupportedFeatures(){return["local-floor","bounded-floor","unbounded","viewer","hand-tracking","dom-overlay","layers"]}isFeatureSupported(e){return this.getSupportedFeatures().includes(e)}xrPoseToThreeJS(e){if(!e||!e.transform)return{position:new K,rotation:new gs};const n=e.transform.position,r=e.transform.orientation;return{position:new K(n.x,n.y,n.z),rotation:new gs().setFromQuaternion(new Ci(r.x,r.y,r.z,r.w))}}getHandJointPositions(e,n){if(e.hand&&this.state.frame){const r=new Map;for(const i of e.hand.keys()){const o=this.state.frame.getJointPose(e.hand.get(i),n);if(o){const s=o.transform.position;r.set(i,new K(s.x,s.y,s.z))}}return r}return null}}const Hi=new II,UI=U.div`
  width: 100%;
  height: 100vh;
  position: relative;
`,OI=U.div`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,Sf=U.button`
  padding: 0.5rem 1rem;
  background: #6200ee;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 0.5rem;

  &:hover {
    background: #3700b3;
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`,kI=({artworks:t,onArtworkSelect:e,onExitVR:n})=>{const r=O.useRef(null),[i,o]=O.useState(!1),[s,a]=O.useState(!1),[l,c]=O.useState(!0),u=O.useRef(null),f=O.useRef(null),h=O.useRef(null),v=O.useRef(null),_=O.useRef(null),y=O.useRef([]);O.useEffect(()=>{if(!r.current)return;(async()=>{const ne=Hi.getState();o(ne.isSupported)})();const T=new Mm;T.background=new nt(1118483),u.current=T;const C=new dn(75,window.innerWidth/window.innerHeight,.1,1e3);C.position.set(0,1.6,5),f.current=C;const E=new Qu({antialias:!0});E.setSize(window.innerWidth,window.innerHeight),E.setPixelRatio(window.devicePixelRatio),E.shadowMap.enabled=!0,E.xr.enabled=!0,r.current.appendChild(E.domElement),h.current=E,p(T),d(T),g(T,t);const b=new Rm(C,E.domElement);b.enableDamping=!0,b.dampingFactor=.05,v.current=b;const W=()=>{C&&E&&(C.aspect=window.innerWidth/window.innerHeight,C.updateProjectionMatrix(),E.setSize(window.innerWidth,window.innerHeight))};window.addEventListener("resize",W);const j=()=>{_.current=requestAnimationFrame(j),b&&!E.xr.isPresenting&&b.update(),E&&E.render(T,C)};return j(),c(!1),()=>{window.removeEventListener("resize",W),_.current&&cancelAnimationFrame(_.current),r.current&&(E!=null&&E.domElement)&&r.current.removeChild(E.domElement),E&&E.dispose()}},[t]);const p=A=>{const T=new Am(16777215,.6);A.add(T);const C=new bm(16777215,.8);C.position.set(5,10,7),C.castShadow=!0,A.add(C),t.forEach((E,b)=>{const W=new vE(16777215,.8);W.position.set(-6+b%4*4,4,-8+Math.floor(b/4)*-4),W.castShadow=!0,W.angle=Math.PI/6,W.penumbra=.2,W.decay=2,W.distance=200,A.add(W)})},d=A=>{const T=new wr(40,40),C=new gn({color:3355443,roughness:.8,metalness:.2}),E=new ut(T,C);E.rotation.x=-Math.PI/2,E.receiveShadow=!0,A.add(E);const b=new Tr(40,8,.5),W=new gn({color:4473924,roughness:.7,metalness:.3}),j=new ut(b,W);j.position.z=-20,j.position.y=4,j.castShadow=!1,j.receiveShadow=!0,A.add(j);const ne=new ut(b,W);ne.position.x=-20,ne.position.y=4,ne.rotation.y=Math.PI/2,ne.castShadow=!1,ne.receiveShadow=!0,A.add(ne);const N=new ut(b,W);N.position.x=20,N.position.y=4,N.rotation.y=Math.PI/2,N.castShadow=!1,N.receiveShadow=!0,A.add(N);const q=new wr(40,40),ee=new gn({color:2236962,roughness:.9,metalness:.1}),J=new ut(q,ee);J.rotation.x=Math.PI/2,J.position.y=8,J.castShadow=!1,A.add(J),m(A)},m=A=>{const T=new ed(.5,.5,8,16),C=new gn({color:8947848,roughness:.6,metalness:.2});for(let E=0;E<4;E++){const b=new ut(T,C);b.position.x=-15+E*10,b.position.z=-18,b.position.y=4,b.castShadow=!0,b.receiveShadow=!0,A.add(b)}},g=(A,T)=>{y.current.forEach(W=>A.remove(W)),y.current=[];const C=Math.ceil(Math.sqrt(T.length)),E=Math.ceil(T.length/C),b=4;T.forEach((W,j)=>{const ne=Math.floor(j/E),q=(j%E-(E-1)/2)*b,ee=-(ne-(C-1)/2)*b-19,J=2,G=new Tr(2.5,2.5,.1),V=new gn({color:9127187,metalness:.3,roughness:.7}),H=new ut(G,V);H.position.set(q,J,ee),H.userData={type:"artwork",artworkId:W.artwork_id,artwork:W},A.add(H),y.current.push(H);const D=new wr(2.3,2.3),L=new gn({color:11184810,emissive:3355443,roughness:.5,metalness:.1}),Y=new ut(D,L);Y.position.set(q,J,ee+.06),Y.userData={type:"artwork",artworkId:W.artwork_id,artwork:W},A.add(Y),y.current.push(Y),H.addEventListener("click",()=>{e(W)})})},x=async()=>{if(!i){console.error("WebXR is not supported in this browser");return}try{await Hi.requestSession({requiredFeatures:["local-floor"],optionalFeatures:["hand-tracking"]})&&h.current?(h.current.xr.enabled=!0,Hi.setFrameCallback((T,C)=>{if(Hi.getViewerPose()&&f.current){const E=Hi.getViewerPose();E&&E.views&&E.views.length>0}}),a(!0),console.log("Entered VR mode")):console.error("Failed to enter VR mode")}catch(A){console.error("Error entering VR mode:",A)}},w=async()=>{Hi.getSession()&&await Hi.exitSession(),h.current&&(h.current.xr.enabled=!1),a(!1),console.log("Exited VR mode")};return k(UI,{ref:r,children:[l&&S("div",{children:"Loading VR Gallery..."}),k(OI,{children:[k("div",{children:[S("h3",{children:"Virtual Gallery"}),k("p",{children:[s?"In VR Mode":"In Desktop Mode"," • ",t.length," artworks displayed"]})]}),k("div",{children:[s?S(Sf,{onClick:w,children:"Exit VR Mode"}):S(Sf,{onClick:x,disabled:!i,children:i?"Enter VR Mode":"VR Not Supported"}),S(Sf,{onClick:n,children:"Back to Gallery"})]})]})]})},FI=()=>{const[t,e]=O.useState([]),[n,r]=O.useState(!0),[i,o]=O.useState(null);O.useEffect(()=>{(async()=>{try{const c=await Cn.get("/api/artworks");e(c.data)}catch(c){console.error("Error fetching artworks:",c),o("Failed to load artworks")}finally{r(!1)}})()},[]);const s=l=>{console.log("Selected artwork:",l)},a=()=>{window.history.back()};return n?S("div",{children:"Loading VR Gallery..."}):i?k("div",{children:["Error: ",i]}):S(kI,{artworks:t,onArtworkSelect:s,onExitVR:a})},BI=U.div`
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 2rem;
`,zI=U.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`,HI=U.h2`
  margin: 0;
  color: #333;
`,VI=U.p`
  color: #666;
  margin-bottom: 1.5rem;
`,GI=U.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`,WI=({room:t})=>k(BI,{children:[k(zI,{children:[S(HI,{children:t.name}),k("span",{children:["Тема: ",t.theme]})]}),t.description&&S(VI,{children:t.description}),k("div",{children:[S("h3",{children:"Экспонаты в зале"}),k("p",{children:['В этом зале представлены экспонаты, соответствующие теме "',t.theme,'"']}),k(GI,{children:[S(Kc,{artwork:{artwork_id:1,title:"Пример экспоната",artist_name:"Известный художник",description:"Описание экспоната в этом зале",tags:[t.theme],created_at:new Date,updated_at:new Date}}),S(Kc,{artwork:{artwork_id:2,title:"Еще один экспонат",artist_name:"Другой художник",description:"Еще один экспонат в этом зале",tags:[t.theme],created_at:new Date,updated_at:new Date}})]})]})]}),$I=U.div`
  width: 100%;
  height: 500px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
`,jI=U.div`
  position: absolute;
  top: ${({position:t})=>t.y}px;
  left: ${({position:t})=>t.x}px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  transform: translate(-50%, -50%);
  pointer-events: none;
  font-size: 0.8rem;
`,XI=({rooms:t,onRoomSelect:e})=>{const n=O.useRef(null);return O.useEffect(()=>{if(!n.current||t.length===0)return;const r=new Mm;r.background=new nt(15790320);const i=new dn(75,n.current.clientWidth/n.current.clientHeight,.1,1e3);i.position.set(0,5,10);const o=new Qu({antialias:!0});o.setSize(n.current.clientWidth,n.current.clientHeight),o.setPixelRatio(window.devicePixelRatio),n.current.appendChild(o.domElement);const s=new Am(16777215,.6);r.add(s);const a=new bm(16777215,.8);a.position.set(10,20,15),a.castShadow=!0,r.add(a);const l=new wr(50,50),c=new gn({color:14540253,roughness:.8,metalness:.2}),u=new ut(l,c);u.rotation.x=-Math.PI/2,u.receiveShadow=!0,r.add(u);const f=[];t.forEach((m,g)=>{const x=new Tr(3,2,4),w=new gn({color:new nt(m.color),transparent:!0,opacity:.8}),A=new ut(x,w);A.position.set(m.position.x,m.position.y+1,m.position.z),A.userData={roomId:m.id,roomName:m.name},r.add(A),f.push(A)}),t.map(m=>S(jI,{position:{x:m.position.x*10+250,y:-m.position.z*10+250,z:m.position.y*10},children:m.name},m.id));const h=new Rm(i,o.domElement);h.enableDamping=!0,h.dampingFactor=.05;const v=new _E,_=new Ge,y=m=>{_.x=m.clientX/o.domElement.clientWidth*2-1,_.y=-(m.clientY/o.domElement.clientHeight)*2+1,v.setFromCamera(_,i);const g=v.intersectObjects(f);if(g.length>0){const w=g[0].object.userData.roomId;w&&e(w)}};o.domElement.addEventListener("click",y);const p=()=>{i.aspect=n.current.clientWidth/n.current.clientHeight,i.updateProjectionMatrix(),o.setSize(n.current.clientWidth,n.current.clientHeight)};window.addEventListener("resize",p);const d=()=>{requestAnimationFrame(d),h.update(),o.render(r,i)};return d(),()=>{window.removeEventListener("resize",p),o.domElement.removeEventListener("click",y),n.current&&n.current.removeChild(o.domElement),o.dispose()}},[t,e]),S($I,{ref:n})},Ef=U.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`,qI=U.div`
  margin-bottom: 2rem;
`,YI=U.h1`
  color: #333;
  margin: 0 0 0.5rem 0;
`,KI=U.p`
  color: #666;
  margin: 0;
`,ZI=U.div`
  margin-top: 2rem;
`,JI=U.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`,u_=U.button`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background-color: ${({active:t})=>t?"#6200ee":"white"};
  color: ${({active:t})=>t?"white":"#333"};
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`,QI=()=>{const{id:t}=Su(),[e,n]=O.useState(null),[r,i]=O.useState([]),[o,s]=O.useState([]),[a,l]=O.useState(!0),[c,u]=O.useState("all"),[f,h]=O.useState([]);if(O.useEffect(()=>{(async()=>{try{if(t){const p=await ci.getGalleryById(parseInt(t));n(p);const d=await ci.getRooms(parseInt(t));i(d),s(d);const m=[...new Set(d.map(g=>g.theme))];h(m)}}catch(p){console.error("Ошибка при загрузке данных галереи:",p)}finally{l(!1)}})()},[t]),O.useEffect(()=>{s(c==="all"?r:r.filter(y=>y.theme===c))},[c,r]),a)return S(Ef,{children:"Загрузка галереи..."});if(!e)return S(Ef,{children:"Галерея не найдена"});const v=br(),_=y=>{v(`/rooms/${y}`)};return k(Ef,{children:[k(qI,{children:[S(YI,{children:e.name}),e.description&&S(KI,{children:e.description})]}),k(JI,{children:[S(u_,{active:c==="all",onClick:()=>u("all"),children:"Все залы"}),f.map(y=>S(u_,{active:c===y,onClick:()=>u(y),children:y},y))]}),k("div",{style:{marginBottom:"2rem"},children:[S("h3",{children:"Навигация по галерее"}),S(XI,{rooms:r.map((y,p)=>({id:y.room_id,name:y.name,position:{x:p*6,y:0,z:0},color:`hsl(${p*60}, 70%, 60%)`})),onRoomSelect:_})]}),S(ZI,{children:o.length>0?o.map(y=>S(WI,{room:y},y.room_id)):S("p",{children:"Нет залов, соответствующих выбранному фильтру"})})]})},d_=U.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`,eU=U.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`,tU=U.h1`
  color: #333;
  margin: 0;
`,nU=U.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
`,$l=U.div`
  margin-bottom: 1.5rem;
`,jl=U.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`,rU=U.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`,iU=U.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
`,f_=U.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`,Xl=U.button`
  padding: 0.75rem 1.5rem;
  background-color: #6200ee;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #3700b3;
  }
`;U.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;U.div`
  border: 2px solid ${({selected:t})=>t?"#6200ee":"#ddd"};
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  background-color: ${({selected:t})=>t?"#f0e6ff":"white"};

  &:hover {
    border-color: #6200ee;
  }
`;const oU=()=>{const{galleryId:t}=Su(),[e,n]=O.useState([]),[r,i]=O.useState([]),[o,s]=O.useState(!0),[a,l]=O.useState(""),[c,u]=O.useState(""),[f,h]=O.useState(""),[v,_]=O.useState(""),[y,p]=O.useState([]),[d,m]=O.useState(null);O.useEffect(()=>{(async()=>{try{if(t){const E=await ci.getRooms(parseInt(t));n(E);const b=await La.getAllArtworks();i(b)}}catch(E){console.error("Ошибка при загрузке данных:",E)}finally{s(!1)}})()},[t]);const g=async C=>{C.preventDefault();try{const E={name:a,description:c,theme:f,region:v,tags:[f],layout_settings:{background_color:"#ffffff",lighting_settings:{ambient_intensity:.6,directional_intensity:.8,color_temperature:6500},wall_configurations:[],navigation_points:[]}},b=await ci.createRoom(parseInt(t),E);n([...e,b]),T()}catch(E){console.error("Ошибка при создании зала:",E)}},x=async C=>{if(C.preventDefault(),!!d)try{const E={name:a,description:c,theme:f,region:v},b=await ci.updateRoom(d.room_id,E);n(e.map(W=>W.room_id===b.room_id?b:W)),T()}catch(E){console.error("Ошибка при обновлении зала:",E)}},w=async C=>{if(window.confirm("Вы уверены, что хотите удалить этот зал?"))try{await ci.deleteRoom(C),n(e.filter(E=>E.room_id!==C))}catch(E){console.error("Ошибка при удалении зала:",E)}},A=C=>{m(C),l(C.name),u(C.description||""),h(C.theme),_(C.region||"")},T=()=>{l(""),u(""),h(""),_(""),p([]),m(null)};return o?S(d_,{children:"Загрузка данных..."}):k(d_,{children:[S(eU,{children:S(tU,{children:"Управление залами галереи"})}),k(nU,{children:[S("h2",{children:d?"Редактировать зал":"Создать новый зал"}),k("form",{onSubmit:d?x:g,children:[k($l,{children:[S(jl,{htmlFor:"name",children:"Название зала:"}),S(rU,{id:"name",type:"text",value:a,onChange:C=>l(C.target.value),required:!0})]}),k($l,{children:[S(jl,{htmlFor:"description",children:"Описание:"}),S(iU,{id:"description",value:c,onChange:C=>u(C.target.value)})]}),k($l,{children:[S(jl,{htmlFor:"theme",children:"Тема зала:"}),k(f_,{id:"theme",value:f,onChange:C=>h(C.target.value),required:!0,children:[S("option",{value:"",children:"Выберите тему"}),S("option",{value:"impressionism",children:"Импрессионизм"}),S("option",{value:"sculpture",children:"Скульптура"}),S("option",{value:"renaissance",children:"Ренессанс"}),S("option",{value:"contemporary",children:"Современное искусство"}),S("option",{value:"photography",children:"Фотография"}),S("option",{value:"asian_art",children:"Азиатское искусство"}),S("option",{value:"european_art",children:"Европейское искусство"}),S("option",{value:"american_art",children:"Американское искусство"})]})]}),k($l,{children:[S(jl,{htmlFor:"region",children:"Регион (необязательно):"}),k(f_,{id:"region",value:v,onChange:C=>_(C.target.value),children:[S("option",{value:"",children:"Выберите регион"}),S("option",{value:"european",children:"Европейский"}),S("option",{value:"asian",children:"Азиатский"}),S("option",{value:"american",children:"Американский"}),S("option",{value:"african",children:"Африканский"}),S("option",{value:"middle_eastern",children:"Ближневосточный"})]})]}),S(Xl,{type:"submit",children:d?"Обновить зал":"Создать зал"}),d&&S(Xl,{type:"button",style:{marginLeft:"1rem",backgroundColor:"#f44336"},onClick:T,children:"Отмена"})]})]}),k("div",{children:[S("h2",{children:"Существующие залы"}),e.length>0?S("div",{children:e.map(C=>k("div",{style:{border:"1px solid #ddd",borderRadius:"8px",padding:"1rem",marginBottom:"1rem"},children:[S("h3",{children:C.name}),k("p",{children:[S("strong",{children:"Тема:"})," ",C.theme]}),k("p",{children:[S("strong",{children:"Регион:"})," ",C.region||"Не указан"]}),C.description&&k("p",{children:[S("strong",{children:"Описание:"})," ",C.description]}),k("div",{style:{marginTop:"1rem"},children:[S(Xl,{onClick:()=>A(C),children:"Редактировать"}),S(Xl,{style:{marginLeft:"0.5rem",backgroundColor:"#f44336"},onClick:()=>w(C.room_id),children:"Удалить"})]})]},C.room_id))}):S("p",{children:"В этой галерее пока нет залов"})]})]})},wf=U.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`,sU=U.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`,aU=U.h1`
  color: #333;
  margin: 0;
`,lU=U.p`
  color: #666;
  margin: 0.5rem 0 2rem 0;
`,cU=U.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`,uU=U.button`
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background-color: #6200ee;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #3700b3;
  }
`,dU=()=>{const{id:t}=Su(),e=br(),[n,r]=O.useState(null),[i,o]=O.useState([]),[s,a]=O.useState(!0);O.useEffect(()=>{(async()=>{try{if(t){const u=await ci.getRoomById(parseInt(t));r(u);const h=(await La.getAllArtworks()).filter(v=>v.tags.some(_=>u.tags.includes(_)));o(h)}}catch(u){console.error("Ошибка при загрузке данных зала:",u)}finally{a(!1)}})()},[t]);const l=()=>{e(-1)};return s?S(wf,{children:"Загрузка зала..."}):n?k(wf,{children:[S(uU,{onClick:l,children:"← Назад к галерее"}),S(sU,{children:k("div",{children:[S(aU,{children:n.name}),n.description&&S(lU,{children:n.description}),k("p",{children:[S("strong",{children:"Тема:"})," ",n.theme]}),n.region&&k("p",{children:[S("strong",{children:"Регион:"})," ",n.region]})]})}),k("div",{children:[S("h2",{children:"Экспонаты в зале"}),i.length>0?S(cU,{children:i.map(c=>S(Kc,{artwork:c,onClick:()=>e(`/artworks/${c.artwork_id}`)},c.artwork_id))}):S("p",{children:"В этом зале пока нет экспонатов"})]})]}):S(wf,{children:"Зал не найден"})},fU=U.div`
  width: 100%;
  background-color: #f0f0f0;
  border-radius: 10px;
  margin: 1rem 0;
  overflow: hidden;
`,hU=U.div`
  height: 20px;
  background: linear-gradient(90deg, #6200ee, #3700b3);
  width: ${({percentage:t})=>`${t}%`};
  transition: width 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 0.75rem;
`,pU=U.div`
  text-align: center;
  margin-top: 0.5rem;
  color: #666;
`,mU=({percentage:t,status:e,showPercentage:n=!0})=>k("div",{children:[S(fU,{children:S(hU,{percentage:t,children:n&&`${Math.round(t)}%`})}),S(pU,{children:e})]}),gU=U.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
`,vU=U.div`
  border: 2px dashed ${({isDragActive:t})=>t?"#6200ee":"#ddd"};
  border-radius: 8px;
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  background-color: ${({isDragActive:t})=>t?"rgba(98, 0, 238, 0.05)":"#fafafa"};
  transition: all 0.3s ease;

  &:hover {
    border-color: #6200ee;
  }
`,_U=U.div`
  font-size: 3rem;
  color: #ccc;
  margin-bottom: 1rem;
`,h_=U.p`
  color: #666;
  margin: 0.5rem 0;
`,p_=U.button`
  padding: 0.75rem 1.5rem;
  background-color: #6200ee;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 1rem;

  &:hover {
    background-color: #3700b3;
  }
`,yU=U.div`
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`,xU=U.div`
  position: relative;
  width: 150px;
  height: 150px;
`,SU=U.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`,EU=U.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(0,0,0,0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;U.div`
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 1rem;
`;U.div`
  height: 100%;
  width: ${({percentage:t})=>`${t}%`};
  background-color: #6200ee;
  transition: width 0.3s ease;
`;const wU=({onUploadComplete:t})=>{const[e,n]=O.useState(!1),[r,i]=O.useState([]),[o,s]=O.useState([]),[a,l]=O.useState(null),[c,u]=O.useState(!1),f=O.useRef(null),h=g=>{g.preventDefault(),g.stopPropagation(),g.type==="dragenter"||g.type==="dragover"?n(!0):g.type==="dragleave"&&n(!1)},v=g=>{g.preventDefault(),g.stopPropagation(),n(!1),g.dataTransfer.files&&g.dataTransfer.files[0]&&y(g.dataTransfer.files)},_=g=>{g.preventDefault(),g.target.files&&g.target.files[0]&&y(g.target.files)},y=g=>{const x=Array.from(g),w=x.filter(A=>A.type.startsWith("image/")&&(A.type==="image/jpeg"||A.type==="image/png"||A.type==="image/webp"||A.type==="image/jpg"));if(w.length!==x.length&&alert("Поддерживаются только изображения форматов JPEG, PNG, WebP"),w.length>0){i(T=>[...T,...w]);const A=w.map(T=>URL.createObjectURL(T));s(T=>[...T,...A])}},p=g=>{i(x=>x.filter((w,A)=>A!==g)),s(x=>x.filter((w,A)=>A!==g))},d=async()=>{if(r.length===0){alert("Пожалуйста, выберите изображения для загрузки");return}u(!0),l(0);try{for(let g=0;g<r.length;g++){const x=r[g],w=setInterval(()=>{l(T=>{if(T===null)return 0;const C=T+10;return C>=100?(clearInterval(w),100):C})},200),A=await sr.uploadImage(x,1);await sr.analyzeImage(A.artwork_id||1),clearInterval(w),l(100),t(A)}setTimeout(()=>{i([]),s([]),l(null),u(!1),alert("Изображения успешно загружены и отправлены на анализ")},1e3)}catch(g){console.error("Ошибка при загрузке изображений:",g),alert("Ошибка при загрузке изображений"),u(!1),l(null)}};return k(gU,{children:[S("h3",{children:"Загрузка изображений экспонатов"}),k(vU,{isDragActive:e,onDragEnter:h,onDragLeave:h,onDragOver:h,onDrop:v,onClick:()=>{f.current&&f.current.click()},children:[S(_U,{children:"📁"}),S(h_,{children:"Перетащите изображения сюда или нажмите для выбора"}),S(h_,{children:"Поддерживаются форматы: JPEG, PNG, WebP"}),S(p_,{children:"Выбрать файлы"}),S("input",{ref:f,type:"file",multiple:!0,accept:"image/jpeg,image/png,image/webp,image/jpg",onChange:_,style:{display:"none"}})]}),a!==null&&S(mU,{percentage:a,status:a<100?"Загрузка...":"Загрузка завершена"}),o.length>0&&S(yU,{children:o.map((g,x)=>k(xU,{children:[S(SU,{src:g,alt:`Preview ${x}`}),S(EU,{onClick:()=>p(x),children:"×"})]},x))}),r.length>0&&S(p_,{onClick:d,disabled:c,style:{marginTop:"1rem"},children:c?"Загрузка...":`Загрузить ${r.length} файл(ов)`})]})},MU=U.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 1.5rem;
`,m_=U.h3`
  color: #333;
  margin-top: 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
`,TU=U.div`
  margin: 1rem 0;
`,bU=U.span`
  display: inline-block;
  background-color: #6200ee;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`,AU=U.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: ${({color:t})=>t};
  border-radius: 50%;
  margin-right: 0.5rem;
  border: 1px solid #ccc;
`,RU=U.div`
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin: 0.5rem 0;
`,CU=U.div`
  height: 100%;
  width: ${({percentage:t})=>`${t}%`};
  background-color: #4caf50;
`,PU=U.div`
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`,yE=({analysis:t,artwork:e,onArtworkChange:n})=>{var r;return k(MU,{children:[S(m_,{children:"Результаты ИИ-анализа"}),k("div",{children:[k("h4",{children:["Предполагаемый стиль: ",S("strong",{children:t.style})]}),k("p",{children:["Доверительная оценка: ",Math.round(t.confidence*100),"%"]}),S(RU,{children:S(CU,{percentage:t.confidence*100})})]}),S("div",{children:k("h4",{children:["Оценка периода: ",S("strong",{children:t.estimated_period})]})}),k(TU,{children:[S("h4",{children:"Обнаруженные теги:"}),t.tags.map((i,o)=>S(bU,{children:i},o))]}),k("div",{children:[S("h4",{children:"Доминирующие цвета:"}),S("div",{children:t.dominant_colors.map((i,o)=>S(AU,{color:i,title:i},o))})]}),k("div",{children:[S("h4",{children:"Обнаруженные объекты:"}),t.detected_objects.map((i,o)=>k(PU,{children:[k("div",{children:[S("strong",{children:i.name})," (доверие: ",Math.round(i.confidence*100),"%)"]}),k("div",{children:["Позиция: (",i.bounding_box.x,", ",i.bounding_box.y,"), Размер: ",i.bounding_box.width,"x",i.bounding_box.height]})]},o))]}),k("div",{children:[S("h4",{children:"Качество изображения:"}),k("p",{children:["Яркость: ",t.image_quality.brightness.toFixed(2)]}),k("p",{children:["Контрастность: ",t.image_quality.contrast.toFixed(2)]}),k("p",{children:["Резкость: ",t.image_quality.sharpness.toFixed(2)]}),k("p",{children:["Разрешение: ",t.image_quality.resolution.width,"x",t.image_quality.resolution.height]})]}),S(m_,{children:"Редактирование карточки экспоната"}),S("div",{children:k("label",{children:[S("strong",{children:"Название:"}),S("input",{type:"text",value:e.title||"",onChange:i=>n("title",i.target.value),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0"}})]})}),S("div",{children:k("label",{children:[S("strong",{children:"Имя художника:"}),S("input",{type:"text",value:e.artist_name||"",onChange:i=>n("artist_name",i.target.value),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0"}})]})}),S("div",{children:k("label",{children:[S("strong",{children:"Год создания:"}),S("input",{type:"number",value:e.year_created||"",onChange:i=>n("year_created",i.target.value?parseInt(i.target.value):void 0),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0"}})]})}),S("div",{children:k("label",{children:[S("strong",{children:"Техника:"}),S("input",{type:"text",value:e.medium||"",onChange:i=>n("medium",i.target.value),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0"}})]})}),S("div",{children:k("label",{children:[S("strong",{children:"Стиль:"}),S("input",{type:"text",value:e.style||"",onChange:i=>n("style",i.target.value),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0"}})]})}),S("div",{children:k("label",{children:[S("strong",{children:"Описание:"}),S("textarea",{value:e.description||"",onChange:i=>n("description",i.target.value),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0",minHeight:"100px"}})]})}),S("div",{children:k("label",{children:[S("strong",{children:"Теги (через запятую):"}),S("input",{type:"text",value:((r=e.tags)==null?void 0:r.join(", "))||"",onChange:i=>n("tags",i.target.value.split(",").map(o=>o.trim())),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0"}})]})})]})},g_=U.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`,LU=U.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`,DU=U.h1`
  color: #333;
  margin: 0;
`,NU=U.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`,ql=U.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  text-align: center;
`,Yl=U.p`
  font-size: 2rem;
  font-weight: bold;
  color: #6200ee;
  margin: 0.5rem 0;
`,Mf=U.section`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
`,Tf=U.h2`
  color: #333;
  margin-top: 0;
  margin-bottom: 1.5rem;
`,$s=U.button`
  padding: 0.75rem 1.5rem;
  background-color: #6200ee;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  margin-right: 1rem;
  margin-bottom: 1rem;

  &:hover {
    background-color: #3700b3;
  }
`,IU=U.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background-color: #f8f9fa;
    font-weight: 600;
  }
`,UU=U.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${({status:t})=>{switch(t){case"uploaded":return"#2196f3";case"analyzing":return"#ff9800";case"analyzed":return"#4caf50";case"review_pending":return"#9c27b0";case"published":return"#8bc34a";case"rejected":return"#f44336";default:return"#9e9e9e"}}};
  color: white;
`,v_=()=>{const[t,e]=O.useState([]),[n,r]=O.useState(null),[i,o]=O.useState(null),[s,a]=O.useState({}),[l,c]=O.useState(!0),[u,f]=O.useState({totalUploads:0,analyzing:0,analyzed:0,published:0});O.useEffect(()=>{(async()=>{try{const g=await sr.getUserUploads(1);e(g);const x=g.length,w=g.filter(C=>C.status==="analyzing").length,A=g.filter(C=>C.status==="analyzed").length,T=g.filter(C=>C.status==="published").length;f({totalUploads:x,analyzing:w,analyzed:A,published:T})}catch(g){console.error("Ошибка при загрузке загрузок:",g)}finally{c(!1)}})()},[]);const h=async m=>{e(g=>[...g,m]),f(g=>({...g,totalUploads:g.totalUploads+1,analyzing:g.analyzing+1})),r(m);try{const g=await sr.getImageAnalysis(m.artwork_id||1);o(g),e(x=>x.map(w=>w.artwork_id===m.artwork_id?{...w,status:"analyzed",analysis_result:g}:w)),f(x=>({...x,analyzing:x.analyzing-1,analyzed:x.analyzed+1}))}catch(g){console.error("Ошибка при загрузке результатов анализа:",g)}},v=async m=>{if(r(m),m.analysis_result)o(m.analysis_result),a(m.artwork_data||{});else try{const g=await sr.getImageAnalysis(m.artwork_id||1);o(g),a({...m.artwork_data,title:m.original_name.replace(/\.[^/.]+$/,"")})}catch(g){console.error("Ошибка при загрузке результатов анализа:",g)}},_=(m,g)=>{a(x=>({...x,[m]:g}))},y=async()=>{if(!n){alert("Сначала выберите изображение для сохранения");return}try{e(m=>m.map(g=>g.artwork_id===n.artwork_id?{...g,status:"review_pending",artwork_data:s}:g)),f(m=>({...m,analyzed:m.analyzed-1})),alert("Карточка экспоната сохранена и отправлена на проверку")}catch(m){console.error("Ошибка при сохранении карточки:",m),alert("Ошибка при сохранении карточки")}},p=async()=>{if(!n){alert("Сначала выберите изображение для публикации");return}try{e(m=>m.map(g=>g.artwork_id===n.artwork_id?{...g,status:"published"}:g)),f(m=>({...m,analyzed:m.analyzed-1,published:m.published+1})),alert("Экспонат опубликован")}catch(m){console.error("Ошибка при публикации:",m),alert("Ошибка при публикации экспоната")}},d=async()=>{if(!n){alert("Сначала выберите изображение для повторного анализа");return}try{e(g=>g.map(x=>x.artwork_id===n.artwork_id?{...x,status:"analyzing"}:x)),f(g=>({...g,analyzed:g.analyzed-1,analyzing:g.analyzing+1}));const m=await sr.reanalyzeImage(n.artwork_id||1);o(m),e(g=>g.map(x=>x.artwork_id===n.artwork_id?{...x,status:"analyzed",analysis_result:m}:x)),f(g=>({...g,analyzing:g.analyzing-1,analyzed:g.analyzed+1})),alert("Повторный анализ завершен")}catch(m){console.error("Ошибка при повторном анализе:",m),alert("Ошибка при повторном анализе")}};return l?S(g_,{children:"Загрузка данных..."}):k(g_,{children:[S(LU,{children:S(DU,{children:"Дашборд сотрудника музея"})}),k(NU,{children:[k(ql,{children:[S("h3",{children:"Всего загрузок"}),S(Yl,{children:u.totalUploads})]}),k(ql,{children:[S("h3",{children:"На анализе"}),S(Yl,{children:u.analyzing})]}),k(ql,{children:[S("h3",{children:"Проанализировано"}),S(Yl,{children:u.analyzed})]}),k(ql,{children:[S("h3",{children:"Опубликовано"}),S(Yl,{children:u.published})]})]}),k(Mf,{children:[S(Tf,{children:"Загрузка новых изображений"}),S(wU,{onUploadComplete:h})]}),k(Mf,{children:[S(Tf,{children:"Загруженные изображения"}),k(IU,{children:[S("thead",{children:k("tr",{children:[S("th",{children:"Имя файла"}),S("th",{children:"Дата загрузки"}),S("th",{children:"Статус"}),S("th",{children:"Действия"})]})}),S("tbody",{children:t.map(m=>k("tr",{children:[S("td",{children:m.original_name}),S("td",{children:new Date(m.upload_date).toLocaleDateString()}),S("td",{children:k(UU,{status:m.status,children:[m.status==="uploaded"&&"Загружено",m.status==="analyzing"&&"Анализируется",m.status==="analyzed"&&"Проанализировано",m.status==="review_pending"&&"На проверке",m.status==="published"&&"Опубликовано",m.status==="rejected"&&"Отклонено"]})}),k("td",{children:[S($s,{onClick:()=>v(m),children:(n==null?void 0:n.artwork_id)===m.artwork_id?"Выбрано":"Выбрать"}),m.status==="analyzed"&&S($s,{onClick:d,children:"Повторный анализ"})]})]},m.artwork_id))})]})]}),n&&i&&k(Mf,{children:[k(Tf,{children:["Анализ изображения: ",n.original_name]}),S(yE,{analysis:i,artwork:s,onArtworkChange:_}),S($s,{onClick:y,children:"Сохранить карточку и отправить на проверку"}),S($s,{onClick:p,children:"Опубликовать (для подтвержденных карточек)"}),S($s,{onClick:d,children:"Повторный анализ"})]})]})},__=U.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`,OU=U.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`,kU=U.h1`
  color: #333;
  margin: 0;
`,y_=U.section`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
`,x_=U.h2`
  color: #333;
  margin-top: 0;
  margin-bottom: 1.5rem;
`,Kl=U.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  margin-right: 1rem;
  margin-bottom: 1rem;

  ${({variant:t})=>{switch(t){case"success":return"background-color: #4caf50; color: white;";case"danger":return"background-color: #f44336; color: white;";default:return"background-color: #6200ee; color: white;"}}}

  &:hover {
    opacity: 0.9;
  }
`,FU=U.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background-color: #f8f9fa;
    font-weight: 600;
  }
`,BU=U.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${({status:t})=>{switch(t){case"pending":return"#2196f3";case"approved":return"#4caf50";case"rejected":return"#f44336";case"needs_revision":return"#ff9800";default:return"#9e9e9e"}}};
  color: white;
`,zU=U.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  margin-top: 1rem;
  min-height: 100px;
`,HU=()=>{const[t,e]=O.useState([]),[n,r]=O.useState(null),[i,o]=O.useState(""),[s,a]=O.useState(!0);O.useEffect(()=>{(async()=>{try{const v=await sr.getSubmissionsForReview();e(v)}catch(v){console.error("Ошибка при загрузке материалов на проверку:",v)}finally{a(!1)}})()},[]);const l=h=>{r(h),o(h.reviewer_notes||"")},c=async()=>{if(!n){alert("Сначала выберите материал для одобрения");return}try{await sr.approveSubmission(n.submission_id,{...n.artwork_upload.artwork_data,status:"published",reviewed_by:1,reviewed_at:new Date}),e(h=>h.map(v=>v.submission_id===n.submission_id?{...v,status:"approved"}:v)),alert("Материал одобрен и опубликован")}catch(h){console.error("Ошибка при одобрении материала:",h),alert("Ошибка при одобрении материала")}},u=async()=>{if(!n){alert("Сначала выберите материал для отклонения");return}try{await sr.rejectSubmission(n.submission_id,i),e(h=>h.map(v=>v.submission_id===n.submission_id?{...v,status:"rejected",reviewer_notes:i}:v)),alert("Материал отклонен")}catch(h){console.error("Ошибка при отклонении материала:",h),alert("Ошибка при отклонении материала")}},f=async()=>{if(!n){alert("Сначала выберите материал для возврата на доработку");return}try{await sr.rejectSubmission(n.submission_id,i),e(h=>h.map(v=>v.submission_id===n.submission_id?{...v,status:"needs_revision",reviewer_notes:i}:v)),alert("Материал возвращен на доработку")}catch(h){console.error("Ошибка при возврате на доработку:",h),alert("Ошибка при возврате на доработку")}};return s?S(__,{children:"Загрузка материалов на проверку..."}):k(__,{children:[S(OU,{children:S(kU,{children:"Проверка карточек экспонатов"})}),k(y_,{children:[S(x_,{children:"Материалы на проверке"}),k(FU,{children:[S("thead",{children:k("tr",{children:[S("th",{children:"Имя файла"}),S("th",{children:"Загружено пользователем"}),S("th",{children:"Дата загрузки"}),S("th",{children:"Статус"}),S("th",{children:"Действия"})]})}),S("tbody",{children:t.map(h=>k("tr",{children:[S("td",{children:h.artwork_upload.original_name}),S("td",{children:h.submitted_by}),S("td",{children:new Date(h.submitted_at).toLocaleDateString()}),S("td",{children:k(BU,{status:h.status,children:[h.status==="pending"&&"На проверке",h.status==="approved"&&"Одобрено",h.status==="rejected"&&"Отклонено",h.status==="needs_revision"&&"Требует доработки"]})}),S("td",{children:S(Kl,{variant:"primary",onClick:()=>l(h),children:"Просмотреть"})})]},h.submission_id))})]})]}),n&&k(y_,{children:[k(x_,{children:["Просмотр карточки: ",n.artwork_upload.original_name]}),S(yE,{analysis:n.artwork_upload.analysis_result,artwork:n.artwork_upload.artwork_data||{},onArtworkChange:()=>{}}),S(zU,{value:i,onChange:h=>o(h.target.value),placeholder:"Комментарии к проверке (необходимы при отклонении или возврате на доработку)"}),S(Kl,{variant:"success",onClick:c,children:"Одобрить и опубликовать"}),S(Kl,{variant:"danger",onClick:u,children:"Отклонить"}),S(Kl,{variant:"primary",onClick:f,children:"Вернуть на доработку"})]}),t.length===0&&S("p",{children:"Нет материалов, ожидающих проверки"})]})},VU=U.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`,GU=U.h2`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1.5rem;
`,WU=U.div`
  border: 2px dashed ${t=>t.isDragOver?"#3498db":"#bdc3c7"};
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  background-color: ${t=>(t.isDragOver,"#f8f9fa")};
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;

  &:hover {
    border-color: #3498db;
  }
`,$U=U.div`
  font-size: 3rem;
  color: #bdc3c7;
  margin-bottom: 1rem;
`,S_=U.p`
  color: #7f8c8d;
  margin: 0.5rem 0;
`,jU=U.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;

  &:hover {
    background-color: #2980b9;
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;U.div`
  margin-top: 1.5rem;
`;U.img`
  max-width: 100%;
  max-height: 300px;
  border-radius: 4px;
  display: block;
  margin: 0 auto;
`;const XU=U.div`
  height: 8px;
  background-color: #ecf0f1;
  border-radius: 4px;
  overflow: hidden;
  margin: 1rem 0;
`,qU=U.div`
  height: 100%;
  background-color: #3498db;
  width: ${t=>t.width}%;
  transition: width 0.3s ease;
`,YU=U.div`
  padding: 0.75rem;
  border-radius: 4px;
  margin: 1rem 0;
  text-align: center;
  background-color: ${t=>t.type==="success"?"#d4edda":t.type==="error"?"#f8d7da":"#d1ecf1"};
  color: ${t=>t.type==="success"?"#155724":t.type==="error"?"#721c24":"#0c5460"};
`,KU=()=>{const[t,e]=O.useState([]),[n,r]=O.useState([]),[i,o]=O.useState(!1),[s,a]=O.useState(0),[l,c]=O.useState(0),[u,f]=O.useState(0),[h,v]=O.useState(!1),[_,y]=O.useState(null),[p,d]=O.useState(1),[m,g]=O.useState("drag"),[x,w]=O.useState(""),[A,T]=O.useState(!1),C=O.useRef(null),E=V=>{if(V.target.files&&V.target.files.length>0){const H=Array.from(V.target.files);b(H)}},b=V=>{const H=[];let D="";for(const L of V)if(L.type.startsWith("image/")){if(L.size>10*1024*1024){D="Размер файла не должен превышать 10MB";break}H.push(L)}else if(m==="archive"&&(L.type==="application/zip"||L.name.endsWith(".zip")))H.push(L);else{D="Пожалуйста, выберите изображения или ZIP-архив с изображениями";break}if(D){y({type:"error",message:D});return}e(L=>[...L,...H]),y(null)},W=V=>{V.preventDefault(),o(!0)},j=()=>{o(!1)},ne=V=>{if(V.preventDefault(),o(!1),V.dataTransfer.files&&V.dataTransfer.files.length>0){const H=Array.from(V.dataTransfer.files);b(H)}},N=V=>{V.preventDefault(),x.trim()&&(r(H=>[...H,x]),w(""),y({type:"info",message:`Добавлена ссылка: ${x}`}))},q=async()=>{if(t.length===0&&n.length===0){y({type:"error",message:"Пожалуйста, добавьте изображения или ссылки для загрузки"});return}v(!0),a(0),f(0);let V=t.length;m==="archive"&&(V=1),c(V),y({type:"info",message:"Загрузка изображений..."});try{if(m==="archive"&&t.length>0){for(const D of t)if(D.type==="application/zip"||D.name.endsWith(".zip")){y({type:"info",message:`Извлечение файлов из архива ${D.name}...`}),await new Promise(Y=>setTimeout(Y,1e3));const L=5;c(L);for(let Y=0;Y<L;Y++){f(se=>se+1);const Z=Math.round((Y+1)/L*100);a(Z),await new Promise(se=>setTimeout(se,200))}}}else for(let D=0;D<t.length;D++){const L=t[D];f(D+1);const Y=Math.round((D+1)/t.length*100);a(Y),y({type:"info",message:`Загрузка файла ${D+1} из ${t.length}: ${L.name}`});const Z=await sr.uploadImage(L,p);await new Promise(se=>setTimeout(se,300))}for(let D=0;D<n.length;D++){const L=n[D];f(se=>se+1);const Y=t.length+n.length,Z=Math.round((t.length+D+1)/Y*100);a(Z),y({type:"info",message:`Загрузка по ссылке ${D+1} из ${n.length}: ${L}`}),await new Promise(se=>setTimeout(se,500))}y({type:"success",message:`Все файлы успешно загружены! Обработано: ${t.length} файлов, ${n.length} ссылок.`}),y({type:"info",message:"Запуск ИИ-анализа и генерации миниатюр..."}),await new Promise(D=>setTimeout(D,2e3)),y({type:"success",message:"ИИ-анализ завершен! Миниатюры сгенерированы, водяные знаки добавлены."}),window.confirm("Хотите создать NFT для загруженных произведений?")&&(y({type:"info",message:"Создание NFT..."}),await new Promise(D=>setTimeout(D,1500)),y({type:"success",message:"NFT успешно сформированы и готовы к размещению в блокчейне!"})),e([]),r([]),a(0),f(0),c(0),C.current&&(C.current.value="")}catch(H){console.error("Ошибка при загрузке изображений:",H),y({type:"error",message:`Ошибка при загрузке: ${H.message}`})}finally{v(!1)}},ee=()=>{C.current&&C.current.click()},J=V=>{e(H=>H.filter((D,L)=>L!==V))},G=V=>{r(H=>H.filter((D,L)=>L!==V))};return k(VU,{children:[S(GU,{children:"Загрузка изображений экспонатов"}),k("div",{style:{marginBottom:"1rem"},children:[k("label",{children:[S("input",{type:"radio",checked:m==="drag",onChange:()=>g("drag")})," Загрузка файлов"]}),k("label",{style:{marginLeft:"1rem"},children:[S("input",{type:"radio",checked:m==="archive",onChange:()=>g("archive")})," Загрузка архива"]}),k("label",{style:{marginLeft:"1rem"},children:[S("input",{type:"radio",checked:m==="url",onChange:()=>{g("url"),T(!0)}})," Загрузка по ссылке"]})]}),A&&k("form",{onSubmit:N,style:{marginBottom:"1rem"},children:[S("input",{type:"text",value:x,onChange:V=>w(V.target.value),placeholder:"Введите URL изображения",style:{width:"70%",padding:"0.5rem",marginRight:"0.5rem",borderRadius:"4px",border:"1px solid #ccc"}}),S("button",{type:"submit",style:{padding:"0.5rem 1rem",backgroundColor:"#3498db",color:"white",border:"none",borderRadius:"4px",cursor:"pointer"},children:"Добавить"})]}),k(WU,{isDragOver:i,onDragOver:W,onDragLeave:j,onDrop:ne,onClick:m!=="url"?ee:void 0,children:[S($U,{children:"📁"}),S(S_,{children:m==="archive"?"Перетащите ZIP-архив с изображениями сюда или нажмите для выбора":"Перетащите изображения сюда или нажмите для выбора"}),S(S_,{children:S("small",{children:m==="archive"?"Поддерживаемые форматы: ZIP (макс. 50MB)":"Поддерживаемые форматы: JPG, PNG, GIF (макс. 10MB)"})}),S("input",{type:"file",ref:C,onChange:E,accept:m==="archive"?".zip,application/zip":"image/*",multiple:m!=="archive",style:{display:"none"}})]}),t.length>0&&k("div",{style:{marginTop:"1rem"},children:[S("h4",{children:"Выбранные файлы:"}),S("ul",{children:t.map((V,H)=>k("li",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[k("span",{children:[V.name," (",(V.size/1024/1024).toFixed(2)," MB)"]}),S("button",{onClick:()=>J(H),style:{backgroundColor:"#e74c3c",color:"white",border:"none",borderRadius:"4px",padding:"0.2rem 0.5rem",cursor:"pointer"},children:"Удалить"})]},H))})]}),n.length>0&&k("div",{style:{marginTop:"1rem"},children:[S("h4",{children:"Ссылки для загрузки:"}),S("ul",{children:n.map((V,H)=>k("li",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[S("span",{children:V}),S("button",{onClick:()=>G(H),style:{backgroundColor:"#e74c3c",color:"white",border:"none",borderRadius:"4px",padding:"0.2rem 0.5rem",cursor:"pointer"},children:"Удалить"})]},H))})]}),s>0&&k(bf,{children:[S(XU,{children:S(qU,{width:s})}),k("div",{style:{textAlign:"center",fontSize:"0.9rem",color:"#7f8c8d"},children:[u," из ",l||t.length+n.length," файлов обработано (",s,"%)"]})]}),_&&S(YU,{type:_.type,children:_.message}),S("div",{style:{textAlign:"center"},children:S(jU,{onClick:q,disabled:t.length===0&&n.length===0||h,children:h?"Загрузка...":"Загрузить и обработать"})})]})},ZU=U.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
`,JU=U.header`
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,QU=U.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`,eO=U.aside`
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 1rem 0;
  overflow-y: auto;
`,tO=U.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background-color: #fafafa;
`,nO=U.div`
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  background-color: ${t=>t.active?"#34495e":"transparent"};
  transition: background-color 0.3s;

  &:hover {
    background-color: #34495e;
  }
`,rO=U.h1`
  font-size: 1.5rem;
  color: #2c3e50;
  margin: 0;
`,iO=({title:t,children:e,activeNav:n,onNavClick:r,userRole:i})=>{const o=i==="admin"?["Overview","Users","Artworks","Collections","Exhibitions","Auctions","Reports","Settings"]:["Overview","Artworks","Collections","Exhibitions","Reports"];return k(ZU,{children:[k(JU,{children:[S(rO,{children:t}),k("div",{children:["Welcome, ",i.charAt(0).toUpperCase()+i.slice(1),"!"]})]}),k(QU,{children:[S(eO,{children:o.map(s=>S(nO,{active:n===s.toLowerCase(),onClick:()=>r(s.toLowerCase()),children:s},s))}),S(tO,{children:e})]})]})},oO=U.div`
  padding: 2rem;
`,sO=()=>S(iO,{title:"Загрузка экспонатов",activeNav:"artworks",onNavClick:()=>{},userRole:"admin",children:S(oO,{children:S(KU,{})})}),aO=U.div`
  width: 100%;
  height: 100vh;
  position: relative;
`,lO=U.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  z-index: 10;
  max-width: 300px;
`,cO=U.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  z-index: 10;
  display: flex;
  gap: 1rem;
`,E_=U.button`
  padding: 0.5rem 1rem;
  background: #6200ee;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #3700b3;
  }
`,uO=({artworks:t,onArtworkClick:e,onExitVR:n})=>{var y;const r=O.useRef(null),i=O.useRef(null),o=O.useRef(null),s=O.useRef(null),a=O.useRef(null),l=O.useRef(null),c=O.useRef({});O.useEffect(()=>{if(!r.current)return;const p=new Mm;p.background=new nt(1118483),i.current=p;const d=new dn(75,window.innerWidth/window.innerHeight,.1,1e3);d.position.set(0,1.6,5),o.current=d;const m=new Qu({antialias:!0});m.setSize(window.innerWidth,window.innerHeight),m.setPixelRatio(window.devicePixelRatio),m.shadowMap.enabled=!0,m.xr.enabled=!0,r.current.appendChild(m.domElement),s.current=m,u(p),f(p),v(p,t);const g=new Rm(d,m.domElement);g.enableDamping=!0,g.dampingFactor=.05,a.current=g;const x=()=>{d&&m&&(d.aspect=window.innerWidth/window.innerHeight,d.updateProjectionMatrix(),m.setSize(window.innerWidth,window.innerHeight))};window.addEventListener("resize",x);const w=()=>{l.current=requestAnimationFrame(w),g&&g.update(),m&&m.render(p,d)};return w(),()=>{window.removeEventListener("resize",x),l.current&&cancelAnimationFrame(l.current),r.current&&(m!=null&&m.domElement)&&r.current.removeChild(m.domElement),m&&m.dispose()}},[t]);const u=p=>{const d=new Am(16777215,.6);p.add(d);const m=new bm(16777215,.8);m.position.set(5,10,7),m.castShadow=!0,p.add(m),t.forEach((g,x)=>{const w=new vE(16777215,.8);w.position.set(-6+x%4*4,4,-8+Math.floor(x/4)*-4),w.castShadow=!0,w.angle=Math.PI/6,w.penumbra=.2,w.decay=2,w.distance=200,p.add(w)})},f=p=>{const d=new wr(40,40),m=new gn({color:3355443,roughness:.8,metalness:.2}),g=new ut(d,m);g.rotation.x=-Math.PI/2,g.receiveShadow=!0,p.add(g);const x=new Tr(40,8,.5),w=new gn({color:4473924,roughness:.7,metalness:.3}),A=new ut(x,w);A.position.z=-20,A.position.y=4,A.castShadow=!1,A.receiveShadow=!0,p.add(A);const T=new ut(x,w);T.position.x=-20,T.position.y=4,T.rotation.y=Math.PI/2,T.castShadow=!1,T.receiveShadow=!0,p.add(T);const C=new ut(x,w);C.position.x=20,C.position.y=4,C.rotation.y=Math.PI/2,C.castShadow=!1,C.receiveShadow=!0,p.add(C);const E=new wr(40,40),b=new gn({color:2236962,roughness:.9,metalness:.1}),W=new ut(E,b);W.rotation.x=Math.PI/2,W.position.y=8,W.castShadow=!1,p.add(W),h(p)},h=p=>{const d=new ed(.5,.5,8,16),m=new gn({color:8947848,roughness:.6,metalness:.2});for(let g=0;g<4;g++){const x=new ut(d,m);x.position.x=-15+g*10,x.position.z=-18,x.position.y=4,x.castShadow=!0,x.receiveShadow=!0,p.add(x)}},v=(p,d)=>{Object.values(c.current).forEach(m=>p.remove(m)),c.current={},d.forEach((m,g)=>{const x=-6+g%4*4,w=-8+Math.floor(g/4)*-4,A=2,T=new Tr(2.5,2.5,.1),C=new gn({color:9127187,metalness:.3,roughness:.7}),E=new ut(T,C);E.position.set(x,A,w),E.userData={type:"artwork",artworkId:m.artwork_id,artwork:m},p.add(E);const b=new wr(2.3,2.3),W=new gn({color:11184810,emissive:3355443,roughness:.5,metalness:.1}),j=new ut(b,W);j.position.set(x,A,w+.06),j.userData={type:"artwork",artworkId:m.artwork_id,artwork:m},p.add(j),c.current[m.artwork_id]=j,E.addEventListener("click",()=>{e(m)})})},_=p=>{if(!o.current||!s.current||!i.current)return;const d=new Ge,m=s.current.domElement.getBoundingClientRect();d.x=(p.clientX-m.left)/m.width*2-1,d.y=-((p.clientY-m.top)/m.height)*2+1;const g=new _E;g.setFromCamera(d,o.current);const x=g.intersectObjects(Object.values(c.current));if(x.length>0){const w=x[0].object;w.userData&&w.userData.artwork&&e(w.userData.artwork)}};return O.useEffect(()=>{var d;const p=(d=s.current)==null?void 0:d.domElement;if(p)return p.addEventListener("click",_),()=>{p.removeEventListener("click",_)}},[]),k(aO,{ref:r,children:[k(lO,{children:[S("h3",{children:"Виртуальная галерея"}),S("p",{children:"Используйте мышь для навигации по галерее"}),k("p",{children:["Всего экспонатов: ",t.length]})]}),k(cO,{children:[S(E_,{onClick:()=>{var p,d;return(p=s.current)!=null&&p.xr.isPresenting?(d=s.current.xr.getSession())==null?void 0:d.end():null},children:(y=s.current)!=null&&y.xr.isPresenting?"Выйти из VR":"Войти в VR"}),S(E_,{onClick:n,children:"Назад к галерее"})]})]})},dO=U.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
`,fO=U.div`
  color: red;
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
`,hO=U.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`,pO=U.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
  position: relative;
`,mO=U.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 1.2rem;
`,gO=U.img`
  max-width: 100%;
  max-height: 400px;
  display: block;
  margin: 0 auto;
`,vO=()=>{const[t,e]=O.useState([]),[n,r]=O.useState(!0),[i,o]=O.useState(null),[s,a]=O.useState(null);O.useEffect(()=>{(async()=>{try{const h=await Cn.get("/api/artworks");e(h.data)}catch(h){console.error("Ошибка при загрузке экспонатов:",h),o("Не удалось загрузить экспонаты")}finally{r(!1)}})()},[]);const l=f=>{a(f)},c=()=>{a(null)},u=()=>{window.history.back()};return n?S(dO,{children:"Загрузка виртуальной галереи..."}):i?S(fO,{children:i}):k("div",{children:[S(uO,{artworks:t,onArtworkClick:l,onExitVR:u}),s&&S(hO,{onClick:c,children:k(pO,{onClick:f=>f.stopPropagation(),children:[S(mO,{onClick:c,children:"×"}),S("h2",{children:s.title}),k("p",{children:[S("strong",{children:"Художник:"})," ",s.artist_name]}),s.year_created&&k("p",{children:[S("strong",{children:"Год создания:"})," ",s.year_created]}),s.medium&&k("p",{children:[S("strong",{children:"Материал:"})," ",s.medium]}),s.style&&k("p",{children:[S("strong",{children:"Стиль:"})," ",s.style]}),s.dimensions&&k("p",{children:[S("strong",{children:"Размеры:"})," ",s.dimensions]}),s.description&&k("p",{children:[S("strong",{children:"Описание:"})," ",s.description]}),s.image_url&&S(gO,{src:s.image_url,alt:s.title,onError:f=>{const h=f.target;h.src="https://placehold.co/600x400?text=Изображение+недоступно"}})]})})]})},_O=U.header`
  background-color: #242424;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,yO=U.nav`
  display: flex;
  gap: 1rem;
`,sn=U(tT)`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3a3a3a;
  }
`,xO=U.div`
  display: flex;
  gap: 1rem;
`,SO=U.span`
  color: white;
  margin-right: 1rem;
`,EO=({currentUser:t,onLogout:e})=>{const n=br(),r=()=>{e(),n("/")};return k(_O,{children:[S("h1",{children:S(sn,{to:"/",children:"Виртуальная галерея"})}),k(yO,{children:[S(sn,{to:"/",children:"Главная"}),S(sn,{to:"/artworks",children:"Экспонаты"}),S(sn,{to:"/collections",children:"Коллекции"}),S(sn,{to:"/galleries",children:"Галереи"}),S(sn,{to:"/tours",children:"Туры"}),S(sn,{to:"/vr-gallery",children:"VR-галерея"})]}),S(xO,{children:t?k(bf,{children:[k(SO,{children:["Привет, ",t.username,"!"]}),t.role==="admin"&&S(sn,{to:"/admin",children:"Админ-панель"}),t.role==="curator"&&S(sn,{to:"/curator",children:"Панель куратора"}),t.role==="curator"&&S(sn,{to:"/curator-review",children:"Проверка карточек"}),t.role==="staff"&&S(sn,{to:"/staff-dashboard",children:"Дашборд сотрудника"}),t.role==="tour_guide"&&S(sn,{to:"/tour-guide",children:"Организатор туров"}),t.role==="auction_participant"&&S(sn,{to:"/auction-participant",children:"Участник аукциона"}),S("button",{onClick:r,children:"Выход"})]}):k(bf,{children:[S(sn,{to:"/login",children:"Вход"}),S(sn,{to:"/register",children:"Регистрация"})]})})]})},wO=U.footer`
  background-color: #242424;
  color: white;
  text-align: center;
  padding: 1.5rem;
  margin-top: auto;
`,MO=()=>S(wO,{children:k("p",{children:["© ",new Date().getFullYear()," Виртуальная галерея искусств. Все права защищены."]})}),TO=U.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`,bO=U.main`
  flex: 1;
  padding: 20px;
`,AO=()=>{const[t,e]=O.useState(null),[n,r]=O.useState(null);O.useEffect(()=>{const s=fc();return r(s),localStorage.getItem("authToken"),()=>{s.close()}},[]);const i=s=>{e(s)};return S(JM,{children:k(TO,{children:[S(EO,{currentUser:t,onLogout:()=>{e(null),localStorage.removeItem("authToken")}}),S(bO,{children:k($M,{children:[S(Ct,{path:"/",element:S($R,{})}),S(Ct,{path:"/artworks",element:S(TC,{})}),S(Ct,{path:"/artworks/:id",element:S(dP,{})}),S(Ct,{path:"/vr-gallery",element:S(FI,{})}),S(Ct,{path:"/galleries",element:S(kC,{})}),S(Ct,{path:"/galleries/:id",element:S(QI,{})}),S(Ct,{path:"/rooms/:id",element:S(dU,{})}),S(Ct,{path:"/galleries/:galleryId/rooms/manage",element:(t==null?void 0:t.role)==="curator"||(t==null?void 0:t.role)==="admin"?S(oU,{}):S(Yn,{to:"/login"})}),S(Ct,{path:"/staff-dashboard",element:(t==null?void 0:t.role)==="staff"||(t==null?void 0:t.role)==="admin"?S(v_,{}):S(Yn,{to:"/login"})}),S(Ct,{path:"/curator-review",element:(t==null?void 0:t.role)==="curator"||(t==null?void 0:t.role)==="admin"?S(HU,{}):S(Yn,{to:"/login"})}),S(Ct,{path:"/artwork-upload",element:(t==null?void 0:t.role)==="admin"||(t==null?void 0:t.role)==="curator"?S(sO,{}):S(Yn,{to:"/login"})}),S(Ct,{path:"/virtual-gallery",element:S(vO,{})}),S(Ct,{path:"/admin",element:(t==null?void 0:t.role)==="admin"?S(KR,{}):S(Yn,{to:"/login"})}),S(Ct,{path:"/curator",element:(t==null?void 0:t.role)==="curator"?S(cC,{}):S(Yn,{to:"/login"})}),S(Ct,{path:"/staff",element:(t==null?void 0:t.role)==="staff"?S(v_,{}):S(Yn,{to:"/login"})}),S(Ct,{path:"/tour-guide",element:(t==null?void 0:t.role)==="tour_guide"?S(U0,{title:"Панель экскурсовода"}):S(Yn,{to:"/login"})}),S(Ct,{path:"/auction-participant",element:(t==null?void 0:t.role)==="auction_participant"?S(U0,{title:"Панель участника аукциона"}):S(Yn,{to:"/login"})}),S(Ct,{path:"/login",element:t?S(Yn,{to:"/"}):S(VC,{onLogin:i})}),S(Ct,{path:"/register",element:t?S(Yn,{to:"/"}):S(qC,{onRegister:i})})]})}),S(MO,{})]})})};Af.createRoot(document.getElementById("root")).render(S(ys.StrictMode,{children:S(AO,{})}));
