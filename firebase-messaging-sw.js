const Lt = () => {
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
const Je = function(t) {
  const e = [];
  let n = 0;
  for (let s = 0; s < t.length; s++) {
    let r = t.charCodeAt(s);
    r < 128 ? e[n++] = r : r < 2048 ? (e[n++] = r >> 6 | 192, e[n++] = r & 63 | 128) : (r & 64512) === 55296 && s + 1 < t.length && (t.charCodeAt(s + 1) & 64512) === 56320 ? (r = 65536 + ((r & 1023) << 10) + (t.charCodeAt(++s) & 1023), e[n++] = r >> 18 | 240, e[n++] = r >> 12 & 63 | 128, e[n++] = r >> 6 & 63 | 128, e[n++] = r & 63 | 128) : (e[n++] = r >> 12 | 224, e[n++] = r >> 6 & 63 | 128, e[n++] = r & 63 | 128);
  }
  return e;
}, xt = function(t) {
  const e = [];
  let n = 0, s = 0;
  for (; n < t.length; ) {
    const r = t[n++];
    if (r < 128)
      e[s++] = String.fromCharCode(r);
    else if (r > 191 && r < 224) {
      const a = t[n++];
      e[s++] = String.fromCharCode((r & 31) << 6 | a & 63);
    } else if (r > 239 && r < 365) {
      const a = t[n++], i = t[n++], o = t[n++], l = ((r & 7) << 18 | (a & 63) << 12 | (i & 63) << 6 | o & 63) - 65536;
      e[s++] = String.fromCharCode(55296 + (l >> 10)), e[s++] = String.fromCharCode(56320 + (l & 1023));
    } else {
      const a = t[n++], i = t[n++];
      e[s++] = String.fromCharCode((r & 15) << 12 | (a & 63) << 6 | i & 63);
    }
  }
  return e.join("");
}, Xe = {
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
    const n = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_, s = [];
    for (let r = 0; r < t.length; r += 3) {
      const a = t[r], i = r + 1 < t.length, o = i ? t[r + 1] : 0, l = r + 2 < t.length, c = l ? t[r + 2] : 0, d = a >> 2, h = (a & 3) << 4 | o >> 4;
      let w = (o & 15) << 2 | c >> 6, E = c & 63;
      l || (E = 64, i || (w = 64)), s.push(n[d], n[h], n[w], n[E]);
    }
    return s.join("");
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
    return this.HAS_NATIVE_SUPPORT && !e ? btoa(t) : this.encodeByteArray(Je(t), e);
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
    return this.HAS_NATIVE_SUPPORT && !e ? atob(t) : xt(this.decodeStringToByteArray(t, e));
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
    const n = e ? this.charToByteMapWebSafe_ : this.charToByteMap_, s = [];
    for (let r = 0; r < t.length; ) {
      const a = n[t.charAt(r++)], o = r < t.length ? n[t.charAt(r)] : 0;
      ++r;
      const c = r < t.length ? n[t.charAt(r)] : 64;
      ++r;
      const h = r < t.length ? n[t.charAt(r)] : 64;
      if (++r, a == null || o == null || c == null || h == null)
        throw new Bt();
      const w = a << 2 | o >> 4;
      if (s.push(w), c !== 64) {
        const E = o << 4 & 240 | c >> 2;
        if (s.push(E), h !== 64) {
          const Y = c << 6 & 192 | h;
          s.push(Y);
        }
      }
    }
    return s;
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
class Bt extends Error {
  constructor() {
    super(...arguments), this.name = "DecodeBase64StringError";
  }
}
const Ut = function(t) {
  const e = Je(t);
  return Xe.encodeByteArray(e, !0);
}, Ye = function(t) {
  return Ut(t).replace(/\./g, "");
}, $t = function(t) {
  try {
    return Xe.decodeString(t, !0);
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
function Ft() {
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
const jt = () => Ft().__FIREBASE_DEFAULTS__, Kt = () => {
  if (typeof process > "u" || typeof process.env > "u")
    return;
  const t = process.env.__FIREBASE_DEFAULTS__;
  if (t)
    return JSON.parse(t);
}, Ht = () => {
  if (typeof document > "u")
    return;
  let t;
  try {
    t = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
  } catch {
    return;
  }
  const e = t && $t(t[1]);
  return e && JSON.parse(e);
}, Wt = () => {
  try {
    return Lt() || jt() || Kt() || Ht();
  } catch (t) {
    console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);
    return;
  }
}, Qe = () => {
  var t;
  return (t = Wt()) == null ? void 0 : t.config;
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
let qt = class {
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
    return (n, s) => {
      n ? this.reject(n) : this.resolve(s), typeof e == "function" && (this.promise.catch(() => {
      }), e.length === 1 ? e(n) : e(n, s));
    };
  }
};
function Ze() {
  try {
    return typeof indexedDB == "object";
  } catch {
    return !1;
  }
}
function et() {
  return new Promise((t, e) => {
    try {
      let n = !0;
      const s = "validate-browser-context-for-indexeddb-analytics-module", r = self.indexedDB.open(s);
      r.onsuccess = () => {
        r.result.close(), n || self.indexedDB.deleteDatabase(s), t(!0);
      }, r.onupgradeneeded = () => {
        n = !1;
      }, r.onerror = () => {
        var a;
        e(((a = r.error) == null ? void 0 : a.message) || "");
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
const Vt = "FirebaseError";
class L extends Error {
  constructor(e, n, s) {
    super(n), this.code = e, this.customData = s, this.name = Vt, Object.setPrototypeOf(this, L.prototype), Error.captureStackTrace && Error.captureStackTrace(this, V.prototype.create);
  }
}
class V {
  constructor(e, n, s) {
    this.service = e, this.serviceName = n, this.errors = s;
  }
  create(e, ...n) {
    const s = n[0] || {}, r = `${this.service}/${e}`, a = this.errors[e], i = a ? zt(a, s) : "Error", o = `${this.serviceName}: ${i} (${r}).`;
    return new L(r, o, s);
  }
}
function zt(t, e) {
  return t.replace(Gt, (n, s) => {
    const r = e[s];
    return r != null ? String(r) : `<${s}?>`;
  });
}
const Gt = /\{\$([^}]+)}/g;
function he(t, e) {
  if (t === e)
    return !0;
  const n = Object.keys(t), s = Object.keys(e);
  for (const r of n) {
    if (!s.includes(r))
      return !1;
    const a = t[r], i = e[r];
    if (Ne(a) && Ne(i)) {
      if (!he(a, i))
        return !1;
    } else if (a !== i)
      return !1;
  }
  for (const r of s)
    if (!n.includes(r))
      return !1;
  return !0;
}
function Ne(t) {
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
function Jt(t) {
  return t && t._delegate ? t._delegate : t;
}
class D {
  /**
   *
   * @param name The public service name, e.g. app, auth, firestore, database
   * @param instanceFactory Service factory responsible for creating the public interface
   * @param type whether the service provided by the component is public or private
   */
  constructor(e, n, s) {
    this.name = e, this.instanceFactory = n, this.type = s, this.multipleInstances = !1, this.serviceProps = {}, this.instantiationMode = "LAZY", this.onInstanceCreated = null;
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
const k = "[DEFAULT]";
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
      const s = new qt();
      if (this.instancesDeferred.set(n, s), this.isInitialized(n) || this.shouldAutoInitialize())
        try {
          const r = this.getOrInitializeService({
            instanceIdentifier: n
          });
          r && s.resolve(r);
        } catch {
        }
    }
    return this.instancesDeferred.get(n).promise;
  }
  getImmediate(e) {
    const n = this.normalizeInstanceIdentifier(e == null ? void 0 : e.identifier), s = (e == null ? void 0 : e.optional) ?? !1;
    if (this.isInitialized(n) || this.shouldAutoInitialize())
      try {
        return this.getOrInitializeService({
          instanceIdentifier: n
        });
      } catch (r) {
        if (s)
          return null;
        throw r;
      }
    else {
      if (s)
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
      if (Qt(e))
        try {
          this.getOrInitializeService({ instanceIdentifier: k });
        } catch {
        }
      for (const [n, s] of this.instancesDeferred.entries()) {
        const r = this.normalizeInstanceIdentifier(n);
        try {
          const a = this.getOrInitializeService({
            instanceIdentifier: r
          });
          s.resolve(a);
        } catch {
        }
      }
    }
  }
  clearInstance(e = k) {
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
  isInitialized(e = k) {
    return this.instances.has(e);
  }
  getOptions(e = k) {
    return this.instancesOptions.get(e) || {};
  }
  initialize(e = {}) {
    const { options: n = {} } = e, s = this.normalizeInstanceIdentifier(e.instanceIdentifier);
    if (this.isInitialized(s))
      throw Error(`${this.name}(${s}) has already been initialized`);
    if (!this.isComponentSet())
      throw Error(`Component ${this.name} has not been registered yet`);
    const r = this.getOrInitializeService({
      instanceIdentifier: s,
      options: n
    });
    for (const [a, i] of this.instancesDeferred.entries()) {
      const o = this.normalizeInstanceIdentifier(a);
      s === o && i.resolve(r);
    }
    return r;
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
    const s = this.normalizeInstanceIdentifier(n), r = this.onInitCallbacks.get(s) ?? /* @__PURE__ */ new Set();
    r.add(e), this.onInitCallbacks.set(s, r);
    const a = this.instances.get(s);
    return a && e(a, s), () => {
      r.delete(e);
    };
  }
  /**
   * Invoke onInit callbacks synchronously
   * @param instance the service instance`
   */
  invokeOnInitCallbacks(e, n) {
    const s = this.onInitCallbacks.get(n);
    if (s)
      for (const r of s)
        try {
          r(e, n);
        } catch {
        }
  }
  getOrInitializeService({ instanceIdentifier: e, options: n = {} }) {
    let s = this.instances.get(e);
    if (!s && this.component && (s = this.component.instanceFactory(this.container, {
      instanceIdentifier: Yt(e),
      options: n
    }), this.instances.set(e, s), this.instancesOptions.set(e, n), this.invokeOnInitCallbacks(s, e), this.component.onInstanceCreated))
      try {
        this.component.onInstanceCreated(this.container, e, s);
      } catch {
      }
    return s || null;
  }
  normalizeInstanceIdentifier(e = k) {
    return this.component ? this.component.multipleInstances ? e : k : e;
  }
  shouldAutoInitialize() {
    return !!this.component && this.component.instantiationMode !== "EXPLICIT";
  }
}
function Yt(t) {
  return t === k ? void 0 : t;
}
function Qt(t) {
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
class Zt {
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
    const n = new Xt(e, this);
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
const en = {
  debug: u.DEBUG,
  verbose: u.VERBOSE,
  info: u.INFO,
  warn: u.WARN,
  error: u.ERROR,
  silent: u.SILENT
}, tn = u.INFO, nn = {
  [u.DEBUG]: "log",
  [u.VERBOSE]: "log",
  [u.INFO]: "info",
  [u.WARN]: "warn",
  [u.ERROR]: "error"
}, sn = (t, e, ...n) => {
  if (e < t.logLevel)
    return;
  const s = (/* @__PURE__ */ new Date()).toISOString(), r = nn[e];
  if (r)
    console[r](`[${s}]  ${t.name}:`, ...n);
  else
    throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`);
};
class rn {
  /**
   * Gives you an instance of a Logger to capture messages according to
   * Firebase's logging scheme.
   *
   * @param name The name that the logs will be associated with
   */
  constructor(e) {
    this.name = e, this._logLevel = tn, this._logHandler = sn, this._userLogHandler = null;
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
    this._logLevel = typeof e == "string" ? en[e] : e;
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
const an = (t, e) => e.some((n) => t instanceof n);
let Oe, Me;
function on() {
  return Oe || (Oe = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function cn() {
  return Me || (Me = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
const tt = /* @__PURE__ */ new WeakMap(), fe = /* @__PURE__ */ new WeakMap(), nt = /* @__PURE__ */ new WeakMap(), Z = /* @__PURE__ */ new WeakMap(), be = /* @__PURE__ */ new WeakMap();
function ln(t) {
  const e = new Promise((n, s) => {
    const r = () => {
      t.removeEventListener("success", a), t.removeEventListener("error", i);
    }, a = () => {
      n(S(t.result)), r();
    }, i = () => {
      s(t.error), r();
    };
    t.addEventListener("success", a), t.addEventListener("error", i);
  });
  return e.then((n) => {
    n instanceof IDBCursor && tt.set(n, t);
  }).catch(() => {
  }), be.set(e, t), e;
}
function un(t) {
  if (fe.has(t))
    return;
  const e = new Promise((n, s) => {
    const r = () => {
      t.removeEventListener("complete", a), t.removeEventListener("error", i), t.removeEventListener("abort", i);
    }, a = () => {
      n(), r();
    }, i = () => {
      s(t.error || new DOMException("AbortError", "AbortError")), r();
    };
    t.addEventListener("complete", a), t.addEventListener("error", i), t.addEventListener("abort", i);
  });
  fe.set(t, e);
}
let de = {
  get(t, e, n) {
    if (t instanceof IDBTransaction) {
      if (e === "done")
        return fe.get(t);
      if (e === "objectStoreNames")
        return t.objectStoreNames || nt.get(t);
      if (e === "store")
        return n.objectStoreNames[1] ? void 0 : n.objectStore(n.objectStoreNames[0]);
    }
    return S(t[e]);
  },
  set(t, e, n) {
    return t[e] = n, !0;
  },
  has(t, e) {
    return t instanceof IDBTransaction && (e === "done" || e === "store") ? !0 : e in t;
  }
};
function hn(t) {
  de = t(de);
}
function fn(t) {
  return t === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype) ? function(e, ...n) {
    const s = t.call(ee(this), e, ...n);
    return nt.set(s, e.sort ? e.sort() : [e]), S(s);
  } : cn().includes(t) ? function(...e) {
    return t.apply(ee(this), e), S(tt.get(this));
  } : function(...e) {
    return S(t.apply(ee(this), e));
  };
}
function dn(t) {
  return typeof t == "function" ? fn(t) : (t instanceof IDBTransaction && un(t), an(t, on()) ? new Proxy(t, de) : t);
}
function S(t) {
  if (t instanceof IDBRequest)
    return ln(t);
  if (Z.has(t))
    return Z.get(t);
  const e = dn(t);
  return e !== t && (Z.set(t, e), be.set(e, t)), e;
}
const ee = (t) => be.get(t);
function z(t, e, { blocked: n, upgrade: s, blocking: r, terminated: a } = {}) {
  const i = indexedDB.open(t, e), o = S(i);
  return s && i.addEventListener("upgradeneeded", (l) => {
    s(S(i.result), l.oldVersion, l.newVersion, S(i.transaction), l);
  }), n && i.addEventListener("blocked", (l) => n(
    // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
    l.oldVersion,
    l.newVersion,
    l
  )), o.then((l) => {
    a && l.addEventListener("close", () => a()), r && l.addEventListener("versionchange", (c) => r(c.oldVersion, c.newVersion, c));
  }).catch(() => {
  }), o;
}
function te(t, { blocked: e } = {}) {
  const n = indexedDB.deleteDatabase(t);
  return e && n.addEventListener("blocked", (s) => e(
    // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
    s.oldVersion,
    s
  )), S(n).then(() => {
  });
}
const pn = ["get", "getKey", "getAll", "getAllKeys", "count"], gn = ["put", "add", "delete", "clear"], ne = /* @__PURE__ */ new Map();
function Pe(t, e) {
  if (!(t instanceof IDBDatabase && !(e in t) && typeof e == "string"))
    return;
  if (ne.get(e))
    return ne.get(e);
  const n = e.replace(/FromIndex$/, ""), s = e !== n, r = gn.includes(n);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(n in (s ? IDBIndex : IDBObjectStore).prototype) || !(r || pn.includes(n))
  )
    return;
  const a = async function(i, ...o) {
    const l = this.transaction(i, r ? "readwrite" : "readonly");
    let c = l.store;
    return s && (c = c.index(o.shift())), (await Promise.all([
      c[n](...o),
      r && l.done
    ]))[0];
  };
  return ne.set(e, a), a;
}
hn((t) => ({
  ...t,
  get: (e, n, s) => Pe(e, n) || t.get(e, n, s),
  has: (e, n) => !!Pe(e, n) || t.has(e, n)
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
class mn {
  constructor(e) {
    this.container = e;
  }
  // In initial implementation, this will be called by installations on
  // auth token refresh, and installations will send this string.
  getPlatformInfoString() {
    return this.container.getProviders().map((n) => {
      if (wn(n)) {
        const s = n.getImmediate();
        return `${s.library}/${s.version}`;
      } else
        return null;
    }).filter((n) => n).join(" ");
  }
}
function wn(t) {
  const e = t.getComponent();
  return (e == null ? void 0 : e.type) === "VERSION";
}
const pe = "@firebase/app", Le = "0.14.1";
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
const I = new rn("@firebase/app"), bn = "@firebase/app-compat", yn = "@firebase/analytics-compat", _n = "@firebase/analytics", Sn = "@firebase/app-check-compat", In = "@firebase/app-check", En = "@firebase/auth", Cn = "@firebase/auth-compat", Tn = "@firebase/database", kn = "@firebase/data-connect", An = "@firebase/database-compat", Dn = "@firebase/functions", Rn = "@firebase/functions-compat", vn = "@firebase/installations", Nn = "@firebase/installations-compat", On = "@firebase/messaging", Mn = "@firebase/messaging-compat", Pn = "@firebase/performance", Ln = "@firebase/performance-compat", xn = "@firebase/remote-config", Bn = "@firebase/remote-config-compat", Un = "@firebase/storage", $n = "@firebase/storage-compat", Fn = "@firebase/firestore", jn = "@firebase/ai", Kn = "@firebase/firestore-compat", Hn = "firebase";
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
const ge = "[DEFAULT]", Wn = {
  [pe]: "fire-core",
  [bn]: "fire-core-compat",
  [_n]: "fire-analytics",
  [yn]: "fire-analytics-compat",
  [In]: "fire-app-check",
  [Sn]: "fire-app-check-compat",
  [En]: "fire-auth",
  [Cn]: "fire-auth-compat",
  [Tn]: "fire-rtdb",
  [kn]: "fire-data-connect",
  [An]: "fire-rtdb-compat",
  [Dn]: "fire-fn",
  [Rn]: "fire-fn-compat",
  [vn]: "fire-iid",
  [Nn]: "fire-iid-compat",
  [On]: "fire-fcm",
  [Mn]: "fire-fcm-compat",
  [Pn]: "fire-perf",
  [Ln]: "fire-perf-compat",
  [xn]: "fire-rc",
  [Bn]: "fire-rc-compat",
  [Un]: "fire-gcs",
  [$n]: "fire-gcs-compat",
  [Fn]: "fire-fst",
  [Kn]: "fire-fst-compat",
  [jn]: "fire-vertex",
  "fire-js": "fire-js",
  // Platform identifier for JS SDK.
  [Hn]: "fire-js-all"
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
const j = /* @__PURE__ */ new Map(), qn = /* @__PURE__ */ new Map(), me = /* @__PURE__ */ new Map();
function xe(t, e) {
  try {
    t.container.addComponent(e);
  } catch (n) {
    I.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`, n);
  }
}
function P(t) {
  const e = t.name;
  if (me.has(e))
    return I.debug(`There were multiple attempts to register component ${e}.`), !1;
  me.set(e, t);
  for (const n of j.values())
    xe(n, t);
  for (const n of qn.values())
    xe(n, t);
  return !0;
}
function ye(t, e) {
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
const Vn = {
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
}, T = new V("app", "Firebase", Vn);
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
class zn {
  constructor(e, n, s) {
    this._isDeleted = !1, this._options = { ...e }, this._config = { ...n }, this._name = n.name, this._automaticDataCollectionEnabled = n.automaticDataCollectionEnabled, this._container = s, this.container.addComponent(new D(
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
      throw T.create("app-deleted", { appName: this._name });
  }
}
function st(t, e = {}) {
  let n = t;
  typeof e != "object" && (e = { name: e });
  const s = {
    name: ge,
    automaticDataCollectionEnabled: !0,
    ...e
  }, r = s.name;
  if (typeof r != "string" || !r)
    throw T.create("bad-app-name", {
      appName: String(r)
    });
  if (n || (n = Qe()), !n)
    throw T.create(
      "no-options"
      /* AppError.NO_OPTIONS */
    );
  const a = j.get(r);
  if (a) {
    if (he(n, a.options) && he(s, a.config))
      return a;
    throw T.create("duplicate-app", { appName: r });
  }
  const i = new Zt(r);
  for (const l of me.values())
    i.addComponent(l);
  const o = new zn(n, s, i);
  return j.set(r, o), o;
}
function Gn(t = ge) {
  const e = j.get(t);
  if (!e && t === ge && Qe())
    return st();
  if (!e)
    throw T.create("no-app", { appName: t });
  return e;
}
function M(t, e, n) {
  let s = Wn[t] ?? t;
  n && (s += `-${n}`);
  const r = s.match(/\s|\//), a = e.match(/\s|\//);
  if (r || a) {
    const i = [
      `Unable to register library "${s}" with version "${e}":`
    ];
    r && i.push(`library name "${s}" contains illegal characters (whitespace or "/")`), r && a && i.push("and"), a && i.push(`version name "${e}" contains illegal characters (whitespace or "/")`), I.warn(i.join(" "));
    return;
  }
  P(new D(
    `${s}-version`,
    () => ({ library: s, version: e }),
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
const Jn = "firebase-heartbeat-database", Xn = 1, $ = "firebase-heartbeat-store";
let se = null;
function rt() {
  return se || (se = z(Jn, Xn, {
    upgrade: (t, e) => {
      switch (e) {
        case 0:
          try {
            t.createObjectStore($);
          } catch (n) {
            console.warn(n);
          }
      }
    }
  }).catch((t) => {
    throw T.create("idb-open", {
      originalErrorMessage: t.message
    });
  })), se;
}
async function Yn(t) {
  try {
    const n = (await rt()).transaction($), s = await n.objectStore($).get(at(t));
    return await n.done, s;
  } catch (e) {
    if (e instanceof L)
      I.warn(e.message);
    else {
      const n = T.create("idb-get", {
        originalErrorMessage: e == null ? void 0 : e.message
      });
      I.warn(n.message);
    }
  }
}
async function Be(t, e) {
  try {
    const s = (await rt()).transaction($, "readwrite");
    await s.objectStore($).put(e, at(t)), await s.done;
  } catch (n) {
    if (n instanceof L)
      I.warn(n.message);
    else {
      const s = T.create("idb-set", {
        originalErrorMessage: n == null ? void 0 : n.message
      });
      I.warn(s.message);
    }
  }
}
function at(t) {
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
const Qn = 1024, Zn = 30;
class es {
  constructor(e) {
    this.container = e, this._heartbeatsCache = null;
    const n = this.container.getProvider("app").getImmediate();
    this._storage = new ns(n), this._heartbeatsCachePromise = this._storage.read().then((s) => (this._heartbeatsCache = s, s));
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
      const r = this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(), a = Ue();
      if (((e = this._heartbeatsCache) == null ? void 0 : e.heartbeats) == null && (this._heartbeatsCache = await this._heartbeatsCachePromise, ((n = this._heartbeatsCache) == null ? void 0 : n.heartbeats) == null) || this._heartbeatsCache.lastSentHeartbeatDate === a || this._heartbeatsCache.heartbeats.some((i) => i.date === a))
        return;
      if (this._heartbeatsCache.heartbeats.push({ date: a, agent: r }), this._heartbeatsCache.heartbeats.length > Zn) {
        const i = ss(this._heartbeatsCache.heartbeats);
        this._heartbeatsCache.heartbeats.splice(i, 1);
      }
      return this._storage.overwrite(this._heartbeatsCache);
    } catch (s) {
      I.warn(s);
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
      const n = Ue(), { heartbeatsToSend: s, unsentEntries: r } = ts(this._heartbeatsCache.heartbeats), a = Ye(JSON.stringify({ version: 2, heartbeats: s }));
      return this._heartbeatsCache.lastSentHeartbeatDate = n, r.length > 0 ? (this._heartbeatsCache.heartbeats = r, await this._storage.overwrite(this._heartbeatsCache)) : (this._heartbeatsCache.heartbeats = [], this._storage.overwrite(this._heartbeatsCache)), a;
    } catch (n) {
      return I.warn(n), "";
    }
  }
}
function Ue() {
  return (/* @__PURE__ */ new Date()).toISOString().substring(0, 10);
}
function ts(t, e = Qn) {
  const n = [];
  let s = t.slice();
  for (const r of t) {
    const a = n.find((i) => i.agent === r.agent);
    if (a) {
      if (a.dates.push(r.date), $e(n) > e) {
        a.dates.pop();
        break;
      }
    } else if (n.push({
      agent: r.agent,
      dates: [r.date]
    }), $e(n) > e) {
      n.pop();
      break;
    }
    s = s.slice(1);
  }
  return {
    heartbeatsToSend: n,
    unsentEntries: s
  };
}
class ns {
  constructor(e) {
    this.app = e, this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck();
  }
  async runIndexedDBEnvironmentCheck() {
    return Ze() ? et().then(() => !0).catch(() => !1) : !1;
  }
  /**
   * Read all heartbeats.
   */
  async read() {
    if (await this._canUseIndexedDBPromise) {
      const n = await Yn(this.app);
      return n != null && n.heartbeats ? n : { heartbeats: [] };
    } else
      return { heartbeats: [] };
  }
  // overwrite the storage with the provided heartbeats
  async overwrite(e) {
    if (await this._canUseIndexedDBPromise) {
      const s = await this.read();
      return Be(this.app, {
        lastSentHeartbeatDate: e.lastSentHeartbeatDate ?? s.lastSentHeartbeatDate,
        heartbeats: e.heartbeats
      });
    } else
      return;
  }
  // add heartbeats
  async add(e) {
    if (await this._canUseIndexedDBPromise) {
      const s = await this.read();
      return Be(this.app, {
        lastSentHeartbeatDate: e.lastSentHeartbeatDate ?? s.lastSentHeartbeatDate,
        heartbeats: [
          ...s.heartbeats,
          ...e.heartbeats
        ]
      });
    } else
      return;
  }
}
function $e(t) {
  return Ye(
    // heartbeatsCache wrapper properties
    JSON.stringify({ version: 2, heartbeats: t })
  ).length;
}
function ss(t) {
  if (t.length === 0)
    return -1;
  let e = 0, n = t[0].date;
  for (let s = 1; s < t.length; s++)
    t[s].date < n && (n = t[s].date, e = s);
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
function rs(t) {
  P(new D(
    "platform-logger",
    (e) => new mn(e),
    "PRIVATE"
    /* ComponentType.PRIVATE */
  )), P(new D(
    "heartbeat",
    (e) => new es(e),
    "PRIVATE"
    /* ComponentType.PRIVATE */
  )), M(pe, Le, t), M(pe, Le, "esm2020"), M("fire-js", "");
}
rs("");
var as = "firebase", is = "12.1.0";
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
M(as, is, "app");
const it = "@firebase/installations", _e = "0.6.19";
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
const ot = 1e4, ct = `w:${_e}`, lt = "FIS_v2", os = "https://firebaseinstallations.googleapis.com/v1", cs = 60 * 60 * 1e3, ls = "installations", us = "Installations";
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
const hs = {
  "missing-app-config-values": 'Missing App configuration value: "{$valueName}"',
  "not-registered": "Firebase Installation is not registered.",
  "installation-not-found": "Firebase Installation not found.",
  "request-failed": '{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',
  "app-offline": "Could not process request. Application offline.",
  "delete-pending-registration": "Can't delete installation while there is a pending registration request."
}, R = new V(ls, us, hs);
function ut(t) {
  return t instanceof L && t.code.includes(
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
function ht({ projectId: t }) {
  return `${os}/projects/${t}/installations`;
}
function ft(t) {
  return {
    token: t.token,
    requestStatus: 2,
    expiresIn: ds(t.expiresIn),
    creationTime: Date.now()
  };
}
async function dt(t, e) {
  const s = (await e.json()).error;
  return R.create("request-failed", {
    requestName: t,
    serverCode: s.code,
    serverMessage: s.message,
    serverStatus: s.status
  });
}
function pt({ apiKey: t }) {
  return new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-goog-api-key": t
  });
}
function fs(t, { refreshToken: e }) {
  const n = pt(t);
  return n.append("Authorization", ps(e)), n;
}
async function gt(t) {
  const e = await t();
  return e.status >= 500 && e.status < 600 ? t() : e;
}
function ds(t) {
  return Number(t.replace("s", "000"));
}
function ps(t) {
  return `${lt} ${t}`;
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
async function gs({ appConfig: t, heartbeatServiceProvider: e }, { fid: n }) {
  const s = ht(t), r = pt(t), a = e.getImmediate({
    optional: !0
  });
  if (a) {
    const c = await a.getHeartbeatsHeader();
    c && r.append("x-firebase-client", c);
  }
  const i = {
    fid: n,
    authVersion: lt,
    appId: t.appId,
    sdkVersion: ct
  }, o = {
    method: "POST",
    headers: r,
    body: JSON.stringify(i)
  }, l = await gt(() => fetch(s, o));
  if (l.ok) {
    const c = await l.json();
    return {
      fid: c.fid || n,
      registrationStatus: 2,
      refreshToken: c.refreshToken,
      authToken: ft(c.authToken)
    };
  } else
    throw await dt("Create Installation", l);
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
function mt(t) {
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
function ms(t) {
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
const ws = /^[cdef][\w-]{21}$/, we = "";
function bs() {
  try {
    const t = new Uint8Array(17);
    (self.crypto || self.msCrypto).getRandomValues(t), t[0] = 112 + t[0] % 16;
    const n = ys(t);
    return ws.test(n) ? n : we;
  } catch {
    return we;
  }
}
function ys(t) {
  return ms(t).substr(0, 22);
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
function G(t) {
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
const wt = /* @__PURE__ */ new Map();
function bt(t, e) {
  const n = G(t);
  yt(n, e), _s(n, e);
}
function yt(t, e) {
  const n = wt.get(t);
  if (n)
    for (const s of n)
      s(e);
}
function _s(t, e) {
  const n = Ss();
  n && n.postMessage({ key: t, fid: e }), Is();
}
let A = null;
function Ss() {
  return !A && "BroadcastChannel" in self && (A = new BroadcastChannel("[Firebase] FID Change"), A.onmessage = (t) => {
    yt(t.data.key, t.data.fid);
  }), A;
}
function Is() {
  wt.size === 0 && A && (A.close(), A = null);
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
const Es = "firebase-installations-database", Cs = 1, v = "firebase-installations-store";
let re = null;
function Se() {
  return re || (re = z(Es, Cs, {
    upgrade: (t, e) => {
      switch (e) {
        case 0:
          t.createObjectStore(v);
      }
    }
  })), re;
}
async function K(t, e) {
  const n = G(t), r = (await Se()).transaction(v, "readwrite"), a = r.objectStore(v), i = await a.get(n);
  return await a.put(e, n), await r.done, (!i || i.fid !== e.fid) && bt(t, e.fid), e;
}
async function _t(t) {
  const e = G(t), s = (await Se()).transaction(v, "readwrite");
  await s.objectStore(v).delete(e), await s.done;
}
async function J(t, e) {
  const n = G(t), r = (await Se()).transaction(v, "readwrite"), a = r.objectStore(v), i = await a.get(n), o = e(i);
  return o === void 0 ? await a.delete(n) : await a.put(o, n), await r.done, o && (!i || i.fid !== o.fid) && bt(t, o.fid), o;
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
async function Ie(t) {
  let e;
  const n = await J(t.appConfig, (s) => {
    const r = Ts(s), a = ks(t, r);
    return e = a.registrationPromise, a.installationEntry;
  });
  return n.fid === we ? { installationEntry: await e } : {
    installationEntry: n,
    registrationPromise: e
  };
}
function Ts(t) {
  const e = t || {
    fid: bs(),
    registrationStatus: 0
    /* RequestStatus.NOT_STARTED */
  };
  return St(e);
}
function ks(t, e) {
  if (e.registrationStatus === 0) {
    if (!navigator.onLine) {
      const r = Promise.reject(R.create(
        "app-offline"
        /* ErrorCode.APP_OFFLINE */
      ));
      return {
        installationEntry: e,
        registrationPromise: r
      };
    }
    const n = {
      fid: e.fid,
      registrationStatus: 1,
      registrationTime: Date.now()
    }, s = As(t, n);
    return { installationEntry: n, registrationPromise: s };
  } else return e.registrationStatus === 1 ? {
    installationEntry: e,
    registrationPromise: Ds(t)
  } : { installationEntry: e };
}
async function As(t, e) {
  try {
    const n = await gs(t, e);
    return K(t.appConfig, n);
  } catch (n) {
    throw ut(n) && n.customData.serverCode === 409 ? await _t(t.appConfig) : await K(t.appConfig, {
      fid: e.fid,
      registrationStatus: 0
      /* RequestStatus.NOT_STARTED */
    }), n;
  }
}
async function Ds(t) {
  let e = await Fe(t.appConfig);
  for (; e.registrationStatus === 1; )
    await mt(100), e = await Fe(t.appConfig);
  if (e.registrationStatus === 0) {
    const { installationEntry: n, registrationPromise: s } = await Ie(t);
    return s || n;
  }
  return e;
}
function Fe(t) {
  return J(t, (e) => {
    if (!e)
      throw R.create(
        "installation-not-found"
        /* ErrorCode.INSTALLATION_NOT_FOUND */
      );
    return St(e);
  });
}
function St(t) {
  return Rs(t) ? {
    fid: t.fid,
    registrationStatus: 0
    /* RequestStatus.NOT_STARTED */
  } : t;
}
function Rs(t) {
  return t.registrationStatus === 1 && t.registrationTime + ot < Date.now();
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
async function vs({ appConfig: t, heartbeatServiceProvider: e }, n) {
  const s = Ns(t, n), r = fs(t, n), a = e.getImmediate({
    optional: !0
  });
  if (a) {
    const c = await a.getHeartbeatsHeader();
    c && r.append("x-firebase-client", c);
  }
  const i = {
    installation: {
      sdkVersion: ct,
      appId: t.appId
    }
  }, o = {
    method: "POST",
    headers: r,
    body: JSON.stringify(i)
  }, l = await gt(() => fetch(s, o));
  if (l.ok) {
    const c = await l.json();
    return ft(c);
  } else
    throw await dt("Generate Auth Token", l);
}
function Ns(t, { fid: e }) {
  return `${ht(t)}/${e}/authTokens:generate`;
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
async function Ee(t, e = !1) {
  let n;
  const s = await J(t.appConfig, (a) => {
    if (!It(a))
      throw R.create(
        "not-registered"
        /* ErrorCode.NOT_REGISTERED */
      );
    const i = a.authToken;
    if (!e && Ps(i))
      return a;
    if (i.requestStatus === 1)
      return n = Os(t, e), a;
    {
      if (!navigator.onLine)
        throw R.create(
          "app-offline"
          /* ErrorCode.APP_OFFLINE */
        );
      const o = xs(a);
      return n = Ms(t, o), o;
    }
  });
  return n ? await n : s.authToken;
}
async function Os(t, e) {
  let n = await je(t.appConfig);
  for (; n.authToken.requestStatus === 1; )
    await mt(100), n = await je(t.appConfig);
  const s = n.authToken;
  return s.requestStatus === 0 ? Ee(t, e) : s;
}
function je(t) {
  return J(t, (e) => {
    if (!It(e))
      throw R.create(
        "not-registered"
        /* ErrorCode.NOT_REGISTERED */
      );
    const n = e.authToken;
    return Bs(n) ? {
      ...e,
      authToken: {
        requestStatus: 0
        /* RequestStatus.NOT_STARTED */
      }
    } : e;
  });
}
async function Ms(t, e) {
  try {
    const n = await vs(t, e), s = {
      ...e,
      authToken: n
    };
    return await K(t.appConfig, s), n;
  } catch (n) {
    if (ut(n) && (n.customData.serverCode === 401 || n.customData.serverCode === 404))
      await _t(t.appConfig);
    else {
      const s = {
        ...e,
        authToken: {
          requestStatus: 0
          /* RequestStatus.NOT_STARTED */
        }
      };
      await K(t.appConfig, s);
    }
    throw n;
  }
}
function It(t) {
  return t !== void 0 && t.registrationStatus === 2;
}
function Ps(t) {
  return t.requestStatus === 2 && !Ls(t);
}
function Ls(t) {
  const e = Date.now();
  return e < t.creationTime || t.creationTime + t.expiresIn < e + cs;
}
function xs(t) {
  const e = {
    requestStatus: 1,
    requestTime: Date.now()
  };
  return {
    ...t,
    authToken: e
  };
}
function Bs(t) {
  return t.requestStatus === 1 && t.requestTime + ot < Date.now();
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
async function Us(t) {
  const e = t, { installationEntry: n, registrationPromise: s } = await Ie(e);
  return s ? s.catch(console.error) : Ee(e).catch(console.error), n.fid;
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
async function $s(t, e = !1) {
  const n = t;
  return await Fs(n), (await Ee(n, e)).token;
}
async function Fs(t) {
  const { registrationPromise: e } = await Ie(t);
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
function js(t) {
  if (!t || !t.options)
    throw ae("App Configuration");
  if (!t.name)
    throw ae("App Name");
  const e = [
    "projectId",
    "apiKey",
    "appId"
  ];
  for (const n of e)
    if (!t.options[n])
      throw ae(n);
  return {
    appName: t.name,
    projectId: t.options.projectId,
    apiKey: t.options.apiKey,
    appId: t.options.appId
  };
}
function ae(t) {
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
const Et = "installations", Ks = "installations-internal", Hs = (t) => {
  const e = t.getProvider("app").getImmediate(), n = js(e), s = ye(e, "heartbeat");
  return {
    app: e,
    appConfig: n,
    heartbeatServiceProvider: s,
    _delete: () => Promise.resolve()
  };
}, Ws = (t) => {
  const e = t.getProvider("app").getImmediate(), n = ye(e, Et).getImmediate();
  return {
    getId: () => Us(n),
    getToken: (r) => $s(n, r)
  };
};
function qs() {
  P(new D(
    Et,
    Hs,
    "PUBLIC"
    /* ComponentType.PUBLIC */
  )), P(new D(
    Ks,
    Ws,
    "PRIVATE"
    /* ComponentType.PRIVATE */
  ));
}
qs();
M(it, _e);
M(it, _e, "esm2020");
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
const Ct = "BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4", Vs = "https://fcmregistrations.googleapis.com/v1", Tt = "FCM_MSG", zs = "google.c.a.c_id", Gs = 3, Js = 1;
var H;
(function(t) {
  t[t.DATA_MESSAGE = 1] = "DATA_MESSAGE", t[t.DISPLAY_NOTIFICATION = 3] = "DISPLAY_NOTIFICATION";
})(H || (H = {}));
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
var W;
(function(t) {
  t.PUSH_RECEIVED = "push-received", t.NOTIFICATION_CLICKED = "notification-clicked";
})(W || (W = {}));
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
function Xs(t) {
  const e = "=".repeat((4 - t.length % 4) % 4), n = (t + e).replace(/\-/g, "+").replace(/_/g, "/"), s = atob(n), r = new Uint8Array(s.length);
  for (let a = 0; a < s.length; ++a)
    r[a] = s.charCodeAt(a);
  return r;
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
const ie = "fcm_token_details_db", Ys = 5, Ke = "fcm_token_object_Store";
async function Qs(t) {
  if ("databases" in indexedDB && !(await indexedDB.databases()).map((a) => a.name).includes(ie))
    return null;
  let e = null;
  return (await z(ie, Ys, {
    upgrade: async (s, r, a, i) => {
      if (r < 2 || !s.objectStoreNames.contains(Ke))
        return;
      const o = i.objectStore(Ke), l = await o.index("fcmSenderId").get(t);
      if (await o.clear(), !!l) {
        if (r === 2) {
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
        } else if (r === 3) {
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
        } else if (r === 4) {
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
  })).close(), await te(ie), await te("fcm_vapid_details_db"), await te("undefined"), Zs(e) ? e : null;
}
function Zs(t) {
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
const er = "firebase-messaging-database", tr = 1, N = "firebase-messaging-store";
let oe = null;
function Ce() {
  return oe || (oe = z(er, tr, {
    upgrade: (t, e) => {
      switch (e) {
        case 0:
          t.createObjectStore(N);
      }
    }
  })), oe;
}
async function Te(t) {
  const e = Ae(t), s = await (await Ce()).transaction(N).objectStore(N).get(e);
  if (s)
    return s;
  {
    const r = await Qs(t.appConfig.senderId);
    if (r)
      return await ke(t, r), r;
  }
}
async function ke(t, e) {
  const n = Ae(t), r = (await Ce()).transaction(N, "readwrite");
  return await r.objectStore(N).put(e, n), await r.done, e;
}
async function nr(t) {
  const e = Ae(t), s = (await Ce()).transaction(N, "readwrite");
  await s.objectStore(N).delete(e), await s.done;
}
function Ae({ appConfig: t }) {
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
const sr = {
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
}, g = new V("messaging", "Messaging", sr);
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
async function rr(t, e) {
  const n = await Re(t), s = At(e), r = {
    method: "POST",
    headers: n,
    body: JSON.stringify(s)
  };
  let a;
  try {
    a = await (await fetch(De(t.appConfig), r)).json();
  } catch (i) {
    throw g.create("token-subscribe-failed", {
      errorInfo: i == null ? void 0 : i.toString()
    });
  }
  if (a.error) {
    const i = a.error.message;
    throw g.create("token-subscribe-failed", {
      errorInfo: i
    });
  }
  if (!a.token)
    throw g.create(
      "token-subscribe-no-token"
      /* ErrorCode.TOKEN_SUBSCRIBE_NO_TOKEN */
    );
  return a.token;
}
async function ar(t, e) {
  const n = await Re(t), s = At(e.subscriptionOptions), r = {
    method: "PATCH",
    headers: n,
    body: JSON.stringify(s)
  };
  let a;
  try {
    a = await (await fetch(`${De(t.appConfig)}/${e.token}`, r)).json();
  } catch (i) {
    throw g.create("token-update-failed", {
      errorInfo: i == null ? void 0 : i.toString()
    });
  }
  if (a.error) {
    const i = a.error.message;
    throw g.create("token-update-failed", {
      errorInfo: i
    });
  }
  if (!a.token)
    throw g.create(
      "token-update-no-token"
      /* ErrorCode.TOKEN_UPDATE_NO_TOKEN */
    );
  return a.token;
}
async function kt(t, e) {
  const s = {
    method: "DELETE",
    headers: await Re(t)
  };
  try {
    const a = await (await fetch(`${De(t.appConfig)}/${e}`, s)).json();
    if (a.error) {
      const i = a.error.message;
      throw g.create("token-unsubscribe-failed", {
        errorInfo: i
      });
    }
  } catch (r) {
    throw g.create("token-unsubscribe-failed", {
      errorInfo: r == null ? void 0 : r.toString()
    });
  }
}
function De({ projectId: t }) {
  return `${Vs}/projects/${t}/registrations`;
}
async function Re({ appConfig: t, installations: e }) {
  const n = await e.getToken();
  return new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-goog-api-key": t.apiKey,
    "x-goog-firebase-installations-auth": `FIS ${n}`
  });
}
function At({ p256dh: t, auth: e, endpoint: n, vapidKey: s }) {
  const r = {
    web: {
      endpoint: n,
      auth: e,
      p256dh: t
    }
  };
  return s !== Ct && (r.web.applicationPubKey = s), r;
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
const ir = 7 * 24 * 60 * 60 * 1e3;
async function or(t) {
  const e = await lr(t.swRegistration, t.vapidKey), n = {
    vapidKey: t.vapidKey,
    swScope: t.swRegistration.scope,
    endpoint: e.endpoint,
    auth: b(e.getKey("auth")),
    p256dh: b(e.getKey("p256dh"))
  }, s = await Te(t.firebaseDependencies);
  if (s) {
    if (ur(s.subscriptionOptions, n))
      return Date.now() >= s.createTime + ir ? cr(t, {
        token: s.token,
        createTime: Date.now(),
        subscriptionOptions: n
      }) : s.token;
    try {
      await kt(t.firebaseDependencies, s.token);
    } catch (r) {
      console.warn(r);
    }
    return We(t.firebaseDependencies, n);
  } else return We(t.firebaseDependencies, n);
}
async function He(t) {
  const e = await Te(t.firebaseDependencies);
  e && (await kt(t.firebaseDependencies, e.token), await nr(t.firebaseDependencies));
  const n = await t.swRegistration.pushManager.getSubscription();
  return n ? n.unsubscribe() : !0;
}
async function cr(t, e) {
  try {
    const n = await ar(t.firebaseDependencies, e), s = {
      ...e,
      token: n,
      createTime: Date.now()
    };
    return await ke(t.firebaseDependencies, s), n;
  } catch (n) {
    throw n;
  }
}
async function We(t, e) {
  const s = {
    token: await rr(t, e),
    createTime: Date.now(),
    subscriptionOptions: e
  };
  return await ke(t, s), s.token;
}
async function lr(t, e) {
  const n = await t.pushManager.getSubscription();
  return n || t.pushManager.subscribe({
    userVisibleOnly: !0,
    // Chrome <= 75 doesn't support base64-encoded VAPID key. For backward compatibility, VAPID key
    // submitted to pushManager#subscribe must be of type Uint8Array.
    applicationServerKey: Xs(e)
  });
}
function ur(t, e) {
  const n = e.vapidKey === t.vapidKey, s = e.endpoint === t.endpoint, r = e.auth === t.auth, a = e.p256dh === t.p256dh;
  return n && s && r && a;
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
function hr(t) {
  const e = {
    from: t.from,
    // eslint-disable-next-line camelcase
    collapseKey: t.collapse_key,
    // eslint-disable-next-line camelcase
    messageId: t.fcmMessageId
  };
  return fr(e, t), dr(e, t), pr(e, t), e;
}
function fr(t, e) {
  if (!e.notification)
    return;
  t.notification = {};
  const n = e.notification.title;
  n && (t.notification.title = n);
  const s = e.notification.body;
  s && (t.notification.body = s);
  const r = e.notification.image;
  r && (t.notification.image = r);
  const a = e.notification.icon;
  a && (t.notification.icon = a);
}
function dr(t, e) {
  e.data && (t.data = e.data);
}
function pr(t, e) {
  var r, a, i, o;
  if (!e.fcmOptions && !((r = e.notification) != null && r.click_action))
    return;
  t.fcmOptions = {};
  const n = ((a = e.fcmOptions) == null ? void 0 : a.link) ?? ((i = e.notification) == null ? void 0 : i.click_action);
  n && (t.fcmOptions.link = n);
  const s = (o = e.fcmOptions) == null ? void 0 : o.analytics_label;
  s && (t.fcmOptions.analyticsLabel = s);
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
function gr(t) {
  return typeof t == "object" && !!t && zs in t;
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
function mr(t) {
  return new Promise((e) => {
    setTimeout(e, t);
  });
}
async function wr(t, e) {
  const n = br(e, await t.firebaseDependencies.installations.getId());
  yr(t, n, e.productId);
}
function br(t, e) {
  var s, r;
  const n = {};
  return t.from && (n.project_number = t.from), t.fcmMessageId && (n.message_id = t.fcmMessageId), n.instance_id = e, t.notification ? n.message_type = H.DISPLAY_NOTIFICATION.toString() : n.message_type = H.DATA_MESSAGE.toString(), n.sdk_platform = Gs.toString(), n.package_name = self.origin.replace(/(^\w+:|^)\/\//, ""), t.collapse_key && (n.collapse_key = t.collapse_key), n.event = Js.toString(), (s = t.fcmOptions) != null && s.analytics_label && (n.analytics_label = (r = t.fcmOptions) == null ? void 0 : r.analytics_label), n;
}
function yr(t, e, n) {
  const s = {};
  s.event_time_ms = Math.floor(Date.now()).toString(), s.source_extension_json_proto3 = JSON.stringify({
    messaging_client_event: e
  }), n && (s.compliance_data = _r(n)), t.logEvents.push(s);
}
function _r(t) {
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
async function Sr(t, e) {
  var r;
  const { newSubscription: n } = t;
  if (!n) {
    await He(e);
    return;
  }
  const s = await Te(e.firebaseDependencies);
  await He(e), e.vapidKey = ((r = s == null ? void 0 : s.subscriptionOptions) == null ? void 0 : r.vapidKey) ?? Ct, await or(e);
}
async function Ir(t, e) {
  const n = Tr(t);
  if (!n)
    return;
  e.deliveryMetricsExportedToBigQueryEnabled && await wr(e, n);
  const s = await Dt();
  if (Ar(s))
    return Dr(s, n);
  if (n.notification && await Rr(Cr(n)), !!e && e.onBackgroundMessageHandler) {
    const r = hr(n);
    typeof e.onBackgroundMessageHandler == "function" ? await e.onBackgroundMessageHandler(r) : e.onBackgroundMessageHandler.next(r);
  }
}
async function Er(t) {
  var i, o;
  const e = (o = (i = t.notification) == null ? void 0 : i.data) == null ? void 0 : o[Tt];
  if (e) {
    if (t.action)
      return;
  } else return;
  t.stopImmediatePropagation(), t.notification.close();
  const n = vr(e);
  if (!n)
    return;
  const s = new URL(n, self.location.href), r = new URL(self.location.origin);
  if (s.host !== r.host)
    return;
  let a = await kr(s);
  if (a ? a = await a.focus() : (a = await self.clients.openWindow(n), await mr(3e3)), !!a)
    return e.messageType = W.NOTIFICATION_CLICKED, e.isFirebaseMessaging = !0, a.postMessage(e);
}
function Cr(t) {
  const e = {
    ...t.notification
  };
  return e.data = {
    [Tt]: t
  }, e;
}
function Tr({ data: t }) {
  if (!t)
    return null;
  try {
    return t.json();
  } catch {
    return null;
  }
}
async function kr(t) {
  const e = await Dt();
  for (const n of e) {
    const s = new URL(n.url, self.location.href);
    if (t.host === s.host)
      return n;
  }
  return null;
}
function Ar(t) {
  return t.some((e) => e.visibilityState === "visible" && // Ignore chrome-extension clients as that matches the background pages of extensions, which
  // are always considered visible for some reason.
  !e.url.startsWith("chrome-extension://"));
}
function Dr(t, e) {
  e.isFirebaseMessaging = !0, e.messageType = W.PUSH_RECEIVED;
  for (const n of t)
    n.postMessage(e);
}
function Dt() {
  return self.clients.matchAll({
    type: "window",
    includeUncontrolled: !0
    // TS doesn't know that "type: 'window'" means it'll return WindowClient[]
  });
}
function Rr(t) {
  const { actions: e } = t, { maxActions: n } = Notification;
  return e && n && e.length > n && console.warn(`This browser only supports ${n} actions. The remaining actions will not be displayed.`), self.registration.showNotification(
    /* title= */
    t.title ?? "",
    t
  );
}
function vr(t) {
  var n, s;
  const e = ((n = t.fcmOptions) == null ? void 0 : n.link) ?? ((s = t.notification) == null ? void 0 : s.click_action);
  return e || (gr(t.data) ? self.location.origin : null);
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
function Nr(t) {
  if (!t || !t.options)
    throw ce("App Configuration Object");
  if (!t.name)
    throw ce("App Name");
  const e = [
    "projectId",
    "apiKey",
    "appId",
    "messagingSenderId"
  ], { options: n } = t;
  for (const s of e)
    if (!n[s])
      throw ce(s);
  return {
    appName: t.name,
    projectId: n.projectId,
    apiKey: n.apiKey,
    appId: n.appId,
    senderId: n.messagingSenderId
  };
}
function ce(t) {
  return g.create("missing-app-config-values", {
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
class Or {
  constructor(e, n, s) {
    this.deliveryMetricsExportedToBigQueryEnabled = !1, this.onBackgroundMessageHandler = null, this.onMessageHandler = null, this.logEvents = [], this.isLogServiceStarted = !1;
    const r = Nr(e);
    this.firebaseDependencies = {
      app: e,
      appConfig: r,
      installations: n,
      analyticsProvider: s
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
const Mr = (t) => {
  const e = new Or(t.getProvider("app").getImmediate(), t.getProvider("installations-internal").getImmediate(), t.getProvider("analytics-internal"));
  return self.addEventListener("push", (n) => {
    n.waitUntil(Ir(n, e));
  }), self.addEventListener("pushsubscriptionchange", (n) => {
    n.waitUntil(Sr(n, e));
  }), self.addEventListener("notificationclick", (n) => {
    n.waitUntil(Er(n));
  }), e;
};
function Pr() {
  P(new D(
    "messaging-sw",
    Mr,
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
async function Lr() {
  return Ze() && await et() && "PushManager" in self && "Notification" in self && ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification") && PushSubscription.prototype.hasOwnProperty("getKey");
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
function xr(t = Gn()) {
  return Lr().then((e) => {
    if (!e)
      throw g.create(
        "unsupported-browser"
        /* ErrorCode.UNSUPPORTED_BROWSER */
      );
  }, (e) => {
    throw g.create(
      "indexed-db-unsupported"
      /* ErrorCode.INDEXED_DB_UNSUPPORTED */
    );
  }), ye(Jt(t), "messaging-sw").getImmediate();
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
Pr();
try {
  self["workbox:core:7.2.0"] && _();
} catch {
}
const Br = (t, ...e) => {
  let n = t;
  return e.length > 0 && (n += ` :: ${JSON.stringify(e)}`), n;
}, Ur = Br;
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
    const s = Ur(e, n);
    super(s), this.name = e, this.details = n;
  }
}
const y = {
  googleAnalytics: "googleAnalytics",
  precache: "precache-v2",
  prefix: "workbox",
  runtime: "runtime",
  suffix: typeof registration < "u" ? registration.scope : ""
}, le = (t) => [y.prefix, t, y.suffix].filter((e) => e && e.length > 0).join("-"), $r = (t) => {
  for (const e of Object.keys(y))
    t(e);
}, ve = {
  updateDetails: (t) => {
    $r((e) => {
      typeof t[e] == "string" && (y[e] = t[e]);
    });
  },
  getGoogleAnalyticsName: (t) => t || le(y.googleAnalytics),
  getPrecacheName: (t) => t || le(y.precache),
  getPrefix: () => y.prefix,
  getRuntimeName: (t) => t || le(y.runtime),
  getSuffix: () => y.suffix
};
function qe(t, e) {
  const n = e();
  return t.waitUntil(n), n;
}
try {
  self["workbox:precaching:7.2.0"] && _();
} catch {
}
const Fr = "__WB_REVISION__";
function jr(t) {
  if (!t)
    throw new f("add-to-cache-list-unexpected-type", { entry: t });
  if (typeof t == "string") {
    const a = new URL(t, location.href);
    return {
      cacheKey: a.href,
      url: a.href
    };
  }
  const { revision: e, url: n } = t;
  if (!n)
    throw new f("add-to-cache-list-unexpected-type", { entry: t });
  if (!e) {
    const a = new URL(n, location.href);
    return {
      cacheKey: a.href,
      url: a.href
    };
  }
  const s = new URL(n, location.href), r = new URL(n, location.href);
  return s.searchParams.set(Fr, e), {
    cacheKey: s.href,
    url: r.href
  };
}
class Kr {
  constructor() {
    this.updatedURLs = [], this.notUpdatedURLs = [], this.handlerWillStart = async ({ request: e, state: n }) => {
      n && (n.originalRequest = e);
    }, this.cachedResponseWillBeUsed = async ({ event: e, state: n, cachedResponse: s }) => {
      if (e.type === "install" && n && n.originalRequest && n.originalRequest instanceof Request) {
        const r = n.originalRequest.url;
        s ? this.notUpdatedURLs.push(r) : this.updatedURLs.push(r);
      }
      return s;
    };
  }
}
class Hr {
  constructor({ precacheController: e }) {
    this.cacheKeyWillBeUsed = async ({ request: n, params: s }) => {
      const r = (s == null ? void 0 : s.cacheKey) || this._precacheController.getCacheKeyForURL(n.url);
      return r ? new Request(r, { headers: n.headers }) : n;
    }, this._precacheController = e;
  }
}
let x;
function Wr() {
  if (x === void 0) {
    const t = new Response("");
    if ("body" in t)
      try {
        new Response(t.body), x = !0;
      } catch {
        x = !1;
      }
    x = !1;
  }
  return x;
}
async function qr(t, e) {
  let n = null;
  if (t.url && (n = new URL(t.url).origin), n !== self.location.origin)
    throw new f("cross-origin-copy-response", { origin: n });
  const s = t.clone(), a = {
    headers: new Headers(s.headers),
    status: s.status,
    statusText: s.statusText
  }, i = Wr() ? s.body : await s.blob();
  return new Response(i, a);
}
const Vr = (t) => new URL(String(t), location.href).href.replace(new RegExp(`^${location.origin}`), "");
function Ve(t, e) {
  const n = new URL(t);
  for (const s of e)
    n.searchParams.delete(s);
  return n.href;
}
async function zr(t, e, n, s) {
  const r = Ve(e.url, n);
  if (e.url === r)
    return t.match(e, s);
  const a = Object.assign(Object.assign({}, s), { ignoreSearch: !0 }), i = await t.keys(e, a);
  for (const o of i) {
    const l = Ve(o.url, n);
    if (r === l)
      return t.match(o, s);
  }
}
class Gr {
  /**
   * Creates a promise and exposes its resolve and reject functions as methods.
   */
  constructor() {
    this.promise = new Promise((e, n) => {
      this.resolve = e, this.reject = n;
    });
  }
}
const Jr = /* @__PURE__ */ new Set();
async function Xr() {
  for (const t of Jr)
    await t();
}
function Yr(t) {
  return new Promise((e) => setTimeout(e, t));
}
try {
  self["workbox:strategies:7.2.0"] && _();
} catch {
}
function F(t) {
  return typeof t == "string" ? new Request(t) : t;
}
class Qr {
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
    this._cacheKeys = {}, Object.assign(this, n), this.event = n.event, this._strategy = e, this._handlerDeferred = new Gr(), this._extendLifetimePromises = [], this._plugins = [...e.plugins], this._pluginStateMap = /* @__PURE__ */ new Map();
    for (const s of this._plugins)
      this._pluginStateMap.set(s, {});
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
    let s = F(e);
    if (s.mode === "navigate" && n instanceof FetchEvent && n.preloadResponse) {
      const i = await n.preloadResponse;
      if (i)
        return i;
    }
    const r = this.hasCallback("fetchDidFail") ? s.clone() : null;
    try {
      for (const i of this.iterateCallbacks("requestWillFetch"))
        s = await i({ request: s.clone(), event: n });
    } catch (i) {
      if (i instanceof Error)
        throw new f("plugin-error-request-will-fetch", {
          thrownErrorMessage: i.message
        });
    }
    const a = s.clone();
    try {
      let i;
      i = await fetch(s, s.mode === "navigate" ? void 0 : this._strategy.fetchOptions);
      for (const o of this.iterateCallbacks("fetchDidSucceed"))
        i = await o({
          event: n,
          request: a,
          response: i
        });
      return i;
    } catch (i) {
      throw r && await this.runCallbacks("fetchDidFail", {
        error: i,
        event: n,
        originalRequest: r.clone(),
        request: a.clone()
      }), i;
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
    const n = await this.fetch(e), s = n.clone();
    return this.waitUntil(this.cachePut(e, s)), n;
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
    const n = F(e);
    let s;
    const { cacheName: r, matchOptions: a } = this._strategy, i = await this.getCacheKey(n, "read"), o = Object.assign(Object.assign({}, a), { cacheName: r });
    s = await caches.match(i, o);
    for (const l of this.iterateCallbacks("cachedResponseWillBeUsed"))
      s = await l({
        cacheName: r,
        matchOptions: a,
        cachedResponse: s,
        request: i,
        event: this.event
      }) || void 0;
    return s;
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
    const s = F(e);
    await Yr(0);
    const r = await this.getCacheKey(s, "write");
    if (!n)
      throw new f("cache-put-with-no-response", {
        url: Vr(r.url)
      });
    const a = await this._ensureResponseSafeToCache(n);
    if (!a)
      return !1;
    const { cacheName: i, matchOptions: o } = this._strategy, l = await self.caches.open(i), c = this.hasCallback("cacheDidUpdate"), d = c ? await zr(
      // TODO(philipwalton): the `__WB_REVISION__` param is a precaching
      // feature. Consider into ways to only add this behavior if using
      // precaching.
      l,
      r.clone(),
      ["__WB_REVISION__"],
      o
    ) : null;
    try {
      await l.put(r, c ? a.clone() : a);
    } catch (h) {
      if (h instanceof Error)
        throw h.name === "QuotaExceededError" && await Xr(), h;
    }
    for (const h of this.iterateCallbacks("cacheDidUpdate"))
      await h({
        cacheName: i,
        oldResponse: d,
        newResponse: a.clone(),
        request: r,
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
    const s = `${e.url} | ${n}`;
    if (!this._cacheKeys[s]) {
      let r = e;
      for (const a of this.iterateCallbacks("cacheKeyWillBeUsed"))
        r = F(await a({
          mode: n,
          request: r,
          event: this.event,
          // params has a type any can't change right now.
          params: this.params
          // eslint-disable-line
        }));
      this._cacheKeys[s] = r;
    }
    return this._cacheKeys[s];
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
    for (const s of this.iterateCallbacks(e))
      await s(n);
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
        const s = this._pluginStateMap.get(n);
        yield (a) => {
          const i = Object.assign(Object.assign({}, a), { state: s });
          return n[e](i);
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
    let n = e, s = !1;
    for (const r of this.iterateCallbacks("cacheWillUpdate"))
      if (n = await r({
        request: this.request,
        response: n,
        event: this.event
      }) || void 0, s = !0, !n)
        break;
    return s || n && n.status !== 200 && (n = void 0), n;
  }
}
class Zr {
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
    this.cacheName = ve.getRuntimeName(e.cacheName), this.plugins = e.plugins || [], this.fetchOptions = e.fetchOptions, this.matchOptions = e.matchOptions;
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
    const n = e.event, s = typeof e.request == "string" ? new Request(e.request) : e.request, r = "params" in e ? e.params : void 0, a = new Qr(this, { event: n, request: s, params: r }), i = this._getResponse(a, s, n), o = this._awaitComplete(i, a, s, n);
    return [i, o];
  }
  async _getResponse(e, n, s) {
    await e.runCallbacks("handlerWillStart", { event: s, request: n });
    let r;
    try {
      if (r = await this._handle(n, e), !r || r.type === "error")
        throw new f("no-response", { url: n.url });
    } catch (a) {
      if (a instanceof Error) {
        for (const i of e.iterateCallbacks("handlerDidError"))
          if (r = await i({ error: a, event: s, request: n }), r)
            break;
      }
      if (!r)
        throw a;
    }
    for (const a of e.iterateCallbacks("handlerWillRespond"))
      r = await a({ event: s, request: n, response: r });
    return r;
  }
  async _awaitComplete(e, n, s, r) {
    let a, i;
    try {
      a = await e;
    } catch {
    }
    try {
      await n.runCallbacks("handlerDidRespond", {
        event: r,
        request: s,
        response: a
      }), await n.doneWaiting();
    } catch (o) {
      o instanceof Error && (i = o);
    }
    if (await n.runCallbacks("handlerDidComplete", {
      event: r,
      request: s,
      response: a,
      error: i
    }), n.destroy(), i)
      throw i;
  }
}
class C extends Zr {
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
    e.cacheName = ve.getPrecacheName(e.cacheName), super(e), this._fallbackToNetwork = e.fallbackToNetwork !== !1, this.plugins.push(C.copyRedirectedCacheableResponsesPlugin);
  }
  /**
   * @private
   * @param {Request|string} request A request to run this strategy for.
   * @param {workbox-strategies.StrategyHandler} handler The event that
   *     triggered the request.
   * @return {Promise<Response>}
   */
  async _handle(e, n) {
    const s = await n.cacheMatch(e);
    return s || (n.event && n.event.type === "install" ? await this._handleInstall(e, n) : await this._handleFetch(e, n));
  }
  async _handleFetch(e, n) {
    let s;
    const r = n.params || {};
    if (this._fallbackToNetwork) {
      const a = r.integrity, i = e.integrity, o = !i || i === a;
      s = await n.fetch(new Request(e, {
        integrity: e.mode !== "no-cors" ? i || a : void 0
      })), a && o && e.mode !== "no-cors" && (this._useDefaultCacheabilityPluginIfNeeded(), await n.cachePut(e, s.clone()));
    } else
      throw new f("missing-precache-entry", {
        cacheName: this.cacheName,
        url: e.url
      });
    return s;
  }
  async _handleInstall(e, n) {
    this._useDefaultCacheabilityPluginIfNeeded();
    const s = await n.fetch(e);
    if (!await n.cachePut(e, s.clone()))
      throw new f("bad-precaching-response", {
        url: e.url,
        status: s.status
      });
    return s;
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
    for (const [s, r] of this.plugins.entries())
      r !== C.copyRedirectedCacheableResponsesPlugin && (r === C.defaultPrecacheCacheabilityPlugin && (e = s), r.cacheWillUpdate && n++);
    n === 0 ? this.plugins.push(C.defaultPrecacheCacheabilityPlugin) : n > 1 && e !== null && this.plugins.splice(e, 1);
  }
}
C.defaultPrecacheCacheabilityPlugin = {
  async cacheWillUpdate({ response: t }) {
    return !t || t.status >= 400 ? null : t;
  }
};
C.copyRedirectedCacheableResponsesPlugin = {
  async cacheWillUpdate({ response: t }) {
    return t.redirected ? await qr(t) : t;
  }
};
class ea {
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
  constructor({ cacheName: e, plugins: n = [], fallbackToNetwork: s = !0 } = {}) {
    this._urlsToCacheKeys = /* @__PURE__ */ new Map(), this._urlsToCacheModes = /* @__PURE__ */ new Map(), this._cacheKeysToIntegrities = /* @__PURE__ */ new Map(), this._strategy = new C({
      cacheName: ve.getPrecacheName(e),
      plugins: [
        ...n,
        new Hr({ precacheController: this })
      ],
      fallbackToNetwork: s
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
    for (const s of e) {
      typeof s == "string" ? n.push(s) : s && s.revision === void 0 && n.push(s.url);
      const { cacheKey: r, url: a } = jr(s), i = typeof s != "string" && s.revision ? "reload" : "default";
      if (this._urlsToCacheKeys.has(a) && this._urlsToCacheKeys.get(a) !== r)
        throw new f("add-to-cache-list-conflicting-entries", {
          firstEntry: this._urlsToCacheKeys.get(a),
          secondEntry: r
        });
      if (typeof s != "string" && s.integrity) {
        if (this._cacheKeysToIntegrities.has(r) && this._cacheKeysToIntegrities.get(r) !== s.integrity)
          throw new f("add-to-cache-list-conflicting-integrities", {
            url: a
          });
        this._cacheKeysToIntegrities.set(r, s.integrity);
      }
      if (this._urlsToCacheKeys.set(a, r), this._urlsToCacheModes.set(a, i), n.length > 0) {
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
    return qe(e, async () => {
      const n = new Kr();
      this.strategy.plugins.push(n);
      for (const [a, i] of this._urlsToCacheKeys) {
        const o = this._cacheKeysToIntegrities.get(i), l = this._urlsToCacheModes.get(a), c = new Request(a, {
          integrity: o,
          cache: l,
          credentials: "same-origin"
        });
        await Promise.all(this.strategy.handleAll({
          params: { cacheKey: i },
          request: c,
          event: e
        }));
      }
      const { updatedURLs: s, notUpdatedURLs: r } = n;
      return { updatedURLs: s, notUpdatedURLs: r };
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
    return qe(e, async () => {
      const n = await self.caches.open(this.strategy.cacheName), s = await n.keys(), r = new Set(this._urlsToCacheKeys.values()), a = [];
      for (const i of s)
        r.has(i.url) || (await n.delete(i), a.push(i.url));
      return { deletedURLs: a };
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
    const n = e instanceof Request ? e.url : e, s = this.getCacheKeyForURL(n);
    if (s)
      return (await self.caches.open(this.strategy.cacheName)).match(s);
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
    return (s) => (s.request = new Request(e), s.params = Object.assign({ cacheKey: n }, s.params), this.strategy.handle(s));
  }
}
let ue;
const Rt = () => (ue || (ue = new ea()), ue);
try {
  self["workbox:routing:7.2.0"] && _();
} catch {
}
const vt = "GET", q = (t) => t && typeof t == "object" ? t : { handle: t };
class U {
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
  constructor(e, n, s = vt) {
    this.handler = q(n), this.match = e, this.method = s;
  }
  /**
   *
   * @param {workbox-routing-handlerCallback} handler A callback
   * function that returns a Promise resolving to a Response
   */
  setCatchHandler(e) {
    this.catchHandler = q(e);
  }
}
class ta extends U {
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
  constructor(e, n, s) {
    const r = ({ url: a }) => {
      const i = e.exec(a.href);
      if (i && !(a.origin !== location.origin && i.index !== 0))
        return i.slice(1);
    };
    super(r, n, s);
  }
}
class na {
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
      const { request: n } = e, s = this.handleRequest({ request: n, event: e });
      s && e.respondWith(s);
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
        const { payload: n } = e.data, s = Promise.all(n.urlsToCache.map((r) => {
          typeof r == "string" && (r = [r]);
          const a = new Request(...r);
          return this.handleRequest({ request: a, event: e });
        }));
        e.waitUntil(s), e.ports && e.ports[0] && s.then(() => e.ports[0].postMessage(!0));
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
    const s = new URL(e.url, location.href);
    if (!s.protocol.startsWith("http"))
      return;
    const r = s.origin === location.origin, { params: a, route: i } = this.findMatchingRoute({
      event: n,
      request: e,
      sameOrigin: r,
      url: s
    });
    let o = i && i.handler;
    const l = e.method;
    if (!o && this._defaultHandlerMap.has(l) && (o = this._defaultHandlerMap.get(l)), !o)
      return;
    let c;
    try {
      c = o.handle({ url: s, request: e, event: n, params: a });
    } catch (h) {
      c = Promise.reject(h);
    }
    const d = i && i.catchHandler;
    return c instanceof Promise && (this._catchHandler || d) && (c = c.catch(async (h) => {
      if (d)
        try {
          return await d.handle({ url: s, request: e, event: n, params: a });
        } catch (w) {
          w instanceof Error && (h = w);
        }
      if (this._catchHandler)
        return this._catchHandler.handle({ url: s, request: e, event: n });
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
  findMatchingRoute({ url: e, sameOrigin: n, request: s, event: r }) {
    const a = this._routes.get(s.method) || [];
    for (const i of a) {
      let o;
      const l = i.match({ url: e, sameOrigin: n, request: s, event: r });
      if (l)
        return o = l, (Array.isArray(o) && o.length === 0 || l.constructor === Object && // eslint-disable-line
        Object.keys(l).length === 0 || typeof l == "boolean") && (o = void 0), { route: i, params: o };
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
  setDefaultHandler(e, n = vt) {
    this._defaultHandlerMap.set(n, q(e));
  }
  /**
   * If a Route throws an error while handling a request, this `handler`
   * will be called and given a chance to provide a response.
   *
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   */
  setCatchHandler(e) {
    this._catchHandler = q(e);
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
const sa = () => (B || (B = new na(), B.addFetchListener(), B.addCacheListener()), B);
function ra(t, e, n) {
  let s;
  if (typeof t == "string") {
    const a = new URL(t, location.href), i = ({ url: o }) => o.href === a.href;
    s = new U(i, e, n);
  } else if (t instanceof RegExp)
    s = new ta(t, e, n);
  else if (typeof t == "function")
    s = new U(t, e, n);
  else if (t instanceof U)
    s = t;
  else
    throw new f("unsupported-route-type", {
      moduleName: "workbox-routing",
      funcName: "registerRoute",
      paramName: "capture"
    });
  return sa().registerRoute(s), s;
}
function aa(t, e = []) {
  for (const n of [...t.searchParams.keys()])
    e.some((s) => s.test(n)) && t.searchParams.delete(n);
  return t;
}
function* ia(t, { ignoreURLParametersMatching: e = [/^utm_/, /^fbclid$/], directoryIndex: n = "index.html", cleanURLs: s = !0, urlManipulation: r } = {}) {
  const a = new URL(t, location.href);
  a.hash = "", yield a.href;
  const i = aa(a, e);
  if (yield i.href, n && i.pathname.endsWith("/")) {
    const o = new URL(i.href);
    o.pathname += n, yield o.href;
  }
  if (s) {
    const o = new URL(i.href);
    o.pathname += ".html", yield o.href;
  }
  if (r) {
    const o = r({ url: a });
    for (const l of o)
      yield l.href;
  }
}
class oa extends U {
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
    const s = ({ request: r }) => {
      const a = e.getURLsToCacheKeys();
      for (const i of ia(r.url, n)) {
        const o = a.get(i);
        if (o) {
          const l = e.getIntegrityForCacheKey(o);
          return { cacheKey: o, integrity: l };
        }
      }
    };
    super(s, e.strategy);
  }
}
function ca(t) {
  const e = Rt(), n = new oa(e, t);
  ra(n);
}
function la(t) {
  Rt().precache(t);
}
function ua(t, e) {
  la(t), ca(e);
}
ua([{"revision":null,"url":"assets/index-CRFQ_YKH.css"},{"revision":null,"url":"assets/index-DS9R39x5.js"},{"revision":null,"url":"assets/vendor_firebase-k7avh9Mj.js"},{"revision":null,"url":"assets/vendor-O8nsH46x.js"},{"revision":"f5b44fb3eef5170fd734ddda64a2a63b","url":"index.html"},{"revision":"d4bd41f8dd12f1517340d931428983fb","url":"registerSW.js"},{"revision":"04fb41277b2d80dfa79441653613f291","url":"favicon.ico"},{"revision":"cf5eaff918a960ce531aa06af4f66583","url":"icons/android-chrome-192x192.png"},{"revision":"b3a2b02ff54274e88cba679738ae3b04","url":"icons/android-chrome-512x512.png"},{"revision":"fe78c2de6cbe40fab54d42c53c641a48","url":"manifest.webmanifest"}] || []);
const Nt = {
  apiKey: "AIzaSyC-jTMiDjHNTC6cvSKUU44mVbWwT-ToLxQ",
  authDomain: "mister-x-d6b59.firebaseapp.com",
  databaseURL: "https://mister-x-d6b59-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mister-x-d6b59",
  storageBucket: "mister-x-d6b59.firebasestorage.app",
  messagingSenderId: "616391598963",
  appId: "1:616391598963:web:da07882b0f481d3000db06",
  measurementId: "G-W66SK677NG"
}, ha = st(Nt);
xr(ha);
Nt.databaseURL;
async function fa(t) {
  const e = await O("app-db", "ack-queue");
  await new Promise((n, s) => {
    const r = e.transaction("ack-queue", "readwrite"), a = r.objectStore("ack-queue"), i = Date.now() + Math.random();
    a.add({ key: i, entry: t, ts: Date.now() }, i), r.oncomplete = () => {
      e.close(), n();
    }, r.onerror = () => {
      e.close(), s(r.error);
    };
  });
}
async function X() {
  const t = await O("app-db", "ack-queue"), e = await new Promise((n, s) => {
    const i = t.transaction("ack-queue", "readonly").objectStore("ack-queue").getAll();
    i.onsuccess = () => n(i.result || []), i.onerror = () => s(i.error);
  });
  if (!e.length) {
    t.close();
    return;
  }
  for (const n of e)
    try {
      await Ot(n.entry), await new Promise((s, r) => {
        const a = t.transaction("ack-queue", "readwrite");
        a.objectStore("ack-queue").delete(n.key), a.oncomplete = () => s(), a.onerror = () => r(a.error);
      });
    } catch {
      break;
    }
  t.close();
}
async function Ot(t) {
  const e = new AbortController(), n = setTimeout(() => e.abort(), 15e3);
  try {
    const s = await fetch("https://axirbthvnznvhfagduyj.functions.supabase.co/rtdb-ack", {
      method: "POST",
      body: JSON.stringify(t),
      // mode: "no-cors", // entfernt!
      signal: e.signal,
      cache: "no-store",
      credentials: "omit"
    }), r = await s.text().catch(() => "");
    p("[SW] ACK fetch sent", { status: s.status, ok: s.ok, body: r.slice(0, 300) });
  } catch (s) {
    throw p("[SW] ACK fetch failed", s), s;
  } finally {
    clearTimeout(n);
  }
}
async function da(t) {
  try {
    const e = await O("app-db", "sw-logs"), n = e.transaction("sw-logs", "readwrite"), s = n.objectStore("sw-logs"), r = { msg: t, ts: Date.now() };
    let a = r.ts;
    try {
      s.add(r, a);
    } catch {
      a = r.ts + Math.random(), s.add(r, a);
    }
    n.oncomplete = () => e.close(), n.onerror = () => e.close();
  } catch {
  }
}
function p(...t) {
  const e = t.map((s) => s instanceof Error ? { name: s.name, message: s.message, stack: s.stack } : s && typeof s == "object" && ("name" in s || "message" in s) ? { name: s.name, message: s.message, code: s.code, stack: s.stack } : s);
  try {
    console.log("[SW]", ...e);
  } catch {
  }
  const n = e.map((s) => typeof s == "string" ? s : (() => {
    try {
      return JSON.stringify(s);
    } catch {
      return String(s);
    }
  })()).join(" ");
  da(n).catch(() => {
  });
}
self.addEventListener("message", (t) => {
  if (!t || !t.data) return;
  const e = async (n) => {
    if (t.ports && t.ports[0])
      try {
        t.ports[0].postMessage(n);
        return;
      } catch {
      }
    if (t.source && "postMessage" in t.source)
      try {
        t.source.postMessage(n);
        return;
      } catch {
      }
    (await self.clients.matchAll({ type: "window", includeUncontrolled: !0 })).forEach((r) => {
      try {
        r.postMessage(n);
      } catch {
      }
    });
  };
  t.data.type === "GET_SW_LOGS" && (async () => {
    try {
      const n = await O("app-db", "sw-logs"), a = n.transaction("sw-logs", "readonly").objectStore("sw-logs").getAll();
      a.onsuccess = async () => {
        const i = a.result || [];
        await e({ type: "SW_LOGS", logs: i }), n.close();
      }, a.onerror = () => {
        n.close();
      };
    } catch {
      await e({ type: "SW_LOGS", logs: [] });
    }
  })(), t.data.type === "CLEAR_SW_LOGS" && (async () => {
    try {
      const n = await O("app-db", "sw-logs"), s = n.transaction("sw-logs", "readwrite");
      s.objectStore("sw-logs").clear(), s.oncomplete = () => n.close(), s.onerror = () => n.close();
    } catch {
    }
  })(), t && t.data && t.data.type === "SKIP_WAITING" && self.skipWaiting(), t.data.type === "PING" && (async () => await e({ type: "PONG", ts: Date.now() }))();
});
function O(t, e) {
  return new Promise((n, s) => {
    const r = indexedDB.open(t);
    r.onupgradeneeded = () => {
      const a = r.result;
      a.objectStoreNames.contains(e) || a.createObjectStore(e);
    }, r.onsuccess = () => {
      const a = r.result;
      if (a.objectStoreNames.contains(e)) {
        n(a);
        return;
      }
      const i = a.version + 1;
      a.close();
      const o = indexedDB.open(t, i);
      o.onupgradeneeded = () => {
        const l = o.result;
        l.objectStoreNames.contains(e) || l.createObjectStore(e);
      }, o.onsuccess = () => n(o.result), o.onerror = () => s(o.error);
    }, r.onerror = () => s(r.error);
  });
}
function pa(t) {
  const e = t || "", n = /Safari/i.test(e) && !/(Chrome|CriOS|EdgiOS|FxiOS)/i.test(e), s = /iPhone|iPad|iPod/.test(e) || /Macintosh/.test(e) && /Mobile/.test(e);
  return n || s;
}
async function ze() {
  try {
    const t = await O("app-db", "settings");
    return await new Promise((e) => {
      const r = t.transaction("settings", "readonly").objectStore("settings").get("deviceName");
      r.onsuccess = () => {
        t.close(), e(r.result || null);
      }, r.onerror = () => {
        t.close(), e(null);
      };
    });
  } catch {
    return null;
  }
}
async function ga(t, e) {
  try {
    return !self.registration || typeof self.registration.getNotifications != "function" ? !1 : await Mt(t, e);
  } catch (n) {
    return p("[SW] getNotifications failed or unsupported:", n), !1;
  }
}
async function Mt(t, {
  tries: e = 10,
  // max. Versuche
  intervalMs: n = 100
  // Abstand zwischen Versuchen
} = {}) {
  for (let s = 0; s < e; s++) {
    const r = await self.registration.getNotifications({ tag: t });
    if (Array.isArray(r) && r.length > 0) return !0;
    await new Promise((a) => setTimeout(a, n));
  }
  return !1;
}
async function Ge(t, e) {
  const n = { messageId: t, deviceName: e, timestamp: Date.now() };
  p("[SW] ACK payload:", n);
  try {
    await Ot(n), p("[SW] ack ok");
  } catch (s) {
    p("[SW] ack failed, queuing:", s);
    try {
      if (await fa(n), self.registration.sync)
        try {
          await self.registration.sync.register("flush-acks");
        } catch {
        }
    } catch (r) {
      p("[SW] queueAck failed:", r);
    }
  }
}
self.addEventListener("activate", (t) => {
  t.waitUntil((async () => {
    p("[SW] activate - ready"), await self.clients.claim();
    try {
      await X();
    } catch {
    }
  })());
});
self.addEventListener("message", (t) => {
  var e;
  ((e = t.data) == null ? void 0 : e.type) === "SET_DEVICE_NAME" && t.data.value && saveDeviceName(t.data.value).catch(() => {
  });
});
self.addEventListener("push", (t) => {
  t.waitUntil((async () => {
    try {
      await X();
    } catch {
    }
    const e = t.data ? (() => {
      try {
        return t.data.json();
      } catch {
        return {};
      }
    })() : {}, n = e.notification ?? {}, s = e.data ?? e ?? {}, r = n.title ?? s.title ?? "Neue Nachricht", a = n.body ?? s.body ?? "", i = s.url ?? n.click_action ?? "/Mister-X/", o = s.messageId ?? s.id ?? n.tag ?? String(Date.now()), l = s.tag ?? "mrx", d = (await clients.matchAll({ type: "window", includeUncontrolled: !0 })).find((m) => m.visibilityState === "visible"), h = self.navigator && self.navigator.userAgent ? self.navigator.userAgent : "", w = pa(h);
    if (d) {
      try {
        d.postMessage({ type: "PUSH", payload: s });
      } catch {
      }
      try {
        await Ge(o, await ze());
      } catch (m) {
        p("[SW] markDelivered (fg) failed:", m);
      }
      if (w) {
        const m = `${l}-fg`, Pt = {
          body: a,
          icon: "/Mister-X/icons/android-chrome-192x192.png",
          badge: "/Mister-X/icons/Mister_X_Badge.png",
          tag: m,
          renotify: !0,
          silent: !0,
          requireInteraction: !1,
          timestamp: s.timestamp ?? Date.now(),
          data: { url: i, messageId: o, tag: m, fg: !0 }
        };
        await self.registration.showNotification(r, Pt), await Mt(m, { tries: 10, intervalMs: 50 }).catch(() => {
        }), await new Promise((Q) => setTimeout(Q, 900)), (await self.registration.getNotifications({ tag: m })).forEach((Q) => Q.close());
      }
      return;
    }
    const E = `${l}-${o}`, Y = {
      body: a,
      icon: "/Mister-X/icons/android-chrome-192x192.png",
      badge: "/Mister-X/icons/Mister_X_Badge.png",
      tag: E,
      renotify: !0,
      silent: s.silent !== void 0 ? !!s.silent : !1,
      requireInteraction: s.requireInteraction ?? !0,
      vibrate: s.vibrate ?? [200, 100, 200],
      timestamp: s.timestamp ?? Date.now(),
      data: { url: i, messageId: o, tag: E, fg: !1 }
    };
    await self.registration.showNotification(r, Y), ga(E, { tries: 10, intervalMs: 100 }).catch(() => {
    });
    try {
      await Ge(o, await ze());
    } catch (m) {
      p("[SW] markDelivered (bg) failed:", m);
    }
  })());
});
self.addEventListener("notificationclick", (t) => {
  t.notification.close(), t.waitUntil((async () => {
    try {
      await X();
    } catch {
    }
    const e = t.notification && t.notification.data && t.notification.data.url || "/Mister-X/", n = await clients.matchAll({ type: "window", includeUncontrolled: !0 });
    for (const s of n)
      if ("focus" in s && s.url.includes("/Mister-X/"))
        return s.focus();
    if (clients.openWindow) return clients.openWindow(e);
  })());
});
self.addEventListener("activate", (t) => {
  t.waitUntil(self.clients.claim());
});
self.addEventListener("sync", (t) => {
  t.tag === "flush-acks" && t.waitUntil(X());
});
async function ma(t, e) {
  const n = await O("app-db", "sw-flags");
  await new Promise((s, r) => {
    const a = n.transaction("sw-flags", "readwrite");
    a.objectStore("sw-flags").put(e, t), a.oncomplete = () => {
      n.close(), s();
    }, a.onerror = () => {
      n.close(), r(a.error);
    };
  });
}
self.addEventListener("pushsubscriptionchange", (t) => {
  t.waitUntil((async () => {
    try {
      const e = await self.registration.pushManager.subscribe(
        t.oldSubscription ? t.oldSubscription.options : {
          userVisibleOnly: !0
          /* + applicationServerKey */
        }
      );
      (await clients.matchAll({ type: "window", includeUncontrolled: !0 })).forEach((s) => {
        try {
          s.postMessage({ type: "PUSH_SUBSCRIPTION_CHANGED", payload: {
            /* optional: newSub */
          } });
        } catch {
        }
      });
      try {
        await ma("pushSubscriptionChangedAt", Date.now());
      } catch {
      }
    } catch (e) {
      p("[SW] re-subscribe failed:", e);
    }
  })());
});
