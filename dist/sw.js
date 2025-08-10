const At=()=>{};var Te={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ke=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Rt=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],a=t[n++],o=t[n++],l=((s&7)<<18|(i&63)<<12|(a&63)<<6|o&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const i=t[n++],a=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},je={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],a=s+1<t.length,o=a?t[s+1]:0,l=s+2<t.length,c=l?t[s+2]:0,p=i>>2,h=(i&3)<<4|o>>4;let E=(o&15)<<2|c>>6,B=c&63;l||(B=64,a||(E=64)),r.push(n[p],n[h],n[E],n[B])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Ke(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Rt(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],o=s<t.length?n[t.charAt(s)]:0;++s;const c=s<t.length?n[t.charAt(s)]:64;++s;const h=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||o==null||c==null||h==null)throw new kt;const E=i<<2|o>>4;if(r.push(E),c!==64){const B=o<<4&240|c>>2;if(r.push(B),h!==64){const Tt=c<<6&192|h;r.push(Tt)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class kt extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Dt=function(t){const e=Ke(t);return je.encodeByteArray(e,!0)},Ve=function(t){return Dt(t).replace(/\./g,"")},vt=function(t){try{return je.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Ot(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Nt=()=>Ot().__FIREBASE_DEFAULTS__,Mt=()=>{if(typeof process>"u"||typeof Te>"u")return;const t=Te.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Lt=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&vt(t[1]);return e&&JSON.parse(e)},Pt=()=>{try{return At()||Nt()||Mt()||Lt()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},We=()=>Pt()?.config;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Bt=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}};function qe(){try{return typeof indexedDB=="object"}catch{return!1}}function ze(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xt="FirebaseError";class O extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=xt,Object.setPrototypeOf(this,O.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,j.prototype.create)}}class j{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?Ut(i,r):"Error",o=`${this.serviceName}: ${a} (${s}).`;return new O(s,o,r)}}function Ut(t,e){return t.replace($t,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const $t=/\{\$([^}]+)}/g;function ie(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],a=e[s];if(Ae(i)&&Ae(a)){if(!ie(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function Ae(t){return t!==null&&typeof t=="object"}/**
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
 */function Ge(t){return t&&t._delegate?t._delegate:t}class T{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const C="[DEFAULT]";/**
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
 */class Ft{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new Bt;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Kt(e))try{this.getOrInitializeService({instanceIdentifier:C})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=C){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=C){return this.instances.has(e)}getOptions(e=C){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,a]of this.instancesDeferred.entries()){const o=this.normalizeInstanceIdentifier(i);r===o&&a.resolve(s)}return s}onInit(e,n){const r=this.normalizeInstanceIdentifier(n),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Ht(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=C){return this.component?this.component.multipleInstances?e:C:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Ht(t){return t===C?void 0:t}function Kt(t){return t.instantiationMode==="EAGER"}/**
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
 */class jt{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Ft(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var u;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(u||(u={}));const Vt={debug:u.DEBUG,verbose:u.VERBOSE,info:u.INFO,warn:u.WARN,error:u.ERROR,silent:u.SILENT},Wt=u.INFO,qt={[u.DEBUG]:"log",[u.VERBOSE]:"log",[u.INFO]:"info",[u.WARN]:"warn",[u.ERROR]:"error"},zt=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=qt[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Gt{constructor(e){this.name=e,this._logLevel=Wt,this._logHandler=zt,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in u))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Vt[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,u.DEBUG,...e),this._logHandler(this,u.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,u.VERBOSE,...e),this._logHandler(this,u.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,u.INFO,...e),this._logHandler(this,u.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,u.WARN,...e),this._logHandler(this,u.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,u.ERROR,...e),this._logHandler(this,u.ERROR,...e)}}const Jt=(t,e)=>e.some(n=>t instanceof n);let Re,ke;function Yt(){return Re||(Re=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Xt(){return ke||(ke=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Je=new WeakMap,ae=new WeakMap,Ye=new WeakMap,z=new WeakMap,fe=new WeakMap;function Qt(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",a)},i=()=>{n(b(t.result)),s()},a=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",a)});return e.then(n=>{n instanceof IDBCursor&&Je.set(n,t)}).catch(()=>{}),fe.set(e,t),e}function Zt(t){if(ae.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",a),t.removeEventListener("abort",a)},i=()=>{n(),s()},a=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",a),t.addEventListener("abort",a)});ae.set(t,e)}let oe={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return ae.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Ye.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return b(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function en(t){oe=t(oe)}function tn(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(G(this),e,...n);return Ye.set(r,e.sort?e.sort():[e]),b(r)}:Xt().includes(t)?function(...e){return t.apply(G(this),e),b(Je.get(this))}:function(...e){return b(t.apply(G(this),e))}}function nn(t){return typeof t=="function"?tn(t):(t instanceof IDBTransaction&&Zt(t),Jt(t,Yt())?new Proxy(t,oe):t)}function b(t){if(t instanceof IDBRequest)return Qt(t);if(z.has(t))return z.get(t);const e=nn(t);return e!==t&&(z.set(t,e),fe.set(e,t)),e}const G=t=>fe.get(t);function V(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(t,e),o=b(a);return r&&a.addEventListener("upgradeneeded",l=>{r(b(a.result),l.oldVersion,l.newVersion,b(a.transaction),l)}),n&&a.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),o.then(l=>{i&&l.addEventListener("close",()=>i()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),o}function J(t,{blocked:e}={}){const n=indexedDB.deleteDatabase(t);return e&&n.addEventListener("blocked",r=>e(r.oldVersion,r)),b(n).then(()=>{})}const rn=["get","getKey","getAll","getAllKeys","count"],sn=["put","add","delete","clear"],Y=new Map;function De(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Y.get(e))return Y.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=sn.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||rn.includes(n)))return;const i=async function(a,...o){const l=this.transaction(a,s?"readwrite":"readonly");let c=l.store;return r&&(c=c.index(o.shift())),(await Promise.all([c[n](...o),s&&l.done]))[0]};return Y.set(e,i),i}en(t=>({...t,get:(e,n,r)=>De(e,n)||t.get(e,n,r),has:(e,n)=>!!De(e,n)||t.has(e,n)}));/**
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
 */class an{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(on(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function on(t){return t.getComponent()?.type==="VERSION"}const ce="@firebase/app",ve="0.14.0";/**
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
 */const w=new Gt("@firebase/app"),cn="@firebase/app-compat",ln="@firebase/analytics-compat",un="@firebase/analytics",hn="@firebase/app-check-compat",fn="@firebase/app-check",dn="@firebase/auth",pn="@firebase/auth-compat",gn="@firebase/database",mn="@firebase/data-connect",bn="@firebase/database-compat",wn="@firebase/functions",yn="@firebase/functions-compat",_n="@firebase/installations",In="@firebase/installations-compat",En="@firebase/messaging",Cn="@firebase/messaging-compat",Sn="@firebase/performance",Tn="@firebase/performance-compat",An="@firebase/remote-config",Rn="@firebase/remote-config-compat",kn="@firebase/storage",Dn="@firebase/storage-compat",vn="@firebase/firestore",On="@firebase/ai",Nn="@firebase/firestore-compat",Mn="firebase";/**
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
 */const le="[DEFAULT]",Ln={[ce]:"fire-core",[cn]:"fire-core-compat",[un]:"fire-analytics",[ln]:"fire-analytics-compat",[fn]:"fire-app-check",[hn]:"fire-app-check-compat",[dn]:"fire-auth",[pn]:"fire-auth-compat",[gn]:"fire-rtdb",[mn]:"fire-data-connect",[bn]:"fire-rtdb-compat",[wn]:"fire-fn",[yn]:"fire-fn-compat",[_n]:"fire-iid",[In]:"fire-iid-compat",[En]:"fire-fcm",[Cn]:"fire-fcm-compat",[Sn]:"fire-perf",[Tn]:"fire-perf-compat",[An]:"fire-rc",[Rn]:"fire-rc-compat",[kn]:"fire-gcs",[Dn]:"fire-gcs-compat",[vn]:"fire-fst",[Nn]:"fire-fst-compat",[On]:"fire-vertex","fire-js":"fire-js",[Mn]:"fire-js-all"};/**
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
 */const U=new Map,Pn=new Map,ue=new Map;function Oe(t,e){try{t.container.addComponent(e)}catch(n){w.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function v(t){const e=t.name;if(ue.has(e))return w.debug(`There were multiple attempts to register component ${e}.`),!1;ue.set(e,t);for(const n of U.values())Oe(n,t);for(const n of Pn.values())Oe(n,t);return!0}function de(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
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
 */const Bn={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},I=new j("app","Firebase",Bn);/**
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
 */class xn{constructor(e,n,r){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new T("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw I.create("app-deleted",{appName:this._name})}}function Xe(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r={name:le,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw I.create("bad-app-name",{appName:String(s)});if(n||(n=We()),!n)throw I.create("no-options");const i=U.get(s);if(i){if(ie(n,i.options)&&ie(r,i.config))return i;throw I.create("duplicate-app",{appName:s})}const a=new jt(s);for(const l of ue.values())a.addComponent(l);const o=new xn(n,r,a);return U.set(s,o),o}function Un(t=le){const e=U.get(t);if(!e&&t===le&&We())return Xe();if(!e)throw I.create("no-app",{appName:t});return e}function D(t,e,n){let r=Ln[t]??t;n&&(r+=`-${n}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),w.warn(a.join(" "));return}v(new T(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const $n="firebase-heartbeat-database",Fn=1,P="firebase-heartbeat-store";let X=null;function Qe(){return X||(X=V($n,Fn,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(P)}catch(n){console.warn(n)}}}}).catch(t=>{throw I.create("idb-open",{originalErrorMessage:t.message})})),X}async function Hn(t){try{const n=(await Qe()).transaction(P),r=await n.objectStore(P).get(Ze(t));return await n.done,r}catch(e){if(e instanceof O)w.warn(e.message);else{const n=I.create("idb-get",{originalErrorMessage:e?.message});w.warn(n.message)}}}async function Ne(t,e){try{const r=(await Qe()).transaction(P,"readwrite");await r.objectStore(P).put(e,Ze(t)),await r.done}catch(n){if(n instanceof O)w.warn(n.message);else{const r=I.create("idb-set",{originalErrorMessage:n?.message});w.warn(r.message)}}}function Ze(t){return`${t.name}!${t.options.appId}`}/**
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
 */const Kn=1024,jn=30;class Vn{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new qn(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Me();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats.length>jn){const s=zn(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){w.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Me(),{heartbeatsToSend:n,unsentEntries:r}=Wn(this._heartbeatsCache.heartbeats),s=Ve(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return w.warn(e),""}}}function Me(){return new Date().toISOString().substring(0,10)}function Wn(t,e=Kn){const n=[];let r=t.slice();for(const s of t){const i=n.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Le(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Le(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class qn{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return qe()?ze().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Hn(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Ne(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Ne(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Le(t){return Ve(JSON.stringify({version:2,heartbeats:t})).length}function zn(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
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
 */function Gn(t){v(new T("platform-logger",e=>new an(e),"PRIVATE")),v(new T("heartbeat",e=>new Vn(e),"PRIVATE")),D(ce,ve,t),D(ce,ve,"esm2020"),D("fire-js","")}Gn("");var Jn="firebase",Yn="12.0.0";/**
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
 */D(Jn,Yn,"app");const et="@firebase/installations",pe="0.6.19";/**
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
 */const tt=1e4,nt=`w:${pe}`,rt="FIS_v2",Xn="https://firebaseinstallations.googleapis.com/v1",Qn=3600*1e3,Zn="installations",er="Installations";/**
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
 */const tr={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},A=new j(Zn,er,tr);function st(t){return t instanceof O&&t.code.includes("request-failed")}/**
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
 */function it({projectId:t}){return`${Xn}/projects/${t}/installations`}function at(t){return{token:t.token,requestStatus:2,expiresIn:rr(t.expiresIn),creationTime:Date.now()}}async function ot(t,e){const r=(await e.json()).error;return A.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function ct({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function nr(t,{refreshToken:e}){const n=ct(t);return n.append("Authorization",sr(e)),n}async function lt(t){const e=await t();return e.status>=500&&e.status<600?t():e}function rr(t){return Number(t.replace("s","000"))}function sr(t){return`${rt} ${t}`}/**
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
 */async function ir({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const r=it(t),s=ct(t),i=e.getImmediate({optional:!0});if(i){const c=await i.getHeartbeatsHeader();c&&s.append("x-firebase-client",c)}const a={fid:n,authVersion:rt,appId:t.appId,sdkVersion:nt},o={method:"POST",headers:s,body:JSON.stringify(a)},l=await lt(()=>fetch(r,o));if(l.ok){const c=await l.json();return{fid:c.fid||n,registrationStatus:2,refreshToken:c.refreshToken,authToken:at(c.authToken)}}else throw await ot("Create Installation",l)}/**
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
 */function ut(t){return new Promise(e=>{setTimeout(e,t)})}/**
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
 */function ar(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const or=/^[cdef][\w-]{21}$/,he="";function cr(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=lr(t);return or.test(n)?n:he}catch{return he}}function lr(t){return ar(t).substr(0,22)}/**
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
 */function W(t){return`${t.appName}!${t.appId}`}/**
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
 */const ht=new Map;function ft(t,e){const n=W(t);dt(n,e),ur(n,e)}function dt(t,e){const n=ht.get(t);if(n)for(const r of n)r(e)}function ur(t,e){const n=hr();n&&n.postMessage({key:t,fid:e}),fr()}let S=null;function hr(){return!S&&"BroadcastChannel"in self&&(S=new BroadcastChannel("[Firebase] FID Change"),S.onmessage=t=>{dt(t.data.key,t.data.fid)}),S}function fr(){ht.size===0&&S&&(S.close(),S=null)}/**
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
 */const dr="firebase-installations-database",pr=1,R="firebase-installations-store";let Q=null;function ge(){return Q||(Q=V(dr,pr,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(R)}}})),Q}async function $(t,e){const n=W(t),s=(await ge()).transaction(R,"readwrite"),i=s.objectStore(R),a=await i.get(n);return await i.put(e,n),await s.done,(!a||a.fid!==e.fid)&&ft(t,e.fid),e}async function pt(t){const e=W(t),r=(await ge()).transaction(R,"readwrite");await r.objectStore(R).delete(e),await r.done}async function q(t,e){const n=W(t),s=(await ge()).transaction(R,"readwrite"),i=s.objectStore(R),a=await i.get(n),o=e(a);return o===void 0?await i.delete(n):await i.put(o,n),await s.done,o&&(!a||a.fid!==o.fid)&&ft(t,o.fid),o}/**
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
 */async function me(t){let e;const n=await q(t.appConfig,r=>{const s=gr(r),i=mr(t,s);return e=i.registrationPromise,i.installationEntry});return n.fid===he?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function gr(t){const e=t||{fid:cr(),registrationStatus:0};return gt(e)}function mr(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(A.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=br(t,n);return{installationEntry:n,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:wr(t)}:{installationEntry:e}}async function br(t,e){try{const n=await ir(t,e);return $(t.appConfig,n)}catch(n){throw st(n)&&n.customData.serverCode===409?await pt(t.appConfig):await $(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function wr(t){let e=await Pe(t.appConfig);for(;e.registrationStatus===1;)await ut(100),e=await Pe(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await me(t);return r||n}return e}function Pe(t){return q(t,e=>{if(!e)throw A.create("installation-not-found");return gt(e)})}function gt(t){return yr(t)?{fid:t.fid,registrationStatus:0}:t}function yr(t){return t.registrationStatus===1&&t.registrationTime+tt<Date.now()}/**
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
 */async function _r({appConfig:t,heartbeatServiceProvider:e},n){const r=Ir(t,n),s=nr(t,n),i=e.getImmediate({optional:!0});if(i){const c=await i.getHeartbeatsHeader();c&&s.append("x-firebase-client",c)}const a={installation:{sdkVersion:nt,appId:t.appId}},o={method:"POST",headers:s,body:JSON.stringify(a)},l=await lt(()=>fetch(r,o));if(l.ok){const c=await l.json();return at(c)}else throw await ot("Generate Auth Token",l)}function Ir(t,{fid:e}){return`${it(t)}/${e}/authTokens:generate`}/**
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
 */async function be(t,e=!1){let n;const r=await q(t.appConfig,i=>{if(!mt(i))throw A.create("not-registered");const a=i.authToken;if(!e&&Sr(a))return i;if(a.requestStatus===1)return n=Er(t,e),i;{if(!navigator.onLine)throw A.create("app-offline");const o=Ar(i);return n=Cr(t,o),o}});return n?await n:r.authToken}async function Er(t,e){let n=await Be(t.appConfig);for(;n.authToken.requestStatus===1;)await ut(100),n=await Be(t.appConfig);const r=n.authToken;return r.requestStatus===0?be(t,e):r}function Be(t){return q(t,e=>{if(!mt(e))throw A.create("not-registered");const n=e.authToken;return Rr(n)?{...e,authToken:{requestStatus:0}}:e})}async function Cr(t,e){try{const n=await _r(t,e),r={...e,authToken:n};return await $(t.appConfig,r),n}catch(n){if(st(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await pt(t.appConfig);else{const r={...e,authToken:{requestStatus:0}};await $(t.appConfig,r)}throw n}}function mt(t){return t!==void 0&&t.registrationStatus===2}function Sr(t){return t.requestStatus===2&&!Tr(t)}function Tr(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+Qn}function Ar(t){const e={requestStatus:1,requestTime:Date.now()};return{...t,authToken:e}}function Rr(t){return t.requestStatus===1&&t.requestTime+tt<Date.now()}/**
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
 */async function kr(t){const e=t,{installationEntry:n,registrationPromise:r}=await me(e);return r?r.catch(console.error):be(e).catch(console.error),n.fid}/**
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
 */async function Dr(t,e=!1){const n=t;return await vr(n),(await be(n,e)).token}async function vr(t){const{registrationPromise:e}=await me(t);e&&await e}/**
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
 */function Or(t){if(!t||!t.options)throw Z("App Configuration");if(!t.name)throw Z("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw Z(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function Z(t){return A.create("missing-app-config-values",{valueName:t})}/**
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
 */const bt="installations",Nr="installations-internal",Mr=t=>{const e=t.getProvider("app").getImmediate(),n=Or(e),r=de(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},Lr=t=>{const e=t.getProvider("app").getImmediate(),n=de(e,bt).getImmediate();return{getId:()=>kr(n),getToken:s=>Dr(n,s)}};function Pr(){v(new T(bt,Mr,"PUBLIC")),v(new T(Nr,Lr,"PRIVATE"))}Pr();D(et,pe);D(et,pe,"esm2020");/**
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
 */const wt="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",Br="https://fcmregistrations.googleapis.com/v1",yt="FCM_MSG",xr="google.c.a.c_id",Ur=3,$r=1;var F;(function(t){t[t.DATA_MESSAGE=1]="DATA_MESSAGE",t[t.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(F||(F={}));/**
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
 */var H;(function(t){t.PUSH_RECEIVED="push-received",t.NOTIFICATION_CLICKED="notification-clicked"})(H||(H={}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function g(t){const e=new Uint8Array(t);return btoa(String.fromCharCode(...e)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function Fr(t){const e="=".repeat((4-t.length%4)%4),n=(t+e).replace(/\-/g,"+").replace(/_/g,"/"),r=atob(n),s=new Uint8Array(r.length);for(let i=0;i<r.length;++i)s[i]=r.charCodeAt(i);return s}/**
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
 */const ee="fcm_token_details_db",Hr=5,xe="fcm_token_object_Store";async function Kr(t){if("databases"in indexedDB&&!(await indexedDB.databases()).map(i=>i.name).includes(ee))return null;let e=null;return(await V(ee,Hr,{upgrade:async(r,s,i,a)=>{if(s<2||!r.objectStoreNames.contains(xe))return;const o=a.objectStore(xe),l=await o.index("fcmSenderId").get(t);if(await o.clear(),!!l){if(s===2){const c=l;if(!c.auth||!c.p256dh||!c.endpoint)return;e={token:c.fcmToken,createTime:c.createTime??Date.now(),subscriptionOptions:{auth:c.auth,p256dh:c.p256dh,endpoint:c.endpoint,swScope:c.swScope,vapidKey:typeof c.vapidKey=="string"?c.vapidKey:g(c.vapidKey)}}}else if(s===3){const c=l;e={token:c.fcmToken,createTime:c.createTime,subscriptionOptions:{auth:g(c.auth),p256dh:g(c.p256dh),endpoint:c.endpoint,swScope:c.swScope,vapidKey:g(c.vapidKey)}}}else if(s===4){const c=l;e={token:c.fcmToken,createTime:c.createTime,subscriptionOptions:{auth:g(c.auth),p256dh:g(c.p256dh),endpoint:c.endpoint,swScope:c.swScope,vapidKey:g(c.vapidKey)}}}}}})).close(),await J(ee),await J("fcm_vapid_details_db"),await J("undefined"),jr(e)?e:null}function jr(t){if(!t||!t.subscriptionOptions)return!1;const{subscriptionOptions:e}=t;return typeof t.createTime=="number"&&t.createTime>0&&typeof t.token=="string"&&t.token.length>0&&typeof e.auth=="string"&&e.auth.length>0&&typeof e.p256dh=="string"&&e.p256dh.length>0&&typeof e.endpoint=="string"&&e.endpoint.length>0&&typeof e.swScope=="string"&&e.swScope.length>0&&typeof e.vapidKey=="string"&&e.vapidKey.length>0}/**
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
 */const Vr="firebase-messaging-database",Wr=1,k="firebase-messaging-store";let te=null;function we(){return te||(te=V(Vr,Wr,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(k)}}})),te}async function ye(t){const e=Ie(t),r=await(await we()).transaction(k).objectStore(k).get(e);if(r)return r;{const s=await Kr(t.appConfig.senderId);if(s)return await _e(t,s),s}}async function _e(t,e){const n=Ie(t),s=(await we()).transaction(k,"readwrite");return await s.objectStore(k).put(e,n),await s.done,e}async function qr(t){const e=Ie(t),r=(await we()).transaction(k,"readwrite");await r.objectStore(k).delete(e),await r.done}function Ie({appConfig:t}){return t.appId}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zr={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},d=new j("messaging","Messaging",zr);/**
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
 */async function Gr(t,e){const n=await Ce(t),r=It(e),s={method:"POST",headers:n,body:JSON.stringify(r)};let i;try{i=await(await fetch(Ee(t.appConfig),s)).json()}catch(a){throw d.create("token-subscribe-failed",{errorInfo:a?.toString()})}if(i.error){const a=i.error.message;throw d.create("token-subscribe-failed",{errorInfo:a})}if(!i.token)throw d.create("token-subscribe-no-token");return i.token}async function Jr(t,e){const n=await Ce(t),r=It(e.subscriptionOptions),s={method:"PATCH",headers:n,body:JSON.stringify(r)};let i;try{i=await(await fetch(`${Ee(t.appConfig)}/${e.token}`,s)).json()}catch(a){throw d.create("token-update-failed",{errorInfo:a?.toString()})}if(i.error){const a=i.error.message;throw d.create("token-update-failed",{errorInfo:a})}if(!i.token)throw d.create("token-update-no-token");return i.token}async function _t(t,e){const r={method:"DELETE",headers:await Ce(t)};try{const i=await(await fetch(`${Ee(t.appConfig)}/${e}`,r)).json();if(i.error){const a=i.error.message;throw d.create("token-unsubscribe-failed",{errorInfo:a})}}catch(s){throw d.create("token-unsubscribe-failed",{errorInfo:s?.toString()})}}function Ee({projectId:t}){return`${Br}/projects/${t}/registrations`}async function Ce({appConfig:t,installations:e}){const n=await e.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function It({p256dh:t,auth:e,endpoint:n,vapidKey:r}){const s={web:{endpoint:n,auth:e,p256dh:t}};return r!==wt&&(s.web.applicationPubKey=r),s}/**
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
 */const Yr=10080*60*1e3;async function Xr(t){const e=await Zr(t.swRegistration,t.vapidKey),n={vapidKey:t.vapidKey,swScope:t.swRegistration.scope,endpoint:e.endpoint,auth:g(e.getKey("auth")),p256dh:g(e.getKey("p256dh"))},r=await ye(t.firebaseDependencies);if(r){if(es(r.subscriptionOptions,n))return Date.now()>=r.createTime+Yr?Qr(t,{token:r.token,createTime:Date.now(),subscriptionOptions:n}):r.token;try{await _t(t.firebaseDependencies,r.token)}catch(s){console.warn(s)}return $e(t.firebaseDependencies,n)}else return $e(t.firebaseDependencies,n)}async function Ue(t){const e=await ye(t.firebaseDependencies);e&&(await _t(t.firebaseDependencies,e.token),await qr(t.firebaseDependencies));const n=await t.swRegistration.pushManager.getSubscription();return n?n.unsubscribe():!0}async function Qr(t,e){try{const n=await Jr(t.firebaseDependencies,e),r={...e,token:n,createTime:Date.now()};return await _e(t.firebaseDependencies,r),n}catch(n){throw n}}async function $e(t,e){const r={token:await Gr(t,e),createTime:Date.now(),subscriptionOptions:e};return await _e(t,r),r.token}async function Zr(t,e){const n=await t.pushManager.getSubscription();return n||t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:Fr(e)})}function es(t,e){const n=e.vapidKey===t.vapidKey,r=e.endpoint===t.endpoint,s=e.auth===t.auth,i=e.p256dh===t.p256dh;return n&&r&&s&&i}/**
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
 */function ts(t){const e={from:t.from,collapseKey:t.collapse_key,messageId:t.fcmMessageId};return ns(e,t),rs(e,t),ss(e,t),e}function ns(t,e){if(!e.notification)return;t.notification={};const n=e.notification.title;n&&(t.notification.title=n);const r=e.notification.body;r&&(t.notification.body=r);const s=e.notification.image;s&&(t.notification.image=s);const i=e.notification.icon;i&&(t.notification.icon=i)}function rs(t,e){e.data&&(t.data=e.data)}function ss(t,e){if(!e.fcmOptions&&!e.notification?.click_action)return;t.fcmOptions={};const n=e.fcmOptions?.link??e.notification?.click_action;n&&(t.fcmOptions.link=n);const r=e.fcmOptions?.analytics_label;r&&(t.fcmOptions.analyticsLabel=r)}/**
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
 */function is(t){return typeof t=="object"&&!!t&&xr in t}/**
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
 */function as(t){return new Promise(e=>{setTimeout(e,t)})}async function os(t,e){const n=cs(e,await t.firebaseDependencies.installations.getId());ls(t,n,e.productId)}function cs(t,e){const n={};return t.from&&(n.project_number=t.from),t.fcmMessageId&&(n.message_id=t.fcmMessageId),n.instance_id=e,t.notification?n.message_type=F.DISPLAY_NOTIFICATION.toString():n.message_type=F.DATA_MESSAGE.toString(),n.sdk_platform=Ur.toString(),n.package_name=self.origin.replace(/(^\w+:|^)\/\//,""),t.collapse_key&&(n.collapse_key=t.collapse_key),n.event=$r.toString(),t.fcmOptions?.analytics_label&&(n.analytics_label=t.fcmOptions?.analytics_label),n}function ls(t,e,n){const r={};r.event_time_ms=Math.floor(Date.now()).toString(),r.source_extension_json_proto3=JSON.stringify({messaging_client_event:e}),n&&(r.compliance_data=us(n)),t.logEvents.push(r)}function us(t){return{privacy_context:{prequest:{origin_associated_product_id:t}}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hs(t,e){const{newSubscription:n}=t;if(!n){await Ue(e);return}const r=await ye(e.firebaseDependencies);await Ue(e),e.vapidKey=r?.subscriptionOptions?.vapidKey??wt,await Xr(e)}async function fs(t,e){const n=gs(t);if(!n)return;e.deliveryMetricsExportedToBigQueryEnabled&&await os(e,n);const r=await Et();if(bs(r))return ws(r,n);if(n.notification&&await ys(ps(n)),!!e&&e.onBackgroundMessageHandler){const s=ts(n);typeof e.onBackgroundMessageHandler=="function"?await e.onBackgroundMessageHandler(s):e.onBackgroundMessageHandler.next(s)}}async function ds(t){const e=t.notification?.data?.[yt];if(e){if(t.action)return}else return;t.stopImmediatePropagation(),t.notification.close();const n=_s(e);if(!n)return;const r=new URL(n,self.location.href),s=new URL(self.location.origin);if(r.host!==s.host)return;let i=await ms(r);if(i?i=await i.focus():(i=await self.clients.openWindow(n),await as(3e3)),!!i)return e.messageType=H.NOTIFICATION_CLICKED,e.isFirebaseMessaging=!0,i.postMessage(e)}function ps(t){const e={...t.notification};return e.data={[yt]:t},e}function gs({data:t}){if(!t)return null;try{return t.json()}catch{return null}}async function ms(t){const e=await Et();for(const n of e){const r=new URL(n.url,self.location.href);if(t.host===r.host)return n}return null}function bs(t){return t.some(e=>e.visibilityState==="visible"&&!e.url.startsWith("chrome-extension://"))}function ws(t,e){e.isFirebaseMessaging=!0,e.messageType=H.PUSH_RECEIVED;for(const n of t)n.postMessage(e)}function Et(){return self.clients.matchAll({type:"window",includeUncontrolled:!0})}function ys(t){const{actions:e}=t,{maxActions:n}=Notification;return e&&n&&e.length>n&&console.warn(`This browser only supports ${n} actions. The remaining actions will not be displayed.`),self.registration.showNotification(t.title??"",t)}function _s(t){const e=t.fcmOptions?.link??t.notification?.click_action;return e||(is(t.data)?self.location.origin:null)}/**
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
 */function Is(t){if(!t||!t.options)throw ne("App Configuration Object");if(!t.name)throw ne("App Name");const e=["projectId","apiKey","appId","messagingSenderId"],{options:n}=t;for(const r of e)if(!n[r])throw ne(r);return{appName:t.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function ne(t){return d.create("missing-app-config-values",{valueName:t})}/**
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
 */class Es{constructor(e,n,r){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const s=Is(e);this.firebaseDependencies={app:e,appConfig:s,installations:n,analyticsProvider:r}}_delete(){return Promise.resolve()}}/**
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
 */const Cs=t=>{const e=new Es(t.getProvider("app").getImmediate(),t.getProvider("installations-internal").getImmediate(),t.getProvider("analytics-internal"));return self.addEventListener("push",n=>{n.waitUntil(fs(n,e))}),self.addEventListener("pushsubscriptionchange",n=>{n.waitUntil(hs(n,e))}),self.addEventListener("notificationclick",n=>{n.waitUntil(ds(n))}),e};function Ss(){v(new T("messaging-sw",Cs,"PUBLIC"))}/**
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
 */async function Ts(){return qe()&&await ze()&&"PushManager"in self&&"Notification"in self&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
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
 */function As(t,e){if(self.document!==void 0)throw d.create("only-available-in-sw");return t.onBackgroundMessageHandler=e,()=>{t.onBackgroundMessageHandler=null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rs(t=Un()){return Ts().then(e=>{if(!e)throw d.create("unsupported-browser")},e=>{throw d.create("indexed-db-unsupported")}),de(Ge(t),"messaging-sw").getImmediate()}function ks(t,e){return t=Ge(t),As(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ss();try{self["workbox:core:7.2.0"]&&_()}catch{}const Ds=(t,...e)=>{let n=t;return e.length>0&&(n+=` :: ${JSON.stringify(e)}`),n},vs=Ds;class f extends Error{constructor(e,n){const r=vs(e,n);super(r),this.name=e,this.details=n}}const m={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:typeof registration<"u"?registration.scope:""},re=t=>[m.prefix,t,m.suffix].filter(e=>e&&e.length>0).join("-"),Os=t=>{for(const e of Object.keys(m))t(e)},Se={updateDetails:t=>{Os(e=>{typeof t[e]=="string"&&(m[e]=t[e])})},getGoogleAnalyticsName:t=>t||re(m.googleAnalytics),getPrecacheName:t=>t||re(m.precache),getPrefix:()=>m.prefix,getRuntimeName:t=>t||re(m.runtime),getSuffix:()=>m.suffix};function Fe(t,e){const n=e();return t.waitUntil(n),n}try{self["workbox:precaching:7.2.0"]&&_()}catch{}const Ns="__WB_REVISION__";function Ms(t){if(!t)throw new f("add-to-cache-list-unexpected-type",{entry:t});if(typeof t=="string"){const i=new URL(t,location.href);return{cacheKey:i.href,url:i.href}}const{revision:e,url:n}=t;if(!n)throw new f("add-to-cache-list-unexpected-type",{entry:t});if(!e){const i=new URL(n,location.href);return{cacheKey:i.href,url:i.href}}const r=new URL(n,location.href),s=new URL(n,location.href);return r.searchParams.set(Ns,e),{cacheKey:r.href,url:s.href}}class Ls{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:n})=>{n&&(n.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:n,cachedResponse:r})=>{if(e.type==="install"&&n&&n.originalRequest&&n.originalRequest instanceof Request){const s=n.originalRequest.url;r?this.notUpdatedURLs.push(s):this.updatedURLs.push(s)}return r}}}class Ps{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:n,params:r})=>{const s=r?.cacheKey||this._precacheController.getCacheKeyForURL(n.url);return s?new Request(s,{headers:n.headers}):n},this._precacheController=e}}let N;function Bs(){if(N===void 0){const t=new Response("");if("body"in t)try{new Response(t.body),N=!0}catch{N=!1}N=!1}return N}async function xs(t,e){let n=null;if(t.url&&(n=new URL(t.url).origin),n!==self.location.origin)throw new f("cross-origin-copy-response",{origin:n});const r=t.clone(),i={headers:new Headers(r.headers),status:r.status,statusText:r.statusText},a=Bs()?r.body:await r.blob();return new Response(a,i)}const Us=t=>new URL(String(t),location.href).href.replace(new RegExp(`^${location.origin}`),"");function He(t,e){const n=new URL(t);for(const r of e)n.searchParams.delete(r);return n.href}async function $s(t,e,n,r){const s=He(e.url,n);if(e.url===s)return t.match(e,r);const i=Object.assign(Object.assign({},r),{ignoreSearch:!0}),a=await t.keys(e,i);for(const o of a){const l=He(o.url,n);if(s===l)return t.match(o,r)}}class Fs{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}const Hs=new Set;async function Ks(){for(const t of Hs)await t()}function js(t){return new Promise(e=>setTimeout(e,t))}try{self["workbox:strategies:7.2.0"]&&_()}catch{}function x(t){return typeof t=="string"?new Request(t):t}class Vs{constructor(e,n){this._cacheKeys={},Object.assign(this,n),this.event=n.event,this._strategy=e,this._handlerDeferred=new Fs,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const r of this._plugins)this._pluginStateMap.set(r,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:n}=this;let r=x(e);if(r.mode==="navigate"&&n instanceof FetchEvent&&n.preloadResponse){const a=await n.preloadResponse;if(a)return a}const s=this.hasCallback("fetchDidFail")?r.clone():null;try{for(const a of this.iterateCallbacks("requestWillFetch"))r=await a({request:r.clone(),event:n})}catch(a){if(a instanceof Error)throw new f("plugin-error-request-will-fetch",{thrownErrorMessage:a.message})}const i=r.clone();try{let a;a=await fetch(r,r.mode==="navigate"?void 0:this._strategy.fetchOptions);for(const o of this.iterateCallbacks("fetchDidSucceed"))a=await o({event:n,request:i,response:a});return a}catch(a){throw s&&await this.runCallbacks("fetchDidFail",{error:a,event:n,originalRequest:s.clone(),request:i.clone()}),a}}async fetchAndCachePut(e){const n=await this.fetch(e),r=n.clone();return this.waitUntil(this.cachePut(e,r)),n}async cacheMatch(e){const n=x(e);let r;const{cacheName:s,matchOptions:i}=this._strategy,a=await this.getCacheKey(n,"read"),o=Object.assign(Object.assign({},i),{cacheName:s});r=await caches.match(a,o);for(const l of this.iterateCallbacks("cachedResponseWillBeUsed"))r=await l({cacheName:s,matchOptions:i,cachedResponse:r,request:a,event:this.event})||void 0;return r}async cachePut(e,n){const r=x(e);await js(0);const s=await this.getCacheKey(r,"write");if(!n)throw new f("cache-put-with-no-response",{url:Us(s.url)});const i=await this._ensureResponseSafeToCache(n);if(!i)return!1;const{cacheName:a,matchOptions:o}=this._strategy,l=await self.caches.open(a),c=this.hasCallback("cacheDidUpdate"),p=c?await $s(l,s.clone(),["__WB_REVISION__"],o):null;try{await l.put(s,c?i.clone():i)}catch(h){if(h instanceof Error)throw h.name==="QuotaExceededError"&&await Ks(),h}for(const h of this.iterateCallbacks("cacheDidUpdate"))await h({cacheName:a,oldResponse:p,newResponse:i.clone(),request:s,event:this.event});return!0}async getCacheKey(e,n){const r=`${e.url} | ${n}`;if(!this._cacheKeys[r]){let s=e;for(const i of this.iterateCallbacks("cacheKeyWillBeUsed"))s=x(await i({mode:n,request:s,event:this.event,params:this.params}));this._cacheKeys[r]=s}return this._cacheKeys[r]}hasCallback(e){for(const n of this._strategy.plugins)if(e in n)return!0;return!1}async runCallbacks(e,n){for(const r of this.iterateCallbacks(e))await r(n)}*iterateCallbacks(e){for(const n of this._strategy.plugins)if(typeof n[e]=="function"){const r=this._pluginStateMap.get(n);yield i=>{const a=Object.assign(Object.assign({},i),{state:r});return n[e](a)}}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let n=e,r=!1;for(const s of this.iterateCallbacks("cacheWillUpdate"))if(n=await s({request:this.request,response:n,event:this.event})||void 0,r=!0,!n)break;return r||n&&n.status!==200&&(n=void 0),n}}class Ws{constructor(e={}){this.cacheName=Se.getRuntimeName(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[n]=this.handleAll(e);return n}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const n=e.event,r=typeof e.request=="string"?new Request(e.request):e.request,s="params"in e?e.params:void 0,i=new Vs(this,{event:n,request:r,params:s}),a=this._getResponse(i,r,n),o=this._awaitComplete(a,i,r,n);return[a,o]}async _getResponse(e,n,r){await e.runCallbacks("handlerWillStart",{event:r,request:n});let s;try{if(s=await this._handle(n,e),!s||s.type==="error")throw new f("no-response",{url:n.url})}catch(i){if(i instanceof Error){for(const a of e.iterateCallbacks("handlerDidError"))if(s=await a({error:i,event:r,request:n}),s)break}if(!s)throw i}for(const i of e.iterateCallbacks("handlerWillRespond"))s=await i({event:r,request:n,response:s});return s}async _awaitComplete(e,n,r,s){let i,a;try{i=await e}catch{}try{await n.runCallbacks("handlerDidRespond",{event:s,request:r,response:i}),await n.doneWaiting()}catch(o){o instanceof Error&&(a=o)}if(await n.runCallbacks("handlerDidComplete",{event:s,request:r,response:i,error:a}),n.destroy(),a)throw a}}class y extends Ws{constructor(e={}){e.cacheName=Se.getPrecacheName(e.cacheName),super(e),this._fallbackToNetwork=e.fallbackToNetwork!==!1,this.plugins.push(y.copyRedirectedCacheableResponsesPlugin)}async _handle(e,n){const r=await n.cacheMatch(e);return r||(n.event&&n.event.type==="install"?await this._handleInstall(e,n):await this._handleFetch(e,n))}async _handleFetch(e,n){let r;const s=n.params||{};if(this._fallbackToNetwork){const i=s.integrity,a=e.integrity,o=!a||a===i;r=await n.fetch(new Request(e,{integrity:e.mode!=="no-cors"?a||i:void 0})),i&&o&&e.mode!=="no-cors"&&(this._useDefaultCacheabilityPluginIfNeeded(),await n.cachePut(e,r.clone()))}else throw new f("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return r}async _handleInstall(e,n){this._useDefaultCacheabilityPluginIfNeeded();const r=await n.fetch(e);if(!await n.cachePut(e,r.clone()))throw new f("bad-precaching-response",{url:e.url,status:r.status});return r}_useDefaultCacheabilityPluginIfNeeded(){let e=null,n=0;for(const[r,s]of this.plugins.entries())s!==y.copyRedirectedCacheableResponsesPlugin&&(s===y.defaultPrecacheCacheabilityPlugin&&(e=r),s.cacheWillUpdate&&n++);n===0?this.plugins.push(y.defaultPrecacheCacheabilityPlugin):n>1&&e!==null&&this.plugins.splice(e,1)}}y.defaultPrecacheCacheabilityPlugin={async cacheWillUpdate({response:t}){return!t||t.status>=400?null:t}};y.copyRedirectedCacheableResponsesPlugin={async cacheWillUpdate({response:t}){return t.redirected?await xs(t):t}};class qs{constructor({cacheName:e,plugins:n=[],fallbackToNetwork:r=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new y({cacheName:Se.getPrecacheName(e),plugins:[...n,new Ps({precacheController:this})],fallbackToNetwork:r}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const n=[];for(const r of e){typeof r=="string"?n.push(r):r&&r.revision===void 0&&n.push(r.url);const{cacheKey:s,url:i}=Ms(r),a=typeof r!="string"&&r.revision?"reload":"default";if(this._urlsToCacheKeys.has(i)&&this._urlsToCacheKeys.get(i)!==s)throw new f("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(i),secondEntry:s});if(typeof r!="string"&&r.integrity){if(this._cacheKeysToIntegrities.has(s)&&this._cacheKeysToIntegrities.get(s)!==r.integrity)throw new f("add-to-cache-list-conflicting-integrities",{url:i});this._cacheKeysToIntegrities.set(s,r.integrity)}if(this._urlsToCacheKeys.set(i,s),this._urlsToCacheModes.set(i,a),n.length>0){const o=`Workbox is precaching URLs without revision info: ${n.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(o)}}}install(e){return Fe(e,async()=>{const n=new Ls;this.strategy.plugins.push(n);for(const[i,a]of this._urlsToCacheKeys){const o=this._cacheKeysToIntegrities.get(a),l=this._urlsToCacheModes.get(i),c=new Request(i,{integrity:o,cache:l,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:a},request:c,event:e}))}const{updatedURLs:r,notUpdatedURLs:s}=n;return{updatedURLs:r,notUpdatedURLs:s}})}activate(e){return Fe(e,async()=>{const n=await self.caches.open(this.strategy.cacheName),r=await n.keys(),s=new Set(this._urlsToCacheKeys.values()),i=[];for(const a of r)s.has(a.url)||(await n.delete(a),i.push(a.url));return{deletedURLs:i}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const n=new URL(e,location.href);return this._urlsToCacheKeys.get(n.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const n=e instanceof Request?e.url:e,r=this.getCacheKeyForURL(n);if(r)return(await self.caches.open(this.strategy.cacheName)).match(r)}createHandlerBoundToURL(e){const n=this.getCacheKeyForURL(e);if(!n)throw new f("non-precached-url",{url:e});return r=>(r.request=new Request(e),r.params=Object.assign({cacheKey:n},r.params),this.strategy.handle(r))}}let se;const Ct=()=>(se||(se=new qs),se);try{self["workbox:routing:7.2.0"]&&_()}catch{}const St="GET",K=t=>t&&typeof t=="object"?t:{handle:t};class L{constructor(e,n,r=St){this.handler=K(n),this.match=e,this.method=r}setCatchHandler(e){this.catchHandler=K(e)}}class zs extends L{constructor(e,n,r){const s=({url:i})=>{const a=e.exec(i.href);if(a&&!(i.origin!==location.origin&&a.index!==0))return a.slice(1)};super(s,n,r)}}class Gs{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:n}=e,r=this.handleRequest({request:n,event:e});r&&e.respondWith(r)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&e.data.type==="CACHE_URLS"){const{payload:n}=e.data,r=Promise.all(n.urlsToCache.map(s=>{typeof s=="string"&&(s=[s]);const i=new Request(...s);return this.handleRequest({request:i,event:e})}));e.waitUntil(r),e.ports&&e.ports[0]&&r.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:n}){const r=new URL(e.url,location.href);if(!r.protocol.startsWith("http"))return;const s=r.origin===location.origin,{params:i,route:a}=this.findMatchingRoute({event:n,request:e,sameOrigin:s,url:r});let o=a&&a.handler;const l=e.method;if(!o&&this._defaultHandlerMap.has(l)&&(o=this._defaultHandlerMap.get(l)),!o)return;let c;try{c=o.handle({url:r,request:e,event:n,params:i})}catch(h){c=Promise.reject(h)}const p=a&&a.catchHandler;return c instanceof Promise&&(this._catchHandler||p)&&(c=c.catch(async h=>{if(p)try{return await p.handle({url:r,request:e,event:n,params:i})}catch(E){E instanceof Error&&(h=E)}if(this._catchHandler)return this._catchHandler.handle({url:r,request:e,event:n});throw h})),c}findMatchingRoute({url:e,sameOrigin:n,request:r,event:s}){const i=this._routes.get(r.method)||[];for(const a of i){let o;const l=a.match({url:e,sameOrigin:n,request:r,event:s});if(l)return o=l,(Array.isArray(o)&&o.length===0||l.constructor===Object&&Object.keys(l).length===0||typeof l=="boolean")&&(o=void 0),{route:a,params:o}}return{}}setDefaultHandler(e,n=St){this._defaultHandlerMap.set(n,K(e))}setCatchHandler(e){this._catchHandler=K(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new f("unregister-route-but-not-found-with-method",{method:e.method});const n=this._routes.get(e.method).indexOf(e);if(n>-1)this._routes.get(e.method).splice(n,1);else throw new f("unregister-route-route-not-registered")}}let M;const Js=()=>(M||(M=new Gs,M.addFetchListener(),M.addCacheListener()),M);function Ys(t,e,n){let r;if(typeof t=="string"){const i=new URL(t,location.href),a=({url:o})=>o.href===i.href;r=new L(a,e,n)}else if(t instanceof RegExp)r=new zs(t,e,n);else if(typeof t=="function")r=new L(t,e,n);else if(t instanceof L)r=t;else throw new f("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});return Js().registerRoute(r),r}function Xs(t,e=[]){for(const n of[...t.searchParams.keys()])e.some(r=>r.test(n))&&t.searchParams.delete(n);return t}function*Qs(t,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:n="index.html",cleanURLs:r=!0,urlManipulation:s}={}){const i=new URL(t,location.href);i.hash="",yield i.href;const a=Xs(i,e);if(yield a.href,n&&a.pathname.endsWith("/")){const o=new URL(a.href);o.pathname+=n,yield o.href}if(r){const o=new URL(a.href);o.pathname+=".html",yield o.href}if(s){const o=s({url:i});for(const l of o)yield l.href}}class Zs extends L{constructor(e,n){const r=({request:s})=>{const i=e.getURLsToCacheKeys();for(const a of Qs(s.url,n)){const o=i.get(a);if(o){const l=e.getIntegrityForCacheKey(o);return{cacheKey:o,integrity:l}}}};super(r,e.strategy)}}function ei(t){const e=Ct(),n=new Zs(e,t);Ys(n)}function ti(t){Ct().precache(t)}function ni(t,e){ti(t),ei(e)}ni(self.__WB_MANIFEST);const ri={apiKey:"AIzaSyC-jTMiDjHNTC6cvSKUU44mVbWwT-ToLxQ",authDomain:"mister-x-d6b59.firebaseapp.com",databaseURL:"https://mister-x-d6b59-default-rtdb.europe-west1.firebasedatabase.app",projectId:"mister-x-d6b59",storageBucket:"mister-x-d6b59.firebasestorage.app",messagingSenderId:"616391598963",appId:"1:616391598963:web:da07882b0f481d3000db06",measurementId:"G-W66SK677NG"},si=Xe(ri),ii=Rs(si);ks(ii,t=>{console.log("[firebase-messaging-sw.js] Nachricht empfangen:",t);const{title:e,body:n}=t.notification,r={body:n,icon:"icons/android-chrome-192x192.png",badge:"icons/android-chrome-192x192.png",data:{url:"/Mister-X"}};self.registration.showNotification(e,r)});self.addEventListener("notificationclick",function(t){t.notification.close(),t.waitUntil(clients.openWindow(t.notification.data.url))});
