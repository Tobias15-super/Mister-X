const Ot = () => {
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ze = function(t) {
  const e = [];
  let n = 0;
  for (let r = 0; r < t.length; r++) {
    let s = t.charCodeAt(r);
    s < 128 ? e[n++] = s : s < 2048 ? (e[n++] = s >> 6 | 192, e[n++] = s & 63 | 128) : (s & 64512) === 55296 && r + 1 < t.length && (t.charCodeAt(r + 1) & 64512) === 56320 ? (s = 65536 + ((s & 1023) << 10) + (t.charCodeAt(++r) & 1023), e[n++] = s >> 18 | 240, e[n++] = s >> 12 & 63 | 128, e[n++] = s >> 6 & 63 | 128, e[n++] = s & 63 | 128) : (e[n++] = s >> 12 | 224, e[n++] = s >> 6 & 63 | 128, e[n++] = s & 63 | 128);
  }
  return e;
}, Mt = function(t) {
  const e = [];
  let n = 0, r = 0;
  for (; n < t.length; ) {
    const s = t[n++];
    if (s < 128)
      e[r++] = String.fromCharCode(s);
    else if (s > 191 && s < 224) {
      const i = t[n++];
      e[r++] = String.fromCharCode((s & 31) << 6 | i & 63);
    } else if (s > 239 && s < 365) {
      const i = t[n++], a = t[n++], o = t[n++], l = ((s & 7) << 18 | (i & 63) << 12 | (a & 63) << 6 | o & 63) - 65536;
      e[r++] = String.fromCharCode(55296 + (l >> 10)), e[r++] = String.fromCharCode(56320 + (l & 1023));
    } else {
      const i = t[n++], a = t[n++];
      e[r++] = String.fromCharCode((s & 15) << 12 | (i & 63) << 6 | a & 63);
    }
  }
  return e.join("");
}, Ge = {
  /**
   * Maps bytes to characters.
   */
  byteToCharMap_: null,
  /**
   * Maps characters to bytes.
   */
  charToByteMap_: null,
  /**
   * Maps bytes to websafe characters.
   * @private
   */
  byteToCharMapWebSafe_: null,
  /**
   * Maps websafe characters to bytes.
   * @private
   */
  charToByteMapWebSafe_: null,
  /**
   * Our default alphabet, shared between
   * ENCODED_VALS and ENCODED_VALS_WEBSAFE
   */
  ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  /**
   * Our default alphabet. Value 64 (=) is special; it means "nothing."
   */
  get ENCODED_VALS() {
    return this.ENCODED_VALS_BASE + "+/=";
  },
  /**
   * Our websafe alphabet.
   */
  get ENCODED_VALS_WEBSAFE() {
    return this.ENCODED_VALS_BASE + "-_.";
  },
  /**
   * Whether this browser supports the atob and btoa functions. This extension
   * started at Mozilla but is now implemented by many browsers. We use the
   * ASSUME_* variables to avoid pulling in the full useragent detection library
   * but still allowing the standard per-browser compilations.
   *
   */
  HAS_NATIVE_SUPPORT: typeof atob == "function",
  /**
   * Base64-encode an array of bytes.
   *
   * @param input An array of bytes (numbers with
   *     value in [0, 255]) to encode.
   * @param webSafe Boolean indicating we should use the
   *     alternative alphabet.
   * @return The base64 encoded string.
   */
  encodeByteArray(t, e) {
    if (!Array.isArray(t))
      throw Error("encodeByteArray takes an array as a parameter");
    this.init_();
    const n = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_, r = [];
    for (let s = 0; s < t.length; s += 3) {
      const i = t[s], a = s + 1 < t.length, o = a ? t[s + 1] : 0, l = s + 2 < t.length, c = l ? t[s + 2] : 0, d = i >> 2, h = (i & 3) << 4 | o >> 4;
      let m = (o & 15) << 2 | c >> 6, E = c & 63;
      l || (E = 64, a || (m = 64)), r.push(n[d], n[h], n[m], n[E]);
    }
    return r.join("");
  },
  /**
   * Base64-encode a string.
   *
   * @param input A string to encode.
   * @param webSafe If true, we should use the
   *     alternative alphabet.
   * @return The base64 encoded string.
   */
  encodeString(t, e) {
    return this.HAS_NATIVE_SUPPORT && !e ? btoa(t) : this.encodeByteArray(ze(t), e);
  },
  /**
   * Base64-decode a string.
   *
   * @param input to decode.
   * @param webSafe True if we should use the
   *     alternative alphabet.
   * @return string representing the decoded value.
   */
  decodeString(t, e) {
    return this.HAS_NATIVE_SUPPORT && !e ? atob(t) : Mt(this.decodeStringToByteArray(t, e));
  },
  /**
   * Base64-decode a string.
   *
   * In base-64 decoding, groups of four characters are converted into three
   * bytes.  If the encoder did not apply padding, the input length may not
   * be a multiple of 4.
   *
   * In this case, the last group will have fewer than 4 characters, and
   * padding will be inferred.  If the group has one or two characters, it decodes
   * to one byte.  If the group has three characters, it decodes to two bytes.
   *
   * @param input Input to decode.
   * @param webSafe True if we should use the web-safe alphabet.
   * @return bytes representing the decoded value.
   */
  decodeStringToByteArray(t, e) {
    this.init_();
    const n = e ? this.charToByteMapWebSafe_ : this.charToByteMap_, r = [];
    for (let s = 0; s < t.length; ) {
      const i = n[t.charAt(s++)], o = s < t.length ? n[t.charAt(s)] : 0;
      ++s;
      const c = s < t.length ? n[t.charAt(s)] : 64;
      ++s;
      const h = s < t.length ? n[t.charAt(s)] : 64;
      if (++s, i == null || o == null || c == null || h == null)
        throw new Pt();
      const m = i << 2 | o >> 4;
      if (r.push(m), c !== 64) {
        const E = o << 4 & 240 | c >> 2;
        if (r.push(E), h !== 64) {
          const J = c << 6 & 192 | h;
          r.push(J);
        }
      }
    }
    return r;
  },
  /**
   * Lazy static initialization function. Called before
   * accessing any of the static map variables.
   * @private
   */
  init_() {
    if (!this.byteToCharMap_) {
      this.byteToCharMap_ = {}, this.charToByteMap_ = {}, this.byteToCharMapWebSafe_ = {}, this.charToByteMapWebSafe_ = {};
      for (let t = 0; t < this.ENCODED_VALS.length; t++)
        this.byteToCharMap_[t] = this.ENCODED_VALS.charAt(t), this.charToByteMap_[this.byteToCharMap_[t]] = t, this.byteToCharMapWebSafe_[t] = this.ENCODED_VALS_WEBSAFE.charAt(t), this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]] = t, t >= this.ENCODED_VALS_BASE.length && (this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)] = t, this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)] = t);
    }
  }
};
class Pt extends Error {
  constructor() {
    super(...arguments), this.name = "DecodeBase64StringError";
  }
}
const Lt = function(t) {
  const e = ze(t);
  return Ge.encodeByteArray(e, !0);
}, Je = function(t) {
  return Lt(t).replace(/\./g, "");
}, Bt = function(t) {
  try {
    return Ge.decodeString(t, !0);
  } catch (e) {
    console.error("base64Decode failed: ", e);
  }
  return null;
};
/**
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
 */
function xt() {
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("Unable to locate global object.");
}
/**
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
 */
