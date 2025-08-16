(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();const Dh=()=>{};var Ho={};/**
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
 */const jl={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
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
 */const T=function(n,e){if(!n)throw ln(e)},ln=function(n){return new Error("Firebase Database ("+jl.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
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
 */const Bl=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let i=n.charCodeAt(s);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&s+1<n.length&&(n.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++s)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Lh=function(n){const e=[];let t=0,s=0;for(;t<n.length;){const i=n[t++];if(i<128)e[s++]=String.fromCharCode(i);else if(i>191&&i<224){const r=n[t++];e[s++]=String.fromCharCode((i&31)<<6|r&63)}else if(i>239&&i<365){const r=n[t++],o=n[t++],a=n[t++],l=((i&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(l>>10)),e[s++]=String.fromCharCode(56320+(l&1023))}else{const r=n[t++],o=n[t++];e[s++]=String.fromCharCode((i&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Fr={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let i=0;i<n.length;i+=3){const r=n[i],o=i+1<n.length,a=o?n[i+1]:0,l=i+2<n.length,c=l?n[i+2]:0,u=r>>2,h=(r&3)<<4|a>>4;let d=(a&15)<<2|c>>6,v=c&63;l||(v=64,o||(d=64)),s.push(t[u],t[h],t[d],t[v])}return s.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Bl(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Lh(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<n.length;){const r=t[n.charAt(i++)],a=i<n.length?t[n.charAt(i)]:0;++i;const c=i<n.length?t[n.charAt(i)]:64;++i;const h=i<n.length?t[n.charAt(i)]:64;if(++i,r==null||a==null||c==null||h==null)throw new Mh;const d=r<<2|a>>4;if(s.push(d),c!==64){const v=a<<4&240|c>>2;if(s.push(v),h!==64){const b=c<<6&192|h;s.push(b)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Mh extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Ul=function(n){const e=Bl(n);return Fr.encodeByteArray(e,!0)},Ss=function(n){return Ul(n).replace(/\./g,"")},sr=function(n){try{return Fr.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function $h(n){return Wl(void 0,n)}function Wl(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!Fh(t)||(n[t]=Wl(n[t],e[t]));return n}function Fh(n){return n!=="__proto__"}/**
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
 */function jh(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Bh=()=>jh().__FIREBASE_DEFAULTS__,Uh=()=>{if(typeof process>"u"||typeof Ho>"u")return;const n=Ho.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Wh=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&sr(n[1]);return e&&JSON.parse(e)},Vl=()=>{try{return Dh()||Bh()||Uh()||Wh()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Vh=n=>{var e,t;return(t=(e=Vl())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},Hl=n=>{const e=Vh(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),s]:[e.substring(0,t),s]},ql=()=>{var n;return(n=Vl())==null?void 0:n.config};/**
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
 */let cn=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,s)=>{t?this.reject(t):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,s))}}};/**
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
 */function Ys(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function zl(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function Kl(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},s=e||"demo-project",i=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${s}`,aud:s,iat:i,exp:i+3600,auth_time:i,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Ss(JSON.stringify(t)),Ss(JSON.stringify(o)),""].join(".")}const In={};function Hh(){const n={prod:[],emulator:[]};for(const e of Object.keys(In))In[e]?n.emulator.push(e):n.prod.push(e);return n}function qh(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let qo=!1;function Gl(n,e){if(typeof window>"u"||typeof document>"u"||!Ys(window.location.host)||In[n]===e||In[n]||qo)return;In[n]=e;function t(d){return`__firebase__banner__${d}`}const s="__firebase__banner",r=Hh().prod.length>0;function o(){const d=document.getElementById(s);d&&d.remove()}function a(d){d.style.display="flex",d.style.background="#7faaf0",d.style.position="fixed",d.style.bottom="5px",d.style.left="5px",d.style.padding=".5em",d.style.borderRadius="5px",d.style.alignItems="center"}function l(d,v){d.setAttribute("width","24"),d.setAttribute("id",v),d.setAttribute("height","24"),d.setAttribute("viewBox","0 0 24 24"),d.setAttribute("fill","none"),d.style.marginLeft="-6px"}function c(){const d=document.createElement("span");return d.style.cursor="pointer",d.style.marginLeft="16px",d.style.fontSize="24px",d.innerHTML=" &times;",d.onclick=()=>{qo=!0,o()},d}function u(d,v){d.setAttribute("id",v),d.innerText="Learn more",d.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",d.setAttribute("target","__blank"),d.style.paddingLeft="5px",d.style.textDecoration="underline"}function h(){const d=qh(s),v=t("text"),b=document.getElementById(v)||document.createElement("span"),S=t("learnmore"),E=document.getElementById(S)||document.createElement("a"),C=t("preprendIcon"),U=document.getElementById(C)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(d.created){const I=d.element;a(I),u(E,S);const R=c();l(U,C),I.append(U,b,E,R),document.body.appendChild(I)}r?(b.innerText="Preview backend disconnected.",U.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(U.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,b.innerText="Preview backend running in this workspace."),b.setAttribute("id",v)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",h):h()}/**
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
 */function zh(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Jl(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(zh())}function Kh(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Gh(){return jl.NODE_ADMIN===!0}function Yl(){try{return typeof indexedDB=="object"}catch{return!1}}function Ql(){return new Promise((n,e)=>{try{let t=!0;const s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(s),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var r;e(((r=i.error)==null?void 0:r.message)||"")}}catch(t){e(t)}})}function Jh(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
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
 */const Yh="FirebaseError";class ht extends Error{constructor(e,t,s){super(t),this.code=e,this.customData=s,this.name=Yh,Object.setPrototypeOf(this,ht.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Qs.prototype.create)}}class Qs{constructor(e,t,s){this.service=e,this.serviceName=t,this.errors=s}create(e,...t){const s=t[0]||{},i=`${this.service}/${e}`,r=this.errors[e],o=r?Qh(r,s):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new ht(i,a,s)}}function Qh(n,e){return n.replace(Xh,(t,s)=>{const i=e[s];return i!=null?String(i):`<${s}?>`})}const Xh=/\{\$([^}]+)}/g;/**
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
 */function Fn(n){return JSON.parse(n)}function te(n){return JSON.stringify(n)}/**
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
 */const Xl=function(n){let e={},t={},s={},i="";try{const r=n.split(".");e=Fn(sr(r[0])||""),t=Fn(sr(r[1])||""),i=r[2],s=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:s,signature:i}},Zh=function(n){const e=Xl(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},ed=function(n){const e=Xl(n).claims;return typeof e=="object"&&e.admin===!0};/**
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
 */function Oe(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function At(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function zo(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Ts(n,e,t){const s={};for(const i in n)Object.prototype.hasOwnProperty.call(n,i)&&(s[i]=e.call(t,n[i],i,n));return s}function Is(n,e){if(n===e)return!0;const t=Object.keys(n),s=Object.keys(e);for(const i of t){if(!s.includes(i))return!1;const r=n[i],o=e[i];if(Ko(r)&&Ko(o)){if(!Is(r,o))return!1}else if(r!==o)return!1}for(const i of s)if(!t.includes(i))return!1;return!0}function Ko(n){return n!==null&&typeof n=="object"}/**
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
 */function td(n){const e=[];for(const[t,s]of Object.entries(n))Array.isArray(s)?s.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}/**
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
 */class nd{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const s=this.W_;if(typeof e=="string")for(let h=0;h<16;h++)s[h]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let h=0;h<16;h++)s[h]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let h=16;h<80;h++){const d=s[h-3]^s[h-8]^s[h-14]^s[h-16];s[h]=(d<<1|d>>>31)&4294967295}let i=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,u;for(let h=0;h<80;h++){h<40?h<20?(c=a^r&(o^a),u=1518500249):(c=r^o^a,u=1859775393):h<60?(c=r&o|a&(r|o),u=2400959708):(c=r^o^a,u=3395469782);const d=(i<<5|i>>>27)+c+l+u+s[h]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=i,i=d}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const s=t-this.blockSize;let i=0;const r=this.buf_;let o=this.inbuf_;for(;i<t;){if(o===0)for(;i<=s;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<t;)if(r[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}else for(;i<t;)if(r[o]=e[i],++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=t&255,t/=256;this.compress_(this.buf_);let s=0;for(let i=0;i<5;i++)for(let r=24;r>=0;r-=8)e[s]=this.chain_[i]>>r&255,++s;return e}}function Xs(n,e){return`${n} failed: ${e} argument `}/**
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
 */const sd=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let i=n.charCodeAt(s);if(i>=55296&&i<=56319){const r=i-55296;s++,T(s<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(s)-56320;i=65536+(r<<10)+o}i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):i<65536?(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Zs=function(n){let e=0;for(let t=0;t<n.length;t++){const s=n.charCodeAt(t);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,t++):e+=3}return e};/**
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
 */function pe(n){return n&&n._delegate?n._delegate:n}class Re{constructor(e,t,s){this.name=e,this.instanceFactory=t,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const mt="[DEFAULT]";/**
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
 */class id{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const s=new cn;if(this.instancesDeferred.set(t,s),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&s.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(od(e))try{this.getOrInitializeService({instanceIdentifier:mt})}catch{}for(const[t,s]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:i});s.resolve(r)}catch{}}}}clearInstance(e=mt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=mt){return this.instances.has(e)}getOptions(e=mt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:s,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);s===a&&o.resolve(i)}return i}onInit(e,t){const s=this.normalizeInstanceIdentifier(t),i=this.onInitCallbacks.get(s)??new Set;i.add(e),this.onInitCallbacks.set(s,i);const r=this.instances.get(s);return r&&e(r,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const s=this.onInitCallbacks.get(t);if(s)for(const i of s)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:rd(e),options:t}),this.instances.set(e,s),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=mt){return this.component?this.component.multipleInstances?e:mt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function rd(n){return n===mt?void 0:n}function od(n){return n.instantiationMode==="EAGER"}/**
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
 */class ad{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new id(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var H;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(H||(H={}));const ld={debug:H.DEBUG,verbose:H.VERBOSE,info:H.INFO,warn:H.WARN,error:H.ERROR,silent:H.SILENT},cd=H.INFO,ud={[H.DEBUG]:"log",[H.VERBOSE]:"log",[H.INFO]:"info",[H.WARN]:"warn",[H.ERROR]:"error"},hd=(n,e,...t)=>{if(e<n.logLevel)return;const s=new Date().toISOString(),i=ud[e];if(i)console[i](`[${s}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class jr{constructor(e){this.name=e,this._logLevel=cd,this._logHandler=hd,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in H))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?ld[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,H.DEBUG,...e),this._logHandler(this,H.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,H.VERBOSE,...e),this._logHandler(this,H.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,H.INFO,...e),this._logHandler(this,H.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,H.WARN,...e),this._logHandler(this,H.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,H.ERROR,...e),this._logHandler(this,H.ERROR,...e)}}const dd=(n,e)=>e.some(t=>n instanceof t);let Go,Jo;function fd(){return Go||(Go=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function pd(){return Jo||(Jo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Zl=new WeakMap,ir=new WeakMap,ec=new WeakMap,Ci=new WeakMap,Br=new WeakMap;function gd(n){const e=new Promise((t,s)=>{const i=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(Ke(n.result)),i()},o=()=>{s(n.error),i()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Zl.set(t,n)}).catch(()=>{}),Br.set(e,n),e}function _d(n){if(ir.has(n))return;const e=new Promise((t,s)=>{const i=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),i()},o=()=>{s(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});ir.set(n,e)}let rr={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return ir.get(n);if(e==="objectStoreNames")return n.objectStoreNames||ec.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Ke(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function md(n){rr=n(rr)}function yd(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const s=n.call(Ai(this),e,...t);return ec.set(s,e.sort?e.sort():[e]),Ke(s)}:pd().includes(n)?function(...e){return n.apply(Ai(this),e),Ke(Zl.get(this))}:function(...e){return Ke(n.apply(Ai(this),e))}}function vd(n){return typeof n=="function"?yd(n):(n instanceof IDBTransaction&&_d(n),dd(n,fd())?new Proxy(n,rr):n)}function Ke(n){if(n instanceof IDBRequest)return gd(n);if(Ci.has(n))return Ci.get(n);const e=vd(n);return e!==n&&(Ci.set(n,e),Br.set(e,n)),e}const Ai=n=>Br.get(n);function ei(n,e,{blocked:t,upgrade:s,blocking:i,terminated:r}={}){const o=indexedDB.open(n,e),a=Ke(o);return s&&o.addEventListener("upgradeneeded",l=>{s(Ke(o.result),l.oldVersion,l.newVersion,Ke(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),i&&l.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}function Ri(n,{blocked:e}={}){const t=indexedDB.deleteDatabase(n);return e&&t.addEventListener("blocked",s=>e(s.oldVersion,s)),Ke(t).then(()=>{})}const wd=["get","getKey","getAll","getAllKeys","count"],bd=["put","add","delete","clear"],Pi=new Map;function Yo(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Pi.get(e))return Pi.get(e);const t=e.replace(/FromIndex$/,""),s=e!==t,i=bd.includes(t);if(!(t in(s?IDBIndex:IDBObjectStore).prototype)||!(i||wd.includes(t)))return;const r=async function(o,...a){const l=this.transaction(o,i?"readwrite":"readonly");let c=l.store;return s&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),i&&l.done]))[0]};return Pi.set(e,r),r}md(n=>({...n,get:(e,t,s)=>Yo(e,t)||n.get(e,t,s),has:(e,t)=>!!Yo(e,t)||n.has(e,t)}));/**
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
 */class Ed{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Sd(t)){const s=t.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(t=>t).join(" ")}}function Sd(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const or="@firebase/app",Qo="0.14.1";/**
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
 */const Je=new jr("@firebase/app"),Td="@firebase/app-compat",Id="@firebase/analytics-compat",kd="@firebase/analytics",Cd="@firebase/app-check-compat",Ad="@firebase/app-check",Rd="@firebase/auth",Pd="@firebase/auth-compat",Od="@firebase/database",Nd="@firebase/data-connect",xd="@firebase/database-compat",Dd="@firebase/functions",Ld="@firebase/functions-compat",Md="@firebase/installations",$d="@firebase/installations-compat",Fd="@firebase/messaging",jd="@firebase/messaging-compat",Bd="@firebase/performance",Ud="@firebase/performance-compat",Wd="@firebase/remote-config",Vd="@firebase/remote-config-compat",Hd="@firebase/storage",qd="@firebase/storage-compat",zd="@firebase/firestore",Kd="@firebase/ai",Gd="@firebase/firestore-compat",Jd="firebase",Yd="12.1.0";/**
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
 */const ar="[DEFAULT]",Qd={[or]:"fire-core",[Td]:"fire-core-compat",[kd]:"fire-analytics",[Id]:"fire-analytics-compat",[Ad]:"fire-app-check",[Cd]:"fire-app-check-compat",[Rd]:"fire-auth",[Pd]:"fire-auth-compat",[Od]:"fire-rtdb",[Nd]:"fire-data-connect",[xd]:"fire-rtdb-compat",[Dd]:"fire-fn",[Ld]:"fire-fn-compat",[Md]:"fire-iid",[$d]:"fire-iid-compat",[Fd]:"fire-fcm",[jd]:"fire-fcm-compat",[Bd]:"fire-perf",[Ud]:"fire-perf-compat",[Wd]:"fire-rc",[Vd]:"fire-rc-compat",[Hd]:"fire-gcs",[qd]:"fire-gcs-compat",[zd]:"fire-fst",[Gd]:"fire-fst-compat",[Kd]:"fire-vertex","fire-js":"fire-js",[Jd]:"fire-js-all"};/**
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
 */const ks=new Map,Xd=new Map,lr=new Map;function Xo(n,e){try{n.container.addComponent(e)}catch(t){Je.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Me(n){const e=n.name;if(lr.has(e))return Je.debug(`There were multiple attempts to register component ${e}.`),!1;lr.set(e,n);for(const t of ks.values())Xo(t,n);for(const t of Xd.values())Xo(t,n);return!0}function Xn(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Ur(n){return n==null?!1:n.settings!==void 0}/**
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
 */const Zd={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},nt=new Qs("app","Firebase",Zd);/**
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
 */class ef{constructor(e,t,s){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new Re("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw nt.create("app-deleted",{appName:this._name})}}/**
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
 */const Wr=Yd;function tc(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const s={name:ar,automaticDataCollectionEnabled:!0,...e},i=s.name;if(typeof i!="string"||!i)throw nt.create("bad-app-name",{appName:String(i)});if(t||(t=ql()),!t)throw nt.create("no-options");const r=ks.get(i);if(r){if(Is(t,r.options)&&Is(s,r.config))return r;throw nt.create("duplicate-app",{appName:i})}const o=new ad(i);for(const l of lr.values())o.addComponent(l);const a=new ef(t,s,o);return ks.set(i,a),a}function Vr(n=ar){const e=ks.get(n);if(!e&&n===ar&&ql())return tc();if(!e)throw nt.create("no-app",{appName:n});return e}function fe(n,e,t){let s=Qd[n]??n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),r=e.match(/\s|\//);if(i||r){const o=[`Unable to register library "${s}" with version "${e}":`];i&&o.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Je.warn(o.join(" "));return}Me(new Re(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const tf="firebase-heartbeat-database",nf=1,jn="firebase-heartbeat-store";let Oi=null;function nc(){return Oi||(Oi=ei(tf,nf,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(jn)}catch(t){console.warn(t)}}}}).catch(n=>{throw nt.create("idb-open",{originalErrorMessage:n.message})})),Oi}async function sf(n){try{const t=(await nc()).transaction(jn),s=await t.objectStore(jn).get(sc(n));return await t.done,s}catch(e){if(e instanceof ht)Je.warn(e.message);else{const t=nt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Je.warn(t.message)}}}async function Zo(n,e){try{const s=(await nc()).transaction(jn,"readwrite");await s.objectStore(jn).put(e,sc(n)),await s.done}catch(t){if(t instanceof ht)Je.warn(t.message);else{const s=nt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Je.warn(s.message)}}}function sc(n){return`${n.name}!${n.options.appId}`}/**
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
 */const rf=1024,of=30;class af{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new cf(t),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=ea();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:i}),this._heartbeatsCache.heartbeats.length>of){const o=uf(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){Je.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=ea(),{heartbeatsToSend:s,unsentEntries:i}=lf(this._heartbeatsCache.heartbeats),r=Ss(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(t){return Je.warn(t),""}}}function ea(){return new Date().toISOString().substring(0,10)}function lf(n,e=rf){const t=[];let s=n.slice();for(const i of n){const r=t.find(o=>o.agent===i.agent);if(r){if(r.dates.push(i.date),ta(t)>e){r.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),ta(t)>e){t.pop();break}s=s.slice(1)}return{heartbeatsToSend:t,unsentEntries:s}}class cf{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Yl()?Ql().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await sf(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Zo(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Zo(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function ta(n){return Ss(JSON.stringify({version:2,heartbeats:n})).length}function uf(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let s=1;s<n.length;s++)n[s].date<t&&(t=n[s].date,e=s);return e}/**
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
 */function hf(n){Me(new Re("platform-logger",e=>new Ed(e),"PRIVATE")),Me(new Re("heartbeat",e=>new af(e),"PRIVATE")),fe(or,Qo,n),fe(or,Qo,"esm2020"),fe("fire-js","")}hf("");var df="firebase",ff="12.1.0";/**
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
 */fe(df,ff,"app");var na=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ic;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(_,f){function g(){}g.prototype=f.prototype,_.D=f.prototype,_.prototype=new g,_.prototype.constructor=_,_.C=function(m,y,w){for(var p=Array(arguments.length-2),pt=2;pt<arguments.length;pt++)p[pt-2]=arguments[pt];return f.prototype[y].apply(m,p)}}function t(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(s,t),s.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(_,f,g){g||(g=0);var m=Array(16);if(typeof f=="string")for(var y=0;16>y;++y)m[y]=f.charCodeAt(g++)|f.charCodeAt(g++)<<8|f.charCodeAt(g++)<<16|f.charCodeAt(g++)<<24;else for(y=0;16>y;++y)m[y]=f[g++]|f[g++]<<8|f[g++]<<16|f[g++]<<24;f=_.g[0],g=_.g[1],y=_.g[2];var w=_.g[3],p=f+(w^g&(y^w))+m[0]+3614090360&4294967295;f=g+(p<<7&4294967295|p>>>25),p=w+(y^f&(g^y))+m[1]+3905402710&4294967295,w=f+(p<<12&4294967295|p>>>20),p=y+(g^w&(f^g))+m[2]+606105819&4294967295,y=w+(p<<17&4294967295|p>>>15),p=g+(f^y&(w^f))+m[3]+3250441966&4294967295,g=y+(p<<22&4294967295|p>>>10),p=f+(w^g&(y^w))+m[4]+4118548399&4294967295,f=g+(p<<7&4294967295|p>>>25),p=w+(y^f&(g^y))+m[5]+1200080426&4294967295,w=f+(p<<12&4294967295|p>>>20),p=y+(g^w&(f^g))+m[6]+2821735955&4294967295,y=w+(p<<17&4294967295|p>>>15),p=g+(f^y&(w^f))+m[7]+4249261313&4294967295,g=y+(p<<22&4294967295|p>>>10),p=f+(w^g&(y^w))+m[8]+1770035416&4294967295,f=g+(p<<7&4294967295|p>>>25),p=w+(y^f&(g^y))+m[9]+2336552879&4294967295,w=f+(p<<12&4294967295|p>>>20),p=y+(g^w&(f^g))+m[10]+4294925233&4294967295,y=w+(p<<17&4294967295|p>>>15),p=g+(f^y&(w^f))+m[11]+2304563134&4294967295,g=y+(p<<22&4294967295|p>>>10),p=f+(w^g&(y^w))+m[12]+1804603682&4294967295,f=g+(p<<7&4294967295|p>>>25),p=w+(y^f&(g^y))+m[13]+4254626195&4294967295,w=f+(p<<12&4294967295|p>>>20),p=y+(g^w&(f^g))+m[14]+2792965006&4294967295,y=w+(p<<17&4294967295|p>>>15),p=g+(f^y&(w^f))+m[15]+1236535329&4294967295,g=y+(p<<22&4294967295|p>>>10),p=f+(y^w&(g^y))+m[1]+4129170786&4294967295,f=g+(p<<5&4294967295|p>>>27),p=w+(g^y&(f^g))+m[6]+3225465664&4294967295,w=f+(p<<9&4294967295|p>>>23),p=y+(f^g&(w^f))+m[11]+643717713&4294967295,y=w+(p<<14&4294967295|p>>>18),p=g+(w^f&(y^w))+m[0]+3921069994&4294967295,g=y+(p<<20&4294967295|p>>>12),p=f+(y^w&(g^y))+m[5]+3593408605&4294967295,f=g+(p<<5&4294967295|p>>>27),p=w+(g^y&(f^g))+m[10]+38016083&4294967295,w=f+(p<<9&4294967295|p>>>23),p=y+(f^g&(w^f))+m[15]+3634488961&4294967295,y=w+(p<<14&4294967295|p>>>18),p=g+(w^f&(y^w))+m[4]+3889429448&4294967295,g=y+(p<<20&4294967295|p>>>12),p=f+(y^w&(g^y))+m[9]+568446438&4294967295,f=g+(p<<5&4294967295|p>>>27),p=w+(g^y&(f^g))+m[14]+3275163606&4294967295,w=f+(p<<9&4294967295|p>>>23),p=y+(f^g&(w^f))+m[3]+4107603335&4294967295,y=w+(p<<14&4294967295|p>>>18),p=g+(w^f&(y^w))+m[8]+1163531501&4294967295,g=y+(p<<20&4294967295|p>>>12),p=f+(y^w&(g^y))+m[13]+2850285829&4294967295,f=g+(p<<5&4294967295|p>>>27),p=w+(g^y&(f^g))+m[2]+4243563512&4294967295,w=f+(p<<9&4294967295|p>>>23),p=y+(f^g&(w^f))+m[7]+1735328473&4294967295,y=w+(p<<14&4294967295|p>>>18),p=g+(w^f&(y^w))+m[12]+2368359562&4294967295,g=y+(p<<20&4294967295|p>>>12),p=f+(g^y^w)+m[5]+4294588738&4294967295,f=g+(p<<4&4294967295|p>>>28),p=w+(f^g^y)+m[8]+2272392833&4294967295,w=f+(p<<11&4294967295|p>>>21),p=y+(w^f^g)+m[11]+1839030562&4294967295,y=w+(p<<16&4294967295|p>>>16),p=g+(y^w^f)+m[14]+4259657740&4294967295,g=y+(p<<23&4294967295|p>>>9),p=f+(g^y^w)+m[1]+2763975236&4294967295,f=g+(p<<4&4294967295|p>>>28),p=w+(f^g^y)+m[4]+1272893353&4294967295,w=f+(p<<11&4294967295|p>>>21),p=y+(w^f^g)+m[7]+4139469664&4294967295,y=w+(p<<16&4294967295|p>>>16),p=g+(y^w^f)+m[10]+3200236656&4294967295,g=y+(p<<23&4294967295|p>>>9),p=f+(g^y^w)+m[13]+681279174&4294967295,f=g+(p<<4&4294967295|p>>>28),p=w+(f^g^y)+m[0]+3936430074&4294967295,w=f+(p<<11&4294967295|p>>>21),p=y+(w^f^g)+m[3]+3572445317&4294967295,y=w+(p<<16&4294967295|p>>>16),p=g+(y^w^f)+m[6]+76029189&4294967295,g=y+(p<<23&4294967295|p>>>9),p=f+(g^y^w)+m[9]+3654602809&4294967295,f=g+(p<<4&4294967295|p>>>28),p=w+(f^g^y)+m[12]+3873151461&4294967295,w=f+(p<<11&4294967295|p>>>21),p=y+(w^f^g)+m[15]+530742520&4294967295,y=w+(p<<16&4294967295|p>>>16),p=g+(y^w^f)+m[2]+3299628645&4294967295,g=y+(p<<23&4294967295|p>>>9),p=f+(y^(g|~w))+m[0]+4096336452&4294967295,f=g+(p<<6&4294967295|p>>>26),p=w+(g^(f|~y))+m[7]+1126891415&4294967295,w=f+(p<<10&4294967295|p>>>22),p=y+(f^(w|~g))+m[14]+2878612391&4294967295,y=w+(p<<15&4294967295|p>>>17),p=g+(w^(y|~f))+m[5]+4237533241&4294967295,g=y+(p<<21&4294967295|p>>>11),p=f+(y^(g|~w))+m[12]+1700485571&4294967295,f=g+(p<<6&4294967295|p>>>26),p=w+(g^(f|~y))+m[3]+2399980690&4294967295,w=f+(p<<10&4294967295|p>>>22),p=y+(f^(w|~g))+m[10]+4293915773&4294967295,y=w+(p<<15&4294967295|p>>>17),p=g+(w^(y|~f))+m[1]+2240044497&4294967295,g=y+(p<<21&4294967295|p>>>11),p=f+(y^(g|~w))+m[8]+1873313359&4294967295,f=g+(p<<6&4294967295|p>>>26),p=w+(g^(f|~y))+m[15]+4264355552&4294967295,w=f+(p<<10&4294967295|p>>>22),p=y+(f^(w|~g))+m[6]+2734768916&4294967295,y=w+(p<<15&4294967295|p>>>17),p=g+(w^(y|~f))+m[13]+1309151649&4294967295,g=y+(p<<21&4294967295|p>>>11),p=f+(y^(g|~w))+m[4]+4149444226&4294967295,f=g+(p<<6&4294967295|p>>>26),p=w+(g^(f|~y))+m[11]+3174756917&4294967295,w=f+(p<<10&4294967295|p>>>22),p=y+(f^(w|~g))+m[2]+718787259&4294967295,y=w+(p<<15&4294967295|p>>>17),p=g+(w^(y|~f))+m[9]+3951481745&4294967295,_.g[0]=_.g[0]+f&4294967295,_.g[1]=_.g[1]+(y+(p<<21&4294967295|p>>>11))&4294967295,_.g[2]=_.g[2]+y&4294967295,_.g[3]=_.g[3]+w&4294967295}s.prototype.u=function(_,f){f===void 0&&(f=_.length);for(var g=f-this.blockSize,m=this.B,y=this.h,w=0;w<f;){if(y==0)for(;w<=g;)i(this,_,w),w+=this.blockSize;if(typeof _=="string"){for(;w<f;)if(m[y++]=_.charCodeAt(w++),y==this.blockSize){i(this,m),y=0;break}}else for(;w<f;)if(m[y++]=_[w++],y==this.blockSize){i(this,m),y=0;break}}this.h=y,this.o+=f},s.prototype.v=function(){var _=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);_[0]=128;for(var f=1;f<_.length-8;++f)_[f]=0;var g=8*this.o;for(f=_.length-8;f<_.length;++f)_[f]=g&255,g/=256;for(this.u(_),_=Array(16),f=g=0;4>f;++f)for(var m=0;32>m;m+=8)_[g++]=this.g[f]>>>m&255;return _};function r(_,f){var g=a;return Object.prototype.hasOwnProperty.call(g,_)?g[_]:g[_]=f(_)}function o(_,f){this.h=f;for(var g=[],m=!0,y=_.length-1;0<=y;y--){var w=_[y]|0;m&&w==f||(g[y]=w,m=!1)}this.g=g}var a={};function l(_){return-128<=_&&128>_?r(_,function(f){return new o([f|0],0>f?-1:0)}):new o([_|0],0>_?-1:0)}function c(_){if(isNaN(_)||!isFinite(_))return h;if(0>_)return E(c(-_));for(var f=[],g=1,m=0;_>=g;m++)f[m]=_/g|0,g*=4294967296;return new o(f,0)}function u(_,f){if(_.length==0)throw Error("number format error: empty string");if(f=f||10,2>f||36<f)throw Error("radix out of range: "+f);if(_.charAt(0)=="-")return E(u(_.substring(1),f));if(0<=_.indexOf("-"))throw Error('number format error: interior "-" character');for(var g=c(Math.pow(f,8)),m=h,y=0;y<_.length;y+=8){var w=Math.min(8,_.length-y),p=parseInt(_.substring(y,y+w),f);8>w?(w=c(Math.pow(f,w)),m=m.j(w).add(c(p))):(m=m.j(g),m=m.add(c(p)))}return m}var h=l(0),d=l(1),v=l(16777216);n=o.prototype,n.m=function(){if(S(this))return-E(this).m();for(var _=0,f=1,g=0;g<this.g.length;g++){var m=this.i(g);_+=(0<=m?m:4294967296+m)*f,f*=4294967296}return _},n.toString=function(_){if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(b(this))return"0";if(S(this))return"-"+E(this).toString(_);for(var f=c(Math.pow(_,6)),g=this,m="";;){var y=R(g,f).g;g=C(g,y.j(f));var w=((0<g.g.length?g.g[0]:g.h)>>>0).toString(_);if(g=y,b(g))return w+m;for(;6>w.length;)w="0"+w;m=w+m}},n.i=function(_){return 0>_?0:_<this.g.length?this.g[_]:this.h};function b(_){if(_.h!=0)return!1;for(var f=0;f<_.g.length;f++)if(_.g[f]!=0)return!1;return!0}function S(_){return _.h==-1}n.l=function(_){return _=C(this,_),S(_)?-1:b(_)?0:1};function E(_){for(var f=_.g.length,g=[],m=0;m<f;m++)g[m]=~_.g[m];return new o(g,~_.h).add(d)}n.abs=function(){return S(this)?E(this):this},n.add=function(_){for(var f=Math.max(this.g.length,_.g.length),g=[],m=0,y=0;y<=f;y++){var w=m+(this.i(y)&65535)+(_.i(y)&65535),p=(w>>>16)+(this.i(y)>>>16)+(_.i(y)>>>16);m=p>>>16,w&=65535,p&=65535,g[y]=p<<16|w}return new o(g,g[g.length-1]&-2147483648?-1:0)};function C(_,f){return _.add(E(f))}n.j=function(_){if(b(this)||b(_))return h;if(S(this))return S(_)?E(this).j(E(_)):E(E(this).j(_));if(S(_))return E(this.j(E(_)));if(0>this.l(v)&&0>_.l(v))return c(this.m()*_.m());for(var f=this.g.length+_.g.length,g=[],m=0;m<2*f;m++)g[m]=0;for(m=0;m<this.g.length;m++)for(var y=0;y<_.g.length;y++){var w=this.i(m)>>>16,p=this.i(m)&65535,pt=_.i(y)>>>16,Vo=_.i(y)&65535;g[2*m+2*y]+=p*Vo,U(g,2*m+2*y),g[2*m+2*y+1]+=w*Vo,U(g,2*m+2*y+1),g[2*m+2*y+1]+=p*pt,U(g,2*m+2*y+1),g[2*m+2*y+2]+=w*pt,U(g,2*m+2*y+2)}for(m=0;m<f;m++)g[m]=g[2*m+1]<<16|g[2*m];for(m=f;m<2*f;m++)g[m]=0;return new o(g,0)};function U(_,f){for(;(_[f]&65535)!=_[f];)_[f+1]+=_[f]>>>16,_[f]&=65535,f++}function I(_,f){this.g=_,this.h=f}function R(_,f){if(b(f))throw Error("division by zero");if(b(_))return new I(h,h);if(S(_))return f=R(E(_),f),new I(E(f.g),E(f.h));if(S(f))return f=R(_,E(f)),new I(E(f.g),f.h);if(30<_.g.length){if(S(_)||S(f))throw Error("slowDivide_ only works with positive integers.");for(var g=d,m=f;0>=m.l(_);)g=X(g),m=X(m);var y=j(g,1),w=j(m,1);for(m=j(m,2),g=j(g,2);!b(m);){var p=w.add(m);0>=p.l(_)&&(y=y.add(g),w=p),m=j(m,1),g=j(g,1)}return f=C(_,y.j(f)),new I(y,f)}for(y=h;0<=_.l(f);){for(g=Math.max(1,Math.floor(_.m()/f.m())),m=Math.ceil(Math.log(g)/Math.LN2),m=48>=m?1:Math.pow(2,m-48),w=c(g),p=w.j(f);S(p)||0<p.l(_);)g-=m,w=c(g),p=w.j(f);b(w)&&(w=d),y=y.add(w),_=C(_,p)}return new I(y,_)}n.A=function(_){return R(this,_).h},n.and=function(_){for(var f=Math.max(this.g.length,_.g.length),g=[],m=0;m<f;m++)g[m]=this.i(m)&_.i(m);return new o(g,this.h&_.h)},n.or=function(_){for(var f=Math.max(this.g.length,_.g.length),g=[],m=0;m<f;m++)g[m]=this.i(m)|_.i(m);return new o(g,this.h|_.h)},n.xor=function(_){for(var f=Math.max(this.g.length,_.g.length),g=[],m=0;m<f;m++)g[m]=this.i(m)^_.i(m);return new o(g,this.h^_.h)};function X(_){for(var f=_.g.length+1,g=[],m=0;m<f;m++)g[m]=_.i(m)<<1|_.i(m-1)>>>31;return new o(g,_.h)}function j(_,f){var g=f>>5;f%=32;for(var m=_.g.length-g,y=[],w=0;w<m;w++)y[w]=0<f?_.i(w+g)>>>f|_.i(w+g+1)<<32-f:_.i(w+g);return new o(y,_.h)}s.prototype.digest=s.prototype.v,s.prototype.reset=s.prototype.s,s.prototype.update=s.prototype.u,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=c,o.fromString=u,ic=o}).apply(typeof na<"u"?na:typeof self<"u"?self:typeof window<"u"?window:{});const sa="4.9.0";/**
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
 */class _e{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}_e.UNAUTHENTICATED=new _e(null),_e.GOOGLE_CREDENTIALS=new _e("google-credentials-uid"),_e.FIRST_PARTY=new _e("first-party-uid"),_e.MOCK_USER=new _e("mock-user");/**
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
 */let ti="12.0.0";/**
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
 */const Cs=new jr("@firebase/firestore");function pf(n,...e){if(Cs.logLevel<=H.DEBUG){const t=e.map(rc);Cs.debug(`Firestore (${ti}): ${n}`,...t)}}function gf(n,...e){if(Cs.logLevel<=H.ERROR){const t=e.map(rc);Cs.error(`Firestore (${ti}): ${n}`,...t)}}function rc(n){if(typeof n=="string")return n;try{/**
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
 */function ia(n,e,t){let s="Unexpected state";typeof e=="string"?s=e:t=e,oc(n,s,t)}function oc(n,e,t){let s=`FIRESTORE (${ti}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{s+=" CONTEXT: "+JSON.stringify(t)}catch{s+=" CONTEXT: "+t}throw gf(s),new Error(s)}function ac(n,e,t,s){let i="Unexpected state";typeof t=="string"?i=t:s=t,n||oc(e,i,s)}/**
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
 */const ee="invalid-argument",ra="failed-precondition";class Y extends ht{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class _f{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class mf{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(_e.UNAUTHENTICATED))}shutdown(){}}class yf{constructor(e){this.auth=null,e.onInit(t=>{this.auth=t})}getToken(){return this.auth?this.auth.getToken().then(e=>e?(ac(typeof e.accessToken=="string",42297,{t:e}),new _f(e.accessToken,new _e(this.auth.getUid()))):null):Promise.resolve(null)}invalidateToken(){}start(e,t){}shutdown(){}}class vf{constructor(e,t,s){this.i=e,this.o=t,this.u=s,this.type="FirstParty",this.user=_e.FIRST_PARTY,this.l=new Map}h(){return this.u?this.u():null}get headers(){this.l.set("X-Goog-AuthUser",this.i);const e=this.h();return e&&this.l.set("Authorization",e),this.o&&this.l.set("X-Goog-Iam-Authorization-Token",this.o),this.l}}class wf{constructor(e,t,s){this.i=e,this.o=t,this.u=s}getToken(){return Promise.resolve(new vf(this.i,this.o,this.u))}start(e,t){e.enqueueRetryable(()=>t(_e.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class oa{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class bf{constructor(e,t){this.m=t,this.appCheck=null,this.T=null,Ur(e)&&e.settings.appCheckToken&&(this.T=e.settings.appCheckToken),t.onInit(s=>{this.appCheck=s})}getToken(){return this.T?Promise.resolve(new oa(this.T)):this.appCheck?this.appCheck.getToken().then(e=>e?(ac(typeof e.token=="string",3470,{tokenResult:e}),new oa(e.token)):null):Promise.resolve(null)}invalidateToken(){}start(e,t){}shutdown(){}}const aa="(default)";class As{constructor(e,t){this.projectId=e,this.database=t||aa}static empty(){return new As("","")}get isDefaultDatabase(){return this.database===aa}isEqual(e){return e instanceof As&&e.projectId===this.projectId&&e.database===this.database}}function ot(n,e){return n<e?-1:n>e?1:0}function Ef(n,e){const t=Math.min(n.length,e.length);for(let s=0;s<t;s++){const i=n.charAt(s),r=e.charAt(s);if(i!==r)return Ni(i)===Ni(r)?ot(i,r):Ni(i)?1:-1}return ot(n.length,e.length)}const Sf=55296,Tf=57343;function Ni(n){const e=n.charCodeAt(0);return e>=Sf&&e<=Tf}class Be{constructor(e,t,s){t===void 0?t=0:t>e.length&&ia(637,{offset:t,range:e.length}),s===void 0?s=e.length-t:s>e.length-t&&ia(1746,{length:s,range:e.length-t}),this.segments=e,this.offset=t,this.len=s}get length(){return this.len}isEqual(e){return Be.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Be?e.forEach(s=>{t.push(s)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,s=this.limit();t<s;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const s=Math.min(e.length,t.length);for(let i=0;i<s;i++){const r=Be.compareSegments(e.get(i),t.get(i));if(r!==0)return r}return ot(e.length,t.length)}static compareSegments(e,t){const s=Be.isNumericId(e),i=Be.isNumericId(t);return s&&!i?-1:!s&&i?1:s&&i?Be.extractNumericId(e).compare(Be.extractNumericId(t)):Ef(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return ic.fromString(e.substring(4,e.length-2))}}class Ee extends Be{construct(e,t,s){return new Ee(e,t,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const s of e){if(s.indexOf("//")>=0)throw new Y(ee,`Invalid segment (${s}). Paths must not contain // in them.`);t.push(...s.split("/").filter(i=>i.length>0))}return new Ee(t)}static emptyPath(){return new Ee([])}}/**
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
 */class bt{constructor(e){this.path=e}static fromPath(e){return new bt(Ee.fromString(e))}static fromName(e){return new bt(Ee.fromString(e).popFirst(5))}static empty(){return new bt(Ee.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Ee.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Ee.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new bt(new Ee(e.slice()))}}function If(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}/**
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
 */function kf(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */var la,B;/**
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
 */(B=la||(la={}))[B.OK=0]="OK",B[B.CANCELLED=1]="CANCELLED",B[B.UNKNOWN=2]="UNKNOWN",B[B.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",B[B.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",B[B.NOT_FOUND=5]="NOT_FOUND",B[B.ALREADY_EXISTS=6]="ALREADY_EXISTS",B[B.PERMISSION_DENIED=7]="PERMISSION_DENIED",B[B.UNAUTHENTICATED=16]="UNAUTHENTICATED",B[B.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",B[B.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",B[B.ABORTED=10]="ABORTED",B[B.OUT_OF_RANGE=11]="OUT_OF_RANGE",B[B.UNIMPLEMENTED=12]="UNIMPLEMENTED",B[B.INTERNAL=13]="INTERNAL",B[B.UNAVAILABLE=14]="UNAVAILABLE",B[B.DATA_LOSS=15]="DATA_LOSS";/**
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
 */class Cf extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Rt{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(r){throw typeof DOMException<"u"&&r instanceof DOMException?new Cf("Invalid base64 string: "+r):r}}(e);return new Rt(t)}static fromUint8Array(e){const t=function(i){let r="";for(let o=0;o<i.length;++o)r+=String.fromCharCode(i[o]);return r}(e);return new Rt(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const s=new Uint8Array(t.length);for(let i=0;i<t.length;i++)s[i]=t.charCodeAt(i);return s}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ot(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Rt.EMPTY_BYTE_STRING=new Rt("");/**
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
 */function ye(n,e){const t={typeString:n};return e&&(t.value=e),t}function Zn(n,e){if(!If(n))throw new Y(ee,"JSON must be an object");let t;for(const s in e)if(e[s]){const i=e[s].typeString,r="value"in e[s]?{value:e[s].value}:void 0;if(!(s in n)){t=`JSON missing required field: '${s}'`;break}const o=n[s];if(i&&typeof o!==i){t=`JSON field '${s}' must be a ${i}.`;break}if(r!==void 0&&o!==r.value){t=`Expected '${s}' field to equal '${r.value}'`;break}}if(t)throw new Y(ee,t);return!0}/**
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
 */const ca=-62135596800,ua=1e6;class Ne{static now(){return Ne.fromMillis(Date.now())}static fromDate(e){return Ne.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),s=Math.floor((e-1e3*t)*ua);return new Ne(t,s)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new Y(ee,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new Y(ee,"Timestamp nanoseconds out of range: "+t);if(e<ca)throw new Y(ee,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new Y(ee,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/ua}_compareTo(e){return this.seconds===e.seconds?ot(this.nanoseconds,e.nanoseconds):ot(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Ne._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Zn(e,Ne._jsonSchema))return new Ne(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-ca;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Ne._jsonSchemaVersion="firestore/timestamp/1.0",Ne._jsonSchema={type:ye("string",Ne._jsonSchemaVersion),seconds:ye("number"),nanoseconds:ye("number")};/**
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
 */class Af{constructor(e,t=null,s=[],i=[],r=null,o="F",a=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=s,this.filters=i,this.limit=r,this.limitType=o,this.startAt=a,this.endAt=l,this.q=null,this.B=null,this.$=null,this.startAt,this.endAt}}/**
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
 */const Rf="ComponentProvider",ha=new Map;/**
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
 */const Pf=1048576,Of="firestore.googleapis.com",da=!0;/**
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
 */class fa{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new Y(ee,"Can't provide ssl option if host option is not set");this.host=Of,this.ssl=da}else this.host=e.host,this.ssl=e.ssl??da;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Pf)throw new Y(ee,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}(function(s,i,r,o){if(i===!0&&o===!0)throw new Y(ee,`${s} and ${r} cannot be used together.`)})("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=kf(e.experimentalLongPollingOptions??{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new Y(ee,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new Y(ee,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new Y(ee,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(s,i){return s.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Nf{constructor(e,t,s,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=s,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new fa({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new Y(ra,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new Y(ra,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new fa(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(s){if(!s)return new mf;switch(s.type){case"firstParty":return new wf(s.sessionIndex||"0",s.iamToken||null,s.authTokenFactory||null);case"provider":return s.client;default:throw new Y(ee,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const s=ha.get(t);s&&(pf(Rf,"Removing Datastore"),ha.delete(t),s.terminate())}(this),Promise.resolve()}}/**
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
 */class Hr{constructor(e,t,s){this.converter=t,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new Hr(this.firestore,e,this._query)}}class qe{constructor(e,t,s){this.converter=t,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new qr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new qe(this.firestore,e,this._key)}toJSON(){return{type:qe._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,s){if(Zn(t,qe._jsonSchema))return new qe(e,s||null,new bt(Ee.fromString(t.referencePath)))}}qe._jsonSchemaVersion="firestore/documentReference/1.0",qe._jsonSchema={type:ye("string",qe._jsonSchemaVersion),referencePath:ye("string")};class qr extends Hr{constructor(e,t,s){super(e,t,function(r){return new Af(r)}(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new qe(this.firestore,null,new bt(e))}withConverter(e){return new qr(this.firestore,e,this._path)}}/**
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
 */class He{constructor(e){this._byteString=e}static fromBase64String(e){try{return new He(Rt.fromBase64String(e))}catch(t){throw new Y(ee,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new He(Rt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:He._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Zn(e,He._jsonSchema))return He.fromBase64String(e.bytes)}}He._jsonSchemaVersion="firestore/bytes/1.0",He._jsonSchema={type:ye("string",He._jsonSchemaVersion),bytes:ye("string")};/**
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
 */class It{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new Y(ee,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new Y(ee,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ot(this._lat,e._lat)||ot(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:It._jsonSchemaVersion}}static fromJSON(e){if(Zn(e,It._jsonSchema))return new It(e.latitude,e.longitude)}}It._jsonSchemaVersion="firestore/geoPoint/1.0",It._jsonSchema={type:ye("string",It._jsonSchemaVersion),latitude:ye("number"),longitude:ye("number")};/**
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
 */class kt{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){/**
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
*/return function(s,i){if(s.length!==i.length)return!1;for(let r=0;r<s.length;++r)if(s[r]!==i[r])return!1;return!0}(this._values,e._values)}toJSON(){return{type:kt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Zn(e,kt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new kt(e.vectorValues);throw new Y(ee,"Expected 'vectorValues' field to be a number array")}}}kt._jsonSchemaVersion="firestore/vectorValue/1.0",kt._jsonSchema={type:ye("string",kt._jsonSchemaVersion),vectorValues:ye("object")};(function(){(function(t){ti=t})(`${Wr}_lite`),Me(new Re("firestore/lite",(e,{instanceIdentifier:t,options:s})=>{const i=e.getProvider("app").getImmediate(),r=new Nf(new yf(e.getProvider("auth-internal")),new bf(i,e.getProvider("app-check-internal")),function(a,l){if(!Object.prototype.hasOwnProperty.apply(a.options,["projectId"]))throw new Y(ee,'"projectId" not provided in firebase.initializeApp.');return new As(a.options.projectId,l)}(i,t),i);return s&&r._setSettings(s),r},"PUBLIC").setMultipleInstances(!0)),fe("firestore-lite",sa,""),fe("firestore-lite",sa,"esm2020")})();var pa={};const ga="@firebase/database",_a="1.1.0";/**
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
 */let lc="";function xf(n){lc=n}/**
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
 */class Df{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),te(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:Fn(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
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
 */class Lf{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return Oe(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
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
 */const cc=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Df(e)}}catch{}return new Lf},Et=cc("localStorage"),Mf=cc("sessionStorage");/**
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
 */const Qt=new jr("@firebase/database"),uc=function(){let n=1;return function(){return n++}}(),hc=function(n){const e=sd(n),t=new nd;t.update(e);const s=t.digest();return Fr.encodeByteArray(s)},es=function(...n){let e="";for(let t=0;t<n.length;t++){const s=n[t];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=es.apply(null,s):typeof s=="object"?e+=te(s):e+=s,e+=" "}return e};let kn=null,ma=!0;const $f=function(n,e){T(!0,"Can't turn on custom loggers persistently."),Qt.logLevel=H.VERBOSE,kn=Qt.log.bind(Qt)},re=function(...n){if(ma===!0&&(ma=!1,kn===null&&Mf.get("logging_enabled")===!0&&$f()),kn){const e=es.apply(null,n);kn(e)}},ts=function(n){return function(...e){re(n,...e)}},cr=function(...n){const e="FIREBASE INTERNAL ERROR: "+es(...n);Qt.error(e)},Ye=function(...n){const e=`FIREBASE FATAL ERROR: ${es(...n)}`;throw Qt.error(e),new Error(e)},ce=function(...n){const e="FIREBASE WARNING: "+es(...n);Qt.warn(e)},Ff=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&ce("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},zr=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},jf=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},Pt="[MIN_NAME]",at="[MAX_NAME]",Mt=function(n,e){if(n===e)return 0;if(n===Pt||e===at)return-1;if(e===Pt||n===at)return 1;{const t=ya(n),s=ya(e);return t!==null?s!==null?t-s===0?n.length-e.length:t-s:-1:s!==null?1:n<e?-1:1}},Bf=function(n,e){return n===e?0:n<e?-1:1},mn=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+te(e))},Kr=function(n){if(typeof n!="object"||n===null)return te(n);const e=[];for(const s in n)e.push(s);e.sort();let t="{";for(let s=0;s<e.length;s++)s!==0&&(t+=","),t+=te(e[s]),t+=":",t+=Kr(n[e[s]]);return t+="}",t},dc=function(n,e){const t=n.length;if(t<=e)return[n];const s=[];for(let i=0;i<t;i+=e)i+e>t?s.push(n.substring(i,t)):s.push(n.substring(i,i+e));return s};function ae(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const fc=function(n){T(!zr(n),"Invalid JSON number");const e=11,t=52,s=(1<<e-1)-1;let i,r,o,a,l;n===0?(r=0,o=0,i=1/n===-1/0?1:0):(i=n<0,n=Math.abs(n),n>=Math.pow(2,1-s)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),s),r=a+s,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-s-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(i?1:0),c.reverse();const u=c.join("");let h="";for(l=0;l<64;l+=8){let d=parseInt(u.substr(l,8),2).toString(16);d.length===1&&(d="0"+d),h=h+d}return h.toLowerCase()},Uf=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Wf=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Vf(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const s=new Error(n+" at "+e._path.toString()+": "+t);return s.code=n.toUpperCase(),s}const Hf=new RegExp("^-?(0*)\\d{1,10}$"),qf=-2147483648,zf=2147483647,ya=function(n){if(Hf.test(n)){const e=Number(n);if(e>=qf&&e<=zf)return e}return null},un=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw ce("Exception was thrown by user callback.",t),e},Math.floor(0))}},Kf=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Cn=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
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
 */class Gf{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,Ur(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(s=>this.appCheck=s)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,s):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)==null||t.get().then(s=>s.addTokenListener(e))}notifyForInvalidToken(){ce(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
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
 */class Jf{constructor(e,t,s){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(re("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,s):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',ce(e)}}class ws{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}ws.OWNER="owner";/**
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
 */const Gr="5",pc="v",gc="s",_c="r",mc="f",yc=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,vc="ls",wc="p",ur="ac",bc="websocket",Ec="long_polling";/**
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
 */class Sc{constructor(e,t,s,i,r=!1,o="",a=!1,l=!1,c=null){this.secure=t,this.namespace=s,this.webSocketOnly=i,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Et.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Et.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function Yf(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Tc(n,e,t){T(typeof e=="string","typeof type must == string"),T(typeof t=="object","typeof params must == object");let s;if(e===bc)s=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===Ec)s=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Yf(n)&&(t.ns=n.namespace);const i=[];return ae(t,(r,o)=>{i.push(r+"="+o)}),s+i.join("&")}/**
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
 */class Qf{constructor(){this.counters_={}}incrementCounter(e,t=1){Oe(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return $h(this.counters_)}}/**
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
 */const xi={},Di={};function Jr(n){const e=n.toString();return xi[e]||(xi[e]=new Qf),xi[e]}function Xf(n,e){const t=n.toString();return Di[t]||(Di[t]=e()),Di[t]}/**
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
 */class Zf{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<s.length;++i)s[i]&&un(()=>{this.onMessage_(s[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
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
 */const va="start",ep="close",tp="pLPCommand",np="pRTLPCB",Ic="id",kc="pw",Cc="ser",sp="cb",ip="seg",rp="ts",op="d",ap="dframe",Ac=1870,Rc=30,lp=Ac-Rc,cp=25e3,up=3e4;class Jt{constructor(e,t,s,i,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=ts(e),this.stats_=Jr(t),this.urlFn=l=>(this.appCheckToken&&(l[ur]=this.appCheckToken),Tc(t,Ec,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new Zf(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(up)),jf(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Yr((...r)=>{const[o,a,l,c,u]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===va)this.id=a,this.password=l;else if(o===ep)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const s={};s[va]="t",s[Cc]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[sp]=this.scriptTagHolder.uniqueCallbackIdentifier),s[pc]=Gr,this.transportSessionId&&(s[gc]=this.transportSessionId),this.lastSessionId&&(s[vc]=this.lastSessionId),this.applicationId&&(s[wc]=this.applicationId),this.appCheckToken&&(s[ur]=this.appCheckToken),typeof location<"u"&&location.hostname&&yc.test(location.hostname)&&(s[_c]=mc);const i=this.urlFn(s);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Jt.forceAllow_=!0}static forceDisallow(){Jt.forceDisallow_=!0}static isAvailable(){return Jt.forceAllow_?!0:!Jt.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Uf()&&!Wf()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=te(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const s=Ul(t),i=dc(s,lp);for(let r=0;r<i.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const s={};s[ap]="t",s[Ic]=e,s[kc]=t,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=te(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class Yr{constructor(e,t,s,i){this.onDisconnect=s,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=uc(),window[tp+this.uniqueCallbackIdentifier]=e,window[np+this.uniqueCallbackIdentifier]=t,this.myIFrame=Yr.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){re("frame writing exception"),a.stack&&re(a.stack),re(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||re("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Ic]=this.myID,e[kc]=this.myPW,e[Cc]=this.currentSerial;let t=this.urlFn(e),s="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Rc+s.length<=Ac;){const o=this.pendingSegs.shift();s=s+"&"+ip+i+"="+o.seg+"&"+rp+i+"="+o.ts+"&"+op+i+"="+o.d,i++}return t=t+s,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,s){this.pendingSegs.push({seg:e,ts:t,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const s=()=>{this.outstandingRequests.delete(t),this.newRequest_()},i=setTimeout(s,Math.floor(cp)),r=()=>{clearTimeout(i),s()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const i=s.readyState;(!i||i==="loaded"||i==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),t())},s.onerror=()=>{re("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
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
 */const hp=16384,dp=45e3;let Rs=null;typeof MozWebSocket<"u"?Rs=MozWebSocket:typeof WebSocket<"u"&&(Rs=WebSocket);class Se{constructor(e,t,s,i,r,o,a){this.connId=e,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=ts(this.connId),this.stats_=Jr(t),this.connURL=Se.connectionURL_(t,o,a,i,s),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,s,i,r){const o={};return o[pc]=Gr,typeof location<"u"&&location.hostname&&yc.test(location.hostname)&&(o[_c]=mc),t&&(o[gc]=t),s&&(o[vc]=s),i&&(o[ur]=i),r&&(o[wc]=r),Tc(e,bc,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Et.set("previous_websocket_failure",!0);try{let s;Gh(),this.mySock=new Rs(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){Se.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(t);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&Rs!==null&&!Se.forceDisallow_}static previouslyFailed(){return Et.isInMemoryStorage||Et.get("previous_websocket_failure")===!0}markConnectionHealthy(){Et.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const s=Fn(t);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(T(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const s=this.extractFrameCount_(t);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const t=te(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const s=dc(t,hp);s.length>1&&this.sendString_(String(s.length));for(let i=0;i<s.length;i++)this.sendString_(s[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(dp))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Se.responsesRequiredToBeHealthy=2;Se.healthyTimeout=3e4;/**
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
 */class Bn{static get ALL_TRANSPORTS(){return[Jt,Se]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=Se&&Se.isAvailable();let s=t&&!Se.previouslyFailed();if(e.webSocketOnly&&(t||ce("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[Se];else{const i=this.transports_=[];for(const r of Bn.ALL_TRANSPORTS)r&&r.isAvailable()&&i.push(r);Bn.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Bn.globalTransportInitialized_=!1;/**
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
 */const fp=6e4,pp=5e3,gp=10*1024,_p=100*1024,Li="t",wa="d",mp="s",ba="r",yp="e",Ea="o",Sa="a",Ta="n",Ia="p",vp="h";class wp{constructor(e,t,s,i,r,o,a,l,c,u){this.id=e,this.repoInfo_=t,this.applicationId_=s,this.appCheckToken_=i,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=ts("c:"+this.id+":"),this.transportManager_=new Bn(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,s)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=Cn(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>_p?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>gp?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Li in e){const t=e[Li];t===Sa?this.upgradeIfSecondaryHealthy_():t===ba?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===Ea&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=mn("t",e),s=mn("d",e);if(t==="c")this.onSecondaryControl_(s);else if(t==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Ia,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Sa,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Ta,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=mn("t",e),s=mn("d",e);t==="c"?this.onControl_(s):t==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=mn(Li,e);if(wa in e){const s=e[wa];if(t===vp){const i={...s};this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(t===Ta){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===mp?this.onConnectionShutdown_(s):t===ba?this.onReset_(s):t===yp?cr("Server Error: "+s):t===Ea?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):cr("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,s=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),Gr!==s&&ce("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,s),Cn(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(fp))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Cn(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(pp))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Ia,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Et.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
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
 */class Pc{put(e,t,s,i){}merge(e,t,s,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,s){}onDisconnectMerge(e,t,s){}onDisconnectCancel(e,t){}reportStats(e){}}/**
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
 */class Oc{constructor(e){this.allowedEvents_=e,this.listeners_={},T(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let i=0;i<s.length;i++)s[i].callback.apply(s[i].context,t)}}on(e,t,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:s});const i=this.getInitialEvent(e);i&&t.apply(s,i)}off(e,t,s){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let r=0;r<i.length;r++)if(i[r].callback===t&&(!s||s===i[r].context)){i.splice(r,1);return}}validateEventType_(e){T(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
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
 */class Ps extends Oc{static getInstance(){return new Ps}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Jl()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return T(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
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
 */const ka=32,Ca=768;class V{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let s=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[s]=this.pieces_[i],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function W(){return new V("")}function D(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function lt(n){return n.pieces_.length-n.pieceNum_}function K(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new V(n.pieces_,e)}function Qr(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function bp(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function Un(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Nc(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new V(e,0)}function J(n,e){const t=[];for(let s=n.pieceNum_;s<n.pieces_.length;s++)t.push(n.pieces_[s]);if(e instanceof V)for(let s=e.pieceNum_;s<e.pieces_.length;s++)t.push(e.pieces_[s]);else{const s=e.split("/");for(let i=0;i<s.length;i++)s[i].length>0&&t.push(s[i])}return new V(t,0)}function M(n){return n.pieceNum_>=n.pieces_.length}function le(n,e){const t=D(n),s=D(e);if(t===null)return e;if(t===s)return le(K(n),K(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function Ep(n,e){const t=Un(n,0),s=Un(e,0);for(let i=0;i<t.length&&i<s.length;i++){const r=Mt(t[i],s[i]);if(r!==0)return r}return t.length===s.length?0:t.length<s.length?-1:1}function Xr(n,e){if(lt(n)!==lt(e))return!1;for(let t=n.pieceNum_,s=e.pieceNum_;t<=n.pieces_.length;t++,s++)if(n.pieces_[t]!==e.pieces_[s])return!1;return!0}function me(n,e){let t=n.pieceNum_,s=e.pieceNum_;if(lt(n)>lt(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[s])return!1;++t,++s}return!0}class Sp{constructor(e,t){this.errorPrefix_=t,this.parts_=Un(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=Zs(this.parts_[s]);xc(this)}}function Tp(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=Zs(e),xc(n)}function Ip(n){const e=n.parts_.pop();n.byteLength_-=Zs(e),n.parts_.length>0&&(n.byteLength_-=1)}function xc(n){if(n.byteLength_>Ca)throw new Error(n.errorPrefix_+"has a key path longer than "+Ca+" bytes ("+n.byteLength_+").");if(n.parts_.length>ka)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+ka+") or object contains a cycle "+yt(n))}function yt(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
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
 */class Zr extends Oc{static getInstance(){return new Zr}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}getInitialEvent(e){return T(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
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
 */const yn=1e3,kp=60*5*1e3,Aa=30*1e3,Cp=1.3,Ap=3e4,Rp="server_kill",Ra=3;class Ge extends Pc{constructor(e,t,s,i,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=s,this.onConnectStatus_=i,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=Ge.nextPersistentConnectionId_++,this.log_=ts("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=yn,this.maxReconnectDelay_=kp,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Zr.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Ps.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,s){const i=++this.requestNumber_,r={r:i,a:e,b:t};this.log_(te(r)),T(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),s&&(this.requestCBHash_[i]=s)}get(e){this.initConnection_();const t=new cn,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,s,i){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),T(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),T(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:i,hashFn:t,query:e,tag:s};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(s)})}sendListen_(e){const t=e.query,s=t._path.toString(),i=t._queryIdentifier;this.log_("Listen on "+s+" for "+i);const r={p:s},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;Ge.warnOnListenWarnings_(l,t),(this.listens.get(s)&&this.listens.get(s).get(i))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(s,i),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&Oe(e,"w")){const s=At(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const i='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();ce(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||ed(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Aa)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=Zh(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(t,s,i=>{const r=i.s,o=i.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,s=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,s)})}unlisten(e,t){const s=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+i),T(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,i)&&this.connected_&&this.sendUnlisten_(s,i,e._queryObject,t)}sendUnlisten_(e,t,s,i){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";i&&(r.q=s,r.t=i),this.sendRequest(o,r)}onDisconnectPut(e,t,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:s})}onDisconnectMerge(e,t,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:s})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,s,i){const r={p:t,d:s};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,t,s,i){this.putInternal("p",e,t,s,i)}merge(e,t,s,i){this.putInternal("m",e,t,s,i)}putInternal(e,t,s,i,r){this.initConnection_();const o={p:t,d:s};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,s,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,s=>{if(s.s!=="ok"){const r=s.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+te(e));const t=e.r,s=this.requestCBHash_[t];s&&(delete this.requestCBHash_[t],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):cr("Unrecognized action received from server: "+te(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){T(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=yn,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=yn,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Ap&&(this.reconnectDelay_=yn),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Cp)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+Ge.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,s())},c=function(h){T(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(h)};this.realtime_={close:l,sendRequest:c};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[h,d]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?re("getToken() completed but was canceled"):(re("getToken() completed. Creating connection."),this.authToken_=h&&h.accessToken,this.appCheckToken_=d&&d.token,a=new wp(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,s,v=>{ce(v+" ("+this.repoInfo_.toString()+")"),this.interrupt(Rp)},r))}catch(h){this.log_("Failed to get token: "+h),o||(this.repoInfo_.nodeAdmin&&ce(h),l())}}}interrupt(e){re("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){re("Resuming connection for reason: "+e),delete this.interruptReasons_[e],zo(this.interruptReasons_)&&(this.reconnectDelay_=yn,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let s;t?s=t.map(r=>Kr(r)).join("$"):s="default";const i=this.removeListen_(e,s);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,t){const s=new V(e).toString();let i;if(this.listens.has(s)){const r=this.listens.get(s);i=r.get(t),r.delete(t),r.size===0&&this.listens.delete(s)}else i=void 0;return i}onAuthRevoked_(e,t){re("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Ra&&(this.reconnectDelay_=Aa,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){re("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Ra&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+lc.replace(/\./g,"-")]=1,Jl()?e["framework.cordova"]=1:Kh()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Ps.getInstance().currentlyOnline();return zo(this.interruptReasons_)&&e}}Ge.nextPersistentConnectionId_=0;Ge.nextConnectionId_=0;/**
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
 */class ni{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const s=new $(Pt,e),i=new $(Pt,t);return this.compare(s,i)!==0}minPost(){return $.MIN}}/**
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
 */let hs;class Dc extends ni{static get __EMPTY_NODE(){return hs}static set __EMPTY_NODE(e){hs=e}compare(e,t){return Mt(e.name,t.name)}isDefinedOn(e){throw ln("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return $.MIN}maxPost(){return new $(at,hs)}makePost(e,t){return T(typeof e=="string","KeyIndex indexValue must always be a string."),new $(e,hs)}toString(){return".key"}}const Ct=new Dc;/**
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
 */class ds{constructor(e,t,s,i,r=null){this.isReverse_=i,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?s(e.key,t):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class ie{constructor(e,t,s,i,r){this.key=e,this.value=t,this.color=s??ie.RED,this.left=i??de.EMPTY_NODE,this.right=r??de.EMPTY_NODE}copy(e,t,s,i,r){return new ie(e??this.key,t??this.value,s??this.color,i??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,s){let i=this;const r=s(e,i.key);return r<0?i=i.copy(null,null,null,i.left.insert(e,t,s),null):r===0?i=i.copy(null,t,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,t,s)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return de.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let s,i;if(s=this,t(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),t(e,s.key)===0){if(s.right.isEmpty())return de.EMPTY_NODE;i=s.right.min_(),s=s.copy(i.key,i.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,ie.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,ie.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}ie.RED=!0;ie.BLACK=!1;class Pp{copy(e,t,s,i,r){return this}insert(e,t,s){return new ie(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class de{constructor(e,t=de.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new de(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,ie.BLACK,null,null))}remove(e){return new de(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,ie.BLACK,null,null))}get(e){let t,s=this.root_;for(;!s.isEmpty();){if(t=this.comparator_(e,s.key),t===0)return s.value;t<0?s=s.left:t>0&&(s=s.right)}return null}getPredecessorKey(e){let t,s=this.root_,i=null;for(;!s.isEmpty();)if(t=this.comparator_(e,s.key),t===0){if(s.left.isEmpty())return i?i.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else t<0?s=s.left:t>0&&(i=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new ds(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new ds(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new ds(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new ds(this.root_,null,this.comparator_,!0,e)}}de.EMPTY_NODE=new Pp;/**
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
 */function Op(n,e){return Mt(n.name,e.name)}function eo(n,e){return Mt(n,e)}/**
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
 */let hr;function Np(n){hr=n}const Lc=function(n){return typeof n=="number"?"number:"+fc(n):"string:"+n},Mc=function(n){if(n.isLeafNode()){const e=n.val();T(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Oe(e,".sv"),"Priority must be a string or number.")}else T(n===hr||n.isEmpty(),"priority of unexpected type.");T(n===hr||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
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
 */let Pa;class se{static set __childrenNodeConstructor(e){Pa=e}static get __childrenNodeConstructor(){return Pa}constructor(e,t=se.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,T(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Mc(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new se(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:se.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return M(e)?this:D(e)===".priority"?this.priorityNode_:se.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:se.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const s=D(e);return s===null?t:t.isEmpty()&&s!==".priority"?this:(T(s!==".priority"||lt(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,se.__childrenNodeConstructor.EMPTY_NODE.updateChild(K(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Lc(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=fc(this.value_):e+=this.value_,this.lazyHash_=hc(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===se.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof se.__childrenNodeConstructor?-1:(T(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,s=typeof this.value_,i=se.VALUE_TYPE_ORDER.indexOf(t),r=se.VALUE_TYPE_ORDER.indexOf(s);return T(i>=0,"Unknown leaf type: "+t),T(r>=0,"Unknown leaf type: "+s),i===r?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}se.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
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
 */let $c,Fc;function xp(n){$c=n}function Dp(n){Fc=n}class Lp extends ni{compare(e,t){const s=e.node.getPriority(),i=t.node.getPriority(),r=s.compareTo(i);return r===0?Mt(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return $.MIN}maxPost(){return new $(at,new se("[PRIORITY-POST]",Fc))}makePost(e,t){const s=$c(e);return new $(t,new se("[PRIORITY-POST]",s))}toString(){return".priority"}}const G=new Lp;/**
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
 */const Mp=Math.log(2);class $p{constructor(e){const t=r=>parseInt(Math.log(r)/Mp,10),s=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const i=s(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Os=function(n,e,t,s){n.sort(e);const i=function(l,c){const u=c-l;let h,d;if(u===0)return null;if(u===1)return h=n[l],d=t?t(h):h,new ie(d,h.node,ie.BLACK,null,null);{const v=parseInt(u/2,10)+l,b=i(l,v),S=i(v+1,c);return h=n[v],d=t?t(h):h,new ie(d,h.node,ie.BLACK,b,S)}},r=function(l){let c=null,u=null,h=n.length;const d=function(b,S){const E=h-b,C=h;h-=b;const U=i(E+1,C),I=n[E],R=t?t(I):I;v(new ie(R,I.node,S,null,U))},v=function(b){c?(c.left=b,c=b):(u=b,c=b)};for(let b=0;b<l.count;++b){const S=l.nextBitIsOne(),E=Math.pow(2,l.count-(b+1));S?d(E,ie.BLACK):(d(E,ie.BLACK),d(E,ie.RED))}return u},o=new $p(n.length),a=r(o);return new de(s||e,a)};/**
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
 */let Mi;const Bt={};class ze{static get Default(){return T(Bt&&G,"ChildrenNode.ts has not been loaded"),Mi=Mi||new ze({".priority":Bt},{".priority":G}),Mi}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=At(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof de?t:null}hasIndex(e){return Oe(this.indexSet_,e.toString())}addIndex(e,t){T(e!==Ct,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let i=!1;const r=t.getIterator($.Wrap);let o=r.getNext();for(;o;)i=i||e.isDefinedOn(o.node),s.push(o),o=r.getNext();let a;i?a=Os(s,e.getCompare()):a=Bt;const l=e.toString(),c={...this.indexSet_};c[l]=e;const u={...this.indexes_};return u[l]=a,new ze(u,c)}addToIndexes(e,t){const s=Ts(this.indexes_,(i,r)=>{const o=At(this.indexSet_,r);if(T(o,"Missing index implementation for "+r),i===Bt)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator($.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),Os(a,o.getCompare())}else return Bt;else{const a=t.get(e.name);let l=i;return a&&(l=l.remove(new $(e.name,a))),l.insert(e,e.node)}});return new ze(s,this.indexSet_)}removeFromIndexes(e,t){const s=Ts(this.indexes_,i=>{if(i===Bt)return i;{const r=t.get(e.name);return r?i.remove(new $(e.name,r)):i}});return new ze(s,this.indexSet_)}}/**
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
 */let vn;class A{static get EMPTY_NODE(){return vn||(vn=new A(new de(eo),null,ze.Default))}constructor(e,t,s){this.children_=e,this.priorityNode_=t,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&Mc(this.priorityNode_),this.children_.isEmpty()&&T(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||vn}updatePriority(e){return this.children_.isEmpty()?this:new A(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?vn:t}}getChild(e){const t=D(e);return t===null?this:this.getImmediateChild(t).getChild(K(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(T(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const s=new $(e,t);let i,r;t.isEmpty()?(i=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(s,this.children_)):(i=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(s,this.children_));const o=i.isEmpty()?vn:this.priorityNode_;return new A(i,o,r)}}updateChild(e,t){const s=D(e);if(s===null)return t;{T(D(e)!==".priority"||lt(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(s).updateChild(K(e),t);return this.updateImmediateChild(s,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let s=0,i=0,r=!0;if(this.forEachChild(G,(o,a)=>{t[o]=a.val(e),s++,r&&A.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):r=!1}),!e&&r&&i<2*s){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Lc(this.getPriority().val())+":"),this.forEachChild(G,(t,s)=>{const i=s.hash();i!==""&&(e+=":"+t+":"+i)}),this.lazyHash_=e===""?"":hc(e)}return this.lazyHash_}getPredecessorChildName(e,t,s){const i=this.resolveIndex_(s);if(i){const r=i.getPredecessorKey(new $(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const s=t.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new $(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const s=t.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new $(t,this.children_.get(t)):null}forEachChild(e,t){const s=this.resolveIndex_(e);return s?s.inorderTraversal(i=>t(i.name,i.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const s=this.resolveIndex_(t);if(s)return s.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,$.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)<0;)i.getNext(),r=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const s=this.resolveIndex_(t);if(s)return s.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,$.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)>0;)i.getNext(),r=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===ns?-1:0}withIndex(e){if(e===Ct||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new A(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===Ct||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const s=this.getIterator(G),i=t.getIterator(G);let r=s.getNext(),o=i.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=s.getNext(),o=i.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Ct?null:this.indexMap_.get(e.toString())}}A.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Fp extends A{constructor(){super(new de(eo),A.EMPTY_NODE,ze.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return A.EMPTY_NODE}isEmpty(){return!1}}const ns=new Fp;Object.defineProperties($,{MIN:{value:new $(Pt,A.EMPTY_NODE)},MAX:{value:new $(at,ns)}});Dc.__EMPTY_NODE=A.EMPTY_NODE;se.__childrenNodeConstructor=A;Np(ns);Dp(ns);/**
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
 */const jp=!0;function Q(n,e=null){if(n===null)return A.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),T(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new se(t,Q(e))}if(!(n instanceof Array)&&jp){const t=[];let s=!1;if(ae(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=Q(a);l.isEmpty()||(s=s||!l.getPriority().isEmpty(),t.push(new $(o,l)))}}),t.length===0)return A.EMPTY_NODE;const r=Os(t,Op,o=>o.name,eo);if(s){const o=Os(t,G.getCompare());return new A(r,Q(e),new ze({".priority":o},{".priority":G}))}else return new A(r,Q(e),ze.Default)}else{let t=A.EMPTY_NODE;return ae(n,(s,i)=>{if(Oe(n,s)&&s.substring(0,1)!=="."){const r=Q(i);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(s,r))}}),t.updatePriority(Q(e))}}xp(Q);/**
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
 */class to extends ni{constructor(e){super(),this.indexPath_=e,T(!M(e)&&D(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const s=this.extractChild(e.node),i=this.extractChild(t.node),r=s.compareTo(i);return r===0?Mt(e.name,t.name):r}makePost(e,t){const s=Q(e),i=A.EMPTY_NODE.updateChild(this.indexPath_,s);return new $(t,i)}maxPost(){const e=A.EMPTY_NODE.updateChild(this.indexPath_,ns);return new $(at,e)}toString(){return Un(this.indexPath_,0).join("/")}}/**
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
 */class Bp extends ni{compare(e,t){const s=e.node.compareTo(t.node);return s===0?Mt(e.name,t.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return $.MIN}maxPost(){return $.MAX}makePost(e,t){const s=Q(e);return new $(t,s)}toString(){return".value"}}const jc=new Bp;/**
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
 */function Bc(n){return{type:"value",snapshotNode:n}}function Xt(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function Wn(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function Vn(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function Up(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
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
 */class no{constructor(e){this.index_=e}updateChild(e,t,s,i,r,o){T(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(i).equals(s.getChild(i))&&a.isEmpty()===s.isEmpty()||(o!=null&&(s.isEmpty()?e.hasChild(t)?o.trackChildChange(Wn(t,a)):T(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Xt(t,s)):o.trackChildChange(Vn(t,s,a))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(t,s).withIndex(this.index_)}updateFullNode(e,t,s){return s!=null&&(e.isLeafNode()||e.forEachChild(G,(i,r)=>{t.hasChild(i)||s.trackChildChange(Wn(i,r))}),t.isLeafNode()||t.forEachChild(G,(i,r)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(r)||s.trackChildChange(Vn(i,r,o))}else s.trackChildChange(Xt(i,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?A.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
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
 */class Hn{constructor(e){this.indexedFilter_=new no(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Hn.getStartPost_(e),this.endPost_=Hn.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&s}updateChild(e,t,s,i,r,o){return this.matches(new $(t,s))||(s=A.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,s,i,r,o)}updateFullNode(e,t,s){t.isLeafNode()&&(t=A.EMPTY_NODE);let i=t.withIndex(this.index_);i=i.updatePriority(A.EMPTY_NODE);const r=this;return t.forEachChild(G,(o,a)=>{r.matches(new $(o,a))||(i=i.updateImmediateChild(o,A.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,s)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
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
 */class Wp{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=t=>{const s=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new Hn(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,s,i,r,o){return this.rangedFilter_.matches(new $(t,s))||(s=A.EMPTY_NODE),e.getImmediateChild(t).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,s,i,r,o):this.fullLimitUpdateChild_(e,t,s,r,o)}updateFullNode(e,t,s){let i;if(t.isLeafNode()||t.isEmpty())i=A.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){i=A.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))i=i.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{i=t.withIndex(this.index_),i=i.updatePriority(A.EMPTY_NODE);let r;this.reverse_?r=i.getReverseIterator(this.index_):r=i.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:i=i.updateImmediateChild(a.name,A.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,s)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,s,i,r){let o;if(this.reverse_){const h=this.index_.getCompare();o=(d,v)=>h(v,d)}else o=this.index_.getCompare();const a=e;T(a.numChildren()===this.limit_,"");const l=new $(t,s),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(l);if(a.hasChild(t)){const h=a.getImmediateChild(t);let d=i.getChildAfterChild(this.index_,c,this.reverse_);for(;d!=null&&(d.name===t||a.hasChild(d.name));)d=i.getChildAfterChild(this.index_,d,this.reverse_);const v=d==null?1:o(d,l);if(u&&!s.isEmpty()&&v>=0)return r!=null&&r.trackChildChange(Vn(t,s,h)),a.updateImmediateChild(t,s);{r!=null&&r.trackChildChange(Wn(t,h));const S=a.updateImmediateChild(t,A.EMPTY_NODE);return d!=null&&this.rangedFilter_.matches(d)?(r!=null&&r.trackChildChange(Xt(d.name,d.node)),S.updateImmediateChild(d.name,d.node)):S}}else return s.isEmpty()?e:u&&o(c,l)>=0?(r!=null&&(r.trackChildChange(Wn(c.name,c.node)),r.trackChildChange(Xt(t,s))),a.updateImmediateChild(t,s).updateImmediateChild(c.name,A.EMPTY_NODE)):e}}/**
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
 */class so{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=G}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return T(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return T(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Pt}hasEnd(){return this.endSet_}getIndexEndValue(){return T(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return T(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:at}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return T(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===G}copy(){const e=new so;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Vp(n){return n.loadsAllData()?new no(n.getIndex()):n.hasLimit()?new Wp(n):new Hn(n)}function Hp(n,e){const t=n.copy();return t.limitSet_=!0,t.limit_=e,t.viewFrom_="r",t}function qp(n,e){const t=n.copy();return t.index_=e,t}function Oa(n){const e={};if(n.isDefault())return e;let t;if(n.index_===G?t="$priority":n.index_===jc?t="$value":n.index_===Ct?t="$key":(T(n.index_ instanceof to,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=te(t),n.startSet_){const s=n.startAfterSet_?"startAfter":"startAt";e[s]=te(n.indexStartValue_),n.startNameSet_&&(e[s]+=","+te(n.indexStartName_))}if(n.endSet_){const s=n.endBeforeSet_?"endBefore":"endAt";e[s]=te(n.indexEndValue_),n.endNameSet_&&(e[s]+=","+te(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Na(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==G&&(e.i=n.index_.toString()),e}/**
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
 */class Ns extends Pc{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(T(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,s,i){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=s,this.appCheckTokenProvider_=i,this.log_=ts("p:rest:"),this.listens_={}}listen(e,t,s,i){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Ns.getListenId_(e,s),a={};this.listens_[o]=a;const l=Oa(e._queryParams);this.restRequest_(r+".json",l,(c,u)=>{let h=u;if(c===404&&(h=null,c=null),c===null&&this.onDataUpdate_(r,h,!1,s),At(this.listens_,o)===a){let d;c?c===401?d="permission_denied":d="rest_error:"+c:d="ok",i(d,null)}})}unlisten(e,t){const s=Ns.getListenId_(e,t);delete this.listens_[s]}get(e){const t=Oa(e._queryParams),s=e._path.toString(),i=new cn;return this.restRequest_(s+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(s,a,!1,null),i.resolve(a)):i.reject(new Error(a))}),i.promise}refreshAuthToken(e){}restRequest_(e,t={},s){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,r])=>{i&&i.accessToken&&(t.auth=i.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+td(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(s&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=Fn(a.responseText)}catch{ce("Failed to parse JSON response for "+o+": "+a.responseText)}s(null,l)}else a.status!==401&&a.status!==404&&ce("Got unsuccessful REST response for "+o+" Status: "+a.status),s(a.status);s=null}},a.open("GET",o,!0),a.send()})}}/**
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
 */class zp{constructor(){this.rootNode_=A.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
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
 */function xs(){return{value:null,children:new Map}}function Uc(n,e,t){if(M(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const s=D(e);n.children.has(s)||n.children.set(s,xs());const i=n.children.get(s);e=K(e),Uc(i,e,t)}}function dr(n,e,t){n.value!==null?t(e,n.value):Kp(n,(s,i)=>{const r=new V(e.toString()+"/"+s);dr(i,r,t)})}function Kp(n,e){n.children.forEach((t,s)=>{e(s,t)})}/**
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
 */class Gp{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&ae(this.last_,(s,i)=>{t[s]=t[s]-i}),this.last_=e,t}}/**
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
 */const xa=10*1e3,Jp=30*1e3,Yp=5*60*1e3;class Qp{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new Gp(e);const s=xa+(Jp-xa)*Math.random();Cn(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),t={};let s=!1;ae(e,(i,r)=>{r>0&&Oe(this.statsToReport_,i)&&(t[i]=r,s=!0)}),s&&this.server_.reportStats(t),Cn(this.reportStats_.bind(this),Math.floor(Math.random()*2*Yp))}}/**
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
 */var Ie;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Ie||(Ie={}));function io(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function ro(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function oo(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
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
 */class Ds{constructor(e,t,s){this.path=e,this.affectedTree=t,this.revert=s,this.type=Ie.ACK_USER_WRITE,this.source=io()}operationForChild(e){if(M(this.path)){if(this.affectedTree.value!=null)return T(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new V(e));return new Ds(W(),t,this.revert)}}else return T(D(this.path)===e,"operationForChild called for unrelated child."),new Ds(K(this.path),this.affectedTree,this.revert)}}/**
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
 */class qn{constructor(e,t){this.source=e,this.path=t,this.type=Ie.LISTEN_COMPLETE}operationForChild(e){return M(this.path)?new qn(this.source,W()):new qn(this.source,K(this.path))}}/**
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
 */class Ot{constructor(e,t,s){this.source=e,this.path=t,this.snap=s,this.type=Ie.OVERWRITE}operationForChild(e){return M(this.path)?new Ot(this.source,W(),this.snap.getImmediateChild(e)):new Ot(this.source,K(this.path),this.snap)}}/**
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
 */class Zt{constructor(e,t,s){this.source=e,this.path=t,this.children=s,this.type=Ie.MERGE}operationForChild(e){if(M(this.path)){const t=this.children.subtree(new V(e));return t.isEmpty()?null:t.value?new Ot(this.source,W(),t.value):new Zt(this.source,W(),t)}else return T(D(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Zt(this.source,K(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
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
 */class ct{constructor(e,t,s){this.node_=e,this.fullyInitialized_=t,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(M(e))return this.isFullyInitialized()&&!this.filtered_;const t=D(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
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
 */class Xp{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Zp(n,e,t,s){const i=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Up(o.childName,o.snapshotNode))}),wn(n,i,"child_removed",e,s,t),wn(n,i,"child_added",e,s,t),wn(n,i,"child_moved",r,s,t),wn(n,i,"child_changed",e,s,t),wn(n,i,"value",e,s,t),i}function wn(n,e,t,s,i,r){const o=s.filter(a=>a.type===t);o.sort((a,l)=>tg(n,a,l)),o.forEach(a=>{const l=eg(n,a,r);i.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function eg(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function tg(n,e,t){if(e.childName==null||t.childName==null)throw ln("Should only compare child_ events.");const s=new $(e.childName,e.snapshotNode),i=new $(t.childName,t.snapshotNode);return n.index_.compare(s,i)}/**
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
 */function si(n,e){return{eventCache:n,serverCache:e}}function An(n,e,t,s){return si(new ct(e,t,s),n.serverCache)}function Wc(n,e,t,s){return si(n.eventCache,new ct(e,t,s))}function Ls(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function Nt(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
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
 */let $i;const ng=()=>($i||($i=new de(Bf)),$i);class z{static fromObject(e){let t=new z(null);return ae(e,(s,i)=>{t=t.set(new V(s),i)}),t}constructor(e,t=ng()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:W(),value:this.value};if(M(e))return null;{const s=D(e),i=this.children.get(s);if(i!==null){const r=i.findRootMostMatchingPathAndValue(K(e),t);return r!=null?{path:J(new V(s),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(M(e))return this;{const t=D(e),s=this.children.get(t);return s!==null?s.subtree(K(e)):new z(null)}}set(e,t){if(M(e))return new z(t,this.children);{const s=D(e),r=(this.children.get(s)||new z(null)).set(K(e),t),o=this.children.insert(s,r);return new z(this.value,o)}}remove(e){if(M(e))return this.children.isEmpty()?new z(null):new z(null,this.children);{const t=D(e),s=this.children.get(t);if(s){const i=s.remove(K(e));let r;return i.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,i),this.value===null&&r.isEmpty()?new z(null):new z(this.value,r)}else return this}}get(e){if(M(e))return this.value;{const t=D(e),s=this.children.get(t);return s?s.get(K(e)):null}}setTree(e,t){if(M(e))return t;{const s=D(e),r=(this.children.get(s)||new z(null)).setTree(K(e),t);let o;return r.isEmpty()?o=this.children.remove(s):o=this.children.insert(s,r),new z(this.value,o)}}fold(e){return this.fold_(W(),e)}fold_(e,t){const s={};return this.children.inorderTraversal((i,r)=>{s[i]=r.fold_(J(e,i),t)}),t(e,this.value,s)}findOnPath(e,t){return this.findOnPath_(e,W(),t)}findOnPath_(e,t,s){const i=this.value?s(t,this.value):!1;if(i)return i;if(M(e))return null;{const r=D(e),o=this.children.get(r);return o?o.findOnPath_(K(e),J(t,r),s):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,W(),t)}foreachOnPath_(e,t,s){if(M(e))return this;{this.value&&s(t,this.value);const i=D(e),r=this.children.get(i);return r?r.foreachOnPath_(K(e),J(t,i),s):new z(null)}}foreach(e){this.foreach_(W(),e)}foreach_(e,t){this.children.inorderTraversal((s,i)=>{i.foreach_(J(e,s),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,s)=>{s.value&&e(t,s.value)})}}/**
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
 */class Ae{constructor(e){this.writeTree_=e}static empty(){return new Ae(new z(null))}}function Rn(n,e,t){if(M(e))return new Ae(new z(t));{const s=n.writeTree_.findRootMostValueAndPath(e);if(s!=null){const i=s.path;let r=s.value;const o=le(i,e);return r=r.updateChild(o,t),new Ae(n.writeTree_.set(i,r))}else{const i=new z(t),r=n.writeTree_.setTree(e,i);return new Ae(r)}}}function fr(n,e,t){let s=n;return ae(t,(i,r)=>{s=Rn(s,J(e,i),r)}),s}function Da(n,e){if(M(e))return Ae.empty();{const t=n.writeTree_.setTree(e,new z(null));return new Ae(t)}}function pr(n,e){return $t(n,e)!=null}function $t(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(le(t.path,e)):null}function La(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(G,(s,i)=>{e.push(new $(s,i))}):n.writeTree_.children.inorderTraversal((s,i)=>{i.value!=null&&e.push(new $(s,i.value))}),e}function st(n,e){if(M(e))return n;{const t=$t(n,e);return t!=null?new Ae(new z(t)):new Ae(n.writeTree_.subtree(e))}}function gr(n){return n.writeTree_.isEmpty()}function en(n,e){return Vc(W(),n.writeTree_,e)}function Vc(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let s=null;return e.children.inorderTraversal((i,r)=>{i===".priority"?(T(r.value!==null,"Priority writes must always be leaf nodes"),s=r.value):t=Vc(J(n,i),r,t)}),!t.getChild(n).isEmpty()&&s!==null&&(t=t.updateChild(J(n,".priority"),s)),t}}/**
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
 */function ii(n,e){return Kc(e,n)}function sg(n,e,t,s,i){T(s>n.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),n.allWrites.push({path:e,snap:t,writeId:s,visible:i}),i&&(n.visibleWrites=Rn(n.visibleWrites,e,t)),n.lastWriteId=s}function ig(n,e,t,s){T(s>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:s,visible:!0}),n.visibleWrites=fr(n.visibleWrites,e,t),n.lastWriteId=s}function rg(n,e){for(let t=0;t<n.allWrites.length;t++){const s=n.allWrites[t];if(s.writeId===e)return s}return null}function og(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);T(t>=0,"removeWrite called with nonexistent writeId.");const s=n.allWrites[t];n.allWrites.splice(t,1);let i=s.visible,r=!1,o=n.allWrites.length-1;for(;i&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&ag(a,s.path)?i=!1:me(s.path,a.path)&&(r=!0)),o--}if(i){if(r)return lg(n),!0;if(s.snap)n.visibleWrites=Da(n.visibleWrites,s.path);else{const a=s.children;ae(a,l=>{n.visibleWrites=Da(n.visibleWrites,J(s.path,l))})}return!0}else return!1}function ag(n,e){if(n.snap)return me(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&me(J(n.path,t),e))return!0;return!1}function lg(n){n.visibleWrites=Hc(n.allWrites,cg,W()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function cg(n){return n.visible}function Hc(n,e,t){let s=Ae.empty();for(let i=0;i<n.length;++i){const r=n[i];if(e(r)){const o=r.path;let a;if(r.snap)me(t,o)?(a=le(t,o),s=Rn(s,a,r.snap)):me(o,t)&&(a=le(o,t),s=Rn(s,W(),r.snap.getChild(a)));else if(r.children){if(me(t,o))a=le(t,o),s=fr(s,a,r.children);else if(me(o,t))if(a=le(o,t),M(a))s=fr(s,W(),r.children);else{const l=At(r.children,D(a));if(l){const c=l.getChild(K(a));s=Rn(s,W(),c)}}}else throw ln("WriteRecord should have .snap or .children")}}return s}function qc(n,e,t,s,i){if(!s&&!i){const r=$t(n.visibleWrites,e);if(r!=null)return r;{const o=st(n.visibleWrites,e);if(gr(o))return t;if(t==null&&!pr(o,W()))return null;{const a=t||A.EMPTY_NODE;return en(o,a)}}}else{const r=st(n.visibleWrites,e);if(!i&&gr(r))return t;if(!i&&t==null&&!pr(r,W()))return null;{const o=function(c){return(c.visible||i)&&(!s||!~s.indexOf(c.writeId))&&(me(c.path,e)||me(e,c.path))},a=Hc(n.allWrites,o,e),l=t||A.EMPTY_NODE;return en(a,l)}}}function ug(n,e,t){let s=A.EMPTY_NODE;const i=$t(n.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(G,(r,o)=>{s=s.updateImmediateChild(r,o)}),s;if(t){const r=st(n.visibleWrites,e);return t.forEachChild(G,(o,a)=>{const l=en(st(r,new V(o)),a);s=s.updateImmediateChild(o,l)}),La(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const r=st(n.visibleWrites,e);return La(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function hg(n,e,t,s,i){T(s||i,"Either existingEventSnap or existingServerSnap must exist");const r=J(e,t);if(pr(n.visibleWrites,r))return null;{const o=st(n.visibleWrites,r);return gr(o)?i.getChild(t):en(o,i.getChild(t))}}function dg(n,e,t,s){const i=J(e,t),r=$t(n.visibleWrites,i);if(r!=null)return r;if(s.isCompleteForChild(t)){const o=st(n.visibleWrites,i);return en(o,s.getNode().getImmediateChild(t))}else return null}function fg(n,e){return $t(n.visibleWrites,e)}function pg(n,e,t,s,i,r,o){let a;const l=st(n.visibleWrites,e),c=$t(l,W());if(c!=null)a=c;else if(t!=null)a=en(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],h=o.getCompare(),d=r?a.getReverseIteratorFrom(s,o):a.getIteratorFrom(s,o);let v=d.getNext();for(;v&&u.length<i;)h(v,s)!==0&&u.push(v),v=d.getNext();return u}else return[]}function gg(){return{visibleWrites:Ae.empty(),allWrites:[],lastWriteId:-1}}function Ms(n,e,t,s){return qc(n.writeTree,n.treePath,e,t,s)}function ao(n,e){return ug(n.writeTree,n.treePath,e)}function Ma(n,e,t,s){return hg(n.writeTree,n.treePath,e,t,s)}function $s(n,e){return fg(n.writeTree,J(n.treePath,e))}function _g(n,e,t,s,i,r){return pg(n.writeTree,n.treePath,e,t,s,i,r)}function lo(n,e,t){return dg(n.writeTree,n.treePath,e,t)}function zc(n,e){return Kc(J(n.treePath,e),n.writeTree)}function Kc(n,e){return{treePath:n,writeTree:e}}/**
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
 */class mg{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,s=e.childName;T(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),T(s!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(s);if(i){const r=i.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(s,Vn(s,e.snapshotNode,i.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(s);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(s,Wn(s,i.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(s,Xt(s,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(s,Vn(s,e.snapshotNode,i.oldSnap));else throw ln("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
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
 */class yg{getCompleteChild(e){return null}getChildAfterChild(e,t,s){return null}}const Gc=new yg;class co{constructor(e,t,s=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=s}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new ct(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return lo(this.writes_,e,s)}}getChildAfterChild(e,t,s){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Nt(this.viewCache_),r=_g(this.writes_,i,t,1,s,e);return r.length===0?null:r[0]}}/**
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
 */function vg(n){return{filter:n}}function wg(n,e){T(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),T(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function bg(n,e,t,s,i){const r=new mg;let o,a;if(t.type===Ie.OVERWRITE){const c=t;c.source.fromUser?o=_r(n,e,c.path,c.snap,s,i,r):(T(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!M(c.path),o=Fs(n,e,c.path,c.snap,s,i,a,r))}else if(t.type===Ie.MERGE){const c=t;c.source.fromUser?o=Sg(n,e,c.path,c.children,s,i,r):(T(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=mr(n,e,c.path,c.children,s,i,a,r))}else if(t.type===Ie.ACK_USER_WRITE){const c=t;c.revert?o=kg(n,e,c.path,s,i,r):o=Tg(n,e,c.path,c.affectedTree,s,i,r)}else if(t.type===Ie.LISTEN_COMPLETE)o=Ig(n,e,t.path,s,r);else throw ln("Unknown operation type: "+t.type);const l=r.getChanges();return Eg(e,o,l),{viewCache:o,changes:l}}function Eg(n,e,t){const s=e.eventCache;if(s.isFullyInitialized()){const i=s.getNode().isLeafNode()||s.getNode().isEmpty(),r=Ls(n);(t.length>0||!n.eventCache.isFullyInitialized()||i&&!s.getNode().equals(r)||!s.getNode().getPriority().equals(r.getPriority()))&&t.push(Bc(Ls(e)))}}function Jc(n,e,t,s,i,r){const o=e.eventCache;if($s(s,t)!=null)return e;{let a,l;if(M(t))if(T(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=Nt(e),u=c instanceof A?c:A.EMPTY_NODE,h=ao(s,u);a=n.filter.updateFullNode(e.eventCache.getNode(),h,r)}else{const c=Ms(s,Nt(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=D(t);if(c===".priority"){T(lt(t)===1,"Can't have a priority with additional path components");const u=o.getNode();l=e.serverCache.getNode();const h=Ma(s,t,u,l);h!=null?a=n.filter.updatePriority(u,h):a=o.getNode()}else{const u=K(t);let h;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const d=Ma(s,t,o.getNode(),l);d!=null?h=o.getNode().getImmediateChild(c).updateChild(u,d):h=o.getNode().getImmediateChild(c)}else h=lo(s,c,e.serverCache);h!=null?a=n.filter.updateChild(o.getNode(),c,h,u,i,r):a=o.getNode()}}return An(e,a,o.isFullyInitialized()||M(t),n.filter.filtersNodes())}}function Fs(n,e,t,s,i,r,o,a){const l=e.serverCache;let c;const u=o?n.filter:n.filter.getIndexedFilter();if(M(t))c=u.updateFullNode(l.getNode(),s,null);else if(u.filtersNodes()&&!l.isFiltered()){const v=l.getNode().updateChild(t,s);c=u.updateFullNode(l.getNode(),v,null)}else{const v=D(t);if(!l.isCompleteForPath(t)&&lt(t)>1)return e;const b=K(t),E=l.getNode().getImmediateChild(v).updateChild(b,s);v===".priority"?c=u.updatePriority(l.getNode(),E):c=u.updateChild(l.getNode(),v,E,b,Gc,null)}const h=Wc(e,c,l.isFullyInitialized()||M(t),u.filtersNodes()),d=new co(i,h,r);return Jc(n,h,t,i,d,a)}function _r(n,e,t,s,i,r,o){const a=e.eventCache;let l,c;const u=new co(i,e,r);if(M(t))c=n.filter.updateFullNode(e.eventCache.getNode(),s,o),l=An(e,c,!0,n.filter.filtersNodes());else{const h=D(t);if(h===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),s),l=An(e,c,a.isFullyInitialized(),a.isFiltered());else{const d=K(t),v=a.getNode().getImmediateChild(h);let b;if(M(d))b=s;else{const S=u.getCompleteChild(h);S!=null?Qr(d)===".priority"&&S.getChild(Nc(d)).isEmpty()?b=S:b=S.updateChild(d,s):b=A.EMPTY_NODE}if(v.equals(b))l=e;else{const S=n.filter.updateChild(a.getNode(),h,b,d,u,o);l=An(e,S,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function $a(n,e){return n.eventCache.isCompleteForChild(e)}function Sg(n,e,t,s,i,r,o){let a=e;return s.foreach((l,c)=>{const u=J(t,l);$a(e,D(u))&&(a=_r(n,a,u,c,i,r,o))}),s.foreach((l,c)=>{const u=J(t,l);$a(e,D(u))||(a=_r(n,a,u,c,i,r,o))}),a}function Fa(n,e,t){return t.foreach((s,i)=>{e=e.updateChild(s,i)}),e}function mr(n,e,t,s,i,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;M(t)?c=s:c=new z(null).setTree(t,s);const u=e.serverCache.getNode();return c.children.inorderTraversal((h,d)=>{if(u.hasChild(h)){const v=e.serverCache.getNode().getImmediateChild(h),b=Fa(n,v,d);l=Fs(n,l,new V(h),b,i,r,o,a)}}),c.children.inorderTraversal((h,d)=>{const v=!e.serverCache.isCompleteForChild(h)&&d.value===null;if(!u.hasChild(h)&&!v){const b=e.serverCache.getNode().getImmediateChild(h),S=Fa(n,b,d);l=Fs(n,l,new V(h),S,i,r,o,a)}}),l}function Tg(n,e,t,s,i,r,o){if($s(i,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(s.value!=null){if(M(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return Fs(n,e,t,l.getNode().getChild(t),i,r,a,o);if(M(t)){let c=new z(null);return l.getNode().forEachChild(Ct,(u,h)=>{c=c.set(new V(u),h)}),mr(n,e,t,c,i,r,a,o)}else return e}else{let c=new z(null);return s.foreach((u,h)=>{const d=J(t,u);l.isCompleteForPath(d)&&(c=c.set(u,l.getNode().getChild(d)))}),mr(n,e,t,c,i,r,a,o)}}function Ig(n,e,t,s,i){const r=e.serverCache,o=Wc(e,r.getNode(),r.isFullyInitialized()||M(t),r.isFiltered());return Jc(n,o,t,s,Gc,i)}function kg(n,e,t,s,i,r){let o;if($s(s,t)!=null)return e;{const a=new co(s,e,i),l=e.eventCache.getNode();let c;if(M(t)||D(t)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=Ms(s,Nt(e));else{const h=e.serverCache.getNode();T(h instanceof A,"serverChildren would be complete if leaf node"),u=ao(s,h)}u=u,c=n.filter.updateFullNode(l,u,r)}else{const u=D(t);let h=lo(s,u,e.serverCache);h==null&&e.serverCache.isCompleteForChild(u)&&(h=l.getImmediateChild(u)),h!=null?c=n.filter.updateChild(l,u,h,K(t),a,r):e.eventCache.getNode().hasChild(u)?c=n.filter.updateChild(l,u,A.EMPTY_NODE,K(t),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Ms(s,Nt(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||$s(s,W())!=null,An(e,c,o,n.filter.filtersNodes())}}/**
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
 */class Cg{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,i=new no(s.getIndex()),r=Vp(s);this.processor_=vg(r);const o=t.serverCache,a=t.eventCache,l=i.updateFullNode(A.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(A.EMPTY_NODE,a.getNode(),null),u=new ct(l,o.isFullyInitialized(),i.filtersNodes()),h=new ct(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=si(h,u),this.eventGenerator_=new Xp(this.query_)}get query(){return this.query_}}function Ag(n){return n.viewCache_.serverCache.getNode()}function Rg(n){return Ls(n.viewCache_)}function Pg(n,e){const t=Nt(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!M(e)&&!t.getImmediateChild(D(e)).isEmpty())?t.getChild(e):null}function ja(n){return n.eventRegistrations_.length===0}function Og(n,e){n.eventRegistrations_.push(e)}function Ba(n,e,t){const s=[];if(t){T(e==null,"A cancel should cancel all event registrations.");const i=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,i);o&&s.push(o)})}if(e){let i=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=i}else n.eventRegistrations_=[];return s}function Ua(n,e,t,s){e.type===Ie.MERGE&&e.source.queryId!==null&&(T(Nt(n.viewCache_),"We should always have a full cache before handling merges"),T(Ls(n.viewCache_),"Missing event cache, even though we have a server cache"));const i=n.viewCache_,r=bg(n.processor_,i,e,t,s);return wg(n.processor_,r.viewCache),T(r.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,Yc(n,r.changes,r.viewCache.eventCache.getNode(),null)}function Ng(n,e){const t=n.viewCache_.eventCache,s=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(G,(r,o)=>{s.push(Xt(r,o))}),t.isFullyInitialized()&&s.push(Bc(t.getNode())),Yc(n,s,t.getNode(),e)}function Yc(n,e,t,s){const i=s?[s]:n.eventRegistrations_;return Zp(n.eventGenerator_,e,t,i)}/**
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
 */let js;class Qc{constructor(){this.views=new Map}}function xg(n){T(!js,"__referenceConstructor has already been defined"),js=n}function Dg(){return T(js,"Reference.ts has not been loaded"),js}function Lg(n){return n.views.size===0}function uo(n,e,t,s){const i=e.source.queryId;if(i!==null){const r=n.views.get(i);return T(r!=null,"SyncTree gave us an op for an invalid query."),Ua(r,e,t,s)}else{let r=[];for(const o of n.views.values())r=r.concat(Ua(o,e,t,s));return r}}function Xc(n,e,t,s,i){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=Ms(t,i?s:null),l=!1;a?l=!0:s instanceof A?(a=ao(t,s),l=!1):(a=A.EMPTY_NODE,l=!1);const c=si(new ct(a,l,!1),new ct(s,i,!1));return new Cg(e,c)}return o}function Mg(n,e,t,s,i,r){const o=Xc(n,e,s,i,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),Og(o,t),Ng(o,t)}function $g(n,e,t,s){const i=e._queryIdentifier,r=[];let o=[];const a=ut(n);if(i==="default")for(const[l,c]of n.views.entries())o=o.concat(Ba(c,t,s)),ja(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=n.views.get(i);l&&(o=o.concat(Ba(l,t,s)),ja(l)&&(n.views.delete(i),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!ut(n)&&r.push(new(Dg())(e._repo,e._path)),{removed:r,events:o}}function Zc(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function it(n,e){let t=null;for(const s of n.views.values())t=t||Pg(s,e);return t}function eu(n,e){if(e._queryParams.loadsAllData())return ri(n);{const s=e._queryIdentifier;return n.views.get(s)}}function tu(n,e){return eu(n,e)!=null}function ut(n){return ri(n)!=null}function ri(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
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
 */let Bs;function Fg(n){T(!Bs,"__referenceConstructor has already been defined"),Bs=n}function jg(){return T(Bs,"Reference.ts has not been loaded"),Bs}let Bg=1;class Wa{constructor(e){this.listenProvider_=e,this.syncPointTree_=new z(null),this.pendingWriteTree_=gg(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function ho(n,e,t,s,i){return sg(n.pendingWriteTree_,e,t,s,i),i?hn(n,new Ot(io(),e,t)):[]}function Ug(n,e,t,s){ig(n.pendingWriteTree_,e,t,s);const i=z.fromObject(t);return hn(n,new Zt(io(),e,i))}function tt(n,e,t=!1){const s=rg(n.pendingWriteTree_,e);if(og(n.pendingWriteTree_,e)){let r=new z(null);return s.snap!=null?r=r.set(W(),!0):ae(s.children,o=>{r=r.set(new V(o),!0)}),hn(n,new Ds(s.path,r,t))}else return[]}function ss(n,e,t){return hn(n,new Ot(ro(),e,t))}function Wg(n,e,t){const s=z.fromObject(t);return hn(n,new Zt(ro(),e,s))}function Vg(n,e){return hn(n,new qn(ro(),e))}function Hg(n,e,t){const s=fo(n,t);if(s){const i=po(s),r=i.path,o=i.queryId,a=le(r,e),l=new qn(oo(o),a);return go(n,r,l)}else return[]}function Us(n,e,t,s,i=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||tu(o,e))){const l=$g(o,e,t,s);Lg(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!i){const u=c.findIndex(d=>d._queryParams.loadsAllData())!==-1,h=n.syncPointTree_.findOnPath(r,(d,v)=>ut(v));if(u&&!h){const d=n.syncPointTree_.subtree(r);if(!d.isEmpty()){const v=Kg(d);for(let b=0;b<v.length;++b){const S=v[b],E=S.query,C=ru(n,S);n.listenProvider_.startListening(Pn(E),zn(n,E),C.hashFn,C.onComplete)}}}!h&&c.length>0&&!s&&(u?n.listenProvider_.stopListening(Pn(e),null):c.forEach(d=>{const v=n.queryToTagMap.get(ai(d));n.listenProvider_.stopListening(Pn(d),v)}))}Gg(n,c)}return a}function nu(n,e,t,s){const i=fo(n,s);if(i!=null){const r=po(i),o=r.path,a=r.queryId,l=le(o,e),c=new Ot(oo(a),l,t);return go(n,o,c)}else return[]}function qg(n,e,t,s){const i=fo(n,s);if(i){const r=po(i),o=r.path,a=r.queryId,l=le(o,e),c=z.fromObject(t),u=new Zt(oo(a),l,c);return go(n,o,u)}else return[]}function yr(n,e,t,s=!1){const i=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(i,(d,v)=>{const b=le(d,i);r=r||it(v,b),o=o||ut(v)});let a=n.syncPointTree_.get(i);a?(o=o||ut(a),r=r||it(a,W())):(a=new Qc,n.syncPointTree_=n.syncPointTree_.set(i,a));let l;r!=null?l=!0:(l=!1,r=A.EMPTY_NODE,n.syncPointTree_.subtree(i).foreachChild((v,b)=>{const S=it(b,W());S&&(r=r.updateImmediateChild(v,S))}));const c=tu(a,e);if(!c&&!e._queryParams.loadsAllData()){const d=ai(e);T(!n.queryToTagMap.has(d),"View does not exist, but we have a tag");const v=Jg();n.queryToTagMap.set(d,v),n.tagToQueryMap.set(v,d)}const u=ii(n.pendingWriteTree_,i);let h=Mg(a,e,t,u,r,l);if(!c&&!o&&!s){const d=eu(a,e);h=h.concat(Yg(n,e,d))}return h}function oi(n,e,t){const i=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=le(o,e),c=it(a,l);if(c)return c});return qc(i,e,r,t,!0)}function zg(n,e){const t=e._path;let s=null;n.syncPointTree_.foreachOnPath(t,(c,u)=>{const h=le(c,t);s=s||it(u,h)});let i=n.syncPointTree_.get(t);i?s=s||it(i,W()):(i=new Qc,n.syncPointTree_=n.syncPointTree_.set(t,i));const r=s!=null,o=r?new ct(s,!0,!1):null,a=ii(n.pendingWriteTree_,e._path),l=Xc(i,e,a,r?o.getNode():A.EMPTY_NODE,r);return Rg(l)}function hn(n,e){return su(e,n.syncPointTree_,null,ii(n.pendingWriteTree_,W()))}function su(n,e,t,s){if(M(n.path))return iu(n,e,t,s);{const i=e.get(W());t==null&&i!=null&&(t=it(i,W()));let r=[];const o=D(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,u=zc(s,o);r=r.concat(su(a,l,c,u))}return i&&(r=r.concat(uo(i,n,s,t))),r}}function iu(n,e,t,s){const i=e.get(W());t==null&&i!=null&&(t=it(i,W()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=zc(s,o),u=n.operationForChild(o);u&&(r=r.concat(iu(u,a,l,c)))}),i&&(r=r.concat(uo(i,n,s,t))),r}function ru(n,e){const t=e.query,s=zn(n,t);return{hashFn:()=>(Ag(e)||A.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return s?Hg(n,t._path,s):Vg(n,t._path);{const r=Vf(i,t);return Us(n,t,null,r)}}}}function zn(n,e){const t=ai(e);return n.queryToTagMap.get(t)}function ai(n){return n._path.toString()+"$"+n._queryIdentifier}function fo(n,e){return n.tagToQueryMap.get(e)}function po(n){const e=n.indexOf("$");return T(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new V(n.substr(0,e))}}function go(n,e,t){const s=n.syncPointTree_.get(e);T(s,"Missing sync point for query tag that we're tracking");const i=ii(n.pendingWriteTree_,e);return uo(s,t,i,null)}function Kg(n){return n.fold((e,t,s)=>{if(t&&ut(t))return[ri(t)];{let i=[];return t&&(i=Zc(t)),ae(s,(r,o)=>{i=i.concat(o)}),i}})}function Pn(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(jg())(n._repo,n._path):n}function Gg(n,e){for(let t=0;t<e.length;++t){const s=e[t];if(!s._queryParams.loadsAllData()){const i=ai(s),r=n.queryToTagMap.get(i);n.queryToTagMap.delete(i),n.tagToQueryMap.delete(r)}}}function Jg(){return Bg++}function Yg(n,e,t){const s=e._path,i=zn(n,e),r=ru(n,t),o=n.listenProvider_.startListening(Pn(e),i,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(s);if(i)T(!ut(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,u,h)=>{if(!M(c)&&u&&ut(u))return[ri(u).query];{let d=[];return u&&(d=d.concat(Zc(u).map(v=>v.query))),ae(h,(v,b)=>{d=d.concat(b)}),d}});for(let c=0;c<l.length;++c){const u=l[c];n.listenProvider_.stopListening(Pn(u),zn(n,u))}}return o}/**
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
 */class _o{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new _o(t)}node(){return this.node_}}class mo{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=J(this.path_,e);return new mo(this.syncTree_,t)}node(){return oi(this.syncTree_,this.path_)}}const Qg=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Va=function(n,e,t){if(!n||typeof n!="object")return n;if(T(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return Xg(n[".sv"],e,t);if(typeof n[".sv"]=="object")return Zg(n[".sv"],e);T(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},Xg=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:T(!1,"Unexpected server value: "+n)}},Zg=function(n,e,t){n.hasOwnProperty("increment")||T(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const s=n.increment;typeof s!="number"&&T(!1,"Unexpected increment value: "+s);const i=e.node();if(T(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return s;const o=i.getValue();return typeof o!="number"?s:o+s},ou=function(n,e,t,s){return vo(e,new mo(t,n),s)},yo=function(n,e,t){return vo(n,new _o(e),t)};function vo(n,e,t){const s=n.getPriority().val(),i=Va(s,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=Va(o.getValue(),e,t);return a!==o.getValue()||i!==o.getPriority().val()?new se(a,Q(i)):n}else{const o=n;return r=o,i!==o.getPriority().val()&&(r=r.updatePriority(new se(i))),o.forEachChild(G,(a,l)=>{const c=vo(l,e.getImmediateChild(a),t);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
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
 */class wo{constructor(e="",t=null,s={children:{},childCount:0}){this.name=e,this.parent=t,this.node=s}}function li(n,e){let t=e instanceof V?e:new V(e),s=n,i=D(t);for(;i!==null;){const r=At(s.node.children,i)||{children:{},childCount:0};s=new wo(i,s,r),t=K(t),i=D(t)}return s}function Ft(n){return n.node.value}function bo(n,e){n.node.value=e,vr(n)}function au(n){return n.node.childCount>0}function e_(n){return Ft(n)===void 0&&!au(n)}function ci(n,e){ae(n.node.children,(t,s)=>{e(new wo(t,n,s))})}function lu(n,e,t,s){t&&e(n),ci(n,i=>{lu(i,e,!0)})}function t_(n,e,t){let s=n.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function is(n){return new V(n.parent===null?n.name:is(n.parent)+"/"+n.name)}function vr(n){n.parent!==null&&n_(n.parent,n.name,n)}function n_(n,e,t){const s=e_(t),i=Oe(n.node.children,e);s&&i?(delete n.node.children[e],n.node.childCount--,vr(n)):!s&&!i&&(n.node.children[e]=t.node,n.node.childCount++,vr(n))}/**
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
 */const s_=/[\[\].#$\/\u0000-\u001F\u007F]/,i_=/[\[\].#$\u0000-\u001F\u007F]/,Fi=10*1024*1024,Eo=function(n){return typeof n=="string"&&n.length!==0&&!s_.test(n)},cu=function(n){return typeof n=="string"&&n.length!==0&&!i_.test(n)},r_=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),cu(n)},Ws=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!zr(n)||n&&typeof n=="object"&&Oe(n,".sv")},uu=function(n,e,t,s){s&&e===void 0||rs(Xs(n,"value"),e,t)},rs=function(n,e,t){const s=t instanceof V?new Sp(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+yt(s));if(typeof e=="function")throw new Error(n+"contains a function "+yt(s)+" with contents = "+e.toString());if(zr(e))throw new Error(n+"contains "+e.toString()+" "+yt(s));if(typeof e=="string"&&e.length>Fi/3&&Zs(e)>Fi)throw new Error(n+"contains a string greater than "+Fi+" utf8 bytes "+yt(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,r=!1;if(ae(e,(o,a)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Eo(o)))throw new Error(n+" contains an invalid key ("+o+") "+yt(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Tp(s,o),rs(n,a,s),Ip(s)}),i&&r)throw new Error(n+' contains ".value" child '+yt(s)+" in addition to actual children.")}},o_=function(n,e){let t,s;for(t=0;t<e.length;t++){s=e[t];const r=Un(s);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!Eo(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+s.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(Ep);let i=null;for(t=0;t<e.length;t++){if(s=e[t],i!==null&&me(i,s))throw new Error(n+"contains a path "+i.toString()+" that is ancestor of another path "+s.toString());i=s}},a_=function(n,e,t,s){const i=Xs(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(i+" must be an object containing the children to replace.");const r=[];ae(e,(o,a)=>{const l=new V(o);if(rs(i,a,J(t,l)),Qr(l)===".priority"&&!Ws(a))throw new Error(i+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),o_(i,r)},So=function(n,e,t,s){if(!cu(t))throw new Error(Xs(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},l_=function(n,e,t,s){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),So(n,e,t)},ui=function(n,e){if(D(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},c_=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Eo(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!r_(t))throw new Error(Xs(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
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
 */class u_{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function hi(n,e){let t=null;for(let s=0;s<e.length;s++){const i=e[s],r=i.getPath();t!==null&&!Xr(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(i)}t&&n.eventLists_.push(t)}function hu(n,e,t){hi(n,t),du(n,s=>Xr(s,e))}function ge(n,e,t){hi(n,t),du(n,s=>me(s,e)||me(e,s))}function du(n,e){n.recursionDepth_++;let t=!0;for(let s=0;s<n.eventLists_.length;s++){const i=n.eventLists_[s];if(i){const r=i.path;e(r)?(h_(n.eventLists_[s]),n.eventLists_[s]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function h_(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const s=t.getEventRunner();kn&&re("event: "+t.toString()),un(s)}}}/**
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
 */const d_="repo_interrupt",f_=25;class p_{constructor(e,t,s,i){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=s,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new u_,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=xs(),this.transactionQueueTree_=new wo,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function g_(n,e,t){if(n.stats_=Jr(n.repoInfo_),n.forceRestClient_||Kf())n.server_=new Ns(n.repoInfo_,(s,i,r,o)=>{Ha(n,s,i,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>qa(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{te(t)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}n.persistentConnection_=new Ge(n.repoInfo_,e,(s,i,r,o)=>{Ha(n,s,i,r,o)},s=>{qa(n,s)},s=>{__(n,s)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(s=>{n.server_.refreshAuthToken(s)}),n.appCheckProvider_.addTokenChangeListener(s=>{n.server_.refreshAppCheckToken(s.token)}),n.statsReporter_=Xf(n.repoInfo_,()=>new Qp(n.stats_,n.server_)),n.infoData_=new zp,n.infoSyncTree_=new Wa({startListening:(s,i,r,o)=>{let a=[];const l=n.infoData_.getNode(s._path);return l.isEmpty()||(a=ss(n.infoSyncTree_,s._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),To(n,"connected",!1),n.serverSyncTree_=new Wa({startListening:(s,i,r,o)=>(n.server_.listen(s,r,i,(a,l)=>{const c=o(a,l);ge(n.eventQueue_,s._path,c)}),[]),stopListening:(s,i)=>{n.server_.unlisten(s,i)}})}function fu(n){const t=n.infoData_.getNode(new V(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function os(n){return Qg({timestamp:fu(n)})}function Ha(n,e,t,s,i){n.dataUpdateCount++;const r=new V(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(i)if(s){const l=Ts(t,c=>Q(c));o=qg(n.serverSyncTree_,r,l,i)}else{const l=Q(t);o=nu(n.serverSyncTree_,r,l,i)}else if(s){const l=Ts(t,c=>Q(c));o=Wg(n.serverSyncTree_,r,l)}else{const l=Q(t);o=ss(n.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=tn(n,r)),ge(n.eventQueue_,a,o)}function qa(n,e){To(n,"connected",e),e===!1&&w_(n)}function __(n,e){ae(e,(t,s)=>{To(n,t,s)})}function To(n,e,t){const s=new V("/.info/"+e),i=Q(t);n.infoData_.updateSnapshot(s,i);const r=ss(n.infoSyncTree_,s,i);ge(n.eventQueue_,s,r)}function di(n){return n.nextWriteId_++}function m_(n,e,t){const s=zg(n.serverSyncTree_,e);return s!=null?Promise.resolve(s):n.server_.get(e).then(i=>{const r=Q(i).withIndex(e._queryParams.getIndex());yr(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=ss(n.serverSyncTree_,e._path,r);else{const a=zn(n.serverSyncTree_,e);o=nu(n.serverSyncTree_,e._path,r,a)}return ge(n.eventQueue_,e._path,o),Us(n.serverSyncTree_,e,t,null,!0),r},i=>(dn(n,"get for query "+te(e)+" failed: "+i),Promise.reject(new Error(i))))}function y_(n,e,t,s,i){dn(n,"set",{path:e.toString(),value:t,priority:s});const r=os(n),o=Q(t,s),a=oi(n.serverSyncTree_,e),l=yo(o,a,r),c=di(n),u=ho(n.serverSyncTree_,e,l,c,!0);hi(n.eventQueue_,u),n.server_.put(e.toString(),o.val(!0),(d,v)=>{const b=d==="ok";b||ce("set at "+e+" failed: "+d);const S=tt(n.serverSyncTree_,c,!b);ge(n.eventQueue_,e,S),wr(n,i,d,v)});const h=ko(n,e);tn(n,h),ge(n.eventQueue_,h,[])}function v_(n,e,t,s){dn(n,"update",{path:e.toString(),value:t});let i=!0;const r=os(n),o={};if(ae(t,(a,l)=>{i=!1,o[a]=ou(J(e,a),Q(l),n.serverSyncTree_,r)}),i)re("update() called with empty data.  Don't do anything."),wr(n,s,"ok",void 0);else{const a=di(n),l=Ug(n.serverSyncTree_,e,o,a);hi(n.eventQueue_,l),n.server_.merge(e.toString(),t,(c,u)=>{const h=c==="ok";h||ce("update at "+e+" failed: "+c);const d=tt(n.serverSyncTree_,a,!h),v=d.length>0?tn(n,e):e;ge(n.eventQueue_,v,d),wr(n,s,c,u)}),ae(t,c=>{const u=ko(n,J(e,c));tn(n,u)}),ge(n.eventQueue_,e,[])}}function w_(n){dn(n,"onDisconnectEvents");const e=os(n),t=xs();dr(n.onDisconnect_,W(),(i,r)=>{const o=ou(i,r,n.serverSyncTree_,e);Uc(t,i,o)});let s=[];dr(t,W(),(i,r)=>{s=s.concat(ss(n.serverSyncTree_,i,r));const o=ko(n,i);tn(n,o)}),n.onDisconnect_=xs(),ge(n.eventQueue_,W(),s)}function b_(n,e,t){let s;D(e._path)===".info"?s=yr(n.infoSyncTree_,e,t):s=yr(n.serverSyncTree_,e,t),hu(n.eventQueue_,e._path,s)}function E_(n,e,t){let s;D(e._path)===".info"?s=Us(n.infoSyncTree_,e,t):s=Us(n.serverSyncTree_,e,t),hu(n.eventQueue_,e._path,s)}function S_(n){n.persistentConnection_&&n.persistentConnection_.interrupt(d_)}function dn(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),re(t,...e)}function wr(n,e,t,s){e&&un(()=>{if(t==="ok")e(null);else{const i=(t||"error").toUpperCase();let r=i;s&&(r+=": "+s);const o=new Error(r);o.code=i,e(o)}})}function T_(n,e,t,s,i,r){dn(n,"transaction on "+e);const o={path:e,update:t,onComplete:s,status:null,order:uc(),applyLocally:r,retryCount:0,unwatcher:i,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},a=Io(n,e,void 0);o.currentInputSnapshot=a;const l=o.update(a.val());if(l===void 0)o.unwatcher(),o.currentOutputSnapshotRaw=null,o.currentOutputSnapshotResolved=null,o.onComplete&&o.onComplete(null,!1,o.currentInputSnapshot);else{rs("transaction failed: Data returned ",l,o.path),o.status=0;const c=li(n.transactionQueueTree_,e),u=Ft(c)||[];u.push(o),bo(c,u);let h;typeof l=="object"&&l!==null&&Oe(l,".priority")?(h=At(l,".priority"),T(Ws(h),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):h=(oi(n.serverSyncTree_,e)||A.EMPTY_NODE).getPriority().val();const d=os(n),v=Q(l,h),b=yo(v,a,d);o.currentOutputSnapshotRaw=v,o.currentOutputSnapshotResolved=b,o.currentWriteId=di(n);const S=ho(n.serverSyncTree_,e,b,o.currentWriteId,o.applyLocally);ge(n.eventQueue_,e,S),fi(n,n.transactionQueueTree_)}}function Io(n,e,t){return oi(n.serverSyncTree_,e,t)||A.EMPTY_NODE}function fi(n,e=n.transactionQueueTree_){if(e||pi(n,e),Ft(e)){const t=gu(n,e);T(t.length>0,"Sending zero length transaction queue"),t.every(i=>i.status===0)&&I_(n,is(e),t)}else au(e)&&ci(e,t=>{fi(n,t)})}function I_(n,e,t){const s=t.map(c=>c.currentWriteId),i=Io(n,e,s);let r=i;const o=i.hash();for(let c=0;c<t.length;c++){const u=t[c];T(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const h=le(e,u.path);r=r.updateChild(h,u.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;n.server_.put(l.toString(),a,c=>{dn(n,"transaction put response",{path:l.toString(),status:c});let u=[];if(c==="ok"){const h=[];for(let d=0;d<t.length;d++)t[d].status=2,u=u.concat(tt(n.serverSyncTree_,t[d].currentWriteId)),t[d].onComplete&&h.push(()=>t[d].onComplete(null,!0,t[d].currentOutputSnapshotResolved)),t[d].unwatcher();pi(n,li(n.transactionQueueTree_,e)),fi(n,n.transactionQueueTree_),ge(n.eventQueue_,e,u);for(let d=0;d<h.length;d++)un(h[d])}else{if(c==="datastale")for(let h=0;h<t.length;h++)t[h].status===3?t[h].status=4:t[h].status=0;else{ce("transaction at "+l.toString()+" failed: "+c);for(let h=0;h<t.length;h++)t[h].status=4,t[h].abortReason=c}tn(n,e)}},o)}function tn(n,e){const t=pu(n,e),s=is(t),i=gu(n,t);return k_(n,i,s),s}function k_(n,e,t){if(e.length===0)return;const s=[];let i=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=le(t,l.path);let u=!1,h;if(T(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)u=!0,h=l.abortReason,i=i.concat(tt(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=f_)u=!0,h="maxretry",i=i.concat(tt(n.serverSyncTree_,l.currentWriteId,!0));else{const d=Io(n,l.path,o);l.currentInputSnapshot=d;const v=e[a].update(d.val());if(v!==void 0){rs("transaction failed: Data returned ",v,l.path);let b=Q(v);typeof v=="object"&&v!=null&&Oe(v,".priority")||(b=b.updatePriority(d.getPriority()));const E=l.currentWriteId,C=os(n),U=yo(b,d,C);l.currentOutputSnapshotRaw=b,l.currentOutputSnapshotResolved=U,l.currentWriteId=di(n),o.splice(o.indexOf(E),1),i=i.concat(ho(n.serverSyncTree_,l.path,U,l.currentWriteId,l.applyLocally)),i=i.concat(tt(n.serverSyncTree_,E,!0))}else u=!0,h="nodata",i=i.concat(tt(n.serverSyncTree_,l.currentWriteId,!0))}ge(n.eventQueue_,t,i),i=[],u&&(e[a].status=2,function(d){setTimeout(d,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(h==="nodata"?s.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):s.push(()=>e[a].onComplete(new Error(h),!1,null))))}pi(n,n.transactionQueueTree_);for(let a=0;a<s.length;a++)un(s[a]);fi(n,n.transactionQueueTree_)}function pu(n,e){let t,s=n.transactionQueueTree_;for(t=D(e);t!==null&&Ft(s)===void 0;)s=li(s,t),e=K(e),t=D(e);return s}function gu(n,e){const t=[];return _u(n,e,t),t.sort((s,i)=>s.order-i.order),t}function _u(n,e,t){const s=Ft(e);if(s)for(let i=0;i<s.length;i++)t.push(s[i]);ci(e,i=>{_u(n,i,t)})}function pi(n,e){const t=Ft(e);if(t){let s=0;for(let i=0;i<t.length;i++)t[i].status!==2&&(t[s]=t[i],s++);t.length=s,bo(e,t.length>0?t:void 0)}ci(e,s=>{pi(n,s)})}function ko(n,e){const t=is(pu(n,e)),s=li(n.transactionQueueTree_,e);return t_(s,i=>{ji(n,i)}),ji(n,s),lu(s,i=>{ji(n,i)}),t}function ji(n,e){const t=Ft(e);if(t){const s=[];let i=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(T(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(T(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),i=i.concat(tt(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&s.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?bo(e,void 0):t.length=r+1,ge(n.eventQueue_,is(e),i);for(let o=0;o<s.length;o++)un(s[o])}}/**
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
 */function C_(n){let e="";const t=n.split("/");for(let s=0;s<t.length;s++)if(t[s].length>0){let i=t[s];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function A_(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const s=t.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):ce(`Invalid query segment '${t}' in query '${n}'`)}return e}const za=function(n,e){const t=R_(n),s=t.namespace;t.domain==="firebase.com"&&Ye(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&t.domain!=="localhost"&&Ye("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||Ff();const i=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Sc(t.host,t.secure,s,i,e,"",s!==t.subdomain),path:new V(t.pathString)}},R_=function(n){let e="",t="",s="",i="",r="",o=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let u=n.indexOf("/");u===-1&&(u=n.length);let h=n.indexOf("?");h===-1&&(h=n.length),e=n.substring(0,Math.min(u,h)),u<h&&(i=C_(n.substring(u,h)));const d=A_(n.substring(Math.min(n.length,h)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const v=e.slice(0,c);if(v.toLowerCase()==="localhost")t="localhost";else if(v.split(".").length<=2)t=v;else{const b=e.indexOf(".");s=e.substring(0,b).toLowerCase(),t=e.substring(b+1),r=s}"ns"in d&&(r=d.ns)}return{host:e,port:l,domain:t,subdomain:s,secure:o,scheme:a,pathString:i,namespace:r}};/**
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
 */const Ka="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",P_=function(){let n=0;const e=[];return function(t){const s=t===n;n=t;let i;const r=new Array(8);for(i=7;i>=0;i--)r[i]=Ka.charAt(t%64),t=Math.floor(t/64);T(t===0,"Cannot push at time == 0");let o=r.join("");if(s){for(i=11;i>=0&&e[i]===63;i--)e[i]=0;e[i]++}else for(i=0;i<12;i++)e[i]=Math.floor(Math.random()*64);for(i=0;i<12;i++)o+=Ka.charAt(e[i]);return T(o.length===20,"nextPushId: Length should be 20."),o}}();/**
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
 */class O_{constructor(e,t,s,i){this.eventType=e,this.eventRegistration=t,this.snapshot=s,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+te(this.snapshot.exportVal())}}class N_{constructor(e,t,s){this.eventRegistration=e,this.error=t,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
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
 */class mu{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return T(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class as{constructor(e,t,s,i){this._repo=e,this._path=t,this._queryParams=s,this._orderByCalled=i}get key(){return M(this._path)?null:Qr(this._path)}get ref(){return new Fe(this._repo,this._path)}get _queryIdentifier(){const e=Na(this._queryParams),t=Kr(e);return t==="{}"?"default":t}get _queryObject(){return Na(this._queryParams)}isEqual(e){if(e=pe(e),!(e instanceof as))return!1;const t=this._repo===e._repo,s=Xr(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return t&&s&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+bp(this._path)}}function x_(n,e){if(n._orderByCalled===!0)throw new Error(e+": You can't combine multiple orderBy calls.")}function D_(n){let e=null,t=null;if(n.hasStart()&&(e=n.getIndexStartValue()),n.hasEnd()&&(t=n.getIndexEndValue()),n.getIndex()===Ct){const s="Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",i="Query: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string.";if(n.hasStart()){if(n.getIndexStartName()!==Pt)throw new Error(s);if(typeof e!="string")throw new Error(i)}if(n.hasEnd()){if(n.getIndexEndName()!==at)throw new Error(s);if(typeof t!="string")throw new Error(i)}}else if(n.getIndex()===G){if(e!=null&&!Ws(e)||t!=null&&!Ws(t))throw new Error("Query: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string).")}else if(T(n.getIndex()instanceof to||n.getIndex()===jc,"unknown index type."),e!=null&&typeof e=="object"||t!=null&&typeof t=="object")throw new Error("Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.")}class Fe extends as{constructor(e,t){super(e,t,new so,!1)}get parent(){const e=Nc(this._path);return e===null?null:new Fe(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class nn{constructor(e,t,s){this._node=e,this.ref=t,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new V(e),s=Kn(this.ref,e);return new nn(this._node.getChild(t),s,G)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,i)=>e(new nn(i,Kn(this.ref,s),G)))}hasChild(e){const t=new V(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function O(n,e){return n=pe(n),n._checkNotDeleted("ref"),e!==void 0?Kn(n._root,e):n._root}function Kn(n,e){return n=pe(n),D(n._path)===null?l_("child","path",e):So("child","path",e),new Fe(n._repo,J(n._path,e))}function br(n,e){n=pe(n),ui("push",n._path),uu("push",e,n._path,!0);const t=fu(n._repo),s=P_(t),i=Kn(n,s),r=Kn(n,s);let o;return e!=null?o=Qe(r,e).then(()=>r):o=Promise.resolve(r),i.then=o.then.bind(o),i.catch=o.then.bind(o,void 0),i}function ke(n){return ui("remove",n._path),Qe(n,null)}function Qe(n,e){n=pe(n),ui("set",n._path),uu("set",e,n._path,!1);const t=new cn;return y_(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function Gn(n,e){a_("update",e,n._path);const t=new cn;return v_(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function Pe(n){n=pe(n);const e=new mu(()=>{}),t=new gi(e);return m_(n._repo,n,t).then(s=>new nn(s,new Fe(n._repo,n._path),n._queryParams.getIndex()))}class gi{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const s=t._queryParams.getIndex();return new O_("value",this,new nn(e.snapshotNode,new Fe(t._repo,t._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new N_(this,e,t):null}matches(e){return e instanceof gi?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function L_(n,e,t,s,i){const r=new mu(t,void 0),o=new gi(r);return b_(n._repo,n,o),()=>E_(n._repo,n,o)}function fn(n,e,t,s){return L_(n,"value",e)}class yu{}class M_ extends yu{constructor(e){super(),this._limit=e,this.type="limitToLast"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).");return new as(e._repo,e._path,Hp(e._queryParams,this._limit),e._orderByCalled)}}function $_(n){if(Math.floor(n)!==n||n<=0)throw new Error("limitToLast: First argument must be a positive integer.");return new M_(n)}class F_ extends yu{constructor(e){super(),this._path=e,this.type="orderByChild"}_apply(e){x_(e,"orderByChild");const t=new V(this._path);if(M(t))throw new Error("orderByChild: cannot pass in empty path. Use orderByValue() instead.");const s=new to(t),i=qp(e._queryParams,s);return D_(i),new as(e._repo,e._path,i,!0)}}function j_(n){return So("orderByChild","path",n),new F_(n)}function B_(n,...e){let t=pe(n);for(const s of e)t=s._apply(t);return t}xg(Fe);Fg(Fe);/**
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
 */const U_="FIREBASE_DATABASE_EMULATOR_HOST",Er={};let W_=!1;function V_(n,e,t,s){const i=e.lastIndexOf(":"),r=e.substring(0,i),o=Ys(r);n.repoInfo_=new Sc(e,o,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),s&&(n.authTokenProvider_=s)}function H_(n,e,t,s,i){let r=s||n.options.databaseURL;r===void 0&&(n.options.projectId||Ye("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),re("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=za(r,i),a=o.repoInfo,l;typeof process<"u"&&pa&&(l=pa[U_]),l?(r=`http://${l}?ns=${a.namespace}`,o=za(r,i),a=o.repoInfo):o.repoInfo.secure;const c=new Jf(n.name,n.options,e);c_("Invalid Firebase Database URL",o),M(o.path)||Ye("Database URL must point to the root of a Firebase Database (not including a child path).");const u=z_(a,n,c,new Gf(n,t));return new K_(u,n)}function q_(n,e){const t=Er[e];(!t||t[n.key]!==n)&&Ye(`Database ${e}(${n.repoInfo_}) has already been deleted.`),S_(n),delete t[n.key]}function z_(n,e,t,s){let i=Er[e.name];i||(i={},Er[e.name]=i);let r=i[n.toURLString()];return r&&Ye("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new p_(n,W_,t,s),i[n.toURLString()]=r,r}class K_{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(g_(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Fe(this._repo,W())),this._rootInternal}_delete(){return this._rootInternal!==null&&(q_(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Ye("Cannot call "+e+" on a deleted database.")}}function G_(n=Vr(),e){const t=Xn(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const s=Hl("database");s&&J_(t,...s)}return t}function J_(n,e,t,s={}){n=pe(n),n._checkNotDeleted("useEmulator");const i=`${e}:${t}`,r=n._repoInternal;if(n._instanceStarted){if(i===n._repoInternal.repoInfo_.host&&Is(s,r.repoInfo_.emulatorOptions))return;Ye("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)s.mockUserToken&&Ye('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new ws(ws.OWNER);else if(s.mockUserToken){const a=typeof s.mockUserToken=="string"?s.mockUserToken:Kl(s.mockUserToken,n.app.options.projectId);o=new ws(a)}Ys(e)&&(zl(e),Gl("Database",!0)),V_(r,i,s,o)}/**
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
 */function Y_(n){xf(Wr),Me(new Re("database",(e,{instanceIdentifier:t})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return H_(s,i,r,t)},"PUBLIC").setMultipleInstances(!0)),fe(ga,_a,n),fe(ga,_a,"esm2020")}/**
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
 */class Q_{constructor(e,t){this.committed=e,this.snapshot=t}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function X_(n,e,t){if(n=pe(n),ui("Reference.transaction",n._path),n.key===".length"||n.key===".keys")throw"Reference.transaction failed: "+n.key+" is a read-only object.";const s=!0,i=new cn,r=(a,l,c)=>{let u=null;a?i.reject(a):(u=new nn(c,new Fe(n._repo,n._path),G),i.resolve(new Q_(l,u)))},o=fn(n,()=>{});return T_(n._repo,n._path,e,r,o,s),i.promise}Ge.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};Ge.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};Y_();/**
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
 */const vu="firebasestorage.googleapis.com",Z_="storageBucket",em=2*60*1e3,tm=10*60*1e3;/**
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
 */let dt=class wu extends ht{constructor(e,t,s=0){super(Bi(e),`Firebase Storage: ${t} (${Bi(e)})`),this.status_=s,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,wu.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Bi(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}};var $e;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})($e||($e={}));function Bi(n){return"storage/"+n}function nm(){const n="An unknown error occurred, please check the error payload for server response.";return new dt($e.UNKNOWN,n)}function sm(){return new dt($e.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function im(){return new dt($e.CANCELED,"User canceled the upload/download.")}function rm(n){return new dt($e.INVALID_URL,"Invalid URL '"+n+"'.")}function om(n){return new dt($e.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function Ga(n){return new dt($e.INVALID_ARGUMENT,n)}function bu(){return new dt($e.APP_DELETED,"The Firebase app was deleted.")}function am(n){return new dt($e.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}/**
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
 */class Ce{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let s;try{s=Ce.makeFromUrl(e,t)}catch{return new Ce(e,"")}if(s.path==="")return s;throw om(e)}static makeFromUrl(e,t){let s=null;const i="([A-Za-z0-9.\\-_]+)";function r(R){R.path.charAt(R.path.length-1)==="/"&&(R.path_=R.path_.slice(0,-1))}const o="(/(.*))?$",a=new RegExp("^gs://"+i+o,"i"),l={bucket:1,path:3};function c(R){R.path_=decodeURIComponent(R.path)}const u="v[A-Za-z0-9_]+",h=t.replace(/[.]/g,"\\."),d="(/([^?#]*).*)?$",v=new RegExp(`^https?://${h}/${u}/b/${i}/o${d}`,"i"),b={bucket:1,path:3},S=t===vu?"(?:storage.googleapis.com|storage.cloud.google.com)":t,E="([^?#]*)",C=new RegExp(`^https?://${S}/${i}/${E}`,"i"),I=[{regex:a,indices:l,postModify:r},{regex:v,indices:b,postModify:c},{regex:C,indices:{bucket:1,path:2},postModify:c}];for(let R=0;R<I.length;R++){const X=I[R],j=X.regex.exec(e);if(j){const _=j[X.indices.bucket];let f=j[X.indices.path];f||(f=""),s=new Ce(_,f),X.postModify(s);break}}if(s==null)throw rm(e);return s}}class lm{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
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
 */function cm(n,e,t){let s=1,i=null,r=null,o=!1,a=0;function l(){return a===2}let c=!1;function u(...E){c||(c=!0,e.apply(null,E))}function h(E){i=setTimeout(()=>{i=null,n(v,l())},E)}function d(){r&&clearTimeout(r)}function v(E,...C){if(c){d();return}if(E){d(),u.call(null,E,...C);return}if(l()||o){d(),u.call(null,E,...C);return}s<64&&(s*=2);let I;a===1?(a=2,I=0):I=(s+Math.random())*1e3,h(I)}let b=!1;function S(E){b||(b=!0,d(),!c&&(i!==null?(E||(a=2),clearTimeout(i),h(0)):E||(a=1)))}return h(0),r=setTimeout(()=>{o=!0,S(!0)},t),S}function um(n){n(!1)}/**
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
 */function hm(n){return n!==void 0}function Ja(n,e,t,s){if(s<e)throw Ga(`Invalid value for '${n}'. Expected ${e} or greater.`);if(s>t)throw Ga(`Invalid value for '${n}'. Expected ${t} or less.`)}function dm(n){const e=encodeURIComponent;let t="?";for(const s in n)if(n.hasOwnProperty(s)){const i=e(s)+"="+e(n[s]);t=t+i+"&"}return t=t.slice(0,-1),t}var Vs;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(Vs||(Vs={}));/**
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
 */function fm(n,e){const t=n>=500&&n<600,i=[408,429].indexOf(n)!==-1,r=e.indexOf(n)!==-1;return t||i||r}/**
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
 */class pm{constructor(e,t,s,i,r,o,a,l,c,u,h,d=!0,v=!1){this.url_=e,this.method_=t,this.headers_=s,this.body_=i,this.successCodes_=r,this.additionalRetryCodes_=o,this.callback_=a,this.errorCallback_=l,this.timeout_=c,this.progressCallback_=u,this.connectionFactory_=h,this.retry=d,this.isUsingEmulator=v,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((b,S)=>{this.resolve_=b,this.reject_=S,this.start_()})}start_(){const e=(s,i)=>{if(i){s(!1,new fs(!1,null,!0));return}const r=this.connectionFactory_();this.pendingConnection_=r;const o=a=>{const l=a.loaded,c=a.lengthComputable?a.total:-1;this.progressCallback_!==null&&this.progressCallback_(l,c)};this.progressCallback_!==null&&r.addUploadProgressListener(o),r.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&r.removeUploadProgressListener(o),this.pendingConnection_=null;const a=r.getErrorCode()===Vs.NO_ERROR,l=r.getStatus();if(!a||fm(l,this.additionalRetryCodes_)&&this.retry){const u=r.getErrorCode()===Vs.ABORT;s(!1,new fs(!1,null,u));return}const c=this.successCodes_.indexOf(l)!==-1;s(!0,new fs(c,r))})},t=(s,i)=>{const r=this.resolve_,o=this.reject_,a=i.connection;if(i.wasSuccessCode)try{const l=this.callback_(a,a.getResponse());hm(l)?r(l):r()}catch(l){o(l)}else if(a!==null){const l=nm();l.serverResponse=a.getErrorText(),this.errorCallback_?o(this.errorCallback_(a,l)):o(l)}else if(i.canceled){const l=this.appDelete_?bu():im();o(l)}else{const l=sm();o(l)}};this.canceled_?t(!1,new fs(!1,null,!0)):this.backoffId_=cm(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&um(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class fs{constructor(e,t,s){this.wasSuccessCode=e,this.connection=t,this.canceled=!!s}}function gm(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function _m(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function mm(n,e){e&&(n["X-Firebase-GMPID"]=e)}function ym(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function vm(n,e,t,s,i,r,o=!0,a=!1){const l=dm(n.urlParams),c=n.url+l,u=Object.assign({},n.headers);return mm(u,e),gm(u,t),_m(u,r),ym(u,s),new pm(c,n.method,u,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,i,o,a)}/**
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
 */function wm(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function bm(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
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
 */class Hs{constructor(e,t){this._service=e,t instanceof Ce?this._location=t:this._location=Ce.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new Hs(e,t)}get root(){const e=new Ce(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return bm(this._location.path)}get storage(){return this._service}get parent(){const e=wm(this._location.path);if(e===null)return null;const t=new Ce(this._location.bucket,e);return new Hs(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw am(e)}}function Ya(n,e){const t=e==null?void 0:e[Z_];return t==null?null:Ce.makeFromBucketSpec(t,n)}function Em(n,e,t,s={}){n.host=`${e}:${t}`;const i=Ys(e);i&&(zl(`https://${n.host}/b`),Gl("Storage",!0)),n._isUsingEmulator=!0,n._protocol=i?"https":"http";const{mockUserToken:r}=s;r&&(n._overrideAuthToken=typeof r=="string"?r:Kl(r,n.app.options.projectId))}class Sm{constructor(e,t,s,i,r,o=!1){this.app=e,this._authProvider=t,this._appCheckProvider=s,this._url=i,this._firebaseVersion=r,this._isUsingEmulator=o,this._bucket=null,this._host=vu,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=em,this._maxUploadRetryTime=tm,this._requests=new Set,i!=null?this._bucket=Ce.makeFromBucketSpec(i,this._host):this._bucket=Ya(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Ce.makeFromBucketSpec(this._url,e):this._bucket=Ya(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Ja("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Ja("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(Ur(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Hs(this,e)}_makeRequest(e,t,s,i,r=!0){if(this._deleted)return new lm(bu());{const o=vm(e,this._appId,s,i,t,this._firebaseVersion,r,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[s,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,s,i).getPromise()}}const Qa="@firebase/storage",Xa="0.14.0";/**
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
 */const Eu="storage";function Tm(n=Vr(),e){n=pe(n);const s=Xn(n,Eu).getImmediate({identifier:e}),i=Hl("storage");return i&&Im(s,...i),s}function Im(n,e,t,s={}){Em(n,e,t,s)}function km(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),s=n.getProvider("auth-internal"),i=n.getProvider("app-check-internal");return new Sm(t,s,i,e,Wr)}function Cm(){Me(new Re(Eu,km,"PUBLIC").setMultipleInstances(!0)),fe(Qa,Xa,""),fe(Qa,Xa,"esm2020")}Cm();const Su="@firebase/installations",Co="0.6.19";/**
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
 */const Tu=1e4,Iu=`w:${Co}`,ku="FIS_v2",Am="https://firebaseinstallations.googleapis.com/v1",Rm=60*60*1e3,Pm="installations",Om="Installations";/**
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
 */const Nm={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},xt=new Qs(Pm,Om,Nm);function Cu(n){return n instanceof ht&&n.code.includes("request-failed")}/**
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
 */function Au({projectId:n}){return`${Am}/projects/${n}/installations`}function Ru(n){return{token:n.token,requestStatus:2,expiresIn:Dm(n.expiresIn),creationTime:Date.now()}}async function Pu(n,e){const s=(await e.json()).error;return xt.create("request-failed",{requestName:n,serverCode:s.code,serverMessage:s.message,serverStatus:s.status})}function Ou({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function xm(n,{refreshToken:e}){const t=Ou(n);return t.append("Authorization",Lm(e)),t}async function Nu(n){const e=await n();return e.status>=500&&e.status<600?n():e}function Dm(n){return Number(n.replace("s","000"))}function Lm(n){return`${ku} ${n}`}/**
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
 */async function Mm({appConfig:n,heartbeatServiceProvider:e},{fid:t}){const s=Au(n),i=Ou(n),r=e.getImmediate({optional:!0});if(r){const c=await r.getHeartbeatsHeader();c&&i.append("x-firebase-client",c)}const o={fid:t,authVersion:ku,appId:n.appId,sdkVersion:Iu},a={method:"POST",headers:i,body:JSON.stringify(o)},l=await Nu(()=>fetch(s,a));if(l.ok){const c=await l.json();return{fid:c.fid||t,registrationStatus:2,refreshToken:c.refreshToken,authToken:Ru(c.authToken)}}else throw await Pu("Create Installation",l)}/**
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
 */function xu(n){return new Promise(e=>{setTimeout(e,n)})}/**
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
 */function $m(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const Fm=/^[cdef][\w-]{21}$/,Sr="";function jm(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const t=Bm(n);return Fm.test(t)?t:Sr}catch{return Sr}}function Bm(n){return $m(n).substr(0,22)}/**
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
 */function _i(n){return`${n.appName}!${n.appId}`}/**
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
 */const Du=new Map;function Lu(n,e){const t=_i(n);Mu(t,e),Um(t,e)}function Mu(n,e){const t=Du.get(n);if(t)for(const s of t)s(e)}function Um(n,e){const t=Wm();t&&t.postMessage({key:n,fid:e}),Vm()}let St=null;function Wm(){return!St&&"BroadcastChannel"in self&&(St=new BroadcastChannel("[Firebase] FID Change"),St.onmessage=n=>{Mu(n.data.key,n.data.fid)}),St}function Vm(){Du.size===0&&St&&(St.close(),St=null)}/**
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
 */const Hm="firebase-installations-database",qm=1,Dt="firebase-installations-store";let Ui=null;function Ao(){return Ui||(Ui=ei(Hm,qm,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(Dt)}}})),Ui}async function qs(n,e){const t=_i(n),i=(await Ao()).transaction(Dt,"readwrite"),r=i.objectStore(Dt),o=await r.get(t);return await r.put(e,t),await i.done,(!o||o.fid!==e.fid)&&Lu(n,e.fid),e}async function $u(n){const e=_i(n),s=(await Ao()).transaction(Dt,"readwrite");await s.objectStore(Dt).delete(e),await s.done}async function mi(n,e){const t=_i(n),i=(await Ao()).transaction(Dt,"readwrite"),r=i.objectStore(Dt),o=await r.get(t),a=e(o);return a===void 0?await r.delete(t):await r.put(a,t),await i.done,a&&(!o||o.fid!==a.fid)&&Lu(n,a.fid),a}/**
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
 */async function Ro(n){let e;const t=await mi(n.appConfig,s=>{const i=zm(s),r=Km(n,i);return e=r.registrationPromise,r.installationEntry});return t.fid===Sr?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function zm(n){const e=n||{fid:jm(),registrationStatus:0};return Fu(e)}function Km(n,e){if(e.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject(xt.create("app-offline"));return{installationEntry:e,registrationPromise:i}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},s=Gm(n,t);return{installationEntry:t,registrationPromise:s}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:Jm(n)}:{installationEntry:e}}async function Gm(n,e){try{const t=await Mm(n,e);return qs(n.appConfig,t)}catch(t){throw Cu(t)&&t.customData.serverCode===409?await $u(n.appConfig):await qs(n.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function Jm(n){let e=await Za(n.appConfig);for(;e.registrationStatus===1;)await xu(100),e=await Za(n.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:s}=await Ro(n);return s||t}return e}function Za(n){return mi(n,e=>{if(!e)throw xt.create("installation-not-found");return Fu(e)})}function Fu(n){return Ym(n)?{fid:n.fid,registrationStatus:0}:n}function Ym(n){return n.registrationStatus===1&&n.registrationTime+Tu<Date.now()}/**
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
 */async function Qm({appConfig:n,heartbeatServiceProvider:e},t){const s=Xm(n,t),i=xm(n,t),r=e.getImmediate({optional:!0});if(r){const c=await r.getHeartbeatsHeader();c&&i.append("x-firebase-client",c)}const o={installation:{sdkVersion:Iu,appId:n.appId}},a={method:"POST",headers:i,body:JSON.stringify(o)},l=await Nu(()=>fetch(s,a));if(l.ok){const c=await l.json();return Ru(c)}else throw await Pu("Generate Auth Token",l)}function Xm(n,{fid:e}){return`${Au(n)}/${e}/authTokens:generate`}/**
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
 */async function Po(n,e=!1){let t;const s=await mi(n.appConfig,r=>{if(!ju(r))throw xt.create("not-registered");const o=r.authToken;if(!e&&ty(o))return r;if(o.requestStatus===1)return t=Zm(n,e),r;{if(!navigator.onLine)throw xt.create("app-offline");const a=sy(r);return t=ey(n,a),a}});return t?await t:s.authToken}async function Zm(n,e){let t=await el(n.appConfig);for(;t.authToken.requestStatus===1;)await xu(100),t=await el(n.appConfig);const s=t.authToken;return s.requestStatus===0?Po(n,e):s}function el(n){return mi(n,e=>{if(!ju(e))throw xt.create("not-registered");const t=e.authToken;return iy(t)?{...e,authToken:{requestStatus:0}}:e})}async function ey(n,e){try{const t=await Qm(n,e),s={...e,authToken:t};return await qs(n.appConfig,s),t}catch(t){if(Cu(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await $u(n.appConfig);else{const s={...e,authToken:{requestStatus:0}};await qs(n.appConfig,s)}throw t}}function ju(n){return n!==void 0&&n.registrationStatus===2}function ty(n){return n.requestStatus===2&&!ny(n)}function ny(n){const e=Date.now();return e<n.creationTime||n.creationTime+n.expiresIn<e+Rm}function sy(n){const e={requestStatus:1,requestTime:Date.now()};return{...n,authToken:e}}function iy(n){return n.requestStatus===1&&n.requestTime+Tu<Date.now()}/**
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
 */async function ry(n){const e=n,{installationEntry:t,registrationPromise:s}=await Ro(e);return s?s.catch(console.error):Po(e).catch(console.error),t.fid}/**
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
 */async function oy(n,e=!1){const t=n;return await ay(t),(await Po(t,e)).token}async function ay(n){const{registrationPromise:e}=await Ro(n);e&&await e}/**
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
 */function ly(n){if(!n||!n.options)throw Wi("App Configuration");if(!n.name)throw Wi("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!n.options[t])throw Wi(t);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function Wi(n){return xt.create("missing-app-config-values",{valueName:n})}/**
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
 */const Bu="installations",cy="installations-internal",uy=n=>{const e=n.getProvider("app").getImmediate(),t=ly(e),s=Xn(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:s,_delete:()=>Promise.resolve()}},hy=n=>{const e=n.getProvider("app").getImmediate(),t=Xn(e,Bu).getImmediate();return{getId:()=>ry(t),getToken:i=>oy(t,i)}};function dy(){Me(new Re(Bu,uy,"PUBLIC")),Me(new Re(cy,hy,"PRIVATE"))}dy();fe(Su,Co);fe(Su,Co,"esm2020");/**
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
 */const fy="/firebase-messaging-sw.js",py="/firebase-cloud-messaging-push-scope",Uu="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",gy="https://fcmregistrations.googleapis.com/v1",Wu="google.c.a.c_id",_y="google.c.a.c_l",my="google.c.a.ts",yy="google.c.a.e",tl=1e4;var nl;(function(n){n[n.DATA_MESSAGE=1]="DATA_MESSAGE",n[n.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(nl||(nl={}));/**
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
 */var Jn;(function(n){n.PUSH_RECEIVED="push-received",n.NOTIFICATION_CLICKED="notification-clicked"})(Jn||(Jn={}));/**
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
 */function Ue(n){const e=new Uint8Array(n);return btoa(String.fromCharCode(...e)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function vy(n){const e="=".repeat((4-n.length%4)%4),t=(n+e).replace(/\-/g,"+").replace(/_/g,"/"),s=atob(t),i=new Uint8Array(s.length);for(let r=0;r<s.length;++r)i[r]=s.charCodeAt(r);return i}/**
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
 */const Vi="fcm_token_details_db",wy=5,sl="fcm_token_object_Store";async function by(n){if("databases"in indexedDB&&!(await indexedDB.databases()).map(r=>r.name).includes(Vi))return null;let e=null;return(await ei(Vi,wy,{upgrade:async(s,i,r,o)=>{if(i<2||!s.objectStoreNames.contains(sl))return;const a=o.objectStore(sl),l=await a.index("fcmSenderId").get(n);if(await a.clear(),!!l){if(i===2){const c=l;if(!c.auth||!c.p256dh||!c.endpoint)return;e={token:c.fcmToken,createTime:c.createTime??Date.now(),subscriptionOptions:{auth:c.auth,p256dh:c.p256dh,endpoint:c.endpoint,swScope:c.swScope,vapidKey:typeof c.vapidKey=="string"?c.vapidKey:Ue(c.vapidKey)}}}else if(i===3){const c=l;e={token:c.fcmToken,createTime:c.createTime,subscriptionOptions:{auth:Ue(c.auth),p256dh:Ue(c.p256dh),endpoint:c.endpoint,swScope:c.swScope,vapidKey:Ue(c.vapidKey)}}}else if(i===4){const c=l;e={token:c.fcmToken,createTime:c.createTime,subscriptionOptions:{auth:Ue(c.auth),p256dh:Ue(c.p256dh),endpoint:c.endpoint,swScope:c.swScope,vapidKey:Ue(c.vapidKey)}}}}}})).close(),await Ri(Vi),await Ri("fcm_vapid_details_db"),await Ri("undefined"),Ey(e)?e:null}function Ey(n){if(!n||!n.subscriptionOptions)return!1;const{subscriptionOptions:e}=n;return typeof n.createTime=="number"&&n.createTime>0&&typeof n.token=="string"&&n.token.length>0&&typeof e.auth=="string"&&e.auth.length>0&&typeof e.p256dh=="string"&&e.p256dh.length>0&&typeof e.endpoint=="string"&&e.endpoint.length>0&&typeof e.swScope=="string"&&e.swScope.length>0&&typeof e.vapidKey=="string"&&e.vapidKey.length>0}/**
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
 */const Sy="firebase-messaging-database",Ty=1,Lt="firebase-messaging-store";let Hi=null;function Oo(){return Hi||(Hi=ei(Sy,Ty,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(Lt)}}})),Hi}async function Vu(n){const e=xo(n),s=await(await Oo()).transaction(Lt).objectStore(Lt).get(e);if(s)return s;{const i=await by(n.appConfig.senderId);if(i)return await No(n,i),i}}async function No(n,e){const t=xo(n),i=(await Oo()).transaction(Lt,"readwrite");return await i.objectStore(Lt).put(e,t),await i.done,e}async function Iy(n){const e=xo(n),s=(await Oo()).transaction(Lt,"readwrite");await s.objectStore(Lt).delete(e),await s.done}function xo({appConfig:n}){return n.appId}/**
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
 */const ky={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},oe=new Qs("messaging","Messaging",ky);/**
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
 */async function Cy(n,e){const t=await Lo(n),s=qu(e),i={method:"POST",headers:t,body:JSON.stringify(s)};let r;try{r=await(await fetch(Do(n.appConfig),i)).json()}catch(o){throw oe.create("token-subscribe-failed",{errorInfo:o==null?void 0:o.toString()})}if(r.error){const o=r.error.message;throw oe.create("token-subscribe-failed",{errorInfo:o})}if(!r.token)throw oe.create("token-subscribe-no-token");return r.token}async function Ay(n,e){const t=await Lo(n),s=qu(e.subscriptionOptions),i={method:"PATCH",headers:t,body:JSON.stringify(s)};let r;try{r=await(await fetch(`${Do(n.appConfig)}/${e.token}`,i)).json()}catch(o){throw oe.create("token-update-failed",{errorInfo:o==null?void 0:o.toString()})}if(r.error){const o=r.error.message;throw oe.create("token-update-failed",{errorInfo:o})}if(!r.token)throw oe.create("token-update-no-token");return r.token}async function Hu(n,e){const s={method:"DELETE",headers:await Lo(n)};try{const r=await(await fetch(`${Do(n.appConfig)}/${e}`,s)).json();if(r.error){const o=r.error.message;throw oe.create("token-unsubscribe-failed",{errorInfo:o})}}catch(i){throw oe.create("token-unsubscribe-failed",{errorInfo:i==null?void 0:i.toString()})}}function Do({projectId:n}){return`${gy}/projects/${n}/registrations`}async function Lo({appConfig:n,installations:e}){const t=await e.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n.apiKey,"x-goog-firebase-installations-auth":`FIS ${t}`})}function qu({p256dh:n,auth:e,endpoint:t,vapidKey:s}){const i={web:{endpoint:t,auth:e,p256dh:n}};return s!==Uu&&(i.web.applicationPubKey=s),i}/**
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
 */const Ry=7*24*60*60*1e3;async function Py(n){const e=await xy(n.swRegistration,n.vapidKey),t={vapidKey:n.vapidKey,swScope:n.swRegistration.scope,endpoint:e.endpoint,auth:Ue(e.getKey("auth")),p256dh:Ue(e.getKey("p256dh"))},s=await Vu(n.firebaseDependencies);if(s){if(Dy(s.subscriptionOptions,t))return Date.now()>=s.createTime+Ry?Ny(n,{token:s.token,createTime:Date.now(),subscriptionOptions:t}):s.token;try{await Hu(n.firebaseDependencies,s.token)}catch(i){console.warn(i)}return il(n.firebaseDependencies,t)}else return il(n.firebaseDependencies,t)}async function Oy(n){const e=await Vu(n.firebaseDependencies);e&&(await Hu(n.firebaseDependencies,e.token),await Iy(n.firebaseDependencies));const t=await n.swRegistration.pushManager.getSubscription();return t?t.unsubscribe():!0}async function Ny(n,e){try{const t=await Ay(n.firebaseDependencies,e),s={...e,token:t,createTime:Date.now()};return await No(n.firebaseDependencies,s),t}catch(t){throw t}}async function il(n,e){const s={token:await Cy(n,e),createTime:Date.now(),subscriptionOptions:e};return await No(n,s),s.token}async function xy(n,e){const t=await n.pushManager.getSubscription();return t||n.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:vy(e)})}function Dy(n,e){const t=e.vapidKey===n.vapidKey,s=e.endpoint===n.endpoint,i=e.auth===n.auth,r=e.p256dh===n.p256dh;return t&&s&&i&&r}/**
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
 */function rl(n){const e={from:n.from,collapseKey:n.collapse_key,messageId:n.fcmMessageId};return Ly(e,n),My(e,n),$y(e,n),e}function Ly(n,e){if(!e.notification)return;n.notification={};const t=e.notification.title;t&&(n.notification.title=t);const s=e.notification.body;s&&(n.notification.body=s);const i=e.notification.image;i&&(n.notification.image=i);const r=e.notification.icon;r&&(n.notification.icon=r)}function My(n,e){e.data&&(n.data=e.data)}function $y(n,e){var i,r,o,a;if(!e.fcmOptions&&!((i=e.notification)!=null&&i.click_action))return;n.fcmOptions={};const t=((r=e.fcmOptions)==null?void 0:r.link)??((o=e.notification)==null?void 0:o.click_action);t&&(n.fcmOptions.link=t);const s=(a=e.fcmOptions)==null?void 0:a.analytics_label;s&&(n.fcmOptions.analyticsLabel=s)}/**
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
 */function Fy(n){return typeof n=="object"&&!!n&&Wu in n}/**
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
 */function jy(n){if(!n||!n.options)throw qi("App Configuration Object");if(!n.name)throw qi("App Name");const e=["projectId","apiKey","appId","messagingSenderId"],{options:t}=n;for(const s of e)if(!t[s])throw qi(s);return{appName:n.name,projectId:t.projectId,apiKey:t.apiKey,appId:t.appId,senderId:t.messagingSenderId}}function qi(n){return oe.create("missing-app-config-values",{valueName:n})}/**
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
 */class By{constructor(e,t,s){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const i=jy(e);this.firebaseDependencies={app:e,appConfig:i,installations:t,analyticsProvider:s}}_delete(){return Promise.resolve()}}/**
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
 */async function zu(n){try{n.swRegistration=await navigator.serviceWorker.register(fy,{scope:py}),n.swRegistration.update().catch(()=>{}),await Uy(n.swRegistration)}catch(e){throw oe.create("failed-service-worker-registration",{browserErrorMessage:e==null?void 0:e.message})}}async function Uy(n){return new Promise((e,t)=>{const s=setTimeout(()=>t(new Error(`Service worker not registered after ${tl} ms`)),tl),i=n.installing||n.waiting;n.active?(clearTimeout(s),e()):i?i.onstatechange=r=>{var o;((o=r.target)==null?void 0:o.state)==="activated"&&(i.onstatechange=null,clearTimeout(s),e())}:(clearTimeout(s),t(new Error("No incoming service worker found.")))})}/**
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
 */async function Wy(n,e){if(!e&&!n.swRegistration&&await zu(n),!(!e&&n.swRegistration)){if(!(e instanceof ServiceWorkerRegistration))throw oe.create("invalid-sw-registration");n.swRegistration=e}}/**
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
 */async function Vy(n,e){e?n.vapidKey=e:n.vapidKey||(n.vapidKey=Uu)}/**
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
 */async function Ku(n,e){if(!navigator)throw oe.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw oe.create("permission-blocked");return await Vy(n,e==null?void 0:e.vapidKey),await Wy(n,e==null?void 0:e.serviceWorkerRegistration),Py(n)}/**
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
 */async function Hy(n,e,t){const s=qy(e);(await n.firebaseDependencies.analyticsProvider.get()).logEvent(s,{message_id:t[Wu],message_name:t[_y],message_time:t[my],message_device_time:Math.floor(Date.now()/1e3)})}function qy(n){switch(n){case Jn.NOTIFICATION_CLICKED:return"notification_open";case Jn.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
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
 */async function zy(n,e){const t=e.data;if(!t.isFirebaseMessaging)return;n.onMessageHandler&&t.messageType===Jn.PUSH_RECEIVED&&(typeof n.onMessageHandler=="function"?n.onMessageHandler(rl(t)):n.onMessageHandler.next(rl(t)));const s=t.data;Fy(s)&&s[yy]==="1"&&await Hy(n,t.messageType,s)}const ol="@firebase/messaging",al="0.12.23";/**
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
 */const Ky=n=>{const e=new By(n.getProvider("app").getImmediate(),n.getProvider("installations-internal").getImmediate(),n.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",t=>zy(e,t)),e},Gy=n=>{const e=n.getProvider("messaging").getImmediate();return{getToken:s=>Ku(e,s)}};function Jy(){Me(new Re("messaging",Ky,"PUBLIC")),Me(new Re("messaging-internal",Gy,"PRIVATE")),fe(ol,al),fe(ol,al,"esm2020")}/**
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
 */async function yi(){try{await Ql()}catch{return!1}return typeof window<"u"&&Yl()&&Jh()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
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
 */async function Yy(n){if(!navigator)throw oe.create("only-available-in-window");return n.swRegistration||await zu(n),Oy(n)}/**
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
 */function Qy(n,e){if(!navigator)throw oe.create("only-available-in-window");return n.onMessageHandler=e,()=>{n.onMessageHandler=null}}/**
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
 */function vi(n=Vr()){return yi().then(e=>{if(!e)throw oe.create("unsupported-browser")},e=>{throw oe.create("indexed-db-unsupported")}),Xn(pe(n),"messaging").getImmediate()}async function Gu(n,e){return n=pe(n),Ku(n,e)}function Xy(n){return n=pe(n),Yy(n)}function Zy(n,e){return n=pe(n),Qy(n,e)}Jy();const ev={apiKey:"AIzaSyC-jTMiDjHNTC6cvSKUU44mVbWwT-ToLxQ",authDomain:"mister-x-d6b59.firebaseapp.com",databaseURL:"https://mister-x-d6b59-default-rtdb.europe-west1.firebasedatabase.app",projectId:"mister-x-d6b59",storageBucket:"mister-x-d6b59.firebasestorage.app",messagingSenderId:"616391598963",appId:"1:616391598963:web:da07882b0f481d3000db06",measurementId:"G-W66SK677NG"},pn=tc(ev),N=G_(pn);Tm(pn);vi(pn);const tv="modulepreload",nv=function(n){return"/Mister-X/"+n},ll={},ls=function(e,t,s){let i=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));i=Promise.allSettled(t.map(l=>{if(l=nv(l),l in ll)return;ll[l]=!0;const c=l.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const h=document.createElement("link");if(h.rel=c?"stylesheet":tv,c||(h.as="script"),h.crossOrigin="",h.href=l,a&&h.setAttribute("nonce",a),document.head.appendChild(h),c)return new Promise((d,v)=>{h.addEventListener("load",d),h.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return e().catch(r)})},sv=n=>{let e;return n?e=n:typeof fetch>"u"?e=(...t)=>ls(async()=>{const{default:s}=await Promise.resolve().then(()=>gn);return{default:s}},void 0).then(({default:s})=>s(...t)):e=fetch,(...t)=>e(...t)};class Mo extends Error{constructor(e,t="FunctionsError",s){super(e),this.name=t,this.context=s}}class iv extends Mo{constructor(e){super("Failed to send a request to the Edge Function","FunctionsFetchError",e)}}class cl extends Mo{constructor(e){super("Relay Error invoking the Edge Function","FunctionsRelayError",e)}}class ul extends Mo{constructor(e){super("Edge Function returned a non-2xx status code","FunctionsHttpError",e)}}var Tr;(function(n){n.Any="any",n.ApNortheast1="ap-northeast-1",n.ApNortheast2="ap-northeast-2",n.ApSouth1="ap-south-1",n.ApSoutheast1="ap-southeast-1",n.ApSoutheast2="ap-southeast-2",n.CaCentral1="ca-central-1",n.EuCentral1="eu-central-1",n.EuWest1="eu-west-1",n.EuWest2="eu-west-2",n.EuWest3="eu-west-3",n.SaEast1="sa-east-1",n.UsEast1="us-east-1",n.UsWest1="us-west-1",n.UsWest2="us-west-2"})(Tr||(Tr={}));var rv=function(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{c(s.next(u))}catch(h){o(h)}}function l(u){try{c(s.throw(u))}catch(h){o(h)}}function c(u){u.done?r(u.value):i(u.value).then(a,l)}c((s=s.apply(n,e||[])).next())})};class ov{constructor(e,{headers:t={},customFetch:s,region:i=Tr.Any}={}){this.url=e,this.headers=t,this.region=i,this.fetch=sv(s)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e,t={}){var s;return rv(this,void 0,void 0,function*(){try{const{headers:i,method:r,body:o}=t;let a={},{region:l}=t;l||(l=this.region);const c=new URL(`${this.url}/${e}`);l&&l!=="any"&&(a["x-region"]=l,c.searchParams.set("forceFunctionRegion",l));let u;o&&(i&&!Object.prototype.hasOwnProperty.call(i,"Content-Type")||!i)&&(typeof Blob<"u"&&o instanceof Blob||o instanceof ArrayBuffer?(a["Content-Type"]="application/octet-stream",u=o):typeof o=="string"?(a["Content-Type"]="text/plain",u=o):typeof FormData<"u"&&o instanceof FormData?u=o:(a["Content-Type"]="application/json",u=JSON.stringify(o)));const h=yield this.fetch(c.toString(),{method:r||"POST",headers:Object.assign(Object.assign(Object.assign({},a),this.headers),i),body:u}).catch(S=>{throw new iv(S)}),d=h.headers.get("x-relay-error");if(d&&d==="true")throw new cl(h);if(!h.ok)throw new ul(h);let v=((s=h.headers.get("Content-Type"))!==null&&s!==void 0?s:"text/plain").split(";")[0].trim(),b;return v==="application/json"?b=yield h.json():v==="application/octet-stream"?b=yield h.blob():v==="text/event-stream"?b=h:v==="multipart/form-data"?b=yield h.formData():b=yield h.text(),{data:b,error:null,response:h}}catch(i){return{data:null,error:i,response:i instanceof ul||i instanceof cl?i.context:void 0}}})}}var ve=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function av(n){if(n.__esModule)return n;var e=n.default;if(typeof e=="function"){var t=function s(){return this instanceof s?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};t.prototype=e.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(n).forEach(function(s){var i=Object.getOwnPropertyDescriptor(n,s);Object.defineProperty(t,s,i.get?i:{enumerable:!0,get:function(){return n[s]}})}),t}var he={},$o={},wi={},cs={},bi={},Ei={},lv=function(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("unable to locate global object")},sn=lv();const cv=sn.fetch,Ju=sn.fetch.bind(sn),Yu=sn.Headers,uv=sn.Request,hv=sn.Response,gn=Object.freeze(Object.defineProperty({__proto__:null,Headers:Yu,Request:uv,Response:hv,default:Ju,fetch:cv},Symbol.toStringTag,{value:"Module"})),dv=av(gn);var Si={};Object.defineProperty(Si,"__esModule",{value:!0});let fv=class extends Error{constructor(e){super(e.message),this.name="PostgrestError",this.details=e.details,this.hint=e.hint,this.code=e.code}};Si.default=fv;var Qu=ve&&ve.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(Ei,"__esModule",{value:!0});const pv=Qu(dv),gv=Qu(Si);let _v=class{constructor(e){this.shouldThrowOnError=!1,this.method=e.method,this.url=e.url,this.headers=e.headers,this.schema=e.schema,this.body=e.body,this.shouldThrowOnError=e.shouldThrowOnError,this.signal=e.signal,this.isMaybeSingle=e.isMaybeSingle,e.fetch?this.fetch=e.fetch:typeof fetch>"u"?this.fetch=pv.default:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(e,t){return this.headers=Object.assign({},this.headers),this.headers[e]=t,this}then(e,t){this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers["Accept-Profile"]=this.schema:this.headers["Content-Profile"]=this.schema),this.method!=="GET"&&this.method!=="HEAD"&&(this.headers["Content-Type"]="application/json");const s=this.fetch;let i=s(this.url.toString(),{method:this.method,headers:this.headers,body:JSON.stringify(this.body),signal:this.signal}).then(async r=>{var o,a,l;let c=null,u=null,h=null,d=r.status,v=r.statusText;if(r.ok){if(this.method!=="HEAD"){const C=await r.text();C===""||(this.headers.Accept==="text/csv"||this.headers.Accept&&this.headers.Accept.includes("application/vnd.pgrst.plan+text")?u=C:u=JSON.parse(C))}const S=(o=this.headers.Prefer)===null||o===void 0?void 0:o.match(/count=(exact|planned|estimated)/),E=(a=r.headers.get("content-range"))===null||a===void 0?void 0:a.split("/");S&&E&&E.length>1&&(h=parseInt(E[1])),this.isMaybeSingle&&this.method==="GET"&&Array.isArray(u)&&(u.length>1?(c={code:"PGRST116",details:`Results contain ${u.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},u=null,h=null,d=406,v="Not Acceptable"):u.length===1?u=u[0]:u=null)}else{const S=await r.text();try{c=JSON.parse(S),Array.isArray(c)&&r.status===404&&(u=[],c=null,d=200,v="OK")}catch{r.status===404&&S===""?(d=204,v="No Content"):c={message:S}}if(c&&this.isMaybeSingle&&(!((l=c==null?void 0:c.details)===null||l===void 0)&&l.includes("0 rows"))&&(c=null,d=200,v="OK"),c&&this.shouldThrowOnError)throw new gv.default(c)}return{error:c,data:u,count:h,status:d,statusText:v}});return this.shouldThrowOnError||(i=i.catch(r=>{var o,a,l;return{error:{message:`${(o=r==null?void 0:r.name)!==null&&o!==void 0?o:"FetchError"}: ${r==null?void 0:r.message}`,details:`${(a=r==null?void 0:r.stack)!==null&&a!==void 0?a:""}`,hint:"",code:`${(l=r==null?void 0:r.code)!==null&&l!==void 0?l:""}`},data:null,count:null,status:0,statusText:""}})),i.then(e,t)}returns(){return this}overrideTypes(){return this}};Ei.default=_v;var mv=ve&&ve.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(bi,"__esModule",{value:!0});const yv=mv(Ei);let vv=class extends yv.default{select(e){let t=!1;const s=(e??"*").split("").map(i=>/\s/.test(i)&&!t?"":(i==='"'&&(t=!t),i)).join("");return this.url.searchParams.set("select",s),this.headers.Prefer&&(this.headers.Prefer+=","),this.headers.Prefer+="return=representation",this}order(e,{ascending:t=!0,nullsFirst:s,foreignTable:i,referencedTable:r=i}={}){const o=r?`${r}.order`:"order",a=this.url.searchParams.get(o);return this.url.searchParams.set(o,`${a?`${a},`:""}${e}.${t?"asc":"desc"}${s===void 0?"":s?".nullsfirst":".nullslast"}`),this}limit(e,{foreignTable:t,referencedTable:s=t}={}){const i=typeof s>"u"?"limit":`${s}.limit`;return this.url.searchParams.set(i,`${e}`),this}range(e,t,{foreignTable:s,referencedTable:i=s}={}){const r=typeof i>"u"?"offset":`${i}.offset`,o=typeof i>"u"?"limit":`${i}.limit`;return this.url.searchParams.set(r,`${e}`),this.url.searchParams.set(o,`${t-e+1}`),this}abortSignal(e){return this.signal=e,this}single(){return this.headers.Accept="application/vnd.pgrst.object+json",this}maybeSingle(){return this.method==="GET"?this.headers.Accept="application/json":this.headers.Accept="application/vnd.pgrst.object+json",this.isMaybeSingle=!0,this}csv(){return this.headers.Accept="text/csv",this}geojson(){return this.headers.Accept="application/geo+json",this}explain({analyze:e=!1,verbose:t=!1,settings:s=!1,buffers:i=!1,wal:r=!1,format:o="text"}={}){var a;const l=[e?"analyze":null,t?"verbose":null,s?"settings":null,i?"buffers":null,r?"wal":null].filter(Boolean).join("|"),c=(a=this.headers.Accept)!==null&&a!==void 0?a:"application/json";return this.headers.Accept=`application/vnd.pgrst.plan+${o}; for="${c}"; options=${l};`,o==="json"?this:this}rollback(){var e;return((e=this.headers.Prefer)!==null&&e!==void 0?e:"").trim().length>0?this.headers.Prefer+=",tx=rollback":this.headers.Prefer="tx=rollback",this}returns(){return this}};bi.default=vv;var wv=ve&&ve.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(cs,"__esModule",{value:!0});const bv=wv(bi);let Ev=class extends bv.default{eq(e,t){return this.url.searchParams.append(e,`eq.${t}`),this}neq(e,t){return this.url.searchParams.append(e,`neq.${t}`),this}gt(e,t){return this.url.searchParams.append(e,`gt.${t}`),this}gte(e,t){return this.url.searchParams.append(e,`gte.${t}`),this}lt(e,t){return this.url.searchParams.append(e,`lt.${t}`),this}lte(e,t){return this.url.searchParams.append(e,`lte.${t}`),this}like(e,t){return this.url.searchParams.append(e,`like.${t}`),this}likeAllOf(e,t){return this.url.searchParams.append(e,`like(all).{${t.join(",")}}`),this}likeAnyOf(e,t){return this.url.searchParams.append(e,`like(any).{${t.join(",")}}`),this}ilike(e,t){return this.url.searchParams.append(e,`ilike.${t}`),this}ilikeAllOf(e,t){return this.url.searchParams.append(e,`ilike(all).{${t.join(",")}}`),this}ilikeAnyOf(e,t){return this.url.searchParams.append(e,`ilike(any).{${t.join(",")}}`),this}is(e,t){return this.url.searchParams.append(e,`is.${t}`),this}in(e,t){const s=Array.from(new Set(t)).map(i=>typeof i=="string"&&new RegExp("[,()]").test(i)?`"${i}"`:`${i}`).join(",");return this.url.searchParams.append(e,`in.(${s})`),this}contains(e,t){return typeof t=="string"?this.url.searchParams.append(e,`cs.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cs.{${t.join(",")}}`):this.url.searchParams.append(e,`cs.${JSON.stringify(t)}`),this}containedBy(e,t){return typeof t=="string"?this.url.searchParams.append(e,`cd.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cd.{${t.join(",")}}`):this.url.searchParams.append(e,`cd.${JSON.stringify(t)}`),this}rangeGt(e,t){return this.url.searchParams.append(e,`sr.${t}`),this}rangeGte(e,t){return this.url.searchParams.append(e,`nxl.${t}`),this}rangeLt(e,t){return this.url.searchParams.append(e,`sl.${t}`),this}rangeLte(e,t){return this.url.searchParams.append(e,`nxr.${t}`),this}rangeAdjacent(e,t){return this.url.searchParams.append(e,`adj.${t}`),this}overlaps(e,t){return typeof t=="string"?this.url.searchParams.append(e,`ov.${t}`):this.url.searchParams.append(e,`ov.{${t.join(",")}}`),this}textSearch(e,t,{config:s,type:i}={}){let r="";i==="plain"?r="pl":i==="phrase"?r="ph":i==="websearch"&&(r="w");const o=s===void 0?"":`(${s})`;return this.url.searchParams.append(e,`${r}fts${o}.${t}`),this}match(e){return Object.entries(e).forEach(([t,s])=>{this.url.searchParams.append(t,`eq.${s}`)}),this}not(e,t,s){return this.url.searchParams.append(e,`not.${t}.${s}`),this}or(e,{foreignTable:t,referencedTable:s=t}={}){const i=s?`${s}.or`:"or";return this.url.searchParams.append(i,`(${e})`),this}filter(e,t,s){return this.url.searchParams.append(e,`${t}.${s}`),this}};cs.default=Ev;var Sv=ve&&ve.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(wi,"__esModule",{value:!0});const bn=Sv(cs);let Tv=class{constructor(e,{headers:t={},schema:s,fetch:i}){this.url=e,this.headers=t,this.schema=s,this.fetch=i}select(e,{head:t=!1,count:s}={}){const i=t?"HEAD":"GET";let r=!1;const o=(e??"*").split("").map(a=>/\s/.test(a)&&!r?"":(a==='"'&&(r=!r),a)).join("");return this.url.searchParams.set("select",o),s&&(this.headers.Prefer=`count=${s}`),new bn.default({method:i,url:this.url,headers:this.headers,schema:this.schema,fetch:this.fetch,allowEmpty:!1})}insert(e,{count:t,defaultToNull:s=!0}={}){const i="POST",r=[];if(this.headers.Prefer&&r.push(this.headers.Prefer),t&&r.push(`count=${t}`),s||r.push("missing=default"),this.headers.Prefer=r.join(","),Array.isArray(e)){const o=e.reduce((a,l)=>a.concat(Object.keys(l)),[]);if(o.length>0){const a=[...new Set(o)].map(l=>`"${l}"`);this.url.searchParams.set("columns",a.join(","))}}return new bn.default({method:i,url:this.url,headers:this.headers,schema:this.schema,body:e,fetch:this.fetch,allowEmpty:!1})}upsert(e,{onConflict:t,ignoreDuplicates:s=!1,count:i,defaultToNull:r=!0}={}){const o="POST",a=[`resolution=${s?"ignore":"merge"}-duplicates`];if(t!==void 0&&this.url.searchParams.set("on_conflict",t),this.headers.Prefer&&a.push(this.headers.Prefer),i&&a.push(`count=${i}`),r||a.push("missing=default"),this.headers.Prefer=a.join(","),Array.isArray(e)){const l=e.reduce((c,u)=>c.concat(Object.keys(u)),[]);if(l.length>0){const c=[...new Set(l)].map(u=>`"${u}"`);this.url.searchParams.set("columns",c.join(","))}}return new bn.default({method:o,url:this.url,headers:this.headers,schema:this.schema,body:e,fetch:this.fetch,allowEmpty:!1})}update(e,{count:t}={}){const s="PATCH",i=[];return this.headers.Prefer&&i.push(this.headers.Prefer),t&&i.push(`count=${t}`),this.headers.Prefer=i.join(","),new bn.default({method:s,url:this.url,headers:this.headers,schema:this.schema,body:e,fetch:this.fetch,allowEmpty:!1})}delete({count:e}={}){const t="DELETE",s=[];return e&&s.push(`count=${e}`),this.headers.Prefer&&s.unshift(this.headers.Prefer),this.headers.Prefer=s.join(","),new bn.default({method:t,url:this.url,headers:this.headers,schema:this.schema,fetch:this.fetch,allowEmpty:!1})}};wi.default=Tv;var Ti={},Ii={};Object.defineProperty(Ii,"__esModule",{value:!0});Ii.version=void 0;Ii.version="0.0.0-automated";Object.defineProperty(Ti,"__esModule",{value:!0});Ti.DEFAULT_HEADERS=void 0;const Iv=Ii;Ti.DEFAULT_HEADERS={"X-Client-Info":`postgrest-js/${Iv.version}`};var Xu=ve&&ve.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty($o,"__esModule",{value:!0});const kv=Xu(wi),Cv=Xu(cs),Av=Ti;let Rv=class Zu{constructor(e,{headers:t={},schema:s,fetch:i}={}){this.url=e,this.headers=Object.assign(Object.assign({},Av.DEFAULT_HEADERS),t),this.schemaName=s,this.fetch=i}from(e){const t=new URL(`${this.url}/${e}`);return new kv.default(t,{headers:Object.assign({},this.headers),schema:this.schemaName,fetch:this.fetch})}schema(e){return new Zu(this.url,{headers:this.headers,schema:e,fetch:this.fetch})}rpc(e,t={},{head:s=!1,get:i=!1,count:r}={}){let o;const a=new URL(`${this.url}/rpc/${e}`);let l;s||i?(o=s?"HEAD":"GET",Object.entries(t).filter(([u,h])=>h!==void 0).map(([u,h])=>[u,Array.isArray(h)?`{${h.join(",")}}`:`${h}`]).forEach(([u,h])=>{a.searchParams.append(u,h)})):(o="POST",l=t);const c=Object.assign({},this.headers);return r&&(c.Prefer=`count=${r}`),new Cv.default({method:o,url:a,headers:c,schema:this.schemaName,body:l,fetch:this.fetch,allowEmpty:!1})}};$o.default=Rv;var _n=ve&&ve.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(he,"__esModule",{value:!0});he.PostgrestError=he.PostgrestBuilder=he.PostgrestTransformBuilder=he.PostgrestFilterBuilder=he.PostgrestQueryBuilder=he.PostgrestClient=void 0;const eh=_n($o);he.PostgrestClient=eh.default;const th=_n(wi);he.PostgrestQueryBuilder=th.default;const nh=_n(cs);he.PostgrestFilterBuilder=nh.default;const sh=_n(bi);he.PostgrestTransformBuilder=sh.default;const ih=_n(Ei);he.PostgrestBuilder=ih.default;const rh=_n(Si);he.PostgrestError=rh.default;var Pv=he.default={PostgrestClient:eh.default,PostgrestQueryBuilder:th.default,PostgrestFilterBuilder:nh.default,PostgrestTransformBuilder:sh.default,PostgrestBuilder:ih.default,PostgrestError:rh.default};const{PostgrestClient:Ov,PostgrestQueryBuilder:I0,PostgrestFilterBuilder:k0,PostgrestTransformBuilder:C0,PostgrestBuilder:A0,PostgrestError:R0}=Pv;class Nv{static dynamicRequire(e){try{return typeof process<"u"&&process.versions&&process.versions.node&&typeof require<"u"?require(e):null}catch{return null}}static detectEnvironment(){var e,t;if(typeof WebSocket<"u")return{type:"native",constructor:WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocket<"u")return{type:"native",constructor:globalThis.WebSocket};if(typeof global<"u"&&typeof global.WebSocket<"u")return{type:"native",constructor:global.WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocketPair<"u"&&typeof globalThis.WebSocket>"u")return{type:"cloudflare",error:"Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",workaround:"Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."};if(typeof globalThis<"u"&&globalThis.EdgeRuntime||typeof navigator<"u"&&(!((e=navigator.userAgent)===null||e===void 0)&&e.includes("Vercel-Edge")))return{type:"unsupported",error:"Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",workaround:"Use serverless functions or a different deployment target for WebSocket functionality."};if(typeof process<"u"&&process.versions&&process.versions.node){const s=parseInt(process.versions.node.split(".")[0]);if(s>=22)try{if(typeof globalThis.WebSocket<"u")return{type:"native",constructor:globalThis.WebSocket};const i=this.dynamicRequire("undici");if(i&&i.WebSocket)return{type:"native",constructor:i.WebSocket};throw new Error("undici not available")}catch{return{type:"unsupported",error:`Node.js ${s} detected but native WebSocket not found.`,workaround:'Install the "ws" package or check your Node.js installation.'}}try{const i=this.dynamicRequire("ws");if(i)return{type:"ws",constructor:(t=i.WebSocket)!==null&&t!==void 0?t:i};throw new Error("ws package not available")}catch{return{type:"unsupported",error:`Node.js ${s} detected without WebSocket support.`,workaround:'Install the "ws" package: npm install ws'}}}return{type:"unsupported",error:"Unknown JavaScript runtime without WebSocket support.",workaround:"Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."}}static getWebSocketConstructor(){const e=this.detectEnvironment();if(e.constructor)return e.constructor;let t=e.error||"WebSocket not supported in this environment.";throw e.workaround&&(t+=`

Suggested solution: ${e.workaround}`),new Error(t)}static createWebSocket(e,t){const s=this.getWebSocketConstructor();return new s(e,t)}static isWebSocketSupported(){try{const e=this.detectEnvironment();return e.type==="native"||e.type==="ws"}catch{return!1}}}const xv="2.15.0",Dv=`realtime-js/${xv}`,Lv="1.0.0",Ir=1e4,Mv=1e3,$v=100;var On;(function(n){n[n.connecting=0]="connecting",n[n.open=1]="open",n[n.closing=2]="closing",n[n.closed=3]="closed"})(On||(On={}));var Z;(function(n){n.closed="closed",n.errored="errored",n.joined="joined",n.joining="joining",n.leaving="leaving"})(Z||(Z={}));var be;(function(n){n.close="phx_close",n.error="phx_error",n.join="phx_join",n.reply="phx_reply",n.leave="phx_leave",n.access_token="access_token"})(be||(be={}));var kr;(function(n){n.websocket="websocket"})(kr||(kr={}));var wt;(function(n){n.Connecting="connecting",n.Open="open",n.Closing="closing",n.Closed="closed"})(wt||(wt={}));class Fv{constructor(){this.HEADER_LENGTH=1}decode(e,t){return e.constructor===ArrayBuffer?t(this._binaryDecode(e)):t(typeof e=="string"?JSON.parse(e):{})}_binaryDecode(e){const t=new DataView(e),s=new TextDecoder;return this._decodeBroadcast(e,t,s)}_decodeBroadcast(e,t,s){const i=t.getUint8(1),r=t.getUint8(2);let o=this.HEADER_LENGTH+2;const a=s.decode(e.slice(o,o+i));o=o+i;const l=s.decode(e.slice(o,o+r));o=o+r;const c=JSON.parse(s.decode(e.slice(o,e.byteLength)));return{ref:null,topic:a,event:l,payload:c}}}class oh{constructor(e,t){this.callback=e,this.timerCalc=t,this.timer=void 0,this.tries=0,this.callback=e,this.timerCalc=t}reset(){this.tries=0,clearTimeout(this.timer),this.timer=void 0}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}}var q;(function(n){n.abstime="abstime",n.bool="bool",n.date="date",n.daterange="daterange",n.float4="float4",n.float8="float8",n.int2="int2",n.int4="int4",n.int4range="int4range",n.int8="int8",n.int8range="int8range",n.json="json",n.jsonb="jsonb",n.money="money",n.numeric="numeric",n.oid="oid",n.reltime="reltime",n.text="text",n.time="time",n.timestamp="timestamp",n.timestamptz="timestamptz",n.timetz="timetz",n.tsrange="tsrange",n.tstzrange="tstzrange"})(q||(q={}));const hl=(n,e,t={})=>{var s;const i=(s=t.skipTypes)!==null&&s!==void 0?s:[];return Object.keys(e).reduce((r,o)=>(r[o]=jv(o,n,e,i),r),{})},jv=(n,e,t,s)=>{const i=e.find(a=>a.name===n),r=i==null?void 0:i.type,o=t[n];return r&&!s.includes(r)?ah(r,o):Cr(o)},ah=(n,e)=>{if(n.charAt(0)==="_"){const t=n.slice(1,n.length);return Vv(e,t)}switch(n){case q.bool:return Bv(e);case q.float4:case q.float8:case q.int2:case q.int4:case q.int8:case q.numeric:case q.oid:return Uv(e);case q.json:case q.jsonb:return Wv(e);case q.timestamp:return Hv(e);case q.abstime:case q.date:case q.daterange:case q.int4range:case q.int8range:case q.money:case q.reltime:case q.text:case q.time:case q.timestamptz:case q.timetz:case q.tsrange:case q.tstzrange:return Cr(e);default:return Cr(e)}},Cr=n=>n,Bv=n=>{switch(n){case"t":return!0;case"f":return!1;default:return n}},Uv=n=>{if(typeof n=="string"){const e=parseFloat(n);if(!Number.isNaN(e))return e}return n},Wv=n=>{if(typeof n=="string")try{return JSON.parse(n)}catch(e){return console.log(`JSON parse error: ${e}`),n}return n},Vv=(n,e)=>{if(typeof n!="string")return n;const t=n.length-1,s=n[t];if(n[0]==="{"&&s==="}"){let r;const o=n.slice(1,t);try{r=JSON.parse("["+o+"]")}catch{r=o?o.split(","):[]}return r.map(a=>ah(e,a))}return n},Hv=n=>typeof n=="string"?n.replace(" ","T"):n,lh=n=>{let e=n;return e=e.replace(/^ws/i,"http"),e=e.replace(/(\/socket\/websocket|\/socket|\/websocket)\/?$/i,""),e.replace(/\/+$/,"")+"/api/broadcast"};class zi{constructor(e,t,s={},i=Ir){this.channel=e,this.event=t,this.payload=s,this.timeout=i,this.sent=!1,this.timeoutTimer=void 0,this.ref="",this.receivedResp=null,this.recHooks=[],this.refEvent=null}resend(e){this.timeout=e,this._cancelRefEvent(),this.ref="",this.refEvent=null,this.receivedResp=null,this.sent=!1,this.send()}send(){this._hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload,ref:this.ref,join_ref:this.channel._joinRef()}))}updatePayload(e){this.payload=Object.assign(Object.assign({},this.payload),e)}receive(e,t){var s;return this._hasReceived(e)&&t((s=this.receivedResp)===null||s===void 0?void 0:s.response),this.recHooks.push({status:e,callback:t}),this}startTimeout(){if(this.timeoutTimer)return;this.ref=this.channel.socket._makeRef(),this.refEvent=this.channel._replyEventName(this.ref);const e=t=>{this._cancelRefEvent(),this._cancelTimeout(),this.receivedResp=t,this._matchReceive(t)};this.channel._on(this.refEvent,{},e),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}trigger(e,t){this.refEvent&&this.channel._trigger(this.refEvent,{status:e,response:t})}destroy(){this._cancelRefEvent(),this._cancelTimeout()}_cancelRefEvent(){this.refEvent&&this.channel._off(this.refEvent,{})}_cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=void 0}_matchReceive({status:e,response:t}){this.recHooks.filter(s=>s.status===e).forEach(s=>s.callback(t))}_hasReceived(e){return this.receivedResp&&this.receivedResp.status===e}}var dl;(function(n){n.SYNC="sync",n.JOIN="join",n.LEAVE="leave"})(dl||(dl={}));class Nn{constructor(e,t){this.channel=e,this.state={},this.pendingDiffs=[],this.joinRef=null,this.enabled=!1,this.caller={onJoin:()=>{},onLeave:()=>{},onSync:()=>{}};const s=(t==null?void 0:t.events)||{state:"presence_state",diff:"presence_diff"};this.channel._on(s.state,{},i=>{const{onJoin:r,onLeave:o,onSync:a}=this.caller;this.joinRef=this.channel._joinRef(),this.state=Nn.syncState(this.state,i,r,o),this.pendingDiffs.forEach(l=>{this.state=Nn.syncDiff(this.state,l,r,o)}),this.pendingDiffs=[],a()}),this.channel._on(s.diff,{},i=>{const{onJoin:r,onLeave:o,onSync:a}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(i):(this.state=Nn.syncDiff(this.state,i,r,o),a())}),this.onJoin((i,r,o)=>{this.channel._trigger("presence",{event:"join",key:i,currentPresences:r,newPresences:o})}),this.onLeave((i,r,o)=>{this.channel._trigger("presence",{event:"leave",key:i,currentPresences:r,leftPresences:o})}),this.onSync(()=>{this.channel._trigger("presence",{event:"sync"})})}static syncState(e,t,s,i){const r=this.cloneDeep(e),o=this.transformState(t),a={},l={};return this.map(r,(c,u)=>{o[c]||(l[c]=u)}),this.map(o,(c,u)=>{const h=r[c];if(h){const d=u.map(E=>E.presence_ref),v=h.map(E=>E.presence_ref),b=u.filter(E=>v.indexOf(E.presence_ref)<0),S=h.filter(E=>d.indexOf(E.presence_ref)<0);b.length>0&&(a[c]=b),S.length>0&&(l[c]=S)}else a[c]=u}),this.syncDiff(r,{joins:a,leaves:l},s,i)}static syncDiff(e,t,s,i){const{joins:r,leaves:o}={joins:this.transformState(t.joins),leaves:this.transformState(t.leaves)};return s||(s=()=>{}),i||(i=()=>{}),this.map(r,(a,l)=>{var c;const u=(c=e[a])!==null&&c!==void 0?c:[];if(e[a]=this.cloneDeep(l),u.length>0){const h=e[a].map(v=>v.presence_ref),d=u.filter(v=>h.indexOf(v.presence_ref)<0);e[a].unshift(...d)}s(a,u,l)}),this.map(o,(a,l)=>{let c=e[a];if(!c)return;const u=l.map(h=>h.presence_ref);c=c.filter(h=>u.indexOf(h.presence_ref)<0),e[a]=c,i(a,c,l),c.length===0&&delete e[a]}),e}static map(e,t){return Object.getOwnPropertyNames(e).map(s=>t(s,e[s]))}static transformState(e){return e=this.cloneDeep(e),Object.getOwnPropertyNames(e).reduce((t,s)=>{const i=e[s];return"metas"in i?t[s]=i.metas.map(r=>(r.presence_ref=r.phx_ref,delete r.phx_ref,delete r.phx_ref_prev,r)):t[s]=i,t},{})}static cloneDeep(e){return JSON.parse(JSON.stringify(e))}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel._joinRef()}}var fl;(function(n){n.ALL="*",n.INSERT="INSERT",n.UPDATE="UPDATE",n.DELETE="DELETE"})(fl||(fl={}));var xn;(function(n){n.BROADCAST="broadcast",n.PRESENCE="presence",n.POSTGRES_CHANGES="postgres_changes",n.SYSTEM="system"})(xn||(xn={}));var We;(function(n){n.SUBSCRIBED="SUBSCRIBED",n.TIMED_OUT="TIMED_OUT",n.CLOSED="CLOSED",n.CHANNEL_ERROR="CHANNEL_ERROR"})(We||(We={}));class Fo{constructor(e,t={config:{}},s){this.topic=e,this.params=t,this.socket=s,this.bindings={},this.state=Z.closed,this.joinedOnce=!1,this.pushBuffer=[],this.subTopic=e.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},t.config),this.timeout=this.socket.timeout,this.joinPush=new zi(this,be.join,this.params,this.timeout),this.rejoinTimer=new oh(()=>this._rejoinUntilConnected(),this.socket.reconnectAfterMs),this.joinPush.receive("ok",()=>{this.state=Z.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(i=>i.send()),this.pushBuffer=[]}),this._onClose(()=>{this.rejoinTimer.reset(),this.socket.log("channel",`close ${this.topic} ${this._joinRef()}`),this.state=Z.closed,this.socket._remove(this)}),this._onError(i=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,i),this.state=Z.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("timeout",()=>{this._isJoining()&&(this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),this.state=Z.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("error",i=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,i),this.state=Z.errored,this.rejoinTimer.scheduleTimeout())}),this._on(be.reply,{},(i,r)=>{this._trigger(this._replyEventName(r),i)}),this.presence=new Nn(this),this.broadcastEndpointURL=lh(this.socket.endPoint),this.private=this.params.config.private||!1}subscribe(e,t=this.timeout){var s,i;if(this.socket.isConnected()||this.socket.connect(),this.state==Z.closed){const{config:{broadcast:r,presence:o,private:a}}=this.params,l=(i=(s=this.bindings.postgres_changes)===null||s===void 0?void 0:s.map(d=>d.filter))!==null&&i!==void 0?i:[],c=!!this.bindings[xn.PRESENCE]&&this.bindings[xn.PRESENCE].length>0,u={},h={broadcast:r,presence:Object.assign(Object.assign({},o),{enabled:c}),postgres_changes:l,private:a};this.socket.accessTokenValue&&(u.access_token=this.socket.accessTokenValue),this._onError(d=>e==null?void 0:e(We.CHANNEL_ERROR,d)),this._onClose(()=>e==null?void 0:e(We.CLOSED)),this.updateJoinPayload(Object.assign({config:h},u)),this.joinedOnce=!0,this._rejoin(t),this.joinPush.receive("ok",async({postgres_changes:d})=>{var v;if(this.socket.setAuth(),d===void 0){e==null||e(We.SUBSCRIBED);return}else{const b=this.bindings.postgres_changes,S=(v=b==null?void 0:b.length)!==null&&v!==void 0?v:0,E=[];for(let C=0;C<S;C++){const U=b[C],{filter:{event:I,schema:R,table:X,filter:j}}=U,_=d&&d[C];if(_&&_.event===I&&_.schema===R&&_.table===X&&_.filter===j)E.push(Object.assign(Object.assign({},U),{id:_.id}));else{this.unsubscribe(),this.state=Z.errored,e==null||e(We.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=E,e&&e(We.SUBSCRIBED);return}}).receive("error",d=>{this.state=Z.errored,e==null||e(We.CHANNEL_ERROR,new Error(JSON.stringify(Object.values(d).join(", ")||"error")))}).receive("timeout",()=>{e==null||e(We.TIMED_OUT)})}return this}presenceState(){return this.presence.state}async track(e,t={}){return await this.send({type:"presence",event:"track",payload:e},t.timeout||this.timeout)}async untrack(e={}){return await this.send({type:"presence",event:"untrack"},e)}on(e,t,s){return this.state===Z.joined&&e===xn.PRESENCE&&(this.socket.log("channel",`resubscribe to ${this.topic} due to change in presence callbacks on joined channel`),this.unsubscribe().then(()=>this.subscribe())),this._on(e,t,s)}async send(e,t={}){var s,i;if(!this._canPush()&&e.type==="broadcast"){const{event:r,payload:o}=e,l={method:"POST",headers:{Authorization:this.socket.accessTokenValue?`Bearer ${this.socket.accessTokenValue}`:"",apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"},body:JSON.stringify({messages:[{topic:this.subTopic,event:r,payload:o,private:this.private}]})};try{const c=await this._fetchWithTimeout(this.broadcastEndpointURL,l,(s=t.timeout)!==null&&s!==void 0?s:this.timeout);return await((i=c.body)===null||i===void 0?void 0:i.cancel()),c.ok?"ok":"error"}catch(c){return c.name==="AbortError"?"timed out":"error"}}else return new Promise(r=>{var o,a,l;const c=this._push(e.type,e,t.timeout||this.timeout);e.type==="broadcast"&&!(!((l=(a=(o=this.params)===null||o===void 0?void 0:o.config)===null||a===void 0?void 0:a.broadcast)===null||l===void 0)&&l.ack)&&r("ok"),c.receive("ok",()=>r("ok")),c.receive("error",()=>r("error")),c.receive("timeout",()=>r("timed out"))})}updateJoinPayload(e){this.joinPush.updatePayload(e)}unsubscribe(e=this.timeout){this.state=Z.leaving;const t=()=>{this.socket.log("channel",`leave ${this.topic}`),this._trigger(be.close,"leave",this._joinRef())};this.joinPush.destroy();let s=null;return new Promise(i=>{s=new zi(this,be.leave,{},e),s.receive("ok",()=>{t(),i("ok")}).receive("timeout",()=>{t(),i("timed out")}).receive("error",()=>{i("error")}),s.send(),this._canPush()||s.trigger("ok",{})}).finally(()=>{s==null||s.destroy()})}teardown(){this.pushBuffer.forEach(e=>e.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=Z.closed,this.bindings={}}async _fetchWithTimeout(e,t,s){const i=new AbortController,r=setTimeout(()=>i.abort(),s),o=await this.socket.fetch(e,Object.assign(Object.assign({},t),{signal:i.signal}));return clearTimeout(r),o}_push(e,t,s=this.timeout){if(!this.joinedOnce)throw`tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;let i=new zi(this,e,t,s);return this._canPush()?i.send():this._addToPushBuffer(i),i}_addToPushBuffer(e){if(e.startTimeout(),this.pushBuffer.push(e),this.pushBuffer.length>$v){const t=this.pushBuffer.shift();t&&(t.destroy(),this.socket.log("channel",`discarded push due to buffer overflow: ${t.event}`,t.payload))}}_onMessage(e,t,s){return t}_isMember(e){return this.topic===e}_joinRef(){return this.joinPush.ref}_trigger(e,t,s){var i,r;const o=e.toLocaleLowerCase(),{close:a,error:l,leave:c,join:u}=be;if(s&&[a,l,c,u].indexOf(o)>=0&&s!==this._joinRef())return;let d=this._onMessage(o,t,s);if(t&&!d)throw"channel onMessage callbacks must return the payload, modified or unmodified";["insert","update","delete"].includes(o)?(i=this.bindings.postgres_changes)===null||i===void 0||i.filter(v=>{var b,S,E;return((b=v.filter)===null||b===void 0?void 0:b.event)==="*"||((E=(S=v.filter)===null||S===void 0?void 0:S.event)===null||E===void 0?void 0:E.toLocaleLowerCase())===o}).map(v=>v.callback(d,s)):(r=this.bindings[o])===null||r===void 0||r.filter(v=>{var b,S,E,C,U,I;if(["broadcast","presence","postgres_changes"].includes(o))if("id"in v){const R=v.id,X=(b=v.filter)===null||b===void 0?void 0:b.event;return R&&((S=t.ids)===null||S===void 0?void 0:S.includes(R))&&(X==="*"||(X==null?void 0:X.toLocaleLowerCase())===((E=t.data)===null||E===void 0?void 0:E.type.toLocaleLowerCase()))}else{const R=(U=(C=v==null?void 0:v.filter)===null||C===void 0?void 0:C.event)===null||U===void 0?void 0:U.toLocaleLowerCase();return R==="*"||R===((I=t==null?void 0:t.event)===null||I===void 0?void 0:I.toLocaleLowerCase())}else return v.type.toLocaleLowerCase()===o}).map(v=>{if(typeof d=="object"&&"ids"in d){const b=d.data,{schema:S,table:E,commit_timestamp:C,type:U,errors:I}=b;d=Object.assign(Object.assign({},{schema:S,table:E,commit_timestamp:C,eventType:U,new:{},old:{},errors:I}),this._getPayloadRecords(b))}v.callback(d,s)})}_isClosed(){return this.state===Z.closed}_isJoined(){return this.state===Z.joined}_isJoining(){return this.state===Z.joining}_isLeaving(){return this.state===Z.leaving}_replyEventName(e){return`chan_reply_${e}`}_on(e,t,s){const i=e.toLocaleLowerCase(),r={type:i,filter:t,callback:s};return this.bindings[i]?this.bindings[i].push(r):this.bindings[i]=[r],this}_off(e,t){const s=e.toLocaleLowerCase();return this.bindings[s]&&(this.bindings[s]=this.bindings[s].filter(i=>{var r;return!(((r=i.type)===null||r===void 0?void 0:r.toLocaleLowerCase())===s&&Fo.isEqual(i.filter,t))})),this}static isEqual(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const s in e)if(e[s]!==t[s])return!1;return!0}_rejoinUntilConnected(){this.rejoinTimer.scheduleTimeout(),this.socket.isConnected()&&this._rejoin()}_onClose(e){this._on(be.close,{},e)}_onError(e){this._on(be.error,{},t=>e(t))}_canPush(){return this.socket.isConnected()&&this._isJoined()}_rejoin(e=this.timeout){this._isLeaving()||(this.socket._leaveOpenTopic(this.topic),this.state=Z.joining,this.joinPush.resend(e))}_getPayloadRecords(e){const t={new:{},old:{}};return(e.type==="INSERT"||e.type==="UPDATE")&&(t.new=hl(e.columns,e.record)),(e.type==="UPDATE"||e.type==="DELETE")&&(t.old=hl(e.columns,e.old_record)),t}}const pl=()=>{},ps={HEARTBEAT_INTERVAL:25e3,RECONNECT_DELAY:10,HEARTBEAT_TIMEOUT_FALLBACK:100},qv=[1e3,2e3,5e3,1e4],zv=1e4,Kv=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;class Gv{constructor(e,t){var s;if(this.accessTokenValue=null,this.apiKey=null,this.channels=new Array,this.endPoint="",this.httpEndpoint="",this.headers={},this.params={},this.timeout=Ir,this.transport=null,this.heartbeatIntervalMs=ps.HEARTBEAT_INTERVAL,this.heartbeatTimer=void 0,this.pendingHeartbeatRef=null,this.heartbeatCallback=pl,this.ref=0,this.reconnectTimer=null,this.logger=pl,this.conn=null,this.sendBuffer=[],this.serializer=new Fv,this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.accessToken=null,this._connectionState="disconnected",this._wasManualDisconnect=!1,this._authPromise=null,this._resolveFetch=i=>{let r;return i?r=i:typeof fetch>"u"?r=(...o)=>ls(async()=>{const{default:a}=await Promise.resolve().then(()=>gn);return{default:a}},void 0).then(({default:a})=>a(...o)).catch(a=>{throw new Error(`Failed to load @supabase/node-fetch: ${a.message}. This is required for HTTP requests in Node.js environments without native fetch.`)}):r=fetch,(...o)=>r(...o)},!(!((s=t==null?void 0:t.params)===null||s===void 0)&&s.apikey))throw new Error("API key is required to connect to Realtime");this.apiKey=t.params.apikey,this.endPoint=`${e}/${kr.websocket}`,this.httpEndpoint=lh(e),this._initializeOptions(t),this._setupReconnectionTimer(),this.fetch=this._resolveFetch(t==null?void 0:t.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.conn!==null&&this.isConnected())){if(this._setConnectionState("connecting"),this._setAuthSafely("connect"),this.transport)this.conn=new this.transport(this.endpointURL());else try{this.conn=Nv.createWebSocket(this.endpointURL())}catch(e){throw this._setConnectionState("disconnected"),new Error(`WebSocket not available: ${e.message}`)}this._setupConnectionHandlers()}}endpointURL(){return this._appendParams(this.endPoint,Object.assign({},this.params,{vsn:Lv}))}disconnect(e,t){if(!this.isDisconnecting())if(this._setConnectionState("disconnecting",!0),this.conn){const s=setTimeout(()=>{this._setConnectionState("disconnected")},100);this.conn.onclose=()=>{clearTimeout(s),this._setConnectionState("disconnected")},e?this.conn.close(e,t??""):this.conn.close(),this._teardownConnection()}else this._setConnectionState("disconnected")}getChannels(){return this.channels}async removeChannel(e){const t=await e.unsubscribe();return this.channels.length===0&&this.disconnect(),t}async removeAllChannels(){const e=await Promise.all(this.channels.map(t=>t.unsubscribe()));return this.channels=[],this.disconnect(),e}log(e,t,s){this.logger(e,t,s)}connectionState(){switch(this.conn&&this.conn.readyState){case On.connecting:return wt.Connecting;case On.open:return wt.Open;case On.closing:return wt.Closing;default:return wt.Closed}}isConnected(){return this.connectionState()===wt.Open}isConnecting(){return this._connectionState==="connecting"}isDisconnecting(){return this._connectionState==="disconnecting"}channel(e,t={config:{}}){const s=`realtime:${e}`,i=this.getChannels().find(r=>r.topic===s);if(i)return i;{const r=new Fo(`realtime:${e}`,t,this);return this.channels.push(r),r}}push(e){const{topic:t,event:s,payload:i,ref:r}=e,o=()=>{this.encode(e,a=>{var l;(l=this.conn)===null||l===void 0||l.send(a)})};this.log("push",`${t} ${s} (${r})`,i),this.isConnected()?o():this.sendBuffer.push(o)}async setAuth(e=null){this._authPromise=this._performAuth(e);try{await this._authPromise}finally{this._authPromise=null}}async sendHeartbeat(){var e;if(!this.isConnected()){this.heartbeatCallback("disconnected");return}if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.log("transport","heartbeat timeout. Attempting to re-establish connection"),this.heartbeatCallback("timeout"),this._wasManualDisconnect=!1,(e=this.conn)===null||e===void 0||e.close(Mv,"heartbeat timeout"),setTimeout(()=>{var t;this.isConnected()||(t=this.reconnectTimer)===null||t===void 0||t.scheduleTimeout()},ps.HEARTBEAT_TIMEOUT_FALLBACK);return}this.pendingHeartbeatRef=this._makeRef(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef}),this.heartbeatCallback("sent"),this._setAuthSafely("heartbeat")}onHeartbeat(e){this.heartbeatCallback=e}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(e=>e()),this.sendBuffer=[])}_makeRef(){let e=this.ref+1;return e===this.ref?this.ref=0:this.ref=e,this.ref.toString()}_leaveOpenTopic(e){let t=this.channels.find(s=>s.topic===e&&(s._isJoined()||s._isJoining()));t&&(this.log("transport",`leaving duplicate topic "${e}"`),t.unsubscribe())}_remove(e){this.channels=this.channels.filter(t=>t.topic!==e.topic)}_onConnMessage(e){this.decode(e.data,t=>{t.topic==="phoenix"&&t.event==="phx_reply"&&this.heartbeatCallback(t.payload.status==="ok"?"ok":"error"),t.ref&&t.ref===this.pendingHeartbeatRef&&(this.pendingHeartbeatRef=null);const{topic:s,event:i,payload:r,ref:o}=t,a=o?`(${o})`:"",l=r.status||"";this.log("receive",`${l} ${s} ${i} ${a}`.trim(),r),this.channels.filter(c=>c._isMember(s)).forEach(c=>c._trigger(i,r,o)),this._triggerStateCallbacks("message",t)})}_clearTimer(e){var t;e==="heartbeat"&&this.heartbeatTimer?(clearInterval(this.heartbeatTimer),this.heartbeatTimer=void 0):e==="reconnect"&&((t=this.reconnectTimer)===null||t===void 0||t.reset())}_clearAllTimers(){this._clearTimer("heartbeat"),this._clearTimer("reconnect")}_setupConnectionHandlers(){this.conn&&("binaryType"in this.conn&&(this.conn.binaryType="arraybuffer"),this.conn.onopen=()=>this._onConnOpen(),this.conn.onerror=e=>this._onConnError(e),this.conn.onmessage=e=>this._onConnMessage(e),this.conn.onclose=e=>this._onConnClose(e))}_teardownConnection(){this.conn&&(this.conn.onopen=null,this.conn.onerror=null,this.conn.onmessage=null,this.conn.onclose=null,this.conn=null),this._clearAllTimers(),this.channels.forEach(e=>e.teardown())}_onConnOpen(){this._setConnectionState("connected"),this.log("transport",`connected to ${this.endpointURL()}`),this.flushSendBuffer(),this._clearTimer("reconnect"),this.worker?this.workerRef||this._startWorkerHeartbeat():this._startHeartbeat(),this._triggerStateCallbacks("open")}_startHeartbeat(){this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval(()=>this.sendHeartbeat(),this.heartbeatIntervalMs)}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=t=>{this.log("worker","worker error",t.message),this.workerRef.terminate()},this.workerRef.onmessage=t=>{t.data.event==="keepAlive"&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_onConnClose(e){var t;this._setConnectionState("disconnected"),this.log("transport","close",e),this._triggerChanError(),this._clearTimer("heartbeat"),this._wasManualDisconnect||(t=this.reconnectTimer)===null||t===void 0||t.scheduleTimeout(),this._triggerStateCallbacks("close",e)}_onConnError(e){this._setConnectionState("disconnected"),this.log("transport",`${e}`),this._triggerChanError(),this._triggerStateCallbacks("error",e)}_triggerChanError(){this.channels.forEach(e=>e._trigger(be.error))}_appendParams(e,t){if(Object.keys(t).length===0)return e;const s=e.match(/\?/)?"&":"?",i=new URLSearchParams(t);return`${e}${s}${i}`}_workerObjectUrl(e){let t;if(e)t=e;else{const s=new Blob([Kv],{type:"application/javascript"});t=URL.createObjectURL(s)}return t}_setConnectionState(e,t=!1){this._connectionState=e,e==="connecting"?this._wasManualDisconnect=!1:e==="disconnecting"&&(this._wasManualDisconnect=t)}async _performAuth(e=null){let t;e?t=e:this.accessToken?t=await this.accessToken():t=this.accessTokenValue,this.accessTokenValue!=t&&(this.accessTokenValue=t,this.channels.forEach(s=>{const i={access_token:t,version:Dv};t&&s.updateJoinPayload(i),s.joinedOnce&&s._isJoined()&&s._push(be.access_token,{access_token:t})}))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(e="general"){this.setAuth().catch(t=>{this.log("error",`error setting auth in ${e}`,t)})}_triggerStateCallbacks(e,t){try{this.stateChangeCallbacks[e].forEach(s=>{try{s(t)}catch(i){this.log("error",`error in ${e} callback`,i)}})}catch(s){this.log("error",`error triggering ${e} callbacks`,s)}}_setupReconnectionTimer(){this.reconnectTimer=new oh(async()=>{setTimeout(async()=>{await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()},ps.RECONNECT_DELAY)},this.reconnectAfterMs)}_initializeOptions(e){var t,s,i,r,o,a,l,c;if(this.transport=(t=e==null?void 0:e.transport)!==null&&t!==void 0?t:null,this.timeout=(s=e==null?void 0:e.timeout)!==null&&s!==void 0?s:Ir,this.heartbeatIntervalMs=(i=e==null?void 0:e.heartbeatIntervalMs)!==null&&i!==void 0?i:ps.HEARTBEAT_INTERVAL,this.worker=(r=e==null?void 0:e.worker)!==null&&r!==void 0?r:!1,this.accessToken=(o=e==null?void 0:e.accessToken)!==null&&o!==void 0?o:null,e!=null&&e.params&&(this.params=e.params),e!=null&&e.logger&&(this.logger=e.logger),(e!=null&&e.logLevel||e!=null&&e.log_level)&&(this.logLevel=e.logLevel||e.log_level,this.params=Object.assign(Object.assign({},this.params),{log_level:this.logLevel})),this.reconnectAfterMs=(a=e==null?void 0:e.reconnectAfterMs)!==null&&a!==void 0?a:u=>qv[u-1]||zv,this.encode=(l=e==null?void 0:e.encode)!==null&&l!==void 0?l:(u,h)=>h(JSON.stringify(u)),this.decode=(c=e==null?void 0:e.decode)!==null&&c!==void 0?c:this.serializer.decode.bind(this.serializer),this.worker){if(typeof window<"u"&&!window.Worker)throw new Error("Web Worker is not supported");this.workerUrl=e==null?void 0:e.workerUrl}}}class jo extends Error{constructor(e){super(e),this.__isStorageError=!0,this.name="StorageError"}}function ne(n){return typeof n=="object"&&n!==null&&"__isStorageError"in n}class Jv extends jo{constructor(e,t,s){super(e),this.name="StorageApiError",this.status=t,this.statusCode=s}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}}class Ar extends jo{constructor(e,t){super(e),this.name="StorageUnknownError",this.originalError=t}}var Yv=function(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{c(s.next(u))}catch(h){o(h)}}function l(u){try{c(s.throw(u))}catch(h){o(h)}}function c(u){u.done?r(u.value):i(u.value).then(a,l)}c((s=s.apply(n,e||[])).next())})};const ch=n=>{let e;return n?e=n:typeof fetch>"u"?e=(...t)=>ls(async()=>{const{default:s}=await Promise.resolve().then(()=>gn);return{default:s}},void 0).then(({default:s})=>s(...t)):e=fetch,(...t)=>e(...t)},Qv=()=>Yv(void 0,void 0,void 0,function*(){return typeof Response>"u"?(yield ls(()=>Promise.resolve().then(()=>gn),void 0)).Response:Response}),Rr=n=>{if(Array.isArray(n))return n.map(t=>Rr(t));if(typeof n=="function"||n!==Object(n))return n;const e={};return Object.entries(n).forEach(([t,s])=>{const i=t.replace(/([-_][a-z])/gi,r=>r.toUpperCase().replace(/[-_]/g,""));e[i]=Rr(s)}),e},Xv=n=>{if(typeof n!="object"||n===null)return!1;const e=Object.getPrototypeOf(n);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in n)&&!(Symbol.iterator in n)};var jt=function(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{c(s.next(u))}catch(h){o(h)}}function l(u){try{c(s.throw(u))}catch(h){o(h)}}function c(u){u.done?r(u.value):i(u.value).then(a,l)}c((s=s.apply(n,e||[])).next())})};const Ki=n=>n.msg||n.message||n.error_description||n.error||JSON.stringify(n),Zv=(n,e,t)=>jt(void 0,void 0,void 0,function*(){const s=yield Qv();n instanceof s&&!(t!=null&&t.noResolveJson)?n.json().then(i=>{const r=n.status||500,o=(i==null?void 0:i.statusCode)||r+"";e(new Jv(Ki(i),r,o))}).catch(i=>{e(new Ar(Ki(i),i))}):e(new Ar(Ki(n),n))}),ew=(n,e,t,s)=>{const i={method:n,headers:(e==null?void 0:e.headers)||{}};return n==="GET"||!s?i:(Xv(s)?(i.headers=Object.assign({"Content-Type":"application/json"},e==null?void 0:e.headers),i.body=JSON.stringify(s)):i.body=s,Object.assign(Object.assign({},i),t))};function us(n,e,t,s,i,r){return jt(this,void 0,void 0,function*(){return new Promise((o,a)=>{n(t,ew(e,s,i,r)).then(l=>{if(!l.ok)throw l;return s!=null&&s.noResolveJson?l:l.json()}).then(l=>o(l)).catch(l=>Zv(l,a,s))})})}function zs(n,e,t,s){return jt(this,void 0,void 0,function*(){return us(n,"GET",e,t,s)})}function Ve(n,e,t,s,i){return jt(this,void 0,void 0,function*(){return us(n,"POST",e,s,i,t)})}function Pr(n,e,t,s,i){return jt(this,void 0,void 0,function*(){return us(n,"PUT",e,s,i,t)})}function tw(n,e,t,s){return jt(this,void 0,void 0,function*(){return us(n,"HEAD",e,Object.assign(Object.assign({},t),{noResolveJson:!0}),s)})}function uh(n,e,t,s,i){return jt(this,void 0,void 0,function*(){return us(n,"DELETE",e,s,i,t)})}var ue=function(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{c(s.next(u))}catch(h){o(h)}}function l(u){try{c(s.throw(u))}catch(h){o(h)}}function c(u){u.done?r(u.value):i(u.value).then(a,l)}c((s=s.apply(n,e||[])).next())})};const nw={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},gl={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};class sw{constructor(e,t={},s,i){this.url=e,this.headers=t,this.bucketId=s,this.fetch=ch(i)}uploadOrUpdate(e,t,s,i){return ue(this,void 0,void 0,function*(){try{let r;const o=Object.assign(Object.assign({},gl),i);let a=Object.assign(Object.assign({},this.headers),e==="POST"&&{"x-upsert":String(o.upsert)});const l=o.metadata;typeof Blob<"u"&&s instanceof Blob?(r=new FormData,r.append("cacheControl",o.cacheControl),l&&r.append("metadata",this.encodeMetadata(l)),r.append("",s)):typeof FormData<"u"&&s instanceof FormData?(r=s,r.append("cacheControl",o.cacheControl),l&&r.append("metadata",this.encodeMetadata(l))):(r=s,a["cache-control"]=`max-age=${o.cacheControl}`,a["content-type"]=o.contentType,l&&(a["x-metadata"]=this.toBase64(this.encodeMetadata(l)))),i!=null&&i.headers&&(a=Object.assign(Object.assign({},a),i.headers));const c=this._removeEmptyFolders(t),u=this._getFinalPath(c),h=yield(e=="PUT"?Pr:Ve)(this.fetch,`${this.url}/object/${u}`,r,Object.assign({headers:a},o!=null&&o.duplex?{duplex:o.duplex}:{}));return{data:{path:c,id:h.Id,fullPath:h.Key},error:null}}catch(r){if(ne(r))return{data:null,error:r};throw r}})}upload(e,t,s){return ue(this,void 0,void 0,function*(){return this.uploadOrUpdate("POST",e,t,s)})}uploadToSignedUrl(e,t,s,i){return ue(this,void 0,void 0,function*(){const r=this._removeEmptyFolders(e),o=this._getFinalPath(r),a=new URL(this.url+`/object/upload/sign/${o}`);a.searchParams.set("token",t);try{let l;const c=Object.assign({upsert:gl.upsert},i),u=Object.assign(Object.assign({},this.headers),{"x-upsert":String(c.upsert)});typeof Blob<"u"&&s instanceof Blob?(l=new FormData,l.append("cacheControl",c.cacheControl),l.append("",s)):typeof FormData<"u"&&s instanceof FormData?(l=s,l.append("cacheControl",c.cacheControl)):(l=s,u["cache-control"]=`max-age=${c.cacheControl}`,u["content-type"]=c.contentType);const h=yield Pr(this.fetch,a.toString(),l,{headers:u});return{data:{path:r,fullPath:h.Key},error:null}}catch(l){if(ne(l))return{data:null,error:l};throw l}})}createSignedUploadUrl(e,t){return ue(this,void 0,void 0,function*(){try{let s=this._getFinalPath(e);const i=Object.assign({},this.headers);t!=null&&t.upsert&&(i["x-upsert"]="true");const r=yield Ve(this.fetch,`${this.url}/object/upload/sign/${s}`,{},{headers:i}),o=new URL(this.url+r.url),a=o.searchParams.get("token");if(!a)throw new jo("No token returned by API");return{data:{signedUrl:o.toString(),path:e,token:a},error:null}}catch(s){if(ne(s))return{data:null,error:s};throw s}})}update(e,t,s){return ue(this,void 0,void 0,function*(){return this.uploadOrUpdate("PUT",e,t,s)})}move(e,t,s){return ue(this,void 0,void 0,function*(){try{return{data:yield Ve(this.fetch,`${this.url}/object/move`,{bucketId:this.bucketId,sourceKey:e,destinationKey:t,destinationBucket:s==null?void 0:s.destinationBucket},{headers:this.headers}),error:null}}catch(i){if(ne(i))return{data:null,error:i};throw i}})}copy(e,t,s){return ue(this,void 0,void 0,function*(){try{return{data:{path:(yield Ve(this.fetch,`${this.url}/object/copy`,{bucketId:this.bucketId,sourceKey:e,destinationKey:t,destinationBucket:s==null?void 0:s.destinationBucket},{headers:this.headers})).Key},error:null}}catch(i){if(ne(i))return{data:null,error:i};throw i}})}createSignedUrl(e,t,s){return ue(this,void 0,void 0,function*(){try{let i=this._getFinalPath(e),r=yield Ve(this.fetch,`${this.url}/object/sign/${i}`,Object.assign({expiresIn:t},s!=null&&s.transform?{transform:s.transform}:{}),{headers:this.headers});const o=s!=null&&s.download?`&download=${s.download===!0?"":s.download}`:"";return r={signedUrl:encodeURI(`${this.url}${r.signedURL}${o}`)},{data:r,error:null}}catch(i){if(ne(i))return{data:null,error:i};throw i}})}createSignedUrls(e,t,s){return ue(this,void 0,void 0,function*(){try{const i=yield Ve(this.fetch,`${this.url}/object/sign/${this.bucketId}`,{expiresIn:t,paths:e},{headers:this.headers}),r=s!=null&&s.download?`&download=${s.download===!0?"":s.download}`:"";return{data:i.map(o=>Object.assign(Object.assign({},o),{signedUrl:o.signedURL?encodeURI(`${this.url}${o.signedURL}${r}`):null})),error:null}}catch(i){if(ne(i))return{data:null,error:i};throw i}})}download(e,t){return ue(this,void 0,void 0,function*(){const i=typeof(t==null?void 0:t.transform)<"u"?"render/image/authenticated":"object",r=this.transformOptsToQueryString((t==null?void 0:t.transform)||{}),o=r?`?${r}`:"";try{const a=this._getFinalPath(e);return{data:yield(yield zs(this.fetch,`${this.url}/${i}/${a}${o}`,{headers:this.headers,noResolveJson:!0})).blob(),error:null}}catch(a){if(ne(a))return{data:null,error:a};throw a}})}info(e){return ue(this,void 0,void 0,function*(){const t=this._getFinalPath(e);try{const s=yield zs(this.fetch,`${this.url}/object/info/${t}`,{headers:this.headers});return{data:Rr(s),error:null}}catch(s){if(ne(s))return{data:null,error:s};throw s}})}exists(e){return ue(this,void 0,void 0,function*(){const t=this._getFinalPath(e);try{return yield tw(this.fetch,`${this.url}/object/${t}`,{headers:this.headers}),{data:!0,error:null}}catch(s){if(ne(s)&&s instanceof Ar){const i=s.originalError;if([400,404].includes(i==null?void 0:i.status))return{data:!1,error:s}}throw s}})}getPublicUrl(e,t){const s=this._getFinalPath(e),i=[],r=t!=null&&t.download?`download=${t.download===!0?"":t.download}`:"";r!==""&&i.push(r);const a=typeof(t==null?void 0:t.transform)<"u"?"render/image":"object",l=this.transformOptsToQueryString((t==null?void 0:t.transform)||{});l!==""&&i.push(l);let c=i.join("&");return c!==""&&(c=`?${c}`),{data:{publicUrl:encodeURI(`${this.url}/${a}/public/${s}${c}`)}}}remove(e){return ue(this,void 0,void 0,function*(){try{return{data:yield uh(this.fetch,`${this.url}/object/${this.bucketId}`,{prefixes:e},{headers:this.headers}),error:null}}catch(t){if(ne(t))return{data:null,error:t};throw t}})}list(e,t,s){return ue(this,void 0,void 0,function*(){try{const i=Object.assign(Object.assign(Object.assign({},nw),t),{prefix:e||""});return{data:yield Ve(this.fetch,`${this.url}/object/list/${this.bucketId}`,i,{headers:this.headers},s),error:null}}catch(i){if(ne(i))return{data:null,error:i};throw i}})}encodeMetadata(e){return JSON.stringify(e)}toBase64(e){return typeof Buffer<"u"?Buffer.from(e).toString("base64"):btoa(e)}_getFinalPath(e){return`${this.bucketId}/${e.replace(/^\/+/,"")}`}_removeEmptyFolders(e){return e.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}transformOptsToQueryString(e){const t=[];return e.width&&t.push(`width=${e.width}`),e.height&&t.push(`height=${e.height}`),e.resize&&t.push(`resize=${e.resize}`),e.format&&t.push(`format=${e.format}`),e.quality&&t.push(`quality=${e.quality}`),t.join("&")}}const iw="2.10.4",rw={"X-Client-Info":`storage-js/${iw}`};var Ut=function(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{c(s.next(u))}catch(h){o(h)}}function l(u){try{c(s.throw(u))}catch(h){o(h)}}function c(u){u.done?r(u.value):i(u.value).then(a,l)}c((s=s.apply(n,e||[])).next())})};class ow{constructor(e,t={},s,i){const r=new URL(e);i!=null&&i.useNewHostname&&/supabase\.(co|in|red)$/.test(r.hostname)&&!r.hostname.includes("storage.supabase.")&&(r.hostname=r.hostname.replace("supabase.","storage.supabase.")),this.url=r.href,this.headers=Object.assign(Object.assign({},rw),t),this.fetch=ch(s)}listBuckets(){return Ut(this,void 0,void 0,function*(){try{return{data:yield zs(this.fetch,`${this.url}/bucket`,{headers:this.headers}),error:null}}catch(e){if(ne(e))return{data:null,error:e};throw e}})}getBucket(e){return Ut(this,void 0,void 0,function*(){try{return{data:yield zs(this.fetch,`${this.url}/bucket/${e}`,{headers:this.headers}),error:null}}catch(t){if(ne(t))return{data:null,error:t};throw t}})}createBucket(e,t={public:!1}){return Ut(this,void 0,void 0,function*(){try{return{data:yield Ve(this.fetch,`${this.url}/bucket`,{id:e,name:e,type:t.type,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:this.headers}),error:null}}catch(s){if(ne(s))return{data:null,error:s};throw s}})}updateBucket(e,t){return Ut(this,void 0,void 0,function*(){try{return{data:yield Pr(this.fetch,`${this.url}/bucket/${e}`,{id:e,name:e,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:this.headers}),error:null}}catch(s){if(ne(s))return{data:null,error:s};throw s}})}emptyBucket(e){return Ut(this,void 0,void 0,function*(){try{return{data:yield Ve(this.fetch,`${this.url}/bucket/${e}/empty`,{},{headers:this.headers}),error:null}}catch(t){if(ne(t))return{data:null,error:t};throw t}})}deleteBucket(e){return Ut(this,void 0,void 0,function*(){try{return{data:yield uh(this.fetch,`${this.url}/bucket/${e}`,{},{headers:this.headers}),error:null}}catch(t){if(ne(t))return{data:null,error:t};throw t}})}}class aw extends ow{constructor(e,t={},s,i){super(e,t,s,i)}from(e){return new sw(this.url,this.headers,e,this.fetch)}}const lw="2.54.0";let Sn="";typeof Deno<"u"?Sn="deno":typeof document<"u"?Sn="web":typeof navigator<"u"&&navigator.product==="ReactNative"?Sn="react-native":Sn="node";const cw={"X-Client-Info":`supabase-js-${Sn}/${lw}`},uw={headers:cw},hw={schema:"public"},dw={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},fw={};var pw=function(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{c(s.next(u))}catch(h){o(h)}}function l(u){try{c(s.throw(u))}catch(h){o(h)}}function c(u){u.done?r(u.value):i(u.value).then(a,l)}c((s=s.apply(n,e||[])).next())})};const gw=n=>{let e;return n?e=n:typeof fetch>"u"?e=Ju:e=fetch,(...t)=>e(...t)},_w=()=>typeof Headers>"u"?Yu:Headers,mw=(n,e,t)=>{const s=gw(t),i=_w();return(r,o)=>pw(void 0,void 0,void 0,function*(){var a;const l=(a=yield e())!==null&&a!==void 0?a:n;let c=new i(o==null?void 0:o.headers);return c.has("apikey")||c.set("apikey",n),c.has("Authorization")||c.set("Authorization",`Bearer ${l}`),s(r,Object.assign(Object.assign({},o),{headers:c}))})};var yw=function(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{c(s.next(u))}catch(h){o(h)}}function l(u){try{c(s.throw(u))}catch(h){o(h)}}function c(u){u.done?r(u.value):i(u.value).then(a,l)}c((s=s.apply(n,e||[])).next())})};function vw(n){return n.endsWith("/")?n:n+"/"}function ww(n,e){var t,s;const{db:i,auth:r,realtime:o,global:a}=n,{db:l,auth:c,realtime:u,global:h}=e,d={db:Object.assign(Object.assign({},l),i),auth:Object.assign(Object.assign({},c),r),realtime:Object.assign(Object.assign({},u),o),storage:{},global:Object.assign(Object.assign(Object.assign({},h),a),{headers:Object.assign(Object.assign({},(t=h==null?void 0:h.headers)!==null&&t!==void 0?t:{}),(s=a==null?void 0:a.headers)!==null&&s!==void 0?s:{})}),accessToken:()=>yw(this,void 0,void 0,function*(){return""})};return n.accessToken?d.accessToken=n.accessToken:delete d.accessToken,d}const hh="2.71.1",Kt=30*1e3,Or=3,Gi=Or*Kt,bw="http://localhost:9999",Ew="supabase.auth.token",Sw={"X-Client-Info":`gotrue-js/${hh}`},Nr="X-Supabase-Api-Version",dh={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},Tw=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,Iw=10*60*1e3;class Bo extends Error{constructor(e,t,s){super(e),this.__isAuthError=!0,this.name="AuthError",this.status=t,this.code=s}}function P(n){return typeof n=="object"&&n!==null&&"__isAuthError"in n}class kw extends Bo{constructor(e,t,s){super(e,t,s),this.name="AuthApiError",this.status=t,this.code=s}}function Cw(n){return P(n)&&n.name==="AuthApiError"}class fh extends Bo{constructor(e,t){super(e),this.name="AuthUnknownError",this.originalError=t}}class ft extends Bo{constructor(e,t,s,i){super(e,s,i),this.name=t,this.status=s}}class Ze extends ft{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}}function Aw(n){return P(n)&&n.name==="AuthSessionMissingError"}class gs extends ft{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}}class _s extends ft{constructor(e){super(e,"AuthInvalidCredentialsError",400,void 0)}}class ms extends ft{constructor(e,t=null){super(e,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}function Rw(n){return P(n)&&n.name==="AuthImplicitGrantRedirectError"}class _l extends ft{constructor(e,t=null){super(e,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}class xr extends ft{constructor(e,t){super(e,"AuthRetryableFetchError",t,void 0)}}function Ji(n){return P(n)&&n.name==="AuthRetryableFetchError"}class ml extends ft{constructor(e,t,s){super(e,"AuthWeakPasswordError",t,"weak_password"),this.reasons=s}}class Dr extends ft{constructor(e){super(e,"AuthInvalidJwtError",400,"invalid_jwt")}}const Ks="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),yl=` 	
\r=`.split(""),Pw=(()=>{const n=new Array(128);for(let e=0;e<n.length;e+=1)n[e]=-1;for(let e=0;e<yl.length;e+=1)n[yl[e].charCodeAt(0)]=-2;for(let e=0;e<Ks.length;e+=1)n[Ks[e].charCodeAt(0)]=e;return n})();function vl(n,e,t){if(n!==null)for(e.queue=e.queue<<8|n,e.queuedBits+=8;e.queuedBits>=6;){const s=e.queue>>e.queuedBits-6&63;t(Ks[s]),e.queuedBits-=6}else if(e.queuedBits>0)for(e.queue=e.queue<<6-e.queuedBits,e.queuedBits=6;e.queuedBits>=6;){const s=e.queue>>e.queuedBits-6&63;t(Ks[s]),e.queuedBits-=6}}function ph(n,e,t){const s=Pw[n];if(s>-1)for(e.queue=e.queue<<6|s,e.queuedBits+=6;e.queuedBits>=8;)t(e.queue>>e.queuedBits-8&255),e.queuedBits-=8;else{if(s===-2)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(n)}"`)}}function wl(n){const e=[],t=o=>{e.push(String.fromCodePoint(o))},s={utf8seq:0,codepoint:0},i={queue:0,queuedBits:0},r=o=>{xw(o,s,t)};for(let o=0;o<n.length;o+=1)ph(n.charCodeAt(o),i,r);return e.join("")}function Ow(n,e){if(n<=127){e(n);return}else if(n<=2047){e(192|n>>6),e(128|n&63);return}else if(n<=65535){e(224|n>>12),e(128|n>>6&63),e(128|n&63);return}else if(n<=1114111){e(240|n>>18),e(128|n>>12&63),e(128|n>>6&63),e(128|n&63);return}throw new Error(`Unrecognized Unicode codepoint: ${n.toString(16)}`)}function Nw(n,e){for(let t=0;t<n.length;t+=1){let s=n.charCodeAt(t);if(s>55295&&s<=56319){const i=(s-55296)*1024&65535;s=(n.charCodeAt(t+1)-56320&65535|i)+65536,t+=1}Ow(s,e)}}function xw(n,e,t){if(e.utf8seq===0){if(n<=127){t(n);return}for(let s=1;s<6;s+=1)if(!(n>>7-s&1)){e.utf8seq=s;break}if(e.utf8seq===2)e.codepoint=n&31;else if(e.utf8seq===3)e.codepoint=n&15;else if(e.utf8seq===4)e.codepoint=n&7;else throw new Error("Invalid UTF-8 sequence");e.utf8seq-=1}else if(e.utf8seq>0){if(n<=127)throw new Error("Invalid UTF-8 sequence");e.codepoint=e.codepoint<<6|n&63,e.utf8seq-=1,e.utf8seq===0&&t(e.codepoint)}}function Dw(n){const e=[],t={queue:0,queuedBits:0},s=i=>{e.push(i)};for(let i=0;i<n.length;i+=1)ph(n.charCodeAt(i),t,s);return new Uint8Array(e)}function Lw(n){const e=[];return Nw(n,t=>e.push(t)),new Uint8Array(e)}function Mw(n){const e=[],t={queue:0,queuedBits:0},s=i=>{e.push(i)};return n.forEach(i=>vl(i,t,s)),vl(null,t,s),e.join("")}function $w(n){return Math.round(Date.now()/1e3)+n}function Fw(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(n){const e=Math.random()*16|0;return(n=="x"?e:e&3|8).toString(16)})}const we=()=>typeof window<"u"&&typeof document<"u",gt={tested:!1,writable:!1},gh=()=>{if(!we())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(gt.tested)return gt.writable;const n=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(n,n),globalThis.localStorage.removeItem(n),gt.tested=!0,gt.writable=!0}catch{gt.tested=!0,gt.writable=!1}return gt.writable};function jw(n){const e={},t=new URL(n);if(t.hash&&t.hash[0]==="#")try{new URLSearchParams(t.hash.substring(1)).forEach((i,r)=>{e[r]=i})}catch{}return t.searchParams.forEach((s,i)=>{e[i]=s}),e}const _h=n=>{let e;return n?e=n:typeof fetch>"u"?e=(...t)=>ls(async()=>{const{default:s}=await Promise.resolve().then(()=>gn);return{default:s}},void 0).then(({default:s})=>s(...t)):e=fetch,(...t)=>e(...t)},Bw=n=>typeof n=="object"&&n!==null&&"status"in n&&"ok"in n&&"json"in n&&typeof n.json=="function",Gt=async(n,e,t)=>{await n.setItem(e,JSON.stringify(t))},_t=async(n,e)=>{const t=await n.getItem(e);if(!t)return null;try{return JSON.parse(t)}catch{return t}},Xe=async(n,e)=>{await n.removeItem(e)};class ki{constructor(){this.promise=new ki.promiseConstructor((e,t)=>{this.resolve=e,this.reject=t})}}ki.promiseConstructor=Promise;function Yi(n){const e=n.split(".");if(e.length!==3)throw new Dr("Invalid JWT structure");for(let s=0;s<e.length;s++)if(!Tw.test(e[s]))throw new Dr("JWT not in base64url format");return{header:JSON.parse(wl(e[0])),payload:JSON.parse(wl(e[1])),signature:Dw(e[2]),raw:{header:e[0],payload:e[1]}}}async function Uw(n){return await new Promise(e=>{setTimeout(()=>e(null),n)})}function Ww(n,e){return new Promise((s,i)=>{(async()=>{for(let r=0;r<1/0;r++)try{const o=await n(r);if(!e(r,null,o)){s(o);return}}catch(o){if(!e(r,o)){i(o);return}}})()})}function Vw(n){return("0"+n.toString(16)).substr(-2)}function Hw(){const e=new Uint32Array(56);if(typeof crypto>"u"){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",s=t.length;let i="";for(let r=0;r<56;r++)i+=t.charAt(Math.floor(Math.random()*s));return i}return crypto.getRandomValues(e),Array.from(e,Vw).join("")}async function qw(n){const t=new TextEncoder().encode(n),s=await crypto.subtle.digest("SHA-256",t),i=new Uint8Array(s);return Array.from(i).map(r=>String.fromCharCode(r)).join("")}async function zw(n){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),n;const t=await qw(n);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function Wt(n,e,t=!1){const s=Hw();let i=s;t&&(i+="/PASSWORD_RECOVERY"),await Gt(n,`${e}-code-verifier`,i);const r=await zw(s);return[r,s===r?"plain":"s256"]}const Kw=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function Gw(n){const e=n.headers.get(Nr);if(!e||!e.match(Kw))return null;try{return new Date(`${e}T00:00:00.0Z`)}catch{return null}}function Jw(n){if(!n)throw new Error("Missing exp claim");const e=Math.floor(Date.now()/1e3);if(n<=e)throw new Error("JWT has expired")}function Yw(n){switch(n){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}const Qw=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;function Vt(n){if(!Qw.test(n))throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function Qi(){const n={};return new Proxy(n,{get:(e,t)=>{if(t==="__isUserNotAvailableProxy")return!0;if(typeof t=="symbol"){const s=t.toString();if(s==="Symbol(Symbol.toPrimitive)"||s==="Symbol(Symbol.toStringTag)"||s==="Symbol(util.inspect.custom)")return}throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${t}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,t)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,t)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function bl(n){return JSON.parse(JSON.stringify(n))}var Xw=function(n,e){var t={};for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&e.indexOf(s)<0&&(t[s]=n[s]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,s=Object.getOwnPropertySymbols(n);i<s.length;i++)e.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(n,s[i])&&(t[s[i]]=n[s[i]]);return t};const vt=n=>n.msg||n.message||n.error_description||n.error||JSON.stringify(n),Zw=[502,503,504];async function El(n){var e;if(!Bw(n))throw new xr(vt(n),0);if(Zw.includes(n.status))throw new xr(vt(n),n.status);let t;try{t=await n.json()}catch(r){throw new fh(vt(r),r)}let s;const i=Gw(n);if(i&&i.getTime()>=dh["2024-01-01"].timestamp&&typeof t=="object"&&t&&typeof t.code=="string"?s=t.code:typeof t=="object"&&t&&typeof t.error_code=="string"&&(s=t.error_code),s){if(s==="weak_password")throw new ml(vt(t),n.status,((e=t.weak_password)===null||e===void 0?void 0:e.reasons)||[]);if(s==="session_not_found")throw new Ze}else if(typeof t=="object"&&t&&typeof t.weak_password=="object"&&t.weak_password&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.reasons.reduce((r,o)=>r&&typeof o=="string",!0))throw new ml(vt(t),n.status,t.weak_password.reasons);throw new kw(vt(t),n.status||500,s)}const eb=(n,e,t,s)=>{const i={method:n,headers:(e==null?void 0:e.headers)||{}};return n==="GET"?i:(i.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},e==null?void 0:e.headers),i.body=JSON.stringify(s),Object.assign(Object.assign({},i),t))};async function F(n,e,t,s){var i;const r=Object.assign({},s==null?void 0:s.headers);r[Nr]||(r[Nr]=dh["2024-01-01"].name),s!=null&&s.jwt&&(r.Authorization=`Bearer ${s.jwt}`);const o=(i=s==null?void 0:s.query)!==null&&i!==void 0?i:{};s!=null&&s.redirectTo&&(o.redirect_to=s.redirectTo);const a=Object.keys(o).length?"?"+new URLSearchParams(o).toString():"",l=await tb(n,e,t+a,{headers:r,noResolveJson:s==null?void 0:s.noResolveJson},{},s==null?void 0:s.body);return s!=null&&s.xform?s==null?void 0:s.xform(l):{data:Object.assign({},l),error:null}}async function tb(n,e,t,s,i,r){const o=eb(e,s,i,r);let a;try{a=await n(t,Object.assign({},o))}catch(l){throw console.error(l),new xr(vt(l),0)}if(a.ok||await El(a),s!=null&&s.noResolveJson)return a;try{return await a.json()}catch(l){await El(l)}}function je(n){var e;let t=null;rb(n)&&(t=Object.assign({},n),n.expires_at||(t.expires_at=$w(n.expires_in)));const s=(e=n.user)!==null&&e!==void 0?e:n;return{data:{session:t,user:s},error:null}}function Sl(n){const e=je(n);return!e.error&&n.weak_password&&typeof n.weak_password=="object"&&Array.isArray(n.weak_password.reasons)&&n.weak_password.reasons.length&&n.weak_password.message&&typeof n.weak_password.message=="string"&&n.weak_password.reasons.reduce((t,s)=>t&&typeof s=="string",!0)&&(e.data.weak_password=n.weak_password),e}function et(n){var e;return{data:{user:(e=n.user)!==null&&e!==void 0?e:n},error:null}}function nb(n){return{data:n,error:null}}function sb(n){const{action_link:e,email_otp:t,hashed_token:s,redirect_to:i,verification_type:r}=n,o=Xw(n,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),a={action_link:e,email_otp:t,hashed_token:s,redirect_to:i,verification_type:r},l=Object.assign({},o);return{data:{properties:a,user:l},error:null}}function ib(n){return n}function rb(n){return n.access_token&&n.refresh_token&&n.expires_in}const Xi=["global","local","others"];var ob=function(n,e){var t={};for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&e.indexOf(s)<0&&(t[s]=n[s]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,s=Object.getOwnPropertySymbols(n);i<s.length;i++)e.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(n,s[i])&&(t[s[i]]=n[s[i]]);return t};class ab{constructor({url:e="",headers:t={},fetch:s}){this.url=e,this.headers=t,this.fetch=_h(s),this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)}}async signOut(e,t=Xi[0]){if(Xi.indexOf(t)<0)throw new Error(`@supabase/auth-js: Parameter scope must be one of ${Xi.join(", ")}`);try{return await F(this.fetch,"POST",`${this.url}/logout?scope=${t}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(s){if(P(s))return{data:null,error:s};throw s}}async inviteUserByEmail(e,t={}){try{return await F(this.fetch,"POST",`${this.url}/invite`,{body:{email:e,data:t.data},headers:this.headers,redirectTo:t.redirectTo,xform:et})}catch(s){if(P(s))return{data:{user:null},error:s};throw s}}async generateLink(e){try{const{options:t}=e,s=ob(e,["options"]),i=Object.assign(Object.assign({},s),t);return"newEmail"in s&&(i.new_email=s==null?void 0:s.newEmail,delete i.newEmail),await F(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:i,headers:this.headers,xform:sb,redirectTo:t==null?void 0:t.redirectTo})}catch(t){if(P(t))return{data:{properties:null,user:null},error:t};throw t}}async createUser(e){try{return await F(this.fetch,"POST",`${this.url}/admin/users`,{body:e,headers:this.headers,xform:et})}catch(t){if(P(t))return{data:{user:null},error:t};throw t}}async listUsers(e){var t,s,i,r,o,a,l;try{const c={nextPage:null,lastPage:0,total:0},u=await F(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(s=(t=e==null?void 0:e.page)===null||t===void 0?void 0:t.toString())!==null&&s!==void 0?s:"",per_page:(r=(i=e==null?void 0:e.perPage)===null||i===void 0?void 0:i.toString())!==null&&r!==void 0?r:""},xform:ib});if(u.error)throw u.error;const h=await u.json(),d=(o=u.headers.get("x-total-count"))!==null&&o!==void 0?o:0,v=(l=(a=u.headers.get("link"))===null||a===void 0?void 0:a.split(","))!==null&&l!==void 0?l:[];return v.length>0&&(v.forEach(b=>{const S=parseInt(b.split(";")[0].split("=")[1].substring(0,1)),E=JSON.parse(b.split(";")[1].split("=")[1]);c[`${E}Page`]=S}),c.total=parseInt(d)),{data:Object.assign(Object.assign({},h),c),error:null}}catch(c){if(P(c))return{data:{users:[]},error:c};throw c}}async getUserById(e){Vt(e);try{return await F(this.fetch,"GET",`${this.url}/admin/users/${e}`,{headers:this.headers,xform:et})}catch(t){if(P(t))return{data:{user:null},error:t};throw t}}async updateUserById(e,t){Vt(e);try{return await F(this.fetch,"PUT",`${this.url}/admin/users/${e}`,{body:t,headers:this.headers,xform:et})}catch(s){if(P(s))return{data:{user:null},error:s};throw s}}async deleteUser(e,t=!1){Vt(e);try{return await F(this.fetch,"DELETE",`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:t},xform:et})}catch(s){if(P(s))return{data:{user:null},error:s};throw s}}async _listFactors(e){Vt(e.userId);try{const{data:t,error:s}=await F(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:i=>({data:{factors:i},error:null})});return{data:t,error:s}}catch(t){if(P(t))return{data:null,error:t};throw t}}async _deleteFactor(e){Vt(e.userId),Vt(e.id);try{return{data:await F(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(t){if(P(t))return{data:null,error:t};throw t}}}function Tl(n={}){return{getItem:e=>n[e]||null,setItem:(e,t)=>{n[e]=t},removeItem:e=>{delete n[e]}}}function lb(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}const Ht={debug:!!(globalThis&&gh()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug")==="true")};class mh extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}}class cb extends mh{}async function ub(n,e,t){Ht.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire lock",n,e);const s=new globalThis.AbortController;return e>0&&setTimeout(()=>{s.abort(),Ht.debug&&console.log("@supabase/gotrue-js: navigatorLock acquire timed out",n)},e),await Promise.resolve().then(()=>globalThis.navigator.locks.request(n,e===0?{mode:"exclusive",ifAvailable:!0}:{mode:"exclusive",signal:s.signal},async i=>{if(i){Ht.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquired",n,i.name);try{return await t()}finally{Ht.debug&&console.log("@supabase/gotrue-js: navigatorLock: released",n,i.name)}}else{if(e===0)throw Ht.debug&&console.log("@supabase/gotrue-js: navigatorLock: not immediately available",n),new cb(`Acquiring an exclusive Navigator LockManager lock "${n}" immediately failed`);if(Ht.debug)try{const r=await globalThis.navigator.locks.query();console.log("@supabase/gotrue-js: Navigator LockManager state",JSON.stringify(r,null,"  "))}catch(r){console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state",r)}return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"),await t()}}))}lb();const hb={url:bw,storageKey:Ew,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:Sw,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1};async function Il(n,e,t){return await t()}const qt={};class Yn{constructor(e){var t,s;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log,this.instanceID=Yn.nextInstanceID,Yn.nextInstanceID+=1,this.instanceID>0&&we()&&console.warn("Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.");const i=Object.assign(Object.assign({},hb),e);if(this.logDebugMessages=!!i.debug,typeof i.debug=="function"&&(this.logger=i.debug),this.persistSession=i.persistSession,this.storageKey=i.storageKey,this.autoRefreshToken=i.autoRefreshToken,this.admin=new ab({url:i.url,headers:i.headers,fetch:i.fetch}),this.url=i.url,this.headers=i.headers,this.fetch=_h(i.fetch),this.lock=i.lock||Il,this.detectSessionInUrl=i.detectSessionInUrl,this.flowType=i.flowType,this.hasCustomAuthorizationHeader=i.hasCustomAuthorizationHeader,i.lock?this.lock=i.lock:we()&&(!((t=globalThis==null?void 0:globalThis.navigator)===null||t===void 0)&&t.locks)?this.lock=ub:this.lock=Il,this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this)},this.persistSession?(i.storage?this.storage=i.storage:gh()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=Tl(this.memoryStorage)),i.userStorage&&(this.userStorage=i.userStorage)):(this.memoryStorage={},this.storage=Tl(this.memoryStorage)),we()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(r){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",r)}(s=this.broadcastChannel)===null||s===void 0||s.addEventListener("message",async r=>{this._debug("received broadcast notification from other tab or client",r),await this._notifyAllSubscribers(r.data.event,r.data.session,!1)})}this.initialize()}get jwks(){var e,t;return(t=(e=qt[this.storageKey])===null||e===void 0?void 0:e.jwks)!==null&&t!==void 0?t:{keys:[]}}set jwks(e){qt[this.storageKey]=Object.assign(Object.assign({},qt[this.storageKey]),{jwks:e})}get jwks_cached_at(){var e,t;return(t=(e=qt[this.storageKey])===null||e===void 0?void 0:e.cachedAt)!==null&&t!==void 0?t:Number.MIN_SAFE_INTEGER}set jwks_cached_at(e){qt[this.storageKey]=Object.assign(Object.assign({},qt[this.storageKey]),{cachedAt:e})}_debug(...e){return this.logDebugMessages&&this.logger(`GoTrueClient@${this.instanceID} (${hh}) ${new Date().toISOString()}`,...e),this}async initialize(){return this.initializePromise?await this.initializePromise:(this.initializePromise=(async()=>await this._acquireLock(-1,async()=>await this._initialize()))(),await this.initializePromise)}async _initialize(){var e;try{const t=jw(window.location.href);let s="none";if(this._isImplicitGrantCallback(t)?s="implicit":await this._isPKCECallback(t)&&(s="pkce"),we()&&this.detectSessionInUrl&&s!=="none"){const{data:i,error:r}=await this._getSessionFromURL(t,s);if(r){if(this._debug("#_initialize()","error detecting session from URL",r),Rw(r)){const l=(e=r.details)===null||e===void 0?void 0:e.code;if(l==="identity_already_exists"||l==="identity_not_found"||l==="single_identity_not_deletable")return{error:r}}return await this._removeSession(),{error:r}}const{session:o,redirectType:a}=i;return this._debug("#_initialize()","detected session in URL",o,"redirect type",a),await this._saveSession(o),setTimeout(async()=>{a==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",o):await this._notifyAllSubscribers("SIGNED_IN",o)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(t){return P(t)?{error:t}:{error:new fh("Unexpected error during initialization",t)}}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(e){var t,s,i;try{const r=await F(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(s=(t=e==null?void 0:e.options)===null||t===void 0?void 0:t.data)!==null&&s!==void 0?s:{},gotrue_meta_security:{captcha_token:(i=e==null?void 0:e.options)===null||i===void 0?void 0:i.captchaToken}},xform:je}),{data:o,error:a}=r;if(a||!o)return{data:{user:null,session:null},error:a};const l=o.session,c=o.user;return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",l)),{data:{user:c,session:l},error:null}}catch(r){if(P(r))return{data:{user:null,session:null},error:r};throw r}}async signUp(e){var t,s,i;try{let r;if("email"in e){const{email:u,password:h,options:d}=e;let v=null,b=null;this.flowType==="pkce"&&([v,b]=await Wt(this.storage,this.storageKey)),r=await F(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:d==null?void 0:d.emailRedirectTo,body:{email:u,password:h,data:(t=d==null?void 0:d.data)!==null&&t!==void 0?t:{},gotrue_meta_security:{captcha_token:d==null?void 0:d.captchaToken},code_challenge:v,code_challenge_method:b},xform:je})}else if("phone"in e){const{phone:u,password:h,options:d}=e;r=await F(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:u,password:h,data:(s=d==null?void 0:d.data)!==null&&s!==void 0?s:{},channel:(i=d==null?void 0:d.channel)!==null&&i!==void 0?i:"sms",gotrue_meta_security:{captcha_token:d==null?void 0:d.captchaToken}},xform:je})}else throw new _s("You must provide either an email or phone number and a password");const{data:o,error:a}=r;if(a||!o)return{data:{user:null,session:null},error:a};const l=o.session,c=o.user;return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",l)),{data:{user:c,session:l},error:null}}catch(r){if(P(r))return{data:{user:null,session:null},error:r};throw r}}async signInWithPassword(e){try{let t;if("email"in e){const{email:r,password:o,options:a}=e;t=await F(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:r,password:o,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}},xform:Sl})}else if("phone"in e){const{phone:r,password:o,options:a}=e;t=await F(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:r,password:o,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}},xform:Sl})}else throw new _s("You must provide either an email or phone number and a password");const{data:s,error:i}=t;return i?{data:{user:null,session:null},error:i}:!s||!s.session||!s.user?{data:{user:null,session:null},error:new gs}:(s.session&&(await this._saveSession(s.session),await this._notifyAllSubscribers("SIGNED_IN",s.session)),{data:Object.assign({user:s.user,session:s.session},s.weak_password?{weakPassword:s.weak_password}:null),error:i})}catch(t){if(P(t))return{data:{user:null,session:null},error:t};throw t}}async signInWithOAuth(e){var t,s,i,r;return await this._handleProviderSignIn(e.provider,{redirectTo:(t=e.options)===null||t===void 0?void 0:t.redirectTo,scopes:(s=e.options)===null||s===void 0?void 0:s.scopes,queryParams:(i=e.options)===null||i===void 0?void 0:i.queryParams,skipBrowserRedirect:(r=e.options)===null||r===void 0?void 0:r.skipBrowserRedirect})}async exchangeCodeForSession(e){return await this.initializePromise,this._acquireLock(-1,async()=>this._exchangeCodeForSession(e))}async signInWithWeb3(e){const{chain:t}=e;if(t==="solana")return await this.signInWithSolana(e);throw new Error(`@supabase/auth-js: Unsupported chain "${t}"`)}async signInWithSolana(e){var t,s,i,r,o,a,l,c,u,h,d,v;let b,S;if("message"in e)b=e.message,S=e.signature;else{const{chain:E,wallet:C,statement:U,options:I}=e;let R;if(we())if(typeof C=="object")R=C;else{const j=window;if("solana"in j&&typeof j.solana=="object"&&("signIn"in j.solana&&typeof j.solana.signIn=="function"||"signMessage"in j.solana&&typeof j.solana.signMessage=="function"))R=j.solana;else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")}else{if(typeof C!="object"||!(I!=null&&I.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");R=C}const X=new URL((t=I==null?void 0:I.url)!==null&&t!==void 0?t:window.location.href);if("signIn"in R&&R.signIn){const j=await R.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},I==null?void 0:I.signInWithSolana),{version:"1",domain:X.host,uri:X.href}),U?{statement:U}:null));let _;if(Array.isArray(j)&&j[0]&&typeof j[0]=="object")_=j[0];else if(j&&typeof j=="object"&&"signedMessage"in j&&"signature"in j)_=j;else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");if("signedMessage"in _&&"signature"in _&&(typeof _.signedMessage=="string"||_.signedMessage instanceof Uint8Array)&&_.signature instanceof Uint8Array)b=typeof _.signedMessage=="string"?_.signedMessage:new TextDecoder().decode(_.signedMessage),S=_.signature;else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")}else{if(!("signMessage"in R)||typeof R.signMessage!="function"||!("publicKey"in R)||typeof R!="object"||!R.publicKey||!("toBase58"in R.publicKey)||typeof R.publicKey.toBase58!="function")throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");b=[`${X.host} wants you to sign in with your Solana account:`,R.publicKey.toBase58(),...U?["",U,""]:[""],"Version: 1",`URI: ${X.href}`,`Issued At: ${(i=(s=I==null?void 0:I.signInWithSolana)===null||s===void 0?void 0:s.issuedAt)!==null&&i!==void 0?i:new Date().toISOString()}`,...!((r=I==null?void 0:I.signInWithSolana)===null||r===void 0)&&r.notBefore?[`Not Before: ${I.signInWithSolana.notBefore}`]:[],...!((o=I==null?void 0:I.signInWithSolana)===null||o===void 0)&&o.expirationTime?[`Expiration Time: ${I.signInWithSolana.expirationTime}`]:[],...!((a=I==null?void 0:I.signInWithSolana)===null||a===void 0)&&a.chainId?[`Chain ID: ${I.signInWithSolana.chainId}`]:[],...!((l=I==null?void 0:I.signInWithSolana)===null||l===void 0)&&l.nonce?[`Nonce: ${I.signInWithSolana.nonce}`]:[],...!((c=I==null?void 0:I.signInWithSolana)===null||c===void 0)&&c.requestId?[`Request ID: ${I.signInWithSolana.requestId}`]:[],...!((h=(u=I==null?void 0:I.signInWithSolana)===null||u===void 0?void 0:u.resources)===null||h===void 0)&&h.length?["Resources",...I.signInWithSolana.resources.map(_=>`- ${_}`)]:[]].join(`
`);const j=await R.signMessage(new TextEncoder().encode(b),"utf8");if(!j||!(j instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");S=j}}try{const{data:E,error:C}=await F(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:b,signature:Mw(S)},!((d=e.options)===null||d===void 0)&&d.captchaToken?{gotrue_meta_security:{captcha_token:(v=e.options)===null||v===void 0?void 0:v.captchaToken}}:null),xform:je});if(C)throw C;return!E||!E.session||!E.user?{data:{user:null,session:null},error:new gs}:(E.session&&(await this._saveSession(E.session),await this._notifyAllSubscribers("SIGNED_IN",E.session)),{data:Object.assign({},E),error:C})}catch(E){if(P(E))return{data:{user:null,session:null},error:E};throw E}}async _exchangeCodeForSession(e){const t=await _t(this.storage,`${this.storageKey}-code-verifier`),[s,i]=(t??"").split("/");try{const{data:r,error:o}=await F(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:s},xform:je});if(await Xe(this.storage,`${this.storageKey}-code-verifier`),o)throw o;return!r||!r.session||!r.user?{data:{user:null,session:null,redirectType:null},error:new gs}:(r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers("SIGNED_IN",r.session)),{data:Object.assign(Object.assign({},r),{redirectType:i??null}),error:o})}catch(r){if(P(r))return{data:{user:null,session:null,redirectType:null},error:r};throw r}}async signInWithIdToken(e){try{const{options:t,provider:s,token:i,access_token:r,nonce:o}=e,a=await F(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:s,id_token:i,access_token:r,nonce:o,gotrue_meta_security:{captcha_token:t==null?void 0:t.captchaToken}},xform:je}),{data:l,error:c}=a;return c?{data:{user:null,session:null},error:c}:!l||!l.session||!l.user?{data:{user:null,session:null},error:new gs}:(l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers("SIGNED_IN",l.session)),{data:l,error:c})}catch(t){if(P(t))return{data:{user:null,session:null},error:t};throw t}}async signInWithOtp(e){var t,s,i,r,o;try{if("email"in e){const{email:a,options:l}=e;let c=null,u=null;this.flowType==="pkce"&&([c,u]=await Wt(this.storage,this.storageKey));const{error:h}=await F(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:a,data:(t=l==null?void 0:l.data)!==null&&t!==void 0?t:{},create_user:(s=l==null?void 0:l.shouldCreateUser)!==null&&s!==void 0?s:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},code_challenge:c,code_challenge_method:u},redirectTo:l==null?void 0:l.emailRedirectTo});return{data:{user:null,session:null},error:h}}if("phone"in e){const{phone:a,options:l}=e,{data:c,error:u}=await F(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:a,data:(i=l==null?void 0:l.data)!==null&&i!==void 0?i:{},create_user:(r=l==null?void 0:l.shouldCreateUser)!==null&&r!==void 0?r:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},channel:(o=l==null?void 0:l.channel)!==null&&o!==void 0?o:"sms"}});return{data:{user:null,session:null,messageId:c==null?void 0:c.message_id},error:u}}throw new _s("You must provide either an email or phone number.")}catch(a){if(P(a))return{data:{user:null,session:null},error:a};throw a}}async verifyOtp(e){var t,s;try{let i,r;"options"in e&&(i=(t=e.options)===null||t===void 0?void 0:t.redirectTo,r=(s=e.options)===null||s===void 0?void 0:s.captchaToken);const{data:o,error:a}=await F(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:r}}),redirectTo:i,xform:je});if(a)throw a;if(!o)throw new Error("An error occurred on token verification.");const l=o.session,c=o.user;return l!=null&&l.access_token&&(await this._saveSession(l),await this._notifyAllSubscribers(e.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",l)),{data:{user:c,session:l},error:null}}catch(i){if(P(i))return{data:{user:null,session:null},error:i};throw i}}async signInWithSSO(e){var t,s,i;try{let r=null,o=null;return this.flowType==="pkce"&&([r,o]=await Wt(this.storage,this.storageKey)),await F(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in e?{provider_id:e.providerId}:null),"domain"in e?{domain:e.domain}:null),{redirect_to:(s=(t=e.options)===null||t===void 0?void 0:t.redirectTo)!==null&&s!==void 0?s:void 0}),!((i=e==null?void 0:e.options)===null||i===void 0)&&i.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:r,code_challenge_method:o}),headers:this.headers,xform:nb})}catch(r){if(P(r))return{data:null,error:r};throw r}}async reauthenticate(){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async e=>{const{data:{session:t},error:s}=e;if(s)throw s;if(!t)throw new Ze;const{error:i}=await F(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:t.access_token});return{data:{user:null,session:null},error:i}})}catch(e){if(P(e))return{data:{user:null,session:null},error:e};throw e}}async resend(e){try{const t=`${this.url}/resend`;if("email"in e){const{email:s,type:i,options:r}=e,{error:o}=await F(this.fetch,"POST",t,{headers:this.headers,body:{email:s,type:i,gotrue_meta_security:{captcha_token:r==null?void 0:r.captchaToken}},redirectTo:r==null?void 0:r.emailRedirectTo});return{data:{user:null,session:null},error:o}}else if("phone"in e){const{phone:s,type:i,options:r}=e,{data:o,error:a}=await F(this.fetch,"POST",t,{headers:this.headers,body:{phone:s,type:i,gotrue_meta_security:{captcha_token:r==null?void 0:r.captchaToken}}});return{data:{user:null,session:null,messageId:o==null?void 0:o.message_id},error:a}}throw new _s("You must provide either an email or phone number and a type")}catch(t){if(P(t))return{data:{user:null,session:null},error:t};throw t}}async getSession(){return await this.initializePromise,await this._acquireLock(-1,async()=>this._useSession(async t=>t))}async _acquireLock(e,t){this._debug("#_acquireLock","begin",e);try{if(this.lockAcquired){const s=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),i=(async()=>(await s,await t()))();return this.pendingInLock.push((async()=>{try{await i}catch{}})()),i}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const s=t();for(this.pendingInLock.push((async()=>{try{await s}catch{}})()),await s;this.pendingInLock.length;){const i=[...this.pendingInLock];await Promise.all(i),this.pendingInLock.splice(0,i.length)}return await s}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(e){this._debug("#_useSession","begin");try{const t=await this.__loadSession();return await e(t)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lockAcquired||this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let e=null;const t=await _t(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",t),t!==null&&(this._isValidSession(t)?e=t:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!e)return{data:{session:null},error:null};const s=e.expires_at?e.expires_at*1e3-Date.now()<Gi:!1;if(this._debug("#__loadSession()",`session has${s?"":" not"} expired`,"expires_at",e.expires_at),!s){if(this.userStorage){const o=await _t(this.userStorage,this.storageKey+"-user");o!=null&&o.user?e.user=o.user:e.user=Qi()}if(this.storage.isServer&&e.user){let o=this.suppressGetSessionWarning;e=new Proxy(e,{get:(l,c,u)=>(!o&&c==="user"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),o=!0,this.suppressGetSessionWarning=!0),Reflect.get(l,c,u))})}return{data:{session:e},error:null}}const{session:i,error:r}=await this._callRefreshToken(e.refresh_token);return r?{data:{session:null},error:r}:{data:{session:i},error:null}}finally{this._debug("#__loadSession()","end")}}async getUser(e){return e?await this._getUser(e):(await this.initializePromise,await this._acquireLock(-1,async()=>await this._getUser()))}async _getUser(e){try{return e?await F(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:e,xform:et}):await this._useSession(async t=>{var s,i,r;const{data:o,error:a}=t;if(a)throw a;return!(!((s=o.session)===null||s===void 0)&&s.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new Ze}:await F(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(r=(i=o.session)===null||i===void 0?void 0:i.access_token)!==null&&r!==void 0?r:void 0,xform:et})})}catch(t){if(P(t))return Aw(t)&&(await this._removeSession(),await Xe(this.storage,`${this.storageKey}-code-verifier`)),{data:{user:null},error:t};throw t}}async updateUser(e,t={}){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._updateUser(e,t))}async _updateUser(e,t={}){try{return await this._useSession(async s=>{const{data:i,error:r}=s;if(r)throw r;if(!i.session)throw new Ze;const o=i.session;let a=null,l=null;this.flowType==="pkce"&&e.email!=null&&([a,l]=await Wt(this.storage,this.storageKey));const{data:c,error:u}=await F(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:t==null?void 0:t.emailRedirectTo,body:Object.assign(Object.assign({},e),{code_challenge:a,code_challenge_method:l}),jwt:o.access_token,xform:et});if(u)throw u;return o.user=c.user,await this._saveSession(o),await this._notifyAllSubscribers("USER_UPDATED",o),{data:{user:o.user},error:null}})}catch(s){if(P(s))return{data:{user:null},error:s};throw s}}async setSession(e){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._setSession(e))}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new Ze;const t=Date.now()/1e3;let s=t,i=!0,r=null;const{payload:o}=Yi(e.access_token);if(o.exp&&(s=o.exp,i=s<=t),i){const{session:a,error:l}=await this._callRefreshToken(e.refresh_token);if(l)return{data:{user:null,session:null},error:l};if(!a)return{data:{user:null,session:null},error:null};r=a}else{const{data:a,error:l}=await this._getUser(e.access_token);if(l)throw l;r={access_token:e.access_token,refresh_token:e.refresh_token,user:a.user,token_type:"bearer",expires_in:s-t,expires_at:s},await this._saveSession(r),await this._notifyAllSubscribers("SIGNED_IN",r)}return{data:{user:r.user,session:r},error:null}}catch(t){if(P(t))return{data:{session:null,user:null},error:t};throw t}}async refreshSession(e){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._refreshSession(e))}async _refreshSession(e){try{return await this._useSession(async t=>{var s;if(!e){const{data:o,error:a}=t;if(a)throw a;e=(s=o.session)!==null&&s!==void 0?s:void 0}if(!(e!=null&&e.refresh_token))throw new Ze;const{session:i,error:r}=await this._callRefreshToken(e.refresh_token);return r?{data:{user:null,session:null},error:r}:i?{data:{user:i.user,session:i},error:null}:{data:{user:null,session:null},error:null}})}catch(t){if(P(t))return{data:{user:null,session:null},error:t};throw t}}async _getSessionFromURL(e,t){try{if(!we())throw new ms("No browser detected.");if(e.error||e.error_description||e.error_code)throw new ms(e.error_description||"Error in URL with unspecified error_description",{error:e.error||"unspecified_error",code:e.error_code||"unspecified_code"});switch(t){case"implicit":if(this.flowType==="pkce")throw new _l("Not a valid PKCE flow url.");break;case"pkce":if(this.flowType==="implicit")throw new ms("Not a valid implicit grant flow url.");break;default:}if(t==="pkce"){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!e.code)throw new _l("No code detected.");const{data:U,error:I}=await this._exchangeCodeForSession(e.code);if(I)throw I;const R=new URL(window.location.href);return R.searchParams.delete("code"),window.history.replaceState(window.history.state,"",R.toString()),{data:{session:U.session,redirectType:null},error:null}}const{provider_token:s,provider_refresh_token:i,access_token:r,refresh_token:o,expires_in:a,expires_at:l,token_type:c}=e;if(!r||!a||!o||!c)throw new ms("No session defined in URL");const u=Math.round(Date.now()/1e3),h=parseInt(a);let d=u+h;l&&(d=parseInt(l));const v=d-u;v*1e3<=Kt&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${v}s, should have been closer to ${h}s`);const b=d-h;u-b>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",b,d,u):u-b<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",b,d,u);const{data:S,error:E}=await this._getUser(r);if(E)throw E;const C={provider_token:s,provider_refresh_token:i,access_token:r,expires_in:h,expires_at:d,refresh_token:o,token_type:c,user:S.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),{data:{session:C,redirectType:e.type},error:null}}catch(s){if(P(s))return{data:{session:null,redirectType:null},error:s};throw s}}_isImplicitGrantCallback(e){return!!(e.access_token||e.error_description)}async _isPKCECallback(e){const t=await _t(this.storage,`${this.storageKey}-code-verifier`);return!!(e.code&&t)}async signOut(e={scope:"global"}){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._signOut(e))}async _signOut({scope:e}={scope:"global"}){return await this._useSession(async t=>{var s;const{data:i,error:r}=t;if(r)return{error:r};const o=(s=i.session)===null||s===void 0?void 0:s.access_token;if(o){const{error:a}=await this.admin.signOut(o,e);if(a&&!(Cw(a)&&(a.status===404||a.status===401||a.status===403)))return{error:a}}return e!=="others"&&(await this._removeSession(),await Xe(this.storage,`${this.storageKey}-code-verifier`)),{error:null}})}onAuthStateChange(e){const t=Fw(),s={id:t,callback:e,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",t),this.stateChangeEmitters.delete(t)}};return this._debug("#onAuthStateChange()","registered callback with id",t),this.stateChangeEmitters.set(t,s),(async()=>(await this.initializePromise,await this._acquireLock(-1,async()=>{this._emitInitialSession(t)})))(),{data:{subscription:s}}}async _emitInitialSession(e){return await this._useSession(async t=>{var s,i;try{const{data:{session:r},error:o}=t;if(o)throw o;await((s=this.stateChangeEmitters.get(e))===null||s===void 0?void 0:s.callback("INITIAL_SESSION",r)),this._debug("INITIAL_SESSION","callback id",e,"session",r)}catch(r){await((i=this.stateChangeEmitters.get(e))===null||i===void 0?void 0:i.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",e,"error",r),console.error(r)}})}async resetPasswordForEmail(e,t={}){let s=null,i=null;this.flowType==="pkce"&&([s,i]=await Wt(this.storage,this.storageKey,!0));try{return await F(this.fetch,"POST",`${this.url}/recover`,{body:{email:e,code_challenge:s,code_challenge_method:i,gotrue_meta_security:{captcha_token:t.captchaToken}},headers:this.headers,redirectTo:t.redirectTo})}catch(r){if(P(r))return{data:null,error:r};throw r}}async getUserIdentities(){var e;try{const{data:t,error:s}=await this.getUser();if(s)throw s;return{data:{identities:(e=t.user.identities)!==null&&e!==void 0?e:[]},error:null}}catch(t){if(P(t))return{data:null,error:t};throw t}}async linkIdentity(e){var t;try{const{data:s,error:i}=await this._useSession(async r=>{var o,a,l,c,u;const{data:h,error:d}=r;if(d)throw d;const v=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:(o=e.options)===null||o===void 0?void 0:o.redirectTo,scopes:(a=e.options)===null||a===void 0?void 0:a.scopes,queryParams:(l=e.options)===null||l===void 0?void 0:l.queryParams,skipBrowserRedirect:!0});return await F(this.fetch,"GET",v,{headers:this.headers,jwt:(u=(c=h.session)===null||c===void 0?void 0:c.access_token)!==null&&u!==void 0?u:void 0})});if(i)throw i;return we()&&!(!((t=e.options)===null||t===void 0)&&t.skipBrowserRedirect)&&window.location.assign(s==null?void 0:s.url),{data:{provider:e.provider,url:s==null?void 0:s.url},error:null}}catch(s){if(P(s))return{data:{provider:e.provider,url:null},error:s};throw s}}async unlinkIdentity(e){try{return await this._useSession(async t=>{var s,i;const{data:r,error:o}=t;if(o)throw o;return await F(this.fetch,"DELETE",`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:(i=(s=r.session)===null||s===void 0?void 0:s.access_token)!==null&&i!==void 0?i:void 0})})}catch(t){if(P(t))return{data:null,error:t};throw t}}async _refreshAccessToken(e){const t=`#_refreshAccessToken(${e.substring(0,5)}...)`;this._debug(t,"begin");try{const s=Date.now();return await Ww(async i=>(i>0&&await Uw(200*Math.pow(2,i-1)),this._debug(t,"refreshing attempt",i),await F(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:je})),(i,r)=>{const o=200*Math.pow(2,i);return r&&Ji(r)&&Date.now()+o-s<Kt})}catch(s){if(this._debug(t,"error",s),P(s))return{data:{session:null,user:null},error:s};throw s}finally{this._debug(t,"end")}}_isValidSession(e){return typeof e=="object"&&e!==null&&"access_token"in e&&"refresh_token"in e&&"expires_at"in e}async _handleProviderSignIn(e,t){const s=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:t.redirectTo,scopes:t.scopes,queryParams:t.queryParams});return this._debug("#_handleProviderSignIn()","provider",e,"options",t,"url",s),we()&&!t.skipBrowserRedirect&&window.location.assign(s),{data:{provider:e,url:s},error:null}}async _recoverAndRefresh(){var e,t;const s="#_recoverAndRefresh()";this._debug(s,"begin");try{const i=await _t(this.storage,this.storageKey);if(i&&this.userStorage){let o=await _t(this.userStorage,this.storageKey+"-user");!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!o&&(o={user:i.user},await Gt(this.userStorage,this.storageKey+"-user",o)),i.user=(e=o==null?void 0:o.user)!==null&&e!==void 0?e:Qi()}else if(i&&!i.user&&!i.user){const o=await _t(this.storage,this.storageKey+"-user");o&&(o!=null&&o.user)?(i.user=o.user,await Xe(this.storage,this.storageKey+"-user"),await Gt(this.storage,this.storageKey,i)):i.user=Qi()}if(this._debug(s,"session from storage",i),!this._isValidSession(i)){this._debug(s,"session is not valid"),i!==null&&await this._removeSession();return}const r=((t=i.expires_at)!==null&&t!==void 0?t:1/0)*1e3-Date.now()<Gi;if(this._debug(s,`session has${r?"":" not"} expired with margin of ${Gi}s`),r){if(this.autoRefreshToken&&i.refresh_token){const{error:o}=await this._callRefreshToken(i.refresh_token);o&&(console.error(o),Ji(o)||(this._debug(s,"refresh failed with a non-retryable error, removing the session",o),await this._removeSession()))}}else if(i.user&&i.user.__isUserNotAvailableProxy===!0)try{const{data:o,error:a}=await this._getUser(i.access_token);!a&&(o!=null&&o.user)?(i.user=o.user,await this._saveSession(i),await this._notifyAllSubscribers("SIGNED_IN",i)):this._debug(s,"could not get user data, skipping SIGNED_IN notification")}catch(o){console.error("Error getting user data:",o),this._debug(s,"error getting user data, skipping SIGNED_IN notification",o)}else await this._notifyAllSubscribers("SIGNED_IN",i)}catch(i){this._debug(s,"error",i),console.error(i);return}finally{this._debug(s,"end")}}async _callRefreshToken(e){var t,s;if(!e)throw new Ze;if(this.refreshingDeferred)return this.refreshingDeferred.promise;const i=`#_callRefreshToken(${e.substring(0,5)}...)`;this._debug(i,"begin");try{this.refreshingDeferred=new ki;const{data:r,error:o}=await this._refreshAccessToken(e);if(o)throw o;if(!r.session)throw new Ze;await this._saveSession(r.session),await this._notifyAllSubscribers("TOKEN_REFRESHED",r.session);const a={session:r.session,error:null};return this.refreshingDeferred.resolve(a),a}catch(r){if(this._debug(i,"error",r),P(r)){const o={session:null,error:r};return Ji(r)||await this._removeSession(),(t=this.refreshingDeferred)===null||t===void 0||t.resolve(o),o}throw(s=this.refreshingDeferred)===null||s===void 0||s.reject(r),r}finally{this.refreshingDeferred=null,this._debug(i,"end")}}async _notifyAllSubscribers(e,t,s=!0){const i=`#_notifyAllSubscribers(${e})`;this._debug(i,"begin",t,`broadcast = ${s}`);try{this.broadcastChannel&&s&&this.broadcastChannel.postMessage({event:e,session:t});const r=[],o=Array.from(this.stateChangeEmitters.values()).map(async a=>{try{await a.callback(e,t)}catch(l){r.push(l)}});if(await Promise.all(o),r.length>0){for(let a=0;a<r.length;a+=1)console.error(r[a]);throw r[0]}}finally{this._debug(i,"end")}}async _saveSession(e){this._debug("#_saveSession()",e),this.suppressGetSessionWarning=!0;const t=Object.assign({},e),s=t.user&&t.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!s&&t.user&&await Gt(this.userStorage,this.storageKey+"-user",{user:t.user});const i=Object.assign({},t);delete i.user;const r=bl(i);await Gt(this.storage,this.storageKey,r)}else{const i=bl(t);await Gt(this.storage,this.storageKey,i)}}async _removeSession(){this._debug("#_removeSession()"),await Xe(this.storage,this.storageKey),await Xe(this.storage,this.storageKey+"-code-verifier"),await Xe(this.storage,this.storageKey+"-user"),this.userStorage&&await Xe(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&we()&&(window!=null&&window.removeEventListener)&&window.removeEventListener("visibilitychange",e)}catch(t){console.error("removing visibilitychange callback failed",t)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const e=setInterval(()=>this._autoRefreshTokenTick(),Kt);this.autoRefreshTicker=e,e&&typeof e=="object"&&typeof e.unref=="function"?e.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(e),setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async _autoRefreshTokenTick(){this._debug("#_autoRefreshTokenTick()","begin");try{await this._acquireLock(0,async()=>{try{const e=Date.now();try{return await this._useSession(async t=>{const{data:{session:s}}=t;if(!s||!s.refresh_token||!s.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const i=Math.floor((s.expires_at*1e3-e)/Kt);this._debug("#_autoRefreshTokenTick()",`access token expires in ${i} ticks, a tick lasts ${Kt}ms, refresh threshold is ${Or} ticks`),i<=Or&&await this._callRefreshToken(s.refresh_token)})}catch(t){console.error("Auto refresh tick failed with error. This is likely a transient error.",t)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(e){if(e.isAcquireTimeout||e instanceof mh)this._debug("auto refresh token tick lock not available");else throw e}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!we()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>await this._onVisibilityChanged(!1),window==null||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error("_handleVisibilityChange",e)}}async _onVisibilityChanged(e){const t=`#_onVisibilityChanged(${e})`;this._debug(t,"visibilityState",document.visibilityState),document.visibilityState==="visible"?(this.autoRefreshToken&&this._startAutoRefresh(),e||(await this.initializePromise,await this._acquireLock(-1,async()=>{if(document.visibilityState!=="visible"){this._debug(t,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()}))):document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,t,s){const i=[`provider=${encodeURIComponent(t)}`];if(s!=null&&s.redirectTo&&i.push(`redirect_to=${encodeURIComponent(s.redirectTo)}`),s!=null&&s.scopes&&i.push(`scopes=${encodeURIComponent(s.scopes)}`),this.flowType==="pkce"){const[r,o]=await Wt(this.storage,this.storageKey),a=new URLSearchParams({code_challenge:`${encodeURIComponent(r)}`,code_challenge_method:`${encodeURIComponent(o)}`});i.push(a.toString())}if(s!=null&&s.queryParams){const r=new URLSearchParams(s.queryParams);i.push(r.toString())}return s!=null&&s.skipBrowserRedirect&&i.push(`skip_http_redirect=${s.skipBrowserRedirect}`),`${e}?${i.join("&")}`}async _unenroll(e){try{return await this._useSession(async t=>{var s;const{data:i,error:r}=t;return r?{data:null,error:r}:await F(this.fetch,"DELETE",`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:(s=i==null?void 0:i.session)===null||s===void 0?void 0:s.access_token})})}catch(t){if(P(t))return{data:null,error:t};throw t}}async _enroll(e){try{return await this._useSession(async t=>{var s,i;const{data:r,error:o}=t;if(o)return{data:null,error:o};const a=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType==="phone"?{phone:e.phone}:{issuer:e.issuer}),{data:l,error:c}=await F(this.fetch,"POST",`${this.url}/factors`,{body:a,headers:this.headers,jwt:(s=r==null?void 0:r.session)===null||s===void 0?void 0:s.access_token});return c?{data:null,error:c}:(e.factorType==="totp"&&(!((i=l==null?void 0:l.totp)===null||i===void 0)&&i.qr_code)&&(l.totp.qr_code=`data:image/svg+xml;utf-8,${l.totp.qr_code}`),{data:l,error:null})})}catch(t){if(P(t))return{data:null,error:t};throw t}}async _verify(e){return this._acquireLock(-1,async()=>{try{return await this._useSession(async t=>{var s;const{data:i,error:r}=t;if(r)return{data:null,error:r};const{data:o,error:a}=await F(this.fetch,"POST",`${this.url}/factors/${e.factorId}/verify`,{body:{code:e.code,challenge_id:e.challengeId},headers:this.headers,jwt:(s=i==null?void 0:i.session)===null||s===void 0?void 0:s.access_token});return a?{data:null,error:a}:(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+o.expires_in},o)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",o),{data:o,error:a})})}catch(t){if(P(t))return{data:null,error:t};throw t}})}async _challenge(e){return this._acquireLock(-1,async()=>{try{return await this._useSession(async t=>{var s;const{data:i,error:r}=t;return r?{data:null,error:r}:await F(this.fetch,"POST",`${this.url}/factors/${e.factorId}/challenge`,{body:{channel:e.channel},headers:this.headers,jwt:(s=i==null?void 0:i.session)===null||s===void 0?void 0:s.access_token})})}catch(t){if(P(t))return{data:null,error:t};throw t}})}async _challengeAndVerify(e){const{data:t,error:s}=await this._challenge({factorId:e.factorId});return s?{data:null,error:s}:await this._verify({factorId:e.factorId,challengeId:t.id,code:e.code})}async _listFactors(){const{data:{user:e},error:t}=await this.getUser();if(t)return{data:null,error:t};const s=(e==null?void 0:e.factors)||[],i=s.filter(o=>o.factor_type==="totp"&&o.status==="verified"),r=s.filter(o=>o.factor_type==="phone"&&o.status==="verified");return{data:{all:s,totp:i,phone:r},error:null}}async _getAuthenticatorAssuranceLevel(){return this._acquireLock(-1,async()=>await this._useSession(async e=>{var t,s;const{data:{session:i},error:r}=e;if(r)return{data:null,error:r};if(!i)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:o}=Yi(i.access_token);let a=null;o.aal&&(a=o.aal);let l=a;((s=(t=i.user.factors)===null||t===void 0?void 0:t.filter(h=>h.status==="verified"))!==null&&s!==void 0?s:[]).length>0&&(l="aal2");const u=o.amr||[];return{data:{currentLevel:a,nextLevel:l,currentAuthenticationMethods:u},error:null}}))}async fetchJwk(e,t={keys:[]}){let s=t.keys.find(a=>a.kid===e);if(s)return s;const i=Date.now();if(s=this.jwks.keys.find(a=>a.kid===e),s&&this.jwks_cached_at+Iw>i)return s;const{data:r,error:o}=await F(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(o)throw o;return!r.keys||r.keys.length===0||(this.jwks=r,this.jwks_cached_at=i,s=r.keys.find(a=>a.kid===e),!s)?null:s}async getClaims(e,t={}){try{let s=e;if(!s){const{data:v,error:b}=await this.getSession();if(b||!v.session)return{data:null,error:b};s=v.session.access_token}const{header:i,payload:r,signature:o,raw:{header:a,payload:l}}=Yi(s);t!=null&&t.allowExpired||Jw(r.exp);const c=!i.alg||i.alg.startsWith("HS")||!i.kid||!("crypto"in globalThis&&"subtle"in globalThis.crypto)?null:await this.fetchJwk(i.kid,t!=null&&t.keys?{keys:t.keys}:t==null?void 0:t.jwks);if(!c){const{error:v}=await this.getUser(s);if(v)throw v;return{data:{claims:r,header:i,signature:o},error:null}}const u=Yw(i.alg),h=await crypto.subtle.importKey("jwk",c,u,!0,["verify"]);if(!await crypto.subtle.verify(u,h,o,Lw(`${a}.${l}`)))throw new Dr("Invalid JWT signature");return{data:{claims:r,header:i,signature:o},error:null}}catch(s){if(P(s))return{data:null,error:s};throw s}}}Yn.nextInstanceID=0;const db=Yn;class fb extends db{constructor(e){super(e)}}var pb=function(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{c(s.next(u))}catch(h){o(h)}}function l(u){try{c(s.throw(u))}catch(h){o(h)}}function c(u){u.done?r(u.value):i(u.value).then(a,l)}c((s=s.apply(n,e||[])).next())})};class gb{constructor(e,t,s){var i,r,o;if(this.supabaseUrl=e,this.supabaseKey=t,!e)throw new Error("supabaseUrl is required.");if(!t)throw new Error("supabaseKey is required.");const a=vw(e),l=new URL(a);this.realtimeUrl=new URL("realtime/v1",l),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",l),this.storageUrl=new URL("storage/v1",l),this.functionsUrl=new URL("functions/v1",l);const c=`sb-${l.hostname.split(".")[0]}-auth-token`,u={db:hw,realtime:fw,auth:Object.assign(Object.assign({},dw),{storageKey:c}),global:uw},h=ww(s??{},u);this.storageKey=(i=h.auth.storageKey)!==null&&i!==void 0?i:"",this.headers=(r=h.global.headers)!==null&&r!==void 0?r:{},h.accessToken?(this.accessToken=h.accessToken,this.auth=new Proxy({},{get:(d,v)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(v)} is not possible`)}})):this.auth=this._initSupabaseAuthClient((o=h.auth)!==null&&o!==void 0?o:{},this.headers,h.global.fetch),this.fetch=mw(t,this._getAccessToken.bind(this),h.global.fetch),this.realtime=this._initRealtimeClient(Object.assign({headers:this.headers,accessToken:this._getAccessToken.bind(this)},h.realtime)),this.rest=new Ov(new URL("rest/v1",l).href,{headers:this.headers,schema:h.db.schema,fetch:this.fetch}),this.storage=new aw(this.storageUrl.href,this.headers,this.fetch,s==null?void 0:s.storage),h.accessToken||this._listenForAuthEvents()}get functions(){return new ov(this.functionsUrl.href,{headers:this.headers,customFetch:this.fetch})}from(e){return this.rest.from(e)}schema(e){return this.rest.schema(e)}rpc(e,t={},s={}){return this.rest.rpc(e,t,s)}channel(e,t={config:{}}){return this.realtime.channel(e,t)}getChannels(){return this.realtime.getChannels()}removeChannel(e){return this.realtime.removeChannel(e)}removeAllChannels(){return this.realtime.removeAllChannels()}_getAccessToken(){var e,t;return pb(this,void 0,void 0,function*(){if(this.accessToken)return yield this.accessToken();const{data:s}=yield this.auth.getSession();return(t=(e=s.session)===null||e===void 0?void 0:e.access_token)!==null&&t!==void 0?t:this.supabaseKey})}_initSupabaseAuthClient({autoRefreshToken:e,persistSession:t,detectSessionInUrl:s,storage:i,storageKey:r,flowType:o,lock:a,debug:l},c,u){const h={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new fb({url:this.authUrl.href,headers:Object.assign(Object.assign({},h),c),storageKey:r,autoRefreshToken:e,persistSession:t,detectSessionInUrl:s,storage:i,flowType:o,lock:a,debug:l,fetch:u,hasCustomAuthorizationHeader:"Authorization"in this.headers})}_initRealtimeClient(e){return new Gv(this.realtimeUrl.href,Object.assign(Object.assign({},e),{params:Object.assign({apikey:this.supabaseKey},e==null?void 0:e.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((t,s)=>{this._handleTokenChanged(t,"CLIENT",s==null?void 0:s.access_token)})}_handleTokenChanged(e,t,s){(e==="TOKEN_REFRESHED"||e==="SIGNED_IN")&&this.changedAccessToken!==s?this.changedAccessToken=s:e==="SIGNED_OUT"&&(this.realtime.setAuth(),t=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}}const _b=(n,e,t)=>new gb(n,e,t);function mb(){if(typeof window<"u"||typeof process>"u")return!1;const n=process.version;if(n==null)return!1;const e=n.match(/^v(\d+)\./);return e?parseInt(e[1],10)<=18:!1}mb()&&console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217");let rt,kl=!1,x,Tn=[],De,Yt=null;const zt={};let rn=null;const Gs=new Set,yb="9bd1b2ba-67a5-412f-a5c1-9e30a8c8c3d3",vb="DEIN_TEXTBEE_DEVICE_ID",Lr="https://mister-x-d6b59-default-rtdb.europe-west1.firebasedatabase.app";let Dn=null,Te=null,xe=null,yh=!1;const Zi="showNotifHeader";L.icon({iconUrl:"https://unpkg.com/leaflet@1/dist/images/marker-icon.png",iconRetinaUrl:"https://unpkg.com/leaflet@1/dist/images/marker-icon-2x.png",shadowUrl:"https://unpkg.com/leaflet@1/dist/images/marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],shadowSize:[41,41]});const wb=[[48.21778257924239,16.37016154994435],[48.217247563322225,16.37076456217454],[48.21741142779978,16.371253762059183],[48.216865105563464,16.37191529883514],[48.21581506144457,16.37290646405736],[48.21417125610604,16.373948000332064],[48.21430769576697,16.3745721914746],[48.21333498613118,16.37539386682008],[48.2122964590416,16.377294652276152],[48.211699711347876,16.38092342451245],[48.211941642178076,16.38467493512273],[48.20913524997675,16.384032997995277],[48.20434428995476,16.380677464805487],[48.20267440663029,16.378771628716105],[48.202516949057625,16.378787036085683],[48.2021791301039,16.378713275337773],[48.20032081399359,16.37673193693543],[48.20046567888107,16.376081501249317],[48.19987161819025,16.37355423682974],[48.19981183801774,16.372899054744835],[48.200631534154375,16.369653382537916],[48.20071916193201,16.369103424638855],[48.200163223194544,16.368756078571426],[48.19948213275357,16.368406050294983],[48.19950721778074,16.3679406870309],[48.1998469538764,16.366987161726104],[48.19976119600531,16.366945587486374],[48.199786280895815,16.366662614435302],[48.199852484835134,16.36658080706035],[48.199605825841886,16.366136901468384],[48.199689907919776,16.365894161552536],[48.199997462783195,16.365407340616333],[48.20007450484762,16.36539258846675],[48.200780727683785,16.364471249670135],[48.20235733493688,16.36143133067089],[48.202316181915776,16.361391179971125],[48.20252539808658,16.36095263879719],[48.20263271531552,16.36073672097149],[48.20274853131339,16.36083590228765],[48.20475579365605,16.35819251441422],[48.20494354858451,16.357837121719747],[48.205074099582546,16.357685576910406],[48.20502589015989,16.357555489773183],[48.20506169808996,16.357492457861333],[48.205261965068914,16.357456248039632],[48.20626549207577,16.356030140071557],[48.20666774752276,16.35550308600013],[48.20697347295606,16.355354223399804],[48.20918910891197,16.354601648098285],[48.20921597664341,16.35491948986655],[48.20929110567211,16.354928877598102],[48.20938410911258,16.354983862882907],[48.212403444290665,16.35518085630021],[48.212634067324394,16.355560388875816],[48.214753862701514,16.35585677297196],[48.21482540908184,16.356370415998313],[48.21454632473899,16.35850592710254],[48.21435355993972,16.36025556372129],[48.21477999581608,16.361298310706765],[48.21461086605676,16.3615351876565],[48.214799725889385,16.361933238614775],[48.21476774885914,16.362013013827934],[48.214317217645544,16.362474541146735],[48.21554996828477,16.365200001058092],[48.21618181295601,16.36659154989541],[48.21691897070536,16.368248676490595],[48.21768157297474,16.36988155904141],[48.21778257924239,16.37016154994435]],bb=[[-90,-180],[-90,180],[90,180],[90,-180]],Cl=L.polygon([bb,wb],{color:"red",weight:3,fillColor:"rgba(255, 0, 0, 0.3)",fillOpacity:.35,interactive:!1,dashArray:"5, 5"}),Eb={blau:"#1E90FF",gruen:"#2ECC71",rot:"#FF5252",gelb:"#F4D03F",orange:"#FF8C00",lila:"#8E44AD",schwarz:"#333333",grau:"#7F8C8D"};window.onerror=function(n,e,t,s,i){alert("JS-Fehler: "+n+" in "+e+" Zeile "+t)};const on=_b("https://axirbthvnznvhfagduyj.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4aXJidGh2bnpudmhmYWdkdXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMDI2MTcsImV4cCI6MjA2ODg3ODYxN30.wfJm9e10_iNuYm_r3es_FmKuXBePsxSjIJcVqmSuYjc");async function vh(n){const e=Le(),{error:t}=await on.from("fcm_tokens").delete().eq("device_name",e);t?k("❌ Fehler beim Löschen aus Supabase:",t):k("✅ Alter Token aus Supabase gelöscht."),on.from("fcm_tokens").upsert({token:n,device_name:e}).then(({error:s})=>{s?k("Fehler beim Speichern des Tokens:",s):k("Token erfolgreich gespeichert.")})}function Le(){let n=localStorage.getItem("deviceId");for(;!n||n.trim()==="";)n=prompt("Bitte gib deinen Namen ein"),n===null&&alert("Du musst einen Namen eingeben, um fortzufahren.");return localStorage.setItem("deviceId",n.trim()),n.trim()}try{localStorage.setItem("test","1")}catch{alert("⚠️ Dein Browser blockiert lokalen Speicher. Bitte verlasse den privaten Modus oder ändere die Einstellungen.")}async function Sb(){try{if(!await yi()){alert("❌ Push-Benachrichtigungen werden in diesem Browser/Modus nicht unterstützt.");return}if(!("Notification"in window)){alert("❌ Notification API nicht verfügbar.");return}const e=await Notification.requestPermission();if(e!=="granted"){k("Benachrichtigungen nicht erlaubt:",e),alert("⚠️ Benachrichtigungen wurden abgelehnt.");return}const t=await p0();k("Service Worker registriert mit Scope:",t.scope),localStorage.setItem("serviceWorkerRegistered","true"),De||(De=vi(pn));const s=await Gu(De,{serviceWorkerRegistration:t,vapidKey:"BPxoiPhAH4gXMrR7PhhrAUolApYTK93-MZ48-BHWF0rksFtkvBwE9zYUS2pfiEw6_PXzPYyaQZdNwM6LL4QdeOE"});if(!s){k("Kein Token erhalten."),alert("⚠️ Kein Token erhalten. Bitte erneut versuchen.");return}const i=Le();localStorage.setItem("fcmToken",s),k("Token:",s),await Qe(O(N,`tokens/${i}`),s),await vh(s),localStorage.setItem("nachrichtAktiv","true");const r=document.getElementById("permissionButton");r&&(r.style.display="none"),Tb(i).then(()=>{alert("✅ Benachrichtigungen aktiviert!")})}catch(n){k("Fehler bei Berechtigung/Registrierung/Token:",n),alert("❌ Fehler: "+((n==null?void 0:n.message)??String(n)))}}async function Tb(n){const e=await kb("app-db","settings");return new Promise((t,s)=>{const i=e.transaction("settings","readwrite");i.objectStore("settings").put(n,"deviceName"),i.oncomplete=()=>{e.close(),t(!0)},i.onerror=()=>{e.close(),s(i.error)}})}async function Ib(){if(typeof Notification>"u"||Notification.permission!=="granted"||localStorage.getItem("serviceWorkerRegistered")!=="true"){k("🔕 Token-Refresh übersprungen: Keine Berechtigung oder kein SW.");return}try{const n=await navigator.serviceWorker.ready,e=await Gu(De,{serviceWorkerRegistration:n,vapidKey:"BPxoiPhAH4gXMrR7PhhrAUolApYTK93-MZ48-BHWF0rksFtkvBwE9zYUS2pfiEw6_PXzPYyaQZdNwM6LL4QdeOE"});if(!e){k("⚠️ Kein Token beim Refresh erhalten.");return}const t=Le(),s=localStorage.getItem("fcmToken");if(e!==s){k("🔄 Token aktualisiert:",e),await Qe(O(N,"tokens/"+t),e);const{error:i}=await on.from("fcm_tokens").delete().eq("device_name",t);i?k("❌ Fehler beim Löschen aus Supabase:",i):k("✅ Alter Token aus Supabase gelöscht."),await vh(e),localStorage.setItem("fcmToken",e),localStorage.setItem("nachrichtAktiv","true")}else k("ℹ️ Token ist unverändert.")}catch(n){k("❌ Fehler beim Token-Refresh:",n)}}async function kb(n,e){return new Promise((t,s)=>{const i=indexedDB.open(n);i.onupgradeneeded=()=>{const r=i.result;r.objectStoreNames.contains(e)||r.createObjectStore(e)},i.onsuccess=()=>{const r=i.result;if(r.objectStoreNames.contains(e))return t(r);const o=r.version+1;r.close();const a=indexedDB.open(n,o);a.onupgradeneeded=()=>{const l=a.result;l.objectStoreNames.contains(e)||l.createObjectStore(e)},a.onsuccess=()=>t(a.result),a.onerror=()=>s(a.error)},i.onerror=()=>s(i.error)})}async function Cb(){let n=localStorage.getItem("deviceId"),t=Th().tel;for(;!n||n.trim()==="";)n=prompt("Bitte gib deinen Namen ein"),n===null&&alert("Du musst einen Namen eingeben, um fortzufahren.");for(localStorage.setItem("deviceId",n.trim());!t||!bh(t);){let s=prompt(`Bitte gib deine Telefonnummer für SMS-Fallback ein (+43… oder 0664…)
Du kannst auch leer lassen, wenn du keine SMS möchtest.`);if(s===null||s.trim()===""){t=null;break}t=Lb(s.trim()),t||alert("Ungültige Nummer. Bitte im Format +43… oder 0664… eingeben.")}Db({tel:t,allowSmsFallback:!!t}),await Mb(n,t,!!t)}async function Ab(){try{const n=await yi().catch(()=>!1);De||(De=vi(pn));const e=Le(),t=localStorage.getItem("fcmToken");if(n)try{await Xy(De),k("✅ deleteToken: lokaler FCM-Token invalidiert")}catch(s){k("⚠️ deleteToken fehlgeschlagen:",s)}try{await ke(O(N,`tokens/${e}`)),k("✅ RTDB-Token entfernt für",e)}catch(s){k("⚠️ RTDB-Remove fehlgeschlagen:",s)}try{const{error:s}=await on.from("fcm_tokens").delete().or(`device_name.eq.${e}${t?`,token.eq.${t}`:""}`);s?k("⚠️ Supabase-Delete Fehler:",s):k("✅ Supabase-Einträge entfernt")}catch(s){k("⚠️ Supabase-Delete (catch):",s)}if("serviceWorker"in navigator){const s=await navigator.serviceWorker.getRegistrations();for(const i of s)try{const r=await i.pushManager.getSubscription();r&&(await r.unsubscribe(),k("✅ Push-Subscription gekündigt für",i.scope))}catch(r){k("⚠️ unsubscribe warn:",r)}await Promise.all(s.map(i=>i.unregister())),k("✅ Alle Service Worker unregistriert")}try{if(window.caches){const s=await caches.keys();await Promise.all(s.map(i=>caches.delete(i))),k("✅ Alle Caches gelöscht:",s)}}catch(s){k("⚠️ Cache cleanup warn:",s)}try{indexedDB.deleteDatabase("app-db"),k('✅ IndexedDB "app-db" gelöscht')}catch(s){k("⚠️ IndexedDB delete warn:",s)}localStorage.removeItem("fcmToken"),localStorage.removeItem("nachrichtAktiv"),localStorage.removeItem("serviceWorkerRegistered");try{const s=document.getElementById("permissionButton"),i=document.getElementById("permissionButton2");s&&(s.style.display=""),i&&(i.style.display="none")}catch{}setTimeout(()=>{alert("🔕 Benachrichtigungen deaktiviert. Die Seite wird neu geladen…"),location.reload()},150)}catch(n){k(n),alert("❌ Deaktivieren fehlgeschlagen: "+((n==null?void 0:n.message)??String(n)))}}async function Rb(n,e,t,s=2e4){await new Promise(u=>setTimeout(u,s));const i=`${Lr}/notifications/${n}/recipients.json`,r=await fetch(i),o=r.ok?await r.json():{},a=e.filter(u=>!(o!=null&&o[Eh(u)]));if(a.length===0)return;const l=a.map(async u=>{const h=await fetch(`${Lr}/roles/${encodeURIComponent(u)}.json`);if(!h.ok)return null;const d=await h.json();return d!=null&&d.allowSmsFallback&&bh(d==null?void 0:d.tel)?d.tel:null}),c=(await Promise.all(l)).filter(Boolean);c.length>0&&(await Nb(c,t),k(`SMS-Fallback an ${c.length} Nummer(n) ausgelöst.`))}async function wh(n,e,t=[],{link:s="/Mister-X/",attempt:i=1,maxAttempts:r=20,waitSec:o=20,sendEndpoint:a="https://axirbthvnznvhfagduyj.supabase.co/functions/v1/send-to-all"}={}){const l=(Le==null?void 0:Le())||"unknown",c=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:n,body:e,tokens:t,senderName:l,link:s})});let u={};try{u=await c.json()}catch{}const h=u==null?void 0:u.messageId;if(k(`📦 Versuch ${i}:`,u),i===1&&h){const v=`${n}: ${e}${s?" "+s:""}`.slice(0,280);Rb(h,t,v,2e4)}const d=Array.isArray(u==null?void 0:u.failedTokens)?u.failedTokens:[];return d.length>0&&i<r?(k(`🔁 Wiederhole für ${d.length} fehlgeschlagene Tokens in 10 Sekunden...`),setTimeout(()=>{wh(n,e,d,{link:s,attempt:i+1,maxAttempts:r,waitSec:o,sendEndpoint:a})},1e4)):i>=r?k("⏱️ Max. Anzahl an Versuchen erreicht."):k("✅ Alle Benachrichtigungen erfolgreich gesendet."),u}async function Ln(n,e,t){var c,u;const s=await Pe(O(N,"roles")),i=await Pe(O(N,"tokens")),r=s.val(),o=i.val(),a=new Set,l=Array.isArray(t)?t:[t];for(const h in o){const d=(c=r[h])==null?void 0:c.role,v=(u=r[h])==null?void 0:u.notification;(t==="all"||l.includes(d))&&v!==!1&&a.add(o[h])}if(a.size===0){k(`⚠️ Keine passenden Tokens für Rollen "${t}" gefunden.`);return}wh(n,e,Array.from(a))}function Pb(n,e){const t="Misterx-upload",s=new FormData;s.append("file",n),s.append("upload_preset",t),fetch("https://api.cloudinary.com/v1_1/ddvf141hb/image/upload",{method:"POST",body:s}).then(i=>i.json()).then(i=>{i.secure_url&&i.public_id?e({url:i.secure_url}):alert("Fehler beim Hochladen zu Cloudinary.")}).catch(i=>{k("Upload-Fehler:",i),alert("Fehler beim Hochladen zu Cloudinary.")})}async function Ob(){const n=document.getElementById("photoInput").files[0],e=document.getElementById("manualLocationDescription").value.trim(),t=document.getElementById("manualLocationContainer"),s=document.getElementById("status"),i=y0();if(!i){alert("Bitte zuerst einen Posten auswählen.");return}if(!n){alert("Bitte ein Foto auswählen.");return}const r=Date.now();let o={lat:null,lon:null,accuracy:null};if(!(t&&t.style.display!=="none"&&e!==""))if(navigator.geolocation)try{const b=await Ch(),{latitude:S,longitude:E,accuracy:C}=b.coords;if(C>100){s.innerText=`⚠️ Standort ungenau (±${Math.round(C)} m). Bitte erneut versuchen oder Standortbeschreibung eingeben.`,t.style.display="block";return}o={lat:S,lon:E,accuracy:C}}catch(b){Es==null||Es(b),t.style.display="block"}else s.innerText="Geolocation wird nicht unterstützt.",t.style.display="block";const{color:a,postId:l,title:c}=i,u=O(N,`posten/${a}/active`);s.innerText="⏳ Reserviere Farbe…";try{const b=await X_(u,S=>S===!0?!1:S);if(!b.committed||b.snapshot.val()!==!1){s.innerText="❌ Diese Farbe ist bereits inaktiv. Liste wird aktualisiert.";return}}catch(b){s.innerText="❌ Konnte Farbe nicht reservieren.",k(b);return}try{await Gn(O(N),{[`posten/${a}/${l}/visited`]:!0})}catch(b){s.innerText="❌ Konnte Posten nicht auf 'visited' setzen.",k(b);return}const h={color:a,postId:l,title:c,timestamp:r,description:e||null,lat:o.lat,lon:o.lon},d=br(O(N,"locations"),h),v=`${c} (${a.toUpperCase()})`;Ln==null||Ln("Mister X hat sich gezeigt!",v,"agent"),Pb(n,async({url:b})=>{try{await Gn(d,{photoURL:b})}catch(S){k("Foto-URL konnte nicht gesetzt werden",S)}}),document.getElementById("photoInput").value="",document.getElementById("manualLocationDescription").value="",t.style.display="none",document.getElementById("postenSearch").value="",xh(null),s.innerText="✅ Posten/Farbe gemeldet & Foto wird hochgeladen.",$n==null||$n()}function bh(n){return typeof n=="string"&&/^\+43\d{4,13}$/.test(n)}function Eh(n){return n.replace(/[.#$/\[\]\/]/g,"_")}async function Nb(n,e){const t=`https://api.textbee.dev/api/v1/gateway/devices/${vb}/send-sms`,s=await fetch(t,{method:"POST",headers:{"x-api-key":yb,"Content-Type":"application/json"},body:JSON.stringify({recipients:n,message:e})}),i=await s.text();return{ok:s.ok,status:s.status,bodyText:i}}function xb(n){const e=String(n).trim();return e.startsWith("+")?"+"+e.slice(1).replace(/\D/g,""):e.replace(/\D/g,"")}const Sh="mrx_sms_prefs_v1";function Th(){try{return JSON.parse(localStorage.getItem(Sh))??{allowSmsFallback:!1,tel:null,lastUpdated:0}}catch{return{allowSmsFallback:!1,tel:null,lastUpdated:0}}}function Db(n){const e=Th(),t={allowSmsFallback:!!(n.allowSmsFallback??e.allowSmsFallback),tel:n.tel===void 0?e.tel:n.tel,lastUpdated:Date.now()};return localStorage.setItem(Sh,JSON.stringify(t)),t}function Lb(n){if(!n)return null;let e=xb(n);if(e.startsWith("+43"))return/^\+43\d{4,13}$/.test(e)?e:null;if(e.startsWith("0")){const t="+43"+e.slice(1);return/^\+43\d{4,13}$/.test(t)?t:null}if(e.startsWith("43")){const t="+"+e;return/^\+43\d{4,13}$/.test(t)?t:null}if(/^\d{5,}$/.test(e)&&e[0]!=="0"){const t="+43"+e;return/^\+43\d{4,13}$/.test(t)?t:null}return null}async function Mb(n,e,t){const s=Eh(n),i=`${Lr}/roles/${s}.json`,r={tel:e??null,allowSmsFallback:!!t,...e?{telUpdatedAt:Date.now()}:{}};await fetch(i,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})}function Js(){fn(O(N,"locations"),n=>{if(!n.exists()){x&&(x.remove(),x=null),document.getElementById("map").style.display="none",document.getElementById("locationFeed").innerHTML="",Tn=[];return}const e=n.val(),t=Object.values(e).sort((r,o)=>o.timestamp-r.timestamp),s=t.filter(r=>r.lat!=null&&r.lon!=null);if(s.length>0){const{lat:r,lon:o}=s[0];x&&(x.remove(),x=null),x=L.map("map").setView([r,o],15);const a=L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap"}),l=L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",{attribution:"© CartoDB"}),c=L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{attribution:"Tiles © Esri"}),u=L.tileLayer("http://sgx.geodatenzentrum.de/wmts_topplus_open/tile/1.0.0/web/default/WEBMERCATOR/{z}/{y}/{x}.png",{maxZoom:18,attribution:"TopPlus Open © GeoBasis-DE / BKG"}),h=L.tileLayer("https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=sxLNDIsEdS0kt8fQKhSLB1Z7wVp3ZkV78F5HhvIElZWKDuahhvgWnCZkOceLTzYS",{attribution:"© Jawg"}),d={Standard:a,"Jawg Street":h,"Hell & reduziert":l,Satellit:c,"TopPlus Open":u};a.addTo(x),L.control.layers(d).addTo(x),kh(),Uo(),Fb(),Tn.forEach(b=>x.removeLayer(b)),Tn=[],s.forEach(b=>{const S=L.marker([b.lat,b.lon]).addTo(x).bindPopup(`📍 ${new Date(b.timestamp).toLocaleTimeString()}`);Tn.push(S)});const v=s.map(b=>[b.lat,b.lon]);v.length>1&&L.polyline(v,{color:"blue",weight:3,opacity:.7,smoothFactor:1}).addTo(x),typeof Cl<"u"&&Cl.addTo(x),document.getElementById("map").style.display="block"}else x&&(x.remove(),x=null),document.getElementById("map").style.display="none";const i=document.getElementById("locationFeed");i.innerHTML="",t.forEach((r,o)=>{const a=r.title?r.title:"Automatischer Standort",l=r.timestamp?new Date(r.timestamp).toLocaleTimeString():"",c=r.photoURL?`<img src="${r.photoURL}" alt="Foto" class="zoomable-photo" style="max-width: 100%; max-height: 60vh; border: 1px solid #ccc; margin-top: 5px; cursor: zoom-in;" data-index="${o}">`:"",u=document.createElement("div");u.style.marginBottom="1em",u.innerHTML=`
        <strong class="location-title" data-lat="${r.lat}" data-lon="${r.lon}" style="cursor: pointer;">${a} (${l})</strong><br>
        ${r.description?`<em>📍 ${r.description}</em><br>`:""}
        ${c}
      `,i.appendChild(u)}),document.querySelectorAll(".location-title").forEach(r=>{r.addEventListener("click",()=>{const o=parseFloat(r.dataset.lat),a=parseFloat(r.dataset.lon);x&&!isNaN(o)&&!isNaN(a)&&x.setView([o,a],17)})}),document.querySelectorAll(".zoomable-photo").forEach(r=>{r.addEventListener("click",()=>{const o=document.createElement("div");o.style.position="fixed",o.style.top="0",o.style.left="0",o.style.width="100vw",o.style.height="100vh",o.style.backgroundColor="rgba(0,0,0,0.8)",o.style.display="flex",o.style.alignItems="center",o.style.justifyContent="center",o.style.zIndex="9999",o.innerHTML=`<img src="${r.src}" style="max-width: 90%; max-height: 90%; border: 2px solid white;">`,o.addEventListener("click",()=>{document.body.removeChild(o)}),document.body.appendChild(o)})})})}function $b(){if(!navigator.geolocation){alert("❌ Geolocation wird nicht unterstützt.");return}Dn==null&&(Dn=navigator.geolocation.watchPosition(n=>{const{latitude:e,longitude:t,accuracy:s}=n.coords;if(!x)return;const i={radius:7,color:"#007AFF",fillColor:"#ffffffff",fillOpacity:.8,opacity:1,weight:2},r={radius:s,color:"#007AFF",fillColor:"#007AFF",fillOpacity:.2,weight:1,opacity:.4};if(Te?(Te.setLatLng([e,t]),Te.getPopup()&&Te.getPopup().setContent(`<strong>Dein Standort</strong><br>Genauigkeit: ±${Math.round(s)} m`)):Te=L.circleMarker([e,t],i).bindPopup(`<strong>Dein Standort</strong><br>Genauigkeit: ±${Math.round(s)} m`).addTo(x),xe?(xe.setLatLng([e,t]),xe.setRadius(s)):xe=L.circle([e,t],r).addTo(x),yh){const o=Math.max(x.getZoom(),16);x.setView([e,t],o,{animate:!0})}},n=>{k("Geolocation-Fehler:",n),Ih(),alert("⚠️ Tracking gestoppt: "+n.message)},{enableHighAccuracy:!0,timeout:15e3,maximumAge:5e3}))}function Ih(){Dn!=null&&(navigator.geolocation.clearWatch(Dn),Dn=null),x&&Te&&(x.removeLayer(Te),Te=null),x&&xe&&(x.removeLayer(xe),xe=null)}function Fb(){x&&(Te&&!x.hasLayer(Te)&&Te.addTo(x),xe&&!x.hasLayer(xe)&&xe.addTo(x))}function jb(){const n=document.getElementById("refreshBtn");n&&n.addEventListener("click",async()=>{n.classList.add("updating");try{await Bb({timeoutMs:2500})}catch(e){k("[Refresh] Fehler im Update-Flow:",e),window.location.reload()}})}async function Bb({timeoutMs:n=2500}={}){if(!("serviceWorker"in navigator)){window.location.reload();return}const e=await navigator.serviceWorker.getRegistration();if(!e){k("[Refresh] Keine SW-Registration gefunden -> normaler Reload"),window.location.reload();return}k("[Refresh] Vor Update:",Hb(e)),await e.update();let t=e.installing||e.waiting||null;t||(t=await Ub(e,800)),t?(await Wb(t),e.waiting&&(k("[Refresh] Sende SKIP_WAITING an Waiting-SW"),e.waiting.postMessage({type:"SKIP_WAITING"}))):k("[Refresh] Keine neue SW gefunden -> normaler Reload"),await Vb(n),window.location.reload()}function Ub(n,e){return new Promise(t=>{let s;const i=()=>{n.removeEventListener("updatefound",i),clearTimeout(s),t(n.installing||n.waiting||null)};n.addEventListener("updatefound",i),s=setTimeout(()=>{n.removeEventListener("updatefound",i),t(null)},e)})}function Wb(n){return new Promise(e=>{if(n.state==="installed"||n.state==="activated")return e();n.addEventListener("statechange",()=>{(n.state==="installed"||n.state==="activated")&&e()})})}function Vb(n){return new Promise(e=>{let t=!1;const s=()=>{t||(t=!0,navigator.serviceWorker.removeEventListener("controllerchange",i),e())},i=()=>{k("[Refresh] controllerchange empfangen"),s()};navigator.serviceWorker.addEventListener("controllerchange",i),setTimeout(()=>{k("[Refresh] controllerchange-Timeout, lade dennoch neu"),s()},n)})}function Hb(n){const e=t=>t?t.state:"—";return{scope:n.scope,active:e(n.active),installing:e(n.installing),waiting:e(n.waiting),controlled:!!navigator.serviceWorker.controller}}function qb(){let n=0;const e=15e3,t=async()=>{const s=Date.now();if(!(s-n<e)){n=s;try{const i=await navigator.serviceWorker.getRegistration();if(!i)return;await i.update(),i.waiting&&i.waiting.postMessage({type:"SKIP_WAITING"})}catch{}}};document.addEventListener("visibilitychange",()=>{document.hidden||t()}),window.addEventListener("focus",t)}function zb(n,e,t){const s=Eb[n]||"#666";return t?{radius:10,color:s,fillColor:s,fillOpacity:.9,opacity:1,weight:3}:e===!1?{radius:6,color:s,fillColor:s,fillOpacity:.25,opacity:.4,weight:1}:{radius:9,color:s,fillColor:s,fillOpacity:.7,opacity:.9,weight:2}}function Al(n,e,t,s){const i=t.title||e,r=!!t.visited;return`
    <div style="min-width:180px">
      <strong>${i}</strong><br>
      <small>Farbe: ${n} (${s?"aktiv":"inaktiv"})</small><br>
      <small>Status: ${r?"✅ besucht":"🕒 offen"}</small>
    </div>
  `}function Kb(n){const e=n.lat??n.latitude??null,t=n.lon??n.lng??n.longitude??null;return{lat:e,lon:t}}function Gb(){const n=O(N,"posten");fn(n,e=>{rn=e.exists()?e.val():null,Uo()})}function kh(){Yt||(Yt=L.layerGroup()),x&&!x.hasLayer(Yt)&&Yt.addTo(x)}function Uo(){if(!x||!rn)return;kh();const n=new Set;Object.entries(rn).forEach(([e,t])=>{if(!t||typeof t!="object")return;const s=!!t.active,i=Object.fromEntries(Object.entries(t).filter(([r])=>r!=="active"));Object.entries(i).forEach(([r,o])=>{if(!o||typeof o!="object")return;const{lat:a,lon:l}=Kb(o);if(a==null||l==null)return;const c=`${e}/${r}`;n.add(c);const u=zb(e,s,!!o.visited);if(zt[c]){const h=zt[c];h.setLatLng([a,l]),h.setStyle(u),h.getPopup()&&h.getPopup().setContent(Al(e,r,o,s))}else{const h=L.circleMarker([a,l],u).bindPopup(Al(e,r,o,s)).on("click",()=>{});h.addTo(Yt),zt[c]=h}})}),Object.keys(zt).forEach(e=>{n.has(e)||(Yt.removeLayer(zt[e]),delete zt[e])})}async function Jb(n=!0){const e=O(N,"posten"),t=await Pe(e);if(!t.exists())return;const s=t.val(),i={};Object.entries(s).forEach(([r,o])=>{!o||typeof o!="object"||(i[`posten/${r}/active`]=n,Object.entries(o).forEach(([a,l])=>{a==="active"||!l||typeof l!="object"||(i[`posten/${r}/${a}/visited`]=!1)}))}),await Gn(O(N),i)}const ys=n=>n*Math.PI/180;function Yb(n,e,t,s){const r=ys(t-n),o=ys(s-e),a=Math.sin(r/2)**2+Math.cos(ys(n))*Math.cos(ys(t))*Math.sin(o/2)**2;return 2*6371e3*Math.asin(Math.sqrt(a))}function Ch(n={enableHighAccuracy:!0,timeout:8e3,maximumAge:0}){return new Promise((e,t)=>{if(!navigator.geolocation)return t(new Error("Geolocation nicht unterstützt"));navigator.geolocation.getCurrentPosition(e,t,n)})}function Ah({excludeVisited:n=!0}={}){const e=[];for(const[t,s]of Object.entries(rn))if(!(!s||s.active!==!0))for(const[i,r]of Object.entries(s.posts||{}))!r||typeof r!="object"||n&&r.visited===!0||e.push({color:t,postId:i,...r});return e}function bs(n){const e=document.getElementById("postenSuggestions");if(!n||n.length===0){e.style.display="none",e.innerHTML="";return}e.innerHTML=n.map(t=>{const s=t.distance!=null?` - ${(t.distance/1).toFixed(0)} m`:"";return`<div class="item" data-color="${t.color}" data-postid="${t.postId}">
              ${t.title||"(ohne Titel)"}
              <span class="tag">${t.color}</span>${s}
            </div>`}).join(""),e.style.display="block",e.querySelectorAll(".item").forEach(t=>{t.addEventListener("click",()=>{var c,u;const s=t.getAttribute("data-color"),i=t.getAttribute("data-postid"),r=(u=(c=rn[s])==null?void 0:c.posts)==null?void 0:u[i];if(!r){k("Ausgewählter Posten nicht im Cache gefunden:",{color:s,postId:i}),document.getElementById("status").innerText="Dieser Posten ist nicht mehr verfügbar.",e.style.display="none";return}const o={color:s,postId:i,title:r.title||i,lat:r.lat??null,lon:r.lon??null};xh(o);const a=document.getElementById("postenSearch");a&&(a.value=`${o.title} [${s}]`),e.style.display="none";const l=document.getElementById("status");l&&(l.innerText=`✅ Posten ausgewählt: ${o.title} (${s})`)})})}function Rh(n){const e=(n||"").trim().toLowerCase(),t=Ah();return e?t.filter(s=>{const i=String(s.postId).toLowerCase(),r=String(s.title||"").toLowerCase(),o=String(s.color).toLowerCase();return i.includes(e)||r.includes(e)||o.includes(e)}).slice(0,25):[]}async function Qb(n=5){try{const e=await Ch(),{latitude:t,longitude:s,accuracy:i}=e.coords;i>100&&(document.getElementById("status").innerText=`⚠️ Standort ungenau (±${Math.round(i)} m). Ergebnisse evtl. ungenau.`);const r=Ah().map(o=>({...o,distance:o.lat!=null&&o.lon!=null?Yb(t,s,o.lat,o.lon):Number.POSITIVE_INFINITY}));return r.sort((o,a)=>o.distance-a.distance),r.slice(0,n)}catch{return document.getElementById("status").innerText="📍 Konnte Standort nicht bestimmen. Du kannst trotzdem per Suche auswählen.",[]}}async function Xb(){const n=O(N,"posten");fn(n,e=>{const t=e.val()||{},s={};for(const[r,o]of Object.entries(t)){if(!o||typeof o!="object")continue;const{active:a,...l}=o,c={};for(const[u,h]of Object.entries(l))h&&typeof h=="object"&&(c[u]=h);s[r]={active:!!a,posts:c}}rn=s;const i=document.getElementById("postenSearch").value;i&&bs(Rh(i))})}function Zb(){const n=document.getElementById("postenSearch"),e=document.getElementById("nearbyBtn");let t;n.addEventListener("input",()=>{clearTimeout(t),t=setTimeout(()=>{const s=Rh(n.value);bs(s)},150)}),e.addEventListener("click",async()=>{const s=await Qb(20);if(s.length===0){bs(s),document.getElementById("status").innerText="Keine nahegelegenen Posten gefunden (oder Standort unbekannt).";return}bs(s)}),document.addEventListener("click",s=>{const i=document.getElementById("postenSuggestions");i.contains(s.target)||n.contains(s.target)||e.contains(s.target)||(i.style.display="none")})}const Qn=document.getElementById("notifHeader"),Mn=document.getElementById("notifHeaderToggle"),er=document.getElementById("notifSummary"),e0=document.getElementById("notifDetails"),Rl=document.getElementById("notifStatusDot"),Pl=document.getElementById("notifTimeShort"),Ol=document.getElementById("notifTitle"),Nl=document.getElementById("notifBody"),xl=document.getElementById("notifSender"),Dl=document.getElementById("notifTime"),Ll=document.getElementById("notifId"),tr=document.getElementById("recipientList"),vs=document.getElementById("notifCount"),En=document.getElementById("toggleNotifHeader");let Tt=null;function nr(n){Qn.style.display=n?"block":"none",!n&&typeof Tt=="function"&&(Tt(),Tt=null)}function Wo(n){Qn.classList.toggle("collapsed",n),Qn.classList.toggle("expanded",!n),e0.hidden=n,Mn.setAttribute("aria-expanded",String(!n)),Mn.textContent=n?"▾":"▴"}Mn==null||Mn.addEventListener("click",n=>{n.stopPropagation();const e=Qn.classList.contains("collapsed");Wo(!e)});er==null||er.addEventListener("click",()=>{const n=Qn.classList.contains("collapsed");Wo(!n)});function t0(n){return new Date(n).toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit"})}function Mr(n){if(!n){Ol.textContent="-",Nl.textContent="-",xl.textContent="-",Dl.textContent="-",Pl.textContent="[--:--]",Ll.textContent="-",tr.innerHTML="",Rl.style.background="#bbb",vs&&(vs.textContent="-");return}const e=typeof n.timestamp=="number"?n.timestamp:Date.now(),t=t0(e);Ol.textContent=n.title||"Ohne Titel",Nl.textContent=n.body||"",xl.textContent=n.sender||"Unbekannt",Dl.textContent=new Date(e).toLocaleString("de-DE"),Pl.textContent=`[${t}]`,Ll.textContent=n.id??"-";const s=n.recipients||{},i=Object.keys(s),r=i.filter(a=>s[a]===!0).length,o=i.length;Rl.style.background=o>0&&r===o?"#4caf50":"#ff9800",vs&&(vs.textContent=`${r}/${o} bestätigt`),tr.innerHTML="",i.sort((a,l)=>a.localeCompare(l)).forEach(a=>{const l=s[a]===!0,c=document.createElement("div");c.className=`recipient-chip ${l?"ok":"wait"}`,c.innerHTML=`<span class="dot"></span><span>${a}</span><span>${l?"✅":"⏳"}</span>`,tr.appendChild(c)})}function Ml(){typeof Tt=="function"&&(Tt(),Tt=null);const n=B_(O(N,"notifications"),j_("timestamp"),$_(1)),e=fn(n,t=>{const s=t.val();if(!s){Mr(null);return}const[i,r]=Object.entries(s)[0];Mr({id:i,...r})});Tt=()=>e()}function n0(){const n=localStorage.getItem(Zi)==="1";nr(n),n&&Ml(),En&&(En.checked=n),Wo(!0),En==null||En.addEventListener("change",e=>{e.target.checked?(localStorage.setItem(Zi,"1"),nr(!0),Ml()):(localStorage.removeItem(Zi),nr(!1),Mr(null))})}function s0(){Pe(O(N,"roles")).then(n=>{const e=n.val();for(const t in e)e[t].role==="misterx"&&Qe(O(N,"roles/"+t),{role:"start",timestamp:Date.now()});alert("Alle Mister X Rollen wurden zurückgesetzt.")})}async function i0(){const n=await Pe(O(N,"settings/max_Team_X")),e=n.exists()?n.val():1,s=(await Pe(O(N,"roles"))).val();let i=0;for(const r in s)s[r].role==="misterx"&&i++;return i<e}async function Ph(n){if(n!==localStorage.getItem("activeView")){if(n==="misterx"&&!await i0()){alert("Es ist bereits ein Gerät als Mister X angemeldet!"),$r();return}if(n==="settings"&&prompt("Passwort eingeben!")!=="1001"){$r();return}}document.getElementById("startView").style.display="none",document.getElementById("startView2").style.display="none",document.querySelectorAll(".view").forEach(s=>s.style.display="none"),n==="misterx"?(document.getElementById("misterxView").style.display="block",Js(),Xb(),Zb()):n==="agent"?(document.getElementById("agentView").style.display="block",Js()):n==="settings"&&(document.getElementById("settingsView").style.display="block",d0()),localStorage.setItem("activeView",n);const e=Le();Gn(O(N,"roles/"+e),{role:n,timestamp:Date.now()});const t=n;await on.from("fcm_tokens").update({role:t}).eq("device_name",e),Pe(O(N,"timer")).then(s=>{const i=s.val();if(i){const{startTime:r,duration:o,durationInput:a}=i;o?(Oh(r,o),an(!0)):an(!1)}})}async function $r(){document.querySelectorAll(".view").forEach(t=>t.style.display="none"),document.getElementById("startView").style.display="block",document.getElementById("startView2").style.display="block",clearInterval(rt),localStorage.setItem("activeView","start");const n=Le();Gn(O(N,"roles/"+n),{role:"start",timestamp:Date.now()}),await on.from("fcm_tokens").update({role:"start"}).eq("device_name",n)}async function $n(){await ke(O(N,"timer/duration")),await ke(O(N,"timer/startTime")),await ke(O(N,"timerMessage")),typeof rt<"u"&&clearInterval(rt);const e=(await Pe(O(N,"timer"))).val();let t=25*60;typeof(e==null?void 0:e.durationInput)=="number"&&e.durationInput>0&&(t=e.durationInput,(isNaN(t)||t<1)&&(t=60));const s=Date.now(),i={title:"⏰ Zeit abgelaufen!",body:"Mister X muss sich zeigen!",roles:["misterx"]};await Qe(O(N,"timer"),{startTime:s,duration:t,durationInput:t,canceled:!1,fired:!1}),await Qe(O(N,"timerMessage"),i)}function r0(){kl||(kl=!0,fn(O(N,"timer"),n=>{const e=n.val()||{},{startTime:t=null,duration:s=null,durationInput:i=null}=e;if(t===null||s===null){clearInterval(rt),an(!1);const r=document.getElementById("timer"),o=document.getElementById("agentTimer"),a=document.getElementById("settingsTimer");r&&(r.innerText="⏳ Zeit bis zum nächsten Posten: --:--"),o&&(o.innerText="⏳ Mister X Timer: --:--"),a&&(a.innerText="⏳ Aktueller Timer: --:--");return}Oh(t,s),an(!0)}))}function Oh(n,e){clearInterval(rt),rt=setInterval(()=>{const t=Date.now(),s=Math.floor((t-n)/1e3),i=e-s;let r;if(i<0)r="abgelaufen";else{const u=Math.floor(i/60),h=i%60;r=`${String(u).padStart(2,"0")}:${String(h).padStart(2,"0")}`}const o=document.getElementById("timer"),a=document.getElementById("agentTimer"),l=document.getElementById("settingsTimer");function c(u){u&&(i<=300&&i>1?(u.style.color="red",u.style.animation="blinker 1s linear infinite"):(u.style.color="",u.style.animation=""))}l&&(l.innerText=`⏳ Aktueller Timer: ${r}`,c(l)),o&&(o.innerText=`⏳ Zeit bis zum nächsten Posten: ${r}`,c(o)),a&&(a.innerText=`⏳ Mister X Timer: ${r}`,c(a)),i<=0&&(clearInterval(rt),an(!1),[o,a,l].forEach(u=>{u&&(u.style.color="",u.style.animation="")}),localStorage.getItem("activeView")==="misterx"&&(alert("Zeit abgelaufen, dein Standort wird einmalig geteilt"),a0(),$n()))},1e3)}function o0(){Pe(O(N,"timer")).then(n=>{if(!n.exists())return;const e=n.val(),t=document.getElementById("timerDurationInput");t&&(e&&typeof e.durationInput=="number"?t.value=Math.floor(e.durationInput/60):t.value=25)})}const Nh=document.createElement("style");Nh.innerHTML=`
@keyframes blinker {
  50% { opacity: 0; }
}
`;document.head.appendChild(Nh);function a0(){navigator.geolocation?navigator.geolocation.getCurrentPosition(n=>{const e=n.coords.latitude,t=n.coords.longitude,s=n.coords.accuracy,i=Date.now();if(s>100){document.getElementById("status").innerText="⚠️ Standort ungenau (±"+Math.round(s)+" m). Bitte Standortbeschreibung manuell eingeben.";let r=prompt("Bitte den Standort beschreiben (bzw. wenn U-Bahn, dann gemäß Regelwerk angeben)")||"wurde nicht angegeben!";br(O(N,"locations"),{description:r.trim(),timestamp:i});return}br(O(N,"locations"),{title:"Automatischer Standort",lat:e,lon:t,timestamp:i}),Ln("Mister X hat sich gezeigt!","Automatische Standort-Übermittlung.","agent"),Js()},Es):document.getElementById("status").innerText="Geolocation wird nicht unterstützt."}function Es(n){let e="❌ Fehler beim Abrufen des Standorts.";switch(n.code){case n.PERMISSION_DENIED:e+=" Zugriff verweigert.";break;case n.POSITION_UNAVAILABLE:e+=" Standortinformationen nicht verfügbar.";break;case n.TIMEOUT:e+=" Zeitüberschreitung bei der Standortabfrage.";break}e+=" Bitte erneut versuchen oder Standortbeschreibung manuell eingeben.",document.getElementById("status").innerText=e}function an(n){const e=document.getElementById("startTimerButton");e&&(e.disabled=n,e.style.opacity=n?"0.5":"1",e.style.pointerEvents=n?"none":"auto",e.style.cursor=n?"default":"pointer")}function l0(){localStorage.getItem("nachrichtAktiv")?(document.getElementById("permissionButton").style.display="none",document.getElementById("permissionButton2").style.display="block"):(document.getElementById("permissionButton").style.display="block",document.getElementById("permissionButton2").style.display="none")}async function c0(){if(confirm("Möchtest du wirklich alle gespeicherten Standorte löschen?"))try{await ke(O(N,"locations")),alert("Alle Standorte wurden gelöscht."),x&&(x.remove(),x=null),document.getElementById("map").style.display="none",document.getElementById("locationFeed").innerHTML="",Tn=[];const n=document.getElementById("status");n&&(n.innerText=""),await Jb(!0),Uo()}catch(n){k(n),alert("Fehler beim Löschen der Standorte.")}}async function u0(){await ke(O(N,"timer/duration")),await ke(O(N,"timer/startTime"));const e=(await Pe(O(N,"timerScheduleId"))).val();e&&(await fetch(`https://qstash.upstash.io/v2/schedules/${e}`,{method:"DELETE",headers:{Authorization:"Bearer eyJVc2VySUQiOiI3YjAxMDFmYi04MGE2LTRmMjAtOWM0MS0zNzZiNDUxNmNkOWQiLCJQYXNzd29yZCI6IjYyM2ZhNzlmOWM4MDRhMzQ5YmE2NjZmYjFlMDExNDBjIn0"}}),await ke(O(N,"timerScheduleId"))),await ke(O(N,"timerMessage")),clearInterval(rt),an(!1);const t=document.getElementById("timer"),s=document.getElementById("agentTimer"),i=document.getElementById("settingsTimer");t&&(t.innerText="⏳ Zeit bis zum nächsten Posten: --:--"),s&&(s.innerText="⏳ Mister X Timer: --:--"),i&&(i.innerText="⏳ Aktueller Timer: --:--"),Ln("Timer zurückgesetzt","Der Timer wurde zurückgesetzt!","all")}function h0(){const n=document.getElementById("max_Team_X").value;ke(O(N,"settings/max_Team_X")).then(()=>Qe(O(N,"settings/max_Team_X"),Number(n))).then(()=>{k("max_Team_X erfolgreich gespeichert:",n)}).catch(e=>{k("Fehler beim Speichern von max_Team_X:",e)})}function d0(){const n=document.getElementById("max_Team_X");Pe(O(N,"settings/max_Team_X")).then(e=>{e.exists()?(n.value=e.val(),k("max_Team_X geladen:",e.val())):k("Kein max_Team_X-Wert gefunden.")}).catch(e=>{k("Fehler beim Laden von max_Team_X:",e)})}function f0(){const e=document.getElementById("timerDurationInput").value*60;ke(O(N,"timer/durationInput")).then(()=>Qe(O(N,"timer/durationInput"),Number(e))).then(()=>{k("Duration_input:",e)}).catch(t=>{k("Fehler beim Speichern von DurationInput:",t)})}async function p0(){if(!("serviceWorker"in navigator))throw new Error("Service Worker wird vom Browser nicht unterstützt.");const n="/Mister-X/",e=await navigator.serviceWorker.getRegistration(n);if(e)return e;const t=`${n}firebase-messaging-sw.js`;return navigator.serviceWorker.register(t,{scope:n,type:"module"})}function g0(){var n,e;return((n=window.matchMedia)==null?void 0:n.call(window,"(display-mode: standalone)").matches)||((e=window.navigator)==null?void 0:e.standalone)===!0}async function _0(){const n={notificationsAPI:"Notification"in window,serviceWorker:"serviceWorker"in navigator,pushManager:"PushManager"in window,standalone:g0(),fcm:!1};try{n.fcm=await yi()}catch{n.fcm=!1}return n}async function $l(n){const e=Le();if(!n||!e)return;await fetch(`https://mister-x-d6b59-default-rtdb.europe-west1.firebasedatabase.app/notifications/${n}/recipients/${e}.json`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(!0)})}function Fl(n){try{const e=n&&n.messageId;if(e){if(Gs.has(e))return;Gs.add(e)}if(e&&typeof $l=="function"&&$l(e).catch(t=>k("Markieren fehlgeschlagen:",t)),document.visibilityState==="visible"){const t=n&&n.title?n.title:"Nachricht",s=n&&n.body?n.body:"";alert(`${t}
${s}`)}}catch(e){k("handleInAppMessage error:",e)}}setInterval(()=>{Gs.size>5e3&&Gs.clear()},60*1e3);async function m0(){var n,e,t,s,i,r;Cb();try{const o=await _0();o&&o.fcm&&(De||(De=vi(pn)),window.__swMsgListenerAdded||(navigator.serviceWorker.addEventListener("message",h=>{if(h&&h.data&&h.data.type==="PUSH"){const d=h.data.payload||{};Fl(d),k("[Page] SW-Message empfangen",d)}}),window.__swMsgListenerAdded=!0),Zy(De,h=>{const d=h&&h.data?h.data:{};Fl(d),k("[Page] FCM onMessage empfangen",h)}));const a=document.getElementById("enablePush"),l=document.getElementById("pushHint");a&&(!o.fcm&&/iPhone|iPad|iPod/i.test(navigator.userAgent)&&!o.standalone?(a.style.display="none",l&&(l.textContent="Installiere die App zum Home-Bildschirm, um Benachrichtigungen zu aktivieren.",l.style.display="block")):!o.fcm||!o.notificationsAPI||!o.serviceWorker||!o.pushManager?(a.style.display="none",l&&(l.textContent="Benachrichtigungen werden von diesem Browser/Modus nicht unterstützt.",l.style.display="block")):Notification.permission==="granted"?(a.textContent="Benachrichtigungen sind aktiv",a.disabled=!0):(a.addEventListener("click",enablePush,{once:!0}),a.style.display="inline-flex"));const c=localStorage.getItem("activeView")||"start";Gb(),c!=="start"&&Ph(c),Js(),r0(),o0(),l0(),Ib(),n0(),jb(),qb(),(n=document.getElementById("toggleTracking"))==null||n.addEventListener("change",h=>{h.target.checked?$b():Ih()}),(e=document.getElementById("toggleFollow"))==null||e.addEventListener("change",h=>{yh=h.target.checked});const u=document.getElementById("photoInput");u&&u.addEventListener("change",function(){var d;if((d=this.files)==null?void 0:d[0]){window.fotoHochgeladen=!0;const v=document.getElementById("status");v&&(v.innerText="📸 Foto ausgewählt!")}})}catch(o){alert("Fehler in startScript: "+((o==null?void 0:o.message)??String(o))),(s=(t=document.getElementById("startView"))==null?void 0:t.style)==null||s.setProperty("display","block"),(r=(i=document.getElementById("startView2"))==null?void 0:i.style)==null||r.setProperty("display","block")}}function k(...n){console.log(...n);const e=document.getElementById("settingsLog");if(!e)return;const t=new Date().toLocaleTimeString(),s=document.createElement("div");s.innerHTML=`<strong>[${t}]</strong>`,n.forEach(i=>{if(typeof i=="object"){const r=document.createElement("details"),o=document.createElement("summary");o.textContent="Objekt anzeigen",r.appendChild(o);const a=document.createElement("pre");a.textContent=JSON.stringify(i,null,2),r.appendChild(a),s.appendChild(r)}else s.innerHTML+=` ${i}`}),e.appendChild(s),e.scrollTop=e.scrollHeight}window.switchView=Ph;window.requestPermission=Sb;window.sendLocationWithPhoto=Ob;window.startTimer=$n;window.goBack=$r;window.save_timer_duration=f0;window.save_max_mister_x=h0;window.resetTimer=u0;window.deleteAllLocations=c0;window.resetAllMisterXRollen=s0;window.removeNotificationSetup=Ab;window.mxState=window.mxState||{};window.mxState.selectedPost=null;function xh(n){window.mxState.selectedPost=n}function y0(){return window.mxState.selectedPost}document.addEventListener("DOMContentLoaded",m0);
