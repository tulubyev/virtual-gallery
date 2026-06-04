import{j as r,c as Ef,T as fu,I as Mf,P as Tf,C as pu,V as Af,L as mu,a as gu,b as Rf,d as Cf,S as xu,R as Nf,e as Pf}from"./ui-CdlxpsQg.js";import{e as Lf,g as vu,a as O,L as xn,c as jf,u as ha,R as zr,f as fa,h as Df,B as If,i as Uf,j as vt,N as hn}from"./router-DO4-FiBH.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();var Qr={},jl;function Of(){if(jl)return Qr;jl=1;var n=Lf();return Qr.createRoot=n.createRoot,Qr.hydrateRoot=n.hydrateRoot,Qr}var kf=Of();const Ff=vu(kf),Cn=Object.create(null);Cn.open="0";Cn.close="1";Cn.ping="2";Cn.pong="3";Cn.message="4";Cn.upgrade="5";Cn.noop="6";const Bs=Object.create(null);Object.keys(Cn).forEach(n=>{Bs[Cn[n]]=n});const Co={type:"error",data:"parser error"},yu=typeof Blob=="function"||typeof Blob<"u"&&Object.prototype.toString.call(Blob)==="[object BlobConstructor]",_u=typeof ArrayBuffer=="function",bu=n=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(n):n&&n.buffer instanceof ArrayBuffer,il=({type:n,data:e},t,i)=>yu&&e instanceof Blob?t?i(e):Dl(e,i):_u&&(e instanceof ArrayBuffer||bu(e))?t?i(e):Dl(new Blob([e]),i):i(Cn[n]+(e||"")),Dl=(n,e)=>{const t=new FileReader;return t.onload=function(){const i=t.result.split(",")[1];e("b"+(i||""))},t.readAsDataURL(n)};function Il(n){return n instanceof Uint8Array?n:n instanceof ArrayBuffer?new Uint8Array(n):new Uint8Array(n.buffer,n.byteOffset,n.byteLength)}let Pa;function Bf(n,e){if(yu&&n.data instanceof Blob)return n.data.arrayBuffer().then(Il).then(e);if(_u&&(n.data instanceof ArrayBuffer||bu(n.data)))return e(Il(n.data));il(n,!1,t=>{Pa||(Pa=new TextEncoder),e(Pa.encode(t))})}const Ul="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Nr=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(let n=0;n<Ul.length;n++)Nr[Ul.charCodeAt(n)]=n;const zf=n=>{let e=n.length*.75,t=n.length,i,s=0,a,l,o,c;n[n.length-1]==="="&&(e--,n[n.length-2]==="="&&e--);const d=new ArrayBuffer(e),u=new Uint8Array(d);for(i=0;i<t;i+=4)a=Nr[n.charCodeAt(i)],l=Nr[n.charCodeAt(i+1)],o=Nr[n.charCodeAt(i+2)],c=Nr[n.charCodeAt(i+3)],u[s++]=a<<2|l>>4,u[s++]=(l&15)<<4|o>>2,u[s++]=(o&3)<<6|c&63;return d},Hf=typeof ArrayBuffer=="function",rl=(n,e)=>{if(typeof n!="string")return{type:"message",data:wu(n,e)};const t=n.charAt(0);return t==="b"?{type:"message",data:Gf(n.substring(1),e)}:Bs[t]?n.length>1?{type:Bs[t],data:n.substring(1)}:{type:Bs[t]}:Co},Gf=(n,e)=>{if(Hf){const t=zf(n);return wu(t,e)}else return{base64:!0,data:n}},wu=(n,e)=>e==="blob"?n instanceof Blob?n:new Blob([n]):n instanceof ArrayBuffer?n:n.buffer,Su="",Vf=(n,e)=>{const t=n.length,i=new Array(t);let s=0;n.forEach((a,l)=>{il(a,!1,o=>{i[l]=o,++s===t&&e(i.join(Su))})})},Wf=(n,e)=>{const t=n.split(Su),i=[];for(let s=0;s<t.length;s++){const a=rl(t[s],e);if(i.push(a),a.type==="error")break}return i};function Xf(){return new TransformStream({transform(n,e){Bf(n,t=>{const i=t.length;let s;if(i<126)s=new Uint8Array(1),new DataView(s.buffer).setUint8(0,i);else if(i<65536){s=new Uint8Array(3);const a=new DataView(s.buffer);a.setUint8(0,126),a.setUint16(1,i)}else{s=new Uint8Array(9);const a=new DataView(s.buffer);a.setUint8(0,127),a.setBigUint64(1,BigInt(i))}n.data&&typeof n.data!="string"&&(s[0]|=128),e.enqueue(s),e.enqueue(t)})}})}let La;function es(n){return n.reduce((e,t)=>e+t.length,0)}function ts(n,e){if(n[0].length===e)return n.shift();const t=new Uint8Array(e);let i=0;for(let s=0;s<e;s++)t[s]=n[0][i++],i===n[0].length&&(n.shift(),i=0);return n.length&&i<n[0].length&&(n[0]=n[0].slice(i)),t}function qf(n,e){La||(La=new TextDecoder);const t=[];let i=0,s=-1,a=!1;return new TransformStream({transform(l,o){for(t.push(l);;){if(i===0){if(es(t)<1)break;const c=ts(t,1);a=(c[0]&128)===128,s=c[0]&127,s<126?i=3:s===126?i=1:i=2}else if(i===1){if(es(t)<2)break;const c=ts(t,2);s=new DataView(c.buffer,c.byteOffset,c.length).getUint16(0),i=3}else if(i===2){if(es(t)<8)break;const c=ts(t,8),d=new DataView(c.buffer,c.byteOffset,c.length),u=d.getUint32(0);if(u>Math.pow(2,21)-1){o.enqueue(Co);break}s=u*Math.pow(2,32)+d.getUint32(4),i=3}else{if(es(t)<s)break;const c=ts(t,s);o.enqueue(rl(a?c:La.decode(c),e)),i=0}if(s===0||s>n){o.enqueue(Co);break}}}})}const Eu=4;function Tt(n){if(n)return $f(n)}function $f(n){for(var e in Tt.prototype)n[e]=Tt.prototype[e];return n}Tt.prototype.on=Tt.prototype.addEventListener=function(n,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+n]=this._callbacks["$"+n]||[]).push(e),this};Tt.prototype.once=function(n,e){function t(){this.off(n,t),e.apply(this,arguments)}return t.fn=e,this.on(n,t),this};Tt.prototype.off=Tt.prototype.removeListener=Tt.prototype.removeAllListeners=Tt.prototype.removeEventListener=function(n,e){if(this._callbacks=this._callbacks||{},arguments.length==0)return this._callbacks={},this;var t=this._callbacks["$"+n];if(!t)return this;if(arguments.length==1)return delete this._callbacks["$"+n],this;for(var i,s=0;s<t.length;s++)if(i=t[s],i===e||i.fn===e){t.splice(s,1);break}return t.length===0&&delete this._callbacks["$"+n],this};Tt.prototype.emit=function(n){this._callbacks=this._callbacks||{};for(var e=new Array(arguments.length-1),t=this._callbacks["$"+n],i=1;i<arguments.length;i++)e[i-1]=arguments[i];if(t){t=t.slice(0);for(var i=0,s=t.length;i<s;++i)t[i].apply(this,e)}return this};Tt.prototype.emitReserved=Tt.prototype.emit;Tt.prototype.listeners=function(n){return this._callbacks=this._callbacks||{},this._callbacks["$"+n]||[]};Tt.prototype.hasListeners=function(n){return!!this.listeners(n).length};const pa=typeof Promise=="function"&&typeof Promise.resolve=="function"?e=>Promise.resolve().then(e):(e,t)=>t(e,0),on=typeof self<"u"?self:typeof window<"u"?window:Function("return this")(),Yf="arraybuffer";function Mu(n,...e){return e.reduce((t,i)=>(n.hasOwnProperty(i)&&(t[i]=n[i]),t),{})}const Kf=on.setTimeout,Zf=on.clearTimeout;function ma(n,e){e.useNativeTimers?(n.setTimeoutFn=Kf.bind(on),n.clearTimeoutFn=Zf.bind(on)):(n.setTimeoutFn=on.setTimeout.bind(on),n.clearTimeoutFn=on.clearTimeout.bind(on))}const Jf=1.33;function Qf(n){return typeof n=="string"?ep(n):Math.ceil((n.byteLength||n.size)*Jf)}function ep(n){let e=0,t=0;for(let i=0,s=n.length;i<s;i++)e=n.charCodeAt(i),e<128?t+=1:e<2048?t+=2:e<55296||e>=57344?t+=3:(i++,t+=4);return t}function Tu(){return Date.now().toString(36).substring(3)+Math.random().toString(36).substring(2,5)}function tp(n){let e="";for(let t in n)n.hasOwnProperty(t)&&(e.length&&(e+="&"),e+=encodeURIComponent(t)+"="+encodeURIComponent(n[t]));return e}function np(n){let e={},t=n.split("&");for(let i=0,s=t.length;i<s;i++){let a=t[i].split("=");e[decodeURIComponent(a[0])]=decodeURIComponent(a[1])}return e}class ip extends Error{constructor(e,t,i){super(e),this.description=t,this.context=i,this.type="TransportError"}}class sl extends Tt{constructor(e){super(),this.writable=!1,ma(this,e),this.opts=e,this.query=e.query,this.socket=e.socket,this.supportsBinary=!e.forceBase64}onError(e,t,i){return super.emitReserved("error",new ip(e,t,i)),this}open(){return this.readyState="opening",this.doOpen(),this}close(){return(this.readyState==="opening"||this.readyState==="open")&&(this.doClose(),this.onClose()),this}send(e){this.readyState==="open"&&this.write(e)}onOpen(){this.readyState="open",this.writable=!0,super.emitReserved("open")}onData(e){const t=rl(e,this.socket.binaryType);this.onPacket(t)}onPacket(e){super.emitReserved("packet",e)}onClose(e){this.readyState="closed",super.emitReserved("close",e)}pause(e){}createUri(e,t={}){return e+"://"+this._hostname()+this._port()+this.opts.path+this._query(t)}_hostname(){const e=this.opts.hostname;return e.indexOf(":")===-1?e:"["+e+"]"}_port(){return this.opts.port&&(this.opts.secure&&Number(this.opts.port)!==443||!this.opts.secure&&Number(this.opts.port)!==80)?":"+this.opts.port:""}_query(e){const t=tp(e);return t.length?"?"+t:""}}class rp extends sl{constructor(){super(...arguments),this._polling=!1}get name(){return"polling"}doOpen(){this._poll()}pause(e){this.readyState="pausing";const t=()=>{this.readyState="paused",e()};if(this._polling||!this.writable){let i=0;this._polling&&(i++,this.once("pollComplete",function(){--i||t()})),this.writable||(i++,this.once("drain",function(){--i||t()}))}else t()}_poll(){this._polling=!0,this.doPoll(),this.emitReserved("poll")}onData(e){const t=i=>{if(this.readyState==="opening"&&i.type==="open"&&this.onOpen(),i.type==="close")return this.onClose({description:"transport closed by the server"}),!1;this.onPacket(i)};Wf(e,this.socket.binaryType).forEach(t),this.readyState!=="closed"&&(this._polling=!1,this.emitReserved("pollComplete"),this.readyState==="open"&&this._poll())}doClose(){const e=()=>{this.write([{type:"close"}])};this.readyState==="open"?e():this.once("open",e)}write(e){this.writable=!1,Vf(e,t=>{this.doWrite(t,()=>{this.writable=!0,this.emitReserved("drain")})})}uri(){const e=this.opts.secure?"https":"http",t=this.query||{};return this.opts.timestampRequests!==!1&&(t[this.opts.timestampParam]=Tu()),!this.supportsBinary&&!t.sid&&(t.b64=1),this.createUri(e,t)}}let Au=!1;try{Au=typeof XMLHttpRequest<"u"&&"withCredentials"in new XMLHttpRequest}catch{}const sp=Au;function ap(){}class op extends rp{constructor(e){if(super(e),typeof location<"u"){const t=location.protocol==="https:";let i=location.port;i||(i=t?"443":"80"),this.xd=typeof location<"u"&&e.hostname!==location.hostname||i!==e.port}}doWrite(e,t){const i=this.request({method:"POST",data:e});i.on("success",t),i.on("error",(s,a)=>{this.onError("xhr post error",s,a)})}doPoll(){const e=this.request();e.on("data",this.onData.bind(this)),e.on("error",(t,i)=>{this.onError("xhr poll error",t,i)}),this.pollXhr=e}}class An extends Tt{constructor(e,t,i){super(),this.createRequest=e,ma(this,i),this._opts=i,this._method=i.method||"GET",this._uri=t,this._data=i.data!==void 0?i.data:null,this._create()}_create(){var e;const t=Mu(this._opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");t.xdomain=!!this._opts.xd;const i=this._xhr=this.createRequest(t);try{i.open(this._method,this._uri,!0);try{if(this._opts.extraHeaders){i.setDisableHeaderCheck&&i.setDisableHeaderCheck(!0);for(let s in this._opts.extraHeaders)this._opts.extraHeaders.hasOwnProperty(s)&&i.setRequestHeader(s,this._opts.extraHeaders[s])}}catch{}if(this._method==="POST")try{i.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch{}try{i.setRequestHeader("Accept","*/*")}catch{}(e=this._opts.cookieJar)===null||e===void 0||e.addCookies(i),"withCredentials"in i&&(i.withCredentials=this._opts.withCredentials),this._opts.requestTimeout&&(i.timeout=this._opts.requestTimeout),i.onreadystatechange=()=>{var s;i.readyState===3&&((s=this._opts.cookieJar)===null||s===void 0||s.parseCookies(i.getResponseHeader("set-cookie"))),i.readyState===4&&(i.status===200||i.status===1223?this._onLoad():this.setTimeoutFn(()=>{this._onError(typeof i.status=="number"?i.status:0)},0))},i.send(this._data)}catch(s){this.setTimeoutFn(()=>{this._onError(s)},0);return}typeof document<"u"&&(this._index=An.requestsCount++,An.requests[this._index]=this)}_onError(e){this.emitReserved("error",e,this._xhr),this._cleanup(!0)}_cleanup(e){if(!(typeof this._xhr>"u"||this._xhr===null)){if(this._xhr.onreadystatechange=ap,e)try{this._xhr.abort()}catch{}typeof document<"u"&&delete An.requests[this._index],this._xhr=null}}_onLoad(){const e=this._xhr.responseText;e!==null&&(this.emitReserved("data",e),this.emitReserved("success"),this._cleanup())}abort(){this._cleanup()}}An.requestsCount=0;An.requests={};if(typeof document<"u"){if(typeof attachEvent=="function")attachEvent("onunload",Ol);else if(typeof addEventListener=="function"){const n="onpagehide"in on?"pagehide":"unload";addEventListener(n,Ol,!1)}}function Ol(){for(let n in An.requests)An.requests.hasOwnProperty(n)&&An.requests[n].abort()}const lp=(function(){const n=Ru({xdomain:!1});return n&&n.responseType!==null})();class cp extends op{constructor(e){super(e);const t=e&&e.forceBase64;this.supportsBinary=lp&&!t}request(e={}){return Object.assign(e,{xd:this.xd},this.opts),new An(Ru,this.uri(),e)}}function Ru(n){const e=n.xdomain;try{if(typeof XMLHttpRequest<"u"&&(!e||sp))return new XMLHttpRequest}catch{}if(!e)try{return new on[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")}catch{}}const Cu=typeof navigator<"u"&&typeof navigator.product=="string"&&navigator.product.toLowerCase()==="reactnative";class dp extends sl{get name(){return"websocket"}doOpen(){const e=this.uri(),t=this.opts.protocols,i=Cu?{}:Mu(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(i.headers=this.opts.extraHeaders);try{this.ws=this.createSocket(e,t,i)}catch(s){return this.emitReserved("error",s)}this.ws.binaryType=this.socket.binaryType,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=e=>this.onClose({description:"websocket connection closed",context:e}),this.ws.onmessage=e=>this.onData(e.data),this.ws.onerror=e=>this.onError("websocket error",e)}write(e){this.writable=!1;for(let t=0;t<e.length;t++){const i=e[t],s=t===e.length-1;il(i,this.supportsBinary,a=>{try{this.doWrite(i,a)}catch{}s&&pa(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){typeof this.ws<"u"&&(this.ws.onerror=()=>{},this.ws.close(),this.ws=null)}uri(){const e=this.opts.secure?"wss":"ws",t=this.query||{};return this.opts.timestampRequests&&(t[this.opts.timestampParam]=Tu()),this.supportsBinary||(t.b64=1),this.createUri(e,t)}}const ja=on.WebSocket||on.MozWebSocket;class up extends dp{createSocket(e,t,i){return Cu?new ja(e,t,i):t?new ja(e,t):new ja(e)}doWrite(e,t){this.ws.send(t)}}class hp extends sl{get name(){return"webtransport"}doOpen(){try{this._transport=new WebTransport(this.createUri("https"),this.opts.transportOptions[this.name])}catch(e){return this.emitReserved("error",e)}this._transport.closed.then(()=>{this.onClose()}).catch(e=>{this.onError("webtransport error",e)}),this._transport.ready.then(()=>{this._transport.createBidirectionalStream().then(e=>{const t=qf(Number.MAX_SAFE_INTEGER,this.socket.binaryType),i=e.readable.pipeThrough(t).getReader(),s=Xf();s.readable.pipeTo(e.writable),this._writer=s.writable.getWriter();const a=()=>{i.read().then(({done:o,value:c})=>{o||(this.onPacket(c),a())}).catch(o=>{})};a();const l={type:"open"};this.query.sid&&(l.data=`{"sid":"${this.query.sid}"}`),this._writer.write(l).then(()=>this.onOpen())})})}write(e){this.writable=!1;for(let t=0;t<e.length;t++){const i=e[t],s=t===e.length-1;this._writer.write(i).then(()=>{s&&pa(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){var e;(e=this._transport)===null||e===void 0||e.close()}}const fp={websocket:up,webtransport:hp,polling:cp},pp=/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,mp=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function No(n){if(n.length>8e3)throw"URI too long";const e=n,t=n.indexOf("["),i=n.indexOf("]");t!=-1&&i!=-1&&(n=n.substring(0,t)+n.substring(t,i).replace(/:/g,";")+n.substring(i,n.length));let s=pp.exec(n||""),a={},l=14;for(;l--;)a[mp[l]]=s[l]||"";return t!=-1&&i!=-1&&(a.source=e,a.host=a.host.substring(1,a.host.length-1).replace(/;/g,":"),a.authority=a.authority.replace("[","").replace("]","").replace(/;/g,":"),a.ipv6uri=!0),a.pathNames=gp(a,a.path),a.queryKey=xp(a,a.query),a}function gp(n,e){const t=/\/{2,9}/g,i=e.replace(t,"/").split("/");return(e.slice(0,1)=="/"||e.length===0)&&i.splice(0,1),e.slice(-1)=="/"&&i.splice(i.length-1,1),i}function xp(n,e){const t={};return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(i,s,a){s&&(t[s]=a)}),t}const Po=typeof addEventListener=="function"&&typeof removeEventListener=="function",zs=[];Po&&addEventListener("offline",()=>{zs.forEach(n=>n())},!1);class ei extends Tt{constructor(e,t){if(super(),this.binaryType=Yf,this.writeBuffer=[],this._prevBufferLen=0,this._pingInterval=-1,this._pingTimeout=-1,this._maxPayload=-1,this._pingTimeoutTime=1/0,e&&typeof e=="object"&&(t=e,e=null),e){const i=No(e);t.hostname=i.host,t.secure=i.protocol==="https"||i.protocol==="wss",t.port=i.port,i.query&&(t.query=i.query)}else t.host&&(t.hostname=No(t.host).host);ma(this,t),this.secure=t.secure!=null?t.secure:typeof location<"u"&&location.protocol==="https:",t.hostname&&!t.port&&(t.port=this.secure?"443":"80"),this.hostname=t.hostname||(typeof location<"u"?location.hostname:"localhost"),this.port=t.port||(typeof location<"u"&&location.port?location.port:this.secure?"443":"80"),this.transports=[],this._transportsByName={},t.transports.forEach(i=>{const s=i.prototype.name;this.transports.push(s),this._transportsByName[s]=i}),this.opts=Object.assign({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,addTrailingSlash:!0,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!1},t),this.opts.path=this.opts.path.replace(/\/$/,"")+(this.opts.addTrailingSlash?"/":""),typeof this.opts.query=="string"&&(this.opts.query=np(this.opts.query)),Po&&(this.opts.closeOnBeforeunload&&(this._beforeunloadEventListener=()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},addEventListener("beforeunload",this._beforeunloadEventListener,!1)),this.hostname!=="localhost"&&(this._offlineEventListener=()=>{this._onClose("transport close",{description:"network connection lost"})},zs.push(this._offlineEventListener))),this.opts.withCredentials&&(this._cookieJar=void 0),this._open()}createTransport(e){const t=Object.assign({},this.opts.query);t.EIO=Eu,t.transport=e,this.id&&(t.sid=this.id);const i=Object.assign({},this.opts,{query:t,socket:this,hostname:this.hostname,secure:this.secure,port:this.port},this.opts.transportOptions[e]);return new this._transportsByName[e](i)}_open(){if(this.transports.length===0){this.setTimeoutFn(()=>{this.emitReserved("error","No transports available")},0);return}const e=this.opts.rememberUpgrade&&ei.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1?"websocket":this.transports[0];this.readyState="opening";const t=this.createTransport(e);t.open(),this.setTransport(t)}setTransport(e){this.transport&&this.transport.removeAllListeners(),this.transport=e,e.on("drain",this._onDrain.bind(this)).on("packet",this._onPacket.bind(this)).on("error",this._onError.bind(this)).on("close",t=>this._onClose("transport close",t))}onOpen(){this.readyState="open",ei.priorWebsocketSuccess=this.transport.name==="websocket",this.emitReserved("open"),this.flush()}_onPacket(e){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")switch(this.emitReserved("packet",e),this.emitReserved("heartbeat"),e.type){case"open":this.onHandshake(JSON.parse(e.data));break;case"ping":this._sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong"),this._resetPingTimeout();break;case"error":const t=new Error("server error");t.code=e.data,this._onError(t);break;case"message":this.emitReserved("data",e.data),this.emitReserved("message",e.data);break}}onHandshake(e){this.emitReserved("handshake",e),this.id=e.sid,this.transport.query.sid=e.sid,this._pingInterval=e.pingInterval,this._pingTimeout=e.pingTimeout,this._maxPayload=e.maxPayload,this.onOpen(),this.readyState!=="closed"&&this._resetPingTimeout()}_resetPingTimeout(){this.clearTimeoutFn(this._pingTimeoutTimer);const e=this._pingInterval+this._pingTimeout;this._pingTimeoutTime=Date.now()+e,this._pingTimeoutTimer=this.setTimeoutFn(()=>{this._onClose("ping timeout")},e),this.opts.autoUnref&&this._pingTimeoutTimer.unref()}_onDrain(){this.writeBuffer.splice(0,this._prevBufferLen),this._prevBufferLen=0,this.writeBuffer.length===0?this.emitReserved("drain"):this.flush()}flush(){if(this.readyState!=="closed"&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){const e=this._getWritablePackets();this.transport.send(e),this._prevBufferLen=e.length,this.emitReserved("flush")}}_getWritablePackets(){if(!(this._maxPayload&&this.transport.name==="polling"&&this.writeBuffer.length>1))return this.writeBuffer;let t=1;for(let i=0;i<this.writeBuffer.length;i++){const s=this.writeBuffer[i].data;if(s&&(t+=Qf(s)),i>0&&t>this._maxPayload)return this.writeBuffer.slice(0,i);t+=2}return this.writeBuffer}_hasPingExpired(){if(!this._pingTimeoutTime)return!0;const e=Date.now()>this._pingTimeoutTime;return e&&(this._pingTimeoutTime=0,pa(()=>{this._onClose("ping timeout")},this.setTimeoutFn)),e}write(e,t,i){return this._sendPacket("message",e,t,i),this}send(e,t,i){return this._sendPacket("message",e,t,i),this}_sendPacket(e,t,i,s){if(typeof t=="function"&&(s=t,t=void 0),typeof i=="function"&&(s=i,i=null),this.readyState==="closing"||this.readyState==="closed")return;i=i||{},i.compress=i.compress!==!1;const a={type:e,data:t,options:i};this.emitReserved("packetCreate",a),this.writeBuffer.push(a),s&&this.once("flush",s),this.flush()}close(){const e=()=>{this._onClose("forced close"),this.transport.close()},t=()=>{this.off("upgrade",t),this.off("upgradeError",t),e()},i=()=>{this.once("upgrade",t),this.once("upgradeError",t)};return(this.readyState==="opening"||this.readyState==="open")&&(this.readyState="closing",this.writeBuffer.length?this.once("drain",()=>{this.upgrading?i():e()}):this.upgrading?i():e()),this}_onError(e){if(ei.priorWebsocketSuccess=!1,this.opts.tryAllTransports&&this.transports.length>1&&this.readyState==="opening")return this.transports.shift(),this._open();this.emitReserved("error",e),this._onClose("transport error",e)}_onClose(e,t){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing"){if(this.clearTimeoutFn(this._pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),Po&&(this._beforeunloadEventListener&&removeEventListener("beforeunload",this._beforeunloadEventListener,!1),this._offlineEventListener)){const i=zs.indexOf(this._offlineEventListener);i!==-1&&zs.splice(i,1)}this.readyState="closed",this.id=null,this.emitReserved("close",e,t),this.writeBuffer=[],this._prevBufferLen=0}}}ei.protocol=Eu;class vp extends ei{constructor(){super(...arguments),this._upgrades=[]}onOpen(){if(super.onOpen(),this.readyState==="open"&&this.opts.upgrade)for(let e=0;e<this._upgrades.length;e++)this._probe(this._upgrades[e])}_probe(e){let t=this.createTransport(e),i=!1;ei.priorWebsocketSuccess=!1;const s=()=>{i||(t.send([{type:"ping",data:"probe"}]),t.once("packet",f=>{if(!i)if(f.type==="pong"&&f.data==="probe"){if(this.upgrading=!0,this.emitReserved("upgrading",t),!t)return;ei.priorWebsocketSuccess=t.name==="websocket",this.transport.pause(()=>{i||this.readyState!=="closed"&&(u(),this.setTransport(t),t.send([{type:"upgrade"}]),this.emitReserved("upgrade",t),t=null,this.upgrading=!1,this.flush())})}else{const p=new Error("probe error");p.transport=t.name,this.emitReserved("upgradeError",p)}}))};function a(){i||(i=!0,u(),t.close(),t=null)}const l=f=>{const p=new Error("probe error: "+f);p.transport=t.name,a(),this.emitReserved("upgradeError",p)};function o(){l("transport closed")}function c(){l("socket closed")}function d(f){t&&f.name!==t.name&&a()}const u=()=>{t.removeListener("open",s),t.removeListener("error",l),t.removeListener("close",o),this.off("close",c),this.off("upgrading",d)};t.once("open",s),t.once("error",l),t.once("close",o),this.once("close",c),this.once("upgrading",d),this._upgrades.indexOf("webtransport")!==-1&&e!=="webtransport"?this.setTimeoutFn(()=>{i||t.open()},200):t.open()}onHandshake(e){this._upgrades=this._filterUpgrades(e.upgrades),super.onHandshake(e)}_filterUpgrades(e){const t=[];for(let i=0;i<e.length;i++)~this.transports.indexOf(e[i])&&t.push(e[i]);return t}}let yp=class extends vp{constructor(e,t={}){const i=typeof e=="object"?e:t;(!i.transports||i.transports&&typeof i.transports[0]=="string")&&(i.transports=(i.transports||["polling","websocket","webtransport"]).map(s=>fp[s]).filter(s=>!!s)),super(e,i)}};function _p(n,e="",t){let i=n;t=t||typeof location<"u"&&location,n==null&&(n=t.protocol+"//"+t.host),typeof n=="string"&&(n.charAt(0)==="/"&&(n.charAt(1)==="/"?n=t.protocol+n:n=t.host+n),/^(https?|wss?):\/\//.test(n)||(typeof t<"u"?n=t.protocol+"//"+n:n="https://"+n),i=No(n)),i.port||(/^(http|ws)$/.test(i.protocol)?i.port="80":/^(http|ws)s$/.test(i.protocol)&&(i.port="443")),i.path=i.path||"/";const a=i.host.indexOf(":")!==-1?"["+i.host+"]":i.host;return i.id=i.protocol+"://"+a+":"+i.port+e,i.href=i.protocol+"://"+a+(t&&t.port===i.port?"":":"+i.port),i}const bp=typeof ArrayBuffer=="function",wp=n=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(n):n.buffer instanceof ArrayBuffer,Nu=Object.prototype.toString,Sp=typeof Blob=="function"||typeof Blob<"u"&&Nu.call(Blob)==="[object BlobConstructor]",Ep=typeof File=="function"||typeof File<"u"&&Nu.call(File)==="[object FileConstructor]";function al(n){return bp&&(n instanceof ArrayBuffer||wp(n))||Sp&&n instanceof Blob||Ep&&n instanceof File}function Hs(n,e){if(!n||typeof n!="object")return!1;if(Array.isArray(n)){for(let t=0,i=n.length;t<i;t++)if(Hs(n[t]))return!0;return!1}if(al(n))return!0;if(n.toJSON&&typeof n.toJSON=="function"&&arguments.length===1)return Hs(n.toJSON(),!0);for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t)&&Hs(n[t]))return!0;return!1}function Mp(n){const e=[],t=n.data,i=n;return i.data=Lo(t,e),i.attachments=e.length,{packet:i,buffers:e}}function Lo(n,e){if(!n)return n;if(al(n)){const t={_placeholder:!0,num:e.length};return e.push(n),t}else if(Array.isArray(n)){const t=new Array(n.length);for(let i=0;i<n.length;i++)t[i]=Lo(n[i],e);return t}else if(typeof n=="object"&&!(n instanceof Date)){const t={};for(const i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=Lo(n[i],e));return t}return n}function Tp(n,e){return n.data=jo(n.data,e),delete n.attachments,n}function jo(n,e){if(!n)return n;if(n&&n._placeholder===!0){if(typeof n.num=="number"&&n.num>=0&&n.num<e.length)return e[n.num];throw new Error("illegal attachments")}else if(Array.isArray(n))for(let t=0;t<n.length;t++)n[t]=jo(n[t],e);else if(typeof n=="object")for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&(n[t]=jo(n[t],e));return n}const Ap=["connect","connect_error","disconnect","disconnecting","newListener","removeListener"];var at;(function(n){n[n.CONNECT=0]="CONNECT",n[n.DISCONNECT=1]="DISCONNECT",n[n.EVENT=2]="EVENT",n[n.ACK=3]="ACK",n[n.CONNECT_ERROR=4]="CONNECT_ERROR",n[n.BINARY_EVENT=5]="BINARY_EVENT",n[n.BINARY_ACK=6]="BINARY_ACK"})(at||(at={}));class Rp{constructor(e){this.replacer=e}encode(e){return(e.type===at.EVENT||e.type===at.ACK)&&Hs(e)?this.encodeAsBinary({type:e.type===at.EVENT?at.BINARY_EVENT:at.BINARY_ACK,nsp:e.nsp,data:e.data,id:e.id}):[this.encodeAsString(e)]}encodeAsString(e){let t=""+e.type;return(e.type===at.BINARY_EVENT||e.type===at.BINARY_ACK)&&(t+=e.attachments+"-"),e.nsp&&e.nsp!=="/"&&(t+=e.nsp+","),e.id!=null&&(t+=e.id),e.data!=null&&(t+=JSON.stringify(e.data,this.replacer)),t}encodeAsBinary(e){const t=Mp(e),i=this.encodeAsString(t.packet),s=t.buffers;return s.unshift(i),s}}class ol extends Tt{constructor(e){super(),this.opts=Object.assign({reviver:void 0,maxAttachments:10},typeof e=="function"?{reviver:e}:e)}add(e){let t;if(typeof e=="string"){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");t=this.decodeString(e);const i=t.type===at.BINARY_EVENT;i||t.type===at.BINARY_ACK?(t.type=i?at.EVENT:at.ACK,this.reconstructor=new Cp(t),t.attachments===0&&super.emitReserved("decoded",t)):super.emitReserved("decoded",t)}else if(al(e)||e.base64)if(this.reconstructor)t=this.reconstructor.takeBinaryData(e),t&&(this.reconstructor=null,super.emitReserved("decoded",t));else throw new Error("got binary data when not reconstructing a packet");else throw new Error("Unknown type: "+e)}decodeString(e){let t=0;const i={type:Number(e.charAt(0))};if(at[i.type]===void 0)throw new Error("unknown packet type "+i.type);if(i.type===at.BINARY_EVENT||i.type===at.BINARY_ACK){const a=t+1;for(;e.charAt(++t)!=="-"&&t!=e.length;);const l=e.substring(a,t);if(l!=Number(l)||e.charAt(t)!=="-")throw new Error("Illegal attachments");const o=Number(l);if(!Np(o)||o<0)throw new Error("Illegal attachments");if(o>this.opts.maxAttachments)throw new Error("too many attachments");i.attachments=o}if(e.charAt(t+1)==="/"){const a=t+1;for(;++t&&!(e.charAt(t)===","||t===e.length););i.nsp=e.substring(a,t)}else i.nsp="/";const s=e.charAt(t+1);if(s!==""&&Number(s)==s){const a=t+1;for(;++t;){const l=e.charAt(t);if(l==null||Number(l)!=l){--t;break}if(t===e.length)break}i.id=Number(e.substring(a,t+1))}if(e.charAt(++t)){const a=this.tryParse(e.substr(t));if(ol.isPayloadValid(i.type,a))i.data=a;else throw new Error("invalid payload")}return i}tryParse(e){try{return JSON.parse(e,this.opts.reviver)}catch{return!1}}static isPayloadValid(e,t){switch(e){case at.CONNECT:return kl(t);case at.DISCONNECT:return t===void 0;case at.CONNECT_ERROR:return typeof t=="string"||kl(t);case at.EVENT:case at.BINARY_EVENT:return Array.isArray(t)&&(typeof t[0]=="number"||typeof t[0]=="string"&&Ap.indexOf(t[0])===-1);case at.ACK:case at.BINARY_ACK:return Array.isArray(t)}}destroy(){this.reconstructor&&(this.reconstructor.finishedReconstruction(),this.reconstructor=null)}}class Cp{constructor(e){this.packet=e,this.buffers=[],this.reconPack=e}takeBinaryData(e){if(this.buffers.push(e),this.buffers.length===this.reconPack.attachments){const t=Tp(this.reconPack,this.buffers);return this.finishedReconstruction(),t}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}}const Np=Number.isInteger||function(n){return typeof n=="number"&&isFinite(n)&&Math.floor(n)===n};function kl(n){return Object.prototype.toString.call(n)==="[object Object]"}const Pp=Object.freeze(Object.defineProperty({__proto__:null,Decoder:ol,Encoder:Rp,get PacketType(){return at}},Symbol.toStringTag,{value:"Module"}));function gn(n,e,t){return n.on(e,t),function(){n.off(e,t)}}const Lp=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1});class Pu extends Tt{constructor(e,t,i){super(),this.connected=!1,this.recovered=!1,this.receiveBuffer=[],this.sendBuffer=[],this._queue=[],this._queueSeq=0,this.ids=0,this.acks={},this.flags={},this.io=e,this.nsp=t,i&&i.auth&&(this.auth=i.auth),this._opts=Object.assign({},i),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;const e=this.io;this.subs=[gn(e,"open",this.onopen.bind(this)),gn(e,"packet",this.onpacket.bind(this)),gn(e,"error",this.onerror.bind(this)),gn(e,"close",this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected?this:(this.subEvents(),this.io._reconnecting||this.io.open(),this.io._readyState==="open"&&this.onopen(),this)}open(){return this.connect()}send(...e){return e.unshift("message"),this.emit.apply(this,e),this}emit(e,...t){var i,s,a;if(Lp.hasOwnProperty(e))throw new Error('"'+e.toString()+'" is a reserved event name');if(t.unshift(e),this._opts.retries&&!this.flags.fromQueue&&!this.flags.volatile)return this._addToQueue(t),this;const l={type:at.EVENT,data:t};if(l.options={},l.options.compress=this.flags.compress!==!1,typeof t[t.length-1]=="function"){const u=this.ids++,f=t.pop();this._registerAckCallback(u,f),l.id=u}const o=(s=(i=this.io.engine)===null||i===void 0?void 0:i.transport)===null||s===void 0?void 0:s.writable,c=this.connected&&!(!((a=this.io.engine)===null||a===void 0)&&a._hasPingExpired());return this.flags.volatile&&!o||(c?(this.notifyOutgoingListeners(l),this.packet(l)):this.sendBuffer.push(l)),this.flags={},this}_registerAckCallback(e,t){var i;const s=(i=this.flags.timeout)!==null&&i!==void 0?i:this._opts.ackTimeout;if(s===void 0){this.acks[e]=t;return}const a=this.io.setTimeoutFn(()=>{delete this.acks[e];for(let o=0;o<this.sendBuffer.length;o++)this.sendBuffer[o].id===e&&this.sendBuffer.splice(o,1);t.call(this,new Error("operation has timed out"))},s),l=(...o)=>{this.io.clearTimeoutFn(a),t.apply(this,o)};l.withError=!0,this.acks[e]=l}emitWithAck(e,...t){return new Promise((i,s)=>{const a=(l,o)=>l?s(l):i(o);a.withError=!0,t.push(a),this.emit(e,...t)})}_addToQueue(e){let t;typeof e[e.length-1]=="function"&&(t=e.pop());const i={id:this._queueSeq++,tryCount:0,pending:!1,args:e,flags:Object.assign({fromQueue:!0},this.flags)};e.push((s,...a)=>(this._queue[0],s!==null?i.tryCount>this._opts.retries&&(this._queue.shift(),t&&t(s)):(this._queue.shift(),t&&t(null,...a)),i.pending=!1,this._drainQueue())),this._queue.push(i),this._drainQueue()}_drainQueue(e=!1){if(!this.connected||this._queue.length===0)return;const t=this._queue[0];t.pending&&!e||(t.pending=!0,t.tryCount++,this.flags=t.flags,this.emit.apply(this,t.args))}packet(e){e.nsp=this.nsp,this.io._packet(e)}onopen(){typeof this.auth=="function"?this.auth(e=>{this._sendConnectPacket(e)}):this._sendConnectPacket(this.auth)}_sendConnectPacket(e){this.packet({type:at.CONNECT,data:this._pid?Object.assign({pid:this._pid,offset:this._lastOffset},e):e})}onerror(e){this.connected||this.emitReserved("connect_error",e)}onclose(e,t){this.connected=!1,delete this.id,this.emitReserved("disconnect",e,t),this._clearAcks()}_clearAcks(){Object.keys(this.acks).forEach(e=>{if(!this.sendBuffer.some(i=>String(i.id)===e)){const i=this.acks[e];delete this.acks[e],i.withError&&i.call(this,new Error("socket has been disconnected"))}})}onpacket(e){if(e.nsp===this.nsp)switch(e.type){case at.CONNECT:e.data&&e.data.sid?this.onconnect(e.data.sid,e.data.pid):this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case at.EVENT:case at.BINARY_EVENT:this.onevent(e);break;case at.ACK:case at.BINARY_ACK:this.onack(e);break;case at.DISCONNECT:this.ondisconnect();break;case at.CONNECT_ERROR:this.destroy();const i=new Error(e.data.message);i.data=e.data.data,this.emitReserved("connect_error",i);break}}onevent(e){const t=e.data||[];e.id!=null&&t.push(this.ack(e.id)),this.connected?this.emitEvent(t):this.receiveBuffer.push(Object.freeze(t))}emitEvent(e){if(this._anyListeners&&this._anyListeners.length){const t=this._anyListeners.slice();for(const i of t)i.apply(this,e)}super.emit.apply(this,e),this._pid&&e.length&&typeof e[e.length-1]=="string"&&(this._lastOffset=e[e.length-1])}ack(e){const t=this;let i=!1;return function(...s){i||(i=!0,t.packet({type:at.ACK,id:e,data:s}))}}onack(e){const t=this.acks[e.id];typeof t=="function"&&(delete this.acks[e.id],t.withError&&e.data.unshift(null),t.apply(this,e.data))}onconnect(e,t){this.id=e,this.recovered=t&&this._pid===t,this._pid=t,this.connected=!0,this.emitBuffered(),this._drainQueue(!0),this.emitReserved("connect")}emitBuffered(){this.receiveBuffer.forEach(e=>this.emitEvent(e)),this.receiveBuffer=[],this.sendBuffer.forEach(e=>{this.notifyOutgoingListeners(e),this.packet(e)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose("io server disconnect")}destroy(){this.subs&&(this.subs.forEach(e=>e()),this.subs=void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:at.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}close(){return this.disconnect()}compress(e){return this.flags.compress=e,this}get volatile(){return this.flags.volatile=!0,this}timeout(e){return this.flags.timeout=e,this}onAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(e),this}prependAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(e),this}offAny(e){if(!this._anyListeners)return this;if(e){const t=this._anyListeners;for(let i=0;i<t.length;i++)if(e===t[i])return t.splice(i,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(e),this}prependAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(e),this}offAnyOutgoing(e){if(!this._anyOutgoingListeners)return this;if(e){const t=this._anyOutgoingListeners;for(let i=0;i<t.length;i++)if(e===t[i])return t.splice(i,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(e){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){const t=this._anyOutgoingListeners.slice();for(const i of t)i.apply(this,e.data)}}}function ur(n){n=n||{},this.ms=n.min||100,this.max=n.max||1e4,this.factor=n.factor||2,this.jitter=n.jitter>0&&n.jitter<=1?n.jitter:0,this.attempts=0}ur.prototype.duration=function(){var n=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var e=Math.random(),t=Math.floor(e*this.jitter*n);n=(Math.floor(e*10)&1)==0?n-t:n+t}return Math.min(n,this.max)|0};ur.prototype.reset=function(){this.attempts=0};ur.prototype.setMin=function(n){this.ms=n};ur.prototype.setMax=function(n){this.max=n};ur.prototype.setJitter=function(n){this.jitter=n};class Do extends Tt{constructor(e,t){var i;super(),this.nsps={},this.subs=[],e&&typeof e=="object"&&(t=e,e=void 0),t=t||{},t.path=t.path||"/socket.io",this.opts=t,ma(this,t),this.reconnection(t.reconnection!==!1),this.reconnectionAttempts(t.reconnectionAttempts||1/0),this.reconnectionDelay(t.reconnectionDelay||1e3),this.reconnectionDelayMax(t.reconnectionDelayMax||5e3),this.randomizationFactor((i=t.randomizationFactor)!==null&&i!==void 0?i:.5),this.backoff=new ur({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(t.timeout==null?2e4:t.timeout),this._readyState="closed",this.uri=e;const s=t.parser||Pp;this.encoder=new s.Encoder,this.decoder=new s.Decoder,this._autoConnect=t.autoConnect!==!1,this._autoConnect&&this.open()}reconnection(e){return arguments.length?(this._reconnection=!!e,e||(this.skipReconnect=!0),this):this._reconnection}reconnectionAttempts(e){return e===void 0?this._reconnectionAttempts:(this._reconnectionAttempts=e,this)}reconnectionDelay(e){var t;return e===void 0?this._reconnectionDelay:(this._reconnectionDelay=e,(t=this.backoff)===null||t===void 0||t.setMin(e),this)}randomizationFactor(e){var t;return e===void 0?this._randomizationFactor:(this._randomizationFactor=e,(t=this.backoff)===null||t===void 0||t.setJitter(e),this)}reconnectionDelayMax(e){var t;return e===void 0?this._reconnectionDelayMax:(this._reconnectionDelayMax=e,(t=this.backoff)===null||t===void 0||t.setMax(e),this)}timeout(e){return arguments.length?(this._timeout=e,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&this.backoff.attempts===0&&this.reconnect()}open(e){if(~this._readyState.indexOf("open"))return this;this.engine=new yp(this.uri,this.opts);const t=this.engine,i=this;this._readyState="opening",this.skipReconnect=!1;const s=gn(t,"open",function(){i.onopen(),e&&e()}),a=o=>{this.cleanup(),this._readyState="closed",this.emitReserved("error",o),e?e(o):this.maybeReconnectOnOpen()},l=gn(t,"error",a);if(this._timeout!==!1){const o=this._timeout,c=this.setTimeoutFn(()=>{s(),a(new Error("timeout")),t.close()},o);this.opts.autoUnref&&c.unref(),this.subs.push(()=>{this.clearTimeoutFn(c)})}return this.subs.push(s),this.subs.push(l),this}connect(e){return this.open(e)}onopen(){this.cleanup(),this._readyState="open",this.emitReserved("open");const e=this.engine;this.subs.push(gn(e,"ping",this.onping.bind(this)),gn(e,"data",this.ondata.bind(this)),gn(e,"error",this.onerror.bind(this)),gn(e,"close",this.onclose.bind(this)),gn(this.decoder,"decoded",this.ondecoded.bind(this)))}onping(){this.emitReserved("ping")}ondata(e){try{this.decoder.add(e)}catch(t){this.onclose("parse error",t)}}ondecoded(e){pa(()=>{this.emitReserved("packet",e)},this.setTimeoutFn)}onerror(e){this.emitReserved("error",e)}socket(e,t){let i=this.nsps[e];return i?this._autoConnect&&!i.active&&i.connect():(i=new Pu(this,e,t),this.nsps[e]=i),i}_destroy(e){const t=Object.keys(this.nsps);for(const i of t)if(this.nsps[i].active)return;this._close()}_packet(e){const t=this.encoder.encode(e);for(let i=0;i<t.length;i++)this.engine.write(t[i],e.options)}cleanup(){this.subs.forEach(e=>e()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close")}disconnect(){return this._close()}onclose(e,t){var i;this.cleanup(),(i=this.engine)===null||i===void 0||i.close(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",e,t),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;const e=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{const t=this.backoff.duration();this._reconnecting=!0;const i=this.setTimeoutFn(()=>{e.skipReconnect||(this.emitReserved("reconnect_attempt",e.backoff.attempts),!e.skipReconnect&&e.open(s=>{s?(e._reconnecting=!1,e.reconnect(),this.emitReserved("reconnect_error",s)):e.onreconnect()}))},t);this.opts.autoUnref&&i.unref(),this.subs.push(()=>{this.clearTimeoutFn(i)})}}onreconnect(){const e=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",e)}}const gr={};function Gs(n,e){typeof n=="object"&&(e=n,n=void 0),e=e||{};const t=_p(n,e.path||"/socket.io"),i=t.source,s=t.id,a=t.path,l=gr[s]&&a in gr[s].nsps,o=e.forceNew||e["force new connection"]||e.multiplex===!1||l;let c;return o?c=new Do(i,e):(gr[s]||(gr[s]=new Do(i,e)),c=gr[s]),t.query&&!e.query&&(e.query=t.queryKey),c.socket(t.path,e)}Object.assign(Gs,{Manager:Do,Socket:Pu,io:Gs,connect:Gs});const jp=n=>n.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Lu=(...n)=>n.filter((e,t,i)=>!!e&&e.trim()!==""&&i.indexOf(e)===t).join(" ").trim();var Dp={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const Ip=O.forwardRef(({color:n="currentColor",size:e=24,strokeWidth:t=2,absoluteStrokeWidth:i,className:s="",children:a,iconNode:l,...o},c)=>O.createElement("svg",{ref:c,...Dp,width:e,height:e,stroke:n,strokeWidth:i?Number(t)*24/Number(e):t,className:Lu("lucide",s),...o},[...l.map(([d,u])=>O.createElement(d,u)),...Array.isArray(a)?a:[a]]));const Se=(n,e)=>{const t=O.forwardRef(({className:i,...s},a)=>O.createElement(Ip,{ref:a,iconNode:e,className:Lu(`lucide-${jp(n)}`,i),...s}));return t.displayName=`${n}`,t};const ju=Se("Activity",[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]]);const Du=Se("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);const Up=Se("Award",[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]]);const Op=Se("BookOpen",[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]]);const Vs=Se("Bot",[["path",{d:"M12 8V4H8",key:"hb8ula"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2",key:"enze0r"}],["path",{d:"M2 14h2",key:"vft8re"}],["path",{d:"M20 14h2",key:"4cs60a"}],["path",{d:"M15 13v2",key:"1xurst"}],["path",{d:"M9 13v2",key:"rq6x2g"}]]);const kp=Se("Box",[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",key:"hh9hay"}],["path",{d:"m3.3 7 8.7 5 8.7-5",key:"g66t2b"}],["path",{d:"M12 22V12",key:"d0xqtd"}]]);const Fp=Se("Brain",[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",key:"l5xja"}],["path",{d:"M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",key:"ep3f8r"}],["path",{d:"M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4",key:"1p4c4q"}],["path",{d:"M17.599 6.5a3 3 0 0 0 .399-1.375",key:"tmeiqw"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5",key:"105sqy"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396",key:"ql3yin"}],["path",{d:"M19.938 10.5a4 4 0 0 1 .585.396",key:"1qfode"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516",key:"2e4loj"}],["path",{d:"M19.967 17.484A4 4 0 0 1 18 18",key:"159ez6"}]]);const Fl=Se("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);const Bp=Se("Camera",[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]]);const Or=Se("ChartColumn",[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]]);const zp=Se("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);const Iu=Se("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);const Hp=Se("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);const Gp=Se("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);const Vp=Se("CircleCheckBig",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);const Wp=Se("CirclePlay",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polygon",{points:"10 8 16 12 10 16 10 8",key:"1cimsy"}]]);const Xp=Se("CircleX",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);const si=Se("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);const qp=Se("Coins",[["circle",{cx:"8",cy:"8",r:"6",key:"3yglwk"}],["path",{d:"M18.09 10.37A6 6 0 1 1 10.34 18",key:"t5s6rm"}],["path",{d:"M7 6h1v4",key:"1obek4"}],["path",{d:"m16.71 13.88.7.71-2.82 2.82",key:"1rbuyh"}]]);const $p=Se("Compass",[["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);const Yp=Se("Cpu",[["rect",{width:"16",height:"16",x:"4",y:"4",rx:"2",key:"14l7u7"}],["rect",{width:"6",height:"6",x:"9",y:"9",rx:"1",key:"5aljv4"}],["path",{d:"M15 2v2",key:"13l42r"}],["path",{d:"M15 20v2",key:"15mkzm"}],["path",{d:"M2 15h2",key:"1gxd5l"}],["path",{d:"M2 9h2",key:"1bbxkp"}],["path",{d:"M20 15h2",key:"19e6y8"}],["path",{d:"M20 9h2",key:"19tzq7"}],["path",{d:"M9 2v2",key:"165o2o"}],["path",{d:"M9 20v2",key:"i2bqo8"}]]);const Kp=Se("Database",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]);const Bl=Se("DollarSign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]);const Tn=Se("Eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);const Uu=Se("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);const Zp=Se("File",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}]]);const Ou=Se("Filter",[["polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",key:"1yg77f"}]]);const zl=Se("Flag",[["path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z",key:"i9b6wo"}],["line",{x1:"4",x2:"4",y1:"22",y2:"15",key:"1cm3nv"}]]);const nn=Se("GalleryVerticalEnd",[["path",{d:"M7 2h10",key:"nczekb"}],["path",{d:"M5 6h14",key:"u2x4p"}],["rect",{width:"18",height:"12",x:"3",y:"10",rx:"2",key:"l0tzu3"}]]);const ga=Se("Gavel",[["path",{d:"m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8",key:"15492f"}],["path",{d:"m16 16 6-6",key:"vzrcl6"}],["path",{d:"m8 8 6-6",key:"18bi4p"}],["path",{d:"m9 7 8 8",key:"5jnvq1"}],["path",{d:"m21 11-8-8",key:"z4y7zo"}]]);const Io=Se("Glasses",[["circle",{cx:"6",cy:"15",r:"4",key:"vux9w4"}],["circle",{cx:"18",cy:"15",r:"4",key:"18o8ve"}],["path",{d:"M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2",key:"1ag4bs"}],["path",{d:"M2.5 13 5 7c.7-1.3 1.4-2 3-2",key:"1hm1gs"}],["path",{d:"M21.5 13 19 7c-.7-1.3-1.5-2-3-2",key:"1r31ai"}]]);const ku=Se("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]);const Fu=Se("Grid3x3",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M3 15h18",key:"5xshup"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"M15 3v18",key:"14nvp0"}]]);const Jp=Se("Headphones",[["path",{d:"M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",key:"1xhozi"}]]);const un=Se("Heart",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]]);const _i=Se("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);const Qp=Se("Instagram",[["rect",{width:"20",height:"20",x:"2",y:"2",rx:"5",ry:"5",key:"2e1cvw"}],["path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z",key:"9exkf1"}],["line",{x1:"17.5",x2:"17.51",y1:"6.5",y2:"6.5",key:"r4j83e"}]]);const em=Se("Layers",[["path",{d:"m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z",key:"8b97xw"}],["path",{d:"m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65",key:"dd6zsq"}],["path",{d:"m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65",key:"ep9fru"}]]);const tm=Se("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);const Bu=Se("Library",[["path",{d:"m16 6 4 14",key:"ji33uf"}],["path",{d:"M12 6v14",key:"1n7gus"}],["path",{d:"M8 8v12",key:"1gg7y9"}],["path",{d:"M4 4v16",key:"6qkkli"}]]);const zu=Se("List",[["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 18h.01",key:"1tta3j"}],["path",{d:"M3 6h.01",key:"1rqtza"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 18h13",key:"1lx6n3"}],["path",{d:"M8 6h13",key:"ik3vkj"}]]);const nm=Se("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);const Js=Se("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);const Hl=Se("Map",[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",key:"169xi5"}],["path",{d:"M15 5.764v15",key:"1pn4in"}],["path",{d:"M9 3.236v15",key:"1uimfh"}]]);const im=Se("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);const Ws=Se("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]);const Qs=Se("Palette",[["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]]);const rm=Se("PiggyBank",[["path",{d:"M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z",key:"1ivx2i"}],["path",{d:"M2 9v1c0 1.1.9 2 2 2h1",key:"nm575m"}],["path",{d:"M16 11h.01",key:"xkw8gn"}]]);const Gl=Se("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);const Vl=Se("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);const sm=Se("ScanEye",[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2",key:"aa7l1z"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2",key:"4qcy5o"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2",key:"6vwrx8"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2",key:"ioqczr"}],["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["path",{d:"M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0",key:"11ak4c"}]]);const am=Se("Scan",[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2",key:"aa7l1z"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2",key:"4qcy5o"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2",key:"6vwrx8"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2",key:"ioqczr"}]]);const Hr=Se("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);const om=Se("Send",[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]]);const Hu=Se("Share",[["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",key:"1b2hhj"}],["polyline",{points:"16 6 12 2 8 6",key:"m901s6"}],["line",{x1:"12",x2:"12",y1:"2",y2:"15",key:"1p0rca"}]]);const lm=Se("ShieldCheck",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);const cm=Se("Shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]);const Gu=Se("SlidersHorizontal",[["line",{x1:"21",x2:"14",y1:"4",y2:"4",key:"obuewd"}],["line",{x1:"10",x2:"3",y1:"4",y2:"4",key:"1q6298"}],["line",{x1:"21",x2:"12",y1:"12",y2:"12",key:"1iu8h1"}],["line",{x1:"8",x2:"3",y1:"12",y2:"12",key:"ntss68"}],["line",{x1:"21",x2:"16",y1:"20",y2:"20",key:"14d8ph"}],["line",{x1:"12",x2:"3",y1:"20",y2:"20",key:"m0wm8r"}],["line",{x1:"14",x2:"14",y1:"2",y2:"6",key:"14e1ph"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14",key:"1i6ji0"}],["line",{x1:"16",x2:"16",y1:"18",y2:"22",key:"1lctlv"}]]);const dm=Se("Sparkles",[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]]);const Ot=Se("Star",[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]]);const um=Se("Tags",[["path",{d:"m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19",key:"1cbfv1"}],["path",{d:"M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.29 18.29a2.426 2.426 0 0 0 3.42 0l3.58-3.58a2.426 2.426 0 0 0 0-3.42z",key:"135mg7"}],["circle",{cx:"6.5",cy:"9.5",r:".5",fill:"currentColor",key:"5pm5xn"}]]);const Wl=Se("Ticket",[["path",{d:"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",key:"qn84l0"}],["path",{d:"M13 5v2",key:"dyzc3o"}],["path",{d:"M13 17v2",key:"1ont0d"}],["path",{d:"M13 11v2",key:"1wjjxi"}]]);const hm=Se("Timer",[["line",{x1:"10",x2:"14",y1:"2",y2:"2",key:"14vaq8"}],["line",{x1:"12",x2:"15",y1:"14",y2:"11",key:"17fdiu"}],["circle",{cx:"12",cy:"14",r:"8",key:"1e1u0o"}]]);const nr=Se("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]);const fm=Se("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);const pm=Se("Twitter",[["path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",key:"pff0z6"}]]);const Dr=Se("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);const Bn=Se("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);const Vu=Se("Wallet",[["path",{d:"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",key:"18etb6"}],["path",{d:"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",key:"xoc0q4"}]]);const mm=Se("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);const gm=Se("Youtube",[["path",{d:"M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",key:"1q2vi4"}],["path",{d:"m10 15 5-3-5-3z",key:"1jp15x"}]]),xm=[{title:"Леонардо Да Винчи",artist:"Леонардо Да Винчи",image_url:"https://0a011f8d633a-gifted-saul.s3.ru1.storage.beget.cloud/artworks/artwork-1770257627848-825297009.jpg"},{title:"Тайная Вечеря",artist:"Леонардо да Винчи",image_url:"https://0a011f8d633a-gifted-saul.s3.ru1.storage.beget.cloud/artworks/artwork-1770261355426-573567682.jpg"},{title:"Девушка",artist:"Леонардо да Винчи",image_url:"https://0a011f8d633a-gifted-saul.s3.ru1.storage.beget.cloud/artworks/artwork-1770296998182-69105174.jpg"}],ns=["Импрессионизм — это художественное направление, возникшее во Франции в 1860-х годах. Художники-импрессионисты стремились передать мимолётные впечатления от реальности, используя короткие мазки чистых цветов.","Ван Гог использовал технику «импасто» — нанесение толстых слоёв краски для создания текстуры. Его характерный стиль включает динамичные, закрученные мазки.","Эпоха Возрождения (XIV–XVII вв.) ознаменовалась возвратом к идеалам античности. Леонардо да Винчи, Микеланджело и Рафаэль — главные представители этого периода."],vm=[{icon:sm,color:"bg-blue-100 text-blue-600",title:"Анализ изображений",desc:"Анализируйте произведения искусства с помощью AI для определения стиля, техники и исторического контекста.",meta1:{icon:Yp,text:"GPT-4 Vision"},meta2:{icon:si,text:"~30 сек"}},{icon:Uu,color:"bg-green-100 text-green-600",title:"Обработка документов",desc:"Загружайте PDF документы об истории искусства для AI-поиска и интеллектуального анализа.",meta1:{icon:Zp,text:"PDF до 50MB"},meta2:{icon:em,text:"OCR + Chunking"}},{icon:Vs,color:"bg-purple-100 text-purple-600",title:"AI Ассистент",desc:"Задавайте вопросы об искусстве и получайте точные ответы на основе базы знаний.",meta1:{icon:Fp,text:"RAG + Claude"},meta2:{icon:Kp,text:"ArtWiki"}},{icon:am,color:"bg-amber-100 text-amber-600",title:"Оцифровка",desc:"Загрузите сканы картин для AI-анализа, создания карточки и защиты авторских прав.",meta1:{icon:lm,text:"Watermark"},meta2:{icon:qp,text:"NFT Ready"}},{icon:Bu,color:"bg-rose-100 text-rose-600",title:"ArtWiki",desc:"RAG-обучение на документах, стилях, художниках и внешних источниках искусства.",meta1:{icon:ku,text:"WikiArt"},meta2:{icon:Hr,text:"Сем. поиск"}},{icon:Io,color:"bg-indigo-100 text-indigo-600",title:"VR Галерея",desc:"Погрузитесь в виртуальное пространство для просмотра шедевров в 3D-залах.",meta1:{icon:kp,text:"Three.js"},meta2:{icon:Jp,text:"WebXR"}},{icon:ga,color:"bg-yellow-100 text-yellow-600",title:"Аукционы",desc:"Участвуйте в торгах за уникальные произведения искусства и NFT-сертификаты.",meta1:{icon:hm,text:"Live торги"},meta2:{icon:Vu,text:"TAE токены"}}];function is(){return new Date().toLocaleTimeString("ru-RU",{hour:"2-digit",minute:"2-digit"})}const ym=()=>{const[n,e]=O.useState(xm),[t,i]=O.useState(0),[s,a]=O.useState(!1),l=O.useRef(null),o=O.useRef(null),[c,d]=O.useState(!0),[u,f]=O.useState(!1),[p,x]=O.useState([{text:"Здравствуйте! Я ваш AI-ассистент по искусству. Могу ответить на вопросы об истории искусства, техниках и художниках. Чем могу помочь?",isUser:!1,time:is()}]),[y,g]=O.useState(""),[m,h]=O.useState(!1),b=O.useRef(null),v=O.useRef(null);O.useEffect(()=>{fetch("/api/artworks?limit=20").then(M=>M.json()).then(M=>{const B=(Array.isArray(M)?M:M.artworks??[]).filter($=>$.image_url||$.thumbnail_url).sort(()=>Math.random()-.5).slice(0,10).map($=>({title:$.title||"Произведение",artist:$.artist_name||$.artist||"Автор",image_url:$.image_url||$.thumbnail_url}));B.length>=2&&e(B),a(!0)}).catch(()=>a(!0))},[]);const E=O.useCallback(M=>{l.current&&clearInterval(l.current),l.current=setInterval(()=>{i(j=>(j+1)%M)},5e3)},[]);O.useEffect(()=>(n.length>1&&E(n.length),()=>{l.current&&clearInterval(l.current)}),[n,E]);const _=M=>{i(M),n.length>1&&E(n.length)},T=M=>{o.current?.scrollBy({left:M==="left"?-344:344,behavior:"smooth"})},A=()=>{o.current&&(d(o.current.scrollLeft<=4),f(o.current.scrollLeft>=o.current.scrollWidth-o.current.clientWidth-10))};O.useEffect(()=>{v.current&&(v.current.scrollTop=v.current.scrollHeight)},[p]);const L=async M=>{const j=(M??y).trim();if(!(!j||m)){g(""),x(B=>[...B,{text:j,isUser:!0,time:is()}]),h(!0);try{const $=await(await fetch("/api/ai/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:j})})).json(),P=$.message||$.response||ns[Math.floor(Math.random()*ns.length)];x(z=>[...z,{text:P,isUser:!1,time:is()}])}catch{x(B=>[...B,{text:ns[Math.floor(Math.random()*ns.length)],isUser:!1,time:is()}])}finally{h(!1)}}},w=n[t];return r.jsxs("div",{children:[r.jsxs("div",{className:"relative bg-gray-900",style:{height:"70vh",minHeight:"420px",maxHeight:"700px"},children:[n.map((M,j)=>r.jsx("div",{style:{position:"absolute",inset:0,backgroundImage:`url('${M.image_url}')`,backgroundSize:"cover",backgroundPosition:"center 30%",backgroundRepeat:"no-repeat",opacity:j===t?1:0,transition:"opacity 1s ease-in-out",zIndex:0}},`${M.image_url}-${j}`)),r.jsx("div",{style:{position:"absolute",inset:0,background:"linear-gradient(to bottom, rgba(17,24,39,0.55) 0%, rgba(17,24,39,0.35) 40%, rgba(17,24,39,0.85) 100%)",zIndex:1,pointerEvents:"none"}}),r.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-10",style:{position:"relative",zIndex:2},children:r.jsxs("div",{className:"max-w-2xl",children:[r.jsxs("div",{className:"inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-xs font-medium px-3 py-1.5 rounded-full mb-4 border border-white/20",children:[r.jsx(dm,{className:"h-3.5 w-3.5 text-yellow-300"}),"AI-powered платформа для искусства"]}),r.jsx("h1",{className:"text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight drop-shadow-lg",children:"Виртуальная галерея"}),r.jsx("p",{className:"text-white/80 text-base sm:text-lg mb-6 leading-relaxed",children:"Исследуйте шедевры мирового искусства в иммерсивной 3D-среде с поддержкой AI-анализа и персональных рекомендаций."}),r.jsxs("div",{className:"flex flex-wrap gap-3",children:[r.jsxs(xn,{to:"/galleries",className:"inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-100 transition-colors shadow-lg text-sm",children:[r.jsx(Io,{className:"h-4 w-4"}),"Войти в галерею"]}),r.jsxs(xn,{to:"/artwiki",className:"inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/20 transition-colors border border-white/30 text-sm",children:[r.jsx(Wp,{className:"h-4 w-4"}),"ArtWiki"]})]})]})}),n.length>1&&r.jsx("div",{className:"absolute bottom-4 right-6 flex gap-2",style:{zIndex:3},children:n.map((M,j)=>r.jsx("button",{onClick:()=>_(j),className:`rounded-full transition-all duration-300 ${j===t?"w-6 h-2.5 bg-white shadow":"w-2.5 h-2.5 bg-white/40 hover:bg-white/70"}`},j))})]}),r.jsx("div",{className:"bg-white border-b border-gray-100 py-3",children:r.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-4",children:[w&&r.jsxs("p",{className:"flex items-center gap-2 text-indigo-700 text-sm font-medium bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100",children:[r.jsx(Js,{className:"h-3.5 w-3.5 text-indigo-400 flex-shrink-0"}),r.jsxs("span",{className:"truncate max-w-xs",children:[w.title," — ",w.artist]})]}),!s&&r.jsx("div",{className:"h-8 w-48 bg-gray-100 rounded-full animate-pulse"})]})}),r.jsx("section",{className:"bg-white border-b border-gray-100 py-10",children:r.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:r.jsxs("div",{className:"relative",children:[r.jsx("button",{onClick:()=>T("left"),disabled:c,className:`hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 items-center justify-center transition-all ${c?"opacity-25 cursor-default":"hover:shadow-lg hover:scale-105"}`,children:r.jsx(Hp,{className:"h-5 w-5 text-gray-700"})}),r.jsx("button",{onClick:()=>T("right"),disabled:u,className:`hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 items-center justify-center transition-all ${u?"opacity-25 cursor-default":"hover:shadow-lg hover:scale-105"}`,children:r.jsx(Gp,{className:"h-5 w-5 text-gray-700"})}),r.jsx("div",{ref:o,onScroll:A,className:"flex gap-5 overflow-x-auto pb-2 scroll-smooth",style:{scrollbarWidth:"none",msOverflowStyle:"none"},children:vm.map(M=>r.jsxs("div",{className:"flex-none w-72 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 p-5",children:[r.jsxs("div",{className:"flex items-center gap-3 mb-3",children:[r.jsx("div",{className:`w-11 h-11 rounded-xl flex items-center justify-center ${M.color}`,children:r.jsx(M.icon,{className:"h-5 w-5"})}),r.jsx("h3",{className:"font-semibold text-gray-900 text-sm",children:M.title})]}),r.jsx("p",{className:"text-gray-500 text-xs leading-relaxed mb-4",children:M.desc}),r.jsxs("div",{className:"flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-50",children:[r.jsxs("span",{className:"flex items-center gap-1",children:[r.jsx(M.meta1.icon,{className:"h-3 w-3"}),M.meta1.text]}),r.jsxs("span",{className:"flex items-center gap-1",children:[r.jsx(M.meta2.icon,{className:"h-3 w-3"}),M.meta2.text]})]})]},M.title))})]})})}),r.jsx("section",{className:"bg-gray-50 py-12 px-4",children:r.jsx("div",{className:"max-w-3xl mx-auto",children:r.jsxs("div",{className:"bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden",children:[r.jsxs("div",{className:"bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-4 flex items-center gap-3",children:[r.jsx("div",{className:"w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center",children:r.jsx(Vs,{className:"h-5 w-5 text-white"})}),r.jsxs("div",{className:"flex-1",children:[r.jsx("div",{className:"text-white font-semibold text-sm",children:"Art Assistant"}),r.jsx("div",{className:"text-white/70 text-xs",children:"Эксперт по истории искусства"})]}),r.jsxs("span",{className:"flex items-center gap-1.5 bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium",children:[r.jsx("span",{className:"w-1.5 h-1.5 bg-green-400 rounded-full"}),"Онлайн"]})]}),r.jsxs("div",{ref:v,className:"h-64 overflow-y-auto p-4 space-y-4 bg-gray-50/60",children:[p.map((M,j)=>r.jsxs("div",{className:`flex gap-2.5 ${M.isUser?"flex-row-reverse":""}`,children:[r.jsx("div",{className:`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${M.isUser?"bg-gray-200":"bg-indigo-100"}`,children:M.isUser?r.jsx(Dr,{className:"h-3.5 w-3.5 text-gray-600"}):r.jsx(Vs,{className:"h-3.5 w-3.5 text-indigo-600"})}),r.jsxs("div",{className:`p-3 max-w-[82%] rounded-2xl shadow-sm text-sm ${M.isUser?"bg-indigo-600 text-white rounded-tr-none":"bg-white text-gray-700 rounded-tl-none"}`,children:[r.jsx("p",{children:M.text}),r.jsx("p",{className:`text-xs mt-1 ${M.isUser?"text-white/60":"text-gray-400"}`,children:M.time})]})]},j)),m&&r.jsxs("div",{className:"flex gap-2.5",children:[r.jsx("div",{className:"w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0",children:r.jsx(Vs,{className:"h-3.5 w-3.5 text-indigo-600"})}),r.jsx("div",{className:"bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex gap-1.5 items-center",children:[0,150,300].map(M=>r.jsx("span",{className:"w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce",style:{animationDelay:`${M}ms`}},M))})]}),r.jsx("div",{ref:b})]}),r.jsxs("div",{className:"px-4 pt-3 pb-2 bg-white border-t border-gray-100",children:[r.jsx("p",{className:"text-xs text-gray-400 mb-2",children:"Быстрые вопросы:"}),r.jsx("div",{className:"flex flex-wrap gap-2",children:["Что такое импрессионизм?","Техники Ван Гога","Эпоха Возрождения"].map(M=>r.jsx("button",{onClick:()=>L(M),className:"text-xs bg-gray-100 hover:bg-indigo-50 hover:text-indigo-700 text-gray-600 px-3 py-1.5 rounded-full transition-colors",children:M},M))})]}),r.jsx("div",{className:"px-4 pb-4 pt-2 bg-white",children:r.jsxs("div",{className:"flex gap-2",children:[r.jsx("input",{type:"text",value:y,onChange:M=>g(M.target.value),onKeyDown:M=>M.key==="Enter"&&L(),placeholder:"Спросите об искусстве...",disabled:m,className:"flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"}),r.jsx("button",{onClick:()=>L(),disabled:m||!y.trim(),className:"w-10 h-10 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl transition-colors flex-shrink-0",children:r.jsx(om,{className:"h-4 w-4"})})]})})]})})}),r.jsxs("section",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",children:[r.jsxs("div",{className:"text-center mb-8",children:[r.jsx("h2",{className:"text-xl font-bold text-gray-900 mb-1",children:"Разделы платформы"}),r.jsx("p",{className:"text-gray-500 text-sm",children:"Выберите нужный раздел для работы"})]}),r.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-4",children:[{title:"Галерея",desc:"Виртуальные залы",path:"/galleries",bg:"bg-indigo-50 hover:bg-indigo-100",text:"text-indigo-700",icon:Io},{title:"Аукцион",desc:"Торги за произведения",path:"/auction",bg:"bg-orange-50 hover:bg-orange-100",text:"text-orange-700",icon:ga},{title:"ArtWiki",desc:"Энциклопедия + AI",path:"/artwiki",bg:"bg-purple-50 hover:bg-purple-100",text:"text-purple-700",icon:Bu},{title:"О нас",desc:"Возможности платформы",path:"/about",bg:"bg-gray-100 hover:bg-gray-200",text:"text-gray-700",icon:Du}].map(M=>r.jsxs(xn,{to:M.path,className:`block ${M.bg} rounded-xl p-5 transition-all hover:-translate-y-0.5`,children:[r.jsx(M.icon,{className:`h-6 w-6 ${M.text} mb-3`}),r.jsx("div",{className:`font-semibold text-sm ${M.text}`,children:M.title}),r.jsx("div",{className:"text-xs text-gray-400 mt-0.5",children:M.desc})]},M.path))})]})]})};function Wu(n){var e,t,i="";if(typeof n=="string"||typeof n=="number")i+=n;else if(typeof n=="object")if(Array.isArray(n)){var s=n.length;for(e=0;e<s;e++)n[e]&&(t=Wu(n[e]))&&(i&&(i+=" "),i+=t)}else for(t in n)n[t]&&(i&&(i+=" "),i+=t);return i}function Xu(){for(var n,e,t=0,i="",s=arguments.length;t<s;t++)(n=arguments[t])&&(e=Wu(n))&&(i&&(i+=" "),i+=e);return i}const ll="-",_m=n=>{const e=wm(n),{conflictingClassGroups:t,conflictingClassGroupModifiers:i}=n;return{getClassGroupId:l=>{const o=l.split(ll);return o[0]===""&&o.length!==1&&o.shift(),qu(o,e)||bm(l)},getConflictingClassGroupIds:(l,o)=>{const c=t[l]||[];return o&&i[l]?[...c,...i[l]]:c}}},qu=(n,e)=>{if(n.length===0)return e.classGroupId;const t=n[0],i=e.nextPart.get(t),s=i?qu(n.slice(1),i):void 0;if(s)return s;if(e.validators.length===0)return;const a=n.join(ll);return e.validators.find(({validator:l})=>l(a))?.classGroupId},Xl=/^\[(.+)\]$/,bm=n=>{if(Xl.test(n)){const e=Xl.exec(n)[1],t=e?.substring(0,e.indexOf(":"));if(t)return"arbitrary.."+t}},wm=n=>{const{theme:e,prefix:t}=n,i={nextPart:new Map,validators:[]};return Em(Object.entries(n.classGroups),t).forEach(([a,l])=>{Uo(l,i,a,e)}),i},Uo=(n,e,t,i)=>{n.forEach(s=>{if(typeof s=="string"){const a=s===""?e:ql(e,s);a.classGroupId=t;return}if(typeof s=="function"){if(Sm(s)){Uo(s(i),e,t,i);return}e.validators.push({validator:s,classGroupId:t});return}Object.entries(s).forEach(([a,l])=>{Uo(l,ql(e,a),t,i)})})},ql=(n,e)=>{let t=n;return e.split(ll).forEach(i=>{t.nextPart.has(i)||t.nextPart.set(i,{nextPart:new Map,validators:[]}),t=t.nextPart.get(i)}),t},Sm=n=>n.isThemeGetter,Em=(n,e)=>e?n.map(([t,i])=>{const s=i.map(a=>typeof a=="string"?e+a:typeof a=="object"?Object.fromEntries(Object.entries(a).map(([l,o])=>[e+l,o])):a);return[t,s]}):n,Mm=n=>{if(n<1)return{get:()=>{},set:()=>{}};let e=0,t=new Map,i=new Map;const s=(a,l)=>{t.set(a,l),e++,e>n&&(e=0,i=t,t=new Map)};return{get(a){let l=t.get(a);if(l!==void 0)return l;if((l=i.get(a))!==void 0)return s(a,l),l},set(a,l){t.has(a)?t.set(a,l):s(a,l)}}},$u="!",Tm=n=>{const{separator:e,experimentalParseClassName:t}=n,i=e.length===1,s=e[0],a=e.length,l=o=>{const c=[];let d=0,u=0,f;for(let m=0;m<o.length;m++){let h=o[m];if(d===0){if(h===s&&(i||o.slice(m,m+a)===e)){c.push(o.slice(u,m)),u=m+a;continue}if(h==="/"){f=m;continue}}h==="["?d++:h==="]"&&d--}const p=c.length===0?o:o.substring(u),x=p.startsWith($u),y=x?p.substring(1):p,g=f&&f>u?f-u:void 0;return{modifiers:c,hasImportantModifier:x,baseClassName:y,maybePostfixModifierPosition:g}};return t?o=>t({className:o,parseClassName:l}):l},Am=n=>{if(n.length<=1)return n;const e=[];let t=[];return n.forEach(i=>{i[0]==="["?(e.push(...t.sort(),i),t=[]):t.push(i)}),e.push(...t.sort()),e},Rm=n=>({cache:Mm(n.cacheSize),parseClassName:Tm(n),..._m(n)}),Cm=/\s+/,Nm=(n,e)=>{const{parseClassName:t,getClassGroupId:i,getConflictingClassGroupIds:s}=e,a=[],l=n.trim().split(Cm);let o="";for(let c=l.length-1;c>=0;c-=1){const d=l[c],{modifiers:u,hasImportantModifier:f,baseClassName:p,maybePostfixModifierPosition:x}=t(d);let y=!!x,g=i(y?p.substring(0,x):p);if(!g){if(!y){o=d+(o.length>0?" "+o:o);continue}if(g=i(p),!g){o=d+(o.length>0?" "+o:o);continue}y=!1}const m=Am(u).join(":"),h=f?m+$u:m,b=h+g;if(a.includes(b))continue;a.push(b);const v=s(g,y);for(let E=0;E<v.length;++E){const _=v[E];a.push(h+_)}o=d+(o.length>0?" "+o:o)}return o};function Pm(){let n=0,e,t,i="";for(;n<arguments.length;)(e=arguments[n++])&&(t=Yu(e))&&(i&&(i+=" "),i+=t);return i}const Yu=n=>{if(typeof n=="string")return n;let e,t="";for(let i=0;i<n.length;i++)n[i]&&(e=Yu(n[i]))&&(t&&(t+=" "),t+=e);return t};function Lm(n,...e){let t,i,s,a=l;function l(c){const d=e.reduce((u,f)=>f(u),n());return t=Rm(d),i=t.cache.get,s=t.cache.set,a=o,o(c)}function o(c){const d=i(c);if(d)return d;const u=Nm(c,t);return s(c,u),u}return function(){return a(Pm.apply(null,arguments))}}const ft=n=>{const e=t=>t[n]||[];return e.isThemeGetter=!0,e},Ku=/^\[(?:([a-z-]+):)?(.+)\]$/i,jm=/^\d+\/\d+$/,Dm=new Set(["px","full","screen"]),Im=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,Um=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,Om=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,km=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,Fm=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,Pn=n=>Qi(n)||Dm.has(n)||jm.test(n),Vn=n=>hr(n,"length",qm),Qi=n=>!!n&&!Number.isNaN(Number(n)),Da=n=>hr(n,"number",Qi),xr=n=>!!n&&Number.isInteger(Number(n)),Bm=n=>n.endsWith("%")&&Qi(n.slice(0,-1)),Qe=n=>Ku.test(n),Wn=n=>Im.test(n),zm=new Set(["length","size","percentage"]),Hm=n=>hr(n,zm,Zu),Gm=n=>hr(n,"position",Zu),Vm=new Set(["image","url"]),Wm=n=>hr(n,Vm,Ym),Xm=n=>hr(n,"",$m),vr=()=>!0,hr=(n,e,t)=>{const i=Ku.exec(n);return i?i[1]?typeof e=="string"?i[1]===e:e.has(i[1]):t(i[2]):!1},qm=n=>Um.test(n)&&!Om.test(n),Zu=()=>!1,$m=n=>km.test(n),Ym=n=>Fm.test(n),Km=()=>{const n=ft("colors"),e=ft("spacing"),t=ft("blur"),i=ft("brightness"),s=ft("borderColor"),a=ft("borderRadius"),l=ft("borderSpacing"),o=ft("borderWidth"),c=ft("contrast"),d=ft("grayscale"),u=ft("hueRotate"),f=ft("invert"),p=ft("gap"),x=ft("gradientColorStops"),y=ft("gradientColorStopPositions"),g=ft("inset"),m=ft("margin"),h=ft("opacity"),b=ft("padding"),v=ft("saturate"),E=ft("scale"),_=ft("sepia"),T=ft("skew"),A=ft("space"),L=ft("translate"),w=()=>["auto","contain","none"],M=()=>["auto","hidden","clip","visible","scroll"],j=()=>["auto",Qe,e],B=()=>[Qe,e],$=()=>["",Pn,Vn],P=()=>["auto",Qi,Qe],z=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],Z=()=>["solid","dashed","dotted","double","none"],Y=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],ae=()=>["start","end","center","between","around","evenly","stretch"],J=()=>["","0",Qe],ne=()=>["auto","avoid","all","avoid-page","page","left","right","column"],N=()=>[Qi,Qe];return{cacheSize:500,separator:":",theme:{colors:[vr],spacing:[Pn,Vn],blur:["none","",Wn,Qe],brightness:N(),borderColor:[n],borderRadius:["none","","full",Wn,Qe],borderSpacing:B(),borderWidth:$(),contrast:N(),grayscale:J(),hueRotate:N(),invert:J(),gap:B(),gradientColorStops:[n],gradientColorStopPositions:[Bm,Vn],inset:j(),margin:j(),opacity:N(),padding:B(),saturate:N(),scale:N(),sepia:J(),skew:N(),space:B(),translate:B()},classGroups:{aspect:[{aspect:["auto","square","video",Qe]}],container:["container"],columns:[{columns:[Wn]}],"break-after":[{"break-after":ne()}],"break-before":[{"break-before":ne()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...z(),Qe]}],overflow:[{overflow:M()}],"overflow-x":[{"overflow-x":M()}],"overflow-y":[{"overflow-y":M()}],overscroll:[{overscroll:w()}],"overscroll-x":[{"overscroll-x":w()}],"overscroll-y":[{"overscroll-y":w()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[g]}],"inset-x":[{"inset-x":[g]}],"inset-y":[{"inset-y":[g]}],start:[{start:[g]}],end:[{end:[g]}],top:[{top:[g]}],right:[{right:[g]}],bottom:[{bottom:[g]}],left:[{left:[g]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",xr,Qe]}],basis:[{basis:j()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",Qe]}],grow:[{grow:J()}],shrink:[{shrink:J()}],order:[{order:["first","last","none",xr,Qe]}],"grid-cols":[{"grid-cols":[vr]}],"col-start-end":[{col:["auto",{span:["full",xr,Qe]},Qe]}],"col-start":[{"col-start":P()}],"col-end":[{"col-end":P()}],"grid-rows":[{"grid-rows":[vr]}],"row-start-end":[{row:["auto",{span:[xr,Qe]},Qe]}],"row-start":[{"row-start":P()}],"row-end":[{"row-end":P()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",Qe]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",Qe]}],gap:[{gap:[p]}],"gap-x":[{"gap-x":[p]}],"gap-y":[{"gap-y":[p]}],"justify-content":[{justify:["normal",...ae()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",...ae(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[...ae(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[b]}],px:[{px:[b]}],py:[{py:[b]}],ps:[{ps:[b]}],pe:[{pe:[b]}],pt:[{pt:[b]}],pr:[{pr:[b]}],pb:[{pb:[b]}],pl:[{pl:[b]}],m:[{m:[m]}],mx:[{mx:[m]}],my:[{my:[m]}],ms:[{ms:[m]}],me:[{me:[m]}],mt:[{mt:[m]}],mr:[{mr:[m]}],mb:[{mb:[m]}],ml:[{ml:[m]}],"space-x":[{"space-x":[A]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[A]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",Qe,e]}],"min-w":[{"min-w":[Qe,e,"min","max","fit"]}],"max-w":[{"max-w":[Qe,e,"none","full","min","max","fit","prose",{screen:[Wn]},Wn]}],h:[{h:[Qe,e,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[Qe,e,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[Qe,e,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[Qe,e,"auto","min","max","fit"]}],"font-size":[{text:["base",Wn,Vn]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",Da]}],"font-family":[{font:[vr]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",Qe]}],"line-clamp":[{"line-clamp":["none",Qi,Da]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",Pn,Qe]}],"list-image":[{"list-image":["none",Qe]}],"list-style-type":[{list:["none","disc","decimal",Qe]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[n]}],"placeholder-opacity":[{"placeholder-opacity":[h]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[n]}],"text-opacity":[{"text-opacity":[h]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...Z(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",Pn,Vn]}],"underline-offset":[{"underline-offset":["auto",Pn,Qe]}],"text-decoration-color":[{decoration:[n]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:B()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",Qe]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",Qe]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[h]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...z(),Gm]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",Hm]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},Wm]}],"bg-color":[{bg:[n]}],"gradient-from-pos":[{from:[y]}],"gradient-via-pos":[{via:[y]}],"gradient-to-pos":[{to:[y]}],"gradient-from":[{from:[x]}],"gradient-via":[{via:[x]}],"gradient-to":[{to:[x]}],rounded:[{rounded:[a]}],"rounded-s":[{"rounded-s":[a]}],"rounded-e":[{"rounded-e":[a]}],"rounded-t":[{"rounded-t":[a]}],"rounded-r":[{"rounded-r":[a]}],"rounded-b":[{"rounded-b":[a]}],"rounded-l":[{"rounded-l":[a]}],"rounded-ss":[{"rounded-ss":[a]}],"rounded-se":[{"rounded-se":[a]}],"rounded-ee":[{"rounded-ee":[a]}],"rounded-es":[{"rounded-es":[a]}],"rounded-tl":[{"rounded-tl":[a]}],"rounded-tr":[{"rounded-tr":[a]}],"rounded-br":[{"rounded-br":[a]}],"rounded-bl":[{"rounded-bl":[a]}],"border-w":[{border:[o]}],"border-w-x":[{"border-x":[o]}],"border-w-y":[{"border-y":[o]}],"border-w-s":[{"border-s":[o]}],"border-w-e":[{"border-e":[o]}],"border-w-t":[{"border-t":[o]}],"border-w-r":[{"border-r":[o]}],"border-w-b":[{"border-b":[o]}],"border-w-l":[{"border-l":[o]}],"border-opacity":[{"border-opacity":[h]}],"border-style":[{border:[...Z(),"hidden"]}],"divide-x":[{"divide-x":[o]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[o]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[h]}],"divide-style":[{divide:Z()}],"border-color":[{border:[s]}],"border-color-x":[{"border-x":[s]}],"border-color-y":[{"border-y":[s]}],"border-color-s":[{"border-s":[s]}],"border-color-e":[{"border-e":[s]}],"border-color-t":[{"border-t":[s]}],"border-color-r":[{"border-r":[s]}],"border-color-b":[{"border-b":[s]}],"border-color-l":[{"border-l":[s]}],"divide-color":[{divide:[s]}],"outline-style":[{outline:["",...Z()]}],"outline-offset":[{"outline-offset":[Pn,Qe]}],"outline-w":[{outline:[Pn,Vn]}],"outline-color":[{outline:[n]}],"ring-w":[{ring:$()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[n]}],"ring-opacity":[{"ring-opacity":[h]}],"ring-offset-w":[{"ring-offset":[Pn,Vn]}],"ring-offset-color":[{"ring-offset":[n]}],shadow:[{shadow:["","inner","none",Wn,Xm]}],"shadow-color":[{shadow:[vr]}],opacity:[{opacity:[h]}],"mix-blend":[{"mix-blend":[...Y(),"plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":Y()}],filter:[{filter:["","none"]}],blur:[{blur:[t]}],brightness:[{brightness:[i]}],contrast:[{contrast:[c]}],"drop-shadow":[{"drop-shadow":["","none",Wn,Qe]}],grayscale:[{grayscale:[d]}],"hue-rotate":[{"hue-rotate":[u]}],invert:[{invert:[f]}],saturate:[{saturate:[v]}],sepia:[{sepia:[_]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[t]}],"backdrop-brightness":[{"backdrop-brightness":[i]}],"backdrop-contrast":[{"backdrop-contrast":[c]}],"backdrop-grayscale":[{"backdrop-grayscale":[d]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[u]}],"backdrop-invert":[{"backdrop-invert":[f]}],"backdrop-opacity":[{"backdrop-opacity":[h]}],"backdrop-saturate":[{"backdrop-saturate":[v]}],"backdrop-sepia":[{"backdrop-sepia":[_]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[l]}],"border-spacing-x":[{"border-spacing-x":[l]}],"border-spacing-y":[{"border-spacing-y":[l]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",Qe]}],duration:[{duration:N()}],ease:[{ease:["linear","in","out","in-out",Qe]}],delay:[{delay:N()}],animate:[{animate:["none","spin","ping","pulse","bounce",Qe]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[E]}],"scale-x":[{"scale-x":[E]}],"scale-y":[{"scale-y":[E]}],rotate:[{rotate:[xr,Qe]}],"translate-x":[{"translate-x":[L]}],"translate-y":[{"translate-y":[L]}],"skew-x":[{"skew-x":[T]}],"skew-y":[{"skew-y":[T]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",Qe]}],accent:[{accent:["auto",n]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",Qe]}],"caret-color":[{caret:[n]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":B()}],"scroll-mx":[{"scroll-mx":B()}],"scroll-my":[{"scroll-my":B()}],"scroll-ms":[{"scroll-ms":B()}],"scroll-me":[{"scroll-me":B()}],"scroll-mt":[{"scroll-mt":B()}],"scroll-mr":[{"scroll-mr":B()}],"scroll-mb":[{"scroll-mb":B()}],"scroll-ml":[{"scroll-ml":B()}],"scroll-p":[{"scroll-p":B()}],"scroll-px":[{"scroll-px":B()}],"scroll-py":[{"scroll-py":B()}],"scroll-ps":[{"scroll-ps":B()}],"scroll-pe":[{"scroll-pe":B()}],"scroll-pt":[{"scroll-pt":B()}],"scroll-pr":[{"scroll-pr":B()}],"scroll-pb":[{"scroll-pb":B()}],"scroll-pl":[{"scroll-pl":B()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",Qe]}],fill:[{fill:[n,"none"]}],"stroke-w":[{stroke:[Pn,Vn,Da]}],stroke:[{stroke:[n,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}},Zm=Lm(Km);function Vt(...n){return Zm(Xu(n))}const He=O.forwardRef(({className:n,...e},t)=>r.jsx("div",{ref:t,className:Vt("rounded-xl border bg-card text-card-foreground shadow",n),...e}));He.displayName="Card";const Ge=O.forwardRef(({className:n,...e},t)=>r.jsx("div",{ref:t,className:Vt("flex flex-col space-y-1.5 p-6",n),...e}));Ge.displayName="CardHeader";const Ve=O.forwardRef(({className:n,...e},t)=>r.jsx("h3",{ref:t,className:Vt("font-semibold leading-none tracking-tight",n),...e}));Ve.displayName="CardTitle";const Xe=O.forwardRef(({className:n,...e},t)=>r.jsx("p",{ref:t,className:Vt("text-sm text-muted-foreground",n),...e}));Xe.displayName="CardDescription";const We=O.forwardRef(({className:n,...e},t)=>r.jsx("div",{ref:t,className:Vt("p-6 pt-0",n),...e}));We.displayName="CardContent";const Jm=O.forwardRef(({className:n,...e},t)=>r.jsx("div",{ref:t,className:Vt("flex items-center p-6 pt-0",n),...e}));Jm.displayName="CardFooter";var Qm=Symbol.for("react.lazy"),ea=jf[" use ".trim().toString()];function eg(n){return typeof n=="object"&&n!==null&&"then"in n}function Ju(n){return n!=null&&typeof n=="object"&&"$$typeof"in n&&n.$$typeof===Qm&&"_payload"in n&&eg(n._payload)}function tg(n){const e=ig(n),t=O.forwardRef((i,s)=>{let{children:a,...l}=i;Ju(a)&&typeof ea=="function"&&(a=ea(a._payload));const o=O.Children.toArray(a),c=o.find(sg);if(c){const d=c.props.children,u=o.map(f=>f===c?O.Children.count(d)>1?O.Children.only(null):O.isValidElement(d)?d.props.children:null:f);return r.jsx(e,{...l,ref:s,children:O.isValidElement(d)?O.cloneElement(d,void 0,u):null})}return r.jsx(e,{...l,ref:s,children:a})});return t.displayName=`${n}.Slot`,t}var ng=tg("Slot");function ig(n){const e=O.forwardRef((t,i)=>{let{children:s,...a}=t;if(Ju(s)&&typeof ea=="function"&&(s=ea(s._payload)),O.isValidElement(s)){const l=og(s),o=ag(a,s.props);return s.type!==O.Fragment&&(o.ref=i?Ef(i,l):l),O.cloneElement(s,o)}return O.Children.count(s)>1?O.Children.only(null):null});return e.displayName=`${n}.SlotClone`,e}var rg=Symbol("radix.slottable");function sg(n){return O.isValidElement(n)&&typeof n.type=="function"&&"__radixId"in n.type&&n.type.__radixId===rg}function ag(n,e){const t={...e};for(const i in e){const s=n[i],a=e[i];/^on[A-Z]/.test(i)?s&&a?t[i]=(...o)=>{const c=a(...o);return s(...o),c}:s&&(t[i]=s):i==="style"?t[i]={...s,...a}:i==="className"&&(t[i]=[s,a].filter(Boolean).join(" "))}return{...n,...t}}function og(n){let e=Object.getOwnPropertyDescriptor(n.props,"ref")?.get,t=e&&"isReactWarning"in e&&e.isReactWarning;return t?n.ref:(e=Object.getOwnPropertyDescriptor(n,"ref")?.get,t=e&&"isReactWarning"in e&&e.isReactWarning,t?n.props.ref:n.props.ref||n.ref)}const $l=n=>typeof n=="boolean"?`${n}`:n===0?"0":n,Yl=Xu,Qu=(n,e)=>t=>{var i;if(e?.variants==null)return Yl(n,t?.class,t?.className);const{variants:s,defaultVariants:a}=e,l=Object.keys(s).map(d=>{const u=t?.[d],f=a?.[d];if(u===null)return null;const p=$l(u)||$l(f);return s[d][p]}),o=t&&Object.entries(t).reduce((d,u)=>{let[f,p]=u;return p===void 0||(d[f]=p),d},{}),c=e==null||(i=e.compoundVariants)===null||i===void 0?void 0:i.reduce((d,u)=>{let{class:f,className:p,...x}=u;return Object.entries(x).every(y=>{let[g,m]=y;return Array.isArray(m)?m.includes({...a,...o}[g]):{...a,...o}[g]===m})?[...d,f,p]:d},[]);return Yl(n,l,c,t?.class,t?.className)},lg=Qu("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),be=O.forwardRef(({className:n,variant:e,size:t,asChild:i=!1,...s},a)=>{const l=i?ng:"button";return r.jsx(l,{className:Vt(lg({variant:e,size:t,className:n})),ref:a,...s})});be.displayName="Button";const cg=Qu("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function yt({className:n,variant:e,...t}){return r.jsx("div",{className:Vt(cg({variant:e}),n),...t})}const dg=({title:n,value:e,change:t,icon:i,trend:s})=>r.jsxs(He,{children:[r.jsxs(Ge,{className:"flex flex-row items-center justify-between pb-2",children:[r.jsx(Ve,{className:"text-sm font-medium",children:n}),r.jsx("div",{className:"p-2 bg-primary/10 rounded-lg text-primary",children:i})]}),r.jsxs(We,{children:[r.jsx("div",{className:"text-2xl font-bold",children:e}),r.jsxs("p",{className:`text-xs ${s==="up"?"text-green-500":"text-red-500"} flex items-center`,children:[s==="up"?r.jsx(nr,{className:"h-3 w-3 mr-1"}):r.jsx(nr,{className:"h-3 w-3 mr-1 rotate-180"}),t]})]})]}),ug=()=>{const[n,e]=O.useState("overview"),t=[{title:"Всего пользователей",value:"12,361",change:"+18.2% с прошлого месяца",icon:r.jsx(Bn,{className:"h-4 w-4"}),trend:"up"},{title:"Просмотров экспонатов",value:"1.2M",change:"+22.5% с прошлого месяца",icon:r.jsx(Tn,{className:"h-4 w-4"}),trend:"up"},{title:"Лайков",value:"45.2K",change:"+12.3% с прошлого месяца",icon:r.jsx(un,{className:"h-4 w-4"}),trend:"up"},{title:"Экспонатов",value:"8,421",change:"+5.7% с прошлого месяца",icon:r.jsx(_i,{className:"h-4 w-4"}),trend:"up"}],i=[{id:1,user:"Александр Петров",action:"Добавил новый экспонат",time:"2 минуты назад",type:"add"},{id:2,user:"Мария Иванова",action:"Оставил отзыв",time:"15 минут назад",type:"review"},{id:3,user:"Дмитрий Сидоров",action:"Создал коллекцию",time:"1 час назад",type:"collection"},{id:4,user:"Елена Козлова",action:"Присоединился к платформе",time:"2 часа назад",type:"join"},{id:5,user:"Сергей Новиков",action:"Оценил экспонат",time:"3 часа назад",type:"rate"}],s=[{id:1,title:"Абстрактная композиция №1",artist:"Александр Петров",likes:1240,views:12400},{id:2,title:"Городской пейзаж",artist:"Мария Иванова",likes:980,views:9800},{id:3,title:"Цифровая инсталляция",artist:"Анна Смирнова",likes:2100,views:21e3},{id:4,title:"Портрет женщины",artist:"Дмитрий Козлов",likes:1560,views:15600},{id:5,title:"Морской пейзаж",artist:"Елена Васильева",likes:780,views:7800}];return r.jsxs("div",{className:"container mx-auto py-8",children:[r.jsxs("div",{className:"mb-8",children:[r.jsx("h1",{className:"text-3xl font-bold",children:"Админ-панель"}),r.jsx("p",{className:"text-muted-foreground",children:"Управление платформой виртуальной галереи"})]}),r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",children:t.map((a,l)=>r.jsx(dg,{title:a.title,value:a.value,change:a.change,icon:a.icon,trend:a.trend},l))}),r.jsxs("div",{className:"flex space-x-4 mb-6 border-b",children:[r.jsx("button",{className:`pb-3 px-1 ${n==="overview"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("overview"),children:"Обзор"}),r.jsx("button",{className:`pb-3 px-1 ${n==="users"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("users"),children:"Пользователи"}),r.jsx("button",{className:`pb-3 px-1 ${n==="artworks"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("artworks"),children:"Экспонаты"}),r.jsx("button",{className:`pb-3 px-1 ${n==="analytics"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("analytics"),children:"Аналитика"})]}),n==="overview"&&r.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[r.jsxs(He,{className:"lg:col-span-2",children:[r.jsxs(Ge,{children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx(Ve,{children:"Недавние действия"}),r.jsx(be,{variant:"outline",size:"sm",children:"Просмотреть все"})]}),r.jsx(Xe,{children:"Последние действия пользователей на платформе"})]}),r.jsx(We,{children:r.jsx("div",{className:"space-y-4",children:i.map(a=>r.jsxs("div",{className:"flex items-start space-x-4",children:[r.jsx("div",{className:`p-2 rounded-full ${a.type==="add"?"bg-blue-100 text-blue-600":a.type==="review"?"bg-green-100 text-green-600":a.type==="collection"?"bg-purple-100 text-purple-600":a.type==="join"?"bg-orange-100 text-orange-600":"bg-gray-100 text-gray-600"}`,children:a.type==="add"?r.jsx(nn,{className:"h-4 w-4"}):a.type==="review"?r.jsx(Ot,{className:"h-4 w-4"}):a.type==="collection"?r.jsx(Or,{className:"h-4 w-4"}):a.type==="join"?r.jsx(Bn,{className:"h-4 w-4"}):r.jsx(un,{className:"h-4 w-4"})}),r.jsxs("div",{className:"flex-1",children:[r.jsx("p",{className:"text-sm font-medium",children:a.user}),r.jsx("p",{className:"text-sm text-muted-foreground",children:a.action}),r.jsx("p",{className:"text-xs text-muted-foreground",children:a.time})]})]},a.id))})})]}),r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx(Ve,{children:"Топ экспонатов"}),r.jsx(be,{variant:"outline",size:"sm",children:"Просмотреть все"})]}),r.jsx(Xe,{children:"Самые популярные экспонаты за последний месяц"})]}),r.jsx(We,{children:r.jsx("div",{className:"space-y-4",children:s.map(a=>r.jsxs("div",{className:"flex items-center space-x-4",children:[r.jsx("div",{className:"bg-muted rounded-lg p-2",children:r.jsx(_i,{className:"h-8 w-8 text-primary"})}),r.jsxs("div",{className:"flex-1",children:[r.jsx("p",{className:"text-sm font-medium",children:a.title}),r.jsx("p",{className:"text-xs text-muted-foreground",children:a.artist})]}),r.jsxs("div",{className:"text-right",children:[r.jsxs("p",{className:"text-sm font-medium",children:[a.likes," лайков"]}),r.jsxs("p",{className:"text-xs text-muted-foreground",children:[a.views," просмотров"]})]})]},a.id))})})]})]}),n==="users"&&r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Управление пользователями"}),r.jsx(Xe,{children:"Просмотр и управление аккаунтами пользователей"})]}),r.jsxs(We,{children:[r.jsxs("div",{className:"flex justify-between items-center mb-4",children:[r.jsx("h3",{className:"text-lg font-medium",children:"Список пользователей"}),r.jsx(be,{children:"Добавить пользователя"})]}),r.jsx("div",{className:"border rounded-lg",children:r.jsxs("table",{className:"w-full",children:[r.jsx("thead",{className:"border-b",children:r.jsxs("tr",{children:[r.jsx("th",{className:"text-left p-4",children:"Пользователь"}),r.jsx("th",{className:"text-left p-4",children:"Роль"}),r.jsx("th",{className:"text-left p-4",children:"Дата регистрации"}),r.jsx("th",{className:"text-left p-4",children:"Статус"}),r.jsx("th",{className:"text-left p-4",children:"Действия"})]})}),r.jsx("tbody",{children:[1,2,3,4,5].map(a=>r.jsxs("tr",{className:"border-b hover:bg-muted/50",children:[r.jsx("td",{className:"p-4",children:r.jsxs("div",{className:"flex items-center space-x-3",children:[r.jsx("div",{className:"bg-primary/10 p-2 rounded-full",children:r.jsx(Bn,{className:"h-5 w-5 text-primary"})}),r.jsxs("div",{children:[r.jsxs("p",{className:"font-medium",children:["Пользователь ",a]}),r.jsxs("p",{className:"text-sm text-muted-foreground",children:["user",a,"@example.com"]})]})]})}),r.jsx("td",{className:"p-4",children:r.jsx(yt,{variant:"outline",children:a===1?"admin":a===2?"curator":"user"})}),r.jsxs("td",{className:"p-4",children:["15.",a,".2023"]}),r.jsx("td",{className:"p-4",children:r.jsx(yt,{variant:a%2===0?"default":"secondary",children:a%2===0?"Активен":"Неактивен"})}),r.jsx("td",{className:"p-4",children:r.jsx(be,{variant:"outline",size:"sm",children:"Редактировать"})})]},a))})]})})]})]}),n==="artworks"&&r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Управление экспонатами"}),r.jsx(Xe,{children:"Просмотр и управление экспонатами галереи"})]}),r.jsxs(We,{children:[r.jsxs("div",{className:"flex justify-between items-center mb-4",children:[r.jsx("h3",{className:"text-lg font-medium",children:"Список экспонатов"}),r.jsx(be,{children:"Добавить экспонат"})]}),r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:[1,2,3,4,5,6].map(a=>r.jsxs(He,{className:"overflow-hidden",children:[r.jsx("div",{className:"bg-muted aspect-video flex items-center justify-center",children:r.jsx(_i,{className:"h-12 w-12 text-primary/20"})}),r.jsxs(Ge,{children:[r.jsxs(Ve,{className:"text-lg",children:["Экспонат ",a]}),r.jsxs(Xe,{children:["Художник ",a]})]}),r.jsxs(We,{children:[r.jsxs("div",{className:"flex justify-between items-center",children:[r.jsxs(yt,{variant:"outline",children:["Категория ",a]}),r.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[r.jsx(un,{className:"h-4 w-4 mr-1"}),r.jsx("span",{children:Math.floor(Math.random()*1e3)})]})]}),r.jsxs("div",{className:"mt-4 flex space-x-2",children:[r.jsx(be,{variant:"outline",size:"sm",className:"flex-1",children:"Просмотр"}),r.jsx(be,{size:"sm",children:"Редактировать"})]})]})]},a))})]})]}),n==="analytics"&&r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Аналитика платформы"}),r.jsx(Xe,{children:"Статистика использования и взаимодействия пользователей"})]}),r.jsx(We,{children:r.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Посещаемость"}),r.jsx(Xe,{children:"Посетители за последние 30 дней"})]}),r.jsx(We,{children:r.jsxs("div",{className:"h-64 flex items-center justify-center bg-muted rounded-lg",children:[r.jsx(ju,{className:"h-12 w-12 text-primary/20"}),r.jsx("p",{className:"ml-4 text-muted-foreground",children:"График посещаемости"})]})})]}),r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Популярность экспонатов"}),r.jsx(Xe,{children:"Топ-10 самых просматриваемых экспонатов"})]}),r.jsx(We,{children:r.jsxs("div",{className:"h-64 flex items-center justify-center bg-muted rounded-lg",children:[r.jsx(Or,{className:"h-12 w-12 text-primary/20"}),r.jsx("p",{className:"ml-4 text-muted-foreground",children:"График популярности"})]})})]})]})})]})]})},hg=()=>{const[n,e]=O.useState("dashboard"),[t,i]=O.useState([{id:1,title:"Абстрактная композиция",artist:"Александр Петров",submittedBy:"Мария Иванова",submissionDate:"2023-11-15",status:"pending",image:"/placeholder-artwork.jpg"},{id:2,title:"Городской пейзаж",artist:"Мария Иванова",submittedBy:"Дмитрий Сидоров",submissionDate:"2023-11-14",status:"approved",image:"/placeholder-artwork.jpg"},{id:3,title:"Цифровая инсталляция",artist:"Анна Смирнова",submittedBy:"Елена Козлова",submissionDate:"2023-11-13",status:"rejected",image:"/placeholder-artwork.jpg"}]),s=[{title:"Всего экспонатов",value:"1,240",change:"+12%"},{title:"Новых за сегодня",value:"12",change:"+5%"},{title:"На рассмотрении",value:"24",change:"-3%"},{title:"Одобренных",value:"1,190",change:"+15%"}],a=[{id:1,title:"Абстрактная композиция",artist:"Александр Петров",date:"2 часа назад",status:"pending"},{id:2,title:"Городской пейзаж",artist:"Мария Иванова",date:"5 часов назад",status:"approved"},{id:3,title:"Цифровая инсталляция",artist:"Анна Смирнова",date:"1 день назад",status:"rejected"},{id:4,title:"Портрет женщины",artist:"Дмитрий Козлов",date:"2 дня назад",status:"pending"}],l=c=>{i(t.map(d=>d.id===c?{...d,status:"approved"}:d))},o=c=>{i(t.map(d=>d.id===c?{...d,status:"rejected"}:d))};return r.jsxs("div",{className:"container mx-auto py-8",children:[r.jsxs("div",{className:"mb-8",children:[r.jsx("h1",{className:"text-3xl font-bold",children:"Панель куратора"}),r.jsx("p",{className:"text-muted-foreground",children:"Управление экспонатами и рассмотрение новых материалов"})]}),r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",children:s.map((c,d)=>r.jsxs(He,{children:[r.jsxs(Ge,{className:"pb-2",children:[r.jsx(Xe,{children:c.title}),r.jsx(Ve,{className:"text-2xl",children:c.value})]}),r.jsx(We,{children:r.jsxs("div",{className:"flex items-center text-sm text-green-500",children:[r.jsx(nr,{className:"h-4 w-4 mr-1"}),c.change]})})]},d))}),r.jsxs("div",{className:"flex space-x-4 mb-6 border-b",children:[r.jsx("button",{className:`pb-3 px-1 ${n==="dashboard"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("dashboard"),children:"Дашборд"}),r.jsx("button",{className:`pb-3 px-1 ${n==="submissions"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("submissions"),children:"Материалы на рассмотрении"}),r.jsx("button",{className:`pb-3 px-1 ${n==="collections"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("collections"),children:"Коллекции"}),r.jsx("button",{className:`pb-3 px-1 ${n==="analytics"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("analytics"),children:"Аналитика"})]}),n==="dashboard"&&r.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[r.jsxs(He,{className:"lg:col-span-2",children:[r.jsxs(Ge,{children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx(Ve,{children:"Недавние материалы"}),r.jsx(be,{variant:"outline",size:"sm",children:"Просмотреть все"})]}),r.jsx(Xe,{children:"Последние материалы, добавленные пользователями"})]}),r.jsx(We,{children:r.jsx("div",{className:"space-y-4",children:a.map(c=>r.jsxs("div",{className:"flex items-center justify-between p-4 border rounded-lg",children:[r.jsxs("div",{className:"flex items-center space-x-4",children:[r.jsx("div",{className:"bg-muted rounded-lg p-2",children:r.jsx(_i,{className:"h-6 w-6 text-primary"})}),r.jsxs("div",{children:[r.jsx("p",{className:"font-medium",children:c.title}),r.jsxs("p",{className:"text-sm text-muted-foreground",children:["Автор: ",c.artist]})]})]}),r.jsxs("div",{className:"flex items-center space-x-4",children:[r.jsx(yt,{variant:c.status==="pending"?"default":c.status==="approved"?"secondary":"destructive",children:c.status==="pending"?"На рассмотрении":c.status==="approved"?"Одобрен":"Отклонен"}),r.jsx("span",{className:"text-sm text-muted-foreground",children:c.date})]})]},c.id))})})]}),r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Быстрые действия"}),r.jsx(Xe,{children:"Часто используемые функции"})]}),r.jsx(We,{children:r.jsxs("div",{className:"space-y-4",children:[r.jsxs(be,{className:"w-full justify-start",children:[r.jsx(Vl,{className:"h-4 w-4 mr-2"}),"Добавить экспонат"]}),r.jsxs(be,{variant:"outline",className:"w-full justify-start",children:[r.jsx(nn,{className:"h-4 w-4 mr-2"}),"Создать коллекцию"]}),r.jsxs(be,{variant:"outline",className:"w-full justify-start",children:[r.jsx(Ws,{className:"h-4 w-4 mr-2"}),"Ответить на отзывы"]}),r.jsxs(be,{variant:"outline",className:"w-full justify-start",children:[r.jsx(Ot,{className:"h-4 w-4 mr-2"}),"Рекомендовать экспонат"]})]})})]})]}),n==="submissions"&&r.jsxs(He,{children:[r.jsx(Ge,{children:r.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",children:[r.jsxs("div",{children:[r.jsx(Ve,{children:"Материалы на рассмотрении"}),r.jsx(Xe,{children:"Новые экспонаты, отправленные пользователями для проверки"})]}),r.jsxs("div",{className:"flex gap-2",children:[r.jsxs("div",{className:"relative",children:[r.jsx(Hr,{className:"absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"}),r.jsx("input",{type:"text",placeholder:"Поиск...",className:"pl-8 pr-4 py-2 border rounded-lg w-full sm:w-64"})]}),r.jsxs(be,{variant:"outline",children:[r.jsx(Ou,{className:"h-4 w-4 mr-2"}),"Фильтр"]})]})]})}),r.jsx(We,{children:r.jsx("div",{className:"overflow-x-auto",children:r.jsxs("table",{className:"w-full",children:[r.jsx("thead",{className:"border-b",children:r.jsxs("tr",{children:[r.jsx("th",{className:"text-left p-4",children:"Экспонат"}),r.jsx("th",{className:"text-left p-4",children:"Автор"}),r.jsx("th",{className:"text-left p-4",children:"Отправитель"}),r.jsx("th",{className:"text-left p-4",children:"Дата"}),r.jsx("th",{className:"text-left p-4",children:"Статус"}),r.jsx("th",{className:"text-left p-4",children:"Действия"})]})}),r.jsx("tbody",{children:t.map(c=>r.jsxs("tr",{className:"border-b hover:bg-muted/50",children:[r.jsx("td",{className:"p-4",children:r.jsxs("div",{className:"flex items-center space-x-3",children:[r.jsx("div",{className:"bg-muted rounded-lg p-2",children:r.jsx(_i,{className:"h-6 w-6 text-primary"})}),r.jsx("span",{className:"font-medium",children:c.title})]})}),r.jsx("td",{className:"p-4",children:c.artist}),r.jsx("td",{className:"p-4",children:c.submittedBy}),r.jsx("td",{className:"p-4",children:c.submissionDate}),r.jsx("td",{className:"p-4",children:r.jsx(yt,{variant:c.status==="pending"?"default":c.status==="approved"?"secondary":"destructive",children:c.status==="pending"?"На рассмотрении":c.status==="approved"?"Одобрен":"Отклонен"})}),r.jsx("td",{className:"p-4",children:c.status==="pending"?r.jsxs("div",{className:"flex space-x-2",children:[r.jsxs(be,{size:"sm",variant:"outline",onClick:()=>l(c.id),children:[r.jsx(Vp,{className:"h-4 w-4 mr-1 text-green-500"}),"Одобрить"]}),r.jsxs(be,{size:"sm",variant:"outline",onClick:()=>o(c.id),children:[r.jsx(Xp,{className:"h-4 w-4 mr-1 text-red-500"}),"Отклонить"]})]}):r.jsx("span",{className:"text-sm text-muted-foreground",children:"-"})})]},c.id))})]})})})]}),n==="collections"&&r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx(Ve,{children:"Коллекции"}),r.jsxs(be,{children:[r.jsx(Vl,{className:"h-4 w-4 mr-2"}),"Создать коллекцию"]})]}),r.jsx(Xe,{children:"Управление коллекциями экспонатов"})]}),r.jsx(We,{children:r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:[1,2,3,4,5,6].map(c=>r.jsxs(He,{className:"overflow-hidden",children:[r.jsx("div",{className:"bg-muted aspect-video flex items-center justify-center",children:r.jsx(nn,{className:"h-12 w-12 text-primary/20"})}),r.jsxs(Ge,{children:[r.jsxs(Ve,{className:"text-lg",children:["Коллекция ",c]}),r.jsxs(Xe,{children:[Math.floor(Math.random()*50)+5," экспонатов"]})]}),r.jsxs(We,{children:[r.jsxs("div",{className:"flex justify-between items-center",children:[r.jsxs(yt,{variant:"outline",children:["Тема ",c]}),r.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[r.jsx(Tn,{className:"h-4 w-4 mr-1"}),r.jsx("span",{children:Math.floor(Math.random()*1e3)})]})]}),r.jsxs("div",{className:"mt-4 flex space-x-2",children:[r.jsx(be,{variant:"outline",size:"sm",className:"flex-1",children:"Просмотр"}),r.jsx(be,{size:"sm",children:"Редактировать"})]})]})]},c))})})]}),n==="analytics"&&r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Аналитика куратора"}),r.jsx(Xe,{children:"Статистика ваших действий и принятых решений"})]}),r.jsx(We,{children:r.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Решения по материалам"}),r.jsx(Xe,{children:"Статусы принятых решений"})]}),r.jsx(We,{children:r.jsx("div",{className:"h-64 flex items-center justify-center bg-muted rounded-lg",children:r.jsxs("div",{className:"text-center",children:[r.jsx(nn,{className:"h-12 w-12 text-primary/20 mx-auto"}),r.jsx("p",{className:"mt-2 text-muted-foreground",children:"График решений"})]})})})]}),r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Популярность коллекций"}),r.jsx(Xe,{children:"Просмотры и взаимодействия с вашими коллекциями"})]}),r.jsx(We,{children:r.jsx("div",{className:"h-64 flex items-center justify-center bg-muted rounded-lg",children:r.jsxs("div",{className:"text-center",children:[r.jsx(Ot,{className:"h-12 w-12 text-primary/20 mx-auto"}),r.jsx("p",{className:"mt-2 text-muted-foreground",children:"График популярности"})]})})})]})]})})]})]})},fg=()=>{const[n,e]=O.useState("dashboard"),[t,i]=O.useState([{id:1,title:"Проверить новые экспонаты",description:"Проверить 15 новых экспонатов, загруженных за вчера",priority:"high",status:"in-progress",assignedTo:"Василий Петров",dueDate:"2023-11-20"},{id:2,title:"Обновить описания",description:'Обновить описания для 20 экспонатов в галерее "Современное искусство"',priority:"medium",status:"pending",assignedTo:"Мария Иванова",dueDate:"2023-11-22"},{id:3,title:"Ответить на отзывы",description:"Ответить на 12 новых отзывов пользователей",priority:"low",status:"pending",assignedTo:"Алексей Сидоров",dueDate:"2023-11-25"}]),s=[{title:"Всего задач",value:"24",change:"+5%"},{title:"Выполнено",value:"18",change:"+12%"},{title:"В работе",value:"4",change:"-2%"},{title:"Просрочено",value:"2",change:"-1%"}],a=[{id:1,user:"Александр Петров",action:"Добавил новый экспонат",time:"2 минуты назад",type:"add"},{id:2,user:"Мария Иванова",action:"Оставил отзыв",time:"15 минут назад",type:"review"},{id:3,user:"Дмитрий Сидоров",action:"Создал коллекцию",time:"1 час назад",type:"collection"},{id:4,user:"Елена Козлова",action:"Присоединился к платформе",time:"2 часа назад",type:"join"},{id:5,user:"Сергей Новиков",action:"Оценил экспонат",time:"3 часа назад",type:"rate"}],l=(o,c)=>{i(t.map(d=>d.id===o?{...d,status:c}:d))};return r.jsxs("div",{className:"container mx-auto py-8",children:[r.jsxs("div",{className:"mb-8",children:[r.jsx("h1",{className:"text-3xl font-bold",children:"Панель сотрудника"}),r.jsx("p",{className:"text-muted-foreground",children:"Управление задачами и контентом галереи"})]}),r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",children:s.map((o,c)=>r.jsxs(He,{children:[r.jsxs(Ge,{className:"pb-2",children:[r.jsx(Xe,{children:o.title}),r.jsx(Ve,{className:"text-2xl",children:o.value})]}),r.jsx(We,{children:r.jsxs("div",{className:"flex items-center text-sm text-green-500",children:[r.jsx(nr,{className:"h-4 w-4 mr-1"}),o.change]})})]},c))}),r.jsxs("div",{className:"flex space-x-4 mb-6 border-b",children:[r.jsx("button",{className:`pb-3 px-1 ${n==="dashboard"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("dashboard"),children:"Дашборд"}),r.jsx("button",{className:`pb-3 px-1 ${n==="tasks"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("tasks"),children:"Задачи"}),r.jsx("button",{className:`pb-3 px-1 ${n==="content"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("content"),children:"Контент"}),r.jsx("button",{className:`pb-3 px-1 ${n==="reports"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("reports"),children:"Отчеты"})]}),n==="dashboard"&&r.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[r.jsxs(He,{className:"lg:col-span-2",children:[r.jsxs(Ge,{children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx(Ve,{children:"Недавние действия"}),r.jsx(be,{variant:"outline",size:"sm",children:"Просмотреть все"})]}),r.jsx(Xe,{children:"Последние действия пользователей на платформе"})]}),r.jsx(We,{children:r.jsx("div",{className:"space-y-4",children:a.map(o=>r.jsxs("div",{className:"flex items-start space-x-4",children:[r.jsx("div",{className:`p-2 rounded-full ${o.type==="add"?"bg-blue-100 text-blue-600":o.type==="review"?"bg-green-100 text-green-600":o.type==="collection"?"bg-purple-100 text-purple-600":o.type==="join"?"bg-orange-100 text-orange-600":"bg-gray-100 text-gray-600"}`,children:o.type==="add"?r.jsx(nn,{className:"h-4 w-4"}):o.type==="review"?r.jsx(Ot,{className:"h-4 w-4"}):o.type==="collection"?r.jsx(Or,{className:"h-4 w-4"}):o.type==="join"?r.jsx(Bn,{className:"h-4 w-4"}):r.jsx(un,{className:"h-4 w-4"})}),r.jsxs("div",{className:"flex-1",children:[r.jsx("p",{className:"text-sm font-medium",children:o.user}),r.jsx("p",{className:"text-sm text-muted-foreground",children:o.action}),r.jsx("p",{className:"text-xs text-muted-foreground",children:o.time})]})]},o.id))})})]}),r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx(Ve,{children:"Мои задачи"}),r.jsx(be,{variant:"outline",size:"sm",children:"Создать"})]}),r.jsx(Xe,{children:"Задачи, назначенные вам"})]}),r.jsx(We,{children:r.jsx("div",{className:"space-y-4",children:t.slice(0,3).map(o=>r.jsxs("div",{className:"border rounded-lg p-4",children:[r.jsxs("div",{className:"flex justify-between items-start",children:[r.jsx("h4",{className:"font-medium",children:o.title}),r.jsx(yt,{variant:o.priority==="high"?"destructive":o.priority==="medium"?"default":"secondary",children:o.priority==="high"?"Высокий":o.priority==="medium"?"Средний":"Низкий"})]}),r.jsx("p",{className:"text-sm text-muted-foreground mt-1",children:o.description}),r.jsxs("div",{className:"flex justify-between items-center mt-3",children:[r.jsxs("div",{className:"flex items-center text-xs text-muted-foreground",children:[r.jsx(si,{className:"h-3 w-3 mr-1"}),r.jsx("span",{children:o.dueDate})]}),r.jsx(yt,{variant:o.status==="pending"?"outline":o.status==="in-progress"?"default":"secondary",children:o.status==="pending"?"В ожидании":o.status==="in-progress"?"В работе":"Завершено"})]})]},o.id))})})]})]}),n==="tasks"&&r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx(Ve,{children:"Управление задачами"}),r.jsxs(be,{children:[r.jsx(fm,{className:"h-4 w-4 mr-2"}),"Создать задачу"]})]}),r.jsx(Xe,{children:"Назначение, отслеживание и выполнение задач"})]}),r.jsx(We,{children:r.jsx("div",{className:"overflow-x-auto",children:r.jsxs("table",{className:"w-full",children:[r.jsx("thead",{className:"border-b",children:r.jsxs("tr",{children:[r.jsx("th",{className:"text-left p-4",children:"Задача"}),r.jsx("th",{className:"text-left p-4",children:"Описание"}),r.jsx("th",{className:"text-left p-4",children:"Приоритет"}),r.jsx("th",{className:"text-left p-4",children:"Статус"}),r.jsx("th",{className:"text-left p-4",children:"Назначен"}),r.jsx("th",{className:"text-left p-4",children:"Срок"}),r.jsx("th",{className:"text-left p-4",children:"Действия"})]})}),r.jsx("tbody",{children:t.map(o=>r.jsxs("tr",{className:"border-b hover:bg-muted/50",children:[r.jsx("td",{className:"p-4 font-medium",children:o.title}),r.jsx("td",{className:"p-4 text-sm text-muted-foreground max-w-xs truncate",children:o.description}),r.jsx("td",{className:"p-4",children:r.jsx(yt,{variant:o.priority==="high"?"destructive":o.priority==="medium"?"default":"secondary",children:o.priority==="high"?"Высокий":o.priority==="medium"?"Средний":"Низкий"})}),r.jsx("td",{className:"p-4",children:r.jsx(yt,{variant:o.status==="pending"?"outline":o.status==="in-progress"?"default":"secondary",children:o.status==="pending"?"В ожидании":o.status==="in-progress"?"В работе":"Завершено"})}),r.jsx("td",{className:"p-4",children:o.assignedTo}),r.jsx("td",{className:"p-4",children:o.dueDate}),r.jsx("td",{className:"p-4",children:r.jsx("div",{className:"flex space-x-2",children:r.jsx(be,{size:"sm",variant:o.status==="completed"?"outline":"default",onClick:()=>l(o.id,o.status==="completed"?"in-progress":"completed"),children:o.status==="completed"?"Вернуть":"Выполнить"})})})]},o.id))})]})})})]}),n==="content"&&r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx(Ve,{children:"Управление контентом"}),r.jsxs(be,{children:[r.jsx(_i,{className:"h-4 w-4 mr-2"}),"Добавить экспонат"]})]}),r.jsx(Xe,{children:"Редактирование и управление экспонатами"})]}),r.jsx(We,{children:r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:[1,2,3,4,5,6].map(o=>r.jsxs(He,{className:"overflow-hidden",children:[r.jsx("div",{className:"bg-muted aspect-video flex items-center justify-center",children:r.jsx(_i,{className:"h-12 w-12 text-primary/20"})}),r.jsxs(Ge,{children:[r.jsxs(Ve,{className:"text-lg",children:["Экспонат ",o]}),r.jsxs(Xe,{children:["Художник ",o]})]}),r.jsxs(We,{children:[r.jsxs("div",{className:"flex justify-between items-center",children:[r.jsxs(yt,{variant:"outline",children:["Категория ",o]}),r.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[r.jsx(un,{className:"h-4 w-4 mr-1"}),r.jsx("span",{children:Math.floor(Math.random()*1e3)})]})]}),r.jsxs("div",{className:"mt-4 flex space-x-2",children:[r.jsx(be,{variant:"outline",size:"sm",className:"flex-1",children:"Просмотр"}),r.jsx(be,{size:"sm",children:"Редактировать"})]})]})]},o))})})]}),n==="reports"&&r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Отчеты и аналитика"}),r.jsx(Xe,{children:"Статистика ваших действий и активности"})]}),r.jsx(We,{children:r.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Ваши задачи"}),r.jsx(Xe,{children:"Статус выполнения назначенных задач"})]}),r.jsx(We,{children:r.jsxs("div",{className:"h-64 flex items-center justify-center bg-muted rounded-lg",children:[r.jsx(ju,{className:"h-12 w-12 text-primary/20"}),r.jsx("p",{className:"ml-4 text-muted-foreground",children:"График выполнения задач"})]})})]}),r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Вклад в контент"}),r.jsx(Xe,{children:"Ваши вклады в развитие контента галереи"})]}),r.jsx(We,{children:r.jsxs("div",{className:"h-64 flex items-center justify-center bg-muted rounded-lg",children:[r.jsx(Or,{className:"h-12 w-12 text-primary/20"}),r.jsx("p",{className:"ml-4 text-muted-foreground",children:"График активности"})]})})]})]})})]})]})},pg=()=>{const[n,e]=O.useState("dashboard"),[t,i]=O.useState([{id:1,title:"Введение в современное искусство",description:"Обзор основных направлений современного искусства",duration:"45 мин",participants:12,rating:4.7,status:"scheduled",scheduledDate:"2023-11-20",scheduledTime:"14:00"},{id:2,title:"История импрессионизма",description:"Путешествие через эпоху импрессионизма",duration:"60 мин",participants:8,rating:4.9,status:"ongoing",scheduledDate:"2023-11-20",scheduledTime:"16:00"},{id:3,title:"Цифровые инсталляции",description:"Интерактивные цифровые произведения искусства",duration:"50 мин",participants:15,rating:4.5,status:"completed",scheduledDate:"2023-11-19",scheduledTime:"15:00"}]),s=[{title:"Всего туров",value:"42",change:"+8%"},{title:"Проведено",value:"38",change:"+12%"},{title:"Участников",value:"420",change:"+15%"},{title:"Средний рейтинг",value:"4.7",change:"+0.2"}],a=[{id:1,name:"Александр Петров",email:"alex@example.com",joinedTour:"Введение в современное искусство",engagement:92},{id:2,name:"Мария Иванова",email:"maria@example.com",joinedTour:"История импрессионизма",engagement:87},{id:3,name:"Дмитрий Сидоров",email:"dmitry@example.com",joinedTour:"Цифровые инсталляции",engagement:95},{id:4,name:"Елена Козлова",email:"elena@example.com",joinedTour:"Введение в современное искусство",engagement:78},{id:5,name:"Сергей Новиков",email:"sergey@example.com",joinedTour:"Классическая живопись",engagement:89}],l=c=>{i(t.map(d=>d.id===c?{...d,status:"ongoing"}:d))},o=c=>{i(t.map(d=>d.id===c?{...d,status:"completed"}:d))};return r.jsxs("div",{className:"container mx-auto py-8",children:[r.jsxs("div",{className:"mb-8",children:[r.jsx("h1",{className:"text-3xl font-bold",children:"Панель гида"}),r.jsx("p",{className:"text-muted-foreground",children:"Управление виртуальными турами и взаимодействие с участниками"})]}),r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",children:s.map((c,d)=>r.jsxs(He,{children:[r.jsxs(Ge,{className:"pb-2",children:[r.jsx(Xe,{children:c.title}),r.jsx(Ve,{className:"text-2xl",children:c.value})]}),r.jsx(We,{children:r.jsxs("div",{className:"flex items-center text-sm text-green-500",children:[r.jsx(nr,{className:"h-4 w-4 mr-1"}),c.change]})})]},d))}),r.jsxs("div",{className:"flex space-x-4 mb-6 border-b",children:[r.jsx("button",{className:`pb-3 px-1 ${n==="dashboard"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("dashboard"),children:"Дашборд"}),r.jsx("button",{className:`pb-3 px-1 ${n==="tours"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("tours"),children:"Мои туры"}),r.jsx("button",{className:`pb-3 px-1 ${n==="participants"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("participants"),children:"Участники"}),r.jsx("button",{className:`pb-3 px-1 ${n==="analytics"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("analytics"),children:"Аналитика"})]}),n==="dashboard"&&r.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[r.jsxs(He,{className:"lg:col-span-2",children:[r.jsxs(Ge,{children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx(Ve,{children:"Предстоящие туры"}),r.jsx(be,{variant:"outline",size:"sm",children:"Просмотреть все"})]}),r.jsx(Xe,{children:"Запланированные виртуальные туры"})]}),r.jsx(We,{children:r.jsx("div",{className:"space-y-4",children:t.filter(c=>c.status!=="completed").map(c=>r.jsxs("div",{className:"border rounded-lg p-4",children:[r.jsxs("div",{className:"flex justify-between items-start",children:[r.jsxs("div",{children:[r.jsx("h4",{className:"font-medium",children:c.title}),r.jsx("p",{className:"text-sm text-muted-foreground mt-1",children:c.description})]}),r.jsx(yt,{variant:c.status==="scheduled"?"default":c.status==="ongoing"?"secondary":"outline",children:c.status==="scheduled"?"Запланирован":c.status==="ongoing"?"В процессе":"Завершен"})]}),r.jsxs("div",{className:"flex justify-between items-center mt-3",children:[r.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[r.jsx(si,{className:"h-4 w-4 mr-1"}),r.jsx("span",{children:c.duration}),r.jsx(Bn,{className:"h-4 w-4 ml-4 mr-1"}),r.jsxs("span",{children:[c.participants," участников"]})]}),r.jsxs("div",{className:"flex items-center",children:[r.jsx(Ot,{className:"h-4 w-4 text-yellow-500 mr-1"}),r.jsx("span",{children:c.rating})]})]}),r.jsxs("div",{className:"flex justify-between items-center mt-3",children:[r.jsxs("div",{className:"text-sm text-muted-foreground",children:[c.scheduledDate," в ",c.scheduledTime]}),r.jsxs("div",{className:"flex space-x-2",children:[c.status==="scheduled"&&r.jsxs(be,{size:"sm",onClick:()=>l(c.id),children:[r.jsx(Gl,{className:"h-4 w-4 mr-1"}),"Начать"]}),c.status==="ongoing"&&r.jsxs(be,{size:"sm",variant:"outline",onClick:()=>o(c.id),children:[r.jsx(zl,{className:"h-4 w-4 mr-1"}),"Завершить"]})]})]})]},c.id))})})]}),r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Быстрые действия"}),r.jsx(Xe,{children:"Часто используемые функции"})]}),r.jsx(We,{children:r.jsxs("div",{className:"space-y-4",children:[r.jsxs(be,{className:"w-full justify-start",children:[r.jsx(Hl,{className:"h-4 w-4 mr-2"}),"Создать тур"]}),r.jsxs(be,{variant:"outline",className:"w-full justify-start",children:[r.jsx(Ws,{className:"h-4 w-4 mr-2"}),"Ответить на вопросы"]}),r.jsxs(be,{variant:"outline",className:"w-full justify-start",children:[r.jsx(nn,{className:"h-4 w-4 mr-2"}),"Показать экспонаты"]}),r.jsxs(be,{variant:"outline",className:"w-full justify-start",children:[r.jsx(Ot,{className:"h-4 w-4 mr-2"}),"Оставить отзыв"]})]})})]})]}),n==="tours"&&r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx(Ve,{children:"Все туры"}),r.jsxs(be,{children:[r.jsx(Hl,{className:"h-4 w-4 mr-2"}),"Создать тур"]})]}),r.jsx(Xe,{children:"Управление виртуальными турами"})]}),r.jsx(We,{children:r.jsx("div",{className:"overflow-x-auto",children:r.jsxs("table",{className:"w-full",children:[r.jsx("thead",{className:"border-b",children:r.jsxs("tr",{children:[r.jsx("th",{className:"text-left p-4",children:"Название"}),r.jsx("th",{className:"text-left p-4",children:"Описание"}),r.jsx("th",{className:"text-left p-4",children:"Продолжительность"}),r.jsx("th",{className:"text-left p-4",children:"Участники"}),r.jsx("th",{className:"text-left p-4",children:"Рейтинг"}),r.jsx("th",{className:"text-left p-4",children:"Статус"}),r.jsx("th",{className:"text-left p-4",children:"Дата"}),r.jsx("th",{className:"text-left p-4",children:"Действия"})]})}),r.jsx("tbody",{children:t.map(c=>r.jsxs("tr",{className:"border-b hover:bg-muted/50",children:[r.jsx("td",{className:"p-4 font-medium",children:c.title}),r.jsx("td",{className:"p-4 text-sm text-muted-foreground max-w-xs truncate",children:c.description}),r.jsx("td",{className:"p-4",children:c.duration}),r.jsx("td",{className:"p-4",children:c.participants}),r.jsx("td",{className:"p-4",children:r.jsxs("div",{className:"flex items-center",children:[r.jsx(Ot,{className:"h-4 w-4 text-yellow-500 mr-1"}),r.jsx("span",{children:c.rating})]})}),r.jsx("td",{className:"p-4",children:r.jsx(yt,{variant:c.status==="scheduled"?"default":c.status==="ongoing"?"secondary":c.status==="completed"?"outline":"destructive",children:c.status==="scheduled"?"Запланирован":c.status==="ongoing"?"В процессе":c.status==="completed"?"Завершен":"Отменен"})}),r.jsxs("td",{className:"p-4",children:[c.scheduledDate," в ",c.scheduledTime]}),r.jsx("td",{className:"p-4",children:r.jsxs("div",{className:"flex space-x-2",children:[c.status==="scheduled"&&r.jsxs(be,{size:"sm",onClick:()=>l(c.id),children:[r.jsx(Gl,{className:"h-4 w-4 mr-1"}),"Начать"]}),c.status==="ongoing"&&r.jsxs(be,{size:"sm",variant:"outline",onClick:()=>o(c.id),children:[r.jsx(zl,{className:"h-4 w-4 mr-1"}),"Завершить"]}),r.jsx(be,{size:"sm",variant:"outline",children:r.jsx(Ws,{className:"h-4 w-4"})})]})})]},c.id))})]})})})]}),n==="participants"&&r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Участники туров"}),r.jsx(Xe,{children:"Информация об участниках ваших туров"})]}),r.jsx(We,{children:r.jsx("div",{className:"overflow-x-auto",children:r.jsxs("table",{className:"w-full",children:[r.jsx("thead",{className:"border-b",children:r.jsxs("tr",{children:[r.jsx("th",{className:"text-left p-4",children:"Имя"}),r.jsx("th",{className:"text-left p-4",children:"Email"}),r.jsx("th",{className:"text-left p-4",children:"Присоединился к"}),r.jsx("th",{className:"text-left p-4",children:"Вовлеченность"}),r.jsx("th",{className:"text-left p-4",children:"Действия"})]})}),r.jsx("tbody",{children:a.map(c=>r.jsxs("tr",{className:"border-b hover:bg-muted/50",children:[r.jsx("td",{className:"p-4 font-medium",children:c.name}),r.jsx("td",{className:"p-4 text-sm text-muted-foreground",children:c.email}),r.jsx("td",{className:"p-4",children:c.joinedTour}),r.jsx("td",{className:"p-4",children:r.jsxs("div",{className:"flex items-center",children:[r.jsx("div",{className:"w-24 bg-muted rounded-full h-2 mr-2",children:r.jsx("div",{className:"bg-primary h-2 rounded-full",style:{width:`${c.engagement}%`}})}),r.jsxs("span",{children:[c.engagement,"%"]})]})}),r.jsx("td",{className:"p-4",children:r.jsxs("div",{className:"flex space-x-2",children:[r.jsx(be,{size:"sm",variant:"outline",children:r.jsx(Ws,{className:"h-4 w-4"})}),r.jsx(be,{size:"sm",variant:"outline",children:r.jsx(Tn,{className:"h-4 w-4"})})]})})]},c.id))})]})})})]}),n==="analytics"&&r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Аналитика туров"}),r.jsx(Xe,{children:"Статистика ваших виртуальных туров"})]}),r.jsx(We,{children:r.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Популярность туров"}),r.jsx(Xe,{children:"Рейтинги и отзывы по турам"})]}),r.jsx(We,{children:r.jsxs("div",{className:"h-64 flex items-center justify-center bg-muted rounded-lg",children:[r.jsx(Or,{className:"h-12 w-12 text-primary/20"}),r.jsx("p",{className:"ml-4 text-muted-foreground",children:"График популярности"})]})})]}),r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Вовлеченность участников"}),r.jsx(Xe,{children:"Уровень вовлеченности по турам"})]}),r.jsx(We,{children:r.jsxs("div",{className:"h-64 flex items-center justify-center bg-muted rounded-lg",children:[r.jsx(un,{className:"h-12 w-12 text-primary/20"}),r.jsx("p",{className:"ml-4 text-muted-foreground",children:"График вовлеченности"})]})})]})]})})]})]})},mg=()=>{const[n,e]=O.useState("dashboard"),[t,i]=O.useState([{id:1,title:"Абстрактная композиция №1",artist:"Александр Петров",currentBid:12500,bidIncrement:500,endTime:"2023-11-25T18:00:00Z",image:"/placeholder-artwork.jpg",bids:12,startingPrice:1e4,reserveMet:!0},{id:2,title:"Городской пейзаж",artist:"Мария Иванова",currentBid:8500,bidIncrement:250,endTime:"2023-11-24T15:30:00Z",image:"/placeholder-artwork.jpg",bids:8,startingPrice:7e3,reserveMet:!0},{id:3,title:"Цифровая инсталляция",artist:"Анна Смирнова",currentBid:22e3,bidIncrement:1e3,endTime:"2023-11-26T20:00:00Z",image:"/placeholder-artwork.jpg",bids:21,startingPrice:2e4,reserveMet:!1}]),s=[{title:"Активные торги",value:"12",change:"+3%"},{title:"Мои ставки",value:"8",change:"+5%"},{title:"Выиграно",value:"3",change:"+2%"},{title:"Потрачено",value:"$42,500",change:"+12%"}],a=[{id:1,artworkTitle:"Абстрактная композиция №1",amount:12500,bidder:"Вы",time:"2023-11-20 14:32"},{id:2,artworkTitle:"Городской пейзаж",amount:8500,bidder:"Иван С.",time:"2023-11-19 16:45"},{id:3,artworkTitle:"Цифровая инсталляция",amount:22e3,bidder:"Вы",time:"2023-11-18 11:20"},{id:4,artworkTitle:"Портрет женщины",amount:15600,bidder:"Анна К.",time:"2023-11-17 09:15"},{id:5,artworkTitle:"Морской пейзаж",amount:7800,bidder:"Вы",time:"2023-11-16 17:30"}],l=(o,c)=>{i(t.map(d=>d.id===o?{...d,currentBid:c,bids:d.bids+1}:d))};return r.jsxs("div",{className:"container mx-auto py-8",children:[r.jsxs("div",{className:"mb-8",children:[r.jsx("h1",{className:"text-3xl font-bold",children:"Участник аукциона"}),r.jsx("p",{className:"text-muted-foreground",children:"Управление ставками и участие в торгах"})]}),r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",children:s.map((o,c)=>r.jsxs(He,{children:[r.jsxs(Ge,{className:"pb-2",children:[r.jsx(Xe,{children:o.title}),r.jsx(Ve,{className:"text-2xl",children:o.value})]}),r.jsx(We,{children:r.jsxs("div",{className:"flex items-center text-sm text-green-500",children:[r.jsx(nr,{className:"h-4 w-4 mr-1"}),o.change]})})]},c))}),r.jsxs("div",{className:"flex space-x-4 mb-6 border-b",children:[r.jsx("button",{className:`pb-3 px-1 ${n==="dashboard"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("dashboard"),children:"Дашборд"}),r.jsx("button",{className:`pb-3 px-1 ${n==="auctions"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("auctions"),children:"Аукционы"}),r.jsx("button",{className:`pb-3 px-1 ${n==="bids"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("bids"),children:"Мои ставки"}),r.jsx("button",{className:`pb-3 px-1 ${n==="history"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("history"),children:"История"})]}),n==="dashboard"&&r.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[r.jsxs(He,{className:"lg:col-span-2",children:[r.jsxs(Ge,{children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx(Ve,{children:"Активные торги"}),r.jsx(be,{variant:"outline",size:"sm",children:"Просмотреть все"})]}),r.jsx(Xe,{children:"Текущие аукционы, в которых вы можете участвовать"})]}),r.jsx(We,{children:r.jsx("div",{className:"space-y-4",children:t.slice(0,3).map(o=>r.jsx("div",{className:"border rounded-lg p-4",children:r.jsxs("div",{className:"flex items-start space-x-4",children:[r.jsx("div",{className:"bg-muted rounded-lg p-2 flex-shrink-0",children:r.jsx(nn,{className:"h-8 w-8 text-primary"})}),r.jsxs("div",{className:"flex-1",children:[r.jsxs("div",{className:"flex justify-between",children:[r.jsx("h4",{className:"font-medium",children:o.title}),r.jsx(yt,{variant:o.reserveMet?"default":"secondary",children:o.reserveMet?"Резерв превышен":"Резерв не достигнут"})]}),r.jsxs("p",{className:"text-sm text-muted-foreground",children:["Автор: ",o.artist]}),r.jsxs("div",{className:"flex justify-between items-center mt-3",children:[r.jsxs("div",{children:[r.jsx("p",{className:"text-sm text-muted-foreground",children:"Текущая ставка"}),r.jsxs("p",{className:"font-medium",children:["$",o.currentBid.toLocaleString()]})]}),r.jsxs("div",{children:[r.jsx("p",{className:"text-sm text-muted-foreground",children:"Ставок"}),r.jsx("p",{className:"font-medium",children:o.bids})]}),r.jsxs("div",{children:[r.jsx("p",{className:"text-sm text-muted-foreground",children:"До окончания"}),r.jsxs("p",{className:"font-medium",children:[r.jsx(si,{className:"h-4 w-4 inline mr-1"}),new Date(o.endTime).toLocaleDateString()]})]})]}),r.jsxs("div",{className:"flex justify-between items-center mt-4",children:[r.jsxs("div",{className:"flex space-x-2",children:[r.jsxs(be,{size:"sm",onClick:()=>l(o.id,o.currentBid+o.bidIncrement),children:[r.jsx(Bl,{className:"h-4 w-4 mr-1"}),"Сделать ставку"]}),r.jsxs(be,{size:"sm",variant:"outline",children:[r.jsx(un,{className:"h-4 w-4 mr-1"}),"Следить"]})]}),r.jsxs(be,{size:"sm",variant:"outline",children:[r.jsx(Tn,{className:"h-4 w-4 mr-1"}),"Подробнее"]})]})]})]})},o.id))})})]}),r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Моя статистика"}),r.jsx(Xe,{children:"Ваша активность на аукционах"})]}),r.jsx(We,{children:r.jsxs("div",{className:"space-y-4",children:[r.jsxs("div",{className:"flex justify-between items-center p-3 bg-muted rounded-lg",children:[r.jsxs("div",{className:"flex items-center",children:[r.jsx(Up,{className:"h-5 w-5 text-primary mr-2"}),r.jsx("span",{children:"Выиграно лотов"})]}),r.jsx("span",{className:"font-medium",children:"3"})]}),r.jsxs("div",{className:"flex justify-between items-center p-3 bg-muted rounded-lg",children:[r.jsxs("div",{className:"flex items-center",children:[r.jsx(rm,{className:"h-5 w-5 text-primary mr-2"}),r.jsx("span",{children:"Потрачено"})]}),r.jsx("span",{className:"font-medium",children:"$42,500"})]}),r.jsxs("div",{className:"flex justify-between items-center p-3 bg-muted rounded-lg",children:[r.jsxs("div",{className:"flex items-center",children:[r.jsx(Wl,{className:"h-5 w-5 text-primary mr-2"}),r.jsx("span",{children:"Активные ставки"})]}),r.jsx("span",{className:"font-medium",children:"8"})]}),r.jsxs("div",{className:"flex justify-between items-center p-3 bg-muted rounded-lg",children:[r.jsxs("div",{className:"flex items-center",children:[r.jsx(Ot,{className:"h-5 w-5 text-primary mr-2"}),r.jsx("span",{children:"Рейтинг"})]}),r.jsxs("div",{className:"flex items-center",children:[r.jsx(Ot,{className:"h-4 w-4 text-yellow-500"}),r.jsx("span",{className:"ml-1",children:"4.7"})]})]}),r.jsxs(be,{className:"w-full mt-4",children:[r.jsx(Vu,{className:"h-4 w-4 mr-2"}),"Пополнить баланс"]})]})})]})]}),n==="auctions"&&r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx(Ve,{children:"Все аукционы"}),r.jsxs(be,{variant:"outline",children:[r.jsx(Wl,{className:"h-4 w-4 mr-2"}),"Мои аукционы"]})]}),r.jsx(Xe,{children:"Список всех активных и предстоящих аукционов"})]}),r.jsx(We,{children:r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:t.map(o=>r.jsxs(He,{className:"overflow-hidden",children:[r.jsx("div",{className:"bg-muted aspect-video flex items-center justify-center",children:r.jsx(nn,{className:"h-12 w-12 text-primary/20"})}),r.jsxs(Ge,{children:[r.jsx(Ve,{className:"text-lg",children:o.title}),r.jsxs(Xe,{children:["Автор: ",o.artist]})]}),r.jsx(We,{children:r.jsxs("div",{className:"space-y-3",children:[r.jsxs("div",{className:"flex justify-between",children:[r.jsx("span",{className:"text-sm text-muted-foreground",children:"Текущая ставка"}),r.jsxs("span",{className:"font-medium",children:["$",o.currentBid.toLocaleString()]})]}),r.jsxs("div",{className:"flex justify-between",children:[r.jsx("span",{className:"text-sm text-muted-foreground",children:"Ставок"}),r.jsx("span",{className:"font-medium",children:o.bids})]}),r.jsxs("div",{className:"flex justify-between",children:[r.jsx("span",{className:"text-sm text-muted-foreground",children:"До окончания"}),r.jsx("span",{className:"font-medium",children:new Date(o.endTime).toLocaleDateString()})]}),r.jsx("div",{className:"pt-3",children:r.jsxs(be,{className:"w-full",onClick:()=>l(o.id,o.currentBid+o.bidIncrement),children:[r.jsx(Bl,{className:"h-4 w-4 mr-2"}),"Ставка $",o.currentBid+o.bidIncrement]})})]})})]},o.id))})})]}),n==="bids"&&r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Мои ставки"}),r.jsx(Xe,{children:"Текущие ставки, которые вы сделали"})]}),r.jsx(We,{children:r.jsx("div",{className:"overflow-x-auto",children:r.jsxs("table",{className:"w-full",children:[r.jsx("thead",{className:"border-b",children:r.jsxs("tr",{children:[r.jsx("th",{className:"text-left p-4",children:"Экспонат"}),r.jsx("th",{className:"text-left p-4",children:"Автор"}),r.jsx("th",{className:"text-left p-4",children:"Моя ставка"}),r.jsx("th",{className:"text-left p-4",children:"Статус"}),r.jsx("th",{className:"text-left p-4",children:"До окончания"}),r.jsx("th",{className:"text-left p-4",children:"Действия"})]})}),r.jsx("tbody",{children:t.map(o=>r.jsxs("tr",{className:"border-b hover:bg-muted/50",children:[r.jsx("td",{className:"p-4 font-medium",children:o.title}),r.jsx("td",{className:"p-4",children:o.artist}),r.jsxs("td",{className:"p-4 font-medium",children:["$",o.currentBid.toLocaleString()]}),r.jsx("td",{className:"p-4",children:r.jsx(yt,{variant:o.bids>0?"default":"secondary",children:o.bids>0?"Активна":"Ожидание"})}),r.jsx("td",{className:"p-4",children:r.jsxs("div",{className:"flex items-center",children:[r.jsx(si,{className:"h-4 w-4 mr-1"}),new Date(o.endTime).toLocaleDateString()]})}),r.jsx("td",{className:"p-4",children:r.jsxs("div",{className:"flex space-x-2",children:[r.jsx(be,{size:"sm",onClick:()=>l(o.id,o.currentBid+o.bidIncrement),children:"Повысить"}),r.jsx(be,{size:"sm",variant:"outline",children:"Отменить"})]})})]},o.id))})]})})})]}),n==="history"&&r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"История торгов"}),r.jsx(Xe,{children:"Ваши прошлые участия в аукционах"})]}),r.jsx(We,{children:r.jsx("div",{className:"overflow-x-auto",children:r.jsxs("table",{className:"w-full",children:[r.jsx("thead",{className:"border-b",children:r.jsxs("tr",{children:[r.jsx("th",{className:"text-left p-4",children:"Экспонат"}),r.jsx("th",{className:"text-left p-4",children:"Ставка"}),r.jsx("th",{className:"text-left p-4",children:"Участник"}),r.jsx("th",{className:"text-left p-4",children:"Время"}),r.jsx("th",{className:"text-left p-4",children:"Результат"})]})}),r.jsx("tbody",{children:a.map(o=>r.jsxs("tr",{className:"border-b hover:bg-muted/50",children:[r.jsx("td",{className:"p-4 font-medium",children:o.artworkTitle}),r.jsxs("td",{className:"p-4",children:["$",o.amount.toLocaleString()]}),r.jsx("td",{className:"p-4",children:o.bidder}),r.jsx("td",{className:"p-4",children:o.time}),r.jsx("td",{className:"p-4",children:r.jsx(yt,{variant:o.bidder==="Вы"?"default":"secondary",children:o.bidder==="Вы"?"Выиграно":"Проиграно"})})]},o.id))})]})})})]})]})};function eh(n,e){return function(){return n.apply(e,arguments)}}const{toString:gg}=Object.prototype,{getPrototypeOf:xa}=Object,{iterator:va,toStringTag:th}=Symbol,ya=(n=>e=>{const t=gg.call(e);return n[t]||(n[t]=t.slice(8,-1).toLowerCase())})(Object.create(null)),wn=n=>(n=n.toLowerCase(),e=>ya(e)===n),_a=n=>e=>typeof e===n,{isArray:Mi}=Array,ir=_a("undefined");function fr(n){return n!==null&&!ir(n)&&n.constructor!==null&&!ir(n.constructor)&&Yt(n.constructor.isBuffer)&&n.constructor.isBuffer(n)}const nh=wn("ArrayBuffer");function xg(n){let e;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?e=ArrayBuffer.isView(n):e=n&&n.buffer&&nh(n.buffer),e}const vg=_a("string"),Yt=_a("function"),ih=_a("number"),Gr=n=>n!==null&&typeof n=="object",yg=n=>n===!0||n===!1,Xs=n=>{if(ya(n)!=="object")return!1;const e=xa(n);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(th in n)&&!(va in n)},_g=n=>{if(!Gr(n)||fr(n))return!1;try{return Object.keys(n).length===0&&Object.getPrototypeOf(n)===Object.prototype}catch{return!1}},bg=wn("Date"),wg=wn("File"),Sg=n=>!!(n&&typeof n.uri<"u"),Eg=n=>n&&typeof n.getParts<"u",Mg=wn("Blob"),Tg=wn("FileList"),Ag=n=>Gr(n)&&Yt(n.pipe);function Rg(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const Kl=Rg(),Zl=typeof Kl.FormData<"u"?Kl.FormData:void 0,Cg=n=>{if(!n)return!1;if(Zl&&n instanceof Zl)return!0;const e=xa(n);if(!e||e===Object.prototype||!Yt(n.append))return!1;const t=ya(n);return t==="formdata"||t==="object"&&Yt(n.toString)&&n.toString()==="[object FormData]"},Ng=wn("URLSearchParams"),[Pg,Lg,jg,Dg]=["ReadableStream","Request","Response","Headers"].map(wn),Ig=n=>n.trim?n.trim():n.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Vr(n,e,{allOwnKeys:t=!1}={}){if(n===null||typeof n>"u")return;let i,s;if(typeof n!="object"&&(n=[n]),Mi(n))for(i=0,s=n.length;i<s;i++)e.call(null,n[i],i,n);else{if(fr(n))return;const a=t?Object.getOwnPropertyNames(n):Object.keys(n),l=a.length;let o;for(i=0;i<l;i++)o=a[i],e.call(null,n[o],o,n)}}function rh(n,e){if(fr(n))return null;e=e.toLowerCase();const t=Object.keys(n);let i=t.length,s;for(;i-- >0;)if(s=t[i],e===s.toLowerCase())return s;return null}const yi=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,sh=n=>!ir(n)&&n!==yi;function Oo(...n){const{caseless:e,skipUndefined:t}=sh(this)&&this||{},i={},s=(a,l)=>{if(l==="__proto__"||l==="constructor"||l==="prototype")return;const o=e&&typeof l=="string"&&rh(i,l)||l,c=ko(i,o)?i[o]:void 0;Xs(c)&&Xs(a)?i[o]=Oo(c,a):Xs(a)?i[o]=Oo({},a):Mi(a)?i[o]=a.slice():(!t||!ir(a))&&(i[o]=a)};for(let a=0,l=n.length;a<l;a++){const o=n[a];if(!o||fr(o)||(Vr(o,s),typeof o!="object"||Mi(o)))continue;const c=Object.getOwnPropertySymbols(o);for(let d=0;d<c.length;d++){const u=c[d];qg.call(o,u)&&s(o[u],u)}}return i}const Ug=(n,e,t,{allOwnKeys:i}={})=>(Vr(e,(s,a)=>{t&&Yt(s)?Object.defineProperty(n,a,{__proto__:null,value:eh(s,t),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(n,a,{__proto__:null,value:s,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:i}),n),Og=n=>(n.charCodeAt(0)===65279&&(n=n.slice(1)),n),kg=(n,e,t,i)=>{n.prototype=Object.create(e.prototype,i),Object.defineProperty(n.prototype,"constructor",{__proto__:null,value:n,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(n,"super",{__proto__:null,value:e.prototype}),t&&Object.assign(n.prototype,t)},Fg=(n,e,t,i)=>{let s,a,l;const o={};if(e=e||{},n==null)return e;do{for(s=Object.getOwnPropertyNames(n),a=s.length;a-- >0;)l=s[a],(!i||i(l,n,e))&&!o[l]&&(e[l]=n[l],o[l]=!0);n=t!==!1&&xa(n)}while(n&&(!t||t(n,e))&&n!==Object.prototype);return e},Bg=(n,e,t)=>{n=String(n),(t===void 0||t>n.length)&&(t=n.length),t-=e.length;const i=n.indexOf(e,t);return i!==-1&&i===t},zg=n=>{if(!n)return null;if(Mi(n))return n;let e=n.length;if(!ih(e))return null;const t=new Array(e);for(;e-- >0;)t[e]=n[e];return t},Hg=(n=>e=>n&&e instanceof n)(typeof Uint8Array<"u"&&xa(Uint8Array)),Gg=(n,e)=>{const i=(n&&n[va]).call(n);let s;for(;(s=i.next())&&!s.done;){const a=s.value;e.call(n,a[0],a[1])}},Vg=(n,e)=>{let t;const i=[];for(;(t=n.exec(e))!==null;)i.push(t);return i},Wg=wn("HTMLFormElement"),Xg=n=>n.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(t,i,s){return i.toUpperCase()+s}),ko=(({hasOwnProperty:n})=>(e,t)=>n.call(e,t))(Object.prototype),{propertyIsEnumerable:qg}=Object.prototype,$g=wn("RegExp"),ah=(n,e)=>{const t=Object.getOwnPropertyDescriptors(n),i={};Vr(t,(s,a)=>{let l;(l=e(s,a,n))!==!1&&(i[a]=l||s)}),Object.defineProperties(n,i)},Yg=n=>{ah(n,(e,t)=>{if(Yt(n)&&["arguments","caller","callee"].includes(t))return!1;const i=n[t];if(Yt(i)){if(e.enumerable=!1,"writable"in e){e.writable=!1;return}e.set||(e.set=()=>{throw Error("Can not rewrite read-only method '"+t+"'")})}})},Kg=(n,e)=>{const t={},i=s=>{s.forEach(a=>{t[a]=!0})};return Mi(n)?i(n):i(String(n).split(e)),t},Zg=()=>{},Jg=(n,e)=>n!=null&&Number.isFinite(n=+n)?n:e;function Qg(n){return!!(n&&Yt(n.append)&&n[th]==="FormData"&&n[va])}const ex=n=>{const e=new WeakSet,t=i=>{if(Gr(i)){if(e.has(i))return;if(fr(i))return i;if(!("toJSON"in i)){e.add(i);const s=Mi(i)?[]:{};return Vr(i,(a,l)=>{const o=t(a);!ir(o)&&(s[l]=o)}),e.delete(i),s}}return i};return t(n)},tx=wn("AsyncFunction"),nx=n=>n&&(Gr(n)||Yt(n))&&Yt(n.then)&&Yt(n.catch),oh=((n,e)=>n?setImmediate:e?((t,i)=>(yi.addEventListener("message",({source:s,data:a})=>{s===yi&&a===t&&i.length&&i.shift()()},!1),s=>{i.push(s),yi.postMessage(t,"*")}))(`axios@${Math.random()}`,[]):t=>setTimeout(t))(typeof setImmediate=="function",Yt(yi.postMessage)),ix=typeof queueMicrotask<"u"?queueMicrotask.bind(yi):typeof process<"u"&&process.nextTick||oh,rx=n=>n!=null&&Yt(n[va]),V={isArray:Mi,isArrayBuffer:nh,isBuffer:fr,isFormData:Cg,isArrayBufferView:xg,isString:vg,isNumber:ih,isBoolean:yg,isObject:Gr,isPlainObject:Xs,isEmptyObject:_g,isReadableStream:Pg,isRequest:Lg,isResponse:jg,isHeaders:Dg,isUndefined:ir,isDate:bg,isFile:wg,isReactNativeBlob:Sg,isReactNative:Eg,isBlob:Mg,isRegExp:$g,isFunction:Yt,isStream:Ag,isURLSearchParams:Ng,isTypedArray:Hg,isFileList:Tg,forEach:Vr,merge:Oo,extend:Ug,trim:Ig,stripBOM:Og,inherits:kg,toFlatObject:Fg,kindOf:ya,kindOfTest:wn,endsWith:Bg,toArray:zg,forEachEntry:Gg,matchAll:Vg,isHTMLForm:Wg,hasOwnProperty:ko,hasOwnProp:ko,reduceDescriptors:ah,freezeMethods:Yg,toObjectSet:Kg,toCamelCase:Xg,noop:Zg,toFiniteNumber:Jg,findKey:rh,global:yi,isContextDefined:sh,isSpecCompliantForm:Qg,toJSONObject:ex,isAsyncFn:tx,isThenable:nx,setImmediate:oh,asap:ix,isIterable:rx},sx=V.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),ax=n=>{const e={};let t,i,s;return n&&n.split(`
`).forEach(function(l){s=l.indexOf(":"),t=l.substring(0,s).trim().toLowerCase(),i=l.substring(s+1).trim(),!(!t||e[t]&&sx[t])&&(t==="set-cookie"?e[t]?e[t].push(i):e[t]=[i]:e[t]=e[t]?e[t]+", "+i:i)}),e};function ox(n){let e=0,t=n.length;for(;e<t;){const i=n.charCodeAt(e);if(i!==9&&i!==32)break;e+=1}for(;t>e;){const i=n.charCodeAt(t-1);if(i!==9&&i!==32)break;t-=1}return e===0&&t===n.length?n:n.slice(e,t)}const lx=new RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+","g"),cx=new RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+","g");function cl(n,e){return V.isArray(n)?n.map(t=>cl(t,e)):ox(String(n).replace(e,""))}const dx=n=>cl(n,lx),ux=n=>cl(n,cx);function lh(n){const e=Object.create(null);return V.forEach(n.toJSON(),(t,i)=>{e[i]=ux(t)}),e}const Jl=Symbol("internals");function yr(n){return n&&String(n).trim().toLowerCase()}function qs(n){return n===!1||n==null?n:V.isArray(n)?n.map(qs):dx(String(n))}function hx(n){const e=Object.create(null),t=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let i;for(;i=t.exec(n);)e[i[1]]=i[2];return e}const fx=n=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(n.trim());function Ia(n,e,t,i,s){if(V.isFunction(i))return i.call(this,e,t);if(s&&(e=t),!!V.isString(e)){if(V.isString(i))return e.indexOf(i)!==-1;if(V.isRegExp(i))return i.test(e)}}function px(n){return n.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(e,t,i)=>t.toUpperCase()+i)}function mx(n,e){const t=V.toCamelCase(" "+e);["get","set","has"].forEach(i=>{Object.defineProperty(n,i+t,{__proto__:null,value:function(s,a,l){return this[i].call(this,e,s,a,l)},configurable:!0})})}let Gt=class{constructor(e){e&&this.set(e)}set(e,t,i){const s=this;function a(o,c,d){const u=yr(c);if(!u)return;const f=V.findKey(s,u);(!f||s[f]===void 0||d===!0||d===void 0&&s[f]!==!1)&&(s[f||c]=qs(o))}const l=(o,c)=>V.forEach(o,(d,u)=>a(d,u,c));if(V.isPlainObject(e)||e instanceof this.constructor)l(e,t);else if(V.isString(e)&&(e=e.trim())&&!fx(e))l(ax(e),t);else if(V.isObject(e)&&V.isIterable(e)){let o={},c,d;for(const u of e){if(!V.isArray(u))throw new TypeError("Object iterator must return a key-value pair");o[d=u[0]]=(c=o[d])?V.isArray(c)?[...c,u[1]]:[c,u[1]]:u[1]}l(o,t)}else e!=null&&a(t,e,i);return this}get(e,t){if(e=yr(e),e){const i=V.findKey(this,e);if(i){const s=this[i];if(!t)return s;if(t===!0)return hx(s);if(V.isFunction(t))return t.call(this,s,i);if(V.isRegExp(t))return t.exec(s);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,t){if(e=yr(e),e){const i=V.findKey(this,e);return!!(i&&this[i]!==void 0&&(!t||Ia(this,this[i],i,t)))}return!1}delete(e,t){const i=this;let s=!1;function a(l){if(l=yr(l),l){const o=V.findKey(i,l);o&&(!t||Ia(i,i[o],o,t))&&(delete i[o],s=!0)}}return V.isArray(e)?e.forEach(a):a(e),s}clear(e){const t=Object.keys(this);let i=t.length,s=!1;for(;i--;){const a=t[i];(!e||Ia(this,this[a],a,e,!0))&&(delete this[a],s=!0)}return s}normalize(e){const t=this,i={};return V.forEach(this,(s,a)=>{const l=V.findKey(i,a);if(l){t[l]=qs(s),delete t[a];return}const o=e?px(a):String(a).trim();o!==a&&delete t[a],t[o]=qs(s),i[o]=!0}),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){const t=Object.create(null);return V.forEach(this,(i,s)=>{i!=null&&i!==!1&&(t[s]=e&&V.isArray(i)?i.join(", "):i)}),t}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([e,t])=>e+": "+t).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e,...t){const i=new this(e);return t.forEach(s=>i.set(s)),i}static accessor(e){const i=(this[Jl]=this[Jl]={accessors:{}}).accessors,s=this.prototype;function a(l){const o=yr(l);i[o]||(mx(s,l),i[o]=!0)}return V.isArray(e)?e.forEach(a):a(e),this}};Gt.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);V.reduceDescriptors(Gt.prototype,({value:n},e)=>{let t=e[0].toUpperCase()+e.slice(1);return{get:()=>n,set(i){this[t]=i}}});V.freezeMethods(Gt);const gx="[REDACTED ****]";function xx(n){if(V.hasOwnProp(n,"toJSON"))return!0;let e=Object.getPrototypeOf(n);for(;e&&e!==Object.prototype;){if(V.hasOwnProp(e,"toJSON"))return!0;e=Object.getPrototypeOf(e)}return!1}function vx(n,e){const t=new Set(e.map(a=>String(a).toLowerCase())),i=[],s=a=>{if(a===null||typeof a!="object"||V.isBuffer(a))return a;if(i.indexOf(a)!==-1)return;a instanceof Gt&&(a=a.toJSON()),i.push(a);let l;if(V.isArray(a))l=[],a.forEach((o,c)=>{const d=s(o);V.isUndefined(d)||(l[c]=d)});else{if(!V.isPlainObject(a)&&xx(a))return i.pop(),a;l=Object.create(null);for(const[o,c]of Object.entries(a)){const d=t.has(o.toLowerCase())?gx:s(c);V.isUndefined(d)||(l[o]=d)}}return i.pop(),l};return s(n)}let Ce=class ch extends Error{static from(e,t,i,s,a,l){const o=new ch(e.message,t||e.code,i,s,a);return o.cause=e,o.name=e.name,e.status!=null&&o.status==null&&(o.status=e.status),l&&Object.assign(o,l),o}constructor(e,t,i,s,a){super(e),Object.defineProperty(this,"message",{__proto__:null,value:e,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,t&&(this.code=t),i&&(this.config=i),s&&(this.request=s),a&&(this.response=a,this.status=a.status)}toJSON(){const e=this.config,t=e&&V.hasOwnProp(e,"redact")?e.redact:void 0,i=V.isArray(t)&&t.length>0?vx(e,t):V.toJSONObject(e);return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:i,code:this.code,status:this.status}}};Ce.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";Ce.ERR_BAD_OPTION="ERR_BAD_OPTION";Ce.ECONNABORTED="ECONNABORTED";Ce.ETIMEDOUT="ETIMEDOUT";Ce.ECONNREFUSED="ECONNREFUSED";Ce.ERR_NETWORK="ERR_NETWORK";Ce.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";Ce.ERR_DEPRECATED="ERR_DEPRECATED";Ce.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";Ce.ERR_BAD_REQUEST="ERR_BAD_REQUEST";Ce.ERR_CANCELED="ERR_CANCELED";Ce.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";Ce.ERR_INVALID_URL="ERR_INVALID_URL";Ce.ERR_FORM_DATA_DEPTH_EXCEEDED="ERR_FORM_DATA_DEPTH_EXCEEDED";const yx=null;function Fo(n){return V.isPlainObject(n)||V.isArray(n)}function dh(n){return V.endsWith(n,"[]")?n.slice(0,-2):n}function Ua(n,e,t){return n?n.concat(e).map(function(s,a){return s=dh(s),!t&&a?"["+s+"]":s}).join(t?".":""):e}function _x(n){return V.isArray(n)&&!n.some(Fo)}const bx=V.toFlatObject(V,{},null,function(e){return/^is[A-Z]/.test(e)});function ba(n,e,t){if(!V.isObject(n))throw new TypeError("target must be an object");e=e||new FormData,t=V.toFlatObject(t,{metaTokens:!0,dots:!1,indexes:!1},!1,function(m,h){return!V.isUndefined(h[m])});const i=t.metaTokens,s=t.visitor||f,a=t.dots,l=t.indexes,o=t.Blob||typeof Blob<"u"&&Blob,c=t.maxDepth===void 0?100:t.maxDepth,d=o&&V.isSpecCompliantForm(e);if(!V.isFunction(s))throw new TypeError("visitor must be a function");function u(g){if(g===null)return"";if(V.isDate(g))return g.toISOString();if(V.isBoolean(g))return g.toString();if(!d&&V.isBlob(g))throw new Ce("Blob is not supported. Use a Buffer instead.");return V.isArrayBuffer(g)||V.isTypedArray(g)?d&&typeof Blob=="function"?new Blob([g]):Buffer.from(g):g}function f(g,m,h){let b=g;if(V.isReactNative(e)&&V.isReactNativeBlob(g))return e.append(Ua(h,m,a),u(g)),!1;if(g&&!h&&typeof g=="object"){if(V.endsWith(m,"{}"))m=i?m:m.slice(0,-2),g=JSON.stringify(g);else if(V.isArray(g)&&_x(g)||(V.isFileList(g)||V.endsWith(m,"[]"))&&(b=V.toArray(g)))return m=dh(m),b.forEach(function(E,_){!(V.isUndefined(E)||E===null)&&e.append(l===!0?Ua([m],_,a):l===null?m:m+"[]",u(E))}),!1}return Fo(g)?!0:(e.append(Ua(h,m,a),u(g)),!1)}const p=[],x=Object.assign(bx,{defaultVisitor:f,convertValue:u,isVisitable:Fo});function y(g,m,h=0){if(!V.isUndefined(g)){if(h>c)throw new Ce("Object is too deeply nested ("+h+" levels). Max depth: "+c,Ce.ERR_FORM_DATA_DEPTH_EXCEEDED);if(p.indexOf(g)!==-1)throw new Error("Circular reference detected in "+m.join("."));p.push(g),V.forEach(g,function(v,E){(!(V.isUndefined(v)||v===null)&&s.call(e,v,V.isString(E)?E.trim():E,m,x))===!0&&y(v,m?m.concat(E):[E],h+1)}),p.pop()}}if(!V.isObject(n))throw new TypeError("data must be an object");return y(n),e}function Ql(n){const e={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+"};return encodeURIComponent(n).replace(/[!'()~]|%20/g,function(i){return e[i]})}function dl(n,e){this._pairs=[],n&&ba(n,this,e)}const uh=dl.prototype;uh.append=function(e,t){this._pairs.push([e,t])};uh.toString=function(e){const t=e?function(i){return e.call(this,i,Ql)}:Ql;return this._pairs.map(function(s){return t(s[0])+"="+t(s[1])},"").join("&")};function wx(n){return encodeURIComponent(n).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function hh(n,e,t){if(!e)return n;const i=t&&t.encode||wx,s=V.isFunction(t)?{serialize:t}:t,a=s&&s.serialize;let l;if(a?l=a(e,s):l=V.isURLSearchParams(e)?e.toString():new dl(e,s).toString(i),l){const o=n.indexOf("#");o!==-1&&(n=n.slice(0,o)),n+=(n.indexOf("?")===-1?"?":"&")+l}return n}class ec{constructor(){this.handlers=[]}use(e,t,i){return this.handlers.push({fulfilled:e,rejected:t,synchronous:i?i.synchronous:!1,runWhen:i?i.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(e){V.forEach(this.handlers,function(i){i!==null&&e(i)})}}const ul={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0,advertiseZstdAcceptEncoding:!1},Sx=typeof URLSearchParams<"u"?URLSearchParams:dl,Ex=typeof FormData<"u"?FormData:null,Mx=typeof Blob<"u"?Blob:null,Tx={isBrowser:!0,classes:{URLSearchParams:Sx,FormData:Ex,Blob:Mx},protocols:["http","https","file","blob","url","data"]},hl=typeof window<"u"&&typeof document<"u",Bo=typeof navigator=="object"&&navigator||void 0,Ax=hl&&(!Bo||["ReactNative","NativeScript","NS"].indexOf(Bo.product)<0),Rx=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",Cx=hl&&window.location.href||"http://localhost",Nx=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:hl,hasStandardBrowserEnv:Ax,hasStandardBrowserWebWorkerEnv:Rx,navigator:Bo,origin:Cx},Symbol.toStringTag,{value:"Module"})),Dt={...Nx,...Tx};function Px(n,e){return ba(n,new Dt.classes.URLSearchParams,{visitor:function(t,i,s,a){return Dt.isNode&&V.isBuffer(t)?(this.append(i,t.toString("base64")),!1):a.defaultVisitor.apply(this,arguments)},...e})}function Lx(n){return V.matchAll(/\w+|\[(\w*)]/g,n).map(e=>e[0]==="[]"?"":e[1]||e[0])}function jx(n){const e={},t=Object.keys(n);let i;const s=t.length;let a;for(i=0;i<s;i++)a=t[i],e[a]=n[a];return e}function fh(n){function e(t,i,s,a){let l=t[a++];if(l==="__proto__")return!0;const o=Number.isFinite(+l),c=a>=t.length;return l=!l&&V.isArray(s)?s.length:l,c?(V.hasOwnProp(s,l)?s[l]=V.isArray(s[l])?s[l].concat(i):[s[l],i]:s[l]=i,!o):((!V.hasOwnProp(s,l)||!V.isObject(s[l]))&&(s[l]=[]),e(t,i,s[l],a)&&V.isArray(s[l])&&(s[l]=jx(s[l])),!o)}if(V.isFormData(n)&&V.isFunction(n.entries)){const t={};return V.forEachEntry(n,(i,s)=>{e(Lx(i),s,t,0)}),t}return null}const Pi=(n,e)=>n!=null&&V.hasOwnProp(n,e)?n[e]:void 0;function Dx(n,e,t){if(V.isString(n))try{return(e||JSON.parse)(n),V.trim(n)}catch(i){if(i.name!=="SyntaxError")throw i}return(t||JSON.stringify)(n)}const Wr={transitional:ul,adapter:["xhr","http","fetch"],transformRequest:[function(e,t){const i=t.getContentType()||"",s=i.indexOf("application/json")>-1,a=V.isObject(e);if(a&&V.isHTMLForm(e)&&(e=new FormData(e)),V.isFormData(e))return s?JSON.stringify(fh(e)):e;if(V.isArrayBuffer(e)||V.isBuffer(e)||V.isStream(e)||V.isFile(e)||V.isBlob(e)||V.isReadableStream(e))return e;if(V.isArrayBufferView(e))return e.buffer;if(V.isURLSearchParams(e))return t.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let o;if(a){const c=Pi(this,"formSerializer");if(i.indexOf("application/x-www-form-urlencoded")>-1)return Px(e,c).toString();if((o=V.isFileList(e))||i.indexOf("multipart/form-data")>-1){const d=Pi(this,"env"),u=d&&d.FormData;return ba(o?{"files[]":e}:e,u&&new u,c)}}return a||s?(t.setContentType("application/json",!1),Dx(e)):e}],transformResponse:[function(e){const t=Pi(this,"transitional")||Wr.transitional,i=t&&t.forcedJSONParsing,s=Pi(this,"responseType"),a=s==="json";if(V.isResponse(e)||V.isReadableStream(e))return e;if(e&&V.isString(e)&&(i&&!s||a)){const o=!(t&&t.silentJSONParsing)&&a;try{return JSON.parse(e,Pi(this,"parseReviver"))}catch(c){if(o)throw c.name==="SyntaxError"?Ce.from(c,Ce.ERR_BAD_RESPONSE,this,null,Pi(this,"response")):c}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:Dt.classes.FormData,Blob:Dt.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};V.forEach(["delete","get","head","post","put","patch","query"],n=>{Wr.headers[n]={}});function Oa(n,e){const t=this||Wr,i=e||t,s=Gt.from(i.headers);let a=i.data;return V.forEach(n,function(o){a=o.call(t,a,s.normalize(),e?e.status:void 0)}),s.normalize(),a}function ph(n){return!!(n&&n.__CANCEL__)}let Xr=class extends Ce{constructor(e,t,i){super(e??"canceled",Ce.ERR_CANCELED,t,i),this.name="CanceledError",this.__CANCEL__=!0}};function mh(n,e,t){const i=t.config.validateStatus;!t.status||!i||i(t.status)?n(t):e(new Ce("Request failed with status code "+t.status,t.status>=400&&t.status<500?Ce.ERR_BAD_REQUEST:Ce.ERR_BAD_RESPONSE,t.config,t.request,t))}function Ix(n){const e=/^([-+\w]{1,25}):(?:\/\/)?/.exec(n);return e&&e[1]||""}function Ux(n,e){n=n||10;const t=new Array(n),i=new Array(n);let s=0,a=0,l;return e=e!==void 0?e:1e3,function(c){const d=Date.now(),u=i[a];l||(l=d),t[s]=c,i[s]=d;let f=a,p=0;for(;f!==s;)p+=t[f++],f=f%n;if(s=(s+1)%n,s===a&&(a=(a+1)%n),d-l<e)return;const x=u&&d-u;return x?Math.round(p*1e3/x):void 0}}function Ox(n,e){let t=0,i=1e3/e,s,a;const l=(d,u=Date.now())=>{t=u,s=null,a&&(clearTimeout(a),a=null),n(...d)};return[(...d)=>{const u=Date.now(),f=u-t;f>=i?l(d,u):(s=d,a||(a=setTimeout(()=>{a=null,l(s)},i-f)))},()=>s&&l(s)]}const ta=(n,e,t=3)=>{let i=0;const s=Ux(50,250);return Ox(a=>{if(!a||typeof a.loaded!="number")return;const l=a.loaded,o=a.lengthComputable?a.total:void 0,c=o!=null?Math.min(l,o):l,d=Math.max(0,c-i),u=s(d);i=Math.max(i,c);const f={loaded:c,total:o,progress:o?c/o:void 0,bytes:d,rate:u||void 0,estimated:u&&o?(o-c)/u:void 0,event:a,lengthComputable:o!=null,[e?"download":"upload"]:!0};n(f)},t)},tc=(n,e)=>{const t=n!=null;return[i=>e[0]({lengthComputable:t,total:n,loaded:i}),e[1]]},nc=n=>(...e)=>V.asap(()=>n(...e)),kx=Dt.hasStandardBrowserEnv?((n,e)=>t=>(t=new URL(t,Dt.origin),n.protocol===t.protocol&&n.host===t.host&&(e||n.port===t.port)))(new URL(Dt.origin),Dt.navigator&&/(msie|trident)/i.test(Dt.navigator.userAgent)):()=>!0,Fx=Dt.hasStandardBrowserEnv?{write(n,e,t,i,s,a,l){if(typeof document>"u")return;const o=[`${n}=${encodeURIComponent(e)}`];V.isNumber(t)&&o.push(`expires=${new Date(t).toUTCString()}`),V.isString(i)&&o.push(`path=${i}`),V.isString(s)&&o.push(`domain=${s}`),a===!0&&o.push("secure"),V.isString(l)&&o.push(`SameSite=${l}`),document.cookie=o.join("; ")},read(n){if(typeof document>"u")return null;const e=document.cookie.split(";");for(let t=0;t<e.length;t++){const i=e[t].replace(/^\s+/,""),s=i.indexOf("=");if(s!==-1&&i.slice(0,s)===n)return decodeURIComponent(i.slice(s+1))}return null},remove(n){this.write(n,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function Bx(n){return typeof n!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(n)}function zx(n,e){return e?n.replace(/\/?\/$/,"")+"/"+e.replace(/^\/+/,""):n}function gh(n,e,t){let i=!Bx(e);return n&&(i||t===!1)?zx(n,e):e}const ic=n=>n instanceof Gt?{...n}:n;function Ti(n,e){e=e||{};const t=Object.create(null);Object.defineProperty(t,"hasOwnProperty",{__proto__:null,value:Object.prototype.hasOwnProperty,enumerable:!1,writable:!0,configurable:!0});function i(d,u,f,p){return V.isPlainObject(d)&&V.isPlainObject(u)?V.merge.call({caseless:p},d,u):V.isPlainObject(u)?V.merge({},u):V.isArray(u)?u.slice():u}function s(d,u,f,p){if(V.isUndefined(u)){if(!V.isUndefined(d))return i(void 0,d,f,p)}else return i(d,u,f,p)}function a(d,u){if(!V.isUndefined(u))return i(void 0,u)}function l(d,u){if(V.isUndefined(u)){if(!V.isUndefined(d))return i(void 0,d)}else return i(void 0,u)}function o(d,u,f){if(V.hasOwnProp(e,f))return i(d,u);if(V.hasOwnProp(n,f))return i(void 0,d)}const c={url:a,method:a,data:a,baseURL:l,transformRequest:l,transformResponse:l,paramsSerializer:l,timeout:l,timeoutMessage:l,withCredentials:l,withXSRFToken:l,adapter:l,responseType:l,xsrfCookieName:l,xsrfHeaderName:l,onUploadProgress:l,onDownloadProgress:l,decompress:l,maxContentLength:l,maxBodyLength:l,beforeRedirect:l,transport:l,httpAgent:l,httpsAgent:l,cancelToken:l,socketPath:l,allowedSocketPaths:l,responseEncoding:l,validateStatus:o,headers:(d,u,f)=>s(ic(d),ic(u),f,!0)};return V.forEach(Object.keys({...n,...e}),function(u){if(u==="__proto__"||u==="constructor"||u==="prototype")return;const f=V.hasOwnProp(c,u)?c[u]:s,p=V.hasOwnProp(n,u)?n[u]:void 0,x=V.hasOwnProp(e,u)?e[u]:void 0,y=f(p,x,u);V.isUndefined(y)&&f!==o||(t[u]=y)}),t}const Hx=["content-type","content-length"];function Gx(n,e,t){if(t!=="content-only"){n.set(e);return}Object.entries(e).forEach(([i,s])=>{Hx.includes(i.toLowerCase())&&n.set(i,s)})}const Vx=n=>encodeURIComponent(n).replace(/%([0-9A-F]{2})/gi,(e,t)=>String.fromCharCode(parseInt(t,16)));function xh(n){const e=Ti({},n),t=p=>V.hasOwnProp(e,p)?e[p]:void 0,i=t("data");let s=t("withXSRFToken");const a=t("xsrfHeaderName"),l=t("xsrfCookieName");let o=t("headers");const c=t("auth"),d=t("baseURL"),u=t("allowAbsoluteUrls"),f=t("url");if(e.headers=o=Gt.from(o),e.url=hh(gh(d,f,u),t("params"),t("paramsSerializer")),c&&o.set("Authorization","Basic "+btoa((c.username||"")+":"+(c.password?Vx(c.password):""))),V.isFormData(i)&&(Dt.hasStandardBrowserEnv||Dt.hasStandardBrowserWebWorkerEnv||V.isReactNative(i)?o.setContentType(void 0):V.isFunction(i.getHeaders)&&Gx(o,i.getHeaders(),t("formDataHeaderPolicy"))),Dt.hasStandardBrowserEnv&&(V.isFunction(s)&&(s=s(e)),s===!0||s==null&&kx(e.url))){const x=a&&l&&Fx.read(l);x&&o.set(a,x)}return e}const Wx=typeof XMLHttpRequest<"u",Xx=Wx&&function(n){return new Promise(function(t,i){const s=xh(n);let a=s.data;const l=Gt.from(s.headers).normalize();let{responseType:o,onUploadProgress:c,onDownloadProgress:d}=s,u,f,p,x,y;function g(){x&&x(),y&&y(),s.cancelToken&&s.cancelToken.unsubscribe(u),s.signal&&s.signal.removeEventListener("abort",u)}let m=new XMLHttpRequest;m.open(s.method.toUpperCase(),s.url,!0),m.timeout=s.timeout;function h(){if(!m)return;const v=Gt.from("getAllResponseHeaders"in m&&m.getAllResponseHeaders()),_={data:!o||o==="text"||o==="json"?m.responseText:m.response,status:m.status,statusText:m.statusText,headers:v,config:n,request:m};mh(function(A){t(A),g()},function(A){i(A),g()},_),m=null}"onloadend"in m?m.onloadend=h:m.onreadystatechange=function(){!m||m.readyState!==4||m.status===0&&!(m.responseURL&&m.responseURL.startsWith("file:"))||setTimeout(h)},m.onabort=function(){m&&(i(new Ce("Request aborted",Ce.ECONNABORTED,n,m)),g(),m=null)},m.onerror=function(E){const _=E&&E.message?E.message:"Network Error",T=new Ce(_,Ce.ERR_NETWORK,n,m);T.event=E||null,i(T),g(),m=null},m.ontimeout=function(){let E=s.timeout?"timeout of "+s.timeout+"ms exceeded":"timeout exceeded";const _=s.transitional||ul;s.timeoutErrorMessage&&(E=s.timeoutErrorMessage),i(new Ce(E,_.clarifyTimeoutError?Ce.ETIMEDOUT:Ce.ECONNABORTED,n,m)),g(),m=null},a===void 0&&l.setContentType(null),"setRequestHeader"in m&&V.forEach(lh(l),function(E,_){m.setRequestHeader(_,E)}),V.isUndefined(s.withCredentials)||(m.withCredentials=!!s.withCredentials),o&&o!=="json"&&(m.responseType=s.responseType),d&&([p,y]=ta(d,!0),m.addEventListener("progress",p)),c&&m.upload&&([f,x]=ta(c),m.upload.addEventListener("progress",f),m.upload.addEventListener("loadend",x)),(s.cancelToken||s.signal)&&(u=v=>{m&&(i(!v||v.type?new Xr(null,n,m):v),m.abort(),g(),m=null)},s.cancelToken&&s.cancelToken.subscribe(u),s.signal&&(s.signal.aborted?u():s.signal.addEventListener("abort",u)));const b=Ix(s.url);if(b&&!Dt.protocols.includes(b)){i(new Ce("Unsupported protocol "+b+":",Ce.ERR_BAD_REQUEST,n));return}m.send(a||null)})},qx=(n,e)=>{if(n=n?n.filter(Boolean):[],!e&&!n.length)return;const t=new AbortController;let i=!1;const s=function(c){if(!i){i=!0,l();const d=c instanceof Error?c:this.reason;t.abort(d instanceof Ce?d:new Xr(d instanceof Error?d.message:d))}};let a=e&&setTimeout(()=>{a=null,s(new Ce(`timeout of ${e}ms exceeded`,Ce.ETIMEDOUT))},e);const l=()=>{n&&(a&&clearTimeout(a),a=null,n.forEach(c=>{c.unsubscribe?c.unsubscribe(s):c.removeEventListener("abort",s)}),n=null)};n.forEach(c=>c.addEventListener("abort",s));const{signal:o}=t;return o.unsubscribe=()=>V.asap(l),o},$x=function*(n,e){let t=n.byteLength;if(t<e){yield n;return}let i=0,s;for(;i<t;)s=i+e,yield n.slice(i,s),i=s},Yx=async function*(n,e){for await(const t of Kx(n))yield*$x(t,e)},Kx=async function*(n){if(n[Symbol.asyncIterator]){yield*n;return}const e=n.getReader();try{for(;;){const{done:t,value:i}=await e.read();if(t)break;yield i}}finally{await e.cancel()}},rc=(n,e,t,i)=>{const s=Yx(n,e);let a=0,l,o=c=>{l||(l=!0,i&&i(c))};return new ReadableStream({async pull(c){try{const{done:d,value:u}=await s.next();if(d){o(),c.close();return}let f=u.byteLength;if(t){let p=a+=f;t(p)}c.enqueue(new Uint8Array(u))}catch(d){throw o(d),d}},cancel(c){return o(c),s.return()}},{highWaterMark:2})};function Zx(n){if(!n||typeof n!="string"||!n.startsWith("data:"))return 0;const e=n.indexOf(",");if(e<0)return 0;const t=n.slice(5,e),i=n.slice(e+1);if(/;base64/i.test(t)){let l=i.length;const o=i.length;for(let x=0;x<o;x++)if(i.charCodeAt(x)===37&&x+2<o){const y=i.charCodeAt(x+1),g=i.charCodeAt(x+2);(y>=48&&y<=57||y>=65&&y<=70||y>=97&&y<=102)&&(g>=48&&g<=57||g>=65&&g<=70||g>=97&&g<=102)&&(l-=2,x+=2)}let c=0,d=o-1;const u=x=>x>=2&&i.charCodeAt(x-2)===37&&i.charCodeAt(x-1)===51&&(i.charCodeAt(x)===68||i.charCodeAt(x)===100);d>=0&&(i.charCodeAt(d)===61?(c++,d--):u(d)&&(c++,d-=3)),c===1&&d>=0&&(i.charCodeAt(d)===61||u(d))&&c++;const p=Math.floor(l/4)*3-(c||0);return p>0?p:0}if(typeof Buffer<"u"&&typeof Buffer.byteLength=="function")return Buffer.byteLength(i,"utf8");let a=0;for(let l=0,o=i.length;l<o;l++){const c=i.charCodeAt(l);if(c<128)a+=1;else if(c<2048)a+=2;else if(c>=55296&&c<=56319&&l+1<o){const d=i.charCodeAt(l+1);d>=56320&&d<=57343?(a+=4,l++):a+=3}else a+=3}return a}const fl="1.17.0",sc=64*1024,{isFunction:rs}=V,Jx=n=>encodeURIComponent(n).replace(/%([0-9A-F]{2})/gi,(e,t)=>String.fromCharCode(parseInt(t,16))),ac=n=>{if(!V.isString(n))return n;try{return decodeURIComponent(n)}catch{return n}},oc=(n,...e)=>{try{return!!n(...e)}catch{return!1}},Qx=n=>{const e=n.indexOf("://");let t=n;return e!==-1&&(t=t.slice(e+3)),t.includes("@")||t.includes(":")},e0=n=>{const e=V.global!==void 0&&V.global!==null?V.global:globalThis,{ReadableStream:t,TextEncoder:i}=e;n=V.merge.call({skipUndefined:!0},{Request:e.Request,Response:e.Response},n);const{fetch:s,Request:a,Response:l}=n,o=s?rs(s):typeof fetch=="function",c=rs(a),d=rs(l);if(!o)return!1;const u=o&&rs(t),f=o&&(typeof i=="function"?(h=>b=>h.encode(b))(new i):async h=>new Uint8Array(await new a(h).arrayBuffer())),p=c&&u&&oc(()=>{let h=!1;const b=new a(Dt.origin,{body:new t,method:"POST",get duplex(){return h=!0,"half"}}),v=b.headers.has("Content-Type");return b.body!=null&&b.body.cancel(),h&&!v}),x=d&&u&&oc(()=>V.isReadableStream(new l("").body)),y={stream:x&&(h=>h.body)};o&&["text","arrayBuffer","blob","formData","stream"].forEach(h=>{!y[h]&&(y[h]=(b,v)=>{let E=b&&b[h];if(E)return E.call(b);throw new Ce(`Response type '${h}' is not supported`,Ce.ERR_NOT_SUPPORT,v)})});const g=async h=>{if(h==null)return 0;if(V.isBlob(h))return h.size;if(V.isSpecCompliantForm(h))return(await new a(Dt.origin,{method:"POST",body:h}).arrayBuffer()).byteLength;if(V.isArrayBufferView(h)||V.isArrayBuffer(h))return h.byteLength;if(V.isURLSearchParams(h)&&(h=h+""),V.isString(h))return(await f(h)).byteLength},m=async(h,b)=>{const v=V.toFiniteNumber(h.getContentLength());return v??g(b)};return async h=>{let{url:b,method:v,data:E,signal:_,cancelToken:T,timeout:A,onDownloadProgress:L,onUploadProgress:w,responseType:M,headers:j,withCredentials:B="same-origin",fetchOptions:$,maxContentLength:P,maxBodyLength:z}=xh(h);const Z=V.isNumber(P)&&P>-1,Y=V.isNumber(z)&&z>-1,ae=H=>V.hasOwnProp(h,H)?h[H]:void 0;let J=s||fetch;M=M?(M+"").toLowerCase():"text";let ne=qx([_,T&&T.toAbortSignal()],A),N=null;const I=ne&&ne.unsubscribe&&(()=>{ne.unsubscribe()});let G;try{let H;const ie=ae("auth");if(ie){const oe=ie.username||"",U=ie.password||"";H={username:oe,password:U}}if(Qx(b)){const oe=new URL(b,Dt.origin);if(!H&&(oe.username||oe.password)){const U=ac(oe.username),Ze=ac(oe.password);H={username:U,password:Ze}}(oe.username||oe.password)&&(oe.username="",oe.password="",b=oe.href)}if(H&&(j.delete("authorization"),j.set("Authorization","Basic "+btoa(Jx((H.username||"")+":"+(H.password||""))))),Z&&typeof b=="string"&&b.startsWith("data:")&&Zx(b)>P)throw new Ce("maxContentLength size of "+P+" exceeded",Ce.ERR_BAD_RESPONSE,h,N);if(Y&&v!=="get"&&v!=="head"){const oe=await m(j,E);if(typeof oe=="number"&&isFinite(oe)&&oe>z)throw new Ce("Request body larger than maxBodyLength limit",Ce.ERR_BAD_REQUEST,h,N)}if(w&&p&&v!=="get"&&v!=="head"&&(G=await m(j,E))!==0){let oe=new a(b,{method:"POST",body:E,duplex:"half"}),U;if(V.isFormData(E)&&(U=oe.headers.get("content-type"))&&j.setContentType(U),oe.body){const[Ze,_e]=tc(G,ta(nc(w)));E=rc(oe.body,sc,Ze,_e)}}V.isString(B)||(B=B?"include":"omit");const F=c&&"credentials"in a.prototype;if(V.isFormData(E)){const oe=j.getContentType();oe&&/^multipart\/form-data/i.test(oe)&&!/boundary=/i.test(oe)&&j.delete("content-type")}j.set("User-Agent","axios/"+fl,!1);const ve={...$,signal:ne,method:v.toUpperCase(),headers:lh(j.normalize()),body:E,duplex:"half",credentials:F?B:void 0};N=c&&new a(b,ve);let Q=await(c?J(N,$):J(b,ve));if(Z){const oe=V.toFiniteNumber(Q.headers.get("content-length"));if(oe!=null&&oe>P)throw new Ce("maxContentLength size of "+P+" exceeded",Ce.ERR_BAD_RESPONSE,h,N)}const Ee=x&&(M==="stream"||M==="response");if(x&&Q.body&&(L||Z||Ee&&I)){const oe={};["status","statusText","headers"].forEach(Ne=>{oe[Ne]=Q[Ne]});const U=V.toFiniteNumber(Q.headers.get("content-length")),[Ze,_e]=L&&tc(U,ta(nc(L),!0))||[];let me=0;const Re=Ne=>{if(Z&&(me=Ne,me>P))throw new Ce("maxContentLength size of "+P+" exceeded",Ce.ERR_BAD_RESPONSE,h,N);Ze&&Ze(Ne)};Q=new l(rc(Q.body,sc,Re,()=>{_e&&_e(),I&&I()}),oe)}M=M||"text";let Te=await y[V.findKey(y,M)||"text"](Q,h);if(Z&&!x&&!Ee){let oe;if(Te!=null&&(typeof Te.byteLength=="number"?oe=Te.byteLength:typeof Te.size=="number"?oe=Te.size:typeof Te=="string"&&(oe=typeof i=="function"?new i().encode(Te).byteLength:Te.length)),typeof oe=="number"&&oe>P)throw new Ce("maxContentLength size of "+P+" exceeded",Ce.ERR_BAD_RESPONSE,h,N)}return!Ee&&I&&I(),await new Promise((oe,U)=>{mh(oe,U,{data:Te,headers:Gt.from(Q.headers),status:Q.status,statusText:Q.statusText,config:h,request:N})})}catch(H){if(I&&I(),ne&&ne.aborted&&ne.reason instanceof Ce){const ie=ne.reason;throw ie.config=h,N&&(ie.request=N),H!==ie&&(ie.cause=H),ie}throw H&&H.name==="TypeError"&&/Load failed|fetch/i.test(H.message)?Object.assign(new Ce("Network Error",Ce.ERR_NETWORK,h,N,H&&H.response),{cause:H.cause||H}):Ce.from(H,H&&H.code,h,N,H&&H.response)}}},t0=new Map,vh=n=>{let e=n&&n.env||{};const{fetch:t,Request:i,Response:s}=e,a=[i,s,t];let l=a.length,o=l,c,d,u=t0;for(;o--;)c=a[o],d=u.get(c),d===void 0&&u.set(c,d=o?new Map:e0(e)),u=d;return d};vh();const pl={http:yx,xhr:Xx,fetch:{get:vh}};V.forEach(pl,(n,e)=>{if(n){try{Object.defineProperty(n,"name",{__proto__:null,value:e})}catch{}Object.defineProperty(n,"adapterName",{__proto__:null,value:e})}});const lc=n=>`- ${n}`,n0=n=>V.isFunction(n)||n===null||n===!1;function i0(n,e){n=V.isArray(n)?n:[n];const{length:t}=n;let i,s;const a={};for(let l=0;l<t;l++){i=n[l];let o;if(s=i,!n0(i)&&(s=pl[(o=String(i)).toLowerCase()],s===void 0))throw new Ce(`Unknown adapter '${o}'`);if(s&&(V.isFunction(s)||(s=s.get(e))))break;a[o||"#"+l]=s}if(!s){const l=Object.entries(a).map(([c,d])=>`adapter ${c} `+(d===!1?"is not supported by the environment":"is not available in the build"));let o=t?l.length>1?`since :
`+l.map(lc).join(`
`):" "+lc(l[0]):"as no adapter specified";throw new Ce("There is no suitable adapter to dispatch the request "+o,"ERR_NOT_SUPPORT")}return s}const yh={getAdapter:i0,adapters:pl};function ka(n){if(n.cancelToken&&n.cancelToken.throwIfRequested(),n.signal&&n.signal.aborted)throw new Xr(null,n)}function cc(n){return ka(n),n.headers=Gt.from(n.headers),n.data=Oa.call(n,n.transformRequest),["post","put","patch"].indexOf(n.method)!==-1&&n.headers.setContentType("application/x-www-form-urlencoded",!1),yh.getAdapter(n.adapter||Wr.adapter,n)(n).then(function(i){ka(n),n.response=i;try{i.data=Oa.call(n,n.transformResponse,i)}finally{delete n.response}return i.headers=Gt.from(i.headers),i},function(i){if(!ph(i)&&(ka(n),i&&i.response)){n.response=i.response;try{i.response.data=Oa.call(n,n.transformResponse,i.response)}finally{delete n.response}i.response.headers=Gt.from(i.response.headers)}return Promise.reject(i)})}const wa={};["object","boolean","number","function","string","symbol"].forEach((n,e)=>{wa[n]=function(i){return typeof i===n||"a"+(e<1?"n ":" ")+n}});const dc={};wa.transitional=function(e,t,i){function s(a,l){return"[Axios v"+fl+"] Transitional option '"+a+"'"+l+(i?". "+i:"")}return(a,l,o)=>{if(e===!1)throw new Ce(s(l," has been removed"+(t?" in "+t:"")),Ce.ERR_DEPRECATED);return t&&!dc[l]&&(dc[l]=!0,console.warn(s(l," has been deprecated since v"+t+" and will be removed in the near future"))),e?e(a,l,o):!0}};wa.spelling=function(e){return(t,i)=>(console.warn(`${i} is likely a misspelling of ${e}`),!0)};function r0(n,e,t){if(typeof n!="object")throw new Ce("options must be an object",Ce.ERR_BAD_OPTION_VALUE);const i=Object.keys(n);let s=i.length;for(;s-- >0;){const a=i[s],l=Object.prototype.hasOwnProperty.call(e,a)?e[a]:void 0;if(l){const o=n[a],c=o===void 0||l(o,a,n);if(c!==!0)throw new Ce("option "+a+" must be "+c,Ce.ERR_BAD_OPTION_VALUE);continue}if(t!==!0)throw new Ce("Unknown option "+a,Ce.ERR_BAD_OPTION)}}const $s={assertOptions:r0,validators:wa},Wt=$s.validators;let bi=class{constructor(e){this.defaults=e||{},this.interceptors={request:new ec,response:new ec}}async request(e,t){try{return await this._request(e,t)}catch(i){if(i instanceof Error){let s={};Error.captureStackTrace?Error.captureStackTrace(s):s=new Error;const a=(()=>{if(!s.stack)return"";const l=s.stack.indexOf(`
`);return l===-1?"":s.stack.slice(l+1)})();try{if(!i.stack)i.stack=a;else if(a){const l=a.indexOf(`
`),o=l===-1?-1:a.indexOf(`
`,l+1),c=o===-1?"":a.slice(o+1);String(i.stack).endsWith(c)||(i.stack+=`
`+a)}}catch{}}throw i}}_request(e,t){typeof e=="string"?(t=t||{},t.url=e):t=e||{},t=Ti(this.defaults,t);const{transitional:i,paramsSerializer:s,headers:a}=t;i!==void 0&&$s.assertOptions(i,{silentJSONParsing:Wt.transitional(Wt.boolean),forcedJSONParsing:Wt.transitional(Wt.boolean),clarifyTimeoutError:Wt.transitional(Wt.boolean),legacyInterceptorReqResOrdering:Wt.transitional(Wt.boolean),advertiseZstdAcceptEncoding:Wt.transitional(Wt.boolean)},!1),s!=null&&(V.isFunction(s)?t.paramsSerializer={serialize:s}:$s.assertOptions(s,{encode:Wt.function,serialize:Wt.function},!0)),t.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?t.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:t.allowAbsoluteUrls=!0),$s.assertOptions(t,{baseUrl:Wt.spelling("baseURL"),withXsrfToken:Wt.spelling("withXSRFToken")},!0),t.method=(t.method||this.defaults.method||"get").toLowerCase();let l=a&&V.merge(a.common,a[t.method]);a&&V.forEach(["delete","get","head","post","put","patch","query","common"],y=>{delete a[y]}),t.headers=Gt.concat(l,a);const o=[];let c=!0;this.interceptors.request.forEach(function(g){if(typeof g.runWhen=="function"&&g.runWhen(t)===!1)return;c=c&&g.synchronous;const m=t.transitional||ul;m&&m.legacyInterceptorReqResOrdering?o.unshift(g.fulfilled,g.rejected):o.push(g.fulfilled,g.rejected)});const d=[];this.interceptors.response.forEach(function(g){d.push(g.fulfilled,g.rejected)});let u,f=0,p;if(!c){const y=[cc.bind(this),void 0];for(y.unshift(...o),y.push(...d),p=y.length,u=Promise.resolve(t);f<p;)u=u.then(y[f++],y[f++]);return u}p=o.length;let x=t;for(;f<p;){const y=o[f++],g=o[f++];try{x=y(x)}catch(m){g.call(this,m);break}}try{u=cc.call(this,x)}catch(y){return Promise.reject(y)}for(f=0,p=d.length;f<p;)u=u.then(d[f++],d[f++]);return u}getUri(e){e=Ti(this.defaults,e);const t=gh(e.baseURL,e.url,e.allowAbsoluteUrls);return hh(t,e.params,e.paramsSerializer)}};V.forEach(["delete","get","head","options"],function(e){bi.prototype[e]=function(t,i){return this.request(Ti(i||{},{method:e,url:t,data:(i||{}).data}))}});V.forEach(["post","put","patch","query"],function(e){function t(i){return function(a,l,o){return this.request(Ti(o||{},{method:e,headers:i?{"Content-Type":"multipart/form-data"}:{},url:a,data:l}))}}bi.prototype[e]=t(),e!=="query"&&(bi.prototype[e+"Form"]=t(!0))});let s0=class _h{constructor(e){if(typeof e!="function")throw new TypeError("executor must be a function.");let t;this.promise=new Promise(function(a){t=a});const i=this;this.promise.then(s=>{if(!i._listeners)return;let a=i._listeners.length;for(;a-- >0;)i._listeners[a](s);i._listeners=null}),this.promise.then=s=>{let a;const l=new Promise(o=>{i.subscribe(o),a=o}).then(s);return l.cancel=function(){i.unsubscribe(a)},l},e(function(a,l,o){i.reason||(i.reason=new Xr(a,l,o),t(i.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const t=this._listeners.indexOf(e);t!==-1&&this._listeners.splice(t,1)}toAbortSignal(){const e=new AbortController,t=i=>{e.abort(i)};return this.subscribe(t),e.signal.unsubscribe=()=>this.unsubscribe(t),e.signal}static source(){let e;return{token:new _h(function(s){e=s}),cancel:e}}};function a0(n){return function(t){return n.apply(null,t)}}function o0(n){return V.isObject(n)&&n.isAxiosError===!0}const zo={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(zo).forEach(([n,e])=>{zo[e]=n});function bh(n){const e=new bi(n),t=eh(bi.prototype.request,e);return V.extend(t,bi.prototype,e,{allOwnKeys:!0}),V.extend(t,e,null,{allOwnKeys:!0}),t.create=function(s){return bh(Ti(n,s))},t}const gt=bh(Wr);gt.Axios=bi;gt.CanceledError=Xr;gt.CancelToken=s0;gt.isCancel=ph;gt.VERSION=fl;gt.toFormData=ba;gt.AxiosError=Ce;gt.Cancel=gt.CanceledError;gt.all=function(e){return Promise.all(e)};gt.spread=a0;gt.isAxiosError=o0;gt.mergeConfig=Ti;gt.AxiosHeaders=Gt;gt.formToJSON=n=>fh(V.isHTMLForm(n)?new FormData(n):n);gt.getAdapter=yh.getAdapter;gt.HttpStatusCode=zo;gt.default=gt;const{Axios:VM,AxiosError:WM,CanceledError:XM,isCancel:qM,CancelToken:$M,VERSION:YM,all:KM,Cancel:ZM,isAxiosError:JM,spread:QM,toFormData:eT,AxiosHeaders:tT,HttpStatusCode:nT,formToJSON:iT,getAdapter:rT,mergeConfig:sT,create:aT}=gt,l0=({onLogin:n})=>{const[e,t]=O.useState(""),[i,s]=O.useState(""),[a,l]=O.useState(""),o=ha(),c=async d=>{d.preventDefault();try{const u=await gt.post("http://localhost:5000/api/auth/login",{email:e,password:i}),{token:f,...p}=u.data;localStorage.setItem("authToken",f),n(p),o("/")}catch(u){l(u.response?.data?.error||"Ошибка входа")}};return r.jsxs("div",{className:"max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-lg",children:[r.jsx("h2",{className:"text-2xl font-bold mb-4 text-center",children:"Вход в аккаунт"}),a&&r.jsx("p",{className:"text-red-500 text-center mb-4",children:a}),r.jsxs("form",{onSubmit:c,className:"space-y-4",children:[r.jsx("div",{children:r.jsx("input",{type:"email",placeholder:"Email",value:e,onChange:d=>t(d.target.value),className:"w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",required:!0})}),r.jsx("div",{children:r.jsx("input",{type:"password",placeholder:"Пароль",value:i,onChange:d=>s(d.target.value),className:"w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",required:!0})}),r.jsx("button",{type:"submit",className:"w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",children:"Войти"})]}),r.jsxs("p",{className:"mt-4 text-center",children:["Нет аккаунта?"," ",r.jsx("a",{href:"/register",className:"text-blue-500 hover:underline",children:"Зарегистрируйтесь"})]})]})},c0=({onRegister:n})=>{const[e,t]=O.useState(""),[i,s]=O.useState(""),[a,l]=O.useState(""),[o,c]=O.useState("user"),[d,u]=O.useState(""),f=ha(),p=async x=>{x.preventDefault();try{const y=await gt.post("http://localhost:5000/api/auth/register",{username:e,email:i,password:a,role:o}),{token:g,...m}=y.data;localStorage.setItem("authToken",g),n(m),f("/")}catch(y){u(y.response?.data?.error||"Ошибка регистрации")}};return r.jsxs("div",{className:"max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-lg",children:[r.jsx("h2",{className:"text-2xl font-bold mb-4 text-center",children:"Регистрация"}),d&&r.jsx("p",{className:"text-red-500 text-center mb-4",children:d}),r.jsxs("form",{onSubmit:p,className:"space-y-4",children:[r.jsx("div",{children:r.jsx("input",{type:"text",placeholder:"Имя пользователя",value:e,onChange:x=>t(x.target.value),className:"w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",required:!0})}),r.jsx("div",{children:r.jsx("input",{type:"email",placeholder:"Email",value:i,onChange:x=>s(x.target.value),className:"w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",required:!0})}),r.jsx("div",{children:r.jsx("input",{type:"password",placeholder:"Пароль",value:a,onChange:x=>l(x.target.value),className:"w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",required:!0})}),r.jsx("div",{children:r.jsxs("select",{value:o,onChange:x=>c(x.target.value),className:"w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white",children:[r.jsx("option",{value:"user",children:"Обычный пользователь"}),r.jsx("option",{value:"tour_guide",children:"Организатор туров"}),r.jsx("option",{value:"auction_participant",children:"Участник аукционов"})]})}),r.jsx("button",{type:"submit",className:"w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",children:"Зарегистрироваться"})]}),r.jsxs("p",{className:"mt-4 text-center",children:["Уже есть аккаунт?"," ",r.jsx("a",{href:"/login",className:"text-blue-500 hover:underline",children:"Войдите"})]})]})};var Fa={exports:{}},ct={};var uc;function d0(){if(uc)return ct;uc=1;var n=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),s=Symbol.for("react.profiler"),a=Symbol.for("react.consumer"),l=Symbol.for("react.context"),o=Symbol.for("react.forward_ref"),c=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),u=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),p=Symbol.for("react.view_transition"),x=Symbol.for("react.client.reference");function y(g){if(typeof g=="object"&&g!==null){var m=g.$$typeof;switch(m){case n:switch(g=g.type,g){case t:case s:case i:case c:case d:case p:return g;default:switch(g=g&&g.$$typeof,g){case l:case o:case f:case u:return g;case a:return g;default:return m}}case e:return m}}}return ct.ContextConsumer=a,ct.ContextProvider=l,ct.Element=n,ct.ForwardRef=o,ct.Fragment=t,ct.Lazy=f,ct.Memo=u,ct.Portal=e,ct.Profiler=s,ct.StrictMode=i,ct.Suspense=c,ct.SuspenseList=d,ct.isContextConsumer=function(g){return y(g)===a},ct.isContextProvider=function(g){return y(g)===l},ct.isElement=function(g){return typeof g=="object"&&g!==null&&g.$$typeof===n},ct.isForwardRef=function(g){return y(g)===o},ct.isFragment=function(g){return y(g)===t},ct.isLazy=function(g){return y(g)===f},ct.isMemo=function(g){return y(g)===u},ct.isPortal=function(g){return y(g)===e},ct.isProfiler=function(g){return y(g)===s},ct.isStrictMode=function(g){return y(g)===i},ct.isSuspense=function(g){return y(g)===c},ct.isSuspenseList=function(g){return y(g)===d},ct.isValidElementType=function(g){return typeof g=="string"||typeof g=="function"||g===t||g===s||g===i||g===c||g===d||typeof g=="object"&&g!==null&&(g.$$typeof===f||g.$$typeof===u||g.$$typeof===l||g.$$typeof===a||g.$$typeof===o||g.$$typeof===x||g.getModuleId!==void 0)},ct.typeOf=y,ct}var hc;function u0(){return hc||(hc=1,Fa.exports=d0()),Fa.exports}var wh=u0();function h0(n){function e(I,G,H,ie,F){for(var ve=0,Q=0,Ee=0,Te=0,oe,U,Ze=0,_e=0,me,Re=me=oe=0,Ne=0,Pe=0,Fe=0,ke=0,ht=H.length,xt=ht-1,C,S="",W="",he="",ce="",de;Ne<ht;){if(U=H.charCodeAt(Ne),Ne===xt&&Q+Te+Ee+ve!==0&&(Q!==0&&(U=Q===47?10:47),Te=Ee=ve=0,ht++,xt++),Q+Te+Ee+ve===0){if(Ne===xt&&(0<Pe&&(S=S.replace(p,"")),0<S.trim().length)){switch(U){case 32:case 9:case 59:case 13:case 10:break;default:S+=H.charAt(Ne)}U=59}switch(U){case 123:for(S=S.trim(),oe=S.charCodeAt(0),me=1,ke=++Ne;Ne<ht;){switch(U=H.charCodeAt(Ne)){case 123:me++;break;case 125:me--;break;case 47:switch(U=H.charCodeAt(Ne+1)){case 42:case 47:e:{for(Re=Ne+1;Re<xt;++Re)switch(H.charCodeAt(Re)){case 47:if(U===42&&H.charCodeAt(Re-1)===42&&Ne+2!==Re){Ne=Re+1;break e}break;case 10:if(U===47){Ne=Re+1;break e}}Ne=Re}}break;case 91:U++;case 40:U++;case 34:case 39:for(;Ne++<xt&&H.charCodeAt(Ne)!==U;);}if(me===0)break;Ne++}switch(me=H.substring(ke,Ne),oe===0&&(oe=(S=S.replace(f,"").trim()).charCodeAt(0)),oe){case 64:switch(0<Pe&&(S=S.replace(p,"")),U=S.charCodeAt(1),U){case 100:case 109:case 115:case 45:Pe=G;break;default:Pe=Z}if(me=e(G,Pe,me,U,F+1),ke=me.length,0<ae&&(Pe=t(Z,S,Fe),de=o(3,me,Pe,G,$,B,ke,U,F,ie),S=Pe.join(""),de!==void 0&&(ke=(me=de.trim()).length)===0&&(U=0,me="")),0<ke)switch(U){case 115:S=S.replace(T,l);case 100:case 109:case 45:me=S+"{"+me+"}";break;case 107:S=S.replace(b,"$1 $2"),me=S+"{"+me+"}",me=z===1||z===2&&a("@"+me,3)?"@-webkit-"+me+"@"+me:"@"+me;break;default:me=S+me,ie===112&&(me=(W+=me,""))}else me="";break;default:me=e(G,t(G,S,Fe),me,ie,F+1)}he+=me,me=Fe=Pe=Re=oe=0,S="",U=H.charCodeAt(++Ne);break;case 125:case 59:if(S=(0<Pe?S.replace(p,""):S).trim(),1<(ke=S.length))switch(Re===0&&(oe=S.charCodeAt(0),oe===45||96<oe&&123>oe)&&(ke=(S=S.replace(" ",":")).length),0<ae&&(de=o(1,S,G,I,$,B,W.length,ie,F,ie))!==void 0&&(ke=(S=de.trim()).length)===0&&(S="\0\0"),oe=S.charCodeAt(0),U=S.charCodeAt(1),oe){case 0:break;case 64:if(U===105||U===99){ce+=S+H.charAt(Ne);break}default:S.charCodeAt(ke-1)!==58&&(W+=s(S,oe,U,S.charCodeAt(2)))}Fe=Pe=Re=oe=0,S="",U=H.charCodeAt(++Ne)}}switch(U){case 13:case 10:Q===47?Q=0:1+oe===0&&ie!==107&&0<S.length&&(Pe=1,S+="\0"),0<ae*ne&&o(0,S,G,I,$,B,W.length,ie,F,ie),B=1,$++;break;case 59:case 125:if(Q+Te+Ee+ve===0){B++;break}default:switch(B++,C=H.charAt(Ne),U){case 9:case 32:if(Te+ve+Q===0)switch(Ze){case 44:case 58:case 9:case 32:C="";break;default:U!==32&&(C=" ")}break;case 0:C="\\0";break;case 12:C="\\f";break;case 11:C="\\v";break;case 38:Te+Q+ve===0&&(Pe=Fe=1,C="\f"+C);break;case 108:if(Te+Q+ve+P===0&&0<Re)switch(Ne-Re){case 2:Ze===112&&H.charCodeAt(Ne-3)===58&&(P=Ze);case 8:_e===111&&(P=_e)}break;case 58:Te+Q+ve===0&&(Re=Ne);break;case 44:Q+Ee+Te+ve===0&&(Pe=1,C+="\r");break;case 34:case 39:Q===0&&(Te=Te===U?0:Te===0?U:Te);break;case 91:Te+Q+Ee===0&&ve++;break;case 93:Te+Q+Ee===0&&ve--;break;case 41:Te+Q+ve===0&&Ee--;break;case 40:Te+Q+ve===0&&(oe===0&&(2*Ze+3*_e===533||(oe=1)),Ee++);break;case 64:Q+Ee+Te+ve+Re+me===0&&(me=1);break;case 42:case 47:if(!(0<Te+ve+Ee))switch(Q){case 0:switch(2*U+3*H.charCodeAt(Ne+1)){case 235:Q=47;break;case 220:ke=Ne,Q=42}break;case 42:U===47&&Ze===42&&ke+2!==Ne&&(H.charCodeAt(ke+2)===33&&(W+=H.substring(ke,Ne+1)),C="",Q=0)}}Q===0&&(S+=C)}_e=Ze,Ze=U,Ne++}if(ke=W.length,0<ke){if(Pe=G,0<ae&&(de=o(2,W,Pe,I,$,B,ke,ie,F,ie),de!==void 0&&(W=de).length===0))return ce+W+he;if(W=Pe.join(",")+"{"+W+"}",z*P!==0){switch(z!==2||a(W,2)||(P=0),P){case 111:W=W.replace(E,":-moz-$1")+W;break;case 112:W=W.replace(v,"::-webkit-input-$1")+W.replace(v,"::-moz-$1")+W.replace(v,":-ms-input-$1")+W}P=0}}return ce+W+he}function t(I,G,H){var ie=G.trim().split(m);G=ie;var F=ie.length,ve=I.length;switch(ve){case 0:case 1:var Q=0;for(I=ve===0?"":I[0]+" ";Q<F;++Q)G[Q]=i(I,G[Q],H).trim();break;default:var Ee=Q=0;for(G=[];Q<F;++Q)for(var Te=0;Te<ve;++Te)G[Ee++]=i(I[Te]+" ",ie[Q],H).trim()}return G}function i(I,G,H){var ie=G.charCodeAt(0);switch(33>ie&&(ie=(G=G.trim()).charCodeAt(0)),ie){case 38:return G.replace(h,"$1"+I.trim());case 58:return I.trim()+G.replace(h,"$1"+I.trim());default:if(0<1*H&&0<G.indexOf("\f"))return G.replace(h,(I.charCodeAt(0)===58?"":"$1")+I.trim())}return I+G}function s(I,G,H,ie){var F=I+";",ve=2*G+3*H+4*ie;if(ve===944){I=F.indexOf(":",9)+1;var Q=F.substring(I,F.length-1).trim();return Q=F.substring(0,I).trim()+Q+";",z===1||z===2&&a(Q,1)?"-webkit-"+Q+Q:Q}if(z===0||z===2&&!a(F,1))return F;switch(ve){case 1015:return F.charCodeAt(10)===97?"-webkit-"+F+F:F;case 951:return F.charCodeAt(3)===116?"-webkit-"+F+F:F;case 963:return F.charCodeAt(5)===110?"-webkit-"+F+F:F;case 1009:if(F.charCodeAt(4)!==100)break;case 969:case 942:return"-webkit-"+F+F;case 978:return"-webkit-"+F+"-moz-"+F+F;case 1019:case 983:return"-webkit-"+F+"-moz-"+F+"-ms-"+F+F;case 883:if(F.charCodeAt(8)===45)return"-webkit-"+F+F;if(0<F.indexOf("image-set(",11))return F.replace(j,"$1-webkit-$2")+F;break;case 932:if(F.charCodeAt(4)===45)switch(F.charCodeAt(5)){case 103:return"-webkit-box-"+F.replace("-grow","")+"-webkit-"+F+"-ms-"+F.replace("grow","positive")+F;case 115:return"-webkit-"+F+"-ms-"+F.replace("shrink","negative")+F;case 98:return"-webkit-"+F+"-ms-"+F.replace("basis","preferred-size")+F}return"-webkit-"+F+"-ms-"+F+F;case 964:return"-webkit-"+F+"-ms-flex-"+F+F;case 1023:if(F.charCodeAt(8)!==99)break;return Q=F.substring(F.indexOf(":",15)).replace("flex-","").replace("space-between","justify"),"-webkit-box-pack"+Q+"-webkit-"+F+"-ms-flex-pack"+Q+F;case 1005:return y.test(F)?F.replace(x,":-webkit-")+F.replace(x,":-moz-")+F:F;case 1e3:switch(Q=F.substring(13).trim(),G=Q.indexOf("-")+1,Q.charCodeAt(0)+Q.charCodeAt(G)){case 226:Q=F.replace(_,"tb");break;case 232:Q=F.replace(_,"tb-rl");break;case 220:Q=F.replace(_,"lr");break;default:return F}return"-webkit-"+F+"-ms-"+Q+F;case 1017:if(F.indexOf("sticky",9)===-1)break;case 975:switch(G=(F=I).length-10,Q=(F.charCodeAt(G)===33?F.substring(0,G):F).substring(I.indexOf(":",7)+1).trim(),ve=Q.charCodeAt(0)+(Q.charCodeAt(7)|0)){case 203:if(111>Q.charCodeAt(8))break;case 115:F=F.replace(Q,"-webkit-"+Q)+";"+F;break;case 207:case 102:F=F.replace(Q,"-webkit-"+(102<ve?"inline-":"")+"box")+";"+F.replace(Q,"-webkit-"+Q)+";"+F.replace(Q,"-ms-"+Q+"box")+";"+F}return F+";";case 938:if(F.charCodeAt(5)===45)switch(F.charCodeAt(6)){case 105:return Q=F.replace("-items",""),"-webkit-"+F+"-webkit-box-"+Q+"-ms-flex-"+Q+F;case 115:return"-webkit-"+F+"-ms-flex-item-"+F.replace(L,"")+F;default:return"-webkit-"+F+"-ms-flex-line-pack"+F.replace("align-content","").replace(L,"")+F}break;case 973:case 989:if(F.charCodeAt(3)!==45||F.charCodeAt(4)===122)break;case 931:case 953:if(M.test(I)===!0)return(Q=I.substring(I.indexOf(":")+1)).charCodeAt(0)===115?s(I.replace("stretch","fill-available"),G,H,ie).replace(":fill-available",":stretch"):F.replace(Q,"-webkit-"+Q)+F.replace(Q,"-moz-"+Q.replace("fill-",""))+F;break;case 962:if(F="-webkit-"+F+(F.charCodeAt(5)===102?"-ms-"+F:"")+F,H+ie===211&&F.charCodeAt(13)===105&&0<F.indexOf("transform",10))return F.substring(0,F.indexOf(";",27)+1).replace(g,"$1-webkit-$2")+F}return F}function a(I,G){var H=I.indexOf(G===1?":":"{"),ie=I.substring(0,G!==3?H:10);return H=I.substring(H+1,I.length-1),J(G!==2?ie:ie.replace(w,"$1"),H,G)}function l(I,G){var H=s(G,G.charCodeAt(0),G.charCodeAt(1),G.charCodeAt(2));return H!==G+";"?H.replace(A," or ($1)").substring(4):"("+G+")"}function o(I,G,H,ie,F,ve,Q,Ee,Te,oe){for(var U=0,Ze=G,_e;U<ae;++U)switch(_e=Y[U].call(u,I,Ze,H,ie,F,ve,Q,Ee,Te,oe)){case void 0:case!1:case!0:case null:break;default:Ze=_e}if(Ze!==G)return Ze}function c(I){switch(I){case void 0:case null:ae=Y.length=0;break;default:if(typeof I=="function")Y[ae++]=I;else if(typeof I=="object")for(var G=0,H=I.length;G<H;++G)c(I[G]);else ne=!!I|0}return c}function d(I){return I=I.prefix,I!==void 0&&(J=null,I?typeof I!="function"?z=1:(z=2,J=I):z=0),d}function u(I,G){var H=I;if(33>H.charCodeAt(0)&&(H=H.trim()),N=H,H=[N],0<ae){var ie=o(-1,G,H,H,$,B,0,0,0,0);ie!==void 0&&typeof ie=="string"&&(G=ie)}var F=e(Z,H,G,0,0);return 0<ae&&(ie=o(-2,F,H,H,$,B,F.length,0,0,0),ie!==void 0&&(F=ie)),N="",P=0,B=$=1,F}var f=/^\0+/g,p=/[\0\r\f]/g,x=/: */g,y=/zoo|gra/,g=/([,: ])(transform)/g,m=/,\r+?/g,h=/([\t\r\n ])*\f?&/g,b=/@(k\w+)\s*(\S*)\s*/,v=/::(place)/g,E=/:(read-only)/g,_=/[svh]\w+-[tblr]{2}/,T=/\(\s*(.*)\s*\)/g,A=/([\s\S]*?);/g,L=/-self|flex-/g,w=/[^]*?(:[rp][el]a[\w-]+)[^]*/,M=/stretch|:\s*\w+\-(?:conte|avail)/,j=/([^-])(image-set\()/,B=1,$=1,P=0,z=1,Z=[],Y=[],ae=0,J=null,ne=0,N="";return u.use=c,u.set=d,n!==void 0&&d(n),u}var f0={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function p0(n){var e=Object.create(null);return function(t){return e[t]===void 0&&(e[t]=n(t)),e[t]}}var m0=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,fc=p0(function(n){return m0.test(n)||n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)<91}),Ba={exports:{}},lt={};var pc;function g0(){if(pc)return lt;pc=1;var n=typeof Symbol=="function"&&Symbol.for,e=n?Symbol.for("react.element"):60103,t=n?Symbol.for("react.portal"):60106,i=n?Symbol.for("react.fragment"):60107,s=n?Symbol.for("react.strict_mode"):60108,a=n?Symbol.for("react.profiler"):60114,l=n?Symbol.for("react.provider"):60109,o=n?Symbol.for("react.context"):60110,c=n?Symbol.for("react.async_mode"):60111,d=n?Symbol.for("react.concurrent_mode"):60111,u=n?Symbol.for("react.forward_ref"):60112,f=n?Symbol.for("react.suspense"):60113,p=n?Symbol.for("react.suspense_list"):60120,x=n?Symbol.for("react.memo"):60115,y=n?Symbol.for("react.lazy"):60116,g=n?Symbol.for("react.block"):60121,m=n?Symbol.for("react.fundamental"):60117,h=n?Symbol.for("react.responder"):60118,b=n?Symbol.for("react.scope"):60119;function v(_){if(typeof _=="object"&&_!==null){var T=_.$$typeof;switch(T){case e:switch(_=_.type,_){case c:case d:case i:case a:case s:case f:return _;default:switch(_=_&&_.$$typeof,_){case o:case u:case y:case x:case l:return _;default:return T}}case t:return T}}}function E(_){return v(_)===d}return lt.AsyncMode=c,lt.ConcurrentMode=d,lt.ContextConsumer=o,lt.ContextProvider=l,lt.Element=e,lt.ForwardRef=u,lt.Fragment=i,lt.Lazy=y,lt.Memo=x,lt.Portal=t,lt.Profiler=a,lt.StrictMode=s,lt.Suspense=f,lt.isAsyncMode=function(_){return E(_)||v(_)===c},lt.isConcurrentMode=E,lt.isContextConsumer=function(_){return v(_)===o},lt.isContextProvider=function(_){return v(_)===l},lt.isElement=function(_){return typeof _=="object"&&_!==null&&_.$$typeof===e},lt.isForwardRef=function(_){return v(_)===u},lt.isFragment=function(_){return v(_)===i},lt.isLazy=function(_){return v(_)===y},lt.isMemo=function(_){return v(_)===x},lt.isPortal=function(_){return v(_)===t},lt.isProfiler=function(_){return v(_)===a},lt.isStrictMode=function(_){return v(_)===s},lt.isSuspense=function(_){return v(_)===f},lt.isValidElementType=function(_){return typeof _=="string"||typeof _=="function"||_===i||_===d||_===a||_===s||_===f||_===p||typeof _=="object"&&_!==null&&(_.$$typeof===y||_.$$typeof===x||_.$$typeof===l||_.$$typeof===o||_.$$typeof===u||_.$$typeof===m||_.$$typeof===h||_.$$typeof===b||_.$$typeof===g)},lt.typeOf=v,lt}var mc;function x0(){return mc||(mc=1,Ba.exports=g0()),Ba.exports}var za,gc;function v0(){if(gc)return za;gc=1;var n=x0(),e={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},t={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},i={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},s={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},a={};a[n.ForwardRef]=i,a[n.Memo]=s;function l(y){return n.isMemo(y)?s:a[y.$$typeof]||e}var o=Object.defineProperty,c=Object.getOwnPropertyNames,d=Object.getOwnPropertySymbols,u=Object.getOwnPropertyDescriptor,f=Object.getPrototypeOf,p=Object.prototype;function x(y,g,m){if(typeof g!="string"){if(p){var h=f(g);h&&h!==p&&x(y,h,m)}var b=c(g);d&&(b=b.concat(d(g)));for(var v=l(y),E=l(g),_=0;_<b.length;++_){var T=b[_];if(!t[T]&&!(m&&m[T])&&!(E&&E[T])&&!(v&&v[T])){var A=u(g,T);try{o(y,T,A)}catch{}}}}return y}return za=x,za}var y0=v0();const _0=vu(y0);var an={};function kn(){return(kn=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(n[i]=t[i])}return n}).apply(this,arguments)}var xc=function(n,e){for(var t=[n[0]],i=0,s=e.length;i<s;i+=1)t.push(e[i],n[i+1]);return t},Ho=function(n){return n!==null&&typeof n=="object"&&(n.toString?n.toString():Object.prototype.toString.call(n))==="[object Object]"&&!wh.typeOf(n)},na=Object.freeze([]),ti=Object.freeze({});function kr(n){return typeof n=="function"}function vc(n){return n.displayName||n.name||"Component"}function ml(n){return n&&typeof n.styledComponentId=="string"}var rr=typeof process<"u"&&an!==void 0&&(an.REACT_APP_SC_ATTR||an.SC_ATTR)||"data-styled",gl=typeof window<"u"&&"HTMLElement"in window,b0=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&an!==void 0&&(an.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&an.REACT_APP_SC_DISABLE_SPEEDY!==""?an.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&an.REACT_APP_SC_DISABLE_SPEEDY:an.SC_DISABLE_SPEEDY!==void 0&&an.SC_DISABLE_SPEEDY!==""&&an.SC_DISABLE_SPEEDY!=="false"&&an.SC_DISABLE_SPEEDY));function qr(n){for(var e=arguments.length,t=new Array(e>1?e-1:0),i=1;i<e;i++)t[i-1]=arguments[i];throw new Error("An error occurred. See https://git.io/JUIaE#"+n+" for more information."+(t.length>0?" Args: "+t.join(", "):""))}var w0=(function(){function n(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}var e=n.prototype;return e.indexOfGroup=function(t){for(var i=0,s=0;s<t;s++)i+=this.groupSizes[s];return i},e.insertRules=function(t,i){if(t>=this.groupSizes.length){for(var s=this.groupSizes,a=s.length,l=a;t>=l;)(l<<=1)<0&&qr(16,""+t);this.groupSizes=new Uint32Array(l),this.groupSizes.set(s),this.length=l;for(var o=a;o<l;o++)this.groupSizes[o]=0}for(var c=this.indexOfGroup(t+1),d=0,u=i.length;d<u;d++)this.tag.insertRule(c,i[d])&&(this.groupSizes[t]++,c++)},e.clearGroup=function(t){if(t<this.length){var i=this.groupSizes[t],s=this.indexOfGroup(t),a=s+i;this.groupSizes[t]=0;for(var l=s;l<a;l++)this.tag.deleteRule(s)}},e.getGroup=function(t){var i="";if(t>=this.length||this.groupSizes[t]===0)return i;for(var s=this.groupSizes[t],a=this.indexOfGroup(t),l=a+s,o=a;o<l;o++)i+=this.tag.getRule(o)+`/*!sc*/
`;return i},n})(),Ys=new Map,ia=new Map,Ir=1,ss=function(n){if(Ys.has(n))return Ys.get(n);for(;ia.has(Ir);)Ir++;var e=Ir++;return Ys.set(n,e),ia.set(e,n),e},S0=function(n){return ia.get(n)},E0=function(n,e){e>=Ir&&(Ir=e+1),Ys.set(n,e),ia.set(e,n)},M0="style["+rr+'][data-styled-version="5.3.11"]',T0=new RegExp("^"+rr+'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),A0=function(n,e,t){for(var i,s=t.split(","),a=0,l=s.length;a<l;a++)(i=s[a])&&n.registerName(e,i)},R0=function(n,e){for(var t=(e.textContent||"").split(`/*!sc*/
`),i=[],s=0,a=t.length;s<a;s++){var l=t[s].trim();if(l){var o=l.match(T0);if(o){var c=0|parseInt(o[1],10),d=o[2];c!==0&&(E0(d,c),A0(n,d,o[3]),n.getTag().insertRules(c,i)),i.length=0}else i.push(l)}}},C0=function(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null},Sh=function(n){var e=document.head,t=n||e,i=document.createElement("style"),s=(function(o){for(var c=o.childNodes,d=c.length;d>=0;d--){var u=c[d];if(u&&u.nodeType===1&&u.hasAttribute(rr))return u}})(t),a=s!==void 0?s.nextSibling:null;i.setAttribute(rr,"active"),i.setAttribute("data-styled-version","5.3.11");var l=C0();return l&&i.setAttribute("nonce",l),t.insertBefore(i,a),i},N0=(function(){function n(t){var i=this.element=Sh(t);i.appendChild(document.createTextNode("")),this.sheet=(function(s){if(s.sheet)return s.sheet;for(var a=document.styleSheets,l=0,o=a.length;l<o;l++){var c=a[l];if(c.ownerNode===s)return c}qr(17)})(i),this.length=0}var e=n.prototype;return e.insertRule=function(t,i){try{return this.sheet.insertRule(i,t),this.length++,!0}catch{return!1}},e.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.getRule=function(t){var i=this.sheet.cssRules[t];return i!==void 0&&typeof i.cssText=="string"?i.cssText:""},n})(),P0=(function(){function n(t){var i=this.element=Sh(t);this.nodes=i.childNodes,this.length=0}var e=n.prototype;return e.insertRule=function(t,i){if(t<=this.length&&t>=0){var s=document.createTextNode(i),a=this.nodes[t];return this.element.insertBefore(s,a||null),this.length++,!0}return!1},e.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},n})(),L0=(function(){function n(t){this.rules=[],this.length=0}var e=n.prototype;return e.insertRule=function(t,i){return t<=this.length&&(this.rules.splice(t,0,i),this.length++,!0)},e.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.getRule=function(t){return t<this.length?this.rules[t]:""},n})(),yc=gl,j0={isServer:!gl,useCSSOMInjection:!b0},Eh=(function(){function n(t,i,s){t===void 0&&(t=ti),i===void 0&&(i={}),this.options=kn({},j0,{},t),this.gs=i,this.names=new Map(s),this.server=!!t.isServer,!this.server&&gl&&yc&&(yc=!1,(function(a){for(var l=document.querySelectorAll(M0),o=0,c=l.length;o<c;o++){var d=l[o];d&&d.getAttribute(rr)!=="active"&&(R0(a,d),d.parentNode&&d.parentNode.removeChild(d))}})(this))}n.registerId=function(t){return ss(t)};var e=n.prototype;return e.reconstructWithOptions=function(t,i){return i===void 0&&(i=!0),new n(kn({},this.options,{},t),this.gs,i&&this.names||void 0)},e.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.getTag=function(){return this.tag||(this.tag=(s=(i=this.options).isServer,a=i.useCSSOMInjection,l=i.target,t=s?new L0(l):a?new N0(l):new P0(l),new w0(t)));var t,i,s,a,l},e.hasNameForId=function(t,i){return this.names.has(t)&&this.names.get(t).has(i)},e.registerName=function(t,i){if(ss(t),this.names.has(t))this.names.get(t).add(i);else{var s=new Set;s.add(i),this.names.set(t,s)}},e.insertRules=function(t,i,s){this.registerName(t,i),this.getTag().insertRules(ss(t),s)},e.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.clearRules=function(t){this.getTag().clearGroup(ss(t)),this.clearNames(t)},e.clearTag=function(){this.tag=void 0},e.toString=function(){return(function(t){for(var i=t.getTag(),s=i.length,a="",l=0;l<s;l++){var o=S0(l);if(o!==void 0){var c=t.names.get(o),d=i.getGroup(l);if(c&&d&&c.size){var u=rr+".g"+l+'[id="'+o+'"]',f="";c!==void 0&&c.forEach((function(p){p.length>0&&(f+=p+",")})),a+=""+d+u+'{content:"'+f+`"}/*!sc*/
`}}}return a})(this)},n})(),D0=/(a)(d)/gi,_c=function(n){return String.fromCharCode(n+(n>25?39:97))};function Go(n){var e,t="";for(e=Math.abs(n);e>52;e=e/52|0)t=_c(e%52)+t;return(_c(e%52)+t).replace(D0,"$1-$2")}var Zi=function(n,e){for(var t=e.length;t;)n=33*n^e.charCodeAt(--t);return n},Mh=function(n){return Zi(5381,n)};function I0(n){for(var e=0;e<n.length;e+=1){var t=n[e];if(kr(t)&&!ml(t))return!1}return!0}var U0=Mh("5.3.11"),O0=(function(){function n(e,t,i){this.rules=e,this.staticRulesId="",this.isStatic=(i===void 0||i.isStatic)&&I0(e),this.componentId=t,this.baseHash=Zi(U0,t),this.baseStyle=i,Eh.registerId(t)}return n.prototype.generateAndInjectStyles=function(e,t,i){var s=this.componentId,a=[];if(this.baseStyle&&a.push(this.baseStyle.generateAndInjectStyles(e,t,i)),this.isStatic&&!i.hash)if(this.staticRulesId&&t.hasNameForId(s,this.staticRulesId))a.push(this.staticRulesId);else{var l=sr(this.rules,e,t,i).join(""),o=Go(Zi(this.baseHash,l)>>>0);if(!t.hasNameForId(s,o)){var c=i(l,"."+o,void 0,s);t.insertRules(s,o,c)}a.push(o),this.staticRulesId=o}else{for(var d=this.rules.length,u=Zi(this.baseHash,i.hash),f="",p=0;p<d;p++){var x=this.rules[p];if(typeof x=="string")f+=x;else if(x){var y=sr(x,e,t,i),g=Array.isArray(y)?y.join(""):y;u=Zi(u,g+p),f+=g}}if(f){var m=Go(u>>>0);if(!t.hasNameForId(s,m)){var h=i(f,"."+m,void 0,s);t.insertRules(s,m,h)}a.push(m)}}return a.join(" ")},n})(),k0=/^\s*\/\/.*$/gm,F0=[":","[",".","#"];function B0(n){var e,t,i,s,a=ti,l=a.options,o=l===void 0?ti:l,c=a.plugins,d=c===void 0?na:c,u=new h0(o),f=[],p=(function(g){function m(h){if(h)try{g(h+"}")}catch{}}return function(h,b,v,E,_,T,A,L,w,M){switch(h){case 1:if(w===0&&b.charCodeAt(0)===64)return g(b+";"),"";break;case 2:if(L===0)return b+"/*|*/";break;case 3:switch(L){case 102:case 112:return g(v[0]+b),"";default:return b+(M===0?"/*|*/":"")}case-2:b.split("/*|*/}").forEach(m)}}})((function(g){f.push(g)})),x=function(g,m,h){return m===0&&F0.indexOf(h[t.length])!==-1||h.match(s)?g:"."+e};function y(g,m,h,b){b===void 0&&(b="&");var v=g.replace(k0,""),E=m&&h?h+" "+m+" { "+v+" }":v;return e=b,t=m,i=new RegExp("\\"+t+"\\b","g"),s=new RegExp("(\\"+t+"\\b){2,}"),u(h||!m?"":m,E)}return u.use([].concat(d,[function(g,m,h){g===2&&h.length&&h[0].lastIndexOf(t)>0&&(h[0]=h[0].replace(i,x))},p,function(g){if(g===-2){var m=f;return f=[],m}}])),y.hash=d.length?d.reduce((function(g,m){return m.name||qr(15),Zi(g,m.name)}),5381).toString():"",y}var Th=zr.createContext();Th.Consumer;var Ah=zr.createContext(),z0=(Ah.Consumer,new Eh),Vo=B0();function H0(){return O.useContext(Th)||z0}function G0(){return O.useContext(Ah)||Vo}var V0=(function(){function n(e,t){var i=this;this.inject=function(s,a){a===void 0&&(a=Vo);var l=i.name+a.hash;s.hasNameForId(i.id,l)||s.insertRules(i.id,l,a(i.rules,l,"@keyframes"))},this.toString=function(){return qr(12,String(i.name))},this.name=e,this.id="sc-keyframes-"+e,this.rules=t}return n.prototype.getName=function(e){return e===void 0&&(e=Vo),this.name+e.hash},n})(),W0=/([A-Z])/,X0=/([A-Z])/g,q0=/^ms-/,$0=function(n){return"-"+n.toLowerCase()};function bc(n){return W0.test(n)?n.replace(X0,$0).replace(q0,"-ms-"):n}var wc=function(n){return n==null||n===!1||n===""};function sr(n,e,t,i){if(Array.isArray(n)){for(var s,a=[],l=0,o=n.length;l<o;l+=1)(s=sr(n[l],e,t,i))!==""&&(Array.isArray(s)?a.push.apply(a,s):a.push(s));return a}if(wc(n))return"";if(ml(n))return"."+n.styledComponentId;if(kr(n)){if(typeof(d=n)!="function"||d.prototype&&d.prototype.isReactComponent||!e)return n;var c=n(e);return sr(c,e,t,i)}var d;return n instanceof V0?t?(n.inject(t,i),n.getName(i)):n:Ho(n)?(function u(f,p){var x,y,g=[];for(var m in f)f.hasOwnProperty(m)&&!wc(f[m])&&(Array.isArray(f[m])&&f[m].isCss||kr(f[m])?g.push(bc(m)+":",f[m],";"):Ho(f[m])?g.push.apply(g,u(f[m],m)):g.push(bc(m)+": "+(x=m,(y=f[m])==null||typeof y=="boolean"||y===""?"":typeof y!="number"||y===0||x in f0||x.startsWith("--")?String(y).trim():y+"px")+";"));return p?[p+" {"].concat(g,["}"]):g})(n):n.toString()}var Sc=function(n){return Array.isArray(n)&&(n.isCss=!0),n};function Y0(n){for(var e=arguments.length,t=new Array(e>1?e-1:0),i=1;i<e;i++)t[i-1]=arguments[i];return kr(n)||Ho(n)?Sc(sr(xc(na,[n].concat(t)))):t.length===0&&n.length===1&&typeof n[0]=="string"?n:Sc(sr(xc(n,t)))}var K0=function(n,e,t){return t===void 0&&(t=ti),n.theme!==t.theme&&n.theme||e||t.theme},Z0=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,J0=/(^-|-$)/g;function Ha(n){return n.replace(Z0,"-").replace(J0,"")}var Q0=function(n){return Go(Mh(n)>>>0)};function as(n){return typeof n=="string"&&!0}var Wo=function(n){return typeof n=="function"||typeof n=="object"&&n!==null&&!Array.isArray(n)},ev=function(n){return n!=="__proto__"&&n!=="constructor"&&n!=="prototype"};function tv(n,e,t){var i=n[t];Wo(e)&&Wo(i)?Rh(i,e):n[t]=e}function Rh(n){for(var e=arguments.length,t=new Array(e>1?e-1:0),i=1;i<e;i++)t[i-1]=arguments[i];for(var s=0,a=t;s<a.length;s++){var l=a[s];if(Wo(l))for(var o in l)ev(o)&&tv(n,l[o],o)}return n}var Ch=zr.createContext();Ch.Consumer;var Ga={};function Nh(n,e,t){var i=ml(n),s=!as(n),a=e.attrs,l=a===void 0?na:a,o=e.componentId,c=o===void 0?(function(b,v){var E=typeof b!="string"?"sc":Ha(b);Ga[E]=(Ga[E]||0)+1;var _=E+"-"+Q0("5.3.11"+E+Ga[E]);return v?v+"-"+_:_})(e.displayName,e.parentComponentId):o,d=e.displayName,u=d===void 0?(function(b){return as(b)?"styled."+b:"Styled("+vc(b)+")"})(n):d,f=e.displayName&&e.componentId?Ha(e.displayName)+"-"+e.componentId:e.componentId||c,p=i&&n.attrs?Array.prototype.concat(n.attrs,l).filter(Boolean):l,x=e.shouldForwardProp;i&&n.shouldForwardProp&&(x=e.shouldForwardProp?function(b,v,E){return n.shouldForwardProp(b,v,E)&&e.shouldForwardProp(b,v,E)}:n.shouldForwardProp);var y,g=new O0(t,f,i?n.componentStyle:void 0),m=g.isStatic&&l.length===0,h=function(b,v){return(function(E,_,T,A){var L=E.attrs,w=E.componentStyle,M=E.defaultProps,j=E.foldedComponentIds,B=E.shouldForwardProp,$=E.styledComponentId,P=E.target,z=(function(ie,F,ve){ie===void 0&&(ie=ti);var Q=kn({},F,{theme:ie}),Ee={};return ve.forEach((function(Te){var oe,U,Ze,_e=Te;for(oe in kr(_e)&&(_e=_e(Q)),_e)Q[oe]=Ee[oe]=oe==="className"?(U=Ee[oe],Ze=_e[oe],U&&Ze?U+" "+Ze:U||Ze):_e[oe]})),[Q,Ee]})(K0(_,O.useContext(Ch),M)||ti,_,L),Z=z[0],Y=z[1],ae=(function(ie,F,ve,Q){var Ee=H0(),Te=G0(),oe=F?ie.generateAndInjectStyles(ti,Ee,Te):ie.generateAndInjectStyles(ve,Ee,Te);return oe})(w,A,Z),J=T,ne=Y.$as||_.$as||Y.as||_.as||P,N=as(ne),I=Y!==_?kn({},_,{},Y):_,G={};for(var H in I)H[0]!=="$"&&H!=="as"&&(H==="forwardedAs"?G.as=I[H]:(B?B(H,fc,ne):!N||fc(H))&&(G[H]=I[H]));return _.style&&Y.style!==_.style&&(G.style=kn({},_.style,{},Y.style)),G.className=Array.prototype.concat(j,$,ae!==$?ae:null,_.className,Y.className).filter(Boolean).join(" "),G.ref=J,O.createElement(ne,G)})(y,b,v,m)};return h.displayName=u,(y=zr.forwardRef(h)).attrs=p,y.componentStyle=g,y.displayName=u,y.shouldForwardProp=x,y.foldedComponentIds=i?Array.prototype.concat(n.foldedComponentIds,n.styledComponentId):na,y.styledComponentId=f,y.target=i?n.target:n,y.withComponent=function(b){var v=e.componentId,E=(function(T,A){if(T==null)return{};var L,w,M={},j=Object.keys(T);for(w=0;w<j.length;w++)L=j[w],A.indexOf(L)>=0||(M[L]=T[L]);return M})(e,["componentId"]),_=v&&v+"-"+(as(b)?b:Ha(vc(b)));return Nh(b,kn({},E,{attrs:p,componentId:_}),t)},Object.defineProperty(y,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(b){this._foldedDefaultProps=i?Rh({},n.defaultProps,b):b}}),Object.defineProperty(y,"toString",{value:function(){return"."+y.styledComponentId}}),s&&_0(y,n,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0,withComponent:!0}),y}var se=function(n){return(function e(t,i,s){if(s===void 0&&(s=ti),!wh.isValidElementType(i))return qr(1,String(i));var a=function(){return t(i,s,Y0.apply(void 0,arguments))};return a.withConfig=function(l){return e(t,i,kn({},s,{},l))},a.attrs=function(l){return e(t,i,kn({},s,{attrs:Array.prototype.concat(s.attrs,l).filter(Boolean)}))},a})(Nh,n)};["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","textPath","tspan"].forEach((function(n){se[n]=se(n)}));const nv="http://localhost:5000/api",Ke=gt.create({baseURL:nv,timeout:1e4,headers:{"Content-Type":"application/json"}});Ke.interceptors.request.use(n=>{const e=localStorage.getItem("authToken");return e&&(n.headers.Authorization=`Bearer ${e}`),n},n=>Promise.reject(n));Ke.interceptors.response.use(n=>n,n=>(n.response?.status===401&&localStorage.removeItem("authToken"),Promise.reject(n)));const ra={async getAllArtworks(){return(await Ke.get("/artworks")).data},async getArtworkById(n){return(await Ke.get(`/artworks/${n}`)).data},async searchArtworks(n){return(await Ke.get(`/artworks/search/${encodeURIComponent(n)}`)).data},async filterArtworksByTags(n){return(await Ke.get(`/artworks/filter/${n.join(",")}`)).data},async createArtwork(n){return(await Ke.post("/artworks",n)).data},async updateArtwork(n,e){return(await Ke.put(`/artworks/${n}`,e)).data},async deleteArtwork(n){await Ke.delete(`/artworks/${n}`)},async getRecommendedArtworks(n){return(await Ke.get(`/artworks/recommendations${n?`?count=${n}`:""}`)).data},async getSimilarArtworks(n,e){return(await Ke.get(`/artworks/${n}/similar${e?`?count=${e}`:""}`)).data},async getArtworkAnalytics(n){return(await Ke.get(`/artworks/${n}/analytics`)).data}},Pr={async getAllGalleries(){return(await Ke.get("/galleries")).data},async getGalleryById(n){return(await Ke.get(`/galleries/${n}`)).data},async createGallery(n){return(await Ke.post("/galleries",n)).data},async updateGallery(n,e){return(await Ke.put(`/galleries/${n}`,e)).data},async deleteGallery(n){await Ke.delete(`/galleries/${n}`)},async getRooms(n){return(await Ke.get(`/galleries/${n}/rooms`)).data},async getRoomById(n){return(await Ke.get(`/rooms/${n}`)).data},async createRoom(n,e){return(await Ke.post(`/galleries/${n}/rooms`,e)).data},async updateRoom(n,e){return(await Ke.put(`/rooms/${n}`,e)).data},async deleteRoom(n){await Ke.delete(`/rooms/${n}`)},async getExhibitions(n){return(await Ke.get(`/galleries/${n}/exhibitions`)).data},async getExhibitionById(n){return(await Ke.get(`/exhibitions/${n}`)).data},async createExhibition(n,e){return(await Ke.post(`/galleries/${n}/exhibitions`,e)).data},async updateExhibition(n,e){return(await Ke.put(`/exhibitions/${n}`,e)).data},async deleteExhibition(n){await Ke.delete(`/exhibitions/${n}`)},async getVirtualTours(n){return(await Ke.get(`/galleries/${n}/virtual-tours`)).data},async getVirtualTourById(n){return(await Ke.get(`/virtual-tours/${n}`)).data},async createVirtualTour(n,e){return(await Ke.post(`/galleries/${n}/virtual-tours`,e)).data},async updateVirtualTour(n,e){return(await Ke.put(`/virtual-tours/${n}`,e)).data},async deleteVirtualTour(n){await Ke.delete(`/virtual-tours/${n}`)}};class iv{cache=new Map;maxSize;currentSize=0;constructor(e=100){this.maxSize=e*1024*1024}async loadImage(e){if(this.cache.has(e)){const t=this.cache.get(e);return t.timestamp=Date.now(),URL.createObjectURL(t.blob)}try{const t=await fetch(e);if(!t.ok)throw new Error(`Failed to load image: ${t.statusText}`);const i=await t.blob(),s=i.size;if(s>this.maxSize)return console.warn(`Image ${e} is too large to cache (${s} bytes)`),e;this.evictIfNeeded(s);const a={url:e,blob:i,timestamp:Date.now(),size:s};return this.cache.set(e,a),this.currentSize+=s,URL.createObjectURL(i)}catch(t){throw console.error(`Error loading image ${e}:`,t),t}}async loadImages(e){const t=e.map(i=>this.loadImage(i).catch(s=>s));return Promise.all(t)}removeFromCache(e){if(this.cache.has(e)){const t=this.cache.get(e);return this.cache.delete(e),this.currentSize-=t.size,!0}return!1}clearCache(){this.cache.forEach(e=>{URL.revokeObjectURL(URL.createObjectURL(e.blob))}),this.cache.clear(),this.currentSize=0}getCacheInfo(){return{size:this.currentSize,count:this.cache.size,maxSize:this.maxSize}}evictIfNeeded(e){for(;this.currentSize+e>this.maxSize&&this.cache.size>0;){let t=null,i=Number.MAX_SAFE_INTEGER;for(const[s,a]of this.cache)a.timestamp<i&&(i=a.timestamp,t=s);if(t){const s=this.cache.get(t);this.cache.delete(t),this.currentSize-=s.size,URL.revokeObjectURL(this.getUrlFromBlob(s.blob))}else break}}getUrlFromBlob(e){return""}async preloadImages(e,t){const i=e.length;let s=0;const a=e.map(async l=>{try{await this.loadImage(l),s++,t?.(s,i)}catch(o){console.error(`Failed to preload image ${l}:`,o),s++,t?.(s,i)}});await Promise.all(a)}}const _r=new iv(100),$t={async uploadImage(n,e){const t=new FormData;return t.append("image",n),t.append("uploaded_by",e.toString()),(await Ke.post("/api/artworks/upload",t,{headers:{"Content-Type":"multipart/form-data"},onUploadProgress:s=>{const a=Math.round(s.loaded*100/(s.total||1));console.log(`Загрузка: ${a}%`)}})).data},async analyzeImage(n){return(await Ke.post(`/artworks/${n}/analyze`)).data},async getImageAnalysis(n){return(await Ke.get(`/artworks/${n}/analysis`)).data},async submitArtworkForReview(n){return(await Ke.post("/artworks/submit-for-review",n)).data},async getUserUploads(n){return(await Ke.get(`/users/${n}/uploads`)).data},async getSubmissionsForReview(){return(await Ke.get("/artworks/submissions-for-review")).data},async approveSubmission(n,e){await Ke.post(`/artworks/submissions/${n}/approve`,e)},async rejectSubmission(n,e){await Ke.post(`/artworks/submissions/${n}/reject`,{reason:e})},async reanalyzeImage(n){return(await Ke.post(`/artworks/${n}/reanalyze`)).data},async generateNFT(n,e){return(await Ke.post("/artworks/generate-nft",{artworkId:n,ownerInfo:e})).data},async loadAndCacheImage(n){return await _r.loadImage(n)},async loadAndCacheImages(n){return await _r.loadImages(n)},async preloadImages(n,e){return await _r.preloadImages(n,e)},getCacheInfo(){return _r.getCacheInfo()},clearCache(){_r.clearCache()}},Va=se.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`,rv=se.button`
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
`,sv=se.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`,av=se.div`
  flex: 1;
  height: 400px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
`,ov=se.div`
  flex: 1;
`,lv=se.h1`
  margin: 0 0 1rem 0;
  color: #333;
`,cv=se.h2`
  margin: 0 0 1.5rem 0;
  color: #666;
  font-weight: 500;
`,dv=se.p`
  color: #555;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`,uv=se.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
`,os=se.div`
  display: flex;
  flex-direction: column;
`,br=se.span`
  font-weight: bold;
  color: #666;
  margin-bottom: 0.25rem;
`,ls=se.span`
  color: #333;
`,hv=se.div`
  margin-top: 1.5rem;
`,fv=se.span`
  display: inline-block;
  background-color: #6200ee;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`,pv=se.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
`,Ph=se.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    opacity: 0.9;
  }
`,mv=se(Ph)`
  background-color: ${({isFavorite:n})=>n?"#f44336":"#2196f3"};
  color: white;
`,gv=se(Ph)`
  background-color: #4caf50;
  color: white;
`,xv=se.div`
  margin-top: 3rem;
`,vv=se.h3`
  margin-bottom: 1.5rem;
  color: #333;
`,yv=se.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`,_v=()=>{const{id:n}=fa(),e=ha(),[t,i]=O.useState(null),[s,a]=O.useState([]),[l,o]=O.useState(!0),[c,d]=O.useState(!1);O.useEffect(()=>{(async()=>{try{if(n){const y=await ra.getArtworkById(parseInt(n));i(y);const g=await ra.getSimilarArtworks(parseInt(n),6);a(g)}}catch(y){console.error("Ошибка при загрузке экспоната:",y)}finally{o(!1)}})()},[n]);const u=()=>{e(-1)},f=()=>{d(!c)},p=()=>{navigator.share?navigator.share({title:t?.title,text:`Посмотрите это удивительное произведение искусства: ${t?.title} от ${t?.artist_name}`,url:window.location.href}).catch(console.error):navigator.clipboard.writeText(window.location.href).then(()=>{alert("Ссылка скопирована в буфер обмена!")})};return l?r.jsx(Va,{children:"Загрузка экспоната..."}):t?r.jsxs(Va,{children:[r.jsx(rv,{onClick:u,children:"← Назад"}),r.jsxs(sv,{children:[r.jsx(av,{children:t.image_url?r.jsx("img",{src:t.image_url,alt:t.title,style:{width:"100%",height:"100%",objectFit:"contain"}}):r.jsx("span",{children:"Изображение недоступно"})}),r.jsxs(ov,{children:[r.jsx(lv,{children:t.title}),r.jsx(cv,{children:t.artist_name}),r.jsx(dv,{children:t.description}),r.jsxs(uv,{children:[r.jsxs(os,{children:[r.jsx(br,{children:"Год создания"}),r.jsx(ls,{children:t.year_created||"Неизвестно"})]}),r.jsxs(os,{children:[r.jsx(br,{children:"Техника"}),r.jsx(ls,{children:t.medium||"Неизвестно"})]}),r.jsxs(os,{children:[r.jsx(br,{children:"Размеры"}),r.jsx(ls,{children:t.dimensions||"Неизвестны"})]}),r.jsxs(os,{children:[r.jsx(br,{children:"Стиль"}),r.jsx(ls,{children:t.style||"Неизвестно"})]})]}),r.jsxs(hv,{children:[r.jsx(br,{children:"Теги:"}),t.tags&&t.tags.length>0?t.tags.map((x,y)=>r.jsx(fv,{children:x},y)):r.jsx("span",{children:"Теги отсутствуют"})]}),r.jsxs(pv,{children:[r.jsx(mv,{isFavorite:c,onClick:f,children:c?"Удалить из избранного":"Добавить в избранное"}),r.jsx(gv,{onClick:p,children:"Поделиться"})]})]})]}),s.length>0&&r.jsxs(xv,{children:[r.jsx(vv,{children:"Похожие экспонаты"}),r.jsx(yv,{children:s.map(x=>r.jsxs("div",{onClick:()=>e(`/artworks/${x.artwork_id}`),style:{cursor:"pointer"},children:[r.jsx("img",{src:x.image_url||"",alt:x.title,style:{width:"100%",height:"150px",objectFit:"cover",borderRadius:"4px"}}),r.jsxs("div",{children:[r.jsx("h4",{children:x.title}),r.jsx("p",{children:x.artist_name})]})]},x.artwork_id))})]})]}):r.jsx(Va,{children:"Экспонат не найден"})};const xl="158",Li={ROTATE:0,DOLLY:1,PAN:2},ji={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},bv=0,Ec=1,wv=2,Lh=1,jh=2,On=3,ai=0,Kt=1,Mn=2,ni=0,er=1,Mc=2,Tc=3,Ac=4,Sv=5,xi=100,Ev=101,Mv=102,Rc=103,Cc=104,Tv=200,Av=201,Rv=202,Cv=203,Xo=204,qo=205,Nv=206,Pv=207,Lv=208,jv=209,Dv=210,Iv=211,Uv=212,Ov=213,kv=214,Fv=0,Bv=1,zv=2,sa=3,Hv=4,Gv=5,Vv=6,Wv=7,Dh=0,Xv=1,qv=2,ii=0,$v=1,Yv=2,Kv=3,Ih=4,Zv=5,Uh=300,ar=301,or=302,$o=303,Yo=304,Sa=306,Ko=1e3,yn=1001,Zo=1002,zt=1003,Nc=1004,Wa=1005,ln=1006,Jv=1007,Fr=1008,ri=1009,Qv=1010,ey=1011,vl=1012,Oh=1013,Jn=1014,Qn=1015,Br=1016,kh=1017,Fh=1018,wi=1020,ty=1021,_n=1023,ny=1024,iy=1025,Si=1026,lr=1027,ry=1028,Bh=1029,sy=1030,zh=1031,Hh=1033,Xa=33776,qa=33777,$a=33778,Ya=33779,Pc=35840,Lc=35841,jc=35842,Dc=35843,ay=36196,Ic=37492,Uc=37496,Oc=37808,kc=37809,Fc=37810,Bc=37811,zc=37812,Hc=37813,Gc=37814,Vc=37815,Wc=37816,Xc=37817,qc=37818,$c=37819,Yc=37820,Kc=37821,Ka=36492,Zc=36494,Jc=36495,oy=36283,Qc=36284,ed=36285,td=36286,Gh=3e3,Ei=3001,ly=3200,cy=3201,Vh=0,dy=1,dn="",jt="srgb",Hn="srgb-linear",yl="display-p3",Ea="display-p3-linear",aa="linear",pt="srgb",oa="rec709",la="p3",Di=7680,nd=519,uy=512,hy=513,fy=514,py=515,my=516,gy=517,xy=518,vy=519,id=35044,rd="300 es",Jo=1035,Fn=2e3,ca=2001;class Ci{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const a=s.indexOf(t);a!==-1&&s.splice(a,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let a=0,l=s.length;a<l;a++)s[a].call(this,e);e.target=null}}}const It=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ks=Math.PI/180,da=180/Math.PI;function $r(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(It[n&255]+It[n>>8&255]+It[n>>16&255]+It[n>>24&255]+"-"+It[e&255]+It[e>>8&255]+"-"+It[e>>16&15|64]+It[e>>24&255]+"-"+It[t&63|128]+It[t>>8&255]+"-"+It[t>>16&255]+It[t>>24&255]+It[i&255]+It[i>>8&255]+It[i>>16&255]+It[i>>24&255]).toLowerCase()}function Ht(n,e,t){return Math.max(e,Math.min(t,n))}function yy(n,e){return(n%e+e)%e}function Za(n,e,t){return(1-t)*n+t*e}function sd(n){return(n&n-1)===0&&n!==0}function Qo(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function wr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Xt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const _y={DEG2RAD:Ks};class $e{constructor(e=0,t=0){$e.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ht(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),a=this.x-e.x,l=this.y-e.y;return this.x=a*i-l*s+e.x,this.y=a*s+l*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class nt{constructor(e,t,i,s,a,l,o,c,d){nt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,a,l,o,c,d)}set(e,t,i,s,a,l,o,c,d){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=a,u[5]=c,u[6]=i,u[7]=l,u[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,a=this.elements,l=i[0],o=i[3],c=i[6],d=i[1],u=i[4],f=i[7],p=i[2],x=i[5],y=i[8],g=s[0],m=s[3],h=s[6],b=s[1],v=s[4],E=s[7],_=s[2],T=s[5],A=s[8];return a[0]=l*g+o*b+c*_,a[3]=l*m+o*v+c*T,a[6]=l*h+o*E+c*A,a[1]=d*g+u*b+f*_,a[4]=d*m+u*v+f*T,a[7]=d*h+u*E+f*A,a[2]=p*g+x*b+y*_,a[5]=p*m+x*v+y*T,a[8]=p*h+x*E+y*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],l=e[4],o=e[5],c=e[6],d=e[7],u=e[8];return t*l*u-t*o*d-i*a*u+i*o*c+s*a*d-s*l*c}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],l=e[4],o=e[5],c=e[6],d=e[7],u=e[8],f=u*l-o*d,p=o*c-u*a,x=d*a-l*c,y=t*f+i*p+s*x;if(y===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/y;return e[0]=f*g,e[1]=(s*d-u*i)*g,e[2]=(o*i-s*l)*g,e[3]=p*g,e[4]=(u*t-s*c)*g,e[5]=(s*a-o*t)*g,e[6]=x*g,e[7]=(i*c-d*t)*g,e[8]=(l*t-i*a)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,a,l,o){const c=Math.cos(a),d=Math.sin(a);return this.set(i*c,i*d,-i*(c*l+d*o)+l+e,-s*d,s*c,-s*(-d*l+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Ja.makeScale(e,t)),this}rotate(e){return this.premultiply(Ja.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ja.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ja=new nt;function Wh(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ua(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function by(){const n=ua("canvas");return n.style.display="block",n}const ad={};function Ur(n){n in ad||(ad[n]=!0,console.warn(n))}const od=new nt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ld=new nt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),cs={[Hn]:{transfer:aa,primaries:oa,toReference:n=>n,fromReference:n=>n},[jt]:{transfer:pt,primaries:oa,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Ea]:{transfer:aa,primaries:la,toReference:n=>n.applyMatrix3(ld),fromReference:n=>n.applyMatrix3(od)},[yl]:{transfer:pt,primaries:la,toReference:n=>n.convertSRGBToLinear().applyMatrix3(ld),fromReference:n=>n.applyMatrix3(od).convertLinearToSRGB()}},wy=new Set([Hn,Ea]),dt={enabled:!0,_workingColorSpace:Hn,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(n){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!n},get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!wy.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=cs[e].toReference,s=cs[t].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return cs[n].primaries},getTransfer:function(n){return n===dn?aa:cs[n].transfer}};function tr(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Qa(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ii;class Xh{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ii===void 0&&(Ii=ua("canvas")),Ii.width=e.width,Ii.height=e.height;const i=Ii.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Ii}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ua("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),a=s.data;for(let l=0;l<a.length;l++)a[l]=tr(a[l]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(tr(t[i]/255)*255):t[i]=tr(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Sy=0;class qh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Sy++}),this.uuid=$r(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let l=0,o=s.length;l<o;l++)s[l].isDataTexture?a.push(eo(s[l].image)):a.push(eo(s[l]))}else a=eo(s);i.url=a}return t||(e.images[this.uuid]=i),i}}function eo(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Xh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Ey=0;class Zt extends Ci{constructor(e=Zt.DEFAULT_IMAGE,t=Zt.DEFAULT_MAPPING,i=yn,s=yn,a=ln,l=Fr,o=_n,c=ri,d=Zt.DEFAULT_ANISOTROPY,u=dn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ey++}),this.uuid=$r(),this.name="",this.source=new qh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=a,this.minFilter=l,this.anisotropy=d,this.format=o,this.internalFormat=null,this.type=c,this.offset=new $e(0,0),this.repeat=new $e(1,1),this.center=new $e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(Ur("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===Ei?jt:dn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Uh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ko:e.x=e.x-Math.floor(e.x);break;case yn:e.x=e.x<0?0:1;break;case Zo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ko:e.y=e.y-Math.floor(e.y);break;case yn:e.y=e.y<0?0:1;break;case Zo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Ur("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===jt?Ei:Gh}set encoding(e){Ur("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Ei?jt:dn}}Zt.DEFAULT_IMAGE=null;Zt.DEFAULT_MAPPING=Uh;Zt.DEFAULT_ANISOTROPY=1;class Pt{constructor(e=0,t=0,i=0,s=1){Pt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,a=this.w,l=e.elements;return this.x=l[0]*t+l[4]*i+l[8]*s+l[12]*a,this.y=l[1]*t+l[5]*i+l[9]*s+l[13]*a,this.z=l[2]*t+l[6]*i+l[10]*s+l[14]*a,this.w=l[3]*t+l[7]*i+l[11]*s+l[15]*a,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,a;const c=e.elements,d=c[0],u=c[4],f=c[8],p=c[1],x=c[5],y=c[9],g=c[2],m=c[6],h=c[10];if(Math.abs(u-p)<.01&&Math.abs(f-g)<.01&&Math.abs(y-m)<.01){if(Math.abs(u+p)<.1&&Math.abs(f+g)<.1&&Math.abs(y+m)<.1&&Math.abs(d+x+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(d+1)/2,E=(x+1)/2,_=(h+1)/2,T=(u+p)/4,A=(f+g)/4,L=(y+m)/4;return v>E&&v>_?v<.01?(i=0,s=.707106781,a=.707106781):(i=Math.sqrt(v),s=T/i,a=A/i):E>_?E<.01?(i=.707106781,s=0,a=.707106781):(s=Math.sqrt(E),i=T/s,a=L/s):_<.01?(i=.707106781,s=.707106781,a=0):(a=Math.sqrt(_),i=A/a,s=L/a),this.set(i,s,a,t),this}let b=Math.sqrt((m-y)*(m-y)+(f-g)*(f-g)+(p-u)*(p-u));return Math.abs(b)<.001&&(b=1),this.x=(m-y)/b,this.y=(f-g)/b,this.z=(p-u)/b,this.w=Math.acos((d+x+h-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class My extends Ci{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Pt(0,0,e,t),this.scissorTest=!1,this.viewport=new Pt(0,0,e,t);const s={width:e,height:t,depth:1};i.encoding!==void 0&&(Ur("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Ei?jt:dn),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ln,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Zt(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new qh(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ai extends My{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class $h extends Zt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=zt,this.minFilter=zt,this.wrapR=yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ty extends Zt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=zt,this.minFilter=zt,this.wrapR=yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class oi{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,a,l,o){let c=i[s+0],d=i[s+1],u=i[s+2],f=i[s+3];const p=a[l+0],x=a[l+1],y=a[l+2],g=a[l+3];if(o===0){e[t+0]=c,e[t+1]=d,e[t+2]=u,e[t+3]=f;return}if(o===1){e[t+0]=p,e[t+1]=x,e[t+2]=y,e[t+3]=g;return}if(f!==g||c!==p||d!==x||u!==y){let m=1-o;const h=c*p+d*x+u*y+f*g,b=h>=0?1:-1,v=1-h*h;if(v>Number.EPSILON){const _=Math.sqrt(v),T=Math.atan2(_,h*b);m=Math.sin(m*T)/_,o=Math.sin(o*T)/_}const E=o*b;if(c=c*m+p*E,d=d*m+x*E,u=u*m+y*E,f=f*m+g*E,m===1-o){const _=1/Math.sqrt(c*c+d*d+u*u+f*f);c*=_,d*=_,u*=_,f*=_}}e[t]=c,e[t+1]=d,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,s,a,l){const o=i[s],c=i[s+1],d=i[s+2],u=i[s+3],f=a[l],p=a[l+1],x=a[l+2],y=a[l+3];return e[t]=o*y+u*f+c*x-d*p,e[t+1]=c*y+u*p+d*f-o*x,e[t+2]=d*y+u*x+o*p-c*f,e[t+3]=u*y-o*f-c*p-d*x,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){const i=e._x,s=e._y,a=e._z,l=e._order,o=Math.cos,c=Math.sin,d=o(i/2),u=o(s/2),f=o(a/2),p=c(i/2),x=c(s/2),y=c(a/2);switch(l){case"XYZ":this._x=p*u*f+d*x*y,this._y=d*x*f-p*u*y,this._z=d*u*y+p*x*f,this._w=d*u*f-p*x*y;break;case"YXZ":this._x=p*u*f+d*x*y,this._y=d*x*f-p*u*y,this._z=d*u*y-p*x*f,this._w=d*u*f+p*x*y;break;case"ZXY":this._x=p*u*f-d*x*y,this._y=d*x*f+p*u*y,this._z=d*u*y+p*x*f,this._w=d*u*f-p*x*y;break;case"ZYX":this._x=p*u*f-d*x*y,this._y=d*x*f+p*u*y,this._z=d*u*y-p*x*f,this._w=d*u*f+p*x*y;break;case"YZX":this._x=p*u*f+d*x*y,this._y=d*x*f+p*u*y,this._z=d*u*y-p*x*f,this._w=d*u*f-p*x*y;break;case"XZY":this._x=p*u*f-d*x*y,this._y=d*x*f-p*u*y,this._z=d*u*y+p*x*f,this._w=d*u*f+p*x*y;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+l)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],a=t[8],l=t[1],o=t[5],c=t[9],d=t[2],u=t[6],f=t[10],p=i+o+f;if(p>0){const x=.5/Math.sqrt(p+1);this._w=.25/x,this._x=(u-c)*x,this._y=(a-d)*x,this._z=(l-s)*x}else if(i>o&&i>f){const x=2*Math.sqrt(1+i-o-f);this._w=(u-c)/x,this._x=.25*x,this._y=(s+l)/x,this._z=(a+d)/x}else if(o>f){const x=2*Math.sqrt(1+o-i-f);this._w=(a-d)/x,this._x=(s+l)/x,this._y=.25*x,this._z=(c+u)/x}else{const x=2*Math.sqrt(1+f-i-o);this._w=(l-s)/x,this._x=(a+d)/x,this._y=(c+u)/x,this._z=.25*x}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ht(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,a=e._z,l=e._w,o=t._x,c=t._y,d=t._z,u=t._w;return this._x=i*u+l*o+s*d-a*c,this._y=s*u+l*c+a*o-i*d,this._z=a*u+l*d+i*c-s*o,this._w=l*u-i*o-s*c-a*d,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,a=this._z,l=this._w;let o=l*e._w+i*e._x+s*e._y+a*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=l,this._x=i,this._y=s,this._z=a,this;const c=1-o*o;if(c<=Number.EPSILON){const x=1-t;return this._w=x*l+t*this._w,this._x=x*i+t*this._x,this._y=x*s+t*this._y,this._z=x*a+t*this._z,this.normalize(),this._onChangeCallback(),this}const d=Math.sqrt(c),u=Math.atan2(d,o),f=Math.sin((1-t)*u)/d,p=Math.sin(t*u)/d;return this._w=l*f+this._w*p,this._x=i*f+this._x*p,this._y=s*f+this._y*p,this._z=a*f+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),s=2*Math.PI*Math.random(),a=2*Math.PI*Math.random();return this.set(t*Math.cos(s),i*Math.sin(a),i*Math.cos(a),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class q{constructor(e=0,t=0,i=0){q.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(cd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(cd.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6]*s,this.y=a[1]*t+a[4]*i+a[7]*s,this.z=a[2]*t+a[5]*i+a[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,a=e.elements,l=1/(a[3]*t+a[7]*i+a[11]*s+a[15]);return this.x=(a[0]*t+a[4]*i+a[8]*s+a[12])*l,this.y=(a[1]*t+a[5]*i+a[9]*s+a[13])*l,this.z=(a[2]*t+a[6]*i+a[10]*s+a[14])*l,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,a=e.x,l=e.y,o=e.z,c=e.w,d=2*(l*s-o*i),u=2*(o*t-a*s),f=2*(a*i-l*t);return this.x=t+c*d+l*f-o*u,this.y=i+c*u+o*d-a*f,this.z=s+c*f+a*u-l*d,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s,this.y=a[1]*t+a[5]*i+a[9]*s,this.z=a[2]*t+a[6]*i+a[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,a=e.z,l=t.x,o=t.y,c=t.z;return this.x=s*c-a*o,this.y=a*l-i*c,this.z=i*o-s*l,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return to.copy(this).projectOnVector(e),this.sub(to)}reflect(e){return this.sub(to.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ht(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const to=new q,cd=new oi;class Ni{constructor(e=new q(1/0,1/0,1/0),t=new q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(fn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(fn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=fn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let l=0,o=a.count;l<o;l++)e.isMesh===!0?e.getVertexPosition(l,fn):fn.fromBufferAttribute(a,l),fn.applyMatrix4(e.matrixWorld),this.expandByPoint(fn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ds.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ds.copy(i.boundingBox)),ds.applyMatrix4(e.matrixWorld),this.union(ds)}const s=e.children;for(let a=0,l=s.length;a<l;a++)this.expandByObject(s[a],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,fn),fn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Sr),us.subVectors(this.max,Sr),Ui.subVectors(e.a,Sr),Oi.subVectors(e.b,Sr),ki.subVectors(e.c,Sr),Xn.subVectors(Oi,Ui),qn.subVectors(ki,Oi),ui.subVectors(Ui,ki);let t=[0,-Xn.z,Xn.y,0,-qn.z,qn.y,0,-ui.z,ui.y,Xn.z,0,-Xn.x,qn.z,0,-qn.x,ui.z,0,-ui.x,-Xn.y,Xn.x,0,-qn.y,qn.x,0,-ui.y,ui.x,0];return!no(t,Ui,Oi,ki,us)||(t=[1,0,0,0,1,0,0,0,1],!no(t,Ui,Oi,ki,us))?!1:(hs.crossVectors(Xn,qn),t=[hs.x,hs.y,hs.z],no(t,Ui,Oi,ki,us))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,fn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(fn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ln),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ln=[new q,new q,new q,new q,new q,new q,new q,new q],fn=new q,ds=new Ni,Ui=new q,Oi=new q,ki=new q,Xn=new q,qn=new q,ui=new q,Sr=new q,us=new q,hs=new q,hi=new q;function no(n,e,t,i,s){for(let a=0,l=n.length-3;a<=l;a+=3){hi.fromArray(n,a);const o=s.x*Math.abs(hi.x)+s.y*Math.abs(hi.y)+s.z*Math.abs(hi.z),c=e.dot(hi),d=t.dot(hi),u=i.dot(hi);if(Math.max(-Math.max(c,d,u),Math.min(c,d,u))>o)return!1}return!0}const Ay=new Ni,Er=new q,io=new q;class Yr{constructor(e=new q,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Ay.setFromPoints(e).getCenter(i);let s=0;for(let a=0,l=e.length;a<l;a++)s=Math.max(s,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Er.subVectors(e,this.center);const t=Er.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Er,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(io.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Er.copy(e.center).add(io)),this.expandByPoint(Er.copy(e.center).sub(io))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const jn=new q,ro=new q,fs=new q,$n=new q,so=new q,ps=new q,ao=new q;class _l{constructor(e=new q,t=new q(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,jn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=jn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(jn.copy(this.origin).addScaledVector(this.direction,t),jn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){ro.copy(e).add(t).multiplyScalar(.5),fs.copy(t).sub(e).normalize(),$n.copy(this.origin).sub(ro);const a=e.distanceTo(t)*.5,l=-this.direction.dot(fs),o=$n.dot(this.direction),c=-$n.dot(fs),d=$n.lengthSq(),u=Math.abs(1-l*l);let f,p,x,y;if(u>0)if(f=l*c-o,p=l*o-c,y=a*u,f>=0)if(p>=-y)if(p<=y){const g=1/u;f*=g,p*=g,x=f*(f+l*p+2*o)+p*(l*f+p+2*c)+d}else p=a,f=Math.max(0,-(l*p+o)),x=-f*f+p*(p+2*c)+d;else p=-a,f=Math.max(0,-(l*p+o)),x=-f*f+p*(p+2*c)+d;else p<=-y?(f=Math.max(0,-(-l*a+o)),p=f>0?-a:Math.min(Math.max(-a,-c),a),x=-f*f+p*(p+2*c)+d):p<=y?(f=0,p=Math.min(Math.max(-a,-c),a),x=p*(p+2*c)+d):(f=Math.max(0,-(l*a+o)),p=f>0?a:Math.min(Math.max(-a,-c),a),x=-f*f+p*(p+2*c)+d);else p=l>0?-a:a,f=Math.max(0,-(l*p+o)),x=-f*f+p*(p+2*c)+d;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(ro).addScaledVector(fs,p),x}intersectSphere(e,t){jn.subVectors(e.center,this.origin);const i=jn.dot(this.direction),s=jn.dot(jn)-i*i,a=e.radius*e.radius;if(s>a)return null;const l=Math.sqrt(a-s),o=i-l,c=i+l;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,a,l,o,c;const d=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,p=this.origin;return d>=0?(i=(e.min.x-p.x)*d,s=(e.max.x-p.x)*d):(i=(e.max.x-p.x)*d,s=(e.min.x-p.x)*d),u>=0?(a=(e.min.y-p.y)*u,l=(e.max.y-p.y)*u):(a=(e.max.y-p.y)*u,l=(e.min.y-p.y)*u),i>l||a>s||((a>i||isNaN(i))&&(i=a),(l<s||isNaN(s))&&(s=l),f>=0?(o=(e.min.z-p.z)*f,c=(e.max.z-p.z)*f):(o=(e.max.z-p.z)*f,c=(e.min.z-p.z)*f),i>c||o>s)||((o>i||i!==i)&&(i=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,jn)!==null}intersectTriangle(e,t,i,s,a){so.subVectors(t,e),ps.subVectors(i,e),ao.crossVectors(so,ps);let l=this.direction.dot(ao),o;if(l>0){if(s)return null;o=1}else if(l<0)o=-1,l=-l;else return null;$n.subVectors(this.origin,e);const c=o*this.direction.dot(ps.crossVectors($n,ps));if(c<0)return null;const d=o*this.direction.dot(so.cross($n));if(d<0||c+d>l)return null;const u=-o*$n.dot(ao);return u<0?null:this.at(u/l,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class _t{constructor(e,t,i,s,a,l,o,c,d,u,f,p,x,y,g,m){_t.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,a,l,o,c,d,u,f,p,x,y,g,m)}set(e,t,i,s,a,l,o,c,d,u,f,p,x,y,g,m){const h=this.elements;return h[0]=e,h[4]=t,h[8]=i,h[12]=s,h[1]=a,h[5]=l,h[9]=o,h[13]=c,h[2]=d,h[6]=u,h[10]=f,h[14]=p,h[3]=x,h[7]=y,h[11]=g,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new _t().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/Fi.setFromMatrixColumn(e,0).length(),a=1/Fi.setFromMatrixColumn(e,1).length(),l=1/Fi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*a,t[5]=i[5]*a,t[6]=i[6]*a,t[7]=0,t[8]=i[8]*l,t[9]=i[9]*l,t[10]=i[10]*l,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,a=e.z,l=Math.cos(i),o=Math.sin(i),c=Math.cos(s),d=Math.sin(s),u=Math.cos(a),f=Math.sin(a);if(e.order==="XYZ"){const p=l*u,x=l*f,y=o*u,g=o*f;t[0]=c*u,t[4]=-c*f,t[8]=d,t[1]=x+y*d,t[5]=p-g*d,t[9]=-o*c,t[2]=g-p*d,t[6]=y+x*d,t[10]=l*c}else if(e.order==="YXZ"){const p=c*u,x=c*f,y=d*u,g=d*f;t[0]=p+g*o,t[4]=y*o-x,t[8]=l*d,t[1]=l*f,t[5]=l*u,t[9]=-o,t[2]=x*o-y,t[6]=g+p*o,t[10]=l*c}else if(e.order==="ZXY"){const p=c*u,x=c*f,y=d*u,g=d*f;t[0]=p-g*o,t[4]=-l*f,t[8]=y+x*o,t[1]=x+y*o,t[5]=l*u,t[9]=g-p*o,t[2]=-l*d,t[6]=o,t[10]=l*c}else if(e.order==="ZYX"){const p=l*u,x=l*f,y=o*u,g=o*f;t[0]=c*u,t[4]=y*d-x,t[8]=p*d+g,t[1]=c*f,t[5]=g*d+p,t[9]=x*d-y,t[2]=-d,t[6]=o*c,t[10]=l*c}else if(e.order==="YZX"){const p=l*c,x=l*d,y=o*c,g=o*d;t[0]=c*u,t[4]=g-p*f,t[8]=y*f+x,t[1]=f,t[5]=l*u,t[9]=-o*u,t[2]=-d*u,t[6]=x*f+y,t[10]=p-g*f}else if(e.order==="XZY"){const p=l*c,x=l*d,y=o*c,g=o*d;t[0]=c*u,t[4]=-f,t[8]=d*u,t[1]=p*f+g,t[5]=l*u,t[9]=x*f-y,t[2]=y*f-x,t[6]=o*u,t[10]=g*f+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ry,e,Cy)}lookAt(e,t,i){const s=this.elements;return en.subVectors(e,t),en.lengthSq()===0&&(en.z=1),en.normalize(),Yn.crossVectors(i,en),Yn.lengthSq()===0&&(Math.abs(i.z)===1?en.x+=1e-4:en.z+=1e-4,en.normalize(),Yn.crossVectors(i,en)),Yn.normalize(),ms.crossVectors(en,Yn),s[0]=Yn.x,s[4]=ms.x,s[8]=en.x,s[1]=Yn.y,s[5]=ms.y,s[9]=en.y,s[2]=Yn.z,s[6]=ms.z,s[10]=en.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,a=this.elements,l=i[0],o=i[4],c=i[8],d=i[12],u=i[1],f=i[5],p=i[9],x=i[13],y=i[2],g=i[6],m=i[10],h=i[14],b=i[3],v=i[7],E=i[11],_=i[15],T=s[0],A=s[4],L=s[8],w=s[12],M=s[1],j=s[5],B=s[9],$=s[13],P=s[2],z=s[6],Z=s[10],Y=s[14],ae=s[3],J=s[7],ne=s[11],N=s[15];return a[0]=l*T+o*M+c*P+d*ae,a[4]=l*A+o*j+c*z+d*J,a[8]=l*L+o*B+c*Z+d*ne,a[12]=l*w+o*$+c*Y+d*N,a[1]=u*T+f*M+p*P+x*ae,a[5]=u*A+f*j+p*z+x*J,a[9]=u*L+f*B+p*Z+x*ne,a[13]=u*w+f*$+p*Y+x*N,a[2]=y*T+g*M+m*P+h*ae,a[6]=y*A+g*j+m*z+h*J,a[10]=y*L+g*B+m*Z+h*ne,a[14]=y*w+g*$+m*Y+h*N,a[3]=b*T+v*M+E*P+_*ae,a[7]=b*A+v*j+E*z+_*J,a[11]=b*L+v*B+E*Z+_*ne,a[15]=b*w+v*$+E*Y+_*N,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],a=e[12],l=e[1],o=e[5],c=e[9],d=e[13],u=e[2],f=e[6],p=e[10],x=e[14],y=e[3],g=e[7],m=e[11],h=e[15];return y*(+a*c*f-s*d*f-a*o*p+i*d*p+s*o*x-i*c*x)+g*(+t*c*x-t*d*p+a*l*p-s*l*x+s*d*u-a*c*u)+m*(+t*d*f-t*o*x-a*l*f+i*l*x+a*o*u-i*d*u)+h*(-s*o*u-t*c*f+t*o*p+s*l*f-i*l*p+i*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],l=e[4],o=e[5],c=e[6],d=e[7],u=e[8],f=e[9],p=e[10],x=e[11],y=e[12],g=e[13],m=e[14],h=e[15],b=f*m*d-g*p*d+g*c*x-o*m*x-f*c*h+o*p*h,v=y*p*d-u*m*d-y*c*x+l*m*x+u*c*h-l*p*h,E=u*g*d-y*f*d+y*o*x-l*g*x-u*o*h+l*f*h,_=y*f*c-u*g*c-y*o*p+l*g*p+u*o*m-l*f*m,T=t*b+i*v+s*E+a*_;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/T;return e[0]=b*A,e[1]=(g*p*a-f*m*a-g*s*x+i*m*x+f*s*h-i*p*h)*A,e[2]=(o*m*a-g*c*a+g*s*d-i*m*d-o*s*h+i*c*h)*A,e[3]=(f*c*a-o*p*a-f*s*d+i*p*d+o*s*x-i*c*x)*A,e[4]=v*A,e[5]=(u*m*a-y*p*a+y*s*x-t*m*x-u*s*h+t*p*h)*A,e[6]=(y*c*a-l*m*a-y*s*d+t*m*d+l*s*h-t*c*h)*A,e[7]=(l*p*a-u*c*a+u*s*d-t*p*d-l*s*x+t*c*x)*A,e[8]=E*A,e[9]=(y*f*a-u*g*a-y*i*x+t*g*x+u*i*h-t*f*h)*A,e[10]=(l*g*a-y*o*a+y*i*d-t*g*d-l*i*h+t*o*h)*A,e[11]=(u*o*a-l*f*a-u*i*d+t*f*d+l*i*x-t*o*x)*A,e[12]=_*A,e[13]=(u*g*s-y*f*s+y*i*p-t*g*p-u*i*m+t*f*m)*A,e[14]=(y*o*s-l*g*s-y*i*c+t*g*c+l*i*m-t*o*m)*A,e[15]=(l*f*s-u*o*s+u*i*c-t*f*c-l*i*p+t*o*p)*A,this}scale(e){const t=this.elements,i=e.x,s=e.y,a=e.z;return t[0]*=i,t[4]*=s,t[8]*=a,t[1]*=i,t[5]*=s,t[9]*=a,t[2]*=i,t[6]*=s,t[10]*=a,t[3]*=i,t[7]*=s,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),a=1-i,l=e.x,o=e.y,c=e.z,d=a*l,u=a*o;return this.set(d*l+i,d*o-s*c,d*c+s*o,0,d*o+s*c,u*o+i,u*c-s*l,0,d*c-s*o,u*c+s*l,a*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,a,l){return this.set(1,i,a,0,e,1,l,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,a=t._x,l=t._y,o=t._z,c=t._w,d=a+a,u=l+l,f=o+o,p=a*d,x=a*u,y=a*f,g=l*u,m=l*f,h=o*f,b=c*d,v=c*u,E=c*f,_=i.x,T=i.y,A=i.z;return s[0]=(1-(g+h))*_,s[1]=(x+E)*_,s[2]=(y-v)*_,s[3]=0,s[4]=(x-E)*T,s[5]=(1-(p+h))*T,s[6]=(m+b)*T,s[7]=0,s[8]=(y+v)*A,s[9]=(m-b)*A,s[10]=(1-(p+g))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let a=Fi.set(s[0],s[1],s[2]).length();const l=Fi.set(s[4],s[5],s[6]).length(),o=Fi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(a=-a),e.x=s[12],e.y=s[13],e.z=s[14],pn.copy(this);const d=1/a,u=1/l,f=1/o;return pn.elements[0]*=d,pn.elements[1]*=d,pn.elements[2]*=d,pn.elements[4]*=u,pn.elements[5]*=u,pn.elements[6]*=u,pn.elements[8]*=f,pn.elements[9]*=f,pn.elements[10]*=f,t.setFromRotationMatrix(pn),i.x=a,i.y=l,i.z=o,this}makePerspective(e,t,i,s,a,l,o=Fn){const c=this.elements,d=2*a/(t-e),u=2*a/(i-s),f=(t+e)/(t-e),p=(i+s)/(i-s);let x,y;if(o===Fn)x=-(l+a)/(l-a),y=-2*l*a/(l-a);else if(o===ca)x=-l/(l-a),y=-l*a/(l-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=x,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,a,l,o=Fn){const c=this.elements,d=1/(t-e),u=1/(i-s),f=1/(l-a),p=(t+e)*d,x=(i+s)*u;let y,g;if(o===Fn)y=(l+a)*f,g=-2*f;else if(o===ca)y=a*f,g=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*d,c[4]=0,c[8]=0,c[12]=-p,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-x,c[2]=0,c[6]=0,c[10]=g,c[14]=-y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Fi=new q,pn=new _t,Ry=new q(0,0,0),Cy=new q(1,1,1),Yn=new q,ms=new q,en=new q,dd=new _t,ud=new oi;class cr{constructor(e=0,t=0,i=0,s=cr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,a=s[0],l=s[4],o=s[8],c=s[1],d=s[5],u=s[9],f=s[2],p=s[6],x=s[10];switch(t){case"XYZ":this._y=Math.asin(Ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,x),this._z=Math.atan2(-l,a)):(this._x=Math.atan2(p,d),this._z=0);break;case"YXZ":this._x=Math.asin(-Ht(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,x),this._z=Math.atan2(c,d)):(this._y=Math.atan2(-f,a),this._z=0);break;case"ZXY":this._x=Math.asin(Ht(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-f,x),this._z=Math.atan2(-l,d)):(this._y=0,this._z=Math.atan2(c,a));break;case"ZYX":this._y=Math.asin(-Ht(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(p,x),this._z=Math.atan2(c,a)):(this._x=0,this._z=Math.atan2(-l,d));break;case"YZX":this._z=Math.asin(Ht(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,d),this._y=Math.atan2(-f,a)):(this._x=0,this._y=Math.atan2(o,x));break;case"XZY":this._z=Math.asin(-Ht(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(p,d),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-u,x),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return dd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(dd,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ud.setFromEuler(this),this.setFromQuaternion(ud,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}cr.DEFAULT_ORDER="XYZ";class bl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ny=0;const hd=new q,Bi=new oi,Dn=new _t,gs=new q,Mr=new q,Py=new q,Ly=new oi,fd=new q(1,0,0),pd=new q(0,1,0),md=new q(0,0,1),jy={type:"added"},Dy={type:"removed"};class Lt extends Ci{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ny++}),this.uuid=$r(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Lt.DEFAULT_UP.clone();const e=new q,t=new cr,i=new oi,s=new q(1,1,1);function a(){i.setFromEuler(t,!1)}function l(){t.setFromQuaternion(i,void 0,!1)}t._onChange(a),i._onChange(l),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new _t},normalMatrix:{value:new nt}}),this.matrix=new _t,this.matrixWorld=new _t,this.matrixAutoUpdate=Lt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new bl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Bi.setFromAxisAngle(e,t),this.quaternion.multiply(Bi),this}rotateOnWorldAxis(e,t){return Bi.setFromAxisAngle(e,t),this.quaternion.premultiply(Bi),this}rotateX(e){return this.rotateOnAxis(fd,e)}rotateY(e){return this.rotateOnAxis(pd,e)}rotateZ(e){return this.rotateOnAxis(md,e)}translateOnAxis(e,t){return hd.copy(e).applyQuaternion(this.quaternion),this.position.add(hd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(fd,e)}translateY(e){return this.translateOnAxis(pd,e)}translateZ(e){return this.translateOnAxis(md,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Dn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?gs.copy(e):gs.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Mr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Dn.lookAt(Mr,gs,this.up):Dn.lookAt(gs,Mr,this.up),this.quaternion.setFromRotationMatrix(Dn),s&&(Dn.extractRotation(s.matrixWorld),Bi.setFromRotationMatrix(Dn),this.quaternion.premultiply(Bi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(jy)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Dy)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Dn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Dn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Dn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const l=this.children[i].getObjectByProperty(e,t);if(l!==void 0)return l}}getObjectsByProperty(e,t){let i=[];this[e]===t&&i.push(this);for(let s=0,a=this.children.length;s<a;s++){const l=this.children[s].getObjectsByProperty(e,t);l.length>0&&(i=i.concat(l))}return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mr,e,Py),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mr,Ly,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++){const a=t[i];(a.matrixWorldAutoUpdate===!0||e===!0)&&a.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let a=0,l=s.length;a<l;a++){const o=s[a];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON()));function a(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let d=0,u=c.length;d<u;d++){const f=c[d];a(e.shapes,f)}else a(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,d=this.material.length;c<d;c++)o.push(a(e.materials,this.material[c]));s.material=o}else s.material=a(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(a(e.animations,c))}}if(t){const o=l(e.geometries),c=l(e.materials),d=l(e.textures),u=l(e.images),f=l(e.shapes),p=l(e.skeletons),x=l(e.animations),y=l(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),d.length>0&&(i.textures=d),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),p.length>0&&(i.skeletons=p),x.length>0&&(i.animations=x),y.length>0&&(i.nodes=y)}return i.object=s,i;function l(o){const c=[];for(const d in o){const u=o[d];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Lt.DEFAULT_UP=new q(0,1,0);Lt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const mn=new q,In=new q,oo=new q,Un=new q,zi=new q,Hi=new q,gd=new q,lo=new q,co=new q,uo=new q;let xs=!1;class vn{constructor(e=new q,t=new q,i=new q){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),mn.subVectors(e,t),s.cross(mn);const a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(e,t,i,s,a){mn.subVectors(s,t),In.subVectors(i,t),oo.subVectors(e,t);const l=mn.dot(mn),o=mn.dot(In),c=mn.dot(oo),d=In.dot(In),u=In.dot(oo),f=l*d-o*o;if(f===0)return a.set(-2,-1,-1);const p=1/f,x=(d*c-o*u)*p,y=(l*u-o*c)*p;return a.set(1-x-y,y,x)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Un),Un.x>=0&&Un.y>=0&&Un.x+Un.y<=1}static getUV(e,t,i,s,a,l,o,c){return xs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),xs=!0),this.getInterpolation(e,t,i,s,a,l,o,c)}static getInterpolation(e,t,i,s,a,l,o,c){return this.getBarycoord(e,t,i,s,Un),c.setScalar(0),c.addScaledVector(a,Un.x),c.addScaledVector(l,Un.y),c.addScaledVector(o,Un.z),c}static isFrontFacing(e,t,i,s){return mn.subVectors(i,t),In.subVectors(e,t),mn.cross(In).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return mn.subVectors(this.c,this.b),In.subVectors(this.a,this.b),mn.cross(In).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return vn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return vn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,s,a){return xs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),xs=!0),vn.getInterpolation(e,this.a,this.b,this.c,t,i,s,a)}getInterpolation(e,t,i,s,a){return vn.getInterpolation(e,this.a,this.b,this.c,t,i,s,a)}containsPoint(e){return vn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return vn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,a=this.c;let l,o;zi.subVectors(s,i),Hi.subVectors(a,i),lo.subVectors(e,i);const c=zi.dot(lo),d=Hi.dot(lo);if(c<=0&&d<=0)return t.copy(i);co.subVectors(e,s);const u=zi.dot(co),f=Hi.dot(co);if(u>=0&&f<=u)return t.copy(s);const p=c*f-u*d;if(p<=0&&c>=0&&u<=0)return l=c/(c-u),t.copy(i).addScaledVector(zi,l);uo.subVectors(e,a);const x=zi.dot(uo),y=Hi.dot(uo);if(y>=0&&x<=y)return t.copy(a);const g=x*d-c*y;if(g<=0&&d>=0&&y<=0)return o=d/(d-y),t.copy(i).addScaledVector(Hi,o);const m=u*y-x*f;if(m<=0&&f-u>=0&&x-y>=0)return gd.subVectors(a,s),o=(f-u)/(f-u+(x-y)),t.copy(s).addScaledVector(gd,o);const h=1/(m+g+p);return l=g*h,o=p*h,t.copy(i).addScaledVector(zi,l).addScaledVector(Hi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Yh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Kn={h:0,s:0,l:0},vs={h:0,s:0,l:0};function ho(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class ot{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=jt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,dt.toWorkingColorSpace(this,t),this}setRGB(e,t,i,s=dt.workingColorSpace){return this.r=e,this.g=t,this.b=i,dt.toWorkingColorSpace(this,s),this}setHSL(e,t,i,s=dt.workingColorSpace){if(e=yy(e,1),t=Ht(t,0,1),i=Ht(i,0,1),t===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+t):i+t-i*t,l=2*i-a;this.r=ho(l,a,e+1/3),this.g=ho(l,a,e),this.b=ho(l,a,e-1/3)}return dt.toWorkingColorSpace(this,s),this}setStyle(e,t=jt){function i(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const l=s[1],o=s[2];switch(l){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=s[1],l=a.length;if(l===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(l===6)return this.setHex(parseInt(a,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=jt){const i=Yh[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=tr(e.r),this.g=tr(e.g),this.b=tr(e.b),this}copyLinearToSRGB(e){return this.r=Qa(e.r),this.g=Qa(e.g),this.b=Qa(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=jt){return dt.fromWorkingColorSpace(Ut.copy(this),e),Math.round(Ht(Ut.r*255,0,255))*65536+Math.round(Ht(Ut.g*255,0,255))*256+Math.round(Ht(Ut.b*255,0,255))}getHexString(e=jt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=dt.workingColorSpace){dt.fromWorkingColorSpace(Ut.copy(this),t);const i=Ut.r,s=Ut.g,a=Ut.b,l=Math.max(i,s,a),o=Math.min(i,s,a);let c,d;const u=(o+l)/2;if(o===l)c=0,d=0;else{const f=l-o;switch(d=u<=.5?f/(l+o):f/(2-l-o),l){case i:c=(s-a)/f+(s<a?6:0);break;case s:c=(a-i)/f+2;break;case a:c=(i-s)/f+4;break}c/=6}return e.h=c,e.s=d,e.l=u,e}getRGB(e,t=dt.workingColorSpace){return dt.fromWorkingColorSpace(Ut.copy(this),t),e.r=Ut.r,e.g=Ut.g,e.b=Ut.b,e}getStyle(e=jt){dt.fromWorkingColorSpace(Ut.copy(this),e);const t=Ut.r,i=Ut.g,s=Ut.b;return e!==jt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Kn),this.setHSL(Kn.h+e,Kn.s+t,Kn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Kn),e.getHSL(vs);const i=Za(Kn.h,vs.h,t),s=Za(Kn.s,vs.s,t),a=Za(Kn.l,vs.l,t);return this.setHSL(i,s,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*s,this.g=a[1]*t+a[4]*i+a[7]*s,this.b=a[2]*t+a[5]*i+a[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ut=new ot;ot.NAMES=Yh;let Iy=0;class Kr extends Ci{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Iy++}),this.uuid=$r(),this.name="",this.type="Material",this.blending=er,this.side=ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Xo,this.blendDst=qo,this.blendEquation=xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ot(0,0,0),this.blendAlpha=0,this.depthFunc=sa,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=nd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Di,this.stencilZFail=Di,this.stencilZPass=Di,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==er&&(i.blending=this.blending),this.side!==ai&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Xo&&(i.blendSrc=this.blendSrc),this.blendDst!==qo&&(i.blendDst=this.blendDst),this.blendEquation!==xi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==sa&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==nd&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Di&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Di&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Di&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(a){const l=[];for(const o in a){const c=a[o];delete c.metadata,l.push(c)}return l}if(t){const a=s(e.textures),l=s(e.images);a.length>0&&(i.textures=a),l.length>0&&(i.images=l)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let a=0;a!==s;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Kh extends Kr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Dh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Mt=new q,ys=new $e;class bn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=id,this.updateRange={offset:0,count:-1},this.gpuType=Qn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ys.fromBufferAttribute(this,t),ys.applyMatrix3(e),this.setXY(t,ys.x,ys.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix3(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix4(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Mt.fromBufferAttribute(this,t),Mt.applyNormalMatrix(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Mt.fromBufferAttribute(this,t),Mt.transformDirection(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=wr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Xt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=wr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=wr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=wr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=wr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Xt(t,this.array),i=Xt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Xt(t,this.array),i=Xt(i,this.array),s=Xt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,a){return e*=this.itemSize,this.normalized&&(t=Xt(t,this.array),i=Xt(i,this.array),s=Xt(s,this.array),a=Xt(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==id&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}}class Zh extends bn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Jh extends bn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Rn extends bn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Uy=0;const sn=new _t,fo=new Lt,Gi=new q,tn=new Ni,Tr=new Ni,Nt=new q;class li extends Ci{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Uy++}),this.uuid=$r(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Wh(e)?Jh:Zh)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new nt().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return sn.makeRotationFromQuaternion(e),this.applyMatrix4(sn),this}rotateX(e){return sn.makeRotationX(e),this.applyMatrix4(sn),this}rotateY(e){return sn.makeRotationY(e),this.applyMatrix4(sn),this}rotateZ(e){return sn.makeRotationZ(e),this.applyMatrix4(sn),this}translate(e,t,i){return sn.makeTranslation(e,t,i),this.applyMatrix4(sn),this}scale(e,t,i){return sn.makeScale(e,t,i),this.applyMatrix4(sn),this}lookAt(e){return fo.lookAt(e),fo.updateMatrix(),this.applyMatrix4(fo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Gi).negate(),this.translate(Gi.x,Gi.y,Gi.z),this}setFromPoints(e){const t=[];for(let i=0,s=e.length;i<s;i++){const a=e[i];t.push(a.x,a.y,a.z||0)}return this.setAttribute("position",new Rn(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ni);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new q(-1/0,-1/0,-1/0),new q(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const a=t[i];tn.setFromBufferAttribute(a),this.morphTargetsRelative?(Nt.addVectors(this.boundingBox.min,tn.min),this.boundingBox.expandByPoint(Nt),Nt.addVectors(this.boundingBox.max,tn.max),this.boundingBox.expandByPoint(Nt)):(this.boundingBox.expandByPoint(tn.min),this.boundingBox.expandByPoint(tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Yr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new q,1/0);return}if(e){const i=this.boundingSphere.center;if(tn.setFromBufferAttribute(e),t)for(let a=0,l=t.length;a<l;a++){const o=t[a];Tr.setFromBufferAttribute(o),this.morphTargetsRelative?(Nt.addVectors(tn.min,Tr.min),tn.expandByPoint(Nt),Nt.addVectors(tn.max,Tr.max),tn.expandByPoint(Nt)):(tn.expandByPoint(Tr.min),tn.expandByPoint(Tr.max))}tn.getCenter(i);let s=0;for(let a=0,l=e.count;a<l;a++)Nt.fromBufferAttribute(e,a),s=Math.max(s,i.distanceToSquared(Nt));if(t)for(let a=0,l=t.length;a<l;a++){const o=t[a],c=this.morphTargetsRelative;for(let d=0,u=o.count;d<u;d++)Nt.fromBufferAttribute(o,d),c&&(Gi.fromBufferAttribute(e,d),Nt.add(Gi)),s=Math.max(s,i.distanceToSquared(Nt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,s=t.position.array,a=t.normal.array,l=t.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new bn(new Float32Array(4*o),4));const c=this.getAttribute("tangent").array,d=[],u=[];for(let M=0;M<o;M++)d[M]=new q,u[M]=new q;const f=new q,p=new q,x=new q,y=new $e,g=new $e,m=new $e,h=new q,b=new q;function v(M,j,B){f.fromArray(s,M*3),p.fromArray(s,j*3),x.fromArray(s,B*3),y.fromArray(l,M*2),g.fromArray(l,j*2),m.fromArray(l,B*2),p.sub(f),x.sub(f),g.sub(y),m.sub(y);const $=1/(g.x*m.y-m.x*g.y);isFinite($)&&(h.copy(p).multiplyScalar(m.y).addScaledVector(x,-g.y).multiplyScalar($),b.copy(x).multiplyScalar(g.x).addScaledVector(p,-m.x).multiplyScalar($),d[M].add(h),d[j].add(h),d[B].add(h),u[M].add(b),u[j].add(b),u[B].add(b))}let E=this.groups;E.length===0&&(E=[{start:0,count:i.length}]);for(let M=0,j=E.length;M<j;++M){const B=E[M],$=B.start,P=B.count;for(let z=$,Z=$+P;z<Z;z+=3)v(i[z+0],i[z+1],i[z+2])}const _=new q,T=new q,A=new q,L=new q;function w(M){A.fromArray(a,M*3),L.copy(A);const j=d[M];_.copy(j),_.sub(A.multiplyScalar(A.dot(j))).normalize(),T.crossVectors(L,j);const $=T.dot(u[M])<0?-1:1;c[M*4]=_.x,c[M*4+1]=_.y,c[M*4+2]=_.z,c[M*4+3]=$}for(let M=0,j=E.length;M<j;++M){const B=E[M],$=B.start,P=B.count;for(let z=$,Z=$+P;z<Z;z+=3)w(i[z+0]),w(i[z+1]),w(i[z+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new bn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let p=0,x=i.count;p<x;p++)i.setXYZ(p,0,0,0);const s=new q,a=new q,l=new q,o=new q,c=new q,d=new q,u=new q,f=new q;if(e)for(let p=0,x=e.count;p<x;p+=3){const y=e.getX(p+0),g=e.getX(p+1),m=e.getX(p+2);s.fromBufferAttribute(t,y),a.fromBufferAttribute(t,g),l.fromBufferAttribute(t,m),u.subVectors(l,a),f.subVectors(s,a),u.cross(f),o.fromBufferAttribute(i,y),c.fromBufferAttribute(i,g),d.fromBufferAttribute(i,m),o.add(u),c.add(u),d.add(u),i.setXYZ(y,o.x,o.y,o.z),i.setXYZ(g,c.x,c.y,c.z),i.setXYZ(m,d.x,d.y,d.z)}else for(let p=0,x=t.count;p<x;p+=3)s.fromBufferAttribute(t,p+0),a.fromBufferAttribute(t,p+1),l.fromBufferAttribute(t,p+2),u.subVectors(l,a),f.subVectors(s,a),u.cross(f),i.setXYZ(p+0,u.x,u.y,u.z),i.setXYZ(p+1,u.x,u.y,u.z),i.setXYZ(p+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Nt.fromBufferAttribute(e,t),Nt.normalize(),e.setXYZ(t,Nt.x,Nt.y,Nt.z)}toNonIndexed(){function e(o,c){const d=o.array,u=o.itemSize,f=o.normalized,p=new d.constructor(c.length*u);let x=0,y=0;for(let g=0,m=c.length;g<m;g++){o.isInterleavedBufferAttribute?x=c[g]*o.data.stride+o.offset:x=c[g]*u;for(let h=0;h<u;h++)p[y++]=d[x++]}return new bn(p,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new li,i=this.index.array,s=this.attributes;for(const o in s){const c=s[o],d=e(c,i);t.setAttribute(o,d)}const a=this.morphAttributes;for(const o in a){const c=[],d=a[o];for(let u=0,f=d.length;u<f;u++){const p=d[u],x=e(p,i);c.push(x)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const l=this.groups;for(let o=0,c=l.length;o<c;o++){const d=l[o];t.addGroup(d.start,d.count,d.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const d in c)c[d]!==void 0&&(e[d]=c[d]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const d=i[c];e.data.attributes[c]=d.toJSON(e.data)}const s={};let a=!1;for(const c in this.morphAttributes){const d=this.morphAttributes[c],u=[];for(let f=0,p=d.length;f<p;f++){const x=d[f];u.push(x.toJSON(e.data))}u.length>0&&(s[c]=u,a=!0)}a&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const l=this.groups;l.length>0&&(e.data.groups=JSON.parse(JSON.stringify(l)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const s=e.attributes;for(const d in s){const u=s[d];this.setAttribute(d,u.clone(t))}const a=e.morphAttributes;for(const d in a){const u=[],f=a[d];for(let p=0,x=f.length;p<x;p++)u.push(f[p].clone(t));this.morphAttributes[d]=u}this.morphTargetsRelative=e.morphTargetsRelative;const l=e.groups;for(let d=0,u=l.length;d<u;d++){const f=l[d];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const xd=new _t,fi=new _l,_s=new Yr,vd=new q,Vi=new q,Wi=new q,Xi=new q,po=new q,bs=new q,ws=new $e,Ss=new $e,Es=new $e,yd=new q,_d=new q,bd=new q,Ms=new q,Ts=new q;class mt extends Lt{constructor(e=new li,t=new Kh){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,l=s.length;a<l;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,a=i.morphAttributes.position,l=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(a&&o){bs.set(0,0,0);for(let c=0,d=a.length;c<d;c++){const u=o[c],f=a[c];u!==0&&(po.fromBufferAttribute(f,e),l?bs.addScaledVector(po,u):bs.addScaledVector(po.sub(t),u))}t.add(bs)}return t}raycast(e,t){const i=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),_s.copy(i.boundingSphere),_s.applyMatrix4(a),fi.copy(e.ray).recast(e.near),!(_s.containsPoint(fi.origin)===!1&&(fi.intersectSphere(_s,vd)===null||fi.origin.distanceToSquared(vd)>(e.far-e.near)**2))&&(xd.copy(a).invert(),fi.copy(e.ray).applyMatrix4(xd),!(i.boundingBox!==null&&fi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,fi)))}_computeIntersections(e,t,i){let s;const a=this.geometry,l=this.material,o=a.index,c=a.attributes.position,d=a.attributes.uv,u=a.attributes.uv1,f=a.attributes.normal,p=a.groups,x=a.drawRange;if(o!==null)if(Array.isArray(l))for(let y=0,g=p.length;y<g;y++){const m=p[y],h=l[m.materialIndex],b=Math.max(m.start,x.start),v=Math.min(o.count,Math.min(m.start+m.count,x.start+x.count));for(let E=b,_=v;E<_;E+=3){const T=o.getX(E),A=o.getX(E+1),L=o.getX(E+2);s=As(this,h,e,i,d,u,f,T,A,L),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const y=Math.max(0,x.start),g=Math.min(o.count,x.start+x.count);for(let m=y,h=g;m<h;m+=3){const b=o.getX(m),v=o.getX(m+1),E=o.getX(m+2);s=As(this,l,e,i,d,u,f,b,v,E),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(l))for(let y=0,g=p.length;y<g;y++){const m=p[y],h=l[m.materialIndex],b=Math.max(m.start,x.start),v=Math.min(c.count,Math.min(m.start+m.count,x.start+x.count));for(let E=b,_=v;E<_;E+=3){const T=E,A=E+1,L=E+2;s=As(this,h,e,i,d,u,f,T,A,L),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const y=Math.max(0,x.start),g=Math.min(c.count,x.start+x.count);for(let m=y,h=g;m<h;m+=3){const b=m,v=m+1,E=m+2;s=As(this,l,e,i,d,u,f,b,v,E),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Oy(n,e,t,i,s,a,l,o){let c;if(e.side===Kt?c=i.intersectTriangle(l,a,s,!0,o):c=i.intersectTriangle(s,a,l,e.side===ai,o),c===null)return null;Ts.copy(o),Ts.applyMatrix4(n.matrixWorld);const d=t.ray.origin.distanceTo(Ts);return d<t.near||d>t.far?null:{distance:d,point:Ts.clone(),object:n}}function As(n,e,t,i,s,a,l,o,c,d){n.getVertexPosition(o,Vi),n.getVertexPosition(c,Wi),n.getVertexPosition(d,Xi);const u=Oy(n,e,t,i,Vi,Wi,Xi,Ms);if(u){s&&(ws.fromBufferAttribute(s,o),Ss.fromBufferAttribute(s,c),Es.fromBufferAttribute(s,d),u.uv=vn.getInterpolation(Ms,Vi,Wi,Xi,ws,Ss,Es,new $e)),a&&(ws.fromBufferAttribute(a,o),Ss.fromBufferAttribute(a,c),Es.fromBufferAttribute(a,d),u.uv1=vn.getInterpolation(Ms,Vi,Wi,Xi,ws,Ss,Es,new $e),u.uv2=u.uv1),l&&(yd.fromBufferAttribute(l,o),_d.fromBufferAttribute(l,c),bd.fromBufferAttribute(l,d),u.normal=vn.getInterpolation(Ms,Vi,Wi,Xi,yd,_d,bd,new q),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:c,c:d,normal:new q,materialIndex:0};vn.getNormal(Vi,Wi,Xi,f.normal),u.face=f}return u}class Gn extends li{constructor(e=1,t=1,i=1,s=1,a=1,l=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:a,depthSegments:l};const o=this;s=Math.floor(s),a=Math.floor(a),l=Math.floor(l);const c=[],d=[],u=[],f=[];let p=0,x=0;y("z","y","x",-1,-1,i,t,e,l,a,0),y("z","y","x",1,-1,i,t,-e,l,a,1),y("x","z","y",1,1,e,i,t,s,l,2),y("x","z","y",1,-1,e,i,-t,s,l,3),y("x","y","z",1,-1,e,t,i,s,a,4),y("x","y","z",-1,-1,e,t,-i,s,a,5),this.setIndex(c),this.setAttribute("position",new Rn(d,3)),this.setAttribute("normal",new Rn(u,3)),this.setAttribute("uv",new Rn(f,2));function y(g,m,h,b,v,E,_,T,A,L,w){const M=E/A,j=_/L,B=E/2,$=_/2,P=T/2,z=A+1,Z=L+1;let Y=0,ae=0;const J=new q;for(let ne=0;ne<Z;ne++){const N=ne*j-$;for(let I=0;I<z;I++){const G=I*M-B;J[g]=G*b,J[m]=N*v,J[h]=P,d.push(J.x,J.y,J.z),J[g]=0,J[m]=0,J[h]=T>0?1:-1,u.push(J.x,J.y,J.z),f.push(I/A),f.push(1-ne/L),Y+=1}}for(let ne=0;ne<L;ne++)for(let N=0;N<A;N++){const I=p+N+z*ne,G=p+N+z*(ne+1),H=p+(N+1)+z*(ne+1),ie=p+(N+1)+z*ne;c.push(I,G,ie),c.push(G,H,ie),ae+=6}o.addGroup(x,ae,w),x+=ae,p+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function dr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function Bt(n){const e={};for(let t=0;t<n.length;t++){const i=dr(n[t]);for(const s in i)e[s]=i[s]}return e}function ky(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Qh(n){return n.getRenderTarget()===null?n.outputColorSpace:dt.workingColorSpace}const Fy={clone:dr,merge:Bt};var By=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,zy=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ri extends Kr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=By,this.fragmentShader=zy,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=dr(e.uniforms),this.uniformsGroups=ky(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const l=this.uniforms[s].value;l&&l.isTexture?t.uniforms[s]={type:"t",value:l.toJSON(e).uuid}:l&&l.isColor?t.uniforms[s]={type:"c",value:l.getHex()}:l&&l.isVector2?t.uniforms[s]={type:"v2",value:l.toArray()}:l&&l.isVector3?t.uniforms[s]={type:"v3",value:l.toArray()}:l&&l.isVector4?t.uniforms[s]={type:"v4",value:l.toArray()}:l&&l.isMatrix3?t.uniforms[s]={type:"m3",value:l.toArray()}:l&&l.isMatrix4?t.uniforms[s]={type:"m4",value:l.toArray()}:t.uniforms[s]={value:l}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class ef extends Lt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new _t,this.projectionMatrix=new _t,this.projectionMatrixInverse=new _t,this.coordinateSystem=Fn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class qt extends ef{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=da*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ks*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return da*2*Math.atan(Math.tan(Ks*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,s,a,l){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ks*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,a=-.5*s;const l=this.view;if(this.view!==null&&this.view.enabled){const c=l.fullWidth,d=l.fullHeight;a+=l.offsetX*s/c,t-=l.offsetY*i/d,s*=l.width/c,i*=l.height/d}const o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const qi=-90,$i=1;class Hy extends Lt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new qt(qi,$i,e,t);s.layers=this.layers,this.add(s);const a=new qt(qi,$i,e,t);a.layers=this.layers,this.add(a);const l=new qt(qi,$i,e,t);l.layers=this.layers,this.add(l);const o=new qt(qi,$i,e,t);o.layers=this.layers,this.add(o);const c=new qt(qi,$i,e,t);c.layers=this.layers,this.add(c);const d=new qt(qi,$i,e,t);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,a,l,o,c]=t;for(const d of t)this.remove(d);if(e===Fn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),l.up.set(0,0,1),l.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ca)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),l.up.set(0,0,-1),l.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const d of t)this.add(d),d.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,l,o,c,d,u]=this.children,f=e.getRenderTarget(),p=e.getActiveCubeFace(),x=e.getActiveMipmapLevel(),y=e.xr.enabled;e.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,a),e.setRenderTarget(i,1,s),e.render(t,l),e.setRenderTarget(i,2,s),e.render(t,o),e.setRenderTarget(i,3,s),e.render(t,c),e.setRenderTarget(i,4,s),e.render(t,d),i.texture.generateMipmaps=g,e.setRenderTarget(i,5,s),e.render(t,u),e.setRenderTarget(f,p,x),e.xr.enabled=y,i.texture.needsPMREMUpdate=!0}}class tf extends Zt{constructor(e,t,i,s,a,l,o,c,d,u){e=e!==void 0?e:[],t=t!==void 0?t:ar,super(e,t,i,s,a,l,o,c,d,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Gy extends Ai{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];t.encoding!==void 0&&(Ur("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Ei?jt:dn),this.texture=new tf(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:ln}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Gn(5,5,5),a=new Ri({name:"CubemapFromEquirect",uniforms:dr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Kt,blending:ni});a.uniforms.tEquirect.value=t;const l=new mt(s,a),o=t.minFilter;return t.minFilter===Fr&&(t.minFilter=ln),new Hy(1,10,this).update(e,l),t.minFilter=o,l.geometry.dispose(),l.material.dispose(),this}clear(e,t,i,s){const a=e.getRenderTarget();for(let l=0;l<6;l++)e.setRenderTarget(this,l),e.clear(t,i,s);e.setRenderTarget(a)}}const mo=new q,Vy=new q,Wy=new nt;class Zn{constructor(e=new q(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=mo.subVectors(i,t).cross(Vy.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(mo),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return a<0||a>1?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Wy.getNormalMatrix(e),s=this.coplanarPoint(mo).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const pi=new Yr,Rs=new q;class wl{constructor(e=new Zn,t=new Zn,i=new Zn,s=new Zn,a=new Zn,l=new Zn){this.planes=[e,t,i,s,a,l]}set(e,t,i,s,a,l){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(a),o[5].copy(l),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Fn){const i=this.planes,s=e.elements,a=s[0],l=s[1],o=s[2],c=s[3],d=s[4],u=s[5],f=s[6],p=s[7],x=s[8],y=s[9],g=s[10],m=s[11],h=s[12],b=s[13],v=s[14],E=s[15];if(i[0].setComponents(c-a,p-d,m-x,E-h).normalize(),i[1].setComponents(c+a,p+d,m+x,E+h).normalize(),i[2].setComponents(c+l,p+u,m+y,E+b).normalize(),i[3].setComponents(c-l,p-u,m-y,E-b).normalize(),i[4].setComponents(c-o,p-f,m-g,E-v).normalize(),t===Fn)i[5].setComponents(c+o,p+f,m+g,E+v).normalize();else if(t===ca)i[5].setComponents(o,f,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),pi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),pi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(pi)}intersectsSprite(e){return pi.center.set(0,0,0),pi.radius=.7071067811865476,pi.applyMatrix4(e.matrixWorld),this.intersectsSphere(pi)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Rs.x=s.normal.x>0?e.max.x:e.min.x,Rs.y=s.normal.y>0?e.max.y:e.min.y,Rs.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Rs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function nf(){let n=null,e=!1,t=null,i=null;function s(a,l){t(a,l),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){n=a}}}function Xy(n,e){const t=e.isWebGL2,i=new WeakMap;function s(d,u){const f=d.array,p=d.usage,x=n.createBuffer();n.bindBuffer(u,x),n.bufferData(u,f,p),d.onUploadCallback();let y;if(f instanceof Float32Array)y=n.FLOAT;else if(f instanceof Uint16Array)if(d.isFloat16BufferAttribute)if(t)y=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else y=n.UNSIGNED_SHORT;else if(f instanceof Int16Array)y=n.SHORT;else if(f instanceof Uint32Array)y=n.UNSIGNED_INT;else if(f instanceof Int32Array)y=n.INT;else if(f instanceof Int8Array)y=n.BYTE;else if(f instanceof Uint8Array)y=n.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)y=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:x,type:y,bytesPerElement:f.BYTES_PER_ELEMENT,version:d.version}}function a(d,u,f){const p=u.array,x=u.updateRange;n.bindBuffer(f,d),x.count===-1?n.bufferSubData(f,0,p):(t?n.bufferSubData(f,x.offset*p.BYTES_PER_ELEMENT,p,x.offset,x.count):n.bufferSubData(f,x.offset*p.BYTES_PER_ELEMENT,p.subarray(x.offset,x.offset+x.count)),x.count=-1),u.onUploadCallback()}function l(d){return d.isInterleavedBufferAttribute&&(d=d.data),i.get(d)}function o(d){d.isInterleavedBufferAttribute&&(d=d.data);const u=i.get(d);u&&(n.deleteBuffer(u.buffer),i.delete(d))}function c(d,u){if(d.isGLBufferAttribute){const p=i.get(d);(!p||p.version<d.version)&&i.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}d.isInterleavedBufferAttribute&&(d=d.data);const f=i.get(d);f===void 0?i.set(d,s(d,u)):f.version<d.version&&(a(f.buffer,d,u),f.version=d.version)}return{get:l,remove:o,update:c}}class zn extends li{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const a=e/2,l=t/2,o=Math.floor(i),c=Math.floor(s),d=o+1,u=c+1,f=e/o,p=t/c,x=[],y=[],g=[],m=[];for(let h=0;h<u;h++){const b=h*p-l;for(let v=0;v<d;v++){const E=v*f-a;y.push(E,-b,0),g.push(0,0,1),m.push(v/o),m.push(1-h/c)}}for(let h=0;h<c;h++)for(let b=0;b<o;b++){const v=b+d*h,E=b+d*(h+1),_=b+1+d*(h+1),T=b+1+d*h;x.push(v,E,T),x.push(E,_,T)}this.setIndex(x),this.setAttribute("position",new Rn(y,3)),this.setAttribute("normal",new Rn(g,3)),this.setAttribute("uv",new Rn(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zn(e.width,e.height,e.widthSegments,e.heightSegments)}}var qy=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$y=`#ifdef USE_ALPHAHASH
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
#endif`,Yy=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ky=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zy=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Jy=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Qy=`#ifdef USE_AOMAP
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
#endif`,e_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,t_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,n_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,i_=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,r_=`#ifdef USE_IRIDESCENCE
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
#endif`,s_=`#ifdef USE_BUMPMAP
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
#endif`,a_=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,o_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,l_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,c_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,d_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,u_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,h_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,f_=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,p_=`#define PI 3.141592653589793
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
} // validated`,m_=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,g_=`vec3 transformedNormal = objectNormal;
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
#endif`,x_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,v_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,y_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,__=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,b_="gl_FragColor = linearToOutputTexel( gl_FragColor );",w_=`
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
}`,S_=`#ifdef USE_ENVMAP
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
#endif`,E_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,M_=`#ifdef USE_ENVMAP
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
#endif`,T_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,A_=`#ifdef USE_ENVMAP
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
#endif`,R_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,C_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,N_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,P_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,L_=`#ifdef USE_GRADIENTMAP
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
}`,j_=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,D_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,I_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,U_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,O_=`uniform bool receiveShadow;
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
#endif`,k_=`#ifdef USE_ENVMAP
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
#endif`,F_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,B_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,z_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,H_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,G_=`PhysicalMaterial material;
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
#endif`,V_=`struct PhysicalMaterial {
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
}`,W_=`
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
#endif`,X_=`#if defined( RE_IndirectDiffuse )
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
#endif`,q_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,$_=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Y_=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,K_=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Z_=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,J_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Q_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,eb=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,tb=`#if defined( USE_POINTS_UV )
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
#endif`,nb=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ib=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,rb=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,sb=`#ifdef USE_MORPHNORMALS
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
#endif`,ab=`#ifdef USE_MORPHTARGETS
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
#endif`,ob=`#ifdef USE_MORPHTARGETS
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
#endif`,lb=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,cb=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,db=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ub=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,fb=`#ifdef USE_NORMALMAP
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
#endif`,pb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,mb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,gb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,xb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,vb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,yb=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,_b=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,bb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,wb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Sb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Eb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Mb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Tb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ab=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Rb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Cb=`float getShadowMask() {
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
}`,Nb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Pb=`#ifdef USE_SKINNING
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
#endif`,Lb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,jb=`#ifdef USE_SKINNING
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
#endif`,Db=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ib=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ub=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ob=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,kb=`#ifdef USE_TRANSMISSION
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
#endif`,Fb=`#ifdef USE_TRANSMISSION
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
#endif`,Bb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Hb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Gb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Vb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Wb=`uniform sampler2D t2D;
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
}`,Xb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qb=`#ifdef ENVMAP_TYPE_CUBE
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
}`,$b=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kb=`#include <common>
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
}`,Zb=`#if DEPTH_PACKING == 3200
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
}`,Jb=`#define DISTANCE
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
}`,Qb=`#define DISTANCE
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
}`,e1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,t1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,n1=`uniform float scale;
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
}`,i1=`uniform vec3 diffuse;
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
}`,r1=`#include <common>
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
}`,s1=`uniform vec3 diffuse;
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
}`,a1=`#define LAMBERT
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
}`,o1=`#define LAMBERT
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
}`,l1=`#define MATCAP
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
}`,c1=`#define MATCAP
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
}`,d1=`#define NORMAL
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
}`,u1=`#define NORMAL
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
}`,h1=`#define PHONG
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
}`,f1=`#define PHONG
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
}`,p1=`#define STANDARD
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
}`,m1=`#define STANDARD
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
}`,g1=`#define TOON
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
}`,x1=`#define TOON
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
}`,v1=`uniform float size;
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
}`,y1=`uniform vec3 diffuse;
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
}`,_1=`#include <common>
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
}`,b1=`uniform vec3 color;
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
}`,w1=`uniform float rotation;
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
}`,S1=`uniform vec3 diffuse;
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
}`,et={alphahash_fragment:qy,alphahash_pars_fragment:$y,alphamap_fragment:Yy,alphamap_pars_fragment:Ky,alphatest_fragment:Zy,alphatest_pars_fragment:Jy,aomap_fragment:Qy,aomap_pars_fragment:e_,begin_vertex:t_,beginnormal_vertex:n_,bsdfs:i_,iridescence_fragment:r_,bumpmap_pars_fragment:s_,clipping_planes_fragment:a_,clipping_planes_pars_fragment:o_,clipping_planes_pars_vertex:l_,clipping_planes_vertex:c_,color_fragment:d_,color_pars_fragment:u_,color_pars_vertex:h_,color_vertex:f_,common:p_,cube_uv_reflection_fragment:m_,defaultnormal_vertex:g_,displacementmap_pars_vertex:x_,displacementmap_vertex:v_,emissivemap_fragment:y_,emissivemap_pars_fragment:__,colorspace_fragment:b_,colorspace_pars_fragment:w_,envmap_fragment:S_,envmap_common_pars_fragment:E_,envmap_pars_fragment:M_,envmap_pars_vertex:T_,envmap_physical_pars_fragment:k_,envmap_vertex:A_,fog_vertex:R_,fog_pars_vertex:C_,fog_fragment:N_,fog_pars_fragment:P_,gradientmap_pars_fragment:L_,lightmap_fragment:j_,lightmap_pars_fragment:D_,lights_lambert_fragment:I_,lights_lambert_pars_fragment:U_,lights_pars_begin:O_,lights_toon_fragment:F_,lights_toon_pars_fragment:B_,lights_phong_fragment:z_,lights_phong_pars_fragment:H_,lights_physical_fragment:G_,lights_physical_pars_fragment:V_,lights_fragment_begin:W_,lights_fragment_maps:X_,lights_fragment_end:q_,logdepthbuf_fragment:$_,logdepthbuf_pars_fragment:Y_,logdepthbuf_pars_vertex:K_,logdepthbuf_vertex:Z_,map_fragment:J_,map_pars_fragment:Q_,map_particle_fragment:eb,map_particle_pars_fragment:tb,metalnessmap_fragment:nb,metalnessmap_pars_fragment:ib,morphcolor_vertex:rb,morphnormal_vertex:sb,morphtarget_pars_vertex:ab,morphtarget_vertex:ob,normal_fragment_begin:lb,normal_fragment_maps:cb,normal_pars_fragment:db,normal_pars_vertex:ub,normal_vertex:hb,normalmap_pars_fragment:fb,clearcoat_normal_fragment_begin:pb,clearcoat_normal_fragment_maps:mb,clearcoat_pars_fragment:gb,iridescence_pars_fragment:xb,opaque_fragment:vb,packing:yb,premultiplied_alpha_fragment:_b,project_vertex:bb,dithering_fragment:wb,dithering_pars_fragment:Sb,roughnessmap_fragment:Eb,roughnessmap_pars_fragment:Mb,shadowmap_pars_fragment:Tb,shadowmap_pars_vertex:Ab,shadowmap_vertex:Rb,shadowmask_pars_fragment:Cb,skinbase_vertex:Nb,skinning_pars_vertex:Pb,skinning_vertex:Lb,skinnormal_vertex:jb,specularmap_fragment:Db,specularmap_pars_fragment:Ib,tonemapping_fragment:Ub,tonemapping_pars_fragment:Ob,transmission_fragment:kb,transmission_pars_fragment:Fb,uv_pars_fragment:Bb,uv_pars_vertex:zb,uv_vertex:Hb,worldpos_vertex:Gb,background_vert:Vb,background_frag:Wb,backgroundCube_vert:Xb,backgroundCube_frag:qb,cube_vert:$b,cube_frag:Yb,depth_vert:Kb,depth_frag:Zb,distanceRGBA_vert:Jb,distanceRGBA_frag:Qb,equirect_vert:e1,equirect_frag:t1,linedashed_vert:n1,linedashed_frag:i1,meshbasic_vert:r1,meshbasic_frag:s1,meshlambert_vert:a1,meshlambert_frag:o1,meshmatcap_vert:l1,meshmatcap_frag:c1,meshnormal_vert:d1,meshnormal_frag:u1,meshphong_vert:h1,meshphong_frag:f1,meshphysical_vert:p1,meshphysical_frag:m1,meshtoon_vert:g1,meshtoon_frag:x1,points_vert:v1,points_frag:y1,shadow_vert:_1,shadow_frag:b1,sprite_vert:w1,sprite_frag:S1},ye={common:{diffuse:{value:new ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new nt},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new nt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new nt},normalScale:{value:new $e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0},uvTransform:{value:new nt}},sprite:{diffuse:{value:new ot(16777215)},opacity:{value:1},center:{value:new $e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new nt},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0}}},En={basic:{uniforms:Bt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:et.meshbasic_vert,fragmentShader:et.meshbasic_frag},lambert:{uniforms:Bt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new ot(0)}}]),vertexShader:et.meshlambert_vert,fragmentShader:et.meshlambert_frag},phong:{uniforms:Bt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new ot(0)},specular:{value:new ot(1118481)},shininess:{value:30}}]),vertexShader:et.meshphong_vert,fragmentShader:et.meshphong_frag},standard:{uniforms:Bt([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag},toon:{uniforms:Bt([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new ot(0)}}]),vertexShader:et.meshtoon_vert,fragmentShader:et.meshtoon_frag},matcap:{uniforms:Bt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:et.meshmatcap_vert,fragmentShader:et.meshmatcap_frag},points:{uniforms:Bt([ye.points,ye.fog]),vertexShader:et.points_vert,fragmentShader:et.points_frag},dashed:{uniforms:Bt([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:et.linedashed_vert,fragmentShader:et.linedashed_frag},depth:{uniforms:Bt([ye.common,ye.displacementmap]),vertexShader:et.depth_vert,fragmentShader:et.depth_frag},normal:{uniforms:Bt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:et.meshnormal_vert,fragmentShader:et.meshnormal_frag},sprite:{uniforms:Bt([ye.sprite,ye.fog]),vertexShader:et.sprite_vert,fragmentShader:et.sprite_frag},background:{uniforms:{uvTransform:{value:new nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:et.background_vert,fragmentShader:et.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:et.backgroundCube_vert,fragmentShader:et.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:et.cube_vert,fragmentShader:et.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:et.equirect_vert,fragmentShader:et.equirect_frag},distanceRGBA:{uniforms:Bt([ye.common,ye.displacementmap,{referencePosition:{value:new q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:et.distanceRGBA_vert,fragmentShader:et.distanceRGBA_frag},shadow:{uniforms:Bt([ye.lights,ye.fog,{color:{value:new ot(0)},opacity:{value:1}}]),vertexShader:et.shadow_vert,fragmentShader:et.shadow_frag}};En.physical={uniforms:Bt([En.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new nt},clearcoatNormalScale:{value:new $e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new nt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new nt},sheen:{value:0},sheenColor:{value:new ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new nt},transmissionSamplerSize:{value:new $e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new nt},attenuationDistance:{value:0},attenuationColor:{value:new ot(0)},specularColor:{value:new ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new nt},anisotropyVector:{value:new $e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new nt}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag};const Cs={r:0,b:0,g:0};function E1(n,e,t,i,s,a,l){const o=new ot(0);let c=a===!0?0:1,d,u,f=null,p=0,x=null;function y(m,h){let b=!1,v=h.isScene===!0?h.background:null;v&&v.isTexture&&(v=(h.backgroundBlurriness>0?t:e).get(v)),v===null?g(o,c):v&&v.isColor&&(g(v,1),b=!0);const E=n.xr.getEnvironmentBlendMode();E==="additive"?i.buffers.color.setClear(0,0,0,1,l):E==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,l),(n.autoClear||b)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),v&&(v.isCubeTexture||v.mapping===Sa)?(u===void 0&&(u=new mt(new Gn(1,1,1),new Ri({name:"BackgroundCubeMaterial",uniforms:dr(En.backgroundCube.uniforms),vertexShader:En.backgroundCube.vertexShader,fragmentShader:En.backgroundCube.fragmentShader,side:Kt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(_,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=h.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=h.backgroundIntensity,u.material.toneMapped=dt.getTransfer(v.colorSpace)!==pt,(f!==v||p!==v.version||x!==n.toneMapping)&&(u.material.needsUpdate=!0,f=v,p=v.version,x=n.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(d===void 0&&(d=new mt(new zn(2,2),new Ri({name:"BackgroundMaterial",uniforms:dr(En.background.uniforms),vertexShader:En.background.vertexShader,fragmentShader:En.background.fragmentShader,side:ai,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),Object.defineProperty(d.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(d)),d.material.uniforms.t2D.value=v,d.material.uniforms.backgroundIntensity.value=h.backgroundIntensity,d.material.toneMapped=dt.getTransfer(v.colorSpace)!==pt,v.matrixAutoUpdate===!0&&v.updateMatrix(),d.material.uniforms.uvTransform.value.copy(v.matrix),(f!==v||p!==v.version||x!==n.toneMapping)&&(d.material.needsUpdate=!0,f=v,p=v.version,x=n.toneMapping),d.layers.enableAll(),m.unshift(d,d.geometry,d.material,0,0,null))}function g(m,h){m.getRGB(Cs,Qh(n)),i.buffers.color.setClear(Cs.r,Cs.g,Cs.b,h,l)}return{getClearColor:function(){return o},setClearColor:function(m,h=1){o.set(m),c=h,g(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,g(o,c)},render:y}}function M1(n,e,t,i){const s=n.getParameter(n.MAX_VERTEX_ATTRIBS),a=i.isWebGL2?null:e.get("OES_vertex_array_object"),l=i.isWebGL2||a!==null,o={},c=m(null);let d=c,u=!1;function f(P,z,Z,Y,ae){let J=!1;if(l){const ne=g(Y,Z,z);d!==ne&&(d=ne,x(d.object)),J=h(P,Y,Z,ae),J&&b(P,Y,Z,ae)}else{const ne=z.wireframe===!0;(d.geometry!==Y.id||d.program!==Z.id||d.wireframe!==ne)&&(d.geometry=Y.id,d.program=Z.id,d.wireframe=ne,J=!0)}ae!==null&&t.update(ae,n.ELEMENT_ARRAY_BUFFER),(J||u)&&(u=!1,L(P,z,Z,Y),ae!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(ae).buffer))}function p(){return i.isWebGL2?n.createVertexArray():a.createVertexArrayOES()}function x(P){return i.isWebGL2?n.bindVertexArray(P):a.bindVertexArrayOES(P)}function y(P){return i.isWebGL2?n.deleteVertexArray(P):a.deleteVertexArrayOES(P)}function g(P,z,Z){const Y=Z.wireframe===!0;let ae=o[P.id];ae===void 0&&(ae={},o[P.id]=ae);let J=ae[z.id];J===void 0&&(J={},ae[z.id]=J);let ne=J[Y];return ne===void 0&&(ne=m(p()),J[Y]=ne),ne}function m(P){const z=[],Z=[],Y=[];for(let ae=0;ae<s;ae++)z[ae]=0,Z[ae]=0,Y[ae]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:Z,attributeDivisors:Y,object:P,attributes:{},index:null}}function h(P,z,Z,Y){const ae=d.attributes,J=z.attributes;let ne=0;const N=Z.getAttributes();for(const I in N)if(N[I].location>=0){const H=ae[I];let ie=J[I];if(ie===void 0&&(I==="instanceMatrix"&&P.instanceMatrix&&(ie=P.instanceMatrix),I==="instanceColor"&&P.instanceColor&&(ie=P.instanceColor)),H===void 0||H.attribute!==ie||ie&&H.data!==ie.data)return!0;ne++}return d.attributesNum!==ne||d.index!==Y}function b(P,z,Z,Y){const ae={},J=z.attributes;let ne=0;const N=Z.getAttributes();for(const I in N)if(N[I].location>=0){let H=J[I];H===void 0&&(I==="instanceMatrix"&&P.instanceMatrix&&(H=P.instanceMatrix),I==="instanceColor"&&P.instanceColor&&(H=P.instanceColor));const ie={};ie.attribute=H,H&&H.data&&(ie.data=H.data),ae[I]=ie,ne++}d.attributes=ae,d.attributesNum=ne,d.index=Y}function v(){const P=d.newAttributes;for(let z=0,Z=P.length;z<Z;z++)P[z]=0}function E(P){_(P,0)}function _(P,z){const Z=d.newAttributes,Y=d.enabledAttributes,ae=d.attributeDivisors;Z[P]=1,Y[P]===0&&(n.enableVertexAttribArray(P),Y[P]=1),ae[P]!==z&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,z),ae[P]=z)}function T(){const P=d.newAttributes,z=d.enabledAttributes;for(let Z=0,Y=z.length;Z<Y;Z++)z[Z]!==P[Z]&&(n.disableVertexAttribArray(Z),z[Z]=0)}function A(P,z,Z,Y,ae,J,ne){ne===!0?n.vertexAttribIPointer(P,z,Z,ae,J):n.vertexAttribPointer(P,z,Z,Y,ae,J)}function L(P,z,Z,Y){if(i.isWebGL2===!1&&(P.isInstancedMesh||Y.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const ae=Y.attributes,J=Z.getAttributes(),ne=z.defaultAttributeValues;for(const N in J){const I=J[N];if(I.location>=0){let G=ae[N];if(G===void 0&&(N==="instanceMatrix"&&P.instanceMatrix&&(G=P.instanceMatrix),N==="instanceColor"&&P.instanceColor&&(G=P.instanceColor)),G!==void 0){const H=G.normalized,ie=G.itemSize,F=t.get(G);if(F===void 0)continue;const ve=F.buffer,Q=F.type,Ee=F.bytesPerElement,Te=i.isWebGL2===!0&&(Q===n.INT||Q===n.UNSIGNED_INT||G.gpuType===Oh);if(G.isInterleavedBufferAttribute){const oe=G.data,U=oe.stride,Ze=G.offset;if(oe.isInstancedInterleavedBuffer){for(let _e=0;_e<I.locationSize;_e++)_(I.location+_e,oe.meshPerAttribute);P.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let _e=0;_e<I.locationSize;_e++)E(I.location+_e);n.bindBuffer(n.ARRAY_BUFFER,ve);for(let _e=0;_e<I.locationSize;_e++)A(I.location+_e,ie/I.locationSize,Q,H,U*Ee,(Ze+ie/I.locationSize*_e)*Ee,Te)}else{if(G.isInstancedBufferAttribute){for(let oe=0;oe<I.locationSize;oe++)_(I.location+oe,G.meshPerAttribute);P.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=G.meshPerAttribute*G.count)}else for(let oe=0;oe<I.locationSize;oe++)E(I.location+oe);n.bindBuffer(n.ARRAY_BUFFER,ve);for(let oe=0;oe<I.locationSize;oe++)A(I.location+oe,ie/I.locationSize,Q,H,ie*Ee,ie/I.locationSize*oe*Ee,Te)}}else if(ne!==void 0){const H=ne[N];if(H!==void 0)switch(H.length){case 2:n.vertexAttrib2fv(I.location,H);break;case 3:n.vertexAttrib3fv(I.location,H);break;case 4:n.vertexAttrib4fv(I.location,H);break;default:n.vertexAttrib1fv(I.location,H)}}}}T()}function w(){B();for(const P in o){const z=o[P];for(const Z in z){const Y=z[Z];for(const ae in Y)y(Y[ae].object),delete Y[ae];delete z[Z]}delete o[P]}}function M(P){if(o[P.id]===void 0)return;const z=o[P.id];for(const Z in z){const Y=z[Z];for(const ae in Y)y(Y[ae].object),delete Y[ae];delete z[Z]}delete o[P.id]}function j(P){for(const z in o){const Z=o[z];if(Z[P.id]===void 0)continue;const Y=Z[P.id];for(const ae in Y)y(Y[ae].object),delete Y[ae];delete Z[P.id]}}function B(){$(),u=!0,d!==c&&(d=c,x(d.object))}function $(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:f,reset:B,resetDefaultState:$,dispose:w,releaseStatesOfGeometry:M,releaseStatesOfProgram:j,initAttributes:v,enableAttribute:E,disableUnusedAttributes:T}}function T1(n,e,t,i){const s=i.isWebGL2;let a;function l(d){a=d}function o(d,u){n.drawArrays(a,d,u),t.update(u,a,1)}function c(d,u,f){if(f===0)return;let p,x;if(s)p=n,x="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),x="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[x](a,d,u,f),t.update(u,a,f)}this.setMode=l,this.render=o,this.renderInstances=c}function A1(n,e,t){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const l=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const c=a(o);c!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",c,"instead."),o=c);const d=l||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),y=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),m=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),h=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),v=p>0,E=l||e.has("OES_texture_float"),_=v&&E,T=l?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:l,drawBuffers:d,getMaxAnisotropy:s,getMaxPrecision:a,precision:o,logarithmicDepthBuffer:u,maxTextures:f,maxVertexTextures:p,maxTextureSize:x,maxCubemapSize:y,maxAttributes:g,maxVertexUniforms:m,maxVaryings:h,maxFragmentUniforms:b,vertexTextures:v,floatFragmentTextures:E,floatVertexTextures:_,maxSamples:T}}function R1(n){const e=this;let t=null,i=0,s=!1,a=!1;const l=new Zn,o=new nt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,p){const x=f.length!==0||p||i!==0||s;return s=p,i=f.length,x},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(f,p){t=u(f,p,0)},this.setState=function(f,p,x){const y=f.clippingPlanes,g=f.clipIntersection,m=f.clipShadows,h=n.get(f);if(!s||y===null||y.length===0||a&&!m)a?u(null):d();else{const b=a?0:i,v=b*4;let E=h.clippingState||null;c.value=E,E=u(y,p,v,x);for(let _=0;_!==v;++_)E[_]=t[_];h.clippingState=E,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=b}};function d(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,p,x,y){const g=f!==null?f.length:0;let m=null;if(g!==0){if(m=c.value,y!==!0||m===null){const h=x+g*4,b=p.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<h)&&(m=new Float32Array(h));for(let v=0,E=x;v!==g;++v,E+=4)l.copy(f[v]).applyMatrix4(b,o),l.normal.toArray(m,E),m[E+3]=l.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function C1(n){let e=new WeakMap;function t(l,o){return o===$o?l.mapping=ar:o===Yo&&(l.mapping=or),l}function i(l){if(l&&l.isTexture&&l.isRenderTargetTexture===!1){const o=l.mapping;if(o===$o||o===Yo)if(e.has(l)){const c=e.get(l).texture;return t(c,l.mapping)}else{const c=l.image;if(c&&c.height>0){const d=new Gy(c.height/2);return d.fromEquirectangularTexture(n,l),e.set(l,d),l.addEventListener("dispose",s),t(d.texture,l.mapping)}else return null}}return l}function s(l){const o=l.target;o.removeEventListener("dispose",s);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function a(){e=new WeakMap}return{get:i,dispose:a}}class rf extends ef{constructor(e=-1,t=1,i=1,s=-1,a=.1,l=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=a,this.far=l,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,a,l){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let a=i-e,l=i+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=d*this.view.offsetX,l=a+d*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(a,l,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ji=4,wd=[.125,.215,.35,.446,.526,.582],vi=20,go=new rf,Sd=new ot;let xo=null,vo=0,yo=0;const gi=(1+Math.sqrt(5))/2,Yi=1/gi,Ed=[new q(1,1,1),new q(-1,1,1),new q(1,1,-1),new q(-1,1,-1),new q(0,gi,Yi),new q(0,gi,-Yi),new q(Yi,0,gi),new q(-Yi,0,gi),new q(gi,Yi,0),new q(-gi,Yi,0)];class Md{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100){xo=this._renderer.getRenderTarget(),vo=this._renderer.getActiveCubeFace(),yo=this._renderer.getActiveMipmapLevel(),this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(e,i,s,a),t>0&&this._blur(a,0,0,t),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Rd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ad(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(xo,vo,yo),e.scissorTest=!1,Ns(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ar||e.mapping===or?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),xo=this._renderer.getRenderTarget(),vo=this._renderer.getActiveCubeFace(),yo=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:ln,minFilter:ln,generateMipmaps:!1,type:Br,format:_n,colorSpace:Hn,depthBuffer:!1},s=Td(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Td(e,t,i);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=N1(a)),this._blurMaterial=P1(a,e,t)}return s}_compileMaterial(e){const t=new mt(this._lodPlanes[0],e);this._renderer.compile(t,go)}_sceneToCubeUV(e,t,i,s){const o=new qt(90,1,t,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,p=u.toneMapping;u.getClearColor(Sd),u.toneMapping=ii,u.autoClear=!1;const x=new Kh({name:"PMREM.Background",side:Kt,depthWrite:!1,depthTest:!1}),y=new mt(new Gn,x);let g=!1;const m=e.background;m?m.isColor&&(x.color.copy(m),e.background=null,g=!0):(x.color.copy(Sd),g=!0);for(let h=0;h<6;h++){const b=h%3;b===0?(o.up.set(0,c[h],0),o.lookAt(d[h],0,0)):b===1?(o.up.set(0,0,c[h]),o.lookAt(0,d[h],0)):(o.up.set(0,c[h],0),o.lookAt(0,0,d[h]));const v=this._cubeSize;Ns(s,b*v,h>2?v:0,v,v),u.setRenderTarget(s),g&&u.render(y,o),u.render(e,o)}y.geometry.dispose(),y.material.dispose(),u.toneMapping=p,u.autoClear=f,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===ar||e.mapping===or;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Rd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ad());const a=s?this._cubemapMaterial:this._equirectMaterial,l=new mt(this._lodPlanes[0],a),o=a.uniforms;o.envMap.value=e;const c=this._cubeSize;Ns(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(l,go)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),l=Ed[(s-1)%Ed.length];this._blur(e,s-1,s,a,l)}t.autoClear=i}_blur(e,t,i,s,a){const l=this._pingPongRenderTarget;this._halfBlur(e,l,t,i,s,"latitudinal",a),this._halfBlur(l,e,i,i,s,"longitudinal",a)}_halfBlur(e,t,i,s,a,l,o){const c=this._renderer,d=this._blurMaterial;l!=="latitudinal"&&l!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new mt(this._lodPlanes[s],d),p=d.uniforms,x=this._sizeLods[i]-1,y=isFinite(a)?Math.PI/(2*x):2*Math.PI/(2*vi-1),g=a/y,m=isFinite(a)?1+Math.floor(u*g):vi;m>vi&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${vi}`);const h=[];let b=0;for(let A=0;A<vi;++A){const L=A/g,w=Math.exp(-L*L/2);h.push(w),A===0?b+=w:A<m&&(b+=2*w)}for(let A=0;A<h.length;A++)h[A]=h[A]/b;p.envMap.value=e.texture,p.samples.value=m,p.weights.value=h,p.latitudinal.value=l==="latitudinal",o&&(p.poleAxis.value=o);const{_lodMax:v}=this;p.dTheta.value=y,p.mipInt.value=v-i;const E=this._sizeLods[s],_=3*E*(s>v-Ji?s-v+Ji:0),T=4*(this._cubeSize-E);Ns(t,_,T,3*E,2*E),c.setRenderTarget(t),c.render(f,go)}}function N1(n){const e=[],t=[],i=[];let s=n;const a=n-Ji+1+wd.length;for(let l=0;l<a;l++){const o=Math.pow(2,s);t.push(o);let c=1/o;l>n-Ji?c=wd[l-n+Ji-1]:l===0&&(c=0),i.push(c);const d=1/(o-2),u=-d,f=1+d,p=[u,u,f,u,f,f,u,u,f,f,u,f],x=6,y=6,g=3,m=2,h=1,b=new Float32Array(g*y*x),v=new Float32Array(m*y*x),E=new Float32Array(h*y*x);for(let T=0;T<x;T++){const A=T%3*2/3-1,L=T>2?0:-1,w=[A,L,0,A+2/3,L,0,A+2/3,L+1,0,A,L,0,A+2/3,L+1,0,A,L+1,0];b.set(w,g*y*T),v.set(p,m*y*T);const M=[T,T,T,T,T,T];E.set(M,h*y*T)}const _=new li;_.setAttribute("position",new bn(b,g)),_.setAttribute("uv",new bn(v,m)),_.setAttribute("faceIndex",new bn(E,h)),e.push(_),s>Ji&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Td(n,e,t){const i=new Ai(n,e,t);return i.texture.mapping=Sa,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ns(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function P1(n,e,t){const i=new Float32Array(vi),s=new q(0,1,0);return new Ri({name:"SphericalGaussianBlur",defines:{n:vi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Sl(),fragmentShader:`

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
		`,blending:ni,depthTest:!1,depthWrite:!1})}function Ad(){return new Ri({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Sl(),fragmentShader:`

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
		`,blending:ni,depthTest:!1,depthWrite:!1})}function Rd(){return new Ri({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ni,depthTest:!1,depthWrite:!1})}function Sl(){return`

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
	`}function L1(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const c=o.mapping,d=c===$o||c===Yo,u=c===ar||c===or;if(d||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let f=e.get(o);return t===null&&(t=new Md(n)),f=d?t.fromEquirectangular(o,f):t.fromCubemap(o,f),e.set(o,f),f.texture}else{if(e.has(o))return e.get(o).texture;{const f=o.image;if(d&&f&&f.height>0||u&&f&&s(f)){t===null&&(t=new Md(n));const p=d?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,p),o.addEventListener("dispose",a),p.texture}else return null}}}return o}function s(o){let c=0;const d=6;for(let u=0;u<d;u++)o[u]!==void 0&&c++;return c===d}function a(o){const c=o.target;c.removeEventListener("dispose",a);const d=e.get(c);d!==void 0&&(e.delete(c),d.dispose())}function l(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:l}}function j1(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const s=t(i);return s===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function D1(n,e,t,i){const s={},a=new WeakMap;function l(f){const p=f.target;p.index!==null&&e.remove(p.index);for(const y in p.attributes)e.remove(p.attributes[y]);for(const y in p.morphAttributes){const g=p.morphAttributes[y];for(let m=0,h=g.length;m<h;m++)e.remove(g[m])}p.removeEventListener("dispose",l),delete s[p.id];const x=a.get(p);x&&(e.remove(x),a.delete(p)),i.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function o(f,p){return s[p.id]===!0||(p.addEventListener("dispose",l),s[p.id]=!0,t.memory.geometries++),p}function c(f){const p=f.attributes;for(const y in p)e.update(p[y],n.ARRAY_BUFFER);const x=f.morphAttributes;for(const y in x){const g=x[y];for(let m=0,h=g.length;m<h;m++)e.update(g[m],n.ARRAY_BUFFER)}}function d(f){const p=[],x=f.index,y=f.attributes.position;let g=0;if(x!==null){const b=x.array;g=x.version;for(let v=0,E=b.length;v<E;v+=3){const _=b[v+0],T=b[v+1],A=b[v+2];p.push(_,T,T,A,A,_)}}else if(y!==void 0){const b=y.array;g=y.version;for(let v=0,E=b.length/3-1;v<E;v+=3){const _=v+0,T=v+1,A=v+2;p.push(_,T,T,A,A,_)}}else return;const m=new(Wh(p)?Jh:Zh)(p,1);m.version=g;const h=a.get(f);h&&e.remove(h),a.set(f,m)}function u(f){const p=a.get(f);if(p){const x=f.index;x!==null&&p.version<x.version&&d(f)}else d(f);return a.get(f)}return{get:o,update:c,getWireframeAttribute:u}}function I1(n,e,t,i){const s=i.isWebGL2;let a;function l(p){a=p}let o,c;function d(p){o=p.type,c=p.bytesPerElement}function u(p,x){n.drawElements(a,x,o,p*c),t.update(x,a,1)}function f(p,x,y){if(y===0)return;let g,m;if(s)g=n,m="drawElementsInstanced";else if(g=e.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",g===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}g[m](a,x,o,p*c,y),t.update(x,a,y)}this.setMode=l,this.setIndex=d,this.render=u,this.renderInstances=f}function U1(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,l,o){switch(t.calls++,l){case n.TRIANGLES:t.triangles+=o*(a/3);break;case n.LINES:t.lines+=o*(a/2);break;case n.LINE_STRIP:t.lines+=o*(a-1);break;case n.LINE_LOOP:t.lines+=o*a;break;case n.POINTS:t.points+=o*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",l);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function O1(n,e){return n[0]-e[0]}function k1(n,e){return Math.abs(e[1])-Math.abs(n[1])}function F1(n,e,t){const i={},s=new Float32Array(8),a=new WeakMap,l=new Pt,o=[];for(let d=0;d<8;d++)o[d]=[d,0];function c(d,u,f){const p=d.morphTargetInfluences;if(e.isWebGL2===!0){const x=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,y=x!==void 0?x.length:0;let g=a.get(u);if(g===void 0||g.count!==y){let P=function(){B.dispose(),a.delete(u),u.removeEventListener("dispose",P)};g!==void 0&&g.texture.dispose();const b=u.morphAttributes.position!==void 0,v=u.morphAttributes.normal!==void 0,E=u.morphAttributes.color!==void 0,_=u.morphAttributes.position||[],T=u.morphAttributes.normal||[],A=u.morphAttributes.color||[];let L=0;b===!0&&(L=1),v===!0&&(L=2),E===!0&&(L=3);let w=u.attributes.position.count*L,M=1;w>e.maxTextureSize&&(M=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const j=new Float32Array(w*M*4*y),B=new $h(j,w,M,y);B.type=Qn,B.needsUpdate=!0;const $=L*4;for(let z=0;z<y;z++){const Z=_[z],Y=T[z],ae=A[z],J=w*M*4*z;for(let ne=0;ne<Z.count;ne++){const N=ne*$;b===!0&&(l.fromBufferAttribute(Z,ne),j[J+N+0]=l.x,j[J+N+1]=l.y,j[J+N+2]=l.z,j[J+N+3]=0),v===!0&&(l.fromBufferAttribute(Y,ne),j[J+N+4]=l.x,j[J+N+5]=l.y,j[J+N+6]=l.z,j[J+N+7]=0),E===!0&&(l.fromBufferAttribute(ae,ne),j[J+N+8]=l.x,j[J+N+9]=l.y,j[J+N+10]=l.z,j[J+N+11]=ae.itemSize===4?l.w:1)}}g={count:y,texture:B,size:new $e(w,M)},a.set(u,g),u.addEventListener("dispose",P)}let m=0;for(let b=0;b<p.length;b++)m+=p[b];const h=u.morphTargetsRelative?1:1-m;f.getUniforms().setValue(n,"morphTargetBaseInfluence",h),f.getUniforms().setValue(n,"morphTargetInfluences",p),f.getUniforms().setValue(n,"morphTargetsTexture",g.texture,t),f.getUniforms().setValue(n,"morphTargetsTextureSize",g.size)}else{const x=p===void 0?0:p.length;let y=i[u.id];if(y===void 0||y.length!==x){y=[];for(let v=0;v<x;v++)y[v]=[v,0];i[u.id]=y}for(let v=0;v<x;v++){const E=y[v];E[0]=v,E[1]=p[v]}y.sort(k1);for(let v=0;v<8;v++)v<x&&y[v][1]?(o[v][0]=y[v][0],o[v][1]=y[v][1]):(o[v][0]=Number.MAX_SAFE_INTEGER,o[v][1]=0);o.sort(O1);const g=u.morphAttributes.position,m=u.morphAttributes.normal;let h=0;for(let v=0;v<8;v++){const E=o[v],_=E[0],T=E[1];_!==Number.MAX_SAFE_INTEGER&&T?(g&&u.getAttribute("morphTarget"+v)!==g[_]&&u.setAttribute("morphTarget"+v,g[_]),m&&u.getAttribute("morphNormal"+v)!==m[_]&&u.setAttribute("morphNormal"+v,m[_]),s[v]=T,h+=T):(g&&u.hasAttribute("morphTarget"+v)===!0&&u.deleteAttribute("morphTarget"+v),m&&u.hasAttribute("morphNormal"+v)===!0&&u.deleteAttribute("morphNormal"+v),s[v]=0)}const b=u.morphTargetsRelative?1:1-h;f.getUniforms().setValue(n,"morphTargetBaseInfluence",b),f.getUniforms().setValue(n,"morphTargetInfluences",s)}}return{update:c}}function B1(n,e,t,i){let s=new WeakMap;function a(c){const d=i.render.frame,u=c.geometry,f=e.get(c,u);if(s.get(f)!==d&&(e.update(f),s.set(f,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==d&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,d))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==d&&(p.update(),s.set(p,d))}return f}function l(){s=new WeakMap}function o(c){const d=c.target;d.removeEventListener("dispose",o),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:l}}const sf=new Zt,af=new $h,of=new Ty,lf=new tf,Cd=[],Nd=[],Pd=new Float32Array(16),Ld=new Float32Array(9),jd=new Float32Array(4);function pr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let a=Cd[s];if(a===void 0&&(a=new Float32Array(s),Cd[s]=a),e!==0){i.toArray(a,0);for(let l=1,o=0;l!==e;++l)o+=t,n[l].toArray(a,o)}return a}function At(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Rt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Ma(n,e){let t=Nd[e];t===void 0&&(t=new Int32Array(e),Nd[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function z1(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function H1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;n.uniform2fv(this.addr,e),Rt(t,e)}}function G1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(At(t,e))return;n.uniform3fv(this.addr,e),Rt(t,e)}}function V1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;n.uniform4fv(this.addr,e),Rt(t,e)}}function W1(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(At(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Rt(t,e)}else{if(At(t,i))return;jd.set(i),n.uniformMatrix2fv(this.addr,!1,jd),Rt(t,i)}}function X1(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(At(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Rt(t,e)}else{if(At(t,i))return;Ld.set(i),n.uniformMatrix3fv(this.addr,!1,Ld),Rt(t,i)}}function q1(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(At(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Rt(t,e)}else{if(At(t,i))return;Pd.set(i),n.uniformMatrix4fv(this.addr,!1,Pd),Rt(t,i)}}function $1(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Y1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;n.uniform2iv(this.addr,e),Rt(t,e)}}function K1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(At(t,e))return;n.uniform3iv(this.addr,e),Rt(t,e)}}function Z1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;n.uniform4iv(this.addr,e),Rt(t,e)}}function J1(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Q1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;n.uniform2uiv(this.addr,e),Rt(t,e)}}function ew(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(At(t,e))return;n.uniform3uiv(this.addr,e),Rt(t,e)}}function tw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;n.uniform4uiv(this.addr,e),Rt(t,e)}}function nw(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2D(e||sf,s)}function iw(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||of,s)}function rw(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||lf,s)}function sw(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||af,s)}function aw(n){switch(n){case 5126:return z1;case 35664:return H1;case 35665:return G1;case 35666:return V1;case 35674:return W1;case 35675:return X1;case 35676:return q1;case 5124:case 35670:return $1;case 35667:case 35671:return Y1;case 35668:case 35672:return K1;case 35669:case 35673:return Z1;case 5125:return J1;case 36294:return Q1;case 36295:return ew;case 36296:return tw;case 35678:case 36198:case 36298:case 36306:case 35682:return nw;case 35679:case 36299:case 36307:return iw;case 35680:case 36300:case 36308:case 36293:return rw;case 36289:case 36303:case 36311:case 36292:return sw}}function ow(n,e){n.uniform1fv(this.addr,e)}function lw(n,e){const t=pr(e,this.size,2);n.uniform2fv(this.addr,t)}function cw(n,e){const t=pr(e,this.size,3);n.uniform3fv(this.addr,t)}function dw(n,e){const t=pr(e,this.size,4);n.uniform4fv(this.addr,t)}function uw(n,e){const t=pr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function hw(n,e){const t=pr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function fw(n,e){const t=pr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function pw(n,e){n.uniform1iv(this.addr,e)}function mw(n,e){n.uniform2iv(this.addr,e)}function gw(n,e){n.uniform3iv(this.addr,e)}function xw(n,e){n.uniform4iv(this.addr,e)}function vw(n,e){n.uniform1uiv(this.addr,e)}function yw(n,e){n.uniform2uiv(this.addr,e)}function _w(n,e){n.uniform3uiv(this.addr,e)}function bw(n,e){n.uniform4uiv(this.addr,e)}function ww(n,e,t){const i=this.cache,s=e.length,a=Ma(t,s);At(i,a)||(n.uniform1iv(this.addr,a),Rt(i,a));for(let l=0;l!==s;++l)t.setTexture2D(e[l]||sf,a[l])}function Sw(n,e,t){const i=this.cache,s=e.length,a=Ma(t,s);At(i,a)||(n.uniform1iv(this.addr,a),Rt(i,a));for(let l=0;l!==s;++l)t.setTexture3D(e[l]||of,a[l])}function Ew(n,e,t){const i=this.cache,s=e.length,a=Ma(t,s);At(i,a)||(n.uniform1iv(this.addr,a),Rt(i,a));for(let l=0;l!==s;++l)t.setTextureCube(e[l]||lf,a[l])}function Mw(n,e,t){const i=this.cache,s=e.length,a=Ma(t,s);At(i,a)||(n.uniform1iv(this.addr,a),Rt(i,a));for(let l=0;l!==s;++l)t.setTexture2DArray(e[l]||af,a[l])}function Tw(n){switch(n){case 5126:return ow;case 35664:return lw;case 35665:return cw;case 35666:return dw;case 35674:return uw;case 35675:return hw;case 35676:return fw;case 5124:case 35670:return pw;case 35667:case 35671:return mw;case 35668:case 35672:return gw;case 35669:case 35673:return xw;case 5125:return vw;case 36294:return yw;case 36295:return _w;case 36296:return bw;case 35678:case 36198:case 36298:case 36306:case 35682:return ww;case 35679:case 36299:case 36307:return Sw;case 35680:case 36300:case 36308:case 36293:return Ew;case 36289:case 36303:case 36311:case 36292:return Mw}}class Aw{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.setValue=aw(t.type)}}class Rw{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.size=t.size,this.setValue=Tw(t.type)}}class Cw{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let a=0,l=s.length;a!==l;++a){const o=s[a];o.setValue(e,t[o.id],i)}}}const _o=/(\w+)(\])?(\[|\.)?/g;function Dd(n,e){n.seq.push(e),n.map[e.id]=e}function Nw(n,e,t){const i=n.name,s=i.length;for(_o.lastIndex=0;;){const a=_o.exec(i),l=_o.lastIndex;let o=a[1];const c=a[2]==="]",d=a[3];if(c&&(o=o|0),d===void 0||d==="["&&l+2===s){Dd(t,d===void 0?new Aw(o,n,e):new Rw(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new Cw(o),Dd(t,f)),t=f}}}class Zs{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const a=e.getActiveUniform(t,s),l=e.getUniformLocation(t,a.name);Nw(a,l,this)}}setValue(e,t,i,s){const a=this.map[t];a!==void 0&&a.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let a=0,l=t.length;a!==l;++a){const o=t[a],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,a=e.length;s!==a;++s){const l=e[s];l.id in t&&i.push(l)}return i}}function Id(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Pw=37297;let Lw=0;function jw(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let l=s;l<a;l++){const o=l+1;i.push(`${o===e?">":" "} ${o}: ${t[l]}`)}return i.join(`
`)}function Dw(n){const e=dt.getPrimaries(dt.workingColorSpace),t=dt.getPrimaries(n);let i;switch(e===t?i="":e===la&&t===oa?i="LinearDisplayP3ToLinearSRGB":e===oa&&t===la&&(i="LinearSRGBToLinearDisplayP3"),n){case Hn:case Ea:return[i,"LinearTransferOETF"];case jt:case yl:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Ud(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=n.getShaderInfoLog(e).trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const l=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+jw(n.getShaderSource(e),l)}else return s}function Iw(n,e){const t=Dw(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Uw(n,e){let t;switch(e){case $v:t="Linear";break;case Yv:t="Reinhard";break;case Kv:t="OptimizedCineon";break;case Ih:t="ACESFilmic";break;case Zv:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Ow(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Lr).join(`
`)}function kw(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Fw(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const a=n.getActiveAttrib(e,s),l=a.name;let o=1;a.type===n.FLOAT_MAT2&&(o=2),a.type===n.FLOAT_MAT3&&(o=3),a.type===n.FLOAT_MAT4&&(o=4),t[l]={type:a.type,location:n.getAttribLocation(e,l),locationSize:o}}return t}function Lr(n){return n!==""}function Od(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function kd(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Bw=/^[ \t]*#include +<([\w\d./]+)>/gm;function el(n){return n.replace(Bw,Hw)}const zw=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Hw(n,e){let t=et[e];if(t===void 0){const i=zw.get(e);if(i!==void 0)t=et[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return el(t)}const Gw=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Fd(n){return n.replace(Gw,Vw)}function Vw(n,e,t,i){let s="";for(let a=parseInt(e);a<parseInt(t);a++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function Bd(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Ww(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Lh?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===jh?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===On&&(e="SHADOWMAP_TYPE_VSM"),e}function Xw(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ar:case or:e="ENVMAP_TYPE_CUBE";break;case Sa:e="ENVMAP_TYPE_CUBE_UV";break}return e}function qw(n){let e="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===or&&(e="ENVMAP_MODE_REFRACTION"),e}function $w(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Dh:e="ENVMAP_BLENDING_MULTIPLY";break;case Xv:e="ENVMAP_BLENDING_MIX";break;case qv:e="ENVMAP_BLENDING_ADD";break}return e}function Yw(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Kw(n,e,t,i){const s=n.getContext(),a=t.defines;let l=t.vertexShader,o=t.fragmentShader;const c=Ww(t),d=Xw(t),u=qw(t),f=$w(t),p=Yw(t),x=t.isWebGL2?"":Ow(t),y=kw(a),g=s.createProgram();let m,h,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(Lr).join(`
`),m.length>0&&(m+=`
`),h=[x,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(Lr).join(`
`),h.length>0&&(h+=`
`)):(m=[Bd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Lr).join(`
`),h=[x,Bd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ii?"#define TONE_MAPPING":"",t.toneMapping!==ii?et.tonemapping_pars_fragment:"",t.toneMapping!==ii?Uw("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",et.colorspace_pars_fragment,Iw("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Lr).join(`
`)),l=el(l),l=Od(l,t),l=kd(l,t),o=el(o),o=Od(o,t),o=kd(o,t),l=Fd(l),o=Fd(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===rd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===rd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const v=b+m+l,E=b+h+o,_=Id(s,s.VERTEX_SHADER,v),T=Id(s,s.FRAGMENT_SHADER,E);s.attachShader(g,_),s.attachShader(g,T),t.index0AttributeName!==void 0?s.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function A(j){if(n.debug.checkShaderErrors){const B=s.getProgramInfoLog(g).trim(),$=s.getShaderInfoLog(_).trim(),P=s.getShaderInfoLog(T).trim();let z=!0,Z=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(z=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,g,_,T);else{const Y=Ud(s,_,"vertex"),ae=Ud(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Program Info Log: `+B+`
`+Y+`
`+ae)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):($===""||P==="")&&(Z=!1);Z&&(j.diagnostics={runnable:z,programLog:B,vertexShader:{log:$,prefix:m},fragmentShader:{log:P,prefix:h}})}s.deleteShader(_),s.deleteShader(T),L=new Zs(s,g),w=Fw(s,g)}let L;this.getUniforms=function(){return L===void 0&&A(this),L};let w;this.getAttributes=function(){return w===void 0&&A(this),w};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(g,Pw)),M},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Lw++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=_,this.fragmentShader=T,this}let Zw=0;class Jw{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),a=this._getShaderStage(i),l=this._getShaderCacheForMaterial(e);return l.has(s)===!1&&(l.add(s),s.usedTimes++),l.has(a)===!1&&(l.add(a),a.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Qw(e),t.set(e,i)),i}}class Qw{constructor(e){this.id=Zw++,this.code=e,this.usedTimes=0}}function eS(n,e,t,i,s,a,l){const o=new bl,c=new Jw,d=[],u=s.isWebGL2,f=s.logarithmicDepthBuffer,p=s.vertexTextures;let x=s.precision;const y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(w){return w===0?"uv":`uv${w}`}function m(w,M,j,B,$){const P=B.fog,z=$.geometry,Z=w.isMeshStandardMaterial?B.environment:null,Y=(w.isMeshStandardMaterial?t:e).get(w.envMap||Z),ae=Y&&Y.mapping===Sa?Y.image.height:null,J=y[w.type];w.precision!==null&&(x=s.getMaxPrecision(w.precision),x!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",x,"instead."));const ne=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,N=ne!==void 0?ne.length:0;let I=0;z.morphAttributes.position!==void 0&&(I=1),z.morphAttributes.normal!==void 0&&(I=2),z.morphAttributes.color!==void 0&&(I=3);let G,H,ie,F;if(J){const St=En[J];G=St.vertexShader,H=St.fragmentShader}else G=w.vertexShader,H=w.fragmentShader,c.update(w),ie=c.getVertexShaderID(w),F=c.getFragmentShaderID(w);const ve=n.getRenderTarget(),Q=$.isInstancedMesh===!0,Ee=!!w.map,Te=!!w.matcap,oe=!!Y,U=!!w.aoMap,Ze=!!w.lightMap,_e=!!w.bumpMap,me=!!w.normalMap,Re=!!w.displacementMap,Ne=!!w.emissiveMap,Pe=!!w.metalnessMap,Fe=!!w.roughnessMap,ke=w.anisotropy>0,ht=w.clearcoat>0,xt=w.iridescence>0,C=w.sheen>0,S=w.transmission>0,W=ke&&!!w.anisotropyMap,he=ht&&!!w.clearcoatMap,ce=ht&&!!w.clearcoatNormalMap,de=ht&&!!w.clearcoatRoughnessMap,je=xt&&!!w.iridescenceMap,ge=xt&&!!w.iridescenceThicknessMap,we=C&&!!w.sheenColorMap,D=C&&!!w.sheenRoughnessMap,pe=!!w.specularMap,le=!!w.specularColorMap,Be=!!w.specularIntensityMap,De=S&&!!w.transmissionMap,Oe=S&&!!w.thicknessMap,Le=!!w.gradientMap,Ae=!!w.alphaMap,it=w.alphaTest>0,k=!!w.alphaHash,xe=!!w.extensions,ue=!!z.attributes.uv1,re=!!z.attributes.uv2,fe=!!z.attributes.uv3;let Ue=ii;return w.toneMapped&&(ve===null||ve.isXRRenderTarget===!0)&&(Ue=n.toneMapping),{isWebGL2:u,shaderID:J,shaderType:w.type,shaderName:w.name,vertexShader:G,fragmentShader:H,defines:w.defines,customVertexShaderID:ie,customFragmentShaderID:F,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:x,instancing:Q,instancingColor:Q&&$.instanceColor!==null,supportsVertexTextures:p,outputColorSpace:ve===null?n.outputColorSpace:ve.isXRRenderTarget===!0?ve.texture.colorSpace:Hn,map:Ee,matcap:Te,envMap:oe,envMapMode:oe&&Y.mapping,envMapCubeUVHeight:ae,aoMap:U,lightMap:Ze,bumpMap:_e,normalMap:me,displacementMap:p&&Re,emissiveMap:Ne,normalMapObjectSpace:me&&w.normalMapType===dy,normalMapTangentSpace:me&&w.normalMapType===Vh,metalnessMap:Pe,roughnessMap:Fe,anisotropy:ke,anisotropyMap:W,clearcoat:ht,clearcoatMap:he,clearcoatNormalMap:ce,clearcoatRoughnessMap:de,iridescence:xt,iridescenceMap:je,iridescenceThicknessMap:ge,sheen:C,sheenColorMap:we,sheenRoughnessMap:D,specularMap:pe,specularColorMap:le,specularIntensityMap:Be,transmission:S,transmissionMap:De,thicknessMap:Oe,gradientMap:Le,opaque:w.transparent===!1&&w.blending===er,alphaMap:Ae,alphaTest:it,alphaHash:k,combine:w.combine,mapUv:Ee&&g(w.map.channel),aoMapUv:U&&g(w.aoMap.channel),lightMapUv:Ze&&g(w.lightMap.channel),bumpMapUv:_e&&g(w.bumpMap.channel),normalMapUv:me&&g(w.normalMap.channel),displacementMapUv:Re&&g(w.displacementMap.channel),emissiveMapUv:Ne&&g(w.emissiveMap.channel),metalnessMapUv:Pe&&g(w.metalnessMap.channel),roughnessMapUv:Fe&&g(w.roughnessMap.channel),anisotropyMapUv:W&&g(w.anisotropyMap.channel),clearcoatMapUv:he&&g(w.clearcoatMap.channel),clearcoatNormalMapUv:ce&&g(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:de&&g(w.clearcoatRoughnessMap.channel),iridescenceMapUv:je&&g(w.iridescenceMap.channel),iridescenceThicknessMapUv:ge&&g(w.iridescenceThicknessMap.channel),sheenColorMapUv:we&&g(w.sheenColorMap.channel),sheenRoughnessMapUv:D&&g(w.sheenRoughnessMap.channel),specularMapUv:pe&&g(w.specularMap.channel),specularColorMapUv:le&&g(w.specularColorMap.channel),specularIntensityMapUv:Be&&g(w.specularIntensityMap.channel),transmissionMapUv:De&&g(w.transmissionMap.channel),thicknessMapUv:Oe&&g(w.thicknessMap.channel),alphaMapUv:Ae&&g(w.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(me||ke),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,vertexUv1s:ue,vertexUv2s:re,vertexUv3s:fe,pointsUvs:$.isPoints===!0&&!!z.attributes.uv&&(Ee||Ae),fog:!!P,useFog:w.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:$.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:N,morphTextureStride:I,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:l.numPlanes,numClipIntersection:l.numIntersection,dithering:w.dithering,shadowMapEnabled:n.shadowMap.enabled&&j.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ue,useLegacyLights:n._useLegacyLights,decodeVideoTexture:Ee&&w.map.isVideoTexture===!0&&dt.getTransfer(w.map.colorSpace)===pt,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===Mn,flipSided:w.side===Kt,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionDerivatives:xe&&w.extensions.derivatives===!0,extensionFragDepth:xe&&w.extensions.fragDepth===!0,extensionDrawBuffers:xe&&w.extensions.drawBuffers===!0,extensionShaderTextureLOD:xe&&w.extensions.shaderTextureLOD===!0,rendererExtensionFragDepth:u||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()}}function h(w){const M=[];if(w.shaderID?M.push(w.shaderID):(M.push(w.customVertexShaderID),M.push(w.customFragmentShaderID)),w.defines!==void 0)for(const j in w.defines)M.push(j),M.push(w.defines[j]);return w.isRawShaderMaterial===!1&&(b(M,w),v(M,w),M.push(n.outputColorSpace)),M.push(w.customProgramCacheKey),M.join()}function b(w,M){w.push(M.precision),w.push(M.outputColorSpace),w.push(M.envMapMode),w.push(M.envMapCubeUVHeight),w.push(M.mapUv),w.push(M.alphaMapUv),w.push(M.lightMapUv),w.push(M.aoMapUv),w.push(M.bumpMapUv),w.push(M.normalMapUv),w.push(M.displacementMapUv),w.push(M.emissiveMapUv),w.push(M.metalnessMapUv),w.push(M.roughnessMapUv),w.push(M.anisotropyMapUv),w.push(M.clearcoatMapUv),w.push(M.clearcoatNormalMapUv),w.push(M.clearcoatRoughnessMapUv),w.push(M.iridescenceMapUv),w.push(M.iridescenceThicknessMapUv),w.push(M.sheenColorMapUv),w.push(M.sheenRoughnessMapUv),w.push(M.specularMapUv),w.push(M.specularColorMapUv),w.push(M.specularIntensityMapUv),w.push(M.transmissionMapUv),w.push(M.thicknessMapUv),w.push(M.combine),w.push(M.fogExp2),w.push(M.sizeAttenuation),w.push(M.morphTargetsCount),w.push(M.morphAttributeCount),w.push(M.numDirLights),w.push(M.numPointLights),w.push(M.numSpotLights),w.push(M.numSpotLightMaps),w.push(M.numHemiLights),w.push(M.numRectAreaLights),w.push(M.numDirLightShadows),w.push(M.numPointLightShadows),w.push(M.numSpotLightShadows),w.push(M.numSpotLightShadowsWithMaps),w.push(M.numLightProbes),w.push(M.shadowMapType),w.push(M.toneMapping),w.push(M.numClippingPlanes),w.push(M.numClipIntersection),w.push(M.depthPacking)}function v(w,M){o.disableAll(),M.isWebGL2&&o.enable(0),M.supportsVertexTextures&&o.enable(1),M.instancing&&o.enable(2),M.instancingColor&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),w.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.skinning&&o.enable(4),M.morphTargets&&o.enable(5),M.morphNormals&&o.enable(6),M.morphColors&&o.enable(7),M.premultipliedAlpha&&o.enable(8),M.shadowMapEnabled&&o.enable(9),M.useLegacyLights&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),w.push(o.mask)}function E(w){const M=y[w.type];let j;if(M){const B=En[M];j=Fy.clone(B.uniforms)}else j=w.uniforms;return j}function _(w,M){let j;for(let B=0,$=d.length;B<$;B++){const P=d[B];if(P.cacheKey===M){j=P,++j.usedTimes;break}}return j===void 0&&(j=new Kw(n,M,w,a),d.push(j)),j}function T(w){if(--w.usedTimes===0){const M=d.indexOf(w);d[M]=d[d.length-1],d.pop(),w.destroy()}}function A(w){c.remove(w)}function L(){c.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:E,acquireProgram:_,releaseProgram:T,releaseShaderCache:A,programs:d,dispose:L}}function tS(){let n=new WeakMap;function e(a){let l=n.get(a);return l===void 0&&(l={},n.set(a,l)),l}function t(a){n.delete(a)}function i(a,l,o){n.get(a)[l]=o}function s(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:s}}function nS(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function zd(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Hd(){const n=[];let e=0;const t=[],i=[],s=[];function a(){e=0,t.length=0,i.length=0,s.length=0}function l(f,p,x,y,g,m){let h=n[e];return h===void 0?(h={id:f.id,object:f,geometry:p,material:x,groupOrder:y,renderOrder:f.renderOrder,z:g,group:m},n[e]=h):(h.id=f.id,h.object=f,h.geometry=p,h.material=x,h.groupOrder=y,h.renderOrder=f.renderOrder,h.z=g,h.group=m),e++,h}function o(f,p,x,y,g,m){const h=l(f,p,x,y,g,m);x.transmission>0?i.push(h):x.transparent===!0?s.push(h):t.push(h)}function c(f,p,x,y,g,m){const h=l(f,p,x,y,g,m);x.transmission>0?i.unshift(h):x.transparent===!0?s.unshift(h):t.unshift(h)}function d(f,p){t.length>1&&t.sort(f||nS),i.length>1&&i.sort(p||zd),s.length>1&&s.sort(p||zd)}function u(){for(let f=e,p=n.length;f<p;f++){const x=n[f];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:i,transparent:s,init:a,push:o,unshift:c,finish:u,sort:d}}function iS(){let n=new WeakMap;function e(i,s){const a=n.get(i);let l;return a===void 0?(l=new Hd,n.set(i,[l])):s>=a.length?(l=new Hd,a.push(l)):l=a[s],l}function t(){n=new WeakMap}return{get:e,dispose:t}}function rS(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new q,color:new ot};break;case"SpotLight":t={position:new q,direction:new q,color:new ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new q,color:new ot,distance:0,decay:0};break;case"HemisphereLight":t={direction:new q,skyColor:new ot,groundColor:new ot};break;case"RectAreaLight":t={color:new ot,position:new q,halfWidth:new q,halfHeight:new q};break}return n[e.id]=t,t}}}function sS(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let aS=0;function oS(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function lS(n,e){const t=new rS,i=sS(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)s.probe.push(new q);const a=new q,l=new _t,o=new _t;function c(u,f){let p=0,x=0,y=0;for(let B=0;B<9;B++)s.probe[B].set(0,0,0);let g=0,m=0,h=0,b=0,v=0,E=0,_=0,T=0,A=0,L=0,w=0;u.sort(oS);const M=f===!0?Math.PI:1;for(let B=0,$=u.length;B<$;B++){const P=u[B],z=P.color,Z=P.intensity,Y=P.distance,ae=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)p+=z.r*Z*M,x+=z.g*Z*M,y+=z.b*Z*M;else if(P.isLightProbe){for(let J=0;J<9;J++)s.probe[J].addScaledVector(P.sh.coefficients[J],Z);w++}else if(P.isDirectionalLight){const J=t.get(P);if(J.color.copy(P.color).multiplyScalar(P.intensity*M),P.castShadow){const ne=P.shadow,N=i.get(P);N.shadowBias=ne.bias,N.shadowNormalBias=ne.normalBias,N.shadowRadius=ne.radius,N.shadowMapSize=ne.mapSize,s.directionalShadow[g]=N,s.directionalShadowMap[g]=ae,s.directionalShadowMatrix[g]=P.shadow.matrix,E++}s.directional[g]=J,g++}else if(P.isSpotLight){const J=t.get(P);J.position.setFromMatrixPosition(P.matrixWorld),J.color.copy(z).multiplyScalar(Z*M),J.distance=Y,J.coneCos=Math.cos(P.angle),J.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),J.decay=P.decay,s.spot[h]=J;const ne=P.shadow;if(P.map&&(s.spotLightMap[A]=P.map,A++,ne.updateMatrices(P),P.castShadow&&L++),s.spotLightMatrix[h]=ne.matrix,P.castShadow){const N=i.get(P);N.shadowBias=ne.bias,N.shadowNormalBias=ne.normalBias,N.shadowRadius=ne.radius,N.shadowMapSize=ne.mapSize,s.spotShadow[h]=N,s.spotShadowMap[h]=ae,T++}h++}else if(P.isRectAreaLight){const J=t.get(P);J.color.copy(z).multiplyScalar(Z),J.halfWidth.set(P.width*.5,0,0),J.halfHeight.set(0,P.height*.5,0),s.rectArea[b]=J,b++}else if(P.isPointLight){const J=t.get(P);if(J.color.copy(P.color).multiplyScalar(P.intensity*M),J.distance=P.distance,J.decay=P.decay,P.castShadow){const ne=P.shadow,N=i.get(P);N.shadowBias=ne.bias,N.shadowNormalBias=ne.normalBias,N.shadowRadius=ne.radius,N.shadowMapSize=ne.mapSize,N.shadowCameraNear=ne.camera.near,N.shadowCameraFar=ne.camera.far,s.pointShadow[m]=N,s.pointShadowMap[m]=ae,s.pointShadowMatrix[m]=P.shadow.matrix,_++}s.point[m]=J,m++}else if(P.isHemisphereLight){const J=t.get(P);J.skyColor.copy(P.color).multiplyScalar(Z*M),J.groundColor.copy(P.groundColor).multiplyScalar(Z*M),s.hemi[v]=J,v++}}b>0&&(e.isWebGL2||n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ye.LTC_FLOAT_1,s.rectAreaLTC2=ye.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=ye.LTC_HALF_1,s.rectAreaLTC2=ye.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=p,s.ambient[1]=x,s.ambient[2]=y;const j=s.hash;(j.directionalLength!==g||j.pointLength!==m||j.spotLength!==h||j.rectAreaLength!==b||j.hemiLength!==v||j.numDirectionalShadows!==E||j.numPointShadows!==_||j.numSpotShadows!==T||j.numSpotMaps!==A||j.numLightProbes!==w)&&(s.directional.length=g,s.spot.length=h,s.rectArea.length=b,s.point.length=m,s.hemi.length=v,s.directionalShadow.length=E,s.directionalShadowMap.length=E,s.pointShadow.length=_,s.pointShadowMap.length=_,s.spotShadow.length=T,s.spotShadowMap.length=T,s.directionalShadowMatrix.length=E,s.pointShadowMatrix.length=_,s.spotLightMatrix.length=T+A-L,s.spotLightMap.length=A,s.numSpotLightShadowsWithMaps=L,s.numLightProbes=w,j.directionalLength=g,j.pointLength=m,j.spotLength=h,j.rectAreaLength=b,j.hemiLength=v,j.numDirectionalShadows=E,j.numPointShadows=_,j.numSpotShadows=T,j.numSpotMaps=A,j.numLightProbes=w,s.version=aS++)}function d(u,f){let p=0,x=0,y=0,g=0,m=0;const h=f.matrixWorldInverse;for(let b=0,v=u.length;b<v;b++){const E=u[b];if(E.isDirectionalLight){const _=s.directional[p];_.direction.setFromMatrixPosition(E.matrixWorld),a.setFromMatrixPosition(E.target.matrixWorld),_.direction.sub(a),_.direction.transformDirection(h),p++}else if(E.isSpotLight){const _=s.spot[y];_.position.setFromMatrixPosition(E.matrixWorld),_.position.applyMatrix4(h),_.direction.setFromMatrixPosition(E.matrixWorld),a.setFromMatrixPosition(E.target.matrixWorld),_.direction.sub(a),_.direction.transformDirection(h),y++}else if(E.isRectAreaLight){const _=s.rectArea[g];_.position.setFromMatrixPosition(E.matrixWorld),_.position.applyMatrix4(h),o.identity(),l.copy(E.matrixWorld),l.premultiply(h),o.extractRotation(l),_.halfWidth.set(E.width*.5,0,0),_.halfHeight.set(0,E.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(E.isPointLight){const _=s.point[x];_.position.setFromMatrixPosition(E.matrixWorld),_.position.applyMatrix4(h),x++}else if(E.isHemisphereLight){const _=s.hemi[m];_.direction.setFromMatrixPosition(E.matrixWorld),_.direction.transformDirection(h),m++}}}return{setup:c,setupView:d,state:s}}function Gd(n,e){const t=new lS(n,e),i=[],s=[];function a(){i.length=0,s.length=0}function l(f){i.push(f)}function o(f){s.push(f)}function c(f){t.setup(i,f)}function d(f){t.setupView(i,f)}return{init:a,state:{lightsArray:i,shadowsArray:s,lights:t},setupLights:c,setupLightsView:d,pushLight:l,pushShadow:o}}function cS(n,e){let t=new WeakMap;function i(a,l=0){const o=t.get(a);let c;return o===void 0?(c=new Gd(n,e),t.set(a,[c])):l>=o.length?(c=new Gd(n,e),o.push(c)):c=o[l],c}function s(){t=new WeakMap}return{get:i,dispose:s}}class dS extends Kr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ly,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class uS extends Kr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const hS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fS=`uniform sampler2D shadow_pass;
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
}`;function pS(n,e,t){let i=new wl;const s=new $e,a=new $e,l=new Pt,o=new dS({depthPacking:cy}),c=new uS,d={},u=t.maxTextureSize,f={[ai]:Kt,[Kt]:ai,[Mn]:Mn},p=new Ri({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $e},radius:{value:4}},vertexShader:hS,fragmentShader:fS}),x=p.clone();x.defines.HORIZONTAL_PASS=1;const y=new li;y.setAttribute("position",new bn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new mt(y,p),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Lh;let h=this.type;this.render=function(_,T,A){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||_.length===0)return;const L=n.getRenderTarget(),w=n.getActiveCubeFace(),M=n.getActiveMipmapLevel(),j=n.state;j.setBlending(ni),j.buffers.color.setClear(1,1,1,1),j.buffers.depth.setTest(!0),j.setScissorTest(!1);const B=h!==On&&this.type===On,$=h===On&&this.type!==On;for(let P=0,z=_.length;P<z;P++){const Z=_[P],Y=Z.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;s.copy(Y.mapSize);const ae=Y.getFrameExtents();if(s.multiply(ae),a.copy(Y.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(a.x=Math.floor(u/ae.x),s.x=a.x*ae.x,Y.mapSize.x=a.x),s.y>u&&(a.y=Math.floor(u/ae.y),s.y=a.y*ae.y,Y.mapSize.y=a.y)),Y.map===null||B===!0||$===!0){const ne=this.type!==On?{minFilter:zt,magFilter:zt}:{};Y.map!==null&&Y.map.dispose(),Y.map=new Ai(s.x,s.y,ne),Y.map.texture.name=Z.name+".shadowMap",Y.camera.updateProjectionMatrix()}n.setRenderTarget(Y.map),n.clear();const J=Y.getViewportCount();for(let ne=0;ne<J;ne++){const N=Y.getViewport(ne);l.set(a.x*N.x,a.y*N.y,a.x*N.z,a.y*N.w),j.viewport(l),Y.updateMatrices(Z,ne),i=Y.getFrustum(),E(T,A,Y.camera,Z,this.type)}Y.isPointLightShadow!==!0&&this.type===On&&b(Y,A),Y.needsUpdate=!1}h=this.type,m.needsUpdate=!1,n.setRenderTarget(L,w,M)};function b(_,T){const A=e.update(g);p.defines.VSM_SAMPLES!==_.blurSamples&&(p.defines.VSM_SAMPLES=_.blurSamples,x.defines.VSM_SAMPLES=_.blurSamples,p.needsUpdate=!0,x.needsUpdate=!0),_.mapPass===null&&(_.mapPass=new Ai(s.x,s.y)),p.uniforms.shadow_pass.value=_.map.texture,p.uniforms.resolution.value=_.mapSize,p.uniforms.radius.value=_.radius,n.setRenderTarget(_.mapPass),n.clear(),n.renderBufferDirect(T,null,A,p,g,null),x.uniforms.shadow_pass.value=_.mapPass.texture,x.uniforms.resolution.value=_.mapSize,x.uniforms.radius.value=_.radius,n.setRenderTarget(_.map),n.clear(),n.renderBufferDirect(T,null,A,x,g,null)}function v(_,T,A,L){let w=null;const M=A.isPointLight===!0?_.customDistanceMaterial:_.customDepthMaterial;if(M!==void 0)w=M;else if(w=A.isPointLight===!0?c:o,n.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const j=w.uuid,B=T.uuid;let $=d[j];$===void 0&&($={},d[j]=$);let P=$[B];P===void 0&&(P=w.clone(),$[B]=P),w=P}if(w.visible=T.visible,w.wireframe=T.wireframe,L===On?w.side=T.shadowSide!==null?T.shadowSide:T.side:w.side=T.shadowSide!==null?T.shadowSide:f[T.side],w.alphaMap=T.alphaMap,w.alphaTest=T.alphaTest,w.map=T.map,w.clipShadows=T.clipShadows,w.clippingPlanes=T.clippingPlanes,w.clipIntersection=T.clipIntersection,w.displacementMap=T.displacementMap,w.displacementScale=T.displacementScale,w.displacementBias=T.displacementBias,w.wireframeLinewidth=T.wireframeLinewidth,w.linewidth=T.linewidth,A.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const j=n.properties.get(w);j.light=A}return w}function E(_,T,A,L,w){if(_.visible===!1)return;if(_.layers.test(T.layers)&&(_.isMesh||_.isLine||_.isPoints)&&(_.castShadow||_.receiveShadow&&w===On)&&(!_.frustumCulled||i.intersectsObject(_))){_.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,_.matrixWorld);const B=e.update(_),$=_.material;if(Array.isArray($)){const P=B.groups;for(let z=0,Z=P.length;z<Z;z++){const Y=P[z],ae=$[Y.materialIndex];if(ae&&ae.visible){const J=v(_,ae,L,w);n.renderBufferDirect(A,null,B,J,_,Y)}}}else if($.visible){const P=v(_,$,L,w);n.renderBufferDirect(A,null,B,P,_,null)}}const j=_.children;for(let B=0,$=j.length;B<$;B++)E(j[B],T,A,L,w)}}function mS(n,e,t){const i=t.isWebGL2;function s(){let k=!1;const xe=new Pt;let ue=null;const re=new Pt(0,0,0,0);return{setMask:function(fe){ue!==fe&&!k&&(n.colorMask(fe,fe,fe,fe),ue=fe)},setLocked:function(fe){k=fe},setClear:function(fe,Ue,rt,St,rn){rn===!0&&(fe*=St,Ue*=St,rt*=St),xe.set(fe,Ue,rt,St),re.equals(xe)===!1&&(n.clearColor(fe,Ue,rt,St),re.copy(xe))},reset:function(){k=!1,ue=null,re.set(-1,0,0,0)}}}function a(){let k=!1,xe=null,ue=null,re=null;return{setTest:function(fe){fe?Ee(n.DEPTH_TEST):Te(n.DEPTH_TEST)},setMask:function(fe){xe!==fe&&!k&&(n.depthMask(fe),xe=fe)},setFunc:function(fe){if(ue!==fe){switch(fe){case Fv:n.depthFunc(n.NEVER);break;case Bv:n.depthFunc(n.ALWAYS);break;case zv:n.depthFunc(n.LESS);break;case sa:n.depthFunc(n.LEQUAL);break;case Hv:n.depthFunc(n.EQUAL);break;case Gv:n.depthFunc(n.GEQUAL);break;case Vv:n.depthFunc(n.GREATER);break;case Wv:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ue=fe}},setLocked:function(fe){k=fe},setClear:function(fe){re!==fe&&(n.clearDepth(fe),re=fe)},reset:function(){k=!1,xe=null,ue=null,re=null}}}function l(){let k=!1,xe=null,ue=null,re=null,fe=null,Ue=null,rt=null,St=null,rn=null;return{setTest:function(ut){k||(ut?Ee(n.STENCIL_TEST):Te(n.STENCIL_TEST))},setMask:function(ut){xe!==ut&&!k&&(n.stencilMask(ut),xe=ut)},setFunc:function(ut,kt,Sn){(ue!==ut||re!==kt||fe!==Sn)&&(n.stencilFunc(ut,kt,Sn),ue=ut,re=kt,fe=Sn)},setOp:function(ut,kt,Sn){(Ue!==ut||rt!==kt||St!==Sn)&&(n.stencilOp(ut,kt,Sn),Ue=ut,rt=kt,St=Sn)},setLocked:function(ut){k=ut},setClear:function(ut){rn!==ut&&(n.clearStencil(ut),rn=ut)},reset:function(){k=!1,xe=null,ue=null,re=null,fe=null,Ue=null,rt=null,St=null,rn=null}}}const o=new s,c=new a,d=new l,u=new WeakMap,f=new WeakMap;let p={},x={},y=new WeakMap,g=[],m=null,h=!1,b=null,v=null,E=null,_=null,T=null,A=null,L=null,w=new ot(0,0,0),M=0,j=!1,B=null,$=null,P=null,z=null,Z=null;const Y=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let ae=!1,J=0;const ne=n.getParameter(n.VERSION);ne.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(ne)[1]),ae=J>=1):ne.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),ae=J>=2);let N=null,I={};const G=n.getParameter(n.SCISSOR_BOX),H=n.getParameter(n.VIEWPORT),ie=new Pt().fromArray(G),F=new Pt().fromArray(H);function ve(k,xe,ue,re){const fe=new Uint8Array(4),Ue=n.createTexture();n.bindTexture(k,Ue),n.texParameteri(k,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(k,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let rt=0;rt<ue;rt++)i&&(k===n.TEXTURE_3D||k===n.TEXTURE_2D_ARRAY)?n.texImage3D(xe,0,n.RGBA,1,1,re,0,n.RGBA,n.UNSIGNED_BYTE,fe):n.texImage2D(xe+rt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,fe);return Ue}const Q={};Q[n.TEXTURE_2D]=ve(n.TEXTURE_2D,n.TEXTURE_2D,1),Q[n.TEXTURE_CUBE_MAP]=ve(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Q[n.TEXTURE_2D_ARRAY]=ve(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Q[n.TEXTURE_3D]=ve(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),c.setClear(1),d.setClear(0),Ee(n.DEPTH_TEST),c.setFunc(sa),Pe(!1),Fe(Ec),Ee(n.CULL_FACE),Re(ni);function Ee(k){p[k]!==!0&&(n.enable(k),p[k]=!0)}function Te(k){p[k]!==!1&&(n.disable(k),p[k]=!1)}function oe(k,xe){return x[k]!==xe?(n.bindFramebuffer(k,xe),x[k]=xe,i&&(k===n.DRAW_FRAMEBUFFER&&(x[n.FRAMEBUFFER]=xe),k===n.FRAMEBUFFER&&(x[n.DRAW_FRAMEBUFFER]=xe)),!0):!1}function U(k,xe){let ue=g,re=!1;if(k)if(ue=y.get(xe),ue===void 0&&(ue=[],y.set(xe,ue)),k.isWebGLMultipleRenderTargets){const fe=k.texture;if(ue.length!==fe.length||ue[0]!==n.COLOR_ATTACHMENT0){for(let Ue=0,rt=fe.length;Ue<rt;Ue++)ue[Ue]=n.COLOR_ATTACHMENT0+Ue;ue.length=fe.length,re=!0}}else ue[0]!==n.COLOR_ATTACHMENT0&&(ue[0]=n.COLOR_ATTACHMENT0,re=!0);else ue[0]!==n.BACK&&(ue[0]=n.BACK,re=!0);re&&(t.isWebGL2?n.drawBuffers(ue):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ue))}function Ze(k){return m!==k?(n.useProgram(k),m=k,!0):!1}const _e={[xi]:n.FUNC_ADD,[Ev]:n.FUNC_SUBTRACT,[Mv]:n.FUNC_REVERSE_SUBTRACT};if(i)_e[Rc]=n.MIN,_e[Cc]=n.MAX;else{const k=e.get("EXT_blend_minmax");k!==null&&(_e[Rc]=k.MIN_EXT,_e[Cc]=k.MAX_EXT)}const me={[Tv]:n.ZERO,[Av]:n.ONE,[Rv]:n.SRC_COLOR,[Xo]:n.SRC_ALPHA,[Dv]:n.SRC_ALPHA_SATURATE,[Lv]:n.DST_COLOR,[Nv]:n.DST_ALPHA,[Cv]:n.ONE_MINUS_SRC_COLOR,[qo]:n.ONE_MINUS_SRC_ALPHA,[jv]:n.ONE_MINUS_DST_COLOR,[Pv]:n.ONE_MINUS_DST_ALPHA,[Iv]:n.CONSTANT_COLOR,[Uv]:n.ONE_MINUS_CONSTANT_COLOR,[Ov]:n.CONSTANT_ALPHA,[kv]:n.ONE_MINUS_CONSTANT_ALPHA};function Re(k,xe,ue,re,fe,Ue,rt,St,rn,ut){if(k===ni){h===!0&&(Te(n.BLEND),h=!1);return}if(h===!1&&(Ee(n.BLEND),h=!0),k!==Sv){if(k!==b||ut!==j){if((v!==xi||T!==xi)&&(n.blendEquation(n.FUNC_ADD),v=xi,T=xi),ut)switch(k){case er:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Mc:n.blendFunc(n.ONE,n.ONE);break;case Tc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ac:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case er:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Mc:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Tc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ac:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}E=null,_=null,A=null,L=null,w.set(0,0,0),M=0,b=k,j=ut}return}fe=fe||xe,Ue=Ue||ue,rt=rt||re,(xe!==v||fe!==T)&&(n.blendEquationSeparate(_e[xe],_e[fe]),v=xe,T=fe),(ue!==E||re!==_||Ue!==A||rt!==L)&&(n.blendFuncSeparate(me[ue],me[re],me[Ue],me[rt]),E=ue,_=re,A=Ue,L=rt),(St.equals(w)===!1||rn!==M)&&(n.blendColor(St.r,St.g,St.b,rn),w.copy(St),M=rn),b=k,j=!1}function Ne(k,xe){k.side===Mn?Te(n.CULL_FACE):Ee(n.CULL_FACE);let ue=k.side===Kt;xe&&(ue=!ue),Pe(ue),k.blending===er&&k.transparent===!1?Re(ni):Re(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),c.setFunc(k.depthFunc),c.setTest(k.depthTest),c.setMask(k.depthWrite),o.setMask(k.colorWrite);const re=k.stencilWrite;d.setTest(re),re&&(d.setMask(k.stencilWriteMask),d.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),d.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),ht(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?Ee(n.SAMPLE_ALPHA_TO_COVERAGE):Te(n.SAMPLE_ALPHA_TO_COVERAGE)}function Pe(k){B!==k&&(k?n.frontFace(n.CW):n.frontFace(n.CCW),B=k)}function Fe(k){k!==bv?(Ee(n.CULL_FACE),k!==$&&(k===Ec?n.cullFace(n.BACK):k===wv?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Te(n.CULL_FACE),$=k}function ke(k){k!==P&&(ae&&n.lineWidth(k),P=k)}function ht(k,xe,ue){k?(Ee(n.POLYGON_OFFSET_FILL),(z!==xe||Z!==ue)&&(n.polygonOffset(xe,ue),z=xe,Z=ue)):Te(n.POLYGON_OFFSET_FILL)}function xt(k){k?Ee(n.SCISSOR_TEST):Te(n.SCISSOR_TEST)}function C(k){k===void 0&&(k=n.TEXTURE0+Y-1),N!==k&&(n.activeTexture(k),N=k)}function S(k,xe,ue){ue===void 0&&(N===null?ue=n.TEXTURE0+Y-1:ue=N);let re=I[ue];re===void 0&&(re={type:void 0,texture:void 0},I[ue]=re),(re.type!==k||re.texture!==xe)&&(N!==ue&&(n.activeTexture(ue),N=ue),n.bindTexture(k,xe||Q[k]),re.type=k,re.texture=xe)}function W(){const k=I[N];k!==void 0&&k.type!==void 0&&(n.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function he(){try{n.compressedTexImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ce(){try{n.compressedTexImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function de(){try{n.texSubImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function je(){try{n.texSubImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ge(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function we(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function D(){try{n.texStorage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function pe(){try{n.texStorage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function le(){try{n.texImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Be(){try{n.texImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function De(k){ie.equals(k)===!1&&(n.scissor(k.x,k.y,k.z,k.w),ie.copy(k))}function Oe(k){F.equals(k)===!1&&(n.viewport(k.x,k.y,k.z,k.w),F.copy(k))}function Le(k,xe){let ue=f.get(xe);ue===void 0&&(ue=new WeakMap,f.set(xe,ue));let re=ue.get(k);re===void 0&&(re=n.getUniformBlockIndex(xe,k.name),ue.set(k,re))}function Ae(k,xe){const re=f.get(xe).get(k);u.get(xe)!==re&&(n.uniformBlockBinding(xe,re,k.__bindingPointIndex),u.set(xe,re))}function it(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),p={},N=null,I={},x={},y=new WeakMap,g=[],m=null,h=!1,b=null,v=null,E=null,_=null,T=null,A=null,L=null,w=new ot(0,0,0),M=0,j=!1,B=null,$=null,P=null,z=null,Z=null,ie.set(0,0,n.canvas.width,n.canvas.height),F.set(0,0,n.canvas.width,n.canvas.height),o.reset(),c.reset(),d.reset()}return{buffers:{color:o,depth:c,stencil:d},enable:Ee,disable:Te,bindFramebuffer:oe,drawBuffers:U,useProgram:Ze,setBlending:Re,setMaterial:Ne,setFlipSided:Pe,setCullFace:Fe,setLineWidth:ke,setPolygonOffset:ht,setScissorTest:xt,activeTexture:C,bindTexture:S,unbindTexture:W,compressedTexImage2D:he,compressedTexImage3D:ce,texImage2D:le,texImage3D:Be,updateUBOMapping:Le,uniformBlockBinding:Ae,texStorage2D:D,texStorage3D:pe,texSubImage2D:de,texSubImage3D:je,compressedTexSubImage2D:ge,compressedTexSubImage3D:we,scissor:De,viewport:Oe,reset:it}}function gS(n,e,t,i,s,a,l){const o=s.isWebGL2,c=s.maxTextures,d=s.maxCubemapSize,u=s.maxTextureSize,f=s.maxSamples,p=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,x=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),y=new WeakMap;let g;const m=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(C,S){return h?new OffscreenCanvas(C,S):ua("canvas")}function v(C,S,W,he){let ce=1;if((C.width>he||C.height>he)&&(ce=he/Math.max(C.width,C.height)),ce<1||S===!0)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap){const de=S?Qo:Math.floor,je=de(ce*C.width),ge=de(ce*C.height);g===void 0&&(g=b(je,ge));const we=W?b(je,ge):g;return we.width=je,we.height=ge,we.getContext("2d").drawImage(C,0,0,je,ge),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+C.width+"x"+C.height+") to ("+je+"x"+ge+")."),we}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+C.width+"x"+C.height+")."),C;return C}function E(C){return sd(C.width)&&sd(C.height)}function _(C){return o?!1:C.wrapS!==yn||C.wrapT!==yn||C.minFilter!==zt&&C.minFilter!==ln}function T(C,S){return C.generateMipmaps&&S&&C.minFilter!==zt&&C.minFilter!==ln}function A(C){n.generateMipmap(C)}function L(C,S,W,he,ce=!1){if(o===!1)return S;if(C!==null){if(n[C]!==void 0)return n[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let de=S;if(S===n.RED&&(W===n.FLOAT&&(de=n.R32F),W===n.HALF_FLOAT&&(de=n.R16F),W===n.UNSIGNED_BYTE&&(de=n.R8)),S===n.RED_INTEGER&&(W===n.UNSIGNED_BYTE&&(de=n.R8UI),W===n.UNSIGNED_SHORT&&(de=n.R16UI),W===n.UNSIGNED_INT&&(de=n.R32UI),W===n.BYTE&&(de=n.R8I),W===n.SHORT&&(de=n.R16I),W===n.INT&&(de=n.R32I)),S===n.RG&&(W===n.FLOAT&&(de=n.RG32F),W===n.HALF_FLOAT&&(de=n.RG16F),W===n.UNSIGNED_BYTE&&(de=n.RG8)),S===n.RGBA){const je=ce?aa:dt.getTransfer(he);W===n.FLOAT&&(de=n.RGBA32F),W===n.HALF_FLOAT&&(de=n.RGBA16F),W===n.UNSIGNED_BYTE&&(de=je===pt?n.SRGB8_ALPHA8:n.RGBA8),W===n.UNSIGNED_SHORT_4_4_4_4&&(de=n.RGBA4),W===n.UNSIGNED_SHORT_5_5_5_1&&(de=n.RGB5_A1)}return(de===n.R16F||de===n.R32F||de===n.RG16F||de===n.RG32F||de===n.RGBA16F||de===n.RGBA32F)&&e.get("EXT_color_buffer_float"),de}function w(C,S,W){return T(C,W)===!0||C.isFramebufferTexture&&C.minFilter!==zt&&C.minFilter!==ln?Math.log2(Math.max(S.width,S.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?S.mipmaps.length:1}function M(C){return C===zt||C===Nc||C===Wa?n.NEAREST:n.LINEAR}function j(C){const S=C.target;S.removeEventListener("dispose",j),$(S),S.isVideoTexture&&y.delete(S)}function B(C){const S=C.target;S.removeEventListener("dispose",B),z(S)}function $(C){const S=i.get(C);if(S.__webglInit===void 0)return;const W=C.source,he=m.get(W);if(he){const ce=he[S.__cacheKey];ce.usedTimes--,ce.usedTimes===0&&P(C),Object.keys(he).length===0&&m.delete(W)}i.remove(C)}function P(C){const S=i.get(C);n.deleteTexture(S.__webglTexture);const W=C.source,he=m.get(W);delete he[S.__cacheKey],l.memory.textures--}function z(C){const S=C.texture,W=i.get(C),he=i.get(S);if(he.__webglTexture!==void 0&&(n.deleteTexture(he.__webglTexture),l.memory.textures--),C.depthTexture&&C.depthTexture.dispose(),C.isWebGLCubeRenderTarget)for(let ce=0;ce<6;ce++){if(Array.isArray(W.__webglFramebuffer[ce]))for(let de=0;de<W.__webglFramebuffer[ce].length;de++)n.deleteFramebuffer(W.__webglFramebuffer[ce][de]);else n.deleteFramebuffer(W.__webglFramebuffer[ce]);W.__webglDepthbuffer&&n.deleteRenderbuffer(W.__webglDepthbuffer[ce])}else{if(Array.isArray(W.__webglFramebuffer))for(let ce=0;ce<W.__webglFramebuffer.length;ce++)n.deleteFramebuffer(W.__webglFramebuffer[ce]);else n.deleteFramebuffer(W.__webglFramebuffer);if(W.__webglDepthbuffer&&n.deleteRenderbuffer(W.__webglDepthbuffer),W.__webglMultisampledFramebuffer&&n.deleteFramebuffer(W.__webglMultisampledFramebuffer),W.__webglColorRenderbuffer)for(let ce=0;ce<W.__webglColorRenderbuffer.length;ce++)W.__webglColorRenderbuffer[ce]&&n.deleteRenderbuffer(W.__webglColorRenderbuffer[ce]);W.__webglDepthRenderbuffer&&n.deleteRenderbuffer(W.__webglDepthRenderbuffer)}if(C.isWebGLMultipleRenderTargets)for(let ce=0,de=S.length;ce<de;ce++){const je=i.get(S[ce]);je.__webglTexture&&(n.deleteTexture(je.__webglTexture),l.memory.textures--),i.remove(S[ce])}i.remove(S),i.remove(C)}let Z=0;function Y(){Z=0}function ae(){const C=Z;return C>=c&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+c),Z+=1,C}function J(C){const S=[];return S.push(C.wrapS),S.push(C.wrapT),S.push(C.wrapR||0),S.push(C.magFilter),S.push(C.minFilter),S.push(C.anisotropy),S.push(C.internalFormat),S.push(C.format),S.push(C.type),S.push(C.generateMipmaps),S.push(C.premultiplyAlpha),S.push(C.flipY),S.push(C.unpackAlignment),S.push(C.colorSpace),S.join()}function ne(C,S){const W=i.get(C);if(C.isVideoTexture&&ht(C),C.isRenderTargetTexture===!1&&C.version>0&&W.__version!==C.version){const he=C.image;if(he===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(he.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ee(W,C,S);return}}t.bindTexture(n.TEXTURE_2D,W.__webglTexture,n.TEXTURE0+S)}function N(C,S){const W=i.get(C);if(C.version>0&&W.__version!==C.version){Ee(W,C,S);return}t.bindTexture(n.TEXTURE_2D_ARRAY,W.__webglTexture,n.TEXTURE0+S)}function I(C,S){const W=i.get(C);if(C.version>0&&W.__version!==C.version){Ee(W,C,S);return}t.bindTexture(n.TEXTURE_3D,W.__webglTexture,n.TEXTURE0+S)}function G(C,S){const W=i.get(C);if(C.version>0&&W.__version!==C.version){Te(W,C,S);return}t.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture,n.TEXTURE0+S)}const H={[Ko]:n.REPEAT,[yn]:n.CLAMP_TO_EDGE,[Zo]:n.MIRRORED_REPEAT},ie={[zt]:n.NEAREST,[Nc]:n.NEAREST_MIPMAP_NEAREST,[Wa]:n.NEAREST_MIPMAP_LINEAR,[ln]:n.LINEAR,[Jv]:n.LINEAR_MIPMAP_NEAREST,[Fr]:n.LINEAR_MIPMAP_LINEAR},F={[uy]:n.NEVER,[vy]:n.ALWAYS,[hy]:n.LESS,[py]:n.LEQUAL,[fy]:n.EQUAL,[xy]:n.GEQUAL,[my]:n.GREATER,[gy]:n.NOTEQUAL};function ve(C,S,W){if(W?(n.texParameteri(C,n.TEXTURE_WRAP_S,H[S.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,H[S.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,H[S.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,ie[S.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,ie[S.minFilter])):(n.texParameteri(C,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(C,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(S.wrapS!==yn||S.wrapT!==yn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(C,n.TEXTURE_MAG_FILTER,M(S.magFilter)),n.texParameteri(C,n.TEXTURE_MIN_FILTER,M(S.minFilter)),S.minFilter!==zt&&S.minFilter!==ln&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),S.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,F[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const he=e.get("EXT_texture_filter_anisotropic");if(S.magFilter===zt||S.minFilter!==Wa&&S.minFilter!==Fr||S.type===Qn&&e.has("OES_texture_float_linear")===!1||o===!1&&S.type===Br&&e.has("OES_texture_half_float_linear")===!1)return;(S.anisotropy>1||i.get(S).__currentAnisotropy)&&(n.texParameterf(C,he.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy)}}function Q(C,S){let W=!1;C.__webglInit===void 0&&(C.__webglInit=!0,S.addEventListener("dispose",j));const he=S.source;let ce=m.get(he);ce===void 0&&(ce={},m.set(he,ce));const de=J(S);if(de!==C.__cacheKey){ce[de]===void 0&&(ce[de]={texture:n.createTexture(),usedTimes:0},l.memory.textures++,W=!0),ce[de].usedTimes++;const je=ce[C.__cacheKey];je!==void 0&&(ce[C.__cacheKey].usedTimes--,je.usedTimes===0&&P(S)),C.__cacheKey=de,C.__webglTexture=ce[de].texture}return W}function Ee(C,S,W){let he=n.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(he=n.TEXTURE_2D_ARRAY),S.isData3DTexture&&(he=n.TEXTURE_3D);const ce=Q(C,S),de=S.source;t.bindTexture(he,C.__webglTexture,n.TEXTURE0+W);const je=i.get(de);if(de.version!==je.__version||ce===!0){t.activeTexture(n.TEXTURE0+W);const ge=dt.getPrimaries(dt.workingColorSpace),we=S.colorSpace===dn?null:dt.getPrimaries(S.colorSpace),D=S.colorSpace===dn||ge===we?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,D);const pe=_(S)&&E(S.image)===!1;let le=v(S.image,pe,!1,u);le=xt(S,le);const Be=E(le)||o,De=a.convert(S.format,S.colorSpace);let Oe=a.convert(S.type),Le=L(S.internalFormat,De,Oe,S.colorSpace,S.isVideoTexture);ve(he,S,Be);let Ae;const it=S.mipmaps,k=o&&S.isVideoTexture!==!0,xe=je.__version===void 0||ce===!0,ue=w(S,le,Be);if(S.isDepthTexture)Le=n.DEPTH_COMPONENT,o?S.type===Qn?Le=n.DEPTH_COMPONENT32F:S.type===Jn?Le=n.DEPTH_COMPONENT24:S.type===wi?Le=n.DEPTH24_STENCIL8:Le=n.DEPTH_COMPONENT16:S.type===Qn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),S.format===Si&&Le===n.DEPTH_COMPONENT&&S.type!==vl&&S.type!==Jn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),S.type=Jn,Oe=a.convert(S.type)),S.format===lr&&Le===n.DEPTH_COMPONENT&&(Le=n.DEPTH_STENCIL,S.type!==wi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),S.type=wi,Oe=a.convert(S.type))),xe&&(k?t.texStorage2D(n.TEXTURE_2D,1,Le,le.width,le.height):t.texImage2D(n.TEXTURE_2D,0,Le,le.width,le.height,0,De,Oe,null));else if(S.isDataTexture)if(it.length>0&&Be){k&&xe&&t.texStorage2D(n.TEXTURE_2D,ue,Le,it[0].width,it[0].height);for(let re=0,fe=it.length;re<fe;re++)Ae=it[re],k?t.texSubImage2D(n.TEXTURE_2D,re,0,0,Ae.width,Ae.height,De,Oe,Ae.data):t.texImage2D(n.TEXTURE_2D,re,Le,Ae.width,Ae.height,0,De,Oe,Ae.data);S.generateMipmaps=!1}else k?(xe&&t.texStorage2D(n.TEXTURE_2D,ue,Le,le.width,le.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,le.width,le.height,De,Oe,le.data)):t.texImage2D(n.TEXTURE_2D,0,Le,le.width,le.height,0,De,Oe,le.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){k&&xe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ue,Le,it[0].width,it[0].height,le.depth);for(let re=0,fe=it.length;re<fe;re++)Ae=it[re],S.format!==_n?De!==null?k?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,Ae.width,Ae.height,le.depth,De,Ae.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,re,Le,Ae.width,Ae.height,le.depth,0,Ae.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):k?t.texSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,Ae.width,Ae.height,le.depth,De,Oe,Ae.data):t.texImage3D(n.TEXTURE_2D_ARRAY,re,Le,Ae.width,Ae.height,le.depth,0,De,Oe,Ae.data)}else{k&&xe&&t.texStorage2D(n.TEXTURE_2D,ue,Le,it[0].width,it[0].height);for(let re=0,fe=it.length;re<fe;re++)Ae=it[re],S.format!==_n?De!==null?k?t.compressedTexSubImage2D(n.TEXTURE_2D,re,0,0,Ae.width,Ae.height,De,Ae.data):t.compressedTexImage2D(n.TEXTURE_2D,re,Le,Ae.width,Ae.height,0,Ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):k?t.texSubImage2D(n.TEXTURE_2D,re,0,0,Ae.width,Ae.height,De,Oe,Ae.data):t.texImage2D(n.TEXTURE_2D,re,Le,Ae.width,Ae.height,0,De,Oe,Ae.data)}else if(S.isDataArrayTexture)k?(xe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ue,Le,le.width,le.height,le.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,De,Oe,le.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,Le,le.width,le.height,le.depth,0,De,Oe,le.data);else if(S.isData3DTexture)k?(xe&&t.texStorage3D(n.TEXTURE_3D,ue,Le,le.width,le.height,le.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,De,Oe,le.data)):t.texImage3D(n.TEXTURE_3D,0,Le,le.width,le.height,le.depth,0,De,Oe,le.data);else if(S.isFramebufferTexture){if(xe)if(k)t.texStorage2D(n.TEXTURE_2D,ue,Le,le.width,le.height);else{let re=le.width,fe=le.height;for(let Ue=0;Ue<ue;Ue++)t.texImage2D(n.TEXTURE_2D,Ue,Le,re,fe,0,De,Oe,null),re>>=1,fe>>=1}}else if(it.length>0&&Be){k&&xe&&t.texStorage2D(n.TEXTURE_2D,ue,Le,it[0].width,it[0].height);for(let re=0,fe=it.length;re<fe;re++)Ae=it[re],k?t.texSubImage2D(n.TEXTURE_2D,re,0,0,De,Oe,Ae):t.texImage2D(n.TEXTURE_2D,re,Le,De,Oe,Ae);S.generateMipmaps=!1}else k?(xe&&t.texStorage2D(n.TEXTURE_2D,ue,Le,le.width,le.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,De,Oe,le)):t.texImage2D(n.TEXTURE_2D,0,Le,De,Oe,le);T(S,Be)&&A(he),je.__version=de.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function Te(C,S,W){if(S.image.length!==6)return;const he=Q(C,S),ce=S.source;t.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+W);const de=i.get(ce);if(ce.version!==de.__version||he===!0){t.activeTexture(n.TEXTURE0+W);const je=dt.getPrimaries(dt.workingColorSpace),ge=S.colorSpace===dn?null:dt.getPrimaries(S.colorSpace),we=S.colorSpace===dn||je===ge?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);const D=S.isCompressedTexture||S.image[0].isCompressedTexture,pe=S.image[0]&&S.image[0].isDataTexture,le=[];for(let re=0;re<6;re++)!D&&!pe?le[re]=v(S.image[re],!1,!0,d):le[re]=pe?S.image[re].image:S.image[re],le[re]=xt(S,le[re]);const Be=le[0],De=E(Be)||o,Oe=a.convert(S.format,S.colorSpace),Le=a.convert(S.type),Ae=L(S.internalFormat,Oe,Le,S.colorSpace),it=o&&S.isVideoTexture!==!0,k=de.__version===void 0||he===!0;let xe=w(S,Be,De);ve(n.TEXTURE_CUBE_MAP,S,De);let ue;if(D){it&&k&&t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,Ae,Be.width,Be.height);for(let re=0;re<6;re++){ue=le[re].mipmaps;for(let fe=0;fe<ue.length;fe++){const Ue=ue[fe];S.format!==_n?Oe!==null?it?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,fe,0,0,Ue.width,Ue.height,Oe,Ue.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,fe,Ae,Ue.width,Ue.height,0,Ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):it?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,fe,0,0,Ue.width,Ue.height,Oe,Le,Ue.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,fe,Ae,Ue.width,Ue.height,0,Oe,Le,Ue.data)}}}else{ue=S.mipmaps,it&&k&&(ue.length>0&&xe++,t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,Ae,le[0].width,le[0].height));for(let re=0;re<6;re++)if(pe){it?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,le[re].width,le[re].height,Oe,Le,le[re].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ae,le[re].width,le[re].height,0,Oe,Le,le[re].data);for(let fe=0;fe<ue.length;fe++){const rt=ue[fe].image[re].image;it?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,fe+1,0,0,rt.width,rt.height,Oe,Le,rt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,fe+1,Ae,rt.width,rt.height,0,Oe,Le,rt.data)}}else{it?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Oe,Le,le[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ae,Oe,Le,le[re]);for(let fe=0;fe<ue.length;fe++){const Ue=ue[fe];it?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,fe+1,0,0,Oe,Le,Ue.image[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,fe+1,Ae,Oe,Le,Ue.image[re])}}}T(S,De)&&A(n.TEXTURE_CUBE_MAP),de.__version=ce.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function oe(C,S,W,he,ce,de){const je=a.convert(W.format,W.colorSpace),ge=a.convert(W.type),we=L(W.internalFormat,je,ge,W.colorSpace);if(!i.get(S).__hasExternalTextures){const pe=Math.max(1,S.width>>de),le=Math.max(1,S.height>>de);ce===n.TEXTURE_3D||ce===n.TEXTURE_2D_ARRAY?t.texImage3D(ce,de,we,pe,le,S.depth,0,je,ge,null):t.texImage2D(ce,de,we,pe,le,0,je,ge,null)}t.bindFramebuffer(n.FRAMEBUFFER,C),ke(S)?p.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,he,ce,i.get(W).__webglTexture,0,Fe(S)):(ce===n.TEXTURE_2D||ce>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ce<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,he,ce,i.get(W).__webglTexture,de),t.bindFramebuffer(n.FRAMEBUFFER,null)}function U(C,S,W){if(n.bindRenderbuffer(n.RENDERBUFFER,C),S.depthBuffer&&!S.stencilBuffer){let he=o===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(W||ke(S)){const ce=S.depthTexture;ce&&ce.isDepthTexture&&(ce.type===Qn?he=n.DEPTH_COMPONENT32F:ce.type===Jn&&(he=n.DEPTH_COMPONENT24));const de=Fe(S);ke(S)?p.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,de,he,S.width,S.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,de,he,S.width,S.height)}else n.renderbufferStorage(n.RENDERBUFFER,he,S.width,S.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,C)}else if(S.depthBuffer&&S.stencilBuffer){const he=Fe(S);W&&ke(S)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,he,n.DEPTH24_STENCIL8,S.width,S.height):ke(S)?p.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,he,n.DEPTH24_STENCIL8,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,C)}else{const he=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let ce=0;ce<he.length;ce++){const de=he[ce],je=a.convert(de.format,de.colorSpace),ge=a.convert(de.type),we=L(de.internalFormat,je,ge,de.colorSpace),D=Fe(S);W&&ke(S)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,D,we,S.width,S.height):ke(S)?p.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,D,we,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,we,S.width,S.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ze(C,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,C),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),ne(S.depthTexture,0);const he=i.get(S.depthTexture).__webglTexture,ce=Fe(S);if(S.depthTexture.format===Si)ke(S)?p.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,he,0,ce):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,he,0);else if(S.depthTexture.format===lr)ke(S)?p.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,he,0,ce):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,he,0);else throw new Error("Unknown depthTexture format")}function _e(C){const S=i.get(C),W=C.isWebGLCubeRenderTarget===!0;if(C.depthTexture&&!S.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");Ze(S.__webglFramebuffer,C)}else if(W){S.__webglDepthbuffer=[];for(let he=0;he<6;he++)t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[he]),S.__webglDepthbuffer[he]=n.createRenderbuffer(),U(S.__webglDepthbuffer[he],C,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer=n.createRenderbuffer(),U(S.__webglDepthbuffer,C,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function me(C,S,W){const he=i.get(C);S!==void 0&&oe(he.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),W!==void 0&&_e(C)}function Re(C){const S=C.texture,W=i.get(C),he=i.get(S);C.addEventListener("dispose",B),C.isWebGLMultipleRenderTargets!==!0&&(he.__webglTexture===void 0&&(he.__webglTexture=n.createTexture()),he.__version=S.version,l.memory.textures++);const ce=C.isWebGLCubeRenderTarget===!0,de=C.isWebGLMultipleRenderTargets===!0,je=E(C)||o;if(ce){W.__webglFramebuffer=[];for(let ge=0;ge<6;ge++)if(o&&S.mipmaps&&S.mipmaps.length>0){W.__webglFramebuffer[ge]=[];for(let we=0;we<S.mipmaps.length;we++)W.__webglFramebuffer[ge][we]=n.createFramebuffer()}else W.__webglFramebuffer[ge]=n.createFramebuffer()}else{if(o&&S.mipmaps&&S.mipmaps.length>0){W.__webglFramebuffer=[];for(let ge=0;ge<S.mipmaps.length;ge++)W.__webglFramebuffer[ge]=n.createFramebuffer()}else W.__webglFramebuffer=n.createFramebuffer();if(de)if(s.drawBuffers){const ge=C.texture;for(let we=0,D=ge.length;we<D;we++){const pe=i.get(ge[we]);pe.__webglTexture===void 0&&(pe.__webglTexture=n.createTexture(),l.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&C.samples>0&&ke(C)===!1){const ge=de?S:[S];W.__webglMultisampledFramebuffer=n.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let we=0;we<ge.length;we++){const D=ge[we];W.__webglColorRenderbuffer[we]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,W.__webglColorRenderbuffer[we]);const pe=a.convert(D.format,D.colorSpace),le=a.convert(D.type),Be=L(D.internalFormat,pe,le,D.colorSpace,C.isXRRenderTarget===!0),De=Fe(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,De,Be,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.RENDERBUFFER,W.__webglColorRenderbuffer[we])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(W.__webglDepthRenderbuffer=n.createRenderbuffer(),U(W.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ce){t.bindTexture(n.TEXTURE_CUBE_MAP,he.__webglTexture),ve(n.TEXTURE_CUBE_MAP,S,je);for(let ge=0;ge<6;ge++)if(o&&S.mipmaps&&S.mipmaps.length>0)for(let we=0;we<S.mipmaps.length;we++)oe(W.__webglFramebuffer[ge][we],C,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,we);else oe(W.__webglFramebuffer[ge],C,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0);T(S,je)&&A(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(de){const ge=C.texture;for(let we=0,D=ge.length;we<D;we++){const pe=ge[we],le=i.get(pe);t.bindTexture(n.TEXTURE_2D,le.__webglTexture),ve(n.TEXTURE_2D,pe,je),oe(W.__webglFramebuffer,C,pe,n.COLOR_ATTACHMENT0+we,n.TEXTURE_2D,0),T(pe,je)&&A(n.TEXTURE_2D)}t.unbindTexture()}else{let ge=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(o?ge=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ge,he.__webglTexture),ve(ge,S,je),o&&S.mipmaps&&S.mipmaps.length>0)for(let we=0;we<S.mipmaps.length;we++)oe(W.__webglFramebuffer[we],C,S,n.COLOR_ATTACHMENT0,ge,we);else oe(W.__webglFramebuffer,C,S,n.COLOR_ATTACHMENT0,ge,0);T(S,je)&&A(ge),t.unbindTexture()}C.depthBuffer&&_e(C)}function Ne(C){const S=E(C)||o,W=C.isWebGLMultipleRenderTargets===!0?C.texture:[C.texture];for(let he=0,ce=W.length;he<ce;he++){const de=W[he];if(T(de,S)){const je=C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,ge=i.get(de).__webglTexture;t.bindTexture(je,ge),A(je),t.unbindTexture()}}}function Pe(C){if(o&&C.samples>0&&ke(C)===!1){const S=C.isWebGLMultipleRenderTargets?C.texture:[C.texture],W=C.width,he=C.height;let ce=n.COLOR_BUFFER_BIT;const de=[],je=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ge=i.get(C),we=C.isWebGLMultipleRenderTargets===!0;if(we)for(let D=0;D<S.length;D++)t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+D,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+D,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ge.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ge.__webglFramebuffer);for(let D=0;D<S.length;D++){de.push(n.COLOR_ATTACHMENT0+D),C.depthBuffer&&de.push(je);const pe=ge.__ignoreDepthValues!==void 0?ge.__ignoreDepthValues:!1;if(pe===!1&&(C.depthBuffer&&(ce|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&(ce|=n.STENCIL_BUFFER_BIT)),we&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ge.__webglColorRenderbuffer[D]),pe===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[je]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[je])),we){const le=i.get(S[D]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,le,0)}n.blitFramebuffer(0,0,W,he,0,0,W,he,ce,n.NEAREST),x&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,de)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),we)for(let D=0;D<S.length;D++){t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+D,n.RENDERBUFFER,ge.__webglColorRenderbuffer[D]);const pe=i.get(S[D]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+D,n.TEXTURE_2D,pe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ge.__webglMultisampledFramebuffer)}}function Fe(C){return Math.min(f,C.samples)}function ke(C){const S=i.get(C);return o&&C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function ht(C){const S=l.render.frame;y.get(C)!==S&&(y.set(C,S),C.update())}function xt(C,S){const W=C.colorSpace,he=C.format,ce=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||C.format===Jo||W!==Hn&&W!==dn&&(dt.getTransfer(W)===pt?o===!1?e.has("EXT_sRGB")===!0&&he===_n?(C.format=Jo,C.minFilter=ln,C.generateMipmaps=!1):S=Xh.sRGBToLinear(S):(he!==_n||ce!==ri)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),S}this.allocateTextureUnit=ae,this.resetTextureUnits=Y,this.setTexture2D=ne,this.setTexture2DArray=N,this.setTexture3D=I,this.setTextureCube=G,this.rebindTextures=me,this.setupRenderTarget=Re,this.updateRenderTargetMipmap=Ne,this.updateMultisampleRenderTarget=Pe,this.setupDepthRenderbuffer=_e,this.setupFrameBufferTexture=oe,this.useMultisampledRTT=ke}function xS(n,e,t){const i=t.isWebGL2;function s(a,l=dn){let o;const c=dt.getTransfer(l);if(a===ri)return n.UNSIGNED_BYTE;if(a===kh)return n.UNSIGNED_SHORT_4_4_4_4;if(a===Fh)return n.UNSIGNED_SHORT_5_5_5_1;if(a===Qv)return n.BYTE;if(a===ey)return n.SHORT;if(a===vl)return n.UNSIGNED_SHORT;if(a===Oh)return n.INT;if(a===Jn)return n.UNSIGNED_INT;if(a===Qn)return n.FLOAT;if(a===Br)return i?n.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(a===ty)return n.ALPHA;if(a===_n)return n.RGBA;if(a===ny)return n.LUMINANCE;if(a===iy)return n.LUMINANCE_ALPHA;if(a===Si)return n.DEPTH_COMPONENT;if(a===lr)return n.DEPTH_STENCIL;if(a===Jo)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(a===ry)return n.RED;if(a===Bh)return n.RED_INTEGER;if(a===sy)return n.RG;if(a===zh)return n.RG_INTEGER;if(a===Hh)return n.RGBA_INTEGER;if(a===Xa||a===qa||a===$a||a===Ya)if(c===pt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(a===Xa)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(a===qa)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(a===$a)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(a===Ya)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(a===Xa)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(a===qa)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(a===$a)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(a===Ya)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(a===Pc||a===Lc||a===jc||a===Dc)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(a===Pc)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(a===Lc)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(a===jc)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(a===Dc)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(a===ay)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(a===Ic||a===Uc)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(a===Ic)return c===pt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(a===Uc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(a===Oc||a===kc||a===Fc||a===Bc||a===zc||a===Hc||a===Gc||a===Vc||a===Wc||a===Xc||a===qc||a===$c||a===Yc||a===Kc)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(a===Oc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(a===kc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(a===Fc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(a===Bc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(a===zc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(a===Hc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(a===Gc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(a===Vc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(a===Wc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(a===Xc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(a===qc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(a===$c)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(a===Yc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(a===Kc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(a===Ka||a===Zc||a===Jc)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(a===Ka)return c===pt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(a===Zc)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(a===Jc)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(a===oy||a===Qc||a===ed||a===td)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(a===Ka)return o.COMPRESSED_RED_RGTC1_EXT;if(a===Qc)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(a===ed)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(a===td)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return a===wi?i?n.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):n[a]!==void 0?n[a]:null}return{convert:s}}class vS extends qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class jr extends Lt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const yS={type:"move"};class bo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new jr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new jr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new jr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new q),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,a=null,l=null;const o=this._targetRay,c=this._grip,d=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(d&&e.hand){l=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,i),h=this._getHandJoint(d,g);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}const u=d.joints["index-finger-tip"],f=d.joints["thumb-tip"],p=u.position.distanceTo(f.position),x=.02,y=.005;d.inputState.pinching&&p>x+y?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!d.inputState.pinching&&p<=x-y&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(c.matrix.fromArray(a.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,a.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(a.linearVelocity)):c.hasLinearVelocity=!1,a.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(a.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&a!==null&&(s=a),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(yS)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=a!==null),d!==null&&(d.visible=l!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new jr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class _S extends Zt{constructor(e,t,i,s,a,l,o,c,d,u){if(u=u!==void 0?u:Si,u!==Si&&u!==lr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Si&&(i=Jn),i===void 0&&u===lr&&(i=wi),super(null,s,a,l,o,c,u,i,d),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:zt,this.minFilter=c!==void 0?c:zt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class bS extends Ci{constructor(e,t){super();const i=this;let s=null,a=1,l=null,o="local-floor",c=1,d=null,u=null,f=null,p=null,x=null,y=null;const g=t.getContextAttributes();let m=null,h=null;const b=[],v=[],E=new qt;E.layers.enable(1),E.viewport=new Pt;const _=new qt;_.layers.enable(2),_.viewport=new Pt;const T=[E,_],A=new vS;A.layers.enable(1),A.layers.enable(2);let L=null,w=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(N){let I=b[N];return I===void 0&&(I=new bo,b[N]=I),I.getTargetRaySpace()},this.getControllerGrip=function(N){let I=b[N];return I===void 0&&(I=new bo,b[N]=I),I.getGripSpace()},this.getHand=function(N){let I=b[N];return I===void 0&&(I=new bo,b[N]=I),I.getHandSpace()};function M(N){const I=v.indexOf(N.inputSource);if(I===-1)return;const G=b[I];G!==void 0&&(G.update(N.inputSource,N.frame,d||l),G.dispatchEvent({type:N.type,data:N.inputSource}))}function j(){s.removeEventListener("select",M),s.removeEventListener("selectstart",M),s.removeEventListener("selectend",M),s.removeEventListener("squeeze",M),s.removeEventListener("squeezestart",M),s.removeEventListener("squeezeend",M),s.removeEventListener("end",j),s.removeEventListener("inputsourceschange",B);for(let N=0;N<b.length;N++){const I=v[N];I!==null&&(v[N]=null,b[N].disconnect(I))}L=null,w=null,e.setRenderTarget(m),x=null,p=null,f=null,s=null,h=null,ne.stop(),i.isPresenting=!1,i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(N){a=N,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(N){o=N,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||l},this.setReferenceSpace=function(N){d=N},this.getBaseLayer=function(){return p!==null?p:x},this.getBinding=function(){return f},this.getFrame=function(){return y},this.getSession=function(){return s},this.setSession=async function(N){if(s=N,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",M),s.addEventListener("selectstart",M),s.addEventListener("selectend",M),s.addEventListener("squeeze",M),s.addEventListener("squeezestart",M),s.addEventListener("squeezeend",M),s.addEventListener("end",j),s.addEventListener("inputsourceschange",B),g.xrCompatible!==!0&&await t.makeXRCompatible(),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const I={antialias:s.renderState.layers===void 0?g.antialias:!0,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:a};x=new XRWebGLLayer(s,t,I),s.updateRenderState({baseLayer:x}),h=new Ai(x.framebufferWidth,x.framebufferHeight,{format:_n,type:ri,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let I=null,G=null,H=null;g.depth&&(H=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,I=g.stencil?lr:Si,G=g.stencil?wi:Jn);const ie={colorFormat:t.RGBA8,depthFormat:H,scaleFactor:a};f=new XRWebGLBinding(s,t),p=f.createProjectionLayer(ie),s.updateRenderState({layers:[p]}),h=new Ai(p.textureWidth,p.textureHeight,{format:_n,type:ri,depthTexture:new _S(p.textureWidth,p.textureHeight,G,void 0,void 0,void 0,void 0,void 0,void 0,I),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0});const F=e.properties.get(h);F.__ignoreDepthValues=p.ignoreDepthValues}h.isXRRenderTarget=!0,this.setFoveation(c),d=null,l=await s.requestReferenceSpace(o),ne.setContext(s),ne.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function B(N){for(let I=0;I<N.removed.length;I++){const G=N.removed[I],H=v.indexOf(G);H>=0&&(v[H]=null,b[H].disconnect(G))}for(let I=0;I<N.added.length;I++){const G=N.added[I];let H=v.indexOf(G);if(H===-1){for(let F=0;F<b.length;F++)if(F>=v.length){v.push(G),H=F;break}else if(v[F]===null){v[F]=G,H=F;break}if(H===-1)break}const ie=b[H];ie&&ie.connect(G)}}const $=new q,P=new q;function z(N,I,G){$.setFromMatrixPosition(I.matrixWorld),P.setFromMatrixPosition(G.matrixWorld);const H=$.distanceTo(P),ie=I.projectionMatrix.elements,F=G.projectionMatrix.elements,ve=ie[14]/(ie[10]-1),Q=ie[14]/(ie[10]+1),Ee=(ie[9]+1)/ie[5],Te=(ie[9]-1)/ie[5],oe=(ie[8]-1)/ie[0],U=(F[8]+1)/F[0],Ze=ve*oe,_e=ve*U,me=H/(-oe+U),Re=me*-oe;I.matrixWorld.decompose(N.position,N.quaternion,N.scale),N.translateX(Re),N.translateZ(me),N.matrixWorld.compose(N.position,N.quaternion,N.scale),N.matrixWorldInverse.copy(N.matrixWorld).invert();const Ne=ve+me,Pe=Q+me,Fe=Ze-Re,ke=_e+(H-Re),ht=Ee*Q/Pe*Ne,xt=Te*Q/Pe*Ne;N.projectionMatrix.makePerspective(Fe,ke,ht,xt,Ne,Pe),N.projectionMatrixInverse.copy(N.projectionMatrix).invert()}function Z(N,I){I===null?N.matrixWorld.copy(N.matrix):N.matrixWorld.multiplyMatrices(I.matrixWorld,N.matrix),N.matrixWorldInverse.copy(N.matrixWorld).invert()}this.updateCamera=function(N){if(s===null)return;A.near=_.near=E.near=N.near,A.far=_.far=E.far=N.far,(L!==A.near||w!==A.far)&&(s.updateRenderState({depthNear:A.near,depthFar:A.far}),L=A.near,w=A.far);const I=N.parent,G=A.cameras;Z(A,I);for(let H=0;H<G.length;H++)Z(G[H],I);G.length===2?z(A,E,_):A.projectionMatrix.copy(E.projectionMatrix),Y(N,A,I)};function Y(N,I,G){G===null?N.matrix.copy(I.matrixWorld):(N.matrix.copy(G.matrixWorld),N.matrix.invert(),N.matrix.multiply(I.matrixWorld)),N.matrix.decompose(N.position,N.quaternion,N.scale),N.updateMatrixWorld(!0),N.projectionMatrix.copy(I.projectionMatrix),N.projectionMatrixInverse.copy(I.projectionMatrixInverse),N.isPerspectiveCamera&&(N.fov=da*2*Math.atan(1/N.projectionMatrix.elements[5]),N.zoom=1)}this.getCamera=function(){return A},this.getFoveation=function(){if(!(p===null&&x===null))return c},this.setFoveation=function(N){c=N,p!==null&&(p.fixedFoveation=N),x!==null&&x.fixedFoveation!==void 0&&(x.fixedFoveation=N)};let ae=null;function J(N,I){if(u=I.getViewerPose(d||l),y=I,u!==null){const G=u.views;x!==null&&(e.setRenderTargetFramebuffer(h,x.framebuffer),e.setRenderTarget(h));let H=!1;G.length!==A.cameras.length&&(A.cameras.length=0,H=!0);for(let ie=0;ie<G.length;ie++){const F=G[ie];let ve=null;if(x!==null)ve=x.getViewport(F);else{const Ee=f.getViewSubImage(p,F);ve=Ee.viewport,ie===0&&(e.setRenderTargetTextures(h,Ee.colorTexture,p.ignoreDepthValues?void 0:Ee.depthStencilTexture),e.setRenderTarget(h))}let Q=T[ie];Q===void 0&&(Q=new qt,Q.layers.enable(ie),Q.viewport=new Pt,T[ie]=Q),Q.matrix.fromArray(F.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(F.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set(ve.x,ve.y,ve.width,ve.height),ie===0&&(A.matrix.copy(Q.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale)),H===!0&&A.cameras.push(Q)}}for(let G=0;G<b.length;G++){const H=v[G],ie=b[G];H!==null&&ie!==void 0&&ie.update(H,I,d||l)}ae&&ae(N,I),I.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:I}),y=null}const ne=new nf;ne.setAnimationLoop(J),this.setAnimationLoop=function(N){ae=N},this.dispose=function(){}}}function wS(n,e){function t(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function i(m,h){h.color.getRGB(m.fogColor.value,Qh(n)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function s(m,h,b,v,E){h.isMeshBasicMaterial||h.isMeshLambertMaterial?a(m,h):h.isMeshToonMaterial?(a(m,h),f(m,h)):h.isMeshPhongMaterial?(a(m,h),u(m,h)):h.isMeshStandardMaterial?(a(m,h),p(m,h),h.isMeshPhysicalMaterial&&x(m,h,E)):h.isMeshMatcapMaterial?(a(m,h),y(m,h)):h.isMeshDepthMaterial?a(m,h):h.isMeshDistanceMaterial?(a(m,h),g(m,h)):h.isMeshNormalMaterial?a(m,h):h.isLineBasicMaterial?(l(m,h),h.isLineDashedMaterial&&o(m,h)):h.isPointsMaterial?c(m,h,b,v):h.isSpriteMaterial?d(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function a(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,t(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===Kt&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,t(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===Kt&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,t(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,t(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);const b=e.get(h).envMap;if(b&&(m.envMap.value=b,m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap){m.lightMap.value=h.lightMap;const v=n._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=h.lightMapIntensity*v,t(h.lightMap,m.lightMapTransform)}h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,m.aoMapTransform))}function l(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform))}function o(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function c(m,h,b,v){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*b,m.scale.value=v*.5,h.map&&(m.map.value=h.map,t(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function d(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function u(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function f(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function p(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,m.roughnessMapTransform)),e.get(h).envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function x(m,h,b){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Kt&&m.clearcoatNormalScale.value.negate())),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,m.specularIntensityMapTransform))}function y(m,h){h.matcap&&(m.matcap.value=h.matcap)}function g(m,h){const b=e.get(h).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function SS(n,e,t,i){let s={},a={},l=[];const o=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(b,v){const E=v.program;i.uniformBlockBinding(b,E)}function d(b,v){let E=s[b.id];E===void 0&&(y(b),E=u(b),s[b.id]=E,b.addEventListener("dispose",m));const _=v.program;i.updateUBOMapping(b,_);const T=e.render.frame;a[b.id]!==T&&(p(b),a[b.id]=T)}function u(b){const v=f();b.__bindingPointIndex=v;const E=n.createBuffer(),_=b.__size,T=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,_,T),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,v,E),E}function f(){for(let b=0;b<o;b++)if(l.indexOf(b)===-1)return l.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(b){const v=s[b.id],E=b.uniforms,_=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,v);for(let T=0,A=E.length;T<A;T++){const L=E[T];if(x(L,T,_)===!0){const w=L.__offset,M=Array.isArray(L.value)?L.value:[L.value];let j=0;for(let B=0;B<M.length;B++){const $=M[B],P=g($);typeof $=="number"?(L.__data[0]=$,n.bufferSubData(n.UNIFORM_BUFFER,w+j,L.__data)):$.isMatrix3?(L.__data[0]=$.elements[0],L.__data[1]=$.elements[1],L.__data[2]=$.elements[2],L.__data[3]=$.elements[0],L.__data[4]=$.elements[3],L.__data[5]=$.elements[4],L.__data[6]=$.elements[5],L.__data[7]=$.elements[0],L.__data[8]=$.elements[6],L.__data[9]=$.elements[7],L.__data[10]=$.elements[8],L.__data[11]=$.elements[0]):($.toArray(L.__data,j),j+=P.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,w,L.__data)}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function x(b,v,E){const _=b.value;if(E[v]===void 0){if(typeof _=="number")E[v]=_;else{const T=Array.isArray(_)?_:[_],A=[];for(let L=0;L<T.length;L++)A.push(T[L].clone());E[v]=A}return!0}else if(typeof _=="number"){if(E[v]!==_)return E[v]=_,!0}else{const T=Array.isArray(E[v])?E[v]:[E[v]],A=Array.isArray(_)?_:[_];for(let L=0;L<T.length;L++){const w=T[L];if(w.equals(A[L])===!1)return w.copy(A[L]),!0}}return!1}function y(b){const v=b.uniforms;let E=0;const _=16;let T=0;for(let A=0,L=v.length;A<L;A++){const w=v[A],M={boundary:0,storage:0},j=Array.isArray(w.value)?w.value:[w.value];for(let B=0,$=j.length;B<$;B++){const P=j[B],z=g(P);M.boundary+=z.boundary,M.storage+=z.storage}if(w.__data=new Float32Array(M.storage/Float32Array.BYTES_PER_ELEMENT),w.__offset=E,A>0){T=E%_;const B=_-T;T!==0&&B-M.boundary<0&&(E+=_-T,w.__offset=E)}E+=M.storage}return T=E%_,T>0&&(E+=_-T),b.__size=E,b.__cache={},this}function g(b){const v={boundary:0,storage:0};return typeof b=="number"?(v.boundary=4,v.storage=4):b.isVector2?(v.boundary=8,v.storage=8):b.isVector3||b.isColor?(v.boundary=16,v.storage=12):b.isVector4?(v.boundary=16,v.storage=16):b.isMatrix3?(v.boundary=48,v.storage=48):b.isMatrix4?(v.boundary=64,v.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),v}function m(b){const v=b.target;v.removeEventListener("dispose",m);const E=l.indexOf(v.__bindingPointIndex);l.splice(E,1),n.deleteBuffer(s[v.id]),delete s[v.id],delete a[v.id]}function h(){for(const b in s)n.deleteBuffer(s[b]);l=[],s={},a={}}return{bind:c,update:d,dispose:h}}class El{constructor(e={}){const{canvas:t=by(),context:i=null,depth:s=!0,stencil:a=!0,alpha:l=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:d=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let p;i!==null?p=i.getContextAttributes().alpha:p=l;const x=new Uint32Array(4),y=new Int32Array(4);let g=null,m=null;const h=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=jt,this._useLegacyLights=!1,this.toneMapping=ii,this.toneMappingExposure=1;const v=this;let E=!1,_=0,T=0,A=null,L=-1,w=null;const M=new Pt,j=new Pt;let B=null;const $=new ot(0);let P=0,z=t.width,Z=t.height,Y=1,ae=null,J=null;const ne=new Pt(0,0,z,Z),N=new Pt(0,0,z,Z);let I=!1;const G=new wl;let H=!1,ie=!1,F=null;const ve=new _t,Q=new $e,Ee=new q,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function oe(){return A===null?Y:1}let U=i;function Ze(R,X){for(let K=0;K<R.length;K++){const ee=R[K],te=t.getContext(ee,X);if(te!==null)return te}return null}try{const R={alpha:!0,depth:s,stencil:a,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:d,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${xl}`),t.addEventListener("webglcontextlost",it,!1),t.addEventListener("webglcontextrestored",k,!1),t.addEventListener("webglcontextcreationerror",xe,!1),U===null){const X=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&X.shift(),U=Ze(X,R),U===null)throw Ze(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&U instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),U.getShaderPrecisionFormat===void 0&&(U.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let _e,me,Re,Ne,Pe,Fe,ke,ht,xt,C,S,W,he,ce,de,je,ge,we,D,pe,le,Be,De,Oe;function Le(){_e=new j1(U),me=new A1(U,_e,e),_e.init(me),Be=new xS(U,_e,me),Re=new mS(U,_e,me),Ne=new U1(U),Pe=new tS,Fe=new gS(U,_e,Re,Pe,me,Be,Ne),ke=new C1(v),ht=new L1(v),xt=new Xy(U,me),De=new M1(U,_e,xt,me),C=new D1(U,xt,Ne,De),S=new B1(U,C,xt,Ne),D=new F1(U,me,Fe),je=new R1(Pe),W=new eS(v,ke,ht,_e,me,De,je),he=new wS(v,Pe),ce=new iS,de=new cS(_e,me),we=new E1(v,ke,ht,Re,S,p,c),ge=new pS(v,S,me),Oe=new SS(U,Ne,me,Re),pe=new T1(U,_e,Ne,me),le=new I1(U,_e,Ne,me),Ne.programs=W.programs,v.capabilities=me,v.extensions=_e,v.properties=Pe,v.renderLists=ce,v.shadowMap=ge,v.state=Re,v.info=Ne}Le();const Ae=new bS(v,U);this.xr=Ae,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const R=_e.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=_e.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(R){R!==void 0&&(Y=R,this.setSize(z,Z,!1))},this.getSize=function(R){return R.set(z,Z)},this.setSize=function(R,X,K=!0){if(Ae.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=R,Z=X,t.width=Math.floor(R*Y),t.height=Math.floor(X*Y),K===!0&&(t.style.width=R+"px",t.style.height=X+"px"),this.setViewport(0,0,R,X)},this.getDrawingBufferSize=function(R){return R.set(z*Y,Z*Y).floor()},this.setDrawingBufferSize=function(R,X,K){z=R,Z=X,Y=K,t.width=Math.floor(R*K),t.height=Math.floor(X*K),this.setViewport(0,0,R,X)},this.getCurrentViewport=function(R){return R.copy(M)},this.getViewport=function(R){return R.copy(ne)},this.setViewport=function(R,X,K,ee){R.isVector4?ne.set(R.x,R.y,R.z,R.w):ne.set(R,X,K,ee),Re.viewport(M.copy(ne).multiplyScalar(Y).floor())},this.getScissor=function(R){return R.copy(N)},this.setScissor=function(R,X,K,ee){R.isVector4?N.set(R.x,R.y,R.z,R.w):N.set(R,X,K,ee),Re.scissor(j.copy(N).multiplyScalar(Y).floor())},this.getScissorTest=function(){return I},this.setScissorTest=function(R){Re.setScissorTest(I=R)},this.setOpaqueSort=function(R){ae=R},this.setTransparentSort=function(R){J=R},this.getClearColor=function(R){return R.copy(we.getClearColor())},this.setClearColor=function(){we.setClearColor.apply(we,arguments)},this.getClearAlpha=function(){return we.getClearAlpha()},this.setClearAlpha=function(){we.setClearAlpha.apply(we,arguments)},this.clear=function(R=!0,X=!0,K=!0){let ee=0;if(R){let te=!1;if(A!==null){const Me=A.texture.format;te=Me===Hh||Me===zh||Me===Bh}if(te){const Me=A.texture.type,Ie=Me===ri||Me===Jn||Me===vl||Me===wi||Me===kh||Me===Fh,ze=we.getClearColor(),qe=we.getClearAlpha(),tt=ze.r,Ye=ze.g,Je=ze.b;Ie?(x[0]=tt,x[1]=Ye,x[2]=Je,x[3]=qe,U.clearBufferuiv(U.COLOR,0,x)):(y[0]=tt,y[1]=Ye,y[2]=Je,y[3]=qe,U.clearBufferiv(U.COLOR,0,y))}else ee|=U.COLOR_BUFFER_BIT}X&&(ee|=U.DEPTH_BUFFER_BIT),K&&(ee|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(ee)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",it,!1),t.removeEventListener("webglcontextrestored",k,!1),t.removeEventListener("webglcontextcreationerror",xe,!1),ce.dispose(),de.dispose(),Pe.dispose(),ke.dispose(),ht.dispose(),S.dispose(),De.dispose(),Oe.dispose(),W.dispose(),Ae.dispose(),Ae.removeEventListener("sessionstart",rn),Ae.removeEventListener("sessionend",ut),F&&(F.dispose(),F=null),kt.stop()};function it(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function k(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const R=Ne.autoReset,X=ge.enabled,K=ge.autoUpdate,ee=ge.needsUpdate,te=ge.type;Le(),Ne.autoReset=R,ge.enabled=X,ge.autoUpdate=K,ge.needsUpdate=ee,ge.type=te}function xe(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function ue(R){const X=R.target;X.removeEventListener("dispose",ue),re(X)}function re(R){fe(R),Pe.remove(R)}function fe(R){const X=Pe.get(R).programs;X!==void 0&&(X.forEach(function(K){W.releaseProgram(K)}),R.isShaderMaterial&&W.releaseShaderCache(R))}this.renderBufferDirect=function(R,X,K,ee,te,Me){X===null&&(X=Te);const Ie=te.isMesh&&te.matrixWorld.determinant()<0,ze=_f(R,X,K,ee,te);Re.setMaterial(ee,Ie);let qe=K.index,tt=1;if(ee.wireframe===!0){if(qe=C.getWireframeAttribute(K),qe===void 0)return;tt=2}const Ye=K.drawRange,Je=K.attributes.position;let wt=Ye.start*tt,Jt=(Ye.start+Ye.count)*tt;Me!==null&&(wt=Math.max(wt,Me.start*tt),Jt=Math.min(Jt,(Me.start+Me.count)*tt)),qe!==null?(wt=Math.max(wt,0),Jt=Math.min(Jt,qe.count)):Je!=null&&(wt=Math.max(wt,0),Jt=Math.min(Jt,Je.count));const Ct=Jt-wt;if(Ct<0||Ct===1/0)return;De.setup(te,ee,ze,K,qe);let Nn,bt=pe;if(qe!==null&&(Nn=xt.get(qe),bt=le,bt.setIndex(Nn)),te.isMesh)ee.wireframe===!0?(Re.setLineWidth(ee.wireframeLinewidth*oe()),bt.setMode(U.LINES)):bt.setMode(U.TRIANGLES);else if(te.isLine){let st=ee.linewidth;st===void 0&&(st=1),Re.setLineWidth(st*oe()),te.isLineSegments?bt.setMode(U.LINES):te.isLineLoop?bt.setMode(U.LINE_LOOP):bt.setMode(U.LINE_STRIP)}else te.isPoints?bt.setMode(U.POINTS):te.isSprite&&bt.setMode(U.TRIANGLES);if(te.isInstancedMesh)bt.renderInstances(wt,Ct,te.count);else if(K.isInstancedBufferGeometry){const st=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Aa=Math.min(K.instanceCount,st);bt.renderInstances(wt,Ct,Aa)}else bt.render(wt,Ct)};function Ue(R,X,K){R.transparent===!0&&R.side===Mn&&R.forceSinglePass===!1?(R.side=Kt,R.needsUpdate=!0,Jr(R,X,K),R.side=ai,R.needsUpdate=!0,Jr(R,X,K),R.side=Mn):Jr(R,X,K)}this.compile=function(R,X,K=null){K===null&&(K=R),m=de.get(K),m.init(),b.push(m),K.traverseVisible(function(te){te.isLight&&te.layers.test(X.layers)&&(m.pushLight(te),te.castShadow&&m.pushShadow(te))}),R!==K&&R.traverseVisible(function(te){te.isLight&&te.layers.test(X.layers)&&(m.pushLight(te),te.castShadow&&m.pushShadow(te))}),m.setupLights(v._useLegacyLights);const ee=new Set;return R.traverse(function(te){const Me=te.material;if(Me)if(Array.isArray(Me))for(let Ie=0;Ie<Me.length;Ie++){const ze=Me[Ie];Ue(ze,K,te),ee.add(ze)}else Ue(Me,K,te),ee.add(Me)}),b.pop(),m=null,ee},this.compileAsync=function(R,X,K=null){const ee=this.compile(R,X,K);return new Promise(te=>{function Me(){if(ee.forEach(function(Ie){Pe.get(Ie).currentProgram.isReady()&&ee.delete(Ie)}),ee.size===0){te(R);return}setTimeout(Me,10)}_e.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let rt=null;function St(R){rt&&rt(R)}function rn(){kt.stop()}function ut(){kt.start()}const kt=new nf;kt.setAnimationLoop(St),typeof self<"u"&&kt.setContext(self),this.setAnimationLoop=function(R){rt=R,Ae.setAnimationLoop(R),R===null?kt.stop():kt.start()},Ae.addEventListener("sessionstart",rn),Ae.addEventListener("sessionend",ut),this.render=function(R,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),Ae.enabled===!0&&Ae.isPresenting===!0&&(Ae.cameraAutoUpdate===!0&&Ae.updateCamera(X),X=Ae.getCamera()),R.isScene===!0&&R.onBeforeRender(v,R,X,A),m=de.get(R,b.length),m.init(),b.push(m),ve.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),G.setFromProjectionMatrix(ve),ie=this.localClippingEnabled,H=je.init(this.clippingPlanes,ie),g=ce.get(R,h.length),g.init(),h.push(g),Sn(R,X,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(ae,J),this.info.render.frame++,H===!0&&je.beginShadows();const K=m.state.shadowsArray;if(ge.render(K,R,X),H===!0&&je.endShadows(),this.info.autoReset===!0&&this.info.reset(),we.render(g,R),m.setupLights(v._useLegacyLights),X.isArrayCamera){const ee=X.cameras;for(let te=0,Me=ee.length;te<Me;te++){const Ie=ee[te];Al(g,R,Ie,Ie.viewport)}}else Al(g,R,X);A!==null&&(Fe.updateMultisampleRenderTarget(A),Fe.updateRenderTargetMipmap(A)),R.isScene===!0&&R.onAfterRender(v,R,X),De.resetDefaultState(),L=-1,w=null,b.pop(),b.length>0?m=b[b.length-1]:m=null,h.pop(),h.length>0?g=h[h.length-1]:g=null};function Sn(R,X,K,ee){if(R.visible===!1)return;if(R.layers.test(X.layers)){if(R.isGroup)K=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(X);else if(R.isLight)m.pushLight(R),R.castShadow&&m.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||G.intersectsSprite(R)){ee&&Ee.setFromMatrixPosition(R.matrixWorld).applyMatrix4(ve);const Ie=S.update(R),ze=R.material;ze.visible&&g.push(R,Ie,ze,K,Ee.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||G.intersectsObject(R))){const Ie=S.update(R),ze=R.material;if(ee&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Ee.copy(R.boundingSphere.center)):(Ie.boundingSphere===null&&Ie.computeBoundingSphere(),Ee.copy(Ie.boundingSphere.center)),Ee.applyMatrix4(R.matrixWorld).applyMatrix4(ve)),Array.isArray(ze)){const qe=Ie.groups;for(let tt=0,Ye=qe.length;tt<Ye;tt++){const Je=qe[tt],wt=ze[Je.materialIndex];wt&&wt.visible&&g.push(R,Ie,wt,K,Ee.z,Je)}}else ze.visible&&g.push(R,Ie,ze,K,Ee.z,null)}}const Me=R.children;for(let Ie=0,ze=Me.length;Ie<ze;Ie++)Sn(Me[Ie],X,K,ee)}function Al(R,X,K,ee){const te=R.opaque,Me=R.transmissive,Ie=R.transparent;m.setupLightsView(K),H===!0&&je.setGlobalState(v.clippingPlanes,K),Me.length>0&&yf(te,Me,X,K),ee&&Re.viewport(M.copy(ee)),te.length>0&&Zr(te,X,K),Me.length>0&&Zr(Me,X,K),Ie.length>0&&Zr(Ie,X,K),Re.buffers.depth.setTest(!0),Re.buffers.depth.setMask(!0),Re.buffers.color.setMask(!0),Re.setPolygonOffset(!1)}function yf(R,X,K,ee){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;const Me=me.isWebGL2;F===null&&(F=new Ai(1,1,{generateMipmaps:!0,type:_e.has("EXT_color_buffer_half_float")?Br:ri,minFilter:Fr,samples:Me?4:0})),v.getDrawingBufferSize(Q),Me?F.setSize(Q.x,Q.y):F.setSize(Qo(Q.x),Qo(Q.y));const Ie=v.getRenderTarget();v.setRenderTarget(F),v.getClearColor($),P=v.getClearAlpha(),P<1&&v.setClearColor(16777215,.5),v.clear();const ze=v.toneMapping;v.toneMapping=ii,Zr(R,K,ee),Fe.updateMultisampleRenderTarget(F),Fe.updateRenderTargetMipmap(F);let qe=!1;for(let tt=0,Ye=X.length;tt<Ye;tt++){const Je=X[tt],wt=Je.object,Jt=Je.geometry,Ct=Je.material,Nn=Je.group;if(Ct.side===Mn&&wt.layers.test(ee.layers)){const bt=Ct.side;Ct.side=Kt,Ct.needsUpdate=!0,Rl(wt,K,ee,Jt,Ct,Nn),Ct.side=bt,Ct.needsUpdate=!0,qe=!0}}qe===!0&&(Fe.updateMultisampleRenderTarget(F),Fe.updateRenderTargetMipmap(F)),v.setRenderTarget(Ie),v.setClearColor($,P),v.toneMapping=ze}function Zr(R,X,K){const ee=X.isScene===!0?X.overrideMaterial:null;for(let te=0,Me=R.length;te<Me;te++){const Ie=R[te],ze=Ie.object,qe=Ie.geometry,tt=ee===null?Ie.material:ee,Ye=Ie.group;ze.layers.test(K.layers)&&Rl(ze,X,K,qe,tt,Ye)}}function Rl(R,X,K,ee,te,Me){R.onBeforeRender(v,X,K,ee,te,Me),R.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),te.onBeforeRender(v,X,K,ee,R,Me),te.transparent===!0&&te.side===Mn&&te.forceSinglePass===!1?(te.side=Kt,te.needsUpdate=!0,v.renderBufferDirect(K,X,ee,te,R,Me),te.side=ai,te.needsUpdate=!0,v.renderBufferDirect(K,X,ee,te,R,Me),te.side=Mn):v.renderBufferDirect(K,X,ee,te,R,Me),R.onAfterRender(v,X,K,ee,te,Me)}function Jr(R,X,K){X.isScene!==!0&&(X=Te);const ee=Pe.get(R),te=m.state.lights,Me=m.state.shadowsArray,Ie=te.state.version,ze=W.getParameters(R,te.state,Me,X,K),qe=W.getProgramCacheKey(ze);let tt=ee.programs;ee.environment=R.isMeshStandardMaterial?X.environment:null,ee.fog=X.fog,ee.envMap=(R.isMeshStandardMaterial?ht:ke).get(R.envMap||ee.environment),tt===void 0&&(R.addEventListener("dispose",ue),tt=new Map,ee.programs=tt);let Ye=tt.get(qe);if(Ye!==void 0){if(ee.currentProgram===Ye&&ee.lightsStateVersion===Ie)return Nl(R,ze),Ye}else ze.uniforms=W.getUniforms(R),R.onBuild(K,ze,v),R.onBeforeCompile(ze,v),Ye=W.acquireProgram(ze,qe),tt.set(qe,Ye),ee.uniforms=ze.uniforms;const Je=ee.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Je.clippingPlanes=je.uniform),Nl(R,ze),ee.needsLights=wf(R),ee.lightsStateVersion=Ie,ee.needsLights&&(Je.ambientLightColor.value=te.state.ambient,Je.lightProbe.value=te.state.probe,Je.directionalLights.value=te.state.directional,Je.directionalLightShadows.value=te.state.directionalShadow,Je.spotLights.value=te.state.spot,Je.spotLightShadows.value=te.state.spotShadow,Je.rectAreaLights.value=te.state.rectArea,Je.ltc_1.value=te.state.rectAreaLTC1,Je.ltc_2.value=te.state.rectAreaLTC2,Je.pointLights.value=te.state.point,Je.pointLightShadows.value=te.state.pointShadow,Je.hemisphereLights.value=te.state.hemi,Je.directionalShadowMap.value=te.state.directionalShadowMap,Je.directionalShadowMatrix.value=te.state.directionalShadowMatrix,Je.spotShadowMap.value=te.state.spotShadowMap,Je.spotLightMatrix.value=te.state.spotLightMatrix,Je.spotLightMap.value=te.state.spotLightMap,Je.pointShadowMap.value=te.state.pointShadowMap,Je.pointShadowMatrix.value=te.state.pointShadowMatrix),ee.currentProgram=Ye,ee.uniformsList=null,Ye}function Cl(R){if(R.uniformsList===null){const X=R.currentProgram.getUniforms();R.uniformsList=Zs.seqWithValue(X.seq,R.uniforms)}return R.uniformsList}function Nl(R,X){const K=Pe.get(R);K.outputColorSpace=X.outputColorSpace,K.instancing=X.instancing,K.instancingColor=X.instancingColor,K.skinning=X.skinning,K.morphTargets=X.morphTargets,K.morphNormals=X.morphNormals,K.morphColors=X.morphColors,K.morphTargetsCount=X.morphTargetsCount,K.numClippingPlanes=X.numClippingPlanes,K.numIntersection=X.numClipIntersection,K.vertexAlphas=X.vertexAlphas,K.vertexTangents=X.vertexTangents,K.toneMapping=X.toneMapping}function _f(R,X,K,ee,te){X.isScene!==!0&&(X=Te),Fe.resetTextureUnits();const Me=X.fog,Ie=ee.isMeshStandardMaterial?X.environment:null,ze=A===null?v.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Hn,qe=(ee.isMeshStandardMaterial?ht:ke).get(ee.envMap||Ie),tt=ee.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,Ye=!!K.attributes.tangent&&(!!ee.normalMap||ee.anisotropy>0),Je=!!K.morphAttributes.position,wt=!!K.morphAttributes.normal,Jt=!!K.morphAttributes.color;let Ct=ii;ee.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Ct=v.toneMapping);const Nn=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,bt=Nn!==void 0?Nn.length:0,st=Pe.get(ee),Aa=m.state.lights;if(H===!0&&(ie===!0||R!==w)){const Qt=R===w&&ee.id===L;je.setState(ee,R,Qt)}let Et=!1;ee.version===st.__version?(st.needsLights&&st.lightsStateVersion!==Aa.state.version||st.outputColorSpace!==ze||te.isInstancedMesh&&st.instancing===!1||!te.isInstancedMesh&&st.instancing===!0||te.isSkinnedMesh&&st.skinning===!1||!te.isSkinnedMesh&&st.skinning===!0||te.isInstancedMesh&&st.instancingColor===!0&&te.instanceColor===null||te.isInstancedMesh&&st.instancingColor===!1&&te.instanceColor!==null||st.envMap!==qe||ee.fog===!0&&st.fog!==Me||st.numClippingPlanes!==void 0&&(st.numClippingPlanes!==je.numPlanes||st.numIntersection!==je.numIntersection)||st.vertexAlphas!==tt||st.vertexTangents!==Ye||st.morphTargets!==Je||st.morphNormals!==wt||st.morphColors!==Jt||st.toneMapping!==Ct||me.isWebGL2===!0&&st.morphTargetsCount!==bt)&&(Et=!0):(Et=!0,st.__version=ee.version);let ci=st.currentProgram;Et===!0&&(ci=Jr(ee,X,te));let Pl=!1,mr=!1,Ra=!1;const Ft=ci.getUniforms(),di=st.uniforms;if(Re.useProgram(ci.program)&&(Pl=!0,mr=!0,Ra=!0),ee.id!==L&&(L=ee.id,mr=!0),Pl||w!==R){Ft.setValue(U,"projectionMatrix",R.projectionMatrix),Ft.setValue(U,"viewMatrix",R.matrixWorldInverse);const Qt=Ft.map.cameraPosition;Qt!==void 0&&Qt.setValue(U,Ee.setFromMatrixPosition(R.matrixWorld)),me.logarithmicDepthBuffer&&Ft.setValue(U,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(ee.isMeshPhongMaterial||ee.isMeshToonMaterial||ee.isMeshLambertMaterial||ee.isMeshBasicMaterial||ee.isMeshStandardMaterial||ee.isShaderMaterial)&&Ft.setValue(U,"isOrthographic",R.isOrthographicCamera===!0),w!==R&&(w=R,mr=!0,Ra=!0)}if(te.isSkinnedMesh){Ft.setOptional(U,te,"bindMatrix"),Ft.setOptional(U,te,"bindMatrixInverse");const Qt=te.skeleton;Qt&&(me.floatVertexTextures?(Qt.boneTexture===null&&Qt.computeBoneTexture(),Ft.setValue(U,"boneTexture",Qt.boneTexture,Fe),Ft.setValue(U,"boneTextureSize",Qt.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const Ca=K.morphAttributes;if((Ca.position!==void 0||Ca.normal!==void 0||Ca.color!==void 0&&me.isWebGL2===!0)&&D.update(te,K,ci),(mr||st.receiveShadow!==te.receiveShadow)&&(st.receiveShadow=te.receiveShadow,Ft.setValue(U,"receiveShadow",te.receiveShadow)),ee.isMeshGouraudMaterial&&ee.envMap!==null&&(di.envMap.value=qe,di.flipEnvMap.value=qe.isCubeTexture&&qe.isRenderTargetTexture===!1?-1:1),mr&&(Ft.setValue(U,"toneMappingExposure",v.toneMappingExposure),st.needsLights&&bf(di,Ra),Me&&ee.fog===!0&&he.refreshFogUniforms(di,Me),he.refreshMaterialUniforms(di,ee,Y,Z,F),Zs.upload(U,Cl(st),di,Fe)),ee.isShaderMaterial&&ee.uniformsNeedUpdate===!0&&(Zs.upload(U,Cl(st),di,Fe),ee.uniformsNeedUpdate=!1),ee.isSpriteMaterial&&Ft.setValue(U,"center",te.center),Ft.setValue(U,"modelViewMatrix",te.modelViewMatrix),Ft.setValue(U,"normalMatrix",te.normalMatrix),Ft.setValue(U,"modelMatrix",te.matrixWorld),ee.isShaderMaterial||ee.isRawShaderMaterial){const Qt=ee.uniformsGroups;for(let Na=0,Sf=Qt.length;Na<Sf;Na++)if(me.isWebGL2){const Ll=Qt[Na];Oe.update(Ll,ci),Oe.bind(Ll,ci)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return ci}function bf(R,X){R.ambientLightColor.needsUpdate=X,R.lightProbe.needsUpdate=X,R.directionalLights.needsUpdate=X,R.directionalLightShadows.needsUpdate=X,R.pointLights.needsUpdate=X,R.pointLightShadows.needsUpdate=X,R.spotLights.needsUpdate=X,R.spotLightShadows.needsUpdate=X,R.rectAreaLights.needsUpdate=X,R.hemisphereLights.needsUpdate=X}function wf(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return _},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(R,X,K){Pe.get(R.texture).__webglTexture=X,Pe.get(R.depthTexture).__webglTexture=K;const ee=Pe.get(R);ee.__hasExternalTextures=!0,ee.__hasExternalTextures&&(ee.__autoAllocateDepthBuffer=K===void 0,ee.__autoAllocateDepthBuffer||_e.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ee.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(R,X){const K=Pe.get(R);K.__webglFramebuffer=X,K.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(R,X=0,K=0){A=R,_=X,T=K;let ee=!0,te=null,Me=!1,Ie=!1;if(R){const qe=Pe.get(R);qe.__useDefaultFramebuffer!==void 0?(Re.bindFramebuffer(U.FRAMEBUFFER,null),ee=!1):qe.__webglFramebuffer===void 0?Fe.setupRenderTarget(R):qe.__hasExternalTextures&&Fe.rebindTextures(R,Pe.get(R.texture).__webglTexture,Pe.get(R.depthTexture).__webglTexture);const tt=R.texture;(tt.isData3DTexture||tt.isDataArrayTexture||tt.isCompressedArrayTexture)&&(Ie=!0);const Ye=Pe.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Ye[X])?te=Ye[X][K]:te=Ye[X],Me=!0):me.isWebGL2&&R.samples>0&&Fe.useMultisampledRTT(R)===!1?te=Pe.get(R).__webglMultisampledFramebuffer:Array.isArray(Ye)?te=Ye[K]:te=Ye,M.copy(R.viewport),j.copy(R.scissor),B=R.scissorTest}else M.copy(ne).multiplyScalar(Y).floor(),j.copy(N).multiplyScalar(Y).floor(),B=I;if(Re.bindFramebuffer(U.FRAMEBUFFER,te)&&me.drawBuffers&&ee&&Re.drawBuffers(R,te),Re.viewport(M),Re.scissor(j),Re.setScissorTest(B),Me){const qe=Pe.get(R.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+X,qe.__webglTexture,K)}else if(Ie){const qe=Pe.get(R.texture),tt=X||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,qe.__webglTexture,K||0,tt)}L=-1},this.readRenderTargetPixels=function(R,X,K,ee,te,Me,Ie){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ze=Pe.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ie!==void 0&&(ze=ze[Ie]),ze){Re.bindFramebuffer(U.FRAMEBUFFER,ze);try{const qe=R.texture,tt=qe.format,Ye=qe.type;if(tt!==_n&&Be.convert(tt)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Je=Ye===Br&&(_e.has("EXT_color_buffer_half_float")||me.isWebGL2&&_e.has("EXT_color_buffer_float"));if(Ye!==ri&&Be.convert(Ye)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ye===Qn&&(me.isWebGL2||_e.has("OES_texture_float")||_e.has("WEBGL_color_buffer_float")))&&!Je){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=R.width-ee&&K>=0&&K<=R.height-te&&U.readPixels(X,K,ee,te,Be.convert(tt),Be.convert(Ye),Me)}finally{const qe=A!==null?Pe.get(A).__webglFramebuffer:null;Re.bindFramebuffer(U.FRAMEBUFFER,qe)}}},this.copyFramebufferToTexture=function(R,X,K=0){const ee=Math.pow(2,-K),te=Math.floor(X.image.width*ee),Me=Math.floor(X.image.height*ee);Fe.setTexture2D(X,0),U.copyTexSubImage2D(U.TEXTURE_2D,K,0,0,R.x,R.y,te,Me),Re.unbindTexture()},this.copyTextureToTexture=function(R,X,K,ee=0){const te=X.image.width,Me=X.image.height,Ie=Be.convert(K.format),ze=Be.convert(K.type);Fe.setTexture2D(K,0),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,K.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,K.unpackAlignment),X.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,ee,R.x,R.y,te,Me,Ie,ze,X.image.data):X.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,ee,R.x,R.y,X.mipmaps[0].width,X.mipmaps[0].height,Ie,X.mipmaps[0].data):U.texSubImage2D(U.TEXTURE_2D,ee,R.x,R.y,Ie,ze,X.image),ee===0&&K.generateMipmaps&&U.generateMipmap(U.TEXTURE_2D),Re.unbindTexture()},this.copyTextureToTexture3D=function(R,X,K,ee,te=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Me=R.max.x-R.min.x+1,Ie=R.max.y-R.min.y+1,ze=R.max.z-R.min.z+1,qe=Be.convert(ee.format),tt=Be.convert(ee.type);let Ye;if(ee.isData3DTexture)Fe.setTexture3D(ee,0),Ye=U.TEXTURE_3D;else if(ee.isDataArrayTexture)Fe.setTexture2DArray(ee,0),Ye=U.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,ee.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ee.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,ee.unpackAlignment);const Je=U.getParameter(U.UNPACK_ROW_LENGTH),wt=U.getParameter(U.UNPACK_IMAGE_HEIGHT),Jt=U.getParameter(U.UNPACK_SKIP_PIXELS),Ct=U.getParameter(U.UNPACK_SKIP_ROWS),Nn=U.getParameter(U.UNPACK_SKIP_IMAGES),bt=K.isCompressedTexture?K.mipmaps[0]:K.image;U.pixelStorei(U.UNPACK_ROW_LENGTH,bt.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,bt.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,R.min.x),U.pixelStorei(U.UNPACK_SKIP_ROWS,R.min.y),U.pixelStorei(U.UNPACK_SKIP_IMAGES,R.min.z),K.isDataTexture||K.isData3DTexture?U.texSubImage3D(Ye,te,X.x,X.y,X.z,Me,Ie,ze,qe,tt,bt.data):K.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),U.compressedTexSubImage3D(Ye,te,X.x,X.y,X.z,Me,Ie,ze,qe,bt.data)):U.texSubImage3D(Ye,te,X.x,X.y,X.z,Me,Ie,ze,qe,tt,bt),U.pixelStorei(U.UNPACK_ROW_LENGTH,Je),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,wt),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Jt),U.pixelStorei(U.UNPACK_SKIP_ROWS,Ct),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Nn),te===0&&ee.generateMipmaps&&U.generateMipmap(Ye),Re.unbindTexture()},this.initTexture=function(R){R.isCubeTexture?Fe.setTextureCube(R,0):R.isData3DTexture?Fe.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?Fe.setTexture2DArray(R,0):Fe.setTexture2D(R,0),Re.unbindTexture()},this.resetState=function(){_=0,T=0,A=null,Re.reset(),De.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===yl?"display-p3":"srgb",t.unpackColorSpace=dt.workingColorSpace===Ea?"display-p3":"srgb"}get physicallyCorrectLights(){return console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights}set physicallyCorrectLights(e){console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!e}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===jt?Ei:Gh}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Ei?jt:Hn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class ES extends El{}ES.prototype.isWebGL1Renderer=!0;class Ml{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new ot(e),this.near=t,this.far=i}clone(){return new Ml(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class cf extends Lt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Vd extends bn{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ki=new _t,Wd=new _t,Ps=[],Xd=new Ni,MS=new _t,Ar=new mt,Rr=new Yr;class TS extends mt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Vd(new Float32Array(i*16),16),this.instanceColor=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,MS)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ni),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ki),Xd.copy(e.boundingBox).applyMatrix4(Ki),this.boundingBox.union(Xd)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Yr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ki),Rr.copy(e.boundingSphere).applyMatrix4(Ki),this.boundingSphere.union(Rr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const i=this.matrixWorld,s=this.count;if(Ar.geometry=this.geometry,Ar.material=this.material,Ar.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Rr.copy(this.boundingSphere),Rr.applyMatrix4(i),e.ray.intersectsSphere(Rr)!==!1))for(let a=0;a<s;a++){this.getMatrixAt(a,Ki),Wd.multiplyMatrices(i,Ki),Ar.matrixWorld=Wd,Ar.raycast(e,Ps);for(let l=0,o=Ps.length;l<o;l++){const c=Ps[l];c.instanceId=a,c.object=this,t.push(c)}Ps.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Vd(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class AS extends Zt{constructor(e,t,i,s,a,l,o,c,d){super(e,t,i,s,a,l,o,c,d),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ta extends li{constructor(e=1,t=1,i=1,s=32,a=1,l=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:a,openEnded:l,thetaStart:o,thetaLength:c};const d=this;s=Math.floor(s),a=Math.floor(a);const u=[],f=[],p=[],x=[];let y=0;const g=[],m=i/2;let h=0;b(),l===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new Rn(f,3)),this.setAttribute("normal",new Rn(p,3)),this.setAttribute("uv",new Rn(x,2));function b(){const E=new q,_=new q;let T=0;const A=(t-e)/i;for(let L=0;L<=a;L++){const w=[],M=L/a,j=M*(t-e)+e;for(let B=0;B<=s;B++){const $=B/s,P=$*c+o,z=Math.sin(P),Z=Math.cos(P);_.x=j*z,_.y=-M*i+m,_.z=j*Z,f.push(_.x,_.y,_.z),E.set(z,A,Z).normalize(),p.push(E.x,E.y,E.z),x.push($,1-M),w.push(y++)}g.push(w)}for(let L=0;L<s;L++)for(let w=0;w<a;w++){const M=g[w][L],j=g[w+1][L],B=g[w+1][L+1],$=g[w][L+1];u.push(M,j,$),u.push(j,B,$),T+=6}d.addGroup(h,T,0),h+=T}function v(E){const _=y,T=new $e,A=new q;let L=0;const w=E===!0?e:t,M=E===!0?1:-1;for(let B=1;B<=s;B++)f.push(0,m*M,0),p.push(0,M,0),x.push(.5,.5),y++;const j=y;for(let B=0;B<=s;B++){const P=B/s*c+o,z=Math.cos(P),Z=Math.sin(P);A.x=w*Z,A.y=m*M,A.z=w*z,f.push(A.x,A.y,A.z),p.push(0,M,0),T.x=z*.5+.5,T.y=Z*.5*M+.5,x.push(T.x,T.y),y++}for(let B=0;B<s;B++){const $=_+B,P=j+B;E===!0?u.push(P,P+1,$):u.push(P+1,P,$),L+=3}d.addGroup(h,L,E===!0?1:2),h+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ta(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class cn extends Kr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ot(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vh,this.normalScale=new $e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Tl extends Lt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ot(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const wo=new _t,qd=new q,$d=new q;class df{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new $e(512,512),this.map=null,this.mapPass=null,this.matrix=new _t,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new wl,this._frameExtents=new $e(1,1),this._viewportCount=1,this._viewports=[new Pt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;qd.setFromMatrixPosition(e.matrixWorld),t.position.copy(qd),$d.setFromMatrixPosition(e.target.matrixWorld),t.lookAt($d),t.updateMatrixWorld(),wo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wo),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(wo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class RS extends df{constructor(){super(new qt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,i=da*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,a=e.distance||t.far;(i!==t.fov||s!==t.aspect||a!==t.far)&&(t.fov=i,t.aspect=s,t.far=a,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class uf extends Tl{constructor(e,t,i=0,s=Math.PI/3,a=0,l=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Lt.DEFAULT_UP),this.updateMatrix(),this.target=new Lt,this.distance=i,this.angle=s,this.penumbra=a,this.decay=l,this.map=null,this.shadow=new RS}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class CS extends df{constructor(){super(new rf(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class hf extends Tl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Lt.DEFAULT_UP),this.updateMatrix(),this.target=new Lt,this.shadow=new CS}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class ff extends Tl{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class NS{constructor(e,t,i=0,s=1/0){this.ray=new _l(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new bl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,i=[]){return tl(e,this,i,t),i.sort(Yd),i}intersectObjects(e,t=!0,i=[]){for(let s=0,a=e.length;s<a;s++)tl(e[s],this,i,t);return i.sort(Yd),i}}function Yd(n,e){return n.distance-e.distance}function tl(n,e,t,i){if(n.layers.test(e.layers)&&n.raycast(e,t),i===!0){const s=n.children;for(let a=0,l=s.length;a<l;a++)tl(s[a],e,t,!0)}}class Kd{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Ht(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:xl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=xl);const Zd={type:"change"},So={type:"start"},Jd={type:"end"},Ls=new _l,Qd=new Zn,PS=Math.cos(70*_y.DEG2RAD);class pf extends Ci{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new q,this.cursor=new q,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Li.ROTATE,MIDDLE:Li.DOLLY,RIGHT:Li.PAN},this.touches={ONE:ji.ROTATE,TWO:ji.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(D){D.addEventListener("keydown",S),this._domElementKeyEvents=D},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",S),this._domElementKeyEvents=null},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(Zd),i.update(),a=s.NONE},this.update=(function(){const D=new q,pe=new oi().setFromUnitVectors(e.up,new q(0,1,0)),le=pe.clone().invert(),Be=new q,De=new oi,Oe=new q,Le=2*Math.PI;return function(it=null){const k=i.object.position;D.copy(k).sub(i.target),D.applyQuaternion(pe),o.setFromVector3(D),i.autoRotate&&a===s.NONE&&j(w(it)),i.enableDamping?(o.theta+=c.theta*i.dampingFactor,o.phi+=c.phi*i.dampingFactor):(o.theta+=c.theta,o.phi+=c.phi);let xe=i.minAzimuthAngle,ue=i.maxAzimuthAngle;isFinite(xe)&&isFinite(ue)&&(xe<-Math.PI?xe+=Le:xe>Math.PI&&(xe-=Le),ue<-Math.PI?ue+=Le:ue>Math.PI&&(ue-=Le),xe<=ue?o.theta=Math.max(xe,Math.min(ue,o.theta)):o.theta=o.theta>(xe+ue)/2?Math.max(xe,o.theta):Math.min(ue,o.theta)),o.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,o.phi)),o.makeSafe(),i.enableDamping===!0?i.target.addScaledVector(u,i.dampingFactor):i.target.add(u),i.target.sub(i.cursor),i.target.clampLength(i.minTargetRadius,i.maxTargetRadius),i.target.add(i.cursor),i.zoomToCursor&&T||i.object.isOrthographicCamera?o.radius=J(o.radius):o.radius=J(o.radius*d),D.setFromSpherical(o),D.applyQuaternion(le),k.copy(i.target).add(D),i.object.lookAt(i.target),i.enableDamping===!0?(c.theta*=1-i.dampingFactor,c.phi*=1-i.dampingFactor,u.multiplyScalar(1-i.dampingFactor)):(c.set(0,0,0),u.set(0,0,0));let re=!1;if(i.zoomToCursor&&T){let fe=null;if(i.object.isPerspectiveCamera){const Ue=D.length();fe=J(Ue*d);const rt=Ue-fe;i.object.position.addScaledVector(E,rt),i.object.updateMatrixWorld()}else if(i.object.isOrthographicCamera){const Ue=new q(_.x,_.y,0);Ue.unproject(i.object),i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/d)),i.object.updateProjectionMatrix(),re=!0;const rt=new q(_.x,_.y,0);rt.unproject(i.object),i.object.position.sub(rt).add(Ue),i.object.updateMatrixWorld(),fe=D.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),i.zoomToCursor=!1;fe!==null&&(this.screenSpacePanning?i.target.set(0,0,-1).transformDirection(i.object.matrix).multiplyScalar(fe).add(i.object.position):(Ls.origin.copy(i.object.position),Ls.direction.set(0,0,-1).transformDirection(i.object.matrix),Math.abs(i.object.up.dot(Ls.direction))<PS?e.lookAt(i.target):(Qd.setFromNormalAndCoplanarPoint(i.object.up,i.target),Ls.intersectPlane(Qd,i.target))))}else i.object.isOrthographicCamera&&(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/d)),i.object.updateProjectionMatrix(),re=!0);return d=1,T=!1,re||Be.distanceToSquared(i.object.position)>l||8*(1-De.dot(i.object.quaternion))>l||Oe.distanceToSquared(i.target)>0?(i.dispatchEvent(Zd),Be.copy(i.object.position),De.copy(i.object.quaternion),Oe.copy(i.target),re=!1,!0):!1}})(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",ce),i.domElement.removeEventListener("pointerdown",Pe),i.domElement.removeEventListener("pointercancel",ke),i.domElement.removeEventListener("wheel",C),i.domElement.removeEventListener("pointermove",Fe),i.domElement.removeEventListener("pointerup",ke),i._domElementKeyEvents!==null&&(i._domElementKeyEvents.removeEventListener("keydown",S),i._domElementKeyEvents=null)};const i=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let a=s.NONE;const l=1e-6,o=new Kd,c=new Kd;let d=1;const u=new q,f=new $e,p=new $e,x=new $e,y=new $e,g=new $e,m=new $e,h=new $e,b=new $e,v=new $e,E=new q,_=new $e;let T=!1;const A=[],L={};function w(D){return D!==null?2*Math.PI/60*i.autoRotateSpeed*D:2*Math.PI/60/60*i.autoRotateSpeed}function M(){return Math.pow(.95,i.zoomSpeed)}function j(D){c.theta-=D}function B(D){c.phi-=D}const $=(function(){const D=new q;return function(le,Be){D.setFromMatrixColumn(Be,0),D.multiplyScalar(-le),u.add(D)}})(),P=(function(){const D=new q;return function(le,Be){i.screenSpacePanning===!0?D.setFromMatrixColumn(Be,1):(D.setFromMatrixColumn(Be,0),D.crossVectors(i.object.up,D)),D.multiplyScalar(le),u.add(D)}})(),z=(function(){const D=new q;return function(le,Be){const De=i.domElement;if(i.object.isPerspectiveCamera){const Oe=i.object.position;D.copy(Oe).sub(i.target);let Le=D.length();Le*=Math.tan(i.object.fov/2*Math.PI/180),$(2*le*Le/De.clientHeight,i.object.matrix),P(2*Be*Le/De.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?($(le*(i.object.right-i.object.left)/i.object.zoom/De.clientWidth,i.object.matrix),P(Be*(i.object.top-i.object.bottom)/i.object.zoom/De.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}})();function Z(D){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?d/=D:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function Y(D){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?d*=D:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function ae(D){if(!i.zoomToCursor)return;T=!0;const pe=i.domElement.getBoundingClientRect(),le=D.clientX-pe.left,Be=D.clientY-pe.top,De=pe.width,Oe=pe.height;_.x=le/De*2-1,_.y=-(Be/Oe)*2+1,E.set(_.x,_.y,1).unproject(i.object).sub(i.object.position).normalize()}function J(D){return Math.max(i.minDistance,Math.min(i.maxDistance,D))}function ne(D){f.set(D.clientX,D.clientY)}function N(D){ae(D),h.set(D.clientX,D.clientY)}function I(D){y.set(D.clientX,D.clientY)}function G(D){p.set(D.clientX,D.clientY),x.subVectors(p,f).multiplyScalar(i.rotateSpeed);const pe=i.domElement;j(2*Math.PI*x.x/pe.clientHeight),B(2*Math.PI*x.y/pe.clientHeight),f.copy(p),i.update()}function H(D){b.set(D.clientX,D.clientY),v.subVectors(b,h),v.y>0?Z(M()):v.y<0&&Y(M()),h.copy(b),i.update()}function ie(D){g.set(D.clientX,D.clientY),m.subVectors(g,y).multiplyScalar(i.panSpeed),z(m.x,m.y),y.copy(g),i.update()}function F(D){ae(D),D.deltaY<0?Y(M()):D.deltaY>0&&Z(M()),i.update()}function ve(D){let pe=!1;switch(D.code){case i.keys.UP:D.ctrlKey||D.metaKey||D.shiftKey?B(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):z(0,i.keyPanSpeed),pe=!0;break;case i.keys.BOTTOM:D.ctrlKey||D.metaKey||D.shiftKey?B(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):z(0,-i.keyPanSpeed),pe=!0;break;case i.keys.LEFT:D.ctrlKey||D.metaKey||D.shiftKey?j(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):z(i.keyPanSpeed,0),pe=!0;break;case i.keys.RIGHT:D.ctrlKey||D.metaKey||D.shiftKey?j(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):z(-i.keyPanSpeed,0),pe=!0;break}pe&&(D.preventDefault(),i.update())}function Q(){if(A.length===1)f.set(A[0].pageX,A[0].pageY);else{const D=.5*(A[0].pageX+A[1].pageX),pe=.5*(A[0].pageY+A[1].pageY);f.set(D,pe)}}function Ee(){if(A.length===1)y.set(A[0].pageX,A[0].pageY);else{const D=.5*(A[0].pageX+A[1].pageX),pe=.5*(A[0].pageY+A[1].pageY);y.set(D,pe)}}function Te(){const D=A[0].pageX-A[1].pageX,pe=A[0].pageY-A[1].pageY,le=Math.sqrt(D*D+pe*pe);h.set(0,le)}function oe(){i.enableZoom&&Te(),i.enablePan&&Ee()}function U(){i.enableZoom&&Te(),i.enableRotate&&Q()}function Ze(D){if(A.length==1)p.set(D.pageX,D.pageY);else{const le=we(D),Be=.5*(D.pageX+le.x),De=.5*(D.pageY+le.y);p.set(Be,De)}x.subVectors(p,f).multiplyScalar(i.rotateSpeed);const pe=i.domElement;j(2*Math.PI*x.x/pe.clientHeight),B(2*Math.PI*x.y/pe.clientHeight),f.copy(p)}function _e(D){if(A.length===1)g.set(D.pageX,D.pageY);else{const pe=we(D),le=.5*(D.pageX+pe.x),Be=.5*(D.pageY+pe.y);g.set(le,Be)}m.subVectors(g,y).multiplyScalar(i.panSpeed),z(m.x,m.y),y.copy(g)}function me(D){const pe=we(D),le=D.pageX-pe.x,Be=D.pageY-pe.y,De=Math.sqrt(le*le+Be*Be);b.set(0,De),v.set(0,Math.pow(b.y/h.y,i.zoomSpeed)),Z(v.y),h.copy(b)}function Re(D){i.enableZoom&&me(D),i.enablePan&&_e(D)}function Ne(D){i.enableZoom&&me(D),i.enableRotate&&Ze(D)}function Pe(D){i.enabled!==!1&&(A.length===0&&(i.domElement.setPointerCapture(D.pointerId),i.domElement.addEventListener("pointermove",Fe),i.domElement.addEventListener("pointerup",ke)),de(D),D.pointerType==="touch"?W(D):ht(D))}function Fe(D){i.enabled!==!1&&(D.pointerType==="touch"?he(D):xt(D))}function ke(D){je(D),A.length===0&&(i.domElement.releasePointerCapture(D.pointerId),i.domElement.removeEventListener("pointermove",Fe),i.domElement.removeEventListener("pointerup",ke)),i.dispatchEvent(Jd),a=s.NONE}function ht(D){let pe;switch(D.button){case 0:pe=i.mouseButtons.LEFT;break;case 1:pe=i.mouseButtons.MIDDLE;break;case 2:pe=i.mouseButtons.RIGHT;break;default:pe=-1}switch(pe){case Li.DOLLY:if(i.enableZoom===!1)return;N(D),a=s.DOLLY;break;case Li.ROTATE:if(D.ctrlKey||D.metaKey||D.shiftKey){if(i.enablePan===!1)return;I(D),a=s.PAN}else{if(i.enableRotate===!1)return;ne(D),a=s.ROTATE}break;case Li.PAN:if(D.ctrlKey||D.metaKey||D.shiftKey){if(i.enableRotate===!1)return;ne(D),a=s.ROTATE}else{if(i.enablePan===!1)return;I(D),a=s.PAN}break;default:a=s.NONE}a!==s.NONE&&i.dispatchEvent(So)}function xt(D){switch(a){case s.ROTATE:if(i.enableRotate===!1)return;G(D);break;case s.DOLLY:if(i.enableZoom===!1)return;H(D);break;case s.PAN:if(i.enablePan===!1)return;ie(D);break}}function C(D){i.enabled===!1||i.enableZoom===!1||a!==s.NONE||(D.preventDefault(),i.dispatchEvent(So),F(D),i.dispatchEvent(Jd))}function S(D){i.enabled===!1||i.enablePan===!1||ve(D)}function W(D){switch(ge(D),A.length){case 1:switch(i.touches.ONE){case ji.ROTATE:if(i.enableRotate===!1)return;Q(),a=s.TOUCH_ROTATE;break;case ji.PAN:if(i.enablePan===!1)return;Ee(),a=s.TOUCH_PAN;break;default:a=s.NONE}break;case 2:switch(i.touches.TWO){case ji.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;oe(),a=s.TOUCH_DOLLY_PAN;break;case ji.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;U(),a=s.TOUCH_DOLLY_ROTATE;break;default:a=s.NONE}break;default:a=s.NONE}a!==s.NONE&&i.dispatchEvent(So)}function he(D){switch(ge(D),a){case s.TOUCH_ROTATE:if(i.enableRotate===!1)return;Ze(D),i.update();break;case s.TOUCH_PAN:if(i.enablePan===!1)return;_e(D),i.update();break;case s.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;Re(D),i.update();break;case s.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;Ne(D),i.update();break;default:a=s.NONE}}function ce(D){i.enabled!==!1&&D.preventDefault()}function de(D){A.push(D)}function je(D){delete L[D.pointerId];for(let pe=0;pe<A.length;pe++)if(A[pe].pointerId==D.pointerId){A.splice(pe,1);return}}function ge(D){let pe=L[D.pointerId];pe===void 0&&(pe=new $e,L[D.pointerId]=pe),pe.set(D.pageX,D.pageY)}function we(D){const pe=D.pointerId===A[0].pointerId?A[1]:A[0];return L[pe.pointerId]}i.domElement.addEventListener("contextmenu",ce),i.domElement.addEventListener("pointerdown",Pe),i.domElement.addEventListener("pointercancel",ke),i.domElement.addEventListener("wheel",C,{passive:!1}),this.update()}}class LS{state={isSupported:!1,isSessionActive:!1};onFrameCallback;lastFrameTime=0;constructor(){this.checkSupport()}async checkSupport(){if("xr"in navigator)try{this.state.isSupported=await navigator.xr.isSessionSupported("immersive-vr"),console.log("WebXR VR support:",this.state.isSupported)}catch(e){console.error("Error checking WebXR support:",e),this.state.isSupported=!1}else console.log("WebXR not supported in this browser"),this.state.isSupported=!1}async requestSession(e={}){if(!this.state.isSupported)return console.error("WebXR is not supported"),!1;try{const t=e.requiredFeatures||["local-floor"],i=[...e.optionalFeatures||[],"hand-tracking","dom-overlay","layers"],s=await navigator.xr.requestSession("immersive-vr",{requiredFeatures:t,optionalFeatures:i});return this.state.session=s,this.state.isSessionActive=!0,s.addEventListener("end",this.onSessionEnded.bind(this)),s.addEventListener("inputsourceschange",this.onInputSourcesChange.bind(this)),this.state.referenceSpace=await s.requestReferenceSpace("local-floor"),s.requestAnimationFrame(this.onXRFrame.bind(this)),console.log("WebXR session started successfully"),!0}catch(t){return console.error("Error requesting WebXR session:",t),!1}}onXRFrame(e,t){this.state.frame=t,this.state.referenceSpace&&(this.state.viewerPose=t.getViewerPose(this.state.referenceSpace));const i=this.lastFrameTime>0?(e-this.lastFrameTime)/1e3:0;this.lastFrameTime=e,this.onFrameCallback&&this.onFrameCallback(t,i),this.state.session&&this.state.session.requestAnimationFrame(this.onXRFrame.bind(this))}onSessionEnded(){this.state.isSessionActive=!1,this.state.session=void 0,this.state.referenceSpace=void 0,this.state.viewerPose=void 0,console.log("WebXR session ended")}onInputSourcesChange(e){if(console.log("XR Input Sources Changed:",e),this.state.session){const t=this.state.session.inputSources;console.log("Current input sources:",t)}}setFrameCallback(e){this.onFrameCallback=e}getViewerPose(){return this.state.viewerPose}getReferenceSpace(){return this.state.referenceSpace}getSession(){return this.state.session}getFrame(){return this.state.frame}getState(){return{...this.state}}async exitSession(){this.state.session&&await this.state.session.end()}getSupportedFeatures(){return["local-floor","bounded-floor","unbounded","viewer","hand-tracking","dom-overlay","layers"]}isFeatureSupported(e){return this.getSupportedFeatures().includes(e)}xrPoseToThreeJS(e){if(!e||!e.transform)return{position:new q,rotation:new cr};const t=e.transform.position,i=e.transform.orientation;return{position:new q(t.x,t.y,t.z),rotation:new cr().setFromQuaternion(new oi(i.x,i.y,i.z,i.w))}}getHandJointPositions(e,t){const i=this.state.frame;if(e.hand&&i){const s=new Map;for(const a of e.hand.keys()){const l=i.getJointPose?.(e.hand.get(a),t);if(l){const o=l.transform.position;s.set(a,new q(o.x,o.y,o.z))}}return s}return null}}const mi=new LS,jS=se.div`
  width: 100%;
  height: 100vh;
  position: relative;
`,DS=se.div`
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
`,Eo=se.button`
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
`,IS=({artworks:n,onArtworkSelect:e,onExitVR:t})=>{const i=O.useRef(null),[s,a]=O.useState(!1),[l,o]=O.useState(!1),[c,d]=O.useState(!0),u=O.useRef(null),f=O.useRef(null),p=O.useRef(null),x=O.useRef(null),y=O.useRef(null),g=O.useRef([]);O.useEffect(()=>{if(!i.current)return;(async()=>{const $=mi.getState();a($.isSupported)})();const A=new cf;A.background=new ot(1118483),u.current=A;const L=new qt(75,window.innerWidth/window.innerHeight,.1,1e3);L.position.set(0,1.6,5),f.current=L;const w=new El({antialias:!0});w.setSize(window.innerWidth,window.innerHeight),w.setPixelRatio(window.devicePixelRatio),w.shadowMap.enabled=!0,w.xr.enabled=!0,i.current.appendChild(w.domElement),p.current=w,m(A),h(A),v(A,n);const M=new pf(L,w.domElement);M.enableDamping=!0,M.dampingFactor=.05,x.current=M;const j=()=>{L&&w&&(L.aspect=window.innerWidth/window.innerHeight,L.updateProjectionMatrix(),w.setSize(window.innerWidth,window.innerHeight))};window.addEventListener("resize",j);const B=()=>{y.current=requestAnimationFrame(B),M&&!w.xr.isPresenting&&M.update(),w&&w.render(A,L)};return B(),d(!1),()=>{window.removeEventListener("resize",j),y.current&&cancelAnimationFrame(y.current),i.current&&w?.domElement&&i.current.removeChild(w.domElement),w&&w.dispose()}},[n]);const m=T=>{const A=new ff(16777215,.6);T.add(A);const L=new hf(16777215,.8);L.position.set(5,10,7),L.castShadow=!0,T.add(L),n.forEach((w,M)=>{const j=new uf(16777215,.8);j.position.set(-6+M%4*4,4,-8+Math.floor(M/4)*-4),j.castShadow=!0,j.angle=Math.PI/6,j.penumbra=.2,j.decay=2,j.distance=200,T.add(j)})},h=T=>{const A=new zn(40,40),L=new cn({color:3355443,roughness:.8,metalness:.2}),w=new mt(A,L);w.rotation.x=-Math.PI/2,w.receiveShadow=!0,T.add(w);const M=new Gn(40,8,.5),j=new cn({color:4473924,roughness:.7,metalness:.3}),B=new mt(M,j);B.position.z=-20,B.position.y=4,B.castShadow=!1,B.receiveShadow=!0,T.add(B);const $=new mt(M,j);$.position.x=-20,$.position.y=4,$.rotation.y=Math.PI/2,$.castShadow=!1,$.receiveShadow=!0,T.add($);const P=new mt(M,j);P.position.x=20,P.position.y=4,P.rotation.y=Math.PI/2,P.castShadow=!1,P.receiveShadow=!0,T.add(P);const z=new zn(40,40),Z=new cn({color:2236962,roughness:.9,metalness:.1}),Y=new mt(z,Z);Y.rotation.x=Math.PI/2,Y.position.y=8,Y.castShadow=!1,T.add(Y),b(T)},b=T=>{const A=new Ta(.5,.5,8,16),L=new cn({color:8947848,roughness:.6,metalness:.2});for(let w=0;w<4;w++){const M=new mt(A,L);M.position.x=-15+w*10,M.position.z=-18,M.position.y=4,M.castShadow=!0,M.receiveShadow=!0,T.add(M)}},v=(T,A)=>{g.current.forEach(j=>T.remove(j)),g.current=[];const L=Math.ceil(Math.sqrt(A.length)),w=Math.ceil(A.length/L),M=4;A.forEach((j,B)=>{const $=Math.floor(B/w),z=(B%w-(w-1)/2)*M,Z=-($-(L-1)/2)*M-19,Y=2,ae=new Gn(2.5,2.5,.1),J=new cn({color:9127187,metalness:.3,roughness:.7}),ne=new mt(ae,J);ne.position.set(z,Y,Z),ne.userData={type:"artwork",artworkId:j.artwork_id,artwork:j},T.add(ne),g.current.push(ne);const N=new zn(2.3,2.3),I=new cn({color:11184810,emissive:3355443,roughness:.5,metalness:.1}),G=new mt(N,I);G.position.set(z,Y,Z+.06),G.userData={type:"artwork",artworkId:j.artwork_id,artwork:j},T.add(G),g.current.push(G),ne.addEventListener("click",()=>{e(j)})})},E=async()=>{if(!s){console.error("WebXR is not supported in this browser");return}try{await mi.requestSession({requiredFeatures:["local-floor"],optionalFeatures:["hand-tracking"]})&&p.current?(p.current.xr.enabled=!0,mi.setFrameCallback((A,L)=>{if(mi.getViewerPose()&&f.current){const w=mi.getViewerPose();w&&w.views&&w.views.length>0}}),o(!0),console.log("Entered VR mode")):console.error("Failed to enter VR mode")}catch(T){console.error("Error entering VR mode:",T)}},_=async()=>{mi.getSession()&&await mi.exitSession(),p.current&&(p.current.xr.enabled=!1),o(!1),console.log("Exited VR mode")};return r.jsxs(jS,{ref:i,children:[c&&r.jsx("div",{children:"Loading VR Gallery..."}),r.jsxs(DS,{children:[r.jsxs("div",{children:[r.jsx("h3",{children:"Virtual Gallery"}),r.jsxs("p",{children:[l?"In VR Mode":"In Desktop Mode"," • ",n.length," artworks displayed"]})]}),r.jsxs("div",{children:[l?r.jsx(Eo,{onClick:_,children:"Exit VR Mode"}):r.jsx(Eo,{onClick:E,disabled:!s,children:s?"Enter VR Mode":"VR Not Supported"}),r.jsx(Eo,{onClick:t,children:"Back to Gallery"})]})]})]})},US=()=>{const[n,e]=O.useState([]),[t,i]=O.useState(!0),[s,a]=O.useState(null);O.useEffect(()=>{(async()=>{try{const d=await gt.get("http://localhost:5000/api/artworks");e(d.data)}catch(d){console.error("Error fetching artworks:",d),a("Failed to load artworks")}finally{i(!1)}})()},[]);const l=c=>{console.log("Selected artwork:",c)},o=()=>{window.history.back()};return t?r.jsx("div",{children:"Loading VR Gallery..."}):s?r.jsxs("div",{children:["Error: ",s]}):r.jsx(IS,{artworks:n,onArtworkSelect:l,onExitVR:o})},mf=O.forwardRef(({className:n,type:e,...t},i)=>r.jsx("input",{type:e,className:Vt("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",n),ref:i,...t}));mf.displayName="Input";const OS=Nf,kS=Pf,gf=O.forwardRef(({className:n,children:e,...t},i)=>r.jsxs(fu,{ref:i,className:Vt("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",n),...t,children:[e,r.jsx(Mf,{asChild:!0,children:r.jsx(Iu,{className:"h-4 w-4 opacity-50"})})]}));gf.displayName=fu.displayName;const xf=O.forwardRef(({className:n,children:e,position:t="popper",...i},s)=>r.jsx(Tf,{children:r.jsx(pu,{ref:s,className:Vt("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",t==="popper"&&"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",n),position:t,...i,children:r.jsx(Af,{className:Vt("p-1",t==="popper"&&"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),children:e})})}));xf.displayName=pu.displayName;const FS=O.forwardRef(({className:n,...e},t)=>r.jsx(mu,{ref:t,className:Vt("py-1.5 pl-8 pr-2 text-sm font-semibold",n),...e}));FS.displayName=mu.displayName;const nl=O.forwardRef(({className:n,children:e,...t},i)=>r.jsxs(gu,{ref:i,className:Vt("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",n),...t,children:[r.jsx("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:r.jsx(Rf,{children:r.jsx(zp,{className:"h-4 w-4"})})}),r.jsx(Cf,{children:e})]}));nl.displayName=gu.displayName;const BS=O.forwardRef(({className:n,...e},t)=>r.jsx(xu,{ref:t,className:Vt("-mx-1 my-1 h-px bg-muted",n),...e}));BS.displayName=xu.displayName;const zS=()=>{const{id:n}=fa(),[e,t]=O.useState(null),[i,s]=O.useState([]),[a,l]=O.useState(""),[o,c]=O.useState("all");if(O.useEffect(()=>{const u={id:"1",name:"Галерея современного искусства",description:"Коллекция современных произведений искусства от ведущих художников 21 века.",location:"Центральный район, ул. Искусств, 15",openingHours:"Ежедневно 10:00-20:00",visitorCount:12500,artworks:[{id:"1",title:"Абстрактная композиция №1",artist:"Александр Петров",year:2020,description:"Экспериментальная работа, исследующая взаимодействие цвета и формы.",imageUrl:"/placeholder-artwork.jpg",tags:["абстракция","современное","краски"]},{id:"2",title:"Городской пейзаж",artist:"Мария Иванова",year:2022,description:"Реалистичное изображение городской архитектуры в вечернем свете.",imageUrl:"/placeholder-artwork.jpg",tags:["пейзаж","реализм","город"]},{id:"3",title:"Цифровая инсталляция",artist:"Анна Смирнова",year:2023,description:"Интерактивная инсталляция, реагирующая на движения посетителей.",imageUrl:"/placeholder-artwork.jpg",tags:["цифровое","инсталляция","интерактив"]}]};t(u),s(u.artworks)},[n]),O.useEffect(()=>{if(!e)return;let u=e.artworks;a&&(u=u.filter(f=>f.title.toLowerCase().includes(a.toLowerCase())||f.artist.toLowerCase().includes(a.toLowerCase()))),o!=="all"&&(u=u.filter(f=>f.tags.includes(o))),s(u)},[a,o,e]),!e)return r.jsx("div",{className:"container mx-auto px-4 py-8 flex justify-center items-center h-64",children:r.jsx("p",{className:"text-lg",children:"Загрузка галереи..."})});const d=Array.from(new Set(e.artworks.flatMap(u=>u.tags)));return r.jsxs("div",{className:"container mx-auto px-4 py-8",children:[r.jsxs("div",{className:"mb-8",children:[r.jsx("h1",{className:"text-4xl font-bold mb-4",children:e.name}),r.jsx("p",{className:"text-lg text-muted-foreground mb-6",children:e.description}),r.jsxs("div",{className:"flex flex-wrap gap-6 mb-6",children:[r.jsxs("div",{className:"flex items-center",children:[r.jsx(Js,{className:"h-5 w-5 mr-2 text-primary"}),r.jsx("span",{children:e.location})]}),r.jsxs("div",{className:"flex items-center",children:[r.jsx(si,{className:"h-5 w-5 mr-2 text-primary"}),r.jsx("span",{children:e.openingHours})]}),r.jsxs("div",{className:"flex items-center",children:[r.jsx(Bn,{className:"h-5 w-5 mr-2 text-primary"}),r.jsxs("span",{children:[e.visitorCount.toLocaleString()," посетителей"]})]})]})]}),r.jsxs("div",{className:"flex flex-col md:flex-row gap-6 mb-8",children:[r.jsx("div",{className:"flex-1",children:r.jsxs("div",{className:"relative",children:[r.jsx(Hr,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"}),r.jsx(mf,{placeholder:"Поиск экспонатов...",value:a,onChange:u=>l(u.target.value),className:"pl-10"})]})}),r.jsxs("div",{className:"flex gap-2",children:[r.jsxs(OS,{value:o,onValueChange:c,children:[r.jsxs(gf,{className:"w-[180px]",children:[r.jsx(Ou,{className:"h-4 w-4 mr-2"}),r.jsx(kS,{placeholder:"Фильтр"})]}),r.jsxs(xf,{children:[r.jsx(nl,{value:"all",children:"Все теги"}),d.map(u=>r.jsx(nl,{value:u,children:u},u))]})]}),r.jsx(be,{children:"Сортировать"})]})]}),r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:i.map(u=>r.jsxs(He,{className:"overflow-hidden",children:[r.jsx("img",{src:u.imageUrl,alt:u.title,className:"w-full h-48 object-cover"}),r.jsxs(Ge,{children:[r.jsx(Ve,{children:u.title}),r.jsxs(Xe,{children:["Автор: ",u.artist,", ",u.year]})]}),r.jsxs(We,{children:[r.jsx("p",{className:"text-sm text-muted-foreground mb-4",children:u.description}),r.jsx("div",{className:"flex flex-wrap gap-2",children:u.tags.map(f=>r.jsx("span",{className:"px-2 py-1 bg-primary/10 text-primary text-xs rounded-full",children:f},f))}),r.jsx(be,{className:"w-full mt-4",children:"Подробнее"})]})]},u.id))}),i.length===0&&r.jsxs("div",{className:"text-center py-12",children:[r.jsx("p",{className:"text-lg text-muted-foreground",children:"Не найдено экспонатов по заданным критериям"}),r.jsx(be,{variant:"outline",className:"mt-4",onClick:()=>{l(""),c("all")},children:"Сбросить фильтры"})]})]})},eu=se.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`,HS=se.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`,GS=se.h1`
  color: #333;
  margin: 0;
`,VS=se.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
`,js=se.div`
  margin-bottom: 1.5rem;
`,Ds=se.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`,WS=se.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`,XS=se.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
`,tu=se.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`,Is=se.button`
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
`,qS=()=>{const{galleryId:n}=fa(),[e,t]=O.useState([]),[,i]=O.useState([]),[s,a]=O.useState(!0),[l,o]=O.useState(""),[c,d]=O.useState(""),[u,f]=O.useState(""),[p,x]=O.useState(""),[,y]=O.useState([]),[g,m]=O.useState(null);O.useEffect(()=>{(async()=>{try{if(n){const A=await Pr.getRooms(parseInt(n));t(A);const L=await ra.getAllArtworks();i(L)}}catch(A){console.error("Ошибка при загрузке данных:",A)}finally{a(!1)}})()},[n]);const h=async T=>{T.preventDefault();try{const A={name:l,description:c,theme:u,region:p,tags:[u],layout_settings:{background_color:"#ffffff",lighting_settings:{ambient_intensity:.6,directional_intensity:.8,color_temperature:6500},wall_configurations:[],navigation_points:[]}},L=await Pr.createRoom(parseInt(n),A);t([...e,L]),_()}catch(A){console.error("Ошибка при создании зала:",A)}},b=async T=>{if(T.preventDefault(),!!g)try{const A={name:l,description:c,theme:u,region:p},L=await Pr.updateRoom(g.room_id,A);t(e.map(w=>w.room_id===L.room_id?L:w)),_()}catch(A){console.error("Ошибка при обновлении зала:",A)}},v=async T=>{if(window.confirm("Вы уверены, что хотите удалить этот зал?"))try{await Pr.deleteRoom(T),t(e.filter(A=>A.room_id!==T))}catch(A){console.error("Ошибка при удалении зала:",A)}},E=T=>{m(T),o(T.name),d(T.description||""),f(T.theme??""),x(T.region||"")},_=()=>{o(""),d(""),f(""),x(""),y([]),m(null)};return s?r.jsx(eu,{children:"Загрузка данных..."}):r.jsxs(eu,{children:[r.jsx(HS,{children:r.jsx(GS,{children:"Управление залами галереи"})}),r.jsxs(VS,{children:[r.jsx("h2",{children:g?"Редактировать зал":"Создать новый зал"}),r.jsxs("form",{onSubmit:g?b:h,children:[r.jsxs(js,{children:[r.jsx(Ds,{htmlFor:"name",children:"Название зала:"}),r.jsx(WS,{id:"name",type:"text",value:l,onChange:T=>o(T.target.value),required:!0})]}),r.jsxs(js,{children:[r.jsx(Ds,{htmlFor:"description",children:"Описание:"}),r.jsx(XS,{id:"description",value:c,onChange:T=>d(T.target.value)})]}),r.jsxs(js,{children:[r.jsx(Ds,{htmlFor:"theme",children:"Тема зала:"}),r.jsxs(tu,{id:"theme",value:u,onChange:T=>f(T.target.value),required:!0,children:[r.jsx("option",{value:"",children:"Выберите тему"}),r.jsx("option",{value:"impressionism",children:"Импрессионизм"}),r.jsx("option",{value:"sculpture",children:"Скульптура"}),r.jsx("option",{value:"renaissance",children:"Ренессанс"}),r.jsx("option",{value:"contemporary",children:"Современное искусство"}),r.jsx("option",{value:"photography",children:"Фотография"}),r.jsx("option",{value:"asian_art",children:"Азиатское искусство"}),r.jsx("option",{value:"european_art",children:"Европейское искусство"}),r.jsx("option",{value:"american_art",children:"Американское искусство"})]})]}),r.jsxs(js,{children:[r.jsx(Ds,{htmlFor:"region",children:"Регион (необязательно):"}),r.jsxs(tu,{id:"region",value:p,onChange:T=>x(T.target.value),children:[r.jsx("option",{value:"",children:"Выберите регион"}),r.jsx("option",{value:"european",children:"Европейский"}),r.jsx("option",{value:"asian",children:"Азиатский"}),r.jsx("option",{value:"american",children:"Американский"}),r.jsx("option",{value:"african",children:"Африканский"}),r.jsx("option",{value:"middle_eastern",children:"Ближневосточный"})]})]}),r.jsx(Is,{type:"submit",children:g?"Обновить зал":"Создать зал"}),g&&r.jsx(Is,{type:"button",style:{marginLeft:"1rem",backgroundColor:"#f44336"},onClick:_,children:"Отмена"})]})]}),r.jsxs("div",{children:[r.jsx("h2",{children:"Существующие залы"}),e.length>0?r.jsx("div",{children:e.map(T=>r.jsxs("div",{style:{border:"1px solid #ddd",borderRadius:"8px",padding:"1rem",marginBottom:"1rem"},children:[r.jsx("h3",{children:T.name}),r.jsxs("p",{children:[r.jsx("strong",{children:"Тема:"})," ",T.theme]}),r.jsxs("p",{children:[r.jsx("strong",{children:"Регион:"})," ",T.region||"Не указан"]}),T.description&&r.jsxs("p",{children:[r.jsx("strong",{children:"Описание:"})," ",T.description]}),r.jsxs("div",{style:{marginTop:"1rem"},children:[r.jsx(Is,{onClick:()=>E(T),children:"Редактировать"}),r.jsx(Is,{style:{marginLeft:"0.5rem",backgroundColor:"#f44336"},onClick:()=>v(T.room_id??0),children:"Удалить"})]})]},T.room_id))}):r.jsx("p",{children:"В этой галерее пока нет залов"})]})]})},$S=se.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`,YS=se.div`
  height: 200px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-style: italic;
`,KS=se.div`
  padding: 1rem;
`,ZS=se.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: #333;
`,JS=se.p`
  margin: 0 0 0.5rem 0;
  color: #666;
  font-weight: 500;
`,QS=se.p`
  margin: 0;
  color: #888;
  font-size: 0.9rem;
  line-height: 1.4;
`,eE=se.div`
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`,tE=({artwork:n,onClick:e})=>r.jsxs($S,{onClick:e,children:[r.jsx(YS,{children:n.image_url?r.jsx("img",{src:n.image_url,alt:n.title,style:{width:"100%",height:"100%",objectFit:"cover"}}):r.jsx("span",{children:"Изображение недоступно"})}),r.jsxs(KS,{children:[r.jsx(ZS,{children:n.title}),r.jsxs(JS,{children:["Автор: ",n.artist_name]}),r.jsx(QS,{children:n.description?.substring(0,100)+"..."}),r.jsxs(eE,{children:[r.jsx("span",{children:n.year_created||"Неизвестно"}),r.jsx("span",{children:n.medium||"Неизвестно"})]})]})]}),Mo=se.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`,nE=se.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`,iE=se.h1`
  color: #333;
  margin: 0;
`,rE=se.p`
  color: #666;
  margin: 0.5rem 0 2rem 0;
`,sE=se.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`,aE=se.button`
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
`,oE=()=>{const{id:n}=fa(),e=ha(),[t,i]=O.useState(null),[s,a]=O.useState([]),[l,o]=O.useState(!0);O.useEffect(()=>{(async()=>{try{if(n){const u=await Pr.getRoomById(parseInt(n));i(u);const p=(await ra.getAllArtworks()).filter(x=>x.tags.some(y=>(u.tags??[]).includes(y)));a(p)}}catch(u){console.error("Ошибка при загрузке данных зала:",u)}finally{o(!1)}})()},[n]);const c=()=>{e(-1)};return l?r.jsx(Mo,{children:"Загрузка зала..."}):t?r.jsxs(Mo,{children:[r.jsx(aE,{onClick:c,children:"← Назад к галерее"}),r.jsx(nE,{children:r.jsxs("div",{children:[r.jsx(iE,{children:t.name}),t.description&&r.jsx(rE,{children:t.description}),r.jsxs("p",{children:[r.jsx("strong",{children:"Тема:"})," ",t.theme]}),t.region&&r.jsxs("p",{children:[r.jsx("strong",{children:"Регион:"})," ",t.region]})]})}),r.jsxs("div",{children:[r.jsx("h2",{children:"Экспонаты в зале"}),s.length>0?r.jsx(sE,{children:s.map(d=>r.jsx(tE,{artwork:d,onClick:()=>e(`/artworks/${d.artwork_id}`)},d.artwork_id))}):r.jsx("p",{children:"В этом зале пока нет экспонатов"})]})]}):r.jsx(Mo,{children:"Зал не найден"})},lE=se.div`
  width: 100%;
  background-color: #f0f0f0;
  border-radius: 10px;
  margin: 1rem 0;
  overflow: hidden;
`,cE=se.div`
  height: 20px;
  background: linear-gradient(90deg, #6200ee, #3700b3);
  width: ${({percentage:n})=>`${n}%`};
  transition: width 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 0.75rem;
`,dE=se.div`
  text-align: center;
  margin-top: 0.5rem;
  color: #666;
`,uE=({percentage:n,status:e,showPercentage:t=!0})=>r.jsxs("div",{children:[r.jsx(lE,{children:r.jsx(cE,{percentage:n,children:t&&`${Math.round(n)}%`})}),r.jsx(dE,{children:e})]}),hE=se.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
`,fE=se.div`
  border: 2px dashed ${({isDragActive:n})=>n?"#6200ee":"#ddd"};
  border-radius: 8px;
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  background-color: ${({isDragActive:n})=>n?"rgba(98, 0, 238, 0.05)":"#fafafa"};
  transition: all 0.3s ease;

  &:hover {
    border-color: #6200ee;
  }
`,pE=se.div`
  font-size: 3rem;
  color: #ccc;
  margin-bottom: 1rem;
`,nu=se.p`
  color: #666;
  margin: 0.5rem 0;
`,iu=se.button`
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
`,mE=se.div`
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`,gE=se.div`
  position: relative;
  width: 150px;
  height: 150px;
`,xE=se.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`,vE=se.button`
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
`,yE=({onUploadComplete:n})=>{const[e,t]=O.useState(!1),[i,s]=O.useState([]),[a,l]=O.useState([]),[o,c]=O.useState(null),[d,u]=O.useState(!1),f=O.useRef(null),p=v=>{v.preventDefault(),v.stopPropagation(),v.type==="dragenter"||v.type==="dragover"?t(!0):v.type==="dragleave"&&t(!1)},x=v=>{v.preventDefault(),v.stopPropagation(),t(!1),v.dataTransfer.files&&v.dataTransfer.files[0]&&g(v.dataTransfer.files)},y=v=>{v.preventDefault(),v.target.files&&v.target.files[0]&&g(v.target.files)},g=v=>{const E=Array.from(v),_=E.filter(T=>T.type.startsWith("image/")&&(T.type==="image/jpeg"||T.type==="image/png"||T.type==="image/webp"||T.type==="image/jpg"));if(_.length!==E.length&&alert("Поддерживаются только изображения форматов JPEG, PNG, WebP"),_.length>0){s(A=>[...A,..._]);const T=_.map(A=>URL.createObjectURL(A));l(A=>[...A,...T])}},m=v=>{s(E=>E.filter((_,T)=>T!==v)),l(E=>E.filter((_,T)=>T!==v))},h=async()=>{if(i.length===0){alert("Пожалуйста, выберите изображения для загрузки");return}u(!0),c(0);try{for(let v=0;v<i.length;v++){const E=i[v],_=setInterval(()=>{c(A=>{if(A===null)return 0;const L=A+10;return L>=100?(clearInterval(_),100):L})},200),T=await $t.uploadImage(E,1);await $t.analyzeImage(T.artwork_id||1),clearInterval(_),c(100),n(T)}setTimeout(()=>{s([]),l([]),c(null),u(!1),alert("Изображения успешно загружены и отправлены на анализ")},1e3)}catch(v){console.error("Ошибка при загрузке изображений:",v),alert("Ошибка при загрузке изображений"),u(!1),c(null)}},b=()=>{f.current&&f.current.click()};return r.jsxs(hE,{children:[r.jsx("h3",{children:"Загрузка изображений экспонатов"}),r.jsxs(fE,{isDragActive:e,onDragEnter:p,onDragLeave:p,onDragOver:p,onDrop:x,onClick:b,children:[r.jsx(pE,{children:"📁"}),r.jsx(nu,{children:"Перетащите изображения сюда или нажмите для выбора"}),r.jsx(nu,{children:"Поддерживаются форматы: JPEG, PNG, WebP"}),r.jsx(iu,{children:"Выбрать файлы"}),r.jsx("input",{ref:f,type:"file",multiple:!0,accept:"image/jpeg,image/png,image/webp,image/jpg",onChange:y,style:{display:"none"}})]}),o!==null&&r.jsx(uE,{percentage:o,status:o<100?"Загрузка...":"Загрузка завершена"}),a.length>0&&r.jsx(mE,{children:a.map((v,E)=>r.jsxs(gE,{children:[r.jsx(xE,{src:v,alt:`Preview ${E}`}),r.jsx(vE,{onClick:()=>m(E),children:"×"})]},E))}),i.length>0&&r.jsx(iu,{onClick:h,disabled:d,style:{marginTop:"1rem"},children:d?"Загрузка...":`Загрузить ${i.length} файл(ов)`})]})},_E=se.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 1.5rem;
`,ru=se.h3`
  color: #333;
  margin-top: 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
`,bE=se.div`
  margin: 1rem 0;
`,wE=se.span`
  display: inline-block;
  background-color: #6200ee;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`,SE=se.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: ${({color:n})=>n};
  border-radius: 50%;
  margin-right: 0.5rem;
  border: 1px solid #ccc;
`,EE=se.div`
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin: 0.5rem 0;
`,ME=se.div`
  height: 100%;
  width: ${({percentage:n})=>`${n}%`};
  background-color: #4caf50;
`,TE=se.div`
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`,vf=({analysis:n,artwork:e,onArtworkChange:t})=>r.jsxs(_E,{children:[r.jsx(ru,{children:"Результаты ИИ-анализа"}),r.jsxs("div",{children:[r.jsxs("h4",{children:["Предполагаемый стиль: ",r.jsx("strong",{children:n.style})]}),r.jsxs("p",{children:["Доверительная оценка: ",Math.round((n.confidence??0)*100),"%"]}),r.jsx(EE,{children:r.jsx(ME,{percentage:(n.confidence??0)*100})})]}),r.jsx("div",{children:r.jsxs("h4",{children:["Оценка периода: ",r.jsx("strong",{children:n.estimated_period})]})}),r.jsxs(bE,{children:[r.jsx("h4",{children:"Обнаруженные теги:"}),(n.tags??[]).map((i,s)=>r.jsx(wE,{children:i},s))]}),r.jsxs("div",{children:[r.jsx("h4",{children:"Доминирующие цвета:"}),r.jsx("div",{children:(n.dominant_colors??[]).map((i,s)=>r.jsx(SE,{color:i,title:i},s))})]}),r.jsxs("div",{children:[r.jsx("h4",{children:"Обнаруженные объекты:"}),(n.detected_objects??[]).map((i,s)=>r.jsxs(TE,{children:[r.jsxs("div",{children:[r.jsx("strong",{children:i.name})," (доверие: ",Math.round(i.confidence*100),"%)"]}),r.jsxs("div",{children:["Позиция: (",i.bounding_box.x,", ",i.bounding_box.y,"), Размер: ",i.bounding_box.width,"x",i.bounding_box.height]})]},s))]}),r.jsxs("div",{children:[r.jsx("h4",{children:"Качество изображения:"}),r.jsxs("p",{children:["Яркость: ",(n.image_quality?.brightness??0).toFixed(2)]}),r.jsxs("p",{children:["Контрастность: ",(n.image_quality?.contrast??0).toFixed(2)]}),r.jsxs("p",{children:["Резкость: ",(n.image_quality?.sharpness??0).toFixed(2)]}),r.jsxs("p",{children:["Разрешение: ",n.image_quality?.resolution?.width??0,"x",n.image_quality?.resolution?.height??0]})]}),r.jsx(ru,{children:"Редактирование карточки экспоната"}),r.jsx("div",{children:r.jsxs("label",{children:[r.jsx("strong",{children:"Название:"}),r.jsx("input",{type:"text",value:e.title||"",onChange:i=>t("title",i.target.value),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0"}})]})}),r.jsx("div",{children:r.jsxs("label",{children:[r.jsx("strong",{children:"Имя художника:"}),r.jsx("input",{type:"text",value:e.artist_name||"",onChange:i=>t("artist_name",i.target.value),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0"}})]})}),r.jsx("div",{children:r.jsxs("label",{children:[r.jsx("strong",{children:"Год создания:"}),r.jsx("input",{type:"number",value:e.year_created||"",onChange:i=>t("year_created",i.target.value?parseInt(i.target.value):void 0),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0"}})]})}),r.jsx("div",{children:r.jsxs("label",{children:[r.jsx("strong",{children:"Техника:"}),r.jsx("input",{type:"text",value:e.medium||"",onChange:i=>t("medium",i.target.value),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0"}})]})}),r.jsx("div",{children:r.jsxs("label",{children:[r.jsx("strong",{children:"Стиль:"}),r.jsx("input",{type:"text",value:e.style||"",onChange:i=>t("style",i.target.value),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0"}})]})}),r.jsx("div",{children:r.jsxs("label",{children:[r.jsx("strong",{children:"Описание:"}),r.jsx("textarea",{value:e.description||"",onChange:i=>t("description",i.target.value),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0",minHeight:"100px"}})]})}),r.jsx("div",{children:r.jsxs("label",{children:[r.jsx("strong",{children:"Теги (через запятую):"}),r.jsx("input",{type:"text",value:e.tags?.join(", ")||"",onChange:i=>t("tags",i.target.value.split(",").map(s=>s.trim())),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0"}})]})})]}),su=se.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`,AE=se.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`,RE=se.h1`
  color: #333;
  margin: 0;
`,CE=se.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`,Us=se.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  text-align: center;
`,Os=se.p`
  font-size: 2rem;
  font-weight: bold;
  color: #6200ee;
  margin: 0.5rem 0;
`,To=se.section`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
`,Ao=se.h2`
  color: #333;
  margin-top: 0;
  margin-bottom: 1.5rem;
`,Cr=se.button`
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
`,NE=se.table`
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
`,PE=n=>{switch(n){case"uploaded":return"#2196f3";case"analyzing":return"#ff9800";case"analyzed":return"#4caf50";case"review_pending":return"#9c27b0";case"published":return"#8bc34a";case"rejected":return"#f44336";default:return"#9e9e9e"}};function LE(n){return r.jsx("span",{style:{padding:"0.25rem 0.75rem",borderRadius:"20px",fontSize:"0.8rem",fontWeight:500,backgroundColor:PE(n.status),color:"white"},children:n.children})}const jE=()=>{const[n,e]=O.useState([]),[t,i]=O.useState(null),[s,a]=O.useState(null),[l,o]=O.useState({}),[c,d]=O.useState(!0),[u,f]=O.useState({totalUploads:0,analyzing:0,analyzed:0,published:0});O.useEffect(()=>{(async()=>{try{const v=await $t.getUserUploads(1);e(v);const E=v.length,_=v.filter(L=>L.status==="analyzing").length,T=v.filter(L=>L.status==="analyzed").length,A=v.filter(L=>L.status==="published").length;f({totalUploads:E,analyzing:_,analyzed:T,published:A})}catch(v){console.error("Ошибка при загрузке загрузок:",v)}finally{d(!1)}})()},[]);const p=async b=>{e(v=>[...v,b]),f(v=>({...v,totalUploads:v.totalUploads+1,analyzing:v.analyzing+1})),i(b);try{const v=await $t.getImageAnalysis(b.artwork_id||1);a(v),e(E=>E.map(_=>_.artwork_id===b.artwork_id?{..._,status:"analyzed",analysis_result:v}:_)),f(E=>({...E,analyzing:E.analyzing-1,analyzed:E.analyzed+1}))}catch(v){console.error("Ошибка при загрузке результатов анализа:",v)}},x=async b=>{if(i(b),b.analysis_result)a(b.analysis_result),o(b.artwork_data||{});else try{const v=await $t.getImageAnalysis(b.artwork_id||1);a(v),o({...b.artwork_data,title:(b.original_name??"").replace(/\.[^/.]+$/,"")})}catch(v){console.error("Ошибка при загрузке результатов анализа:",v)}},y=(b,v)=>{o(E=>({...E,[b]:v}))},g=async()=>{if(!t){alert("Сначала выберите изображение для сохранения");return}try{e(b=>b.map(v=>v.artwork_id===t.artwork_id?{...v,status:"review_pending",artwork_data:l}:v)),f(b=>({...b,analyzed:b.analyzed-1})),alert("Карточка экспоната сохранена и отправлена на проверку")}catch(b){console.error("Ошибка при сохранении карточки:",b),alert("Ошибка при сохранении карточки")}},m=async()=>{if(!t){alert("Сначала выберите изображение для публикации");return}try{e(b=>b.map(v=>v.artwork_id===t.artwork_id?{...v,status:"published"}:v)),f(b=>({...b,analyzed:b.analyzed-1,published:b.published+1})),alert("Экспонат опубликован")}catch(b){console.error("Ошибка при публикации:",b),alert("Ошибка при публикации экспоната")}},h=async()=>{if(!t){alert("Сначала выберите изображение для повторного анализа");return}try{e(v=>v.map(E=>E.artwork_id===t.artwork_id?{...E,status:"analyzing"}:E)),f(v=>({...v,analyzed:v.analyzed-1,analyzing:v.analyzing+1}));const b=await $t.reanalyzeImage(t.artwork_id||1);a(b),e(v=>v.map(E=>E.artwork_id===t.artwork_id?{...E,status:"analyzed",analysis_result:b}:E)),f(v=>({...v,analyzing:v.analyzing-1,analyzed:v.analyzed+1})),alert("Повторный анализ завершен")}catch(b){console.error("Ошибка при повторном анализе:",b),alert("Ошибка при повторном анализе")}};return c?r.jsx(su,{children:"Загрузка данных..."}):r.jsxs(su,{children:[r.jsx(AE,{children:r.jsx(RE,{children:"Дашборд сотрудника музея"})}),r.jsxs(CE,{children:[r.jsxs(Us,{children:[r.jsx("h3",{children:"Всего загрузок"}),r.jsx(Os,{children:u.totalUploads})]}),r.jsxs(Us,{children:[r.jsx("h3",{children:"На анализе"}),r.jsx(Os,{children:u.analyzing})]}),r.jsxs(Us,{children:[r.jsx("h3",{children:"Проанализировано"}),r.jsx(Os,{children:u.analyzed})]}),r.jsxs(Us,{children:[r.jsx("h3",{children:"Опубликовано"}),r.jsx(Os,{children:u.published})]})]}),r.jsxs(To,{children:[r.jsx(Ao,{children:"Загрузка новых изображений"}),r.jsx(yE,{onUploadComplete:p})]}),r.jsxs(To,{children:[r.jsx(Ao,{children:"Загруженные изображения"}),r.jsxs(NE,{children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"Имя файла"}),r.jsx("th",{children:"Дата загрузки"}),r.jsx("th",{children:"Статус"}),r.jsx("th",{children:"Действия"})]})}),r.jsx("tbody",{children:n.map(b=>r.jsxs("tr",{children:[r.jsx("td",{children:b.original_name}),r.jsx("td",{children:b.upload_date?new Date(b.upload_date).toLocaleDateString():""}),r.jsx("td",{children:r.jsxs(LE,{status:b.status??"",children:[b.status==="uploaded"&&"Загружено",b.status==="analyzing"&&"Анализируется",b.status==="analyzed"&&"Проанализировано",b.status==="review_pending"&&"На проверке",b.status==="published"&&"Опубликовано",b.status==="rejected"&&"Отклонено"]})}),r.jsxs("td",{children:[r.jsx(Cr,{onClick:()=>x(b),children:t?.artwork_id===b.artwork_id?"Выбрано":"Выбрать"}),b.status==="analyzed"&&r.jsx(Cr,{onClick:h,children:"Повторный анализ"})]})]},b.artwork_id))})]})]}),t&&s&&r.jsxs(To,{children:[r.jsxs(Ao,{children:["Анализ изображения: ",t.original_name]}),r.jsx(vf,{analysis:s,artwork:l,onArtworkChange:y}),r.jsx(Cr,{onClick:g,children:"Сохранить карточку и отправить на проверку"}),r.jsx(Cr,{onClick:m,children:"Опубликовать (для подтвержденных карточек)"}),r.jsx(Cr,{onClick:h,children:"Повторный анализ"})]})]})},au=se.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`,DE=se.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`,IE=se.h1`
  color: #333;
  margin: 0;
`,ou=se.section`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
`,lu=se.h2`
  color: #333;
  margin-top: 0;
  margin-bottom: 1.5rem;
`,ks=se.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  margin-right: 1rem;
  margin-bottom: 1rem;

  ${({variant:n})=>{switch(n){case"success":return"background-color: #4caf50; color: white;";case"danger":return"background-color: #f44336; color: white;";default:return"background-color: #6200ee; color: white;"}}}

  &:hover {
    opacity: 0.9;
  }
`,UE=se.table`
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
`,OE=se.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${({status:n})=>{switch(n){case"pending":return"#2196f3";case"approved":return"#4caf50";case"rejected":return"#f44336";case"needs_revision":return"#ff9800";default:return"#9e9e9e"}}};
  color: white;
`,kE=se.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  margin-top: 1rem;
  min-height: 100px;
`,FE=()=>{const[n,e]=O.useState([]),[t,i]=O.useState(null),[s,a]=O.useState(""),[l,o]=O.useState(!0);O.useEffect(()=>{(async()=>{try{const x=await $t.getSubmissionsForReview();e(x)}catch(x){console.error("Ошибка при загрузке материалов на проверку:",x)}finally{o(!1)}})()},[]);const c=p=>{i(p),a(p.reviewer_notes||"")},d=async()=>{if(!t){alert("Сначала выберите материал для одобрения");return}try{await $t.approveSubmission(t.submission_id,{...t.artwork_upload?.artwork_data,status:"published",reviewed_by:1,reviewed_at:new Date}),e(p=>p.map(x=>x.submission_id===t.submission_id?{...x,status:"approved"}:x)),alert("Материал одобрен и опубликован")}catch(p){console.error("Ошибка при одобрении материала:",p),alert("Ошибка при одобрении материала")}},u=async()=>{if(!t){alert("Сначала выберите материал для отклонения");return}try{await $t.rejectSubmission(t.submission_id,s),e(p=>p.map(x=>x.submission_id===t.submission_id?{...x,status:"rejected",reviewer_notes:s}:x)),alert("Материал отклонен")}catch(p){console.error("Ошибка при отклонении материала:",p),alert("Ошибка при отклонении материала")}},f=async()=>{if(!t){alert("Сначала выберите материал для возврата на доработку");return}try{await $t.rejectSubmission(t.submission_id,s),e(p=>p.map(x=>x.submission_id===t.submission_id?{...x,status:"needs_revision",reviewer_notes:s}:x)),alert("Материал возвращен на доработку")}catch(p){console.error("Ошибка при возврате на доработку:",p),alert("Ошибка при возврате на доработку")}};return l?r.jsx(au,{children:"Загрузка материалов на проверку..."}):r.jsxs(au,{children:[r.jsx(DE,{children:r.jsx(IE,{children:"Проверка карточек экспонатов"})}),r.jsxs(ou,{children:[r.jsx(lu,{children:"Материалы на проверке"}),r.jsxs(UE,{children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"Имя файла"}),r.jsx("th",{children:"Загружено пользователем"}),r.jsx("th",{children:"Дата загрузки"}),r.jsx("th",{children:"Статус"}),r.jsx("th",{children:"Действия"})]})}),r.jsx("tbody",{children:n.map(p=>r.jsxs("tr",{children:[r.jsx("td",{children:p.artwork_upload?.original_name??""}),r.jsx("td",{children:p.submitted_by}),r.jsx("td",{children:new Date(p.submitted_at??p.created_at??"").toLocaleDateString()}),r.jsx("td",{children:r.jsxs(OE,{status:p.status??"",children:[p.status==="pending"&&"На проверке",p.status==="approved"&&"Одобрено",p.status==="rejected"&&"Отклонено",p.status==="needs_revision"&&"Требует доработки"]})}),r.jsx("td",{children:r.jsx(ks,{variant:"primary",onClick:()=>c(p),children:"Просмотреть"})})]},p.submission_id))})]})]}),t&&r.jsxs(ou,{children:[r.jsxs(lu,{children:["Просмотр карточки: ",t.artwork_upload?.original_name??""]}),r.jsx(vf,{analysis:t.artwork_upload?.analysis_result??{},artwork:t.artwork_upload?.artwork_data??{},onArtworkChange:()=>{}}),r.jsx(kE,{value:s,onChange:p=>a(p.target.value),placeholder:"Комментарии к проверке (необходимы при отклонении или возврате на доработку)"}),r.jsx(ks,{variant:"success",onClick:d,children:"Одобрить и опубликовать"}),r.jsx(ks,{variant:"danger",onClick:u,children:"Отклонить"}),r.jsx(ks,{variant:"primary",onClick:f,children:"Вернуть на доработку"})]}),n.length===0&&r.jsx("p",{children:"Нет материалов, ожидающих проверки"})]})},BE=se.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`,zE=se.h2`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1.5rem;
`,HE=se.div`
  border: 2px dashed ${n=>n.isDragOver?"#3498db":"#bdc3c7"};
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  background-color: ${n=>(n.isDragOver,"#f8f9fa")};
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;

  &:hover {
    border-color: #3498db;
  }
`,GE=se.div`
  font-size: 3rem;
  color: #bdc3c7;
  margin-bottom: 1rem;
`,cu=se.p`
  color: #7f8c8d;
  margin: 0.5rem 0;
`,VE=se.button`
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
`,WE=se.div`
  height: 8px;
  background-color: #ecf0f1;
  border-radius: 4px;
  overflow: hidden;
  margin: 1rem 0;
`,XE=se.div`
  height: 100%;
  background-color: #3498db;
  width: ${n=>n.width}%;
  transition: width 0.3s ease;
`,qE=se.div`
  padding: 0.75rem;
  border-radius: 4px;
  margin: 1rem 0;
  text-align: center;
  background-color: ${n=>n.type==="success"?"#d4edda":n.type==="error"?"#f8d7da":"#d1ecf1"};
  color: ${n=>n.type==="success"?"#155724":n.type==="error"?"#721c24":"#0c5460"};
`,$E=se.div`
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: #e8f4fd;
  border-radius: 4px;
  font-size: 0.9rem;
`,YE=()=>{const[n,e]=O.useState([]),[t,i]=O.useState([]),[s,a]=O.useState(!1),[l,o]=O.useState(0),[c,d]=O.useState(0),[u,f]=O.useState(0),[p,x]=O.useState(!1),[y,g]=O.useState(null),[m]=O.useState(1),[h,b]=O.useState("drag"),[v,E]=O.useState(""),[_,T]=O.useState(!1),[A,L]=O.useState($t.getCacheInfo()),w=O.useRef(null);O.useEffect(()=>{const N=setInterval(()=>{L($t.getCacheInfo())},5e3);return()=>clearInterval(N)},[]);const M=N=>{if(N.target.files&&N.target.files.length>0){const I=Array.from(N.target.files);j(I)}},j=N=>{const I=[];let G="";for(const H of N)if(H.type.startsWith("image/")){if(H.size>10*1024*1024){G="Размер файла не должен превышать 10MB";break}I.push(H)}else if(h==="archive"&&(H.type==="application/zip"||H.name.endsWith(".zip")))I.push(H);else{G="Пожалуйста, выберите изображения или ZIP-архив с изображениями";break}if(G){g({type:"error",message:G});return}e(H=>[...H,...I]),g(null)},B=N=>{N.preventDefault(),a(!0)},$=()=>{a(!1)},P=N=>{if(N.preventDefault(),a(!1),N.dataTransfer.files&&N.dataTransfer.files.length>0){const I=Array.from(N.dataTransfer.files);j(I)}},z=N=>{N.preventDefault(),v.trim()&&(i(I=>[...I,v]),E(""),g({type:"info",message:`Добавлена ссылка: ${v}`}))},Z=async()=>{if(n.length===0&&t.length===0){g({type:"error",message:"Пожалуйста, добавьте изображения или ссылки для загрузки"});return}x(!0),o(0),f(0);let N=n.length;h==="archive"&&(N=1),d(N),g({type:"info",message:"Загрузка изображений..."});try{if(h==="archive"&&n.length>0){for(const G of n)if(G.type==="application/zip"||G.name.endsWith(".zip")){g({type:"info",message:`Извлечение файлов из архива ${G.name}...`}),await new Promise(ie=>setTimeout(ie,1e3));const H=5;d(H);for(let ie=0;ie<H;ie++){f(ve=>ve+1);const F=Math.round((ie+1)/H*100);o(F),await new Promise(ve=>setTimeout(ve,200))}}}else for(let G=0;G<n.length;G++){const H=n[G];f(G+1);const ie=Math.round((G+1)/n.length*100);o(ie),g({type:"info",message:`Загрузка файла ${G+1} из ${n.length}: ${H.name}`}),await $t.uploadImage(H,m),await new Promise(F=>setTimeout(F,300))}for(let G=0;G<t.length;G++){const H=t[G];f(ve=>ve+1);const ie=n.length+t.length,F=Math.round((n.length+G+1)/ie*100);o(F),g({type:"info",message:`Загрузка по ссылке ${G+1} из ${t.length}: ${H}`}),await new Promise(ve=>setTimeout(ve,500))}g({type:"success",message:`Все файлы успешно загружены! Обработано: ${n.length} файлов, ${t.length} ссылок.`}),g({type:"info",message:"Запуск ИИ-анализа и генерации миниатюр..."}),await new Promise(G=>setTimeout(G,2e3)),g({type:"success",message:"ИИ-анализ завершен! Миниатюры сгенерированы, водяные знаки добавлены."}),window.confirm("Хотите создать NFT для загруженных произведений?")&&(g({type:"info",message:"Создание NFT..."}),await new Promise(G=>setTimeout(G,1500)),g({type:"success",message:"NFT успешно сформированы и готовы к размещению в блокчейне!"})),e([]),i([]),o(0),f(0),d(0),w.current&&(w.current.value="")}catch(I){console.error("Ошибка при загрузке изображений:",I),g({type:"error",message:`Ошибка при загрузке: ${I.message}`})}finally{x(!1)}},Y=()=>{w.current&&w.current.click()},ae=N=>{e(I=>I.filter((G,H)=>H!==N))},J=N=>{i(I=>I.filter((G,H)=>H!==N))},ne=()=>{$t.clearCache(),g({type:"success",message:"Кэш изображений очищен"})};return r.jsxs(BE,{children:[r.jsx(zE,{children:"Загрузка изображений экспонатов"}),r.jsxs("div",{style:{marginBottom:"1rem"},children:[r.jsxs("label",{children:[r.jsx("input",{type:"radio",checked:h==="drag",onChange:()=>b("drag")})," Загрузка файлов"]}),r.jsxs("label",{style:{marginLeft:"1rem"},children:[r.jsx("input",{type:"radio",checked:h==="archive",onChange:()=>b("archive")})," Загрузка архива"]}),r.jsxs("label",{style:{marginLeft:"1rem"},children:[r.jsx("input",{type:"radio",checked:h==="url",onChange:()=>{b("url"),T(!0)}})," Загрузка по ссылке"]})]}),_&&r.jsxs("form",{onSubmit:z,style:{marginBottom:"1rem"},children:[r.jsx("input",{type:"text",value:v,onChange:N=>E(N.target.value),placeholder:"Введите URL изображения",style:{width:"70%",padding:"0.5rem",marginRight:"0.5rem",borderRadius:"4px",border:"1px solid #ccc"}}),r.jsx("button",{type:"submit",style:{padding:"0.5rem 1rem",backgroundColor:"#3498db",color:"white",border:"none",borderRadius:"4px",cursor:"pointer"},children:"Добавить"})]}),r.jsxs(HE,{isDragOver:s,onDragOver:B,onDragLeave:$,onDrop:P,onClick:h!=="url"?Y:void 0,children:[r.jsx(GE,{children:"📁"}),r.jsx(cu,{children:h==="archive"?"Перетащите ZIP-архив с изображениями сюда или нажмите для выбора":"Перетащите изображения сюда или нажмите для выбора"}),r.jsx(cu,{children:r.jsx("small",{children:h==="archive"?"Поддерживаемые форматы: ZIP (макс. 50MB)":"Поддерживаемые форматы: JPG, PNG, GIF (макс. 10MB)"})}),r.jsx("input",{type:"file",ref:w,onChange:M,accept:h==="archive"?".zip,application/zip":"image/*",multiple:h!=="archive",style:{display:"none"}})]}),n.length>0&&r.jsxs("div",{style:{marginTop:"1rem"},children:[r.jsx("h4",{children:"Выбранные файлы:"}),r.jsx("ul",{children:n.map((N,I)=>r.jsxs("li",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[r.jsxs("span",{children:[N.name," (",(N.size/1024/1024).toFixed(2)," MB)"]}),r.jsx("button",{onClick:()=>ae(I),style:{backgroundColor:"#e74c3c",color:"white",border:"none",borderRadius:"4px",padding:"0.2rem 0.5rem",cursor:"pointer"},children:"Удалить"})]},I))})]}),t.length>0&&r.jsxs("div",{style:{marginTop:"1rem"},children:[r.jsx("h4",{children:"Ссылки для загрузки:"}),r.jsx("ul",{children:t.map((N,I)=>r.jsxs("li",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[r.jsx("span",{children:N}),r.jsx("button",{onClick:()=>J(I),style:{backgroundColor:"#e74c3c",color:"white",border:"none",borderRadius:"4px",padding:"0.2rem 0.5rem",cursor:"pointer"},children:"Удалить"})]},I))})]}),l>0&&r.jsxs(r.Fragment,{children:[r.jsx(WE,{children:r.jsx(XE,{width:l})}),r.jsxs("div",{style:{textAlign:"center",fontSize:"0.9rem",color:"#7f8c8d"},children:[u," из ",c||n.length+t.length," файлов обработано (",l,"%)"]})]}),y&&r.jsx(qE,{type:y.type,children:y.message}),r.jsxs($E,{children:[r.jsxs("div",{children:["Кэш изображений: ",(A.size/1024/1024).toFixed(2)," MB / ",(A.maxSize/1024/1024).toFixed(0)," MB"]}),r.jsxs("div",{children:["Количество закэшированных изображений: ",A.count]}),r.jsx("button",{onClick:ne,style:{marginTop:"0.5rem",padding:"0.25rem 0.5rem",backgroundColor:"#f39c12",color:"white",border:"none",borderRadius:"4px",cursor:"pointer",fontSize:"0.8rem"},children:"Очистить кэш"})]}),r.jsx("div",{style:{textAlign:"center"},children:r.jsx(VE,{onClick:Z,disabled:n.length===0&&t.length===0||p,children:p?"Загрузка...":"Загрузить и обработать"})})]})},KE=se.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
`,ZE=se.header`
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,JE=se.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`,QE=se.aside`
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 1rem 0;
  overflow-y: auto;
`,eM=se.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background-color: #fafafa;
`,tM=se.div`
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  background-color: ${n=>n.active?"#34495e":"transparent"};
  transition: background-color 0.3s;

  &:hover {
    background-color: #34495e;
  }
`,nM=se.h1`
  font-size: 1.5rem;
  color: #2c3e50;
  margin: 0;
`,iM=({title:n,children:e,activeNav:t,onNavClick:i,userRole:s})=>{const a=s==="admin"?["Overview","Users","Artworks","Collections","Exhibitions","Auctions","Reports","Settings"]:["Overview","Artworks","Collections","Exhibitions","Reports"];return r.jsxs(KE,{children:[r.jsxs(ZE,{children:[r.jsx(nM,{children:n}),r.jsxs("div",{children:["Welcome, ",s.charAt(0).toUpperCase()+s.slice(1),"!"]})]}),r.jsxs(JE,{children:[r.jsx(QE,{children:a.map(l=>r.jsx(tM,{active:t===l.toLowerCase(),onClick:()=>i(l.toLowerCase()),children:l},l))}),r.jsx(eM,{children:e})]})]})},rM=se.div`
  padding: 2rem;
`,sM=()=>r.jsx(iM,{title:"Загрузка экспонатов",activeNav:"artworks",onNavClick:()=>{},userRole:"admin",children:r.jsx(rM,{children:r.jsx(YE,{})})}),aM=se.div`
  width: 100%;
  height: 100vh;
  position: relative;
`,oM=se.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  z-index: 10;
  max-width: 300px;
`,lM=se.div`
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
`,du=se.button`
  padding: 0.5rem 1rem;
  background: #6200ee;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #3700b3;
  }
`,cM=({artworks:n,onArtworkClick:e,onExitVR:t})=>{const i=O.useRef(null),s=O.useRef(null),a=O.useRef(null),l=O.useRef(null),o=O.useRef(null),c=O.useRef(null),d=O.useRef({}),u=O.useRef(new NS),f=O.useRef(new $e),[p,x]=O.useState({fps:0,objects:0}),y=O.useRef(new Map);O.useEffect(()=>{if(!i.current)return;const E=new cf;E.background=new ot(1118483),E.fog=new Ml(1118483,10,30),s.current=E;const _=new qt(75,window.innerWidth/window.innerHeight,.1,1e3);_.position.set(0,1.6,5),a.current=_;const T=new El({antialias:!0,powerPreference:"high-performance",alpha:!0});T.setSize(window.innerWidth,window.innerHeight),T.setPixelRatio(Math.min(window.devicePixelRatio,2)),T.shadowMap.enabled=!0,T.shadowMap.type=jh,T.toneMapping=Ih,T.toneMappingExposure=1.2,T.xr.enabled=!0,i.current.appendChild(T.domElement),l.current=T;const A=g(E);m(E),b(E,n);const L=new pf(_,T.domElement);L.enableDamping=!0,L.dampingFactor=.05,o.current=L;let w=0,M=performance.now();const j=()=>{_&&T&&(_.aspect=window.innerWidth/window.innerHeight,_.updateProjectionMatrix(),T.setSize(window.innerWidth,window.innerHeight))};window.addEventListener("resize",j);const B=()=>{c.current=requestAnimationFrame(B),L&&L.update(),w++;const $=performance.now();if($>=M+1e3){const P=Math.round(w*1e3/($-M));x({fps:P,objects:E.children.length}),w=0,M=$}T&&E&&_&&T.render(E,_)};return B(),()=>{window.removeEventListener("resize",j),c.current&&cancelAnimationFrame(c.current),y.current.forEach($=>$.dispose()),y.current.clear(),i.current&&T?.domElement&&i.current.removeChild(T.domElement),T?.domElement.removeEventListener("click",v),T&&(T.dispose(),E.traverse($=>{if($.geometry&&$.geometry.dispose(),$.material){const P=$.material;Array.isArray(P)?P.forEach(z=>z.dispose()):P.dispose()}})),A.forEach($=>$.removeFromParent())}},[n]);const g=E=>{const _=[],T=new ff(16777215,.4);E.add(T),_.push(T);const A=new hf(16777215,.8);return A.position.set(5,10,7),A.castShadow=!0,A.shadow.mapSize.width=2048,A.shadow.mapSize.height=2048,A.shadow.camera.near=.5,A.shadow.camera.far=50,A.shadow.camera.left=-10,A.shadow.camera.right=10,A.shadow.camera.top=10,A.shadow.camera.bottom=-10,E.add(A),_.push(A),n.slice(0,20).forEach((w,M)=>{const j=new uf(16768426,.6);j.position.set(-6+M%4*4,4,-8+Math.floor(M/4)*-4),j.castShadow=!0,j.angle=Math.PI/6,j.penumbra=.2,j.decay=2,j.distance=20,j.shadow.mapSize.width=512,j.shadow.mapSize.height=512,j.shadow.camera.near=.5,j.shadow.camera.far=20,E.add(j),_.push(j)}),_},m=E=>{const _=new zn(40,40),T=new cn({color:3355443,roughness:.8,metalness:.2}),A=new mt(_,T);A.rotation.x=-Math.PI/2,A.receiveShadow=!0,E.add(A);const L=new Gn(40,8,.5),w=new cn({color:4473924,roughness:.7,metalness:.3}),M=new mt(L,w);M.position.z=-20,M.position.y=4,M.castShadow=!1,M.receiveShadow=!0,E.add(M);const j=new mt(L,w);j.position.x=-20,j.position.y=4,j.rotation.y=Math.PI/2,j.castShadow=!1,j.receiveShadow=!0,E.add(j);const B=new mt(L,w);B.position.x=20,B.position.y=4,B.rotation.y=Math.PI/2,B.castShadow=!1,B.receiveShadow=!0,E.add(B);const $=new zn(40,40),P=new cn({color:2236962,roughness:.9,metalness:.1}),z=new mt($,P);z.rotation.x=Math.PI/2,z.position.y=8,z.castShadow=!1,E.add(z),h(E)},h=E=>{const _=new Ta(.5,.5,8,16),T=new cn({color:8947848,roughness:.6,metalness:.2}),A=new TS(_,T,4),L=new _t;for(let w=0;w<4;w++)L.setPosition(-15+w*10,4,-18),A.setMatrixAt(w,L);A.instanceMatrix.needsUpdate=!0,A.castShadow=!0,A.receiveShadow=!0,E.add(A)},b=(E,_)=>{Object.values(d.current).forEach(T=>{T.parent&&T.parent.remove(T)}),d.current={},_.forEach((T,A)=>{const L=-6+A%4*4,w=-8+Math.floor(A/4)*-4,M=2,j=new jr;j.position.set(L,M,w),E.add(j);const B=new Gn(2.5,2.5,.1),$=new cn({color:9127187,metalness:.3,roughness:.7}),P=new mt(B,$);P.userData={type:"artwork",artworkId:T.artwork_id,artwork:T},j.add(P);const z=new zn(2.3,2.3);let Z=null;if(T.image_url&&y.current.has(T.image_url))Z=y.current.get(T.image_url);else if(T.image_url){const J=document.createElement("canvas");J.width=512,J.height=512;const ne=J.getContext("2d");ne.fillStyle="#aaaaaa",ne.fillRect(0,0,J.width,J.height),ne.fillStyle="#ffffff",ne.font="20px Arial",ne.textAlign="center",ne.fillText(T.title||"Artwork",J.width/2,J.height/2);const N=new AS(J);y.current.set(T.image_url,N),Z=N}const Y=new cn({map:Z||void 0,color:Z?16777215:11184810,emissive:Z?3355443:2236962,roughness:.5,metalness:.1,side:Mn}),ae=new mt(z,Y);ae.position.z=.06,ae.userData={type:"artwork",artworkId:T.artwork_id,artwork:T},j.add(ae),d.current[T.artwork_id??0]=ae})},v=E=>{if(!a.current||!l.current||!s.current)return;const _=l.current.domElement.getBoundingClientRect();f.current.x=(E.clientX-_.left)/_.width*2-1,f.current.y=-((E.clientY-_.top)/_.height)*2+1,u.current.setFromCamera(f.current,a.current);const T=Object.values(d.current),A=u.current.intersectObjects(T);if(A.length>0){const L=A[0].object;L.userData&&L.userData.artwork&&e(L.userData.artwork)}};return O.useEffect(()=>{const E=l.current?.domElement;if(E)return E.addEventListener("click",v),()=>{E.removeEventListener("click",v)}},[]),r.jsxs(aM,{ref:i,children:[r.jsxs(oM,{children:[r.jsx("h3",{children:"Виртуальная галерея"}),r.jsx("p",{children:"Используйте мышь для навигации по галерее"}),r.jsxs("p",{children:["Всего экспонатов: ",n.length]}),r.jsxs("p",{children:["FPS: ",p.fps]}),r.jsxs("p",{children:["Объектов: ",p.objects]})]}),r.jsxs(lM,{children:[r.jsx(du,{onClick:()=>l.current?.xr.isPresenting?l.current.xr.getSession()?.end():null,children:l.current?.xr.isPresenting?"Выйти из VR":"Войти в VR"}),r.jsx(du,{onClick:t,children:"Назад к галерее"})]})]})},dM=se.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
`,uM=se.div`
  color: red;
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
`,hM=se.div`
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
`,fM=se.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
  position: relative;
`,pM=se.button`
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
`,mM=se.img`
  max-width: 100%;
  max-height: 400px;
  display: block;
  margin: 0 auto;
`,gM=()=>{const[n,e]=O.useState([]),[t,i]=O.useState(!0),[s,a]=O.useState(null),[l,o]=O.useState(null);O.useEffect(()=>{(async()=>{try{const p=await gt.get("http://localhost:5000/api/artworks");e(p.data)}catch(p){console.error("Ошибка при загрузке экспонатов:",p),a("Не удалось загрузить экспонаты")}finally{i(!1)}})()},[]);const c=f=>{o(f)},d=()=>{o(null)},u=()=>{window.history.back()};return t?r.jsx(dM,{children:"Загрузка виртуальной галереи..."}):s?r.jsx(uM,{children:s}):r.jsxs("div",{children:[r.jsx(cM,{artworks:n,onArtworkClick:c,onExitVR:u}),l&&r.jsx(hM,{onClick:d,children:r.jsxs(fM,{onClick:f=>f.stopPropagation(),children:[r.jsx(pM,{onClick:d,children:"×"}),r.jsx("h2",{children:l.title}),r.jsxs("p",{children:[r.jsx("strong",{children:"Художник:"})," ",l.artist_name]}),l.year_created&&r.jsxs("p",{children:[r.jsx("strong",{children:"Год создания:"})," ",l.year_created]}),l.medium&&r.jsxs("p",{children:[r.jsx("strong",{children:"Материал:"})," ",l.medium]}),l.style&&r.jsxs("p",{children:[r.jsx("strong",{children:"Стиль:"})," ",l.style]}),l.dimensions&&r.jsxs("p",{children:[r.jsx("strong",{children:"Размеры:"})," ",l.dimensions]}),l.description&&r.jsxs("p",{children:[r.jsx("strong",{children:"Описание:"})," ",l.description]}),l.image_url&&r.jsx(mM,{src:l.image_url,alt:l.title,onError:f=>{const p=f.target;p.src="https://placehold.co/600x400?text=Изображение+недоступно"}})]})})]})},xM=()=>{const[n]=O.useState([{id:"1",title:"Абстрактная композиция №1",artist:"Александр Петров",year:2020,description:"Экспериментальная работа, исследующая взаимодействие цвета и формы.",imageUrl:"/placeholder-artwork.jpg",tags:["абстракция","современное","краски"],likes:124,views:1240,rating:4.7,category:"Живопись",medium:"Масло"},{id:"2",title:"Городской пейзаж",artist:"Мария Иванова",year:2022,description:"Реалистичное изображение городской архитектуры в вечернем свете.",imageUrl:"/placeholder-artwork.jpg",tags:["пейзаж","реализм","город"],likes:89,views:890,rating:4.5,category:"Живопись",medium:"Акварель"},{id:"3",title:"Цифровая инсталляция",artist:"Анна Смирнова",year:2023,description:"Интерактивная инсталляция, реагирующая на движения посетителей.",imageUrl:"/placeholder-artwork.jpg",tags:["цифровое","инсталляция","интерактив"],likes:210,views:2100,rating:4.9,category:"Инсталляция",medium:"Цифровое"},{id:"4",title:"Портрет женщины",artist:"Дмитрий Козлов",year:2019,description:"Выразительный портрет, передающий внутреннее состояние модели.",imageUrl:"/placeholder-artwork.jpg",tags:["портрет","классическое","масло"],likes:156,views:1560,rating:4.6,category:"Портрет",medium:"Масло"},{id:"5",title:"Морской пейзаж",artist:"Елена Васильева",year:2021,description:"Романтичный образ морского побережья в разное время суток.",imageUrl:"/placeholder-artwork.jpg",tags:["пейзаж","романтизм","акварель"],likes:78,views:780,rating:4.3,category:"Пейзаж",medium:"Акварель"},{id:"6",title:"Геометрическая абстракция",artist:"Сергей Новиков",year:2023,description:"Современная интерпретация геометрических форм и линий.",imageUrl:"/placeholder-artwork.jpg",tags:["абстракция","геометрия","современное"],likes:95,views:950,rating:4.4,category:"Живопись",medium:"Акрил"}]),[e,t]=O.useState(""),[i,s]=O.useState("all"),[a,l]=O.useState("rating"),[o,c]=O.useState("grid"),[d,u]=O.useState("all"),[f,p]=O.useState("all"),x=n.filter(h=>{const b=h.title.toLowerCase().includes(e.toLowerCase())||h.artist.toLowerCase().includes(e.toLowerCase())||h.description.toLowerCase().includes(e.toLowerCase()),v=i==="all"||h.tags.includes(i),E=d==="all"||h.category===d,_=f==="all"||h.medium===f;return b&&v&&E&&_}).sort((h,b)=>a==="rating"?b.rating-h.rating:a==="likes"?b.likes-h.likes:a==="views"?b.views-h.views:a==="year"?b.year-h.year:a==="title"?h.title.localeCompare(b.title):0),y=Array.from(new Set(n.flatMap(h=>h.tags))),g=Array.from(new Set(n.map(h=>h.category))),m=Array.from(new Set(n.map(h=>h.medium)));return r.jsxs("div",{className:"container mx-auto px-4 py-8",children:[r.jsxs("div",{className:"mb-8 text-center",children:[r.jsx("h1",{className:"text-4xl font-bold mb-4",children:"Экспонаты галереи"}),r.jsx("p",{className:"text-xl text-muted-foreground max-w-2xl mx-auto",children:"Исследуйте разнообразные произведения искусства от талантливых художников со всего мира"})]}),r.jsxs("div",{className:"mb-8",children:[r.jsxs("div",{className:"flex flex-col md:flex-row gap-4 mb-6",children:[r.jsxs("div",{className:"flex-1 relative",children:[r.jsx(Hr,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"}),r.jsx("input",{placeholder:"Поиск экспонатов...",value:e,onChange:h=>t(h.target.value),className:"w-full pl-10 pr-4 py-2 border rounded-lg"})]}),r.jsxs("div",{className:"flex gap-2",children:[r.jsx(be,{variant:o==="grid"?"default":"outline",size:"sm",onClick:()=>c("grid"),children:r.jsx(Fu,{className:"h-4 w-4"})}),r.jsx(be,{variant:o==="list"?"default":"outline",size:"sm",onClick:()=>c("list"),children:r.jsx(zu,{className:"h-4 w-4"})})]})]}),r.jsxs("div",{className:"flex flex-wrap gap-4 mb-6",children:[r.jsxs("div",{className:"flex items-center gap-2",children:[r.jsx(Gu,{className:"h-4 w-4 text-muted-foreground"}),r.jsx("span",{className:"text-sm font-medium",children:"Фильтры:"})]}),r.jsxs("div",{className:"flex flex-wrap gap-2",children:[r.jsxs("select",{value:d,onChange:h=>u(h.target.value),className:"border rounded-lg px-3 py-1.5 text-sm",children:[r.jsx("option",{value:"all",children:"Все категории"}),g.map(h=>r.jsx("option",{value:h,children:h},h))]}),r.jsxs("select",{value:f,onChange:h=>p(h.target.value),className:"border rounded-lg px-3 py-1.5 text-sm",children:[r.jsx("option",{value:"all",children:"Все техники"}),m.map(h=>r.jsx("option",{value:h,children:h},h))]}),r.jsxs("select",{value:i,onChange:h=>s(h.target.value),className:"border rounded-lg px-3 py-1.5 text-sm",children:[r.jsx("option",{value:"all",children:"Все теги"}),y.map(h=>r.jsx("option",{value:h,children:h},h))]}),r.jsxs("select",{value:a,onChange:h=>l(h.target.value),className:"border rounded-lg px-3 py-1.5 text-sm",children:[r.jsx("option",{value:"rating",children:"По рейтингу"}),r.jsx("option",{value:"likes",children:"По популярности"}),r.jsx("option",{value:"views",children:"По просмотрам"}),r.jsx("option",{value:"year",children:"По году создания"}),r.jsx("option",{value:"title",children:"По названию"})]})]})]})]}),o==="grid"?r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:x.map(h=>r.jsxs(He,{className:"overflow-hidden flex flex-col h-full group",children:[r.jsxs("div",{className:"relative",children:[r.jsx("div",{className:"bg-muted aspect-square flex items-center justify-center",children:r.jsx("div",{className:"bg-gradient-to-br from-primary/10 to-secondary/10 w-full h-full flex items-center justify-center",children:r.jsxs("div",{className:"text-center p-8",children:[r.jsx("div",{className:"bg-primary/10 p-4 rounded-full inline-block mb-4",children:r.jsx(Dr,{className:"h-12 w-12 text-primary"})}),r.jsx("h3",{className:"text-xl font-bold",children:h.title}),r.jsx("p",{className:"text-muted-foreground",children:h.artist})]})})}),r.jsxs("div",{className:"absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity",children:[r.jsx(be,{size:"icon",variant:"secondary",className:"rounded-full h-8 w-8",children:r.jsx(un,{className:"h-4 w-4"})}),r.jsx(be,{size:"icon",variant:"secondary",className:"rounded-full h-8 w-8",children:r.jsx(Hu,{className:"h-4 w-4"})})]})]}),r.jsxs(Ge,{className:"pb-3",children:[r.jsx(Ve,{className:"text-lg",children:h.title}),r.jsxs("div",{className:"flex justify-between items-center",children:[r.jsxs(Xe,{children:["Автор: ",h.artist]}),r.jsxs("div",{className:"flex items-center",children:[r.jsx(Ot,{className:"h-4 w-4 fill-yellow-400 text-yellow-400 mr-1"}),r.jsx("span",{className:"text-sm",children:h.rating.toFixed(1)})]})]})]}),r.jsx(We,{className:"flex-grow",children:r.jsxs("div",{className:"space-y-3",children:[r.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[r.jsx(Fl,{className:"h-4 w-4 mr-2"}),r.jsx("span",{children:h.year})]}),r.jsx("p",{className:"text-sm text-muted-foreground line-clamp-2",children:h.description}),r.jsx("div",{className:"flex flex-wrap gap-2 mt-2",children:h.tags.map(b=>r.jsx(yt,{variant:"secondary",className:"text-xs",children:b},b))}),r.jsxs("div",{className:"flex justify-between text-sm mt-4 pt-4 border-t",children:[r.jsxs("div",{className:"flex items-center",children:[r.jsx(un,{className:"h-4 w-4 mr-1 text-red-500"}),r.jsx("span",{children:h.likes})]}),r.jsxs("div",{className:"flex items-center",children:[r.jsx(Tn,{className:"h-4 w-4 mr-1"}),r.jsx("span",{children:h.views})]}),r.jsxs(be,{variant:"outline",size:"sm",className:"text-xs",children:[r.jsx(Dr,{className:"h-3 w-3 mr-1"}),"Профиль художника"]})]}),r.jsxs(be,{className:"w-full mt-4",children:[r.jsx(Tn,{className:"h-4 w-4 mr-2"}),"Подробнее"]})]})})]},h.id))}):r.jsx("div",{className:"space-y-4",children:x.map(h=>r.jsxs(He,{className:"flex flex-col sm:flex-row",children:[r.jsx("div",{className:"bg-muted sm:w-48 aspect-square sm:aspect-auto flex items-center justify-center",children:r.jsx("div",{className:"bg-gradient-to-br from-primary/10 to-secondary/10 w-full h-full flex items-center justify-center",children:r.jsx(Dr,{className:"h-12 w-12 text-primary"})})}),r.jsxs("div",{className:"flex-1 flex flex-col",children:[r.jsx(Ge,{className:"pb-3 sm:pb-2",children:r.jsxs("div",{className:"flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2",children:[r.jsxs("div",{children:[r.jsx(Ve,{className:"text-xl",children:h.title}),r.jsxs(Xe,{children:["Автор: ",h.artist]})]}),r.jsxs("div",{className:"flex items-center",children:[r.jsx(Ot,{className:"h-4 w-4 fill-yellow-400 text-yellow-400 mr-1"}),r.jsx("span",{className:"text-sm",children:h.rating.toFixed(1)})]})]})}),r.jsxs(We,{className:"flex-1 flex flex-col sm:flex-row",children:[r.jsxs("div",{className:"sm:flex-1",children:[r.jsx("p",{className:"text-sm text-muted-foreground mb-3",children:h.description}),r.jsx("div",{className:"flex flex-wrap gap-2 mb-4",children:h.tags.map(b=>r.jsx(yt,{variant:"secondary",className:"text-xs",children:b},b))})]}),r.jsxs("div",{className:"flex flex-col justify-between sm:items-end",children:[r.jsxs("div",{className:"flex items-center text-sm text-muted-foreground mb-2",children:[r.jsx(Fl,{className:"h-4 w-4 mr-2"}),r.jsx("span",{children:h.year})]}),r.jsxs("div",{className:"flex gap-4",children:[r.jsxs("div",{className:"flex items-center",children:[r.jsx(un,{className:"h-4 w-4 mr-1 text-red-500"}),r.jsx("span",{children:h.likes})]}),r.jsxs("div",{className:"flex items-center",children:[r.jsx(Tn,{className:"h-4 w-4 mr-1"}),r.jsx("span",{children:h.views})]})]}),r.jsxs("div",{className:"flex gap-2 mt-4",children:[r.jsxs(be,{variant:"outline",size:"sm",children:[r.jsx(un,{className:"h-4 w-4 mr-2"}),"Нравится"]}),r.jsxs(be,{size:"sm",children:[r.jsx(Tn,{className:"h-4 w-4 mr-2"}),"Подробнее"]})]})]})]})]})]},h.id))}),x.length===0&&r.jsxs("div",{className:"text-center py-12",children:[r.jsx("div",{className:"bg-muted w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6",children:r.jsx(um,{className:"h-12 w-12 text-primary"})}),r.jsx("h3",{className:"text-xl font-semibold mb-2",children:"Экспонаты не найдены"}),r.jsx("p",{className:"text-muted-foreground mb-6",children:"Попробуйте изменить параметры поиска"}),r.jsx(be,{variant:"outline",onClick:()=>{t(""),s("all"),u("all"),p("all")},children:"Сбросить фильтры"})]}),x.length>0&&r.jsx("div",{className:"flex justify-center mt-12",children:r.jsxs("div",{className:"flex items-center gap-2",children:[r.jsx(be,{variant:"outline",size:"sm",children:"Предыдущая"}),r.jsx("div",{className:"flex gap-1",children:[1,2,3,4,5].map(h=>r.jsx(be,{variant:h===1?"default":"outline",size:"sm",className:"w-10",children:h},h))}),r.jsx(be,{variant:"outline",size:"sm",children:"Следующая"})]})})]})},vM=()=>{const[n]=O.useState([{id:"1",name:"Галерея современного искусства",description:"Коллекция современных произведений искусства от ведущих художников 21 века.",location:"Центральный район, ул. Искусств, 15",openingHours:"Ежедневно 10:00-20:00",visitorCount:12500,tags:["современное","экспериментальное","цифровое"],featured:!0,imageUrl:"/placeholder-gallery.jpg",rating:4.8,artworksCount:1240},{id:"2",name:"Классическая галерея",description:"Шедевры живописи и скульптуры от мастеров прошлых эпох.",location:"Исторический квартал, пр. Культуры, 42",openingHours:"Пн-Пт 9:00-18:00, Сб-Вс 10:00-17:00",visitorCount:8700,tags:["классическое","живопись","скульптура"],featured:!0,imageUrl:"/placeholder-gallery.jpg",rating:4.7,artworksCount:850},{id:"3",name:"Галерея цифрового искусства",description:"Инновационные работы, созданные с использованием цифровых технологий.",location:"Технопарк, здание 5, эт. 3",openingHours:"Круглосуточно",visitorCount:5400,tags:["цифровое","интерактивное","VR"],featured:!1,imageUrl:"/placeholder-gallery.jpg",rating:4.6,artworksCount:420},{id:"4",name:"Галерея народного искусства",description:"Традиционные ремесла и народные промыслы со всего мира.",location:"Этноквартал, ул. Ремесел, 7",openingHours:"Пн-Вс 11:00-19:00",visitorCount:3200,tags:["народное","ремесла","традиции"],featured:!1,imageUrl:"/placeholder-gallery.jpg",rating:4.5,artworksCount:680},{id:"5",name:"Музей импрессионизма",description:"Коллекция работ импрессионистов 19-го века.",location:"Парк культуры, ул. Художников, 25",openingHours:"Вт-Вс 10:00-18:00",visitorCount:7200,tags:["импрессионизм","19 век","франция"],featured:!0,imageUrl:"/placeholder-gallery.jpg",rating:4.9,artworksCount:320},{id:"6",name:"Современные инсталляции",description:"Интерактивные и мультимедийные инсталляции современных художников.",location:"Арт-квартал, ул. Инноваций, 8",openingHours:"Пн-Сб 12:00-21:00",visitorCount:4100,tags:["инсталляция","интерактив","цифровое"],featured:!1,imageUrl:"/placeholder-gallery.jpg",rating:4.4,artworksCount:150}]),[e,t]=O.useState(""),[i,s]=O.useState("all"),[a,l]=O.useState("rating"),[o,c]=O.useState("grid"),d=n.filter(f=>{const p=f.name.toLowerCase().includes(e.toLowerCase())||f.description.toLowerCase().includes(e.toLowerCase()),x=i==="all"||f.tags.includes(i);return p&&x}).sort((f,p)=>a==="rating"?p.rating-f.rating:a==="visitors"?p.visitorCount-f.visitorCount:a==="artworks"?p.artworksCount-f.artworksCount:a==="name"?f.name.localeCompare(p.name):0),u=Array.from(new Set(n.flatMap(f=>f.tags)));return r.jsxs("div",{className:"container mx-auto px-4 py-8",children:[r.jsxs("div",{className:"mb-8 text-center",children:[r.jsx("h1",{className:"text-4xl font-bold mb-4",children:"Виртуальные галереи"}),r.jsx("p",{className:"text-xl text-muted-foreground max-w-2xl mx-auto",children:"Исследуйте разнообразные коллекции искусства со всего мира в immersive 3D-окружении"})]}),r.jsxs("div",{className:"mb-8",children:[r.jsxs("div",{className:"flex flex-col md:flex-row gap-4 mb-6",children:[r.jsxs("div",{className:"flex-1 relative",children:[r.jsx(Hr,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"}),r.jsx("input",{placeholder:"Поиск галерей...",value:e,onChange:f=>t(f.target.value),className:"w-full pl-10 pr-4 py-2 border rounded-lg"})]}),r.jsxs("div",{className:"flex gap-2",children:[r.jsx(be,{variant:o==="grid"?"default":"outline",size:"sm",onClick:()=>c("grid"),children:r.jsx(Fu,{className:"h-4 w-4"})}),r.jsx(be,{variant:o==="list"?"default":"outline",size:"sm",onClick:()=>c("list"),children:r.jsx(zu,{className:"h-4 w-4"})})]})]}),r.jsxs("div",{className:"flex flex-wrap gap-4 mb-6",children:[r.jsxs("div",{className:"flex items-center gap-2",children:[r.jsx(Gu,{className:"h-4 w-4 text-muted-foreground"}),r.jsx("span",{className:"text-sm font-medium",children:"Фильтры:"})]}),r.jsxs("div",{className:"flex flex-wrap gap-2",children:[r.jsxs("select",{value:i,onChange:f=>s(f.target.value),className:"border rounded-lg px-3 py-1.5 text-sm",children:[r.jsx("option",{value:"all",children:"Все теги"}),u.map(f=>r.jsx("option",{value:f,children:f},f))]}),r.jsxs("select",{value:a,onChange:f=>l(f.target.value),className:"border rounded-lg px-3 py-1.5 text-sm",children:[r.jsx("option",{value:"rating",children:"По рейтингу"}),r.jsx("option",{value:"visitors",children:"По популярности"}),r.jsx("option",{value:"artworks",children:"По числу экспонатов"}),r.jsx("option",{value:"name",children:"По названию"})]})]})]})]}),o==="grid"?r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",children:d.map(f=>r.jsxs(He,{className:"overflow-hidden flex flex-col h-full group",children:[f.featured&&r.jsx("div",{className:"bg-primary text-primary-foreground text-center py-1 text-sm font-medium",children:"Рекомендуем"}),r.jsxs("div",{className:"relative",children:[r.jsx("div",{className:"bg-muted aspect-video flex items-center justify-center",children:r.jsx("div",{className:"bg-gradient-to-br from-primary/10 to-secondary/10 w-full h-full flex items-center justify-center",children:r.jsxs("div",{className:"text-center p-8",children:[r.jsx("div",{className:"bg-primary/10 p-4 rounded-full inline-block mb-4",children:r.jsx(nn,{className:"h-12 w-12 text-primary"})}),r.jsx("h3",{className:"text-xl font-bold",children:f.name}),r.jsx("p",{className:"text-muted-foreground",children:"Галерея"})]})})}),r.jsxs("div",{className:"absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity",children:[r.jsx(be,{size:"icon",variant:"secondary",className:"rounded-full h-8 w-8",children:r.jsx(un,{className:"h-4 w-4"})}),r.jsx(be,{size:"icon",variant:"secondary",className:"rounded-full h-8 w-8",children:r.jsx(Hu,{className:"h-4 w-4"})})]})]}),r.jsxs(Ge,{className:"pb-3",children:[r.jsxs("div",{className:"flex justify-between items-start",children:[r.jsx(Ve,{children:f.name}),r.jsxs(yt,{variant:"outline",className:"self-start",children:[f.visitorCount.toLocaleString()," посетителей"]})]}),r.jsx(Xe,{children:f.description})]}),r.jsx(We,{className:"flex-grow",children:r.jsxs("div",{className:"space-y-3",children:[r.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[r.jsx(Js,{className:"h-4 w-4 mr-2"}),r.jsx("span",{children:f.location})]}),r.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[r.jsx(si,{className:"h-4 w-4 mr-2"}),r.jsx("span",{children:f.openingHours})]}),r.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[r.jsx(nn,{className:"h-4 w-4 mr-2"}),r.jsxs("span",{children:[f.artworksCount," экспонатов"]})]}),r.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[r.jsx(Ot,{className:"h-4 w-4 fill-yellow-400 text-yellow-400 mr-1"}),r.jsxs("span",{children:[f.rating.toFixed(1)," (",f.visitorCount," оценок)"]})]}),r.jsx("div",{className:"flex flex-wrap gap-2 mt-4",children:f.tags.map(p=>r.jsx(yt,{variant:"secondary",children:p},p))}),r.jsxs("div",{className:"flex justify-between mt-4 pt-4 border-t",children:[r.jsxs("div",{className:"flex items-center",children:[r.jsx(Bn,{className:"h-4 w-4 mr-1 text-muted-foreground"}),r.jsx("span",{className:"text-sm",children:f.visitorCount.toLocaleString()})]}),r.jsxs("div",{className:"flex items-center",children:[r.jsx(Ot,{className:"h-4 w-4 fill-yellow-400 text-yellow-400 mr-1"}),r.jsx("span",{className:"text-sm",children:f.rating.toFixed(1)})]})]}),r.jsxs(be,{className:"w-full mt-4",children:[r.jsx(Tn,{className:"h-4 w-4 mr-2"}),"Посетить галерею"]})]})})]},f.id))}):r.jsx("div",{className:"space-y-6",children:d.map(f=>r.jsxs(He,{className:"flex flex-col sm:flex-row",children:[r.jsx("div",{className:"bg-muted sm:w-64 aspect-video sm:aspect-auto flex items-center justify-center",children:r.jsx("div",{className:"bg-gradient-to-br from-primary/10 to-secondary/10 w-full h-full flex items-center justify-center",children:r.jsx(nn,{className:"h-16 w-16 text-primary"})})}),r.jsxs("div",{className:"flex-1 flex flex-col",children:[r.jsx(Ge,{className:"pb-3 sm:pb-2",children:r.jsxs("div",{className:"flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2",children:[r.jsxs("div",{children:[r.jsxs("div",{className:"flex items-center gap-2",children:[r.jsx(Ve,{children:f.name}),f.featured&&r.jsx(yt,{variant:"default",children:"Рекомендуем"})]}),r.jsx(Xe,{children:f.description})]}),r.jsxs(yt,{variant:"outline",children:[f.visitorCount.toLocaleString()," посетителей"]})]})}),r.jsxs(We,{className:"flex-1 flex flex-col sm:flex-row",children:[r.jsxs("div",{className:"sm:flex-1",children:[r.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4",children:[r.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[r.jsx(Js,{className:"h-4 w-4 mr-2"}),r.jsx("span",{children:f.location})]}),r.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[r.jsx(si,{className:"h-4 w-4 mr-2"}),r.jsx("span",{children:f.openingHours})]}),r.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[r.jsx(nn,{className:"h-4 w-4 mr-2"}),r.jsxs("span",{children:[f.artworksCount," экспонатов"]})]}),r.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[r.jsx(Ot,{className:"h-4 w-4 fill-yellow-400 text-yellow-400 mr-1"}),r.jsxs("span",{children:[f.rating.toFixed(1)," (",f.visitorCount," оценок)"]})]})]}),r.jsx("div",{className:"flex flex-wrap gap-2 mb-4",children:f.tags.map(p=>r.jsx(yt,{variant:"secondary",className:"text-xs",children:p},p))})]}),r.jsxs("div",{className:"flex flex-col justify-between sm:items-end",children:[r.jsxs("div",{className:"flex gap-4 mb-4 sm:mb-0",children:[r.jsxs("div",{className:"flex items-center",children:[r.jsx(Bn,{className:"h-4 w-4 mr-1 text-muted-foreground"}),r.jsx("span",{className:"text-sm",children:f.visitorCount.toLocaleString()})]}),r.jsxs("div",{className:"flex items-center",children:[r.jsx(Ot,{className:"h-4 w-4 fill-yellow-400 text-yellow-400 mr-1"}),r.jsx("span",{className:"text-sm",children:f.rating.toFixed(1)})]})]}),r.jsxs(be,{className:"w-full sm:w-auto",children:[r.jsx(Tn,{className:"h-4 w-4 mr-2"}),"Посетить галерею"]})]})]})]})]},f.id))}),d.length===0&&r.jsxs("div",{className:"text-center py-12",children:[r.jsx("div",{className:"bg-muted w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6",children:r.jsx(nn,{className:"h-12 w-12 text-primary"})}),r.jsx("h3",{className:"text-xl font-semibold mb-2",children:"Галереи не найдены"}),r.jsx("p",{className:"text-muted-foreground mb-6",children:"Попробуйте изменить параметры поиска"}),r.jsx(be,{variant:"outline",onClick:()=>{t(""),s("all")},children:"Сбросить фильтры"})]}),d.length>0&&r.jsx("div",{className:"flex justify-center mt-12",children:r.jsxs("div",{className:"flex items-center gap-2",children:[r.jsx(be,{variant:"outline",size:"sm",children:"Предыдущая"}),r.jsx("div",{className:"flex gap-1",children:[1,2,3,4,5].map(f=>r.jsx(be,{variant:f===1?"default":"outline",size:"sm",className:"w-10",children:f},f))}),r.jsx(be,{variant:"outline",size:"sm",children:"Следующая"})]})})]})},yM=se.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`,_M=()=>r.jsxs(yM,{children:[r.jsx("h1",{children:"Виртуальные туры"}),r.jsx("p",{children:"Здесь будет отображаться информация о доступных виртуальных турах по галерее."})]}),bM=se.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`,wM=()=>r.jsxs(bM,{children:[r.jsx("h1",{children:"Коллекции"}),r.jsx("p",{children:"Здесь будет отображаться информация о различных коллекциях произведений искусства."})]}),SM=[{name:"The Metropolitan Museum of Art",city:"Нью-Йорк, США",description:"Более 490 000 произведений от древности до современности. Открытый API с доступом к изображениям в высоком разрешении.",url:"https://www.metmuseum.org/art/collection",domain:"metmuseum.org",color:"red",badge:"Open Access",badgeColor:"green",icon:"🏛"},{name:"Musée du Louvre",city:"Париж, Франция",description:"Крупнейший музей мира: более 380 000 экспонатов, включая Мону Лизу и Венеру Милосскую. Виртуальные туры по залам.",url:"https://www.louvre.fr/en/online-tours",domain:"louvre.fr",color:"amber",badge:"Virtual Tours",badgeColor:"amber",icon:"👑"},{name:"Государственный Эрмитаж",city:"Санкт-Петербург, Россия",description:"Более 3 миллионов экспонатов: от скифского золота до импрессионистов. Виртуальные экскурсии по залам Зимнего дворца.",url:"https://www.hermitagemuseum.org/wps/portal/hermitage/explore/collections",domain:"hermitagemuseum.org",color:"emerald",badge:"Virtual Tours",badgeColor:"emerald",icon:"🏰"},{name:"Rijksmuseum",city:"Амстердам, Нидерланды",description:"Более 700 000 объектов голландского и мирового искусства. Rijksstudio позволяет скачивать изображения бесплатно.",url:"https://www.rijksmuseum.nl/en/rijksstudio",domain:"rijksmuseum.nl",color:"orange",badge:"Open Access",badgeColor:"green",icon:"🖼"},{name:"The National Gallery",city:"Лондон, Великобритания",description:"Более 2 600 картин XIII-XX веков: Леонардо, Рембрандт, Тёрнер, Ван Гог. Детальные описания каждого полотна.",url:"https://www.nationalgallery.org.uk/paintings",domain:"nationalgallery.org.uk",color:"indigo",badge:"Free Access",badgeColor:"indigo",icon:"🎨"},{name:"Google Arts & Culture",city:"2 000+ музеев мира",description:"Единая платформа доступа к коллекциям тысяч музеев. Art Camera — сверхвысокое разрешение, виртуальные туры 360.",url:"https://artsandculture.google.com/",domain:"artsandculture.google.com",color:"purple",badge:"Open Access",badgeColor:"green",icon:"🔍"},{name:"ГМИИ им. А.С. Пушкина",city:"Москва, Россия",description:"Более 700 000 произведений: от египетских древностей до живописи Ренуара, Моне, Пикассо. Онлайн-каталог коллекций.",url:"https://www.pushkinmuseum.art/data/fonds/index.php?lang=en",domain:"pushkinmuseum.art",color:"rose",badge:"Online Catalog",badgeColor:"rose",icon:"🏛"},{name:"Galleria degli Uffizi",city:"Флоренция, Италия",description:"Шедевры итальянского Возрождения: Боттичелли, Рафаэль, Караваджо. Онлайн-выставки и детальные описания коллекций.",url:"https://www.uffizi.it/en/online-exhibitions",domain:"uffizi.it",color:"teal",badge:"Online Exhibitions",badgeColor:"teal",icon:"☀"},{name:"WikiArt",city:"Визуальная энциклопедия",description:"Более 250 000 произведений 3 600 художников. Удобный поиск по стилям, жанрам и эпохам с подробными описаниями.",url:"https://www.wikiart.org/",domain:"wikiart.org",color:"sky",badge:"Open Access",badgeColor:"green",icon:"🎨"}],EM=[{label:"Виды искусства",description:"Живопись, скульптура, графика, декоративное искусство",question:"Расскажи об основных направлениях в живописи",color:"purple",icon:"🎨"},{label:"Техники",description:"Масло, акварель, темпера, фреска, гравюра",question:"Какие техники живописи существуют?",color:"amber",icon:"🖌"},{label:"История",description:"От античности до современного искусства",question:"Расскажи об основных эпохах в истории искусства",color:"blue",icon:"📜"},{label:"Художники",description:"Биографии, стили и главные произведения мастеров",question:"Расскажи о великих художниках эпохи Возрождения",color:"green",icon:"👤"}],MM=["Что такое импрессионизм?","Техники Ван Гога"],Fs={purple:{bg:"bg-purple-100",text:"text-purple-600",border:"hover:border-purple-200",hover:"group-hover:bg-purple-200"},amber:{bg:"bg-amber-100",text:"text-amber-600",border:"hover:border-amber-200",hover:"group-hover:bg-amber-200"},blue:{bg:"bg-blue-100",text:"text-blue-600",border:"hover:border-blue-200",hover:"group-hover:bg-blue-200"},green:{bg:"bg-green-100",text:"text-green-600",border:"hover:border-green-200",hover:"group-hover:bg-green-200"},red:{bg:"bg-red-100",text:"text-red-600",border:"hover:border-red-300",hover:"group-hover:bg-red-200"},orange:{bg:"bg-orange-100",text:"text-orange-600",border:"hover:border-orange-300",hover:"group-hover:bg-orange-200"},indigo:{bg:"bg-indigo-100",text:"text-indigo-600",border:"hover:border-indigo-300",hover:"group-hover:bg-indigo-200"},rose:{bg:"bg-rose-100",text:"text-rose-600",border:"hover:border-rose-300",hover:"group-hover:bg-rose-200"},emerald:{bg:"bg-emerald-100",text:"text-emerald-600",border:"hover:border-emerald-300",hover:"group-hover:bg-emerald-200"},teal:{bg:"bg-teal-100",text:"text-teal-600",border:"hover:border-teal-300",hover:"group-hover:bg-teal-200"},sky:{bg:"bg-sky-100",text:"text-sky-600",border:"hover:border-sky-300",hover:"group-hover:bg-sky-200"}},TM={green:"bg-green-100 text-green-700",amber:"bg-amber-100 text-amber-700",emerald:"bg-emerald-100 text-emerald-700",indigo:"bg-indigo-100 text-indigo-700",rose:"bg-rose-100 text-rose-700",teal:"bg-teal-100 text-teal-700"};function Ro(){return new Date().toLocaleTimeString("ru",{hour:"2-digit",minute:"2-digit"})}const AM=()=>{const[n,e]=O.useState([{role:"assistant",text:"Здравствуйте! Я ваш AI-ассистент по искусству. Могу ответить на вопросы об истории искусства, техниках, художниках на основе загруженных документов.",time:"Только что"}]),[t,i]=O.useState(""),[s,a]=O.useState(!1),[l,o]=O.useState("checking"),[c,d]=O.useState(null),[u,f]=O.useState(!1),p=O.useRef(null);O.useEffect(()=>{x()},[]),O.useEffect(()=>{p.current?.scrollIntoView({behavior:"smooth"})},[n]);async function x(){try{const b=await(await fetch("/api/ai/health")).json();o(b.status==="connected"?"online":"demo")}catch{o("demo")}}async function y(h){const b=(h??t).trim();if(!b||s)return;i("");const v={role:"user",text:b,time:Ro()};e(E=>[...E,v]),a(!0);try{const _=await(await fetch("/api/ai/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:b})})).json(),T=_.reply??_.message??_.answer??"Ответ получен.";e(A=>[...A,{role:"assistant",text:T,time:Ro()}])}catch{e(E=>[...E,{role:"assistant",text:"AI-сервис недоступен. Попробуйте позже или используйте демо-режим.",time:Ro()}])}finally{a(!1)}}function g(h){f(!1),d({url:h.url,name:h.name})}function m(){d(null)}return r.jsxs("div",{className:"min-h-screen bg-gray-50 text-gray-900 -m-4 md:-m-6",children:[r.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16",children:[r.jsxs("div",{className:"text-center mb-10",children:[r.jsxs("div",{className:"inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4",children:[r.jsx("span",{children:"📖"}),"Энциклопедия искусства"]}),r.jsx("h1",{className:"text-4xl md:text-5xl font-bold text-gray-900 mb-4",children:"ArtWiki"}),r.jsx("p",{className:"text-gray-600 max-w-2xl mx-auto text-lg",children:"Ваш персональный гид в мире искусства. Задайте вопрос AI-ассистенту и получите ответ на основе обширной базы знаний."})]}),r.jsx("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4 mb-10",children:EM.map(h=>{const b=Fs[h.color]??Fs.purple;return r.jsxs("button",{onClick:()=>y(h.question),className:`bg-white/95 backdrop-blur-sm rounded-xl p-5 border border-gray-100 ${b.border} hover:shadow-md transition-all cursor-pointer group text-left`,children:[r.jsx("div",{className:`w-10 h-10 ${b.bg} rounded-lg flex items-center justify-center mb-3 ${b.hover} transition-colors`,children:r.jsx("span",{className:"text-xl",children:h.icon})}),r.jsx("h3",{className:"font-semibold text-gray-900 text-sm mb-1",children:h.label}),r.jsx("p",{className:"text-xs text-gray-500",children:h.description})]},h.label)})}),r.jsxs("div",{className:"max-w-2xl mx-auto mb-12",children:[r.jsxs("div",{className:"flex items-center gap-3 mb-6",children:[r.jsx("div",{className:"w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center",children:r.jsx("span",{className:"text-xl",children:"🤖"})}),r.jsx("h2",{className:"text-2xl font-semibold text-gray-900",children:"AI Ассистент"})]}),r.jsxs("div",{className:"bg-white/95 rounded-2xl shadow-xl border border-gray-100 overflow-hidden",children:[r.jsx("div",{className:"bg-gradient-to-r from-indigo-600 to-purple-600 p-4",children:r.jsxs("div",{className:"flex items-center gap-3",children:[r.jsx("div",{className:"w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center",children:r.jsx("span",{className:"text-xl",children:"🤖"})}),r.jsxs("div",{children:[r.jsx("h3",{className:"text-lg font-semibold text-white",children:"Art Assistant"}),r.jsx("p",{className:"text-white/70 text-xs",children:"Эксперт по истории искусства"})]}),r.jsxs("span",{className:`ml-auto px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 backdrop-blur-sm ${l==="online"?"bg-white/20 text-white":l==="demo"?"bg-amber-500/20 text-white":"bg-white/20 text-white"}`,children:[r.jsx("span",{className:`w-2 h-2 rounded-full ${l==="online"?"bg-green-400":l==="demo"?"bg-amber-400":"bg-gray-400 animate-pulse"}`}),l==="online"?"Онлайн":l==="demo"?"Демо-режим":"Проверка..."]})]})}),r.jsxs("div",{className:"h-80 overflow-y-auto p-4 space-y-4 bg-gray-50",children:[n.map((h,b)=>r.jsxs("div",{className:`flex gap-3 ${h.role==="user"?"flex-row-reverse":""}`,children:[h.role==="assistant"&&r.jsx("div",{className:"w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0",children:r.jsx("span",{className:"text-sm",children:"🤖"})}),r.jsxs("div",{className:`rounded-2xl p-3 max-w-[85%] shadow-sm ${h.role==="assistant"?"bg-white rounded-tl-none":"bg-indigo-600 text-white rounded-tr-none"}`,children:[r.jsx("p",{className:`text-sm ${h.role==="user"?"text-white":"text-gray-700"}`,children:h.text}),r.jsx("p",{className:`text-xs mt-2 ${h.role==="user"?"text-white/60":"text-gray-400"}`,children:h.time})]})]},b)),s&&r.jsxs("div",{className:"flex gap-3",children:[r.jsx("div",{className:"w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0",children:r.jsx("span",{className:"text-sm",children:"🤖"})}),r.jsx("div",{className:"bg-white rounded-2xl rounded-tl-none p-3 shadow-sm",children:r.jsxs("div",{className:"flex gap-1",children:[r.jsx("span",{className:"w-2 h-2 bg-gray-400 rounded-full animate-bounce",style:{animationDelay:"0ms"}}),r.jsx("span",{className:"w-2 h-2 bg-gray-400 rounded-full animate-bounce",style:{animationDelay:"150ms"}}),r.jsx("span",{className:"w-2 h-2 bg-gray-400 rounded-full animate-bounce",style:{animationDelay:"300ms"}})]})})]}),r.jsx("div",{ref:p})]}),r.jsxs("div",{className:"px-4 py-3 bg-white border-t border-gray-100",children:[r.jsx("p",{className:"text-xs text-gray-500 mb-2",children:"Быстрые вопросы:"}),r.jsx("div",{className:"flex flex-wrap gap-2",children:MM.map(h=>r.jsx("button",{onClick:()=>y(h),className:"text-xs bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 px-3 py-1.5 rounded-full transition-colors",children:h},h))})]}),r.jsx("div",{className:"p-4 bg-white border-t border-gray-100",children:r.jsxs("div",{className:"flex gap-3",children:[r.jsx("input",{type:"text",value:t,onChange:h=>i(h.target.value),onKeyDown:h=>{h.key==="Enter"&&y()},placeholder:"Спросите об искусстве...",className:"flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"}),r.jsx("button",{onClick:()=>y(),disabled:s||!t.trim(),className:"bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed",children:"➤"})]})})]})]}),r.jsxs("div",{children:[r.jsxs("div",{className:"text-center mb-8",children:[r.jsxs("div",{className:"inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-3",children:[r.jsx("span",{children:"🌐"}),"Мировые музеи и коллекции"]}),r.jsx("p",{className:"text-gray-600 max-w-xl mx-auto text-sm",children:"Открытые коллекции крупнейших музеев мира. Нажмите на карточку, чтобы открыть онлайн-коллекцию."})]}),r.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",children:SM.map(h=>{const b=Fs[h.color]??Fs.purple,v=TM[h.badgeColor]??"bg-green-100 text-green-700";return r.jsxs("button",{onClick:()=>g(h),className:`bg-white/95 rounded-xl p-5 border border-gray-100 ${b.border} hover:shadow-lg transition-all group text-left w-full`,children:[r.jsxs("div",{className:"flex items-center gap-3 mb-3",children:[r.jsx("div",{className:`w-10 h-10 ${b.bg} rounded-lg flex items-center justify-center ${b.hover} transition-colors`,children:r.jsx("span",{className:"text-lg",children:h.icon})}),r.jsxs("div",{children:[r.jsx("h4",{className:"font-semibold text-gray-900 text-sm",children:h.name}),r.jsx("p",{className:"text-xs text-gray-400",children:h.city})]})]}),r.jsx("p",{className:"text-sm text-gray-600 mb-3",children:h.description}),r.jsxs("div",{className:"flex items-center justify-between text-xs",children:[r.jsxs("span",{className:`${b.text} font-medium flex items-center gap-1`,children:["🔗 ",h.domain]}),r.jsx("span",{className:`${v} px-2 py-0.5 rounded-full`,children:h.badge})]})]},h.name)})})]})]}),c&&r.jsxs("div",{className:"fixed inset-0 z-50",children:[r.jsx("div",{className:"absolute inset-0 bg-black/60 backdrop-blur-sm",onClick:m}),r.jsxs("div",{className:"absolute inset-4 md:inset-8 lg:inset-12 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden",children:[r.jsxs("div",{className:"flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-50 flex-shrink-0",children:[r.jsxs("div",{className:"flex items-center gap-3",children:[r.jsx("div",{className:"w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center",children:r.jsx("span",{children:"🌐"})}),r.jsx("h3",{className:"font-semibold text-gray-900 text-sm md:text-base truncate",children:c.name})]}),r.jsxs("div",{className:"flex items-center gap-2 flex-shrink-0",children:[r.jsxs("a",{href:c.url,target:"_blank",rel:"noopener noreferrer",className:"text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 px-3 py-1.5 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors",children:["🔗 ",r.jsx("span",{className:"hidden sm:inline",children:"Открыть на сайте"})]}),r.jsx("button",{onClick:m,className:"w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors text-gray-500 hover:text-gray-700",children:"✕"})]})]}),r.jsxs("div",{className:"flex-1 relative",children:[!u&&r.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-gray-50",children:r.jsxs("div",{className:"text-center",children:[r.jsx("div",{className:"w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-3"}),r.jsx("p",{className:"text-sm text-gray-500",children:"Загрузка сайта музея..."})]})}),r.jsx("iframe",{src:c.url,className:"w-full h-full border-0",sandbox:"allow-same-origin allow-scripts allow-popups allow-forms allow-popups-to-escape-sandbox",allowFullScreen:!0,onLoad:()=>f(!0),title:c.name})]})]})]})]})},RM=[{value:"auto",label:"Автоопределение (AI)"},{value:"history",label:"История искусства"},{value:"technique",label:"Техники и материалы"},{value:"artist",label:"Биографии художников"},{value:"period",label:"Периоды и стили"}],CM=[{name:"Импрессионизм_история.pdf",daysAgo:"2 дня назад"},{name:"Техники_масляной_живописи.pdf",daysAgo:"5 дней назад"}],NM=()=>{const[n,e]=O.useState(null),[t,i]=O.useState("auto"),[s,a]=O.useState(!1),[l,o]=O.useState(!1),[c,d]=O.useState(CM),[u,f]=O.useState(null),p=O.useRef(null);function x(_,T){f({type:_,text:T}),setTimeout(()=>f(null),4e3)}function y(_){if(_.type!=="application/pdf"){x("error","Пожалуйста, выберите PDF файл");return}e(_)}function g(){e(null),p.current&&(p.current.value="")}const m=O.useCallback(_=>{_.preventDefault(),a(!1);const T=_.dataTransfer.files;T.length>0&&y(T[0])},[]),h=O.useCallback(_=>{_.preventDefault(),a(!0)},[]),b=O.useCallback(()=>{a(!1)},[]);async function v(){if(!n){x("warning","Пожалуйста, выберите PDF файл");return}o(!0);try{const _="doc_"+Date.now(),T=URL.createObjectURL(n),A=await fetch("/api/ai/process-pdf",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pdfUrl:T,documentId:_,category:t})}),L=await A.json();if(A.ok)x("success","Документ успешно отправлен на обработку! ID: "+_),d(w=>[{name:n.name,daysAgo:"Только что"},...w.slice(0,4)]),g();else{const w=L.hint?" Подсказка: "+L.hint:"";x("error","Ошибка: "+(L.error||"Неизвестная ошибка")+w)}}catch{x("warning","AI/ML сервис недоступен. В демо-режиме документы не обрабатываются.")}finally{o(!1)}}const E={success:"bg-green-600",error:"bg-red-600",warning:"bg-amber-500"};return r.jsxs("div",{className:"min-h-screen bg-gray-50 text-gray-900 -m-4 md:-m-6",children:[u&&r.jsxs("div",{className:`fixed top-4 right-4 z-50 flex items-center gap-3 px-5 py-3 rounded-xl text-white shadow-xl ${E[u.type]} transition-all`,children:[r.jsx("span",{children:u.type==="success"?"✓":u.type==="error"?"✕":"⚠"}),r.jsx("p",{className:"text-sm font-medium",children:u.text})]}),r.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16",children:r.jsxs("div",{className:"max-w-2xl mx-auto",children:[r.jsxs("div",{className:"text-center mb-12",children:[r.jsxs("div",{className:"inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4",children:[r.jsx("span",{children:"☁"}),"Управление знаниями"]}),r.jsx("h1",{className:"text-4xl md:text-5xl font-bold text-gray-900 mb-4",children:"RAG"}),r.jsx("p",{className:"text-gray-600 max-w-2xl mx-auto text-lg",children:"Загрузка и индексация документов для базы знаний AI-ассистента"})]}),r.jsxs("div",{children:[r.jsxs("div",{className:"flex items-center gap-3 mb-6",children:[r.jsx("div",{className:"w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center",children:r.jsx("span",{className:"text-xl",children:"📄"})}),r.jsx("h2",{className:"text-2xl font-semibold text-gray-900",children:"Обработка документов"})]}),r.jsxs("div",{className:"bg-white/95 rounded-2xl p-6 shadow-xl border border-gray-100",children:[r.jsxs("div",{onDrop:m,onDragOver:h,onDragLeave:b,onClick:()=>!n&&p.current?.click(),className:`border-2 border-dashed rounded-xl p-8 text-center transition-colors mb-6 ${n?"border-green-400 bg-green-50":s?"border-green-400 bg-green-50 cursor-copy":"border-gray-300 hover:border-green-400 cursor-pointer"}`,children:[n?r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4",children:r.jsx("span",{className:"text-3xl",children:"✅"})}),r.jsx("p",{className:"text-green-700 font-medium mb-2",children:n.name}),r.jsxs("p",{className:"text-sm text-gray-500",children:[(n.size/1024/1024).toFixed(2)," MB"]}),r.jsx("button",{onClick:_=>{_.stopPropagation(),g()},className:"mt-3 text-sm text-red-600 hover:text-red-700 underline",children:"Удалить"})]}):r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4",children:r.jsx("span",{className:"text-3xl",children:"📎"})}),r.jsx("p",{className:"text-gray-600 mb-2",children:"Перетащите PDF сюда"}),r.jsx("p",{className:"text-sm text-gray-500",children:"или нажмите для выбора файла"}),r.jsx("p",{className:"text-xs text-gray-400 mt-2",children:"PDF до 50MB"})]}),r.jsx("input",{ref:p,type:"file",accept:".pdf",className:"hidden",onChange:_=>{_.target.files?.[0]&&y(_.target.files[0])}})]}),r.jsxs("div",{className:"space-y-3 mb-6",children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Категория документа"}),r.jsx("select",{value:t,onChange:_=>i(_.target.value),className:"w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white",children:RM.map(_=>r.jsx("option",{value:_.value,children:_.label},_.value))})]}),r.jsxs("button",{onClick:v,disabled:l||!n,className:"w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",children:[r.jsx("span",{children:l?"⏳":"✅"}),r.jsx("span",{children:l?"Обработка...":"Обработать документ"})]}),r.jsxs("div",{className:"mt-6 pt-6 border-t border-gray-100",children:[r.jsx("h4",{className:"text-sm font-semibold text-gray-700 mb-3",children:"Недавние документы"}),r.jsx("div",{className:"space-y-2",children:c.map((_,T)=>r.jsxs("div",{className:"flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors",children:[r.jsx("span",{className:"text-green-600",children:"📄"}),r.jsx("span",{className:"text-sm text-gray-700 flex-1 truncate",children:_.name}),r.jsx("span",{className:"text-xs text-gray-400 whitespace-nowrap",children:_.daysAgo})]},T))})]})]})]})]})})]})},PM=[{icon:Qs,title:"Экспонаты",desc:"Более 10 000 произведений искусства от ведущих музеев мира. Изучайте детали, историю и технику исполнения.",color:"text-indigo-600 bg-indigo-50",link:"/artworks"},{icon:$p,title:"Виртуальные туры",desc:"Погрузитесь в интерактивные 3D-туры по знаменитым галереям в любой точке мира.",color:"text-purple-600 bg-purple-50",link:"/tours"},{icon:ga,title:"Аукцион",desc:"Торги за уникальные произведения искусства. Участвуйте и пополняйте свою коллекцию шедеврами.",color:"text-orange-600 bg-orange-50",link:"/auction"},{icon:Op,title:"ArtWiki",desc:"AI-ассистент и энциклопедия: история искусства, техники, художники, стили и направления.",color:"text-teal-600 bg-teal-50",link:"/artwiki"},{icon:Uu,title:"RAG — База знаний",desc:"Загружайте PDF-документы и индексируйте их для AI-ассистента. Расширяйте базу знаний платформы.",color:"text-green-600 bg-green-50",link:"/rag"},{icon:Bp,title:"Оцифровка",desc:"Загружайте и оцифровывайте произведения с AI-анализом: стиль, эпоха, техника, атрибуция.",color:"text-rose-600 bg-rose-50",link:"/staff"},{icon:ku,title:"Музеи мира",desc:"Интеграция с крупнейшими музеями: Метрополитен, Лувр, Эрмитаж, Уффици и другими.",color:"text-blue-600 bg-blue-50",link:"/artwiki"},{icon:Ot,title:"Персонализация",desc:"Создавайте персональные коллекции, маршруты и получайте AI-рекомендации.",color:"text-amber-600 bg-amber-50",link:"/collections"}],LM=[{name:"Администратор",desc:"Управление пользователями, контентом и настройками платформы"},{name:"Куратор",desc:"Создание виртуальных залов, расстановка экспонатов, AI-подбор произведений"},{name:"Сотрудник",desc:"Загрузка и оцифровка произведений, управление архивом"},{name:"Экскурсовод",desc:"Создание виртуальных туров и маршрутов по галерее"},{name:"Участник аукциона",desc:"Участие в торгах, отслеживание лотов"},{name:"Посетитель",desc:"Просмотр галерей, туры, использование ArtWiki и коллекций"}],jM=()=>r.jsxs("div",{className:"min-h-screen",children:[r.jsx("section",{className:"bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4",children:r.jsxs("div",{className:"max-w-4xl mx-auto text-center",children:[r.jsx("h1",{className:"text-4xl md:text-5xl font-bold mb-4",children:"О платформе"}),r.jsx("p",{className:"text-xl text-gray-300 max-w-2xl mx-auto",children:"Virtual Gallery — современная платформа для управления виртуальными художественными галереями с AI-возможностями и поддержкой VR."})]})}),r.jsxs("section",{className:"max-w-6xl mx-auto px-4 py-16",children:[r.jsxs("div",{className:"text-center mb-12",children:[r.jsx("h2",{className:"text-3xl font-bold text-gray-900 mb-3",children:"Возможности платформы"}),r.jsx("p",{className:"text-lg text-gray-500 max-w-2xl mx-auto",children:"Откройте для себя инновационные инструменты для изучения и взаимодействия с искусством"})]}),r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",children:PM.map(n=>r.jsxs(xn,{to:n.link,className:"group block bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition-all",children:[r.jsx("div",{className:`inline-flex p-3 rounded-lg ${n.color} mb-4`,children:r.jsx(n.icon,{className:"h-6 w-6"})}),r.jsx("h3",{className:"font-semibold text-gray-900 mb-2",children:n.title}),r.jsx("p",{className:"text-sm text-gray-500 leading-relaxed",children:n.desc}),r.jsxs("div",{className:"mt-4 flex items-center gap-1 text-sm font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity",children:["Перейти ",r.jsx(Du,{className:"h-3.5 w-3.5"})]})]},n.title))})]}),r.jsx("section",{className:"bg-gray-50 border-t border-gray-100 py-16 px-4",children:r.jsxs("div",{className:"max-w-4xl mx-auto",children:[r.jsxs("div",{className:"text-center mb-10",children:[r.jsx("h2",{className:"text-3xl font-bold text-gray-900 mb-3",children:"Роли пользователей"}),r.jsx("p",{className:"text-gray-500",children:"Платформа поддерживает гибкую систему ролей"})]}),r.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",children:LM.map(n=>r.jsxs("div",{className:"bg-white rounded-xl border border-gray-100 p-5 shadow-sm",children:[r.jsx("div",{className:"font-semibold text-gray-900 mb-1",children:n.name}),r.jsx("p",{className:"text-sm text-gray-500",children:n.desc})]},n.name))})]})}),r.jsxs("section",{className:"max-w-4xl mx-auto px-4 py-16",children:[r.jsx("div",{className:"text-center mb-10",children:r.jsx("h2",{className:"text-2xl font-bold text-gray-900 mb-3",children:"Технологии"})}),r.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3",children:["React + TypeScript","Node.js / Express","PostgreSQL","Redis","Three.js / WebXR","OpenAI GPT-4","Qdrant Vector DB","S3 Storage"].map(n=>r.jsx("div",{className:"bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 text-center font-medium",children:n},n))})]})]}),uu=[{title:"Галерея",path:"/galleries"},{title:"Аукцион",path:"/auction"},{title:"ArtWiki",path:"/artwiki"},{title:"RAG",path:"/rag"},{title:"О нас",path:"/about"}],DM={admin:[{title:"Галерея",path:"/galleries"},{title:"Аукцион",path:"/auction"},{title:"ArtWiki",path:"/artwiki"},{title:"RAG",path:"/rag"}],curator:[{title:"Галерея",path:"/galleries"},{title:"Аукцион",path:"/auction"},{title:"ArtWiki",path:"/artwiki"},{title:"RAG",path:"/rag"}],staff:[{title:"Главная",path:"/"},{title:"Галерея",path:"/galleries"},{title:"ArtWiki",path:"/artwiki"},{title:"RAG",path:"/rag"}],tour_guide:[{title:"Галерея",path:"/galleries"},{title:"Туры",path:"/tours"},{title:"ArtWiki",path:"/artwiki"}],auction_participant:[{title:"Галерея",path:"/galleries"},{title:"Аукцион",path:"/auction"},{title:"ArtWiki",path:"/artwiki"}]},hu={admin:"/admin",curator:"/curator",staff:"/staff",tour_guide:"/tour-guide",auction_participant:"/auction-participant"},IM=({currentUser:n,onLogout:e})=>{const[t,i]=O.useState(!1),s=Df(),a=o=>s.pathname===o,l=n?DM[n.role]??uu:uu;return r.jsxs("header",{className:"sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm",children:[r.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:r.jsxs("div",{className:"flex items-center justify-between h-14",children:[r.jsxs(xn,{to:"/",className:"flex items-center gap-2 shrink-0",children:[r.jsx("div",{className:"bg-indigo-100 p-1.5 rounded-lg",children:r.jsx(Qs,{className:"h-5 w-5 text-indigo-600"})}),r.jsxs("div",{className:"hidden sm:block",children:[r.jsx("div",{className:"text-sm font-bold text-gray-900 leading-none",children:"Virtual Gallery"}),r.jsx("div",{className:"text-xs text-gray-500 leading-none mt-0.5",children:"AI Powered"})]})]}),r.jsx("nav",{className:"hidden md:flex items-center gap-1",children:l.map(o=>r.jsx(xn,{to:o.path,className:`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${a(o.path)?"text-indigo-600 bg-indigo-50":"text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`,children:o.title},o.path))}),r.jsxs("div",{className:"flex items-center gap-2",children:[r.jsxs("div",{className:"hidden sm:block relative group",children:[r.jsxs("button",{className:"flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors px-2 py-1.5 rounded-md hover:bg-gray-50",children:[r.jsx(tm,{className:"h-4 w-4"}),n?n.username:"Дашборд",r.jsx(Iu,{className:"h-3 w-3"})]}),r.jsx("div",{className:"absolute right-0 top-full mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50",children:r.jsxs("div",{className:"p-1.5",children:[[{path:"/admin",label:"Администратор",sub:"Полное управление",icon:cm,color:"bg-indigo-100 text-indigo-600",hover:"hover:bg-indigo-50"},{path:"/curator",label:"Куратор",sub:"Коллекции и выставки",icon:Qs,color:"bg-purple-100 text-purple-600",hover:"hover:bg-purple-50"},{path:"/staff",label:"Сотрудник",sub:"Оцифровка и анализ",icon:Bn,color:"bg-green-100 text-green-600",hover:"hover:bg-green-50"},{path:"/auction-participant",label:"Участник аукциона",sub:"Торги и ставки",icon:ga,color:"bg-amber-100 text-amber-600",hover:"hover:bg-amber-50"},{path:"/login",label:"Пользователь",sub:"Просмотр галереи",icon:Dr,color:"bg-blue-100 text-blue-600",hover:"hover:bg-blue-50"}].map(o=>r.jsxs(xn,{to:o.path,className:`flex items-center gap-3 px-3 py-2 rounded-lg ${o.hover} transition-colors`,children:[r.jsx("div",{className:`w-8 h-8 rounded-lg flex items-center justify-center ${o.color}`,children:r.jsx(o.icon,{className:"h-4 w-4"})}),r.jsxs("div",{children:[r.jsx("div",{className:"text-sm font-medium text-gray-900",children:o.label}),r.jsx("div",{className:"text-xs text-gray-400",children:o.sub})]})]},o.path)),n&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"my-1 border-t border-gray-100"}),r.jsxs("button",{onClick:e,className:"w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-left",children:[r.jsx("div",{className:"w-8 h-8 rounded-lg flex items-center justify-center bg-red-100 text-red-600",children:r.jsx(nm,{className:"h-4 w-4"})}),r.jsxs("div",{children:[r.jsx("div",{className:"text-sm font-medium text-gray-900",children:"Выйти"}),r.jsx("div",{className:"text-xs text-gray-400",children:"Завершить сессию"})]})]})]})]})})]}),!n&&r.jsx(xn,{to:"/login",className:"flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors",children:"Войти"}),r.jsx("button",{className:"md:hidden p-1.5 rounded-md text-gray-600 hover:bg-gray-100",onClick:()=>i(o=>!o),children:t?r.jsx(mm,{className:"h-5 w-5"}):r.jsx(im,{className:"h-5 w-5"})})]})]})}),t&&r.jsxs("div",{className:"md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1",children:[l.map(o=>r.jsx(xn,{to:o.path,onClick:()=>i(!1),className:`block px-3 py-2 rounded-md text-sm font-medium ${a(o.path)?"text-indigo-600 bg-indigo-50":"text-gray-700 hover:bg-gray-100"}`,children:o.title},o.path)),n&&hu[n.role]&&r.jsx(xn,{to:hu[n.role],onClick:()=>i(!1),className:"block px-3 py-2 rounded-md text-sm font-medium text-indigo-600 bg-indigo-50",children:"Дашборд"})]})]})},UM=()=>r.jsx("footer",{className:"bg-gray-900 text-white py-10",children:r.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:r.jsxs("div",{className:"flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6",children:[r.jsxs("div",{children:[r.jsxs("div",{className:"flex items-center gap-3 mb-3",children:[r.jsx("div",{className:"w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg",children:r.jsx(Qs,{className:"h-5 w-5 text-white"})}),r.jsx("span",{className:"text-lg font-bold text-white",children:"Virtual Gallery Services"})]}),r.jsx("nav",{className:"flex flex-wrap gap-x-4 gap-y-1 mt-2",children:[{label:"Галерея",to:"/galleries"},{label:"Аукцион",to:"/auction"},{label:"ArtWiki",to:"/artwiki"},{label:"RAG",to:"/rag"},{label:"О нас",to:"/about"}].map(n=>r.jsx(xn,{to:n.to,className:"text-gray-400 hover:text-white text-sm transition-colors",children:n.label},n.to))})]}),r.jsxs("div",{className:"flex flex-col items-start sm:items-end gap-3",children:[r.jsxs("div",{className:"flex items-center gap-3",children:[r.jsx("a",{href:"#",className:"w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors",children:r.jsx(pm,{className:"h-5 w-5 text-gray-400"})}),r.jsx("a",{href:"#",className:"w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors",children:r.jsx(Qp,{className:"h-5 w-5 text-gray-400"})}),r.jsx("a",{href:"#",className:"w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors",children:r.jsx(gm,{className:"h-5 w-5 text-gray-400"})})]}),r.jsx("p",{className:"text-gray-500 text-sm",children:"© 2026 Virtual Art Gallery."})]})]})})}),OM=()=>{const[n,e]=O.useState(null);O.useEffect(()=>{const s=Gs(window.location.origin,{path:"/socket.io"});return localStorage.getItem("authToken"),()=>{s.close()}},[]);const t=s=>{e(s)},i=()=>{e(null),localStorage.removeItem("authToken")};return r.jsx(If,{children:r.jsxs("div",{className:"flex flex-col min-h-screen bg-background",children:[r.jsx(IM,{currentUser:n,onLogout:i}),r.jsx("div",{className:"flex flex-1",children:r.jsx("main",{className:"flex-1",children:r.jsxs(Uf,{children:[r.jsx(vt,{path:"/",element:r.jsx(ym,{})}),r.jsx(vt,{path:"/artworks",element:r.jsx(xM,{})}),r.jsx(vt,{path:"/artworks/:id",element:r.jsx(_v,{})}),r.jsx(vt,{path:"/vr-gallery",element:r.jsx(US,{})}),r.jsx(vt,{path:"/galleries",element:r.jsx(vM,{})}),r.jsx(vt,{path:"/galleries/:id",element:r.jsx(zS,{})}),r.jsx(vt,{path:"/rooms/:id",element:r.jsx(oE,{})}),r.jsx(vt,{path:"/galleries/:galleryId/rooms/manage",element:n?.role==="curator"||n?.role==="admin"?r.jsx(qS,{}):r.jsx(hn,{to:"/login"})}),r.jsx(vt,{path:"/staff-dashboard",element:n?.role==="staff"||n?.role==="admin"?r.jsx(jE,{}):r.jsx(hn,{to:"/login"})}),r.jsx(vt,{path:"/curator-review",element:n?.role==="curator"||n?.role==="admin"?r.jsx(FE,{}):r.jsx(hn,{to:"/login"})}),r.jsx(vt,{path:"/artwork-upload",element:n?.role==="admin"||n?.role==="curator"?r.jsx(sM,{}):r.jsx(hn,{to:"/login"})}),r.jsx(vt,{path:"/virtual-gallery",element:r.jsx(gM,{})}),r.jsx(vt,{path:"/tours",element:r.jsx(_M,{})}),r.jsx(vt,{path:"/collections",element:r.jsx(wM,{})}),r.jsx(vt,{path:"/artwiki",element:r.jsx(AM,{})}),r.jsx(vt,{path:"/rag",element:r.jsx(NM,{})}),r.jsx(vt,{path:"/about",element:r.jsx(jM,{})}),r.jsx(vt,{path:"/admin",element:n?.role==="admin"?r.jsx(ug,{}):r.jsx(hn,{to:"/login"})}),r.jsx(vt,{path:"/curator",element:n?.role==="curator"?r.jsx(hg,{}):r.jsx(hn,{to:"/login"})}),r.jsx(vt,{path:"/staff",element:n?.role==="staff"?r.jsx(fg,{}):r.jsx(hn,{to:"/login"})}),r.jsx(vt,{path:"/tour-guide",element:n?.role==="tour_guide"?r.jsx(pg,{}):r.jsx(hn,{to:"/login"})}),r.jsx(vt,{path:"/auction-participant",element:n?.role==="auction_participant"?r.jsx(mg,{}):r.jsx(hn,{to:"/login"})}),r.jsx(vt,{path:"/login",element:n?r.jsx(hn,{to:"/"}):r.jsx(l0,{onLogin:t})}),r.jsx(vt,{path:"/register",element:n?r.jsx(hn,{to:"/"}):r.jsx(c0,{onRegister:t})})]})})}),r.jsx(UM,{})]})})};Ff.createRoot(document.getElementById("root")).render(r.jsx(zr.StrictMode,{children:r.jsx(OM,{})}));
