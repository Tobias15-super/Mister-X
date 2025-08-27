const Yo = () => {
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
const Mi = {
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
    throw Le(e);
}, Le = function(n) {
  return new Error("Firebase Database (" + Mi.SDK_VERSION + ") INTERNAL ASSERT FAILED: " + n);
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
const Pi = function(n) {
  const e = [];
  let t = 0;
  for (let s = 0; s < n.length; s++) {
    let i = n.charCodeAt(s);
    i < 128 ? e[t++] = i : i < 2048 ? (e[t++] = i >> 6 | 192, e[t++] = i & 63 | 128) : (i & 64512) === 55296 && s + 1 < n.length && (n.charCodeAt(s + 1) & 64512) === 56320 ? (i = 65536 + ((i & 1023) << 10) + (n.charCodeAt(++s) & 1023), e[t++] = i >> 18 | 240, e[t++] = i >> 12 & 63 | 128, e[t++] = i >> 6 & 63 | 128, e[t++] = i & 63 | 128) : (e[t++] = i >> 12 | 224, e[t++] = i >> 6 & 63 | 128, e[t++] = i & 63 | 128);
  }
  return e;
}, Qo = function(n) {
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
      const r = n[t++], o = n[t++], a = n[t++], l = ((i & 7) << 18 | (r & 63) << 12 | (o & 63) << 6 | a & 63) - 65536;
      e[s++] = String.fromCharCode(55296 + (l >> 10)), e[s++] = String.fromCharCode(56320 + (l & 1023));
    } else {
      const r = n[t++], o = n[t++];
      e[s++] = String.fromCharCode((i & 15) << 12 | (r & 63) << 6 | o & 63);
    }
  }
  return e.join("");
}, Ot = {
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
      const r = n[i], o = i + 1 < n.length, a = o ? n[i + 1] : 0, l = i + 2 < n.length, c = l ? n[i + 2] : 0, u = r >> 2, h = (r & 3) << 4 | a >> 4;
      let d = (a & 15) << 2 | c >> 6, p = c & 63;
      l || (p = 64, o || (d = 64)), s.push(t[u], t[h], t[d], t[p]);
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
    return this.HAS_NATIVE_SUPPORT && !e ? btoa(n) : this.encodeByteArray(Pi(n), e);
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
    return this.HAS_NATIVE_SUPPORT && !e ? atob(n) : Qo(this.decodeStringToByteArray(n, e));
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
      const c = i < n.length ? t[n.charAt(i)] : 64;
      ++i;
      const h = i < n.length ? t[n.charAt(i)] : 64;
      if (++i, r == null || a == null || c == null || h == null)
        throw new Xo();
      const d = r << 2 | a >> 4;
      if (s.push(d), c !== 64) {
        const p = a << 4 & 240 | c >> 2;
        if (s.push(p), h !== 64) {
          const g = c << 6 & 192 | h;
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
class Xo extends Error {
  constructor() {
    super(...arguments), this.name = "DecodeBase64StringError";
  }
}
const xi = function(n) {
  const e = Pi(n);
  return Ot.encodeByteArray(e, !0);
}, gt = function(n) {
  return xi(n).replace(/\./g, "");
}, pn = function(n) {
  try {
    return Ot.decodeString(n, !0);
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
function Jo(n) {
  return Li(void 0, n);
}
function Li(n, e) {
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
    !e.hasOwnProperty(t) || !Zo(t) || (n[t] = Li(n[t], e[t]));
  return n;
}
function Zo(n) {
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
function Fi() {
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
const ea = () => Fi().__FIREBASE_DEFAULTS__, ta = () => {
  if (typeof process > "u" || typeof process.env > "u")
    return;
  const n = process.env.__FIREBASE_DEFAULTS__;
  if (n)
    return JSON.parse(n);
}, na = () => {
  if (typeof document > "u")
    return;
  let n;
  try {
    n = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
  } catch {
    return;
  }
  const e = n && pn(n[1]);
  return e && JSON.parse(e);
}, Ui = () => {
  try {
    return Yo() || ea() || ta() || na();
  } catch (n) {
    console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);
    return;
  }
}, sa = (n) => {
  var e, t;
  return (t = (e = Ui()) == null ? void 0 : e.emulatorHosts) == null ? void 0 : t[n];
}, ia = (n) => {
  const e = sa(n);
  if (!e)
    return;
  const t = e.lastIndexOf(":");
  if (t <= 0 || t + 1 === e.length)
    throw new Error(`Invalid host ${e} with no separate hostname and port!`);
  const s = parseInt(e.substring(t + 1), 10);
  return e[0] === "[" ? [e.substring(1, t - 1), s] : [e.substring(0, t), s];
}, Bi = () => {
  var n;
  return (n = Ui()) == null ? void 0 : n.config;
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
let he = class {
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
 */
function xn(n) {
  try {
    return (n.startsWith("http://") || n.startsWith("https://") ? new URL(n).hostname : n).endsWith(".cloudworkstations.dev");
  } catch {
    return !1;
  }
}
async function ra(n) {
  return (await fetch(n, {
    credentials: "include"
  })).ok;
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
function oa(n, e) {
  if (n.uid)
    throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');
  const t = {
    alg: "none",
    type: "JWT"
  }, s = e || "demo-project", i = n.iat || 0, r = n.sub || n.user_id;
  if (!r)
    throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
  const o = {
    // Set all required fields to decent defaults
    iss: `https://securetoken.google.com/${s}`,
    aud: s,
    iat: i,
    exp: i + 3600,
    auth_time: i,
    sub: r,
    user_id: r,
    firebase: {
      sign_in_provider: "custom",
      identities: {}
    },
    // Override with user options
    ...n
  };
  return [
    gt(JSON.stringify(t)),
    gt(JSON.stringify(o)),
    ""
  ].join(".");
}
const ze = {};
function aa() {
  const n = {
    prod: [],
    emulator: []
  };
  for (const e of Object.keys(ze))
    ze[e] ? n.emulator.push(e) : n.prod.push(e);
  return n;
}
function ca(n) {
  let e = document.getElementById(n), t = !1;
  return e || (e = document.createElement("div"), e.setAttribute("id", n), t = !0), { created: t, element: e };
}
let ks = !1;
function la(n, e) {
  if (typeof window > "u" || typeof document > "u" || !xn(window.location.host) || ze[n] === e || ze[n] || // If already set to use emulator, can't go back to prod.
  ks)
    return;
  ze[n] = e;
  function t(d) {
    return `__firebase__banner__${d}`;
  }
  const s = "__firebase__banner", r = aa().prod.length > 0;
  function o() {
    const d = document.getElementById(s);
    d && d.remove();
  }
  function a(d) {
    d.style.display = "flex", d.style.background = "#7faaf0", d.style.position = "fixed", d.style.bottom = "5px", d.style.left = "5px", d.style.padding = ".5em", d.style.borderRadius = "5px", d.style.alignItems = "center";
  }
  function l(d, p) {
    d.setAttribute("width", "24"), d.setAttribute("id", p), d.setAttribute("height", "24"), d.setAttribute("viewBox", "0 0 24 24"), d.setAttribute("fill", "none"), d.style.marginLeft = "-6px";
  }
  function c() {
    const d = document.createElement("span");
    return d.style.cursor = "pointer", d.style.marginLeft = "16px", d.style.fontSize = "24px", d.innerHTML = " &times;", d.onclick = () => {
      ks = !0, o();
    }, d;
  }
  function u(d, p) {
    d.setAttribute("id", p), d.innerText = "Learn more", d.href = "https://firebase.google.com/docs/studio/preview-apps#preview-backend", d.setAttribute("target", "__blank"), d.style.paddingLeft = "5px", d.style.textDecoration = "underline";
  }
  function h() {
    const d = ca(s), p = t("text"), g = document.getElementById(p) || document.createElement("span"), b = t("learnmore"), D = document.getElementById(b) || document.createElement("a"), de = t("preprendIcon"), L = document.getElementById(de) || document.createElementNS("http://www.w3.org/2000/svg", "svg");
    if (d.created) {
      const fe = d.element;
      a(fe), u(D, b);
      const qt = c();
      l(L, de), fe.append(L, g, D, qt), document.body.appendChild(fe);
    }
    r ? (g.innerText = "Preview backend disconnected.", L.innerHTML = `<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`) : (L.innerHTML = `<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`, g.innerText = "Preview backend running in this workspace."), g.setAttribute("id", p);
  }
  document.readyState === "loading" ? window.addEventListener("DOMContentLoaded", h) : h();
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
function ha() {
  return typeof navigator < "u" && typeof navigator.userAgent == "string" ? navigator.userAgent : "";
}
function Wi() {
  return typeof window < "u" && // @ts-ignore Setting up an broadly applicable index signature for Window
  // just to deal with this case would probably be a bad idea.
  !!(window.cordova || window.phonegap || window.PhoneGap) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ha());
}
function ua() {
  return typeof navigator == "object" && navigator.product === "ReactNative";
}
function da() {
  return Mi.NODE_ADMIN === !0;
}
function Mt() {
  try {
    return typeof indexedDB == "object";
  } catch {
    return !1;
  }
}
function Hi() {
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
const fa = "FirebaseError";
class Fe extends Error {
  constructor(e, t, s) {
    super(t), this.code = e, this.customData = s, this.name = fa, Object.setPrototypeOf(this, Fe.prototype), Error.captureStackTrace && Error.captureStackTrace(this, rt.prototype.create);
  }
}
class rt {
  constructor(e, t, s) {
    this.service = e, this.serviceName = t, this.errors = s;
  }
  create(e, ...t) {
    const s = t[0] || {}, i = `${this.service}/${e}`, r = this.errors[e], o = r ? pa(r, s) : "Error", a = `${this.serviceName}: ${o} (${i}).`;
    return new Fe(i, a, s);
  }
}
function pa(n, e) {
  return n.replace(_a, (t, s) => {
    const i = e[s];
    return i != null ? String(i) : `<${s}?>`;
  });
}
const _a = /\{\$([^}]+)}/g;
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
function et(n) {
  return JSON.parse(n);
}
function M(n) {
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
const $i = function(n) {
  let e = {}, t = {}, s = {}, i = "";
  try {
    const r = n.split(".");
    e = et(pn(r[0]) || ""), t = et(pn(r[1]) || ""), i = r[2], s = t.d || {}, delete t.d;
  } catch {
  }
  return {
    header: e,
    claims: t,
    data: s,
    signature: i
  };
}, ga = function(n) {
  const e = $i(n), t = e.claims;
  return !!t && typeof t == "object" && t.hasOwnProperty("iat");
}, ma = function(n) {
  const e = $i(n).claims;
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
function re(n, e) {
  return Object.prototype.hasOwnProperty.call(n, e);
}
function Me(n, e) {
  if (Object.prototype.hasOwnProperty.call(n, e))
    return n[e];
}
function Rs(n) {
  for (const e in n)
    if (Object.prototype.hasOwnProperty.call(n, e))
      return !1;
  return !0;
}
function mt(n, e, t) {
  const s = {};
  for (const i in n)
    Object.prototype.hasOwnProperty.call(n, i) && (s[i] = e.call(t, n[i], i, n));
  return s;
}
function yt(n, e) {
  if (n === e)
    return !0;
  const t = Object.keys(n), s = Object.keys(e);
  for (const i of t) {
    if (!s.includes(i))
      return !1;
    const r = n[i], o = e[i];
    if (As(r) && As(o)) {
      if (!yt(r, o))
        return !1;
    } else if (r !== o)
      return !1;
  }
  for (const i of s)
    if (!t.includes(i))
      return !1;
  return !0;
}
function As(n) {
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
function ya(n) {
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
class wa {
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
    let i = this.chain_[0], r = this.chain_[1], o = this.chain_[2], a = this.chain_[3], l = this.chain_[4], c, u;
    for (let h = 0; h < 80; h++) {
      h < 40 ? h < 20 ? (c = a ^ r & (o ^ a), u = 1518500249) : (c = r ^ o ^ a, u = 1859775393) : h < 60 ? (c = r & o | a & (r | o), u = 2400959708) : (c = r ^ o ^ a, u = 3395469782);
      const d = (i << 5 | i >>> 27) + c + l + u + s[h] & 4294967295;
      l = a, a = o, o = (r << 30 | r >>> 2) & 4294967295, r = i, i = d;
    }
    this.chain_[0] = this.chain_[0] + i & 4294967295, this.chain_[1] = this.chain_[1] + r & 4294967295, this.chain_[2] = this.chain_[2] + o & 4294967295, this.chain_[3] = this.chain_[3] + a & 4294967295, this.chain_[4] = this.chain_[4] + l & 4294967295;
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
function Ln(n, e) {
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
const ba = function(n) {
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
}, Pt = function(n) {
  let e = 0;
  for (let t = 0; t < n.length; t++) {
    const s = n.charCodeAt(t);
    s < 128 ? e++ : s < 2048 ? e += 2 : s >= 55296 && s <= 56319 ? (e += 4, t++) : e += 3;
  }
  return e;
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
const Ca = 1e3, Ea = 2, va = 4 * 60 * 60 * 1e3, Ta = 0.5;
function Sa(n, e = Ca, t = Ea) {
  const s = e * Math.pow(t, n), i = Math.round(
    // A fraction of the backoff value to add/subtract.
    // Deviation: changes multiplication order to improve readability.
    Ta * s * // A random float (rounded to int by Math.round above) in the range [-1, 1]. Determines
    // if we add or subtract.
    (Math.random() - 0.5) * 2
  );
  return Math.min(va, s + i);
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
function Se(n) {
  return n && n._delegate ? n._delegate : n;
}
class z {
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
const pe = "[DEFAULT]";
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
class Ia {
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
      const s = new he();
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
      if (Ra(e))
        try {
          this.getOrInitializeService({ instanceIdentifier: pe });
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
  clearInstance(e = pe) {
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
  isInitialized(e = pe) {
    return this.instances.has(e);
  }
  getOptions(e = pe) {
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
      instanceIdentifier: ka(e),
      options: t
    }), this.instances.set(e, s), this.instancesOptions.set(e, t), this.invokeOnInitCallbacks(s, e), this.component.onInstanceCreated))
      try {
        this.component.onInstanceCreated(this.container, e, s);
      } catch {
      }
    return s || null;
  }
  normalizeInstanceIdentifier(e = pe) {
    return this.component ? this.component.multipleInstances ? e : pe : e;
  }
  shouldAutoInitialize() {
    return !!this.component && this.component.instantiationMode !== "EXPLICIT";
  }
}
function ka(n) {
  return n === pe ? void 0 : n;
}
function Ra(n) {
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
class Aa {
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
    const t = new Ia(e, this);
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
const Na = {
  debug: v.DEBUG,
  verbose: v.VERBOSE,
  info: v.INFO,
  warn: v.WARN,
  error: v.ERROR,
  silent: v.SILENT
}, Da = v.INFO, Oa = {
  [v.DEBUG]: "log",
  [v.VERBOSE]: "log",
  [v.INFO]: "info",
  [v.WARN]: "warn",
  [v.ERROR]: "error"
}, Ma = (n, e, ...t) => {
  if (e < n.logLevel)
    return;
  const s = (/* @__PURE__ */ new Date()).toISOString(), i = Oa[e];
  if (i)
    console[i](`[${s}]  ${n.name}:`, ...t);
  else
    throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`);
};
class Fn {
  /**
   * Gives you an instance of a Logger to capture messages according to
   * Firebase's logging scheme.
   *
   * @param name The name that the logs will be associated with
   */
  constructor(e) {
    this.name = e, this._logLevel = Da, this._logHandler = Ma, this._userLogHandler = null;
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
    this._logLevel = typeof e == "string" ? Na[e] : e;
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
const Pa = (n, e) => e.some((t) => n instanceof t);
let Ns, Ds;
function xa() {
  return Ns || (Ns = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function La() {
  return Ds || (Ds = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
const Ki = /* @__PURE__ */ new WeakMap(), _n = /* @__PURE__ */ new WeakMap(), Vi = /* @__PURE__ */ new WeakMap(), jt = /* @__PURE__ */ new WeakMap(), Un = /* @__PURE__ */ new WeakMap();
function Fa(n) {
  const e = new Promise((t, s) => {
    const i = () => {
      n.removeEventListener("success", r), n.removeEventListener("error", o);
    }, r = () => {
      t(J(n.result)), i();
    }, o = () => {
      s(n.error), i();
    };
    n.addEventListener("success", r), n.addEventListener("error", o);
  });
  return e.then((t) => {
    t instanceof IDBCursor && Ki.set(t, n);
  }).catch(() => {
  }), Un.set(e, n), e;
}
function Ua(n) {
  if (_n.has(n))
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
  _n.set(n, e);
}
let gn = {
  get(n, e, t) {
    if (n instanceof IDBTransaction) {
      if (e === "done")
        return _n.get(n);
      if (e === "objectStoreNames")
        return n.objectStoreNames || Vi.get(n);
      if (e === "store")
        return t.objectStoreNames[1] ? void 0 : t.objectStore(t.objectStoreNames[0]);
    }
    return J(n[e]);
  },
  set(n, e, t) {
    return n[e] = t, !0;
  },
  has(n, e) {
    return n instanceof IDBTransaction && (e === "done" || e === "store") ? !0 : e in n;
  }
};
function Ba(n) {
  gn = n(gn);
}
function Wa(n) {
  return n === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype) ? function(e, ...t) {
    const s = n.call(Gt(this), e, ...t);
    return Vi.set(s, e.sort ? e.sort() : [e]), J(s);
  } : La().includes(n) ? function(...e) {
    return n.apply(Gt(this), e), J(Ki.get(this));
  } : function(...e) {
    return J(n.apply(Gt(this), e));
  };
}
function Ha(n) {
  return typeof n == "function" ? Wa(n) : (n instanceof IDBTransaction && Ua(n), Pa(n, xa()) ? new Proxy(n, gn) : n);
}
function J(n) {
  if (n instanceof IDBRequest)
    return Fa(n);
  if (jt.has(n))
    return jt.get(n);
  const e = Ha(n);
  return e !== n && (jt.set(n, e), Un.set(e, n)), e;
}
const Gt = (n) => Un.get(n);
function xt(n, e, { blocked: t, upgrade: s, blocking: i, terminated: r } = {}) {
  const o = indexedDB.open(n, e), a = J(o);
  return s && o.addEventListener("upgradeneeded", (l) => {
    s(J(o.result), l.oldVersion, l.newVersion, J(o.transaction), l);
  }), t && o.addEventListener("blocked", (l) => t(
    // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
    l.oldVersion,
    l.newVersion,
    l
  )), a.then((l) => {
    r && l.addEventListener("close", () => r()), i && l.addEventListener("versionchange", (c) => i(c.oldVersion, c.newVersion, c));
  }).catch(() => {
  }), a;
}
function zt(n, { blocked: e } = {}) {
  const t = indexedDB.deleteDatabase(n);
  return e && t.addEventListener("blocked", (s) => e(
    // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
    s.oldVersion,
    s
  )), J(t).then(() => {
  });
}
const $a = ["get", "getKey", "getAll", "getAllKeys", "count"], Ka = ["put", "add", "delete", "clear"], Yt = /* @__PURE__ */ new Map();
function Os(n, e) {
  if (!(n instanceof IDBDatabase && !(e in n) && typeof e == "string"))
    return;
  if (Yt.get(e))
    return Yt.get(e);
  const t = e.replace(/FromIndex$/, ""), s = e !== t, i = Ka.includes(t);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(t in (s ? IDBIndex : IDBObjectStore).prototype) || !(i || $a.includes(t))
  )
    return;
  const r = async function(o, ...a) {
    const l = this.transaction(o, i ? "readwrite" : "readonly");
    let c = l.store;
    return s && (c = c.index(a.shift())), (await Promise.all([
      c[t](...a),
      i && l.done
    ]))[0];
  };
  return Yt.set(e, r), r;
}
Ba((n) => ({
  ...n,
  get: (e, t, s) => Os(e, t) || n.get(e, t, s),
  has: (e, t) => !!Os(e, t) || n.has(e, t)
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
class Va {
  constructor(e) {
    this.container = e;
  }
  // In initial implementation, this will be called by installations on
  // auth token refresh, and installations will send this string.
  getPlatformInfoString() {
    return this.container.getProviders().map((t) => {
      if (qa(t)) {
        const s = t.getImmediate();
        return `${s.library}/${s.version}`;
      } else
        return null;
    }).filter((t) => t).join(" ");
  }
}
function qa(n) {
  const e = n.getComponent();
  return (e == null ? void 0 : e.type) === "VERSION";
}
const mn = "@firebase/app", Ms = "0.14.1";
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
const te = new Fn("@firebase/app"), ja = "@firebase/app-compat", Ga = "@firebase/analytics-compat", za = "@firebase/analytics", Ya = "@firebase/app-check-compat", Qa = "@firebase/app-check", Xa = "@firebase/auth", Ja = "@firebase/auth-compat", Za = "@firebase/database", ec = "@firebase/data-connect", tc = "@firebase/database-compat", nc = "@firebase/functions", sc = "@firebase/functions-compat", ic = "@firebase/installations", rc = "@firebase/installations-compat", oc = "@firebase/messaging", ac = "@firebase/messaging-compat", cc = "@firebase/performance", lc = "@firebase/performance-compat", hc = "@firebase/remote-config", uc = "@firebase/remote-config-compat", dc = "@firebase/storage", fc = "@firebase/storage-compat", pc = "@firebase/firestore", _c = "@firebase/ai", gc = "@firebase/firestore-compat", mc = "firebase", yc = "12.1.0";
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
const yn = "[DEFAULT]", wc = {
  [mn]: "fire-core",
  [ja]: "fire-core-compat",
  [za]: "fire-analytics",
  [Ga]: "fire-analytics-compat",
  [Qa]: "fire-app-check",
  [Ya]: "fire-app-check-compat",
  [Xa]: "fire-auth",
  [Ja]: "fire-auth-compat",
  [Za]: "fire-rtdb",
  [ec]: "fire-data-connect",
  [tc]: "fire-rtdb-compat",
  [nc]: "fire-fn",
  [sc]: "fire-fn-compat",
  [ic]: "fire-iid",
  [rc]: "fire-iid-compat",
  [oc]: "fire-fcm",
  [ac]: "fire-fcm-compat",
  [cc]: "fire-perf",
  [lc]: "fire-perf-compat",
  [hc]: "fire-rc",
  [uc]: "fire-rc-compat",
  [dc]: "fire-gcs",
  [fc]: "fire-gcs-compat",
  [pc]: "fire-fst",
  [gc]: "fire-fst-compat",
  [_c]: "fire-vertex",
  "fire-js": "fire-js",
  // Platform identifier for JS SDK.
  [mc]: "fire-js-all"
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
const wt = /* @__PURE__ */ new Map(), bc = /* @__PURE__ */ new Map(), wn = /* @__PURE__ */ new Map();
function Ps(n, e) {
  try {
    n.container.addComponent(e);
  } catch (t) {
    te.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`, t);
  }
}
function ne(n) {
  const e = n.name;
  if (wn.has(e))
    return te.debug(`There were multiple attempts to register component ${e}.`), !1;
  wn.set(e, n);
  for (const t of wt.values())
    Ps(t, n);
  for (const t of bc.values())
    Ps(t, n);
  return !0;
}
function Ue(n, e) {
  const t = n.container.getProvider("heartbeat").getImmediate({ optional: !0 });
  return t && t.triggerHeartbeat(), n.container.getProvider(e);
}
function Cc(n) {
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
const Ec = {
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
}, ce = new rt("app", "Firebase", Ec);
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
class vc {
  constructor(e, t, s) {
    this._isDeleted = !1, this._options = { ...e }, this._config = { ...t }, this._name = t.name, this._automaticDataCollectionEnabled = t.automaticDataCollectionEnabled, this._container = s, this.container.addComponent(new z(
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
      throw ce.create("app-deleted", { appName: this._name });
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
const Tc = yc;
function qi(n, e = {}) {
  let t = n;
  typeof e != "object" && (e = { name: e });
  const s = {
    name: yn,
    automaticDataCollectionEnabled: !0,
    ...e
  }, i = s.name;
  if (typeof i != "string" || !i)
    throw ce.create("bad-app-name", {
      appName: String(i)
    });
  if (t || (t = Bi()), !t)
    throw ce.create(
      "no-options"
      /* AppError.NO_OPTIONS */
    );
  const r = wt.get(i);
  if (r) {
    if (yt(t, r.options) && yt(s, r.config))
      return r;
    throw ce.create("duplicate-app", { appName: i });
  }
  const o = new Aa(i);
  for (const l of wn.values())
    o.addComponent(l);
  const a = new vc(t, s, o);
  return wt.set(i, a), a;
}
function Bn(n = yn) {
  const e = wt.get(n);
  if (!e && n === yn && Bi())
    return qi();
  if (!e)
    throw ce.create("no-app", { appName: n });
  return e;
}
function Z(n, e, t) {
  let s = wc[n] ?? n;
  t && (s += `-${t}`);
  const i = s.match(/\s|\//), r = e.match(/\s|\//);
  if (i || r) {
    const o = [
      `Unable to register library "${s}" with version "${e}":`
    ];
    i && o.push(`library name "${s}" contains illegal characters (whitespace or "/")`), i && r && o.push("and"), r && o.push(`version name "${e}" contains illegal characters (whitespace or "/")`), te.warn(o.join(" "));
    return;
  }
  ne(new z(
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
const Sc = "firebase-heartbeat-database", Ic = 1, tt = "firebase-heartbeat-store";
let Qt = null;
function ji() {
  return Qt || (Qt = xt(Sc, Ic, {
    upgrade: (n, e) => {
      switch (e) {
        case 0:
          try {
            n.createObjectStore(tt);
          } catch (t) {
            console.warn(t);
          }
      }
    }
  }).catch((n) => {
    throw ce.create("idb-open", {
      originalErrorMessage: n.message
    });
  })), Qt;
}
async function kc(n) {
  try {
    const t = (await ji()).transaction(tt), s = await t.objectStore(tt).get(Gi(n));
    return await t.done, s;
  } catch (e) {
    if (e instanceof Fe)
      te.warn(e.message);
    else {
      const t = ce.create("idb-get", {
        originalErrorMessage: e == null ? void 0 : e.message
      });
      te.warn(t.message);
    }
  }
}
async function xs(n, e) {
  try {
    const s = (await ji()).transaction(tt, "readwrite");
    await s.objectStore(tt).put(e, Gi(n)), await s.done;
  } catch (t) {
    if (t instanceof Fe)
      te.warn(t.message);
    else {
      const s = ce.create("idb-set", {
        originalErrorMessage: t == null ? void 0 : t.message
      });
      te.warn(s.message);
    }
  }
}
function Gi(n) {
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
const Rc = 1024, Ac = 30;
class Nc {
  constructor(e) {
    this.container = e, this._heartbeatsCache = null;
    const t = this.container.getProvider("app").getImmediate();
    this._storage = new Oc(t), this._heartbeatsCachePromise = this._storage.read().then((s) => (this._heartbeatsCache = s, s));
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
      const i = this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(), r = Ls();
      if (((e = this._heartbeatsCache) == null ? void 0 : e.heartbeats) == null && (this._heartbeatsCache = await this._heartbeatsCachePromise, ((t = this._heartbeatsCache) == null ? void 0 : t.heartbeats) == null) || this._heartbeatsCache.lastSentHeartbeatDate === r || this._heartbeatsCache.heartbeats.some((o) => o.date === r))
        return;
      if (this._heartbeatsCache.heartbeats.push({ date: r, agent: i }), this._heartbeatsCache.heartbeats.length > Ac) {
        const o = Mc(this._heartbeatsCache.heartbeats);
        this._heartbeatsCache.heartbeats.splice(o, 1);
      }
      return this._storage.overwrite(this._heartbeatsCache);
    } catch (s) {
      te.warn(s);
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
      const t = Ls(), { heartbeatsToSend: s, unsentEntries: i } = Dc(this._heartbeatsCache.heartbeats), r = gt(JSON.stringify({ version: 2, heartbeats: s }));
      return this._heartbeatsCache.lastSentHeartbeatDate = t, i.length > 0 ? (this._heartbeatsCache.heartbeats = i, await this._storage.overwrite(this._heartbeatsCache)) : (this._heartbeatsCache.heartbeats = [], this._storage.overwrite(this._heartbeatsCache)), r;
    } catch (t) {
      return te.warn(t), "";
    }
  }
}
function Ls() {
  return (/* @__PURE__ */ new Date()).toISOString().substring(0, 10);
}
function Dc(n, e = Rc) {
  const t = [];
  let s = n.slice();
  for (const i of n) {
    const r = t.find((o) => o.agent === i.agent);
    if (r) {
      if (r.dates.push(i.date), Fs(t) > e) {
        r.dates.pop();
        break;
      }
    } else if (t.push({
      agent: i.agent,
      dates: [i.date]
    }), Fs(t) > e) {
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
class Oc {
  constructor(e) {
    this.app = e, this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck();
  }
  async runIndexedDBEnvironmentCheck() {
    return Mt() ? Hi().then(() => !0).catch(() => !1) : !1;
  }
  /**
   * Read all heartbeats.
   */
  async read() {
    if (await this._canUseIndexedDBPromise) {
      const t = await kc(this.app);
      return t != null && t.heartbeats ? t : { heartbeats: [] };
    } else
      return { heartbeats: [] };
  }
  // overwrite the storage with the provided heartbeats
  async overwrite(e) {
    if (await this._canUseIndexedDBPromise) {
      const s = await this.read();
      return xs(this.app, {
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
      return xs(this.app, {
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
function Fs(n) {
  return gt(
    // heartbeatsCache wrapper properties
    JSON.stringify({ version: 2, heartbeats: n })
  ).length;
}
function Mc(n) {
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
function Pc(n) {
  ne(new z(
    "platform-logger",
    (e) => new Va(e),
    "PRIVATE"
    /* ComponentType.PRIVATE */
  )), ne(new z(
    "heartbeat",
    (e) => new Nc(e),
    "PRIVATE"
    /* ComponentType.PRIVATE */
  )), Z(mn, Ms, n), Z(mn, Ms, "esm2020"), Z("fire-js", "");
}
Pc("");
var xc = "firebase", Lc = "12.1.0";
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
Z(xc, Lc, "app");
const zi = "@firebase/installations", Wn = "0.6.19";
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
const Yi = 1e4, Qi = `w:${Wn}`, Xi = "FIS_v2", Fc = "https://firebaseinstallations.googleapis.com/v1", Uc = 60 * 60 * 1e3, Bc = "installations", Wc = "Installations";
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
const Hc = {
  "missing-app-config-values": 'Missing App configuration value: "{$valueName}"',
  "not-registered": "Firebase Installation is not registered.",
  "installation-not-found": "Firebase Installation not found.",
  "request-failed": '{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',
  "app-offline": "Could not process request. Application offline.",
  "delete-pending-registration": "Can't delete installation while there is a pending registration request."
}, we = new rt(Bc, Wc, Hc);
function Ji(n) {
  return n instanceof Fe && n.code.includes(
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
function Zi({ projectId: n }) {
  return `${Fc}/projects/${n}/installations`;
}
function er(n) {
  return {
    token: n.token,
    requestStatus: 2,
    expiresIn: Kc(n.expiresIn),
    creationTime: Date.now()
  };
}
async function tr(n, e) {
  const s = (await e.json()).error;
  return we.create("request-failed", {
    requestName: n,
    serverCode: s.code,
    serverMessage: s.message,
    serverStatus: s.status
  });
}
function nr({ apiKey: n }) {
  return new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-goog-api-key": n
  });
}
function $c(n, { refreshToken: e }) {
  const t = nr(n);
  return t.append("Authorization", Vc(e)), t;
}
async function sr(n) {
  const e = await n();
  return e.status >= 500 && e.status < 600 ? n() : e;
}
function Kc(n) {
  return Number(n.replace("s", "000"));
}
function Vc(n) {
  return `${Xi} ${n}`;
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
async function qc({ appConfig: n, heartbeatServiceProvider: e }, { fid: t }) {
  const s = Zi(n), i = nr(n), r = e.getImmediate({
    optional: !0
  });
  if (r) {
    const c = await r.getHeartbeatsHeader();
    c && i.append("x-firebase-client", c);
  }
  const o = {
    fid: t,
    authVersion: Xi,
    appId: n.appId,
    sdkVersion: Qi
  }, a = {
    method: "POST",
    headers: i,
    body: JSON.stringify(o)
  }, l = await sr(() => fetch(s, a));
  if (l.ok) {
    const c = await l.json();
    return {
      fid: c.fid || t,
      registrationStatus: 2,
      refreshToken: c.refreshToken,
      authToken: er(c.authToken)
    };
  } else
    throw await tr("Create Installation", l);
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
function ir(n) {
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
function jc(n) {
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
const Gc = /^[cdef][\w-]{21}$/, bn = "";
function zc() {
  try {
    const n = new Uint8Array(17);
    (self.crypto || self.msCrypto).getRandomValues(n), n[0] = 112 + n[0] % 16;
    const t = Yc(n);
    return Gc.test(t) ? t : bn;
  } catch {
    return bn;
  }
}
function Yc(n) {
  return jc(n).substr(0, 22);
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
function Lt(n) {
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
const rr = /* @__PURE__ */ new Map();
function or(n, e) {
  const t = Lt(n);
  ar(t, e), Qc(t, e);
}
function ar(n, e) {
  const t = rr.get(n);
  if (t)
    for (const s of t)
      s(e);
}
function Qc(n, e) {
  const t = Xc();
  t && t.postMessage({ key: n, fid: e }), Jc();
}
let ge = null;
function Xc() {
  return !ge && "BroadcastChannel" in self && (ge = new BroadcastChannel("[Firebase] FID Change"), ge.onmessage = (n) => {
    ar(n.data.key, n.data.fid);
  }), ge;
}
function Jc() {
  rr.size === 0 && ge && (ge.close(), ge = null);
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
const Zc = "firebase-installations-database", el = 1, be = "firebase-installations-store";
let Xt = null;
function Hn() {
  return Xt || (Xt = xt(Zc, el, {
    upgrade: (n, e) => {
      switch (e) {
        case 0:
          n.createObjectStore(be);
      }
    }
  })), Xt;
}
async function bt(n, e) {
  const t = Lt(n), i = (await Hn()).transaction(be, "readwrite"), r = i.objectStore(be), o = await r.get(t);
  return await r.put(e, t), await i.done, (!o || o.fid !== e.fid) && or(n, e.fid), e;
}
async function cr(n) {
  const e = Lt(n), s = (await Hn()).transaction(be, "readwrite");
  await s.objectStore(be).delete(e), await s.done;
}
async function Ft(n, e) {
  const t = Lt(n), i = (await Hn()).transaction(be, "readwrite"), r = i.objectStore(be), o = await r.get(t), a = e(o);
  return a === void 0 ? await r.delete(t) : await r.put(a, t), await i.done, a && (!o || o.fid !== a.fid) && or(n, a.fid), a;
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
async function $n(n) {
  let e;
  const t = await Ft(n.appConfig, (s) => {
    const i = tl(s), r = nl(n, i);
    return e = r.registrationPromise, r.installationEntry;
  });
  return t.fid === bn ? { installationEntry: await e } : {
    installationEntry: t,
    registrationPromise: e
  };
}
function tl(n) {
  const e = n || {
    fid: zc(),
    registrationStatus: 0
    /* RequestStatus.NOT_STARTED */
  };
  return lr(e);
}
function nl(n, e) {
  if (e.registrationStatus === 0) {
    if (!navigator.onLine) {
      const i = Promise.reject(we.create(
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
    }, s = sl(n, t);
    return { installationEntry: t, registrationPromise: s };
  } else return e.registrationStatus === 1 ? {
    installationEntry: e,
    registrationPromise: il(n)
  } : { installationEntry: e };
}
async function sl(n, e) {
  try {
    const t = await qc(n, e);
    return bt(n.appConfig, t);
  } catch (t) {
    throw Ji(t) && t.customData.serverCode === 409 ? await cr(n.appConfig) : await bt(n.appConfig, {
      fid: e.fid,
      registrationStatus: 0
      /* RequestStatus.NOT_STARTED */
    }), t;
  }
}
async function il(n) {
  let e = await Us(n.appConfig);
  for (; e.registrationStatus === 1; )
    await ir(100), e = await Us(n.appConfig);
  if (e.registrationStatus === 0) {
    const { installationEntry: t, registrationPromise: s } = await $n(n);
    return s || t;
  }
  return e;
}
function Us(n) {
  return Ft(n, (e) => {
    if (!e)
      throw we.create(
        "installation-not-found"
        /* ErrorCode.INSTALLATION_NOT_FOUND */
      );
    return lr(e);
  });
}
function lr(n) {
  return rl(n) ? {
    fid: n.fid,
    registrationStatus: 0
    /* RequestStatus.NOT_STARTED */
  } : n;
}
function rl(n) {
  return n.registrationStatus === 1 && n.registrationTime + Yi < Date.now();
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
async function ol({ appConfig: n, heartbeatServiceProvider: e }, t) {
  const s = al(n, t), i = $c(n, t), r = e.getImmediate({
    optional: !0
  });
  if (r) {
    const c = await r.getHeartbeatsHeader();
    c && i.append("x-firebase-client", c);
  }
  const o = {
    installation: {
      sdkVersion: Qi,
      appId: n.appId
    }
  }, a = {
    method: "POST",
    headers: i,
    body: JSON.stringify(o)
  }, l = await sr(() => fetch(s, a));
  if (l.ok) {
    const c = await l.json();
    return er(c);
  } else
    throw await tr("Generate Auth Token", l);
}
function al(n, { fid: e }) {
  return `${Zi(n)}/${e}/authTokens:generate`;
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
async function Kn(n, e = !1) {
  let t;
  const s = await Ft(n.appConfig, (r) => {
    if (!hr(r))
      throw we.create(
        "not-registered"
        /* ErrorCode.NOT_REGISTERED */
      );
    const o = r.authToken;
    if (!e && hl(o))
      return r;
    if (o.requestStatus === 1)
      return t = cl(n, e), r;
    {
      if (!navigator.onLine)
        throw we.create(
          "app-offline"
          /* ErrorCode.APP_OFFLINE */
        );
      const a = dl(r);
      return t = ll(n, a), a;
    }
  });
  return t ? await t : s.authToken;
}
async function cl(n, e) {
  let t = await Bs(n.appConfig);
  for (; t.authToken.requestStatus === 1; )
    await ir(100), t = await Bs(n.appConfig);
  const s = t.authToken;
  return s.requestStatus === 0 ? Kn(n, e) : s;
}
function Bs(n) {
  return Ft(n, (e) => {
    if (!hr(e))
      throw we.create(
        "not-registered"
        /* ErrorCode.NOT_REGISTERED */
      );
    const t = e.authToken;
    return fl(t) ? {
      ...e,
      authToken: {
        requestStatus: 0
        /* RequestStatus.NOT_STARTED */
      }
    } : e;
  });
}
async function ll(n, e) {
  try {
    const t = await ol(n, e), s = {
      ...e,
      authToken: t
    };
    return await bt(n.appConfig, s), t;
  } catch (t) {
    if (Ji(t) && (t.customData.serverCode === 401 || t.customData.serverCode === 404))
      await cr(n.appConfig);
    else {
      const s = {
        ...e,
        authToken: {
          requestStatus: 0
          /* RequestStatus.NOT_STARTED */
        }
      };
      await bt(n.appConfig, s);
    }
    throw t;
  }
}
function hr(n) {
  return n !== void 0 && n.registrationStatus === 2;
}
function hl(n) {
  return n.requestStatus === 2 && !ul(n);
}
function ul(n) {
  const e = Date.now();
  return e < n.creationTime || n.creationTime + n.expiresIn < e + Uc;
}
function dl(n) {
  const e = {
    requestStatus: 1,
    requestTime: Date.now()
  };
  return {
    ...n,
    authToken: e
  };
}
function fl(n) {
  return n.requestStatus === 1 && n.requestTime + Yi < Date.now();
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
async function pl(n) {
  const e = n, { installationEntry: t, registrationPromise: s } = await $n(e);
  return s ? s.catch(console.error) : Kn(e).catch(console.error), t.fid;
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
async function _l(n, e = !1) {
  const t = n;
  return await gl(t), (await Kn(t, e)).token;
}
async function gl(n) {
  const { registrationPromise: e } = await $n(n);
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
function ml(n) {
  if (!n || !n.options)
    throw Jt("App Configuration");
  if (!n.name)
    throw Jt("App Name");
  const e = [
    "projectId",
    "apiKey",
    "appId"
  ];
  for (const t of e)
    if (!n.options[t])
      throw Jt(t);
  return {
    appName: n.name,
    projectId: n.options.projectId,
    apiKey: n.options.apiKey,
    appId: n.options.appId
  };
}
function Jt(n) {
  return we.create("missing-app-config-values", {
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
const ur = "installations", yl = "installations-internal", wl = (n) => {
  const e = n.getProvider("app").getImmediate(), t = ml(e), s = Ue(e, "heartbeat");
  return {
    app: e,
    appConfig: t,
    heartbeatServiceProvider: s,
    _delete: () => Promise.resolve()
  };
}, bl = (n) => {
  const e = n.getProvider("app").getImmediate(), t = Ue(e, ur).getImmediate();
  return {
    getId: () => pl(t),
    getToken: (i) => _l(t, i)
  };
};
function Cl() {
  ne(new z(
    ur,
    wl,
    "PUBLIC"
    /* ComponentType.PUBLIC */
  )), ne(new z(
    yl,
    bl,
    "PRIVATE"
    /* ComponentType.PRIVATE */
  ));
}
Cl();
Z(zi, Wn);
Z(zi, Wn, "esm2020");
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
const dr = "BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4", El = "https://fcmregistrations.googleapis.com/v1", fr = "FCM_MSG", vl = "google.c.a.c_id", Tl = 3, Sl = 1;
var Ct;
(function(n) {
  n[n.DATA_MESSAGE = 1] = "DATA_MESSAGE", n[n.DISPLAY_NOTIFICATION = 3] = "DISPLAY_NOTIFICATION";
})(Ct || (Ct = {}));
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
var Et;
(function(n) {
  n.PUSH_RECEIVED = "push-received", n.NOTIFICATION_CLICKED = "notification-clicked";
})(Et || (Et = {}));
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
function Y(n) {
  const e = new Uint8Array(n);
  return btoa(String.fromCharCode(...e)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function Il(n) {
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
const Zt = "fcm_token_details_db", kl = 5, Ws = "fcm_token_object_Store";
async function Rl(n) {
  if ("databases" in indexedDB && !(await indexedDB.databases()).map((r) => r.name).includes(Zt))
    return null;
  let e = null;
  return (await xt(Zt, kl, {
    upgrade: async (s, i, r, o) => {
      if (i < 2 || !s.objectStoreNames.contains(Ws))
        return;
      const a = o.objectStore(Ws), l = await a.index("fcmSenderId").get(n);
      if (await a.clear(), !!l) {
        if (i === 2) {
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
              vapidKey: typeof c.vapidKey == "string" ? c.vapidKey : Y(c.vapidKey)
            }
          };
        } else if (i === 3) {
          const c = l;
          e = {
            token: c.fcmToken,
            createTime: c.createTime,
            subscriptionOptions: {
              auth: Y(c.auth),
              p256dh: Y(c.p256dh),
              endpoint: c.endpoint,
              swScope: c.swScope,
              vapidKey: Y(c.vapidKey)
            }
          };
        } else if (i === 4) {
          const c = l;
          e = {
            token: c.fcmToken,
            createTime: c.createTime,
            subscriptionOptions: {
              auth: Y(c.auth),
              p256dh: Y(c.p256dh),
              endpoint: c.endpoint,
              swScope: c.swScope,
              vapidKey: Y(c.vapidKey)
            }
          };
        }
      }
    }
  })).close(), await zt(Zt), await zt("fcm_vapid_details_db"), await zt("undefined"), Al(e) ? e : null;
}
function Al(n) {
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
const Nl = "firebase-messaging-database", Dl = 1, Ce = "firebase-messaging-store";
let en = null;
function Vn() {
  return en || (en = xt(Nl, Dl, {
    upgrade: (n, e) => {
      switch (e) {
        case 0:
          n.createObjectStore(Ce);
      }
    }
  })), en;
}
async function qn(n) {
  const e = Gn(n), s = await (await Vn()).transaction(Ce).objectStore(Ce).get(e);
  if (s)
    return s;
  {
    const i = await Rl(n.appConfig.senderId);
    if (i)
      return await jn(n, i), i;
  }
}
async function jn(n, e) {
  const t = Gn(n), i = (await Vn()).transaction(Ce, "readwrite");
  return await i.objectStore(Ce).put(e, t), await i.done, e;
}
async function Ol(n) {
  const e = Gn(n), s = (await Vn()).transaction(Ce, "readwrite");
  await s.objectStore(Ce).delete(e), await s.done;
}
function Gn({ appConfig: n }) {
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
const Ml = {
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
}, q = new rt("messaging", "Messaging", Ml);
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
async function Pl(n, e) {
  const t = await Yn(n), s = _r(e), i = {
    method: "POST",
    headers: t,
    body: JSON.stringify(s)
  };
  let r;
  try {
    r = await (await fetch(zn(n.appConfig), i)).json();
  } catch (o) {
    throw q.create("token-subscribe-failed", {
      errorInfo: o == null ? void 0 : o.toString()
    });
  }
  if (r.error) {
    const o = r.error.message;
    throw q.create("token-subscribe-failed", {
      errorInfo: o
    });
  }
  if (!r.token)
    throw q.create(
      "token-subscribe-no-token"
      /* ErrorCode.TOKEN_SUBSCRIBE_NO_TOKEN */
    );
  return r.token;
}
async function xl(n, e) {
  const t = await Yn(n), s = _r(e.subscriptionOptions), i = {
    method: "PATCH",
    headers: t,
    body: JSON.stringify(s)
  };
  let r;
  try {
    r = await (await fetch(`${zn(n.appConfig)}/${e.token}`, i)).json();
  } catch (o) {
    throw q.create("token-update-failed", {
      errorInfo: o == null ? void 0 : o.toString()
    });
  }
  if (r.error) {
    const o = r.error.message;
    throw q.create("token-update-failed", {
      errorInfo: o
    });
  }
  if (!r.token)
    throw q.create(
      "token-update-no-token"
      /* ErrorCode.TOKEN_UPDATE_NO_TOKEN */
    );
  return r.token;
}
async function pr(n, e) {
  const s = {
    method: "DELETE",
    headers: await Yn(n)
  };
  try {
    const r = await (await fetch(`${zn(n.appConfig)}/${e}`, s)).json();
    if (r.error) {
      const o = r.error.message;
      throw q.create("token-unsubscribe-failed", {
        errorInfo: o
      });
    }
  } catch (i) {
    throw q.create("token-unsubscribe-failed", {
      errorInfo: i == null ? void 0 : i.toString()
    });
  }
}
function zn({ projectId: n }) {
  return `${El}/projects/${n}/registrations`;
}
async function Yn({ appConfig: n, installations: e }) {
  const t = await e.getToken();
  return new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-goog-api-key": n.apiKey,
    "x-goog-firebase-installations-auth": `FIS ${t}`
  });
}
function _r({ p256dh: n, auth: e, endpoint: t, vapidKey: s }) {
  const i = {
    web: {
      endpoint: t,
      auth: e,
      p256dh: n
    }
  };
  return s !== dr && (i.web.applicationPubKey = s), i;
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
const Ll = 7 * 24 * 60 * 60 * 1e3;
async function Fl(n) {
  const e = await Bl(n.swRegistration, n.vapidKey), t = {
    vapidKey: n.vapidKey,
    swScope: n.swRegistration.scope,
    endpoint: e.endpoint,
    auth: Y(e.getKey("auth")),
    p256dh: Y(e.getKey("p256dh"))
  }, s = await qn(n.firebaseDependencies);
  if (s) {
    if (Wl(s.subscriptionOptions, t))
      return Date.now() >= s.createTime + Ll ? Ul(n, {
        token: s.token,
        createTime: Date.now(),
        subscriptionOptions: t
      }) : s.token;
    try {
      await pr(n.firebaseDependencies, s.token);
    } catch (i) {
      console.warn(i);
    }
    return $s(n.firebaseDependencies, t);
  } else return $s(n.firebaseDependencies, t);
}
async function Hs(n) {
  const e = await qn(n.firebaseDependencies);
  e && (await pr(n.firebaseDependencies, e.token), await Ol(n.firebaseDependencies));
  const t = await n.swRegistration.pushManager.getSubscription();
  return t ? t.unsubscribe() : !0;
}
async function Ul(n, e) {
  try {
    const t = await xl(n.firebaseDependencies, e), s = {
      ...e,
      token: t,
      createTime: Date.now()
    };
    return await jn(n.firebaseDependencies, s), t;
  } catch (t) {
    throw t;
  }
}
async function $s(n, e) {
  const s = {
    token: await Pl(n, e),
    createTime: Date.now(),
    subscriptionOptions: e
  };
  return await jn(n, s), s.token;
}
async function Bl(n, e) {
  const t = await n.pushManager.getSubscription();
  return t || n.pushManager.subscribe({
    userVisibleOnly: !0,
    // Chrome <= 75 doesn't support base64-encoded VAPID key. For backward compatibility, VAPID key
    // submitted to pushManager#subscribe must be of type Uint8Array.
    applicationServerKey: Il(e)
  });
}
function Wl(n, e) {
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
function Hl(n) {
  const e = {
    from: n.from,
    // eslint-disable-next-line camelcase
    collapseKey: n.collapse_key,
    // eslint-disable-next-line camelcase
    messageId: n.fcmMessageId
  };
  return $l(e, n), Kl(e, n), Vl(e, n), e;
}
function $l(n, e) {
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
function Kl(n, e) {
  e.data && (n.data = e.data);
}
function Vl(n, e) {
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
function ql(n) {
  return typeof n == "object" && !!n && vl in n;
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
function jl(n) {
  return new Promise((e) => {
    setTimeout(e, n);
  });
}
async function Gl(n, e) {
  const t = zl(e, await n.firebaseDependencies.installations.getId());
  Yl(n, t, e.productId);
}
function zl(n, e) {
  var s, i;
  const t = {};
  return n.from && (t.project_number = n.from), n.fcmMessageId && (t.message_id = n.fcmMessageId), t.instance_id = e, n.notification ? t.message_type = Ct.DISPLAY_NOTIFICATION.toString() : t.message_type = Ct.DATA_MESSAGE.toString(), t.sdk_platform = Tl.toString(), t.package_name = self.origin.replace(/(^\w+:|^)\/\//, ""), n.collapse_key && (t.collapse_key = n.collapse_key), t.event = Sl.toString(), (s = n.fcmOptions) != null && s.analytics_label && (t.analytics_label = (i = n.fcmOptions) == null ? void 0 : i.analytics_label), t;
}
function Yl(n, e, t) {
  const s = {};
  s.event_time_ms = Math.floor(Date.now()).toString(), s.source_extension_json_proto3 = JSON.stringify({
    messaging_client_event: e
  }), t && (s.compliance_data = Ql(t)), n.logEvents.push(s);
}
function Ql(n) {
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
async function Xl(n, e) {
  var i;
  const { newSubscription: t } = n;
  if (!t) {
    await Hs(e);
    return;
  }
  const s = await qn(e.firebaseDependencies);
  await Hs(e), e.vapidKey = ((i = s == null ? void 0 : s.subscriptionOptions) == null ? void 0 : i.vapidKey) ?? dr, await Fl(e);
}
async function Jl(n, e) {
  const t = th(n);
  if (!t)
    return;
  e.deliveryMetricsExportedToBigQueryEnabled && await Gl(e, t);
  const s = await gr();
  if (sh(s))
    return ih(s, t);
  if (t.notification && await rh(eh(t)), !!e && e.onBackgroundMessageHandler) {
    const i = Hl(t);
    typeof e.onBackgroundMessageHandler == "function" ? await e.onBackgroundMessageHandler(i) : e.onBackgroundMessageHandler.next(i);
  }
}
async function Zl(n) {
  var o, a;
  const e = (a = (o = n.notification) == null ? void 0 : o.data) == null ? void 0 : a[fr];
  if (e) {
    if (n.action)
      return;
  } else return;
  n.stopImmediatePropagation(), n.notification.close();
  const t = oh(e);
  if (!t)
    return;
  const s = new URL(t, self.location.href), i = new URL(self.location.origin);
  if (s.host !== i.host)
    return;
  let r = await nh(s);
  if (r ? r = await r.focus() : (r = await self.clients.openWindow(t), await jl(3e3)), !!r)
    return e.messageType = Et.NOTIFICATION_CLICKED, e.isFirebaseMessaging = !0, r.postMessage(e);
}
function eh(n) {
  const e = {
    ...n.notification
  };
  return e.data = {
    [fr]: n
  }, e;
}
function th({ data: n }) {
  if (!n)
    return null;
  try {
    return n.json();
  } catch {
    return null;
  }
}
async function nh(n) {
  const e = await gr();
  for (const t of e) {
    const s = new URL(t.url, self.location.href);
    if (n.host === s.host)
      return t;
  }
  return null;
}
function sh(n) {
  return n.some((e) => e.visibilityState === "visible" && // Ignore chrome-extension clients as that matches the background pages of extensions, which
  // are always considered visible for some reason.
  !e.url.startsWith("chrome-extension://"));
}
function ih(n, e) {
  e.isFirebaseMessaging = !0, e.messageType = Et.PUSH_RECEIVED;
  for (const t of n)
    t.postMessage(e);
}
function gr() {
  return self.clients.matchAll({
    type: "window",
    includeUncontrolled: !0
    // TS doesn't know that "type: 'window'" means it'll return WindowClient[]
  });
}
function rh(n) {
  const { actions: e } = n, { maxActions: t } = Notification;
  return e && t && e.length > t && console.warn(`This browser only supports ${t} actions. The remaining actions will not be displayed.`), self.registration.showNotification(
    /* title= */
    n.title ?? "",
    n
  );
}
function oh(n) {
  var t, s;
  const e = ((t = n.fcmOptions) == null ? void 0 : t.link) ?? ((s = n.notification) == null ? void 0 : s.click_action);
  return e || (ql(n.data) ? self.location.origin : null);
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
function ah(n) {
  if (!n || !n.options)
    throw tn("App Configuration Object");
  if (!n.name)
    throw tn("App Name");
  const e = [
    "projectId",
    "apiKey",
    "appId",
    "messagingSenderId"
  ], { options: t } = n;
  for (const s of e)
    if (!t[s])
      throw tn(s);
  return {
    appName: n.name,
    projectId: t.projectId,
    apiKey: t.apiKey,
    appId: t.appId,
    senderId: t.messagingSenderId
  };
}
function tn(n) {
  return q.create("missing-app-config-values", {
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
class ch {
  constructor(e, t, s) {
    this.deliveryMetricsExportedToBigQueryEnabled = !1, this.onBackgroundMessageHandler = null, this.onMessageHandler = null, this.logEvents = [], this.isLogServiceStarted = !1;
    const i = ah(e);
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
const lh = (n) => {
  const e = new ch(n.getProvider("app").getImmediate(), n.getProvider("installations-internal").getImmediate(), n.getProvider("analytics-internal"));
  return self.addEventListener("push", (t) => {
    t.waitUntil(Jl(t, e));
  }), self.addEventListener("pushsubscriptionchange", (t) => {
    t.waitUntil(Xl(t, e));
  }), self.addEventListener("notificationclick", (t) => {
    t.waitUntil(Zl(t));
  }), e;
};
function hh() {
  ne(new z(
    "messaging-sw",
    lh,
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
async function uh() {
  return Mt() && await Hi() && "PushManager" in self && "Notification" in self && ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification") && PushSubscription.prototype.hasOwnProperty("getKey");
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
function dh(n = Bn()) {
  return uh().then((e) => {
    if (!e)
      throw q.create(
        "unsupported-browser"
        /* ErrorCode.UNSUPPORTED_BROWSER */
      );
  }, (e) => {
    throw q.create(
      "indexed-db-unsupported"
      /* ErrorCode.INDEXED_DB_UNSUPPORTED */
    );
  }), Ue(Se(n), "messaging-sw").getImmediate();
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
hh();
try {
  self["workbox:core:7.2.0"] && _();
} catch {
}
const fh = (n, ...e) => {
  let t = n;
  return e.length > 0 && (t += ` :: ${JSON.stringify(e)}`), t;
}, ph = fh;
class B extends Error {
  /**
   *
   * @param {string} errorCode The error code that
   * identifies this particular error.
   * @param {Object=} details Any relevant arguments
   * that will help developers identify issues should
   * be added as a key on the context object.
   */
  constructor(e, t) {
    const s = ph(e, t);
    super(s), this.name = e, this.details = t;
  }
}
const Q = {
  googleAnalytics: "googleAnalytics",
  precache: "precache-v2",
  prefix: "workbox",
  runtime: "runtime",
  suffix: typeof registration < "u" ? registration.scope : ""
}, nn = (n) => [Q.prefix, n, Q.suffix].filter((e) => e && e.length > 0).join("-"), _h = (n) => {
  for (const e of Object.keys(Q))
    n(e);
}, Qn = {
  updateDetails: (n) => {
    _h((e) => {
      typeof n[e] == "string" && (Q[e] = n[e]);
    });
  },
  getGoogleAnalyticsName: (n) => n || nn(Q.googleAnalytics),
  getPrecacheName: (n) => n || nn(Q.precache),
  getPrefix: () => Q.prefix,
  getRuntimeName: (n) => n || nn(Q.runtime),
  getSuffix: () => Q.suffix
};
function Ks(n, e) {
  const t = e();
  return n.waitUntil(t), t;
}
try {
  self["workbox:precaching:7.2.0"] && _();
} catch {
}
const gh = "__WB_REVISION__";
function mh(n) {
  if (!n)
    throw new B("add-to-cache-list-unexpected-type", { entry: n });
  if (typeof n == "string") {
    const r = new URL(n, location.href);
    return {
      cacheKey: r.href,
      url: r.href
    };
  }
  const { revision: e, url: t } = n;
  if (!t)
    throw new B("add-to-cache-list-unexpected-type", { entry: n });
  if (!e) {
    const r = new URL(t, location.href);
    return {
      cacheKey: r.href,
      url: r.href
    };
  }
  const s = new URL(t, location.href), i = new URL(t, location.href);
  return s.searchParams.set(gh, e), {
    cacheKey: s.href,
    url: i.href
  };
}
class yh {
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
class wh {
  constructor({ precacheController: e }) {
    this.cacheKeyWillBeUsed = async ({ request: t, params: s }) => {
      const i = (s == null ? void 0 : s.cacheKey) || this._precacheController.getCacheKeyForURL(t.url);
      return i ? new Request(i, { headers: t.headers }) : t;
    }, this._precacheController = e;
  }
}
let $e;
function bh() {
  if ($e === void 0) {
    const n = new Response("");
    if ("body" in n)
      try {
        new Response(n.body), $e = !0;
      } catch {
        $e = !1;
      }
    $e = !1;
  }
  return $e;
}
async function Ch(n, e) {
  let t = null;
  if (n.url && (t = new URL(n.url).origin), t !== self.location.origin)
    throw new B("cross-origin-copy-response", { origin: t });
  const s = n.clone(), r = {
    headers: new Headers(s.headers),
    status: s.status,
    statusText: s.statusText
  }, o = bh() ? s.body : await s.blob();
  return new Response(o, r);
}
const Eh = (n) => new URL(String(n), location.href).href.replace(new RegExp(`^${location.origin}`), "");
function Vs(n, e) {
  const t = new URL(n);
  for (const s of e)
    t.searchParams.delete(s);
  return t.href;
}
async function vh(n, e, t, s) {
  const i = Vs(e.url, t);
  if (e.url === i)
    return n.match(e, s);
  const r = Object.assign(Object.assign({}, s), { ignoreSearch: !0 }), o = await n.keys(e, r);
  for (const a of o) {
    const l = Vs(a.url, t);
    if (i === l)
      return n.match(a, s);
  }
}
class Th {
  /**
   * Creates a promise and exposes its resolve and reject functions as methods.
   */
  constructor() {
    this.promise = new Promise((e, t) => {
      this.resolve = e, this.reject = t;
    });
  }
}
const Sh = /* @__PURE__ */ new Set();
async function Ih() {
  for (const n of Sh)
    await n();
}
function kh(n) {
  return new Promise((e) => setTimeout(e, n));
}
try {
  self["workbox:strategies:7.2.0"] && _();
} catch {
}
function ht(n) {
  return typeof n == "string" ? new Request(n) : n;
}
class Rh {
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
    this._cacheKeys = {}, Object.assign(this, t), this.event = t.event, this._strategy = e, this._handlerDeferred = new Th(), this._extendLifetimePromises = [], this._plugins = [...e.plugins], this._pluginStateMap = /* @__PURE__ */ new Map();
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
    let s = ht(e);
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
        throw new B("plugin-error-request-will-fetch", {
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
    const t = ht(e);
    let s;
    const { cacheName: i, matchOptions: r } = this._strategy, o = await this.getCacheKey(t, "read"), a = Object.assign(Object.assign({}, r), { cacheName: i });
    s = await caches.match(o, a);
    for (const l of this.iterateCallbacks("cachedResponseWillBeUsed"))
      s = await l({
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
    const s = ht(e);
    await kh(0);
    const i = await this.getCacheKey(s, "write");
    if (!t)
      throw new B("cache-put-with-no-response", {
        url: Eh(i.url)
      });
    const r = await this._ensureResponseSafeToCache(t);
    if (!r)
      return !1;
    const { cacheName: o, matchOptions: a } = this._strategy, l = await self.caches.open(o), c = this.hasCallback("cacheDidUpdate"), u = c ? await vh(
      // TODO(philipwalton): the `__WB_REVISION__` param is a precaching
      // feature. Consider into ways to only add this behavior if using
      // precaching.
      l,
      i.clone(),
      ["__WB_REVISION__"],
      a
    ) : null;
    try {
      await l.put(i, c ? r.clone() : r);
    } catch (h) {
      if (h instanceof Error)
        throw h.name === "QuotaExceededError" && await Ih(), h;
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
        i = ht(await r({
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
class Ah {
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
    this.cacheName = Qn.getRuntimeName(e.cacheName), this.plugins = e.plugins || [], this.fetchOptions = e.fetchOptions, this.matchOptions = e.matchOptions;
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
    const t = e.event, s = typeof e.request == "string" ? new Request(e.request) : e.request, i = "params" in e ? e.params : void 0, r = new Rh(this, { event: t, request: s, params: i }), o = this._getResponse(r, s, t), a = this._awaitComplete(o, r, s, t);
    return [o, a];
  }
  async _getResponse(e, t, s) {
    await e.runCallbacks("handlerWillStart", { event: s, request: t });
    let i;
    try {
      if (i = await this._handle(t, e), !i || i.type === "error")
        throw new B("no-response", { url: t.url });
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
class oe extends Ah {
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
    e.cacheName = Qn.getPrecacheName(e.cacheName), super(e), this._fallbackToNetwork = e.fallbackToNetwork !== !1, this.plugins.push(oe.copyRedirectedCacheableResponsesPlugin);
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
      throw new B("missing-precache-entry", {
        cacheName: this.cacheName,
        url: e.url
      });
    return s;
  }
  async _handleInstall(e, t) {
    this._useDefaultCacheabilityPluginIfNeeded();
    const s = await t.fetch(e);
    if (!await t.cachePut(e, s.clone()))
      throw new B("bad-precaching-response", {
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
      i !== oe.copyRedirectedCacheableResponsesPlugin && (i === oe.defaultPrecacheCacheabilityPlugin && (e = s), i.cacheWillUpdate && t++);
    t === 0 ? this.plugins.push(oe.defaultPrecacheCacheabilityPlugin) : t > 1 && e !== null && this.plugins.splice(e, 1);
  }
}
oe.defaultPrecacheCacheabilityPlugin = {
  async cacheWillUpdate({ response: n }) {
    return !n || n.status >= 400 ? null : n;
  }
};
oe.copyRedirectedCacheableResponsesPlugin = {
  async cacheWillUpdate({ response: n }) {
    return n.redirected ? await Ch(n) : n;
  }
};
class Nh {
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
    this._urlsToCacheKeys = /* @__PURE__ */ new Map(), this._urlsToCacheModes = /* @__PURE__ */ new Map(), this._cacheKeysToIntegrities = /* @__PURE__ */ new Map(), this._strategy = new oe({
      cacheName: Qn.getPrecacheName(e),
      plugins: [
        ...t,
        new wh({ precacheController: this })
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
      const { cacheKey: i, url: r } = mh(s), o = typeof s != "string" && s.revision ? "reload" : "default";
      if (this._urlsToCacheKeys.has(r) && this._urlsToCacheKeys.get(r) !== i)
        throw new B("add-to-cache-list-conflicting-entries", {
          firstEntry: this._urlsToCacheKeys.get(r),
          secondEntry: i
        });
      if (typeof s != "string" && s.integrity) {
        if (this._cacheKeysToIntegrities.has(i) && this._cacheKeysToIntegrities.get(i) !== s.integrity)
          throw new B("add-to-cache-list-conflicting-integrities", {
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
    return Ks(e, async () => {
      const t = new yh();
      this.strategy.plugins.push(t);
      for (const [r, o] of this._urlsToCacheKeys) {
        const a = this._cacheKeysToIntegrities.get(o), l = this._urlsToCacheModes.get(r), c = new Request(r, {
          integrity: a,
          cache: l,
          credentials: "same-origin"
        });
        await Promise.all(this.strategy.handleAll({
          params: { cacheKey: o },
          request: c,
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
    return Ks(e, async () => {
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
      throw new B("non-precached-url", { url: e });
    return (s) => (s.request = new Request(e), s.params = Object.assign({ cacheKey: t }, s.params), this.strategy.handle(s));
  }
}
let sn;
const mr = () => (sn || (sn = new Nh()), sn);
try {
  self["workbox:routing:7.2.0"] && _();
} catch {
}
const yr = "GET", vt = (n) => n && typeof n == "object" ? n : { handle: n };
class Ye {
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
  constructor(e, t, s = yr) {
    this.handler = vt(t), this.match = e, this.method = s;
  }
  /**
   *
   * @param {workbox-routing-handlerCallback} handler A callback
   * function that returns a Promise resolving to a Response
   */
  setCatchHandler(e) {
    this.catchHandler = vt(e);
  }
}
class Dh extends Ye {
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
class Oh {
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
    const l = e.method;
    if (!a && this._defaultHandlerMap.has(l) && (a = this._defaultHandlerMap.get(l)), !a)
      return;
    let c;
    try {
      c = a.handle({ url: s, request: e, event: t, params: r });
    } catch (h) {
      c = Promise.reject(h);
    }
    const u = o && o.catchHandler;
    return c instanceof Promise && (this._catchHandler || u) && (c = c.catch(async (h) => {
      if (u)
        try {
          return await u.handle({ url: s, request: e, event: t, params: r });
        } catch (d) {
          d instanceof Error && (h = d);
        }
      if (this._catchHandler)
        return this._catchHandler.handle({ url: s, request: e, event: t });
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
  findMatchingRoute({ url: e, sameOrigin: t, request: s, event: i }) {
    const r = this._routes.get(s.method) || [];
    for (const o of r) {
      let a;
      const l = o.match({ url: e, sameOrigin: t, request: s, event: i });
      if (l)
        return a = l, (Array.isArray(a) && a.length === 0 || l.constructor === Object && // eslint-disable-line
        Object.keys(l).length === 0 || typeof l == "boolean") && (a = void 0), { route: o, params: a };
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
  setDefaultHandler(e, t = yr) {
    this._defaultHandlerMap.set(t, vt(e));
  }
  /**
   * If a Route throws an error while handling a request, this `handler`
   * will be called and given a chance to provide a response.
   *
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   */
  setCatchHandler(e) {
    this._catchHandler = vt(e);
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
      throw new B("unregister-route-but-not-found-with-method", {
        method: e.method
      });
    const t = this._routes.get(e.method).indexOf(e);
    if (t > -1)
      this._routes.get(e.method).splice(t, 1);
    else
      throw new B("unregister-route-route-not-registered");
  }
}
let Ke;
const Mh = () => (Ke || (Ke = new Oh(), Ke.addFetchListener(), Ke.addCacheListener()), Ke);
function Ph(n, e, t) {
  let s;
  if (typeof n == "string") {
    const r = new URL(n, location.href), o = ({ url: a }) => a.href === r.href;
    s = new Ye(o, e, t);
  } else if (n instanceof RegExp)
    s = new Dh(n, e, t);
  else if (typeof n == "function")
    s = new Ye(n, e, t);
  else if (n instanceof Ye)
    s = n;
  else
    throw new B("unsupported-route-type", {
      moduleName: "workbox-routing",
      funcName: "registerRoute",
      paramName: "capture"
    });
  return Mh().registerRoute(s), s;
}
function xh(n, e = []) {
  for (const t of [...n.searchParams.keys()])
    e.some((s) => s.test(t)) && n.searchParams.delete(t);
  return n;
}
function* Lh(n, { ignoreURLParametersMatching: e = [/^utm_/, /^fbclid$/], directoryIndex: t = "index.html", cleanURLs: s = !0, urlManipulation: i } = {}) {
  const r = new URL(n, location.href);
  r.hash = "", yield r.href;
  const o = xh(r, e);
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
    for (const l of a)
      yield l.href;
  }
}
class Fh extends Ye {
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
      for (const o of Lh(i.url, t)) {
        const a = r.get(o);
        if (a) {
          const l = e.getIntegrityForCacheKey(a);
          return { cacheKey: a, integrity: l };
        }
      }
    };
    super(s, e.strategy);
  }
}
function Uh(n) {
  const e = mr(), t = new Fh(e, n);
  Ph(t);
}
function Bh(n) {
  mr().precache(n);
}
function Wh(n, e) {
  Bh(n), Uh(e);
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
const Cn = /* @__PURE__ */ new Map(), wr = {
  activated: !1,
  tokenObservers: []
}, Hh = {
  initialized: !1,
  enabled: !1
};
function R(n) {
  return Cn.get(n) || { ...wr };
}
function $h(n, e) {
  return Cn.set(n, e), Cn.get(n);
}
function Ut() {
  return Hh;
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
const br = "https://content-firebaseappcheck.googleapis.com/v1", Kh = "exchangeRecaptchaV3Token", Vh = "exchangeDebugToken", qs = {
  /**
   * This is the first retrial wait after an error. This is currently
   * 30 seconds.
   */
  RETRIAL_MIN_WAIT: 30 * 1e3,
  /**
   * This is the maximum retrial wait, currently 16 minutes.
   */
  RETRIAL_MAX_WAIT: 16 * 60 * 1e3
}, qh = 24 * 60 * 60 * 1e3;
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
class jh {
  constructor(e, t, s, i, r) {
    if (this.operation = e, this.retryPolicy = t, this.getWaitDuration = s, this.lowerBound = i, this.upperBound = r, this.pending = null, this.nextErrorWaitInterval = i, i > r)
      throw new Error("Proactive refresh lower bound greater than upper bound!");
  }
  start() {
    this.nextErrorWaitInterval = this.lowerBound, this.process(!0).catch(() => {
    });
  }
  stop() {
    this.pending && (this.pending.reject("cancelled"), this.pending = null);
  }
  isRunning() {
    return !!this.pending;
  }
  async process(e) {
    this.stop();
    try {
      this.pending = new he(), this.pending.promise.catch((t) => {
      }), await Gh(this.getNextRun(e)), this.pending.resolve(), await this.pending.promise, this.pending = new he(), this.pending.promise.catch((t) => {
      }), await this.operation(), this.pending.resolve(), await this.pending.promise, this.process(!0).catch(() => {
      });
    } catch (t) {
      this.retryPolicy(t) ? this.process(!1).catch(() => {
      }) : this.stop();
    }
  }
  getNextRun(e) {
    if (e)
      return this.nextErrorWaitInterval = this.lowerBound, this.getWaitDuration();
    {
      const t = this.nextErrorWaitInterval;
      return this.nextErrorWaitInterval *= 2, this.nextErrorWaitInterval > this.upperBound && (this.nextErrorWaitInterval = this.upperBound), t;
    }
  }
}
function Gh(n) {
  return new Promise((e) => {
    setTimeout(e, n);
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
const zh = {
  "already-initialized": "You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.",
  "use-before-activation": "App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.",
  "fetch-network-error": "Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.",
  "fetch-parse-error": "Fetch client could not parse response. Original error: {$originalErrorMessage}.",
  "fetch-status-error": "Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.",
  "storage-open": "Error thrown when opening storage. Original error: {$originalErrorMessage}.",
  "storage-get": "Error thrown when reading from storage. Original error: {$originalErrorMessage}.",
  "storage-set": "Error thrown when writing to storage. Original error: {$originalErrorMessage}.",
  "recaptcha-error": "ReCAPTCHA error.",
  "initial-throttle": "{$httpStatus} error. Attempts allowed again after {$time}",
  throttled: "Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"
}, F = new rt("appCheck", "AppCheck", zh);
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
function js(n = !1) {
  var e;
  return n ? (e = self.grecaptcha) == null ? void 0 : e.enterprise : self.grecaptcha;
}
function Xn(n) {
  if (!R(n).activated)
    throw F.create("use-before-activation", {
      appName: n.name
    });
}
function Cr(n) {
  const e = Math.round(n / 1e3), t = Math.floor(e / (3600 * 24)), s = Math.floor((e - t * 3600 * 24) / 3600), i = Math.floor((e - t * 3600 * 24 - s * 3600) / 60), r = e - t * 3600 * 24 - s * 3600 - i * 60;
  let o = "";
  return t && (o += ut(t) + "d:"), s && (o += ut(s) + "h:"), o += ut(i) + "m:" + ut(r) + "s", o;
}
function ut(n) {
  return n === 0 ? "00" : n >= 10 ? n.toString() : "0" + n;
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
async function Jn({ url: n, body: e }, t) {
  const s = {
    "Content-Type": "application/json"
  }, i = t.getImmediate({
    optional: !0
  });
  if (i) {
    const h = await i.getHeartbeatsHeader();
    h && (s["X-Firebase-Client"] = h);
  }
  const r = {
    method: "POST",
    body: JSON.stringify(e),
    headers: s
  };
  let o;
  try {
    o = await fetch(n, r);
  } catch (h) {
    throw F.create("fetch-network-error", {
      originalErrorMessage: h == null ? void 0 : h.message
    });
  }
  if (o.status !== 200)
    throw F.create("fetch-status-error", {
      httpStatus: o.status
    });
  let a;
  try {
    a = await o.json();
  } catch (h) {
    throw F.create("fetch-parse-error", {
      originalErrorMessage: h == null ? void 0 : h.message
    });
  }
  const l = a.ttl.match(/^([\d.]+)(s)$/);
  if (!l || !l[2] || isNaN(Number(l[1])))
    throw F.create("fetch-parse-error", {
      originalErrorMessage: `ttl field (timeToLive) is not in standard Protobuf Duration format: ${a.ttl}`
    });
  const c = Number(l[1]) * 1e3, u = Date.now();
  return {
    token: a.token,
    expireTimeMillis: u + c,
    issuedAtTimeMillis: u
  };
}
function Yh(n, e) {
  const { projectId: t, appId: s, apiKey: i } = n.options;
  return {
    url: `${br}/projects/${t}/apps/${s}:${Kh}?key=${i}`,
    body: {
      recaptcha_v3_token: e
    }
  };
}
function Er(n, e) {
  const { projectId: t, appId: s, apiKey: i } = n.options;
  return {
    url: `${br}/projects/${t}/apps/${s}:${Vh}?key=${i}`,
    body: {
      // eslint-disable-next-line
      debug_token: e
    }
  };
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
const Qh = "firebase-app-check-database", Xh = 1, nt = "firebase-app-check-store", vr = "debug-token";
let dt = null;
function Tr() {
  return dt || (dt = new Promise((n, e) => {
    try {
      const t = indexedDB.open(Qh, Xh);
      t.onsuccess = (s) => {
        n(s.target.result);
      }, t.onerror = (s) => {
        var i;
        e(F.create("storage-open", {
          originalErrorMessage: (i = s.target.error) == null ? void 0 : i.message
        }));
      }, t.onupgradeneeded = (s) => {
        const i = s.target.result;
        switch (s.oldVersion) {
          case 0:
            i.createObjectStore(nt, {
              keyPath: "compositeKey"
            });
        }
      };
    } catch (t) {
      e(F.create("storage-open", {
        originalErrorMessage: t == null ? void 0 : t.message
      }));
    }
  }), dt);
}
function Jh(n) {
  return Ir(kr(n));
}
function Zh(n, e) {
  return Sr(kr(n), e);
}
function eu(n) {
  return Sr(vr, n);
}
function tu() {
  return Ir(vr);
}
async function Sr(n, e) {
  const s = (await Tr()).transaction(nt, "readwrite"), r = s.objectStore(nt).put({
    compositeKey: n,
    value: e
  });
  return new Promise((o, a) => {
    r.onsuccess = (l) => {
      o();
    }, s.onerror = (l) => {
      var c;
      a(F.create("storage-set", {
        originalErrorMessage: (c = l.target.error) == null ? void 0 : c.message
      }));
    };
  });
}
async function Ir(n) {
  const t = (await Tr()).transaction(nt, "readonly"), i = t.objectStore(nt).get(n);
  return new Promise((r, o) => {
    i.onsuccess = (a) => {
      const l = a.target.result;
      r(l ? l.value : void 0);
    }, t.onerror = (a) => {
      var l;
      o(F.create("storage-get", {
        originalErrorMessage: (l = a.target.error) == null ? void 0 : l.message
      }));
    };
  });
}
function kr(n) {
  return `${n.options.appId}-${n.name}`;
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
const ae = new Fn("@firebase/app-check");
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
async function nu(n) {
  if (Mt()) {
    let e;
    try {
      e = await Jh(n);
    } catch (t) {
      ae.warn(`Failed to read token from IndexedDB. Error: ${t}`);
    }
    return e;
  }
}
function rn(n, e) {
  return Mt() ? Zh(n, e).catch((t) => {
    ae.warn(`Failed to write token to IndexedDB. Error: ${t}`);
  }) : Promise.resolve();
}
async function su() {
  let n;
  try {
    n = await tu();
  } catch {
  }
  if (n)
    return n;
  {
    const e = crypto.randomUUID();
    return eu(e).catch((t) => ae.warn(`Failed to persist debug token to IndexedDB. Error: ${t}`)), e;
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
function Zn() {
  return Ut().enabled;
}
async function es() {
  const n = Ut();
  if (n.enabled && n.token)
    return n.token.promise;
  throw Error(`
            Can't get debug token in production mode.
        `);
}
function iu() {
  const n = Fi(), e = Ut();
  if (e.initialized = !0, typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN != "string" && n.FIREBASE_APPCHECK_DEBUG_TOKEN !== !0)
    return;
  e.enabled = !0;
  const t = new he();
  e.token = t, typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN == "string" ? t.resolve(n.FIREBASE_APPCHECK_DEBUG_TOKEN) : t.resolve(su());
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
const ru = { error: "UNKNOWN_ERROR" };
function ou(n) {
  return Ot.encodeString(
    JSON.stringify(n),
    /* webSafe= */
    !1
  );
}
async function En(n, e = !1, t = !1) {
  const s = n.app;
  Xn(s);
  const i = R(s);
  let r = i.token, o;
  if (r && !Ae(r) && (i.token = void 0, r = void 0), !r) {
    const c = await i.cachedTokenPromise;
    c && (Ae(c) ? r = c : await rn(s, void 0));
  }
  if (!e && r && Ae(r))
    return {
      token: r.token
    };
  let a = !1;
  if (Zn())
    try {
      i.exchangeTokenPromise || (i.exchangeTokenPromise = Jn(Er(s, await es()), n.heartbeatServiceProvider).finally(() => {
        i.exchangeTokenPromise = void 0;
      }), a = !0);
      const c = await i.exchangeTokenPromise;
      return await rn(s, c), i.token = c, { token: c.token };
    } catch (c) {
      return c.code === "appCheck/throttled" || c.code === "appCheck/initial-throttle" ? ae.warn(c.message) : t && ae.error(c), on(c);
    }
  try {
    i.exchangeTokenPromise || (i.exchangeTokenPromise = i.provider.getToken().finally(() => {
      i.exchangeTokenPromise = void 0;
    }), a = !0), r = await R(s).exchangeTokenPromise;
  } catch (c) {
    c.code === "appCheck/throttled" || c.code === "appCheck/initial-throttle" ? ae.warn(c.message) : t && ae.error(c), o = c;
  }
  let l;
  return r ? o ? Ae(r) ? l = {
    token: r.token,
    internalError: o
  } : l = on(o) : (l = {
    token: r.token
  }, i.token = r, await rn(s, r)) : l = on(o), a && Nr(s, l), l;
}
async function au(n) {
  const e = n.app;
  Xn(e);
  const { provider: t } = R(e);
  if (Zn()) {
    const s = await es(), { token: i } = await Jn(Er(e, s), n.heartbeatServiceProvider);
    return { token: i };
  } else {
    const { token: s } = await t.getToken();
    return { token: s };
  }
}
function Rr(n, e, t, s) {
  const { app: i } = n, r = R(i), o = {
    next: t,
    error: s,
    type: e
  };
  if (r.tokenObservers = [...r.tokenObservers, o], r.token && Ae(r.token)) {
    const a = r.token;
    Promise.resolve().then(() => {
      t({ token: a.token }), Gs(n);
    }).catch(() => {
    });
  }
  r.cachedTokenPromise.then(() => Gs(n));
}
function Ar(n, e) {
  const t = R(n), s = t.tokenObservers.filter((i) => i.next !== e);
  s.length === 0 && t.tokenRefresher && t.tokenRefresher.isRunning() && t.tokenRefresher.stop(), t.tokenObservers = s;
}
function Gs(n) {
  const { app: e } = n, t = R(e);
  let s = t.tokenRefresher;
  s || (s = cu(n), t.tokenRefresher = s), !s.isRunning() && t.isTokenAutoRefreshEnabled && s.start();
}
function cu(n) {
  const { app: e } = n;
  return new jh(
    // Keep in mind when this fails for any reason other than the ones
    // for which we should retry, it will effectively stop the proactive refresh.
    async () => {
      const t = R(e);
      let s;
      if (t.token ? s = await En(n, !0) : s = await En(n), s.error)
        throw s.error;
      if (s.internalError)
        throw s.internalError;
    },
    () => !0,
    () => {
      const t = R(e);
      if (t.token) {
        let s = t.token.issuedAtTimeMillis + (t.token.expireTimeMillis - t.token.issuedAtTimeMillis) * 0.5 + 3e5;
        const i = t.token.expireTimeMillis - 5 * 60 * 1e3;
        return s = Math.min(s, i), Math.max(0, s - Date.now());
      } else
        return 0;
    },
    qs.RETRIAL_MIN_WAIT,
    qs.RETRIAL_MAX_WAIT
  );
}
function Nr(n, e) {
  const t = R(n).tokenObservers;
  for (const s of t)
    try {
      s.type === "EXTERNAL" && e.error != null ? s.error(e.error) : s.next(e);
    } catch {
    }
}
function Ae(n) {
  return n.expireTimeMillis - Date.now() > 0;
}
function on(n) {
  return {
    token: ou(ru),
    error: n
  };
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
class lu {
  constructor(e, t) {
    this.app = e, this.heartbeatServiceProvider = t;
  }
  _delete() {
    const { tokenObservers: e } = R(this.app);
    for (const t of e)
      Ar(this.app, t.next);
    return Promise.resolve();
  }
}
function hu(n, e) {
  return new lu(n, e);
}
function uu(n) {
  return {
    getToken: (e) => En(n, e),
    getLimitedUseToken: () => au(n),
    addTokenListener: (e) => Rr(n, "INTERNAL", e),
    removeTokenListener: (e) => Ar(n.app, e)
  };
}
const du = "@firebase/app-check", fu = "0.11.0";
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
const pu = "https://www.google.com/recaptcha/api.js";
function _u(n, e) {
  const t = new he(), s = R(n);
  s.reCAPTCHAState = { initialized: t };
  const i = gu(n), r = js(!1);
  return r ? zs(n, e, r, i, t) : wu(() => {
    const o = js(!1);
    if (!o)
      throw new Error("no recaptcha");
    zs(n, e, o, i, t);
  }), t.promise;
}
function zs(n, e, t, s, i) {
  t.ready(() => {
    yu(n, e, t, s), i.resolve(t);
  });
}
function gu(n) {
  const e = `fire_app_check_${n.name}`, t = document.createElement("div");
  return t.id = e, t.style.display = "none", document.body.appendChild(t), e;
}
async function mu(n) {
  Xn(n);
  const t = await R(n).reCAPTCHAState.initialized.promise;
  return new Promise((s, i) => {
    const r = R(n).reCAPTCHAState;
    t.ready(() => {
      s(
        // widgetId is guaranteed to be available if reCAPTCHAState.initialized.promise resolved.
        t.execute(r.widgetId, {
          action: "fire_app_check"
        })
      );
    });
  });
}
function yu(n, e, t, s) {
  const i = t.render(s, {
    sitekey: e,
    size: "invisible",
    // Success callback - set state
    callback: () => {
      R(n).reCAPTCHAState.succeeded = !0;
    },
    // Failure callback - set state
    "error-callback": () => {
      R(n).reCAPTCHAState.succeeded = !1;
    }
  }), r = R(n);
  r.reCAPTCHAState = {
    ...r.reCAPTCHAState,
    // state.reCAPTCHAState is set in the initialize()
    widgetId: i
  };
}
function wu(n) {
  const e = document.createElement("script");
  e.src = pu, e.onload = n, document.head.appendChild(e);
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
class ts {
  /**
   * Create a ReCaptchaV3Provider instance.
   * @param siteKey - ReCAPTCHA V3 siteKey.
   */
  constructor(e) {
    this._siteKey = e, this._throttleData = null;
  }
  /**
   * Returns an App Check token.
   * @internal
   */
  async getToken() {
    var s, i, r;
    Cu(this._throttleData);
    const e = await mu(this._app).catch((o) => {
      throw F.create(
        "recaptcha-error"
        /* AppCheckError.RECAPTCHA_ERROR */
      );
    });
    if (!((s = R(this._app).reCAPTCHAState) != null && s.succeeded))
      throw F.create(
        "recaptcha-error"
        /* AppCheckError.RECAPTCHA_ERROR */
      );
    let t;
    try {
      t = await Jn(Yh(this._app, e), this._heartbeatServiceProvider);
    } catch (o) {
      throw (i = o.code) != null && i.includes("fetch-status-error") ? (this._throttleData = bu(Number((r = o.customData) == null ? void 0 : r.httpStatus), this._throttleData), F.create("initial-throttle", {
        time: Cr(this._throttleData.allowRequestsAfter - Date.now()),
        httpStatus: this._throttleData.httpStatus
      })) : o;
    }
    return this._throttleData = null, t;
  }
  /**
   * @internal
   */
  initialize(e) {
    this._app = e, this._heartbeatServiceProvider = Ue(e, "heartbeat"), _u(e, this._siteKey).catch(() => {
    });
  }
  /**
   * @internal
   */
  isEqual(e) {
    return e instanceof ts ? this._siteKey === e._siteKey : !1;
  }
}
function bu(n, e) {
  if (n === 404 || n === 403)
    return {
      backoffCount: 1,
      allowRequestsAfter: Date.now() + qh,
      httpStatus: n
    };
  {
    const t = e ? e.backoffCount : 0, s = Sa(t, 1e3, 2);
    return {
      backoffCount: t + 1,
      allowRequestsAfter: Date.now() + s,
      httpStatus: n
    };
  }
}
function Cu(n) {
  if (n && Date.now() - n.allowRequestsAfter <= 0)
    throw F.create("throttled", {
      time: Cr(n.allowRequestsAfter - Date.now()),
      httpStatus: n.httpStatus
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
function Eu(n = Bn(), e) {
  n = Se(n);
  const t = Ue(n, "app-check");
  if (Ut().initialized || iu(), Zn() && es().then((i) => (
    // Not using logger because I don't think we ever want this accidentally hidden.
    console.log(`App Check debug token: ${i}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)
  )), t.isInitialized()) {
    const i = t.getImmediate(), r = t.getOptions();
    if (r.isTokenAutoRefreshEnabled === e.isTokenAutoRefreshEnabled && r.provider.isEqual(e.provider))
      return i;
    throw F.create("already-initialized", {
      appName: n.name
    });
  }
  const s = t.initialize({ options: e });
  return vu(n, e.provider, e.isTokenAutoRefreshEnabled), R(n).isTokenAutoRefreshEnabled && Rr(s, "INTERNAL", () => {
  }), s;
}
function vu(n, e, t = !1) {
  const s = $h(n, { ...wr });
  s.activated = !0, s.provider = e, s.cachedTokenPromise = nu(n).then((i) => (i && Ae(i) && (s.token = i, Nr(n, { token: i.token })), i)), s.isTokenAutoRefreshEnabled = t && n.automaticDataCollectionEnabled, !n.automaticDataCollectionEnabled && t && ae.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."), s.provider.initialize(n);
}
const Tu = "app-check", Ys = "app-check-internal";
function Su() {
  ne(new z(
    Tu,
    (n) => {
      const e = n.getProvider("app").getImmediate(), t = n.getProvider("heartbeat");
      return hu(e, t);
    },
    "PUBLIC"
    /* ComponentType.PUBLIC */
  ).setInstantiationMode(
    "EXPLICIT"
    /* InstantiationMode.EXPLICIT */
  ).setInstanceCreatedCallback((n, e, t) => {
    n.getProvider(Ys).initialize();
  })), ne(new z(
    Ys,
    (n) => {
      const e = n.getProvider("app-check").getImmediate();
      return uu(e);
    },
    "PUBLIC"
    /* ComponentType.PUBLIC */
  ).setInstantiationMode(
    "EXPLICIT"
    /* InstantiationMode.EXPLICIT */
  )), Z(du, fu);
}
Su();
const Qs = "@firebase/database", Xs = "1.1.0";
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
let Dr = "";
function Iu(n) {
  Dr = n;
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
class ku {
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
    t == null ? this.domStorage_.removeItem(this.prefixedName_(e)) : this.domStorage_.setItem(this.prefixedName_(e), M(t));
  }
  /**
   * @returns The value that was stored under this key, or null
   */
  get(e) {
    const t = this.domStorage_.getItem(this.prefixedName_(e));
    return t == null ? null : et(t);
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
class Ru {
  constructor() {
    this.cache_ = {}, this.isInMemoryStorage = !0;
  }
  set(e, t) {
    t == null ? delete this.cache_[e] : this.cache_[e] = t;
  }
  get(e) {
    return re(this.cache_, e) ? this.cache_[e] : null;
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
const Or = function(n) {
  try {
    if (typeof window < "u" && typeof window[n] < "u") {
      const e = window[n];
      return e.setItem("firebase:sentinel", "cache"), e.removeItem("firebase:sentinel"), new ku(e);
    }
  } catch {
  }
  return new Ru();
}, me = Or("localStorage"), Au = Or("sessionStorage");
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
const De = new Fn("@firebase/database"), Nu = /* @__PURE__ */ function() {
  let n = 1;
  return function() {
    return n++;
  };
}(), Mr = function(n) {
  const e = ba(n), t = new wa();
  t.update(e);
  const s = t.digest();
  return Ot.encodeByteArray(s);
}, ot = function(...n) {
  let e = "";
  for (let t = 0; t < n.length; t++) {
    const s = n[t];
    Array.isArray(s) || s && typeof s == "object" && // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof s.length == "number" ? e += ot.apply(null, s) : typeof s == "object" ? e += M(s) : e += s, e += " ";
  }
  return e;
};
let Qe = null, Js = !0;
const Du = function(n, e) {
  f(!0, "Can't turn on custom loggers persistently."), De.logLevel = v.VERBOSE, Qe = De.log.bind(De);
}, P = function(...n) {
  if (Js === !0 && (Js = !1, Qe === null && Au.get("logging_enabled") === !0 && Du()), Qe) {
    const e = ot.apply(null, n);
    Qe(e);
  }
}, at = function(n) {
  return function(...e) {
    P(n, ...e);
  };
}, vn = function(...n) {
  const e = "FIREBASE INTERNAL ERROR: " + ot(...n);
  De.error(e);
}, se = function(...n) {
  const e = `FIREBASE FATAL ERROR: ${ot(...n)}`;
  throw De.error(e), new Error(e);
}, W = function(...n) {
  const e = "FIREBASE WARNING: " + ot(...n);
  De.warn(e);
}, Ou = function() {
  typeof window < "u" && window.location && window.location.protocol && window.location.protocol.indexOf("https:") !== -1 && W("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");
}, Pr = function(n) {
  return typeof n == "number" && (n !== n || // NaN
  n === Number.POSITIVE_INFINITY || n === Number.NEGATIVE_INFINITY);
}, Mu = function(n) {
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
}, Pe = "[MIN_NAME]", Ee = "[MAX_NAME]", Be = function(n, e) {
  if (n === e)
    return 0;
  if (n === Pe || e === Ee)
    return -1;
  if (e === Pe || n === Ee)
    return 1;
  {
    const t = Zs(n), s = Zs(e);
    return t !== null ? s !== null ? t - s === 0 ? n.length - e.length : t - s : -1 : s !== null ? 1 : n < e ? -1 : 1;
  }
}, Pu = function(n, e) {
  return n === e ? 0 : n < e ? -1 : 1;
}, Ve = function(n, e) {
  if (e && n in e)
    return e[n];
  throw new Error("Missing required key (" + n + ") in object: " + M(e));
}, ns = function(n) {
  if (typeof n != "object" || n === null)
    return M(n);
  const e = [];
  for (const s in n)
    e.push(s);
  e.sort();
  let t = "{";
  for (let s = 0; s < e.length; s++)
    s !== 0 && (t += ","), t += M(e[s]), t += ":", t += ns(n[e[s]]);
  return t += "}", t;
}, xr = function(n, e) {
  const t = n.length;
  if (t <= e)
    return [n];
  const s = [];
  for (let i = 0; i < t; i += e)
    i + e > t ? s.push(n.substring(i, t)) : s.push(n.substring(i, i + e));
  return s;
};
function $(n, e) {
  for (const t in n)
    n.hasOwnProperty(t) && e(t, n[t]);
}
const Lr = function(n) {
  f(!Pr(n), "Invalid JSON number");
  const e = 11, t = 52, s = (1 << e - 1) - 1;
  let i, r, o, a, l;
  n === 0 ? (r = 0, o = 0, i = 1 / n === -1 / 0 ? 1 : 0) : (i = n < 0, n = Math.abs(n), n >= Math.pow(2, 1 - s) ? (a = Math.min(Math.floor(Math.log(n) / Math.LN2), s), r = a + s, o = Math.round(n * Math.pow(2, t - a) - Math.pow(2, t))) : (r = 0, o = Math.round(n / Math.pow(2, 1 - s - t))));
  const c = [];
  for (l = t; l; l -= 1)
    c.push(o % 2 ? 1 : 0), o = Math.floor(o / 2);
  for (l = e; l; l -= 1)
    c.push(r % 2 ? 1 : 0), r = Math.floor(r / 2);
  c.push(i ? 1 : 0), c.reverse();
  const u = c.join("");
  let h = "";
  for (l = 0; l < 64; l += 8) {
    let d = parseInt(u.substr(l, 8), 2).toString(16);
    d.length === 1 && (d = "0" + d), h = h + d;
  }
  return h.toLowerCase();
}, xu = function() {
  return !!(typeof window == "object" && window.chrome && window.chrome.extension && !/^chrome/.test(window.location.href));
}, Lu = function() {
  return typeof Windows == "object" && typeof Windows.UI == "object";
}, Fu = new RegExp("^-?(0*)\\d{1,10}$"), Uu = -2147483648, Bu = 2147483647, Zs = function(n) {
  if (Fu.test(n)) {
    const e = Number(n);
    if (e >= Uu && e <= Bu)
      return e;
  }
  return null;
}, We = function(n) {
  try {
    n();
  } catch (e) {
    setTimeout(() => {
      const t = e.stack || "";
      throw W("Exception was thrown by user callback.", t), e;
    }, Math.floor(0));
  }
}, Wu = function() {
  return (typeof window == "object" && window.navigator && window.navigator.userAgent || "").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i) >= 0;
}, Xe = function(n, e) {
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
class Hu {
  constructor(e, t) {
    this.appCheckProvider = t, this.appName = e.name, Cc(e) && e.settings.appCheckToken && (this.serverAppAppCheckToken = e.settings.appCheckToken), this.appCheck = t == null ? void 0 : t.getImmediate({ optional: !0 }), this.appCheck || t == null || t.get().then((s) => this.appCheck = s);
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
    W(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`);
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
class $u {
  constructor(e, t, s) {
    this.appName_ = e, this.firebaseOptions_ = t, this.authProvider_ = s, this.auth_ = null, this.auth_ = s.getImmediate({ optional: !0 }), this.auth_ || s.onInit((i) => this.auth_ = i);
  }
  getToken(e) {
    return this.auth_ ? this.auth_.getToken(e).catch((t) => t && t.code === "auth/token-not-initialized" ? (P("Got auth/token-not-initialized error.  Treating as null token."), null) : Promise.reject(t)) : new Promise((t, s) => {
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
    "credential" in this.firebaseOptions_ ? e += 'Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.' : "serviceAccount" in this.firebaseOptions_ ? e += 'Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.' : e += 'Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.', W(e);
  }
}
class _t {
  constructor(e) {
    this.accessToken = e;
  }
  getToken(e) {
    return Promise.resolve({
      accessToken: this.accessToken
    });
  }
  addTokenChangeListener(e) {
    e(this.accessToken);
  }
  removeTokenChangeListener(e) {
  }
  notifyForInvalidToken() {
  }
}
_t.OWNER = "owner";
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
const ss = "5", Fr = "v", Ur = "s", Br = "r", Wr = "f", Hr = /(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/, $r = "ls", Kr = "p", Tn = "ac", Vr = "websocket", qr = "long_polling";
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
class jr {
  /**
   * @param host - Hostname portion of the url for the repo
   * @param secure - Whether or not this repo is accessed over ssl
   * @param namespace - The namespace represented by the repo
   * @param webSocketOnly - Whether to prefer websockets over all other transports (used by Nest).
   * @param nodeAdmin - Whether this instance uses Admin SDK credentials
   * @param persistenceKey - Override the default session persistence storage key
   */
  constructor(e, t, s, i, r = !1, o = "", a = !1, l = !1, c = null) {
    this.secure = t, this.namespace = s, this.webSocketOnly = i, this.nodeAdmin = r, this.persistenceKey = o, this.includeNamespaceInQueryParams = a, this.isUsingEmulator = l, this.emulatorOptions = c, this._host = e.toLowerCase(), this._domain = this._host.substr(this._host.indexOf(".") + 1), this.internalHost = me.get("host:" + e) || this._host;
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
    e !== this.internalHost && (this.internalHost = e, this.isCacheableHost() && me.set("host:" + this._host, this.internalHost));
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
function Ku(n) {
  return n.host !== n.internalHost || n.isCustomHost() || n.includeNamespaceInQueryParams;
}
function Gr(n, e, t) {
  f(typeof e == "string", "typeof type must == string"), f(typeof t == "object", "typeof params must == object");
  let s;
  if (e === Vr)
    s = (n.secure ? "wss://" : "ws://") + n.internalHost + "/.ws?";
  else if (e === qr)
    s = (n.secure ? "https://" : "http://") + n.internalHost + "/.lp?";
  else
    throw new Error("Unknown connection type: " + e);
  Ku(n) && (t.ns = n.namespace);
  const i = [];
  return $(t, (r, o) => {
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
class Vu {
  constructor() {
    this.counters_ = {};
  }
  incrementCounter(e, t = 1) {
    re(this.counters_, e) || (this.counters_[e] = 0), this.counters_[e] += t;
  }
  get() {
    return Jo(this.counters_);
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
const an = {}, cn = {};
function is(n) {
  const e = n.toString();
  return an[e] || (an[e] = new Vu()), an[e];
}
function qu(n, e) {
  const t = n.toString();
  return cn[t] || (cn[t] = e()), cn[t];
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
class ju {
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
        s[i] && We(() => {
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
const ei = "start", Gu = "close", zu = "pLPCommand", Yu = "pRTLPCB", zr = "id", Yr = "pw", Qr = "ser", Qu = "cb", Xu = "seg", Ju = "ts", Zu = "d", ed = "dframe", Xr = 1870, Jr = 30, td = Xr - Jr, nd = 25e3, sd = 3e4;
class Ne {
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
    this.connId = e, this.repoInfo = t, this.applicationId = s, this.appCheckToken = i, this.authToken = r, this.transportSessionId = o, this.lastSessionId = a, this.bytesSent = 0, this.bytesReceived = 0, this.everConnected_ = !1, this.log_ = at(e), this.stats_ = is(t), this.urlFn = (l) => (this.appCheckToken && (l[Tn] = this.appCheckToken), Gr(t, qr, l));
  }
  /**
   * @param onMessage - Callback when messages arrive
   * @param onDisconnect - Callback with connection lost.
   */
  open(e, t) {
    this.curSegmentNum = 0, this.onDisconnect_ = t, this.myPacketOrderer = new ju(e), this.isClosed_ = !1, this.connectTimeoutTimer_ = setTimeout(() => {
      this.log_("Timed out trying to connect."), this.onClosed_(), this.connectTimeoutTimer_ = null;
    }, Math.floor(sd)), Mu(() => {
      if (this.isClosed_)
        return;
      this.scriptTagHolder = new rs((...r) => {
        const [o, a, l, c, u] = r;
        if (this.incrementIncomingBytes_(r), !!this.scriptTagHolder)
          if (this.connectTimeoutTimer_ && (clearTimeout(this.connectTimeoutTimer_), this.connectTimeoutTimer_ = null), this.everConnected_ = !0, o === ei)
            this.id = a, this.password = l;
          else if (o === Gu)
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
      s[ei] = "t", s[Qr] = Math.floor(Math.random() * 1e8), this.scriptTagHolder.uniqueCallbackIdentifier && (s[Qu] = this.scriptTagHolder.uniqueCallbackIdentifier), s[Fr] = ss, this.transportSessionId && (s[Ur] = this.transportSessionId), this.lastSessionId && (s[$r] = this.lastSessionId), this.applicationId && (s[Kr] = this.applicationId), this.appCheckToken && (s[Tn] = this.appCheckToken), typeof location < "u" && location.hostname && Hr.test(location.hostname) && (s[Br] = Wr);
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
    Ne.forceAllow_ = !0;
  }
  /**
   * Forces longpolling to not be considered as a potential transport
   */
  static forceDisallow() {
    Ne.forceDisallow_ = !0;
  }
  // Static method, use string literal so it can be accessed in a generic way
  static isAvailable() {
    return Ne.forceAllow_ ? !0 : !Ne.forceDisallow_ && typeof document < "u" && document.createElement != null && !xu() && !Lu();
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
    const t = M(e);
    this.bytesSent += t.length, this.stats_.incrementCounter("bytes_sent", t.length);
    const s = xi(t), i = xr(s, td);
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
    s[ed] = "t", s[zr] = e, s[Yr] = t, this.myDisconnFrame.src = this.urlFn(s), this.myDisconnFrame.style.display = "none", document.body.appendChild(this.myDisconnFrame);
  }
  /**
   * Used to track the bytes received by this client
   */
  incrementIncomingBytes_(e) {
    const t = M(e).length;
    this.bytesReceived += t, this.stats_.incrementCounter("bytes_received", t);
  }
}
class rs {
  /**
   * @param commandCB - The callback to be called when control commands are received from the server.
   * @param onMessageCB - The callback to be triggered when responses arrive from the server.
   * @param onDisconnect - The callback to be triggered when this tag holder is closed
   * @param urlFn - A function that provides the URL of the endpoint to send data to.
   */
  constructor(e, t, s, i) {
    this.onDisconnect = s, this.urlFn = i, this.outstandingRequests = /* @__PURE__ */ new Set(), this.pendingSegs = [], this.currentSerial = Math.floor(Math.random() * 1e8), this.sendNewPolls = !0;
    {
      this.uniqueCallbackIdentifier = Nu(), window[zu + this.uniqueCallbackIdentifier] = e, window[Yu + this.uniqueCallbackIdentifier] = t, this.myIFrame = rs.createIFrame_();
      let r = "";
      this.myIFrame.src && this.myIFrame.src.substr(0, 11) === "javascript:" && (r = '<script>document.domain="' + document.domain + '";<\/script>');
      const o = "<html><body>" + r + "</body></html>";
      try {
        this.myIFrame.doc.open(), this.myIFrame.doc.write(o), this.myIFrame.doc.close();
      } catch (a) {
        P("frame writing exception"), a.stack && P(a.stack), P(a);
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
        e.contentWindow.document || P("No IE domain setting required");
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
      e[zr] = this.myID, e[Yr] = this.myPW, e[Qr] = this.currentSerial;
      let t = this.urlFn(e), s = "", i = 0;
      for (; this.pendingSegs.length > 0 && this.pendingSegs[0].d.length + Jr + s.length <= Xr; ) {
        const o = this.pendingSegs.shift();
        s = s + "&" + Xu + i + "=" + o.seg + "&" + Ju + i + "=" + o.ts + "&" + Zu + i + "=" + o.d, i++;
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
    }, i = setTimeout(s, Math.floor(nd)), r = () => {
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
          P("Long-poll script failed to load: " + e), this.sendNewPolls = !1, this.close();
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
const id = 16384, rd = 45e3;
let Tt = null;
typeof MozWebSocket < "u" ? Tt = MozWebSocket : typeof WebSocket < "u" && (Tt = WebSocket);
class K {
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
    this.connId = e, this.applicationId = s, this.appCheckToken = i, this.authToken = r, this.keepaliveTimer = null, this.frames = null, this.totalFrames = 0, this.bytesSent = 0, this.bytesReceived = 0, this.log_ = at(this.connId), this.stats_ = is(t), this.connURL = K.connectionURL_(t, o, a, i, s), this.nodeAdmin = t.nodeAdmin;
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
    return o[Fr] = ss, typeof location < "u" && location.hostname && Hr.test(location.hostname) && (o[Br] = Wr), t && (o[Ur] = t), s && (o[$r] = s), i && (o[Tn] = i), r && (o[Kr] = r), Gr(e, Vr, o);
  }
  /**
   * @param onMessage - Callback when messages arrive
   * @param onDisconnect - Callback with connection lost.
   */
  open(e, t) {
    this.onDisconnect = t, this.onMessage = e, this.log_("Websocket connecting to " + this.connURL), this.everConnected_ = !1, me.set("previous_websocket_failure", !0);
    try {
      let s;
      da(), this.mySock = new Tt(this.connURL, [], s);
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
    K.forceDisallow_ = !0;
  }
  static isAvailable() {
    let e = !1;
    if (typeof navigator < "u" && navigator.userAgent) {
      const t = /Android ([0-9]{0,}\.[0-9]{0,})/, s = navigator.userAgent.match(t);
      s && s.length > 1 && parseFloat(s[1]) < 4.4 && (e = !0);
    }
    return !e && Tt !== null && !K.forceDisallow_;
  }
  /**
   * Returns true if we previously failed to connect with this transport.
   */
  static previouslyFailed() {
    return me.isInMemoryStorage || me.get("previous_websocket_failure") === !0;
  }
  markConnectionHealthy() {
    me.remove("previous_websocket_failure");
  }
  appendFrame_(e) {
    if (this.frames.push(e), this.frames.length === this.totalFrames) {
      const t = this.frames.join("");
      this.frames = null;
      const s = et(t);
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
    const t = M(e);
    this.bytesSent += t.length, this.stats_.incrementCounter("bytes_sent", t.length);
    const s = xr(t, id);
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
    }, Math.floor(rd));
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
K.responsesRequiredToBeHealthy = 2;
K.healthyTimeout = 3e4;
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
class st {
  static get ALL_TRANSPORTS() {
    return [Ne, K];
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
    const t = K && K.isAvailable();
    let s = t && !K.previouslyFailed();
    if (e.webSocketOnly && (t || W("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."), s = !0), s)
      this.transports_ = [K];
    else {
      const i = this.transports_ = [];
      for (const r of st.ALL_TRANSPORTS)
        r && r.isAvailable() && i.push(r);
      st.globalTransportInitialized_ = !0;
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
st.globalTransportInitialized_ = !1;
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
const od = 6e4, ad = 5e3, cd = 10 * 1024, ld = 100 * 1024, ln = "t", ti = "d", hd = "s", ni = "r", ud = "e", si = "o", ii = "a", ri = "n", oi = "p", dd = "h";
class fd {
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
  constructor(e, t, s, i, r, o, a, l, c, u) {
    this.id = e, this.repoInfo_ = t, this.applicationId_ = s, this.appCheckToken_ = i, this.authToken_ = r, this.onMessage_ = o, this.onReady_ = a, this.onDisconnect_ = l, this.onKill_ = c, this.lastSessionId = u, this.connectionCount = 0, this.pendingDataMessages = [], this.state_ = 0, this.log_ = at("c:" + this.id + ":"), this.transportManager_ = new st(t), this.log_("Connection created"), this.start_();
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
    i > 0 && (this.healthyTimeout_ = Xe(() => {
      this.healthyTimeout_ = null, this.isHealthy_ || (this.conn_ && this.conn_.bytesReceived > ld ? (this.log_("Connection exceeded healthy timeout but has received " + this.conn_.bytesReceived + " bytes.  Marking connection healthy."), this.isHealthy_ = !0, this.conn_.markConnectionHealthy()) : this.conn_ && this.conn_.bytesSent > cd ? this.log_("Connection exceeded healthy timeout but has sent " + this.conn_.bytesSent + " bytes.  Leaving connection alive.") : (this.log_("Closing unhealthy connection after timeout."), this.close()));
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
    if (ln in e) {
      const t = e[ln];
      t === ii ? this.upgradeIfSecondaryHealthy_() : t === ni ? (this.log_("Got a reset on secondary, closing it"), this.secondaryConn_.close(), (this.tx_ === this.secondaryConn_ || this.rx_ === this.secondaryConn_) && this.close()) : t === si && (this.log_("got pong on secondary."), this.secondaryResponsesRequired_--, this.upgradeIfSecondaryHealthy_());
    }
  }
  onSecondaryMessageReceived_(e) {
    const t = Ve("t", e), s = Ve("d", e);
    if (t === "c")
      this.onSecondaryControl_(s);
    else if (t === "d")
      this.pendingDataMessages.push(s);
    else
      throw new Error("Unknown protocol layer: " + t);
  }
  upgradeIfSecondaryHealthy_() {
    this.secondaryResponsesRequired_ <= 0 ? (this.log_("Secondary connection is healthy."), this.isHealthy_ = !0, this.secondaryConn_.markConnectionHealthy(), this.proceedWithUpgrade_()) : (this.log_("sending ping on secondary."), this.secondaryConn_.send({ t: "c", d: { t: oi, d: {} } }));
  }
  proceedWithUpgrade_() {
    this.secondaryConn_.start(), this.log_("sending client ack on secondary"), this.secondaryConn_.send({ t: "c", d: { t: ii, d: {} } }), this.log_("Ending transmission on primary"), this.conn_.send({ t: "c", d: { t: ri, d: {} } }), this.tx_ = this.secondaryConn_, this.tryCleanupConnection();
  }
  onPrimaryMessageReceived_(e) {
    const t = Ve("t", e), s = Ve("d", e);
    t === "c" ? this.onControl_(s) : t === "d" && this.onDataMessage_(s);
  }
  onDataMessage_(e) {
    this.onPrimaryResponse_(), this.onMessage_(e);
  }
  onPrimaryResponse_() {
    this.isHealthy_ || (this.primaryResponsesRequired_--, this.primaryResponsesRequired_ <= 0 && (this.log_("Primary connection is healthy."), this.isHealthy_ = !0, this.conn_.markConnectionHealthy()));
  }
  onControl_(e) {
    const t = Ve(ln, e);
    if (ti in e) {
      const s = e[ti];
      if (t === dd) {
        const i = {
          ...s
        };
        this.repoInfo_.isUsingEmulator && (i.h = this.repoInfo_.host), this.onHandshake_(i);
      } else if (t === ri) {
        this.log_("recvd end transmission on primary"), this.rx_ = this.secondaryConn_;
        for (let i = 0; i < this.pendingDataMessages.length; ++i)
          this.onDataMessage_(this.pendingDataMessages[i]);
        this.pendingDataMessages = [], this.tryCleanupConnection();
      } else t === hd ? this.onConnectionShutdown_(s) : t === ni ? this.onReset_(s) : t === ud ? vn("Server Error: " + s) : t === si ? (this.log_("got pong on primary."), this.onPrimaryResponse_(), this.sendPingOnPrimaryIfNecessary_()) : vn("Unknown control packet command: " + t);
    }
  }
  /**
   * @param handshake - The handshake data returned from the server
   */
  onHandshake_(e) {
    const t = e.ts, s = e.v, i = e.h;
    this.sessionId = e.s, this.repoInfo_.host = i, this.state_ === 0 && (this.conn_.start(), this.onConnectionEstablished_(this.conn_, t), ss !== s && W("Protocol version mismatch detected"), this.tryStartUpgrade_());
  }
  tryStartUpgrade_() {
    const e = this.transportManager_.upgradeTransport();
    e && this.startUpgrade_(e);
  }
  startUpgrade_(e) {
    this.secondaryConn_ = new e(this.nextTransportId_(), this.repoInfo_, this.applicationId_, this.appCheckToken_, this.authToken_, this.sessionId), this.secondaryResponsesRequired_ = e.responsesRequiredToBeHealthy || 0;
    const t = this.connReceiver_(this.secondaryConn_), s = this.disconnReceiver_(this.secondaryConn_);
    this.secondaryConn_.open(t, s), Xe(() => {
      this.secondaryConn_ && (this.log_("Timed out trying to upgrade."), this.secondaryConn_.close());
    }, Math.floor(od));
  }
  onReset_(e) {
    this.log_("Reset packet received.  New host: " + e), this.repoInfo_.host = e, this.state_ === 1 ? this.close() : (this.closeConnections_(), this.start_());
  }
  onConnectionEstablished_(e, t) {
    this.log_("Realtime connection established."), this.conn_ = e, this.state_ = 1, this.onReady_ && (this.onReady_(t, this.sessionId), this.onReady_ = null), this.primaryResponsesRequired_ === 0 ? (this.log_("Primary connection is healthy."), this.isHealthy_ = !0) : Xe(() => {
      this.sendPingOnPrimaryIfNecessary_();
    }, Math.floor(ad));
  }
  sendPingOnPrimaryIfNecessary_() {
    !this.isHealthy_ && this.state_ === 1 && (this.log_("sending ping on primary."), this.sendData_({ t: "c", d: { t: oi, d: {} } }));
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
    this.conn_ = null, !e && this.state_ === 0 ? (this.log_("Realtime connection failed."), this.repoInfo_.isCacheableHost() && (me.remove("host:" + this.repoInfo_.host), this.repoInfo_.internalHost = this.repoInfo_.host)) : this.state_ === 1 && this.log_("Realtime connection lost."), this.close();
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
class Zr {
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
class eo {
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
class St extends eo {
  static getInstance() {
    return new St();
  }
  constructor() {
    super(["online"]), this.online_ = !0, typeof window < "u" && typeof window.addEventListener < "u" && !Wi() && (window.addEventListener("online", () => {
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
const ai = 32, ci = 768;
class I {
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
function E() {
  return new I("");
}
function m(n) {
  return n.pieceNum_ >= n.pieces_.length ? null : n.pieces_[n.pieceNum_];
}
function ue(n) {
  return n.pieces_.length - n.pieceNum_;
}
function S(n) {
  let e = n.pieceNum_;
  return e < n.pieces_.length && e++, new I(n.pieces_, e);
}
function to(n) {
  return n.pieceNum_ < n.pieces_.length ? n.pieces_[n.pieces_.length - 1] : null;
}
function pd(n) {
  let e = "";
  for (let t = n.pieceNum_; t < n.pieces_.length; t++)
    n.pieces_[t] !== "" && (e += "/" + encodeURIComponent(String(n.pieces_[t])));
  return e || "/";
}
function no(n, e = 0) {
  return n.pieces_.slice(n.pieceNum_ + e);
}
function so(n) {
  if (n.pieceNum_ >= n.pieces_.length)
    return null;
  const e = [];
  for (let t = n.pieceNum_; t < n.pieces_.length - 1; t++)
    e.push(n.pieces_[t]);
  return new I(e, 0);
}
function k(n, e) {
  const t = [];
  for (let s = n.pieceNum_; s < n.pieces_.length; s++)
    t.push(n.pieces_[s]);
  if (e instanceof I)
    for (let s = e.pieceNum_; s < e.pieces_.length; s++)
      t.push(e.pieces_[s]);
  else {
    const s = e.split("/");
    for (let i = 0; i < s.length; i++)
      s[i].length > 0 && t.push(s[i]);
  }
  return new I(t, 0);
}
function y(n) {
  return n.pieceNum_ >= n.pieces_.length;
}
function H(n, e) {
  const t = m(n), s = m(e);
  if (t === null)
    return e;
  if (t === s)
    return H(S(n), S(e));
  throw new Error("INTERNAL ERROR: innerPath (" + e + ") is not within outerPath (" + n + ")");
}
function io(n, e) {
  if (ue(n) !== ue(e))
    return !1;
  for (let t = n.pieceNum_, s = e.pieceNum_; t <= n.pieces_.length; t++, s++)
    if (n.pieces_[t] !== e.pieces_[s])
      return !1;
  return !0;
}
function V(n, e) {
  let t = n.pieceNum_, s = e.pieceNum_;
  if (ue(n) > ue(e))
    return !1;
  for (; t < n.pieces_.length; ) {
    if (n.pieces_[t] !== e.pieces_[s])
      return !1;
    ++t, ++s;
  }
  return !0;
}
class _d {
  /**
   * @param path - Initial Path.
   * @param errorPrefix_ - Prefix for any error messages.
   */
  constructor(e, t) {
    this.errorPrefix_ = t, this.parts_ = no(e, 0), this.byteLength_ = Math.max(1, this.parts_.length);
    for (let s = 0; s < this.parts_.length; s++)
      this.byteLength_ += Pt(this.parts_[s]);
    ro(this);
  }
}
function gd(n, e) {
  n.parts_.length > 0 && (n.byteLength_ += 1), n.parts_.push(e), n.byteLength_ += Pt(e), ro(n);
}
function md(n) {
  const e = n.parts_.pop();
  n.byteLength_ -= Pt(e), n.parts_.length > 0 && (n.byteLength_ -= 1);
}
function ro(n) {
  if (n.byteLength_ > ci)
    throw new Error(n.errorPrefix_ + "has a key path longer than " + ci + " bytes (" + n.byteLength_ + ").");
  if (n.parts_.length > ai)
    throw new Error(n.errorPrefix_ + "path specified exceeds the maximum depth that can be written (" + ai + ") or object contains a cycle " + _e(n));
}
function _e(n) {
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
class os extends eo {
  static getInstance() {
    return new os();
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
const qe = 1e3, yd = 60 * 5 * 1e3, li = 30 * 1e3, wd = 1.3, bd = 3e4, Cd = "server_kill", hi = 3;
class ee extends Zr {
  /**
   * @param repoInfo_ - Data about the namespace we are connecting to
   * @param applicationId_ - The Firebase App ID for this project
   * @param onDataUpdate_ - A callback for new data from the server
   */
  constructor(e, t, s, i, r, o, a, l) {
    if (super(), this.repoInfo_ = e, this.applicationId_ = t, this.onDataUpdate_ = s, this.onConnectStatus_ = i, this.onServerInfoUpdate_ = r, this.authTokenProvider_ = o, this.appCheckTokenProvider_ = a, this.authOverride_ = l, this.id = ee.nextPersistentConnectionId_++, this.log_ = at("p:" + this.id + ":"), this.interruptReasons_ = {}, this.listens = /* @__PURE__ */ new Map(), this.outstandingPuts_ = [], this.outstandingGets_ = [], this.outstandingPutCount_ = 0, this.outstandingGetCount_ = 0, this.onDisconnectRequestQueue_ = [], this.connected_ = !1, this.reconnectDelay_ = qe, this.maxReconnectDelay_ = yd, this.securityDebugCallback_ = null, this.lastSessionId = null, this.establishConnectionTimer_ = null, this.visible_ = !1, this.requestCBHash_ = {}, this.requestNumber_ = 0, this.realtime_ = null, this.authToken_ = null, this.appCheckToken_ = null, this.forceTokenRefresh_ = !1, this.invalidAuthTokenCount_ = 0, this.invalidAppCheckTokenCount_ = 0, this.firstConnection_ = !0, this.lastConnectionAttemptTime_ = null, this.lastConnectionEstablishedTime_ = null, l)
      throw new Error("Auth override specified in options, but not supported on non Node.js platforms");
    os.getInstance().on("visible", this.onVisible_, this), e.host.indexOf("fblocal") === -1 && St.getInstance().on("online", this.onOnline_, this);
  }
  sendRequest(e, t, s) {
    const i = ++this.requestNumber_, r = { r: i, a: e, b: t };
    this.log_(M(r)), f(this.connected_, "sendRequest call when we're not connected not allowed."), this.realtime_.sendRequest(r), s && (this.requestCBHash_[i] = s);
  }
  get(e) {
    this.initConnection_();
    const t = new he(), i = {
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
      const l = a.d, c = a.s;
      ee.warnOnListenWarnings_(l, t), (this.listens.get(s) && this.listens.get(s).get(i)) === e && (this.log_("listen response", a), c !== "ok" && this.removeListen_(s, i), e.onComplete && e.onComplete(c, l));
    });
  }
  static warnOnListenWarnings_(e, t) {
    if (e && typeof e == "object" && re(e, "w")) {
      const s = Me(e, "w");
      if (Array.isArray(s) && ~s.indexOf("no_index")) {
        const i = '".indexOn": "' + t._queryParams.getIndex().toString() + '"', r = t._path.toString();
        W(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${r} to your security rules for better performance.`);
      }
    }
  }
  refreshAuthToken(e) {
    this.authToken_ = e, this.log_("Auth token refreshed"), this.authToken_ ? this.tryAuth() : this.connected_ && this.sendRequest("unauth", {}, () => {
    }), this.reduceReconnectDelayIfAdminCredential_(e);
  }
  reduceReconnectDelayIfAdminCredential_(e) {
    (e && e.length === 40 || ma(e)) && (this.log_("Admin auth credential detected.  Reducing max reconnect time."), this.maxReconnectDelay_ = li);
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
      const e = this.authToken_, t = ga(e) ? "auth" : "gauth", s = { cred: e };
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
      this.log_("from server: " + M(e));
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
    ) : e === "c" ? this.onListenRevoked_(t.p, t.q) : e === "ac" ? this.onAuthRevoked_(t.s, t.d) : e === "apc" ? this.onAppCheckRevoked_(t.s, t.d) : e === "sd" ? this.onSecurityDebugPacket_(t) : vn("Unrecognized action received from server: " + M(e) + `
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
    e && !this.visible_ && this.reconnectDelay_ === this.maxReconnectDelay_ && (this.log_("Window became visible.  Reducing delay."), this.reconnectDelay_ = qe, this.realtime_ || this.scheduleConnect_(0)), this.visible_ = e;
  }
  onOnline_(e) {
    e ? (this.log_("Browser went online."), this.reconnectDelay_ = qe, this.realtime_ || this.scheduleConnect_(0)) : (this.log_("Browser went offline.  Killing connection."), this.realtime_ && this.realtime_.close());
  }
  onRealtimeDisconnect_() {
    if (this.log_("data client disconnected"), this.connected_ = !1, this.realtime_ = null, this.cancelSentTransactions_(), this.requestCBHash_ = {}, this.shouldReconnect_()) {
      this.visible_ ? this.lastConnectionEstablishedTime_ && ((/* @__PURE__ */ new Date()).getTime() - this.lastConnectionEstablishedTime_ > bd && (this.reconnectDelay_ = qe), this.lastConnectionEstablishedTime_ = null) : (this.log_("Window isn't visible.  Delaying reconnect."), this.reconnectDelay_ = this.maxReconnectDelay_, this.lastConnectionAttemptTime_ = (/* @__PURE__ */ new Date()).getTime());
      const e = Math.max(0, (/* @__PURE__ */ new Date()).getTime() - this.lastConnectionAttemptTime_);
      let t = Math.max(0, this.reconnectDelay_ - e);
      t = Math.random() * t, this.log_("Trying to reconnect in " + t + "ms"), this.scheduleConnect_(t), this.reconnectDelay_ = Math.min(this.maxReconnectDelay_, this.reconnectDelay_ * wd);
    }
    this.onConnectStatus_(!1);
  }
  async establishConnection_() {
    if (this.shouldReconnect_()) {
      this.log_("Making a connection attempt"), this.lastConnectionAttemptTime_ = (/* @__PURE__ */ new Date()).getTime(), this.lastConnectionEstablishedTime_ = null;
      const e = this.onDataMessage_.bind(this), t = this.onReady_.bind(this), s = this.onRealtimeDisconnect_.bind(this), i = this.id + ":" + ee.nextConnectionId_++, r = this.lastSessionId;
      let o = !1, a = null;
      const l = function() {
        a ? a.close() : (o = !0, s());
      }, c = function(h) {
        f(a, "sendRequest call when we're not connected not allowed."), a.sendRequest(h);
      };
      this.realtime_ = {
        close: l,
        sendRequest: c
      };
      const u = this.forceTokenRefresh_;
      this.forceTokenRefresh_ = !1;
      try {
        const [h, d] = await Promise.all([
          this.authTokenProvider_.getToken(u),
          this.appCheckTokenProvider_.getToken(u)
        ]);
        o ? P("getToken() completed but was canceled") : (P("getToken() completed. Creating connection."), this.authToken_ = h && h.accessToken, this.appCheckToken_ = d && d.token, a = new fd(
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
            W(p + " (" + this.repoInfo_.toString() + ")"), this.interrupt(Cd);
          },
          r
        ));
      } catch (h) {
        this.log_("Failed to get token: " + h), o || (this.repoInfo_.nodeAdmin && W(h), l());
      }
    }
  }
  interrupt(e) {
    P("Interrupting connection for reason: " + e), this.interruptReasons_[e] = !0, this.realtime_ ? this.realtime_.close() : (this.establishConnectionTimer_ && (clearTimeout(this.establishConnectionTimer_), this.establishConnectionTimer_ = null), this.connected_ && this.onRealtimeDisconnect_());
  }
  resume(e) {
    P("Resuming connection for reason: " + e), delete this.interruptReasons_[e], Rs(this.interruptReasons_) && (this.reconnectDelay_ = qe, this.realtime_ || this.scheduleConnect_(0));
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
    t ? s = t.map((r) => ns(r)).join("$") : s = "default";
    const i = this.removeListen_(e, s);
    i && i.onComplete && i.onComplete("permission_denied");
  }
  removeListen_(e, t) {
    const s = new I(e).toString();
    let i;
    if (this.listens.has(s)) {
      const r = this.listens.get(s);
      i = r.get(t), r.delete(t), r.size === 0 && this.listens.delete(s);
    } else
      i = void 0;
    return i;
  }
  onAuthRevoked_(e, t) {
    P("Auth token revoked: " + e + "/" + t), this.authToken_ = null, this.forceTokenRefresh_ = !0, this.realtime_.close(), (e === "invalid_token" || e === "permission_denied") && (this.invalidAuthTokenCount_++, this.invalidAuthTokenCount_ >= hi && (this.reconnectDelay_ = li, this.authTokenProvider_.notifyForInvalidToken()));
  }
  onAppCheckRevoked_(e, t) {
    P("App check token revoked: " + e + "/" + t), this.appCheckToken_ = null, this.forceTokenRefresh_ = !0, (e === "invalid_token" || e === "permission_denied") && (this.invalidAppCheckTokenCount_++, this.invalidAppCheckTokenCount_ >= hi && this.appCheckTokenProvider_.notifyForInvalidToken());
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
    e["sdk." + t + "." + Dr.replace(/\./g, "-")] = 1, Wi() ? e["framework.cordova"] = 1 : ua() && (e["framework.reactnative"] = 1), this.reportStats(e);
  }
  shouldReconnect_() {
    const e = St.getInstance().currentlyOnline();
    return Rs(this.interruptReasons_) && e;
  }
}
ee.nextPersistentConnectionId_ = 0;
ee.nextConnectionId_ = 0;
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
class Bt {
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
    const s = new w(Pe, e), i = new w(Pe, t);
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
let ft;
class oo extends Bt {
  static get __EMPTY_NODE() {
    return ft;
  }
  static set __EMPTY_NODE(e) {
    ft = e;
  }
  compare(e, t) {
    return Be(e.name, t.name);
  }
  isDefinedOn(e) {
    throw Le("KeyIndex.isDefinedOn not expected to be called.");
  }
  indexedValueChanged(e, t) {
    return !1;
  }
  minPost() {
    return w.MIN;
  }
  maxPost() {
    return new w(Ee, ft);
  }
  makePost(e, t) {
    return f(typeof e == "string", "KeyIndex indexValue must always be a string."), new w(e, ft);
  }
  /**
   * @returns String representation for inclusion in a query spec
   */
  toString() {
    return ".key";
  }
}
const Oe = new oo();
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
class pt {
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
    this.key = e, this.value = t, this.color = s ?? N.RED, this.left = i ?? U.EMPTY_NODE, this.right = r ?? U.EMPTY_NODE;
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
      return U.EMPTY_NODE;
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
          return U.EMPTY_NODE;
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
class Ed {
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
class U {
  /**
   * @param comparator_ - Key comparator.
   * @param root_ - Optional root node for the map.
   */
  constructor(e, t = U.EMPTY_NODE) {
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
    return new U(this.comparator_, this.root_.insert(e, t, this.comparator_).copy(null, null, N.BLACK, null, null));
  }
  /**
   * Returns a copy of the map, with the specified key removed.
   *
   * @param key - The key to remove.
   * @returns New map, with item removed.
   */
  remove(e) {
    return new U(this.comparator_, this.root_.remove(e, this.comparator_).copy(null, null, N.BLACK, null, null));
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
    return new pt(this.root_, null, this.comparator_, !1, e);
  }
  getIteratorFrom(e, t) {
    return new pt(this.root_, e, this.comparator_, !1, t);
  }
  getReverseIteratorFrom(e, t) {
    return new pt(this.root_, e, this.comparator_, !0, t);
  }
  getReverseIterator(e) {
    return new pt(this.root_, null, this.comparator_, !0, e);
  }
}
U.EMPTY_NODE = new Ed();
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
function vd(n, e) {
  return Be(n.name, e.name);
}
function as(n, e) {
  return Be(n, e);
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
let Sn;
function Td(n) {
  Sn = n;
}
const ao = function(n) {
  return typeof n == "number" ? "number:" + Lr(n) : "string:" + n;
}, co = function(n) {
  if (n.isLeafNode()) {
    const e = n.val();
    f(typeof e == "string" || typeof e == "number" || typeof e == "object" && re(e, ".sv"), "Priority must be a string or number.");
  } else
    f(n === Sn || n.isEmpty(), "priority of unexpected type.");
  f(n === Sn || n.getPriority().isEmpty(), "Priority nodes can't have a priority of their own.");
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
let ui;
class A {
  static set __childrenNodeConstructor(e) {
    ui = e;
  }
  static get __childrenNodeConstructor() {
    return ui;
  }
  /**
   * @param value_ - The value to store in this leaf node. The object type is
   * possible in the event of a deferred value
   * @param priorityNode_ - The priority of this node.
   */
  constructor(e, t = A.__childrenNodeConstructor.EMPTY_NODE) {
    this.value_ = e, this.priorityNode_ = t, this.lazyHash_ = null, f(this.value_ !== void 0 && this.value_ !== null, "LeafNode shouldn't be created with null/undefined value."), co(this.priorityNode_);
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
    return new A(this.value_, e);
  }
  /** @inheritDoc */
  getImmediateChild(e) {
    return e === ".priority" ? this.priorityNode_ : A.__childrenNodeConstructor.EMPTY_NODE;
  }
  /** @inheritDoc */
  getChild(e) {
    return y(e) ? this : m(e) === ".priority" ? this.priorityNode_ : A.__childrenNodeConstructor.EMPTY_NODE;
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
    return e === ".priority" ? this.updatePriority(t) : t.isEmpty() && e !== ".priority" ? this : A.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e, t).updatePriority(this.priorityNode_);
  }
  /** @inheritDoc */
  updateChild(e, t) {
    const s = m(e);
    return s === null ? t : t.isEmpty() && s !== ".priority" ? this : (f(s !== ".priority" || ue(e) === 1, ".priority must be the last token in a path"), this.updateImmediateChild(s, A.__childrenNodeConstructor.EMPTY_NODE.updateChild(S(e), t)));
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
      this.priorityNode_.isEmpty() || (e += "priority:" + ao(this.priorityNode_.val()) + ":");
      const t = typeof this.value_;
      e += t + ":", t === "number" ? e += Lr(this.value_) : e += this.value_, this.lazyHash_ = Mr(e);
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
    return e === A.__childrenNodeConstructor.EMPTY_NODE ? 1 : e instanceof A.__childrenNodeConstructor ? -1 : (f(e.isLeafNode(), "Unknown node type"), this.compareToLeafNode_(e));
  }
  /**
   * Comparison specifically for two leaf nodes
   */
  compareToLeafNode_(e) {
    const t = typeof e.value_, s = typeof this.value_, i = A.VALUE_TYPE_ORDER.indexOf(t), r = A.VALUE_TYPE_ORDER.indexOf(s);
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
A.VALUE_TYPE_ORDER = ["object", "boolean", "number", "string"];
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
let lo, ho;
function Sd(n) {
  lo = n;
}
function Id(n) {
  ho = n;
}
class kd extends Bt {
  compare(e, t) {
    const s = e.node.getPriority(), i = t.node.getPriority(), r = s.compareTo(i);
    return r === 0 ? Be(e.name, t.name) : r;
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
    return new w(Ee, new A("[PRIORITY-POST]", ho));
  }
  makePost(e, t) {
    const s = lo(e);
    return new w(t, new A("[PRIORITY-POST]", s));
  }
  /**
   * @returns String representation for inclusion in a query spec
   */
  toString() {
    return ".priority";
  }
}
const x = new kd();
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
const Rd = Math.log(2);
class Ad {
  constructor(e) {
    const t = (r) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      parseInt(Math.log(r) / Rd, 10)
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
const It = function(n, e, t, s) {
  n.sort(e);
  const i = function(l, c) {
    const u = c - l;
    let h, d;
    if (u === 0)
      return null;
    if (u === 1)
      return h = n[l], d = t ? t(h) : h, new N(d, h.node, N.BLACK, null, null);
    {
      const p = parseInt(u / 2, 10) + l, g = i(l, p), b = i(p + 1, c);
      return h = n[p], d = t ? t(h) : h, new N(d, h.node, N.BLACK, g, b);
    }
  }, r = function(l) {
    let c = null, u = null, h = n.length;
    const d = function(g, b) {
      const D = h - g, de = h;
      h -= g;
      const L = i(D + 1, de), fe = n[D], qt = t ? t(fe) : fe;
      p(new N(qt, fe.node, b, null, L));
    }, p = function(g) {
      c ? (c.left = g, c = g) : (u = g, c = g);
    };
    for (let g = 0; g < l.count; ++g) {
      const b = l.nextBitIsOne(), D = Math.pow(2, l.count - (g + 1));
      b ? d(D, N.BLACK) : (d(D, N.BLACK), d(D, N.RED));
    }
    return u;
  }, o = new Ad(n.length), a = r(o);
  return new U(s || e, a);
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
let hn;
const Re = {};
class X {
  /**
   * The default IndexMap for nodes without a priority
   */
  static get Default() {
    return f(Re && x, "ChildrenNode.ts has not been loaded"), hn = hn || new X({ ".priority": Re }, { ".priority": x }), hn;
  }
  constructor(e, t) {
    this.indexes_ = e, this.indexSet_ = t;
  }
  get(e) {
    const t = Me(this.indexes_, e);
    if (!t)
      throw new Error("No index defined for " + e);
    return t instanceof U ? t : null;
  }
  hasIndex(e) {
    return re(this.indexSet_, e.toString());
  }
  addIndex(e, t) {
    f(e !== Oe, "KeyIndex always exists and isn't meant to be added to the IndexMap.");
    const s = [];
    let i = !1;
    const r = t.getIterator(w.Wrap);
    let o = r.getNext();
    for (; o; )
      i = i || e.isDefinedOn(o.node), s.push(o), o = r.getNext();
    let a;
    i ? a = It(s, e.getCompare()) : a = Re;
    const l = e.toString(), c = { ...this.indexSet_ };
    c[l] = e;
    const u = { ...this.indexes_ };
    return u[l] = a, new X(u, c);
  }
  /**
   * Ensure that this node is properly tracked in any indexes that we're maintaining
   */
  addToIndexes(e, t) {
    const s = mt(this.indexes_, (i, r) => {
      const o = Me(this.indexSet_, r);
      if (f(o, "Missing index implementation for " + r), i === Re)
        if (o.isDefinedOn(e.node)) {
          const a = [], l = t.getIterator(w.Wrap);
          let c = l.getNext();
          for (; c; )
            c.name !== e.name && a.push(c), c = l.getNext();
          return a.push(e), It(a, o.getCompare());
        } else
          return Re;
      else {
        const a = t.get(e.name);
        let l = i;
        return a && (l = l.remove(new w(e.name, a))), l.insert(e, e.node);
      }
    });
    return new X(s, this.indexSet_);
  }
  /**
   * Create a new IndexMap instance with the given value removed
   */
  removeFromIndexes(e, t) {
    const s = mt(this.indexes_, (i) => {
      if (i === Re)
        return i;
      {
        const r = t.get(e.name);
        return r ? i.remove(new w(e.name, r)) : i;
      }
    });
    return new X(s, this.indexSet_);
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
let je;
class C {
  static get EMPTY_NODE() {
    return je || (je = new C(new U(as), null, X.Default));
  }
  /**
   * @param children_ - List of children of this node..
   * @param priorityNode_ - The priority of this node (as a snapshot node).
   */
  constructor(e, t, s) {
    this.children_ = e, this.priorityNode_ = t, this.indexMap_ = s, this.lazyHash_ = null, this.priorityNode_ && co(this.priorityNode_), this.children_.isEmpty() && f(!this.priorityNode_ || this.priorityNode_.isEmpty(), "An empty node cannot have a priority");
  }
  /** @inheritDoc */
  isLeafNode() {
    return !1;
  }
  /** @inheritDoc */
  getPriority() {
    return this.priorityNode_ || je;
  }
  /** @inheritDoc */
  updatePriority(e) {
    return this.children_.isEmpty() ? this : new C(this.children_, e, this.indexMap_);
  }
  /** @inheritDoc */
  getImmediateChild(e) {
    if (e === ".priority")
      return this.getPriority();
    {
      const t = this.children_.get(e);
      return t === null ? je : t;
    }
  }
  /** @inheritDoc */
  getChild(e) {
    const t = m(e);
    return t === null ? this : this.getImmediateChild(t).getChild(S(e));
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
      const o = i.isEmpty() ? je : this.priorityNode_;
      return new C(i, o, r);
    }
  }
  /** @inheritDoc */
  updateChild(e, t) {
    const s = m(e);
    if (s === null)
      return t;
    {
      f(m(e) !== ".priority" || ue(e) === 1, ".priority must be the last token in a path");
      const i = this.getImmediateChild(s).updateChild(S(e), t);
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
    if (this.forEachChild(x, (o, a) => {
      t[o] = a.val(e), s++, r && C.INTEGER_REGEXP_.test(o) ? i = Math.max(i, Number(o)) : r = !1;
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
      this.getPriority().isEmpty() || (e += "priority:" + ao(this.getPriority().val()) + ":"), this.forEachChild(x, (t, s) => {
        const i = s.hash();
        i !== "" && (e += ":" + t + ":" + i);
      }), this.lazyHash_ = e === "" ? "" : Mr(e);
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
    return this.isEmpty() ? e.isEmpty() ? 0 : -1 : e.isLeafNode() || e.isEmpty() ? 1 : e === ct ? -1 : 0;
  }
  withIndex(e) {
    if (e === Oe || this.indexMap_.hasIndex(e))
      return this;
    {
      const t = this.indexMap_.addIndex(e, this.children_);
      return new C(this.children_, this.priorityNode_, t);
    }
  }
  isIndexed(e) {
    return e === Oe || this.indexMap_.hasIndex(e);
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
          const s = this.getIterator(x), i = t.getIterator(x);
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
    return e === Oe ? null : this.indexMap_.get(e.toString());
  }
}
C.INTEGER_REGEXP_ = /^(0|[1-9]\d*)$/;
class Nd extends C {
  constructor() {
    super(new U(as), C.EMPTY_NODE, X.Default);
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
    return C.EMPTY_NODE;
  }
  isEmpty() {
    return !1;
  }
}
const ct = new Nd();
Object.defineProperties(w, {
  MIN: {
    value: new w(Pe, C.EMPTY_NODE)
  },
  MAX: {
    value: new w(Ee, ct)
  }
});
oo.__EMPTY_NODE = C.EMPTY_NODE;
A.__childrenNodeConstructor = C;
Td(ct);
Id(ct);
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
const Dd = !0;
function O(n, e = null) {
  if (n === null)
    return C.EMPTY_NODE;
  if (typeof n == "object" && ".priority" in n && (e = n[".priority"]), f(e === null || typeof e == "string" || typeof e == "number" || typeof e == "object" && ".sv" in e, "Invalid priority type found: " + typeof e), typeof n == "object" && ".value" in n && n[".value"] !== null && (n = n[".value"]), typeof n != "object" || ".sv" in n) {
    const t = n;
    return new A(t, O(e));
  }
  if (!(n instanceof Array) && Dd) {
    const t = [];
    let s = !1;
    if ($(n, (o, a) => {
      if (o.substring(0, 1) !== ".") {
        const l = O(a);
        l.isEmpty() || (s = s || !l.getPriority().isEmpty(), t.push(new w(o, l)));
      }
    }), t.length === 0)
      return C.EMPTY_NODE;
    const r = It(t, vd, (o) => o.name, as);
    if (s) {
      const o = It(t, x.getCompare());
      return new C(r, O(e), new X({ ".priority": o }, { ".priority": x }));
    } else
      return new C(r, O(e), X.Default);
  } else {
    let t = C.EMPTY_NODE;
    return $(n, (s, i) => {
      if (re(n, s) && s.substring(0, 1) !== ".") {
        const r = O(i);
        (r.isLeafNode() || !r.isEmpty()) && (t = t.updateImmediateChild(s, r));
      }
    }), t.updatePriority(O(e));
  }
}
Sd(O);
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
class Od extends Bt {
  constructor(e) {
    super(), this.indexPath_ = e, f(!y(e) && m(e) !== ".priority", "Can't create PathIndex with empty path or .priority key");
  }
  extractChild(e) {
    return e.getChild(this.indexPath_);
  }
  isDefinedOn(e) {
    return !e.getChild(this.indexPath_).isEmpty();
  }
  compare(e, t) {
    const s = this.extractChild(e.node), i = this.extractChild(t.node), r = s.compareTo(i);
    return r === 0 ? Be(e.name, t.name) : r;
  }
  makePost(e, t) {
    const s = O(e), i = C.EMPTY_NODE.updateChild(this.indexPath_, s);
    return new w(t, i);
  }
  maxPost() {
    const e = C.EMPTY_NODE.updateChild(this.indexPath_, ct);
    return new w(Ee, e);
  }
  toString() {
    return no(this.indexPath_, 0).join("/");
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
class Md extends Bt {
  compare(e, t) {
    const s = e.node.compareTo(t.node);
    return s === 0 ? Be(e.name, t.name) : s;
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
const Pd = new Md();
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
function xd(n) {
  return { type: "value", snapshotNode: n };
}
function Ld(n, e) {
  return { type: "child_added", snapshotNode: e, childName: n };
}
function Fd(n, e) {
  return { type: "child_removed", snapshotNode: e, childName: n };
}
function di(n, e, t) {
  return {
    type: "child_changed",
    snapshotNode: e,
    childName: n,
    oldSnap: t
  };
}
function Ud(n, e) {
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
class cs {
  constructor() {
    this.limitSet_ = !1, this.startSet_ = !1, this.startNameSet_ = !1, this.startAfterSet_ = !1, this.endSet_ = !1, this.endNameSet_ = !1, this.endBeforeSet_ = !1, this.limit_ = 0, this.viewFrom_ = "", this.indexStartValue_ = null, this.indexStartName_ = "", this.indexEndValue_ = null, this.indexEndName_ = "", this.index_ = x;
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
    return f(this.startSet_, "Only valid if start has been set"), this.startNameSet_ ? this.indexStartName_ : Pe;
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
    return f(this.endSet_, "Only valid if end has been set"), this.endNameSet_ ? this.indexEndName_ : Ee;
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
    return this.loadsAllData() && this.index_ === x;
  }
  copy() {
    const e = new cs();
    return e.limitSet_ = this.limitSet_, e.limit_ = this.limit_, e.startSet_ = this.startSet_, e.startAfterSet_ = this.startAfterSet_, e.indexStartValue_ = this.indexStartValue_, e.startNameSet_ = this.startNameSet_, e.indexStartName_ = this.indexStartName_, e.endSet_ = this.endSet_, e.endBeforeSet_ = this.endBeforeSet_, e.indexEndValue_ = this.indexEndValue_, e.endNameSet_ = this.endNameSet_, e.indexEndName_ = this.indexEndName_, e.index_ = this.index_, e.viewFrom_ = this.viewFrom_, e;
  }
}
function fi(n) {
  const e = {};
  if (n.isDefault())
    return e;
  let t;
  if (n.index_ === x ? t = "$priority" : n.index_ === Pd ? t = "$value" : n.index_ === Oe ? t = "$key" : (f(n.index_ instanceof Od, "Unrecognized index type!"), t = n.index_.toString()), e.orderBy = M(t), n.startSet_) {
    const s = n.startAfterSet_ ? "startAfter" : "startAt";
    e[s] = M(n.indexStartValue_), n.startNameSet_ && (e[s] += "," + M(n.indexStartName_));
  }
  if (n.endSet_) {
    const s = n.endBeforeSet_ ? "endBefore" : "endAt";
    e[s] = M(n.indexEndValue_), n.endNameSet_ && (e[s] += "," + M(n.indexEndName_));
  }
  return n.limitSet_ && (n.isViewFromLeft() ? e.limitToFirst = n.limit_ : e.limitToLast = n.limit_), e;
}
function pi(n) {
  const e = {};
  if (n.startSet_ && (e.sp = n.indexStartValue_, n.startNameSet_ && (e.sn = n.indexStartName_), e.sin = !n.startAfterSet_), n.endSet_ && (e.ep = n.indexEndValue_, n.endNameSet_ && (e.en = n.indexEndName_), e.ein = !n.endBeforeSet_), n.limitSet_) {
    e.l = n.limit_;
    let t = n.viewFrom_;
    t === "" && (n.isViewFromLeft() ? t = "l" : t = "r"), e.vf = t;
  }
  return n.index_ !== x && (e.i = n.index_.toString()), e;
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
class kt extends Zr {
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
    super(), this.repoInfo_ = e, this.onDataUpdate_ = t, this.authTokenProvider_ = s, this.appCheckTokenProvider_ = i, this.log_ = at("p:rest:"), this.listens_ = {};
  }
  /** @inheritDoc */
  listen(e, t, s, i) {
    const r = e._path.toString();
    this.log_("Listen called for " + r + " " + e._queryIdentifier);
    const o = kt.getListenId_(e, s), a = {};
    this.listens_[o] = a;
    const l = fi(e._queryParams);
    this.restRequest_(r + ".json", l, (c, u) => {
      let h = u;
      if (c === 404 && (h = null, c = null), c === null && this.onDataUpdate_(
        r,
        h,
        /*isMerge=*/
        !1,
        s
      ), Me(this.listens_, o) === a) {
        let d;
        c ? c === 401 ? d = "permission_denied" : d = "rest_error:" + c : d = "ok", i(d, null);
      }
    });
  }
  /** @inheritDoc */
  unlisten(e, t) {
    const s = kt.getListenId_(e, t);
    delete this.listens_[s];
  }
  get(e) {
    const t = fi(e._queryParams), s = e._path.toString(), i = new he();
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
      const o = (this.repoInfo_.secure ? "https://" : "http://") + this.repoInfo_.host + e + "?ns=" + this.repoInfo_.namespace + ya(t);
      this.log_("Sending REST request for " + o);
      const a = new XMLHttpRequest();
      a.onreadystatechange = () => {
        if (s && a.readyState === 4) {
          this.log_("REST Response for " + o + " received. status:", a.status, "response:", a.responseText);
          let l = null;
          if (a.status >= 200 && a.status < 300) {
            try {
              l = et(a.responseText);
            } catch {
              W("Failed to parse JSON response for " + o + ": " + a.responseText);
            }
            s(null, l);
          } else
            a.status !== 401 && a.status !== 404 && W("Got unsuccessful REST response for " + o + " Status: " + a.status), s(a.status);
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
class Bd {
  constructor() {
    this.rootNode_ = C.EMPTY_NODE;
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
function Rt() {
  return {
    value: null,
    children: /* @__PURE__ */ new Map()
  };
}
function uo(n, e, t) {
  if (y(e))
    n.value = t, n.children.clear();
  else if (n.value !== null)
    n.value = n.value.updateChild(e, t);
  else {
    const s = m(e);
    n.children.has(s) || n.children.set(s, Rt());
    const i = n.children.get(s);
    e = S(e), uo(i, e, t);
  }
}
function In(n, e, t) {
  n.value !== null ? t(e, n.value) : Wd(n, (s, i) => {
    const r = new I(e.toString() + "/" + s);
    In(i, r, t);
  });
}
function Wd(n, e) {
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
class Hd {
  constructor(e) {
    this.collection_ = e, this.last_ = null;
  }
  get() {
    const e = this.collection_.get(), t = { ...e };
    return this.last_ && $(this.last_, (s, i) => {
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
const _i = 10 * 1e3, $d = 30 * 1e3, Kd = 5 * 60 * 1e3;
class Vd {
  constructor(e, t) {
    this.server_ = t, this.statsToReport_ = {}, this.statsListener_ = new Hd(e);
    const s = _i + ($d - _i) * Math.random();
    Xe(this.reportStats_.bind(this), Math.floor(s));
  }
  reportStats_() {
    const e = this.statsListener_.get(), t = {};
    let s = !1;
    $(e, (i, r) => {
      r > 0 && re(this.statsToReport_, i) && (t[i] = r, s = !0);
    }), s && this.server_.reportStats(t), Xe(this.reportStats_.bind(this), Math.floor(Math.random() * 2 * Kd));
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
var G;
(function(n) {
  n[n.OVERWRITE = 0] = "OVERWRITE", n[n.MERGE = 1] = "MERGE", n[n.ACK_USER_WRITE = 2] = "ACK_USER_WRITE", n[n.LISTEN_COMPLETE = 3] = "LISTEN_COMPLETE";
})(G || (G = {}));
function fo() {
  return {
    fromUser: !0,
    fromServer: !1,
    queryId: null,
    tagged: !1
  };
}
function po() {
  return {
    fromUser: !1,
    fromServer: !0,
    queryId: null,
    tagged: !1
  };
}
function _o(n) {
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
class At {
  /**
   * @param affectedTree - A tree containing true for each affected path. Affected paths can't overlap.
   */
  constructor(e, t, s) {
    this.path = e, this.affectedTree = t, this.revert = s, this.type = G.ACK_USER_WRITE, this.source = fo();
  }
  operationForChild(e) {
    if (y(this.path)) {
      if (this.affectedTree.value != null)
        return f(this.affectedTree.children.isEmpty(), "affectedTree should not have overlapping affected paths."), this;
      {
        const t = this.affectedTree.subtree(new I(e));
        return new At(E(), t, this.revert);
      }
    } else return f(m(this.path) === e, "operationForChild called for unrelated child."), new At(S(this.path), this.affectedTree, this.revert);
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
class ve {
  constructor(e, t, s) {
    this.source = e, this.path = t, this.snap = s, this.type = G.OVERWRITE;
  }
  operationForChild(e) {
    return y(this.path) ? new ve(this.source, E(), this.snap.getImmediateChild(e)) : new ve(this.source, S(this.path), this.snap);
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
class it {
  constructor(e, t, s) {
    this.source = e, this.path = t, this.children = s, this.type = G.MERGE;
  }
  operationForChild(e) {
    if (y(this.path)) {
      const t = this.children.subtree(new I(e));
      return t.isEmpty() ? null : t.value ? new ve(this.source, E(), t.value) : new it(this.source, E(), t);
    } else
      return f(m(this.path) === e, "Can't get a merge for a child not on the path of the operation"), new it(this.source, S(this.path), this.children);
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
class ls {
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
    if (y(e))
      return this.isFullyInitialized() && !this.filtered_;
    const t = m(e);
    return this.isCompleteForChild(t);
  }
  isCompleteForChild(e) {
    return this.isFullyInitialized() && !this.filtered_ || this.node_.hasChild(e);
  }
  getNode() {
    return this.node_;
  }
}
function qd(n, e, t, s) {
  const i = [], r = [];
  return e.forEach((o) => {
    o.type === "child_changed" && n.index_.indexedValueChanged(o.oldSnap, o.snapshotNode) && r.push(Ud(o.childName, o.snapshotNode));
  }), Ge(n, i, "child_removed", e, s, t), Ge(n, i, "child_added", e, s, t), Ge(n, i, "child_moved", r, s, t), Ge(n, i, "child_changed", e, s, t), Ge(n, i, "value", e, s, t), i;
}
function Ge(n, e, t, s, i, r) {
  const o = s.filter((a) => a.type === t);
  o.sort((a, l) => Gd(n, a, l)), o.forEach((a) => {
    const l = jd(n, a, r);
    i.forEach((c) => {
      c.respondsTo(a.type) && e.push(c.createEvent(l, n.query_));
    });
  });
}
function jd(n, e, t) {
  return e.type === "value" || e.type === "child_removed" || (e.prevName = t.getPredecessorChildName(e.childName, e.snapshotNode, n.index_)), e;
}
function Gd(n, e, t) {
  if (e.childName == null || t.childName == null)
    throw Le("Should only compare child_ events.");
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
function go(n, e) {
  return { eventCache: n, serverCache: e };
}
function Je(n, e, t, s) {
  return go(new ls(e, t, s), n.serverCache);
}
function mo(n, e, t, s) {
  return go(n.eventCache, new ls(e, t, s));
}
function kn(n) {
  return n.eventCache.isFullyInitialized() ? n.eventCache.getNode() : null;
}
function Te(n) {
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
let un;
const zd = () => (un || (un = new U(Pu)), un);
class T {
  static fromObject(e) {
    let t = new T(null);
    return $(e, (s, i) => {
      t = t.set(new I(s), i);
    }), t;
  }
  constructor(e, t = zd()) {
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
      return { path: E(), value: this.value };
    if (y(e))
      return null;
    {
      const s = m(e), i = this.children.get(s);
      if (i !== null) {
        const r = i.findRootMostMatchingPathAndValue(S(e), t);
        return r != null ? { path: k(new I(s), r.path), value: r.value } : null;
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
    if (y(e))
      return this;
    {
      const t = m(e), s = this.children.get(t);
      return s !== null ? s.subtree(S(e)) : new T(null);
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
    if (y(e))
      return new T(t, this.children);
    {
      const s = m(e), r = (this.children.get(s) || new T(null)).set(S(e), t), o = this.children.insert(s, r);
      return new T(this.value, o);
    }
  }
  /**
   * Removes the value at the specified path.
   *
   * @param relativePath - Path to value to remove.
   * @returns Resulting tree.
   */
  remove(e) {
    if (y(e))
      return this.children.isEmpty() ? new T(null) : new T(null, this.children);
    {
      const t = m(e), s = this.children.get(t);
      if (s) {
        const i = s.remove(S(e));
        let r;
        return i.isEmpty() ? r = this.children.remove(t) : r = this.children.insert(t, i), this.value === null && r.isEmpty() ? new T(null) : new T(this.value, r);
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
    if (y(e))
      return this.value;
    {
      const t = m(e), s = this.children.get(t);
      return s ? s.get(S(e)) : null;
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
    if (y(e))
      return t;
    {
      const s = m(e), r = (this.children.get(s) || new T(null)).setTree(S(e), t);
      let o;
      return r.isEmpty() ? o = this.children.remove(s) : o = this.children.insert(s, r), new T(this.value, o);
    }
  }
  /**
   * Performs a depth first fold on this tree. Transforms a tree into a single
   * value, given a function that operates on the path to a node, an optional
   * current value, and a map of child names to folded subtrees
   */
  fold(e) {
    return this.fold_(E(), e);
  }
  /**
   * Recursive helper for public-facing fold() method
   */
  fold_(e, t) {
    const s = {};
    return this.children.inorderTraversal((i, r) => {
      s[i] = r.fold_(k(e, i), t);
    }), t(e, this.value, s);
  }
  /**
   * Find the first matching value on the given path. Return the result of applying f to it.
   */
  findOnPath(e, t) {
    return this.findOnPath_(e, E(), t);
  }
  findOnPath_(e, t, s) {
    const i = this.value ? s(t, this.value) : !1;
    if (i)
      return i;
    if (y(e))
      return null;
    {
      const r = m(e), o = this.children.get(r);
      return o ? o.findOnPath_(S(e), k(t, r), s) : null;
    }
  }
  foreachOnPath(e, t) {
    return this.foreachOnPath_(e, E(), t);
  }
  foreachOnPath_(e, t, s) {
    if (y(e))
      return this;
    {
      this.value && s(t, this.value);
      const i = m(e), r = this.children.get(i);
      return r ? r.foreachOnPath_(S(e), k(t, i), s) : new T(null);
    }
  }
  /**
   * Calls the given function for each node in the tree that has a value.
   *
   * @param f - A function to be called with the path from the root of the tree to
   * a node, and the value at that node. Called in depth-first order.
   */
  foreach(e) {
    this.foreach_(E(), e);
  }
  foreach_(e, t) {
    this.children.inorderTraversal((s, i) => {
      i.foreach_(k(e, s), t);
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
class j {
  constructor(e) {
    this.writeTree_ = e;
  }
  static empty() {
    return new j(new T(null));
  }
}
function Ze(n, e, t) {
  if (y(e))
    return new j(new T(t));
  {
    const s = n.writeTree_.findRootMostValueAndPath(e);
    if (s != null) {
      const i = s.path;
      let r = s.value;
      const o = H(i, e);
      return r = r.updateChild(o, t), new j(n.writeTree_.set(i, r));
    } else {
      const i = new T(t), r = n.writeTree_.setTree(e, i);
      return new j(r);
    }
  }
}
function gi(n, e, t) {
  let s = n;
  return $(t, (i, r) => {
    s = Ze(s, k(e, i), r);
  }), s;
}
function mi(n, e) {
  if (y(e))
    return j.empty();
  {
    const t = n.writeTree_.setTree(e, new T(null));
    return new j(t);
  }
}
function Rn(n, e) {
  return Ie(n, e) != null;
}
function Ie(n, e) {
  const t = n.writeTree_.findRootMostValueAndPath(e);
  return t != null ? n.writeTree_.get(t.path).getChild(H(t.path, e)) : null;
}
function yi(n) {
  const e = [], t = n.writeTree_.value;
  return t != null ? t.isLeafNode() || t.forEachChild(x, (s, i) => {
    e.push(new w(s, i));
  }) : n.writeTree_.children.inorderTraversal((s, i) => {
    i.value != null && e.push(new w(s, i.value));
  }), e;
}
function le(n, e) {
  if (y(e))
    return n;
  {
    const t = Ie(n, e);
    return t != null ? new j(new T(t)) : new j(n.writeTree_.subtree(e));
  }
}
function An(n) {
  return n.writeTree_.isEmpty();
}
function xe(n, e) {
  return yo(E(), n.writeTree_, e);
}
function yo(n, e, t) {
  if (e.value != null)
    return t.updateChild(n, e.value);
  {
    let s = null;
    return e.children.inorderTraversal((i, r) => {
      i === ".priority" ? (f(r.value !== null, "Priority writes must always be leaf nodes"), s = r.value) : t = yo(k(n, i), r, t);
    }), !t.getChild(n).isEmpty() && s !== null && (t = t.updateChild(k(n, ".priority"), s)), t;
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
function wo(n, e) {
  return To(e, n);
}
function Yd(n, e, t, s, i) {
  f(s > n.lastWriteId, "Stacking an older write on top of newer ones"), i === void 0 && (i = !0), n.allWrites.push({
    path: e,
    snap: t,
    writeId: s,
    visible: i
  }), i && (n.visibleWrites = Ze(n.visibleWrites, e, t)), n.lastWriteId = s;
}
function Qd(n, e) {
  for (let t = 0; t < n.allWrites.length; t++) {
    const s = n.allWrites[t];
    if (s.writeId === e)
      return s;
  }
  return null;
}
function Xd(n, e) {
  const t = n.allWrites.findIndex((a) => a.writeId === e);
  f(t >= 0, "removeWrite called with nonexistent writeId.");
  const s = n.allWrites[t];
  n.allWrites.splice(t, 1);
  let i = s.visible, r = !1, o = n.allWrites.length - 1;
  for (; i && o >= 0; ) {
    const a = n.allWrites[o];
    a.visible && (o >= t && Jd(a, s.path) ? i = !1 : V(s.path, a.path) && (r = !0)), o--;
  }
  if (i) {
    if (r)
      return Zd(n), !0;
    if (s.snap)
      n.visibleWrites = mi(n.visibleWrites, s.path);
    else {
      const a = s.children;
      $(a, (l) => {
        n.visibleWrites = mi(n.visibleWrites, k(s.path, l));
      });
    }
    return !0;
  } else return !1;
}
function Jd(n, e) {
  if (n.snap)
    return V(n.path, e);
  for (const t in n.children)
    if (n.children.hasOwnProperty(t) && V(k(n.path, t), e))
      return !0;
  return !1;
}
function Zd(n) {
  n.visibleWrites = bo(n.allWrites, ef, E()), n.allWrites.length > 0 ? n.lastWriteId = n.allWrites[n.allWrites.length - 1].writeId : n.lastWriteId = -1;
}
function ef(n) {
  return n.visible;
}
function bo(n, e, t) {
  let s = j.empty();
  for (let i = 0; i < n.length; ++i) {
    const r = n[i];
    if (e(r)) {
      const o = r.path;
      let a;
      if (r.snap)
        V(t, o) ? (a = H(t, o), s = Ze(s, a, r.snap)) : V(o, t) && (a = H(o, t), s = Ze(s, E(), r.snap.getChild(a)));
      else if (r.children) {
        if (V(t, o))
          a = H(t, o), s = gi(s, a, r.children);
        else if (V(o, t))
          if (a = H(o, t), y(a))
            s = gi(s, E(), r.children);
          else {
            const l = Me(r.children, m(a));
            if (l) {
              const c = l.getChild(S(a));
              s = Ze(s, E(), c);
            }
          }
      } else
        throw Le("WriteRecord should have .snap or .children");
    }
  }
  return s;
}
function Co(n, e, t, s, i) {
  if (!s && !i) {
    const r = Ie(n.visibleWrites, e);
    if (r != null)
      return r;
    {
      const o = le(n.visibleWrites, e);
      if (An(o))
        return t;
      if (t == null && !Rn(o, E()))
        return null;
      {
        const a = t || C.EMPTY_NODE;
        return xe(o, a);
      }
    }
  } else {
    const r = le(n.visibleWrites, e);
    if (!i && An(r))
      return t;
    if (!i && t == null && !Rn(r, E()))
      return null;
    {
      const o = function(c) {
        return (c.visible || i) && (!s || !~s.indexOf(c.writeId)) && (V(c.path, e) || V(e, c.path));
      }, a = bo(n.allWrites, o, e), l = t || C.EMPTY_NODE;
      return xe(a, l);
    }
  }
}
function tf(n, e, t) {
  let s = C.EMPTY_NODE;
  const i = Ie(n.visibleWrites, e);
  if (i)
    return i.isLeafNode() || i.forEachChild(x, (r, o) => {
      s = s.updateImmediateChild(r, o);
    }), s;
  if (t) {
    const r = le(n.visibleWrites, e);
    return t.forEachChild(x, (o, a) => {
      const l = xe(le(r, new I(o)), a);
      s = s.updateImmediateChild(o, l);
    }), yi(r).forEach((o) => {
      s = s.updateImmediateChild(o.name, o.node);
    }), s;
  } else {
    const r = le(n.visibleWrites, e);
    return yi(r).forEach((o) => {
      s = s.updateImmediateChild(o.name, o.node);
    }), s;
  }
}
function nf(n, e, t, s, i) {
  f(s || i, "Either existingEventSnap or existingServerSnap must exist");
  const r = k(e, t);
  if (Rn(n.visibleWrites, r))
    return null;
  {
    const o = le(n.visibleWrites, r);
    return An(o) ? i.getChild(t) : xe(o, i.getChild(t));
  }
}
function sf(n, e, t, s) {
  const i = k(e, t), r = Ie(n.visibleWrites, i);
  if (r != null)
    return r;
  if (s.isCompleteForChild(t)) {
    const o = le(n.visibleWrites, i);
    return xe(o, s.getNode().getImmediateChild(t));
  } else
    return null;
}
function rf(n, e) {
  return Ie(n.visibleWrites, e);
}
function of(n, e, t, s, i, r, o) {
  let a;
  const l = le(n.visibleWrites, e), c = Ie(l, E());
  if (c != null)
    a = c;
  else if (t != null)
    a = xe(l, t);
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
function af() {
  return {
    visibleWrites: j.empty(),
    allWrites: [],
    lastWriteId: -1
  };
}
function Nn(n, e, t, s) {
  return Co(n.writeTree, n.treePath, e, t, s);
}
function Eo(n, e) {
  return tf(n.writeTree, n.treePath, e);
}
function wi(n, e, t, s) {
  return nf(n.writeTree, n.treePath, e, t, s);
}
function Nt(n, e) {
  return rf(n.writeTree, k(n.treePath, e));
}
function cf(n, e, t, s, i, r) {
  return of(n.writeTree, n.treePath, e, t, s, i, r);
}
function hs(n, e, t) {
  return sf(n.writeTree, n.treePath, e, t);
}
function vo(n, e) {
  return To(k(n.treePath, e), n.writeTree);
}
function To(n, e) {
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
class lf {
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
        this.changeMap.set(s, di(s, e.snapshotNode, i.snapshotNode));
      else if (t === "child_removed" && r === "child_added")
        this.changeMap.delete(s);
      else if (t === "child_removed" && r === "child_changed")
        this.changeMap.set(s, Fd(s, i.oldSnap));
      else if (t === "child_changed" && r === "child_added")
        this.changeMap.set(s, Ld(s, e.snapshotNode));
      else if (t === "child_changed" && r === "child_changed")
        this.changeMap.set(s, di(s, e.snapshotNode, i.oldSnap));
      else
        throw Le("Illegal combination of changes: " + e + " occurred after " + i);
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
class hf {
  getCompleteChild(e) {
    return null;
  }
  getChildAfterChild(e, t, s) {
    return null;
  }
}
const So = new hf();
class us {
  constructor(e, t, s = null) {
    this.writes_ = e, this.viewCache_ = t, this.optCompleteServerCache_ = s;
  }
  getCompleteChild(e) {
    const t = this.viewCache_.eventCache;
    if (t.isCompleteForChild(e))
      return t.getNode().getImmediateChild(e);
    {
      const s = this.optCompleteServerCache_ != null ? new ls(this.optCompleteServerCache_, !0, !1) : this.viewCache_.serverCache;
      return hs(this.writes_, e, s);
    }
  }
  getChildAfterChild(e, t, s) {
    const i = this.optCompleteServerCache_ != null ? this.optCompleteServerCache_ : Te(this.viewCache_), r = cf(this.writes_, i, t, 1, s, e);
    return r.length === 0 ? null : r[0];
  }
}
function uf(n, e) {
  f(e.eventCache.getNode().isIndexed(n.filter.getIndex()), "Event snap not indexed"), f(e.serverCache.getNode().isIndexed(n.filter.getIndex()), "Server snap not indexed");
}
function df(n, e, t, s, i) {
  const r = new lf();
  let o, a;
  if (t.type === G.OVERWRITE) {
    const c = t;
    c.source.fromUser ? o = Dn(n, e, c.path, c.snap, s, i, r) : (f(c.source.fromServer, "Unknown source."), a = c.source.tagged || e.serverCache.isFiltered() && !y(c.path), o = Dt(n, e, c.path, c.snap, s, i, a, r));
  } else if (t.type === G.MERGE) {
    const c = t;
    c.source.fromUser ? o = pf(n, e, c.path, c.children, s, i, r) : (f(c.source.fromServer, "Unknown source."), a = c.source.tagged || e.serverCache.isFiltered(), o = On(n, e, c.path, c.children, s, i, a, r));
  } else if (t.type === G.ACK_USER_WRITE) {
    const c = t;
    c.revert ? o = mf(n, e, c.path, s, i, r) : o = _f(n, e, c.path, c.affectedTree, s, i, r);
  } else if (t.type === G.LISTEN_COMPLETE)
    o = gf(n, e, t.path, s, r);
  else
    throw Le("Unknown operation type: " + t.type);
  const l = r.getChanges();
  return ff(e, o, l), { viewCache: o, changes: l };
}
function ff(n, e, t) {
  const s = e.eventCache;
  if (s.isFullyInitialized()) {
    const i = s.getNode().isLeafNode() || s.getNode().isEmpty(), r = kn(n);
    (t.length > 0 || !n.eventCache.isFullyInitialized() || i && !s.getNode().equals(r) || !s.getNode().getPriority().equals(r.getPriority())) && t.push(xd(kn(e)));
  }
}
function Io(n, e, t, s, i, r) {
  const o = e.eventCache;
  if (Nt(s, t) != null)
    return e;
  {
    let a, l;
    if (y(t))
      if (f(e.serverCache.isFullyInitialized(), "If change path is empty, we must have complete server data"), e.serverCache.isFiltered()) {
        const c = Te(e), u = c instanceof C ? c : C.EMPTY_NODE, h = Eo(s, u);
        a = n.filter.updateFullNode(e.eventCache.getNode(), h, r);
      } else {
        const c = Nn(s, Te(e));
        a = n.filter.updateFullNode(e.eventCache.getNode(), c, r);
      }
    else {
      const c = m(t);
      if (c === ".priority") {
        f(ue(t) === 1, "Can't have a priority with additional path components");
        const u = o.getNode();
        l = e.serverCache.getNode();
        const h = wi(s, t, u, l);
        h != null ? a = n.filter.updatePriority(u, h) : a = o.getNode();
      } else {
        const u = S(t);
        let h;
        if (o.isCompleteForChild(c)) {
          l = e.serverCache.getNode();
          const d = wi(s, t, o.getNode(), l);
          d != null ? h = o.getNode().getImmediateChild(c).updateChild(u, d) : h = o.getNode().getImmediateChild(c);
        } else
          h = hs(s, c, e.serverCache);
        h != null ? a = n.filter.updateChild(o.getNode(), c, h, u, i, r) : a = o.getNode();
      }
    }
    return Je(e, a, o.isFullyInitialized() || y(t), n.filter.filtersNodes());
  }
}
function Dt(n, e, t, s, i, r, o, a) {
  const l = e.serverCache;
  let c;
  const u = o ? n.filter : n.filter.getIndexedFilter();
  if (y(t))
    c = u.updateFullNode(l.getNode(), s, null);
  else if (u.filtersNodes() && !l.isFiltered()) {
    const p = l.getNode().updateChild(t, s);
    c = u.updateFullNode(l.getNode(), p, null);
  } else {
    const p = m(t);
    if (!l.isCompleteForPath(t) && ue(t) > 1)
      return e;
    const g = S(t), D = l.getNode().getImmediateChild(p).updateChild(g, s);
    p === ".priority" ? c = u.updatePriority(l.getNode(), D) : c = u.updateChild(l.getNode(), p, D, g, So, null);
  }
  const h = mo(e, c, l.isFullyInitialized() || y(t), u.filtersNodes()), d = new us(i, h, r);
  return Io(n, h, t, i, d, a);
}
function Dn(n, e, t, s, i, r, o) {
  const a = e.eventCache;
  let l, c;
  const u = new us(i, e, r);
  if (y(t))
    c = n.filter.updateFullNode(e.eventCache.getNode(), s, o), l = Je(e, c, !0, n.filter.filtersNodes());
  else {
    const h = m(t);
    if (h === ".priority")
      c = n.filter.updatePriority(e.eventCache.getNode(), s), l = Je(e, c, a.isFullyInitialized(), a.isFiltered());
    else {
      const d = S(t), p = a.getNode().getImmediateChild(h);
      let g;
      if (y(d))
        g = s;
      else {
        const b = u.getCompleteChild(h);
        b != null ? to(d) === ".priority" && b.getChild(so(d)).isEmpty() ? g = b : g = b.updateChild(d, s) : g = C.EMPTY_NODE;
      }
      if (p.equals(g))
        l = e;
      else {
        const b = n.filter.updateChild(a.getNode(), h, g, d, u, o);
        l = Je(e, b, a.isFullyInitialized(), n.filter.filtersNodes());
      }
    }
  }
  return l;
}
function bi(n, e) {
  return n.eventCache.isCompleteForChild(e);
}
function pf(n, e, t, s, i, r, o) {
  let a = e;
  return s.foreach((l, c) => {
    const u = k(t, l);
    bi(e, m(u)) && (a = Dn(n, a, u, c, i, r, o));
  }), s.foreach((l, c) => {
    const u = k(t, l);
    bi(e, m(u)) || (a = Dn(n, a, u, c, i, r, o));
  }), a;
}
function Ci(n, e, t) {
  return t.foreach((s, i) => {
    e = e.updateChild(s, i);
  }), e;
}
function On(n, e, t, s, i, r, o, a) {
  if (e.serverCache.getNode().isEmpty() && !e.serverCache.isFullyInitialized())
    return e;
  let l = e, c;
  y(t) ? c = s : c = new T(null).setTree(t, s);
  const u = e.serverCache.getNode();
  return c.children.inorderTraversal((h, d) => {
    if (u.hasChild(h)) {
      const p = e.serverCache.getNode().getImmediateChild(h), g = Ci(n, p, d);
      l = Dt(n, l, new I(h), g, i, r, o, a);
    }
  }), c.children.inorderTraversal((h, d) => {
    const p = !e.serverCache.isCompleteForChild(h) && d.value === null;
    if (!u.hasChild(h) && !p) {
      const g = e.serverCache.getNode().getImmediateChild(h), b = Ci(n, g, d);
      l = Dt(n, l, new I(h), b, i, r, o, a);
    }
  }), l;
}
function _f(n, e, t, s, i, r, o) {
  if (Nt(i, t) != null)
    return e;
  const a = e.serverCache.isFiltered(), l = e.serverCache;
  if (s.value != null) {
    if (y(t) && l.isFullyInitialized() || l.isCompleteForPath(t))
      return Dt(n, e, t, l.getNode().getChild(t), i, r, a, o);
    if (y(t)) {
      let c = new T(null);
      return l.getNode().forEachChild(Oe, (u, h) => {
        c = c.set(new I(u), h);
      }), On(n, e, t, c, i, r, a, o);
    } else
      return e;
  } else {
    let c = new T(null);
    return s.foreach((u, h) => {
      const d = k(t, u);
      l.isCompleteForPath(d) && (c = c.set(u, l.getNode().getChild(d)));
    }), On(n, e, t, c, i, r, a, o);
  }
}
function gf(n, e, t, s, i) {
  const r = e.serverCache, o = mo(e, r.getNode(), r.isFullyInitialized() || y(t), r.isFiltered());
  return Io(n, o, t, s, So, i);
}
function mf(n, e, t, s, i, r) {
  let o;
  if (Nt(s, t) != null)
    return e;
  {
    const a = new us(s, e, i), l = e.eventCache.getNode();
    let c;
    if (y(t) || m(t) === ".priority") {
      let u;
      if (e.serverCache.isFullyInitialized())
        u = Nn(s, Te(e));
      else {
        const h = e.serverCache.getNode();
        f(h instanceof C, "serverChildren would be complete if leaf node"), u = Eo(s, h);
      }
      u = u, c = n.filter.updateFullNode(l, u, r);
    } else {
      const u = m(t);
      let h = hs(s, u, e.serverCache);
      h == null && e.serverCache.isCompleteForChild(u) && (h = l.getImmediateChild(u)), h != null ? c = n.filter.updateChild(l, u, h, S(t), a, r) : e.eventCache.getNode().hasChild(u) ? c = n.filter.updateChild(l, u, C.EMPTY_NODE, S(t), a, r) : c = l, c.isEmpty() && e.serverCache.isFullyInitialized() && (o = Nn(s, Te(e)), o.isLeafNode() && (c = n.filter.updateFullNode(c, o, r)));
    }
    return o = e.serverCache.isFullyInitialized() || Nt(s, E()) != null, Je(e, c, o, n.filter.filtersNodes());
  }
}
function yf(n, e) {
  const t = Te(n.viewCache_);
  return t && (n.query._queryParams.loadsAllData() || !y(e) && !t.getImmediateChild(m(e)).isEmpty()) ? t.getChild(e) : null;
}
function Ei(n, e, t, s) {
  e.type === G.MERGE && e.source.queryId !== null && (f(Te(n.viewCache_), "We should always have a full cache before handling merges"), f(kn(n.viewCache_), "Missing event cache, even though we have a server cache"));
  const i = n.viewCache_, r = df(n.processor_, i, e, t, s);
  return uf(n.processor_, r.viewCache), f(r.viewCache.serverCache.isFullyInitialized() || !i.serverCache.isFullyInitialized(), "Once a server snap is complete, it should never go back"), n.viewCache_ = r.viewCache, wf(n, r.changes, r.viewCache.eventCache.getNode());
}
function wf(n, e, t, s) {
  const i = n.eventRegistrations_;
  return qd(n.eventGenerator_, e, t, i);
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
let vi;
function bf(n) {
  f(!vi, "__referenceConstructor has already been defined"), vi = n;
}
function ds(n, e, t, s) {
  const i = e.source.queryId;
  if (i !== null) {
    const r = n.views.get(i);
    return f(r != null, "SyncTree gave us an op for an invalid query."), Ei(r, e, t, s);
  } else {
    let r = [];
    for (const o of n.views.values())
      r = r.concat(Ei(o, e, t, s));
    return r;
  }
}
function fs(n, e) {
  let t = null;
  for (const s of n.views.values())
    t = t || yf(s, e);
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
let Ti;
function Cf(n) {
  f(!Ti, "__referenceConstructor has already been defined"), Ti = n;
}
class Si {
  /**
   * @param listenProvider_ - Used by SyncTree to start / stop listening
   *   to server data.
   */
  constructor(e) {
    this.listenProvider_ = e, this.syncPointTree_ = new T(null), this.pendingWriteTree_ = af(), this.tagToQueryMap = /* @__PURE__ */ new Map(), this.queryToTagMap = /* @__PURE__ */ new Map();
  }
}
function ko(n, e, t, s, i) {
  return Yd(n.pendingWriteTree_, e, t, s, i), i ? Ht(n, new ve(fo(), e, t)) : [];
}
function ye(n, e, t = !1) {
  const s = Qd(n.pendingWriteTree_, e);
  if (Xd(n.pendingWriteTree_, e)) {
    let r = new T(null);
    return s.snap != null ? r = r.set(E(), !0) : $(s.children, (o) => {
      r = r.set(new I(o), !0);
    }), Ht(n, new At(s.path, r, t));
  } else
    return [];
}
function Wt(n, e, t) {
  return Ht(n, new ve(po(), e, t));
}
function Ef(n, e, t) {
  const s = T.fromObject(t);
  return Ht(n, new it(po(), e, s));
}
function vf(n, e, t, s) {
  const i = No(n, s);
  if (i != null) {
    const r = Do(i), o = r.path, a = r.queryId, l = H(o, e), c = new ve(_o(a), l, t);
    return Oo(n, o, c);
  } else
    return [];
}
function Tf(n, e, t, s) {
  const i = No(n, s);
  if (i) {
    const r = Do(i), o = r.path, a = r.queryId, l = H(o, e), c = T.fromObject(t), u = new it(_o(a), l, c);
    return Oo(n, o, u);
  } else
    return [];
}
function ps(n, e, t) {
  const i = n.pendingWriteTree_, r = n.syncPointTree_.findOnPath(e, (o, a) => {
    const l = H(o, e), c = fs(a, l);
    if (c)
      return c;
  });
  return Co(i, e, r, t, !0);
}
function Ht(n, e) {
  return Ro(
    e,
    n.syncPointTree_,
    /*serverCache=*/
    null,
    wo(n.pendingWriteTree_, E())
  );
}
function Ro(n, e, t, s) {
  if (y(n.path))
    return Ao(n, e, t, s);
  {
    const i = e.get(E());
    t == null && i != null && (t = fs(i, E()));
    let r = [];
    const o = m(n.path), a = n.operationForChild(o), l = e.children.get(o);
    if (l && a) {
      const c = t ? t.getImmediateChild(o) : null, u = vo(s, o);
      r = r.concat(Ro(a, l, c, u));
    }
    return i && (r = r.concat(ds(i, n, s, t))), r;
  }
}
function Ao(n, e, t, s) {
  const i = e.get(E());
  t == null && i != null && (t = fs(i, E()));
  let r = [];
  return e.children.inorderTraversal((o, a) => {
    const l = t ? t.getImmediateChild(o) : null, c = vo(s, o), u = n.operationForChild(o);
    u && (r = r.concat(Ao(u, a, l, c)));
  }), i && (r = r.concat(ds(i, n, s, t))), r;
}
function No(n, e) {
  return n.tagToQueryMap.get(e);
}
function Do(n) {
  const e = n.indexOf("$");
  return f(e !== -1 && e < n.length - 1, "Bad queryKey."), {
    queryId: n.substr(e + 1),
    path: new I(n.substr(0, e))
  };
}
function Oo(n, e, t) {
  const s = n.syncPointTree_.get(e);
  f(s, "Missing sync point for query tag that we're tracking");
  const i = wo(n.pendingWriteTree_, e);
  return ds(s, t, i, null);
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
class _s {
  constructor(e) {
    this.node_ = e;
  }
  getImmediateChild(e) {
    const t = this.node_.getImmediateChild(e);
    return new _s(t);
  }
  node() {
    return this.node_;
  }
}
class gs {
  constructor(e, t) {
    this.syncTree_ = e, this.path_ = t;
  }
  getImmediateChild(e) {
    const t = k(this.path_, e);
    return new gs(this.syncTree_, t);
  }
  node() {
    return ps(this.syncTree_, this.path_);
  }
}
const Sf = function(n) {
  return n = n || {}, n.timestamp = n.timestamp || (/* @__PURE__ */ new Date()).getTime(), n;
}, Ii = function(n, e, t) {
  if (!n || typeof n != "object")
    return n;
  if (f(".sv" in n, "Unexpected leaf node or priority contents"), typeof n[".sv"] == "string")
    return If(n[".sv"], e, t);
  if (typeof n[".sv"] == "object")
    return kf(n[".sv"], e);
  f(!1, "Unexpected server value: " + JSON.stringify(n, null, 2));
}, If = function(n, e, t) {
  switch (n) {
    case "timestamp":
      return t.timestamp;
    default:
      f(!1, "Unexpected server value: " + n);
  }
}, kf = function(n, e, t) {
  n.hasOwnProperty("increment") || f(!1, "Unexpected server value: " + JSON.stringify(n, null, 2));
  const s = n.increment;
  typeof s != "number" && f(!1, "Unexpected increment value: " + s);
  const i = e.node();
  if (f(i !== null && typeof i < "u", "Expected ChildrenNode.EMPTY_NODE for nulls"), !i.isLeafNode())
    return s;
  const o = i.getValue();
  return typeof o != "number" ? s : o + s;
}, Rf = function(n, e, t, s) {
  return ms(e, new gs(t, n), s);
}, Mo = function(n, e, t) {
  return ms(n, new _s(e), t);
};
function ms(n, e, t) {
  const s = n.getPriority().val(), i = Ii(s, e.getImmediateChild(".priority"), t);
  let r;
  if (n.isLeafNode()) {
    const o = n, a = Ii(o.getValue(), e, t);
    return a !== o.getValue() || i !== o.getPriority().val() ? new A(a, O(i)) : n;
  } else {
    const o = n;
    return r = o, i !== o.getPriority().val() && (r = r.updatePriority(new A(i))), o.forEachChild(x, (a, l) => {
      const c = ms(l, e.getImmediateChild(a), t);
      c !== l && (r = r.updateImmediateChild(a, c));
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
class ys {
  /**
   * @param name - Optional name of the node.
   * @param parent - Optional parent node.
   * @param node - Optional node to wrap.
   */
  constructor(e = "", t = null, s = { children: {}, childCount: 0 }) {
    this.name = e, this.parent = t, this.node = s;
  }
}
function ws(n, e) {
  let t = e instanceof I ? e : new I(e), s = n, i = m(t);
  for (; i !== null; ) {
    const r = Me(s.node.children, i) || {
      children: {},
      childCount: 0
    };
    s = new ys(i, s, r), t = S(t), i = m(t);
  }
  return s;
}
function He(n) {
  return n.node.value;
}
function Po(n, e) {
  n.node.value = e, Mn(n);
}
function xo(n) {
  return n.node.childCount > 0;
}
function Af(n) {
  return He(n) === void 0 && !xo(n);
}
function $t(n, e) {
  $(n.node.children, (t, s) => {
    e(new ys(t, n, s));
  });
}
function Lo(n, e, t, s) {
  t && e(n), $t(n, (i) => {
    Lo(i, e, !0);
  });
}
function Nf(n, e, t) {
  let s = n.parent;
  for (; s !== null; ) {
    if (e(s))
      return !0;
    s = s.parent;
  }
  return !1;
}
function lt(n) {
  return new I(n.parent === null ? n.name : lt(n.parent) + "/" + n.name);
}
function Mn(n) {
  n.parent !== null && Df(n.parent, n.name, n);
}
function Df(n, e, t) {
  const s = Af(t), i = re(n.node.children, e);
  s && i ? (delete n.node.children[e], n.node.childCount--, Mn(n)) : !s && !i && (n.node.children[e] = t.node, n.node.childCount++, Mn(n));
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
const Of = /[\[\].#$\/\u0000-\u001F\u007F]/, Mf = /[\[\].#$\u0000-\u001F\u007F]/, dn = 10 * 1024 * 1024, Fo = function(n) {
  return typeof n == "string" && n.length !== 0 && !Of.test(n);
}, Uo = function(n) {
  return typeof n == "string" && n.length !== 0 && !Mf.test(n);
}, Pf = function(n) {
  return n && (n = n.replace(/^\/*\.info(\/|$)/, "/")), Uo(n);
}, xf = function(n, e, t, s) {
  bs(Ln(n, "value"), e, t);
}, bs = function(n, e, t) {
  const s = t instanceof I ? new _d(t, n) : t;
  if (e === void 0)
    throw new Error(n + "contains undefined " + _e(s));
  if (typeof e == "function")
    throw new Error(n + "contains a function " + _e(s) + " with contents = " + e.toString());
  if (Pr(e))
    throw new Error(n + "contains " + e.toString() + " " + _e(s));
  if (typeof e == "string" && e.length > dn / 3 && Pt(e) > dn)
    throw new Error(n + "contains a string greater than " + dn + " utf8 bytes " + _e(s) + " ('" + e.substring(0, 50) + "...')");
  if (e && typeof e == "object") {
    let i = !1, r = !1;
    if ($(e, (o, a) => {
      if (o === ".value")
        i = !0;
      else if (o !== ".priority" && o !== ".sv" && (r = !0, !Fo(o)))
        throw new Error(n + " contains an invalid key (" + o + ") " + _e(s) + `.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);
      gd(s, o), bs(n, a, s), md(s);
    }), i && r)
      throw new Error(n + ' contains ".value" child ' + _e(s) + " in addition to actual children.");
  }
}, Bo = function(n, e, t, s) {
  if (!Uo(t))
    throw new Error(Ln(n, e) + 'was an invalid path = "' + t + `". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`);
}, Lf = function(n, e, t, s) {
  t && (t = t.replace(/^\/*\.info(\/|$)/, "/")), Bo(n, e, t);
}, Ff = function(n, e) {
  if (m(e) === ".info")
    throw new Error(n + " failed = Can't modify data under /.info/");
}, Uf = function(n, e) {
  const t = e.path.toString();
  if (typeof e.repoInfo.host != "string" || e.repoInfo.host.length === 0 || !Fo(e.repoInfo.namespace) && e.repoInfo.host.split(":")[0] !== "localhost" || t.length !== 0 && !Pf(t))
    throw new Error(Ln(n, "url") + `must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`);
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
class Bf {
  constructor() {
    this.eventLists_ = [], this.recursionDepth_ = 0;
  }
}
function Wo(n, e) {
  let t = null;
  for (let s = 0; s < e.length; s++) {
    const i = e[s], r = i.getPath();
    t !== null && !io(r, t.path) && (n.eventLists_.push(t), t = null), t === null && (t = { events: [], path: r }), t.events.push(i);
  }
  t && n.eventLists_.push(t);
}
function ie(n, e, t) {
  Wo(n, t), Wf(n, (s) => V(s, e) || V(e, s));
}
function Wf(n, e) {
  n.recursionDepth_++;
  let t = !0;
  for (let s = 0; s < n.eventLists_.length; s++) {
    const i = n.eventLists_[s];
    if (i) {
      const r = i.path;
      e(r) ? (Hf(n.eventLists_[s]), n.eventLists_[s] = null) : t = !1;
    }
  }
  t && (n.eventLists_ = []), n.recursionDepth_--;
}
function Hf(n) {
  for (let e = 0; e < n.events.length; e++) {
    const t = n.events[e];
    if (t !== null) {
      n.events[e] = null;
      const s = t.getEventRunner();
      Qe && P("event: " + t.toString()), We(s);
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
const $f = "repo_interrupt", Kf = 25;
class Vf {
  constructor(e, t, s, i) {
    this.repoInfo_ = e, this.forceRestClient_ = t, this.authTokenProvider_ = s, this.appCheckProvider_ = i, this.dataUpdateCount = 0, this.statsListener_ = null, this.eventQueue_ = new Bf(), this.nextWriteId_ = 1, this.interceptServerDataCallback_ = null, this.onDisconnect_ = Rt(), this.transactionQueueTree_ = new ys(), this.persistentConnection_ = null, this.key = this.repoInfo_.toURLString();
  }
  /**
   * @returns The URL corresponding to the root of this Firebase.
   */
  toString() {
    return (this.repoInfo_.secure ? "https://" : "http://") + this.repoInfo_.host;
  }
}
function qf(n, e, t) {
  if (n.stats_ = is(n.repoInfo_), n.forceRestClient_ || Wu())
    n.server_ = new kt(n.repoInfo_, (s, i, r, o) => {
      ki(n, s, i, r, o);
    }, n.authTokenProvider_, n.appCheckProvider_), setTimeout(() => Ri(
      n,
      /* connectStatus= */
      !0
    ), 0);
  else {
    if (typeof t < "u" && t !== null) {
      if (typeof t != "object")
        throw new Error("Only objects are supported for option databaseAuthVariableOverride");
      try {
        M(t);
      } catch (s) {
        throw new Error("Invalid authOverride provided: " + s);
      }
    }
    n.persistentConnection_ = new ee(n.repoInfo_, e, (s, i, r, o) => {
      ki(n, s, i, r, o);
    }, (s) => {
      Ri(n, s);
    }, (s) => {
      Gf(n, s);
    }, n.authTokenProvider_, n.appCheckProvider_, t), n.server_ = n.persistentConnection_;
  }
  n.authTokenProvider_.addTokenChangeListener((s) => {
    n.server_.refreshAuthToken(s);
  }), n.appCheckProvider_.addTokenChangeListener((s) => {
    n.server_.refreshAppCheckToken(s.token);
  }), n.statsReporter_ = qu(n.repoInfo_, () => new Vd(n.stats_, n.server_)), n.infoData_ = new Bd(), n.infoSyncTree_ = new Si({
    startListening: (s, i, r, o) => {
      let a = [];
      const l = n.infoData_.getNode(s._path);
      return l.isEmpty() || (a = Wt(n.infoSyncTree_, s._path, l), setTimeout(() => {
        o("ok");
      }, 0)), a;
    },
    stopListening: () => {
    }
  }), Es(n, "connected", !1), n.serverSyncTree_ = new Si({
    startListening: (s, i, r, o) => (n.server_.listen(s, r, i, (a, l) => {
      const c = o(a, l);
      ie(n.eventQueue_, s._path, c);
    }), []),
    stopListening: (s, i) => {
      n.server_.unlisten(s, i);
    }
  });
}
function jf(n) {
  const t = n.infoData_.getNode(new I(".info/serverTimeOffset")).val() || 0;
  return (/* @__PURE__ */ new Date()).getTime() + t;
}
function Cs(n) {
  return Sf({
    timestamp: jf(n)
  });
}
function ki(n, e, t, s, i) {
  n.dataUpdateCount++;
  const r = new I(e);
  t = n.interceptServerDataCallback_ ? n.interceptServerDataCallback_(e, t) : t;
  let o = [];
  if (i)
    if (s) {
      const l = mt(t, (c) => O(c));
      o = Tf(n.serverSyncTree_, r, l, i);
    } else {
      const l = O(t);
      o = vf(n.serverSyncTree_, r, l, i);
    }
  else if (s) {
    const l = mt(t, (c) => O(c));
    o = Ef(n.serverSyncTree_, r, l);
  } else {
    const l = O(t);
    o = Wt(n.serverSyncTree_, r, l);
  }
  let a = r;
  o.length > 0 && (a = Kt(n, r)), ie(n.eventQueue_, a, o);
}
function Ri(n, e) {
  Es(n, "connected", e), e === !1 && Yf(n);
}
function Gf(n, e) {
  $(e, (t, s) => {
    Es(n, t, s);
  });
}
function Es(n, e, t) {
  const s = new I("/.info/" + e), i = O(t);
  n.infoData_.updateSnapshot(s, i);
  const r = Wt(n.infoSyncTree_, s, i);
  ie(n.eventQueue_, s, r);
}
function Ho(n) {
  return n.nextWriteId_++;
}
function zf(n, e, t, s, i) {
  vs(n, "set", {
    path: e.toString(),
    value: t,
    priority: s
  });
  const r = Cs(n), o = O(t, s), a = ps(n.serverSyncTree_, e), l = Mo(o, a, r), c = Ho(n), u = ko(n.serverSyncTree_, e, l, c, !0);
  Wo(n.eventQueue_, u), n.server_.put(e.toString(), o.val(
    /*export=*/
    !0
  ), (d, p) => {
    const g = d === "ok";
    g || W("set at " + e + " failed: " + d);
    const b = ye(n.serverSyncTree_, c, !g);
    ie(n.eventQueue_, e, b), Xf(n, i, d, p);
  });
  const h = jo(n, e);
  Kt(n, h), ie(n.eventQueue_, h, []);
}
function Yf(n) {
  vs(n, "onDisconnectEvents");
  const e = Cs(n), t = Rt();
  In(n.onDisconnect_, E(), (i, r) => {
    const o = Rf(i, r, n.serverSyncTree_, e);
    uo(t, i, o);
  });
  let s = [];
  In(t, E(), (i, r) => {
    s = s.concat(Wt(n.serverSyncTree_, i, r));
    const o = jo(n, i);
    Kt(n, o);
  }), n.onDisconnect_ = Rt(), ie(n.eventQueue_, E(), s);
}
function Qf(n) {
  n.persistentConnection_ && n.persistentConnection_.interrupt($f);
}
function vs(n, ...e) {
  let t = "";
  n.persistentConnection_ && (t = n.persistentConnection_.id + ":"), P(t, ...e);
}
function Xf(n, e, t, s) {
  e && We(() => {
    if (t === "ok")
      e(null);
    else {
      const i = (t || "error").toUpperCase();
      let r = i;
      s && (r += ": " + s);
      const o = new Error(r);
      o.code = i, e(o);
    }
  });
}
function $o(n, e, t) {
  return ps(n.serverSyncTree_, e, t) || C.EMPTY_NODE;
}
function Ts(n, e = n.transactionQueueTree_) {
  if (e || Vt(n, e), He(e)) {
    const t = Vo(n, e);
    f(t.length > 0, "Sending zero length transaction queue"), t.every(
      (i) => i.status === 0
      /* TransactionStatus.RUN */
    ) && Jf(n, lt(e), t);
  } else xo(e) && $t(e, (t) => {
    Ts(n, t);
  });
}
function Jf(n, e, t) {
  const s = t.map((c) => c.currentWriteId), i = $o(n, e, s);
  let r = i;
  const o = i.hash();
  for (let c = 0; c < t.length; c++) {
    const u = t[c];
    f(u.status === 0, "tryToSendTransactionQueue_: items in queue should all be run."), u.status = 1, u.retryCount++;
    const h = H(e, u.path);
    r = r.updateChild(h, u.currentOutputSnapshotRaw);
  }
  const a = r.val(!0), l = e;
  n.server_.put(l.toString(), a, (c) => {
    vs(n, "transaction put response", {
      path: l.toString(),
      status: c
    });
    let u = [];
    if (c === "ok") {
      const h = [];
      for (let d = 0; d < t.length; d++)
        t[d].status = 2, u = u.concat(ye(n.serverSyncTree_, t[d].currentWriteId)), t[d].onComplete && h.push(() => t[d].onComplete(null, !0, t[d].currentOutputSnapshotResolved)), t[d].unwatcher();
      Vt(n, ws(n.transactionQueueTree_, e)), Ts(n, n.transactionQueueTree_), ie(n.eventQueue_, e, u);
      for (let d = 0; d < h.length; d++)
        We(h[d]);
    } else {
      if (c === "datastale")
        for (let h = 0; h < t.length; h++)
          t[h].status === 3 ? t[h].status = 4 : t[h].status = 0;
      else {
        W("transaction at " + l.toString() + " failed: " + c);
        for (let h = 0; h < t.length; h++)
          t[h].status = 4, t[h].abortReason = c;
      }
      Kt(n, e);
    }
  }, o);
}
function Kt(n, e) {
  const t = Ko(n, e), s = lt(t), i = Vo(n, t);
  return Zf(n, i, s), s;
}
function Zf(n, e, t) {
  if (e.length === 0)
    return;
  const s = [];
  let i = [];
  const o = e.filter((a) => a.status === 0).map((a) => a.currentWriteId);
  for (let a = 0; a < e.length; a++) {
    const l = e[a], c = H(t, l.path);
    let u = !1, h;
    if (f(c !== null, "rerunTransactionsUnderNode_: relativePath should not be null."), l.status === 4)
      u = !0, h = l.abortReason, i = i.concat(ye(n.serverSyncTree_, l.currentWriteId, !0));
    else if (l.status === 0)
      if (l.retryCount >= Kf)
        u = !0, h = "maxretry", i = i.concat(ye(n.serverSyncTree_, l.currentWriteId, !0));
      else {
        const d = $o(n, l.path, o);
        l.currentInputSnapshot = d;
        const p = e[a].update(d.val());
        if (p !== void 0) {
          bs("transaction failed: Data returned ", p, l.path);
          let g = O(p);
          typeof p == "object" && p != null && re(p, ".priority") || (g = g.updatePriority(d.getPriority()));
          const D = l.currentWriteId, de = Cs(n), L = Mo(g, d, de);
          l.currentOutputSnapshotRaw = g, l.currentOutputSnapshotResolved = L, l.currentWriteId = Ho(n), o.splice(o.indexOf(D), 1), i = i.concat(ko(n.serverSyncTree_, l.path, L, l.currentWriteId, l.applyLocally)), i = i.concat(ye(n.serverSyncTree_, D, !0));
        } else
          u = !0, h = "nodata", i = i.concat(ye(n.serverSyncTree_, l.currentWriteId, !0));
      }
    ie(n.eventQueue_, t, i), i = [], u && (e[a].status = 2, function(d) {
      setTimeout(d, Math.floor(0));
    }(e[a].unwatcher), e[a].onComplete && (h === "nodata" ? s.push(() => e[a].onComplete(null, !1, e[a].currentInputSnapshot)) : s.push(() => e[a].onComplete(new Error(h), !1, null))));
  }
  Vt(n, n.transactionQueueTree_);
  for (let a = 0; a < s.length; a++)
    We(s[a]);
  Ts(n, n.transactionQueueTree_);
}
function Ko(n, e) {
  let t, s = n.transactionQueueTree_;
  for (t = m(e); t !== null && He(s) === void 0; )
    s = ws(s, t), e = S(e), t = m(e);
  return s;
}
function Vo(n, e) {
  const t = [];
  return qo(n, e, t), t.sort((s, i) => s.order - i.order), t;
}
function qo(n, e, t) {
  const s = He(e);
  if (s)
    for (let i = 0; i < s.length; i++)
      t.push(s[i]);
  $t(e, (i) => {
    qo(n, i, t);
  });
}
function Vt(n, e) {
  const t = He(e);
  if (t) {
    let s = 0;
    for (let i = 0; i < t.length; i++)
      t[i].status !== 2 && (t[s] = t[i], s++);
    t.length = s, Po(e, t.length > 0 ? t : void 0);
  }
  $t(e, (s) => {
    Vt(n, s);
  });
}
function jo(n, e) {
  const t = lt(Ko(n, e)), s = ws(n.transactionQueueTree_, e);
  return Nf(s, (i) => {
    fn(n, i);
  }), fn(n, s), Lo(s, (i) => {
    fn(n, i);
  }), t;
}
function fn(n, e) {
  const t = He(e);
  if (t) {
    const s = [];
    let i = [], r = -1;
    for (let o = 0; o < t.length; o++)
      t[o].status === 3 || (t[o].status === 1 ? (f(r === o - 1, "All SENT items should be at beginning of queue."), r = o, t[o].status = 3, t[o].abortReason = "set") : (f(t[o].status === 0, "Unexpected transaction status in abort"), t[o].unwatcher(), i = i.concat(ye(n.serverSyncTree_, t[o].currentWriteId, !0)), t[o].onComplete && s.push(t[o].onComplete.bind(null, new Error("set"), !1, null))));
    r === -1 ? Po(e, void 0) : t.length = r + 1, ie(n.eventQueue_, lt(e), i);
    for (let o = 0; o < s.length; o++)
      We(s[o]);
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
function ep(n) {
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
function tp(n) {
  const e = {};
  n.charAt(0) === "?" && (n = n.substring(1));
  for (const t of n.split("&")) {
    if (t.length === 0)
      continue;
    const s = t.split("=");
    s.length === 2 ? e[decodeURIComponent(s[0])] = decodeURIComponent(s[1]) : W(`Invalid query segment '${t}' in query '${n}'`);
  }
  return e;
}
const Ai = function(n, e) {
  const t = np(n), s = t.namespace;
  t.domain === "firebase.com" && se(t.host + " is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"), (!s || s === "undefined") && t.domain !== "localhost" && se("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"), t.secure || Ou();
  const i = t.scheme === "ws" || t.scheme === "wss";
  return {
    repoInfo: new jr(
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
    path: new I(t.pathString)
  };
}, np = function(n) {
  let e = "", t = "", s = "", i = "", r = "", o = !0, a = "https", l = 443;
  if (typeof n == "string") {
    let c = n.indexOf("//");
    c >= 0 && (a = n.substring(0, c - 1), n = n.substring(c + 2));
    let u = n.indexOf("/");
    u === -1 && (u = n.length);
    let h = n.indexOf("?");
    h === -1 && (h = n.length), e = n.substring(0, Math.min(u, h)), u < h && (i = ep(n.substring(u, h)));
    const d = tp(n.substring(Math.min(n.length, h)));
    c = e.indexOf(":"), c >= 0 ? (o = a === "https" || a === "wss", l = parseInt(e.substring(c + 1), 10)) : c = e.length;
    const p = e.slice(0, c);
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
    port: l,
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
class Ss {
  /**
   * @hideconstructor
   */
  constructor(e, t, s, i) {
    this._repo = e, this._path = t, this._queryParams = s, this._orderByCalled = i;
  }
  get key() {
    return y(this._path) ? null : to(this._path);
  }
  get ref() {
    return new ke(this._repo, this._path);
  }
  get _queryIdentifier() {
    const e = pi(this._queryParams), t = ns(e);
    return t === "{}" ? "default" : t;
  }
  /**
   * An object representation of the query parameters used by this Query.
   */
  get _queryObject() {
    return pi(this._queryParams);
  }
  isEqual(e) {
    if (e = Se(e), !(e instanceof Ss))
      return !1;
    const t = this._repo === e._repo, s = io(this._path, e._path), i = this._queryIdentifier === e._queryIdentifier;
    return t && s && i;
  }
  toJSON() {
    return this.toString();
  }
  toString() {
    return this._repo.toString() + pd(this._path);
  }
}
class ke extends Ss {
  /** @hideconstructor */
  constructor(e, t) {
    super(e, t, new cs(), !1);
  }
  get parent() {
    const e = so(this._path);
    return e === null ? null : new ke(this._repo, e);
  }
  get root() {
    let e = this;
    for (; e.parent !== null; )
      e = e.parent;
    return e;
  }
}
function sp(n, e) {
  return n = Se(n), n._checkNotDeleted("ref"), e !== void 0 ? ip(n._root, e) : n._root;
}
function ip(n, e) {
  return n = Se(n), m(n._path) === null ? Lf("child", "path", e) : Bo("child", "path", e), new ke(n._repo, k(n._path, e));
}
function rp(n, e) {
  n = Se(n), Ff("set", n._path), xf("set", e, n._path);
  const t = new he();
  return zf(
    n._repo,
    n._path,
    e,
    /*priority=*/
    null,
    t.wrapCallback(() => {
    })
  ), t.promise;
}
bf(ke);
Cf(ke);
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
const op = "FIREBASE_DATABASE_EMULATOR_HOST", Pn = {};
let ap = !1;
function cp(n, e, t, s) {
  const i = e.lastIndexOf(":"), r = e.substring(0, i), o = xn(r);
  n.repoInfo_ = new jr(
    e,
    /* secure= */
    o,
    n.repoInfo_.namespace,
    n.repoInfo_.webSocketOnly,
    n.repoInfo_.nodeAdmin,
    n.repoInfo_.persistenceKey,
    n.repoInfo_.includeNamespaceInQueryParams,
    /*isUsingEmulator=*/
    !0,
    t
  ), s && (n.authTokenProvider_ = s);
}
function lp(n, e, t, s, i) {
  let r = s || n.options.databaseURL;
  r === void 0 && (n.options.projectId || se("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."), P("Using default host for project ", n.options.projectId), r = `${n.options.projectId}-default-rtdb.firebaseio.com`);
  let o = Ai(r, i), a = o.repoInfo, l;
  typeof process < "u" && process.env && (l = process.env[op]), l ? (r = `http://${l}?ns=${a.namespace}`, o = Ai(r, i), a = o.repoInfo) : o.repoInfo.secure;
  const c = new $u(n.name, n.options, e);
  Uf("Invalid Firebase Database URL", o), y(o.path) || se("Database URL must point to the root of a Firebase Database (not including a child path).");
  const u = up(a, n, c, new Hu(n, t));
  return new dp(u, n);
}
function hp(n, e) {
  const t = Pn[e];
  (!t || t[n.key] !== n) && se(`Database ${e}(${n.repoInfo_}) has already been deleted.`), Qf(n), delete t[n.key];
}
function up(n, e, t, s) {
  let i = Pn[e.name];
  i || (i = {}, Pn[e.name] = i);
  let r = i[n.toURLString()];
  return r && se("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."), r = new Vf(n, ap, t, s), i[n.toURLString()] = r, r;
}
class dp {
  /** @hideconstructor */
  constructor(e, t) {
    this._repoInternal = e, this.app = t, this.type = "database", this._instanceStarted = !1;
  }
  get _repo() {
    return this._instanceStarted || (qf(this._repoInternal, this.app.options.appId, this.app.options.databaseAuthVariableOverride), this._instanceStarted = !0), this._repoInternal;
  }
  get _root() {
    return this._rootInternal || (this._rootInternal = new ke(this._repo, E())), this._rootInternal;
  }
  _delete() {
    return this._rootInternal !== null && (hp(this._repo, this.app.name), this._repoInternal = null, this._rootInternal = null), Promise.resolve();
  }
  _checkNotDeleted(e) {
    this._rootInternal === null && se("Cannot call " + e + " on a deleted database.");
  }
}
function fp(n = Bn(), e) {
  const t = Ue(n, "database").getImmediate({
    identifier: e
  });
  if (!t._instanceStarted) {
    const s = ia("database");
    s && pp(t, ...s);
  }
  return t;
}
function pp(n, e, t, s = {}) {
  n = Se(n), n._checkNotDeleted("useEmulator");
  const i = `${e}:${t}`, r = n._repoInternal;
  if (n._instanceStarted) {
    if (i === n._repoInternal.repoInfo_.host && yt(s, r.repoInfo_.emulatorOptions))
      return;
    se("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.");
  }
  let o;
  if (r.repoInfo_.nodeAdmin)
    s.mockUserToken && se('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'), o = new _t(_t.OWNER);
  else if (s.mockUserToken) {
    const a = typeof s.mockUserToken == "string" ? s.mockUserToken : oa(s.mockUserToken, n.app.options.projectId);
    o = new _t(a);
  }
  xn(e) && (ra(e), la("Database", !0)), cp(r, i, s, o);
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
function _p(n) {
  Iu(Tc), ne(new z(
    "database",
    (e, { instanceIdentifier: t }) => {
      const s = e.getProvider("app").getImmediate(), i = e.getProvider("auth-internal"), r = e.getProvider("app-check-internal");
      return lp(s, i, r, t);
    },
    "PUBLIC"
    /* ComponentType.PUBLIC */
  ).setMultipleInstances(!0)), Z(Qs, Xs, n), Z(Qs, Xs, "esm2020");
}
ee.prototype.simpleListen = function(n, e) {
  this.sendRequest("q", { p: n }, e);
};
ee.prototype.echo = function(n, e) {
  this.sendRequest("echo", { d: n }, e);
};
_p();
Wh([{"revision":null,"url":"assets/index--ONasf9N.js"},{"revision":null,"url":"assets/index-D2EOZupX.css"},{"revision":"861e28e09ef0082a290f0973cc006a9d","url":"index.html"},{"revision":"d4bd41f8dd12f1517340d931428983fb","url":"registerSW.js"},{"revision":"04fb41277b2d80dfa79441653613f291","url":"favicon.ico"},{"revision":"cf5eaff918a960ce531aa06af4f66583","url":"icons/android-chrome-192x192.png"},{"revision":"b3a2b02ff54274e88cba679738ae3b04","url":"icons/android-chrome-512x512.png"},{"revision":"fe78c2de6cbe40fab54d42c53c641a48","url":"manifest.webmanifest"}] || []);
const Go = {
  apiKey: "AIzaSyC-jTMiDjHNTC6cvSKUU44mVbWwT-ToLxQ",
  authDomain: "mister-x-d6b59.firebaseapp.com",
  databaseURL: "https://mister-x-d6b59-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mister-x-d6b59",
  storageBucket: "mister-x-d6b59.firebasestorage.app",
  messagingSenderId: "616391598963",
  appId: "1:616391598963:web:da07882b0f481d3000db06",
  measurementId: "G-W66SK677NG"
}, Is = qi(Go);
dh(Is);
Eu(Is, {
  provider: new ts("6LcVXbQrAAAAAI5Wgi8DenjAM4cz-ubrfcwIRPVJ"),
  isTokenAutoRefreshEnabled: !0
});
Go.databaseURL;
function gp(n) {
  return (n || "").replace(/[.#$/\[\]\/]/g, "_");
}
function zo(n, e) {
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
        const l = a.result;
        l.objectStoreNames.contains(e) || l.createObjectStore(e);
      }, a.onsuccess = () => t(a.result), a.onerror = () => s(a.error);
    }, i.onerror = () => s(i.error);
  });
}
async function Ni() {
  try {
    const n = await zo("app-db", "settings");
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
async function Di(n, {
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
async function Oi(n, e) {
  if (!n || !e) return;
  const t = gp(e), s = fp(Is);
  try {
    await rp(sp(s, `notifications/${n}/recipients/${t}`), !0);
  } catch (i) {
    console.error("[SW] RTDB update failed:", i);
  }
}
function mp(n) {
  const e = n || "", t = /iPhone|iPad|iPod/.test(e), s = /Macintosh/.test(e) && /Mobile/.test(e);
  return t || s;
}
self.addEventListener("push", (n) => {
  n.waitUntil((async () => {
    const e = n.data ? (() => {
      try {
        return n.data.json();
      } catch {
        return {};
      }
    })() : {}, t = e.notification || {}, s = e.data || e || {}, i = t.title || s.title || "Neue Nachricht", r = t.body || s.body || "", o = s.url || t.click_action || "/Mister-X/", a = s.messageId || s.id || t.tag || String(Date.now()), l = s.tag || "mrx", u = (await clients.matchAll({ type: "window", includeUncontrolled: !0 })).find((b) => b.visibilityState === "visible"), h = self.navigator && self.navigator.userAgent ? self.navigator.userAgent : "", d = mp(h);
    if (u) {
      try {
        u.postMessage({ type: "PUSH", payload: s });
      } catch {
      }
      if (d) {
        const b = `${l}-fg`, D = {
          body: r,
          icon: "/Mister-X/icons/android-chrome-192x192.png",
          badge: "/Mister-X/icons/Mister_X_Badge.png",
          tag: b,
          renotify: !0,
          silent: !0,
          requireInteraction: !1,
          timestamp: s.timestamp || Date.now(),
          data: { url: o, messageId: a, tag: b, fg: !0 }
        };
        await self.registration.showNotification(i, D), await Di(b, { tries: 10, intervalMs: 50 }), await new Promise((L) => setTimeout(L, 250)), (await self.registration.getNotifications({ tag: b })).forEach((L) => L.close());
        try {
          await Oi(a, await Ni());
        } catch (L) {
          console.error("[SW] markDelivered failed:", L);
        }
        return;
      }
    }
    const p = `${l}-${a}`, g = {
      body: r,
      icon: "/Mister-X/icons/android-chrome-192x192.png",
      badge: "/Mister-X/icons/Mister_X_Badge.png",
      tag: p,
      renotify: !0,
      silent: s.silent !== void 0 ? !!s.silent : !1,
      requireInteraction: s.requireInteraction ?? !1,
      vibrate: s.vibrate ?? [120, 60, 120],
      timestamp: s.timestamp || Date.now(),
      data: { url: o, messageId: a, tag: p, fg: !1 }
    };
    await self.registration.showNotification(i, g), await Di(p, { tries: 10, intervalMs: 100 });
    try {
      const b = await Ni();
      await Oi(a, b);
    } catch (b) {
      console.error("[SW] markDelivered failed:", b);
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
async function yp(n, e) {
  const t = await zo("app-db", "sw-flags");
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
      await yp("pushSubscriptionChangedAt", Date.now());
    } catch {
    }
    (await clients.matchAll({ type: "window", includeUncontrolled: !0 })).forEach((t) => {
      try {
        t.postMessage({ type: "PUSH_SUBSCRIPTION_CHANGED" });
      } catch {
      }
    });
  })());
});
