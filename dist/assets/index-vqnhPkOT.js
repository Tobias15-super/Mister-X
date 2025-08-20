(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();const hd=()=>{};var ha={};/**
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
 */const dc={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
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
 */const I=function(n,e){if(!n)throw gn(e)},gn=function(n){return new Error("Firebase Database ("+dc.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
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
 */const fc=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let i=n.charCodeAt(s);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&s+1<n.length&&(n.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++s)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},dd=function(n){const e=[];let t=0,s=0;for(;t<n.length;){const i=n[t++];if(i<128)e[s++]=String.fromCharCode(i);else if(i>191&&i<224){const r=n[t++];e[s++]=String.fromCharCode((i&31)<<6|r&63)}else if(i>239&&i<365){const r=n[t++],o=n[t++],a=n[t++],l=((i&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(l>>10)),e[s++]=String.fromCharCode(56320+(l&1023))}else{const r=n[t++],o=n[t++];e[s++]=String.fromCharCode((i&15)<<12|(r&63)<<6|o&63)}}return e.join("")},eo={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let i=0;i<n.length;i+=3){const r=n[i],o=i+1<n.length,a=o?n[i+1]:0,l=i+2<n.length,c=l?n[i+2]:0,u=r>>2,h=(r&3)<<4|a>>4;let d=(a&15)<<2|c>>6,_=c&63;l||(_=64,o||(d=64)),s.push(t[u],t[h],t[d],t[_])}return s.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(fc(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):dd(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<n.length;){const r=t[n.charAt(i++)],a=i<n.length?t[n.charAt(i)]:0;++i;const c=i<n.length?t[n.charAt(i)]:64;++i;const h=i<n.length?t[n.charAt(i)]:64;if(++i,r==null||a==null||c==null||h==null)throw new fd;const d=r<<2|a>>4;if(s.push(d),c!==64){const _=a<<4&240|c>>2;if(s.push(_),h!==64){const w=c<<6&192|h;s.push(w)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class fd extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const pc=function(n){const e=fc(n);return eo.encodeByteArray(e,!0)},xs=function(n){return pc(n).replace(/\./g,"")},yr=function(n){try{return eo.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function pd(n){return gc(void 0,n)}function gc(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!gd(t)||(n[t]=gc(n[t],e[t]));return n}function gd(n){return n!=="__proto__"}/**
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
 */function md(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const _d=()=>md().__FIREBASE_DEFAULTS__,yd=()=>{if(typeof process>"u"||typeof ha>"u")return;const n=ha.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},vd=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&yr(n[1]);return e&&JSON.parse(e)},mc=()=>{try{return hd()||_d()||yd()||vd()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},wd=n=>{var e,t;return(t=(e=mc())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},_c=n=>{const e=wd(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),s]:[e.substring(0,t),s]},yc=()=>{var n;return(n=mc())==null?void 0:n.config};/**
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
 */let mn=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,s)=>{t?this.reject(t):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,s))}}};/**
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
 */function ci(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function vc(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function wc(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},s=e||"demo-project",i=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${s}`,aud:s,iat:i,exp:i+3600,auth_time:i,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...n};return[xs(JSON.stringify(t)),xs(JSON.stringify(o)),""].join(".")}const Nn={};function bd(){const n={prod:[],emulator:[]};for(const e of Object.keys(Nn))Nn[e]?n.emulator.push(e):n.prod.push(e);return n}function Sd(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let da=!1;function bc(n,e){if(typeof window>"u"||typeof document>"u"||!ci(window.location.host)||Nn[n]===e||Nn[n]||da)return;Nn[n]=e;function t(d){return`__firebase__banner__${d}`}const s="__firebase__banner",r=bd().prod.length>0;function o(){const d=document.getElementById(s);d&&d.remove()}function a(d){d.style.display="flex",d.style.background="#7faaf0",d.style.position="fixed",d.style.bottom="5px",d.style.left="5px",d.style.padding=".5em",d.style.borderRadius="5px",d.style.alignItems="center"}function l(d,_){d.setAttribute("width","24"),d.setAttribute("id",_),d.setAttribute("height","24"),d.setAttribute("viewBox","0 0 24 24"),d.setAttribute("fill","none"),d.style.marginLeft="-6px"}function c(){const d=document.createElement("span");return d.style.cursor="pointer",d.style.marginLeft="16px",d.style.fontSize="24px",d.innerHTML=" &times;",d.onclick=()=>{da=!0,o()},d}function u(d,_){d.setAttribute("id",_),d.innerText="Learn more",d.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",d.setAttribute("target","__blank"),d.style.paddingLeft="5px",d.style.textDecoration="underline"}function h(){const d=Sd(s),_=t("text"),w=document.getElementById(_)||document.createElement("span"),E=t("learnmore"),S=document.getElementById(E)||document.createElement("a"),R=t("preprendIcon"),j=document.getElementById(R)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(d.created){const k=d.element;a(k),u(S,E);const O=c();l(j,R),k.append(j,w,S,O),document.body.appendChild(k)}r?(w.innerText="Preview backend disconnected.",j.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(j.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,w.innerText="Preview backend running in this workspace."),w.setAttribute("id",_)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",h):h()}/**
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
 */function Ed(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Sc(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ed())}function Td(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Id(){return dc.NODE_ADMIN===!0}function Ec(){try{return typeof indexedDB=="object"}catch{return!1}}function Tc(){return new Promise((n,e)=>{try{let t=!0;const s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(s),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var r;e(((r=i.error)==null?void 0:r.message)||"")}}catch(t){e(t)}})}function kd(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
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
 */const Cd="FirebaseError";class _t extends Error{constructor(e,t,s){super(t),this.code=e,this.customData=s,this.name=Cd,Object.setPrototypeOf(this,_t.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ui.prototype.create)}}class ui{constructor(e,t,s){this.service=e,this.serviceName=t,this.errors=s}create(e,...t){const s=t[0]||{},i=`${this.service}/${e}`,r=this.errors[e],o=r?Ad(r,s):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new _t(i,a,s)}}function Ad(n,e){return n.replace(Rd,(t,s)=>{const i=e[s];return i!=null?String(i):`<${s}?>`})}const Rd=/\{\$([^}]+)}/g;/**
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
 */function qn(n){return JSON.parse(n)}function ne(n){return JSON.stringify(n)}/**
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
 */const Ic=function(n){let e={},t={},s={},i="";try{const r=n.split(".");e=qn(yr(r[0])||""),t=qn(yr(r[1])||""),i=r[2],s=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:s,signature:i}},Pd=function(n){const e=Ic(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},Od=function(n){const e=Ic(n).claims;return typeof e=="object"&&e.admin===!0};/**
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
 */function De(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function Lt(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function fa(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Ds(n,e,t){const s={};for(const i in n)Object.prototype.hasOwnProperty.call(n,i)&&(s[i]=e.call(t,n[i],i,n));return s}function Ls(n,e){if(n===e)return!0;const t=Object.keys(n),s=Object.keys(e);for(const i of t){if(!s.includes(i))return!1;const r=n[i],o=e[i];if(pa(r)&&pa(o)){if(!Ls(r,o))return!1}else if(r!==o)return!1}for(const i of s)if(!t.includes(i))return!1;return!0}function pa(n){return n!==null&&typeof n=="object"}/**
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
 */function Nd(n){const e=[];for(const[t,s]of Object.entries(n))Array.isArray(s)?s.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}/**
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
 */class xd{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const s=this.W_;if(typeof e=="string")for(let h=0;h<16;h++)s[h]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let h=0;h<16;h++)s[h]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let h=16;h<80;h++){const d=s[h-3]^s[h-8]^s[h-14]^s[h-16];s[h]=(d<<1|d>>>31)&4294967295}let i=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,u;for(let h=0;h<80;h++){h<40?h<20?(c=a^r&(o^a),u=1518500249):(c=r^o^a,u=1859775393):h<60?(c=r&o|a&(r|o),u=2400959708):(c=r^o^a,u=3395469782);const d=(i<<5|i>>>27)+c+l+u+s[h]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=i,i=d}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const s=t-this.blockSize;let i=0;const r=this.buf_;let o=this.inbuf_;for(;i<t;){if(o===0)for(;i<=s;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<t;)if(r[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}else for(;i<t;)if(r[o]=e[i],++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=t&255,t/=256;this.compress_(this.buf_);let s=0;for(let i=0;i<5;i++)for(let r=24;r>=0;r-=8)e[s]=this.chain_[i]>>r&255,++s;return e}}function hi(n,e){return`${n} failed: ${e} argument `}/**
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
 */const Dd=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let i=n.charCodeAt(s);if(i>=55296&&i<=56319){const r=i-55296;s++,I(s<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(s)-56320;i=65536+(r<<10)+o}i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):i<65536?(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},di=function(n){let e=0;for(let t=0;t<n.length;t++){const s=n.charCodeAt(t);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,t++):e+=3}return e};/**
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
 */function ve(n){return n&&n._delegate?n._delegate:n}class xe{constructor(e,t,s){this.name=e,this.instanceFactory=t,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Et="[DEFAULT]";/**
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
 */class Ld{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const s=new mn;if(this.instancesDeferred.set(t,s),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&s.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if($d(e))try{this.getOrInitializeService({instanceIdentifier:Et})}catch{}for(const[t,s]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:i});s.resolve(r)}catch{}}}}clearInstance(e=Et){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Et){return this.instances.has(e)}getOptions(e=Et){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:s,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);s===a&&o.resolve(i)}return i}onInit(e,t){const s=this.normalizeInstanceIdentifier(t),i=this.onInitCallbacks.get(s)??new Set;i.add(e),this.onInitCallbacks.set(s,i);const r=this.instances.get(s);return r&&e(r,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const s=this.onInitCallbacks.get(t);if(s)for(const i of s)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Md(e),options:t}),this.instances.set(e,s),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=Et){return this.component?this.component.multipleInstances?e:Et:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Md(n){return n===Et?void 0:n}function $d(n){return n.instantiationMode==="EAGER"}/**
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
 */class jd{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Ld(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var q;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(q||(q={}));const Fd={debug:q.DEBUG,verbose:q.VERBOSE,info:q.INFO,warn:q.WARN,error:q.ERROR,silent:q.SILENT},Bd=q.INFO,Ud={[q.DEBUG]:"log",[q.VERBOSE]:"log",[q.INFO]:"info",[q.WARN]:"warn",[q.ERROR]:"error"},Wd=(n,e,...t)=>{if(e<n.logLevel)return;const s=new Date().toISOString(),i=Ud[e];if(i)console[i](`[${s}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class to{constructor(e){this.name=e,this._logLevel=Bd,this._logHandler=Wd,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in q))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Fd[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,q.DEBUG,...e),this._logHandler(this,q.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,q.VERBOSE,...e),this._logHandler(this,q.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,q.INFO,...e),this._logHandler(this,q.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,q.WARN,...e),this._logHandler(this,q.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,q.ERROR,...e),this._logHandler(this,q.ERROR,...e)}}const Vd=(n,e)=>e.some(t=>n instanceof t);let ga,ma;function qd(){return ga||(ga=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Hd(){return ma||(ma=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const kc=new WeakMap,vr=new WeakMap,Cc=new WeakMap,Ui=new WeakMap,no=new WeakMap;function zd(n){const e=new Promise((t,s)=>{const i=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(Qe(n.result)),i()},o=()=>{s(n.error),i()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&kc.set(t,n)}).catch(()=>{}),no.set(e,n),e}function Kd(n){if(vr.has(n))return;const e=new Promise((t,s)=>{const i=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),i()},o=()=>{s(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});vr.set(n,e)}let wr={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return vr.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Cc.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Qe(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Gd(n){wr=n(wr)}function Jd(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const s=n.call(Wi(this),e,...t);return Cc.set(s,e.sort?e.sort():[e]),Qe(s)}:Hd().includes(n)?function(...e){return n.apply(Wi(this),e),Qe(kc.get(this))}:function(...e){return Qe(n.apply(Wi(this),e))}}function Yd(n){return typeof n=="function"?Jd(n):(n instanceof IDBTransaction&&Kd(n),Vd(n,qd())?new Proxy(n,wr):n)}function Qe(n){if(n instanceof IDBRequest)return zd(n);if(Ui.has(n))return Ui.get(n);const e=Yd(n);return e!==n&&(Ui.set(n,e),no.set(e,n)),e}const Wi=n=>no.get(n);function fi(n,e,{blocked:t,upgrade:s,blocking:i,terminated:r}={}){const o=indexedDB.open(n,e),a=Qe(o);return s&&o.addEventListener("upgradeneeded",l=>{s(Qe(o.result),l.oldVersion,l.newVersion,Qe(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),i&&l.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}function Vi(n,{blocked:e}={}){const t=indexedDB.deleteDatabase(n);return e&&t.addEventListener("blocked",s=>e(s.oldVersion,s)),Qe(t).then(()=>{})}const Qd=["get","getKey","getAll","getAllKeys","count"],Xd=["put","add","delete","clear"],qi=new Map;function _a(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(qi.get(e))return qi.get(e);const t=e.replace(/FromIndex$/,""),s=e!==t,i=Xd.includes(t);if(!(t in(s?IDBIndex:IDBObjectStore).prototype)||!(i||Qd.includes(t)))return;const r=async function(o,...a){const l=this.transaction(o,i?"readwrite":"readonly");let c=l.store;return s&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),i&&l.done]))[0]};return qi.set(e,r),r}Gd(n=>({...n,get:(e,t,s)=>_a(e,t)||n.get(e,t,s),has:(e,t)=>!!_a(e,t)||n.has(e,t)}));/**
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
 */class Zd{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(ef(t)){const s=t.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(t=>t).join(" ")}}function ef(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const br="@firebase/app",ya="0.14.1";/**
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
 */const et=new to("@firebase/app"),tf="@firebase/app-compat",nf="@firebase/analytics-compat",sf="@firebase/analytics",rf="@firebase/app-check-compat",of="@firebase/app-check",af="@firebase/auth",lf="@firebase/auth-compat",cf="@firebase/database",uf="@firebase/data-connect",hf="@firebase/database-compat",df="@firebase/functions",ff="@firebase/functions-compat",pf="@firebase/installations",gf="@firebase/installations-compat",mf="@firebase/messaging",_f="@firebase/messaging-compat",yf="@firebase/performance",vf="@firebase/performance-compat",wf="@firebase/remote-config",bf="@firebase/remote-config-compat",Sf="@firebase/storage",Ef="@firebase/storage-compat",Tf="@firebase/firestore",If="@firebase/ai",kf="@firebase/firestore-compat",Cf="firebase",Af="12.1.0";/**
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
 */const Sr="[DEFAULT]",Rf={[br]:"fire-core",[tf]:"fire-core-compat",[sf]:"fire-analytics",[nf]:"fire-analytics-compat",[of]:"fire-app-check",[rf]:"fire-app-check-compat",[af]:"fire-auth",[lf]:"fire-auth-compat",[cf]:"fire-rtdb",[uf]:"fire-data-connect",[hf]:"fire-rtdb-compat",[df]:"fire-fn",[ff]:"fire-fn-compat",[pf]:"fire-iid",[gf]:"fire-iid-compat",[mf]:"fire-fcm",[_f]:"fire-fcm-compat",[yf]:"fire-perf",[vf]:"fire-perf-compat",[wf]:"fire-rc",[bf]:"fire-rc-compat",[Sf]:"fire-gcs",[Ef]:"fire-gcs-compat",[Tf]:"fire-fst",[kf]:"fire-fst-compat",[If]:"fire-vertex","fire-js":"fire-js",[Cf]:"fire-js-all"};/**
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
 */const Ms=new Map,Pf=new Map,Er=new Map;function va(n,e){try{n.container.addComponent(e)}catch(t){et.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Fe(n){const e=n.name;if(Er.has(e))return et.debug(`There were multiple attempts to register component ${e}.`),!1;Er.set(e,n);for(const t of Ms.values())va(t,n);for(const t of Pf.values())va(t,n);return!0}function rs(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function so(n){return n==null?!1:n.settings!==void 0}/**
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
 */const Of={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},at=new ui("app","Firebase",Of);/**
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
 */class Nf{constructor(e,t,s){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new xe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw at.create("app-deleted",{appName:this._name})}}/**
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
 */const io=Af;function Ac(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const s={name:Sr,automaticDataCollectionEnabled:!0,...e},i=s.name;if(typeof i!="string"||!i)throw at.create("bad-app-name",{appName:String(i)});if(t||(t=yc()),!t)throw at.create("no-options");const r=Ms.get(i);if(r){if(Ls(t,r.options)&&Ls(s,r.config))return r;throw at.create("duplicate-app",{appName:i})}const o=new jd(i);for(const l of Er.values())o.addComponent(l);const a=new Nf(t,s,o);return Ms.set(i,a),a}function ro(n=Sr){const e=Ms.get(n);if(!e&&n===Sr&&yc())return Ac();if(!e)throw at.create("no-app",{appName:n});return e}function ye(n,e,t){let s=Rf[n]??n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),r=e.match(/\s|\//);if(i||r){const o=[`Unable to register library "${s}" with version "${e}":`];i&&o.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),et.warn(o.join(" "));return}Fe(new xe(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const xf="firebase-heartbeat-database",Df=1,Hn="firebase-heartbeat-store";let Hi=null;function Rc(){return Hi||(Hi=fi(xf,Df,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Hn)}catch(t){console.warn(t)}}}}).catch(n=>{throw at.create("idb-open",{originalErrorMessage:n.message})})),Hi}async function Lf(n){try{const t=(await Rc()).transaction(Hn),s=await t.objectStore(Hn).get(Pc(n));return await t.done,s}catch(e){if(e instanceof _t)et.warn(e.message);else{const t=at.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});et.warn(t.message)}}}async function wa(n,e){try{const s=(await Rc()).transaction(Hn,"readwrite");await s.objectStore(Hn).put(e,Pc(n)),await s.done}catch(t){if(t instanceof _t)et.warn(t.message);else{const s=at.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});et.warn(s.message)}}}function Pc(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Mf=1024,$f=30;class jf{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Bf(t),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=ba();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:i}),this._heartbeatsCache.heartbeats.length>$f){const o=Uf(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){et.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=ba(),{heartbeatsToSend:s,unsentEntries:i}=Ff(this._heartbeatsCache.heartbeats),r=xs(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(t){return et.warn(t),""}}}function ba(){return new Date().toISOString().substring(0,10)}function Ff(n,e=Mf){const t=[];let s=n.slice();for(const i of n){const r=t.find(o=>o.agent===i.agent);if(r){if(r.dates.push(i.date),Sa(t)>e){r.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Sa(t)>e){t.pop();break}s=s.slice(1)}return{heartbeatsToSend:t,unsentEntries:s}}class Bf{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ec()?Tc().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Lf(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return wa(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return wa(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Sa(n){return xs(JSON.stringify({version:2,heartbeats:n})).length}function Uf(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let s=1;s<n.length;s++)n[s].date<t&&(t=n[s].date,e=s);return e}/**
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
 */function Wf(n){Fe(new xe("platform-logger",e=>new Zd(e),"PRIVATE")),Fe(new xe("heartbeat",e=>new jf(e),"PRIVATE")),ye(br,ya,n),ye(br,ya,"esm2020"),ye("fire-js","")}Wf("");var Vf="firebase",qf="12.1.0";/**
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
 */ye(Vf,qf,"app");var Ea=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Oc;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(m,f){function g(){}g.prototype=f.prototype,m.D=f.prototype,m.prototype=new g,m.prototype.constructor=m,m.C=function(y,v,b){for(var p=Array(arguments.length-2),wt=2;wt<arguments.length;wt++)p[wt-2]=arguments[wt];return f.prototype[v].apply(y,p)}}function t(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(s,t),s.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(m,f,g){g||(g=0);var y=Array(16);if(typeof f=="string")for(var v=0;16>v;++v)y[v]=f.charCodeAt(g++)|f.charCodeAt(g++)<<8|f.charCodeAt(g++)<<16|f.charCodeAt(g++)<<24;else for(v=0;16>v;++v)y[v]=f[g++]|f[g++]<<8|f[g++]<<16|f[g++]<<24;f=m.g[0],g=m.g[1],v=m.g[2];var b=m.g[3],p=f+(b^g&(v^b))+y[0]+3614090360&4294967295;f=g+(p<<7&4294967295|p>>>25),p=b+(v^f&(g^v))+y[1]+3905402710&4294967295,b=f+(p<<12&4294967295|p>>>20),p=v+(g^b&(f^g))+y[2]+606105819&4294967295,v=b+(p<<17&4294967295|p>>>15),p=g+(f^v&(b^f))+y[3]+3250441966&4294967295,g=v+(p<<22&4294967295|p>>>10),p=f+(b^g&(v^b))+y[4]+4118548399&4294967295,f=g+(p<<7&4294967295|p>>>25),p=b+(v^f&(g^v))+y[5]+1200080426&4294967295,b=f+(p<<12&4294967295|p>>>20),p=v+(g^b&(f^g))+y[6]+2821735955&4294967295,v=b+(p<<17&4294967295|p>>>15),p=g+(f^v&(b^f))+y[7]+4249261313&4294967295,g=v+(p<<22&4294967295|p>>>10),p=f+(b^g&(v^b))+y[8]+1770035416&4294967295,f=g+(p<<7&4294967295|p>>>25),p=b+(v^f&(g^v))+y[9]+2336552879&4294967295,b=f+(p<<12&4294967295|p>>>20),p=v+(g^b&(f^g))+y[10]+4294925233&4294967295,v=b+(p<<17&4294967295|p>>>15),p=g+(f^v&(b^f))+y[11]+2304563134&4294967295,g=v+(p<<22&4294967295|p>>>10),p=f+(b^g&(v^b))+y[12]+1804603682&4294967295,f=g+(p<<7&4294967295|p>>>25),p=b+(v^f&(g^v))+y[13]+4254626195&4294967295,b=f+(p<<12&4294967295|p>>>20),p=v+(g^b&(f^g))+y[14]+2792965006&4294967295,v=b+(p<<17&4294967295|p>>>15),p=g+(f^v&(b^f))+y[15]+1236535329&4294967295,g=v+(p<<22&4294967295|p>>>10),p=f+(v^b&(g^v))+y[1]+4129170786&4294967295,f=g+(p<<5&4294967295|p>>>27),p=b+(g^v&(f^g))+y[6]+3225465664&4294967295,b=f+(p<<9&4294967295|p>>>23),p=v+(f^g&(b^f))+y[11]+643717713&4294967295,v=b+(p<<14&4294967295|p>>>18),p=g+(b^f&(v^b))+y[0]+3921069994&4294967295,g=v+(p<<20&4294967295|p>>>12),p=f+(v^b&(g^v))+y[5]+3593408605&4294967295,f=g+(p<<5&4294967295|p>>>27),p=b+(g^v&(f^g))+y[10]+38016083&4294967295,b=f+(p<<9&4294967295|p>>>23),p=v+(f^g&(b^f))+y[15]+3634488961&4294967295,v=b+(p<<14&4294967295|p>>>18),p=g+(b^f&(v^b))+y[4]+3889429448&4294967295,g=v+(p<<20&4294967295|p>>>12),p=f+(v^b&(g^v))+y[9]+568446438&4294967295,f=g+(p<<5&4294967295|p>>>27),p=b+(g^v&(f^g))+y[14]+3275163606&4294967295,b=f+(p<<9&4294967295|p>>>23),p=v+(f^g&(b^f))+y[3]+4107603335&4294967295,v=b+(p<<14&4294967295|p>>>18),p=g+(b^f&(v^b))+y[8]+1163531501&4294967295,g=v+(p<<20&4294967295|p>>>12),p=f+(v^b&(g^v))+y[13]+2850285829&4294967295,f=g+(p<<5&4294967295|p>>>27),p=b+(g^v&(f^g))+y[2]+4243563512&4294967295,b=f+(p<<9&4294967295|p>>>23),p=v+(f^g&(b^f))+y[7]+1735328473&4294967295,v=b+(p<<14&4294967295|p>>>18),p=g+(b^f&(v^b))+y[12]+2368359562&4294967295,g=v+(p<<20&4294967295|p>>>12),p=f+(g^v^b)+y[5]+4294588738&4294967295,f=g+(p<<4&4294967295|p>>>28),p=b+(f^g^v)+y[8]+2272392833&4294967295,b=f+(p<<11&4294967295|p>>>21),p=v+(b^f^g)+y[11]+1839030562&4294967295,v=b+(p<<16&4294967295|p>>>16),p=g+(v^b^f)+y[14]+4259657740&4294967295,g=v+(p<<23&4294967295|p>>>9),p=f+(g^v^b)+y[1]+2763975236&4294967295,f=g+(p<<4&4294967295|p>>>28),p=b+(f^g^v)+y[4]+1272893353&4294967295,b=f+(p<<11&4294967295|p>>>21),p=v+(b^f^g)+y[7]+4139469664&4294967295,v=b+(p<<16&4294967295|p>>>16),p=g+(v^b^f)+y[10]+3200236656&4294967295,g=v+(p<<23&4294967295|p>>>9),p=f+(g^v^b)+y[13]+681279174&4294967295,f=g+(p<<4&4294967295|p>>>28),p=b+(f^g^v)+y[0]+3936430074&4294967295,b=f+(p<<11&4294967295|p>>>21),p=v+(b^f^g)+y[3]+3572445317&4294967295,v=b+(p<<16&4294967295|p>>>16),p=g+(v^b^f)+y[6]+76029189&4294967295,g=v+(p<<23&4294967295|p>>>9),p=f+(g^v^b)+y[9]+3654602809&4294967295,f=g+(p<<4&4294967295|p>>>28),p=b+(f^g^v)+y[12]+3873151461&4294967295,b=f+(p<<11&4294967295|p>>>21),p=v+(b^f^g)+y[15]+530742520&4294967295,v=b+(p<<16&4294967295|p>>>16),p=g+(v^b^f)+y[2]+3299628645&4294967295,g=v+(p<<23&4294967295|p>>>9),p=f+(v^(g|~b))+y[0]+4096336452&4294967295,f=g+(p<<6&4294967295|p>>>26),p=b+(g^(f|~v))+y[7]+1126891415&4294967295,b=f+(p<<10&4294967295|p>>>22),p=v+(f^(b|~g))+y[14]+2878612391&4294967295,v=b+(p<<15&4294967295|p>>>17),p=g+(b^(v|~f))+y[5]+4237533241&4294967295,g=v+(p<<21&4294967295|p>>>11),p=f+(v^(g|~b))+y[12]+1700485571&4294967295,f=g+(p<<6&4294967295|p>>>26),p=b+(g^(f|~v))+y[3]+2399980690&4294967295,b=f+(p<<10&4294967295|p>>>22),p=v+(f^(b|~g))+y[10]+4293915773&4294967295,v=b+(p<<15&4294967295|p>>>17),p=g+(b^(v|~f))+y[1]+2240044497&4294967295,g=v+(p<<21&4294967295|p>>>11),p=f+(v^(g|~b))+y[8]+1873313359&4294967295,f=g+(p<<6&4294967295|p>>>26),p=b+(g^(f|~v))+y[15]+4264355552&4294967295,b=f+(p<<10&4294967295|p>>>22),p=v+(f^(b|~g))+y[6]+2734768916&4294967295,v=b+(p<<15&4294967295|p>>>17),p=g+(b^(v|~f))+y[13]+1309151649&4294967295,g=v+(p<<21&4294967295|p>>>11),p=f+(v^(g|~b))+y[4]+4149444226&4294967295,f=g+(p<<6&4294967295|p>>>26),p=b+(g^(f|~v))+y[11]+3174756917&4294967295,b=f+(p<<10&4294967295|p>>>22),p=v+(f^(b|~g))+y[2]+718787259&4294967295,v=b+(p<<15&4294967295|p>>>17),p=g+(b^(v|~f))+y[9]+3951481745&4294967295,m.g[0]=m.g[0]+f&4294967295,m.g[1]=m.g[1]+(v+(p<<21&4294967295|p>>>11))&4294967295,m.g[2]=m.g[2]+v&4294967295,m.g[3]=m.g[3]+b&4294967295}s.prototype.u=function(m,f){f===void 0&&(f=m.length);for(var g=f-this.blockSize,y=this.B,v=this.h,b=0;b<f;){if(v==0)for(;b<=g;)i(this,m,b),b+=this.blockSize;if(typeof m=="string"){for(;b<f;)if(y[v++]=m.charCodeAt(b++),v==this.blockSize){i(this,y),v=0;break}}else for(;b<f;)if(y[v++]=m[b++],v==this.blockSize){i(this,y),v=0;break}}this.h=v,this.o+=f},s.prototype.v=function(){var m=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);m[0]=128;for(var f=1;f<m.length-8;++f)m[f]=0;var g=8*this.o;for(f=m.length-8;f<m.length;++f)m[f]=g&255,g/=256;for(this.u(m),m=Array(16),f=g=0;4>f;++f)for(var y=0;32>y;y+=8)m[g++]=this.g[f]>>>y&255;return m};function r(m,f){var g=a;return Object.prototype.hasOwnProperty.call(g,m)?g[m]:g[m]=f(m)}function o(m,f){this.h=f;for(var g=[],y=!0,v=m.length-1;0<=v;v--){var b=m[v]|0;y&&b==f||(g[v]=b,y=!1)}this.g=g}var a={};function l(m){return-128<=m&&128>m?r(m,function(f){return new o([f|0],0>f?-1:0)}):new o([m|0],0>m?-1:0)}function c(m){if(isNaN(m)||!isFinite(m))return h;if(0>m)return S(c(-m));for(var f=[],g=1,y=0;m>=g;y++)f[y]=m/g|0,g*=4294967296;return new o(f,0)}function u(m,f){if(m.length==0)throw Error("number format error: empty string");if(f=f||10,2>f||36<f)throw Error("radix out of range: "+f);if(m.charAt(0)=="-")return S(u(m.substring(1),f));if(0<=m.indexOf("-"))throw Error('number format error: interior "-" character');for(var g=c(Math.pow(f,8)),y=h,v=0;v<m.length;v+=8){var b=Math.min(8,m.length-v),p=parseInt(m.substring(v,v+b),f);8>b?(b=c(Math.pow(f,b)),y=y.j(b).add(c(p))):(y=y.j(g),y=y.add(c(p)))}return y}var h=l(0),d=l(1),_=l(16777216);n=o.prototype,n.m=function(){if(E(this))return-S(this).m();for(var m=0,f=1,g=0;g<this.g.length;g++){var y=this.i(g);m+=(0<=y?y:4294967296+y)*f,f*=4294967296}return m},n.toString=function(m){if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(w(this))return"0";if(E(this))return"-"+S(this).toString(m);for(var f=c(Math.pow(m,6)),g=this,y="";;){var v=O(g,f).g;g=R(g,v.j(f));var b=((0<g.g.length?g.g[0]:g.h)>>>0).toString(m);if(g=v,w(g))return b+y;for(;6>b.length;)b="0"+b;y=b+y}},n.i=function(m){return 0>m?0:m<this.g.length?this.g[m]:this.h};function w(m){if(m.h!=0)return!1;for(var f=0;f<m.g.length;f++)if(m.g[f]!=0)return!1;return!0}function E(m){return m.h==-1}n.l=function(m){return m=R(this,m),E(m)?-1:w(m)?0:1};function S(m){for(var f=m.g.length,g=[],y=0;y<f;y++)g[y]=~m.g[y];return new o(g,~m.h).add(d)}n.abs=function(){return E(this)?S(this):this},n.add=function(m){for(var f=Math.max(this.g.length,m.g.length),g=[],y=0,v=0;v<=f;v++){var b=y+(this.i(v)&65535)+(m.i(v)&65535),p=(b>>>16)+(this.i(v)>>>16)+(m.i(v)>>>16);y=p>>>16,b&=65535,p&=65535,g[v]=p<<16|b}return new o(g,g[g.length-1]&-2147483648?-1:0)};function R(m,f){return m.add(S(f))}n.j=function(m){if(w(this)||w(m))return h;if(E(this))return E(m)?S(this).j(S(m)):S(S(this).j(m));if(E(m))return S(this.j(S(m)));if(0>this.l(_)&&0>m.l(_))return c(this.m()*m.m());for(var f=this.g.length+m.g.length,g=[],y=0;y<2*f;y++)g[y]=0;for(y=0;y<this.g.length;y++)for(var v=0;v<m.g.length;v++){var b=this.i(y)>>>16,p=this.i(y)&65535,wt=m.i(v)>>>16,ua=m.i(v)&65535;g[2*y+2*v]+=p*ua,j(g,2*y+2*v),g[2*y+2*v+1]+=b*ua,j(g,2*y+2*v+1),g[2*y+2*v+1]+=p*wt,j(g,2*y+2*v+1),g[2*y+2*v+2]+=b*wt,j(g,2*y+2*v+2)}for(y=0;y<f;y++)g[y]=g[2*y+1]<<16|g[2*y];for(y=f;y<2*f;y++)g[y]=0;return new o(g,0)};function j(m,f){for(;(m[f]&65535)!=m[f];)m[f+1]+=m[f]>>>16,m[f]&=65535,f++}function k(m,f){this.g=m,this.h=f}function O(m,f){if(w(f))throw Error("division by zero");if(w(m))return new k(h,h);if(E(m))return f=O(S(m),f),new k(S(f.g),S(f.h));if(E(f))return f=O(m,S(f)),new k(S(f.g),f.h);if(30<m.g.length){if(E(m)||E(f))throw Error("slowDivide_ only works with positive integers.");for(var g=d,y=f;0>=y.l(m);)g=Z(g),y=Z(y);var v=B(g,1),b=B(y,1);for(y=B(y,2),g=B(g,2);!w(y);){var p=b.add(y);0>=p.l(m)&&(v=v.add(g),b=p),y=B(y,1),g=B(g,1)}return f=R(m,v.j(f)),new k(v,f)}for(v=h;0<=m.l(f);){for(g=Math.max(1,Math.floor(m.m()/f.m())),y=Math.ceil(Math.log(g)/Math.LN2),y=48>=y?1:Math.pow(2,y-48),b=c(g),p=b.j(f);E(p)||0<p.l(m);)g-=y,b=c(g),p=b.j(f);w(b)&&(b=d),v=v.add(b),m=R(m,p)}return new k(v,m)}n.A=function(m){return O(this,m).h},n.and=function(m){for(var f=Math.max(this.g.length,m.g.length),g=[],y=0;y<f;y++)g[y]=this.i(y)&m.i(y);return new o(g,this.h&m.h)},n.or=function(m){for(var f=Math.max(this.g.length,m.g.length),g=[],y=0;y<f;y++)g[y]=this.i(y)|m.i(y);return new o(g,this.h|m.h)},n.xor=function(m){for(var f=Math.max(this.g.length,m.g.length),g=[],y=0;y<f;y++)g[y]=this.i(y)^m.i(y);return new o(g,this.h^m.h)};function Z(m){for(var f=m.g.length+1,g=[],y=0;y<f;y++)g[y]=m.i(y)<<1|m.i(y-1)>>>31;return new o(g,m.h)}function B(m,f){var g=f>>5;f%=32;for(var y=m.g.length-g,v=[],b=0;b<y;b++)v[b]=0<f?m.i(b+g)>>>f|m.i(b+g+1)<<32-f:m.i(b+g);return new o(v,m.h)}s.prototype.digest=s.prototype.v,s.prototype.reset=s.prototype.s,s.prototype.update=s.prototype.u,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=c,o.fromString=u,Oc=o}).apply(typeof Ea<"u"?Ea:typeof self<"u"?self:typeof window<"u"?window:{});const Ta="4.9.0";/**
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
 */class be{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}be.UNAUTHENTICATED=new be(null),be.GOOGLE_CREDENTIALS=new be("google-credentials-uid"),be.FIRST_PARTY=new be("first-party-uid"),be.MOCK_USER=new be("mock-user");/**
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
 */let pi="12.0.0";/**
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
 */const $s=new to("@firebase/firestore");function Hf(n,...e){if($s.logLevel<=q.DEBUG){const t=e.map(Nc);$s.debug(`Firestore (${pi}): ${n}`,...t)}}function zf(n,...e){if($s.logLevel<=q.ERROR){const t=e.map(Nc);$s.error(`Firestore (${pi}): ${n}`,...t)}}function Nc(n){if(typeof n=="string")return n;try{/**
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
 */function Ia(n,e,t){let s="Unexpected state";typeof e=="string"?s=e:t=e,xc(n,s,t)}function xc(n,e,t){let s=`FIRESTORE (${pi}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{s+=" CONTEXT: "+JSON.stringify(t)}catch{s+=" CONTEXT: "+t}throw zf(s),new Error(s)}function Dc(n,e,t,s){let i="Unexpected state";typeof t=="string"?i=t:s=t,n||xc(e,i,s)}/**
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
 */const te="invalid-argument",ka="failed-precondition";class Q extends _t{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Kf{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Gf{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(be.UNAUTHENTICATED))}shutdown(){}}class Jf{constructor(e){this.auth=null,e.onInit(t=>{this.auth=t})}getToken(){return this.auth?this.auth.getToken().then(e=>e?(Dc(typeof e.accessToken=="string",42297,{t:e}),new Kf(e.accessToken,new be(this.auth.getUid()))):null):Promise.resolve(null)}invalidateToken(){}start(e,t){}shutdown(){}}class Yf{constructor(e,t,s){this.i=e,this.o=t,this.u=s,this.type="FirstParty",this.user=be.FIRST_PARTY,this.l=new Map}h(){return this.u?this.u():null}get headers(){this.l.set("X-Goog-AuthUser",this.i);const e=this.h();return e&&this.l.set("Authorization",e),this.o&&this.l.set("X-Goog-Iam-Authorization-Token",this.o),this.l}}class Qf{constructor(e,t,s){this.i=e,this.o=t,this.u=s}getToken(){return Promise.resolve(new Yf(this.i,this.o,this.u))}start(e,t){e.enqueueRetryable(()=>t(be.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Ca{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Xf{constructor(e,t){this.m=t,this.appCheck=null,this.T=null,so(e)&&e.settings.appCheckToken&&(this.T=e.settings.appCheckToken),t.onInit(s=>{this.appCheck=s})}getToken(){return this.T?Promise.resolve(new Ca(this.T)):this.appCheck?this.appCheck.getToken().then(e=>e?(Dc(typeof e.token=="string",3470,{tokenResult:e}),new Ca(e.token)):null):Promise.resolve(null)}invalidateToken(){}start(e,t){}shutdown(){}}const Aa="(default)";class js{constructor(e,t){this.projectId=e,this.database=t||Aa}static empty(){return new js("","")}get isDefaultDatabase(){return this.database===Aa}isEqual(e){return e instanceof js&&e.projectId===this.projectId&&e.database===this.database}}function ht(n,e){return n<e?-1:n>e?1:0}function Zf(n,e){const t=Math.min(n.length,e.length);for(let s=0;s<t;s++){const i=n.charAt(s),r=e.charAt(s);if(i!==r)return zi(i)===zi(r)?ht(i,r):zi(i)?1:-1}return ht(n.length,e.length)}const ep=55296,tp=57343;function zi(n){const e=n.charCodeAt(0);return e>=ep&&e<=tp}class qe{constructor(e,t,s){t===void 0?t=0:t>e.length&&Ia(637,{offset:t,range:e.length}),s===void 0?s=e.length-t:s>e.length-t&&Ia(1746,{length:s,range:e.length-t}),this.segments=e,this.offset=t,this.len=s}get length(){return this.len}isEqual(e){return qe.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof qe?e.forEach(s=>{t.push(s)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,s=this.limit();t<s;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const s=Math.min(e.length,t.length);for(let i=0;i<s;i++){const r=qe.compareSegments(e.get(i),t.get(i));if(r!==0)return r}return ht(e.length,t.length)}static compareSegments(e,t){const s=qe.isNumericId(e),i=qe.isNumericId(t);return s&&!i?-1:!s&&i?1:s&&i?qe.extractNumericId(e).compare(qe.extractNumericId(t)):Zf(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Oc.fromString(e.substring(4,e.length-2))}}class Ce extends qe{construct(e,t,s){return new Ce(e,t,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const s of e){if(s.indexOf("//")>=0)throw new Q(te,`Invalid segment (${s}). Paths must not contain // in them.`);t.push(...s.split("/").filter(i=>i.length>0))}return new Ce(t)}static emptyPath(){return new Ce([])}}/**
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
 */class Ct{constructor(e){this.path=e}static fromPath(e){return new Ct(Ce.fromString(e))}static fromName(e){return new Ct(Ce.fromString(e).popFirst(5))}static empty(){return new Ct(Ce.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Ce.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Ce.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new Ct(new Ce(e.slice()))}}function np(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}/**
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
 */function sp(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */var Ra,U;/**
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
 */(U=Ra||(Ra={}))[U.OK=0]="OK",U[U.CANCELLED=1]="CANCELLED",U[U.UNKNOWN=2]="UNKNOWN",U[U.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",U[U.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",U[U.NOT_FOUND=5]="NOT_FOUND",U[U.ALREADY_EXISTS=6]="ALREADY_EXISTS",U[U.PERMISSION_DENIED=7]="PERMISSION_DENIED",U[U.UNAUTHENTICATED=16]="UNAUTHENTICATED",U[U.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",U[U.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",U[U.ABORTED=10]="ABORTED",U[U.OUT_OF_RANGE=11]="OUT_OF_RANGE",U[U.UNIMPLEMENTED=12]="UNIMPLEMENTED",U[U.INTERNAL=13]="INTERNAL",U[U.UNAVAILABLE=14]="UNAVAILABLE",U[U.DATA_LOSS=15]="DATA_LOSS";/**
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
 */class ip extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Mt{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(r){throw typeof DOMException<"u"&&r instanceof DOMException?new ip("Invalid base64 string: "+r):r}}(e);return new Mt(t)}static fromUint8Array(e){const t=function(i){let r="";for(let o=0;o<i.length;++o)r+=String.fromCharCode(i[o]);return r}(e);return new Mt(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const s=new Uint8Array(t.length);for(let i=0;i<t.length;i++)s[i]=t.charCodeAt(i);return s}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ht(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Mt.EMPTY_BYTE_STRING=new Mt("");/**
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
 */function Ee(n,e){const t={typeString:n};return e&&(t.value=e),t}function os(n,e){if(!np(n))throw new Q(te,"JSON must be an object");let t;for(const s in e)if(e[s]){const i=e[s].typeString,r="value"in e[s]?{value:e[s].value}:void 0;if(!(s in n)){t=`JSON missing required field: '${s}'`;break}const o=n[s];if(i&&typeof o!==i){t=`JSON field '${s}' must be a ${i}.`;break}if(r!==void 0&&o!==r.value){t=`Expected '${s}' field to equal '${r.value}'`;break}}if(t)throw new Q(te,t);return!0}/**
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
 */const Pa=-62135596800,Oa=1e6;class Me{static now(){return Me.fromMillis(Date.now())}static fromDate(e){return Me.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),s=Math.floor((e-1e3*t)*Oa);return new Me(t,s)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new Q(te,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new Q(te,"Timestamp nanoseconds out of range: "+t);if(e<Pa)throw new Q(te,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new Q(te,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Oa}_compareTo(e){return this.seconds===e.seconds?ht(this.nanoseconds,e.nanoseconds):ht(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Me._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(os(e,Me._jsonSchema))return new Me(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Pa;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Me._jsonSchemaVersion="firestore/timestamp/1.0",Me._jsonSchema={type:Ee("string",Me._jsonSchemaVersion),seconds:Ee("number"),nanoseconds:Ee("number")};/**
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
 */class rp{constructor(e,t=null,s=[],i=[],r=null,o="F",a=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=s,this.filters=i,this.limit=r,this.limitType=o,this.startAt=a,this.endAt=l,this.q=null,this.B=null,this.$=null,this.startAt,this.endAt}}/**
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
 */const op="ComponentProvider",Na=new Map;/**
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
 */const ap=1048576,lp="firestore.googleapis.com",xa=!0;/**
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
 */class Da{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new Q(te,"Can't provide ssl option if host option is not set");this.host=lp,this.ssl=xa}else this.host=e.host,this.ssl=e.ssl??xa;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<ap)throw new Q(te,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}(function(s,i,r,o){if(i===!0&&o===!0)throw new Q(te,`${s} and ${r} cannot be used together.`)})("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=sp(e.experimentalLongPollingOptions??{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new Q(te,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new Q(te,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new Q(te,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(s,i){return s.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class cp{constructor(e,t,s,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=s,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Da({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new Q(ka,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new Q(ka,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Da(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(s){if(!s)return new Gf;switch(s.type){case"firstParty":return new Qf(s.sessionIndex||"0",s.iamToken||null,s.authTokenFactory||null);case"provider":return s.client;default:throw new Q(te,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const s=Na.get(t);s&&(Hf(op,"Removing Datastore"),Na.delete(t),s.terminate())}(this),Promise.resolve()}}/**
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
 */class oo{constructor(e,t,s){this.converter=t,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new oo(this.firestore,e,this._query)}}class Je{constructor(e,t,s){this.converter=t,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ao(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Je(this.firestore,e,this._key)}toJSON(){return{type:Je._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,s){if(os(t,Je._jsonSchema))return new Je(e,s||null,new Ct(Ce.fromString(t.referencePath)))}}Je._jsonSchemaVersion="firestore/documentReference/1.0",Je._jsonSchema={type:Ee("string",Je._jsonSchemaVersion),referencePath:Ee("string")};class ao extends oo{constructor(e,t,s){super(e,t,function(r){return new rp(r)}(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Je(this.firestore,null,new Ct(e))}withConverter(e){return new ao(this.firestore,e,this._path)}}/**
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
 */class Ge{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ge(Mt.fromBase64String(e))}catch(t){throw new Q(te,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Ge(Mt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Ge._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(os(e,Ge._jsonSchema))return Ge.fromBase64String(e.bytes)}}Ge._jsonSchemaVersion="firestore/bytes/1.0",Ge._jsonSchema={type:Ee("string",Ge._jsonSchemaVersion),bytes:Ee("string")};/**
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
 */class Ot{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new Q(te,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new Q(te,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ht(this._lat,e._lat)||ht(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Ot._jsonSchemaVersion}}static fromJSON(e){if(os(e,Ot._jsonSchema))return new Ot(e.latitude,e.longitude)}}Ot._jsonSchemaVersion="firestore/geoPoint/1.0",Ot._jsonSchema={type:Ee("string",Ot._jsonSchemaVersion),latitude:Ee("number"),longitude:Ee("number")};/**
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
 */class Nt{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){/**
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
*/return function(s,i){if(s.length!==i.length)return!1;for(let r=0;r<s.length;++r)if(s[r]!==i[r])return!1;return!0}(this._values,e._values)}toJSON(){return{type:Nt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(os(e,Nt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new Nt(e.vectorValues);throw new Q(te,"Expected 'vectorValues' field to be a number array")}}}Nt._jsonSchemaVersion="firestore/vectorValue/1.0",Nt._jsonSchema={type:Ee("string",Nt._jsonSchemaVersion),vectorValues:Ee("object")};(function(){(function(t){pi=t})(`${io}_lite`),Fe(new xe("firestore/lite",(e,{instanceIdentifier:t,options:s})=>{const i=e.getProvider("app").getImmediate(),r=new cp(new Jf(e.getProvider("auth-internal")),new Xf(i,e.getProvider("app-check-internal")),function(a,l){if(!Object.prototype.hasOwnProperty.apply(a.options,["projectId"]))throw new Q(te,'"projectId" not provided in firebase.initializeApp.');return new js(a.options.projectId,l)}(i,t),i);return s&&r._setSettings(s),r},"PUBLIC").setMultipleInstances(!0)),ye("firestore-lite",Ta,""),ye("firestore-lite",Ta,"esm2020")})();var La={};const Ma="@firebase/database",$a="1.1.0";/**
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
 */let Lc="";function up(n){Lc=n}/**
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
 */class hp{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),ne(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:qn(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
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
 */class dp{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return De(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
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
 */const Mc=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new hp(e)}}catch{}return new dp},At=Mc("localStorage"),fp=Mc("sessionStorage");/**
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
 */const on=new to("@firebase/database"),$c=function(){let n=1;return function(){return n++}}(),jc=function(n){const e=Dd(n),t=new xd;t.update(e);const s=t.digest();return eo.encodeByteArray(s)},as=function(...n){let e="";for(let t=0;t<n.length;t++){const s=n[t];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=as.apply(null,s):typeof s=="object"?e+=ne(s):e+=s,e+=" "}return e};let xn=null,ja=!0;const pp=function(n,e){I(!0,"Can't turn on custom loggers persistently."),on.logLevel=q.VERBOSE,xn=on.log.bind(on)},le=function(...n){if(ja===!0&&(ja=!1,xn===null&&fp.get("logging_enabled")===!0&&pp()),xn){const e=as.apply(null,n);xn(e)}},ls=function(n){return function(...e){le(n,...e)}},Tr=function(...n){const e="FIREBASE INTERNAL ERROR: "+as(...n);on.error(e)},tt=function(...n){const e=`FIREBASE FATAL ERROR: ${as(...n)}`;throw on.error(e),new Error(e)},fe=function(...n){const e="FIREBASE WARNING: "+as(...n);on.warn(e)},gp=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&fe("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},lo=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},mp=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},$t="[MIN_NAME]",dt="[MAX_NAME]",qt=function(n,e){if(n===e)return 0;if(n===$t||e===dt)return-1;if(e===$t||n===dt)return 1;{const t=Fa(n),s=Fa(e);return t!==null?s!==null?t-s===0?n.length-e.length:t-s:-1:s!==null?1:n<e?-1:1}},_p=function(n,e){return n===e?0:n<e?-1:1},En=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+ne(e))},co=function(n){if(typeof n!="object"||n===null)return ne(n);const e=[];for(const s in n)e.push(s);e.sort();let t="{";for(let s=0;s<e.length;s++)s!==0&&(t+=","),t+=ne(e[s]),t+=":",t+=co(n[e[s]]);return t+="}",t},Fc=function(n,e){const t=n.length;if(t<=e)return[n];const s=[];for(let i=0;i<t;i+=e)i+e>t?s.push(n.substring(i,t)):s.push(n.substring(i,i+e));return s};function he(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const Bc=function(n){I(!lo(n),"Invalid JSON number");const e=11,t=52,s=(1<<e-1)-1;let i,r,o,a,l;n===0?(r=0,o=0,i=1/n===-1/0?1:0):(i=n<0,n=Math.abs(n),n>=Math.pow(2,1-s)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),s),r=a+s,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-s-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(i?1:0),c.reverse();const u=c.join("");let h="";for(l=0;l<64;l+=8){let d=parseInt(u.substr(l,8),2).toString(16);d.length===1&&(d="0"+d),h=h+d}return h.toLowerCase()},yp=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},vp=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function wp(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const s=new Error(n+" at "+e._path.toString()+": "+t);return s.code=n.toUpperCase(),s}const bp=new RegExp("^-?(0*)\\d{1,10}$"),Sp=-2147483648,Ep=2147483647,Fa=function(n){if(bp.test(n)){const e=Number(n);if(e>=Sp&&e<=Ep)return e}return null},_n=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw fe("Exception was thrown by user callback.",t),e},Math.floor(0))}},Tp=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Dn=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
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
 */class Ip{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,so(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(s=>this.appCheck=s)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,s):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)==null||t.get().then(s=>s.addTokenListener(e))}notifyForInvalidToken(){fe(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
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
 */class kp{constructor(e,t,s){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(le("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,s):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',fe(e)}}class As{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}As.OWNER="owner";/**
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
 */const uo="5",Uc="v",Wc="s",Vc="r",qc="f",Hc=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,zc="ls",Kc="p",Ir="ac",Gc="websocket",Jc="long_polling";/**
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
 */class Yc{constructor(e,t,s,i,r=!1,o="",a=!1,l=!1,c=null){this.secure=t,this.namespace=s,this.webSocketOnly=i,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=At.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&At.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function Cp(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Qc(n,e,t){I(typeof e=="string","typeof type must == string"),I(typeof t=="object","typeof params must == object");let s;if(e===Gc)s=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===Jc)s=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Cp(n)&&(t.ns=n.namespace);const i=[];return he(t,(r,o)=>{i.push(r+"="+o)}),s+i.join("&")}/**
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
 */class Ap{constructor(){this.counters_={}}incrementCounter(e,t=1){De(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return pd(this.counters_)}}/**
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
 */const Ki={},Gi={};function ho(n){const e=n.toString();return Ki[e]||(Ki[e]=new Ap),Ki[e]}function Rp(n,e){const t=n.toString();return Gi[t]||(Gi[t]=e()),Gi[t]}/**
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
 */class Pp{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<s.length;++i)s[i]&&_n(()=>{this.onMessage_(s[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
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
 */const Ba="start",Op="close",Np="pLPCommand",xp="pRTLPCB",Xc="id",Zc="pw",eu="ser",Dp="cb",Lp="seg",Mp="ts",$p="d",jp="dframe",tu=1870,nu=30,Fp=tu-nu,Bp=25e3,Up=3e4;class sn{constructor(e,t,s,i,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=ls(e),this.stats_=ho(t),this.urlFn=l=>(this.appCheckToken&&(l[Ir]=this.appCheckToken),Qc(t,Jc,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new Pp(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Up)),mp(()=>{if(this.isClosed_)return;this.scriptTagHolder=new fo((...r)=>{const[o,a,l,c,u]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Ba)this.id=a,this.password=l;else if(o===Op)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const s={};s[Ba]="t",s[eu]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[Dp]=this.scriptTagHolder.uniqueCallbackIdentifier),s[Uc]=uo,this.transportSessionId&&(s[Wc]=this.transportSessionId),this.lastSessionId&&(s[zc]=this.lastSessionId),this.applicationId&&(s[Kc]=this.applicationId),this.appCheckToken&&(s[Ir]=this.appCheckToken),typeof location<"u"&&location.hostname&&Hc.test(location.hostname)&&(s[Vc]=qc);const i=this.urlFn(s);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){sn.forceAllow_=!0}static forceDisallow(){sn.forceDisallow_=!0}static isAvailable(){return sn.forceAllow_?!0:!sn.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!yp()&&!vp()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=ne(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const s=pc(t),i=Fc(s,Fp);for(let r=0;r<i.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const s={};s[jp]="t",s[Xc]=e,s[Zc]=t,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=ne(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class fo{constructor(e,t,s,i){this.onDisconnect=s,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=$c(),window[Np+this.uniqueCallbackIdentifier]=e,window[xp+this.uniqueCallbackIdentifier]=t,this.myIFrame=fo.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){le("frame writing exception"),a.stack&&le(a.stack),le(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||le("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Xc]=this.myID,e[Zc]=this.myPW,e[eu]=this.currentSerial;let t=this.urlFn(e),s="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+nu+s.length<=tu;){const o=this.pendingSegs.shift();s=s+"&"+Lp+i+"="+o.seg+"&"+Mp+i+"="+o.ts+"&"+$p+i+"="+o.d,i++}return t=t+s,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,s){this.pendingSegs.push({seg:e,ts:t,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const s=()=>{this.outstandingRequests.delete(t),this.newRequest_()},i=setTimeout(s,Math.floor(Bp)),r=()=>{clearTimeout(i),s()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const i=s.readyState;(!i||i==="loaded"||i==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),t())},s.onerror=()=>{le("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
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
 */const Wp=16384,Vp=45e3;let Fs=null;typeof MozWebSocket<"u"?Fs=MozWebSocket:typeof WebSocket<"u"&&(Fs=WebSocket);class Ae{constructor(e,t,s,i,r,o,a){this.connId=e,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=ls(this.connId),this.stats_=ho(t),this.connURL=Ae.connectionURL_(t,o,a,i,s),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,s,i,r){const o={};return o[Uc]=uo,typeof location<"u"&&location.hostname&&Hc.test(location.hostname)&&(o[Vc]=qc),t&&(o[Wc]=t),s&&(o[zc]=s),i&&(o[Ir]=i),r&&(o[Kc]=r),Qc(e,Gc,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,At.set("previous_websocket_failure",!0);try{let s;Id(),this.mySock=new Fs(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){Ae.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(t);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&Fs!==null&&!Ae.forceDisallow_}static previouslyFailed(){return At.isInMemoryStorage||At.get("previous_websocket_failure")===!0}markConnectionHealthy(){At.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const s=qn(t);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(I(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const s=this.extractFrameCount_(t);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const t=ne(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const s=Fc(t,Wp);s.length>1&&this.sendString_(String(s.length));for(let i=0;i<s.length;i++)this.sendString_(s[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Vp))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Ae.responsesRequiredToBeHealthy=2;Ae.healthyTimeout=3e4;/**
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
 */class zn{static get ALL_TRANSPORTS(){return[sn,Ae]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=Ae&&Ae.isAvailable();let s=t&&!Ae.previouslyFailed();if(e.webSocketOnly&&(t||fe("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[Ae];else{const i=this.transports_=[];for(const r of zn.ALL_TRANSPORTS)r&&r.isAvailable()&&i.push(r);zn.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}zn.globalTransportInitialized_=!1;/**
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
 */const qp=6e4,Hp=5e3,zp=10*1024,Kp=100*1024,Ji="t",Ua="d",Gp="s",Wa="r",Jp="e",Va="o",qa="a",Ha="n",za="p",Yp="h";class Qp{constructor(e,t,s,i,r,o,a,l,c,u){this.id=e,this.repoInfo_=t,this.applicationId_=s,this.appCheckToken_=i,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=ls("c:"+this.id+":"),this.transportManager_=new zn(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,s)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=Dn(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Kp?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>zp?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Ji in e){const t=e[Ji];t===qa?this.upgradeIfSecondaryHealthy_():t===Wa?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===Va&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=En("t",e),s=En("d",e);if(t==="c")this.onSecondaryControl_(s);else if(t==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:za,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:qa,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Ha,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=En("t",e),s=En("d",e);t==="c"?this.onControl_(s):t==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=En(Ji,e);if(Ua in e){const s=e[Ua];if(t===Yp){const i={...s};this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(t===Ha){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===Gp?this.onConnectionShutdown_(s):t===Wa?this.onReset_(s):t===Jp?Tr("Server Error: "+s):t===Va?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Tr("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,s=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),uo!==s&&fe("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,s),Dn(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(qp))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Dn(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Hp))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:za,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(At.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
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
 */class su{put(e,t,s,i){}merge(e,t,s,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,s){}onDisconnectMerge(e,t,s){}onDisconnectCancel(e,t){}reportStats(e){}}/**
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
 */class iu{constructor(e){this.allowedEvents_=e,this.listeners_={},I(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let i=0;i<s.length;i++)s[i].callback.apply(s[i].context,t)}}on(e,t,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:s});const i=this.getInitialEvent(e);i&&t.apply(s,i)}off(e,t,s){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let r=0;r<i.length;r++)if(i[r].callback===t&&(!s||s===i[r].context)){i.splice(r,1);return}}validateEventType_(e){I(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
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
 */class Bs extends iu{static getInstance(){return new Bs}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Sc()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return I(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
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
 */const Ka=32,Ga=768;class V{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let s=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[s]=this.pieces_[i],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function W(){return new V("")}function D(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function ft(n){return n.pieces_.length-n.pieceNum_}function G(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new V(n.pieces_,e)}function po(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function Xp(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function Kn(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function ru(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new V(e,0)}function Y(n,e){const t=[];for(let s=n.pieceNum_;s<n.pieces_.length;s++)t.push(n.pieces_[s]);if(e instanceof V)for(let s=e.pieceNum_;s<e.pieces_.length;s++)t.push(e.pieces_[s]);else{const s=e.split("/");for(let i=0;i<s.length;i++)s[i].length>0&&t.push(s[i])}return new V(t,0)}function M(n){return n.pieceNum_>=n.pieces_.length}function de(n,e){const t=D(n),s=D(e);if(t===null)return e;if(t===s)return de(G(n),G(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function Zp(n,e){const t=Kn(n,0),s=Kn(e,0);for(let i=0;i<t.length&&i<s.length;i++){const r=qt(t[i],s[i]);if(r!==0)return r}return t.length===s.length?0:t.length<s.length?-1:1}function go(n,e){if(ft(n)!==ft(e))return!1;for(let t=n.pieceNum_,s=e.pieceNum_;t<=n.pieces_.length;t++,s++)if(n.pieces_[t]!==e.pieces_[s])return!1;return!0}function Se(n,e){let t=n.pieceNum_,s=e.pieceNum_;if(ft(n)>ft(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[s])return!1;++t,++s}return!0}class eg{constructor(e,t){this.errorPrefix_=t,this.parts_=Kn(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=di(this.parts_[s]);ou(this)}}function tg(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=di(e),ou(n)}function ng(n){const e=n.parts_.pop();n.byteLength_-=di(e),n.parts_.length>0&&(n.byteLength_-=1)}function ou(n){if(n.byteLength_>Ga)throw new Error(n.errorPrefix_+"has a key path longer than "+Ga+" bytes ("+n.byteLength_+").");if(n.parts_.length>Ka)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Ka+") or object contains a cycle "+Tt(n))}function Tt(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
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
 */class mo extends iu{static getInstance(){return new mo}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}getInitialEvent(e){return I(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
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
 */const Tn=1e3,sg=60*5*1e3,Ja=30*1e3,ig=1.3,rg=3e4,og="server_kill",Ya=3;class Xe extends su{constructor(e,t,s,i,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=s,this.onConnectStatus_=i,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=Xe.nextPersistentConnectionId_++,this.log_=ls("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Tn,this.maxReconnectDelay_=sg,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");mo.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Bs.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,s){const i=++this.requestNumber_,r={r:i,a:e,b:t};this.log_(ne(r)),I(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),s&&(this.requestCBHash_[i]=s)}get(e){this.initConnection_();const t=new mn,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,s,i){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),I(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),I(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:i,hashFn:t,query:e,tag:s};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(s)})}sendListen_(e){const t=e.query,s=t._path.toString(),i=t._queryIdentifier;this.log_("Listen on "+s+" for "+i);const r={p:s},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;Xe.warnOnListenWarnings_(l,t),(this.listens.get(s)&&this.listens.get(s).get(i))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(s,i),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&De(e,"w")){const s=Lt(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const i='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();fe(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Od(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Ja)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=Pd(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(t,s,i=>{const r=i.s,o=i.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,s=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,s)})}unlisten(e,t){const s=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+i),I(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,i)&&this.connected_&&this.sendUnlisten_(s,i,e._queryObject,t)}sendUnlisten_(e,t,s,i){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";i&&(r.q=s,r.t=i),this.sendRequest(o,r)}onDisconnectPut(e,t,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:s})}onDisconnectMerge(e,t,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:s})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,s,i){const r={p:t,d:s};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,t,s,i){this.putInternal("p",e,t,s,i)}merge(e,t,s,i){this.putInternal("m",e,t,s,i)}putInternal(e,t,s,i,r){this.initConnection_();const o={p:t,d:s};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,s,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,s=>{if(s.s!=="ok"){const r=s.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+ne(e));const t=e.r,s=this.requestCBHash_[t];s&&(delete this.requestCBHash_[t],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):Tr("Unrecognized action received from server: "+ne(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){I(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Tn,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Tn,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>rg&&(this.reconnectDelay_=Tn),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*ig)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+Xe.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,s())},c=function(h){I(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(h)};this.realtime_={close:l,sendRequest:c};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[h,d]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?le("getToken() completed but was canceled"):(le("getToken() completed. Creating connection."),this.authToken_=h&&h.accessToken,this.appCheckToken_=d&&d.token,a=new Qp(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,s,_=>{fe(_+" ("+this.repoInfo_.toString()+")"),this.interrupt(og)},r))}catch(h){this.log_("Failed to get token: "+h),o||(this.repoInfo_.nodeAdmin&&fe(h),l())}}}interrupt(e){le("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){le("Resuming connection for reason: "+e),delete this.interruptReasons_[e],fa(this.interruptReasons_)&&(this.reconnectDelay_=Tn,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let s;t?s=t.map(r=>co(r)).join("$"):s="default";const i=this.removeListen_(e,s);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,t){const s=new V(e).toString();let i;if(this.listens.has(s)){const r=this.listens.get(s);i=r.get(t),r.delete(t),r.size===0&&this.listens.delete(s)}else i=void 0;return i}onAuthRevoked_(e,t){le("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Ya&&(this.reconnectDelay_=Ja,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){le("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Ya&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+Lc.replace(/\./g,"-")]=1,Sc()?e["framework.cordova"]=1:Td()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Bs.getInstance().currentlyOnline();return fa(this.interruptReasons_)&&e}}Xe.nextPersistentConnectionId_=0;Xe.nextConnectionId_=0;/**
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
 */class ${constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new $(e,t)}}/**
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
 */class gi{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const s=new $($t,e),i=new $($t,t);return this.compare(s,i)!==0}minPost(){return $.MIN}}/**
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
 */let ys;class au extends gi{static get __EMPTY_NODE(){return ys}static set __EMPTY_NODE(e){ys=e}compare(e,t){return qt(e.name,t.name)}isDefinedOn(e){throw gn("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return $.MIN}maxPost(){return new $(dt,ys)}makePost(e,t){return I(typeof e=="string","KeyIndex indexValue must always be a string."),new $(e,ys)}toString(){return".key"}}const xt=new au;/**
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
 */class vs{constructor(e,t,s,i,r=null){this.isReverse_=i,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?s(e.key,t):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class oe{constructor(e,t,s,i,r){this.key=e,this.value=t,this.color=s??oe.RED,this.left=i??_e.EMPTY_NODE,this.right=r??_e.EMPTY_NODE}copy(e,t,s,i,r){return new oe(e??this.key,t??this.value,s??this.color,i??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,s){let i=this;const r=s(e,i.key);return r<0?i=i.copy(null,null,null,i.left.insert(e,t,s),null):r===0?i=i.copy(null,t,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,t,s)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return _e.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let s,i;if(s=this,t(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),t(e,s.key)===0){if(s.right.isEmpty())return _e.EMPTY_NODE;i=s.right.min_(),s=s.copy(i.key,i.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,oe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,oe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}oe.RED=!0;oe.BLACK=!1;class ag{copy(e,t,s,i,r){return this}insert(e,t,s){return new oe(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class _e{constructor(e,t=_e.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new _e(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,oe.BLACK,null,null))}remove(e){return new _e(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,oe.BLACK,null,null))}get(e){let t,s=this.root_;for(;!s.isEmpty();){if(t=this.comparator_(e,s.key),t===0)return s.value;t<0?s=s.left:t>0&&(s=s.right)}return null}getPredecessorKey(e){let t,s=this.root_,i=null;for(;!s.isEmpty();)if(t=this.comparator_(e,s.key),t===0){if(s.left.isEmpty())return i?i.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else t<0?s=s.left:t>0&&(i=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new vs(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new vs(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new vs(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new vs(this.root_,null,this.comparator_,!0,e)}}_e.EMPTY_NODE=new ag;/**
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
 */function lg(n,e){return qt(n.name,e.name)}function _o(n,e){return qt(n,e)}/**
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
 */let kr;function cg(n){kr=n}const lu=function(n){return typeof n=="number"?"number:"+Bc(n):"string:"+n},cu=function(n){if(n.isLeafNode()){const e=n.val();I(typeof e=="string"||typeof e=="number"||typeof e=="object"&&De(e,".sv"),"Priority must be a string or number.")}else I(n===kr||n.isEmpty(),"priority of unexpected type.");I(n===kr||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
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
 */let Qa;class re{static set __childrenNodeConstructor(e){Qa=e}static get __childrenNodeConstructor(){return Qa}constructor(e,t=re.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,I(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),cu(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new re(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:re.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return M(e)?this:D(e)===".priority"?this.priorityNode_:re.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:re.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const s=D(e);return s===null?t:t.isEmpty()&&s!==".priority"?this:(I(s!==".priority"||ft(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,re.__childrenNodeConstructor.EMPTY_NODE.updateChild(G(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+lu(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=Bc(this.value_):e+=this.value_,this.lazyHash_=jc(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===re.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof re.__childrenNodeConstructor?-1:(I(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,s=typeof this.value_,i=re.VALUE_TYPE_ORDER.indexOf(t),r=re.VALUE_TYPE_ORDER.indexOf(s);return I(i>=0,"Unknown leaf type: "+t),I(r>=0,"Unknown leaf type: "+s),i===r?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}re.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
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
 */let uu,hu;function ug(n){uu=n}function hg(n){hu=n}class dg extends gi{compare(e,t){const s=e.node.getPriority(),i=t.node.getPriority(),r=s.compareTo(i);return r===0?qt(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return $.MIN}maxPost(){return new $(dt,new re("[PRIORITY-POST]",hu))}makePost(e,t){const s=uu(e);return new $(t,new re("[PRIORITY-POST]",s))}toString(){return".priority"}}const J=new dg;/**
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
 */const fg=Math.log(2);class pg{constructor(e){const t=r=>parseInt(Math.log(r)/fg,10),s=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const i=s(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Us=function(n,e,t,s){n.sort(e);const i=function(l,c){const u=c-l;let h,d;if(u===0)return null;if(u===1)return h=n[l],d=t?t(h):h,new oe(d,h.node,oe.BLACK,null,null);{const _=parseInt(u/2,10)+l,w=i(l,_),E=i(_+1,c);return h=n[_],d=t?t(h):h,new oe(d,h.node,oe.BLACK,w,E)}},r=function(l){let c=null,u=null,h=n.length;const d=function(w,E){const S=h-w,R=h;h-=w;const j=i(S+1,R),k=n[S],O=t?t(k):k;_(new oe(O,k.node,E,null,j))},_=function(w){c?(c.left=w,c=w):(u=w,c=w)};for(let w=0;w<l.count;++w){const E=l.nextBitIsOne(),S=Math.pow(2,l.count-(w+1));E?d(S,oe.BLACK):(d(S,oe.BLACK),d(S,oe.RED))}return u},o=new pg(n.length),a=r(o);return new _e(s||e,a)};/**
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
 */let Yi;const Gt={};class Ye{static get Default(){return I(Gt&&J,"ChildrenNode.ts has not been loaded"),Yi=Yi||new Ye({".priority":Gt},{".priority":J}),Yi}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=Lt(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof _e?t:null}hasIndex(e){return De(this.indexSet_,e.toString())}addIndex(e,t){I(e!==xt,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let i=!1;const r=t.getIterator($.Wrap);let o=r.getNext();for(;o;)i=i||e.isDefinedOn(o.node),s.push(o),o=r.getNext();let a;i?a=Us(s,e.getCompare()):a=Gt;const l=e.toString(),c={...this.indexSet_};c[l]=e;const u={...this.indexes_};return u[l]=a,new Ye(u,c)}addToIndexes(e,t){const s=Ds(this.indexes_,(i,r)=>{const o=Lt(this.indexSet_,r);if(I(o,"Missing index implementation for "+r),i===Gt)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator($.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),Us(a,o.getCompare())}else return Gt;else{const a=t.get(e.name);let l=i;return a&&(l=l.remove(new $(e.name,a))),l.insert(e,e.node)}});return new Ye(s,this.indexSet_)}removeFromIndexes(e,t){const s=Ds(this.indexes_,i=>{if(i===Gt)return i;{const r=t.get(e.name);return r?i.remove(new $(e.name,r)):i}});return new Ye(s,this.indexSet_)}}/**
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
 */let In;class P{static get EMPTY_NODE(){return In||(In=new P(new _e(_o),null,Ye.Default))}constructor(e,t,s){this.children_=e,this.priorityNode_=t,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&cu(this.priorityNode_),this.children_.isEmpty()&&I(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||In}updatePriority(e){return this.children_.isEmpty()?this:new P(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?In:t}}getChild(e){const t=D(e);return t===null?this:this.getImmediateChild(t).getChild(G(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(I(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const s=new $(e,t);let i,r;t.isEmpty()?(i=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(s,this.children_)):(i=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(s,this.children_));const o=i.isEmpty()?In:this.priorityNode_;return new P(i,o,r)}}updateChild(e,t){const s=D(e);if(s===null)return t;{I(D(e)!==".priority"||ft(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(s).updateChild(G(e),t);return this.updateImmediateChild(s,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let s=0,i=0,r=!0;if(this.forEachChild(J,(o,a)=>{t[o]=a.val(e),s++,r&&P.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):r=!1}),!e&&r&&i<2*s){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+lu(this.getPriority().val())+":"),this.forEachChild(J,(t,s)=>{const i=s.hash();i!==""&&(e+=":"+t+":"+i)}),this.lazyHash_=e===""?"":jc(e)}return this.lazyHash_}getPredecessorChildName(e,t,s){const i=this.resolveIndex_(s);if(i){const r=i.getPredecessorKey(new $(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const s=t.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new $(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const s=t.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new $(t,this.children_.get(t)):null}forEachChild(e,t){const s=this.resolveIndex_(e);return s?s.inorderTraversal(i=>t(i.name,i.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const s=this.resolveIndex_(t);if(s)return s.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,$.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)<0;)i.getNext(),r=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const s=this.resolveIndex_(t);if(s)return s.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,$.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)>0;)i.getNext(),r=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===cs?-1:0}withIndex(e){if(e===xt||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new P(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===xt||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const s=this.getIterator(J),i=t.getIterator(J);let r=s.getNext(),o=i.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=s.getNext(),o=i.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===xt?null:this.indexMap_.get(e.toString())}}P.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class gg extends P{constructor(){super(new _e(_o),P.EMPTY_NODE,Ye.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return P.EMPTY_NODE}isEmpty(){return!1}}const cs=new gg;Object.defineProperties($,{MIN:{value:new $($t,P.EMPTY_NODE)},MAX:{value:new $(dt,cs)}});au.__EMPTY_NODE=P.EMPTY_NODE;re.__childrenNodeConstructor=P;cg(cs);hg(cs);/**
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
 */const mg=!0;function X(n,e=null){if(n===null)return P.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),I(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new re(t,X(e))}if(!(n instanceof Array)&&mg){const t=[];let s=!1;if(he(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=X(a);l.isEmpty()||(s=s||!l.getPriority().isEmpty(),t.push(new $(o,l)))}}),t.length===0)return P.EMPTY_NODE;const r=Us(t,lg,o=>o.name,_o);if(s){const o=Us(t,J.getCompare());return new P(r,X(e),new Ye({".priority":o},{".priority":J}))}else return new P(r,X(e),Ye.Default)}else{let t=P.EMPTY_NODE;return he(n,(s,i)=>{if(De(n,s)&&s.substring(0,1)!=="."){const r=X(i);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(s,r))}}),t.updatePriority(X(e))}}ug(X);/**
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
 */class yo extends gi{constructor(e){super(),this.indexPath_=e,I(!M(e)&&D(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const s=this.extractChild(e.node),i=this.extractChild(t.node),r=s.compareTo(i);return r===0?qt(e.name,t.name):r}makePost(e,t){const s=X(e),i=P.EMPTY_NODE.updateChild(this.indexPath_,s);return new $(t,i)}maxPost(){const e=P.EMPTY_NODE.updateChild(this.indexPath_,cs);return new $(dt,e)}toString(){return Kn(this.indexPath_,0).join("/")}}/**
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
 */class _g extends gi{compare(e,t){const s=e.node.compareTo(t.node);return s===0?qt(e.name,t.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return $.MIN}maxPost(){return $.MAX}makePost(e,t){const s=X(e);return new $(t,s)}toString(){return".value"}}const du=new _g;/**
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
 */function fu(n){return{type:"value",snapshotNode:n}}function ln(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function Gn(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function Jn(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function yg(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
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
 */class vo{constructor(e){this.index_=e}updateChild(e,t,s,i,r,o){I(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(i).equals(s.getChild(i))&&a.isEmpty()===s.isEmpty()||(o!=null&&(s.isEmpty()?e.hasChild(t)?o.trackChildChange(Gn(t,a)):I(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(ln(t,s)):o.trackChildChange(Jn(t,s,a))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(t,s).withIndex(this.index_)}updateFullNode(e,t,s){return s!=null&&(e.isLeafNode()||e.forEachChild(J,(i,r)=>{t.hasChild(i)||s.trackChildChange(Gn(i,r))}),t.isLeafNode()||t.forEachChild(J,(i,r)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(r)||s.trackChildChange(Jn(i,r,o))}else s.trackChildChange(ln(i,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?P.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
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
 */class Yn{constructor(e){this.indexedFilter_=new vo(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Yn.getStartPost_(e),this.endPost_=Yn.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&s}updateChild(e,t,s,i,r,o){return this.matches(new $(t,s))||(s=P.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,s,i,r,o)}updateFullNode(e,t,s){t.isLeafNode()&&(t=P.EMPTY_NODE);let i=t.withIndex(this.index_);i=i.updatePriority(P.EMPTY_NODE);const r=this;return t.forEachChild(J,(o,a)=>{r.matches(new $(o,a))||(i=i.updateImmediateChild(o,P.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,s)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
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
 */class vg{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=t=>{const s=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new Yn(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,s,i,r,o){return this.rangedFilter_.matches(new $(t,s))||(s=P.EMPTY_NODE),e.getImmediateChild(t).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,s,i,r,o):this.fullLimitUpdateChild_(e,t,s,r,o)}updateFullNode(e,t,s){let i;if(t.isLeafNode()||t.isEmpty())i=P.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){i=P.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))i=i.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{i=t.withIndex(this.index_),i=i.updatePriority(P.EMPTY_NODE);let r;this.reverse_?r=i.getReverseIterator(this.index_):r=i.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:i=i.updateImmediateChild(a.name,P.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,s)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,s,i,r){let o;if(this.reverse_){const h=this.index_.getCompare();o=(d,_)=>h(_,d)}else o=this.index_.getCompare();const a=e;I(a.numChildren()===this.limit_,"");const l=new $(t,s),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(l);if(a.hasChild(t)){const h=a.getImmediateChild(t);let d=i.getChildAfterChild(this.index_,c,this.reverse_);for(;d!=null&&(d.name===t||a.hasChild(d.name));)d=i.getChildAfterChild(this.index_,d,this.reverse_);const _=d==null?1:o(d,l);if(u&&!s.isEmpty()&&_>=0)return r!=null&&r.trackChildChange(Jn(t,s,h)),a.updateImmediateChild(t,s);{r!=null&&r.trackChildChange(Gn(t,h));const E=a.updateImmediateChild(t,P.EMPTY_NODE);return d!=null&&this.rangedFilter_.matches(d)?(r!=null&&r.trackChildChange(ln(d.name,d.node)),E.updateImmediateChild(d.name,d.node)):E}}else return s.isEmpty()?e:u&&o(c,l)>=0?(r!=null&&(r.trackChildChange(Gn(c.name,c.node)),r.trackChildChange(ln(t,s))),a.updateImmediateChild(t,s).updateImmediateChild(c.name,P.EMPTY_NODE)):e}}/**
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
 */class wo{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=J}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return I(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return I(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:$t}hasEnd(){return this.endSet_}getIndexEndValue(){return I(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return I(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:dt}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return I(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===J}copy(){const e=new wo;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function wg(n){return n.loadsAllData()?new vo(n.getIndex()):n.hasLimit()?new vg(n):new Yn(n)}function bg(n,e){const t=n.copy();return t.limitSet_=!0,t.limit_=e,t.viewFrom_="r",t}function Sg(n,e){const t=n.copy();return t.index_=e,t}function Xa(n){const e={};if(n.isDefault())return e;let t;if(n.index_===J?t="$priority":n.index_===du?t="$value":n.index_===xt?t="$key":(I(n.index_ instanceof yo,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=ne(t),n.startSet_){const s=n.startAfterSet_?"startAfter":"startAt";e[s]=ne(n.indexStartValue_),n.startNameSet_&&(e[s]+=","+ne(n.indexStartName_))}if(n.endSet_){const s=n.endBeforeSet_?"endBefore":"endAt";e[s]=ne(n.indexEndValue_),n.endNameSet_&&(e[s]+=","+ne(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Za(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==J&&(e.i=n.index_.toString()),e}/**
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
 */class Ws extends su{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(I(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,s,i){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=s,this.appCheckTokenProvider_=i,this.log_=ls("p:rest:"),this.listens_={}}listen(e,t,s,i){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Ws.getListenId_(e,s),a={};this.listens_[o]=a;const l=Xa(e._queryParams);this.restRequest_(r+".json",l,(c,u)=>{let h=u;if(c===404&&(h=null,c=null),c===null&&this.onDataUpdate_(r,h,!1,s),Lt(this.listens_,o)===a){let d;c?c===401?d="permission_denied":d="rest_error:"+c:d="ok",i(d,null)}})}unlisten(e,t){const s=Ws.getListenId_(e,t);delete this.listens_[s]}get(e){const t=Xa(e._queryParams),s=e._path.toString(),i=new mn;return this.restRequest_(s+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(s,a,!1,null),i.resolve(a)):i.reject(new Error(a))}),i.promise}refreshAuthToken(e){}restRequest_(e,t={},s){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,r])=>{i&&i.accessToken&&(t.auth=i.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Nd(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(s&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=qn(a.responseText)}catch{fe("Failed to parse JSON response for "+o+": "+a.responseText)}s(null,l)}else a.status!==401&&a.status!==404&&fe("Got unsuccessful REST response for "+o+" Status: "+a.status),s(a.status);s=null}},a.open("GET",o,!0),a.send()})}}/**
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
 */class Eg{constructor(){this.rootNode_=P.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
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
 */function Vs(){return{value:null,children:new Map}}function pu(n,e,t){if(M(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const s=D(e);n.children.has(s)||n.children.set(s,Vs());const i=n.children.get(s);e=G(e),pu(i,e,t)}}function Cr(n,e,t){n.value!==null?t(e,n.value):Tg(n,(s,i)=>{const r=new V(e.toString()+"/"+s);Cr(i,r,t)})}function Tg(n,e){n.children.forEach((t,s)=>{e(s,t)})}/**
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
 */class Ig{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&he(this.last_,(s,i)=>{t[s]=t[s]-i}),this.last_=e,t}}/**
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
 */const el=10*1e3,kg=30*1e3,Cg=5*60*1e3;class Ag{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new Ig(e);const s=el+(kg-el)*Math.random();Dn(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),t={};let s=!1;he(e,(i,r)=>{r>0&&De(this.statsToReport_,i)&&(t[i]=r,s=!0)}),s&&this.server_.reportStats(t),Dn(this.reportStats_.bind(this),Math.floor(Math.random()*2*Cg))}}/**
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
 */var Pe;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Pe||(Pe={}));function bo(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function So(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Eo(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
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
 */class qs{constructor(e,t,s){this.path=e,this.affectedTree=t,this.revert=s,this.type=Pe.ACK_USER_WRITE,this.source=bo()}operationForChild(e){if(M(this.path)){if(this.affectedTree.value!=null)return I(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new V(e));return new qs(W(),t,this.revert)}}else return I(D(this.path)===e,"operationForChild called for unrelated child."),new qs(G(this.path),this.affectedTree,this.revert)}}/**
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
 */class Qn{constructor(e,t){this.source=e,this.path=t,this.type=Pe.LISTEN_COMPLETE}operationForChild(e){return M(this.path)?new Qn(this.source,W()):new Qn(this.source,G(this.path))}}/**
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
 */class jt{constructor(e,t,s){this.source=e,this.path=t,this.snap=s,this.type=Pe.OVERWRITE}operationForChild(e){return M(this.path)?new jt(this.source,W(),this.snap.getImmediateChild(e)):new jt(this.source,G(this.path),this.snap)}}/**
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
 */class cn{constructor(e,t,s){this.source=e,this.path=t,this.children=s,this.type=Pe.MERGE}operationForChild(e){if(M(this.path)){const t=this.children.subtree(new V(e));return t.isEmpty()?null:t.value?new jt(this.source,W(),t.value):new cn(this.source,W(),t)}else return I(D(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new cn(this.source,G(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
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
 */class pt{constructor(e,t,s){this.node_=e,this.fullyInitialized_=t,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(M(e))return this.isFullyInitialized()&&!this.filtered_;const t=D(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
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
 */class Rg{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Pg(n,e,t,s){const i=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(yg(o.childName,o.snapshotNode))}),kn(n,i,"child_removed",e,s,t),kn(n,i,"child_added",e,s,t),kn(n,i,"child_moved",r,s,t),kn(n,i,"child_changed",e,s,t),kn(n,i,"value",e,s,t),i}function kn(n,e,t,s,i,r){const o=s.filter(a=>a.type===t);o.sort((a,l)=>Ng(n,a,l)),o.forEach(a=>{const l=Og(n,a,r);i.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function Og(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function Ng(n,e,t){if(e.childName==null||t.childName==null)throw gn("Should only compare child_ events.");const s=new $(e.childName,e.snapshotNode),i=new $(t.childName,t.snapshotNode);return n.index_.compare(s,i)}/**
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
 */function mi(n,e){return{eventCache:n,serverCache:e}}function Ln(n,e,t,s){return mi(new pt(e,t,s),n.serverCache)}function gu(n,e,t,s){return mi(n.eventCache,new pt(e,t,s))}function Hs(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function Ft(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
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
 */let Qi;const xg=()=>(Qi||(Qi=new _e(_p)),Qi);class K{static fromObject(e){let t=new K(null);return he(e,(s,i)=>{t=t.set(new V(s),i)}),t}constructor(e,t=xg()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:W(),value:this.value};if(M(e))return null;{const s=D(e),i=this.children.get(s);if(i!==null){const r=i.findRootMostMatchingPathAndValue(G(e),t);return r!=null?{path:Y(new V(s),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(M(e))return this;{const t=D(e),s=this.children.get(t);return s!==null?s.subtree(G(e)):new K(null)}}set(e,t){if(M(e))return new K(t,this.children);{const s=D(e),r=(this.children.get(s)||new K(null)).set(G(e),t),o=this.children.insert(s,r);return new K(this.value,o)}}remove(e){if(M(e))return this.children.isEmpty()?new K(null):new K(null,this.children);{const t=D(e),s=this.children.get(t);if(s){const i=s.remove(G(e));let r;return i.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,i),this.value===null&&r.isEmpty()?new K(null):new K(this.value,r)}else return this}}get(e){if(M(e))return this.value;{const t=D(e),s=this.children.get(t);return s?s.get(G(e)):null}}setTree(e,t){if(M(e))return t;{const s=D(e),r=(this.children.get(s)||new K(null)).setTree(G(e),t);let o;return r.isEmpty()?o=this.children.remove(s):o=this.children.insert(s,r),new K(this.value,o)}}fold(e){return this.fold_(W(),e)}fold_(e,t){const s={};return this.children.inorderTraversal((i,r)=>{s[i]=r.fold_(Y(e,i),t)}),t(e,this.value,s)}findOnPath(e,t){return this.findOnPath_(e,W(),t)}findOnPath_(e,t,s){const i=this.value?s(t,this.value):!1;if(i)return i;if(M(e))return null;{const r=D(e),o=this.children.get(r);return o?o.findOnPath_(G(e),Y(t,r),s):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,W(),t)}foreachOnPath_(e,t,s){if(M(e))return this;{this.value&&s(t,this.value);const i=D(e),r=this.children.get(i);return r?r.foreachOnPath_(G(e),Y(t,i),s):new K(null)}}foreach(e){this.foreach_(W(),e)}foreach_(e,t){this.children.inorderTraversal((s,i)=>{i.foreach_(Y(e,s),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,s)=>{s.value&&e(t,s.value)})}}/**
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
 */class Ne{constructor(e){this.writeTree_=e}static empty(){return new Ne(new K(null))}}function Mn(n,e,t){if(M(e))return new Ne(new K(t));{const s=n.writeTree_.findRootMostValueAndPath(e);if(s!=null){const i=s.path;let r=s.value;const o=de(i,e);return r=r.updateChild(o,t),new Ne(n.writeTree_.set(i,r))}else{const i=new K(t),r=n.writeTree_.setTree(e,i);return new Ne(r)}}}function Ar(n,e,t){let s=n;return he(t,(i,r)=>{s=Mn(s,Y(e,i),r)}),s}function tl(n,e){if(M(e))return Ne.empty();{const t=n.writeTree_.setTree(e,new K(null));return new Ne(t)}}function Rr(n,e){return Ht(n,e)!=null}function Ht(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(de(t.path,e)):null}function nl(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(J,(s,i)=>{e.push(new $(s,i))}):n.writeTree_.children.inorderTraversal((s,i)=>{i.value!=null&&e.push(new $(s,i.value))}),e}function lt(n,e){if(M(e))return n;{const t=Ht(n,e);return t!=null?new Ne(new K(t)):new Ne(n.writeTree_.subtree(e))}}function Pr(n){return n.writeTree_.isEmpty()}function un(n,e){return mu(W(),n.writeTree_,e)}function mu(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let s=null;return e.children.inorderTraversal((i,r)=>{i===".priority"?(I(r.value!==null,"Priority writes must always be leaf nodes"),s=r.value):t=mu(Y(n,i),r,t)}),!t.getChild(n).isEmpty()&&s!==null&&(t=t.updateChild(Y(n,".priority"),s)),t}}/**
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
 */function _i(n,e){return wu(e,n)}function Dg(n,e,t,s,i){I(s>n.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),n.allWrites.push({path:e,snap:t,writeId:s,visible:i}),i&&(n.visibleWrites=Mn(n.visibleWrites,e,t)),n.lastWriteId=s}function Lg(n,e,t,s){I(s>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:s,visible:!0}),n.visibleWrites=Ar(n.visibleWrites,e,t),n.lastWriteId=s}function Mg(n,e){for(let t=0;t<n.allWrites.length;t++){const s=n.allWrites[t];if(s.writeId===e)return s}return null}function $g(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);I(t>=0,"removeWrite called with nonexistent writeId.");const s=n.allWrites[t];n.allWrites.splice(t,1);let i=s.visible,r=!1,o=n.allWrites.length-1;for(;i&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&jg(a,s.path)?i=!1:Se(s.path,a.path)&&(r=!0)),o--}if(i){if(r)return Fg(n),!0;if(s.snap)n.visibleWrites=tl(n.visibleWrites,s.path);else{const a=s.children;he(a,l=>{n.visibleWrites=tl(n.visibleWrites,Y(s.path,l))})}return!0}else return!1}function jg(n,e){if(n.snap)return Se(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&Se(Y(n.path,t),e))return!0;return!1}function Fg(n){n.visibleWrites=_u(n.allWrites,Bg,W()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function Bg(n){return n.visible}function _u(n,e,t){let s=Ne.empty();for(let i=0;i<n.length;++i){const r=n[i];if(e(r)){const o=r.path;let a;if(r.snap)Se(t,o)?(a=de(t,o),s=Mn(s,a,r.snap)):Se(o,t)&&(a=de(o,t),s=Mn(s,W(),r.snap.getChild(a)));else if(r.children){if(Se(t,o))a=de(t,o),s=Ar(s,a,r.children);else if(Se(o,t))if(a=de(o,t),M(a))s=Ar(s,W(),r.children);else{const l=Lt(r.children,D(a));if(l){const c=l.getChild(G(a));s=Mn(s,W(),c)}}}else throw gn("WriteRecord should have .snap or .children")}}return s}function yu(n,e,t,s,i){if(!s&&!i){const r=Ht(n.visibleWrites,e);if(r!=null)return r;{const o=lt(n.visibleWrites,e);if(Pr(o))return t;if(t==null&&!Rr(o,W()))return null;{const a=t||P.EMPTY_NODE;return un(o,a)}}}else{const r=lt(n.visibleWrites,e);if(!i&&Pr(r))return t;if(!i&&t==null&&!Rr(r,W()))return null;{const o=function(c){return(c.visible||i)&&(!s||!~s.indexOf(c.writeId))&&(Se(c.path,e)||Se(e,c.path))},a=_u(n.allWrites,o,e),l=t||P.EMPTY_NODE;return un(a,l)}}}function Ug(n,e,t){let s=P.EMPTY_NODE;const i=Ht(n.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(J,(r,o)=>{s=s.updateImmediateChild(r,o)}),s;if(t){const r=lt(n.visibleWrites,e);return t.forEachChild(J,(o,a)=>{const l=un(lt(r,new V(o)),a);s=s.updateImmediateChild(o,l)}),nl(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const r=lt(n.visibleWrites,e);return nl(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function Wg(n,e,t,s,i){I(s||i,"Either existingEventSnap or existingServerSnap must exist");const r=Y(e,t);if(Rr(n.visibleWrites,r))return null;{const o=lt(n.visibleWrites,r);return Pr(o)?i.getChild(t):un(o,i.getChild(t))}}function Vg(n,e,t,s){const i=Y(e,t),r=Ht(n.visibleWrites,i);if(r!=null)return r;if(s.isCompleteForChild(t)){const o=lt(n.visibleWrites,i);return un(o,s.getNode().getImmediateChild(t))}else return null}function qg(n,e){return Ht(n.visibleWrites,e)}function Hg(n,e,t,s,i,r,o){let a;const l=lt(n.visibleWrites,e),c=Ht(l,W());if(c!=null)a=c;else if(t!=null)a=un(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],h=o.getCompare(),d=r?a.getReverseIteratorFrom(s,o):a.getIteratorFrom(s,o);let _=d.getNext();for(;_&&u.length<i;)h(_,s)!==0&&u.push(_),_=d.getNext();return u}else return[]}function zg(){return{visibleWrites:Ne.empty(),allWrites:[],lastWriteId:-1}}function zs(n,e,t,s){return yu(n.writeTree,n.treePath,e,t,s)}function To(n,e){return Ug(n.writeTree,n.treePath,e)}function sl(n,e,t,s){return Wg(n.writeTree,n.treePath,e,t,s)}function Ks(n,e){return qg(n.writeTree,Y(n.treePath,e))}function Kg(n,e,t,s,i,r){return Hg(n.writeTree,n.treePath,e,t,s,i,r)}function Io(n,e,t){return Vg(n.writeTree,n.treePath,e,t)}function vu(n,e){return wu(Y(n.treePath,e),n.writeTree)}function wu(n,e){return{treePath:n,writeTree:e}}/**
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
 */class Gg{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,s=e.childName;I(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),I(s!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(s);if(i){const r=i.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(s,Jn(s,e.snapshotNode,i.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(s);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(s,Gn(s,i.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(s,ln(s,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(s,Jn(s,e.snapshotNode,i.oldSnap));else throw gn("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
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
 */class Jg{getCompleteChild(e){return null}getChildAfterChild(e,t,s){return null}}const bu=new Jg;class ko{constructor(e,t,s=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=s}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new pt(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Io(this.writes_,e,s)}}getChildAfterChild(e,t,s){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Ft(this.viewCache_),r=Kg(this.writes_,i,t,1,s,e);return r.length===0?null:r[0]}}/**
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
 */function Yg(n){return{filter:n}}function Qg(n,e){I(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),I(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function Xg(n,e,t,s,i){const r=new Gg;let o,a;if(t.type===Pe.OVERWRITE){const c=t;c.source.fromUser?o=Or(n,e,c.path,c.snap,s,i,r):(I(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!M(c.path),o=Gs(n,e,c.path,c.snap,s,i,a,r))}else if(t.type===Pe.MERGE){const c=t;c.source.fromUser?o=em(n,e,c.path,c.children,s,i,r):(I(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=Nr(n,e,c.path,c.children,s,i,a,r))}else if(t.type===Pe.ACK_USER_WRITE){const c=t;c.revert?o=sm(n,e,c.path,s,i,r):o=tm(n,e,c.path,c.affectedTree,s,i,r)}else if(t.type===Pe.LISTEN_COMPLETE)o=nm(n,e,t.path,s,r);else throw gn("Unknown operation type: "+t.type);const l=r.getChanges();return Zg(e,o,l),{viewCache:o,changes:l}}function Zg(n,e,t){const s=e.eventCache;if(s.isFullyInitialized()){const i=s.getNode().isLeafNode()||s.getNode().isEmpty(),r=Hs(n);(t.length>0||!n.eventCache.isFullyInitialized()||i&&!s.getNode().equals(r)||!s.getNode().getPriority().equals(r.getPriority()))&&t.push(fu(Hs(e)))}}function Su(n,e,t,s,i,r){const o=e.eventCache;if(Ks(s,t)!=null)return e;{let a,l;if(M(t))if(I(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=Ft(e),u=c instanceof P?c:P.EMPTY_NODE,h=To(s,u);a=n.filter.updateFullNode(e.eventCache.getNode(),h,r)}else{const c=zs(s,Ft(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=D(t);if(c===".priority"){I(ft(t)===1,"Can't have a priority with additional path components");const u=o.getNode();l=e.serverCache.getNode();const h=sl(s,t,u,l);h!=null?a=n.filter.updatePriority(u,h):a=o.getNode()}else{const u=G(t);let h;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const d=sl(s,t,o.getNode(),l);d!=null?h=o.getNode().getImmediateChild(c).updateChild(u,d):h=o.getNode().getImmediateChild(c)}else h=Io(s,c,e.serverCache);h!=null?a=n.filter.updateChild(o.getNode(),c,h,u,i,r):a=o.getNode()}}return Ln(e,a,o.isFullyInitialized()||M(t),n.filter.filtersNodes())}}function Gs(n,e,t,s,i,r,o,a){const l=e.serverCache;let c;const u=o?n.filter:n.filter.getIndexedFilter();if(M(t))c=u.updateFullNode(l.getNode(),s,null);else if(u.filtersNodes()&&!l.isFiltered()){const _=l.getNode().updateChild(t,s);c=u.updateFullNode(l.getNode(),_,null)}else{const _=D(t);if(!l.isCompleteForPath(t)&&ft(t)>1)return e;const w=G(t),S=l.getNode().getImmediateChild(_).updateChild(w,s);_===".priority"?c=u.updatePriority(l.getNode(),S):c=u.updateChild(l.getNode(),_,S,w,bu,null)}const h=gu(e,c,l.isFullyInitialized()||M(t),u.filtersNodes()),d=new ko(i,h,r);return Su(n,h,t,i,d,a)}function Or(n,e,t,s,i,r,o){const a=e.eventCache;let l,c;const u=new ko(i,e,r);if(M(t))c=n.filter.updateFullNode(e.eventCache.getNode(),s,o),l=Ln(e,c,!0,n.filter.filtersNodes());else{const h=D(t);if(h===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),s),l=Ln(e,c,a.isFullyInitialized(),a.isFiltered());else{const d=G(t),_=a.getNode().getImmediateChild(h);let w;if(M(d))w=s;else{const E=u.getCompleteChild(h);E!=null?po(d)===".priority"&&E.getChild(ru(d)).isEmpty()?w=E:w=E.updateChild(d,s):w=P.EMPTY_NODE}if(_.equals(w))l=e;else{const E=n.filter.updateChild(a.getNode(),h,w,d,u,o);l=Ln(e,E,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function il(n,e){return n.eventCache.isCompleteForChild(e)}function em(n,e,t,s,i,r,o){let a=e;return s.foreach((l,c)=>{const u=Y(t,l);il(e,D(u))&&(a=Or(n,a,u,c,i,r,o))}),s.foreach((l,c)=>{const u=Y(t,l);il(e,D(u))||(a=Or(n,a,u,c,i,r,o))}),a}function rl(n,e,t){return t.foreach((s,i)=>{e=e.updateChild(s,i)}),e}function Nr(n,e,t,s,i,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;M(t)?c=s:c=new K(null).setTree(t,s);const u=e.serverCache.getNode();return c.children.inorderTraversal((h,d)=>{if(u.hasChild(h)){const _=e.serverCache.getNode().getImmediateChild(h),w=rl(n,_,d);l=Gs(n,l,new V(h),w,i,r,o,a)}}),c.children.inorderTraversal((h,d)=>{const _=!e.serverCache.isCompleteForChild(h)&&d.value===null;if(!u.hasChild(h)&&!_){const w=e.serverCache.getNode().getImmediateChild(h),E=rl(n,w,d);l=Gs(n,l,new V(h),E,i,r,o,a)}}),l}function tm(n,e,t,s,i,r,o){if(Ks(i,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(s.value!=null){if(M(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return Gs(n,e,t,l.getNode().getChild(t),i,r,a,o);if(M(t)){let c=new K(null);return l.getNode().forEachChild(xt,(u,h)=>{c=c.set(new V(u),h)}),Nr(n,e,t,c,i,r,a,o)}else return e}else{let c=new K(null);return s.foreach((u,h)=>{const d=Y(t,u);l.isCompleteForPath(d)&&(c=c.set(u,l.getNode().getChild(d)))}),Nr(n,e,t,c,i,r,a,o)}}function nm(n,e,t,s,i){const r=e.serverCache,o=gu(e,r.getNode(),r.isFullyInitialized()||M(t),r.isFiltered());return Su(n,o,t,s,bu,i)}function sm(n,e,t,s,i,r){let o;if(Ks(s,t)!=null)return e;{const a=new ko(s,e,i),l=e.eventCache.getNode();let c;if(M(t)||D(t)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=zs(s,Ft(e));else{const h=e.serverCache.getNode();I(h instanceof P,"serverChildren would be complete if leaf node"),u=To(s,h)}u=u,c=n.filter.updateFullNode(l,u,r)}else{const u=D(t);let h=Io(s,u,e.serverCache);h==null&&e.serverCache.isCompleteForChild(u)&&(h=l.getImmediateChild(u)),h!=null?c=n.filter.updateChild(l,u,h,G(t),a,r):e.eventCache.getNode().hasChild(u)?c=n.filter.updateChild(l,u,P.EMPTY_NODE,G(t),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=zs(s,Ft(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||Ks(s,W())!=null,Ln(e,c,o,n.filter.filtersNodes())}}/**
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
 */class im{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,i=new vo(s.getIndex()),r=wg(s);this.processor_=Yg(r);const o=t.serverCache,a=t.eventCache,l=i.updateFullNode(P.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(P.EMPTY_NODE,a.getNode(),null),u=new pt(l,o.isFullyInitialized(),i.filtersNodes()),h=new pt(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=mi(h,u),this.eventGenerator_=new Rg(this.query_)}get query(){return this.query_}}function rm(n){return n.viewCache_.serverCache.getNode()}function om(n){return Hs(n.viewCache_)}function am(n,e){const t=Ft(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!M(e)&&!t.getImmediateChild(D(e)).isEmpty())?t.getChild(e):null}function ol(n){return n.eventRegistrations_.length===0}function lm(n,e){n.eventRegistrations_.push(e)}function al(n,e,t){const s=[];if(t){I(e==null,"A cancel should cancel all event registrations.");const i=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,i);o&&s.push(o)})}if(e){let i=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=i}else n.eventRegistrations_=[];return s}function ll(n,e,t,s){e.type===Pe.MERGE&&e.source.queryId!==null&&(I(Ft(n.viewCache_),"We should always have a full cache before handling merges"),I(Hs(n.viewCache_),"Missing event cache, even though we have a server cache"));const i=n.viewCache_,r=Xg(n.processor_,i,e,t,s);return Qg(n.processor_,r.viewCache),I(r.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,Eu(n,r.changes,r.viewCache.eventCache.getNode(),null)}function cm(n,e){const t=n.viewCache_.eventCache,s=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(J,(r,o)=>{s.push(ln(r,o))}),t.isFullyInitialized()&&s.push(fu(t.getNode())),Eu(n,s,t.getNode(),e)}function Eu(n,e,t,s){const i=s?[s]:n.eventRegistrations_;return Pg(n.eventGenerator_,e,t,i)}/**
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
 */let Js;class Tu{constructor(){this.views=new Map}}function um(n){I(!Js,"__referenceConstructor has already been defined"),Js=n}function hm(){return I(Js,"Reference.ts has not been loaded"),Js}function dm(n){return n.views.size===0}function Co(n,e,t,s){const i=e.source.queryId;if(i!==null){const r=n.views.get(i);return I(r!=null,"SyncTree gave us an op for an invalid query."),ll(r,e,t,s)}else{let r=[];for(const o of n.views.values())r=r.concat(ll(o,e,t,s));return r}}function Iu(n,e,t,s,i){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=zs(t,i?s:null),l=!1;a?l=!0:s instanceof P?(a=To(t,s),l=!1):(a=P.EMPTY_NODE,l=!1);const c=mi(new pt(a,l,!1),new pt(s,i,!1));return new im(e,c)}return o}function fm(n,e,t,s,i,r){const o=Iu(n,e,s,i,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),lm(o,t),cm(o,t)}function pm(n,e,t,s){const i=e._queryIdentifier,r=[];let o=[];const a=gt(n);if(i==="default")for(const[l,c]of n.views.entries())o=o.concat(al(c,t,s)),ol(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=n.views.get(i);l&&(o=o.concat(al(l,t,s)),ol(l)&&(n.views.delete(i),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!gt(n)&&r.push(new(hm())(e._repo,e._path)),{removed:r,events:o}}function ku(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function ct(n,e){let t=null;for(const s of n.views.values())t=t||am(s,e);return t}function Cu(n,e){if(e._queryParams.loadsAllData())return yi(n);{const s=e._queryIdentifier;return n.views.get(s)}}function Au(n,e){return Cu(n,e)!=null}function gt(n){return yi(n)!=null}function yi(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
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
 */let Ys;function gm(n){I(!Ys,"__referenceConstructor has already been defined"),Ys=n}function mm(){return I(Ys,"Reference.ts has not been loaded"),Ys}let _m=1;class cl{constructor(e){this.listenProvider_=e,this.syncPointTree_=new K(null),this.pendingWriteTree_=zg(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Ao(n,e,t,s,i){return Dg(n.pendingWriteTree_,e,t,s,i),i?yn(n,new jt(bo(),e,t)):[]}function ym(n,e,t,s){Lg(n.pendingWriteTree_,e,t,s);const i=K.fromObject(t);return yn(n,new cn(bo(),e,i))}function ot(n,e,t=!1){const s=Mg(n.pendingWriteTree_,e);if($g(n.pendingWriteTree_,e)){let r=new K(null);return s.snap!=null?r=r.set(W(),!0):he(s.children,o=>{r=r.set(new V(o),!0)}),yn(n,new qs(s.path,r,t))}else return[]}function us(n,e,t){return yn(n,new jt(So(),e,t))}function vm(n,e,t){const s=K.fromObject(t);return yn(n,new cn(So(),e,s))}function wm(n,e){return yn(n,new Qn(So(),e))}function bm(n,e,t){const s=Ro(n,t);if(s){const i=Po(s),r=i.path,o=i.queryId,a=de(r,e),l=new Qn(Eo(o),a);return Oo(n,r,l)}else return[]}function Qs(n,e,t,s,i=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||Au(o,e))){const l=pm(o,e,t,s);dm(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!i){const u=c.findIndex(d=>d._queryParams.loadsAllData())!==-1,h=n.syncPointTree_.findOnPath(r,(d,_)=>gt(_));if(u&&!h){const d=n.syncPointTree_.subtree(r);if(!d.isEmpty()){const _=Tm(d);for(let w=0;w<_.length;++w){const E=_[w],S=E.query,R=Nu(n,E);n.listenProvider_.startListening($n(S),Xn(n,S),R.hashFn,R.onComplete)}}}!h&&c.length>0&&!s&&(u?n.listenProvider_.stopListening($n(e),null):c.forEach(d=>{const _=n.queryToTagMap.get(wi(d));n.listenProvider_.stopListening($n(d),_)}))}Im(n,c)}return a}function Ru(n,e,t,s){const i=Ro(n,s);if(i!=null){const r=Po(i),o=r.path,a=r.queryId,l=de(o,e),c=new jt(Eo(a),l,t);return Oo(n,o,c)}else return[]}function Sm(n,e,t,s){const i=Ro(n,s);if(i){const r=Po(i),o=r.path,a=r.queryId,l=de(o,e),c=K.fromObject(t),u=new cn(Eo(a),l,c);return Oo(n,o,u)}else return[]}function xr(n,e,t,s=!1){const i=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(i,(d,_)=>{const w=de(d,i);r=r||ct(_,w),o=o||gt(_)});let a=n.syncPointTree_.get(i);a?(o=o||gt(a),r=r||ct(a,W())):(a=new Tu,n.syncPointTree_=n.syncPointTree_.set(i,a));let l;r!=null?l=!0:(l=!1,r=P.EMPTY_NODE,n.syncPointTree_.subtree(i).foreachChild((_,w)=>{const E=ct(w,W());E&&(r=r.updateImmediateChild(_,E))}));const c=Au(a,e);if(!c&&!e._queryParams.loadsAllData()){const d=wi(e);I(!n.queryToTagMap.has(d),"View does not exist, but we have a tag");const _=km();n.queryToTagMap.set(d,_),n.tagToQueryMap.set(_,d)}const u=_i(n.pendingWriteTree_,i);let h=fm(a,e,t,u,r,l);if(!c&&!o&&!s){const d=Cu(a,e);h=h.concat(Cm(n,e,d))}return h}function vi(n,e,t){const i=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=de(o,e),c=ct(a,l);if(c)return c});return yu(i,e,r,t,!0)}function Em(n,e){const t=e._path;let s=null;n.syncPointTree_.foreachOnPath(t,(c,u)=>{const h=de(c,t);s=s||ct(u,h)});let i=n.syncPointTree_.get(t);i?s=s||ct(i,W()):(i=new Tu,n.syncPointTree_=n.syncPointTree_.set(t,i));const r=s!=null,o=r?new pt(s,!0,!1):null,a=_i(n.pendingWriteTree_,e._path),l=Iu(i,e,a,r?o.getNode():P.EMPTY_NODE,r);return om(l)}function yn(n,e){return Pu(e,n.syncPointTree_,null,_i(n.pendingWriteTree_,W()))}function Pu(n,e,t,s){if(M(n.path))return Ou(n,e,t,s);{const i=e.get(W());t==null&&i!=null&&(t=ct(i,W()));let r=[];const o=D(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,u=vu(s,o);r=r.concat(Pu(a,l,c,u))}return i&&(r=r.concat(Co(i,n,s,t))),r}}function Ou(n,e,t,s){const i=e.get(W());t==null&&i!=null&&(t=ct(i,W()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=vu(s,o),u=n.operationForChild(o);u&&(r=r.concat(Ou(u,a,l,c)))}),i&&(r=r.concat(Co(i,n,s,t))),r}function Nu(n,e){const t=e.query,s=Xn(n,t);return{hashFn:()=>(rm(e)||P.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return s?bm(n,t._path,s):wm(n,t._path);{const r=wp(i,t);return Qs(n,t,null,r)}}}}function Xn(n,e){const t=wi(e);return n.queryToTagMap.get(t)}function wi(n){return n._path.toString()+"$"+n._queryIdentifier}function Ro(n,e){return n.tagToQueryMap.get(e)}function Po(n){const e=n.indexOf("$");return I(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new V(n.substr(0,e))}}function Oo(n,e,t){const s=n.syncPointTree_.get(e);I(s,"Missing sync point for query tag that we're tracking");const i=_i(n.pendingWriteTree_,e);return Co(s,t,i,null)}function Tm(n){return n.fold((e,t,s)=>{if(t&&gt(t))return[yi(t)];{let i=[];return t&&(i=ku(t)),he(s,(r,o)=>{i=i.concat(o)}),i}})}function $n(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(mm())(n._repo,n._path):n}function Im(n,e){for(let t=0;t<e.length;++t){const s=e[t];if(!s._queryParams.loadsAllData()){const i=wi(s),r=n.queryToTagMap.get(i);n.queryToTagMap.delete(i),n.tagToQueryMap.delete(r)}}}function km(){return _m++}function Cm(n,e,t){const s=e._path,i=Xn(n,e),r=Nu(n,t),o=n.listenProvider_.startListening($n(e),i,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(s);if(i)I(!gt(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,u,h)=>{if(!M(c)&&u&&gt(u))return[yi(u).query];{let d=[];return u&&(d=d.concat(ku(u).map(_=>_.query))),he(h,(_,w)=>{d=d.concat(w)}),d}});for(let c=0;c<l.length;++c){const u=l[c];n.listenProvider_.stopListening($n(u),Xn(n,u))}}return o}/**
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
 */class No{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new No(t)}node(){return this.node_}}class xo{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=Y(this.path_,e);return new xo(this.syncTree_,t)}node(){return vi(this.syncTree_,this.path_)}}const Am=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},ul=function(n,e,t){if(!n||typeof n!="object")return n;if(I(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return Rm(n[".sv"],e,t);if(typeof n[".sv"]=="object")return Pm(n[".sv"],e);I(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},Rm=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:I(!1,"Unexpected server value: "+n)}},Pm=function(n,e,t){n.hasOwnProperty("increment")||I(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const s=n.increment;typeof s!="number"&&I(!1,"Unexpected increment value: "+s);const i=e.node();if(I(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return s;const o=i.getValue();return typeof o!="number"?s:o+s},xu=function(n,e,t,s){return Lo(e,new xo(t,n),s)},Do=function(n,e,t){return Lo(n,new No(e),t)};function Lo(n,e,t){const s=n.getPriority().val(),i=ul(s,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=ul(o.getValue(),e,t);return a!==o.getValue()||i!==o.getPriority().val()?new re(a,X(i)):n}else{const o=n;return r=o,i!==o.getPriority().val()&&(r=r.updatePriority(new re(i))),o.forEachChild(J,(a,l)=>{const c=Lo(l,e.getImmediateChild(a),t);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
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
 */class Mo{constructor(e="",t=null,s={children:{},childCount:0}){this.name=e,this.parent=t,this.node=s}}function bi(n,e){let t=e instanceof V?e:new V(e),s=n,i=D(t);for(;i!==null;){const r=Lt(s.node.children,i)||{children:{},childCount:0};s=new Mo(i,s,r),t=G(t),i=D(t)}return s}function zt(n){return n.node.value}function $o(n,e){n.node.value=e,Dr(n)}function Du(n){return n.node.childCount>0}function Om(n){return zt(n)===void 0&&!Du(n)}function Si(n,e){he(n.node.children,(t,s)=>{e(new Mo(t,n,s))})}function Lu(n,e,t,s){t&&e(n),Si(n,i=>{Lu(i,e,!0)})}function Nm(n,e,t){let s=n.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function hs(n){return new V(n.parent===null?n.name:hs(n.parent)+"/"+n.name)}function Dr(n){n.parent!==null&&xm(n.parent,n.name,n)}function xm(n,e,t){const s=Om(t),i=De(n.node.children,e);s&&i?(delete n.node.children[e],n.node.childCount--,Dr(n)):!s&&!i&&(n.node.children[e]=t.node,n.node.childCount++,Dr(n))}/**
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
 */const Dm=/[\[\].#$\/\u0000-\u001F\u007F]/,Lm=/[\[\].#$\u0000-\u001F\u007F]/,Xi=10*1024*1024,jo=function(n){return typeof n=="string"&&n.length!==0&&!Dm.test(n)},Mu=function(n){return typeof n=="string"&&n.length!==0&&!Lm.test(n)},Mm=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Mu(n)},Xs=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!lo(n)||n&&typeof n=="object"&&De(n,".sv")},$u=function(n,e,t,s){s&&e===void 0||ds(hi(n,"value"),e,t)},ds=function(n,e,t){const s=t instanceof V?new eg(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+Tt(s));if(typeof e=="function")throw new Error(n+"contains a function "+Tt(s)+" with contents = "+e.toString());if(lo(e))throw new Error(n+"contains "+e.toString()+" "+Tt(s));if(typeof e=="string"&&e.length>Xi/3&&di(e)>Xi)throw new Error(n+"contains a string greater than "+Xi+" utf8 bytes "+Tt(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,r=!1;if(he(e,(o,a)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!jo(o)))throw new Error(n+" contains an invalid key ("+o+") "+Tt(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);tg(s,o),ds(n,a,s),ng(s)}),i&&r)throw new Error(n+' contains ".value" child '+Tt(s)+" in addition to actual children.")}},$m=function(n,e){let t,s;for(t=0;t<e.length;t++){s=e[t];const r=Kn(s);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!jo(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+s.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(Zp);let i=null;for(t=0;t<e.length;t++){if(s=e[t],i!==null&&Se(i,s))throw new Error(n+"contains a path "+i.toString()+" that is ancestor of another path "+s.toString());i=s}},jm=function(n,e,t,s){const i=hi(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(i+" must be an object containing the children to replace.");const r=[];he(e,(o,a)=>{const l=new V(o);if(ds(i,a,Y(t,l)),po(l)===".priority"&&!Xs(a))throw new Error(i+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),$m(i,r)},Fo=function(n,e,t,s){if(!Mu(t))throw new Error(hi(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},Fm=function(n,e,t,s){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Fo(n,e,t)},Ei=function(n,e){if(D(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},Bm=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!jo(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!Mm(t))throw new Error(hi(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
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
 */class Um{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Ti(n,e){let t=null;for(let s=0;s<e.length;s++){const i=e[s],r=i.getPath();t!==null&&!go(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(i)}t&&n.eventLists_.push(t)}function ju(n,e,t){Ti(n,t),Fu(n,s=>go(s,e))}function we(n,e,t){Ti(n,t),Fu(n,s=>Se(s,e)||Se(e,s))}function Fu(n,e){n.recursionDepth_++;let t=!0;for(let s=0;s<n.eventLists_.length;s++){const i=n.eventLists_[s];if(i){const r=i.path;e(r)?(Wm(n.eventLists_[s]),n.eventLists_[s]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function Wm(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const s=t.getEventRunner();xn&&le("event: "+t.toString()),_n(s)}}}/**
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
 */const Vm="repo_interrupt",qm=25;class Hm{constructor(e,t,s,i){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=s,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Um,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Vs(),this.transactionQueueTree_=new Mo,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function zm(n,e,t){if(n.stats_=ho(n.repoInfo_),n.forceRestClient_||Tp())n.server_=new Ws(n.repoInfo_,(s,i,r,o)=>{hl(n,s,i,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>dl(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{ne(t)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}n.persistentConnection_=new Xe(n.repoInfo_,e,(s,i,r,o)=>{hl(n,s,i,r,o)},s=>{dl(n,s)},s=>{Km(n,s)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(s=>{n.server_.refreshAuthToken(s)}),n.appCheckProvider_.addTokenChangeListener(s=>{n.server_.refreshAppCheckToken(s.token)}),n.statsReporter_=Rp(n.repoInfo_,()=>new Ag(n.stats_,n.server_)),n.infoData_=new Eg,n.infoSyncTree_=new cl({startListening:(s,i,r,o)=>{let a=[];const l=n.infoData_.getNode(s._path);return l.isEmpty()||(a=us(n.infoSyncTree_,s._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Bo(n,"connected",!1),n.serverSyncTree_=new cl({startListening:(s,i,r,o)=>(n.server_.listen(s,r,i,(a,l)=>{const c=o(a,l);we(n.eventQueue_,s._path,c)}),[]),stopListening:(s,i)=>{n.server_.unlisten(s,i)}})}function Bu(n){const t=n.infoData_.getNode(new V(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function fs(n){return Am({timestamp:Bu(n)})}function hl(n,e,t,s,i){n.dataUpdateCount++;const r=new V(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(i)if(s){const l=Ds(t,c=>X(c));o=Sm(n.serverSyncTree_,r,l,i)}else{const l=X(t);o=Ru(n.serverSyncTree_,r,l,i)}else if(s){const l=Ds(t,c=>X(c));o=vm(n.serverSyncTree_,r,l)}else{const l=X(t);o=us(n.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=hn(n,r)),we(n.eventQueue_,a,o)}function dl(n,e){Bo(n,"connected",e),e===!1&&Qm(n)}function Km(n,e){he(e,(t,s)=>{Bo(n,t,s)})}function Bo(n,e,t){const s=new V("/.info/"+e),i=X(t);n.infoData_.updateSnapshot(s,i);const r=us(n.infoSyncTree_,s,i);we(n.eventQueue_,s,r)}function Ii(n){return n.nextWriteId_++}function Gm(n,e,t){const s=Em(n.serverSyncTree_,e);return s!=null?Promise.resolve(s):n.server_.get(e).then(i=>{const r=X(i).withIndex(e._queryParams.getIndex());xr(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=us(n.serverSyncTree_,e._path,r);else{const a=Xn(n.serverSyncTree_,e);o=Ru(n.serverSyncTree_,e._path,r,a)}return we(n.eventQueue_,e._path,o),Qs(n.serverSyncTree_,e,t,null,!0),r},i=>(vn(n,"get for query "+ne(e)+" failed: "+i),Promise.reject(new Error(i))))}function Jm(n,e,t,s,i){vn(n,"set",{path:e.toString(),value:t,priority:s});const r=fs(n),o=X(t,s),a=vi(n.serverSyncTree_,e),l=Do(o,a,r),c=Ii(n),u=Ao(n.serverSyncTree_,e,l,c,!0);Ti(n.eventQueue_,u),n.server_.put(e.toString(),o.val(!0),(d,_)=>{const w=d==="ok";w||fe("set at "+e+" failed: "+d);const E=ot(n.serverSyncTree_,c,!w);we(n.eventQueue_,e,E),Lr(n,i,d,_)});const h=Wo(n,e);hn(n,h),we(n.eventQueue_,h,[])}function Ym(n,e,t,s){vn(n,"update",{path:e.toString(),value:t});let i=!0;const r=fs(n),o={};if(he(t,(a,l)=>{i=!1,o[a]=xu(Y(e,a),X(l),n.serverSyncTree_,r)}),i)le("update() called with empty data.  Don't do anything."),Lr(n,s,"ok",void 0);else{const a=Ii(n),l=ym(n.serverSyncTree_,e,o,a);Ti(n.eventQueue_,l),n.server_.merge(e.toString(),t,(c,u)=>{const h=c==="ok";h||fe("update at "+e+" failed: "+c);const d=ot(n.serverSyncTree_,a,!h),_=d.length>0?hn(n,e):e;we(n.eventQueue_,_,d),Lr(n,s,c,u)}),he(t,c=>{const u=Wo(n,Y(e,c));hn(n,u)}),we(n.eventQueue_,e,[])}}function Qm(n){vn(n,"onDisconnectEvents");const e=fs(n),t=Vs();Cr(n.onDisconnect_,W(),(i,r)=>{const o=xu(i,r,n.serverSyncTree_,e);pu(t,i,o)});let s=[];Cr(t,W(),(i,r)=>{s=s.concat(us(n.serverSyncTree_,i,r));const o=Wo(n,i);hn(n,o)}),n.onDisconnect_=Vs(),we(n.eventQueue_,W(),s)}function Xm(n,e,t){let s;D(e._path)===".info"?s=xr(n.infoSyncTree_,e,t):s=xr(n.serverSyncTree_,e,t),ju(n.eventQueue_,e._path,s)}function Zm(n,e,t){let s;D(e._path)===".info"?s=Qs(n.infoSyncTree_,e,t):s=Qs(n.serverSyncTree_,e,t),ju(n.eventQueue_,e._path,s)}function e_(n){n.persistentConnection_&&n.persistentConnection_.interrupt(Vm)}function vn(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),le(t,...e)}function Lr(n,e,t,s){e&&_n(()=>{if(t==="ok")e(null);else{const i=(t||"error").toUpperCase();let r=i;s&&(r+=": "+s);const o=new Error(r);o.code=i,e(o)}})}function t_(n,e,t,s,i,r){vn(n,"transaction on "+e);const o={path:e,update:t,onComplete:s,status:null,order:$c(),applyLocally:r,retryCount:0,unwatcher:i,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},a=Uo(n,e,void 0);o.currentInputSnapshot=a;const l=o.update(a.val());if(l===void 0)o.unwatcher(),o.currentOutputSnapshotRaw=null,o.currentOutputSnapshotResolved=null,o.onComplete&&o.onComplete(null,!1,o.currentInputSnapshot);else{ds("transaction failed: Data returned ",l,o.path),o.status=0;const c=bi(n.transactionQueueTree_,e),u=zt(c)||[];u.push(o),$o(c,u);let h;typeof l=="object"&&l!==null&&De(l,".priority")?(h=Lt(l,".priority"),I(Xs(h),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):h=(vi(n.serverSyncTree_,e)||P.EMPTY_NODE).getPriority().val();const d=fs(n),_=X(l,h),w=Do(_,a,d);o.currentOutputSnapshotRaw=_,o.currentOutputSnapshotResolved=w,o.currentWriteId=Ii(n);const E=Ao(n.serverSyncTree_,e,w,o.currentWriteId,o.applyLocally);we(n.eventQueue_,e,E),ki(n,n.transactionQueueTree_)}}function Uo(n,e,t){return vi(n.serverSyncTree_,e,t)||P.EMPTY_NODE}function ki(n,e=n.transactionQueueTree_){if(e||Ci(n,e),zt(e)){const t=Wu(n,e);I(t.length>0,"Sending zero length transaction queue"),t.every(i=>i.status===0)&&n_(n,hs(e),t)}else Du(e)&&Si(e,t=>{ki(n,t)})}function n_(n,e,t){const s=t.map(c=>c.currentWriteId),i=Uo(n,e,s);let r=i;const o=i.hash();for(let c=0;c<t.length;c++){const u=t[c];I(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const h=de(e,u.path);r=r.updateChild(h,u.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;n.server_.put(l.toString(),a,c=>{vn(n,"transaction put response",{path:l.toString(),status:c});let u=[];if(c==="ok"){const h=[];for(let d=0;d<t.length;d++)t[d].status=2,u=u.concat(ot(n.serverSyncTree_,t[d].currentWriteId)),t[d].onComplete&&h.push(()=>t[d].onComplete(null,!0,t[d].currentOutputSnapshotResolved)),t[d].unwatcher();Ci(n,bi(n.transactionQueueTree_,e)),ki(n,n.transactionQueueTree_),we(n.eventQueue_,e,u);for(let d=0;d<h.length;d++)_n(h[d])}else{if(c==="datastale")for(let h=0;h<t.length;h++)t[h].status===3?t[h].status=4:t[h].status=0;else{fe("transaction at "+l.toString()+" failed: "+c);for(let h=0;h<t.length;h++)t[h].status=4,t[h].abortReason=c}hn(n,e)}},o)}function hn(n,e){const t=Uu(n,e),s=hs(t),i=Wu(n,t);return s_(n,i,s),s}function s_(n,e,t){if(e.length===0)return;const s=[];let i=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=de(t,l.path);let u=!1,h;if(I(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)u=!0,h=l.abortReason,i=i.concat(ot(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=qm)u=!0,h="maxretry",i=i.concat(ot(n.serverSyncTree_,l.currentWriteId,!0));else{const d=Uo(n,l.path,o);l.currentInputSnapshot=d;const _=e[a].update(d.val());if(_!==void 0){ds("transaction failed: Data returned ",_,l.path);let w=X(_);typeof _=="object"&&_!=null&&De(_,".priority")||(w=w.updatePriority(d.getPriority()));const S=l.currentWriteId,R=fs(n),j=Do(w,d,R);l.currentOutputSnapshotRaw=w,l.currentOutputSnapshotResolved=j,l.currentWriteId=Ii(n),o.splice(o.indexOf(S),1),i=i.concat(Ao(n.serverSyncTree_,l.path,j,l.currentWriteId,l.applyLocally)),i=i.concat(ot(n.serverSyncTree_,S,!0))}else u=!0,h="nodata",i=i.concat(ot(n.serverSyncTree_,l.currentWriteId,!0))}we(n.eventQueue_,t,i),i=[],u&&(e[a].status=2,function(d){setTimeout(d,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(h==="nodata"?s.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):s.push(()=>e[a].onComplete(new Error(h),!1,null))))}Ci(n,n.transactionQueueTree_);for(let a=0;a<s.length;a++)_n(s[a]);ki(n,n.transactionQueueTree_)}function Uu(n,e){let t,s=n.transactionQueueTree_;for(t=D(e);t!==null&&zt(s)===void 0;)s=bi(s,t),e=G(e),t=D(e);return s}function Wu(n,e){const t=[];return Vu(n,e,t),t.sort((s,i)=>s.order-i.order),t}function Vu(n,e,t){const s=zt(e);if(s)for(let i=0;i<s.length;i++)t.push(s[i]);Si(e,i=>{Vu(n,i,t)})}function Ci(n,e){const t=zt(e);if(t){let s=0;for(let i=0;i<t.length;i++)t[i].status!==2&&(t[s]=t[i],s++);t.length=s,$o(e,t.length>0?t:void 0)}Si(e,s=>{Ci(n,s)})}function Wo(n,e){const t=hs(Uu(n,e)),s=bi(n.transactionQueueTree_,e);return Nm(s,i=>{Zi(n,i)}),Zi(n,s),Lu(s,i=>{Zi(n,i)}),t}function Zi(n,e){const t=zt(e);if(t){const s=[];let i=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(I(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(I(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),i=i.concat(ot(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&s.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?$o(e,void 0):t.length=r+1,we(n.eventQueue_,hs(e),i);for(let o=0;o<s.length;o++)_n(s[o])}}/**
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
 */function i_(n){let e="";const t=n.split("/");for(let s=0;s<t.length;s++)if(t[s].length>0){let i=t[s];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function r_(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const s=t.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):fe(`Invalid query segment '${t}' in query '${n}'`)}return e}const fl=function(n,e){const t=o_(n),s=t.namespace;t.domain==="firebase.com"&&tt(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&t.domain!=="localhost"&&tt("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||gp();const i=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Yc(t.host,t.secure,s,i,e,"",s!==t.subdomain),path:new V(t.pathString)}},o_=function(n){let e="",t="",s="",i="",r="",o=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let u=n.indexOf("/");u===-1&&(u=n.length);let h=n.indexOf("?");h===-1&&(h=n.length),e=n.substring(0,Math.min(u,h)),u<h&&(i=i_(n.substring(u,h)));const d=r_(n.substring(Math.min(n.length,h)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const _=e.slice(0,c);if(_.toLowerCase()==="localhost")t="localhost";else if(_.split(".").length<=2)t=_;else{const w=e.indexOf(".");s=e.substring(0,w).toLowerCase(),t=e.substring(w+1),r=s}"ns"in d&&(r=d.ns)}return{host:e,port:l,domain:t,subdomain:s,secure:o,scheme:a,pathString:i,namespace:r}};/**
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
 */const pl="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",a_=function(){let n=0;const e=[];return function(t){const s=t===n;n=t;let i;const r=new Array(8);for(i=7;i>=0;i--)r[i]=pl.charAt(t%64),t=Math.floor(t/64);I(t===0,"Cannot push at time == 0");let o=r.join("");if(s){for(i=11;i>=0&&e[i]===63;i--)e[i]=0;e[i]++}else for(i=0;i<12;i++)e[i]=Math.floor(Math.random()*64);for(i=0;i<12;i++)o+=pl.charAt(e[i]);return I(o.length===20,"nextPushId: Length should be 20."),o}}();/**
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
 */class l_{constructor(e,t,s,i){this.eventType=e,this.eventRegistration=t,this.snapshot=s,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+ne(this.snapshot.exportVal())}}class c_{constructor(e,t,s){this.eventRegistration=e,this.error=t,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
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
 */class qu{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return I(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class ps{constructor(e,t,s,i){this._repo=e,this._path=t,this._queryParams=s,this._orderByCalled=i}get key(){return M(this._path)?null:po(this._path)}get ref(){return new We(this._repo,this._path)}get _queryIdentifier(){const e=Za(this._queryParams),t=co(e);return t==="{}"?"default":t}get _queryObject(){return Za(this._queryParams)}isEqual(e){if(e=ve(e),!(e instanceof ps))return!1;const t=this._repo===e._repo,s=go(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return t&&s&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+Xp(this._path)}}function u_(n,e){if(n._orderByCalled===!0)throw new Error(e+": You can't combine multiple orderBy calls.")}function h_(n){let e=null,t=null;if(n.hasStart()&&(e=n.getIndexStartValue()),n.hasEnd()&&(t=n.getIndexEndValue()),n.getIndex()===xt){const s="Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",i="Query: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string.";if(n.hasStart()){if(n.getIndexStartName()!==$t)throw new Error(s);if(typeof e!="string")throw new Error(i)}if(n.hasEnd()){if(n.getIndexEndName()!==dt)throw new Error(s);if(typeof t!="string")throw new Error(i)}}else if(n.getIndex()===J){if(e!=null&&!Xs(e)||t!=null&&!Xs(t))throw new Error("Query: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string).")}else if(I(n.getIndex()instanceof yo||n.getIndex()===du,"unknown index type."),e!=null&&typeof e=="object"||t!=null&&typeof t=="object")throw new Error("Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.")}class We extends ps{constructor(e,t){super(e,t,new wo,!1)}get parent(){const e=ru(this._path);return e===null?null:new We(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class dn{constructor(e,t,s){this._node=e,this.ref=t,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new V(e),s=Zn(this.ref,e);return new dn(this._node.getChild(t),s,J)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,i)=>e(new dn(i,Zn(this.ref,s),J)))}hasChild(e){const t=new V(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function C(n,e){return n=ve(n),n._checkNotDeleted("ref"),e!==void 0?Zn(n._root,e):n._root}function Zn(n,e){return n=ve(n),D(n._path)===null?Fm("child","path",e):Fo("child","path",e),new We(n._repo,Y(n._path,e))}function Zs(n,e){n=ve(n),Ei("push",n._path),$u("push",e,n._path,!0);const t=Bu(n._repo),s=a_(t),i=Zn(n,s),r=Zn(n,s);let o;return e!=null?o=Le(r,e).then(()=>r):o=Promise.resolve(r),i.then=o.then.bind(o),i.catch=o.then.bind(o,void 0),i}function pe(n){return Ei("remove",n._path),Le(n,null)}function Le(n,e){n=ve(n),Ei("set",n._path),$u("set",e,n._path,!1);const t=new mn;return Jm(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function mt(n,e){jm("update",e,n._path);const t=new mn;return Ym(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function ae(n){n=ve(n);const e=new qu(()=>{}),t=new Ai(e);return Gm(n._repo,n,t).then(s=>new dn(s,new We(n._repo,n._path),n._queryParams.getIndex()))}class Ai{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const s=t._queryParams.getIndex();return new l_("value",this,new dn(e.snapshotNode,new We(t._repo,t._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new c_(this,e,t):null}matches(e){return e instanceof Ai?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function d_(n,e,t,s,i){const r=new qu(t,void 0),o=new Ai(r);return Xm(n._repo,n,o),()=>Zm(n._repo,n,o)}function nt(n,e,t,s){return d_(n,"value",e)}class Hu{}class f_ extends Hu{constructor(e){super(),this._limit=e,this.type="limitToLast"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).");return new ps(e._repo,e._path,bg(e._queryParams,this._limit),e._orderByCalled)}}function p_(n){if(Math.floor(n)!==n||n<=0)throw new Error("limitToLast: First argument must be a positive integer.");return new f_(n)}class g_ extends Hu{constructor(e){super(),this._path=e,this.type="orderByChild"}_apply(e){u_(e,"orderByChild");const t=new V(this._path);if(M(t))throw new Error("orderByChild: cannot pass in empty path. Use orderByValue() instead.");const s=new yo(t),i=Sg(e._queryParams,s);return h_(i),new ps(e._repo,e._path,i,!0)}}function m_(n){return Fo("orderByChild","path",n),new g_(n)}function __(n,...e){let t=ve(n);for(const s of e)t=s._apply(t);return t}um(We);gm(We);/**
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
 */const y_="FIREBASE_DATABASE_EMULATOR_HOST",Mr={};let v_=!1;function w_(n,e,t,s){const i=e.lastIndexOf(":"),r=e.substring(0,i),o=ci(r);n.repoInfo_=new Yc(e,o,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),s&&(n.authTokenProvider_=s)}function b_(n,e,t,s,i){let r=s||n.options.databaseURL;r===void 0&&(n.options.projectId||tt("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),le("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=fl(r,i),a=o.repoInfo,l;typeof process<"u"&&La&&(l=La[y_]),l?(r=`http://${l}?ns=${a.namespace}`,o=fl(r,i),a=o.repoInfo):o.repoInfo.secure;const c=new kp(n.name,n.options,e);Bm("Invalid Firebase Database URL",o),M(o.path)||tt("Database URL must point to the root of a Firebase Database (not including a child path).");const u=E_(a,n,c,new Ip(n,t));return new T_(u,n)}function S_(n,e){const t=Mr[e];(!t||t[n.key]!==n)&&tt(`Database ${e}(${n.repoInfo_}) has already been deleted.`),e_(n),delete t[n.key]}function E_(n,e,t,s){let i=Mr[e.name];i||(i={},Mr[e.name]=i);let r=i[n.toURLString()];return r&&tt("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new Hm(n,v_,t,s),i[n.toURLString()]=r,r}class T_{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(zm(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new We(this._repo,W())),this._rootInternal}_delete(){return this._rootInternal!==null&&(S_(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&tt("Cannot call "+e+" on a deleted database.")}}function I_(n=ro(),e){const t=rs(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const s=_c("database");s&&k_(t,...s)}return t}function k_(n,e,t,s={}){n=ve(n),n._checkNotDeleted("useEmulator");const i=`${e}:${t}`,r=n._repoInternal;if(n._instanceStarted){if(i===n._repoInternal.repoInfo_.host&&Ls(s,r.repoInfo_.emulatorOptions))return;tt("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)s.mockUserToken&&tt('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new As(As.OWNER);else if(s.mockUserToken){const a=typeof s.mockUserToken=="string"?s.mockUserToken:wc(s.mockUserToken,n.app.options.projectId);o=new As(a)}ci(e)&&(vc(e),bc("Database",!0)),w_(r,i,s,o)}/**
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
 */function C_(n){up(io),Fe(new xe("database",(e,{instanceIdentifier:t})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return b_(s,i,r,t)},"PUBLIC").setMultipleInstances(!0)),ye(Ma,$a,n),ye(Ma,$a,"esm2020")}/**
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
 */const A_={".sv":"timestamp"};function es(){return A_}/**
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
 */class R_{constructor(e,t){this.committed=e,this.snapshot=t}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function Vo(n,e,t){if(n=ve(n),Ei("Reference.transaction",n._path),n.key===".length"||n.key===".keys")throw"Reference.transaction failed: "+n.key+" is a read-only object.";const s=!0,i=new mn,r=(a,l,c)=>{let u=null;a?i.reject(a):(u=new dn(c,new We(n._repo,n._path),J),i.resolve(new R_(l,u)))},o=nt(n,()=>{});return t_(n._repo,n._path,e,r,o,s),i.promise}Xe.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};Xe.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};C_();/**
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
 */const zu="firebasestorage.googleapis.com",P_="storageBucket",O_=2*60*1e3,N_=10*60*1e3;/**
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
 */let yt=class Ku extends _t{constructor(e,t,s=0){super(er(e),`Firebase Storage: ${t} (${er(e)})`),this.status_=s,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,Ku.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return er(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}};var Be;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(Be||(Be={}));function er(n){return"storage/"+n}function x_(){const n="An unknown error occurred, please check the error payload for server response.";return new yt(Be.UNKNOWN,n)}function D_(){return new yt(Be.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function L_(){return new yt(Be.CANCELED,"User canceled the upload/download.")}function M_(n){return new yt(Be.INVALID_URL,"Invalid URL '"+n+"'.")}function $_(n){return new yt(Be.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function gl(n){return new yt(Be.INVALID_ARGUMENT,n)}function Gu(){return new yt(Be.APP_DELETED,"The Firebase app was deleted.")}function j_(n){return new yt(Be.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}/**
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
 */class Oe{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let s;try{s=Oe.makeFromUrl(e,t)}catch{return new Oe(e,"")}if(s.path==="")return s;throw $_(e)}static makeFromUrl(e,t){let s=null;const i="([A-Za-z0-9.\\-_]+)";function r(O){O.path.charAt(O.path.length-1)==="/"&&(O.path_=O.path_.slice(0,-1))}const o="(/(.*))?$",a=new RegExp("^gs://"+i+o,"i"),l={bucket:1,path:3};function c(O){O.path_=decodeURIComponent(O.path)}const u="v[A-Za-z0-9_]+",h=t.replace(/[.]/g,"\\."),d="(/([^?#]*).*)?$",_=new RegExp(`^https?://${h}/${u}/b/${i}/o${d}`,"i"),w={bucket:1,path:3},E=t===zu?"(?:storage.googleapis.com|storage.cloud.google.com)":t,S="([^?#]*)",R=new RegExp(`^https?://${E}/${i}/${S}`,"i"),k=[{regex:a,indices:l,postModify:r},{regex:_,indices:w,postModify:c},{regex:R,indices:{bucket:1,path:2},postModify:c}];for(let O=0;O<k.length;O++){const Z=k[O],B=Z.regex.exec(e);if(B){const m=B[Z.indices.bucket];let f=B[Z.indices.path];f||(f=""),s=new Oe(m,f),Z.postModify(s);break}}if(s==null)throw M_(e);return s}}class F_{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
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
 */function B_(n,e,t){let s=1,i=null,r=null,o=!1,a=0;function l(){return a===2}let c=!1;function u(...S){c||(c=!0,e.apply(null,S))}function h(S){i=setTimeout(()=>{i=null,n(_,l())},S)}function d(){r&&clearTimeout(r)}function _(S,...R){if(c){d();return}if(S){d(),u.call(null,S,...R);return}if(l()||o){d(),u.call(null,S,...R);return}s<64&&(s*=2);let k;a===1?(a=2,k=0):k=(s+Math.random())*1e3,h(k)}let w=!1;function E(S){w||(w=!0,d(),!c&&(i!==null?(S||(a=2),clearTimeout(i),h(0)):S||(a=1)))}return h(0),r=setTimeout(()=>{o=!0,E(!0)},t),E}function U_(n){n(!1)}/**
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
 */function W_(n){return n!==void 0}function ml(n,e,t,s){if(s<e)throw gl(`Invalid value for '${n}'. Expected ${e} or greater.`);if(s>t)throw gl(`Invalid value for '${n}'. Expected ${t} or less.`)}function V_(n){const e=encodeURIComponent;let t="?";for(const s in n)if(n.hasOwnProperty(s)){const i=e(s)+"="+e(n[s]);t=t+i+"&"}return t=t.slice(0,-1),t}var ei;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(ei||(ei={}));/**
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
 */function q_(n,e){const t=n>=500&&n<600,i=[408,429].indexOf(n)!==-1,r=e.indexOf(n)!==-1;return t||i||r}/**
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
 */class H_{constructor(e,t,s,i,r,o,a,l,c,u,h,d=!0,_=!1){this.url_=e,this.method_=t,this.headers_=s,this.body_=i,this.successCodes_=r,this.additionalRetryCodes_=o,this.callback_=a,this.errorCallback_=l,this.timeout_=c,this.progressCallback_=u,this.connectionFactory_=h,this.retry=d,this.isUsingEmulator=_,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((w,E)=>{this.resolve_=w,this.reject_=E,this.start_()})}start_(){const e=(s,i)=>{if(i){s(!1,new ws(!1,null,!0));return}const r=this.connectionFactory_();this.pendingConnection_=r;const o=a=>{const l=a.loaded,c=a.lengthComputable?a.total:-1;this.progressCallback_!==null&&this.progressCallback_(l,c)};this.progressCallback_!==null&&r.addUploadProgressListener(o),r.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&r.removeUploadProgressListener(o),this.pendingConnection_=null;const a=r.getErrorCode()===ei.NO_ERROR,l=r.getStatus();if(!a||q_(l,this.additionalRetryCodes_)&&this.retry){const u=r.getErrorCode()===ei.ABORT;s(!1,new ws(!1,null,u));return}const c=this.successCodes_.indexOf(l)!==-1;s(!0,new ws(c,r))})},t=(s,i)=>{const r=this.resolve_,o=this.reject_,a=i.connection;if(i.wasSuccessCode)try{const l=this.callback_(a,a.getResponse());W_(l)?r(l):r()}catch(l){o(l)}else if(a!==null){const l=x_();l.serverResponse=a.getErrorText(),this.errorCallback_?o(this.errorCallback_(a,l)):o(l)}else if(i.canceled){const l=this.appDelete_?Gu():L_();o(l)}else{const l=D_();o(l)}};this.canceled_?t(!1,new ws(!1,null,!0)):this.backoffId_=B_(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&U_(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class ws{constructor(e,t,s){this.wasSuccessCode=e,this.connection=t,this.canceled=!!s}}function z_(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function K_(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function G_(n,e){e&&(n["X-Firebase-GMPID"]=e)}function J_(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function Y_(n,e,t,s,i,r,o=!0,a=!1){const l=V_(n.urlParams),c=n.url+l,u=Object.assign({},n.headers);return G_(u,e),z_(u,t),K_(u,r),J_(u,s),new H_(c,n.method,u,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,i,o,a)}/**
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
 */function Q_(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function X_(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
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
 */class ti{constructor(e,t){this._service=e,t instanceof Oe?this._location=t:this._location=Oe.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new ti(e,t)}get root(){const e=new Oe(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return X_(this._location.path)}get storage(){return this._service}get parent(){const e=Q_(this._location.path);if(e===null)return null;const t=new Oe(this._location.bucket,e);return new ti(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw j_(e)}}function _l(n,e){const t=e==null?void 0:e[P_];return t==null?null:Oe.makeFromBucketSpec(t,n)}function Z_(n,e,t,s={}){n.host=`${e}:${t}`;const i=ci(e);i&&(vc(`https://${n.host}/b`),bc("Storage",!0)),n._isUsingEmulator=!0,n._protocol=i?"https":"http";const{mockUserToken:r}=s;r&&(n._overrideAuthToken=typeof r=="string"?r:wc(r,n.app.options.projectId))}class ey{constructor(e,t,s,i,r,o=!1){this.app=e,this._authProvider=t,this._appCheckProvider=s,this._url=i,this._firebaseVersion=r,this._isUsingEmulator=o,this._bucket=null,this._host=zu,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=O_,this._maxUploadRetryTime=N_,this._requests=new Set,i!=null?this._bucket=Oe.makeFromBucketSpec(i,this._host):this._bucket=_l(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Oe.makeFromBucketSpec(this._url,e):this._bucket=_l(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){ml("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){ml("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(so(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new ti(this,e)}_makeRequest(e,t,s,i,r=!0){if(this._deleted)return new F_(Gu());{const o=Y_(e,this._appId,s,i,t,this._firebaseVersion,r,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[s,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,s,i).getPromise()}}const yl="@firebase/storage",vl="0.14.0";/**
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
 */const Ju="storage";function ty(n=ro(),e){n=ve(n);const s=rs(n,Ju).getImmediate({identifier:e}),i=_c("storage");return i&&ny(s,...i),s}function ny(n,e,t,s={}){Z_(n,e,t,s)}function sy(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),s=n.getProvider("auth-internal"),i=n.getProvider("app-check-internal");return new ey(t,s,i,e,io)}function iy(){Fe(new xe(Ju,sy,"PUBLIC").setMultipleInstances(!0)),ye(yl,vl,""),ye(yl,vl,"esm2020")}iy();const Yu="@firebase/installations",qo="0.6.19";/**
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
 */const Qu=1e4,Xu=`w:${qo}`,Zu="FIS_v2",ry="https://firebaseinstallations.googleapis.com/v1",oy=60*60*1e3,ay="installations",ly="Installations";/**
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
 */const cy={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Bt=new ui(ay,ly,cy);function eh(n){return n instanceof _t&&n.code.includes("request-failed")}/**
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
 */function th({projectId:n}){return`${ry}/projects/${n}/installations`}function nh(n){return{token:n.token,requestStatus:2,expiresIn:hy(n.expiresIn),creationTime:Date.now()}}async function sh(n,e){const s=(await e.json()).error;return Bt.create("request-failed",{requestName:n,serverCode:s.code,serverMessage:s.message,serverStatus:s.status})}function ih({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function uy(n,{refreshToken:e}){const t=ih(n);return t.append("Authorization",dy(e)),t}async function rh(n){const e=await n();return e.status>=500&&e.status<600?n():e}function hy(n){return Number(n.replace("s","000"))}function dy(n){return`${Zu} ${n}`}/**
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
 */async function fy({appConfig:n,heartbeatServiceProvider:e},{fid:t}){const s=th(n),i=ih(n),r=e.getImmediate({optional:!0});if(r){const c=await r.getHeartbeatsHeader();c&&i.append("x-firebase-client",c)}const o={fid:t,authVersion:Zu,appId:n.appId,sdkVersion:Xu},a={method:"POST",headers:i,body:JSON.stringify(o)},l=await rh(()=>fetch(s,a));if(l.ok){const c=await l.json();return{fid:c.fid||t,registrationStatus:2,refreshToken:c.refreshToken,authToken:nh(c.authToken)}}else throw await sh("Create Installation",l)}/**
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
 */function oh(n){return new Promise(e=>{setTimeout(e,n)})}/**
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
 */function py(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const gy=/^[cdef][\w-]{21}$/,$r="";function my(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const t=_y(n);return gy.test(t)?t:$r}catch{return $r}}function _y(n){return py(n).substr(0,22)}/**
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
 */function Ri(n){return`${n.appName}!${n.appId}`}/**
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
 */const ah=new Map;function lh(n,e){const t=Ri(n);ch(t,e),yy(t,e)}function ch(n,e){const t=ah.get(n);if(t)for(const s of t)s(e)}function yy(n,e){const t=vy();t&&t.postMessage({key:n,fid:e}),wy()}let Rt=null;function vy(){return!Rt&&"BroadcastChannel"in self&&(Rt=new BroadcastChannel("[Firebase] FID Change"),Rt.onmessage=n=>{ch(n.data.key,n.data.fid)}),Rt}function wy(){ah.size===0&&Rt&&(Rt.close(),Rt=null)}/**
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
 */const by="firebase-installations-database",Sy=1,Ut="firebase-installations-store";let tr=null;function Ho(){return tr||(tr=fi(by,Sy,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(Ut)}}})),tr}async function ni(n,e){const t=Ri(n),i=(await Ho()).transaction(Ut,"readwrite"),r=i.objectStore(Ut),o=await r.get(t);return await r.put(e,t),await i.done,(!o||o.fid!==e.fid)&&lh(n,e.fid),e}async function uh(n){const e=Ri(n),s=(await Ho()).transaction(Ut,"readwrite");await s.objectStore(Ut).delete(e),await s.done}async function Pi(n,e){const t=Ri(n),i=(await Ho()).transaction(Ut,"readwrite"),r=i.objectStore(Ut),o=await r.get(t),a=e(o);return a===void 0?await r.delete(t):await r.put(a,t),await i.done,a&&(!o||o.fid!==a.fid)&&lh(n,a.fid),a}/**
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
 */async function zo(n){let e;const t=await Pi(n.appConfig,s=>{const i=Ey(s),r=Ty(n,i);return e=r.registrationPromise,r.installationEntry});return t.fid===$r?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function Ey(n){const e=n||{fid:my(),registrationStatus:0};return hh(e)}function Ty(n,e){if(e.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject(Bt.create("app-offline"));return{installationEntry:e,registrationPromise:i}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},s=Iy(n,t);return{installationEntry:t,registrationPromise:s}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:ky(n)}:{installationEntry:e}}async function Iy(n,e){try{const t=await fy(n,e);return ni(n.appConfig,t)}catch(t){throw eh(t)&&t.customData.serverCode===409?await uh(n.appConfig):await ni(n.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function ky(n){let e=await wl(n.appConfig);for(;e.registrationStatus===1;)await oh(100),e=await wl(n.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:s}=await zo(n);return s||t}return e}function wl(n){return Pi(n,e=>{if(!e)throw Bt.create("installation-not-found");return hh(e)})}function hh(n){return Cy(n)?{fid:n.fid,registrationStatus:0}:n}function Cy(n){return n.registrationStatus===1&&n.registrationTime+Qu<Date.now()}/**
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
 */async function Ay({appConfig:n,heartbeatServiceProvider:e},t){const s=Ry(n,t),i=uy(n,t),r=e.getImmediate({optional:!0});if(r){const c=await r.getHeartbeatsHeader();c&&i.append("x-firebase-client",c)}const o={installation:{sdkVersion:Xu,appId:n.appId}},a={method:"POST",headers:i,body:JSON.stringify(o)},l=await rh(()=>fetch(s,a));if(l.ok){const c=await l.json();return nh(c)}else throw await sh("Generate Auth Token",l)}function Ry(n,{fid:e}){return`${th(n)}/${e}/authTokens:generate`}/**
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
 */async function Ko(n,e=!1){let t;const s=await Pi(n.appConfig,r=>{if(!dh(r))throw Bt.create("not-registered");const o=r.authToken;if(!e&&Ny(o))return r;if(o.requestStatus===1)return t=Py(n,e),r;{if(!navigator.onLine)throw Bt.create("app-offline");const a=Dy(r);return t=Oy(n,a),a}});return t?await t:s.authToken}async function Py(n,e){let t=await bl(n.appConfig);for(;t.authToken.requestStatus===1;)await oh(100),t=await bl(n.appConfig);const s=t.authToken;return s.requestStatus===0?Ko(n,e):s}function bl(n){return Pi(n,e=>{if(!dh(e))throw Bt.create("not-registered");const t=e.authToken;return Ly(t)?{...e,authToken:{requestStatus:0}}:e})}async function Oy(n,e){try{const t=await Ay(n,e),s={...e,authToken:t};return await ni(n.appConfig,s),t}catch(t){if(eh(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await uh(n.appConfig);else{const s={...e,authToken:{requestStatus:0}};await ni(n.appConfig,s)}throw t}}function dh(n){return n!==void 0&&n.registrationStatus===2}function Ny(n){return n.requestStatus===2&&!xy(n)}function xy(n){const e=Date.now();return e<n.creationTime||n.creationTime+n.expiresIn<e+oy}function Dy(n){const e={requestStatus:1,requestTime:Date.now()};return{...n,authToken:e}}function Ly(n){return n.requestStatus===1&&n.requestTime+Qu<Date.now()}/**
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
 */async function My(n){const e=n,{installationEntry:t,registrationPromise:s}=await zo(e);return s?s.catch(console.error):Ko(e).catch(console.error),t.fid}/**
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
 */async function $y(n,e=!1){const t=n;return await jy(t),(await Ko(t,e)).token}async function jy(n){const{registrationPromise:e}=await zo(n);e&&await e}/**
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
 */function Fy(n){if(!n||!n.options)throw nr("App Configuration");if(!n.name)throw nr("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!n.options[t])throw nr(t);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function nr(n){return Bt.create("missing-app-config-values",{valueName:n})}/**
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
 */const fh="installations",By="installations-internal",Uy=n=>{const e=n.getProvider("app").getImmediate(),t=Fy(e),s=rs(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:s,_delete:()=>Promise.resolve()}},Wy=n=>{const e=n.getProvider("app").getImmediate(),t=rs(e,fh).getImmediate();return{getId:()=>My(t),getToken:i=>$y(t,i)}};function Vy(){Fe(new xe(fh,Uy,"PUBLIC")),Fe(new xe(By,Wy,"PRIVATE"))}Vy();ye(Yu,qo);ye(Yu,qo,"esm2020");/**
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
 */const qy="/firebase-messaging-sw.js",Hy="/firebase-cloud-messaging-push-scope",ph="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",zy="https://fcmregistrations.googleapis.com/v1",gh="google.c.a.c_id",Ky="google.c.a.c_l",Gy="google.c.a.ts",Jy="google.c.a.e",Sl=1e4;var El;(function(n){n[n.DATA_MESSAGE=1]="DATA_MESSAGE",n[n.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(El||(El={}));/**
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
 */var ts;(function(n){n.PUSH_RECEIVED="push-received",n.NOTIFICATION_CLICKED="notification-clicked"})(ts||(ts={}));/**
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
 */function He(n){const e=new Uint8Array(n);return btoa(String.fromCharCode(...e)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function Yy(n){const e="=".repeat((4-n.length%4)%4),t=(n+e).replace(/\-/g,"+").replace(/_/g,"/"),s=atob(t),i=new Uint8Array(s.length);for(let r=0;r<s.length;++r)i[r]=s.charCodeAt(r);return i}/**
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
 */const sr="fcm_token_details_db",Qy=5,Tl="fcm_token_object_Store";async function Xy(n){if("databases"in indexedDB&&!(await indexedDB.databases()).map(r=>r.name).includes(sr))return null;let e=null;return(await fi(sr,Qy,{upgrade:async(s,i,r,o)=>{if(i<2||!s.objectStoreNames.contains(Tl))return;const a=o.objectStore(Tl),l=await a.index("fcmSenderId").get(n);if(await a.clear(),!!l){if(i===2){const c=l;if(!c.auth||!c.p256dh||!c.endpoint)return;e={token:c.fcmToken,createTime:c.createTime??Date.now(),subscriptionOptions:{auth:c.auth,p256dh:c.p256dh,endpoint:c.endpoint,swScope:c.swScope,vapidKey:typeof c.vapidKey=="string"?c.vapidKey:He(c.vapidKey)}}}else if(i===3){const c=l;e={token:c.fcmToken,createTime:c.createTime,subscriptionOptions:{auth:He(c.auth),p256dh:He(c.p256dh),endpoint:c.endpoint,swScope:c.swScope,vapidKey:He(c.vapidKey)}}}else if(i===4){const c=l;e={token:c.fcmToken,createTime:c.createTime,subscriptionOptions:{auth:He(c.auth),p256dh:He(c.p256dh),endpoint:c.endpoint,swScope:c.swScope,vapidKey:He(c.vapidKey)}}}}}})).close(),await Vi(sr),await Vi("fcm_vapid_details_db"),await Vi("undefined"),Zy(e)?e:null}function Zy(n){if(!n||!n.subscriptionOptions)return!1;const{subscriptionOptions:e}=n;return typeof n.createTime=="number"&&n.createTime>0&&typeof n.token=="string"&&n.token.length>0&&typeof e.auth=="string"&&e.auth.length>0&&typeof e.p256dh=="string"&&e.p256dh.length>0&&typeof e.endpoint=="string"&&e.endpoint.length>0&&typeof e.swScope=="string"&&e.swScope.length>0&&typeof e.vapidKey=="string"&&e.vapidKey.length>0}/**
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
 */const ev="firebase-messaging-database",tv=1,Wt="firebase-messaging-store";let ir=null;function Go(){return ir||(ir=fi(ev,tv,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(Wt)}}})),ir}async function mh(n){const e=Yo(n),s=await(await Go()).transaction(Wt).objectStore(Wt).get(e);if(s)return s;{const i=await Xy(n.appConfig.senderId);if(i)return await Jo(n,i),i}}async function Jo(n,e){const t=Yo(n),i=(await Go()).transaction(Wt,"readwrite");return await i.objectStore(Wt).put(e,t),await i.done,e}async function nv(n){const e=Yo(n),s=(await Go()).transaction(Wt,"readwrite");await s.objectStore(Wt).delete(e),await s.done}function Yo({appConfig:n}){return n.appId}/**
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
 */const sv={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},ue=new ui("messaging","Messaging",sv);/**
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
 */async function iv(n,e){const t=await Xo(n),s=yh(e),i={method:"POST",headers:t,body:JSON.stringify(s)};let r;try{r=await(await fetch(Qo(n.appConfig),i)).json()}catch(o){throw ue.create("token-subscribe-failed",{errorInfo:o==null?void 0:o.toString()})}if(r.error){const o=r.error.message;throw ue.create("token-subscribe-failed",{errorInfo:o})}if(!r.token)throw ue.create("token-subscribe-no-token");return r.token}async function rv(n,e){const t=await Xo(n),s=yh(e.subscriptionOptions),i={method:"PATCH",headers:t,body:JSON.stringify(s)};let r;try{r=await(await fetch(`${Qo(n.appConfig)}/${e.token}`,i)).json()}catch(o){throw ue.create("token-update-failed",{errorInfo:o==null?void 0:o.toString()})}if(r.error){const o=r.error.message;throw ue.create("token-update-failed",{errorInfo:o})}if(!r.token)throw ue.create("token-update-no-token");return r.token}async function _h(n,e){const s={method:"DELETE",headers:await Xo(n)};try{const r=await(await fetch(`${Qo(n.appConfig)}/${e}`,s)).json();if(r.error){const o=r.error.message;throw ue.create("token-unsubscribe-failed",{errorInfo:o})}}catch(i){throw ue.create("token-unsubscribe-failed",{errorInfo:i==null?void 0:i.toString()})}}function Qo({projectId:n}){return`${zy}/projects/${n}/registrations`}async function Xo({appConfig:n,installations:e}){const t=await e.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n.apiKey,"x-goog-firebase-installations-auth":`FIS ${t}`})}function yh({p256dh:n,auth:e,endpoint:t,vapidKey:s}){const i={web:{endpoint:t,auth:e,p256dh:n}};return s!==ph&&(i.web.applicationPubKey=s),i}/**
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
 */const ov=7*24*60*60*1e3;async function av(n){const e=await uv(n.swRegistration,n.vapidKey),t={vapidKey:n.vapidKey,swScope:n.swRegistration.scope,endpoint:e.endpoint,auth:He(e.getKey("auth")),p256dh:He(e.getKey("p256dh"))},s=await mh(n.firebaseDependencies);if(s){if(hv(s.subscriptionOptions,t))return Date.now()>=s.createTime+ov?cv(n,{token:s.token,createTime:Date.now(),subscriptionOptions:t}):s.token;try{await _h(n.firebaseDependencies,s.token)}catch(i){console.warn(i)}return Il(n.firebaseDependencies,t)}else return Il(n.firebaseDependencies,t)}async function lv(n){const e=await mh(n.firebaseDependencies);e&&(await _h(n.firebaseDependencies,e.token),await nv(n.firebaseDependencies));const t=await n.swRegistration.pushManager.getSubscription();return t?t.unsubscribe():!0}async function cv(n,e){try{const t=await rv(n.firebaseDependencies,e),s={...e,token:t,createTime:Date.now()};return await Jo(n.firebaseDependencies,s),t}catch(t){throw t}}async function Il(n,e){const s={token:await iv(n,e),createTime:Date.now(),subscriptionOptions:e};return await Jo(n,s),s.token}async function uv(n,e){const t=await n.pushManager.getSubscription();return t||n.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:Yy(e)})}function hv(n,e){const t=e.vapidKey===n.vapidKey,s=e.endpoint===n.endpoint,i=e.auth===n.auth,r=e.p256dh===n.p256dh;return t&&s&&i&&r}/**
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
 */function kl(n){const e={from:n.from,collapseKey:n.collapse_key,messageId:n.fcmMessageId};return dv(e,n),fv(e,n),pv(e,n),e}function dv(n,e){if(!e.notification)return;n.notification={};const t=e.notification.title;t&&(n.notification.title=t);const s=e.notification.body;s&&(n.notification.body=s);const i=e.notification.image;i&&(n.notification.image=i);const r=e.notification.icon;r&&(n.notification.icon=r)}function fv(n,e){e.data&&(n.data=e.data)}function pv(n,e){var i,r,o,a;if(!e.fcmOptions&&!((i=e.notification)!=null&&i.click_action))return;n.fcmOptions={};const t=((r=e.fcmOptions)==null?void 0:r.link)??((o=e.notification)==null?void 0:o.click_action);t&&(n.fcmOptions.link=t);const s=(a=e.fcmOptions)==null?void 0:a.analytics_label;s&&(n.fcmOptions.analyticsLabel=s)}/**
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
 */function gv(n){return typeof n=="object"&&!!n&&gh in n}/**
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
 */function mv(n){if(!n||!n.options)throw rr("App Configuration Object");if(!n.name)throw rr("App Name");const e=["projectId","apiKey","appId","messagingSenderId"],{options:t}=n;for(const s of e)if(!t[s])throw rr(s);return{appName:n.name,projectId:t.projectId,apiKey:t.apiKey,appId:t.appId,senderId:t.messagingSenderId}}function rr(n){return ue.create("missing-app-config-values",{valueName:n})}/**
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
 */class _v{constructor(e,t,s){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const i=mv(e);this.firebaseDependencies={app:e,appConfig:i,installations:t,analyticsProvider:s}}_delete(){return Promise.resolve()}}/**
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
 */async function vh(n){try{n.swRegistration=await navigator.serviceWorker.register(qy,{scope:Hy}),n.swRegistration.update().catch(()=>{}),await yv(n.swRegistration)}catch(e){throw ue.create("failed-service-worker-registration",{browserErrorMessage:e==null?void 0:e.message})}}async function yv(n){return new Promise((e,t)=>{const s=setTimeout(()=>t(new Error(`Service worker not registered after ${Sl} ms`)),Sl),i=n.installing||n.waiting;n.active?(clearTimeout(s),e()):i?i.onstatechange=r=>{var o;((o=r.target)==null?void 0:o.state)==="activated"&&(i.onstatechange=null,clearTimeout(s),e())}:(clearTimeout(s),t(new Error("No incoming service worker found.")))})}/**
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
 */async function vv(n,e){if(!e&&!n.swRegistration&&await vh(n),!(!e&&n.swRegistration)){if(!(e instanceof ServiceWorkerRegistration))throw ue.create("invalid-sw-registration");n.swRegistration=e}}/**
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
 */async function wv(n,e){e?n.vapidKey=e:n.vapidKey||(n.vapidKey=ph)}/**
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
 */async function wh(n,e){if(!navigator)throw ue.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw ue.create("permission-blocked");return await wv(n,e==null?void 0:e.vapidKey),await vv(n,e==null?void 0:e.serviceWorkerRegistration),av(n)}/**
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
 */async function bv(n,e,t){const s=Sv(e);(await n.firebaseDependencies.analyticsProvider.get()).logEvent(s,{message_id:t[gh],message_name:t[Ky],message_time:t[Gy],message_device_time:Math.floor(Date.now()/1e3)})}function Sv(n){switch(n){case ts.NOTIFICATION_CLICKED:return"notification_open";case ts.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
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
 */async function Ev(n,e){const t=e.data;if(!t.isFirebaseMessaging)return;n.onMessageHandler&&t.messageType===ts.PUSH_RECEIVED&&(typeof n.onMessageHandler=="function"?n.onMessageHandler(kl(t)):n.onMessageHandler.next(kl(t)));const s=t.data;gv(s)&&s[Jy]==="1"&&await bv(n,t.messageType,s)}const Cl="@firebase/messaging",Al="0.12.23";/**
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
 */const Tv=n=>{const e=new _v(n.getProvider("app").getImmediate(),n.getProvider("installations-internal").getImmediate(),n.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",t=>Ev(e,t)),e},Iv=n=>{const e=n.getProvider("messaging").getImmediate();return{getToken:s=>wh(e,s)}};function kv(){Fe(new xe("messaging",Tv,"PUBLIC")),Fe(new xe("messaging-internal",Iv,"PRIVATE")),ye(Cl,Al),ye(Cl,Al,"esm2020")}/**
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
 */async function Oi(){try{await Tc()}catch{return!1}return typeof window<"u"&&Ec()&&kd()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
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
 */async function Cv(n){if(!navigator)throw ue.create("only-available-in-window");return n.swRegistration||await vh(n),lv(n)}/**
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
 */function Av(n,e){if(!navigator)throw ue.create("only-available-in-window");return n.onMessageHandler=e,()=>{n.onMessageHandler=null}}/**
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
 */function Ni(n=ro()){return Oi().then(e=>{if(!e)throw ue.create("unsupported-browser")},e=>{throw ue.create("indexed-db-unsupported")}),rs(ve(n),"messaging").getImmediate()}async function bh(n,e){return n=ve(n),wh(n,e)}function Rv(n){return n=ve(n),Cv(n)}function Pv(n,e){return n=ve(n),Av(n,e)}kv();const Ov={apiKey:"AIzaSyC-jTMiDjHNTC6cvSKUU44mVbWwT-ToLxQ",authDomain:"mister-x-d6b59.firebaseapp.com",databaseURL:"https://mister-x-d6b59-default-rtdb.europe-west1.firebasedatabase.app",projectId:"mister-x-d6b59",storageBucket:"mister-x-d6b59.firebasestorage.app",messagingSenderId:"616391598963",appId:"1:616391598963:web:da07882b0f481d3000db06",measurementId:"G-W66SK677NG"},wn=Ac(Ov),A=I_(wn);ty(wn);Ni(wn);const Nv="modulepreload",xv=function(n){return"/Mister-X/"+n},Rl={},gs=function(e,t,s){let i=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));i=Promise.allSettled(t.map(l=>{if(l=xv(l),l in Rl)return;Rl[l]=!0;const c=l.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const h=document.createElement("link");if(h.rel=c?"stylesheet":Nv,c||(h.as="script"),h.crossOrigin="",h.href=l,a&&h.setAttribute("nonce",a),document.head.appendChild(h),c)return new Promise((d,_)=>{h.addEventListener("load",d),h.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return e().catch(r)})},Dv=n=>{let e;return n?e=n:typeof fetch>"u"?e=(...t)=>gs(async()=>{const{default:s}=await Promise.resolve().then(()=>bn);return{default:s}},void 0).then(({default:s})=>s(...t)):e=fetch,(...t)=>e(...t)};class Zo extends Error{constructor(e,t="FunctionsError",s){super(e),this.name=t,this.context=s}}class Lv extends Zo{constructor(e){super("Failed to send a request to the Edge Function","FunctionsFetchError",e)}}class Pl extends Zo{constructor(e){super("Relay Error invoking the Edge Function","FunctionsRelayError",e)}}class Ol extends Zo{constructor(e){super("Edge Function returned a non-2xx status code","FunctionsHttpError",e)}}var jr;(function(n){n.Any="any",n.ApNortheast1="ap-northeast-1",n.ApNortheast2="ap-northeast-2",n.ApSouth1="ap-south-1",n.ApSoutheast1="ap-southeast-1",n.ApSoutheast2="ap-southeast-2",n.CaCentral1="ca-central-1",n.EuCentral1="eu-central-1",n.EuWest1="eu-west-1",n.EuWest2="eu-west-2",n.EuWest3="eu-west-3",n.SaEast1="sa-east-1",n.UsEast1="us-east-1",n.UsWest1="us-west-1",n.UsWest2="us-west-2"})(jr||(jr={}));var Mv=function(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{c(s.next(u))}catch(h){o(h)}}function l(u){try{c(s.throw(u))}catch(h){o(h)}}function c(u){u.done?r(u.value):i(u.value).then(a,l)}c((s=s.apply(n,e||[])).next())})};class $v{constructor(e,{headers:t={},customFetch:s,region:i=jr.Any}={}){this.url=e,this.headers=t,this.region=i,this.fetch=Dv(s)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e,t={}){var s;return Mv(this,void 0,void 0,function*(){try{const{headers:i,method:r,body:o}=t;let a={},{region:l}=t;l||(l=this.region);const c=new URL(`${this.url}/${e}`);l&&l!=="any"&&(a["x-region"]=l,c.searchParams.set("forceFunctionRegion",l));let u;o&&(i&&!Object.prototype.hasOwnProperty.call(i,"Content-Type")||!i)&&(typeof Blob<"u"&&o instanceof Blob||o instanceof ArrayBuffer?(a["Content-Type"]="application/octet-stream",u=o):typeof o=="string"?(a["Content-Type"]="text/plain",u=o):typeof FormData<"u"&&o instanceof FormData?u=o:(a["Content-Type"]="application/json",u=JSON.stringify(o)));const h=yield this.fetch(c.toString(),{method:r||"POST",headers:Object.assign(Object.assign(Object.assign({},a),this.headers),i),body:u}).catch(E=>{throw new Lv(E)}),d=h.headers.get("x-relay-error");if(d&&d==="true")throw new Pl(h);if(!h.ok)throw new Ol(h);let _=((s=h.headers.get("Content-Type"))!==null&&s!==void 0?s:"text/plain").split(";")[0].trim(),w;return _==="application/json"?w=yield h.json():_==="application/octet-stream"?w=yield h.blob():_==="text/event-stream"?w=h:_==="multipart/form-data"?w=yield h.formData():w=yield h.text(),{data:w,error:null,response:h}}catch(i){return{data:null,error:i,response:i instanceof Ol||i instanceof Pl?i.context:void 0}}})}}var Te=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function jv(n){if(n.__esModule)return n;var e=n.default;if(typeof e=="function"){var t=function s(){return this instanceof s?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};t.prototype=e.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(n).forEach(function(s){var i=Object.getOwnPropertyDescriptor(n,s);Object.defineProperty(t,s,i.get?i:{enumerable:!0,get:function(){return n[s]}})}),t}var me={},ea={},xi={},ms={},Di={},Li={},Fv=function(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("unable to locate global object")},fn=Fv();const Bv=fn.fetch,Sh=fn.fetch.bind(fn),Eh=fn.Headers,Uv=fn.Request,Wv=fn.Response,bn=Object.freeze(Object.defineProperty({__proto__:null,Headers:Eh,Request:Uv,Response:Wv,default:Sh,fetch:Bv},Symbol.toStringTag,{value:"Module"})),Vv=jv(bn);var Mi={};Object.defineProperty(Mi,"__esModule",{value:!0});let qv=class extends Error{constructor(e){super(e.message),this.name="PostgrestError",this.details=e.details,this.hint=e.hint,this.code=e.code}};Mi.default=qv;var Th=Te&&Te.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(Li,"__esModule",{value:!0});const Hv=Th(Vv),zv=Th(Mi);let Kv=class{constructor(e){this.shouldThrowOnError=!1,this.method=e.method,this.url=e.url,this.headers=e.headers,this.schema=e.schema,this.body=e.body,this.shouldThrowOnError=e.shouldThrowOnError,this.signal=e.signal,this.isMaybeSingle=e.isMaybeSingle,e.fetch?this.fetch=e.fetch:typeof fetch>"u"?this.fetch=Hv.default:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(e,t){return this.headers=Object.assign({},this.headers),this.headers[e]=t,this}then(e,t){this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers["Accept-Profile"]=this.schema:this.headers["Content-Profile"]=this.schema),this.method!=="GET"&&this.method!=="HEAD"&&(this.headers["Content-Type"]="application/json");const s=this.fetch;let i=s(this.url.toString(),{method:this.method,headers:this.headers,body:JSON.stringify(this.body),signal:this.signal}).then(async r=>{var o,a,l;let c=null,u=null,h=null,d=r.status,_=r.statusText;if(r.ok){if(this.method!=="HEAD"){const R=await r.text();R===""||(this.headers.Accept==="text/csv"||this.headers.Accept&&this.headers.Accept.includes("application/vnd.pgrst.plan+text")?u=R:u=JSON.parse(R))}const E=(o=this.headers.Prefer)===null||o===void 0?void 0:o.match(/count=(exact|planned|estimated)/),S=(a=r.headers.get("content-range"))===null||a===void 0?void 0:a.split("/");E&&S&&S.length>1&&(h=parseInt(S[1])),this.isMaybeSingle&&this.method==="GET"&&Array.isArray(u)&&(u.length>1?(c={code:"PGRST116",details:`Results contain ${u.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},u=null,h=null,d=406,_="Not Acceptable"):u.length===1?u=u[0]:u=null)}else{const E=await r.text();try{c=JSON.parse(E),Array.isArray(c)&&r.status===404&&(u=[],c=null,d=200,_="OK")}catch{r.status===404&&E===""?(d=204,_="No Content"):c={message:E}}if(c&&this.isMaybeSingle&&(!((l=c==null?void 0:c.details)===null||l===void 0)&&l.includes("0 rows"))&&(c=null,d=200,_="OK"),c&&this.shouldThrowOnError)throw new zv.default(c)}return{error:c,data:u,count:h,status:d,statusText:_}});return this.shouldThrowOnError||(i=i.catch(r=>{var o,a,l;return{error:{message:`${(o=r==null?void 0:r.name)!==null&&o!==void 0?o:"FetchError"}: ${r==null?void 0:r.message}`,details:`${(a=r==null?void 0:r.stack)!==null&&a!==void 0?a:""}`,hint:"",code:`${(l=r==null?void 0:r.code)!==null&&l!==void 0?l:""}`},data:null,count:null,status:0,statusText:""}})),i.then(e,t)}returns(){return this}overrideTypes(){return this}};Li.default=Kv;var Gv=Te&&Te.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(Di,"__esModule",{value:!0});const Jv=Gv(Li);let Yv=class extends Jv.default{select(e){let t=!1;const s=(e??"*").split("").map(i=>/\s/.test(i)&&!t?"":(i==='"'&&(t=!t),i)).join("");return this.url.searchParams.set("select",s),this.headers.Prefer&&(this.headers.Prefer+=","),this.headers.Prefer+="return=representation",this}order(e,{ascending:t=!0,nullsFirst:s,foreignTable:i,referencedTable:r=i}={}){const o=r?`${r}.order`:"order",a=this.url.searchParams.get(o);return this.url.searchParams.set(o,`${a?`${a},`:""}${e}.${t?"asc":"desc"}${s===void 0?"":s?".nullsfirst":".nullslast"}`),this}limit(e,{foreignTable:t,referencedTable:s=t}={}){const i=typeof s>"u"?"limit":`${s}.limit`;return this.url.searchParams.set(i,`${e}`),this}range(e,t,{foreignTable:s,referencedTable:i=s}={}){const r=typeof i>"u"?"offset":`${i}.offset`,o=typeof i>"u"?"limit":`${i}.limit`;return this.url.searchParams.set(r,`${e}`),this.url.searchParams.set(o,`${t-e+1}`),this}abortSignal(e){return this.signal=e,this}single(){return this.headers.Accept="application/vnd.pgrst.object+json",this}maybeSingle(){return this.method==="GET"?this.headers.Accept="application/json":this.headers.Accept="application/vnd.pgrst.object+json",this.isMaybeSingle=!0,this}csv(){return this.headers.Accept="text/csv",this}geojson(){return this.headers.Accept="application/geo+json",this}explain({analyze:e=!1,verbose:t=!1,settings:s=!1,buffers:i=!1,wal:r=!1,format:o="text"}={}){var a;const l=[e?"analyze":null,t?"verbose":null,s?"settings":null,i?"buffers":null,r?"wal":null].filter(Boolean).join("|"),c=(a=this.headers.Accept)!==null&&a!==void 0?a:"application/json";return this.headers.Accept=`application/vnd.pgrst.plan+${o}; for="${c}"; options=${l};`,o==="json"?this:this}rollback(){var e;return((e=this.headers.Prefer)!==null&&e!==void 0?e:"").trim().length>0?this.headers.Prefer+=",tx=rollback":this.headers.Prefer="tx=rollback",this}returns(){return this}};Di.default=Yv;var Qv=Te&&Te.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(ms,"__esModule",{value:!0});const Xv=Qv(Di);let Zv=class extends Xv.default{eq(e,t){return this.url.searchParams.append(e,`eq.${t}`),this}neq(e,t){return this.url.searchParams.append(e,`neq.${t}`),this}gt(e,t){return this.url.searchParams.append(e,`gt.${t}`),this}gte(e,t){return this.url.searchParams.append(e,`gte.${t}`),this}lt(e,t){return this.url.searchParams.append(e,`lt.${t}`),this}lte(e,t){return this.url.searchParams.append(e,`lte.${t}`),this}like(e,t){return this.url.searchParams.append(e,`like.${t}`),this}likeAllOf(e,t){return this.url.searchParams.append(e,`like(all).{${t.join(",")}}`),this}likeAnyOf(e,t){return this.url.searchParams.append(e,`like(any).{${t.join(",")}}`),this}ilike(e,t){return this.url.searchParams.append(e,`ilike.${t}`),this}ilikeAllOf(e,t){return this.url.searchParams.append(e,`ilike(all).{${t.join(",")}}`),this}ilikeAnyOf(e,t){return this.url.searchParams.append(e,`ilike(any).{${t.join(",")}}`),this}is(e,t){return this.url.searchParams.append(e,`is.${t}`),this}in(e,t){const s=Array.from(new Set(t)).map(i=>typeof i=="string"&&new RegExp("[,()]").test(i)?`"${i}"`:`${i}`).join(",");return this.url.searchParams.append(e,`in.(${s})`),this}contains(e,t){return typeof t=="string"?this.url.searchParams.append(e,`cs.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cs.{${t.join(",")}}`):this.url.searchParams.append(e,`cs.${JSON.stringify(t)}`),this}containedBy(e,t){return typeof t=="string"?this.url.searchParams.append(e,`cd.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cd.{${t.join(",")}}`):this.url.searchParams.append(e,`cd.${JSON.stringify(t)}`),this}rangeGt(e,t){return this.url.searchParams.append(e,`sr.${t}`),this}rangeGte(e,t){return this.url.searchParams.append(e,`nxl.${t}`),this}rangeLt(e,t){return this.url.searchParams.append(e,`sl.${t}`),this}rangeLte(e,t){return this.url.searchParams.append(e,`nxr.${t}`),this}rangeAdjacent(e,t){return this.url.searchParams.append(e,`adj.${t}`),this}overlaps(e,t){return typeof t=="string"?this.url.searchParams.append(e,`ov.${t}`):this.url.searchParams.append(e,`ov.{${t.join(",")}}`),this}textSearch(e,t,{config:s,type:i}={}){let r="";i==="plain"?r="pl":i==="phrase"?r="ph":i==="websearch"&&(r="w");const o=s===void 0?"":`(${s})`;return this.url.searchParams.append(e,`${r}fts${o}.${t}`),this}match(e){return Object.entries(e).forEach(([t,s])=>{this.url.searchParams.append(t,`eq.${s}`)}),this}not(e,t,s){return this.url.searchParams.append(e,`not.${t}.${s}`),this}or(e,{foreignTable:t,referencedTable:s=t}={}){const i=s?`${s}.or`:"or";return this.url.searchParams.append(i,`(${e})`),this}filter(e,t,s){return this.url.searchParams.append(e,`${t}.${s}`),this}};ms.default=Zv;var ew=Te&&Te.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(xi,"__esModule",{value:!0});const Cn=ew(ms);let tw=class{constructor(e,{headers:t={},schema:s,fetch:i}){this.url=e,this.headers=t,this.schema=s,this.fetch=i}select(e,{head:t=!1,count:s}={}){const i=t?"HEAD":"GET";let r=!1;const o=(e??"*").split("").map(a=>/\s/.test(a)&&!r?"":(a==='"'&&(r=!r),a)).join("");return this.url.searchParams.set("select",o),s&&(this.headers.Prefer=`count=${s}`),new Cn.default({method:i,url:this.url,headers:this.headers,schema:this.schema,fetch:this.fetch,allowEmpty:!1})}insert(e,{count:t,defaultToNull:s=!0}={}){const i="POST",r=[];if(this.headers.Prefer&&r.push(this.headers.Prefer),t&&r.push(`count=${t}`),s||r.push("missing=default"),this.headers.Prefer=r.join(","),Array.isArray(e)){const o=e.reduce((a,l)=>a.concat(Object.keys(l)),[]);if(o.length>0){const a=[...new Set(o)].map(l=>`"${l}"`);this.url.searchParams.set("columns",a.join(","))}}return new Cn.default({method:i,url:this.url,headers:this.headers,schema:this.schema,body:e,fetch:this.fetch,allowEmpty:!1})}upsert(e,{onConflict:t,ignoreDuplicates:s=!1,count:i,defaultToNull:r=!0}={}){const o="POST",a=[`resolution=${s?"ignore":"merge"}-duplicates`];if(t!==void 0&&this.url.searchParams.set("on_conflict",t),this.headers.Prefer&&a.push(this.headers.Prefer),i&&a.push(`count=${i}`),r||a.push("missing=default"),this.headers.Prefer=a.join(","),Array.isArray(e)){const l=e.reduce((c,u)=>c.concat(Object.keys(u)),[]);if(l.length>0){const c=[...new Set(l)].map(u=>`"${u}"`);this.url.searchParams.set("columns",c.join(","))}}return new Cn.default({method:o,url:this.url,headers:this.headers,schema:this.schema,body:e,fetch:this.fetch,allowEmpty:!1})}update(e,{count:t}={}){const s="PATCH",i=[];return this.headers.Prefer&&i.push(this.headers.Prefer),t&&i.push(`count=${t}`),this.headers.Prefer=i.join(","),new Cn.default({method:s,url:this.url,headers:this.headers,schema:this.schema,body:e,fetch:this.fetch,allowEmpty:!1})}delete({count:e}={}){const t="DELETE",s=[];return e&&s.push(`count=${e}`),this.headers.Prefer&&s.unshift(this.headers.Prefer),this.headers.Prefer=s.join(","),new Cn.default({method:t,url:this.url,headers:this.headers,schema:this.schema,fetch:this.fetch,allowEmpty:!1})}};xi.default=tw;var $i={},ji={};Object.defineProperty(ji,"__esModule",{value:!0});ji.version=void 0;ji.version="0.0.0-automated";Object.defineProperty($i,"__esModule",{value:!0});$i.DEFAULT_HEADERS=void 0;const nw=ji;$i.DEFAULT_HEADERS={"X-Client-Info":`postgrest-js/${nw.version}`};var Ih=Te&&Te.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(ea,"__esModule",{value:!0});const sw=Ih(xi),iw=Ih(ms),rw=$i;let ow=class kh{constructor(e,{headers:t={},schema:s,fetch:i}={}){this.url=e,this.headers=Object.assign(Object.assign({},rw.DEFAULT_HEADERS),t),this.schemaName=s,this.fetch=i}from(e){const t=new URL(`${this.url}/${e}`);return new sw.default(t,{headers:Object.assign({},this.headers),schema:this.schemaName,fetch:this.fetch})}schema(e){return new kh(this.url,{headers:this.headers,schema:e,fetch:this.fetch})}rpc(e,t={},{head:s=!1,get:i=!1,count:r}={}){let o;const a=new URL(`${this.url}/rpc/${e}`);let l;s||i?(o=s?"HEAD":"GET",Object.entries(t).filter(([u,h])=>h!==void 0).map(([u,h])=>[u,Array.isArray(h)?`{${h.join(",")}}`:`${h}`]).forEach(([u,h])=>{a.searchParams.append(u,h)})):(o="POST",l=t);const c=Object.assign({},this.headers);return r&&(c.Prefer=`count=${r}`),new iw.default({method:o,url:a,headers:c,schema:this.schemaName,body:l,fetch:this.fetch,allowEmpty:!1})}};ea.default=ow;var Sn=Te&&Te.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(me,"__esModule",{value:!0});me.PostgrestError=me.PostgrestBuilder=me.PostgrestTransformBuilder=me.PostgrestFilterBuilder=me.PostgrestQueryBuilder=me.PostgrestClient=void 0;const Ch=Sn(ea);me.PostgrestClient=Ch.default;const Ah=Sn(xi);me.PostgrestQueryBuilder=Ah.default;const Rh=Sn(ms);me.PostgrestFilterBuilder=Rh.default;const Ph=Sn(Di);me.PostgrestTransformBuilder=Ph.default;const Oh=Sn(Li);me.PostgrestBuilder=Oh.default;const Nh=Sn(Mi);me.PostgrestError=Nh.default;var aw=me.default={PostgrestClient:Ch.default,PostgrestQueryBuilder:Ah.default,PostgrestFilterBuilder:Rh.default,PostgrestTransformBuilder:Ph.default,PostgrestBuilder:Oh.default,PostgrestError:Nh.default};const{PostgrestClient:lw,PostgrestQueryBuilder:bS,PostgrestFilterBuilder:SS,PostgrestTransformBuilder:ES,PostgrestBuilder:TS,PostgrestError:IS}=aw;class cw{static detectEnvironment(){var e;if(typeof WebSocket<"u")return{type:"native",constructor:WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocket<"u")return{type:"native",constructor:globalThis.WebSocket};if(typeof global<"u"&&typeof global.WebSocket<"u")return{type:"native",constructor:global.WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocketPair<"u"&&typeof globalThis.WebSocket>"u")return{type:"cloudflare",error:"Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",workaround:"Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."};if(typeof globalThis<"u"&&globalThis.EdgeRuntime||typeof navigator<"u"&&(!((e=navigator.userAgent)===null||e===void 0)&&e.includes("Vercel-Edge")))return{type:"unsupported",error:"Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",workaround:"Use serverless functions or a different deployment target for WebSocket functionality."};if(typeof process<"u"&&process.versions&&process.versions.node){const t=parseInt(process.versions.node.split(".")[0]);return t>=22?typeof globalThis.WebSocket<"u"?{type:"native",constructor:globalThis.WebSocket}:{type:"unsupported",error:`Node.js ${t} detected but native WebSocket not found.`,workaround:"Provide a WebSocket implementation via the transport option."}:{type:"unsupported",error:`Node.js ${t} detected without native WebSocket support.`,workaround:`For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })`}}return{type:"unsupported",error:"Unknown JavaScript runtime without WebSocket support.",workaround:"Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."}}static getWebSocketConstructor(){const e=this.detectEnvironment();if(e.constructor)return e.constructor;let t=e.error||"WebSocket not supported in this environment.";throw e.workaround&&(t+=`

Suggested solution: ${e.workaround}`),new Error(t)}static createWebSocket(e,t){const s=this.getWebSocketConstructor();return new s(e,t)}static isWebSocketSupported(){try{const e=this.detectEnvironment();return e.type==="native"||e.type==="ws"}catch{return!1}}}const uw="2.15.1",hw=`realtime-js/${uw}`,dw="1.0.0",Fr=1e4,fw=1e3,pw=100;var jn;(function(n){n[n.connecting=0]="connecting",n[n.open=1]="open",n[n.closing=2]="closing",n[n.closed=3]="closed"})(jn||(jn={}));var ee;(function(n){n.closed="closed",n.errored="errored",n.joined="joined",n.joining="joining",n.leaving="leaving"})(ee||(ee={}));var ke;(function(n){n.close="phx_close",n.error="phx_error",n.join="phx_join",n.reply="phx_reply",n.leave="phx_leave",n.access_token="access_token"})(ke||(ke={}));var Br;(function(n){n.websocket="websocket"})(Br||(Br={}));var kt;(function(n){n.Connecting="connecting",n.Open="open",n.Closing="closing",n.Closed="closed"})(kt||(kt={}));class gw{constructor(){this.HEADER_LENGTH=1}decode(e,t){return e.constructor===ArrayBuffer?t(this._binaryDecode(e)):t(typeof e=="string"?JSON.parse(e):{})}_binaryDecode(e){const t=new DataView(e),s=new TextDecoder;return this._decodeBroadcast(e,t,s)}_decodeBroadcast(e,t,s){const i=t.getUint8(1),r=t.getUint8(2);let o=this.HEADER_LENGTH+2;const a=s.decode(e.slice(o,o+i));o=o+i;const l=s.decode(e.slice(o,o+r));o=o+r;const c=JSON.parse(s.decode(e.slice(o,e.byteLength)));return{ref:null,topic:a,event:l,payload:c}}}class xh{constructor(e,t){this.callback=e,this.timerCalc=t,this.timer=void 0,this.tries=0,this.callback=e,this.timerCalc=t}reset(){this.tries=0,clearTimeout(this.timer),this.timer=void 0}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}}var z;(function(n){n.abstime="abstime",n.bool="bool",n.date="date",n.daterange="daterange",n.float4="float4",n.float8="float8",n.int2="int2",n.int4="int4",n.int4range="int4range",n.int8="int8",n.int8range="int8range",n.json="json",n.jsonb="jsonb",n.money="money",n.numeric="numeric",n.oid="oid",n.reltime="reltime",n.text="text",n.time="time",n.timestamp="timestamp",n.timestamptz="timestamptz",n.timetz="timetz",n.tsrange="tsrange",n.tstzrange="tstzrange"})(z||(z={}));const Nl=(n,e,t={})=>{var s;const i=(s=t.skipTypes)!==null&&s!==void 0?s:[];return Object.keys(e).reduce((r,o)=>(r[o]=mw(o,n,e,i),r),{})},mw=(n,e,t,s)=>{const i=e.find(a=>a.name===n),r=i==null?void 0:i.type,o=t[n];return r&&!s.includes(r)?Dh(r,o):Ur(o)},Dh=(n,e)=>{if(n.charAt(0)==="_"){const t=n.slice(1,n.length);return ww(e,t)}switch(n){case z.bool:return _w(e);case z.float4:case z.float8:case z.int2:case z.int4:case z.int8:case z.numeric:case z.oid:return yw(e);case z.json:case z.jsonb:return vw(e);case z.timestamp:return bw(e);case z.abstime:case z.date:case z.daterange:case z.int4range:case z.int8range:case z.money:case z.reltime:case z.text:case z.time:case z.timestamptz:case z.timetz:case z.tsrange:case z.tstzrange:return Ur(e);default:return Ur(e)}},Ur=n=>n,_w=n=>{switch(n){case"t":return!0;case"f":return!1;default:return n}},yw=n=>{if(typeof n=="string"){const e=parseFloat(n);if(!Number.isNaN(e))return e}return n},vw=n=>{if(typeof n=="string")try{return JSON.parse(n)}catch(e){return console.log(`JSON parse error: ${e}`),n}return n},ww=(n,e)=>{if(typeof n!="string")return n;const t=n.length-1,s=n[t];if(n[0]==="{"&&s==="}"){let r;const o=n.slice(1,t);try{r=JSON.parse("["+o+"]")}catch{r=o?o.split(","):[]}return r.map(a=>Dh(e,a))}return n},bw=n=>typeof n=="string"?n.replace(" ","T"):n,Lh=n=>{let e=n;return e=e.replace(/^ws/i,"http"),e=e.replace(/(\/socket\/websocket|\/socket|\/websocket)\/?$/i,""),e.replace(/\/+$/,"")+"/api/broadcast"};class or{constructor(e,t,s={},i=Fr){this.channel=e,this.event=t,this.payload=s,this.timeout=i,this.sent=!1,this.timeoutTimer=void 0,this.ref="",this.receivedResp=null,this.recHooks=[],this.refEvent=null}resend(e){this.timeout=e,this._cancelRefEvent(),this.ref="",this.refEvent=null,this.receivedResp=null,this.sent=!1,this.send()}send(){this._hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload,ref:this.ref,join_ref:this.channel._joinRef()}))}updatePayload(e){this.payload=Object.assign(Object.assign({},this.payload),e)}receive(e,t){var s;return this._hasReceived(e)&&t((s=this.receivedResp)===null||s===void 0?void 0:s.response),this.recHooks.push({status:e,callback:t}),this}startTimeout(){if(this.timeoutTimer)return;this.ref=this.channel.socket._makeRef(),this.refEvent=this.channel._replyEventName(this.ref);const e=t=>{this._cancelRefEvent(),this._cancelTimeout(),this.receivedResp=t,this._matchReceive(t)};this.channel._on(this.refEvent,{},e),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}trigger(e,t){this.refEvent&&this.channel._trigger(this.refEvent,{status:e,response:t})}destroy(){this._cancelRefEvent(),this._cancelTimeout()}_cancelRefEvent(){this.refEvent&&this.channel._off(this.refEvent,{})}_cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=void 0}_matchReceive({status:e,response:t}){this.recHooks.filter(s=>s.status===e).forEach(s=>s.callback(t))}_hasReceived(e){return this.receivedResp&&this.receivedResp.status===e}}var xl;(function(n){n.SYNC="sync",n.JOIN="join",n.LEAVE="leave"})(xl||(xl={}));class Fn{constructor(e,t){this.channel=e,this.state={},this.pendingDiffs=[],this.joinRef=null,this.enabled=!1,this.caller={onJoin:()=>{},onLeave:()=>{},onSync:()=>{}};const s=(t==null?void 0:t.events)||{state:"presence_state",diff:"presence_diff"};this.channel._on(s.state,{},i=>{const{onJoin:r,onLeave:o,onSync:a}=this.caller;this.joinRef=this.channel._joinRef(),this.state=Fn.syncState(this.state,i,r,o),this.pendingDiffs.forEach(l=>{this.state=Fn.syncDiff(this.state,l,r,o)}),this.pendingDiffs=[],a()}),this.channel._on(s.diff,{},i=>{const{onJoin:r,onLeave:o,onSync:a}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(i):(this.state=Fn.syncDiff(this.state,i,r,o),a())}),this.onJoin((i,r,o)=>{this.channel._trigger("presence",{event:"join",key:i,currentPresences:r,newPresences:o})}),this.onLeave((i,r,o)=>{this.channel._trigger("presence",{event:"leave",key:i,currentPresences:r,leftPresences:o})}),this.onSync(()=>{this.channel._trigger("presence",{event:"sync"})})}static syncState(e,t,s,i){const r=this.cloneDeep(e),o=this.transformState(t),a={},l={};return this.map(r,(c,u)=>{o[c]||(l[c]=u)}),this.map(o,(c,u)=>{const h=r[c];if(h){const d=u.map(S=>S.presence_ref),_=h.map(S=>S.presence_ref),w=u.filter(S=>_.indexOf(S.presence_ref)<0),E=h.filter(S=>d.indexOf(S.presence_ref)<0);w.length>0&&(a[c]=w),E.length>0&&(l[c]=E)}else a[c]=u}),this.syncDiff(r,{joins:a,leaves:l},s,i)}static syncDiff(e,t,s,i){const{joins:r,leaves:o}={joins:this.transformState(t.joins),leaves:this.transformState(t.leaves)};return s||(s=()=>{}),i||(i=()=>{}),this.map(r,(a,l)=>{var c;const u=(c=e[a])!==null&&c!==void 0?c:[];if(e[a]=this.cloneDeep(l),u.length>0){const h=e[a].map(_=>_.presence_ref),d=u.filter(_=>h.indexOf(_.presence_ref)<0);e[a].unshift(...d)}s(a,u,l)}),this.map(o,(a,l)=>{let c=e[a];if(!c)return;const u=l.map(h=>h.presence_ref);c=c.filter(h=>u.indexOf(h.presence_ref)<0),e[a]=c,i(a,c,l),c.length===0&&delete e[a]}),e}static map(e,t){return Object.getOwnPropertyNames(e).map(s=>t(s,e[s]))}static transformState(e){return e=this.cloneDeep(e),Object.getOwnPropertyNames(e).reduce((t,s)=>{const i=e[s];return"metas"in i?t[s]=i.metas.map(r=>(r.presence_ref=r.phx_ref,delete r.phx_ref,delete r.phx_ref_prev,r)):t[s]=i,t},{})}static cloneDeep(e){return JSON.parse(JSON.stringify(e))}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel._joinRef()}}var Dl;(function(n){n.ALL="*",n.INSERT="INSERT",n.UPDATE="UPDATE",n.DELETE="DELETE"})(Dl||(Dl={}));var Bn;(function(n){n.BROADCAST="broadcast",n.PRESENCE="presence",n.POSTGRES_CHANGES="postgres_changes",n.SYSTEM="system"})(Bn||(Bn={}));var ze;(function(n){n.SUBSCRIBED="SUBSCRIBED",n.TIMED_OUT="TIMED_OUT",n.CLOSED="CLOSED",n.CHANNEL_ERROR="CHANNEL_ERROR"})(ze||(ze={}));class ta{constructor(e,t={config:{}},s){this.topic=e,this.params=t,this.socket=s,this.bindings={},this.state=ee.closed,this.joinedOnce=!1,this.pushBuffer=[],this.subTopic=e.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},t.config),this.timeout=this.socket.timeout,this.joinPush=new or(this,ke.join,this.params,this.timeout),this.rejoinTimer=new xh(()=>this._rejoinUntilConnected(),this.socket.reconnectAfterMs),this.joinPush.receive("ok",()=>{this.state=ee.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(i=>i.send()),this.pushBuffer=[]}),this._onClose(()=>{this.rejoinTimer.reset(),this.socket.log("channel",`close ${this.topic} ${this._joinRef()}`),this.state=ee.closed,this.socket._remove(this)}),this._onError(i=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,i),this.state=ee.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("timeout",()=>{this._isJoining()&&(this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),this.state=ee.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("error",i=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,i),this.state=ee.errored,this.rejoinTimer.scheduleTimeout())}),this._on(ke.reply,{},(i,r)=>{this._trigger(this._replyEventName(r),i)}),this.presence=new Fn(this),this.broadcastEndpointURL=Lh(this.socket.endPoint),this.private=this.params.config.private||!1}subscribe(e,t=this.timeout){var s,i;if(this.socket.isConnected()||this.socket.connect(),this.state==ee.closed){const{config:{broadcast:r,presence:o,private:a}}=this.params,l=(i=(s=this.bindings.postgres_changes)===null||s===void 0?void 0:s.map(d=>d.filter))!==null&&i!==void 0?i:[],c=!!this.bindings[Bn.PRESENCE]&&this.bindings[Bn.PRESENCE].length>0,u={},h={broadcast:r,presence:Object.assign(Object.assign({},o),{enabled:c}),postgres_changes:l,private:a};this.socket.accessTokenValue&&(u.access_token=this.socket.accessTokenValue),this._onError(d=>e==null?void 0:e(ze.CHANNEL_ERROR,d)),this._onClose(()=>e==null?void 0:e(ze.CLOSED)),this.updateJoinPayload(Object.assign({config:h},u)),this.joinedOnce=!0,this._rejoin(t),this.joinPush.receive("ok",async({postgres_changes:d})=>{var _;if(this.socket.setAuth(),d===void 0){e==null||e(ze.SUBSCRIBED);return}else{const w=this.bindings.postgres_changes,E=(_=w==null?void 0:w.length)!==null&&_!==void 0?_:0,S=[];for(let R=0;R<E;R++){const j=w[R],{filter:{event:k,schema:O,table:Z,filter:B}}=j,m=d&&d[R];if(m&&m.event===k&&m.schema===O&&m.table===Z&&m.filter===B)S.push(Object.assign(Object.assign({},j),{id:m.id}));else{this.unsubscribe(),this.state=ee.errored,e==null||e(ze.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=S,e&&e(ze.SUBSCRIBED);return}}).receive("error",d=>{this.state=ee.errored,e==null||e(ze.CHANNEL_ERROR,new Error(JSON.stringify(Object.values(d).join(", ")||"error")))}).receive("timeout",()=>{e==null||e(ze.TIMED_OUT)})}return this}presenceState(){return this.presence.state}async track(e,t={}){return await this.send({type:"presence",event:"track",payload:e},t.timeout||this.timeout)}async untrack(e={}){return await this.send({type:"presence",event:"untrack"},e)}on(e,t,s){return this.state===ee.joined&&e===Bn.PRESENCE&&(this.socket.log("channel",`resubscribe to ${this.topic} due to change in presence callbacks on joined channel`),this.unsubscribe().then(()=>this.subscribe())),this._on(e,t,s)}async send(e,t={}){var s,i;if(!this._canPush()&&e.type==="broadcast"){const{event:r,payload:o}=e,l={method:"POST",headers:{Authorization:this.socket.accessTokenValue?`Bearer ${this.socket.accessTokenValue}`:"",apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"},body:JSON.stringify({messages:[{topic:this.subTopic,event:r,payload:o,private:this.private}]})};try{const c=await this._fetchWithTimeout(this.broadcastEndpointURL,l,(s=t.timeout)!==null&&s!==void 0?s:this.timeout);return await((i=c.body)===null||i===void 0?void 0:i.cancel()),c.ok?"ok":"error"}catch(c){return c.name==="AbortError"?"timed out":"error"}}else return new Promise(r=>{var o,a,l;const c=this._push(e.type,e,t.timeout||this.timeout);e.type==="broadcast"&&!(!((l=(a=(o=this.params)===null||o===void 0?void 0:o.config)===null||a===void 0?void 0:a.broadcast)===null||l===void 0)&&l.ack)&&r("ok"),c.receive("ok",()=>r("ok")),c.receive("error",()=>r("error")),c.receive("timeout",()=>r("timed out"))})}updateJoinPayload(e){this.joinPush.updatePayload(e)}unsubscribe(e=this.timeout){this.state=ee.leaving;const t=()=>{this.socket.log("channel",`leave ${this.topic}`),this._trigger(ke.close,"leave",this._joinRef())};this.joinPush.destroy();let s=null;return new Promise(i=>{s=new or(this,ke.leave,{},e),s.receive("ok",()=>{t(),i("ok")}).receive("timeout",()=>{t(),i("timed out")}).receive("error",()=>{i("error")}),s.send(),this._canPush()||s.trigger("ok",{})}).finally(()=>{s==null||s.destroy()})}teardown(){this.pushBuffer.forEach(e=>e.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=ee.closed,this.bindings={}}async _fetchWithTimeout(e,t,s){const i=new AbortController,r=setTimeout(()=>i.abort(),s),o=await this.socket.fetch(e,Object.assign(Object.assign({},t),{signal:i.signal}));return clearTimeout(r),o}_push(e,t,s=this.timeout){if(!this.joinedOnce)throw`tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;let i=new or(this,e,t,s);return this._canPush()?i.send():this._addToPushBuffer(i),i}_addToPushBuffer(e){if(e.startTimeout(),this.pushBuffer.push(e),this.pushBuffer.length>pw){const t=this.pushBuffer.shift();t&&(t.destroy(),this.socket.log("channel",`discarded push due to buffer overflow: ${t.event}`,t.payload))}}_onMessage(e,t,s){return t}_isMember(e){return this.topic===e}_joinRef(){return this.joinPush.ref}_trigger(e,t,s){var i,r;const o=e.toLocaleLowerCase(),{close:a,error:l,leave:c,join:u}=ke;if(s&&[a,l,c,u].indexOf(o)>=0&&s!==this._joinRef())return;let d=this._onMessage(o,t,s);if(t&&!d)throw"channel onMessage callbacks must return the payload, modified or unmodified";["insert","update","delete"].includes(o)?(i=this.bindings.postgres_changes)===null||i===void 0||i.filter(_=>{var w,E,S;return((w=_.filter)===null||w===void 0?void 0:w.event)==="*"||((S=(E=_.filter)===null||E===void 0?void 0:E.event)===null||S===void 0?void 0:S.toLocaleLowerCase())===o}).map(_=>_.callback(d,s)):(r=this.bindings[o])===null||r===void 0||r.filter(_=>{var w,E,S,R,j,k;if(["broadcast","presence","postgres_changes"].includes(o))if("id"in _){const O=_.id,Z=(w=_.filter)===null||w===void 0?void 0:w.event;return O&&((E=t.ids)===null||E===void 0?void 0:E.includes(O))&&(Z==="*"||(Z==null?void 0:Z.toLocaleLowerCase())===((S=t.data)===null||S===void 0?void 0:S.type.toLocaleLowerCase()))}else{const O=(j=(R=_==null?void 0:_.filter)===null||R===void 0?void 0:R.event)===null||j===void 0?void 0:j.toLocaleLowerCase();return O==="*"||O===((k=t==null?void 0:t.event)===null||k===void 0?void 0:k.toLocaleLowerCase())}else return _.type.toLocaleLowerCase()===o}).map(_=>{if(typeof d=="object"&&"ids"in d){const w=d.data,{schema:E,table:S,commit_timestamp:R,type:j,errors:k}=w;d=Object.assign(Object.assign({},{schema:E,table:S,commit_timestamp:R,eventType:j,new:{},old:{},errors:k}),this._getPayloadRecords(w))}_.callback(d,s)})}_isClosed(){return this.state===ee.closed}_isJoined(){return this.state===ee.joined}_isJoining(){return this.state===ee.joining}_isLeaving(){return this.state===ee.leaving}_replyEventName(e){return`chan_reply_${e}`}_on(e,t,s){const i=e.toLocaleLowerCase(),r={type:i,filter:t,callback:s};return this.bindings[i]?this.bindings[i].push(r):this.bindings[i]=[r],this}_off(e,t){const s=e.toLocaleLowerCase();return this.bindings[s]&&(this.bindings[s]=this.bindings[s].filter(i=>{var r;return!(((r=i.type)===null||r===void 0?void 0:r.toLocaleLowerCase())===s&&ta.isEqual(i.filter,t))})),this}static isEqual(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const s in e)if(e[s]!==t[s])return!1;return!0}_rejoinUntilConnected(){this.rejoinTimer.scheduleTimeout(),this.socket.isConnected()&&this._rejoin()}_onClose(e){this._on(ke.close,{},e)}_onError(e){this._on(ke.error,{},t=>e(t))}_canPush(){return this.socket.isConnected()&&this._isJoined()}_rejoin(e=this.timeout){this._isLeaving()||(this.socket._leaveOpenTopic(this.topic),this.state=ee.joining,this.joinPush.resend(e))}_getPayloadRecords(e){const t={new:{},old:{}};return(e.type==="INSERT"||e.type==="UPDATE")&&(t.new=Nl(e.columns,e.record)),(e.type==="UPDATE"||e.type==="DELETE")&&(t.old=Nl(e.columns,e.old_record)),t}}const Ll=()=>{},bs={HEARTBEAT_INTERVAL:25e3,RECONNECT_DELAY:10,HEARTBEAT_TIMEOUT_FALLBACK:100},Sw=[1e3,2e3,5e3,1e4],Ew=1e4,Tw=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;class Iw{constructor(e,t){var s;if(this.accessTokenValue=null,this.apiKey=null,this.channels=new Array,this.endPoint="",this.httpEndpoint="",this.headers={},this.params={},this.timeout=Fr,this.transport=null,this.heartbeatIntervalMs=bs.HEARTBEAT_INTERVAL,this.heartbeatTimer=void 0,this.pendingHeartbeatRef=null,this.heartbeatCallback=Ll,this.ref=0,this.reconnectTimer=null,this.logger=Ll,this.conn=null,this.sendBuffer=[],this.serializer=new gw,this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.accessToken=null,this._connectionState="disconnected",this._wasManualDisconnect=!1,this._authPromise=null,this._resolveFetch=i=>{let r;return i?r=i:typeof fetch>"u"?r=(...o)=>gs(async()=>{const{default:a}=await Promise.resolve().then(()=>bn);return{default:a}},void 0).then(({default:a})=>a(...o)).catch(a=>{throw new Error(`Failed to load @supabase/node-fetch: ${a.message}. This is required for HTTP requests in Node.js environments without native fetch.`)}):r=fetch,(...o)=>r(...o)},!(!((s=t==null?void 0:t.params)===null||s===void 0)&&s.apikey))throw new Error("API key is required to connect to Realtime");this.apiKey=t.params.apikey,this.endPoint=`${e}/${Br.websocket}`,this.httpEndpoint=Lh(e),this._initializeOptions(t),this._setupReconnectionTimer(),this.fetch=this._resolveFetch(t==null?void 0:t.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.conn!==null&&this.isConnected())){if(this._setConnectionState("connecting"),this._setAuthSafely("connect"),this.transport)this.conn=new this.transport(this.endpointURL());else try{this.conn=cw.createWebSocket(this.endpointURL())}catch(e){this._setConnectionState("disconnected");const t=e.message;throw t.includes("Node.js")?new Error(`${t}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`):new Error(`WebSocket not available: ${t}`)}this._setupConnectionHandlers()}}endpointURL(){return this._appendParams(this.endPoint,Object.assign({},this.params,{vsn:dw}))}disconnect(e,t){if(!this.isDisconnecting())if(this._setConnectionState("disconnecting",!0),this.conn){const s=setTimeout(()=>{this._setConnectionState("disconnected")},100);this.conn.onclose=()=>{clearTimeout(s),this._setConnectionState("disconnected")},e?this.conn.close(e,t??""):this.conn.close(),this._teardownConnection()}else this._setConnectionState("disconnected")}getChannels(){return this.channels}async removeChannel(e){const t=await e.unsubscribe();return this.channels.length===0&&this.disconnect(),t}async removeAllChannels(){const e=await Promise.all(this.channels.map(t=>t.unsubscribe()));return this.channels=[],this.disconnect(),e}log(e,t,s){this.logger(e,t,s)}connectionState(){switch(this.conn&&this.conn.readyState){case jn.connecting:return kt.Connecting;case jn.open:return kt.Open;case jn.closing:return kt.Closing;default:return kt.Closed}}isConnected(){return this.connectionState()===kt.Open}isConnecting(){return this._connectionState==="connecting"}isDisconnecting(){return this._connectionState==="disconnecting"}channel(e,t={config:{}}){const s=`realtime:${e}`,i=this.getChannels().find(r=>r.topic===s);if(i)return i;{const r=new ta(`realtime:${e}`,t,this);return this.channels.push(r),r}}push(e){const{topic:t,event:s,payload:i,ref:r}=e,o=()=>{this.encode(e,a=>{var l;(l=this.conn)===null||l===void 0||l.send(a)})};this.log("push",`${t} ${s} (${r})`,i),this.isConnected()?o():this.sendBuffer.push(o)}async setAuth(e=null){this._authPromise=this._performAuth(e);try{await this._authPromise}finally{this._authPromise=null}}async sendHeartbeat(){var e;if(!this.isConnected()){this.heartbeatCallback("disconnected");return}if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.log("transport","heartbeat timeout. Attempting to re-establish connection"),this.heartbeatCallback("timeout"),this._wasManualDisconnect=!1,(e=this.conn)===null||e===void 0||e.close(fw,"heartbeat timeout"),setTimeout(()=>{var t;this.isConnected()||(t=this.reconnectTimer)===null||t===void 0||t.scheduleTimeout()},bs.HEARTBEAT_TIMEOUT_FALLBACK);return}this.pendingHeartbeatRef=this._makeRef(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef}),this.heartbeatCallback("sent"),this._setAuthSafely("heartbeat")}onHeartbeat(e){this.heartbeatCallback=e}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(e=>e()),this.sendBuffer=[])}_makeRef(){let e=this.ref+1;return e===this.ref?this.ref=0:this.ref=e,this.ref.toString()}_leaveOpenTopic(e){let t=this.channels.find(s=>s.topic===e&&(s._isJoined()||s._isJoining()));t&&(this.log("transport",`leaving duplicate topic "${e}"`),t.unsubscribe())}_remove(e){this.channels=this.channels.filter(t=>t.topic!==e.topic)}_onConnMessage(e){this.decode(e.data,t=>{t.topic==="phoenix"&&t.event==="phx_reply"&&this.heartbeatCallback(t.payload.status==="ok"?"ok":"error"),t.ref&&t.ref===this.pendingHeartbeatRef&&(this.pendingHeartbeatRef=null);const{topic:s,event:i,payload:r,ref:o}=t,a=o?`(${o})`:"",l=r.status||"";this.log("receive",`${l} ${s} ${i} ${a}`.trim(),r),this.channels.filter(c=>c._isMember(s)).forEach(c=>c._trigger(i,r,o)),this._triggerStateCallbacks("message",t)})}_clearTimer(e){var t;e==="heartbeat"&&this.heartbeatTimer?(clearInterval(this.heartbeatTimer),this.heartbeatTimer=void 0):e==="reconnect"&&((t=this.reconnectTimer)===null||t===void 0||t.reset())}_clearAllTimers(){this._clearTimer("heartbeat"),this._clearTimer("reconnect")}_setupConnectionHandlers(){this.conn&&("binaryType"in this.conn&&(this.conn.binaryType="arraybuffer"),this.conn.onopen=()=>this._onConnOpen(),this.conn.onerror=e=>this._onConnError(e),this.conn.onmessage=e=>this._onConnMessage(e),this.conn.onclose=e=>this._onConnClose(e))}_teardownConnection(){this.conn&&(this.conn.onopen=null,this.conn.onerror=null,this.conn.onmessage=null,this.conn.onclose=null,this.conn=null),this._clearAllTimers(),this.channels.forEach(e=>e.teardown())}_onConnOpen(){this._setConnectionState("connected"),this.log("transport",`connected to ${this.endpointURL()}`),this.flushSendBuffer(),this._clearTimer("reconnect"),this.worker?this.workerRef||this._startWorkerHeartbeat():this._startHeartbeat(),this._triggerStateCallbacks("open")}_startHeartbeat(){this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval(()=>this.sendHeartbeat(),this.heartbeatIntervalMs)}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=t=>{this.log("worker","worker error",t.message),this.workerRef.terminate()},this.workerRef.onmessage=t=>{t.data.event==="keepAlive"&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_onConnClose(e){var t;this._setConnectionState("disconnected"),this.log("transport","close",e),this._triggerChanError(),this._clearTimer("heartbeat"),this._wasManualDisconnect||(t=this.reconnectTimer)===null||t===void 0||t.scheduleTimeout(),this._triggerStateCallbacks("close",e)}_onConnError(e){this._setConnectionState("disconnected"),this.log("transport",`${e}`),this._triggerChanError(),this._triggerStateCallbacks("error",e)}_triggerChanError(){this.channels.forEach(e=>e._trigger(ke.error))}_appendParams(e,t){if(Object.keys(t).length===0)return e;const s=e.match(/\?/)?"&":"?",i=new URLSearchParams(t);return`${e}${s}${i}`}_workerObjectUrl(e){let t;if(e)t=e;else{const s=new Blob([Tw],{type:"application/javascript"});t=URL.createObjectURL(s)}return t}_setConnectionState(e,t=!1){this._connectionState=e,e==="connecting"?this._wasManualDisconnect=!1:e==="disconnecting"&&(this._wasManualDisconnect=t)}async _performAuth(e=null){let t;e?t=e:this.accessToken?t=await this.accessToken():t=this.accessTokenValue,this.accessTokenValue!=t&&(this.accessTokenValue=t,this.channels.forEach(s=>{const i={access_token:t,version:hw};t&&s.updateJoinPayload(i),s.joinedOnce&&s._isJoined()&&s._push(ke.access_token,{access_token:t})}))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(e="general"){this.setAuth().catch(t=>{this.log("error",`error setting auth in ${e}`,t)})}_triggerStateCallbacks(e,t){try{this.stateChangeCallbacks[e].forEach(s=>{try{s(t)}catch(i){this.log("error",`error in ${e} callback`,i)}})}catch(s){this.log("error",`error triggering ${e} callbacks`,s)}}_setupReconnectionTimer(){this.reconnectTimer=new xh(async()=>{setTimeout(async()=>{await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()},bs.RECONNECT_DELAY)},this.reconnectAfterMs)}_initializeOptions(e){var t,s,i,r,o,a,l,c;if(this.transport=(t=e==null?void 0:e.transport)!==null&&t!==void 0?t:null,this.timeout=(s=e==null?void 0:e.timeout)!==null&&s!==void 0?s:Fr,this.heartbeatIntervalMs=(i=e==null?void 0:e.heartbeatIntervalMs)!==null&&i!==void 0?i:bs.HEARTBEAT_INTERVAL,this.worker=(r=e==null?void 0:e.worker)!==null&&r!==void 0?r:!1,this.accessToken=(o=e==null?void 0:e.accessToken)!==null&&o!==void 0?o:null,e!=null&&e.params&&(this.params=e.params),e!=null&&e.logger&&(this.logger=e.logger),(e!=null&&e.logLevel||e!=null&&e.log_level)&&(this.logLevel=e.logLevel||e.log_level,this.params=Object.assign(Object.assign({},this.params),{log_level:this.logLevel})),this.reconnectAfterMs=(a=e==null?void 0:e.reconnectAfterMs)!==null&&a!==void 0?a:u=>Sw[u-1]||Ew,this.encode=(l=e==null?void 0:e.encode)!==null&&l!==void 0?l:(u,h)=>h(JSON.stringify(u)),this.decode=(c=e==null?void 0:e.decode)!==null&&c!==void 0?c:this.serializer.decode.bind(this.serializer),this.worker){if(typeof window<"u"&&!window.Worker)throw new Error("Web Worker is not supported");this.workerUrl=e==null?void 0:e.workerUrl}}}class na extends Error{constructor(e){super(e),this.__isStorageError=!0,this.name="StorageError"}}function ie(n){return typeof n=="object"&&n!==null&&"__isStorageError"in n}class kw extends na{constructor(e,t,s){super(e),this.name="StorageApiError",this.status=t,this.statusCode=s}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}}class Wr extends na{constructor(e,t){super(e),this.name="StorageUnknownError",this.originalError=t}}var Cw=function(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{c(s.next(u))}catch(h){o(h)}}function l(u){try{c(s.throw(u))}catch(h){o(h)}}function c(u){u.done?r(u.value):i(u.value).then(a,l)}c((s=s.apply(n,e||[])).next())})};const Mh=n=>{let e;return n?e=n:typeof fetch>"u"?e=(...t)=>gs(async()=>{const{default:s}=await Promise.resolve().then(()=>bn);return{default:s}},void 0).then(({default:s})=>s(...t)):e=fetch,(...t)=>e(...t)},Aw=()=>Cw(void 0,void 0,void 0,function*(){return typeof Response>"u"?(yield gs(()=>Promise.resolve().then(()=>bn),void 0)).Response:Response}),Vr=n=>{if(Array.isArray(n))return n.map(t=>Vr(t));if(typeof n=="function"||n!==Object(n))return n;const e={};return Object.entries(n).forEach(([t,s])=>{const i=t.replace(/([-_][a-z])/gi,r=>r.toUpperCase().replace(/[-_]/g,""));e[i]=Vr(s)}),e},Rw=n=>{if(typeof n!="object"||n===null)return!1;const e=Object.getPrototypeOf(n);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in n)&&!(Symbol.iterator in n)};var Kt=function(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{c(s.next(u))}catch(h){o(h)}}function l(u){try{c(s.throw(u))}catch(h){o(h)}}function c(u){u.done?r(u.value):i(u.value).then(a,l)}c((s=s.apply(n,e||[])).next())})};const ar=n=>n.msg||n.message||n.error_description||n.error||JSON.stringify(n),Pw=(n,e,t)=>Kt(void 0,void 0,void 0,function*(){const s=yield Aw();n instanceof s&&!(t!=null&&t.noResolveJson)?n.json().then(i=>{const r=n.status||500,o=(i==null?void 0:i.statusCode)||r+"";e(new kw(ar(i),r,o))}).catch(i=>{e(new Wr(ar(i),i))}):e(new Wr(ar(n),n))}),Ow=(n,e,t,s)=>{const i={method:n,headers:(e==null?void 0:e.headers)||{}};return n==="GET"||!s?i:(Rw(s)?(i.headers=Object.assign({"Content-Type":"application/json"},e==null?void 0:e.headers),i.body=JSON.stringify(s)):i.body=s,Object.assign(Object.assign({},i),t))};function _s(n,e,t,s,i,r){return Kt(this,void 0,void 0,function*(){return new Promise((o,a)=>{n(t,Ow(e,s,i,r)).then(l=>{if(!l.ok)throw l;return s!=null&&s.noResolveJson?l:l.json()}).then(l=>o(l)).catch(l=>Pw(l,a,s))})})}function si(n,e,t,s){return Kt(this,void 0,void 0,function*(){return _s(n,"GET",e,t,s)})}function Ke(n,e,t,s,i){return Kt(this,void 0,void 0,function*(){return _s(n,"POST",e,s,i,t)})}function qr(n,e,t,s,i){return Kt(this,void 0,void 0,function*(){return _s(n,"PUT",e,s,i,t)})}function Nw(n,e,t,s){return Kt(this,void 0,void 0,function*(){return _s(n,"HEAD",e,Object.assign(Object.assign({},t),{noResolveJson:!0}),s)})}function $h(n,e,t,s,i){return Kt(this,void 0,void 0,function*(){return _s(n,"DELETE",e,s,i,t)})}var ge=function(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{c(s.next(u))}catch(h){o(h)}}function l(u){try{c(s.throw(u))}catch(h){o(h)}}function c(u){u.done?r(u.value):i(u.value).then(a,l)}c((s=s.apply(n,e||[])).next())})};const xw={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},Ml={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};class Dw{constructor(e,t={},s,i){this.url=e,this.headers=t,this.bucketId=s,this.fetch=Mh(i)}uploadOrUpdate(e,t,s,i){return ge(this,void 0,void 0,function*(){try{let r;const o=Object.assign(Object.assign({},Ml),i);let a=Object.assign(Object.assign({},this.headers),e==="POST"&&{"x-upsert":String(o.upsert)});const l=o.metadata;typeof Blob<"u"&&s instanceof Blob?(r=new FormData,r.append("cacheControl",o.cacheControl),l&&r.append("metadata",this.encodeMetadata(l)),r.append("",s)):typeof FormData<"u"&&s instanceof FormData?(r=s,r.append("cacheControl",o.cacheControl),l&&r.append("metadata",this.encodeMetadata(l))):(r=s,a["cache-control"]=`max-age=${o.cacheControl}`,a["content-type"]=o.contentType,l&&(a["x-metadata"]=this.toBase64(this.encodeMetadata(l)))),i!=null&&i.headers&&(a=Object.assign(Object.assign({},a),i.headers));const c=this._removeEmptyFolders(t),u=this._getFinalPath(c),h=yield(e=="PUT"?qr:Ke)(this.fetch,`${this.url}/object/${u}`,r,Object.assign({headers:a},o!=null&&o.duplex?{duplex:o.duplex}:{}));return{data:{path:c,id:h.Id,fullPath:h.Key},error:null}}catch(r){if(ie(r))return{data:null,error:r};throw r}})}upload(e,t,s){return ge(this,void 0,void 0,function*(){return this.uploadOrUpdate("POST",e,t,s)})}uploadToSignedUrl(e,t,s,i){return ge(this,void 0,void 0,function*(){const r=this._removeEmptyFolders(e),o=this._getFinalPath(r),a=new URL(this.url+`/object/upload/sign/${o}`);a.searchParams.set("token",t);try{let l;const c=Object.assign({upsert:Ml.upsert},i),u=Object.assign(Object.assign({},this.headers),{"x-upsert":String(c.upsert)});typeof Blob<"u"&&s instanceof Blob?(l=new FormData,l.append("cacheControl",c.cacheControl),l.append("",s)):typeof FormData<"u"&&s instanceof FormData?(l=s,l.append("cacheControl",c.cacheControl)):(l=s,u["cache-control"]=`max-age=${c.cacheControl}`,u["content-type"]=c.contentType);const h=yield qr(this.fetch,a.toString(),l,{headers:u});return{data:{path:r,fullPath:h.Key},error:null}}catch(l){if(ie(l))return{data:null,error:l};throw l}})}createSignedUploadUrl(e,t){return ge(this,void 0,void 0,function*(){try{let s=this._getFinalPath(e);const i=Object.assign({},this.headers);t!=null&&t.upsert&&(i["x-upsert"]="true");const r=yield Ke(this.fetch,`${this.url}/object/upload/sign/${s}`,{},{headers:i}),o=new URL(this.url+r.url),a=o.searchParams.get("token");if(!a)throw new na("No token returned by API");return{data:{signedUrl:o.toString(),path:e,token:a},error:null}}catch(s){if(ie(s))return{data:null,error:s};throw s}})}update(e,t,s){return ge(this,void 0,void 0,function*(){return this.uploadOrUpdate("PUT",e,t,s)})}move(e,t,s){return ge(this,void 0,void 0,function*(){try{return{data:yield Ke(this.fetch,`${this.url}/object/move`,{bucketId:this.bucketId,sourceKey:e,destinationKey:t,destinationBucket:s==null?void 0:s.destinationBucket},{headers:this.headers}),error:null}}catch(i){if(ie(i))return{data:null,error:i};throw i}})}copy(e,t,s){return ge(this,void 0,void 0,function*(){try{return{data:{path:(yield Ke(this.fetch,`${this.url}/object/copy`,{bucketId:this.bucketId,sourceKey:e,destinationKey:t,destinationBucket:s==null?void 0:s.destinationBucket},{headers:this.headers})).Key},error:null}}catch(i){if(ie(i))return{data:null,error:i};throw i}})}createSignedUrl(e,t,s){return ge(this,void 0,void 0,function*(){try{let i=this._getFinalPath(e),r=yield Ke(this.fetch,`${this.url}/object/sign/${i}`,Object.assign({expiresIn:t},s!=null&&s.transform?{transform:s.transform}:{}),{headers:this.headers});const o=s!=null&&s.download?`&download=${s.download===!0?"":s.download}`:"";return r={signedUrl:encodeURI(`${this.url}${r.signedURL}${o}`)},{data:r,error:null}}catch(i){if(ie(i))return{data:null,error:i};throw i}})}createSignedUrls(e,t,s){return ge(this,void 0,void 0,function*(){try{const i=yield Ke(this.fetch,`${this.url}/object/sign/${this.bucketId}`,{expiresIn:t,paths:e},{headers:this.headers}),r=s!=null&&s.download?`&download=${s.download===!0?"":s.download}`:"";return{data:i.map(o=>Object.assign(Object.assign({},o),{signedUrl:o.signedURL?encodeURI(`${this.url}${o.signedURL}${r}`):null})),error:null}}catch(i){if(ie(i))return{data:null,error:i};throw i}})}download(e,t){return ge(this,void 0,void 0,function*(){const i=typeof(t==null?void 0:t.transform)<"u"?"render/image/authenticated":"object",r=this.transformOptsToQueryString((t==null?void 0:t.transform)||{}),o=r?`?${r}`:"";try{const a=this._getFinalPath(e);return{data:yield(yield si(this.fetch,`${this.url}/${i}/${a}${o}`,{headers:this.headers,noResolveJson:!0})).blob(),error:null}}catch(a){if(ie(a))return{data:null,error:a};throw a}})}info(e){return ge(this,void 0,void 0,function*(){const t=this._getFinalPath(e);try{const s=yield si(this.fetch,`${this.url}/object/info/${t}`,{headers:this.headers});return{data:Vr(s),error:null}}catch(s){if(ie(s))return{data:null,error:s};throw s}})}exists(e){return ge(this,void 0,void 0,function*(){const t=this._getFinalPath(e);try{return yield Nw(this.fetch,`${this.url}/object/${t}`,{headers:this.headers}),{data:!0,error:null}}catch(s){if(ie(s)&&s instanceof Wr){const i=s.originalError;if([400,404].includes(i==null?void 0:i.status))return{data:!1,error:s}}throw s}})}getPublicUrl(e,t){const s=this._getFinalPath(e),i=[],r=t!=null&&t.download?`download=${t.download===!0?"":t.download}`:"";r!==""&&i.push(r);const a=typeof(t==null?void 0:t.transform)<"u"?"render/image":"object",l=this.transformOptsToQueryString((t==null?void 0:t.transform)||{});l!==""&&i.push(l);let c=i.join("&");return c!==""&&(c=`?${c}`),{data:{publicUrl:encodeURI(`${this.url}/${a}/public/${s}${c}`)}}}remove(e){return ge(this,void 0,void 0,function*(){try{return{data:yield $h(this.fetch,`${this.url}/object/${this.bucketId}`,{prefixes:e},{headers:this.headers}),error:null}}catch(t){if(ie(t))return{data:null,error:t};throw t}})}list(e,t,s){return ge(this,void 0,void 0,function*(){try{const i=Object.assign(Object.assign(Object.assign({},xw),t),{prefix:e||""});return{data:yield Ke(this.fetch,`${this.url}/object/list/${this.bucketId}`,i,{headers:this.headers},s),error:null}}catch(i){if(ie(i))return{data:null,error:i};throw i}})}encodeMetadata(e){return JSON.stringify(e)}toBase64(e){return typeof Buffer<"u"?Buffer.from(e).toString("base64"):btoa(e)}_getFinalPath(e){return`${this.bucketId}/${e.replace(/^\/+/,"")}`}_removeEmptyFolders(e){return e.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}transformOptsToQueryString(e){const t=[];return e.width&&t.push(`width=${e.width}`),e.height&&t.push(`height=${e.height}`),e.resize&&t.push(`resize=${e.resize}`),e.format&&t.push(`format=${e.format}`),e.quality&&t.push(`quality=${e.quality}`),t.join("&")}}const Lw="2.10.4",Mw={"X-Client-Info":`storage-js/${Lw}`};var Jt=function(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{c(s.next(u))}catch(h){o(h)}}function l(u){try{c(s.throw(u))}catch(h){o(h)}}function c(u){u.done?r(u.value):i(u.value).then(a,l)}c((s=s.apply(n,e||[])).next())})};class $w{constructor(e,t={},s,i){const r=new URL(e);i!=null&&i.useNewHostname&&/supabase\.(co|in|red)$/.test(r.hostname)&&!r.hostname.includes("storage.supabase.")&&(r.hostname=r.hostname.replace("supabase.","storage.supabase.")),this.url=r.href,this.headers=Object.assign(Object.assign({},Mw),t),this.fetch=Mh(s)}listBuckets(){return Jt(this,void 0,void 0,function*(){try{return{data:yield si(this.fetch,`${this.url}/bucket`,{headers:this.headers}),error:null}}catch(e){if(ie(e))return{data:null,error:e};throw e}})}getBucket(e){return Jt(this,void 0,void 0,function*(){try{return{data:yield si(this.fetch,`${this.url}/bucket/${e}`,{headers:this.headers}),error:null}}catch(t){if(ie(t))return{data:null,error:t};throw t}})}createBucket(e,t={public:!1}){return Jt(this,void 0,void 0,function*(){try{return{data:yield Ke(this.fetch,`${this.url}/bucket`,{id:e,name:e,type:t.type,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:this.headers}),error:null}}catch(s){if(ie(s))return{data:null,error:s};throw s}})}updateBucket(e,t){return Jt(this,void 0,void 0,function*(){try{return{data:yield qr(this.fetch,`${this.url}/bucket/${e}`,{id:e,name:e,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:this.headers}),error:null}}catch(s){if(ie(s))return{data:null,error:s};throw s}})}emptyBucket(e){return Jt(this,void 0,void 0,function*(){try{return{data:yield Ke(this.fetch,`${this.url}/bucket/${e}/empty`,{},{headers:this.headers}),error:null}}catch(t){if(ie(t))return{data:null,error:t};throw t}})}deleteBucket(e){return Jt(this,void 0,void 0,function*(){try{return{data:yield $h(this.fetch,`${this.url}/bucket/${e}`,{},{headers:this.headers}),error:null}}catch(t){if(ie(t))return{data:null,error:t};throw t}})}}class jw extends $w{constructor(e,t={},s,i){super(e,t,s,i)}from(e){return new Dw(this.url,this.headers,e,this.fetch)}}const Fw="2.55.0";let Rn="";typeof Deno<"u"?Rn="deno":typeof document<"u"?Rn="web":typeof navigator<"u"&&navigator.product==="ReactNative"?Rn="react-native":Rn="node";const Bw={"X-Client-Info":`supabase-js-${Rn}/${Fw}`},Uw={headers:Bw},Ww={schema:"public"},Vw={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},qw={};var Hw=function(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{c(s.next(u))}catch(h){o(h)}}function l(u){try{c(s.throw(u))}catch(h){o(h)}}function c(u){u.done?r(u.value):i(u.value).then(a,l)}c((s=s.apply(n,e||[])).next())})};const zw=n=>{let e;return n?e=n:typeof fetch>"u"?e=Sh:e=fetch,(...t)=>e(...t)},Kw=()=>typeof Headers>"u"?Eh:Headers,Gw=(n,e,t)=>{const s=zw(t),i=Kw();return(r,o)=>Hw(void 0,void 0,void 0,function*(){var a;const l=(a=yield e())!==null&&a!==void 0?a:n;let c=new i(o==null?void 0:o.headers);return c.has("apikey")||c.set("apikey",n),c.has("Authorization")||c.set("Authorization",`Bearer ${l}`),s(r,Object.assign(Object.assign({},o),{headers:c}))})};var Jw=function(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{c(s.next(u))}catch(h){o(h)}}function l(u){try{c(s.throw(u))}catch(h){o(h)}}function c(u){u.done?r(u.value):i(u.value).then(a,l)}c((s=s.apply(n,e||[])).next())})};function Yw(n){return n.endsWith("/")?n:n+"/"}function Qw(n,e){var t,s;const{db:i,auth:r,realtime:o,global:a}=n,{db:l,auth:c,realtime:u,global:h}=e,d={db:Object.assign(Object.assign({},l),i),auth:Object.assign(Object.assign({},c),r),realtime:Object.assign(Object.assign({},u),o),storage:{},global:Object.assign(Object.assign(Object.assign({},h),a),{headers:Object.assign(Object.assign({},(t=h==null?void 0:h.headers)!==null&&t!==void 0?t:{}),(s=a==null?void 0:a.headers)!==null&&s!==void 0?s:{})}),accessToken:()=>Jw(this,void 0,void 0,function*(){return""})};return n.accessToken?d.accessToken=n.accessToken:delete d.accessToken,d}const jh="2.71.1",tn=30*1e3,Hr=3,lr=Hr*tn,Xw="http://localhost:9999",Zw="supabase.auth.token",eb={"X-Client-Info":`gotrue-js/${jh}`},zr="X-Supabase-Api-Version",Fh={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},tb=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,nb=10*60*1e3;class sa extends Error{constructor(e,t,s){super(e),this.__isAuthError=!0,this.name="AuthError",this.status=t,this.code=s}}function N(n){return typeof n=="object"&&n!==null&&"__isAuthError"in n}class sb extends sa{constructor(e,t,s){super(e,t,s),this.name="AuthApiError",this.status=t,this.code=s}}function ib(n){return N(n)&&n.name==="AuthApiError"}class Bh extends sa{constructor(e,t){super(e),this.name="AuthUnknownError",this.originalError=t}}class vt extends sa{constructor(e,t,s,i){super(e,s,i),this.name=t,this.status=s}}class it extends vt{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}}function rb(n){return N(n)&&n.name==="AuthSessionMissingError"}class Ss extends vt{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}}class Es extends vt{constructor(e){super(e,"AuthInvalidCredentialsError",400,void 0)}}class Ts extends vt{constructor(e,t=null){super(e,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}function ob(n){return N(n)&&n.name==="AuthImplicitGrantRedirectError"}class $l extends vt{constructor(e,t=null){super(e,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}class Kr extends vt{constructor(e,t){super(e,"AuthRetryableFetchError",t,void 0)}}function cr(n){return N(n)&&n.name==="AuthRetryableFetchError"}class jl extends vt{constructor(e,t,s){super(e,"AuthWeakPasswordError",t,"weak_password"),this.reasons=s}}class Gr extends vt{constructor(e){super(e,"AuthInvalidJwtError",400,"invalid_jwt")}}const ii="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),Fl=` 	
\r=`.split(""),ab=(()=>{const n=new Array(128);for(let e=0;e<n.length;e+=1)n[e]=-1;for(let e=0;e<Fl.length;e+=1)n[Fl[e].charCodeAt(0)]=-2;for(let e=0;e<ii.length;e+=1)n[ii[e].charCodeAt(0)]=e;return n})();function Bl(n,e,t){if(n!==null)for(e.queue=e.queue<<8|n,e.queuedBits+=8;e.queuedBits>=6;){const s=e.queue>>e.queuedBits-6&63;t(ii[s]),e.queuedBits-=6}else if(e.queuedBits>0)for(e.queue=e.queue<<6-e.queuedBits,e.queuedBits=6;e.queuedBits>=6;){const s=e.queue>>e.queuedBits-6&63;t(ii[s]),e.queuedBits-=6}}function Uh(n,e,t){const s=ab[n];if(s>-1)for(e.queue=e.queue<<6|s,e.queuedBits+=6;e.queuedBits>=8;)t(e.queue>>e.queuedBits-8&255),e.queuedBits-=8;else{if(s===-2)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(n)}"`)}}function Ul(n){const e=[],t=o=>{e.push(String.fromCodePoint(o))},s={utf8seq:0,codepoint:0},i={queue:0,queuedBits:0},r=o=>{ub(o,s,t)};for(let o=0;o<n.length;o+=1)Uh(n.charCodeAt(o),i,r);return e.join("")}function lb(n,e){if(n<=127){e(n);return}else if(n<=2047){e(192|n>>6),e(128|n&63);return}else if(n<=65535){e(224|n>>12),e(128|n>>6&63),e(128|n&63);return}else if(n<=1114111){e(240|n>>18),e(128|n>>12&63),e(128|n>>6&63),e(128|n&63);return}throw new Error(`Unrecognized Unicode codepoint: ${n.toString(16)}`)}function cb(n,e){for(let t=0;t<n.length;t+=1){let s=n.charCodeAt(t);if(s>55295&&s<=56319){const i=(s-55296)*1024&65535;s=(n.charCodeAt(t+1)-56320&65535|i)+65536,t+=1}lb(s,e)}}function ub(n,e,t){if(e.utf8seq===0){if(n<=127){t(n);return}for(let s=1;s<6;s+=1)if(!(n>>7-s&1)){e.utf8seq=s;break}if(e.utf8seq===2)e.codepoint=n&31;else if(e.utf8seq===3)e.codepoint=n&15;else if(e.utf8seq===4)e.codepoint=n&7;else throw new Error("Invalid UTF-8 sequence");e.utf8seq-=1}else if(e.utf8seq>0){if(n<=127)throw new Error("Invalid UTF-8 sequence");e.codepoint=e.codepoint<<6|n&63,e.utf8seq-=1,e.utf8seq===0&&t(e.codepoint)}}function hb(n){const e=[],t={queue:0,queuedBits:0},s=i=>{e.push(i)};for(let i=0;i<n.length;i+=1)Uh(n.charCodeAt(i),t,s);return new Uint8Array(e)}function db(n){const e=[];return cb(n,t=>e.push(t)),new Uint8Array(e)}function fb(n){const e=[],t={queue:0,queuedBits:0},s=i=>{e.push(i)};return n.forEach(i=>Bl(i,t,s)),Bl(null,t,s),e.join("")}function pb(n){return Math.round(Date.now()/1e3)+n}function gb(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(n){const e=Math.random()*16|0;return(n=="x"?e:e&3|8).toString(16)})}const Ie=()=>typeof window<"u"&&typeof document<"u",bt={tested:!1,writable:!1},Wh=()=>{if(!Ie())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(bt.tested)return bt.writable;const n=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(n,n),globalThis.localStorage.removeItem(n),bt.tested=!0,bt.writable=!0}catch{bt.tested=!0,bt.writable=!1}return bt.writable};function mb(n){const e={},t=new URL(n);if(t.hash&&t.hash[0]==="#")try{new URLSearchParams(t.hash.substring(1)).forEach((i,r)=>{e[r]=i})}catch{}return t.searchParams.forEach((s,i)=>{e[i]=s}),e}const Vh=n=>{let e;return n?e=n:typeof fetch>"u"?e=(...t)=>gs(async()=>{const{default:s}=await Promise.resolve().then(()=>bn);return{default:s}},void 0).then(({default:s})=>s(...t)):e=fetch,(...t)=>e(...t)},_b=n=>typeof n=="object"&&n!==null&&"status"in n&&"ok"in n&&"json"in n&&typeof n.json=="function",nn=async(n,e,t)=>{await n.setItem(e,JSON.stringify(t))},St=async(n,e)=>{const t=await n.getItem(e);if(!t)return null;try{return JSON.parse(t)}catch{return t}},st=async(n,e)=>{await n.removeItem(e)};class Fi{constructor(){this.promise=new Fi.promiseConstructor((e,t)=>{this.resolve=e,this.reject=t})}}Fi.promiseConstructor=Promise;function ur(n){const e=n.split(".");if(e.length!==3)throw new Gr("Invalid JWT structure");for(let s=0;s<e.length;s++)if(!tb.test(e[s]))throw new Gr("JWT not in base64url format");return{header:JSON.parse(Ul(e[0])),payload:JSON.parse(Ul(e[1])),signature:hb(e[2]),raw:{header:e[0],payload:e[1]}}}async function yb(n){return await new Promise(e=>{setTimeout(()=>e(null),n)})}function vb(n,e){return new Promise((s,i)=>{(async()=>{for(let r=0;r<1/0;r++)try{const o=await n(r);if(!e(r,null,o)){s(o);return}}catch(o){if(!e(r,o)){i(o);return}}})()})}function wb(n){return("0"+n.toString(16)).substr(-2)}function bb(){const e=new Uint32Array(56);if(typeof crypto>"u"){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",s=t.length;let i="";for(let r=0;r<56;r++)i+=t.charAt(Math.floor(Math.random()*s));return i}return crypto.getRandomValues(e),Array.from(e,wb).join("")}async function Sb(n){const t=new TextEncoder().encode(n),s=await crypto.subtle.digest("SHA-256",t),i=new Uint8Array(s);return Array.from(i).map(r=>String.fromCharCode(r)).join("")}async function Eb(n){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),n;const t=await Sb(n);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function Yt(n,e,t=!1){const s=bb();let i=s;t&&(i+="/PASSWORD_RECOVERY"),await nn(n,`${e}-code-verifier`,i);const r=await Eb(s);return[r,s===r?"plain":"s256"]}const Tb=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function Ib(n){const e=n.headers.get(zr);if(!e||!e.match(Tb))return null;try{return new Date(`${e}T00:00:00.0Z`)}catch{return null}}function kb(n){if(!n)throw new Error("Missing exp claim");const e=Math.floor(Date.now()/1e3);if(n<=e)throw new Error("JWT has expired")}function Cb(n){switch(n){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}const Ab=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;function Qt(n){if(!Ab.test(n))throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function hr(){const n={};return new Proxy(n,{get:(e,t)=>{if(t==="__isUserNotAvailableProxy")return!0;if(typeof t=="symbol"){const s=t.toString();if(s==="Symbol(Symbol.toPrimitive)"||s==="Symbol(Symbol.toStringTag)"||s==="Symbol(util.inspect.custom)")return}throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${t}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,t)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,t)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function Wl(n){return JSON.parse(JSON.stringify(n))}var Rb=function(n,e){var t={};for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&e.indexOf(s)<0&&(t[s]=n[s]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,s=Object.getOwnPropertySymbols(n);i<s.length;i++)e.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(n,s[i])&&(t[s[i]]=n[s[i]]);return t};const It=n=>n.msg||n.message||n.error_description||n.error||JSON.stringify(n),Pb=[502,503,504];async function Vl(n){var e;if(!_b(n))throw new Kr(It(n),0);if(Pb.includes(n.status))throw new Kr(It(n),n.status);let t;try{t=await n.json()}catch(r){throw new Bh(It(r),r)}let s;const i=Ib(n);if(i&&i.getTime()>=Fh["2024-01-01"].timestamp&&typeof t=="object"&&t&&typeof t.code=="string"?s=t.code:typeof t=="object"&&t&&typeof t.error_code=="string"&&(s=t.error_code),s){if(s==="weak_password")throw new jl(It(t),n.status,((e=t.weak_password)===null||e===void 0?void 0:e.reasons)||[]);if(s==="session_not_found")throw new it}else if(typeof t=="object"&&t&&typeof t.weak_password=="object"&&t.weak_password&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.reasons.reduce((r,o)=>r&&typeof o=="string",!0))throw new jl(It(t),n.status,t.weak_password.reasons);throw new sb(It(t),n.status||500,s)}const Ob=(n,e,t,s)=>{const i={method:n,headers:(e==null?void 0:e.headers)||{}};return n==="GET"?i:(i.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},e==null?void 0:e.headers),i.body=JSON.stringify(s),Object.assign(Object.assign({},i),t))};async function F(n,e,t,s){var i;const r=Object.assign({},s==null?void 0:s.headers);r[zr]||(r[zr]=Fh["2024-01-01"].name),s!=null&&s.jwt&&(r.Authorization=`Bearer ${s.jwt}`);const o=(i=s==null?void 0:s.query)!==null&&i!==void 0?i:{};s!=null&&s.redirectTo&&(o.redirect_to=s.redirectTo);const a=Object.keys(o).length?"?"+new URLSearchParams(o).toString():"",l=await Nb(n,e,t+a,{headers:r,noResolveJson:s==null?void 0:s.noResolveJson},{},s==null?void 0:s.body);return s!=null&&s.xform?s==null?void 0:s.xform(l):{data:Object.assign({},l),error:null}}async function Nb(n,e,t,s,i,r){const o=Ob(e,s,i,r);let a;try{a=await n(t,Object.assign({},o))}catch(l){throw console.error(l),new Kr(It(l),0)}if(a.ok||await Vl(a),s!=null&&s.noResolveJson)return a;try{return await a.json()}catch(l){await Vl(l)}}function Ve(n){var e;let t=null;Mb(n)&&(t=Object.assign({},n),n.expires_at||(t.expires_at=pb(n.expires_in)));const s=(e=n.user)!==null&&e!==void 0?e:n;return{data:{session:t,user:s},error:null}}function ql(n){const e=Ve(n);return!e.error&&n.weak_password&&typeof n.weak_password=="object"&&Array.isArray(n.weak_password.reasons)&&n.weak_password.reasons.length&&n.weak_password.message&&typeof n.weak_password.message=="string"&&n.weak_password.reasons.reduce((t,s)=>t&&typeof s=="string",!0)&&(e.data.weak_password=n.weak_password),e}function rt(n){var e;return{data:{user:(e=n.user)!==null&&e!==void 0?e:n},error:null}}function xb(n){return{data:n,error:null}}function Db(n){const{action_link:e,email_otp:t,hashed_token:s,redirect_to:i,verification_type:r}=n,o=Rb(n,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),a={action_link:e,email_otp:t,hashed_token:s,redirect_to:i,verification_type:r},l=Object.assign({},o);return{data:{properties:a,user:l},error:null}}function Lb(n){return n}function Mb(n){return n.access_token&&n.refresh_token&&n.expires_in}const dr=["global","local","others"];var $b=function(n,e){var t={};for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&e.indexOf(s)<0&&(t[s]=n[s]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,s=Object.getOwnPropertySymbols(n);i<s.length;i++)e.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(n,s[i])&&(t[s[i]]=n[s[i]]);return t};class jb{constructor({url:e="",headers:t={},fetch:s}){this.url=e,this.headers=t,this.fetch=Vh(s),this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)}}async signOut(e,t=dr[0]){if(dr.indexOf(t)<0)throw new Error(`@supabase/auth-js: Parameter scope must be one of ${dr.join(", ")}`);try{return await F(this.fetch,"POST",`${this.url}/logout?scope=${t}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(s){if(N(s))return{data:null,error:s};throw s}}async inviteUserByEmail(e,t={}){try{return await F(this.fetch,"POST",`${this.url}/invite`,{body:{email:e,data:t.data},headers:this.headers,redirectTo:t.redirectTo,xform:rt})}catch(s){if(N(s))return{data:{user:null},error:s};throw s}}async generateLink(e){try{const{options:t}=e,s=$b(e,["options"]),i=Object.assign(Object.assign({},s),t);return"newEmail"in s&&(i.new_email=s==null?void 0:s.newEmail,delete i.newEmail),await F(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:i,headers:this.headers,xform:Db,redirectTo:t==null?void 0:t.redirectTo})}catch(t){if(N(t))return{data:{properties:null,user:null},error:t};throw t}}async createUser(e){try{return await F(this.fetch,"POST",`${this.url}/admin/users`,{body:e,headers:this.headers,xform:rt})}catch(t){if(N(t))return{data:{user:null},error:t};throw t}}async listUsers(e){var t,s,i,r,o,a,l;try{const c={nextPage:null,lastPage:0,total:0},u=await F(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(s=(t=e==null?void 0:e.page)===null||t===void 0?void 0:t.toString())!==null&&s!==void 0?s:"",per_page:(r=(i=e==null?void 0:e.perPage)===null||i===void 0?void 0:i.toString())!==null&&r!==void 0?r:""},xform:Lb});if(u.error)throw u.error;const h=await u.json(),d=(o=u.headers.get("x-total-count"))!==null&&o!==void 0?o:0,_=(l=(a=u.headers.get("link"))===null||a===void 0?void 0:a.split(","))!==null&&l!==void 0?l:[];return _.length>0&&(_.forEach(w=>{const E=parseInt(w.split(";")[0].split("=")[1].substring(0,1)),S=JSON.parse(w.split(";")[1].split("=")[1]);c[`${S}Page`]=E}),c.total=parseInt(d)),{data:Object.assign(Object.assign({},h),c),error:null}}catch(c){if(N(c))return{data:{users:[]},error:c};throw c}}async getUserById(e){Qt(e);try{return await F(this.fetch,"GET",`${this.url}/admin/users/${e}`,{headers:this.headers,xform:rt})}catch(t){if(N(t))return{data:{user:null},error:t};throw t}}async updateUserById(e,t){Qt(e);try{return await F(this.fetch,"PUT",`${this.url}/admin/users/${e}`,{body:t,headers:this.headers,xform:rt})}catch(s){if(N(s))return{data:{user:null},error:s};throw s}}async deleteUser(e,t=!1){Qt(e);try{return await F(this.fetch,"DELETE",`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:t},xform:rt})}catch(s){if(N(s))return{data:{user:null},error:s};throw s}}async _listFactors(e){Qt(e.userId);try{const{data:t,error:s}=await F(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:i=>({data:{factors:i},error:null})});return{data:t,error:s}}catch(t){if(N(t))return{data:null,error:t};throw t}}async _deleteFactor(e){Qt(e.userId),Qt(e.id);try{return{data:await F(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(t){if(N(t))return{data:null,error:t};throw t}}}function Hl(n={}){return{getItem:e=>n[e]||null,setItem:(e,t)=>{n[e]=t},removeItem:e=>{delete n[e]}}}function Fb(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}const Xt={debug:!!(globalThis&&Wh()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug")==="true")};class qh extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}}class Bb extends qh{}async function Ub(n,e,t){Xt.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire lock",n,e);const s=new globalThis.AbortController;return e>0&&setTimeout(()=>{s.abort(),Xt.debug&&console.log("@supabase/gotrue-js: navigatorLock acquire timed out",n)},e),await Promise.resolve().then(()=>globalThis.navigator.locks.request(n,e===0?{mode:"exclusive",ifAvailable:!0}:{mode:"exclusive",signal:s.signal},async i=>{if(i){Xt.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquired",n,i.name);try{return await t()}finally{Xt.debug&&console.log("@supabase/gotrue-js: navigatorLock: released",n,i.name)}}else{if(e===0)throw Xt.debug&&console.log("@supabase/gotrue-js: navigatorLock: not immediately available",n),new Bb(`Acquiring an exclusive Navigator LockManager lock "${n}" immediately failed`);if(Xt.debug)try{const r=await globalThis.navigator.locks.query();console.log("@supabase/gotrue-js: Navigator LockManager state",JSON.stringify(r,null,"  "))}catch(r){console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state",r)}return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"),await t()}}))}Fb();const Wb={url:Xw,storageKey:Zw,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:eb,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1};async function zl(n,e,t){return await t()}const Zt={};class ns{constructor(e){var t,s;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log,this.instanceID=ns.nextInstanceID,ns.nextInstanceID+=1,this.instanceID>0&&Ie()&&console.warn("Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.");const i=Object.assign(Object.assign({},Wb),e);if(this.logDebugMessages=!!i.debug,typeof i.debug=="function"&&(this.logger=i.debug),this.persistSession=i.persistSession,this.storageKey=i.storageKey,this.autoRefreshToken=i.autoRefreshToken,this.admin=new jb({url:i.url,headers:i.headers,fetch:i.fetch}),this.url=i.url,this.headers=i.headers,this.fetch=Vh(i.fetch),this.lock=i.lock||zl,this.detectSessionInUrl=i.detectSessionInUrl,this.flowType=i.flowType,this.hasCustomAuthorizationHeader=i.hasCustomAuthorizationHeader,i.lock?this.lock=i.lock:Ie()&&(!((t=globalThis==null?void 0:globalThis.navigator)===null||t===void 0)&&t.locks)?this.lock=Ub:this.lock=zl,this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this)},this.persistSession?(i.storage?this.storage=i.storage:Wh()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=Hl(this.memoryStorage)),i.userStorage&&(this.userStorage=i.userStorage)):(this.memoryStorage={},this.storage=Hl(this.memoryStorage)),Ie()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(r){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",r)}(s=this.broadcastChannel)===null||s===void 0||s.addEventListener("message",async r=>{this._debug("received broadcast notification from other tab or client",r),await this._notifyAllSubscribers(r.data.event,r.data.session,!1)})}this.initialize()}get jwks(){var e,t;return(t=(e=Zt[this.storageKey])===null||e===void 0?void 0:e.jwks)!==null&&t!==void 0?t:{keys:[]}}set jwks(e){Zt[this.storageKey]=Object.assign(Object.assign({},Zt[this.storageKey]),{jwks:e})}get jwks_cached_at(){var e,t;return(t=(e=Zt[this.storageKey])===null||e===void 0?void 0:e.cachedAt)!==null&&t!==void 0?t:Number.MIN_SAFE_INTEGER}set jwks_cached_at(e){Zt[this.storageKey]=Object.assign(Object.assign({},Zt[this.storageKey]),{cachedAt:e})}_debug(...e){return this.logDebugMessages&&this.logger(`GoTrueClient@${this.instanceID} (${jh}) ${new Date().toISOString()}`,...e),this}async initialize(){return this.initializePromise?await this.initializePromise:(this.initializePromise=(async()=>await this._acquireLock(-1,async()=>await this._initialize()))(),await this.initializePromise)}async _initialize(){var e;try{const t=mb(window.location.href);let s="none";if(this._isImplicitGrantCallback(t)?s="implicit":await this._isPKCECallback(t)&&(s="pkce"),Ie()&&this.detectSessionInUrl&&s!=="none"){const{data:i,error:r}=await this._getSessionFromURL(t,s);if(r){if(this._debug("#_initialize()","error detecting session from URL",r),ob(r)){const l=(e=r.details)===null||e===void 0?void 0:e.code;if(l==="identity_already_exists"||l==="identity_not_found"||l==="single_identity_not_deletable")return{error:r}}return await this._removeSession(),{error:r}}const{session:o,redirectType:a}=i;return this._debug("#_initialize()","detected session in URL",o,"redirect type",a),await this._saveSession(o),setTimeout(async()=>{a==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",o):await this._notifyAllSubscribers("SIGNED_IN",o)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(t){return N(t)?{error:t}:{error:new Bh("Unexpected error during initialization",t)}}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(e){var t,s,i;try{const r=await F(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(s=(t=e==null?void 0:e.options)===null||t===void 0?void 0:t.data)!==null&&s!==void 0?s:{},gotrue_meta_security:{captcha_token:(i=e==null?void 0:e.options)===null||i===void 0?void 0:i.captchaToken}},xform:Ve}),{data:o,error:a}=r;if(a||!o)return{data:{user:null,session:null},error:a};const l=o.session,c=o.user;return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",l)),{data:{user:c,session:l},error:null}}catch(r){if(N(r))return{data:{user:null,session:null},error:r};throw r}}async signUp(e){var t,s,i;try{let r;if("email"in e){const{email:u,password:h,options:d}=e;let _=null,w=null;this.flowType==="pkce"&&([_,w]=await Yt(this.storage,this.storageKey)),r=await F(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:d==null?void 0:d.emailRedirectTo,body:{email:u,password:h,data:(t=d==null?void 0:d.data)!==null&&t!==void 0?t:{},gotrue_meta_security:{captcha_token:d==null?void 0:d.captchaToken},code_challenge:_,code_challenge_method:w},xform:Ve})}else if("phone"in e){const{phone:u,password:h,options:d}=e;r=await F(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:u,password:h,data:(s=d==null?void 0:d.data)!==null&&s!==void 0?s:{},channel:(i=d==null?void 0:d.channel)!==null&&i!==void 0?i:"sms",gotrue_meta_security:{captcha_token:d==null?void 0:d.captchaToken}},xform:Ve})}else throw new Es("You must provide either an email or phone number and a password");const{data:o,error:a}=r;if(a||!o)return{data:{user:null,session:null},error:a};const l=o.session,c=o.user;return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",l)),{data:{user:c,session:l},error:null}}catch(r){if(N(r))return{data:{user:null,session:null},error:r};throw r}}async signInWithPassword(e){try{let t;if("email"in e){const{email:r,password:o,options:a}=e;t=await F(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:r,password:o,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}},xform:ql})}else if("phone"in e){const{phone:r,password:o,options:a}=e;t=await F(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:r,password:o,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}},xform:ql})}else throw new Es("You must provide either an email or phone number and a password");const{data:s,error:i}=t;return i?{data:{user:null,session:null},error:i}:!s||!s.session||!s.user?{data:{user:null,session:null},error:new Ss}:(s.session&&(await this._saveSession(s.session),await this._notifyAllSubscribers("SIGNED_IN",s.session)),{data:Object.assign({user:s.user,session:s.session},s.weak_password?{weakPassword:s.weak_password}:null),error:i})}catch(t){if(N(t))return{data:{user:null,session:null},error:t};throw t}}async signInWithOAuth(e){var t,s,i,r;return await this._handleProviderSignIn(e.provider,{redirectTo:(t=e.options)===null||t===void 0?void 0:t.redirectTo,scopes:(s=e.options)===null||s===void 0?void 0:s.scopes,queryParams:(i=e.options)===null||i===void 0?void 0:i.queryParams,skipBrowserRedirect:(r=e.options)===null||r===void 0?void 0:r.skipBrowserRedirect})}async exchangeCodeForSession(e){return await this.initializePromise,this._acquireLock(-1,async()=>this._exchangeCodeForSession(e))}async signInWithWeb3(e){const{chain:t}=e;if(t==="solana")return await this.signInWithSolana(e);throw new Error(`@supabase/auth-js: Unsupported chain "${t}"`)}async signInWithSolana(e){var t,s,i,r,o,a,l,c,u,h,d,_;let w,E;if("message"in e)w=e.message,E=e.signature;else{const{chain:S,wallet:R,statement:j,options:k}=e;let O;if(Ie())if(typeof R=="object")O=R;else{const B=window;if("solana"in B&&typeof B.solana=="object"&&("signIn"in B.solana&&typeof B.solana.signIn=="function"||"signMessage"in B.solana&&typeof B.solana.signMessage=="function"))O=B.solana;else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")}else{if(typeof R!="object"||!(k!=null&&k.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");O=R}const Z=new URL((t=k==null?void 0:k.url)!==null&&t!==void 0?t:window.location.href);if("signIn"in O&&O.signIn){const B=await O.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},k==null?void 0:k.signInWithSolana),{version:"1",domain:Z.host,uri:Z.href}),j?{statement:j}:null));let m;if(Array.isArray(B)&&B[0]&&typeof B[0]=="object")m=B[0];else if(B&&typeof B=="object"&&"signedMessage"in B&&"signature"in B)m=B;else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");if("signedMessage"in m&&"signature"in m&&(typeof m.signedMessage=="string"||m.signedMessage instanceof Uint8Array)&&m.signature instanceof Uint8Array)w=typeof m.signedMessage=="string"?m.signedMessage:new TextDecoder().decode(m.signedMessage),E=m.signature;else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")}else{if(!("signMessage"in O)||typeof O.signMessage!="function"||!("publicKey"in O)||typeof O!="object"||!O.publicKey||!("toBase58"in O.publicKey)||typeof O.publicKey.toBase58!="function")throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");w=[`${Z.host} wants you to sign in with your Solana account:`,O.publicKey.toBase58(),...j?["",j,""]:[""],"Version: 1",`URI: ${Z.href}`,`Issued At: ${(i=(s=k==null?void 0:k.signInWithSolana)===null||s===void 0?void 0:s.issuedAt)!==null&&i!==void 0?i:new Date().toISOString()}`,...!((r=k==null?void 0:k.signInWithSolana)===null||r===void 0)&&r.notBefore?[`Not Before: ${k.signInWithSolana.notBefore}`]:[],...!((o=k==null?void 0:k.signInWithSolana)===null||o===void 0)&&o.expirationTime?[`Expiration Time: ${k.signInWithSolana.expirationTime}`]:[],...!((a=k==null?void 0:k.signInWithSolana)===null||a===void 0)&&a.chainId?[`Chain ID: ${k.signInWithSolana.chainId}`]:[],...!((l=k==null?void 0:k.signInWithSolana)===null||l===void 0)&&l.nonce?[`Nonce: ${k.signInWithSolana.nonce}`]:[],...!((c=k==null?void 0:k.signInWithSolana)===null||c===void 0)&&c.requestId?[`Request ID: ${k.signInWithSolana.requestId}`]:[],...!((h=(u=k==null?void 0:k.signInWithSolana)===null||u===void 0?void 0:u.resources)===null||h===void 0)&&h.length?["Resources",...k.signInWithSolana.resources.map(m=>`- ${m}`)]:[]].join(`
`);const B=await O.signMessage(new TextEncoder().encode(w),"utf8");if(!B||!(B instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");E=B}}try{const{data:S,error:R}=await F(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:w,signature:fb(E)},!((d=e.options)===null||d===void 0)&&d.captchaToken?{gotrue_meta_security:{captcha_token:(_=e.options)===null||_===void 0?void 0:_.captchaToken}}:null),xform:Ve});if(R)throw R;return!S||!S.session||!S.user?{data:{user:null,session:null},error:new Ss}:(S.session&&(await this._saveSession(S.session),await this._notifyAllSubscribers("SIGNED_IN",S.session)),{data:Object.assign({},S),error:R})}catch(S){if(N(S))return{data:{user:null,session:null},error:S};throw S}}async _exchangeCodeForSession(e){const t=await St(this.storage,`${this.storageKey}-code-verifier`),[s,i]=(t??"").split("/");try{const{data:r,error:o}=await F(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:s},xform:Ve});if(await st(this.storage,`${this.storageKey}-code-verifier`),o)throw o;return!r||!r.session||!r.user?{data:{user:null,session:null,redirectType:null},error:new Ss}:(r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers("SIGNED_IN",r.session)),{data:Object.assign(Object.assign({},r),{redirectType:i??null}),error:o})}catch(r){if(N(r))return{data:{user:null,session:null,redirectType:null},error:r};throw r}}async signInWithIdToken(e){try{const{options:t,provider:s,token:i,access_token:r,nonce:o}=e,a=await F(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:s,id_token:i,access_token:r,nonce:o,gotrue_meta_security:{captcha_token:t==null?void 0:t.captchaToken}},xform:Ve}),{data:l,error:c}=a;return c?{data:{user:null,session:null},error:c}:!l||!l.session||!l.user?{data:{user:null,session:null},error:new Ss}:(l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers("SIGNED_IN",l.session)),{data:l,error:c})}catch(t){if(N(t))return{data:{user:null,session:null},error:t};throw t}}async signInWithOtp(e){var t,s,i,r,o;try{if("email"in e){const{email:a,options:l}=e;let c=null,u=null;this.flowType==="pkce"&&([c,u]=await Yt(this.storage,this.storageKey));const{error:h}=await F(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:a,data:(t=l==null?void 0:l.data)!==null&&t!==void 0?t:{},create_user:(s=l==null?void 0:l.shouldCreateUser)!==null&&s!==void 0?s:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},code_challenge:c,code_challenge_method:u},redirectTo:l==null?void 0:l.emailRedirectTo});return{data:{user:null,session:null},error:h}}if("phone"in e){const{phone:a,options:l}=e,{data:c,error:u}=await F(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:a,data:(i=l==null?void 0:l.data)!==null&&i!==void 0?i:{},create_user:(r=l==null?void 0:l.shouldCreateUser)!==null&&r!==void 0?r:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},channel:(o=l==null?void 0:l.channel)!==null&&o!==void 0?o:"sms"}});return{data:{user:null,session:null,messageId:c==null?void 0:c.message_id},error:u}}throw new Es("You must provide either an email or phone number.")}catch(a){if(N(a))return{data:{user:null,session:null},error:a};throw a}}async verifyOtp(e){var t,s;try{let i,r;"options"in e&&(i=(t=e.options)===null||t===void 0?void 0:t.redirectTo,r=(s=e.options)===null||s===void 0?void 0:s.captchaToken);const{data:o,error:a}=await F(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:r}}),redirectTo:i,xform:Ve});if(a)throw a;if(!o)throw new Error("An error occurred on token verification.");const l=o.session,c=o.user;return l!=null&&l.access_token&&(await this._saveSession(l),await this._notifyAllSubscribers(e.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",l)),{data:{user:c,session:l},error:null}}catch(i){if(N(i))return{data:{user:null,session:null},error:i};throw i}}async signInWithSSO(e){var t,s,i;try{let r=null,o=null;return this.flowType==="pkce"&&([r,o]=await Yt(this.storage,this.storageKey)),await F(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in e?{provider_id:e.providerId}:null),"domain"in e?{domain:e.domain}:null),{redirect_to:(s=(t=e.options)===null||t===void 0?void 0:t.redirectTo)!==null&&s!==void 0?s:void 0}),!((i=e==null?void 0:e.options)===null||i===void 0)&&i.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:r,code_challenge_method:o}),headers:this.headers,xform:xb})}catch(r){if(N(r))return{data:null,error:r};throw r}}async reauthenticate(){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async e=>{const{data:{session:t},error:s}=e;if(s)throw s;if(!t)throw new it;const{error:i}=await F(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:t.access_token});return{data:{user:null,session:null},error:i}})}catch(e){if(N(e))return{data:{user:null,session:null},error:e};throw e}}async resend(e){try{const t=`${this.url}/resend`;if("email"in e){const{email:s,type:i,options:r}=e,{error:o}=await F(this.fetch,"POST",t,{headers:this.headers,body:{email:s,type:i,gotrue_meta_security:{captcha_token:r==null?void 0:r.captchaToken}},redirectTo:r==null?void 0:r.emailRedirectTo});return{data:{user:null,session:null},error:o}}else if("phone"in e){const{phone:s,type:i,options:r}=e,{data:o,error:a}=await F(this.fetch,"POST",t,{headers:this.headers,body:{phone:s,type:i,gotrue_meta_security:{captcha_token:r==null?void 0:r.captchaToken}}});return{data:{user:null,session:null,messageId:o==null?void 0:o.message_id},error:a}}throw new Es("You must provide either an email or phone number and a type")}catch(t){if(N(t))return{data:{user:null,session:null},error:t};throw t}}async getSession(){return await this.initializePromise,await this._acquireLock(-1,async()=>this._useSession(async t=>t))}async _acquireLock(e,t){this._debug("#_acquireLock","begin",e);try{if(this.lockAcquired){const s=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),i=(async()=>(await s,await t()))();return this.pendingInLock.push((async()=>{try{await i}catch{}})()),i}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const s=t();for(this.pendingInLock.push((async()=>{try{await s}catch{}})()),await s;this.pendingInLock.length;){const i=[...this.pendingInLock];await Promise.all(i),this.pendingInLock.splice(0,i.length)}return await s}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(e){this._debug("#_useSession","begin");try{const t=await this.__loadSession();return await e(t)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lockAcquired||this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let e=null;const t=await St(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",t),t!==null&&(this._isValidSession(t)?e=t:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!e)return{data:{session:null},error:null};const s=e.expires_at?e.expires_at*1e3-Date.now()<lr:!1;if(this._debug("#__loadSession()",`session has${s?"":" not"} expired`,"expires_at",e.expires_at),!s){if(this.userStorage){const o=await St(this.userStorage,this.storageKey+"-user");o!=null&&o.user?e.user=o.user:e.user=hr()}if(this.storage.isServer&&e.user){let o=this.suppressGetSessionWarning;e=new Proxy(e,{get:(l,c,u)=>(!o&&c==="user"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),o=!0,this.suppressGetSessionWarning=!0),Reflect.get(l,c,u))})}return{data:{session:e},error:null}}const{session:i,error:r}=await this._callRefreshToken(e.refresh_token);return r?{data:{session:null},error:r}:{data:{session:i},error:null}}finally{this._debug("#__loadSession()","end")}}async getUser(e){return e?await this._getUser(e):(await this.initializePromise,await this._acquireLock(-1,async()=>await this._getUser()))}async _getUser(e){try{return e?await F(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:e,xform:rt}):await this._useSession(async t=>{var s,i,r;const{data:o,error:a}=t;if(a)throw a;return!(!((s=o.session)===null||s===void 0)&&s.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new it}:await F(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(r=(i=o.session)===null||i===void 0?void 0:i.access_token)!==null&&r!==void 0?r:void 0,xform:rt})})}catch(t){if(N(t))return rb(t)&&(await this._removeSession(),await st(this.storage,`${this.storageKey}-code-verifier`)),{data:{user:null},error:t};throw t}}async updateUser(e,t={}){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._updateUser(e,t))}async _updateUser(e,t={}){try{return await this._useSession(async s=>{const{data:i,error:r}=s;if(r)throw r;if(!i.session)throw new it;const o=i.session;let a=null,l=null;this.flowType==="pkce"&&e.email!=null&&([a,l]=await Yt(this.storage,this.storageKey));const{data:c,error:u}=await F(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:t==null?void 0:t.emailRedirectTo,body:Object.assign(Object.assign({},e),{code_challenge:a,code_challenge_method:l}),jwt:o.access_token,xform:rt});if(u)throw u;return o.user=c.user,await this._saveSession(o),await this._notifyAllSubscribers("USER_UPDATED",o),{data:{user:o.user},error:null}})}catch(s){if(N(s))return{data:{user:null},error:s};throw s}}async setSession(e){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._setSession(e))}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new it;const t=Date.now()/1e3;let s=t,i=!0,r=null;const{payload:o}=ur(e.access_token);if(o.exp&&(s=o.exp,i=s<=t),i){const{session:a,error:l}=await this._callRefreshToken(e.refresh_token);if(l)return{data:{user:null,session:null},error:l};if(!a)return{data:{user:null,session:null},error:null};r=a}else{const{data:a,error:l}=await this._getUser(e.access_token);if(l)throw l;r={access_token:e.access_token,refresh_token:e.refresh_token,user:a.user,token_type:"bearer",expires_in:s-t,expires_at:s},await this._saveSession(r),await this._notifyAllSubscribers("SIGNED_IN",r)}return{data:{user:r.user,session:r},error:null}}catch(t){if(N(t))return{data:{session:null,user:null},error:t};throw t}}async refreshSession(e){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._refreshSession(e))}async _refreshSession(e){try{return await this._useSession(async t=>{var s;if(!e){const{data:o,error:a}=t;if(a)throw a;e=(s=o.session)!==null&&s!==void 0?s:void 0}if(!(e!=null&&e.refresh_token))throw new it;const{session:i,error:r}=await this._callRefreshToken(e.refresh_token);return r?{data:{user:null,session:null},error:r}:i?{data:{user:i.user,session:i},error:null}:{data:{user:null,session:null},error:null}})}catch(t){if(N(t))return{data:{user:null,session:null},error:t};throw t}}async _getSessionFromURL(e,t){try{if(!Ie())throw new Ts("No browser detected.");if(e.error||e.error_description||e.error_code)throw new Ts(e.error_description||"Error in URL with unspecified error_description",{error:e.error||"unspecified_error",code:e.error_code||"unspecified_code"});switch(t){case"implicit":if(this.flowType==="pkce")throw new $l("Not a valid PKCE flow url.");break;case"pkce":if(this.flowType==="implicit")throw new Ts("Not a valid implicit grant flow url.");break;default:}if(t==="pkce"){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!e.code)throw new $l("No code detected.");const{data:j,error:k}=await this._exchangeCodeForSession(e.code);if(k)throw k;const O=new URL(window.location.href);return O.searchParams.delete("code"),window.history.replaceState(window.history.state,"",O.toString()),{data:{session:j.session,redirectType:null},error:null}}const{provider_token:s,provider_refresh_token:i,access_token:r,refresh_token:o,expires_in:a,expires_at:l,token_type:c}=e;if(!r||!a||!o||!c)throw new Ts("No session defined in URL");const u=Math.round(Date.now()/1e3),h=parseInt(a);let d=u+h;l&&(d=parseInt(l));const _=d-u;_*1e3<=tn&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${_}s, should have been closer to ${h}s`);const w=d-h;u-w>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",w,d,u):u-w<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",w,d,u);const{data:E,error:S}=await this._getUser(r);if(S)throw S;const R={provider_token:s,provider_refresh_token:i,access_token:r,expires_in:h,expires_at:d,refresh_token:o,token_type:c,user:E.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),{data:{session:R,redirectType:e.type},error:null}}catch(s){if(N(s))return{data:{session:null,redirectType:null},error:s};throw s}}_isImplicitGrantCallback(e){return!!(e.access_token||e.error_description)}async _isPKCECallback(e){const t=await St(this.storage,`${this.storageKey}-code-verifier`);return!!(e.code&&t)}async signOut(e={scope:"global"}){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._signOut(e))}async _signOut({scope:e}={scope:"global"}){return await this._useSession(async t=>{var s;const{data:i,error:r}=t;if(r)return{error:r};const o=(s=i.session)===null||s===void 0?void 0:s.access_token;if(o){const{error:a}=await this.admin.signOut(o,e);if(a&&!(ib(a)&&(a.status===404||a.status===401||a.status===403)))return{error:a}}return e!=="others"&&(await this._removeSession(),await st(this.storage,`${this.storageKey}-code-verifier`)),{error:null}})}onAuthStateChange(e){const t=gb(),s={id:t,callback:e,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",t),this.stateChangeEmitters.delete(t)}};return this._debug("#onAuthStateChange()","registered callback with id",t),this.stateChangeEmitters.set(t,s),(async()=>(await this.initializePromise,await this._acquireLock(-1,async()=>{this._emitInitialSession(t)})))(),{data:{subscription:s}}}async _emitInitialSession(e){return await this._useSession(async t=>{var s,i;try{const{data:{session:r},error:o}=t;if(o)throw o;await((s=this.stateChangeEmitters.get(e))===null||s===void 0?void 0:s.callback("INITIAL_SESSION",r)),this._debug("INITIAL_SESSION","callback id",e,"session",r)}catch(r){await((i=this.stateChangeEmitters.get(e))===null||i===void 0?void 0:i.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",e,"error",r),console.error(r)}})}async resetPasswordForEmail(e,t={}){let s=null,i=null;this.flowType==="pkce"&&([s,i]=await Yt(this.storage,this.storageKey,!0));try{return await F(this.fetch,"POST",`${this.url}/recover`,{body:{email:e,code_challenge:s,code_challenge_method:i,gotrue_meta_security:{captcha_token:t.captchaToken}},headers:this.headers,redirectTo:t.redirectTo})}catch(r){if(N(r))return{data:null,error:r};throw r}}async getUserIdentities(){var e;try{const{data:t,error:s}=await this.getUser();if(s)throw s;return{data:{identities:(e=t.user.identities)!==null&&e!==void 0?e:[]},error:null}}catch(t){if(N(t))return{data:null,error:t};throw t}}async linkIdentity(e){var t;try{const{data:s,error:i}=await this._useSession(async r=>{var o,a,l,c,u;const{data:h,error:d}=r;if(d)throw d;const _=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:(o=e.options)===null||o===void 0?void 0:o.redirectTo,scopes:(a=e.options)===null||a===void 0?void 0:a.scopes,queryParams:(l=e.options)===null||l===void 0?void 0:l.queryParams,skipBrowserRedirect:!0});return await F(this.fetch,"GET",_,{headers:this.headers,jwt:(u=(c=h.session)===null||c===void 0?void 0:c.access_token)!==null&&u!==void 0?u:void 0})});if(i)throw i;return Ie()&&!(!((t=e.options)===null||t===void 0)&&t.skipBrowserRedirect)&&window.location.assign(s==null?void 0:s.url),{data:{provider:e.provider,url:s==null?void 0:s.url},error:null}}catch(s){if(N(s))return{data:{provider:e.provider,url:null},error:s};throw s}}async unlinkIdentity(e){try{return await this._useSession(async t=>{var s,i;const{data:r,error:o}=t;if(o)throw o;return await F(this.fetch,"DELETE",`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:(i=(s=r.session)===null||s===void 0?void 0:s.access_token)!==null&&i!==void 0?i:void 0})})}catch(t){if(N(t))return{data:null,error:t};throw t}}async _refreshAccessToken(e){const t=`#_refreshAccessToken(${e.substring(0,5)}...)`;this._debug(t,"begin");try{const s=Date.now();return await vb(async i=>(i>0&&await yb(200*Math.pow(2,i-1)),this._debug(t,"refreshing attempt",i),await F(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:Ve})),(i,r)=>{const o=200*Math.pow(2,i);return r&&cr(r)&&Date.now()+o-s<tn})}catch(s){if(this._debug(t,"error",s),N(s))return{data:{session:null,user:null},error:s};throw s}finally{this._debug(t,"end")}}_isValidSession(e){return typeof e=="object"&&e!==null&&"access_token"in e&&"refresh_token"in e&&"expires_at"in e}async _handleProviderSignIn(e,t){const s=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:t.redirectTo,scopes:t.scopes,queryParams:t.queryParams});return this._debug("#_handleProviderSignIn()","provider",e,"options",t,"url",s),Ie()&&!t.skipBrowserRedirect&&window.location.assign(s),{data:{provider:e,url:s},error:null}}async _recoverAndRefresh(){var e,t;const s="#_recoverAndRefresh()";this._debug(s,"begin");try{const i=await St(this.storage,this.storageKey);if(i&&this.userStorage){let o=await St(this.userStorage,this.storageKey+"-user");!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!o&&(o={user:i.user},await nn(this.userStorage,this.storageKey+"-user",o)),i.user=(e=o==null?void 0:o.user)!==null&&e!==void 0?e:hr()}else if(i&&!i.user&&!i.user){const o=await St(this.storage,this.storageKey+"-user");o&&(o!=null&&o.user)?(i.user=o.user,await st(this.storage,this.storageKey+"-user"),await nn(this.storage,this.storageKey,i)):i.user=hr()}if(this._debug(s,"session from storage",i),!this._isValidSession(i)){this._debug(s,"session is not valid"),i!==null&&await this._removeSession();return}const r=((t=i.expires_at)!==null&&t!==void 0?t:1/0)*1e3-Date.now()<lr;if(this._debug(s,`session has${r?"":" not"} expired with margin of ${lr}s`),r){if(this.autoRefreshToken&&i.refresh_token){const{error:o}=await this._callRefreshToken(i.refresh_token);o&&(console.error(o),cr(o)||(this._debug(s,"refresh failed with a non-retryable error, removing the session",o),await this._removeSession()))}}else if(i.user&&i.user.__isUserNotAvailableProxy===!0)try{const{data:o,error:a}=await this._getUser(i.access_token);!a&&(o!=null&&o.user)?(i.user=o.user,await this._saveSession(i),await this._notifyAllSubscribers("SIGNED_IN",i)):this._debug(s,"could not get user data, skipping SIGNED_IN notification")}catch(o){console.error("Error getting user data:",o),this._debug(s,"error getting user data, skipping SIGNED_IN notification",o)}else await this._notifyAllSubscribers("SIGNED_IN",i)}catch(i){this._debug(s,"error",i),console.error(i);return}finally{this._debug(s,"end")}}async _callRefreshToken(e){var t,s;if(!e)throw new it;if(this.refreshingDeferred)return this.refreshingDeferred.promise;const i=`#_callRefreshToken(${e.substring(0,5)}...)`;this._debug(i,"begin");try{this.refreshingDeferred=new Fi;const{data:r,error:o}=await this._refreshAccessToken(e);if(o)throw o;if(!r.session)throw new it;await this._saveSession(r.session),await this._notifyAllSubscribers("TOKEN_REFRESHED",r.session);const a={session:r.session,error:null};return this.refreshingDeferred.resolve(a),a}catch(r){if(this._debug(i,"error",r),N(r)){const o={session:null,error:r};return cr(r)||await this._removeSession(),(t=this.refreshingDeferred)===null||t===void 0||t.resolve(o),o}throw(s=this.refreshingDeferred)===null||s===void 0||s.reject(r),r}finally{this.refreshingDeferred=null,this._debug(i,"end")}}async _notifyAllSubscribers(e,t,s=!0){const i=`#_notifyAllSubscribers(${e})`;this._debug(i,"begin",t,`broadcast = ${s}`);try{this.broadcastChannel&&s&&this.broadcastChannel.postMessage({event:e,session:t});const r=[],o=Array.from(this.stateChangeEmitters.values()).map(async a=>{try{await a.callback(e,t)}catch(l){r.push(l)}});if(await Promise.all(o),r.length>0){for(let a=0;a<r.length;a+=1)console.error(r[a]);throw r[0]}}finally{this._debug(i,"end")}}async _saveSession(e){this._debug("#_saveSession()",e),this.suppressGetSessionWarning=!0;const t=Object.assign({},e),s=t.user&&t.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!s&&t.user&&await nn(this.userStorage,this.storageKey+"-user",{user:t.user});const i=Object.assign({},t);delete i.user;const r=Wl(i);await nn(this.storage,this.storageKey,r)}else{const i=Wl(t);await nn(this.storage,this.storageKey,i)}}async _removeSession(){this._debug("#_removeSession()"),await st(this.storage,this.storageKey),await st(this.storage,this.storageKey+"-code-verifier"),await st(this.storage,this.storageKey+"-user"),this.userStorage&&await st(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&Ie()&&(window!=null&&window.removeEventListener)&&window.removeEventListener("visibilitychange",e)}catch(t){console.error("removing visibilitychange callback failed",t)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const e=setInterval(()=>this._autoRefreshTokenTick(),tn);this.autoRefreshTicker=e,e&&typeof e=="object"&&typeof e.unref=="function"?e.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(e),setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async _autoRefreshTokenTick(){this._debug("#_autoRefreshTokenTick()","begin");try{await this._acquireLock(0,async()=>{try{const e=Date.now();try{return await this._useSession(async t=>{const{data:{session:s}}=t;if(!s||!s.refresh_token||!s.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const i=Math.floor((s.expires_at*1e3-e)/tn);this._debug("#_autoRefreshTokenTick()",`access token expires in ${i} ticks, a tick lasts ${tn}ms, refresh threshold is ${Hr} ticks`),i<=Hr&&await this._callRefreshToken(s.refresh_token)})}catch(t){console.error("Auto refresh tick failed with error. This is likely a transient error.",t)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(e){if(e.isAcquireTimeout||e instanceof qh)this._debug("auto refresh token tick lock not available");else throw e}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!Ie()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>await this._onVisibilityChanged(!1),window==null||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error("_handleVisibilityChange",e)}}async _onVisibilityChanged(e){const t=`#_onVisibilityChanged(${e})`;this._debug(t,"visibilityState",document.visibilityState),document.visibilityState==="visible"?(this.autoRefreshToken&&this._startAutoRefresh(),e||(await this.initializePromise,await this._acquireLock(-1,async()=>{if(document.visibilityState!=="visible"){this._debug(t,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()}))):document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,t,s){const i=[`provider=${encodeURIComponent(t)}`];if(s!=null&&s.redirectTo&&i.push(`redirect_to=${encodeURIComponent(s.redirectTo)}`),s!=null&&s.scopes&&i.push(`scopes=${encodeURIComponent(s.scopes)}`),this.flowType==="pkce"){const[r,o]=await Yt(this.storage,this.storageKey),a=new URLSearchParams({code_challenge:`${encodeURIComponent(r)}`,code_challenge_method:`${encodeURIComponent(o)}`});i.push(a.toString())}if(s!=null&&s.queryParams){const r=new URLSearchParams(s.queryParams);i.push(r.toString())}return s!=null&&s.skipBrowserRedirect&&i.push(`skip_http_redirect=${s.skipBrowserRedirect}`),`${e}?${i.join("&")}`}async _unenroll(e){try{return await this._useSession(async t=>{var s;const{data:i,error:r}=t;return r?{data:null,error:r}:await F(this.fetch,"DELETE",`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:(s=i==null?void 0:i.session)===null||s===void 0?void 0:s.access_token})})}catch(t){if(N(t))return{data:null,error:t};throw t}}async _enroll(e){try{return await this._useSession(async t=>{var s,i;const{data:r,error:o}=t;if(o)return{data:null,error:o};const a=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType==="phone"?{phone:e.phone}:{issuer:e.issuer}),{data:l,error:c}=await F(this.fetch,"POST",`${this.url}/factors`,{body:a,headers:this.headers,jwt:(s=r==null?void 0:r.session)===null||s===void 0?void 0:s.access_token});return c?{data:null,error:c}:(e.factorType==="totp"&&(!((i=l==null?void 0:l.totp)===null||i===void 0)&&i.qr_code)&&(l.totp.qr_code=`data:image/svg+xml;utf-8,${l.totp.qr_code}`),{data:l,error:null})})}catch(t){if(N(t))return{data:null,error:t};throw t}}async _verify(e){return this._acquireLock(-1,async()=>{try{return await this._useSession(async t=>{var s;const{data:i,error:r}=t;if(r)return{data:null,error:r};const{data:o,error:a}=await F(this.fetch,"POST",`${this.url}/factors/${e.factorId}/verify`,{body:{code:e.code,challenge_id:e.challengeId},headers:this.headers,jwt:(s=i==null?void 0:i.session)===null||s===void 0?void 0:s.access_token});return a?{data:null,error:a}:(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+o.expires_in},o)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",o),{data:o,error:a})})}catch(t){if(N(t))return{data:null,error:t};throw t}})}async _challenge(e){return this._acquireLock(-1,async()=>{try{return await this._useSession(async t=>{var s;const{data:i,error:r}=t;return r?{data:null,error:r}:await F(this.fetch,"POST",`${this.url}/factors/${e.factorId}/challenge`,{body:{channel:e.channel},headers:this.headers,jwt:(s=i==null?void 0:i.session)===null||s===void 0?void 0:s.access_token})})}catch(t){if(N(t))return{data:null,error:t};throw t}})}async _challengeAndVerify(e){const{data:t,error:s}=await this._challenge({factorId:e.factorId});return s?{data:null,error:s}:await this._verify({factorId:e.factorId,challengeId:t.id,code:e.code})}async _listFactors(){const{data:{user:e},error:t}=await this.getUser();if(t)return{data:null,error:t};const s=(e==null?void 0:e.factors)||[],i=s.filter(o=>o.factor_type==="totp"&&o.status==="verified"),r=s.filter(o=>o.factor_type==="phone"&&o.status==="verified");return{data:{all:s,totp:i,phone:r},error:null}}async _getAuthenticatorAssuranceLevel(){return this._acquireLock(-1,async()=>await this._useSession(async e=>{var t,s;const{data:{session:i},error:r}=e;if(r)return{data:null,error:r};if(!i)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:o}=ur(i.access_token);let a=null;o.aal&&(a=o.aal);let l=a;((s=(t=i.user.factors)===null||t===void 0?void 0:t.filter(h=>h.status==="verified"))!==null&&s!==void 0?s:[]).length>0&&(l="aal2");const u=o.amr||[];return{data:{currentLevel:a,nextLevel:l,currentAuthenticationMethods:u},error:null}}))}async fetchJwk(e,t={keys:[]}){let s=t.keys.find(a=>a.kid===e);if(s)return s;const i=Date.now();if(s=this.jwks.keys.find(a=>a.kid===e),s&&this.jwks_cached_at+nb>i)return s;const{data:r,error:o}=await F(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(o)throw o;return!r.keys||r.keys.length===0||(this.jwks=r,this.jwks_cached_at=i,s=r.keys.find(a=>a.kid===e),!s)?null:s}async getClaims(e,t={}){try{let s=e;if(!s){const{data:_,error:w}=await this.getSession();if(w||!_.session)return{data:null,error:w};s=_.session.access_token}const{header:i,payload:r,signature:o,raw:{header:a,payload:l}}=ur(s);t!=null&&t.allowExpired||kb(r.exp);const c=!i.alg||i.alg.startsWith("HS")||!i.kid||!("crypto"in globalThis&&"subtle"in globalThis.crypto)?null:await this.fetchJwk(i.kid,t!=null&&t.keys?{keys:t.keys}:t==null?void 0:t.jwks);if(!c){const{error:_}=await this.getUser(s);if(_)throw _;return{data:{claims:r,header:i,signature:o},error:null}}const u=Cb(i.alg),h=await crypto.subtle.importKey("jwk",c,u,!0,["verify"]);if(!await crypto.subtle.verify(u,h,o,db(`${a}.${l}`)))throw new Gr("Invalid JWT signature");return{data:{claims:r,header:i,signature:o},error:null}}catch(s){if(N(s))return{data:null,error:s};throw s}}}ns.nextInstanceID=0;const Vb=ns;class qb extends Vb{constructor(e){super(e)}}var Hb=function(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{c(s.next(u))}catch(h){o(h)}}function l(u){try{c(s.throw(u))}catch(h){o(h)}}function c(u){u.done?r(u.value):i(u.value).then(a,l)}c((s=s.apply(n,e||[])).next())})};class zb{constructor(e,t,s){var i,r,o;if(this.supabaseUrl=e,this.supabaseKey=t,!e)throw new Error("supabaseUrl is required.");if(!t)throw new Error("supabaseKey is required.");const a=Yw(e),l=new URL(a);this.realtimeUrl=new URL("realtime/v1",l),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",l),this.storageUrl=new URL("storage/v1",l),this.functionsUrl=new URL("functions/v1",l);const c=`sb-${l.hostname.split(".")[0]}-auth-token`,u={db:Ww,realtime:qw,auth:Object.assign(Object.assign({},Vw),{storageKey:c}),global:Uw},h=Qw(s??{},u);this.storageKey=(i=h.auth.storageKey)!==null&&i!==void 0?i:"",this.headers=(r=h.global.headers)!==null&&r!==void 0?r:{},h.accessToken?(this.accessToken=h.accessToken,this.auth=new Proxy({},{get:(d,_)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(_)} is not possible`)}})):this.auth=this._initSupabaseAuthClient((o=h.auth)!==null&&o!==void 0?o:{},this.headers,h.global.fetch),this.fetch=Gw(t,this._getAccessToken.bind(this),h.global.fetch),this.realtime=this._initRealtimeClient(Object.assign({headers:this.headers,accessToken:this._getAccessToken.bind(this)},h.realtime)),this.rest=new lw(new URL("rest/v1",l).href,{headers:this.headers,schema:h.db.schema,fetch:this.fetch}),this.storage=new jw(this.storageUrl.href,this.headers,this.fetch,s==null?void 0:s.storage),h.accessToken||this._listenForAuthEvents()}get functions(){return new $v(this.functionsUrl.href,{headers:this.headers,customFetch:this.fetch})}from(e){return this.rest.from(e)}schema(e){return this.rest.schema(e)}rpc(e,t={},s={}){return this.rest.rpc(e,t,s)}channel(e,t={config:{}}){return this.realtime.channel(e,t)}getChannels(){return this.realtime.getChannels()}removeChannel(e){return this.realtime.removeChannel(e)}removeAllChannels(){return this.realtime.removeAllChannels()}_getAccessToken(){var e,t;return Hb(this,void 0,void 0,function*(){if(this.accessToken)return yield this.accessToken();const{data:s}=yield this.auth.getSession();return(t=(e=s.session)===null||e===void 0?void 0:e.access_token)!==null&&t!==void 0?t:this.supabaseKey})}_initSupabaseAuthClient({autoRefreshToken:e,persistSession:t,detectSessionInUrl:s,storage:i,storageKey:r,flowType:o,lock:a,debug:l},c,u){const h={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new qb({url:this.authUrl.href,headers:Object.assign(Object.assign({},h),c),storageKey:r,autoRefreshToken:e,persistSession:t,detectSessionInUrl:s,storage:i,flowType:o,lock:a,debug:l,fetch:u,hasCustomAuthorizationHeader:"Authorization"in this.headers})}_initRealtimeClient(e){return new Iw(this.realtimeUrl.href,Object.assign(Object.assign({},e),{params:Object.assign({apikey:this.supabaseKey},e==null?void 0:e.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((t,s)=>{this._handleTokenChanged(t,"CLIENT",s==null?void 0:s.access_token)})}_handleTokenChanged(e,t,s){(e==="TOKEN_REFRESHED"||e==="SIGNED_IN")&&this.changedAccessToken!==s?this.changedAccessToken=s:e==="SIGNED_OUT"&&(this.realtime.setAuth(),t=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}}const Kb=(n,e,t)=>new zb(n,e,t);function Gb(){if(typeof window<"u"||typeof process>"u")return!1;const n=process.version;if(n==null)return!1;const e=n.match(/^v(\d+)\./);return e?parseInt(e[1],10)<=18:!1}Gb()&&console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217");let ut,Kl=!1,x,Pn=[],je,rn=null;const en={};let Vt=null;const ri=new Set,H=localStorage.getItem("deviceId")||null,ss="https://mister-x-d6b59-default-rtdb.europe-west1.firebasedatabase.app";let Un=null,Re=null,$e=null,Hh=!1;const fr="showNotifHeader",zh="currentTeamId";let se=null,Ze={},Is={deviceTeam:null,teams:null},Kh=null,On=[];const Gh="showAgentLocations",Gl="lastRespondedAgentReqId";let Rs=(localStorage.getItem(Gh)??"1")==="1";L.icon({iconUrl:"https://unpkg.com/leaflet@1/dist/images/marker-icon.png",iconRetinaUrl:"https://unpkg.com/leaflet@1/dist/images/marker-icon-2x.png",shadowUrl:"https://unpkg.com/leaflet@1/dist/images/marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],shadowSize:[41,41]});const Jb=[[48.21778257924239,16.37016154994435],[48.217247563322225,16.37076456217454],[48.21741142779978,16.371253762059183],[48.216865105563464,16.37191529883514],[48.21581506144457,16.37290646405736],[48.21417125610604,16.373948000332064],[48.21430769576697,16.3745721914746],[48.21333498613118,16.37539386682008],[48.2122964590416,16.377294652276152],[48.211699711347876,16.38092342451245],[48.211941642178076,16.38467493512273],[48.20913524997675,16.384032997995277],[48.20434428995476,16.380677464805487],[48.20267440663029,16.378771628716105],[48.202516949057625,16.378787036085683],[48.2021791301039,16.378713275337773],[48.20032081399359,16.37673193693543],[48.20046567888107,16.376081501249317],[48.19987161819025,16.37355423682974],[48.19981183801774,16.372899054744835],[48.200631534154375,16.369653382537916],[48.20071916193201,16.369103424638855],[48.200163223194544,16.368756078571426],[48.19948213275357,16.368406050294983],[48.19950721778074,16.3679406870309],[48.1998469538764,16.366987161726104],[48.19976119600531,16.366945587486374],[48.199786280895815,16.366662614435302],[48.199852484835134,16.36658080706035],[48.199605825841886,16.366136901468384],[48.199689907919776,16.365894161552536],[48.199997462783195,16.365407340616333],[48.20007450484762,16.36539258846675],[48.200780727683785,16.364471249670135],[48.20235733493688,16.36143133067089],[48.202316181915776,16.361391179971125],[48.20252539808658,16.36095263879719],[48.20263271531552,16.36073672097149],[48.20274853131339,16.36083590228765],[48.20475579365605,16.35819251441422],[48.20494354858451,16.357837121719747],[48.205074099582546,16.357685576910406],[48.20502589015989,16.357555489773183],[48.20506169808996,16.357492457861333],[48.205261965068914,16.357456248039632],[48.20626549207577,16.356030140071557],[48.20666774752276,16.35550308600013],[48.20697347295606,16.355354223399804],[48.20918910891197,16.354601648098285],[48.20921597664341,16.35491948986655],[48.20929110567211,16.354928877598102],[48.20938410911258,16.354983862882907],[48.212403444290665,16.35518085630021],[48.212634067324394,16.355560388875816],[48.214753862701514,16.35585677297196],[48.21482540908184,16.356370415998313],[48.21454632473899,16.35850592710254],[48.21435355993972,16.36025556372129],[48.21477999581608,16.361298310706765],[48.21461086605676,16.3615351876565],[48.214799725889385,16.361933238614775],[48.21476774885914,16.362013013827934],[48.214317217645544,16.362474541146735],[48.21554996828477,16.365200001058092],[48.21618181295601,16.36659154989541],[48.21691897070536,16.368248676490595],[48.21768157297474,16.36988155904141],[48.21778257924239,16.37016154994435]],Yb=[[-90,-180],[-90,180],[90,180],[90,-180]],Jl=L.polygon([Yb,Jb],{color:"red",weight:3,fillColor:"rgba(255, 0, 0, 0.3)",fillOpacity:.35,interactive:!1,dashArray:"5, 5"}),Qb={blau:"#1E90FF",gruen:"#2ECC71",rot:"#FF5252",gelb:"#F4D03F",orange:"#FF8C00",lila:"#8E44AD",schwarz:"#333333",grau:"#7F8C8D"};window.onerror=function(n,e,t,s,i){alert("JS-Fehler: "+n+" in "+e+" Zeile "+t)};const Ue=Kb("https://axirbthvnznvhfagduyj.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4aXJidGh2bnpudmhmYWdkdXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMDI2MTcsImV4cCI6MjA2ODg3ODYxN30.wfJm9e10_iNuYm_r3es_FmKuXBePsxSjIJcVqmSuYjc");async function Xb(n){const e=localStorage.getItem("role")||"start";try{const{error:t}=await Ue.from("fcm_tokens").delete().eq("device_name",H);t?T("❌ Fehler beim Löschen aus Supabase:",t):T("✅ Alter Token aus Supabase gelöscht.");const{error:s}=await Ue.from("fcm_tokens").upsert({token:n,device_name:H,role:e});s?T("❌ Fehler beim Speichern des Tokens:",s):T("✅ Token erfolgreich gespeichert.")}catch(t){T("❌ Supabase Exception:",t)}}function Jr(){let n=localStorage.getItem("deviceId");for(;!n||n.trim()==="";)n=prompt("Bitte gib deinen Namen ein"),n===null&&alert("Du musst einen Namen eingeben, um fortzufahren.");return localStorage.setItem("deviceId",n.trim()),n.trim()}try{localStorage.setItem("test","1")}catch{alert("⚠️ Dein Browser blockiert lokalen Speicher. Bitte verlasse den privaten Modus oder ändere die Einstellungen.")}async function Zb(){try{if(!await Oi()){alert("❌ Push-Benachrichtigungen werden in diesem Browser/Modus nicht unterstützt.");return}if(!("Notification"in window)){alert("❌ Notification API nicht verfügbar.");return}const e=await Notification.requestPermission();if(e!=="granted"){T("Benachrichtigungen nicht erlaubt:",e),alert("⚠️ Benachrichtigungen wurden abgelehnt.");return}const t=await uS();T("Service Worker registriert mit Scope:",t.scope),localStorage.setItem("serviceWorkerRegistered","true"),je||(je=Ni(wn));const s=await bh(je,{serviceWorkerRegistration:t,vapidKey:"BPxoiPhAH4gXMrR7PhhrAUolApYTK93-MZ48-BHWF0rksFtkvBwE9zYUS2pfiEw6_PXzPYyaQZdNwM6LL4QdeOE"});if(!s){T("Kein Token erhalten."),alert("⚠️ Kein Token erhalten. Bitte erneut versuchen.");return}localStorage.setItem("fcmToken",s),T("Token:",s),await Le(C(A,`tokens/${H}`),s),await mt(C(A,"roles/${deviceId}/role"),"start"),await Xb(s),localStorage.setItem("nachrichtAktiv","true");const i=document.getElementById("permissionButton");i&&(i.style.display="none"),e0(H).then(()=>{alert("✅ Benachrichtigungen aktiviert!")})}catch(n){T("Fehler bei Berechtigung/Registrierung/Token:",n),alert("❌ Fehler: "+((n==null?void 0:n.message)??String(n)))}}async function e0(n){const e=await s0("app-db","settings");return new Promise((t,s)=>{const i=e.transaction("settings","readwrite");i.objectStore("settings").put(n,"deviceName"),i.oncomplete=()=>{e.close(),t(!0)},i.onerror=()=>{e.close(),s(i.error)}})}async function t0(n){const e=await new Promise((t,s)=>{const i=indexedDB.open("app-db");i.onupgradeneeded=()=>{const r=i.result;r.objectStoreNames.contains("sw-flags")||r.createObjectStore("sw-flags")},i.onsuccess=()=>t(i.result),i.onerror=()=>s(i.error)});try{return await new Promise(t=>{const r=e.transaction("sw-flags","readonly").objectStore("sw-flags").get(n);r.onsuccess=()=>{e.close(),t(r.result||null)},r.onerror=()=>{e.close(),t(null)}})}catch{return null}}async function n0(n){const e=await new Promise((t,s)=>{const i=indexedDB.open("app-db");i.onupgradeneeded=()=>{const r=i.result;r.objectStoreNames.contains("sw-flags")||r.createObjectStore("sw-flags")},i.onsuccess=()=>t(i.result),i.onerror=()=>s(i.error)});await new Promise(t=>{const s=e.transaction("sw-flags","readwrite");s.objectStore("sw-flags").delete(n),s.oncomplete=()=>{e.close(),t()},s.onerror=()=>{e.close(),t()}})}async function pr(n={}){const{force:e=!1,vapidKey:t="BPxoiPhAH4gXMrR7PhhrAUolApYTK93-MZ48-BHWF0rksFtkvBwE9zYUS2pfiEw6_PXzPYyaQZdNwM6LL4QdeOE",touchWhenUnchanged:s=!0}=n;if(typeof Notification>"u"||Notification.permission!=="granted"||localStorage.getItem("serviceWorkerRegistered")!=="true")return T("🔕 Token-Refresh übersprungen: Keine Berechtigung oder kein SW."),null;try{const i=await navigator.serviceWorker.ready;let r=null;try{r=await bh(je,{serviceWorkerRegistration:i,vapidKey:t})}catch(a){return T("❌ Fehler bei getToken:",a),null}if(!r)return T("⚠️ Kein Token beim Refresh erhalten."),null;const o=localStorage.getItem("fcmToken");if(e||r!==o){T("🔄 Token aktualisiert:",r),await Le(C(A,"tokens/"+H),r);try{const{error:a}=await Ue.from("fcm_tokens").upsert({token:r,device_name:H},{onConflict:"device_name"});a?T("❌ Fehler beim Upsert in Supabase:",a):T("✅ Token in Supabase upserted.")}catch(a){T("❌ Supabase Upsert Exception:",a)}return localStorage.setItem("fcmToken",r),localStorage.setItem("nachrichtAktiv","true"),r}else return T("ℹ️ Token ist unverändert."),r}catch(i){return T("❌ Fehler beim Token-Refresh:",i),null}}async function s0(n,e){return new Promise((t,s)=>{const i=indexedDB.open(n);i.onupgradeneeded=()=>{const r=i.result;r.objectStoreNames.contains(e)||r.createObjectStore(e)},i.onsuccess=()=>{const r=i.result;if(r.objectStoreNames.contains(e))return t(r);const o=r.version+1;r.close();const a=indexedDB.open(n,o);a.onupgradeneeded=()=>{const l=a.result;l.objectStoreNames.contains(e)||l.createObjectStore(e)},a.onsuccess=()=>t(a.result),a.onerror=()=>s(a.error)},i.onerror=()=>s(i.error)})}async function i0(){let n=localStorage.getItem("deviceId");for(;!n||n.trim()==="";)n=prompt("Bitte gib deinen Namen ein"),n===null&&alert("Du musst einen Namen eingeben, um fortzufahren.");n=n.trim(),localStorage.setItem("deviceId",n);let e=Xh(),t=e.tel||null,s=!!e.noTel,i;try{i=await d0(n)}catch(a){T("[askForDeviceIdAndPhone] Konnte Remote-Status nicht laden:",a),i={exists:!1,allowSmsFallback:null,tel:null}}let r=!1;if(i.allowSmsFallback===null?(r=!0,s=!1):i.allowSmsFallback===!1?r=!1:i.allowSmsFallback===!0&&!i.tel&&(r=!0),i.allowSmsFallback===!0&&i.tel){Yl({tel:i.tel,allowSmsFallback:!0,noTel:!1}),await Ql(n,i.tel,!0);return}if(r&&!s||r&&i.allowSmsFallback===null)for(;!t||!u0(t);){let a=prompt(`Bitte gib deine Telefonnummer für SMS-Fallback ein (+43… oder 0664…)
Du kannst auch leer lassen, wenn du keine SMS möchtest.`);if(a===null||a.trim()===""){t=null,s=!0;break}t=f0(a.trim()),t||alert("Ungültige Nummer. Bitte im Format +43… oder 0664… eingeben.")}const o=!!t;Yl({tel:t,allowSmsFallback:o,noTel:s}),await Ql(n,t,o)}async function r0(){try{const n=await Oi().catch(()=>!1);je||(je=Ni(wn));const e=localStorage.getItem("fcmToken");if(n)try{await Rv(je),T("✅ deleteToken: lokaler FCM-Token invalidiert")}catch(t){T("⚠️ deleteToken fehlgeschlagen:",t)}try{await pe(C(A,`tokens/${H}`)),T("✅ RTDB-Token entfernt für",H)}catch(t){T("⚠️ RTDB-Remove fehlgeschlagen:",t)}try{const{error:t}=await Ue.from("fcm_tokens").delete().or(`device_name.eq.${H}${e?`,token.eq.${e}`:""}`);t?T("⚠️ Supabase-Delete Fehler:",t):T("✅ Supabase-Einträge entfernt")}catch(t){T("⚠️ Supabase-Delete (catch):",t)}if("serviceWorker"in navigator){const t=await navigator.serviceWorker.getRegistrations();for(const s of t)try{const i=await s.pushManager.getSubscription();i&&(await i.unsubscribe(),T("✅ Push-Subscription gekündigt für",s.scope))}catch(i){T("⚠️ unsubscribe warn:",i)}await Promise.all(t.map(s=>s.unregister())),T("✅ Alle Service Worker unregistriert")}try{if(window.caches){const t=await caches.keys();await Promise.all(t.map(s=>caches.delete(s))),T("✅ Alle Caches gelöscht:",t)}}catch(t){T("⚠️ Cache cleanup warn:",t)}try{indexedDB.deleteDatabase("app-db"),T('✅ IndexedDB "app-db" gelöscht')}catch(t){T("⚠️ IndexedDB delete warn:",t)}localStorage.removeItem("fcmToken"),localStorage.removeItem("nachrichtAktiv"),localStorage.removeItem("serviceWorkerRegistered");try{const t=document.getElementById("permissionButton"),s=document.getElementById("permissionButton2");t&&(t.style.display=""),s&&(s.style.display="none")}catch{}setTimeout(()=>{alert("🔕 Benachrichtigungen deaktiviert. Die Seite wird neu geladen…"),location.reload()},150)}catch(n){T(n),alert("❌ Deaktivieren fehlgeschlagen: "+((n==null?void 0:n.message)??String(n)))}}function o0(n,e=[],t,s=15,{rtdbBase:i=ss,rolesPath:r="roles",recipientsPath:o="notifications",idempotencyFlag:a="smsTriggered",secret:l=typeof SMS_FALLBACK_SECRET<"u"?SMS_FALLBACK_SECRET:"",rtdbAuth:c}={}){if(!n)throw new Error("[Fallback] messageId fehlt");if(!Array.isArray(e)||e.length===0)return T("[Fallback] keine Empfänger - Fallback nicht geplant"),Promise.resolve({ok:!0,skipped:"no_recipients"});if(!i)throw new Error("[Fallback] rtdbBase fehlt");const u={messageId:n,recipientDeviceNames:e,smsText:String(t??"").slice(0,280),waitSec:s,rtdbBase:i,rolesPath:r,recipientsPath:o,idempotencyFlag:a,...c?{rtdbAuth:c}:{}},h={};return l&&(h["x-sms-secret"]=l),Ue.functions.invoke("sms-fallback",{body:u,headers:h}).then(({data:d,error:_})=>_?(T("[Fallback] Edge call failed",_),{ok:!1,error:_.message||"invoke failed"}):(T("[Fallback] scheduled:",d),d)).catch(d=>(T("[Fallback] Konnte SMS-Fallback nicht planen:",d),{ok:!1,error:(d==null?void 0:d.message)||String(d)}))}function Ps(){try{const n=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:void 0,e=n&&n.crypto;if(e&&typeof e.randomUUID=="function")return e.randomUUID();if(e&&typeof e.getRandomValues=="function"){const t=new Uint8Array(16);e.getRandomValues(t),t[6]=t[6]&15|64,t[8]=t[8]&63|128;const s=r=>r.toString(16).padStart(2,"0"),i=Array.from(t,s).join("");return`${i.slice(0,8)}-${i.slice(8,12)}-${i.slice(12,16)}-${i.slice(16,20)}-${i.slice(20)}`}}catch{}return`${Date.now()}-${Math.random().toString(36).slice(2,10)}`}async function Jh(n,e,t=[],s={}){const{recipientDeviceNames:i=[],link:r="/Mister-X/",attempt:o=1,maxAttempts:a=5,waitSec:l=15,sendEndpoint:c="https://axirbthvnznvhfagduyj.supabase.co/functions/v1/send-to-all",rtdbBase:u=ss,messageId:h}=s,d=h??Ps(),_=(typeof Jr=="function"?Jr():null)||"unknown",w=o===1,S=await fetch(c,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:n,body:e,tokens:t,senderName:_,link:r,messageId:d,rtdbBase:u,recipientDeviceNames:w?i:[],setRecipientsMode:w?"set_once":"none",attempt:o})});let R={};try{R=await S.json()}catch{}if(T(`📦 Versuch ${o}: status=${S.status}`,R),w&&i.length>0){const k=`${n}: ${e}
Diese Nachricht wurde automatisch gesendet (unter Android kommt das unverhinderbar manchmal vor, unter iOS bitte einmal die App neu laden über Knopf oben rechts).`.slice(0,280);o0(d,i,k,15,{rtdbBase:ss})}const j=Array.isArray(R==null?void 0:R.failedTokens)?R.failedTokens:[];return j.length>0&&o<a?(T(`🔁 Wiederhole für ${j.length} fehlgeschlagene Tokens in 10s...`),setTimeout(()=>{Jh(n,e,j,{recipientDeviceNames:i,link:r,attempt:o+1,maxAttempts:a,waitSec:l,sendEndpoint:c,rtdbBase:u,messageId:d}).catch(T)},1e4)):o>=a?T("⏱️ Max. Anzahl an Versuchen erreicht."):T("✅ Alle Benachrichtigungen verarbeitet."),R}async function Dt(n,e,t,s={}){const[i,r]=await Promise.all([ae(C(A,"roles")),ae(C(A,"tokens"))]),o=i.exists()?i.val():{},a=r.exists()?r.val():{},l=Array.isArray(t)?t:[t],c=l.length===1&&l[0]==="all",u=[],h=[];for(const w in a){if(!Object.prototype.hasOwnProperty.call(a,w))continue;const E=o[w]||{},S=E.role,R=E.notification!==!1;if(!(c||S&&l.includes(S))||!R)continue;const k=Qh(a[w]);k.length!==0&&(u.push(...k),h.push(w))}const d=oi(u),_=oi(h);if(d.length===0){T(`⚠️ Keine passenden Tokens für Rollen "${Array.isArray(t)?t.join(","):t}" gefunden.`);return}return Jh(n,e,d,{recipientDeviceNames:_,link:s.link||"/Mister-X/",waitSec:typeof s.waitSec=="number"?s.waitSec:45,sendEndpoint:s.sendEndpoint,rtdbBase:s.rtdbBase})}async function a0(n){const e=Array.isArray(n)?n:[n],[t,s]=await Promise.all([ae(C(A,"roles")),ae(C(A,"tokens"))]),i=t.exists()?t.val():{},r=s.exists()?s.val():{},o=e.length===1&&e[0]==="all",a=[],l=[];for(const c in r){if(!Object.prototype.hasOwnProperty.call(r,c))continue;const u=i[c]||{},h=u.role,d=u.notification!==!1;if(!(o||h&&e.includes(h))||!d)continue;const w=Qh(r[c]);w.length!==0&&(a.push(...w),l.push(c))}return{tokens:oi(a),deviceNames:oi(l)}}function l0(n,e){const t="Misterx-upload",s=new FormData;s.append("file",n),s.append("upload_preset",t),fetch("https://api.cloudinary.com/v1_1/ddvf141hb/image/upload",{method:"POST",body:s}).then(i=>i.json()).then(i=>{i.secure_url&&i.public_id?e({url:i.secure_url}):alert("Fehler beim Hochladen zu Cloudinary.")}).catch(i=>{T("Upload-Fehler:",i),alert("Fehler beim Hochladen zu Cloudinary.")})}async function c0(){const n=document.getElementById("photoInput").files[0],e=document.getElementById("manualLocationDescription").value.trim(),t=document.getElementById("manualLocationContainer"),s=document.getElementById("status"),i=pS();if(!i){alert("Bitte zuerst einen Posten auswählen.");return}if(!n){alert("Bitte ein Foto auswählen.");return}const r=Date.now();let o={lat:null,lon:null,accuracy:null};if(!(t&&t.style.display!=="none"&&e!==""))if(navigator.geolocation)try{const w=await sd(),{latitude:E,longitude:S,accuracy:R}=w.coords;if(R>100){s.innerText=`⚠️ Standort ungenau (±${Math.round(R)} m). Bitte erneut versuchen oder Standortbeschreibung eingeben.`,t.style.display="block";return}o={lat:E,lon:S,accuracy:R}}catch(w){Ns==null||Ns(w),t.style.display="block"}else s.innerText="Geolocation wird nicht unterstützt.",t.style.display="block";const{color:a,postId:l,title:c}=i,u=C(A,`posten/${a}/active`);s.innerText="⏳ Reserviere Farbe…";try{const w=await Vo(u,E=>E===!0?!1:E);if(!w.committed||w.snapshot.val()!==!1){s.innerText="❌ Diese Farbe ist bereits inaktiv. Liste wird aktualisiert.";return}}catch(w){s.innerText="❌ Konnte Farbe nicht reservieren.",T(w);return}try{await mt(C(A),{[`posten/${a}/${l}/visited`]:!0})}catch(w){s.innerText="❌ Konnte Posten nicht auf 'visited' setzen.",T(w);return}const h={color:a,postId:l,title:c,timestamp:r,description:e||null,lat:o.lat,lon:o.lon},d=Zs(C(A,"locations"),h),_=`${c} (${a.toUpperCase()})`;Dt==null||Dt("Mister X hat sich gezeigt!",_,["agent","settings","start"]),l0(n,async({url:w})=>{try{await mt(d,{photoURL:w})}catch(E){T("Foto-URL konnte nicht gesetzt werden",E)}}),document.getElementById("photoInput").value="",document.getElementById("manualLocationDescription").value="",t.style.display="none",document.getElementById("postenSearch").value="",ud(null),s.innerText="✅ Posten/Farbe gemeldet & Foto wird hochgeladen.",Vn==null||Vn()}function u0(n){return typeof n=="string"&&/^\+43\d{4,13}$/.test(n)}function Yh(n){return n.replace(/[.#$/\[\]\/]/g,"_")}function oi(n){return Array.from(new Set(n))}function Qh(n){return n?typeof n=="string"?[n]:Array.isArray(n)?n.filter(Boolean):typeof n=="object"?Object.keys(n).filter(Boolean):[]:[]}function h0(n){const e=String(n).trim();return e.startsWith("+")?"+"+e.slice(1).replace(/\D/g,""):e.replace(/\D/g,"")}function Xh(){try{return JSON.parse(localStorage.getItem("mrx_sms_prefs_v1"))??{allowSmsFallback:!1,tel:null,noTel:!1,lastUpdated:0}}catch{return{allowSmsFallback:!1,tel:null,noTel:!1,lastUpdated:0}}}function Yl(n){const e=Xh(),t={allowSmsFallback:!!(n.allowSmsFallback??e.allowSmsFallback),tel:n.tel===void 0?e.tel:n.tel,noTel:n.noTel===void 0?e.noTel:n.noTel,lastUpdated:Date.now()};return localStorage.setItem("mrx_sms_prefs_v1",JSON.stringify(t)),t}async function d0(n){const e=Yh(n),t=await ae(C(A,`roles/${e}`));if(!t.exists())return{exists:!1,allowSmsFallback:null,tel:null};const s=t.val()||{};return{exists:!0,allowSmsFallback:s.allowSmsFallback!==void 0?!!s.allowSmsFallback:null,tel:s.tel??null}}function f0(n){if(!n)return null;let e=h0(n);if(e.startsWith("+43"))return/^\+43\d{4,13}$/.test(e)?e:null;if(e.startsWith("0")){const t="+43"+e.slice(1);return/^\+43\d{4,13}$/.test(t)?t:null}if(e.startsWith("43")){const t="+"+e;return/^\+43\d{4,13}$/.test(t)?t:null}if(/^\d{5,}$/.test(e)&&e[0]!=="0"){const t="+43"+e;return/^\+43\d{4,13}$/.test(t)?t:null}return null}async function Ql(n,e,t){const s=Yh(n),i=`${ss}/roles/${s}.json`,r={tel:e??null,allowSmsFallback:!!t,...e?{telUpdatedAt:Date.now()}:{}};await fetch(i,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})}const ce=n=>document.getElementById(n),ia=n=>n&&(n.style.display=""),ra=n=>n&&(n.style.display="none"),Bi=n=>{try{localStorage.setItem(zh,n||"")}catch{}},p0=()=>{try{return localStorage.getItem(zh)||""}catch{return""}};function Zh(n){return typeof n=="number"?n:n&&typeof n=="object"&&typeof n.seconds=="number"?n.seconds*1e3:0}function ed(n){return n?`${String(n)}`:"Unbekannt"}function g0(n){const e=(n||"").trim();if(e.length<2)throw new Error("Der Teamname muss mindestens 2 Zeichen lang sein.");if(e.length>24)throw new Error("Der Teamname darf maximal 24 Zeichen lang sein.");return e}function an(n){return(n||"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function Yr(n){const e=(n==null?void 0:n.members)||{};return Object.keys(e).length}function m0(n,e=H){return!!(n!=null&&n.members)&&!!n.members[e]}function _0(){p0()?(ce("teamStatusName").textContent="(lädt…)",ce("teamStatusCount").textContent="-"):(ce("teamStatusName").textContent="Kein Team",ce("teamStatusCount").textContent="-"),oa()}document.addEventListener("DOMContentLoaded",_0);function y0(){ia(ce("teamSettings")),ra(ce("startView")),oa()}function v0(){ia(ce("startView")),ra(ce("teamSettings"))}function oa(){if(!Is.deviceTeam){const n=C(A,`deviceTeams/${H}`),e=t=>{se=t.val()||null,Bi(se||""),Xl(),Zl(),ec()};nt(n,e),Is.deviceTeam={ref:n,handler:e}}if(!Is.teams){const n=C(A,"teams"),e=t=>{Ze=t.val()||{},Xl(),Zl(),ec()};nt(n,e),Is.teams={ref:n,handler:e}}}function Xl(){const n=ce("currentTeamName"),e=ce("currentTeamMembers"),t=ce("leaveTeamBtn"),s=se?Ze[se]:null;if(!s){n.textContent="Kein Team",e&&(e.innerHTML="— Mitglieder"),t&&(t.disabled=!0);return}n.textContent=s.name||"(ohne Namen)";const i=Object.entries(s.members||{}).map(([o,a])=>({id:o,joinedAt:Zh(a==null?void 0:a.joinedAt)})).sort((o,a)=>o.joinedAt!==a.joinedAt?o.joinedAt-a.joinedAt:o.id.localeCompare(a.id)),r=i.map(o=>{const a=o.id===H,l=ed(o.id)+(a?" (Du)":"");return`<li class="ts-member ${a?"me":""}" title="${an(o.id)}">${an(l)}</li>`}).join("");e&&(e.innerHTML=`
      <div class="muted">${i.length} Mitglied(er)</div>
      ${i.length>0?`<ul class="ts-member-list">${r}</ul>`:'<div class="muted">Noch keine Mitglieder</div>'}
    `),t&&(t.disabled=!m0(s))}function Zl(){const n=ce("teamList"),e=ce("teamsEmpty");if(!n)return;n.innerHTML="";const t=Object.entries(Ze||{}).filter(([,s])=>s&&typeof s=="object");if(t.length===0){e&&ia(e);return}e&&ra(e),t.sort((s,i)=>{const r=Yr(s[1]),o=Yr(i[1]);return r!==o?o-r:(s[1].name||"").localeCompare(i[1].name||"")});for(const[s,i]of t){const r=Object.entries(i.members||{}).map(([l,c])=>({id:l,joinedAt:Zh(c==null?void 0:c.joinedAt)})).sort((l,c)=>l.joinedAt!==c.joinedAt?l.joinedAt-c.joinedAt:l.id.localeCompare(c.id)),o=r.map(l=>{const c=l.id===H,u=ed(l.id)+(c?" (Du)":"");return`<li class="ts-member ${c?"me":""}" title="${an(l.id)}">${an(u)}</li>`}).join(""),a=document.createElement("div");a.className="ts-team",a.innerHTML=`
      <div>
        <div style="font-weight:600">${an(i.name||"(ohne Namen)")}</div>
        <div class="muted">${r.length} Mitglied(er)</div>
        <ul class="ts-member-list">
          ${o||""}
        </ul>
      </div>
      <div>
        ${se===s?'<button class="danger" onclick="leaveTeam()">Verlassen</button>':`<button onclick="joinTeam('${s}', this)">Beitreten</button>`}
      </div>
    `,n.appendChild(a)}}function ec(){const n=ce("teamStatusName"),e=ce("teamStatusCount"),t=se?Ze[se]:null;if(!t){n.textContent="Kein Team",e.textContent="-";return}n.textContent=t.name||"(ohne Namen)",e.textContent=`${Yr(t)} Mitglied(er)`}async function w0(){const n=ce("createTeamBtn"),e=ce("createTeamInput");try{n.disabled=!0;const t=g0(e.value);se&&await aa(se);const i=Zs(C(A,"teams")).key,r={};r[`teams/${i}`]={name:t,createdAt:es(),createdBy:H,members:{[H]:{joinedAt:es()}}},r[`deviceTeams/${H}`]=i,await mt(C(A),r),Bi(i),e.value=""}catch(t){alert((t==null?void 0:t.message)||"Team konnte nicht erstellt werden."),T(t)}finally{n.disabled=!1}}async function b0(n,e){if(!n)return;if(!Ze[n]){alert("Team existiert nicht (mehr).");return}e&&(e.disabled=!0);try{se&&se!==n&&await aa(se);const s={};s[`teams/${n}/members/${H}`]={joinedAt:es()},s[`deviceTeams/${H}`]=n,await mt(C(A),s),Bi(n)}catch(s){alert((s==null?void 0:s.message)||"Beitritt nicht möglich."),T(s)}finally{e&&(e.disabled=!1)}}async function aa(n=null){const e=n||se;if(!e)return;const t=C(A,`teams/${e}`);await Vo(t,s=>s&&(s.members&&s.members[H]&&(delete s.members[H],Object.keys(s.members).length===0)?null:s)),await Le(C(A,`deviceTeams/${H}`),null),Bi("")}function S0(){const n=document.getElementById("map");n.style.display=""}function td(n,e){if(S0(),x)x.setView([n,e],15),x.invalidateSize();else{x=L.map("map",{preferCanvas:!0}).setView([n,e],15);const t=L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap"}),s=L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",{attribution:"© CartoDB"}),i=L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{attribution:"Tiles © Esri"}),r=L.tileLayer("http://sgx.geodatenzentrum.de/wmts_topplus_open/tile/1.0.0/web/default/WEBMERCATOR/{z}/{y}/{x}.png",{maxZoom:18,attribution:"TopPlus Open © GeoBasis-DE / BKG"}),o=L.tileLayer("https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=sxLNDIsEdS0kt8fQKhSLB1Z7wVp3ZkV78F5HhvIElZWKDuahhvgWnCZkOceLTzYS",{attribution:"© Jawg"}),a={Standard:t,"Jawg Street":o,Reduziert:s,Satellit:i,Plan:r};t.addTo(x),L.control.layers(a).addTo(x),setTimeout(()=>x.invalidateSize(),0)}la()}function ai(){nt(C(A,"locations"),n=>{if(!n.exists()){x&&(x.remove(),x=null),document.getElementById("map").style.display="none",document.getElementById("locationFeed").innerHTML="",Pn=[];return}const e=n.val(),t=Object.values(e).sort((r,o)=>o.timestamp-r.timestamp),s=t.filter(r=>r.lat!=null&&r.lon!=null);if(s.length>0){const{lat:r,lon:o}=s[0];td(r,o),la(),li(),T0(),Pn.forEach(l=>x.removeLayer(l)),Pn=[],s.forEach(l=>{const c=L.marker([l.lat,l.lon]).addTo(x).bindPopup(`📍 ${new Date(l.timestamp).toLocaleTimeString()}`);Pn.push(c)});const a=s.map(l=>[l.lat,l.lon]);a.length>1&&L.polyline(a,{color:"blue",weight:3,opacity:.7,smoothFactor:1}).addTo(x),typeof Jl<"u"&&Jl.addTo(x),document.getElementById("map").style.display="block"}else x&&(x.remove(),x=null),document.getElementById("map").style.display="none";const i=document.getElementById("locationFeed");i.innerHTML="",t.forEach((r,o)=>{const a=r.title?r.title:"Automatischer Standort",l=r.timestamp?new Date(r.timestamp).toLocaleTimeString():"",c=r.photoURL?`<img src="${r.photoURL}" alt="Foto" class="zoomable-photo" style="max-width: 100%; max-height: 60vh; border: 1px solid #ccc; margin-top: 5px; cursor: zoom-in;" data-index="${o}">`:"",u=document.createElement("div");u.style.marginBottom="1em",u.innerHTML=`
        <strong class="location-title" data-lat="${r.lat}" data-lon="${r.lon}" style="cursor: pointer;">${a} (${l})</strong><br>
        ${r.description?`<em>📍 ${r.description}</em><br>`:""}
        ${c}
      `,i.appendChild(u)}),document.querySelectorAll(".location-title").forEach(r=>{r.addEventListener("click",()=>{const o=parseFloat(r.dataset.lat),a=parseFloat(r.dataset.lon);x&&!isNaN(o)&&!isNaN(a)&&x.setView([o,a],17)})}),document.querySelectorAll(".zoomable-photo").forEach(r=>{r.addEventListener("click",()=>{const o=document.createElement("div");o.style.position="fixed",o.style.top="0",o.style.left="0",o.style.width="100vw",o.style.height="100vh",o.style.backgroundColor="rgba(0,0,0,0.8)",o.style.display="flex",o.style.alignItems="center",o.style.justifyContent="center",o.style.zIndex="9999",o.innerHTML=`<img src="${r.src}" style="max-width: 90%; max-height: 90%; border: 2px solid white;">`,o.addEventListener("click",()=>{document.body.removeChild(o)}),document.body.appendChild(o)})})})}function E0(){if(!navigator.geolocation){alert("❌ Geolocation wird nicht unterstützt.");return}Un==null&&(Un=navigator.geolocation.watchPosition(n=>{const{latitude:e,longitude:t,accuracy:s}=n.coords;if(!x)return;const i={radius:7,color:"#007AFF",fillColor:"#ffffffff",fillOpacity:.8,opacity:1,weight:2},r={radius:s,color:"#007AFF",fillColor:"#007AFF",fillOpacity:.2,weight:1,opacity:.4};if(Re?(Re.setLatLng([e,t]),Re.getPopup()&&Re.getPopup().setContent(`<strong>Dein Standort</strong><br>Genauigkeit: ±${Math.round(s)} m`)):Re=L.circleMarker([e,t],i).bindPopup(`<strong>Dein Standort</strong><br>Genauigkeit: ±${Math.round(s)} m`).addTo(x),$e?($e.setLatLng([e,t]),$e.setRadius(s)):$e=L.circle([e,t],r).addTo(x),Hh){const o=Math.max(x.getZoom(),16);x.setView([e,t],o,{animate:!0})}},n=>{T("Geolocation-Fehler:",n),nd(),alert("⚠️ Tracking gestoppt: "+n.message)},{enableHighAccuracy:!0,timeout:15e3,maximumAge:5e3}))}function nd(){Un!=null&&(navigator.geolocation.clearWatch(Un),Un=null),x&&Re&&(x.removeLayer(Re),Re=null),x&&$e&&(x.removeLayer($e),$e=null)}function T0(){x&&(Re&&!x.hasLayer(Re)&&Re.addTo(x),$e&&!x.hasLayer($e)&&$e.addTo(x))}function I0(){const n=document.getElementById("refreshBtn");n&&n.addEventListener("click",async()=>{n.classList.add("updating");try{await k0({timeoutMs:2500})}catch(e){T("[Refresh] Fehler im Update-Flow:",e),window.location.reload()}})}async function k0({timeoutMs:n=2500}={}){if(!("serviceWorker"in navigator)){window.location.reload();return}const e=await navigator.serviceWorker.getRegistration();if(!e){T("[Refresh] Keine SW-Registration gefunden -> normaler Reload"),window.location.reload();return}T("[Refresh] Vor Update:",P0(e)),await e.update();let t=e.installing||e.waiting||null;t||(t=await C0(e,800)),t?(await A0(t),e.waiting&&(T("[Refresh] Sende SKIP_WAITING an Waiting-SW"),e.waiting.postMessage({type:"SKIP_WAITING"}))):T("[Refresh] Keine neue SW gefunden -> normaler Reload"),await R0(n),window.location.reload()}function C0(n,e){return new Promise(t=>{let s;const i=()=>{n.removeEventListener("updatefound",i),clearTimeout(s),t(n.installing||n.waiting||null)};n.addEventListener("updatefound",i),s=setTimeout(()=>{n.removeEventListener("updatefound",i),t(null)},e)})}function A0(n){return new Promise(e=>{if(n.state==="installed"||n.state==="activated")return e();n.addEventListener("statechange",()=>{(n.state==="installed"||n.state==="activated")&&e()})})}function R0(n){return new Promise(e=>{let t=!1;const s=()=>{t||(t=!0,navigator.serviceWorker.removeEventListener("controllerchange",i),e())},i=()=>{T("[Refresh] controllerchange empfangen"),s()};navigator.serviceWorker.addEventListener("controllerchange",i),setTimeout(()=>{T("[Refresh] controllerchange-Timeout, lade dennoch neu"),s()},n)})}function P0(n){const e=t=>t?t.state:"—";return{scope:n.scope,active:e(n.active),installing:e(n.installing),waiting:e(n.waiting),controlled:!!navigator.serviceWorker.controller}}function O0(){let n=0;const e=15e3,t=async()=>{const s=Date.now();if(!(s-n<e)){n=s;try{const i=await navigator.serviceWorker.getRegistration();if(!i)return;await i.update(),i.waiting&&i.waiting.postMessage({type:"SKIP_WAITING"})}catch{}}};document.addEventListener("visibilitychange",()=>{document.hidden||t()}),window.addEventListener("focus",t)}function N0(n,e,t){const s=Qb[n]||"#666";return t?{radius:10,color:s,fillColor:s,fillOpacity:.9,opacity:1,weight:3}:e===!1?{radius:6,color:s,fillColor:s,fillOpacity:.25,opacity:.4,weight:1}:{radius:9,color:s,fillColor:s,fillOpacity:.7,opacity:.9,weight:2}}function tc(n,e,t,s){const i=t.title||e,r=!!t.visited;return`
    <div style="min-width:180px">
      <strong>${i}</strong><br>
      <small>Farbe: ${n} (${s?"aktiv":"inaktiv"})</small><br>
      <small>Status: ${r?"✅ besucht":"🕒 offen"}</small>
    </div>
  `}function x0(n){const e=n.lat??n.latitude??null,t=n.lon??n.lng??n.longitude??null;return{lat:e,lon:t}}async function D0(){const n=C(A,"posten"),e=await ae(n);Vt=e.exists()?e.val():null,li(),nt(n,t=>{Vt=t.exists()?t.val():null,li()})}function la(){rn||(rn=L.layerGroup()),x&&!x.hasLayer(rn)&&rn.addTo(x)}function li(){if(!x||!Vt)return;la();const n=new Set;Object.entries(Vt).forEach(([e,t])=>{if(!t||typeof t!="object")return;const s=!!t.active,i=Object.fromEntries(Object.entries(t).filter(([r])=>r!=="active"));Object.entries(i).forEach(([r,o])=>{if(!o||typeof o!="object")return;const{lat:a,lon:l}=x0(o);if(a==null||l==null)return;const c=`${e}/${r}`;n.add(c);const u=N0(e,s,!!o.visited);if(en[c]){const h=en[c];h.setLatLng([a,l]),h.setStyle(u),h.getPopup()&&h.getPopup().setContent(tc(e,r,o,s))}else{const h=L.circleMarker([a,l],u).bindPopup(tc(e,r,o,s)).on("click",()=>{});h.addTo(rn),en[c]=h}})}),Object.keys(en).forEach(e=>{n.has(e)||(rn.removeLayer(en[e]),delete en[e])})}async function L0(n=!0){const e=C(A,"posten"),t=await ae(e);if(!t.exists())return;const s=t.val(),i={};Object.entries(s).forEach(([r,o])=>{!o||typeof o!="object"||(i[`posten/${r}/active`]=n,Object.entries(o).forEach(([a,l])=>{a==="active"||!l||typeof l!="object"||(i[`posten/${r}/${a}/visited`]=!1)}))}),await mt(C(A),i)}const ks=n=>n*Math.PI/180;function M0(n,e,t,s){const r=ks(t-n),o=ks(s-e),a=Math.sin(r/2)**2+Math.cos(ks(n))*Math.cos(ks(t))*Math.sin(o/2)**2;return 2*6371e3*Math.asin(Math.sqrt(a))}function sd(n={enableHighAccuracy:!0,timeout:8e3,maximumAge:0}){return new Promise((e,t)=>{if(!navigator.geolocation)return t(new Error("Geolocation nicht unterstützt"));navigator.geolocation.getCurrentPosition(e,t,n)})}function id({excludeVisited:n=!0}={}){const e=[];for(const[t,s]of Object.entries(Vt))if(!(!s||s.active!==!0))for(const[i,r]of Object.entries(s.posts||{}))!r||typeof r!="object"||n&&r.visited===!0||e.push({color:t,postId:i,...r});return e}function Os(n){const e=document.getElementById("postenSuggestions");if(!n||n.length===0){e.style.display="none",e.innerHTML="";return}e.innerHTML=n.map(t=>{const s=t.distance!=null?` - ${(t.distance/1).toFixed(0)} m`:"";return`<div class="item" data-color="${t.color}" data-postid="${t.postId}">
              ${t.title||"(ohne Titel)"}
              <span class="tag">${t.color}</span>${s}
            </div>`}).join(""),e.style.display="block",e.querySelectorAll(".item").forEach(t=>{t.addEventListener("click",()=>{var c,u;const s=t.getAttribute("data-color"),i=t.getAttribute("data-postid"),r=(u=(c=Vt[s])==null?void 0:c.posts)==null?void 0:u[i];if(!r){T("Ausgewählter Posten nicht im Cache gefunden:",{color:s,postId:i}),document.getElementById("status").innerText="Dieser Posten ist nicht mehr verfügbar.",e.style.display="none";return}const o={color:s,postId:i,title:r.title||i,lat:r.lat??null,lon:r.lon??null};ud(o);const a=document.getElementById("postenSearch");a&&(a.value=`${o.title} [${s}]`),e.style.display="none";const l=document.getElementById("status");l&&(l.innerText=`✅ Posten ausgewählt: ${o.title} (${s})`)})})}function rd(n){const e=(n||"").trim().toLowerCase(),t=id();return e?t.filter(s=>{const i=String(s.postId).toLowerCase(),r=String(s.title||"").toLowerCase(),o=String(s.color).toLowerCase();return i.includes(e)||r.includes(e)||o.includes(e)}).slice(0,25):[]}async function $0(n=5){try{const e=await sd(),{latitude:t,longitude:s,accuracy:i}=e.coords;i>100&&(document.getElementById("status").innerText=`⚠️ Standort ungenau (±${Math.round(i)} m). Ergebnisse evtl. ungenau.`);const r=id().map(o=>({...o,distance:o.lat!=null&&o.lon!=null?M0(t,s,o.lat,o.lon):Number.POSITIVE_INFINITY}));return r.sort((o,a)=>o.distance-a.distance),r.slice(0,n)}catch{return document.getElementById("status").innerText="📍 Konnte Standort nicht bestimmen. Du kannst trotzdem per Suche auswählen.",[]}}async function j0(){const n=C(A,"posten");nt(n,e=>{const t=e.val()||{},s={};for(const[r,o]of Object.entries(t)){if(!o||typeof o!="object")continue;const{active:a,...l}=o,c={};for(const[u,h]of Object.entries(l))h&&typeof h=="object"&&(c[u]=h);s[r]={active:!!a,posts:c}}Vt=s;const i=document.getElementById("postenSearch").value;i&&Os(rd(i))})}function F0(){const n=document.getElementById("postenSearch"),e=document.getElementById("nearbyBtn");let t;n.addEventListener("input",()=>{clearTimeout(t),t=setTimeout(()=>{const s=rd(n.value);Os(s)},150)}),e.addEventListener("click",async()=>{const s=await $0(20);if(s.length===0){Os(s),document.getElementById("status").innerText="Keine nahegelegenen Posten gefunden (oder Standort unbekannt).";return}Os(s)}),document.addEventListener("click",s=>{const i=document.getElementById("postenSuggestions");i.contains(s.target)||n.contains(s.target)||e.contains(s.target)||(i.style.display="none")})}const is=document.getElementById("notifHeader"),Wn=document.getElementById("notifHeaderToggle"),gr=document.getElementById("notifSummary"),B0=document.getElementById("notifDetails"),nc=document.getElementById("notifStatusDot"),sc=document.getElementById("notifTimeShort"),ic=document.getElementById("notifTitle"),rc=document.getElementById("notifBody"),oc=document.getElementById("notifSender"),ac=document.getElementById("notifTime"),lc=document.getElementById("notifId"),mr=document.getElementById("recipientList"),Cs=document.getElementById("notifCount"),An=document.getElementById("toggleNotifHeader");let Pt=null;function _r(n){is.style.display=n?"block":"none",!n&&typeof Pt=="function"&&(Pt(),Pt=null)}function ca(n){is.classList.toggle("collapsed",n),is.classList.toggle("expanded",!n),B0.hidden=n,Wn.setAttribute("aria-expanded",String(!n)),Wn.textContent=n?"▾":"▴"}Wn==null||Wn.addEventListener("click",n=>{n.stopPropagation();const e=is.classList.contains("collapsed");ca(!e)});gr==null||gr.addEventListener("click",()=>{const n=is.classList.contains("collapsed");ca(!n)});function U0(n){return new Date(n).toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit"})}function Qr(n){if(!n){ic.textContent="-",rc.textContent="-",oc.textContent="-",ac.textContent="-",sc.textContent="[--:--]",lc.textContent="-",mr.innerHTML="",nc.style.background="#bbb",Cs&&(Cs.textContent="-");return}const e=typeof n.timestamp=="number"?n.timestamp:Date.now(),t=U0(e);ic.textContent=n.title||"Ohne Titel",rc.textContent=n.body||"",oc.textContent=n.sender||"Unbekannt",ac.textContent=new Date(e).toLocaleString("de-DE"),sc.textContent=`[${t}]`,lc.textContent=n.id??"-";const s=n.recipients||{},i=Object.keys(s),r=i.filter(a=>s[a]===!0).length,o=i.length;nc.style.background=o>0&&r===o?"#4caf50":"#ff9800",Cs&&(Cs.textContent=`${r}/${o} bestätigt`),mr.innerHTML="",i.sort((a,l)=>a.localeCompare(l)).forEach(a=>{const l=s[a]===!0,c=document.createElement("div");c.className=`recipient-chip ${l?"ok":"wait"}`,c.innerHTML=`<span class="dot"></span><span>${a}</span><span>${l?"✅":"⏳"}</span>`,mr.appendChild(c)})}function cc(){typeof Pt=="function"&&(Pt(),Pt=null);const n=__(C(A,"notifications"),m_("timestamp"),p_(1)),e=nt(n,t=>{const s=t.val();if(!s){Qr(null);return}const[i,r]=Object.entries(s)[0];Qr({id:i,...r})});Pt=()=>e()}function W0(){const n=localStorage.getItem(fr)==="1";_r(n),n&&cc(),An&&(An.checked=n),ca(!0),An==null||An.addEventListener("change",e=>{e.target.checked?(localStorage.setItem(fr,"1"),_r(!0),cc()):(localStorage.removeItem(fr),_r(!1),Qr(null))})}async function V0(){try{let n=Ze;(!n||Object.keys(n).length===0)&&(n=(await ae(C(A,"teams"))).val()||{});const e={};for(const[i,r]of Object.entries(n)){if(i===se)continue;(r!=null&&r.members?Object.keys(r.members).length:0)>0&&(e[i]=!0)}if(Object.keys(e).length===0){T==null||T("[triggerAgentLocationRequest] Abbruch: keine adressierbaren Teams gefunden."),alert("Keine Teams gefunden, die angefragt werden können.");return}const t=String(Date.now()),s={id:t,createdAt:es(),createdBy:H,teamsAtRequest:e,responses:{}};return await Le(C(A,"agentLocationRequest"),s),Dt("Mister X hat deinen Standort angefragt","Öffne die App, um deinen Standort freizugeben.",["agent","settings","start"]),T==null||T("[triggerAgentLocationRequest] Anfrage ausgelöst",{reqId:t,totalTeams:Object.keys(e).length}),t}catch(n){throw T==null||T("[triggerAgentLocationRequest] Anfrage fehlgeschlagen",n),alert("Konnte die Anfrage nicht auslösen."),n}}async function q0(n){var a;if(!se){alert("Du bist in keinem Team. Standortfreigabe abgebrochen.");return}const e=C(A,`agentLocationRequest/responses/${se}`);if((await ae(e)).exists()){try{localStorage.setItem(Gl,n.id)}catch{}return}const s=await new Promise((l,c)=>{if(!navigator.geolocation)return c(new Error("Geolocation nicht verfügbar"));navigator.geolocation.getCurrentPosition(l,c,{enableHighAccuracy:!0,timeout:15e3,maximumAge:0})}),i=s.coords.latitude,r=s.coords.longitude,o=((a=Ze==null?void 0:Ze[se])==null?void 0:a.name)||"Team";alert("Dein Standort wird jetzt freigegeben"),await Vo(e,l=>l||(T("Standort für AgentLocation ausgesendet"),{teamId:se,teamName:o,lat:i,lon:r,deviceId:H,timestamp:es()}));try{localStorage.setItem(Gl,n.id)}catch{}}function H0(){pe(C(A,"agentLocationRequest")),K0(),Xr()}function Xr(){Array.isArray(On)&&On.length&&window.map&&On.forEach(n=>x.removeLayer(n)),On=[]}function z0(){const n=C(A,"agentLocationRequest");nt(n,t=>{const s=t.exists()?t.val():null;Kh=s,od(s),s&&s.createdBy!==H&&se&&G0(s)})}function K0(){const n=document.getElementById("agentReqStatus");n&&(n.style.display="none")}async function G0(n){try{await q0(n)}catch(e){T("Standortfreigabe fehlgeschlagen",e)}}function od(n=Kh){const e=document.getElementById("agentReqStatus"),t=document.getElementById("agentReqProgress");if(!e||!t)return;if(!n){e.style.display="none",Xr();return}const s=typeof n.createdAt=="number"?new Date(n.createdAt).toLocaleTimeString():"Unbekannt",i=n.responses||{},r=Object.values(i),o=n.teamsAtRequest||{},a=Object.keys(o).length||r.length,l=r.length;if(t.textContent=`Standort von ${l}/${a} Teams – ${s}`,e.style.display="block",Xr(),!(!Rs||r.length===0)){J0(r);for(const c of r){if(c.lat==null||c.lon==null)continue;const u=L.divIcon({className:`square-marker ${Y0(c.teamId)}`,iconSize:[14,14]}),h=L.marker([c.lat,c.lon],{icon:u}).addTo(x);h.bindPopup(`<strong>${an(c.teamName||"Team")}</strong>`),On.push(h)}}}function J0(n){if(!window.map){const e=n.find(t=>t.lat!=null&&t.lon!=null);e&&td(e.lat,e.lon)}}function Y0(n){const e=["","orange","green","purple","blue","red","yellow","cyan","pink","lime","teal","brown"],t=Math.abs(Q0(String(n)))%e.length;return e[t]}function Q0(n){let e=0;for(let t=0;t<n.length;t++)e=(e<<5)-e+n.charCodeAt(t),e|=0;return e}function X0(){ae(C(A,"roles")).then(n=>{const e=n.val();for(const t in e)e[t].role==="misterx"&&Le(C(A,"roles/"+t),{role:"start",timestamp:Date.now()});alert("Alle Mister X Rollen wurden zurückgesetzt.")})}async function Z0(){const n=await ae(C(A,"settings/max_Team_X")),e=n.exists()?n.val():1,s=(await ae(C(A,"roles"))).val();let i=0;for(const r in s)s[r].role==="misterx"&&i++;return i<e}async function ad(n){if(n!==localStorage.getItem("activeView")){if(n==="misterx"&&!await Z0()){alert("Es ist bereits ein Gerät als Mister X angemeldet!"),Zr();return}if(n==="settings"&&prompt("Passwort eingeben!")!=="1001"){Zr();return}}document.getElementById("startView").style.display="none",document.getElementById("startView2").style.display="none",document.querySelectorAll(".view").forEach(t=>t.style.display="none"),n==="misterx"?(document.getElementById("misterxView").style.display="block",ai(),j0(),F0()):n==="agent"?(document.getElementById("agentView").style.display="block",ai()):n==="settings"&&(document.getElementById("settingsView").style.display="block",aS()),localStorage.setItem("activeView",n),mt(C(A,"roles/"+H),{role:n,timestamp:Date.now()});const e=n;await Ue.from("fcm_tokens").update({role:e}).eq("device_name",H),ae(C(A,"timer")).then(t=>{const s=t.val();if(s){const{startTime:i,duration:r,durationInput:o,durationInput2:a}=s;r?(ld(i,r),pn(!0)):pn(!1)}})}async function Zr(){document.querySelectorAll(".view").forEach(e=>e.style.display="none"),document.getElementById("startView").style.display="block",document.getElementById("startView2").style.display="block",clearInterval(ut),localStorage.setItem("activeView","start"),mt(C(A,"roles/"+H),{role:"start",timestamp:Date.now()}),await Ue.from("fcm_tokens").update({role:"start"}).eq("device_name",H)}async function Vn(n){await pe(C(A,"timer/duration")),await pe(C(A,"timer/startTime")),await pe(C(A,"timerMessage")),typeof ut<"u"&&clearInterval(ut);const t=(await ae(C(A,"timer"))).val();let s=25*60;typeof(t==null?void 0:t.durationInput)=="number"&&t.durationInput>0&&(s=t.durationInput,(isNaN(s)||s<1)&&(s=60)),typeof n=="number"&&n>0&&(s=n);const i=Date.now(),r=i+s*1e3,o={title:"Deine Zeit läuft gleich ab",body:"Bitte öffne deine App!"};await Le(C(A,"timer"),{startTime:i,duration:s,durationInput:t==null?void 0:t.durationInput,durationInput2:(t==null?void 0:t.durationInput2)||0});try{await Ue.rpc("cancel_and_unschedule")}catch(h){T("[Timer] cancel_and_unschedule fehlgeschlagen (ignoriere und fahre fort):",h)}const{tokens:a,deviceNames:l}=await a0("misterx"),c=s-60,u=(Ps==null?void 0:Ps())??void 0;await Ue.functions.invoke("arm-timer-cron",{body:{title:o.title,body:o.body,dueInSec:c,messageId:u,link:"/Mister-X/",recipientDeviceNames:l,tokens:a,rtdbBase:ss}}),T(`🕒 Timer gestartet: ${s}s, fällt um ${new Date(r).toLocaleTimeString()}.`)}function eS(){Kl||(Kl=!0,nt(C(A,"timer"),n=>{const e=n.val()||{},{startTime:t=null,duration:s=null,durationInput:i=null,durationInput2:r=null}=e;if(t===null||s===null){clearInterval(ut),pn(!1);const o=document.getElementById("timer"),a=document.getElementById("agentTimer"),l=document.getElementById("settingsTimer");o&&(o.innerText="⏳ Zeit bis zum nächsten Posten: --:--"),a&&(a.innerText="⏳ Mister X Timer: --:--"),l&&(l.innerText="⏳ Aktueller Timer: --:--");return}ld(t,s),pn(!0)}))}function ld(n,e){clearInterval(ut),ut=setInterval(()=>{const t=Date.now(),s=Math.floor((t-n)/1e3),i=e-s;let r;if(i<0)r="abgelaufen";else{const u=Math.floor(i/60),h=i%60;r=`${String(u).padStart(2,"0")}:${String(h).padStart(2,"0")}`}const o=document.getElementById("timer"),a=document.getElementById("agentTimer"),l=document.getElementById("settingsTimer");function c(u){u&&(i<=300&&i>1?(u.style.color="red",u.style.animation="blinker 1s linear infinite"):(u.style.color="",u.style.animation=""))}l&&(l.innerText=`⏳ Aktueller Timer: ${r}`,c(l)),o&&(o.innerText=`⏳ Zeit bis zum nächsten Posten: ${r}`,c(o)),a&&(a.innerText=`⏳ Mister X Timer: ${r}`,c(a)),i<=0&&([o,a,l].forEach(u=>{u&&(u.style.color="",u.style.animation="")}),localStorage.getItem("activeView")==="misterx"&&ae(C(A,"timer")).then(u=>{const h=u.val(),d=h==null?void 0:h.durationInput,_=h==null?void 0:h.durationInput2;if(e===d&&_>0)alert("Zeit abgelaufen, dein Standort wird einmalig geteilt"),nS(),Vn(_);else if(e===_||e===d&&_===0){alert("Zeit abgelaufen, jetzt musst du deinen Live-Standort in der WhatsApp-Gruppe teilen (der Timer ist bis zum nächsten Posten deaktiviert)"),pe(C(A,"timer/duration")),pe(C(A,"timer/startTime")),pe(C(A,"timerMessage")),clearInterval(ut),pn(!1);const w=document.getElementById("timer"),E=document.getElementById("agentTimer"),S=document.getElementById("settingsTimer");w&&(w.innerText="⏳ Zeit bis zum nächsten Posten: --:--"),E&&(E.innerText="⏳ Mister X Timer: --:--"),S&&(S.innerText="⏳ Aktueller Timer: --:--"),Dt("Zeit abgelaufen!","Mister X muss sich per Live-Standort zeigen","all")}}))},1e3)}function tS(){ae(C(A,"timer")).then(n=>{if(!n.exists())return;const e=n.val(),t=document.getElementById("timerDurationInput"),s=document.getElementById("timerDurationInput2");!t||!s||(e&&typeof e.durationInput=="number"?t.value=Math.floor(e.durationInput/60):t.value=25,e&&typeof e.durationInput2=="number"?s.value=Math.floor(e.durationInput2/60):s.value=5)})}const cd=document.createElement("style");cd.innerHTML=`
@keyframes blinker {
  50% { opacity: 0; }
}
`;document.head.appendChild(cd);function nS(){ae(C(A,"timer")),navigator.geolocation?navigator.geolocation.getCurrentPosition(n=>{const e=n.coords.latitude,t=n.coords.longitude,s=n.coords.accuracy,i=Date.now();if(s>100){document.getElementById("status").innerText="⚠️ Standort ungenau (±"+Math.round(s)+" m). Bitte Standortbeschreibung manuell eingeben.";let r=prompt("Bitte den Standort beschreiben (bzw. wenn U-Bahn, dann gemäß Regelwerk angeben)")||"wurde nicht angegeben!";Zs(C(A,"locations"),{description:r.trim(),timestamp:i});return}Zs(C(A,"locations"),{title:"Automatischer Standort",lat:e,lon:t,timestamp:i}),Dt("Mister X hat sich gezeigt!","Automatische Standort-Übermittlung.",["agent","settings","start"]),ai()},Ns):document.getElementById("status").innerText="Geolocation wird nicht unterstützt."}function Ns(n){let e="❌ Fehler beim Abrufen des Standorts.";switch(n.code){case n.PERMISSION_DENIED:e+=" Zugriff verweigert.";break;case n.POSITION_UNAVAILABLE:e+=" Standortinformationen nicht verfügbar.";break;case n.TIMEOUT:e+=" Zeitüberschreitung bei der Standortabfrage.";break}e+=" Bitte erneut versuchen oder Standortbeschreibung manuell eingeben.",document.getElementById("status").innerText=e}function pn(n){const e=document.getElementById("startTimerButton");e&&(e.disabled=n,e.style.opacity=n?"0.5":"1",e.style.pointerEvents=n?"none":"auto",e.style.cursor=n?"default":"pointer")}function sS(){localStorage.getItem("nachrichtAktiv")?(document.getElementById("permissionButton").style.display="none",document.getElementById("permissionButton2").style.display="block"):(document.getElementById("permissionButton").style.display="block",document.getElementById("permissionButton2").style.display="none")}async function iS(){if(confirm("Möchtest du wirklich alle gespeicherten Standorte löschen?"))try{await pe(C(A,"locations")),alert("Alle Standorte wurden gelöscht."),x&&(x.remove(),x=null),document.getElementById("map").style.display="none",document.getElementById("locationFeed").innerHTML="",Pn=[];const n=document.getElementById("status");n&&(n.innerText=""),await L0(!0),li()}catch(n){T(n),alert("Fehler beim Löschen der Standorte.")}}async function rS(){await pe(C(A,"timer/duration")),await pe(C(A,"timer/startTime")),await pe(C(A,"timerMessage")),clearInterval(ut),pn(!1);try{await Ue.rpc("cancel_and_unschedule")}catch(s){T("[Timer] cancel_and_unschedule fehlgeschlagen (ignoriere und fahre fort):",s)}const n=document.getElementById("timer"),e=document.getElementById("agentTimer"),t=document.getElementById("settingsTimer");n&&(n.innerText="⏳ Zeit bis zum nächsten Posten: --:--"),e&&(e.innerText="⏳ Mister X Timer: --:--"),t&&(t.innerText="⏳ Aktueller Timer: --:--"),Dt("Timer zurückgesetzt","Der Timer wurde zurückgesetzt!","all")}function oS(){const n=document.getElementById("max_Team_X").value;pe(C(A,"settings/max_Team_X")).then(()=>Le(C(A,"settings/max_Team_X"),Number(n))).then(()=>{T("max_Team_X erfolgreich gespeichert:",n)}).catch(e=>{T("Fehler beim Speichern von max_Team_X:",e)})}function aS(){const n=document.getElementById("max_Team_X");ae(C(A,"settings/max_Team_X")).then(e=>{e.exists()?(n.value=e.val(),T("max_Team_X geladen:",e.val())):T("Kein max_Team_X-Wert gefunden.")}).catch(e=>{T("Fehler beim Laden von max_Team_X:",e)})}function lS(){const e=document.getElementById("timerDurationInput").value*60;pe(C(A,"timer/durationInput")).then(()=>Le(C(A,"timer/durationInput"),Number(e))).then(()=>{T("Duration_input:",e)}).catch(t=>{T("Fehler beim Speichern von DurationInput:",t)})}function cS(){const e=document.getElementById("timerDurationInput2").value*60;pe(C(A,"timer/durationInput2")).then(()=>Le(C(A,"timer/durationInput2"),Number(e))).then(()=>{T("Duration_input2:",e)}).catch(t=>{T("Fehler beim Speichern von DurationInput2:",t)})}async function uS(){if(!("serviceWorker"in navigator))throw new Error("Service Worker wird vom Browser nicht unterstützt.");const n="/Mister-X/",e=await navigator.serviceWorker.getRegistration(n);if(e)return e;const t=`${n}firebase-messaging-sw.js`;return navigator.serviceWorker.register(t,{scope:n,type:"module"})}function hS(){var n,e;return((n=window.matchMedia)==null?void 0:n.call(window,"(display-mode: standalone)").matches)||((e=window.navigator)==null?void 0:e.standalone)===!0}async function dS(){const n={notificationsAPI:"Notification"in window,serviceWorker:"serviceWorker"in navigator,pushManager:"PushManager"in window,standalone:hS(),fcm:!1};try{n.fcm=await Oi()}catch{n.fcm=!1}return n}async function uc(n){const e=Jr();if(!n||!e)return;await fetch(`https://mister-x-d6b59-default-rtdb.europe-west1.firebasedatabase.app/notifications/${n}/recipients/${e}.json`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(!0)})}function hc(n){try{const e=n&&n.messageId;if(e){if(ri.has(e))return;ri.add(e)}if(e&&typeof uc=="function"&&uc(e).catch(t=>T("Markieren fehlgeschlagen:",t)),document.visibilityState==="visible"){const t=n&&n.title?n.title:"Nachricht",s=n&&n.body?n.body:"";alert(`${t}
${s}`)}}catch(e){T("handleInAppMessage error:",e)}}setInterval(()=>{ri.size>5e3&&ri.clear()},60*1e3);async function fS(){var n,e,t,s,i,r;i0();try{const o=await dS();if(o&&o.fcm){je||(je=Ni(wn)),window.__swMsgListenerAdded||(navigator.serviceWorker.addEventListener("message",_=>{if(_&&_.data&&_.data.type==="PUSH"){const w=_.data.payload||{};hc(w),T("[Page] SW-Message empfangen",w)}}),window.__swMsgListenerAdded=!0);let d=null;Pv(je,_=>{const w=_&&_.data?_.data:{};w.messageId&&w.messageId===d||(d=w.messageId||null,hc(w),T("[Page] FCM onMessage empfangen",_))})}navigator.serviceWorker.addEventListener("message",d=>{var _;((_=d==null?void 0:d.data)==null?void 0:_.type)==="PUSH_SUBSCRIPTION_CHANGED"&&pr({force:!0}).catch(T)}),(async()=>await t0("pushSubscriptionChangedAt")&&(await pr({force:!0}).catch(T),await n0("pushSubscriptionChangedAt")))();const a=document.getElementById("enablePush"),l=document.getElementById("pushHint");a&&(!o.fcm&&/iPhone|iPad|iPod/i.test(navigator.userAgent)&&!o.standalone?(a.style.display="none",l&&(l.textContent="Installiere die App zum Home-Bildschirm, um Benachrichtigungen zu aktivieren.",l.style.display="block")):!o.fcm||!o.notificationsAPI||!o.serviceWorker||!o.pushManager?(a.style.display="none",l&&(l.textContent="Benachrichtigungen werden von diesem Browser/Modus nicht unterstützt.",l.style.display="block")):Notification.permission==="granted"?(a.textContent="Benachrichtigungen sind aktiv",a.disabled=!0):(a.addEventListener("click",enablePush,{once:!0}),a.style.display="inline-flex"));const c=localStorage.getItem("activeView")||"start";c!=="start"&&ad(c),await D0(),ai(),eS(),tS(),sS(),pr(),W0(),I0(),O0(),oa(),z0();const u=document.getElementById("toggleAgentLocations");u&&(u.checked=Rs,u.addEventListener("change",()=>{Rs=!!u.checked;try{localStorage.setItem(Gh,Rs?"1":"0")}catch{}od()})),(n=document.getElementById("toggleTracking"))==null||n.addEventListener("change",d=>{d.target.checked?E0():nd()}),(e=document.getElementById("toggleFollow"))==null||e.addEventListener("change",d=>{Hh=d.target.checked});const h=document.getElementById("photoInput");h&&h.addEventListener("change",function(){var _;if((_=this.files)==null?void 0:_[0]){window.fotoHochgeladen=!0;const w=document.getElementById("status");w&&(w.innerText="📸 Foto ausgewählt!")}})}catch(o){alert("Fehler in startScript: "+((o==null?void 0:o.message)??String(o))),(s=(t=document.getElementById("startView"))==null?void 0:t.style)==null||s.setProperty("display","block"),(r=(i=document.getElementById("startView2"))==null?void 0:i.style)==null||r.setProperty("display","block")}}function T(...n){console.log(...n);const e=document.getElementById("settingsLog");if(!e)return;const t=new Date().toLocaleTimeString(),s=document.createElement("div");s.innerHTML=`<strong>[${t}]</strong>`,n.forEach(i=>{if(typeof i=="object"){const r=document.createElement("details"),o=document.createElement("summary");o.textContent="Objekt anzeigen",r.appendChild(o);const a=document.createElement("pre");a.textContent=JSON.stringify(i,null,2),r.appendChild(a),s.appendChild(r)}else s.innerHTML+=` ${i}`}),e.appendChild(s),e.scrollTop=e.scrollHeight}window.switchView=ad;window.requestPermission=Zb;window.sendLocationWithPhoto=c0;window.startTimer=Vn;window.goBack=Zr;window.save_timer_duration=lS;window.save_timer_duration2=cS;window.save_max_mister_x=oS;window.resetTimer=rS;window.deleteAllLocations=iS;window.resetAllMisterXRollen=X0;window.removeNotificationSetup=r0;window.mxState=window.mxState||{};window.mxState.selectedPost=null;window.openTeamSettings=y0;window.closeTeamSettings=v0;window.leaveTeam=aa;window.createTeam=w0;window.joinTeam=b0;window.triggerAgentLocationRequest=V0;window.resetAgentLocations=H0;function ud(n){window.mxState.selectedPost=n}function pS(){return window.mxState.selectedPost}document.addEventListener("DOMContentLoaded",fS);
