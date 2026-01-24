import{o as Dn,d as ii}from"./vendor-Cj_BHRrm.js";const kl=()=>{};var Vs={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ao={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const v=function(t,e){if(!t)throw yt(e)},yt=function(t){return new Error("Firebase Database ("+ao.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lo=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&i+1<t.length&&(t.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++i)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Nl=function(t){const e=[];let n=0,i=0;for(;n<t.length;){const s=t[n++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=t[n++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=t[n++],o=t[n++],a=t[n++],c=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(c>>10)),e[i++]=String.fromCharCode(56320+(c&1023))}else{const r=t[n++],o=t[n++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},On={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<t.length;s+=3){const r=t[s],o=s+1<t.length,a=o?t[s+1]:0,c=s+2<t.length,l=c?t[s+2]:0,m=r>>2,f=(r&3)<<4|a>>4;let p=(a&15)<<2|l>>6,E=l&63;c||(E=64,o||(p=64)),i.push(n[m],n[f],n[p],n[E])}return i.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(lo(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Nl(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<t.length;){const r=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const l=s<t.length?n[t.charAt(s)]:64;++s;const f=s<t.length?n[t.charAt(s)]:64;if(++s,r==null||a==null||l==null||f==null)throw new Rl;const p=r<<2|a>>4;if(i.push(p),l!==64){const E=a<<4&240|l>>2;if(i.push(E),f!==64){const C=l<<6&192|f;i.push(C)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Rl extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const co=function(t){const e=lo(t);return On.encodeByteArray(e,!0)},cn=function(t){return co(t).replace(/\./g,"")},Ei=function(t){try{return On.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pl(t){return ho(void 0,t)}function ho(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!Dl(n)||(t[n]=ho(t[n],e[n]));return t}function Dl(t){return t!=="__proto__"}/**
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
 */function uo(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Ol=()=>uo().__FIREBASE_DEFAULTS__,xl=()=>{if(typeof process>"u"||typeof Vs>"u")return;const t=Vs.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Ml=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Ei(t[1]);return e&&JSON.parse(e)},fo=()=>{try{return kl()||Ol()||xl()||Ml()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Ll=t=>{var e,n;return(n=(e=fo())==null?void 0:e.emulatorHosts)==null?void 0:n[t]},po=t=>{const e=Ll(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),i]:[e.substring(0,n),i]},_o=()=>{var t;return(t=fo())==null?void 0:t.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class me{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,i)=>{n?this.reject(n):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,i))}}}/**
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
 */function xn(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function go(t){return(await fetch(t,{credentials:"include"})).ok}/**
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
 */function mo(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},i=e||"demo-project",s=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...t};return[cn(JSON.stringify(n)),cn(JSON.stringify(o)),""].join(".")}const St={};function Fl(){const t={prod:[],emulator:[]};for(const e of Object.keys(St))St[e]?t.emulator.push(e):t.prod.push(e);return t}function Ul(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let Ws=!1;function yo(t,e){if(typeof window>"u"||typeof document>"u"||!xn(window.location.host)||St[t]===e||St[t]||Ws)return;St[t]=e;function n(p){return`__firebase__banner__${p}`}const i="__firebase__banner",r=Fl().prod.length>0;function o(){const p=document.getElementById(i);p&&p.remove()}function a(p){p.style.display="flex",p.style.background="#7faaf0",p.style.position="fixed",p.style.bottom="5px",p.style.left="5px",p.style.padding=".5em",p.style.borderRadius="5px",p.style.alignItems="center"}function c(p,E){p.setAttribute("width","24"),p.setAttribute("id",E),p.setAttribute("height","24"),p.setAttribute("viewBox","0 0 24 24"),p.setAttribute("fill","none"),p.style.marginLeft="-6px"}function l(){const p=document.createElement("span");return p.style.cursor="pointer",p.style.marginLeft="16px",p.style.fontSize="24px",p.innerHTML=" &times;",p.onclick=()=>{Ws=!0,o()},p}function m(p,E){p.setAttribute("id",E),p.innerText="Learn more",p.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",p.setAttribute("target","__blank"),p.style.paddingLeft="5px",p.style.textDecoration="underline"}function f(){const p=Ul(i),E=n("text"),C=document.getElementById(E)||document.createElement("span"),T=n("learnmore"),b=document.getElementById(T)||document.createElement("a"),V=n("preprendIcon"),Q=document.getElementById(V)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(p.created){const U=p.element;a(U),m(b,T);const B=l();c(Q,V),U.append(Q,C,b,B),document.body.appendChild(U)}r?(C.innerText="Preview backend disconnected.",Q.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
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
</defs>`,C.innerText="Preview backend running in this workspace."),C.setAttribute("id",E)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",f):f()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bl(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function wo(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Bl())}function $l(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Vl(){return ao.NODE_ADMIN===!0}function Mn(){try{return typeof indexedDB=="object"}catch{return!1}}function vo(){return new Promise((t,e)=>{try{let n=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(i),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var r;e(((r=s.error)==null?void 0:r.message)||"")}}catch(n){e(n)}})}function Wl(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hl="FirebaseError";class Be extends Error{constructor(e,n,i){super(n),this.code=e,this.customData=i,this.name=Hl,Object.setPrototypeOf(this,Be.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,jt.prototype.create)}}class jt{constructor(e,n,i){this.service=e,this.serviceName=n,this.errors=i}create(e,...n){const i=n[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?jl(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new Be(s,a,i)}}function jl(t,e){return t.replace(ql,(n,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const ql=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dt(t){return JSON.parse(t)}function H(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eo=function(t){let e={},n={},i={},s="";try{const r=t.split(".");e=Dt(Ei(r[0])||""),n=Dt(Ei(r[1])||""),s=r[2],i=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:i,signature:s}},zl=function(t){const e=Eo(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},Gl=function(t){const e=Eo(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pe(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function Qe(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function Hs(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function hn(t,e,n){const i={};for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(i[s]=e.call(n,t[s],s,t));return i}function un(t,e){if(t===e)return!0;const n=Object.keys(t),i=Object.keys(e);for(const s of n){if(!i.includes(s))return!1;const r=t[s],o=e[s];if(js(r)&&js(o)){if(!un(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!n.includes(s))return!1;return!0}function js(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kl(t){const e=[];for(const[n,i]of Object.entries(t))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yl{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const i=this.W_;if(typeof e=="string")for(let f=0;f<16;f++)i[f]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let f=0;f<16;f++)i[f]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let f=16;f<80;f++){const p=i[f-3]^i[f-8]^i[f-14]^i[f-16];i[f]=(p<<1|p>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],l,m;for(let f=0;f<80;f++){f<40?f<20?(l=a^r&(o^a),m=1518500249):(l=r^o^a,m=1859775393):f<60?(l=r&o|a&(r|o),m=2400959708):(l=r^o^a,m=3395469782);const p=(s<<5|s>>>27)+l+c+m+i[f]&4294967295;c=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=p}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const i=n-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<n;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<n;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<n;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=n&255,n/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function Ln(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ql=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,v(i<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):s<65536?(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Fn=function(t){let e=0;for(let n=0;n<t.length;n++){const i=t.charCodeAt(n);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,n++):e+=3}return e};/**
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
 */const Jl=1e3,Xl=2,Zl=4*60*60*1e3,ec=.5;function tc(t,e=Jl,n=Xl){const i=e*Math.pow(n,t),s=Math.round(ec*i*(Math.random()-.5)*2);return Math.min(Zl,i+s)}/**
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
 */function ee(t){return t&&t._delegate?t._delegate:t}class ie{constructor(e,n,i){this.name=e,this.instanceFactory=n,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const We="[DEFAULT]";/**
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
 */class nc{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const i=new me;if(this.instancesDeferred.set(n,i),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(e==null?void 0:e.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(sc(e))try{this.getOrInitializeService({instanceIdentifier:We})}catch{}for(const[n,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=We){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=We){return this.instances.has(e)}getOptions(e=We){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:n});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,n){const i=this.normalizeInstanceIdentifier(n),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const i=this.onInitCallbacks.get(n);if(i)for(const s of i)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:ic(e),options:n}),this.instances.set(e,i),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=We){return this.component?this.component.multipleInstances?e:We:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function ic(t){return t===We?void 0:t}function sc(t){return t.instantiationMode==="EAGER"}/**
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
 */class rc{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new nc(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var D;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(D||(D={}));const oc={debug:D.DEBUG,verbose:D.VERBOSE,info:D.INFO,warn:D.WARN,error:D.ERROR,silent:D.SILENT},ac=D.INFO,lc={[D.DEBUG]:"log",[D.VERBOSE]:"log",[D.INFO]:"info",[D.WARN]:"warn",[D.ERROR]:"error"},cc=(t,e,...n)=>{if(e<t.logLevel)return;const i=new Date().toISOString(),s=lc[e];if(s)console[s](`[${i}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Un{constructor(e){this.name=e,this._logLevel=ac,this._logHandler=cc,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in D))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?oc[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,D.DEBUG,...e),this._logHandler(this,D.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,D.VERBOSE,...e),this._logHandler(this,D.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,D.INFO,...e),this._logHandler(this,D.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,D.WARN,...e),this._logHandler(this,D.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,D.ERROR,...e),this._logHandler(this,D.ERROR,...e)}}/**
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
 */class hc{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(uc(n)){const i=n.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(n=>n).join(" ")}}function uc(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Ci="@firebase/app",qs="0.14.1";/**
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
 */const Ae=new Un("@firebase/app"),dc="@firebase/app-compat",fc="@firebase/analytics-compat",pc="@firebase/analytics",_c="@firebase/app-check-compat",gc="@firebase/app-check",mc="@firebase/auth",yc="@firebase/auth-compat",wc="@firebase/database",vc="@firebase/data-connect",Ec="@firebase/database-compat",Cc="@firebase/functions",Tc="@firebase/functions-compat",bc="@firebase/installations",Ic="@firebase/installations-compat",Sc="@firebase/messaging",Ac="@firebase/messaging-compat",kc="@firebase/performance",Nc="@firebase/performance-compat",Rc="@firebase/remote-config",Pc="@firebase/remote-config-compat",Dc="@firebase/storage",Oc="@firebase/storage-compat",xc="@firebase/firestore",Mc="@firebase/ai",Lc="@firebase/firestore-compat",Fc="firebase",Uc="12.1.0";/**
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
 */const Ti="[DEFAULT]",Bc={[Ci]:"fire-core",[dc]:"fire-core-compat",[pc]:"fire-analytics",[fc]:"fire-analytics-compat",[gc]:"fire-app-check",[_c]:"fire-app-check-compat",[mc]:"fire-auth",[yc]:"fire-auth-compat",[wc]:"fire-rtdb",[vc]:"fire-data-connect",[Ec]:"fire-rtdb-compat",[Cc]:"fire-fn",[Tc]:"fire-fn-compat",[bc]:"fire-iid",[Ic]:"fire-iid-compat",[Sc]:"fire-fcm",[Ac]:"fire-fcm-compat",[kc]:"fire-perf",[Nc]:"fire-perf-compat",[Rc]:"fire-rc",[Pc]:"fire-rc-compat",[Dc]:"fire-gcs",[Oc]:"fire-gcs-compat",[xc]:"fire-fst",[Lc]:"fire-fst-compat",[Mc]:"fire-vertex","fire-js":"fire-js",[Fc]:"fire-js-all"};/**
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
 */const dn=new Map,$c=new Map,bi=new Map;function zs(t,e){try{t.container.addComponent(e)}catch(n){Ae.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function le(t){const e=t.name;if(bi.has(e))return Ae.debug(`There were multiple attempts to register component ${e}.`),!1;bi.set(e,t);for(const n of dn.values())zs(n,t);for(const n of $c.values())zs(n,t);return!0}function st(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Vi(t){return t==null?!1:t.settings!==void 0}/**
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
 */const Vc={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Pe=new jt("app","Firebase",Vc);/**
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
 */class Wc{constructor(e,n,i){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new ie("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Pe.create("app-deleted",{appName:this._name})}}/**
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
 */const Wi=Uc;function Hc(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const i={name:Ti,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw Pe.create("bad-app-name",{appName:String(s)});if(n||(n=_o()),!n)throw Pe.create("no-options");const r=dn.get(s);if(r){if(un(n,r.options)&&un(i,r.config))return r;throw Pe.create("duplicate-app",{appName:s})}const o=new rc(s);for(const c of bi.values())o.addComponent(c);const a=new Wc(n,i,o);return dn.set(s,a),a}function Bn(t=Ti){const e=dn.get(t);if(!e&&t===Ti&&_o())return Hc();if(!e)throw Pe.create("no-app",{appName:t});return e}function X(t,e,n){let i=Bc[t]??t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${i}" with version "${e}":`];s&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ae.warn(o.join(" "));return}le(new ie(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const jc="firebase-heartbeat-database",qc=1,Ot="firebase-heartbeat-store";let si=null;function Co(){return si||(si=Dn(jc,qc,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Ot)}catch(n){console.warn(n)}}}}).catch(t=>{throw Pe.create("idb-open",{originalErrorMessage:t.message})})),si}async function zc(t){try{const n=(await Co()).transaction(Ot),i=await n.objectStore(Ot).get(To(t));return await n.done,i}catch(e){if(e instanceof Be)Ae.warn(e.message);else{const n=Pe.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Ae.warn(n.message)}}}async function Gs(t,e){try{const i=(await Co()).transaction(Ot,"readwrite");await i.objectStore(Ot).put(e,To(t)),await i.done}catch(n){if(n instanceof Be)Ae.warn(n.message);else{const i=Pe.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Ae.warn(i.message)}}}function To(t){return`${t.name}!${t.options.appId}`}/**
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
 */const Gc=1024,Kc=30;class Yc{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Jc(n),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Ks();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:s}),this._heartbeatsCache.heartbeats.length>Kc){const o=Xc(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(i){Ae.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Ks(),{heartbeatsToSend:i,unsentEntries:s}=Qc(this._heartbeatsCache.heartbeats),r=cn(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(n){return Ae.warn(n),""}}}function Ks(){return new Date().toISOString().substring(0,10)}function Qc(t,e=Gc){const n=[];let i=t.slice();for(const s of t){const r=n.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),Ys(n)>e){r.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Ys(n)>e){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}class Jc{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Mn()?vo().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await zc(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Gs(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Gs(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Ys(t){return cn(JSON.stringify({version:2,heartbeats:t})).length}function Xc(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let i=1;i<t.length;i++)t[i].date<n&&(n=t[i].date,e=i);return e}/**
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
 */function Zc(t){le(new ie("platform-logger",e=>new hc(e),"PRIVATE")),le(new ie("heartbeat",e=>new Yc(e),"PRIVATE")),X(Ci,qs,t),X(Ci,qs,"esm2020"),X("fire-js","")}Zc("");var eh="firebase",th="12.1.0";/**
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
 */X(eh,th,"app");var Qs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var bo;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(y,h){function d(){}d.prototype=h.prototype,y.D=h.prototype,y.prototype=new d,y.prototype.constructor=y,y.C=function(_,g,w){for(var u=Array(arguments.length-2),Ve=2;Ve<arguments.length;Ve++)u[Ve-2]=arguments[Ve];return h.prototype[g].apply(_,u)}}function n(){this.blockSize=-1}function i(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(i,n),i.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(y,h,d){d||(d=0);var _=Array(16);if(typeof h=="string")for(var g=0;16>g;++g)_[g]=h.charCodeAt(d++)|h.charCodeAt(d++)<<8|h.charCodeAt(d++)<<16|h.charCodeAt(d++)<<24;else for(g=0;16>g;++g)_[g]=h[d++]|h[d++]<<8|h[d++]<<16|h[d++]<<24;h=y.g[0],d=y.g[1],g=y.g[2];var w=y.g[3],u=h+(w^d&(g^w))+_[0]+3614090360&4294967295;h=d+(u<<7&4294967295|u>>>25),u=w+(g^h&(d^g))+_[1]+3905402710&4294967295,w=h+(u<<12&4294967295|u>>>20),u=g+(d^w&(h^d))+_[2]+606105819&4294967295,g=w+(u<<17&4294967295|u>>>15),u=d+(h^g&(w^h))+_[3]+3250441966&4294967295,d=g+(u<<22&4294967295|u>>>10),u=h+(w^d&(g^w))+_[4]+4118548399&4294967295,h=d+(u<<7&4294967295|u>>>25),u=w+(g^h&(d^g))+_[5]+1200080426&4294967295,w=h+(u<<12&4294967295|u>>>20),u=g+(d^w&(h^d))+_[6]+2821735955&4294967295,g=w+(u<<17&4294967295|u>>>15),u=d+(h^g&(w^h))+_[7]+4249261313&4294967295,d=g+(u<<22&4294967295|u>>>10),u=h+(w^d&(g^w))+_[8]+1770035416&4294967295,h=d+(u<<7&4294967295|u>>>25),u=w+(g^h&(d^g))+_[9]+2336552879&4294967295,w=h+(u<<12&4294967295|u>>>20),u=g+(d^w&(h^d))+_[10]+4294925233&4294967295,g=w+(u<<17&4294967295|u>>>15),u=d+(h^g&(w^h))+_[11]+2304563134&4294967295,d=g+(u<<22&4294967295|u>>>10),u=h+(w^d&(g^w))+_[12]+1804603682&4294967295,h=d+(u<<7&4294967295|u>>>25),u=w+(g^h&(d^g))+_[13]+4254626195&4294967295,w=h+(u<<12&4294967295|u>>>20),u=g+(d^w&(h^d))+_[14]+2792965006&4294967295,g=w+(u<<17&4294967295|u>>>15),u=d+(h^g&(w^h))+_[15]+1236535329&4294967295,d=g+(u<<22&4294967295|u>>>10),u=h+(g^w&(d^g))+_[1]+4129170786&4294967295,h=d+(u<<5&4294967295|u>>>27),u=w+(d^g&(h^d))+_[6]+3225465664&4294967295,w=h+(u<<9&4294967295|u>>>23),u=g+(h^d&(w^h))+_[11]+643717713&4294967295,g=w+(u<<14&4294967295|u>>>18),u=d+(w^h&(g^w))+_[0]+3921069994&4294967295,d=g+(u<<20&4294967295|u>>>12),u=h+(g^w&(d^g))+_[5]+3593408605&4294967295,h=d+(u<<5&4294967295|u>>>27),u=w+(d^g&(h^d))+_[10]+38016083&4294967295,w=h+(u<<9&4294967295|u>>>23),u=g+(h^d&(w^h))+_[15]+3634488961&4294967295,g=w+(u<<14&4294967295|u>>>18),u=d+(w^h&(g^w))+_[4]+3889429448&4294967295,d=g+(u<<20&4294967295|u>>>12),u=h+(g^w&(d^g))+_[9]+568446438&4294967295,h=d+(u<<5&4294967295|u>>>27),u=w+(d^g&(h^d))+_[14]+3275163606&4294967295,w=h+(u<<9&4294967295|u>>>23),u=g+(h^d&(w^h))+_[3]+4107603335&4294967295,g=w+(u<<14&4294967295|u>>>18),u=d+(w^h&(g^w))+_[8]+1163531501&4294967295,d=g+(u<<20&4294967295|u>>>12),u=h+(g^w&(d^g))+_[13]+2850285829&4294967295,h=d+(u<<5&4294967295|u>>>27),u=w+(d^g&(h^d))+_[2]+4243563512&4294967295,w=h+(u<<9&4294967295|u>>>23),u=g+(h^d&(w^h))+_[7]+1735328473&4294967295,g=w+(u<<14&4294967295|u>>>18),u=d+(w^h&(g^w))+_[12]+2368359562&4294967295,d=g+(u<<20&4294967295|u>>>12),u=h+(d^g^w)+_[5]+4294588738&4294967295,h=d+(u<<4&4294967295|u>>>28),u=w+(h^d^g)+_[8]+2272392833&4294967295,w=h+(u<<11&4294967295|u>>>21),u=g+(w^h^d)+_[11]+1839030562&4294967295,g=w+(u<<16&4294967295|u>>>16),u=d+(g^w^h)+_[14]+4259657740&4294967295,d=g+(u<<23&4294967295|u>>>9),u=h+(d^g^w)+_[1]+2763975236&4294967295,h=d+(u<<4&4294967295|u>>>28),u=w+(h^d^g)+_[4]+1272893353&4294967295,w=h+(u<<11&4294967295|u>>>21),u=g+(w^h^d)+_[7]+4139469664&4294967295,g=w+(u<<16&4294967295|u>>>16),u=d+(g^w^h)+_[10]+3200236656&4294967295,d=g+(u<<23&4294967295|u>>>9),u=h+(d^g^w)+_[13]+681279174&4294967295,h=d+(u<<4&4294967295|u>>>28),u=w+(h^d^g)+_[0]+3936430074&4294967295,w=h+(u<<11&4294967295|u>>>21),u=g+(w^h^d)+_[3]+3572445317&4294967295,g=w+(u<<16&4294967295|u>>>16),u=d+(g^w^h)+_[6]+76029189&4294967295,d=g+(u<<23&4294967295|u>>>9),u=h+(d^g^w)+_[9]+3654602809&4294967295,h=d+(u<<4&4294967295|u>>>28),u=w+(h^d^g)+_[12]+3873151461&4294967295,w=h+(u<<11&4294967295|u>>>21),u=g+(w^h^d)+_[15]+530742520&4294967295,g=w+(u<<16&4294967295|u>>>16),u=d+(g^w^h)+_[2]+3299628645&4294967295,d=g+(u<<23&4294967295|u>>>9),u=h+(g^(d|~w))+_[0]+4096336452&4294967295,h=d+(u<<6&4294967295|u>>>26),u=w+(d^(h|~g))+_[7]+1126891415&4294967295,w=h+(u<<10&4294967295|u>>>22),u=g+(h^(w|~d))+_[14]+2878612391&4294967295,g=w+(u<<15&4294967295|u>>>17),u=d+(w^(g|~h))+_[5]+4237533241&4294967295,d=g+(u<<21&4294967295|u>>>11),u=h+(g^(d|~w))+_[12]+1700485571&4294967295,h=d+(u<<6&4294967295|u>>>26),u=w+(d^(h|~g))+_[3]+2399980690&4294967295,w=h+(u<<10&4294967295|u>>>22),u=g+(h^(w|~d))+_[10]+4293915773&4294967295,g=w+(u<<15&4294967295|u>>>17),u=d+(w^(g|~h))+_[1]+2240044497&4294967295,d=g+(u<<21&4294967295|u>>>11),u=h+(g^(d|~w))+_[8]+1873313359&4294967295,h=d+(u<<6&4294967295|u>>>26),u=w+(d^(h|~g))+_[15]+4264355552&4294967295,w=h+(u<<10&4294967295|u>>>22),u=g+(h^(w|~d))+_[6]+2734768916&4294967295,g=w+(u<<15&4294967295|u>>>17),u=d+(w^(g|~h))+_[13]+1309151649&4294967295,d=g+(u<<21&4294967295|u>>>11),u=h+(g^(d|~w))+_[4]+4149444226&4294967295,h=d+(u<<6&4294967295|u>>>26),u=w+(d^(h|~g))+_[11]+3174756917&4294967295,w=h+(u<<10&4294967295|u>>>22),u=g+(h^(w|~d))+_[2]+718787259&4294967295,g=w+(u<<15&4294967295|u>>>17),u=d+(w^(g|~h))+_[9]+3951481745&4294967295,y.g[0]=y.g[0]+h&4294967295,y.g[1]=y.g[1]+(g+(u<<21&4294967295|u>>>11))&4294967295,y.g[2]=y.g[2]+g&4294967295,y.g[3]=y.g[3]+w&4294967295}i.prototype.u=function(y,h){h===void 0&&(h=y.length);for(var d=h-this.blockSize,_=this.B,g=this.h,w=0;w<h;){if(g==0)for(;w<=d;)s(this,y,w),w+=this.blockSize;if(typeof y=="string"){for(;w<h;)if(_[g++]=y.charCodeAt(w++),g==this.blockSize){s(this,_),g=0;break}}else for(;w<h;)if(_[g++]=y[w++],g==this.blockSize){s(this,_),g=0;break}}this.h=g,this.o+=h},i.prototype.v=function(){var y=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);y[0]=128;for(var h=1;h<y.length-8;++h)y[h]=0;var d=8*this.o;for(h=y.length-8;h<y.length;++h)y[h]=d&255,d/=256;for(this.u(y),y=Array(16),h=d=0;4>h;++h)for(var _=0;32>_;_+=8)y[d++]=this.g[h]>>>_&255;return y};function r(y,h){var d=a;return Object.prototype.hasOwnProperty.call(d,y)?d[y]:d[y]=h(y)}function o(y,h){this.h=h;for(var d=[],_=!0,g=y.length-1;0<=g;g--){var w=y[g]|0;_&&w==h||(d[g]=w,_=!1)}this.g=d}var a={};function c(y){return-128<=y&&128>y?r(y,function(h){return new o([h|0],0>h?-1:0)}):new o([y|0],0>y?-1:0)}function l(y){if(isNaN(y)||!isFinite(y))return f;if(0>y)return b(l(-y));for(var h=[],d=1,_=0;y>=d;_++)h[_]=y/d|0,d*=4294967296;return new o(h,0)}function m(y,h){if(y.length==0)throw Error("number format error: empty string");if(h=h||10,2>h||36<h)throw Error("radix out of range: "+h);if(y.charAt(0)=="-")return b(m(y.substring(1),h));if(0<=y.indexOf("-"))throw Error('number format error: interior "-" character');for(var d=l(Math.pow(h,8)),_=f,g=0;g<y.length;g+=8){var w=Math.min(8,y.length-g),u=parseInt(y.substring(g,g+w),h);8>w?(w=l(Math.pow(h,w)),_=_.j(w).add(l(u))):(_=_.j(d),_=_.add(l(u)))}return _}var f=c(0),p=c(1),E=c(16777216);t=o.prototype,t.m=function(){if(T(this))return-b(this).m();for(var y=0,h=1,d=0;d<this.g.length;d++){var _=this.i(d);y+=(0<=_?_:4294967296+_)*h,h*=4294967296}return y},t.toString=function(y){if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(C(this))return"0";if(T(this))return"-"+b(this).toString(y);for(var h=l(Math.pow(y,6)),d=this,_="";;){var g=B(d,h).g;d=V(d,g.j(h));var w=((0<d.g.length?d.g[0]:d.h)>>>0).toString(y);if(d=g,C(d))return w+_;for(;6>w.length;)w="0"+w;_=w+_}},t.i=function(y){return 0>y?0:y<this.g.length?this.g[y]:this.h};function C(y){if(y.h!=0)return!1;for(var h=0;h<y.g.length;h++)if(y.g[h]!=0)return!1;return!0}function T(y){return y.h==-1}t.l=function(y){return y=V(this,y),T(y)?-1:C(y)?0:1};function b(y){for(var h=y.g.length,d=[],_=0;_<h;_++)d[_]=~y.g[_];return new o(d,~y.h).add(p)}t.abs=function(){return T(this)?b(this):this},t.add=function(y){for(var h=Math.max(this.g.length,y.g.length),d=[],_=0,g=0;g<=h;g++){var w=_+(this.i(g)&65535)+(y.i(g)&65535),u=(w>>>16)+(this.i(g)>>>16)+(y.i(g)>>>16);_=u>>>16,w&=65535,u&=65535,d[g]=u<<16|w}return new o(d,d[d.length-1]&-2147483648?-1:0)};function V(y,h){return y.add(b(h))}t.j=function(y){if(C(this)||C(y))return f;if(T(this))return T(y)?b(this).j(b(y)):b(b(this).j(y));if(T(y))return b(this.j(b(y)));if(0>this.l(E)&&0>y.l(E))return l(this.m()*y.m());for(var h=this.g.length+y.g.length,d=[],_=0;_<2*h;_++)d[_]=0;for(_=0;_<this.g.length;_++)for(var g=0;g<y.g.length;g++){var w=this.i(_)>>>16,u=this.i(_)&65535,Ve=y.i(g)>>>16,$s=y.i(g)&65535;d[2*_+2*g]+=u*$s,Q(d,2*_+2*g),d[2*_+2*g+1]+=w*$s,Q(d,2*_+2*g+1),d[2*_+2*g+1]+=u*Ve,Q(d,2*_+2*g+1),d[2*_+2*g+2]+=w*Ve,Q(d,2*_+2*g+2)}for(_=0;_<h;_++)d[_]=d[2*_+1]<<16|d[2*_];for(_=h;_<2*h;_++)d[_]=0;return new o(d,0)};function Q(y,h){for(;(y[h]&65535)!=y[h];)y[h+1]+=y[h]>>>16,y[h]&=65535,h++}function U(y,h){this.g=y,this.h=h}function B(y,h){if(C(h))throw Error("division by zero");if(C(y))return new U(f,f);if(T(y))return h=B(b(y),h),new U(b(h.g),b(h.h));if(T(h))return h=B(y,b(h)),new U(b(h.g),h.h);if(30<y.g.length){if(T(y)||T(h))throw Error("slowDivide_ only works with positive integers.");for(var d=p,_=h;0>=_.l(y);)d=$e(d),_=$e(_);var g=_e(d,1),w=_e(_,1);for(_=_e(_,2),d=_e(d,2);!C(_);){var u=w.add(_);0>=u.l(y)&&(g=g.add(d),w=u),_=_e(_,1),d=_e(d,1)}return h=V(y,g.j(h)),new U(g,h)}for(g=f;0<=y.l(h);){for(d=Math.max(1,Math.floor(y.m()/h.m())),_=Math.ceil(Math.log(d)/Math.LN2),_=48>=_?1:Math.pow(2,_-48),w=l(d),u=w.j(h);T(u)||0<u.l(y);)d-=_,w=l(d),u=w.j(h);C(w)&&(w=p),g=g.add(w),y=V(y,u)}return new U(g,y)}t.A=function(y){return B(this,y).h},t.and=function(y){for(var h=Math.max(this.g.length,y.g.length),d=[],_=0;_<h;_++)d[_]=this.i(_)&y.i(_);return new o(d,this.h&y.h)},t.or=function(y){for(var h=Math.max(this.g.length,y.g.length),d=[],_=0;_<h;_++)d[_]=this.i(_)|y.i(_);return new o(d,this.h|y.h)},t.xor=function(y){for(var h=Math.max(this.g.length,y.g.length),d=[],_=0;_<h;_++)d[_]=this.i(_)^y.i(_);return new o(d,this.h^y.h)};function $e(y){for(var h=y.g.length+1,d=[],_=0;_<h;_++)d[_]=y.i(_)<<1|y.i(_-1)>>>31;return new o(d,y.h)}function _e(y,h){var d=h>>5;h%=32;for(var _=y.g.length-d,g=[],w=0;w<_;w++)g[w]=0<h?y.i(w+d)>>>h|y.i(w+d+1)<<32-h:y.i(w+d);return new o(g,y.h)}i.prototype.digest=i.prototype.v,i.prototype.reset=i.prototype.s,i.prototype.update=i.prototype.u,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=l,o.fromString=m,bo=o}).apply(typeof Qs<"u"?Qs:typeof self<"u"?self:typeof window<"u"?window:{});const Js="4.9.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}re.UNAUTHENTICATED=new re(null),re.GOOGLE_CREDENTIALS=new re("google-credentials-uid"),re.FIRST_PARTY=new re("first-party-uid"),re.MOCK_USER=new re("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $n="12.0.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fn=new Un("@firebase/firestore");function nh(t,...e){if(fn.logLevel<=D.DEBUG){const n=e.map(Io);fn.debug(`Firestore (${$n}): ${t}`,...n)}}function ih(t,...e){if(fn.logLevel<=D.ERROR){const n=e.map(Io);fn.error(`Firestore (${$n}): ${t}`,...n)}}function Io(t){if(typeof t=="string")return t;try{/**
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
 */function Xs(t,e,n){let i="Unexpected state";typeof e=="string"?i=e:n=e,So(t,i,n)}function So(t,e,n){let i=`FIRESTORE (${$n}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(n!==void 0)try{i+=" CONTEXT: "+JSON.stringify(n)}catch{i+=" CONTEXT: "+n}throw ih(i),new Error(i)}function Ao(t,e,n,i){let s="Unexpected state";typeof n=="string"?s=n:i=n,t||So(e,s,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const W="invalid-argument",Zs="failed-precondition";class F extends Be{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sh{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class rh{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(re.UNAUTHENTICATED))}shutdown(){}}class oh{constructor(e){this.auth=null,e.onInit(n=>{this.auth=n})}getToken(){return this.auth?this.auth.getToken().then(e=>e?(Ao(typeof e.accessToken=="string",42297,{t:e}),new sh(e.accessToken,new re(this.auth.getUid()))):null):Promise.resolve(null)}invalidateToken(){}start(e,n){}shutdown(){}}class ah{constructor(e,n,i){this.i=e,this.o=n,this.u=i,this.type="FirstParty",this.user=re.FIRST_PARTY,this.l=new Map}h(){return this.u?this.u():null}get headers(){this.l.set("X-Goog-AuthUser",this.i);const e=this.h();return e&&this.l.set("Authorization",e),this.o&&this.l.set("X-Goog-Iam-Authorization-Token",this.o),this.l}}class lh{constructor(e,n,i){this.i=e,this.o=n,this.u=i}getToken(){return Promise.resolve(new ah(this.i,this.o,this.u))}start(e,n){e.enqueueRetryable(()=>n(re.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class er{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class ch{constructor(e,n){this.m=n,this.appCheck=null,this.T=null,Vi(e)&&e.settings.appCheckToken&&(this.T=e.settings.appCheckToken),n.onInit(i=>{this.appCheck=i})}getToken(){return this.T?Promise.resolve(new er(this.T)):this.appCheck?this.appCheck.getToken().then(e=>e?(Ao(typeof e.token=="string",3470,{tokenResult:e}),new er(e.token)):null):Promise.resolve(null)}invalidateToken(){}start(e,n){}shutdown(){}}const tr="(default)";class pn{constructor(e,n){this.projectId=e,this.database=n||tr}static empty(){return new pn("","")}get isDefaultDatabase(){return this.database===tr}isEqual(e){return e instanceof pn&&e.projectId===this.projectId&&e.database===this.database}}function xe(t,e){return t<e?-1:t>e?1:0}function hh(t,e){const n=Math.min(t.length,e.length);for(let i=0;i<n;i++){const s=t.charAt(i),r=e.charAt(i);if(s!==r)return ri(s)===ri(r)?xe(s,r):ri(s)?1:-1}return xe(t.length,e.length)}const uh=55296,dh=57343;function ri(t){const e=t.charCodeAt(0);return e>=uh&&e<=dh}class Ee{constructor(e,n,i){n===void 0?n=0:n>e.length&&Xs(637,{offset:n,range:e.length}),i===void 0?i=e.length-n:i>e.length-n&&Xs(1746,{length:i,range:e.length-n}),this.segments=e,this.offset=n,this.len=i}get length(){return this.len}isEqual(e){return Ee.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof Ee?e.forEach(i=>{n.push(i)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,i=this.limit();n<i;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const i=Math.min(e.length,n.length);for(let s=0;s<i;s++){const r=Ee.compareSegments(e.get(s),n.get(s));if(r!==0)return r}return xe(e.length,n.length)}static compareSegments(e,n){const i=Ee.isNumericId(e),s=Ee.isNumericId(n);return i&&!s?-1:!i&&s?1:i&&s?Ee.extractNumericId(e).compare(Ee.extractNumericId(n)):hh(e,n)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return bo.fromString(e.substring(4,e.length-2))}}class ce extends Ee{construct(e,n,i){return new ce(e,n,i)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const i of e){if(i.indexOf("//")>=0)throw new F(W,`Invalid segment (${i}). Paths must not contain // in them.`);n.push(...i.split("/").filter(s=>s.length>0))}return new ce(n)}static emptyPath(){return new ce([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je{constructor(e){this.path=e}static fromPath(e){return new je(ce.fromString(e))}static fromName(e){return new je(ce.fromString(e).popFirst(5))}static empty(){return new je(ce.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ce.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return ce.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new je(new ce(e.slice()))}}function fh(t){return typeof t=="object"&&t!==null&&(Object.getPrototypeOf(t)===Object.prototype||Object.getPrototypeOf(t)===null)}/**
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
 */function ph(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var nr,N;/**
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
 */(N=nr||(nr={}))[N.OK=0]="OK",N[N.CANCELLED=1]="CANCELLED",N[N.UNKNOWN=2]="UNKNOWN",N[N.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",N[N.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",N[N.NOT_FOUND=5]="NOT_FOUND",N[N.ALREADY_EXISTS=6]="ALREADY_EXISTS",N[N.PERMISSION_DENIED=7]="PERMISSION_DENIED",N[N.UNAUTHENTICATED=16]="UNAUTHENTICATED",N[N.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",N[N.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",N[N.ABORTED=10]="ABORTED",N[N.OUT_OF_RANGE=11]="OUT_OF_RANGE",N[N.UNIMPLEMENTED=12]="UNIMPLEMENTED",N[N.INTERNAL=13]="INTERNAL",N[N.UNAVAILABLE=14]="UNAVAILABLE",N[N.DATA_LOSS=15]="DATA_LOSS";/**
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
 */class _h extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Je{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(s){try{return atob(s)}catch(r){throw typeof DOMException<"u"&&r instanceof DOMException?new _h("Invalid base64 string: "+r):r}}(e);return new Je(n)}static fromUint8Array(e){const n=function(s){let r="";for(let o=0;o<s.length;++o)r+=String.fromCharCode(s[o]);return r}(e);return new Je(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const i=new Uint8Array(n.length);for(let s=0;s<n.length;s++)i[s]=n.charCodeAt(s);return i}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return xe(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Je.EMPTY_BYTE_STRING=new Je("");/**
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
 */function ae(t,e){const n={typeString:t};return e&&(n.value=e),n}function qt(t,e){if(!fh(t))throw new F(W,"JSON must be an object");let n;for(const i in e)if(e[i]){const s=e[i].typeString,r="value"in e[i]?{value:e[i].value}:void 0;if(!(i in t)){n=`JSON missing required field: '${i}'`;break}const o=t[i];if(s&&typeof o!==s){n=`JSON field '${i}' must be a ${s}.`;break}if(r!==void 0&&o!==r.value){n=`Expected '${i}' field to equal '${r.value}'`;break}}if(n)throw new F(W,n);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ir=-62135596800,sr=1e6;class ge{static now(){return ge.fromMillis(Date.now())}static fromDate(e){return ge.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),i=Math.floor((e-1e3*n)*sr);return new ge(n,i)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new F(W,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new F(W,"Timestamp nanoseconds out of range: "+n);if(e<ir)throw new F(W,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new F(W,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/sr}_compareTo(e){return this.seconds===e.seconds?xe(this.nanoseconds,e.nanoseconds):xe(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ge._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(qt(e,ge._jsonSchema))return new ge(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-ir;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ge._jsonSchemaVersion="firestore/timestamp/1.0",ge._jsonSchema={type:ae("string",ge._jsonSchemaVersion),seconds:ae("number"),nanoseconds:ae("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gh{constructor(e,n=null,i=[],s=[],r=null,o="F",a=null,c=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=i,this.filters=s,this.limit=r,this.limitType=o,this.startAt=a,this.endAt=c,this.q=null,this.B=null,this.$=null,this.startAt,this.endAt}}/**
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
 */const mh="ComponentProvider",rr=new Map;/**
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
 */const yh=1048576,wh="firestore.googleapis.com",or=!0;/**
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
 */class ar{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new F(W,"Can't provide ssl option if host option is not set");this.host=wh,this.ssl=or}else this.host=e.host,this.ssl=e.ssl??or;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<yh)throw new F(W,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}(function(i,s,r,o){if(s===!0&&o===!0)throw new F(W,`${i} and ${r} cannot be used together.`)})("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=ph(e.experimentalLongPollingOptions??{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new F(W,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new F(W,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new F(W,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(i,s){return i.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class vh{constructor(e,n,i,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=i,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ar({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new F(Zs,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new F(Zs,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ar(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(i){if(!i)return new rh;switch(i.type){case"firstParty":return new lh(i.sessionIndex||"0",i.iamToken||null,i.authTokenFactory||null);case"provider":return i.client;default:throw new F(W,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const i=rr.get(n);i&&(nh(mh,"Removing Datastore"),rr.delete(n),i.terminate())}(this),Promise.resolve()}}/**
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
 */class Hi{constructor(e,n,i){this.converter=n,this._query=i,this.type="query",this.firestore=e}withConverter(e){return new Hi(this.firestore,e,this._query)}}class be{constructor(e,n,i){this.converter=n,this._key=i,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ji(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new be(this.firestore,e,this._key)}toJSON(){return{type:be._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,n,i){if(qt(n,be._jsonSchema))return new be(e,i||null,new je(ce.fromString(n.referencePath)))}}be._jsonSchemaVersion="firestore/documentReference/1.0",be._jsonSchema={type:ae("string",be._jsonSchemaVersion),referencePath:ae("string")};class ji extends Hi{constructor(e,n,i){super(e,n,function(r){return new gh(r)}(i)),this._path=i,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new be(this.firestore,null,new je(e))}withConverter(e){return new ji(this.firestore,e,this._path)}}/**
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
 */class Te{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Te(Je.fromBase64String(e))}catch(n){throw new F(W,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new Te(Je.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Te._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(qt(e,Te._jsonSchema))return Te.fromBase64String(e.bytes)}}Te._jsonSchemaVersion="firestore/bytes/1.0",Te._jsonSchema={type:ae("string",Te._jsonSchemaVersion),bytes:ae("string")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new F(W,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new F(W,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return xe(this._lat,e._lat)||xe(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Ge._jsonSchemaVersion}}static fromJSON(e){if(qt(e,Ge._jsonSchema))return new Ge(e.latitude,e.longitude)}}Ge._jsonSchemaVersion="firestore/geoPoint/1.0",Ge._jsonSchema={type:ae("string",Ge._jsonSchemaVersion),latitude:ae("number"),longitude:ae("number")};/**
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
 */class Ke{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(i,s){if(i.length!==s.length)return!1;for(let r=0;r<i.length;++r)if(i[r]!==s[r])return!1;return!0}(this._values,e._values)}toJSON(){return{type:Ke._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(qt(e,Ke._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(n=>typeof n=="number"))return new Ke(e.vectorValues);throw new F(W,"Expected 'vectorValues' field to be a number array")}}}Ke._jsonSchemaVersion="firestore/vectorValue/1.0",Ke._jsonSchema={type:ae("string",Ke._jsonSchemaVersion),vectorValues:ae("object")};(function(){(function(n){$n=n})(`${Wi}_lite`),le(new ie("firestore/lite",(e,{instanceIdentifier:n,options:i})=>{const s=e.getProvider("app").getImmediate(),r=new vh(new oh(e.getProvider("auth-internal")),new ch(s,e.getProvider("app-check-internal")),function(a,c){if(!Object.prototype.hasOwnProperty.apply(a.options,["projectId"]))throw new F(W,'"projectId" not provided in firebase.initializeApp.');return new pn(a.options.projectId,c)}(s,n),s);return i&&r._setSettings(i),r},"PUBLIC").setMultipleInstances(!0)),X("firestore-lite",Js,""),X("firestore-lite",Js,"esm2020")})();var lr={};const cr="@firebase/database",hr="1.1.0";/**
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
 */let ko="";function Eh(t){ko=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ch{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),H(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Dt(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Th{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return pe(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const No=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Ch(e)}}catch{}return new Th},qe=No("localStorage"),bh=No("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dt=new Un("@firebase/database"),Ro=function(){let t=1;return function(){return t++}}(),Po=function(t){const e=Ql(t),n=new Yl;n.update(e);const i=n.digest();return On.encodeByteArray(i)},zt=function(...t){let e="";for(let n=0;n<t.length;n++){const i=t[n];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=zt.apply(null,i):typeof i=="object"?e+=H(i):e+=i,e+=" "}return e};let At=null,ur=!0;const Ih=function(t,e){v(!0,"Can't turn on custom loggers persistently."),dt.logLevel=D.VERBOSE,At=dt.log.bind(dt)},G=function(...t){if(ur===!0&&(ur=!1,At===null&&bh.get("logging_enabled")===!0&&Ih()),At){const e=zt.apply(null,t);At(e)}},Gt=function(t){return function(...e){G(t,...e)}},Ii=function(...t){const e="FIREBASE INTERNAL ERROR: "+zt(...t);dt.error(e)},ke=function(...t){const e=`FIREBASE FATAL ERROR: ${zt(...t)}`;throw dt.error(e),new Error(e)},Z=function(...t){const e="FIREBASE WARNING: "+zt(...t);dt.warn(e)},Sh=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Z("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},qi=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},Ah=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},Xe="[MIN_NAME]",Me="[MAX_NAME]",rt=function(t,e){if(t===e)return 0;if(t===Xe||e===Me)return-1;if(e===Xe||t===Me)return 1;{const n=dr(t),i=dr(e);return n!==null?i!==null?n-i===0?t.length-e.length:n-i:-1:i!==null?1:t<e?-1:1}},kh=function(t,e){return t===e?0:t<e?-1:1},Ct=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+H(e))},zi=function(t){if(typeof t!="object"||t===null)return H(t);const e=[];for(const i in t)e.push(i);e.sort();let n="{";for(let i=0;i<e.length;i++)i!==0&&(n+=","),n+=H(e[i]),n+=":",n+=zi(t[e[i]]);return n+="}",n},Do=function(t,e){const n=t.length;if(n<=e)return[t];const i=[];for(let s=0;s<n;s+=e)s+e>n?i.push(t.substring(s,n)):i.push(t.substring(s,s+e));return i};function Y(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const Oo=function(t){v(!qi(t),"Invalid JSON number");const e=11,n=52,i=(1<<e-1)-1;let s,r,o,a,c;t===0?(r=0,o=0,s=1/t===-1/0?1:0):(s=t<0,t=Math.abs(t),t>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),i),r=a+i,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(r=0,o=Math.round(t/Math.pow(2,1-i-n))));const l=[];for(c=n;c;c-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)l.push(r%2?1:0),r=Math.floor(r/2);l.push(s?1:0),l.reverse();const m=l.join("");let f="";for(c=0;c<64;c+=8){let p=parseInt(m.substr(c,8),2).toString(16);p.length===1&&(p="0"+p),f=f+p}return f.toLowerCase()},Nh=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Rh=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Ph(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const i=new Error(t+" at "+e._path.toString()+": "+n);return i.code=t.toUpperCase(),i}const Dh=new RegExp("^-?(0*)\\d{1,10}$"),Oh=-2147483648,xh=2147483647,dr=function(t){if(Dh.test(t)){const e=Number(t);if(e>=Oh&&e<=xh)return e}return null},wt=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw Z("Exception was thrown by user callback.",n),e},Math.floor(0))}},Mh=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},kt=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class Lh{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,Vi(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n==null?void 0:n.getImmediate({optional:!0}),this.appCheck||n==null||n.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){var n;(n=this.appCheckProvider)==null||n.get().then(i=>i.addTokenListener(e))}notifyForInvalidToken(){Z(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fh{constructor(e,n,i){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(G("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Z(e)}}class ln{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}ln.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gi="5",xo="v",Mo="s",Lo="r",Fo="f",Uo=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Bo="ls",$o="p",Si="ac",Vo="websocket",Wo="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ho{constructor(e,n,i,s,r=!1,o="",a=!1,c=!1,l=null){this.secure=n,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this.emulatorOptions=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=qe.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&qe.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function Uh(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function jo(t,e,n){v(typeof e=="string","typeof type must == string"),v(typeof n=="object","typeof params must == object");let i;if(e===Vo)i=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===Wo)i=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Uh(t)&&(n.ns=t.namespace);const s=[];return Y(n,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bh{constructor(){this.counters_={}}incrementCounter(e,n=1){pe(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return Pl(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oi={},ai={};function Ki(t){const e=t.toString();return oi[e]||(oi[e]=new Bh),oi[e]}function $h(t,e){const n=t.toString();return ai[n]||(ai[n]=e()),ai[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vh{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&wt(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fr="start",Wh="close",Hh="pLPCommand",jh="pRTLPCB",qo="id",zo="pw",Go="ser",qh="cb",zh="seg",Gh="ts",Kh="d",Yh="dframe",Ko=1870,Yo=30,Qh=Ko-Yo,Jh=25e3,Xh=3e4;class ht{constructor(e,n,i,s,r,o,a){this.connId=e,this.repoInfo=n,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Gt(e),this.stats_=Ki(n),this.urlFn=c=>(this.appCheckToken&&(c[Si]=this.appCheckToken),jo(n,Wo,c))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new Vh(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Xh)),Ah(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Yi((...r)=>{const[o,a,c,l,m]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===fr)this.id=a,this.password=c;else if(o===Wh)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[fr]="t",i[Go]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[qh]=this.scriptTagHolder.uniqueCallbackIdentifier),i[xo]=Gi,this.transportSessionId&&(i[Mo]=this.transportSessionId),this.lastSessionId&&(i[Bo]=this.lastSessionId),this.applicationId&&(i[$o]=this.applicationId),this.appCheckToken&&(i[Si]=this.appCheckToken),typeof location<"u"&&location.hostname&&Uo.test(location.hostname)&&(i[Lo]=Fo);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){ht.forceAllow_=!0}static forceDisallow(){ht.forceDisallow_=!0}static isAvailable(){return ht.forceAllow_?!0:!ht.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Nh()&&!Rh()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=H(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=co(n),s=Do(i,Qh);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const i={};i[Yh]="t",i[qo]=e,i[zo]=n,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=H(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Yi{constructor(e,n,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Ro(),window[Hh+this.uniqueCallbackIdentifier]=e,window[jh+this.uniqueCallbackIdentifier]=n,this.myIFrame=Yi.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){G("frame writing exception"),a.stack&&G(a.stack),G(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||G("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[qo]=this.myID,e[zo]=this.myPW,e[Go]=this.currentSerial;let n=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Yo+i.length<=Ko;){const o=this.pendingSegs.shift();i=i+"&"+zh+s+"="+o.seg+"&"+Gh+s+"="+o.ts+"&"+Kh+s+"="+o.d,s++}return n=n+i,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,i){this.pendingSegs.push({seg:e,ts:n,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const i=()=>{this.outstandingRequests.delete(n),this.newRequest_()},s=setTimeout(i,Math.floor(Jh)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),n())},i.onerror=()=>{G("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zh=16384,eu=45e3;let _n=null;typeof MozWebSocket<"u"?_n=MozWebSocket:typeof WebSocket<"u"&&(_n=WebSocket);class he{constructor(e,n,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Gt(this.connId),this.stats_=Ki(n),this.connURL=he.connectionURL_(n,o,a,s,i),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,i,s,r){const o={};return o[xo]=Gi,typeof location<"u"&&location.hostname&&Uo.test(location.hostname)&&(o[Lo]=Fo),n&&(o[Mo]=n),i&&(o[Bo]=i),s&&(o[Si]=s),r&&(o[$o]=r),jo(e,Vo,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,qe.set("previous_websocket_failure",!0);try{let i;Vl(),this.mySock=new _n(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){he.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(n);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&_n!==null&&!he.forceDisallow_}static previouslyFailed(){return qe.isInMemoryStorage||qe.get("previous_websocket_failure")===!0}markConnectionHealthy(){qe.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const i=Dt(n);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(v(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const i=this.extractFrameCount_(n);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const n=H(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=Do(n,Zh);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(eu))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}he.responsesRequiredToBeHealthy=2;he.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt{static get ALL_TRANSPORTS(){return[ht,he]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=he&&he.isAvailable();let i=n&&!he.previouslyFailed();if(e.webSocketOnly&&(n||Z("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[he];else{const s=this.transports_=[];for(const r of xt.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);xt.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}xt.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tu=6e4,nu=5e3,iu=10*1024,su=100*1024,li="t",pr="d",ru="s",_r="r",ou="e",gr="o",mr="a",yr="n",wr="p",au="h";class lu{constructor(e,n,i,s,r,o,a,c,l,m){this.id=e,this.repoInfo_=n,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=l,this.lastSessionId=m,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Gt("c:"+this.id+":"),this.transportManager_=new xt(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=kt(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>su?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>iu?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(li in e){const n=e[li];n===mr?this.upgradeIfSecondaryHealthy_():n===_r?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===gr&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=Ct("t",e),i=Ct("d",e);if(n==="c")this.onSecondaryControl_(i);else if(n==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:wr,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:mr,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:yr,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=Ct("t",e),i=Ct("d",e);n==="c"?this.onControl_(i):n==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=Ct(li,e);if(pr in e){const i=e[pr];if(n===au){const s={...i};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(n===yr){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===ru?this.onConnectionShutdown_(i):n===_r?this.onReset_(i):n===ou?Ii("Server Error: "+i):n===gr?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Ii("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),Gi!==i&&Z("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,i),kt(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(tu))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):kt(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(nu))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:wr,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(qe.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qo{put(e,n,i,s){}merge(e,n,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,i){}onDisconnectMerge(e,n,i){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jo{constructor(e){this.allowedEvents_=e,this.listeners_={},v(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,n)}}on(e,n,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:i});const s=this.getInitialEvent(e);s&&n.apply(i,s)}off(e,n,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===n&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){v(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gn extends Jo{static getInstance(){return new gn}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!wo()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return v(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vr=32,Er=768;class P{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function R(){return new P("")}function S(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function Le(t){return t.pieces_.length-t.pieceNum_}function x(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new P(t.pieces_,e)}function Qi(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function cu(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function Mt(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function Xo(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new P(e,0)}function L(t,e){const n=[];for(let i=t.pieceNum_;i<t.pieces_.length;i++)n.push(t.pieces_[i]);if(e instanceof P)for(let i=e.pieceNum_;i<e.pieces_.length;i++)n.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&n.push(i[s])}return new P(n,0)}function A(t){return t.pieceNum_>=t.pieces_.length}function J(t,e){const n=S(t),i=S(e);if(n===null)return e;if(n===i)return J(x(t),x(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function hu(t,e){const n=Mt(t,0),i=Mt(e,0);for(let s=0;s<n.length&&s<i.length;s++){const r=rt(n[s],i[s]);if(r!==0)return r}return n.length===i.length?0:n.length<i.length?-1:1}function Ji(t,e){if(Le(t)!==Le(e))return!1;for(let n=t.pieceNum_,i=e.pieceNum_;n<=t.pieces_.length;n++,i++)if(t.pieces_[n]!==e.pieces_[i])return!1;return!0}function oe(t,e){let n=t.pieceNum_,i=e.pieceNum_;if(Le(t)>Le(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[i])return!1;++n,++i}return!0}class uu{constructor(e,n){this.errorPrefix_=n,this.parts_=Mt(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=Fn(this.parts_[i]);Zo(this)}}function du(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Fn(e),Zo(t)}function fu(t){const e=t.parts_.pop();t.byteLength_-=Fn(e),t.parts_.length>0&&(t.byteLength_-=1)}function Zo(t){if(t.byteLength_>Er)throw new Error(t.errorPrefix_+"has a key path longer than "+Er+" bytes ("+t.byteLength_+").");if(t.parts_.length>vr)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+vr+") or object contains a cycle "+He(t))}function He(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xi extends Jo{static getInstance(){return new Xi}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return v(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tt=1e3,pu=60*5*1e3,Cr=30*1e3,_u=1.3,gu=3e4,mu="server_kill",Tr=3;class Se extends Qo{constructor(e,n,i,s,r,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=Se.nextPersistentConnectionId_++,this.log_=Gt("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Tt,this.maxReconnectDelay_=pu,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Xi.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&gn.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,i){const s=++this.requestNumber_,r={r:s,a:e,b:n};this.log_(H(r)),v(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const n=new me,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),n.promise}listen(e,n,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),v(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),v(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:n,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(i)})}sendListen_(e){const n=e.query,i=n._path.toString(),s=n._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=n._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const c=a.d,l=a.s;Se.warnOnListenWarnings_(c,n),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),l!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(l,c))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&pe(e,"w")){const i=Qe(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+n._queryParams.getIndex().toString()+'"',r=n._path.toString();Z(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Gl(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Cr)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=zl(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(n,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,i=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,i)})}unlisten(e,n){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),v(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,n)}sendUnlisten_(e,n,i,s){this.log_("Unlisten on "+e+" for "+n);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:i})}onDisconnectMerge(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:i})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,i,s){const r={p:n,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,n,i,s){this.putInternal("p",e,n,i,s)}merge(e,n,i,s){this.putInternal("m",e,n,i,s)}putInternal(e,n,i,s,r){this.initConnection_();const o={p:n,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,i,r=>{this.log_(n+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+H(e));const n=e.r,i=this.requestCBHash_[n];i&&(delete this.requestCBHash_[n],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):Ii("Unrecognized action received from server: "+H(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){v(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Tt,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Tt,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>gu&&(this.reconnectDelay_=Tt),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*_u)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+Se.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,i())},l=function(f){v(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(f)};this.realtime_={close:c,sendRequest:l};const m=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[f,p]=await Promise.all([this.authTokenProvider_.getToken(m),this.appCheckTokenProvider_.getToken(m)]);o?G("getToken() completed but was canceled"):(G("getToken() completed. Creating connection."),this.authToken_=f&&f.accessToken,this.appCheckToken_=p&&p.token,a=new lu(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,i,E=>{Z(E+" ("+this.repoInfo_.toString()+")"),this.interrupt(mu)},r))}catch(f){this.log_("Failed to get token: "+f),o||(this.repoInfo_.nodeAdmin&&Z(f),c())}}}interrupt(e){G("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){G("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Hs(this.interruptReasons_)&&(this.reconnectDelay_=Tt,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let i;n?i=n.map(r=>zi(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,n){const i=new P(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(n),r.delete(n),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,n){G("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Tr&&(this.reconnectDelay_=Cr,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){G("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Tr&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+ko.replace(/\./g,"-")]=1,wo()?e["framework.cordova"]=1:$l()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=gn.getInstance().currentlyOnline();return Hs(this.interruptReasons_)&&e}}Se.nextPersistentConnectionId_=0;Se.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new k(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vn{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const i=new k(Xe,e),s=new k(Xe,n);return this.compare(i,s)!==0}minPost(){return k.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nn;class ea extends Vn{static get __EMPTY_NODE(){return nn}static set __EMPTY_NODE(e){nn=e}compare(e,n){return rt(e.name,n.name)}isDefinedOn(e){throw yt("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return k.MIN}maxPost(){return new k(Me,nn)}makePost(e,n){return v(typeof e=="string","KeyIndex indexValue must always be a string."),new k(e,nn)}toString(){return".key"}}const Ye=new ea;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn{constructor(e,n,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?i(e.key,n):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class z{constructor(e,n,i,s,r){this.key=e,this.value=n,this.color=i??z.RED,this.left=s??te.EMPTY_NODE,this.right=r??te.EMPTY_NODE}copy(e,n,i,s,r){return new z(e??this.key,n??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,n,i),null):r===0?s=s.copy(null,n,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,n,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return te.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let i,s;if(i=this,n(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),n(e,i.key)===0){if(i.right.isEmpty())return te.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,z.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,z.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}z.RED=!0;z.BLACK=!1;class yu{copy(e,n,i,s,r){return this}insert(e,n,i){return new z(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class te{constructor(e,n=te.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new te(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,z.BLACK,null,null))}remove(e){return new te(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,z.BLACK,null,null))}get(e){let n,i=this.root_;for(;!i.isEmpty();){if(n=this.comparator_(e,i.key),n===0)return i.value;n<0?i=i.left:n>0&&(i=i.right)}return null}getPredecessorKey(e){let n,i=this.root_,s=null;for(;!i.isEmpty();)if(n=this.comparator_(e,i.key),n===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else n<0?i=i.left:n>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new sn(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new sn(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new sn(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new sn(this.root_,null,this.comparator_,!0,e)}}te.EMPTY_NODE=new yu;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wu(t,e){return rt(t.name,e.name)}function Zi(t,e){return rt(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ai;function vu(t){Ai=t}const ta=function(t){return typeof t=="number"?"number:"+Oo(t):"string:"+t},na=function(t){if(t.isLeafNode()){const e=t.val();v(typeof e=="string"||typeof e=="number"||typeof e=="object"&&pe(e,".sv"),"Priority must be a string or number.")}else v(t===Ai||t.isEmpty(),"priority of unexpected type.");v(t===Ai||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let br;class q{static set __childrenNodeConstructor(e){br=e}static get __childrenNodeConstructor(){return br}constructor(e,n=q.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,v(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),na(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new q(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:q.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return A(e)?this:S(e)===".priority"?this.priorityNode_:q.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:q.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const i=S(e);return i===null?n:n.isEmpty()&&i!==".priority"?this:(v(i!==".priority"||Le(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,q.__childrenNodeConstructor.EMPTY_NODE.updateChild(x(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+ta(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=Oo(this.value_):e+=this.value_,this.lazyHash_=Po(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===q.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof q.__childrenNodeConstructor?-1:(v(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,i=typeof this.value_,s=q.VALUE_TYPE_ORDER.indexOf(n),r=q.VALUE_TYPE_ORDER.indexOf(i);return v(s>=0,"Unknown leaf type: "+n),v(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}q.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ia,sa;function Eu(t){ia=t}function Cu(t){sa=t}class Tu extends Vn{compare(e,n){const i=e.node.getPriority(),s=n.node.getPriority(),r=i.compareTo(s);return r===0?rt(e.name,n.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return k.MIN}maxPost(){return new k(Me,new q("[PRIORITY-POST]",sa))}makePost(e,n){const i=ia(e);return new k(n,new q("[PRIORITY-POST]",i))}toString(){return".priority"}}const M=new Tu;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bu=Math.log(2);class Iu{constructor(e){const n=r=>parseInt(Math.log(r)/bu,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const mn=function(t,e,n,i){t.sort(e);const s=function(c,l){const m=l-c;let f,p;if(m===0)return null;if(m===1)return f=t[c],p=n?n(f):f,new z(p,f.node,z.BLACK,null,null);{const E=parseInt(m/2,10)+c,C=s(c,E),T=s(E+1,l);return f=t[E],p=n?n(f):f,new z(p,f.node,z.BLACK,C,T)}},r=function(c){let l=null,m=null,f=t.length;const p=function(C,T){const b=f-C,V=f;f-=C;const Q=s(b+1,V),U=t[b],B=n?n(U):U;E(new z(B,U.node,T,null,Q))},E=function(C){l?(l.left=C,l=C):(m=C,l=C)};for(let C=0;C<c.count;++C){const T=c.nextBitIsOne(),b=Math.pow(2,c.count-(C+1));T?p(b,z.BLACK):(p(b,z.BLACK),p(b,z.RED))}return m},o=new Iu(t.length),a=r(o);return new te(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ci;const ct={};class Ie{static get Default(){return v(ct&&M,"ChildrenNode.ts has not been loaded"),ci=ci||new Ie({".priority":ct},{".priority":M}),ci}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=Qe(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof te?n:null}hasIndex(e){return pe(this.indexSet_,e.toString())}addIndex(e,n){v(e!==Ye,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=n.getIterator(k.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=mn(i,e.getCompare()):a=ct;const c=e.toString(),l={...this.indexSet_};l[c]=e;const m={...this.indexes_};return m[c]=a,new Ie(m,l)}addToIndexes(e,n){const i=hn(this.indexes_,(s,r)=>{const o=Qe(this.indexSet_,r);if(v(o,"Missing index implementation for "+r),s===ct)if(o.isDefinedOn(e.node)){const a=[],c=n.getIterator(k.Wrap);let l=c.getNext();for(;l;)l.name!==e.name&&a.push(l),l=c.getNext();return a.push(e),mn(a,o.getCompare())}else return ct;else{const a=n.get(e.name);let c=s;return a&&(c=c.remove(new k(e.name,a))),c.insert(e,e.node)}});return new Ie(i,this.indexSet_)}removeFromIndexes(e,n){const i=hn(this.indexes_,s=>{if(s===ct)return s;{const r=n.get(e.name);return r?s.remove(new k(e.name,r)):s}});return new Ie(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let bt;class I{static get EMPTY_NODE(){return bt||(bt=new I(new te(Zi),null,Ie.Default))}constructor(e,n,i){this.children_=e,this.priorityNode_=n,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&na(this.priorityNode_),this.children_.isEmpty()&&v(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||bt}updatePriority(e){return this.children_.isEmpty()?this:new I(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?bt:n}}getChild(e){const n=S(e);return n===null?this:this.getImmediateChild(n).getChild(x(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(v(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const i=new k(e,n);let s,r;n.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,n),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?bt:this.priorityNode_;return new I(s,o,r)}}updateChild(e,n){const i=S(e);if(i===null)return n;{v(S(e)!==".priority"||Le(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(x(e),n);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let i=0,s=0,r=!0;if(this.forEachChild(M,(o,a)=>{n[o]=a.val(e),i++,r&&I.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+ta(this.getPriority().val())+":"),this.forEachChild(M,(n,i)=>{const s=i.hash();s!==""&&(e+=":"+n+":"+s)}),this.lazyHash_=e===""?"":Po(e)}return this.lazyHash_}getPredecessorChildName(e,n,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new k(e,n));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new k(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new k(n,this.children_.get(n)):null}forEachChild(e,n){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>n(s.name,s.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,k.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,k.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Kt?-1:0}withIndex(e){if(e===Ye||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new I(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===Ye||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const i=this.getIterator(M),s=n.getIterator(M);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Ye?null:this.indexMap_.get(e.toString())}}I.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Su extends I{constructor(){super(new te(Zi),I.EMPTY_NODE,Ie.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return I.EMPTY_NODE}isEmpty(){return!1}}const Kt=new Su;Object.defineProperties(k,{MIN:{value:new k(Xe,I.EMPTY_NODE)},MAX:{value:new k(Me,Kt)}});ea.__EMPTY_NODE=I.EMPTY_NODE;q.__childrenNodeConstructor=I;vu(Kt);Cu(Kt);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Au=!0;function $(t,e=null){if(t===null)return I.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),v(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new q(n,$(e))}if(!(t instanceof Array)&&Au){const n=[];let i=!1;if(Y(t,(o,a)=>{if(o.substring(0,1)!=="."){const c=$(a);c.isEmpty()||(i=i||!c.getPriority().isEmpty(),n.push(new k(o,c)))}}),n.length===0)return I.EMPTY_NODE;const r=mn(n,wu,o=>o.name,Zi);if(i){const o=mn(n,M.getCompare());return new I(r,$(e),new Ie({".priority":o},{".priority":M}))}else return new I(r,$(e),Ie.Default)}else{let n=I.EMPTY_NODE;return Y(t,(i,s)=>{if(pe(t,i)&&i.substring(0,1)!=="."){const r=$(s);(r.isLeafNode()||!r.isEmpty())&&(n=n.updateImmediateChild(i,r))}}),n.updatePriority($(e))}}Eu($);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class es extends Vn{constructor(e){super(),this.indexPath_=e,v(!A(e)&&S(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const i=this.extractChild(e.node),s=this.extractChild(n.node),r=i.compareTo(s);return r===0?rt(e.name,n.name):r}makePost(e,n){const i=$(e),s=I.EMPTY_NODE.updateChild(this.indexPath_,i);return new k(n,s)}maxPost(){const e=I.EMPTY_NODE.updateChild(this.indexPath_,Kt);return new k(Me,e)}toString(){return Mt(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ku extends Vn{compare(e,n){const i=e.node.compareTo(n.node);return i===0?rt(e.name,n.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return k.MIN}maxPost(){return k.MAX}makePost(e,n){const i=$(e);return new k(n,i)}toString(){return".value"}}const ra=new ku;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oa(t){return{type:"value",snapshotNode:t}}function ft(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Lt(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function Ft(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function Nu(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ts{constructor(e){this.index_=e}updateChild(e,n,i,s,r,o){v(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(n)?o.trackChildChange(Lt(n,a)):v(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(ft(n,i)):o.trackChildChange(Ft(n,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(n,i).withIndex(this.index_)}updateFullNode(e,n,i){return i!=null&&(e.isLeafNode()||e.forEachChild(M,(s,r)=>{n.hasChild(s)||i.trackChildChange(Lt(s,r))}),n.isLeafNode()||n.forEachChild(M,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(Ft(s,r,o))}else i.trackChildChange(ft(s,r))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?I.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut{constructor(e){this.indexedFilter_=new ts(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Ut.getStartPost_(e),this.endPost_=Ut.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&i}updateChild(e,n,i,s,r,o){return this.matches(new k(n,i))||(i=I.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,i,s,r,o)}updateFullNode(e,n,i){n.isLeafNode()&&(n=I.EMPTY_NODE);let s=n.withIndex(this.index_);s=s.updatePriority(I.EMPTY_NODE);const r=this;return n.forEachChild(M,(o,a)=>{r.matches(new k(o,a))||(s=s.updateImmediateChild(o,I.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ru{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=n=>{const i=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new Ut(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,i,s,r,o){return this.rangedFilter_.matches(new k(n,i))||(i=I.EMPTY_NODE),e.getImmediateChild(n).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,i,s,r,o):this.fullLimitUpdateChild_(e,n,i,r,o)}updateFullNode(e,n,i){let s;if(n.isLeafNode()||n.isEmpty())s=I.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){s=I.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=n.withIndex(this.index_),s=s.updatePriority(I.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,I.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,i,s,r){let o;if(this.reverse_){const f=this.index_.getCompare();o=(p,E)=>f(E,p)}else o=this.index_.getCompare();const a=e;v(a.numChildren()===this.limit_,"");const c=new k(n,i),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),m=this.rangedFilter_.matches(c);if(a.hasChild(n)){const f=a.getImmediateChild(n);let p=s.getChildAfterChild(this.index_,l,this.reverse_);for(;p!=null&&(p.name===n||a.hasChild(p.name));)p=s.getChildAfterChild(this.index_,p,this.reverse_);const E=p==null?1:o(p,c);if(m&&!i.isEmpty()&&E>=0)return r!=null&&r.trackChildChange(Ft(n,i,f)),a.updateImmediateChild(n,i);{r!=null&&r.trackChildChange(Lt(n,f));const T=a.updateImmediateChild(n,I.EMPTY_NODE);return p!=null&&this.rangedFilter_.matches(p)?(r!=null&&r.trackChildChange(ft(p.name,p.node)),T.updateImmediateChild(p.name,p.node)):T}}else return i.isEmpty()?e:m&&o(l,c)>=0?(r!=null&&(r.trackChildChange(Lt(l.name,l.node)),r.trackChildChange(ft(n,i))),a.updateImmediateChild(n,i).updateImmediateChild(l.name,I.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ns{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=M}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return v(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return v(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Xe}hasEnd(){return this.endSet_}getIndexEndValue(){return v(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return v(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Me}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return v(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===M}copy(){const e=new ns;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Pu(t){return t.loadsAllData()?new ts(t.getIndex()):t.hasLimit()?new Ru(t):new Ut(t)}function Du(t,e){const n=t.copy();return n.limitSet_=!0,n.limit_=e,n.viewFrom_="r",n}function Ou(t,e,n){const i=t.copy();return i.startSet_=!0,e===void 0&&(e=null),i.indexStartValue_=e,n!=null?(i.startNameSet_=!0,i.indexStartName_=n):(i.startNameSet_=!1,i.indexStartName_=""),i}function xu(t,e,n){const i=t.copy();return i.endSet_=!0,e===void 0&&(e=null),i.indexEndValue_=e,n!==void 0?(i.endNameSet_=!0,i.indexEndName_=n):(i.endNameSet_=!1,i.indexEndName_=""),i}function Mu(t,e){const n=t.copy();return n.index_=e,n}function Ir(t){const e={};if(t.isDefault())return e;let n;if(t.index_===M?n="$priority":t.index_===ra?n="$value":t.index_===Ye?n="$key":(v(t.index_ instanceof es,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=H(n),t.startSet_){const i=t.startAfterSet_?"startAfter":"startAt";e[i]=H(t.indexStartValue_),t.startNameSet_&&(e[i]+=","+H(t.indexStartName_))}if(t.endSet_){const i=t.endBeforeSet_?"endBefore":"endAt";e[i]=H(t.indexEndValue_),t.endNameSet_&&(e[i]+=","+H(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function Sr(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==M&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn extends Qo{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(v(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=Gt("p:rest:"),this.listens_={}}listen(e,n,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=yn.getListenId_(e,i),a={};this.listens_[o]=a;const c=Ir(e._queryParams);this.restRequest_(r+".json",c,(l,m)=>{let f=m;if(l===404&&(f=null,l=null),l===null&&this.onDataUpdate_(r,f,!1,i),Qe(this.listens_,o)===a){let p;l?l===401?p="permission_denied":p="rest_error:"+l:p="ok",s(p,null)}})}unlisten(e,n){const i=yn.getListenId_(e,n);delete this.listens_[i]}get(e){const n=Ir(e._queryParams),i=e._path.toString(),s=new me;return this.restRequest_(i+".json",n,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,n={},i){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(n.auth=s.accessToken),r&&r.token&&(n.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Kl(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=Dt(a.responseText)}catch{Z("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,c)}else a.status!==401&&a.status!==404&&Z("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lu{constructor(){this.rootNode_=I.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wn(){return{value:null,children:new Map}}function aa(t,e,n){if(A(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const i=S(e);t.children.has(i)||t.children.set(i,wn());const s=t.children.get(i);e=x(e),aa(s,e,n)}}function ki(t,e,n){t.value!==null?n(e,t.value):Fu(t,(i,s)=>{const r=new P(e.toString()+"/"+i);ki(s,r,n)})}function Fu(t,e){t.children.forEach((n,i)=>{e(i,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uu{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&Y(this.last_,(i,s)=>{n[i]=n[i]-s}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ar=10*1e3,Bu=30*1e3,$u=5*60*1e3;class Vu{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new Uu(e);const i=Ar+(Bu-Ar)*Math.random();kt(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),n={};let i=!1;Y(e,(s,r)=>{r>0&&pe(this.statsToReport_,s)&&(n[s]=r,i=!0)}),i&&this.server_.reportStats(n),kt(this.reportStats_.bind(this),Math.floor(Math.random()*2*$u))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ue;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(ue||(ue={}));function is(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function ss(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function rs(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vn{constructor(e,n,i){this.path=e,this.affectedTree=n,this.revert=i,this.type=ue.ACK_USER_WRITE,this.source=is()}operationForChild(e){if(A(this.path)){if(this.affectedTree.value!=null)return v(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new P(e));return new vn(R(),n,this.revert)}}else return v(S(this.path)===e,"operationForChild called for unrelated child."),new vn(x(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(e,n){this.source=e,this.path=n,this.type=ue.LISTEN_COMPLETE}operationForChild(e){return A(this.path)?new Bt(this.source,R()):new Bt(this.source,x(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze{constructor(e,n,i){this.source=e,this.path=n,this.snap=i,this.type=ue.OVERWRITE}operationForChild(e){return A(this.path)?new Ze(this.source,R(),this.snap.getImmediateChild(e)):new Ze(this.source,x(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt{constructor(e,n,i){this.source=e,this.path=n,this.children=i,this.type=ue.MERGE}operationForChild(e){if(A(this.path)){const n=this.children.subtree(new P(e));return n.isEmpty()?null:n.value?new Ze(this.source,R(),n.value):new pt(this.source,R(),n)}else return v(S(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new pt(this.source,x(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fe{constructor(e,n,i){this.node_=e,this.fullyInitialized_=n,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(A(e))return this.isFullyInitialized()&&!this.filtered_;const n=S(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wu{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Hu(t,e,n,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Nu(o.childName,o.snapshotNode))}),It(t,s,"child_removed",e,i,n),It(t,s,"child_added",e,i,n),It(t,s,"child_moved",r,i,n),It(t,s,"child_changed",e,i,n),It(t,s,"value",e,i,n),s}function It(t,e,n,i,s,r){const o=i.filter(a=>a.type===n);o.sort((a,c)=>qu(t,a,c)),o.forEach(a=>{const c=ju(t,a,r);s.forEach(l=>{l.respondsTo(a.type)&&e.push(l.createEvent(c,t.query_))})})}function ju(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function qu(t,e,n){if(e.childName==null||n.childName==null)throw yt("Should only compare child_ events.");const i=new k(e.childName,e.snapshotNode),s=new k(n.childName,n.snapshotNode);return t.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wn(t,e){return{eventCache:t,serverCache:e}}function Nt(t,e,n,i){return Wn(new Fe(e,n,i),t.serverCache)}function la(t,e,n,i){return Wn(t.eventCache,new Fe(e,n,i))}function En(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function et(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let hi;const zu=()=>(hi||(hi=new te(kh)),hi);class O{static fromObject(e){let n=new O(null);return Y(e,(i,s)=>{n=n.set(new P(i),s)}),n}constructor(e,n=zu()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:R(),value:this.value};if(A(e))return null;{const i=S(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(x(e),n);return r!=null?{path:L(new P(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(A(e))return this;{const n=S(e),i=this.children.get(n);return i!==null?i.subtree(x(e)):new O(null)}}set(e,n){if(A(e))return new O(n,this.children);{const i=S(e),r=(this.children.get(i)||new O(null)).set(x(e),n),o=this.children.insert(i,r);return new O(this.value,o)}}remove(e){if(A(e))return this.children.isEmpty()?new O(null):new O(null,this.children);{const n=S(e),i=this.children.get(n);if(i){const s=i.remove(x(e));let r;return s.isEmpty()?r=this.children.remove(n):r=this.children.insert(n,s),this.value===null&&r.isEmpty()?new O(null):new O(this.value,r)}else return this}}get(e){if(A(e))return this.value;{const n=S(e),i=this.children.get(n);return i?i.get(x(e)):null}}setTree(e,n){if(A(e))return n;{const i=S(e),r=(this.children.get(i)||new O(null)).setTree(x(e),n);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new O(this.value,o)}}fold(e){return this.fold_(R(),e)}fold_(e,n){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(L(e,s),n)}),n(e,this.value,i)}findOnPath(e,n){return this.findOnPath_(e,R(),n)}findOnPath_(e,n,i){const s=this.value?i(n,this.value):!1;if(s)return s;if(A(e))return null;{const r=S(e),o=this.children.get(r);return o?o.findOnPath_(x(e),L(n,r),i):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,R(),n)}foreachOnPath_(e,n,i){if(A(e))return this;{this.value&&i(n,this.value);const s=S(e),r=this.children.get(s);return r?r.foreachOnPath_(x(e),L(n,s),i):new O(null)}}foreach(e){this.foreach_(R(),e)}foreach_(e,n){this.children.inorderTraversal((i,s)=>{s.foreach_(L(e,i),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,i)=>{i.value&&e(n,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fe{constructor(e){this.writeTree_=e}static empty(){return new fe(new O(null))}}function Rt(t,e,n){if(A(e))return new fe(new O(n));{const i=t.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=J(s,e);return r=r.updateChild(o,n),new fe(t.writeTree_.set(s,r))}else{const s=new O(n),r=t.writeTree_.setTree(e,s);return new fe(r)}}}function Ni(t,e,n){let i=t;return Y(n,(s,r)=>{i=Rt(i,L(e,s),r)}),i}function kr(t,e){if(A(e))return fe.empty();{const n=t.writeTree_.setTree(e,new O(null));return new fe(n)}}function Ri(t,e){return ot(t,e)!=null}function ot(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(J(n.path,e)):null}function Nr(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(M,(i,s)=>{e.push(new k(i,s))}):t.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new k(i,s.value))}),e}function De(t,e){if(A(e))return t;{const n=ot(t,e);return n!=null?new fe(new O(n)):new fe(t.writeTree_.subtree(e))}}function Pi(t){return t.writeTree_.isEmpty()}function _t(t,e){return ca(R(),t.writeTree_,e)}function ca(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(v(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):n=ca(L(t,s),r,n)}),!n.getChild(t).isEmpty()&&i!==null&&(n=n.updateChild(L(t,".priority"),i)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hn(t,e){return fa(e,t)}function Gu(t,e,n,i,s){v(i>t.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),t.allWrites.push({path:e,snap:n,writeId:i,visible:s}),s&&(t.visibleWrites=Rt(t.visibleWrites,e,n)),t.lastWriteId=i}function Ku(t,e,n,i){v(i>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:i,visible:!0}),t.visibleWrites=Ni(t.visibleWrites,e,n),t.lastWriteId=i}function Yu(t,e){for(let n=0;n<t.allWrites.length;n++){const i=t.allWrites[n];if(i.writeId===e)return i}return null}function Qu(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);v(n>=0,"removeWrite called with nonexistent writeId.");const i=t.allWrites[n];t.allWrites.splice(n,1);let s=i.visible,r=!1,o=t.allWrites.length-1;for(;s&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&Ju(a,i.path)?s=!1:oe(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return Xu(t),!0;if(i.snap)t.visibleWrites=kr(t.visibleWrites,i.path);else{const a=i.children;Y(a,c=>{t.visibleWrites=kr(t.visibleWrites,L(i.path,c))})}return!0}else return!1}function Ju(t,e){if(t.snap)return oe(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&oe(L(t.path,n),e))return!0;return!1}function Xu(t){t.visibleWrites=ha(t.allWrites,Zu,R()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function Zu(t){return t.visible}function ha(t,e,n){let i=fe.empty();for(let s=0;s<t.length;++s){const r=t[s];if(e(r)){const o=r.path;let a;if(r.snap)oe(n,o)?(a=J(n,o),i=Rt(i,a,r.snap)):oe(o,n)&&(a=J(o,n),i=Rt(i,R(),r.snap.getChild(a)));else if(r.children){if(oe(n,o))a=J(n,o),i=Ni(i,a,r.children);else if(oe(o,n))if(a=J(o,n),A(a))i=Ni(i,R(),r.children);else{const c=Qe(r.children,S(a));if(c){const l=c.getChild(x(a));i=Rt(i,R(),l)}}}else throw yt("WriteRecord should have .snap or .children")}}return i}function ua(t,e,n,i,s){if(!i&&!s){const r=ot(t.visibleWrites,e);if(r!=null)return r;{const o=De(t.visibleWrites,e);if(Pi(o))return n;if(n==null&&!Ri(o,R()))return null;{const a=n||I.EMPTY_NODE;return _t(o,a)}}}else{const r=De(t.visibleWrites,e);if(!s&&Pi(r))return n;if(!s&&n==null&&!Ri(r,R()))return null;{const o=function(l){return(l.visible||s)&&(!i||!~i.indexOf(l.writeId))&&(oe(l.path,e)||oe(e,l.path))},a=ha(t.allWrites,o,e),c=n||I.EMPTY_NODE;return _t(a,c)}}}function ed(t,e,n){let i=I.EMPTY_NODE;const s=ot(t.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(M,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(n){const r=De(t.visibleWrites,e);return n.forEachChild(M,(o,a)=>{const c=_t(De(r,new P(o)),a);i=i.updateImmediateChild(o,c)}),Nr(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=De(t.visibleWrites,e);return Nr(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function td(t,e,n,i,s){v(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=L(e,n);if(Ri(t.visibleWrites,r))return null;{const o=De(t.visibleWrites,r);return Pi(o)?s.getChild(n):_t(o,s.getChild(n))}}function nd(t,e,n,i){const s=L(e,n),r=ot(t.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(n)){const o=De(t.visibleWrites,s);return _t(o,i.getNode().getImmediateChild(n))}else return null}function id(t,e){return ot(t.visibleWrites,e)}function sd(t,e,n,i,s,r,o){let a;const c=De(t.visibleWrites,e),l=ot(c,R());if(l!=null)a=l;else if(n!=null)a=_t(c,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const m=[],f=o.getCompare(),p=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let E=p.getNext();for(;E&&m.length<s;)f(E,i)!==0&&m.push(E),E=p.getNext();return m}else return[]}function rd(){return{visibleWrites:fe.empty(),allWrites:[],lastWriteId:-1}}function Cn(t,e,n,i){return ua(t.writeTree,t.treePath,e,n,i)}function os(t,e){return ed(t.writeTree,t.treePath,e)}function Rr(t,e,n,i){return td(t.writeTree,t.treePath,e,n,i)}function Tn(t,e){return id(t.writeTree,L(t.treePath,e))}function od(t,e,n,i,s,r){return sd(t.writeTree,t.treePath,e,n,i,s,r)}function as(t,e,n){return nd(t.writeTree,t.treePath,e,n)}function da(t,e){return fa(L(t.treePath,e),t.writeTree)}function fa(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ad{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,i=e.childName;v(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),v(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(n==="child_added"&&r==="child_removed")this.changeMap.set(i,Ft(i,e.snapshotNode,s.snapshotNode));else if(n==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(n==="child_removed"&&r==="child_changed")this.changeMap.set(i,Lt(i,s.oldSnap));else if(n==="child_changed"&&r==="child_added")this.changeMap.set(i,ft(i,e.snapshotNode));else if(n==="child_changed"&&r==="child_changed")this.changeMap.set(i,Ft(i,e.snapshotNode,s.oldSnap));else throw yt("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ld{getCompleteChild(e){return null}getChildAfterChild(e,n,i){return null}}const pa=new ld;class ls{constructor(e,n,i=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=i}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new Fe(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return as(this.writes_,e,i)}}getChildAfterChild(e,n,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:et(this.viewCache_),r=od(this.writes_,s,n,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cd(t){return{filter:t}}function hd(t,e){v(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),v(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function ud(t,e,n,i,s){const r=new ad;let o,a;if(n.type===ue.OVERWRITE){const l=n;l.source.fromUser?o=Di(t,e,l.path,l.snap,i,s,r):(v(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered()&&!A(l.path),o=bn(t,e,l.path,l.snap,i,s,a,r))}else if(n.type===ue.MERGE){const l=n;l.source.fromUser?o=fd(t,e,l.path,l.children,i,s,r):(v(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),o=Oi(t,e,l.path,l.children,i,s,a,r))}else if(n.type===ue.ACK_USER_WRITE){const l=n;l.revert?o=gd(t,e,l.path,i,s,r):o=pd(t,e,l.path,l.affectedTree,i,s,r)}else if(n.type===ue.LISTEN_COMPLETE)o=_d(t,e,n.path,i,r);else throw yt("Unknown operation type: "+n.type);const c=r.getChanges();return dd(e,o,c),{viewCache:o,changes:c}}function dd(t,e,n){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=En(t);(n.length>0||!t.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&n.push(oa(En(e)))}}function _a(t,e,n,i,s,r){const o=e.eventCache;if(Tn(i,n)!=null)return e;{let a,c;if(A(n))if(v(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const l=et(e),m=l instanceof I?l:I.EMPTY_NODE,f=os(i,m);a=t.filter.updateFullNode(e.eventCache.getNode(),f,r)}else{const l=Cn(i,et(e));a=t.filter.updateFullNode(e.eventCache.getNode(),l,r)}else{const l=S(n);if(l===".priority"){v(Le(n)===1,"Can't have a priority with additional path components");const m=o.getNode();c=e.serverCache.getNode();const f=Rr(i,n,m,c);f!=null?a=t.filter.updatePriority(m,f):a=o.getNode()}else{const m=x(n);let f;if(o.isCompleteForChild(l)){c=e.serverCache.getNode();const p=Rr(i,n,o.getNode(),c);p!=null?f=o.getNode().getImmediateChild(l).updateChild(m,p):f=o.getNode().getImmediateChild(l)}else f=as(i,l,e.serverCache);f!=null?a=t.filter.updateChild(o.getNode(),l,f,m,s,r):a=o.getNode()}}return Nt(e,a,o.isFullyInitialized()||A(n),t.filter.filtersNodes())}}function bn(t,e,n,i,s,r,o,a){const c=e.serverCache;let l;const m=o?t.filter:t.filter.getIndexedFilter();if(A(n))l=m.updateFullNode(c.getNode(),i,null);else if(m.filtersNodes()&&!c.isFiltered()){const E=c.getNode().updateChild(n,i);l=m.updateFullNode(c.getNode(),E,null)}else{const E=S(n);if(!c.isCompleteForPath(n)&&Le(n)>1)return e;const C=x(n),b=c.getNode().getImmediateChild(E).updateChild(C,i);E===".priority"?l=m.updatePriority(c.getNode(),b):l=m.updateChild(c.getNode(),E,b,C,pa,null)}const f=la(e,l,c.isFullyInitialized()||A(n),m.filtersNodes()),p=new ls(s,f,r);return _a(t,f,n,s,p,a)}function Di(t,e,n,i,s,r,o){const a=e.eventCache;let c,l;const m=new ls(s,e,r);if(A(n))l=t.filter.updateFullNode(e.eventCache.getNode(),i,o),c=Nt(e,l,!0,t.filter.filtersNodes());else{const f=S(n);if(f===".priority")l=t.filter.updatePriority(e.eventCache.getNode(),i),c=Nt(e,l,a.isFullyInitialized(),a.isFiltered());else{const p=x(n),E=a.getNode().getImmediateChild(f);let C;if(A(p))C=i;else{const T=m.getCompleteChild(f);T!=null?Qi(p)===".priority"&&T.getChild(Xo(p)).isEmpty()?C=T:C=T.updateChild(p,i):C=I.EMPTY_NODE}if(E.equals(C))c=e;else{const T=t.filter.updateChild(a.getNode(),f,C,p,m,o);c=Nt(e,T,a.isFullyInitialized(),t.filter.filtersNodes())}}}return c}function Pr(t,e){return t.eventCache.isCompleteForChild(e)}function fd(t,e,n,i,s,r,o){let a=e;return i.foreach((c,l)=>{const m=L(n,c);Pr(e,S(m))&&(a=Di(t,a,m,l,s,r,o))}),i.foreach((c,l)=>{const m=L(n,c);Pr(e,S(m))||(a=Di(t,a,m,l,s,r,o))}),a}function Dr(t,e,n){return n.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function Oi(t,e,n,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,l;A(n)?l=i:l=new O(null).setTree(n,i);const m=e.serverCache.getNode();return l.children.inorderTraversal((f,p)=>{if(m.hasChild(f)){const E=e.serverCache.getNode().getImmediateChild(f),C=Dr(t,E,p);c=bn(t,c,new P(f),C,s,r,o,a)}}),l.children.inorderTraversal((f,p)=>{const E=!e.serverCache.isCompleteForChild(f)&&p.value===null;if(!m.hasChild(f)&&!E){const C=e.serverCache.getNode().getImmediateChild(f),T=Dr(t,C,p);c=bn(t,c,new P(f),T,s,r,o,a)}}),c}function pd(t,e,n,i,s,r,o){if(Tn(s,n)!=null)return e;const a=e.serverCache.isFiltered(),c=e.serverCache;if(i.value!=null){if(A(n)&&c.isFullyInitialized()||c.isCompleteForPath(n))return bn(t,e,n,c.getNode().getChild(n),s,r,a,o);if(A(n)){let l=new O(null);return c.getNode().forEachChild(Ye,(m,f)=>{l=l.set(new P(m),f)}),Oi(t,e,n,l,s,r,a,o)}else return e}else{let l=new O(null);return i.foreach((m,f)=>{const p=L(n,m);c.isCompleteForPath(p)&&(l=l.set(m,c.getNode().getChild(p)))}),Oi(t,e,n,l,s,r,a,o)}}function _d(t,e,n,i,s){const r=e.serverCache,o=la(e,r.getNode(),r.isFullyInitialized()||A(n),r.isFiltered());return _a(t,o,n,i,pa,s)}function gd(t,e,n,i,s,r){let o;if(Tn(i,n)!=null)return e;{const a=new ls(i,e,s),c=e.eventCache.getNode();let l;if(A(n)||S(n)===".priority"){let m;if(e.serverCache.isFullyInitialized())m=Cn(i,et(e));else{const f=e.serverCache.getNode();v(f instanceof I,"serverChildren would be complete if leaf node"),m=os(i,f)}m=m,l=t.filter.updateFullNode(c,m,r)}else{const m=S(n);let f=as(i,m,e.serverCache);f==null&&e.serverCache.isCompleteForChild(m)&&(f=c.getImmediateChild(m)),f!=null?l=t.filter.updateChild(c,m,f,x(n),a,r):e.eventCache.getNode().hasChild(m)?l=t.filter.updateChild(c,m,I.EMPTY_NODE,x(n),a,r):l=c,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Cn(i,et(e)),o.isLeafNode()&&(l=t.filter.updateFullNode(l,o,r)))}return o=e.serverCache.isFullyInitialized()||Tn(i,R())!=null,Nt(e,l,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class md{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new ts(i.getIndex()),r=Pu(i);this.processor_=cd(r);const o=n.serverCache,a=n.eventCache,c=s.updateFullNode(I.EMPTY_NODE,o.getNode(),null),l=r.updateFullNode(I.EMPTY_NODE,a.getNode(),null),m=new Fe(c,o.isFullyInitialized(),s.filtersNodes()),f=new Fe(l,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=Wn(f,m),this.eventGenerator_=new Wu(this.query_)}get query(){return this.query_}}function yd(t){return t.viewCache_.serverCache.getNode()}function wd(t){return En(t.viewCache_)}function vd(t,e){const n=et(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!A(e)&&!n.getImmediateChild(S(e)).isEmpty())?n.getChild(e):null}function Or(t){return t.eventRegistrations_.length===0}function Ed(t,e){t.eventRegistrations_.push(e)}function xr(t,e,n){const i=[];if(n){v(e==null,"A cancel should cancel all event registrations.");const s=t.query._path;t.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(n,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<t.eventRegistrations_.length;++r){const o=t.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(t.eventRegistrations_.slice(r+1));break}}t.eventRegistrations_=s}else t.eventRegistrations_=[];return i}function Mr(t,e,n,i){e.type===ue.MERGE&&e.source.queryId!==null&&(v(et(t.viewCache_),"We should always have a full cache before handling merges"),v(En(t.viewCache_),"Missing event cache, even though we have a server cache"));const s=t.viewCache_,r=ud(t.processor_,s,e,n,i);return hd(t.processor_,r.viewCache),v(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=r.viewCache,ga(t,r.changes,r.viewCache.eventCache.getNode(),null)}function Cd(t,e){const n=t.viewCache_.eventCache,i=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(M,(r,o)=>{i.push(ft(r,o))}),n.isFullyInitialized()&&i.push(oa(n.getNode())),ga(t,i,n.getNode(),e)}function ga(t,e,n,i){const s=i?[i]:t.eventRegistrations_;return Hu(t.eventGenerator_,e,n,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let In;class ma{constructor(){this.views=new Map}}function Td(t){v(!In,"__referenceConstructor has already been defined"),In=t}function bd(){return v(In,"Reference.ts has not been loaded"),In}function Id(t){return t.views.size===0}function cs(t,e,n,i){const s=e.source.queryId;if(s!==null){const r=t.views.get(s);return v(r!=null,"SyncTree gave us an op for an invalid query."),Mr(r,e,n,i)}else{let r=[];for(const o of t.views.values())r=r.concat(Mr(o,e,n,i));return r}}function ya(t,e,n,i,s){const r=e._queryIdentifier,o=t.views.get(r);if(!o){let a=Cn(n,s?i:null),c=!1;a?c=!0:i instanceof I?(a=os(n,i),c=!1):(a=I.EMPTY_NODE,c=!1);const l=Wn(new Fe(a,c,!1),new Fe(i,s,!1));return new md(e,l)}return o}function Sd(t,e,n,i,s,r){const o=ya(t,e,i,s,r);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),Ed(o,n),Cd(o,n)}function Ad(t,e,n,i){const s=e._queryIdentifier,r=[];let o=[];const a=Ue(t);if(s==="default")for(const[c,l]of t.views.entries())o=o.concat(xr(l,n,i)),Or(l)&&(t.views.delete(c),l.query._queryParams.loadsAllData()||r.push(l.query));else{const c=t.views.get(s);c&&(o=o.concat(xr(c,n,i)),Or(c)&&(t.views.delete(s),c.query._queryParams.loadsAllData()||r.push(c.query)))}return a&&!Ue(t)&&r.push(new(bd())(e._repo,e._path)),{removed:r,events:o}}function wa(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function Oe(t,e){let n=null;for(const i of t.views.values())n=n||vd(i,e);return n}function va(t,e){if(e._queryParams.loadsAllData())return jn(t);{const i=e._queryIdentifier;return t.views.get(i)}}function Ea(t,e){return va(t,e)!=null}function Ue(t){return jn(t)!=null}function jn(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Sn;function kd(t){v(!Sn,"__referenceConstructor has already been defined"),Sn=t}function Nd(){return v(Sn,"Reference.ts has not been loaded"),Sn}let Rd=1;class Lr{constructor(e){this.listenProvider_=e,this.syncPointTree_=new O(null),this.pendingWriteTree_=rd(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function hs(t,e,n,i,s){return Gu(t.pendingWriteTree_,e,n,i,s),s?vt(t,new Ze(is(),e,n)):[]}function Pd(t,e,n,i){Ku(t.pendingWriteTree_,e,n,i);const s=O.fromObject(n);return vt(t,new pt(is(),e,s))}function Ne(t,e,n=!1){const i=Yu(t.pendingWriteTree_,e);if(Qu(t.pendingWriteTree_,e)){let r=new O(null);return i.snap!=null?r=r.set(R(),!0):Y(i.children,o=>{r=r.set(new P(o),!0)}),vt(t,new vn(i.path,r,n))}else return[]}function Yt(t,e,n){return vt(t,new Ze(ss(),e,n))}function Dd(t,e,n){const i=O.fromObject(n);return vt(t,new pt(ss(),e,i))}function Od(t,e){return vt(t,new Bt(ss(),e))}function xd(t,e,n){const i=us(t,n);if(i){const s=ds(i),r=s.path,o=s.queryId,a=J(r,e),c=new Bt(rs(o),a);return fs(t,r,c)}else return[]}function An(t,e,n,i,s=!1){const r=e._path,o=t.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||Ea(o,e))){const c=Ad(o,e,n,i);Id(o)&&(t.syncPointTree_=t.syncPointTree_.remove(r));const l=c.removed;if(a=c.events,!s){const m=l.findIndex(p=>p._queryParams.loadsAllData())!==-1,f=t.syncPointTree_.findOnPath(r,(p,E)=>Ue(E));if(m&&!f){const p=t.syncPointTree_.subtree(r);if(!p.isEmpty()){const E=Fd(p);for(let C=0;C<E.length;++C){const T=E[C],b=T.query,V=Ia(t,T);t.listenProvider_.startListening(Pt(b),$t(t,b),V.hashFn,V.onComplete)}}}!f&&l.length>0&&!i&&(m?t.listenProvider_.stopListening(Pt(e),null):l.forEach(p=>{const E=t.queryToTagMap.get(zn(p));t.listenProvider_.stopListening(Pt(p),E)}))}Ud(t,l)}return a}function Ca(t,e,n,i){const s=us(t,i);if(s!=null){const r=ds(s),o=r.path,a=r.queryId,c=J(o,e),l=new Ze(rs(a),c,n);return fs(t,o,l)}else return[]}function Md(t,e,n,i){const s=us(t,i);if(s){const r=ds(s),o=r.path,a=r.queryId,c=J(o,e),l=O.fromObject(n),m=new pt(rs(a),c,l);return fs(t,o,m)}else return[]}function xi(t,e,n,i=!1){const s=e._path;let r=null,o=!1;t.syncPointTree_.foreachOnPath(s,(p,E)=>{const C=J(p,s);r=r||Oe(E,C),o=o||Ue(E)});let a=t.syncPointTree_.get(s);a?(o=o||Ue(a),r=r||Oe(a,R())):(a=new ma,t.syncPointTree_=t.syncPointTree_.set(s,a));let c;r!=null?c=!0:(c=!1,r=I.EMPTY_NODE,t.syncPointTree_.subtree(s).foreachChild((E,C)=>{const T=Oe(C,R());T&&(r=r.updateImmediateChild(E,T))}));const l=Ea(a,e);if(!l&&!e._queryParams.loadsAllData()){const p=zn(e);v(!t.queryToTagMap.has(p),"View does not exist, but we have a tag");const E=Bd();t.queryToTagMap.set(p,E),t.tagToQueryMap.set(E,p)}const m=Hn(t.pendingWriteTree_,s);let f=Sd(a,e,n,m,r,c);if(!l&&!o&&!i){const p=va(a,e);f=f.concat($d(t,e,p))}return f}function qn(t,e,n){const s=t.pendingWriteTree_,r=t.syncPointTree_.findOnPath(e,(o,a)=>{const c=J(o,e),l=Oe(a,c);if(l)return l});return ua(s,e,r,n,!0)}function Ld(t,e){const n=e._path;let i=null;t.syncPointTree_.foreachOnPath(n,(l,m)=>{const f=J(l,n);i=i||Oe(m,f)});let s=t.syncPointTree_.get(n);s?i=i||Oe(s,R()):(s=new ma,t.syncPointTree_=t.syncPointTree_.set(n,s));const r=i!=null,o=r?new Fe(i,!0,!1):null,a=Hn(t.pendingWriteTree_,e._path),c=ya(s,e,a,r?o.getNode():I.EMPTY_NODE,r);return wd(c)}function vt(t,e){return Ta(e,t.syncPointTree_,null,Hn(t.pendingWriteTree_,R()))}function Ta(t,e,n,i){if(A(t.path))return ba(t,e,n,i);{const s=e.get(R());n==null&&s!=null&&(n=Oe(s,R()));let r=[];const o=S(t.path),a=t.operationForChild(o),c=e.children.get(o);if(c&&a){const l=n?n.getImmediateChild(o):null,m=da(i,o);r=r.concat(Ta(a,c,l,m))}return s&&(r=r.concat(cs(s,t,i,n))),r}}function ba(t,e,n,i){const s=e.get(R());n==null&&s!=null&&(n=Oe(s,R()));let r=[];return e.children.inorderTraversal((o,a)=>{const c=n?n.getImmediateChild(o):null,l=da(i,o),m=t.operationForChild(o);m&&(r=r.concat(ba(m,a,c,l)))}),s&&(r=r.concat(cs(s,t,i,n))),r}function Ia(t,e){const n=e.query,i=$t(t,n);return{hashFn:()=>(yd(e)||I.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?xd(t,n._path,i):Od(t,n._path);{const r=Ph(s,n);return An(t,n,null,r)}}}}function $t(t,e){const n=zn(e);return t.queryToTagMap.get(n)}function zn(t){return t._path.toString()+"$"+t._queryIdentifier}function us(t,e){return t.tagToQueryMap.get(e)}function ds(t){const e=t.indexOf("$");return v(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new P(t.substr(0,e))}}function fs(t,e,n){const i=t.syncPointTree_.get(e);v(i,"Missing sync point for query tag that we're tracking");const s=Hn(t.pendingWriteTree_,e);return cs(i,n,s,null)}function Fd(t){return t.fold((e,n,i)=>{if(n&&Ue(n))return[jn(n)];{let s=[];return n&&(s=wa(n)),Y(i,(r,o)=>{s=s.concat(o)}),s}})}function Pt(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(Nd())(t._repo,t._path):t}function Ud(t,e){for(let n=0;n<e.length;++n){const i=e[n];if(!i._queryParams.loadsAllData()){const s=zn(i),r=t.queryToTagMap.get(s);t.queryToTagMap.delete(s),t.tagToQueryMap.delete(r)}}}function Bd(){return Rd++}function $d(t,e,n){const i=e._path,s=$t(t,e),r=Ia(t,n),o=t.listenProvider_.startListening(Pt(e),s,r.hashFn,r.onComplete),a=t.syncPointTree_.subtree(i);if(s)v(!Ue(a.value),"If we're adding a query, it shouldn't be shadowed");else{const c=a.fold((l,m,f)=>{if(!A(l)&&m&&Ue(m))return[jn(m).query];{let p=[];return m&&(p=p.concat(wa(m).map(E=>E.query))),Y(f,(E,C)=>{p=p.concat(C)}),p}});for(let l=0;l<c.length;++l){const m=c[l];t.listenProvider_.stopListening(Pt(m),$t(t,m))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ps{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new ps(n)}node(){return this.node_}}class _s{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=L(this.path_,e);return new _s(this.syncTree_,n)}node(){return qn(this.syncTree_,this.path_)}}const Vd=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},Fr=function(t,e,n){if(!t||typeof t!="object")return t;if(v(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return Wd(t[".sv"],e,n);if(typeof t[".sv"]=="object")return Hd(t[".sv"],e);v(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},Wd=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:v(!1,"Unexpected server value: "+t)}},Hd=function(t,e,n){t.hasOwnProperty("increment")||v(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const i=t.increment;typeof i!="number"&&v(!1,"Unexpected increment value: "+i);const s=e.node();if(v(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},Sa=function(t,e,n,i){return ms(e,new _s(n,t),i)},gs=function(t,e,n){return ms(t,new ps(e),n)};function ms(t,e,n){const i=t.getPriority().val(),s=Fr(i,e.getImmediateChild(".priority"),n);let r;if(t.isLeafNode()){const o=t,a=Fr(o.getValue(),e,n);return a!==o.getValue()||s!==o.getPriority().val()?new q(a,$(s)):t}else{const o=t;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new q(s))),o.forEachChild(M,(a,c)=>{const l=ms(c,e.getImmediateChild(a),n);l!==c&&(r=r.updateImmediateChild(a,l))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ys{constructor(e="",n=null,i={children:{},childCount:0}){this.name=e,this.parent=n,this.node=i}}function Gn(t,e){let n=e instanceof P?e:new P(e),i=t,s=S(n);for(;s!==null;){const r=Qe(i.node.children,s)||{children:{},childCount:0};i=new ys(s,i,r),n=x(n),s=S(n)}return i}function at(t){return t.node.value}function ws(t,e){t.node.value=e,Mi(t)}function Aa(t){return t.node.childCount>0}function jd(t){return at(t)===void 0&&!Aa(t)}function Kn(t,e){Y(t.node.children,(n,i)=>{e(new ys(n,t,i))})}function ka(t,e,n,i){n&&e(t),Kn(t,s=>{ka(s,e,!0)})}function qd(t,e,n){let i=t.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function Qt(t){return new P(t.parent===null?t.name:Qt(t.parent)+"/"+t.name)}function Mi(t){t.parent!==null&&zd(t.parent,t.name,t)}function zd(t,e,n){const i=jd(n),s=pe(t.node.children,e);i&&s?(delete t.node.children[e],t.node.childCount--,Mi(t)):!i&&!s&&(t.node.children[e]=n.node,t.node.childCount++,Mi(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gd=/[\[\].#$\/\u0000-\u001F\u007F]/,Kd=/[\[\].#$\u0000-\u001F\u007F]/,ui=10*1024*1024,vs=function(t){return typeof t=="string"&&t.length!==0&&!Gd.test(t)},Na=function(t){return typeof t=="string"&&t.length!==0&&!Kd.test(t)},Yd=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Na(t)},kn=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!qi(t)||t&&typeof t=="object"&&pe(t,".sv")},Jt=function(t,e,n,i){i&&e===void 0||Xt(Ln(t,"value"),e,n)},Xt=function(t,e,n){const i=n instanceof P?new uu(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+He(i));if(typeof e=="function")throw new Error(t+"contains a function "+He(i)+" with contents = "+e.toString());if(qi(e))throw new Error(t+"contains "+e.toString()+" "+He(i));if(typeof e=="string"&&e.length>ui/3&&Fn(e)>ui)throw new Error(t+"contains a string greater than "+ui+" utf8 bytes "+He(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(Y(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!vs(o)))throw new Error(t+" contains an invalid key ("+o+") "+He(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);du(i,o),Xt(t,a,i),fu(i)}),s&&r)throw new Error(t+' contains ".value" child '+He(i)+" in addition to actual children.")}},Qd=function(t,e){let n,i;for(n=0;n<e.length;n++){i=e[n];const r=Mt(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!vs(r[o]))throw new Error(t+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(hu);let s=null;for(n=0;n<e.length;n++){if(i=e[n],s!==null&&oe(s,i))throw new Error(t+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},Jd=function(t,e,n,i){const s=Ln(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];Y(e,(o,a)=>{const c=new P(o);if(Xt(s,a,L(n,c)),Qi(c)===".priority"&&!kn(a))throw new Error(s+"contains an invalid value for '"+c.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(c)}),Qd(s,r)},Es=function(t,e,n,i){if(!Na(n))throw new Error(Ln(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},Xd=function(t,e,n,i){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Es(t,e,n)},Yn=function(t,e){if(S(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},Zd=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!vs(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!Yd(n))throw new Error(Ln(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ef{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Qn(t,e){let n=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();n!==null&&!Ji(r,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:r}),n.events.push(s)}n&&t.eventLists_.push(n)}function Ra(t,e,n){Qn(t,n),Pa(t,i=>Ji(i,e))}function se(t,e,n){Qn(t,n),Pa(t,i=>oe(i,e)||oe(e,i))}function Pa(t,e){t.recursionDepth_++;let n=!0;for(let i=0;i<t.eventLists_.length;i++){const s=t.eventLists_[i];if(s){const r=s.path;e(r)?(tf(t.eventLists_[i]),t.eventLists_[i]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function tf(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const i=n.getEventRunner();At&&G("event: "+n.toString()),wt(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nf="repo_interrupt",sf=25;class rf{constructor(e,n,i,s){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new ef,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=wn(),this.transactionQueueTree_=new ys,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function of(t,e,n){if(t.stats_=Ki(t.repoInfo_),t.forceRestClient_||Mh())t.server_=new yn(t.repoInfo_,(i,s,r,o)=>{Ur(t,i,s,r,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>Br(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{H(n)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}t.persistentConnection_=new Se(t.repoInfo_,e,(i,s,r,o)=>{Ur(t,i,s,r,o)},i=>{Br(t,i)},i=>{af(t,i)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(i=>{t.server_.refreshAuthToken(i)}),t.appCheckProvider_.addTokenChangeListener(i=>{t.server_.refreshAppCheckToken(i.token)}),t.statsReporter_=$h(t.repoInfo_,()=>new Vu(t.stats_,t.server_)),t.infoData_=new Lu,t.infoSyncTree_=new Lr({startListening:(i,s,r,o)=>{let a=[];const c=t.infoData_.getNode(i._path);return c.isEmpty()||(a=Yt(t.infoSyncTree_,i._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Cs(t,"connected",!1),t.serverSyncTree_=new Lr({startListening:(i,s,r,o)=>(t.server_.listen(i,r,s,(a,c)=>{const l=o(a,c);se(t.eventQueue_,i._path,l)}),[]),stopListening:(i,s)=>{t.server_.unlisten(i,s)}})}function Da(t){const n=t.infoData_.getNode(new P(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function Zt(t){return Vd({timestamp:Da(t)})}function Ur(t,e,n,i,s){t.dataUpdateCount++;const r=new P(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(s)if(i){const c=hn(n,l=>$(l));o=Md(t.serverSyncTree_,r,c,s)}else{const c=$(n);o=Ca(t.serverSyncTree_,r,c,s)}else if(i){const c=hn(n,l=>$(l));o=Dd(t.serverSyncTree_,r,c)}else{const c=$(n);o=Yt(t.serverSyncTree_,r,c)}let a=r;o.length>0&&(a=gt(t,r)),se(t.eventQueue_,a,o)}function Br(t,e){Cs(t,"connected",e),e===!1&&uf(t)}function af(t,e){Y(e,(n,i)=>{Cs(t,n,i)})}function Cs(t,e,n){const i=new P("/.info/"+e),s=$(n);t.infoData_.updateSnapshot(i,s);const r=Yt(t.infoSyncTree_,i,s);se(t.eventQueue_,i,r)}function Jn(t){return t.nextWriteId_++}function lf(t,e,n){const i=Ld(t.serverSyncTree_,e);return i!=null?Promise.resolve(i):t.server_.get(e).then(s=>{const r=$(s).withIndex(e._queryParams.getIndex());xi(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=Yt(t.serverSyncTree_,e._path,r);else{const a=$t(t.serverSyncTree_,e);o=Ca(t.serverSyncTree_,e._path,r,a)}return se(t.eventQueue_,e._path,o),An(t.serverSyncTree_,e,n,null,!0),r},s=>(Et(t,"get for query "+H(e)+" failed: "+s),Promise.reject(new Error(s))))}function cf(t,e,n,i,s){Et(t,"set",{path:e.toString(),value:n,priority:i});const r=Zt(t),o=$(n,i),a=qn(t.serverSyncTree_,e),c=gs(o,a,r),l=Jn(t),m=hs(t.serverSyncTree_,e,c,l,!0);Qn(t.eventQueue_,m),t.server_.put(e.toString(),o.val(!0),(p,E)=>{const C=p==="ok";C||Z("set at "+e+" failed: "+p);const T=Ne(t.serverSyncTree_,l,!C);se(t.eventQueue_,e,T),Li(t,s,p,E)});const f=bs(t,e);gt(t,f),se(t.eventQueue_,f,[])}function hf(t,e,n,i){Et(t,"update",{path:e.toString(),value:n});let s=!0;const r=Zt(t),o={};if(Y(n,(a,c)=>{s=!1,o[a]=Sa(L(e,a),$(c),t.serverSyncTree_,r)}),s)G("update() called with empty data.  Don't do anything."),Li(t,i,"ok",void 0);else{const a=Jn(t),c=Pd(t.serverSyncTree_,e,o,a);Qn(t.eventQueue_,c),t.server_.merge(e.toString(),n,(l,m)=>{const f=l==="ok";f||Z("update at "+e+" failed: "+l);const p=Ne(t.serverSyncTree_,a,!f),E=p.length>0?gt(t,e):e;se(t.eventQueue_,E,p),Li(t,i,l,m)}),Y(n,l=>{const m=bs(t,L(e,l));gt(t,m)}),se(t.eventQueue_,e,[])}}function uf(t){Et(t,"onDisconnectEvents");const e=Zt(t),n=wn();ki(t.onDisconnect_,R(),(s,r)=>{const o=Sa(s,r,t.serverSyncTree_,e);aa(n,s,o)});let i=[];ki(n,R(),(s,r)=>{i=i.concat(Yt(t.serverSyncTree_,s,r));const o=bs(t,s);gt(t,o)}),t.onDisconnect_=wn(),se(t.eventQueue_,R(),i)}function df(t,e,n){let i;S(e._path)===".info"?i=xi(t.infoSyncTree_,e,n):i=xi(t.serverSyncTree_,e,n),Ra(t.eventQueue_,e._path,i)}function Oa(t,e,n){let i;S(e._path)===".info"?i=An(t.infoSyncTree_,e,n):i=An(t.serverSyncTree_,e,n),Ra(t.eventQueue_,e._path,i)}function ff(t){t.persistentConnection_&&t.persistentConnection_.interrupt(nf)}function Et(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),G(n,...e)}function Li(t,e,n,i){e&&wt(()=>{if(n==="ok")e(null);else{const s=(n||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function pf(t,e,n,i,s,r){Et(t,"transaction on "+e);const o={path:e,update:n,onComplete:i,status:null,order:Ro(),applyLocally:r,retryCount:0,unwatcher:s,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},a=Ts(t,e,void 0);o.currentInputSnapshot=a;const c=o.update(a.val());if(c===void 0)o.unwatcher(),o.currentOutputSnapshotRaw=null,o.currentOutputSnapshotResolved=null,o.onComplete&&o.onComplete(null,!1,o.currentInputSnapshot);else{Xt("transaction failed: Data returned ",c,o.path),o.status=0;const l=Gn(t.transactionQueueTree_,e),m=at(l)||[];m.push(o),ws(l,m);let f;typeof c=="object"&&c!==null&&pe(c,".priority")?(f=Qe(c,".priority"),v(kn(f),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):f=(qn(t.serverSyncTree_,e)||I.EMPTY_NODE).getPriority().val();const p=Zt(t),E=$(c,f),C=gs(E,a,p);o.currentOutputSnapshotRaw=E,o.currentOutputSnapshotResolved=C,o.currentWriteId=Jn(t);const T=hs(t.serverSyncTree_,e,C,o.currentWriteId,o.applyLocally);se(t.eventQueue_,e,T),Xn(t,t.transactionQueueTree_)}}function Ts(t,e,n){return qn(t.serverSyncTree_,e,n)||I.EMPTY_NODE}function Xn(t,e=t.transactionQueueTree_){if(e||Zn(t,e),at(e)){const n=Ma(t,e);v(n.length>0,"Sending zero length transaction queue"),n.every(s=>s.status===0)&&_f(t,Qt(e),n)}else Aa(e)&&Kn(e,n=>{Xn(t,n)})}function _f(t,e,n){const i=n.map(l=>l.currentWriteId),s=Ts(t,e,i);let r=s;const o=s.hash();for(let l=0;l<n.length;l++){const m=n[l];v(m.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),m.status=1,m.retryCount++;const f=J(e,m.path);r=r.updateChild(f,m.currentOutputSnapshotRaw)}const a=r.val(!0),c=e;t.server_.put(c.toString(),a,l=>{Et(t,"transaction put response",{path:c.toString(),status:l});let m=[];if(l==="ok"){const f=[];for(let p=0;p<n.length;p++)n[p].status=2,m=m.concat(Ne(t.serverSyncTree_,n[p].currentWriteId)),n[p].onComplete&&f.push(()=>n[p].onComplete(null,!0,n[p].currentOutputSnapshotResolved)),n[p].unwatcher();Zn(t,Gn(t.transactionQueueTree_,e)),Xn(t,t.transactionQueueTree_),se(t.eventQueue_,e,m);for(let p=0;p<f.length;p++)wt(f[p])}else{if(l==="datastale")for(let f=0;f<n.length;f++)n[f].status===3?n[f].status=4:n[f].status=0;else{Z("transaction at "+c.toString()+" failed: "+l);for(let f=0;f<n.length;f++)n[f].status=4,n[f].abortReason=l}gt(t,e)}},o)}function gt(t,e){const n=xa(t,e),i=Qt(n),s=Ma(t,n);return gf(t,s,i),i}function gf(t,e,n){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const c=e[a],l=J(n,c.path);let m=!1,f;if(v(l!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)m=!0,f=c.abortReason,s=s.concat(Ne(t.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=sf)m=!0,f="maxretry",s=s.concat(Ne(t.serverSyncTree_,c.currentWriteId,!0));else{const p=Ts(t,c.path,o);c.currentInputSnapshot=p;const E=e[a].update(p.val());if(E!==void 0){Xt("transaction failed: Data returned ",E,c.path);let C=$(E);typeof E=="object"&&E!=null&&pe(E,".priority")||(C=C.updatePriority(p.getPriority()));const b=c.currentWriteId,V=Zt(t),Q=gs(C,p,V);c.currentOutputSnapshotRaw=C,c.currentOutputSnapshotResolved=Q,c.currentWriteId=Jn(t),o.splice(o.indexOf(b),1),s=s.concat(hs(t.serverSyncTree_,c.path,Q,c.currentWriteId,c.applyLocally)),s=s.concat(Ne(t.serverSyncTree_,b,!0))}else m=!0,f="nodata",s=s.concat(Ne(t.serverSyncTree_,c.currentWriteId,!0))}se(t.eventQueue_,n,s),s=[],m&&(e[a].status=2,function(p){setTimeout(p,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(f==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(f),!1,null))))}Zn(t,t.transactionQueueTree_);for(let a=0;a<i.length;a++)wt(i[a]);Xn(t,t.transactionQueueTree_)}function xa(t,e){let n,i=t.transactionQueueTree_;for(n=S(e);n!==null&&at(i)===void 0;)i=Gn(i,n),e=x(e),n=S(e);return i}function Ma(t,e){const n=[];return La(t,e,n),n.sort((i,s)=>i.order-s.order),n}function La(t,e,n){const i=at(e);if(i)for(let s=0;s<i.length;s++)n.push(i[s]);Kn(e,s=>{La(t,s,n)})}function Zn(t,e){const n=at(e);if(n){let i=0;for(let s=0;s<n.length;s++)n[s].status!==2&&(n[i]=n[s],i++);n.length=i,ws(e,n.length>0?n:void 0)}Kn(e,i=>{Zn(t,i)})}function bs(t,e){const n=Qt(xa(t,e)),i=Gn(t.transactionQueueTree_,e);return qd(i,s=>{di(t,s)}),di(t,i),ka(i,s=>{di(t,s)}),n}function di(t,e){const n=at(e);if(n){const i=[];let s=[],r=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(v(r===o-1,"All SENT items should be at beginning of queue."),r=o,n[o].status=3,n[o].abortReason="set"):(v(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),s=s.concat(Ne(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&i.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?ws(e,void 0):n.length=r+1,se(t.eventQueue_,Qt(e),s);for(let o=0;o<i.length;o++)wt(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mf(t){let e="";const n=t.split("/");for(let i=0;i<n.length;i++)if(n[i].length>0){let s=n[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function yf(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const i=n.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):Z(`Invalid query segment '${n}' in query '${t}'`)}return e}const $r=function(t,e){const n=wf(t),i=n.namespace;n.domain==="firebase.com"&&ke(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&n.domain!=="localhost"&&ke("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||Sh();const s=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new Ho(n.host,n.secure,i,s,e,"",i!==n.subdomain),path:new P(n.pathString)}},wf=function(t){let e="",n="",i="",s="",r="",o=!0,a="https",c=443;if(typeof t=="string"){let l=t.indexOf("//");l>=0&&(a=t.substring(0,l-1),t=t.substring(l+2));let m=t.indexOf("/");m===-1&&(m=t.length);let f=t.indexOf("?");f===-1&&(f=t.length),e=t.substring(0,Math.min(m,f)),m<f&&(s=mf(t.substring(m,f)));const p=yf(t.substring(Math.min(t.length,f)));l=e.indexOf(":"),l>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(l+1),10)):l=e.length;const E=e.slice(0,l);if(E.toLowerCase()==="localhost")n="localhost";else if(E.split(".").length<=2)n=E;else{const C=e.indexOf(".");i=e.substring(0,C).toLowerCase(),n=e.substring(C+1),r=i}"ns"in p&&(r=p.ns)}return{host:e,port:c,domain:n,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vr="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",vf=function(){let t=0;const e=[];return function(n){const i=n===t;t=n;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=Vr.charAt(n%64),n=Math.floor(n/64);v(n===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=Vr.charAt(e[s]);return v(o.length===20,"nextPushId: Length should be 20."),o}}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ef{constructor(e,n,i,s){this.eventType=e,this.eventRegistration=n,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+H(this.snapshot.exportVal())}}class Cf{constructor(e,n,i){this.eventRegistration=e,this.error=n,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Is{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return v(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class lt{constructor(e,n,i,s){this._repo=e,this._path=n,this._queryParams=i,this._orderByCalled=s}get key(){return A(this._path)?null:Qi(this._path)}get ref(){return new we(this._repo,this._path)}get _queryIdentifier(){const e=Sr(this._queryParams),n=zi(e);return n==="{}"?"default":n}get _queryObject(){return Sr(this._queryParams)}isEqual(e){if(e=ee(e),!(e instanceof lt))return!1;const n=this._repo===e._repo,i=Ji(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return n&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+cu(this._path)}}function Tf(t,e){if(t._orderByCalled===!0)throw new Error(e+": You can't combine multiple orderBy calls.")}function Ss(t){let e=null,n=null;if(t.hasStart()&&(e=t.getIndexStartValue()),t.hasEnd()&&(n=t.getIndexEndValue()),t.getIndex()===Ye){const i="Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",s="Query: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string.";if(t.hasStart()){if(t.getIndexStartName()!==Xe)throw new Error(i);if(typeof e!="string")throw new Error(s)}if(t.hasEnd()){if(t.getIndexEndName()!==Me)throw new Error(i);if(typeof n!="string")throw new Error(s)}}else if(t.getIndex()===M){if(e!=null&&!kn(e)||n!=null&&!kn(n))throw new Error("Query: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string).")}else if(v(t.getIndex()instanceof es||t.getIndex()===ra,"unknown index type."),e!=null&&typeof e=="object"||n!=null&&typeof n=="object")throw new Error("Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.")}function Fa(t){if(t.hasStart()&&t.hasEnd()&&t.hasLimit()&&!t.hasAnchoredLimit())throw new Error("Query: Can't combine startAt(), startAfter(), endAt(), endBefore(), and limit(). Use limitToFirst() or limitToLast() instead.")}class we extends lt{constructor(e,n){super(e,n,new ns,!1)}get parent(){const e=Xo(this._path);return e===null?null:new we(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class mt{constructor(e,n,i){this._node=e,this.ref=n,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new P(e),i=Vt(this.ref,e);return new mt(this._node.getChild(n),i,M)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new mt(s,Vt(this.ref,i),M)))}hasChild(e){const n=new P(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function bg(t,e){return t=ee(t),t._checkNotDeleted("ref"),e!==void 0?Vt(t._root,e):t._root}function Vt(t,e){return t=ee(t),S(t._path)===null?Xd("child","path",e):Es("child","path",e),new we(t._repo,L(t._path,e))}function Ig(t,e){t=ee(t),Yn("push",t._path),Jt("push",e,t._path,!0);const n=Da(t._repo),i=vf(n),s=Vt(t,i),r=Vt(t,i);let o;return e!=null?o=Ua(r,e).then(()=>r):o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function Sg(t){return Yn("remove",t._path),Ua(t,null)}function Ua(t,e){t=ee(t),Yn("set",t._path),Jt("set",e,t._path,!1);const n=new me;return cf(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function Ag(t,e){Jd("update",e,t._path);const n=new me;return hf(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function kg(t){t=ee(t);const e=new Is(()=>{}),n=new en(e);return lf(t._repo,t,n).then(i=>new mt(i,new we(t._repo,t._path),t._queryParams.getIndex()))}class en{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const i=n._queryParams.getIndex();return new Ef("value",this,new mt(e.snapshotNode,new we(n._repo,n._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new Cf(this,e,n):null}matches(e){return e instanceof en?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function bf(t,e,n,i,s){const r=new Is(n,void 0),o=new en(r);return df(t._repo,t,o),()=>Oa(t._repo,t,o)}function If(t,e,n,i){return bf(t,"value",e)}function Ng(t,e,n){let i=null;const s=n?new Is(n):null;i=new en(s),Oa(t._repo,t,i)}class tn{}class Ba extends tn{constructor(e,n){super(),this._value=e,this._key=n,this.type="endAt"}_apply(e){Jt("endAt",this._value,e._path,!0);const n=xu(e._queryParams,this._value,this._key);if(Fa(n),Ss(n),e._queryParams.hasEnd())throw new Error("endAt: Starting point was already set (by another call to endAt, endBefore or equalTo).");return new lt(e._repo,e._path,n,e._orderByCalled)}}function Rg(t,e){return new Ba(t,e)}class $a extends tn{constructor(e,n){super(),this._value=e,this._key=n,this.type="startAt"}_apply(e){Jt("startAt",this._value,e._path,!0);const n=Ou(e._queryParams,this._value,this._key);if(Fa(n),Ss(n),e._queryParams.hasStart())throw new Error("startAt: Starting point was already set (by another call to startAt, startBefore or equalTo).");return new lt(e._repo,e._path,n,e._orderByCalled)}}function Pg(t=null,e){return new $a(t,e)}class Sf extends tn{constructor(e){super(),this._limit=e,this.type="limitToLast"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).");return new lt(e._repo,e._path,Du(e._queryParams,this._limit),e._orderByCalled)}}function Dg(t){if(Math.floor(t)!==t||t<=0)throw new Error("limitToLast: First argument must be a positive integer.");return new Sf(t)}class Af extends tn{constructor(e){super(),this._path=e,this.type="orderByChild"}_apply(e){Tf(e,"orderByChild");const n=new P(this._path);if(A(n))throw new Error("orderByChild: cannot pass in empty path. Use orderByValue() instead.");const i=new es(n),s=Mu(e._queryParams,i);return Ss(s),new lt(e._repo,e._path,s,!0)}}function Og(t){if(t==="$key")throw new Error('orderByChild: "$key" is invalid.  Use orderByKey() instead.');if(t==="$priority")throw new Error('orderByChild: "$priority" is invalid.  Use orderByPriority() instead.');if(t==="$value")throw new Error('orderByChild: "$value" is invalid.  Use orderByValue() instead.');return Es("orderByChild","path",t),new Af(t)}class kf extends tn{constructor(e,n){super(),this._value=e,this._key=n,this.type="equalTo"}_apply(e){if(Jt("equalTo",this._value,e._path,!1),e._queryParams.hasStart())throw new Error("equalTo: Starting point was already set (by another call to startAt/startAfter or equalTo).");if(e._queryParams.hasEnd())throw new Error("equalTo: Ending point was already set (by another call to endAt/endBefore or equalTo).");return new Ba(this._value,this._key)._apply(new $a(this._value,this._key)._apply(e))}}function xg(t,e){return new kf(t,e)}function Mg(t,...e){let n=ee(t);for(const i of e)n=i._apply(n);return n}Td(we);kd(we);/**
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
 */const Nf="FIREBASE_DATABASE_EMULATOR_HOST",Fi={};let Rf=!1;function Pf(t,e,n,i){const s=e.lastIndexOf(":"),r=e.substring(0,s),o=xn(r);t.repoInfo_=new Ho(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),i&&(t.authTokenProvider_=i)}function Df(t,e,n,i,s){let r=i||t.options.databaseURL;r===void 0&&(t.options.projectId||ke("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),G("Using default host for project ",t.options.projectId),r=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=$r(r,s),a=o.repoInfo,c;typeof process<"u"&&lr&&(c=lr[Nf]),c?(r=`http://${c}?ns=${a.namespace}`,o=$r(r,s),a=o.repoInfo):o.repoInfo.secure;const l=new Fh(t.name,t.options,e);Zd("Invalid Firebase Database URL",o),A(o.path)||ke("Database URL must point to the root of a Firebase Database (not including a child path).");const m=xf(a,t,l,new Lh(t,n));return new Mf(m,t)}function Of(t,e){const n=Fi[e];(!n||n[t.key]!==t)&&ke(`Database ${e}(${t.repoInfo_}) has already been deleted.`),ff(t),delete n[t.key]}function xf(t,e,n,i){let s=Fi[e.name];s||(s={},Fi[e.name]=s);let r=s[t.toURLString()];return r&&ke("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new rf(t,Rf,n,i),s[t.toURLString()]=r,r}class Mf{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(of(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new we(this._repo,R())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Of(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&ke("Cannot call "+e+" on a deleted database.")}}function Lg(t=Bn(),e){const n=st(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const i=po("database");i&&Lf(n,...i)}return n}function Lf(t,e,n,i={}){t=ee(t),t._checkNotDeleted("useEmulator");const s=`${e}:${n}`,r=t._repoInternal;if(t._instanceStarted){if(s===t._repoInternal.repoInfo_.host&&un(i,r.repoInfo_.emulatorOptions))return;ke("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&ke('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new ln(ln.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:mo(i.mockUserToken,t.app.options.projectId);o=new ln(a)}xn(e)&&(go(e),yo("Database",!0)),Pf(r,s,i,o)}/**
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
 */function Ff(t){Eh(Wi),le(new ie("database",(e,{instanceIdentifier:n})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return Df(i,s,r,n)},"PUBLIC").setMultipleInstances(!0)),X(cr,hr,t),X(cr,hr,"esm2020")}/**
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
 */const Uf={".sv":"timestamp"};function Fg(){return Uf}/**
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
 */class Bf{constructor(e,n){this.committed=e,this.snapshot=n}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function Ug(t,e,n){if(t=ee(t),Yn("Reference.transaction",t._path),t.key===".length"||t.key===".keys")throw"Reference.transaction failed: "+t.key+" is a read-only object.";const i=(n==null?void 0:n.applyLocally)??!0,s=new me,r=(a,c,l)=>{let m=null;a?s.reject(a):(m=new mt(l,new we(t._repo,t._path),M),s.resolve(new Bf(c,m)))},o=If(t,()=>{});return pf(t._repo,t._path,e,r,o,i),s.promise}Se.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};Se.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};Ff();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Va="firebasestorage.googleapis.com",$f="storageBucket",Vf=2*60*1e3,Wf=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve extends Be{constructor(e,n,i=0){super(fi(e),`Firebase Storage: ${n} (${fi(e)})`),this.status_=i,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,ve.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return fi(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var ye;(function(t){t.UNKNOWN="unknown",t.OBJECT_NOT_FOUND="object-not-found",t.BUCKET_NOT_FOUND="bucket-not-found",t.PROJECT_NOT_FOUND="project-not-found",t.QUOTA_EXCEEDED="quota-exceeded",t.UNAUTHENTICATED="unauthenticated",t.UNAUTHORIZED="unauthorized",t.UNAUTHORIZED_APP="unauthorized-app",t.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",t.INVALID_CHECKSUM="invalid-checksum",t.CANCELED="canceled",t.INVALID_EVENT_NAME="invalid-event-name",t.INVALID_URL="invalid-url",t.INVALID_DEFAULT_BUCKET="invalid-default-bucket",t.NO_DEFAULT_BUCKET="no-default-bucket",t.CANNOT_SLICE_BLOB="cannot-slice-blob",t.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",t.NO_DOWNLOAD_URL="no-download-url",t.INVALID_ARGUMENT="invalid-argument",t.INVALID_ARGUMENT_COUNT="invalid-argument-count",t.APP_DELETED="app-deleted",t.INVALID_ROOT_OPERATION="invalid-root-operation",t.INVALID_FORMAT="invalid-format",t.INTERNAL_ERROR="internal-error",t.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(ye||(ye={}));function fi(t){return"storage/"+t}function Hf(){const t="An unknown error occurred, please check the error payload for server response.";return new ve(ye.UNKNOWN,t)}function jf(){return new ve(ye.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function qf(){return new ve(ye.CANCELED,"User canceled the upload/download.")}function zf(t){return new ve(ye.INVALID_URL,"Invalid URL '"+t+"'.")}function Gf(t){return new ve(ye.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function Wr(t){return new ve(ye.INVALID_ARGUMENT,t)}function Wa(){return new ve(ye.APP_DELETED,"The Firebase app was deleted.")}function Kf(t){return new ve(ye.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(e,n){this.bucket=e,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,n){let i;try{i=de.makeFromUrl(e,n)}catch{return new de(e,"")}if(i.path==="")return i;throw Gf(e)}static makeFromUrl(e,n){let i=null;const s="([A-Za-z0-9.\\-_]+)";function r(B){B.path.charAt(B.path.length-1)==="/"&&(B.path_=B.path_.slice(0,-1))}const o="(/(.*))?$",a=new RegExp("^gs://"+s+o,"i"),c={bucket:1,path:3};function l(B){B.path_=decodeURIComponent(B.path)}const m="v[A-Za-z0-9_]+",f=n.replace(/[.]/g,"\\."),p="(/([^?#]*).*)?$",E=new RegExp(`^https?://${f}/${m}/b/${s}/o${p}`,"i"),C={bucket:1,path:3},T=n===Va?"(?:storage.googleapis.com|storage.cloud.google.com)":n,b="([^?#]*)",V=new RegExp(`^https?://${T}/${s}/${b}`,"i"),U=[{regex:a,indices:c,postModify:r},{regex:E,indices:C,postModify:l},{regex:V,indices:{bucket:1,path:2},postModify:l}];for(let B=0;B<U.length;B++){const $e=U[B],_e=$e.regex.exec(e);if(_e){const y=_e[$e.indices.bucket];let h=_e[$e.indices.path];h||(h=""),i=new de(y,h),$e.postModify(i);break}}if(i==null)throw zf(e);return i}}class Yf{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qf(t,e,n){let i=1,s=null,r=null,o=!1,a=0;function c(){return a===2}let l=!1;function m(...b){l||(l=!0,e.apply(null,b))}function f(b){s=setTimeout(()=>{s=null,t(E,c())},b)}function p(){r&&clearTimeout(r)}function E(b,...V){if(l){p();return}if(b){p(),m.call(null,b,...V);return}if(c()||o){p(),m.call(null,b,...V);return}i<64&&(i*=2);let U;a===1?(a=2,U=0):U=(i+Math.random())*1e3,f(U)}let C=!1;function T(b){C||(C=!0,p(),!l&&(s!==null?(b||(a=2),clearTimeout(s),f(0)):b||(a=1)))}return f(0),r=setTimeout(()=>{o=!0,T(!0)},n),T}function Jf(t){t(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xf(t){return t!==void 0}function Hr(t,e,n,i){if(i<e)throw Wr(`Invalid value for '${t}'. Expected ${e} or greater.`);if(i>n)throw Wr(`Invalid value for '${t}'. Expected ${n} or less.`)}function Zf(t){const e=encodeURIComponent;let n="?";for(const i in t)if(t.hasOwnProperty(i)){const s=e(i)+"="+e(t[i]);n=n+s+"&"}return n=n.slice(0,-1),n}var Nn;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(Nn||(Nn={}));/**
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
 */function ep(t,e){const n=t>=500&&t<600,s=[408,429].indexOf(t)!==-1,r=e.indexOf(t)!==-1;return n||s||r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tp{constructor(e,n,i,s,r,o,a,c,l,m,f,p=!0,E=!1){this.url_=e,this.method_=n,this.headers_=i,this.body_=s,this.successCodes_=r,this.additionalRetryCodes_=o,this.callback_=a,this.errorCallback_=c,this.timeout_=l,this.progressCallback_=m,this.connectionFactory_=f,this.retry=p,this.isUsingEmulator=E,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((C,T)=>{this.resolve_=C,this.reject_=T,this.start_()})}start_(){const e=(i,s)=>{if(s){i(!1,new rn(!1,null,!0));return}const r=this.connectionFactory_();this.pendingConnection_=r;const o=a=>{const c=a.loaded,l=a.lengthComputable?a.total:-1;this.progressCallback_!==null&&this.progressCallback_(c,l)};this.progressCallback_!==null&&r.addUploadProgressListener(o),r.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&r.removeUploadProgressListener(o),this.pendingConnection_=null;const a=r.getErrorCode()===Nn.NO_ERROR,c=r.getStatus();if(!a||ep(c,this.additionalRetryCodes_)&&this.retry){const m=r.getErrorCode()===Nn.ABORT;i(!1,new rn(!1,null,m));return}const l=this.successCodes_.indexOf(c)!==-1;i(!0,new rn(l,r))})},n=(i,s)=>{const r=this.resolve_,o=this.reject_,a=s.connection;if(s.wasSuccessCode)try{const c=this.callback_(a,a.getResponse());Xf(c)?r(c):r()}catch(c){o(c)}else if(a!==null){const c=Hf();c.serverResponse=a.getErrorText(),this.errorCallback_?o(this.errorCallback_(a,c)):o(c)}else if(s.canceled){const c=this.appDelete_?Wa():qf();o(c)}else{const c=jf();o(c)}};this.canceled_?n(!1,new rn(!1,null,!0)):this.backoffId_=Qf(e,n,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&Jf(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class rn{constructor(e,n,i){this.wasSuccessCode=e,this.connection=n,this.canceled=!!i}}function np(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function ip(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function sp(t,e){e&&(t["X-Firebase-GMPID"]=e)}function rp(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function op(t,e,n,i,s,r,o=!0,a=!1){const c=Zf(t.urlParams),l=t.url+c,m=Object.assign({},t.headers);return sp(m,e),np(m,n),ip(m,r),rp(m,i),new tp(l,t.method,m,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,s,o,a)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ap(t){if(t.length===0)return null;const e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function lp(t){const e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
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
 */class Rn{constructor(e,n){this._service=e,n instanceof de?this._location=n:this._location=de.makeFromUrl(n,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,n){return new Rn(e,n)}get root(){const e=new de(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return lp(this._location.path)}get storage(){return this._service}get parent(){const e=ap(this._location.path);if(e===null)return null;const n=new de(this._location.bucket,e);return new Rn(this._service,n)}_throwIfRoot(e){if(this._location.path==="")throw Kf(e)}}function jr(t,e){const n=e==null?void 0:e[$f];return n==null?null:de.makeFromBucketSpec(n,t)}function cp(t,e,n,i={}){t.host=`${e}:${n}`;const s=xn(e);s&&(go(`https://${t.host}/b`),yo("Storage",!0)),t._isUsingEmulator=!0,t._protocol=s?"https":"http";const{mockUserToken:r}=i;r&&(t._overrideAuthToken=typeof r=="string"?r:mo(r,t.app.options.projectId))}class hp{constructor(e,n,i,s,r,o=!1){this.app=e,this._authProvider=n,this._appCheckProvider=i,this._url=s,this._firebaseVersion=r,this._isUsingEmulator=o,this._bucket=null,this._host=Va,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Vf,this._maxUploadRetryTime=Wf,this._requests=new Set,s!=null?this._bucket=de.makeFromBucketSpec(s,this._host):this._bucket=jr(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=de.makeFromBucketSpec(this._url,e):this._bucket=jr(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Hr("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Hr("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const n=await e.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){if(Vi(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Rn(this,e)}_makeRequest(e,n,i,s,r=!0){if(this._deleted)return new Yf(Wa());{const o=op(e,this._appId,i,s,n,this._firebaseVersion,r,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,n){const[i,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,i,s).getPromise()}}const qr="@firebase/storage",zr="0.14.0";/**
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
 */const Ha="storage";function Bg(t=Bn(),e){t=ee(t);const i=st(t,Ha).getImmediate({identifier:e}),s=po("storage");return s&&up(i,...s),i}function up(t,e,n,i={}){cp(t,e,n,i)}function dp(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),i=t.getProvider("auth-internal"),s=t.getProvider("app-check-internal");return new hp(n,i,s,e,Wi)}function fp(){le(new ie(Ha,dp,"PUBLIC").setMultipleInstances(!0)),X(qr,zr,""),X(qr,zr,"esm2020")}fp();const ja="@firebase/installations",As="0.6.19";/**
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
 */const qa=1e4,za=`w:${As}`,Ga="FIS_v2",pp="https://firebaseinstallations.googleapis.com/v1",_p=60*60*1e3,gp="installations",mp="Installations";/**
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
 */const yp={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},tt=new jt(gp,mp,yp);function Ka(t){return t instanceof Be&&t.code.includes("request-failed")}/**
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
 */function Ya({projectId:t}){return`${pp}/projects/${t}/installations`}function Qa(t){return{token:t.token,requestStatus:2,expiresIn:vp(t.expiresIn),creationTime:Date.now()}}async function Ja(t,e){const i=(await e.json()).error;return tt.create("request-failed",{requestName:t,serverCode:i.code,serverMessage:i.message,serverStatus:i.status})}function Xa({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function wp(t,{refreshToken:e}){const n=Xa(t);return n.append("Authorization",Ep(e)),n}async function Za(t){const e=await t();return e.status>=500&&e.status<600?t():e}function vp(t){return Number(t.replace("s","000"))}function Ep(t){return`${Ga} ${t}`}/**
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
 */async function Cp({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const i=Ya(t),s=Xa(t),r=e.getImmediate({optional:!0});if(r){const l=await r.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={fid:n,authVersion:Ga,appId:t.appId,sdkVersion:za},a={method:"POST",headers:s,body:JSON.stringify(o)},c=await Za(()=>fetch(i,a));if(c.ok){const l=await c.json();return{fid:l.fid||n,registrationStatus:2,refreshToken:l.refreshToken,authToken:Qa(l.authToken)}}else throw await Ja("Create Installation",c)}/**
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
 */function el(t){return new Promise(e=>{setTimeout(e,t)})}/**
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
 */function Tp(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const bp=/^[cdef][\w-]{21}$/,Ui="";function Ip(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=Sp(t);return bp.test(n)?n:Ui}catch{return Ui}}function Sp(t){return Tp(t).substr(0,22)}/**
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
 */function ei(t){return`${t.appName}!${t.appId}`}/**
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
 */const tl=new Map;function nl(t,e){const n=ei(t);il(n,e),Ap(n,e)}function il(t,e){const n=tl.get(t);if(n)for(const i of n)i(e)}function Ap(t,e){const n=kp();n&&n.postMessage({key:t,fid:e}),Np()}let ze=null;function kp(){return!ze&&"BroadcastChannel"in self&&(ze=new BroadcastChannel("[Firebase] FID Change"),ze.onmessage=t=>{il(t.data.key,t.data.fid)}),ze}function Np(){tl.size===0&&ze&&(ze.close(),ze=null)}/**
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
 */const Rp="firebase-installations-database",Pp=1,nt="firebase-installations-store";let pi=null;function ks(){return pi||(pi=Dn(Rp,Pp,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(nt)}}})),pi}async function Pn(t,e){const n=ei(t),s=(await ks()).transaction(nt,"readwrite"),r=s.objectStore(nt),o=await r.get(n);return await r.put(e,n),await s.done,(!o||o.fid!==e.fid)&&nl(t,e.fid),e}async function sl(t){const e=ei(t),i=(await ks()).transaction(nt,"readwrite");await i.objectStore(nt).delete(e),await i.done}async function ti(t,e){const n=ei(t),s=(await ks()).transaction(nt,"readwrite"),r=s.objectStore(nt),o=await r.get(n),a=e(o);return a===void 0?await r.delete(n):await r.put(a,n),await s.done,a&&(!o||o.fid!==a.fid)&&nl(t,a.fid),a}/**
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
 */async function Ns(t){let e;const n=await ti(t.appConfig,i=>{const s=Dp(i),r=Op(t,s);return e=r.registrationPromise,r.installationEntry});return n.fid===Ui?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function Dp(t){const e=t||{fid:Ip(),registrationStatus:0};return rl(e)}function Op(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(tt.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},i=xp(t,n);return{installationEntry:n,registrationPromise:i}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:Mp(t)}:{installationEntry:e}}async function xp(t,e){try{const n=await Cp(t,e);return Pn(t.appConfig,n)}catch(n){throw Ka(n)&&n.customData.serverCode===409?await sl(t.appConfig):await Pn(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function Mp(t){let e=await Gr(t.appConfig);for(;e.registrationStatus===1;)await el(100),e=await Gr(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:i}=await Ns(t);return i||n}return e}function Gr(t){return ti(t,e=>{if(!e)throw tt.create("installation-not-found");return rl(e)})}function rl(t){return Lp(t)?{fid:t.fid,registrationStatus:0}:t}function Lp(t){return t.registrationStatus===1&&t.registrationTime+qa<Date.now()}/**
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
 */async function Fp({appConfig:t,heartbeatServiceProvider:e},n){const i=Up(t,n),s=wp(t,n),r=e.getImmediate({optional:!0});if(r){const l=await r.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={installation:{sdkVersion:za,appId:t.appId}},a={method:"POST",headers:s,body:JSON.stringify(o)},c=await Za(()=>fetch(i,a));if(c.ok){const l=await c.json();return Qa(l)}else throw await Ja("Generate Auth Token",c)}function Up(t,{fid:e}){return`${Ya(t)}/${e}/authTokens:generate`}/**
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
 */async function Rs(t,e=!1){let n;const i=await ti(t.appConfig,r=>{if(!ol(r))throw tt.create("not-registered");const o=r.authToken;if(!e&&Vp(o))return r;if(o.requestStatus===1)return n=Bp(t,e),r;{if(!navigator.onLine)throw tt.create("app-offline");const a=Hp(r);return n=$p(t,a),a}});return n?await n:i.authToken}async function Bp(t,e){let n=await Kr(t.appConfig);for(;n.authToken.requestStatus===1;)await el(100),n=await Kr(t.appConfig);const i=n.authToken;return i.requestStatus===0?Rs(t,e):i}function Kr(t){return ti(t,e=>{if(!ol(e))throw tt.create("not-registered");const n=e.authToken;return jp(n)?{...e,authToken:{requestStatus:0}}:e})}async function $p(t,e){try{const n=await Fp(t,e),i={...e,authToken:n};return await Pn(t.appConfig,i),n}catch(n){if(Ka(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await sl(t.appConfig);else{const i={...e,authToken:{requestStatus:0}};await Pn(t.appConfig,i)}throw n}}function ol(t){return t!==void 0&&t.registrationStatus===2}function Vp(t){return t.requestStatus===2&&!Wp(t)}function Wp(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+_p}function Hp(t){const e={requestStatus:1,requestTime:Date.now()};return{...t,authToken:e}}function jp(t){return t.requestStatus===1&&t.requestTime+qa<Date.now()}/**
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
 */async function qp(t){const e=t,{installationEntry:n,registrationPromise:i}=await Ns(e);return i?i.catch(console.error):Rs(e).catch(console.error),n.fid}/**
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
 */async function zp(t,e=!1){const n=t;return await Gp(n),(await Rs(n,e)).token}async function Gp(t){const{registrationPromise:e}=await Ns(t);e&&await e}/**
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
 */function Kp(t){if(!t||!t.options)throw _i("App Configuration");if(!t.name)throw _i("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw _i(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function _i(t){return tt.create("missing-app-config-values",{valueName:t})}/**
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
 */const al="installations",Yp="installations-internal",Qp=t=>{const e=t.getProvider("app").getImmediate(),n=Kp(e),i=st(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:i,_delete:()=>Promise.resolve()}},Jp=t=>{const e=t.getProvider("app").getImmediate(),n=st(e,al).getImmediate();return{getId:()=>qp(n),getToken:s=>zp(n,s)}};function Xp(){le(new ie(al,Qp,"PUBLIC")),le(new ie(Yp,Jp,"PRIVATE"))}Xp();X(ja,As);X(ja,As,"esm2020");/**
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
 */const Zp="/firebase-messaging-sw.js",e_="/firebase-cloud-messaging-push-scope",ll="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",t_="https://fcmregistrations.googleapis.com/v1",cl="google.c.a.c_id",n_="google.c.a.c_l",i_="google.c.a.ts",s_="google.c.a.e",Yr=1e4;var Qr;(function(t){t[t.DATA_MESSAGE=1]="DATA_MESSAGE",t[t.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(Qr||(Qr={}));/**
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
 */var Wt;(function(t){t.PUSH_RECEIVED="push-received",t.NOTIFICATION_CLICKED="notification-clicked"})(Wt||(Wt={}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ce(t){const e=new Uint8Array(t);return btoa(String.fromCharCode(...e)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function r_(t){const e="=".repeat((4-t.length%4)%4),n=(t+e).replace(/\-/g,"+").replace(/_/g,"/"),i=atob(n),s=new Uint8Array(i.length);for(let r=0;r<i.length;++r)s[r]=i.charCodeAt(r);return s}/**
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
 */const gi="fcm_token_details_db",o_=5,Jr="fcm_token_object_Store";async function a_(t){if("databases"in indexedDB&&!(await indexedDB.databases()).map(r=>r.name).includes(gi))return null;let e=null;return(await Dn(gi,o_,{upgrade:async(i,s,r,o)=>{if(s<2||!i.objectStoreNames.contains(Jr))return;const a=o.objectStore(Jr),c=await a.index("fcmSenderId").get(t);if(await a.clear(),!!c){if(s===2){const l=c;if(!l.auth||!l.p256dh||!l.endpoint)return;e={token:l.fcmToken,createTime:l.createTime??Date.now(),subscriptionOptions:{auth:l.auth,p256dh:l.p256dh,endpoint:l.endpoint,swScope:l.swScope,vapidKey:typeof l.vapidKey=="string"?l.vapidKey:Ce(l.vapidKey)}}}else if(s===3){const l=c;e={token:l.fcmToken,createTime:l.createTime,subscriptionOptions:{auth:Ce(l.auth),p256dh:Ce(l.p256dh),endpoint:l.endpoint,swScope:l.swScope,vapidKey:Ce(l.vapidKey)}}}else if(s===4){const l=c;e={token:l.fcmToken,createTime:l.createTime,subscriptionOptions:{auth:Ce(l.auth),p256dh:Ce(l.p256dh),endpoint:l.endpoint,swScope:l.swScope,vapidKey:Ce(l.vapidKey)}}}}}})).close(),await ii(gi),await ii("fcm_vapid_details_db"),await ii("undefined"),l_(e)?e:null}function l_(t){if(!t||!t.subscriptionOptions)return!1;const{subscriptionOptions:e}=t;return typeof t.createTime=="number"&&t.createTime>0&&typeof t.token=="string"&&t.token.length>0&&typeof e.auth=="string"&&e.auth.length>0&&typeof e.p256dh=="string"&&e.p256dh.length>0&&typeof e.endpoint=="string"&&e.endpoint.length>0&&typeof e.swScope=="string"&&e.swScope.length>0&&typeof e.vapidKey=="string"&&e.vapidKey.length>0}/**
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
 */const c_="firebase-messaging-database",h_=1,it="firebase-messaging-store";let mi=null;function Ps(){return mi||(mi=Dn(c_,h_,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(it)}}})),mi}async function hl(t){const e=Os(t),i=await(await Ps()).transaction(it).objectStore(it).get(e);if(i)return i;{const s=await a_(t.appConfig.senderId);if(s)return await Ds(t,s),s}}async function Ds(t,e){const n=Os(t),s=(await Ps()).transaction(it,"readwrite");return await s.objectStore(it).put(e,n),await s.done,e}async function u_(t){const e=Os(t),i=(await Ps()).transaction(it,"readwrite");await i.objectStore(it).delete(e),await i.done}function Os({appConfig:t}){return t.appId}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const d_={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},K=new jt("messaging","Messaging",d_);/**
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
 */async function f_(t,e){const n=await Ms(t),i=dl(e),s={method:"POST",headers:n,body:JSON.stringify(i)};let r;try{r=await(await fetch(xs(t.appConfig),s)).json()}catch(o){throw K.create("token-subscribe-failed",{errorInfo:o==null?void 0:o.toString()})}if(r.error){const o=r.error.message;throw K.create("token-subscribe-failed",{errorInfo:o})}if(!r.token)throw K.create("token-subscribe-no-token");return r.token}async function p_(t,e){const n=await Ms(t),i=dl(e.subscriptionOptions),s={method:"PATCH",headers:n,body:JSON.stringify(i)};let r;try{r=await(await fetch(`${xs(t.appConfig)}/${e.token}`,s)).json()}catch(o){throw K.create("token-update-failed",{errorInfo:o==null?void 0:o.toString()})}if(r.error){const o=r.error.message;throw K.create("token-update-failed",{errorInfo:o})}if(!r.token)throw K.create("token-update-no-token");return r.token}async function ul(t,e){const i={method:"DELETE",headers:await Ms(t)};try{const r=await(await fetch(`${xs(t.appConfig)}/${e}`,i)).json();if(r.error){const o=r.error.message;throw K.create("token-unsubscribe-failed",{errorInfo:o})}}catch(s){throw K.create("token-unsubscribe-failed",{errorInfo:s==null?void 0:s.toString()})}}function xs({projectId:t}){return`${t_}/projects/${t}/registrations`}async function Ms({appConfig:t,installations:e}){const n=await e.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function dl({p256dh:t,auth:e,endpoint:n,vapidKey:i}){const s={web:{endpoint:n,auth:e,p256dh:t}};return i!==ll&&(s.web.applicationPubKey=i),s}/**
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
 */const __=7*24*60*60*1e3;async function g_(t){const e=await w_(t.swRegistration,t.vapidKey),n={vapidKey:t.vapidKey,swScope:t.swRegistration.scope,endpoint:e.endpoint,auth:Ce(e.getKey("auth")),p256dh:Ce(e.getKey("p256dh"))},i=await hl(t.firebaseDependencies);if(i){if(v_(i.subscriptionOptions,n))return Date.now()>=i.createTime+__?y_(t,{token:i.token,createTime:Date.now(),subscriptionOptions:n}):i.token;try{await ul(t.firebaseDependencies,i.token)}catch(s){console.warn(s)}return Xr(t.firebaseDependencies,n)}else return Xr(t.firebaseDependencies,n)}async function m_(t){const e=await hl(t.firebaseDependencies);e&&(await ul(t.firebaseDependencies,e.token),await u_(t.firebaseDependencies));const n=await t.swRegistration.pushManager.getSubscription();return n?n.unsubscribe():!0}async function y_(t,e){try{const n=await p_(t.firebaseDependencies,e),i={...e,token:n,createTime:Date.now()};return await Ds(t.firebaseDependencies,i),n}catch(n){throw n}}async function Xr(t,e){const i={token:await f_(t,e),createTime:Date.now(),subscriptionOptions:e};return await Ds(t,i),i.token}async function w_(t,e){const n=await t.pushManager.getSubscription();return n||t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:r_(e)})}function v_(t,e){const n=e.vapidKey===t.vapidKey,i=e.endpoint===t.endpoint,s=e.auth===t.auth,r=e.p256dh===t.p256dh;return n&&i&&s&&r}/**
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
 */function Zr(t){const e={from:t.from,collapseKey:t.collapse_key,messageId:t.fcmMessageId};return E_(e,t),C_(e,t),T_(e,t),e}function E_(t,e){if(!e.notification)return;t.notification={};const n=e.notification.title;n&&(t.notification.title=n);const i=e.notification.body;i&&(t.notification.body=i);const s=e.notification.image;s&&(t.notification.image=s);const r=e.notification.icon;r&&(t.notification.icon=r)}function C_(t,e){e.data&&(t.data=e.data)}function T_(t,e){var s,r,o,a;if(!e.fcmOptions&&!((s=e.notification)!=null&&s.click_action))return;t.fcmOptions={};const n=((r=e.fcmOptions)==null?void 0:r.link)??((o=e.notification)==null?void 0:o.click_action);n&&(t.fcmOptions.link=n);const i=(a=e.fcmOptions)==null?void 0:a.analytics_label;i&&(t.fcmOptions.analyticsLabel=i)}/**
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
 */function b_(t){return typeof t=="object"&&!!t&&cl in t}/**
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
 */function I_(t){if(!t||!t.options)throw yi("App Configuration Object");if(!t.name)throw yi("App Name");const e=["projectId","apiKey","appId","messagingSenderId"],{options:n}=t;for(const i of e)if(!n[i])throw yi(i);return{appName:t.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function yi(t){return K.create("missing-app-config-values",{valueName:t})}/**
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
 */class S_{constructor(e,n,i){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const s=I_(e);this.firebaseDependencies={app:e,appConfig:s,installations:n,analyticsProvider:i}}_delete(){return Promise.resolve()}}/**
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
 */async function fl(t){try{t.swRegistration=await navigator.serviceWorker.register(Zp,{scope:e_}),t.swRegistration.update().catch(()=>{}),await A_(t.swRegistration)}catch(e){throw K.create("failed-service-worker-registration",{browserErrorMessage:e==null?void 0:e.message})}}async function A_(t){return new Promise((e,n)=>{const i=setTimeout(()=>n(new Error(`Service worker not registered after ${Yr} ms`)),Yr),s=t.installing||t.waiting;t.active?(clearTimeout(i),e()):s?s.onstatechange=r=>{var o;((o=r.target)==null?void 0:o.state)==="activated"&&(s.onstatechange=null,clearTimeout(i),e())}:(clearTimeout(i),n(new Error("No incoming service worker found.")))})}/**
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
 */async function k_(t,e){if(!e&&!t.swRegistration&&await fl(t),!(!e&&t.swRegistration)){if(!(e instanceof ServiceWorkerRegistration))throw K.create("invalid-sw-registration");t.swRegistration=e}}/**
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
 */async function N_(t,e){e?t.vapidKey=e:t.vapidKey||(t.vapidKey=ll)}/**
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
 */async function pl(t,e){if(!navigator)throw K.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw K.create("permission-blocked");return await N_(t,e==null?void 0:e.vapidKey),await k_(t,e==null?void 0:e.serviceWorkerRegistration),g_(t)}/**
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
 */async function R_(t,e,n){const i=P_(e);(await t.firebaseDependencies.analyticsProvider.get()).logEvent(i,{message_id:n[cl],message_name:n[n_],message_time:n[i_],message_device_time:Math.floor(Date.now()/1e3)})}function P_(t){switch(t){case Wt.NOTIFICATION_CLICKED:return"notification_open";case Wt.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function D_(t,e){const n=e.data;if(!n.isFirebaseMessaging)return;t.onMessageHandler&&n.messageType===Wt.PUSH_RECEIVED&&(typeof t.onMessageHandler=="function"?t.onMessageHandler(Zr(n)):t.onMessageHandler.next(Zr(n)));const i=n.data;b_(i)&&i[s_]==="1"&&await R_(t,n.messageType,i)}const eo="@firebase/messaging",to="0.12.23";/**
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
 */const O_=t=>{const e=new S_(t.getProvider("app").getImmediate(),t.getProvider("installations-internal").getImmediate(),t.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",n=>D_(e,n)),e},x_=t=>{const e=t.getProvider("messaging").getImmediate();return{getToken:i=>pl(e,i)}};function M_(){le(new ie("messaging",O_,"PUBLIC")),le(new ie("messaging-internal",x_,"PRIVATE")),X(eo,to),X(eo,to,"esm2020")}/**
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
 */async function L_(){try{await vo()}catch{return!1}return typeof window<"u"&&Mn()&&Wl()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
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
 */async function F_(t){if(!navigator)throw K.create("only-available-in-window");return t.swRegistration||await fl(t),m_(t)}/**
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
 */function U_(t,e){if(!navigator)throw K.create("only-available-in-window");return t.onMessageHandler=e,()=>{t.onMessageHandler=null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $g(t=Bn()){return L_().then(e=>{if(!e)throw K.create("unsupported-browser")},e=>{throw K.create("indexed-db-unsupported")}),st(ee(t),"messaging").getImmediate()}async function Vg(t,e){return t=ee(t),pl(t,e)}function Wg(t){return t=ee(t),F_(t)}function Hg(t,e){return t=ee(t),U_(t,e)}M_();/**
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
 */const Bi=new Map,_l={activated:!1,tokenObservers:[]},B_={initialized:!1,enabled:!1};function j(t){return Bi.get(t)||{..._l}}function $_(t,e){return Bi.set(t,e),Bi.get(t)}function ni(){return B_}/**
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
 */const gl="https://content-firebaseappcheck.googleapis.com/v1",V_="exchangeRecaptchaV3Token",W_="exchangeDebugToken",no={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:16*60*1e3},H_=24*60*60*1e3;/**
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
 */class j_{constructor(e,n,i,s,r){if(this.operation=e,this.retryPolicy=n,this.getWaitDuration=i,this.lowerBound=s,this.upperBound=r,this.pending=null,this.nextErrorWaitInterval=s,s>r)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new me,this.pending.promise.catch(n=>{}),await q_(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new me,this.pending.promise.catch(n=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(n){this.retryPolicy(n)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const n=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),n}}}function q_(t){return new Promise(e=>{setTimeout(e,t)})}/**
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
 */const z_={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},ne=new jt("appCheck","AppCheck",z_);/**
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
 */function io(t=!1){var e;return t?(e=self.grecaptcha)==null?void 0:e.enterprise:self.grecaptcha}function Ls(t){if(!j(t).activated)throw ne.create("use-before-activation",{appName:t.name})}function ml(t){const e=Math.round(t/1e3),n=Math.floor(e/(3600*24)),i=Math.floor((e-n*3600*24)/3600),s=Math.floor((e-n*3600*24-i*3600)/60),r=e-n*3600*24-i*3600-s*60;let o="";return n&&(o+=on(n)+"d:"),i&&(o+=on(i)+"h:"),o+=on(s)+"m:"+on(r)+"s",o}function on(t){return t===0?"00":t>=10?t.toString():"0"+t}/**
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
 */async function Fs({url:t,body:e},n){const i={"Content-Type":"application/json"},s=n.getImmediate({optional:!0});if(s){const f=await s.getHeartbeatsHeader();f&&(i["X-Firebase-Client"]=f)}const r={method:"POST",body:JSON.stringify(e),headers:i};let o;try{o=await fetch(t,r)}catch(f){throw ne.create("fetch-network-error",{originalErrorMessage:f==null?void 0:f.message})}if(o.status!==200)throw ne.create("fetch-status-error",{httpStatus:o.status});let a;try{a=await o.json()}catch(f){throw ne.create("fetch-parse-error",{originalErrorMessage:f==null?void 0:f.message})}const c=a.ttl.match(/^([\d.]+)(s)$/);if(!c||!c[2]||isNaN(Number(c[1])))throw ne.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${a.ttl}`});const l=Number(c[1])*1e3,m=Date.now();return{token:a.token,expireTimeMillis:m+l,issuedAtTimeMillis:m}}function G_(t,e){const{projectId:n,appId:i,apiKey:s}=t.options;return{url:`${gl}/projects/${n}/apps/${i}:${V_}?key=${s}`,body:{recaptcha_v3_token:e}}}function yl(t,e){const{projectId:n,appId:i,apiKey:s}=t.options;return{url:`${gl}/projects/${n}/apps/${i}:${W_}?key=${s}`,body:{debug_token:e}}}/**
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
 */const K_="firebase-app-check-database",Y_=1,Ht="firebase-app-check-store",wl="debug-token";let an=null;function vl(){return an||(an=new Promise((t,e)=>{try{const n=indexedDB.open(K_,Y_);n.onsuccess=i=>{t(i.target.result)},n.onerror=i=>{var s;e(ne.create("storage-open",{originalErrorMessage:(s=i.target.error)==null?void 0:s.message}))},n.onupgradeneeded=i=>{const s=i.target.result;switch(i.oldVersion){case 0:s.createObjectStore(Ht,{keyPath:"compositeKey"})}}}catch(n){e(ne.create("storage-open",{originalErrorMessage:n==null?void 0:n.message}))}}),an)}function Q_(t){return Cl(Tl(t))}function J_(t,e){return El(Tl(t),e)}function X_(t){return El(wl,t)}function Z_(){return Cl(wl)}async function El(t,e){const i=(await vl()).transaction(Ht,"readwrite"),r=i.objectStore(Ht).put({compositeKey:t,value:e});return new Promise((o,a)=>{r.onsuccess=c=>{o()},i.onerror=c=>{var l;a(ne.create("storage-set",{originalErrorMessage:(l=c.target.error)==null?void 0:l.message}))}})}async function Cl(t){const n=(await vl()).transaction(Ht,"readonly"),s=n.objectStore(Ht).get(t);return new Promise((r,o)=>{s.onsuccess=a=>{const c=a.target.result;r(c?c.value:void 0)},n.onerror=a=>{var c;o(ne.create("storage-get",{originalErrorMessage:(c=a.target.error)==null?void 0:c.message}))}})}function Tl(t){return`${t.options.appId}-${t.name}`}/**
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
 */const Re=new Un("@firebase/app-check");/**
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
 */async function eg(t){if(Mn()){let e;try{e=await Q_(t)}catch(n){Re.warn(`Failed to read token from IndexedDB. Error: ${n}`)}return e}}function wi(t,e){return Mn()?J_(t,e).catch(n=>{Re.warn(`Failed to write token to IndexedDB. Error: ${n}`)}):Promise.resolve()}async function tg(){let t;try{t=await Z_()}catch{}if(t)return t;{const e=crypto.randomUUID();return X_(e).catch(n=>Re.warn(`Failed to persist debug token to IndexedDB. Error: ${n}`)),e}}/**
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
 */function Us(){return ni().enabled}async function Bs(){const t=ni();if(t.enabled&&t.token)return t.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function ng(){const t=uo(),e=ni();if(e.initialized=!0,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&t.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const n=new me;e.token=n,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?n.resolve(t.FIREBASE_APPCHECK_DEBUG_TOKEN):n.resolve(tg())}/**
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
 */const ig={error:"UNKNOWN_ERROR"};function sg(t){return On.encodeString(JSON.stringify(t),!1)}async function $i(t,e=!1,n=!1){const i=t.app;Ls(i);const s=j(i);let r=s.token,o;if(r&&!ut(r)&&(s.token=void 0,r=void 0),!r){const l=await s.cachedTokenPromise;l&&(ut(l)?r=l:await wi(i,void 0))}if(!e&&r&&ut(r))return{token:r.token};let a=!1;if(Us())try{s.exchangeTokenPromise||(s.exchangeTokenPromise=Fs(yl(i,await Bs()),t.heartbeatServiceProvider).finally(()=>{s.exchangeTokenPromise=void 0}),a=!0);const l=await s.exchangeTokenPromise;return await wi(i,l),s.token=l,{token:l.token}}catch(l){return l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?Re.warn(l.message):n&&Re.error(l),vi(l)}try{s.exchangeTokenPromise||(s.exchangeTokenPromise=s.provider.getToken().finally(()=>{s.exchangeTokenPromise=void 0}),a=!0),r=await j(i).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?Re.warn(l.message):n&&Re.error(l),o=l}let c;return r?o?ut(r)?c={token:r.token,internalError:o}:c=vi(o):(c={token:r.token},s.token=r,await wi(i,r)):c=vi(o),a&&Sl(i,c),c}async function rg(t){const e=t.app;Ls(e);const{provider:n}=j(e);if(Us()){const i=await Bs(),{token:s}=await Fs(yl(e,i),t.heartbeatServiceProvider);return{token:s}}else{const{token:i}=await n.getToken();return{token:i}}}function bl(t,e,n,i){const{app:s}=t,r=j(s),o={next:n,error:i,type:e};if(r.tokenObservers=[...r.tokenObservers,o],r.token&&ut(r.token)){const a=r.token;Promise.resolve().then(()=>{n({token:a.token}),so(t)}).catch(()=>{})}r.cachedTokenPromise.then(()=>so(t))}function Il(t,e){const n=j(t),i=n.tokenObservers.filter(s=>s.next!==e);i.length===0&&n.tokenRefresher&&n.tokenRefresher.isRunning()&&n.tokenRefresher.stop(),n.tokenObservers=i}function so(t){const{app:e}=t,n=j(e);let i=n.tokenRefresher;i||(i=og(t),n.tokenRefresher=i),!i.isRunning()&&n.isTokenAutoRefreshEnabled&&i.start()}function og(t){const{app:e}=t;return new j_(async()=>{const n=j(e);let i;if(n.token?i=await $i(t,!0):i=await $i(t),i.error)throw i.error;if(i.internalError)throw i.internalError},()=>!0,()=>{const n=j(e);if(n.token){let i=n.token.issuedAtTimeMillis+(n.token.expireTimeMillis-n.token.issuedAtTimeMillis)*.5+3e5;const s=n.token.expireTimeMillis-5*60*1e3;return i=Math.min(i,s),Math.max(0,i-Date.now())}else return 0},no.RETRIAL_MIN_WAIT,no.RETRIAL_MAX_WAIT)}function Sl(t,e){const n=j(t).tokenObservers;for(const i of n)try{i.type==="EXTERNAL"&&e.error!=null?i.error(e.error):i.next(e)}catch{}}function ut(t){return t.expireTimeMillis-Date.now()>0}function vi(t){return{token:sg(ig),error:t}}/**
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
 */class ag{constructor(e,n){this.app=e,this.heartbeatServiceProvider=n}_delete(){const{tokenObservers:e}=j(this.app);for(const n of e)Il(this.app,n.next);return Promise.resolve()}}function lg(t,e){return new ag(t,e)}function cg(t){return{getToken:e=>$i(t,e),getLimitedUseToken:()=>rg(t),addTokenListener:e=>bl(t,"INTERNAL",e),removeTokenListener:e=>Il(t.app,e)}}const hg="@firebase/app-check",ug="0.11.0";/**
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
 */const dg="https://www.google.com/recaptcha/api.js";function fg(t,e){const n=new me,i=j(t);i.reCAPTCHAState={initialized:n};const s=pg(t),r=io(!1);return r?ro(t,e,r,s,n):mg(()=>{const o=io(!1);if(!o)throw new Error("no recaptcha");ro(t,e,o,s,n)}),n.promise}function ro(t,e,n,i,s){n.ready(()=>{gg(t,e,n,i),s.resolve(n)})}function pg(t){const e=`fire_app_check_${t.name}`,n=document.createElement("div");return n.id=e,n.style.display="none",document.body.appendChild(n),e}async function _g(t){Ls(t);const n=await j(t).reCAPTCHAState.initialized.promise;return new Promise((i,s)=>{const r=j(t).reCAPTCHAState;n.ready(()=>{i(n.execute(r.widgetId,{action:"fire_app_check"}))})})}function gg(t,e,n,i){const s=n.render(i,{sitekey:e,size:"invisible",callback:()=>{j(t).reCAPTCHAState.succeeded=!0},"error-callback":()=>{j(t).reCAPTCHAState.succeeded=!1}}),r=j(t);r.reCAPTCHAState={...r.reCAPTCHAState,widgetId:s}}function mg(t){const e=document.createElement("script");e.src=dg,e.onload=t,document.head.appendChild(e)}/**
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
 */class Al{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){var i,s,r;wg(this._throttleData);const e=await _g(this._app).catch(o=>{throw ne.create("recaptcha-error")});if(!((i=j(this._app).reCAPTCHAState)!=null&&i.succeeded))throw ne.create("recaptcha-error");let n;try{n=await Fs(G_(this._app,e),this._heartbeatServiceProvider)}catch(o){throw(s=o.code)!=null&&s.includes("fetch-status-error")?(this._throttleData=yg(Number((r=o.customData)==null?void 0:r.httpStatus),this._throttleData),ne.create("initial-throttle",{time:ml(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):o}return this._throttleData=null,n}initialize(e){this._app=e,this._heartbeatServiceProvider=st(e,"heartbeat"),fg(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof Al?this._siteKey===e._siteKey:!1}}function yg(t,e){if(t===404||t===403)return{backoffCount:1,allowRequestsAfter:Date.now()+H_,httpStatus:t};{const n=e?e.backoffCount:0,i=tc(n,1e3,2);return{backoffCount:n+1,allowRequestsAfter:Date.now()+i,httpStatus:t}}}function wg(t){if(t&&Date.now()-t.allowRequestsAfter<=0)throw ne.create("throttled",{time:ml(t.allowRequestsAfter-Date.now()),httpStatus:t.httpStatus})}/**
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
 */function jg(t=Bn(),e){t=ee(t);const n=st(t,"app-check");if(ni().initialized||ng(),Us()&&Bs().then(s=>console.log(`App Check debug token: ${s}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),n.isInitialized()){const s=n.getImmediate(),r=n.getOptions();if(r.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&r.provider.isEqual(e.provider))return s;throw ne.create("already-initialized",{appName:t.name})}const i=n.initialize({options:e});return vg(t,e.provider,e.isTokenAutoRefreshEnabled),j(t).isTokenAutoRefreshEnabled&&bl(i,"INTERNAL",()=>{}),i}function vg(t,e,n=!1){const i=$_(t,{..._l});i.activated=!0,i.provider=e,i.cachedTokenPromise=eg(t).then(s=>(s&&ut(s)&&(i.token=s,Sl(t,{token:s.token})),s)),i.isTokenAutoRefreshEnabled=n&&t.automaticDataCollectionEnabled,!t.automaticDataCollectionEnabled&&n&&Re.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),i.provider.initialize(t)}const Eg="app-check",oo="app-check-internal";function Cg(){le(new ie(Eg,t=>{const e=t.getProvider("app").getImmediate(),n=t.getProvider("heartbeat");return lg(e,n)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,n)=>{t.getProvider(oo).initialize()})),le(new ie(oo,t=>{const e=t.getProvider("app-check").getImmediate();return cg(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),X(hg,ug)}Cg();export{Al as R,Bg as a,$g as b,jg as c,kg as d,L_ as e,Vg as f,Lg as g,Ug as h,Hc as i,Sg as j,Wg as k,Fg as l,If as m,Og as n,Hg as o,Ig as p,Mg as q,bg as r,Ua as s,xg as t,Ag as u,Dg as v,Pg as w,Rg as x,Ng as y};
