(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
  var __commonJS = (callback, module) => () => {
    if (!module) {
      module = {exports: {}};
      callback(module.exports, module);
    }
    return module.exports;
  };
  var __exportStar = (target, module, desc) => {
    __markAsModule(target);
    if (typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, {get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
    }
    return target;
  };
  var __toModule = (module) => {
    if (module && module.__esModule)
      return module;
    return __exportStar(__defProp(__create(__getProtoOf(module)), "default", {value: module, enumerable: true}), module);
  };

  // ../../node_modules/parseuri/index.js
  var require_parseuri = __commonJS((exports, module) => {
    var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
    var parts = [
      "source",
      "protocol",
      "authority",
      "userInfo",
      "user",
      "password",
      "host",
      "port",
      "relative",
      "path",
      "directory",
      "file",
      "query",
      "anchor"
    ];
    module.exports = function parseuri(str) {
      var src = str, b = str.indexOf("["), e = str.indexOf("]");
      if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ";") + str.substring(e, str.length);
      }
      var m = re.exec(str || ""), uri = {}, i = 14;
      while (i--) {
        uri[parts[i]] = m[i] || "";
      }
      if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ":");
        uri.authority = uri.authority.replace("[", "").replace("]", "").replace(/;/g, ":");
        uri.ipv6uri = true;
      }
      uri.pathNames = pathNames(uri, uri["path"]);
      uri.queryKey = queryKey(uri, uri["query"]);
      return uri;
    };
    function pathNames(obj, path) {
      var regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
      if (path.substr(0, 1) == "/" || path.length === 0) {
        names.splice(0, 1);
      }
      if (path.substr(path.length - 1, 1) == "/") {
        names.splice(names.length - 1, 1);
      }
      return names;
    }
    function queryKey(uri, query) {
      var data = {};
      query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function($0, $1, $2) {
        if ($1) {
          data[$1] = $2;
        }
      });
      return data;
    }
  });

  // ../../node_modules/ms/index.js
  var require_ms = __commonJS((exports, module) => {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  });

  // ../../node_modules/socket.io-client/node_modules/debug/src/common.js
  var require_common = __commonJS((exports, module) => {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.instances = [];
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self2 = debug;
          const curr = Number(new Date());
          const ms = curr - (prevTime || curr);
          self2.diff = ms;
          self2.prev = prevTime;
          self2.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return match;
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self2, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self2, args);
          const logFn = self2.log || createDebug.log;
          logFn.apply(self2, args);
        }
        debug.namespace = namespace;
        debug.enabled = createDebug.enabled(namespace);
        debug.useColors = createDebug.useColors();
        debug.color = selectColor(namespace);
        debug.destroy = destroy;
        debug.extend = extend;
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        createDebug.instances.push(debug);
        return debug;
      }
      function destroy() {
        const index = createDebug.instances.indexOf(this);
        if (index !== -1) {
          createDebug.instances.splice(index, 1);
          return true;
        }
        return false;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
        for (i = 0; i < createDebug.instances.length; i++) {
          const instance = createDebug.instances[i];
          instance.enabled = createDebug.enabled(instance.namespace);
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        if (name[name.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module.exports = setup;
  });

  // ../../node_modules/socket.io-client/node_modules/debug/src/browser.js
  var require_browser = __commonJS((exports, module) => {
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    function log(...args) {
      return typeof console === "object" && console.log && console.log(...args);
    }
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module.exports = require_common()(exports);
    const {formatters} = module.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  });

  // ../../node_modules/socket.io-client/build/url.js
  var require_url = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.url = void 0;
    const parseuri = require_parseuri();
    const debug = require_browser()("socket.io-client:url");
    function url(uri, loc) {
      let obj = uri;
      loc = loc || typeof location !== "undefined" && location;
      if (uri == null)
        uri = loc.protocol + "//" + loc.host;
      if (typeof uri === "string") {
        if (uri.charAt(0) === "/") {
          if (uri.charAt(1) === "/") {
            uri = loc.protocol + uri;
          } else {
            uri = loc.host + uri;
          }
        }
        if (!/^(https?|wss?):\/\//.test(uri)) {
          debug("protocol-less url %s", uri);
          if (typeof loc !== "undefined") {
            uri = loc.protocol + "//" + uri;
          } else {
            uri = "https://" + uri;
          }
        }
        debug("parse %s", uri);
        obj = parseuri(uri);
      }
      if (!obj.port) {
        if (/^(http|ws)$/.test(obj.protocol)) {
          obj.port = "80";
        } else if (/^(http|ws)s$/.test(obj.protocol)) {
          obj.port = "443";
        }
      }
      obj.path = obj.path || "/";
      const ipv6 = obj.host.indexOf(":") !== -1;
      const host = ipv6 ? "[" + obj.host + "]" : obj.host;
      obj.id = obj.protocol + "://" + host + ":" + obj.port;
      obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
      return obj;
    }
    exports.url = url;
  });

  // ../../node_modules/has-cors/index.js
  var require_has_cors = __commonJS((exports, module) => {
    try {
      module.exports = typeof XMLHttpRequest !== "undefined" && "withCredentials" in new XMLHttpRequest();
    } catch (err) {
      module.exports = false;
    }
  });

  // ../../node_modules/engine.io-client/lib/globalThis.browser.js
  var require_globalThis_browser = __commonJS((exports, module) => {
    module.exports = (() => {
      if (typeof self !== "undefined") {
        return self;
      } else if (typeof window !== "undefined") {
        return window;
      } else {
        return Function("return this")();
      }
    })();
  });

  // ../../node_modules/engine.io-client/lib/xmlhttprequest.js
  var require_xmlhttprequest = __commonJS((exports, module) => {
    const hasCORS = require_has_cors();
    const globalThis = require_globalThis_browser();
    module.exports = function(opts) {
      const xdomain = opts.xdomain;
      const xscheme = opts.xscheme;
      const enablesXDR = opts.enablesXDR;
      try {
        if (typeof XMLHttpRequest !== "undefined" && (!xdomain || hasCORS)) {
          return new XMLHttpRequest();
        }
      } catch (e) {
      }
      try {
        if (typeof XDomainRequest !== "undefined" && !xscheme && enablesXDR) {
          return new XDomainRequest();
        }
      } catch (e) {
      }
      if (!xdomain) {
        try {
          return new globalThis[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
        } catch (e) {
        }
      }
    };
  });

  // ../../node_modules/engine.io-parser/lib/commons.js
  var require_commons = __commonJS((exports, module) => {
    const PACKET_TYPES = Object.create(null);
    PACKET_TYPES["open"] = "0";
    PACKET_TYPES["close"] = "1";
    PACKET_TYPES["ping"] = "2";
    PACKET_TYPES["pong"] = "3";
    PACKET_TYPES["message"] = "4";
    PACKET_TYPES["upgrade"] = "5";
    PACKET_TYPES["noop"] = "6";
    const PACKET_TYPES_REVERSE = Object.create(null);
    Object.keys(PACKET_TYPES).forEach((key) => {
      PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
    });
    const ERROR_PACKET = {type: "error", data: "parser error"};
    module.exports = {
      PACKET_TYPES,
      PACKET_TYPES_REVERSE,
      ERROR_PACKET
    };
  });

  // ../../node_modules/engine.io-parser/lib/encodePacket.browser.js
  var require_encodePacket_browser = __commonJS((exports, module) => {
    const {PACKET_TYPES} = require_commons();
    const withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]";
    const withNativeArrayBuffer = typeof ArrayBuffer === "function";
    const isView = (obj) => {
      return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj && obj.buffer instanceof ArrayBuffer;
    };
    const encodePacket = ({type, data}, supportsBinary, callback) => {
      if (withNativeBlob && data instanceof Blob) {
        if (supportsBinary) {
          return callback(data);
        } else {
          return encodeBlobAsBase64(data, callback);
        }
      } else if (withNativeArrayBuffer && (data instanceof ArrayBuffer || isView(data))) {
        if (supportsBinary) {
          return callback(data instanceof ArrayBuffer ? data : data.buffer);
        } else {
          return encodeBlobAsBase64(new Blob([data]), callback);
        }
      }
      return callback(PACKET_TYPES[type] + (data || ""));
    };
    const encodeBlobAsBase64 = (data, callback) => {
      const fileReader = new FileReader();
      fileReader.onload = function() {
        const content = fileReader.result.split(",")[1];
        callback("b" + content);
      };
      return fileReader.readAsDataURL(data);
    };
    module.exports = encodePacket;
  });

  // ../../node_modules/base64-arraybuffer/lib/base64-arraybuffer.js
  var require_base64_arraybuffer = __commonJS((exports) => {
    (function(chars) {
      "use strict";
      exports.encode = function(arraybuffer) {
        var bytes = new Uint8Array(arraybuffer), i, len = bytes.length, base64 = "";
        for (i = 0; i < len; i += 3) {
          base64 += chars[bytes[i] >> 2];
          base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
          base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
          base64 += chars[bytes[i + 2] & 63];
        }
        if (len % 3 === 2) {
          base64 = base64.substring(0, base64.length - 1) + "=";
        } else if (len % 3 === 1) {
          base64 = base64.substring(0, base64.length - 2) + "==";
        }
        return base64;
      };
      exports.decode = function(base64) {
        var bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
        if (base64[base64.length - 1] === "=") {
          bufferLength--;
          if (base64[base64.length - 2] === "=") {
            bufferLength--;
          }
        }
        var arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
        for (i = 0; i < len; i += 4) {
          encoded1 = chars.indexOf(base64[i]);
          encoded2 = chars.indexOf(base64[i + 1]);
          encoded3 = chars.indexOf(base64[i + 2]);
          encoded4 = chars.indexOf(base64[i + 3]);
          bytes[p++] = encoded1 << 2 | encoded2 >> 4;
          bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
          bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
        }
        return arraybuffer;
      };
    })("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");
  });

  // ../../node_modules/engine.io-parser/lib/decodePacket.browser.js
  var require_decodePacket_browser = __commonJS((exports, module) => {
    const {PACKET_TYPES_REVERSE, ERROR_PACKET} = require_commons();
    const withNativeArrayBuffer = typeof ArrayBuffer === "function";
    let base64decoder;
    if (withNativeArrayBuffer) {
      base64decoder = require_base64_arraybuffer();
    }
    const decodePacket = (encodedPacket, binaryType) => {
      if (typeof encodedPacket !== "string") {
        return {
          type: "message",
          data: mapBinary(encodedPacket, binaryType)
        };
      }
      const type = encodedPacket.charAt(0);
      if (type === "b") {
        return {
          type: "message",
          data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
        };
      }
      const packetType = PACKET_TYPES_REVERSE[type];
      if (!packetType) {
        return ERROR_PACKET;
      }
      return encodedPacket.length > 1 ? {
        type: PACKET_TYPES_REVERSE[type],
        data: encodedPacket.substring(1)
      } : {
        type: PACKET_TYPES_REVERSE[type]
      };
    };
    const decodeBase64Packet = (data, binaryType) => {
      if (base64decoder) {
        const decoded = base64decoder.decode(data);
        return mapBinary(decoded, binaryType);
      } else {
        return {base64: true, data};
      }
    };
    const mapBinary = (data, binaryType) => {
      switch (binaryType) {
        case "blob":
          return data instanceof ArrayBuffer ? new Blob([data]) : data;
        case "arraybuffer":
        default:
          return data;
      }
    };
    module.exports = decodePacket;
  });

  // ../../node_modules/engine.io-parser/lib/index.js
  var require_lib = __commonJS((exports, module) => {
    const encodePacket = require_encodePacket_browser();
    const decodePacket = require_decodePacket_browser();
    const SEPARATOR = String.fromCharCode(30);
    const encodePayload = (packets, callback) => {
      const length = packets.length;
      const encodedPackets = new Array(length);
      let count = 0;
      packets.forEach((packet, i) => {
        encodePacket(packet, false, (encodedPacket) => {
          encodedPackets[i] = encodedPacket;
          if (++count === length) {
            callback(encodedPackets.join(SEPARATOR));
          }
        });
      });
    };
    const decodePayload = (encodedPayload, binaryType) => {
      const encodedPackets = encodedPayload.split(SEPARATOR);
      const packets = [];
      for (let i = 0; i < encodedPackets.length; i++) {
        const decodedPacket = decodePacket(encodedPackets[i], binaryType);
        packets.push(decodedPacket);
        if (decodedPacket.type === "error") {
          break;
        }
      }
      return packets;
    };
    module.exports = {
      protocol: 4,
      encodePacket,
      encodePayload,
      decodePacket,
      decodePayload
    };
  });

  // ../../node_modules/component-emitter/index.js
  var require_component_emitter = __commonJS((exports, module) => {
    if (typeof module !== "undefined") {
      module.exports = Emitter;
    }
    function Emitter(obj) {
      if (obj)
        return mixin(obj);
    }
    function mixin(obj) {
      for (var key in Emitter.prototype) {
        obj[key] = Emitter.prototype[key];
      }
      return obj;
    }
    Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
      this._callbacks = this._callbacks || {};
      (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
      return this;
    };
    Emitter.prototype.once = function(event, fn) {
      function on() {
        this.off(event, on);
        fn.apply(this, arguments);
      }
      on.fn = fn;
      this.on(event, on);
      return this;
    };
    Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
      this._callbacks = this._callbacks || {};
      if (arguments.length == 0) {
        this._callbacks = {};
        return this;
      }
      var callbacks = this._callbacks["$" + event];
      if (!callbacks)
        return this;
      if (arguments.length == 1) {
        delete this._callbacks["$" + event];
        return this;
      }
      var cb;
      for (var i = 0; i < callbacks.length; i++) {
        cb = callbacks[i];
        if (cb === fn || cb.fn === fn) {
          callbacks.splice(i, 1);
          break;
        }
      }
      if (callbacks.length === 0) {
        delete this._callbacks["$" + event];
      }
      return this;
    };
    Emitter.prototype.emit = function(event) {
      this._callbacks = this._callbacks || {};
      var args = new Array(arguments.length - 1), callbacks = this._callbacks["$" + event];
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
      if (callbacks) {
        callbacks = callbacks.slice(0);
        for (var i = 0, len = callbacks.length; i < len; ++i) {
          callbacks[i].apply(this, args);
        }
      }
      return this;
    };
    Emitter.prototype.listeners = function(event) {
      this._callbacks = this._callbacks || {};
      return this._callbacks["$" + event] || [];
    };
    Emitter.prototype.hasListeners = function(event) {
      return !!this.listeners(event).length;
    };
  });

  // ../../node_modules/engine.io-client/lib/transport.js
  var require_transport = __commonJS((exports, module) => {
    const parser = require_lib();
    const Emitter = require_component_emitter();
    class Transport extends Emitter {
      constructor(opts) {
        super();
        this.opts = opts;
        this.query = opts.query;
        this.readyState = "";
        this.socket = opts.socket;
      }
      onError(msg, desc) {
        const err = new Error(msg);
        err.type = "TransportError";
        err.description = desc;
        this.emit("error", err);
        return this;
      }
      open() {
        if (this.readyState === "closed" || this.readyState === "") {
          this.readyState = "opening";
          this.doOpen();
        }
        return this;
      }
      close() {
        if (this.readyState === "opening" || this.readyState === "open") {
          this.doClose();
          this.onClose();
        }
        return this;
      }
      send(packets) {
        if (this.readyState === "open") {
          this.write(packets);
        } else {
          throw new Error("Transport not open");
        }
      }
      onOpen() {
        this.readyState = "open";
        this.writable = true;
        this.emit("open");
      }
      onData(data) {
        const packet = parser.decodePacket(data, this.socket.binaryType);
        this.onPacket(packet);
      }
      onPacket(packet) {
        this.emit("packet", packet);
      }
      onClose() {
        this.readyState = "closed";
        this.emit("close");
      }
    }
    module.exports = Transport;
  });

  // ../../node_modules/parseqs/index.js
  var require_parseqs = __commonJS((exports) => {
    exports.encode = function(obj) {
      var str = "";
      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          if (str.length)
            str += "&";
          str += encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]);
        }
      }
      return str;
    };
    exports.decode = function(qs) {
      var qry = {};
      var pairs = qs.split("&");
      for (var i = 0, l = pairs.length; i < l; i++) {
        var pair = pairs[i].split("=");
        qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
      }
      return qry;
    };
  });

  // ../../node_modules/yeast/index.js
  var require_yeast = __commonJS((exports, module) => {
    "use strict";
    var alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split("");
    var length = 64;
    var map = {};
    var seed = 0;
    var i = 0;
    var prev;
    function encode(num) {
      var encoded = "";
      do {
        encoded = alphabet[num % length] + encoded;
        num = Math.floor(num / length);
      } while (num > 0);
      return encoded;
    }
    function decode(str) {
      var decoded = 0;
      for (i = 0; i < str.length; i++) {
        decoded = decoded * length + map[str.charAt(i)];
      }
      return decoded;
    }
    function yeast() {
      var now = encode(+new Date());
      if (now !== prev)
        return seed = 0, prev = now;
      return now + "." + encode(seed++);
    }
    for (; i < length; i++)
      map[alphabet[i]] = i;
    yeast.encode = encode;
    yeast.decode = decode;
    module.exports = yeast;
  });

  // ../../node_modules/engine.io-client/node_modules/debug/src/common.js
  var require_common2 = __commonJS((exports, module) => {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.instances = [];
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self2 = debug;
          const curr = Number(new Date());
          const ms = curr - (prevTime || curr);
          self2.diff = ms;
          self2.prev = prevTime;
          self2.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return match;
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self2, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self2, args);
          const logFn = self2.log || createDebug.log;
          logFn.apply(self2, args);
        }
        debug.namespace = namespace;
        debug.enabled = createDebug.enabled(namespace);
        debug.useColors = createDebug.useColors();
        debug.color = selectColor(namespace);
        debug.destroy = destroy;
        debug.extend = extend;
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        createDebug.instances.push(debug);
        return debug;
      }
      function destroy() {
        const index = createDebug.instances.indexOf(this);
        if (index !== -1) {
          createDebug.instances.splice(index, 1);
          return true;
        }
        return false;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
        for (i = 0; i < createDebug.instances.length; i++) {
          const instance = createDebug.instances[i];
          instance.enabled = createDebug.enabled(instance.namespace);
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        if (name[name.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module.exports = setup;
  });

  // ../../node_modules/engine.io-client/node_modules/debug/src/browser.js
  var require_browser2 = __commonJS((exports, module) => {
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    function log(...args) {
      return typeof console === "object" && console.log && console.log(...args);
    }
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module.exports = require_common2()(exports);
    const {formatters} = module.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  });

  // ../../node_modules/engine.io-client/lib/transports/polling.js
  var require_polling = __commonJS((exports, module) => {
    const Transport = require_transport();
    const parseqs = require_parseqs();
    const parser = require_lib();
    const yeast = require_yeast();
    const debug = require_browser2()("engine.io-client:polling");
    class Polling extends Transport {
      get name() {
        return "polling";
      }
      doOpen() {
        this.poll();
      }
      pause(onPause) {
        const self2 = this;
        this.readyState = "pausing";
        function pause() {
          debug("paused");
          self2.readyState = "paused";
          onPause();
        }
        if (this.polling || !this.writable) {
          let total = 0;
          if (this.polling) {
            debug("we are currently polling - waiting to pause");
            total++;
            this.once("pollComplete", function() {
              debug("pre-pause polling complete");
              --total || pause();
            });
          }
          if (!this.writable) {
            debug("we are currently writing - waiting to pause");
            total++;
            this.once("drain", function() {
              debug("pre-pause writing complete");
              --total || pause();
            });
          }
        } else {
          pause();
        }
      }
      poll() {
        debug("polling");
        this.polling = true;
        this.doPoll();
        this.emit("poll");
      }
      onData(data) {
        const self2 = this;
        debug("polling got data %s", data);
        const callback = function(packet, index, total) {
          if (self2.readyState === "opening") {
            self2.onOpen();
          }
          if (packet.type === "close") {
            self2.onClose();
            return false;
          }
          self2.onPacket(packet);
        };
        parser.decodePayload(data, this.socket.binaryType).forEach(callback);
        if (this.readyState !== "closed") {
          this.polling = false;
          this.emit("pollComplete");
          if (this.readyState === "open") {
            this.poll();
          } else {
            debug('ignoring poll - transport state "%s"', this.readyState);
          }
        }
      }
      doClose() {
        const self2 = this;
        function close() {
          debug("writing close packet");
          self2.write([{type: "close"}]);
        }
        if (this.readyState === "open") {
          debug("transport open - closing");
          close();
        } else {
          debug("transport not open - deferring close");
          this.once("open", close);
        }
      }
      write(packets) {
        this.writable = false;
        parser.encodePayload(packets, (data) => {
          this.doWrite(data, () => {
            this.writable = true;
            this.emit("drain");
          });
        });
      }
      uri() {
        let query = this.query || {};
        const schema = this.opts.secure ? "https" : "http";
        let port = "";
        if (this.opts.timestampRequests !== false) {
          query[this.opts.timestampParam] = yeast();
        }
        if (!this.supportsBinary && !query.sid) {
          query.b64 = 1;
        }
        query = parseqs.encode(query);
        if (this.opts.port && (schema === "https" && Number(this.opts.port) !== 443 || schema === "http" && Number(this.opts.port) !== 80)) {
          port = ":" + this.opts.port;
        }
        if (query.length) {
          query = "?" + query;
        }
        const ipv6 = this.opts.hostname.indexOf(":") !== -1;
        return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + query;
      }
    }
    module.exports = Polling;
  });

  // ../../node_modules/engine.io-client/lib/util.js
  var require_util = __commonJS((exports, module) => {
    module.exports.pick = (obj, ...attr) => {
      return attr.reduce((acc, k) => {
        acc[k] = obj[k];
        return acc;
      }, {});
    };
  });

  // ../../node_modules/engine.io-client/lib/transports/polling-xhr.js
  var require_polling_xhr = __commonJS((exports, module) => {
    const XMLHttpRequest2 = require_xmlhttprequest();
    const Polling = require_polling();
    const Emitter = require_component_emitter();
    const {pick} = require_util();
    const globalThis = require_globalThis_browser();
    const debug = require_browser2()("engine.io-client:polling-xhr");
    function empty() {
    }
    const hasXHR2 = function() {
      const XMLHttpRequest3 = require_xmlhttprequest();
      const xhr = new XMLHttpRequest3({xdomain: false});
      return xhr.responseType != null;
    }();
    class XHR extends Polling {
      constructor(opts) {
        super(opts);
        if (typeof location !== "undefined") {
          const isSSL = location.protocol === "https:";
          let port = location.port;
          if (!port) {
            port = isSSL ? 443 : 80;
          }
          this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
          this.xs = opts.secure !== isSSL;
        }
        const forceBase64 = opts && opts.forceBase64;
        this.supportsBinary = hasXHR2 && !forceBase64;
      }
      request(opts = {}) {
        Object.assign(opts, {supportsBinary: this.supportsBinary, xd: this.xd, xs: this.xs}, this.opts);
        return new Request(this.uri(), opts);
      }
      doWrite(data, fn) {
        const isBinary = typeof data !== "string" && data !== void 0;
        const req = this.request({
          method: "POST",
          data,
          isBinary
        });
        const self2 = this;
        req.on("success", fn);
        req.on("error", function(err) {
          self2.onError("xhr post error", err);
        });
      }
      doPoll() {
        debug("xhr poll");
        const req = this.request();
        const self2 = this;
        req.on("data", function(data) {
          self2.onData(data);
        });
        req.on("error", function(err) {
          self2.onError("xhr poll error", err);
        });
        this.pollXhr = req;
      }
    }
    class Request extends Emitter {
      constructor(uri, opts) {
        super();
        this.opts = opts;
        this.method = opts.method || "GET";
        this.uri = uri;
        this.async = opts.async !== false;
        this.data = opts.data !== void 0 ? opts.data : null;
        this.isBinary = opts.isBinary;
        this.supportsBinary = opts.supportsBinary;
        this.create();
      }
      create() {
        const opts = pick(this.opts, "agent", "enablesXDR", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized");
        opts.xdomain = !!this.opts.xd;
        opts.xscheme = !!this.opts.xs;
        const xhr = this.xhr = new XMLHttpRequest2(opts);
        const self2 = this;
        try {
          debug("xhr open %s: %s", this.method, this.uri);
          xhr.open(this.method, this.uri, this.async);
          try {
            if (this.opts.extraHeaders) {
              xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
              for (let i in this.opts.extraHeaders) {
                if (this.opts.extraHeaders.hasOwnProperty(i)) {
                  xhr.setRequestHeader(i, this.opts.extraHeaders[i]);
                }
              }
            }
          } catch (e) {
            console.log(e);
          }
          if (this.method === "POST") {
            try {
              if (this.isBinary) {
                xhr.setRequestHeader("Content-type", "application/octet-stream");
              } else {
                xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
              }
            } catch (e) {
            }
          }
          try {
            xhr.setRequestHeader("Accept", "*/*");
          } catch (e) {
          }
          if ("withCredentials" in xhr) {
            xhr.withCredentials = this.opts.withCredentials;
          }
          if (this.opts.requestTimeout) {
            xhr.timeout = this.opts.requestTimeout;
          }
          if (this.hasXDR()) {
            xhr.onload = function() {
              self2.onLoad();
            };
            xhr.onerror = function() {
              self2.onError(xhr.responseText);
            };
          } else {
            xhr.onreadystatechange = function() {
              if (xhr.readyState === 2) {
                try {
                  const contentType = xhr.getResponseHeader("Content-Type");
                  if (self2.supportsBinary && contentType === "application/octet-stream" || contentType === "application/octet-stream; charset=UTF-8") {
                    xhr.responseType = "arraybuffer";
                  }
                } catch (e) {
                }
              }
              if (xhr.readyState !== 4)
                return;
              if (xhr.status === 200 || xhr.status === 1223) {
                self2.onLoad();
              } else {
                setTimeout(function() {
                  self2.onError(typeof xhr.status === "number" ? xhr.status : 0);
                }, 0);
              }
            };
          }
          debug("xhr data %s", this.data);
          xhr.send(this.data);
        } catch (e) {
          setTimeout(function() {
            self2.onError(e);
          }, 0);
          return;
        }
        if (typeof document !== "undefined") {
          this.index = Request.requestsCount++;
          Request.requests[this.index] = this;
        }
      }
      onSuccess() {
        this.emit("success");
        this.cleanup();
      }
      onData(data) {
        this.emit("data", data);
        this.onSuccess();
      }
      onError(err) {
        this.emit("error", err);
        this.cleanup(true);
      }
      cleanup(fromError) {
        if (typeof this.xhr === "undefined" || this.xhr === null) {
          return;
        }
        if (this.hasXDR()) {
          this.xhr.onload = this.xhr.onerror = empty;
        } else {
          this.xhr.onreadystatechange = empty;
        }
        if (fromError) {
          try {
            this.xhr.abort();
          } catch (e) {
          }
        }
        if (typeof document !== "undefined") {
          delete Request.requests[this.index];
        }
        this.xhr = null;
      }
      onLoad() {
        const data = this.xhr.responseText;
        if (data !== null) {
          this.onData(data);
        }
      }
      hasXDR() {
        return typeof XDomainRequest !== "undefined" && !this.xs && this.enablesXDR;
      }
      abort() {
        this.cleanup();
      }
    }
    Request.requestsCount = 0;
    Request.requests = {};
    if (typeof document !== "undefined") {
      if (typeof attachEvent === "function") {
        attachEvent("onunload", unloadHandler);
      } else if (typeof addEventListener === "function") {
        const terminationEvent = "onpagehide" in globalThis ? "pagehide" : "unload";
        addEventListener(terminationEvent, unloadHandler, false);
      }
    }
    function unloadHandler() {
      for (let i in Request.requests) {
        if (Request.requests.hasOwnProperty(i)) {
          Request.requests[i].abort();
        }
      }
    }
    module.exports = XHR;
    module.exports.Request = Request;
  });

  // ../../node_modules/engine.io-client/lib/transports/polling-jsonp.js
  var require_polling_jsonp = __commonJS((exports, module) => {
    const Polling = require_polling();
    const globalThis = require_globalThis_browser();
    const rNewline = /\n/g;
    const rEscapedNewline = /\\n/g;
    let callbacks;
    function empty() {
    }
    class JSONPPolling extends Polling {
      constructor(opts) {
        super(opts);
        this.query = this.query || {};
        if (!callbacks) {
          callbacks = globalThis.___eio = globalThis.___eio || [];
        }
        this.index = callbacks.length;
        const self2 = this;
        callbacks.push(function(msg) {
          self2.onData(msg);
        });
        this.query.j = this.index;
        if (typeof addEventListener === "function") {
          addEventListener("beforeunload", function() {
            if (self2.script)
              self2.script.onerror = empty;
          }, false);
        }
      }
      get supportsBinary() {
        return false;
      }
      doClose() {
        if (this.script) {
          this.script.parentNode.removeChild(this.script);
          this.script = null;
        }
        if (this.form) {
          this.form.parentNode.removeChild(this.form);
          this.form = null;
          this.iframe = null;
        }
        super.doClose();
      }
      doPoll() {
        const self2 = this;
        const script = document.createElement("script");
        if (this.script) {
          this.script.parentNode.removeChild(this.script);
          this.script = null;
        }
        script.async = true;
        script.src = this.uri();
        script.onerror = function(e) {
          self2.onError("jsonp poll error", e);
        };
        const insertAt = document.getElementsByTagName("script")[0];
        if (insertAt) {
          insertAt.parentNode.insertBefore(script, insertAt);
        } else {
          (document.head || document.body).appendChild(script);
        }
        this.script = script;
        const isUAgecko = typeof navigator !== "undefined" && /gecko/i.test(navigator.userAgent);
        if (isUAgecko) {
          setTimeout(function() {
            const iframe = document.createElement("iframe");
            document.body.appendChild(iframe);
            document.body.removeChild(iframe);
          }, 100);
        }
      }
      doWrite(data, fn) {
        const self2 = this;
        let iframe;
        if (!this.form) {
          const form = document.createElement("form");
          const area = document.createElement("textarea");
          const id = this.iframeId = "eio_iframe_" + this.index;
          form.className = "socketio";
          form.style.position = "absolute";
          form.style.top = "-1000px";
          form.style.left = "-1000px";
          form.target = id;
          form.method = "POST";
          form.setAttribute("accept-charset", "utf-8");
          area.name = "d";
          form.appendChild(area);
          document.body.appendChild(form);
          this.form = form;
          this.area = area;
        }
        this.form.action = this.uri();
        function complete() {
          initIframe();
          fn();
        }
        function initIframe() {
          if (self2.iframe) {
            try {
              self2.form.removeChild(self2.iframe);
            } catch (e) {
              self2.onError("jsonp polling iframe removal error", e);
            }
          }
          try {
            const html = '<iframe src="javascript:0" name="' + self2.iframeId + '">';
            iframe = document.createElement(html);
          } catch (e) {
            iframe = document.createElement("iframe");
            iframe.name = self2.iframeId;
            iframe.src = "javascript:0";
          }
          iframe.id = self2.iframeId;
          self2.form.appendChild(iframe);
          self2.iframe = iframe;
        }
        initIframe();
        data = data.replace(rEscapedNewline, "\\\n");
        this.area.value = data.replace(rNewline, "\\n");
        try {
          this.form.submit();
        } catch (e) {
        }
        if (this.iframe.attachEvent) {
          this.iframe.onreadystatechange = function() {
            if (self2.iframe.readyState === "complete") {
              complete();
            }
          };
        } else {
          this.iframe.onload = complete;
        }
      }
    }
    module.exports = JSONPPolling;
  });

  // ../../node_modules/engine.io-client/lib/transports/websocket-constructor.browser.js
  var require_websocket_constructor_browser = __commonJS((exports, module) => {
    const globalThis = require_globalThis_browser();
    module.exports = {
      WebSocket: globalThis.WebSocket || globalThis.MozWebSocket,
      usingBrowserWebSocket: true,
      defaultBinaryType: "arraybuffer"
    };
  });

  // ../../node_modules/engine.io-client/lib/transports/websocket.js
  var require_websocket = __commonJS((exports, module) => {
    const Transport = require_transport();
    const parser = require_lib();
    const parseqs = require_parseqs();
    const yeast = require_yeast();
    const {pick} = require_util();
    const {
      WebSocket,
      usingBrowserWebSocket,
      defaultBinaryType
    } = require_websocket_constructor_browser();
    const debug = require_browser2()("engine.io-client:websocket");
    const isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
    class WS extends Transport {
      constructor(opts) {
        super(opts);
        const forceBase64 = opts && opts.forceBase64;
        if (forceBase64) {
          this.supportsBinary = false;
        }
        this.supportsBinary = true;
      }
      get name() {
        return "websocket";
      }
      doOpen() {
        if (!this.check()) {
          return;
        }
        const uri = this.uri();
        const protocols = this.opts.protocols;
        let opts;
        if (isReactNative) {
          opts = pick(this.opts, "localAddress");
        } else {
          opts = pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress");
        }
        if (this.opts.extraHeaders) {
          opts.headers = this.opts.extraHeaders;
        }
        try {
          this.ws = usingBrowserWebSocket && !isReactNative ? protocols ? new WebSocket(uri, protocols) : new WebSocket(uri) : new WebSocket(uri, protocols, opts);
        } catch (err) {
          return this.emit("error", err);
        }
        this.ws.binaryType = this.socket.binaryType || defaultBinaryType;
        this.addEventListeners();
      }
      addEventListeners() {
        const self2 = this;
        this.ws.onopen = function() {
          self2.onOpen();
        };
        this.ws.onclose = function() {
          self2.onClose();
        };
        this.ws.onmessage = function(ev) {
          self2.onData(ev.data);
        };
        this.ws.onerror = function(e) {
          self2.onError("websocket error", e);
        };
      }
      write(packets) {
        const self2 = this;
        this.writable = false;
        let total = packets.length;
        let i = 0;
        const l = total;
        for (; i < l; i++) {
          (function(packet) {
            parser.encodePacket(packet, self2.supportsBinary, function(data) {
              const opts = {};
              if (!usingBrowserWebSocket) {
                if (packet.options) {
                  opts.compress = packet.options.compress;
                }
                if (self2.opts.perMessageDeflate) {
                  const len = typeof data === "string" ? Buffer.byteLength(data) : data.length;
                  if (len < self2.opts.perMessageDeflate.threshold) {
                    opts.compress = false;
                  }
                }
              }
              try {
                if (usingBrowserWebSocket) {
                  self2.ws.send(data);
                } else {
                  self2.ws.send(data, opts);
                }
              } catch (e) {
                debug("websocket closed before onclose event");
              }
              --total || done();
            });
          })(packets[i]);
        }
        function done() {
          self2.emit("flush");
          setTimeout(function() {
            self2.writable = true;
            self2.emit("drain");
          }, 0);
        }
      }
      onClose() {
        Transport.prototype.onClose.call(this);
      }
      doClose() {
        if (typeof this.ws !== "undefined") {
          this.ws.close();
        }
      }
      uri() {
        let query = this.query || {};
        const schema = this.opts.secure ? "wss" : "ws";
        let port = "";
        if (this.opts.port && (schema === "wss" && Number(this.opts.port) !== 443 || schema === "ws" && Number(this.opts.port) !== 80)) {
          port = ":" + this.opts.port;
        }
        if (this.opts.timestampRequests) {
          query[this.opts.timestampParam] = yeast();
        }
        if (!this.supportsBinary) {
          query.b64 = 1;
        }
        query = parseqs.encode(query);
        if (query.length) {
          query = "?" + query;
        }
        const ipv6 = this.opts.hostname.indexOf(":") !== -1;
        return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + query;
      }
      check() {
        return !!WebSocket && !("__initialize" in WebSocket && this.name === WS.prototype.name);
      }
    }
    module.exports = WS;
  });

  // ../../node_modules/engine.io-client/lib/transports/index.js
  var require_transports = __commonJS((exports) => {
    const XMLHttpRequest2 = require_xmlhttprequest();
    const XHR = require_polling_xhr();
    const JSONP = require_polling_jsonp();
    const websocket = require_websocket();
    exports.polling = polling;
    exports.websocket = websocket;
    function polling(opts) {
      let xhr;
      let xd = false;
      let xs = false;
      const jsonp = opts.jsonp !== false;
      if (typeof location !== "undefined") {
        const isSSL = location.protocol === "https:";
        let port = location.port;
        if (!port) {
          port = isSSL ? 443 : 80;
        }
        xd = opts.hostname !== location.hostname || port !== opts.port;
        xs = opts.secure !== isSSL;
      }
      opts.xdomain = xd;
      opts.xscheme = xs;
      xhr = new XMLHttpRequest2(opts);
      if ("open" in xhr && !opts.forceJSONP) {
        return new XHR(opts);
      } else {
        if (!jsonp)
          throw new Error("JSONP disabled");
        return new JSONP(opts);
      }
    }
  });

  // ../../node_modules/engine.io-client/lib/socket.js
  var require_socket = __commonJS((exports, module) => {
    const transports = require_transports();
    const Emitter = require_component_emitter();
    const debug = require_browser2()("engine.io-client:socket");
    const parser = require_lib();
    const parseuri = require_parseuri();
    const parseqs = require_parseqs();
    class Socket extends Emitter {
      constructor(uri, opts = {}) {
        super();
        if (uri && typeof uri === "object") {
          opts = uri;
          uri = null;
        }
        if (uri) {
          uri = parseuri(uri);
          opts.hostname = uri.host;
          opts.secure = uri.protocol === "https" || uri.protocol === "wss";
          opts.port = uri.port;
          if (uri.query)
            opts.query = uri.query;
        } else if (opts.host) {
          opts.hostname = parseuri(opts.host).host;
        }
        this.secure = opts.secure != null ? opts.secure : typeof location !== "undefined" && location.protocol === "https:";
        if (opts.hostname && !opts.port) {
          opts.port = this.secure ? "443" : "80";
        }
        this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
        this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : this.secure ? 443 : 80);
        this.transports = opts.transports || ["polling", "websocket"];
        this.readyState = "";
        this.writeBuffer = [];
        this.prevBufferLen = 0;
        this.opts = Object.assign({
          path: "/engine.io",
          agent: false,
          upgrade: true,
          jsonp: true,
          timestampParam: "t",
          policyPort: 843,
          rememberUpgrade: false,
          rejectUnauthorized: true,
          perMessageDeflate: {
            threshold: 1024
          },
          transportOptions: {}
        }, opts);
        this.opts.path = this.opts.path.replace(/\/$/, "") + "/";
        if (typeof this.opts.query === "string") {
          this.opts.query = parseqs.decode(this.opts.query);
        }
        this.id = null;
        this.upgrades = null;
        this.pingInterval = null;
        this.pingTimeout = null;
        this.pingTimeoutTimer = null;
        this.open();
      }
      createTransport(name) {
        debug('creating transport "%s"', name);
        const query = clone(this.opts.query);
        query.EIO = parser.protocol;
        query.transport = name;
        if (this.id)
          query.sid = this.id;
        const opts = Object.assign({}, this.opts.transportOptions[name], this.opts, {
          query,
          socket: this,
          hostname: this.hostname,
          secure: this.secure,
          port: this.port
        });
        debug("options: %j", opts);
        return new transports[name](opts);
      }
      open() {
        let transport;
        if (this.opts.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) {
          transport = "websocket";
        } else if (this.transports.length === 0) {
          const self2 = this;
          setTimeout(function() {
            self2.emit("error", "No transports available");
          }, 0);
          return;
        } else {
          transport = this.transports[0];
        }
        this.readyState = "opening";
        try {
          transport = this.createTransport(transport);
        } catch (e) {
          debug("error while creating transport: %s", e);
          this.transports.shift();
          this.open();
          return;
        }
        transport.open();
        this.setTransport(transport);
      }
      setTransport(transport) {
        debug("setting transport %s", transport.name);
        const self2 = this;
        if (this.transport) {
          debug("clearing existing transport %s", this.transport.name);
          this.transport.removeAllListeners();
        }
        this.transport = transport;
        transport.on("drain", function() {
          self2.onDrain();
        }).on("packet", function(packet) {
          self2.onPacket(packet);
        }).on("error", function(e) {
          self2.onError(e);
        }).on("close", function() {
          self2.onClose("transport close");
        });
      }
      probe(name) {
        debug('probing transport "%s"', name);
        let transport = this.createTransport(name, {probe: 1});
        let failed = false;
        const self2 = this;
        Socket.priorWebsocketSuccess = false;
        function onTransportOpen() {
          if (self2.onlyBinaryUpgrades) {
            const upgradeLosesBinary = !this.supportsBinary && self2.transport.supportsBinary;
            failed = failed || upgradeLosesBinary;
          }
          if (failed)
            return;
          debug('probe transport "%s" opened', name);
          transport.send([{type: "ping", data: "probe"}]);
          transport.once("packet", function(msg) {
            if (failed)
              return;
            if (msg.type === "pong" && msg.data === "probe") {
              debug('probe transport "%s" pong', name);
              self2.upgrading = true;
              self2.emit("upgrading", transport);
              if (!transport)
                return;
              Socket.priorWebsocketSuccess = transport.name === "websocket";
              debug('pausing current transport "%s"', self2.transport.name);
              self2.transport.pause(function() {
                if (failed)
                  return;
                if (self2.readyState === "closed")
                  return;
                debug("changing transport and sending upgrade packet");
                cleanup();
                self2.setTransport(transport);
                transport.send([{type: "upgrade"}]);
                self2.emit("upgrade", transport);
                transport = null;
                self2.upgrading = false;
                self2.flush();
              });
            } else {
              debug('probe transport "%s" failed', name);
              const err = new Error("probe error");
              err.transport = transport.name;
              self2.emit("upgradeError", err);
            }
          });
        }
        function freezeTransport() {
          if (failed)
            return;
          failed = true;
          cleanup();
          transport.close();
          transport = null;
        }
        function onerror(err) {
          const error = new Error("probe error: " + err);
          error.transport = transport.name;
          freezeTransport();
          debug('probe transport "%s" failed because of error: %s', name, err);
          self2.emit("upgradeError", error);
        }
        function onTransportClose() {
          onerror("transport closed");
        }
        function onclose() {
          onerror("socket closed");
        }
        function onupgrade(to) {
          if (transport && to.name !== transport.name) {
            debug('"%s" works - aborting "%s"', to.name, transport.name);
            freezeTransport();
          }
        }
        function cleanup() {
          transport.removeListener("open", onTransportOpen);
          transport.removeListener("error", onerror);
          transport.removeListener("close", onTransportClose);
          self2.removeListener("close", onclose);
          self2.removeListener("upgrading", onupgrade);
        }
        transport.once("open", onTransportOpen);
        transport.once("error", onerror);
        transport.once("close", onTransportClose);
        this.once("close", onclose);
        this.once("upgrading", onupgrade);
        transport.open();
      }
      onOpen() {
        debug("socket open");
        this.readyState = "open";
        Socket.priorWebsocketSuccess = this.transport.name === "websocket";
        this.emit("open");
        this.flush();
        if (this.readyState === "open" && this.opts.upgrade && this.transport.pause) {
          debug("starting upgrade probes");
          let i = 0;
          const l = this.upgrades.length;
          for (; i < l; i++) {
            this.probe(this.upgrades[i]);
          }
        }
      }
      onPacket(packet) {
        if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing") {
          debug('socket receive: type "%s", data "%s"', packet.type, packet.data);
          this.emit("packet", packet);
          this.emit("heartbeat");
          switch (packet.type) {
            case "open":
              this.onHandshake(JSON.parse(packet.data));
              break;
            case "ping":
              this.resetPingTimeout();
              this.sendPacket("pong");
              this.emit("pong");
              break;
            case "error":
              const err = new Error("server error");
              err.code = packet.data;
              this.onError(err);
              break;
            case "message":
              this.emit("data", packet.data);
              this.emit("message", packet.data);
              break;
          }
        } else {
          debug('packet received with socket readyState "%s"', this.readyState);
        }
      }
      onHandshake(data) {
        this.emit("handshake", data);
        this.id = data.sid;
        this.transport.query.sid = data.sid;
        this.upgrades = this.filterUpgrades(data.upgrades);
        this.pingInterval = data.pingInterval;
        this.pingTimeout = data.pingTimeout;
        this.onOpen();
        if (this.readyState === "closed")
          return;
        this.resetPingTimeout();
      }
      resetPingTimeout() {
        clearTimeout(this.pingTimeoutTimer);
        this.pingTimeoutTimer = setTimeout(() => {
          this.onClose("ping timeout");
        }, this.pingInterval + this.pingTimeout);
      }
      onDrain() {
        this.writeBuffer.splice(0, this.prevBufferLen);
        this.prevBufferLen = 0;
        if (this.writeBuffer.length === 0) {
          this.emit("drain");
        } else {
          this.flush();
        }
      }
      flush() {
        if (this.readyState !== "closed" && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
          debug("flushing %d packets in socket", this.writeBuffer.length);
          this.transport.send(this.writeBuffer);
          this.prevBufferLen = this.writeBuffer.length;
          this.emit("flush");
        }
      }
      write(msg, options, fn) {
        this.sendPacket("message", msg, options, fn);
        return this;
      }
      send(msg, options, fn) {
        this.sendPacket("message", msg, options, fn);
        return this;
      }
      sendPacket(type, data, options, fn) {
        if (typeof data === "function") {
          fn = data;
          data = void 0;
        }
        if (typeof options === "function") {
          fn = options;
          options = null;
        }
        if (this.readyState === "closing" || this.readyState === "closed") {
          return;
        }
        options = options || {};
        options.compress = options.compress !== false;
        const packet = {
          type,
          data,
          options
        };
        this.emit("packetCreate", packet);
        this.writeBuffer.push(packet);
        if (fn)
          this.once("flush", fn);
        this.flush();
      }
      close() {
        const self2 = this;
        if (this.readyState === "opening" || this.readyState === "open") {
          this.readyState = "closing";
          if (this.writeBuffer.length) {
            this.once("drain", function() {
              if (this.upgrading) {
                waitForUpgrade();
              } else {
                close();
              }
            });
          } else if (this.upgrading) {
            waitForUpgrade();
          } else {
            close();
          }
        }
        function close() {
          self2.onClose("forced close");
          debug("socket closing - telling transport to close");
          self2.transport.close();
        }
        function cleanupAndClose() {
          self2.removeListener("upgrade", cleanupAndClose);
          self2.removeListener("upgradeError", cleanupAndClose);
          close();
        }
        function waitForUpgrade() {
          self2.once("upgrade", cleanupAndClose);
          self2.once("upgradeError", cleanupAndClose);
        }
        return this;
      }
      onError(err) {
        debug("socket error %j", err);
        Socket.priorWebsocketSuccess = false;
        this.emit("error", err);
        this.onClose("transport error", err);
      }
      onClose(reason, desc) {
        if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing") {
          debug('socket close with reason: "%s"', reason);
          const self2 = this;
          clearTimeout(this.pingIntervalTimer);
          clearTimeout(this.pingTimeoutTimer);
          this.transport.removeAllListeners("close");
          this.transport.close();
          this.transport.removeAllListeners();
          this.readyState = "closed";
          this.id = null;
          this.emit("close", reason, desc);
          self2.writeBuffer = [];
          self2.prevBufferLen = 0;
        }
      }
      filterUpgrades(upgrades) {
        const filteredUpgrades = [];
        let i = 0;
        const j = upgrades.length;
        for (; i < j; i++) {
          if (~this.transports.indexOf(upgrades[i]))
            filteredUpgrades.push(upgrades[i]);
        }
        return filteredUpgrades;
      }
    }
    Socket.priorWebsocketSuccess = false;
    Socket.protocol = parser.protocol;
    function clone(obj) {
      const o = {};
      for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
          o[i] = obj[i];
        }
      }
      return o;
    }
    module.exports = Socket;
  });

  // ../../node_modules/engine.io-client/lib/index.js
  var require_lib2 = __commonJS((exports, module) => {
    const Socket = require_socket();
    module.exports = (uri, opts) => new Socket(uri, opts);
    module.exports.Socket = Socket;
    module.exports.protocol = Socket.protocol;
    module.exports.Transport = require_transport();
    module.exports.transports = require_transports();
    module.exports.parser = require_lib();
  });

  // ../../node_modules/socket.io-parser/dist/is-binary.js
  var require_is_binary = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.hasBinary = exports.isBinary = void 0;
    const withNativeArrayBuffer = typeof ArrayBuffer === "function";
    const isView = (obj) => {
      return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
    };
    const toString = Object.prototype.toString;
    const withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
    const withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
    function isBinary(obj) {
      return withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)) || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File;
    }
    exports.isBinary = isBinary;
    function hasBinary(obj, toJSON) {
      if (!obj || typeof obj !== "object") {
        return false;
      }
      if (Array.isArray(obj)) {
        for (let i = 0, l = obj.length; i < l; i++) {
          if (hasBinary(obj[i])) {
            return true;
          }
        }
        return false;
      }
      if (isBinary(obj)) {
        return true;
      }
      if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
        return hasBinary(obj.toJSON(), true);
      }
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
          return true;
        }
      }
      return false;
    }
    exports.hasBinary = hasBinary;
  });

  // ../../node_modules/socket.io-parser/dist/binary.js
  var require_binary = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.reconstructPacket = exports.deconstructPacket = void 0;
    const is_binary_1 = require_is_binary();
    function deconstructPacket(packet) {
      const buffers = [];
      const packetData = packet.data;
      const pack = packet;
      pack.data = _deconstructPacket(packetData, buffers);
      pack.attachments = buffers.length;
      return {packet: pack, buffers};
    }
    exports.deconstructPacket = deconstructPacket;
    function _deconstructPacket(data, buffers) {
      if (!data)
        return data;
      if (is_binary_1.isBinary(data)) {
        const placeholder = {_placeholder: true, num: buffers.length};
        buffers.push(data);
        return placeholder;
      } else if (Array.isArray(data)) {
        const newData = new Array(data.length);
        for (let i = 0; i < data.length; i++) {
          newData[i] = _deconstructPacket(data[i], buffers);
        }
        return newData;
      } else if (typeof data === "object" && !(data instanceof Date)) {
        const newData = {};
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            newData[key] = _deconstructPacket(data[key], buffers);
          }
        }
        return newData;
      }
      return data;
    }
    function reconstructPacket(packet, buffers) {
      packet.data = _reconstructPacket(packet.data, buffers);
      packet.attachments = void 0;
      return packet;
    }
    exports.reconstructPacket = reconstructPacket;
    function _reconstructPacket(data, buffers) {
      if (!data)
        return data;
      if (data && data._placeholder) {
        return buffers[data.num];
      } else if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          data[i] = _reconstructPacket(data[i], buffers);
        }
      } else if (typeof data === "object") {
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            data[key] = _reconstructPacket(data[key], buffers);
          }
        }
      }
      return data;
    }
  });

  // ../../node_modules/socket.io-parser/node_modules/debug/src/common.js
  var require_common3 = __commonJS((exports, module) => {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.instances = [];
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self2 = debug;
          const curr = Number(new Date());
          const ms = curr - (prevTime || curr);
          self2.diff = ms;
          self2.prev = prevTime;
          self2.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return match;
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self2, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self2, args);
          const logFn = self2.log || createDebug.log;
          logFn.apply(self2, args);
        }
        debug.namespace = namespace;
        debug.enabled = createDebug.enabled(namespace);
        debug.useColors = createDebug.useColors();
        debug.color = selectColor(namespace);
        debug.destroy = destroy;
        debug.extend = extend;
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        createDebug.instances.push(debug);
        return debug;
      }
      function destroy() {
        const index = createDebug.instances.indexOf(this);
        if (index !== -1) {
          createDebug.instances.splice(index, 1);
          return true;
        }
        return false;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
        for (i = 0; i < createDebug.instances.length; i++) {
          const instance = createDebug.instances[i];
          instance.enabled = createDebug.enabled(instance.namespace);
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        if (name[name.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module.exports = setup;
  });

  // ../../node_modules/socket.io-parser/node_modules/debug/src/browser.js
  var require_browser3 = __commonJS((exports, module) => {
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    function log(...args) {
      return typeof console === "object" && console.log && console.log(...args);
    }
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module.exports = require_common3()(exports);
    const {formatters} = module.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  });

  // ../../node_modules/socket.io-parser/dist/index.js
  var require_dist = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Decoder = exports.Encoder = exports.PacketType = exports.protocol = void 0;
    const Emitter = require_component_emitter();
    const binary_1 = require_binary();
    const is_binary_1 = require_is_binary();
    const debug = require_browser3()("socket.io-parser");
    exports.protocol = 5;
    var PacketType;
    (function(PacketType2) {
      PacketType2[PacketType2["CONNECT"] = 0] = "CONNECT";
      PacketType2[PacketType2["DISCONNECT"] = 1] = "DISCONNECT";
      PacketType2[PacketType2["EVENT"] = 2] = "EVENT";
      PacketType2[PacketType2["ACK"] = 3] = "ACK";
      PacketType2[PacketType2["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
      PacketType2[PacketType2["BINARY_EVENT"] = 5] = "BINARY_EVENT";
      PacketType2[PacketType2["BINARY_ACK"] = 6] = "BINARY_ACK";
    })(PacketType = exports.PacketType || (exports.PacketType = {}));
    class Encoder {
      encode(obj) {
        debug("encoding packet %j", obj);
        if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
          if (is_binary_1.hasBinary(obj)) {
            obj.type = obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK;
            return this.encodeAsBinary(obj);
          }
        }
        return [this.encodeAsString(obj)];
      }
      encodeAsString(obj) {
        let str = "" + obj.type;
        if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) {
          str += obj.attachments + "-";
        }
        if (obj.nsp && obj.nsp !== "/") {
          str += obj.nsp + ",";
        }
        if (obj.id != null) {
          str += obj.id;
        }
        if (obj.data != null) {
          str += JSON.stringify(obj.data);
        }
        debug("encoded %j as %s", obj, str);
        return str;
      }
      encodeAsBinary(obj) {
        const deconstruction = binary_1.deconstructPacket(obj);
        const pack = this.encodeAsString(deconstruction.packet);
        const buffers = deconstruction.buffers;
        buffers.unshift(pack);
        return buffers;
      }
    }
    exports.Encoder = Encoder;
    class Decoder extends Emitter {
      constructor() {
        super();
      }
      add(obj) {
        let packet;
        if (typeof obj === "string") {
          packet = this.decodeString(obj);
          if (packet.type === PacketType.BINARY_EVENT || packet.type === PacketType.BINARY_ACK) {
            this.reconstructor = new BinaryReconstructor(packet);
            if (packet.attachments === 0) {
              super.emit("decoded", packet);
            }
          } else {
            super.emit("decoded", packet);
          }
        } else if (is_binary_1.isBinary(obj) || obj.base64) {
          if (!this.reconstructor) {
            throw new Error("got binary data when not reconstructing a packet");
          } else {
            packet = this.reconstructor.takeBinaryData(obj);
            if (packet) {
              this.reconstructor = null;
              super.emit("decoded", packet);
            }
          }
        } else {
          throw new Error("Unknown type: " + obj);
        }
      }
      decodeString(str) {
        let i = 0;
        const p = {
          type: Number(str.charAt(0))
        };
        if (PacketType[p.type] === void 0) {
          throw new Error("unknown packet type " + p.type);
        }
        if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
          const start = i + 1;
          while (str.charAt(++i) !== "-" && i != str.length) {
          }
          const buf = str.substring(start, i);
          if (buf != Number(buf) || str.charAt(i) !== "-") {
            throw new Error("Illegal attachments");
          }
          p.attachments = Number(buf);
        }
        if (str.charAt(i + 1) === "/") {
          const start = i + 1;
          while (++i) {
            const c = str.charAt(i);
            if (c === ",")
              break;
            if (i === str.length)
              break;
          }
          p.nsp = str.substring(start, i);
        } else {
          p.nsp = "/";
        }
        const next = str.charAt(i + 1);
        if (next !== "" && Number(next) == next) {
          const start = i + 1;
          while (++i) {
            const c = str.charAt(i);
            if (c == null || Number(c) != c) {
              --i;
              break;
            }
            if (i === str.length)
              break;
          }
          p.id = Number(str.substring(start, i + 1));
        }
        if (str.charAt(++i)) {
          const payload = tryParse(str.substr(i));
          if (Decoder.isPayloadValid(p.type, payload)) {
            p.data = payload;
          } else {
            throw new Error("invalid payload");
          }
        }
        debug("decoded %s as %j", str, p);
        return p;
      }
      static isPayloadValid(type, payload) {
        switch (type) {
          case PacketType.CONNECT:
            return typeof payload === "object";
          case PacketType.DISCONNECT:
            return payload === void 0;
          case PacketType.CONNECT_ERROR:
            return typeof payload === "string" || typeof payload === "object";
          case PacketType.EVENT:
          case PacketType.BINARY_EVENT:
            return Array.isArray(payload) && typeof payload[0] === "string";
          case PacketType.ACK:
          case PacketType.BINARY_ACK:
            return Array.isArray(payload);
        }
      }
      destroy() {
        if (this.reconstructor) {
          this.reconstructor.finishedReconstruction();
        }
      }
    }
    exports.Decoder = Decoder;
    function tryParse(str) {
      try {
        return JSON.parse(str);
      } catch (e) {
        return false;
      }
    }
    class BinaryReconstructor {
      constructor(packet) {
        this.packet = packet;
        this.buffers = [];
        this.reconPack = packet;
      }
      takeBinaryData(binData) {
        this.buffers.push(binData);
        if (this.buffers.length === this.reconPack.attachments) {
          const packet = binary_1.reconstructPacket(this.reconPack, this.buffers);
          this.finishedReconstruction();
          return packet;
        }
        return null;
      }
      finishedReconstruction() {
        this.reconPack = null;
        this.buffers = [];
      }
    }
  });

  // ../../node_modules/socket.io-client/build/on.js
  var require_on = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.on = void 0;
    function on(obj, ev, fn) {
      obj.on(ev, fn);
      return {
        destroy: function() {
          obj.removeListener(ev, fn);
        }
      };
    }
    exports.on = on;
  });

  // ../../node_modules/component-bind/index.js
  var require_component_bind = __commonJS((exports, module) => {
    var slice = [].slice;
    module.exports = function(obj, fn) {
      if (typeof fn == "string")
        fn = obj[fn];
      if (typeof fn != "function")
        throw new Error("bind() requires a function");
      var args = slice.call(arguments, 2);
      return function() {
        return fn.apply(obj, args.concat(slice.call(arguments)));
      };
    };
  });

  // ../../node_modules/socket.io-client/build/socket.js
  var require_socket2 = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Socket = void 0;
    const socket_io_parser_1 = require_dist();
    const Emitter = require_component_emitter();
    const on_1 = require_on();
    const bind = require_component_bind();
    const debug = require_browser()("socket.io-client:socket");
    const RESERVED_EVENTS = {
      connect: 1,
      connect_error: 1,
      disconnect: 1,
      disconnecting: 1,
      newListener: 1,
      removeListener: 1
    };
    class Socket extends Emitter {
      constructor(io2, nsp, opts) {
        super();
        this.ids = 0;
        this.acks = {};
        this.receiveBuffer = [];
        this.sendBuffer = [];
        this.flags = {};
        this.io = io2;
        this.nsp = nsp;
        this.ids = 0;
        this.acks = {};
        this.receiveBuffer = [];
        this.sendBuffer = [];
        this.connected = false;
        this.disconnected = true;
        this.flags = {};
        if (opts && opts.auth) {
          this.auth = opts.auth;
        }
        if (this.io._autoConnect)
          this.open();
      }
      subEvents() {
        if (this.subs)
          return;
        const io2 = this.io;
        this.subs = [
          on_1.on(io2, "open", bind(this, "onopen")),
          on_1.on(io2, "packet", bind(this, "onpacket")),
          on_1.on(io2, "close", bind(this, "onclose"))
        ];
      }
      connect() {
        if (this.connected)
          return this;
        this.subEvents();
        if (!this.io._reconnecting)
          this.io.open();
        if (this.io._readyState === "open")
          this.onopen();
        return this;
      }
      open() {
        return this.connect();
      }
      send(...args) {
        args.unshift("message");
        this.emit.apply(this, args);
        return this;
      }
      emit(ev, ...args) {
        if (RESERVED_EVENTS.hasOwnProperty(ev)) {
          throw new Error('"' + ev + '" is a reserved event name');
        }
        args.unshift(ev);
        const packet = {
          type: socket_io_parser_1.PacketType.EVENT,
          data: args
        };
        packet.options = {};
        packet.options.compress = this.flags.compress !== false;
        if (typeof args[args.length - 1] === "function") {
          debug("emitting packet with ack id %d", this.ids);
          this.acks[this.ids] = args.pop();
          packet.id = this.ids++;
        }
        const isTransportWritable = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
        const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);
        if (discardPacket) {
          debug("discard packet as the transport is not currently writable");
        } else if (this.connected) {
          this.packet(packet);
        } else {
          this.sendBuffer.push(packet);
        }
        this.flags = {};
        return this;
      }
      packet(packet) {
        packet.nsp = this.nsp;
        this.io._packet(packet);
      }
      onopen() {
        debug("transport is open - connecting");
        if (typeof this.auth == "function") {
          this.auth((data) => {
            this.packet({type: socket_io_parser_1.PacketType.CONNECT, data});
          });
        } else {
          this.packet({type: socket_io_parser_1.PacketType.CONNECT, data: this.auth});
        }
      }
      onclose(reason) {
        debug("close (%s)", reason);
        this.connected = false;
        this.disconnected = true;
        delete this.id;
        super.emit("disconnect", reason);
      }
      onpacket(packet) {
        const sameNamespace = packet.nsp === this.nsp;
        if (!sameNamespace)
          return;
        switch (packet.type) {
          case socket_io_parser_1.PacketType.CONNECT:
            const id = packet.data.sid;
            this.onconnect(id);
            break;
          case socket_io_parser_1.PacketType.EVENT:
            this.onevent(packet);
            break;
          case socket_io_parser_1.PacketType.BINARY_EVENT:
            this.onevent(packet);
            break;
          case socket_io_parser_1.PacketType.ACK:
            this.onack(packet);
            break;
          case socket_io_parser_1.PacketType.BINARY_ACK:
            this.onack(packet);
            break;
          case socket_io_parser_1.PacketType.DISCONNECT:
            this.ondisconnect();
            break;
          case socket_io_parser_1.PacketType.CONNECT_ERROR:
            const err = new Error(packet.data.message);
            err.data = packet.data.data;
            super.emit("connect_error", err);
            break;
        }
      }
      onevent(packet) {
        const args = packet.data || [];
        debug("emitting event %j", args);
        if (packet.id != null) {
          debug("attaching ack callback to event");
          args.push(this.ack(packet.id));
        }
        if (this.connected) {
          this.emitEvent(args);
        } else {
          this.receiveBuffer.push(args);
        }
      }
      emitEvent(args) {
        if (this._anyListeners && this._anyListeners.length) {
          const listeners = this._anyListeners.slice();
          for (const listener of listeners) {
            listener.apply(this, args);
          }
        }
        super.emit.apply(this, args);
      }
      ack(id) {
        const self2 = this;
        let sent = false;
        return function(...args) {
          if (sent)
            return;
          sent = true;
          debug("sending ack %j", args);
          self2.packet({
            type: socket_io_parser_1.PacketType.ACK,
            id,
            data: args
          });
        };
      }
      onack(packet) {
        const ack = this.acks[packet.id];
        if (typeof ack === "function") {
          debug("calling ack %s with %j", packet.id, packet.data);
          ack.apply(this, packet.data);
          delete this.acks[packet.id];
        } else {
          debug("bad ack %s", packet.id);
        }
      }
      onconnect(id) {
        this.id = id;
        this.connected = true;
        this.disconnected = false;
        super.emit("connect");
        this.emitBuffered();
      }
      emitBuffered() {
        for (let i = 0; i < this.receiveBuffer.length; i++) {
          this.emitEvent(this.receiveBuffer[i]);
        }
        this.receiveBuffer = [];
        for (let i = 0; i < this.sendBuffer.length; i++) {
          this.packet(this.sendBuffer[i]);
        }
        this.sendBuffer = [];
      }
      ondisconnect() {
        debug("server disconnect (%s)", this.nsp);
        this.destroy();
        this.onclose("io server disconnect");
      }
      destroy() {
        if (this.subs) {
          for (let i = 0; i < this.subs.length; i++) {
            this.subs[i].destroy();
          }
          this.subs = null;
        }
        this.io._destroy(this);
      }
      disconnect() {
        if (this.connected) {
          debug("performing disconnect (%s)", this.nsp);
          this.packet({type: socket_io_parser_1.PacketType.DISCONNECT});
        }
        this.destroy();
        if (this.connected) {
          this.onclose("io client disconnect");
        }
        return this;
      }
      close() {
        return this.disconnect();
      }
      compress(compress) {
        this.flags.compress = compress;
        return this;
      }
      get volatile() {
        this.flags.volatile = true;
        return this;
      }
      onAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.push(listener);
        return this;
      }
      prependAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.unshift(listener);
        return this;
      }
      offAny(listener) {
        if (!this._anyListeners) {
          return this;
        }
        if (listener) {
          const listeners = this._anyListeners;
          for (let i = 0; i < listeners.length; i++) {
            if (listener === listeners[i]) {
              listeners.splice(i, 1);
              return this;
            }
          }
        } else {
          this._anyListeners = [];
        }
        return this;
      }
      listenersAny() {
        return this._anyListeners || [];
      }
    }
    exports.Socket = Socket;
  });

  // ../../node_modules/backo2/index.js
  var require_backo2 = __commonJS((exports, module) => {
    module.exports = Backoff;
    function Backoff(opts) {
      opts = opts || {};
      this.ms = opts.min || 100;
      this.max = opts.max || 1e4;
      this.factor = opts.factor || 2;
      this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
      this.attempts = 0;
    }
    Backoff.prototype.duration = function() {
      var ms = this.ms * Math.pow(this.factor, this.attempts++);
      if (this.jitter) {
        var rand = Math.random();
        var deviation = Math.floor(rand * this.jitter * ms);
        ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
      }
      return Math.min(ms, this.max) | 0;
    };
    Backoff.prototype.reset = function() {
      this.attempts = 0;
    };
    Backoff.prototype.setMin = function(min) {
      this.ms = min;
    };
    Backoff.prototype.setMax = function(max) {
      this.max = max;
    };
    Backoff.prototype.setJitter = function(jitter) {
      this.jitter = jitter;
    };
  });

  // ../../node_modules/socket.io-client/build/manager.js
  var require_manager = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Manager = void 0;
    const eio = require_lib2();
    const socket_1 = require_socket2();
    const Emitter = require_component_emitter();
    const parser = require_dist();
    const on_1 = require_on();
    const bind = require_component_bind();
    const Backoff = require_backo2();
    const debug = require_browser()("socket.io-client:manager");
    class Manager extends Emitter {
      constructor(uri, opts) {
        super();
        this.nsps = {};
        this.subs = [];
        this.connecting = [];
        if (uri && typeof uri === "object") {
          opts = uri;
          uri = void 0;
        }
        opts = opts || {};
        opts.path = opts.path || "/socket.io";
        this.opts = opts;
        this.reconnection(opts.reconnection !== false);
        this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
        this.reconnectionDelay(opts.reconnectionDelay || 1e3);
        this.reconnectionDelayMax(opts.reconnectionDelayMax || 5e3);
        this.randomizationFactor(opts.randomizationFactor || 0.5);
        this.backoff = new Backoff({
          min: this.reconnectionDelay(),
          max: this.reconnectionDelayMax(),
          jitter: this.randomizationFactor()
        });
        this.timeout(opts.timeout == null ? 2e4 : opts.timeout);
        this._readyState = "closed";
        this.uri = uri;
        const _parser = opts.parser || parser;
        this.encoder = new _parser.Encoder();
        this.decoder = new _parser.Decoder();
        this._autoConnect = opts.autoConnect !== false;
        if (this._autoConnect)
          this.open();
      }
      reconnection(v) {
        if (!arguments.length)
          return this._reconnection;
        this._reconnection = !!v;
        return this;
      }
      reconnectionAttempts(v) {
        if (v === void 0)
          return this._reconnectionAttempts;
        this._reconnectionAttempts = v;
        return this;
      }
      reconnectionDelay(v) {
        if (v === void 0)
          return this._reconnectionDelay;
        this._reconnectionDelay = v;
        this.backoff && this.backoff.setMin(v);
        return this;
      }
      randomizationFactor(v) {
        if (v === void 0)
          return this._randomizationFactor;
        this._randomizationFactor = v;
        this.backoff && this.backoff.setJitter(v);
        return this;
      }
      reconnectionDelayMax(v) {
        if (v === void 0)
          return this._reconnectionDelayMax;
        this._reconnectionDelayMax = v;
        this.backoff && this.backoff.setMax(v);
        return this;
      }
      timeout(v) {
        if (!arguments.length)
          return this._timeout;
        this._timeout = v;
        return this;
      }
      maybeReconnectOnOpen() {
        if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) {
          this.reconnect();
        }
      }
      open(fn) {
        debug("readyState %s", this._readyState);
        if (~this._readyState.indexOf("open"))
          return this;
        debug("opening %s", this.uri);
        this.engine = eio(this.uri, this.opts);
        const socket3 = this.engine;
        const self2 = this;
        this._readyState = "opening";
        this.skipReconnect = false;
        const openSub = on_1.on(socket3, "open", function() {
          self2.onopen();
          fn && fn();
        });
        const errorSub = on_1.on(socket3, "error", (err) => {
          debug("error");
          self2.cleanup();
          self2._readyState = "closed";
          super.emit("error", err);
          if (fn) {
            fn(err);
          } else {
            self2.maybeReconnectOnOpen();
          }
        });
        if (this._timeout !== false) {
          const timeout = this._timeout;
          debug("connect attempt will timeout after %d", timeout);
          if (timeout === 0) {
            openSub.destroy();
          }
          const timer = setTimeout(() => {
            debug("connect attempt timed out after %d", timeout);
            openSub.destroy();
            socket3.close();
            socket3.emit("error", new Error("timeout"));
          }, timeout);
          this.subs.push({
            destroy: function() {
              clearTimeout(timer);
            }
          });
        }
        this.subs.push(openSub);
        this.subs.push(errorSub);
        return this;
      }
      connect(fn) {
        return this.open(fn);
      }
      onopen() {
        debug("open");
        this.cleanup();
        this._readyState = "open";
        super.emit("open");
        const socket3 = this.engine;
        this.subs.push(on_1.on(socket3, "data", bind(this, "ondata")));
        this.subs.push(on_1.on(socket3, "ping", bind(this, "onping")));
        this.subs.push(on_1.on(socket3, "error", bind(this, "onerror")));
        this.subs.push(on_1.on(socket3, "close", bind(this, "onclose")));
        this.subs.push(on_1.on(this.decoder, "decoded", bind(this, "ondecoded")));
      }
      onping() {
        super.emit("ping");
      }
      ondata(data) {
        this.decoder.add(data);
      }
      ondecoded(packet) {
        super.emit("packet", packet);
      }
      onerror(err) {
        debug("error", err);
        super.emit("error", err);
      }
      socket(nsp, opts) {
        let socket3 = this.nsps[nsp];
        if (!socket3) {
          socket3 = new socket_1.Socket(this, nsp, opts);
          this.nsps[nsp] = socket3;
          var self2 = this;
          socket3.on("connecting", onConnecting);
          if (this._autoConnect) {
            onConnecting();
          }
        }
        function onConnecting() {
          if (!~self2.connecting.indexOf(socket3)) {
            self2.connecting.push(socket3);
          }
        }
        return socket3;
      }
      _destroy(socket3) {
        const index = this.connecting.indexOf(socket3);
        if (~index)
          this.connecting.splice(index, 1);
        if (this.connecting.length)
          return;
        this._close();
      }
      _packet(packet) {
        debug("writing packet %j", packet);
        if (packet.query && packet.type === 0)
          packet.nsp += "?" + packet.query;
        const encodedPackets = this.encoder.encode(packet);
        for (let i = 0; i < encodedPackets.length; i++) {
          this.engine.write(encodedPackets[i], packet.options);
        }
      }
      cleanup() {
        debug("cleanup");
        const subsLength = this.subs.length;
        for (let i = 0; i < subsLength; i++) {
          const sub = this.subs.shift();
          sub.destroy();
        }
        this.decoder.destroy();
      }
      _close() {
        debug("disconnect");
        this.skipReconnect = true;
        this._reconnecting = false;
        if (this._readyState === "opening") {
          this.cleanup();
        }
        this.backoff.reset();
        this._readyState = "closed";
        if (this.engine)
          this.engine.close();
      }
      disconnect() {
        return this._close();
      }
      onclose(reason) {
        debug("onclose");
        this.cleanup();
        this.backoff.reset();
        this._readyState = "closed";
        super.emit("close", reason);
        if (this._reconnection && !this.skipReconnect) {
          this.reconnect();
        }
      }
      reconnect() {
        if (this._reconnecting || this.skipReconnect)
          return this;
        const self2 = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) {
          debug("reconnect failed");
          this.backoff.reset();
          super.emit("reconnect_failed");
          this._reconnecting = false;
        } else {
          const delay = this.backoff.duration();
          debug("will wait %dms before reconnect attempt", delay);
          this._reconnecting = true;
          const timer = setTimeout(() => {
            if (self2.skipReconnect)
              return;
            debug("attempting reconnect");
            super.emit("reconnect_attempt", self2.backoff.attempts);
            if (self2.skipReconnect)
              return;
            self2.open((err) => {
              if (err) {
                debug("reconnect attempt error");
                self2._reconnecting = false;
                self2.reconnect();
                super.emit("reconnect_error", err);
              } else {
                debug("reconnect success");
                self2.onreconnect();
              }
            });
          }, delay);
          this.subs.push({
            destroy: function() {
              clearTimeout(timer);
            }
          });
        }
      }
      onreconnect() {
        const attempt = this.backoff.attempts;
        this._reconnecting = false;
        this.backoff.reset();
        super.emit("reconnect", attempt);
      }
    }
    exports.Manager = Manager;
  });

  // ../../node_modules/socket.io-client/build/index.js
  var require_build = __commonJS((exports, module) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Socket = exports.io = exports.Manager = exports.protocol = void 0;
    const url_1 = require_url();
    const manager_1 = require_manager();
    const socket_1 = require_socket2();
    Object.defineProperty(exports, "Socket", {enumerable: true, get: function() {
      return socket_1.Socket;
    }});
    const debug = require_browser()("socket.io-client");
    module.exports = exports = lookup;
    const cache = exports.managers = {};
    function lookup(uri, opts) {
      if (typeof uri === "object") {
        opts = uri;
        uri = void 0;
      }
      opts = opts || {};
      const parsed = url_1.url(uri);
      const source = parsed.source;
      const id = parsed.id;
      const path = parsed.path;
      const sameNamespace = cache[id] && path in cache[id].nsps;
      const newConnection = opts.forceNew || opts["force new connection"] || opts.multiplex === false || sameNamespace;
      let io2;
      if (newConnection) {
        debug("ignoring socket cache for %s", source);
        io2 = new manager_1.Manager(source, opts);
      } else {
        if (!cache[id]) {
          debug("new io instance for %s", source);
          cache[id] = new manager_1.Manager(source, opts);
        }
        io2 = cache[id];
      }
      if (parsed.query && !opts.query) {
        opts.query = parsed.query;
      }
      return io2.socket(parsed.path, opts);
    }
    exports.io = lookup;
    var socket_io_parser_1 = require_dist();
    Object.defineProperty(exports, "protocol", {enumerable: true, get: function() {
      return socket_io_parser_1.protocol;
    }});
    exports.connect = lookup;
    var manager_2 = require_manager();
    Object.defineProperty(exports, "Manager", {enumerable: true, get: function() {
      return manager_2.Manager;
    }});
  });

  // client-entry/client-entry.ts
  const socket = __toModule(require_build());
  const socket2 = socket.io(`http://localhost:${__ESBUILD_CLI_INTERNAL__.PORT}`);
  socket2.on("browserReload", () => {
    document.location.reload();
  });
})();
