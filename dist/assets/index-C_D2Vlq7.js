(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();const Pu=()=>{};var Kr={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Va={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const T=function(n,e){if(!n)throw Yt(e)},Yt=function(n){return new Error("Firebase Database ("+Va.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wa=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let i=n.charCodeAt(s);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&s+1<n.length&&(n.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++s)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Ou=function(n){const e=[];let t=0,s=0;for(;t<n.length;){const i=n[t++];if(i<128)e[s++]=String.fromCharCode(i);else if(i>191&&i<224){const r=n[t++];e[s++]=String.fromCharCode((i&31)<<6|r&63)}else if(i>239&&i<365){const r=n[t++],o=n[t++],a=n[t++],l=((i&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(l>>10)),e[s++]=String.fromCharCode(56320+(l&1023))}else{const r=n[t++],o=n[t++];e[s++]=String.fromCharCode((i&15)<<12|(r&63)<<6|o&63)}}return e.join("")},zi={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let i=0;i<n.length;i+=3){const r=n[i],o=i+1<n.length,a=o?n[i+1]:0,l=i+2<n.length,c=l?n[i+2]:0,u=r>>2,h=(r&3)<<4|a>>4;let d=(a&15)<<2|c>>6,v=c&63;l||(v=64,o||(d=64)),s.push(t[u],t[h],t[d],t[v])}return s.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Wa(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Ou(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<n.length;){const r=t[n.charAt(i++)],a=i<n.length?t[n.charAt(i)]:0;++i;const c=i<n.length?t[n.charAt(i)]:64;++i;const h=i<n.length?t[n.charAt(i)]:64;if(++i,r==null||a==null||c==null||h==null)throw new Nu;const d=r<<2|a>>4;if(s.push(d),c!==64){const v=a<<4&240|c>>2;if(s.push(v),h!==64){const b=c<<6&192|h;s.push(b)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Nu extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const qa=function(n){const e=Wa(n);return zi.encodeByteArray(e,!0)},Yn=function(n){return qa(n).replace(/\./g,"")},yi=function(n){try{return zi.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xu(n){return Ha(void 0,n)}function Ha(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!Du(t)||(n[t]=Ha(n[t],e[t]));return n}function Du(n){return n!=="__proto__"}/**
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
 */function Lu(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Mu=()=>Lu().__FIREBASE_DEFAULTS__,ju=()=>{if(typeof process>"u"||typeof Kr>"u")return;const n=Kr.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Fu=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&yi(n[1]);return e&&JSON.parse(e)},za=()=>{try{return Pu()||Mu()||ju()||Fu()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},$u=n=>za()?.emulatorHosts?.[n],Ka=n=>{const e=$u(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),s]:[e.substring(0,t),s]},Ga=()=>za()?.config;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Es=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,s)=>{t?this.reject(t):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,s))}}};/**
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
 */function Ss(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Ya(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function Ja(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},s=e||"demo-project",i=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${s}`,aud:s,iat:i,exp:i+3600,auth_time:i,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Yn(JSON.stringify(t)),Yn(JSON.stringify(o)),""].join(".")}const cn={};function Uu(){const n={prod:[],emulator:[]};for(const e of Object.keys(cn))cn[e]?n.emulator.push(e):n.prod.push(e);return n}function Bu(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Gr=!1;function Qa(n,e){if(typeof window>"u"||typeof document>"u"||!Ss(window.location.host)||cn[n]===e||cn[n]||Gr)return;cn[n]=e;function t(d){return`__firebase__banner__${d}`}const s="__firebase__banner",r=Uu().prod.length>0;function o(){const d=document.getElementById(s);d&&d.remove()}function a(d){d.style.display="flex",d.style.background="#7faaf0",d.style.position="fixed",d.style.bottom="5px",d.style.left="5px",d.style.padding=".5em",d.style.borderRadius="5px",d.style.alignItems="center"}function l(d,v){d.setAttribute("width","24"),d.setAttribute("id",v),d.setAttribute("height","24"),d.setAttribute("viewBox","0 0 24 24"),d.setAttribute("fill","none"),d.style.marginLeft="-6px"}function c(){const d=document.createElement("span");return d.style.cursor="pointer",d.style.marginLeft="16px",d.style.fontSize="24px",d.innerHTML=" &times;",d.onclick=()=>{Gr=!0,o()},d}function u(d,v){d.setAttribute("id",v),d.innerText="Learn more",d.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",d.setAttribute("target","__blank"),d.style.paddingLeft="5px",d.style.textDecoration="underline"}function h(){const d=Bu(s),v=t("text"),b=document.getElementById(v)||document.createElement("span"),S=t("learnmore"),E=document.getElementById(S)||document.createElement("a"),A=t("preprendIcon"),F=document.getElementById(A)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(d.created){const I=d.element;a(I),u(E,S);const C=c();l(F,A),I.append(F,b,E,C),document.body.appendChild(I)}r?(b.innerText="Preview backend disconnected.",F.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(F.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
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
 */function Vu(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Xa(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Vu())}function Wu(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function qu(){return Va.NODE_ADMIN===!0}function Za(){try{return typeof indexedDB=="object"}catch{return!1}}function el(){return new Promise((n,e)=>{try{let t=!0;const s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(s),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{e(i.error?.message||"")}}catch(t){e(t)}})}function Hu(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zu="FirebaseError";class st extends Error{constructor(e,t,s){super(t),this.code=e,this.customData=s,this.name=zu,Object.setPrototypeOf(this,st.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ts.prototype.create)}}class Ts{constructor(e,t,s){this.service=e,this.serviceName=t,this.errors=s}create(e,...t){const s=t[0]||{},i=`${this.service}/${e}`,r=this.errors[e],o=r?Ku(r,s):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new st(i,a,s)}}function Ku(n,e){return n.replace(Gu,(t,s)=>{const i=e[s];return i!=null?String(i):`<${s}?>`})}const Gu=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mn(n){return JSON.parse(n)}function J(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tl=function(n){let e={},t={},s={},i="";try{const r=n.split(".");e=mn(yi(r[0])||""),t=mn(yi(r[1])||""),i=r[2],s=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:s,signature:i}},Yu=function(n){const e=tl(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},Ju=function(n){const e=tl(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function We(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function Wt(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function Yr(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Jn(n,e,t){const s={};for(const i in n)Object.prototype.hasOwnProperty.call(n,i)&&(s[i]=e.call(t,n[i],i,n));return s}function Qn(n,e){if(n===e)return!0;const t=Object.keys(n),s=Object.keys(e);for(const i of t){if(!s.includes(i))return!1;const r=n[i],o=e[i];if(Jr(r)&&Jr(o)){if(!Qn(r,o))return!1}else if(r!==o)return!1}for(const i of s)if(!t.includes(i))return!1;return!0}function Jr(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qu(n){const e=[];for(const[t,s]of Object.entries(n))Array.isArray(s)?s.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xu{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const s=this.W_;if(typeof e=="string")for(let h=0;h<16;h++)s[h]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let h=0;h<16;h++)s[h]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let h=16;h<80;h++){const d=s[h-3]^s[h-8]^s[h-14]^s[h-16];s[h]=(d<<1|d>>>31)&4294967295}let i=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,u;for(let h=0;h<80;h++){h<40?h<20?(c=a^r&(o^a),u=1518500249):(c=r^o^a,u=1859775393):h<60?(c=r&o|a&(r|o),u=2400959708):(c=r^o^a,u=3395469782);const d=(i<<5|i>>>27)+c+l+u+s[h]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=i,i=d}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const s=t-this.blockSize;let i=0;const r=this.buf_;let o=this.inbuf_;for(;i<t;){if(o===0)for(;i<=s;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<t;)if(r[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}else for(;i<t;)if(r[o]=e[i],++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=t&255,t/=256;this.compress_(this.buf_);let s=0;for(let i=0;i<5;i++)for(let r=24;r>=0;r-=8)e[s]=this.chain_[i]>>r&255,++s;return e}}function Ki(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zu=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let i=n.charCodeAt(s);if(i>=55296&&i<=56319){const r=i-55296;s++,T(s<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(s)-56320;i=65536+(r<<10)+o}i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):i<65536?(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Is=function(n){let e=0;for(let t=0;t<n.length;t++){const s=n.charCodeAt(t);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,t++):e+=3}return e};/**
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
 */function ke(n){return n&&n._delegate?n._delegate:n}class Ie{constructor(e,t,s){this.name=e,this.instanceFactory=t,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const ct="[DEFAULT]";/**
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
 */class eh{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const s=new Es;if(this.instancesDeferred.set(t,s),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&s.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),s=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(nh(e))try{this.getOrInitializeService({instanceIdentifier:ct})}catch{}for(const[t,s]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:i});s.resolve(r)}catch{}}}}clearInstance(e=ct){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ct){return this.instances.has(e)}getOptions(e=ct){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:s,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);s===a&&o.resolve(i)}return i}onInit(e,t){const s=this.normalizeInstanceIdentifier(t),i=this.onInitCallbacks.get(s)??new Set;i.add(e),this.onInitCallbacks.set(s,i);const r=this.instances.get(s);return r&&e(r,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const s=this.onInitCallbacks.get(t);if(s)for(const i of s)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:th(e),options:t}),this.instances.set(e,s),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=ct){return this.component?this.component.multipleInstances?e:ct:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function th(n){return n===ct?void 0:n}function nh(n){return n.instantiationMode==="EAGER"}/**
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
 */class sh{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new eh(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var V;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(V||(V={}));const ih={debug:V.DEBUG,verbose:V.VERBOSE,info:V.INFO,warn:V.WARN,error:V.ERROR,silent:V.SILENT},rh=V.INFO,oh={[V.DEBUG]:"log",[V.VERBOSE]:"log",[V.INFO]:"info",[V.WARN]:"warn",[V.ERROR]:"error"},ah=(n,e,...t)=>{if(e<n.logLevel)return;const s=new Date().toISOString(),i=oh[e];if(i)console[i](`[${s}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Gi{constructor(e){this.name=e,this._logLevel=rh,this._logHandler=ah,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in V))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?ih[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,V.DEBUG,...e),this._logHandler(this,V.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,V.VERBOSE,...e),this._logHandler(this,V.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,V.INFO,...e),this._logHandler(this,V.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,V.WARN,...e),this._logHandler(this,V.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,V.ERROR,...e),this._logHandler(this,V.ERROR,...e)}}const lh=(n,e)=>e.some(t=>n instanceof t);let Qr,Xr;function ch(){return Qr||(Qr=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function uh(){return Xr||(Xr=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const nl=new WeakMap,vi=new WeakMap,sl=new WeakMap,Hs=new WeakMap,Yi=new WeakMap;function hh(n){const e=new Promise((t,s)=>{const i=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t($e(n.result)),i()},o=()=>{s(n.error),i()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&nl.set(t,n)}).catch(()=>{}),Yi.set(e,n),e}function dh(n){if(vi.has(n))return;const e=new Promise((t,s)=>{const i=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),i()},o=()=>{s(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});vi.set(n,e)}let wi={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return vi.get(n);if(e==="objectStoreNames")return n.objectStoreNames||sl.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return $e(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function fh(n){wi=n(wi)}function ph(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const s=n.call(zs(this),e,...t);return sl.set(s,e.sort?e.sort():[e]),$e(s)}:uh().includes(n)?function(...e){return n.apply(zs(this),e),$e(nl.get(this))}:function(...e){return $e(n.apply(zs(this),e))}}function gh(n){return typeof n=="function"?ph(n):(n instanceof IDBTransaction&&dh(n),lh(n,ch())?new Proxy(n,wi):n)}function $e(n){if(n instanceof IDBRequest)return hh(n);if(Hs.has(n))return Hs.get(n);const e=gh(n);return e!==n&&(Hs.set(n,e),Yi.set(e,n)),e}const zs=n=>Yi.get(n);function Cs(n,e,{blocked:t,upgrade:s,blocking:i,terminated:r}={}){const o=indexedDB.open(n,e),a=$e(o);return s&&o.addEventListener("upgradeneeded",l=>{s($e(o.result),l.oldVersion,l.newVersion,$e(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),i&&l.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}function Ks(n,{blocked:e}={}){const t=indexedDB.deleteDatabase(n);return e&&t.addEventListener("blocked",s=>e(s.oldVersion,s)),$e(t).then(()=>{})}const _h=["get","getKey","getAll","getAllKeys","count"],mh=["put","add","delete","clear"],Gs=new Map;function Zr(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Gs.get(e))return Gs.get(e);const t=e.replace(/FromIndex$/,""),s=e!==t,i=mh.includes(t);if(!(t in(s?IDBIndex:IDBObjectStore).prototype)||!(i||_h.includes(t)))return;const r=async function(o,...a){const l=this.transaction(o,i?"readwrite":"readonly");let c=l.store;return s&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),i&&l.done]))[0]};return Gs.set(e,r),r}fh(n=>({...n,get:(e,t,s)=>Zr(e,t)||n.get(e,t,s),has:(e,t)=>!!Zr(e,t)||n.has(e,t)}));/**
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
 */class yh{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(vh(t)){const s=t.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(t=>t).join(" ")}}function vh(n){return n.getComponent()?.type==="VERSION"}const bi="@firebase/app",eo="0.14.0";/**
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
 */const Be=new Gi("@firebase/app"),wh="@firebase/app-compat",bh="@firebase/analytics-compat",Eh="@firebase/analytics",Sh="@firebase/app-check-compat",Th="@firebase/app-check",Ih="@firebase/auth",Ch="@firebase/auth-compat",kh="@firebase/database",Ah="@firebase/data-connect",Rh="@firebase/database-compat",Ph="@firebase/functions",Oh="@firebase/functions-compat",Nh="@firebase/installations",xh="@firebase/installations-compat",Dh="@firebase/messaging",Lh="@firebase/messaging-compat",Mh="@firebase/performance",jh="@firebase/performance-compat",Fh="@firebase/remote-config",$h="@firebase/remote-config-compat",Uh="@firebase/storage",Bh="@firebase/storage-compat",Vh="@firebase/firestore",Wh="@firebase/ai",qh="@firebase/firestore-compat",Hh="firebase",zh="12.0.0";/**
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
 */const Ei="[DEFAULT]",Kh={[bi]:"fire-core",[wh]:"fire-core-compat",[Eh]:"fire-analytics",[bh]:"fire-analytics-compat",[Th]:"fire-app-check",[Sh]:"fire-app-check-compat",[Ih]:"fire-auth",[Ch]:"fire-auth-compat",[kh]:"fire-rtdb",[Ah]:"fire-data-connect",[Rh]:"fire-rtdb-compat",[Ph]:"fire-fn",[Oh]:"fire-fn-compat",[Nh]:"fire-iid",[xh]:"fire-iid-compat",[Dh]:"fire-fcm",[Lh]:"fire-fcm-compat",[Mh]:"fire-perf",[jh]:"fire-perf-compat",[Fh]:"fire-rc",[$h]:"fire-rc-compat",[Uh]:"fire-gcs",[Bh]:"fire-gcs-compat",[Vh]:"fire-fst",[qh]:"fire-fst-compat",[Wh]:"fire-vertex","fire-js":"fire-js",[Hh]:"fire-js-all"};/**
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
 */const Xn=new Map,Gh=new Map,Si=new Map;function to(n,e){try{n.container.addComponent(e)}catch(t){Be.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Re(n){const e=n.name;if(Si.has(e))return Be.debug(`There were multiple attempts to register component ${e}.`),!1;Si.set(e,n);for(const t of Xn.values())to(t,n);for(const t of Gh.values())to(t,n);return!0}function On(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Ji(n){return n==null?!1:n.settings!==void 0}/**
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
 */const Yh={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ye=new Ts("app","Firebase",Yh);/**
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
 */class Jh{constructor(e,t,s){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new Ie("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ye.create("app-deleted",{appName:this._name})}}/**
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
 */const Qi=zh;function il(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const s={name:Ei,automaticDataCollectionEnabled:!0,...e},i=s.name;if(typeof i!="string"||!i)throw Ye.create("bad-app-name",{appName:String(i)});if(t||(t=Ga()),!t)throw Ye.create("no-options");const r=Xn.get(i);if(r){if(Qn(t,r.options)&&Qn(s,r.config))return r;throw Ye.create("duplicate-app",{appName:i})}const o=new sh(i);for(const l of Si.values())o.addComponent(l);const a=new Jh(t,s,o);return Xn.set(i,a),a}function Xi(n=Ei){const e=Xn.get(n);if(!e&&n===Ei&&Ga())return il();if(!e)throw Ye.create("no-app",{appName:n});return e}function ue(n,e,t){let s=Kh[n]??n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),r=e.match(/\s|\//);if(i||r){const o=[`Unable to register library "${s}" with version "${e}":`];i&&o.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Be.warn(o.join(" "));return}Re(new Ie(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const Qh="firebase-heartbeat-database",Xh=1,yn="firebase-heartbeat-store";let Ys=null;function rl(){return Ys||(Ys=Cs(Qh,Xh,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(yn)}catch(t){console.warn(t)}}}}).catch(n=>{throw Ye.create("idb-open",{originalErrorMessage:n.message})})),Ys}async function Zh(n){try{const t=(await rl()).transaction(yn),s=await t.objectStore(yn).get(ol(n));return await t.done,s}catch(e){if(e instanceof st)Be.warn(e.message);else{const t=Ye.create("idb-get",{originalErrorMessage:e?.message});Be.warn(t.message)}}}async function no(n,e){try{const s=(await rl()).transaction(yn,"readwrite");await s.objectStore(yn).put(e,ol(n)),await s.done}catch(t){if(t instanceof st)Be.warn(t.message);else{const s=Ye.create("idb-set",{originalErrorMessage:t?.message});Be.warn(s.message)}}}function ol(n){return`${n.name}!${n.options.appId}`}/**
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
 */const ed=1024,td=30;class nd{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new id(t),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=so();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(i=>i.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:t}),this._heartbeatsCache.heartbeats.length>td){const i=rd(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Be.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=so(),{heartbeatsToSend:t,unsentEntries:s}=sd(this._heartbeatsCache.heartbeats),i=Yn(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return Be.warn(e),""}}}function so(){return new Date().toISOString().substring(0,10)}function sd(n,e=ed){const t=[];let s=n.slice();for(const i of n){const r=t.find(o=>o.agent===i.agent);if(r){if(r.dates.push(i.date),io(t)>e){r.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),io(t)>e){t.pop();break}s=s.slice(1)}return{heartbeatsToSend:t,unsentEntries:s}}class id{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Za()?el().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Zh(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return no(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return no(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function io(n){return Yn(JSON.stringify({version:2,heartbeats:n})).length}function rd(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let s=1;s<n.length;s++)n[s].date<t&&(t=n[s].date,e=s);return e}/**
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
 */function od(n){Re(new Ie("platform-logger",e=>new yh(e),"PRIVATE")),Re(new Ie("heartbeat",e=>new nd(e),"PRIVATE")),ue(bi,eo,n),ue(bi,eo,"esm2020"),ue("fire-js","")}od("");const al="@firebase/installations",Zi="0.6.19";/**
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
 */const ll=1e4,cl=`w:${Zi}`,ul="FIS_v2",ad="https://firebaseinstallations.googleapis.com/v1",ld=3600*1e3,cd="installations",ud="Installations";/**
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
 */const hd={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},vt=new Ts(cd,ud,hd);function hl(n){return n instanceof st&&n.code.includes("request-failed")}/**
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
 */function dl({projectId:n}){return`${ad}/projects/${n}/installations`}function fl(n){return{token:n.token,requestStatus:2,expiresIn:fd(n.expiresIn),creationTime:Date.now()}}async function pl(n,e){const s=(await e.json()).error;return vt.create("request-failed",{requestName:n,serverCode:s.code,serverMessage:s.message,serverStatus:s.status})}function gl({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function dd(n,{refreshToken:e}){const t=gl(n);return t.append("Authorization",pd(e)),t}async function _l(n){const e=await n();return e.status>=500&&e.status<600?n():e}function fd(n){return Number(n.replace("s","000"))}function pd(n){return`${ul} ${n}`}/**
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
 */async function gd({appConfig:n,heartbeatServiceProvider:e},{fid:t}){const s=dl(n),i=gl(n),r=e.getImmediate({optional:!0});if(r){const c=await r.getHeartbeatsHeader();c&&i.append("x-firebase-client",c)}const o={fid:t,authVersion:ul,appId:n.appId,sdkVersion:cl},a={method:"POST",headers:i,body:JSON.stringify(o)},l=await _l(()=>fetch(s,a));if(l.ok){const c=await l.json();return{fid:c.fid||t,registrationStatus:2,refreshToken:c.refreshToken,authToken:fl(c.authToken)}}else throw await pl("Create Installation",l)}/**
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
 */function ml(n){return new Promise(e=>{setTimeout(e,n)})}/**
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
 */function _d(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const md=/^[cdef][\w-]{21}$/,Ti="";function yd(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const t=vd(n);return md.test(t)?t:Ti}catch{return Ti}}function vd(n){return _d(n).substr(0,22)}/**
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
 */function ks(n){return`${n.appName}!${n.appId}`}/**
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
 */const yl=new Map;function vl(n,e){const t=ks(n);wl(t,e),wd(t,e)}function wl(n,e){const t=yl.get(n);if(t)for(const s of t)s(e)}function wd(n,e){const t=bd();t&&t.postMessage({key:n,fid:e}),Ed()}let ft=null;function bd(){return!ft&&"BroadcastChannel"in self&&(ft=new BroadcastChannel("[Firebase] FID Change"),ft.onmessage=n=>{wl(n.data.key,n.data.fid)}),ft}function Ed(){yl.size===0&&ft&&(ft.close(),ft=null)}/**
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
 */const Sd="firebase-installations-database",Td=1,wt="firebase-installations-store";let Js=null;function er(){return Js||(Js=Cs(Sd,Td,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(wt)}}})),Js}async function Zn(n,e){const t=ks(n),i=(await er()).transaction(wt,"readwrite"),r=i.objectStore(wt),o=await r.get(t);return await r.put(e,t),await i.done,(!o||o.fid!==e.fid)&&vl(n,e.fid),e}async function bl(n){const e=ks(n),s=(await er()).transaction(wt,"readwrite");await s.objectStore(wt).delete(e),await s.done}async function As(n,e){const t=ks(n),i=(await er()).transaction(wt,"readwrite"),r=i.objectStore(wt),o=await r.get(t),a=e(o);return a===void 0?await r.delete(t):await r.put(a,t),await i.done,a&&(!o||o.fid!==a.fid)&&vl(n,a.fid),a}/**
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
 */async function tr(n){let e;const t=await As(n.appConfig,s=>{const i=Id(s),r=Cd(n,i);return e=r.registrationPromise,r.installationEntry});return t.fid===Ti?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function Id(n){const e=n||{fid:yd(),registrationStatus:0};return El(e)}function Cd(n,e){if(e.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject(vt.create("app-offline"));return{installationEntry:e,registrationPromise:i}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},s=kd(n,t);return{installationEntry:t,registrationPromise:s}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:Ad(n)}:{installationEntry:e}}async function kd(n,e){try{const t=await gd(n,e);return Zn(n.appConfig,t)}catch(t){throw hl(t)&&t.customData.serverCode===409?await bl(n.appConfig):await Zn(n.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function Ad(n){let e=await ro(n.appConfig);for(;e.registrationStatus===1;)await ml(100),e=await ro(n.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:s}=await tr(n);return s||t}return e}function ro(n){return As(n,e=>{if(!e)throw vt.create("installation-not-found");return El(e)})}function El(n){return Rd(n)?{fid:n.fid,registrationStatus:0}:n}function Rd(n){return n.registrationStatus===1&&n.registrationTime+ll<Date.now()}/**
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
 */async function Pd({appConfig:n,heartbeatServiceProvider:e},t){const s=Od(n,t),i=dd(n,t),r=e.getImmediate({optional:!0});if(r){const c=await r.getHeartbeatsHeader();c&&i.append("x-firebase-client",c)}const o={installation:{sdkVersion:cl,appId:n.appId}},a={method:"POST",headers:i,body:JSON.stringify(o)},l=await _l(()=>fetch(s,a));if(l.ok){const c=await l.json();return fl(c)}else throw await pl("Generate Auth Token",l)}function Od(n,{fid:e}){return`${dl(n)}/${e}/authTokens:generate`}/**
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
 */async function nr(n,e=!1){let t;const s=await As(n.appConfig,r=>{if(!Sl(r))throw vt.create("not-registered");const o=r.authToken;if(!e&&Dd(o))return r;if(o.requestStatus===1)return t=Nd(n,e),r;{if(!navigator.onLine)throw vt.create("app-offline");const a=Md(r);return t=xd(n,a),a}});return t?await t:s.authToken}async function Nd(n,e){let t=await oo(n.appConfig);for(;t.authToken.requestStatus===1;)await ml(100),t=await oo(n.appConfig);const s=t.authToken;return s.requestStatus===0?nr(n,e):s}function oo(n){return As(n,e=>{if(!Sl(e))throw vt.create("not-registered");const t=e.authToken;return jd(t)?{...e,authToken:{requestStatus:0}}:e})}async function xd(n,e){try{const t=await Pd(n,e),s={...e,authToken:t};return await Zn(n.appConfig,s),t}catch(t){if(hl(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await bl(n.appConfig);else{const s={...e,authToken:{requestStatus:0}};await Zn(n.appConfig,s)}throw t}}function Sl(n){return n!==void 0&&n.registrationStatus===2}function Dd(n){return n.requestStatus===2&&!Ld(n)}function Ld(n){const e=Date.now();return e<n.creationTime||n.creationTime+n.expiresIn<e+ld}function Md(n){const e={requestStatus:1,requestTime:Date.now()};return{...n,authToken:e}}function jd(n){return n.requestStatus===1&&n.requestTime+ll<Date.now()}/**
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
 */async function Fd(n){const e=n,{installationEntry:t,registrationPromise:s}=await tr(e);return s?s.catch(console.error):nr(e).catch(console.error),t.fid}/**
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
 */async function $d(n,e=!1){const t=n;return await Ud(t),(await nr(t,e)).token}async function Ud(n){const{registrationPromise:e}=await tr(n);e&&await e}/**
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
 */function Bd(n){if(!n||!n.options)throw Qs("App Configuration");if(!n.name)throw Qs("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!n.options[t])throw Qs(t);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function Qs(n){return vt.create("missing-app-config-values",{valueName:n})}/**
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
 */const Tl="installations",Vd="installations-internal",Wd=n=>{const e=n.getProvider("app").getImmediate(),t=Bd(e),s=On(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:s,_delete:()=>Promise.resolve()}},qd=n=>{const e=n.getProvider("app").getImmediate(),t=On(e,Tl).getImmediate();return{getId:()=>Fd(t),getToken:i=>$d(t,i)}};function Hd(){Re(new Ie(Tl,Wd,"PUBLIC")),Re(new Ie(Vd,qd,"PRIVATE"))}Hd();ue(al,Zi);ue(al,Zi,"esm2020");/**
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
 */const zd="/firebase-messaging-sw.js",Kd="/firebase-cloud-messaging-push-scope",Il="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",Gd="https://fcmregistrations.googleapis.com/v1",Cl="google.c.a.c_id",Yd="google.c.a.c_l",Jd="google.c.a.ts",Qd="google.c.a.e",ao=1e4;var lo;(function(n){n[n.DATA_MESSAGE=1]="DATA_MESSAGE",n[n.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(lo||(lo={}));/**
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
 */var vn;(function(n){n.PUSH_RECEIVED="push-received",n.NOTIFICATION_CLICKED="notification-clicked"})(vn||(vn={}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xe(n){const e=new Uint8Array(n);return btoa(String.fromCharCode(...e)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function Xd(n){const e="=".repeat((4-n.length%4)%4),t=(n+e).replace(/\-/g,"+").replace(/_/g,"/"),s=atob(t),i=new Uint8Array(s.length);for(let r=0;r<s.length;++r)i[r]=s.charCodeAt(r);return i}/**
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
 */const Xs="fcm_token_details_db",Zd=5,co="fcm_token_object_Store";async function ef(n){if("databases"in indexedDB&&!(await indexedDB.databases()).map(r=>r.name).includes(Xs))return null;let e=null;return(await Cs(Xs,Zd,{upgrade:async(s,i,r,o)=>{if(i<2||!s.objectStoreNames.contains(co))return;const a=o.objectStore(co),l=await a.index("fcmSenderId").get(n);if(await a.clear(),!!l){if(i===2){const c=l;if(!c.auth||!c.p256dh||!c.endpoint)return;e={token:c.fcmToken,createTime:c.createTime??Date.now(),subscriptionOptions:{auth:c.auth,p256dh:c.p256dh,endpoint:c.endpoint,swScope:c.swScope,vapidKey:typeof c.vapidKey=="string"?c.vapidKey:xe(c.vapidKey)}}}else if(i===3){const c=l;e={token:c.fcmToken,createTime:c.createTime,subscriptionOptions:{auth:xe(c.auth),p256dh:xe(c.p256dh),endpoint:c.endpoint,swScope:c.swScope,vapidKey:xe(c.vapidKey)}}}else if(i===4){const c=l;e={token:c.fcmToken,createTime:c.createTime,subscriptionOptions:{auth:xe(c.auth),p256dh:xe(c.p256dh),endpoint:c.endpoint,swScope:c.swScope,vapidKey:xe(c.vapidKey)}}}}}})).close(),await Ks(Xs),await Ks("fcm_vapid_details_db"),await Ks("undefined"),tf(e)?e:null}function tf(n){if(!n||!n.subscriptionOptions)return!1;const{subscriptionOptions:e}=n;return typeof n.createTime=="number"&&n.createTime>0&&typeof n.token=="string"&&n.token.length>0&&typeof e.auth=="string"&&e.auth.length>0&&typeof e.p256dh=="string"&&e.p256dh.length>0&&typeof e.endpoint=="string"&&e.endpoint.length>0&&typeof e.swScope=="string"&&e.swScope.length>0&&typeof e.vapidKey=="string"&&e.vapidKey.length>0}/**
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
 */const nf="firebase-messaging-database",sf=1,wn="firebase-messaging-store";let Zs=null;function kl(){return Zs||(Zs=Cs(nf,sf,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(wn)}}})),Zs}async function rf(n){const e=Al(n),s=await(await kl()).transaction(wn).objectStore(wn).get(e);if(s)return s;{const i=await ef(n.appConfig.senderId);if(i)return await sr(n,i),i}}async function sr(n,e){const t=Al(n),i=(await kl()).transaction(wn,"readwrite");return await i.objectStore(wn).put(e,t),await i.done,e}function Al({appConfig:n}){return n.appId}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const of={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},oe=new Ts("messaging","Messaging",of);/**
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
 */async function af(n,e){const t=await rr(n),s=Rl(e),i={method:"POST",headers:t,body:JSON.stringify(s)};let r;try{r=await(await fetch(ir(n.appConfig),i)).json()}catch(o){throw oe.create("token-subscribe-failed",{errorInfo:o?.toString()})}if(r.error){const o=r.error.message;throw oe.create("token-subscribe-failed",{errorInfo:o})}if(!r.token)throw oe.create("token-subscribe-no-token");return r.token}async function lf(n,e){const t=await rr(n),s=Rl(e.subscriptionOptions),i={method:"PATCH",headers:t,body:JSON.stringify(s)};let r;try{r=await(await fetch(`${ir(n.appConfig)}/${e.token}`,i)).json()}catch(o){throw oe.create("token-update-failed",{errorInfo:o?.toString()})}if(r.error){const o=r.error.message;throw oe.create("token-update-failed",{errorInfo:o})}if(!r.token)throw oe.create("token-update-no-token");return r.token}async function cf(n,e){const s={method:"DELETE",headers:await rr(n)};try{const r=await(await fetch(`${ir(n.appConfig)}/${e}`,s)).json();if(r.error){const o=r.error.message;throw oe.create("token-unsubscribe-failed",{errorInfo:o})}}catch(i){throw oe.create("token-unsubscribe-failed",{errorInfo:i?.toString()})}}function ir({projectId:n}){return`${Gd}/projects/${n}/registrations`}async function rr({appConfig:n,installations:e}){const t=await e.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n.apiKey,"x-goog-firebase-installations-auth":`FIS ${t}`})}function Rl({p256dh:n,auth:e,endpoint:t,vapidKey:s}){const i={web:{endpoint:t,auth:e,p256dh:n}};return s!==Il&&(i.web.applicationPubKey=s),i}/**
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
 */const uf=10080*60*1e3;async function hf(n){const e=await ff(n.swRegistration,n.vapidKey),t={vapidKey:n.vapidKey,swScope:n.swRegistration.scope,endpoint:e.endpoint,auth:xe(e.getKey("auth")),p256dh:xe(e.getKey("p256dh"))},s=await rf(n.firebaseDependencies);if(s){if(pf(s.subscriptionOptions,t))return Date.now()>=s.createTime+uf?df(n,{token:s.token,createTime:Date.now(),subscriptionOptions:t}):s.token;try{await cf(n.firebaseDependencies,s.token)}catch(i){console.warn(i)}return uo(n.firebaseDependencies,t)}else return uo(n.firebaseDependencies,t)}async function df(n,e){try{const t=await lf(n.firebaseDependencies,e),s={...e,token:t,createTime:Date.now()};return await sr(n.firebaseDependencies,s),t}catch(t){throw t}}async function uo(n,e){const s={token:await af(n,e),createTime:Date.now(),subscriptionOptions:e};return await sr(n,s),s.token}async function ff(n,e){const t=await n.pushManager.getSubscription();return t||n.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:Xd(e)})}function pf(n,e){const t=e.vapidKey===n.vapidKey,s=e.endpoint===n.endpoint,i=e.auth===n.auth,r=e.p256dh===n.p256dh;return t&&s&&i&&r}/**
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
 */function ho(n){const e={from:n.from,collapseKey:n.collapse_key,messageId:n.fcmMessageId};return gf(e,n),_f(e,n),mf(e,n),e}function gf(n,e){if(!e.notification)return;n.notification={};const t=e.notification.title;t&&(n.notification.title=t);const s=e.notification.body;s&&(n.notification.body=s);const i=e.notification.image;i&&(n.notification.image=i);const r=e.notification.icon;r&&(n.notification.icon=r)}function _f(n,e){e.data&&(n.data=e.data)}function mf(n,e){if(!e.fcmOptions&&!e.notification?.click_action)return;n.fcmOptions={};const t=e.fcmOptions?.link??e.notification?.click_action;t&&(n.fcmOptions.link=t);const s=e.fcmOptions?.analytics_label;s&&(n.fcmOptions.analyticsLabel=s)}/**
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
 */function yf(n){return typeof n=="object"&&!!n&&Cl in n}/**
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
 */function vf(n){if(!n||!n.options)throw ei("App Configuration Object");if(!n.name)throw ei("App Name");const e=["projectId","apiKey","appId","messagingSenderId"],{options:t}=n;for(const s of e)if(!t[s])throw ei(s);return{appName:n.name,projectId:t.projectId,apiKey:t.apiKey,appId:t.appId,senderId:t.messagingSenderId}}function ei(n){return oe.create("missing-app-config-values",{valueName:n})}/**
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
 */class wf{constructor(e,t,s){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const i=vf(e);this.firebaseDependencies={app:e,appConfig:i,installations:t,analyticsProvider:s}}_delete(){return Promise.resolve()}}/**
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
 */async function bf(n){try{n.swRegistration=await navigator.serviceWorker.register(zd,{scope:Kd}),n.swRegistration.update().catch(()=>{}),await Ef(n.swRegistration)}catch(e){throw oe.create("failed-service-worker-registration",{browserErrorMessage:e?.message})}}async function Ef(n){return new Promise((e,t)=>{const s=setTimeout(()=>t(new Error(`Service worker not registered after ${ao} ms`)),ao),i=n.installing||n.waiting;n.active?(clearTimeout(s),e()):i?i.onstatechange=r=>{r.target?.state==="activated"&&(i.onstatechange=null,clearTimeout(s),e())}:(clearTimeout(s),t(new Error("No incoming service worker found.")))})}/**
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
 */async function Sf(n,e){if(!e&&!n.swRegistration&&await bf(n),!(!e&&n.swRegistration)){if(!(e instanceof ServiceWorkerRegistration))throw oe.create("invalid-sw-registration");n.swRegistration=e}}/**
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
 */async function Tf(n,e){e?n.vapidKey=e:n.vapidKey||(n.vapidKey=Il)}/**
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
 */async function Pl(n,e){if(!navigator)throw oe.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw oe.create("permission-blocked");return await Tf(n,e?.vapidKey),await Sf(n,e?.serviceWorkerRegistration),hf(n)}/**
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
 */async function If(n,e,t){const s=Cf(e);(await n.firebaseDependencies.analyticsProvider.get()).logEvent(s,{message_id:t[Cl],message_name:t[Yd],message_time:t[Jd],message_device_time:Math.floor(Date.now()/1e3)})}function Cf(n){switch(n){case vn.NOTIFICATION_CLICKED:return"notification_open";case vn.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kf(n,e){const t=e.data;if(!t.isFirebaseMessaging)return;n.onMessageHandler&&t.messageType===vn.PUSH_RECEIVED&&(typeof n.onMessageHandler=="function"?n.onMessageHandler(ho(t)):n.onMessageHandler.next(ho(t)));const s=t.data;yf(s)&&s[Qd]==="1"&&await If(n,t.messageType,s)}const fo="@firebase/messaging",po="0.12.23";/**
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
 */const Af=n=>{const e=new wf(n.getProvider("app").getImmediate(),n.getProvider("installations-internal").getImmediate(),n.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",t=>kf(e,t)),e},Rf=n=>{const e=n.getProvider("messaging").getImmediate();return{getToken:s=>Pl(e,s)}};function Pf(){Re(new Ie("messaging",Af,"PUBLIC")),Re(new Ie("messaging-internal",Rf,"PRIVATE")),ue(fo,po),ue(fo,po,"esm2020")}/**
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
 */async function Of(){try{await el()}catch{return!1}return typeof window<"u"&&Za()&&Hu()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
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
 */function Nf(n,e){if(!navigator)throw oe.create("only-available-in-window");return n.onMessageHandler=e,()=>{n.onMessageHandler=null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xf(n=Xi()){return Of().then(e=>{if(!e)throw oe.create("unsupported-browser")},e=>{throw oe.create("indexed-db-unsupported")}),On(ke(n),"messaging").getImmediate()}async function or(n,e){return n=ke(n),Pl(n,e)}function Df(n,e){return n=ke(n),Nf(n,e)}Pf();var Lf="firebase",Mf="12.0.0";/**
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
 */ue(Lf,Mf,"app");var go=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ol;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(_,f){function g(){}g.prototype=f.prototype,_.D=f.prototype,_.prototype=new g,_.prototype.constructor=_,_.C=function(m,y,w){for(var p=Array(arguments.length-2),ot=2;ot<arguments.length;ot++)p[ot-2]=arguments[ot];return f.prototype[y].apply(m,p)}}function t(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(s,t),s.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(_,f,g){g||(g=0);var m=Array(16);if(typeof f=="string")for(var y=0;16>y;++y)m[y]=f.charCodeAt(g++)|f.charCodeAt(g++)<<8|f.charCodeAt(g++)<<16|f.charCodeAt(g++)<<24;else for(y=0;16>y;++y)m[y]=f[g++]|f[g++]<<8|f[g++]<<16|f[g++]<<24;f=_.g[0],g=_.g[1],y=_.g[2];var w=_.g[3],p=f+(w^g&(y^w))+m[0]+3614090360&4294967295;f=g+(p<<7&4294967295|p>>>25),p=w+(y^f&(g^y))+m[1]+3905402710&4294967295,w=f+(p<<12&4294967295|p>>>20),p=y+(g^w&(f^g))+m[2]+606105819&4294967295,y=w+(p<<17&4294967295|p>>>15),p=g+(f^y&(w^f))+m[3]+3250441966&4294967295,g=y+(p<<22&4294967295|p>>>10),p=f+(w^g&(y^w))+m[4]+4118548399&4294967295,f=g+(p<<7&4294967295|p>>>25),p=w+(y^f&(g^y))+m[5]+1200080426&4294967295,w=f+(p<<12&4294967295|p>>>20),p=y+(g^w&(f^g))+m[6]+2821735955&4294967295,y=w+(p<<17&4294967295|p>>>15),p=g+(f^y&(w^f))+m[7]+4249261313&4294967295,g=y+(p<<22&4294967295|p>>>10),p=f+(w^g&(y^w))+m[8]+1770035416&4294967295,f=g+(p<<7&4294967295|p>>>25),p=w+(y^f&(g^y))+m[9]+2336552879&4294967295,w=f+(p<<12&4294967295|p>>>20),p=y+(g^w&(f^g))+m[10]+4294925233&4294967295,y=w+(p<<17&4294967295|p>>>15),p=g+(f^y&(w^f))+m[11]+2304563134&4294967295,g=y+(p<<22&4294967295|p>>>10),p=f+(w^g&(y^w))+m[12]+1804603682&4294967295,f=g+(p<<7&4294967295|p>>>25),p=w+(y^f&(g^y))+m[13]+4254626195&4294967295,w=f+(p<<12&4294967295|p>>>20),p=y+(g^w&(f^g))+m[14]+2792965006&4294967295,y=w+(p<<17&4294967295|p>>>15),p=g+(f^y&(w^f))+m[15]+1236535329&4294967295,g=y+(p<<22&4294967295|p>>>10),p=f+(y^w&(g^y))+m[1]+4129170786&4294967295,f=g+(p<<5&4294967295|p>>>27),p=w+(g^y&(f^g))+m[6]+3225465664&4294967295,w=f+(p<<9&4294967295|p>>>23),p=y+(f^g&(w^f))+m[11]+643717713&4294967295,y=w+(p<<14&4294967295|p>>>18),p=g+(w^f&(y^w))+m[0]+3921069994&4294967295,g=y+(p<<20&4294967295|p>>>12),p=f+(y^w&(g^y))+m[5]+3593408605&4294967295,f=g+(p<<5&4294967295|p>>>27),p=w+(g^y&(f^g))+m[10]+38016083&4294967295,w=f+(p<<9&4294967295|p>>>23),p=y+(f^g&(w^f))+m[15]+3634488961&4294967295,y=w+(p<<14&4294967295|p>>>18),p=g+(w^f&(y^w))+m[4]+3889429448&4294967295,g=y+(p<<20&4294967295|p>>>12),p=f+(y^w&(g^y))+m[9]+568446438&4294967295,f=g+(p<<5&4294967295|p>>>27),p=w+(g^y&(f^g))+m[14]+3275163606&4294967295,w=f+(p<<9&4294967295|p>>>23),p=y+(f^g&(w^f))+m[3]+4107603335&4294967295,y=w+(p<<14&4294967295|p>>>18),p=g+(w^f&(y^w))+m[8]+1163531501&4294967295,g=y+(p<<20&4294967295|p>>>12),p=f+(y^w&(g^y))+m[13]+2850285829&4294967295,f=g+(p<<5&4294967295|p>>>27),p=w+(g^y&(f^g))+m[2]+4243563512&4294967295,w=f+(p<<9&4294967295|p>>>23),p=y+(f^g&(w^f))+m[7]+1735328473&4294967295,y=w+(p<<14&4294967295|p>>>18),p=g+(w^f&(y^w))+m[12]+2368359562&4294967295,g=y+(p<<20&4294967295|p>>>12),p=f+(g^y^w)+m[5]+4294588738&4294967295,f=g+(p<<4&4294967295|p>>>28),p=w+(f^g^y)+m[8]+2272392833&4294967295,w=f+(p<<11&4294967295|p>>>21),p=y+(w^f^g)+m[11]+1839030562&4294967295,y=w+(p<<16&4294967295|p>>>16),p=g+(y^w^f)+m[14]+4259657740&4294967295,g=y+(p<<23&4294967295|p>>>9),p=f+(g^y^w)+m[1]+2763975236&4294967295,f=g+(p<<4&4294967295|p>>>28),p=w+(f^g^y)+m[4]+1272893353&4294967295,w=f+(p<<11&4294967295|p>>>21),p=y+(w^f^g)+m[7]+4139469664&4294967295,y=w+(p<<16&4294967295|p>>>16),p=g+(y^w^f)+m[10]+3200236656&4294967295,g=y+(p<<23&4294967295|p>>>9),p=f+(g^y^w)+m[13]+681279174&4294967295,f=g+(p<<4&4294967295|p>>>28),p=w+(f^g^y)+m[0]+3936430074&4294967295,w=f+(p<<11&4294967295|p>>>21),p=y+(w^f^g)+m[3]+3572445317&4294967295,y=w+(p<<16&4294967295|p>>>16),p=g+(y^w^f)+m[6]+76029189&4294967295,g=y+(p<<23&4294967295|p>>>9),p=f+(g^y^w)+m[9]+3654602809&4294967295,f=g+(p<<4&4294967295|p>>>28),p=w+(f^g^y)+m[12]+3873151461&4294967295,w=f+(p<<11&4294967295|p>>>21),p=y+(w^f^g)+m[15]+530742520&4294967295,y=w+(p<<16&4294967295|p>>>16),p=g+(y^w^f)+m[2]+3299628645&4294967295,g=y+(p<<23&4294967295|p>>>9),p=f+(y^(g|~w))+m[0]+4096336452&4294967295,f=g+(p<<6&4294967295|p>>>26),p=w+(g^(f|~y))+m[7]+1126891415&4294967295,w=f+(p<<10&4294967295|p>>>22),p=y+(f^(w|~g))+m[14]+2878612391&4294967295,y=w+(p<<15&4294967295|p>>>17),p=g+(w^(y|~f))+m[5]+4237533241&4294967295,g=y+(p<<21&4294967295|p>>>11),p=f+(y^(g|~w))+m[12]+1700485571&4294967295,f=g+(p<<6&4294967295|p>>>26),p=w+(g^(f|~y))+m[3]+2399980690&4294967295,w=f+(p<<10&4294967295|p>>>22),p=y+(f^(w|~g))+m[10]+4293915773&4294967295,y=w+(p<<15&4294967295|p>>>17),p=g+(w^(y|~f))+m[1]+2240044497&4294967295,g=y+(p<<21&4294967295|p>>>11),p=f+(y^(g|~w))+m[8]+1873313359&4294967295,f=g+(p<<6&4294967295|p>>>26),p=w+(g^(f|~y))+m[15]+4264355552&4294967295,w=f+(p<<10&4294967295|p>>>22),p=y+(f^(w|~g))+m[6]+2734768916&4294967295,y=w+(p<<15&4294967295|p>>>17),p=g+(w^(y|~f))+m[13]+1309151649&4294967295,g=y+(p<<21&4294967295|p>>>11),p=f+(y^(g|~w))+m[4]+4149444226&4294967295,f=g+(p<<6&4294967295|p>>>26),p=w+(g^(f|~y))+m[11]+3174756917&4294967295,w=f+(p<<10&4294967295|p>>>22),p=y+(f^(w|~g))+m[2]+718787259&4294967295,y=w+(p<<15&4294967295|p>>>17),p=g+(w^(y|~f))+m[9]+3951481745&4294967295,_.g[0]=_.g[0]+f&4294967295,_.g[1]=_.g[1]+(y+(p<<21&4294967295|p>>>11))&4294967295,_.g[2]=_.g[2]+y&4294967295,_.g[3]=_.g[3]+w&4294967295}s.prototype.u=function(_,f){f===void 0&&(f=_.length);for(var g=f-this.blockSize,m=this.B,y=this.h,w=0;w<f;){if(y==0)for(;w<=g;)i(this,_,w),w+=this.blockSize;if(typeof _=="string"){for(;w<f;)if(m[y++]=_.charCodeAt(w++),y==this.blockSize){i(this,m),y=0;break}}else for(;w<f;)if(m[y++]=_[w++],y==this.blockSize){i(this,m),y=0;break}}this.h=y,this.o+=f},s.prototype.v=function(){var _=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);_[0]=128;for(var f=1;f<_.length-8;++f)_[f]=0;var g=8*this.o;for(f=_.length-8;f<_.length;++f)_[f]=g&255,g/=256;for(this.u(_),_=Array(16),f=g=0;4>f;++f)for(var m=0;32>m;m+=8)_[g++]=this.g[f]>>>m&255;return _};function r(_,f){var g=a;return Object.prototype.hasOwnProperty.call(g,_)?g[_]:g[_]=f(_)}function o(_,f){this.h=f;for(var g=[],m=!0,y=_.length-1;0<=y;y--){var w=_[y]|0;m&&w==f||(g[y]=w,m=!1)}this.g=g}var a={};function l(_){return-128<=_&&128>_?r(_,function(f){return new o([f|0],0>f?-1:0)}):new o([_|0],0>_?-1:0)}function c(_){if(isNaN(_)||!isFinite(_))return h;if(0>_)return E(c(-_));for(var f=[],g=1,m=0;_>=g;m++)f[m]=_/g|0,g*=4294967296;return new o(f,0)}function u(_,f){if(_.length==0)throw Error("number format error: empty string");if(f=f||10,2>f||36<f)throw Error("radix out of range: "+f);if(_.charAt(0)=="-")return E(u(_.substring(1),f));if(0<=_.indexOf("-"))throw Error('number format error: interior "-" character');for(var g=c(Math.pow(f,8)),m=h,y=0;y<_.length;y+=8){var w=Math.min(8,_.length-y),p=parseInt(_.substring(y,y+w),f);8>w?(w=c(Math.pow(f,w)),m=m.j(w).add(c(p))):(m=m.j(g),m=m.add(c(p)))}return m}var h=l(0),d=l(1),v=l(16777216);n=o.prototype,n.m=function(){if(S(this))return-E(this).m();for(var _=0,f=1,g=0;g<this.g.length;g++){var m=this.i(g);_+=(0<=m?m:4294967296+m)*f,f*=4294967296}return _},n.toString=function(_){if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(b(this))return"0";if(S(this))return"-"+E(this).toString(_);for(var f=c(Math.pow(_,6)),g=this,m="";;){var y=C(g,f).g;g=A(g,y.j(f));var w=((0<g.g.length?g.g[0]:g.h)>>>0).toString(_);if(g=y,b(g))return w+m;for(;6>w.length;)w="0"+w;m=w+m}},n.i=function(_){return 0>_?0:_<this.g.length?this.g[_]:this.h};function b(_){if(_.h!=0)return!1;for(var f=0;f<_.g.length;f++)if(_.g[f]!=0)return!1;return!0}function S(_){return _.h==-1}n.l=function(_){return _=A(this,_),S(_)?-1:b(_)?0:1};function E(_){for(var f=_.g.length,g=[],m=0;m<f;m++)g[m]=~_.g[m];return new o(g,~_.h).add(d)}n.abs=function(){return S(this)?E(this):this},n.add=function(_){for(var f=Math.max(this.g.length,_.g.length),g=[],m=0,y=0;y<=f;y++){var w=m+(this.i(y)&65535)+(_.i(y)&65535),p=(w>>>16)+(this.i(y)>>>16)+(_.i(y)>>>16);m=p>>>16,w&=65535,p&=65535,g[y]=p<<16|w}return new o(g,g[g.length-1]&-2147483648?-1:0)};function A(_,f){return _.add(E(f))}n.j=function(_){if(b(this)||b(_))return h;if(S(this))return S(_)?E(this).j(E(_)):E(E(this).j(_));if(S(_))return E(this.j(E(_)));if(0>this.l(v)&&0>_.l(v))return c(this.m()*_.m());for(var f=this.g.length+_.g.length,g=[],m=0;m<2*f;m++)g[m]=0;for(m=0;m<this.g.length;m++)for(var y=0;y<_.g.length;y++){var w=this.i(m)>>>16,p=this.i(m)&65535,ot=_.i(y)>>>16,zr=_.i(y)&65535;g[2*m+2*y]+=p*zr,F(g,2*m+2*y),g[2*m+2*y+1]+=w*zr,F(g,2*m+2*y+1),g[2*m+2*y+1]+=p*ot,F(g,2*m+2*y+1),g[2*m+2*y+2]+=w*ot,F(g,2*m+2*y+2)}for(m=0;m<f;m++)g[m]=g[2*m+1]<<16|g[2*m];for(m=f;m<2*f;m++)g[m]=0;return new o(g,0)};function F(_,f){for(;(_[f]&65535)!=_[f];)_[f+1]+=_[f]>>>16,_[f]&=65535,f++}function I(_,f){this.g=_,this.h=f}function C(_,f){if(b(f))throw Error("division by zero");if(b(_))return new I(h,h);if(S(_))return f=C(E(_),f),new I(E(f.g),E(f.h));if(S(f))return f=C(_,E(f)),new I(E(f.g),f.h);if(30<_.g.length){if(S(_)||S(f))throw Error("slowDivide_ only works with positive integers.");for(var g=d,m=f;0>=m.l(_);)g=B(g),m=B(m);var y=$(g,1),w=$(m,1);for(m=$(m,2),g=$(g,2);!b(m);){var p=w.add(m);0>=p.l(_)&&(y=y.add(g),w=p),m=$(m,1),g=$(g,1)}return f=A(_,y.j(f)),new I(y,f)}for(y=h;0<=_.l(f);){for(g=Math.max(1,Math.floor(_.m()/f.m())),m=Math.ceil(Math.log(g)/Math.LN2),m=48>=m?1:Math.pow(2,m-48),w=c(g),p=w.j(f);S(p)||0<p.l(_);)g-=m,w=c(g),p=w.j(f);b(w)&&(w=d),y=y.add(w),_=A(_,p)}return new I(y,_)}n.A=function(_){return C(this,_).h},n.and=function(_){for(var f=Math.max(this.g.length,_.g.length),g=[],m=0;m<f;m++)g[m]=this.i(m)&_.i(m);return new o(g,this.h&_.h)},n.or=function(_){for(var f=Math.max(this.g.length,_.g.length),g=[],m=0;m<f;m++)g[m]=this.i(m)|_.i(m);return new o(g,this.h|_.h)},n.xor=function(_){for(var f=Math.max(this.g.length,_.g.length),g=[],m=0;m<f;m++)g[m]=this.i(m)^_.i(m);return new o(g,this.h^_.h)};function B(_){for(var f=_.g.length+1,g=[],m=0;m<f;m++)g[m]=_.i(m)<<1|_.i(m-1)>>>31;return new o(g,_.h)}function $(_,f){var g=f>>5;f%=32;for(var m=_.g.length-g,y=[],w=0;w<m;w++)y[w]=0<f?_.i(w+g)>>>f|_.i(w+g+1)<<32-f:_.i(w+g);return new o(y,_.h)}s.prototype.digest=s.prototype.v,s.prototype.reset=s.prototype.s,s.prototype.update=s.prototype.u,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=c,o.fromString=u,Ol=o}).apply(typeof go<"u"?go:typeof self<"u"?self:typeof window<"u"?window:{});const _o="4.9.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fe{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}fe.UNAUTHENTICATED=new fe(null),fe.GOOGLE_CREDENTIALS=new fe("google-credentials-uid"),fe.FIRST_PARTY=new fe("first-party-uid"),fe.MOCK_USER=new fe("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Rs="12.0.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const es=new Gi("@firebase/firestore");function jf(n,...e){if(es.logLevel<=V.DEBUG){const t=e.map(Nl);es.debug(`Firestore (${Rs}): ${n}`,...t)}}function Ff(n,...e){if(es.logLevel<=V.ERROR){const t=e.map(Nl);es.error(`Firestore (${Rs}): ${n}`,...t)}}function Nl(n){if(typeof n=="string")return n;try{/**
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
 */function mo(n,e,t){let s="Unexpected state";typeof e=="string"?s=e:t=e,xl(n,s,t)}function xl(n,e,t){let s=`FIRESTORE (${Rs}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{s+=" CONTEXT: "+JSON.stringify(t)}catch{s+=" CONTEXT: "+t}throw Ff(s),new Error(s)}function Dl(n,e,t,s){let i="Unexpected state";typeof t=="string"?i=t:s=t,n||xl(e,i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Y="invalid-argument",yo="failed-precondition";class G extends st{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $f{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Uf{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(fe.UNAUTHENTICATED))}shutdown(){}}class Bf{constructor(e){this.auth=null,e.onInit(t=>{this.auth=t})}getToken(){return this.auth?this.auth.getToken().then(e=>e?(Dl(typeof e.accessToken=="string",42297,{t:e}),new $f(e.accessToken,new fe(this.auth.getUid()))):null):Promise.resolve(null)}invalidateToken(){}start(e,t){}shutdown(){}}class Vf{constructor(e,t,s){this.i=e,this.o=t,this.u=s,this.type="FirstParty",this.user=fe.FIRST_PARTY,this.l=new Map}h(){return this.u?this.u():null}get headers(){this.l.set("X-Goog-AuthUser",this.i);const e=this.h();return e&&this.l.set("Authorization",e),this.o&&this.l.set("X-Goog-Iam-Authorization-Token",this.o),this.l}}class Wf{constructor(e,t,s){this.i=e,this.o=t,this.u=s}getToken(){return Promise.resolve(new Vf(this.i,this.o,this.u))}start(e,t){e.enqueueRetryable(()=>t(fe.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class vo{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class qf{constructor(e,t){this.m=t,this.appCheck=null,this.T=null,Ji(e)&&e.settings.appCheckToken&&(this.T=e.settings.appCheckToken),t.onInit(s=>{this.appCheck=s})}getToken(){return this.T?Promise.resolve(new vo(this.T)):this.appCheck?this.appCheck.getToken().then(e=>e?(Dl(typeof e.token=="string",3470,{tokenResult:e}),new vo(e.token)):null):Promise.resolve(null)}invalidateToken(){}start(e,t){}shutdown(){}}const wo="(default)";class ts{constructor(e,t){this.projectId=e,this.database=t||wo}static empty(){return new ts("","")}get isDefaultDatabase(){return this.database===wo}isEqual(e){return e instanceof ts&&e.projectId===this.projectId&&e.database===this.database}}function Ze(n,e){return n<e?-1:n>e?1:0}function Hf(n,e){const t=Math.min(n.length,e.length);for(let s=0;s<t;s++){const i=n.charAt(s),r=e.charAt(s);if(i!==r)return ti(i)===ti(r)?Ze(i,r):ti(i)?1:-1}return Ze(n.length,e.length)}const zf=55296,Kf=57343;function ti(n){const e=n.charCodeAt(0);return e>=zf&&e<=Kf}class De{constructor(e,t,s){t===void 0?t=0:t>e.length&&mo(637,{offset:t,range:e.length}),s===void 0?s=e.length-t:s>e.length-t&&mo(1746,{length:s,range:e.length-t}),this.segments=e,this.offset=t,this.len=s}get length(){return this.len}isEqual(e){return De.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof De?e.forEach(s=>{t.push(s)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,s=this.limit();t<s;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const s=Math.min(e.length,t.length);for(let i=0;i<s;i++){const r=De.compareSegments(e.get(i),t.get(i));if(r!==0)return r}return Ze(e.length,t.length)}static compareSegments(e,t){const s=De.isNumericId(e),i=De.isNumericId(t);return s&&!i?-1:!s&&i?1:s&&i?De.extractNumericId(e).compare(De.extractNumericId(t)):Hf(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Ol.fromString(e.substring(4,e.length-2))}}class ve extends De{construct(e,t,s){return new ve(e,t,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const s of e){if(s.indexOf("//")>=0)throw new G(Y,`Invalid segment (${s}). Paths must not contain // in them.`);t.push(...s.split("/").filter(i=>i.length>0))}return new ve(t)}static emptyPath(){return new ve([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt{constructor(e){this.path=e}static fromPath(e){return new pt(ve.fromString(e))}static fromName(e){return new pt(ve.fromString(e).popFirst(5))}static empty(){return new pt(ve.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ve.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ve.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new pt(new ve(e.slice()))}}function Gf(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}/**
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
 */function Yf(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var bo,j;/**
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
 */(j=bo||(bo={}))[j.OK=0]="OK",j[j.CANCELLED=1]="CANCELLED",j[j.UNKNOWN=2]="UNKNOWN",j[j.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",j[j.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",j[j.NOT_FOUND=5]="NOT_FOUND",j[j.ALREADY_EXISTS=6]="ALREADY_EXISTS",j[j.PERMISSION_DENIED=7]="PERMISSION_DENIED",j[j.UNAUTHENTICATED=16]="UNAUTHENTICATED",j[j.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",j[j.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",j[j.ABORTED=10]="ABORTED",j[j.OUT_OF_RANGE=11]="OUT_OF_RANGE",j[j.UNIMPLEMENTED=12]="UNIMPLEMENTED",j[j.INTERNAL=13]="INTERNAL",j[j.UNAVAILABLE=14]="UNAVAILABLE",j[j.DATA_LOSS=15]="DATA_LOSS";/**
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
 */class Jf extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class bt{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(r){throw typeof DOMException<"u"&&r instanceof DOMException?new Jf("Invalid base64 string: "+r):r}}(e);return new bt(t)}static fromUint8Array(e){const t=function(i){let r="";for(let o=0;o<i.length;++o)r+=String.fromCharCode(i[o]);return r}(e);return new bt(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const s=new Uint8Array(t.length);for(let i=0;i<t.length;i++)s[i]=t.charCodeAt(i);return s}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Ze(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}bt.EMPTY_BYTE_STRING=new bt("");/**
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
 */function ge(n,e){const t={typeString:n};return e&&(t.value=e),t}function Nn(n,e){if(!Gf(n))throw new G(Y,"JSON must be an object");let t;for(const s in e)if(e[s]){const i=e[s].typeString,r="value"in e[s]?{value:e[s].value}:void 0;if(!(s in n)){t=`JSON missing required field: '${s}'`;break}const o=n[s];if(i&&typeof o!==i){t=`JSON field '${s}' must be a ${i}.`;break}if(r!==void 0&&o!==r.value){t=`Expected '${s}' field to equal '${r.value}'`;break}}if(t)throw new G(Y,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eo=-62135596800,So=1e6;class Ae{static now(){return Ae.fromMillis(Date.now())}static fromDate(e){return Ae.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),s=Math.floor((e-1e3*t)*So);return new Ae(t,s)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new G(Y,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new G(Y,"Timestamp nanoseconds out of range: "+t);if(e<Eo)throw new G(Y,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new G(Y,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/So}_compareTo(e){return this.seconds===e.seconds?Ze(this.nanoseconds,e.nanoseconds):Ze(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Ae._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Nn(e,Ae._jsonSchema))return new Ae(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Eo;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Ae._jsonSchemaVersion="firestore/timestamp/1.0",Ae._jsonSchema={type:ge("string",Ae._jsonSchemaVersion),seconds:ge("number"),nanoseconds:ge("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qf{constructor(e,t=null,s=[],i=[],r=null,o="F",a=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=s,this.filters=i,this.limit=r,this.limitType=o,this.startAt=a,this.endAt=l,this.q=null,this.B=null,this.$=null,this.startAt,this.endAt}}/**
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
 */const Xf="ComponentProvider",To=new Map;/**
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
 */const Zf=1048576,ep="firestore.googleapis.com",Io=!0;/**
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
 */class Co{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new G(Y,"Can't provide ssl option if host option is not set");this.host=ep,this.ssl=Io}else this.host=e.host,this.ssl=e.ssl??Io;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Zf)throw new G(Y,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}(function(s,i,r,o){if(i===!0&&o===!0)throw new G(Y,`${s} and ${r} cannot be used together.`)})("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Yf(e.experimentalLongPollingOptions??{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new G(Y,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new G(Y,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new G(Y,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(s,i){return s.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class tp{constructor(e,t,s,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=s,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Co({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new G(yo,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new G(yo,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Co(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(s){if(!s)return new Uf;switch(s.type){case"firstParty":return new Wf(s.sessionIndex||"0",s.iamToken||null,s.authTokenFactory||null);case"provider":return s.client;default:throw new G(Y,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const s=To.get(t);s&&(jf(Xf,"Removing Datastore"),To.delete(t),s.terminate())}(this),Promise.resolve()}}/**
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
 */class ar{constructor(e,t,s){this.converter=t,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new ar(this.firestore,e,this._query)}}class je{constructor(e,t,s){this.converter=t,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new lr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new je(this.firestore,e,this._key)}toJSON(){return{type:je._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,s){if(Nn(t,je._jsonSchema))return new je(e,s||null,new pt(ve.fromString(t.referencePath)))}}je._jsonSchemaVersion="firestore/documentReference/1.0",je._jsonSchema={type:ge("string",je._jsonSchemaVersion),referencePath:ge("string")};class lr extends ar{constructor(e,t,s){super(e,t,function(r){return new Qf(r)}(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new je(this.firestore,null,new pt(e))}withConverter(e){return new lr(this.firestore,e,this._path)}}/**
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
 */class Me{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Me(bt.fromBase64String(e))}catch(t){throw new G(Y,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Me(bt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Me._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Nn(e,Me._jsonSchema))return Me.fromBase64String(e.bytes)}}Me._jsonSchemaVersion="firestore/bytes/1.0",Me._jsonSchema={type:ge("string",Me._jsonSchemaVersion),bytes:ge("string")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new G(Y,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new G(Y,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Ze(this._lat,e._lat)||Ze(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:mt._jsonSchemaVersion}}static fromJSON(e){if(Nn(e,mt._jsonSchema))return new mt(e.latitude,e.longitude)}}mt._jsonSchemaVersion="firestore/geoPoint/1.0",mt._jsonSchema={type:ge("string",mt._jsonSchemaVersion),latitude:ge("number"),longitude:ge("number")};/**
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
 */class yt{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(s,i){if(s.length!==i.length)return!1;for(let r=0;r<s.length;++r)if(s[r]!==i[r])return!1;return!0}(this._values,e._values)}toJSON(){return{type:yt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Nn(e,yt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new yt(e.vectorValues);throw new G(Y,"Expected 'vectorValues' field to be a number array")}}}yt._jsonSchemaVersion="firestore/vectorValue/1.0",yt._jsonSchema={type:ge("string",yt._jsonSchemaVersion),vectorValues:ge("object")};(function(){(function(t){Rs=t})(`${Qi}_lite`),Re(new Ie("firestore/lite",(e,{instanceIdentifier:t,options:s})=>{const i=e.getProvider("app").getImmediate(),r=new tp(new Bf(e.getProvider("auth-internal")),new qf(i,e.getProvider("app-check-internal")),function(a,l){if(!Object.prototype.hasOwnProperty.apply(a.options,["projectId"]))throw new G(Y,'"projectId" not provided in firebase.initializeApp.');return new ts(a.options.projectId,l)}(i,t),i);return s&&r._setSettings(s),r},"PUBLIC").setMultipleInstances(!0)),ue("firestore-lite",_o,""),ue("firestore-lite",_o,"esm2020")})();var ko={};const Ao="@firebase/database",Ro="1.1.0";/**
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
 */let Ll="";function np(n){Ll=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sp{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),J(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:mn(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ip{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return We(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ml=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new sp(e)}}catch{}return new ip},gt=Ml("localStorage"),rp=Ml("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bt=new Gi("@firebase/database"),op=function(){let n=1;return function(){return n++}}(),jl=function(n){const e=Zu(n),t=new Xu;t.update(e);const s=t.digest();return zi.encodeByteArray(s)},xn=function(...n){let e="";for(let t=0;t<n.length;t++){const s=n[t];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=xn.apply(null,s):typeof s=="object"?e+=J(s):e+=s,e+=" "}return e};let un=null,Po=!0;const ap=function(n,e){T(!0,"Can't turn on custom loggers persistently."),Bt.logLevel=V.VERBOSE,un=Bt.log.bind(Bt)},re=function(...n){if(Po===!0&&(Po=!1,un===null&&rp.get("logging_enabled")===!0&&ap()),un){const e=xn.apply(null,n);un(e)}},Dn=function(n){return function(...e){re(n,...e)}},Ii=function(...n){const e="FIREBASE INTERNAL ERROR: "+xn(...n);Bt.error(e)},Ve=function(...n){const e=`FIREBASE FATAL ERROR: ${xn(...n)}`;throw Bt.error(e),new Error(e)},he=function(...n){const e="FIREBASE WARNING: "+xn(...n);Bt.warn(e)},lp=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&he("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Fl=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},cp=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},qt="[MIN_NAME]",Et="[MAX_NAME]",Jt=function(n,e){if(n===e)return 0;if(n===qt||e===Et)return-1;if(e===qt||n===Et)return 1;{const t=Oo(n),s=Oo(e);return t!==null?s!==null?t-s===0?n.length-e.length:t-s:-1:s!==null?1:n<e?-1:1}},up=function(n,e){return n===e?0:n<e?-1:1},en=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+J(e))},cr=function(n){if(typeof n!="object"||n===null)return J(n);const e=[];for(const s in n)e.push(s);e.sort();let t="{";for(let s=0;s<e.length;s++)s!==0&&(t+=","),t+=J(e[s]),t+=":",t+=cr(n[e[s]]);return t+="}",t},$l=function(n,e){const t=n.length;if(t<=e)return[n];const s=[];for(let i=0;i<t;i+=e)i+e>t?s.push(n.substring(i,t)):s.push(n.substring(i,i+e));return s};function de(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const Ul=function(n){T(!Fl(n),"Invalid JSON number");const e=11,t=52,s=(1<<e-1)-1;let i,r,o,a,l;n===0?(r=0,o=0,i=1/n===-1/0?1:0):(i=n<0,n=Math.abs(n),n>=Math.pow(2,1-s)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),s),r=a+s,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-s-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(i?1:0),c.reverse();const u=c.join("");let h="";for(l=0;l<64;l+=8){let d=parseInt(u.substr(l,8),2).toString(16);d.length===1&&(d="0"+d),h=h+d}return h.toLowerCase()},hp=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},dp=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function fp(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const s=new Error(n+" at "+e._path.toString()+": "+t);return s.code=n.toUpperCase(),s}const pp=new RegExp("^-?(0*)\\d{1,10}$"),gp=-2147483648,_p=2147483647,Oo=function(n){if(pp.test(n)){const e=Number(n);if(e>=gp&&e<=_p)return e}return null},Qt=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw he("Exception was thrown by user callback.",t),e},Math.floor(0))}},mp=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},hn=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
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
 */class yp{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,Ji(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t?.getImmediate({optional:!0}),this.appCheck||t?.get().then(s=>this.appCheck=s)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,s):t(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(t=>t.addTokenListener(e))}notifyForInvalidToken(){he(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vp{constructor(e,t,s){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(re("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,s):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',he(e)}}class Gn{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Gn.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ur="5",Bl="v",Vl="s",Wl="r",ql="f",Hl=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,zl="ls",Kl="p",Ci="ac",Gl="websocket",Yl="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jl{constructor(e,t,s,i,r=!1,o="",a=!1,l=!1,c=null){this.secure=t,this.namespace=s,this.webSocketOnly=i,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=gt.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&gt.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function wp(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Ql(n,e,t){T(typeof e=="string","typeof type must == string"),T(typeof t=="object","typeof params must == object");let s;if(e===Gl)s=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===Yl)s=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);wp(n)&&(t.ns=n.namespace);const i=[];return de(t,(r,o)=>{i.push(r+"="+o)}),s+i.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bp{constructor(){this.counters_={}}incrementCounter(e,t=1){We(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return xu(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ni={},si={};function hr(n){const e=n.toString();return ni[e]||(ni[e]=new bp),ni[e]}function Ep(n,e){const t=n.toString();return si[t]||(si[t]=e()),si[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sp{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<s.length;++i)s[i]&&Qt(()=>{this.onMessage_(s[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const No="start",Tp="close",Ip="pLPCommand",Cp="pRTLPCB",Xl="id",Zl="pw",ec="ser",kp="cb",Ap="seg",Rp="ts",Pp="d",Op="dframe",tc=1870,nc=30,Np=tc-nc,xp=25e3,Dp=3e4;class Ut{constructor(e,t,s,i,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Dn(e),this.stats_=hr(t),this.urlFn=l=>(this.appCheckToken&&(l[Ci]=this.appCheckToken),Ql(t,Yl,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new Sp(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Dp)),cp(()=>{if(this.isClosed_)return;this.scriptTagHolder=new dr((...r)=>{const[o,a,l,c,u]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===No)this.id=a,this.password=l;else if(o===Tp)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const s={};s[No]="t",s[ec]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[kp]=this.scriptTagHolder.uniqueCallbackIdentifier),s[Bl]=ur,this.transportSessionId&&(s[Vl]=this.transportSessionId),this.lastSessionId&&(s[zl]=this.lastSessionId),this.applicationId&&(s[Kl]=this.applicationId),this.appCheckToken&&(s[Ci]=this.appCheckToken),typeof location<"u"&&location.hostname&&Hl.test(location.hostname)&&(s[Wl]=ql);const i=this.urlFn(s);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Ut.forceAllow_=!0}static forceDisallow(){Ut.forceDisallow_=!0}static isAvailable(){return Ut.forceAllow_?!0:!Ut.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!hp()&&!dp()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=J(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const s=qa(t),i=$l(s,Np);for(let r=0;r<i.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const s={};s[Op]="t",s[Xl]=e,s[Zl]=t,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=J(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class dr{constructor(e,t,s,i){this.onDisconnect=s,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=op(),window[Ip+this.uniqueCallbackIdentifier]=e,window[Cp+this.uniqueCallbackIdentifier]=t,this.myIFrame=dr.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){re("frame writing exception"),a.stack&&re(a.stack),re(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||re("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Xl]=this.myID,e[Zl]=this.myPW,e[ec]=this.currentSerial;let t=this.urlFn(e),s="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+nc+s.length<=tc;){const o=this.pendingSegs.shift();s=s+"&"+Ap+i+"="+o.seg+"&"+Rp+i+"="+o.ts+"&"+Pp+i+"="+o.d,i++}return t=t+s,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,s){this.pendingSegs.push({seg:e,ts:t,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const s=()=>{this.outstandingRequests.delete(t),this.newRequest_()},i=setTimeout(s,Math.floor(xp)),r=()=>{clearTimeout(i),s()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const i=s.readyState;(!i||i==="loaded"||i==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),t())},s.onerror=()=>{re("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lp=16384,Mp=45e3;let ns=null;typeof MozWebSocket<"u"?ns=MozWebSocket:typeof WebSocket<"u"&&(ns=WebSocket);class we{constructor(e,t,s,i,r,o,a){this.connId=e,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Dn(this.connId),this.stats_=hr(t),this.connURL=we.connectionURL_(t,o,a,i,s),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,s,i,r){const o={};return o[Bl]=ur,typeof location<"u"&&location.hostname&&Hl.test(location.hostname)&&(o[Wl]=ql),t&&(o[Vl]=t),s&&(o[zl]=s),i&&(o[Ci]=i),r&&(o[Kl]=r),Ql(e,Gl,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,gt.set("previous_websocket_failure",!0);try{let s;qu(),this.mySock=new ns(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){we.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(t);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&ns!==null&&!we.forceDisallow_}static previouslyFailed(){return gt.isInMemoryStorage||gt.get("previous_websocket_failure")===!0}markConnectionHealthy(){gt.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const s=mn(t);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(T(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const s=this.extractFrameCount_(t);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const t=J(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const s=$l(t,Lp);s.length>1&&this.sendString_(String(s.length));for(let i=0;i<s.length;i++)this.sendString_(s[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Mp))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}we.responsesRequiredToBeHealthy=2;we.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bn{static get ALL_TRANSPORTS(){return[Ut,we]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=we&&we.isAvailable();let s=t&&!we.previouslyFailed();if(e.webSocketOnly&&(t||he("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[we];else{const i=this.transports_=[];for(const r of bn.ALL_TRANSPORTS)r&&r.isAvailable()&&i.push(r);bn.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}bn.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jp=6e4,Fp=5e3,$p=10*1024,Up=100*1024,ii="t",xo="d",Bp="s",Do="r",Vp="e",Lo="o",Mo="a",jo="n",Fo="p",Wp="h";class qp{constructor(e,t,s,i,r,o,a,l,c,u){this.id=e,this.repoInfo_=t,this.applicationId_=s,this.appCheckToken_=i,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Dn("c:"+this.id+":"),this.transportManager_=new bn(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,s)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=hn(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Up?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>$p?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(ii in e){const t=e[ii];t===Mo?this.upgradeIfSecondaryHealthy_():t===Do?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===Lo&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=en("t",e),s=en("d",e);if(t==="c")this.onSecondaryControl_(s);else if(t==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Fo,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Mo,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:jo,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=en("t",e),s=en("d",e);t==="c"?this.onControl_(s):t==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=en(ii,e);if(xo in e){const s=e[xo];if(t===Wp){const i={...s};this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(t===jo){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===Bp?this.onConnectionShutdown_(s):t===Do?this.onReset_(s):t===Vp?Ii("Server Error: "+s):t===Lo?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Ii("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,s=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),ur!==s&&he("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,s),hn(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(jp))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):hn(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Fp))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Fo,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(gt.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sc{put(e,t,s,i){}merge(e,t,s,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,s){}onDisconnectMerge(e,t,s){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ic{constructor(e){this.allowedEvents_=e,this.listeners_={},T(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let i=0;i<s.length;i++)s[i].callback.apply(s[i].context,t)}}on(e,t,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:s});const i=this.getInitialEvent(e);i&&t.apply(s,i)}off(e,t,s){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let r=0;r<i.length;r++)if(i[r].callback===t&&(!s||s===i[r].context)){i.splice(r,1);return}}validateEventType_(e){T(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ss extends ic{static getInstance(){return new ss}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Xa()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return T(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $o=32,Uo=768;class W{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let s=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[s]=this.pieces_[i],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function U(){return new W("")}function O(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function et(n){return n.pieces_.length-n.pieceNum_}function H(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new W(n.pieces_,e)}function rc(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function Hp(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function oc(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function ac(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new W(e,0)}function Q(n,e){const t=[];for(let s=n.pieceNum_;s<n.pieces_.length;s++)t.push(n.pieces_[s]);if(e instanceof W)for(let s=e.pieceNum_;s<e.pieces_.length;s++)t.push(e.pieces_[s]);else{const s=e.split("/");for(let i=0;i<s.length;i++)s[i].length>0&&t.push(s[i])}return new W(t,0)}function D(n){return n.pieceNum_>=n.pieces_.length}function ae(n,e){const t=O(n),s=O(e);if(t===null)return e;if(t===s)return ae(H(n),H(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function fr(n,e){if(et(n)!==et(e))return!1;for(let t=n.pieceNum_,s=e.pieceNum_;t<=n.pieces_.length;t++,s++)if(n.pieces_[t]!==e.pieces_[s])return!1;return!0}function be(n,e){let t=n.pieceNum_,s=e.pieceNum_;if(et(n)>et(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[s])return!1;++t,++s}return!0}class zp{constructor(e,t){this.errorPrefix_=t,this.parts_=oc(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=Is(this.parts_[s]);lc(this)}}function Kp(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=Is(e),lc(n)}function Gp(n){const e=n.parts_.pop();n.byteLength_-=Is(e),n.parts_.length>0&&(n.byteLength_-=1)}function lc(n){if(n.byteLength_>Uo)throw new Error(n.errorPrefix_+"has a key path longer than "+Uo+" bytes ("+n.byteLength_+").");if(n.parts_.length>$o)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+$o+") or object contains a cycle "+ut(n))}function ut(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pr extends ic{static getInstance(){return new pr}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}getInitialEvent(e){return T(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tn=1e3,Yp=300*1e3,Bo=30*1e3,Jp=1.3,Qp=3e4,Xp="server_kill",Vo=3;class Ue extends sc{constructor(e,t,s,i,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=s,this.onConnectStatus_=i,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=Ue.nextPersistentConnectionId_++,this.log_=Dn("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=tn,this.maxReconnectDelay_=Yp,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");pr.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&ss.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,s){const i=++this.requestNumber_,r={r:i,a:e,b:t};this.log_(J(r)),T(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),s&&(this.requestCBHash_[i]=s)}get(e){this.initConnection_();const t=new Es,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,s,i){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),T(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),T(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:i,hashFn:t,query:e,tag:s};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(s)})}sendListen_(e){const t=e.query,s=t._path.toString(),i=t._queryIdentifier;this.log_("Listen on "+s+" for "+i);const r={p:s},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;Ue.warnOnListenWarnings_(l,t),(this.listens.get(s)&&this.listens.get(s).get(i))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(s,i),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&We(e,"w")){const s=Wt(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const i='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();he(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Ju(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Bo)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=Yu(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(t,s,i=>{const r=i.s,o=i.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,s=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,s)})}unlisten(e,t){const s=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+i),T(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,i)&&this.connected_&&this.sendUnlisten_(s,i,e._queryObject,t)}sendUnlisten_(e,t,s,i){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";i&&(r.q=s,r.t=i),this.sendRequest(o,r)}onDisconnectPut(e,t,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:s})}onDisconnectMerge(e,t,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:s})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,s,i){const r={p:t,d:s};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,t,s,i){this.putInternal("p",e,t,s,i)}merge(e,t,s,i){this.putInternal("m",e,t,s,i)}putInternal(e,t,s,i,r){this.initConnection_();const o={p:t,d:s};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,s,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,s=>{if(s.s!=="ok"){const r=s.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+J(e));const t=e.r,s=this.requestCBHash_[t];s&&(delete this.requestCBHash_[t],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):Ii("Unrecognized action received from server: "+J(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){T(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=tn,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=tn,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Qp&&(this.reconnectDelay_=tn),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Jp)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+Ue.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,s())},c=function(h){T(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(h)};this.realtime_={close:l,sendRequest:c};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[h,d]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?re("getToken() completed but was canceled"):(re("getToken() completed. Creating connection."),this.authToken_=h&&h.accessToken,this.appCheckToken_=d&&d.token,a=new qp(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,s,v=>{he(v+" ("+this.repoInfo_.toString()+")"),this.interrupt(Xp)},r))}catch(h){this.log_("Failed to get token: "+h),o||(this.repoInfo_.nodeAdmin&&he(h),l())}}}interrupt(e){re("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){re("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Yr(this.interruptReasons_)&&(this.reconnectDelay_=tn,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let s;t?s=t.map(r=>cr(r)).join("$"):s="default";const i=this.removeListen_(e,s);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,t){const s=new W(e).toString();let i;if(this.listens.has(s)){const r=this.listens.get(s);i=r.get(t),r.delete(t),r.size===0&&this.listens.delete(s)}else i=void 0;return i}onAuthRevoked_(e,t){re("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Vo&&(this.reconnectDelay_=Bo,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){re("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Vo&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+Ll.replace(/\./g,"-")]=1,Xa()?e["framework.cordova"]=1:Wu()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=ss.getInstance().currentlyOnline();return Yr(this.interruptReasons_)&&e}}Ue.nextPersistentConnectionId_=0;Ue.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new N(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ps{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const s=new N(qt,e),i=new N(qt,t);return this.compare(s,i)!==0}minPost(){return N.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Bn;class cc extends Ps{static get __EMPTY_NODE(){return Bn}static set __EMPTY_NODE(e){Bn=e}compare(e,t){return Jt(e.name,t.name)}isDefinedOn(e){throw Yt("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return N.MIN}maxPost(){return new N(Et,Bn)}makePost(e,t){return T(typeof e=="string","KeyIndex indexValue must always be a string."),new N(e,Bn)}toString(){return".key"}}const Vt=new cc;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vn{constructor(e,t,s,i,r=null){this.isReverse_=i,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?s(e.key,t):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class te{constructor(e,t,s,i,r){this.key=e,this.value=t,this.color=s??te.RED,this.left=i??ce.EMPTY_NODE,this.right=r??ce.EMPTY_NODE}copy(e,t,s,i,r){return new te(e??this.key,t??this.value,s??this.color,i??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,s){let i=this;const r=s(e,i.key);return r<0?i=i.copy(null,null,null,i.left.insert(e,t,s),null):r===0?i=i.copy(null,t,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,t,s)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return ce.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let s,i;if(s=this,t(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),t(e,s.key)===0){if(s.right.isEmpty())return ce.EMPTY_NODE;i=s.right.min_(),s=s.copy(i.key,i.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,te.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,te.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}te.RED=!0;te.BLACK=!1;class Zp{copy(e,t,s,i,r){return this}insert(e,t,s){return new te(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class ce{constructor(e,t=ce.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new ce(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,te.BLACK,null,null))}remove(e){return new ce(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,te.BLACK,null,null))}get(e){let t,s=this.root_;for(;!s.isEmpty();){if(t=this.comparator_(e,s.key),t===0)return s.value;t<0?s=s.left:t>0&&(s=s.right)}return null}getPredecessorKey(e){let t,s=this.root_,i=null;for(;!s.isEmpty();)if(t=this.comparator_(e,s.key),t===0){if(s.left.isEmpty())return i?i.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else t<0?s=s.left:t>0&&(i=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Vn(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new Vn(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new Vn(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new Vn(this.root_,null,this.comparator_,!0,e)}}ce.EMPTY_NODE=new Zp;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eg(n,e){return Jt(n.name,e.name)}function gr(n,e){return Jt(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ki;function tg(n){ki=n}const uc=function(n){return typeof n=="number"?"number:"+Ul(n):"string:"+n},hc=function(n){if(n.isLeafNode()){const e=n.val();T(typeof e=="string"||typeof e=="number"||typeof e=="object"&&We(e,".sv"),"Priority must be a string or number.")}else T(n===ki||n.isEmpty(),"priority of unexpected type.");T(n===ki||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Wo;class ee{static set __childrenNodeConstructor(e){Wo=e}static get __childrenNodeConstructor(){return Wo}constructor(e,t=ee.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,T(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),hc(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new ee(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:ee.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return D(e)?this:O(e)===".priority"?this.priorityNode_:ee.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:ee.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const s=O(e);return s===null?t:t.isEmpty()&&s!==".priority"?this:(T(s!==".priority"||et(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,ee.__childrenNodeConstructor.EMPTY_NODE.updateChild(H(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+uc(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=Ul(this.value_):e+=this.value_,this.lazyHash_=jl(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===ee.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof ee.__childrenNodeConstructor?-1:(T(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,s=typeof this.value_,i=ee.VALUE_TYPE_ORDER.indexOf(t),r=ee.VALUE_TYPE_ORDER.indexOf(s);return T(i>=0,"Unknown leaf type: "+t),T(r>=0,"Unknown leaf type: "+s),i===r?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}ee.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let dc,fc;function ng(n){dc=n}function sg(n){fc=n}class ig extends Ps{compare(e,t){const s=e.node.getPriority(),i=t.node.getPriority(),r=s.compareTo(i);return r===0?Jt(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return N.MIN}maxPost(){return new N(Et,new ee("[PRIORITY-POST]",fc))}makePost(e,t){const s=dc(e);return new N(t,new ee("[PRIORITY-POST]",s))}toString(){return".priority"}}const K=new ig;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rg=Math.log(2);class og{constructor(e){const t=r=>parseInt(Math.log(r)/rg,10),s=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const i=s(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const is=function(n,e,t,s){n.sort(e);const i=function(l,c){const u=c-l;let h,d;if(u===0)return null;if(u===1)return h=n[l],d=t?t(h):h,new te(d,h.node,te.BLACK,null,null);{const v=parseInt(u/2,10)+l,b=i(l,v),S=i(v+1,c);return h=n[v],d=t?t(h):h,new te(d,h.node,te.BLACK,b,S)}},r=function(l){let c=null,u=null,h=n.length;const d=function(b,S){const E=h-b,A=h;h-=b;const F=i(E+1,A),I=n[E],C=t?t(I):I;v(new te(C,I.node,S,null,F))},v=function(b){c?(c.left=b,c=b):(u=b,c=b)};for(let b=0;b<l.count;++b){const S=l.nextBitIsOne(),E=Math.pow(2,l.count-(b+1));S?d(E,te.BLACK):(d(E,te.BLACK),d(E,te.RED))}return u},o=new og(n.length),a=r(o);return new ce(s||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ri;const kt={};class Fe{static get Default(){return T(kt&&K,"ChildrenNode.ts has not been loaded"),ri=ri||new Fe({".priority":kt},{".priority":K}),ri}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=Wt(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof ce?t:null}hasIndex(e){return We(this.indexSet_,e.toString())}addIndex(e,t){T(e!==Vt,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let i=!1;const r=t.getIterator(N.Wrap);let o=r.getNext();for(;o;)i=i||e.isDefinedOn(o.node),s.push(o),o=r.getNext();let a;i?a=is(s,e.getCompare()):a=kt;const l=e.toString(),c={...this.indexSet_};c[l]=e;const u={...this.indexes_};return u[l]=a,new Fe(u,c)}addToIndexes(e,t){const s=Jn(this.indexes_,(i,r)=>{const o=Wt(this.indexSet_,r);if(T(o,"Missing index implementation for "+r),i===kt)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator(N.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),is(a,o.getCompare())}else return kt;else{const a=t.get(e.name);let l=i;return a&&(l=l.remove(new N(e.name,a))),l.insert(e,e.node)}});return new Fe(s,this.indexSet_)}removeFromIndexes(e,t){const s=Jn(this.indexes_,i=>{if(i===kt)return i;{const r=t.get(e.name);return r?i.remove(new N(e.name,r)):i}});return new Fe(s,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nn;class k{static get EMPTY_NODE(){return nn||(nn=new k(new ce(gr),null,Fe.Default))}constructor(e,t,s){this.children_=e,this.priorityNode_=t,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&hc(this.priorityNode_),this.children_.isEmpty()&&T(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||nn}updatePriority(e){return this.children_.isEmpty()?this:new k(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?nn:t}}getChild(e){const t=O(e);return t===null?this:this.getImmediateChild(t).getChild(H(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(T(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const s=new N(e,t);let i,r;t.isEmpty()?(i=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(s,this.children_)):(i=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(s,this.children_));const o=i.isEmpty()?nn:this.priorityNode_;return new k(i,o,r)}}updateChild(e,t){const s=O(e);if(s===null)return t;{T(O(e)!==".priority"||et(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(s).updateChild(H(e),t);return this.updateImmediateChild(s,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let s=0,i=0,r=!0;if(this.forEachChild(K,(o,a)=>{t[o]=a.val(e),s++,r&&k.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):r=!1}),!e&&r&&i<2*s){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+uc(this.getPriority().val())+":"),this.forEachChild(K,(t,s)=>{const i=s.hash();i!==""&&(e+=":"+t+":"+i)}),this.lazyHash_=e===""?"":jl(e)}return this.lazyHash_}getPredecessorChildName(e,t,s){const i=this.resolveIndex_(s);if(i){const r=i.getPredecessorKey(new N(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const s=t.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new N(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const s=t.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new N(t,this.children_.get(t)):null}forEachChild(e,t){const s=this.resolveIndex_(e);return s?s.inorderTraversal(i=>t(i.name,i.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const s=this.resolveIndex_(t);if(s)return s.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,N.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)<0;)i.getNext(),r=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const s=this.resolveIndex_(t);if(s)return s.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,N.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)>0;)i.getNext(),r=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Ln?-1:0}withIndex(e){if(e===Vt||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new k(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===Vt||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const s=this.getIterator(K),i=t.getIterator(K);let r=s.getNext(),o=i.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=s.getNext(),o=i.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Vt?null:this.indexMap_.get(e.toString())}}k.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class ag extends k{constructor(){super(new ce(gr),k.EMPTY_NODE,Fe.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return k.EMPTY_NODE}isEmpty(){return!1}}const Ln=new ag;Object.defineProperties(N,{MIN:{value:new N(qt,k.EMPTY_NODE)},MAX:{value:new N(Et,Ln)}});cc.__EMPTY_NODE=k.EMPTY_NODE;ee.__childrenNodeConstructor=k;tg(Ln);sg(Ln);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lg=!0;function ne(n,e=null){if(n===null)return k.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),T(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new ee(t,ne(e))}if(!(n instanceof Array)&&lg){const t=[];let s=!1;if(de(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=ne(a);l.isEmpty()||(s=s||!l.getPriority().isEmpty(),t.push(new N(o,l)))}}),t.length===0)return k.EMPTY_NODE;const r=is(t,eg,o=>o.name,gr);if(s){const o=is(t,K.getCompare());return new k(r,ne(e),new Fe({".priority":o},{".priority":K}))}else return new k(r,ne(e),Fe.Default)}else{let t=k.EMPTY_NODE;return de(n,(s,i)=>{if(We(n,s)&&s.substring(0,1)!=="."){const r=ne(i);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(s,r))}}),t.updatePriority(ne(e))}}ng(ne);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cg extends Ps{constructor(e){super(),this.indexPath_=e,T(!D(e)&&O(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const s=this.extractChild(e.node),i=this.extractChild(t.node),r=s.compareTo(i);return r===0?Jt(e.name,t.name):r}makePost(e,t){const s=ne(e),i=k.EMPTY_NODE.updateChild(this.indexPath_,s);return new N(t,i)}maxPost(){const e=k.EMPTY_NODE.updateChild(this.indexPath_,Ln);return new N(Et,e)}toString(){return oc(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ug extends Ps{compare(e,t){const s=e.node.compareTo(t.node);return s===0?Jt(e.name,t.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return N.MIN}maxPost(){return N.MAX}makePost(e,t){const s=ne(e);return new N(t,s)}toString(){return".value"}}const hg=new ug;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pc(n){return{type:"value",snapshotNode:n}}function Ht(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function En(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function Sn(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function dg(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _r{constructor(e){this.index_=e}updateChild(e,t,s,i,r,o){T(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(i).equals(s.getChild(i))&&a.isEmpty()===s.isEmpty()||(o!=null&&(s.isEmpty()?e.hasChild(t)?o.trackChildChange(En(t,a)):T(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Ht(t,s)):o.trackChildChange(Sn(t,s,a))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(t,s).withIndex(this.index_)}updateFullNode(e,t,s){return s!=null&&(e.isLeafNode()||e.forEachChild(K,(i,r)=>{t.hasChild(i)||s.trackChildChange(En(i,r))}),t.isLeafNode()||t.forEachChild(K,(i,r)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(r)||s.trackChildChange(Sn(i,r,o))}else s.trackChildChange(Ht(i,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?k.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tn{constructor(e){this.indexedFilter_=new _r(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Tn.getStartPost_(e),this.endPost_=Tn.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&s}updateChild(e,t,s,i,r,o){return this.matches(new N(t,s))||(s=k.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,s,i,r,o)}updateFullNode(e,t,s){t.isLeafNode()&&(t=k.EMPTY_NODE);let i=t.withIndex(this.index_);i=i.updatePriority(k.EMPTY_NODE);const r=this;return t.forEachChild(K,(o,a)=>{r.matches(new N(o,a))||(i=i.updateImmediateChild(o,k.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,s)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fg{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=t=>{const s=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new Tn(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,s,i,r,o){return this.rangedFilter_.matches(new N(t,s))||(s=k.EMPTY_NODE),e.getImmediateChild(t).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,s,i,r,o):this.fullLimitUpdateChild_(e,t,s,r,o)}updateFullNode(e,t,s){let i;if(t.isLeafNode()||t.isEmpty())i=k.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){i=k.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))i=i.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{i=t.withIndex(this.index_),i=i.updatePriority(k.EMPTY_NODE);let r;this.reverse_?r=i.getReverseIterator(this.index_):r=i.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:i=i.updateImmediateChild(a.name,k.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,s)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,s,i,r){let o;if(this.reverse_){const h=this.index_.getCompare();o=(d,v)=>h(v,d)}else o=this.index_.getCompare();const a=e;T(a.numChildren()===this.limit_,"");const l=new N(t,s),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(l);if(a.hasChild(t)){const h=a.getImmediateChild(t);let d=i.getChildAfterChild(this.index_,c,this.reverse_);for(;d!=null&&(d.name===t||a.hasChild(d.name));)d=i.getChildAfterChild(this.index_,d,this.reverse_);const v=d==null?1:o(d,l);if(u&&!s.isEmpty()&&v>=0)return r?.trackChildChange(Sn(t,s,h)),a.updateImmediateChild(t,s);{r?.trackChildChange(En(t,h));const S=a.updateImmediateChild(t,k.EMPTY_NODE);return d!=null&&this.rangedFilter_.matches(d)?(r?.trackChildChange(Ht(d.name,d.node)),S.updateImmediateChild(d.name,d.node)):S}}else return s.isEmpty()?e:u&&o(c,l)>=0?(r!=null&&(r.trackChildChange(En(c.name,c.node)),r.trackChildChange(Ht(t,s))),a.updateImmediateChild(t,s).updateImmediateChild(c.name,k.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mr{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=K}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return T(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return T(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:qt}hasEnd(){return this.endSet_}getIndexEndValue(){return T(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return T(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Et}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return T(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===K}copy(){const e=new mr;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function pg(n){return n.loadsAllData()?new _r(n.getIndex()):n.hasLimit()?new fg(n):new Tn(n)}function qo(n){const e={};if(n.isDefault())return e;let t;if(n.index_===K?t="$priority":n.index_===hg?t="$value":n.index_===Vt?t="$key":(T(n.index_ instanceof cg,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=J(t),n.startSet_){const s=n.startAfterSet_?"startAfter":"startAt";e[s]=J(n.indexStartValue_),n.startNameSet_&&(e[s]+=","+J(n.indexStartName_))}if(n.endSet_){const s=n.endBeforeSet_?"endBefore":"endAt";e[s]=J(n.indexEndValue_),n.endNameSet_&&(e[s]+=","+J(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Ho(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==K&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rs extends sc{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(T(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,s,i){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=s,this.appCheckTokenProvider_=i,this.log_=Dn("p:rest:"),this.listens_={}}listen(e,t,s,i){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=rs.getListenId_(e,s),a={};this.listens_[o]=a;const l=qo(e._queryParams);this.restRequest_(r+".json",l,(c,u)=>{let h=u;if(c===404&&(h=null,c=null),c===null&&this.onDataUpdate_(r,h,!1,s),Wt(this.listens_,o)===a){let d;c?c===401?d="permission_denied":d="rest_error:"+c:d="ok",i(d,null)}})}unlisten(e,t){const s=rs.getListenId_(e,t);delete this.listens_[s]}get(e){const t=qo(e._queryParams),s=e._path.toString(),i=new Es;return this.restRequest_(s+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(s,a,!1,null),i.resolve(a)):i.reject(new Error(a))}),i.promise}refreshAuthToken(e){}restRequest_(e,t={},s){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,r])=>{i&&i.accessToken&&(t.auth=i.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Qu(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(s&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=mn(a.responseText)}catch{he("Failed to parse JSON response for "+o+": "+a.responseText)}s(null,l)}else a.status!==401&&a.status!==404&&he("Got unsuccessful REST response for "+o+" Status: "+a.status),s(a.status);s=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gg{constructor(){this.rootNode_=k.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function os(){return{value:null,children:new Map}}function gc(n,e,t){if(D(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const s=O(e);n.children.has(s)||n.children.set(s,os());const i=n.children.get(s);e=H(e),gc(i,e,t)}}function Ai(n,e,t){n.value!==null?t(e,n.value):_g(n,(s,i)=>{const r=new W(e.toString()+"/"+s);Ai(i,r,t)})}function _g(n,e){n.children.forEach((t,s)=>{e(s,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mg{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&de(this.last_,(s,i)=>{t[s]=t[s]-i}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zo=10*1e3,yg=30*1e3,vg=300*1e3;class wg{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new mg(e);const s=zo+(yg-zo)*Math.random();hn(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),t={};let s=!1;de(e,(i,r)=>{r>0&&We(this.statsToReport_,i)&&(t[i]=r,s=!0)}),s&&this.server_.reportStats(t),hn(this.reportStats_.bind(this),Math.floor(Math.random()*2*vg))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ee;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Ee||(Ee={}));function _c(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function yr(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function vr(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class as{constructor(e,t,s){this.path=e,this.affectedTree=t,this.revert=s,this.type=Ee.ACK_USER_WRITE,this.source=_c()}operationForChild(e){if(D(this.path)){if(this.affectedTree.value!=null)return T(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new W(e));return new as(U(),t,this.revert)}}else return T(O(this.path)===e,"operationForChild called for unrelated child."),new as(H(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class In{constructor(e,t){this.source=e,this.path=t,this.type=Ee.LISTEN_COMPLETE}operationForChild(e){return D(this.path)?new In(this.source,U()):new In(this.source,H(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St{constructor(e,t,s){this.source=e,this.path=t,this.snap=s,this.type=Ee.OVERWRITE}operationForChild(e){return D(this.path)?new St(this.source,U(),this.snap.getImmediateChild(e)):new St(this.source,H(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cn{constructor(e,t,s){this.source=e,this.path=t,this.children=s,this.type=Ee.MERGE}operationForChild(e){if(D(this.path)){const t=this.children.subtree(new W(e));return t.isEmpty()?null:t.value?new St(this.source,U(),t.value):new Cn(this.source,U(),t)}else return T(O(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Cn(this.source,H(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tt{constructor(e,t,s){this.node_=e,this.fullyInitialized_=t,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(D(e))return this.isFullyInitialized()&&!this.filtered_;const t=O(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bg{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Eg(n,e,t,s){const i=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(dg(o.childName,o.snapshotNode))}),sn(n,i,"child_removed",e,s,t),sn(n,i,"child_added",e,s,t),sn(n,i,"child_moved",r,s,t),sn(n,i,"child_changed",e,s,t),sn(n,i,"value",e,s,t),i}function sn(n,e,t,s,i,r){const o=s.filter(a=>a.type===t);o.sort((a,l)=>Tg(n,a,l)),o.forEach(a=>{const l=Sg(n,a,r);i.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function Sg(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function Tg(n,e,t){if(e.childName==null||t.childName==null)throw Yt("Should only compare child_ events.");const s=new N(e.childName,e.snapshotNode),i=new N(t.childName,t.snapshotNode);return n.index_.compare(s,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Os(n,e){return{eventCache:n,serverCache:e}}function dn(n,e,t,s){return Os(new tt(e,t,s),n.serverCache)}function mc(n,e,t,s){return Os(n.eventCache,new tt(e,t,s))}function ls(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function Tt(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let oi;const Ig=()=>(oi||(oi=new ce(up)),oi);class z{static fromObject(e){let t=new z(null);return de(e,(s,i)=>{t=t.set(new W(s),i)}),t}constructor(e,t=Ig()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:U(),value:this.value};if(D(e))return null;{const s=O(e),i=this.children.get(s);if(i!==null){const r=i.findRootMostMatchingPathAndValue(H(e),t);return r!=null?{path:Q(new W(s),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(D(e))return this;{const t=O(e),s=this.children.get(t);return s!==null?s.subtree(H(e)):new z(null)}}set(e,t){if(D(e))return new z(t,this.children);{const s=O(e),r=(this.children.get(s)||new z(null)).set(H(e),t),o=this.children.insert(s,r);return new z(this.value,o)}}remove(e){if(D(e))return this.children.isEmpty()?new z(null):new z(null,this.children);{const t=O(e),s=this.children.get(t);if(s){const i=s.remove(H(e));let r;return i.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,i),this.value===null&&r.isEmpty()?new z(null):new z(this.value,r)}else return this}}get(e){if(D(e))return this.value;{const t=O(e),s=this.children.get(t);return s?s.get(H(e)):null}}setTree(e,t){if(D(e))return t;{const s=O(e),r=(this.children.get(s)||new z(null)).setTree(H(e),t);let o;return r.isEmpty()?o=this.children.remove(s):o=this.children.insert(s,r),new z(this.value,o)}}fold(e){return this.fold_(U(),e)}fold_(e,t){const s={};return this.children.inorderTraversal((i,r)=>{s[i]=r.fold_(Q(e,i),t)}),t(e,this.value,s)}findOnPath(e,t){return this.findOnPath_(e,U(),t)}findOnPath_(e,t,s){const i=this.value?s(t,this.value):!1;if(i)return i;if(D(e))return null;{const r=O(e),o=this.children.get(r);return o?o.findOnPath_(H(e),Q(t,r),s):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,U(),t)}foreachOnPath_(e,t,s){if(D(e))return this;{this.value&&s(t,this.value);const i=O(e),r=this.children.get(i);return r?r.foreachOnPath_(H(e),Q(t,i),s):new z(null)}}foreach(e){this.foreach_(U(),e)}foreach_(e,t){this.children.inorderTraversal((s,i)=>{i.foreach_(Q(e,s),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,s)=>{s.value&&e(t,s.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Te{constructor(e){this.writeTree_=e}static empty(){return new Te(new z(null))}}function fn(n,e,t){if(D(e))return new Te(new z(t));{const s=n.writeTree_.findRootMostValueAndPath(e);if(s!=null){const i=s.path;let r=s.value;const o=ae(i,e);return r=r.updateChild(o,t),new Te(n.writeTree_.set(i,r))}else{const i=new z(t),r=n.writeTree_.setTree(e,i);return new Te(r)}}}function Ko(n,e,t){let s=n;return de(t,(i,r)=>{s=fn(s,Q(e,i),r)}),s}function Go(n,e){if(D(e))return Te.empty();{const t=n.writeTree_.setTree(e,new z(null));return new Te(t)}}function Ri(n,e){return It(n,e)!=null}function It(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(ae(t.path,e)):null}function Yo(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(K,(s,i)=>{e.push(new N(s,i))}):n.writeTree_.children.inorderTraversal((s,i)=>{i.value!=null&&e.push(new N(s,i.value))}),e}function Je(n,e){if(D(e))return n;{const t=It(n,e);return t!=null?new Te(new z(t)):new Te(n.writeTree_.subtree(e))}}function Pi(n){return n.writeTree_.isEmpty()}function zt(n,e){return yc(U(),n.writeTree_,e)}function yc(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let s=null;return e.children.inorderTraversal((i,r)=>{i===".priority"?(T(r.value!==null,"Priority writes must always be leaf nodes"),s=r.value):t=yc(Q(n,i),r,t)}),!t.getChild(n).isEmpty()&&s!==null&&(t=t.updateChild(Q(n,".priority"),s)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ns(n,e){return Ec(e,n)}function Cg(n,e,t,s,i){T(s>n.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),n.allWrites.push({path:e,snap:t,writeId:s,visible:i}),i&&(n.visibleWrites=fn(n.visibleWrites,e,t)),n.lastWriteId=s}function kg(n,e){for(let t=0;t<n.allWrites.length;t++){const s=n.allWrites[t];if(s.writeId===e)return s}return null}function Ag(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);T(t>=0,"removeWrite called with nonexistent writeId.");const s=n.allWrites[t];n.allWrites.splice(t,1);let i=s.visible,r=!1,o=n.allWrites.length-1;for(;i&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&Rg(a,s.path)?i=!1:be(s.path,a.path)&&(r=!0)),o--}if(i){if(r)return Pg(n),!0;if(s.snap)n.visibleWrites=Go(n.visibleWrites,s.path);else{const a=s.children;de(a,l=>{n.visibleWrites=Go(n.visibleWrites,Q(s.path,l))})}return!0}else return!1}function Rg(n,e){if(n.snap)return be(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&be(Q(n.path,t),e))return!0;return!1}function Pg(n){n.visibleWrites=vc(n.allWrites,Og,U()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function Og(n){return n.visible}function vc(n,e,t){let s=Te.empty();for(let i=0;i<n.length;++i){const r=n[i];if(e(r)){const o=r.path;let a;if(r.snap)be(t,o)?(a=ae(t,o),s=fn(s,a,r.snap)):be(o,t)&&(a=ae(o,t),s=fn(s,U(),r.snap.getChild(a)));else if(r.children){if(be(t,o))a=ae(t,o),s=Ko(s,a,r.children);else if(be(o,t))if(a=ae(o,t),D(a))s=Ko(s,U(),r.children);else{const l=Wt(r.children,O(a));if(l){const c=l.getChild(H(a));s=fn(s,U(),c)}}}else throw Yt("WriteRecord should have .snap or .children")}}return s}function wc(n,e,t,s,i){if(!s&&!i){const r=It(n.visibleWrites,e);if(r!=null)return r;{const o=Je(n.visibleWrites,e);if(Pi(o))return t;if(t==null&&!Ri(o,U()))return null;{const a=t||k.EMPTY_NODE;return zt(o,a)}}}else{const r=Je(n.visibleWrites,e);if(!i&&Pi(r))return t;if(!i&&t==null&&!Ri(r,U()))return null;{const o=function(c){return(c.visible||i)&&(!s||!~s.indexOf(c.writeId))&&(be(c.path,e)||be(e,c.path))},a=vc(n.allWrites,o,e),l=t||k.EMPTY_NODE;return zt(a,l)}}}function Ng(n,e,t){let s=k.EMPTY_NODE;const i=It(n.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(K,(r,o)=>{s=s.updateImmediateChild(r,o)}),s;if(t){const r=Je(n.visibleWrites,e);return t.forEachChild(K,(o,a)=>{const l=zt(Je(r,new W(o)),a);s=s.updateImmediateChild(o,l)}),Yo(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const r=Je(n.visibleWrites,e);return Yo(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function xg(n,e,t,s,i){T(s||i,"Either existingEventSnap or existingServerSnap must exist");const r=Q(e,t);if(Ri(n.visibleWrites,r))return null;{const o=Je(n.visibleWrites,r);return Pi(o)?i.getChild(t):zt(o,i.getChild(t))}}function Dg(n,e,t,s){const i=Q(e,t),r=It(n.visibleWrites,i);if(r!=null)return r;if(s.isCompleteForChild(t)){const o=Je(n.visibleWrites,i);return zt(o,s.getNode().getImmediateChild(t))}else return null}function Lg(n,e){return It(n.visibleWrites,e)}function Mg(n,e,t,s,i,r,o){let a;const l=Je(n.visibleWrites,e),c=It(l,U());if(c!=null)a=c;else if(t!=null)a=zt(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],h=o.getCompare(),d=r?a.getReverseIteratorFrom(s,o):a.getIteratorFrom(s,o);let v=d.getNext();for(;v&&u.length<i;)h(v,s)!==0&&u.push(v),v=d.getNext();return u}else return[]}function jg(){return{visibleWrites:Te.empty(),allWrites:[],lastWriteId:-1}}function cs(n,e,t,s){return wc(n.writeTree,n.treePath,e,t,s)}function wr(n,e){return Ng(n.writeTree,n.treePath,e)}function Jo(n,e,t,s){return xg(n.writeTree,n.treePath,e,t,s)}function us(n,e){return Lg(n.writeTree,Q(n.treePath,e))}function Fg(n,e,t,s,i,r){return Mg(n.writeTree,n.treePath,e,t,s,i,r)}function br(n,e,t){return Dg(n.writeTree,n.treePath,e,t)}function bc(n,e){return Ec(Q(n.treePath,e),n.writeTree)}function Ec(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $g{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,s=e.childName;T(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),T(s!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(s);if(i){const r=i.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(s,Sn(s,e.snapshotNode,i.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(s);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(s,En(s,i.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(s,Ht(s,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(s,Sn(s,e.snapshotNode,i.oldSnap));else throw Yt("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ug{getCompleteChild(e){return null}getChildAfterChild(e,t,s){return null}}const Sc=new Ug;class Er{constructor(e,t,s=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=s}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new tt(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return br(this.writes_,e,s)}}getChildAfterChild(e,t,s){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Tt(this.viewCache_),r=Fg(this.writes_,i,t,1,s,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bg(n){return{filter:n}}function Vg(n,e){T(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),T(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function Wg(n,e,t,s,i){const r=new $g;let o,a;if(t.type===Ee.OVERWRITE){const c=t;c.source.fromUser?o=Oi(n,e,c.path,c.snap,s,i,r):(T(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!D(c.path),o=hs(n,e,c.path,c.snap,s,i,a,r))}else if(t.type===Ee.MERGE){const c=t;c.source.fromUser?o=Hg(n,e,c.path,c.children,s,i,r):(T(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=Ni(n,e,c.path,c.children,s,i,a,r))}else if(t.type===Ee.ACK_USER_WRITE){const c=t;c.revert?o=Gg(n,e,c.path,s,i,r):o=zg(n,e,c.path,c.affectedTree,s,i,r)}else if(t.type===Ee.LISTEN_COMPLETE)o=Kg(n,e,t.path,s,r);else throw Yt("Unknown operation type: "+t.type);const l=r.getChanges();return qg(e,o,l),{viewCache:o,changes:l}}function qg(n,e,t){const s=e.eventCache;if(s.isFullyInitialized()){const i=s.getNode().isLeafNode()||s.getNode().isEmpty(),r=ls(n);(t.length>0||!n.eventCache.isFullyInitialized()||i&&!s.getNode().equals(r)||!s.getNode().getPriority().equals(r.getPriority()))&&t.push(pc(ls(e)))}}function Tc(n,e,t,s,i,r){const o=e.eventCache;if(us(s,t)!=null)return e;{let a,l;if(D(t))if(T(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=Tt(e),u=c instanceof k?c:k.EMPTY_NODE,h=wr(s,u);a=n.filter.updateFullNode(e.eventCache.getNode(),h,r)}else{const c=cs(s,Tt(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=O(t);if(c===".priority"){T(et(t)===1,"Can't have a priority with additional path components");const u=o.getNode();l=e.serverCache.getNode();const h=Jo(s,t,u,l);h!=null?a=n.filter.updatePriority(u,h):a=o.getNode()}else{const u=H(t);let h;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const d=Jo(s,t,o.getNode(),l);d!=null?h=o.getNode().getImmediateChild(c).updateChild(u,d):h=o.getNode().getImmediateChild(c)}else h=br(s,c,e.serverCache);h!=null?a=n.filter.updateChild(o.getNode(),c,h,u,i,r):a=o.getNode()}}return dn(e,a,o.isFullyInitialized()||D(t),n.filter.filtersNodes())}}function hs(n,e,t,s,i,r,o,a){const l=e.serverCache;let c;const u=o?n.filter:n.filter.getIndexedFilter();if(D(t))c=u.updateFullNode(l.getNode(),s,null);else if(u.filtersNodes()&&!l.isFiltered()){const v=l.getNode().updateChild(t,s);c=u.updateFullNode(l.getNode(),v,null)}else{const v=O(t);if(!l.isCompleteForPath(t)&&et(t)>1)return e;const b=H(t),E=l.getNode().getImmediateChild(v).updateChild(b,s);v===".priority"?c=u.updatePriority(l.getNode(),E):c=u.updateChild(l.getNode(),v,E,b,Sc,null)}const h=mc(e,c,l.isFullyInitialized()||D(t),u.filtersNodes()),d=new Er(i,h,r);return Tc(n,h,t,i,d,a)}function Oi(n,e,t,s,i,r,o){const a=e.eventCache;let l,c;const u=new Er(i,e,r);if(D(t))c=n.filter.updateFullNode(e.eventCache.getNode(),s,o),l=dn(e,c,!0,n.filter.filtersNodes());else{const h=O(t);if(h===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),s),l=dn(e,c,a.isFullyInitialized(),a.isFiltered());else{const d=H(t),v=a.getNode().getImmediateChild(h);let b;if(D(d))b=s;else{const S=u.getCompleteChild(h);S!=null?rc(d)===".priority"&&S.getChild(ac(d)).isEmpty()?b=S:b=S.updateChild(d,s):b=k.EMPTY_NODE}if(v.equals(b))l=e;else{const S=n.filter.updateChild(a.getNode(),h,b,d,u,o);l=dn(e,S,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function Qo(n,e){return n.eventCache.isCompleteForChild(e)}function Hg(n,e,t,s,i,r,o){let a=e;return s.foreach((l,c)=>{const u=Q(t,l);Qo(e,O(u))&&(a=Oi(n,a,u,c,i,r,o))}),s.foreach((l,c)=>{const u=Q(t,l);Qo(e,O(u))||(a=Oi(n,a,u,c,i,r,o))}),a}function Xo(n,e,t){return t.foreach((s,i)=>{e=e.updateChild(s,i)}),e}function Ni(n,e,t,s,i,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;D(t)?c=s:c=new z(null).setTree(t,s);const u=e.serverCache.getNode();return c.children.inorderTraversal((h,d)=>{if(u.hasChild(h)){const v=e.serverCache.getNode().getImmediateChild(h),b=Xo(n,v,d);l=hs(n,l,new W(h),b,i,r,o,a)}}),c.children.inorderTraversal((h,d)=>{const v=!e.serverCache.isCompleteForChild(h)&&d.value===null;if(!u.hasChild(h)&&!v){const b=e.serverCache.getNode().getImmediateChild(h),S=Xo(n,b,d);l=hs(n,l,new W(h),S,i,r,o,a)}}),l}function zg(n,e,t,s,i,r,o){if(us(i,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(s.value!=null){if(D(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return hs(n,e,t,l.getNode().getChild(t),i,r,a,o);if(D(t)){let c=new z(null);return l.getNode().forEachChild(Vt,(u,h)=>{c=c.set(new W(u),h)}),Ni(n,e,t,c,i,r,a,o)}else return e}else{let c=new z(null);return s.foreach((u,h)=>{const d=Q(t,u);l.isCompleteForPath(d)&&(c=c.set(u,l.getNode().getChild(d)))}),Ni(n,e,t,c,i,r,a,o)}}function Kg(n,e,t,s,i){const r=e.serverCache,o=mc(e,r.getNode(),r.isFullyInitialized()||D(t),r.isFiltered());return Tc(n,o,t,s,Sc,i)}function Gg(n,e,t,s,i,r){let o;if(us(s,t)!=null)return e;{const a=new Er(s,e,i),l=e.eventCache.getNode();let c;if(D(t)||O(t)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=cs(s,Tt(e));else{const h=e.serverCache.getNode();T(h instanceof k,"serverChildren would be complete if leaf node"),u=wr(s,h)}u=u,c=n.filter.updateFullNode(l,u,r)}else{const u=O(t);let h=br(s,u,e.serverCache);h==null&&e.serverCache.isCompleteForChild(u)&&(h=l.getImmediateChild(u)),h!=null?c=n.filter.updateChild(l,u,h,H(t),a,r):e.eventCache.getNode().hasChild(u)?c=n.filter.updateChild(l,u,k.EMPTY_NODE,H(t),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=cs(s,Tt(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||us(s,U())!=null,dn(e,c,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yg{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,i=new _r(s.getIndex()),r=pg(s);this.processor_=Bg(r);const o=t.serverCache,a=t.eventCache,l=i.updateFullNode(k.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(k.EMPTY_NODE,a.getNode(),null),u=new tt(l,o.isFullyInitialized(),i.filtersNodes()),h=new tt(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=Os(h,u),this.eventGenerator_=new bg(this.query_)}get query(){return this.query_}}function Jg(n){return n.viewCache_.serverCache.getNode()}function Qg(n){return ls(n.viewCache_)}function Xg(n,e){const t=Tt(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!D(e)&&!t.getImmediateChild(O(e)).isEmpty())?t.getChild(e):null}function Zo(n){return n.eventRegistrations_.length===0}function Zg(n,e){n.eventRegistrations_.push(e)}function ea(n,e,t){const s=[];if(t){T(e==null,"A cancel should cancel all event registrations.");const i=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,i);o&&s.push(o)})}if(e){let i=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=i}else n.eventRegistrations_=[];return s}function ta(n,e,t,s){e.type===Ee.MERGE&&e.source.queryId!==null&&(T(Tt(n.viewCache_),"We should always have a full cache before handling merges"),T(ls(n.viewCache_),"Missing event cache, even though we have a server cache"));const i=n.viewCache_,r=Wg(n.processor_,i,e,t,s);return Vg(n.processor_,r.viewCache),T(r.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,Ic(n,r.changes,r.viewCache.eventCache.getNode(),null)}function e_(n,e){const t=n.viewCache_.eventCache,s=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(K,(r,o)=>{s.push(Ht(r,o))}),t.isFullyInitialized()&&s.push(pc(t.getNode())),Ic(n,s,t.getNode(),e)}function Ic(n,e,t,s){const i=s?[s]:n.eventRegistrations_;return Eg(n.eventGenerator_,e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ds;class Cc{constructor(){this.views=new Map}}function t_(n){T(!ds,"__referenceConstructor has already been defined"),ds=n}function n_(){return T(ds,"Reference.ts has not been loaded"),ds}function s_(n){return n.views.size===0}function Sr(n,e,t,s){const i=e.source.queryId;if(i!==null){const r=n.views.get(i);return T(r!=null,"SyncTree gave us an op for an invalid query."),ta(r,e,t,s)}else{let r=[];for(const o of n.views.values())r=r.concat(ta(o,e,t,s));return r}}function kc(n,e,t,s,i){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=cs(t,i?s:null),l=!1;a?l=!0:s instanceof k?(a=wr(t,s),l=!1):(a=k.EMPTY_NODE,l=!1);const c=Os(new tt(a,l,!1),new tt(s,i,!1));return new Yg(e,c)}return o}function i_(n,e,t,s,i,r){const o=kc(n,e,s,i,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),Zg(o,t),e_(o,t)}function r_(n,e,t,s){const i=e._queryIdentifier,r=[];let o=[];const a=nt(n);if(i==="default")for(const[l,c]of n.views.entries())o=o.concat(ea(c,t,s)),Zo(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=n.views.get(i);l&&(o=o.concat(ea(l,t,s)),Zo(l)&&(n.views.delete(i),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!nt(n)&&r.push(new(n_())(e._repo,e._path)),{removed:r,events:o}}function Ac(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function Qe(n,e){let t=null;for(const s of n.views.values())t=t||Xg(s,e);return t}function Rc(n,e){if(e._queryParams.loadsAllData())return xs(n);{const s=e._queryIdentifier;return n.views.get(s)}}function Pc(n,e){return Rc(n,e)!=null}function nt(n){return xs(n)!=null}function xs(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let fs;function o_(n){T(!fs,"__referenceConstructor has already been defined"),fs=n}function a_(){return T(fs,"Reference.ts has not been loaded"),fs}let l_=1;class na{constructor(e){this.listenProvider_=e,this.syncPointTree_=new z(null),this.pendingWriteTree_=jg(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Oc(n,e,t,s,i){return Cg(n.pendingWriteTree_,e,t,s,i),i?jn(n,new St(_c(),e,t)):[]}function _t(n,e,t=!1){const s=kg(n.pendingWriteTree_,e);if(Ag(n.pendingWriteTree_,e)){let r=new z(null);return s.snap!=null?r=r.set(U(),!0):de(s.children,o=>{r=r.set(new W(o),!0)}),jn(n,new as(s.path,r,t))}else return[]}function Mn(n,e,t){return jn(n,new St(yr(),e,t))}function c_(n,e,t){const s=z.fromObject(t);return jn(n,new Cn(yr(),e,s))}function u_(n,e){return jn(n,new In(yr(),e))}function h_(n,e,t){const s=Ir(n,t);if(s){const i=Cr(s),r=i.path,o=i.queryId,a=ae(r,e),l=new In(vr(o),a);return kr(n,r,l)}else return[]}function ps(n,e,t,s,i=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||Pc(o,e))){const l=r_(o,e,t,s);s_(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!i){const u=c.findIndex(d=>d._queryParams.loadsAllData())!==-1,h=n.syncPointTree_.findOnPath(r,(d,v)=>nt(v));if(u&&!h){const d=n.syncPointTree_.subtree(r);if(!d.isEmpty()){const v=p_(d);for(let b=0;b<v.length;++b){const S=v[b],E=S.query,A=Lc(n,S);n.listenProvider_.startListening(pn(E),kn(n,E),A.hashFn,A.onComplete)}}}!h&&c.length>0&&!s&&(u?n.listenProvider_.stopListening(pn(e),null):c.forEach(d=>{const v=n.queryToTagMap.get(Ds(d));n.listenProvider_.stopListening(pn(d),v)}))}g_(n,c)}return a}function Nc(n,e,t,s){const i=Ir(n,s);if(i!=null){const r=Cr(i),o=r.path,a=r.queryId,l=ae(o,e),c=new St(vr(a),l,t);return kr(n,o,c)}else return[]}function d_(n,e,t,s){const i=Ir(n,s);if(i){const r=Cr(i),o=r.path,a=r.queryId,l=ae(o,e),c=z.fromObject(t),u=new Cn(vr(a),l,c);return kr(n,o,u)}else return[]}function xi(n,e,t,s=!1){const i=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(i,(d,v)=>{const b=ae(d,i);r=r||Qe(v,b),o=o||nt(v)});let a=n.syncPointTree_.get(i);a?(o=o||nt(a),r=r||Qe(a,U())):(a=new Cc,n.syncPointTree_=n.syncPointTree_.set(i,a));let l;r!=null?l=!0:(l=!1,r=k.EMPTY_NODE,n.syncPointTree_.subtree(i).foreachChild((v,b)=>{const S=Qe(b,U());S&&(r=r.updateImmediateChild(v,S))}));const c=Pc(a,e);if(!c&&!e._queryParams.loadsAllData()){const d=Ds(e);T(!n.queryToTagMap.has(d),"View does not exist, but we have a tag");const v=__();n.queryToTagMap.set(d,v),n.tagToQueryMap.set(v,d)}const u=Ns(n.pendingWriteTree_,i);let h=i_(a,e,t,u,r,l);if(!c&&!o&&!s){const d=Rc(a,e);h=h.concat(m_(n,e,d))}return h}function Tr(n,e,t){const i=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=ae(o,e),c=Qe(a,l);if(c)return c});return wc(i,e,r,t,!0)}function f_(n,e){const t=e._path;let s=null;n.syncPointTree_.foreachOnPath(t,(c,u)=>{const h=ae(c,t);s=s||Qe(u,h)});let i=n.syncPointTree_.get(t);i?s=s||Qe(i,U()):(i=new Cc,n.syncPointTree_=n.syncPointTree_.set(t,i));const r=s!=null,o=r?new tt(s,!0,!1):null,a=Ns(n.pendingWriteTree_,e._path),l=kc(i,e,a,r?o.getNode():k.EMPTY_NODE,r);return Qg(l)}function jn(n,e){return xc(e,n.syncPointTree_,null,Ns(n.pendingWriteTree_,U()))}function xc(n,e,t,s){if(D(n.path))return Dc(n,e,t,s);{const i=e.get(U());t==null&&i!=null&&(t=Qe(i,U()));let r=[];const o=O(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,u=bc(s,o);r=r.concat(xc(a,l,c,u))}return i&&(r=r.concat(Sr(i,n,s,t))),r}}function Dc(n,e,t,s){const i=e.get(U());t==null&&i!=null&&(t=Qe(i,U()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=bc(s,o),u=n.operationForChild(o);u&&(r=r.concat(Dc(u,a,l,c)))}),i&&(r=r.concat(Sr(i,n,s,t))),r}function Lc(n,e){const t=e.query,s=kn(n,t);return{hashFn:()=>(Jg(e)||k.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return s?h_(n,t._path,s):u_(n,t._path);{const r=fp(i,t);return ps(n,t,null,r)}}}}function kn(n,e){const t=Ds(e);return n.queryToTagMap.get(t)}function Ds(n){return n._path.toString()+"$"+n._queryIdentifier}function Ir(n,e){return n.tagToQueryMap.get(e)}function Cr(n){const e=n.indexOf("$");return T(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new W(n.substr(0,e))}}function kr(n,e,t){const s=n.syncPointTree_.get(e);T(s,"Missing sync point for query tag that we're tracking");const i=Ns(n.pendingWriteTree_,e);return Sr(s,t,i,null)}function p_(n){return n.fold((e,t,s)=>{if(t&&nt(t))return[xs(t)];{let i=[];return t&&(i=Ac(t)),de(s,(r,o)=>{i=i.concat(o)}),i}})}function pn(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(a_())(n._repo,n._path):n}function g_(n,e){for(let t=0;t<e.length;++t){const s=e[t];if(!s._queryParams.loadsAllData()){const i=Ds(s),r=n.queryToTagMap.get(i);n.queryToTagMap.delete(i),n.tagToQueryMap.delete(r)}}}function __(){return l_++}function m_(n,e,t){const s=e._path,i=kn(n,e),r=Lc(n,t),o=n.listenProvider_.startListening(pn(e),i,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(s);if(i)T(!nt(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,u,h)=>{if(!D(c)&&u&&nt(u))return[xs(u).query];{let d=[];return u&&(d=d.concat(Ac(u).map(v=>v.query))),de(h,(v,b)=>{d=d.concat(b)}),d}});for(let c=0;c<l.length;++c){const u=l[c];n.listenProvider_.stopListening(pn(u),kn(n,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ar{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Ar(t)}node(){return this.node_}}class Rr{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=Q(this.path_,e);return new Rr(this.syncTree_,t)}node(){return Tr(this.syncTree_,this.path_)}}const y_=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},sa=function(n,e,t){if(!n||typeof n!="object")return n;if(T(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return v_(n[".sv"],e,t);if(typeof n[".sv"]=="object")return w_(n[".sv"],e);T(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},v_=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:T(!1,"Unexpected server value: "+n)}},w_=function(n,e,t){n.hasOwnProperty("increment")||T(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const s=n.increment;typeof s!="number"&&T(!1,"Unexpected increment value: "+s);const i=e.node();if(T(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return s;const o=i.getValue();return typeof o!="number"?s:o+s},b_=function(n,e,t,s){return Pr(e,new Rr(t,n),s)},Mc=function(n,e,t){return Pr(n,new Ar(e),t)};function Pr(n,e,t){const s=n.getPriority().val(),i=sa(s,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=sa(o.getValue(),e,t);return a!==o.getValue()||i!==o.getPriority().val()?new ee(a,ne(i)):n}else{const o=n;return r=o,i!==o.getPriority().val()&&(r=r.updatePriority(new ee(i))),o.forEachChild(K,(a,l)=>{const c=Pr(l,e.getImmediateChild(a),t);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Or{constructor(e="",t=null,s={children:{},childCount:0}){this.name=e,this.parent=t,this.node=s}}function Nr(n,e){let t=e instanceof W?e:new W(e),s=n,i=O(t);for(;i!==null;){const r=Wt(s.node.children,i)||{children:{},childCount:0};s=new Or(i,s,r),t=H(t),i=O(t)}return s}function Xt(n){return n.node.value}function jc(n,e){n.node.value=e,Di(n)}function Fc(n){return n.node.childCount>0}function E_(n){return Xt(n)===void 0&&!Fc(n)}function Ls(n,e){de(n.node.children,(t,s)=>{e(new Or(t,n,s))})}function $c(n,e,t,s){t&&e(n),Ls(n,i=>{$c(i,e,!0)})}function S_(n,e,t){let s=n.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function Fn(n){return new W(n.parent===null?n.name:Fn(n.parent)+"/"+n.name)}function Di(n){n.parent!==null&&T_(n.parent,n.name,n)}function T_(n,e,t){const s=E_(t),i=We(n.node.children,e);s&&i?(delete n.node.children[e],n.node.childCount--,Di(n)):!s&&!i&&(n.node.children[e]=t.node,n.node.childCount++,Di(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const I_=/[\[\].#$\/\u0000-\u001F\u007F]/,C_=/[\[\].#$\u0000-\u001F\u007F]/,ai=10*1024*1024,Uc=function(n){return typeof n=="string"&&n.length!==0&&!I_.test(n)},Bc=function(n){return typeof n=="string"&&n.length!==0&&!C_.test(n)},k_=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Bc(n)},Vc=function(n,e,t,s){s&&e===void 0||xr(Ki(n,"value"),e,t)},xr=function(n,e,t){const s=t instanceof W?new zp(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+ut(s));if(typeof e=="function")throw new Error(n+"contains a function "+ut(s)+" with contents = "+e.toString());if(Fl(e))throw new Error(n+"contains "+e.toString()+" "+ut(s));if(typeof e=="string"&&e.length>ai/3&&Is(e)>ai)throw new Error(n+"contains a string greater than "+ai+" utf8 bytes "+ut(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,r=!1;if(de(e,(o,a)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Uc(o)))throw new Error(n+" contains an invalid key ("+o+") "+ut(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Kp(s,o),xr(n,a,s),Gp(s)}),i&&r)throw new Error(n+' contains ".value" child '+ut(s)+" in addition to actual children.")}},Wc=function(n,e,t,s){if(!Bc(t))throw new Error(Ki(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},A_=function(n,e,t,s){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Wc(n,e,t)},Dr=function(n,e){if(O(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},R_=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Uc(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!k_(t))throw new Error(Ki(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P_{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Lr(n,e){let t=null;for(let s=0;s<e.length;s++){const i=e[s],r=i.getPath();t!==null&&!fr(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(i)}t&&n.eventLists_.push(t)}function qc(n,e,t){Lr(n,t),Hc(n,s=>fr(s,e))}function Pe(n,e,t){Lr(n,t),Hc(n,s=>be(s,e)||be(e,s))}function Hc(n,e){n.recursionDepth_++;let t=!0;for(let s=0;s<n.eventLists_.length;s++){const i=n.eventLists_[s];if(i){const r=i.path;e(r)?(O_(n.eventLists_[s]),n.eventLists_[s]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function O_(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const s=t.getEventRunner();un&&re("event: "+t.toString()),Qt(s)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N_="repo_interrupt",x_=25;class D_{constructor(e,t,s,i){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=s,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new P_,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=os(),this.transactionQueueTree_=new Or,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function L_(n,e,t){if(n.stats_=hr(n.repoInfo_),n.forceRestClient_||mp())n.server_=new rs(n.repoInfo_,(s,i,r,o)=>{ia(n,s,i,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>ra(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{J(t)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}n.persistentConnection_=new Ue(n.repoInfo_,e,(s,i,r,o)=>{ia(n,s,i,r,o)},s=>{ra(n,s)},s=>{M_(n,s)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(s=>{n.server_.refreshAuthToken(s)}),n.appCheckProvider_.addTokenChangeListener(s=>{n.server_.refreshAppCheckToken(s.token)}),n.statsReporter_=Ep(n.repoInfo_,()=>new wg(n.stats_,n.server_)),n.infoData_=new gg,n.infoSyncTree_=new na({startListening:(s,i,r,o)=>{let a=[];const l=n.infoData_.getNode(s._path);return l.isEmpty()||(a=Mn(n.infoSyncTree_,s._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),jr(n,"connected",!1),n.serverSyncTree_=new na({startListening:(s,i,r,o)=>(n.server_.listen(s,r,i,(a,l)=>{const c=o(a,l);Pe(n.eventQueue_,s._path,c)}),[]),stopListening:(s,i)=>{n.server_.unlisten(s,i)}})}function zc(n){const t=n.infoData_.getNode(new W(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function Mr(n){return y_({timestamp:zc(n)})}function ia(n,e,t,s,i){n.dataUpdateCount++;const r=new W(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(i)if(s){const l=Jn(t,c=>ne(c));o=d_(n.serverSyncTree_,r,l,i)}else{const l=ne(t);o=Nc(n.serverSyncTree_,r,l,i)}else if(s){const l=Jn(t,c=>ne(c));o=c_(n.serverSyncTree_,r,l)}else{const l=ne(t);o=Mn(n.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=js(n,r)),Pe(n.eventQueue_,a,o)}function ra(n,e){jr(n,"connected",e),e===!1&&$_(n)}function M_(n,e){de(e,(t,s)=>{jr(n,t,s)})}function jr(n,e,t){const s=new W("/.info/"+e),i=ne(t);n.infoData_.updateSnapshot(s,i);const r=Mn(n.infoSyncTree_,s,i);Pe(n.eventQueue_,s,r)}function Kc(n){return n.nextWriteId_++}function j_(n,e,t){const s=f_(n.serverSyncTree_,e);return s!=null?Promise.resolve(s):n.server_.get(e).then(i=>{const r=ne(i).withIndex(e._queryParams.getIndex());xi(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=Mn(n.serverSyncTree_,e._path,r);else{const a=kn(n.serverSyncTree_,e);o=Nc(n.serverSyncTree_,e._path,r,a)}return Pe(n.eventQueue_,e._path,o),ps(n.serverSyncTree_,e,t,null,!0),r},i=>(Ms(n,"get for query "+J(e)+" failed: "+i),Promise.reject(new Error(i))))}function F_(n,e,t,s,i){Ms(n,"set",{path:e.toString(),value:t,priority:s});const r=Mr(n),o=ne(t,s),a=Tr(n.serverSyncTree_,e),l=Mc(o,a,r),c=Kc(n),u=Oc(n.serverSyncTree_,e,l,c,!0);Lr(n.eventQueue_,u),n.server_.put(e.toString(),o.val(!0),(d,v)=>{const b=d==="ok";b||he("set at "+e+" failed: "+d);const S=_t(n.serverSyncTree_,c,!b);Pe(n.eventQueue_,e,S),W_(n,i,d,v)});const h=Xc(n,e);js(n,h),Pe(n.eventQueue_,h,[])}function $_(n){Ms(n,"onDisconnectEvents");const e=Mr(n),t=os();Ai(n.onDisconnect_,U(),(i,r)=>{const o=b_(i,r,n.serverSyncTree_,e);gc(t,i,o)});let s=[];Ai(t,U(),(i,r)=>{s=s.concat(Mn(n.serverSyncTree_,i,r));const o=Xc(n,i);js(n,o)}),n.onDisconnect_=os(),Pe(n.eventQueue_,U(),s)}function U_(n,e,t){let s;O(e._path)===".info"?s=xi(n.infoSyncTree_,e,t):s=xi(n.serverSyncTree_,e,t),qc(n.eventQueue_,e._path,s)}function B_(n,e,t){let s;O(e._path)===".info"?s=ps(n.infoSyncTree_,e,t):s=ps(n.serverSyncTree_,e,t),qc(n.eventQueue_,e._path,s)}function V_(n){n.persistentConnection_&&n.persistentConnection_.interrupt(N_)}function Ms(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),re(t,...e)}function W_(n,e,t,s){e&&Qt(()=>{if(t==="ok")e(null);else{const i=(t||"error").toUpperCase();let r=i;s&&(r+=": "+s);const o=new Error(r);o.code=i,e(o)}})}function Gc(n,e,t){return Tr(n.serverSyncTree_,e,t)||k.EMPTY_NODE}function Fr(n,e=n.transactionQueueTree_){if(e||Fs(n,e),Xt(e)){const t=Jc(n,e);T(t.length>0,"Sending zero length transaction queue"),t.every(i=>i.status===0)&&q_(n,Fn(e),t)}else Fc(e)&&Ls(e,t=>{Fr(n,t)})}function q_(n,e,t){const s=t.map(c=>c.currentWriteId),i=Gc(n,e,s);let r=i;const o=i.hash();for(let c=0;c<t.length;c++){const u=t[c];T(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const h=ae(e,u.path);r=r.updateChild(h,u.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;n.server_.put(l.toString(),a,c=>{Ms(n,"transaction put response",{path:l.toString(),status:c});let u=[];if(c==="ok"){const h=[];for(let d=0;d<t.length;d++)t[d].status=2,u=u.concat(_t(n.serverSyncTree_,t[d].currentWriteId)),t[d].onComplete&&h.push(()=>t[d].onComplete(null,!0,t[d].currentOutputSnapshotResolved)),t[d].unwatcher();Fs(n,Nr(n.transactionQueueTree_,e)),Fr(n,n.transactionQueueTree_),Pe(n.eventQueue_,e,u);for(let d=0;d<h.length;d++)Qt(h[d])}else{if(c==="datastale")for(let h=0;h<t.length;h++)t[h].status===3?t[h].status=4:t[h].status=0;else{he("transaction at "+l.toString()+" failed: "+c);for(let h=0;h<t.length;h++)t[h].status=4,t[h].abortReason=c}js(n,e)}},o)}function js(n,e){const t=Yc(n,e),s=Fn(t),i=Jc(n,t);return H_(n,i,s),s}function H_(n,e,t){if(e.length===0)return;const s=[];let i=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=ae(t,l.path);let u=!1,h;if(T(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)u=!0,h=l.abortReason,i=i.concat(_t(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=x_)u=!0,h="maxretry",i=i.concat(_t(n.serverSyncTree_,l.currentWriteId,!0));else{const d=Gc(n,l.path,o);l.currentInputSnapshot=d;const v=e[a].update(d.val());if(v!==void 0){xr("transaction failed: Data returned ",v,l.path);let b=ne(v);typeof v=="object"&&v!=null&&We(v,".priority")||(b=b.updatePriority(d.getPriority()));const E=l.currentWriteId,A=Mr(n),F=Mc(b,d,A);l.currentOutputSnapshotRaw=b,l.currentOutputSnapshotResolved=F,l.currentWriteId=Kc(n),o.splice(o.indexOf(E),1),i=i.concat(Oc(n.serverSyncTree_,l.path,F,l.currentWriteId,l.applyLocally)),i=i.concat(_t(n.serverSyncTree_,E,!0))}else u=!0,h="nodata",i=i.concat(_t(n.serverSyncTree_,l.currentWriteId,!0))}Pe(n.eventQueue_,t,i),i=[],u&&(e[a].status=2,function(d){setTimeout(d,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(h==="nodata"?s.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):s.push(()=>e[a].onComplete(new Error(h),!1,null))))}Fs(n,n.transactionQueueTree_);for(let a=0;a<s.length;a++)Qt(s[a]);Fr(n,n.transactionQueueTree_)}function Yc(n,e){let t,s=n.transactionQueueTree_;for(t=O(e);t!==null&&Xt(s)===void 0;)s=Nr(s,t),e=H(e),t=O(e);return s}function Jc(n,e){const t=[];return Qc(n,e,t),t.sort((s,i)=>s.order-i.order),t}function Qc(n,e,t){const s=Xt(e);if(s)for(let i=0;i<s.length;i++)t.push(s[i]);Ls(e,i=>{Qc(n,i,t)})}function Fs(n,e){const t=Xt(e);if(t){let s=0;for(let i=0;i<t.length;i++)t[i].status!==2&&(t[s]=t[i],s++);t.length=s,jc(e,t.length>0?t:void 0)}Ls(e,s=>{Fs(n,s)})}function Xc(n,e){const t=Fn(Yc(n,e)),s=Nr(n.transactionQueueTree_,e);return S_(s,i=>{li(n,i)}),li(n,s),$c(s,i=>{li(n,i)}),t}function li(n,e){const t=Xt(e);if(t){const s=[];let i=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(T(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(T(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),i=i.concat(_t(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&s.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?jc(e,void 0):t.length=r+1,Pe(n.eventQueue_,Fn(e),i);for(let o=0;o<s.length;o++)Qt(s[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function z_(n){let e="";const t=n.split("/");for(let s=0;s<t.length;s++)if(t[s].length>0){let i=t[s];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function K_(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const s=t.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):he(`Invalid query segment '${t}' in query '${n}'`)}return e}const oa=function(n,e){const t=G_(n),s=t.namespace;t.domain==="firebase.com"&&Ve(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&t.domain!=="localhost"&&Ve("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||lp();const i=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Jl(t.host,t.secure,s,i,e,"",s!==t.subdomain),path:new W(t.pathString)}},G_=function(n){let e="",t="",s="",i="",r="",o=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let u=n.indexOf("/");u===-1&&(u=n.length);let h=n.indexOf("?");h===-1&&(h=n.length),e=n.substring(0,Math.min(u,h)),u<h&&(i=z_(n.substring(u,h)));const d=K_(n.substring(Math.min(n.length,h)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const v=e.slice(0,c);if(v.toLowerCase()==="localhost")t="localhost";else if(v.split(".").length<=2)t=v;else{const b=e.indexOf(".");s=e.substring(0,b).toLowerCase(),t=e.substring(b+1),r=s}"ns"in d&&(r=d.ns)}return{host:e,port:l,domain:t,subdomain:s,secure:o,scheme:a,pathString:i,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aa="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",Y_=function(){let n=0;const e=[];return function(t){const s=t===n;n=t;let i;const r=new Array(8);for(i=7;i>=0;i--)r[i]=aa.charAt(t%64),t=Math.floor(t/64);T(t===0,"Cannot push at time == 0");let o=r.join("");if(s){for(i=11;i>=0&&e[i]===63;i--)e[i]=0;e[i]++}else for(i=0;i<12;i++)e[i]=Math.floor(Math.random()*64);for(i=0;i<12;i++)o+=aa.charAt(e[i]);return T(o.length===20,"nextPushId: Length should be 20."),o}}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J_{constructor(e,t,s,i){this.eventType=e,this.eventRegistration=t,this.snapshot=s,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+J(this.snapshot.exportVal())}}class Q_{constructor(e,t,s){this.eventRegistration=e,this.error=t,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zc{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return T(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class $r{constructor(e,t,s,i){this._repo=e,this._path=t,this._queryParams=s,this._orderByCalled=i}get key(){return D(this._path)?null:rc(this._path)}get ref(){return new qe(this._repo,this._path)}get _queryIdentifier(){const e=Ho(this._queryParams),t=cr(e);return t==="{}"?"default":t}get _queryObject(){return Ho(this._queryParams)}isEqual(e){if(e=ke(e),!(e instanceof $r))return!1;const t=this._repo===e._repo,s=fr(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return t&&s&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+Hp(this._path)}}class qe extends $r{constructor(e,t){super(e,t,new mr,!1)}get parent(){const e=ac(this._path);return e===null?null:new qe(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class An{constructor(e,t,s){this._node=e,this.ref=t,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new W(e),s=Rn(this.ref,e);return new An(this._node.getChild(t),s,K)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,i)=>e(new An(i,Rn(this.ref,s),K)))}hasChild(e){const t=new W(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function P(n,e){return n=ke(n),n._checkNotDeleted("ref"),e!==void 0?Rn(n._root,e):n._root}function Rn(n,e){return n=ke(n),O(n._path)===null?A_("child","path",e):Wc("child","path",e),new qe(n._repo,Q(n._path,e))}function gs(n,e){n=ke(n),Dr("push",n._path),Vc("push",e,n._path,!0);const t=zc(n._repo),s=Y_(t),i=Rn(n,s),r=Rn(n,s);let o;return e!=null?o=_e(r,e).then(()=>r):o=Promise.resolve(r),i.then=o.then.bind(o),i.catch=o.then.bind(o,void 0),i}function pe(n){return Dr("remove",n._path),_e(n,null)}function _e(n,e){n=ke(n),Dr("set",n._path),Vc("set",e,n._path,!1);const t=new Es;return F_(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function Ce(n){n=ke(n);const e=new Zc(()=>{}),t=new $s(e);return j_(n._repo,n,t).then(s=>new An(s,new qe(n._repo,n._path),n._queryParams.getIndex()))}class $s{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const s=t._queryParams.getIndex();return new J_("value",this,new An(e.snapshotNode,new qe(t._repo,t._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Q_(this,e,t):null}matches(e){return e instanceof $s?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function X_(n,e,t,s,i){const r=new Zc(t,void 0),o=new $s(r);return U_(n._repo,n,o),()=>B_(n._repo,n,o)}function eu(n,e,t,s){return X_(n,"value",e)}t_(qe);o_(qe);/**
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
 */const Z_="FIREBASE_DATABASE_EMULATOR_HOST",Li={};let em=!1;function tm(n,e,t,s){const i=e.lastIndexOf(":"),r=e.substring(0,i),o=Ss(r);n.repoInfo_=new Jl(e,o,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),s&&(n.authTokenProvider_=s)}function nm(n,e,t,s,i){let r=s||n.options.databaseURL;r===void 0&&(n.options.projectId||Ve("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),re("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=oa(r,i),a=o.repoInfo,l;typeof process<"u"&&ko&&(l=ko[Z_]),l?(r=`http://${l}?ns=${a.namespace}`,o=oa(r,i),a=o.repoInfo):o.repoInfo.secure;const c=new vp(n.name,n.options,e);R_("Invalid Firebase Database URL",o),D(o.path)||Ve("Database URL must point to the root of a Firebase Database (not including a child path).");const u=im(a,n,c,new yp(n,t));return new rm(u,n)}function sm(n,e){const t=Li[e];(!t||t[n.key]!==n)&&Ve(`Database ${e}(${n.repoInfo_}) has already been deleted.`),V_(n),delete t[n.key]}function im(n,e,t,s){let i=Li[e.name];i||(i={},Li[e.name]=i);let r=i[n.toURLString()];return r&&Ve("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new D_(n,em,t,s),i[n.toURLString()]=r,r}class rm{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(L_(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new qe(this._repo,U())),this._rootInternal}_delete(){return this._rootInternal!==null&&(sm(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Ve("Cannot call "+e+" on a deleted database.")}}function om(n=Xi(),e){const t=On(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const s=Ka("database");s&&am(t,...s)}return t}function am(n,e,t,s={}){n=ke(n),n._checkNotDeleted("useEmulator");const i=`${e}:${t}`,r=n._repoInternal;if(n._instanceStarted){if(i===n._repoInternal.repoInfo_.host&&Qn(s,r.repoInfo_.emulatorOptions))return;Ve("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)s.mockUserToken&&Ve('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Gn(Gn.OWNER);else if(s.mockUserToken){const a=typeof s.mockUserToken=="string"?s.mockUserToken:Ja(s.mockUserToken,n.app.options.projectId);o=new Gn(a)}Ss(e)&&(Ya(e),Qa("Database",!0)),tm(r,i,s,o)}/**
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
 */function lm(n){np(Qi),Re(new Ie("database",(e,{instanceIdentifier:t})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return nm(s,i,r,t)},"PUBLIC").setMultipleInstances(!0)),ue(Ao,Ro,n),ue(Ao,Ro,"esm2020")}Ue.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};Ue.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};lm();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tu="firebasestorage.googleapis.com",cm="storageBucket",um=120*1e3,hm=600*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let it=class nu extends st{constructor(e,t,s=0){super(ci(e),`Firebase Storage: ${t} (${ci(e)})`),this.status_=s,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,nu.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return ci(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}};var Oe;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(Oe||(Oe={}));function ci(n){return"storage/"+n}function dm(){const n="An unknown error occurred, please check the error payload for server response.";return new it(Oe.UNKNOWN,n)}function fm(){return new it(Oe.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function pm(){return new it(Oe.CANCELED,"User canceled the upload/download.")}function gm(n){return new it(Oe.INVALID_URL,"Invalid URL '"+n+"'.")}function _m(n){return new it(Oe.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function la(n){return new it(Oe.INVALID_ARGUMENT,n)}function su(){return new it(Oe.APP_DELETED,"The Firebase app was deleted.")}function mm(n){return new it(Oe.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let s;try{s=Se.makeFromUrl(e,t)}catch{return new Se(e,"")}if(s.path==="")return s;throw _m(e)}static makeFromUrl(e,t){let s=null;const i="([A-Za-z0-9.\\-_]+)";function r(C){C.path.charAt(C.path.length-1)==="/"&&(C.path_=C.path_.slice(0,-1))}const o="(/(.*))?$",a=new RegExp("^gs://"+i+o,"i"),l={bucket:1,path:3};function c(C){C.path_=decodeURIComponent(C.path)}const u="v[A-Za-z0-9_]+",h=t.replace(/[.]/g,"\\."),d="(/([^?#]*).*)?$",v=new RegExp(`^https?://${h}/${u}/b/${i}/o${d}`,"i"),b={bucket:1,path:3},S=t===tu?"(?:storage.googleapis.com|storage.cloud.google.com)":t,E="([^?#]*)",A=new RegExp(`^https?://${S}/${i}/${E}`,"i"),I=[{regex:a,indices:l,postModify:r},{regex:v,indices:b,postModify:c},{regex:A,indices:{bucket:1,path:2},postModify:c}];for(let C=0;C<I.length;C++){const B=I[C],$=B.regex.exec(e);if($){const _=$[B.indices.bucket];let f=$[B.indices.path];f||(f=""),s=new Se(_,f),B.postModify(s);break}}if(s==null)throw gm(e);return s}}class ym{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vm(n,e,t){let s=1,i=null,r=null,o=!1,a=0;function l(){return a===2}let c=!1;function u(...E){c||(c=!0,e.apply(null,E))}function h(E){i=setTimeout(()=>{i=null,n(v,l())},E)}function d(){r&&clearTimeout(r)}function v(E,...A){if(c){d();return}if(E){d(),u.call(null,E,...A);return}if(l()||o){d(),u.call(null,E,...A);return}s<64&&(s*=2);let I;a===1?(a=2,I=0):I=(s+Math.random())*1e3,h(I)}let b=!1;function S(E){b||(b=!0,d(),!c&&(i!==null?(E||(a=2),clearTimeout(i),h(0)):E||(a=1)))}return h(0),r=setTimeout(()=>{o=!0,S(!0)},t),S}function wm(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bm(n){return n!==void 0}function ca(n,e,t,s){if(s<e)throw la(`Invalid value for '${n}'. Expected ${e} or greater.`);if(s>t)throw la(`Invalid value for '${n}'. Expected ${t} or less.`)}function Em(n){const e=encodeURIComponent;let t="?";for(const s in n)if(n.hasOwnProperty(s)){const i=e(s)+"="+e(n[s]);t=t+i+"&"}return t=t.slice(0,-1),t}var _s;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(_s||(_s={}));/**
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
 */function Sm(n,e){const t=n>=500&&n<600,i=[408,429].indexOf(n)!==-1,r=e.indexOf(n)!==-1;return t||i||r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tm{constructor(e,t,s,i,r,o,a,l,c,u,h,d=!0,v=!1){this.url_=e,this.method_=t,this.headers_=s,this.body_=i,this.successCodes_=r,this.additionalRetryCodes_=o,this.callback_=a,this.errorCallback_=l,this.timeout_=c,this.progressCallback_=u,this.connectionFactory_=h,this.retry=d,this.isUsingEmulator=v,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((b,S)=>{this.resolve_=b,this.reject_=S,this.start_()})}start_(){const e=(s,i)=>{if(i){s(!1,new Wn(!1,null,!0));return}const r=this.connectionFactory_();this.pendingConnection_=r;const o=a=>{const l=a.loaded,c=a.lengthComputable?a.total:-1;this.progressCallback_!==null&&this.progressCallback_(l,c)};this.progressCallback_!==null&&r.addUploadProgressListener(o),r.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&r.removeUploadProgressListener(o),this.pendingConnection_=null;const a=r.getErrorCode()===_s.NO_ERROR,l=r.getStatus();if(!a||Sm(l,this.additionalRetryCodes_)&&this.retry){const u=r.getErrorCode()===_s.ABORT;s(!1,new Wn(!1,null,u));return}const c=this.successCodes_.indexOf(l)!==-1;s(!0,new Wn(c,r))})},t=(s,i)=>{const r=this.resolve_,o=this.reject_,a=i.connection;if(i.wasSuccessCode)try{const l=this.callback_(a,a.getResponse());bm(l)?r(l):r()}catch(l){o(l)}else if(a!==null){const l=dm();l.serverResponse=a.getErrorText(),this.errorCallback_?o(this.errorCallback_(a,l)):o(l)}else if(i.canceled){const l=this.appDelete_?su():pm();o(l)}else{const l=fm();o(l)}};this.canceled_?t(!1,new Wn(!1,null,!0)):this.backoffId_=vm(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&wm(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Wn{constructor(e,t,s){this.wasSuccessCode=e,this.connection=t,this.canceled=!!s}}function Im(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function Cm(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function km(n,e){e&&(n["X-Firebase-GMPID"]=e)}function Am(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function Rm(n,e,t,s,i,r,o=!0,a=!1){const l=Em(n.urlParams),c=n.url+l,u=Object.assign({},n.headers);return km(u,e),Im(u,t),Cm(u,r),Am(u,s),new Tm(c,n.method,u,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,i,o,a)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pm(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function Om(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
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
 */class ms{constructor(e,t){this._service=e,t instanceof Se?this._location=t:this._location=Se.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new ms(e,t)}get root(){const e=new Se(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Om(this._location.path)}get storage(){return this._service}get parent(){const e=Pm(this._location.path);if(e===null)return null;const t=new Se(this._location.bucket,e);return new ms(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw mm(e)}}function ua(n,e){const t=e?.[cm];return t==null?null:Se.makeFromBucketSpec(t,n)}function Nm(n,e,t,s={}){n.host=`${e}:${t}`;const i=Ss(e);i&&(Ya(`https://${n.host}/b`),Qa("Storage",!0)),n._isUsingEmulator=!0,n._protocol=i?"https":"http";const{mockUserToken:r}=s;r&&(n._overrideAuthToken=typeof r=="string"?r:Ja(r,n.app.options.projectId))}class xm{constructor(e,t,s,i,r,o=!1){this.app=e,this._authProvider=t,this._appCheckProvider=s,this._url=i,this._firebaseVersion=r,this._isUsingEmulator=o,this._bucket=null,this._host=tu,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=um,this._maxUploadRetryTime=hm,this._requests=new Set,i!=null?this._bucket=Se.makeFromBucketSpec(i,this._host):this._bucket=ua(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Se.makeFromBucketSpec(this._url,e):this._bucket=ua(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){ca("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){ca("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(Ji(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new ms(this,e)}_makeRequest(e,t,s,i,r=!0){if(this._deleted)return new ym(su());{const o=Rm(e,this._appId,s,i,t,this._firebaseVersion,r,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[s,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,s,i).getPromise()}}const ha="@firebase/storage",da="0.14.0";/**
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
 */const iu="storage";function Dm(n=Xi(),e){n=ke(n);const s=On(n,iu).getImmediate({identifier:e}),i=Ka("storage");return i&&Lm(s,...i),s}function Lm(n,e,t,s={}){Nm(n,e,t,s)}function Mm(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),s=n.getProvider("auth-internal"),i=n.getProvider("app-check-internal");return new xm(t,s,i,e,Qi)}function jm(){Re(new Ie(iu,Mm,"PUBLIC").setMultipleInstances(!0)),ue(ha,da,""),ue(ha,da,"esm2020")}jm();const Fm={apiKey:"AIzaSyC-jTMiDjHNTC6cvSKUU44mVbWwT-ToLxQ",authDomain:"mister-x-d6b59.firebaseapp.com",databaseURL:"https://mister-x-d6b59-default-rtdb.europe-west1.firebasedatabase.app",projectId:"mister-x-d6b59",storageBucket:"mister-x-d6b59.firebasestorage.app",messagingSenderId:"616391598963",appId:"1:616391598963:web:da07882b0f481d3000db06",measurementId:"G-W66SK677NG"},Ur=il(Fm),M=om(Ur);Dm(Ur);const ys=xf(Ur),$m="modulepreload",Um=function(n){return"/Mister-X/"+n},fa={},$n=function(e,t,s){let i=Promise.resolve();if(t&&t.length>0){let c=function(u){return Promise.all(u.map(h=>Promise.resolve(h).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};var o=c;document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),l=a?.nonce||a?.getAttribute("nonce");i=c(t.map(u=>{if(u=Um(u),u in fa)return;fa[u]=!0;const h=u.endsWith(".css"),d=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${d}`))return;const v=document.createElement("link");if(v.rel=h?"stylesheet":$m,h||(v.as="script"),v.crossOrigin="",v.href=u,l&&v.setAttribute("nonce",l),document.head.appendChild(v),h)return new Promise((b,S)=>{v.addEventListener("load",b),v.addEventListener("error",()=>S(new Error(`Unable to preload CSS for ${u}`)))})}))}function r(a){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=a,window.dispatchEvent(l),!l.defaultPrevented)throw a}return i.then(a=>{for(const l of a||[])l.status==="rejected"&&r(l.reason);return e().catch(r)})},Bm=n=>{let e;return n?e=n:typeof fetch>"u"?e=(...t)=>$n(async()=>{const{default:s}=await Promise.resolve().then(()=>Zt);return{default:s}},void 0).then(({default:s})=>s(...t)):e=fetch,(...t)=>e(...t)};class Br extends Error{constructor(e,t="FunctionsError",s){super(e),this.name=t,this.context=s}}class Vm extends Br{constructor(e){super("Failed to send a request to the Edge Function","FunctionsFetchError",e)}}class pa extends Br{constructor(e){super("Relay Error invoking the Edge Function","FunctionsRelayError",e)}}class ga extends Br{constructor(e){super("Edge Function returned a non-2xx status code","FunctionsHttpError",e)}}var Mi;(function(n){n.Any="any",n.ApNortheast1="ap-northeast-1",n.ApNortheast2="ap-northeast-2",n.ApSouth1="ap-south-1",n.ApSoutheast1="ap-southeast-1",n.ApSoutheast2="ap-southeast-2",n.CaCentral1="ca-central-1",n.EuCentral1="eu-central-1",n.EuWest1="eu-west-1",n.EuWest2="eu-west-2",n.EuWest3="eu-west-3",n.SaEast1="sa-east-1",n.UsEast1="us-east-1",n.UsWest1="us-west-1",n.UsWest2="us-west-2"})(Mi||(Mi={}));var Wm=function(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{c(s.next(u))}catch(h){o(h)}}function l(u){try{c(s.throw(u))}catch(h){o(h)}}function c(u){u.done?r(u.value):i(u.value).then(a,l)}c((s=s.apply(n,e||[])).next())})};class qm{constructor(e,{headers:t={},customFetch:s,region:i=Mi.Any}={}){this.url=e,this.headers=t,this.region=i,this.fetch=Bm(s)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e,t={}){var s;return Wm(this,void 0,void 0,function*(){try{const{headers:i,method:r,body:o}=t;let a={},{region:l}=t;l||(l=this.region);const c=new URL(`${this.url}/${e}`);l&&l!=="any"&&(a["x-region"]=l,c.searchParams.set("forceFunctionRegion",l));let u;o&&(i&&!Object.prototype.hasOwnProperty.call(i,"Content-Type")||!i)&&(typeof Blob<"u"&&o instanceof Blob||o instanceof ArrayBuffer?(a["Content-Type"]="application/octet-stream",u=o):typeof o=="string"?(a["Content-Type"]="text/plain",u=o):typeof FormData<"u"&&o instanceof FormData?u=o:(a["Content-Type"]="application/json",u=JSON.stringify(o)));const h=yield this.fetch(c.toString(),{method:r||"POST",headers:Object.assign(Object.assign(Object.assign({},a),this.headers),i),body:u}).catch(S=>{throw new Vm(S)}),d=h.headers.get("x-relay-error");if(d&&d==="true")throw new pa(h);if(!h.ok)throw new ga(h);let v=((s=h.headers.get("Content-Type"))!==null&&s!==void 0?s:"text/plain").split(";")[0].trim(),b;return v==="application/json"?b=yield h.json():v==="application/octet-stream"?b=yield h.blob():v==="text/event-stream"?b=h:v==="multipart/form-data"?b=yield h.formData():b=yield h.text(),{data:b,error:null,response:h}}catch(i){return{data:null,error:i,response:i instanceof ga||i instanceof pa?i.context:void 0}}})}}function Hm(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}function zm(n){if(Object.prototype.hasOwnProperty.call(n,"__esModule"))return n;var e=n.default;if(typeof e=="function"){var t=function s(){var i=!1;try{i=this instanceof s}catch{}return i?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};t.prototype=e.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(n).forEach(function(s){var i=Object.getOwnPropertyDescriptor(n,s);Object.defineProperty(t,s,i.get?i:{enumerable:!0,get:function(){return n[s]}})}),t}var X={},At={},Rt={},Pt={},Ot={},Nt={},Km=function(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("unable to locate global object")},Kt=Km();const Gm=Kt.fetch,ru=Kt.fetch.bind(Kt),ou=Kt.Headers,Ym=Kt.Request,Jm=Kt.Response,Zt=Object.freeze(Object.defineProperty({__proto__:null,Headers:ou,Request:Ym,Response:Jm,default:ru,fetch:Gm},Symbol.toStringTag,{value:"Module"})),Qm=zm(Zt);var qn={},_a;function au(){if(_a)return qn;_a=1,Object.defineProperty(qn,"__esModule",{value:!0});class n extends Error{constructor(t){super(t.message),this.name="PostgrestError",this.details=t.details,this.hint=t.hint,this.code=t.code}}return qn.default=n,qn}var ma;function lu(){if(ma)return Nt;ma=1;var n=Nt&&Nt.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(Nt,"__esModule",{value:!0});const e=n(Qm),t=n(au());class s{constructor(r){this.shouldThrowOnError=!1,this.method=r.method,this.url=r.url,this.headers=r.headers,this.schema=r.schema,this.body=r.body,this.shouldThrowOnError=r.shouldThrowOnError,this.signal=r.signal,this.isMaybeSingle=r.isMaybeSingle,r.fetch?this.fetch=r.fetch:typeof fetch>"u"?this.fetch=e.default:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(r,o){return this.headers=Object.assign({},this.headers),this.headers[r]=o,this}then(r,o){this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers["Accept-Profile"]=this.schema:this.headers["Content-Profile"]=this.schema),this.method!=="GET"&&this.method!=="HEAD"&&(this.headers["Content-Type"]="application/json");const a=this.fetch;let l=a(this.url.toString(),{method:this.method,headers:this.headers,body:JSON.stringify(this.body),signal:this.signal}).then(async c=>{var u,h,d;let v=null,b=null,S=null,E=c.status,A=c.statusText;if(c.ok){if(this.method!=="HEAD"){const B=await c.text();B===""||(this.headers.Accept==="text/csv"||this.headers.Accept&&this.headers.Accept.includes("application/vnd.pgrst.plan+text")?b=B:b=JSON.parse(B))}const I=(u=this.headers.Prefer)===null||u===void 0?void 0:u.match(/count=(exact|planned|estimated)/),C=(h=c.headers.get("content-range"))===null||h===void 0?void 0:h.split("/");I&&C&&C.length>1&&(S=parseInt(C[1])),this.isMaybeSingle&&this.method==="GET"&&Array.isArray(b)&&(b.length>1?(v={code:"PGRST116",details:`Results contain ${b.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},b=null,S=null,E=406,A="Not Acceptable"):b.length===1?b=b[0]:b=null)}else{const I=await c.text();try{v=JSON.parse(I),Array.isArray(v)&&c.status===404&&(b=[],v=null,E=200,A="OK")}catch{c.status===404&&I===""?(E=204,A="No Content"):v={message:I}}if(v&&this.isMaybeSingle&&(!((d=v?.details)===null||d===void 0)&&d.includes("0 rows"))&&(v=null,E=200,A="OK"),v&&this.shouldThrowOnError)throw new t.default(v)}return{error:v,data:b,count:S,status:E,statusText:A}});return this.shouldThrowOnError||(l=l.catch(c=>{var u,h,d;return{error:{message:`${(u=c?.name)!==null&&u!==void 0?u:"FetchError"}: ${c?.message}`,details:`${(h=c?.stack)!==null&&h!==void 0?h:""}`,hint:"",code:`${(d=c?.code)!==null&&d!==void 0?d:""}`},data:null,count:null,status:0,statusText:""}})),l.then(r,o)}returns(){return this}overrideTypes(){return this}}return Nt.default=s,Nt}var ya;function cu(){if(ya)return Ot;ya=1;var n=Ot&&Ot.__importDefault||function(s){return s&&s.__esModule?s:{default:s}};Object.defineProperty(Ot,"__esModule",{value:!0});const e=n(lu());class t extends e.default{select(i){let r=!1;const o=(i??"*").split("").map(a=>/\s/.test(a)&&!r?"":(a==='"'&&(r=!r),a)).join("");return this.url.searchParams.set("select",o),this.headers.Prefer&&(this.headers.Prefer+=","),this.headers.Prefer+="return=representation",this}order(i,{ascending:r=!0,nullsFirst:o,foreignTable:a,referencedTable:l=a}={}){const c=l?`${l}.order`:"order",u=this.url.searchParams.get(c);return this.url.searchParams.set(c,`${u?`${u},`:""}${i}.${r?"asc":"desc"}${o===void 0?"":o?".nullsfirst":".nullslast"}`),this}limit(i,{foreignTable:r,referencedTable:o=r}={}){const a=typeof o>"u"?"limit":`${o}.limit`;return this.url.searchParams.set(a,`${i}`),this}range(i,r,{foreignTable:o,referencedTable:a=o}={}){const l=typeof a>"u"?"offset":`${a}.offset`,c=typeof a>"u"?"limit":`${a}.limit`;return this.url.searchParams.set(l,`${i}`),this.url.searchParams.set(c,`${r-i+1}`),this}abortSignal(i){return this.signal=i,this}single(){return this.headers.Accept="application/vnd.pgrst.object+json",this}maybeSingle(){return this.method==="GET"?this.headers.Accept="application/json":this.headers.Accept="application/vnd.pgrst.object+json",this.isMaybeSingle=!0,this}csv(){return this.headers.Accept="text/csv",this}geojson(){return this.headers.Accept="application/geo+json",this}explain({analyze:i=!1,verbose:r=!1,settings:o=!1,buffers:a=!1,wal:l=!1,format:c="text"}={}){var u;const h=[i?"analyze":null,r?"verbose":null,o?"settings":null,a?"buffers":null,l?"wal":null].filter(Boolean).join("|"),d=(u=this.headers.Accept)!==null&&u!==void 0?u:"application/json";return this.headers.Accept=`application/vnd.pgrst.plan+${c}; for="${d}"; options=${h};`,c==="json"?this:this}rollback(){var i;return((i=this.headers.Prefer)!==null&&i!==void 0?i:"").trim().length>0?this.headers.Prefer+=",tx=rollback":this.headers.Prefer="tx=rollback",this}returns(){return this}}return Ot.default=t,Ot}var va;function Vr(){if(va)return Pt;va=1;var n=Pt&&Pt.__importDefault||function(s){return s&&s.__esModule?s:{default:s}};Object.defineProperty(Pt,"__esModule",{value:!0});const e=n(cu());class t extends e.default{eq(i,r){return this.url.searchParams.append(i,`eq.${r}`),this}neq(i,r){return this.url.searchParams.append(i,`neq.${r}`),this}gt(i,r){return this.url.searchParams.append(i,`gt.${r}`),this}gte(i,r){return this.url.searchParams.append(i,`gte.${r}`),this}lt(i,r){return this.url.searchParams.append(i,`lt.${r}`),this}lte(i,r){return this.url.searchParams.append(i,`lte.${r}`),this}like(i,r){return this.url.searchParams.append(i,`like.${r}`),this}likeAllOf(i,r){return this.url.searchParams.append(i,`like(all).{${r.join(",")}}`),this}likeAnyOf(i,r){return this.url.searchParams.append(i,`like(any).{${r.join(",")}}`),this}ilike(i,r){return this.url.searchParams.append(i,`ilike.${r}`),this}ilikeAllOf(i,r){return this.url.searchParams.append(i,`ilike(all).{${r.join(",")}}`),this}ilikeAnyOf(i,r){return this.url.searchParams.append(i,`ilike(any).{${r.join(",")}}`),this}is(i,r){return this.url.searchParams.append(i,`is.${r}`),this}in(i,r){const o=Array.from(new Set(r)).map(a=>typeof a=="string"&&new RegExp("[,()]").test(a)?`"${a}"`:`${a}`).join(",");return this.url.searchParams.append(i,`in.(${o})`),this}contains(i,r){return typeof r=="string"?this.url.searchParams.append(i,`cs.${r}`):Array.isArray(r)?this.url.searchParams.append(i,`cs.{${r.join(",")}}`):this.url.searchParams.append(i,`cs.${JSON.stringify(r)}`),this}containedBy(i,r){return typeof r=="string"?this.url.searchParams.append(i,`cd.${r}`):Array.isArray(r)?this.url.searchParams.append(i,`cd.{${r.join(",")}}`):this.url.searchParams.append(i,`cd.${JSON.stringify(r)}`),this}rangeGt(i,r){return this.url.searchParams.append(i,`sr.${r}`),this}rangeGte(i,r){return this.url.searchParams.append(i,`nxl.${r}`),this}rangeLt(i,r){return this.url.searchParams.append(i,`sl.${r}`),this}rangeLte(i,r){return this.url.searchParams.append(i,`nxr.${r}`),this}rangeAdjacent(i,r){return this.url.searchParams.append(i,`adj.${r}`),this}overlaps(i,r){return typeof r=="string"?this.url.searchParams.append(i,`ov.${r}`):this.url.searchParams.append(i,`ov.{${r.join(",")}}`),this}textSearch(i,r,{config:o,type:a}={}){let l="";a==="plain"?l="pl":a==="phrase"?l="ph":a==="websearch"&&(l="w");const c=o===void 0?"":`(${o})`;return this.url.searchParams.append(i,`${l}fts${c}.${r}`),this}match(i){return Object.entries(i).forEach(([r,o])=>{this.url.searchParams.append(r,`eq.${o}`)}),this}not(i,r,o){return this.url.searchParams.append(i,`not.${r}.${o}`),this}or(i,{foreignTable:r,referencedTable:o=r}={}){const a=o?`${o}.or`:"or";return this.url.searchParams.append(a,`(${i})`),this}filter(i,r,o){return this.url.searchParams.append(i,`${r}.${o}`),this}}return Pt.default=t,Pt}var wa;function uu(){if(wa)return Rt;wa=1;var n=Rt&&Rt.__importDefault||function(s){return s&&s.__esModule?s:{default:s}};Object.defineProperty(Rt,"__esModule",{value:!0});const e=n(Vr());class t{constructor(i,{headers:r={},schema:o,fetch:a}){this.url=i,this.headers=r,this.schema=o,this.fetch=a}select(i,{head:r=!1,count:o}={}){const a=r?"HEAD":"GET";let l=!1;const c=(i??"*").split("").map(u=>/\s/.test(u)&&!l?"":(u==='"'&&(l=!l),u)).join("");return this.url.searchParams.set("select",c),o&&(this.headers.Prefer=`count=${o}`),new e.default({method:a,url:this.url,headers:this.headers,schema:this.schema,fetch:this.fetch,allowEmpty:!1})}insert(i,{count:r,defaultToNull:o=!0}={}){const a="POST",l=[];if(this.headers.Prefer&&l.push(this.headers.Prefer),r&&l.push(`count=${r}`),o||l.push("missing=default"),this.headers.Prefer=l.join(","),Array.isArray(i)){const c=i.reduce((u,h)=>u.concat(Object.keys(h)),[]);if(c.length>0){const u=[...new Set(c)].map(h=>`"${h}"`);this.url.searchParams.set("columns",u.join(","))}}return new e.default({method:a,url:this.url,headers:this.headers,schema:this.schema,body:i,fetch:this.fetch,allowEmpty:!1})}upsert(i,{onConflict:r,ignoreDuplicates:o=!1,count:a,defaultToNull:l=!0}={}){const c="POST",u=[`resolution=${o?"ignore":"merge"}-duplicates`];if(r!==void 0&&this.url.searchParams.set("on_conflict",r),this.headers.Prefer&&u.push(this.headers.Prefer),a&&u.push(`count=${a}`),l||u.push("missing=default"),this.headers.Prefer=u.join(","),Array.isArray(i)){const h=i.reduce((d,v)=>d.concat(Object.keys(v)),[]);if(h.length>0){const d=[...new Set(h)].map(v=>`"${v}"`);this.url.searchParams.set("columns",d.join(","))}}return new e.default({method:c,url:this.url,headers:this.headers,schema:this.schema,body:i,fetch:this.fetch,allowEmpty:!1})}update(i,{count:r}={}){const o="PATCH",a=[];return this.headers.Prefer&&a.push(this.headers.Prefer),r&&a.push(`count=${r}`),this.headers.Prefer=a.join(","),new e.default({method:o,url:this.url,headers:this.headers,schema:this.schema,body:i,fetch:this.fetch,allowEmpty:!1})}delete({count:i}={}){const r="DELETE",o=[];return i&&o.push(`count=${i}`),this.headers.Prefer&&o.unshift(this.headers.Prefer),this.headers.Prefer=o.join(","),new e.default({method:r,url:this.url,headers:this.headers,schema:this.schema,fetch:this.fetch,allowEmpty:!1})}}return Rt.default=t,Rt}var rn={},on={},ba;function Xm(){return ba||(ba=1,Object.defineProperty(on,"__esModule",{value:!0}),on.version=void 0,on.version="0.0.0-automated"),on}var Ea;function Zm(){if(Ea)return rn;Ea=1,Object.defineProperty(rn,"__esModule",{value:!0}),rn.DEFAULT_HEADERS=void 0;const n=Xm();return rn.DEFAULT_HEADERS={"X-Client-Info":`postgrest-js/${n.version}`},rn}var Sa;function ey(){if(Sa)return At;Sa=1;var n=At&&At.__importDefault||function(r){return r&&r.__esModule?r:{default:r}};Object.defineProperty(At,"__esModule",{value:!0});const e=n(uu()),t=n(Vr()),s=Zm();class i{constructor(o,{headers:a={},schema:l,fetch:c}={}){this.url=o,this.headers=Object.assign(Object.assign({},s.DEFAULT_HEADERS),a),this.schemaName=l,this.fetch=c}from(o){const a=new URL(`${this.url}/${o}`);return new e.default(a,{headers:Object.assign({},this.headers),schema:this.schemaName,fetch:this.fetch})}schema(o){return new i(this.url,{headers:this.headers,schema:o,fetch:this.fetch})}rpc(o,a={},{head:l=!1,get:c=!1,count:u}={}){let h;const d=new URL(`${this.url}/rpc/${o}`);let v;l||c?(h=l?"HEAD":"GET",Object.entries(a).filter(([S,E])=>E!==void 0).map(([S,E])=>[S,Array.isArray(E)?`{${E.join(",")}}`:`${E}`]).forEach(([S,E])=>{d.searchParams.append(S,E)})):(h="POST",v=a);const b=Object.assign({},this.headers);return u&&(b.Prefer=`count=${u}`),new t.default({method:h,url:d,headers:b,schema:this.schemaName,body:v,fetch:this.fetch,allowEmpty:!1})}}return At.default=i,At}var Ta;function ty(){if(Ta)return X;Ta=1;var n=X&&X.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(X,"__esModule",{value:!0}),X.PostgrestError=X.PostgrestBuilder=X.PostgrestTransformBuilder=X.PostgrestFilterBuilder=X.PostgrestQueryBuilder=X.PostgrestClient=void 0;const e=n(ey());X.PostgrestClient=e.default;const t=n(uu());X.PostgrestQueryBuilder=t.default;const s=n(Vr());X.PostgrestFilterBuilder=s.default;const i=n(cu());X.PostgrestTransformBuilder=i.default;const r=n(lu());X.PostgrestBuilder=r.default;const o=n(au());return X.PostgrestError=o.default,X.default={PostgrestClient:e.default,PostgrestQueryBuilder:t.default,PostgrestFilterBuilder:s.default,PostgrestTransformBuilder:i.default,PostgrestBuilder:r.default,PostgrestError:o.default},X}var ny=ty();const sy=Hm(ny),{PostgrestClient:iy,PostgrestQueryBuilder:ow,PostgrestFilterBuilder:aw,PostgrestTransformBuilder:lw,PostgrestBuilder:cw,PostgrestError:uw}=sy;function ry(){if(typeof WebSocket<"u")return WebSocket;if(typeof global.WebSocket<"u")return global.WebSocket;if(typeof window.WebSocket<"u")return window.WebSocket;if(typeof self.WebSocket<"u")return self.WebSocket;throw new Error("`WebSocket` is not supported in this environment")}const oy=ry(),ay="2.11.15",ly=`realtime-js/${ay}`,cy="1.0.0",hu=1e4,uy=1e3;var gn;(function(n){n[n.connecting=0]="connecting",n[n.open=1]="open",n[n.closing=2]="closing",n[n.closed=3]="closed"})(gn||(gn={}));var se;(function(n){n.closed="closed",n.errored="errored",n.joined="joined",n.joining="joining",n.leaving="leaving"})(se||(se={}));var ye;(function(n){n.close="phx_close",n.error="phx_error",n.join="phx_join",n.reply="phx_reply",n.leave="phx_leave",n.access_token="access_token"})(ye||(ye={}));var ji;(function(n){n.websocket="websocket"})(ji||(ji={}));var dt;(function(n){n.Connecting="connecting",n.Open="open",n.Closing="closing",n.Closed="closed"})(dt||(dt={}));class hy{constructor(){this.HEADER_LENGTH=1}decode(e,t){return e.constructor===ArrayBuffer?t(this._binaryDecode(e)):t(typeof e=="string"?JSON.parse(e):{})}_binaryDecode(e){const t=new DataView(e),s=new TextDecoder;return this._decodeBroadcast(e,t,s)}_decodeBroadcast(e,t,s){const i=t.getUint8(1),r=t.getUint8(2);let o=this.HEADER_LENGTH+2;const a=s.decode(e.slice(o,o+i));o=o+i;const l=s.decode(e.slice(o,o+r));o=o+r;const c=JSON.parse(s.decode(e.slice(o,e.byteLength)));return{ref:null,topic:a,event:l,payload:c}}}class du{constructor(e,t){this.callback=e,this.timerCalc=t,this.timer=void 0,this.tries=0,this.callback=e,this.timerCalc=t}reset(){this.tries=0,clearTimeout(this.timer)}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}}var q;(function(n){n.abstime="abstime",n.bool="bool",n.date="date",n.daterange="daterange",n.float4="float4",n.float8="float8",n.int2="int2",n.int4="int4",n.int4range="int4range",n.int8="int8",n.int8range="int8range",n.json="json",n.jsonb="jsonb",n.money="money",n.numeric="numeric",n.oid="oid",n.reltime="reltime",n.text="text",n.time="time",n.timestamp="timestamp",n.timestamptz="timestamptz",n.timetz="timetz",n.tsrange="tsrange",n.tstzrange="tstzrange"})(q||(q={}));const Ia=(n,e,t={})=>{var s;const i=(s=t.skipTypes)!==null&&s!==void 0?s:[];return Object.keys(e).reduce((r,o)=>(r[o]=dy(o,n,e,i),r),{})},dy=(n,e,t,s)=>{const i=e.find(a=>a.name===n),r=i?.type,o=t[n];return r&&!s.includes(r)?fu(r,o):Fi(o)},fu=(n,e)=>{if(n.charAt(0)==="_"){const t=n.slice(1,n.length);return _y(e,t)}switch(n){case q.bool:return fy(e);case q.float4:case q.float8:case q.int2:case q.int4:case q.int8:case q.numeric:case q.oid:return py(e);case q.json:case q.jsonb:return gy(e);case q.timestamp:return my(e);case q.abstime:case q.date:case q.daterange:case q.int4range:case q.int8range:case q.money:case q.reltime:case q.text:case q.time:case q.timestamptz:case q.timetz:case q.tsrange:case q.tstzrange:return Fi(e);default:return Fi(e)}},Fi=n=>n,fy=n=>{switch(n){case"t":return!0;case"f":return!1;default:return n}},py=n=>{if(typeof n=="string"){const e=parseFloat(n);if(!Number.isNaN(e))return e}return n},gy=n=>{if(typeof n=="string")try{return JSON.parse(n)}catch(e){return console.log(`JSON parse error: ${e}`),n}return n},_y=(n,e)=>{if(typeof n!="string")return n;const t=n.length-1,s=n[t];if(n[0]==="{"&&s==="}"){let r;const o=n.slice(1,t);try{r=JSON.parse("["+o+"]")}catch{r=o?o.split(","):[]}return r.map(a=>fu(e,a))}return n},my=n=>typeof n=="string"?n.replace(" ","T"):n,pu=n=>{let e=n;return e=e.replace(/^ws/i,"http"),e=e.replace(/(\/socket\/websocket|\/socket|\/websocket)\/?$/i,""),e.replace(/\/+$/,"")};class ui{constructor(e,t,s={},i=hu){this.channel=e,this.event=t,this.payload=s,this.timeout=i,this.sent=!1,this.timeoutTimer=void 0,this.ref="",this.receivedResp=null,this.recHooks=[],this.refEvent=null}resend(e){this.timeout=e,this._cancelRefEvent(),this.ref="",this.refEvent=null,this.receivedResp=null,this.sent=!1,this.send()}send(){this._hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload,ref:this.ref,join_ref:this.channel._joinRef()}))}updatePayload(e){this.payload=Object.assign(Object.assign({},this.payload),e)}receive(e,t){var s;return this._hasReceived(e)&&t((s=this.receivedResp)===null||s===void 0?void 0:s.response),this.recHooks.push({status:e,callback:t}),this}startTimeout(){if(this.timeoutTimer)return;this.ref=this.channel.socket._makeRef(),this.refEvent=this.channel._replyEventName(this.ref);const e=t=>{this._cancelRefEvent(),this._cancelTimeout(),this.receivedResp=t,this._matchReceive(t)};this.channel._on(this.refEvent,{},e),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}trigger(e,t){this.refEvent&&this.channel._trigger(this.refEvent,{status:e,response:t})}destroy(){this._cancelRefEvent(),this._cancelTimeout()}_cancelRefEvent(){this.refEvent&&this.channel._off(this.refEvent,{})}_cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=void 0}_matchReceive({status:e,response:t}){this.recHooks.filter(s=>s.status===e).forEach(s=>s.callback(t))}_hasReceived(e){return this.receivedResp&&this.receivedResp.status===e}}var Ca;(function(n){n.SYNC="sync",n.JOIN="join",n.LEAVE="leave"})(Ca||(Ca={}));class _n{constructor(e,t){this.channel=e,this.state={},this.pendingDiffs=[],this.joinRef=null,this.caller={onJoin:()=>{},onLeave:()=>{},onSync:()=>{}};const s=t?.events||{state:"presence_state",diff:"presence_diff"};this.channel._on(s.state,{},i=>{const{onJoin:r,onLeave:o,onSync:a}=this.caller;this.joinRef=this.channel._joinRef(),this.state=_n.syncState(this.state,i,r,o),this.pendingDiffs.forEach(l=>{this.state=_n.syncDiff(this.state,l,r,o)}),this.pendingDiffs=[],a()}),this.channel._on(s.diff,{},i=>{const{onJoin:r,onLeave:o,onSync:a}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(i):(this.state=_n.syncDiff(this.state,i,r,o),a())}),this.onJoin((i,r,o)=>{this.channel._trigger("presence",{event:"join",key:i,currentPresences:r,newPresences:o})}),this.onLeave((i,r,o)=>{this.channel._trigger("presence",{event:"leave",key:i,currentPresences:r,leftPresences:o})}),this.onSync(()=>{this.channel._trigger("presence",{event:"sync"})})}static syncState(e,t,s,i){const r=this.cloneDeep(e),o=this.transformState(t),a={},l={};return this.map(r,(c,u)=>{o[c]||(l[c]=u)}),this.map(o,(c,u)=>{const h=r[c];if(h){const d=u.map(E=>E.presence_ref),v=h.map(E=>E.presence_ref),b=u.filter(E=>v.indexOf(E.presence_ref)<0),S=h.filter(E=>d.indexOf(E.presence_ref)<0);b.length>0&&(a[c]=b),S.length>0&&(l[c]=S)}else a[c]=u}),this.syncDiff(r,{joins:a,leaves:l},s,i)}static syncDiff(e,t,s,i){const{joins:r,leaves:o}={joins:this.transformState(t.joins),leaves:this.transformState(t.leaves)};return s||(s=()=>{}),i||(i=()=>{}),this.map(r,(a,l)=>{var c;const u=(c=e[a])!==null&&c!==void 0?c:[];if(e[a]=this.cloneDeep(l),u.length>0){const h=e[a].map(v=>v.presence_ref),d=u.filter(v=>h.indexOf(v.presence_ref)<0);e[a].unshift(...d)}s(a,u,l)}),this.map(o,(a,l)=>{let c=e[a];if(!c)return;const u=l.map(h=>h.presence_ref);c=c.filter(h=>u.indexOf(h.presence_ref)<0),e[a]=c,i(a,c,l),c.length===0&&delete e[a]}),e}static map(e,t){return Object.getOwnPropertyNames(e).map(s=>t(s,e[s]))}static transformState(e){return e=this.cloneDeep(e),Object.getOwnPropertyNames(e).reduce((t,s)=>{const i=e[s];return"metas"in i?t[s]=i.metas.map(r=>(r.presence_ref=r.phx_ref,delete r.phx_ref,delete r.phx_ref_prev,r)):t[s]=i,t},{})}static cloneDeep(e){return JSON.parse(JSON.stringify(e))}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel._joinRef()}}var ka;(function(n){n.ALL="*",n.INSERT="INSERT",n.UPDATE="UPDATE",n.DELETE="DELETE"})(ka||(ka={}));var Aa;(function(n){n.BROADCAST="broadcast",n.PRESENCE="presence",n.POSTGRES_CHANGES="postgres_changes",n.SYSTEM="system"})(Aa||(Aa={}));var Le;(function(n){n.SUBSCRIBED="SUBSCRIBED",n.TIMED_OUT="TIMED_OUT",n.CLOSED="CLOSED",n.CHANNEL_ERROR="CHANNEL_ERROR"})(Le||(Le={}));class Wr{constructor(e,t={config:{}},s){this.topic=e,this.params=t,this.socket=s,this.bindings={},this.state=se.closed,this.joinedOnce=!1,this.pushBuffer=[],this.subTopic=e.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:""},private:!1},t.config),this.timeout=this.socket.timeout,this.joinPush=new ui(this,ye.join,this.params,this.timeout),this.rejoinTimer=new du(()=>this._rejoinUntilConnected(),this.socket.reconnectAfterMs),this.joinPush.receive("ok",()=>{this.state=se.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(i=>i.send()),this.pushBuffer=[]}),this._onClose(()=>{this.rejoinTimer.reset(),this.socket.log("channel",`close ${this.topic} ${this._joinRef()}`),this.state=se.closed,this.socket._remove(this)}),this._onError(i=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,i),this.state=se.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("timeout",()=>{this._isJoining()&&(this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),this.state=se.errored,this.rejoinTimer.scheduleTimeout())}),this._on(ye.reply,{},(i,r)=>{this._trigger(this._replyEventName(r),i)}),this.presence=new _n(this),this.broadcastEndpointURL=pu(this.socket.endPoint)+"/api/broadcast",this.private=this.params.config.private||!1}subscribe(e,t=this.timeout){var s,i;if(this.socket.isConnected()||this.socket.connect(),this.state==se.closed){const{config:{broadcast:r,presence:o,private:a}}=this.params;this._onError(u=>e?.(Le.CHANNEL_ERROR,u)),this._onClose(()=>e?.(Le.CLOSED));const l={},c={broadcast:r,presence:o,postgres_changes:(i=(s=this.bindings.postgres_changes)===null||s===void 0?void 0:s.map(u=>u.filter))!==null&&i!==void 0?i:[],private:a};this.socket.accessTokenValue&&(l.access_token=this.socket.accessTokenValue),this.updateJoinPayload(Object.assign({config:c},l)),this.joinedOnce=!0,this._rejoin(t),this.joinPush.receive("ok",async({postgres_changes:u})=>{var h;if(this.socket.setAuth(),u===void 0){e?.(Le.SUBSCRIBED);return}else{const d=this.bindings.postgres_changes,v=(h=d?.length)!==null&&h!==void 0?h:0,b=[];for(let S=0;S<v;S++){const E=d[S],{filter:{event:A,schema:F,table:I,filter:C}}=E,B=u&&u[S];if(B&&B.event===A&&B.schema===F&&B.table===I&&B.filter===C)b.push(Object.assign(Object.assign({},E),{id:B.id}));else{this.unsubscribe(),this.state=se.errored,e?.(Le.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=b,e&&e(Le.SUBSCRIBED);return}}).receive("error",u=>{this.state=se.errored,e?.(Le.CHANNEL_ERROR,new Error(JSON.stringify(Object.values(u).join(", ")||"error")))}).receive("timeout",()=>{e?.(Le.TIMED_OUT)})}return this}presenceState(){return this.presence.state}async track(e,t={}){return await this.send({type:"presence",event:"track",payload:e},t.timeout||this.timeout)}async untrack(e={}){return await this.send({type:"presence",event:"untrack"},e)}on(e,t,s){return this._on(e,t,s)}async send(e,t={}){var s,i;if(!this._canPush()&&e.type==="broadcast"){const{event:r,payload:o}=e,l={method:"POST",headers:{Authorization:this.socket.accessTokenValue?`Bearer ${this.socket.accessTokenValue}`:"",apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"},body:JSON.stringify({messages:[{topic:this.subTopic,event:r,payload:o,private:this.private}]})};try{const c=await this._fetchWithTimeout(this.broadcastEndpointURL,l,(s=t.timeout)!==null&&s!==void 0?s:this.timeout);return await((i=c.body)===null||i===void 0?void 0:i.cancel()),c.ok?"ok":"error"}catch(c){return c.name==="AbortError"?"timed out":"error"}}else return new Promise(r=>{var o,a,l;const c=this._push(e.type,e,t.timeout||this.timeout);e.type==="broadcast"&&!(!((l=(a=(o=this.params)===null||o===void 0?void 0:o.config)===null||a===void 0?void 0:a.broadcast)===null||l===void 0)&&l.ack)&&r("ok"),c.receive("ok",()=>r("ok")),c.receive("error",()=>r("error")),c.receive("timeout",()=>r("timed out"))})}updateJoinPayload(e){this.joinPush.updatePayload(e)}unsubscribe(e=this.timeout){this.state=se.leaving;const t=()=>{this.socket.log("channel",`leave ${this.topic}`),this._trigger(ye.close,"leave",this._joinRef())};this.joinPush.destroy();let s=null;return new Promise(i=>{s=new ui(this,ye.leave,{},e),s.receive("ok",()=>{t(),i("ok")}).receive("timeout",()=>{t(),i("timed out")}).receive("error",()=>{i("error")}),s.send(),this._canPush()||s.trigger("ok",{})}).finally(()=>{s?.destroy()})}teardown(){this.pushBuffer.forEach(e=>e.destroy()),this.rejoinTimer&&clearTimeout(this.rejoinTimer.timer),this.joinPush.destroy()}async _fetchWithTimeout(e,t,s){const i=new AbortController,r=setTimeout(()=>i.abort(),s),o=await this.socket.fetch(e,Object.assign(Object.assign({},t),{signal:i.signal}));return clearTimeout(r),o}_push(e,t,s=this.timeout){if(!this.joinedOnce)throw`tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;let i=new ui(this,e,t,s);return this._canPush()?i.send():(i.startTimeout(),this.pushBuffer.push(i)),i}_onMessage(e,t,s){return t}_isMember(e){return this.topic===e}_joinRef(){return this.joinPush.ref}_trigger(e,t,s){var i,r;const o=e.toLocaleLowerCase(),{close:a,error:l,leave:c,join:u}=ye;if(s&&[a,l,c,u].indexOf(o)>=0&&s!==this._joinRef())return;let d=this._onMessage(o,t,s);if(t&&!d)throw"channel onMessage callbacks must return the payload, modified or unmodified";["insert","update","delete"].includes(o)?(i=this.bindings.postgres_changes)===null||i===void 0||i.filter(v=>{var b,S,E;return((b=v.filter)===null||b===void 0?void 0:b.event)==="*"||((E=(S=v.filter)===null||S===void 0?void 0:S.event)===null||E===void 0?void 0:E.toLocaleLowerCase())===o}).map(v=>v.callback(d,s)):(r=this.bindings[o])===null||r===void 0||r.filter(v=>{var b,S,E,A,F,I;if(["broadcast","presence","postgres_changes"].includes(o))if("id"in v){const C=v.id,B=(b=v.filter)===null||b===void 0?void 0:b.event;return C&&((S=t.ids)===null||S===void 0?void 0:S.includes(C))&&(B==="*"||B?.toLocaleLowerCase()===((E=t.data)===null||E===void 0?void 0:E.type.toLocaleLowerCase()))}else{const C=(F=(A=v?.filter)===null||A===void 0?void 0:A.event)===null||F===void 0?void 0:F.toLocaleLowerCase();return C==="*"||C===((I=t?.event)===null||I===void 0?void 0:I.toLocaleLowerCase())}else return v.type.toLocaleLowerCase()===o}).map(v=>{if(typeof d=="object"&&"ids"in d){const b=d.data,{schema:S,table:E,commit_timestamp:A,type:F,errors:I}=b;d=Object.assign(Object.assign({},{schema:S,table:E,commit_timestamp:A,eventType:F,new:{},old:{},errors:I}),this._getPayloadRecords(b))}v.callback(d,s)})}_isClosed(){return this.state===se.closed}_isJoined(){return this.state===se.joined}_isJoining(){return this.state===se.joining}_isLeaving(){return this.state===se.leaving}_replyEventName(e){return`chan_reply_${e}`}_on(e,t,s){const i=e.toLocaleLowerCase(),r={type:i,filter:t,callback:s};return this.bindings[i]?this.bindings[i].push(r):this.bindings[i]=[r],this}_off(e,t){const s=e.toLocaleLowerCase();return this.bindings[s]=this.bindings[s].filter(i=>{var r;return!(((r=i.type)===null||r===void 0?void 0:r.toLocaleLowerCase())===s&&Wr.isEqual(i.filter,t))}),this}static isEqual(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const s in e)if(e[s]!==t[s])return!1;return!0}_rejoinUntilConnected(){this.rejoinTimer.scheduleTimeout(),this.socket.isConnected()&&this._rejoin()}_onClose(e){this._on(ye.close,{},e)}_onError(e){this._on(ye.error,{},t=>e(t))}_canPush(){return this.socket.isConnected()&&this._isJoined()}_rejoin(e=this.timeout){this._isLeaving()||(this.socket._leaveOpenTopic(this.topic),this.state=se.joining,this.joinPush.resend(e))}_getPayloadRecords(e){const t={new:{},old:{}};return(e.type==="INSERT"||e.type==="UPDATE")&&(t.new=Ia(e.columns,e.record)),(e.type==="UPDATE"||e.type==="DELETE")&&(t.old=Ia(e.columns,e.old_record)),t}}const Ra=()=>{},yy=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;class vy{constructor(e,t){var s;this.accessTokenValue=null,this.apiKey=null,this.channels=new Array,this.endPoint="",this.httpEndpoint="",this.headers={},this.params={},this.timeout=hu,this.heartbeatIntervalMs=25e3,this.heartbeatTimer=void 0,this.pendingHeartbeatRef=null,this.heartbeatCallback=Ra,this.ref=0,this.logger=Ra,this.conn=null,this.sendBuffer=[],this.serializer=new hy,this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.accessToken=null,this._resolveFetch=r=>{let o;return r?o=r:typeof fetch>"u"?o=(...a)=>$n(async()=>{const{default:l}=await Promise.resolve().then(()=>Zt);return{default:l}},void 0).then(({default:l})=>l(...a)):o=fetch,(...a)=>o(...a)},this.endPoint=`${e}/${ji.websocket}`,this.httpEndpoint=pu(e),t?.transport?this.transport=t.transport:this.transport=null,t?.params&&(this.params=t.params),t?.timeout&&(this.timeout=t.timeout),t?.logger&&(this.logger=t.logger),(t?.logLevel||t?.log_level)&&(this.logLevel=t.logLevel||t.log_level,this.params=Object.assign(Object.assign({},this.params),{log_level:this.logLevel})),t?.heartbeatIntervalMs&&(this.heartbeatIntervalMs=t.heartbeatIntervalMs);const i=(s=t?.params)===null||s===void 0?void 0:s.apikey;if(i&&(this.accessTokenValue=i,this.apiKey=i),this.reconnectAfterMs=t?.reconnectAfterMs?t.reconnectAfterMs:r=>[1e3,2e3,5e3,1e4][r-1]||1e4,this.encode=t?.encode?t.encode:(r,o)=>o(JSON.stringify(r)),this.decode=t?.decode?t.decode:this.serializer.decode.bind(this.serializer),this.reconnectTimer=new du(async()=>{this.disconnect(),this.connect()},this.reconnectAfterMs),this.fetch=this._resolveFetch(t?.fetch),t?.worker){if(typeof window<"u"&&!window.Worker)throw new Error("Web Worker is not supported");this.worker=t?.worker||!1,this.workerUrl=t?.workerUrl}this.accessToken=t?.accessToken||null}connect(){if(!this.conn){if(this.transport||(this.transport=oy),!this.transport)throw new Error("No transport provided");this.conn=new this.transport(this.endpointURL()),this.setupConnection()}}endpointURL(){return this._appendParams(this.endPoint,Object.assign({},this.params,{vsn:cy}))}disconnect(e,t){this.conn&&(this.conn.onclose=function(){},e?this.conn.close(e,t??""):this.conn.close(),this.conn=null,this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.reconnectTimer.reset(),this.channels.forEach(s=>s.teardown()))}getChannels(){return this.channels}async removeChannel(e){const t=await e.unsubscribe();return this.channels.length===0&&this.disconnect(),t}async removeAllChannels(){const e=await Promise.all(this.channels.map(t=>t.unsubscribe()));return this.channels=[],this.disconnect(),e}log(e,t,s){this.logger(e,t,s)}connectionState(){switch(this.conn&&this.conn.readyState){case gn.connecting:return dt.Connecting;case gn.open:return dt.Open;case gn.closing:return dt.Closing;default:return dt.Closed}}isConnected(){return this.connectionState()===dt.Open}channel(e,t={config:{}}){const s=`realtime:${e}`,i=this.getChannels().find(r=>r.topic===s);if(i)return i;{const r=new Wr(`realtime:${e}`,t,this);return this.channels.push(r),r}}push(e){const{topic:t,event:s,payload:i,ref:r}=e,o=()=>{this.encode(e,a=>{var l;(l=this.conn)===null||l===void 0||l.send(a)})};this.log("push",`${t} ${s} (${r})`,i),this.isConnected()?o():this.sendBuffer.push(o)}async setAuth(e=null){let t=e||this.accessToken&&await this.accessToken()||this.accessTokenValue;this.accessTokenValue!=t&&(this.accessTokenValue=t,this.channels.forEach(s=>{const i={access_token:t,version:ly};t&&s.updateJoinPayload(i),s.joinedOnce&&s._isJoined()&&s._push(ye.access_token,{access_token:t})}))}async sendHeartbeat(){var e;if(!this.isConnected()){this.heartbeatCallback("disconnected");return}if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.log("transport","heartbeat timeout. Attempting to re-establish connection"),this.heartbeatCallback("timeout"),(e=this.conn)===null||e===void 0||e.close(uy,"hearbeat timeout");return}this.pendingHeartbeatRef=this._makeRef(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef}),this.heartbeatCallback("sent"),await this.setAuth()}onHeartbeat(e){this.heartbeatCallback=e}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(e=>e()),this.sendBuffer=[])}_makeRef(){let e=this.ref+1;return e===this.ref?this.ref=0:this.ref=e,this.ref.toString()}_leaveOpenTopic(e){let t=this.channels.find(s=>s.topic===e&&(s._isJoined()||s._isJoining()));t&&(this.log("transport",`leaving duplicate topic "${e}"`),t.unsubscribe())}_remove(e){this.channels=this.channels.filter(t=>t.topic!==e.topic)}setupConnection(){this.conn&&(this.conn.binaryType="arraybuffer",this.conn.onopen=()=>this._onConnOpen(),this.conn.onerror=e=>this._onConnError(e),this.conn.onmessage=e=>this._onConnMessage(e),this.conn.onclose=e=>this._onConnClose(e))}_onConnMessage(e){this.decode(e.data,t=>{let{topic:s,event:i,payload:r,ref:o}=t;s==="phoenix"&&i==="phx_reply"&&this.heartbeatCallback(t.payload.status=="ok"?"ok":"error"),o&&o===this.pendingHeartbeatRef&&(this.pendingHeartbeatRef=null),this.log("receive",`${r.status||""} ${s} ${i} ${o&&"("+o+")"||""}`,r),Array.from(this.channels).filter(a=>a._isMember(s)).forEach(a=>a._trigger(i,r,o)),this.stateChangeCallbacks.message.forEach(a=>a(t))})}_onConnOpen(){this.log("transport",`connected to ${this.endpointURL()}`),this.flushSendBuffer(),this.reconnectTimer.reset(),this.worker?this.workerRef||this._startWorkerHeartbeat():this._startHeartbeat(),this.stateChangeCallbacks.open.forEach(e=>e())}_startHeartbeat(){this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval(()=>this.sendHeartbeat(),this.heartbeatIntervalMs)}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=t=>{this.log("worker","worker error",t.message),this.workerRef.terminate()},this.workerRef.onmessage=t=>{t.data.event==="keepAlive"&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_onConnClose(e){this.log("transport","close",e),this._triggerChanError(),this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.reconnectTimer.scheduleTimeout(),this.stateChangeCallbacks.close.forEach(t=>t(e))}_onConnError(e){this.log("transport",`${e}`),this._triggerChanError(),this.stateChangeCallbacks.error.forEach(t=>t(e))}_triggerChanError(){this.channels.forEach(e=>e._trigger(ye.error))}_appendParams(e,t){if(Object.keys(t).length===0)return e;const s=e.match(/\?/)?"&":"?",i=new URLSearchParams(t);return`${e}${s}${i}`}_workerObjectUrl(e){let t;if(e)t=e;else{const s=new Blob([yy],{type:"application/javascript"});t=URL.createObjectURL(s)}return t}}class qr extends Error{constructor(e){super(e),this.__isStorageError=!0,this.name="StorageError"}}function Z(n){return typeof n=="object"&&n!==null&&"__isStorageError"in n}class wy extends qr{constructor(e,t){super(e),this.name="StorageApiError",this.status=t}toJSON(){return{name:this.name,message:this.message,status:this.status}}}class $i extends qr{constructor(e,t){super(e),this.name="StorageUnknownError",this.originalError=t}}var by=function(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{c(s.next(u))}catch(h){o(h)}}function l(u){try{c(s.throw(u))}catch(h){o(h)}}function c(u){u.done?r(u.value):i(u.value).then(a,l)}c((s=s.apply(n,e||[])).next())})};const gu=n=>{let e;return n?e=n:typeof fetch>"u"?e=(...t)=>$n(async()=>{const{default:s}=await Promise.resolve().then(()=>Zt);return{default:s}},void 0).then(({default:s})=>s(...t)):e=fetch,(...t)=>e(...t)},Ey=()=>by(void 0,void 0,void 0,function*(){return typeof Response>"u"?(yield $n(()=>Promise.resolve().then(()=>Zt),void 0)).Response:Response}),Ui=n=>{if(Array.isArray(n))return n.map(t=>Ui(t));if(typeof n=="function"||n!==Object(n))return n;const e={};return Object.entries(n).forEach(([t,s])=>{const i=t.replace(/([-_][a-z])/gi,r=>r.toUpperCase().replace(/[-_]/g,""));e[i]=Ui(s)}),e};var Ct=function(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{c(s.next(u))}catch(h){o(h)}}function l(u){try{c(s.throw(u))}catch(h){o(h)}}function c(u){u.done?r(u.value):i(u.value).then(a,l)}c((s=s.apply(n,e||[])).next())})};const hi=n=>n.msg||n.message||n.error_description||n.error||JSON.stringify(n),Sy=(n,e,t)=>Ct(void 0,void 0,void 0,function*(){const s=yield Ey();n instanceof s&&!t?.noResolveJson?n.json().then(i=>{e(new wy(hi(i),n.status||500))}).catch(i=>{e(new $i(hi(i),i))}):e(new $i(hi(n),n))}),Ty=(n,e,t,s)=>{const i={method:n,headers:e?.headers||{}};return n==="GET"?i:(i.headers=Object.assign({"Content-Type":"application/json"},e?.headers),s&&(i.body=JSON.stringify(s)),Object.assign(Object.assign({},i),t))};function Un(n,e,t,s,i,r){return Ct(this,void 0,void 0,function*(){return new Promise((o,a)=>{n(t,Ty(e,s,i,r)).then(l=>{if(!l.ok)throw l;return s?.noResolveJson?l:l.json()}).then(l=>o(l)).catch(l=>Sy(l,a,s))})})}function vs(n,e,t,s){return Ct(this,void 0,void 0,function*(){return Un(n,"GET",e,t,s)})}function Ke(n,e,t,s,i){return Ct(this,void 0,void 0,function*(){return Un(n,"POST",e,s,i,t)})}function Iy(n,e,t,s,i){return Ct(this,void 0,void 0,function*(){return Un(n,"PUT",e,s,i,t)})}function Cy(n,e,t,s){return Ct(this,void 0,void 0,function*(){return Un(n,"HEAD",e,Object.assign(Object.assign({},t),{noResolveJson:!0}),s)})}function _u(n,e,t,s,i){return Ct(this,void 0,void 0,function*(){return Un(n,"DELETE",e,s,i,t)})}var le=function(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{c(s.next(u))}catch(h){o(h)}}function l(u){try{c(s.throw(u))}catch(h){o(h)}}function c(u){u.done?r(u.value):i(u.value).then(a,l)}c((s=s.apply(n,e||[])).next())})};const ky={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},Pa={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};class Ay{constructor(e,t={},s,i){this.url=e,this.headers=t,this.bucketId=s,this.fetch=gu(i)}uploadOrUpdate(e,t,s,i){return le(this,void 0,void 0,function*(){try{let r;const o=Object.assign(Object.assign({},Pa),i);let a=Object.assign(Object.assign({},this.headers),e==="POST"&&{"x-upsert":String(o.upsert)});const l=o.metadata;typeof Blob<"u"&&s instanceof Blob?(r=new FormData,r.append("cacheControl",o.cacheControl),l&&r.append("metadata",this.encodeMetadata(l)),r.append("",s)):typeof FormData<"u"&&s instanceof FormData?(r=s,r.append("cacheControl",o.cacheControl),l&&r.append("metadata",this.encodeMetadata(l))):(r=s,a["cache-control"]=`max-age=${o.cacheControl}`,a["content-type"]=o.contentType,l&&(a["x-metadata"]=this.toBase64(this.encodeMetadata(l)))),i?.headers&&(a=Object.assign(Object.assign({},a),i.headers));const c=this._removeEmptyFolders(t),u=this._getFinalPath(c),h=yield this.fetch(`${this.url}/object/${u}`,Object.assign({method:e,body:r,headers:a},o?.duplex?{duplex:o.duplex}:{})),d=yield h.json();return h.ok?{data:{path:c,id:d.Id,fullPath:d.Key},error:null}:{data:null,error:d}}catch(r){if(Z(r))return{data:null,error:r};throw r}})}upload(e,t,s){return le(this,void 0,void 0,function*(){return this.uploadOrUpdate("POST",e,t,s)})}uploadToSignedUrl(e,t,s,i){return le(this,void 0,void 0,function*(){const r=this._removeEmptyFolders(e),o=this._getFinalPath(r),a=new URL(this.url+`/object/upload/sign/${o}`);a.searchParams.set("token",t);try{let l;const c=Object.assign({upsert:Pa.upsert},i),u=Object.assign(Object.assign({},this.headers),{"x-upsert":String(c.upsert)});typeof Blob<"u"&&s instanceof Blob?(l=new FormData,l.append("cacheControl",c.cacheControl),l.append("",s)):typeof FormData<"u"&&s instanceof FormData?(l=s,l.append("cacheControl",c.cacheControl)):(l=s,u["cache-control"]=`max-age=${c.cacheControl}`,u["content-type"]=c.contentType);const h=yield this.fetch(a.toString(),{method:"PUT",body:l,headers:u}),d=yield h.json();return h.ok?{data:{path:r,fullPath:d.Key},error:null}:{data:null,error:d}}catch(l){if(Z(l))return{data:null,error:l};throw l}})}createSignedUploadUrl(e,t){return le(this,void 0,void 0,function*(){try{let s=this._getFinalPath(e);const i=Object.assign({},this.headers);t?.upsert&&(i["x-upsert"]="true");const r=yield Ke(this.fetch,`${this.url}/object/upload/sign/${s}`,{},{headers:i}),o=new URL(this.url+r.url),a=o.searchParams.get("token");if(!a)throw new qr("No token returned by API");return{data:{signedUrl:o.toString(),path:e,token:a},error:null}}catch(s){if(Z(s))return{data:null,error:s};throw s}})}update(e,t,s){return le(this,void 0,void 0,function*(){return this.uploadOrUpdate("PUT",e,t,s)})}move(e,t,s){return le(this,void 0,void 0,function*(){try{return{data:yield Ke(this.fetch,`${this.url}/object/move`,{bucketId:this.bucketId,sourceKey:e,destinationKey:t,destinationBucket:s?.destinationBucket},{headers:this.headers}),error:null}}catch(i){if(Z(i))return{data:null,error:i};throw i}})}copy(e,t,s){return le(this,void 0,void 0,function*(){try{return{data:{path:(yield Ke(this.fetch,`${this.url}/object/copy`,{bucketId:this.bucketId,sourceKey:e,destinationKey:t,destinationBucket:s?.destinationBucket},{headers:this.headers})).Key},error:null}}catch(i){if(Z(i))return{data:null,error:i};throw i}})}createSignedUrl(e,t,s){return le(this,void 0,void 0,function*(){try{let i=this._getFinalPath(e),r=yield Ke(this.fetch,`${this.url}/object/sign/${i}`,Object.assign({expiresIn:t},s?.transform?{transform:s.transform}:{}),{headers:this.headers});const o=s?.download?`&download=${s.download===!0?"":s.download}`:"";return r={signedUrl:encodeURI(`${this.url}${r.signedURL}${o}`)},{data:r,error:null}}catch(i){if(Z(i))return{data:null,error:i};throw i}})}createSignedUrls(e,t,s){return le(this,void 0,void 0,function*(){try{const i=yield Ke(this.fetch,`${this.url}/object/sign/${this.bucketId}`,{expiresIn:t,paths:e},{headers:this.headers}),r=s?.download?`&download=${s.download===!0?"":s.download}`:"";return{data:i.map(o=>Object.assign(Object.assign({},o),{signedUrl:o.signedURL?encodeURI(`${this.url}${o.signedURL}${r}`):null})),error:null}}catch(i){if(Z(i))return{data:null,error:i};throw i}})}download(e,t){return le(this,void 0,void 0,function*(){const i=typeof t?.transform<"u"?"render/image/authenticated":"object",r=this.transformOptsToQueryString(t?.transform||{}),o=r?`?${r}`:"";try{const a=this._getFinalPath(e);return{data:yield(yield vs(this.fetch,`${this.url}/${i}/${a}${o}`,{headers:this.headers,noResolveJson:!0})).blob(),error:null}}catch(a){if(Z(a))return{data:null,error:a};throw a}})}info(e){return le(this,void 0,void 0,function*(){const t=this._getFinalPath(e);try{const s=yield vs(this.fetch,`${this.url}/object/info/${t}`,{headers:this.headers});return{data:Ui(s),error:null}}catch(s){if(Z(s))return{data:null,error:s};throw s}})}exists(e){return le(this,void 0,void 0,function*(){const t=this._getFinalPath(e);try{return yield Cy(this.fetch,`${this.url}/object/${t}`,{headers:this.headers}),{data:!0,error:null}}catch(s){if(Z(s)&&s instanceof $i){const i=s.originalError;if([400,404].includes(i?.status))return{data:!1,error:s}}throw s}})}getPublicUrl(e,t){const s=this._getFinalPath(e),i=[],r=t?.download?`download=${t.download===!0?"":t.download}`:"";r!==""&&i.push(r);const a=typeof t?.transform<"u"?"render/image":"object",l=this.transformOptsToQueryString(t?.transform||{});l!==""&&i.push(l);let c=i.join("&");return c!==""&&(c=`?${c}`),{data:{publicUrl:encodeURI(`${this.url}/${a}/public/${s}${c}`)}}}remove(e){return le(this,void 0,void 0,function*(){try{return{data:yield _u(this.fetch,`${this.url}/object/${this.bucketId}`,{prefixes:e},{headers:this.headers}),error:null}}catch(t){if(Z(t))return{data:null,error:t};throw t}})}list(e,t,s){return le(this,void 0,void 0,function*(){try{const i=Object.assign(Object.assign(Object.assign({},ky),t),{prefix:e||""});return{data:yield Ke(this.fetch,`${this.url}/object/list/${this.bucketId}`,i,{headers:this.headers},s),error:null}}catch(i){if(Z(i))return{data:null,error:i};throw i}})}encodeMetadata(e){return JSON.stringify(e)}toBase64(e){return typeof Buffer<"u"?Buffer.from(e).toString("base64"):btoa(e)}_getFinalPath(e){return`${this.bucketId}/${e}`}_removeEmptyFolders(e){return e.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}transformOptsToQueryString(e){const t=[];return e.width&&t.push(`width=${e.width}`),e.height&&t.push(`height=${e.height}`),e.resize&&t.push(`resize=${e.resize}`),e.format&&t.push(`format=${e.format}`),e.quality&&t.push(`quality=${e.quality}`),t.join("&")}}const Ry="2.7.1",Py={"X-Client-Info":`storage-js/${Ry}`};var xt=function(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{c(s.next(u))}catch(h){o(h)}}function l(u){try{c(s.throw(u))}catch(h){o(h)}}function c(u){u.done?r(u.value):i(u.value).then(a,l)}c((s=s.apply(n,e||[])).next())})};class Oy{constructor(e,t={},s){this.url=e,this.headers=Object.assign(Object.assign({},Py),t),this.fetch=gu(s)}listBuckets(){return xt(this,void 0,void 0,function*(){try{return{data:yield vs(this.fetch,`${this.url}/bucket`,{headers:this.headers}),error:null}}catch(e){if(Z(e))return{data:null,error:e};throw e}})}getBucket(e){return xt(this,void 0,void 0,function*(){try{return{data:yield vs(this.fetch,`${this.url}/bucket/${e}`,{headers:this.headers}),error:null}}catch(t){if(Z(t))return{data:null,error:t};throw t}})}createBucket(e,t={public:!1}){return xt(this,void 0,void 0,function*(){try{return{data:yield Ke(this.fetch,`${this.url}/bucket`,{id:e,name:e,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:this.headers}),error:null}}catch(s){if(Z(s))return{data:null,error:s};throw s}})}updateBucket(e,t){return xt(this,void 0,void 0,function*(){try{return{data:yield Iy(this.fetch,`${this.url}/bucket/${e}`,{id:e,name:e,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:this.headers}),error:null}}catch(s){if(Z(s))return{data:null,error:s};throw s}})}emptyBucket(e){return xt(this,void 0,void 0,function*(){try{return{data:yield Ke(this.fetch,`${this.url}/bucket/${e}/empty`,{},{headers:this.headers}),error:null}}catch(t){if(Z(t))return{data:null,error:t};throw t}})}deleteBucket(e){return xt(this,void 0,void 0,function*(){try{return{data:yield _u(this.fetch,`${this.url}/bucket/${e}`,{},{headers:this.headers}),error:null}}catch(t){if(Z(t))return{data:null,error:t};throw t}})}}class Ny extends Oy{constructor(e,t={},s){super(e,t,s)}from(e){return new Ay(this.url,this.headers,e,this.fetch)}}const xy="2.52.1";let an="";typeof Deno<"u"?an="deno":typeof document<"u"?an="web":typeof navigator<"u"&&navigator.product==="ReactNative"?an="react-native":an="node";const Dy={"X-Client-Info":`supabase-js-${an}/${xy}`},Ly={headers:Dy},My={schema:"public"},jy={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},Fy={};var $y=function(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{c(s.next(u))}catch(h){o(h)}}function l(u){try{c(s.throw(u))}catch(h){o(h)}}function c(u){u.done?r(u.value):i(u.value).then(a,l)}c((s=s.apply(n,e||[])).next())})};const Uy=n=>{let e;return n?e=n:typeof fetch>"u"?e=ru:e=fetch,(...t)=>e(...t)},By=()=>typeof Headers>"u"?ou:Headers,Vy=(n,e,t)=>{const s=Uy(t),i=By();return(r,o)=>$y(void 0,void 0,void 0,function*(){var a;const l=(a=yield e())!==null&&a!==void 0?a:n;let c=new i(o?.headers);return c.has("apikey")||c.set("apikey",n),c.has("Authorization")||c.set("Authorization",`Bearer ${l}`),s(r,Object.assign(Object.assign({},o),{headers:c}))})};var Wy=function(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{c(s.next(u))}catch(h){o(h)}}function l(u){try{c(s.throw(u))}catch(h){o(h)}}function c(u){u.done?r(u.value):i(u.value).then(a,l)}c((s=s.apply(n,e||[])).next())})};function qy(n){return n.endsWith("/")?n:n+"/"}function Hy(n,e){var t,s;const{db:i,auth:r,realtime:o,global:a}=n,{db:l,auth:c,realtime:u,global:h}=e,d={db:Object.assign(Object.assign({},l),i),auth:Object.assign(Object.assign({},c),r),realtime:Object.assign(Object.assign({},u),o),global:Object.assign(Object.assign(Object.assign({},h),a),{headers:Object.assign(Object.assign({},(t=h?.headers)!==null&&t!==void 0?t:{}),(s=a?.headers)!==null&&s!==void 0?s:{})}),accessToken:()=>Wy(this,void 0,void 0,function*(){return""})};return n.accessToken?d.accessToken=n.accessToken:delete d.accessToken,d}const mu="2.71.1",Ft=30*1e3,Bi=3,di=Bi*Ft,zy="http://localhost:9999",Ky="supabase.auth.token",Gy={"X-Client-Info":`gotrue-js/${mu}`},Vi="X-Supabase-Api-Version",yu={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},Yy=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,Jy=600*1e3;class Hr extends Error{constructor(e,t,s){super(e),this.__isAuthError=!0,this.name="AuthError",this.status=t,this.code=s}}function R(n){return typeof n=="object"&&n!==null&&"__isAuthError"in n}class Qy extends Hr{constructor(e,t,s){super(e,t,s),this.name="AuthApiError",this.status=t,this.code=s}}function Xy(n){return R(n)&&n.name==="AuthApiError"}class vu extends Hr{constructor(e,t){super(e),this.name="AuthUnknownError",this.originalError=t}}class rt extends Hr{constructor(e,t,s,i){super(e,s,i),this.name=t,this.status=s}}class ze extends rt{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}}function Zy(n){return R(n)&&n.name==="AuthSessionMissingError"}class Hn extends rt{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}}class zn extends rt{constructor(e){super(e,"AuthInvalidCredentialsError",400,void 0)}}class Kn extends rt{constructor(e,t=null){super(e,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}function ev(n){return R(n)&&n.name==="AuthImplicitGrantRedirectError"}class Oa extends rt{constructor(e,t=null){super(e,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}class Wi extends rt{constructor(e,t){super(e,"AuthRetryableFetchError",t,void 0)}}function fi(n){return R(n)&&n.name==="AuthRetryableFetchError"}class Na extends rt{constructor(e,t,s){super(e,"AuthWeakPasswordError",t,"weak_password"),this.reasons=s}}class qi extends rt{constructor(e){super(e,"AuthInvalidJwtError",400,"invalid_jwt")}}const ws="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),xa=` 	
\r=`.split(""),tv=(()=>{const n=new Array(128);for(let e=0;e<n.length;e+=1)n[e]=-1;for(let e=0;e<xa.length;e+=1)n[xa[e].charCodeAt(0)]=-2;for(let e=0;e<ws.length;e+=1)n[ws[e].charCodeAt(0)]=e;return n})();function Da(n,e,t){if(n!==null)for(e.queue=e.queue<<8|n,e.queuedBits+=8;e.queuedBits>=6;){const s=e.queue>>e.queuedBits-6&63;t(ws[s]),e.queuedBits-=6}else if(e.queuedBits>0)for(e.queue=e.queue<<6-e.queuedBits,e.queuedBits=6;e.queuedBits>=6;){const s=e.queue>>e.queuedBits-6&63;t(ws[s]),e.queuedBits-=6}}function wu(n,e,t){const s=tv[n];if(s>-1)for(e.queue=e.queue<<6|s,e.queuedBits+=6;e.queuedBits>=8;)t(e.queue>>e.queuedBits-8&255),e.queuedBits-=8;else{if(s===-2)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(n)}"`)}}function La(n){const e=[],t=o=>{e.push(String.fromCodePoint(o))},s={utf8seq:0,codepoint:0},i={queue:0,queuedBits:0},r=o=>{iv(o,s,t)};for(let o=0;o<n.length;o+=1)wu(n.charCodeAt(o),i,r);return e.join("")}function nv(n,e){if(n<=127){e(n);return}else if(n<=2047){e(192|n>>6),e(128|n&63);return}else if(n<=65535){e(224|n>>12),e(128|n>>6&63),e(128|n&63);return}else if(n<=1114111){e(240|n>>18),e(128|n>>12&63),e(128|n>>6&63),e(128|n&63);return}throw new Error(`Unrecognized Unicode codepoint: ${n.toString(16)}`)}function sv(n,e){for(let t=0;t<n.length;t+=1){let s=n.charCodeAt(t);if(s>55295&&s<=56319){const i=(s-55296)*1024&65535;s=(n.charCodeAt(t+1)-56320&65535|i)+65536,t+=1}nv(s,e)}}function iv(n,e,t){if(e.utf8seq===0){if(n<=127){t(n);return}for(let s=1;s<6;s+=1)if((n>>7-s&1)===0){e.utf8seq=s;break}if(e.utf8seq===2)e.codepoint=n&31;else if(e.utf8seq===3)e.codepoint=n&15;else if(e.utf8seq===4)e.codepoint=n&7;else throw new Error("Invalid UTF-8 sequence");e.utf8seq-=1}else if(e.utf8seq>0){if(n<=127)throw new Error("Invalid UTF-8 sequence");e.codepoint=e.codepoint<<6|n&63,e.utf8seq-=1,e.utf8seq===0&&t(e.codepoint)}}function rv(n){const e=[],t={queue:0,queuedBits:0},s=i=>{e.push(i)};for(let i=0;i<n.length;i+=1)wu(n.charCodeAt(i),t,s);return new Uint8Array(e)}function ov(n){const e=[];return sv(n,t=>e.push(t)),new Uint8Array(e)}function av(n){const e=[],t={queue:0,queuedBits:0},s=i=>{e.push(i)};return n.forEach(i=>Da(i,t,s)),Da(null,t,s),e.join("")}function lv(n){return Math.round(Date.now()/1e3)+n}function cv(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(n){const e=Math.random()*16|0;return(n=="x"?e:e&3|8).toString(16)})}const me=()=>typeof window<"u"&&typeof document<"u",at={tested:!1,writable:!1},bu=()=>{if(!me())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(at.tested)return at.writable;const n=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(n,n),globalThis.localStorage.removeItem(n),at.tested=!0,at.writable=!0}catch{at.tested=!0,at.writable=!1}return at.writable};function uv(n){const e={},t=new URL(n);if(t.hash&&t.hash[0]==="#")try{new URLSearchParams(t.hash.substring(1)).forEach((i,r)=>{e[r]=i})}catch{}return t.searchParams.forEach((s,i)=>{e[i]=s}),e}const Eu=n=>{let e;return n?e=n:typeof fetch>"u"?e=(...t)=>$n(async()=>{const{default:s}=await Promise.resolve().then(()=>Zt);return{default:s}},void 0).then(({default:s})=>s(...t)):e=fetch,(...t)=>e(...t)},hv=n=>typeof n=="object"&&n!==null&&"status"in n&&"ok"in n&&"json"in n&&typeof n.json=="function",$t=async(n,e,t)=>{await n.setItem(e,JSON.stringify(t))},lt=async(n,e)=>{const t=await n.getItem(e);if(!t)return null;try{return JSON.parse(t)}catch{return t}},He=async(n,e)=>{await n.removeItem(e)};class Us{constructor(){this.promise=new Us.promiseConstructor((e,t)=>{this.resolve=e,this.reject=t})}}Us.promiseConstructor=Promise;function pi(n){const e=n.split(".");if(e.length!==3)throw new qi("Invalid JWT structure");for(let s=0;s<e.length;s++)if(!Yy.test(e[s]))throw new qi("JWT not in base64url format");return{header:JSON.parse(La(e[0])),payload:JSON.parse(La(e[1])),signature:rv(e[2]),raw:{header:e[0],payload:e[1]}}}async function dv(n){return await new Promise(e=>{setTimeout(()=>e(null),n)})}function fv(n,e){return new Promise((s,i)=>{(async()=>{for(let r=0;r<1/0;r++)try{const o=await n(r);if(!e(r,null,o)){s(o);return}}catch(o){if(!e(r,o)){i(o);return}}})()})}function pv(n){return("0"+n.toString(16)).substr(-2)}function gv(){const e=new Uint32Array(56);if(typeof crypto>"u"){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",s=t.length;let i="";for(let r=0;r<56;r++)i+=t.charAt(Math.floor(Math.random()*s));return i}return crypto.getRandomValues(e),Array.from(e,pv).join("")}async function _v(n){const t=new TextEncoder().encode(n),s=await crypto.subtle.digest("SHA-256",t),i=new Uint8Array(s);return Array.from(i).map(r=>String.fromCharCode(r)).join("")}async function mv(n){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),n;const t=await _v(n);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function Dt(n,e,t=!1){const s=gv();let i=s;t&&(i+="/PASSWORD_RECOVERY"),await $t(n,`${e}-code-verifier`,i);const r=await mv(s);return[r,s===r?"plain":"s256"]}const yv=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function vv(n){const e=n.headers.get(Vi);if(!e||!e.match(yv))return null;try{return new Date(`${e}T00:00:00.0Z`)}catch{return null}}function wv(n){if(!n)throw new Error("Missing exp claim");const e=Math.floor(Date.now()/1e3);if(n<=e)throw new Error("JWT has expired")}function bv(n){switch(n){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}const Ev=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;function Lt(n){if(!Ev.test(n))throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function gi(){const n={};return new Proxy(n,{get:(e,t)=>{if(t==="__isUserNotAvailableProxy")return!0;if(typeof t=="symbol"){const s=t.toString();if(s==="Symbol(Symbol.toPrimitive)"||s==="Symbol(Symbol.toStringTag)"||s==="Symbol(util.inspect.custom)")return}throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${t}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,t)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,t)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function Ma(n){return JSON.parse(JSON.stringify(n))}var Sv=function(n,e){var t={};for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&e.indexOf(s)<0&&(t[s]=n[s]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,s=Object.getOwnPropertySymbols(n);i<s.length;i++)e.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(n,s[i])&&(t[s[i]]=n[s[i]]);return t};const ht=n=>n.msg||n.message||n.error_description||n.error||JSON.stringify(n),Tv=[502,503,504];async function ja(n){var e;if(!hv(n))throw new Wi(ht(n),0);if(Tv.includes(n.status))throw new Wi(ht(n),n.status);let t;try{t=await n.json()}catch(r){throw new vu(ht(r),r)}let s;const i=vv(n);if(i&&i.getTime()>=yu["2024-01-01"].timestamp&&typeof t=="object"&&t&&typeof t.code=="string"?s=t.code:typeof t=="object"&&t&&typeof t.error_code=="string"&&(s=t.error_code),s){if(s==="weak_password")throw new Na(ht(t),n.status,((e=t.weak_password)===null||e===void 0?void 0:e.reasons)||[]);if(s==="session_not_found")throw new ze}else if(typeof t=="object"&&t&&typeof t.weak_password=="object"&&t.weak_password&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.reasons.reduce((r,o)=>r&&typeof o=="string",!0))throw new Na(ht(t),n.status,t.weak_password.reasons);throw new Qy(ht(t),n.status||500,s)}const Iv=(n,e,t,s)=>{const i={method:n,headers:e?.headers||{}};return n==="GET"?i:(i.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},e?.headers),i.body=JSON.stringify(s),Object.assign(Object.assign({},i),t))};async function x(n,e,t,s){var i;const r=Object.assign({},s?.headers);r[Vi]||(r[Vi]=yu["2024-01-01"].name),s?.jwt&&(r.Authorization=`Bearer ${s.jwt}`);const o=(i=s?.query)!==null&&i!==void 0?i:{};s?.redirectTo&&(o.redirect_to=s.redirectTo);const a=Object.keys(o).length?"?"+new URLSearchParams(o).toString():"",l=await Cv(n,e,t+a,{headers:r,noResolveJson:s?.noResolveJson},{},s?.body);return s?.xform?s?.xform(l):{data:Object.assign({},l),error:null}}async function Cv(n,e,t,s,i,r){const o=Iv(e,s,i,r);let a;try{a=await n(t,Object.assign({},o))}catch(l){throw console.error(l),new Wi(ht(l),0)}if(a.ok||await ja(a),s?.noResolveJson)return a;try{return await a.json()}catch(l){await ja(l)}}function Ne(n){var e;let t=null;Pv(n)&&(t=Object.assign({},n),n.expires_at||(t.expires_at=lv(n.expires_in)));const s=(e=n.user)!==null&&e!==void 0?e:n;return{data:{session:t,user:s},error:null}}function Fa(n){const e=Ne(n);return!e.error&&n.weak_password&&typeof n.weak_password=="object"&&Array.isArray(n.weak_password.reasons)&&n.weak_password.reasons.length&&n.weak_password.message&&typeof n.weak_password.message=="string"&&n.weak_password.reasons.reduce((t,s)=>t&&typeof s=="string",!0)&&(e.data.weak_password=n.weak_password),e}function Ge(n){var e;return{data:{user:(e=n.user)!==null&&e!==void 0?e:n},error:null}}function kv(n){return{data:n,error:null}}function Av(n){const{action_link:e,email_otp:t,hashed_token:s,redirect_to:i,verification_type:r}=n,o=Sv(n,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),a={action_link:e,email_otp:t,hashed_token:s,redirect_to:i,verification_type:r},l=Object.assign({},o);return{data:{properties:a,user:l},error:null}}function Rv(n){return n}function Pv(n){return n.access_token&&n.refresh_token&&n.expires_in}const _i=["global","local","others"];var Ov=function(n,e){var t={};for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&e.indexOf(s)<0&&(t[s]=n[s]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,s=Object.getOwnPropertySymbols(n);i<s.length;i++)e.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(n,s[i])&&(t[s[i]]=n[s[i]]);return t};class Nv{constructor({url:e="",headers:t={},fetch:s}){this.url=e,this.headers=t,this.fetch=Eu(s),this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)}}async signOut(e,t=_i[0]){if(_i.indexOf(t)<0)throw new Error(`@supabase/auth-js: Parameter scope must be one of ${_i.join(", ")}`);try{return await x(this.fetch,"POST",`${this.url}/logout?scope=${t}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(s){if(R(s))return{data:null,error:s};throw s}}async inviteUserByEmail(e,t={}){try{return await x(this.fetch,"POST",`${this.url}/invite`,{body:{email:e,data:t.data},headers:this.headers,redirectTo:t.redirectTo,xform:Ge})}catch(s){if(R(s))return{data:{user:null},error:s};throw s}}async generateLink(e){try{const{options:t}=e,s=Ov(e,["options"]),i=Object.assign(Object.assign({},s),t);return"newEmail"in s&&(i.new_email=s?.newEmail,delete i.newEmail),await x(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:i,headers:this.headers,xform:Av,redirectTo:t?.redirectTo})}catch(t){if(R(t))return{data:{properties:null,user:null},error:t};throw t}}async createUser(e){try{return await x(this.fetch,"POST",`${this.url}/admin/users`,{body:e,headers:this.headers,xform:Ge})}catch(t){if(R(t))return{data:{user:null},error:t};throw t}}async listUsers(e){var t,s,i,r,o,a,l;try{const c={nextPage:null,lastPage:0,total:0},u=await x(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(s=(t=e?.page)===null||t===void 0?void 0:t.toString())!==null&&s!==void 0?s:"",per_page:(r=(i=e?.perPage)===null||i===void 0?void 0:i.toString())!==null&&r!==void 0?r:""},xform:Rv});if(u.error)throw u.error;const h=await u.json(),d=(o=u.headers.get("x-total-count"))!==null&&o!==void 0?o:0,v=(l=(a=u.headers.get("link"))===null||a===void 0?void 0:a.split(","))!==null&&l!==void 0?l:[];return v.length>0&&(v.forEach(b=>{const S=parseInt(b.split(";")[0].split("=")[1].substring(0,1)),E=JSON.parse(b.split(";")[1].split("=")[1]);c[`${E}Page`]=S}),c.total=parseInt(d)),{data:Object.assign(Object.assign({},h),c),error:null}}catch(c){if(R(c))return{data:{users:[]},error:c};throw c}}async getUserById(e){Lt(e);try{return await x(this.fetch,"GET",`${this.url}/admin/users/${e}`,{headers:this.headers,xform:Ge})}catch(t){if(R(t))return{data:{user:null},error:t};throw t}}async updateUserById(e,t){Lt(e);try{return await x(this.fetch,"PUT",`${this.url}/admin/users/${e}`,{body:t,headers:this.headers,xform:Ge})}catch(s){if(R(s))return{data:{user:null},error:s};throw s}}async deleteUser(e,t=!1){Lt(e);try{return await x(this.fetch,"DELETE",`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:t},xform:Ge})}catch(s){if(R(s))return{data:{user:null},error:s};throw s}}async _listFactors(e){Lt(e.userId);try{const{data:t,error:s}=await x(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:i=>({data:{factors:i},error:null})});return{data:t,error:s}}catch(t){if(R(t))return{data:null,error:t};throw t}}async _deleteFactor(e){Lt(e.userId),Lt(e.id);try{return{data:await x(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(t){if(R(t))return{data:null,error:t};throw t}}}function $a(n={}){return{getItem:e=>n[e]||null,setItem:(e,t)=>{n[e]=t},removeItem:e=>{delete n[e]}}}function xv(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}const Mt={debug:!!(globalThis&&bu()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug")==="true")};class Su extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}}class Dv extends Su{}async function Lv(n,e,t){Mt.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire lock",n,e);const s=new globalThis.AbortController;return e>0&&setTimeout(()=>{s.abort(),Mt.debug&&console.log("@supabase/gotrue-js: navigatorLock acquire timed out",n)},e),await Promise.resolve().then(()=>globalThis.navigator.locks.request(n,e===0?{mode:"exclusive",ifAvailable:!0}:{mode:"exclusive",signal:s.signal},async i=>{if(i){Mt.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquired",n,i.name);try{return await t()}finally{Mt.debug&&console.log("@supabase/gotrue-js: navigatorLock: released",n,i.name)}}else{if(e===0)throw Mt.debug&&console.log("@supabase/gotrue-js: navigatorLock: not immediately available",n),new Dv(`Acquiring an exclusive Navigator LockManager lock "${n}" immediately failed`);if(Mt.debug)try{const r=await globalThis.navigator.locks.query();console.log("@supabase/gotrue-js: Navigator LockManager state",JSON.stringify(r,null,"  "))}catch(r){console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state",r)}return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"),await t()}}))}xv();const Mv={url:zy,storageKey:Ky,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:Gy,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1};async function Ua(n,e,t){return await t()}const jt={};class Pn{constructor(e){var t,s;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log,this.instanceID=Pn.nextInstanceID,Pn.nextInstanceID+=1,this.instanceID>0&&me()&&console.warn("Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.");const i=Object.assign(Object.assign({},Mv),e);if(this.logDebugMessages=!!i.debug,typeof i.debug=="function"&&(this.logger=i.debug),this.persistSession=i.persistSession,this.storageKey=i.storageKey,this.autoRefreshToken=i.autoRefreshToken,this.admin=new Nv({url:i.url,headers:i.headers,fetch:i.fetch}),this.url=i.url,this.headers=i.headers,this.fetch=Eu(i.fetch),this.lock=i.lock||Ua,this.detectSessionInUrl=i.detectSessionInUrl,this.flowType=i.flowType,this.hasCustomAuthorizationHeader=i.hasCustomAuthorizationHeader,i.lock?this.lock=i.lock:me()&&(!((t=globalThis?.navigator)===null||t===void 0)&&t.locks)?this.lock=Lv:this.lock=Ua,this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this)},this.persistSession?(i.storage?this.storage=i.storage:bu()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=$a(this.memoryStorage)),i.userStorage&&(this.userStorage=i.userStorage)):(this.memoryStorage={},this.storage=$a(this.memoryStorage)),me()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(r){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",r)}(s=this.broadcastChannel)===null||s===void 0||s.addEventListener("message",async r=>{this._debug("received broadcast notification from other tab or client",r),await this._notifyAllSubscribers(r.data.event,r.data.session,!1)})}this.initialize()}get jwks(){var e,t;return(t=(e=jt[this.storageKey])===null||e===void 0?void 0:e.jwks)!==null&&t!==void 0?t:{keys:[]}}set jwks(e){jt[this.storageKey]=Object.assign(Object.assign({},jt[this.storageKey]),{jwks:e})}get jwks_cached_at(){var e,t;return(t=(e=jt[this.storageKey])===null||e===void 0?void 0:e.cachedAt)!==null&&t!==void 0?t:Number.MIN_SAFE_INTEGER}set jwks_cached_at(e){jt[this.storageKey]=Object.assign(Object.assign({},jt[this.storageKey]),{cachedAt:e})}_debug(...e){return this.logDebugMessages&&this.logger(`GoTrueClient@${this.instanceID} (${mu}) ${new Date().toISOString()}`,...e),this}async initialize(){return this.initializePromise?await this.initializePromise:(this.initializePromise=(async()=>await this._acquireLock(-1,async()=>await this._initialize()))(),await this.initializePromise)}async _initialize(){var e;try{const t=uv(window.location.href);let s="none";if(this._isImplicitGrantCallback(t)?s="implicit":await this._isPKCECallback(t)&&(s="pkce"),me()&&this.detectSessionInUrl&&s!=="none"){const{data:i,error:r}=await this._getSessionFromURL(t,s);if(r){if(this._debug("#_initialize()","error detecting session from URL",r),ev(r)){const l=(e=r.details)===null||e===void 0?void 0:e.code;if(l==="identity_already_exists"||l==="identity_not_found"||l==="single_identity_not_deletable")return{error:r}}return await this._removeSession(),{error:r}}const{session:o,redirectType:a}=i;return this._debug("#_initialize()","detected session in URL",o,"redirect type",a),await this._saveSession(o),setTimeout(async()=>{a==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",o):await this._notifyAllSubscribers("SIGNED_IN",o)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(t){return R(t)?{error:t}:{error:new vu("Unexpected error during initialization",t)}}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(e){var t,s,i;try{const r=await x(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(s=(t=e?.options)===null||t===void 0?void 0:t.data)!==null&&s!==void 0?s:{},gotrue_meta_security:{captcha_token:(i=e?.options)===null||i===void 0?void 0:i.captchaToken}},xform:Ne}),{data:o,error:a}=r;if(a||!o)return{data:{user:null,session:null},error:a};const l=o.session,c=o.user;return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",l)),{data:{user:c,session:l},error:null}}catch(r){if(R(r))return{data:{user:null,session:null},error:r};throw r}}async signUp(e){var t,s,i;try{let r;if("email"in e){const{email:u,password:h,options:d}=e;let v=null,b=null;this.flowType==="pkce"&&([v,b]=await Dt(this.storage,this.storageKey)),r=await x(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:d?.emailRedirectTo,body:{email:u,password:h,data:(t=d?.data)!==null&&t!==void 0?t:{},gotrue_meta_security:{captcha_token:d?.captchaToken},code_challenge:v,code_challenge_method:b},xform:Ne})}else if("phone"in e){const{phone:u,password:h,options:d}=e;r=await x(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:u,password:h,data:(s=d?.data)!==null&&s!==void 0?s:{},channel:(i=d?.channel)!==null&&i!==void 0?i:"sms",gotrue_meta_security:{captcha_token:d?.captchaToken}},xform:Ne})}else throw new zn("You must provide either an email or phone number and a password");const{data:o,error:a}=r;if(a||!o)return{data:{user:null,session:null},error:a};const l=o.session,c=o.user;return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",l)),{data:{user:c,session:l},error:null}}catch(r){if(R(r))return{data:{user:null,session:null},error:r};throw r}}async signInWithPassword(e){try{let t;if("email"in e){const{email:r,password:o,options:a}=e;t=await x(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:r,password:o,gotrue_meta_security:{captcha_token:a?.captchaToken}},xform:Fa})}else if("phone"in e){const{phone:r,password:o,options:a}=e;t=await x(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:r,password:o,gotrue_meta_security:{captcha_token:a?.captchaToken}},xform:Fa})}else throw new zn("You must provide either an email or phone number and a password");const{data:s,error:i}=t;return i?{data:{user:null,session:null},error:i}:!s||!s.session||!s.user?{data:{user:null,session:null},error:new Hn}:(s.session&&(await this._saveSession(s.session),await this._notifyAllSubscribers("SIGNED_IN",s.session)),{data:Object.assign({user:s.user,session:s.session},s.weak_password?{weakPassword:s.weak_password}:null),error:i})}catch(t){if(R(t))return{data:{user:null,session:null},error:t};throw t}}async signInWithOAuth(e){var t,s,i,r;return await this._handleProviderSignIn(e.provider,{redirectTo:(t=e.options)===null||t===void 0?void 0:t.redirectTo,scopes:(s=e.options)===null||s===void 0?void 0:s.scopes,queryParams:(i=e.options)===null||i===void 0?void 0:i.queryParams,skipBrowserRedirect:(r=e.options)===null||r===void 0?void 0:r.skipBrowserRedirect})}async exchangeCodeForSession(e){return await this.initializePromise,this._acquireLock(-1,async()=>this._exchangeCodeForSession(e))}async signInWithWeb3(e){const{chain:t}=e;if(t==="solana")return await this.signInWithSolana(e);throw new Error(`@supabase/auth-js: Unsupported chain "${t}"`)}async signInWithSolana(e){var t,s,i,r,o,a,l,c,u,h,d,v;let b,S;if("message"in e)b=e.message,S=e.signature;else{const{chain:E,wallet:A,statement:F,options:I}=e;let C;if(me())if(typeof A=="object")C=A;else{const $=window;if("solana"in $&&typeof $.solana=="object"&&("signIn"in $.solana&&typeof $.solana.signIn=="function"||"signMessage"in $.solana&&typeof $.solana.signMessage=="function"))C=$.solana;else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")}else{if(typeof A!="object"||!I?.url)throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");C=A}const B=new URL((t=I?.url)!==null&&t!==void 0?t:window.location.href);if("signIn"in C&&C.signIn){const $=await C.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},I?.signInWithSolana),{version:"1",domain:B.host,uri:B.href}),F?{statement:F}:null));let _;if(Array.isArray($)&&$[0]&&typeof $[0]=="object")_=$[0];else if($&&typeof $=="object"&&"signedMessage"in $&&"signature"in $)_=$;else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");if("signedMessage"in _&&"signature"in _&&(typeof _.signedMessage=="string"||_.signedMessage instanceof Uint8Array)&&_.signature instanceof Uint8Array)b=typeof _.signedMessage=="string"?_.signedMessage:new TextDecoder().decode(_.signedMessage),S=_.signature;else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")}else{if(!("signMessage"in C)||typeof C.signMessage!="function"||!("publicKey"in C)||typeof C!="object"||!C.publicKey||!("toBase58"in C.publicKey)||typeof C.publicKey.toBase58!="function")throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");b=[`${B.host} wants you to sign in with your Solana account:`,C.publicKey.toBase58(),...F?["",F,""]:[""],"Version: 1",`URI: ${B.href}`,`Issued At: ${(i=(s=I?.signInWithSolana)===null||s===void 0?void 0:s.issuedAt)!==null&&i!==void 0?i:new Date().toISOString()}`,...!((r=I?.signInWithSolana)===null||r===void 0)&&r.notBefore?[`Not Before: ${I.signInWithSolana.notBefore}`]:[],...!((o=I?.signInWithSolana)===null||o===void 0)&&o.expirationTime?[`Expiration Time: ${I.signInWithSolana.expirationTime}`]:[],...!((a=I?.signInWithSolana)===null||a===void 0)&&a.chainId?[`Chain ID: ${I.signInWithSolana.chainId}`]:[],...!((l=I?.signInWithSolana)===null||l===void 0)&&l.nonce?[`Nonce: ${I.signInWithSolana.nonce}`]:[],...!((c=I?.signInWithSolana)===null||c===void 0)&&c.requestId?[`Request ID: ${I.signInWithSolana.requestId}`]:[],...!((h=(u=I?.signInWithSolana)===null||u===void 0?void 0:u.resources)===null||h===void 0)&&h.length?["Resources",...I.signInWithSolana.resources.map(_=>`- ${_}`)]:[]].join(`
`);const $=await C.signMessage(new TextEncoder().encode(b),"utf8");if(!$||!($ instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");S=$}}try{const{data:E,error:A}=await x(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:b,signature:av(S)},!((d=e.options)===null||d===void 0)&&d.captchaToken?{gotrue_meta_security:{captcha_token:(v=e.options)===null||v===void 0?void 0:v.captchaToken}}:null),xform:Ne});if(A)throw A;return!E||!E.session||!E.user?{data:{user:null,session:null},error:new Hn}:(E.session&&(await this._saveSession(E.session),await this._notifyAllSubscribers("SIGNED_IN",E.session)),{data:Object.assign({},E),error:A})}catch(E){if(R(E))return{data:{user:null,session:null},error:E};throw E}}async _exchangeCodeForSession(e){const t=await lt(this.storage,`${this.storageKey}-code-verifier`),[s,i]=(t??"").split("/");try{const{data:r,error:o}=await x(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:s},xform:Ne});if(await He(this.storage,`${this.storageKey}-code-verifier`),o)throw o;return!r||!r.session||!r.user?{data:{user:null,session:null,redirectType:null},error:new Hn}:(r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers("SIGNED_IN",r.session)),{data:Object.assign(Object.assign({},r),{redirectType:i??null}),error:o})}catch(r){if(R(r))return{data:{user:null,session:null,redirectType:null},error:r};throw r}}async signInWithIdToken(e){try{const{options:t,provider:s,token:i,access_token:r,nonce:o}=e,a=await x(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:s,id_token:i,access_token:r,nonce:o,gotrue_meta_security:{captcha_token:t?.captchaToken}},xform:Ne}),{data:l,error:c}=a;return c?{data:{user:null,session:null},error:c}:!l||!l.session||!l.user?{data:{user:null,session:null},error:new Hn}:(l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers("SIGNED_IN",l.session)),{data:l,error:c})}catch(t){if(R(t))return{data:{user:null,session:null},error:t};throw t}}async signInWithOtp(e){var t,s,i,r,o;try{if("email"in e){const{email:a,options:l}=e;let c=null,u=null;this.flowType==="pkce"&&([c,u]=await Dt(this.storage,this.storageKey));const{error:h}=await x(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:a,data:(t=l?.data)!==null&&t!==void 0?t:{},create_user:(s=l?.shouldCreateUser)!==null&&s!==void 0?s:!0,gotrue_meta_security:{captcha_token:l?.captchaToken},code_challenge:c,code_challenge_method:u},redirectTo:l?.emailRedirectTo});return{data:{user:null,session:null},error:h}}if("phone"in e){const{phone:a,options:l}=e,{data:c,error:u}=await x(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:a,data:(i=l?.data)!==null&&i!==void 0?i:{},create_user:(r=l?.shouldCreateUser)!==null&&r!==void 0?r:!0,gotrue_meta_security:{captcha_token:l?.captchaToken},channel:(o=l?.channel)!==null&&o!==void 0?o:"sms"}});return{data:{user:null,session:null,messageId:c?.message_id},error:u}}throw new zn("You must provide either an email or phone number.")}catch(a){if(R(a))return{data:{user:null,session:null},error:a};throw a}}async verifyOtp(e){var t,s;try{let i,r;"options"in e&&(i=(t=e.options)===null||t===void 0?void 0:t.redirectTo,r=(s=e.options)===null||s===void 0?void 0:s.captchaToken);const{data:o,error:a}=await x(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:r}}),redirectTo:i,xform:Ne});if(a)throw a;if(!o)throw new Error("An error occurred on token verification.");const l=o.session,c=o.user;return l?.access_token&&(await this._saveSession(l),await this._notifyAllSubscribers(e.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",l)),{data:{user:c,session:l},error:null}}catch(i){if(R(i))return{data:{user:null,session:null},error:i};throw i}}async signInWithSSO(e){var t,s,i;try{let r=null,o=null;return this.flowType==="pkce"&&([r,o]=await Dt(this.storage,this.storageKey)),await x(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in e?{provider_id:e.providerId}:null),"domain"in e?{domain:e.domain}:null),{redirect_to:(s=(t=e.options)===null||t===void 0?void 0:t.redirectTo)!==null&&s!==void 0?s:void 0}),!((i=e?.options)===null||i===void 0)&&i.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:r,code_challenge_method:o}),headers:this.headers,xform:kv})}catch(r){if(R(r))return{data:null,error:r};throw r}}async reauthenticate(){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async e=>{const{data:{session:t},error:s}=e;if(s)throw s;if(!t)throw new ze;const{error:i}=await x(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:t.access_token});return{data:{user:null,session:null},error:i}})}catch(e){if(R(e))return{data:{user:null,session:null},error:e};throw e}}async resend(e){try{const t=`${this.url}/resend`;if("email"in e){const{email:s,type:i,options:r}=e,{error:o}=await x(this.fetch,"POST",t,{headers:this.headers,body:{email:s,type:i,gotrue_meta_security:{captcha_token:r?.captchaToken}},redirectTo:r?.emailRedirectTo});return{data:{user:null,session:null},error:o}}else if("phone"in e){const{phone:s,type:i,options:r}=e,{data:o,error:a}=await x(this.fetch,"POST",t,{headers:this.headers,body:{phone:s,type:i,gotrue_meta_security:{captcha_token:r?.captchaToken}}});return{data:{user:null,session:null,messageId:o?.message_id},error:a}}throw new zn("You must provide either an email or phone number and a type")}catch(t){if(R(t))return{data:{user:null,session:null},error:t};throw t}}async getSession(){return await this.initializePromise,await this._acquireLock(-1,async()=>this._useSession(async t=>t))}async _acquireLock(e,t){this._debug("#_acquireLock","begin",e);try{if(this.lockAcquired){const s=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),i=(async()=>(await s,await t()))();return this.pendingInLock.push((async()=>{try{await i}catch{}})()),i}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const s=t();for(this.pendingInLock.push((async()=>{try{await s}catch{}})()),await s;this.pendingInLock.length;){const i=[...this.pendingInLock];await Promise.all(i),this.pendingInLock.splice(0,i.length)}return await s}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(e){this._debug("#_useSession","begin");try{const t=await this.__loadSession();return await e(t)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lockAcquired||this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let e=null;const t=await lt(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",t),t!==null&&(this._isValidSession(t)?e=t:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!e)return{data:{session:null},error:null};const s=e.expires_at?e.expires_at*1e3-Date.now()<di:!1;if(this._debug("#__loadSession()",`session has${s?"":" not"} expired`,"expires_at",e.expires_at),!s){if(this.userStorage){const o=await lt(this.userStorage,this.storageKey+"-user");o?.user?e.user=o.user:e.user=gi()}if(this.storage.isServer&&e.user){let o=this.suppressGetSessionWarning;e=new Proxy(e,{get:(l,c,u)=>(!o&&c==="user"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),o=!0,this.suppressGetSessionWarning=!0),Reflect.get(l,c,u))})}return{data:{session:e},error:null}}const{session:i,error:r}=await this._callRefreshToken(e.refresh_token);return r?{data:{session:null},error:r}:{data:{session:i},error:null}}finally{this._debug("#__loadSession()","end")}}async getUser(e){return e?await this._getUser(e):(await this.initializePromise,await this._acquireLock(-1,async()=>await this._getUser()))}async _getUser(e){try{return e?await x(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:e,xform:Ge}):await this._useSession(async t=>{var s,i,r;const{data:o,error:a}=t;if(a)throw a;return!(!((s=o.session)===null||s===void 0)&&s.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new ze}:await x(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(r=(i=o.session)===null||i===void 0?void 0:i.access_token)!==null&&r!==void 0?r:void 0,xform:Ge})})}catch(t){if(R(t))return Zy(t)&&(await this._removeSession(),await He(this.storage,`${this.storageKey}-code-verifier`)),{data:{user:null},error:t};throw t}}async updateUser(e,t={}){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._updateUser(e,t))}async _updateUser(e,t={}){try{return await this._useSession(async s=>{const{data:i,error:r}=s;if(r)throw r;if(!i.session)throw new ze;const o=i.session;let a=null,l=null;this.flowType==="pkce"&&e.email!=null&&([a,l]=await Dt(this.storage,this.storageKey));const{data:c,error:u}=await x(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:t?.emailRedirectTo,body:Object.assign(Object.assign({},e),{code_challenge:a,code_challenge_method:l}),jwt:o.access_token,xform:Ge});if(u)throw u;return o.user=c.user,await this._saveSession(o),await this._notifyAllSubscribers("USER_UPDATED",o),{data:{user:o.user},error:null}})}catch(s){if(R(s))return{data:{user:null},error:s};throw s}}async setSession(e){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._setSession(e))}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new ze;const t=Date.now()/1e3;let s=t,i=!0,r=null;const{payload:o}=pi(e.access_token);if(o.exp&&(s=o.exp,i=s<=t),i){const{session:a,error:l}=await this._callRefreshToken(e.refresh_token);if(l)return{data:{user:null,session:null},error:l};if(!a)return{data:{user:null,session:null},error:null};r=a}else{const{data:a,error:l}=await this._getUser(e.access_token);if(l)throw l;r={access_token:e.access_token,refresh_token:e.refresh_token,user:a.user,token_type:"bearer",expires_in:s-t,expires_at:s},await this._saveSession(r),await this._notifyAllSubscribers("SIGNED_IN",r)}return{data:{user:r.user,session:r},error:null}}catch(t){if(R(t))return{data:{session:null,user:null},error:t};throw t}}async refreshSession(e){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._refreshSession(e))}async _refreshSession(e){try{return await this._useSession(async t=>{var s;if(!e){const{data:o,error:a}=t;if(a)throw a;e=(s=o.session)!==null&&s!==void 0?s:void 0}if(!e?.refresh_token)throw new ze;const{session:i,error:r}=await this._callRefreshToken(e.refresh_token);return r?{data:{user:null,session:null},error:r}:i?{data:{user:i.user,session:i},error:null}:{data:{user:null,session:null},error:null}})}catch(t){if(R(t))return{data:{user:null,session:null},error:t};throw t}}async _getSessionFromURL(e,t){try{if(!me())throw new Kn("No browser detected.");if(e.error||e.error_description||e.error_code)throw new Kn(e.error_description||"Error in URL with unspecified error_description",{error:e.error||"unspecified_error",code:e.error_code||"unspecified_code"});switch(t){case"implicit":if(this.flowType==="pkce")throw new Oa("Not a valid PKCE flow url.");break;case"pkce":if(this.flowType==="implicit")throw new Kn("Not a valid implicit grant flow url.");break;default:}if(t==="pkce"){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!e.code)throw new Oa("No code detected.");const{data:F,error:I}=await this._exchangeCodeForSession(e.code);if(I)throw I;const C=new URL(window.location.href);return C.searchParams.delete("code"),window.history.replaceState(window.history.state,"",C.toString()),{data:{session:F.session,redirectType:null},error:null}}const{provider_token:s,provider_refresh_token:i,access_token:r,refresh_token:o,expires_in:a,expires_at:l,token_type:c}=e;if(!r||!a||!o||!c)throw new Kn("No session defined in URL");const u=Math.round(Date.now()/1e3),h=parseInt(a);let d=u+h;l&&(d=parseInt(l));const v=d-u;v*1e3<=Ft&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${v}s, should have been closer to ${h}s`);const b=d-h;u-b>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",b,d,u):u-b<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",b,d,u);const{data:S,error:E}=await this._getUser(r);if(E)throw E;const A={provider_token:s,provider_refresh_token:i,access_token:r,expires_in:h,expires_at:d,refresh_token:o,token_type:c,user:S.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),{data:{session:A,redirectType:e.type},error:null}}catch(s){if(R(s))return{data:{session:null,redirectType:null},error:s};throw s}}_isImplicitGrantCallback(e){return!!(e.access_token||e.error_description)}async _isPKCECallback(e){const t=await lt(this.storage,`${this.storageKey}-code-verifier`);return!!(e.code&&t)}async signOut(e={scope:"global"}){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._signOut(e))}async _signOut({scope:e}={scope:"global"}){return await this._useSession(async t=>{var s;const{data:i,error:r}=t;if(r)return{error:r};const o=(s=i.session)===null||s===void 0?void 0:s.access_token;if(o){const{error:a}=await this.admin.signOut(o,e);if(a&&!(Xy(a)&&(a.status===404||a.status===401||a.status===403)))return{error:a}}return e!=="others"&&(await this._removeSession(),await He(this.storage,`${this.storageKey}-code-verifier`)),{error:null}})}onAuthStateChange(e){const t=cv(),s={id:t,callback:e,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",t),this.stateChangeEmitters.delete(t)}};return this._debug("#onAuthStateChange()","registered callback with id",t),this.stateChangeEmitters.set(t,s),(async()=>(await this.initializePromise,await this._acquireLock(-1,async()=>{this._emitInitialSession(t)})))(),{data:{subscription:s}}}async _emitInitialSession(e){return await this._useSession(async t=>{var s,i;try{const{data:{session:r},error:o}=t;if(o)throw o;await((s=this.stateChangeEmitters.get(e))===null||s===void 0?void 0:s.callback("INITIAL_SESSION",r)),this._debug("INITIAL_SESSION","callback id",e,"session",r)}catch(r){await((i=this.stateChangeEmitters.get(e))===null||i===void 0?void 0:i.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",e,"error",r),console.error(r)}})}async resetPasswordForEmail(e,t={}){let s=null,i=null;this.flowType==="pkce"&&([s,i]=await Dt(this.storage,this.storageKey,!0));try{return await x(this.fetch,"POST",`${this.url}/recover`,{body:{email:e,code_challenge:s,code_challenge_method:i,gotrue_meta_security:{captcha_token:t.captchaToken}},headers:this.headers,redirectTo:t.redirectTo})}catch(r){if(R(r))return{data:null,error:r};throw r}}async getUserIdentities(){var e;try{const{data:t,error:s}=await this.getUser();if(s)throw s;return{data:{identities:(e=t.user.identities)!==null&&e!==void 0?e:[]},error:null}}catch(t){if(R(t))return{data:null,error:t};throw t}}async linkIdentity(e){var t;try{const{data:s,error:i}=await this._useSession(async r=>{var o,a,l,c,u;const{data:h,error:d}=r;if(d)throw d;const v=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:(o=e.options)===null||o===void 0?void 0:o.redirectTo,scopes:(a=e.options)===null||a===void 0?void 0:a.scopes,queryParams:(l=e.options)===null||l===void 0?void 0:l.queryParams,skipBrowserRedirect:!0});return await x(this.fetch,"GET",v,{headers:this.headers,jwt:(u=(c=h.session)===null||c===void 0?void 0:c.access_token)!==null&&u!==void 0?u:void 0})});if(i)throw i;return me()&&!(!((t=e.options)===null||t===void 0)&&t.skipBrowserRedirect)&&window.location.assign(s?.url),{data:{provider:e.provider,url:s?.url},error:null}}catch(s){if(R(s))return{data:{provider:e.provider,url:null},error:s};throw s}}async unlinkIdentity(e){try{return await this._useSession(async t=>{var s,i;const{data:r,error:o}=t;if(o)throw o;return await x(this.fetch,"DELETE",`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:(i=(s=r.session)===null||s===void 0?void 0:s.access_token)!==null&&i!==void 0?i:void 0})})}catch(t){if(R(t))return{data:null,error:t};throw t}}async _refreshAccessToken(e){const t=`#_refreshAccessToken(${e.substring(0,5)}...)`;this._debug(t,"begin");try{const s=Date.now();return await fv(async i=>(i>0&&await dv(200*Math.pow(2,i-1)),this._debug(t,"refreshing attempt",i),await x(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:Ne})),(i,r)=>{const o=200*Math.pow(2,i);return r&&fi(r)&&Date.now()+o-s<Ft})}catch(s){if(this._debug(t,"error",s),R(s))return{data:{session:null,user:null},error:s};throw s}finally{this._debug(t,"end")}}_isValidSession(e){return typeof e=="object"&&e!==null&&"access_token"in e&&"refresh_token"in e&&"expires_at"in e}async _handleProviderSignIn(e,t){const s=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:t.redirectTo,scopes:t.scopes,queryParams:t.queryParams});return this._debug("#_handleProviderSignIn()","provider",e,"options",t,"url",s),me()&&!t.skipBrowserRedirect&&window.location.assign(s),{data:{provider:e,url:s},error:null}}async _recoverAndRefresh(){var e,t;const s="#_recoverAndRefresh()";this._debug(s,"begin");try{const i=await lt(this.storage,this.storageKey);if(i&&this.userStorage){let o=await lt(this.userStorage,this.storageKey+"-user");!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!o&&(o={user:i.user},await $t(this.userStorage,this.storageKey+"-user",o)),i.user=(e=o?.user)!==null&&e!==void 0?e:gi()}else if(i&&!i.user&&!i.user){const o=await lt(this.storage,this.storageKey+"-user");o&&o?.user?(i.user=o.user,await He(this.storage,this.storageKey+"-user"),await $t(this.storage,this.storageKey,i)):i.user=gi()}if(this._debug(s,"session from storage",i),!this._isValidSession(i)){this._debug(s,"session is not valid"),i!==null&&await this._removeSession();return}const r=((t=i.expires_at)!==null&&t!==void 0?t:1/0)*1e3-Date.now()<di;if(this._debug(s,`session has${r?"":" not"} expired with margin of ${di}s`),r){if(this.autoRefreshToken&&i.refresh_token){const{error:o}=await this._callRefreshToken(i.refresh_token);o&&(console.error(o),fi(o)||(this._debug(s,"refresh failed with a non-retryable error, removing the session",o),await this._removeSession()))}}else if(i.user&&i.user.__isUserNotAvailableProxy===!0)try{const{data:o,error:a}=await this._getUser(i.access_token);!a&&o?.user?(i.user=o.user,await this._saveSession(i),await this._notifyAllSubscribers("SIGNED_IN",i)):this._debug(s,"could not get user data, skipping SIGNED_IN notification")}catch(o){console.error("Error getting user data:",o),this._debug(s,"error getting user data, skipping SIGNED_IN notification",o)}else await this._notifyAllSubscribers("SIGNED_IN",i)}catch(i){this._debug(s,"error",i),console.error(i);return}finally{this._debug(s,"end")}}async _callRefreshToken(e){var t,s;if(!e)throw new ze;if(this.refreshingDeferred)return this.refreshingDeferred.promise;const i=`#_callRefreshToken(${e.substring(0,5)}...)`;this._debug(i,"begin");try{this.refreshingDeferred=new Us;const{data:r,error:o}=await this._refreshAccessToken(e);if(o)throw o;if(!r.session)throw new ze;await this._saveSession(r.session),await this._notifyAllSubscribers("TOKEN_REFRESHED",r.session);const a={session:r.session,error:null};return this.refreshingDeferred.resolve(a),a}catch(r){if(this._debug(i,"error",r),R(r)){const o={session:null,error:r};return fi(r)||await this._removeSession(),(t=this.refreshingDeferred)===null||t===void 0||t.resolve(o),o}throw(s=this.refreshingDeferred)===null||s===void 0||s.reject(r),r}finally{this.refreshingDeferred=null,this._debug(i,"end")}}async _notifyAllSubscribers(e,t,s=!0){const i=`#_notifyAllSubscribers(${e})`;this._debug(i,"begin",t,`broadcast = ${s}`);try{this.broadcastChannel&&s&&this.broadcastChannel.postMessage({event:e,session:t});const r=[],o=Array.from(this.stateChangeEmitters.values()).map(async a=>{try{await a.callback(e,t)}catch(l){r.push(l)}});if(await Promise.all(o),r.length>0){for(let a=0;a<r.length;a+=1)console.error(r[a]);throw r[0]}}finally{this._debug(i,"end")}}async _saveSession(e){this._debug("#_saveSession()",e),this.suppressGetSessionWarning=!0;const t=Object.assign({},e),s=t.user&&t.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!s&&t.user&&await $t(this.userStorage,this.storageKey+"-user",{user:t.user});const i=Object.assign({},t);delete i.user;const r=Ma(i);await $t(this.storage,this.storageKey,r)}else{const i=Ma(t);await $t(this.storage,this.storageKey,i)}}async _removeSession(){this._debug("#_removeSession()"),await He(this.storage,this.storageKey),await He(this.storage,this.storageKey+"-code-verifier"),await He(this.storage,this.storageKey+"-user"),this.userStorage&&await He(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&me()&&window?.removeEventListener&&window.removeEventListener("visibilitychange",e)}catch(t){console.error("removing visibilitychange callback failed",t)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const e=setInterval(()=>this._autoRefreshTokenTick(),Ft);this.autoRefreshTicker=e,e&&typeof e=="object"&&typeof e.unref=="function"?e.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(e),setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async _autoRefreshTokenTick(){this._debug("#_autoRefreshTokenTick()","begin");try{await this._acquireLock(0,async()=>{try{const e=Date.now();try{return await this._useSession(async t=>{const{data:{session:s}}=t;if(!s||!s.refresh_token||!s.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const i=Math.floor((s.expires_at*1e3-e)/Ft);this._debug("#_autoRefreshTokenTick()",`access token expires in ${i} ticks, a tick lasts ${Ft}ms, refresh threshold is ${Bi} ticks`),i<=Bi&&await this._callRefreshToken(s.refresh_token)})}catch(t){console.error("Auto refresh tick failed with error. This is likely a transient error.",t)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(e){if(e.isAcquireTimeout||e instanceof Su)this._debug("auto refresh token tick lock not available");else throw e}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!me()||!window?.addEventListener)return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>await this._onVisibilityChanged(!1),window?.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error("_handleVisibilityChange",e)}}async _onVisibilityChanged(e){const t=`#_onVisibilityChanged(${e})`;this._debug(t,"visibilityState",document.visibilityState),document.visibilityState==="visible"?(this.autoRefreshToken&&this._startAutoRefresh(),e||(await this.initializePromise,await this._acquireLock(-1,async()=>{if(document.visibilityState!=="visible"){this._debug(t,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()}))):document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,t,s){const i=[`provider=${encodeURIComponent(t)}`];if(s?.redirectTo&&i.push(`redirect_to=${encodeURIComponent(s.redirectTo)}`),s?.scopes&&i.push(`scopes=${encodeURIComponent(s.scopes)}`),this.flowType==="pkce"){const[r,o]=await Dt(this.storage,this.storageKey),a=new URLSearchParams({code_challenge:`${encodeURIComponent(r)}`,code_challenge_method:`${encodeURIComponent(o)}`});i.push(a.toString())}if(s?.queryParams){const r=new URLSearchParams(s.queryParams);i.push(r.toString())}return s?.skipBrowserRedirect&&i.push(`skip_http_redirect=${s.skipBrowserRedirect}`),`${e}?${i.join("&")}`}async _unenroll(e){try{return await this._useSession(async t=>{var s;const{data:i,error:r}=t;return r?{data:null,error:r}:await x(this.fetch,"DELETE",`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:(s=i?.session)===null||s===void 0?void 0:s.access_token})})}catch(t){if(R(t))return{data:null,error:t};throw t}}async _enroll(e){try{return await this._useSession(async t=>{var s,i;const{data:r,error:o}=t;if(o)return{data:null,error:o};const a=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType==="phone"?{phone:e.phone}:{issuer:e.issuer}),{data:l,error:c}=await x(this.fetch,"POST",`${this.url}/factors`,{body:a,headers:this.headers,jwt:(s=r?.session)===null||s===void 0?void 0:s.access_token});return c?{data:null,error:c}:(e.factorType==="totp"&&(!((i=l?.totp)===null||i===void 0)&&i.qr_code)&&(l.totp.qr_code=`data:image/svg+xml;utf-8,${l.totp.qr_code}`),{data:l,error:null})})}catch(t){if(R(t))return{data:null,error:t};throw t}}async _verify(e){return this._acquireLock(-1,async()=>{try{return await this._useSession(async t=>{var s;const{data:i,error:r}=t;if(r)return{data:null,error:r};const{data:o,error:a}=await x(this.fetch,"POST",`${this.url}/factors/${e.factorId}/verify`,{body:{code:e.code,challenge_id:e.challengeId},headers:this.headers,jwt:(s=i?.session)===null||s===void 0?void 0:s.access_token});return a?{data:null,error:a}:(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+o.expires_in},o)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",o),{data:o,error:a})})}catch(t){if(R(t))return{data:null,error:t};throw t}})}async _challenge(e){return this._acquireLock(-1,async()=>{try{return await this._useSession(async t=>{var s;const{data:i,error:r}=t;return r?{data:null,error:r}:await x(this.fetch,"POST",`${this.url}/factors/${e.factorId}/challenge`,{body:{channel:e.channel},headers:this.headers,jwt:(s=i?.session)===null||s===void 0?void 0:s.access_token})})}catch(t){if(R(t))return{data:null,error:t};throw t}})}async _challengeAndVerify(e){const{data:t,error:s}=await this._challenge({factorId:e.factorId});return s?{data:null,error:s}:await this._verify({factorId:e.factorId,challengeId:t.id,code:e.code})}async _listFactors(){const{data:{user:e},error:t}=await this.getUser();if(t)return{data:null,error:t};const s=e?.factors||[],i=s.filter(o=>o.factor_type==="totp"&&o.status==="verified"),r=s.filter(o=>o.factor_type==="phone"&&o.status==="verified");return{data:{all:s,totp:i,phone:r},error:null}}async _getAuthenticatorAssuranceLevel(){return this._acquireLock(-1,async()=>await this._useSession(async e=>{var t,s;const{data:{session:i},error:r}=e;if(r)return{data:null,error:r};if(!i)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:o}=pi(i.access_token);let a=null;o.aal&&(a=o.aal);let l=a;((s=(t=i.user.factors)===null||t===void 0?void 0:t.filter(h=>h.status==="verified"))!==null&&s!==void 0?s:[]).length>0&&(l="aal2");const u=o.amr||[];return{data:{currentLevel:a,nextLevel:l,currentAuthenticationMethods:u},error:null}}))}async fetchJwk(e,t={keys:[]}){let s=t.keys.find(a=>a.kid===e);if(s)return s;const i=Date.now();if(s=this.jwks.keys.find(a=>a.kid===e),s&&this.jwks_cached_at+Jy>i)return s;const{data:r,error:o}=await x(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(o)throw o;return!r.keys||r.keys.length===0||(this.jwks=r,this.jwks_cached_at=i,s=r.keys.find(a=>a.kid===e),!s)?null:s}async getClaims(e,t={}){try{let s=e;if(!s){const{data:v,error:b}=await this.getSession();if(b||!v.session)return{data:null,error:b};s=v.session.access_token}const{header:i,payload:r,signature:o,raw:{header:a,payload:l}}=pi(s);t?.allowExpired||wv(r.exp);const c=!i.alg||i.alg.startsWith("HS")||!i.kid||!("crypto"in globalThis&&"subtle"in globalThis.crypto)?null:await this.fetchJwk(i.kid,t?.keys?{keys:t.keys}:t?.jwks);if(!c){const{error:v}=await this.getUser(s);if(v)throw v;return{data:{claims:r,header:i,signature:o},error:null}}const u=bv(i.alg),h=await crypto.subtle.importKey("jwk",c,u,!0,["verify"]);if(!await crypto.subtle.verify(u,h,o,ov(`${a}.${l}`)))throw new qi("Invalid JWT signature");return{data:{claims:r,header:i,signature:o},error:null}}catch(s){if(R(s))return{data:null,error:s};throw s}}}Pn.nextInstanceID=0;const jv=Pn;class Fv extends jv{constructor(e){super(e)}}var $v=function(n,e,t,s){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{c(s.next(u))}catch(h){o(h)}}function l(u){try{c(s.throw(u))}catch(h){o(h)}}function c(u){u.done?r(u.value):i(u.value).then(a,l)}c((s=s.apply(n,e||[])).next())})};class Uv{constructor(e,t,s){var i,r,o;if(this.supabaseUrl=e,this.supabaseKey=t,!e)throw new Error("supabaseUrl is required.");if(!t)throw new Error("supabaseKey is required.");const a=qy(e),l=new URL(a);this.realtimeUrl=new URL("realtime/v1",l),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",l),this.storageUrl=new URL("storage/v1",l),this.functionsUrl=new URL("functions/v1",l);const c=`sb-${l.hostname.split(".")[0]}-auth-token`,u={db:My,realtime:Fy,auth:Object.assign(Object.assign({},jy),{storageKey:c}),global:Ly},h=Hy(s??{},u);this.storageKey=(i=h.auth.storageKey)!==null&&i!==void 0?i:"",this.headers=(r=h.global.headers)!==null&&r!==void 0?r:{},h.accessToken?(this.accessToken=h.accessToken,this.auth=new Proxy({},{get:(d,v)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(v)} is not possible`)}})):this.auth=this._initSupabaseAuthClient((o=h.auth)!==null&&o!==void 0?o:{},this.headers,h.global.fetch),this.fetch=Vy(t,this._getAccessToken.bind(this),h.global.fetch),this.realtime=this._initRealtimeClient(Object.assign({headers:this.headers,accessToken:this._getAccessToken.bind(this)},h.realtime)),this.rest=new iy(new URL("rest/v1",l).href,{headers:this.headers,schema:h.db.schema,fetch:this.fetch}),h.accessToken||this._listenForAuthEvents()}get functions(){return new qm(this.functionsUrl.href,{headers:this.headers,customFetch:this.fetch})}get storage(){return new Ny(this.storageUrl.href,this.headers,this.fetch)}from(e){return this.rest.from(e)}schema(e){return this.rest.schema(e)}rpc(e,t={},s={}){return this.rest.rpc(e,t,s)}channel(e,t={config:{}}){return this.realtime.channel(e,t)}getChannels(){return this.realtime.getChannels()}removeChannel(e){return this.realtime.removeChannel(e)}removeAllChannels(){return this.realtime.removeAllChannels()}_getAccessToken(){var e,t;return $v(this,void 0,void 0,function*(){if(this.accessToken)return yield this.accessToken();const{data:s}=yield this.auth.getSession();return(t=(e=s.session)===null||e===void 0?void 0:e.access_token)!==null&&t!==void 0?t:null})}_initSupabaseAuthClient({autoRefreshToken:e,persistSession:t,detectSessionInUrl:s,storage:i,storageKey:r,flowType:o,lock:a,debug:l},c,u){const h={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new Fv({url:this.authUrl.href,headers:Object.assign(Object.assign({},h),c),storageKey:r,autoRefreshToken:e,persistSession:t,detectSessionInUrl:s,storage:i,flowType:o,lock:a,debug:l,fetch:u,hasCustomAuthorizationHeader:"Authorization"in this.headers})}_initRealtimeClient(e){return new vy(this.realtimeUrl.href,Object.assign(Object.assign({},e),{params:Object.assign({apikey:this.supabaseKey},e?.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((t,s)=>{this._handleTokenChanged(t,"CLIENT",s?.access_token)})}_handleTokenChanged(e,t,s){(e==="TOKEN_REFRESHED"||e==="SIGNED_IN")&&this.changedAccessToken!==s?this.changedAccessToken=s:e==="SIGNED_OUT"&&(this.realtime.setAuth(),t=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}}const Bv=(n,e,t)=>new Uv(n,e,t);function Vv(){if(typeof window<"u"||typeof process>"u"||process.version===void 0||process.version===null)return!1;const n=process.version.match(/^v(\d+)\./);return n?parseInt(n[1],10)<=18:!1}Vv()&&console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217");let Xe,Ba=!1,ie,ln=[];window.onerror=function(n,e,t,s,i){alert("JS-Fehler: "+n+" in "+e+" Zeile "+t)};const Bs=Bv("https://axirbthvnznvhfagduyj.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4aXJidGh2bnpudmhmYWdkdXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMDI2MTcsImV4cCI6MjA2ODg3ODYxN30.wfJm9e10_iNuYm_r3es_FmKuXBePsxSjIJcVqmSuYjc");function Wv(n){let e="";localStorage.getItem("deviceId")?e=localStorage.getItem("deviceId"):(e=prompt("Wie soll dieses Gerät heißen?")||"Unbekannt",localStorage.setItem("deviceId",e)),Bs.from("fcm_tokens").upsert({token:n,device_name:e}).then(({error:t})=>{t?console.error("Fehler beim Speichern des Tokens:",t):console.log("Token erfolgreich gespeichert.")})}function Vs(){let n=localStorage.getItem("deviceId");for(;!n||n.trim()==="";)n=prompt("Bitte gib deinen Namen ein"),n===null&&alert("Du musst einen Namen eingeben, um fortzufahren.");return localStorage.setItem("deviceId",n.trim()),n.trim()}try{localStorage.setItem("test","1")}catch{alert("⚠️ Dein Browser blockiert lokalen Speicher. Bitte verlasse den privaten Modus oder ändere die Einstellungen.")}function qv(){Notification.requestPermission().then(n=>{n==="granted"?("serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/firebase-messaging-sw.js").then(e=>{console.log("Service Worker registriert mit Scope:",e.scope)}).catch(e=>{console.error("Service Worker Registrierung fehlgeschlagen:",e),alert("❌ Service Worker konnte nicht registriert werden: "+e.message)})}),or(ys,{vapidKey:"BPxoiPhAH4gXMrR7PhhrAUolApYTK93-MZ48-BHWF0rksFtkvBwE9zYUS2pfiEw6_PXzPYyaQZdNwM6LL4QdeOE"}).then(e=>{if(e){const t=Vs();console.log("Token:",e),_e(P(M,"tokens/"+t),{currentToken:e}),Wv(e),localStorage.setItem("nachrichtAktiv",!0),document.getElementById("permissionButton").style.display="none",alert("✅ Benachrichtigungen aktiviert!")}else console.warn("Kein Token erhalten."),alert("⚠️ Kein Token erhalten. Bitte erneut versuchen.")}).catch(e=>{console.error("Fehler beim Token holen:",e),alert("❌ Fehler beim Token holen: "+e.message)})):(console.warn("Benachrichtigungen nicht erlaubt."),alert("⚠️ Benachrichtigungen wurden abgelehnt."))})}function Hv(){or(ys,{vapidKey:"BPxoiPhAH4gXMrR7PhhrAUolApYTK93-MZ48-BHWF0rksFtkvBwE9zYUS2pfiEw6_PXzPYyaQZdNwM6LL4QdeOE"}).then(n=>{if(n){const e=Vs();pe(P(M,"tokens/"+e)),console.log("Token aus Firebase entfernt:",n)}Bs.from("fcm_tokens").delete().eq("token",n).then(({error:e})=>{e?console.error("Fehler beim Löschen des Tokens aus Supabase:",e):console.log("Token erfolgreich aus Supabase gelöscht.")}),localStorage.removeItem("nachrichtAktiv"),document.getElementById("permissionButton").style.display="block"}),navigator.serviceWorker.getRegistrations().then(n=>{for(let e of n)e.unregister().then(t=>{t&&alert("Service Worker abgemeldet.")})})}async function Tu(n,e,t=[],s=1,i=20){const o=await(await fetch("https://axirbthvnznvhfagduyj.supabase.co/functions/v1/send-to-all",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:n,body:e,tokens:t})})).json();console.log(`📦 Versuch ${s}:`,o),o.failedTokens&&o.failedTokens.length>0&&s<i?(console.log(`🔁 Wiederhole für ${o.failedTokens.length} fehlgeschlagene Tokens in 10 Sekunden...`),setTimeout(()=>{Tu(n,e,o.failedTokens,s+1,i)},1e4)):s>=i?console.warn("⏱️ Max. Anzahl an Versuchen erreicht."):console.log("✅ Alle Benachrichtigungen erfolgreich gesendet.")}async function Ws(n,e,t){const s=await Ce(P(M,"roles")),i=await Ce(P(M,"tokens")),r=s.val(),o=i.val(),a=new Set;if(t==="all"||Array.isArray(t)&&t.includes("all"))for(const l in o)a.add(o[l]);else{const l=Array.isArray(t)?t:[t];for(const c in r){const u=r[c]?.role;l.includes(u)&&o[c]&&a.add(o[c])}}if(a.size===0){console.warn(`⚠️ Keine passenden Tokens für Rollen "${t}" gefunden.`);return}Tu(n,e,Array.from(a))}function Iu(n,e){const t="Misterx-upload",s=new FormData;s.append("file",n),s.append("upload_preset",t),fetch("https://api.cloudinary.com/v1_1/ddvf141hb/image/upload",{method:"POST",body:s}).then(i=>i.json()).then(i=>{i.secure_url&&i.public_id?e({url:i.secure_url}):alert("Fehler beim Hochladen zu Cloudinary.")}).catch(i=>{console.error("Upload-Fehler:",i),alert("Fehler beim Hochladen zu Cloudinary.")})}function zv(){const n=document.getElementById("locationTitle").value,e=document.getElementById("photoInput").files[0],t=document.getElementById("manualLocationDescription").value.trim(),s=document.getElementById("manualLocationContainer");if(!n||!e){alert("Bitte Titel und Foto angeben.");return}const i=Date.now();if(s&&s.style.display!=="none"&&t!==""){const r={title:n,description:t,timestamp:i},o=gs(P(M,"locations"),r),a=n+" - "+t;Ws("Mister X hat sich gezeigt!",a,"agent"),Iu(e,({url:l})=>{_e(P(o,"photoURL"),l)}),document.getElementById("locationTitle").value="",document.getElementById("photoInput").value="",document.getElementById("manualLocationDescription").value="",s.style.display="none",document.getElementById("status").innerText="✅ Standort/Foto erfolgreich gesendet!",qs();return}navigator.geolocation?navigator.geolocation.getCurrentPosition(r=>{const o=r.coords.accuracy;if(o>100){document.getElementById("status").innerText=`⚠️ Standort ungenau (±${Math.round(o)} m). Bitte erneut versuchen oder Standortbeschreibung eingeben.`,s.style.display="block";return}mi(r.coords.latitude,r.coords.longitude,t)},r=>{Ru(r),s.style.display="block",mi(null,null,t)}):(document.getElementById("status").innerText="Geolocation wird nicht unterstützt.",s.style.display="block",mi(null,null,t))}function mi(n,e,t){const s=document.getElementById("locationTitle").value,i=document.getElementById("photoInput").files[0],r=Date.now(),o={title:s,timestamp:r};n!=null&&e!=null&&(o.lat=n,o.lon=e),t&&t!==""&&(o.description=t);const a=gs(P(M,"locations"),o);let l=s;t&&t!==""&&(l+=" - "+t),Ws("Mister X hat sich gezeigt!",l,"agent"),i&&Iu(i,({url:c})=>{_e(P(a,"photoURL"),c)}),document.getElementById("locationTitle").value="",document.getElementById("photoInput").value="",document.getElementById("manualLocationDescription").value="",document.getElementById("manualLocationContainer").style.display="none",document.getElementById("status").innerText="✅ Standort/Foto erfolgreich gesendet!",qs()}function bs(){eu(P(M,"locations"),n=>{if(!n.exists()){ie&&(ie.remove(),ie=null),document.getElementById("map").style.display="none",document.getElementById("locationFeed").innerHTML="",ln=[];return}const e=n.val(),t=Object.values(e).sort((r,o)=>o.timestamp-r.timestamp),s=t.filter(r=>r.lat!=null&&r.lon!=null);if(s.length>0){const{lat:r,lon:o}=s[0];ie&&(ie.remove(),ie=null),ie=L.map("map").setView([r,o],15),L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap"}).addTo(ie),ln.forEach(a=>ie.removeLayer(a)),ln=[],s.forEach(a=>{const l=L.circleMarker([a.lat,a.lon],{radius:5,color:"blue"}).addTo(ie).bindPopup(`📍 ${new Date(a.timestamp).toLocaleString()}`);ln.push(l)}),document.getElementById("map").style.display="block"}else ie&&(ie.remove(),ie=null),document.getElementById("map").style.display="none";const i=document.getElementById("locationFeed");i.innerHTML="",t.forEach(r=>{const o=r.title?r.title:"Automatischer Standort",a=r.timestamp?new Date(r.timestamp).toLocaleTimeString():"",l=r.photoURL?`<img src="${r.photoURL}" alt="Foto" style="max-width: 100%; height: auto; border: 1px solid #ccc; margin-top: 5px;">`:"",c=document.createElement("div");c.style.marginBottom="1em",c.innerHTML=`
        <strong>${o} (${a})</strong><br>
        ${r.description?`<em>📍 ${r.description}</em><br>`:""}
        ${l}
      `,i.appendChild(c)})})}function Kv(){Ce(P(M,"roles")).then(n=>{const e=n.val();for(const t in e)e[t].role==="misterx"&&_e(P(M,"roles/"+t),{role:"start",timestamp:Date.now()});alert("Alle Mister X Rollen wurden zurückgesetzt.")})}async function Gv(){const n=await Ce(P(M,"settings/max_Team_X")),e=n.exists()?n.val():1,s=(await Ce(P(M,"roles"))).val();let i=0;for(const r in s)s[r].role==="misterx"&&i++;return i<e}async function Cu(n){if(n!==localStorage.getItem("activeView")){if(n==="misterx"&&!await Gv()){alert("Es ist bereits ein Gerät als Mister X angemeldet!"),Hi();return}if(n==="settings"&&prompt("Passwort eingeben!")!=="1001"){Hi();return}}document.getElementById("startView").style.display="none",document.getElementById("startView2").style.display="none",document.querySelectorAll(".view").forEach(s=>s.style.display="none"),n==="misterx"?(document.getElementById("misterxView").style.display="block",bs()):n==="agent"?(document.getElementById("agentView").style.display="block",bs()):n==="settings"&&(document.getElementById("settingsView").style.display="block",nw()),localStorage.setItem("activeView",n);const e=Vs();_e(P(M,"roles/"+e),{role:n,timestamp:Date.now()});const t=n;await Bs.from("fcm_tokens").update({role:t}).eq("device_name",e),Ce(P(M,"timer")).then(s=>{const i=s.val();if(i){const{startTime:r,duration:o,durationInput:a}=i;o?(ku(r,o),Gt(!0)):Gt(!1)}})}async function Hi(){document.querySelectorAll(".view").forEach(t=>t.style.display="none"),document.getElementById("startView").style.display="block",document.getElementById("startView2").style.display="block",clearInterval(Xe),localStorage.setItem("activeView","start");const n=Vs();_e(P(M,"roles/"+n),{role:"start",timestamp:Date.now()}),await Bs.from("fcm_tokens").update({role:"start"}).eq("device_name",n)}async function qs(){await pe(P(M,"timer/duration")),await pe(P(M,"timer/startTime")),await pe(P(M,"timerMessage"));const e=(await Ce(P(M,"timerScheduleId"))).val();e&&(await fetch(`https://qstash.upstash.io/v2/schedules/${e}`,{method:"DELETE",headers:{Authorization:"Bearer eyJVc2VySUQiOiI3YjAxMDFmYi04MGE2LTRmMjAtOWM0MS0zNzZiNDUxNmNkOWQiLCJQYXNzd29yZCI6IjYyM2ZhNzlmOWM4MDRhMzQ5YmE2NjZmYjFlMDExNDBjIn0"}}),await pe(P(M,"timerScheduleId"))),typeof Xe<"u"&&clearInterval(Xe);const s=(await Ce(P(M,"timer"))).val();Math.floor(s?.durationInput);let i=1500;typeof s?.durationInput=="number"&&s.durationInput>0&&(i=s.durationInput,(isNaN(i)||i<1)&&(i=60));const r=Date.now(),o=r+i*1e3,a={title:"⏰ Zeit abgelaufen!",body:"Mister X muss sich zeigen!",roles:["misterx"]};await _e(P(M,"timer"),{startTime:r,duration:i,durationInput:i}),await _e(P(M,"timerMessage"),a);const c={destination:"https://webhook.site/2d18361b-d352-4893-9331-5549bc00c8ef",delay:Math.max(o-Date.now(),0),body:JSON.stringify({timerId:"main"})};console.log("Qstasg Payload:",c),fetch("https://qstash.upstash.io/v2/schedules",{method:"POST",headers:{Authorization:"Bearer eyJVc2VySUQiOiI3YjAxMDFmYi04MGE2LTRmMjAtOWM0MS0zNzZiNDUxNmNkOWQiLCJQYXNzd29yZCI6IjYyM2ZhNzlmOWM4MDRhMzQ5YmE2NjZmYjFlMDExNDBjIn0=","Content-Type":"application/json"},body:JSON.stringify(c)}).then(u=>u.json()).then(u=>{u.scheduleId?console.log("Qstash erfolgreich geplant:",u):console.error("Kein ScheduleId von QStash erhalten",u)}).catch(u=>console.error("Fehler beim QStash-Aufruf:",u))}function Yv(){Ba||(Ba=!0,eu(P(M,"timer"),n=>{const e=n.val(),{startTime:t,duration:s,durationInput:i}=e;if(!t){clearInterval(Xe),Gt(!1);const r=document.getElementById("timer"),o=document.getElementById("agentTimer"),a=document.getElementById("settingsTimer");r&&(r.innerText="⏳ Zeit bis zum nächsten Posten: --:--"),o&&(o.innerText="⏳ Mister X Timer: --:--"),a&&(a.innerText="⏳ Aktueller Timer: --:--");return}ku(t,s),Gt(!0)}))}function ku(n,e){clearInterval(Xe),Xe=setInterval(()=>{const t=Date.now(),s=Math.floor((t-n)/1e3),i=e-s;let r;if(i<0)r="abgelaufen";else{const u=Math.floor(i/60),h=i%60;r=`${String(u).padStart(2,"0")}:${String(h).padStart(2,"0")}`}const o=document.getElementById("timer"),a=document.getElementById("agentTimer"),l=document.getElementById("settingsTimer");function c(u){u&&(i<=300&&i>0?(u.style.color="red",u.style.animation="blinker 1s linear infinite"):(u.style.color="",u.style.animation=""))}l&&(l.innerText=`⏳ Aktueller Timer: ${r}`,c(l)),o&&(o.innerText=`⏳ Zeit bis zum nächsten Posten: ${r}`,c(o)),a&&(a.innerText=`⏳ Mister X Timer: ${r}`,c(a)),i<=0&&(clearInterval(Xe),Gt(!1),[o,a,l].forEach(u=>{u&&(u.style.color="",u.style.animation="")}),localStorage.getItem("activeView")==="misterx"&&(alert("Zeit abgelaufen, dein Standort wird einmalig geteilt"),Qv(),qs()))},1e3)}function Jv(){Ce(P(M,"timer")).then(n=>{if(!n.exists())return;const e=n.val(),t=document.getElementById("timerDurationInput");t&&(e&&typeof e.durationInput=="number"?t.value=Math.floor(e.durationInput/60):t.value=25)})}const Au=document.createElement("style");Au.innerHTML=`
@keyframes blinker {
  50% { opacity: 0; }
}
`;document.head.appendChild(Au);function Qv(){navigator.geolocation?navigator.geolocation.getCurrentPosition(n=>{const e=n.coords.latitude,t=n.coords.longitude,s=n.coords.accuracy,i=Date.now();if(s>100){document.getElementById("status").innerText="⚠️ Standort ungenau (±"+Math.round(s)+" m). Bitte Standortbeschreibung manuell eingeben.",standortbeschreibung=prompt("Bitte den Standort beschreiben (bzw. wenn U-Bahn, dann gemäß Regelwerk angeben)")||"wurde nicht angegeben!",gs(P(M,"locations"),{description:standortbeschreibung.trim(),timestamp:i});return}gs(P(M,"locations"),{title:"Automatischer Standort",lat:e,lon:t,timestamp:i}),Ws("Mister X hat sich gezeigt!","Automatische Standort-Übermittlung.","agent"),bs()},Ru):document.getElementById("status").innerText="Geolocation wird nicht unterstützt."}function Ru(n){let e="❌ Fehler beim Abrufen des Standorts.";switch(n.code){case n.PERMISSION_DENIED:e+=" Zugriff verweigert.";break;case n.POSITION_UNAVAILABLE:e+=" Standortinformationen nicht verfügbar.";break;case n.TIMEOUT:e+=" Zeitüberschreitung bei der Standortabfrage.";break}e+=" Bitte erneut versuchen oder Standortbeschreibung manuell eingeben.",document.getElementById("status").innerText=e}function Gt(n){const e=document.getElementById("startTimerButton");e&&(e.disabled=n,e.style.opacity=n?"0.5":"1",e.style.pointerEvents=n?"none":"auto",e.style.cursor=n?"default":"pointer")}function Xv(){localStorage.getItem("nachrichtAktiv")?(document.getElementById("permissionButton").style.display="none",document.getElementById("permissionButton2").style.display="block"):(document.getElementById("permissionButton").style.display="block",document.getElementById("permissionButton2").style.display="none")}function Zv(){confirm("Möchtest du wirklich alle gespeicherten Standorte löschen?")&&pe(P(M,"locations")).then(()=>{alert("Alle Standorte wurden gelöscht."),ie&&(ie.remove(),ie=null),document.getElementById("map").style.display="none",document.getElementById("locationFeed").innerHTML="",ln=[],document.getElementById("status").innerText=""})}async function ew(){await pe(P(M,"timer/duration")),await pe(P(M,"timer/startTime"));const e=(await Ce(P(M,"timerScheduleId"))).val();e&&(await fetch(`https://qstash.upstash.io/v2/schedules/${e}`,{method:"DELETE",headers:{Authorization:"Bearer eyJVc2VySUQiOiI3YjAxMDFmYi04MGE2LTRmMjAtOWM0MS0zNzZiNDUxNmNkOWQiLCJQYXNzd29yZCI6IjYyM2ZhNzlmOWM4MDRhMzQ5YmE2NjZmYjFlMDExNDBjIn0"}}),await pe(P(M,"timerScheduleId"))),await pe(P(M,"timerMessage")),clearInterval(Xe),Gt(!1);const t=document.getElementById("timer"),s=document.getElementById("agentTimer"),i=document.getElementById("settingsTimer");t&&(t.innerText="⏳ Zeit bis zum nächsten Posten: --:--"),s&&(s.innerText="⏳ Mister X Timer: --:--"),i&&(i.innerText="⏳ Aktueller Timer: --:--"),Ws("Timer zurückgesetzt","Der Timer wurde zurückgesetzt!","all")}function tw(){const n=document.getElementById("max_Team_X").value;pe(P(M,"settings/max_Team_X")).then(()=>_e(P(M,"settings/max_Team_X"),Number(n))).then(()=>{console.log("max_Team_X erfolgreich gespeichert:",n)}).catch(e=>{console.error("Fehler beim Speichern von max_Team_X:",e)})}function nw(){const n=document.getElementById("max_Team_X");Ce(P(M,"settings/max_Team_X")).then(e=>{e.exists()?(n.value=e.val(),console.log("max_Team_X geladen:",e.val())):console.warn("Kein max_Team_X-Wert gefunden.")}).catch(e=>{console.error("Fehler beim Laden von max_Team_X:",e)})}function sw(){const e=document.getElementById("timerDurationInput").value*60;pe(P(M,"timer/durationInput")).then(()=>_e(P(M,"timer/durationInput"),Number(e))).then(()=>{console.log("Duration_input:",e)}).catch(t=>{console.error("Fehler beim Speichern von DurationInput:",t)})}function iw(){alert("Seite geladen - DOMContentLoaded ausgelöst"),navigator.serviceWorker.register("firebase-messaging-sw.js").then(e=>{console.log("Service Worker registriert:",e),or(ys,{serviceWorkerRegistration:e,vapidKey:"BPxoiPhAH4gXMrR7PhhrAUolApYTK93-MZ48-BHWF0rksFtkvBwE9zYUS2pfiEw6_PXzPYyaQZdNwM6LL4QdeOE"}).then(t=>{console.log("Token erhalten:",t)}).catch(t=>{console.error("Fehler beim Abrufen des Tokens:",t)})}),window.messaging?Df(ys,e=>{console.log("Nachricht empfangen:",e);const{title:t,body:s}=e.notification;alert(`${t}
${s}`)}):alert("Messaging nicht verfügbar!");try{const e=localStorage.getItem("activeView");e&&e!=="start"?Cu(e):(document.getElementById("startView").style.display="block",document.getElementById("startView2").style.display="block")}catch(e){alert("Fehler beim Zugriff auf localStorage: "+e.message),document.getElementById("startView").style.display="block",document.getElementById("startView2").style.display="block"}bs(),Yv(),Jv(),Xv();const n=document.getElementById("photoInput");n&&n.addEventListener("change",function(){this.files[0]&&(document.getElementById("status").innerText="📸 Foto ausgewählt!")})}document.addEventListener("DOMContentLoaded",iw);window.switchView=Cu;window.requestPermission=qv;window.sendLocationWithPhoto=zv;window.startTimer=qs;window.goBack=Hi;window.save_timer_duration=sw;window.save_max_mister_x=tw;window.resetTimer=ew;window.deleteAllLocations=Zv;window.resetAllMisterXRollen=Kv;window.removeNotificationSetup=Hv;