const Ut = () => xt().__FIREBASE_DEFAULTS__, $t = () => {
  if (typeof process > "u" || typeof process.env > "u")
    return;
  const t = process.env.__FIREBASE_DEFAULTS__;
  if (t)
    return JSON.parse(t);
}, Ft = () => {
  if (typeof document > "u")
    return;
  let t;
  try {
    t = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
  } catch {
    return;
  }
  const e = t && Bt(t[1]);
  return e && JSON.parse(e);
}, Ht = () => {
  try {
    return Ot() || Ut() || $t() || Ft();
  } catch (t) {
    console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);
    return;
  }
}, Xe = () => {
  var t;
  return (t = Ht()) == null ? void 0 : t.config;
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let Kt = class {
  constructor() {
    this.reject = () => {
    }, this.resolve = () => {
    }, this.promise = new Promise((e, n) => {
      this.resolve = e, this.reject = n;
    });
  }
  /**
   * Our API internals are not promisified and cannot because our callback APIs have subtle expectations around
   * invoking promises inline, which Promises are forbidden to do. This method accepts an optional node-style callback
   * and returns a node-style callback which will resolve or reject the Deferred's promise.
   */
  wrapCallback(e) {
    return (n, r) => {
      n ? this.reject(n) : this.resolve(r), typeof e == "function" && (this.promise.catch(() => {
      }), e.length === 1 ? e(n) : e(n, r));
    };
  }
};
function Ye() {
  try {
    return typeof indexedDB == "object";
  } catch {
    return !1;
  }
}
function Qe() {
  return new Promise((t, e) => {
    try {
      let n = !0;
      const r = "validate-browser-context-for-indexeddb-analytics-module", s = self.indexedDB.open(r);
      s.onsuccess = () => {
        s.result.close(), n || self.indexedDB.deleteDatabase(r), t(!0);
      }, s.onupgradeneeded = () => {
        n = !1;
      }, s.onerror = () => {
        var i;
        e(((i = s.error) == null ? void 0 : i.message) || "");
      };
    } catch (n) {
      e(n);
    }
  });
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const jt = "FirebaseError";
class M extends Error {
  constructor(e, n, r) {
    super(n), this.code = e, this.customData = r, this.name = jt, Object.setPrototypeOf(this, M.prototype), Error.captureStackTrace && Error.captureStackTrace(this, W.prototype.create);
  }
}
class W {
  constructor(e, n, r) {
    this.service = e, this.serviceName = n, this.errors = r;
  }
  create(e, ...n) {
    const r = n[0] || {}, s = `${this.service}/${e}`, i = this.errors[e], a = i ? Vt(i, r) : "Error", o = `${this.serviceName}: ${a} (${s}).`;
    return new M(s, o, r);
  }
}
function Vt(t, e) {
  return t.replace(Wt, (n, r) => {
    const s = e[r];
    return s != null ? String(s) : `<${r}?>`;
  });
}
const Wt = /\{\$([^}]+)}/g;
function ce(t, e) {
  if (t === e)
    return !0;
  const n = Object.keys(t), r = Object.keys(e);
  for (const s of n) {
    if (!r.includes(s))
      return !1;
    const i = t[s], a = e[s];
    if (Re(i) && Re(a)) {
      if (!ce(i, a))
        return !1;
    } else if (i !== a)
      return !1;
  }
  for (const s of r)
    if (!n.includes(s))
      return !1;
  return !0;
}
function Re(t) {
  return t !== null && typeof t == "object";
}
/**
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
 */
function qt(t) {
  return t && t._delegate ? t._delegate : t;
}
class D {
  /**
   *
   * @param name The public service name, e.g. app, auth, firestore, database
   * @param instanceFactory Service factory responsible for creating the public interface
   * @param type whether the service provided by the component is public or private
   */
  constructor(e, n, r) {
    this.name = e, this.instanceFactory = n, this.type = r, this.multipleInstances = !1, this.serviceProps = {}, this.instantiationMode = "LAZY", this.onInstanceCreated = null;
  }
  setInstantiationMode(e) {
    return this.instantiationMode = e, this;
  }
  setMultipleInstances(e) {
    return this.multipleInstances = e, this;
  }
  setServiceProps(e) {
    return this.serviceProps = e, this;
  }
  setInstanceCreatedCallback(e) {
    return this.onInstanceCreated = e, this;
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const T = "[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class zt {
  constructor(e, n) {
    this.name = e, this.container = n, this.component = null, this.instances = /* @__PURE__ */ new Map(), this.instancesDeferred = /* @__PURE__ */ new Map(), this.instancesOptions = /* @__PURE__ */ new Map(), this.onInitCallbacks = /* @__PURE__ */ new Map();
  }
  /**
   * @param identifier A provider can provide multiple instances of a service
   * if this.component.multipleInstances is true.
   */
  get(e) {
    const n = this.normalizeInstanceIdentifier(e);
    if (!this.instancesDeferred.has(n)) {
      const r = new Kt();
      if (this.instancesDeferred.set(n, r), this.isInitialized(n) || this.shouldAutoInitialize())
        try {
          const s = this.getOrInitializeService({
            instanceIdentifier: n
          });
          s && r.resolve(s);
        } catch {
        }
    }
    return this.instancesDeferred.get(n).promise;
  }
  getImmediate(e) {
    const n = this.normalizeInstanceIdentifier(e == null ? void 0 : e.identifier), r = (e == null ? void 0 : e.optional) ?? !1;
    if (this.isInitialized(n) || this.shouldAutoInitialize())
      try {
        return this.getOrInitializeService({
          instanceIdentifier: n
        });
      } catch (s) {
        if (r)
          return null;
        throw s;
      }
    else {
      if (r)
        return null;
      throw Error(`Service ${this.name} is not available`);
    }
  }
  getComponent() {
    return this.component;
  }
  setComponent(e) {
    if (e.name !== this.name)
      throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);
    if (this.component)
      throw Error(`Component for ${this.name} has already been provided`);
    if (this.component = e, !!this.shouldAutoInitialize()) {
      if (Jt(e))
        try {
          this.getOrInitializeService({ instanceIdentifier: T });
        } catch {
        }
      for (const [n, r] of this.instancesDeferred.entries()) {
        const s = this.normalizeInstanceIdentifier(n);
        try {
          const i = this.getOrInitializeService({
            instanceIdentifier: s
          });
          r.resolve(i);
        } catch {
        }
      }
    }
  }
  clearInstance(e = T) {
    this.instancesDeferred.delete(e), this.instancesOptions.delete(e), this.instances.delete(e);
  }
  // app.delete() will call this method on every provider to delete the services
  // TODO: should we mark the provider as deleted?
  async delete() {
    const e = Array.from(this.instances.values());
    await Promise.all([
      ...e.filter((n) => "INTERNAL" in n).map((n) => n.INTERNAL.delete()),
      ...e.filter((n) => "_delete" in n).map((n) => n._delete())
    ]);
  }
  isComponentSet() {
    return this.component != null;
  }
  isInitialized(e = T) {
    return this.instances.has(e);
  }
  getOptions(e = T) {
    return this.instancesOptions.get(e) || {};
  }
  initialize(e = {}) {
    const { options: n = {} } = e, r = this.normalizeInstanceIdentifier(e.instanceIdentifier);
    if (this.isInitialized(r))
      throw Error(`${this.name}(${r}) has already been initialized`);
    if (!this.isComponentSet())
      throw Error(`Component ${this.name} has not been registered yet`);
    const s = this.getOrInitializeService({
      instanceIdentifier: r,
      options: n
    });
    for (const [i, a] of this.instancesDeferred.entries()) {
      const o = this.normalizeInstanceIdentifier(i);
      r === o && a.resolve(s);
    }
    return s;
  }
  /**
   *
   * @param callback - a function that will be invoked  after the provider has been initialized by calling provider.initialize().
   * The function is invoked SYNCHRONOUSLY, so it should not execute any longrunning tasks in order to not block the program.
   *
   * @param identifier An optional instance identifier
   * @returns a function to unregister the callback
   */
  onInit(e, n) {
    const r = this.normalizeInstanceIdentifier(n), s = this.onInitCallbacks.get(r) ?? /* @__PURE__ */ new Set();
    s.add(e), this.onInitCallbacks.set(r, s);
    const i = this.instances.get(r);
    return i && e(i, r), () => {
      s.delete(e);
    };
  }
  /**
   * Invoke onInit callbacks synchronously
   * @param instance the service instance`
   */
  invokeOnInitCallbacks(e, n) {
    const r = this.onInitCallbacks.get(n);
    if (r)
      for (const s of r)
        try {
          s(e, n);
        } catch {
        }
  }
  getOrInitializeService({ instanceIdentifier: e, options: n = {} }) {
    let r = this.instances.get(e);
    if (!r && this.component && (r = this.component.instanceFactory(this.container, {
      instanceIdentifier: Gt(e),
      options: n
    }), this.instances.set(e, r), this.instancesOptions.set(e, n), this.invokeOnInitCallbacks(r, e), this.component.onInstanceCreated))
      try {
        this.component.onInstanceCreated(this.container, e, r);
      } catch {
      }
    return r || null;
  }
  normalizeInstanceIdentifier(e = T) {
    return this.component ? this.component.multipleInstances ? e : T : e;
  }
  shouldAutoInitialize() {
    return !!this.component && this.component.instantiationMode !== "EXPLICIT";
  }
}
function Gt(t) {
  return t === T ? void 0 : t;
}
function Jt(t) {
  return t.instantiationMode === "EAGER";
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Xt {
  constructor(e) {
    this.name = e, this.providers = /* @__PURE__ */ new Map();
  }
  /**
   *
   * @param component Component being added
   * @param overwrite When a component with the same name has already been registered,
   * if overwrite is true: overwrite the existing component with the new component and create a new
   * provider with the new component. It can be useful in tests where you want to use different mocks
   * for different tests.
   * if overwrite is false: throw an exception
   */
  addComponent(e) {
    const n = this.getProvider(e.name);
    if (n.isComponentSet())
      throw new Error(`Component ${e.name} has already been registered with ${this.name}`);
    n.setComponent(e);
  }
  addOrOverwriteComponent(e) {
    this.getProvider(e.name).isComponentSet() && this.providers.delete(e.name), this.addComponent(e);
  }
  /**
   * getProvider provides a type safe interface where it can only be called with a field name
   * present in NameServiceMapping interface.
   *
   * Firebase SDKs providing services should extend NameServiceMapping interface to register
   * themselves.
   */
  getProvider(e) {
    if (this.providers.has(e))
      return this.providers.get(e);
    const n = new zt(e, this);
    return this.providers.set(e, n), n;
  }
  getProviders() {
    return Array.from(this.providers.values());
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var u;
(function(t) {
  t[t.DEBUG = 0] = "DEBUG", t[t.VERBOSE = 1] = "VERBOSE", t[t.INFO = 2] = "INFO", t[t.WARN = 3] = "WARN", t[t.ERROR = 4] = "ERROR", t[t.SILENT = 5] = "SILENT";
})(u || (u = {}));
const Yt = {
  debug: u.DEBUG,
  verbose: u.VERBOSE,
  info: u.INFO,
  warn: u.WARN,
  error: u.ERROR,
  silent: u.SILENT
}, Qt = u.INFO, Zt = {
  [u.DEBUG]: "log",
  [u.VERBOSE]: "log",
  [u.INFO]: "info",
  [u.WARN]: "warn",
  [u.ERROR]: "error"
}, en = (t, e, ...n) => {
  if (e < t.logLevel)
    return;
  const r = (/* @__PURE__ */ new Date()).toISOString(), s = Zt[e];
  if (s)
    console[s](`[${r}]  ${t.name}:`, ...n);
  else
    throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`);
};
class tn {
  /**
   * Gives you an instance of a Logger to capture messages according to
   * Firebase's logging scheme.
   *
   * @param name The name that the logs will be associated with
   */
  constructor(e) {
    this.name = e, this._logLevel = Qt, this._logHandler = en, this._userLogHandler = null;
  }
  get logLevel() {
    return this._logLevel;
  }
  set logLevel(e) {
    if (!(e in u))
      throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
    this._logLevel = e;
  }
  // Workaround for setter/getter having to be the same type.
  setLogLevel(e) {
    this._logLevel = typeof e == "string" ? Yt[e] : e;
  }
  get logHandler() {
    return this._logHandler;
  }
  set logHandler(e) {
    if (typeof e != "function")
      throw new TypeError("Value assigned to `logHandler` must be a function");
    this._logHandler = e;
  }
  get userLogHandler() {
    return this._userLogHandler;
  }
  set userLogHandler(e) {
    this._userLogHandler = e;
  }
  /**
   * The functions below are all based on the `console` interface
   */
  debug(...e) {
    this._userLogHandler && this._userLogHandler(this, u.DEBUG, ...e), this._logHandler(this, u.DEBUG, ...e);
  }
  log(...e) {
    this._userLogHandler && this._userLogHandler(this, u.VERBOSE, ...e), this._logHandler(this, u.VERBOSE, ...e);
  }
  info(...e) {
    this._userLogHandler && this._userLogHandler(this, u.INFO, ...e), this._logHandler(this, u.INFO, ...e);
  }
  warn(...e) {
    this._userLogHandler && this._userLogHandler(this, u.WARN, ...e), this._logHandler(this, u.WARN, ...e);
  }
  error(...e) {
    this._userLogHandler && this._userLogHandler(this, u.ERROR, ...e), this._logHandler(this, u.ERROR, ...e);
  }
}
const nn = (t, e) => e.some((n) => t instanceof n);
let ke, ve;
function rn() {
  return ke || (ke = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function sn() {
  return ve || (ve = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
const Ze = /* @__PURE__ */ new WeakMap(), le = /* @__PURE__ */ new WeakMap(), et = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ new WeakMap(), ge = /* @__PURE__ */ new WeakMap();
function an(t) {
  const e = new Promise((n, r) => {
    const s = () => {
      t.removeEventListener("success", i), t.removeEventListener("error", a);
    }, i = () => {
      n(y(t.result)), s();
    }, a = () => {
      r(t.error), s();
    };
    t.addEventListener("success", i), t.addEventListener("error", a);
  });
  return e.then((n) => {
    n instanceof IDBCursor && Ze.set(n, t);
  }).catch(() => {
  }), ge.set(e, t), e;
}
function on(t) {
  if (le.has(t))
    return;
  const e = new Promise((n, r) => {
    const s = () => {
      t.removeEventListener("complete", i), t.removeEventListener("error", a), t.removeEventListener("abort", a);
    }, i = () => {
      n(), s();
    }, a = () => {
      r(t.error || new DOMException("AbortError", "AbortError")), s();
    };
    t.addEventListener("complete", i), t.addEventListener("error", a), t.addEventListener("abort", a);
  });
  le.set(t, e);
}
let ue = {
  get(t, e, n) {
    if (t instanceof IDBTransaction) {
      if (e === "done")
        return le.get(t);
      if (e === "objectStoreNames")
        return t.objectStoreNames || et.get(t);
      if (e === "store")
        return n.objectStoreNames[1] ? void 0 : n.objectStore(n.objectStoreNames[0]);
    }
    return y(t[e]);
  },
  set(t, e, n) {
    return t[e] = n, !0;
  },
  has(t, e) {
    return t instanceof IDBTransaction && (e === "done" || e === "store") ? !0 : e in t;
  }
};
function cn(t) {
  ue = t(ue);
}
function ln(t) {
  return t === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype) ? function(e, ...n) {
    const r = t.call(Y(this), e, ...n);
    return et.set(r, e.sort ? e.sort() : [e]), y(r);
  } : sn().includes(t) ? function(...e) {
    return t.apply(Y(this), e), y(Ze.get(this));
  } : function(...e) {
    return y(t.apply(Y(this), e));
  };
}
function un(t) {
  return typeof t == "function" ? ln(t) : (t instanceof IDBTransaction && on(t), nn(t, rn()) ? new Proxy(t, ue) : t);
}
function y(t) {
  if (t instanceof IDBRequest)
    return an(t);
  if (X.has(t))
    return X.get(t);
  const e = un(t);
  return e !== t && (X.set(t, e), ge.set(e, t)), e;
}
const Y = (t) => ge.get(t);
function q(t, e, { blocked: n, upgrade: r, blocking: s, terminated: i } = {}) {
  const a = indexedDB.open(t, e), o = y(a);
  return r && a.addEventListener("upgradeneeded", (l) => {
    r(y(a.result), l.oldVersion, l.newVersion, y(a.transaction), l);
  }), n && a.addEventListener("blocked", (l) => n(
    // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
    l.oldVersion,
    l.newVersion,
    l
  )), o.then((l) => {
    i && l.addEventListener("close", () => i()), s && l.addEventListener("versionchange", (c) => s(c.oldVersion, c.newVersion, c));
  }).catch(() => {
  }), o;
}
function Q(t, { blocked: e } = {}) {
  const n = indexedDB.deleteDatabase(t);
  return e && n.addEventListener("blocked", (r) => e(
    // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
    r.oldVersion,
    r
  )), y(n).then(() => {
  });
}
const hn = ["get", "getKey", "getAll", "getAllKeys", "count"], fn = ["put", "add", "delete", "clear"], Z = /* @__PURE__ */ new Map();
function Ne(t, e) {
  if (!(t instanceof IDBDatabase && !(e in t) && typeof e == "string"))
    return;
  if (Z.get(e))
    return Z.get(e);
  const n = e.replace(/FromIndex$/, ""), r = e !== n, s = fn.includes(n);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(n in (r ? IDBIndex : IDBObjectStore).prototype) || !(s || hn.includes(n))
  )
    return;
  const i = async function(a, ...o) {
    const l = this.transaction(a, s ? "readwrite" : "readonly");
    let c = l.store;
    return r && (c = c.index(o.shift())), (await Promise.all([
      c[n](...o),
      s && l.done
    ]))[0];
  };
  return Z.set(e, i), i;
}
cn((t) => ({
  ...t,
  get: (e, n, r) => Ne(e, n) || t.get(e, n, r),
  has: (e, n) => !!Ne(e, n) || t.has(e, n)
}));
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class dn {
  constructor(e) {
    this.container = e;
  }
  // In initial implementation, this will be called by installations on
  // auth token refresh, and installations will send this string.
  getPlatformInfoString() {
    return this.container.getProviders().map((n) => {
      if (pn(n)) {
        const r = n.getImmediate();
        return `${r.library}/${r.version}`;
      } else
        return null;
    }).filter((n) => n).join(" ");
  }
}
function pn(t) {
  const e = t.getComponent();
  return (e == null ? void 0 : e.type) === "VERSION";
}
const he = "@firebase/app", Oe = "0.14.1";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const I = new tn("@firebase/app"), gn = "@firebase/app-compat", mn = "@firebase/analytics-compat", bn = "@firebase/analytics", wn = "@firebase/app-check-compat", yn = "@firebase/app-check", _n = "@firebase/auth", In = "@firebase/auth-compat", En = "@firebase/database", Sn = "@firebase/data-connect", Cn = "@firebase/database-compat", Tn = "@firebase/functions", An = "@firebase/functions-compat", Dn = "@firebase/installations", Rn = "@firebase/installations-compat", kn = "@firebase/messaging", vn = "@firebase/messaging-compat", Nn = "@firebase/performance", On = "@firebase/performance-compat", Mn = "@firebase/remote-config", Pn = "@firebase/remote-config-compat", Ln = "@firebase/storage", Bn = "@firebase/storage-compat", xn = "@firebase/firestore", Un = "@firebase/ai", $n = "@firebase/firestore-compat", Fn = "firebase";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const fe = "[DEFAULT]", Hn = {
  [he]: "fire-core",
  [gn]: "fire-core-compat",
  [bn]: "fire-analytics",
  [mn]: "fire-analytics-compat",
  [yn]: "fire-app-check",
  [wn]: "fire-app-check-compat",
  [_n]: "fire-auth",
  [In]: "fire-auth-compat",
  [En]: "fire-rtdb",
  [Sn]: "fire-data-connect",
  [Cn]: "fire-rtdb-compat",
  [Tn]: "fire-fn",
  [An]: "fire-fn-compat",
  [Dn]: "fire-iid",
  [Rn]: "fire-iid-compat",
  [kn]: "fire-fcm",
  [vn]: "fire-fcm-compat",
  [Nn]: "fire-perf",
  [On]: "fire-perf-compat",
  [Mn]: "fire-rc",
  [Pn]: "fire-rc-compat",
  [Ln]: "fire-gcs",
  [Bn]: "fire-gcs-compat",
  [xn]: "fire-fst",
  [$n]: "fire-fst-compat",
  [Un]: "fire-vertex",
  "fire-js": "fire-js",
  // Platform identifier for JS SDK.
  [Fn]: "fire-js-all"
};
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const F = /* @__PURE__ */ new Map(), Kn = /* @__PURE__ */ new Map(), de = /* @__PURE__ */ new Map();
function Me(t, e) {
  try {
    t.container.addComponent(e);
  } catch (n) {
    I.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`, n);
  }
}
function O(t) {
  const e = t.name;
  if (de.has(e))
    return I.debug(`There were multiple attempts to register component ${e}.`), !1;
  de.set(e, t);
  for (const n of F.values())
    Me(n, t);
  for (const n of Kn.values())
    Me(n, t);
  return !0;
}
function me(t, e) {
  const n = t.container.getProvider("heartbeat").getImmediate({ optional: !0 });
  return n && n.triggerHeartbeat(), t.container.getProvider(e);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const jn = {
  "no-app": "No Firebase App '{$appName}' has been created - call initializeApp() first",
  "bad-app-name": "Illegal App name: '{$appName}'",
  "duplicate-app": "Firebase App named '{$appName}' already exists with different options or config",
  "app-deleted": "Firebase App named '{$appName}' already deleted",
  "server-app-deleted": "Firebase Server App has been deleted",
  "no-options": "Need to provide options, when not being deployed to hosting via source.",
  "invalid-app-argument": "firebase.{$appName}() takes either no argument or a Firebase App instance.",
  "invalid-log-argument": "First argument to `onLog` must be null or a function.",
  "idb-open": "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
  "idb-get": "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
  "idb-set": "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
  "idb-delete": "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",
  "finalization-registry-not-supported": "FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.",
  "invalid-server-app-environment": "FirebaseServerApp is not for use in browser environments."
}, C = new W("app", "Firebase", jn);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Vn {
  constructor(e, n, r) {
    this._isDeleted = !1, this._options = { ...e }, this._config = { ...n }, this._name = n.name, this._automaticDataCollectionEnabled = n.automaticDataCollectionEnabled, this._container = r, this.container.addComponent(new D(
      "app",
      () => this,
      "PUBLIC"
      /* ComponentType.PUBLIC */
    ));
  }
  get automaticDataCollectionEnabled() {
    return this.checkDestroyed(), this._automaticDataCollectionEnabled;
  }
  set automaticDataCollectionEnabled(e) {
    this.checkDestroyed(), this._automaticDataCollectionEnabled = e;
  }
  get name() {
    return this.checkDestroyed(), this._name;
  }
  get options() {
    return this.checkDestroyed(), this._options;
  }
  get config() {
    return this.checkDestroyed(), this._config;
  }
  get container() {
    return this._container;
  }
  get isDeleted() {
    return this._isDeleted;
  }
  set isDeleted(e) {
    this._isDeleted = e;
  }
  /**
   * This function will throw an Error if the App has already been deleted -
   * use before performing API actions on the App.
   */
  checkDestroyed() {
    if (this.isDeleted)
      throw C.create("app-deleted", { appName: this._name });
  }
}
function tt(t, e = {}) {
  let n = t;
  typeof e != "object" && (e = { name: e });
  const r = {
    name: fe,
    automaticDataCollectionEnabled: !0,
    ...e
  }, s = r.name;
  if (typeof s != "string" || !s)
    throw C.create("bad-app-name", {
      appName: String(s)
    });
  if (n || (n = Xe()), !n)
    throw C.create(
      "no-options"
      /* AppError.NO_OPTIONS */
    );
  const i = F.get(s);
  if (i) {
    if (ce(n, i.options) && ce(r, i.config))
      return i;
    throw C.create("duplicate-app", { appName: s });
  }
  const a = new Xt(s);
  for (const l of de.values())
    a.addComponent(l);
  const o = new Vn(n, r, a);
  return F.set(s, o), o;
}
function Wn(t = fe) {
  const e = F.get(t);
  if (!e && t === fe && Xe())
    return tt();
  if (!e)
    throw C.create("no-app", { appName: t });
  return e;
}
function N(t, e, n) {
  let r = Hn[t] ?? t;
  n && (r += `-${n}`);
  const s = r.match(/\s|\//), i = e.match(/\s|\//);
  if (s || i) {
    const a = [
      `Unable to register library "${r}" with version "${e}":`
    ];
    s && a.push(`library name "${r}" contains illegal characters (whitespace or "/")`), s && i && a.push("and"), i && a.push(`version name "${e}" contains illegal characters (whitespace or "/")`), I.warn(a.join(" "));
    return;
  }
  O(new D(
    `${r}-version`,
    () => ({ library: r, version: e }),
    "VERSION"
    /* ComponentType.VERSION */
  ));
}
/**
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
 */
const qn = "firebase-heartbeat-database", zn = 1, U = "firebase-heartbeat-store";
let ee = null;
function nt() {
  return ee || (ee = q(qn, zn, {
    upgrade: (t, e) => {
      switch (e) {
        case 0:
          try {
            t.createObjectStore(U);
          } catch (n) {
            console.warn(n);
          }
      }
    }
  }).catch((t) => {
    throw C.create("idb-open", {
      originalErrorMessage: t.message
    });
  })), ee;
}
async function Gn(t) {
  try {
    const n = (await nt()).transaction(U), r = await n.objectStore(U).get(rt(t));
    return await n.done, r;
  } catch (e) {
    if (e instanceof M)
      I.warn(e.message);
    else {
      const n = C.create("idb-get", {
        originalErrorMessage: e == null ? void 0 : e.message
      });
      I.warn(n.message);
    }
  }
}
async function Pe(t, e) {
  try {
    const r = (await nt()).transaction(U, "readwrite");
    await r.objectStore(U).put(e, rt(t)), await r.done;
  } catch (n) {
    if (n instanceof M)
      I.warn(n.message);
    else {
      const r = C.create("idb-set", {
        originalErrorMessage: n == null ? void 0 : n.message
      });
      I.warn(r.message);
    }
  }
}
function rt(t) {
  return `${t.name}!${t.options.appId}`;
}
/**
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
 */
const Jn = 1024, Xn = 30;
class Yn {
  constructor(e) {
    this.container = e, this._heartbeatsCache = null;
    const n = this.container.getProvider("app").getImmediate();
    this._storage = new Zn(n), this._heartbeatsCachePromise = this._storage.read().then((r) => (this._heartbeatsCache = r, r));
  }
  /**
   * Called to report a heartbeat. The function will generate
   * a HeartbeatsByUserAgent object, update heartbeatsCache, and persist it
   * to IndexedDB.
   * Note that we only store one heartbeat per day. So if a heartbeat for today is
   * already logged, subsequent calls to this function in the same day will be ignored.
   */
  async triggerHeartbeat() {
    var e, n;
    try {
      const s = this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(), i = Le();
      if (((e = this._heartbeatsCache) == null ? void 0 : e.heartbeats) == null && (this._heartbeatsCache = await this._heartbeatsCachePromise, ((n = this._heartbeatsCache) == null ? void 0 : n.heartbeats) == null) || this._heartbeatsCache.lastSentHeartbeatDate === i || this._heartbeatsCache.heartbeats.some((a) => a.date === i))
        return;
      if (this._heartbeatsCache.heartbeats.push({ date: i, agent: s }), this._heartbeatsCache.heartbeats.length > Xn) {
        const a = er(this._heartbeatsCache.heartbeats);
        this._heartbeatsCache.heartbeats.splice(a, 1);
      }
      return this._storage.overwrite(this._heartbeatsCache);
    } catch (r) {
      I.warn(r);
    }
  }
  /**
   * Returns a base64 encoded string which can be attached to the heartbeat-specific header directly.
   * It also clears all heartbeats from memory as well as in IndexedDB.
   *
   * NOTE: Consuming product SDKs should not send the header if this method
   * returns an empty string.
   */
  async getHeartbeatsHeader() {
    var e;
    try {
      if (this._heartbeatsCache === null && await this._heartbeatsCachePromise, ((e = this._heartbeatsCache) == null ? void 0 : e.heartbeats) == null || this._heartbeatsCache.heartbeats.length === 0)
        return "";
      const n = Le(), { heartbeatsToSend: r, unsentEntries: s } = Qn(this._heartbeatsCache.heartbeats), i = Je(JSON.stringify({ version: 2, heartbeats: r }));
      return this._heartbeatsCache.lastSentHeartbeatDate = n, s.length > 0 ? (this._heartbeatsCache.heartbeats = s, await this._storage.overwrite(this._heartbeatsCache)) : (this._heartbeatsCache.heartbeats = [], this._storage.overwrite(this._heartbeatsCache)), i;
    } catch (n) {
      return I.warn(n), "";
    }
  }
}
function Le() {
  return (/* @__PURE__ */ new Date()).toISOString().substring(0, 10);
}
function Qn(t, e = Jn) {
  const n = [];
  let r = t.slice();
  for (const s of t) {
    const i = n.find((a) => a.agent === s.agent);
    if (i) {
      if (i.dates.push(s.date), Be(n) > e) {
        i.dates.pop();
        break;
      }
    } else if (n.push({
      agent: s.agent,
      dates: [s.date]
    }), Be(n) > e) {
      n.pop();
      break;
    }
    r = r.slice(1);
  }
  return {
    heartbeatsToSend: n,
    unsentEntries: r
  };
}
class Zn {
  constructor(e) {
    this.app = e, this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck();
  }
  async runIndexedDBEnvironmentCheck() {
    return Ye() ? Qe().then(() => !0).catch(() => !1) : !1;
  }
  /**
   * Read all heartbeats.
   */
  async read() {
    if (await this._canUseIndexedDBPromise) {
      const n = await Gn(this.app);
      return n != null && n.heartbeats ? n : { heartbeats: [] };
    } else
      return { heartbeats: [] };
  }
  // overwrite the storage with the provided heartbeats
  async overwrite(e) {
    if (await this._canUseIndexedDBPromise) {
      const r = await this.read();
      return Pe(this.app, {
        lastSentHeartbeatDate: e.lastSentHeartbeatDate ?? r.lastSentHeartbeatDate,
        heartbeats: e.heartbeats
      });
    } else
      return;
  }
  // add heartbeats
  async add(e) {
    if (await this._canUseIndexedDBPromise) {
      const r = await this.read();
      return Pe(this.app, {
        lastSentHeartbeatDate: e.lastSentHeartbeatDate ?? r.lastSentHeartbeatDate,
        heartbeats: [
          ...r.heartbeats,
          ...e.heartbeats
        ]
      });
    } else
      return;
  }
}
function Be(t) {
  return Je(
    // heartbeatsCache wrapper properties
    JSON.stringify({ version: 2, heartbeats: t })
  ).length;
}
function er(t) {
  if (t.length === 0)
    return -1;
  let e = 0, n = t[0].date;
  for (let r = 1; r < t.length; r++)
    t[r].date < n && (n = t[r].date, e = r);
  return e;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function tr(t) {
  O(new D(
    "platform-logger",
    (e) => new dn(e),
    "PRIVATE"
    /* ComponentType.PRIVATE */
  )), O(new D(
    "heartbeat",
    (e) => new Yn(e),
    "PRIVATE"
    /* ComponentType.PRIVATE */
  )), N(he, Oe, t), N(he, Oe, "esm2020"), N("fire-js", "");
}
tr("");
var nr = "firebase", rr = "12.1.0";
/**
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
 */
N(nr, rr, "app");
const st = "@firebase/installations", be = "0.6.19";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const it = 1e4, at = `w:${be}`, ot = "FIS_v2", sr = "https://firebaseinstallations.googleapis.com/v1", ir = 60 * 60 * 1e3, ar = "installations", or = "Installations";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const cr = {
  "missing-app-config-values": 'Missing App configuration value: "{$valueName}"',
  "not-registered": "Firebase Installation is not registered.",
  "installation-not-found": "Firebase Installation not found.",
  "request-failed": '{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',
  "app-offline": "Could not process request. Application offline.",
  "delete-pending-registration": "Can't delete installation while there is a pending registration request."
}, R = new W(ar, or, cr);
function ct(t) {
  return t instanceof M && t.code.includes(
    "request-failed"
    /* ErrorCode.REQUEST_FAILED */
  );
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function lt({ projectId: t }) {
  return `${sr}/projects/${t}/installations`;
}
function ut(t) {
  return {
    token: t.token,
    requestStatus: 2,
    expiresIn: ur(t.expiresIn),
    creationTime: Date.now()
  };
}
async function ht(t, e) {
  const r = (await e.json()).error;
  return R.create("request-failed", {
    requestName: t,
    serverCode: r.code,
    serverMessage: r.message,
    serverStatus: r.status
  });
}
function ft({ apiKey: t }) {
  return new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-goog-api-key": t
  });
}
function lr(t, { refreshToken: e }) {
  const n = ft(t);
  return n.append("Authorization", hr(e)), n;
}
async function dt(t) {
  const e = await t();
  return e.status >= 500 && e.status < 600 ? t() : e;
}
function ur(t) {
  return Number(t.replace("s", "000"));
}
function hr(t) {
  return `${ot} ${t}`;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function fr({ appConfig: t, heartbeatServiceProvider: e }, { fid: n }) {
  const r = lt(t), s = ft(t), i = e.getImmediate({
    optional: !0
  });
  if (i) {
    const c = await i.getHeartbeatsHeader();
    c && s.append("x-firebase-client", c);
  }
  const a = {
    fid: n,
    authVersion: ot,
    appId: t.appId,
    sdkVersion: at
  }, o = {
    method: "POST",
    headers: s,
    body: JSON.stringify(a)
  }, l = await dt(() => fetch(r, o));
  if (l.ok) {
    const c = await l.json();
    return {
      fid: c.fid || n,
      registrationStatus: 2,
      refreshToken: c.refreshToken,
      authToken: ut(c.authToken)
    };
  } else
    throw await ht("Create Installation", l);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function pt(t) {
  return new Promise((e) => {
    setTimeout(e, t);
  });
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function dr(t) {
  return btoa(String.fromCharCode(...t)).replace(/\+/g, "-").replace(/\//g, "_");
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const pr = /^[cdef][\w-]{21}$/, pe = "";
function gr() {
  try {
    const t = new Uint8Array(17);
    (self.crypto || self.msCrypto).getRandomValues(t), t[0] = 112 + t[0] % 16;
    const n = mr(t);
    return pr.test(n) ? n : pe;
  } catch {
    return pe;
  }
}
function mr(t) {
  return dr(t).substr(0, 22);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function z(t) {
  return `${t.appName}!${t.appId}`;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const gt = /* @__PURE__ */ new Map();
function mt(t, e) {
  const n = z(t);
  bt(n, e), br(n, e);
}
function bt(t, e) {
  const n = gt.get(t);
  if (n)
    for (const r of n)
      r(e);
}
function br(t, e) {
  const n = wr();
  n && n.postMessage({ key: t, fid: e }), yr();
}
let A = null;
function wr() {
  return !A && "BroadcastChannel" in self && (A = new BroadcastChannel("[Firebase] FID Change"), A.onmessage = (t) => {
    bt(t.data.key, t.data.fid);
  }), A;
}
function yr() {
  gt.size === 0 && A && (A.close(), A = null);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const _r = "firebase-installations-database", Ir = 1, k = "firebase-installations-store";
let te = null;
function we() {
  return te || (te = q(_r, Ir, {
    upgrade: (t, e) => {
      switch (e) {
        case 0:
          t.createObjectStore(k);
      }
    }
  })), te;
}
async function H(t, e) {
  const n = z(t), s = (await we()).transaction(k, "readwrite"), i = s.objectStore(k), a = await i.get(n);
  return await i.put(e, n), await s.done, (!a || a.fid !== e.fid) && mt(t, e.fid), e;
}
async function wt(t) {
  const e = z(t), r = (await we()).transaction(k, "readwrite");
  await r.objectStore(k).delete(e), await r.done;
}
async function G(t, e) {
  const n = z(t), s = (await we()).transaction(k, "readwrite"), i = s.objectStore(k), a = await i.get(n), o = e(a);
  return o === void 0 ? await i.delete(n) : await i.put(o, n), await s.done, o && (!a || a.fid !== o.fid) && mt(t, o.fid), o;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function ye(t) {
  let e;
  const n = await G(t.appConfig, (r) => {
    const s = Er(r), i = Sr(t, s);
    return e = i.registrationPromise, i.installationEntry;
  });
  return n.fid === pe ? { installationEntry: await e } : {
    installationEntry: n,
    registrationPromise: e
  };
}
function Er(t) {
  const e = t || {
    fid: gr(),
    registrationStatus: 0
    /* RequestStatus.NOT_STARTED */
  };
  return yt(e);
}
function Sr(t, e) {
  if (e.registrationStatus === 0) {
    if (!navigator.onLine) {
      const s = Promise.reject(R.create(
        "app-offline"
        /* ErrorCode.APP_OFFLINE */
      ));
      return {
        installationEntry: e,
        registrationPromise: s
      };
    }
    const n = {
      fid: e.fid,
      registrationStatus: 1,
      registrationTime: Date.now()
    }, r = Cr(t, n);
    return { installationEntry: n, registrationPromise: r };
  } else return e.registrationStatus === 1 ? {
    installationEntry: e,
    registrationPromise: Tr(t)
  } : { installationEntry: e };
}
async function Cr(t, e) {
  try {
    const n = await fr(t, e);
    return H(t.appConfig, n);
  } catch (n) {
    throw ct(n) && n.customData.serverCode === 409 ? await wt(t.appConfig) : await H(t.appConfig, {
      fid: e.fid,
      registrationStatus: 0
      /* RequestStatus.NOT_STARTED */
    }), n;
  }
}
async function Tr(t) {
  let e = await xe(t.appConfig);
  for (; e.registrationStatus === 1; )
    await pt(100), e = await xe(t.appConfig);
  if (e.registrationStatus === 0) {
    const { installationEntry: n, registrationPromise: r } = await ye(t);
    return r || n;
  }
  return e;
}
function xe(t) {
  return G(t, (e) => {
    if (!e)
      throw R.create(
        "installation-not-found"
        /* ErrorCode.INSTALLATION_NOT_FOUND */
      );
    return yt(e);
  });
}
function yt(t) {
  return Ar(t) ? {
    fid: t.fid,
    registrationStatus: 0
    /* RequestStatus.NOT_STARTED */
  } : t;
}
function Ar(t) {
  return t.registrationStatus === 1 && t.registrationTime + it < Date.now();
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Dr({ appConfig: t, heartbeatServiceProvider: e }, n) {
  const r = Rr(t, n), s = lr(t, n), i = e.getImmediate({
    optional: !0
  });
  if (i) {
    const c = await i.getHeartbeatsHeader();
    c && s.append("x-firebase-client", c);
  }
  const a = {
    installation: {
      sdkVersion: at,
      appId: t.appId
    }
  }, o = {
    method: "POST",
    headers: s,
    body: JSON.stringify(a)
  }, l = await dt(() => fetch(r, o));
  if (l.ok) {
    const c = await l.json();
    return ut(c);
  } else
    throw await ht("Generate Auth Token", l);
}
function Rr(t, { fid: e }) {
  return `${lt(t)}/${e}/authTokens:generate`;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function _e(t, e = !1) {
  let n;
  const r = await G(t.appConfig, (i) => {
    if (!_t(i))
      throw R.create(
        "not-registered"
        /* ErrorCode.NOT_REGISTERED */
      );
    const a = i.authToken;
    if (!e && Nr(a))
      return i;
    if (a.requestStatus === 1)
      return n = kr(t, e), i;
    {
      if (!navigator.onLine)
        throw R.create(
          "app-offline"
          /* ErrorCode.APP_OFFLINE */
        );
      const o = Mr(i);
      return n = vr(t, o), o;
    }
  });
  return n ? await n : r.authToken;
}
async function kr(t, e) {
  let n = await Ue(t.appConfig);
  for (; n.authToken.requestStatus === 1; )
    await pt(100), n = await Ue(t.appConfig);
  const r = n.authToken;
  return r.requestStatus === 0 ? _e(t, e) : r;
}
function Ue(t) {
  return G(t, (e) => {
    if (!_t(e))
      throw R.create(
        "not-registered"
        /* ErrorCode.NOT_REGISTERED */
      );
    const n = e.authToken;
    return Pr(n) ? {
      ...e,
      authToken: {
        requestStatus: 0
        /* RequestStatus.NOT_STARTED */
      }
    } : e;
  });
}
async function vr(t, e) {
  try {
    const n = await Dr(t, e), r = {
      ...e,
      authToken: n
    };
    return await H(t.appConfig, r), n;
  } catch (n) {
    if (ct(n) && (n.customData.serverCode === 401 || n.customData.serverCode === 404))
      await wt(t.appConfig);
    else {
      const r = {
        ...e,
        authToken: {
          requestStatus: 0
          /* RequestStatus.NOT_STARTED */
        }
      };
      await H(t.appConfig, r);
    }
    throw n;
  }
}
function _t(t) {
  return t !== void 0 && t.registrationStatus === 2;
}
function Nr(t) {
  return t.requestStatus === 2 && !Or(t);
}
function Or(t) {
  const e = Date.now();
  return e < t.creationTime || t.creationTime + t.expiresIn < e + ir;
}
function Mr(t) {
  const e = {
    requestStatus: 1,
    requestTime: Date.now()
  };
  return {
    ...t,
    authToken: e
  };
}
function Pr(t) {
  return t.requestStatus === 1 && t.requestTime + it < Date.now();
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Lr(t) {
  const e = t, { installationEntry: n, registrationPromise: r } = await ye(e);
  return r ? r.catch(console.error) : _e(e).catch(console.error), n.fid;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Br(t, e = !1) {
  const n = t;
  return await xr(n), (await _e(n, e)).token;
}
async function xr(t) {
  const { registrationPromise: e } = await ye(t);
  e && await e;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Ur(t) {
  if (!t || !t.options)
    throw ne("App Configuration");
  if (!t.name)
    throw ne("App Name");
  const e = [
    "projectId",
    "apiKey",
    "appId"
  ];
  for (const n of e)
    if (!t.options[n])
      throw ne(n);
  return {
    appName: t.name,
    projectId: t.options.projectId,
    apiKey: t.options.apiKey,
    appId: t.options.appId
  };
}
function ne(t) {
  return R.create("missing-app-config-values", {
    valueName: t
  });
}
/**
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
 */
const It = "installations", $r = "installations-internal", Fr = (t) => {
  const e = t.getProvider("app").getImmediate(), n = Ur(e), r = me(e, "heartbeat");
  return {
    app: e,
    appConfig: n,
    heartbeatServiceProvider: r,
    _delete: () => Promise.resolve()
  };
}, Hr = (t) => {
  const e = t.getProvider("app").getImmediate(), n = me(e, It).getImmediate();
  return {
    getId: () => Lr(n),
    getToken: (s) => Br(n, s)
  };
};
function Kr() {
  O(new D(
    It,
    Fr,
    "PUBLIC"
    /* ComponentType.PUBLIC */
  )), O(new D(
    $r,
    Hr,
    "PRIVATE"
    /* ComponentType.PRIVATE */
  ));
}
Kr();
N(st, be);
N(st, be, "esm2020");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Et = "BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4", jr = "https://fcmregistrations.googleapis.com/v1", St = "FCM_MSG", Vr = "google.c.a.c_id", Wr = 3, qr = 1;
var K;
(function(t) {
  t[t.DATA_MESSAGE = 1] = "DATA_MESSAGE", t[t.DISPLAY_NOTIFICATION = 3] = "DISPLAY_NOTIFICATION";
})(K || (K = {}));
/**
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
 */
var j;
(function(t) {
  t.PUSH_RECEIVED = "push-received", t.NOTIFICATION_CLICKED = "notification-clicked";
})(j || (j = {}));
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function b(t) {
  const e = new Uint8Array(t);
  return btoa(String.fromCharCode(...e)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function zr(t) {
  const e = "=".repeat((4 - t.length % 4) % 4), n = (t + e).replace(/\-/g, "+").replace(/_/g, "/"), r = atob(n), s = new Uint8Array(r.length);
  for (let i = 0; i < r.length; ++i)
    s[i] = r.charCodeAt(i);
  return s;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const re = "fcm_token_details_db", Gr = 5, $e = "fcm_token_object_Store";
async function Jr(t) {
  if ("databases" in indexedDB && !(await indexedDB.databases()).map((i) => i.name).includes(re))
    return null;
  let e = null;
  return (await q(re, Gr, {
    upgrade: async (r, s, i, a) => {
      if (s < 2 || !r.objectStoreNames.contains($e))
        return;
      const o = a.objectStore($e), l = await o.index("fcmSenderId").get(t);
      if (await o.clear(), !!l) {
        if (s === 2) {
          const c = l;
          if (!c.auth || !c.p256dh || !c.endpoint)
            return;
          e = {
            token: c.fcmToken,
            createTime: c.createTime ?? Date.now(),
            subscriptionOptions: {
              auth: c.auth,
              p256dh: c.p256dh,
              endpoint: c.endpoint,
              swScope: c.swScope,
              vapidKey: typeof c.vapidKey == "string" ? c.vapidKey : b(c.vapidKey)
            }
          };
        } else if (s === 3) {
          const c = l;
          e = {
            token: c.fcmToken,
            createTime: c.createTime,
            subscriptionOptions: {
              auth: b(c.auth),
              p256dh: b(c.p256dh),
              endpoint: c.endpoint,
              swScope: c.swScope,
              vapidKey: b(c.vapidKey)
            }
          };
        } else if (s === 4) {
          const c = l;
          e = {
            token: c.fcmToken,
            createTime: c.createTime,
            subscriptionOptions: {
              auth: b(c.auth),
              p256dh: b(c.p256dh),
              endpoint: c.endpoint,
              swScope: c.swScope,
              vapidKey: b(c.vapidKey)
            }
          };
        }
      }
    }
  })).close(), await Q(re), await Q("fcm_vapid_details_db"), await Q("undefined"), Xr(e) ? e : null;
}
function Xr(t) {
  if (!t || !t.subscriptionOptions)
    return !1;
  const { subscriptionOptions: e } = t;
  return typeof t.createTime == "number" && t.createTime > 0 && typeof t.token == "string" && t.token.length > 0 && typeof e.auth == "string" && e.auth.length > 0 && typeof e.p256dh == "string" && e.p256dh.length > 0 && typeof e.endpoint == "string" && e.endpoint.length > 0 && typeof e.swScope == "string" && e.swScope.length > 0 && typeof e.vapidKey == "string" && e.vapidKey.length > 0;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Yr = "firebase-messaging-database", Qr = 1, v = "firebase-messaging-store";
let se = null;
function Ie() {
  return se || (se = q(Yr, Qr, {
    upgrade: (t, e) => {
      switch (e) {
        case 0:
          t.createObjectStore(v);
      }
    }
  })), se;
}
async function Ee(t) {
  const e = Ce(t), r = await (await Ie()).transaction(v).objectStore(v).get(e);
  if (r)
    return r;
  {
    const s = await Jr(t.appConfig.senderId);
    if (s)
      return await Se(t, s), s;
  }
}
async function Se(t, e) {
  const n = Ce(t), s = (await Ie()).transaction(v, "readwrite");
  return await s.objectStore(v).put(e, n), await s.done, e;
}
async function Zr(t) {
  const e = Ce(t), r = (await Ie()).transaction(v, "readwrite");
  await r.objectStore(v).delete(e), await r.done;
}
function Ce({ appConfig: t }) {
  return t.appId;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const es = {
  "missing-app-config-values": 'Missing App configuration value: "{$valueName}"',
  "only-available-in-window": "This method is available in a Window context.",
  "only-available-in-sw": "This method is available in a service worker context.",
  "permission-default": "The notification permission was not granted and dismissed instead.",
  "permission-blocked": "The notification permission was not granted and blocked instead.",
  "unsupported-browser": "This browser doesn't support the API's required to use the Firebase SDK.",
  "indexed-db-unsupported": "This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)",
  "failed-service-worker-registration": "We are unable to register the default service worker. {$browserErrorMessage}",
  "token-subscribe-failed": "A problem occurred while subscribing the user to FCM: {$errorInfo}",
  "token-subscribe-no-token": "FCM returned no token when subscribing the user to push.",
  "token-unsubscribe-failed": "A problem occurred while unsubscribing the user from FCM: {$errorInfo}",
  "token-update-failed": "A problem occurred while updating the user from FCM: {$errorInfo}",
  "token-update-no-token": "FCM returned no token when updating the user to push.",
  "use-sw-after-get-token": "The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.",
  "invalid-sw-registration": "The input to useServiceWorker() must be a ServiceWorkerRegistration.",
  "invalid-bg-handler": "The input to setBackgroundMessageHandler() must be a function.",
  "invalid-vapid-key": "The public VAPID key must be a string.",
  "use-vapid-key-after-get-token": "The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."
}, p = new W("messaging", "Messaging", es);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function ts(t, e) {
  const n = await Ae(t), r = Tt(e), s = {
    method: "POST",
    headers: n,
    body: JSON.stringify(r)
  };
  let i;
  try {
    i = await (await fetch(Te(t.appConfig), s)).json();
  } catch (a) {
    throw p.create("token-subscribe-failed", {
      errorInfo: a == null ? void 0 : a.toString()
    });
  }
  if (i.error) {
    const a = i.error.message;
    throw p.create("token-subscribe-failed", {
      errorInfo: a
    });
  }
  if (!i.token)
    throw p.create(
      "token-subscribe-no-token"
      /* ErrorCode.TOKEN_SUBSCRIBE_NO_TOKEN */
    );
  return i.token;
}
async function ns(t, e) {
  const n = await Ae(t), r = Tt(e.subscriptionOptions), s = {
    method: "PATCH",
    headers: n,
    body: JSON.stringify(r)
  };
  let i;
  try {
    i = await (await fetch(`${Te(t.appConfig)}/${e.token}`, s)).json();
  } catch (a) {
    throw p.create("token-update-failed", {
      errorInfo: a == null ? void 0 : a.toString()
    });
  }
  if (i.error) {
    const a = i.error.message;
    throw p.create("token-update-failed", {
      errorInfo: a
    });
  }
  if (!i.token)
    throw p.create(
      "token-update-no-token"
      /* ErrorCode.TOKEN_UPDATE_NO_TOKEN */
    );
  return i.token;
}
async function Ct(t, e) {
  const r = {
    method: "DELETE",
    headers: await Ae(t)
  };
  try {
    const i = await (await fetch(`${Te(t.appConfig)}/${e}`, r)).json();
    if (i.error) {
      const a = i.error.message;
      throw p.create("token-unsubscribe-failed", {
        errorInfo: a
      });
    }
  } catch (s) {
    throw p.create("token-unsubscribe-failed", {
      errorInfo: s == null ? void 0 : s.toString()
    });
  }
}
function Te({ projectId: t }) {
  return `${jr}/projects/${t}/registrations`;
}
async function Ae({ appConfig: t, installations: e }) {
  const n = await e.getToken();
  return new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-goog-api-key": t.apiKey,
    "x-goog-firebase-installations-auth": `FIS ${n}`
  });
}
function Tt({ p256dh: t, auth: e, endpoint: n, vapidKey: r }) {
  const s = {
    web: {
      endpoint: n,
      auth: e,
      p256dh: t
    }
  };
  return r !== Et && (s.web.applicationPubKey = r), s;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const rs = 7 * 24 * 60 * 60 * 1e3;
async function ss(t) {
  const e = await as(t.swRegistration, t.vapidKey), n = {
    vapidKey: t.vapidKey,
    swScope: t.swRegistration.scope,
    endpoint: e.endpoint,
    auth: b(e.getKey("auth")),
    p256dh: b(e.getKey("p256dh"))
  }, r = await Ee(t.firebaseDependencies);
  if (r) {
    if (os(r.subscriptionOptions, n))
      return Date.now() >= r.createTime + rs ? is(t, {
        token: r.token,
        createTime: Date.now(),
        subscriptionOptions: n
      }) : r.token;
    try {
      await Ct(t.firebaseDependencies, r.token);
    } catch (s) {
      console.warn(s);
    }
    return He(t.firebaseDependencies, n);
  } else return He(t.firebaseDependencies, n);
}
async function Fe(t) {
  const e = await Ee(t.firebaseDependencies);
  e && (await Ct(t.firebaseDependencies, e.token), await Zr(t.firebaseDependencies));
  const n = await t.swRegistration.pushManager.getSubscription();
  return n ? n.unsubscribe() : !0;
}
async function is(t, e) {
  try {
    const n = await ns(t.firebaseDependencies, e), r = {
      ...e,
      token: n,
      createTime: Date.now()
    };
    return await Se(t.firebaseDependencies, r), n;
  } catch (n) {
    throw n;
  }
}
async function He(t, e) {
  const r = {
    token: await ts(t, e),
    createTime: Date.now(),
    subscriptionOptions: e
  };
  return await Se(t, r), r.token;
}
async function as(t, e) {
  const n = await t.pushManager.getSubscription();
  return n || t.pushManager.subscribe({
    userVisibleOnly: !0,
    // Chrome <= 75 doesn't support base64-encoded VAPID key. For backward compatibility, VAPID key
    // submitted to pushManager#subscribe must be of type Uint8Array.
    applicationServerKey: zr(e)
  });
}
function os(t, e) {
  const n = e.vapidKey === t.vapidKey, r = e.endpoint === t.endpoint, s = e.auth === t.auth, i = e.p256dh === t.p256dh;
  return n && r && s && i;
}
/**
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
 */
function cs(t) {
  const e = {
    from: t.from,
    // eslint-disable-next-line camelcase
    collapseKey: t.collapse_key,
    // eslint-disable-next-line camelcase
    messageId: t.fcmMessageId
  };
  return ls(e, t), us(e, t), hs(e, t), e;
}
function ls(t, e) {
  if (!e.notification)
    return;
  t.notification = {};
  const n = e.notification.title;
  n && (t.notification.title = n);
  const r = e.notification.body;
  r && (t.notification.body = r);
  const s = e.notification.image;
  s && (t.notification.image = s);
  const i = e.notification.icon;
  i && (t.notification.icon = i);
}
function us(t, e) {
  e.data && (t.data = e.data);
}
function hs(t, e) {
  var s, i, a, o;
  if (!e.fcmOptions && !((s = e.notification) != null && s.click_action))
    return;
  t.fcmOptions = {};
  const n = ((i = e.fcmOptions) == null ? void 0 : i.link) ?? ((a = e.notification) == null ? void 0 : a.click_action);
  n && (t.fcmOptions.link = n);
  const r = (o = e.fcmOptions) == null ? void 0 : o.analytics_label;
  r && (t.fcmOptions.analyticsLabel = r);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function fs(t) {
  return typeof t == "object" && !!t && Vr in t;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ds(t) {
  return new Promise((e) => {
    setTimeout(e, t);
  });
}
async function ps(t, e) {
  const n = gs(e, await t.firebaseDependencies.installations.getId());
  ms(t, n, e.productId);
}
function gs(t, e) {
  var r, s;
  const n = {};
  return t.from && (n.project_number = t.from), t.fcmMessageId && (n.message_id = t.fcmMessageId), n.instance_id = e, t.notification ? n.message_type = K.DISPLAY_NOTIFICATION.toString() : n.message_type = K.DATA_MESSAGE.toString(), n.sdk_platform = Wr.toString(), n.package_name = self.origin.replace(/(^\w+:|^)\/\//, ""), t.collapse_key && (n.collapse_key = t.collapse_key), n.event = qr.toString(), (r = t.fcmOptions) != null && r.analytics_label && (n.analytics_label = (s = t.fcmOptions) == null ? void 0 : s.analytics_label), n;
}
function ms(t, e, n) {
  const r = {};
  r.event_time_ms = Math.floor(Date.now()).toString(), r.source_extension_json_proto3 = JSON.stringify({
    messaging_client_event: e
  }), n && (r.compliance_data = bs(n)), t.logEvents.push(r);
}
function bs(t) {
  return {
    privacy_context: {
      prequest: {
        origin_associated_product_id: t
      }
    }
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function ws(t, e) {
  var s;
  const { newSubscription: n } = t;
  if (!n) {
    await Fe(e);
    return;
  }
  const r = await Ee(e.firebaseDependencies);
  await Fe(e), e.vapidKey = ((s = r == null ? void 0 : r.subscriptionOptions) == null ? void 0 : s.vapidKey) ?? Et, await ss(e);
}
async function ys(t, e) {
  const n = Es(t);
  if (!n)
    return;
  e.deliveryMetricsExportedToBigQueryEnabled && await ps(e, n);
  const r = await At();
  if (Cs(r))
    return Ts(r, n);
  if (n.notification && await As(Is(n)), !!e && e.onBackgroundMessageHandler) {
    const s = cs(n);
    typeof e.onBackgroundMessageHandler == "function" ? await e.onBackgroundMessageHandler(s) : e.onBackgroundMessageHandler.next(s);
  }
}
async function _s(t) {
  var a, o;
  const e = (o = (a = t.notification) == null ? void 0 : a.data) == null ? void 0 : o[St];
  if (e) {
    if (t.action)
      return;
  } else return;
  t.stopImmediatePropagation(), t.notification.close();
  const n = Ds(e);
  if (!n)
    return;
  const r = new URL(n, self.location.href), s = new URL(self.location.origin);
  if (r.host !== s.host)
    return;
  let i = await Ss(r);
  if (i ? i = await i.focus() : (i = await self.clients.openWindow(n), await ds(3e3)), !!i)
    return e.messageType = j.NOTIFICATION_CLICKED, e.isFirebaseMessaging = !0, i.postMessage(e);
}
function Is(t) {
  const e = {
    ...t.notification
  };
  return e.data = {
    [St]: t
  }, e;
}
function Es({ data: t }) {
  if (!t)
    return null;
  try {
    return t.json();
  } catch {
    return null;
  }
}
async function Ss(t) {
  const e = await At();
  for (const n of e) {
    const r = new URL(n.url, self.location.href);
    if (t.host === r.host)
      return n;
  }
  return null;
}
function Cs(t) {
  return t.some((e) => e.visibilityState === "visible" && // Ignore chrome-extension clients as that matches the background pages of extensions, which
  // are always considered visible for some reason.
  !e.url.startsWith("chrome-extension://"));
}
function Ts(t, e) {
  e.isFirebaseMessaging = !0, e.messageType = j.PUSH_RECEIVED;
  for (const n of t)
    n.postMessage(e);
}
function At() {
  return self.clients.matchAll({
    type: "window",
    includeUncontrolled: !0
    // TS doesn't know that "type: 'window'" means it'll return WindowClient[]
  });
}
function As(t) {
  const { actions: e } = t, { maxActions: n } = Notification;
  return e && n && e.length > n && console.warn(`This browser only supports ${n} actions. The remaining actions will not be displayed.`), self.registration.showNotification(
    /* title= */
    t.title ?? "",
    t
  );
}
function Ds(t) {
  var n, r;
  const e = ((n = t.fcmOptions) == null ? void 0 : n.link) ?? ((r = t.notification) == null ? void 0 : r.click_action);
  return e || (fs(t.data) ? self.location.origin : null);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Rs(t) {
  if (!t || !t.options)
    throw ie("App Configuration Object");
  if (!t.name)
    throw ie("App Name");
  const e = [
    "projectId",
    "apiKey",
    "appId",
    "messagingSenderId"
  ], { options: n } = t;
  for (const r of e)
    if (!n[r])
      throw ie(r);
  return {
    appName: t.name,
    projectId: n.projectId,
    apiKey: n.apiKey,
    appId: n.appId,
    senderId: n.messagingSenderId
  };
}
function ie(t) {
  return p.create("missing-app-config-values", {
    valueName: t
  });
}
/**
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
 */
class ks {
  constructor(e, n, r) {
    this.deliveryMetricsExportedToBigQueryEnabled = !1, this.onBackgroundMessageHandler = null, this.onMessageHandler = null, this.logEvents = [], this.isLogServiceStarted = !1;
    const s = Rs(e);
    this.firebaseDependencies = {
      app: e,
      appConfig: s,
      installations: n,
      analyticsProvider: r
    };
  }
  _delete() {
    return Promise.resolve();
  }
}
/**
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
 */
const vs = (t) => {
  const e = new ks(t.getProvider("app").getImmediate(), t.getProvider("installations-internal").getImmediate(), t.getProvider("analytics-internal"));
  return self.addEventListener("push", (n) => {
    n.waitUntil(ys(n, e));
  }), self.addEventListener("pushsubscriptionchange", (n) => {
    n.waitUntil(ws(n, e));
  }), self.addEventListener("notificationclick", (n) => {
    n.waitUntil(_s(n));
  }), e;
};
function Ns() {
  O(new D(
    "messaging-sw",
    vs,
    "PUBLIC"
    /* ComponentType.PUBLIC */
  ));
}
/**
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
 */
async function Os() {
  return Ye() && await Qe() && "PushManager" in self && "Notification" in self && ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification") && PushSubscription.prototype.hasOwnProperty("getKey");
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Ms(t = Wn()) {
  return Os().then((e) => {
    if (!e)
      throw p.create(
        "unsupported-browser"
        /* ErrorCode.UNSUPPORTED_BROWSER */
      );
  }, (e) => {
    throw p.create(
      "indexed-db-unsupported"
      /* ErrorCode.INDEXED_DB_UNSUPPORTED */
    );
  }), me(qt(t), "messaging-sw").getImmediate();
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Ns();
try {
  self["workbox:core:7.2.0"] && _();
} catch {
}
const Ps = (t, ...e) => {
  let n = t;
  return e.length > 0 && (n += ` :: ${JSON.stringify(e)}`), n;
}, Ls = Ps;
class f extends Error {
  /**
   *
   * @param {string} errorCode The error code that
   * identifies this particular error.
   * @param {Object=} details Any relevant arguments
   * that will help developers identify issues should
   * be added as a key on the context object.
   */
  constructor(e, n) {
    const r = Ls(e, n);
    super(r), this.name = e, this.details = n;
  }
}
const w = {
  googleAnalytics: "googleAnalytics",
  precache: "precache-v2",
  prefix: "workbox",
  runtime: "runtime",
  suffix: typeof registration < "u" ? registration.scope : ""
}, ae = (t) => [w.prefix, t, w.suffix].filter((e) => e && e.length > 0).join("-"), Bs = (t) => {
  for (const e of Object.keys(w))
    t(e);
}, De = {
  updateDetails: (t) => {
    Bs((e) => {
      typeof t[e] == "string" && (w[e] = t[e]);
    });
  },
  getGoogleAnalyticsName: (t) => t || ae(w.googleAnalytics),
  getPrecacheName: (t) => t || ae(w.precache),
  getPrefix: () => w.prefix,
  getRuntimeName: (t) => t || ae(w.runtime),
  getSuffix: () => w.suffix
};
function Ke(t, e) {
  const n = e();
  return t.waitUntil(n), n;
}
try {
  self["workbox:precaching:7.2.0"] && _();
} catch {
}
const xs = "__WB_REVISION__";
function Us(t) {
  if (!t)
    throw new f("add-to-cache-list-unexpected-type", { entry: t });
  if (typeof t == "string") {
    const i = new URL(t, location.href);
    return {
      cacheKey: i.href,
      url: i.href
    };
  }
  const { revision: e, url: n } = t;
  if (!n)
    throw new f("add-to-cache-list-unexpected-type", { entry: t });
  if (!e) {
    const i = new URL(n, location.href);
    return {
      cacheKey: i.href,
      url: i.href
    };
  }
  const r = new URL(n, location.href), s = new URL(n, location.href);
  return r.searchParams.set(xs, e), {
    cacheKey: r.href,
    url: s.href
  };
}
class $s {
  constructor() {
    this.updatedURLs = [], this.notUpdatedURLs = [], this.handlerWillStart = async ({ request: e, state: n }) => {
      n && (n.originalRequest = e);
    }, this.cachedResponseWillBeUsed = async ({ event: e, state: n, cachedResponse: r }) => {
      if (e.type === "install" && n && n.originalRequest && n.originalRequest instanceof Request) {
        const s = n.originalRequest.url;
        r ? this.notUpdatedURLs.push(s) : this.updatedURLs.push(s);
      }
      return r;
    };
  }
}
class Fs {
  constructor({ precacheController: e }) {
    this.cacheKeyWillBeUsed = async ({ request: n, params: r }) => {
      const s = (r == null ? void 0 : r.cacheKey) || this._precacheController.getCacheKeyForURL(n.url);
      return s ? new Request(s, { headers: n.headers }) : n;
    }, this._precacheController = e;
  }
}
let L;
function Hs() {
  if (L === void 0) {
    const t = new Response("");
    if ("body" in t)
      try {
        new Response(t.body), L = !0;
      } catch {
        L = !1;
      }
    L = !1;
  }
  return L;
}
async function Ks(t, e) {
  let n = null;
  if (t.url && (n = new URL(t.url).origin), n !== self.location.origin)
    throw new f("cross-origin-copy-response", { origin: n });
  const r = t.clone(), i = {
    headers: new Headers(r.headers),
    status: r.status,
    statusText: r.statusText
  }, a = Hs() ? r.body : await r.blob();
  return new Response(a, i);
}
const js = (t) => new URL(String(t), location.href).href.replace(new RegExp(`^${location.origin}`), "");
function je(t, e) {
  const n = new URL(t);
  for (const r of e)
    n.searchParams.delete(r);
  return n.href;
}
async function Vs(t, e, n, r) {
  const s = je(e.url, n);
  if (e.url === s)
    return t.match(e, r);
  const i = Object.assign(Object.assign({}, r), { ignoreSearch: !0 }), a = await t.keys(e, i);
  for (const o of a) {
    const l = je(o.url, n);
    if (s === l)
      return t.match(o, r);
  }
}
class Ws {
  /**
   * Creates a promise and exposes its resolve and reject functions as methods.
   */
  constructor() {
    this.promise = new Promise((e, n) => {
      this.resolve = e, this.reject = n;
    });
  }
}
const qs = /* @__PURE__ */ new Set();
async function zs() {
  for (const t of qs)
    await t();
}
function Gs(t) {
  return new Promise((e) => setTimeout(e, t));
}
try {
  self["workbox:strategies:7.2.0"] && _();
} catch {
}
function $(t) {
  return typeof t == "string" ? new Request(t) : t;
}
class Js {
  /**
   * Creates a new instance associated with the passed strategy and event
   * that's handling the request.
   *
   * The constructor also initializes the state that will be passed to each of
   * the plugins handling this request.
   *
   * @param {workbox-strategies.Strategy} strategy
   * @param {Object} options
   * @param {Request|string} options.request A request to run this strategy for.
   * @param {ExtendableEvent} options.event The event associated with the
   *     request.
   * @param {URL} [options.url]
   * @param {*} [options.params] The return value from the
   *     {@link workbox-routing~matchCallback} (if applicable).
   */
  constructor(e, n) {
    this._cacheKeys = {}, Object.assign(this, n), this.event = n.event, this._strategy = e, this._handlerDeferred = new Ws(), this._extendLifetimePromises = [], this._plugins = [...e.plugins], this._pluginStateMap = /* @__PURE__ */ new Map();
    for (const r of this._plugins)
      this._pluginStateMap.set(r, {});
    this.event.waitUntil(this._handlerDeferred.promise);
  }
  /**
   * Fetches a given request (and invokes any applicable plugin callback
   * methods) using the `fetchOptions` (for non-navigation requests) and
   * `plugins` defined on the `Strategy` object.
   *
   * The following plugin lifecycle methods are invoked when using this method:
   * - `requestWillFetch()`
   * - `fetchDidSucceed()`
   * - `fetchDidFail()`
   *
   * @param {Request|string} input The URL or request to fetch.
   * @return {Promise<Response>}
   */
  async fetch(e) {
    const { event: n } = this;
    let r = $(e);
    if (r.mode === "navigate" && n instanceof FetchEvent && n.preloadResponse) {
      const a = await n.preloadResponse;
      if (a)
        return a;
    }
    const s = this.hasCallback("fetchDidFail") ? r.clone() : null;
    try {
      for (const a of this.iterateCallbacks("requestWillFetch"))
        r = await a({ request: r.clone(), event: n });
    } catch (a) {
      if (a instanceof Error)
        throw new f("plugin-error-request-will-fetch", {
          thrownErrorMessage: a.message
        });
    }
    const i = r.clone();
    try {
      let a;
      a = await fetch(r, r.mode === "navigate" ? void 0 : this._strategy.fetchOptions);
      for (const o of this.iterateCallbacks("fetchDidSucceed"))
        a = await o({
          event: n,
          request: i,
          response: a
        });
      return a;
    } catch (a) {
      throw s && await this.runCallbacks("fetchDidFail", {
        error: a,
        event: n,
        originalRequest: s.clone(),
        request: i.clone()
      }), a;
    }
  }
  /**
   * Calls `this.fetch()` and (in the background) runs `this.cachePut()` on
   * the response generated by `this.fetch()`.
   *
   * The call to `this.cachePut()` automatically invokes `this.waitUntil()`,
   * so you do not have to manually call `waitUntil()` on the event.
   *
   * @param {Request|string} input The request or URL to fetch and cache.
   * @return {Promise<Response>}
   */
  async fetchAndCachePut(e) {
    const n = await this.fetch(e), r = n.clone();
    return this.waitUntil(this.cachePut(e, r)), n;
  }
  /**
   * Matches a request from the cache (and invokes any applicable plugin
   * callback methods) using the `cacheName`, `matchOptions`, and `plugins`
   * defined on the strategy object.
   *
   * The following plugin lifecycle methods are invoked when using this method:
   * - cacheKeyWillBeUsed()
   * - cachedResponseWillBeUsed()
   *
   * @param {Request|string} key The Request or URL to use as the cache key.
   * @return {Promise<Response|undefined>} A matching response, if found.
   */
  async cacheMatch(e) {
    const n = $(e);
    let r;
    const { cacheName: s, matchOptions: i } = this._strategy, a = await this.getCacheKey(n, "read"), o = Object.assign(Object.assign({}, i), { cacheName: s });
    r = await caches.match(a, o);
    for (const l of this.iterateCallbacks("cachedResponseWillBeUsed"))
      r = await l({
        cacheName: s,
        matchOptions: i,
        cachedResponse: r,
        request: a,
        event: this.event
      }) || void 0;
    return r;
  }
  /**
   * Puts a request/response pair in the cache (and invokes any applicable
   * plugin callback methods) using the `cacheName` and `plugins` defined on
   * the strategy object.
   *
   * The following plugin lifecycle methods are invoked when using this method:
   * - cacheKeyWillBeUsed()
   * - cacheWillUpdate()
   * - cacheDidUpdate()
   *
   * @param {Request|string} key The request or URL to use as the cache key.
   * @param {Response} response The response to cache.
   * @return {Promise<boolean>} `false` if a cacheWillUpdate caused the response
   * not be cached, and `true` otherwise.
   */
  async cachePut(e, n) {
    const r = $(e);
    await Gs(0);
    const s = await this.getCacheKey(r, "write");
    if (!n)
      throw new f("cache-put-with-no-response", {
        url: js(s.url)
      });
    const i = await this._ensureResponseSafeToCache(n);
    if (!i)
      return !1;
    const { cacheName: a, matchOptions: o } = this._strategy, l = await self.caches.open(a), c = this.hasCallback("cacheDidUpdate"), d = c ? await Vs(
      // TODO(philipwalton): the `__WB_REVISION__` param is a precaching
      // feature. Consider into ways to only add this behavior if using
      // precaching.
      l,
      s.clone(),
      ["__WB_REVISION__"],
      o
    ) : null;
    try {
      await l.put(s, c ? i.clone() : i);
    } catch (h) {
      if (h instanceof Error)
        throw h.name === "QuotaExceededError" && await zs(), h;
    }
    for (const h of this.iterateCallbacks("cacheDidUpdate"))
      await h({
        cacheName: a,
        oldResponse: d,
        newResponse: i.clone(),
        request: s,
        event: this.event
      });
    return !0;
  }
  /**
   * Checks the list of plugins for the `cacheKeyWillBeUsed` callback, and
   * executes any of those callbacks found in sequence. The final `Request`
   * object returned by the last plugin is treated as the cache key for cache
   * reads and/or writes. If no `cacheKeyWillBeUsed` plugin callbacks have
   * been registered, the passed request is returned unmodified
   *
   * @param {Request} request
   * @param {string} mode
   * @return {Promise<Request>}
   */
  async getCacheKey(e, n) {
    const r = `${e.url} | ${n}`;
    if (!this._cacheKeys[r]) {
      let s = e;
      for (const i of this.iterateCallbacks("cacheKeyWillBeUsed"))
        s = $(await i({
          mode: n,
          request: s,
          event: this.event,
          // params has a type any can't change right now.
          params: this.params
          // eslint-disable-line
        }));
      this._cacheKeys[r] = s;
    }
    return this._cacheKeys[r];
  }
  /**
   * Returns true if the strategy has at least one plugin with the given
   * callback.
   *
   * @param {string} name The name of the callback to check for.
   * @return {boolean}
   */
  hasCallback(e) {
    for (const n of this._strategy.plugins)
      if (e in n)
        return !0;
    return !1;
  }
  /**
   * Runs all plugin callbacks matching the given name, in order, passing the
   * given param object (merged ith the current plugin state) as the only
   * argument.
   *
   * Note: since this method runs all plugins, it's not suitable for cases
   * where the return value of a callback needs to be applied prior to calling
   * the next callback. See
   * {@link workbox-strategies.StrategyHandler#iterateCallbacks}
   * below for how to handle that case.
   *
   * @param {string} name The name of the callback to run within each plugin.
   * @param {Object} param The object to pass as the first (and only) param
   *     when executing each callback. This object will be merged with the
   *     current plugin state prior to callback execution.
   */
  async runCallbacks(e, n) {
    for (const r of this.iterateCallbacks(e))
      await r(n);
  }
  /**
   * Accepts a callback and returns an iterable of matching plugin callbacks,
   * where each callback is wrapped with the current handler state (i.e. when
   * you call each callback, whatever object parameter you pass it will
   * be merged with the plugin's current state).
   *
   * @param {string} name The name fo the callback to run
   * @return {Array<Function>}
   */
  *iterateCallbacks(e) {
    for (const n of this._strategy.plugins)
      if (typeof n[e] == "function") {
        const r = this._pluginStateMap.get(n);
        yield (i) => {
          const a = Object.assign(Object.assign({}, i), { state: r });
          return n[e](a);
        };
      }
  }
  /**
   * Adds a promise to the
   * [extend lifetime promises]{@link https://w3c.github.io/ServiceWorker/#extendableevent-extend-lifetime-promises}
   * of the event event associated with the request being handled (usually a
   * `FetchEvent`).
   *
   * Note: you can await
   * {@link workbox-strategies.StrategyHandler~doneWaiting}
   * to know when all added promises have settled.
   *
   * @param {Promise} promise A promise to add to the extend lifetime promises
   *     of the event that triggered the request.
   */
  waitUntil(e) {
    return this._extendLifetimePromises.push(e), e;
  }
  /**
   * Returns a promise that resolves once all promises passed to
   * {@link workbox-strategies.StrategyHandler~waitUntil}
   * have settled.
   *
   * Note: any work done after `doneWaiting()` settles should be manually
   * passed to an event's `waitUntil()` method (not this handler's
   * `waitUntil()` method), otherwise the service worker thread my be killed
   * prior to your work completing.
   */
  async doneWaiting() {
    let e;
    for (; e = this._extendLifetimePromises.shift(); )
      await e;
  }
  /**
   * Stops running the strategy and immediately resolves any pending
   * `waitUntil()` promises.
   */
  destroy() {
    this._handlerDeferred.resolve(null);
  }
  /**
   * This method will call cacheWillUpdate on the available plugins (or use
   * status === 200) to determine if the Response is safe and valid to cache.
   *
   * @param {Request} options.request
   * @param {Response} options.response
   * @return {Promise<Response|undefined>}
   *
   * @private
   */
  async _ensureResponseSafeToCache(e) {
    let n = e, r = !1;
    for (const s of this.iterateCallbacks("cacheWillUpdate"))
      if (n = await s({
        request: this.request,
        response: n,
        event: this.event
      }) || void 0, r = !0, !n)
        break;
    return r || n && n.status !== 200 && (n = void 0), n;
  }
}
class Xs {
  /**
   * Creates a new instance of the strategy and sets all documented option
   * properties as public instance properties.
   *
   * Note: if a custom strategy class extends the base Strategy class and does
   * not need more than these properties, it does not need to define its own
   * constructor.
   *
   * @param {Object} [options]
   * @param {string} [options.cacheName] Cache name to store and retrieve
   * requests. Defaults to the cache names provided by
   * {@link workbox-core.cacheNames}.
   * @param {Array<Object>} [options.plugins] [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} [options.fetchOptions] Values passed along to the
   * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
   * of [non-navigation](https://github.com/GoogleChrome/workbox/issues/1796)
   * `fetch()` requests made by this strategy.
   * @param {Object} [options.matchOptions] The
   * [`CacheQueryOptions`]{@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions}
   * for any `cache.match()` or `cache.put()` calls made by this strategy.
   */
  constructor(e = {}) {
    this.cacheName = De.getRuntimeName(e.cacheName), this.plugins = e.plugins || [], this.fetchOptions = e.fetchOptions, this.matchOptions = e.matchOptions;
  }
  /**
   * Perform a request strategy and returns a `Promise` that will resolve with
   * a `Response`, invoking all relevant plugin callbacks.
   *
   * When a strategy instance is registered with a Workbox
   * {@link workbox-routing.Route}, this method is automatically
   * called when the route matches.
   *
   * Alternatively, this method can be used in a standalone `FetchEvent`
   * listener by passing it to `event.respondWith()`.
   *
   * @param {FetchEvent|Object} options A `FetchEvent` or an object with the
   *     properties listed below.
   * @param {Request|string} options.request A request to run this strategy for.
   * @param {ExtendableEvent} options.event The event associated with the
   *     request.
   * @param {URL} [options.url]
   * @param {*} [options.params]
   */
  handle(e) {
    const [n] = this.handleAll(e);
    return n;
  }
  /**
   * Similar to {@link workbox-strategies.Strategy~handle}, but
   * instead of just returning a `Promise` that resolves to a `Response` it
   * it will return an tuple of `[response, done]` promises, where the former
   * (`response`) is equivalent to what `handle()` returns, and the latter is a
   * Promise that will resolve once any promises that were added to
   * `event.waitUntil()` as part of performing the strategy have completed.
   *
   * You can await the `done` promise to ensure any extra work performed by
   * the strategy (usually caching responses) completes successfully.
   *
   * @param {FetchEvent|Object} options A `FetchEvent` or an object with the
   *     properties listed below.
   * @param {Request|string} options.request A request to run this strategy for.
   * @param {ExtendableEvent} options.event The event associated with the
   *     request.
   * @param {URL} [options.url]
   * @param {*} [options.params]
   * @return {Array<Promise>} A tuple of [response, done]
   *     promises that can be used to determine when the response resolves as
   *     well as when the handler has completed all its work.
   */
  handleAll(e) {
    e instanceof FetchEvent && (e = {
      event: e,
      request: e.request
    });
    const n = e.event, r = typeof e.request == "string" ? new Request(e.request) : e.request, s = "params" in e ? e.params : void 0, i = new Js(this, { event: n, request: r, params: s }), a = this._getResponse(i, r, n), o = this._awaitComplete(a, i, r, n);
    return [a, o];
  }
  async _getResponse(e, n, r) {
    await e.runCallbacks("handlerWillStart", { event: r, request: n });
    let s;
    try {
      if (s = await this._handle(n, e), !s || s.type === "error")
        throw new f("no-response", { url: n.url });
    } catch (i) {
      if (i instanceof Error) {
        for (const a of e.iterateCallbacks("handlerDidError"))
          if (s = await a({ error: i, event: r, request: n }), s)
            break;
      }
      if (!s)
        throw i;
    }
    for (const i of e.iterateCallbacks("handlerWillRespond"))
      s = await i({ event: r, request: n, response: s });
    return s;
  }
  async _awaitComplete(e, n, r, s) {
    let i, a;
    try {
      i = await e;
    } catch {
    }
    try {
      await n.runCallbacks("handlerDidRespond", {
        event: s,
        request: r,
        response: i
      }), await n.doneWaiting();
    } catch (o) {
      o instanceof Error && (a = o);
    }
    if (await n.runCallbacks("handlerDidComplete", {
      event: s,
      request: r,
      response: i,
      error: a
    }), n.destroy(), a)
      throw a;
  }
}
class S extends Xs {
  /**
   *
   * @param {Object} [options]
   * @param {string} [options.cacheName] Cache name to store and retrieve
   * requests. Defaults to the cache names provided by
   * {@link workbox-core.cacheNames}.
   * @param {Array<Object>} [options.plugins] {@link https://developers.google.com/web/tools/workbox/guides/using-plugins|Plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} [options.fetchOptions] Values passed along to the
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters|init}
   * of all fetch() requests made by this strategy.
   * @param {Object} [options.matchOptions] The
   * {@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions|CacheQueryOptions}
   * for any `cache.match()` or `cache.put()` calls made by this strategy.
   * @param {boolean} [options.fallbackToNetwork=true] Whether to attempt to
   * get the response from the network if there's a precache miss.
   */
  constructor(e = {}) {
    e.cacheName = De.getPrecacheName(e.cacheName), super(e), this._fallbackToNetwork = e.fallbackToNetwork !== !1, this.plugins.push(S.copyRedirectedCacheableResponsesPlugin);
  }
  /**
   * @private
   * @param {Request|string} request A request to run this strategy for.
   * @param {workbox-strategies.StrategyHandler} handler The event that
   *     triggered the request.
   * @return {Promise<Response>}
   */
  async _handle(e, n) {
    const r = await n.cacheMatch(e);
    return r || (n.event && n.event.type === "install" ? await this._handleInstall(e, n) : await this._handleFetch(e, n));
  }
  async _handleFetch(e, n) {
    let r;
    const s = n.params || {};
    if (this._fallbackToNetwork) {
      const i = s.integrity, a = e.integrity, o = !a || a === i;
      r = await n.fetch(new Request(e, {
        integrity: e.mode !== "no-cors" ? a || i : void 0
      })), i && o && e.mode !== "no-cors" && (this._useDefaultCacheabilityPluginIfNeeded(), await n.cachePut(e, r.clone()));
    } else
      throw new f("missing-precache-entry", {
        cacheName: this.cacheName,
        url: e.url
      });
    return r;
  }
  async _handleInstall(e, n) {
    this._useDefaultCacheabilityPluginIfNeeded();
    const r = await n.fetch(e);
    if (!await n.cachePut(e, r.clone()))
      throw new f("bad-precaching-response", {
        url: e.url,
        status: r.status
      });
    return r;
  }
  /**
   * This method is complex, as there a number of things to account for:
   *
   * The `plugins` array can be set at construction, and/or it might be added to
   * to at any time before the strategy is used.
   *
   * At the time the strategy is used (i.e. during an `install` event), there
   * needs to be at least one plugin that implements `cacheWillUpdate` in the
   * array, other than `copyRedirectedCacheableResponsesPlugin`.
   *
   * - If this method is called and there are no suitable `cacheWillUpdate`
   * plugins, we need to add `defaultPrecacheCacheabilityPlugin`.
   *
   * - If this method is called and there is exactly one `cacheWillUpdate`, then
   * we don't have to do anything (this might be a previously added
   * `defaultPrecacheCacheabilityPlugin`, or it might be a custom plugin).
   *
   * - If this method is called and there is more than one `cacheWillUpdate`,
   * then we need to check if one is `defaultPrecacheCacheabilityPlugin`. If so,
   * we need to remove it. (This situation is unlikely, but it could happen if
   * the strategy is used multiple times, the first without a `cacheWillUpdate`,
   * and then later on after manually adding a custom `cacheWillUpdate`.)
   *
   * See https://github.com/GoogleChrome/workbox/issues/2737 for more context.
   *
   * @private
   */
  _useDefaultCacheabilityPluginIfNeeded() {
    let e = null, n = 0;
    for (const [r, s] of this.plugins.entries())
      s !== S.copyRedirectedCacheableResponsesPlugin && (s === S.defaultPrecacheCacheabilityPlugin && (e = r), s.cacheWillUpdate && n++);
    n === 0 ? this.plugins.push(S.defaultPrecacheCacheabilityPlugin) : n > 1 && e !== null && this.plugins.splice(e, 1);
  }
}
S.defaultPrecacheCacheabilityPlugin = {
  async cacheWillUpdate({ response: t }) {
    return !t || t.status >= 400 ? null : t;
  }
};
S.copyRedirectedCacheableResponsesPlugin = {
  async cacheWillUpdate({ response: t }) {
    return t.redirected ? await Ks(t) : t;
  }
};
class Ys {
  /**
   * Create a new PrecacheController.
   *
   * @param {Object} [options]
   * @param {string} [options.cacheName] The cache to use for precaching.
   * @param {string} [options.plugins] Plugins to use when precaching as well
   * as responding to fetch events for precached assets.
   * @param {boolean} [options.fallbackToNetwork=true] Whether to attempt to
   * get the response from the network if there's a precache miss.
   */
  constructor({ cacheName: e, plugins: n = [], fallbackToNetwork: r = !0 } = {}) {
    this._urlsToCacheKeys = /* @__PURE__ */ new Map(), this._urlsToCacheModes = /* @__PURE__ */ new Map(), this._cacheKeysToIntegrities = /* @__PURE__ */ new Map(), this._strategy = new S({
      cacheName: De.getPrecacheName(e),
      plugins: [
        ...n,
        new Fs({ precacheController: this })
      ],
      fallbackToNetwork: r
    }), this.install = this.install.bind(this), this.activate = this.activate.bind(this);
  }
  /**
   * @type {workbox-precaching.PrecacheStrategy} The strategy created by this controller and
   * used to cache assets and respond to fetch events.
   */
  get strategy() {
    return this._strategy;
  }
  /**
   * Adds items to the precache list, removing any duplicates and
   * stores the files in the
   * {@link workbox-core.cacheNames|"precache cache"} when the service
   * worker installs.
   *
   * This method can be called multiple times.
   *
   * @param {Array<Object|string>} [entries=[]] Array of entries to precache.
   */
  precache(e) {
    this.addToCacheList(e), this._installAndActiveListenersAdded || (self.addEventListener("install", this.install), self.addEventListener("activate", this.activate), this._installAndActiveListenersAdded = !0);
  }
  /**
   * This method will add items to the precache list, removing duplicates
   * and ensuring the information is valid.
   *
   * @param {Array<workbox-precaching.PrecacheController.PrecacheEntry|string>} entries
   *     Array of entries to precache.
   */
  addToCacheList(e) {
    const n = [];
    for (const r of e) {
      typeof r == "string" ? n.push(r) : r && r.revision === void 0 && n.push(r.url);
      const { cacheKey: s, url: i } = Us(r), a = typeof r != "string" && r.revision ? "reload" : "default";
      if (this._urlsToCacheKeys.has(i) && this._urlsToCacheKeys.get(i) !== s)
        throw new f("add-to-cache-list-conflicting-entries", {
          firstEntry: this._urlsToCacheKeys.get(i),
          secondEntry: s
        });
      if (typeof r != "string" && r.integrity) {
        if (this._cacheKeysToIntegrities.has(s) && this._cacheKeysToIntegrities.get(s) !== r.integrity)
          throw new f("add-to-cache-list-conflicting-integrities", {
            url: i
          });
        this._cacheKeysToIntegrities.set(s, r.integrity);
      }
      if (this._urlsToCacheKeys.set(i, s), this._urlsToCacheModes.set(i, a), n.length > 0) {
        const o = `Workbox is precaching URLs without revision info: ${n.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;
        console.warn(o);
      }
    }
  }
  /**
   * Precaches new and updated assets. Call this method from the service worker
   * install event.
   *
   * Note: this method calls `event.waitUntil()` for you, so you do not need
   * to call it yourself in your event handlers.
   *
   * @param {ExtendableEvent} event
   * @return {Promise<workbox-precaching.InstallResult>}
   */
  install(e) {
    return Ke(e, async () => {
      const n = new $s();
      this.strategy.plugins.push(n);
      for (const [i, a] of this._urlsToCacheKeys) {
        const o = this._cacheKeysToIntegrities.get(a), l = this._urlsToCacheModes.get(i), c = new Request(i, {
          integrity: o,
          cache: l,
          credentials: "same-origin"
        });
        await Promise.all(this.strategy.handleAll({
          params: { cacheKey: a },
          request: c,
          event: e
        }));
      }
      const { updatedURLs: r, notUpdatedURLs: s } = n;
      return { updatedURLs: r, notUpdatedURLs: s };
    });
  }
  /**
   * Deletes assets that are no longer present in the current precache manifest.
   * Call this method from the service worker activate event.
   *
   * Note: this method calls `event.waitUntil()` for you, so you do not need
   * to call it yourself in your event handlers.
   *
   * @param {ExtendableEvent} event
   * @return {Promise<workbox-precaching.CleanupResult>}
   */
  activate(e) {
    return Ke(e, async () => {
      const n = await self.caches.open(this.strategy.cacheName), r = await n.keys(), s = new Set(this._urlsToCacheKeys.values()), i = [];
      for (const a of r)
        s.has(a.url) || (await n.delete(a), i.push(a.url));
      return { deletedURLs: i };
    });
  }
  /**
   * Returns a mapping of a precached URL to the corresponding cache key, taking
   * into account the revision information for the URL.
   *
   * @return {Map<string, string>} A URL to cache key mapping.
   */
  getURLsToCacheKeys() {
    return this._urlsToCacheKeys;
  }
  /**
   * Returns a list of all the URLs that have been precached by the current
   * service worker.
   *
   * @return {Array<string>} The precached URLs.
   */
  getCachedURLs() {
    return [...this._urlsToCacheKeys.keys()];
  }
  /**
   * Returns the cache key used for storing a given URL. If that URL is
   * unversioned, like `/index.html', then the cache key will be the original
   * URL with a search parameter appended to it.
   *
   * @param {string} url A URL whose cache key you want to look up.
   * @return {string} The versioned URL that corresponds to a cache key
   * for the original URL, or undefined if that URL isn't precached.
   */
  getCacheKeyForURL(e) {
    const n = new URL(e, location.href);
    return this._urlsToCacheKeys.get(n.href);
  }
  /**
   * @param {string} url A cache key whose SRI you want to look up.
   * @return {string} The subresource integrity associated with the cache key,
   * or undefined if it's not set.
   */
  getIntegrityForCacheKey(e) {
    return this._cacheKeysToIntegrities.get(e);
  }
  /**
   * This acts as a drop-in replacement for
   * [`cache.match()`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/match)
   * with the following differences:
   *
   * - It knows what the name of the precache is, and only checks in that cache.
   * - It allows you to pass in an "original" URL without versioning parameters,
   * and it will automatically look up the correct cache key for the currently
   * active revision of that URL.
   *
   * E.g., `matchPrecache('index.html')` will find the correct precached
   * response for the currently active service worker, even if the actual cache
   * key is `'/index.html?__WB_REVISION__=1234abcd'`.
   *
   * @param {string|Request} request The key (without revisioning parameters)
   * to look up in the precache.
   * @return {Promise<Response|undefined>}
   */
  async matchPrecache(e) {
    const n = e instanceof Request ? e.url : e, r = this.getCacheKeyForURL(n);
    if (r)
      return (await self.caches.open(this.strategy.cacheName)).match(r);
  }
  /**
   * Returns a function that looks up `url` in the precache (taking into
   * account revision information), and returns the corresponding `Response`.
   *
   * @param {string} url The precached URL which will be used to lookup the
   * `Response`.
   * @return {workbox-routing~handlerCallback}
   */
  createHandlerBoundToURL(e) {
    const n = this.getCacheKeyForURL(e);
    if (!n)
      throw new f("non-precached-url", { url: e });
    return (r) => (r.request = new Request(e), r.params = Object.assign({ cacheKey: n }, r.params), this.strategy.handle(r));
  }
}
let oe;
const Dt = () => (oe || (oe = new Ys()), oe);
try {
  self["workbox:routing:7.2.0"] && _();
} catch {
}
const Rt = "GET", V = (t) => t && typeof t == "object" ? t : { handle: t };
class x {
  /**
   * Constructor for Route class.
   *
   * @param {workbox-routing~matchCallback} match
   * A callback function that determines whether the route matches a given
   * `fetch` event by returning a non-falsy value.
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resolving to a Response.
   * @param {string} [method='GET'] The HTTP method to match the Route
   * against.
   */
  constructor(e, n, r = Rt) {
    this.handler = V(n), this.match = e, this.method = r;
  }
  /**
   *
   * @param {workbox-routing-handlerCallback} handler A callback
   * function that returns a Promise resolving to a Response
   */
  setCatchHandler(e) {
    this.catchHandler = V(e);
  }
}
class Qs extends x {
  /**
   * If the regular expression contains
   * [capture groups]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#grouping-back-references},
   * the captured values will be passed to the
   * {@link workbox-routing~handlerCallback} `params`
   * argument.
   *
   * @param {RegExp} regExp The regular expression to match against URLs.
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   * @param {string} [method='GET'] The HTTP method to match the Route
   * against.
   */
  constructor(e, n, r) {
    const s = ({ url: i }) => {
      const a = e.exec(i.href);
      if (a && !(i.origin !== location.origin && a.index !== 0))
        return a.slice(1);
    };
    super(s, n, r);
  }
}
class Zs {
  /**
   * Initializes a new Router.
   */
  constructor() {
    this._routes = /* @__PURE__ */ new Map(), this._defaultHandlerMap = /* @__PURE__ */ new Map();
  }
  /**
   * @return {Map<string, Array<workbox-routing.Route>>} routes A `Map` of HTTP
   * method name ('GET', etc.) to an array of all the corresponding `Route`
   * instances that are registered.
   */
  get routes() {
    return this._routes;
  }
  /**
   * Adds a fetch event listener to respond to events when a route matches
   * the event's request.
   */
  addFetchListener() {
    self.addEventListener("fetch", (e) => {
      const { request: n } = e, r = this.handleRequest({ request: n, event: e });
      r && e.respondWith(r);
    });
  }
  /**
   * Adds a message event listener for URLs to cache from the window.
   * This is useful to cache resources loaded on the page prior to when the
   * service worker started controlling it.
   *
   * The format of the message data sent from the window should be as follows.
   * Where the `urlsToCache` array may consist of URL strings or an array of
   * URL string + `requestInit` object (the same as you'd pass to `fetch()`).
   *
   * ```
   * {
   *   type: 'CACHE_URLS',
   *   payload: {
   *     urlsToCache: [
   *       './script1.js',
   *       './script2.js',
   *       ['./script3.js', {mode: 'no-cors'}],
   *     ],
   *   },
   * }
   * ```
   */
  addCacheListener() {
    self.addEventListener("message", (e) => {
      if (e.data && e.data.type === "CACHE_URLS") {
        const { payload: n } = e.data, r = Promise.all(n.urlsToCache.map((s) => {
          typeof s == "string" && (s = [s]);
          const i = new Request(...s);
          return this.handleRequest({ request: i, event: e });
        }));
        e.waitUntil(r), e.ports && e.ports[0] && r.then(() => e.ports[0].postMessage(!0));
      }
    });
  }
  /**
   * Apply the routing rules to a FetchEvent object to get a Response from an
   * appropriate Route's handler.
   *
   * @param {Object} options
   * @param {Request} options.request The request to handle.
   * @param {ExtendableEvent} options.event The event that triggered the
   *     request.
   * @return {Promise<Response>|undefined} A promise is returned if a
   *     registered route can handle the request. If there is no matching
   *     route and there's no `defaultHandler`, `undefined` is returned.
   */
  handleRequest({ request: e, event: n }) {
    const r = new URL(e.url, location.href);
    if (!r.protocol.startsWith("http"))
      return;
    const s = r.origin === location.origin, { params: i, route: a } = this.findMatchingRoute({
      event: n,
      request: e,
      sameOrigin: s,
      url: r
    });
    let o = a && a.handler;
    const l = e.method;
    if (!o && this._defaultHandlerMap.has(l) && (o = this._defaultHandlerMap.get(l)), !o)
      return;
    let c;
    try {
      c = o.handle({ url: r, request: e, event: n, params: i });
    } catch (h) {
      c = Promise.reject(h);
    }
    const d = a && a.catchHandler;
    return c instanceof Promise && (this._catchHandler || d) && (c = c.catch(async (h) => {
      if (d)
        try {
          return await d.handle({ url: r, request: e, event: n, params: i });
        } catch (m) {
          m instanceof Error && (h = m);
        }
      if (this._catchHandler)
        return this._catchHandler.handle({ url: r, request: e, event: n });
      throw h;
    })), c;
  }
  /**
   * Checks a request and URL (and optionally an event) against the list of
   * registered routes, and if there's a match, returns the corresponding
   * route along with any params generated by the match.
   *
   * @param {Object} options
   * @param {URL} options.url
   * @param {boolean} options.sameOrigin The result of comparing `url.origin`
   *     against the current origin.
   * @param {Request} options.request The request to match.
   * @param {Event} options.event The corresponding event.
   * @return {Object} An object with `route` and `params` properties.
   *     They are populated if a matching route was found or `undefined`
   *     otherwise.
   */
  findMatchingRoute({ url: e, sameOrigin: n, request: r, event: s }) {
    const i = this._routes.get(r.method) || [];
    for (const a of i) {
      let o;
      const l = a.match({ url: e, sameOrigin: n, request: r, event: s });
      if (l)
        return o = l, (Array.isArray(o) && o.length === 0 || l.constructor === Object && // eslint-disable-line
        Object.keys(l).length === 0 || typeof l == "boolean") && (o = void 0), { route: a, params: o };
    }
    return {};
  }
  /**
   * Define a default `handler` that's called when no routes explicitly
   * match the incoming request.
   *
   * Each HTTP method ('GET', 'POST', etc.) gets its own default handler.
   *
   * Without a default handler, unmatched requests will go against the
   * network as if there were no service worker present.
   *
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   * @param {string} [method='GET'] The HTTP method to associate with this
   * default handler. Each method has its own default.
   */
  setDefaultHandler(e, n = Rt) {
    this._defaultHandlerMap.set(n, V(e));
  }
  /**
   * If a Route throws an error while handling a request, this `handler`
   * will be called and given a chance to provide a response.
   *
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   */
  setCatchHandler(e) {
    this._catchHandler = V(e);
  }
  /**
   * Registers a route with the router.
   *
   * @param {workbox-routing.Route} route The route to register.
   */
  registerRoute(e) {
    this._routes.has(e.method) || this._routes.set(e.method, []), this._routes.get(e.method).push(e);
  }
  /**
   * Unregisters a route with the router.
   *
   * @param {workbox-routing.Route} route The route to unregister.
   */
  unregisterRoute(e) {
    if (!this._routes.has(e.method))
      throw new f("unregister-route-but-not-found-with-method", {
        method: e.method
      });
    const n = this._routes.get(e.method).indexOf(e);
    if (n > -1)
      this._routes.get(e.method).splice(n, 1);
    else
      throw new f("unregister-route-route-not-registered");
  }
}
let B;
const ei = () => (B || (B = new Zs(), B.addFetchListener(), B.addCacheListener()), B);
function ti(t, e, n) {
  let r;
  if (typeof t == "string") {
    const i = new URL(t, location.href), a = ({ url: o }) => o.href === i.href;
    r = new x(a, e, n);
  } else if (t instanceof RegExp)
    r = new Qs(t, e, n);
  else if (typeof t == "function")
    r = new x(t, e, n);
  else if (t instanceof x)
    r = t;
  else
    throw new f("unsupported-route-type", {
      moduleName: "workbox-routing",
      funcName: "registerRoute",
      paramName: "capture"
    });
  return ei().registerRoute(r), r;
}
function ni(t, e = []) {
  for (const n of [...t.searchParams.keys()])
    e.some((r) => r.test(n)) && t.searchParams.delete(n);
  return t;
}
function* ri(t, { ignoreURLParametersMatching: e = [/^utm_/, /^fbclid$/], directoryIndex: n = "index.html", cleanURLs: r = !0, urlManipulation: s } = {}) {
  const i = new URL(t, location.href);
  i.hash = "", yield i.href;
  const a = ni(i, e);
  if (yield a.href, n && a.pathname.endsWith("/")) {
    const o = new URL(a.href);
    o.pathname += n, yield o.href;
  }
  if (r) {
    const o = new URL(a.href);
    o.pathname += ".html", yield o.href;
  }
  if (s) {
    const o = s({ url: i });
    for (const l of o)
      yield l.href;
  }
}
class si extends x {
  /**
   * @param {PrecacheController} precacheController A `PrecacheController`
   * instance used to both match requests and respond to fetch events.
   * @param {Object} [options] Options to control how requests are matched
   * against the list of precached URLs.
   * @param {string} [options.directoryIndex=index.html] The `directoryIndex` will
   * check cache entries for a URLs ending with '/' to see if there is a hit when
   * appending the `directoryIndex` value.
   * @param {Array<RegExp>} [options.ignoreURLParametersMatching=[/^utm_/, /^fbclid$/]] An
   * array of regex's to remove search params when looking for a cache match.
   * @param {boolean} [options.cleanURLs=true] The `cleanURLs` option will
   * check the cache for the URL with a `.html` added to the end of the end.
   * @param {workbox-precaching~urlManipulation} [options.urlManipulation]
   * This is a function that should take a URL and return an array of
   * alternative URLs that should be checked for precache matches.
   */
  constructor(e, n) {
    const r = ({ request: s }) => {
      const i = e.getURLsToCacheKeys();
      for (const a of ri(s.url, n)) {
        const o = i.get(a);
        if (o) {
          const l = e.getIntegrityForCacheKey(o);
          return { cacheKey: o, integrity: l };
        }
      }
    };
    super(r, e.strategy);
  }
}
function ii(t) {
  const e = Dt(), n = new si(e, t);
  ti(n);
}
function ai(t) {
  Dt().precache(t);
}
function oi(t, e) {
  ai(t), ii(e);
}
oi([{"revision":null,"url":"assets/index-DZnog23E.css"},{"revision":null,"url":"assets/index-tKUOgs7b.js"},{"revision":"b96e7588e6f4aab454b202f6e89365ec","url":"index.html"},{"revision":"d4bd41f8dd12f1517340d931428983fb","url":"registerSW.js"},{"revision":"04fb41277b2d80dfa79441653613f291","url":"favicon.ico"},{"revision":"cf5eaff918a960ce531aa06af4f66583","url":"icons/android-chrome-192x192.png"},{"revision":"b3a2b02ff54274e88cba679738ae3b04","url":"icons/android-chrome-512x512.png"},{"revision":"fe78c2de6cbe40fab54d42c53c641a48","url":"manifest.webmanifest"}] || []);
const kt = {
  apiKey: "AIzaSyC-jTMiDjHNTC6cvSKUU44mVbWwT-ToLxQ",
  authDomain: "mister-x-d6b59.firebaseapp.com",
  databaseURL: "https://mister-x-d6b59-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mister-x-d6b59",
  storageBucket: "mister-x-d6b59.firebasestorage.app",
  messagingSenderId: "616391598963",
  appId: "1:616391598963:web:da07882b0f481d3000db06",
  measurementId: "G-W66SK677NG"
}, ci = tt(kt);
Ms(ci);
const li = kt.databaseURL;
function ui(t) {
  return (t || "").replace(/[.#$/\[\]\/]/g, "_");
}
function vt(t, e) {
  return new Promise((n, r) => {
    const s = indexedDB.open(t);
    s.onupgradeneeded = () => {
      const i = s.result;
      i.objectStoreNames.contains(e) || i.createObjectStore(e);
    }, s.onsuccess = () => {
      const i = s.result;
      if (i.objectStoreNames.contains(e)) {
        n(i);
        return;
      }
      const a = i.version + 1;
      i.close();
      const o = indexedDB.open(t, a);
      o.onupgradeneeded = () => {
        const l = o.result;
        l.objectStoreNames.contains(e) || l.createObjectStore(e);
      }, o.onsuccess = () => n(o.result), o.onerror = () => r(o.error);
    }, s.onerror = () => r(s.error);
  });
}
async function Ve() {
  try {
    const t = await vt("app-db", "settings");
    return await new Promise((e) => {
      const s = t.transaction("settings", "readonly").objectStore("settings").get("deviceName");
      s.onsuccess = () => {
        t.close(), e(s.result || null);
      }, s.onerror = () => {
        t.close(), e(null);
      };
    });
  } catch {
    return null;
  }
}
async function We(t, {
  tries: e = 10,
  // max. Versuche
  intervalMs: n = 100
  // Abstand zwischen Versuchen
} = {}) {
  for (let r = 0; r < e; r++) {
    const s = await self.registration.getNotifications({ tag: t });
    if (Array.isArray(s) && s.length > 0) return !0;
    await new Promise((i) => setTimeout(i, n));
  }
  return !1;
}
async function qe(t, e) {
  if (!t || !e) return;
  const n = ui(e), r = `${li}/notifications/${t}/recipients/${n}.json`;
  try {
    await fetch(r, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(!0)
    });
  } catch (s) {
    console.error("[SW] RTDB update failed:", s);
  }
}
function hi(t) {
  const e = t || "", n = /iPhone|iPad|iPod/.test(e), r = /Macintosh/.test(e) && /Mobile/.test(e);
  return n || r;
}
self.addEventListener("push", (t) => {
  t.waitUntil((async () => {
    const e = t.data ? (() => {
      try {
        return t.data.json();
      } catch {
        return {};
      }
    })() : {}, n = e.notification || {}, r = e.data || e || {}, s = n.title || r.title || "Neue Nachricht", i = n.body || r.body || "", a = r.url || n.click_action || "/Mister-X/", o = r.messageId || r.id || n.tag || String(Date.now()), l = r.tag || "mrx", d = (await clients.matchAll({ type: "window", includeUncontrolled: !0 })).find((g) => g.visibilityState === "visible"), h = self.navigator && self.navigator.userAgent ? self.navigator.userAgent : "", m = hi(h);
    if (d) {
      try {
        d.postMessage({ type: "PUSH", payload: r });
      } catch {
      }
      if (m) {
        const g = `${l}-fg`, Nt = {
          body: i,
          icon: "/Mister-X/icons/android-chrome-192x192.png",
          badge: "/Mister-X/icons/Mister_X_Badge.png",
          tag: g,
          renotify: !0,
          silent: !0,
          requireInteraction: !1,
          timestamp: r.timestamp || Date.now(),
          data: { url: a, messageId: o, tag: g, fg: !0 }
        };
        await self.registration.showNotification(s, Nt), await We(g, { tries: 10, intervalMs: 50 }), await new Promise((P) => setTimeout(P, 250)), (await self.registration.getNotifications({ tag: g })).forEach((P) => P.close());
        try {
          await qe(o, await Ve());
        } catch (P) {
          console.error("[SW] markDelivered failed:", P);
        }
        return;
      }
    }
    const E = `${l}-${o}`, J = {
      body: i,
      icon: "/Mister-X/icons/android-chrome-192x192.png",
      badge: "/Mister-X/icons/Mister_X_Badge.png",
      tag: E,
      renotify: !0,
      silent: r.silent !== void 0 ? !!r.silent : !1,
      requireInteraction: r.requireInteraction ?? !1,
      vibrate: r.vibrate ?? [120, 60, 120],
      timestamp: r.timestamp || Date.now(),
      data: { url: a, messageId: o, tag: E, fg: !1 }
    };
    await self.registration.showNotification(s, J), await We(E, { tries: 10, intervalMs: 100 });
    try {
      const g = await Ve();
      await qe(o, g);
    } catch (g) {
      console.error("[SW] markDelivered failed:", g);
    }
  })());
});
self.addEventListener("notificationclick", (t) => {
  t.notification.close(), t.waitUntil((async () => {
    const e = t.notification && t.notification.data && t.notification.data.url || "/Mister-X/", n = await clients.matchAll({ type: "window", includeUncontrolled: !0 });
    for (const r of n)
      if ("focus" in r && r.url.includes("/Mister-X/"))
        return r.focus();
    if (clients.openWindow) return clients.openWindow(e);
  })());
});
self.addEventListener("message", (t) => {
  t && t.data && t.data.type === "SKIP_WAITING" && self.skipWaiting();
});
self.addEventListener("activate", (t) => {
  t.waitUntil(self.clients.claim());
});
async function fi(t, e) {
  const n = await vt("app-db", "sw-flags");
  await new Promise((r, s) => {
    const i = n.transaction("sw-flags", "readwrite");
    i.objectStore("sw-flags").put(e, t), i.oncomplete = () => {
      n.close(), r();
    }, i.onerror = () => {
      n.close(), s(i.error);
    };
  });
}
self.addEventListener("pushsubscriptionchange", (t) => {
  t.waitUntil((async () => {
    try {
      await fi("pushSubscriptionChangedAt", Date.now());
    } catch {
    }
    (await clients.matchAll({ type: "window", includeUncontrolled: !0 })).forEach((n) => {
      try {
        n.postMessage({ type: "PUSH_SUBSCRIPTION_CHANGED" });
      } catch {
      }
    });
  })());
});
