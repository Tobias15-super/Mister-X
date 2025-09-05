const Xr = () => {
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
const Ys = {
  /**
   * @define {boolean} Whether this is the Admin Node.js SDK.
   */
  NODE_ADMIN: !1,
  /**
   * Firebase SDK Version
   */
  SDK_VERSION: "${JSCORE_VERSION}"
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
const f = function(n, e) {
  if (!n)
    throw Re(e);
}, Re = function(n) {
  return new Error("Firebase Database (" + Ys.SDK_VERSION + ") INTERNAL ASSERT FAILED: " + n);
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
const Qs = function(n) {
  const e = [];
  let t = 0;
  for (let s = 0; s < n.length; s++) {
    let i = n.charCodeAt(s);
    i < 128 ? e[t++] = i : i < 2048 ? (e[t++] = i >> 6 | 192, e[t++] = i & 63 | 128) : (i & 64512) === 55296 && s + 1 < n.length && (n.charCodeAt(s + 1) & 64512) === 56320 ? (i = 65536 + ((i & 1023) << 10) + (n.charCodeAt(++s) & 1023), e[t++] = i >> 18 | 240, e[t++] = i >> 12 & 63 | 128, e[t++] = i >> 6 & 63 | 128, e[t++] = i & 63 | 128) : (e[t++] = i >> 12 | 224, e[t++] = i >> 6 & 63 | 128, e[t++] = i & 63 | 128);
  }
  return e;
}, Jr = function(n) {
  const e = [];
  let t = 0, s = 0;
  for (; t < n.length; ) {
    const i = n[t++];
    if (i < 128)
      e[s++] = String.fromCharCode(i);
    else if (i > 191 && i < 224) {
      const r = n[t++];
      e[s++] = String.fromCharCode((i & 31) << 6 | r & 63);
    } else if (i > 239 && i < 365) {
      const r = n[t++], o = n[t++], a = n[t++], c = ((i & 7) << 18 | (r & 63) << 12 | (o & 63) << 6 | a & 63) - 65536;
      e[s++] = String.fromCharCode(55296 + (c >> 10)), e[s++] = String.fromCharCode(56320 + (c & 1023));
    } else {
      const r = n[t++], o = n[t++];
      e[s++] = String.fromCharCode((i & 15) << 12 | (r & 63) << 6 | o & 63);
    }
  }
  return e.join("");
}, fn = {
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
  encodeByteArray(n, e) {
    if (!Array.isArray(n))
      throw Error("encodeByteArray takes an array as a parameter");
    this.init_();
    const t = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_, s = [];
    for (let i = 0; i < n.length; i += 3) {
      const r = n[i], o = i + 1 < n.length, a = o ? n[i + 1] : 0, c = i + 2 < n.length, l = c ? n[i + 2] : 0, u = r >> 2, h = (r & 3) << 4 | a >> 4;
      let d = (a & 15) << 2 | l >> 6, p = l & 63;
      c || (p = 64, o || (d = 64)), s.push(t[u], t[h], t[d], t[p]);
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
  encodeString(n, e) {
    return this.HAS_NATIVE_SUPPORT && !e ? btoa(n) : this.encodeByteArray(Qs(n), e);
  },
  /**
   * Base64-decode a string.
   *
   * @param input to decode.
   * @param webSafe True if we should use the
   *     alternative alphabet.
   * @return string representing the decoded value.
   */
  decodeString(n, e) {
    return this.HAS_NATIVE_SUPPORT && !e ? atob(n) : Jr(this.decodeStringToByteArray(n, e));
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
  decodeStringToByteArray(n, e) {
    this.init_();
    const t = e ? this.charToByteMapWebSafe_ : this.charToByteMap_, s = [];
    for (let i = 0; i < n.length; ) {
      const r = t[n.charAt(i++)], a = i < n.length ? t[n.charAt(i)] : 0;
      ++i;
      const l = i < n.length ? t[n.charAt(i)] : 64;
      ++i;
      const h = i < n.length ? t[n.charAt(i)] : 64;
      if (++i, r == null || a == null || l == null || h == null)
        throw new Zr();
      const d = r << 2 | a >> 4;
      if (s.push(d), l !== 64) {
        const p = a << 4 & 240 | l >> 2;
        if (s.push(p), h !== 64) {
          const g = l << 6 & 192 | h;
          s.push(g);
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
      for (let n = 0; n < this.ENCODED_VALS.length; n++)
        this.byteToCharMap_[n] = this.ENCODED_VALS.charAt(n), this.charToByteMap_[this.byteToCharMap_[n]] = n, this.byteToCharMapWebSafe_[n] = this.ENCODED_VALS_WEBSAFE.charAt(n), this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]] = n, n >= this.ENCODED_VALS_BASE.length && (this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)] = n, this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)] = n);
    }
  }
};
class Zr extends Error {
  constructor() {
    super(...arguments), this.name = "DecodeBase64StringError";
  }
}
const Xs = function(n) {
  const e = Qs(n);
  return fn.encodeByteArray(e, !0);
}, Js = function(n) {
  return Xs(n).replace(/\./g, "");
}, jt = function(n) {
  try {
    return fn.decodeString(n, !0);
  } catch (e) {
    console.error("base64Decode failed: ", e);
  }
  return null;
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
function eo(n) {
  return Zs(void 0, n);
}
function Zs(n, e) {
  if (!(e instanceof Object))
    return e;
  switch (e.constructor) {
    case Date:
      const t = e;
      return new Date(t.getTime());
    case Object:
      n === void 0 && (n = {});
      break;
    case Array:
      n = [];
      break;
    default:
      return e;
  }
  for (const t in e)
    !e.hasOwnProperty(t) || !to(t) || (n[t] = Zs(n[t], e[t]));
  return n;
}
function to(n) {
  return n !== "__proto__";
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
function no() {
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
const so = () => no().__FIREBASE_DEFAULTS__, io = () => {
  if (typeof process > "u" || typeof process.env > "u")
    return;
  const n = process.env.__FIREBASE_DEFAULTS__;
  if (n)
    return JSON.parse(n);
}, ro = () => {
  if (typeof document > "u")
    return;
  let n;
  try {
    n = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
  } catch {
    return;
  }
  const e = n && jt(n[1]);
  return e && JSON.parse(e);
}, oo = () => {
  try {
    return Xr() || so() || io() || ro();
  } catch (n) {
    console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);
    return;
  }
}, ei = () => {
  var n;
  return (n = oo()) == null ? void 0 : n.config;
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
let pn = class {
  constructor() {
    this.reject = () => {
    }, this.resolve = () => {
    }, this.promise = new Promise((e, t) => {
      this.resolve = e, this.reject = t;
    });
  }
  /**
   * Our API internals are not promisified and cannot because our callback APIs have subtle expectations around
   * invoking promises inline, which Promises are forbidden to do. This method accepts an optional node-style callback
   * and returns a node-style callback which will resolve or reject the Deferred's promise.
   */
  wrapCallback(e) {
    return (t, s) => {
      t ? this.reject(t) : this.resolve(s), typeof e == "function" && (this.promise.catch(() => {
      }), e.length === 1 ? e(t) : e(t, s));
    };
  }
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
function ao() {
  return typeof navigator < "u" && typeof navigator.userAgent == "string" ? navigator.userAgent : "";
}
function ti() {
  return typeof window < "u" && // @ts-ignore Setting up an broadly applicable index signature for Window
  // just to deal with this case would probably be a bad idea.
  !!(window.cordova || window.phonegap || window.PhoneGap) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ao());
}
function co() {
  return typeof navigator == "object" && navigator.product === "ReactNative";
}
function lo() {
  return Ys.NODE_ADMIN === !0;
}
function ni() {
  try {
    return typeof indexedDB == "object";
  } catch {
    return !1;
  }
}
function si() {
  return new Promise((n, e) => {
    try {
      let t = !0;
      const s = "validate-browser-context-for-indexeddb-analytics-module", i = self.indexedDB.open(s);
      i.onsuccess = () => {
        i.result.close(), t || self.indexedDB.deleteDatabase(s), n(!0);
      }, i.onupgradeneeded = () => {
        t = !1;
      }, i.onerror = () => {
        var r;
        e(((r = i.error) == null ? void 0 : r.message) || "");
      };
    } catch (t) {
      e(t);
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
const ho = "FirebaseError";
class Ne extends Error {
  constructor(e, t, s) {
    super(t), this.code = e, this.customData = s, this.name = ho, Object.setPrototypeOf(this, Ne.prototype), Error.captureStackTrace && Error.captureStackTrace(this, gt.prototype.create);
  }
}
class gt {
  constructor(e, t, s) {
    this.service = e, this.serviceName = t, this.errors = s;
  }
  create(e, ...t) {
    const s = t[0] || {}, i = `${this.service}/${e}`, r = this.errors[e], o = r ? uo(r, s) : "Error", a = `${this.serviceName}: ${o} (${i}).`;
    return new Ne(i, a, s);
  }
}
function uo(n, e) {
  return n.replace(fo, (t, s) => {
    const i = e[s];
    return i != null ? String(i) : `<${s}?>`;
  });
}
const fo = /\{\$([^}]+)}/g;
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
function $e(n) {
  return JSON.parse(n);
}
function k(n) {
  return JSON.stringify(n);
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
const ii = function(n) {
  let e = {}, t = {}, s = {}, i = "";
  try {
    const r = n.split(".");
    e = $e(jt(r[0]) || ""), t = $e(jt(r[1]) || ""), i = r[2], s = t.d || {}, delete t.d;
  } catch {
  }
  return {
    header: e,
    claims: t,
    data: s,
    signature: i
  };
}, po = function(n) {
  const e = ii(n), t = e.claims;
  return !!t && typeof t == "object" && t.hasOwnProperty("iat");
}, _o = function(n) {
  const e = ii(n).claims;
  return typeof e == "object" && e.admin === !0;
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
function J(n, e) {
  return Object.prototype.hasOwnProperty.call(n, e);
}
function Se(n, e) {
  if (Object.prototype.hasOwnProperty.call(n, e))
    return n[e];
}
function Yn(n) {
  for (const e in n)
    if (Object.prototype.hasOwnProperty.call(n, e))
      return !1;
  return !0;
}
function nt(n, e, t) {
  const s = {};
  for (const i in n)
    Object.prototype.hasOwnProperty.call(n, i) && (s[i] = e.call(t, n[i], i, n));
  return s;
}
function Gt(n, e) {
  if (n === e)
    return !0;
  const t = Object.keys(n), s = Object.keys(e);
  for (const i of t) {
    if (!s.includes(i))
      return !1;
    const r = n[i], o = e[i];
    if (Qn(r) && Qn(o)) {
      if (!Gt(r, o))
        return !1;
    } else if (r !== o)
      return !1;
  }
  for (const i of s)
    if (!t.includes(i))
      return !1;
  return !0;
}
function Qn(n) {
  return n !== null && typeof n == "object";
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
function go(n) {
  const e = [];
  for (const [t, s] of Object.entries(n))
    Array.isArray(s) ? s.forEach((i) => {
      e.push(encodeURIComponent(t) + "=" + encodeURIComponent(i));
    }) : e.push(encodeURIComponent(t) + "=" + encodeURIComponent(s));
  return e.length ? "&" + e.join("&") : "";
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
class mo {
  constructor() {
    this.chain_ = [], this.buf_ = [], this.W_ = [], this.pad_ = [], this.inbuf_ = 0, this.total_ = 0, this.blockSize = 512 / 8, this.pad_[0] = 128;
    for (let e = 1; e < this.blockSize; ++e)
      this.pad_[e] = 0;
    this.reset();
  }
  reset() {
    this.chain_[0] = 1732584193, this.chain_[1] = 4023233417, this.chain_[2] = 2562383102, this.chain_[3] = 271733878, this.chain_[4] = 3285377520, this.inbuf_ = 0, this.total_ = 0;
  }
  /**
   * Internal compress helper function.
   * @param buf Block to compress.
   * @param offset Offset of the block in the buffer.
   * @private
   */
  compress_(e, t) {
    t || (t = 0);
    const s = this.W_;
    if (typeof e == "string")
      for (let h = 0; h < 16; h++)
        s[h] = e.charCodeAt(t) << 24 | e.charCodeAt(t + 1) << 16 | e.charCodeAt(t + 2) << 8 | e.charCodeAt(t + 3), t += 4;
    else
      for (let h = 0; h < 16; h++)
        s[h] = e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3], t += 4;
    for (let h = 16; h < 80; h++) {
      const d = s[h - 3] ^ s[h - 8] ^ s[h - 14] ^ s[h - 16];
      s[h] = (d << 1 | d >>> 31) & 4294967295;
    }
    let i = this.chain_[0], r = this.chain_[1], o = this.chain_[2], a = this.chain_[3], c = this.chain_[4], l, u;
    for (let h = 0; h < 80; h++) {
      h < 40 ? h < 20 ? (l = a ^ r & (o ^ a), u = 1518500249) : (l = r ^ o ^ a, u = 1859775393) : h < 60 ? (l = r & o | a & (r | o), u = 2400959708) : (l = r ^ o ^ a, u = 3395469782);
      const d = (i << 5 | i >>> 27) + l + c + u + s[h] & 4294967295;
      c = a, a = o, o = (r << 30 | r >>> 2) & 4294967295, r = i, i = d;
    }
    this.chain_[0] = this.chain_[0] + i & 4294967295, this.chain_[1] = this.chain_[1] + r & 4294967295, this.chain_[2] = this.chain_[2] + o & 4294967295, this.chain_[3] = this.chain_[3] + a & 4294967295, this.chain_[4] = this.chain_[4] + c & 4294967295;
  }
  update(e, t) {
    if (e == null)
      return;
    t === void 0 && (t = e.length);
    const s = t - this.blockSize;
    let i = 0;
    const r = this.buf_;
    let o = this.inbuf_;
    for (; i < t; ) {
      if (o === 0)
        for (; i <= s; )
          this.compress_(e, i), i += this.blockSize;
      if (typeof e == "string") {
        for (; i < t; )
          if (r[o] = e.charCodeAt(i), ++o, ++i, o === this.blockSize) {
            this.compress_(r), o = 0;
            break;
          }
      } else
        for (; i < t; )
          if (r[o] = e[i], ++o, ++i, o === this.blockSize) {
            this.compress_(r), o = 0;
            break;
          }
    }
    this.inbuf_ = o, this.total_ += t;
  }
  /** @override */
  digest() {
    const e = [];
    let t = this.total_ * 8;
    this.inbuf_ < 56 ? this.update(this.pad_, 56 - this.inbuf_) : this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
    for (let i = this.blockSize - 1; i >= 56; i--)
      this.buf_[i] = t & 255, t /= 256;
    this.compress_(this.buf_);
    let s = 0;
    for (let i = 0; i < 5; i++)
      for (let r = 24; r >= 0; r -= 8)
        e[s] = this.chain_[i] >> r & 255, ++s;
    return e;
  }
}
function yo(n, e) {
  return `${n} failed: ${e} argument `;
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
const wo = function(n) {
  const e = [];
  let t = 0;
  for (let s = 0; s < n.length; s++) {
    let i = n.charCodeAt(s);
    if (i >= 55296 && i <= 56319) {
      const r = i - 55296;
      s++, f(s < n.length, "Surrogate pair missing trail surrogate.");
      const o = n.charCodeAt(s) - 56320;
      i = 65536 + (r << 10) + o;
    }
    i < 128 ? e[t++] = i : i < 2048 ? (e[t++] = i >> 6 | 192, e[t++] = i & 63 | 128) : i < 65536 ? (e[t++] = i >> 12 | 224, e[t++] = i >> 6 & 63 | 128, e[t++] = i & 63 | 128) : (e[t++] = i >> 18 | 240, e[t++] = i >> 12 & 63 | 128, e[t++] = i >> 6 & 63 | 128, e[t++] = i & 63 | 128);
  }
  return e;
}, mt = function(n) {
  let e = 0;
  for (let t = 0; t < n.length; t++) {
    const s = n.charCodeAt(t);
    s < 128 ? e++ : s < 2048 ? e += 2 : s >= 55296 && s <= 56319 ? (e += 4, t++) : e += 3;
  }
  return e;
};
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
function ri(n) {
  return n && n._delegate ? n._delegate : n;
}
class se {
  /**
   *
   * @param name The public service name, e.g. app, auth, firestore, database
   * @param instanceFactory Service factory responsible for creating the public interface
   * @param type whether the service provided by the component is public or private
   */
  constructor(e, t, s) {
    this.name = e, this.instanceFactory = t, this.type = s, this.multipleInstances = !1, this.serviceProps = {}, this.instantiationMode = "LAZY", this.onInstanceCreated = null;
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
const re = "[DEFAULT]";
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
class bo {
  constructor(e, t) {
    this.name = e, this.container = t, this.component = null, this.instances = /* @__PURE__ */ new Map(), this.instancesDeferred = /* @__PURE__ */ new Map(), this.instancesOptions = /* @__PURE__ */ new Map(), this.onInitCallbacks = /* @__PURE__ */ new Map();
  }
  /**
   * @param identifier A provider can provide multiple instances of a service
   * if this.component.multipleInstances is true.
   */
  get(e) {
    const t = this.normalizeInstanceIdentifier(e);
    if (!this.instancesDeferred.has(t)) {
      const s = new pn();
      if (this.instancesDeferred.set(t, s), this.isInitialized(t) || this.shouldAutoInitialize())
        try {
          const i = this.getOrInitializeService({
            instanceIdentifier: t
          });
          i && s.resolve(i);
        } catch {
        }
    }
    return this.instancesDeferred.get(t).promise;
  }
  getImmediate(e) {
    const t = this.normalizeInstanceIdentifier(e == null ? void 0 : e.identifier), s = (e == null ? void 0 : e.optional) ?? !1;
    if (this.isInitialized(t) || this.shouldAutoInitialize())
      try {
        return this.getOrInitializeService({
          instanceIdentifier: t
        });
      } catch (i) {
        if (s)
          return null;
        throw i;
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
      if (Eo(e))
        try {
          this.getOrInitializeService({ instanceIdentifier: re });
        } catch {
        }
      for (const [t, s] of this.instancesDeferred.entries()) {
        const i = this.normalizeInstanceIdentifier(t);
        try {
          const r = this.getOrInitializeService({
            instanceIdentifier: i
          });
          s.resolve(r);
        } catch {
        }
      }
    }
  }
  clearInstance(e = re) {
    this.instancesDeferred.delete(e), this.instancesOptions.delete(e), this.instances.delete(e);
  }
  // app.delete() will call this method on every provider to delete the services
  // TODO: should we mark the provider as deleted?
  async delete() {
    const e = Array.from(this.instances.values());
    await Promise.all([
      ...e.filter((t) => "INTERNAL" in t).map((t) => t.INTERNAL.delete()),
      ...e.filter((t) => "_delete" in t).map((t) => t._delete())
    ]);
  }
  isComponentSet() {
    return this.component != null;
  }
  isInitialized(e = re) {
    return this.instances.has(e);
  }
  getOptions(e = re) {
    return this.instancesOptions.get(e) || {};
  }
  initialize(e = {}) {
    const { options: t = {} } = e, s = this.normalizeInstanceIdentifier(e.instanceIdentifier);
    if (this.isInitialized(s))
      throw Error(`${this.name}(${s}) has already been initialized`);
    if (!this.isComponentSet())
      throw Error(`Component ${this.name} has not been registered yet`);
    const i = this.getOrInitializeService({
      instanceIdentifier: s,
      options: t
    });
    for (const [r, o] of this.instancesDeferred.entries()) {
      const a = this.normalizeInstanceIdentifier(r);
      s === a && o.resolve(i);
    }
    return i;
  }
  /**
   *
   * @param callback - a function that will be invoked  after the provider has been initialized by calling provider.initialize().
   * The function is invoked SYNCHRONOUSLY, so it should not execute any longrunning tasks in order to not block the program.
   *
   * @param identifier An optional instance identifier
   * @returns a function to unregister the callback
   */
  onInit(e, t) {
    const s = this.normalizeInstanceIdentifier(t), i = this.onInitCallbacks.get(s) ?? /* @__PURE__ */ new Set();
    i.add(e), this.onInitCallbacks.set(s, i);
    const r = this.instances.get(s);
    return r && e(r, s), () => {
      i.delete(e);
    };
  }
  /**
   * Invoke onInit callbacks synchronously
   * @param instance the service instance`
   */
  invokeOnInitCallbacks(e, t) {
    const s = this.onInitCallbacks.get(t);
    if (s)
      for (const i of s)
        try {
          i(e, t);
        } catch {
        }
  }
  getOrInitializeService({ instanceIdentifier: e, options: t = {} }) {
    let s = this.instances.get(e);
    if (!s && this.component && (s = this.component.instanceFactory(this.container, {
      instanceIdentifier: Co(e),
      options: t
    }), this.instances.set(e, s), this.instancesOptions.set(e, t), this.invokeOnInitCallbacks(s, e), this.component.onInstanceCreated))
      try {
        this.component.onInstanceCreated(this.container, e, s);
      } catch {
      }
    return s || null;
  }
  normalizeInstanceIdentifier(e = re) {
    return this.component ? this.component.multipleInstances ? e : re : e;
  }
  shouldAutoInitialize() {
    return !!this.component && this.component.instantiationMode !== "EXPLICIT";
  }
}
function Co(n) {
  return n === re ? void 0 : n;
}
function Eo(n) {
  return n.instantiationMode === "EAGER";
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
class vo {
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
    const t = this.getProvider(e.name);
    if (t.isComponentSet())
      throw new Error(`Component ${e.name} has already been registered with ${this.name}`);
    t.setComponent(e);
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
    const t = new bo(e, this);
    return this.providers.set(e, t), t;
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
var v;
(function(n) {
  n[n.DEBUG = 0] = "DEBUG", n[n.VERBOSE = 1] = "VERBOSE", n[n.INFO = 2] = "INFO", n[n.WARN = 3] = "WARN", n[n.ERROR = 4] = "ERROR", n[n.SILENT = 5] = "SILENT";
})(v || (v = {}));
const So = {
  debug: v.DEBUG,
  verbose: v.VERBOSE,
  info: v.INFO,
  warn: v.WARN,
  error: v.ERROR,
  silent: v.SILENT
}, Io = v.INFO, To = {
  [v.DEBUG]: "log",
  [v.VERBOSE]: "log",
  [v.INFO]: "info",
  [v.WARN]: "warn",
  [v.ERROR]: "error"
}, Ro = (n, e, ...t) => {
  if (e < n.logLevel)
    return;
  const s = (/* @__PURE__ */ new Date()).toISOString(), i = To[e];
  if (i)
    console[i](`[${s}]  ${n.name}:`, ...t);
  else
    throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`);
};
class oi {
  /**
   * Gives you an instance of a Logger to capture messages according to
   * Firebase's logging scheme.
   *
   * @param name The name that the logs will be associated with
   */
  constructor(e) {
    this.name = e, this._logLevel = Io, this._logHandler = Ro, this._userLogHandler = null;
  }
  get logLevel() {
    return this._logLevel;
  }
  set logLevel(e) {
    if (!(e in v))
      throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
    this._logLevel = e;
  }
  // Workaround for setter/getter having to be the same type.
  setLogLevel(e) {
    this._logLevel = typeof e == "string" ? So[e] : e;
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
    this._userLogHandler && this._userLogHandler(this, v.DEBUG, ...e), this._logHandler(this, v.DEBUG, ...e);
  }
  log(...e) {
    this._userLogHandler && this._userLogHandler(this, v.VERBOSE, ...e), this._logHandler(this, v.VERBOSE, ...e);
  }
  info(...e) {
    this._userLogHandler && this._userLogHandler(this, v.INFO, ...e), this._logHandler(this, v.INFO, ...e);
  }
  warn(...e) {
    this._userLogHandler && this._userLogHandler(this, v.WARN, ...e), this._logHandler(this, v.WARN, ...e);
  }
  error(...e) {
    this._userLogHandler && this._userLogHandler(this, v.ERROR, ...e), this._logHandler(this, v.ERROR, ...e);
  }
}
const No = (n, e) => e.some((t) => n instanceof t);
let Xn, Jn;
function Ao() {
  return Xn || (Xn = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function ko() {
  return Jn || (Jn = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
const ai = /* @__PURE__ */ new WeakMap(), zt = /* @__PURE__ */ new WeakMap(), ci = /* @__PURE__ */ new WeakMap(), Rt = /* @__PURE__ */ new WeakMap(), _n = /* @__PURE__ */ new WeakMap();
function Do(n) {
  const e = new Promise((t, s) => {
    const i = () => {
      n.removeEventListener("success", r), n.removeEventListener("error", o);
    }, r = () => {
      t(Y(n.result)), i();
    }, o = () => {
      s(n.error), i();
    };
    n.addEventListener("success", r), n.addEventListener("error", o);
  });
  return e.then((t) => {
    t instanceof IDBCursor && ai.set(t, n);
  }).catch(() => {
  }), _n.set(e, n), e;
}
function Oo(n) {
  if (zt.has(n))
    return;
  const e = new Promise((t, s) => {
    const i = () => {
      n.removeEventListener("complete", r), n.removeEventListener("error", o), n.removeEventListener("abort", o);
    }, r = () => {
      t(), i();
    }, o = () => {
      s(n.error || new DOMException("AbortError", "AbortError")), i();
    };
    n.addEventListener("complete", r), n.addEventListener("error", o), n.addEventListener("abort", o);
  });
  zt.set(n, e);
}
let Yt = {
  get(n, e, t) {
    if (n instanceof IDBTransaction) {
      if (e === "done")
        return zt.get(n);
      if (e === "objectStoreNames")
        return n.objectStoreNames || ci.get(n);
      if (e === "store")
        return t.objectStoreNames[1] ? void 0 : t.objectStore(t.objectStoreNames[0]);
    }
    return Y(n[e]);
  },
  set(n, e, t) {
    return n[e] = t, !0;
  },
  has(n, e) {
    return n instanceof IDBTransaction && (e === "done" || e === "store") ? !0 : e in n;
  }
};
function Mo(n) {
  Yt = n(Yt);
}
function xo(n) {
  return n === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype) ? function(e, ...t) {
    const s = n.call(Nt(this), e, ...t);
    return ci.set(s, e.sort ? e.sort() : [e]), Y(s);
  } : ko().includes(n) ? function(...e) {
    return n.apply(Nt(this), e), Y(ai.get(this));
  } : function(...e) {
    return Y(n.apply(Nt(this), e));
  };
}
function Po(n) {
  return typeof n == "function" ? xo(n) : (n instanceof IDBTransaction && Oo(n), No(n, Ao()) ? new Proxy(n, Yt) : n);
}
function Y(n) {
  if (n instanceof IDBRequest)
    return Do(n);
  if (Rt.has(n))
    return Rt.get(n);
  const e = Po(n);
  return e !== n && (Rt.set(n, e), _n.set(e, n)), e;
}
const Nt = (n) => _n.get(n);
function yt(n, e, { blocked: t, upgrade: s, blocking: i, terminated: r } = {}) {
  const o = indexedDB.open(n, e), a = Y(o);
  return s && o.addEventListener("upgradeneeded", (c) => {
    s(Y(o.result), c.oldVersion, c.newVersion, Y(o.transaction), c);
  }), t && o.addEventListener("blocked", (c) => t(
    // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
    c.oldVersion,
    c.newVersion,
    c
  )), a.then((c) => {
    r && c.addEventListener("close", () => r()), i && c.addEventListener("versionchange", (l) => i(l.oldVersion, l.newVersion, l));
  }).catch(() => {
  }), a;
}
function At(n, { blocked: e } = {}) {
  const t = indexedDB.deleteDatabase(n);
  return e && t.addEventListener("blocked", (s) => e(
    // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
    s.oldVersion,
    s
  )), Y(t).then(() => {
  });
}
const Lo = ["get", "getKey", "getAll", "getAllKeys", "count"], Fo = ["put", "add", "delete", "clear"], kt = /* @__PURE__ */ new Map();
function Zn(n, e) {
  if (!(n instanceof IDBDatabase && !(e in n) && typeof e == "string"))
    return;
  if (kt.get(e))
    return kt.get(e);
  const t = e.replace(/FromIndex$/, ""), s = e !== t, i = Fo.includes(t);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(t in (s ? IDBIndex : IDBObjectStore).prototype) || !(i || Lo.includes(t))
  )
    return;
  const r = async function(o, ...a) {
    const c = this.transaction(o, i ? "readwrite" : "readonly");
    let l = c.store;
    return s && (l = l.index(a.shift())), (await Promise.all([
      l[t](...a),
      i && c.done
    ]))[0];
  };
  return kt.set(e, r), r;
}
Mo((n) => ({
  ...n,
  get: (e, t, s) => Zn(e, t) || n.get(e, t, s),
  has: (e, t) => !!Zn(e, t) || n.has(e, t)
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
class Uo {
  constructor(e) {
    this.container = e;
  }
  // In initial implementation, this will be called by installations on
  // auth token refresh, and installations will send this string.
  getPlatformInfoString() {
    return this.container.getProviders().map((t) => {
      if (Bo(t)) {
        const s = t.getImmediate();
        return `${s.library}/${s.version}`;
      } else
        return null;
    }).filter((t) => t).join(" ");
  }
}
function Bo(n) {
  const e = n.getComponent();
  return (e == null ? void 0 : e.type) === "VERSION";
}
const Qt = "@firebase/app", es = "0.14.1";
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
const X = new oi("@firebase/app"), Wo = "@firebase/app-compat", Ho = "@firebase/analytics-compat", Ko = "@firebase/analytics", $o = "@firebase/app-check-compat", Vo = "@firebase/app-check", qo = "@firebase/auth", jo = "@firebase/auth-compat", Go = "@firebase/database", zo = "@firebase/data-connect", Yo = "@firebase/database-compat", Qo = "@firebase/functions", Xo = "@firebase/functions-compat", Jo = "@firebase/installations", Zo = "@firebase/installations-compat", ea = "@firebase/messaging", ta = "@firebase/messaging-compat", na = "@firebase/performance", sa = "@firebase/performance-compat", ia = "@firebase/remote-config", ra = "@firebase/remote-config-compat", oa = "@firebase/storage", aa = "@firebase/storage-compat", ca = "@firebase/firestore", la = "@firebase/ai", ha = "@firebase/firestore-compat", ua = "firebase", da = "12.1.0";
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
const Xt = "[DEFAULT]", fa = {
  [Qt]: "fire-core",
  [Wo]: "fire-core-compat",
  [Ko]: "fire-analytics",
  [Ho]: "fire-analytics-compat",
  [Vo]: "fire-app-check",
  [$o]: "fire-app-check-compat",
  [qo]: "fire-auth",
  [jo]: "fire-auth-compat",
  [Go]: "fire-rtdb",
  [zo]: "fire-data-connect",
  [Yo]: "fire-rtdb-compat",
  [Qo]: "fire-fn",
  [Xo]: "fire-fn-compat",
  [Jo]: "fire-iid",
  [Zo]: "fire-iid-compat",
  [ea]: "fire-fcm",
  [ta]: "fire-fcm-compat",
  [na]: "fire-perf",
  [sa]: "fire-perf-compat",
  [ia]: "fire-rc",
  [ra]: "fire-rc-compat",
  [oa]: "fire-gcs",
  [aa]: "fire-gcs-compat",
  [ca]: "fire-fst",
  [ha]: "fire-fst-compat",
  [la]: "fire-vertex",
  "fire-js": "fire-js",
  // Platform identifier for JS SDK.
  [ua]: "fire-js-all"
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
const st = /* @__PURE__ */ new Map(), pa = /* @__PURE__ */ new Map(), Jt = /* @__PURE__ */ new Map();
function ts(n, e) {
  try {
    n.container.addComponent(e);
  } catch (t) {
    X.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`, t);
  }
}
function le(n) {
  const e = n.name;
  if (Jt.has(e))
    return X.debug(`There were multiple attempts to register component ${e}.`), !1;
  Jt.set(e, n);
  for (const t of st.values())
    ts(t, n);
  for (const t of pa.values())
    ts(t, n);
  return !0;
}
function gn(n, e) {
  const t = n.container.getProvider("heartbeat").getImmediate({ optional: !0 });
  return t && t.triggerHeartbeat(), n.container.getProvider(e);
}
function _a(n) {
  return n == null ? !1 : n.settings !== void 0;
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
const ga = {
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
}, ee = new gt("app", "Firebase", ga);
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
class ma {
  constructor(e, t, s) {
    this._isDeleted = !1, this._options = { ...e }, this._config = { ...t }, this._name = t.name, this._automaticDataCollectionEnabled = t.automaticDataCollectionEnabled, this._container = s, this.container.addComponent(new se(
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
      throw ee.create("app-deleted", { appName: this._name });
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
const ya = da;
function li(n, e = {}) {
  let t = n;
  typeof e != "object" && (e = { name: e });
  const s = {
    name: Xt,
    automaticDataCollectionEnabled: !0,
    ...e
  }, i = s.name;
  if (typeof i != "string" || !i)
    throw ee.create("bad-app-name", {
      appName: String(i)
    });
  if (t || (t = ei()), !t)
    throw ee.create(
      "no-options"
      /* AppError.NO_OPTIONS */
    );
  const r = st.get(i);
  if (r) {
    if (Gt(t, r.options) && Gt(s, r.config))
      return r;
    throw ee.create("duplicate-app", { appName: i });
  }
  const o = new vo(i);
  for (const c of Jt.values())
    o.addComponent(c);
  const a = new ma(t, s, o);
  return st.set(i, a), a;
}
function wa(n = Xt) {
  const e = st.get(n);
  if (!e && n === Xt && ei())
    return li();
  if (!e)
    throw ee.create("no-app", { appName: n });
  return e;
}
function te(n, e, t) {
  let s = fa[n] ?? n;
  t && (s += `-${t}`);
  const i = s.match(/\s|\//), r = e.match(/\s|\//);
  if (i || r) {
    const o = [
      `Unable to register library "${s}" with version "${e}":`
    ];
    i && o.push(`library name "${s}" contains illegal characters (whitespace or "/")`), i && r && o.push("and"), r && o.push(`version name "${e}" contains illegal characters (whitespace or "/")`), X.warn(o.join(" "));
    return;
  }
  le(new se(
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
const ba = "firebase-heartbeat-database", Ca = 1, Ve = "firebase-heartbeat-store";
let Dt = null;
function hi() {
  return Dt || (Dt = yt(ba, Ca, {
    upgrade: (n, e) => {
      switch (e) {
        case 0:
          try {
            n.createObjectStore(Ve);
          } catch (t) {
            console.warn(t);
          }
      }
    }
  }).catch((n) => {
    throw ee.create("idb-open", {
      originalErrorMessage: n.message
    });
  })), Dt;
}
async function Ea(n) {
  try {
    const t = (await hi()).transaction(Ve), s = await t.objectStore(Ve).get(ui(n));
    return await t.done, s;
  } catch (e) {
    if (e instanceof Ne)
      X.warn(e.message);
    else {
      const t = ee.create("idb-get", {
        originalErrorMessage: e == null ? void 0 : e.message
      });
      X.warn(t.message);
    }
  }
}
async function ns(n, e) {
  try {
    const s = (await hi()).transaction(Ve, "readwrite");
    await s.objectStore(Ve).put(e, ui(n)), await s.done;
  } catch (t) {
    if (t instanceof Ne)
      X.warn(t.message);
    else {
      const s = ee.create("idb-set", {
        originalErrorMessage: t == null ? void 0 : t.message
      });
      X.warn(s.message);
    }
  }
}
function ui(n) {
  return `${n.name}!${n.options.appId}`;
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
const va = 1024, Sa = 30;
class Ia {
  constructor(e) {
    this.container = e, this._heartbeatsCache = null;
    const t = this.container.getProvider("app").getImmediate();
    this._storage = new Ra(t), this._heartbeatsCachePromise = this._storage.read().then((s) => (this._heartbeatsCache = s, s));
  }
  /**
   * Called to report a heartbeat. The function will generate
   * a HeartbeatsByUserAgent object, update heartbeatsCache, and persist it
   * to IndexedDB.
   * Note that we only store one heartbeat per day. So if a heartbeat for today is
   * already logged, subsequent calls to this function in the same day will be ignored.
   */
  async triggerHeartbeat() {
    var e, t;
    try {
      const i = this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(), r = ss();
      if (((e = this._heartbeatsCache) == null ? void 0 : e.heartbeats) == null && (this._heartbeatsCache = await this._heartbeatsCachePromise, ((t = this._heartbeatsCache) == null ? void 0 : t.heartbeats) == null) || this._heartbeatsCache.lastSentHeartbeatDate === r || this._heartbeatsCache.heartbeats.some((o) => o.date === r))
        return;
      if (this._heartbeatsCache.heartbeats.push({ date: r, agent: i }), this._heartbeatsCache.heartbeats.length > Sa) {
        const o = Na(this._heartbeatsCache.heartbeats);
        this._heartbeatsCache.heartbeats.splice(o, 1);
      }
      return this._storage.overwrite(this._heartbeatsCache);
    } catch (s) {
      X.warn(s);
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
      const t = ss(), { heartbeatsToSend: s, unsentEntries: i } = Ta(this._heartbeatsCache.heartbeats), r = Js(JSON.stringify({ version: 2, heartbeats: s }));
      return this._heartbeatsCache.lastSentHeartbeatDate = t, i.length > 0 ? (this._heartbeatsCache.heartbeats = i, await this._storage.overwrite(this._heartbeatsCache)) : (this._heartbeatsCache.heartbeats = [], this._storage.overwrite(this._heartbeatsCache)), r;
    } catch (t) {
      return X.warn(t), "";
    }
  }
}
function ss() {
  return (/* @__PURE__ */ new Date()).toISOString().substring(0, 10);
}
function Ta(n, e = va) {
  const t = [];
  let s = n.slice();
  for (const i of n) {
    const r = t.find((o) => o.agent === i.agent);
    if (r) {
      if (r.dates.push(i.date), is(t) > e) {
        r.dates.pop();
        break;
      }
    } else if (t.push({
      agent: i.agent,
      dates: [i.date]
    }), is(t) > e) {
      t.pop();
      break;
    }
    s = s.slice(1);
  }
  return {
    heartbeatsToSend: t,
    unsentEntries: s
  };
}
class Ra {
  constructor(e) {
    this.app = e, this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck();
  }
  async runIndexedDBEnvironmentCheck() {
    return ni() ? si().then(() => !0).catch(() => !1) : !1;
  }
  /**
   * Read all heartbeats.
   */
  async read() {
    if (await this._canUseIndexedDBPromise) {
      const t = await Ea(this.app);
      return t != null && t.heartbeats ? t : { heartbeats: [] };
    } else
      return { heartbeats: [] };
  }
  // overwrite the storage with the provided heartbeats
  async overwrite(e) {
    if (await this._canUseIndexedDBPromise) {
      const s = await this.read();
      return ns(this.app, {
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
      return ns(this.app, {
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
function is(n) {
  return Js(
    // heartbeatsCache wrapper properties
    JSON.stringify({ version: 2, heartbeats: n })
  ).length;
}
function Na(n) {
  if (n.length === 0)
    return -1;
  let e = 0, t = n[0].date;
  for (let s = 1; s < n.length; s++)
    n[s].date < t && (t = n[s].date, e = s);
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
function Aa(n) {
  le(new se(
    "platform-logger",
    (e) => new Uo(e),
    "PRIVATE"
    /* ComponentType.PRIVATE */
  )), le(new se(
    "heartbeat",
    (e) => new Ia(e),
    "PRIVATE"
    /* ComponentType.PRIVATE */
  )), te(Qt, es, n), te(Qt, es, "esm2020"), te("fire-js", "");
}
Aa("");
var ka = "firebase", Da = "12.1.0";
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
te(ka, Da, "app");
const di = "@firebase/installations", mn = "0.6.19";
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
const fi = 1e4, pi = `w:${mn}`, _i = "FIS_v2", Oa = "https://firebaseinstallations.googleapis.com/v1", Ma = 60 * 60 * 1e3, xa = "installations", Pa = "Installations";
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
const La = {
  "missing-app-config-values": 'Missing App configuration value: "{$valueName}"',
  "not-registered": "Firebase Installation is not registered.",
  "installation-not-found": "Firebase Installation not found.",
  "request-failed": '{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',
  "app-offline": "Could not process request. Application offline.",
  "delete-pending-registration": "Can't delete installation while there is a pending registration request."
}, he = new gt(xa, Pa, La);
function gi(n) {
  return n instanceof Ne && n.code.includes(
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
function mi({ projectId: n }) {
  return `${Oa}/projects/${n}/installations`;
}
function yi(n) {
  return {
    token: n.token,
    requestStatus: 2,
    expiresIn: Ua(n.expiresIn),
    creationTime: Date.now()
  };
}
async function wi(n, e) {
  const s = (await e.json()).error;
  return he.create("request-failed", {
    requestName: n,
    serverCode: s.code,
    serverMessage: s.message,
    serverStatus: s.status
  });
}
function bi({ apiKey: n }) {
  return new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-goog-api-key": n
  });
}
function Fa(n, { refreshToken: e }) {
  const t = bi(n);
  return t.append("Authorization", Ba(e)), t;
}
async function Ci(n) {
  const e = await n();
  return e.status >= 500 && e.status < 600 ? n() : e;
}
function Ua(n) {
  return Number(n.replace("s", "000"));
}
function Ba(n) {
  return `${_i} ${n}`;
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
async function Wa({ appConfig: n, heartbeatServiceProvider: e }, { fid: t }) {
  const s = mi(n), i = bi(n), r = e.getImmediate({
    optional: !0
  });
  if (r) {
    const l = await r.getHeartbeatsHeader();
    l && i.append("x-firebase-client", l);
  }
  const o = {
    fid: t,
    authVersion: _i,
    appId: n.appId,
    sdkVersion: pi
  }, a = {
    method: "POST",
    headers: i,
    body: JSON.stringify(o)
  }, c = await Ci(() => fetch(s, a));
  if (c.ok) {
    const l = await c.json();
    return {
      fid: l.fid || t,
      registrationStatus: 2,
      refreshToken: l.refreshToken,
      authToken: yi(l.authToken)
    };
  } else
    throw await wi("Create Installation", c);
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
function Ei(n) {
  return new Promise((e) => {
    setTimeout(e, n);
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
function Ha(n) {
  return btoa(String.fromCharCode(...n)).replace(/\+/g, "-").replace(/\//g, "_");
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
const Ka = /^[cdef][\w-]{21}$/, Zt = "";
function $a() {
  try {
    const n = new Uint8Array(17);
    (self.crypto || self.msCrypto).getRandomValues(n), n[0] = 112 + n[0] % 16;
    const t = Va(n);
    return Ka.test(t) ? t : Zt;
  } catch {
    return Zt;
  }
}
function Va(n) {
  return Ha(n).substr(0, 22);
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
function wt(n) {
  return `${n.appName}!${n.appId}`;
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
const vi = /* @__PURE__ */ new Map();
function Si(n, e) {
  const t = wt(n);
  Ii(t, e), qa(t, e);
}
function Ii(n, e) {
  const t = vi.get(n);
  if (t)
    for (const s of t)
      s(e);
}
function qa(n, e) {
  const t = ja();
  t && t.postMessage({ key: n, fid: e }), Ga();
}
let ae = null;
function ja() {
  return !ae && "BroadcastChannel" in self && (ae = new BroadcastChannel("[Firebase] FID Change"), ae.onmessage = (n) => {
    Ii(n.data.key, n.data.fid);
  }), ae;
}
function Ga() {
  vi.size === 0 && ae && (ae.close(), ae = null);
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
const za = "firebase-installations-database", Ya = 1, ue = "firebase-installations-store";
let Ot = null;
function yn() {
  return Ot || (Ot = yt(za, Ya, {
    upgrade: (n, e) => {
      switch (e) {
        case 0:
          n.createObjectStore(ue);
      }
    }
  })), Ot;
}
async function it(n, e) {
  const t = wt(n), i = (await yn()).transaction(ue, "readwrite"), r = i.objectStore(ue), o = await r.get(t);
  return await r.put(e, t), await i.done, (!o || o.fid !== e.fid) && Si(n, e.fid), e;
}
async function Ti(n) {
  const e = wt(n), s = (await yn()).transaction(ue, "readwrite");
  await s.objectStore(ue).delete(e), await s.done;
}
async function bt(n, e) {
  const t = wt(n), i = (await yn()).transaction(ue, "readwrite"), r = i.objectStore(ue), o = await r.get(t), a = e(o);
  return a === void 0 ? await r.delete(t) : await r.put(a, t), await i.done, a && (!o || o.fid !== a.fid) && Si(n, a.fid), a;
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
async function wn(n) {
  let e;
  const t = await bt(n.appConfig, (s) => {
    const i = Qa(s), r = Xa(n, i);
    return e = r.registrationPromise, r.installationEntry;
  });
  return t.fid === Zt ? { installationEntry: await e } : {
    installationEntry: t,
    registrationPromise: e
  };
}
function Qa(n) {
  const e = n || {
    fid: $a(),
    registrationStatus: 0
    /* RequestStatus.NOT_STARTED */
  };
  return Ri(e);
}
function Xa(n, e) {
  if (e.registrationStatus === 0) {
    if (!navigator.onLine) {
      const i = Promise.reject(he.create(
        "app-offline"
        /* ErrorCode.APP_OFFLINE */
      ));
      return {
        installationEntry: e,
        registrationPromise: i
      };
    }
    const t = {
      fid: e.fid,
      registrationStatus: 1,
      registrationTime: Date.now()
    }, s = Ja(n, t);
    return { installationEntry: t, registrationPromise: s };
  } else return e.registrationStatus === 1 ? {
    installationEntry: e,
    registrationPromise: Za(n)
  } : { installationEntry: e };
}
async function Ja(n, e) {
  try {
    const t = await Wa(n, e);
    return it(n.appConfig, t);
  } catch (t) {
    throw gi(t) && t.customData.serverCode === 409 ? await Ti(n.appConfig) : await it(n.appConfig, {
      fid: e.fid,
      registrationStatus: 0
      /* RequestStatus.NOT_STARTED */
    }), t;
  }
}
async function Za(n) {
  let e = await rs(n.appConfig);
  for (; e.registrationStatus === 1; )
    await Ei(100), e = await rs(n.appConfig);
  if (e.registrationStatus === 0) {
    const { installationEntry: t, registrationPromise: s } = await wn(n);
    return s || t;
  }
  return e;
}
function rs(n) {
  return bt(n, (e) => {
    if (!e)
      throw he.create(
        "installation-not-found"
        /* ErrorCode.INSTALLATION_NOT_FOUND */
      );
    return Ri(e);
  });
}
function Ri(n) {
  return ec(n) ? {
    fid: n.fid,
    registrationStatus: 0
    /* RequestStatus.NOT_STARTED */
  } : n;
}
function ec(n) {
  return n.registrationStatus === 1 && n.registrationTime + fi < Date.now();
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
async function tc({ appConfig: n, heartbeatServiceProvider: e }, t) {
  const s = nc(n, t), i = Fa(n, t), r = e.getImmediate({
    optional: !0
  });
  if (r) {
    const l = await r.getHeartbeatsHeader();
    l && i.append("x-firebase-client", l);
  }
  const o = {
    installation: {
      sdkVersion: pi,
      appId: n.appId
    }
  }, a = {
    method: "POST",
    headers: i,
    body: JSON.stringify(o)
  }, c = await Ci(() => fetch(s, a));
  if (c.ok) {
    const l = await c.json();
    return yi(l);
  } else
    throw await wi("Generate Auth Token", c);
}
function nc(n, { fid: e }) {
  return `${mi(n)}/${e}/authTokens:generate`;
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
async function bn(n, e = !1) {
  let t;
  const s = await bt(n.appConfig, (r) => {
    if (!Ni(r))
      throw he.create(
        "not-registered"
        /* ErrorCode.NOT_REGISTERED */
      );
    const o = r.authToken;
    if (!e && rc(o))
      return r;
    if (o.requestStatus === 1)
      return t = sc(n, e), r;
    {
      if (!navigator.onLine)
        throw he.create(
          "app-offline"
          /* ErrorCode.APP_OFFLINE */
        );
      const a = ac(r);
      return t = ic(n, a), a;
    }
  });
  return t ? await t : s.authToken;
}
async function sc(n, e) {
  let t = await os(n.appConfig);
  for (; t.authToken.requestStatus === 1; )
    await Ei(100), t = await os(n.appConfig);
  const s = t.authToken;
  return s.requestStatus === 0 ? bn(n, e) : s;
}
function os(n) {
  return bt(n, (e) => {
    if (!Ni(e))
      throw he.create(
        "not-registered"
        /* ErrorCode.NOT_REGISTERED */
      );
    const t = e.authToken;
    return cc(t) ? {
      ...e,
      authToken: {
        requestStatus: 0
        /* RequestStatus.NOT_STARTED */
      }
    } : e;
  });
}
async function ic(n, e) {
  try {
    const t = await tc(n, e), s = {
      ...e,
      authToken: t
    };
    return await it(n.appConfig, s), t;
  } catch (t) {
    if (gi(t) && (t.customData.serverCode === 401 || t.customData.serverCode === 404))
      await Ti(n.appConfig);
    else {
      const s = {
        ...e,
        authToken: {
          requestStatus: 0
          /* RequestStatus.NOT_STARTED */
        }
      };
      await it(n.appConfig, s);
    }
    throw t;
  }
}
function Ni(n) {
  return n !== void 0 && n.registrationStatus === 2;
}
function rc(n) {
  return n.requestStatus === 2 && !oc(n);
}
function oc(n) {
  const e = Date.now();
  return e < n.creationTime || n.creationTime + n.expiresIn < e + Ma;
}
function ac(n) {
  const e = {
    requestStatus: 1,
    requestTime: Date.now()
  };
  return {
    ...n,
    authToken: e
  };
}
function cc(n) {
  return n.requestStatus === 1 && n.requestTime + fi < Date.now();
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
async function lc(n) {
  const e = n, { installationEntry: t, registrationPromise: s } = await wn(e);
  return s ? s.catch(console.error) : bn(e).catch(console.error), t.fid;
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
async function hc(n, e = !1) {
  const t = n;
  return await uc(t), (await bn(t, e)).token;
}
async function uc(n) {
  const { registrationPromise: e } = await wn(n);
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
function dc(n) {
  if (!n || !n.options)
    throw Mt("App Configuration");
  if (!n.name)
    throw Mt("App Name");
  const e = [
    "projectId",
    "apiKey",
    "appId"
  ];
  for (const t of e)
    if (!n.options[t])
      throw Mt(t);
  return {
    appName: n.name,
    projectId: n.options.projectId,
    apiKey: n.options.apiKey,
    appId: n.options.appId
  };
}
function Mt(n) {
  return he.create("missing-app-config-values", {
    valueName: n
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
const Ai = "installations", fc = "installations-internal", pc = (n) => {
  const e = n.getProvider("app").getImmediate(), t = dc(e), s = gn(e, "heartbeat");
  return {
    app: e,
    appConfig: t,
    heartbeatServiceProvider: s,
    _delete: () => Promise.resolve()
  };
}, _c = (n) => {
  const e = n.getProvider("app").getImmediate(), t = gn(e, Ai).getImmediate();
  return {
    getId: () => lc(t),
    getToken: (i) => hc(t, i)
  };
};
function gc() {
  le(new se(
    Ai,
    pc,
    "PUBLIC"
    /* ComponentType.PUBLIC */
  )), le(new se(
    fc,
    _c,
    "PRIVATE"
    /* ComponentType.PRIVATE */
  ));
}
gc();
te(di, mn);
te(di, mn, "esm2020");
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
const ki = "BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4", mc = "https://fcmregistrations.googleapis.com/v1", Di = "FCM_MSG", yc = "google.c.a.c_id", wc = 3, bc = 1;
var rt;
(function(n) {
  n[n.DATA_MESSAGE = 1] = "DATA_MESSAGE", n[n.DISPLAY_NOTIFICATION = 3] = "DISPLAY_NOTIFICATION";
})(rt || (rt = {}));
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
var ot;
(function(n) {
  n.PUSH_RECEIVED = "push-received", n.NOTIFICATION_CLICKED = "notification-clicked";
})(ot || (ot = {}));
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
function j(n) {
  const e = new Uint8Array(n);
  return btoa(String.fromCharCode(...e)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function Cc(n) {
  const e = "=".repeat((4 - n.length % 4) % 4), t = (n + e).replace(/\-/g, "+").replace(/_/g, "/"), s = atob(t), i = new Uint8Array(s.length);
  for (let r = 0; r < s.length; ++r)
    i[r] = s.charCodeAt(r);
  return i;
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
const xt = "fcm_token_details_db", Ec = 5, as = "fcm_token_object_Store";
async function vc(n) {
  if ("databases" in indexedDB && !(await indexedDB.databases()).map((r) => r.name).includes(xt))
    return null;
  let e = null;
  return (await yt(xt, Ec, {
    upgrade: async (s, i, r, o) => {
      if (i < 2 || !s.objectStoreNames.contains(as))
        return;
      const a = o.objectStore(as), c = await a.index("fcmSenderId").get(n);
      if (await a.clear(), !!c) {
        if (i === 2) {
          const l = c;
          if (!l.auth || !l.p256dh || !l.endpoint)
            return;
          e = {
            token: l.fcmToken,
            createTime: l.createTime ?? Date.now(),
            subscriptionOptions: {
              auth: l.auth,
              p256dh: l.p256dh,
              endpoint: l.endpoint,
              swScope: l.swScope,
              vapidKey: typeof l.vapidKey == "string" ? l.vapidKey : j(l.vapidKey)
            }
          };
        } else if (i === 3) {
          const l = c;
          e = {
            token: l.fcmToken,
            createTime: l.createTime,
            subscriptionOptions: {
              auth: j(l.auth),
              p256dh: j(l.p256dh),
              endpoint: l.endpoint,
              swScope: l.swScope,
              vapidKey: j(l.vapidKey)
            }
          };
        } else if (i === 4) {
          const l = c;
          e = {
            token: l.fcmToken,
            createTime: l.createTime,
            subscriptionOptions: {
              auth: j(l.auth),
              p256dh: j(l.p256dh),
              endpoint: l.endpoint,
              swScope: l.swScope,
              vapidKey: j(l.vapidKey)
            }
          };
        }
      }
    }
  })).close(), await At(xt), await At("fcm_vapid_details_db"), await At("undefined"), Sc(e) ? e : null;
}
function Sc(n) {
  if (!n || !n.subscriptionOptions)
    return !1;
  const { subscriptionOptions: e } = n;
  return typeof n.createTime == "number" && n.createTime > 0 && typeof n.token == "string" && n.token.length > 0 && typeof e.auth == "string" && e.auth.length > 0 && typeof e.p256dh == "string" && e.p256dh.length > 0 && typeof e.endpoint == "string" && e.endpoint.length > 0 && typeof e.swScope == "string" && e.swScope.length > 0 && typeof e.vapidKey == "string" && e.vapidKey.length > 0;
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
const Ic = "firebase-messaging-database", Tc = 1, de = "firebase-messaging-store";
let Pt = null;
function Cn() {
  return Pt || (Pt = yt(Ic, Tc, {
    upgrade: (n, e) => {
      switch (e) {
        case 0:
          n.createObjectStore(de);
      }
    }
  })), Pt;
}
async function En(n) {
  const e = Sn(n), s = await (await Cn()).transaction(de).objectStore(de).get(e);
  if (s)
    return s;
  {
    const i = await vc(n.appConfig.senderId);
    if (i)
      return await vn(n, i), i;
  }
}
async function vn(n, e) {
  const t = Sn(n), i = (await Cn()).transaction(de, "readwrite");
  return await i.objectStore(de).put(e, t), await i.done, e;
}
async function Rc(n) {
  const e = Sn(n), s = (await Cn()).transaction(de, "readwrite");
  await s.objectStore(de).delete(e), await s.done;
}
function Sn({ appConfig: n }) {
  return n.appId;
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
const Nc = {
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
}, K = new gt("messaging", "Messaging", Nc);
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
async function Ac(n, e) {
  const t = await Tn(n), s = Mi(e), i = {
    method: "POST",
    headers: t,
    body: JSON.stringify(s)
  };
  let r;
  try {
    r = await (await fetch(In(n.appConfig), i)).json();
  } catch (o) {
    throw K.create("token-subscribe-failed", {
      errorInfo: o == null ? void 0 : o.toString()
    });
  }
  if (r.error) {
    const o = r.error.message;
    throw K.create("token-subscribe-failed", {
      errorInfo: o
    });
  }
  if (!r.token)
    throw K.create(
      "token-subscribe-no-token"
      /* ErrorCode.TOKEN_SUBSCRIBE_NO_TOKEN */
    );
  return r.token;
}
async function kc(n, e) {
  const t = await Tn(n), s = Mi(e.subscriptionOptions), i = {
    method: "PATCH",
    headers: t,
    body: JSON.stringify(s)
  };
  let r;
  try {
    r = await (await fetch(`${In(n.appConfig)}/${e.token}`, i)).json();
  } catch (o) {
    throw K.create("token-update-failed", {
      errorInfo: o == null ? void 0 : o.toString()
    });
  }
  if (r.error) {
    const o = r.error.message;
    throw K.create("token-update-failed", {
      errorInfo: o
    });
  }
  if (!r.token)
    throw K.create(
      "token-update-no-token"
      /* ErrorCode.TOKEN_UPDATE_NO_TOKEN */
    );
  return r.token;
}
async function Oi(n, e) {
  const s = {
    method: "DELETE",
    headers: await Tn(n)
  };
  try {
    const r = await (await fetch(`${In(n.appConfig)}/${e}`, s)).json();
    if (r.error) {
      const o = r.error.message;
      throw K.create("token-unsubscribe-failed", {
        errorInfo: o
      });
    }
  } catch (i) {
    throw K.create("token-unsubscribe-failed", {
      errorInfo: i == null ? void 0 : i.toString()
    });
  }
}
function In({ projectId: n }) {
  return `${mc}/projects/${n}/registrations`;
}
async function Tn({ appConfig: n, installations: e }) {
  const t = await e.getToken();
  return new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-goog-api-key": n.apiKey,
    "x-goog-firebase-installations-auth": `FIS ${t}`
  });
}
function Mi({ p256dh: n, auth: e, endpoint: t, vapidKey: s }) {
  const i = {
    web: {
      endpoint: t,
      auth: e,
      p256dh: n
    }
  };
  return s !== ki && (i.web.applicationPubKey = s), i;
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
const Dc = 7 * 24 * 60 * 60 * 1e3;
async function Oc(n) {
  const e = await xc(n.swRegistration, n.vapidKey), t = {
    vapidKey: n.vapidKey,
    swScope: n.swRegistration.scope,
    endpoint: e.endpoint,
    auth: j(e.getKey("auth")),
    p256dh: j(e.getKey("p256dh"))
  }, s = await En(n.firebaseDependencies);
  if (s) {
    if (Pc(s.subscriptionOptions, t))
      return Date.now() >= s.createTime + Dc ? Mc(n, {
        token: s.token,
        createTime: Date.now(),
        subscriptionOptions: t
      }) : s.token;
    try {
      await Oi(n.firebaseDependencies, s.token);
    } catch (i) {
      console.warn(i);
    }
    return ls(n.firebaseDependencies, t);
  } else return ls(n.firebaseDependencies, t);
}
async function cs(n) {
  const e = await En(n.firebaseDependencies);
  e && (await Oi(n.firebaseDependencies, e.token), await Rc(n.firebaseDependencies));
  const t = await n.swRegistration.pushManager.getSubscription();
  return t ? t.unsubscribe() : !0;
}
async function Mc(n, e) {
  try {
    const t = await kc(n.firebaseDependencies, e), s = {
      ...e,
      token: t,
      createTime: Date.now()
    };
    return await vn(n.firebaseDependencies, s), t;
  } catch (t) {
    throw t;
  }
}
async function ls(n, e) {
  const s = {
    token: await Ac(n, e),
    createTime: Date.now(),
    subscriptionOptions: e
  };
  return await vn(n, s), s.token;
}
async function xc(n, e) {
  const t = await n.pushManager.getSubscription();
  return t || n.pushManager.subscribe({
    userVisibleOnly: !0,
    // Chrome <= 75 doesn't support base64-encoded VAPID key. For backward compatibility, VAPID key
    // submitted to pushManager#subscribe must be of type Uint8Array.
    applicationServerKey: Cc(e)
  });
}
function Pc(n, e) {
  const t = e.vapidKey === n.vapidKey, s = e.endpoint === n.endpoint, i = e.auth === n.auth, r = e.p256dh === n.p256dh;
  return t && s && i && r;
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
function Lc(n) {
  const e = {
    from: n.from,
    // eslint-disable-next-line camelcase
    collapseKey: n.collapse_key,
    // eslint-disable-next-line camelcase
    messageId: n.fcmMessageId
  };
  return Fc(e, n), Uc(e, n), Bc(e, n), e;
}
function Fc(n, e) {
  if (!e.notification)
    return;
  n.notification = {};
  const t = e.notification.title;
  t && (n.notification.title = t);
  const s = e.notification.body;
  s && (n.notification.body = s);
  const i = e.notification.image;
  i && (n.notification.image = i);
  const r = e.notification.icon;
  r && (n.notification.icon = r);
}
function Uc(n, e) {
  e.data && (n.data = e.data);
}
function Bc(n, e) {
  var i, r, o, a;
  if (!e.fcmOptions && !((i = e.notification) != null && i.click_action))
    return;
  n.fcmOptions = {};
  const t = ((r = e.fcmOptions) == null ? void 0 : r.link) ?? ((o = e.notification) == null ? void 0 : o.click_action);
  t && (n.fcmOptions.link = t);
  const s = (a = e.fcmOptions) == null ? void 0 : a.analytics_label;
  s && (n.fcmOptions.analyticsLabel = s);
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
function Wc(n) {
  return typeof n == "object" && !!n && yc in n;
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
function Hc(n) {
  return new Promise((e) => {
    setTimeout(e, n);
  });
}
async function Kc(n, e) {
  const t = $c(e, await n.firebaseDependencies.installations.getId());
  Vc(n, t, e.productId);
}
function $c(n, e) {
  var s, i;
  const t = {};
  return n.from && (t.project_number = n.from), n.fcmMessageId && (t.message_id = n.fcmMessageId), t.instance_id = e, n.notification ? t.message_type = rt.DISPLAY_NOTIFICATION.toString() : t.message_type = rt.DATA_MESSAGE.toString(), t.sdk_platform = wc.toString(), t.package_name = self.origin.replace(/(^\w+:|^)\/\//, ""), n.collapse_key && (t.collapse_key = n.collapse_key), t.event = bc.toString(), (s = n.fcmOptions) != null && s.analytics_label && (t.analytics_label = (i = n.fcmOptions) == null ? void 0 : i.analytics_label), t;
}
function Vc(n, e, t) {
  const s = {};
  s.event_time_ms = Math.floor(Date.now()).toString(), s.source_extension_json_proto3 = JSON.stringify({
    messaging_client_event: e
  }), t && (s.compliance_data = qc(t)), n.logEvents.push(s);
}
function qc(n) {
  return {
    privacy_context: {
      prequest: {
        origin_associated_product_id: n
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
async function jc(n, e) {
  var i;
  const { newSubscription: t } = n;
  if (!t) {
    await cs(e);
    return;
  }
  const s = await En(e.firebaseDependencies);
  await cs(e), e.vapidKey = ((i = s == null ? void 0 : s.subscriptionOptions) == null ? void 0 : i.vapidKey) ?? ki, await Oc(e);
}
async function Gc(n, e) {
  const t = Qc(n);
  if (!t)
    return;
  e.deliveryMetricsExportedToBigQueryEnabled && await Kc(e, t);
  const s = await xi();
  if (Jc(s))
    return Zc(s, t);
  if (t.notification && await el(Yc(t)), !!e && e.onBackgroundMessageHandler) {
    const i = Lc(t);
    typeof e.onBackgroundMessageHandler == "function" ? await e.onBackgroundMessageHandler(i) : e.onBackgroundMessageHandler.next(i);
  }
}
async function zc(n) {
  var o, a;
  const e = (a = (o = n.notification) == null ? void 0 : o.data) == null ? void 0 : a[Di];
  if (e) {
    if (n.action)
      return;
  } else return;
  n.stopImmediatePropagation(), n.notification.close();
  const t = tl(e);
  if (!t)
    return;
  const s = new URL(t, self.location.href), i = new URL(self.location.origin);
  if (s.host !== i.host)
    return;
  let r = await Xc(s);
  if (r ? r = await r.focus() : (r = await self.clients.openWindow(t), await Hc(3e3)), !!r)
    return e.messageType = ot.NOTIFICATION_CLICKED, e.isFirebaseMessaging = !0, r.postMessage(e);
}
function Yc(n) {
  const e = {
    ...n.notification
  };
  return e.data = {
    [Di]: n
  }, e;
}
function Qc({ data: n }) {
  if (!n)
    return null;
  try {
    return n.json();
  } catch {
    return null;
  }
}
async function Xc(n) {
  const e = await xi();
  for (const t of e) {
    const s = new URL(t.url, self.location.href);
    if (n.host === s.host)
      return t;
  }
  return null;
}
function Jc(n) {
  return n.some((e) => e.visibilityState === "visible" && // Ignore chrome-extension clients as that matches the background pages of extensions, which
  // are always considered visible for some reason.
  !e.url.startsWith("chrome-extension://"));
}
function Zc(n, e) {
  e.isFirebaseMessaging = !0, e.messageType = ot.PUSH_RECEIVED;
  for (const t of n)
    t.postMessage(e);
}
function xi() {
  return self.clients.matchAll({
    type: "window",
    includeUncontrolled: !0
    // TS doesn't know that "type: 'window'" means it'll return WindowClient[]
  });
}
function el(n) {
  const { actions: e } = n, { maxActions: t } = Notification;
  return e && t && e.length > t && console.warn(`This browser only supports ${t} actions. The remaining actions will not be displayed.`), self.registration.showNotification(
    /* title= */
    n.title ?? "",
    n
  );
}
function tl(n) {
  var t, s;
  const e = ((t = n.fcmOptions) == null ? void 0 : t.link) ?? ((s = n.notification) == null ? void 0 : s.click_action);
  return e || (Wc(n.data) ? self.location.origin : null);
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
function nl(n) {
  if (!n || !n.options)
    throw Lt("App Configuration Object");
  if (!n.name)
    throw Lt("App Name");
  const e = [
    "projectId",
    "apiKey",
    "appId",
    "messagingSenderId"
  ], { options: t } = n;
  for (const s of e)
    if (!t[s])
      throw Lt(s);
  return {
    appName: n.name,
    projectId: t.projectId,
    apiKey: t.apiKey,
    appId: t.appId,
    senderId: t.messagingSenderId
  };
}
function Lt(n) {
  return K.create("missing-app-config-values", {
    valueName: n
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
class sl {
  constructor(e, t, s) {
    this.deliveryMetricsExportedToBigQueryEnabled = !1, this.onBackgroundMessageHandler = null, this.onMessageHandler = null, this.logEvents = [], this.isLogServiceStarted = !1;
    const i = nl(e);
    this.firebaseDependencies = {
      app: e,
      appConfig: i,
      installations: t,
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
const il = (n) => {
  const e = new sl(n.getProvider("app").getImmediate(), n.getProvider("installations-internal").getImmediate(), n.getProvider("analytics-internal"));
  return self.addEventListener("push", (t) => {
    t.waitUntil(Gc(t, e));
  }), self.addEventListener("pushsubscriptionchange", (t) => {
    t.waitUntil(jc(t, e));
  }), self.addEventListener("notificationclick", (t) => {
    t.waitUntil(zc(t));
  }), e;
};
function rl() {
  le(new se(
    "messaging-sw",
    il,
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
async function ol() {
  return ni() && await si() && "PushManager" in self && "Notification" in self && ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification") && PushSubscription.prototype.hasOwnProperty("getKey");
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
function al(n = wa()) {
  return ol().then((e) => {
    if (!e)
      throw K.create(
        "unsupported-browser"
        /* ErrorCode.UNSUPPORTED_BROWSER */
      );
  }, (e) => {
    throw K.create(
      "indexed-db-unsupported"
      /* ErrorCode.INDEXED_DB_UNSUPPORTED */
    );
  }), gn(ri(n), "messaging-sw").getImmediate();
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
rl();
try {
  self["workbox:core:7.2.0"] && _();
} catch {
}
const cl = (n, ...e) => {
  let t = n;
  return e.length > 0 && (t += ` :: ${JSON.stringify(e)}`), t;
}, ll = cl;
class L extends Error {
  /**
   *
   * @param {string} errorCode The error code that
   * identifies this particular error.
   * @param {Object=} details Any relevant arguments
   * that will help developers identify issues should
   * be added as a key on the context object.
   */
  constructor(e, t) {
    const s = ll(e, t);
    super(s), this.name = e, this.details = t;
  }
}
const G = {
  googleAnalytics: "googleAnalytics",
  precache: "precache-v2",
  prefix: "workbox",
  runtime: "runtime",
  suffix: typeof registration < "u" ? registration.scope : ""
}, Ft = (n) => [G.prefix, n, G.suffix].filter((e) => e && e.length > 0).join("-"), hl = (n) => {
  for (const e of Object.keys(G))
    n(e);
}, Rn = {
  updateDetails: (n) => {
    hl((e) => {
      typeof n[e] == "string" && (G[e] = n[e]);
    });
  },
  getGoogleAnalyticsName: (n) => n || Ft(G.googleAnalytics),
  getPrecacheName: (n) => n || Ft(G.precache),
  getPrefix: () => G.prefix,
  getRuntimeName: (n) => n || Ft(G.runtime),
  getSuffix: () => G.suffix
};
function hs(n, e) {
  const t = e();
  return n.waitUntil(t), t;
}
try {
  self["workbox:precaching:7.2.0"] && _();
} catch {
}
const ul = "__WB_REVISION__";
function dl(n) {
  if (!n)
    throw new L("add-to-cache-list-unexpected-type", { entry: n });
  if (typeof n == "string") {
    const r = new URL(n, location.href);
    return {
      cacheKey: r.href,
      url: r.href
    };
  }
  const { revision: e, url: t } = n;
  if (!t)
    throw new L("add-to-cache-list-unexpected-type", { entry: n });
  if (!e) {
    const r = new URL(t, location.href);
    return {
      cacheKey: r.href,
      url: r.href
    };
  }
  const s = new URL(t, location.href), i = new URL(t, location.href);
  return s.searchParams.set(ul, e), {
    cacheKey: s.href,
    url: i.href
  };
}
class fl {
  constructor() {
    this.updatedURLs = [], this.notUpdatedURLs = [], this.handlerWillStart = async ({ request: e, state: t }) => {
      t && (t.originalRequest = e);
    }, this.cachedResponseWillBeUsed = async ({ event: e, state: t, cachedResponse: s }) => {
      if (e.type === "install" && t && t.originalRequest && t.originalRequest instanceof Request) {
        const i = t.originalRequest.url;
        s ? this.notUpdatedURLs.push(i) : this.updatedURLs.push(i);
      }
      return s;
    };
  }
}
class pl {
  constructor({ precacheController: e }) {
    this.cacheKeyWillBeUsed = async ({ request: t, params: s }) => {
      const i = (s == null ? void 0 : s.cacheKey) || this._precacheController.getCacheKeyForURL(t.url);
      return i ? new Request(i, { headers: t.headers }) : t;
    }, this._precacheController = e;
  }
}
let Oe;
function _l() {
  if (Oe === void 0) {
    const n = new Response("");
    if ("body" in n)
      try {
        new Response(n.body), Oe = !0;
      } catch {
        Oe = !1;
      }
    Oe = !1;
  }
  return Oe;
}
async function gl(n, e) {
  let t = null;
  if (n.url && (t = new URL(n.url).origin), t !== self.location.origin)
    throw new L("cross-origin-copy-response", { origin: t });
  const s = n.clone(), r = {
    headers: new Headers(s.headers),
    status: s.status,
    statusText: s.statusText
  }, o = _l() ? s.body : await s.blob();
  return new Response(o, r);
}
const ml = (n) => new URL(String(n), location.href).href.replace(new RegExp(`^${location.origin}`), "");
function us(n, e) {
  const t = new URL(n);
  for (const s of e)
    t.searchParams.delete(s);
  return t.href;
}
async function yl(n, e, t, s) {
  const i = us(e.url, t);
  if (e.url === i)
    return n.match(e, s);
  const r = Object.assign(Object.assign({}, s), { ignoreSearch: !0 }), o = await n.keys(e, r);
  for (const a of o) {
    const c = us(a.url, t);
    if (i === c)
      return n.match(a, s);
  }
}
class wl {
  /**
   * Creates a promise and exposes its resolve and reject functions as methods.
   */
  constructor() {
    this.promise = new Promise((e, t) => {
      this.resolve = e, this.reject = t;
    });
  }
}
const bl = /* @__PURE__ */ new Set();
async function Cl() {
  for (const n of bl)
    await n();
}
function El(n) {
  return new Promise((e) => setTimeout(e, n));
}
try {
  self["workbox:strategies:7.2.0"] && _();
} catch {
}
function Ze(n) {
  return typeof n == "string" ? new Request(n) : n;
}
class vl {
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
  constructor(e, t) {
    this._cacheKeys = {}, Object.assign(this, t), this.event = t.event, this._strategy = e, this._handlerDeferred = new wl(), this._extendLifetimePromises = [], this._plugins = [...e.plugins], this._pluginStateMap = /* @__PURE__ */ new Map();
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
    const { event: t } = this;
    let s = Ze(e);
    if (s.mode === "navigate" && t instanceof FetchEvent && t.preloadResponse) {
      const o = await t.preloadResponse;
      if (o)
        return o;
    }
    const i = this.hasCallback("fetchDidFail") ? s.clone() : null;
    try {
      for (const o of this.iterateCallbacks("requestWillFetch"))
        s = await o({ request: s.clone(), event: t });
    } catch (o) {
      if (o instanceof Error)
        throw new L("plugin-error-request-will-fetch", {
          thrownErrorMessage: o.message
        });
    }
    const r = s.clone();
    try {
      let o;
      o = await fetch(s, s.mode === "navigate" ? void 0 : this._strategy.fetchOptions);
      for (const a of this.iterateCallbacks("fetchDidSucceed"))
        o = await a({
          event: t,
          request: r,
          response: o
        });
      return o;
    } catch (o) {
      throw i && await this.runCallbacks("fetchDidFail", {
        error: o,
        event: t,
        originalRequest: i.clone(),
        request: r.clone()
      }), o;
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
    const t = await this.fetch(e), s = t.clone();
    return this.waitUntil(this.cachePut(e, s)), t;
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
    const t = Ze(e);
    let s;
    const { cacheName: i, matchOptions: r } = this._strategy, o = await this.getCacheKey(t, "read"), a = Object.assign(Object.assign({}, r), { cacheName: i });
    s = await caches.match(o, a);
    for (const c of this.iterateCallbacks("cachedResponseWillBeUsed"))
      s = await c({
        cacheName: i,
        matchOptions: r,
        cachedResponse: s,
        request: o,
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
  async cachePut(e, t) {
    const s = Ze(e);
    await El(0);
    const i = await this.getCacheKey(s, "write");
    if (!t)
      throw new L("cache-put-with-no-response", {
        url: ml(i.url)
      });
    const r = await this._ensureResponseSafeToCache(t);
    if (!r)
      return !1;
    const { cacheName: o, matchOptions: a } = this._strategy, c = await self.caches.open(o), l = this.hasCallback("cacheDidUpdate"), u = l ? await yl(
      // TODO(philipwalton): the `__WB_REVISION__` param is a precaching
      // feature. Consider into ways to only add this behavior if using
      // precaching.
      c,
      i.clone(),
      ["__WB_REVISION__"],
      a
    ) : null;
    try {
      await c.put(i, l ? r.clone() : r);
    } catch (h) {
      if (h instanceof Error)
        throw h.name === "QuotaExceededError" && await Cl(), h;
    }
    for (const h of this.iterateCallbacks("cacheDidUpdate"))
      await h({
        cacheName: o,
        oldResponse: u,
        newResponse: r.clone(),
        request: i,
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
  async getCacheKey(e, t) {
    const s = `${e.url} | ${t}`;
    if (!this._cacheKeys[s]) {
      let i = e;
      for (const r of this.iterateCallbacks("cacheKeyWillBeUsed"))
        i = Ze(await r({
          mode: t,
          request: i,
          event: this.event,
          // params has a type any can't change right now.
          params: this.params
          // eslint-disable-line
        }));
      this._cacheKeys[s] = i;
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
    for (const t of this._strategy.plugins)
      if (e in t)
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
  async runCallbacks(e, t) {
    for (const s of this.iterateCallbacks(e))
      await s(t);
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
    for (const t of this._strategy.plugins)
      if (typeof t[e] == "function") {
        const s = this._pluginStateMap.get(t);
        yield (r) => {
          const o = Object.assign(Object.assign({}, r), { state: s });
          return t[e](o);
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
    let t = e, s = !1;
    for (const i of this.iterateCallbacks("cacheWillUpdate"))
      if (t = await i({
        request: this.request,
        response: t,
        event: this.event
      }) || void 0, s = !0, !t)
        break;
    return s || t && t.status !== 200 && (t = void 0), t;
  }
}
class Sl {
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
    this.cacheName = Rn.getRuntimeName(e.cacheName), this.plugins = e.plugins || [], this.fetchOptions = e.fetchOptions, this.matchOptions = e.matchOptions;
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
    const [t] = this.handleAll(e);
    return t;
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
    const t = e.event, s = typeof e.request == "string" ? new Request(e.request) : e.request, i = "params" in e ? e.params : void 0, r = new vl(this, { event: t, request: s, params: i }), o = this._getResponse(r, s, t), a = this._awaitComplete(o, r, s, t);
    return [o, a];
  }
  async _getResponse(e, t, s) {
    await e.runCallbacks("handlerWillStart", { event: s, request: t });
    let i;
    try {
      if (i = await this._handle(t, e), !i || i.type === "error")
        throw new L("no-response", { url: t.url });
    } catch (r) {
      if (r instanceof Error) {
        for (const o of e.iterateCallbacks("handlerDidError"))
          if (i = await o({ error: r, event: s, request: t }), i)
            break;
      }
      if (!i)
        throw r;
    }
    for (const r of e.iterateCallbacks("handlerWillRespond"))
      i = await r({ event: s, request: t, response: i });
    return i;
  }
  async _awaitComplete(e, t, s, i) {
    let r, o;
    try {
      r = await e;
    } catch {
    }
    try {
      await t.runCallbacks("handlerDidRespond", {
        event: i,
        request: s,
        response: r
      }), await t.doneWaiting();
    } catch (a) {
      a instanceof Error && (o = a);
    }
    if (await t.runCallbacks("handlerDidComplete", {
      event: i,
      request: s,
      response: r,
      error: o
    }), t.destroy(), o)
      throw o;
  }
}
class Z extends Sl {
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
    e.cacheName = Rn.getPrecacheName(e.cacheName), super(e), this._fallbackToNetwork = e.fallbackToNetwork !== !1, this.plugins.push(Z.copyRedirectedCacheableResponsesPlugin);
  }
  /**
   * @private
   * @param {Request|string} request A request to run this strategy for.
   * @param {workbox-strategies.StrategyHandler} handler The event that
   *     triggered the request.
   * @return {Promise<Response>}
   */
  async _handle(e, t) {
    const s = await t.cacheMatch(e);
    return s || (t.event && t.event.type === "install" ? await this._handleInstall(e, t) : await this._handleFetch(e, t));
  }
  async _handleFetch(e, t) {
    let s;
    const i = t.params || {};
    if (this._fallbackToNetwork) {
      const r = i.integrity, o = e.integrity, a = !o || o === r;
      s = await t.fetch(new Request(e, {
        integrity: e.mode !== "no-cors" ? o || r : void 0
      })), r && a && e.mode !== "no-cors" && (this._useDefaultCacheabilityPluginIfNeeded(), await t.cachePut(e, s.clone()));
    } else
      throw new L("missing-precache-entry", {
        cacheName: this.cacheName,
        url: e.url
      });
    return s;
  }
  async _handleInstall(e, t) {
    this._useDefaultCacheabilityPluginIfNeeded();
    const s = await t.fetch(e);
    if (!await t.cachePut(e, s.clone()))
      throw new L("bad-precaching-response", {
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
    let e = null, t = 0;
    for (const [s, i] of this.plugins.entries())
      i !== Z.copyRedirectedCacheableResponsesPlugin && (i === Z.defaultPrecacheCacheabilityPlugin && (e = s), i.cacheWillUpdate && t++);
    t === 0 ? this.plugins.push(Z.defaultPrecacheCacheabilityPlugin) : t > 1 && e !== null && this.plugins.splice(e, 1);
  }
}
Z.defaultPrecacheCacheabilityPlugin = {
  async cacheWillUpdate({ response: n }) {
    return !n || n.status >= 400 ? null : n;
  }
};
Z.copyRedirectedCacheableResponsesPlugin = {
  async cacheWillUpdate({ response: n }) {
    return n.redirected ? await gl(n) : n;
  }
};
class Il {
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
  constructor({ cacheName: e, plugins: t = [], fallbackToNetwork: s = !0 } = {}) {
    this._urlsToCacheKeys = /* @__PURE__ */ new Map(), this._urlsToCacheModes = /* @__PURE__ */ new Map(), this._cacheKeysToIntegrities = /* @__PURE__ */ new Map(), this._strategy = new Z({
      cacheName: Rn.getPrecacheName(e),
      plugins: [
        ...t,
        new pl({ precacheController: this })
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
    const t = [];
    for (const s of e) {
      typeof s == "string" ? t.push(s) : s && s.revision === void 0 && t.push(s.url);
      const { cacheKey: i, url: r } = dl(s), o = typeof s != "string" && s.revision ? "reload" : "default";
      if (this._urlsToCacheKeys.has(r) && this._urlsToCacheKeys.get(r) !== i)
        throw new L("add-to-cache-list-conflicting-entries", {
          firstEntry: this._urlsToCacheKeys.get(r),
          secondEntry: i
        });
      if (typeof s != "string" && s.integrity) {
        if (this._cacheKeysToIntegrities.has(i) && this._cacheKeysToIntegrities.get(i) !== s.integrity)
          throw new L("add-to-cache-list-conflicting-integrities", {
            url: r
          });
        this._cacheKeysToIntegrities.set(i, s.integrity);
      }
      if (this._urlsToCacheKeys.set(r, i), this._urlsToCacheModes.set(r, o), t.length > 0) {
        const a = `Workbox is precaching URLs without revision info: ${t.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;
        console.warn(a);
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
    return hs(e, async () => {
      const t = new fl();
      this.strategy.plugins.push(t);
      for (const [r, o] of this._urlsToCacheKeys) {
        const a = this._cacheKeysToIntegrities.get(o), c = this._urlsToCacheModes.get(r), l = new Request(r, {
          integrity: a,
          cache: c,
          credentials: "same-origin"
        });
        await Promise.all(this.strategy.handleAll({
          params: { cacheKey: o },
          request: l,
          event: e
        }));
      }
      const { updatedURLs: s, notUpdatedURLs: i } = t;
      return { updatedURLs: s, notUpdatedURLs: i };
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
    return hs(e, async () => {
      const t = await self.caches.open(this.strategy.cacheName), s = await t.keys(), i = new Set(this._urlsToCacheKeys.values()), r = [];
      for (const o of s)
        i.has(o.url) || (await t.delete(o), r.push(o.url));
      return { deletedURLs: r };
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
    const t = new URL(e, location.href);
    return this._urlsToCacheKeys.get(t.href);
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
    const t = e instanceof Request ? e.url : e, s = this.getCacheKeyForURL(t);
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
    const t = this.getCacheKeyForURL(e);
    if (!t)
      throw new L("non-precached-url", { url: e });
    return (s) => (s.request = new Request(e), s.params = Object.assign({ cacheKey: t }, s.params), this.strategy.handle(s));
  }
}
let Ut;
const Pi = () => (Ut || (Ut = new Il()), Ut);
try {
  self["workbox:routing:7.2.0"] && _();
} catch {
}
const Li = "GET", at = (n) => n && typeof n == "object" ? n : { handle: n };
class Ue {
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
  constructor(e, t, s = Li) {
    this.handler = at(t), this.match = e, this.method = s;
  }
  /**
   *
   * @param {workbox-routing-handlerCallback} handler A callback
   * function that returns a Promise resolving to a Response
   */
  setCatchHandler(e) {
    this.catchHandler = at(e);
  }
}
class Tl extends Ue {
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
  constructor(e, t, s) {
    const i = ({ url: r }) => {
      const o = e.exec(r.href);
      if (o && !(r.origin !== location.origin && o.index !== 0))
        return o.slice(1);
    };
    super(i, t, s);
  }
}
class Rl {
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
      const { request: t } = e, s = this.handleRequest({ request: t, event: e });
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
        const { payload: t } = e.data, s = Promise.all(t.urlsToCache.map((i) => {
          typeof i == "string" && (i = [i]);
          const r = new Request(...i);
          return this.handleRequest({ request: r, event: e });
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
  handleRequest({ request: e, event: t }) {
    const s = new URL(e.url, location.href);
    if (!s.protocol.startsWith("http"))
      return;
    const i = s.origin === location.origin, { params: r, route: o } = this.findMatchingRoute({
      event: t,
      request: e,
      sameOrigin: i,
      url: s
    });
    let a = o && o.handler;
    const c = e.method;
    if (!a && this._defaultHandlerMap.has(c) && (a = this._defaultHandlerMap.get(c)), !a)
      return;
    let l;
    try {
      l = a.handle({ url: s, request: e, event: t, params: r });
    } catch (h) {
      l = Promise.reject(h);
    }
    const u = o && o.catchHandler;
    return l instanceof Promise && (this._catchHandler || u) && (l = l.catch(async (h) => {
      if (u)
        try {
          return await u.handle({ url: s, request: e, event: t, params: r });
        } catch (d) {
          d instanceof Error && (h = d);
        }
      if (this._catchHandler)
        return this._catchHandler.handle({ url: s, request: e, event: t });
      throw h;
    })), l;
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
  findMatchingRoute({ url: e, sameOrigin: t, request: s, event: i }) {
    const r = this._routes.get(s.method) || [];
    for (const o of r) {
      let a;
      const c = o.match({ url: e, sameOrigin: t, request: s, event: i });
      if (c)
        return a = c, (Array.isArray(a) && a.length === 0 || c.constructor === Object && // eslint-disable-line
        Object.keys(c).length === 0 || typeof c == "boolean") && (a = void 0), { route: o, params: a };
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
  setDefaultHandler(e, t = Li) {
    this._defaultHandlerMap.set(t, at(e));
  }
  /**
   * If a Route throws an error while handling a request, this `handler`
   * will be called and given a chance to provide a response.
   *
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   */
  setCatchHandler(e) {
    this._catchHandler = at(e);
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
      throw new L("unregister-route-but-not-found-with-method", {
        method: e.method
      });
    const t = this._routes.get(e.method).indexOf(e);
    if (t > -1)
      this._routes.get(e.method).splice(t, 1);
    else
      throw new L("unregister-route-route-not-registered");
  }
}
let Me;
const Nl = () => (Me || (Me = new Rl(), Me.addFetchListener(), Me.addCacheListener()), Me);
function Al(n, e, t) {
  let s;
  if (typeof n == "string") {
    const r = new URL(n, location.href), o = ({ url: a }) => a.href === r.href;
    s = new Ue(o, e, t);
  } else if (n instanceof RegExp)
    s = new Tl(n, e, t);
  else if (typeof n == "function")
    s = new Ue(n, e, t);
  else if (n instanceof Ue)
    s = n;
  else
    throw new L("unsupported-route-type", {
      moduleName: "workbox-routing",
      funcName: "registerRoute",
      paramName: "capture"
    });
  return Nl().registerRoute(s), s;
}
function kl(n, e = []) {
  for (const t of [...n.searchParams.keys()])
    e.some((s) => s.test(t)) && n.searchParams.delete(t);
  return n;
}
function* Dl(n, { ignoreURLParametersMatching: e = [/^utm_/, /^fbclid$/], directoryIndex: t = "index.html", cleanURLs: s = !0, urlManipulation: i } = {}) {
  const r = new URL(n, location.href);
  r.hash = "", yield r.href;
  const o = kl(r, e);
  if (yield o.href, t && o.pathname.endsWith("/")) {
    const a = new URL(o.href);
    a.pathname += t, yield a.href;
  }
  if (s) {
    const a = new URL(o.href);
    a.pathname += ".html", yield a.href;
  }
  if (i) {
    const a = i({ url: r });
    for (const c of a)
      yield c.href;
  }
}
class Ol extends Ue {
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
  constructor(e, t) {
    const s = ({ request: i }) => {
      const r = e.getURLsToCacheKeys();
      for (const o of Dl(i.url, t)) {
        const a = r.get(o);
        if (a) {
          const c = e.getIntegrityForCacheKey(a);
          return { cacheKey: a, integrity: c };
        }
      }
    };
    super(s, e.strategy);
  }
}
function Ml(n) {
  const e = Pi(), t = new Ol(e, n);
  Al(t);
}
function xl(n) {
  Pi().precache(n);
}
function Pl(n, e) {
  xl(n), Ml(e);
}
const ds = "@firebase/database", fs = "1.1.0";
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
let Fi = "";
function Ll(n) {
  Fi = n;
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
class Fl {
  /**
   * @param domStorage_ - The underlying storage object (e.g. localStorage or sessionStorage)
   */
  constructor(e) {
    this.domStorage_ = e, this.prefix_ = "firebase:";
  }
  /**
   * @param key - The key to save the value under
   * @param value - The value being stored, or null to remove the key.
   */
  set(e, t) {
    t == null ? this.domStorage_.removeItem(this.prefixedName_(e)) : this.domStorage_.setItem(this.prefixedName_(e), k(t));
  }
  /**
   * @returns The value that was stored under this key, or null
   */
  get(e) {
    const t = this.domStorage_.getItem(this.prefixedName_(e));
    return t == null ? null : $e(t);
  }
  remove(e) {
    this.domStorage_.removeItem(this.prefixedName_(e));
  }
  prefixedName_(e) {
    return this.prefix_ + e;
  }
  toString() {
    return this.domStorage_.toString();
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
class Ul {
  constructor() {
    this.cache_ = {}, this.isInMemoryStorage = !0;
  }
  set(e, t) {
    t == null ? delete this.cache_[e] : this.cache_[e] = t;
  }
  get(e) {
    return J(this.cache_, e) ? this.cache_[e] : null;
  }
  remove(e) {
    delete this.cache_[e];
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
const Ui = function(n) {
  try {
    if (typeof window < "u" && typeof window[n] < "u") {
      const e = window[n];
      return e.setItem("firebase:sentinel", "cache"), e.removeItem("firebase:sentinel"), new Fl(e);
    }
  } catch {
  }
  return new Ul();
}, ce = Ui("localStorage"), Bl = Ui("sessionStorage");
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
const Ee = new oi("@firebase/database"), Wl = /* @__PURE__ */ function() {
  let n = 1;
  return function() {
    return n++;
  };
}(), Bi = function(n) {
  const e = wo(n), t = new mo();
  t.update(e);
  const s = t.digest();
  return fn.encodeByteArray(s);
}, Ge = function(...n) {
  let e = "";
  for (let t = 0; t < n.length; t++) {
    const s = n[t];
    Array.isArray(s) || s && typeof s == "object" && // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof s.length == "number" ? e += Ge.apply(null, s) : typeof s == "object" ? e += k(s) : e += s, e += " ";
  }
  return e;
};
let Be = null, ps = !0;
const Hl = function(n, e) {
  f(!0, "Can't turn on custom loggers persistently."), Ee.logLevel = v.VERBOSE, Be = Ee.log.bind(Ee);
}, D = function(...n) {
  if (ps === !0 && (ps = !1, Be === null && Bl.get("logging_enabled") === !0 && Hl()), Be) {
    const e = Ge.apply(null, n);
    Be(e);
  }
}, ze = function(n) {
  return function(...e) {
    D(n, ...e);
  };
}, en = function(...n) {
  const e = "FIREBASE INTERNAL ERROR: " + Ge(...n);
  Ee.error(e);
}, fe = function(...n) {
  const e = `FIREBASE FATAL ERROR: ${Ge(...n)}`;
  throw Ee.error(e), new Error(e);
}, F = function(...n) {
  const e = "FIREBASE WARNING: " + Ge(...n);
  Ee.warn(e);
}, Kl = function() {
  typeof window < "u" && window.location && window.location.protocol && window.location.protocol.indexOf("https:") !== -1 && F("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");
}, Wi = function(n) {
  return typeof n == "number" && (n !== n || // NaN
  n === Number.POSITIVE_INFINITY || n === Number.NEGATIVE_INFINITY);
}, $l = function(n) {
  if (document.readyState === "complete")
    n();
  else {
    let e = !1;
    const t = function() {
      if (!document.body) {
        setTimeout(t, Math.floor(10));
        return;
      }
      e || (e = !0, n());
    };
    document.addEventListener ? (document.addEventListener("DOMContentLoaded", t, !1), window.addEventListener("load", t, !1)) : document.attachEvent && (document.attachEvent("onreadystatechange", () => {
      document.readyState === "complete" && t();
    }), window.attachEvent("onload", t));
  }
}, Ie = "[MIN_NAME]", pe = "[MAX_NAME]", Ae = function(n, e) {
  if (n === e)
    return 0;
  if (n === Ie || e === pe)
    return -1;
  if (e === Ie || n === pe)
    return 1;
  {
    const t = _s(n), s = _s(e);
    return t !== null ? s !== null ? t - s === 0 ? n.length - e.length : t - s : -1 : s !== null ? 1 : n < e ? -1 : 1;
  }
}, Vl = function(n, e) {
  return n === e ? 0 : n < e ? -1 : 1;
}, xe = function(n, e) {
  if (e && n in e)
    return e[n];
  throw new Error("Missing required key (" + n + ") in object: " + k(e));
}, Nn = function(n) {
  if (typeof n != "object" || n === null)
    return k(n);
  const e = [];
  for (const s in n)
    e.push(s);
  e.sort();
  let t = "{";
  for (let s = 0; s < e.length; s++)
    s !== 0 && (t += ","), t += k(e[s]), t += ":", t += Nn(n[e[s]]);
  return t += "}", t;
}, Hi = function(n, e) {
  const t = n.length;
  if (t <= e)
    return [n];
  const s = [];
  for (let i = 0; i < t; i += e)
    i + e > t ? s.push(n.substring(i, t)) : s.push(n.substring(i, i + e));
  return s;
};
function B(n, e) {
  for (const t in n)
    n.hasOwnProperty(t) && e(t, n[t]);
}
const Ki = function(n) {
  f(!Wi(n), "Invalid JSON number");
  const e = 11, t = 52, s = (1 << e - 1) - 1;
  let i, r, o, a, c;
  n === 0 ? (r = 0, o = 0, i = 1 / n === -1 / 0 ? 1 : 0) : (i = n < 0, n = Math.abs(n), n >= Math.pow(2, 1 - s) ? (a = Math.min(Math.floor(Math.log(n) / Math.LN2), s), r = a + s, o = Math.round(n * Math.pow(2, t - a) - Math.pow(2, t))) : (r = 0, o = Math.round(n / Math.pow(2, 1 - s - t))));
  const l = [];
  for (c = t; c; c -= 1)
    l.push(o % 2 ? 1 : 0), o = Math.floor(o / 2);
  for (c = e; c; c -= 1)
    l.push(r % 2 ? 1 : 0), r = Math.floor(r / 2);
  l.push(i ? 1 : 0), l.reverse();
  const u = l.join("");
  let h = "";
  for (c = 0; c < 64; c += 8) {
    let d = parseInt(u.substr(c, 8), 2).toString(16);
    d.length === 1 && (d = "0" + d), h = h + d;
  }
  return h.toLowerCase();
}, ql = function() {
  return !!(typeof window == "object" && window.chrome && window.chrome.extension && !/^chrome/.test(window.location.href));
}, jl = function() {
  return typeof Windows == "object" && typeof Windows.UI == "object";
}, Gl = new RegExp("^-?(0*)\\d{1,10}$"), zl = -2147483648, Yl = 2147483647, _s = function(n) {
  if (Gl.test(n)) {
    const e = Number(n);
    if (e >= zl && e <= Yl)
      return e;
  }
  return null;
}, Ye = function(n) {
  try {
    n();
  } catch (e) {
    setTimeout(() => {
      const t = e.stack || "";
      throw F("Exception was thrown by user callback.", t), e;
    }, Math.floor(0));
  }
}, Ql = function() {
  return (typeof window == "object" && window.navigator && window.navigator.userAgent || "").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i) >= 0;
}, We = function(n, e) {
  const t = setTimeout(n, e);
  return typeof t == "number" && // @ts-ignore Is only defined in Deno environments.
  typeof Deno < "u" && // @ts-ignore Deno and unrefTimer are only defined in Deno environments.
  Deno.unrefTimer ? Deno.unrefTimer(t) : typeof t == "object" && t.unref && t.unref(), t;
};
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
class Xl {
  constructor(e, t) {
    this.appCheckProvider = t, this.appName = e.name, _a(e) && e.settings.appCheckToken && (this.serverAppAppCheckToken = e.settings.appCheckToken), this.appCheck = t == null ? void 0 : t.getImmediate({ optional: !0 }), this.appCheck || t == null || t.get().then((s) => this.appCheck = s);
  }
  getToken(e) {
    if (this.serverAppAppCheckToken) {
      if (e)
        throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");
      return Promise.resolve({ token: this.serverAppAppCheckToken });
    }
    return this.appCheck ? this.appCheck.getToken(e) : new Promise((t, s) => {
      setTimeout(() => {
        this.appCheck ? this.getToken(e).then(t, s) : t(null);
      }, 0);
    });
  }
  addTokenChangeListener(e) {
    var t;
    (t = this.appCheckProvider) == null || t.get().then((s) => s.addTokenListener(e));
  }
  notifyForInvalidToken() {
    F(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`);
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
class Jl {
  constructor(e, t, s) {
    this.appName_ = e, this.firebaseOptions_ = t, this.authProvider_ = s, this.auth_ = null, this.auth_ = s.getImmediate({ optional: !0 }), this.auth_ || s.onInit((i) => this.auth_ = i);
  }
  getToken(e) {
    return this.auth_ ? this.auth_.getToken(e).catch((t) => t && t.code === "auth/token-not-initialized" ? (D("Got auth/token-not-initialized error.  Treating as null token."), null) : Promise.reject(t)) : new Promise((t, s) => {
      setTimeout(() => {
        this.auth_ ? this.getToken(e).then(t, s) : t(null);
      }, 0);
    });
  }
  addTokenChangeListener(e) {
    this.auth_ ? this.auth_.addAuthTokenListener(e) : this.authProvider_.get().then((t) => t.addAuthTokenListener(e));
  }
  removeTokenChangeListener(e) {
    this.authProvider_.get().then((t) => t.removeAuthTokenListener(e));
  }
  notifyForInvalidToken() {
    let e = 'Provided authentication credentials for the app named "' + this.appName_ + '" are invalid. This usually indicates your app was not initialized correctly. ';
    "credential" in this.firebaseOptions_ ? e += 'Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.' : "serviceAccount" in this.firebaseOptions_ ? e += 'Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.' : e += 'Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.', F(e);
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
const An = "5", $i = "v", Vi = "s", qi = "r", ji = "f", Gi = /(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/, zi = "ls", Yi = "p", tn = "ac", Qi = "websocket", Xi = "long_polling";
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
class Zl {
  /**
   * @param host - Hostname portion of the url for the repo
   * @param secure - Whether or not this repo is accessed over ssl
   * @param namespace - The namespace represented by the repo
   * @param webSocketOnly - Whether to prefer websockets over all other transports (used by Nest).
   * @param nodeAdmin - Whether this instance uses Admin SDK credentials
   * @param persistenceKey - Override the default session persistence storage key
   */
  constructor(e, t, s, i, r = !1, o = "", a = !1, c = !1, l = null) {
    this.secure = t, this.namespace = s, this.webSocketOnly = i, this.nodeAdmin = r, this.persistenceKey = o, this.includeNamespaceInQueryParams = a, this.isUsingEmulator = c, this.emulatorOptions = l, this._host = e.toLowerCase(), this._domain = this._host.substr(this._host.indexOf(".") + 1), this.internalHost = ce.get("host:" + e) || this._host;
  }
  isCacheableHost() {
    return this.internalHost.substr(0, 2) === "s-";
  }
  isCustomHost() {
    return this._domain !== "firebaseio.com" && this._domain !== "firebaseio-demo.com";
  }
  get host() {
    return this._host;
  }
  set host(e) {
    e !== this.internalHost && (this.internalHost = e, this.isCacheableHost() && ce.set("host:" + this._host, this.internalHost));
  }
  toString() {
    let e = this.toURLString();
    return this.persistenceKey && (e += "<" + this.persistenceKey + ">"), e;
  }
  toURLString() {
    const e = this.secure ? "https://" : "http://", t = this.includeNamespaceInQueryParams ? `?ns=${this.namespace}` : "";
    return `${e}${this.host}/${t}`;
  }
}
function eh(n) {
  return n.host !== n.internalHost || n.isCustomHost() || n.includeNamespaceInQueryParams;
}
function Ji(n, e, t) {
  f(typeof e == "string", "typeof type must == string"), f(typeof t == "object", "typeof params must == object");
  let s;
  if (e === Qi)
    s = (n.secure ? "wss://" : "ws://") + n.internalHost + "/.ws?";
  else if (e === Xi)
    s = (n.secure ? "https://" : "http://") + n.internalHost + "/.lp?";
  else
    throw new Error("Unknown connection type: " + e);
  eh(n) && (t.ns = n.namespace);
  const i = [];
  return B(t, (r, o) => {
    i.push(r + "=" + o);
  }), s + i.join("&");
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
class th {
  constructor() {
    this.counters_ = {};
  }
  incrementCounter(e, t = 1) {
    J(this.counters_, e) || (this.counters_[e] = 0), this.counters_[e] += t;
  }
  get() {
    return eo(this.counters_);
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
const Bt = {}, Wt = {};
function kn(n) {
  const e = n.toString();
  return Bt[e] || (Bt[e] = new th()), Bt[e];
}
function nh(n, e) {
  const t = n.toString();
  return Wt[t] || (Wt[t] = e()), Wt[t];
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
class sh {
  /**
   * @param onMessage_
   */
  constructor(e) {
    this.onMessage_ = e, this.pendingResponses = [], this.currentResponseNum = 0, this.closeAfterResponse = -1, this.onClose = null;
  }
  closeAfter(e, t) {
    this.closeAfterResponse = e, this.onClose = t, this.closeAfterResponse < this.currentResponseNum && (this.onClose(), this.onClose = null);
  }
  /**
   * Each message from the server comes with a response number, and an array of data. The responseNumber
   * allows us to ensure that we process them in the right order, since we can't be guaranteed that all
   * browsers will respond in the same order as the requests we sent
   */
  handleResponse(e, t) {
    for (this.pendingResponses[e] = t; this.pendingResponses[this.currentResponseNum]; ) {
      const s = this.pendingResponses[this.currentResponseNum];
      delete this.pendingResponses[this.currentResponseNum];
      for (let i = 0; i < s.length; ++i)
        s[i] && Ye(() => {
          this.onMessage_(s[i]);
        });
      if (this.currentResponseNum === this.closeAfterResponse) {
        this.onClose && (this.onClose(), this.onClose = null);
        break;
      }
      this.currentResponseNum++;
    }
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
const gs = "start", ih = "close", rh = "pLPCommand", oh = "pRTLPCB", Zi = "id", er = "pw", tr = "ser", ah = "cb", ch = "seg", lh = "ts", hh = "d", uh = "dframe", nr = 1870, sr = 30, dh = nr - sr, fh = 25e3, ph = 3e4;
class be {
  /**
   * @param connId An identifier for this connection, used for logging
   * @param repoInfo The info for the endpoint to send data to.
   * @param applicationId The Firebase App ID for this project.
   * @param appCheckToken The AppCheck token for this client.
   * @param authToken The AuthToken to use for this connection.
   * @param transportSessionId Optional transportSessionid if we are
   * reconnecting for an existing transport session
   * @param lastSessionId Optional lastSessionId if the PersistentConnection has
   * already created a connection previously
   */
  constructor(e, t, s, i, r, o, a) {
    this.connId = e, this.repoInfo = t, this.applicationId = s, this.appCheckToken = i, this.authToken = r, this.transportSessionId = o, this.lastSessionId = a, this.bytesSent = 0, this.bytesReceived = 0, this.everConnected_ = !1, this.log_ = ze(e), this.stats_ = kn(t), this.urlFn = (c) => (this.appCheckToken && (c[tn] = this.appCheckToken), Ji(t, Xi, c));
  }
  /**
   * @param onMessage - Callback when messages arrive
   * @param onDisconnect - Callback with connection lost.
   */
  open(e, t) {
    this.curSegmentNum = 0, this.onDisconnect_ = t, this.myPacketOrderer = new sh(e), this.isClosed_ = !1, this.connectTimeoutTimer_ = setTimeout(() => {
      this.log_("Timed out trying to connect."), this.onClosed_(), this.connectTimeoutTimer_ = null;
    }, Math.floor(ph)), $l(() => {
      if (this.isClosed_)
        return;
      this.scriptTagHolder = new Dn((...r) => {
        const [o, a, c, l, u] = r;
        if (this.incrementIncomingBytes_(r), !!this.scriptTagHolder)
          if (this.connectTimeoutTimer_ && (clearTimeout(this.connectTimeoutTimer_), this.connectTimeoutTimer_ = null), this.everConnected_ = !0, o === gs)
            this.id = a, this.password = c;
          else if (o === ih)
            a ? (this.scriptTagHolder.sendNewPolls = !1, this.myPacketOrderer.closeAfter(a, () => {
              this.onClosed_();
            })) : this.onClosed_();
          else
            throw new Error("Unrecognized command received: " + o);
      }, (...r) => {
        const [o, a] = r;
        this.incrementIncomingBytes_(r), this.myPacketOrderer.handleResponse(o, a);
      }, () => {
        this.onClosed_();
      }, this.urlFn);
      const s = {};
      s[gs] = "t", s[tr] = Math.floor(Math.random() * 1e8), this.scriptTagHolder.uniqueCallbackIdentifier && (s[ah] = this.scriptTagHolder.uniqueCallbackIdentifier), s[$i] = An, this.transportSessionId && (s[Vi] = this.transportSessionId), this.lastSessionId && (s[zi] = this.lastSessionId), this.applicationId && (s[Yi] = this.applicationId), this.appCheckToken && (s[tn] = this.appCheckToken), typeof location < "u" && location.hostname && Gi.test(location.hostname) && (s[qi] = ji);
      const i = this.urlFn(s);
      this.log_("Connecting via long-poll to " + i), this.scriptTagHolder.addTag(i, () => {
      });
    });
  }
  /**
   * Call this when a handshake has completed successfully and we want to consider the connection established
   */
  start() {
    this.scriptTagHolder.startLongPoll(this.id, this.password), this.addDisconnectPingFrame(this.id, this.password);
  }
  /**
   * Forces long polling to be considered as a potential transport
   */
  static forceAllow() {
    be.forceAllow_ = !0;
  }
  /**
   * Forces longpolling to not be considered as a potential transport
   */
  static forceDisallow() {
    be.forceDisallow_ = !0;
  }
  // Static method, use string literal so it can be accessed in a generic way
  static isAvailable() {
    return be.forceAllow_ ? !0 : !be.forceDisallow_ && typeof document < "u" && document.createElement != null && !ql() && !jl();
  }
  /**
   * No-op for polling
   */
  markConnectionHealthy() {
  }
  /**
   * Stops polling and cleans up the iframe
   */
  shutdown_() {
    this.isClosed_ = !0, this.scriptTagHolder && (this.scriptTagHolder.close(), this.scriptTagHolder = null), this.myDisconnFrame && (document.body.removeChild(this.myDisconnFrame), this.myDisconnFrame = null), this.connectTimeoutTimer_ && (clearTimeout(this.connectTimeoutTimer_), this.connectTimeoutTimer_ = null);
  }
  /**
   * Triggered when this transport is closed
   */
  onClosed_() {
    this.isClosed_ || (this.log_("Longpoll is closing itself"), this.shutdown_(), this.onDisconnect_ && (this.onDisconnect_(this.everConnected_), this.onDisconnect_ = null));
  }
  /**
   * External-facing close handler. RealTime has requested we shut down. Kill our connection and tell the server
   * that we've left.
   */
  close() {
    this.isClosed_ || (this.log_("Longpoll is being closed."), this.shutdown_());
  }
  /**
   * Send the JSON object down to the server. It will need to be stringified, base64 encoded, and then
   * broken into chunks (since URLs have a small maximum length).
   * @param data - The JSON data to transmit.
   */
  send(e) {
    const t = k(e);
    this.bytesSent += t.length, this.stats_.incrementCounter("bytes_sent", t.length);
    const s = Xs(t), i = Hi(s, dh);
    for (let r = 0; r < i.length; r++)
      this.scriptTagHolder.enqueueSegment(this.curSegmentNum, i.length, i[r]), this.curSegmentNum++;
  }
  /**
   * This is how we notify the server that we're leaving.
   * We aren't able to send requests with DHTML on a window close event, but we can
   * trigger XHR requests in some browsers (everything but Opera basically).
   */
  addDisconnectPingFrame(e, t) {
    this.myDisconnFrame = document.createElement("iframe");
    const s = {};
    s[uh] = "t", s[Zi] = e, s[er] = t, this.myDisconnFrame.src = this.urlFn(s), this.myDisconnFrame.style.display = "none", document.body.appendChild(this.myDisconnFrame);
  }
  /**
   * Used to track the bytes received by this client
   */
  incrementIncomingBytes_(e) {
    const t = k(e).length;
    this.bytesReceived += t, this.stats_.incrementCounter("bytes_received", t);
  }
}
class Dn {
  /**
   * @param commandCB - The callback to be called when control commands are received from the server.
   * @param onMessageCB - The callback to be triggered when responses arrive from the server.
   * @param onDisconnect - The callback to be triggered when this tag holder is closed
   * @param urlFn - A function that provides the URL of the endpoint to send data to.
   */
  constructor(e, t, s, i) {
    this.onDisconnect = s, this.urlFn = i, this.outstandingRequests = /* @__PURE__ */ new Set(), this.pendingSegs = [], this.currentSerial = Math.floor(Math.random() * 1e8), this.sendNewPolls = !0;
    {
      this.uniqueCallbackIdentifier = Wl(), window[rh + this.uniqueCallbackIdentifier] = e, window[oh + this.uniqueCallbackIdentifier] = t, this.myIFrame = Dn.createIFrame_();
      let r = "";
      this.myIFrame.src && this.myIFrame.src.substr(0, 11) === "javascript:" && (r = '<script>document.domain="' + document.domain + '";<\/script>');
      const o = "<html><body>" + r + "</body></html>";
      try {
        this.myIFrame.doc.open(), this.myIFrame.doc.write(o), this.myIFrame.doc.close();
      } catch (a) {
        D("frame writing exception"), a.stack && D(a.stack), D(a);
      }
    }
  }
  /**
   * Each browser has its own funny way to handle iframes. Here we mush them all together into one object that I can
   * actually use.
   */
  static createIFrame_() {
    const e = document.createElement("iframe");
    if (e.style.display = "none", document.body) {
      document.body.appendChild(e);
      try {
        e.contentWindow.document || D("No IE domain setting required");
      } catch {
        const s = document.domain;
        e.src = "javascript:void((function(){document.open();document.domain='" + s + "';document.close();})())";
      }
    } else
      throw "Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
    return e.contentDocument ? e.doc = e.contentDocument : e.contentWindow ? e.doc = e.contentWindow.document : e.document && (e.doc = e.document), e;
  }
  /**
   * Cancel all outstanding queries and remove the frame.
   */
  close() {
    this.alive = !1, this.myIFrame && (this.myIFrame.doc.body.textContent = "", setTimeout(() => {
      this.myIFrame !== null && (document.body.removeChild(this.myIFrame), this.myIFrame = null);
    }, Math.floor(0)));
    const e = this.onDisconnect;
    e && (this.onDisconnect = null, e());
  }
  /**
   * Actually start the long-polling session by adding the first script tag(s) to the iframe.
   * @param id - The ID of this connection
   * @param pw - The password for this connection
   */
  startLongPoll(e, t) {
    for (this.myID = e, this.myPW = t, this.alive = !0; this.newRequest_(); )
      ;
  }
  /**
   * This is called any time someone might want a script tag to be added. It adds a script tag when there aren't
   * too many outstanding requests and we are still alive.
   *
   * If there are outstanding packet segments to send, it sends one. If there aren't, it sends a long-poll anyways if
   * needed.
   */
  newRequest_() {
    if (this.alive && this.sendNewPolls && this.outstandingRequests.size < (this.pendingSegs.length > 0 ? 2 : 1)) {
      this.currentSerial++;
      const e = {};
      e[Zi] = this.myID, e[er] = this.myPW, e[tr] = this.currentSerial;
      let t = this.urlFn(e), s = "", i = 0;
      for (; this.pendingSegs.length > 0 && this.pendingSegs[0].d.length + sr + s.length <= nr; ) {
        const o = this.pendingSegs.shift();
        s = s + "&" + ch + i + "=" + o.seg + "&" + lh + i + "=" + o.ts + "&" + hh + i + "=" + o.d, i++;
      }
      return t = t + s, this.addLongPollTag_(t, this.currentSerial), !0;
    } else
      return !1;
  }
  /**
   * Queue a packet for transmission to the server.
   * @param segnum - A sequential id for this packet segment used for reassembly
   * @param totalsegs - The total number of segments in this packet
   * @param data - The data for this segment.
   */
  enqueueSegment(e, t, s) {
    this.pendingSegs.push({ seg: e, ts: t, d: s }), this.alive && this.newRequest_();
  }
  /**
   * Add a script tag for a regular long-poll request.
   * @param url - The URL of the script tag.
   * @param serial - The serial number of the request.
   */
  addLongPollTag_(e, t) {
    this.outstandingRequests.add(t);
    const s = () => {
      this.outstandingRequests.delete(t), this.newRequest_();
    }, i = setTimeout(s, Math.floor(fh)), r = () => {
      clearTimeout(i), s();
    };
    this.addTag(e, r);
  }
  /**
   * Add an arbitrary script tag to the iframe.
   * @param url - The URL for the script tag source.
   * @param loadCB - A callback to be triggered once the script has loaded.
   */
  addTag(e, t) {
    setTimeout(() => {
      try {
        if (!this.sendNewPolls)
          return;
        const s = this.myIFrame.doc.createElement("script");
        s.type = "text/javascript", s.async = !0, s.src = e, s.onload = s.onreadystatechange = function() {
          const i = s.readyState;
          (!i || i === "loaded" || i === "complete") && (s.onload = s.onreadystatechange = null, s.parentNode && s.parentNode.removeChild(s), t());
        }, s.onerror = () => {
          D("Long-poll script failed to load: " + e), this.sendNewPolls = !1, this.close();
        }, this.myIFrame.doc.body.appendChild(s);
      } catch {
      }
    }, Math.floor(1));
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
const _h = 16384, gh = 45e3;
let ct = null;
typeof MozWebSocket < "u" ? ct = MozWebSocket : typeof WebSocket < "u" && (ct = WebSocket);
class W {
  /**
   * @param connId identifier for this transport
   * @param repoInfo The info for the websocket endpoint.
   * @param applicationId The Firebase App ID for this project.
   * @param appCheckToken The App Check Token for this client.
   * @param authToken The Auth Token for this client.
   * @param transportSessionId Optional transportSessionId if this is connecting
   * to an existing transport session
   * @param lastSessionId Optional lastSessionId if there was a previous
   * connection
   */
  constructor(e, t, s, i, r, o, a) {
    this.connId = e, this.applicationId = s, this.appCheckToken = i, this.authToken = r, this.keepaliveTimer = null, this.frames = null, this.totalFrames = 0, this.bytesSent = 0, this.bytesReceived = 0, this.log_ = ze(this.connId), this.stats_ = kn(t), this.connURL = W.connectionURL_(t, o, a, i, s), this.nodeAdmin = t.nodeAdmin;
  }
  /**
   * @param repoInfo - The info for the websocket endpoint.
   * @param transportSessionId - Optional transportSessionId if this is connecting to an existing transport
   *                                         session
   * @param lastSessionId - Optional lastSessionId if there was a previous connection
   * @returns connection url
   */
  static connectionURL_(e, t, s, i, r) {
    const o = {};
    return o[$i] = An, typeof location < "u" && location.hostname && Gi.test(location.hostname) && (o[qi] = ji), t && (o[Vi] = t), s && (o[zi] = s), i && (o[tn] = i), r && (o[Yi] = r), Ji(e, Qi, o);
  }
  /**
   * @param onMessage - Callback when messages arrive
   * @param onDisconnect - Callback with connection lost.
   */
  open(e, t) {
    this.onDisconnect = t, this.onMessage = e, this.log_("Websocket connecting to " + this.connURL), this.everConnected_ = !1, ce.set("previous_websocket_failure", !0);
    try {
      let s;
      lo(), this.mySock = new ct(this.connURL, [], s);
    } catch (s) {
      this.log_("Error instantiating WebSocket.");
      const i = s.message || s.data;
      i && this.log_(i), this.onClosed_();
      return;
    }
    this.mySock.onopen = () => {
      this.log_("Websocket connected."), this.everConnected_ = !0;
    }, this.mySock.onclose = () => {
      this.log_("Websocket connection was disconnected."), this.mySock = null, this.onClosed_();
    }, this.mySock.onmessage = (s) => {
      this.handleIncomingFrame(s);
    }, this.mySock.onerror = (s) => {
      this.log_("WebSocket error.  Closing connection.");
      const i = s.message || s.data;
      i && this.log_(i), this.onClosed_();
    };
  }
  /**
   * No-op for websockets, we don't need to do anything once the connection is confirmed as open
   */
  start() {
  }
  static forceDisallow() {
    W.forceDisallow_ = !0;
  }
  static isAvailable() {
    let e = !1;
    if (typeof navigator < "u" && navigator.userAgent) {
      const t = /Android ([0-9]{0,}\.[0-9]{0,})/, s = navigator.userAgent.match(t);
      s && s.length > 1 && parseFloat(s[1]) < 4.4 && (e = !0);
    }
    return !e && ct !== null && !W.forceDisallow_;
  }
  /**
   * Returns true if we previously failed to connect with this transport.
   */
  static previouslyFailed() {
    return ce.isInMemoryStorage || ce.get("previous_websocket_failure") === !0;
  }
  markConnectionHealthy() {
    ce.remove("previous_websocket_failure");
  }
  appendFrame_(e) {
    if (this.frames.push(e), this.frames.length === this.totalFrames) {
      const t = this.frames.join("");
      this.frames = null;
      const s = $e(t);
      this.onMessage(s);
    }
  }
  /**
   * @param frameCount - The number of frames we are expecting from the server
   */
  handleNewFrameCount_(e) {
    this.totalFrames = e, this.frames = [];
  }
  /**
   * Attempts to parse a frame count out of some text. If it can't, assumes a value of 1
   * @returns Any remaining data to be process, or null if there is none
   */
  extractFrameCount_(e) {
    if (f(this.frames === null, "We already have a frame buffer"), e.length <= 6) {
      const t = Number(e);
      if (!isNaN(t))
        return this.handleNewFrameCount_(t), null;
    }
    return this.handleNewFrameCount_(1), e;
  }
  /**
   * Process a websocket frame that has arrived from the server.
   * @param mess - The frame data
   */
  handleIncomingFrame(e) {
    if (this.mySock === null)
      return;
    const t = e.data;
    if (this.bytesReceived += t.length, this.stats_.incrementCounter("bytes_received", t.length), this.resetKeepAlive(), this.frames !== null)
      this.appendFrame_(t);
    else {
      const s = this.extractFrameCount_(t);
      s !== null && this.appendFrame_(s);
    }
  }
  /**
   * Send a message to the server
   * @param data - The JSON object to transmit
   */
  send(e) {
    this.resetKeepAlive();
    const t = k(e);
    this.bytesSent += t.length, this.stats_.incrementCounter("bytes_sent", t.length);
    const s = Hi(t, _h);
    s.length > 1 && this.sendString_(String(s.length));
    for (let i = 0; i < s.length; i++)
      this.sendString_(s[i]);
  }
  shutdown_() {
    this.isClosed_ = !0, this.keepaliveTimer && (clearInterval(this.keepaliveTimer), this.keepaliveTimer = null), this.mySock && (this.mySock.close(), this.mySock = null);
  }
  onClosed_() {
    this.isClosed_ || (this.log_("WebSocket is closing itself"), this.shutdown_(), this.onDisconnect && (this.onDisconnect(this.everConnected_), this.onDisconnect = null));
  }
  /**
   * External-facing close handler.
   * Close the websocket and kill the connection.
   */
  close() {
    this.isClosed_ || (this.log_("WebSocket is being closed"), this.shutdown_());
  }
  /**
   * Kill the current keepalive timer and start a new one, to ensure that it always fires N seconds after
   * the last activity.
   */
  resetKeepAlive() {
    clearInterval(this.keepaliveTimer), this.keepaliveTimer = setInterval(() => {
      this.mySock && this.sendString_("0"), this.resetKeepAlive();
    }, Math.floor(gh));
  }
  /**
   * Send a string over the websocket.
   *
   * @param str - String to send.
   */
  sendString_(e) {
    try {
      this.mySock.send(e);
    } catch (t) {
      this.log_("Exception thrown from WebSocket.send():", t.message || t.data, "Closing connection."), setTimeout(this.onClosed_.bind(this), 0);
    }
  }
}
W.responsesRequiredToBeHealthy = 2;
W.healthyTimeout = 3e4;
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
class qe {
  static get ALL_TRANSPORTS() {
    return [be, W];
  }
  /**
   * Returns whether transport has been selected to ensure WebSocketConnection or BrowserPollConnection are not called after
   * TransportManager has already set up transports_
   */
  static get IS_TRANSPORT_INITIALIZED() {
    return this.globalTransportInitialized_;
  }
  /**
   * @param repoInfo - Metadata around the namespace we're connecting to
   */
  constructor(e) {
    this.initTransports_(e);
  }
  initTransports_(e) {
    const t = W && W.isAvailable();
    let s = t && !W.previouslyFailed();
    if (e.webSocketOnly && (t || F("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."), s = !0), s)
      this.transports_ = [W];
    else {
      const i = this.transports_ = [];
      for (const r of qe.ALL_TRANSPORTS)
        r && r.isAvailable() && i.push(r);
      qe.globalTransportInitialized_ = !0;
    }
  }
  /**
   * @returns The constructor for the initial transport to use
   */
  initialTransport() {
    if (this.transports_.length > 0)
      return this.transports_[0];
    throw new Error("No transports available");
  }
  /**
   * @returns The constructor for the next transport, or null
   */
  upgradeTransport() {
    return this.transports_.length > 1 ? this.transports_[1] : null;
  }
}
qe.globalTransportInitialized_ = !1;
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
const mh = 6e4, yh = 5e3, wh = 10 * 1024, bh = 100 * 1024, Ht = "t", ms = "d", Ch = "s", ys = "r", Eh = "e", ws = "o", bs = "a", Cs = "n", Es = "p", vh = "h";
class Sh {
  /**
   * @param id - an id for this connection
   * @param repoInfo_ - the info for the endpoint to connect to
   * @param applicationId_ - the Firebase App ID for this project
   * @param appCheckToken_ - The App Check Token for this device.
   * @param authToken_ - The auth token for this session.
   * @param onMessage_ - the callback to be triggered when a server-push message arrives
   * @param onReady_ - the callback to be triggered when this connection is ready to send messages.
   * @param onDisconnect_ - the callback to be triggered when a connection was lost
   * @param onKill_ - the callback to be triggered when this connection has permanently shut down.
   * @param lastSessionId - last session id in persistent connection. is used to clean up old session in real-time server
   */
  constructor(e, t, s, i, r, o, a, c, l, u) {
    this.id = e, this.repoInfo_ = t, this.applicationId_ = s, this.appCheckToken_ = i, this.authToken_ = r, this.onMessage_ = o, this.onReady_ = a, this.onDisconnect_ = c, this.onKill_ = l, this.lastSessionId = u, this.connectionCount = 0, this.pendingDataMessages = [], this.state_ = 0, this.log_ = ze("c:" + this.id + ":"), this.transportManager_ = new qe(t), this.log_("Connection created"), this.start_();
  }
  /**
   * Starts a connection attempt
   */
  start_() {
    const e = this.transportManager_.initialTransport();
    this.conn_ = new e(this.nextTransportId_(), this.repoInfo_, this.applicationId_, this.appCheckToken_, this.authToken_, null, this.lastSessionId), this.primaryResponsesRequired_ = e.responsesRequiredToBeHealthy || 0;
    const t = this.connReceiver_(this.conn_), s = this.disconnReceiver_(this.conn_);
    this.tx_ = this.conn_, this.rx_ = this.conn_, this.secondaryConn_ = null, this.isHealthy_ = !1, setTimeout(() => {
      this.conn_ && this.conn_.open(t, s);
    }, Math.floor(0));
    const i = e.healthyTimeout || 0;
    i > 0 && (this.healthyTimeout_ = We(() => {
      this.healthyTimeout_ = null, this.isHealthy_ || (this.conn_ && this.conn_.bytesReceived > bh ? (this.log_("Connection exceeded healthy timeout but has received " + this.conn_.bytesReceived + " bytes.  Marking connection healthy."), this.isHealthy_ = !0, this.conn_.markConnectionHealthy()) : this.conn_ && this.conn_.bytesSent > wh ? this.log_("Connection exceeded healthy timeout but has sent " + this.conn_.bytesSent + " bytes.  Leaving connection alive.") : (this.log_("Closing unhealthy connection after timeout."), this.close()));
    }, Math.floor(i)));
  }
  nextTransportId_() {
    return "c:" + this.id + ":" + this.connectionCount++;
  }
  disconnReceiver_(e) {
    return (t) => {
      e === this.conn_ ? this.onConnectionLost_(t) : e === this.secondaryConn_ ? (this.log_("Secondary connection lost."), this.onSecondaryConnectionLost_()) : this.log_("closing an old connection");
    };
  }
  connReceiver_(e) {
    return (t) => {
      this.state_ !== 2 && (e === this.rx_ ? this.onPrimaryMessageReceived_(t) : e === this.secondaryConn_ ? this.onSecondaryMessageReceived_(t) : this.log_("message on old connection"));
    };
  }
  /**
   * @param dataMsg - An arbitrary data message to be sent to the server
   */
  sendRequest(e) {
    const t = { t: "d", d: e };
    this.sendData_(t);
  }
  tryCleanupConnection() {
    this.tx_ === this.secondaryConn_ && this.rx_ === this.secondaryConn_ && (this.log_("cleaning up and promoting a connection: " + this.secondaryConn_.connId), this.conn_ = this.secondaryConn_, this.secondaryConn_ = null);
  }
  onSecondaryControl_(e) {
    if (Ht in e) {
      const t = e[Ht];
      t === bs ? this.upgradeIfSecondaryHealthy_() : t === ys ? (this.log_("Got a reset on secondary, closing it"), this.secondaryConn_.close(), (this.tx_ === this.secondaryConn_ || this.rx_ === this.secondaryConn_) && this.close()) : t === ws && (this.log_("got pong on secondary."), this.secondaryResponsesRequired_--, this.upgradeIfSecondaryHealthy_());
    }
  }
  onSecondaryMessageReceived_(e) {
    const t = xe("t", e), s = xe("d", e);
    if (t === "c")
      this.onSecondaryControl_(s);
    else if (t === "d")
      this.pendingDataMessages.push(s);
    else
      throw new Error("Unknown protocol layer: " + t);
  }
  upgradeIfSecondaryHealthy_() {
    this.secondaryResponsesRequired_ <= 0 ? (this.log_("Secondary connection is healthy."), this.isHealthy_ = !0, this.secondaryConn_.markConnectionHealthy(), this.proceedWithUpgrade_()) : (this.log_("sending ping on secondary."), this.secondaryConn_.send({ t: "c", d: { t: Es, d: {} } }));
  }
  proceedWithUpgrade_() {
    this.secondaryConn_.start(), this.log_("sending client ack on secondary"), this.secondaryConn_.send({ t: "c", d: { t: bs, d: {} } }), this.log_("Ending transmission on primary"), this.conn_.send({ t: "c", d: { t: Cs, d: {} } }), this.tx_ = this.secondaryConn_, this.tryCleanupConnection();
  }
  onPrimaryMessageReceived_(e) {
    const t = xe("t", e), s = xe("d", e);
    t === "c" ? this.onControl_(s) : t === "d" && this.onDataMessage_(s);
  }
  onDataMessage_(e) {
    this.onPrimaryResponse_(), this.onMessage_(e);
  }
  onPrimaryResponse_() {
    this.isHealthy_ || (this.primaryResponsesRequired_--, this.primaryResponsesRequired_ <= 0 && (this.log_("Primary connection is healthy."), this.isHealthy_ = !0, this.conn_.markConnectionHealthy()));
  }
  onControl_(e) {
    const t = xe(Ht, e);
    if (ms in e) {
      const s = e[ms];
      if (t === vh) {
        const i = {
          ...s
        };
        this.repoInfo_.isUsingEmulator && (i.h = this.repoInfo_.host), this.onHandshake_(i);
      } else if (t === Cs) {
        this.log_("recvd end transmission on primary"), this.rx_ = this.secondaryConn_;
        for (let i = 0; i < this.pendingDataMessages.length; ++i)
          this.onDataMessage_(this.pendingDataMessages[i]);
        this.pendingDataMessages = [], this.tryCleanupConnection();
      } else t === Ch ? this.onConnectionShutdown_(s) : t === ys ? this.onReset_(s) : t === Eh ? en("Server Error: " + s) : t === ws ? (this.log_("got pong on primary."), this.onPrimaryResponse_(), this.sendPingOnPrimaryIfNecessary_()) : en("Unknown control packet command: " + t);
    }
  }
  /**
   * @param handshake - The handshake data returned from the server
   */
  onHandshake_(e) {
    const t = e.ts, s = e.v, i = e.h;
    this.sessionId = e.s, this.repoInfo_.host = i, this.state_ === 0 && (this.conn_.start(), this.onConnectionEstablished_(this.conn_, t), An !== s && F("Protocol version mismatch detected"), this.tryStartUpgrade_());
  }
  tryStartUpgrade_() {
    const e = this.transportManager_.upgradeTransport();
    e && this.startUpgrade_(e);
  }
  startUpgrade_(e) {
    this.secondaryConn_ = new e(this.nextTransportId_(), this.repoInfo_, this.applicationId_, this.appCheckToken_, this.authToken_, this.sessionId), this.secondaryResponsesRequired_ = e.responsesRequiredToBeHealthy || 0;
    const t = this.connReceiver_(this.secondaryConn_), s = this.disconnReceiver_(this.secondaryConn_);
    this.secondaryConn_.open(t, s), We(() => {
      this.secondaryConn_ && (this.log_("Timed out trying to upgrade."), this.secondaryConn_.close());
    }, Math.floor(mh));
  }
  onReset_(e) {
    this.log_("Reset packet received.  New host: " + e), this.repoInfo_.host = e, this.state_ === 1 ? this.close() : (this.closeConnections_(), this.start_());
  }
  onConnectionEstablished_(e, t) {
    this.log_("Realtime connection established."), this.conn_ = e, this.state_ = 1, this.onReady_ && (this.onReady_(t, this.sessionId), this.onReady_ = null), this.primaryResponsesRequired_ === 0 ? (this.log_("Primary connection is healthy."), this.isHealthy_ = !0) : We(() => {
      this.sendPingOnPrimaryIfNecessary_();
    }, Math.floor(yh));
  }
  sendPingOnPrimaryIfNecessary_() {
    !this.isHealthy_ && this.state_ === 1 && (this.log_("sending ping on primary."), this.sendData_({ t: "c", d: { t: Es, d: {} } }));
  }
  onSecondaryConnectionLost_() {
    const e = this.secondaryConn_;
    this.secondaryConn_ = null, (this.tx_ === e || this.rx_ === e) && this.close();
  }
  /**
   * @param everConnected - Whether or not the connection ever reached a server. Used to determine if
   * we should flush the host cache
   */
  onConnectionLost_(e) {
    this.conn_ = null, !e && this.state_ === 0 ? (this.log_("Realtime connection failed."), this.repoInfo_.isCacheableHost() && (ce.remove("host:" + this.repoInfo_.host), this.repoInfo_.internalHost = this.repoInfo_.host)) : this.state_ === 1 && this.log_("Realtime connection lost."), this.close();
  }
  onConnectionShutdown_(e) {
    this.log_("Connection shutdown command received. Shutting down..."), this.onKill_ && (this.onKill_(e), this.onKill_ = null), this.onDisconnect_ = null, this.close();
  }
  sendData_(e) {
    if (this.state_ !== 1)
      throw "Connection is not connected";
    this.tx_.send(e);
  }
  /**
   * Cleans up this connection, calling the appropriate callbacks
   */
  close() {
    this.state_ !== 2 && (this.log_("Closing realtime connection."), this.state_ = 2, this.closeConnections_(), this.onDisconnect_ && (this.onDisconnect_(), this.onDisconnect_ = null));
  }
  closeConnections_() {
    this.log_("Shutting down all connections"), this.conn_ && (this.conn_.close(), this.conn_ = null), this.secondaryConn_ && (this.secondaryConn_.close(), this.secondaryConn_ = null), this.healthyTimeout_ && (clearTimeout(this.healthyTimeout_), this.healthyTimeout_ = null);
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
class ir {
  put(e, t, s, i) {
  }
  merge(e, t, s, i) {
  }
  /**
   * Refreshes the auth token for the current connection.
   * @param token - The authentication token
   */
  refreshAuthToken(e) {
  }
  /**
   * Refreshes the app check token for the current connection.
   * @param token The app check token
   */
  refreshAppCheckToken(e) {
  }
  onDisconnectPut(e, t, s) {
  }
  onDisconnectMerge(e, t, s) {
  }
  onDisconnectCancel(e, t) {
  }
  reportStats(e) {
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
class rr {
  constructor(e) {
    this.allowedEvents_ = e, this.listeners_ = {}, f(Array.isArray(e) && e.length > 0, "Requires a non-empty array");
  }
  /**
   * To be called by derived classes to trigger events.
   */
  trigger(e, ...t) {
    if (Array.isArray(this.listeners_[e])) {
      const s = [...this.listeners_[e]];
      for (let i = 0; i < s.length; i++)
        s[i].callback.apply(s[i].context, t);
    }
  }
  on(e, t, s) {
    this.validateEventType_(e), this.listeners_[e] = this.listeners_[e] || [], this.listeners_[e].push({ callback: t, context: s });
    const i = this.getInitialEvent(e);
    i && t.apply(s, i);
  }
  off(e, t, s) {
    this.validateEventType_(e);
    const i = this.listeners_[e] || [];
    for (let r = 0; r < i.length; r++)
      if (i[r].callback === t && (!s || s === i[r].context)) {
        i.splice(r, 1);
        return;
      }
  }
  validateEventType_(e) {
    f(this.allowedEvents_.find((t) => t === e), "Unknown event: " + e);
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
class lt extends rr {
  static getInstance() {
    return new lt();
  }
  constructor() {
    super(["online"]), this.online_ = !0, typeof window < "u" && typeof window.addEventListener < "u" && !ti() && (window.addEventListener("online", () => {
      this.online_ || (this.online_ = !0, this.trigger("online", !0));
    }, !1), window.addEventListener("offline", () => {
      this.online_ && (this.online_ = !1, this.trigger("online", !1));
    }, !1));
  }
  getInitialEvent(e) {
    return f(e === "online", "Unknown event type: " + e), [this.online_];
  }
  currentlyOnline() {
    return this.online_;
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
const vs = 32, Ss = 768;
class T {
  /**
   * @param pathOrString - Path string to parse, or another path, or the raw
   * tokens array
   */
  constructor(e, t) {
    if (t === void 0) {
      this.pieces_ = e.split("/");
      let s = 0;
      for (let i = 0; i < this.pieces_.length; i++)
        this.pieces_[i].length > 0 && (this.pieces_[s] = this.pieces_[i], s++);
      this.pieces_.length = s, this.pieceNum_ = 0;
    } else
      this.pieces_ = e, this.pieceNum_ = t;
  }
  toString() {
    let e = "";
    for (let t = this.pieceNum_; t < this.pieces_.length; t++)
      this.pieces_[t] !== "" && (e += "/" + this.pieces_[t]);
    return e || "/";
  }
}
function C() {
  return new T("");
}
function y(n) {
  return n.pieceNum_ >= n.pieces_.length ? null : n.pieces_[n.pieceNum_];
}
function ie(n) {
  return n.pieces_.length - n.pieceNum_;
}
function I(n) {
  let e = n.pieceNum_;
  return e < n.pieces_.length && e++, new T(n.pieces_, e);
}
function or(n) {
  return n.pieceNum_ < n.pieces_.length ? n.pieces_[n.pieces_.length - 1] : null;
}
function Ih(n) {
  let e = "";
  for (let t = n.pieceNum_; t < n.pieces_.length; t++)
    n.pieces_[t] !== "" && (e += "/" + encodeURIComponent(String(n.pieces_[t])));
  return e || "/";
}
function ar(n, e = 0) {
  return n.pieces_.slice(n.pieceNum_ + e);
}
function cr(n) {
  if (n.pieceNum_ >= n.pieces_.length)
    return null;
  const e = [];
  for (let t = n.pieceNum_; t < n.pieces_.length - 1; t++)
    e.push(n.pieces_[t]);
  return new T(e, 0);
}
function A(n, e) {
  const t = [];
  for (let s = n.pieceNum_; s < n.pieces_.length; s++)
    t.push(n.pieces_[s]);
  if (e instanceof T)
    for (let s = e.pieceNum_; s < e.pieces_.length; s++)
      t.push(e.pieces_[s]);
  else {
    const s = e.split("/");
    for (let i = 0; i < s.length; i++)
      s[i].length > 0 && t.push(s[i]);
  }
  return new T(t, 0);
}
function m(n) {
  return n.pieceNum_ >= n.pieces_.length;
}
function U(n, e) {
  const t = y(n), s = y(e);
  if (t === null)
    return e;
  if (t === s)
    return U(I(n), I(e));
  throw new Error("INTERNAL ERROR: innerPath (" + e + ") is not within outerPath (" + n + ")");
}
function lr(n, e) {
  if (ie(n) !== ie(e))
    return !1;
  for (let t = n.pieceNum_, s = e.pieceNum_; t <= n.pieces_.length; t++, s++)
    if (n.pieces_[t] !== e.pieces_[s])
      return !1;
  return !0;
}
function H(n, e) {
  let t = n.pieceNum_, s = e.pieceNum_;
  if (ie(n) > ie(e))
    return !1;
  for (; t < n.pieces_.length; ) {
    if (n.pieces_[t] !== e.pieces_[s])
      return !1;
    ++t, ++s;
  }
  return !0;
}
class Th {
  /**
   * @param path - Initial Path.
   * @param errorPrefix_ - Prefix for any error messages.
   */
  constructor(e, t) {
    this.errorPrefix_ = t, this.parts_ = ar(e, 0), this.byteLength_ = Math.max(1, this.parts_.length);
    for (let s = 0; s < this.parts_.length; s++)
      this.byteLength_ += mt(this.parts_[s]);
    hr(this);
  }
}
function Rh(n, e) {
  n.parts_.length > 0 && (n.byteLength_ += 1), n.parts_.push(e), n.byteLength_ += mt(e), hr(n);
}
function Nh(n) {
  const e = n.parts_.pop();
  n.byteLength_ -= mt(e), n.parts_.length > 0 && (n.byteLength_ -= 1);
}
function hr(n) {
  if (n.byteLength_ > Ss)
    throw new Error(n.errorPrefix_ + "has a key path longer than " + Ss + " bytes (" + n.byteLength_ + ").");
  if (n.parts_.length > vs)
    throw new Error(n.errorPrefix_ + "path specified exceeds the maximum depth that can be written (" + vs + ") or object contains a cycle " + oe(n));
}
function oe(n) {
  return n.parts_.length === 0 ? "" : "in property '" + n.parts_.join(".") + "'";
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
class On extends rr {
  static getInstance() {
    return new On();
  }
  constructor() {
    super(["visible"]);
    let e, t;
    typeof document < "u" && typeof document.addEventListener < "u" && (typeof document.hidden < "u" ? (t = "visibilitychange", e = "hidden") : typeof document.mozHidden < "u" ? (t = "mozvisibilitychange", e = "mozHidden") : typeof document.msHidden < "u" ? (t = "msvisibilitychange", e = "msHidden") : typeof document.webkitHidden < "u" && (t = "webkitvisibilitychange", e = "webkitHidden")), this.visible_ = !0, t && document.addEventListener(t, () => {
      const s = !document[e];
      s !== this.visible_ && (this.visible_ = s, this.trigger("visible", s));
    }, !1);
  }
  getInitialEvent(e) {
    return f(e === "visible", "Unknown event type: " + e), [this.visible_];
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
const Pe = 1e3, Ah = 60 * 5 * 1e3, Is = 30 * 1e3, kh = 1.3, Dh = 3e4, Oh = "server_kill", Ts = 3;
class Q extends ir {
  /**
   * @param repoInfo_ - Data about the namespace we are connecting to
   * @param applicationId_ - The Firebase App ID for this project
   * @param onDataUpdate_ - A callback for new data from the server
   */
  constructor(e, t, s, i, r, o, a, c) {
    if (super(), this.repoInfo_ = e, this.applicationId_ = t, this.onDataUpdate_ = s, this.onConnectStatus_ = i, this.onServerInfoUpdate_ = r, this.authTokenProvider_ = o, this.appCheckTokenProvider_ = a, this.authOverride_ = c, this.id = Q.nextPersistentConnectionId_++, this.log_ = ze("p:" + this.id + ":"), this.interruptReasons_ = {}, this.listens = /* @__PURE__ */ new Map(), this.outstandingPuts_ = [], this.outstandingGets_ = [], this.outstandingPutCount_ = 0, this.outstandingGetCount_ = 0, this.onDisconnectRequestQueue_ = [], this.connected_ = !1, this.reconnectDelay_ = Pe, this.maxReconnectDelay_ = Ah, this.securityDebugCallback_ = null, this.lastSessionId = null, this.establishConnectionTimer_ = null, this.visible_ = !1, this.requestCBHash_ = {}, this.requestNumber_ = 0, this.realtime_ = null, this.authToken_ = null, this.appCheckToken_ = null, this.forceTokenRefresh_ = !1, this.invalidAuthTokenCount_ = 0, this.invalidAppCheckTokenCount_ = 0, this.firstConnection_ = !0, this.lastConnectionAttemptTime_ = null, this.lastConnectionEstablishedTime_ = null, c)
      throw new Error("Auth override specified in options, but not supported on non Node.js platforms");
    On.getInstance().on("visible", this.onVisible_, this), e.host.indexOf("fblocal") === -1 && lt.getInstance().on("online", this.onOnline_, this);
  }
  sendRequest(e, t, s) {
    const i = ++this.requestNumber_, r = { r: i, a: e, b: t };
    this.log_(k(r)), f(this.connected_, "sendRequest call when we're not connected not allowed."), this.realtime_.sendRequest(r), s && (this.requestCBHash_[i] = s);
  }
  get(e) {
    this.initConnection_();
    const t = new pn(), i = {
      action: "g",
      request: {
        p: e._path.toString(),
        q: e._queryObject
      },
      onComplete: (o) => {
        const a = o.d;
        o.s === "ok" ? t.resolve(a) : t.reject(a);
      }
    };
    this.outstandingGets_.push(i), this.outstandingGetCount_++;
    const r = this.outstandingGets_.length - 1;
    return this.connected_ && this.sendGet_(r), t.promise;
  }
  listen(e, t, s, i) {
    this.initConnection_();
    const r = e._queryIdentifier, o = e._path.toString();
    this.log_("Listen called for " + o + " " + r), this.listens.has(o) || this.listens.set(o, /* @__PURE__ */ new Map()), f(e._queryParams.isDefault() || !e._queryParams.loadsAllData(), "listen() called for non-default but complete query"), f(!this.listens.get(o).has(r), "listen() called twice for same path/queryId.");
    const a = {
      onComplete: i,
      hashFn: t,
      query: e,
      tag: s
    };
    this.listens.get(o).set(r, a), this.connected_ && this.sendListen_(a);
  }
  sendGet_(e) {
    const t = this.outstandingGets_[e];
    this.sendRequest("g", t.request, (s) => {
      delete this.outstandingGets_[e], this.outstandingGetCount_--, this.outstandingGetCount_ === 0 && (this.outstandingGets_ = []), t.onComplete && t.onComplete(s);
    });
  }
  sendListen_(e) {
    const t = e.query, s = t._path.toString(), i = t._queryIdentifier;
    this.log_("Listen on " + s + " for " + i);
    const r = {
      /*path*/
      p: s
    }, o = "q";
    e.tag && (r.q = t._queryObject, r.t = e.tag), r.h = e.hashFn(), this.sendRequest(o, r, (a) => {
      const c = a.d, l = a.s;
      Q.warnOnListenWarnings_(c, t), (this.listens.get(s) && this.listens.get(s).get(i)) === e && (this.log_("listen response", a), l !== "ok" && this.removeListen_(s, i), e.onComplete && e.onComplete(l, c));
    });
  }
  static warnOnListenWarnings_(e, t) {
    if (e && typeof e == "object" && J(e, "w")) {
      const s = Se(e, "w");
      if (Array.isArray(s) && ~s.indexOf("no_index")) {
        const i = '".indexOn": "' + t._queryParams.getIndex().toString() + '"', r = t._path.toString();
        F(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${r} to your security rules for better performance.`);
      }
    }
  }
  refreshAuthToken(e) {
    this.authToken_ = e, this.log_("Auth token refreshed"), this.authToken_ ? this.tryAuth() : this.connected_ && this.sendRequest("unauth", {}, () => {
    }), this.reduceReconnectDelayIfAdminCredential_(e);
  }
  reduceReconnectDelayIfAdminCredential_(e) {
    (e && e.length === 40 || _o(e)) && (this.log_("Admin auth credential detected.  Reducing max reconnect time."), this.maxReconnectDelay_ = Is);
  }
  refreshAppCheckToken(e) {
    this.appCheckToken_ = e, this.log_("App check token refreshed"), this.appCheckToken_ ? this.tryAppCheck() : this.connected_ && this.sendRequest("unappeck", {}, () => {
    });
  }
  /**
   * Attempts to authenticate with the given credentials. If the authentication attempt fails, it's triggered like
   * a auth revoked (the connection is closed).
   */
  tryAuth() {
    if (this.connected_ && this.authToken_) {
      const e = this.authToken_, t = po(e) ? "auth" : "gauth", s = { cred: e };
      this.authOverride_ === null ? s.noauth = !0 : typeof this.authOverride_ == "object" && (s.authvar = this.authOverride_), this.sendRequest(t, s, (i) => {
        const r = i.s, o = i.d || "error";
        this.authToken_ === e && (r === "ok" ? this.invalidAuthTokenCount_ = 0 : this.onAuthRevoked_(r, o));
      });
    }
  }
  /**
   * Attempts to authenticate with the given token. If the authentication
   * attempt fails, it's triggered like the token was revoked (the connection is
   * closed).
   */
  tryAppCheck() {
    this.connected_ && this.appCheckToken_ && this.sendRequest("appcheck", { token: this.appCheckToken_ }, (e) => {
      const t = e.s, s = e.d || "error";
      t === "ok" ? this.invalidAppCheckTokenCount_ = 0 : this.onAppCheckRevoked_(t, s);
    });
  }
  /**
   * @inheritDoc
   */
  unlisten(e, t) {
    const s = e._path.toString(), i = e._queryIdentifier;
    this.log_("Unlisten called for " + s + " " + i), f(e._queryParams.isDefault() || !e._queryParams.loadsAllData(), "unlisten() called for non-default but complete query"), this.removeListen_(s, i) && this.connected_ && this.sendUnlisten_(s, i, e._queryObject, t);
  }
  sendUnlisten_(e, t, s, i) {
    this.log_("Unlisten on " + e + " for " + t);
    const r = {
      /*path*/
      p: e
    }, o = "n";
    i && (r.q = s, r.t = i), this.sendRequest(o, r);
  }
  onDisconnectPut(e, t, s) {
    this.initConnection_(), this.connected_ ? this.sendOnDisconnect_("o", e, t, s) : this.onDisconnectRequestQueue_.push({
      pathString: e,
      action: "o",
      data: t,
      onComplete: s
    });
  }
  onDisconnectMerge(e, t, s) {
    this.initConnection_(), this.connected_ ? this.sendOnDisconnect_("om", e, t, s) : this.onDisconnectRequestQueue_.push({
      pathString: e,
      action: "om",
      data: t,
      onComplete: s
    });
  }
  onDisconnectCancel(e, t) {
    this.initConnection_(), this.connected_ ? this.sendOnDisconnect_("oc", e, null, t) : this.onDisconnectRequestQueue_.push({
      pathString: e,
      action: "oc",
      data: null,
      onComplete: t
    });
  }
  sendOnDisconnect_(e, t, s, i) {
    const r = {
      /*path*/
      p: t,
      /*data*/
      d: s
    };
    this.log_("onDisconnect " + e, r), this.sendRequest(e, r, (o) => {
      i && setTimeout(() => {
        i(o.s, o.d);
      }, Math.floor(0));
    });
  }
  put(e, t, s, i) {
    this.putInternal("p", e, t, s, i);
  }
  merge(e, t, s, i) {
    this.putInternal("m", e, t, s, i);
  }
  putInternal(e, t, s, i, r) {
    this.initConnection_();
    const o = {
      /*path*/
      p: t,
      /*data*/
      d: s
    };
    r !== void 0 && (o.h = r), this.outstandingPuts_.push({
      action: e,
      request: o,
      onComplete: i
    }), this.outstandingPutCount_++;
    const a = this.outstandingPuts_.length - 1;
    this.connected_ ? this.sendPut_(a) : this.log_("Buffering put: " + t);
  }
  sendPut_(e) {
    const t = this.outstandingPuts_[e].action, s = this.outstandingPuts_[e].request, i = this.outstandingPuts_[e].onComplete;
    this.outstandingPuts_[e].queued = this.connected_, this.sendRequest(t, s, (r) => {
      this.log_(t + " response", r), delete this.outstandingPuts_[e], this.outstandingPutCount_--, this.outstandingPutCount_ === 0 && (this.outstandingPuts_ = []), i && i(r.s, r.d);
    });
  }
  reportStats(e) {
    if (this.connected_) {
      const t = {
        /*counters*/
        c: e
      };
      this.log_("reportStats", t), this.sendRequest(
        /*stats*/
        "s",
        t,
        (s) => {
          if (s.s !== "ok") {
            const r = s.d;
            this.log_("reportStats", "Error sending stats: " + r);
          }
        }
      );
    }
  }
  onDataMessage_(e) {
    if ("r" in e) {
      this.log_("from server: " + k(e));
      const t = e.r, s = this.requestCBHash_[t];
      s && (delete this.requestCBHash_[t], s(e.b));
    } else {
      if ("error" in e)
        throw "A server-side error has occurred: " + e.error;
      "a" in e && this.onDataPush_(e.a, e.b);
    }
  }
  onDataPush_(e, t) {
    this.log_("handleServerMessage", e, t), e === "d" ? this.onDataUpdate_(
      t.p,
      t.d,
      /*isMerge*/
      !1,
      t.t
    ) : e === "m" ? this.onDataUpdate_(
      t.p,
      t.d,
      /*isMerge=*/
      !0,
      t.t
    ) : e === "c" ? this.onListenRevoked_(t.p, t.q) : e === "ac" ? this.onAuthRevoked_(t.s, t.d) : e === "apc" ? this.onAppCheckRevoked_(t.s, t.d) : e === "sd" ? this.onSecurityDebugPacket_(t) : en("Unrecognized action received from server: " + k(e) + `
Are you using the latest client?`);
  }
  onReady_(e, t) {
    this.log_("connection ready"), this.connected_ = !0, this.lastConnectionEstablishedTime_ = (/* @__PURE__ */ new Date()).getTime(), this.handleTimestamp_(e), this.lastSessionId = t, this.firstConnection_ && this.sendConnectStats_(), this.restoreState_(), this.firstConnection_ = !1, this.onConnectStatus_(!0);
  }
  scheduleConnect_(e) {
    f(!this.realtime_, "Scheduling a connect when we're already connected/ing?"), this.establishConnectionTimer_ && clearTimeout(this.establishConnectionTimer_), this.establishConnectionTimer_ = setTimeout(() => {
      this.establishConnectionTimer_ = null, this.establishConnection_();
    }, Math.floor(e));
  }
  initConnection_() {
    !this.realtime_ && this.firstConnection_ && this.scheduleConnect_(0);
  }
  onVisible_(e) {
    e && !this.visible_ && this.reconnectDelay_ === this.maxReconnectDelay_ && (this.log_("Window became visible.  Reducing delay."), this.reconnectDelay_ = Pe, this.realtime_ || this.scheduleConnect_(0)), this.visible_ = e;
  }
  onOnline_(e) {
    e ? (this.log_("Browser went online."), this.reconnectDelay_ = Pe, this.realtime_ || this.scheduleConnect_(0)) : (this.log_("Browser went offline.  Killing connection."), this.realtime_ && this.realtime_.close());
  }
  onRealtimeDisconnect_() {
    if (this.log_("data client disconnected"), this.connected_ = !1, this.realtime_ = null, this.cancelSentTransactions_(), this.requestCBHash_ = {}, this.shouldReconnect_()) {
      this.visible_ ? this.lastConnectionEstablishedTime_ && ((/* @__PURE__ */ new Date()).getTime() - this.lastConnectionEstablishedTime_ > Dh && (this.reconnectDelay_ = Pe), this.lastConnectionEstablishedTime_ = null) : (this.log_("Window isn't visible.  Delaying reconnect."), this.reconnectDelay_ = this.maxReconnectDelay_, this.lastConnectionAttemptTime_ = (/* @__PURE__ */ new Date()).getTime());
      const e = Math.max(0, (/* @__PURE__ */ new Date()).getTime() - this.lastConnectionAttemptTime_);
      let t = Math.max(0, this.reconnectDelay_ - e);
      t = Math.random() * t, this.log_("Trying to reconnect in " + t + "ms"), this.scheduleConnect_(t), this.reconnectDelay_ = Math.min(this.maxReconnectDelay_, this.reconnectDelay_ * kh);
    }
    this.onConnectStatus_(!1);
  }
  async establishConnection_() {
    if (this.shouldReconnect_()) {
      this.log_("Making a connection attempt"), this.lastConnectionAttemptTime_ = (/* @__PURE__ */ new Date()).getTime(), this.lastConnectionEstablishedTime_ = null;
      const e = this.onDataMessage_.bind(this), t = this.onReady_.bind(this), s = this.onRealtimeDisconnect_.bind(this), i = this.id + ":" + Q.nextConnectionId_++, r = this.lastSessionId;
      let o = !1, a = null;
      const c = function() {
        a ? a.close() : (o = !0, s());
      }, l = function(h) {
        f(a, "sendRequest call when we're not connected not allowed."), a.sendRequest(h);
      };
      this.realtime_ = {
        close: c,
        sendRequest: l
      };
      const u = this.forceTokenRefresh_;
      this.forceTokenRefresh_ = !1;
      try {
        const [h, d] = await Promise.all([
          this.authTokenProvider_.getToken(u),
          this.appCheckTokenProvider_.getToken(u)
        ]);
        o ? D("getToken() completed but was canceled") : (D("getToken() completed. Creating connection."), this.authToken_ = h && h.accessToken, this.appCheckToken_ = d && d.token, a = new Sh(
          i,
          this.repoInfo_,
          this.applicationId_,
          this.appCheckToken_,
          this.authToken_,
          e,
          t,
          s,
          /* onKill= */
          (p) => {
            F(p + " (" + this.repoInfo_.toString() + ")"), this.interrupt(Oh);
          },
          r
        ));
      } catch (h) {
        this.log_("Failed to get token: " + h), o || (this.repoInfo_.nodeAdmin && F(h), c());
      }
    }
  }
  interrupt(e) {
    D("Interrupting connection for reason: " + e), this.interruptReasons_[e] = !0, this.realtime_ ? this.realtime_.close() : (this.establishConnectionTimer_ && (clearTimeout(this.establishConnectionTimer_), this.establishConnectionTimer_ = null), this.connected_ && this.onRealtimeDisconnect_());
  }
  resume(e) {
    D("Resuming connection for reason: " + e), delete this.interruptReasons_[e], Yn(this.interruptReasons_) && (this.reconnectDelay_ = Pe, this.realtime_ || this.scheduleConnect_(0));
  }
  handleTimestamp_(e) {
    const t = e - (/* @__PURE__ */ new Date()).getTime();
    this.onServerInfoUpdate_({ serverTimeOffset: t });
  }
  cancelSentTransactions_() {
    for (let e = 0; e < this.outstandingPuts_.length; e++) {
      const t = this.outstandingPuts_[e];
      t && /*hash*/
      "h" in t.request && t.queued && (t.onComplete && t.onComplete("disconnect"), delete this.outstandingPuts_[e], this.outstandingPutCount_--);
    }
    this.outstandingPutCount_ === 0 && (this.outstandingPuts_ = []);
  }
  onListenRevoked_(e, t) {
    let s;
    t ? s = t.map((r) => Nn(r)).join("$") : s = "default";
    const i = this.removeListen_(e, s);
    i && i.onComplete && i.onComplete("permission_denied");
  }
  removeListen_(e, t) {
    const s = new T(e).toString();
    let i;
    if (this.listens.has(s)) {
      const r = this.listens.get(s);
      i = r.get(t), r.delete(t), r.size === 0 && this.listens.delete(s);
    } else
      i = void 0;
    return i;
  }
  onAuthRevoked_(e, t) {
    D("Auth token revoked: " + e + "/" + t), this.authToken_ = null, this.forceTokenRefresh_ = !0, this.realtime_.close(), (e === "invalid_token" || e === "permission_denied") && (this.invalidAuthTokenCount_++, this.invalidAuthTokenCount_ >= Ts && (this.reconnectDelay_ = Is, this.authTokenProvider_.notifyForInvalidToken()));
  }
  onAppCheckRevoked_(e, t) {
    D("App check token revoked: " + e + "/" + t), this.appCheckToken_ = null, this.forceTokenRefresh_ = !0, (e === "invalid_token" || e === "permission_denied") && (this.invalidAppCheckTokenCount_++, this.invalidAppCheckTokenCount_ >= Ts && this.appCheckTokenProvider_.notifyForInvalidToken());
  }
  onSecurityDebugPacket_(e) {
    this.securityDebugCallback_ ? this.securityDebugCallback_(e) : "msg" in e && console.log("FIREBASE: " + e.msg.replace(`
`, `
FIREBASE: `));
  }
  restoreState_() {
    this.tryAuth(), this.tryAppCheck();
    for (const e of this.listens.values())
      for (const t of e.values())
        this.sendListen_(t);
    for (let e = 0; e < this.outstandingPuts_.length; e++)
      this.outstandingPuts_[e] && this.sendPut_(e);
    for (; this.onDisconnectRequestQueue_.length; ) {
      const e = this.onDisconnectRequestQueue_.shift();
      this.sendOnDisconnect_(e.action, e.pathString, e.data, e.onComplete);
    }
    for (let e = 0; e < this.outstandingGets_.length; e++)
      this.outstandingGets_[e] && this.sendGet_(e);
  }
  /**
   * Sends client stats for first connection
   */
  sendConnectStats_() {
    const e = {};
    let t = "js";
    e["sdk." + t + "." + Fi.replace(/\./g, "-")] = 1, ti() ? e["framework.cordova"] = 1 : co() && (e["framework.reactnative"] = 1), this.reportStats(e);
  }
  shouldReconnect_() {
    const e = lt.getInstance().currentlyOnline();
    return Yn(this.interruptReasons_) && e;
  }
}
Q.nextPersistentConnectionId_ = 0;
Q.nextConnectionId_ = 0;
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
class w {
  constructor(e, t) {
    this.name = e, this.node = t;
  }
  static Wrap(e, t) {
    return new w(e, t);
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
class Ct {
  /**
   * @returns A standalone comparison function for
   * this index
   */
  getCompare() {
    return this.compare.bind(this);
  }
  /**
   * Given a before and after value for a node, determine if the indexed value has changed. Even if they are different,
   * it's possible that the changes are isolated to parts of the snapshot that are not indexed.
   *
   *
   * @returns True if the portion of the snapshot being indexed changed between oldNode and newNode
   */
  indexedValueChanged(e, t) {
    const s = new w(Ie, e), i = new w(Ie, t);
    return this.compare(s, i) !== 0;
  }
  /**
   * @returns a node wrapper that will sort equal to or less than
   * any other node wrapper, using this index
   */
  minPost() {
    return w.MIN;
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
let et;
class ur extends Ct {
  static get __EMPTY_NODE() {
    return et;
  }
  static set __EMPTY_NODE(e) {
    et = e;
  }
  compare(e, t) {
    return Ae(e.name, t.name);
  }
  isDefinedOn(e) {
    throw Re("KeyIndex.isDefinedOn not expected to be called.");
  }
  indexedValueChanged(e, t) {
    return !1;
  }
  minPost() {
    return w.MIN;
  }
  maxPost() {
    return new w(pe, et);
  }
  makePost(e, t) {
    return f(typeof e == "string", "KeyIndex indexValue must always be a string."), new w(e, et);
  }
  /**
   * @returns String representation for inclusion in a query spec
   */
  toString() {
    return ".key";
  }
}
const ve = new ur();
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
class tt {
  /**
   * @param node - Node to iterate.
   * @param isReverse_ - Whether or not to iterate in reverse
   */
  constructor(e, t, s, i, r = null) {
    this.isReverse_ = i, this.resultGenerator_ = r, this.nodeStack_ = [];
    let o = 1;
    for (; !e.isEmpty(); )
      if (e = e, o = t ? s(e.key, t) : 1, i && (o *= -1), o < 0)
        this.isReverse_ ? e = e.left : e = e.right;
      else if (o === 0) {
        this.nodeStack_.push(e);
        break;
      } else
        this.nodeStack_.push(e), this.isReverse_ ? e = e.right : e = e.left;
  }
  getNext() {
    if (this.nodeStack_.length === 0)
      return null;
    let e = this.nodeStack_.pop(), t;
    if (this.resultGenerator_ ? t = this.resultGenerator_(e.key, e.value) : t = { key: e.key, value: e.value }, this.isReverse_)
      for (e = e.left; !e.isEmpty(); )
        this.nodeStack_.push(e), e = e.right;
    else
      for (e = e.right; !e.isEmpty(); )
        this.nodeStack_.push(e), e = e.left;
    return t;
  }
  hasNext() {
    return this.nodeStack_.length > 0;
  }
  peek() {
    if (this.nodeStack_.length === 0)
      return null;
    const e = this.nodeStack_[this.nodeStack_.length - 1];
    return this.resultGenerator_ ? this.resultGenerator_(e.key, e.value) : { key: e.key, value: e.value };
  }
}
class N {
  /**
   * @param key - Key associated with this node.
   * @param value - Value associated with this node.
   * @param color - Whether this node is red.
   * @param left - Left child.
   * @param right - Right child.
   */
  constructor(e, t, s, i, r) {
    this.key = e, this.value = t, this.color = s ?? N.RED, this.left = i ?? P.EMPTY_NODE, this.right = r ?? P.EMPTY_NODE;
  }
  /**
   * Returns a copy of the current node, optionally replacing pieces of it.
   *
   * @param key - New key for the node, or null.
   * @param value - New value for the node, or null.
   * @param color - New color for the node, or null.
   * @param left - New left child for the node, or null.
   * @param right - New right child for the node, or null.
   * @returns The node copy.
   */
  copy(e, t, s, i, r) {
    return new N(e ?? this.key, t ?? this.value, s ?? this.color, i ?? this.left, r ?? this.right);
  }
  /**
   * @returns The total number of nodes in the tree.
   */
  count() {
    return this.left.count() + 1 + this.right.count();
  }
  /**
   * @returns True if the tree is empty.
   */
  isEmpty() {
    return !1;
  }
  /**
   * Traverses the tree in key order and calls the specified action function
   * for each node.
   *
   * @param action - Callback function to be called for each
   *   node.  If it returns true, traversal is aborted.
   * @returns The first truthy value returned by action, or the last falsey
   *   value returned by action
   */
  inorderTraversal(e) {
    return this.left.inorderTraversal(e) || !!e(this.key, this.value) || this.right.inorderTraversal(e);
  }
  /**
   * Traverses the tree in reverse key order and calls the specified action function
   * for each node.
   *
   * @param action - Callback function to be called for each
   * node.  If it returns true, traversal is aborted.
   * @returns True if traversal was aborted.
   */
  reverseTraversal(e) {
    return this.right.reverseTraversal(e) || e(this.key, this.value) || this.left.reverseTraversal(e);
  }
  /**
   * @returns The minimum node in the tree.
   */
  min_() {
    return this.left.isEmpty() ? this : this.left.min_();
  }
  /**
   * @returns The maximum key in the tree.
   */
  minKey() {
    return this.min_().key;
  }
  /**
   * @returns The maximum key in the tree.
   */
  maxKey() {
    return this.right.isEmpty() ? this.key : this.right.maxKey();
  }
  /**
   * @param key - Key to insert.
   * @param value - Value to insert.
   * @param comparator - Comparator.
   * @returns New tree, with the key/value added.
   */
  insert(e, t, s) {
    let i = this;
    const r = s(e, i.key);
    return r < 0 ? i = i.copy(null, null, null, i.left.insert(e, t, s), null) : r === 0 ? i = i.copy(null, t, null, null, null) : i = i.copy(null, null, null, null, i.right.insert(e, t, s)), i.fixUp_();
  }
  /**
   * @returns New tree, with the minimum key removed.
   */
  removeMin_() {
    if (this.left.isEmpty())
      return P.EMPTY_NODE;
    let e = this;
    return !e.left.isRed_() && !e.left.left.isRed_() && (e = e.moveRedLeft_()), e = e.copy(null, null, null, e.left.removeMin_(), null), e.fixUp_();
  }
  /**
   * @param key - The key of the item to remove.
   * @param comparator - Comparator.
   * @returns New tree, with the specified item removed.
   */
  remove(e, t) {
    let s, i;
    if (s = this, t(e, s.key) < 0)
      !s.left.isEmpty() && !s.left.isRed_() && !s.left.left.isRed_() && (s = s.moveRedLeft_()), s = s.copy(null, null, null, s.left.remove(e, t), null);
    else {
      if (s.left.isRed_() && (s = s.rotateRight_()), !s.right.isEmpty() && !s.right.isRed_() && !s.right.left.isRed_() && (s = s.moveRedRight_()), t(e, s.key) === 0) {
        if (s.right.isEmpty())
          return P.EMPTY_NODE;
        i = s.right.min_(), s = s.copy(i.key, i.value, null, null, s.right.removeMin_());
      }
      s = s.copy(null, null, null, null, s.right.remove(e, t));
    }
    return s.fixUp_();
  }
  /**
   * @returns Whether this is a RED node.
   */
  isRed_() {
    return this.color;
  }
  /**
   * @returns New tree after performing any needed rotations.
   */
  fixUp_() {
    let e = this;
    return e.right.isRed_() && !e.left.isRed_() && (e = e.rotateLeft_()), e.left.isRed_() && e.left.left.isRed_() && (e = e.rotateRight_()), e.left.isRed_() && e.right.isRed_() && (e = e.colorFlip_()), e;
  }
  /**
   * @returns New tree, after moveRedLeft.
   */
  moveRedLeft_() {
    let e = this.colorFlip_();
    return e.right.left.isRed_() && (e = e.copy(null, null, null, null, e.right.rotateRight_()), e = e.rotateLeft_(), e = e.colorFlip_()), e;
  }
  /**
   * @returns New tree, after moveRedRight.
   */
  moveRedRight_() {
    let e = this.colorFlip_();
    return e.left.left.isRed_() && (e = e.rotateRight_(), e = e.colorFlip_()), e;
  }
  /**
   * @returns New tree, after rotateLeft.
   */
  rotateLeft_() {
    const e = this.copy(null, null, N.RED, null, this.right.left);
    return this.right.copy(null, null, this.color, e, null);
  }
  /**
   * @returns New tree, after rotateRight.
   */
  rotateRight_() {
    const e = this.copy(null, null, N.RED, this.left.right, null);
    return this.left.copy(null, null, this.color, null, e);
  }
  /**
   * @returns Newt ree, after colorFlip.
   */
  colorFlip_() {
    const e = this.left.copy(null, null, !this.left.color, null, null), t = this.right.copy(null, null, !this.right.color, null, null);
    return this.copy(null, null, !this.color, e, t);
  }
  /**
   * For testing.
   *
   * @returns True if all is well.
   */
  checkMaxDepth_() {
    const e = this.check_();
    return Math.pow(2, e) <= this.count() + 1;
  }
  check_() {
    if (this.isRed_() && this.left.isRed_())
      throw new Error("Red node has red child(" + this.key + "," + this.value + ")");
    if (this.right.isRed_())
      throw new Error("Right child of (" + this.key + "," + this.value + ") is red");
    const e = this.left.check_();
    if (e !== this.right.check_())
      throw new Error("Black depths differ");
    return e + (this.isRed_() ? 0 : 1);
  }
}
N.RED = !0;
N.BLACK = !1;
class Mh {
  /**
   * Returns a copy of the current node.
   *
   * @returns The node copy.
   */
  copy(e, t, s, i, r) {
    return this;
  }
  /**
   * Returns a copy of the tree, with the specified key/value added.
   *
   * @param key - Key to be added.
   * @param value - Value to be added.
   * @param comparator - Comparator.
   * @returns New tree, with item added.
   */
  insert(e, t, s) {
    return new N(e, t, null);
  }
  /**
   * Returns a copy of the tree, with the specified key removed.
   *
   * @param key - The key to remove.
   * @param comparator - Comparator.
   * @returns New tree, with item removed.
   */
  remove(e, t) {
    return this;
  }
  /**
   * @returns The total number of nodes in the tree.
   */
  count() {
    return 0;
  }
  /**
   * @returns True if the tree is empty.
   */
  isEmpty() {
    return !0;
  }
  /**
   * Traverses the tree in key order and calls the specified action function
   * for each node.
   *
   * @param action - Callback function to be called for each
   * node.  If it returns true, traversal is aborted.
   * @returns True if traversal was aborted.
   */
  inorderTraversal(e) {
    return !1;
  }
  /**
   * Traverses the tree in reverse key order and calls the specified action function
   * for each node.
   *
   * @param action - Callback function to be called for each
   * node.  If it returns true, traversal is aborted.
   * @returns True if traversal was aborted.
   */
  reverseTraversal(e) {
    return !1;
  }
  minKey() {
    return null;
  }
  maxKey() {
    return null;
  }
  check_() {
    return 0;
  }
  /**
   * @returns Whether this node is red.
   */
  isRed_() {
    return !1;
  }
}
class P {
  /**
   * @param comparator_ - Key comparator.
   * @param root_ - Optional root node for the map.
   */
  constructor(e, t = P.EMPTY_NODE) {
    this.comparator_ = e, this.root_ = t;
  }
  /**
   * Returns a copy of the map, with the specified key/value added or replaced.
   * (TODO: We should perhaps rename this method to 'put')
   *
   * @param key - Key to be added.
   * @param value - Value to be added.
   * @returns New map, with item added.
   */
  insert(e, t) {
    return new P(this.comparator_, this.root_.insert(e, t, this.comparator_).copy(null, null, N.BLACK, null, null));
  }
  /**
   * Returns a copy of the map, with the specified key removed.
   *
   * @param key - The key to remove.
   * @returns New map, with item removed.
   */
  remove(e) {
    return new P(this.comparator_, this.root_.remove(e, this.comparator_).copy(null, null, N.BLACK, null, null));
  }
  /**
   * Returns the value of the node with the given key, or null.
   *
   * @param key - The key to look up.
   * @returns The value of the node with the given key, or null if the
   * key doesn't exist.
   */
  get(e) {
    let t, s = this.root_;
    for (; !s.isEmpty(); ) {
      if (t = this.comparator_(e, s.key), t === 0)
        return s.value;
      t < 0 ? s = s.left : t > 0 && (s = s.right);
    }
    return null;
  }
  /**
   * Returns the key of the item *before* the specified key, or null if key is the first item.
   * @param key - The key to find the predecessor of
   * @returns The predecessor key.
   */
  getPredecessorKey(e) {
    let t, s = this.root_, i = null;
    for (; !s.isEmpty(); )
      if (t = this.comparator_(e, s.key), t === 0) {
        if (s.left.isEmpty())
          return i ? i.key : null;
        for (s = s.left; !s.right.isEmpty(); )
          s = s.right;
        return s.key;
      } else t < 0 ? s = s.left : t > 0 && (i = s, s = s.right);
    throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?");
  }
  /**
   * @returns True if the map is empty.
   */
  isEmpty() {
    return this.root_.isEmpty();
  }
  /**
   * @returns The total number of nodes in the map.
   */
  count() {
    return this.root_.count();
  }
  /**
   * @returns The minimum key in the map.
   */
  minKey() {
    return this.root_.minKey();
  }
  /**
   * @returns The maximum key in the map.
   */
  maxKey() {
    return this.root_.maxKey();
  }
  /**
   * Traverses the map in key order and calls the specified action function
   * for each key/value pair.
   *
   * @param action - Callback function to be called
   * for each key/value pair.  If action returns true, traversal is aborted.
   * @returns The first truthy value returned by action, or the last falsey
   *   value returned by action
   */
  inorderTraversal(e) {
    return this.root_.inorderTraversal(e);
  }
  /**
   * Traverses the map in reverse key order and calls the specified action function
   * for each key/value pair.
   *
   * @param action - Callback function to be called
   * for each key/value pair.  If action returns true, traversal is aborted.
   * @returns True if the traversal was aborted.
   */
  reverseTraversal(e) {
    return this.root_.reverseTraversal(e);
  }
  /**
   * Returns an iterator over the SortedMap.
   * @returns The iterator.
   */
  getIterator(e) {
    return new tt(this.root_, null, this.comparator_, !1, e);
  }
  getIteratorFrom(e, t) {
    return new tt(this.root_, e, this.comparator_, !1, t);
  }
  getReverseIteratorFrom(e, t) {
    return new tt(this.root_, e, this.comparator_, !0, t);
  }
  getReverseIterator(e) {
    return new tt(this.root_, null, this.comparator_, !0, e);
  }
}
P.EMPTY_NODE = new Mh();
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
function xh(n, e) {
  return Ae(n.name, e.name);
}
function Mn(n, e) {
  return Ae(n, e);
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
let nn;
function Ph(n) {
  nn = n;
}
const dr = function(n) {
  return typeof n == "number" ? "number:" + Ki(n) : "string:" + n;
}, fr = function(n) {
  if (n.isLeafNode()) {
    const e = n.val();
    f(typeof e == "string" || typeof e == "number" || typeof e == "object" && J(e, ".sv"), "Priority must be a string or number.");
  } else
    f(n === nn || n.isEmpty(), "priority of unexpected type.");
  f(n === nn || n.getPriority().isEmpty(), "Priority nodes can't have a priority of their own.");
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
let Rs;
class R {
  static set __childrenNodeConstructor(e) {
    Rs = e;
  }
  static get __childrenNodeConstructor() {
    return Rs;
  }
  /**
   * @param value_ - The value to store in this leaf node. The object type is
   * possible in the event of a deferred value
   * @param priorityNode_ - The priority of this node.
   */
  constructor(e, t = R.__childrenNodeConstructor.EMPTY_NODE) {
    this.value_ = e, this.priorityNode_ = t, this.lazyHash_ = null, f(this.value_ !== void 0 && this.value_ !== null, "LeafNode shouldn't be created with null/undefined value."), fr(this.priorityNode_);
  }
  /** @inheritDoc */
  isLeafNode() {
    return !0;
  }
  /** @inheritDoc */
  getPriority() {
    return this.priorityNode_;
  }
  /** @inheritDoc */
  updatePriority(e) {
    return new R(this.value_, e);
  }
  /** @inheritDoc */
  getImmediateChild(e) {
    return e === ".priority" ? this.priorityNode_ : R.__childrenNodeConstructor.EMPTY_NODE;
  }
  /** @inheritDoc */
  getChild(e) {
    return m(e) ? this : y(e) === ".priority" ? this.priorityNode_ : R.__childrenNodeConstructor.EMPTY_NODE;
  }
  hasChild() {
    return !1;
  }
  /** @inheritDoc */
  getPredecessorChildName(e, t) {
    return null;
  }
  /** @inheritDoc */
  updateImmediateChild(e, t) {
    return e === ".priority" ? this.updatePriority(t) : t.isEmpty() && e !== ".priority" ? this : R.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e, t).updatePriority(this.priorityNode_);
  }
  /** @inheritDoc */
  updateChild(e, t) {
    const s = y(e);
    return s === null ? t : t.isEmpty() && s !== ".priority" ? this : (f(s !== ".priority" || ie(e) === 1, ".priority must be the last token in a path"), this.updateImmediateChild(s, R.__childrenNodeConstructor.EMPTY_NODE.updateChild(I(e), t)));
  }
  /** @inheritDoc */
  isEmpty() {
    return !1;
  }
  /** @inheritDoc */
  numChildren() {
    return 0;
  }
  /** @inheritDoc */
  forEachChild(e, t) {
    return !1;
  }
  val(e) {
    return e && !this.getPriority().isEmpty() ? {
      ".value": this.getValue(),
      ".priority": this.getPriority().val()
    } : this.getValue();
  }
  /** @inheritDoc */
  hash() {
    if (this.lazyHash_ === null) {
      let e = "";
      this.priorityNode_.isEmpty() || (e += "priority:" + dr(this.priorityNode_.val()) + ":");
      const t = typeof this.value_;
      e += t + ":", t === "number" ? e += Ki(this.value_) : e += this.value_, this.lazyHash_ = Bi(e);
    }
    return this.lazyHash_;
  }
  /**
   * Returns the value of the leaf node.
   * @returns The value of the node.
   */
  getValue() {
    return this.value_;
  }
  compareTo(e) {
    return e === R.__childrenNodeConstructor.EMPTY_NODE ? 1 : e instanceof R.__childrenNodeConstructor ? -1 : (f(e.isLeafNode(), "Unknown node type"), this.compareToLeafNode_(e));
  }
  /**
   * Comparison specifically for two leaf nodes
   */
  compareToLeafNode_(e) {
    const t = typeof e.value_, s = typeof this.value_, i = R.VALUE_TYPE_ORDER.indexOf(t), r = R.VALUE_TYPE_ORDER.indexOf(s);
    return f(i >= 0, "Unknown leaf type: " + t), f(r >= 0, "Unknown leaf type: " + s), i === r ? s === "object" ? 0 : this.value_ < e.value_ ? -1 : this.value_ === e.value_ ? 0 : 1 : r - i;
  }
  withIndex() {
    return this;
  }
  isIndexed() {
    return !0;
  }
  equals(e) {
    if (e === this)
      return !0;
    if (e.isLeafNode()) {
      const t = e;
      return this.value_ === t.value_ && this.priorityNode_.equals(t.priorityNode_);
    } else
      return !1;
  }
}
R.VALUE_TYPE_ORDER = ["object", "boolean", "number", "string"];
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
let pr, _r;
function Lh(n) {
  pr = n;
}
function Fh(n) {
  _r = n;
}
class Uh extends Ct {
  compare(e, t) {
    const s = e.node.getPriority(), i = t.node.getPriority(), r = s.compareTo(i);
    return r === 0 ? Ae(e.name, t.name) : r;
  }
  isDefinedOn(e) {
    return !e.getPriority().isEmpty();
  }
  indexedValueChanged(e, t) {
    return !e.getPriority().equals(t.getPriority());
  }
  minPost() {
    return w.MIN;
  }
  maxPost() {
    return new w(pe, new R("[PRIORITY-POST]", _r));
  }
  makePost(e, t) {
    const s = pr(e);
    return new w(t, new R("[PRIORITY-POST]", s));
  }
  /**
   * @returns String representation for inclusion in a query spec
   */
  toString() {
    return ".priority";
  }
}
const M = new Uh();
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
const Bh = Math.log(2);
class Wh {
  constructor(e) {
    const t = (r) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      parseInt(Math.log(r) / Bh, 10)
    ), s = (r) => parseInt(Array(r + 1).join("1"), 2);
    this.count = t(e + 1), this.current_ = this.count - 1;
    const i = s(this.count);
    this.bits_ = e + 1 & i;
  }
  nextBitIsOne() {
    const e = !(this.bits_ & 1 << this.current_);
    return this.current_--, e;
  }
}
const ht = function(n, e, t, s) {
  n.sort(e);
  const i = function(c, l) {
    const u = l - c;
    let h, d;
    if (u === 0)
      return null;
    if (u === 1)
      return h = n[c], d = t ? t(h) : h, new N(d, h.node, N.BLACK, null, null);
    {
      const p = parseInt(u / 2, 10) + c, g = i(c, p), E = i(p + 1, l);
      return h = n[p], d = t ? t(h) : h, new N(d, h.node, N.BLACK, g, E);
    }
  }, r = function(c) {
    let l = null, u = null, h = n.length;
    const d = function(g, E) {
      const x = h - g, Je = h;
      h -= g;
      const V = i(x + 1, Je), Tt = n[x], Qr = t ? t(Tt) : Tt;
      p(new N(Qr, Tt.node, E, null, V));
    }, p = function(g) {
      l ? (l.left = g, l = g) : (u = g, l = g);
    };
    for (let g = 0; g < c.count; ++g) {
      const E = c.nextBitIsOne(), x = Math.pow(2, c.count - (g + 1));
      E ? d(x, N.BLACK) : (d(x, N.BLACK), d(x, N.RED));
    }
    return u;
  }, o = new Wh(n.length), a = r(o);
  return new P(s || e, a);
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
let Kt;
const we = {};
class z {
  /**
   * The default IndexMap for nodes without a priority
   */
  static get Default() {
    return f(we && M, "ChildrenNode.ts has not been loaded"), Kt = Kt || new z({ ".priority": we }, { ".priority": M }), Kt;
  }
  constructor(e, t) {
    this.indexes_ = e, this.indexSet_ = t;
  }
  get(e) {
    const t = Se(this.indexes_, e);
    if (!t)
      throw new Error("No index defined for " + e);
    return t instanceof P ? t : null;
  }
  hasIndex(e) {
    return J(this.indexSet_, e.toString());
  }
  addIndex(e, t) {
    f(e !== ve, "KeyIndex always exists and isn't meant to be added to the IndexMap.");
    const s = [];
    let i = !1;
    const r = t.getIterator(w.Wrap);
    let o = r.getNext();
    for (; o; )
      i = i || e.isDefinedOn(o.node), s.push(o), o = r.getNext();
    let a;
    i ? a = ht(s, e.getCompare()) : a = we;
    const c = e.toString(), l = { ...this.indexSet_ };
    l[c] = e;
    const u = { ...this.indexes_ };
    return u[c] = a, new z(u, l);
  }
  /**
   * Ensure that this node is properly tracked in any indexes that we're maintaining
   */
  addToIndexes(e, t) {
    const s = nt(this.indexes_, (i, r) => {
      const o = Se(this.indexSet_, r);
      if (f(o, "Missing index implementation for " + r), i === we)
        if (o.isDefinedOn(e.node)) {
          const a = [], c = t.getIterator(w.Wrap);
          let l = c.getNext();
          for (; l; )
            l.name !== e.name && a.push(l), l = c.getNext();
          return a.push(e), ht(a, o.getCompare());
        } else
          return we;
      else {
        const a = t.get(e.name);
        let c = i;
        return a && (c = c.remove(new w(e.name, a))), c.insert(e, e.node);
      }
    });
    return new z(s, this.indexSet_);
  }
  /**
   * Create a new IndexMap instance with the given value removed
   */
  removeFromIndexes(e, t) {
    const s = nt(this.indexes_, (i) => {
      if (i === we)
        return i;
      {
        const r = t.get(e.name);
        return r ? i.remove(new w(e.name, r)) : i;
      }
    });
    return new z(s, this.indexSet_);
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
let Le;
class b {
  static get EMPTY_NODE() {
    return Le || (Le = new b(new P(Mn), null, z.Default));
  }
  /**
   * @param children_ - List of children of this node..
   * @param priorityNode_ - The priority of this node (as a snapshot node).
   */
  constructor(e, t, s) {
    this.children_ = e, this.priorityNode_ = t, this.indexMap_ = s, this.lazyHash_ = null, this.priorityNode_ && fr(this.priorityNode_), this.children_.isEmpty() && f(!this.priorityNode_ || this.priorityNode_.isEmpty(), "An empty node cannot have a priority");
  }
  /** @inheritDoc */
  isLeafNode() {
    return !1;
  }
  /** @inheritDoc */
  getPriority() {
    return this.priorityNode_ || Le;
  }
  /** @inheritDoc */
  updatePriority(e) {
    return this.children_.isEmpty() ? this : new b(this.children_, e, this.indexMap_);
  }
  /** @inheritDoc */
  getImmediateChild(e) {
    if (e === ".priority")
      return this.getPriority();
    {
      const t = this.children_.get(e);
      return t === null ? Le : t;
    }
  }
  /** @inheritDoc */
  getChild(e) {
    const t = y(e);
    return t === null ? this : this.getImmediateChild(t).getChild(I(e));
  }
  /** @inheritDoc */
  hasChild(e) {
    return this.children_.get(e) !== null;
  }
  /** @inheritDoc */
  updateImmediateChild(e, t) {
    if (f(t, "We should always be passing snapshot nodes"), e === ".priority")
      return this.updatePriority(t);
    {
      const s = new w(e, t);
      let i, r;
      t.isEmpty() ? (i = this.children_.remove(e), r = this.indexMap_.removeFromIndexes(s, this.children_)) : (i = this.children_.insert(e, t), r = this.indexMap_.addToIndexes(s, this.children_));
      const o = i.isEmpty() ? Le : this.priorityNode_;
      return new b(i, o, r);
    }
  }
  /** @inheritDoc */
  updateChild(e, t) {
    const s = y(e);
    if (s === null)
      return t;
    {
      f(y(e) !== ".priority" || ie(e) === 1, ".priority must be the last token in a path");
      const i = this.getImmediateChild(s).updateChild(I(e), t);
      return this.updateImmediateChild(s, i);
    }
  }
  /** @inheritDoc */
  isEmpty() {
    return this.children_.isEmpty();
  }
  /** @inheritDoc */
  numChildren() {
    return this.children_.count();
  }
  /** @inheritDoc */
  val(e) {
    if (this.isEmpty())
      return null;
    const t = {};
    let s = 0, i = 0, r = !0;
    if (this.forEachChild(M, (o, a) => {
      t[o] = a.val(e), s++, r && b.INTEGER_REGEXP_.test(o) ? i = Math.max(i, Number(o)) : r = !1;
    }), !e && r && i < 2 * s) {
      const o = [];
      for (const a in t)
        o[a] = t[a];
      return o;
    } else
      return e && !this.getPriority().isEmpty() && (t[".priority"] = this.getPriority().val()), t;
  }
  /** @inheritDoc */
  hash() {
    if (this.lazyHash_ === null) {
      let e = "";
      this.getPriority().isEmpty() || (e += "priority:" + dr(this.getPriority().val()) + ":"), this.forEachChild(M, (t, s) => {
        const i = s.hash();
        i !== "" && (e += ":" + t + ":" + i);
      }), this.lazyHash_ = e === "" ? "" : Bi(e);
    }
    return this.lazyHash_;
  }
  /** @inheritDoc */
  getPredecessorChildName(e, t, s) {
    const i = this.resolveIndex_(s);
    if (i) {
      const r = i.getPredecessorKey(new w(e, t));
      return r ? r.name : null;
    } else
      return this.children_.getPredecessorKey(e);
  }
  getFirstChildName(e) {
    const t = this.resolveIndex_(e);
    if (t) {
      const s = t.minKey();
      return s && s.name;
    } else
      return this.children_.minKey();
  }
  getFirstChild(e) {
    const t = this.getFirstChildName(e);
    return t ? new w(t, this.children_.get(t)) : null;
  }
  /**
   * Given an index, return the key name of the largest value we have, according to that index
   */
  getLastChildName(e) {
    const t = this.resolveIndex_(e);
    if (t) {
      const s = t.maxKey();
      return s && s.name;
    } else
      return this.children_.maxKey();
  }
  getLastChild(e) {
    const t = this.getLastChildName(e);
    return t ? new w(t, this.children_.get(t)) : null;
  }
  forEachChild(e, t) {
    const s = this.resolveIndex_(e);
    return s ? s.inorderTraversal((i) => t(i.name, i.node)) : this.children_.inorderTraversal(t);
  }
  getIterator(e) {
    return this.getIteratorFrom(e.minPost(), e);
  }
  getIteratorFrom(e, t) {
    const s = this.resolveIndex_(t);
    if (s)
      return s.getIteratorFrom(e, (i) => i);
    {
      const i = this.children_.getIteratorFrom(e.name, w.Wrap);
      let r = i.peek();
      for (; r != null && t.compare(r, e) < 0; )
        i.getNext(), r = i.peek();
      return i;
    }
  }
  getReverseIterator(e) {
    return this.getReverseIteratorFrom(e.maxPost(), e);
  }
  getReverseIteratorFrom(e, t) {
    const s = this.resolveIndex_(t);
    if (s)
      return s.getReverseIteratorFrom(e, (i) => i);
    {
      const i = this.children_.getReverseIteratorFrom(e.name, w.Wrap);
      let r = i.peek();
      for (; r != null && t.compare(r, e) > 0; )
        i.getNext(), r = i.peek();
      return i;
    }
  }
  compareTo(e) {
    return this.isEmpty() ? e.isEmpty() ? 0 : -1 : e.isLeafNode() || e.isEmpty() ? 1 : e === Qe ? -1 : 0;
  }
  withIndex(e) {
    if (e === ve || this.indexMap_.hasIndex(e))
      return this;
    {
      const t = this.indexMap_.addIndex(e, this.children_);
      return new b(this.children_, this.priorityNode_, t);
    }
  }
  isIndexed(e) {
    return e === ve || this.indexMap_.hasIndex(e);
  }
  equals(e) {
    if (e === this)
      return !0;
    if (e.isLeafNode())
      return !1;
    {
      const t = e;
      if (this.getPriority().equals(t.getPriority()))
        if (this.children_.count() === t.children_.count()) {
          const s = this.getIterator(M), i = t.getIterator(M);
          let r = s.getNext(), o = i.getNext();
          for (; r && o; ) {
            if (r.name !== o.name || !r.node.equals(o.node))
              return !1;
            r = s.getNext(), o = i.getNext();
          }
          return r === null && o === null;
        } else
          return !1;
      else return !1;
    }
  }
  /**
   * Returns a SortedMap ordered by index, or null if the default (by-key) ordering can be used
   * instead.
   *
   */
  resolveIndex_(e) {
    return e === ve ? null : this.indexMap_.get(e.toString());
  }
}
b.INTEGER_REGEXP_ = /^(0|[1-9]\d*)$/;
class Hh extends b {
  constructor() {
    super(new P(Mn), b.EMPTY_NODE, z.Default);
  }
  compareTo(e) {
    return e === this ? 0 : 1;
  }
  equals(e) {
    return e === this;
  }
  getPriority() {
    return this;
  }
  getImmediateChild(e) {
    return b.EMPTY_NODE;
  }
  isEmpty() {
    return !1;
  }
}
const Qe = new Hh();
Object.defineProperties(w, {
  MIN: {
    value: new w(Ie, b.EMPTY_NODE)
  },
  MAX: {
    value: new w(pe, Qe)
  }
});
ur.__EMPTY_NODE = b.EMPTY_NODE;
R.__childrenNodeConstructor = b;
Ph(Qe);
Fh(Qe);
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
const Kh = !0;
function O(n, e = null) {
  if (n === null)
    return b.EMPTY_NODE;
  if (typeof n == "object" && ".priority" in n && (e = n[".priority"]), f(e === null || typeof e == "string" || typeof e == "number" || typeof e == "object" && ".sv" in e, "Invalid priority type found: " + typeof e), typeof n == "object" && ".value" in n && n[".value"] !== null && (n = n[".value"]), typeof n != "object" || ".sv" in n) {
    const t = n;
    return new R(t, O(e));
  }
  if (!(n instanceof Array) && Kh) {
    const t = [];
    let s = !1;
    if (B(n, (o, a) => {
      if (o.substring(0, 1) !== ".") {
        const c = O(a);
        c.isEmpty() || (s = s || !c.getPriority().isEmpty(), t.push(new w(o, c)));
      }
    }), t.length === 0)
      return b.EMPTY_NODE;
    const r = ht(t, xh, (o) => o.name, Mn);
    if (s) {
      const o = ht(t, M.getCompare());
      return new b(r, O(e), new z({ ".priority": o }, { ".priority": M }));
    } else
      return new b(r, O(e), z.Default);
  } else {
    let t = b.EMPTY_NODE;
    return B(n, (s, i) => {
      if (J(n, s) && s.substring(0, 1) !== ".") {
        const r = O(i);
        (r.isLeafNode() || !r.isEmpty()) && (t = t.updateImmediateChild(s, r));
      }
    }), t.updatePriority(O(e));
  }
}
Lh(O);
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
class $h extends Ct {
  constructor(e) {
    super(), this.indexPath_ = e, f(!m(e) && y(e) !== ".priority", "Can't create PathIndex with empty path or .priority key");
  }
  extractChild(e) {
    return e.getChild(this.indexPath_);
  }
  isDefinedOn(e) {
    return !e.getChild(this.indexPath_).isEmpty();
  }
  compare(e, t) {
    const s = this.extractChild(e.node), i = this.extractChild(t.node), r = s.compareTo(i);
    return r === 0 ? Ae(e.name, t.name) : r;
  }
  makePost(e, t) {
    const s = O(e), i = b.EMPTY_NODE.updateChild(this.indexPath_, s);
    return new w(t, i);
  }
  maxPost() {
    const e = b.EMPTY_NODE.updateChild(this.indexPath_, Qe);
    return new w(pe, e);
  }
  toString() {
    return ar(this.indexPath_, 0).join("/");
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
class Vh extends Ct {
  compare(e, t) {
    const s = e.node.compareTo(t.node);
    return s === 0 ? Ae(e.name, t.name) : s;
  }
  isDefinedOn(e) {
    return !0;
  }
  indexedValueChanged(e, t) {
    return !e.equals(t);
  }
  minPost() {
    return w.MIN;
  }
  maxPost() {
    return w.MAX;
  }
  makePost(e, t) {
    const s = O(e);
    return new w(t, s);
  }
  /**
   * @returns String representation for inclusion in a query spec
   */
  toString() {
    return ".value";
  }
}
const qh = new Vh();
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
function jh(n) {
  return { type: "value", snapshotNode: n };
}
function Gh(n, e) {
  return { type: "child_added", snapshotNode: e, childName: n };
}
function zh(n, e) {
  return { type: "child_removed", snapshotNode: e, childName: n };
}
function Ns(n, e, t) {
  return {
    type: "child_changed",
    snapshotNode: e,
    childName: n,
    oldSnap: t
  };
}
function Yh(n, e) {
  return { type: "child_moved", snapshotNode: e, childName: n };
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
class xn {
  constructor() {
    this.limitSet_ = !1, this.startSet_ = !1, this.startNameSet_ = !1, this.startAfterSet_ = !1, this.endSet_ = !1, this.endNameSet_ = !1, this.endBeforeSet_ = !1, this.limit_ = 0, this.viewFrom_ = "", this.indexStartValue_ = null, this.indexStartName_ = "", this.indexEndValue_ = null, this.indexEndName_ = "", this.index_ = M;
  }
  hasStart() {
    return this.startSet_;
  }
  /**
   * @returns True if it would return from left.
   */
  isViewFromLeft() {
    return this.viewFrom_ === "" ? this.startSet_ : this.viewFrom_ === "l";
  }
  /**
   * Only valid to call if hasStart() returns true
   */
  getIndexStartValue() {
    return f(this.startSet_, "Only valid if start has been set"), this.indexStartValue_;
  }
  /**
   * Only valid to call if hasStart() returns true.
   * Returns the starting key name for the range defined by these query parameters
   */
  getIndexStartName() {
    return f(this.startSet_, "Only valid if start has been set"), this.startNameSet_ ? this.indexStartName_ : Ie;
  }
  hasEnd() {
    return this.endSet_;
  }
  /**
   * Only valid to call if hasEnd() returns true.
   */
  getIndexEndValue() {
    return f(this.endSet_, "Only valid if end has been set"), this.indexEndValue_;
  }
  /**
   * Only valid to call if hasEnd() returns true.
   * Returns the end key name for the range defined by these query parameters
   */
  getIndexEndName() {
    return f(this.endSet_, "Only valid if end has been set"), this.endNameSet_ ? this.indexEndName_ : pe;
  }
  hasLimit() {
    return this.limitSet_;
  }
  /**
   * @returns True if a limit has been set and it has been explicitly anchored
   */
  hasAnchoredLimit() {
    return this.limitSet_ && this.viewFrom_ !== "";
  }
  /**
   * Only valid to call if hasLimit() returns true
   */
  getLimit() {
    return f(this.limitSet_, "Only valid if limit has been set"), this.limit_;
  }
  getIndex() {
    return this.index_;
  }
  loadsAllData() {
    return !(this.startSet_ || this.endSet_ || this.limitSet_);
  }
  isDefault() {
    return this.loadsAllData() && this.index_ === M;
  }
  copy() {
    const e = new xn();
    return e.limitSet_ = this.limitSet_, e.limit_ = this.limit_, e.startSet_ = this.startSet_, e.startAfterSet_ = this.startAfterSet_, e.indexStartValue_ = this.indexStartValue_, e.startNameSet_ = this.startNameSet_, e.indexStartName_ = this.indexStartName_, e.endSet_ = this.endSet_, e.endBeforeSet_ = this.endBeforeSet_, e.indexEndValue_ = this.indexEndValue_, e.endNameSet_ = this.endNameSet_, e.indexEndName_ = this.indexEndName_, e.index_ = this.index_, e.viewFrom_ = this.viewFrom_, e;
  }
}
function As(n) {
  const e = {};
  if (n.isDefault())
    return e;
  let t;
  if (n.index_ === M ? t = "$priority" : n.index_ === qh ? t = "$value" : n.index_ === ve ? t = "$key" : (f(n.index_ instanceof $h, "Unrecognized index type!"), t = n.index_.toString()), e.orderBy = k(t), n.startSet_) {
    const s = n.startAfterSet_ ? "startAfter" : "startAt";
    e[s] = k(n.indexStartValue_), n.startNameSet_ && (e[s] += "," + k(n.indexStartName_));
  }
  if (n.endSet_) {
    const s = n.endBeforeSet_ ? "endBefore" : "endAt";
    e[s] = k(n.indexEndValue_), n.endNameSet_ && (e[s] += "," + k(n.indexEndName_));
  }
  return n.limitSet_ && (n.isViewFromLeft() ? e.limitToFirst = n.limit_ : e.limitToLast = n.limit_), e;
}
function ks(n) {
  const e = {};
  if (n.startSet_ && (e.sp = n.indexStartValue_, n.startNameSet_ && (e.sn = n.indexStartName_), e.sin = !n.startAfterSet_), n.endSet_ && (e.ep = n.indexEndValue_, n.endNameSet_ && (e.en = n.indexEndName_), e.ein = !n.endBeforeSet_), n.limitSet_) {
    e.l = n.limit_;
    let t = n.viewFrom_;
    t === "" && (n.isViewFromLeft() ? t = "l" : t = "r"), e.vf = t;
  }
  return n.index_ !== M && (e.i = n.index_.toString()), e;
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
class ut extends ir {
  reportStats(e) {
    throw new Error("Method not implemented.");
  }
  static getListenId_(e, t) {
    return t !== void 0 ? "tag$" + t : (f(e._queryParams.isDefault(), "should have a tag if it's not a default query."), e._path.toString());
  }
  /**
   * @param repoInfo_ - Data about the namespace we are connecting to
   * @param onDataUpdate_ - A callback for new data from the server
   */
  constructor(e, t, s, i) {
    super(), this.repoInfo_ = e, this.onDataUpdate_ = t, this.authTokenProvider_ = s, this.appCheckTokenProvider_ = i, this.log_ = ze("p:rest:"), this.listens_ = {};
  }
  /** @inheritDoc */
  listen(e, t, s, i) {
    const r = e._path.toString();
    this.log_("Listen called for " + r + " " + e._queryIdentifier);
    const o = ut.getListenId_(e, s), a = {};
    this.listens_[o] = a;
    const c = As(e._queryParams);
    this.restRequest_(r + ".json", c, (l, u) => {
      let h = u;
      if (l === 404 && (h = null, l = null), l === null && this.onDataUpdate_(
        r,
        h,
        /*isMerge=*/
        !1,
        s
      ), Se(this.listens_, o) === a) {
        let d;
        l ? l === 401 ? d = "permission_denied" : d = "rest_error:" + l : d = "ok", i(d, null);
      }
    });
  }
  /** @inheritDoc */
  unlisten(e, t) {
    const s = ut.getListenId_(e, t);
    delete this.listens_[s];
  }
  get(e) {
    const t = As(e._queryParams), s = e._path.toString(), i = new pn();
    return this.restRequest_(s + ".json", t, (r, o) => {
      let a = o;
      r === 404 && (a = null, r = null), r === null ? (this.onDataUpdate_(
        s,
        a,
        /*isMerge=*/
        !1,
        /*tag=*/
        null
      ), i.resolve(a)) : i.reject(new Error(a));
    }), i.promise;
  }
  /** @inheritDoc */
  refreshAuthToken(e) {
  }
  /**
   * Performs a REST request to the given path, with the provided query string parameters,
   * and any auth credentials we have.
   */
  restRequest_(e, t = {}, s) {
    return t.format = "export", Promise.all([
      this.authTokenProvider_.getToken(
        /*forceRefresh=*/
        !1
      ),
      this.appCheckTokenProvider_.getToken(
        /*forceRefresh=*/
        !1
      )
    ]).then(([i, r]) => {
      i && i.accessToken && (t.auth = i.accessToken), r && r.token && (t.ac = r.token);
      const o = (this.repoInfo_.secure ? "https://" : "http://") + this.repoInfo_.host + e + "?ns=" + this.repoInfo_.namespace + go(t);
      this.log_("Sending REST request for " + o);
      const a = new XMLHttpRequest();
      a.onreadystatechange = () => {
        if (s && a.readyState === 4) {
          this.log_("REST Response for " + o + " received. status:", a.status, "response:", a.responseText);
          let c = null;
          if (a.status >= 200 && a.status < 300) {
            try {
              c = $e(a.responseText);
            } catch {
              F("Failed to parse JSON response for " + o + ": " + a.responseText);
            }
            s(null, c);
          } else
            a.status !== 401 && a.status !== 404 && F("Got unsuccessful REST response for " + o + " Status: " + a.status), s(a.status);
          s = null;
        }
      }, a.open(
        "GET",
        o,
        /*asynchronous=*/
        !0
      ), a.send();
    });
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
class Qh {
  constructor() {
    this.rootNode_ = b.EMPTY_NODE;
  }
  getNode(e) {
    return this.rootNode_.getChild(e);
  }
  updateSnapshot(e, t) {
    this.rootNode_ = this.rootNode_.updateChild(e, t);
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
function dt() {
  return {
    value: null,
    children: /* @__PURE__ */ new Map()
  };
}
function gr(n, e, t) {
  if (m(e))
    n.value = t, n.children.clear();
  else if (n.value !== null)
    n.value = n.value.updateChild(e, t);
  else {
    const s = y(e);
    n.children.has(s) || n.children.set(s, dt());
    const i = n.children.get(s);
    e = I(e), gr(i, e, t);
  }
}
function sn(n, e, t) {
  n.value !== null ? t(e, n.value) : Xh(n, (s, i) => {
    const r = new T(e.toString() + "/" + s);
    sn(i, r, t);
  });
}
function Xh(n, e) {
  n.children.forEach((t, s) => {
    e(s, t);
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
class Jh {
  constructor(e) {
    this.collection_ = e, this.last_ = null;
  }
  get() {
    const e = this.collection_.get(), t = { ...e };
    return this.last_ && B(this.last_, (s, i) => {
      t[s] = t[s] - i;
    }), this.last_ = e, t;
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
const Ds = 10 * 1e3, Zh = 30 * 1e3, eu = 5 * 60 * 1e3;
class tu {
  constructor(e, t) {
    this.server_ = t, this.statsToReport_ = {}, this.statsListener_ = new Jh(e);
    const s = Ds + (Zh - Ds) * Math.random();
    We(this.reportStats_.bind(this), Math.floor(s));
  }
  reportStats_() {
    const e = this.statsListener_.get(), t = {};
    let s = !1;
    B(e, (i, r) => {
      r > 0 && J(this.statsToReport_, i) && (t[i] = r, s = !0);
    }), s && this.server_.reportStats(t), We(this.reportStats_.bind(this), Math.floor(Math.random() * 2 * eu));
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
var q;
(function(n) {
  n[n.OVERWRITE = 0] = "OVERWRITE", n[n.MERGE = 1] = "MERGE", n[n.ACK_USER_WRITE = 2] = "ACK_USER_WRITE", n[n.LISTEN_COMPLETE = 3] = "LISTEN_COMPLETE";
})(q || (q = {}));
function mr() {
  return {
    fromUser: !0,
    fromServer: !1,
    queryId: null,
    tagged: !1
  };
}
function yr() {
  return {
    fromUser: !1,
    fromServer: !0,
    queryId: null,
    tagged: !1
  };
}
function wr(n) {
  return {
    fromUser: !1,
    fromServer: !0,
    queryId: n,
    tagged: !0
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
class ft {
  /**
   * @param affectedTree - A tree containing true for each affected path. Affected paths can't overlap.
   */
  constructor(e, t, s) {
    this.path = e, this.affectedTree = t, this.revert = s, this.type = q.ACK_USER_WRITE, this.source = mr();
  }
  operationForChild(e) {
    if (m(this.path)) {
      if (this.affectedTree.value != null)
        return f(this.affectedTree.children.isEmpty(), "affectedTree should not have overlapping affected paths."), this;
      {
        const t = this.affectedTree.subtree(new T(e));
        return new ft(C(), t, this.revert);
      }
    } else return f(y(this.path) === e, "operationForChild called for unrelated child."), new ft(I(this.path), this.affectedTree, this.revert);
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
class _e {
  constructor(e, t, s) {
    this.source = e, this.path = t, this.snap = s, this.type = q.OVERWRITE;
  }
  operationForChild(e) {
    return m(this.path) ? new _e(this.source, C(), this.snap.getImmediateChild(e)) : new _e(this.source, I(this.path), this.snap);
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
class je {
  constructor(e, t, s) {
    this.source = e, this.path = t, this.children = s, this.type = q.MERGE;
  }
  operationForChild(e) {
    if (m(this.path)) {
      const t = this.children.subtree(new T(e));
      return t.isEmpty() ? null : t.value ? new _e(this.source, C(), t.value) : new je(this.source, C(), t);
    } else
      return f(y(this.path) === e, "Can't get a merge for a child not on the path of the operation"), new je(this.source, I(this.path), this.children);
  }
  toString() {
    return "Operation(" + this.path + ": " + this.source.toString() + " merge: " + this.children.toString() + ")";
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
class Pn {
  constructor(e, t, s) {
    this.node_ = e, this.fullyInitialized_ = t, this.filtered_ = s;
  }
  /**
   * Returns whether this node was fully initialized with either server data or a complete overwrite by the client
   */
  isFullyInitialized() {
    return this.fullyInitialized_;
  }
  /**
   * Returns whether this node is potentially missing children due to a filter applied to the node
   */
  isFiltered() {
    return this.filtered_;
  }
  isCompleteForPath(e) {
    if (m(e))
      return this.isFullyInitialized() && !this.filtered_;
    const t = y(e);
    return this.isCompleteForChild(t);
  }
  isCompleteForChild(e) {
    return this.isFullyInitialized() && !this.filtered_ || this.node_.hasChild(e);
  }
  getNode() {
    return this.node_;
  }
}
function nu(n, e, t, s) {
  const i = [], r = [];
  return e.forEach((o) => {
    o.type === "child_changed" && n.index_.indexedValueChanged(o.oldSnap, o.snapshotNode) && r.push(Yh(o.childName, o.snapshotNode));
  }), Fe(n, i, "child_removed", e, s, t), Fe(n, i, "child_added", e, s, t), Fe(n, i, "child_moved", r, s, t), Fe(n, i, "child_changed", e, s, t), Fe(n, i, "value", e, s, t), i;
}
function Fe(n, e, t, s, i, r) {
  const o = s.filter((a) => a.type === t);
  o.sort((a, c) => iu(n, a, c)), o.forEach((a) => {
    const c = su(n, a, r);
    i.forEach((l) => {
      l.respondsTo(a.type) && e.push(l.createEvent(c, n.query_));
    });
  });
}
function su(n, e, t) {
  return e.type === "value" || e.type === "child_removed" || (e.prevName = t.getPredecessorChildName(e.childName, e.snapshotNode, n.index_)), e;
}
function iu(n, e, t) {
  if (e.childName == null || t.childName == null)
    throw Re("Should only compare child_ events.");
  const s = new w(e.childName, e.snapshotNode), i = new w(t.childName, t.snapshotNode);
  return n.index_.compare(s, i);
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
function br(n, e) {
  return { eventCache: n, serverCache: e };
}
function He(n, e, t, s) {
  return br(new Pn(e, t, s), n.serverCache);
}
function Cr(n, e, t, s) {
  return br(n.eventCache, new Pn(e, t, s));
}
function rn(n) {
  return n.eventCache.isFullyInitialized() ? n.eventCache.getNode() : null;
}
function ge(n) {
  return n.serverCache.isFullyInitialized() ? n.serverCache.getNode() : null;
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
let $t;
const ru = () => ($t || ($t = new P(Vl)), $t);
class S {
  static fromObject(e) {
    let t = new S(null);
    return B(e, (s, i) => {
      t = t.set(new T(s), i);
    }), t;
  }
  constructor(e, t = ru()) {
    this.value = e, this.children = t;
  }
  /**
   * True if the value is empty and there are no children
   */
  isEmpty() {
    return this.value === null && this.children.isEmpty();
  }
  /**
   * Given a path and predicate, return the first node and the path to that node
   * where the predicate returns true.
   *
   * TODO Do a perf test -- If we're creating a bunch of `{path: value:}`
   * objects on the way back out, it may be better to pass down a pathSoFar obj.
   *
   * @param relativePath - The remainder of the path
   * @param predicate - The predicate to satisfy to return a node
   */
  findRootMostMatchingPathAndValue(e, t) {
    if (this.value != null && t(this.value))
      return { path: C(), value: this.value };
    if (m(e))
      return null;
    {
      const s = y(e), i = this.children.get(s);
      if (i !== null) {
        const r = i.findRootMostMatchingPathAndValue(I(e), t);
        return r != null ? { path: A(new T(s), r.path), value: r.value } : null;
      } else
        return null;
    }
  }
  /**
   * Find, if it exists, the shortest subpath of the given path that points a defined
   * value in the tree
   */
  findRootMostValueAndPath(e) {
    return this.findRootMostMatchingPathAndValue(e, () => !0);
  }
  /**
   * @returns The subtree at the given path
   */
  subtree(e) {
    if (m(e))
      return this;
    {
      const t = y(e), s = this.children.get(t);
      return s !== null ? s.subtree(I(e)) : new S(null);
    }
  }
  /**
   * Sets a value at the specified path.
   *
   * @param relativePath - Path to set value at.
   * @param toSet - Value to set.
   * @returns Resulting tree.
   */
  set(e, t) {
    if (m(e))
      return new S(t, this.children);
    {
      const s = y(e), r = (this.children.get(s) || new S(null)).set(I(e), t), o = this.children.insert(s, r);
      return new S(this.value, o);
    }
  }
  /**
   * Removes the value at the specified path.
   *
   * @param relativePath - Path to value to remove.
   * @returns Resulting tree.
   */
  remove(e) {
    if (m(e))
      return this.children.isEmpty() ? new S(null) : new S(null, this.children);
    {
      const t = y(e), s = this.children.get(t);
      if (s) {
        const i = s.remove(I(e));
        let r;
        return i.isEmpty() ? r = this.children.remove(t) : r = this.children.insert(t, i), this.value === null && r.isEmpty() ? new S(null) : new S(this.value, r);
      } else
        return this;
    }
  }
  /**
   * Gets a value from the tree.
   *
   * @param relativePath - Path to get value for.
   * @returns Value at path, or null.
   */
  get(e) {
    if (m(e))
      return this.value;
    {
      const t = y(e), s = this.children.get(t);
      return s ? s.get(I(e)) : null;
    }
  }
  /**
   * Replace the subtree at the specified path with the given new tree.
   *
   * @param relativePath - Path to replace subtree for.
   * @param newTree - New tree.
   * @returns Resulting tree.
   */
  setTree(e, t) {
    if (m(e))
      return t;
    {
      const s = y(e), r = (this.children.get(s) || new S(null)).setTree(I(e), t);
      let o;
      return r.isEmpty() ? o = this.children.remove(s) : o = this.children.insert(s, r), new S(this.value, o);
    }
  }
  /**
   * Performs a depth first fold on this tree. Transforms a tree into a single
   * value, given a function that operates on the path to a node, an optional
   * current value, and a map of child names to folded subtrees
   */
  fold(e) {
    return this.fold_(C(), e);
  }
  /**
   * Recursive helper for public-facing fold() method
   */
  fold_(e, t) {
    const s = {};
    return this.children.inorderTraversal((i, r) => {
      s[i] = r.fold_(A(e, i), t);
    }), t(e, this.value, s);
  }
  /**
   * Find the first matching value on the given path. Return the result of applying f to it.
   */
  findOnPath(e, t) {
    return this.findOnPath_(e, C(), t);
  }
  findOnPath_(e, t, s) {
    const i = this.value ? s(t, this.value) : !1;
    if (i)
      return i;
    if (m(e))
      return null;
    {
      const r = y(e), o = this.children.get(r);
      return o ? o.findOnPath_(I(e), A(t, r), s) : null;
    }
  }
  foreachOnPath(e, t) {
    return this.foreachOnPath_(e, C(), t);
  }
  foreachOnPath_(e, t, s) {
    if (m(e))
      return this;
    {
      this.value && s(t, this.value);
      const i = y(e), r = this.children.get(i);
      return r ? r.foreachOnPath_(I(e), A(t, i), s) : new S(null);
    }
  }
  /**
   * Calls the given function for each node in the tree that has a value.
   *
   * @param f - A function to be called with the path from the root of the tree to
   * a node, and the value at that node. Called in depth-first order.
   */
  foreach(e) {
    this.foreach_(C(), e);
  }
  foreach_(e, t) {
    this.children.inorderTraversal((s, i) => {
      i.foreach_(A(e, s), t);
    }), this.value && t(e, this.value);
  }
  foreachChild(e) {
    this.children.inorderTraversal((t, s) => {
      s.value && e(t, s.value);
    });
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
class $ {
  constructor(e) {
    this.writeTree_ = e;
  }
  static empty() {
    return new $(new S(null));
  }
}
function Ke(n, e, t) {
  if (m(e))
    return new $(new S(t));
  {
    const s = n.writeTree_.findRootMostValueAndPath(e);
    if (s != null) {
      const i = s.path;
      let r = s.value;
      const o = U(i, e);
      return r = r.updateChild(o, t), new $(n.writeTree_.set(i, r));
    } else {
      const i = new S(t), r = n.writeTree_.setTree(e, i);
      return new $(r);
    }
  }
}
function Os(n, e, t) {
  let s = n;
  return B(t, (i, r) => {
    s = Ke(s, A(e, i), r);
  }), s;
}
function Ms(n, e) {
  if (m(e))
    return $.empty();
  {
    const t = n.writeTree_.setTree(e, new S(null));
    return new $(t);
  }
}
function on(n, e) {
  return me(n, e) != null;
}
function me(n, e) {
  const t = n.writeTree_.findRootMostValueAndPath(e);
  return t != null ? n.writeTree_.get(t.path).getChild(U(t.path, e)) : null;
}
function xs(n) {
  const e = [], t = n.writeTree_.value;
  return t != null ? t.isLeafNode() || t.forEachChild(M, (s, i) => {
    e.push(new w(s, i));
  }) : n.writeTree_.children.inorderTraversal((s, i) => {
    i.value != null && e.push(new w(s, i.value));
  }), e;
}
function ne(n, e) {
  if (m(e))
    return n;
  {
    const t = me(n, e);
    return t != null ? new $(new S(t)) : new $(n.writeTree_.subtree(e));
  }
}
function an(n) {
  return n.writeTree_.isEmpty();
}
function Te(n, e) {
  return Er(C(), n.writeTree_, e);
}
function Er(n, e, t) {
  if (e.value != null)
    return t.updateChild(n, e.value);
  {
    let s = null;
    return e.children.inorderTraversal((i, r) => {
      i === ".priority" ? (f(r.value !== null, "Priority writes must always be leaf nodes"), s = r.value) : t = Er(A(n, i), r, t);
    }), !t.getChild(n).isEmpty() && s !== null && (t = t.updateChild(A(n, ".priority"), s)), t;
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
function vr(n, e) {
  return Nr(e, n);
}
function ou(n, e, t, s, i) {
  f(s > n.lastWriteId, "Stacking an older write on top of newer ones"), i === void 0 && (i = !0), n.allWrites.push({
    path: e,
    snap: t,
    writeId: s,
    visible: i
  }), i && (n.visibleWrites = Ke(n.visibleWrites, e, t)), n.lastWriteId = s;
}
function au(n, e) {
  for (let t = 0; t < n.allWrites.length; t++) {
    const s = n.allWrites[t];
    if (s.writeId === e)
      return s;
  }
  return null;
}
function cu(n, e) {
  const t = n.allWrites.findIndex((a) => a.writeId === e);
  f(t >= 0, "removeWrite called with nonexistent writeId.");
  const s = n.allWrites[t];
  n.allWrites.splice(t, 1);
  let i = s.visible, r = !1, o = n.allWrites.length - 1;
  for (; i && o >= 0; ) {
    const a = n.allWrites[o];
    a.visible && (o >= t && lu(a, s.path) ? i = !1 : H(s.path, a.path) && (r = !0)), o--;
  }
  if (i) {
    if (r)
      return hu(n), !0;
    if (s.snap)
      n.visibleWrites = Ms(n.visibleWrites, s.path);
    else {
      const a = s.children;
      B(a, (c) => {
        n.visibleWrites = Ms(n.visibleWrites, A(s.path, c));
      });
    }
    return !0;
  } else return !1;
}
function lu(n, e) {
  if (n.snap)
    return H(n.path, e);
  for (const t in n.children)
    if (n.children.hasOwnProperty(t) && H(A(n.path, t), e))
      return !0;
  return !1;
}
function hu(n) {
  n.visibleWrites = Sr(n.allWrites, uu, C()), n.allWrites.length > 0 ? n.lastWriteId = n.allWrites[n.allWrites.length - 1].writeId : n.lastWriteId = -1;
}
function uu(n) {
  return n.visible;
}
function Sr(n, e, t) {
  let s = $.empty();
  for (let i = 0; i < n.length; ++i) {
    const r = n[i];
    if (e(r)) {
      const o = r.path;
      let a;
      if (r.snap)
        H(t, o) ? (a = U(t, o), s = Ke(s, a, r.snap)) : H(o, t) && (a = U(o, t), s = Ke(s, C(), r.snap.getChild(a)));
      else if (r.children) {
        if (H(t, o))
          a = U(t, o), s = Os(s, a, r.children);
        else if (H(o, t))
          if (a = U(o, t), m(a))
            s = Os(s, C(), r.children);
          else {
            const c = Se(r.children, y(a));
            if (c) {
              const l = c.getChild(I(a));
              s = Ke(s, C(), l);
            }
          }
      } else
        throw Re("WriteRecord should have .snap or .children");
    }
  }
  return s;
}
function Ir(n, e, t, s, i) {
  if (!s && !i) {
    const r = me(n.visibleWrites, e);
    if (r != null)
      return r;
    {
      const o = ne(n.visibleWrites, e);
      if (an(o))
        return t;
      if (t == null && !on(o, C()))
        return null;
      {
        const a = t || b.EMPTY_NODE;
        return Te(o, a);
      }
    }
  } else {
    const r = ne(n.visibleWrites, e);
    if (!i && an(r))
      return t;
    if (!i && t == null && !on(r, C()))
      return null;
    {
      const o = function(l) {
        return (l.visible || i) && (!s || !~s.indexOf(l.writeId)) && (H(l.path, e) || H(e, l.path));
      }, a = Sr(n.allWrites, o, e), c = t || b.EMPTY_NODE;
      return Te(a, c);
    }
  }
}
function du(n, e, t) {
  let s = b.EMPTY_NODE;
  const i = me(n.visibleWrites, e);
  if (i)
    return i.isLeafNode() || i.forEachChild(M, (r, o) => {
      s = s.updateImmediateChild(r, o);
    }), s;
  if (t) {
    const r = ne(n.visibleWrites, e);
    return t.forEachChild(M, (o, a) => {
      const c = Te(ne(r, new T(o)), a);
      s = s.updateImmediateChild(o, c);
    }), xs(r).forEach((o) => {
      s = s.updateImmediateChild(o.name, o.node);
    }), s;
  } else {
    const r = ne(n.visibleWrites, e);
    return xs(r).forEach((o) => {
      s = s.updateImmediateChild(o.name, o.node);
    }), s;
  }
}
function fu(n, e, t, s, i) {
  f(s || i, "Either existingEventSnap or existingServerSnap must exist");
  const r = A(e, t);
  if (on(n.visibleWrites, r))
    return null;
  {
    const o = ne(n.visibleWrites, r);
    return an(o) ? i.getChild(t) : Te(o, i.getChild(t));
  }
}
function pu(n, e, t, s) {
  const i = A(e, t), r = me(n.visibleWrites, i);
  if (r != null)
    return r;
  if (s.isCompleteForChild(t)) {
    const o = ne(n.visibleWrites, i);
    return Te(o, s.getNode().getImmediateChild(t));
  } else
    return null;
}
function _u(n, e) {
  return me(n.visibleWrites, e);
}
function gu(n, e, t, s, i, r, o) {
  let a;
  const c = ne(n.visibleWrites, e), l = me(c, C());
  if (l != null)
    a = l;
  else if (t != null)
    a = Te(c, t);
  else
    return [];
  if (a = a.withIndex(o), !a.isEmpty() && !a.isLeafNode()) {
    const u = [], h = o.getCompare(), d = r ? a.getReverseIteratorFrom(s, o) : a.getIteratorFrom(s, o);
    let p = d.getNext();
    for (; p && u.length < i; )
      h(p, s) !== 0 && u.push(p), p = d.getNext();
    return u;
  } else
    return [];
}
function mu() {
  return {
    visibleWrites: $.empty(),
    allWrites: [],
    lastWriteId: -1
  };
}
function cn(n, e, t, s) {
  return Ir(n.writeTree, n.treePath, e, t, s);
}
function Tr(n, e) {
  return du(n.writeTree, n.treePath, e);
}
function Ps(n, e, t, s) {
  return fu(n.writeTree, n.treePath, e, t, s);
}
function pt(n, e) {
  return _u(n.writeTree, A(n.treePath, e));
}
function yu(n, e, t, s, i, r) {
  return gu(n.writeTree, n.treePath, e, t, s, i, r);
}
function Ln(n, e, t) {
  return pu(n.writeTree, n.treePath, e, t);
}
function Rr(n, e) {
  return Nr(A(n.treePath, e), n.writeTree);
}
function Nr(n, e) {
  return {
    treePath: n,
    writeTree: e
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
class wu {
  constructor() {
    this.changeMap = /* @__PURE__ */ new Map();
  }
  trackChildChange(e) {
    const t = e.type, s = e.childName;
    f(t === "child_added" || t === "child_changed" || t === "child_removed", "Only child changes supported for tracking"), f(s !== ".priority", "Only non-priority child changes can be tracked.");
    const i = this.changeMap.get(s);
    if (i) {
      const r = i.type;
      if (t === "child_added" && r === "child_removed")
        this.changeMap.set(s, Ns(s, e.snapshotNode, i.snapshotNode));
      else if (t === "child_removed" && r === "child_added")
        this.changeMap.delete(s);
      else if (t === "child_removed" && r === "child_changed")
        this.changeMap.set(s, zh(s, i.oldSnap));
      else if (t === "child_changed" && r === "child_added")
        this.changeMap.set(s, Gh(s, e.snapshotNode));
      else if (t === "child_changed" && r === "child_changed")
        this.changeMap.set(s, Ns(s, e.snapshotNode, i.oldSnap));
      else
        throw Re("Illegal combination of changes: " + e + " occurred after " + i);
    } else
      this.changeMap.set(s, e);
  }
  getChanges() {
    return Array.from(this.changeMap.values());
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
class bu {
  getCompleteChild(e) {
    return null;
  }
  getChildAfterChild(e, t, s) {
    return null;
  }
}
const Ar = new bu();
class Fn {
  constructor(e, t, s = null) {
    this.writes_ = e, this.viewCache_ = t, this.optCompleteServerCache_ = s;
  }
  getCompleteChild(e) {
    const t = this.viewCache_.eventCache;
    if (t.isCompleteForChild(e))
      return t.getNode().getImmediateChild(e);
    {
      const s = this.optCompleteServerCache_ != null ? new Pn(this.optCompleteServerCache_, !0, !1) : this.viewCache_.serverCache;
      return Ln(this.writes_, e, s);
    }
  }
  getChildAfterChild(e, t, s) {
    const i = this.optCompleteServerCache_ != null ? this.optCompleteServerCache_ : ge(this.viewCache_), r = yu(this.writes_, i, t, 1, s, e);
    return r.length === 0 ? null : r[0];
  }
}
function Cu(n, e) {
  f(e.eventCache.getNode().isIndexed(n.filter.getIndex()), "Event snap not indexed"), f(e.serverCache.getNode().isIndexed(n.filter.getIndex()), "Server snap not indexed");
}
function Eu(n, e, t, s, i) {
  const r = new wu();
  let o, a;
  if (t.type === q.OVERWRITE) {
    const l = t;
    l.source.fromUser ? o = ln(n, e, l.path, l.snap, s, i, r) : (f(l.source.fromServer, "Unknown source."), a = l.source.tagged || e.serverCache.isFiltered() && !m(l.path), o = _t(n, e, l.path, l.snap, s, i, a, r));
  } else if (t.type === q.MERGE) {
    const l = t;
    l.source.fromUser ? o = Su(n, e, l.path, l.children, s, i, r) : (f(l.source.fromServer, "Unknown source."), a = l.source.tagged || e.serverCache.isFiltered(), o = hn(n, e, l.path, l.children, s, i, a, r));
  } else if (t.type === q.ACK_USER_WRITE) {
    const l = t;
    l.revert ? o = Ru(n, e, l.path, s, i, r) : o = Iu(n, e, l.path, l.affectedTree, s, i, r);
  } else if (t.type === q.LISTEN_COMPLETE)
    o = Tu(n, e, t.path, s, r);
  else
    throw Re("Unknown operation type: " + t.type);
  const c = r.getChanges();
  return vu(e, o, c), { viewCache: o, changes: c };
}
function vu(n, e, t) {
  const s = e.eventCache;
  if (s.isFullyInitialized()) {
    const i = s.getNode().isLeafNode() || s.getNode().isEmpty(), r = rn(n);
    (t.length > 0 || !n.eventCache.isFullyInitialized() || i && !s.getNode().equals(r) || !s.getNode().getPriority().equals(r.getPriority())) && t.push(jh(rn(e)));
  }
}
function kr(n, e, t, s, i, r) {
  const o = e.eventCache;
  if (pt(s, t) != null)
    return e;
  {
    let a, c;
    if (m(t))
      if (f(e.serverCache.isFullyInitialized(), "If change path is empty, we must have complete server data"), e.serverCache.isFiltered()) {
        const l = ge(e), u = l instanceof b ? l : b.EMPTY_NODE, h = Tr(s, u);
        a = n.filter.updateFullNode(e.eventCache.getNode(), h, r);
      } else {
        const l = cn(s, ge(e));
        a = n.filter.updateFullNode(e.eventCache.getNode(), l, r);
      }
    else {
      const l = y(t);
      if (l === ".priority") {
        f(ie(t) === 1, "Can't have a priority with additional path components");
        const u = o.getNode();
        c = e.serverCache.getNode();
        const h = Ps(s, t, u, c);
        h != null ? a = n.filter.updatePriority(u, h) : a = o.getNode();
      } else {
        const u = I(t);
        let h;
        if (o.isCompleteForChild(l)) {
          c = e.serverCache.getNode();
          const d = Ps(s, t, o.getNode(), c);
          d != null ? h = o.getNode().getImmediateChild(l).updateChild(u, d) : h = o.getNode().getImmediateChild(l);
        } else
          h = Ln(s, l, e.serverCache);
        h != null ? a = n.filter.updateChild(o.getNode(), l, h, u, i, r) : a = o.getNode();
      }
    }
    return He(e, a, o.isFullyInitialized() || m(t), n.filter.filtersNodes());
  }
}
function _t(n, e, t, s, i, r, o, a) {
  const c = e.serverCache;
  let l;
  const u = o ? n.filter : n.filter.getIndexedFilter();
  if (m(t))
    l = u.updateFullNode(c.getNode(), s, null);
  else if (u.filtersNodes() && !c.isFiltered()) {
    const p = c.getNode().updateChild(t, s);
    l = u.updateFullNode(c.getNode(), p, null);
  } else {
    const p = y(t);
    if (!c.isCompleteForPath(t) && ie(t) > 1)
      return e;
    const g = I(t), x = c.getNode().getImmediateChild(p).updateChild(g, s);
    p === ".priority" ? l = u.updatePriority(c.getNode(), x) : l = u.updateChild(c.getNode(), p, x, g, Ar, null);
  }
  const h = Cr(e, l, c.isFullyInitialized() || m(t), u.filtersNodes()), d = new Fn(i, h, r);
  return kr(n, h, t, i, d, a);
}
function ln(n, e, t, s, i, r, o) {
  const a = e.eventCache;
  let c, l;
  const u = new Fn(i, e, r);
  if (m(t))
    l = n.filter.updateFullNode(e.eventCache.getNode(), s, o), c = He(e, l, !0, n.filter.filtersNodes());
  else {
    const h = y(t);
    if (h === ".priority")
      l = n.filter.updatePriority(e.eventCache.getNode(), s), c = He(e, l, a.isFullyInitialized(), a.isFiltered());
    else {
      const d = I(t), p = a.getNode().getImmediateChild(h);
      let g;
      if (m(d))
        g = s;
      else {
        const E = u.getCompleteChild(h);
        E != null ? or(d) === ".priority" && E.getChild(cr(d)).isEmpty() ? g = E : g = E.updateChild(d, s) : g = b.EMPTY_NODE;
      }
      if (p.equals(g))
        c = e;
      else {
        const E = n.filter.updateChild(a.getNode(), h, g, d, u, o);
        c = He(e, E, a.isFullyInitialized(), n.filter.filtersNodes());
      }
    }
  }
  return c;
}
function Ls(n, e) {
  return n.eventCache.isCompleteForChild(e);
}
function Su(n, e, t, s, i, r, o) {
  let a = e;
  return s.foreach((c, l) => {
    const u = A(t, c);
    Ls(e, y(u)) && (a = ln(n, a, u, l, i, r, o));
  }), s.foreach((c, l) => {
    const u = A(t, c);
    Ls(e, y(u)) || (a = ln(n, a, u, l, i, r, o));
  }), a;
}
function Fs(n, e, t) {
  return t.foreach((s, i) => {
    e = e.updateChild(s, i);
  }), e;
}
function hn(n, e, t, s, i, r, o, a) {
  if (e.serverCache.getNode().isEmpty() && !e.serverCache.isFullyInitialized())
    return e;
  let c = e, l;
  m(t) ? l = s : l = new S(null).setTree(t, s);
  const u = e.serverCache.getNode();
  return l.children.inorderTraversal((h, d) => {
    if (u.hasChild(h)) {
      const p = e.serverCache.getNode().getImmediateChild(h), g = Fs(n, p, d);
      c = _t(n, c, new T(h), g, i, r, o, a);
    }
  }), l.children.inorderTraversal((h, d) => {
    const p = !e.serverCache.isCompleteForChild(h) && d.value === null;
    if (!u.hasChild(h) && !p) {
      const g = e.serverCache.getNode().getImmediateChild(h), E = Fs(n, g, d);
      c = _t(n, c, new T(h), E, i, r, o, a);
    }
  }), c;
}
function Iu(n, e, t, s, i, r, o) {
  if (pt(i, t) != null)
    return e;
  const a = e.serverCache.isFiltered(), c = e.serverCache;
  if (s.value != null) {
    if (m(t) && c.isFullyInitialized() || c.isCompleteForPath(t))
      return _t(n, e, t, c.getNode().getChild(t), i, r, a, o);
    if (m(t)) {
      let l = new S(null);
      return c.getNode().forEachChild(ve, (u, h) => {
        l = l.set(new T(u), h);
      }), hn(n, e, t, l, i, r, a, o);
    } else
      return e;
  } else {
    let l = new S(null);
    return s.foreach((u, h) => {
      const d = A(t, u);
      c.isCompleteForPath(d) && (l = l.set(u, c.getNode().getChild(d)));
    }), hn(n, e, t, l, i, r, a, o);
  }
}
function Tu(n, e, t, s, i) {
  const r = e.serverCache, o = Cr(e, r.getNode(), r.isFullyInitialized() || m(t), r.isFiltered());
  return kr(n, o, t, s, Ar, i);
}
function Ru(n, e, t, s, i, r) {
  let o;
  if (pt(s, t) != null)
    return e;
  {
    const a = new Fn(s, e, i), c = e.eventCache.getNode();
    let l;
    if (m(t) || y(t) === ".priority") {
      let u;
      if (e.serverCache.isFullyInitialized())
        u = cn(s, ge(e));
      else {
        const h = e.serverCache.getNode();
        f(h instanceof b, "serverChildren would be complete if leaf node"), u = Tr(s, h);
      }
      u = u, l = n.filter.updateFullNode(c, u, r);
    } else {
      const u = y(t);
      let h = Ln(s, u, e.serverCache);
      h == null && e.serverCache.isCompleteForChild(u) && (h = c.getImmediateChild(u)), h != null ? l = n.filter.updateChild(c, u, h, I(t), a, r) : e.eventCache.getNode().hasChild(u) ? l = n.filter.updateChild(c, u, b.EMPTY_NODE, I(t), a, r) : l = c, l.isEmpty() && e.serverCache.isFullyInitialized() && (o = cn(s, ge(e)), o.isLeafNode() && (l = n.filter.updateFullNode(l, o, r)));
    }
    return o = e.serverCache.isFullyInitialized() || pt(s, C()) != null, He(e, l, o, n.filter.filtersNodes());
  }
}
function Nu(n, e) {
  const t = ge(n.viewCache_);
  return t && (n.query._queryParams.loadsAllData() || !m(e) && !t.getImmediateChild(y(e)).isEmpty()) ? t.getChild(e) : null;
}
function Us(n, e, t, s) {
  e.type === q.MERGE && e.source.queryId !== null && (f(ge(n.viewCache_), "We should always have a full cache before handling merges"), f(rn(n.viewCache_), "Missing event cache, even though we have a server cache"));
  const i = n.viewCache_, r = Eu(n.processor_, i, e, t, s);
  return Cu(n.processor_, r.viewCache), f(r.viewCache.serverCache.isFullyInitialized() || !i.serverCache.isFullyInitialized(), "Once a server snap is complete, it should never go back"), n.viewCache_ = r.viewCache, Au(n, r.changes, r.viewCache.eventCache.getNode());
}
function Au(n, e, t, s) {
  const i = n.eventRegistrations_;
  return nu(n.eventGenerator_, e, t, i);
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
let Bs;
function ku(n) {
  f(!Bs, "__referenceConstructor has already been defined"), Bs = n;
}
function Un(n, e, t, s) {
  const i = e.source.queryId;
  if (i !== null) {
    const r = n.views.get(i);
    return f(r != null, "SyncTree gave us an op for an invalid query."), Us(r, e, t, s);
  } else {
    let r = [];
    for (const o of n.views.values())
      r = r.concat(Us(o, e, t, s));
    return r;
  }
}
function Bn(n, e) {
  let t = null;
  for (const s of n.views.values())
    t = t || Nu(s, e);
  return t;
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
let Ws;
function Du(n) {
  f(!Ws, "__referenceConstructor has already been defined"), Ws = n;
}
class Hs {
  /**
   * @param listenProvider_ - Used by SyncTree to start / stop listening
   *   to server data.
   */
  constructor(e) {
    this.listenProvider_ = e, this.syncPointTree_ = new S(null), this.pendingWriteTree_ = mu(), this.tagToQueryMap = /* @__PURE__ */ new Map(), this.queryToTagMap = /* @__PURE__ */ new Map();
  }
}
function Ou(n, e, t, s, i) {
  return ou(n.pendingWriteTree_, e, t, s, i), i ? vt(n, new _e(mr(), e, t)) : [];
}
function Ce(n, e, t = !1) {
  const s = au(n.pendingWriteTree_, e);
  if (cu(n.pendingWriteTree_, e)) {
    let r = new S(null);
    return s.snap != null ? r = r.set(C(), !0) : B(s.children, (o) => {
      r = r.set(new T(o), !0);
    }), vt(n, new ft(s.path, r, t));
  } else
    return [];
}
function Et(n, e, t) {
  return vt(n, new _e(yr(), e, t));
}
function Mu(n, e, t) {
  const s = S.fromObject(t);
  return vt(n, new je(yr(), e, s));
}
function xu(n, e, t, s) {
  const i = xr(n, s);
  if (i != null) {
    const r = Pr(i), o = r.path, a = r.queryId, c = U(o, e), l = new _e(wr(a), c, t);
    return Lr(n, o, l);
  } else
    return [];
}
function Pu(n, e, t, s) {
  const i = xr(n, s);
  if (i) {
    const r = Pr(i), o = r.path, a = r.queryId, c = U(o, e), l = S.fromObject(t), u = new je(wr(a), c, l);
    return Lr(n, o, u);
  } else
    return [];
}
function Dr(n, e, t) {
  const i = n.pendingWriteTree_, r = n.syncPointTree_.findOnPath(e, (o, a) => {
    const c = U(o, e), l = Bn(a, c);
    if (l)
      return l;
  });
  return Ir(i, e, r, t, !0);
}
function vt(n, e) {
  return Or(
    e,
    n.syncPointTree_,
    /*serverCache=*/
    null,
    vr(n.pendingWriteTree_, C())
  );
}
function Or(n, e, t, s) {
  if (m(n.path))
    return Mr(n, e, t, s);
  {
    const i = e.get(C());
    t == null && i != null && (t = Bn(i, C()));
    let r = [];
    const o = y(n.path), a = n.operationForChild(o), c = e.children.get(o);
    if (c && a) {
      const l = t ? t.getImmediateChild(o) : null, u = Rr(s, o);
      r = r.concat(Or(a, c, l, u));
    }
    return i && (r = r.concat(Un(i, n, s, t))), r;
  }
}
function Mr(n, e, t, s) {
  const i = e.get(C());
  t == null && i != null && (t = Bn(i, C()));
  let r = [];
  return e.children.inorderTraversal((o, a) => {
    const c = t ? t.getImmediateChild(o) : null, l = Rr(s, o), u = n.operationForChild(o);
    u && (r = r.concat(Mr(u, a, c, l)));
  }), i && (r = r.concat(Un(i, n, s, t))), r;
}
function xr(n, e) {
  return n.tagToQueryMap.get(e);
}
function Pr(n) {
  const e = n.indexOf("$");
  return f(e !== -1 && e < n.length - 1, "Bad queryKey."), {
    queryId: n.substr(e + 1),
    path: new T(n.substr(0, e))
  };
}
function Lr(n, e, t) {
  const s = n.syncPointTree_.get(e);
  f(s, "Missing sync point for query tag that we're tracking");
  const i = vr(n.pendingWriteTree_, e);
  return Un(s, t, i, null);
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
class Wn {
  constructor(e) {
    this.node_ = e;
  }
  getImmediateChild(e) {
    const t = this.node_.getImmediateChild(e);
    return new Wn(t);
  }
  node() {
    return this.node_;
  }
}
class Hn {
  constructor(e, t) {
    this.syncTree_ = e, this.path_ = t;
  }
  getImmediateChild(e) {
    const t = A(this.path_, e);
    return new Hn(this.syncTree_, t);
  }
  node() {
    return Dr(this.syncTree_, this.path_);
  }
}
const Lu = function(n) {
  return n = n || {}, n.timestamp = n.timestamp || (/* @__PURE__ */ new Date()).getTime(), n;
}, Ks = function(n, e, t) {
  if (!n || typeof n != "object")
    return n;
  if (f(".sv" in n, "Unexpected leaf node or priority contents"), typeof n[".sv"] == "string")
    return Fu(n[".sv"], e, t);
  if (typeof n[".sv"] == "object")
    return Uu(n[".sv"], e);
  f(!1, "Unexpected server value: " + JSON.stringify(n, null, 2));
}, Fu = function(n, e, t) {
  switch (n) {
    case "timestamp":
      return t.timestamp;
    default:
      f(!1, "Unexpected server value: " + n);
  }
}, Uu = function(n, e, t) {
  n.hasOwnProperty("increment") || f(!1, "Unexpected server value: " + JSON.stringify(n, null, 2));
  const s = n.increment;
  typeof s != "number" && f(!1, "Unexpected increment value: " + s);
  const i = e.node();
  if (f(i !== null && typeof i < "u", "Expected ChildrenNode.EMPTY_NODE for nulls"), !i.isLeafNode())
    return s;
  const o = i.getValue();
  return typeof o != "number" ? s : o + s;
}, Bu = function(n, e, t, s) {
  return Kn(e, new Hn(t, n), s);
}, Wu = function(n, e, t) {
  return Kn(n, new Wn(e), t);
};
function Kn(n, e, t) {
  const s = n.getPriority().val(), i = Ks(s, e.getImmediateChild(".priority"), t);
  let r;
  if (n.isLeafNode()) {
    const o = n, a = Ks(o.getValue(), e, t);
    return a !== o.getValue() || i !== o.getPriority().val() ? new R(a, O(i)) : n;
  } else {
    const o = n;
    return r = o, i !== o.getPriority().val() && (r = r.updatePriority(new R(i))), o.forEachChild(M, (a, c) => {
      const l = Kn(c, e.getImmediateChild(a), t);
      l !== c && (r = r.updateImmediateChild(a, l));
    }), r;
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
class $n {
  /**
   * @param name - Optional name of the node.
   * @param parent - Optional parent node.
   * @param node - Optional node to wrap.
   */
  constructor(e = "", t = null, s = { children: {}, childCount: 0 }) {
    this.name = e, this.parent = t, this.node = s;
  }
}
function Vn(n, e) {
  let t = e instanceof T ? e : new T(e), s = n, i = y(t);
  for (; i !== null; ) {
    const r = Se(s.node.children, i) || {
      children: {},
      childCount: 0
    };
    s = new $n(i, s, r), t = I(t), i = y(t);
  }
  return s;
}
function ke(n) {
  return n.node.value;
}
function Fr(n, e) {
  n.node.value = e, un(n);
}
function Ur(n) {
  return n.node.childCount > 0;
}
function Hu(n) {
  return ke(n) === void 0 && !Ur(n);
}
function St(n, e) {
  B(n.node.children, (t, s) => {
    e(new $n(t, n, s));
  });
}
function Br(n, e, t, s) {
  t && e(n), St(n, (i) => {
    Br(i, e, !0);
  });
}
function Ku(n, e, t) {
  let s = n.parent;
  for (; s !== null; ) {
    if (e(s))
      return !0;
    s = s.parent;
  }
  return !1;
}
function Xe(n) {
  return new T(n.parent === null ? n.name : Xe(n.parent) + "/" + n.name);
}
function un(n) {
  n.parent !== null && $u(n.parent, n.name, n);
}
function $u(n, e, t) {
  const s = Hu(t), i = J(n.node.children, e);
  s && i ? (delete n.node.children[e], n.node.childCount--, un(n)) : !s && !i && (n.node.children[e] = t.node, n.node.childCount++, un(n));
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
const Vu = /[\[\].#$\/\u0000-\u001F\u007F]/, qu = /[\[\].#$\u0000-\u001F\u007F]/, Vt = 10 * 1024 * 1024, Wr = function(n) {
  return typeof n == "string" && n.length !== 0 && !Vu.test(n);
}, ju = function(n) {
  return typeof n == "string" && n.length !== 0 && !qu.test(n);
}, Gu = function(n) {
  return n && (n = n.replace(/^\/*\.info(\/|$)/, "/")), ju(n);
}, Hr = function(n, e, t) {
  const s = t instanceof T ? new Th(t, n) : t;
  if (e === void 0)
    throw new Error(n + "contains undefined " + oe(s));
  if (typeof e == "function")
    throw new Error(n + "contains a function " + oe(s) + " with contents = " + e.toString());
  if (Wi(e))
    throw new Error(n + "contains " + e.toString() + " " + oe(s));
  if (typeof e == "string" && e.length > Vt / 3 && mt(e) > Vt)
    throw new Error(n + "contains a string greater than " + Vt + " utf8 bytes " + oe(s) + " ('" + e.substring(0, 50) + "...')");
  if (e && typeof e == "object") {
    let i = !1, r = !1;
    if (B(e, (o, a) => {
      if (o === ".value")
        i = !0;
      else if (o !== ".priority" && o !== ".sv" && (r = !0, !Wr(o)))
        throw new Error(n + " contains an invalid key (" + o + ") " + oe(s) + `.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);
      Rh(s, o), Hr(n, a, s), Nh(s);
    }), i && r)
      throw new Error(n + ' contains ".value" child ' + oe(s) + " in addition to actual children.");
  }
}, zu = function(n, e) {
  const t = e.path.toString();
  if (typeof e.repoInfo.host != "string" || e.repoInfo.host.length === 0 || !Wr(e.repoInfo.namespace) && e.repoInfo.host.split(":")[0] !== "localhost" || t.length !== 0 && !Gu(t))
    throw new Error(yo(n, "url") + `must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`);
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
class Yu {
  constructor() {
    this.eventLists_ = [], this.recursionDepth_ = 0;
  }
}
function Qu(n, e) {
  let t = null;
  for (let s = 0; s < e.length; s++) {
    const i = e[s], r = i.getPath();
    t !== null && !lr(r, t.path) && (n.eventLists_.push(t), t = null), t === null && (t = { events: [], path: r }), t.events.push(i);
  }
  t && n.eventLists_.push(t);
}
function ye(n, e, t) {
  Qu(n, t), Xu(n, (s) => H(s, e) || H(e, s));
}
function Xu(n, e) {
  n.recursionDepth_++;
  let t = !0;
  for (let s = 0; s < n.eventLists_.length; s++) {
    const i = n.eventLists_[s];
    if (i) {
      const r = i.path;
      e(r) ? (Ju(n.eventLists_[s]), n.eventLists_[s] = null) : t = !1;
    }
  }
  t && (n.eventLists_ = []), n.recursionDepth_--;
}
function Ju(n) {
  for (let e = 0; e < n.events.length; e++) {
    const t = n.events[e];
    if (t !== null) {
      n.events[e] = null;
      const s = t.getEventRunner();
      Be && D("event: " + t.toString()), Ye(s);
    }
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
const Zu = "repo_interrupt", ed = 25;
class td {
  constructor(e, t, s, i) {
    this.repoInfo_ = e, this.forceRestClient_ = t, this.authTokenProvider_ = s, this.appCheckProvider_ = i, this.dataUpdateCount = 0, this.statsListener_ = null, this.eventQueue_ = new Yu(), this.nextWriteId_ = 1, this.interceptServerDataCallback_ = null, this.onDisconnect_ = dt(), this.transactionQueueTree_ = new $n(), this.persistentConnection_ = null, this.key = this.repoInfo_.toURLString();
  }
  /**
   * @returns The URL corresponding to the root of this Firebase.
   */
  toString() {
    return (this.repoInfo_.secure ? "https://" : "http://") + this.repoInfo_.host;
  }
}
function nd(n, e, t) {
  if (n.stats_ = kn(n.repoInfo_), n.forceRestClient_ || Ql())
    n.server_ = new ut(n.repoInfo_, (s, i, r, o) => {
      $s(n, s, i, r, o);
    }, n.authTokenProvider_, n.appCheckProvider_), setTimeout(() => Vs(
      n,
      /* connectStatus= */
      !0
    ), 0);
  else {
    if (typeof t < "u" && t !== null) {
      if (typeof t != "object")
        throw new Error("Only objects are supported for option databaseAuthVariableOverride");
      try {
        k(t);
      } catch (s) {
        throw new Error("Invalid authOverride provided: " + s);
      }
    }
    n.persistentConnection_ = new Q(n.repoInfo_, e, (s, i, r, o) => {
      $s(n, s, i, r, o);
    }, (s) => {
      Vs(n, s);
    }, (s) => {
      id(n, s);
    }, n.authTokenProvider_, n.appCheckProvider_, t), n.server_ = n.persistentConnection_;
  }
  n.authTokenProvider_.addTokenChangeListener((s) => {
    n.server_.refreshAuthToken(s);
  }), n.appCheckProvider_.addTokenChangeListener((s) => {
    n.server_.refreshAppCheckToken(s.token);
  }), n.statsReporter_ = nh(n.repoInfo_, () => new tu(n.stats_, n.server_)), n.infoData_ = new Qh(), n.infoSyncTree_ = new Hs({
    startListening: (s, i, r, o) => {
      let a = [];
      const c = n.infoData_.getNode(s._path);
      return c.isEmpty() || (a = Et(n.infoSyncTree_, s._path, c), setTimeout(() => {
        o("ok");
      }, 0)), a;
    },
    stopListening: () => {
    }
  }), qn(n, "connected", !1), n.serverSyncTree_ = new Hs({
    startListening: (s, i, r, o) => (n.server_.listen(s, r, i, (a, c) => {
      const l = o(a, c);
      ye(n.eventQueue_, s._path, l);
    }), []),
    stopListening: (s, i) => {
      n.server_.unlisten(s, i);
    }
  });
}
function sd(n) {
  const t = n.infoData_.getNode(new T(".info/serverTimeOffset")).val() || 0;
  return (/* @__PURE__ */ new Date()).getTime() + t;
}
function Kr(n) {
  return Lu({
    timestamp: sd(n)
  });
}
function $s(n, e, t, s, i) {
  n.dataUpdateCount++;
  const r = new T(e);
  t = n.interceptServerDataCallback_ ? n.interceptServerDataCallback_(e, t) : t;
  let o = [];
  if (i)
    if (s) {
      const c = nt(t, (l) => O(l));
      o = Pu(n.serverSyncTree_, r, c, i);
    } else {
      const c = O(t);
      o = xu(n.serverSyncTree_, r, c, i);
    }
  else if (s) {
    const c = nt(t, (l) => O(l));
    o = Mu(n.serverSyncTree_, r, c);
  } else {
    const c = O(t);
    o = Et(n.serverSyncTree_, r, c);
  }
  let a = r;
  o.length > 0 && (a = Gn(n, r)), ye(n.eventQueue_, a, o);
}
function Vs(n, e) {
  qn(n, "connected", e), e === !1 && od(n);
}
function id(n, e) {
  B(e, (t, s) => {
    qn(n, t, s);
  });
}
function qn(n, e, t) {
  const s = new T("/.info/" + e), i = O(t);
  n.infoData_.updateSnapshot(s, i);
  const r = Et(n.infoSyncTree_, s, i);
  ye(n.eventQueue_, s, r);
}
function rd(n) {
  return n.nextWriteId_++;
}
function od(n) {
  $r(n, "onDisconnectEvents");
  const e = Kr(n), t = dt();
  sn(n.onDisconnect_, C(), (i, r) => {
    const o = Bu(i, r, n.serverSyncTree_, e);
    gr(t, i, o);
  });
  let s = [];
  sn(t, C(), (i, r) => {
    s = s.concat(Et(n.serverSyncTree_, i, r));
    const o = hd(n, i);
    Gn(n, o);
  }), n.onDisconnect_ = dt(), ye(n.eventQueue_, C(), s);
}
function ad(n) {
  n.persistentConnection_ && n.persistentConnection_.interrupt(Zu);
}
function $r(n, ...e) {
  let t = "";
  n.persistentConnection_ && (t = n.persistentConnection_.id + ":"), D(t, ...e);
}
function Vr(n, e, t) {
  return Dr(n.serverSyncTree_, e, t) || b.EMPTY_NODE;
}
function jn(n, e = n.transactionQueueTree_) {
  if (e || It(n, e), ke(e)) {
    const t = jr(n, e);
    f(t.length > 0, "Sending zero length transaction queue"), t.every(
      (i) => i.status === 0
      /* TransactionStatus.RUN */
    ) && cd(n, Xe(e), t);
  } else Ur(e) && St(e, (t) => {
    jn(n, t);
  });
}
function cd(n, e, t) {
  const s = t.map((l) => l.currentWriteId), i = Vr(n, e, s);
  let r = i;
  const o = i.hash();
  for (let l = 0; l < t.length; l++) {
    const u = t[l];
    f(u.status === 0, "tryToSendTransactionQueue_: items in queue should all be run."), u.status = 1, u.retryCount++;
    const h = U(e, u.path);
    r = r.updateChild(h, u.currentOutputSnapshotRaw);
  }
  const a = r.val(!0), c = e;
  n.server_.put(c.toString(), a, (l) => {
    $r(n, "transaction put response", {
      path: c.toString(),
      status: l
    });
    let u = [];
    if (l === "ok") {
      const h = [];
      for (let d = 0; d < t.length; d++)
        t[d].status = 2, u = u.concat(Ce(n.serverSyncTree_, t[d].currentWriteId)), t[d].onComplete && h.push(() => t[d].onComplete(null, !0, t[d].currentOutputSnapshotResolved)), t[d].unwatcher();
      It(n, Vn(n.transactionQueueTree_, e)), jn(n, n.transactionQueueTree_), ye(n.eventQueue_, e, u);
      for (let d = 0; d < h.length; d++)
        Ye(h[d]);
    } else {
      if (l === "datastale")
        for (let h = 0; h < t.length; h++)
          t[h].status === 3 ? t[h].status = 4 : t[h].status = 0;
      else {
        F("transaction at " + c.toString() + " failed: " + l);
        for (let h = 0; h < t.length; h++)
          t[h].status = 4, t[h].abortReason = l;
      }
      Gn(n, e);
    }
  }, o);
}
function Gn(n, e) {
  const t = qr(n, e), s = Xe(t), i = jr(n, t);
  return ld(n, i, s), s;
}
function ld(n, e, t) {
  if (e.length === 0)
    return;
  const s = [];
  let i = [];
  const o = e.filter((a) => a.status === 0).map((a) => a.currentWriteId);
  for (let a = 0; a < e.length; a++) {
    const c = e[a], l = U(t, c.path);
    let u = !1, h;
    if (f(l !== null, "rerunTransactionsUnderNode_: relativePath should not be null."), c.status === 4)
      u = !0, h = c.abortReason, i = i.concat(Ce(n.serverSyncTree_, c.currentWriteId, !0));
    else if (c.status === 0)
      if (c.retryCount >= ed)
        u = !0, h = "maxretry", i = i.concat(Ce(n.serverSyncTree_, c.currentWriteId, !0));
      else {
        const d = Vr(n, c.path, o);
        c.currentInputSnapshot = d;
        const p = e[a].update(d.val());
        if (p !== void 0) {
          Hr("transaction failed: Data returned ", p, c.path);
          let g = O(p);
          typeof p == "object" && p != null && J(p, ".priority") || (g = g.updatePriority(d.getPriority()));
          const x = c.currentWriteId, Je = Kr(n), V = Wu(g, d, Je);
          c.currentOutputSnapshotRaw = g, c.currentOutputSnapshotResolved = V, c.currentWriteId = rd(n), o.splice(o.indexOf(x), 1), i = i.concat(Ou(n.serverSyncTree_, c.path, V, c.currentWriteId, c.applyLocally)), i = i.concat(Ce(n.serverSyncTree_, x, !0));
        } else
          u = !0, h = "nodata", i = i.concat(Ce(n.serverSyncTree_, c.currentWriteId, !0));
      }
    ye(n.eventQueue_, t, i), i = [], u && (e[a].status = 2, function(d) {
      setTimeout(d, Math.floor(0));
    }(e[a].unwatcher), e[a].onComplete && (h === "nodata" ? s.push(() => e[a].onComplete(null, !1, e[a].currentInputSnapshot)) : s.push(() => e[a].onComplete(new Error(h), !1, null))));
  }
  It(n, n.transactionQueueTree_);
  for (let a = 0; a < s.length; a++)
    Ye(s[a]);
  jn(n, n.transactionQueueTree_);
}
function qr(n, e) {
  let t, s = n.transactionQueueTree_;
  for (t = y(e); t !== null && ke(s) === void 0; )
    s = Vn(s, t), e = I(e), t = y(e);
  return s;
}
function jr(n, e) {
  const t = [];
  return Gr(n, e, t), t.sort((s, i) => s.order - i.order), t;
}
function Gr(n, e, t) {
  const s = ke(e);
  if (s)
    for (let i = 0; i < s.length; i++)
      t.push(s[i]);
  St(e, (i) => {
    Gr(n, i, t);
  });
}
function It(n, e) {
  const t = ke(e);
  if (t) {
    let s = 0;
    for (let i = 0; i < t.length; i++)
      t[i].status !== 2 && (t[s] = t[i], s++);
    t.length = s, Fr(e, t.length > 0 ? t : void 0);
  }
  St(e, (s) => {
    It(n, s);
  });
}
function hd(n, e) {
  const t = Xe(qr(n, e)), s = Vn(n.transactionQueueTree_, e);
  return Ku(s, (i) => {
    qt(n, i);
  }), qt(n, s), Br(s, (i) => {
    qt(n, i);
  }), t;
}
function qt(n, e) {
  const t = ke(e);
  if (t) {
    const s = [];
    let i = [], r = -1;
    for (let o = 0; o < t.length; o++)
      t[o].status === 3 || (t[o].status === 1 ? (f(r === o - 1, "All SENT items should be at beginning of queue."), r = o, t[o].status = 3, t[o].abortReason = "set") : (f(t[o].status === 0, "Unexpected transaction status in abort"), t[o].unwatcher(), i = i.concat(Ce(n.serverSyncTree_, t[o].currentWriteId, !0)), t[o].onComplete && s.push(t[o].onComplete.bind(null, new Error("set"), !1, null))));
    r === -1 ? Fr(e, void 0) : t.length = r + 1, ye(n.eventQueue_, Xe(e), i);
    for (let o = 0; o < s.length; o++)
      Ye(s[o]);
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
function ud(n) {
  let e = "";
  const t = n.split("/");
  for (let s = 0; s < t.length; s++)
    if (t[s].length > 0) {
      let i = t[s];
      try {
        i = decodeURIComponent(i.replace(/\+/g, " "));
      } catch {
      }
      e += "/" + i;
    }
  return e;
}
function dd(n) {
  const e = {};
  n.charAt(0) === "?" && (n = n.substring(1));
  for (const t of n.split("&")) {
    if (t.length === 0)
      continue;
    const s = t.split("=");
    s.length === 2 ? e[decodeURIComponent(s[0])] = decodeURIComponent(s[1]) : F(`Invalid query segment '${t}' in query '${n}'`);
  }
  return e;
}
const qs = function(n, e) {
  const t = fd(n), s = t.namespace;
  t.domain === "firebase.com" && fe(t.host + " is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"), (!s || s === "undefined") && t.domain !== "localhost" && fe("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"), t.secure || Kl();
  const i = t.scheme === "ws" || t.scheme === "wss";
  return {
    repoInfo: new Zl(
      t.host,
      t.secure,
      s,
      i,
      e,
      /*persistenceKey=*/
      "",
      /*includeNamespaceInQueryParams=*/
      s !== t.subdomain
    ),
    path: new T(t.pathString)
  };
}, fd = function(n) {
  let e = "", t = "", s = "", i = "", r = "", o = !0, a = "https", c = 443;
  if (typeof n == "string") {
    let l = n.indexOf("//");
    l >= 0 && (a = n.substring(0, l - 1), n = n.substring(l + 2));
    let u = n.indexOf("/");
    u === -1 && (u = n.length);
    let h = n.indexOf("?");
    h === -1 && (h = n.length), e = n.substring(0, Math.min(u, h)), u < h && (i = ud(n.substring(u, h)));
    const d = dd(n.substring(Math.min(n.length, h)));
    l = e.indexOf(":"), l >= 0 ? (o = a === "https" || a === "wss", c = parseInt(e.substring(l + 1), 10)) : l = e.length;
    const p = e.slice(0, l);
    if (p.toLowerCase() === "localhost")
      t = "localhost";
    else if (p.split(".").length <= 2)
      t = p;
    else {
      const g = e.indexOf(".");
      s = e.substring(0, g).toLowerCase(), t = e.substring(g + 1), r = s;
    }
    "ns" in d && (r = d.ns);
  }
  return {
    host: e,
    port: c,
    domain: t,
    subdomain: s,
    secure: o,
    scheme: a,
    pathString: i,
    namespace: r
  };
};
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
class zn {
  /**
   * @hideconstructor
   */
  constructor(e, t, s, i) {
    this._repo = e, this._path = t, this._queryParams = s, this._orderByCalled = i;
  }
  get key() {
    return m(this._path) ? null : or(this._path);
  }
  get ref() {
    return new De(this._repo, this._path);
  }
  get _queryIdentifier() {
    const e = ks(this._queryParams), t = Nn(e);
    return t === "{}" ? "default" : t;
  }
  /**
   * An object representation of the query parameters used by this Query.
   */
  get _queryObject() {
    return ks(this._queryParams);
  }
  isEqual(e) {
    if (e = ri(e), !(e instanceof zn))
      return !1;
    const t = this._repo === e._repo, s = lr(this._path, e._path), i = this._queryIdentifier === e._queryIdentifier;
    return t && s && i;
  }
  toJSON() {
    return this.toString();
  }
  toString() {
    return this._repo.toString() + Ih(this._path);
  }
}
class De extends zn {
  /** @hideconstructor */
  constructor(e, t) {
    super(e, t, new xn(), !1);
  }
  get parent() {
    const e = cr(this._path);
    return e === null ? null : new De(this._repo, e);
  }
  get root() {
    let e = this;
    for (; e.parent !== null; )
      e = e.parent;
    return e;
  }
}
ku(De);
Du(De);
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
const pd = "FIREBASE_DATABASE_EMULATOR_HOST", dn = {};
let _d = !1;
function gd(n, e, t, s, i) {
  let r = s || n.options.databaseURL;
  r === void 0 && (n.options.projectId || fe("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."), D("Using default host for project ", n.options.projectId), r = `${n.options.projectId}-default-rtdb.firebaseio.com`);
  let o = qs(r, i), a = o.repoInfo, c;
  typeof process < "u" && process.env && (c = process.env[pd]), c ? (r = `http://${c}?ns=${a.namespace}`, o = qs(r, i), a = o.repoInfo) : o.repoInfo.secure;
  const l = new Jl(n.name, n.options, e);
  zu("Invalid Firebase Database URL", o), m(o.path) || fe("Database URL must point to the root of a Firebase Database (not including a child path).");
  const u = yd(a, n, l, new Xl(n, t));
  return new wd(u, n);
}
function md(n, e) {
  const t = dn[e];
  (!t || t[n.key] !== n) && fe(`Database ${e}(${n.repoInfo_}) has already been deleted.`), ad(n), delete t[n.key];
}
function yd(n, e, t, s) {
  let i = dn[e.name];
  i || (i = {}, dn[e.name] = i);
  let r = i[n.toURLString()];
  return r && fe("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."), r = new td(n, _d, t, s), i[n.toURLString()] = r, r;
}
class wd {
  /** @hideconstructor */
  constructor(e, t) {
    this._repoInternal = e, this.app = t, this.type = "database", this._instanceStarted = !1;
  }
  get _repo() {
    return this._instanceStarted || (nd(this._repoInternal, this.app.options.appId, this.app.options.databaseAuthVariableOverride), this._instanceStarted = !0), this._repoInternal;
  }
  get _root() {
    return this._rootInternal || (this._rootInternal = new De(this._repo, C())), this._rootInternal;
  }
  _delete() {
    return this._rootInternal !== null && (md(this._repo, this.app.name), this._repoInternal = null, this._rootInternal = null), Promise.resolve();
  }
  _checkNotDeleted(e) {
    this._rootInternal === null && fe("Cannot call " + e + " on a deleted database.");
  }
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
function bd(n) {
  Ll(ya), le(new se(
    "database",
    (e, { instanceIdentifier: t }) => {
      const s = e.getProvider("app").getImmediate(), i = e.getProvider("auth-internal"), r = e.getProvider("app-check-internal");
      return gd(s, i, r, t);
    },
    "PUBLIC"
    /* ComponentType.PUBLIC */
  ).setMultipleInstances(!0)), te(ds, fs, n), te(ds, fs, "esm2020");
}
Q.prototype.simpleListen = function(n, e) {
  this.sendRequest("q", { p: n }, e);
};
Q.prototype.echo = function(n, e) {
  this.sendRequest("echo", { d: n }, e);
};
bd();
Pl([{"revision":null,"url":"assets/index-Dx6Oj05w.js"},{"revision":null,"url":"assets/index-fJkLp684.css"},{"revision":"46788e7df81d0372094a1e2af754e008","url":"index.html"},{"revision":"d4bd41f8dd12f1517340d931428983fb","url":"registerSW.js"},{"revision":"04fb41277b2d80dfa79441653613f291","url":"favicon.ico"},{"revision":"cf5eaff918a960ce531aa06af4f66583","url":"icons/android-chrome-192x192.png"},{"revision":"b3a2b02ff54274e88cba679738ae3b04","url":"icons/android-chrome-512x512.png"},{"revision":"fe78c2de6cbe40fab54d42c53c641a48","url":"manifest.webmanifest"}] || []);
const zr = {
  apiKey: "AIzaSyC-jTMiDjHNTC6cvSKUU44mVbWwT-ToLxQ",
  authDomain: "mister-x-d6b59.firebaseapp.com",
  databaseURL: "https://mister-x-d6b59-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mister-x-d6b59",
  storageBucket: "mister-x-d6b59.firebasestorage.app",
  messagingSenderId: "616391598963",
  appId: "1:616391598963:web:da07882b0f481d3000db06",
  measurementId: "G-W66SK677NG"
}, Cd = li(zr);
al(Cd);
zr.databaseURL;
function Yr(n, e) {
  return new Promise((t, s) => {
    const i = indexedDB.open(n);
    i.onupgradeneeded = () => {
      const r = i.result;
      r.objectStoreNames.contains(e) || r.createObjectStore(e);
    }, i.onsuccess = () => {
      const r = i.result;
      if (r.objectStoreNames.contains(e)) {
        t(r);
        return;
      }
      const o = r.version + 1;
      r.close();
      const a = indexedDB.open(n, o);
      a.onupgradeneeded = () => {
        const c = a.result;
        c.objectStoreNames.contains(e) || c.createObjectStore(e);
      }, a.onsuccess = () => t(a.result), a.onerror = () => s(a.error);
    }, i.onerror = () => s(i.error);
  });
}
function Ed(n) {
  const e = n || "", t = /Safari/i.test(e) && !/(Chrome|CriOS|EdgiOS|FxiOS)/i.test(e), s = /iPhone|iPad|iPod/.test(e) || /Macintosh/.test(e) && /Mobile/.test(e);
  return t || s;
}
async function js() {
  try {
    const n = await Yr("app-db", "settings");
    return await new Promise((e) => {
      const i = n.transaction("settings", "readonly").objectStore("settings").get("deviceName");
      i.onsuccess = () => {
        n.close(), e(i.result || null);
      }, i.onerror = () => {
        n.close(), e(null);
      };
    });
  } catch {
    return null;
  }
}
async function Gs(n, {
  tries: e = 10,
  // max. Versuche
  intervalMs: t = 100
  // Abstand zwischen Versuchen
} = {}) {
  for (let s = 0; s < e; s++) {
    const i = await self.registration.getNotifications({ tag: n });
    if (Array.isArray(i) && i.length > 0) return !0;
    await new Promise((r) => setTimeout(r, t));
  }
  return !1;
}
async function zs(n, e) {
  try {
    await fetch("https://axirbthvnznvhfagduyj.functions.supabase.co/rtdb-ack", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messageId: n, deviceName: e, timestamp: Date.now() })
    });
  } catch (t) {
    console.error("[SW] ack failed:", t);
  }
}
self.addEventListener("push", (n) => {
  n.waitUntil((async () => {
    const e = n.data ? (() => {
      try {
        return n.data.json();
      } catch {
        return {};
      }
    })() : {}, t = e.notification || {}, s = e.data || e || {}, i = t.title || s.title || "Neue Nachricht", r = t.body || s.body || "", o = s.url || t.click_action || "/Mister-X/", a = s.messageId || s.id || t.tag || String(Date.now()), c = s.tag || "mrx", u = (await clients.matchAll({ type: "window", includeUncontrolled: !0 })).find((E) => E.visibilityState === "visible"), h = self.navigator && self.navigator.userAgent ? self.navigator.userAgent : "", d = Ed(h);
    if (u) {
      try {
        u.postMessage({ type: "PUSH", payload: s });
      } catch {
      }
      if (d) {
        const E = `${c}-fg`, x = {
          body: r,
          icon: "/Mister-X/icons/android-chrome-192x192.png",
          badge: "/Mister-X/icons/Mister_X_Badge.png",
          tag: E,
          renotify: !0,
          silent: !0,
          // kein Ton, aber sichtbar
          requireInteraction: !1,
          timestamp: s.timestamp || Date.now(),
          data: { url: o, messageId: a, tag: E, fg: !0 }
        };
        await self.registration.showNotification(i, x), await Gs(E, { tries: 10, intervalMs: 50 }), await new Promise((V) => setTimeout(V, 900)), (await self.registration.getNotifications({ tag: E })).forEach((V) => V.close());
        try {
          await zs(a, await js());
        } catch (V) {
          console.error("[SW] markDelivered failed:", V);
        }
        return;
      }
      return;
    }
    const p = `${c}-${a}`, g = {
      body: r,
      icon: "/Mister-X/icons/android-chrome-192x192.png",
      badge: "/Mister-X/icons/Mister_X_Badge.png",
      tag: p,
      renotify: !0,
      silent: s.silent !== void 0 ? !!s.silent : !1,
      requireInteraction: s.requireInteraction ?? !0,
      vibrate: s.vibrate ?? [200, 100, 200],
      timestamp: s.timestamp || Date.now(),
      data: { url: o, messageId: a, tag: p, fg: !1 }
    };
    await self.registration.showNotification(i, g), await Gs(p, { tries: 10, intervalMs: 100 });
    try {
      const E = await js();
      await zs(a, E);
    } catch (E) {
      console.error("[SW] markDelivered failed:", E);
    }
  })());
});
self.addEventListener("notificationclick", (n) => {
  n.notification.close(), n.waitUntil((async () => {
    const e = n.notification && n.notification.data && n.notification.data.url || "/Mister-X/", t = await clients.matchAll({ type: "window", includeUncontrolled: !0 });
    for (const s of t)
      if ("focus" in s && s.url.includes("/Mister-X/"))
        return s.focus();
    if (clients.openWindow) return clients.openWindow(e);
  })());
});
self.addEventListener("message", (n) => {
  n && n.data && n.data.type === "SKIP_WAITING" && self.skipWaiting();
});
self.addEventListener("activate", (n) => {
  n.waitUntil(self.clients.claim());
});
async function vd(n, e) {
  const t = await Yr("app-db", "sw-flags");
  await new Promise((s, i) => {
    const r = t.transaction("sw-flags", "readwrite");
    r.objectStore("sw-flags").put(e, n), r.oncomplete = () => {
      t.close(), s();
    }, r.onerror = () => {
      t.close(), i(r.error);
    };
  });
}
self.addEventListener("pushsubscriptionchange", (n) => {
  n.waitUntil((async () => {
    try {
      const e = await self.registration.pushManager.subscribe(
        n.oldSubscription ? n.oldSubscription.options : {
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
        await vd("pushSubscriptionChangedAt", Date.now());
      } catch {
      }
    } catch (e) {
      console.error("[SW] re-subscribe failed:", e);
    }
  })());
});
