(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();const Il=()=>{};var Ds={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jr={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const w=function(t,e){if(!t)throw gt(e)},gt=function(t){return new Error("Firebase Database ("+Jr.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zr=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&i+1<t.length&&(t.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++i)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},bl=function(t){const e=[];let n=0,i=0;for(;n<t.length;){const s=t[n++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=t[n++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=t[n++],o=t[n++],a=t[n++],c=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(c>>10)),e[i++]=String.fromCharCode(56320+(c&1023))}else{const r=t[n++],o=t[n++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},xi={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<t.length;s+=3){const r=t[s],o=s+1<t.length,a=o?t[s+1]:0,c=s+2<t.length,l=c?t[s+2]:0,p=r>>2,m=(r&3)<<4|a>>4;let _=(a&15)<<2|l>>6,E=l&63;c||(E=64,o||(_=64)),i.push(n[p],n[m],n[_],n[E])}return i.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Zr(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):bl(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<t.length;){const r=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const l=s<t.length?n[t.charAt(s)]:64;++s;const m=s<t.length?n[t.charAt(s)]:64;if(++s,r==null||a==null||l==null||m==null)throw new Tl;const _=r<<2|a>>4;if(i.push(_),l!==64){const E=a<<4&240|l>>2;if(i.push(E),m!==64){const I=l<<6&192|m;i.push(I)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Tl extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const eo=function(t){const e=Zr(t);return xi.encodeByteArray(e,!0)},nn=function(t){return eo(t).replace(/\./g,"")},_i=function(t){try{return xi.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cl(t){return to(void 0,t)}function to(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!Sl(n)||(t[n]=to(t[n],e[n]));return t}function Sl(t){return t!=="__proto__"}/**
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
 */function Al(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const kl=()=>Al().__FIREBASE_DEFAULTS__,Nl=()=>{if(typeof process>"u"||typeof Ds>"u")return;const t=Ds.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Rl=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&_i(t[1]);return e&&JSON.parse(e)},no=()=>{try{return Il()||kl()||Nl()||Rl()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Pl=t=>no()?.emulatorHosts?.[t],io=t=>{const e=Pl(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),i]:[e.substring(0,n),i]},so=()=>no()?.config;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class An{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,i)=>{n?this.reject(n):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,i))}}}/**
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
 */function kn(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function ro(t){return(await fetch(t,{credentials:"include"})).ok}/**
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
 */function oo(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},i=e||"demo-project",s=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...t};return[nn(JSON.stringify(n)),nn(JSON.stringify(o)),""].join(".")}const Ct={};function Dl(){const t={prod:[],emulator:[]};for(const e of Object.keys(Ct))Ct[e]?t.emulator.push(e):t.prod.push(e);return t}function Ol(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let Os=!1;function ao(t,e){if(typeof window>"u"||typeof document>"u"||!kn(window.location.host)||Ct[t]===e||Ct[t]||Os)return;Ct[t]=e;function n(_){return`__firebase__banner__${_}`}const i="__firebase__banner",r=Dl().prod.length>0;function o(){const _=document.getElementById(i);_&&_.remove()}function a(_){_.style.display="flex",_.style.background="#7faaf0",_.style.position="fixed",_.style.bottom="5px",_.style.left="5px",_.style.padding=".5em",_.style.borderRadius="5px",_.style.alignItems="center"}function c(_,E){_.setAttribute("width","24"),_.setAttribute("id",E),_.setAttribute("height","24"),_.setAttribute("viewBox","0 0 24 24"),_.setAttribute("fill","none"),_.style.marginLeft="-6px"}function l(){const _=document.createElement("span");return _.style.cursor="pointer",_.style.marginLeft="16px",_.style.fontSize="24px",_.innerHTML=" &times;",_.onclick=()=>{Os=!0,o()},_}function p(_,E){_.setAttribute("id",E),_.innerText="Learn more",_.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",_.setAttribute("target","__blank"),_.style.paddingLeft="5px",_.style.textDecoration="underline"}function m(){const _=Ol(i),E=n("text"),I=document.getElementById(E)||document.createElement("span"),b=n("learnmore"),T=document.getElementById(b)||document.createElement("a"),$=n("preprendIcon"),Q=document.getElementById($)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(_.created){const V=_.element;a(V),p(T,b);const W=l();c(Q,$),V.append(Q,I,T,W),document.body.appendChild(V)}r?(I.innerText="Preview backend disconnected.",Q.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(Q.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,I.innerText="Preview backend running in this workspace."),I.setAttribute("id",E)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",m):m()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xl(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function lo(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(xl())}function Ml(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Ll(){return Jr.NODE_ADMIN===!0}function co(){try{return typeof indexedDB=="object"}catch{return!1}}function ho(){return new Promise((t,e)=>{try{let n=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(i),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(n){e(n)}})}function Fl(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bl="FirebaseError";class $e extends Error{constructor(e,n,i){super(n),this.code=e,this.customData=i,this.name=Bl,Object.setPrototypeOf(this,$e.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Nn.prototype.create)}}class Nn{constructor(e,n,i){this.service=e,this.serviceName=n,this.errors=i}create(e,...n){const i=n[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?Ul(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new $e(s,a,i)}}function Ul(t,e){return t.replace(Vl,(n,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const Vl=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pt(t){return JSON.parse(t)}function j(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uo=function(t){let e={},n={},i={},s="";try{const r=t.split(".");e=Pt(_i(r[0])||""),n=Pt(_i(r[1])||""),s=r[2],i=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:i,signature:s}},Wl=function(t){const e=uo(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},$l=function(t){const e=uo(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pe(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function ut(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function xs(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function sn(t,e,n){const i={};for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(i[s]=e.call(n,t[s],s,t));return i}function rn(t,e){if(t===e)return!0;const n=Object.keys(t),i=Object.keys(e);for(const s of n){if(!i.includes(s))return!1;const r=t[s],o=e[s];if(Ms(r)&&Ms(o)){if(!rn(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!n.includes(s))return!1;return!0}function Ms(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hl(t){const e=[];for(const[n,i]of Object.entries(t))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jl{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const i=this.W_;if(typeof e=="string")for(let m=0;m<16;m++)i[m]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let m=0;m<16;m++)i[m]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let m=16;m<80;m++){const _=i[m-3]^i[m-8]^i[m-14]^i[m-16];i[m]=(_<<1|_>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],l,p;for(let m=0;m<80;m++){m<40?m<20?(l=a^r&(o^a),p=1518500249):(l=r^o^a,p=1859775393):m<60?(l=r&o|a&(r|o),p=2400959708):(l=r^o^a,p=3395469782);const _=(s<<5|s>>>27)+l+c+p+i[m]&4294967295;c=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=_}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const i=n-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<n;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<n;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<n;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=n&255,n/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function Mi(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zl=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,w(i<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):s<65536?(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Rn=function(t){let e=0;for(let n=0;n<t.length;n++){const i=t.charCodeAt(n);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,n++):e+=3}return e};/**
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
 */function ae(t){return t&&t._delegate?t._delegate:t}class pe{constructor(e,n,i){this.name=e,this.instanceFactory=n,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const ze="[DEFAULT]";/**
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
 */class ql{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const i=new An;if(this.instancesDeferred.set(n,i),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Kl(e))try{this.getOrInitializeService({instanceIdentifier:ze})}catch{}for(const[n,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=ze){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ze){return this.instances.has(e)}getOptions(e=ze){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:n});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,n){const i=this.normalizeInstanceIdentifier(n),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const i=this.onInitCallbacks.get(n);if(i)for(const s of i)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:Gl(e),options:n}),this.instances.set(e,i),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=ze){return this.component?this.component.multipleInstances?e:ze:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Gl(t){return t===ze?void 0:t}function Kl(t){return t.instantiationMode==="EAGER"}/**
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
 */class Yl{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new ql(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var O;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(O||(O={}));const Ql={debug:O.DEBUG,verbose:O.VERBOSE,info:O.INFO,warn:O.WARN,error:O.ERROR,silent:O.SILENT},Xl=O.INFO,Jl={[O.DEBUG]:"log",[O.VERBOSE]:"log",[O.INFO]:"info",[O.WARN]:"warn",[O.ERROR]:"error"},Zl=(t,e,...n)=>{if(e<t.logLevel)return;const i=new Date().toISOString(),s=Jl[e];if(s)console[s](`[${i}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Li{constructor(e){this.name=e,this._logLevel=Xl,this._logHandler=Zl,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in O))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ql[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,O.DEBUG,...e),this._logHandler(this,O.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,O.VERBOSE,...e),this._logHandler(this,O.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,O.INFO,...e),this._logHandler(this,O.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,O.WARN,...e),this._logHandler(this,O.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,O.ERROR,...e),this._logHandler(this,O.ERROR,...e)}}const ec=(t,e)=>e.some(n=>t instanceof n);let Ls,Fs;function tc(){return Ls||(Ls=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function nc(){return Fs||(Fs=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const fo=new WeakMap,gi=new WeakMap,po=new WeakMap,Yn=new WeakMap,Fi=new WeakMap;function ic(t){const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("success",r),t.removeEventListener("error",o)},r=()=>{n(Ae(t.result)),s()},o=()=>{i(t.error),s()};t.addEventListener("success",r),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&fo.set(n,t)}).catch(()=>{}),Fi.set(e,t),e}function sc(t){if(gi.has(t))return;const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",o),t.removeEventListener("abort",o)},r=()=>{n(),s()},o=()=>{i(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",r),t.addEventListener("error",o),t.addEventListener("abort",o)});gi.set(t,e)}let mi={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return gi.get(t);if(e==="objectStoreNames")return t.objectStoreNames||po.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Ae(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function rc(t){mi=t(mi)}function oc(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const i=t.call(Qn(this),e,...n);return po.set(i,e.sort?e.sort():[e]),Ae(i)}:nc().includes(t)?function(...e){return t.apply(Qn(this),e),Ae(fo.get(this))}:function(...e){return Ae(t.apply(Qn(this),e))}}function ac(t){return typeof t=="function"?oc(t):(t instanceof IDBTransaction&&sc(t),ec(t,tc())?new Proxy(t,mi):t)}function Ae(t){if(t instanceof IDBRequest)return ic(t);if(Yn.has(t))return Yn.get(t);const e=ac(t);return e!==t&&(Yn.set(t,e),Fi.set(e,t)),e}const Qn=t=>Fi.get(t);function Pn(t,e,{blocked:n,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(t,e),a=Ae(o);return i&&o.addEventListener("upgradeneeded",c=>{i(Ae(o.result),c.oldVersion,c.newVersion,Ae(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{r&&c.addEventListener("close",()=>r()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}function Xn(t,{blocked:e}={}){const n=indexedDB.deleteDatabase(t);return e&&n.addEventListener("blocked",i=>e(i.oldVersion,i)),Ae(n).then(()=>{})}const lc=["get","getKey","getAll","getAllKeys","count"],cc=["put","add","delete","clear"],Jn=new Map;function Bs(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Jn.get(e))return Jn.get(e);const n=e.replace(/FromIndex$/,""),i=e!==n,s=cc.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(s||lc.includes(n)))return;const r=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let l=c.store;return i&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),s&&c.done]))[0]};return Jn.set(e,r),r}rc(t=>({...t,get:(e,n,i)=>Bs(e,n)||t.get(e,n,i),has:(e,n)=>!!Bs(e,n)||t.has(e,n)}));/**
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
 */class hc{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(uc(n)){const i=n.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(n=>n).join(" ")}}function uc(t){return t.getComponent()?.type==="VERSION"}const yi="@firebase/app",Us="0.14.0";/**
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
 */const Ne=new Li("@firebase/app"),dc="@firebase/app-compat",fc="@firebase/analytics-compat",pc="@firebase/analytics",_c="@firebase/app-check-compat",gc="@firebase/app-check",mc="@firebase/auth",yc="@firebase/auth-compat",vc="@firebase/database",wc="@firebase/data-connect",Ec="@firebase/database-compat",Ic="@firebase/functions",bc="@firebase/functions-compat",Tc="@firebase/installations",Cc="@firebase/installations-compat",Sc="@firebase/messaging",Ac="@firebase/messaging-compat",kc="@firebase/performance",Nc="@firebase/performance-compat",Rc="@firebase/remote-config",Pc="@firebase/remote-config-compat",Dc="@firebase/storage",Oc="@firebase/storage-compat",xc="@firebase/firestore",Mc="@firebase/ai",Lc="@firebase/firestore-compat",Fc="firebase",Bc="12.0.0";/**
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
 */const vi="[DEFAULT]",Uc={[yi]:"fire-core",[dc]:"fire-core-compat",[pc]:"fire-analytics",[fc]:"fire-analytics-compat",[gc]:"fire-app-check",[_c]:"fire-app-check-compat",[mc]:"fire-auth",[yc]:"fire-auth-compat",[vc]:"fire-rtdb",[wc]:"fire-data-connect",[Ec]:"fire-rtdb-compat",[Ic]:"fire-fn",[bc]:"fire-fn-compat",[Tc]:"fire-iid",[Cc]:"fire-iid-compat",[Sc]:"fire-fcm",[Ac]:"fire-fcm-compat",[kc]:"fire-perf",[Nc]:"fire-perf-compat",[Rc]:"fire-rc",[Pc]:"fire-rc-compat",[Dc]:"fire-gcs",[Oc]:"fire-gcs-compat",[xc]:"fire-fst",[Lc]:"fire-fst-compat",[Mc]:"fire-vertex","fire-js":"fire-js",[Fc]:"fire-js-all"};/**
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
 */const on=new Map,Vc=new Map,wi=new Map;function Vs(t,e){try{t.container.addComponent(e)}catch(n){Ne.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function me(t){const e=t.name;if(wi.has(e))return Ne.debug(`There were multiple attempts to register component ${e}.`),!1;wi.set(e,t);for(const n of on.values())Vs(n,t);for(const n of Vc.values())Vs(n,t);return!0}function jt(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Bi(t){return t==null?!1:t.settings!==void 0}/**
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
 */const Wc={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},xe=new Nn("app","Firebase",Wc);/**
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
 */class $c{constructor(e,n,i){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new pe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw xe.create("app-deleted",{appName:this._name})}}/**
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
 */const Ui=Bc;function _o(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const i={name:vi,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw xe.create("bad-app-name",{appName:String(s)});if(n||(n=so()),!n)throw xe.create("no-options");const r=on.get(s);if(r){if(rn(n,r.options)&&rn(i,r.config))return r;throw xe.create("duplicate-app",{appName:s})}const o=new Yl(s);for(const c of wi.values())o.addComponent(c);const a=new $c(n,i,o);return on.set(s,a),a}function Vi(t=vi){const e=on.get(t);if(!e&&t===vi&&so())return _o();if(!e)throw xe.create("no-app",{appName:t});return e}function te(t,e,n){let i=Uc[t]??t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${i}" with version "${e}":`];s&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ne.warn(o.join(" "));return}me(new pe(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const Hc="firebase-heartbeat-database",jc=1,Dt="firebase-heartbeat-store";let Zn=null;function go(){return Zn||(Zn=Pn(Hc,jc,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Dt)}catch(n){console.warn(n)}}}}).catch(t=>{throw xe.create("idb-open",{originalErrorMessage:t.message})})),Zn}async function zc(t){try{const n=(await go()).transaction(Dt),i=await n.objectStore(Dt).get(mo(t));return await n.done,i}catch(e){if(e instanceof $e)Ne.warn(e.message);else{const n=xe.create("idb-get",{originalErrorMessage:e?.message});Ne.warn(n.message)}}}async function Ws(t,e){try{const i=(await go()).transaction(Dt,"readwrite");await i.objectStore(Dt).put(e,mo(t)),await i.done}catch(n){if(n instanceof $e)Ne.warn(n.message);else{const i=xe.create("idb-set",{originalErrorMessage:n?.message});Ne.warn(i.message)}}}function mo(t){return`${t.name}!${t.options.appId}`}/**
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
 */const qc=1024,Gc=30;class Kc{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Qc(n),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=$s();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(s=>s.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:n}),this._heartbeatsCache.heartbeats.length>Gc){const s=Xc(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Ne.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=$s(),{heartbeatsToSend:n,unsentEntries:i}=Yc(this._heartbeatsCache.heartbeats),s=nn(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return Ne.warn(e),""}}}function $s(){return new Date().toISOString().substring(0,10)}function Yc(t,e=qc){const n=[];let i=t.slice();for(const s of t){const r=n.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),Hs(n)>e){r.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Hs(n)>e){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}class Qc{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return co()?ho().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await zc(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Ws(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Ws(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Hs(t){return nn(JSON.stringify({version:2,heartbeats:t})).length}function Xc(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let i=1;i<t.length;i++)t[i].date<n&&(n=t[i].date,e=i);return e}/**
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
 */function Jc(t){me(new pe("platform-logger",e=>new hc(e),"PRIVATE")),me(new pe("heartbeat",e=>new Kc(e),"PRIVATE")),te(yi,Us,t),te(yi,Us,"esm2020"),te("fire-js","")}Jc("");const yo="@firebase/installations",Wi="0.6.19";/**
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
 */const vo=1e4,wo=`w:${Wi}`,Eo="FIS_v2",Zc="https://firebaseinstallations.googleapis.com/v1",eh=3600*1e3,th="installations",nh="Installations";/**
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
 */const ih={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Ze=new Nn(th,nh,ih);function Io(t){return t instanceof $e&&t.code.includes("request-failed")}/**
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
 */function bo({projectId:t}){return`${Zc}/projects/${t}/installations`}function To(t){return{token:t.token,requestStatus:2,expiresIn:rh(t.expiresIn),creationTime:Date.now()}}async function Co(t,e){const i=(await e.json()).error;return Ze.create("request-failed",{requestName:t,serverCode:i.code,serverMessage:i.message,serverStatus:i.status})}function So({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function sh(t,{refreshToken:e}){const n=So(t);return n.append("Authorization",oh(e)),n}async function Ao(t){const e=await t();return e.status>=500&&e.status<600?t():e}function rh(t){return Number(t.replace("s","000"))}function oh(t){return`${Eo} ${t}`}/**
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
 */async function ah({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const i=bo(t),s=So(t),r=e.getImmediate({optional:!0});if(r){const l=await r.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={fid:n,authVersion:Eo,appId:t.appId,sdkVersion:wo},a={method:"POST",headers:s,body:JSON.stringify(o)},c=await Ao(()=>fetch(i,a));if(c.ok){const l=await c.json();return{fid:l.fid||n,registrationStatus:2,refreshToken:l.refreshToken,authToken:To(l.authToken)}}else throw await Co("Create Installation",c)}/**
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
 */function ko(t){return new Promise(e=>{setTimeout(e,t)})}/**
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
 */function lh(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const ch=/^[cdef][\w-]{21}$/,Ei="";function hh(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=uh(t);return ch.test(n)?n:Ei}catch{return Ei}}function uh(t){return lh(t).substr(0,22)}/**
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
 */function Dn(t){return`${t.appName}!${t.appId}`}/**
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
 */const No=new Map;function Ro(t,e){const n=Dn(t);Po(n,e),dh(n,e)}function Po(t,e){const n=No.get(t);if(n)for(const i of n)i(e)}function dh(t,e){const n=fh();n&&n.postMessage({key:t,fid:e}),ph()}let Ge=null;function fh(){return!Ge&&"BroadcastChannel"in self&&(Ge=new BroadcastChannel("[Firebase] FID Change"),Ge.onmessage=t=>{Po(t.data.key,t.data.fid)}),Ge}function ph(){No.size===0&&Ge&&(Ge.close(),Ge=null)}/**
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
 */const _h="firebase-installations-database",gh=1,et="firebase-installations-store";let ei=null;function $i(){return ei||(ei=Pn(_h,gh,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(et)}}})),ei}async function an(t,e){const n=Dn(t),s=(await $i()).transaction(et,"readwrite"),r=s.objectStore(et),o=await r.get(n);return await r.put(e,n),await s.done,(!o||o.fid!==e.fid)&&Ro(t,e.fid),e}async function Do(t){const e=Dn(t),i=(await $i()).transaction(et,"readwrite");await i.objectStore(et).delete(e),await i.done}async function On(t,e){const n=Dn(t),s=(await $i()).transaction(et,"readwrite"),r=s.objectStore(et),o=await r.get(n),a=e(o);return a===void 0?await r.delete(n):await r.put(a,n),await s.done,a&&(!o||o.fid!==a.fid)&&Ro(t,a.fid),a}/**
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
 */async function Hi(t){let e;const n=await On(t.appConfig,i=>{const s=mh(i),r=yh(t,s);return e=r.registrationPromise,r.installationEntry});return n.fid===Ei?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function mh(t){const e=t||{fid:hh(),registrationStatus:0};return Oo(e)}function yh(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(Ze.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},i=vh(t,n);return{installationEntry:n,registrationPromise:i}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:wh(t)}:{installationEntry:e}}async function vh(t,e){try{const n=await ah(t,e);return an(t.appConfig,n)}catch(n){throw Io(n)&&n.customData.serverCode===409?await Do(t.appConfig):await an(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function wh(t){let e=await js(t.appConfig);for(;e.registrationStatus===1;)await ko(100),e=await js(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:i}=await Hi(t);return i||n}return e}function js(t){return On(t,e=>{if(!e)throw Ze.create("installation-not-found");return Oo(e)})}function Oo(t){return Eh(t)?{fid:t.fid,registrationStatus:0}:t}function Eh(t){return t.registrationStatus===1&&t.registrationTime+vo<Date.now()}/**
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
 */async function Ih({appConfig:t,heartbeatServiceProvider:e},n){const i=bh(t,n),s=sh(t,n),r=e.getImmediate({optional:!0});if(r){const l=await r.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={installation:{sdkVersion:wo,appId:t.appId}},a={method:"POST",headers:s,body:JSON.stringify(o)},c=await Ao(()=>fetch(i,a));if(c.ok){const l=await c.json();return To(l)}else throw await Co("Generate Auth Token",c)}function bh(t,{fid:e}){return`${bo(t)}/${e}/authTokens:generate`}/**
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
 */async function ji(t,e=!1){let n;const i=await On(t.appConfig,r=>{if(!xo(r))throw Ze.create("not-registered");const o=r.authToken;if(!e&&Sh(o))return r;if(o.requestStatus===1)return n=Th(t,e),r;{if(!navigator.onLine)throw Ze.create("app-offline");const a=kh(r);return n=Ch(t,a),a}});return n?await n:i.authToken}async function Th(t,e){let n=await zs(t.appConfig);for(;n.authToken.requestStatus===1;)await ko(100),n=await zs(t.appConfig);const i=n.authToken;return i.requestStatus===0?ji(t,e):i}function zs(t){return On(t,e=>{if(!xo(e))throw Ze.create("not-registered");const n=e.authToken;return Nh(n)?{...e,authToken:{requestStatus:0}}:e})}async function Ch(t,e){try{const n=await Ih(t,e),i={...e,authToken:n};return await an(t.appConfig,i),n}catch(n){if(Io(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await Do(t.appConfig);else{const i={...e,authToken:{requestStatus:0}};await an(t.appConfig,i)}throw n}}function xo(t){return t!==void 0&&t.registrationStatus===2}function Sh(t){return t.requestStatus===2&&!Ah(t)}function Ah(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+eh}function kh(t){const e={requestStatus:1,requestTime:Date.now()};return{...t,authToken:e}}function Nh(t){return t.requestStatus===1&&t.requestTime+vo<Date.now()}/**
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
 */async function Rh(t){const e=t,{installationEntry:n,registrationPromise:i}=await Hi(e);return i?i.catch(console.error):ji(e).catch(console.error),n.fid}/**
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
 */async function Ph(t,e=!1){const n=t;return await Dh(n),(await ji(n,e)).token}async function Dh(t){const{registrationPromise:e}=await Hi(t);e&&await e}/**
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
 */function Oh(t){if(!t||!t.options)throw ti("App Configuration");if(!t.name)throw ti("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw ti(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function ti(t){return Ze.create("missing-app-config-values",{valueName:t})}/**
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
 */const Mo="installations",xh="installations-internal",Mh=t=>{const e=t.getProvider("app").getImmediate(),n=Oh(e),i=jt(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:i,_delete:()=>Promise.resolve()}},Lh=t=>{const e=t.getProvider("app").getImmediate(),n=jt(e,Mo).getImmediate();return{getId:()=>Rh(n),getToken:s=>Ph(n,s)}};function Fh(){me(new pe(Mo,Mh,"PUBLIC")),me(new pe(xh,Lh,"PRIVATE"))}Fh();te(yo,Wi);te(yo,Wi,"esm2020");/**
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
 */const Bh="/firebase-messaging-sw.js",Uh="/firebase-cloud-messaging-push-scope",Lo="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",Vh="https://fcmregistrations.googleapis.com/v1",Fo="google.c.a.c_id",Wh="google.c.a.c_l",$h="google.c.a.ts",Hh="google.c.a.e",qs=1e4;var Gs;(function(t){t[t.DATA_MESSAGE=1]="DATA_MESSAGE",t[t.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(Gs||(Gs={}));/**
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
 */var Ot;(function(t){t.PUSH_RECEIVED="push-received",t.NOTIFICATION_CLICKED="notification-clicked"})(Ot||(Ot={}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ie(t){const e=new Uint8Array(t);return btoa(String.fromCharCode(...e)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function jh(t){const e="=".repeat((4-t.length%4)%4),n=(t+e).replace(/\-/g,"+").replace(/_/g,"/"),i=atob(n),s=new Uint8Array(i.length);for(let r=0;r<i.length;++r)s[r]=i.charCodeAt(r);return s}/**
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
 */const ni="fcm_token_details_db",zh=5,Ks="fcm_token_object_Store";async function qh(t){if("databases"in indexedDB&&!(await indexedDB.databases()).map(r=>r.name).includes(ni))return null;let e=null;return(await Pn(ni,zh,{upgrade:async(i,s,r,o)=>{if(s<2||!i.objectStoreNames.contains(Ks))return;const a=o.objectStore(Ks),c=await a.index("fcmSenderId").get(t);if(await a.clear(),!!c){if(s===2){const l=c;if(!l.auth||!l.p256dh||!l.endpoint)return;e={token:l.fcmToken,createTime:l.createTime??Date.now(),subscriptionOptions:{auth:l.auth,p256dh:l.p256dh,endpoint:l.endpoint,swScope:l.swScope,vapidKey:typeof l.vapidKey=="string"?l.vapidKey:Ie(l.vapidKey)}}}else if(s===3){const l=c;e={token:l.fcmToken,createTime:l.createTime,subscriptionOptions:{auth:Ie(l.auth),p256dh:Ie(l.p256dh),endpoint:l.endpoint,swScope:l.swScope,vapidKey:Ie(l.vapidKey)}}}else if(s===4){const l=c;e={token:l.fcmToken,createTime:l.createTime,subscriptionOptions:{auth:Ie(l.auth),p256dh:Ie(l.p256dh),endpoint:l.endpoint,swScope:l.swScope,vapidKey:Ie(l.vapidKey)}}}}}})).close(),await Xn(ni),await Xn("fcm_vapid_details_db"),await Xn("undefined"),Gh(e)?e:null}function Gh(t){if(!t||!t.subscriptionOptions)return!1;const{subscriptionOptions:e}=t;return typeof t.createTime=="number"&&t.createTime>0&&typeof t.token=="string"&&t.token.length>0&&typeof e.auth=="string"&&e.auth.length>0&&typeof e.p256dh=="string"&&e.p256dh.length>0&&typeof e.endpoint=="string"&&e.endpoint.length>0&&typeof e.swScope=="string"&&e.swScope.length>0&&typeof e.vapidKey=="string"&&e.vapidKey.length>0}/**
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
 */const Kh="firebase-messaging-database",Yh=1,tt="firebase-messaging-store";let ii=null;function zi(){return ii||(ii=Pn(Kh,Yh,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(tt)}}})),ii}async function Bo(t){const e=Gi(t),i=await(await zi()).transaction(tt).objectStore(tt).get(e);if(i)return i;{const s=await qh(t.appConfig.senderId);if(s)return await qi(t,s),s}}async function qi(t,e){const n=Gi(t),s=(await zi()).transaction(tt,"readwrite");return await s.objectStore(tt).put(e,n),await s.done,e}async function Qh(t){const e=Gi(t),i=(await zi()).transaction(tt,"readwrite");await i.objectStore(tt).delete(e),await i.done}function Gi({appConfig:t}){return t.appId}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xh={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},Y=new Nn("messaging","Messaging",Xh);/**
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
 */async function Jh(t,e){const n=await Yi(t),i=Vo(e),s={method:"POST",headers:n,body:JSON.stringify(i)};let r;try{r=await(await fetch(Ki(t.appConfig),s)).json()}catch(o){throw Y.create("token-subscribe-failed",{errorInfo:o?.toString()})}if(r.error){const o=r.error.message;throw Y.create("token-subscribe-failed",{errorInfo:o})}if(!r.token)throw Y.create("token-subscribe-no-token");return r.token}async function Zh(t,e){const n=await Yi(t),i=Vo(e.subscriptionOptions),s={method:"PATCH",headers:n,body:JSON.stringify(i)};let r;try{r=await(await fetch(`${Ki(t.appConfig)}/${e.token}`,s)).json()}catch(o){throw Y.create("token-update-failed",{errorInfo:o?.toString()})}if(r.error){const o=r.error.message;throw Y.create("token-update-failed",{errorInfo:o})}if(!r.token)throw Y.create("token-update-no-token");return r.token}async function Uo(t,e){const i={method:"DELETE",headers:await Yi(t)};try{const r=await(await fetch(`${Ki(t.appConfig)}/${e}`,i)).json();if(r.error){const o=r.error.message;throw Y.create("token-unsubscribe-failed",{errorInfo:o})}}catch(s){throw Y.create("token-unsubscribe-failed",{errorInfo:s?.toString()})}}function Ki({projectId:t}){return`${Vh}/projects/${t}/registrations`}async function Yi({appConfig:t,installations:e}){const n=await e.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function Vo({p256dh:t,auth:e,endpoint:n,vapidKey:i}){const s={web:{endpoint:n,auth:e,p256dh:t}};return i!==Lo&&(s.web.applicationPubKey=i),s}/**
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
 */const eu=10080*60*1e3;async function tu(t){const e=await su(t.swRegistration,t.vapidKey),n={vapidKey:t.vapidKey,swScope:t.swRegistration.scope,endpoint:e.endpoint,auth:Ie(e.getKey("auth")),p256dh:Ie(e.getKey("p256dh"))},i=await Bo(t.firebaseDependencies);if(i){if(ru(i.subscriptionOptions,n))return Date.now()>=i.createTime+eu?iu(t,{token:i.token,createTime:Date.now(),subscriptionOptions:n}):i.token;try{await Uo(t.firebaseDependencies,i.token)}catch(s){console.warn(s)}return Ys(t.firebaseDependencies,n)}else return Ys(t.firebaseDependencies,n)}async function nu(t){const e=await Bo(t.firebaseDependencies);e&&(await Uo(t.firebaseDependencies,e.token),await Qh(t.firebaseDependencies));const n=await t.swRegistration.pushManager.getSubscription();return n?n.unsubscribe():!0}async function iu(t,e){try{const n=await Zh(t.firebaseDependencies,e),i={...e,token:n,createTime:Date.now()};return await qi(t.firebaseDependencies,i),n}catch(n){throw n}}async function Ys(t,e){const i={token:await Jh(t,e),createTime:Date.now(),subscriptionOptions:e};return await qi(t,i),i.token}async function su(t,e){const n=await t.pushManager.getSubscription();return n||t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:jh(e)})}function ru(t,e){const n=e.vapidKey===t.vapidKey,i=e.endpoint===t.endpoint,s=e.auth===t.auth,r=e.p256dh===t.p256dh;return n&&i&&s&&r}/**
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
 */function Qs(t){const e={from:t.from,collapseKey:t.collapse_key,messageId:t.fcmMessageId};return ou(e,t),au(e,t),lu(e,t),e}function ou(t,e){if(!e.notification)return;t.notification={};const n=e.notification.title;n&&(t.notification.title=n);const i=e.notification.body;i&&(t.notification.body=i);const s=e.notification.image;s&&(t.notification.image=s);const r=e.notification.icon;r&&(t.notification.icon=r)}function au(t,e){e.data&&(t.data=e.data)}function lu(t,e){if(!e.fcmOptions&&!e.notification?.click_action)return;t.fcmOptions={};const n=e.fcmOptions?.link??e.notification?.click_action;n&&(t.fcmOptions.link=n);const i=e.fcmOptions?.analytics_label;i&&(t.fcmOptions.analyticsLabel=i)}/**
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
 */function cu(t){return typeof t=="object"&&!!t&&Fo in t}/**
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
 */function hu(t){if(!t||!t.options)throw si("App Configuration Object");if(!t.name)throw si("App Name");const e=["projectId","apiKey","appId","messagingSenderId"],{options:n}=t;for(const i of e)if(!n[i])throw si(i);return{appName:t.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function si(t){return Y.create("missing-app-config-values",{valueName:t})}/**
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
 */class uu{constructor(e,n,i){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const s=hu(e);this.firebaseDependencies={app:e,appConfig:s,installations:n,analyticsProvider:i}}_delete(){return Promise.resolve()}}/**
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
 */async function Wo(t){try{t.swRegistration=await navigator.serviceWorker.register(Bh,{scope:Uh}),t.swRegistration.update().catch(()=>{}),await du(t.swRegistration)}catch(e){throw Y.create("failed-service-worker-registration",{browserErrorMessage:e?.message})}}async function du(t){return new Promise((e,n)=>{const i=setTimeout(()=>n(new Error(`Service worker not registered after ${qs} ms`)),qs),s=t.installing||t.waiting;t.active?(clearTimeout(i),e()):s?s.onstatechange=r=>{r.target?.state==="activated"&&(s.onstatechange=null,clearTimeout(i),e())}:(clearTimeout(i),n(new Error("No incoming service worker found.")))})}/**
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
 */async function fu(t,e){if(!e&&!t.swRegistration&&await Wo(t),!(!e&&t.swRegistration)){if(!(e instanceof ServiceWorkerRegistration))throw Y.create("invalid-sw-registration");t.swRegistration=e}}/**
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
 */async function pu(t,e){e?t.vapidKey=e:t.vapidKey||(t.vapidKey=Lo)}/**
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
 */async function $o(t,e){if(!navigator)throw Y.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw Y.create("permission-blocked");return await pu(t,e?.vapidKey),await fu(t,e?.serviceWorkerRegistration),tu(t)}/**
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
 */async function _u(t,e,n){const i=gu(e);(await t.firebaseDependencies.analyticsProvider.get()).logEvent(i,{message_id:n[Fo],message_name:n[Wh],message_time:n[$h],message_device_time:Math.floor(Date.now()/1e3)})}function gu(t){switch(t){case Ot.NOTIFICATION_CLICKED:return"notification_open";case Ot.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mu(t,e){const n=e.data;if(!n.isFirebaseMessaging)return;t.onMessageHandler&&n.messageType===Ot.PUSH_RECEIVED&&(typeof t.onMessageHandler=="function"?t.onMessageHandler(Qs(n)):t.onMessageHandler.next(Qs(n)));const i=n.data;cu(i)&&i[Hh]==="1"&&await _u(t,n.messageType,i)}const Xs="@firebase/messaging",Js="0.12.23";/**
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
 */const yu=t=>{const e=new uu(t.getProvider("app").getImmediate(),t.getProvider("installations-internal").getImmediate(),t.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",n=>mu(e,n)),e},vu=t=>{const e=t.getProvider("messaging").getImmediate();return{getToken:i=>$o(e,i)}};function wu(){me(new pe("messaging",yu,"PUBLIC")),me(new pe("messaging-internal",vu,"PRIVATE")),te(Xs,Js),te(Xs,Js,"esm2020")}/**
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
 */async function Eu(){try{await ho()}catch{return!1}return typeof window<"u"&&co()&&Fl()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
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
 */async function Iu(t){if(!navigator)throw Y.create("only-available-in-window");return t.swRegistration||await Wo(t),nu(t)}/**
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
 */function bu(t,e){if(!navigator)throw Y.create("only-available-in-window");return t.onMessageHandler=e,()=>{t.onMessageHandler=null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tu(t=Vi()){return Eu().then(e=>{if(!e)throw Y.create("unsupported-browser")},e=>{throw Y.create("indexed-db-unsupported")}),jt(ae(t),"messaging").getImmediate()}async function Qi(t,e){return t=ae(t),$o(t,e)}function Cu(t){return t=ae(t),Iu(t)}function Su(t,e){return t=ae(t),bu(t,e)}wu();var Au="firebase",ku="12.0.0";/**
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
 */te(Au,ku,"app");var Zs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ho;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(y,h){function d(){}d.prototype=h.prototype,y.D=h.prototype,y.prototype=new d,y.prototype.constructor=y,y.C=function(f,g,v){for(var u=Array(arguments.length-2),je=2;je<arguments.length;je++)u[je-2]=arguments[je];return h.prototype[g].apply(f,u)}}function n(){this.blockSize=-1}function i(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(i,n),i.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(y,h,d){d||(d=0);var f=Array(16);if(typeof h=="string")for(var g=0;16>g;++g)f[g]=h.charCodeAt(d++)|h.charCodeAt(d++)<<8|h.charCodeAt(d++)<<16|h.charCodeAt(d++)<<24;else for(g=0;16>g;++g)f[g]=h[d++]|h[d++]<<8|h[d++]<<16|h[d++]<<24;h=y.g[0],d=y.g[1],g=y.g[2];var v=y.g[3],u=h+(v^d&(g^v))+f[0]+3614090360&4294967295;h=d+(u<<7&4294967295|u>>>25),u=v+(g^h&(d^g))+f[1]+3905402710&4294967295,v=h+(u<<12&4294967295|u>>>20),u=g+(d^v&(h^d))+f[2]+606105819&4294967295,g=v+(u<<17&4294967295|u>>>15),u=d+(h^g&(v^h))+f[3]+3250441966&4294967295,d=g+(u<<22&4294967295|u>>>10),u=h+(v^d&(g^v))+f[4]+4118548399&4294967295,h=d+(u<<7&4294967295|u>>>25),u=v+(g^h&(d^g))+f[5]+1200080426&4294967295,v=h+(u<<12&4294967295|u>>>20),u=g+(d^v&(h^d))+f[6]+2821735955&4294967295,g=v+(u<<17&4294967295|u>>>15),u=d+(h^g&(v^h))+f[7]+4249261313&4294967295,d=g+(u<<22&4294967295|u>>>10),u=h+(v^d&(g^v))+f[8]+1770035416&4294967295,h=d+(u<<7&4294967295|u>>>25),u=v+(g^h&(d^g))+f[9]+2336552879&4294967295,v=h+(u<<12&4294967295|u>>>20),u=g+(d^v&(h^d))+f[10]+4294925233&4294967295,g=v+(u<<17&4294967295|u>>>15),u=d+(h^g&(v^h))+f[11]+2304563134&4294967295,d=g+(u<<22&4294967295|u>>>10),u=h+(v^d&(g^v))+f[12]+1804603682&4294967295,h=d+(u<<7&4294967295|u>>>25),u=v+(g^h&(d^g))+f[13]+4254626195&4294967295,v=h+(u<<12&4294967295|u>>>20),u=g+(d^v&(h^d))+f[14]+2792965006&4294967295,g=v+(u<<17&4294967295|u>>>15),u=d+(h^g&(v^h))+f[15]+1236535329&4294967295,d=g+(u<<22&4294967295|u>>>10),u=h+(g^v&(d^g))+f[1]+4129170786&4294967295,h=d+(u<<5&4294967295|u>>>27),u=v+(d^g&(h^d))+f[6]+3225465664&4294967295,v=h+(u<<9&4294967295|u>>>23),u=g+(h^d&(v^h))+f[11]+643717713&4294967295,g=v+(u<<14&4294967295|u>>>18),u=d+(v^h&(g^v))+f[0]+3921069994&4294967295,d=g+(u<<20&4294967295|u>>>12),u=h+(g^v&(d^g))+f[5]+3593408605&4294967295,h=d+(u<<5&4294967295|u>>>27),u=v+(d^g&(h^d))+f[10]+38016083&4294967295,v=h+(u<<9&4294967295|u>>>23),u=g+(h^d&(v^h))+f[15]+3634488961&4294967295,g=v+(u<<14&4294967295|u>>>18),u=d+(v^h&(g^v))+f[4]+3889429448&4294967295,d=g+(u<<20&4294967295|u>>>12),u=h+(g^v&(d^g))+f[9]+568446438&4294967295,h=d+(u<<5&4294967295|u>>>27),u=v+(d^g&(h^d))+f[14]+3275163606&4294967295,v=h+(u<<9&4294967295|u>>>23),u=g+(h^d&(v^h))+f[3]+4107603335&4294967295,g=v+(u<<14&4294967295|u>>>18),u=d+(v^h&(g^v))+f[8]+1163531501&4294967295,d=g+(u<<20&4294967295|u>>>12),u=h+(g^v&(d^g))+f[13]+2850285829&4294967295,h=d+(u<<5&4294967295|u>>>27),u=v+(d^g&(h^d))+f[2]+4243563512&4294967295,v=h+(u<<9&4294967295|u>>>23),u=g+(h^d&(v^h))+f[7]+1735328473&4294967295,g=v+(u<<14&4294967295|u>>>18),u=d+(v^h&(g^v))+f[12]+2368359562&4294967295,d=g+(u<<20&4294967295|u>>>12),u=h+(d^g^v)+f[5]+4294588738&4294967295,h=d+(u<<4&4294967295|u>>>28),u=v+(h^d^g)+f[8]+2272392833&4294967295,v=h+(u<<11&4294967295|u>>>21),u=g+(v^h^d)+f[11]+1839030562&4294967295,g=v+(u<<16&4294967295|u>>>16),u=d+(g^v^h)+f[14]+4259657740&4294967295,d=g+(u<<23&4294967295|u>>>9),u=h+(d^g^v)+f[1]+2763975236&4294967295,h=d+(u<<4&4294967295|u>>>28),u=v+(h^d^g)+f[4]+1272893353&4294967295,v=h+(u<<11&4294967295|u>>>21),u=g+(v^h^d)+f[7]+4139469664&4294967295,g=v+(u<<16&4294967295|u>>>16),u=d+(g^v^h)+f[10]+3200236656&4294967295,d=g+(u<<23&4294967295|u>>>9),u=h+(d^g^v)+f[13]+681279174&4294967295,h=d+(u<<4&4294967295|u>>>28),u=v+(h^d^g)+f[0]+3936430074&4294967295,v=h+(u<<11&4294967295|u>>>21),u=g+(v^h^d)+f[3]+3572445317&4294967295,g=v+(u<<16&4294967295|u>>>16),u=d+(g^v^h)+f[6]+76029189&4294967295,d=g+(u<<23&4294967295|u>>>9),u=h+(d^g^v)+f[9]+3654602809&4294967295,h=d+(u<<4&4294967295|u>>>28),u=v+(h^d^g)+f[12]+3873151461&4294967295,v=h+(u<<11&4294967295|u>>>21),u=g+(v^h^d)+f[15]+530742520&4294967295,g=v+(u<<16&4294967295|u>>>16),u=d+(g^v^h)+f[2]+3299628645&4294967295,d=g+(u<<23&4294967295|u>>>9),u=h+(g^(d|~v))+f[0]+4096336452&4294967295,h=d+(u<<6&4294967295|u>>>26),u=v+(d^(h|~g))+f[7]+1126891415&4294967295,v=h+(u<<10&4294967295|u>>>22),u=g+(h^(v|~d))+f[14]+2878612391&4294967295,g=v+(u<<15&4294967295|u>>>17),u=d+(v^(g|~h))+f[5]+4237533241&4294967295,d=g+(u<<21&4294967295|u>>>11),u=h+(g^(d|~v))+f[12]+1700485571&4294967295,h=d+(u<<6&4294967295|u>>>26),u=v+(d^(h|~g))+f[3]+2399980690&4294967295,v=h+(u<<10&4294967295|u>>>22),u=g+(h^(v|~d))+f[10]+4293915773&4294967295,g=v+(u<<15&4294967295|u>>>17),u=d+(v^(g|~h))+f[1]+2240044497&4294967295,d=g+(u<<21&4294967295|u>>>11),u=h+(g^(d|~v))+f[8]+1873313359&4294967295,h=d+(u<<6&4294967295|u>>>26),u=v+(d^(h|~g))+f[15]+4264355552&4294967295,v=h+(u<<10&4294967295|u>>>22),u=g+(h^(v|~d))+f[6]+2734768916&4294967295,g=v+(u<<15&4294967295|u>>>17),u=d+(v^(g|~h))+f[13]+1309151649&4294967295,d=g+(u<<21&4294967295|u>>>11),u=h+(g^(d|~v))+f[4]+4149444226&4294967295,h=d+(u<<6&4294967295|u>>>26),u=v+(d^(h|~g))+f[11]+3174756917&4294967295,v=h+(u<<10&4294967295|u>>>22),u=g+(h^(v|~d))+f[2]+718787259&4294967295,g=v+(u<<15&4294967295|u>>>17),u=d+(v^(g|~h))+f[9]+3951481745&4294967295,y.g[0]=y.g[0]+h&4294967295,y.g[1]=y.g[1]+(g+(u<<21&4294967295|u>>>11))&4294967295,y.g[2]=y.g[2]+g&4294967295,y.g[3]=y.g[3]+v&4294967295}i.prototype.u=function(y,h){h===void 0&&(h=y.length);for(var d=h-this.blockSize,f=this.B,g=this.h,v=0;v<h;){if(g==0)for(;v<=d;)s(this,y,v),v+=this.blockSize;if(typeof y=="string"){for(;v<h;)if(f[g++]=y.charCodeAt(v++),g==this.blockSize){s(this,f),g=0;break}}else for(;v<h;)if(f[g++]=y[v++],g==this.blockSize){s(this,f),g=0;break}}this.h=g,this.o+=h},i.prototype.v=function(){var y=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);y[0]=128;for(var h=1;h<y.length-8;++h)y[h]=0;var d=8*this.o;for(h=y.length-8;h<y.length;++h)y[h]=d&255,d/=256;for(this.u(y),y=Array(16),h=d=0;4>h;++h)for(var f=0;32>f;f+=8)y[d++]=this.g[h]>>>f&255;return y};function r(y,h){var d=a;return Object.prototype.hasOwnProperty.call(d,y)?d[y]:d[y]=h(y)}function o(y,h){this.h=h;for(var d=[],f=!0,g=y.length-1;0<=g;g--){var v=y[g]|0;f&&v==h||(d[g]=v,f=!1)}this.g=d}var a={};function c(y){return-128<=y&&128>y?r(y,function(h){return new o([h|0],0>h?-1:0)}):new o([y|0],0>y?-1:0)}function l(y){if(isNaN(y)||!isFinite(y))return m;if(0>y)return T(l(-y));for(var h=[],d=1,f=0;y>=d;f++)h[f]=y/d|0,d*=4294967296;return new o(h,0)}function p(y,h){if(y.length==0)throw Error("number format error: empty string");if(h=h||10,2>h||36<h)throw Error("radix out of range: "+h);if(y.charAt(0)=="-")return T(p(y.substring(1),h));if(0<=y.indexOf("-"))throw Error('number format error: interior "-" character');for(var d=l(Math.pow(h,8)),f=m,g=0;g<y.length;g+=8){var v=Math.min(8,y.length-g),u=parseInt(y.substring(g,g+v),h);8>v?(v=l(Math.pow(h,v)),f=f.j(v).add(l(u))):(f=f.j(d),f=f.add(l(u)))}return f}var m=c(0),_=c(1),E=c(16777216);t=o.prototype,t.m=function(){if(b(this))return-T(this).m();for(var y=0,h=1,d=0;d<this.g.length;d++){var f=this.i(d);y+=(0<=f?f:4294967296+f)*h,h*=4294967296}return y},t.toString=function(y){if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(I(this))return"0";if(b(this))return"-"+T(this).toString(y);for(var h=l(Math.pow(y,6)),d=this,f="";;){var g=W(d,h).g;d=$(d,g.j(h));var v=((0<d.g.length?d.g[0]:d.h)>>>0).toString(y);if(d=g,I(d))return v+f;for(;6>v.length;)v="0"+v;f=v+f}},t.i=function(y){return 0>y?0:y<this.g.length?this.g[y]:this.h};function I(y){if(y.h!=0)return!1;for(var h=0;h<y.g.length;h++)if(y.g[h]!=0)return!1;return!0}function b(y){return y.h==-1}t.l=function(y){return y=$(this,y),b(y)?-1:I(y)?0:1};function T(y){for(var h=y.g.length,d=[],f=0;f<h;f++)d[f]=~y.g[f];return new o(d,~y.h).add(_)}t.abs=function(){return b(this)?T(this):this},t.add=function(y){for(var h=Math.max(this.g.length,y.g.length),d=[],f=0,g=0;g<=h;g++){var v=f+(this.i(g)&65535)+(y.i(g)&65535),u=(v>>>16)+(this.i(g)>>>16)+(y.i(g)>>>16);f=u>>>16,v&=65535,u&=65535,d[g]=u<<16|v}return new o(d,d[d.length-1]&-2147483648?-1:0)};function $(y,h){return y.add(T(h))}t.j=function(y){if(I(this)||I(y))return m;if(b(this))return b(y)?T(this).j(T(y)):T(T(this).j(y));if(b(y))return T(this.j(T(y)));if(0>this.l(E)&&0>y.l(E))return l(this.m()*y.m());for(var h=this.g.length+y.g.length,d=[],f=0;f<2*h;f++)d[f]=0;for(f=0;f<this.g.length;f++)for(var g=0;g<y.g.length;g++){var v=this.i(f)>>>16,u=this.i(f)&65535,je=y.i(g)>>>16,Ps=y.i(g)&65535;d[2*f+2*g]+=u*Ps,Q(d,2*f+2*g),d[2*f+2*g+1]+=v*Ps,Q(d,2*f+2*g+1),d[2*f+2*g+1]+=u*je,Q(d,2*f+2*g+1),d[2*f+2*g+2]+=v*je,Q(d,2*f+2*g+2)}for(f=0;f<h;f++)d[f]=d[2*f+1]<<16|d[2*f];for(f=h;f<2*h;f++)d[f]=0;return new o(d,0)};function Q(y,h){for(;(y[h]&65535)!=y[h];)y[h+1]+=y[h]>>>16,y[h]&=65535,h++}function V(y,h){this.g=y,this.h=h}function W(y,h){if(I(h))throw Error("division by zero");if(I(y))return new V(m,m);if(b(y))return h=W(T(y),h),new V(T(h.g),T(h.h));if(b(h))return h=W(y,T(h)),new V(T(h.g),h.h);if(30<y.g.length){if(b(y)||b(h))throw Error("slowDivide_ only works with positive integers.");for(var d=_,f=h;0>=f.l(y);)d=He(d),f=He(f);var g=_e(d,1),v=_e(f,1);for(f=_e(f,2),d=_e(d,2);!I(f);){var u=v.add(f);0>=u.l(y)&&(g=g.add(d),v=u),f=_e(f,1),d=_e(d,1)}return h=$(y,g.j(h)),new V(g,h)}for(g=m;0<=y.l(h);){for(d=Math.max(1,Math.floor(y.m()/h.m())),f=Math.ceil(Math.log(d)/Math.LN2),f=48>=f?1:Math.pow(2,f-48),v=l(d),u=v.j(h);b(u)||0<u.l(y);)d-=f,v=l(d),u=v.j(h);I(v)&&(v=_),g=g.add(v),y=$(y,u)}return new V(g,y)}t.A=function(y){return W(this,y).h},t.and=function(y){for(var h=Math.max(this.g.length,y.g.length),d=[],f=0;f<h;f++)d[f]=this.i(f)&y.i(f);return new o(d,this.h&y.h)},t.or=function(y){for(var h=Math.max(this.g.length,y.g.length),d=[],f=0;f<h;f++)d[f]=this.i(f)|y.i(f);return new o(d,this.h|y.h)},t.xor=function(y){for(var h=Math.max(this.g.length,y.g.length),d=[],f=0;f<h;f++)d[f]=this.i(f)^y.i(f);return new o(d,this.h^y.h)};function He(y){for(var h=y.g.length+1,d=[],f=0;f<h;f++)d[f]=y.i(f)<<1|y.i(f-1)>>>31;return new o(d,y.h)}function _e(y,h){var d=h>>5;h%=32;for(var f=y.g.length-d,g=[],v=0;v<f;v++)g[v]=0<h?y.i(v+d)>>>h|y.i(v+d+1)<<32-h:y.i(v+d);return new o(g,y.h)}i.prototype.digest=i.prototype.v,i.prototype.reset=i.prototype.s,i.prototype.update=i.prototype.u,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=l,o.fromString=p,Ho=o}).apply(typeof Zs<"u"?Zs:typeof self<"u"?self:typeof window<"u"?window:{});const er="4.9.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}se.UNAUTHENTICATED=new se(null),se.GOOGLE_CREDENTIALS=new se("google-credentials-uid"),se.FIRST_PARTY=new se("first-party-uid"),se.MOCK_USER=new se("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xn="12.0.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ln=new Li("@firebase/firestore");function Nu(t,...e){if(ln.logLevel<=O.DEBUG){const n=e.map(jo);ln.debug(`Firestore (${xn}): ${t}`,...n)}}function Ru(t,...e){if(ln.logLevel<=O.ERROR){const n=e.map(jo);ln.error(`Firestore (${xn}): ${t}`,...n)}}function jo(t){if(typeof t=="string")return t;try{/**
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
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tr(t,e,n){let i="Unexpected state";typeof e=="string"?i=e:n=e,zo(t,i,n)}function zo(t,e,n){let i=`FIRESTORE (${xn}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(n!==void 0)try{i+=" CONTEXT: "+JSON.stringify(n)}catch{i+=" CONTEXT: "+n}throw Ru(i),new Error(i)}function qo(t,e,n,i){let s="Unexpected state";typeof n=="string"?s=n:i=n,t||zo(e,s,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const H="invalid-argument",nr="failed-precondition";class U extends $e{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pu{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Du{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(se.UNAUTHENTICATED))}shutdown(){}}class Ou{constructor(e){this.auth=null,e.onInit(n=>{this.auth=n})}getToken(){return this.auth?this.auth.getToken().then(e=>e?(qo(typeof e.accessToken=="string",42297,{t:e}),new Pu(e.accessToken,new se(this.auth.getUid()))):null):Promise.resolve(null)}invalidateToken(){}start(e,n){}shutdown(){}}class xu{constructor(e,n,i){this.i=e,this.o=n,this.u=i,this.type="FirstParty",this.user=se.FIRST_PARTY,this.l=new Map}h(){return this.u?this.u():null}get headers(){this.l.set("X-Goog-AuthUser",this.i);const e=this.h();return e&&this.l.set("Authorization",e),this.o&&this.l.set("X-Goog-Iam-Authorization-Token",this.o),this.l}}class Mu{constructor(e,n,i){this.i=e,this.o=n,this.u=i}getToken(){return Promise.resolve(new xu(this.i,this.o,this.u))}start(e,n){e.enqueueRetryable(()=>n(se.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class ir{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Lu{constructor(e,n){this.m=n,this.appCheck=null,this.T=null,Bi(e)&&e.settings.appCheckToken&&(this.T=e.settings.appCheckToken),n.onInit(i=>{this.appCheck=i})}getToken(){return this.T?Promise.resolve(new ir(this.T)):this.appCheck?this.appCheck.getToken().then(e=>e?(qo(typeof e.token=="string",3470,{tokenResult:e}),new ir(e.token)):null):Promise.resolve(null)}invalidateToken(){}start(e,n){}shutdown(){}}const sr="(default)";class cn{constructor(e,n){this.projectId=e,this.database=n||sr}static empty(){return new cn("","")}get isDefaultDatabase(){return this.database===sr}isEqual(e){return e instanceof cn&&e.projectId===this.projectId&&e.database===this.database}}function Be(t,e){return t<e?-1:t>e?1:0}function Fu(t,e){const n=Math.min(t.length,e.length);for(let i=0;i<n;i++){const s=t.charAt(i),r=e.charAt(i);if(s!==r)return ri(s)===ri(r)?Be(s,r):ri(s)?1:-1}return Be(t.length,e.length)}const Bu=55296,Uu=57343;function ri(t){const e=t.charCodeAt(0);return e>=Bu&&e<=Uu}class be{constructor(e,n,i){n===void 0?n=0:n>e.length&&tr(637,{offset:n,range:e.length}),i===void 0?i=e.length-n:i>e.length-n&&tr(1746,{length:i,range:e.length-n}),this.segments=e,this.offset=n,this.len=i}get length(){return this.len}isEqual(e){return be.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof be?e.forEach(i=>{n.push(i)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,i=this.limit();n<i;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const i=Math.min(e.length,n.length);for(let s=0;s<i;s++){const r=be.compareSegments(e.get(s),n.get(s));if(r!==0)return r}return Be(e.length,n.length)}static compareSegments(e,n){const i=be.isNumericId(e),s=be.isNumericId(n);return i&&!s?-1:!i&&s?1:i&&s?be.extractNumericId(e).compare(be.extractNumericId(n)):Fu(e,n)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Ho.fromString(e.substring(4,e.length-2))}}class le extends be{construct(e,n,i){return new le(e,n,i)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const i of e){if(i.indexOf("//")>=0)throw new U(H,`Invalid segment (${i}). Paths must not contain // in them.`);n.push(...i.split("/").filter(s=>s.length>0))}return new le(n)}static emptyPath(){return new le([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke{constructor(e){this.path=e}static fromPath(e){return new Ke(le.fromString(e))}static fromName(e){return new Ke(le.fromString(e).popFirst(5))}static empty(){return new Ke(le.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&le.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return le.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new Ke(new le(e.slice()))}}function Vu(t){return typeof t=="object"&&t!==null&&(Object.getPrototypeOf(t)===Object.prototype||Object.getPrototypeOf(t)===null)}/**
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
 */function Wu(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var rr,P;/**
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
 */(P=rr||(rr={}))[P.OK=0]="OK",P[P.CANCELLED=1]="CANCELLED",P[P.UNKNOWN=2]="UNKNOWN",P[P.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",P[P.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",P[P.NOT_FOUND=5]="NOT_FOUND",P[P.ALREADY_EXISTS=6]="ALREADY_EXISTS",P[P.PERMISSION_DENIED=7]="PERMISSION_DENIED",P[P.UNAUTHENTICATED=16]="UNAUTHENTICATED",P[P.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",P[P.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",P[P.ABORTED=10]="ABORTED",P[P.OUT_OF_RANGE=11]="OUT_OF_RANGE",P[P.UNIMPLEMENTED=12]="UNIMPLEMENTED",P[P.INTERNAL=13]="INTERNAL",P[P.UNAVAILABLE=14]="UNAVAILABLE",P[P.DATA_LOSS=15]="DATA_LOSS";/**
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
 */class $u extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class nt{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(s){try{return atob(s)}catch(r){throw typeof DOMException<"u"&&r instanceof DOMException?new $u("Invalid base64 string: "+r):r}}(e);return new nt(n)}static fromUint8Array(e){const n=function(s){let r="";for(let o=0;o<s.length;++o)r+=String.fromCharCode(s[o]);return r}(e);return new nt(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const i=new Uint8Array(n.length);for(let s=0;s<n.length;s++)i[s]=n.charCodeAt(s);return i}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Be(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}nt.EMPTY_BYTE_STRING=new nt("");/**
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
 */function oe(t,e){const n={typeString:t};return e&&(n.value=e),n}function zt(t,e){if(!Vu(t))throw new U(H,"JSON must be an object");let n;for(const i in e)if(e[i]){const s=e[i].typeString,r="value"in e[i]?{value:e[i].value}:void 0;if(!(i in t)){n=`JSON missing required field: '${i}'`;break}const o=t[i];if(s&&typeof o!==s){n=`JSON field '${i}' must be a ${s}.`;break}if(r!==void 0&&o!==r.value){n=`Expected '${i}' field to equal '${r.value}'`;break}}if(n)throw new U(H,n);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const or=-62135596800,ar=1e6;class ge{static now(){return ge.fromMillis(Date.now())}static fromDate(e){return ge.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),i=Math.floor((e-1e3*n)*ar);return new ge(n,i)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new U(H,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new U(H,"Timestamp nanoseconds out of range: "+n);if(e<or)throw new U(H,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new U(H,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/ar}_compareTo(e){return this.seconds===e.seconds?Be(this.nanoseconds,e.nanoseconds):Be(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ge._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(zt(e,ge._jsonSchema))return new ge(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-or;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ge._jsonSchemaVersion="firestore/timestamp/1.0",ge._jsonSchema={type:oe("string",ge._jsonSchemaVersion),seconds:oe("number"),nanoseconds:oe("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hu{constructor(e,n=null,i=[],s=[],r=null,o="F",a=null,c=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=i,this.filters=s,this.limit=r,this.limitType=o,this.startAt=a,this.endAt=c,this.q=null,this.B=null,this.$=null,this.startAt,this.endAt}}/**
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
 */const ju="ComponentProvider",lr=new Map;/**
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
 */const zu=1048576,qu="firestore.googleapis.com",cr=!0;/**
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
 */class hr{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new U(H,"Can't provide ssl option if host option is not set");this.host=qu,this.ssl=cr}else this.host=e.host,this.ssl=e.ssl??cr;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<zu)throw new U(H,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}(function(i,s,r,o){if(s===!0&&o===!0)throw new U(H,`${i} and ${r} cannot be used together.`)})("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Wu(e.experimentalLongPollingOptions??{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new U(H,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new U(H,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new U(H,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(i,s){return i.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Gu{constructor(e,n,i,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=i,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new hr({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new U(nr,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new U(nr,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new hr(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(i){if(!i)return new Du;switch(i.type){case"firstParty":return new Mu(i.sessionIndex||"0",i.iamToken||null,i.authTokenFactory||null);case"provider":return i.client;default:throw new U(H,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const i=lr.get(n);i&&(Nu(ju,"Removing Datastore"),lr.delete(n),i.terminate())}(this),Promise.resolve()}}/**
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
 */class Xi{constructor(e,n,i){this.converter=n,this._query=i,this.type="query",this.firestore=e}withConverter(e){return new Xi(this.firestore,e,this._query)}}class Ce{constructor(e,n,i){this.converter=n,this._key=i,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ji(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ce(this.firestore,e,this._key)}toJSON(){return{type:Ce._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,n,i){if(zt(n,Ce._jsonSchema))return new Ce(e,i||null,new Ke(le.fromString(n.referencePath)))}}Ce._jsonSchemaVersion="firestore/documentReference/1.0",Ce._jsonSchema={type:oe("string",Ce._jsonSchemaVersion),referencePath:oe("string")};class Ji extends Xi{constructor(e,n,i){super(e,n,function(r){return new Hu(r)}(i)),this._path=i,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ce(this.firestore,null,new Ke(e))}withConverter(e){return new Ji(this.firestore,e,this._path)}}/**
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
 */class Te{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Te(nt.fromBase64String(e))}catch(n){throw new U(H,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new Te(nt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Te._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(zt(e,Te._jsonSchema))return Te.fromBase64String(e.bytes)}}Te._jsonSchemaVersion="firestore/bytes/1.0",Te._jsonSchema={type:oe("string",Te._jsonSchemaVersion),bytes:oe("string")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new U(H,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new U(H,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Be(this._lat,e._lat)||Be(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Xe._jsonSchemaVersion}}static fromJSON(e){if(zt(e,Xe._jsonSchema))return new Xe(e.latitude,e.longitude)}}Xe._jsonSchemaVersion="firestore/geoPoint/1.0",Xe._jsonSchema={type:oe("string",Xe._jsonSchemaVersion),latitude:oe("number"),longitude:oe("number")};/**
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
 */class Je{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(i,s){if(i.length!==s.length)return!1;for(let r=0;r<i.length;++r)if(i[r]!==s[r])return!1;return!0}(this._values,e._values)}toJSON(){return{type:Je._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(zt(e,Je._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(n=>typeof n=="number"))return new Je(e.vectorValues);throw new U(H,"Expected 'vectorValues' field to be a number array")}}}Je._jsonSchemaVersion="firestore/vectorValue/1.0",Je._jsonSchema={type:oe("string",Je._jsonSchemaVersion),vectorValues:oe("object")};(function(){(function(n){xn=n})(`${Ui}_lite`),me(new pe("firestore/lite",(e,{instanceIdentifier:n,options:i})=>{const s=e.getProvider("app").getImmediate(),r=new Gu(new Ou(e.getProvider("auth-internal")),new Lu(s,e.getProvider("app-check-internal")),function(a,c){if(!Object.prototype.hasOwnProperty.apply(a.options,["projectId"]))throw new U(H,'"projectId" not provided in firebase.initializeApp.');return new cn(a.options.projectId,c)}(s,n),s);return i&&r._setSettings(i),r},"PUBLIC").setMultipleInstances(!0)),te("firestore-lite",er,""),te("firestore-lite",er,"esm2020")})();var ur={};const dr="@firebase/database",fr="1.1.0";/**
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
 */let Go="";function Ku(t){Go=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yu{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),j(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Pt(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qu{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return Pe(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ko=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Yu(e)}}catch{}return new Qu},Ye=Ko("localStorage"),Xu=Ko("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ct=new Li("@firebase/database"),Ju=function(){let t=1;return function(){return t++}}(),Yo=function(t){const e=zl(t),n=new jl;n.update(e);const i=n.digest();return xi.encodeByteArray(i)},qt=function(...t){let e="";for(let n=0;n<t.length;n++){const i=t[n];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=qt.apply(null,i):typeof i=="object"?e+=j(i):e+=i,e+=" "}return e};let St=null,pr=!0;const Zu=function(t,e){w(!0,"Can't turn on custom loggers persistently."),ct.logLevel=O.VERBOSE,St=ct.log.bind(ct)},J=function(...t){if(pr===!0&&(pr=!1,St===null&&Xu.get("logging_enabled")===!0&&Zu()),St){const e=qt.apply(null,t);St(e)}},Gt=function(t){return function(...e){J(t,...e)}},Ii=function(...t){const e="FIREBASE INTERNAL ERROR: "+qt(...t);ct.error(e)},Re=function(...t){const e=`FIREBASE FATAL ERROR: ${qt(...t)}`;throw ct.error(e),new Error(e)},ne=function(...t){const e="FIREBASE WARNING: "+qt(...t);ct.warn(e)},ed=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&ne("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Qo=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},td=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},dt="[MIN_NAME]",it="[MAX_NAME]",mt=function(t,e){if(t===e)return 0;if(t===dt||e===it)return-1;if(e===dt||t===it)return 1;{const n=_r(t),i=_r(e);return n!==null?i!==null?n-i===0?t.length-e.length:n-i:-1:i!==null?1:t<e?-1:1}},nd=function(t,e){return t===e?0:t<e?-1:1},wt=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+j(e))},Zi=function(t){if(typeof t!="object"||t===null)return j(t);const e=[];for(const i in t)e.push(i);e.sort();let n="{";for(let i=0;i<e.length;i++)i!==0&&(n+=","),n+=j(e[i]),n+=":",n+=Zi(t[e[i]]);return n+="}",n},Xo=function(t,e){const n=t.length;if(n<=e)return[t];const i=[];for(let s=0;s<n;s+=e)s+e>n?i.push(t.substring(s,n)):i.push(t.substring(s,s+e));return i};function ie(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const Jo=function(t){w(!Qo(t),"Invalid JSON number");const e=11,n=52,i=(1<<e-1)-1;let s,r,o,a,c;t===0?(r=0,o=0,s=1/t===-1/0?1:0):(s=t<0,t=Math.abs(t),t>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),i),r=a+i,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(r=0,o=Math.round(t/Math.pow(2,1-i-n))));const l=[];for(c=n;c;c-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)l.push(r%2?1:0),r=Math.floor(r/2);l.push(s?1:0),l.reverse();const p=l.join("");let m="";for(c=0;c<64;c+=8){let _=parseInt(p.substr(c,8),2).toString(16);_.length===1&&(_="0"+_),m=m+_}return m.toLowerCase()},id=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},sd=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function rd(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const i=new Error(t+" at "+e._path.toString()+": "+n);return i.code=t.toUpperCase(),i}const od=new RegExp("^-?(0*)\\d{1,10}$"),ad=-2147483648,ld=2147483647,_r=function(t){if(od.test(t)){const e=Number(t);if(e>=ad&&e<=ld)return e}return null},yt=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw ne("Exception was thrown by user callback.",n),e},Math.floor(0))}},cd=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},At=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class hd{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,Bi(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n?.getImmediate({optional:!0}),this.appCheck||n?.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){ne(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ud{constructor(e,n,i){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(J("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',ne(e)}}class tn{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}tn.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const es="5",Zo="v",ea="s",ta="r",na="f",ia=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,sa="ls",ra="p",bi="ac",oa="websocket",aa="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class la{constructor(e,n,i,s,r=!1,o="",a=!1,c=!1,l=null){this.secure=n,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this.emulatorOptions=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Ye.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Ye.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function dd(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function ca(t,e,n){w(typeof e=="string","typeof type must == string"),w(typeof n=="object","typeof params must == object");let i;if(e===oa)i=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===aa)i=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);dd(t)&&(n.ns=t.namespace);const s=[];return ie(n,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fd{constructor(){this.counters_={}}incrementCounter(e,n=1){Pe(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return Cl(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oi={},ai={};function ts(t){const e=t.toString();return oi[e]||(oi[e]=new fd),oi[e]}function pd(t,e){const n=t.toString();return ai[n]||(ai[n]=e()),ai[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _d{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&yt(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gr="start",gd="close",md="pLPCommand",yd="pRTLPCB",ha="id",ua="pw",da="ser",vd="cb",wd="seg",Ed="ts",Id="d",bd="dframe",fa=1870,pa=30,Td=fa-pa,Cd=25e3,Sd=3e4;class lt{constructor(e,n,i,s,r,o,a){this.connId=e,this.repoInfo=n,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Gt(e),this.stats_=ts(n),this.urlFn=c=>(this.appCheckToken&&(c[bi]=this.appCheckToken),ca(n,aa,c))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new _d(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Sd)),td(()=>{if(this.isClosed_)return;this.scriptTagHolder=new ns((...r)=>{const[o,a,c,l,p]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===gr)this.id=a,this.password=c;else if(o===gd)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[gr]="t",i[da]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[vd]=this.scriptTagHolder.uniqueCallbackIdentifier),i[Zo]=es,this.transportSessionId&&(i[ea]=this.transportSessionId),this.lastSessionId&&(i[sa]=this.lastSessionId),this.applicationId&&(i[ra]=this.applicationId),this.appCheckToken&&(i[bi]=this.appCheckToken),typeof location<"u"&&location.hostname&&ia.test(location.hostname)&&(i[ta]=na);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){lt.forceAllow_=!0}static forceDisallow(){lt.forceDisallow_=!0}static isAvailable(){return lt.forceAllow_?!0:!lt.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!id()&&!sd()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=j(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=eo(n),s=Xo(i,Td);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const i={};i[bd]="t",i[ha]=e,i[ua]=n,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=j(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class ns{constructor(e,n,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Ju(),window[md+this.uniqueCallbackIdentifier]=e,window[yd+this.uniqueCallbackIdentifier]=n,this.myIFrame=ns.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){J("frame writing exception"),a.stack&&J(a.stack),J(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||J("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[ha]=this.myID,e[ua]=this.myPW,e[da]=this.currentSerial;let n=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+pa+i.length<=fa;){const o=this.pendingSegs.shift();i=i+"&"+wd+s+"="+o.seg+"&"+Ed+s+"="+o.ts+"&"+Id+s+"="+o.d,s++}return n=n+i,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,i){this.pendingSegs.push({seg:e,ts:n,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const i=()=>{this.outstandingRequests.delete(n),this.newRequest_()},s=setTimeout(i,Math.floor(Cd)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),n())},i.onerror=()=>{J("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ad=16384,kd=45e3;let hn=null;typeof MozWebSocket<"u"?hn=MozWebSocket:typeof WebSocket<"u"&&(hn=WebSocket);class ce{constructor(e,n,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Gt(this.connId),this.stats_=ts(n),this.connURL=ce.connectionURL_(n,o,a,s,i),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,i,s,r){const o={};return o[Zo]=es,typeof location<"u"&&location.hostname&&ia.test(location.hostname)&&(o[ta]=na),n&&(o[ea]=n),i&&(o[sa]=i),s&&(o[bi]=s),r&&(o[ra]=r),ca(e,oa,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Ye.set("previous_websocket_failure",!0);try{let i;Ll(),this.mySock=new hn(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){ce.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(n);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&hn!==null&&!ce.forceDisallow_}static previouslyFailed(){return Ye.isInMemoryStorage||Ye.get("previous_websocket_failure")===!0}markConnectionHealthy(){Ye.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const i=Pt(n);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(w(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const i=this.extractFrameCount_(n);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const n=j(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=Xo(n,Ad);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(kd))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}ce.responsesRequiredToBeHealthy=2;ce.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt{static get ALL_TRANSPORTS(){return[lt,ce]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=ce&&ce.isAvailable();let i=n&&!ce.previouslyFailed();if(e.webSocketOnly&&(n||ne("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[ce];else{const s=this.transports_=[];for(const r of xt.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);xt.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}xt.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nd=6e4,Rd=5e3,Pd=10*1024,Dd=100*1024,li="t",mr="d",Od="s",yr="r",xd="e",vr="o",wr="a",Er="n",Ir="p",Md="h";class Ld{constructor(e,n,i,s,r,o,a,c,l,p){this.id=e,this.repoInfo_=n,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=l,this.lastSessionId=p,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Gt("c:"+this.id+":"),this.transportManager_=new xt(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=At(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Dd?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Pd?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(li in e){const n=e[li];n===wr?this.upgradeIfSecondaryHealthy_():n===yr?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===vr&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=wt("t",e),i=wt("d",e);if(n==="c")this.onSecondaryControl_(i);else if(n==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Ir,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:wr,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Er,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=wt("t",e),i=wt("d",e);n==="c"?this.onControl_(i):n==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=wt(li,e);if(mr in e){const i=e[mr];if(n===Md){const s={...i};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(n===Er){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===Od?this.onConnectionShutdown_(i):n===yr?this.onReset_(i):n===xd?Ii("Server Error: "+i):n===vr?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Ii("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),es!==i&&ne("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,i),At(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Nd))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):At(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Rd))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Ir,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Ye.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _a{put(e,n,i,s){}merge(e,n,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,i){}onDisconnectMerge(e,n,i){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ga{constructor(e){this.allowedEvents_=e,this.listeners_={},w(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,n)}}on(e,n,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:i});const s=this.getInitialEvent(e);s&&n.apply(i,s)}off(e,n,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===n&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){w(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un extends ga{static getInstance(){return new un}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!lo()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return w(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const br=32,Tr=768;class x{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function D(){return new x("")}function S(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function Ue(t){return t.pieces_.length-t.pieceNum_}function M(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new x(t.pieces_,e)}function ma(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function Fd(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function ya(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function va(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new x(e,0)}function z(t,e){const n=[];for(let i=t.pieceNum_;i<t.pieces_.length;i++)n.push(t.pieces_[i]);if(e instanceof x)for(let i=e.pieceNum_;i<e.pieces_.length;i++)n.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&n.push(i[s])}return new x(n,0)}function k(t){return t.pieceNum_>=t.pieces_.length}function Z(t,e){const n=S(t),i=S(e);if(n===null)return e;if(n===i)return Z(M(t),M(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function is(t,e){if(Ue(t)!==Ue(e))return!1;for(let n=t.pieceNum_,i=e.pieceNum_;n<=t.pieces_.length;n++,i++)if(t.pieces_[n]!==e.pieces_[i])return!1;return!0}function he(t,e){let n=t.pieceNum_,i=e.pieceNum_;if(Ue(t)>Ue(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[i])return!1;++n,++i}return!0}class Bd{constructor(e,n){this.errorPrefix_=n,this.parts_=ya(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=Rn(this.parts_[i]);wa(this)}}function Ud(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Rn(e),wa(t)}function Vd(t){const e=t.parts_.pop();t.byteLength_-=Rn(e),t.parts_.length>0&&(t.byteLength_-=1)}function wa(t){if(t.byteLength_>Tr)throw new Error(t.errorPrefix_+"has a key path longer than "+Tr+" bytes ("+t.byteLength_+").");if(t.parts_.length>br)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+br+") or object contains a cycle "+qe(t))}function qe(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ss extends ga{static getInstance(){return new ss}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return w(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Et=1e3,Wd=300*1e3,Cr=30*1e3,$d=1.3,Hd=3e4,jd="server_kill",Sr=3;class ke extends _a{constructor(e,n,i,s,r,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=ke.nextPersistentConnectionId_++,this.log_=Gt("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Et,this.maxReconnectDelay_=Wd,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");ss.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&un.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,i){const s=++this.requestNumber_,r={r:s,a:e,b:n};this.log_(j(r)),w(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const n=new An,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),n.promise}listen(e,n,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),w(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),w(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:n,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(i)})}sendListen_(e){const n=e.query,i=n._path.toString(),s=n._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=n._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const c=a.d,l=a.s;ke.warnOnListenWarnings_(c,n),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),l!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(l,c))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&Pe(e,"w")){const i=ut(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+n._queryParams.getIndex().toString()+'"',r=n._path.toString();ne(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||$l(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Cr)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=Wl(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(n,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,i=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,i)})}unlisten(e,n){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),w(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,n)}sendUnlisten_(e,n,i,s){this.log_("Unlisten on "+e+" for "+n);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:i})}onDisconnectMerge(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:i})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,i,s){const r={p:n,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,n,i,s){this.putInternal("p",e,n,i,s)}merge(e,n,i,s){this.putInternal("m",e,n,i,s)}putInternal(e,n,i,s,r){this.initConnection_();const o={p:n,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,i,r=>{this.log_(n+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+j(e));const n=e.r,i=this.requestCBHash_[n];i&&(delete this.requestCBHash_[n],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):Ii("Unrecognized action received from server: "+j(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){w(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Et,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Et,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Hd&&(this.reconnectDelay_=Et),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*$d)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+ke.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,i())},l=function(m){w(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(m)};this.realtime_={close:c,sendRequest:l};const p=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[m,_]=await Promise.all([this.authTokenProvider_.getToken(p),this.appCheckTokenProvider_.getToken(p)]);o?J("getToken() completed but was canceled"):(J("getToken() completed. Creating connection."),this.authToken_=m&&m.accessToken,this.appCheckToken_=_&&_.token,a=new Ld(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,i,E=>{ne(E+" ("+this.repoInfo_.toString()+")"),this.interrupt(jd)},r))}catch(m){this.log_("Failed to get token: "+m),o||(this.repoInfo_.nodeAdmin&&ne(m),c())}}}interrupt(e){J("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){J("Resuming connection for reason: "+e),delete this.interruptReasons_[e],xs(this.interruptReasons_)&&(this.reconnectDelay_=Et,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let i;n?i=n.map(r=>Zi(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,n){const i=new x(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(n),r.delete(n),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,n){J("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Sr&&(this.reconnectDelay_=Cr,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){J("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Sr&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+Go.replace(/\./g,"-")]=1,lo()?e["framework.cordova"]=1:Ml()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=un.getInstance().currentlyOnline();return xs(this.interruptReasons_)&&e}}ke.nextPersistentConnectionId_=0;ke.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new A(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mn{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const i=new A(dt,e),s=new A(dt,n);return this.compare(i,s)!==0}minPost(){return A.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Jt;class Ea extends Mn{static get __EMPTY_NODE(){return Jt}static set __EMPTY_NODE(e){Jt=e}compare(e,n){return mt(e.name,n.name)}isDefinedOn(e){throw gt("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return A.MIN}maxPost(){return new A(it,Jt)}makePost(e,n){return w(typeof e=="string","KeyIndex indexValue must always be a string."),new A(e,Jt)}toString(){return".key"}}const ht=new Ea;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt{constructor(e,n,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?i(e.key,n):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class G{constructor(e,n,i,s,r){this.key=e,this.value=n,this.color=i??G.RED,this.left=s??ee.EMPTY_NODE,this.right=r??ee.EMPTY_NODE}copy(e,n,i,s,r){return new G(e??this.key,n??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,n,i),null):r===0?s=s.copy(null,n,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,n,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return ee.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let i,s;if(i=this,n(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),n(e,i.key)===0){if(i.right.isEmpty())return ee.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,G.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,G.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}G.RED=!0;G.BLACK=!1;class zd{copy(e,n,i,s,r){return this}insert(e,n,i){return new G(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class ee{constructor(e,n=ee.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new ee(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,G.BLACK,null,null))}remove(e){return new ee(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,G.BLACK,null,null))}get(e){let n,i=this.root_;for(;!i.isEmpty();){if(n=this.comparator_(e,i.key),n===0)return i.value;n<0?i=i.left:n>0&&(i=i.right)}return null}getPredecessorKey(e){let n,i=this.root_,s=null;for(;!i.isEmpty();)if(n=this.comparator_(e,i.key),n===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else n<0?i=i.left:n>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Zt(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new Zt(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new Zt(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new Zt(this.root_,null,this.comparator_,!0,e)}}ee.EMPTY_NODE=new zd;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qd(t,e){return mt(t.name,e.name)}function rs(t,e){return mt(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ti;function Gd(t){Ti=t}const Ia=function(t){return typeof t=="number"?"number:"+Jo(t):"string:"+t},ba=function(t){if(t.isLeafNode()){const e=t.val();w(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Pe(e,".sv"),"Priority must be a string or number.")}else w(t===Ti||t.isEmpty(),"priority of unexpected type.");w(t===Ti||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ar;class q{static set __childrenNodeConstructor(e){Ar=e}static get __childrenNodeConstructor(){return Ar}constructor(e,n=q.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,w(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),ba(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new q(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:q.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return k(e)?this:S(e)===".priority"?this.priorityNode_:q.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:q.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const i=S(e);return i===null?n:n.isEmpty()&&i!==".priority"?this:(w(i!==".priority"||Ue(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,q.__childrenNodeConstructor.EMPTY_NODE.updateChild(M(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Ia(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=Jo(this.value_):e+=this.value_,this.lazyHash_=Yo(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===q.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof q.__childrenNodeConstructor?-1:(w(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,i=typeof this.value_,s=q.VALUE_TYPE_ORDER.indexOf(n),r=q.VALUE_TYPE_ORDER.indexOf(i);return w(s>=0,"Unknown leaf type: "+n),w(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}q.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ta,Ca;function Kd(t){Ta=t}function Yd(t){Ca=t}class Qd extends Mn{compare(e,n){const i=e.node.getPriority(),s=n.node.getPriority(),r=i.compareTo(s);return r===0?mt(e.name,n.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return A.MIN}maxPost(){return new A(it,new q("[PRIORITY-POST]",Ca))}makePost(e,n){const i=Ta(e);return new A(n,new q("[PRIORITY-POST]",i))}toString(){return".priority"}}const B=new Qd;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xd=Math.log(2);class Jd{constructor(e){const n=r=>parseInt(Math.log(r)/Xd,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const dn=function(t,e,n,i){t.sort(e);const s=function(c,l){const p=l-c;let m,_;if(p===0)return null;if(p===1)return m=t[c],_=n?n(m):m,new G(_,m.node,G.BLACK,null,null);{const E=parseInt(p/2,10)+c,I=s(c,E),b=s(E+1,l);return m=t[E],_=n?n(m):m,new G(_,m.node,G.BLACK,I,b)}},r=function(c){let l=null,p=null,m=t.length;const _=function(I,b){const T=m-I,$=m;m-=I;const Q=s(T+1,$),V=t[T],W=n?n(V):V;E(new G(W,V.node,b,null,Q))},E=function(I){l?(l.left=I,l=I):(p=I,l=I)};for(let I=0;I<c.count;++I){const b=c.nextBitIsOne(),T=Math.pow(2,c.count-(I+1));b?_(T,G.BLACK):(_(T,G.BLACK),_(T,G.RED))}return p},o=new Jd(t.length),a=r(o);return new ee(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ci;const at={};class Se{static get Default(){return w(at&&B,"ChildrenNode.ts has not been loaded"),ci=ci||new Se({".priority":at},{".priority":B}),ci}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=ut(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof ee?n:null}hasIndex(e){return Pe(this.indexSet_,e.toString())}addIndex(e,n){w(e!==ht,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=n.getIterator(A.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=dn(i,e.getCompare()):a=at;const c=e.toString(),l={...this.indexSet_};l[c]=e;const p={...this.indexes_};return p[c]=a,new Se(p,l)}addToIndexes(e,n){const i=sn(this.indexes_,(s,r)=>{const o=ut(this.indexSet_,r);if(w(o,"Missing index implementation for "+r),s===at)if(o.isDefinedOn(e.node)){const a=[],c=n.getIterator(A.Wrap);let l=c.getNext();for(;l;)l.name!==e.name&&a.push(l),l=c.getNext();return a.push(e),dn(a,o.getCompare())}else return at;else{const a=n.get(e.name);let c=s;return a&&(c=c.remove(new A(e.name,a))),c.insert(e,e.node)}});return new Se(i,this.indexSet_)}removeFromIndexes(e,n){const i=sn(this.indexes_,s=>{if(s===at)return s;{const r=n.get(e.name);return r?s.remove(new A(e.name,r)):s}});return new Se(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let It;class C{static get EMPTY_NODE(){return It||(It=new C(new ee(rs),null,Se.Default))}constructor(e,n,i){this.children_=e,this.priorityNode_=n,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&ba(this.priorityNode_),this.children_.isEmpty()&&w(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||It}updatePriority(e){return this.children_.isEmpty()?this:new C(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?It:n}}getChild(e){const n=S(e);return n===null?this:this.getImmediateChild(n).getChild(M(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(w(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const i=new A(e,n);let s,r;n.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,n),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?It:this.priorityNode_;return new C(s,o,r)}}updateChild(e,n){const i=S(e);if(i===null)return n;{w(S(e)!==".priority"||Ue(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(M(e),n);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let i=0,s=0,r=!0;if(this.forEachChild(B,(o,a)=>{n[o]=a.val(e),i++,r&&C.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Ia(this.getPriority().val())+":"),this.forEachChild(B,(n,i)=>{const s=i.hash();s!==""&&(e+=":"+n+":"+s)}),this.lazyHash_=e===""?"":Yo(e)}return this.lazyHash_}getPredecessorChildName(e,n,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new A(e,n));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new A(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new A(n,this.children_.get(n)):null}forEachChild(e,n){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>n(s.name,s.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,A.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,A.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Kt?-1:0}withIndex(e){if(e===ht||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new C(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===ht||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const i=this.getIterator(B),s=n.getIterator(B);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===ht?null:this.indexMap_.get(e.toString())}}C.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Zd extends C{constructor(){super(new ee(rs),C.EMPTY_NODE,Se.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return C.EMPTY_NODE}isEmpty(){return!1}}const Kt=new Zd;Object.defineProperties(A,{MIN:{value:new A(dt,C.EMPTY_NODE)},MAX:{value:new A(it,Kt)}});Ea.__EMPTY_NODE=C.EMPTY_NODE;q.__childrenNodeConstructor=C;Gd(Kt);Yd(Kt);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ef=!0;function K(t,e=null){if(t===null)return C.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),w(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new q(n,K(e))}if(!(t instanceof Array)&&ef){const n=[];let i=!1;if(ie(t,(o,a)=>{if(o.substring(0,1)!=="."){const c=K(a);c.isEmpty()||(i=i||!c.getPriority().isEmpty(),n.push(new A(o,c)))}}),n.length===0)return C.EMPTY_NODE;const r=dn(n,qd,o=>o.name,rs);if(i){const o=dn(n,B.getCompare());return new C(r,K(e),new Se({".priority":o},{".priority":B}))}else return new C(r,K(e),Se.Default)}else{let n=C.EMPTY_NODE;return ie(t,(i,s)=>{if(Pe(t,i)&&i.substring(0,1)!=="."){const r=K(s);(r.isLeafNode()||!r.isEmpty())&&(n=n.updateImmediateChild(i,r))}}),n.updatePriority(K(e))}}Kd(K);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tf extends Mn{constructor(e){super(),this.indexPath_=e,w(!k(e)&&S(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const i=this.extractChild(e.node),s=this.extractChild(n.node),r=i.compareTo(s);return r===0?mt(e.name,n.name):r}makePost(e,n){const i=K(e),s=C.EMPTY_NODE.updateChild(this.indexPath_,i);return new A(n,s)}maxPost(){const e=C.EMPTY_NODE.updateChild(this.indexPath_,Kt);return new A(it,e)}toString(){return ya(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nf extends Mn{compare(e,n){const i=e.node.compareTo(n.node);return i===0?mt(e.name,n.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return A.MIN}maxPost(){return A.MAX}makePost(e,n){const i=K(e);return new A(n,i)}toString(){return".value"}}const sf=new nf;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sa(t){return{type:"value",snapshotNode:t}}function ft(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Mt(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function Lt(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function rf(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class os{constructor(e){this.index_=e}updateChild(e,n,i,s,r,o){w(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(n)?o.trackChildChange(Mt(n,a)):w(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(ft(n,i)):o.trackChildChange(Lt(n,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(n,i).withIndex(this.index_)}updateFullNode(e,n,i){return i!=null&&(e.isLeafNode()||e.forEachChild(B,(s,r)=>{n.hasChild(s)||i.trackChildChange(Mt(s,r))}),n.isLeafNode()||n.forEachChild(B,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(Lt(s,r,o))}else i.trackChildChange(ft(s,r))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?C.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft{constructor(e){this.indexedFilter_=new os(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Ft.getStartPost_(e),this.endPost_=Ft.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&i}updateChild(e,n,i,s,r,o){return this.matches(new A(n,i))||(i=C.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,i,s,r,o)}updateFullNode(e,n,i){n.isLeafNode()&&(n=C.EMPTY_NODE);let s=n.withIndex(this.index_);s=s.updatePriority(C.EMPTY_NODE);const r=this;return n.forEachChild(B,(o,a)=>{r.matches(new A(o,a))||(s=s.updateImmediateChild(o,C.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class of{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=n=>{const i=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new Ft(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,i,s,r,o){return this.rangedFilter_.matches(new A(n,i))||(i=C.EMPTY_NODE),e.getImmediateChild(n).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,i,s,r,o):this.fullLimitUpdateChild_(e,n,i,r,o)}updateFullNode(e,n,i){let s;if(n.isLeafNode()||n.isEmpty())s=C.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){s=C.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=n.withIndex(this.index_),s=s.updatePriority(C.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,C.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,i,s,r){let o;if(this.reverse_){const m=this.index_.getCompare();o=(_,E)=>m(E,_)}else o=this.index_.getCompare();const a=e;w(a.numChildren()===this.limit_,"");const c=new A(n,i),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),p=this.rangedFilter_.matches(c);if(a.hasChild(n)){const m=a.getImmediateChild(n);let _=s.getChildAfterChild(this.index_,l,this.reverse_);for(;_!=null&&(_.name===n||a.hasChild(_.name));)_=s.getChildAfterChild(this.index_,_,this.reverse_);const E=_==null?1:o(_,c);if(p&&!i.isEmpty()&&E>=0)return r?.trackChildChange(Lt(n,i,m)),a.updateImmediateChild(n,i);{r?.trackChildChange(Mt(n,m));const b=a.updateImmediateChild(n,C.EMPTY_NODE);return _!=null&&this.rangedFilter_.matches(_)?(r?.trackChildChange(ft(_.name,_.node)),b.updateImmediateChild(_.name,_.node)):b}}else return i.isEmpty()?e:p&&o(l,c)>=0?(r!=null&&(r.trackChildChange(Mt(l.name,l.node)),r.trackChildChange(ft(n,i))),a.updateImmediateChild(n,i).updateImmediateChild(l.name,C.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class as{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=B}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return w(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return w(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:dt}hasEnd(){return this.endSet_}getIndexEndValue(){return w(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return w(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:it}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return w(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===B}copy(){const e=new as;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function af(t){return t.loadsAllData()?new os(t.getIndex()):t.hasLimit()?new of(t):new Ft(t)}function kr(t){const e={};if(t.isDefault())return e;let n;if(t.index_===B?n="$priority":t.index_===sf?n="$value":t.index_===ht?n="$key":(w(t.index_ instanceof tf,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=j(n),t.startSet_){const i=t.startAfterSet_?"startAfter":"startAt";e[i]=j(t.indexStartValue_),t.startNameSet_&&(e[i]+=","+j(t.indexStartName_))}if(t.endSet_){const i=t.endBeforeSet_?"endBefore":"endAt";e[i]=j(t.indexEndValue_),t.endNameSet_&&(e[i]+=","+j(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function Nr(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==B&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn extends _a{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(w(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=Gt("p:rest:"),this.listens_={}}listen(e,n,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=fn.getListenId_(e,i),a={};this.listens_[o]=a;const c=kr(e._queryParams);this.restRequest_(r+".json",c,(l,p)=>{let m=p;if(l===404&&(m=null,l=null),l===null&&this.onDataUpdate_(r,m,!1,i),ut(this.listens_,o)===a){let _;l?l===401?_="permission_denied":_="rest_error:"+l:_="ok",s(_,null)}})}unlisten(e,n){const i=fn.getListenId_(e,n);delete this.listens_[i]}get(e){const n=kr(e._queryParams),i=e._path.toString(),s=new An;return this.restRequest_(i+".json",n,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,n={},i){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(n.auth=s.accessToken),r&&r.token&&(n.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Hl(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=Pt(a.responseText)}catch{ne("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,c)}else a.status!==401&&a.status!==404&&ne("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lf{constructor(){this.rootNode_=C.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pn(){return{value:null,children:new Map}}function Aa(t,e,n){if(k(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const i=S(e);t.children.has(i)||t.children.set(i,pn());const s=t.children.get(i);e=M(e),Aa(s,e,n)}}function Ci(t,e,n){t.value!==null?n(e,t.value):cf(t,(i,s)=>{const r=new x(e.toString()+"/"+i);Ci(s,r,n)})}function cf(t,e){t.children.forEach((n,i)=>{e(i,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hf{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&ie(this.last_,(i,s)=>{n[i]=n[i]-s}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rr=10*1e3,uf=30*1e3,df=300*1e3;class ff{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new hf(e);const i=Rr+(uf-Rr)*Math.random();At(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),n={};let i=!1;ie(e,(s,r)=>{r>0&&Pe(this.statsToReport_,s)&&(n[s]=r,i=!0)}),i&&this.server_.reportStats(n),At(this.reportStats_.bind(this),Math.floor(Math.random()*2*df))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ue;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(ue||(ue={}));function ka(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function ls(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function cs(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _n{constructor(e,n,i){this.path=e,this.affectedTree=n,this.revert=i,this.type=ue.ACK_USER_WRITE,this.source=ka()}operationForChild(e){if(k(this.path)){if(this.affectedTree.value!=null)return w(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new x(e));return new _n(D(),n,this.revert)}}else return w(S(this.path)===e,"operationForChild called for unrelated child."),new _n(M(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(e,n){this.source=e,this.path=n,this.type=ue.LISTEN_COMPLETE}operationForChild(e){return k(this.path)?new Bt(this.source,D()):new Bt(this.source,M(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st{constructor(e,n,i){this.source=e,this.path=n,this.snap=i,this.type=ue.OVERWRITE}operationForChild(e){return k(this.path)?new st(this.source,D(),this.snap.getImmediateChild(e)):new st(this.source,M(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut{constructor(e,n,i){this.source=e,this.path=n,this.children=i,this.type=ue.MERGE}operationForChild(e){if(k(this.path)){const n=this.children.subtree(new x(e));return n.isEmpty()?null:n.value?new st(this.source,D(),n.value):new Ut(this.source,D(),n)}else return w(S(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Ut(this.source,M(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve{constructor(e,n,i){this.node_=e,this.fullyInitialized_=n,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(k(e))return this.isFullyInitialized()&&!this.filtered_;const n=S(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pf{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function _f(t,e,n,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(rf(o.childName,o.snapshotNode))}),bt(t,s,"child_removed",e,i,n),bt(t,s,"child_added",e,i,n),bt(t,s,"child_moved",r,i,n),bt(t,s,"child_changed",e,i,n),bt(t,s,"value",e,i,n),s}function bt(t,e,n,i,s,r){const o=i.filter(a=>a.type===n);o.sort((a,c)=>mf(t,a,c)),o.forEach(a=>{const c=gf(t,a,r);s.forEach(l=>{l.respondsTo(a.type)&&e.push(l.createEvent(c,t.query_))})})}function gf(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function mf(t,e,n){if(e.childName==null||n.childName==null)throw gt("Should only compare child_ events.");const i=new A(e.childName,e.snapshotNode),s=new A(n.childName,n.snapshotNode);return t.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ln(t,e){return{eventCache:t,serverCache:e}}function kt(t,e,n,i){return Ln(new Ve(e,n,i),t.serverCache)}function Na(t,e,n,i){return Ln(t.eventCache,new Ve(e,n,i))}function gn(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function rt(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let hi;const yf=()=>(hi||(hi=new ee(nd)),hi);class F{static fromObject(e){let n=new F(null);return ie(e,(i,s)=>{n=n.set(new x(i),s)}),n}constructor(e,n=yf()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:D(),value:this.value};if(k(e))return null;{const i=S(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(M(e),n);return r!=null?{path:z(new x(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(k(e))return this;{const n=S(e),i=this.children.get(n);return i!==null?i.subtree(M(e)):new F(null)}}set(e,n){if(k(e))return new F(n,this.children);{const i=S(e),r=(this.children.get(i)||new F(null)).set(M(e),n),o=this.children.insert(i,r);return new F(this.value,o)}}remove(e){if(k(e))return this.children.isEmpty()?new F(null):new F(null,this.children);{const n=S(e),i=this.children.get(n);if(i){const s=i.remove(M(e));let r;return s.isEmpty()?r=this.children.remove(n):r=this.children.insert(n,s),this.value===null&&r.isEmpty()?new F(null):new F(this.value,r)}else return this}}get(e){if(k(e))return this.value;{const n=S(e),i=this.children.get(n);return i?i.get(M(e)):null}}setTree(e,n){if(k(e))return n;{const i=S(e),r=(this.children.get(i)||new F(null)).setTree(M(e),n);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new F(this.value,o)}}fold(e){return this.fold_(D(),e)}fold_(e,n){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(z(e,s),n)}),n(e,this.value,i)}findOnPath(e,n){return this.findOnPath_(e,D(),n)}findOnPath_(e,n,i){const s=this.value?i(n,this.value):!1;if(s)return s;if(k(e))return null;{const r=S(e),o=this.children.get(r);return o?o.findOnPath_(M(e),z(n,r),i):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,D(),n)}foreachOnPath_(e,n,i){if(k(e))return this;{this.value&&i(n,this.value);const s=S(e),r=this.children.get(s);return r?r.foreachOnPath_(M(e),z(n,s),i):new F(null)}}foreach(e){this.foreach_(D(),e)}foreach_(e,n){this.children.inorderTraversal((i,s)=>{s.foreach_(z(e,i),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,i)=>{i.value&&e(n,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fe{constructor(e){this.writeTree_=e}static empty(){return new fe(new F(null))}}function Nt(t,e,n){if(k(e))return new fe(new F(n));{const i=t.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=Z(s,e);return r=r.updateChild(o,n),new fe(t.writeTree_.set(s,r))}else{const s=new F(n),r=t.writeTree_.setTree(e,s);return new fe(r)}}}function Pr(t,e,n){let i=t;return ie(n,(s,r)=>{i=Nt(i,z(e,s),r)}),i}function Dr(t,e){if(k(e))return fe.empty();{const n=t.writeTree_.setTree(e,new F(null));return new fe(n)}}function Si(t,e){return ot(t,e)!=null}function ot(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(Z(n.path,e)):null}function Or(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(B,(i,s)=>{e.push(new A(i,s))}):t.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new A(i,s.value))}),e}function Me(t,e){if(k(e))return t;{const n=ot(t,e);return n!=null?new fe(new F(n)):new fe(t.writeTree_.subtree(e))}}function Ai(t){return t.writeTree_.isEmpty()}function pt(t,e){return Ra(D(),t.writeTree_,e)}function Ra(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(w(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):n=Ra(z(t,s),r,n)}),!n.getChild(t).isEmpty()&&i!==null&&(n=n.updateChild(z(t,".priority"),i)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fn(t,e){return xa(e,t)}function vf(t,e,n,i,s){w(i>t.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),t.allWrites.push({path:e,snap:n,writeId:i,visible:s}),s&&(t.visibleWrites=Nt(t.visibleWrites,e,n)),t.lastWriteId=i}function wf(t,e){for(let n=0;n<t.allWrites.length;n++){const i=t.allWrites[n];if(i.writeId===e)return i}return null}function Ef(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);w(n>=0,"removeWrite called with nonexistent writeId.");const i=t.allWrites[n];t.allWrites.splice(n,1);let s=i.visible,r=!1,o=t.allWrites.length-1;for(;s&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&If(a,i.path)?s=!1:he(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return bf(t),!0;if(i.snap)t.visibleWrites=Dr(t.visibleWrites,i.path);else{const a=i.children;ie(a,c=>{t.visibleWrites=Dr(t.visibleWrites,z(i.path,c))})}return!0}else return!1}function If(t,e){if(t.snap)return he(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&he(z(t.path,n),e))return!0;return!1}function bf(t){t.visibleWrites=Pa(t.allWrites,Tf,D()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function Tf(t){return t.visible}function Pa(t,e,n){let i=fe.empty();for(let s=0;s<t.length;++s){const r=t[s];if(e(r)){const o=r.path;let a;if(r.snap)he(n,o)?(a=Z(n,o),i=Nt(i,a,r.snap)):he(o,n)&&(a=Z(o,n),i=Nt(i,D(),r.snap.getChild(a)));else if(r.children){if(he(n,o))a=Z(n,o),i=Pr(i,a,r.children);else if(he(o,n))if(a=Z(o,n),k(a))i=Pr(i,D(),r.children);else{const c=ut(r.children,S(a));if(c){const l=c.getChild(M(a));i=Nt(i,D(),l)}}}else throw gt("WriteRecord should have .snap or .children")}}return i}function Da(t,e,n,i,s){if(!i&&!s){const r=ot(t.visibleWrites,e);if(r!=null)return r;{const o=Me(t.visibleWrites,e);if(Ai(o))return n;if(n==null&&!Si(o,D()))return null;{const a=n||C.EMPTY_NODE;return pt(o,a)}}}else{const r=Me(t.visibleWrites,e);if(!s&&Ai(r))return n;if(!s&&n==null&&!Si(r,D()))return null;{const o=function(l){return(l.visible||s)&&(!i||!~i.indexOf(l.writeId))&&(he(l.path,e)||he(e,l.path))},a=Pa(t.allWrites,o,e),c=n||C.EMPTY_NODE;return pt(a,c)}}}function Cf(t,e,n){let i=C.EMPTY_NODE;const s=ot(t.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(B,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(n){const r=Me(t.visibleWrites,e);return n.forEachChild(B,(o,a)=>{const c=pt(Me(r,new x(o)),a);i=i.updateImmediateChild(o,c)}),Or(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=Me(t.visibleWrites,e);return Or(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function Sf(t,e,n,i,s){w(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=z(e,n);if(Si(t.visibleWrites,r))return null;{const o=Me(t.visibleWrites,r);return Ai(o)?s.getChild(n):pt(o,s.getChild(n))}}function Af(t,e,n,i){const s=z(e,n),r=ot(t.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(n)){const o=Me(t.visibleWrites,s);return pt(o,i.getNode().getImmediateChild(n))}else return null}function kf(t,e){return ot(t.visibleWrites,e)}function Nf(t,e,n,i,s,r,o){let a;const c=Me(t.visibleWrites,e),l=ot(c,D());if(l!=null)a=l;else if(n!=null)a=pt(c,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const p=[],m=o.getCompare(),_=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let E=_.getNext();for(;E&&p.length<s;)m(E,i)!==0&&p.push(E),E=_.getNext();return p}else return[]}function Rf(){return{visibleWrites:fe.empty(),allWrites:[],lastWriteId:-1}}function mn(t,e,n,i){return Da(t.writeTree,t.treePath,e,n,i)}function hs(t,e){return Cf(t.writeTree,t.treePath,e)}function xr(t,e,n,i){return Sf(t.writeTree,t.treePath,e,n,i)}function yn(t,e){return kf(t.writeTree,z(t.treePath,e))}function Pf(t,e,n,i,s,r){return Nf(t.writeTree,t.treePath,e,n,i,s,r)}function us(t,e,n){return Af(t.writeTree,t.treePath,e,n)}function Oa(t,e){return xa(z(t.treePath,e),t.writeTree)}function xa(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Df{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,i=e.childName;w(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),w(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(n==="child_added"&&r==="child_removed")this.changeMap.set(i,Lt(i,e.snapshotNode,s.snapshotNode));else if(n==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(n==="child_removed"&&r==="child_changed")this.changeMap.set(i,Mt(i,s.oldSnap));else if(n==="child_changed"&&r==="child_added")this.changeMap.set(i,ft(i,e.snapshotNode));else if(n==="child_changed"&&r==="child_changed")this.changeMap.set(i,Lt(i,e.snapshotNode,s.oldSnap));else throw gt("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Of{getCompleteChild(e){return null}getChildAfterChild(e,n,i){return null}}const Ma=new Of;class ds{constructor(e,n,i=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=i}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new Ve(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return us(this.writes_,e,i)}}getChildAfterChild(e,n,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:rt(this.viewCache_),r=Pf(this.writes_,s,n,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xf(t){return{filter:t}}function Mf(t,e){w(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),w(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function Lf(t,e,n,i,s){const r=new Df;let o,a;if(n.type===ue.OVERWRITE){const l=n;l.source.fromUser?o=ki(t,e,l.path,l.snap,i,s,r):(w(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered()&&!k(l.path),o=vn(t,e,l.path,l.snap,i,s,a,r))}else if(n.type===ue.MERGE){const l=n;l.source.fromUser?o=Bf(t,e,l.path,l.children,i,s,r):(w(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),o=Ni(t,e,l.path,l.children,i,s,a,r))}else if(n.type===ue.ACK_USER_WRITE){const l=n;l.revert?o=Wf(t,e,l.path,i,s,r):o=Uf(t,e,l.path,l.affectedTree,i,s,r)}else if(n.type===ue.LISTEN_COMPLETE)o=Vf(t,e,n.path,i,r);else throw gt("Unknown operation type: "+n.type);const c=r.getChanges();return Ff(e,o,c),{viewCache:o,changes:c}}function Ff(t,e,n){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=gn(t);(n.length>0||!t.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&n.push(Sa(gn(e)))}}function La(t,e,n,i,s,r){const o=e.eventCache;if(yn(i,n)!=null)return e;{let a,c;if(k(n))if(w(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const l=rt(e),p=l instanceof C?l:C.EMPTY_NODE,m=hs(i,p);a=t.filter.updateFullNode(e.eventCache.getNode(),m,r)}else{const l=mn(i,rt(e));a=t.filter.updateFullNode(e.eventCache.getNode(),l,r)}else{const l=S(n);if(l===".priority"){w(Ue(n)===1,"Can't have a priority with additional path components");const p=o.getNode();c=e.serverCache.getNode();const m=xr(i,n,p,c);m!=null?a=t.filter.updatePriority(p,m):a=o.getNode()}else{const p=M(n);let m;if(o.isCompleteForChild(l)){c=e.serverCache.getNode();const _=xr(i,n,o.getNode(),c);_!=null?m=o.getNode().getImmediateChild(l).updateChild(p,_):m=o.getNode().getImmediateChild(l)}else m=us(i,l,e.serverCache);m!=null?a=t.filter.updateChild(o.getNode(),l,m,p,s,r):a=o.getNode()}}return kt(e,a,o.isFullyInitialized()||k(n),t.filter.filtersNodes())}}function vn(t,e,n,i,s,r,o,a){const c=e.serverCache;let l;const p=o?t.filter:t.filter.getIndexedFilter();if(k(n))l=p.updateFullNode(c.getNode(),i,null);else if(p.filtersNodes()&&!c.isFiltered()){const E=c.getNode().updateChild(n,i);l=p.updateFullNode(c.getNode(),E,null)}else{const E=S(n);if(!c.isCompleteForPath(n)&&Ue(n)>1)return e;const I=M(n),T=c.getNode().getImmediateChild(E).updateChild(I,i);E===".priority"?l=p.updatePriority(c.getNode(),T):l=p.updateChild(c.getNode(),E,T,I,Ma,null)}const m=Na(e,l,c.isFullyInitialized()||k(n),p.filtersNodes()),_=new ds(s,m,r);return La(t,m,n,s,_,a)}function ki(t,e,n,i,s,r,o){const a=e.eventCache;let c,l;const p=new ds(s,e,r);if(k(n))l=t.filter.updateFullNode(e.eventCache.getNode(),i,o),c=kt(e,l,!0,t.filter.filtersNodes());else{const m=S(n);if(m===".priority")l=t.filter.updatePriority(e.eventCache.getNode(),i),c=kt(e,l,a.isFullyInitialized(),a.isFiltered());else{const _=M(n),E=a.getNode().getImmediateChild(m);let I;if(k(_))I=i;else{const b=p.getCompleteChild(m);b!=null?ma(_)===".priority"&&b.getChild(va(_)).isEmpty()?I=b:I=b.updateChild(_,i):I=C.EMPTY_NODE}if(E.equals(I))c=e;else{const b=t.filter.updateChild(a.getNode(),m,I,_,p,o);c=kt(e,b,a.isFullyInitialized(),t.filter.filtersNodes())}}}return c}function Mr(t,e){return t.eventCache.isCompleteForChild(e)}function Bf(t,e,n,i,s,r,o){let a=e;return i.foreach((c,l)=>{const p=z(n,c);Mr(e,S(p))&&(a=ki(t,a,p,l,s,r,o))}),i.foreach((c,l)=>{const p=z(n,c);Mr(e,S(p))||(a=ki(t,a,p,l,s,r,o))}),a}function Lr(t,e,n){return n.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function Ni(t,e,n,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,l;k(n)?l=i:l=new F(null).setTree(n,i);const p=e.serverCache.getNode();return l.children.inorderTraversal((m,_)=>{if(p.hasChild(m)){const E=e.serverCache.getNode().getImmediateChild(m),I=Lr(t,E,_);c=vn(t,c,new x(m),I,s,r,o,a)}}),l.children.inorderTraversal((m,_)=>{const E=!e.serverCache.isCompleteForChild(m)&&_.value===null;if(!p.hasChild(m)&&!E){const I=e.serverCache.getNode().getImmediateChild(m),b=Lr(t,I,_);c=vn(t,c,new x(m),b,s,r,o,a)}}),c}function Uf(t,e,n,i,s,r,o){if(yn(s,n)!=null)return e;const a=e.serverCache.isFiltered(),c=e.serverCache;if(i.value!=null){if(k(n)&&c.isFullyInitialized()||c.isCompleteForPath(n))return vn(t,e,n,c.getNode().getChild(n),s,r,a,o);if(k(n)){let l=new F(null);return c.getNode().forEachChild(ht,(p,m)=>{l=l.set(new x(p),m)}),Ni(t,e,n,l,s,r,a,o)}else return e}else{let l=new F(null);return i.foreach((p,m)=>{const _=z(n,p);c.isCompleteForPath(_)&&(l=l.set(p,c.getNode().getChild(_)))}),Ni(t,e,n,l,s,r,a,o)}}function Vf(t,e,n,i,s){const r=e.serverCache,o=Na(e,r.getNode(),r.isFullyInitialized()||k(n),r.isFiltered());return La(t,o,n,i,Ma,s)}function Wf(t,e,n,i,s,r){let o;if(yn(i,n)!=null)return e;{const a=new ds(i,e,s),c=e.eventCache.getNode();let l;if(k(n)||S(n)===".priority"){let p;if(e.serverCache.isFullyInitialized())p=mn(i,rt(e));else{const m=e.serverCache.getNode();w(m instanceof C,"serverChildren would be complete if leaf node"),p=hs(i,m)}p=p,l=t.filter.updateFullNode(c,p,r)}else{const p=S(n);let m=us(i,p,e.serverCache);m==null&&e.serverCache.isCompleteForChild(p)&&(m=c.getImmediateChild(p)),m!=null?l=t.filter.updateChild(c,p,m,M(n),a,r):e.eventCache.getNode().hasChild(p)?l=t.filter.updateChild(c,p,C.EMPTY_NODE,M(n),a,r):l=c,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=mn(i,rt(e)),o.isLeafNode()&&(l=t.filter.updateFullNode(l,o,r)))}return o=e.serverCache.isFullyInitialized()||yn(i,D())!=null,kt(e,l,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $f{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new os(i.getIndex()),r=af(i);this.processor_=xf(r);const o=n.serverCache,a=n.eventCache,c=s.updateFullNode(C.EMPTY_NODE,o.getNode(),null),l=r.updateFullNode(C.EMPTY_NODE,a.getNode(),null),p=new Ve(c,o.isFullyInitialized(),s.filtersNodes()),m=new Ve(l,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=Ln(m,p),this.eventGenerator_=new pf(this.query_)}get query(){return this.query_}}function Hf(t){return t.viewCache_.serverCache.getNode()}function jf(t){return gn(t.viewCache_)}function zf(t,e){const n=rt(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!k(e)&&!n.getImmediateChild(S(e)).isEmpty())?n.getChild(e):null}function Fr(t){return t.eventRegistrations_.length===0}function qf(t,e){t.eventRegistrations_.push(e)}function Br(t,e,n){const i=[];if(n){w(e==null,"A cancel should cancel all event registrations.");const s=t.query._path;t.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(n,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<t.eventRegistrations_.length;++r){const o=t.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(t.eventRegistrations_.slice(r+1));break}}t.eventRegistrations_=s}else t.eventRegistrations_=[];return i}function Ur(t,e,n,i){e.type===ue.MERGE&&e.source.queryId!==null&&(w(rt(t.viewCache_),"We should always have a full cache before handling merges"),w(gn(t.viewCache_),"Missing event cache, even though we have a server cache"));const s=t.viewCache_,r=Lf(t.processor_,s,e,n,i);return Mf(t.processor_,r.viewCache),w(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=r.viewCache,Fa(t,r.changes,r.viewCache.eventCache.getNode(),null)}function Gf(t,e){const n=t.viewCache_.eventCache,i=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(B,(r,o)=>{i.push(ft(r,o))}),n.isFullyInitialized()&&i.push(Sa(n.getNode())),Fa(t,i,n.getNode(),e)}function Fa(t,e,n,i){const s=i?[i]:t.eventRegistrations_;return _f(t.eventGenerator_,e,n,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let wn;class Ba{constructor(){this.views=new Map}}function Kf(t){w(!wn,"__referenceConstructor has already been defined"),wn=t}function Yf(){return w(wn,"Reference.ts has not been loaded"),wn}function Qf(t){return t.views.size===0}function fs(t,e,n,i){const s=e.source.queryId;if(s!==null){const r=t.views.get(s);return w(r!=null,"SyncTree gave us an op for an invalid query."),Ur(r,e,n,i)}else{let r=[];for(const o of t.views.values())r=r.concat(Ur(o,e,n,i));return r}}function Ua(t,e,n,i,s){const r=e._queryIdentifier,o=t.views.get(r);if(!o){let a=mn(n,s?i:null),c=!1;a?c=!0:i instanceof C?(a=hs(n,i),c=!1):(a=C.EMPTY_NODE,c=!1);const l=Ln(new Ve(a,c,!1),new Ve(i,s,!1));return new $f(e,l)}return o}function Xf(t,e,n,i,s,r){const o=Ua(t,e,i,s,r);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),qf(o,n),Gf(o,n)}function Jf(t,e,n,i){const s=e._queryIdentifier,r=[];let o=[];const a=We(t);if(s==="default")for(const[c,l]of t.views.entries())o=o.concat(Br(l,n,i)),Fr(l)&&(t.views.delete(c),l.query._queryParams.loadsAllData()||r.push(l.query));else{const c=t.views.get(s);c&&(o=o.concat(Br(c,n,i)),Fr(c)&&(t.views.delete(s),c.query._queryParams.loadsAllData()||r.push(c.query)))}return a&&!We(t)&&r.push(new(Yf())(e._repo,e._path)),{removed:r,events:o}}function Va(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function Le(t,e){let n=null;for(const i of t.views.values())n=n||zf(i,e);return n}function Wa(t,e){if(e._queryParams.loadsAllData())return Bn(t);{const i=e._queryIdentifier;return t.views.get(i)}}function $a(t,e){return Wa(t,e)!=null}function We(t){return Bn(t)!=null}function Bn(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let En;function Zf(t){w(!En,"__referenceConstructor has already been defined"),En=t}function ep(){return w(En,"Reference.ts has not been loaded"),En}let tp=1;class Vr{constructor(e){this.listenProvider_=e,this.syncPointTree_=new F(null),this.pendingWriteTree_=Rf(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Ha(t,e,n,i,s){return vf(t.pendingWriteTree_,e,n,i,s),s?Qt(t,new st(ka(),e,n)):[]}function Qe(t,e,n=!1){const i=wf(t.pendingWriteTree_,e);if(Ef(t.pendingWriteTree_,e)){let r=new F(null);return i.snap!=null?r=r.set(D(),!0):ie(i.children,o=>{r=r.set(new x(o),!0)}),Qt(t,new _n(i.path,r,n))}else return[]}function Yt(t,e,n){return Qt(t,new st(ls(),e,n))}function np(t,e,n){const i=F.fromObject(n);return Qt(t,new Ut(ls(),e,i))}function ip(t,e){return Qt(t,new Bt(ls(),e))}function sp(t,e,n){const i=_s(t,n);if(i){const s=gs(i),r=s.path,o=s.queryId,a=Z(r,e),c=new Bt(cs(o),a);return ms(t,r,c)}else return[]}function In(t,e,n,i,s=!1){const r=e._path,o=t.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||$a(o,e))){const c=Jf(o,e,n,i);Qf(o)&&(t.syncPointTree_=t.syncPointTree_.remove(r));const l=c.removed;if(a=c.events,!s){const p=l.findIndex(_=>_._queryParams.loadsAllData())!==-1,m=t.syncPointTree_.findOnPath(r,(_,E)=>We(E));if(p&&!m){const _=t.syncPointTree_.subtree(r);if(!_.isEmpty()){const E=ap(_);for(let I=0;I<E.length;++I){const b=E[I],T=b.query,$=Ga(t,b);t.listenProvider_.startListening(Rt(T),Vt(t,T),$.hashFn,$.onComplete)}}}!m&&l.length>0&&!i&&(p?t.listenProvider_.stopListening(Rt(e),null):l.forEach(_=>{const E=t.queryToTagMap.get(Un(_));t.listenProvider_.stopListening(Rt(_),E)}))}lp(t,l)}return a}function ja(t,e,n,i){const s=_s(t,i);if(s!=null){const r=gs(s),o=r.path,a=r.queryId,c=Z(o,e),l=new st(cs(a),c,n);return ms(t,o,l)}else return[]}function rp(t,e,n,i){const s=_s(t,i);if(s){const r=gs(s),o=r.path,a=r.queryId,c=Z(o,e),l=F.fromObject(n),p=new Ut(cs(a),c,l);return ms(t,o,p)}else return[]}function Ri(t,e,n,i=!1){const s=e._path;let r=null,o=!1;t.syncPointTree_.foreachOnPath(s,(_,E)=>{const I=Z(_,s);r=r||Le(E,I),o=o||We(E)});let a=t.syncPointTree_.get(s);a?(o=o||We(a),r=r||Le(a,D())):(a=new Ba,t.syncPointTree_=t.syncPointTree_.set(s,a));let c;r!=null?c=!0:(c=!1,r=C.EMPTY_NODE,t.syncPointTree_.subtree(s).foreachChild((E,I)=>{const b=Le(I,D());b&&(r=r.updateImmediateChild(E,b))}));const l=$a(a,e);if(!l&&!e._queryParams.loadsAllData()){const _=Un(e);w(!t.queryToTagMap.has(_),"View does not exist, but we have a tag");const E=cp();t.queryToTagMap.set(_,E),t.tagToQueryMap.set(E,_)}const p=Fn(t.pendingWriteTree_,s);let m=Xf(a,e,n,p,r,c);if(!l&&!o&&!i){const _=Wa(a,e);m=m.concat(hp(t,e,_))}return m}function ps(t,e,n){const s=t.pendingWriteTree_,r=t.syncPointTree_.findOnPath(e,(o,a)=>{const c=Z(o,e),l=Le(a,c);if(l)return l});return Da(s,e,r,n,!0)}function op(t,e){const n=e._path;let i=null;t.syncPointTree_.foreachOnPath(n,(l,p)=>{const m=Z(l,n);i=i||Le(p,m)});let s=t.syncPointTree_.get(n);s?i=i||Le(s,D()):(s=new Ba,t.syncPointTree_=t.syncPointTree_.set(n,s));const r=i!=null,o=r?new Ve(i,!0,!1):null,a=Fn(t.pendingWriteTree_,e._path),c=Ua(s,e,a,r?o.getNode():C.EMPTY_NODE,r);return jf(c)}function Qt(t,e){return za(e,t.syncPointTree_,null,Fn(t.pendingWriteTree_,D()))}function za(t,e,n,i){if(k(t.path))return qa(t,e,n,i);{const s=e.get(D());n==null&&s!=null&&(n=Le(s,D()));let r=[];const o=S(t.path),a=t.operationForChild(o),c=e.children.get(o);if(c&&a){const l=n?n.getImmediateChild(o):null,p=Oa(i,o);r=r.concat(za(a,c,l,p))}return s&&(r=r.concat(fs(s,t,i,n))),r}}function qa(t,e,n,i){const s=e.get(D());n==null&&s!=null&&(n=Le(s,D()));let r=[];return e.children.inorderTraversal((o,a)=>{const c=n?n.getImmediateChild(o):null,l=Oa(i,o),p=t.operationForChild(o);p&&(r=r.concat(qa(p,a,c,l)))}),s&&(r=r.concat(fs(s,t,i,n))),r}function Ga(t,e){const n=e.query,i=Vt(t,n);return{hashFn:()=>(Hf(e)||C.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?sp(t,n._path,i):ip(t,n._path);{const r=rd(s,n);return In(t,n,null,r)}}}}function Vt(t,e){const n=Un(e);return t.queryToTagMap.get(n)}function Un(t){return t._path.toString()+"$"+t._queryIdentifier}function _s(t,e){return t.tagToQueryMap.get(e)}function gs(t){const e=t.indexOf("$");return w(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new x(t.substr(0,e))}}function ms(t,e,n){const i=t.syncPointTree_.get(e);w(i,"Missing sync point for query tag that we're tracking");const s=Fn(t.pendingWriteTree_,e);return fs(i,n,s,null)}function ap(t){return t.fold((e,n,i)=>{if(n&&We(n))return[Bn(n)];{let s=[];return n&&(s=Va(n)),ie(i,(r,o)=>{s=s.concat(o)}),s}})}function Rt(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(ep())(t._repo,t._path):t}function lp(t,e){for(let n=0;n<e.length;++n){const i=e[n];if(!i._queryParams.loadsAllData()){const s=Un(i),r=t.queryToTagMap.get(s);t.queryToTagMap.delete(s),t.tagToQueryMap.delete(r)}}}function cp(){return tp++}function hp(t,e,n){const i=e._path,s=Vt(t,e),r=Ga(t,n),o=t.listenProvider_.startListening(Rt(e),s,r.hashFn,r.onComplete),a=t.syncPointTree_.subtree(i);if(s)w(!We(a.value),"If we're adding a query, it shouldn't be shadowed");else{const c=a.fold((l,p,m)=>{if(!k(l)&&p&&We(p))return[Bn(p).query];{let _=[];return p&&(_=_.concat(Va(p).map(E=>E.query))),ie(m,(E,I)=>{_=_.concat(I)}),_}});for(let l=0;l<c.length;++l){const p=c[l];t.listenProvider_.stopListening(Rt(p),Vt(t,p))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ys{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new ys(n)}node(){return this.node_}}class vs{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=z(this.path_,e);return new vs(this.syncTree_,n)}node(){return ps(this.syncTree_,this.path_)}}const up=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},Wr=function(t,e,n){if(!t||typeof t!="object")return t;if(w(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return dp(t[".sv"],e,n);if(typeof t[".sv"]=="object")return fp(t[".sv"],e);w(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},dp=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:w(!1,"Unexpected server value: "+t)}},fp=function(t,e,n){t.hasOwnProperty("increment")||w(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const i=t.increment;typeof i!="number"&&w(!1,"Unexpected increment value: "+i);const s=e.node();if(w(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},pp=function(t,e,n,i){return ws(e,new vs(n,t),i)},Ka=function(t,e,n){return ws(t,new ys(e),n)};function ws(t,e,n){const i=t.getPriority().val(),s=Wr(i,e.getImmediateChild(".priority"),n);let r;if(t.isLeafNode()){const o=t,a=Wr(o.getValue(),e,n);return a!==o.getValue()||s!==o.getPriority().val()?new q(a,K(s)):t}else{const o=t;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new q(s))),o.forEachChild(B,(a,c)=>{const l=ws(c,e.getImmediateChild(a),n);l!==c&&(r=r.updateImmediateChild(a,l))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Es{constructor(e="",n=null,i={children:{},childCount:0}){this.name=e,this.parent=n,this.node=i}}function Is(t,e){let n=e instanceof x?e:new x(e),i=t,s=S(n);for(;s!==null;){const r=ut(i.node.children,s)||{children:{},childCount:0};i=new Es(s,i,r),n=M(n),s=S(n)}return i}function vt(t){return t.node.value}function Ya(t,e){t.node.value=e,Pi(t)}function Qa(t){return t.node.childCount>0}function _p(t){return vt(t)===void 0&&!Qa(t)}function Vn(t,e){ie(t.node.children,(n,i)=>{e(new Es(n,t,i))})}function Xa(t,e,n,i){n&&e(t),Vn(t,s=>{Xa(s,e,!0)})}function gp(t,e,n){let i=t.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function Xt(t){return new x(t.parent===null?t.name:Xt(t.parent)+"/"+t.name)}function Pi(t){t.parent!==null&&mp(t.parent,t.name,t)}function mp(t,e,n){const i=_p(n),s=Pe(t.node.children,e);i&&s?(delete t.node.children[e],t.node.childCount--,Pi(t)):!i&&!s&&(t.node.children[e]=n.node,t.node.childCount++,Pi(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yp=/[\[\].#$\/\u0000-\u001F\u007F]/,vp=/[\[\].#$\u0000-\u001F\u007F]/,ui=10*1024*1024,Ja=function(t){return typeof t=="string"&&t.length!==0&&!yp.test(t)},Za=function(t){return typeof t=="string"&&t.length!==0&&!vp.test(t)},wp=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Za(t)},el=function(t,e,n,i){i&&e===void 0||bs(Mi(t,"value"),e,n)},bs=function(t,e,n){const i=n instanceof x?new Bd(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+qe(i));if(typeof e=="function")throw new Error(t+"contains a function "+qe(i)+" with contents = "+e.toString());if(Qo(e))throw new Error(t+"contains "+e.toString()+" "+qe(i));if(typeof e=="string"&&e.length>ui/3&&Rn(e)>ui)throw new Error(t+"contains a string greater than "+ui+" utf8 bytes "+qe(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(ie(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Ja(o)))throw new Error(t+" contains an invalid key ("+o+") "+qe(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Ud(i,o),bs(t,a,i),Vd(i)}),s&&r)throw new Error(t+' contains ".value" child '+qe(i)+" in addition to actual children.")}},tl=function(t,e,n,i){if(!Za(n))throw new Error(Mi(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},Ep=function(t,e,n,i){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),tl(t,e,n)},Ts=function(t,e){if(S(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},Ip=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Ja(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!wp(n))throw new Error(Mi(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bp{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Cs(t,e){let n=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();n!==null&&!is(r,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:r}),n.events.push(s)}n&&t.eventLists_.push(n)}function nl(t,e,n){Cs(t,n),il(t,i=>is(i,e))}function ye(t,e,n){Cs(t,n),il(t,i=>he(i,e)||he(e,i))}function il(t,e){t.recursionDepth_++;let n=!0;for(let i=0;i<t.eventLists_.length;i++){const s=t.eventLists_[i];if(s){const r=s.path;e(r)?(Tp(t.eventLists_[i]),t.eventLists_[i]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function Tp(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const i=n.getEventRunner();St&&J("event: "+n.toString()),yt(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cp="repo_interrupt",Sp=25;class Ap{constructor(e,n,i,s){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new bp,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=pn(),this.transactionQueueTree_=new Es,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function kp(t,e,n){if(t.stats_=ts(t.repoInfo_),t.forceRestClient_||cd())t.server_=new fn(t.repoInfo_,(i,s,r,o)=>{$r(t,i,s,r,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>Hr(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{j(n)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}t.persistentConnection_=new ke(t.repoInfo_,e,(i,s,r,o)=>{$r(t,i,s,r,o)},i=>{Hr(t,i)},i=>{Np(t,i)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(i=>{t.server_.refreshAuthToken(i)}),t.appCheckProvider_.addTokenChangeListener(i=>{t.server_.refreshAppCheckToken(i.token)}),t.statsReporter_=pd(t.repoInfo_,()=>new ff(t.stats_,t.server_)),t.infoData_=new lf,t.infoSyncTree_=new Vr({startListening:(i,s,r,o)=>{let a=[];const c=t.infoData_.getNode(i._path);return c.isEmpty()||(a=Yt(t.infoSyncTree_,i._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),As(t,"connected",!1),t.serverSyncTree_=new Vr({startListening:(i,s,r,o)=>(t.server_.listen(i,r,s,(a,c)=>{const l=o(a,c);ye(t.eventQueue_,i._path,l)}),[]),stopListening:(i,s)=>{t.server_.unlisten(i,s)}})}function sl(t){const n=t.infoData_.getNode(new x(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function Ss(t){return up({timestamp:sl(t)})}function $r(t,e,n,i,s){t.dataUpdateCount++;const r=new x(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(s)if(i){const c=sn(n,l=>K(l));o=rp(t.serverSyncTree_,r,c,s)}else{const c=K(n);o=ja(t.serverSyncTree_,r,c,s)}else if(i){const c=sn(n,l=>K(l));o=np(t.serverSyncTree_,r,c)}else{const c=K(n);o=Yt(t.serverSyncTree_,r,c)}let a=r;o.length>0&&(a=$n(t,r)),ye(t.eventQueue_,a,o)}function Hr(t,e){As(t,"connected",e),e===!1&&Dp(t)}function Np(t,e){ie(e,(n,i)=>{As(t,n,i)})}function As(t,e,n){const i=new x("/.info/"+e),s=K(n);t.infoData_.updateSnapshot(i,s);const r=Yt(t.infoSyncTree_,i,s);ye(t.eventQueue_,i,r)}function rl(t){return t.nextWriteId_++}function Rp(t,e,n){const i=op(t.serverSyncTree_,e);return i!=null?Promise.resolve(i):t.server_.get(e).then(s=>{const r=K(s).withIndex(e._queryParams.getIndex());Ri(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=Yt(t.serverSyncTree_,e._path,r);else{const a=Vt(t.serverSyncTree_,e);o=ja(t.serverSyncTree_,e._path,r,a)}return ye(t.eventQueue_,e._path,o),In(t.serverSyncTree_,e,n,null,!0),r},s=>(Wn(t,"get for query "+j(e)+" failed: "+s),Promise.reject(new Error(s))))}function Pp(t,e,n,i,s){Wn(t,"set",{path:e.toString(),value:n,priority:i});const r=Ss(t),o=K(n,i),a=ps(t.serverSyncTree_,e),c=Ka(o,a,r),l=rl(t),p=Ha(t.serverSyncTree_,e,c,l,!0);Cs(t.eventQueue_,p),t.server_.put(e.toString(),o.val(!0),(_,E)=>{const I=_==="ok";I||ne("set at "+e+" failed: "+_);const b=Qe(t.serverSyncTree_,l,!I);ye(t.eventQueue_,e,b),Lp(t,s,_,E)});const m=hl(t,e);$n(t,m),ye(t.eventQueue_,m,[])}function Dp(t){Wn(t,"onDisconnectEvents");const e=Ss(t),n=pn();Ci(t.onDisconnect_,D(),(s,r)=>{const o=pp(s,r,t.serverSyncTree_,e);Aa(n,s,o)});let i=[];Ci(n,D(),(s,r)=>{i=i.concat(Yt(t.serverSyncTree_,s,r));const o=hl(t,s);$n(t,o)}),t.onDisconnect_=pn(),ye(t.eventQueue_,D(),i)}function Op(t,e,n){let i;S(e._path)===".info"?i=Ri(t.infoSyncTree_,e,n):i=Ri(t.serverSyncTree_,e,n),nl(t.eventQueue_,e._path,i)}function xp(t,e,n){let i;S(e._path)===".info"?i=In(t.infoSyncTree_,e,n):i=In(t.serverSyncTree_,e,n),nl(t.eventQueue_,e._path,i)}function Mp(t){t.persistentConnection_&&t.persistentConnection_.interrupt(Cp)}function Wn(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),J(n,...e)}function Lp(t,e,n,i){e&&yt(()=>{if(n==="ok")e(null);else{const s=(n||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function ol(t,e,n){return ps(t.serverSyncTree_,e,n)||C.EMPTY_NODE}function ks(t,e=t.transactionQueueTree_){if(e||Hn(t,e),vt(e)){const n=ll(t,e);w(n.length>0,"Sending zero length transaction queue"),n.every(s=>s.status===0)&&Fp(t,Xt(e),n)}else Qa(e)&&Vn(e,n=>{ks(t,n)})}function Fp(t,e,n){const i=n.map(l=>l.currentWriteId),s=ol(t,e,i);let r=s;const o=s.hash();for(let l=0;l<n.length;l++){const p=n[l];w(p.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),p.status=1,p.retryCount++;const m=Z(e,p.path);r=r.updateChild(m,p.currentOutputSnapshotRaw)}const a=r.val(!0),c=e;t.server_.put(c.toString(),a,l=>{Wn(t,"transaction put response",{path:c.toString(),status:l});let p=[];if(l==="ok"){const m=[];for(let _=0;_<n.length;_++)n[_].status=2,p=p.concat(Qe(t.serverSyncTree_,n[_].currentWriteId)),n[_].onComplete&&m.push(()=>n[_].onComplete(null,!0,n[_].currentOutputSnapshotResolved)),n[_].unwatcher();Hn(t,Is(t.transactionQueueTree_,e)),ks(t,t.transactionQueueTree_),ye(t.eventQueue_,e,p);for(let _=0;_<m.length;_++)yt(m[_])}else{if(l==="datastale")for(let m=0;m<n.length;m++)n[m].status===3?n[m].status=4:n[m].status=0;else{ne("transaction at "+c.toString()+" failed: "+l);for(let m=0;m<n.length;m++)n[m].status=4,n[m].abortReason=l}$n(t,e)}},o)}function $n(t,e){const n=al(t,e),i=Xt(n),s=ll(t,n);return Bp(t,s,i),i}function Bp(t,e,n){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const c=e[a],l=Z(n,c.path);let p=!1,m;if(w(l!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)p=!0,m=c.abortReason,s=s.concat(Qe(t.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=Sp)p=!0,m="maxretry",s=s.concat(Qe(t.serverSyncTree_,c.currentWriteId,!0));else{const _=ol(t,c.path,o);c.currentInputSnapshot=_;const E=e[a].update(_.val());if(E!==void 0){bs("transaction failed: Data returned ",E,c.path);let I=K(E);typeof E=="object"&&E!=null&&Pe(E,".priority")||(I=I.updatePriority(_.getPriority()));const T=c.currentWriteId,$=Ss(t),Q=Ka(I,_,$);c.currentOutputSnapshotRaw=I,c.currentOutputSnapshotResolved=Q,c.currentWriteId=rl(t),o.splice(o.indexOf(T),1),s=s.concat(Ha(t.serverSyncTree_,c.path,Q,c.currentWriteId,c.applyLocally)),s=s.concat(Qe(t.serverSyncTree_,T,!0))}else p=!0,m="nodata",s=s.concat(Qe(t.serverSyncTree_,c.currentWriteId,!0))}ye(t.eventQueue_,n,s),s=[],p&&(e[a].status=2,function(_){setTimeout(_,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(m==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(m),!1,null))))}Hn(t,t.transactionQueueTree_);for(let a=0;a<i.length;a++)yt(i[a]);ks(t,t.transactionQueueTree_)}function al(t,e){let n,i=t.transactionQueueTree_;for(n=S(e);n!==null&&vt(i)===void 0;)i=Is(i,n),e=M(e),n=S(e);return i}function ll(t,e){const n=[];return cl(t,e,n),n.sort((i,s)=>i.order-s.order),n}function cl(t,e,n){const i=vt(e);if(i)for(let s=0;s<i.length;s++)n.push(i[s]);Vn(e,s=>{cl(t,s,n)})}function Hn(t,e){const n=vt(e);if(n){let i=0;for(let s=0;s<n.length;s++)n[s].status!==2&&(n[i]=n[s],i++);n.length=i,Ya(e,n.length>0?n:void 0)}Vn(e,i=>{Hn(t,i)})}function hl(t,e){const n=Xt(al(t,e)),i=Is(t.transactionQueueTree_,e);return gp(i,s=>{di(t,s)}),di(t,i),Xa(i,s=>{di(t,s)}),n}function di(t,e){const n=vt(e);if(n){const i=[];let s=[],r=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(w(r===o-1,"All SENT items should be at beginning of queue."),r=o,n[o].status=3,n[o].abortReason="set"):(w(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),s=s.concat(Qe(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&i.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Ya(e,void 0):n.length=r+1,ye(t.eventQueue_,Xt(e),s);for(let o=0;o<i.length;o++)yt(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Up(t){let e="";const n=t.split("/");for(let i=0;i<n.length;i++)if(n[i].length>0){let s=n[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function Vp(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const i=n.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):ne(`Invalid query segment '${n}' in query '${t}'`)}return e}const jr=function(t,e){const n=Wp(t),i=n.namespace;n.domain==="firebase.com"&&Re(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&n.domain!=="localhost"&&Re("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||ed();const s=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new la(n.host,n.secure,i,s,e,"",i!==n.subdomain),path:new x(n.pathString)}},Wp=function(t){let e="",n="",i="",s="",r="",o=!0,a="https",c=443;if(typeof t=="string"){let l=t.indexOf("//");l>=0&&(a=t.substring(0,l-1),t=t.substring(l+2));let p=t.indexOf("/");p===-1&&(p=t.length);let m=t.indexOf("?");m===-1&&(m=t.length),e=t.substring(0,Math.min(p,m)),p<m&&(s=Up(t.substring(p,m)));const _=Vp(t.substring(Math.min(t.length,m)));l=e.indexOf(":"),l>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(l+1),10)):l=e.length;const E=e.slice(0,l);if(E.toLowerCase()==="localhost")n="localhost";else if(E.split(".").length<=2)n=E;else{const I=e.indexOf(".");i=e.substring(0,I).toLowerCase(),n=e.substring(I+1),r=i}"ns"in _&&(r=_.ns)}return{host:e,port:c,domain:n,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zr="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",$p=function(){let t=0;const e=[];return function(n){const i=n===t;t=n;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=zr.charAt(n%64),n=Math.floor(n/64);w(n===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=zr.charAt(e[s]);return w(o.length===20,"nextPushId: Length should be 20."),o}}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hp{constructor(e,n,i,s){this.eventType=e,this.eventRegistration=n,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+j(this.snapshot.exportVal())}}class jp{constructor(e,n,i){this.eventRegistration=e,this.error=n,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ul{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return w(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class Ns{constructor(e,n,i,s){this._repo=e,this._path=n,this._queryParams=i,this._orderByCalled=s}get key(){return k(this._path)?null:ma(this._path)}get ref(){return new De(this._repo,this._path)}get _queryIdentifier(){const e=Nr(this._queryParams),n=Zi(e);return n==="{}"?"default":n}get _queryObject(){return Nr(this._queryParams)}isEqual(e){if(e=ae(e),!(e instanceof Ns))return!1;const n=this._repo===e._repo,i=is(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return n&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+Fd(this._path)}}class De extends Ns{constructor(e,n){super(e,n,new as,!1)}get parent(){const e=va(this._path);return e===null?null:new De(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Wt{constructor(e,n,i){this._node=e,this.ref=n,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new x(e),i=$t(this.ref,e);return new Wt(this._node.getChild(n),i,B)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new Wt(s,$t(this.ref,i),B)))}hasChild(e){const n=new x(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function N(t,e){return t=ae(t),t._checkNotDeleted("ref"),e!==void 0?$t(t._root,e):t._root}function $t(t,e){return t=ae(t),S(t._path)===null?Ep("child","path",e):tl("child","path",e),new De(t._repo,z(t._path,e))}function bn(t,e){t=ae(t),Ts("push",t._path),el("push",e,t._path,!0);const n=sl(t._repo),i=$p(n),s=$t(t,i),r=$t(t,i);let o;return e!=null?o=Oe(r,e).then(()=>r):o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function re(t){return Ts("remove",t._path),Oe(t,null)}function Oe(t,e){t=ae(t),Ts("set",t._path),el("set",e,t._path,!1);const n=new An;return Pp(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function ve(t){t=ae(t);const e=new ul(()=>{}),n=new jn(e);return Rp(t._repo,t,n).then(i=>new Wt(i,new De(t._repo,t._path),t._queryParams.getIndex()))}class jn{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const i=n._queryParams.getIndex();return new Hp("value",this,new Wt(e.snapshotNode,new De(n._repo,n._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new jp(this,e,n):null}matches(e){return e instanceof jn?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function zp(t,e,n,i,s){const r=new ul(n,void 0),o=new jn(r);return Op(t._repo,t,o),()=>xp(t._repo,t,o)}function dl(t,e,n,i){return zp(t,"value",e)}Kf(De);Zf(De);/**
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
 */const qp="FIREBASE_DATABASE_EMULATOR_HOST",Di={};let Gp=!1;function Kp(t,e,n,i){const s=e.lastIndexOf(":"),r=e.substring(0,s),o=kn(r);t.repoInfo_=new la(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),i&&(t.authTokenProvider_=i)}function Yp(t,e,n,i,s){let r=i||t.options.databaseURL;r===void 0&&(t.options.projectId||Re("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),J("Using default host for project ",t.options.projectId),r=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=jr(r,s),a=o.repoInfo,c;typeof process<"u"&&ur&&(c=ur[qp]),c?(r=`http://${c}?ns=${a.namespace}`,o=jr(r,s),a=o.repoInfo):o.repoInfo.secure;const l=new ud(t.name,t.options,e);Ip("Invalid Firebase Database URL",o),k(o.path)||Re("Database URL must point to the root of a Firebase Database (not including a child path).");const p=Xp(a,t,l,new hd(t,n));return new Jp(p,t)}function Qp(t,e){const n=Di[e];(!n||n[t.key]!==t)&&Re(`Database ${e}(${t.repoInfo_}) has already been deleted.`),Mp(t),delete n[t.key]}function Xp(t,e,n,i){let s=Di[e.name];s||(s={},Di[e.name]=s);let r=s[t.toURLString()];return r&&Re("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new Ap(t,Gp,n,i),s[t.toURLString()]=r,r}class Jp{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(kp(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new De(this._repo,D())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Qp(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Re("Cannot call "+e+" on a deleted database.")}}function Zp(t=Vi(),e){const n=jt(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const i=io("database");i&&e_(n,...i)}return n}function e_(t,e,n,i={}){t=ae(t),t._checkNotDeleted("useEmulator");const s=`${e}:${n}`,r=t._repoInternal;if(t._instanceStarted){if(s===t._repoInternal.repoInfo_.host&&rn(i,r.repoInfo_.emulatorOptions))return;Re("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&Re('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new tn(tn.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:oo(i.mockUserToken,t.app.options.projectId);o=new tn(a)}kn(e)&&(ro(e),ao("Database",!0)),Kp(r,s,i,o)}/**
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
 */function t_(t){Ku(Ui),me(new pe("database",(e,{instanceIdentifier:n})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return Yp(i,s,r,n)},"PUBLIC").setMultipleInstances(!0)),te(dr,fr,t),te(dr,fr,"esm2020")}ke.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};ke.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};t_();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fl="firebasestorage.googleapis.com",n_="storageBucket",i_=120*1e3,s_=600*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee extends $e{constructor(e,n,i=0){super(fi(e),`Firebase Storage: ${n} (${fi(e)})`),this.status_=i,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,Ee.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return fi(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var we;(function(t){t.UNKNOWN="unknown",t.OBJECT_NOT_FOUND="object-not-found",t.BUCKET_NOT_FOUND="bucket-not-found",t.PROJECT_NOT_FOUND="project-not-found",t.QUOTA_EXCEEDED="quota-exceeded",t.UNAUTHENTICATED="unauthenticated",t.UNAUTHORIZED="unauthorized",t.UNAUTHORIZED_APP="unauthorized-app",t.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",t.INVALID_CHECKSUM="invalid-checksum",t.CANCELED="canceled",t.INVALID_EVENT_NAME="invalid-event-name",t.INVALID_URL="invalid-url",t.INVALID_DEFAULT_BUCKET="invalid-default-bucket",t.NO_DEFAULT_BUCKET="no-default-bucket",t.CANNOT_SLICE_BLOB="cannot-slice-blob",t.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",t.NO_DOWNLOAD_URL="no-download-url",t.INVALID_ARGUMENT="invalid-argument",t.INVALID_ARGUMENT_COUNT="invalid-argument-count",t.APP_DELETED="app-deleted",t.INVALID_ROOT_OPERATION="invalid-root-operation",t.INVALID_FORMAT="invalid-format",t.INTERNAL_ERROR="internal-error",t.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(we||(we={}));function fi(t){return"storage/"+t}function r_(){const t="An unknown error occurred, please check the error payload for server response.";return new Ee(we.UNKNOWN,t)}function o_(){return new Ee(we.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function a_(){return new Ee(we.CANCELED,"User canceled the upload/download.")}function l_(t){return new Ee(we.INVALID_URL,"Invalid URL '"+t+"'.")}function c_(t){return new Ee(we.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function qr(t){return new Ee(we.INVALID_ARGUMENT,t)}function pl(){return new Ee(we.APP_DELETED,"The Firebase app was deleted.")}function h_(t){return new Ee(we.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(e,n){this.bucket=e,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,n){let i;try{i=de.makeFromUrl(e,n)}catch{return new de(e,"")}if(i.path==="")return i;throw c_(e)}static makeFromUrl(e,n){let i=null;const s="([A-Za-z0-9.\\-_]+)";function r(W){W.path.charAt(W.path.length-1)==="/"&&(W.path_=W.path_.slice(0,-1))}const o="(/(.*))?$",a=new RegExp("^gs://"+s+o,"i"),c={bucket:1,path:3};function l(W){W.path_=decodeURIComponent(W.path)}const p="v[A-Za-z0-9_]+",m=n.replace(/[.]/g,"\\."),_="(/([^?#]*).*)?$",E=new RegExp(`^https?://${m}/${p}/b/${s}/o${_}`,"i"),I={bucket:1,path:3},b=n===fl?"(?:storage.googleapis.com|storage.cloud.google.com)":n,T="([^?#]*)",$=new RegExp(`^https?://${b}/${s}/${T}`,"i"),V=[{regex:a,indices:c,postModify:r},{regex:E,indices:I,postModify:l},{regex:$,indices:{bucket:1,path:2},postModify:l}];for(let W=0;W<V.length;W++){const He=V[W],_e=He.regex.exec(e);if(_e){const y=_e[He.indices.bucket];let h=_e[He.indices.path];h||(h=""),i=new de(y,h),He.postModify(i);break}}if(i==null)throw l_(e);return i}}class u_{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function d_(t,e,n){let i=1,s=null,r=null,o=!1,a=0;function c(){return a===2}let l=!1;function p(...T){l||(l=!0,e.apply(null,T))}function m(T){s=setTimeout(()=>{s=null,t(E,c())},T)}function _(){r&&clearTimeout(r)}function E(T,...$){if(l){_();return}if(T){_(),p.call(null,T,...$);return}if(c()||o){_(),p.call(null,T,...$);return}i<64&&(i*=2);let V;a===1?(a=2,V=0):V=(i+Math.random())*1e3,m(V)}let I=!1;function b(T){I||(I=!0,_(),!l&&(s!==null?(T||(a=2),clearTimeout(s),m(0)):T||(a=1)))}return m(0),r=setTimeout(()=>{o=!0,b(!0)},n),b}function f_(t){t(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function p_(t){return t!==void 0}function Gr(t,e,n,i){if(i<e)throw qr(`Invalid value for '${t}'. Expected ${e} or greater.`);if(i>n)throw qr(`Invalid value for '${t}'. Expected ${n} or less.`)}function __(t){const e=encodeURIComponent;let n="?";for(const i in t)if(t.hasOwnProperty(i)){const s=e(i)+"="+e(t[i]);n=n+s+"&"}return n=n.slice(0,-1),n}var Tn;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(Tn||(Tn={}));/**
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
 */function g_(t,e){const n=t>=500&&t<600,s=[408,429].indexOf(t)!==-1,r=e.indexOf(t)!==-1;return n||s||r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class m_{constructor(e,n,i,s,r,o,a,c,l,p,m,_=!0,E=!1){this.url_=e,this.method_=n,this.headers_=i,this.body_=s,this.successCodes_=r,this.additionalRetryCodes_=o,this.callback_=a,this.errorCallback_=c,this.timeout_=l,this.progressCallback_=p,this.connectionFactory_=m,this.retry=_,this.isUsingEmulator=E,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((I,b)=>{this.resolve_=I,this.reject_=b,this.start_()})}start_(){const e=(i,s)=>{if(s){i(!1,new en(!1,null,!0));return}const r=this.connectionFactory_();this.pendingConnection_=r;const o=a=>{const c=a.loaded,l=a.lengthComputable?a.total:-1;this.progressCallback_!==null&&this.progressCallback_(c,l)};this.progressCallback_!==null&&r.addUploadProgressListener(o),r.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&r.removeUploadProgressListener(o),this.pendingConnection_=null;const a=r.getErrorCode()===Tn.NO_ERROR,c=r.getStatus();if(!a||g_(c,this.additionalRetryCodes_)&&this.retry){const p=r.getErrorCode()===Tn.ABORT;i(!1,new en(!1,null,p));return}const l=this.successCodes_.indexOf(c)!==-1;i(!0,new en(l,r))})},n=(i,s)=>{const r=this.resolve_,o=this.reject_,a=s.connection;if(s.wasSuccessCode)try{const c=this.callback_(a,a.getResponse());p_(c)?r(c):r()}catch(c){o(c)}else if(a!==null){const c=r_();c.serverResponse=a.getErrorText(),this.errorCallback_?o(this.errorCallback_(a,c)):o(c)}else if(s.canceled){const c=this.appDelete_?pl():a_();o(c)}else{const c=o_();o(c)}};this.canceled_?n(!1,new en(!1,null,!0)):this.backoffId_=d_(e,n,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&f_(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class en{constructor(e,n,i){this.wasSuccessCode=e,this.connection=n,this.canceled=!!i}}function y_(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function v_(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function w_(t,e){e&&(t["X-Firebase-GMPID"]=e)}function E_(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function I_(t,e,n,i,s,r,o=!0,a=!1){const c=__(t.urlParams),l=t.url+c,p=Object.assign({},t.headers);return w_(p,e),y_(p,n),v_(p,r),E_(p,i),new m_(l,t.method,p,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,s,o,a)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b_(t){if(t.length===0)return null;const e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function T_(t){const e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
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
 */class Cn{constructor(e,n){this._service=e,n instanceof de?this._location=n:this._location=de.makeFromUrl(n,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,n){return new Cn(e,n)}get root(){const e=new de(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return T_(this._location.path)}get storage(){return this._service}get parent(){const e=b_(this._location.path);if(e===null)return null;const n=new de(this._location.bucket,e);return new Cn(this._service,n)}_throwIfRoot(e){if(this._location.path==="")throw h_(e)}}function Kr(t,e){const n=e?.[n_];return n==null?null:de.makeFromBucketSpec(n,t)}function C_(t,e,n,i={}){t.host=`${e}:${n}`;const s=kn(e);s&&(ro(`https://${t.host}/b`),ao("Storage",!0)),t._isUsingEmulator=!0,t._protocol=s?"https":"http";const{mockUserToken:r}=i;r&&(t._overrideAuthToken=typeof r=="string"?r:oo(r,t.app.options.projectId))}class S_{constructor(e,n,i,s,r,o=!1){this.app=e,this._authProvider=n,this._appCheckProvider=i,this._url=s,this._firebaseVersion=r,this._isUsingEmulator=o,this._bucket=null,this._host=fl,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=i_,this._maxUploadRetryTime=s_,this._requests=new Set,s!=null?this._bucket=de.makeFromBucketSpec(s,this._host):this._bucket=Kr(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=de.makeFromBucketSpec(this._url,e):this._bucket=Kr(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Gr("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Gr("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const n=await e.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){if(Bi(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Cn(this,e)}_makeRequest(e,n,i,s,r=!0){if(this._deleted)return new u_(pl());{const o=I_(e,this._appId,i,s,n,this._firebaseVersion,r,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,n){const[i,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,i,s).getPromise()}}const Yr="@firebase/storage",Qr="0.14.0";/**
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
 */const _l="storage";function A_(t=Vi(),e){t=ae(t);const i=jt(t,_l).getImmediate({identifier:e}),s=io("storage");return s&&k_(i,...s),i}function k_(t,e,n,i={}){C_(t,e,n,i)}function N_(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),i=t.getProvider("auth-internal"),s=t.getProvider("app-check-internal");return new S_(n,i,s,e,Ui)}function R_(){me(new pe(_l,N_,"PUBLIC").setMultipleInstances(!0)),te(Yr,Qr,""),te(Yr,Qr,"esm2020")}R_();const P_={apiKey:"AIzaSyC-jTMiDjHNTC6cvSKUU44mVbWwT-ToLxQ",authDomain:"mister-x-d6b59.firebaseapp.com",databaseURL:"https://mister-x-d6b59-default-rtdb.europe-west1.firebasedatabase.app",projectId:"mister-x-d6b59",storageBucket:"mister-x-d6b59.firebasestorage.app",messagingSenderId:"616391598963",appId:"1:616391598963:web:da07882b0f481d3000db06",measurementId:"G-W66SK677NG"},Rs=_o(P_),R=Zp(Rs);A_(Rs);const Ht=Tu(Rs);let Fe,Xr=!1,X,Tt=[];window.onerror=function(t,e,n,i,s){alert("JS-Fehler: "+t+" in "+e+" Zeile "+n)};const zn=supabase.createClient("https://axirbthvnznvhfagduyj.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4aXJidGh2bnpudmhmYWdkdXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMDI2MTcsImV4cCI6MjA2ODg3ODYxN30.wfJm9e10_iNuYm_r3es_FmKuXBePsxSjIJcVqmSuYjc");function D_(t){let e="";localStorage.getItem("deviceId")?e=localStorage.getItem("deviceId"):(e=prompt("Wie soll dieses Gerät heißen?")||"Unbekannt",localStorage.setItem("deviceId",e)),zn.from("fcm_tokens").upsert({token:t,device_name:e}).then(({error:n})=>{n?console.error("Fehler beim Speichern des Tokens:",n):console.log("Token erfolgreich gespeichert.")})}function qn(){let t=localStorage.getItem("deviceId");for(;!t||t.trim()==="";)t=prompt("Bitte gib deinen Namen ein"),t===null&&alert("Du musst einen Namen eingeben, um fortzufahren.");return localStorage.setItem("deviceId",t.trim()),t.trim()}try{localStorage.setItem("test","1")}catch{alert("⚠️ Dein Browser blockiert lokalen Speicher. Bitte verlasse den privaten Modus oder ändere die Einstellungen.")}function O_(){Notification.requestPermission().then(t=>{t==="granted"?Qi(Ht,{vapidKey:"BPxoiPhAH4gXMrR7PhhrAUolApYTK93-MZ48-BHWF0rksFtkvBwE9zYUS2pfiEw6_PXzPYyaQZdNwM6LL4QdeOE"}).then(e=>{if(e){const n=qn();console.log("Token:",e),Oe(N(R,"tokens/"+n),{currentToken:e}),D_(e),localStorage.setItem("nachrichtAktiv",!0),document.getElementById("permissionButton").style.display="none"}else console.warn("Kein Token erhalten.")}).catch(e=>{console.error("Fehler beim Token holen:",e)}):console.warn("Benachrichtigungen nicht erlaubt.")})}function x_(){Qi(Ht,{vapidKey:"BPxoiPhAH4gXMrR7PhhrAUolApYTK93-MZ48-BHWF0rksFtkvBwE9zYUS2pfiEw6_PXzPYyaQZdNwM6LL4QdeOE"}).then(t=>{if(t){const e=qn();re(N(R,"tokens/"+e)),console.log("Token aus Firebase entfernt:",t)}zn.from("fcm_tokens").delete().eq("token",t).then(({error:e})=>{e?console.error("Fehler beim Löschen des Tokens aus Supabase:",e):console.log("Token erfolgreich aus Supabase gelöscht.")}),Cu(Ht).then(()=>{console.log("Token gelöscht.")}).catch(e=>{console.error("Fehler beim Löschen des Tokens:",e)}),localStorage.removeItem("nachrichtAktiv"),document.getElementById("permissionButton").style.display="block"}),navigator.serviceWorker.getRegistrations().then(t=>{for(let e of t)e.unregister().then(n=>{n&&alert("Service Worker abgemeldet.")})})}async function gl(t,e,n=[],i=1,s=30){const o=await(await fetch("https://axirbthvnznvhfagduyj.supabase.co/functions/v1/send-to-all",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:t,body:e,tokens:n})})).json();console.log(`📦 Versuch ${i}:`,o),o.failedTokens&&o.failedTokens.length>0&&i<s?(console.log(`🔁 Wiederhole für ${o.failedTokens.length} fehlgeschlagene Tokens in 10 Sekunden...`),setTimeout(()=>{gl(t,e,o.failedTokens,i+1,s)},1e4)):i>=s?console.warn("⏱️ Max. Anzahl an Versuchen erreicht."):console.log("✅ Alle Benachrichtigungen erfolgreich gesendet.")}async function Gn(t,e,n){const i=await ve(N(R,"timer")),s=await ve(N(R,"tokens")),r=i.val(),o=s.val(),a=new Set;if(n==="all"||Array.isArray(n)&&n.includes("all"))for(const c in o)a.add(o[c]);else{const c=Array.isArray(n)?n:[n];for(const l in r){const p=r[l]?.role;c.includes(p)&&o[l]&&a.add(o[l])}}if(a.size===0){console.warn(`⚠️ Keine passenden Tokens für Rollen "${n}" gefunden.`);return}gl(t,e,Array.from(a))}function ml(t,e){const n="Misterx-upload",i=new FormData;i.append("file",t),i.append("upload_preset",n),fetch("https://api.cloudinary.com/v1_1/ddvf141hb/image/upload",{method:"POST",body:i}).then(s=>s.json()).then(s=>{s.secure_url&&s.public_id?e({url:s.secure_url}):alert("Fehler beim Hochladen zu Cloudinary.")}).catch(s=>{console.error("Upload-Fehler:",s),alert("Fehler beim Hochladen zu Cloudinary.")})}function M_(){const t=document.getElementById("locationTitle").value,e=document.getElementById("photoInput").files[0],n=document.getElementById("manualLocationDescription").value.trim(),i=document.getElementById("manualLocationContainer");if(!t||!e){alert("Bitte Titel und Foto angeben.");return}const s=Date.now();if(i&&i.style.display!=="none"&&n!==""){const r={title:t,description:n,timestamp:s},o=bn(N(R,"locations"),r),a=t+" – "+n;Gn("Mister X hat sich gezeigt!",a,"agent"),ml(e,({url:c})=>{o.update({photoURL:c})}),document.getElementById("locationTitle").value="",document.getElementById("photoInput").value="",document.getElementById("manualLocationDescription").value="",i.style.display="none",document.getElementById("status").innerText="✅ Standort/Foto erfolgreich gesendet!",Kn();return}navigator.geolocation?navigator.geolocation.getCurrentPosition(r=>{const o=r.coords.accuracy;if(o>100){document.getElementById("status").innerText=`⚠️ Standort ungenau (±${Math.round(o)} m). Bitte erneut versuchen oder Standortbeschreibung eingeben.`,i.style.display="block";return}pi(r.coords.latitude,r.coords.longitude,n)},r=>{El(r),i.style.display="block",pi(null,null,n)}):(document.getElementById("status").innerText="Geolocation wird nicht unterstützt.",i.style.display="block",pi(null,null,n))}function pi(t,e,n){const i=document.getElementById("locationTitle").value,s=document.getElementById("photoInput").files[0],r=Date.now(),o={title:i,timestamp:r};t!=null&&e!=null&&(o.lat=t,o.lon=e),n&&n!==""&&(o.description=n);const a=bn(N(R,"locations"),o);let c=i;n&&n!==""&&(c+=" - "+n),Gn("Mister X hat sich gezeigt!",c,"agent"),s&&ml(s,({url:l})=>{a.update({photoURL:l})}),document.getElementById("locationTitle").value="",document.getElementById("photoInput").value="",document.getElementById("manualLocationDescription").value="",document.getElementById("manualLocationContainer").style.display="none",document.getElementById("status").innerText="✅ Standort/Foto erfolgreich gesendet!",Kn()}function Sn(){dl(N(R,"locations"),t=>{if(!t.exists()){X&&(X.remove(),X=null),document.getElementById("map").style.display="none",document.getElementById("locationFeed").innerHTML="",Tt=[];return}const e=t.val(),n=Object.values(e).sort((r,o)=>o.timestamp-r.timestamp),i=n.filter(r=>r.lat!=null&&r.lon!=null);if(i.length>0){const{lat:r,lon:o}=i[0];X&&(X.remove(),X=null),X=L.map("map").setView([r,o],15),L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap"}).addTo(X),Tt.forEach(a=>X.removeLayer(a)),Tt=[],i.forEach(a=>{const c=L.circleMarker([a.lat,a.lon],{radius:5,color:"blue"}).addTo(X).bindPopup(`📍 ${new Date(a.timestamp).toLocaleString()}`);Tt.push(c)}),document.getElementById("map").style.display="block"}else X&&(X.remove(),X=null),document.getElementById("map").style.display="none";const s=document.getElementById("locationFeed");s.innerHTML="",n.forEach(r=>{const o=r.title?r.title:"Automatischer Standort",a=r.timestamp?new Date(r.timestamp).toLocaleTimeString():"",c=r.photoURL?`<img src="${r.photoURL}" alt="Foto" style="max-width: 100%; height: auto; border: 1px solid #ccc; margin-top: 5px;">`:"",l=document.createElement("div");l.style.marginBottom="1em",l.innerHTML=`
        <strong>${o} (${a})</strong><br>
        ${r.description?`<em>📍 ${r.description}</em><br>`:""}
        ${c}
      `,s.appendChild(l)})})}function L_(){ve(N(R,"roles")).then(t=>{const e=t.val();for(const n in e)e[n].role==="misterx"&&Oe(N(R,"roles/"+n),{role:"start",timestamp:Date.now()});alert("Alle Mister X Rollen wurden zurückgesetzt.")})}async function F_(){const t=await ve(N(R,"settings/max_Team_X")),e=t.exists()?t.val():1,i=(await ve(N(R,"roles"))).val();let s=0;for(const r in i)i[r].role==="misterx"&&s++;return s<e}async function yl(t){if(t!==localStorage.getItem("activeView")){if(t==="misterx"&&!await F_()){alert("Es ist bereits ein Gerät als Mister X angemeldet!"),Oi();return}if(t==="settings"&&prompt("Passwort eingeben!")!=="1001"){Oi();return}}document.getElementById("startView").style.display="none",document.getElementById("startView2").style.display="none",document.querySelectorAll(".view").forEach(i=>i.style.display="none"),t==="misterx"?(document.getElementById("misterxView").style.display="block",Sn()):t==="agent"?(document.getElementById("agentView").style.display="block",Sn()):t==="settings"&&(document.getElementById("settingsView").style.display="block",z_()),localStorage.setItem("activeView",t);const e=qn();Oe(N(R,"roles/"+e),{role:t,timestamp:Date.now()});const n=t;await zn.from("fcm_tokens").update({role:n}).eq("device_name",e),ve(N(R,"timer")).then(i=>{const s=i.val();if(s){const{startTime:r,duration:o,durationInput:a}=s;o?(vl(r,o),_t(!0)):_t(!1)}})}async function Oi(){document.querySelectorAll(".view").forEach(n=>n.style.display="none"),document.getElementById("startView").style.display="block",document.getElementById("startView2").style.display="block",clearInterval(Fe),localStorage.setItem("activeView","start");const t=qn();Oe(N(R,"roles/"+t),{role:"start",timestamp:Date.now()}),await zn.from("fcm_tokens").update({role:"start"}).eq("device_name",t)}async function Kn(){await re(N(R,"timer/duration")),await re(N(R,"timer/startTime")),await re(N(R,"timerMessage"));const e=(await ve(N(R,"timerScheduleId"))).val();e&&(await fetch(`https://qstash.upstash.io/v2/schedules/${e}`,{method:"DELETE",headers:{Authorization:"Bearer eyJVc2VySUQiOiI3YjAxMDFmYi04MGE2LTRmMjAtOWM0MS0zNzZiNDUxNmNkOWQiLCJQYXNzd29yZCI6IjYyM2ZhNzlmOWM4MDRhMzQ5YmE2NjZmYjFlMDExNDBjIn0"}}),await re(N(R,"timerScheduleId"))),typeof Fe<"u"&&clearInterval(Fe);const i=(await timerRef.once("value")).val();Math.floor(i?.durationInput);let s=1500;typeof i?.durationInput=="number"&&i.durationInput>0&&(s=i.durationInput,(isNaN(s)||s<1)&&(s=60));const r=Date.now(),o=r+s*1e3,a={title:"⏰ Zeit abgelaufen!",body:"Mister X muss sich zeigen!",roles:["misterx"]};await timerRef.set({startTime:r,duration:s,durationInput:s}),await Oe(N(R,"timerMessage"),a);const l={destination:"https://webhook.site/2d18361b-d352-4893-9331-5549bc00c8ef",delay:Math.max(o-Date.now(),0),body:JSON.stringify({timerId:"main"})};console.log("Qstasg Payload:",l),fetch("https://qstash.upstash.io/v2/schedules",{method:"POST",headers:{Authorization:"Bearer eyJVc2VySUQiOiI3YjAxMDFmYi04MGE2LTRmMjAtOWM0MS0zNzZiNDUxNmNkOWQiLCJQYXNzd29yZCI6IjYyM2ZhNzlmOWM4MDRhMzQ5YmE2NjZmYjFlMDExNDBjIn0=","Content-Type":"application/json"},body:JSON.stringify(l)}).then(p=>p.json()).then(p=>{p.scheduleId?console.log("Qstash erfolgreich geplant:",p):console.error("Kein ScheduleId von QStash erhalten",p)}).catch(p=>console.error("Fehler beim QStash-Aufruf:",p))}function B_(){Xr||(Xr=!0,dl(N(R,"timer"),t=>{const e=t.val(),{startTime:n,duration:i,durationInput:s}=e;if(!n){clearInterval(Fe),_t(!1);const r=document.getElementById("timer"),o=document.getElementById("agentTimer"),a=document.getElementById("settingsTimer");r&&(r.innerText="⏳ Zeit bis zum nächsten Posten: --:--"),o&&(o.innerText="⏳ Mister X Timer: --:--"),a&&(a.innerText="⏳ Aktueller Timer: --:--");return}vl(n,i),_t(!0)}))}function vl(t,e){clearInterval(Fe),Fe=setInterval(()=>{const n=Date.now(),i=Math.floor((n-t)/1e3),s=e-i;let r;if(s<0)r="abgelaufen";else{const p=Math.floor(s/60),m=s%60;r=`${String(p).padStart(2,"0")}:${String(m).padStart(2,"0")}`}const o=document.getElementById("timer"),a=document.getElementById("agentTimer"),c=document.getElementById("settingsTimer");function l(p){p&&(s<=300&&s>0?(p.style.color="red",p.style.animation="blinker 1s linear infinite"):(p.style.color="",p.style.animation=""))}c&&(c.innerText=`⏳ Aktueller Timer: ${r}`,l(c)),o&&(o.innerText=`⏳ Zeit bis zum nächsten Posten: ${r}`,l(o)),a&&(a.innerText=`⏳ Mister X Timer: ${r}`,l(a)),s<=0&&(clearInterval(Fe),_t(!1),[o,a,c].forEach(p=>{p&&(p.style.color="",p.style.animation="")}),localStorage.getItem("activeView")==="misterx"&&(alert("Zeit abgelaufen, dein Standort wird einmalig geteilt"),V_(),Kn()))},1e3)}function U_(){ve(N(R,"timer")).then(t=>{if(!t.exists())return;const e=t.val(),n=document.getElementById("timerDurationInput");n&&(e&&typeof e.durationInput=="number"?n.value=Math.floor(e.durationInput/60):n.value=25)})}const wl=document.createElement("style");wl.innerHTML=`
@keyframes blinker {
  50% { opacity: 0; }
}
`;document.head.appendChild(wl);function V_(){navigator.geolocation?navigator.geolocation.getCurrentPosition(t=>{const e=t.coords.latitude,n=t.coords.longitude,i=t.coords.accuracy,s=Date.now();if(i>100){document.getElementById("status").innerText="⚠️ Standort ungenau (±"+Math.round(i)+" m). Bitte Standortbeschreibung manuell eingeben.",standortbeschreibung=prompt("Bitte den Standort beschreiben (bzw. wenn U-Bahn, dann gemäß Regelwerk angeben)")||"wurde nicht angegeben!",bn(N(R,"locations"),{description:standortbeschreibung.trim(),timestamp:s});return}bn(N(R,"locations"),{title:"Automatischer Standort",lat:e,lon:n,timestamp:s}),Gn("Mister X hat sich gezeigt!","Automatische Standort-Übermittlung.","agent"),Sn()},El):document.getElementById("status").innerText="Geolocation wird nicht unterstützt."}function El(t){let e="❌ Fehler beim Abrufen des Standorts.";switch(t.code){case t.PERMISSION_DENIED:e+=" Zugriff verweigert.";break;case t.POSITION_UNAVAILABLE:e+=" Standortinformationen nicht verfügbar.";break;case t.TIMEOUT:e+=" Zeitüberschreitung bei der Standortabfrage.";break}e+=" Bitte erneut versuchen oder Standortbeschreibung manuell eingeben.",document.getElementById("status").innerText=e}function _t(t){const e=document.getElementById("startTimerButton");e&&(e.disabled=t,e.style.opacity=t?"0.5":"1",e.style.pointerEvents=t?"none":"auto",e.style.cursor=t?"default":"pointer")}function W_(){localStorage.getItem("nachrichtAktiv")?(document.getElementById("permissionButton").style.display="none",document.getElementById("permissionButton2").style.display="block"):(document.getElementById("permissionButton").style.display="block",document.getElementById("permissionButton2").style.display="none")}function $_(){confirm("Möchtest du wirklich alle gespeicherten Standorte löschen?")&&re(N(R,"locations")).then(()=>{alert("Alle Standorte wurden gelöscht."),X&&(X.remove(),X=null),document.getElementById("map").style.display="none",document.getElementById("locationFeed").innerHTML="",Tt=[],document.getElementById("status").innerText=""})}async function H_(){await re(N(R,"timer/duration")),await re(N(R,"timer/startTime"));const e=(await ve(N(R,"timerScheduleId"))).val();e&&(await fetch(`https://qstash.upstash.io/v2/schedules/${e}`,{method:"DELETE",headers:{Authorization:"Bearer eyJVc2VySUQiOiI3YjAxMDFmYi04MGE2LTRmMjAtOWM0MS0zNzZiNDUxNmNkOWQiLCJQYXNzd29yZCI6IjYyM2ZhNzlmOWM4MDRhMzQ5YmE2NjZmYjFlMDExNDBjIn0"}}),await re(N(R,"timerScheduleId"))),await re(N(R,"timerMessage")),clearInterval(Fe),_t(!1);const n=document.getElementById("timer"),i=document.getElementById("agentTimer"),s=document.getElementById("settingsTimer");n&&(n.innerText="⏳ Zeit bis zum nächsten Posten: --:--"),i&&(i.innerText="⏳ Mister X Timer: --:--"),s&&(s.innerText="⏳ Aktueller Timer: --:--"),Gn("Timer zurückgesetzt","Der Timer wurde zurückgesetzt!","all")}function j_(){const t=document.getElementById("max_Team_X").value;re(N(R,"settings/max_Team_X")).then(()=>Oe(N(R,"settings/max_Team_X"),Number(t))).then(()=>{console.log("max_Team_X erfolgreich gespeichert:",t)}).catch(e=>{console.error("Fehler beim Speichern von max_Team_X:",e)})}function z_(){const t=document.getElementById("max_Team_X");ve(N(R,"settings/max_Team_X")).then(e=>{e.exists()?(t.value=e.val(),console.log("max_Team_X geladen:",e.val())):console.warn("Kein max_Team_X-Wert gefunden.")}).catch(e=>{console.error("Fehler beim Laden von max_Team_X:",e)})}function q_(){const e=document.getElementById("timerDurationInput").value*60;re(N(R,"timer/durationInput")).then(()=>Oe(N(R,"timer/durationInput"),Number(e))).then(()=>{console.log("Duration_input:",e)}).catch(n=>{console.error("Fehler beim Speichern von DurationInput:",n)})}function G_(){alert("Seite geladen - DOMContentLoaded ausgelöst"),navigator.serviceWorker.register("firebase-messaging-sw.js").then(e=>{console.log("Service Worker registriert:",e),Qi(Ht,{serviceWorkerRegistration:e,vapidKey:"BPxoiPhAH4gXMrR7PhhrAUolApYTK93-MZ48-BHWF0rksFtkvBwE9zYUS2pfiEw6_PXzPYyaQZdNwM6LL4QdeOE"}).then(n=>{console.log("Token erhalten:",n)}).catch(n=>{console.error("Fehler beim Abrufen des Tokens:",n)})}),window.messaging?Su(Ht,e=>{console.log("Nachricht empfangen:",e);const{title:n,body:i}=e.notification;alert(`${n}
${i}`)}):alert("Messaging nicht verfügbar!");try{const e=localStorage.getItem("activeView");e&&e!=="start"?yl(e):(document.getElementById("startView").style.display="block",document.getElementById("startView2").style.display="block")}catch(e){alert("Fehler beim Zugriff auf localStorage: "+e.message),document.getElementById("startView").style.display="block",document.getElementById("startView2").style.display="block"}Sn(),B_(),U_(),W_();const t=document.getElementById("photoInput");t&&t.addEventListener("change",function(){this.files[0]&&(document.getElementById("status").innerText="📸 Foto ausgewählt!")})}document.addEventListener("DOMContentLoaded",G_);window.switchView=yl;window.requestPermission=O_;window.sendLocationWithPhoto=M_;window.startTimer=Kn;window.goBack=Oi;window.save_timer_duration=q_;window.save_max_mister_x=j_;window.resetTimer=H_;window.deleteAllLocations=$_;window.resetAllMisterXRollen=L_;window.removeNotificationSetup=x_;
