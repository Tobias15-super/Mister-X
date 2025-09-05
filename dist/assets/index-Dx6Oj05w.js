(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();const af=()=>{};var $a={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wc={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k=function(n,e){if(!n)throw kn(e)},kn=function(n){return new Error("Firebase Database ("+Wc.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hc=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let i=n.charCodeAt(s);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&s+1<n.length&&(n.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++s)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},lf=function(n){const e=[];let t=0,s=0;for(;t<n.length;){const i=n[t++];if(i<128)e[s++]=String.fromCharCode(i);else if(i>191&&i<224){const r=n[t++];e[s++]=String.fromCharCode((i&31)<<6|r&63)}else if(i>239&&i<365){const r=n[t++],o=n[t++],a=n[t++],l=((i&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(l>>10)),e[s++]=String.fromCharCode(56320+(l&1023))}else{const r=n[t++],o=n[t++];e[s++]=String.fromCharCode((i&15)<<12|(r&63)<<6|o&63)}}return e.join("")},gi={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let i=0;i<n.length;i+=3){const r=n[i],o=i+1<n.length,a=o?n[i+1]:0,l=i+2<n.length,c=l?n[i+2]:0,u=r>>2,h=(r&3)<<4|a>>4;let d=(a&15)<<2|c>>6,g=c&63;l||(g=64,o||(d=64)),s.push(t[u],t[h],t[d],t[g])}return s.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Hc(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):lf(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<n.length;){const r=t[n.charAt(i++)],a=i<n.length?t[n.charAt(i)]:0;++i;const c=i<n.length?t[n.charAt(i)]:64;++i;const h=i<n.length?t[n.charAt(i)]:64;if(++i,r==null||a==null||c==null||h==null)throw new cf;const d=r<<2|a>>4;if(s.push(d),c!==64){const g=a<<4&240|c>>2;if(s.push(g),h!==64){const y=c<<6&192|h;s.push(y)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class cf extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Vc=function(n){const e=Hc(n);return gi.encodeByteArray(e,!0)},Bs=function(n){return Vc(n).replace(/\./g,"")},Mr=function(n){try{return gi.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uf(n){return qc(void 0,n)}function qc(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!hf(t)||(n[t]=qc(n[t],e[t]));return n}function hf(n){return n!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zc(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const df=()=>zc().__FIREBASE_DEFAULTS__,ff=()=>{if(typeof process>"u"||typeof $a>"u")return;const n=$a.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},pf=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Mr(n[1]);return e&&JSON.parse(e)},Kc=()=>{try{return af()||df()||ff()||pf()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},gf=n=>{var e,t;return(t=(e=Kc())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},Gc=n=>{const e=gf(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),s]:[e.substring(0,t),s]},Jc=()=>{var n;return(n=Kc())==null?void 0:n.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ve=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,s)=>{t?this.reject(t):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,s))}}};/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mi(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Yc(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qc(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},s=e||"demo-project",i=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${s}`,aud:s,iat:i,exp:i+3600,auth_time:i,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Bs(JSON.stringify(t)),Bs(JSON.stringify(o)),""].join(".")}const Bn={};function mf(){const n={prod:[],emulator:[]};for(const e of Object.keys(Bn))Bn[e]?n.emulator.push(e):n.prod.push(e);return n}function _f(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Fa=!1;function Xc(n,e){if(typeof window>"u"||typeof document>"u"||!mi(window.location.host)||Bn[n]===e||Bn[n]||Fa)return;Bn[n]=e;function t(d){return`__firebase__banner__${d}`}const s="__firebase__banner",r=mf().prod.length>0;function o(){const d=document.getElementById(s);d&&d.remove()}function a(d){d.style.display="flex",d.style.background="#7faaf0",d.style.position="fixed",d.style.bottom="5px",d.style.left="5px",d.style.padding=".5em",d.style.borderRadius="5px",d.style.alignItems="center"}function l(d,g){d.setAttribute("width","24"),d.setAttribute("id",g),d.setAttribute("height","24"),d.setAttribute("viewBox","0 0 24 24"),d.setAttribute("fill","none"),d.style.marginLeft="-6px"}function c(){const d=document.createElement("span");return d.style.cursor="pointer",d.style.marginLeft="16px",d.style.fontSize="24px",d.innerHTML=" &times;",d.onclick=()=>{Fa=!0,o()},d}function u(d,g){d.setAttribute("id",g),d.innerText="Learn more",d.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",d.setAttribute("target","__blank"),d.style.paddingLeft="5px",d.style.textDecoration="underline"}function h(){const d=_f(s),g=t("text"),y=document.getElementById(g)||document.createElement("span"),T=t("learnmore"),E=document.getElementById(T)||document.createElement("a"),P=t("preprendIcon"),D=document.getElementById(P)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(d.created){const I=d.element;a(I),u(E,T);const N=c();l(D,P),I.append(D,y,E,N),document.body.appendChild(I)}r?(y.innerText="Preview backend disconnected.",D.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(D.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,y.innerText="Preview backend running in this workspace."),y.setAttribute("id",g)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",h):h()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yf(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Zc(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(yf())}function wf(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function vf(){return Wc.NODE_ADMIN===!0}function _i(){try{return typeof indexedDB=="object"}catch{return!1}}function eu(){return new Promise((n,e)=>{try{let t=!0;const s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(s),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var r;e(((r=i.error)==null?void 0:r.message)||"")}}catch(t){e(t)}})}function bf(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ef="FirebaseError";class kt extends Error{constructor(e,t,s){super(t),this.code=e,this.customData=s,this.name=Ef,Object.setPrototypeOf(this,kt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,hs.prototype.create)}}class hs{constructor(e,t,s){this.service=e,this.serviceName=t,this.errors=s}create(e,...t){const s=t[0]||{},i=`${this.service}/${e}`,r=this.errors[e],o=r?Tf(r,s):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new kt(i,a,s)}}function Tf(n,e){return n.replace(Sf,(t,s)=>{const i=e[s];return i!=null?String(i):`<${s}?>`})}const Sf=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qn(n){return JSON.parse(n)}function se(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tu=function(n){let e={},t={},s={},i="";try{const r=n.split(".");e=Qn(Mr(r[0])||""),t=Qn(Mr(r[1])||""),i=r[2],s=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:s,signature:i}},kf=function(n){const e=tu(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},If=function(n){const e=tu(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function je(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function Vt(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function ja(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Us(n,e,t){const s={};for(const i in n)Object.prototype.hasOwnProperty.call(n,i)&&(s[i]=e.call(t,n[i],i,n));return s}function Ws(n,e){if(n===e)return!0;const t=Object.keys(n),s=Object.keys(e);for(const i of t){if(!s.includes(i))return!1;const r=n[i],o=e[i];if(Ba(r)&&Ba(o)){if(!Ws(r,o))return!1}else if(r!==o)return!1}for(const i of s)if(!t.includes(i))return!1;return!0}function Ba(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cf(n){const e=[];for(const[t,s]of Object.entries(n))Array.isArray(s)?s.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Af{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const s=this.W_;if(typeof e=="string")for(let h=0;h<16;h++)s[h]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let h=0;h<16;h++)s[h]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let h=16;h<80;h++){const d=s[h-3]^s[h-8]^s[h-14]^s[h-16];s[h]=(d<<1|d>>>31)&4294967295}let i=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,u;for(let h=0;h<80;h++){h<40?h<20?(c=a^r&(o^a),u=1518500249):(c=r^o^a,u=1859775393):h<60?(c=r&o|a&(r|o),u=2400959708):(c=r^o^a,u=3395469782);const d=(i<<5|i>>>27)+c+l+u+s[h]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=i,i=d}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const s=t-this.blockSize;let i=0;const r=this.buf_;let o=this.inbuf_;for(;i<t;){if(o===0)for(;i<=s;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<t;)if(r[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}else for(;i<t;)if(r[o]=e[i],++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=t&255,t/=256;this.compress_(this.buf_);let s=0;for(let i=0;i<5;i++)for(let r=24;r>=0;r-=8)e[s]=this.chain_[i]>>r&255,++s;return e}}function yi(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pf=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let i=n.charCodeAt(s);if(i>=55296&&i<=56319){const r=i-55296;s++,k(s<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(s)-56320;i=65536+(r<<10)+o}i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):i<65536?(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},wi=function(n){let e=0;for(let t=0;t<n.length;t++){const s=n.charCodeAt(t);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,t++):e+=3}return e};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rf=1e3,Of=2,Nf=4*60*60*1e3,xf=.5;function Df(n,e=Rf,t=Of){const s=e*Math.pow(t,n),i=Math.round(xf*s*(Math.random()-.5)*2);return Math.min(Nf,s+i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ye(n){return n&&n._delegate?n._delegate:n}class Te{constructor(e,t,s){this.name=e,this.instanceFactory=t,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lf{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const s=new Ve;if(this.instancesDeferred.set(t,s),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&s.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if($f(e))try{this.getOrInitializeService({instanceIdentifier:Nt})}catch{}for(const[t,s]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:i});s.resolve(r)}catch{}}}}clearInstance(e=Nt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Nt){return this.instances.has(e)}getOptions(e=Nt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:s,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);s===a&&o.resolve(i)}return i}onInit(e,t){const s=this.normalizeInstanceIdentifier(t),i=this.onInitCallbacks.get(s)??new Set;i.add(e),this.onInitCallbacks.set(s,i);const r=this.instances.get(s);return r&&e(r,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const s=this.onInitCallbacks.get(t);if(s)for(const i of s)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Mf(e),options:t}),this.instances.set(e,s),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=Nt){return this.component?this.component.multipleInstances?e:Nt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Mf(n){return n===Nt?void 0:n}function $f(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ff{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Lf(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var q;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(q||(q={}));const jf={debug:q.DEBUG,verbose:q.VERBOSE,info:q.INFO,warn:q.WARN,error:q.ERROR,silent:q.SILENT},Bf=q.INFO,Uf={[q.DEBUG]:"log",[q.VERBOSE]:"log",[q.INFO]:"info",[q.WARN]:"warn",[q.ERROR]:"error"},Wf=(n,e,...t)=>{if(e<n.logLevel)return;const s=new Date().toISOString(),i=Uf[e];if(i)console[i](`[${s}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class vi{constructor(e){this.name=e,this._logLevel=Bf,this._logHandler=Wf,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in q))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?jf[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,q.DEBUG,...e),this._logHandler(this,q.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,q.VERBOSE,...e),this._logHandler(this,q.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,q.INFO,...e),this._logHandler(this,q.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,q.WARN,...e),this._logHandler(this,q.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,q.ERROR,...e),this._logHandler(this,q.ERROR,...e)}}const Hf=(n,e)=>e.some(t=>n instanceof t);let Ua,Wa;function Vf(){return Ua||(Ua=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function qf(){return Wa||(Wa=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const nu=new WeakMap,$r=new WeakMap,su=new WeakMap,Zi=new WeakMap,So=new WeakMap;function zf(n){const e=new Promise((t,s)=>{const i=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(it(n.result)),i()},o=()=>{s(n.error),i()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&nu.set(t,n)}).catch(()=>{}),So.set(e,n),e}function Kf(n){if($r.has(n))return;const e=new Promise((t,s)=>{const i=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),i()},o=()=>{s(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});$r.set(n,e)}let Fr={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return $r.get(n);if(e==="objectStoreNames")return n.objectStoreNames||su.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return it(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Gf(n){Fr=n(Fr)}function Jf(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const s=n.call(er(this),e,...t);return su.set(s,e.sort?e.sort():[e]),it(s)}:qf().includes(n)?function(...e){return n.apply(er(this),e),it(nu.get(this))}:function(...e){return it(n.apply(er(this),e))}}function Yf(n){return typeof n=="function"?Jf(n):(n instanceof IDBTransaction&&Kf(n),Hf(n,Vf())?new Proxy(n,Fr):n)}function it(n){if(n instanceof IDBRequest)return zf(n);if(Zi.has(n))return Zi.get(n);const e=Yf(n);return e!==n&&(Zi.set(n,e),So.set(e,n)),e}const er=n=>So.get(n);function bi(n,e,{blocked:t,upgrade:s,blocking:i,terminated:r}={}){const o=indexedDB.open(n,e),a=it(o);return s&&o.addEventListener("upgradeneeded",l=>{s(it(o.result),l.oldVersion,l.newVersion,it(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),i&&l.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}function tr(n,{blocked:e}={}){const t=indexedDB.deleteDatabase(n);return e&&t.addEventListener("blocked",s=>e(s.oldVersion,s)),it(t).then(()=>{})}const Qf=["get","getKey","getAll","getAllKeys","count"],Xf=["put","add","delete","clear"],nr=new Map;function Ha(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(nr.get(e))return nr.get(e);const t=e.replace(/FromIndex$/,""),s=e!==t,i=Xf.includes(t);if(!(t in(s?IDBIndex:IDBObjectStore).prototype)||!(i||Qf.includes(t)))return;const r=async function(o,...a){const l=this.transaction(o,i?"readwrite":"readonly");let c=l.store;return s&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),i&&l.done]))[0]};return nr.set(e,r),r}Gf(n=>({...n,get:(e,t,s)=>Ha(e,t)||n.get(e,t,s),has:(e,t)=>!!Ha(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zf{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(ep(t)){const s=t.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(t=>t).join(" ")}}function ep(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const jr="@firebase/app",Va="0.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lt=new vi("@firebase/app"),tp="@firebase/app-compat",np="@firebase/analytics-compat",sp="@firebase/analytics",ip="@firebase/app-check-compat",rp="@firebase/app-check",op="@firebase/auth",ap="@firebase/auth-compat",lp="@firebase/database",cp="@firebase/data-connect",up="@firebase/database-compat",hp="@firebase/functions",dp="@firebase/functions-compat",fp="@firebase/installations",pp="@firebase/installations-compat",gp="@firebase/messaging",mp="@firebase/messaging-compat",_p="@firebase/performance",yp="@firebase/performance-compat",wp="@firebase/remote-config",vp="@firebase/remote-config-compat",bp="@firebase/storage",Ep="@firebase/storage-compat",Tp="@firebase/firestore",Sp="@firebase/ai",kp="@firebase/firestore-compat",Ip="firebase",Cp="12.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Br="[DEFAULT]",Ap={[jr]:"fire-core",[tp]:"fire-core-compat",[sp]:"fire-analytics",[np]:"fire-analytics-compat",[rp]:"fire-app-check",[ip]:"fire-app-check-compat",[op]:"fire-auth",[ap]:"fire-auth-compat",[lp]:"fire-rtdb",[cp]:"fire-data-connect",[up]:"fire-rtdb-compat",[hp]:"fire-fn",[dp]:"fire-fn-compat",[fp]:"fire-iid",[pp]:"fire-iid-compat",[gp]:"fire-fcm",[mp]:"fire-fcm-compat",[_p]:"fire-perf",[yp]:"fire-perf-compat",[wp]:"fire-rc",[vp]:"fire-rc-compat",[bp]:"fire-gcs",[Ep]:"fire-gcs-compat",[Tp]:"fire-fst",[kp]:"fire-fst-compat",[Sp]:"fire-vertex","fire-js":"fire-js",[Ip]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hs=new Map,Pp=new Map,Ur=new Map;function qa(n,e){try{n.container.addComponent(e)}catch(t){lt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Ae(n){const e=n.name;if(Ur.has(e))return lt.debug(`There were multiple attempts to register component ${e}.`),!1;Ur.set(e,n);for(const t of Hs.values())qa(t,n);for(const t of Pp.values())qa(t,n);return!0}function Zt(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function ko(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rp={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},mt=new hs("app","Firebase",Rp);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Op{constructor(e,t,s){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new Te("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw mt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Io=Cp;function iu(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const s={name:Br,automaticDataCollectionEnabled:!0,...e},i=s.name;if(typeof i!="string"||!i)throw mt.create("bad-app-name",{appName:String(i)});if(t||(t=Jc()),!t)throw mt.create("no-options");const r=Hs.get(i);if(r){if(Ws(t,r.options)&&Ws(s,r.config))return r;throw mt.create("duplicate-app",{appName:i})}const o=new Ff(i);for(const l of Ur.values())o.addComponent(l);const a=new Op(t,s,o);return Hs.set(i,a),a}function Ei(n=Br){const e=Hs.get(n);if(!e&&n===Br&&Jc())return iu();if(!e)throw mt.create("no-app",{appName:n});return e}function ge(n,e,t){let s=Ap[n]??n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),r=e.match(/\s|\//);if(i||r){const o=[`Unable to register library "${s}" with version "${e}":`];i&&o.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),lt.warn(o.join(" "));return}Ae(new Te(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Np="firebase-heartbeat-database",xp=1,Xn="firebase-heartbeat-store";let sr=null;function ru(){return sr||(sr=bi(Np,xp,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Xn)}catch(t){console.warn(t)}}}}).catch(n=>{throw mt.create("idb-open",{originalErrorMessage:n.message})})),sr}async function Dp(n){try{const t=(await ru()).transaction(Xn),s=await t.objectStore(Xn).get(ou(n));return await t.done,s}catch(e){if(e instanceof kt)lt.warn(e.message);else{const t=mt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});lt.warn(t.message)}}}async function za(n,e){try{const s=(await ru()).transaction(Xn,"readwrite");await s.objectStore(Xn).put(e,ou(n)),await s.done}catch(t){if(t instanceof kt)lt.warn(t.message);else{const s=mt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});lt.warn(s.message)}}}function ou(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lp=1024,Mp=30;class $p{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new jp(t),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Ka();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:i}),this._heartbeatsCache.heartbeats.length>Mp){const o=Bp(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){lt.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Ka(),{heartbeatsToSend:s,unsentEntries:i}=Fp(this._heartbeatsCache.heartbeats),r=Bs(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(t){return lt.warn(t),""}}}function Ka(){return new Date().toISOString().substring(0,10)}function Fp(n,e=Lp){const t=[];let s=n.slice();for(const i of n){const r=t.find(o=>o.agent===i.agent);if(r){if(r.dates.push(i.date),Ga(t)>e){r.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Ga(t)>e){t.pop();break}s=s.slice(1)}return{heartbeatsToSend:t,unsentEntries:s}}class jp{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return _i()?eu().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Dp(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return za(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return za(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Ga(n){return Bs(JSON.stringify({version:2,heartbeats:n})).length}function Bp(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let s=1;s<n.length;s++)n[s].date<t&&(t=n[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Up(n){Ae(new Te("platform-logger",e=>new Zf(e),"PRIVATE")),Ae(new Te("heartbeat",e=>new $p(e),"PRIVATE")),ge(jr,Va,n),ge(jr,Va,"esm2020"),ge("fire-js","")}Up("");var Wp="firebase",Hp="12.1.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ge(Wp,Hp,"app");var Ja=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var au;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(_,f){function m(){}m.prototype=f.prototype,_.D=f.prototype,_.prototype=new m,_.prototype.constructor=_,_.C=function(w,v,b){for(var p=Array(arguments.length-2),Pt=2;Pt<arguments.length;Pt++)p[Pt-2]=arguments[Pt];return f.prototype[v].apply(w,p)}}function t(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(s,t),s.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(_,f,m){m||(m=0);var w=Array(16);if(typeof f=="string")for(var v=0;16>v;++v)w[v]=f.charCodeAt(m++)|f.charCodeAt(m++)<<8|f.charCodeAt(m++)<<16|f.charCodeAt(m++)<<24;else for(v=0;16>v;++v)w[v]=f[m++]|f[m++]<<8|f[m++]<<16|f[m++]<<24;f=_.g[0],m=_.g[1],v=_.g[2];var b=_.g[3],p=f+(b^m&(v^b))+w[0]+3614090360&4294967295;f=m+(p<<7&4294967295|p>>>25),p=b+(v^f&(m^v))+w[1]+3905402710&4294967295,b=f+(p<<12&4294967295|p>>>20),p=v+(m^b&(f^m))+w[2]+606105819&4294967295,v=b+(p<<17&4294967295|p>>>15),p=m+(f^v&(b^f))+w[3]+3250441966&4294967295,m=v+(p<<22&4294967295|p>>>10),p=f+(b^m&(v^b))+w[4]+4118548399&4294967295,f=m+(p<<7&4294967295|p>>>25),p=b+(v^f&(m^v))+w[5]+1200080426&4294967295,b=f+(p<<12&4294967295|p>>>20),p=v+(m^b&(f^m))+w[6]+2821735955&4294967295,v=b+(p<<17&4294967295|p>>>15),p=m+(f^v&(b^f))+w[7]+4249261313&4294967295,m=v+(p<<22&4294967295|p>>>10),p=f+(b^m&(v^b))+w[8]+1770035416&4294967295,f=m+(p<<7&4294967295|p>>>25),p=b+(v^f&(m^v))+w[9]+2336552879&4294967295,b=f+(p<<12&4294967295|p>>>20),p=v+(m^b&(f^m))+w[10]+4294925233&4294967295,v=b+(p<<17&4294967295|p>>>15),p=m+(f^v&(b^f))+w[11]+2304563134&4294967295,m=v+(p<<22&4294967295|p>>>10),p=f+(b^m&(v^b))+w[12]+1804603682&4294967295,f=m+(p<<7&4294967295|p>>>25),p=b+(v^f&(m^v))+w[13]+4254626195&4294967295,b=f+(p<<12&4294967295|p>>>20),p=v+(m^b&(f^m))+w[14]+2792965006&4294967295,v=b+(p<<17&4294967295|p>>>15),p=m+(f^v&(b^f))+w[15]+1236535329&4294967295,m=v+(p<<22&4294967295|p>>>10),p=f+(v^b&(m^v))+w[1]+4129170786&4294967295,f=m+(p<<5&4294967295|p>>>27),p=b+(m^v&(f^m))+w[6]+3225465664&4294967295,b=f+(p<<9&4294967295|p>>>23),p=v+(f^m&(b^f))+w[11]+643717713&4294967295,v=b+(p<<14&4294967295|p>>>18),p=m+(b^f&(v^b))+w[0]+3921069994&4294967295,m=v+(p<<20&4294967295|p>>>12),p=f+(v^b&(m^v))+w[5]+3593408605&4294967295,f=m+(p<<5&4294967295|p>>>27),p=b+(m^v&(f^m))+w[10]+38016083&4294967295,b=f+(p<<9&4294967295|p>>>23),p=v+(f^m&(b^f))+w[15]+3634488961&4294967295,v=b+(p<<14&4294967295|p>>>18),p=m+(b^f&(v^b))+w[4]+3889429448&4294967295,m=v+(p<<20&4294967295|p>>>12),p=f+(v^b&(m^v))+w[9]+568446438&4294967295,f=m+(p<<5&4294967295|p>>>27),p=b+(m^v&(f^m))+w[14]+3275163606&4294967295,b=f+(p<<9&4294967295|p>>>23),p=v+(f^m&(b^f))+w[3]+4107603335&4294967295,v=b+(p<<14&4294967295|p>>>18),p=m+(b^f&(v^b))+w[8]+1163531501&4294967295,m=v+(p<<20&4294967295|p>>>12),p=f+(v^b&(m^v))+w[13]+2850285829&4294967295,f=m+(p<<5&4294967295|p>>>27),p=b+(m^v&(f^m))+w[2]+4243563512&4294967295,b=f+(p<<9&4294967295|p>>>23),p=v+(f^m&(b^f))+w[7]+1735328473&4294967295,v=b+(p<<14&4294967295|p>>>18),p=m+(b^f&(v^b))+w[12]+2368359562&4294967295,m=v+(p<<20&4294967295|p>>>12),p=f+(m^v^b)+w[5]+4294588738&4294967295,f=m+(p<<4&4294967295|p>>>28),p=b+(f^m^v)+w[8]+2272392833&4294967295,b=f+(p<<11&4294967295|p>>>21),p=v+(b^f^m)+w[11]+1839030562&4294967295,v=b+(p<<16&4294967295|p>>>16),p=m+(v^b^f)+w[14]+4259657740&4294967295,m=v+(p<<23&4294967295|p>>>9),p=f+(m^v^b)+w[1]+2763975236&4294967295,f=m+(p<<4&4294967295|p>>>28),p=b+(f^m^v)+w[4]+1272893353&4294967295,b=f+(p<<11&4294967295|p>>>21),p=v+(b^f^m)+w[7]+4139469664&4294967295,v=b+(p<<16&4294967295|p>>>16),p=m+(v^b^f)+w[10]+3200236656&4294967295,m=v+(p<<23&4294967295|p>>>9),p=f+(m^v^b)+w[13]+681279174&4294967295,f=m+(p<<4&4294967295|p>>>28),p=b+(f^m^v)+w[0]+3936430074&4294967295,b=f+(p<<11&4294967295|p>>>21),p=v+(b^f^m)+w[3]+3572445317&4294967295,v=b+(p<<16&4294967295|p>>>16),p=m+(v^b^f)+w[6]+76029189&4294967295,m=v+(p<<23&4294967295|p>>>9),p=f+(m^v^b)+w[9]+3654602809&4294967295,f=m+(p<<4&4294967295|p>>>28),p=b+(f^m^v)+w[12]+3873151461&4294967295,b=f+(p<<11&4294967295|p>>>21),p=v+(b^f^m)+w[15]+530742520&4294967295,v=b+(p<<16&4294967295|p>>>16),p=m+(v^b^f)+w[2]+3299628645&4294967295,m=v+(p<<23&4294967295|p>>>9),p=f+(v^(m|~b))+w[0]+4096336452&4294967295,f=m+(p<<6&4294967295|p>>>26),p=b+(m^(f|~v))+w[7]+1126891415&4294967295,b=f+(p<<10&4294967295|p>>>22),p=v+(f^(b|~m))+w[14]+2878612391&4294967295,v=b+(p<<15&4294967295|p>>>17),p=m+(b^(v|~f))+w[5]+4237533241&4294967295,m=v+(p<<21&4294967295|p>>>11),p=f+(v^(m|~b))+w[12]+1700485571&4294967295,f=m+(p<<6&4294967295|p>>>26),p=b+(m^(f|~v))+w[3]+2399980690&4294967295,b=f+(p<<10&4294967295|p>>>22),p=v+(f^(b|~m))+w[10]+4293915773&4294967295,v=b+(p<<15&4294967295|p>>>17),p=m+(b^(v|~f))+w[1]+2240044497&4294967295,m=v+(p<<21&4294967295|p>>>11),p=f+(v^(m|~b))+w[8]+1873313359&4294967295,f=m+(p<<6&4294967295|p>>>26),p=b+(m^(f|~v))+w[15]+4264355552&4294967295,b=f+(p<<10&4294967295|p>>>22),p=v+(f^(b|~m))+w[6]+2734768916&4294967295,v=b+(p<<15&4294967295|p>>>17),p=m+(b^(v|~f))+w[13]+1309151649&4294967295,m=v+(p<<21&4294967295|p>>>11),p=f+(v^(m|~b))+w[4]+4149444226&4294967295,f=m+(p<<6&4294967295|p>>>26),p=b+(m^(f|~v))+w[11]+3174756917&4294967295,b=f+(p<<10&4294967295|p>>>22),p=v+(f^(b|~m))+w[2]+718787259&4294967295,v=b+(p<<15&4294967295|p>>>17),p=m+(b^(v|~f))+w[9]+3951481745&4294967295,_.g[0]=_.g[0]+f&4294967295,_.g[1]=_.g[1]+(v+(p<<21&4294967295|p>>>11))&4294967295,_.g[2]=_.g[2]+v&4294967295,_.g[3]=_.g[3]+b&4294967295}s.prototype.u=function(_,f){f===void 0&&(f=_.length);for(var m=f-this.blockSize,w=this.B,v=this.h,b=0;b<f;){if(v==0)for(;b<=m;)i(this,_,b),b+=this.blockSize;if(typeof _=="string"){for(;b<f;)if(w[v++]=_.charCodeAt(b++),v==this.blockSize){i(this,w),v=0;break}}else for(;b<f;)if(w[v++]=_[b++],v==this.blockSize){i(this,w),v=0;break}}this.h=v,this.o+=f},s.prototype.v=function(){var _=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);_[0]=128;for(var f=1;f<_.length-8;++f)_[f]=0;var m=8*this.o;for(f=_.length-8;f<_.length;++f)_[f]=m&255,m/=256;for(this.u(_),_=Array(16),f=m=0;4>f;++f)for(var w=0;32>w;w+=8)_[m++]=this.g[f]>>>w&255;return _};function r(_,f){var m=a;return Object.prototype.hasOwnProperty.call(m,_)?m[_]:m[_]=f(_)}function o(_,f){this.h=f;for(var m=[],w=!0,v=_.length-1;0<=v;v--){var b=_[v]|0;w&&b==f||(m[v]=b,w=!1)}this.g=m}var a={};function l(_){return-128<=_&&128>_?r(_,function(f){return new o([f|0],0>f?-1:0)}):new o([_|0],0>_?-1:0)}function c(_){if(isNaN(_)||!isFinite(_))return h;if(0>_)return E(c(-_));for(var f=[],m=1,w=0;_>=m;w++)f[w]=_/m|0,m*=4294967296;return new o(f,0)}function u(_,f){if(_.length==0)throw Error("number format error: empty string");if(f=f||10,2>f||36<f)throw Error("radix out of range: "+f);if(_.charAt(0)=="-")return E(u(_.substring(1),f));if(0<=_.indexOf("-"))throw Error('number format error: interior "-" character');for(var m=c(Math.pow(f,8)),w=h,v=0;v<_.length;v+=8){var b=Math.min(8,_.length-v),p=parseInt(_.substring(v,v+b),f);8>b?(b=c(Math.pow(f,b)),w=w.j(b).add(c(p))):(w=w.j(m),w=w.add(c(p)))}return w}var h=l(0),d=l(1),g=l(16777216);n=o.prototype,n.m=function(){if(T(this))return-E(this).m();for(var _=0,f=1,m=0;m<this.g.length;m++){var w=this.i(m);_+=(0<=w?w:4294967296+w)*f,f*=4294967296}return _},n.toString=function(_){if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(y(this))return"0";if(T(this))return"-"+E(this).toString(_);for(var f=c(Math.pow(_,6)),m=this,w="";;){var v=N(m,f).g;m=P(m,v.j(f));var b=((0<m.g.length?m.g[0]:m.h)>>>0).toString(_);if(m=v,y(m))return b+w;for(;6>b.length;)b="0"+b;w=b+w}},n.i=function(_){return 0>_?0:_<this.g.length?this.g[_]:this.h};function y(_){if(_.h!=0)return!1;for(var f=0;f<_.g.length;f++)if(_.g[f]!=0)return!1;return!0}function T(_){return _.h==-1}n.l=function(_){return _=P(this,_),T(_)?-1:y(_)?0:1};function E(_){for(var f=_.g.length,m=[],w=0;w<f;w++)m[w]=~_.g[w];return new o(m,~_.h).add(d)}n.abs=function(){return T(this)?E(this):this},n.add=function(_){for(var f=Math.max(this.g.length,_.g.length),m=[],w=0,v=0;v<=f;v++){var b=w+(this.i(v)&65535)+(_.i(v)&65535),p=(b>>>16)+(this.i(v)>>>16)+(_.i(v)>>>16);w=p>>>16,b&=65535,p&=65535,m[v]=p<<16|b}return new o(m,m[m.length-1]&-2147483648?-1:0)};function P(_,f){return _.add(E(f))}n.j=function(_){if(y(this)||y(_))return h;if(T(this))return T(_)?E(this).j(E(_)):E(E(this).j(_));if(T(_))return E(this.j(E(_)));if(0>this.l(g)&&0>_.l(g))return c(this.m()*_.m());for(var f=this.g.length+_.g.length,m=[],w=0;w<2*f;w++)m[w]=0;for(w=0;w<this.g.length;w++)for(var v=0;v<_.g.length;v++){var b=this.i(w)>>>16,p=this.i(w)&65535,Pt=_.i(v)>>>16,Ma=_.i(v)&65535;m[2*w+2*v]+=p*Ma,D(m,2*w+2*v),m[2*w+2*v+1]+=b*Ma,D(m,2*w+2*v+1),m[2*w+2*v+1]+=p*Pt,D(m,2*w+2*v+1),m[2*w+2*v+2]+=b*Pt,D(m,2*w+2*v+2)}for(w=0;w<f;w++)m[w]=m[2*w+1]<<16|m[2*w];for(w=f;w<2*f;w++)m[w]=0;return new o(m,0)};function D(_,f){for(;(_[f]&65535)!=_[f];)_[f+1]+=_[f]>>>16,_[f]&=65535,f++}function I(_,f){this.g=_,this.h=f}function N(_,f){if(y(f))throw Error("division by zero");if(y(_))return new I(h,h);if(T(_))return f=N(E(_),f),new I(E(f.g),E(f.h));if(T(f))return f=N(_,E(f)),new I(E(f.g),f.h);if(30<_.g.length){if(T(_)||T(f))throw Error("slowDivide_ only works with positive integers.");for(var m=d,w=f;0>=w.l(_);)m=z(m),w=z(w);var v=B(m,1),b=B(w,1);for(w=B(w,2),m=B(m,2);!y(w);){var p=b.add(w);0>=p.l(_)&&(v=v.add(m),b=p),w=B(w,1),m=B(m,1)}return f=P(_,v.j(f)),new I(v,f)}for(v=h;0<=_.l(f);){for(m=Math.max(1,Math.floor(_.m()/f.m())),w=Math.ceil(Math.log(m)/Math.LN2),w=48>=w?1:Math.pow(2,w-48),b=c(m),p=b.j(f);T(p)||0<p.l(_);)m-=w,b=c(m),p=b.j(f);y(b)&&(b=d),v=v.add(b),_=P(_,p)}return new I(v,_)}n.A=function(_){return N(this,_).h},n.and=function(_){for(var f=Math.max(this.g.length,_.g.length),m=[],w=0;w<f;w++)m[w]=this.i(w)&_.i(w);return new o(m,this.h&_.h)},n.or=function(_){for(var f=Math.max(this.g.length,_.g.length),m=[],w=0;w<f;w++)m[w]=this.i(w)|_.i(w);return new o(m,this.h|_.h)},n.xor=function(_){for(var f=Math.max(this.g.length,_.g.length),m=[],w=0;w<f;w++)m[w]=this.i(w)^_.i(w);return new o(m,this.h^_.h)};function z(_){for(var f=_.g.length+1,m=[],w=0;w<f;w++)m[w]=_.i(w)<<1|_.i(w-1)>>>31;return new o(m,_.h)}function B(_,f){var m=f>>5;f%=32;for(var w=_.g.length-m,v=[],b=0;b<w;b++)v[b]=0<f?_.i(b+m)>>>f|_.i(b+m+1)<<32-f:_.i(b+m);return new o(v,_.h)}s.prototype.digest=s.prototype.v,s.prototype.reset=s.prototype.s,s.prototype.update=s.prototype.u,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=c,o.fromString=u,au=o}).apply(typeof Ja<"u"?Ja:typeof self<"u"?self:typeof window<"u"?window:{});const Ya="4.9.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ke.UNAUTHENTICATED=new ke(null),ke.GOOGLE_CREDENTIALS=new ke("google-credentials-uid"),ke.FIRST_PARTY=new ke("first-party-uid"),ke.MOCK_USER=new ke("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ti="12.0.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vs=new vi("@firebase/firestore");function Vp(n,...e){if(Vs.logLevel<=q.DEBUG){const t=e.map(lu);Vs.debug(`Firestore (${Ti}): ${n}`,...t)}}function qp(n,...e){if(Vs.logLevel<=q.ERROR){const t=e.map(lu);Vs.error(`Firestore (${Ti}): ${n}`,...t)}}function lu(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qa(n,e,t){let s="Unexpected state";typeof e=="string"?s=e:t=e,cu(n,s,t)}function cu(n,e,t){let s=`FIRESTORE (${Ti}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{s+=" CONTEXT: "+JSON.stringify(t)}catch{s+=" CONTEXT: "+t}throw qp(s),new Error(s)}function uu(n,e,t,s){let i="Unexpected state";typeof t=="string"?i=t:s=t,n||cu(e,i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ne="invalid-argument",Xa="failed-precondition";class X extends kt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zp{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Kp{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(ke.UNAUTHENTICATED))}shutdown(){}}class Gp{constructor(e){this.auth=null,e.onInit(t=>{this.auth=t})}getToken(){return this.auth?this.auth.getToken().then(e=>e?(uu(typeof e.accessToken=="string",42297,{t:e}),new zp(e.accessToken,new ke(this.auth.getUid()))):null):Promise.resolve(null)}invalidateToken(){}start(e,t){}shutdown(){}}class Jp{constructor(e,t,s){this.i=e,this.o=t,this.u=s,this.type="FirstParty",this.user=ke.FIRST_PARTY,this.l=new Map}h(){return this.u?this.u():null}get headers(){this.l.set("X-Goog-AuthUser",this.i);const e=this.h();return e&&this.l.set("Authorization",e),this.o&&this.l.set("X-Goog-Iam-Authorization-Token",this.o),this.l}}class Yp{constructor(e,t,s){this.i=e,this.o=t,this.u=s}getToken(){return Promise.resolve(new Jp(this.i,this.o,this.u))}start(e,t){e.enqueueRetryable(()=>t(ke.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Za{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Qp{constructor(e,t){this.m=t,this.appCheck=null,this.T=null,ko(e)&&e.settings.appCheckToken&&(this.T=e.settings.appCheckToken),t.onInit(s=>{this.appCheck=s})}getToken(){return this.T?Promise.resolve(new Za(this.T)):this.appCheck?this.appCheck.getToken().then(e=>e?(uu(typeof e.token=="string",3470,{tokenResult:e}),new Za(e.token)):null):Promise.resolve(null)}invalidateToken(){}start(e,t){}shutdown(){}}const el="(default)";class qs{constructor(e,t){this.projectId=e,this.database=t||el}static empty(){return new qs("","")}get isDefaultDatabase(){return this.database===el}isEqual(e){return e instanceof qs&&e.projectId===this.projectId&&e.database===this.database}}function vt(n,e){return n<e?-1:n>e?1:0}function Xp(n,e){const t=Math.min(n.length,e.length);for(let s=0;s<t;s++){const i=n.charAt(s),r=e.charAt(s);if(i!==r)return ir(i)===ir(r)?vt(i,r):ir(i)?1:-1}return vt(n.length,e.length)}const Zp=55296,eg=57343;function ir(n){const e=n.charCodeAt(0);return e>=Zp&&e<=eg}class Ye{constructor(e,t,s){t===void 0?t=0:t>e.length&&Qa(637,{offset:t,range:e.length}),s===void 0?s=e.length-t:s>e.length-t&&Qa(1746,{length:s,range:e.length-t}),this.segments=e,this.offset=t,this.len=s}get length(){return this.len}isEqual(e){return Ye.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Ye?e.forEach(s=>{t.push(s)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,s=this.limit();t<s;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const s=Math.min(e.length,t.length);for(let i=0;i<s;i++){const r=Ye.compareSegments(e.get(i),t.get(i));if(r!==0)return r}return vt(e.length,t.length)}static compareSegments(e,t){const s=Ye.isNumericId(e),i=Ye.isNumericId(t);return s&&!i?-1:!s&&i?1:s&&i?Ye.extractNumericId(e).compare(Ye.extractNumericId(t)):Xp(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return au.fromString(e.substring(4,e.length-2))}}class xe extends Ye{construct(e,t,s){return new xe(e,t,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const s of e){if(s.indexOf("//")>=0)throw new X(ne,`Invalid segment (${s}). Paths must not contain // in them.`);t.push(...s.split("/").filter(i=>i.length>0))}return new xe(t)}static emptyPath(){return new xe([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt{constructor(e){this.path=e}static fromPath(e){return new Mt(xe.fromString(e))}static fromName(e){return new Mt(xe.fromString(e).popFirst(5))}static empty(){return new Mt(xe.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&xe.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return xe.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new Mt(new xe(e.slice()))}}function tg(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ng(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var tl,U;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(U=tl||(tl={}))[U.OK=0]="OK",U[U.CANCELLED=1]="CANCELLED",U[U.UNKNOWN=2]="UNKNOWN",U[U.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",U[U.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",U[U.NOT_FOUND=5]="NOT_FOUND",U[U.ALREADY_EXISTS=6]="ALREADY_EXISTS",U[U.PERMISSION_DENIED=7]="PERMISSION_DENIED",U[U.UNAUTHENTICATED=16]="UNAUTHENTICATED",U[U.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",U[U.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",U[U.ABORTED=10]="ABORTED",U[U.OUT_OF_RANGE=11]="OUT_OF_RANGE",U[U.UNIMPLEMENTED=12]="UNIMPLEMENTED",U[U.INTERNAL=13]="INTERNAL",U[U.UNAVAILABLE=14]="UNAVAILABLE",U[U.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sg extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(r){throw typeof DOMException<"u"&&r instanceof DOMException?new sg("Invalid base64 string: "+r):r}}(e);return new qt(t)}static fromUint8Array(e){const t=function(i){let r="";for(let o=0;o<i.length;++o)r+=String.fromCharCode(i[o]);return r}(e);return new qt(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const s=new Uint8Array(t.length);for(let i=0;i<t.length;i++)s[i]=t.charCodeAt(i);return s}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return vt(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}qt.EMPTY_BYTE_STRING=new qt("");/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ce(n,e){const t={typeString:n};return e&&(t.value=e),t}function ds(n,e){if(!tg(n))throw new X(ne,"JSON must be an object");let t;for(const s in e)if(e[s]){const i=e[s].typeString,r="value"in e[s]?{value:e[s].value}:void 0;if(!(s in n)){t=`JSON missing required field: '${s}'`;break}const o=n[s];if(i&&typeof o!==i){t=`JSON field '${s}' must be a ${i}.`;break}if(r!==void 0&&o!==r.value){t=`Expected '${s}' field to equal '${r.value}'`;break}}if(t)throw new X(ne,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nl=-62135596800,sl=1e6;class Be{static now(){return Be.fromMillis(Date.now())}static fromDate(e){return Be.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),s=Math.floor((e-1e3*t)*sl);return new Be(t,s)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new X(ne,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new X(ne,"Timestamp nanoseconds out of range: "+t);if(e<nl)throw new X(ne,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new X(ne,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/sl}_compareTo(e){return this.seconds===e.seconds?vt(this.nanoseconds,e.nanoseconds):vt(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Be._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(ds(e,Be._jsonSchema))return new Be(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-nl;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Be._jsonSchemaVersion="firestore/timestamp/1.0",Be._jsonSchema={type:Ce("string",Be._jsonSchemaVersion),seconds:Ce("number"),nanoseconds:Ce("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ig{constructor(e,t=null,s=[],i=[],r=null,o="F",a=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=s,this.filters=i,this.limit=r,this.limitType=o,this.startAt=a,this.endAt=l,this.q=null,this.B=null,this.$=null,this.startAt,this.endAt}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rg="ComponentProvider",il=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const og=1048576,ag="firestore.googleapis.com",rl=!0;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ol{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new X(ne,"Can't provide ssl option if host option is not set");this.host=ag,this.ssl=rl}else this.host=e.host,this.ssl=e.ssl??rl;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<og)throw new X(ne,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}(function(s,i,r,o){if(i===!0&&o===!0)throw new X(ne,`${s} and ${r} cannot be used together.`)})("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=ng(e.experimentalLongPollingOptions??{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new X(ne,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new X(ne,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new X(ne,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(s,i){return s.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class lg{constructor(e,t,s,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=s,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ol({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new X(Xa,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new X(Xa,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ol(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(s){if(!s)return new Kp;switch(s.type){case"firstParty":return new Yp(s.sessionIndex||"0",s.iamToken||null,s.authTokenFactory||null);case"provider":return s.client;default:throw new X(ne,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const s=il.get(t);s&&(Vp(rg,"Removing Datastore"),il.delete(t),s.terminate())}(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Co{constructor(e,t,s){this.converter=t,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new Co(this.firestore,e,this._query)}}class tt{constructor(e,t,s){this.converter=t,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ao(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new tt(this.firestore,e,this._key)}toJSON(){return{type:tt._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,s){if(ds(t,tt._jsonSchema))return new tt(e,s||null,new Mt(xe.fromString(t.referencePath)))}}tt._jsonSchemaVersion="firestore/documentReference/1.0",tt._jsonSchema={type:Ce("string",tt._jsonSchemaVersion),referencePath:Ce("string")};class Ao extends Co{constructor(e,t,s){super(e,t,function(r){return new ig(r)}(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new tt(this.firestore,null,new Mt(e))}withConverter(e){return new Ao(this.firestore,e,this._path)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(e){this._byteString=e}static fromBase64String(e){try{return new et(qt.fromBase64String(e))}catch(t){throw new X(ne,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new et(qt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:et._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(ds(e,et._jsonSchema))return et.fromBase64String(e.bytes)}}et._jsonSchemaVersion="firestore/bytes/1.0",et._jsonSchema={type:Ce("string",et._jsonSchemaVersion),bytes:Ce("string")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new X(ne,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new X(ne,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return vt(this._lat,e._lat)||vt(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Bt._jsonSchemaVersion}}static fromJSON(e){if(ds(e,Bt._jsonSchema))return new Bt(e.latitude,e.longitude)}}Bt._jsonSchemaVersion="firestore/geoPoint/1.0",Bt._jsonSchema={type:Ce("string",Bt._jsonSchemaVersion),latitude:Ce("number"),longitude:Ce("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(s,i){if(s.length!==i.length)return!1;for(let r=0;r<s.length;++r)if(s[r]!==i[r])return!1;return!0}(this._values,e._values)}toJSON(){return{type:Ut._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(ds(e,Ut._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new Ut(e.vectorValues);throw new X(ne,"Expected 'vectorValues' field to be a number array")}}}Ut._jsonSchemaVersion="firestore/vectorValue/1.0",Ut._jsonSchema={type:Ce("string",Ut._jsonSchemaVersion),vectorValues:Ce("object")};(function(){(function(t){Ti=t})(`${Io}_lite`),Ae(new Te("firestore/lite",(e,{instanceIdentifier:t,options:s})=>{const i=e.getProvider("app").getImmediate(),r=new lg(new Gp(e.getProvider("auth-internal")),new Qp(i,e.getProvider("app-check-internal")),function(a,l){if(!Object.prototype.hasOwnProperty.apply(a.options,["projectId"]))throw new X(ne,'"projectId" not provided in firebase.initializeApp.');return new qs(a.options.projectId,l)}(i,t),i);return s&&r._setSettings(s),r},"PUBLIC").setMultipleInstances(!0)),ge("firestore-lite",Ya,""),ge("firestore-lite",Ya,"esm2020")})();var al={};const ll="@firebase/database",cl="1.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let hu="";function cg(n){hu=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ug{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),se(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:Qn(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hg{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return je(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const du=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new ug(e)}}catch{}return new hg},$t=du("localStorage"),dg=du("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mn=new vi("@firebase/database"),fu=function(){let n=1;return function(){return n++}}(),pu=function(n){const e=Pf(n),t=new Af;t.update(e);const s=t.digest();return gi.encodeByteArray(s)},fs=function(...n){let e="";for(let t=0;t<n.length;t++){const s=n[t];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=fs.apply(null,s):typeof s=="object"?e+=se(s):e+=s,e+=" "}return e};let Un=null,ul=!0;const fg=function(n,e){k(!0,"Can't turn on custom loggers persistently."),mn.logLevel=q.VERBOSE,Un=mn.log.bind(mn)},ce=function(...n){if(ul===!0&&(ul=!1,Un===null&&dg.get("logging_enabled")===!0&&fg()),Un){const e=fs.apply(null,n);Un(e)}},ps=function(n){return function(...e){ce(n,...e)}},Wr=function(...n){const e="FIREBASE INTERNAL ERROR: "+fs(...n);mn.error(e)},ct=function(...n){const e=`FIREBASE FATAL ERROR: ${fs(...n)}`;throw mn.error(e),new Error(e)},me=function(...n){const e="FIREBASE WARNING: "+fs(...n);mn.warn(e)},pg=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&me("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Po=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},gg=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},zt="[MIN_NAME]",bt="[MAX_NAME]",en=function(n,e){if(n===e)return 0;if(n===zt||e===bt)return-1;if(e===zt||n===bt)return 1;{const t=hl(n),s=hl(e);return t!==null?s!==null?t-s===0?n.length-e.length:t-s:-1:s!==null?1:n<e?-1:1}},mg=function(n,e){return n===e?0:n<e?-1:1},Nn=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+se(e))},Ro=function(n){if(typeof n!="object"||n===null)return se(n);const e=[];for(const s in n)e.push(s);e.sort();let t="{";for(let s=0;s<e.length;s++)s!==0&&(t+=","),t+=se(e[s]),t+=":",t+=Ro(n[e[s]]);return t+="}",t},gu=function(n,e){const t=n.length;if(t<=e)return[n];const s=[];for(let i=0;i<t;i+=e)i+e>t?s.push(n.substring(i,t)):s.push(n.substring(i,i+e));return s};function de(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const mu=function(n){k(!Po(n),"Invalid JSON number");const e=11,t=52,s=(1<<e-1)-1;let i,r,o,a,l;n===0?(r=0,o=0,i=1/n===-1/0?1:0):(i=n<0,n=Math.abs(n),n>=Math.pow(2,1-s)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),s),r=a+s,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-s-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(i?1:0),c.reverse();const u=c.join("");let h="";for(l=0;l<64;l+=8){let d=parseInt(u.substr(l,8),2).toString(16);d.length===1&&(d="0"+d),h=h+d}return h.toLowerCase()},_g=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},yg=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function wg(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const s=new Error(n+" at "+e._path.toString()+": "+t);return s.code=n.toUpperCase(),s}const vg=new RegExp("^-?(0*)\\d{1,10}$"),bg=-2147483648,Eg=2147483647,hl=function(n){if(vg.test(n)){const e=Number(n);if(e>=bg&&e<=Eg)return e}return null},In=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw me("Exception was thrown by user callback.",t),e},Math.floor(0))}},Tg=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Wn=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sg{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,ko(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(s=>this.appCheck=s)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,s):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)==null||t.get().then(s=>s.addTokenListener(e))}notifyForInvalidToken(){me(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kg{constructor(e,t,s){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(ce("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,s):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',me(e)}}class Ms{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Ms.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oo="5",_u="v",yu="s",wu="r",vu="f",bu=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Eu="ls",Tu="p",Hr="ac",Su="websocket",ku="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iu{constructor(e,t,s,i,r=!1,o="",a=!1,l=!1,c=null){this.secure=t,this.namespace=s,this.webSocketOnly=i,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=$t.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&$t.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function Ig(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Cu(n,e,t){k(typeof e=="string","typeof type must == string"),k(typeof t=="object","typeof params must == object");let s;if(e===Su)s=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===ku)s=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Ig(n)&&(t.ns=n.namespace);const i=[];return de(t,(r,o)=>{i.push(r+"="+o)}),s+i.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cg{constructor(){this.counters_={}}incrementCounter(e,t=1){je(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return uf(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rr={},or={};function No(n){const e=n.toString();return rr[e]||(rr[e]=new Cg),rr[e]}function Ag(n,e){const t=n.toString();return or[t]||(or[t]=e()),or[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pg{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<s.length;++i)s[i]&&In(()=>{this.onMessage_(s[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dl="start",Rg="close",Og="pLPCommand",Ng="pRTLPCB",Au="id",Pu="pw",Ru="ser",xg="cb",Dg="seg",Lg="ts",Mg="d",$g="dframe",Ou=1870,Nu=30,Fg=Ou-Nu,jg=25e3,Bg=3e4;class fn{constructor(e,t,s,i,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=ps(e),this.stats_=No(t),this.urlFn=l=>(this.appCheckToken&&(l[Hr]=this.appCheckToken),Cu(t,ku,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new Pg(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Bg)),gg(()=>{if(this.isClosed_)return;this.scriptTagHolder=new xo((...r)=>{const[o,a,l,c,u]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===dl)this.id=a,this.password=l;else if(o===Rg)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const s={};s[dl]="t",s[Ru]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[xg]=this.scriptTagHolder.uniqueCallbackIdentifier),s[_u]=Oo,this.transportSessionId&&(s[yu]=this.transportSessionId),this.lastSessionId&&(s[Eu]=this.lastSessionId),this.applicationId&&(s[Tu]=this.applicationId),this.appCheckToken&&(s[Hr]=this.appCheckToken),typeof location<"u"&&location.hostname&&bu.test(location.hostname)&&(s[wu]=vu);const i=this.urlFn(s);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){fn.forceAllow_=!0}static forceDisallow(){fn.forceDisallow_=!0}static isAvailable(){return fn.forceAllow_?!0:!fn.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!_g()&&!yg()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=se(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const s=Vc(t),i=gu(s,Fg);for(let r=0;r<i.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const s={};s[$g]="t",s[Au]=e,s[Pu]=t,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=se(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class xo{constructor(e,t,s,i){this.onDisconnect=s,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=fu(),window[Og+this.uniqueCallbackIdentifier]=e,window[Ng+this.uniqueCallbackIdentifier]=t,this.myIFrame=xo.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){ce("frame writing exception"),a.stack&&ce(a.stack),ce(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||ce("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Au]=this.myID,e[Pu]=this.myPW,e[Ru]=this.currentSerial;let t=this.urlFn(e),s="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Nu+s.length<=Ou;){const o=this.pendingSegs.shift();s=s+"&"+Dg+i+"="+o.seg+"&"+Lg+i+"="+o.ts+"&"+Mg+i+"="+o.d,i++}return t=t+s,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,s){this.pendingSegs.push({seg:e,ts:t,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const s=()=>{this.outstandingRequests.delete(t),this.newRequest_()},i=setTimeout(s,Math.floor(jg)),r=()=>{clearTimeout(i),s()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const i=s.readyState;(!i||i==="loaded"||i==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),t())},s.onerror=()=>{ce("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ug=16384,Wg=45e3;let zs=null;typeof MozWebSocket<"u"?zs=MozWebSocket:typeof WebSocket<"u"&&(zs=WebSocket);class De{constructor(e,t,s,i,r,o,a){this.connId=e,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=ps(this.connId),this.stats_=No(t),this.connURL=De.connectionURL_(t,o,a,i,s),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,s,i,r){const o={};return o[_u]=Oo,typeof location<"u"&&location.hostname&&bu.test(location.hostname)&&(o[wu]=vu),t&&(o[yu]=t),s&&(o[Eu]=s),i&&(o[Hr]=i),r&&(o[Tu]=r),Cu(e,Su,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,$t.set("previous_websocket_failure",!0);try{let s;vf(),this.mySock=new zs(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){De.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(t);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&zs!==null&&!De.forceDisallow_}static previouslyFailed(){return $t.isInMemoryStorage||$t.get("previous_websocket_failure")===!0}markConnectionHealthy(){$t.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const s=Qn(t);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(k(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const s=this.extractFrameCount_(t);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const t=se(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const s=gu(t,Ug);s.length>1&&this.sendString_(String(s.length));for(let i=0;i<s.length;i++)this.sendString_(s[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Wg))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}De.responsesRequiredToBeHealthy=2;De.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn{static get ALL_TRANSPORTS(){return[fn,De]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=De&&De.isAvailable();let s=t&&!De.previouslyFailed();if(e.webSocketOnly&&(t||me("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[De];else{const i=this.transports_=[];for(const r of Zn.ALL_TRANSPORTS)r&&r.isAvailable()&&i.push(r);Zn.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Zn.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hg=6e4,Vg=5e3,qg=10*1024,zg=100*1024,ar="t",fl="d",Kg="s",pl="r",Gg="e",gl="o",ml="a",_l="n",yl="p",Jg="h";class Yg{constructor(e,t,s,i,r,o,a,l,c,u){this.id=e,this.repoInfo_=t,this.applicationId_=s,this.appCheckToken_=i,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=ps("c:"+this.id+":"),this.transportManager_=new Zn(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,s)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=Wn(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>zg?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>qg?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(ar in e){const t=e[ar];t===ml?this.upgradeIfSecondaryHealthy_():t===pl?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===gl&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=Nn("t",e),s=Nn("d",e);if(t==="c")this.onSecondaryControl_(s);else if(t==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:yl,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:ml,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:_l,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=Nn("t",e),s=Nn("d",e);t==="c"?this.onControl_(s):t==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=Nn(ar,e);if(fl in e){const s=e[fl];if(t===Jg){const i={...s};this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(t===_l){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===Kg?this.onConnectionShutdown_(s):t===pl?this.onReset_(s):t===Gg?Wr("Server Error: "+s):t===gl?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Wr("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,s=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),Oo!==s&&me("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,s),Wn(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Hg))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Wn(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Vg))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:yl,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&($t.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xu{put(e,t,s,i){}merge(e,t,s,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,s){}onDisconnectMerge(e,t,s){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Du{constructor(e){this.allowedEvents_=e,this.listeners_={},k(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let i=0;i<s.length;i++)s[i].callback.apply(s[i].context,t)}}on(e,t,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:s});const i=this.getInitialEvent(e);i&&t.apply(s,i)}off(e,t,s){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let r=0;r<i.length;r++)if(i[r].callback===t&&(!s||s===i[r].context)){i.splice(r,1);return}}validateEventType_(e){k(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ks extends Du{static getInstance(){return new Ks}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Zc()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return k(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wl=32,vl=768;class V{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let s=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[s]=this.pieces_[i],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function W(){return new V("")}function M(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function Et(n){return n.pieces_.length-n.pieceNum_}function J(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new V(n.pieces_,e)}function Do(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function Qg(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function es(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Lu(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new V(e,0)}function Q(n,e){const t=[];for(let s=n.pieceNum_;s<n.pieces_.length;s++)t.push(n.pieces_[s]);if(e instanceof V)for(let s=e.pieceNum_;s<e.pieces_.length;s++)t.push(e.pieces_[s]);else{const s=e.split("/");for(let i=0;i<s.length;i++)s[i].length>0&&t.push(s[i])}return new V(t,0)}function $(n){return n.pieceNum_>=n.pieces_.length}function pe(n,e){const t=M(n),s=M(e);if(t===null)return e;if(t===s)return pe(J(n),J(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function Xg(n,e){const t=es(n,0),s=es(e,0);for(let i=0;i<t.length&&i<s.length;i++){const r=en(t[i],s[i]);if(r!==0)return r}return t.length===s.length?0:t.length<s.length?-1:1}function Lo(n,e){if(Et(n)!==Et(e))return!1;for(let t=n.pieceNum_,s=e.pieceNum_;t<=n.pieces_.length;t++,s++)if(n.pieces_[t]!==e.pieces_[s])return!1;return!0}function Ie(n,e){let t=n.pieceNum_,s=e.pieceNum_;if(Et(n)>Et(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[s])return!1;++t,++s}return!0}class Zg{constructor(e,t){this.errorPrefix_=t,this.parts_=es(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=wi(this.parts_[s]);Mu(this)}}function em(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=wi(e),Mu(n)}function tm(n){const e=n.parts_.pop();n.byteLength_-=wi(e),n.parts_.length>0&&(n.byteLength_-=1)}function Mu(n){if(n.byteLength_>vl)throw new Error(n.errorPrefix_+"has a key path longer than "+vl+" bytes ("+n.byteLength_+").");if(n.parts_.length>wl)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+wl+") or object contains a cycle "+xt(n))}function xt(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mo extends Du{static getInstance(){return new Mo}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}getInitialEvent(e){return k(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xn=1e3,nm=60*5*1e3,bl=30*1e3,sm=1.3,im=3e4,rm="server_kill",El=3;class rt extends xu{constructor(e,t,s,i,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=s,this.onConnectStatus_=i,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=rt.nextPersistentConnectionId_++,this.log_=ps("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=xn,this.maxReconnectDelay_=nm,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Mo.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Ks.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,s){const i=++this.requestNumber_,r={r:i,a:e,b:t};this.log_(se(r)),k(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),s&&(this.requestCBHash_[i]=s)}get(e){this.initConnection_();const t=new Ve,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,s,i){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),k(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),k(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:i,hashFn:t,query:e,tag:s};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(s)})}sendListen_(e){const t=e.query,s=t._path.toString(),i=t._queryIdentifier;this.log_("Listen on "+s+" for "+i);const r={p:s},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;rt.warnOnListenWarnings_(l,t),(this.listens.get(s)&&this.listens.get(s).get(i))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(s,i),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&je(e,"w")){const s=Vt(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const i='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();me(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||If(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=bl)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=kf(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(t,s,i=>{const r=i.s,o=i.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,s=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,s)})}unlisten(e,t){const s=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+i),k(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,i)&&this.connected_&&this.sendUnlisten_(s,i,e._queryObject,t)}sendUnlisten_(e,t,s,i){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";i&&(r.q=s,r.t=i),this.sendRequest(o,r)}onDisconnectPut(e,t,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:s})}onDisconnectMerge(e,t,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:s})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,s,i){const r={p:t,d:s};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,t,s,i){this.putInternal("p",e,t,s,i)}merge(e,t,s,i){this.putInternal("m",e,t,s,i)}putInternal(e,t,s,i,r){this.initConnection_();const o={p:t,d:s};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,s,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,s=>{if(s.s!=="ok"){const r=s.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+se(e));const t=e.r,s=this.requestCBHash_[t];s&&(delete this.requestCBHash_[t],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):Wr("Unrecognized action received from server: "+se(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){k(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=xn,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=xn,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>im&&(this.reconnectDelay_=xn),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*sm)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+rt.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,s())},c=function(h){k(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(h)};this.realtime_={close:l,sendRequest:c};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[h,d]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?ce("getToken() completed but was canceled"):(ce("getToken() completed. Creating connection."),this.authToken_=h&&h.accessToken,this.appCheckToken_=d&&d.token,a=new Yg(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,s,g=>{me(g+" ("+this.repoInfo_.toString()+")"),this.interrupt(rm)},r))}catch(h){this.log_("Failed to get token: "+h),o||(this.repoInfo_.nodeAdmin&&me(h),l())}}}interrupt(e){ce("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){ce("Resuming connection for reason: "+e),delete this.interruptReasons_[e],ja(this.interruptReasons_)&&(this.reconnectDelay_=xn,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let s;t?s=t.map(r=>Ro(r)).join("$"):s="default";const i=this.removeListen_(e,s);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,t){const s=new V(e).toString();let i;if(this.listens.has(s)){const r=this.listens.get(s);i=r.get(t),r.delete(t),r.size===0&&this.listens.delete(s)}else i=void 0;return i}onAuthRevoked_(e,t){ce("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=El&&(this.reconnectDelay_=bl,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){ce("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=El&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+hu.replace(/\./g,"-")]=1,Zc()?e["framework.cordova"]=1:wf()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Ks.getInstance().currentlyOnline();return ja(this.interruptReasons_)&&e}}rt.nextPersistentConnectionId_=0;rt.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new F(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Si{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const s=new F(zt,e),i=new F(zt,t);return this.compare(s,i)!==0}minPost(){return F.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ts;class $u extends Si{static get __EMPTY_NODE(){return Ts}static set __EMPTY_NODE(e){Ts=e}compare(e,t){return en(e.name,t.name)}isDefinedOn(e){throw kn("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return F.MIN}maxPost(){return new F(bt,Ts)}makePost(e,t){return k(typeof e=="string","KeyIndex indexValue must always be a string."),new F(e,Ts)}toString(){return".key"}}const Wt=new $u;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ss{constructor(e,t,s,i,r=null){this.isReverse_=i,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?s(e.key,t):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class le{constructor(e,t,s,i,r){this.key=e,this.value=t,this.color=s??le.RED,this.left=i??be.EMPTY_NODE,this.right=r??be.EMPTY_NODE}copy(e,t,s,i,r){return new le(e??this.key,t??this.value,s??this.color,i??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,s){let i=this;const r=s(e,i.key);return r<0?i=i.copy(null,null,null,i.left.insert(e,t,s),null):r===0?i=i.copy(null,t,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,t,s)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return be.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let s,i;if(s=this,t(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),t(e,s.key)===0){if(s.right.isEmpty())return be.EMPTY_NODE;i=s.right.min_(),s=s.copy(i.key,i.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,le.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,le.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}le.RED=!0;le.BLACK=!1;class om{copy(e,t,s,i,r){return this}insert(e,t,s){return new le(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class be{constructor(e,t=be.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new be(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,le.BLACK,null,null))}remove(e){return new be(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,le.BLACK,null,null))}get(e){let t,s=this.root_;for(;!s.isEmpty();){if(t=this.comparator_(e,s.key),t===0)return s.value;t<0?s=s.left:t>0&&(s=s.right)}return null}getPredecessorKey(e){let t,s=this.root_,i=null;for(;!s.isEmpty();)if(t=this.comparator_(e,s.key),t===0){if(s.left.isEmpty())return i?i.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else t<0?s=s.left:t>0&&(i=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Ss(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new Ss(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new Ss(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new Ss(this.root_,null,this.comparator_,!0,e)}}be.EMPTY_NODE=new om;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function am(n,e){return en(n.name,e.name)}function $o(n,e){return en(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vr;function lm(n){Vr=n}const Fu=function(n){return typeof n=="number"?"number:"+mu(n):"string:"+n},ju=function(n){if(n.isLeafNode()){const e=n.val();k(typeof e=="string"||typeof e=="number"||typeof e=="object"&&je(e,".sv"),"Priority must be a string or number.")}else k(n===Vr||n.isEmpty(),"priority of unexpected type.");k(n===Vr||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Tl;class ae{static set __childrenNodeConstructor(e){Tl=e}static get __childrenNodeConstructor(){return Tl}constructor(e,t=ae.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,k(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),ju(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new ae(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:ae.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return $(e)?this:M(e)===".priority"?this.priorityNode_:ae.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:ae.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const s=M(e);return s===null?t:t.isEmpty()&&s!==".priority"?this:(k(s!==".priority"||Et(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,ae.__childrenNodeConstructor.EMPTY_NODE.updateChild(J(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Fu(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=mu(this.value_):e+=this.value_,this.lazyHash_=pu(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===ae.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof ae.__childrenNodeConstructor?-1:(k(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,s=typeof this.value_,i=ae.VALUE_TYPE_ORDER.indexOf(t),r=ae.VALUE_TYPE_ORDER.indexOf(s);return k(i>=0,"Unknown leaf type: "+t),k(r>=0,"Unknown leaf type: "+s),i===r?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}ae.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Bu,Uu;function cm(n){Bu=n}function um(n){Uu=n}class hm extends Si{compare(e,t){const s=e.node.getPriority(),i=t.node.getPriority(),r=s.compareTo(i);return r===0?en(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return F.MIN}maxPost(){return new F(bt,new ae("[PRIORITY-POST]",Uu))}makePost(e,t){const s=Bu(e);return new F(t,new ae("[PRIORITY-POST]",s))}toString(){return".priority"}}const Y=new hm;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dm=Math.log(2);class fm{constructor(e){const t=r=>parseInt(Math.log(r)/dm,10),s=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const i=s(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Gs=function(n,e,t,s){n.sort(e);const i=function(l,c){const u=c-l;let h,d;if(u===0)return null;if(u===1)return h=n[l],d=t?t(h):h,new le(d,h.node,le.BLACK,null,null);{const g=parseInt(u/2,10)+l,y=i(l,g),T=i(g+1,c);return h=n[g],d=t?t(h):h,new le(d,h.node,le.BLACK,y,T)}},r=function(l){let c=null,u=null,h=n.length;const d=function(y,T){const E=h-y,P=h;h-=y;const D=i(E+1,P),I=n[E],N=t?t(I):I;g(new le(N,I.node,T,null,D))},g=function(y){c?(c.left=y,c=y):(u=y,c=y)};for(let y=0;y<l.count;++y){const T=l.nextBitIsOne(),E=Math.pow(2,l.count-(y+1));T?d(E,le.BLACK):(d(E,le.BLACK),d(E,le.RED))}return u},o=new fm(n.length),a=r(o);return new be(s||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let lr;const rn={};class nt{static get Default(){return k(rn&&Y,"ChildrenNode.ts has not been loaded"),lr=lr||new nt({".priority":rn},{".priority":Y}),lr}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=Vt(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof be?t:null}hasIndex(e){return je(this.indexSet_,e.toString())}addIndex(e,t){k(e!==Wt,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let i=!1;const r=t.getIterator(F.Wrap);let o=r.getNext();for(;o;)i=i||e.isDefinedOn(o.node),s.push(o),o=r.getNext();let a;i?a=Gs(s,e.getCompare()):a=rn;const l=e.toString(),c={...this.indexSet_};c[l]=e;const u={...this.indexes_};return u[l]=a,new nt(u,c)}addToIndexes(e,t){const s=Us(this.indexes_,(i,r)=>{const o=Vt(this.indexSet_,r);if(k(o,"Missing index implementation for "+r),i===rn)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator(F.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),Gs(a,o.getCompare())}else return rn;else{const a=t.get(e.name);let l=i;return a&&(l=l.remove(new F(e.name,a))),l.insert(e,e.node)}});return new nt(s,this.indexSet_)}removeFromIndexes(e,t){const s=Us(this.indexes_,i=>{if(i===rn)return i;{const r=t.get(e.name);return r?i.remove(new F(e.name,r)):i}});return new nt(s,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Dn;class O{static get EMPTY_NODE(){return Dn||(Dn=new O(new be($o),null,nt.Default))}constructor(e,t,s){this.children_=e,this.priorityNode_=t,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&ju(this.priorityNode_),this.children_.isEmpty()&&k(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Dn}updatePriority(e){return this.children_.isEmpty()?this:new O(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?Dn:t}}getChild(e){const t=M(e);return t===null?this:this.getImmediateChild(t).getChild(J(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(k(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const s=new F(e,t);let i,r;t.isEmpty()?(i=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(s,this.children_)):(i=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(s,this.children_));const o=i.isEmpty()?Dn:this.priorityNode_;return new O(i,o,r)}}updateChild(e,t){const s=M(e);if(s===null)return t;{k(M(e)!==".priority"||Et(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(s).updateChild(J(e),t);return this.updateImmediateChild(s,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let s=0,i=0,r=!0;if(this.forEachChild(Y,(o,a)=>{t[o]=a.val(e),s++,r&&O.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):r=!1}),!e&&r&&i<2*s){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Fu(this.getPriority().val())+":"),this.forEachChild(Y,(t,s)=>{const i=s.hash();i!==""&&(e+=":"+t+":"+i)}),this.lazyHash_=e===""?"":pu(e)}return this.lazyHash_}getPredecessorChildName(e,t,s){const i=this.resolveIndex_(s);if(i){const r=i.getPredecessorKey(new F(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const s=t.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new F(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const s=t.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new F(t,this.children_.get(t)):null}forEachChild(e,t){const s=this.resolveIndex_(e);return s?s.inorderTraversal(i=>t(i.name,i.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const s=this.resolveIndex_(t);if(s)return s.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,F.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)<0;)i.getNext(),r=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const s=this.resolveIndex_(t);if(s)return s.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,F.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)>0;)i.getNext(),r=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===gs?-1:0}withIndex(e){if(e===Wt||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new O(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===Wt||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const s=this.getIterator(Y),i=t.getIterator(Y);let r=s.getNext(),o=i.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=s.getNext(),o=i.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Wt?null:this.indexMap_.get(e.toString())}}O.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class pm extends O{constructor(){super(new be($o),O.EMPTY_NODE,nt.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return O.EMPTY_NODE}isEmpty(){return!1}}const gs=new pm;Object.defineProperties(F,{MIN:{value:new F(zt,O.EMPTY_NODE)},MAX:{value:new F(bt,gs)}});$u.__EMPTY_NODE=O.EMPTY_NODE;ae.__childrenNodeConstructor=O;lm(gs);um(gs);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gm=!0;function ee(n,e=null){if(n===null)return O.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),k(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new ae(t,ee(e))}if(!(n instanceof Array)&&gm){const t=[];let s=!1;if(de(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=ee(a);l.isEmpty()||(s=s||!l.getPriority().isEmpty(),t.push(new F(o,l)))}}),t.length===0)return O.EMPTY_NODE;const r=Gs(t,am,o=>o.name,$o);if(s){const o=Gs(t,Y.getCompare());return new O(r,ee(e),new nt({".priority":o},{".priority":Y}))}else return new O(r,ee(e),nt.Default)}else{let t=O.EMPTY_NODE;return de(n,(s,i)=>{if(je(n,s)&&s.substring(0,1)!=="."){const r=ee(i);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(s,r))}}),t.updatePriority(ee(e))}}cm(ee);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fo extends Si{constructor(e){super(),this.indexPath_=e,k(!$(e)&&M(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const s=this.extractChild(e.node),i=this.extractChild(t.node),r=s.compareTo(i);return r===0?en(e.name,t.name):r}makePost(e,t){const s=ee(e),i=O.EMPTY_NODE.updateChild(this.indexPath_,s);return new F(t,i)}maxPost(){const e=O.EMPTY_NODE.updateChild(this.indexPath_,gs);return new F(bt,e)}toString(){return es(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mm extends Si{compare(e,t){const s=e.node.compareTo(t.node);return s===0?en(e.name,t.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return F.MIN}maxPost(){return F.MAX}makePost(e,t){const s=ee(e);return new F(t,s)}toString(){return".value"}}const Wu=new mm;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hu(n){return{type:"value",snapshotNode:n}}function _n(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function ts(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function ns(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function _m(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jo{constructor(e){this.index_=e}updateChild(e,t,s,i,r,o){k(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(i).equals(s.getChild(i))&&a.isEmpty()===s.isEmpty()||(o!=null&&(s.isEmpty()?e.hasChild(t)?o.trackChildChange(ts(t,a)):k(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(_n(t,s)):o.trackChildChange(ns(t,s,a))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(t,s).withIndex(this.index_)}updateFullNode(e,t,s){return s!=null&&(e.isLeafNode()||e.forEachChild(Y,(i,r)=>{t.hasChild(i)||s.trackChildChange(ts(i,r))}),t.isLeafNode()||t.forEachChild(Y,(i,r)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(r)||s.trackChildChange(ns(i,r,o))}else s.trackChildChange(_n(i,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?O.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ss{constructor(e){this.indexedFilter_=new jo(e.getIndex()),this.index_=e.getIndex(),this.startPost_=ss.getStartPost_(e),this.endPost_=ss.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&s}updateChild(e,t,s,i,r,o){return this.matches(new F(t,s))||(s=O.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,s,i,r,o)}updateFullNode(e,t,s){t.isLeafNode()&&(t=O.EMPTY_NODE);let i=t.withIndex(this.index_);i=i.updatePriority(O.EMPTY_NODE);const r=this;return t.forEachChild(Y,(o,a)=>{r.matches(new F(o,a))||(i=i.updateImmediateChild(o,O.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,s)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ym{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=t=>{const s=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new ss(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,s,i,r,o){return this.rangedFilter_.matches(new F(t,s))||(s=O.EMPTY_NODE),e.getImmediateChild(t).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,s,i,r,o):this.fullLimitUpdateChild_(e,t,s,r,o)}updateFullNode(e,t,s){let i;if(t.isLeafNode()||t.isEmpty())i=O.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){i=O.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))i=i.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{i=t.withIndex(this.index_),i=i.updatePriority(O.EMPTY_NODE);let r;this.reverse_?r=i.getReverseIterator(this.index_):r=i.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:i=i.updateImmediateChild(a.name,O.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,s)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,s,i,r){let o;if(this.reverse_){const h=this.index_.getCompare();o=(d,g)=>h(g,d)}else o=this.index_.getCompare();const a=e;k(a.numChildren()===this.limit_,"");const l=new F(t,s),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(l);if(a.hasChild(t)){const h=a.getImmediateChild(t);let d=i.getChildAfterChild(this.index_,c,this.reverse_);for(;d!=null&&(d.name===t||a.hasChild(d.name));)d=i.getChildAfterChild(this.index_,d,this.reverse_);const g=d==null?1:o(d,l);if(u&&!s.isEmpty()&&g>=0)return r!=null&&r.trackChildChange(ns(t,s,h)),a.updateImmediateChild(t,s);{r!=null&&r.trackChildChange(ts(t,h));const T=a.updateImmediateChild(t,O.EMPTY_NODE);return d!=null&&this.rangedFilter_.matches(d)?(r!=null&&r.trackChildChange(_n(d.name,d.node)),T.updateImmediateChild(d.name,d.node)):T}}else return s.isEmpty()?e:u&&o(c,l)>=0?(r!=null&&(r.trackChildChange(ts(c.name,c.node)),r.trackChildChange(_n(t,s))),a.updateImmediateChild(t,s).updateImmediateChild(c.name,O.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bo{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=Y}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return k(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return k(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:zt}hasEnd(){return this.endSet_}getIndexEndValue(){return k(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return k(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:bt}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return k(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===Y}copy(){const e=new Bo;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function wm(n){return n.loadsAllData()?new jo(n.getIndex()):n.hasLimit()?new ym(n):new ss(n)}function vm(n,e){const t=n.copy();return t.limitSet_=!0,t.limit_=e,t.viewFrom_="r",t}function bm(n,e,t){const s=n.copy();return s.endSet_=!0,e===void 0&&(e=null),s.indexEndValue_=e,t!==void 0?(s.endNameSet_=!0,s.indexEndName_=t):(s.endNameSet_=!1,s.indexEndName_=""),s}function Em(n,e){const t=n.copy();return t.index_=e,t}function Sl(n){const e={};if(n.isDefault())return e;let t;if(n.index_===Y?t="$priority":n.index_===Wu?t="$value":n.index_===Wt?t="$key":(k(n.index_ instanceof Fo,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=se(t),n.startSet_){const s=n.startAfterSet_?"startAfter":"startAt";e[s]=se(n.indexStartValue_),n.startNameSet_&&(e[s]+=","+se(n.indexStartName_))}if(n.endSet_){const s=n.endBeforeSet_?"endBefore":"endAt";e[s]=se(n.indexEndValue_),n.endNameSet_&&(e[s]+=","+se(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function kl(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==Y&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js extends xu{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(k(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,s,i){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=s,this.appCheckTokenProvider_=i,this.log_=ps("p:rest:"),this.listens_={}}listen(e,t,s,i){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Js.getListenId_(e,s),a={};this.listens_[o]=a;const l=Sl(e._queryParams);this.restRequest_(r+".json",l,(c,u)=>{let h=u;if(c===404&&(h=null,c=null),c===null&&this.onDataUpdate_(r,h,!1,s),Vt(this.listens_,o)===a){let d;c?c===401?d="permission_denied":d="rest_error:"+c:d="ok",i(d,null)}})}unlisten(e,t){const s=Js.getListenId_(e,t);delete this.listens_[s]}get(e){const t=Sl(e._queryParams),s=e._path.toString(),i=new Ve;return this.restRequest_(s+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(s,a,!1,null),i.resolve(a)):i.reject(new Error(a))}),i.promise}refreshAuthToken(e){}restRequest_(e,t={},s){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,r])=>{i&&i.accessToken&&(t.auth=i.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Cf(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(s&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=Qn(a.responseText)}catch{me("Failed to parse JSON response for "+o+": "+a.responseText)}s(null,l)}else a.status!==401&&a.status!==404&&me("Got unsuccessful REST response for "+o+" Status: "+a.status),s(a.status);s=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tm{constructor(){this.rootNode_=O.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ys(){return{value:null,children:new Map}}function Vu(n,e,t){if($(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const s=M(e);n.children.has(s)||n.children.set(s,Ys());const i=n.children.get(s);e=J(e),Vu(i,e,t)}}function qr(n,e,t){n.value!==null?t(e,n.value):Sm(n,(s,i)=>{const r=new V(e.toString()+"/"+s);qr(i,r,t)})}function Sm(n,e){n.children.forEach((t,s)=>{e(s,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class km{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&de(this.last_,(s,i)=>{t[s]=t[s]-i}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Il=10*1e3,Im=30*1e3,Cm=5*60*1e3;class Am{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new km(e);const s=Il+(Im-Il)*Math.random();Wn(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),t={};let s=!1;de(e,(i,r)=>{r>0&&je(this.statsToReport_,i)&&(t[i]=r,s=!0)}),s&&this.server_.reportStats(t),Wn(this.reportStats_.bind(this),Math.floor(Math.random()*2*Cm))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Me;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Me||(Me={}));function Uo(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Wo(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Ho(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qs{constructor(e,t,s){this.path=e,this.affectedTree=t,this.revert=s,this.type=Me.ACK_USER_WRITE,this.source=Uo()}operationForChild(e){if($(this.path)){if(this.affectedTree.value!=null)return k(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new V(e));return new Qs(W(),t,this.revert)}}else return k(M(this.path)===e,"operationForChild called for unrelated child."),new Qs(J(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class is{constructor(e,t){this.source=e,this.path=t,this.type=Me.LISTEN_COMPLETE}operationForChild(e){return $(this.path)?new is(this.source,W()):new is(this.source,J(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt{constructor(e,t,s){this.source=e,this.path=t,this.snap=s,this.type=Me.OVERWRITE}operationForChild(e){return $(this.path)?new Kt(this.source,W(),this.snap.getImmediateChild(e)):new Kt(this.source,J(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn{constructor(e,t,s){this.source=e,this.path=t,this.children=s,this.type=Me.MERGE}operationForChild(e){if($(this.path)){const t=this.children.subtree(new V(e));return t.isEmpty()?null:t.value?new Kt(this.source,W(),t.value):new yn(this.source,W(),t)}else return k(M(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new yn(this.source,J(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(e,t,s){this.node_=e,this.fullyInitialized_=t,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if($(e))return this.isFullyInitialized()&&!this.filtered_;const t=M(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pm{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Rm(n,e,t,s){const i=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(_m(o.childName,o.snapshotNode))}),Ln(n,i,"child_removed",e,s,t),Ln(n,i,"child_added",e,s,t),Ln(n,i,"child_moved",r,s,t),Ln(n,i,"child_changed",e,s,t),Ln(n,i,"value",e,s,t),i}function Ln(n,e,t,s,i,r){const o=s.filter(a=>a.type===t);o.sort((a,l)=>Nm(n,a,l)),o.forEach(a=>{const l=Om(n,a,r);i.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function Om(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function Nm(n,e,t){if(e.childName==null||t.childName==null)throw kn("Should only compare child_ events.");const s=new F(e.childName,e.snapshotNode),i=new F(t.childName,t.snapshotNode);return n.index_.compare(s,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ki(n,e){return{eventCache:n,serverCache:e}}function Hn(n,e,t,s){return ki(new Tt(e,t,s),n.serverCache)}function qu(n,e,t,s){return ki(n.eventCache,new Tt(e,t,s))}function Xs(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function Gt(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let cr;const xm=()=>(cr||(cr=new be(mg)),cr);class G{static fromObject(e){let t=new G(null);return de(e,(s,i)=>{t=t.set(new V(s),i)}),t}constructor(e,t=xm()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:W(),value:this.value};if($(e))return null;{const s=M(e),i=this.children.get(s);if(i!==null){const r=i.findRootMostMatchingPathAndValue(J(e),t);return r!=null?{path:Q(new V(s),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if($(e))return this;{const t=M(e),s=this.children.get(t);return s!==null?s.subtree(J(e)):new G(null)}}set(e,t){if($(e))return new G(t,this.children);{const s=M(e),r=(this.children.get(s)||new G(null)).set(J(e),t),o=this.children.insert(s,r);return new G(this.value,o)}}remove(e){if($(e))return this.children.isEmpty()?new G(null):new G(null,this.children);{const t=M(e),s=this.children.get(t);if(s){const i=s.remove(J(e));let r;return i.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,i),this.value===null&&r.isEmpty()?new G(null):new G(this.value,r)}else return this}}get(e){if($(e))return this.value;{const t=M(e),s=this.children.get(t);return s?s.get(J(e)):null}}setTree(e,t){if($(e))return t;{const s=M(e),r=(this.children.get(s)||new G(null)).setTree(J(e),t);let o;return r.isEmpty()?o=this.children.remove(s):o=this.children.insert(s,r),new G(this.value,o)}}fold(e){return this.fold_(W(),e)}fold_(e,t){const s={};return this.children.inorderTraversal((i,r)=>{s[i]=r.fold_(Q(e,i),t)}),t(e,this.value,s)}findOnPath(e,t){return this.findOnPath_(e,W(),t)}findOnPath_(e,t,s){const i=this.value?s(t,this.value):!1;if(i)return i;if($(e))return null;{const r=M(e),o=this.children.get(r);return o?o.findOnPath_(J(e),Q(t,r),s):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,W(),t)}foreachOnPath_(e,t,s){if($(e))return this;{this.value&&s(t,this.value);const i=M(e),r=this.children.get(i);return r?r.foreachOnPath_(J(e),Q(t,i),s):new G(null)}}foreach(e){this.foreach_(W(),e)}foreach_(e,t){this.children.inorderTraversal((s,i)=>{i.foreach_(Q(e,s),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,s)=>{s.value&&e(t,s.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fe{constructor(e){this.writeTree_=e}static empty(){return new Fe(new G(null))}}function Vn(n,e,t){if($(e))return new Fe(new G(t));{const s=n.writeTree_.findRootMostValueAndPath(e);if(s!=null){const i=s.path;let r=s.value;const o=pe(i,e);return r=r.updateChild(o,t),new Fe(n.writeTree_.set(i,r))}else{const i=new G(t),r=n.writeTree_.setTree(e,i);return new Fe(r)}}}function zr(n,e,t){let s=n;return de(t,(i,r)=>{s=Vn(s,Q(e,i),r)}),s}function Cl(n,e){if($(e))return Fe.empty();{const t=n.writeTree_.setTree(e,new G(null));return new Fe(t)}}function Kr(n,e){return tn(n,e)!=null}function tn(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(pe(t.path,e)):null}function Al(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(Y,(s,i)=>{e.push(new F(s,i))}):n.writeTree_.children.inorderTraversal((s,i)=>{i.value!=null&&e.push(new F(s,i.value))}),e}function _t(n,e){if($(e))return n;{const t=tn(n,e);return t!=null?new Fe(new G(t)):new Fe(n.writeTree_.subtree(e))}}function Gr(n){return n.writeTree_.isEmpty()}function wn(n,e){return zu(W(),n.writeTree_,e)}function zu(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let s=null;return e.children.inorderTraversal((i,r)=>{i===".priority"?(k(r.value!==null,"Priority writes must always be leaf nodes"),s=r.value):t=zu(Q(n,i),r,t)}),!t.getChild(n).isEmpty()&&s!==null&&(t=t.updateChild(Q(n,".priority"),s)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ii(n,e){return Yu(e,n)}function Dm(n,e,t,s,i){k(s>n.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),n.allWrites.push({path:e,snap:t,writeId:s,visible:i}),i&&(n.visibleWrites=Vn(n.visibleWrites,e,t)),n.lastWriteId=s}function Lm(n,e,t,s){k(s>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:s,visible:!0}),n.visibleWrites=zr(n.visibleWrites,e,t),n.lastWriteId=s}function Mm(n,e){for(let t=0;t<n.allWrites.length;t++){const s=n.allWrites[t];if(s.writeId===e)return s}return null}function $m(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);k(t>=0,"removeWrite called with nonexistent writeId.");const s=n.allWrites[t];n.allWrites.splice(t,1);let i=s.visible,r=!1,o=n.allWrites.length-1;for(;i&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&Fm(a,s.path)?i=!1:Ie(s.path,a.path)&&(r=!0)),o--}if(i){if(r)return jm(n),!0;if(s.snap)n.visibleWrites=Cl(n.visibleWrites,s.path);else{const a=s.children;de(a,l=>{n.visibleWrites=Cl(n.visibleWrites,Q(s.path,l))})}return!0}else return!1}function Fm(n,e){if(n.snap)return Ie(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&Ie(Q(n.path,t),e))return!0;return!1}function jm(n){n.visibleWrites=Ku(n.allWrites,Bm,W()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function Bm(n){return n.visible}function Ku(n,e,t){let s=Fe.empty();for(let i=0;i<n.length;++i){const r=n[i];if(e(r)){const o=r.path;let a;if(r.snap)Ie(t,o)?(a=pe(t,o),s=Vn(s,a,r.snap)):Ie(o,t)&&(a=pe(o,t),s=Vn(s,W(),r.snap.getChild(a)));else if(r.children){if(Ie(t,o))a=pe(t,o),s=zr(s,a,r.children);else if(Ie(o,t))if(a=pe(o,t),$(a))s=zr(s,W(),r.children);else{const l=Vt(r.children,M(a));if(l){const c=l.getChild(J(a));s=Vn(s,W(),c)}}}else throw kn("WriteRecord should have .snap or .children")}}return s}function Gu(n,e,t,s,i){if(!s&&!i){const r=tn(n.visibleWrites,e);if(r!=null)return r;{const o=_t(n.visibleWrites,e);if(Gr(o))return t;if(t==null&&!Kr(o,W()))return null;{const a=t||O.EMPTY_NODE;return wn(o,a)}}}else{const r=_t(n.visibleWrites,e);if(!i&&Gr(r))return t;if(!i&&t==null&&!Kr(r,W()))return null;{const o=function(c){return(c.visible||i)&&(!s||!~s.indexOf(c.writeId))&&(Ie(c.path,e)||Ie(e,c.path))},a=Ku(n.allWrites,o,e),l=t||O.EMPTY_NODE;return wn(a,l)}}}function Um(n,e,t){let s=O.EMPTY_NODE;const i=tn(n.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(Y,(r,o)=>{s=s.updateImmediateChild(r,o)}),s;if(t){const r=_t(n.visibleWrites,e);return t.forEachChild(Y,(o,a)=>{const l=wn(_t(r,new V(o)),a);s=s.updateImmediateChild(o,l)}),Al(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const r=_t(n.visibleWrites,e);return Al(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function Wm(n,e,t,s,i){k(s||i,"Either existingEventSnap or existingServerSnap must exist");const r=Q(e,t);if(Kr(n.visibleWrites,r))return null;{const o=_t(n.visibleWrites,r);return Gr(o)?i.getChild(t):wn(o,i.getChild(t))}}function Hm(n,e,t,s){const i=Q(e,t),r=tn(n.visibleWrites,i);if(r!=null)return r;if(s.isCompleteForChild(t)){const o=_t(n.visibleWrites,i);return wn(o,s.getNode().getImmediateChild(t))}else return null}function Vm(n,e){return tn(n.visibleWrites,e)}function qm(n,e,t,s,i,r,o){let a;const l=_t(n.visibleWrites,e),c=tn(l,W());if(c!=null)a=c;else if(t!=null)a=wn(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],h=o.getCompare(),d=r?a.getReverseIteratorFrom(s,o):a.getIteratorFrom(s,o);let g=d.getNext();for(;g&&u.length<i;)h(g,s)!==0&&u.push(g),g=d.getNext();return u}else return[]}function zm(){return{visibleWrites:Fe.empty(),allWrites:[],lastWriteId:-1}}function Zs(n,e,t,s){return Gu(n.writeTree,n.treePath,e,t,s)}function Vo(n,e){return Um(n.writeTree,n.treePath,e)}function Pl(n,e,t,s){return Wm(n.writeTree,n.treePath,e,t,s)}function ei(n,e){return Vm(n.writeTree,Q(n.treePath,e))}function Km(n,e,t,s,i,r){return qm(n.writeTree,n.treePath,e,t,s,i,r)}function qo(n,e,t){return Hm(n.writeTree,n.treePath,e,t)}function Ju(n,e){return Yu(Q(n.treePath,e),n.writeTree)}function Yu(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gm{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,s=e.childName;k(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),k(s!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(s);if(i){const r=i.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(s,ns(s,e.snapshotNode,i.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(s);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(s,ts(s,i.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(s,_n(s,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(s,ns(s,e.snapshotNode,i.oldSnap));else throw kn("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jm{getCompleteChild(e){return null}getChildAfterChild(e,t,s){return null}}const Qu=new Jm;class zo{constructor(e,t,s=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=s}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new Tt(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return qo(this.writes_,e,s)}}getChildAfterChild(e,t,s){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Gt(this.viewCache_),r=Km(this.writes_,i,t,1,s,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ym(n){return{filter:n}}function Qm(n,e){k(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),k(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function Xm(n,e,t,s,i){const r=new Gm;let o,a;if(t.type===Me.OVERWRITE){const c=t;c.source.fromUser?o=Jr(n,e,c.path,c.snap,s,i,r):(k(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!$(c.path),o=ti(n,e,c.path,c.snap,s,i,a,r))}else if(t.type===Me.MERGE){const c=t;c.source.fromUser?o=e_(n,e,c.path,c.children,s,i,r):(k(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=Yr(n,e,c.path,c.children,s,i,a,r))}else if(t.type===Me.ACK_USER_WRITE){const c=t;c.revert?o=s_(n,e,c.path,s,i,r):o=t_(n,e,c.path,c.affectedTree,s,i,r)}else if(t.type===Me.LISTEN_COMPLETE)o=n_(n,e,t.path,s,r);else throw kn("Unknown operation type: "+t.type);const l=r.getChanges();return Zm(e,o,l),{viewCache:o,changes:l}}function Zm(n,e,t){const s=e.eventCache;if(s.isFullyInitialized()){const i=s.getNode().isLeafNode()||s.getNode().isEmpty(),r=Xs(n);(t.length>0||!n.eventCache.isFullyInitialized()||i&&!s.getNode().equals(r)||!s.getNode().getPriority().equals(r.getPriority()))&&t.push(Hu(Xs(e)))}}function Xu(n,e,t,s,i,r){const o=e.eventCache;if(ei(s,t)!=null)return e;{let a,l;if($(t))if(k(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=Gt(e),u=c instanceof O?c:O.EMPTY_NODE,h=Vo(s,u);a=n.filter.updateFullNode(e.eventCache.getNode(),h,r)}else{const c=Zs(s,Gt(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=M(t);if(c===".priority"){k(Et(t)===1,"Can't have a priority with additional path components");const u=o.getNode();l=e.serverCache.getNode();const h=Pl(s,t,u,l);h!=null?a=n.filter.updatePriority(u,h):a=o.getNode()}else{const u=J(t);let h;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const d=Pl(s,t,o.getNode(),l);d!=null?h=o.getNode().getImmediateChild(c).updateChild(u,d):h=o.getNode().getImmediateChild(c)}else h=qo(s,c,e.serverCache);h!=null?a=n.filter.updateChild(o.getNode(),c,h,u,i,r):a=o.getNode()}}return Hn(e,a,o.isFullyInitialized()||$(t),n.filter.filtersNodes())}}function ti(n,e,t,s,i,r,o,a){const l=e.serverCache;let c;const u=o?n.filter:n.filter.getIndexedFilter();if($(t))c=u.updateFullNode(l.getNode(),s,null);else if(u.filtersNodes()&&!l.isFiltered()){const g=l.getNode().updateChild(t,s);c=u.updateFullNode(l.getNode(),g,null)}else{const g=M(t);if(!l.isCompleteForPath(t)&&Et(t)>1)return e;const y=J(t),E=l.getNode().getImmediateChild(g).updateChild(y,s);g===".priority"?c=u.updatePriority(l.getNode(),E):c=u.updateChild(l.getNode(),g,E,y,Qu,null)}const h=qu(e,c,l.isFullyInitialized()||$(t),u.filtersNodes()),d=new zo(i,h,r);return Xu(n,h,t,i,d,a)}function Jr(n,e,t,s,i,r,o){const a=e.eventCache;let l,c;const u=new zo(i,e,r);if($(t))c=n.filter.updateFullNode(e.eventCache.getNode(),s,o),l=Hn(e,c,!0,n.filter.filtersNodes());else{const h=M(t);if(h===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),s),l=Hn(e,c,a.isFullyInitialized(),a.isFiltered());else{const d=J(t),g=a.getNode().getImmediateChild(h);let y;if($(d))y=s;else{const T=u.getCompleteChild(h);T!=null?Do(d)===".priority"&&T.getChild(Lu(d)).isEmpty()?y=T:y=T.updateChild(d,s):y=O.EMPTY_NODE}if(g.equals(y))l=e;else{const T=n.filter.updateChild(a.getNode(),h,y,d,u,o);l=Hn(e,T,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function Rl(n,e){return n.eventCache.isCompleteForChild(e)}function e_(n,e,t,s,i,r,o){let a=e;return s.foreach((l,c)=>{const u=Q(t,l);Rl(e,M(u))&&(a=Jr(n,a,u,c,i,r,o))}),s.foreach((l,c)=>{const u=Q(t,l);Rl(e,M(u))||(a=Jr(n,a,u,c,i,r,o))}),a}function Ol(n,e,t){return t.foreach((s,i)=>{e=e.updateChild(s,i)}),e}function Yr(n,e,t,s,i,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;$(t)?c=s:c=new G(null).setTree(t,s);const u=e.serverCache.getNode();return c.children.inorderTraversal((h,d)=>{if(u.hasChild(h)){const g=e.serverCache.getNode().getImmediateChild(h),y=Ol(n,g,d);l=ti(n,l,new V(h),y,i,r,o,a)}}),c.children.inorderTraversal((h,d)=>{const g=!e.serverCache.isCompleteForChild(h)&&d.value===null;if(!u.hasChild(h)&&!g){const y=e.serverCache.getNode().getImmediateChild(h),T=Ol(n,y,d);l=ti(n,l,new V(h),T,i,r,o,a)}}),l}function t_(n,e,t,s,i,r,o){if(ei(i,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(s.value!=null){if($(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return ti(n,e,t,l.getNode().getChild(t),i,r,a,o);if($(t)){let c=new G(null);return l.getNode().forEachChild(Wt,(u,h)=>{c=c.set(new V(u),h)}),Yr(n,e,t,c,i,r,a,o)}else return e}else{let c=new G(null);return s.foreach((u,h)=>{const d=Q(t,u);l.isCompleteForPath(d)&&(c=c.set(u,l.getNode().getChild(d)))}),Yr(n,e,t,c,i,r,a,o)}}function n_(n,e,t,s,i){const r=e.serverCache,o=qu(e,r.getNode(),r.isFullyInitialized()||$(t),r.isFiltered());return Xu(n,o,t,s,Qu,i)}function s_(n,e,t,s,i,r){let o;if(ei(s,t)!=null)return e;{const a=new zo(s,e,i),l=e.eventCache.getNode();let c;if($(t)||M(t)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=Zs(s,Gt(e));else{const h=e.serverCache.getNode();k(h instanceof O,"serverChildren would be complete if leaf node"),u=Vo(s,h)}u=u,c=n.filter.updateFullNode(l,u,r)}else{const u=M(t);let h=qo(s,u,e.serverCache);h==null&&e.serverCache.isCompleteForChild(u)&&(h=l.getImmediateChild(u)),h!=null?c=n.filter.updateChild(l,u,h,J(t),a,r):e.eventCache.getNode().hasChild(u)?c=n.filter.updateChild(l,u,O.EMPTY_NODE,J(t),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Zs(s,Gt(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||ei(s,W())!=null,Hn(e,c,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i_{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,i=new jo(s.getIndex()),r=wm(s);this.processor_=Ym(r);const o=t.serverCache,a=t.eventCache,l=i.updateFullNode(O.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(O.EMPTY_NODE,a.getNode(),null),u=new Tt(l,o.isFullyInitialized(),i.filtersNodes()),h=new Tt(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=ki(h,u),this.eventGenerator_=new Pm(this.query_)}get query(){return this.query_}}function r_(n){return n.viewCache_.serverCache.getNode()}function o_(n){return Xs(n.viewCache_)}function a_(n,e){const t=Gt(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!$(e)&&!t.getImmediateChild(M(e)).isEmpty())?t.getChild(e):null}function Nl(n){return n.eventRegistrations_.length===0}function l_(n,e){n.eventRegistrations_.push(e)}function xl(n,e,t){const s=[];if(t){k(e==null,"A cancel should cancel all event registrations.");const i=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,i);o&&s.push(o)})}if(e){let i=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=i}else n.eventRegistrations_=[];return s}function Dl(n,e,t,s){e.type===Me.MERGE&&e.source.queryId!==null&&(k(Gt(n.viewCache_),"We should always have a full cache before handling merges"),k(Xs(n.viewCache_),"Missing event cache, even though we have a server cache"));const i=n.viewCache_,r=Xm(n.processor_,i,e,t,s);return Qm(n.processor_,r.viewCache),k(r.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,Zu(n,r.changes,r.viewCache.eventCache.getNode(),null)}function c_(n,e){const t=n.viewCache_.eventCache,s=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(Y,(r,o)=>{s.push(_n(r,o))}),t.isFullyInitialized()&&s.push(Hu(t.getNode())),Zu(n,s,t.getNode(),e)}function Zu(n,e,t,s){const i=s?[s]:n.eventRegistrations_;return Rm(n.eventGenerator_,e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ni;class eh{constructor(){this.views=new Map}}function u_(n){k(!ni,"__referenceConstructor has already been defined"),ni=n}function h_(){return k(ni,"Reference.ts has not been loaded"),ni}function d_(n){return n.views.size===0}function Ko(n,e,t,s){const i=e.source.queryId;if(i!==null){const r=n.views.get(i);return k(r!=null,"SyncTree gave us an op for an invalid query."),Dl(r,e,t,s)}else{let r=[];for(const o of n.views.values())r=r.concat(Dl(o,e,t,s));return r}}function th(n,e,t,s,i){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=Zs(t,i?s:null),l=!1;a?l=!0:s instanceof O?(a=Vo(t,s),l=!1):(a=O.EMPTY_NODE,l=!1);const c=ki(new Tt(a,l,!1),new Tt(s,i,!1));return new i_(e,c)}return o}function f_(n,e,t,s,i,r){const o=th(n,e,s,i,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),l_(o,t),c_(o,t)}function p_(n,e,t,s){const i=e._queryIdentifier,r=[];let o=[];const a=St(n);if(i==="default")for(const[l,c]of n.views.entries())o=o.concat(xl(c,t,s)),Nl(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=n.views.get(i);l&&(o=o.concat(xl(l,t,s)),Nl(l)&&(n.views.delete(i),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!St(n)&&r.push(new(h_())(e._repo,e._path)),{removed:r,events:o}}function nh(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function yt(n,e){let t=null;for(const s of n.views.values())t=t||a_(s,e);return t}function sh(n,e){if(e._queryParams.loadsAllData())return Ci(n);{const s=e._queryIdentifier;return n.views.get(s)}}function ih(n,e){return sh(n,e)!=null}function St(n){return Ci(n)!=null}function Ci(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let si;function g_(n){k(!si,"__referenceConstructor has already been defined"),si=n}function m_(){return k(si,"Reference.ts has not been loaded"),si}let __=1;class Ll{constructor(e){this.listenProvider_=e,this.syncPointTree_=new G(null),this.pendingWriteTree_=zm(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Go(n,e,t,s,i){return Dm(n.pendingWriteTree_,e,t,s,i),i?Cn(n,new Kt(Uo(),e,t)):[]}function y_(n,e,t,s){Lm(n.pendingWriteTree_,e,t,s);const i=G.fromObject(t);return Cn(n,new yn(Uo(),e,i))}function pt(n,e,t=!1){const s=Mm(n.pendingWriteTree_,e);if($m(n.pendingWriteTree_,e)){let r=new G(null);return s.snap!=null?r=r.set(W(),!0):de(s.children,o=>{r=r.set(new V(o),!0)}),Cn(n,new Qs(s.path,r,t))}else return[]}function ms(n,e,t){return Cn(n,new Kt(Wo(),e,t))}function w_(n,e,t){const s=G.fromObject(t);return Cn(n,new yn(Wo(),e,s))}function v_(n,e){return Cn(n,new is(Wo(),e))}function b_(n,e,t){const s=Jo(n,t);if(s){const i=Yo(s),r=i.path,o=i.queryId,a=pe(r,e),l=new is(Ho(o),a);return Qo(n,r,l)}else return[]}function ii(n,e,t,s,i=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||ih(o,e))){const l=p_(o,e,t,s);d_(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!i){const u=c.findIndex(d=>d._queryParams.loadsAllData())!==-1,h=n.syncPointTree_.findOnPath(r,(d,g)=>St(g));if(u&&!h){const d=n.syncPointTree_.subtree(r);if(!d.isEmpty()){const g=S_(d);for(let y=0;y<g.length;++y){const T=g[y],E=T.query,P=lh(n,T);n.listenProvider_.startListening(qn(E),rs(n,E),P.hashFn,P.onComplete)}}}!h&&c.length>0&&!s&&(u?n.listenProvider_.stopListening(qn(e),null):c.forEach(d=>{const g=n.queryToTagMap.get(Pi(d));n.listenProvider_.stopListening(qn(d),g)}))}k_(n,c)}return a}function rh(n,e,t,s){const i=Jo(n,s);if(i!=null){const r=Yo(i),o=r.path,a=r.queryId,l=pe(o,e),c=new Kt(Ho(a),l,t);return Qo(n,o,c)}else return[]}function E_(n,e,t,s){const i=Jo(n,s);if(i){const r=Yo(i),o=r.path,a=r.queryId,l=pe(o,e),c=G.fromObject(t),u=new yn(Ho(a),l,c);return Qo(n,o,u)}else return[]}function Qr(n,e,t,s=!1){const i=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(i,(d,g)=>{const y=pe(d,i);r=r||yt(g,y),o=o||St(g)});let a=n.syncPointTree_.get(i);a?(o=o||St(a),r=r||yt(a,W())):(a=new eh,n.syncPointTree_=n.syncPointTree_.set(i,a));let l;r!=null?l=!0:(l=!1,r=O.EMPTY_NODE,n.syncPointTree_.subtree(i).foreachChild((g,y)=>{const T=yt(y,W());T&&(r=r.updateImmediateChild(g,T))}));const c=ih(a,e);if(!c&&!e._queryParams.loadsAllData()){const d=Pi(e);k(!n.queryToTagMap.has(d),"View does not exist, but we have a tag");const g=I_();n.queryToTagMap.set(d,g),n.tagToQueryMap.set(g,d)}const u=Ii(n.pendingWriteTree_,i);let h=f_(a,e,t,u,r,l);if(!c&&!o&&!s){const d=sh(a,e);h=h.concat(C_(n,e,d))}return h}function Ai(n,e,t){const i=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=pe(o,e),c=yt(a,l);if(c)return c});return Gu(i,e,r,t,!0)}function T_(n,e){const t=e._path;let s=null;n.syncPointTree_.foreachOnPath(t,(c,u)=>{const h=pe(c,t);s=s||yt(u,h)});let i=n.syncPointTree_.get(t);i?s=s||yt(i,W()):(i=new eh,n.syncPointTree_=n.syncPointTree_.set(t,i));const r=s!=null,o=r?new Tt(s,!0,!1):null,a=Ii(n.pendingWriteTree_,e._path),l=th(i,e,a,r?o.getNode():O.EMPTY_NODE,r);return o_(l)}function Cn(n,e){return oh(e,n.syncPointTree_,null,Ii(n.pendingWriteTree_,W()))}function oh(n,e,t,s){if($(n.path))return ah(n,e,t,s);{const i=e.get(W());t==null&&i!=null&&(t=yt(i,W()));let r=[];const o=M(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,u=Ju(s,o);r=r.concat(oh(a,l,c,u))}return i&&(r=r.concat(Ko(i,n,s,t))),r}}function ah(n,e,t,s){const i=e.get(W());t==null&&i!=null&&(t=yt(i,W()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=Ju(s,o),u=n.operationForChild(o);u&&(r=r.concat(ah(u,a,l,c)))}),i&&(r=r.concat(Ko(i,n,s,t))),r}function lh(n,e){const t=e.query,s=rs(n,t);return{hashFn:()=>(r_(e)||O.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return s?b_(n,t._path,s):v_(n,t._path);{const r=wg(i,t);return ii(n,t,null,r)}}}}function rs(n,e){const t=Pi(e);return n.queryToTagMap.get(t)}function Pi(n){return n._path.toString()+"$"+n._queryIdentifier}function Jo(n,e){return n.tagToQueryMap.get(e)}function Yo(n){const e=n.indexOf("$");return k(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new V(n.substr(0,e))}}function Qo(n,e,t){const s=n.syncPointTree_.get(e);k(s,"Missing sync point for query tag that we're tracking");const i=Ii(n.pendingWriteTree_,e);return Ko(s,t,i,null)}function S_(n){return n.fold((e,t,s)=>{if(t&&St(t))return[Ci(t)];{let i=[];return t&&(i=nh(t)),de(s,(r,o)=>{i=i.concat(o)}),i}})}function qn(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(m_())(n._repo,n._path):n}function k_(n,e){for(let t=0;t<e.length;++t){const s=e[t];if(!s._queryParams.loadsAllData()){const i=Pi(s),r=n.queryToTagMap.get(i);n.queryToTagMap.delete(i),n.tagToQueryMap.delete(r)}}}function I_(){return __++}function C_(n,e,t){const s=e._path,i=rs(n,e),r=lh(n,t),o=n.listenProvider_.startListening(qn(e),i,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(s);if(i)k(!St(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,u,h)=>{if(!$(c)&&u&&St(u))return[Ci(u).query];{let d=[];return u&&(d=d.concat(nh(u).map(g=>g.query))),de(h,(g,y)=>{d=d.concat(y)}),d}});for(let c=0;c<l.length;++c){const u=l[c];n.listenProvider_.stopListening(qn(u),rs(n,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xo{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Xo(t)}node(){return this.node_}}class Zo{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=Q(this.path_,e);return new Zo(this.syncTree_,t)}node(){return Ai(this.syncTree_,this.path_)}}const A_=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Ml=function(n,e,t){if(!n||typeof n!="object")return n;if(k(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return P_(n[".sv"],e,t);if(typeof n[".sv"]=="object")return R_(n[".sv"],e);k(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},P_=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:k(!1,"Unexpected server value: "+n)}},R_=function(n,e,t){n.hasOwnProperty("increment")||k(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const s=n.increment;typeof s!="number"&&k(!1,"Unexpected increment value: "+s);const i=e.node();if(k(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return s;const o=i.getValue();return typeof o!="number"?s:o+s},ch=function(n,e,t,s){return ta(e,new Zo(t,n),s)},ea=function(n,e,t){return ta(n,new Xo(e),t)};function ta(n,e,t){const s=n.getPriority().val(),i=Ml(s,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=Ml(o.getValue(),e,t);return a!==o.getValue()||i!==o.getPriority().val()?new ae(a,ee(i)):n}else{const o=n;return r=o,i!==o.getPriority().val()&&(r=r.updatePriority(new ae(i))),o.forEachChild(Y,(a,l)=>{const c=ta(l,e.getImmediateChild(a),t);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class na{constructor(e="",t=null,s={children:{},childCount:0}){this.name=e,this.parent=t,this.node=s}}function Ri(n,e){let t=e instanceof V?e:new V(e),s=n,i=M(t);for(;i!==null;){const r=Vt(s.node.children,i)||{children:{},childCount:0};s=new na(i,s,r),t=J(t),i=M(t)}return s}function nn(n){return n.node.value}function sa(n,e){n.node.value=e,Xr(n)}function uh(n){return n.node.childCount>0}function O_(n){return nn(n)===void 0&&!uh(n)}function Oi(n,e){de(n.node.children,(t,s)=>{e(new na(t,n,s))})}function hh(n,e,t,s){t&&e(n),Oi(n,i=>{hh(i,e,!0)})}function N_(n,e,t){let s=n.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function _s(n){return new V(n.parent===null?n.name:_s(n.parent)+"/"+n.name)}function Xr(n){n.parent!==null&&x_(n.parent,n.name,n)}function x_(n,e,t){const s=O_(t),i=je(n.node.children,e);s&&i?(delete n.node.children[e],n.node.childCount--,Xr(n)):!s&&!i&&(n.node.children[e]=t.node,n.node.childCount++,Xr(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D_=/[\[\].#$\/\u0000-\u001F\u007F]/,L_=/[\[\].#$\u0000-\u001F\u007F]/,ur=10*1024*1024,ia=function(n){return typeof n=="string"&&n.length!==0&&!D_.test(n)},dh=function(n){return typeof n=="string"&&n.length!==0&&!L_.test(n)},M_=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),dh(n)},ri=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!Po(n)||n&&typeof n=="object"&&je(n,".sv")},ra=function(n,e,t,s){s&&e===void 0||ys(yi(n,"value"),e,t)},ys=function(n,e,t){const s=t instanceof V?new Zg(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+xt(s));if(typeof e=="function")throw new Error(n+"contains a function "+xt(s)+" with contents = "+e.toString());if(Po(e))throw new Error(n+"contains "+e.toString()+" "+xt(s));if(typeof e=="string"&&e.length>ur/3&&wi(e)>ur)throw new Error(n+"contains a string greater than "+ur+" utf8 bytes "+xt(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,r=!1;if(de(e,(o,a)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!ia(o)))throw new Error(n+" contains an invalid key ("+o+") "+xt(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);em(s,o),ys(n,a,s),tm(s)}),i&&r)throw new Error(n+' contains ".value" child '+xt(s)+" in addition to actual children.")}},$_=function(n,e){let t,s;for(t=0;t<e.length;t++){s=e[t];const r=es(s);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!ia(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+s.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(Xg);let i=null;for(t=0;t<e.length;t++){if(s=e[t],i!==null&&Ie(i,s))throw new Error(n+"contains a path "+i.toString()+" that is ancestor of another path "+s.toString());i=s}},F_=function(n,e,t,s){const i=yi(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(i+" must be an object containing the children to replace.");const r=[];de(e,(o,a)=>{const l=new V(o);if(ys(i,a,Q(t,l)),Do(l)===".priority"&&!ri(a))throw new Error(i+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),$_(i,r)},oa=function(n,e,t,s){if(!dh(t))throw new Error(yi(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},j_=function(n,e,t,s){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),oa(n,e,t)},Ni=function(n,e){if(M(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},B_=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!ia(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!M_(t))throw new Error(yi(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U_{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function xi(n,e){let t=null;for(let s=0;s<e.length;s++){const i=e[s],r=i.getPath();t!==null&&!Lo(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(i)}t&&n.eventLists_.push(t)}function fh(n,e,t){xi(n,t),ph(n,s=>Lo(s,e))}function Se(n,e,t){xi(n,t),ph(n,s=>Ie(s,e)||Ie(e,s))}function ph(n,e){n.recursionDepth_++;let t=!0;for(let s=0;s<n.eventLists_.length;s++){const i=n.eventLists_[s];if(i){const r=i.path;e(r)?(W_(n.eventLists_[s]),n.eventLists_[s]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function W_(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const s=t.getEventRunner();Un&&ce("event: "+t.toString()),In(s)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const H_="repo_interrupt",V_=25;class q_{constructor(e,t,s,i){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=s,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new U_,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Ys(),this.transactionQueueTree_=new na,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function z_(n,e,t){if(n.stats_=No(n.repoInfo_),n.forceRestClient_||Tg())n.server_=new Js(n.repoInfo_,(s,i,r,o)=>{$l(n,s,i,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>Fl(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{se(t)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}n.persistentConnection_=new rt(n.repoInfo_,e,(s,i,r,o)=>{$l(n,s,i,r,o)},s=>{Fl(n,s)},s=>{K_(n,s)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(s=>{n.server_.refreshAuthToken(s)}),n.appCheckProvider_.addTokenChangeListener(s=>{n.server_.refreshAppCheckToken(s.token)}),n.statsReporter_=Ag(n.repoInfo_,()=>new Am(n.stats_,n.server_)),n.infoData_=new Tm,n.infoSyncTree_=new Ll({startListening:(s,i,r,o)=>{let a=[];const l=n.infoData_.getNode(s._path);return l.isEmpty()||(a=ms(n.infoSyncTree_,s._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),aa(n,"connected",!1),n.serverSyncTree_=new Ll({startListening:(s,i,r,o)=>(n.server_.listen(s,r,i,(a,l)=>{const c=o(a,l);Se(n.eventQueue_,s._path,c)}),[]),stopListening:(s,i)=>{n.server_.unlisten(s,i)}})}function gh(n){const t=n.infoData_.getNode(new V(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function ws(n){return A_({timestamp:gh(n)})}function $l(n,e,t,s,i){n.dataUpdateCount++;const r=new V(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(i)if(s){const l=Us(t,c=>ee(c));o=E_(n.serverSyncTree_,r,l,i)}else{const l=ee(t);o=rh(n.serverSyncTree_,r,l,i)}else if(s){const l=Us(t,c=>ee(c));o=w_(n.serverSyncTree_,r,l)}else{const l=ee(t);o=ms(n.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=vn(n,r)),Se(n.eventQueue_,a,o)}function Fl(n,e){aa(n,"connected",e),e===!1&&Q_(n)}function K_(n,e){de(e,(t,s)=>{aa(n,t,s)})}function aa(n,e,t){const s=new V("/.info/"+e),i=ee(t);n.infoData_.updateSnapshot(s,i);const r=ms(n.infoSyncTree_,s,i);Se(n.eventQueue_,s,r)}function Di(n){return n.nextWriteId_++}function G_(n,e,t){const s=T_(n.serverSyncTree_,e);return s!=null?Promise.resolve(s):n.server_.get(e).then(i=>{const r=ee(i).withIndex(e._queryParams.getIndex());Qr(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=ms(n.serverSyncTree_,e._path,r);else{const a=rs(n.serverSyncTree_,e);o=rh(n.serverSyncTree_,e._path,r,a)}return Se(n.eventQueue_,e._path,o),ii(n.serverSyncTree_,e,t,null,!0),r},i=>(An(n,"get for query "+se(e)+" failed: "+i),Promise.reject(new Error(i))))}function J_(n,e,t,s,i){An(n,"set",{path:e.toString(),value:t,priority:s});const r=ws(n),o=ee(t,s),a=Ai(n.serverSyncTree_,e),l=ea(o,a,r),c=Di(n),u=Go(n.serverSyncTree_,e,l,c,!0);xi(n.eventQueue_,u),n.server_.put(e.toString(),o.val(!0),(d,g)=>{const y=d==="ok";y||me("set at "+e+" failed: "+d);const T=pt(n.serverSyncTree_,c,!y);Se(n.eventQueue_,e,T),Zr(n,i,d,g)});const h=ca(n,e);vn(n,h),Se(n.eventQueue_,h,[])}function Y_(n,e,t,s){An(n,"update",{path:e.toString(),value:t});let i=!0;const r=ws(n),o={};if(de(t,(a,l)=>{i=!1,o[a]=ch(Q(e,a),ee(l),n.serverSyncTree_,r)}),i)ce("update() called with empty data.  Don't do anything."),Zr(n,s,"ok",void 0);else{const a=Di(n),l=y_(n.serverSyncTree_,e,o,a);xi(n.eventQueue_,l),n.server_.merge(e.toString(),t,(c,u)=>{const h=c==="ok";h||me("update at "+e+" failed: "+c);const d=pt(n.serverSyncTree_,a,!h),g=d.length>0?vn(n,e):e;Se(n.eventQueue_,g,d),Zr(n,s,c,u)}),de(t,c=>{const u=ca(n,Q(e,c));vn(n,u)}),Se(n.eventQueue_,e,[])}}function Q_(n){An(n,"onDisconnectEvents");const e=ws(n),t=Ys();qr(n.onDisconnect_,W(),(i,r)=>{const o=ch(i,r,n.serverSyncTree_,e);Vu(t,i,o)});let s=[];qr(t,W(),(i,r)=>{s=s.concat(ms(n.serverSyncTree_,i,r));const o=ca(n,i);vn(n,o)}),n.onDisconnect_=Ys(),Se(n.eventQueue_,W(),s)}function X_(n,e,t){let s;M(e._path)===".info"?s=Qr(n.infoSyncTree_,e,t):s=Qr(n.serverSyncTree_,e,t),fh(n.eventQueue_,e._path,s)}function Z_(n,e,t){let s;M(e._path)===".info"?s=ii(n.infoSyncTree_,e,t):s=ii(n.serverSyncTree_,e,t),fh(n.eventQueue_,e._path,s)}function ey(n){n.persistentConnection_&&n.persistentConnection_.interrupt(H_)}function An(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),ce(t,...e)}function Zr(n,e,t,s){e&&In(()=>{if(t==="ok")e(null);else{const i=(t||"error").toUpperCase();let r=i;s&&(r+=": "+s);const o=new Error(r);o.code=i,e(o)}})}function ty(n,e,t,s,i,r){An(n,"transaction on "+e);const o={path:e,update:t,onComplete:s,status:null,order:fu(),applyLocally:r,retryCount:0,unwatcher:i,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},a=la(n,e,void 0);o.currentInputSnapshot=a;const l=o.update(a.val());if(l===void 0)o.unwatcher(),o.currentOutputSnapshotRaw=null,o.currentOutputSnapshotResolved=null,o.onComplete&&o.onComplete(null,!1,o.currentInputSnapshot);else{ys("transaction failed: Data returned ",l,o.path),o.status=0;const c=Ri(n.transactionQueueTree_,e),u=nn(c)||[];u.push(o),sa(c,u);let h;typeof l=="object"&&l!==null&&je(l,".priority")?(h=Vt(l,".priority"),k(ri(h),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):h=(Ai(n.serverSyncTree_,e)||O.EMPTY_NODE).getPriority().val();const d=ws(n),g=ee(l,h),y=ea(g,a,d);o.currentOutputSnapshotRaw=g,o.currentOutputSnapshotResolved=y,o.currentWriteId=Di(n);const T=Go(n.serverSyncTree_,e,y,o.currentWriteId,o.applyLocally);Se(n.eventQueue_,e,T),Li(n,n.transactionQueueTree_)}}function la(n,e,t){return Ai(n.serverSyncTree_,e,t)||O.EMPTY_NODE}function Li(n,e=n.transactionQueueTree_){if(e||Mi(n,e),nn(e)){const t=_h(n,e);k(t.length>0,"Sending zero length transaction queue"),t.every(i=>i.status===0)&&ny(n,_s(e),t)}else uh(e)&&Oi(e,t=>{Li(n,t)})}function ny(n,e,t){const s=t.map(c=>c.currentWriteId),i=la(n,e,s);let r=i;const o=i.hash();for(let c=0;c<t.length;c++){const u=t[c];k(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const h=pe(e,u.path);r=r.updateChild(h,u.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;n.server_.put(l.toString(),a,c=>{An(n,"transaction put response",{path:l.toString(),status:c});let u=[];if(c==="ok"){const h=[];for(let d=0;d<t.length;d++)t[d].status=2,u=u.concat(pt(n.serverSyncTree_,t[d].currentWriteId)),t[d].onComplete&&h.push(()=>t[d].onComplete(null,!0,t[d].currentOutputSnapshotResolved)),t[d].unwatcher();Mi(n,Ri(n.transactionQueueTree_,e)),Li(n,n.transactionQueueTree_),Se(n.eventQueue_,e,u);for(let d=0;d<h.length;d++)In(h[d])}else{if(c==="datastale")for(let h=0;h<t.length;h++)t[h].status===3?t[h].status=4:t[h].status=0;else{me("transaction at "+l.toString()+" failed: "+c);for(let h=0;h<t.length;h++)t[h].status=4,t[h].abortReason=c}vn(n,e)}},o)}function vn(n,e){const t=mh(n,e),s=_s(t),i=_h(n,t);return sy(n,i,s),s}function sy(n,e,t){if(e.length===0)return;const s=[];let i=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=pe(t,l.path);let u=!1,h;if(k(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)u=!0,h=l.abortReason,i=i.concat(pt(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=V_)u=!0,h="maxretry",i=i.concat(pt(n.serverSyncTree_,l.currentWriteId,!0));else{const d=la(n,l.path,o);l.currentInputSnapshot=d;const g=e[a].update(d.val());if(g!==void 0){ys("transaction failed: Data returned ",g,l.path);let y=ee(g);typeof g=="object"&&g!=null&&je(g,".priority")||(y=y.updatePriority(d.getPriority()));const E=l.currentWriteId,P=ws(n),D=ea(y,d,P);l.currentOutputSnapshotRaw=y,l.currentOutputSnapshotResolved=D,l.currentWriteId=Di(n),o.splice(o.indexOf(E),1),i=i.concat(Go(n.serverSyncTree_,l.path,D,l.currentWriteId,l.applyLocally)),i=i.concat(pt(n.serverSyncTree_,E,!0))}else u=!0,h="nodata",i=i.concat(pt(n.serverSyncTree_,l.currentWriteId,!0))}Se(n.eventQueue_,t,i),i=[],u&&(e[a].status=2,function(d){setTimeout(d,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(h==="nodata"?s.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):s.push(()=>e[a].onComplete(new Error(h),!1,null))))}Mi(n,n.transactionQueueTree_);for(let a=0;a<s.length;a++)In(s[a]);Li(n,n.transactionQueueTree_)}function mh(n,e){let t,s=n.transactionQueueTree_;for(t=M(e);t!==null&&nn(s)===void 0;)s=Ri(s,t),e=J(e),t=M(e);return s}function _h(n,e){const t=[];return yh(n,e,t),t.sort((s,i)=>s.order-i.order),t}function yh(n,e,t){const s=nn(e);if(s)for(let i=0;i<s.length;i++)t.push(s[i]);Oi(e,i=>{yh(n,i,t)})}function Mi(n,e){const t=nn(e);if(t){let s=0;for(let i=0;i<t.length;i++)t[i].status!==2&&(t[s]=t[i],s++);t.length=s,sa(e,t.length>0?t:void 0)}Oi(e,s=>{Mi(n,s)})}function ca(n,e){const t=_s(mh(n,e)),s=Ri(n.transactionQueueTree_,e);return N_(s,i=>{hr(n,i)}),hr(n,s),hh(s,i=>{hr(n,i)}),t}function hr(n,e){const t=nn(e);if(t){const s=[];let i=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(k(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(k(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),i=i.concat(pt(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&s.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?sa(e,void 0):t.length=r+1,Se(n.eventQueue_,_s(e),i);for(let o=0;o<s.length;o++)In(s[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iy(n){let e="";const t=n.split("/");for(let s=0;s<t.length;s++)if(t[s].length>0){let i=t[s];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function ry(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const s=t.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):me(`Invalid query segment '${t}' in query '${n}'`)}return e}const jl=function(n,e){const t=oy(n),s=t.namespace;t.domain==="firebase.com"&&ct(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&t.domain!=="localhost"&&ct("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||pg();const i=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Iu(t.host,t.secure,s,i,e,"",s!==t.subdomain),path:new V(t.pathString)}},oy=function(n){let e="",t="",s="",i="",r="",o=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let u=n.indexOf("/");u===-1&&(u=n.length);let h=n.indexOf("?");h===-1&&(h=n.length),e=n.substring(0,Math.min(u,h)),u<h&&(i=iy(n.substring(u,h)));const d=ry(n.substring(Math.min(n.length,h)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const g=e.slice(0,c);if(g.toLowerCase()==="localhost")t="localhost";else if(g.split(".").length<=2)t=g;else{const y=e.indexOf(".");s=e.substring(0,y).toLowerCase(),t=e.substring(y+1),r=s}"ns"in d&&(r=d.ns)}return{host:e,port:l,domain:t,subdomain:s,secure:o,scheme:a,pathString:i,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bl="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",ay=function(){let n=0;const e=[];return function(t){const s=t===n;n=t;let i;const r=new Array(8);for(i=7;i>=0;i--)r[i]=Bl.charAt(t%64),t=Math.floor(t/64);k(t===0,"Cannot push at time == 0");let o=r.join("");if(s){for(i=11;i>=0&&e[i]===63;i--)e[i]=0;e[i]++}else for(i=0;i<12;i++)e[i]=Math.floor(Math.random()*64);for(i=0;i<12;i++)o+=Bl.charAt(e[i]);return k(o.length===20,"nextPushId: Length should be 20."),o}}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ly{constructor(e,t,s,i){this.eventType=e,this.eventRegistration=t,this.snapshot=s,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+se(this.snapshot.exportVal())}}class cy{constructor(e,t,s){this.eventRegistration=e,this.error=t,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wh{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return k(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pn{constructor(e,t,s,i){this._repo=e,this._path=t,this._queryParams=s,this._orderByCalled=i}get key(){return $(this._path)?null:Do(this._path)}get ref(){return new Ge(this._repo,this._path)}get _queryIdentifier(){const e=kl(this._queryParams),t=Ro(e);return t==="{}"?"default":t}get _queryObject(){return kl(this._queryParams)}isEqual(e){if(e=ye(e),!(e instanceof Pn))return!1;const t=this._repo===e._repo,s=Lo(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return t&&s&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+Qg(this._path)}}function uy(n,e){if(n._orderByCalled===!0)throw new Error(e+": You can't combine multiple orderBy calls.")}function vh(n){let e=null,t=null;if(n.hasStart()&&(e=n.getIndexStartValue()),n.hasEnd()&&(t=n.getIndexEndValue()),n.getIndex()===Wt){const s="Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",i="Query: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string.";if(n.hasStart()){if(n.getIndexStartName()!==zt)throw new Error(s);if(typeof e!="string")throw new Error(i)}if(n.hasEnd()){if(n.getIndexEndName()!==bt)throw new Error(s);if(typeof t!="string")throw new Error(i)}}else if(n.getIndex()===Y){if(e!=null&&!ri(e)||t!=null&&!ri(t))throw new Error("Query: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string).")}else if(k(n.getIndex()instanceof Fo||n.getIndex()===Wu,"unknown index type."),e!=null&&typeof e=="object"||t!=null&&typeof t=="object")throw new Error("Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.")}function hy(n){if(n.hasStart()&&n.hasEnd()&&n.hasLimit()&&!n.hasAnchoredLimit())throw new Error("Query: Can't combine startAt(), startAfter(), endAt(), endBefore(), and limit(). Use limitToFirst() or limitToLast() instead.")}class Ge extends Pn{constructor(e,t){super(e,t,new Bo,!1)}get parent(){const e=Lu(this._path);return e===null?null:new Ge(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class bn{constructor(e,t,s){this._node=e,this.ref=t,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new V(e),s=os(this.ref,e);return new bn(this._node.getChild(t),s,Y)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,i)=>e(new bn(i,os(this.ref,s),Y)))}hasChild(e){const t=new V(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function A(n,e){return n=ye(n),n._checkNotDeleted("ref"),e!==void 0?os(n._root,e):n._root}function os(n,e){return n=ye(n),M(n._path)===null?j_("child","path",e):oa("child","path",e),new Ge(n._repo,Q(n._path,e))}function $i(n,e){n=ye(n),Ni("push",n._path),ra("push",e,n._path,!0);const t=gh(n._repo),s=ay(t),i=os(n,s),r=os(n,s);let o;return e!=null?o=Re(r,e).then(()=>r):o=Promise.resolve(r),i.then=o.then.bind(o),i.catch=o.then.bind(o,void 0),i}function _e(n){return Ni("remove",n._path),Re(n,null)}function Re(n,e){n=ye(n),Ni("set",n._path),ra("set",e,n._path,!1);const t=new Ve;return J_(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function qe(n,e){F_("update",e,n._path);const t=new Ve;return Y_(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function Z(n){n=ye(n);const e=new wh(()=>{}),t=new Fi(e);return G_(n._repo,n,t).then(s=>new bn(s,new Ge(n._repo,n._path),n._queryParams.getIndex()))}class Fi{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const s=t._queryParams.getIndex();return new ly("value",this,new bn(e.snapshotNode,new Ge(t._repo,t._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new cy(this,e,t):null}matches(e){return e instanceof Fi?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function dy(n,e,t,s,i){const r=new wh(t,void 0),o=new Fi(r);return X_(n._repo,n,o),()=>Z_(n._repo,n,o)}function ut(n,e,t,s){return dy(n,"value",e)}class ua{}class fy extends ua{constructor(e,t){super(),this._value=e,this._key=t,this.type="endAt"}_apply(e){ra("endAt",this._value,e._path,!0);const t=bm(e._queryParams,this._value,this._key);if(hy(t),vh(t),e._queryParams.hasEnd())throw new Error("endAt: Starting point was already set (by another call to endAt, endBefore or equalTo).");return new Pn(e._repo,e._path,t,e._orderByCalled)}}function py(n,e){return new fy(n,e)}class gy extends ua{constructor(e){super(),this._limit=e,this.type="limitToLast"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).");return new Pn(e._repo,e._path,vm(e._queryParams,this._limit),e._orderByCalled)}}function my(n){if(Math.floor(n)!==n||n<=0)throw new Error("limitToLast: First argument must be a positive integer.");return new gy(n)}class _y extends ua{constructor(e){super(),this._path=e,this.type="orderByChild"}_apply(e){uy(e,"orderByChild");const t=new V(this._path);if($(t))throw new Error("orderByChild: cannot pass in empty path. Use orderByValue() instead.");const s=new Fo(t),i=Em(e._queryParams,s);return vh(i),new Pn(e._repo,e._path,i,!0)}}function bh(n){if(n==="$key")throw new Error('orderByChild: "$key" is invalid.  Use orderByKey() instead.');if(n==="$priority")throw new Error('orderByChild: "$priority" is invalid.  Use orderByPriority() instead.');if(n==="$value")throw new Error('orderByChild: "$value" is invalid.  Use orderByValue() instead.');return oa("orderByChild","path",n),new _y(n)}function Eh(n,...e){let t=ye(n);for(const s of e)t=s._apply(t);return t}u_(Ge);g_(Ge);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yy="FIREBASE_DATABASE_EMULATOR_HOST",eo={};let wy=!1;function vy(n,e,t,s){const i=e.lastIndexOf(":"),r=e.substring(0,i),o=mi(r);n.repoInfo_=new Iu(e,o,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),s&&(n.authTokenProvider_=s)}function by(n,e,t,s,i){let r=s||n.options.databaseURL;r===void 0&&(n.options.projectId||ct("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),ce("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=jl(r,i),a=o.repoInfo,l;typeof process<"u"&&al&&(l=al[yy]),l?(r=`http://${l}?ns=${a.namespace}`,o=jl(r,i),a=o.repoInfo):o.repoInfo.secure;const c=new kg(n.name,n.options,e);B_("Invalid Firebase Database URL",o),$(o.path)||ct("Database URL must point to the root of a Firebase Database (not including a child path).");const u=Ty(a,n,c,new Sg(n,t));return new Sy(u,n)}function Ey(n,e){const t=eo[e];(!t||t[n.key]!==n)&&ct(`Database ${e}(${n.repoInfo_}) has already been deleted.`),ey(n),delete t[n.key]}function Ty(n,e,t,s){let i=eo[e.name];i||(i={},eo[e.name]=i);let r=i[n.toURLString()];return r&&ct("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new q_(n,wy,t,s),i[n.toURLString()]=r,r}class Sy{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(z_(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Ge(this._repo,W())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Ey(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&ct("Cannot call "+e+" on a deleted database.")}}function Th(n=Ei(),e){const t=Zt(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const s=Gc("database");s&&ky(t,...s)}return t}function ky(n,e,t,s={}){n=ye(n),n._checkNotDeleted("useEmulator");const i=`${e}:${t}`,r=n._repoInternal;if(n._instanceStarted){if(i===n._repoInternal.repoInfo_.host&&Ws(s,r.repoInfo_.emulatorOptions))return;ct("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)s.mockUserToken&&ct('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Ms(Ms.OWNER);else if(s.mockUserToken){const a=typeof s.mockUserToken=="string"?s.mockUserToken:Qc(s.mockUserToken,n.app.options.projectId);o=new Ms(a)}mi(e)&&(Yc(e),Xc("Database",!0)),vy(r,i,s,o)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Iy(n){cg(Io),Ae(new Te("database",(e,{instanceIdentifier:t})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return by(s,i,r,t)},"PUBLIC").setMultipleInstances(!0)),ge(ll,cl,n),ge(ll,cl,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cy={".sv":"timestamp"};function En(){return Cy}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ay{constructor(e,t){this.committed=e,this.snapshot=t}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function ji(n,e,t){if(n=ye(n),Ni("Reference.transaction",n._path),n.key===".length"||n.key===".keys")throw"Reference.transaction failed: "+n.key+" is a read-only object.";const s=(t==null?void 0:t.applyLocally)??!0,i=new Ve,r=(a,l,c)=>{let u=null;a?i.reject(a):(u=new bn(c,new Ge(n._repo,n._path),Y),i.resolve(new Ay(l,u)))},o=ut(n,()=>{});return ty(n._repo,n._path,e,r,o,s),i.promise}rt.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};rt.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};Iy();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sh="firebasestorage.googleapis.com",Py="storageBucket",Ry=2*60*1e3,Oy=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let It=class kh extends kt{constructor(e,t,s=0){super(dr(e),`Firebase Storage: ${t} (${dr(e)})`),this.status_=s,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,kh.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return dr(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}};var ze;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(ze||(ze={}));function dr(n){return"storage/"+n}function Ny(){const n="An unknown error occurred, please check the error payload for server response.";return new It(ze.UNKNOWN,n)}function xy(){return new It(ze.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function Dy(){return new It(ze.CANCELED,"User canceled the upload/download.")}function Ly(n){return new It(ze.INVALID_URL,"Invalid URL '"+n+"'.")}function My(n){return new It(ze.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function Ul(n){return new It(ze.INVALID_ARGUMENT,n)}function Ih(){return new It(ze.APP_DELETED,"The Firebase app was deleted.")}function $y(n){return new It(ze.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $e{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let s;try{s=$e.makeFromUrl(e,t)}catch{return new $e(e,"")}if(s.path==="")return s;throw My(e)}static makeFromUrl(e,t){let s=null;const i="([A-Za-z0-9.\\-_]+)";function r(N){N.path.charAt(N.path.length-1)==="/"&&(N.path_=N.path_.slice(0,-1))}const o="(/(.*))?$",a=new RegExp("^gs://"+i+o,"i"),l={bucket:1,path:3};function c(N){N.path_=decodeURIComponent(N.path)}const u="v[A-Za-z0-9_]+",h=t.replace(/[.]/g,"\\."),d="(/([^?#]*).*)?$",g=new RegExp(`^https?://${h}/${u}/b/${i}/o${d}`,"i"),y={bucket:1,path:3},T=t===Sh?"(?:storage.googleapis.com|storage.cloud.google.com)":t,E="([^?#]*)",P=new RegExp(`^https?://${T}/${i}/${E}`,"i"),I=[{regex:a,indices:l,postModify:r},{regex:g,indices:y,postModify:c},{regex:P,indices:{bucket:1,path:2},postModify:c}];for(let N=0;N<I.length;N++){const z=I[N],B=z.regex.exec(e);if(B){const _=B[z.indices.bucket];let f=B[z.indices.path];f||(f=""),s=new $e(_,f),z.postModify(s);break}}if(s==null)throw Ly(e);return s}}class Fy{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jy(n,e,t){let s=1,i=null,r=null,o=!1,a=0;function l(){return a===2}let c=!1;function u(...E){c||(c=!0,e.apply(null,E))}function h(E){i=setTimeout(()=>{i=null,n(g,l())},E)}function d(){r&&clearTimeout(r)}function g(E,...P){if(c){d();return}if(E){d(),u.call(null,E,...P);return}if(l()||o){d(),u.call(null,E,...P);return}s<64&&(s*=2);let I;a===1?(a=2,I=0):I=(s+Math.random())*1e3,h(I)}let y=!1;function T(E){y||(y=!0,d(),!c&&(i!==null?(E||(a=2),clearTimeout(i),h(0)):E||(a=1)))}return h(0),r=setTimeout(()=>{o=!0,T(!0)},t),T}function By(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uy(n){return n!==void 0}function Wl(n,e,t,s){if(s<e)throw Ul(`Invalid value for '${n}'. Expected ${e} or greater.`);if(s>t)throw Ul(`Invalid value for '${n}'. Expected ${t} or less.`)}function Wy(n){const e=encodeURIComponent;let t="?";for(const s in n)if(n.hasOwnProperty(s)){const i=e(s)+"="+e(n[s]);t=t+i+"&"}return t=t.slice(0,-1),t}var oi;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(oi||(oi={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hy(n,e){const t=n>=500&&n<600,i=[408,429].indexOf(n)!==-1,r=e.indexOf(n)!==-1;return t||i||r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vy{constructor(e,t,s,i,r,o,a,l,c,u,h,d=!0,g=!1){this.url_=e,this.method_=t,this.headers_=s,this.body_=i,this.successCodes_=r,this.additionalRetryCodes_=o,this.callback_=a,this.errorCallback_=l,this.timeout_=c,this.progressCallback_=u,this.connectionFactory_=h,this.retry=d,this.isUsingEmulator=g,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((y,T)=>{this.resolve_=y,this.reject_=T,this.start_()})}start_(){const e=(s,i)=>{if(i){s(!1,new ks(!1,null,!0));return}const r=this.connectionFactory_();this.pendingConnection_=r;const o=a=>{const l=a.loaded,c=a.lengthComputable?a.total:-1;this.progressCallback_!==null&&this.progressCallback_(l,c)};this.progressCallback_!==null&&r.addUploadProgressListener(o),r.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&r.removeUploadProgressListener(o),this.pendingConnection_=null;const a=r.getErrorCode()===oi.NO_ERROR,l=r.getStatus();if(!a||Hy(l,this.additionalRetryCodes_)&&this.retry){const u=r.getErrorCode()===oi.ABORT;s(!1,new ks(!1,null,u));return}const c=this.successCodes_.indexOf(l)!==-1;s(!0,new ks(c,r))})},t=(s,i)=>{const r=this.resolve_,o=this.reject_,a=i.connection;if(i.wasSuccessCode)try{const l=this.callback_(a,a.getResponse());Uy(l)?r(l):r()}catch(l){o(l)}else if(a!==null){const l=Ny();l.serverResponse=a.getErrorText(),this.errorCallback_?o(this.errorCallback_(a,l)):o(l)}else if(i.canceled){const l=this.appDelete_?Ih():Dy();o(l)}else{const l=xy();o(l)}};this.canceled_?t(!1,new ks(!1,null,!0)):this.backoffId_=jy(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&By(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class ks{constructor(e,t,s){this.wasSuccessCode=e,this.connection=t,this.canceled=!!s}}function qy(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function zy(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function Ky(n,e){e&&(n["X-Firebase-GMPID"]=e)}function Gy(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function Jy(n,e,t,s,i,r,o=!0,a=!1){const l=Wy(n.urlParams),c=n.url+l,u=Object.assign({},n.headers);return Ky(u,e),qy(u,t),zy(u,r),Gy(u,s),new Vy(c,n.method,u,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,i,o,a)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yy(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function Qy(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ai{constructor(e,t){this._service=e,t instanceof $e?this._location=t:this._location=$e.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new ai(e,t)}get root(){const e=new $e(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Qy(this._location.path)}get storage(){return this._service}get parent(){const e=Yy(this._location.path);if(e===null)return null;const t=new $e(this._location.bucket,e);return new ai(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw $y(e)}}function Hl(n,e){const t=e==null?void 0:e[Py];return t==null?null:$e.makeFromBucketSpec(t,n)}function Xy(n,e,t,s={}){n.host=`${e}:${t}`;const i=mi(e);i&&(Yc(`https://${n.host}/b`),Xc("Storage",!0)),n._isUsingEmulator=!0,n._protocol=i?"https":"http";const{mockUserToken:r}=s;r&&(n._overrideAuthToken=typeof r=="string"?r:Qc(r,n.app.options.projectId))}class Zy{constructor(e,t,s,i,r,o=!1){this.app=e,this._authProvider=t,this._appCheckProvider=s,this._url=i,this._firebaseVersion=r,this._isUsingEmulator=o,this._bucket=null,this._host=Sh,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Ry,this._maxUploadRetryTime=Oy,this._requests=new Set,i!=null?this._bucket=$e.makeFromBucketSpec(i,this._host):this._bucket=Hl(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=$e.makeFromBucketSpec(this._url,e):this._bucket=Hl(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Wl("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Wl("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(ko(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new ai(this,e)}_makeRequest(e,t,s,i,r=!0){if(this._deleted)return new Fy(Ih());{const o=Jy(e,this._appId,s,i,t,this._firebaseVersion,r,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[s,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,s,i).getPromise()}}const Vl="@firebase/storage",ql="0.14.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ch="storage";function ew(n=Ei(),e){n=ye(n);const s=Zt(n,Ch).getImmediate({identifier:e}),i=Gc("storage");return i&&tw(s,...i),s}function tw(n,e,t,s={}){Xy(n,e,t,s)}function nw(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),s=n.getProvider("auth-internal"),i=n.getProvider("app-check-internal");return new Zy(t,s,i,e,Io)}function sw(){Ae(new Te(Ch,nw,"PUBLIC").setMultipleInstances(!0)),ge(Vl,ql,""),ge(Vl,ql,"esm2020")}sw();const Ah="@firebase/installations",ha="0.6.19";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ph=1e4,Rh=`w:${ha}`,Oh="FIS_v2",iw="https://firebaseinstallations.googleapis.com/v1",rw=60*60*1e3,ow="installations",aw="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lw={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Jt=new hs(ow,aw,lw);function Nh(n){return n instanceof kt&&n.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xh({projectId:n}){return`${iw}/projects/${n}/installations`}function Dh(n){return{token:n.token,requestStatus:2,expiresIn:uw(n.expiresIn),creationTime:Date.now()}}async function Lh(n,e){const s=(await e.json()).error;return Jt.create("request-failed",{requestName:n,serverCode:s.code,serverMessage:s.message,serverStatus:s.status})}function Mh({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function cw(n,{refreshToken:e}){const t=Mh(n);return t.append("Authorization",hw(e)),t}async function $h(n){const e=await n();return e.status>=500&&e.status<600?n():e}function uw(n){return Number(n.replace("s","000"))}function hw(n){return`${Oh} ${n}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dw({appConfig:n,heartbeatServiceProvider:e},{fid:t}){const s=xh(n),i=Mh(n),r=e.getImmediate({optional:!0});if(r){const c=await r.getHeartbeatsHeader();c&&i.append("x-firebase-client",c)}const o={fid:t,authVersion:Oh,appId:n.appId,sdkVersion:Rh},a={method:"POST",headers:i,body:JSON.stringify(o)},l=await $h(()=>fetch(s,a));if(l.ok){const c=await l.json();return{fid:c.fid||t,registrationStatus:2,refreshToken:c.refreshToken,authToken:Dh(c.authToken)}}else throw await Lh("Create Installation",l)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fh(n){return new Promise(e=>{setTimeout(e,n)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fw(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pw=/^[cdef][\w-]{21}$/,to="";function gw(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const t=mw(n);return pw.test(t)?t:to}catch{return to}}function mw(n){return fw(n).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bi(n){return`${n.appName}!${n.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jh=new Map;function Bh(n,e){const t=Bi(n);Uh(t,e),_w(t,e)}function Uh(n,e){const t=jh.get(n);if(t)for(const s of t)s(e)}function _w(n,e){const t=yw();t&&t.postMessage({key:n,fid:e}),ww()}let Ft=null;function yw(){return!Ft&&"BroadcastChannel"in self&&(Ft=new BroadcastChannel("[Firebase] FID Change"),Ft.onmessage=n=>{Uh(n.data.key,n.data.fid)}),Ft}function ww(){jh.size===0&&Ft&&(Ft.close(),Ft=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vw="firebase-installations-database",bw=1,Yt="firebase-installations-store";let fr=null;function da(){return fr||(fr=bi(vw,bw,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(Yt)}}})),fr}async function li(n,e){const t=Bi(n),i=(await da()).transaction(Yt,"readwrite"),r=i.objectStore(Yt),o=await r.get(t);return await r.put(e,t),await i.done,(!o||o.fid!==e.fid)&&Bh(n,e.fid),e}async function Wh(n){const e=Bi(n),s=(await da()).transaction(Yt,"readwrite");await s.objectStore(Yt).delete(e),await s.done}async function Ui(n,e){const t=Bi(n),i=(await da()).transaction(Yt,"readwrite"),r=i.objectStore(Yt),o=await r.get(t),a=e(o);return a===void 0?await r.delete(t):await r.put(a,t),await i.done,a&&(!o||o.fid!==a.fid)&&Bh(n,a.fid),a}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fa(n){let e;const t=await Ui(n.appConfig,s=>{const i=Ew(s),r=Tw(n,i);return e=r.registrationPromise,r.installationEntry});return t.fid===to?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function Ew(n){const e=n||{fid:gw(),registrationStatus:0};return Hh(e)}function Tw(n,e){if(e.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject(Jt.create("app-offline"));return{installationEntry:e,registrationPromise:i}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},s=Sw(n,t);return{installationEntry:t,registrationPromise:s}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:kw(n)}:{installationEntry:e}}async function Sw(n,e){try{const t=await dw(n,e);return li(n.appConfig,t)}catch(t){throw Nh(t)&&t.customData.serverCode===409?await Wh(n.appConfig):await li(n.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function kw(n){let e=await zl(n.appConfig);for(;e.registrationStatus===1;)await Fh(100),e=await zl(n.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:s}=await fa(n);return s||t}return e}function zl(n){return Ui(n,e=>{if(!e)throw Jt.create("installation-not-found");return Hh(e)})}function Hh(n){return Iw(n)?{fid:n.fid,registrationStatus:0}:n}function Iw(n){return n.registrationStatus===1&&n.registrationTime+Ph<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cw({appConfig:n,heartbeatServiceProvider:e},t){const s=Aw(n,t),i=cw(n,t),r=e.getImmediate({optional:!0});if(r){const c=await r.getHeartbeatsHeader();c&&i.append("x-firebase-client",c)}const o={installation:{sdkVersion:Rh,appId:n.appId}},a={method:"POST",headers:i,body:JSON.stringify(o)},l=await $h(()=>fetch(s,a));if(l.ok){const c=await l.json();return Dh(c)}else throw await Lh("Generate Auth Token",l)}function Aw(n,{fid:e}){return`${xh(n)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pa(n,e=!1){let t;const s=await Ui(n.appConfig,r=>{if(!Vh(r))throw Jt.create("not-registered");const o=r.authToken;if(!e&&Ow(o))return r;if(o.requestStatus===1)return t=Pw(n,e),r;{if(!navigator.onLine)throw Jt.create("app-offline");const a=xw(r);return t=Rw(n,a),a}});return t?await t:s.authToken}async function Pw(n,e){let t=await Kl(n.appConfig);for(;t.authToken.requestStatus===1;)await Fh(100),t=await Kl(n.appConfig);const s=t.authToken;return s.requestStatus===0?pa(n,e):s}function Kl(n){return Ui(n,e=>{if(!Vh(e))throw Jt.create("not-registered");const t=e.authToken;return Dw(t)?{...e,authToken:{requestStatus:0}}:e})}async function Rw(n,e){try{const t=await Cw(n,e),s={...e,authToken:t};return await li(n.appConfig,s),t}catch(t){if(Nh(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await Wh(n.appConfig);else{const s={...e,authToken:{requestStatus:0}};await li(n.appConfig,s)}throw t}}function Vh(n){return n!==void 0&&n.registrationStatus===2}function Ow(n){return n.requestStatus===2&&!Nw(n)}function Nw(n){const e=Date.now();return e<n.creationTime||n.creationTime+n.expiresIn<e+rw}function xw(n){const e={requestStatus:1,requestTime:Date.now()};return{...n,authToken:e}}function Dw(n){return n.requestStatus===1&&n.requestTime+Ph<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lw(n){const e=n,{installationEntry:t,registrationPromise:s}=await fa(e);return s?s.catch(console.error):pa(e).catch(console.error),t.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mw(n,e=!1){const t=n;return await $w(t),(await pa(t,e)).token}async function $w(n){const{registrationPromise:e}=await fa(n);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fw(n){if(!n||!n.options)throw pr("App Configuration");if(!n.name)throw pr("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!n.options[t])throw pr(t);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function pr(n){return Jt.create("missing-app-config-values",{valueName:n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qh="installations",jw="installations-internal",Bw=n=>{const e=n.getProvider("app").getImmediate(),t=Fw(e),s=Zt(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:s,_delete:()=>Promise.resolve()}},Uw=n=>{const e=n.getProvider("app").getImmediate(),t=Zt(e,qh).getImmediate();return{getId:()=>Lw(t),getToken:i=>Mw(t,i)}};function Ww(){Ae(new Te(qh,Bw,"PUBLIC")),Ae(new Te(jw,Uw,"PRIVATE"))}Ww();ge(Ah,ha);ge(Ah,ha,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hw="/firebase-messaging-sw.js",Vw="/firebase-cloud-messaging-push-scope",zh="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",qw="https://fcmregistrations.googleapis.com/v1",Kh="google.c.a.c_id",zw="google.c.a.c_l",Kw="google.c.a.ts",Gw="google.c.a.e",Gl=1e4;var Jl;(function(n){n[n.DATA_MESSAGE=1]="DATA_MESSAGE",n[n.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(Jl||(Jl={}));/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */var as;(function(n){n.PUSH_RECEIVED="push-received",n.NOTIFICATION_CLICKED="notification-clicked"})(as||(as={}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qe(n){const e=new Uint8Array(n);return btoa(String.fromCharCode(...e)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function Jw(n){const e="=".repeat((4-n.length%4)%4),t=(n+e).replace(/\-/g,"+").replace(/_/g,"/"),s=atob(t),i=new Uint8Array(s.length);for(let r=0;r<s.length;++r)i[r]=s.charCodeAt(r);return i}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gr="fcm_token_details_db",Yw=5,Yl="fcm_token_object_Store";async function Qw(n){if("databases"in indexedDB&&!(await indexedDB.databases()).map(r=>r.name).includes(gr))return null;let e=null;return(await bi(gr,Yw,{upgrade:async(s,i,r,o)=>{if(i<2||!s.objectStoreNames.contains(Yl))return;const a=o.objectStore(Yl),l=await a.index("fcmSenderId").get(n);if(await a.clear(),!!l){if(i===2){const c=l;if(!c.auth||!c.p256dh||!c.endpoint)return;e={token:c.fcmToken,createTime:c.createTime??Date.now(),subscriptionOptions:{auth:c.auth,p256dh:c.p256dh,endpoint:c.endpoint,swScope:c.swScope,vapidKey:typeof c.vapidKey=="string"?c.vapidKey:Qe(c.vapidKey)}}}else if(i===3){const c=l;e={token:c.fcmToken,createTime:c.createTime,subscriptionOptions:{auth:Qe(c.auth),p256dh:Qe(c.p256dh),endpoint:c.endpoint,swScope:c.swScope,vapidKey:Qe(c.vapidKey)}}}else if(i===4){const c=l;e={token:c.fcmToken,createTime:c.createTime,subscriptionOptions:{auth:Qe(c.auth),p256dh:Qe(c.p256dh),endpoint:c.endpoint,swScope:c.swScope,vapidKey:Qe(c.vapidKey)}}}}}})).close(),await tr(gr),await tr("fcm_vapid_details_db"),await tr("undefined"),Xw(e)?e:null}function Xw(n){if(!n||!n.subscriptionOptions)return!1;const{subscriptionOptions:e}=n;return typeof n.createTime=="number"&&n.createTime>0&&typeof n.token=="string"&&n.token.length>0&&typeof e.auth=="string"&&e.auth.length>0&&typeof e.p256dh=="string"&&e.p256dh.length>0&&typeof e.endpoint=="string"&&e.endpoint.length>0&&typeof e.swScope=="string"&&e.swScope.length>0&&typeof e.vapidKey=="string"&&e.vapidKey.length>0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zw="firebase-messaging-database",ev=1,Qt="firebase-messaging-store";let mr=null;function ga(){return mr||(mr=bi(Zw,ev,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(Qt)}}})),mr}async function Gh(n){const e=_a(n),s=await(await ga()).transaction(Qt).objectStore(Qt).get(e);if(s)return s;{const i=await Qw(n.appConfig.senderId);if(i)return await ma(n,i),i}}async function ma(n,e){const t=_a(n),i=(await ga()).transaction(Qt,"readwrite");return await i.objectStore(Qt).put(e,t),await i.done,e}async function tv(n){const e=_a(n),s=(await ga()).transaction(Qt,"readwrite");await s.objectStore(Qt).delete(e),await s.done}function _a({appConfig:n}){return n.appId}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nv={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},he=new hs("messaging","Messaging",nv);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sv(n,e){const t=await wa(n),s=Yh(e),i={method:"POST",headers:t,body:JSON.stringify(s)};let r;try{r=await(await fetch(ya(n.appConfig),i)).json()}catch(o){throw he.create("token-subscribe-failed",{errorInfo:o==null?void 0:o.toString()})}if(r.error){const o=r.error.message;throw he.create("token-subscribe-failed",{errorInfo:o})}if(!r.token)throw he.create("token-subscribe-no-token");return r.token}async function iv(n,e){const t=await wa(n),s=Yh(e.subscriptionOptions),i={method:"PATCH",headers:t,body:JSON.stringify(s)};let r;try{r=await(await fetch(`${ya(n.appConfig)}/${e.token}`,i)).json()}catch(o){throw he.create("token-update-failed",{errorInfo:o==null?void 0:o.toString()})}if(r.error){const o=r.error.message;throw he.create("token-update-failed",{errorInfo:o})}if(!r.token)throw he.create("token-update-no-token");return r.token}async function Jh(n,e){const s={method:"DELETE",headers:await wa(n)};try{const r=await(await fetch(`${ya(n.appConfig)}/${e}`,s)).json();if(r.error){const o=r.error.message;throw he.create("token-unsubscribe-failed",{errorInfo:o})}}catch(i){throw he.create("token-unsubscribe-failed",{errorInfo:i==null?void 0:i.toString()})}}function ya({projectId:n}){return`${qw}/projects/${n}/registrations`}async function wa({appConfig:n,installations:e}){const t=await e.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n.apiKey,"x-goog-firebase-installations-auth":`FIS ${t}`})}function Yh({p256dh:n,auth:e,endpoint:t,vapidKey:s}){const i={web:{endpoint:t,auth:e,p256dh:n}};return s!==zh&&(i.web.applicationPubKey=s),i}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rv=7*24*60*60*1e3;async function ov(n){const e=await cv(n.swRegistration,n.vapidKey),t={vapidKey:n.vapidKey,swScope:n.swRegistration.scope,endpoint:e.endpoint,auth:Qe(e.getKey("auth")),p256dh:Qe(e.getKey("p256dh"))},s=await Gh(n.firebaseDependencies);if(s){if(uv(s.subscriptionOptions,t))return Date.now()>=s.createTime+rv?lv(n,{token:s.token,createTime:Date.now(),subscriptionOptions:t}):s.token;try{await Jh(n.firebaseDependencies,s.token)}catch(i){console.warn(i)}return Ql(n.firebaseDependencies,t)}else return Ql(n.firebaseDependencies,t)}async function av(n){const e=await Gh(n.firebaseDependencies);e&&(await Jh(n.firebaseDependencies,e.token),await tv(n.firebaseDependencies));const t=await n.swRegistration.pushManager.getSubscription();return t?t.unsubscribe():!0}async function lv(n,e){try{const t=await iv(n.firebaseDependencies,e),s={...e,token:t,createTime:Date.now()};return await ma(n.firebaseDependencies,s),t}catch(t){throw t}}async function Ql(n,e){const s={token:await sv(n,e),createTime:Date.now(),subscriptionOptions:e};return await ma(n,s),s.token}async function cv(n,e){const t=await n.pushManager.getSubscription();return t||n.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:Jw(e)})}function uv(n,e){const t=e.vapidKey===n.vapidKey,s=e.endpoint===n.endpoint,i=e.auth===n.auth,r=e.p256dh===n.p256dh;return t&&s&&i&&r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xl(n){const e={from:n.from,collapseKey:n.collapse_key,messageId:n.fcmMessageId};return hv(e,n),dv(e,n),fv(e,n),e}function hv(n,e){if(!e.notification)return;n.notification={};const t=e.notification.title;t&&(n.notification.title=t);const s=e.notification.body;s&&(n.notification.body=s);const i=e.notification.image;i&&(n.notification.image=i);const r=e.notification.icon;r&&(n.notification.icon=r)}function dv(n,e){e.data&&(n.data=e.data)}function fv(n,e){var i,r,o,a;if(!e.fcmOptions&&!((i=e.notification)!=null&&i.click_action))return;n.fcmOptions={};const t=((r=e.fcmOptions)==null?void 0:r.link)??((o=e.notification)==null?void 0:o.click_action);t&&(n.fcmOptions.link=t);const s=(a=e.fcmOptions)==null?void 0:a.analytics_label;s&&(n.fcmOptions.analyticsLabel=s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pv(n){return typeof n=="object"&&!!n&&Kh in n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gv(n){if(!n||!n.options)throw _r("App Configuration Object");if(!n.name)throw _r("App Name");const e=["projectId","apiKey","appId","messagingSenderId"],{options:t}=n;for(const s of e)if(!t[s])throw _r(s);return{appName:n.name,projectId:t.projectId,apiKey:t.apiKey,appId:t.appId,senderId:t.messagingSenderId}}function _r(n){return he.create("missing-app-config-values",{valueName:n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mv{constructor(e,t,s){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const i=gv(e);this.firebaseDependencies={app:e,appConfig:i,installations:t,analyticsProvider:s}}_delete(){return Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qh(n){try{n.swRegistration=await navigator.serviceWorker.register(Hw,{scope:Vw}),n.swRegistration.update().catch(()=>{}),await _v(n.swRegistration)}catch(e){throw he.create("failed-service-worker-registration",{browserErrorMessage:e==null?void 0:e.message})}}async function _v(n){return new Promise((e,t)=>{const s=setTimeout(()=>t(new Error(`Service worker not registered after ${Gl} ms`)),Gl),i=n.installing||n.waiting;n.active?(clearTimeout(s),e()):i?i.onstatechange=r=>{var o;((o=r.target)==null?void 0:o.state)==="activated"&&(i.onstatechange=null,clearTimeout(s),e())}:(clearTimeout(s),t(new Error("No incoming service worker found.")))})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yv(n,e){if(!e&&!n.swRegistration&&await Qh(n),!(!e&&n.swRegistration)){if(!(e instanceof ServiceWorkerRegistration))throw he.create("invalid-sw-registration");n.swRegistration=e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wv(n,e){e?n.vapidKey=e:n.vapidKey||(n.vapidKey=zh)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xh(n,e){if(!navigator)throw he.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw he.create("permission-blocked");return await wv(n,e==null?void 0:e.vapidKey),await yv(n,e==null?void 0:e.serviceWorkerRegistration),ov(n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vv(n,e,t){const s=bv(e);(await n.firebaseDependencies.analyticsProvider.get()).logEvent(s,{message_id:t[Kh],message_name:t[zw],message_time:t[Kw],message_device_time:Math.floor(Date.now()/1e3)})}function bv(n){switch(n){case as.NOTIFICATION_CLICKED:return"notification_open";case as.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ev(n,e){const t=e.data;if(!t.isFirebaseMessaging)return;n.onMessageHandler&&t.messageType===as.PUSH_RECEIVED&&(typeof n.onMessageHandler=="function"?n.onMessageHandler(Xl(t)):n.onMessageHandler.next(Xl(t)));const s=t.data;pv(s)&&s[Gw]==="1"&&await vv(n,t.messageType,s)}const Zl="@firebase/messaging",ec="0.12.23";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tv=n=>{const e=new mv(n.getProvider("app").getImmediate(),n.getProvider("installations-internal").getImmediate(),n.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",t=>Ev(e,t)),e},Sv=n=>{const e=n.getProvider("messaging").getImmediate();return{getToken:s=>Xh(e,s)}};function kv(){Ae(new Te("messaging",Tv,"PUBLIC")),Ae(new Te("messaging-internal",Sv,"PRIVATE")),ge(Zl,ec),ge(Zl,ec,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wi(){try{await eu()}catch{return!1}return typeof window<"u"&&_i()&&bf()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Iv(n){if(!navigator)throw he.create("only-available-in-window");return n.swRegistration||await Qh(n),av(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cv(n,e){if(!navigator)throw he.create("only-available-in-window");return n.onMessageHandler=e,()=>{n.onMessageHandler=null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hi(n=Ei()){return Wi().then(e=>{if(!e)throw he.create("unsupported-browser")},e=>{throw he.create("indexed-db-unsupported")}),Zt(ye(n),"messaging").getImmediate()}async function Zh(n,e){return n=ye(n),Xh(n,e)}function Av(n){return n=ye(n),Iv(n)}function Pv(n,e){return n=ye(n),Cv(n,e)}kv();const Rv={apiKey:"AIzaSyC-jTMiDjHNTC6cvSKUU44mVbWwT-ToLxQ",authDomain:"mister-x-d6b59.firebaseapp.com",databaseURL:"https://mister-x-d6b59-default-rtdb.europe-west1.firebasedatabase.app",projectId:"mister-x-d6b59",storageBucket:"mister-x-d6b59.firebasestorage.app",messagingSenderId:"616391598963",appId:"1:616391598963:web:da07882b0f481d3000db06",measurementId:"G-W66SK677NG"},Ct=iu(Rv),R=Th(Ct);ew(Ct);Hi(Ct);const Ov="modulepreload",Nv=function(n){return"/Mister-X/"+n},tc={},vs=function(e,t,s){let i=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));i=Promise.allSettled(t.map(l=>{if(l=Nv(l),l in tc)return;tc[l]=!0;const c=l.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const h=document.createElement("link");if(h.rel=c?"stylesheet":Ov,c||(h.as="script"),h.crossOrigin="",h.href=l,a&&h.setAttribute("nonce",a),document.head.appendChild(h),c)return new Promise((d,g)=>{h.addEventListener("load",d),h.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return e().catch(r)})},xv=n=>{let e;return n?e=n:typeof fetch>"u"?e=(...t)=>vs(async()=>{const{default:s}=await Promise.resolve().then(()=>Rn);return{default:s}},void 0).then(({default:s})=>s(...t)):e=fetch,(...t)=>e(...t)};class va extends Error{constructor(e,t="FunctionsError",s){super(e),this.name=t,this.context=s}}class Dv extends va{constructor(e){super("Failed to send a request to the Edge Function","FunctionsFetchError",e)}}class nc extends va{constructor(e){super("Relay Error invoking the Edge Function","FunctionsRelayError",e)}}class sc extends va{constructor(e){super("Edge Function returned a non-2xx status code","FunctionsHttpError",e)}}var no;(function(n){n.Any="any",n.ApNortheast1="ap-northeast-1",n.ApNortheast2="ap-northeast-2",n.ApSouth1="ap-south-1",n.ApSoutheast1="ap-southeast-1",n.ApSoutheast2="ap-southeast-2",n.CaCentral1="ca-central-1",n.EuCentral1="eu-central-1",n.EuWest1="eu-west-1",n.EuWest2="eu-west-2",n.EuWest3="eu-west-3",n.SaEast1="sa-east-1",n.UsEast1="us-east-1",n.UsWest1="us-west-1",n.UsWest2="us-west-2"})(no||(no={}));var Lv=function(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{c(s.next(u))}catch(h){o(h)}}function l(u){try{c(s.throw(u))}catch(h){o(h)}}function c(u){u.done?r(u.value):i(u.value).then(a,l)}c((s=s.apply(n,e||[])).next())})};class Mv{constructor(e,{headers:t={},customFetch:s,region:i=no.Any}={}){this.url=e,this.headers=t,this.region=i,this.fetch=xv(s)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e,t={}){var s;return Lv(this,void 0,void 0,function*(){try{const{headers:i,method:r,body:o}=t;let a={},{region:l}=t;l||(l=this.region);const c=new URL(`${this.url}/${e}`);l&&l!=="any"&&(a["x-region"]=l,c.searchParams.set("forceFunctionRegion",l));let u;o&&(i&&!Object.prototype.hasOwnProperty.call(i,"Content-Type")||!i)&&(typeof Blob<"u"&&o instanceof Blob||o instanceof ArrayBuffer?(a["Content-Type"]="application/octet-stream",u=o):typeof o=="string"?(a["Content-Type"]="text/plain",u=o):typeof FormData<"u"&&o instanceof FormData?u=o:(a["Content-Type"]="application/json",u=JSON.stringify(o)));const h=yield this.fetch(c.toString(),{method:r||"POST",headers:Object.assign(Object.assign(Object.assign({},a),this.headers),i),body:u}).catch(T=>{throw new Dv(T)}),d=h.headers.get("x-relay-error");if(d&&d==="true")throw new nc(h);if(!h.ok)throw new sc(h);let g=((s=h.headers.get("Content-Type"))!==null&&s!==void 0?s:"text/plain").split(";")[0].trim(),y;return g==="application/json"?y=yield h.json():g==="application/octet-stream"?y=yield h.blob():g==="text/event-stream"?y=h:g==="multipart/form-data"?y=yield h.formData():y=yield h.text(),{data:y,error:null,response:h}}catch(i){return{data:null,error:i,response:i instanceof sc||i instanceof nc?i.context:void 0}}})}}var Pe=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function $v(n){if(n.__esModule)return n;var e=n.default;if(typeof e=="function"){var t=function s(){return this instanceof s?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};t.prototype=e.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(n).forEach(function(s){var i=Object.getOwnPropertyDescriptor(n,s);Object.defineProperty(t,s,i.get?i:{enumerable:!0,get:function(){return n[s]}})}),t}var ve={},ba={},Vi={},bs={},qi={},zi={},Fv=function(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("unable to locate global object")},Tn=Fv();const jv=Tn.fetch,ed=Tn.fetch.bind(Tn),td=Tn.Headers,Bv=Tn.Request,Uv=Tn.Response,Rn=Object.freeze(Object.defineProperty({__proto__:null,Headers:td,Request:Bv,Response:Uv,default:ed,fetch:jv},Symbol.toStringTag,{value:"Module"})),Wv=$v(Rn);var Ki={};Object.defineProperty(Ki,"__esModule",{value:!0});let Hv=class extends Error{constructor(e){super(e.message),this.name="PostgrestError",this.details=e.details,this.hint=e.hint,this.code=e.code}};Ki.default=Hv;var nd=Pe&&Pe.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(zi,"__esModule",{value:!0});const Vv=nd(Wv),qv=nd(Ki);let zv=class{constructor(e){this.shouldThrowOnError=!1,this.method=e.method,this.url=e.url,this.headers=e.headers,this.schema=e.schema,this.body=e.body,this.shouldThrowOnError=e.shouldThrowOnError,this.signal=e.signal,this.isMaybeSingle=e.isMaybeSingle,e.fetch?this.fetch=e.fetch:typeof fetch>"u"?this.fetch=Vv.default:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(e,t){return this.headers=Object.assign({},this.headers),this.headers[e]=t,this}then(e,t){this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers["Accept-Profile"]=this.schema:this.headers["Content-Profile"]=this.schema),this.method!=="GET"&&this.method!=="HEAD"&&(this.headers["Content-Type"]="application/json");const s=this.fetch;let i=s(this.url.toString(),{method:this.method,headers:this.headers,body:JSON.stringify(this.body),signal:this.signal}).then(async r=>{var o,a,l;let c=null,u=null,h=null,d=r.status,g=r.statusText;if(r.ok){if(this.method!=="HEAD"){const P=await r.text();P===""||(this.headers.Accept==="text/csv"||this.headers.Accept&&this.headers.Accept.includes("application/vnd.pgrst.plan+text")?u=P:u=JSON.parse(P))}const T=(o=this.headers.Prefer)===null||o===void 0?void 0:o.match(/count=(exact|planned|estimated)/),E=(a=r.headers.get("content-range"))===null||a===void 0?void 0:a.split("/");T&&E&&E.length>1&&(h=parseInt(E[1])),this.isMaybeSingle&&this.method==="GET"&&Array.isArray(u)&&(u.length>1?(c={code:"PGRST116",details:`Results contain ${u.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},u=null,h=null,d=406,g="Not Acceptable"):u.length===1?u=u[0]:u=null)}else{const T=await r.text();try{c=JSON.parse(T),Array.isArray(c)&&r.status===404&&(u=[],c=null,d=200,g="OK")}catch{r.status===404&&T===""?(d=204,g="No Content"):c={message:T}}if(c&&this.isMaybeSingle&&(!((l=c==null?void 0:c.details)===null||l===void 0)&&l.includes("0 rows"))&&(c=null,d=200,g="OK"),c&&this.shouldThrowOnError)throw new qv.default(c)}return{error:c,data:u,count:h,status:d,statusText:g}});return this.shouldThrowOnError||(i=i.catch(r=>{var o,a,l;return{error:{message:`${(o=r==null?void 0:r.name)!==null&&o!==void 0?o:"FetchError"}: ${r==null?void 0:r.message}`,details:`${(a=r==null?void 0:r.stack)!==null&&a!==void 0?a:""}`,hint:"",code:`${(l=r==null?void 0:r.code)!==null&&l!==void 0?l:""}`},data:null,count:null,status:0,statusText:""}})),i.then(e,t)}returns(){return this}overrideTypes(){return this}};zi.default=zv;var Kv=Pe&&Pe.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(qi,"__esModule",{value:!0});const Gv=Kv(zi);let Jv=class extends Gv.default{select(e){let t=!1;const s=(e??"*").split("").map(i=>/\s/.test(i)&&!t?"":(i==='"'&&(t=!t),i)).join("");return this.url.searchParams.set("select",s),this.headers.Prefer&&(this.headers.Prefer+=","),this.headers.Prefer+="return=representation",this}order(e,{ascending:t=!0,nullsFirst:s,foreignTable:i,referencedTable:r=i}={}){const o=r?`${r}.order`:"order",a=this.url.searchParams.get(o);return this.url.searchParams.set(o,`${a?`${a},`:""}${e}.${t?"asc":"desc"}${s===void 0?"":s?".nullsfirst":".nullslast"}`),this}limit(e,{foreignTable:t,referencedTable:s=t}={}){const i=typeof s>"u"?"limit":`${s}.limit`;return this.url.searchParams.set(i,`${e}`),this}range(e,t,{foreignTable:s,referencedTable:i=s}={}){const r=typeof i>"u"?"offset":`${i}.offset`,o=typeof i>"u"?"limit":`${i}.limit`;return this.url.searchParams.set(r,`${e}`),this.url.searchParams.set(o,`${t-e+1}`),this}abortSignal(e){return this.signal=e,this}single(){return this.headers.Accept="application/vnd.pgrst.object+json",this}maybeSingle(){return this.method==="GET"?this.headers.Accept="application/json":this.headers.Accept="application/vnd.pgrst.object+json",this.isMaybeSingle=!0,this}csv(){return this.headers.Accept="text/csv",this}geojson(){return this.headers.Accept="application/geo+json",this}explain({analyze:e=!1,verbose:t=!1,settings:s=!1,buffers:i=!1,wal:r=!1,format:o="text"}={}){var a;const l=[e?"analyze":null,t?"verbose":null,s?"settings":null,i?"buffers":null,r?"wal":null].filter(Boolean).join("|"),c=(a=this.headers.Accept)!==null&&a!==void 0?a:"application/json";return this.headers.Accept=`application/vnd.pgrst.plan+${o}; for="${c}"; options=${l};`,o==="json"?this:this}rollback(){var e;return((e=this.headers.Prefer)!==null&&e!==void 0?e:"").trim().length>0?this.headers.Prefer+=",tx=rollback":this.headers.Prefer="tx=rollback",this}returns(){return this}};qi.default=Jv;var Yv=Pe&&Pe.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(bs,"__esModule",{value:!0});const Qv=Yv(qi);let Xv=class extends Qv.default{eq(e,t){return this.url.searchParams.append(e,`eq.${t}`),this}neq(e,t){return this.url.searchParams.append(e,`neq.${t}`),this}gt(e,t){return this.url.searchParams.append(e,`gt.${t}`),this}gte(e,t){return this.url.searchParams.append(e,`gte.${t}`),this}lt(e,t){return this.url.searchParams.append(e,`lt.${t}`),this}lte(e,t){return this.url.searchParams.append(e,`lte.${t}`),this}like(e,t){return this.url.searchParams.append(e,`like.${t}`),this}likeAllOf(e,t){return this.url.searchParams.append(e,`like(all).{${t.join(",")}}`),this}likeAnyOf(e,t){return this.url.searchParams.append(e,`like(any).{${t.join(",")}}`),this}ilike(e,t){return this.url.searchParams.append(e,`ilike.${t}`),this}ilikeAllOf(e,t){return this.url.searchParams.append(e,`ilike(all).{${t.join(",")}}`),this}ilikeAnyOf(e,t){return this.url.searchParams.append(e,`ilike(any).{${t.join(",")}}`),this}is(e,t){return this.url.searchParams.append(e,`is.${t}`),this}in(e,t){const s=Array.from(new Set(t)).map(i=>typeof i=="string"&&new RegExp("[,()]").test(i)?`"${i}"`:`${i}`).join(",");return this.url.searchParams.append(e,`in.(${s})`),this}contains(e,t){return typeof t=="string"?this.url.searchParams.append(e,`cs.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cs.{${t.join(",")}}`):this.url.searchParams.append(e,`cs.${JSON.stringify(t)}`),this}containedBy(e,t){return typeof t=="string"?this.url.searchParams.append(e,`cd.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cd.{${t.join(",")}}`):this.url.searchParams.append(e,`cd.${JSON.stringify(t)}`),this}rangeGt(e,t){return this.url.searchParams.append(e,`sr.${t}`),this}rangeGte(e,t){return this.url.searchParams.append(e,`nxl.${t}`),this}rangeLt(e,t){return this.url.searchParams.append(e,`sl.${t}`),this}rangeLte(e,t){return this.url.searchParams.append(e,`nxr.${t}`),this}rangeAdjacent(e,t){return this.url.searchParams.append(e,`adj.${t}`),this}overlaps(e,t){return typeof t=="string"?this.url.searchParams.append(e,`ov.${t}`):this.url.searchParams.append(e,`ov.{${t.join(",")}}`),this}textSearch(e,t,{config:s,type:i}={}){let r="";i==="plain"?r="pl":i==="phrase"?r="ph":i==="websearch"&&(r="w");const o=s===void 0?"":`(${s})`;return this.url.searchParams.append(e,`${r}fts${o}.${t}`),this}match(e){return Object.entries(e).forEach(([t,s])=>{this.url.searchParams.append(t,`eq.${s}`)}),this}not(e,t,s){return this.url.searchParams.append(e,`not.${t}.${s}`),this}or(e,{foreignTable:t,referencedTable:s=t}={}){const i=s?`${s}.or`:"or";return this.url.searchParams.append(i,`(${e})`),this}filter(e,t,s){return this.url.searchParams.append(e,`${t}.${s}`),this}};bs.default=Xv;var Zv=Pe&&Pe.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(Vi,"__esModule",{value:!0});const Mn=Zv(bs);let eb=class{constructor(e,{headers:t={},schema:s,fetch:i}){this.url=e,this.headers=t,this.schema=s,this.fetch=i}select(e,{head:t=!1,count:s}={}){const i=t?"HEAD":"GET";let r=!1;const o=(e??"*").split("").map(a=>/\s/.test(a)&&!r?"":(a==='"'&&(r=!r),a)).join("");return this.url.searchParams.set("select",o),s&&(this.headers.Prefer=`count=${s}`),new Mn.default({method:i,url:this.url,headers:this.headers,schema:this.schema,fetch:this.fetch,allowEmpty:!1})}insert(e,{count:t,defaultToNull:s=!0}={}){const i="POST",r=[];if(this.headers.Prefer&&r.push(this.headers.Prefer),t&&r.push(`count=${t}`),s||r.push("missing=default"),this.headers.Prefer=r.join(","),Array.isArray(e)){const o=e.reduce((a,l)=>a.concat(Object.keys(l)),[]);if(o.length>0){const a=[...new Set(o)].map(l=>`"${l}"`);this.url.searchParams.set("columns",a.join(","))}}return new Mn.default({method:i,url:this.url,headers:this.headers,schema:this.schema,body:e,fetch:this.fetch,allowEmpty:!1})}upsert(e,{onConflict:t,ignoreDuplicates:s=!1,count:i,defaultToNull:r=!0}={}){const o="POST",a=[`resolution=${s?"ignore":"merge"}-duplicates`];if(t!==void 0&&this.url.searchParams.set("on_conflict",t),this.headers.Prefer&&a.push(this.headers.Prefer),i&&a.push(`count=${i}`),r||a.push("missing=default"),this.headers.Prefer=a.join(","),Array.isArray(e)){const l=e.reduce((c,u)=>c.concat(Object.keys(u)),[]);if(l.length>0){const c=[...new Set(l)].map(u=>`"${u}"`);this.url.searchParams.set("columns",c.join(","))}}return new Mn.default({method:o,url:this.url,headers:this.headers,schema:this.schema,body:e,fetch:this.fetch,allowEmpty:!1})}update(e,{count:t}={}){const s="PATCH",i=[];return this.headers.Prefer&&i.push(this.headers.Prefer),t&&i.push(`count=${t}`),this.headers.Prefer=i.join(","),new Mn.default({method:s,url:this.url,headers:this.headers,schema:this.schema,body:e,fetch:this.fetch,allowEmpty:!1})}delete({count:e}={}){const t="DELETE",s=[];return e&&s.push(`count=${e}`),this.headers.Prefer&&s.unshift(this.headers.Prefer),this.headers.Prefer=s.join(","),new Mn.default({method:t,url:this.url,headers:this.headers,schema:this.schema,fetch:this.fetch,allowEmpty:!1})}};Vi.default=eb;var Gi={},Ji={};Object.defineProperty(Ji,"__esModule",{value:!0});Ji.version=void 0;Ji.version="0.0.0-automated";Object.defineProperty(Gi,"__esModule",{value:!0});Gi.DEFAULT_HEADERS=void 0;const tb=Ji;Gi.DEFAULT_HEADERS={"X-Client-Info":`postgrest-js/${tb.version}`};var sd=Pe&&Pe.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(ba,"__esModule",{value:!0});const nb=sd(Vi),sb=sd(bs),ib=Gi;let rb=class id{constructor(e,{headers:t={},schema:s,fetch:i}={}){this.url=e,this.headers=Object.assign(Object.assign({},ib.DEFAULT_HEADERS),t),this.schemaName=s,this.fetch=i}from(e){const t=new URL(`${this.url}/${e}`);return new nb.default(t,{headers:Object.assign({},this.headers),schema:this.schemaName,fetch:this.fetch})}schema(e){return new id(this.url,{headers:this.headers,schema:e,fetch:this.fetch})}rpc(e,t={},{head:s=!1,get:i=!1,count:r}={}){let o;const a=new URL(`${this.url}/rpc/${e}`);let l;s||i?(o=s?"HEAD":"GET",Object.entries(t).filter(([u,h])=>h!==void 0).map(([u,h])=>[u,Array.isArray(h)?`{${h.join(",")}}`:`${h}`]).forEach(([u,h])=>{a.searchParams.append(u,h)})):(o="POST",l=t);const c=Object.assign({},this.headers);return r&&(c.Prefer=`count=${r}`),new sb.default({method:o,url:a,headers:c,schema:this.schemaName,body:l,fetch:this.fetch,allowEmpty:!1})}};ba.default=rb;var On=Pe&&Pe.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(ve,"__esModule",{value:!0});ve.PostgrestError=ve.PostgrestBuilder=ve.PostgrestTransformBuilder=ve.PostgrestFilterBuilder=ve.PostgrestQueryBuilder=ve.PostgrestClient=void 0;const rd=On(ba);ve.PostgrestClient=rd.default;const od=On(Vi);ve.PostgrestQueryBuilder=od.default;const ad=On(bs);ve.PostgrestFilterBuilder=ad.default;const ld=On(qi);ve.PostgrestTransformBuilder=ld.default;const cd=On(zi);ve.PostgrestBuilder=cd.default;const ud=On(Ki);ve.PostgrestError=ud.default;var ob=ve.default={PostgrestClient:rd.default,PostgrestQueryBuilder:od.default,PostgrestFilterBuilder:ad.default,PostgrestTransformBuilder:ld.default,PostgrestBuilder:cd.default,PostgrestError:ud.default};const{PostgrestClient:ab,PostgrestQueryBuilder:pS,PostgrestFilterBuilder:gS,PostgrestTransformBuilder:mS,PostgrestBuilder:_S,PostgrestError:yS}=ob;class lb{static detectEnvironment(){var e;if(typeof WebSocket<"u")return{type:"native",constructor:WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocket<"u")return{type:"native",constructor:globalThis.WebSocket};if(typeof global<"u"&&typeof global.WebSocket<"u")return{type:"native",constructor:global.WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocketPair<"u"&&typeof globalThis.WebSocket>"u")return{type:"cloudflare",error:"Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",workaround:"Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."};if(typeof globalThis<"u"&&globalThis.EdgeRuntime||typeof navigator<"u"&&(!((e=navigator.userAgent)===null||e===void 0)&&e.includes("Vercel-Edge")))return{type:"unsupported",error:"Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",workaround:"Use serverless functions or a different deployment target for WebSocket functionality."};if(typeof process<"u"&&process.versions&&process.versions.node){const t=parseInt(process.versions.node.split(".")[0]);return t>=22?typeof globalThis.WebSocket<"u"?{type:"native",constructor:globalThis.WebSocket}:{type:"unsupported",error:`Node.js ${t} detected but native WebSocket not found.`,workaround:"Provide a WebSocket implementation via the transport option."}:{type:"unsupported",error:`Node.js ${t} detected without native WebSocket support.`,workaround:`For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })`}}return{type:"unsupported",error:"Unknown JavaScript runtime without WebSocket support.",workaround:"Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."}}static getWebSocketConstructor(){const e=this.detectEnvironment();if(e.constructor)return e.constructor;let t=e.error||"WebSocket not supported in this environment.";throw e.workaround&&(t+=`

Suggested solution: ${e.workaround}`),new Error(t)}static createWebSocket(e,t){const s=this.getWebSocketConstructor();return new s(e,t)}static isWebSocketSupported(){try{const e=this.detectEnvironment();return e.type==="native"||e.type==="ws"}catch{return!1}}}const cb="2.15.1",ub=`realtime-js/${cb}`,hb="1.0.0",so=1e4,db=1e3,fb=100;var zn;(function(n){n[n.connecting=0]="connecting",n[n.open=1]="open",n[n.closing=2]="closing",n[n.closed=3]="closed"})(zn||(zn={}));var te;(function(n){n.closed="closed",n.errored="errored",n.joined="joined",n.joining="joining",n.leaving="leaving"})(te||(te={}));var Ne;(function(n){n.close="phx_close",n.error="phx_error",n.join="phx_join",n.reply="phx_reply",n.leave="phx_leave",n.access_token="access_token"})(Ne||(Ne={}));var io;(function(n){n.websocket="websocket"})(io||(io={}));var Lt;(function(n){n.Connecting="connecting",n.Open="open",n.Closing="closing",n.Closed="closed"})(Lt||(Lt={}));class pb{constructor(){this.HEADER_LENGTH=1}decode(e,t){return e.constructor===ArrayBuffer?t(this._binaryDecode(e)):t(typeof e=="string"?JSON.parse(e):{})}_binaryDecode(e){const t=new DataView(e),s=new TextDecoder;return this._decodeBroadcast(e,t,s)}_decodeBroadcast(e,t,s){const i=t.getUint8(1),r=t.getUint8(2);let o=this.HEADER_LENGTH+2;const a=s.decode(e.slice(o,o+i));o=o+i;const l=s.decode(e.slice(o,o+r));o=o+r;const c=JSON.parse(s.decode(e.slice(o,e.byteLength)));return{ref:null,topic:a,event:l,payload:c}}}class hd{constructor(e,t){this.callback=e,this.timerCalc=t,this.timer=void 0,this.tries=0,this.callback=e,this.timerCalc=t}reset(){this.tries=0,clearTimeout(this.timer),this.timer=void 0}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}}var K;(function(n){n.abstime="abstime",n.bool="bool",n.date="date",n.daterange="daterange",n.float4="float4",n.float8="float8",n.int2="int2",n.int4="int4",n.int4range="int4range",n.int8="int8",n.int8range="int8range",n.json="json",n.jsonb="jsonb",n.money="money",n.numeric="numeric",n.oid="oid",n.reltime="reltime",n.text="text",n.time="time",n.timestamp="timestamp",n.timestamptz="timestamptz",n.timetz="timetz",n.tsrange="tsrange",n.tstzrange="tstzrange"})(K||(K={}));const ic=(n,e,t={})=>{var s;const i=(s=t.skipTypes)!==null&&s!==void 0?s:[];return Object.keys(e).reduce((r,o)=>(r[o]=gb(o,n,e,i),r),{})},gb=(n,e,t,s)=>{const i=e.find(a=>a.name===n),r=i==null?void 0:i.type,o=t[n];return r&&!s.includes(r)?dd(r,o):ro(o)},dd=(n,e)=>{if(n.charAt(0)==="_"){const t=n.slice(1,n.length);return wb(e,t)}switch(n){case K.bool:return mb(e);case K.float4:case K.float8:case K.int2:case K.int4:case K.int8:case K.numeric:case K.oid:return _b(e);case K.json:case K.jsonb:return yb(e);case K.timestamp:return vb(e);case K.abstime:case K.date:case K.daterange:case K.int4range:case K.int8range:case K.money:case K.reltime:case K.text:case K.time:case K.timestamptz:case K.timetz:case K.tsrange:case K.tstzrange:return ro(e);default:return ro(e)}},ro=n=>n,mb=n=>{switch(n){case"t":return!0;case"f":return!1;default:return n}},_b=n=>{if(typeof n=="string"){const e=parseFloat(n);if(!Number.isNaN(e))return e}return n},yb=n=>{if(typeof n=="string")try{return JSON.parse(n)}catch(e){return console.log(`JSON parse error: ${e}`),n}return n},wb=(n,e)=>{if(typeof n!="string")return n;const t=n.length-1,s=n[t];if(n[0]==="{"&&s==="}"){let r;const o=n.slice(1,t);try{r=JSON.parse("["+o+"]")}catch{r=o?o.split(","):[]}return r.map(a=>dd(e,a))}return n},vb=n=>typeof n=="string"?n.replace(" ","T"):n,fd=n=>{let e=n;return e=e.replace(/^ws/i,"http"),e=e.replace(/(\/socket\/websocket|\/socket|\/websocket)\/?$/i,""),e.replace(/\/+$/,"")+"/api/broadcast"};class yr{constructor(e,t,s={},i=so){this.channel=e,this.event=t,this.payload=s,this.timeout=i,this.sent=!1,this.timeoutTimer=void 0,this.ref="",this.receivedResp=null,this.recHooks=[],this.refEvent=null}resend(e){this.timeout=e,this._cancelRefEvent(),this.ref="",this.refEvent=null,this.receivedResp=null,this.sent=!1,this.send()}send(){this._hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload,ref:this.ref,join_ref:this.channel._joinRef()}))}updatePayload(e){this.payload=Object.assign(Object.assign({},this.payload),e)}receive(e,t){var s;return this._hasReceived(e)&&t((s=this.receivedResp)===null||s===void 0?void 0:s.response),this.recHooks.push({status:e,callback:t}),this}startTimeout(){if(this.timeoutTimer)return;this.ref=this.channel.socket._makeRef(),this.refEvent=this.channel._replyEventName(this.ref);const e=t=>{this._cancelRefEvent(),this._cancelTimeout(),this.receivedResp=t,this._matchReceive(t)};this.channel._on(this.refEvent,{},e),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}trigger(e,t){this.refEvent&&this.channel._trigger(this.refEvent,{status:e,response:t})}destroy(){this._cancelRefEvent(),this._cancelTimeout()}_cancelRefEvent(){this.refEvent&&this.channel._off(this.refEvent,{})}_cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=void 0}_matchReceive({status:e,response:t}){this.recHooks.filter(s=>s.status===e).forEach(s=>s.callback(t))}_hasReceived(e){return this.receivedResp&&this.receivedResp.status===e}}var rc;(function(n){n.SYNC="sync",n.JOIN="join",n.LEAVE="leave"})(rc||(rc={}));class Kn{constructor(e,t){this.channel=e,this.state={},this.pendingDiffs=[],this.joinRef=null,this.enabled=!1,this.caller={onJoin:()=>{},onLeave:()=>{},onSync:()=>{}};const s=(t==null?void 0:t.events)||{state:"presence_state",diff:"presence_diff"};this.channel._on(s.state,{},i=>{const{onJoin:r,onLeave:o,onSync:a}=this.caller;this.joinRef=this.channel._joinRef(),this.state=Kn.syncState(this.state,i,r,o),this.pendingDiffs.forEach(l=>{this.state=Kn.syncDiff(this.state,l,r,o)}),this.pendingDiffs=[],a()}),this.channel._on(s.diff,{},i=>{const{onJoin:r,onLeave:o,onSync:a}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(i):(this.state=Kn.syncDiff(this.state,i,r,o),a())}),this.onJoin((i,r,o)=>{this.channel._trigger("presence",{event:"join",key:i,currentPresences:r,newPresences:o})}),this.onLeave((i,r,o)=>{this.channel._trigger("presence",{event:"leave",key:i,currentPresences:r,leftPresences:o})}),this.onSync(()=>{this.channel._trigger("presence",{event:"sync"})})}static syncState(e,t,s,i){const r=this.cloneDeep(e),o=this.transformState(t),a={},l={};return this.map(r,(c,u)=>{o[c]||(l[c]=u)}),this.map(o,(c,u)=>{const h=r[c];if(h){const d=u.map(E=>E.presence_ref),g=h.map(E=>E.presence_ref),y=u.filter(E=>g.indexOf(E.presence_ref)<0),T=h.filter(E=>d.indexOf(E.presence_ref)<0);y.length>0&&(a[c]=y),T.length>0&&(l[c]=T)}else a[c]=u}),this.syncDiff(r,{joins:a,leaves:l},s,i)}static syncDiff(e,t,s,i){const{joins:r,leaves:o}={joins:this.transformState(t.joins),leaves:this.transformState(t.leaves)};return s||(s=()=>{}),i||(i=()=>{}),this.map(r,(a,l)=>{var c;const u=(c=e[a])!==null&&c!==void 0?c:[];if(e[a]=this.cloneDeep(l),u.length>0){const h=e[a].map(g=>g.presence_ref),d=u.filter(g=>h.indexOf(g.presence_ref)<0);e[a].unshift(...d)}s(a,u,l)}),this.map(o,(a,l)=>{let c=e[a];if(!c)return;const u=l.map(h=>h.presence_ref);c=c.filter(h=>u.indexOf(h.presence_ref)<0),e[a]=c,i(a,c,l),c.length===0&&delete e[a]}),e}static map(e,t){return Object.getOwnPropertyNames(e).map(s=>t(s,e[s]))}static transformState(e){return e=this.cloneDeep(e),Object.getOwnPropertyNames(e).reduce((t,s)=>{const i=e[s];return"metas"in i?t[s]=i.metas.map(r=>(r.presence_ref=r.phx_ref,delete r.phx_ref,delete r.phx_ref_prev,r)):t[s]=i,t},{})}static cloneDeep(e){return JSON.parse(JSON.stringify(e))}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel._joinRef()}}var oc;(function(n){n.ALL="*",n.INSERT="INSERT",n.UPDATE="UPDATE",n.DELETE="DELETE"})(oc||(oc={}));var Gn;(function(n){n.BROADCAST="broadcast",n.PRESENCE="presence",n.POSTGRES_CHANGES="postgres_changes",n.SYSTEM="system"})(Gn||(Gn={}));var Xe;(function(n){n.SUBSCRIBED="SUBSCRIBED",n.TIMED_OUT="TIMED_OUT",n.CLOSED="CLOSED",n.CHANNEL_ERROR="CHANNEL_ERROR"})(Xe||(Xe={}));class Ea{constructor(e,t={config:{}},s){this.topic=e,this.params=t,this.socket=s,this.bindings={},this.state=te.closed,this.joinedOnce=!1,this.pushBuffer=[],this.subTopic=e.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},t.config),this.timeout=this.socket.timeout,this.joinPush=new yr(this,Ne.join,this.params,this.timeout),this.rejoinTimer=new hd(()=>this._rejoinUntilConnected(),this.socket.reconnectAfterMs),this.joinPush.receive("ok",()=>{this.state=te.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(i=>i.send()),this.pushBuffer=[]}),this._onClose(()=>{this.rejoinTimer.reset(),this.socket.log("channel",`close ${this.topic} ${this._joinRef()}`),this.state=te.closed,this.socket._remove(this)}),this._onError(i=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,i),this.state=te.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("timeout",()=>{this._isJoining()&&(this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),this.state=te.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("error",i=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,i),this.state=te.errored,this.rejoinTimer.scheduleTimeout())}),this._on(Ne.reply,{},(i,r)=>{this._trigger(this._replyEventName(r),i)}),this.presence=new Kn(this),this.broadcastEndpointURL=fd(this.socket.endPoint),this.private=this.params.config.private||!1}subscribe(e,t=this.timeout){var s,i;if(this.socket.isConnected()||this.socket.connect(),this.state==te.closed){const{config:{broadcast:r,presence:o,private:a}}=this.params,l=(i=(s=this.bindings.postgres_changes)===null||s===void 0?void 0:s.map(d=>d.filter))!==null&&i!==void 0?i:[],c=!!this.bindings[Gn.PRESENCE]&&this.bindings[Gn.PRESENCE].length>0,u={},h={broadcast:r,presence:Object.assign(Object.assign({},o),{enabled:c}),postgres_changes:l,private:a};this.socket.accessTokenValue&&(u.access_token=this.socket.accessTokenValue),this._onError(d=>e==null?void 0:e(Xe.CHANNEL_ERROR,d)),this._onClose(()=>e==null?void 0:e(Xe.CLOSED)),this.updateJoinPayload(Object.assign({config:h},u)),this.joinedOnce=!0,this._rejoin(t),this.joinPush.receive("ok",async({postgres_changes:d})=>{var g;if(this.socket.setAuth(),d===void 0){e==null||e(Xe.SUBSCRIBED);return}else{const y=this.bindings.postgres_changes,T=(g=y==null?void 0:y.length)!==null&&g!==void 0?g:0,E=[];for(let P=0;P<T;P++){const D=y[P],{filter:{event:I,schema:N,table:z,filter:B}}=D,_=d&&d[P];if(_&&_.event===I&&_.schema===N&&_.table===z&&_.filter===B)E.push(Object.assign(Object.assign({},D),{id:_.id}));else{this.unsubscribe(),this.state=te.errored,e==null||e(Xe.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=E,e&&e(Xe.SUBSCRIBED);return}}).receive("error",d=>{this.state=te.errored,e==null||e(Xe.CHANNEL_ERROR,new Error(JSON.stringify(Object.values(d).join(", ")||"error")))}).receive("timeout",()=>{e==null||e(Xe.TIMED_OUT)})}return this}presenceState(){return this.presence.state}async track(e,t={}){return await this.send({type:"presence",event:"track",payload:e},t.timeout||this.timeout)}async untrack(e={}){return await this.send({type:"presence",event:"untrack"},e)}on(e,t,s){return this.state===te.joined&&e===Gn.PRESENCE&&(this.socket.log("channel",`resubscribe to ${this.topic} due to change in presence callbacks on joined channel`),this.unsubscribe().then(()=>this.subscribe())),this._on(e,t,s)}async send(e,t={}){var s,i;if(!this._canPush()&&e.type==="broadcast"){const{event:r,payload:o}=e,l={method:"POST",headers:{Authorization:this.socket.accessTokenValue?`Bearer ${this.socket.accessTokenValue}`:"",apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"},body:JSON.stringify({messages:[{topic:this.subTopic,event:r,payload:o,private:this.private}]})};try{const c=await this._fetchWithTimeout(this.broadcastEndpointURL,l,(s=t.timeout)!==null&&s!==void 0?s:this.timeout);return await((i=c.body)===null||i===void 0?void 0:i.cancel()),c.ok?"ok":"error"}catch(c){return c.name==="AbortError"?"timed out":"error"}}else return new Promise(r=>{var o,a,l;const c=this._push(e.type,e,t.timeout||this.timeout);e.type==="broadcast"&&!(!((l=(a=(o=this.params)===null||o===void 0?void 0:o.config)===null||a===void 0?void 0:a.broadcast)===null||l===void 0)&&l.ack)&&r("ok"),c.receive("ok",()=>r("ok")),c.receive("error",()=>r("error")),c.receive("timeout",()=>r("timed out"))})}updateJoinPayload(e){this.joinPush.updatePayload(e)}unsubscribe(e=this.timeout){this.state=te.leaving;const t=()=>{this.socket.log("channel",`leave ${this.topic}`),this._trigger(Ne.close,"leave",this._joinRef())};this.joinPush.destroy();let s=null;return new Promise(i=>{s=new yr(this,Ne.leave,{},e),s.receive("ok",()=>{t(),i("ok")}).receive("timeout",()=>{t(),i("timed out")}).receive("error",()=>{i("error")}),s.send(),this._canPush()||s.trigger("ok",{})}).finally(()=>{s==null||s.destroy()})}teardown(){this.pushBuffer.forEach(e=>e.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=te.closed,this.bindings={}}async _fetchWithTimeout(e,t,s){const i=new AbortController,r=setTimeout(()=>i.abort(),s),o=await this.socket.fetch(e,Object.assign(Object.assign({},t),{signal:i.signal}));return clearTimeout(r),o}_push(e,t,s=this.timeout){if(!this.joinedOnce)throw`tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;let i=new yr(this,e,t,s);return this._canPush()?i.send():this._addToPushBuffer(i),i}_addToPushBuffer(e){if(e.startTimeout(),this.pushBuffer.push(e),this.pushBuffer.length>fb){const t=this.pushBuffer.shift();t&&(t.destroy(),this.socket.log("channel",`discarded push due to buffer overflow: ${t.event}`,t.payload))}}_onMessage(e,t,s){return t}_isMember(e){return this.topic===e}_joinRef(){return this.joinPush.ref}_trigger(e,t,s){var i,r;const o=e.toLocaleLowerCase(),{close:a,error:l,leave:c,join:u}=Ne;if(s&&[a,l,c,u].indexOf(o)>=0&&s!==this._joinRef())return;let d=this._onMessage(o,t,s);if(t&&!d)throw"channel onMessage callbacks must return the payload, modified or unmodified";["insert","update","delete"].includes(o)?(i=this.bindings.postgres_changes)===null||i===void 0||i.filter(g=>{var y,T,E;return((y=g.filter)===null||y===void 0?void 0:y.event)==="*"||((E=(T=g.filter)===null||T===void 0?void 0:T.event)===null||E===void 0?void 0:E.toLocaleLowerCase())===o}).map(g=>g.callback(d,s)):(r=this.bindings[o])===null||r===void 0||r.filter(g=>{var y,T,E,P,D,I;if(["broadcast","presence","postgres_changes"].includes(o))if("id"in g){const N=g.id,z=(y=g.filter)===null||y===void 0?void 0:y.event;return N&&((T=t.ids)===null||T===void 0?void 0:T.includes(N))&&(z==="*"||(z==null?void 0:z.toLocaleLowerCase())===((E=t.data)===null||E===void 0?void 0:E.type.toLocaleLowerCase()))}else{const N=(D=(P=g==null?void 0:g.filter)===null||P===void 0?void 0:P.event)===null||D===void 0?void 0:D.toLocaleLowerCase();return N==="*"||N===((I=t==null?void 0:t.event)===null||I===void 0?void 0:I.toLocaleLowerCase())}else return g.type.toLocaleLowerCase()===o}).map(g=>{if(typeof d=="object"&&"ids"in d){const y=d.data,{schema:T,table:E,commit_timestamp:P,type:D,errors:I}=y;d=Object.assign(Object.assign({},{schema:T,table:E,commit_timestamp:P,eventType:D,new:{},old:{},errors:I}),this._getPayloadRecords(y))}g.callback(d,s)})}_isClosed(){return this.state===te.closed}_isJoined(){return this.state===te.joined}_isJoining(){return this.state===te.joining}_isLeaving(){return this.state===te.leaving}_replyEventName(e){return`chan_reply_${e}`}_on(e,t,s){const i=e.toLocaleLowerCase(),r={type:i,filter:t,callback:s};return this.bindings[i]?this.bindings[i].push(r):this.bindings[i]=[r],this}_off(e,t){const s=e.toLocaleLowerCase();return this.bindings[s]&&(this.bindings[s]=this.bindings[s].filter(i=>{var r;return!(((r=i.type)===null||r===void 0?void 0:r.toLocaleLowerCase())===s&&Ea.isEqual(i.filter,t))})),this}static isEqual(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const s in e)if(e[s]!==t[s])return!1;return!0}_rejoinUntilConnected(){this.rejoinTimer.scheduleTimeout(),this.socket.isConnected()&&this._rejoin()}_onClose(e){this._on(Ne.close,{},e)}_onError(e){this._on(Ne.error,{},t=>e(t))}_canPush(){return this.socket.isConnected()&&this._isJoined()}_rejoin(e=this.timeout){this._isLeaving()||(this.socket._leaveOpenTopic(this.topic),this.state=te.joining,this.joinPush.resend(e))}_getPayloadRecords(e){const t={new:{},old:{}};return(e.type==="INSERT"||e.type==="UPDATE")&&(t.new=ic(e.columns,e.record)),(e.type==="UPDATE"||e.type==="DELETE")&&(t.old=ic(e.columns,e.old_record)),t}}const ac=()=>{},Is={HEARTBEAT_INTERVAL:25e3,RECONNECT_DELAY:10,HEARTBEAT_TIMEOUT_FALLBACK:100},bb=[1e3,2e3,5e3,1e4],Eb=1e4,Tb=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;class Sb{constructor(e,t){var s;if(this.accessTokenValue=null,this.apiKey=null,this.channels=new Array,this.endPoint="",this.httpEndpoint="",this.headers={},this.params={},this.timeout=so,this.transport=null,this.heartbeatIntervalMs=Is.HEARTBEAT_INTERVAL,this.heartbeatTimer=void 0,this.pendingHeartbeatRef=null,this.heartbeatCallback=ac,this.ref=0,this.reconnectTimer=null,this.logger=ac,this.conn=null,this.sendBuffer=[],this.serializer=new pb,this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.accessToken=null,this._connectionState="disconnected",this._wasManualDisconnect=!1,this._authPromise=null,this._resolveFetch=i=>{let r;return i?r=i:typeof fetch>"u"?r=(...o)=>vs(async()=>{const{default:a}=await Promise.resolve().then(()=>Rn);return{default:a}},void 0).then(({default:a})=>a(...o)).catch(a=>{throw new Error(`Failed to load @supabase/node-fetch: ${a.message}. This is required for HTTP requests in Node.js environments without native fetch.`)}):r=fetch,(...o)=>r(...o)},!(!((s=t==null?void 0:t.params)===null||s===void 0)&&s.apikey))throw new Error("API key is required to connect to Realtime");this.apiKey=t.params.apikey,this.endPoint=`${e}/${io.websocket}`,this.httpEndpoint=fd(e),this._initializeOptions(t),this._setupReconnectionTimer(),this.fetch=this._resolveFetch(t==null?void 0:t.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.conn!==null&&this.isConnected())){if(this._setConnectionState("connecting"),this._setAuthSafely("connect"),this.transport)this.conn=new this.transport(this.endpointURL());else try{this.conn=lb.createWebSocket(this.endpointURL())}catch(e){this._setConnectionState("disconnected");const t=e.message;throw t.includes("Node.js")?new Error(`${t}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`):new Error(`WebSocket not available: ${t}`)}this._setupConnectionHandlers()}}endpointURL(){return this._appendParams(this.endPoint,Object.assign({},this.params,{vsn:hb}))}disconnect(e,t){if(!this.isDisconnecting())if(this._setConnectionState("disconnecting",!0),this.conn){const s=setTimeout(()=>{this._setConnectionState("disconnected")},100);this.conn.onclose=()=>{clearTimeout(s),this._setConnectionState("disconnected")},e?this.conn.close(e,t??""):this.conn.close(),this._teardownConnection()}else this._setConnectionState("disconnected")}getChannels(){return this.channels}async removeChannel(e){const t=await e.unsubscribe();return this.channels.length===0&&this.disconnect(),t}async removeAllChannels(){const e=await Promise.all(this.channels.map(t=>t.unsubscribe()));return this.channels=[],this.disconnect(),e}log(e,t,s){this.logger(e,t,s)}connectionState(){switch(this.conn&&this.conn.readyState){case zn.connecting:return Lt.Connecting;case zn.open:return Lt.Open;case zn.closing:return Lt.Closing;default:return Lt.Closed}}isConnected(){return this.connectionState()===Lt.Open}isConnecting(){return this._connectionState==="connecting"}isDisconnecting(){return this._connectionState==="disconnecting"}channel(e,t={config:{}}){const s=`realtime:${e}`,i=this.getChannels().find(r=>r.topic===s);if(i)return i;{const r=new Ea(`realtime:${e}`,t,this);return this.channels.push(r),r}}push(e){const{topic:t,event:s,payload:i,ref:r}=e,o=()=>{this.encode(e,a=>{var l;(l=this.conn)===null||l===void 0||l.send(a)})};this.log("push",`${t} ${s} (${r})`,i),this.isConnected()?o():this.sendBuffer.push(o)}async setAuth(e=null){this._authPromise=this._performAuth(e);try{await this._authPromise}finally{this._authPromise=null}}async sendHeartbeat(){var e;if(!this.isConnected()){this.heartbeatCallback("disconnected");return}if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.log("transport","heartbeat timeout. Attempting to re-establish connection"),this.heartbeatCallback("timeout"),this._wasManualDisconnect=!1,(e=this.conn)===null||e===void 0||e.close(db,"heartbeat timeout"),setTimeout(()=>{var t;this.isConnected()||(t=this.reconnectTimer)===null||t===void 0||t.scheduleTimeout()},Is.HEARTBEAT_TIMEOUT_FALLBACK);return}this.pendingHeartbeatRef=this._makeRef(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef}),this.heartbeatCallback("sent"),this._setAuthSafely("heartbeat")}onHeartbeat(e){this.heartbeatCallback=e}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(e=>e()),this.sendBuffer=[])}_makeRef(){let e=this.ref+1;return e===this.ref?this.ref=0:this.ref=e,this.ref.toString()}_leaveOpenTopic(e){let t=this.channels.find(s=>s.topic===e&&(s._isJoined()||s._isJoining()));t&&(this.log("transport",`leaving duplicate topic "${e}"`),t.unsubscribe())}_remove(e){this.channels=this.channels.filter(t=>t.topic!==e.topic)}_onConnMessage(e){this.decode(e.data,t=>{t.topic==="phoenix"&&t.event==="phx_reply"&&this.heartbeatCallback(t.payload.status==="ok"?"ok":"error"),t.ref&&t.ref===this.pendingHeartbeatRef&&(this.pendingHeartbeatRef=null);const{topic:s,event:i,payload:r,ref:o}=t,a=o?`(${o})`:"",l=r.status||"";this.log("receive",`${l} ${s} ${i} ${a}`.trim(),r),this.channels.filter(c=>c._isMember(s)).forEach(c=>c._trigger(i,r,o)),this._triggerStateCallbacks("message",t)})}_clearTimer(e){var t;e==="heartbeat"&&this.heartbeatTimer?(clearInterval(this.heartbeatTimer),this.heartbeatTimer=void 0):e==="reconnect"&&((t=this.reconnectTimer)===null||t===void 0||t.reset())}_clearAllTimers(){this._clearTimer("heartbeat"),this._clearTimer("reconnect")}_setupConnectionHandlers(){this.conn&&("binaryType"in this.conn&&(this.conn.binaryType="arraybuffer"),this.conn.onopen=()=>this._onConnOpen(),this.conn.onerror=e=>this._onConnError(e),this.conn.onmessage=e=>this._onConnMessage(e),this.conn.onclose=e=>this._onConnClose(e))}_teardownConnection(){this.conn&&(this.conn.onopen=null,this.conn.onerror=null,this.conn.onmessage=null,this.conn.onclose=null,this.conn=null),this._clearAllTimers(),this.channels.forEach(e=>e.teardown())}_onConnOpen(){this._setConnectionState("connected"),this.log("transport",`connected to ${this.endpointURL()}`),this.flushSendBuffer(),this._clearTimer("reconnect"),this.worker?this.workerRef||this._startWorkerHeartbeat():this._startHeartbeat(),this._triggerStateCallbacks("open")}_startHeartbeat(){this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval(()=>this.sendHeartbeat(),this.heartbeatIntervalMs)}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=t=>{this.log("worker","worker error",t.message),this.workerRef.terminate()},this.workerRef.onmessage=t=>{t.data.event==="keepAlive"&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_onConnClose(e){var t;this._setConnectionState("disconnected"),this.log("transport","close",e),this._triggerChanError(),this._clearTimer("heartbeat"),this._wasManualDisconnect||(t=this.reconnectTimer)===null||t===void 0||t.scheduleTimeout(),this._triggerStateCallbacks("close",e)}_onConnError(e){this._setConnectionState("disconnected"),this.log("transport",`${e}`),this._triggerChanError(),this._triggerStateCallbacks("error",e)}_triggerChanError(){this.channels.forEach(e=>e._trigger(Ne.error))}_appendParams(e,t){if(Object.keys(t).length===0)return e;const s=e.match(/\?/)?"&":"?",i=new URLSearchParams(t);return`${e}${s}${i}`}_workerObjectUrl(e){let t;if(e)t=e;else{const s=new Blob([Tb],{type:"application/javascript"});t=URL.createObjectURL(s)}return t}_setConnectionState(e,t=!1){this._connectionState=e,e==="connecting"?this._wasManualDisconnect=!1:e==="disconnecting"&&(this._wasManualDisconnect=t)}async _performAuth(e=null){let t;e?t=e:this.accessToken?t=await this.accessToken():t=this.accessTokenValue,this.accessTokenValue!=t&&(this.accessTokenValue=t,this.channels.forEach(s=>{const i={access_token:t,version:ub};t&&s.updateJoinPayload(i),s.joinedOnce&&s._isJoined()&&s._push(Ne.access_token,{access_token:t})}))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(e="general"){this.setAuth().catch(t=>{this.log("error",`error setting auth in ${e}`,t)})}_triggerStateCallbacks(e,t){try{this.stateChangeCallbacks[e].forEach(s=>{try{s(t)}catch(i){this.log("error",`error in ${e} callback`,i)}})}catch(s){this.log("error",`error triggering ${e} callbacks`,s)}}_setupReconnectionTimer(){this.reconnectTimer=new hd(async()=>{setTimeout(async()=>{await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()},Is.RECONNECT_DELAY)},this.reconnectAfterMs)}_initializeOptions(e){var t,s,i,r,o,a,l,c;if(this.transport=(t=e==null?void 0:e.transport)!==null&&t!==void 0?t:null,this.timeout=(s=e==null?void 0:e.timeout)!==null&&s!==void 0?s:so,this.heartbeatIntervalMs=(i=e==null?void 0:e.heartbeatIntervalMs)!==null&&i!==void 0?i:Is.HEARTBEAT_INTERVAL,this.worker=(r=e==null?void 0:e.worker)!==null&&r!==void 0?r:!1,this.accessToken=(o=e==null?void 0:e.accessToken)!==null&&o!==void 0?o:null,e!=null&&e.params&&(this.params=e.params),e!=null&&e.logger&&(this.logger=e.logger),(e!=null&&e.logLevel||e!=null&&e.log_level)&&(this.logLevel=e.logLevel||e.log_level,this.params=Object.assign(Object.assign({},this.params),{log_level:this.logLevel})),this.reconnectAfterMs=(a=e==null?void 0:e.reconnectAfterMs)!==null&&a!==void 0?a:u=>bb[u-1]||Eb,this.encode=(l=e==null?void 0:e.encode)!==null&&l!==void 0?l:(u,h)=>h(JSON.stringify(u)),this.decode=(c=e==null?void 0:e.decode)!==null&&c!==void 0?c:this.serializer.decode.bind(this.serializer),this.worker){if(typeof window<"u"&&!window.Worker)throw new Error("Web Worker is not supported");this.workerUrl=e==null?void 0:e.workerUrl}}}class Ta extends Error{constructor(e){super(e),this.__isStorageError=!0,this.name="StorageError"}}function oe(n){return typeof n=="object"&&n!==null&&"__isStorageError"in n}class kb extends Ta{constructor(e,t,s){super(e),this.name="StorageApiError",this.status=t,this.statusCode=s}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}}class oo extends Ta{constructor(e,t){super(e),this.name="StorageUnknownError",this.originalError=t}}var Ib=function(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{c(s.next(u))}catch(h){o(h)}}function l(u){try{c(s.throw(u))}catch(h){o(h)}}function c(u){u.done?r(u.value):i(u.value).then(a,l)}c((s=s.apply(n,e||[])).next())})};const pd=n=>{let e;return n?e=n:typeof fetch>"u"?e=(...t)=>vs(async()=>{const{default:s}=await Promise.resolve().then(()=>Rn);return{default:s}},void 0).then(({default:s})=>s(...t)):e=fetch,(...t)=>e(...t)},Cb=()=>Ib(void 0,void 0,void 0,function*(){return typeof Response>"u"?(yield vs(()=>Promise.resolve().then(()=>Rn),void 0)).Response:Response}),ao=n=>{if(Array.isArray(n))return n.map(t=>ao(t));if(typeof n=="function"||n!==Object(n))return n;const e={};return Object.entries(n).forEach(([t,s])=>{const i=t.replace(/([-_][a-z])/gi,r=>r.toUpperCase().replace(/[-_]/g,""));e[i]=ao(s)}),e},Ab=n=>{if(typeof n!="object"||n===null)return!1;const e=Object.getPrototypeOf(n);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in n)&&!(Symbol.iterator in n)};var sn=function(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{c(s.next(u))}catch(h){o(h)}}function l(u){try{c(s.throw(u))}catch(h){o(h)}}function c(u){u.done?r(u.value):i(u.value).then(a,l)}c((s=s.apply(n,e||[])).next())})};const wr=n=>n.msg||n.message||n.error_description||n.error||JSON.stringify(n),Pb=(n,e,t)=>sn(void 0,void 0,void 0,function*(){const s=yield Cb();n instanceof s&&!(t!=null&&t.noResolveJson)?n.json().then(i=>{const r=n.status||500,o=(i==null?void 0:i.statusCode)||r+"";e(new kb(wr(i),r,o))}).catch(i=>{e(new oo(wr(i),i))}):e(new oo(wr(n),n))}),Rb=(n,e,t,s)=>{const i={method:n,headers:(e==null?void 0:e.headers)||{}};return n==="GET"||!s?i:(Ab(s)?(i.headers=Object.assign({"Content-Type":"application/json"},e==null?void 0:e.headers),i.body=JSON.stringify(s)):i.body=s,Object.assign(Object.assign({},i),t))};function Es(n,e,t,s,i,r){return sn(this,void 0,void 0,function*(){return new Promise((o,a)=>{n(t,Rb(e,s,i,r)).then(l=>{if(!l.ok)throw l;return s!=null&&s.noResolveJson?l:l.json()}).then(l=>o(l)).catch(l=>Pb(l,a,s))})})}function ci(n,e,t,s){return sn(this,void 0,void 0,function*(){return Es(n,"GET",e,t,s)})}function Ze(n,e,t,s,i){return sn(this,void 0,void 0,function*(){return Es(n,"POST",e,s,i,t)})}function lo(n,e,t,s,i){return sn(this,void 0,void 0,function*(){return Es(n,"PUT",e,s,i,t)})}function Ob(n,e,t,s){return sn(this,void 0,void 0,function*(){return Es(n,"HEAD",e,Object.assign(Object.assign({},t),{noResolveJson:!0}),s)})}function gd(n,e,t,s,i){return sn(this,void 0,void 0,function*(){return Es(n,"DELETE",e,s,i,t)})}var we=function(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{c(s.next(u))}catch(h){o(h)}}function l(u){try{c(s.throw(u))}catch(h){o(h)}}function c(u){u.done?r(u.value):i(u.value).then(a,l)}c((s=s.apply(n,e||[])).next())})};const Nb={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},lc={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};class xb{constructor(e,t={},s,i){this.url=e,this.headers=t,this.bucketId=s,this.fetch=pd(i)}uploadOrUpdate(e,t,s,i){return we(this,void 0,void 0,function*(){try{let r;const o=Object.assign(Object.assign({},lc),i);let a=Object.assign(Object.assign({},this.headers),e==="POST"&&{"x-upsert":String(o.upsert)});const l=o.metadata;typeof Blob<"u"&&s instanceof Blob?(r=new FormData,r.append("cacheControl",o.cacheControl),l&&r.append("metadata",this.encodeMetadata(l)),r.append("",s)):typeof FormData<"u"&&s instanceof FormData?(r=s,r.append("cacheControl",o.cacheControl),l&&r.append("metadata",this.encodeMetadata(l))):(r=s,a["cache-control"]=`max-age=${o.cacheControl}`,a["content-type"]=o.contentType,l&&(a["x-metadata"]=this.toBase64(this.encodeMetadata(l)))),i!=null&&i.headers&&(a=Object.assign(Object.assign({},a),i.headers));const c=this._removeEmptyFolders(t),u=this._getFinalPath(c),h=yield(e=="PUT"?lo:Ze)(this.fetch,`${this.url}/object/${u}`,r,Object.assign({headers:a},o!=null&&o.duplex?{duplex:o.duplex}:{}));return{data:{path:c,id:h.Id,fullPath:h.Key},error:null}}catch(r){if(oe(r))return{data:null,error:r};throw r}})}upload(e,t,s){return we(this,void 0,void 0,function*(){return this.uploadOrUpdate("POST",e,t,s)})}uploadToSignedUrl(e,t,s,i){return we(this,void 0,void 0,function*(){const r=this._removeEmptyFolders(e),o=this._getFinalPath(r),a=new URL(this.url+`/object/upload/sign/${o}`);a.searchParams.set("token",t);try{let l;const c=Object.assign({upsert:lc.upsert},i),u=Object.assign(Object.assign({},this.headers),{"x-upsert":String(c.upsert)});typeof Blob<"u"&&s instanceof Blob?(l=new FormData,l.append("cacheControl",c.cacheControl),l.append("",s)):typeof FormData<"u"&&s instanceof FormData?(l=s,l.append("cacheControl",c.cacheControl)):(l=s,u["cache-control"]=`max-age=${c.cacheControl}`,u["content-type"]=c.contentType);const h=yield lo(this.fetch,a.toString(),l,{headers:u});return{data:{path:r,fullPath:h.Key},error:null}}catch(l){if(oe(l))return{data:null,error:l};throw l}})}createSignedUploadUrl(e,t){return we(this,void 0,void 0,function*(){try{let s=this._getFinalPath(e);const i=Object.assign({},this.headers);t!=null&&t.upsert&&(i["x-upsert"]="true");const r=yield Ze(this.fetch,`${this.url}/object/upload/sign/${s}`,{},{headers:i}),o=new URL(this.url+r.url),a=o.searchParams.get("token");if(!a)throw new Ta("No token returned by API");return{data:{signedUrl:o.toString(),path:e,token:a},error:null}}catch(s){if(oe(s))return{data:null,error:s};throw s}})}update(e,t,s){return we(this,void 0,void 0,function*(){return this.uploadOrUpdate("PUT",e,t,s)})}move(e,t,s){return we(this,void 0,void 0,function*(){try{return{data:yield Ze(this.fetch,`${this.url}/object/move`,{bucketId:this.bucketId,sourceKey:e,destinationKey:t,destinationBucket:s==null?void 0:s.destinationBucket},{headers:this.headers}),error:null}}catch(i){if(oe(i))return{data:null,error:i};throw i}})}copy(e,t,s){return we(this,void 0,void 0,function*(){try{return{data:{path:(yield Ze(this.fetch,`${this.url}/object/copy`,{bucketId:this.bucketId,sourceKey:e,destinationKey:t,destinationBucket:s==null?void 0:s.destinationBucket},{headers:this.headers})).Key},error:null}}catch(i){if(oe(i))return{data:null,error:i};throw i}})}createSignedUrl(e,t,s){return we(this,void 0,void 0,function*(){try{let i=this._getFinalPath(e),r=yield Ze(this.fetch,`${this.url}/object/sign/${i}`,Object.assign({expiresIn:t},s!=null&&s.transform?{transform:s.transform}:{}),{headers:this.headers});const o=s!=null&&s.download?`&download=${s.download===!0?"":s.download}`:"";return r={signedUrl:encodeURI(`${this.url}${r.signedURL}${o}`)},{data:r,error:null}}catch(i){if(oe(i))return{data:null,error:i};throw i}})}createSignedUrls(e,t,s){return we(this,void 0,void 0,function*(){try{const i=yield Ze(this.fetch,`${this.url}/object/sign/${this.bucketId}`,{expiresIn:t,paths:e},{headers:this.headers}),r=s!=null&&s.download?`&download=${s.download===!0?"":s.download}`:"";return{data:i.map(o=>Object.assign(Object.assign({},o),{signedUrl:o.signedURL?encodeURI(`${this.url}${o.signedURL}${r}`):null})),error:null}}catch(i){if(oe(i))return{data:null,error:i};throw i}})}download(e,t){return we(this,void 0,void 0,function*(){const i=typeof(t==null?void 0:t.transform)<"u"?"render/image/authenticated":"object",r=this.transformOptsToQueryString((t==null?void 0:t.transform)||{}),o=r?`?${r}`:"";try{const a=this._getFinalPath(e);return{data:yield(yield ci(this.fetch,`${this.url}/${i}/${a}${o}`,{headers:this.headers,noResolveJson:!0})).blob(),error:null}}catch(a){if(oe(a))return{data:null,error:a};throw a}})}info(e){return we(this,void 0,void 0,function*(){const t=this._getFinalPath(e);try{const s=yield ci(this.fetch,`${this.url}/object/info/${t}`,{headers:this.headers});return{data:ao(s),error:null}}catch(s){if(oe(s))return{data:null,error:s};throw s}})}exists(e){return we(this,void 0,void 0,function*(){const t=this._getFinalPath(e);try{return yield Ob(this.fetch,`${this.url}/object/${t}`,{headers:this.headers}),{data:!0,error:null}}catch(s){if(oe(s)&&s instanceof oo){const i=s.originalError;if([400,404].includes(i==null?void 0:i.status))return{data:!1,error:s}}throw s}})}getPublicUrl(e,t){const s=this._getFinalPath(e),i=[],r=t!=null&&t.download?`download=${t.download===!0?"":t.download}`:"";r!==""&&i.push(r);const a=typeof(t==null?void 0:t.transform)<"u"?"render/image":"object",l=this.transformOptsToQueryString((t==null?void 0:t.transform)||{});l!==""&&i.push(l);let c=i.join("&");return c!==""&&(c=`?${c}`),{data:{publicUrl:encodeURI(`${this.url}/${a}/public/${s}${c}`)}}}remove(e){return we(this,void 0,void 0,function*(){try{return{data:yield gd(this.fetch,`${this.url}/object/${this.bucketId}`,{prefixes:e},{headers:this.headers}),error:null}}catch(t){if(oe(t))return{data:null,error:t};throw t}})}list(e,t,s){return we(this,void 0,void 0,function*(){try{const i=Object.assign(Object.assign(Object.assign({},Nb),t),{prefix:e||""});return{data:yield Ze(this.fetch,`${this.url}/object/list/${this.bucketId}`,i,{headers:this.headers},s),error:null}}catch(i){if(oe(i))return{data:null,error:i};throw i}})}encodeMetadata(e){return JSON.stringify(e)}toBase64(e){return typeof Buffer<"u"?Buffer.from(e).toString("base64"):btoa(e)}_getFinalPath(e){return`${this.bucketId}/${e.replace(/^\/+/,"")}`}_removeEmptyFolders(e){return e.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}transformOptsToQueryString(e){const t=[];return e.width&&t.push(`width=${e.width}`),e.height&&t.push(`height=${e.height}`),e.resize&&t.push(`resize=${e.resize}`),e.format&&t.push(`format=${e.format}`),e.quality&&t.push(`quality=${e.quality}`),t.join("&")}}const Db="2.10.4",Lb={"X-Client-Info":`storage-js/${Db}`};var on=function(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{c(s.next(u))}catch(h){o(h)}}function l(u){try{c(s.throw(u))}catch(h){o(h)}}function c(u){u.done?r(u.value):i(u.value).then(a,l)}c((s=s.apply(n,e||[])).next())})};class Mb{constructor(e,t={},s,i){const r=new URL(e);i!=null&&i.useNewHostname&&/supabase\.(co|in|red)$/.test(r.hostname)&&!r.hostname.includes("storage.supabase.")&&(r.hostname=r.hostname.replace("supabase.","storage.supabase.")),this.url=r.href,this.headers=Object.assign(Object.assign({},Lb),t),this.fetch=pd(s)}listBuckets(){return on(this,void 0,void 0,function*(){try{return{data:yield ci(this.fetch,`${this.url}/bucket`,{headers:this.headers}),error:null}}catch(e){if(oe(e))return{data:null,error:e};throw e}})}getBucket(e){return on(this,void 0,void 0,function*(){try{return{data:yield ci(this.fetch,`${this.url}/bucket/${e}`,{headers:this.headers}),error:null}}catch(t){if(oe(t))return{data:null,error:t};throw t}})}createBucket(e,t={public:!1}){return on(this,void 0,void 0,function*(){try{return{data:yield Ze(this.fetch,`${this.url}/bucket`,{id:e,name:e,type:t.type,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:this.headers}),error:null}}catch(s){if(oe(s))return{data:null,error:s};throw s}})}updateBucket(e,t){return on(this,void 0,void 0,function*(){try{return{data:yield lo(this.fetch,`${this.url}/bucket/${e}`,{id:e,name:e,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:this.headers}),error:null}}catch(s){if(oe(s))return{data:null,error:s};throw s}})}emptyBucket(e){return on(this,void 0,void 0,function*(){try{return{data:yield Ze(this.fetch,`${this.url}/bucket/${e}/empty`,{},{headers:this.headers}),error:null}}catch(t){if(oe(t))return{data:null,error:t};throw t}})}deleteBucket(e){return on(this,void 0,void 0,function*(){try{return{data:yield gd(this.fetch,`${this.url}/bucket/${e}`,{},{headers:this.headers}),error:null}}catch(t){if(oe(t))return{data:null,error:t};throw t}})}}class $b extends Mb{constructor(e,t={},s,i){super(e,t,s,i)}from(e){return new xb(this.url,this.headers,e,this.fetch)}}const Fb="2.55.0";let Fn="";typeof Deno<"u"?Fn="deno":typeof document<"u"?Fn="web":typeof navigator<"u"&&navigator.product==="ReactNative"?Fn="react-native":Fn="node";const jb={"X-Client-Info":`supabase-js-${Fn}/${Fb}`},Bb={headers:jb},Ub={schema:"public"},Wb={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},Hb={};var Vb=function(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{c(s.next(u))}catch(h){o(h)}}function l(u){try{c(s.throw(u))}catch(h){o(h)}}function c(u){u.done?r(u.value):i(u.value).then(a,l)}c((s=s.apply(n,e||[])).next())})};const qb=n=>{let e;return n?e=n:typeof fetch>"u"?e=ed:e=fetch,(...t)=>e(...t)},zb=()=>typeof Headers>"u"?td:Headers,Kb=(n,e,t)=>{const s=qb(t),i=zb();return(r,o)=>Vb(void 0,void 0,void 0,function*(){var a;const l=(a=yield e())!==null&&a!==void 0?a:n;let c=new i(o==null?void 0:o.headers);return c.has("apikey")||c.set("apikey",n),c.has("Authorization")||c.set("Authorization",`Bearer ${l}`),s(r,Object.assign(Object.assign({},o),{headers:c}))})};var Gb=function(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{c(s.next(u))}catch(h){o(h)}}function l(u){try{c(s.throw(u))}catch(h){o(h)}}function c(u){u.done?r(u.value):i(u.value).then(a,l)}c((s=s.apply(n,e||[])).next())})};function Jb(n){return n.endsWith("/")?n:n+"/"}function Yb(n,e){var t,s;const{db:i,auth:r,realtime:o,global:a}=n,{db:l,auth:c,realtime:u,global:h}=e,d={db:Object.assign(Object.assign({},l),i),auth:Object.assign(Object.assign({},c),r),realtime:Object.assign(Object.assign({},u),o),storage:{},global:Object.assign(Object.assign(Object.assign({},h),a),{headers:Object.assign(Object.assign({},(t=h==null?void 0:h.headers)!==null&&t!==void 0?t:{}),(s=a==null?void 0:a.headers)!==null&&s!==void 0?s:{})}),accessToken:()=>Gb(this,void 0,void 0,function*(){return""})};return n.accessToken?d.accessToken=n.accessToken:delete d.accessToken,d}const md="2.71.1",hn=30*1e3,co=3,vr=co*hn,Qb="http://localhost:9999",Xb="supabase.auth.token",Zb={"X-Client-Info":`gotrue-js/${md}`},uo="X-Supabase-Api-Version",_d={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},e0=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,t0=10*60*1e3;class Sa extends Error{constructor(e,t,s){super(e),this.__isAuthError=!0,this.name="AuthError",this.status=t,this.code=s}}function x(n){return typeof n=="object"&&n!==null&&"__isAuthError"in n}class n0 extends Sa{constructor(e,t,s){super(e,t,s),this.name="AuthApiError",this.status=t,this.code=s}}function s0(n){return x(n)&&n.name==="AuthApiError"}class yd extends Sa{constructor(e,t){super(e),this.name="AuthUnknownError",this.originalError=t}}class At extends Sa{constructor(e,t,s,i){super(e,s,i),this.name=t,this.status=s}}class dt extends At{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}}function i0(n){return x(n)&&n.name==="AuthSessionMissingError"}class Cs extends At{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}}class As extends At{constructor(e){super(e,"AuthInvalidCredentialsError",400,void 0)}}class Ps extends At{constructor(e,t=null){super(e,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}function r0(n){return x(n)&&n.name==="AuthImplicitGrantRedirectError"}class cc extends At{constructor(e,t=null){super(e,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}class ho extends At{constructor(e,t){super(e,"AuthRetryableFetchError",t,void 0)}}function br(n){return x(n)&&n.name==="AuthRetryableFetchError"}class uc extends At{constructor(e,t,s){super(e,"AuthWeakPasswordError",t,"weak_password"),this.reasons=s}}class fo extends At{constructor(e){super(e,"AuthInvalidJwtError",400,"invalid_jwt")}}const ui="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),hc=` 	
\r=`.split(""),o0=(()=>{const n=new Array(128);for(let e=0;e<n.length;e+=1)n[e]=-1;for(let e=0;e<hc.length;e+=1)n[hc[e].charCodeAt(0)]=-2;for(let e=0;e<ui.length;e+=1)n[ui[e].charCodeAt(0)]=e;return n})();function dc(n,e,t){if(n!==null)for(e.queue=e.queue<<8|n,e.queuedBits+=8;e.queuedBits>=6;){const s=e.queue>>e.queuedBits-6&63;t(ui[s]),e.queuedBits-=6}else if(e.queuedBits>0)for(e.queue=e.queue<<6-e.queuedBits,e.queuedBits=6;e.queuedBits>=6;){const s=e.queue>>e.queuedBits-6&63;t(ui[s]),e.queuedBits-=6}}function wd(n,e,t){const s=o0[n];if(s>-1)for(e.queue=e.queue<<6|s,e.queuedBits+=6;e.queuedBits>=8;)t(e.queue>>e.queuedBits-8&255),e.queuedBits-=8;else{if(s===-2)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(n)}"`)}}function fc(n){const e=[],t=o=>{e.push(String.fromCodePoint(o))},s={utf8seq:0,codepoint:0},i={queue:0,queuedBits:0},r=o=>{c0(o,s,t)};for(let o=0;o<n.length;o+=1)wd(n.charCodeAt(o),i,r);return e.join("")}function a0(n,e){if(n<=127){e(n);return}else if(n<=2047){e(192|n>>6),e(128|n&63);return}else if(n<=65535){e(224|n>>12),e(128|n>>6&63),e(128|n&63);return}else if(n<=1114111){e(240|n>>18),e(128|n>>12&63),e(128|n>>6&63),e(128|n&63);return}throw new Error(`Unrecognized Unicode codepoint: ${n.toString(16)}`)}function l0(n,e){for(let t=0;t<n.length;t+=1){let s=n.charCodeAt(t);if(s>55295&&s<=56319){const i=(s-55296)*1024&65535;s=(n.charCodeAt(t+1)-56320&65535|i)+65536,t+=1}a0(s,e)}}function c0(n,e,t){if(e.utf8seq===0){if(n<=127){t(n);return}for(let s=1;s<6;s+=1)if(!(n>>7-s&1)){e.utf8seq=s;break}if(e.utf8seq===2)e.codepoint=n&31;else if(e.utf8seq===3)e.codepoint=n&15;else if(e.utf8seq===4)e.codepoint=n&7;else throw new Error("Invalid UTF-8 sequence");e.utf8seq-=1}else if(e.utf8seq>0){if(n<=127)throw new Error("Invalid UTF-8 sequence");e.codepoint=e.codepoint<<6|n&63,e.utf8seq-=1,e.utf8seq===0&&t(e.codepoint)}}function u0(n){const e=[],t={queue:0,queuedBits:0},s=i=>{e.push(i)};for(let i=0;i<n.length;i+=1)wd(n.charCodeAt(i),t,s);return new Uint8Array(e)}function h0(n){const e=[];return l0(n,t=>e.push(t)),new Uint8Array(e)}function d0(n){const e=[],t={queue:0,queuedBits:0},s=i=>{e.push(i)};return n.forEach(i=>dc(i,t,s)),dc(null,t,s),e.join("")}function f0(n){return Math.round(Date.now()/1e3)+n}function p0(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(n){const e=Math.random()*16|0;return(n=="x"?e:e&3|8).toString(16)})}const Oe=()=>typeof window<"u"&&typeof document<"u",Rt={tested:!1,writable:!1},vd=()=>{if(!Oe())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(Rt.tested)return Rt.writable;const n=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(n,n),globalThis.localStorage.removeItem(n),Rt.tested=!0,Rt.writable=!0}catch{Rt.tested=!0,Rt.writable=!1}return Rt.writable};function g0(n){const e={},t=new URL(n);if(t.hash&&t.hash[0]==="#")try{new URLSearchParams(t.hash.substring(1)).forEach((i,r)=>{e[r]=i})}catch{}return t.searchParams.forEach((s,i)=>{e[i]=s}),e}const bd=n=>{let e;return n?e=n:typeof fetch>"u"?e=(...t)=>vs(async()=>{const{default:s}=await Promise.resolve().then(()=>Rn);return{default:s}},void 0).then(({default:s})=>s(...t)):e=fetch,(...t)=>e(...t)},m0=n=>typeof n=="object"&&n!==null&&"status"in n&&"ok"in n&&"json"in n&&typeof n.json=="function",dn=async(n,e,t)=>{await n.setItem(e,JSON.stringify(t))},Ot=async(n,e)=>{const t=await n.getItem(e);if(!t)return null;try{return JSON.parse(t)}catch{return t}},ht=async(n,e)=>{await n.removeItem(e)};class Yi{constructor(){this.promise=new Yi.promiseConstructor((e,t)=>{this.resolve=e,this.reject=t})}}Yi.promiseConstructor=Promise;function Er(n){const e=n.split(".");if(e.length!==3)throw new fo("Invalid JWT structure");for(let s=0;s<e.length;s++)if(!e0.test(e[s]))throw new fo("JWT not in base64url format");return{header:JSON.parse(fc(e[0])),payload:JSON.parse(fc(e[1])),signature:u0(e[2]),raw:{header:e[0],payload:e[1]}}}async function _0(n){return await new Promise(e=>{setTimeout(()=>e(null),n)})}function y0(n,e){return new Promise((s,i)=>{(async()=>{for(let r=0;r<1/0;r++)try{const o=await n(r);if(!e(r,null,o)){s(o);return}}catch(o){if(!e(r,o)){i(o);return}}})()})}function w0(n){return("0"+n.toString(16)).substr(-2)}function v0(){const e=new Uint32Array(56);if(typeof crypto>"u"){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",s=t.length;let i="";for(let r=0;r<56;r++)i+=t.charAt(Math.floor(Math.random()*s));return i}return crypto.getRandomValues(e),Array.from(e,w0).join("")}async function b0(n){const t=new TextEncoder().encode(n),s=await crypto.subtle.digest("SHA-256",t),i=new Uint8Array(s);return Array.from(i).map(r=>String.fromCharCode(r)).join("")}async function E0(n){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),n;const t=await b0(n);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function an(n,e,t=!1){const s=v0();let i=s;t&&(i+="/PASSWORD_RECOVERY"),await dn(n,`${e}-code-verifier`,i);const r=await E0(s);return[r,s===r?"plain":"s256"]}const T0=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function S0(n){const e=n.headers.get(uo);if(!e||!e.match(T0))return null;try{return new Date(`${e}T00:00:00.0Z`)}catch{return null}}function k0(n){if(!n)throw new Error("Missing exp claim");const e=Math.floor(Date.now()/1e3);if(n<=e)throw new Error("JWT has expired")}function I0(n){switch(n){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}const C0=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;function ln(n){if(!C0.test(n))throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function Tr(){const n={};return new Proxy(n,{get:(e,t)=>{if(t==="__isUserNotAvailableProxy")return!0;if(typeof t=="symbol"){const s=t.toString();if(s==="Symbol(Symbol.toPrimitive)"||s==="Symbol(Symbol.toStringTag)"||s==="Symbol(util.inspect.custom)")return}throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${t}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,t)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,t)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function pc(n){return JSON.parse(JSON.stringify(n))}var A0=function(n,e){var t={};for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&e.indexOf(s)<0&&(t[s]=n[s]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,s=Object.getOwnPropertySymbols(n);i<s.length;i++)e.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(n,s[i])&&(t[s[i]]=n[s[i]]);return t};const Dt=n=>n.msg||n.message||n.error_description||n.error||JSON.stringify(n),P0=[502,503,504];async function gc(n){var e;if(!m0(n))throw new ho(Dt(n),0);if(P0.includes(n.status))throw new ho(Dt(n),n.status);let t;try{t=await n.json()}catch(r){throw new yd(Dt(r),r)}let s;const i=S0(n);if(i&&i.getTime()>=_d["2024-01-01"].timestamp&&typeof t=="object"&&t&&typeof t.code=="string"?s=t.code:typeof t=="object"&&t&&typeof t.error_code=="string"&&(s=t.error_code),s){if(s==="weak_password")throw new uc(Dt(t),n.status,((e=t.weak_password)===null||e===void 0?void 0:e.reasons)||[]);if(s==="session_not_found")throw new dt}else if(typeof t=="object"&&t&&typeof t.weak_password=="object"&&t.weak_password&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.reasons.reduce((r,o)=>r&&typeof o=="string",!0))throw new uc(Dt(t),n.status,t.weak_password.reasons);throw new n0(Dt(t),n.status||500,s)}const R0=(n,e,t,s)=>{const i={method:n,headers:(e==null?void 0:e.headers)||{}};return n==="GET"?i:(i.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},e==null?void 0:e.headers),i.body=JSON.stringify(s),Object.assign(Object.assign({},i),t))};async function j(n,e,t,s){var i;const r=Object.assign({},s==null?void 0:s.headers);r[uo]||(r[uo]=_d["2024-01-01"].name),s!=null&&s.jwt&&(r.Authorization=`Bearer ${s.jwt}`);const o=(i=s==null?void 0:s.query)!==null&&i!==void 0?i:{};s!=null&&s.redirectTo&&(o.redirect_to=s.redirectTo);const a=Object.keys(o).length?"?"+new URLSearchParams(o).toString():"",l=await O0(n,e,t+a,{headers:r,noResolveJson:s==null?void 0:s.noResolveJson},{},s==null?void 0:s.body);return s!=null&&s.xform?s==null?void 0:s.xform(l):{data:Object.assign({},l),error:null}}async function O0(n,e,t,s,i,r){const o=R0(e,s,i,r);let a;try{a=await n(t,Object.assign({},o))}catch(l){throw console.error(l),new ho(Dt(l),0)}if(a.ok||await gc(a),s!=null&&s.noResolveJson)return a;try{return await a.json()}catch(l){await gc(l)}}function Je(n){var e;let t=null;L0(n)&&(t=Object.assign({},n),n.expires_at||(t.expires_at=f0(n.expires_in)));const s=(e=n.user)!==null&&e!==void 0?e:n;return{data:{session:t,user:s},error:null}}function mc(n){const e=Je(n);return!e.error&&n.weak_password&&typeof n.weak_password=="object"&&Array.isArray(n.weak_password.reasons)&&n.weak_password.reasons.length&&n.weak_password.message&&typeof n.weak_password.message=="string"&&n.weak_password.reasons.reduce((t,s)=>t&&typeof s=="string",!0)&&(e.data.weak_password=n.weak_password),e}function ft(n){var e;return{data:{user:(e=n.user)!==null&&e!==void 0?e:n},error:null}}function N0(n){return{data:n,error:null}}function x0(n){const{action_link:e,email_otp:t,hashed_token:s,redirect_to:i,verification_type:r}=n,o=A0(n,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),a={action_link:e,email_otp:t,hashed_token:s,redirect_to:i,verification_type:r},l=Object.assign({},o);return{data:{properties:a,user:l},error:null}}function D0(n){return n}function L0(n){return n.access_token&&n.refresh_token&&n.expires_in}const Sr=["global","local","others"];var M0=function(n,e){var t={};for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&e.indexOf(s)<0&&(t[s]=n[s]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,s=Object.getOwnPropertySymbols(n);i<s.length;i++)e.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(n,s[i])&&(t[s[i]]=n[s[i]]);return t};class $0{constructor({url:e="",headers:t={},fetch:s}){this.url=e,this.headers=t,this.fetch=bd(s),this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)}}async signOut(e,t=Sr[0]){if(Sr.indexOf(t)<0)throw new Error(`@supabase/auth-js: Parameter scope must be one of ${Sr.join(", ")}`);try{return await j(this.fetch,"POST",`${this.url}/logout?scope=${t}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(s){if(x(s))return{data:null,error:s};throw s}}async inviteUserByEmail(e,t={}){try{return await j(this.fetch,"POST",`${this.url}/invite`,{body:{email:e,data:t.data},headers:this.headers,redirectTo:t.redirectTo,xform:ft})}catch(s){if(x(s))return{data:{user:null},error:s};throw s}}async generateLink(e){try{const{options:t}=e,s=M0(e,["options"]),i=Object.assign(Object.assign({},s),t);return"newEmail"in s&&(i.new_email=s==null?void 0:s.newEmail,delete i.newEmail),await j(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:i,headers:this.headers,xform:x0,redirectTo:t==null?void 0:t.redirectTo})}catch(t){if(x(t))return{data:{properties:null,user:null},error:t};throw t}}async createUser(e){try{return await j(this.fetch,"POST",`${this.url}/admin/users`,{body:e,headers:this.headers,xform:ft})}catch(t){if(x(t))return{data:{user:null},error:t};throw t}}async listUsers(e){var t,s,i,r,o,a,l;try{const c={nextPage:null,lastPage:0,total:0},u=await j(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(s=(t=e==null?void 0:e.page)===null||t===void 0?void 0:t.toString())!==null&&s!==void 0?s:"",per_page:(r=(i=e==null?void 0:e.perPage)===null||i===void 0?void 0:i.toString())!==null&&r!==void 0?r:""},xform:D0});if(u.error)throw u.error;const h=await u.json(),d=(o=u.headers.get("x-total-count"))!==null&&o!==void 0?o:0,g=(l=(a=u.headers.get("link"))===null||a===void 0?void 0:a.split(","))!==null&&l!==void 0?l:[];return g.length>0&&(g.forEach(y=>{const T=parseInt(y.split(";")[0].split("=")[1].substring(0,1)),E=JSON.parse(y.split(";")[1].split("=")[1]);c[`${E}Page`]=T}),c.total=parseInt(d)),{data:Object.assign(Object.assign({},h),c),error:null}}catch(c){if(x(c))return{data:{users:[]},error:c};throw c}}async getUserById(e){ln(e);try{return await j(this.fetch,"GET",`${this.url}/admin/users/${e}`,{headers:this.headers,xform:ft})}catch(t){if(x(t))return{data:{user:null},error:t};throw t}}async updateUserById(e,t){ln(e);try{return await j(this.fetch,"PUT",`${this.url}/admin/users/${e}`,{body:t,headers:this.headers,xform:ft})}catch(s){if(x(s))return{data:{user:null},error:s};throw s}}async deleteUser(e,t=!1){ln(e);try{return await j(this.fetch,"DELETE",`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:t},xform:ft})}catch(s){if(x(s))return{data:{user:null},error:s};throw s}}async _listFactors(e){ln(e.userId);try{const{data:t,error:s}=await j(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:i=>({data:{factors:i},error:null})});return{data:t,error:s}}catch(t){if(x(t))return{data:null,error:t};throw t}}async _deleteFactor(e){ln(e.userId),ln(e.id);try{return{data:await j(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(t){if(x(t))return{data:null,error:t};throw t}}}function _c(n={}){return{getItem:e=>n[e]||null,setItem:(e,t)=>{n[e]=t},removeItem:e=>{delete n[e]}}}function F0(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}const cn={debug:!!(globalThis&&vd()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug")==="true")};class Ed extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}}class j0 extends Ed{}async function B0(n,e,t){cn.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire lock",n,e);const s=new globalThis.AbortController;return e>0&&setTimeout(()=>{s.abort(),cn.debug&&console.log("@supabase/gotrue-js: navigatorLock acquire timed out",n)},e),await Promise.resolve().then(()=>globalThis.navigator.locks.request(n,e===0?{mode:"exclusive",ifAvailable:!0}:{mode:"exclusive",signal:s.signal},async i=>{if(i){cn.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquired",n,i.name);try{return await t()}finally{cn.debug&&console.log("@supabase/gotrue-js: navigatorLock: released",n,i.name)}}else{if(e===0)throw cn.debug&&console.log("@supabase/gotrue-js: navigatorLock: not immediately available",n),new j0(`Acquiring an exclusive Navigator LockManager lock "${n}" immediately failed`);if(cn.debug)try{const r=await globalThis.navigator.locks.query();console.log("@supabase/gotrue-js: Navigator LockManager state",JSON.stringify(r,null,"  "))}catch(r){console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state",r)}return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"),await t()}}))}F0();const U0={url:Qb,storageKey:Xb,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:Zb,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1};async function yc(n,e,t){return await t()}const un={};class ls{constructor(e){var t,s;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log,this.instanceID=ls.nextInstanceID,ls.nextInstanceID+=1,this.instanceID>0&&Oe()&&console.warn("Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.");const i=Object.assign(Object.assign({},U0),e);if(this.logDebugMessages=!!i.debug,typeof i.debug=="function"&&(this.logger=i.debug),this.persistSession=i.persistSession,this.storageKey=i.storageKey,this.autoRefreshToken=i.autoRefreshToken,this.admin=new $0({url:i.url,headers:i.headers,fetch:i.fetch}),this.url=i.url,this.headers=i.headers,this.fetch=bd(i.fetch),this.lock=i.lock||yc,this.detectSessionInUrl=i.detectSessionInUrl,this.flowType=i.flowType,this.hasCustomAuthorizationHeader=i.hasCustomAuthorizationHeader,i.lock?this.lock=i.lock:Oe()&&(!((t=globalThis==null?void 0:globalThis.navigator)===null||t===void 0)&&t.locks)?this.lock=B0:this.lock=yc,this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this)},this.persistSession?(i.storage?this.storage=i.storage:vd()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=_c(this.memoryStorage)),i.userStorage&&(this.userStorage=i.userStorage)):(this.memoryStorage={},this.storage=_c(this.memoryStorage)),Oe()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(r){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",r)}(s=this.broadcastChannel)===null||s===void 0||s.addEventListener("message",async r=>{this._debug("received broadcast notification from other tab or client",r),await this._notifyAllSubscribers(r.data.event,r.data.session,!1)})}this.initialize()}get jwks(){var e,t;return(t=(e=un[this.storageKey])===null||e===void 0?void 0:e.jwks)!==null&&t!==void 0?t:{keys:[]}}set jwks(e){un[this.storageKey]=Object.assign(Object.assign({},un[this.storageKey]),{jwks:e})}get jwks_cached_at(){var e,t;return(t=(e=un[this.storageKey])===null||e===void 0?void 0:e.cachedAt)!==null&&t!==void 0?t:Number.MIN_SAFE_INTEGER}set jwks_cached_at(e){un[this.storageKey]=Object.assign(Object.assign({},un[this.storageKey]),{cachedAt:e})}_debug(...e){return this.logDebugMessages&&this.logger(`GoTrueClient@${this.instanceID} (${md}) ${new Date().toISOString()}`,...e),this}async initialize(){return this.initializePromise?await this.initializePromise:(this.initializePromise=(async()=>await this._acquireLock(-1,async()=>await this._initialize()))(),await this.initializePromise)}async _initialize(){var e;try{const t=g0(window.location.href);let s="none";if(this._isImplicitGrantCallback(t)?s="implicit":await this._isPKCECallback(t)&&(s="pkce"),Oe()&&this.detectSessionInUrl&&s!=="none"){const{data:i,error:r}=await this._getSessionFromURL(t,s);if(r){if(this._debug("#_initialize()","error detecting session from URL",r),r0(r)){const l=(e=r.details)===null||e===void 0?void 0:e.code;if(l==="identity_already_exists"||l==="identity_not_found"||l==="single_identity_not_deletable")return{error:r}}return await this._removeSession(),{error:r}}const{session:o,redirectType:a}=i;return this._debug("#_initialize()","detected session in URL",o,"redirect type",a),await this._saveSession(o),setTimeout(async()=>{a==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",o):await this._notifyAllSubscribers("SIGNED_IN",o)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(t){return x(t)?{error:t}:{error:new yd("Unexpected error during initialization",t)}}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(e){var t,s,i;try{const r=await j(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(s=(t=e==null?void 0:e.options)===null||t===void 0?void 0:t.data)!==null&&s!==void 0?s:{},gotrue_meta_security:{captcha_token:(i=e==null?void 0:e.options)===null||i===void 0?void 0:i.captchaToken}},xform:Je}),{data:o,error:a}=r;if(a||!o)return{data:{user:null,session:null},error:a};const l=o.session,c=o.user;return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",l)),{data:{user:c,session:l},error:null}}catch(r){if(x(r))return{data:{user:null,session:null},error:r};throw r}}async signUp(e){var t,s,i;try{let r;if("email"in e){const{email:u,password:h,options:d}=e;let g=null,y=null;this.flowType==="pkce"&&([g,y]=await an(this.storage,this.storageKey)),r=await j(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:d==null?void 0:d.emailRedirectTo,body:{email:u,password:h,data:(t=d==null?void 0:d.data)!==null&&t!==void 0?t:{},gotrue_meta_security:{captcha_token:d==null?void 0:d.captchaToken},code_challenge:g,code_challenge_method:y},xform:Je})}else if("phone"in e){const{phone:u,password:h,options:d}=e;r=await j(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:u,password:h,data:(s=d==null?void 0:d.data)!==null&&s!==void 0?s:{},channel:(i=d==null?void 0:d.channel)!==null&&i!==void 0?i:"sms",gotrue_meta_security:{captcha_token:d==null?void 0:d.captchaToken}},xform:Je})}else throw new As("You must provide either an email or phone number and a password");const{data:o,error:a}=r;if(a||!o)return{data:{user:null,session:null},error:a};const l=o.session,c=o.user;return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",l)),{data:{user:c,session:l},error:null}}catch(r){if(x(r))return{data:{user:null,session:null},error:r};throw r}}async signInWithPassword(e){try{let t;if("email"in e){const{email:r,password:o,options:a}=e;t=await j(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:r,password:o,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}},xform:mc})}else if("phone"in e){const{phone:r,password:o,options:a}=e;t=await j(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:r,password:o,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}},xform:mc})}else throw new As("You must provide either an email or phone number and a password");const{data:s,error:i}=t;return i?{data:{user:null,session:null},error:i}:!s||!s.session||!s.user?{data:{user:null,session:null},error:new Cs}:(s.session&&(await this._saveSession(s.session),await this._notifyAllSubscribers("SIGNED_IN",s.session)),{data:Object.assign({user:s.user,session:s.session},s.weak_password?{weakPassword:s.weak_password}:null),error:i})}catch(t){if(x(t))return{data:{user:null,session:null},error:t};throw t}}async signInWithOAuth(e){var t,s,i,r;return await this._handleProviderSignIn(e.provider,{redirectTo:(t=e.options)===null||t===void 0?void 0:t.redirectTo,scopes:(s=e.options)===null||s===void 0?void 0:s.scopes,queryParams:(i=e.options)===null||i===void 0?void 0:i.queryParams,skipBrowserRedirect:(r=e.options)===null||r===void 0?void 0:r.skipBrowserRedirect})}async exchangeCodeForSession(e){return await this.initializePromise,this._acquireLock(-1,async()=>this._exchangeCodeForSession(e))}async signInWithWeb3(e){const{chain:t}=e;if(t==="solana")return await this.signInWithSolana(e);throw new Error(`@supabase/auth-js: Unsupported chain "${t}"`)}async signInWithSolana(e){var t,s,i,r,o,a,l,c,u,h,d,g;let y,T;if("message"in e)y=e.message,T=e.signature;else{const{chain:E,wallet:P,statement:D,options:I}=e;let N;if(Oe())if(typeof P=="object")N=P;else{const B=window;if("solana"in B&&typeof B.solana=="object"&&("signIn"in B.solana&&typeof B.solana.signIn=="function"||"signMessage"in B.solana&&typeof B.solana.signMessage=="function"))N=B.solana;else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")}else{if(typeof P!="object"||!(I!=null&&I.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");N=P}const z=new URL((t=I==null?void 0:I.url)!==null&&t!==void 0?t:window.location.href);if("signIn"in N&&N.signIn){const B=await N.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},I==null?void 0:I.signInWithSolana),{version:"1",domain:z.host,uri:z.href}),D?{statement:D}:null));let _;if(Array.isArray(B)&&B[0]&&typeof B[0]=="object")_=B[0];else if(B&&typeof B=="object"&&"signedMessage"in B&&"signature"in B)_=B;else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");if("signedMessage"in _&&"signature"in _&&(typeof _.signedMessage=="string"||_.signedMessage instanceof Uint8Array)&&_.signature instanceof Uint8Array)y=typeof _.signedMessage=="string"?_.signedMessage:new TextDecoder().decode(_.signedMessage),T=_.signature;else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")}else{if(!("signMessage"in N)||typeof N.signMessage!="function"||!("publicKey"in N)||typeof N!="object"||!N.publicKey||!("toBase58"in N.publicKey)||typeof N.publicKey.toBase58!="function")throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");y=[`${z.host} wants you to sign in with your Solana account:`,N.publicKey.toBase58(),...D?["",D,""]:[""],"Version: 1",`URI: ${z.href}`,`Issued At: ${(i=(s=I==null?void 0:I.signInWithSolana)===null||s===void 0?void 0:s.issuedAt)!==null&&i!==void 0?i:new Date().toISOString()}`,...!((r=I==null?void 0:I.signInWithSolana)===null||r===void 0)&&r.notBefore?[`Not Before: ${I.signInWithSolana.notBefore}`]:[],...!((o=I==null?void 0:I.signInWithSolana)===null||o===void 0)&&o.expirationTime?[`Expiration Time: ${I.signInWithSolana.expirationTime}`]:[],...!((a=I==null?void 0:I.signInWithSolana)===null||a===void 0)&&a.chainId?[`Chain ID: ${I.signInWithSolana.chainId}`]:[],...!((l=I==null?void 0:I.signInWithSolana)===null||l===void 0)&&l.nonce?[`Nonce: ${I.signInWithSolana.nonce}`]:[],...!((c=I==null?void 0:I.signInWithSolana)===null||c===void 0)&&c.requestId?[`Request ID: ${I.signInWithSolana.requestId}`]:[],...!((h=(u=I==null?void 0:I.signInWithSolana)===null||u===void 0?void 0:u.resources)===null||h===void 0)&&h.length?["Resources",...I.signInWithSolana.resources.map(_=>`- ${_}`)]:[]].join(`
`);const B=await N.signMessage(new TextEncoder().encode(y),"utf8");if(!B||!(B instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");T=B}}try{const{data:E,error:P}=await j(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:y,signature:d0(T)},!((d=e.options)===null||d===void 0)&&d.captchaToken?{gotrue_meta_security:{captcha_token:(g=e.options)===null||g===void 0?void 0:g.captchaToken}}:null),xform:Je});if(P)throw P;return!E||!E.session||!E.user?{data:{user:null,session:null},error:new Cs}:(E.session&&(await this._saveSession(E.session),await this._notifyAllSubscribers("SIGNED_IN",E.session)),{data:Object.assign({},E),error:P})}catch(E){if(x(E))return{data:{user:null,session:null},error:E};throw E}}async _exchangeCodeForSession(e){const t=await Ot(this.storage,`${this.storageKey}-code-verifier`),[s,i]=(t??"").split("/");try{const{data:r,error:o}=await j(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:s},xform:Je});if(await ht(this.storage,`${this.storageKey}-code-verifier`),o)throw o;return!r||!r.session||!r.user?{data:{user:null,session:null,redirectType:null},error:new Cs}:(r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers("SIGNED_IN",r.session)),{data:Object.assign(Object.assign({},r),{redirectType:i??null}),error:o})}catch(r){if(x(r))return{data:{user:null,session:null,redirectType:null},error:r};throw r}}async signInWithIdToken(e){try{const{options:t,provider:s,token:i,access_token:r,nonce:o}=e,a=await j(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:s,id_token:i,access_token:r,nonce:o,gotrue_meta_security:{captcha_token:t==null?void 0:t.captchaToken}},xform:Je}),{data:l,error:c}=a;return c?{data:{user:null,session:null},error:c}:!l||!l.session||!l.user?{data:{user:null,session:null},error:new Cs}:(l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers("SIGNED_IN",l.session)),{data:l,error:c})}catch(t){if(x(t))return{data:{user:null,session:null},error:t};throw t}}async signInWithOtp(e){var t,s,i,r,o;try{if("email"in e){const{email:a,options:l}=e;let c=null,u=null;this.flowType==="pkce"&&([c,u]=await an(this.storage,this.storageKey));const{error:h}=await j(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:a,data:(t=l==null?void 0:l.data)!==null&&t!==void 0?t:{},create_user:(s=l==null?void 0:l.shouldCreateUser)!==null&&s!==void 0?s:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},code_challenge:c,code_challenge_method:u},redirectTo:l==null?void 0:l.emailRedirectTo});return{data:{user:null,session:null},error:h}}if("phone"in e){const{phone:a,options:l}=e,{data:c,error:u}=await j(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:a,data:(i=l==null?void 0:l.data)!==null&&i!==void 0?i:{},create_user:(r=l==null?void 0:l.shouldCreateUser)!==null&&r!==void 0?r:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},channel:(o=l==null?void 0:l.channel)!==null&&o!==void 0?o:"sms"}});return{data:{user:null,session:null,messageId:c==null?void 0:c.message_id},error:u}}throw new As("You must provide either an email or phone number.")}catch(a){if(x(a))return{data:{user:null,session:null},error:a};throw a}}async verifyOtp(e){var t,s;try{let i,r;"options"in e&&(i=(t=e.options)===null||t===void 0?void 0:t.redirectTo,r=(s=e.options)===null||s===void 0?void 0:s.captchaToken);const{data:o,error:a}=await j(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:r}}),redirectTo:i,xform:Je});if(a)throw a;if(!o)throw new Error("An error occurred on token verification.");const l=o.session,c=o.user;return l!=null&&l.access_token&&(await this._saveSession(l),await this._notifyAllSubscribers(e.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",l)),{data:{user:c,session:l},error:null}}catch(i){if(x(i))return{data:{user:null,session:null},error:i};throw i}}async signInWithSSO(e){var t,s,i;try{let r=null,o=null;return this.flowType==="pkce"&&([r,o]=await an(this.storage,this.storageKey)),await j(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in e?{provider_id:e.providerId}:null),"domain"in e?{domain:e.domain}:null),{redirect_to:(s=(t=e.options)===null||t===void 0?void 0:t.redirectTo)!==null&&s!==void 0?s:void 0}),!((i=e==null?void 0:e.options)===null||i===void 0)&&i.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:r,code_challenge_method:o}),headers:this.headers,xform:N0})}catch(r){if(x(r))return{data:null,error:r};throw r}}async reauthenticate(){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async e=>{const{data:{session:t},error:s}=e;if(s)throw s;if(!t)throw new dt;const{error:i}=await j(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:t.access_token});return{data:{user:null,session:null},error:i}})}catch(e){if(x(e))return{data:{user:null,session:null},error:e};throw e}}async resend(e){try{const t=`${this.url}/resend`;if("email"in e){const{email:s,type:i,options:r}=e,{error:o}=await j(this.fetch,"POST",t,{headers:this.headers,body:{email:s,type:i,gotrue_meta_security:{captcha_token:r==null?void 0:r.captchaToken}},redirectTo:r==null?void 0:r.emailRedirectTo});return{data:{user:null,session:null},error:o}}else if("phone"in e){const{phone:s,type:i,options:r}=e,{data:o,error:a}=await j(this.fetch,"POST",t,{headers:this.headers,body:{phone:s,type:i,gotrue_meta_security:{captcha_token:r==null?void 0:r.captchaToken}}});return{data:{user:null,session:null,messageId:o==null?void 0:o.message_id},error:a}}throw new As("You must provide either an email or phone number and a type")}catch(t){if(x(t))return{data:{user:null,session:null},error:t};throw t}}async getSession(){return await this.initializePromise,await this._acquireLock(-1,async()=>this._useSession(async t=>t))}async _acquireLock(e,t){this._debug("#_acquireLock","begin",e);try{if(this.lockAcquired){const s=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),i=(async()=>(await s,await t()))();return this.pendingInLock.push((async()=>{try{await i}catch{}})()),i}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const s=t();for(this.pendingInLock.push((async()=>{try{await s}catch{}})()),await s;this.pendingInLock.length;){const i=[...this.pendingInLock];await Promise.all(i),this.pendingInLock.splice(0,i.length)}return await s}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(e){this._debug("#_useSession","begin");try{const t=await this.__loadSession();return await e(t)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lockAcquired||this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let e=null;const t=await Ot(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",t),t!==null&&(this._isValidSession(t)?e=t:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!e)return{data:{session:null},error:null};const s=e.expires_at?e.expires_at*1e3-Date.now()<vr:!1;if(this._debug("#__loadSession()",`session has${s?"":" not"} expired`,"expires_at",e.expires_at),!s){if(this.userStorage){const o=await Ot(this.userStorage,this.storageKey+"-user");o!=null&&o.user?e.user=o.user:e.user=Tr()}if(this.storage.isServer&&e.user){let o=this.suppressGetSessionWarning;e=new Proxy(e,{get:(l,c,u)=>(!o&&c==="user"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),o=!0,this.suppressGetSessionWarning=!0),Reflect.get(l,c,u))})}return{data:{session:e},error:null}}const{session:i,error:r}=await this._callRefreshToken(e.refresh_token);return r?{data:{session:null},error:r}:{data:{session:i},error:null}}finally{this._debug("#__loadSession()","end")}}async getUser(e){return e?await this._getUser(e):(await this.initializePromise,await this._acquireLock(-1,async()=>await this._getUser()))}async _getUser(e){try{return e?await j(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:e,xform:ft}):await this._useSession(async t=>{var s,i,r;const{data:o,error:a}=t;if(a)throw a;return!(!((s=o.session)===null||s===void 0)&&s.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new dt}:await j(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(r=(i=o.session)===null||i===void 0?void 0:i.access_token)!==null&&r!==void 0?r:void 0,xform:ft})})}catch(t){if(x(t))return i0(t)&&(await this._removeSession(),await ht(this.storage,`${this.storageKey}-code-verifier`)),{data:{user:null},error:t};throw t}}async updateUser(e,t={}){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._updateUser(e,t))}async _updateUser(e,t={}){try{return await this._useSession(async s=>{const{data:i,error:r}=s;if(r)throw r;if(!i.session)throw new dt;const o=i.session;let a=null,l=null;this.flowType==="pkce"&&e.email!=null&&([a,l]=await an(this.storage,this.storageKey));const{data:c,error:u}=await j(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:t==null?void 0:t.emailRedirectTo,body:Object.assign(Object.assign({},e),{code_challenge:a,code_challenge_method:l}),jwt:o.access_token,xform:ft});if(u)throw u;return o.user=c.user,await this._saveSession(o),await this._notifyAllSubscribers("USER_UPDATED",o),{data:{user:o.user},error:null}})}catch(s){if(x(s))return{data:{user:null},error:s};throw s}}async setSession(e){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._setSession(e))}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new dt;const t=Date.now()/1e3;let s=t,i=!0,r=null;const{payload:o}=Er(e.access_token);if(o.exp&&(s=o.exp,i=s<=t),i){const{session:a,error:l}=await this._callRefreshToken(e.refresh_token);if(l)return{data:{user:null,session:null},error:l};if(!a)return{data:{user:null,session:null},error:null};r=a}else{const{data:a,error:l}=await this._getUser(e.access_token);if(l)throw l;r={access_token:e.access_token,refresh_token:e.refresh_token,user:a.user,token_type:"bearer",expires_in:s-t,expires_at:s},await this._saveSession(r),await this._notifyAllSubscribers("SIGNED_IN",r)}return{data:{user:r.user,session:r},error:null}}catch(t){if(x(t))return{data:{session:null,user:null},error:t};throw t}}async refreshSession(e){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._refreshSession(e))}async _refreshSession(e){try{return await this._useSession(async t=>{var s;if(!e){const{data:o,error:a}=t;if(a)throw a;e=(s=o.session)!==null&&s!==void 0?s:void 0}if(!(e!=null&&e.refresh_token))throw new dt;const{session:i,error:r}=await this._callRefreshToken(e.refresh_token);return r?{data:{user:null,session:null},error:r}:i?{data:{user:i.user,session:i},error:null}:{data:{user:null,session:null},error:null}})}catch(t){if(x(t))return{data:{user:null,session:null},error:t};throw t}}async _getSessionFromURL(e,t){try{if(!Oe())throw new Ps("No browser detected.");if(e.error||e.error_description||e.error_code)throw new Ps(e.error_description||"Error in URL with unspecified error_description",{error:e.error||"unspecified_error",code:e.error_code||"unspecified_code"});switch(t){case"implicit":if(this.flowType==="pkce")throw new cc("Not a valid PKCE flow url.");break;case"pkce":if(this.flowType==="implicit")throw new Ps("Not a valid implicit grant flow url.");break;default:}if(t==="pkce"){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!e.code)throw new cc("No code detected.");const{data:D,error:I}=await this._exchangeCodeForSession(e.code);if(I)throw I;const N=new URL(window.location.href);return N.searchParams.delete("code"),window.history.replaceState(window.history.state,"",N.toString()),{data:{session:D.session,redirectType:null},error:null}}const{provider_token:s,provider_refresh_token:i,access_token:r,refresh_token:o,expires_in:a,expires_at:l,token_type:c}=e;if(!r||!a||!o||!c)throw new Ps("No session defined in URL");const u=Math.round(Date.now()/1e3),h=parseInt(a);let d=u+h;l&&(d=parseInt(l));const g=d-u;g*1e3<=hn&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${g}s, should have been closer to ${h}s`);const y=d-h;u-y>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",y,d,u):u-y<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",y,d,u);const{data:T,error:E}=await this._getUser(r);if(E)throw E;const P={provider_token:s,provider_refresh_token:i,access_token:r,expires_in:h,expires_at:d,refresh_token:o,token_type:c,user:T.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),{data:{session:P,redirectType:e.type},error:null}}catch(s){if(x(s))return{data:{session:null,redirectType:null},error:s};throw s}}_isImplicitGrantCallback(e){return!!(e.access_token||e.error_description)}async _isPKCECallback(e){const t=await Ot(this.storage,`${this.storageKey}-code-verifier`);return!!(e.code&&t)}async signOut(e={scope:"global"}){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._signOut(e))}async _signOut({scope:e}={scope:"global"}){return await this._useSession(async t=>{var s;const{data:i,error:r}=t;if(r)return{error:r};const o=(s=i.session)===null||s===void 0?void 0:s.access_token;if(o){const{error:a}=await this.admin.signOut(o,e);if(a&&!(s0(a)&&(a.status===404||a.status===401||a.status===403)))return{error:a}}return e!=="others"&&(await this._removeSession(),await ht(this.storage,`${this.storageKey}-code-verifier`)),{error:null}})}onAuthStateChange(e){const t=p0(),s={id:t,callback:e,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",t),this.stateChangeEmitters.delete(t)}};return this._debug("#onAuthStateChange()","registered callback with id",t),this.stateChangeEmitters.set(t,s),(async()=>(await this.initializePromise,await this._acquireLock(-1,async()=>{this._emitInitialSession(t)})))(),{data:{subscription:s}}}async _emitInitialSession(e){return await this._useSession(async t=>{var s,i;try{const{data:{session:r},error:o}=t;if(o)throw o;await((s=this.stateChangeEmitters.get(e))===null||s===void 0?void 0:s.callback("INITIAL_SESSION",r)),this._debug("INITIAL_SESSION","callback id",e,"session",r)}catch(r){await((i=this.stateChangeEmitters.get(e))===null||i===void 0?void 0:i.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",e,"error",r),console.error(r)}})}async resetPasswordForEmail(e,t={}){let s=null,i=null;this.flowType==="pkce"&&([s,i]=await an(this.storage,this.storageKey,!0));try{return await j(this.fetch,"POST",`${this.url}/recover`,{body:{email:e,code_challenge:s,code_challenge_method:i,gotrue_meta_security:{captcha_token:t.captchaToken}},headers:this.headers,redirectTo:t.redirectTo})}catch(r){if(x(r))return{data:null,error:r};throw r}}async getUserIdentities(){var e;try{const{data:t,error:s}=await this.getUser();if(s)throw s;return{data:{identities:(e=t.user.identities)!==null&&e!==void 0?e:[]},error:null}}catch(t){if(x(t))return{data:null,error:t};throw t}}async linkIdentity(e){var t;try{const{data:s,error:i}=await this._useSession(async r=>{var o,a,l,c,u;const{data:h,error:d}=r;if(d)throw d;const g=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:(o=e.options)===null||o===void 0?void 0:o.redirectTo,scopes:(a=e.options)===null||a===void 0?void 0:a.scopes,queryParams:(l=e.options)===null||l===void 0?void 0:l.queryParams,skipBrowserRedirect:!0});return await j(this.fetch,"GET",g,{headers:this.headers,jwt:(u=(c=h.session)===null||c===void 0?void 0:c.access_token)!==null&&u!==void 0?u:void 0})});if(i)throw i;return Oe()&&!(!((t=e.options)===null||t===void 0)&&t.skipBrowserRedirect)&&window.location.assign(s==null?void 0:s.url),{data:{provider:e.provider,url:s==null?void 0:s.url},error:null}}catch(s){if(x(s))return{data:{provider:e.provider,url:null},error:s};throw s}}async unlinkIdentity(e){try{return await this._useSession(async t=>{var s,i;const{data:r,error:o}=t;if(o)throw o;return await j(this.fetch,"DELETE",`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:(i=(s=r.session)===null||s===void 0?void 0:s.access_token)!==null&&i!==void 0?i:void 0})})}catch(t){if(x(t))return{data:null,error:t};throw t}}async _refreshAccessToken(e){const t=`#_refreshAccessToken(${e.substring(0,5)}...)`;this._debug(t,"begin");try{const s=Date.now();return await y0(async i=>(i>0&&await _0(200*Math.pow(2,i-1)),this._debug(t,"refreshing attempt",i),await j(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:Je})),(i,r)=>{const o=200*Math.pow(2,i);return r&&br(r)&&Date.now()+o-s<hn})}catch(s){if(this._debug(t,"error",s),x(s))return{data:{session:null,user:null},error:s};throw s}finally{this._debug(t,"end")}}_isValidSession(e){return typeof e=="object"&&e!==null&&"access_token"in e&&"refresh_token"in e&&"expires_at"in e}async _handleProviderSignIn(e,t){const s=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:t.redirectTo,scopes:t.scopes,queryParams:t.queryParams});return this._debug("#_handleProviderSignIn()","provider",e,"options",t,"url",s),Oe()&&!t.skipBrowserRedirect&&window.location.assign(s),{data:{provider:e,url:s},error:null}}async _recoverAndRefresh(){var e,t;const s="#_recoverAndRefresh()";this._debug(s,"begin");try{const i=await Ot(this.storage,this.storageKey);if(i&&this.userStorage){let o=await Ot(this.userStorage,this.storageKey+"-user");!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!o&&(o={user:i.user},await dn(this.userStorage,this.storageKey+"-user",o)),i.user=(e=o==null?void 0:o.user)!==null&&e!==void 0?e:Tr()}else if(i&&!i.user&&!i.user){const o=await Ot(this.storage,this.storageKey+"-user");o&&(o!=null&&o.user)?(i.user=o.user,await ht(this.storage,this.storageKey+"-user"),await dn(this.storage,this.storageKey,i)):i.user=Tr()}if(this._debug(s,"session from storage",i),!this._isValidSession(i)){this._debug(s,"session is not valid"),i!==null&&await this._removeSession();return}const r=((t=i.expires_at)!==null&&t!==void 0?t:1/0)*1e3-Date.now()<vr;if(this._debug(s,`session has${r?"":" not"} expired with margin of ${vr}s`),r){if(this.autoRefreshToken&&i.refresh_token){const{error:o}=await this._callRefreshToken(i.refresh_token);o&&(console.error(o),br(o)||(this._debug(s,"refresh failed with a non-retryable error, removing the session",o),await this._removeSession()))}}else if(i.user&&i.user.__isUserNotAvailableProxy===!0)try{const{data:o,error:a}=await this._getUser(i.access_token);!a&&(o!=null&&o.user)?(i.user=o.user,await this._saveSession(i),await this._notifyAllSubscribers("SIGNED_IN",i)):this._debug(s,"could not get user data, skipping SIGNED_IN notification")}catch(o){console.error("Error getting user data:",o),this._debug(s,"error getting user data, skipping SIGNED_IN notification",o)}else await this._notifyAllSubscribers("SIGNED_IN",i)}catch(i){this._debug(s,"error",i),console.error(i);return}finally{this._debug(s,"end")}}async _callRefreshToken(e){var t,s;if(!e)throw new dt;if(this.refreshingDeferred)return this.refreshingDeferred.promise;const i=`#_callRefreshToken(${e.substring(0,5)}...)`;this._debug(i,"begin");try{this.refreshingDeferred=new Yi;const{data:r,error:o}=await this._refreshAccessToken(e);if(o)throw o;if(!r.session)throw new dt;await this._saveSession(r.session),await this._notifyAllSubscribers("TOKEN_REFRESHED",r.session);const a={session:r.session,error:null};return this.refreshingDeferred.resolve(a),a}catch(r){if(this._debug(i,"error",r),x(r)){const o={session:null,error:r};return br(r)||await this._removeSession(),(t=this.refreshingDeferred)===null||t===void 0||t.resolve(o),o}throw(s=this.refreshingDeferred)===null||s===void 0||s.reject(r),r}finally{this.refreshingDeferred=null,this._debug(i,"end")}}async _notifyAllSubscribers(e,t,s=!0){const i=`#_notifyAllSubscribers(${e})`;this._debug(i,"begin",t,`broadcast = ${s}`);try{this.broadcastChannel&&s&&this.broadcastChannel.postMessage({event:e,session:t});const r=[],o=Array.from(this.stateChangeEmitters.values()).map(async a=>{try{await a.callback(e,t)}catch(l){r.push(l)}});if(await Promise.all(o),r.length>0){for(let a=0;a<r.length;a+=1)console.error(r[a]);throw r[0]}}finally{this._debug(i,"end")}}async _saveSession(e){this._debug("#_saveSession()",e),this.suppressGetSessionWarning=!0;const t=Object.assign({},e),s=t.user&&t.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!s&&t.user&&await dn(this.userStorage,this.storageKey+"-user",{user:t.user});const i=Object.assign({},t);delete i.user;const r=pc(i);await dn(this.storage,this.storageKey,r)}else{const i=pc(t);await dn(this.storage,this.storageKey,i)}}async _removeSession(){this._debug("#_removeSession()"),await ht(this.storage,this.storageKey),await ht(this.storage,this.storageKey+"-code-verifier"),await ht(this.storage,this.storageKey+"-user"),this.userStorage&&await ht(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&Oe()&&(window!=null&&window.removeEventListener)&&window.removeEventListener("visibilitychange",e)}catch(t){console.error("removing visibilitychange callback failed",t)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const e=setInterval(()=>this._autoRefreshTokenTick(),hn);this.autoRefreshTicker=e,e&&typeof e=="object"&&typeof e.unref=="function"?e.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(e),setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async _autoRefreshTokenTick(){this._debug("#_autoRefreshTokenTick()","begin");try{await this._acquireLock(0,async()=>{try{const e=Date.now();try{return await this._useSession(async t=>{const{data:{session:s}}=t;if(!s||!s.refresh_token||!s.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const i=Math.floor((s.expires_at*1e3-e)/hn);this._debug("#_autoRefreshTokenTick()",`access token expires in ${i} ticks, a tick lasts ${hn}ms, refresh threshold is ${co} ticks`),i<=co&&await this._callRefreshToken(s.refresh_token)})}catch(t){console.error("Auto refresh tick failed with error. This is likely a transient error.",t)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(e){if(e.isAcquireTimeout||e instanceof Ed)this._debug("auto refresh token tick lock not available");else throw e}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!Oe()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>await this._onVisibilityChanged(!1),window==null||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error("_handleVisibilityChange",e)}}async _onVisibilityChanged(e){const t=`#_onVisibilityChanged(${e})`;this._debug(t,"visibilityState",document.visibilityState),document.visibilityState==="visible"?(this.autoRefreshToken&&this._startAutoRefresh(),e||(await this.initializePromise,await this._acquireLock(-1,async()=>{if(document.visibilityState!=="visible"){this._debug(t,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()}))):document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,t,s){const i=[`provider=${encodeURIComponent(t)}`];if(s!=null&&s.redirectTo&&i.push(`redirect_to=${encodeURIComponent(s.redirectTo)}`),s!=null&&s.scopes&&i.push(`scopes=${encodeURIComponent(s.scopes)}`),this.flowType==="pkce"){const[r,o]=await an(this.storage,this.storageKey),a=new URLSearchParams({code_challenge:`${encodeURIComponent(r)}`,code_challenge_method:`${encodeURIComponent(o)}`});i.push(a.toString())}if(s!=null&&s.queryParams){const r=new URLSearchParams(s.queryParams);i.push(r.toString())}return s!=null&&s.skipBrowserRedirect&&i.push(`skip_http_redirect=${s.skipBrowserRedirect}`),`${e}?${i.join("&")}`}async _unenroll(e){try{return await this._useSession(async t=>{var s;const{data:i,error:r}=t;return r?{data:null,error:r}:await j(this.fetch,"DELETE",`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:(s=i==null?void 0:i.session)===null||s===void 0?void 0:s.access_token})})}catch(t){if(x(t))return{data:null,error:t};throw t}}async _enroll(e){try{return await this._useSession(async t=>{var s,i;const{data:r,error:o}=t;if(o)return{data:null,error:o};const a=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType==="phone"?{phone:e.phone}:{issuer:e.issuer}),{data:l,error:c}=await j(this.fetch,"POST",`${this.url}/factors`,{body:a,headers:this.headers,jwt:(s=r==null?void 0:r.session)===null||s===void 0?void 0:s.access_token});return c?{data:null,error:c}:(e.factorType==="totp"&&(!((i=l==null?void 0:l.totp)===null||i===void 0)&&i.qr_code)&&(l.totp.qr_code=`data:image/svg+xml;utf-8,${l.totp.qr_code}`),{data:l,error:null})})}catch(t){if(x(t))return{data:null,error:t};throw t}}async _verify(e){return this._acquireLock(-1,async()=>{try{return await this._useSession(async t=>{var s;const{data:i,error:r}=t;if(r)return{data:null,error:r};const{data:o,error:a}=await j(this.fetch,"POST",`${this.url}/factors/${e.factorId}/verify`,{body:{code:e.code,challenge_id:e.challengeId},headers:this.headers,jwt:(s=i==null?void 0:i.session)===null||s===void 0?void 0:s.access_token});return a?{data:null,error:a}:(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+o.expires_in},o)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",o),{data:o,error:a})})}catch(t){if(x(t))return{data:null,error:t};throw t}})}async _challenge(e){return this._acquireLock(-1,async()=>{try{return await this._useSession(async t=>{var s;const{data:i,error:r}=t;return r?{data:null,error:r}:await j(this.fetch,"POST",`${this.url}/factors/${e.factorId}/challenge`,{body:{channel:e.channel},headers:this.headers,jwt:(s=i==null?void 0:i.session)===null||s===void 0?void 0:s.access_token})})}catch(t){if(x(t))return{data:null,error:t};throw t}})}async _challengeAndVerify(e){const{data:t,error:s}=await this._challenge({factorId:e.factorId});return s?{data:null,error:s}:await this._verify({factorId:e.factorId,challengeId:t.id,code:e.code})}async _listFactors(){const{data:{user:e},error:t}=await this.getUser();if(t)return{data:null,error:t};const s=(e==null?void 0:e.factors)||[],i=s.filter(o=>o.factor_type==="totp"&&o.status==="verified"),r=s.filter(o=>o.factor_type==="phone"&&o.status==="verified");return{data:{all:s,totp:i,phone:r},error:null}}async _getAuthenticatorAssuranceLevel(){return this._acquireLock(-1,async()=>await this._useSession(async e=>{var t,s;const{data:{session:i},error:r}=e;if(r)return{data:null,error:r};if(!i)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:o}=Er(i.access_token);let a=null;o.aal&&(a=o.aal);let l=a;((s=(t=i.user.factors)===null||t===void 0?void 0:t.filter(h=>h.status==="verified"))!==null&&s!==void 0?s:[]).length>0&&(l="aal2");const u=o.amr||[];return{data:{currentLevel:a,nextLevel:l,currentAuthenticationMethods:u},error:null}}))}async fetchJwk(e,t={keys:[]}){let s=t.keys.find(a=>a.kid===e);if(s)return s;const i=Date.now();if(s=this.jwks.keys.find(a=>a.kid===e),s&&this.jwks_cached_at+t0>i)return s;const{data:r,error:o}=await j(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(o)throw o;return!r.keys||r.keys.length===0||(this.jwks=r,this.jwks_cached_at=i,s=r.keys.find(a=>a.kid===e),!s)?null:s}async getClaims(e,t={}){try{let s=e;if(!s){const{data:g,error:y}=await this.getSession();if(y||!g.session)return{data:null,error:y};s=g.session.access_token}const{header:i,payload:r,signature:o,raw:{header:a,payload:l}}=Er(s);t!=null&&t.allowExpired||k0(r.exp);const c=!i.alg||i.alg.startsWith("HS")||!i.kid||!("crypto"in globalThis&&"subtle"in globalThis.crypto)?null:await this.fetchJwk(i.kid,t!=null&&t.keys?{keys:t.keys}:t==null?void 0:t.jwks);if(!c){const{error:g}=await this.getUser(s);if(g)throw g;return{data:{claims:r,header:i,signature:o},error:null}}const u=I0(i.alg),h=await crypto.subtle.importKey("jwk",c,u,!0,["verify"]);if(!await crypto.subtle.verify(u,h,o,h0(`${a}.${l}`)))throw new fo("Invalid JWT signature");return{data:{claims:r,header:i,signature:o},error:null}}catch(s){if(x(s))return{data:null,error:s};throw s}}}ls.nextInstanceID=0;const W0=ls;class H0 extends W0{constructor(e){super(e)}}var V0=function(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{c(s.next(u))}catch(h){o(h)}}function l(u){try{c(s.throw(u))}catch(h){o(h)}}function c(u){u.done?r(u.value):i(u.value).then(a,l)}c((s=s.apply(n,e||[])).next())})};class q0{constructor(e,t,s){var i,r,o;if(this.supabaseUrl=e,this.supabaseKey=t,!e)throw new Error("supabaseUrl is required.");if(!t)throw new Error("supabaseKey is required.");const a=Jb(e),l=new URL(a);this.realtimeUrl=new URL("realtime/v1",l),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",l),this.storageUrl=new URL("storage/v1",l),this.functionsUrl=new URL("functions/v1",l);const c=`sb-${l.hostname.split(".")[0]}-auth-token`,u={db:Ub,realtime:Hb,auth:Object.assign(Object.assign({},Wb),{storageKey:c}),global:Bb},h=Yb(s??{},u);this.storageKey=(i=h.auth.storageKey)!==null&&i!==void 0?i:"",this.headers=(r=h.global.headers)!==null&&r!==void 0?r:{},h.accessToken?(this.accessToken=h.accessToken,this.auth=new Proxy({},{get:(d,g)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(g)} is not possible`)}})):this.auth=this._initSupabaseAuthClient((o=h.auth)!==null&&o!==void 0?o:{},this.headers,h.global.fetch),this.fetch=Kb(t,this._getAccessToken.bind(this),h.global.fetch),this.realtime=this._initRealtimeClient(Object.assign({headers:this.headers,accessToken:this._getAccessToken.bind(this)},h.realtime)),this.rest=new ab(new URL("rest/v1",l).href,{headers:this.headers,schema:h.db.schema,fetch:this.fetch}),this.storage=new $b(this.storageUrl.href,this.headers,this.fetch,s==null?void 0:s.storage),h.accessToken||this._listenForAuthEvents()}get functions(){return new Mv(this.functionsUrl.href,{headers:this.headers,customFetch:this.fetch})}from(e){return this.rest.from(e)}schema(e){return this.rest.schema(e)}rpc(e,t={},s={}){return this.rest.rpc(e,t,s)}channel(e,t={config:{}}){return this.realtime.channel(e,t)}getChannels(){return this.realtime.getChannels()}removeChannel(e){return this.realtime.removeChannel(e)}removeAllChannels(){return this.realtime.removeAllChannels()}_getAccessToken(){var e,t;return V0(this,void 0,void 0,function*(){if(this.accessToken)return yield this.accessToken();const{data:s}=yield this.auth.getSession();return(t=(e=s.session)===null||e===void 0?void 0:e.access_token)!==null&&t!==void 0?t:this.supabaseKey})}_initSupabaseAuthClient({autoRefreshToken:e,persistSession:t,detectSessionInUrl:s,storage:i,storageKey:r,flowType:o,lock:a,debug:l},c,u){const h={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new H0({url:this.authUrl.href,headers:Object.assign(Object.assign({},h),c),storageKey:r,autoRefreshToken:e,persistSession:t,detectSessionInUrl:s,storage:i,flowType:o,lock:a,debug:l,fetch:u,hasCustomAuthorizationHeader:"Authorization"in this.headers})}_initRealtimeClient(e){return new Sb(this.realtimeUrl.href,Object.assign(Object.assign({},e),{params:Object.assign({apikey:this.supabaseKey},e==null?void 0:e.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((t,s)=>{this._handleTokenChanged(t,"CLIENT",s==null?void 0:s.access_token)})}_handleTokenChanged(e,t,s){(e==="TOKEN_REFRESHED"||e==="SIGNED_IN")&&this.changedAccessToken!==s?this.changedAccessToken=s:e==="SIGNED_OUT"&&(this.realtime.setAuth(),t=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}}const z0=(n,e,t)=>new q0(n,e,t);function K0(){if(typeof window<"u"||typeof process>"u")return!1;const n=process.version;if(n==null)return!1;const e=n.match(/^v(\d+)\./);return e?parseInt(e[1],10)<=18:!1}K0()&&console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const po=new Map,Td={activated:!1,tokenObservers:[]},G0={initialized:!1,enabled:!1};function re(n){return po.get(n)||{...Td}}function J0(n,e){return po.set(n,e),po.get(n)}function Qi(){return G0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sd="https://content-firebaseappcheck.googleapis.com/v1",Y0="exchangeRecaptchaV3Token",Q0="exchangeDebugToken",wc={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:16*60*1e3},X0=24*60*60*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z0{constructor(e,t,s,i,r){if(this.operation=e,this.retryPolicy=t,this.getWaitDuration=s,this.lowerBound=i,this.upperBound=r,this.pending=null,this.nextErrorWaitInterval=i,i>r)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new Ve,this.pending.promise.catch(t=>{}),await eE(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new Ve,this.pending.promise.catch(t=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(t){this.retryPolicy(t)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const t=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),t}}}function eE(n){return new Promise(e=>{setTimeout(e,n)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tE={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},Ee=new hs("appCheck","AppCheck",tE);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vc(n=!1){var e;return n?(e=self.grecaptcha)==null?void 0:e.enterprise:self.grecaptcha}function ka(n){if(!re(n).activated)throw Ee.create("use-before-activation",{appName:n.name})}function kd(n){const e=Math.round(n/1e3),t=Math.floor(e/(3600*24)),s=Math.floor((e-t*3600*24)/3600),i=Math.floor((e-t*3600*24-s*3600)/60),r=e-t*3600*24-s*3600-i*60;let o="";return t&&(o+=Rs(t)+"d:"),s&&(o+=Rs(s)+"h:"),o+=Rs(i)+"m:"+Rs(r)+"s",o}function Rs(n){return n===0?"00":n>=10?n.toString():"0"+n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ia({url:n,body:e},t){const s={"Content-Type":"application/json"},i=t.getImmediate({optional:!0});if(i){const h=await i.getHeartbeatsHeader();h&&(s["X-Firebase-Client"]=h)}const r={method:"POST",body:JSON.stringify(e),headers:s};let o;try{o=await fetch(n,r)}catch(h){throw Ee.create("fetch-network-error",{originalErrorMessage:h==null?void 0:h.message})}if(o.status!==200)throw Ee.create("fetch-status-error",{httpStatus:o.status});let a;try{a=await o.json()}catch(h){throw Ee.create("fetch-parse-error",{originalErrorMessage:h==null?void 0:h.message})}const l=a.ttl.match(/^([\d.]+)(s)$/);if(!l||!l[2]||isNaN(Number(l[1])))throw Ee.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${a.ttl}`});const c=Number(l[1])*1e3,u=Date.now();return{token:a.token,expireTimeMillis:u+c,issuedAtTimeMillis:u}}function nE(n,e){const{projectId:t,appId:s,apiKey:i}=n.options;return{url:`${Sd}/projects/${t}/apps/${s}:${Y0}?key=${i}`,body:{recaptcha_v3_token:e}}}function Id(n,e){const{projectId:t,appId:s,apiKey:i}=n.options;return{url:`${Sd}/projects/${t}/apps/${s}:${Q0}?key=${i}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sE="firebase-app-check-database",iE=1,cs="firebase-app-check-store",Cd="debug-token";let Os=null;function Ad(){return Os||(Os=new Promise((n,e)=>{try{const t=indexedDB.open(sE,iE);t.onsuccess=s=>{n(s.target.result)},t.onerror=s=>{var i;e(Ee.create("storage-open",{originalErrorMessage:(i=s.target.error)==null?void 0:i.message}))},t.onupgradeneeded=s=>{const i=s.target.result;switch(s.oldVersion){case 0:i.createObjectStore(cs,{keyPath:"compositeKey"})}}}catch(t){e(Ee.create("storage-open",{originalErrorMessage:t==null?void 0:t.message}))}}),Os)}function rE(n){return Rd(Od(n))}function oE(n,e){return Pd(Od(n),e)}function aE(n){return Pd(Cd,n)}function lE(){return Rd(Cd)}async function Pd(n,e){const s=(await Ad()).transaction(cs,"readwrite"),r=s.objectStore(cs).put({compositeKey:n,value:e});return new Promise((o,a)=>{r.onsuccess=l=>{o()},s.onerror=l=>{var c;a(Ee.create("storage-set",{originalErrorMessage:(c=l.target.error)==null?void 0:c.message}))}})}async function Rd(n){const t=(await Ad()).transaction(cs,"readonly"),i=t.objectStore(cs).get(n);return new Promise((r,o)=>{i.onsuccess=a=>{const l=a.target.result;r(l?l.value:void 0)},t.onerror=a=>{var l;o(Ee.create("storage-get",{originalErrorMessage:(l=a.target.error)==null?void 0:l.message}))}})}function Od(n){return`${n.options.appId}-${n.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gt=new vi("@firebase/app-check");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cE(n){if(_i()){let e;try{e=await rE(n)}catch(t){gt.warn(`Failed to read token from IndexedDB. Error: ${t}`)}return e}}function kr(n,e){return _i()?oE(n,e).catch(t=>{gt.warn(`Failed to write token to IndexedDB. Error: ${t}`)}):Promise.resolve()}async function uE(){let n;try{n=await lE()}catch{}if(n)return n;{const e=crypto.randomUUID();return aE(e).catch(t=>gt.warn(`Failed to persist debug token to IndexedDB. Error: ${t}`)),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ca(){return Qi().enabled}async function Aa(){const n=Qi();if(n.enabled&&n.token)return n.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function hE(){const n=zc(),e=Qi();if(e.initialized=!0,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&n.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const t=new Ve;e.token=t,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?t.resolve(n.FIREBASE_APPCHECK_DEBUG_TOKEN):t.resolve(uE())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dE={error:"UNKNOWN_ERROR"};function fE(n){return gi.encodeString(JSON.stringify(n),!1)}async function go(n,e=!1,t=!1){const s=n.app;ka(s);const i=re(s);let r=i.token,o;if(r&&!pn(r)&&(i.token=void 0,r=void 0),!r){const c=await i.cachedTokenPromise;c&&(pn(c)?r=c:await kr(s,void 0))}if(!e&&r&&pn(r))return{token:r.token};let a=!1;if(Ca())try{i.exchangeTokenPromise||(i.exchangeTokenPromise=Ia(Id(s,await Aa()),n.heartbeatServiceProvider).finally(()=>{i.exchangeTokenPromise=void 0}),a=!0);const c=await i.exchangeTokenPromise;return await kr(s,c),i.token=c,{token:c.token}}catch(c){return c.code==="appCheck/throttled"||c.code==="appCheck/initial-throttle"?gt.warn(c.message):t&&gt.error(c),Ir(c)}try{i.exchangeTokenPromise||(i.exchangeTokenPromise=i.provider.getToken().finally(()=>{i.exchangeTokenPromise=void 0}),a=!0),r=await re(s).exchangeTokenPromise}catch(c){c.code==="appCheck/throttled"||c.code==="appCheck/initial-throttle"?gt.warn(c.message):t&&gt.error(c),o=c}let l;return r?o?pn(r)?l={token:r.token,internalError:o}:l=Ir(o):(l={token:r.token},i.token=r,await kr(s,r)):l=Ir(o),a&&Dd(s,l),l}async function pE(n){const e=n.app;ka(e);const{provider:t}=re(e);if(Ca()){const s=await Aa(),{token:i}=await Ia(Id(e,s),n.heartbeatServiceProvider);return{token:i}}else{const{token:s}=await t.getToken();return{token:s}}}function Nd(n,e,t,s){const{app:i}=n,r=re(i),o={next:t,error:s,type:e};if(r.tokenObservers=[...r.tokenObservers,o],r.token&&pn(r.token)){const a=r.token;Promise.resolve().then(()=>{t({token:a.token}),bc(n)}).catch(()=>{})}r.cachedTokenPromise.then(()=>bc(n))}function xd(n,e){const t=re(n),s=t.tokenObservers.filter(i=>i.next!==e);s.length===0&&t.tokenRefresher&&t.tokenRefresher.isRunning()&&t.tokenRefresher.stop(),t.tokenObservers=s}function bc(n){const{app:e}=n,t=re(e);let s=t.tokenRefresher;s||(s=gE(n),t.tokenRefresher=s),!s.isRunning()&&t.isTokenAutoRefreshEnabled&&s.start()}function gE(n){const{app:e}=n;return new Z0(async()=>{const t=re(e);let s;if(t.token?s=await go(n,!0):s=await go(n),s.error)throw s.error;if(s.internalError)throw s.internalError},()=>!0,()=>{const t=re(e);if(t.token){let s=t.token.issuedAtTimeMillis+(t.token.expireTimeMillis-t.token.issuedAtTimeMillis)*.5+3e5;const i=t.token.expireTimeMillis-5*60*1e3;return s=Math.min(s,i),Math.max(0,s-Date.now())}else return 0},wc.RETRIAL_MIN_WAIT,wc.RETRIAL_MAX_WAIT)}function Dd(n,e){const t=re(n).tokenObservers;for(const s of t)try{s.type==="EXTERNAL"&&e.error!=null?s.error(e.error):s.next(e)}catch{}}function pn(n){return n.expireTimeMillis-Date.now()>0}function Ir(n){return{token:fE(dE),error:n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mE{constructor(e,t){this.app=e,this.heartbeatServiceProvider=t}_delete(){const{tokenObservers:e}=re(this.app);for(const t of e)xd(this.app,t.next);return Promise.resolve()}}function _E(n,e){return new mE(n,e)}function yE(n){return{getToken:e=>go(n,e),getLimitedUseToken:()=>pE(n),addTokenListener:e=>Nd(n,"INTERNAL",e),removeTokenListener:e=>xd(n.app,e)}}const wE="@firebase/app-check",vE="0.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bE="https://www.google.com/recaptcha/api.js";function EE(n,e){const t=new Ve,s=re(n);s.reCAPTCHAState={initialized:t};const i=TE(n),r=vc(!1);return r?Ec(n,e,r,i,t):IE(()=>{const o=vc(!1);if(!o)throw new Error("no recaptcha");Ec(n,e,o,i,t)}),t.promise}function Ec(n,e,t,s,i){t.ready(()=>{kE(n,e,t,s),i.resolve(t)})}function TE(n){const e=`fire_app_check_${n.name}`,t=document.createElement("div");return t.id=e,t.style.display="none",document.body.appendChild(t),e}async function SE(n){ka(n);const t=await re(n).reCAPTCHAState.initialized.promise;return new Promise((s,i)=>{const r=re(n).reCAPTCHAState;t.ready(()=>{s(t.execute(r.widgetId,{action:"fire_app_check"}))})})}function kE(n,e,t,s){const i=t.render(s,{sitekey:e,size:"invisible",callback:()=>{re(n).reCAPTCHAState.succeeded=!0},"error-callback":()=>{re(n).reCAPTCHAState.succeeded=!1}}),r=re(n);r.reCAPTCHAState={...r.reCAPTCHAState,widgetId:i}}function IE(n){const e=document.createElement("script");e.src=bE,e.onload=n,document.head.appendChild(e)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pa{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){var s,i,r;AE(this._throttleData);const e=await SE(this._app).catch(o=>{throw Ee.create("recaptcha-error")});if(!((s=re(this._app).reCAPTCHAState)!=null&&s.succeeded))throw Ee.create("recaptcha-error");let t;try{t=await Ia(nE(this._app,e),this._heartbeatServiceProvider)}catch(o){throw(i=o.code)!=null&&i.includes("fetch-status-error")?(this._throttleData=CE(Number((r=o.customData)==null?void 0:r.httpStatus),this._throttleData),Ee.create("initial-throttle",{time:kd(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):o}return this._throttleData=null,t}initialize(e){this._app=e,this._heartbeatServiceProvider=Zt(e,"heartbeat"),EE(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof Pa?this._siteKey===e._siteKey:!1}}function CE(n,e){if(n===404||n===403)return{backoffCount:1,allowRequestsAfter:Date.now()+X0,httpStatus:n};{const t=e?e.backoffCount:0,s=Df(t,1e3,2);return{backoffCount:t+1,allowRequestsAfter:Date.now()+s,httpStatus:n}}}function AE(n){if(n&&Date.now()-n.allowRequestsAfter<=0)throw Ee.create("throttled",{time:kd(n.allowRequestsAfter-Date.now()),httpStatus:n.httpStatus})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function PE(n=Ei(),e){n=ye(n);const t=Zt(n,"app-check");if(Qi().initialized||hE(),Ca()&&Aa().then(i=>console.log(`App Check debug token: ${i}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),t.isInitialized()){const i=t.getImmediate(),r=t.getOptions();if(r.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&r.provider.isEqual(e.provider))return i;throw Ee.create("already-initialized",{appName:n.name})}const s=t.initialize({options:e});return RE(n,e.provider,e.isTokenAutoRefreshEnabled),re(n).isTokenAutoRefreshEnabled&&Nd(s,"INTERNAL",()=>{}),s}function RE(n,e,t=!1){const s=J0(n,{...Td});s.activated=!0,s.provider=e,s.cachedTokenPromise=cE(n).then(i=>(i&&pn(i)&&(s.token=i,Dd(n,{token:i.token})),i)),s.isTokenAutoRefreshEnabled=t&&n.automaticDataCollectionEnabled,!n.automaticDataCollectionEnabled&&t&&gt.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),s.provider.initialize(n)}const OE="app-check",Tc="app-check-internal";function NE(){Ae(new Te(OE,n=>{const e=n.getProvider("app").getImmediate(),t=n.getProvider("heartbeat");return _E(e,t)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((n,e,t)=>{n.getProvider(Tc).initialize()})),Ae(new Te(Tc,n=>{const e=n.getProvider("app-check").getImmediate();return yE(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),ge(wE,vE)}NE();let wt,Sc=!1,C,xE=[],He;const Ue={};let Xt=null;const hi=new Set;let H=localStorage.getItem("deviceId")||null;const di="https://mister-x-d6b59-default-rtdb.europe-west1.firebasedatabase.app";let Jn=null,Le=null,We=null,Ld=!1;const Cr="showNotifHeader",Md="currentTeamId";let ie=null,ot={},Ns={deviceTeam:null,teams:null},$d=null,jn=[];const Fd="showAgentLocations",kc="lastRespondedAgentReqId";let $s=(localStorage.getItem(Fd)??"1")==="1",fe,st,xs;L.icon({iconUrl:"https://unpkg.com/leaflet@1/dist/images/marker-icon.png",iconRetinaUrl:"https://unpkg.com/leaflet@1/dist/images/marker-icon-2x.png",shadowUrl:"https://unpkg.com/leaflet@1/dist/images/marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],shadowSize:[41,41]});const DE=[[48.21778257924239,16.37016154994435],[48.217247563322225,16.37076456217454],[48.21741142779978,16.371253762059183],[48.216865105563464,16.37191529883514],[48.21581506144457,16.37290646405736],[48.21417125610604,16.373948000332064],[48.21430769576697,16.3745721914746],[48.21333498613118,16.37539386682008],[48.2122964590416,16.377294652276152],[48.211699711347876,16.38092342451245],[48.211941642178076,16.38467493512273],[48.20913524997675,16.384032997995277],[48.20434428995476,16.380677464805487],[48.20267440663029,16.378771628716105],[48.202516949057625,16.378787036085683],[48.2021791301039,16.378713275337773],[48.20032081399359,16.37673193693543],[48.20046567888107,16.376081501249317],[48.19987161819025,16.37355423682974],[48.19981183801774,16.372899054744835],[48.200631534154375,16.369653382537916],[48.20071916193201,16.369103424638855],[48.200163223194544,16.368756078571426],[48.19948213275357,16.368406050294983],[48.19950721778074,16.3679406870309],[48.1998469538764,16.366987161726104],[48.19976119600531,16.366945587486374],[48.199786280895815,16.366662614435302],[48.199852484835134,16.36658080706035],[48.199605825841886,16.366136901468384],[48.199689907919776,16.365894161552536],[48.199997462783195,16.365407340616333],[48.20007450484762,16.36539258846675],[48.200780727683785,16.364471249670135],[48.20235733493688,16.36143133067089],[48.202316181915776,16.361391179971125],[48.20252539808658,16.36095263879719],[48.20263271531552,16.36073672097149],[48.20274853131339,16.36083590228765],[48.20475579365605,16.35819251441422],[48.20494354858451,16.357837121719747],[48.205074099582546,16.357685576910406],[48.20502589015989,16.357555489773183],[48.20506169808996,16.357492457861333],[48.205261965068914,16.357456248039632],[48.20626549207577,16.356030140071557],[48.20666774752276,16.35550308600013],[48.20697347295606,16.355354223399804],[48.20918910891197,16.354601648098285],[48.20921597664341,16.35491948986655],[48.20929110567211,16.354928877598102],[48.20938410911258,16.354983862882907],[48.212403444290665,16.35518085630021],[48.212634067324394,16.355560388875816],[48.214753862701514,16.35585677297196],[48.21482540908184,16.356370415998313],[48.21454632473899,16.35850592710254],[48.21435355993972,16.36025556372129],[48.21477999581608,16.361298310706765],[48.21461086605676,16.3615351876565],[48.214799725889385,16.361933238614775],[48.21476774885914,16.362013013827934],[48.214317217645544,16.362474541146735],[48.21554996828477,16.365200001058092],[48.21618181295601,16.36659154989541],[48.21691897070536,16.368248676490595],[48.21768157297474,16.36988155904141],[48.21778257924239,16.37016154994435]],LE=[[-90,-180],[-90,180],[90,180],[90,-180]],Ar=L.polygon([LE,DE],{color:"red",weight:3,fillColor:"rgba(255, 0, 0, 0.3)",fillOpacity:.35,interactive:!1,pane:"maskPane",dashArray:"5, 5"}),ME={blau:"#1E90FF",gruen:"#2ECC71",rot:"#FF5252",gelb:"#F4D03F",orange:"#FF8C00",lila:"#8E44AD",schwarz:"#333333",grau:"#7F8C8D"};PE(Ct,{provider:new Pa("6LcVXbQrAAAAAI5Wgi8DenjAM4cz-ubrfcwIRPVJ"),isTokenAutoRefreshEnabled:!0});window.onerror=function(n,e,t,s,i){alert("JS-Fehler: "+n+" in "+e+" Zeile "+t)};const Ke=z0("https://axirbthvnznvhfagduyj.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4aXJidGh2bnpudmhmYWdkdXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMDI2MTcsImV4cCI6MjA2ODg3ODYxN30.wfJm9e10_iNuYm_r3es_FmKuXBePsxSjIJcVqmSuYjc");async function $E(n){const e=localStorage.getItem("role")||"start";try{const{error:t}=await Ke.from("fcm_tokens").delete().eq("device_name",H);t?S("❌ Fehler beim Löschen aus Supabase:",t):S("✅ Alter Token aus Supabase gelöscht.");const{error:s}=await Ke.from("fcm_tokens").upsert({token:n,device_name:H,role:e});s?S("❌ Fehler beim Speichern des Tokens:",s):S("✅ Token erfolgreich gespeichert.")}catch(t){S("❌ Supabase Exception:",t)}}function mo(){let n=localStorage.getItem("deviceId");for(;!n||n.trim()==="";)n=prompt("Bitte gib deinen Namen ein"),n===null&&alert("Du musst einen Namen eingeben, um fortzufahren.");return localStorage.setItem("deviceId",n.trim()),n.trim()}try{localStorage.setItem("test","1")}catch{alert("⚠️ Dein Browser blockiert lokalen Speicher. Bitte verlasse den privaten Modus oder ändere die Einstellungen.")}async function FE(){try{if(!await Wi()){alert("❌ Push-Benachrichtigungen werden in diesem Browser/Modus nicht unterstützt.");return}if(!("Notification"in window)){alert("❌ Notification API nicht verfügbar.");return}const e=await Notification.requestPermission();if(e!=="granted"){S("Benachrichtigungen nicht erlaubt:",e),alert("⚠️ Benachrichtigungen wurden abgelehnt.");return}const t=await sS();S("Service Worker registriert mit Scope:",t.scope),localStorage.setItem("serviceWorkerRegistered","true"),He||(He=Hi(Ct));const s=await Zh(He,{serviceWorkerRegistration:t,vapidKey:"BPxoiPhAH4gXMrR7PhhrAUolApYTK93-MZ48-BHWF0rksFtkvBwE9zYUS2pfiEw6_PXzPYyaQZdNwM6LL4QdeOE"});if(!s){S("Kein Token erhalten."),alert("⚠️ Kein Token erhalten. Bitte erneut versuchen.");return}localStorage.setItem("fcmToken",s),S("Token:",s),await Re(A(R,`tokens/${H}`),s),await qe(A(R,`roles/${H}`),{role:"start"}),await $E(s),localStorage.setItem("nachrichtAktiv","true");const i=document.getElementById("permissionButton");i&&(i.style.display="none"),jE(H).then(()=>{alert("✅ Benachrichtigungen aktiviert!")})}catch(n){S("Fehler bei Berechtigung/Registrierung/Token:",n),alert("❌ Fehler: "+((n==null?void 0:n.message)??String(n)))}}async function jE(n){const e=await WE("app-db","settings");return new Promise((t,s)=>{const i=e.transaction("settings","readwrite");i.objectStore("settings").put(n,"deviceName"),i.oncomplete=()=>{e.close(),t(!0)},i.onerror=()=>{e.close(),s(i.error)}})}async function BE(n){const e=await new Promise((t,s)=>{const i=indexedDB.open("app-db");i.onupgradeneeded=()=>{const r=i.result;r.objectStoreNames.contains("sw-flags")||r.createObjectStore("sw-flags")},i.onsuccess=()=>t(i.result),i.onerror=()=>s(i.error)});try{return await new Promise(t=>{const r=e.transaction("sw-flags","readonly").objectStore("sw-flags").get(n);r.onsuccess=()=>{e.close(),t(r.result||null)},r.onerror=()=>{e.close(),t(null)}})}catch{return null}}async function UE(n){const e=await new Promise((t,s)=>{const i=indexedDB.open("app-db");i.onupgradeneeded=()=>{const r=i.result;r.objectStoreNames.contains("sw-flags")||r.createObjectStore("sw-flags")},i.onsuccess=()=>t(i.result),i.onerror=()=>s(i.error)});await new Promise(t=>{const s=e.transaction("sw-flags","readwrite");s.objectStore("sw-flags").delete(n),s.oncomplete=()=>{e.close(),t()},s.onerror=()=>{e.close(),t()}})}async function Pr(n={}){const{force:e=!1,vapidKey:t="BPxoiPhAH4gXMrR7PhhrAUolApYTK93-MZ48-BHWF0rksFtkvBwE9zYUS2pfiEw6_PXzPYyaQZdNwM6LL4QdeOE",touchWhenUnchanged:s=!0}=n;if(typeof Notification>"u"||Notification.permission!=="granted"||localStorage.getItem("serviceWorkerRegistered")!=="true")return S("🔕 Token-Refresh übersprungen: Keine Berechtigung oder kein SW."),null;try{const i=await navigator.serviceWorker.ready;let r=null;try{r=await Zh(He,{serviceWorkerRegistration:i,vapidKey:t})}catch(a){return S("❌ Fehler bei getToken:",a),null}if(!r)return S("⚠️ Kein Token beim Refresh erhalten."),null;const o=localStorage.getItem("fcmToken");if(e||r!==o){S("🔄 Token aktualisiert:",r),await Re(A(R,"tokens/"+H),r);try{const{error:a}=await Ke.from("fcm_tokens").upsert({token:r,device_name:H},{onConflict:"device_name"});a?S("❌ Fehler beim Upsert in Supabase:",a):S("✅ Token in Supabase upserted.")}catch(a){S("❌ Supabase Upsert Exception:",a)}return localStorage.setItem("fcmToken",r),localStorage.setItem("nachrichtAktiv","true"),r}else return S("ℹ️ Token ist unverändert."),r}catch(i){return S("❌ Fehler beim Token-Refresh:",i),null}}async function WE(n,e){return new Promise((t,s)=>{const i=indexedDB.open(n);i.onupgradeneeded=()=>{const r=i.result;r.objectStoreNames.contains(e)||r.createObjectStore(e)},i.onsuccess=()=>{const r=i.result;if(r.objectStoreNames.contains(e))return t(r);const o=r.version+1;r.close();const a=indexedDB.open(n,o);a.onupgradeneeded=()=>{const l=a.result;l.objectStoreNames.contains(e)||l.createObjectStore(e)},a.onsuccess=()=>t(a.result),a.onerror=()=>s(a.error)},i.onerror=()=>s(i.error)})}async function HE(){let n=localStorage.getItem("deviceId");for(;!n||n.trim()==="";)n=prompt("Bitte gib deinen Namen ein"),n===null&&alert("Du musst einen Namen eingeben, um fortzufahren.");n=n.trim(),localStorage.setItem("deviceId",n),H=n;let e=Wd(),t=e.tel||null,s=!!e.noTel,i;try{i=await QE(n)}catch(a){S("[askForDeviceIdAndPhone] Konnte Remote-Status nicht laden:",a),i={exists:!1,allowSmsFallback:null,tel:null}}let r=!1;if(i.allowSmsFallback===null?(r=!0,s=!1):i.allowSmsFallback===!1?r=!1:i.allowSmsFallback===!0&&!i.tel&&(r=!0),i.allowSmsFallback===!0&&i.tel){Ic({tel:i.tel,allowSmsFallback:!0,noTel:!1}),await Cc(n,i.tel,!0);return}if(r&&!s||r&&i.allowSmsFallback===null)for(;!t||!JE(t);){let a=prompt(`Bitte gib deine Telefonnummer für SMS-Fallback ein (+43… oder 0664…)
Du kannst auch leer lassen, wenn du keine SMS möchtest.`);if(a===null||a.trim()===""){t=null,s=!0;break}t=XE(a.trim()),t||alert("Ungültige Nummer. Bitte im Format +43… oder 0664… eingeben.")}const o=!!t;Ic({tel:t,allowSmsFallback:o,noTel:s}),await Cc(n,t,o)}async function VE(){try{const n=await Wi().catch(()=>!1);He||(He=Hi(Ct));const e=localStorage.getItem("fcmToken");if(n)try{await Av(He),S("✅ deleteToken: lokaler FCM-Token invalidiert")}catch(t){S("⚠️ deleteToken fehlgeschlagen:",t)}try{await _e(A(R,`tokens/${H}`)),S("✅ RTDB-Token entfernt für",H)}catch(t){S("⚠️ RTDB-Remove fehlgeschlagen:",t)}try{const{error:t}=await Ke.from("fcm_tokens").delete().or(`device_name.eq.${H}${e?`,token.eq.${e}`:""}`);t?S("⚠️ Supabase-Delete Fehler:",t):S("✅ Supabase-Einträge entfernt")}catch(t){S("⚠️ Supabase-Delete (catch):",t)}if("serviceWorker"in navigator){const t=await navigator.serviceWorker.getRegistrations();for(const s of t)try{const i=await s.pushManager.getSubscription();i&&(await i.unsubscribe(),S("✅ Push-Subscription gekündigt für",s.scope))}catch(i){S("⚠️ unsubscribe warn:",i)}await Promise.all(t.map(s=>s.unregister())),S("✅ Alle Service Worker unregistriert")}try{if(window.caches){const t=await caches.keys();await Promise.all(t.map(s=>caches.delete(s))),S("✅ Alle Caches gelöscht:",t)}}catch(t){S("⚠️ Cache cleanup warn:",t)}try{indexedDB.deleteDatabase("app-db"),S('✅ IndexedDB "app-db" gelöscht')}catch(t){S("⚠️ IndexedDB delete warn:",t)}localStorage.removeItem("fcmToken"),localStorage.removeItem("nachrichtAktiv"),localStorage.removeItem("serviceWorkerRegistered");try{const t=document.getElementById("permissionButton"),s=document.getElementById("permissionButton2");t&&(t.style.display=""),s&&(s.style.display="none")}catch{}setTimeout(()=>{alert("🔕 Benachrichtigungen deaktiviert. Die Seite wird neu geladen…"),location.reload()},150)}catch(n){S(n),alert("❌ Deaktivieren fehlgeschlagen: "+((n==null?void 0:n.message)??String(n)))}}function qE(n,e=[],t,s=15,{rtdbBase:i=di,rolesPath:r="roles",recipientsPath:o="notifications",idempotencyFlag:a="smsTriggered",secret:l=typeof SMS_FALLBACK_SECRET<"u"?SMS_FALLBACK_SECRET:"",rtdbAuth:c}={}){if(!n)throw new Error("[Fallback] messageId fehlt");if(!Array.isArray(e)||e.length===0)return S("[Fallback] keine Empfänger - Fallback nicht geplant"),Promise.resolve({ok:!0,skipped:"no_recipients"});if(!i)throw new Error("[Fallback] rtdbBase fehlt");const u={messageId:n,recipientDeviceNames:e,smsText:String(t??"").slice(0,280),waitSec:s,rtdbBase:i,rolesPath:r,recipientsPath:o,idempotencyFlag:a,...c?{rtdbAuth:c}:{}},h={};return l&&(h["x-sms-secret"]=l),Ke.functions.invoke("sms-fallback",{body:u,headers:h}).then(({data:d,error:g})=>g?(S("[Fallback] Edge call failed",g),{ok:!1,error:g.message||"invoke failed"}):(S("[Fallback] scheduled:",d),d)).catch(d=>(S("[Fallback] Konnte SMS-Fallback nicht planen:",d),{ok:!1,error:(d==null?void 0:d.message)||String(d)}))}function Fs(){try{const n=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:void 0,e=n&&n.crypto;if(e&&typeof e.randomUUID=="function")return e.randomUUID();if(e&&typeof e.getRandomValues=="function"){const t=new Uint8Array(16);e.getRandomValues(t),t[6]=t[6]&15|64,t[8]=t[8]&63|128;const s=r=>r.toString(16).padStart(2,"0"),i=Array.from(t,s).join("");return`${i.slice(0,8)}-${i.slice(8,12)}-${i.slice(12,16)}-${i.slice(16,20)}-${i.slice(20)}`}}catch{}return`${Date.now()}-${Math.random().toString(36).slice(2,10)}`}async function jd(n,e,t=[],s={}){const{recipientDeviceNames:i=[],link:r="/Mister-X/",attempt:o=1,maxAttempts:a=5,waitSec:l=15,sendEndpoint:c="https://axirbthvnznvhfagduyj.supabase.co/functions/v1/send-to-all",rtdbBase:u=di,messageId:h}=s,d=h??Fs(),g=(typeof mo=="function"?mo():null)||"unknown",y=o===1,E=await fetch(c,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:n,body:e,tokens:t,senderName:g,link:r,messageId:d,rtdbBase:u,recipientDeviceNames:y?i:[],setRecipientsMode:y?"set_once":"none",attempt:o})});let P={};try{P=await E.json()}catch{}if(S(`📦 Versuch ${o}: status=${E.status}`,P),y&&i.length>0){const I=`${n}: ${e}
Diese Nachricht wurde automatisch gesendet (unter Android kommt das unverhinderbar manchmal vor, unter iOS bitte einmal die App neu laden über Knopf oben rechts).`.slice(0,280);qE(d,i,I,15,{rtdbBase:di})}const D=Array.isArray(P==null?void 0:P.failedTokens)?P.failedTokens:[];return D.length>0&&o<a?(S(`🔁 Wiederhole für ${D.length} fehlgeschlagene Tokens in 10s...`),setTimeout(()=>{jd(n,e,D,{recipientDeviceNames:i,link:r,attempt:o+1,maxAttempts:a,waitSec:l,sendEndpoint:c,rtdbBase:u,messageId:d}).catch(S)},1e4)):o>=a?S("⏱️ Max. Anzahl an Versuchen erreicht."):S("✅ Alle Benachrichtigungen verarbeitet."),P}async function Ht(n,e,t,s={}){const[i,r]=await Promise.all([Z(A(R,"roles")),Z(A(R,"tokens"))]),o=i.exists()?i.val():{},a=r.exists()?r.val():{},l=Array.isArray(t)?t:[t],c=l.length===1&&l[0]==="all",u=[],h=[];for(const y in a){if(!Object.prototype.hasOwnProperty.call(a,y))continue;const T=o[y]||{},E=T.role,P=T.notification!==!1;if(!(c||E&&l.includes(E))||!P)continue;const I=Ud(a[y]);I.length!==0&&(u.push(...I),h.push(y))}const d=fi(u),g=fi(h);if(d.length===0){S(`⚠️ Keine passenden Tokens für Rollen "${Array.isArray(t)?t.join(","):t}" gefunden.`);return}return jd(n,e,d,{recipientDeviceNames:g,link:s.link||"/Mister-X/",waitSec:typeof s.waitSec=="number"?s.waitSec:45,sendEndpoint:s.sendEndpoint,rtdbBase:s.rtdbBase})}async function zE(n){const e=Array.isArray(n)?n:[n],[t,s]=await Promise.all([Z(A(R,"roles")),Z(A(R,"tokens"))]),i=t.exists()?t.val():{},r=s.exists()?s.val():{},o=e.length===1&&e[0]==="all",a=[],l=[];for(const c in r){if(!Object.prototype.hasOwnProperty.call(r,c))continue;const u=i[c]||{},h=u.role,d=u.notification!==!1;if(!(o||h&&e.includes(h))||!d)continue;const y=Ud(r[c]);y.length!==0&&(a.push(...y),l.push(c))}return{tokens:fi(a),deviceNames:fi(l)}}function KE(n,e){const t="Misterx-upload",s=new FormData;s.append("file",n),s.append("upload_preset",t),fetch("https://api.cloudinary.com/v1_1/ddvf141hb/image/upload",{method:"POST",body:s}).then(i=>i.json()).then(i=>{i.secure_url&&i.public_id?e({url:i.secure_url}):alert("Fehler beim Hochladen zu Cloudinary.")}).catch(i=>{S("Upload-Fehler:",i),alert("Fehler beim Hochladen zu Cloudinary.")})}async function GE(){const n=document.getElementById("photoInput").files[0],e=document.getElementById("manualLocationDescription").value.trim(),t=document.getElementById("manualLocationContainer"),s=document.getElementById("status"),i=aS();if(!i){alert("Bitte zuerst einen Posten auswählen.");return}if(!n){alert("Bitte ein Foto auswählen.");return}const r=Date.now();let o={lat:null,lon:null,accuracy:null};if(!(t&&t.style.display!=="none"&&e!==""))if(navigator.geolocation)try{const y=await Kd(),{latitude:T,longitude:E,accuracy:P}=y.coords;if(P>100){s.innerText=`⚠️ Standort ungenau (±${Math.round(P)} m). Bitte erneut versuchen oder Standortbeschreibung eingeben.`,t.style.display="block";return}o={lat:T,lon:E,accuracy:P}}catch(y){Rr==null||Rr(y),t.style.display="block"}else s.innerText="Geolocation wird nicht unterstützt.",t.style.display="block";const{color:a,postId:l,title:c}=i,u=A(R,`posten/${a}/active`);s.innerText="⏳ Reserviere Farbe…";try{const y=await ji(u,T=>T===!0?!1:T);if(!y.committed||y.snapshot.val()!==!1){s.innerText="❌ Diese Farbe ist bereits inaktiv. Liste wird aktualisiert.";return}}catch(y){s.innerText="❌ Konnte Farbe nicht reservieren.",S(y);return}try{await qe(A(R),{[`posten/${a}/${l}/visited`]:!0})}catch(y){s.innerText="❌ Konnte Posten nicht auf 'visited' setzen.",S(y);return}const h={color:a,postId:l,title:c,timestamp:r,description:e||null,lat:o.lat,lon:o.lon},d=$i(A(R,"locations"),h),g=`${c} (${a.toUpperCase()})`;Ht==null||Ht("Mister X hat sich gezeigt!",g,["agent","settings","start"]),gn(),KE(n,async({url:y})=>{try{await qe(d,{photoURL:y})}catch(T){S("Foto-URL konnte nicht gesetzt werden",T)}}),document.getElementById("photoInput").value="",document.getElementById("manualLocationDescription").value="",t.style.display="none",document.getElementById("postenSearch").value="",of(null),s.innerText="✅ Posten/Farbe gemeldet & Foto wird hochgeladen.",gn==null||gn()}function Rr(n){let e="❌ Fehler beim Abrufen des Standorts.";switch(n.code){case n.PERMISSION_DENIED:e+=" Zugriff verweigert.";break;case n.POSITION_UNAVAILABLE:e+=" Standortinformationen nicht verfügbar.";break;case n.TIMEOUT:e+=" Zeitüberschreitung bei der Standortabfrage.";break}e+=" Bitte erneut versuchen oder Standortbeschreibung manuell eingeben.",document.getElementById("status").innerText=e}function JE(n){return typeof n=="string"&&/^\+43\d{4,13}$/.test(n)}function Bd(n){return n.replace(/[.#$/\[\]\/]/g,"_")}function fi(n){return Array.from(new Set(n))}function Ud(n){return n?typeof n=="string"?[n]:Array.isArray(n)?n.filter(Boolean):typeof n=="object"?Object.keys(n).filter(Boolean):[]:[]}function YE(n){const e=String(n).trim();return e.startsWith("+")?"+"+e.slice(1).replace(/\D/g,""):e.replace(/\D/g,"")}function Wd(){try{return JSON.parse(localStorage.getItem("mrx_sms_prefs_v1"))??{allowSmsFallback:!1,tel:null,noTel:!1,lastUpdated:0}}catch{return{allowSmsFallback:!1,tel:null,noTel:!1,lastUpdated:0}}}function Ic(n){const e=Wd(),t={allowSmsFallback:!!(n.allowSmsFallback??e.allowSmsFallback),tel:n.tel===void 0?e.tel:n.tel,noTel:n.noTel===void 0?e.noTel:n.noTel,lastUpdated:Date.now()};return localStorage.setItem("mrx_sms_prefs_v1",JSON.stringify(t)),t}async function QE(n){const e=Bd(n),t=await Z(A(R,`roles/${e}`));if(!t.exists())return{exists:!1,allowSmsFallback:null,tel:null};const s=t.val()||{};return{exists:!0,allowSmsFallback:s.allowSmsFallback!==void 0?!!s.allowSmsFallback:null,tel:s.tel??null}}function XE(n){if(!n)return null;let e=YE(n);if(e.startsWith("+43"))return/^\+43\d{4,13}$/.test(e)?e:null;if(e.startsWith("0")){const t="+43"+e.slice(1);return/^\+43\d{4,13}$/.test(t)?t:null}if(e.startsWith("43")){const t="+"+e;return/^\+43\d{4,13}$/.test(t)?t:null}if(/^\d{5,}$/.test(e)&&e[0]!=="0"){const t="+43"+e;return/^\+43\d{4,13}$/.test(t)?t:null}return null}async function Cc(n,e,t){const s=Bd(n);Th(Ct);const i={tel:e??null,allowSmsFallback:!!t,...e?{telUpdatedAt:Date.now()}:{}};await qe(A(R,`roles/${s}`),i)}const ue=n=>document.getElementById(n),Ra=n=>n&&(n.style.display=""),Oa=n=>n&&(n.style.display="none"),Xi=n=>{try{localStorage.setItem(Md,n||"")}catch{}},ZE=()=>{try{return localStorage.getItem(Md)||""}catch{return""}};function Hd(n){return typeof n=="number"?n:n&&typeof n=="object"&&typeof n.seconds=="number"?n.seconds*1e3:0}function Vd(n){return n?`${String(n)}`:"Unbekannt"}function eT(n){const e=(n||"").trim();if(e.length<2)throw new Error("Der Teamname muss mindestens 2 Zeichen lang sein.");if(e.length>24)throw new Error("Der Teamname darf maximal 24 Zeichen lang sein.");return e}function at(n){return(n||"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function Or(n=""){return at(n).replace(/`/g,"&#096;")}function _o(n){const e=(n==null?void 0:n.members)||{};return Object.keys(e).length}function tT(n,e=H){return!!(n!=null&&n.members)&&!!n.members[e]}function nT(){ZE()?(ue("teamStatusName").textContent="(lädt…)",ue("teamStatusCount").textContent="-"):(ue("teamStatusName").textContent="Kein Team",ue("teamStatusCount").textContent="-"),Na()}document.addEventListener("DOMContentLoaded",nT);function sT(){Ra(ue("teamSettings")),Oa(ue("startView")),Na()}function iT(){Ra(ue("startView")),Oa(ue("teamSettings"))}function Na(){if(!Ns.deviceTeam){const n=A(R,`deviceTeams/${H}`),e=t=>{ie=t.val()||null,Xi(ie||""),Ac(),Pc(),Rc()};ut(n,e),Ns.deviceTeam={ref:n,handler:e}}if(!Ns.teams){const n=A(R,"teams"),e=t=>{ot=t.val()||{},Ac(),Pc(),Rc()};ut(n,e),Ns.teams={ref:n,handler:e}}}function Ac(){const n=ue("currentTeamName"),e=ue("currentTeamMembers"),t=ue("leaveTeamBtn"),s=ie?ot[ie]:null;if(!s){n.textContent="Kein Team",e&&(e.innerHTML="— Mitglieder"),t&&(t.disabled=!0);return}n.textContent=s.name||"(ohne Namen)";const i=Object.entries(s.members||{}).map(([o,a])=>({id:o,joinedAt:Hd(a==null?void 0:a.joinedAt)})).sort((o,a)=>o.joinedAt!==a.joinedAt?o.joinedAt-a.joinedAt:o.id.localeCompare(a.id)),r=i.map(o=>{const a=o.id===H,l=Vd(o.id)+(a?" (Du)":"");return`<li class="ts-member ${a?"me":""}" title="${at(o.id)}">${at(l)}</li>`}).join("");e&&(e.innerHTML=`
      <div class="muted">${i.length} Mitglied(er)</div>
      ${i.length>0?`<ul class="ts-member-list">${r}</ul>`:'<div class="muted">Noch keine Mitglieder</div>'}
    `),t&&(t.disabled=!tT(s))}function Pc(){const n=ue("teamList"),e=ue("teamsEmpty");if(!n)return;n.innerHTML="";const t=Object.entries(ot||{}).filter(([,s])=>s&&typeof s=="object");if(t.length===0){e&&Ra(e);return}e&&Oa(e),t.sort((s,i)=>{const r=_o(s[1]),o=_o(i[1]);return r!==o?o-r:(s[1].name||"").localeCompare(i[1].name||"")});for(const[s,i]of t){const r=Object.entries(i.members||{}).map(([l,c])=>({id:l,joinedAt:Hd(c==null?void 0:c.joinedAt)})).sort((l,c)=>l.joinedAt!==c.joinedAt?l.joinedAt-c.joinedAt:l.id.localeCompare(c.id)),o=r.map(l=>{const c=l.id===H,u=Vd(l.id)+(c?" (Du)":"");return`<li class="ts-member ${c?"me":""}" title="${at(l.id)}">${at(u)}</li>`}).join(""),a=document.createElement("div");a.className="ts-team",a.innerHTML=`
      <div>
        <div style="font-weight:600">${at(i.name||"(ohne Namen)")}</div>
        <div class="muted">${r.length} Mitglied(er)</div>
        <ul class="ts-member-list">
          ${o||""}
        </ul>
      </div>
      <div>
        ${ie===s?'<button class="danger" onclick="leaveTeam()">Verlassen</button>':`<button onclick="joinTeam('${s}', this)">Beitreten</button>`}
      </div>
    `,n.appendChild(a)}}function Rc(){const n=ue("teamStatusName"),e=ue("teamStatusCount"),t=ie?ot[ie]:null;if(!t){n.textContent="Kein Team",e.textContent="-";return}n.textContent=t.name||"(ohne Namen)",e.textContent=`${_o(t)} Mitglied(er)`}async function rT(){const n=ue("createTeamBtn"),e=ue("createTeamInput");try{n.disabled=!0;const t=eT(e.value);ie&&await xa(ie);const i=$i(A(R,"teams")).key,r={};r[`teams/${i}`]={name:t,createdAt:En(),createdBy:H,members:{[H]:{joinedAt:En()}}},r[`deviceTeams/${H}`]=i,await qe(A(R),r),Xi(i),e.value=""}catch(t){alert((t==null?void 0:t.message)||"Team konnte nicht erstellt werden."),S(t)}finally{n.disabled=!1}}async function oT(n,e){if(!n)return;if(!ot[n]){alert("Team existiert nicht (mehr).");return}e&&(e.disabled=!0);try{ie&&ie!==n&&await xa(ie);const s={};s[`teams/${n}/members/${H}`]={joinedAt:En()},s[`deviceTeams/${H}`]=n,await qe(A(R),s),Xi(n)}catch(s){alert((s==null?void 0:s.message)||"Beitritt nicht möglich."),S(s)}finally{e&&(e.disabled=!1)}}async function xa(n=null){const e=n||ie;if(!e)return;const t=A(R,`teams/${e}`);await ji(t,s=>s&&(s.members&&s.members[H]&&(delete s.members[H],Object.keys(s.members).length===0)?null:s)),await Re(A(R,`deviceTeams/${H}`),null),Xi("")}function aT(){const n=document.getElementById("map");n.style.display=""}function yo(n,e){if(aT(),C)C.setView([n,e],15),C.invalidateSize(),wo(),vo();else{C=L.map("map").setView([n,e],15);const t=L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap"}),s=L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",{attribution:"© CartoDB"}),i=L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{attribution:"Tiles © Esri"}),r=L.tileLayer("http://sgx.geodatenzentrum.de/wmts_topplus_open/tile/1.0.0/web/default/WEBMERCATOR/{z}/{y}/{x}.png",{maxZoom:18,attribution:"TopPlus Open © GeoBasis-DE / BKG"}),o=L.tileLayer("https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=sxLNDIsEdS0kt8fQKhSLB1Z7wVp3ZkV78F5HhvIElZWKDuahhvgWnCZkOceLTzYS",{attribution:"© Jawg"}),a={Standard:t,"Jawg Street":o,Reduziert:s,Satellit:i,Plan:r};t.addTo(C),L.control.layers(a).addTo(C),setTimeout(()=>C.invalidateSize(),0),wo(),vo()}Da()}function wo(){C&&(C.getPane("maskPane")||(C.createPane("maskPane"),C.getPane("maskPane").style.zIndex=300),C.getPane("historyPane")||(C.createPane("historyPane"),C.getPane("historyPane").style.zIndex=410),C.getPane("postenPane")||(C.createPane("postenPane"),C.getPane("postenPane").style.zIndex=400),C.getPane("agentenPane")||(C.createPane("agentenPane"),C.getPane("agentenPane").style.zIndex=420),C.getPane("userPane")||(C.createPane("userPane"),C.getPane("userPane").style.zIndex=450))}function vo(){fe||(fe=L.layerGroup()),st||(st=L.layerGroup()),xs||(xs=L.layerGroup()),C&&(C.hasLayer(fe)||fe.addTo(C),C.hasLayer(st)||st.addTo(C),C.hasLayer(xs)||xs.addTo(C))}function lT(n){if(!C)return;vo(),st.clearLayers();const e=new L.Icon.Default;e.options.shadowSize=[0,0],n.forEach(s=>{L.marker([s.lat,s.lon],{pane:"historyPane",icon:e}).addTo(st).bindPopup(`📍 ${new Date(s.timestamp).toLocaleTimeString()}`)});const t=n.map(s=>[s.lat,s.lon]);t.length>1&&L.polyline(t,{color:"blue",weight:3,opacity:.7,smoothFactor:1,pane:"historyPane"}).addTo(st)}function qd(){ut(A(R,"locations"),n=>{var o,a,l,c,u,h;const e=n.val()||null;let t=[],s=[],i=null;try{t=Object.values(e).sort((d,g)=>g.timestamp-d.timestamp),s=t.filter(d=>d.lat!=null&&d.lon!=null),i=s.length===0}catch{i=!0}if(i)yo(48.208672092667435,16.372477270381918),S("Keine Locations");else if(s.length>0){const{lat:d,lon:g}=s[0];yo(d,g)}if(uT(),s.length>0?lT(s):st&&st.clearLayers(),Da(),pi({nonDestructive:!0}),console.log("map id",C==null?void 0:C._leaflet_id),console.log("postenPane exists?",!!(C!=null&&C.getPane("postenPane"))),console.log("postenPane zIndex",(a=(o=C==null?void 0:C.getPane("postenPane"))==null?void 0:o.style)==null?void 0:a.zIndex),console.log("historyPane zIndex",(c=(l=C==null?void 0:C.getPane("historyPane"))==null?void 0:l.style)==null?void 0:c.zIndex),console.log("userPane zIndex",(h=(u=C==null?void 0:C.getPane("userPane"))==null?void 0:u.style)==null?void 0:h.zIndex),console.log("postenLayer on map?",C==null?void 0:C.hasLayer(fe)),console.log("postenMarkers count",Object.keys(Ue||{}).length),C&&Ar&&typeof Ar.addTo=="function")try{Ar.addTo(C)}catch(d){S("Fehler beim Hinzufügen von mask:",d)}document.getElementById("map").style.display="block";const r=document.getElementById("locationFeed");r.innerHTML="",t.length>0&&t.forEach((d,g)=>{const y=d.title?d.title:"Automatischer Standort",T=d.timestamp?new Date(d.timestamp).toLocaleTimeString():"",E=d.photoURL?`<img src="${d.photoURL}" alt="Foto" class="zoomable-photo" style="max-width: 100%; max-height: 60vh; border: 1px solid #ccc; margin-top: 5px; cursor: zoom-in;" data-index="${g}">`:"",P=document.createElement("div");P.style.marginBottom="1em",P.innerHTML=`
          <strong class="location-title" data-lat="${d.lat}" data-lon="${d.lon}" style="cursor: pointer;">${y} (${T})</strong><br>
          ${d.description?`<em>📍 ${d.description}</em><br>`:""}
          ${E}
        `,r.appendChild(P)}),document.querySelectorAll(".location-title").forEach(d=>{d.addEventListener("click",()=>{const g=parseFloat(d.dataset.lat),y=parseFloat(d.dataset.lon);C&&!isNaN(g)&&!isNaN(y)&&C.setView([g,y],17)})}),document.querySelectorAll(".zoomable-photo").forEach(d=>{d.addEventListener("click",()=>{const g=document.createElement("div");g.style.position="fixed",g.style.top="0",g.style.left="0",g.style.width="100vw",g.style.height="100vh",g.style.backgroundColor="rgba(0,0,0,0.8)",g.style.display="flex",g.style.alignItems="center",g.style.justifyContent="center",g.style.zIndex="9999",g.innerHTML=`<img src="${d.src}" style="max-width: 90%; max-height: 90%; border: 2px solid white;">`,g.addEventListener("click",()=>{document.body.removeChild(g)}),document.body.appendChild(g)})})})}function cT(){if(!navigator.geolocation){alert("❌ Geolocation wird nicht unterstützt.");return}Jn==null&&(Jn=navigator.geolocation.watchPosition(n=>{const{latitude:e,longitude:t,accuracy:s}=n.coords;if(!C)return;const i={radius:7,color:"#007AFF",fillColor:"#ffffffff",fillOpacity:.8,opacity:1,weight:2},r={radius:s,color:"#007AFF",fillColor:"#007AFF",fillOpacity:.2,weight:1,opacity:.4};if(Le?(Le.setLatLng([e,t]),Le.getPopup()&&Le.getPopup().setContent(`<strong>Dein Standort</strong><br>Genauigkeit: ±${Math.round(s)} m`)):Le=L.circleMarker([e,t],{markerStyle:i,pane:"userPane"}).bindPopup(`<strong>Dein Standort</strong><br>Genauigkeit: ±${Math.round(s)} m`).addTo(C),We?(We.setLatLng([e,t]),We.setRadius(s)):We=L.circle([e,t],{accuracyStyle:r,pane:"historyPane"}).addTo(C),Ld){const o=Math.max(C.getZoom(),16);C.setView([e,t],o,{animate:!0})}},n=>{S("Geolocation-Fehler:",n),zd(),alert("⚠️ Tracking gestoppt: "+n.message)},{enableHighAccuracy:!0,timeout:15e3,maximumAge:5e3}))}function zd(){Jn!=null&&(navigator.geolocation.clearWatch(Jn),Jn=null),C&&Le&&(C.removeLayer(Le),Le=null),C&&We&&(C.removeLayer(We),We=null)}function uT(){C&&(Le&&!C.hasLayer(Le)&&Le.addTo(C),We&&!C.hasLayer(We)&&We.addTo(C))}function hT(){const n=document.getElementById("refreshBtn");n&&n.addEventListener("click",async()=>{n.classList.add("updating");try{await dT({timeoutMs:2500})}catch(e){S("[Refresh] Fehler im Update-Flow:",e),window.location.reload()}})}async function dT({timeoutMs:n=2500}={}){if(!("serviceWorker"in navigator)){window.location.reload();return}const e=await navigator.serviceWorker.getRegistration();if(!e){S("[Refresh] Keine SW-Registration gefunden -> normaler Reload"),window.location.reload();return}S("[Refresh] Vor Update:",mT(e)),await e.update();let t=e.installing||e.waiting||null;t||(t=await fT(e,800)),t?(await pT(t),e.waiting&&(S("[Refresh] Sende SKIP_WAITING an Waiting-SW"),e.waiting.postMessage({type:"SKIP_WAITING"}))):S("[Refresh] Keine neue SW gefunden -> normaler Reload"),await gT(n),window.location.reload()}function fT(n,e){return new Promise(t=>{let s;const i=()=>{n.removeEventListener("updatefound",i),clearTimeout(s),t(n.installing||n.waiting||null)};n.addEventListener("updatefound",i),s=setTimeout(()=>{n.removeEventListener("updatefound",i),t(null)},e)})}function pT(n){return new Promise(e=>{if(n.state==="installed"||n.state==="activated")return e();n.addEventListener("statechange",()=>{(n.state==="installed"||n.state==="activated")&&e()})})}function gT(n){return new Promise(e=>{let t=!1;const s=()=>{t||(t=!0,navigator.serviceWorker.removeEventListener("controllerchange",i),e())},i=()=>{S("[Refresh] controllerchange empfangen"),s()};navigator.serviceWorker.addEventListener("controllerchange",i),setTimeout(()=>{S("[Refresh] controllerchange-Timeout, lade dennoch neu"),s()},n)})}function mT(n){const e=t=>t?t.state:"—";return{scope:n.scope,active:e(n.active),installing:e(n.installing),waiting:e(n.waiting),controlled:!!navigator.serviceWorker.controller}}function _T(){let n=0;const e=15e3,t=async()=>{const s=Date.now();if(!(s-n<e)){n=s;try{const i=await navigator.serviceWorker.getRegistration();if(!i)return;await i.update(),i.waiting&&i.waiting.postMessage({type:"SKIP_WAITING"})}catch{}}};document.addEventListener("visibilitychange",()=>{document.hidden||t()}),window.addEventListener("focus",t)}function yT(n,e,t){const s=ME[n]||"#666";return t?{radius:10,color:s,fillColor:s,fillOpacity:.9,opacity:1,weight:3}:e===!1?{radius:6,color:s,fillColor:s,fillOpacity:.25,opacity:.4,weight:1}:{radius:9,color:s,fillColor:s,fillOpacity:.7,opacity:.9,weight:2}}function Oc(n,e,t,s){const i=t.title||e,r=!!t.visited,o=s?"aktiv":"inaktiv",a=r?"✅ besucht":"🕒 offen",l=t.imageUrl?`
      <div class="posten-preview" style="margin-top:6px">
        <img
          class="posten-preview-img"
          src="${Or(t.imageUrl)}"
          data-fullsrc="${Or(t.imageUrl)}"
          alt="${Or(i)}"
          loading="lazy"
          style="width:100%;height:auto;max-height:120px;object-fit:contain;border-radius:8px;cursor:zoom-in;display:block"
          referrerpolicy="no-referrer"
        />
      </div>
    `:"";return`
    <div class="posten-popup" style="min-width:200px">
      <strong>${at(i)}</strong><br>
      <small>Farbe: ${at(n)} (${o})</small><br>
      <small>Status: ${a}</small>
      ${l}
    </div>
  `}function wT(n){const e=n.lat??n.latitude??null,t=n.lon??n.lng??n.longitude??null;return{lat:e,lon:t}}async function vT(){const n=A(R,"posten"),e=await Z(n);Xt=e.exists()?e.val():null,pi(),ut(n,t=>{Xt=t.exists()?t.val():null,pi()})}function bT(){const n=document.getElementById("img-lightbox"),e=document.getElementById("img-lightbox-close");if(!n||!e)return;const t=()=>n.style.display="none";e.addEventListener("click",t),n.addEventListener("click",s=>{s.target===n&&t()}),document.addEventListener("keydown",s=>{s.key==="Escape"&&t()})}function ET(){const n=e=>{const t=e.target.closest(".posten-preview-img");if(!t)return;e.preventDefault(),e.stopPropagation();const s=t.getAttribute("alt")||"Bild",i=t.getAttribute("data-fullsrc")||t.getAttribute("src");i&&TT(i,s)};document.addEventListener("click",n,{capture:!0})}function TT(n,e=""){const t=document.getElementById("img-lightbox"),s=document.getElementById("img-lightbox-img");!t||!s||(t.style.display="flex",s.onload=null,s.onerror=null,s.alt=e||"Bild",s.src===n&&(s.src=""),s.src=n)}function Da(){fe||(fe=L.layerGroup()),C&&!C.hasLayer(fe)&&fe.addTo(C)}function pi(n={}){const{nonDestructive:e=!1}=n;if(!C||!Xt)return;wo(),Da();const t=new Set;let s=0;if(Object.entries(Xt).forEach(([i,r])=>{if(!r||typeof r!="object")return;const o=!!r.active,a=Object.fromEntries(Object.entries(r).filter(([l])=>l!=="active"));Object.entries(a).forEach(([l,c])=>{var y,T;if(!c||typeof c!="object")return;const{lat:u,lon:h}=wT(c);if(u==null||h==null)return;s++;const d=`${i}/${l}`;t.add(d);const g=yT(i,o,!!c.visited);if(Ue[d]){const E=Ue[d];E.setLatLng([u,h]),E.setStyle(g),E._postenLoc=c,E._postenId=d,fe&&!fe.hasLayer(E)&&E.addTo(fe),(y=E.bringToFront)==null||y.call(E),(T=E.getPopup())==null||T.setContent(Oc(i,l,c,o))}else{const E=L.circleMarker([u,h],{...g,pane:"postenPane"}).bindPopup(Oc(i,l,c,o));E._postenLoc=c,E._postenId=d,E.addTo(fe),Ue[d]=E}})}),!e){if(s===0){S("[posten] Kein gültiger Posten geparst - Cleanup übersprungen.");return}Object.keys(Ue).forEach(i=>{t.has(i)||(fe.removeLayer(Ue[i]),delete Ue[i])})}}Object.keys(Ue).forEach(n=>{seen.has(n)||(fe.removeLayer(Ue[n]),delete Ue[n])});async function ST(n=!0){const e=A(R,"posten"),t=await Z(e);if(!t.exists())return;const s=t.val(),i={};Object.entries(s).forEach(([r,o])=>{!o||typeof o!="object"||(i[`posten/${r}/active`]=n,Object.entries(o).forEach(([a,l])=>{a==="active"||!l||typeof l!="object"||(i[`posten/${r}/${a}/visited`]=!1)}))}),await qe(A(R),i)}const Ds=n=>n*Math.PI/180;function kT(n,e,t,s){const r=Ds(t-n),o=Ds(s-e),a=Math.sin(r/2)**2+Math.cos(Ds(n))*Math.cos(Ds(t))*Math.sin(o/2)**2;return 2*6371e3*Math.asin(Math.sqrt(a))}function Kd(n={enableHighAccuracy:!0,timeout:8e3,maximumAge:0}){return new Promise((e,t)=>{if(!navigator.geolocation)return t(new Error("Geolocation nicht unterstützt"));navigator.geolocation.getCurrentPosition(e,t,n)})}function Gd({excludeVisited:n=!0}={}){const e=[];for(const[t,s]of Object.entries(Xt))if(!(!s||s.active!==!0))for(const[i,r]of Object.entries(s.posts||{}))!r||typeof r!="object"||n&&r.visited===!0||e.push({color:t,postId:i,...r});return e}function js(n){const e=document.getElementById("postenSuggestions");if(!n||n.length===0){e.style.display="none",e.innerHTML="";return}e.innerHTML=n.map(t=>{const s=t.distance!=null?` - ${(t.distance/1).toFixed(0)} m`:"";return`<div class="item" data-color="${t.color}" data-postid="${t.postId}">
              ${t.title||"(ohne Titel)"}
              <span class="tag">${t.color}</span>${s}
            </div>`}).join(""),e.style.display="block",e.querySelectorAll(".item").forEach(t=>{t.addEventListener("click",()=>{var c,u;const s=t.getAttribute("data-color"),i=t.getAttribute("data-postid"),r=(u=(c=Xt[s])==null?void 0:c.posts)==null?void 0:u[i];if(!r){S("Ausgewählter Posten nicht im Cache gefunden:",{color:s,postId:i}),document.getElementById("status").innerText="Dieser Posten ist nicht mehr verfügbar.",e.style.display="none";return}const o={color:s,postId:i,title:r.title||i,lat:r.lat??null,lon:r.lon??null};of(o);const a=document.getElementById("postenSearch");a&&(a.value=`${o.title} [${s}]`),e.style.display="none";const l=document.getElementById("status");l&&(l.innerText=`✅ Posten ausgewählt: ${o.title} (${s})`)})})}function Jd(n){const e=(n||"").trim().toLowerCase(),t=Gd();return e?t.filter(s=>{const i=String(s.postId).toLowerCase(),r=String(s.title||"").toLowerCase(),o=String(s.color).toLowerCase();return i.includes(e)||r.includes(e)||o.includes(e)}).slice(0,25):[]}async function IT(n=5){try{const e=await Kd(),{latitude:t,longitude:s,accuracy:i}=e.coords;i>100&&(document.getElementById("status").innerText=`⚠️ Standort ungenau (±${Math.round(i)} m). Ergebnisse evtl. ungenau.`);const r=Gd().map(o=>({...o,distance:o.lat!=null&&o.lon!=null?kT(t,s,o.lat,o.lon):Number.POSITIVE_INFINITY}));return r.sort((o,a)=>o.distance-a.distance),r.slice(0,n)}catch{return document.getElementById("status").innerText="📍 Konnte Standort nicht bestimmen. Du kannst trotzdem per Suche auswählen.",[]}}async function CT(){const n=A(R,"posten");ut(n,e=>{const t=e.val()||{},s={};for(const[r,o]of Object.entries(t)){if(!o||typeof o!="object")continue;const{active:a,...l}=o,c={};for(const[u,h]of Object.entries(l))h&&typeof h=="object"&&(c[u]=h);s[r]={active:!!a,posts:c}}Xt=s;const i=document.getElementById("postenSearch").value;i&&js(Jd(i))})}function AT(){const n=document.getElementById("postenSearch"),e=document.getElementById("nearbyBtn");let t;n.addEventListener("input",()=>{clearTimeout(t),t=setTimeout(()=>{const s=Jd(n.value);js(s)},150)}),e.addEventListener("click",async()=>{const s=await IT(20);if(s.length===0){js(s),document.getElementById("status").innerText="Keine nahegelegenen Posten gefunden (oder Standort unbekannt).";return}js(s)}),document.addEventListener("click",s=>{const i=document.getElementById("postenSuggestions");i.contains(s.target)||n.contains(s.target)||e.contains(s.target)||(i.style.display="none")})}const us=document.getElementById("notifHeader"),Yn=document.getElementById("notifHeaderToggle"),Nr=document.getElementById("notifSummary"),PT=document.getElementById("notifDetails"),Nc=document.getElementById("notifStatusDot"),xc=document.getElementById("notifTimeShort"),Dc=document.getElementById("notifTitle"),Lc=document.getElementById("notifBody"),Mc=document.getElementById("notifSender"),$c=document.getElementById("notifTime"),Fc=document.getElementById("notifId"),xr=document.getElementById("recipientList"),Ls=document.getElementById("notifCount"),$n=document.getElementById("toggleNotifHeader");let jt=null;function Dr(n){us.style.display=n?"block":"none",!n&&typeof jt=="function"&&(jt(),jt=null)}function La(n){us.classList.toggle("collapsed",n),us.classList.toggle("expanded",!n),PT.hidden=n,Yn.setAttribute("aria-expanded",String(!n)),Yn.textContent=n?"▾":"▴"}Yn==null||Yn.addEventListener("click",n=>{n.stopPropagation();const e=us.classList.contains("collapsed");La(!e)});Nr==null||Nr.addEventListener("click",()=>{const n=us.classList.contains("collapsed");La(!n)});function RT(n){return new Date(n).toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit"})}function bo(n){if(!n){Dc.textContent="-",Lc.textContent="-",Mc.textContent="-",$c.textContent="-",xc.textContent="[--:--]",Fc.textContent="-",xr.innerHTML="",Nc.style.background="#bbb",Ls&&(Ls.textContent="-");return}const e=typeof n.timestamp=="number"?n.timestamp:Date.now(),t=RT(e);Dc.textContent=n.title||"Ohne Titel",Lc.textContent=n.body||"",Mc.textContent=n.sender||"Unbekannt",$c.textContent=new Date(e).toLocaleString("de-DE"),xc.textContent=`[${t}]`,Fc.textContent=n.id??"-";const s=n.recipients||{},i=Object.keys(s),r=i.filter(a=>s[a]===!0).length,o=i.length;Nc.style.background=o>0&&r===o?"#4caf50":"#ff9800",Ls&&(Ls.textContent=`${r}/${o} bestätigt`),xr.innerHTML="",i.sort((a,l)=>a.localeCompare(l)).forEach(a=>{const l=s[a]===!0,c=document.createElement("div");c.className=`recipient-chip ${l?"ok":"wait"}`,c.innerHTML=`<span class="dot"></span><span>${a}</span><span>${l?"✅":"⏳"}</span>`,xr.appendChild(c)})}function jc(){typeof jt=="function"&&(jt(),jt=null);const n=Eh(A(R,"notifications"),bh("timestamp"),my(1)),e=ut(n,t=>{const s=t.val();if(!s){bo(null);return}const[i,r]=Object.entries(s)[0];bo({id:i,...r})});jt=()=>e()}function OT(){const n=localStorage.getItem(Cr)==="1";Dr(n),n&&jc(),$n&&($n.checked=n),La(!0),$n==null||$n.addEventListener("change",e=>{e.target.checked?(localStorage.setItem(Cr,"1"),Dr(!0),jc()):(localStorage.removeItem(Cr),Dr(!1),bo(null))})}async function NT(){try{let n=ot;(!n||Object.keys(n).length===0)&&(n=(await Z(A(R,"teams"))).val()||{});const e={};for(const[i,r]of Object.entries(n)){if(i===ie)continue;(r!=null&&r.members?Object.keys(r.members).length:0)>0&&(e[i]=!0)}if(Object.keys(e).length===0){S==null||S("[triggerAgentLocationRequest] Abbruch: keine adressierbaren Teams gefunden."),alert("Keine Teams gefunden, die angefragt werden können.");return}const t=String(Date.now()),s={id:t,createdAt:En(),createdBy:H,teamsAtRequest:e,responses:{}};return await Re(A(R,"agentLocationRequest"),s),Ht("Mister X hat deinen Standort angefragt","Öffne die App, um deinen Standort freizugeben!",["agent","settings","start"]),S==null||S("[triggerAgentLocationRequest] Anfrage ausgelöst",{reqId:t,totalTeams:Object.keys(e).length}),t}catch(n){throw S==null||S("[triggerAgentLocationRequest] Anfrage fehlgeschlagen",n),alert("Konnte die Anfrage nicht auslösen."),n}}async function xT(n){var a;if(!ie){alert("Du bist in keinem Team. Standortfreigabe abgebrochen.");return}const e=A(R,`agentLocationRequest/responses/${ie}`);if((await Z(e)).exists()){try{localStorage.setItem(kc,n.id)}catch{}return}const s=await new Promise((l,c)=>{if(!navigator.geolocation)return c(new Error("Geolocation nicht verfügbar"));navigator.geolocation.getCurrentPosition(l,c,{enableHighAccuracy:!0,timeout:15e3,maximumAge:0})}),i=s.coords.latitude,r=s.coords.longitude,o=((a=ot==null?void 0:ot[ie])==null?void 0:a.name)||"Team";alert("Dein Standort wird jetzt freigegeben"),await ji(e,l=>l||(S("Standort für AgentLocation ausgesendet"),{teamId:ie,teamName:o,lat:i,lon:r,deviceId:H,timestamp:En()}));try{localStorage.setItem(kc,n.id)}catch{}}function DT(){_e(A(R,"agentLocationRequest")),MT(),Eo()}function Eo(){Array.isArray(jn)&&jn.length&&window.map&&jn.forEach(n=>C.removeLayer(n)),jn=[]}function LT(){const n=A(R,"agentLocationRequest");ut(n,t=>{const s=t.exists()?t.val():null;$d=s,Yd(s),s&&s.createdBy!==H&&ie&&$T(s)})}function MT(){const n=document.getElementById("agentReqStatus");n&&(n.style.display="none")}async function $T(n){try{await xT(n)}catch(e){S("Standortfreigabe fehlgeschlagen",e)}}function Yd(n=$d){const e=document.getElementById("agentReqStatus"),t=document.getElementById("agentReqProgress");if(!e||!t)return;if(!n){e.style.display="none",Eo();return}const s=typeof n.createdAt=="number"?new Date(n.createdAt).toLocaleTimeString():"Unbekannt",i=n.responses||{},r=Object.values(i),o=n.teamsAtRequest||{},a=Object.keys(o).length||r.length,l=r.length;if(t.textContent=`Standort von ${l}/${a} Teams – ${s}`,e.style.display="block",Eo(),!(!$s||r.length===0)){FT(r);for(const c of r){if(c.lat==null||c.lon==null)continue;const u=L.divIcon({className:`square-marker ${jT(c.teamId)}`,iconSize:[14,14]}),h=L.marker([c.lat,c.lon],{icon:u,pane:"agentenPane"}).addTo(C);h.bindPopup(`<strong>${at(c.teamName||"Team")}</strong>`),jn.push(h)}}}function FT(n){if(!window.map){const e=n.find(t=>t.lat!=null&&t.lon!=null);e&&yo(e.lat,e.lon)}}function jT(n){const e=["","orange","green","purple","blue","red","yellow","cyan","pink","lime","teal","brown"],t=Math.abs(BT(String(n)))%e.length;return e[t]}function BT(n){let e=0;for(let t=0;t<n.length;t++)e=(e<<5)-e+n.charCodeAt(t),e|=0;return e}function UT(){Z(A(R,"roles")).then(n=>{const e=n.val();for(const t in e)e[t].role==="misterx"&&Re(A(R,"roles/"+t),{role:"start",timestamp:Date.now()});alert("Alle Mister X Rollen wurden zurückgesetzt.")})}async function WT(){const n=await Z(A(R,"settings/max_Team_X")),e=n.exists()?n.val():1,s=(await Z(A(R,"roles"))).val();let i=0;for(const r in s)s[r].role==="misterx"&&i++;return i<e}async function Qd(n){if(n!==localStorage.getItem("activeView")){if(n==="misterx"&&!await WT()){alert("Es ist bereits ein Gerät als Mister X angemeldet!"),To();return}if(n==="settings"&&prompt("Passwort eingeben!")!=="1001"){To();return}}document.getElementById("startView").style.display="none",document.getElementById("startView2").style.display="none",document.querySelectorAll(".view").forEach(t=>t.style.display="none"),n==="misterx"?document.getElementById("misterxView").style.display="block":n==="agent"?document.getElementById("agentView").style.display="block":n==="settings"&&(document.getElementById("settingsView").style.display="block",eS()),localStorage.setItem("activeView",n),qe(A(R,"roles/"+H),{role:n,timestamp:Date.now()});const e=n;await Ke.from("fcm_tokens").update({role:e}).eq("device_name",H),Z(A(R,"timer")).then(t=>{const s=t.val();if(s){const{startTime:i,duration:r,durationInput:o,durationInput2:a}=s;r?(Xd(i,r),Sn(!0)):Sn(!1)}})}async function To(){document.querySelectorAll(".view").forEach(e=>e.style.display="none"),document.getElementById("startView").style.display="block",document.getElementById("startView2").style.display="block",clearInterval(wt),localStorage.setItem("activeView","start"),qe(A(R,"roles/"+H),{role:"start",timestamp:Date.now()}),await Ke.from("fcm_tokens").update({role:"start"}).eq("device_name",H)}async function gn(n){await _e(A(R,"timer/duration")),await _e(A(R,"timer/startTime")),await _e(A(R,"timerMessage")),typeof wt<"u"&&clearInterval(wt);const t=(await Z(A(R,"timer"))).val();let s=25*60;typeof(t==null?void 0:t.durationInput)=="number"&&t.durationInput>0&&(s=t.durationInput,(isNaN(s)||s<1)&&(s=60)),typeof n=="number"&&n>0&&(s=n);const i=Date.now(),r=i+s*1e3,o={title:"Deine Zeit läuft gleich ab",body:"Bitte öffne deine App!"};await Re(A(R,"timer"),{startTime:i,duration:s,durationInput:t==null?void 0:t.durationInput,durationInput2:(t==null?void 0:t.durationInput2)||0});try{await Ke.rpc("cancel_and_unschedule")}catch(h){S("[Timer] cancel_and_unschedule fehlgeschlagen (ignoriere und fahre fort):",h)}const{tokens:a,deviceNames:l}=await zE("misterx"),c=s-60,u=(Fs==null?void 0:Fs())??void 0;await Ke.functions.invoke("arm-timer-cron",{body:{title:o.title,body:o.body,dueInSec:c,messageId:u,link:"/Mister-X/",recipientDeviceNames:l,tokens:a,rtdbBase:di}}),S(`🕒 Timer gestartet: ${s}s, fällt um ${new Date(r).toLocaleTimeString()}.`)}function HT(){Sc||(Sc=!0,ut(A(R,"timer"),n=>{const e=n.val()||{},{startTime:t=null,duration:s=null,durationInput:i=null,durationInput2:r=null}=e;if(t===null||s===null){clearInterval(wt),Sn(!1);const o=document.getElementById("timer"),a=document.getElementById("agentTimer"),l=document.getElementById("settingsTimer");o&&(o.innerText="⏳ Zeit bis zum nächsten Posten: --:--"),a&&(a.innerText="⏳ Mister X Timer: --:--"),l&&(l.innerText="⏳ Aktueller Timer: --:--");return}Xd(t,s),Sn(!0)}))}function Xd(n,e){clearInterval(wt);let t=!1;wt=setInterval(async()=>{if(!t){t=!0;try{let s=function(h){h&&(o<=300&&o>1?(h.style.color="red",h.style.animation="blinker 1s linear infinite"):(h.style.color="",h.style.animation=""))};const i=Date.now(),r=Math.floor((i-n)/1e3),o=e-r;let a;if(o<0)a="abgelaufen";else{const h=Math.floor(o/60),d=o%60;a=`${String(h).padStart(2,"0")}:${String(d).padStart(2,"0")}`}const l=document.getElementById("timer"),c=document.getElementById("agentTimer"),u=document.getElementById("settingsTimer");if(u&&(u.innerText=`⏳ Aktueller Timer: ${a}`,s(u)),l&&(l.innerText=`⏳ Zeit bis zum nächsten Posten: ${a}`,s(l)),c&&(c.innerText=`⏳ Mister X Timer: ${a}`,s(c)),o<=0&&([l,c,u].forEach(h=>{h&&(h.style.color="",h.style.animation="")}),localStorage.getItem("activeView")==="misterx"))try{const d=(await Z(A(R,"timer"))).val()||{},{startTime:g,duration:y,durationInput:T,durationInput2:E}=d||{};if(typeof g!="number"||typeof y!="number")return;const P=Zd(g,y);if(!VT(P))return;const I=y===T&&(E??0)>0?`Zeit abgelaufen, dein Standort wird einmalig geteilt.
Tippe auf OK, um fortzufahren.`:`Zeit abgelaufen, jetzt musst du deinen Live-Standort in der WhatsApp-Gruppe teilen.
(Der Timer bleibt bis zu deinem nächsten Posten deaktiviert)`;alert(I),await zT(R,async z=>{const B=z==null?void 0:z.durationInput,_=z==null?void 0:z.durationInput2;if(y===B&&(_??0)>0)await JT();else{await Promise.all([_e(A(R,"timer/duration")),_e(A(R,"timer/startTime")),_e(A(R,"timerMessage"))]),clearInterval(wt),Sn(!1);const m=document.getElementById("timer"),w=document.getElementById("agentTimer"),v=document.getElementById("settingsTimer");m&&(m.innerText="⏳ Zeit bis zum nächsten Posten: --:--"),w&&(w.innerText="⏳ Mister X Timer: --:--"),v&&(v.innerText="⏳ Aktueller Timer: --:--"),Ht("Zeit abgelaufen!","Mister X muss sich per Live-Standort zeigen","all")}})||KT()}catch(h){S("Fehler im Ablauf-Handling:",h)}}finally{t=!1}}},1e3)}function Zd(n,e){return`${n}_${e}`}function VT(n){const e=`alertShown_${n}`;return localStorage.getItem(e)==="1"?!1:(localStorage.setItem(e,"1"),!0)}async function qT(n,e=5*60*1e3){let t=Date.now();try{const l=await Z(A(n,".info/serverTimeOffset")),c=typeof l.val()=="number"?l.val():0;t+=c}catch{}const s=t-e;console.log("[GC] serverNow:",t,"threshold:",s,new Date(s).toISOString());const i=Eh(A(n,"timerClaims"),bh("at"),py(s)),r=await Z(i);console.log("[GC] candidates exists:",r.exists());const o={};r.exists()&&r.forEach(l=>{const c=l.val();console.log("[GC] candidate",l.key,"at:",c==null?void 0:c.at,"type:",typeof(c==null?void 0:c.at)),typeof(c==null?void 0:c.at)=="number"&&c.at<=s&&(o[`timerClaims/${l.key}`]=null)});const a=Object.keys(o).length;console.log("[GC] toDelete:",a),a&&(await qe(A(n),o),console.log("[GC] deleted:",a))}async function zT(n,e){var g;try{await qT(n,5*60*1e3)}catch(y){S("GC timerClaims fehlgeschlagen:",y)}const s=(await Z(A(n,"timer"))).val()||{},{startTime:i,duration:r}=s;if(typeof i!="number"||typeof r!="number")return!1;const o=Zd(i,r),a=A(n,`timerClaims/${o}`),l=mo(),c=await ji(a,y=>y&&y.claimed?y:{claimed:!0,by:l,at:En()},{applyLocally:!1}),u=c.committed,h=(g=c.snapshot)==null?void 0:g.val();return u&&h&&h.by===l?(await e(s),!0):!1}function KT(){S("Bereits von anderem Gerät erledigt.")}function GT(){Z(A(R,"timer")).then(n=>{if(!n.exists())return;const e=n.val(),t=document.getElementById("timerDurationInput"),s=document.getElementById("timerDurationInput2");!t||!s||(e&&typeof e.durationInput=="number"?t.value=Math.floor(e.durationInput/60):t.value=25,e&&typeof e.durationInput2=="number"?s.value=Math.floor(e.durationInput2/60):s.value=5)})}const ef=document.createElement("style");ef.innerHTML=`
@keyframes blinker {
  50% { opacity: 0; }
}
`;document.head.appendChild(ef);async function tf(){return(await Z(A(R,"timer"))).val()||{}}function nf(n){const{startTime:e,duration:t}=n||{};return typeof e=="number"&&typeof t=="number"&&e+t*1e3>Date.now()}async function sf(){try{const n=await tf();if(nf(n))return S("Timer wurde in der Zwischenzeit verlängert - Abbruch vor dem Schreiben."),!0}catch(n){return S("Zweiter Timer-Check fehlgeschlagen:",n),!0}return!1}function rf(n){Ht("Mister X hat sich gezeigt!","Automatische Standort-Übermittlung",["agent","settings","start"]),qd(),n!=null?gn(n):S("durationInput2 war nicht vorhanden - Timer wird nicht neu gestartet.")}async function Lr(n){const t=(prompt("Bitte den Standort beschreiben (bzw. wenn U-Bahn, dann gemäß Regelwerk angeben):")||"").trim();return!t||await sf()?!1:(await $i(A(R,"locations"),{description:t,timestamp:Date.now()}),rf(n),!0)}async function JT({autoRetry:n=!0,maxRetries:e=3,retryDelayMs:t=1e4}={}){let s;try{const u=await tf();if(s=u.durationInput2,nf(u)){S("Timer wurde verlängert – Abbruch.");return}}catch(u){S("Timer lesen fehlgeschlagen:",u);return}if(!("geolocation"in navigator)){document.getElementById("status").innerText="Geolocation wird nicht unterstützt.",await Lr(s);return}let i=Math.max(0,e),r=!1;const o={enableHighAccuracy:!0,maximumAge:0,timeout:15e3},a=async u=>{if(await sf())return;const{latitude:h,longitude:d,accuracy:g}=u.coords,y=Date.now();if(g>100){document.getElementById("status").innerText="⚠️ Standort ungenau (±"+Math.round(g)+" m). Bitte Standortbeschreibung manuell eingeben.",await Lr(s);return}await $i(A(R,"locations"),{title:"Automatischer Standort",lat:h,lon:d,timestamp:y}),rf(s)},l=()=>{!n||i<=0||(i--,setTimeout(()=>{navigator.geolocation.getCurrentPosition(a,c,o)},t))},c=async u=>{let h="❌ Fehler beim Abrufen des Standorts.";switch(u.code){case u.PERMISSION_DENIED:h+=" Zugriff verweigert.";break;case u.POSITION_UNAVAILABLE:h+=" Standortinformationen nicht verfügbar.";break;case u.TIMEOUT:h+=" Zeitüberschreitung bei der Standortabfrage.";break}h+=" Bitte erneut versuchen oder Standortbeschreibung manuell eingeben.",document.getElementById("status").innerText=h,r||(r=!0,await Lr(s)),(u.code===u.TIMEOUT||u.code===u.POSITION_UNAVAILABLE)&&l()};navigator.geolocation.getCurrentPosition(a,c,o)}function Sn(n){const e=document.getElementById("startTimerButton");e&&(e.disabled=n,e.style.opacity=n?"0.5":"1",e.style.pointerEvents=n?"none":"auto",e.style.cursor=n?"default":"pointer")}function YT(){localStorage.getItem("nachrichtAktiv")?(document.getElementById("permissionButton").style.display="none",document.getElementById("permissionButton2").style.display="block"):(document.getElementById("permissionButton").style.display="block",document.getElementById("permissionButton2").style.display="none")}async function QT(){if(confirm("Möchtest du wirklich alle gespeicherten Standorte löschen?"))try{await _e(A(R,"locations")),alert("Alle Standorte wurden gelöscht."),xE=[];const n=document.getElementById("status");n&&(n.innerText=""),await ST(!0),pi()}catch(n){S(n),alert("Fehler beim Löschen der Standorte.")}}async function XT(){await _e(A(R,"timer/duration")),await _e(A(R,"timer/startTime")),await _e(A(R,"timerMessage")),clearInterval(wt),Sn(!1);try{await Ke.rpc("cancel_and_unschedule")}catch(s){S("[Timer] cancel_and_unschedule fehlgeschlagen (ignoriere und fahre fort):",s)}const n=document.getElementById("timer"),e=document.getElementById("agentTimer"),t=document.getElementById("settingsTimer");n&&(n.innerText="⏳ Zeit bis zum nächsten Posten: --:--"),e&&(e.innerText="⏳ Mister X Timer: --:--"),t&&(t.innerText="⏳ Aktueller Timer: --:--"),Ht("Timer zurückgesetzt","Der Timer wurde zurückgesetzt!","all")}function ZT(){const n=document.getElementById("max_Team_X").value;_e(A(R,"settings/max_Team_X")).then(()=>Re(A(R,"settings/max_Team_X"),Number(n))).then(()=>{S("max_Team_X erfolgreich gespeichert:",n)}).catch(e=>{S("Fehler beim Speichern von max_Team_X:",e)})}function eS(){const n=document.getElementById("max_Team_X");Z(A(R,"settings/max_Team_X")).then(e=>{e.exists()?(n.value=e.val(),S("max_Team_X geladen:",e.val())):S("Kein max_Team_X-Wert gefunden.")}).catch(e=>{S("Fehler beim Laden von max_Team_X:",e)})}function tS(){const e=document.getElementById("timerDurationInput").value*60;_e(A(R,"timer/durationInput")).then(()=>Re(A(R,"timer/durationInput"),Number(e))).then(()=>{S("Duration_input:",e)}).catch(t=>{S("Fehler beim Speichern von DurationInput:",t)})}function nS(){const e=document.getElementById("timerDurationInput2").value*60;_e(A(R,"timer/durationInput2")).then(()=>Re(A(R,"timer/durationInput2"),Number(e))).then(()=>{S("Duration_input2:",e)}).catch(t=>{S("Fehler beim Speichern von DurationInput2:",t)})}async function sS(){if(!("serviceWorker"in navigator))throw new Error("Service Worker wird vom Browser nicht unterstützt.");const n="/Mister-X/",e=await navigator.serviceWorker.getRegistration(n);if(e)return e;const t=`${n}firebase-messaging-sw.js`;return navigator.serviceWorker.register(t,{scope:n,type:"module"})}function iS(){var n,e;return((n=window.matchMedia)==null?void 0:n.call(window,"(display-mode: standalone)").matches)||((e=window.navigator)==null?void 0:e.standalone)===!0}async function rS(){const n={notificationsAPI:"Notification"in window,serviceWorker:"serviceWorker"in navigator,pushManager:"PushManager"in window,standalone:iS(),fcm:!1};try{n.fcm=await Wi()}catch{n.fcm=!1}return n}async function Bc(n){!n||!H||await Re(A(R,`notifications/${n}/recipients/${H}`),!0)}function Uc(n){try{const e=n&&n.messageId;if(e){if(hi.has(e))return;hi.add(e)}if(e&&typeof Bc=="function"&&Bc(e).catch(t=>S("Markieren fehlgeschlagen:",t)),document.visibilityState==="visible"){const t=n&&n.title?n.title:"Nachricht",s=n&&n.body?n.body:"";alert(`${t}
${s}`)}}catch(e){S("handleInAppMessage error:",e)}}setInterval(()=>{hi.size>5e3&&hi.clear()},60*1e3);async function oS(){var n,e,t,s,i,r;HE();try{const o=await rS();if(o&&o.fcm){He||(He=Hi(Ct)),window.__swMsgListenerAdded||(navigator.serviceWorker.addEventListener("message",g=>{if(g&&g.data&&g.data.type==="PUSH"){const y=g.data.payload||{};Uc(y),S("[Page] SW-Message empfangen",y)}}),window.__swMsgListenerAdded=!0);let d=null;Pv(He,g=>{const y=g&&g.data?g.data:{};y.messageId&&y.messageId===d||(d=y.messageId||null,Uc(y),S("[Page] FCM onMessage empfangen",g))})}navigator.serviceWorker.addEventListener("message",d=>{var g;((g=d==null?void 0:d.data)==null?void 0:g.type)==="PUSH_SUBSCRIPTION_CHANGED"&&Pr({force:!0}).catch(S)}),(async()=>await BE("pushSubscriptionChangedAt")&&(await Pr({force:!0}).catch(S),await UE("pushSubscriptionChangedAt")))();const a=document.getElementById("enablePush"),l=document.getElementById("pushHint");a&&(!o.fcm&&/iPhone|iPad|iPod/i.test(navigator.userAgent)&&!o.standalone?(a.style.display="none",l&&(l.textContent="Installiere die App zum Home-Bildschirm, um Benachrichtigungen zu aktivieren.",l.style.display="block")):!o.fcm||!o.notificationsAPI||!o.serviceWorker||!o.pushManager?(a.style.display="none",l&&(l.textContent="Benachrichtigungen werden von diesem Browser/Modus nicht unterstützt.",l.style.display="block")):Notification.permission==="granted"?(a.textContent="Benachrichtigungen sind aktiv",a.disabled=!0):(a.addEventListener("click",enablePush,{once:!0}),a.style.display="inline-flex"));const c=localStorage.getItem("activeView")||"start";c!=="start"&&Qd(c),qd(),await vT(),HT(),GT(),YT(),Pr(),OT(),hT(),_T(),Na(),LT(),await CT(),AT(),ET(),bT();const u=document.getElementById("toggleAgentLocations");u&&(u.checked=$s,u.addEventListener("change",()=>{$s=!!u.checked;try{localStorage.setItem(Fd,$s?"1":"0")}catch{}Yd()})),(n=document.getElementById("toggleTracking"))==null||n.addEventListener("change",d=>{d.target.checked?cT():zd()}),(e=document.getElementById("toggleFollow"))==null||e.addEventListener("change",d=>{Ld=d.target.checked});const h=document.getElementById("photoInput");h&&h.addEventListener("change",function(){var g;if((g=this.files)==null?void 0:g[0]){window.fotoHochgeladen=!0;const y=document.getElementById("status");y&&(y.innerText="📸 Foto ausgewählt!")}})}catch(o){alert("Fehler in startScript: "+((o==null?void 0:o.message)??String(o))),(s=(t=document.getElementById("startView"))==null?void 0:t.style)==null||s.setProperty("display","block"),(r=(i=document.getElementById("startView2"))==null?void 0:i.style)==null||r.setProperty("display","block")}}function S(...n){console.log(...n);const e=document.getElementById("settingsLog");if(!e)return;const t=new Date().toLocaleTimeString(),s=document.createElement("div");s.innerHTML=`<strong>[${t}]</strong>`,n.forEach(i=>{if(typeof i=="object"){const r=document.createElement("details"),o=document.createElement("summary");o.textContent="Objekt anzeigen",r.appendChild(o);const a=document.createElement("pre");a.textContent=JSON.stringify(i,null,2),r.appendChild(a),s.appendChild(r)}else s.innerHTML+=` ${i}`}),e.appendChild(s),e.scrollTop=e.scrollHeight}window.switchView=Qd;window.requestPermission=FE;window.sendLocationWithPhoto=GE;window.startTimer=gn;window.goBack=To;window.save_timer_duration=tS;window.save_timer_duration2=nS;window.save_max_mister_x=ZT;window.resetTimer=XT;window.deleteAllLocations=QT;window.resetAllMisterXRollen=UT;window.removeNotificationSetup=VE;window.mxState=window.mxState||{};window.mxState.selectedPost=null;window.openTeamSettings=sT;window.closeTeamSettings=iT;window.leaveTeam=xa;window.createTeam=rT;window.joinTeam=oT;window.triggerAgentLocationRequest=NT;window.resetAgentLocations=DT;function of(n){window.mxState.selectedPost=n}function aS(){return window.mxState.selectedPost}document.addEventListener("DOMContentLoaded",oS);
