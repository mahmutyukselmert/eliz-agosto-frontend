var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/dom/data.js
var require_data = __commonJS({
  "node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/dom/data.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Data = factory());
    })(exports, (function() {
      "use strict";
      const elementMap = /* @__PURE__ */ new Map();
      const data = {
        set(element, key2, instance2) {
          if (!elementMap.has(element)) {
            elementMap.set(element, /* @__PURE__ */ new Map());
          }
          const instanceMap = elementMap.get(element);
          if (!instanceMap.has(key2) && instanceMap.size !== 0) {
            console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
            return;
          }
          instanceMap.set(key2, instance2);
        },
        get(element, key2) {
          if (elementMap.has(element)) {
            return elementMap.get(element).get(key2) || null;
          }
          return null;
        },
        remove(element, key2) {
          if (!elementMap.has(element)) {
            return;
          }
          const instanceMap = elementMap.get(element);
          instanceMap.delete(key2);
          if (instanceMap.size === 0) {
            elementMap.delete(element);
          }
        }
      };
      return data;
    }));
  }
});

// node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/util/index.js
var require_util = __commonJS({
  "node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/util/index.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.Index = {}));
    })(exports, (function(exports2) {
      "use strict";
      const MAX_UID = 1e6;
      const MILLISECONDS_MULTIPLIER = 1e3;
      const TRANSITION_END = "transitionend";
      const parseSelector = (selector) => {
        if (selector && window.CSS && window.CSS.escape) {
          selector = selector.replace(/#([^\s"#']+)/g, (match, id) => `#${CSS.escape(id)}`);
        }
        return selector;
      };
      const toType = (object) => {
        if (object === null || object === void 0) {
          return `${object}`;
        }
        return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
      };
      const getUID = (prefix) => {
        do {
          prefix += Math.floor(Math.random() * MAX_UID);
        } while (document.getElementById(prefix));
        return prefix;
      };
      const getTransitionDurationFromElement = (element) => {
        if (!element) {
          return 0;
        }
        let {
          transitionDuration,
          transitionDelay
        } = window.getComputedStyle(element);
        const floatTransitionDuration = Number.parseFloat(transitionDuration);
        const floatTransitionDelay = Number.parseFloat(transitionDelay);
        if (!floatTransitionDuration && !floatTransitionDelay) {
          return 0;
        }
        transitionDuration = transitionDuration.split(",")[0];
        transitionDelay = transitionDelay.split(",")[0];
        return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
      };
      const triggerTransitionEnd = (element) => {
        element.dispatchEvent(new Event(TRANSITION_END));
      };
      const isElement = (object) => {
        if (!object || typeof object !== "object") {
          return false;
        }
        if (typeof object.jquery !== "undefined") {
          object = object[0];
        }
        return typeof object.nodeType !== "undefined";
      };
      const getElement = (object) => {
        if (isElement(object)) {
          return object.jquery ? object[0] : object;
        }
        if (typeof object === "string" && object.length > 0) {
          return document.querySelector(parseSelector(object));
        }
        return null;
      };
      const isVisible = (element) => {
        if (!isElement(element) || element.getClientRects().length === 0) {
          return false;
        }
        const elementIsVisible = getComputedStyle(element).getPropertyValue("visibility") === "visible";
        const closedDetails = element.closest("details:not([open])");
        if (!closedDetails) {
          return elementIsVisible;
        }
        if (closedDetails !== element) {
          const summary = element.closest("summary");
          if (summary && summary.parentNode !== closedDetails) {
            return false;
          }
          if (summary === null) {
            return false;
          }
        }
        return elementIsVisible;
      };
      const isDisabled = (element) => {
        if (!element || element.nodeType !== Node.ELEMENT_NODE) {
          return true;
        }
        if (element.classList.contains("disabled")) {
          return true;
        }
        if (typeof element.disabled !== "undefined") {
          return element.disabled;
        }
        return element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false";
      };
      const findShadowRoot = (element) => {
        if (!document.documentElement.attachShadow) {
          return null;
        }
        if (typeof element.getRootNode === "function") {
          const root = element.getRootNode();
          return root instanceof ShadowRoot ? root : null;
        }
        if (element instanceof ShadowRoot) {
          return element;
        }
        if (!element.parentNode) {
          return null;
        }
        return findShadowRoot(element.parentNode);
      };
      const noop2 = () => {
      };
      const reflow = (element) => {
        element.offsetHeight;
      };
      const getjQuery = () => {
        if (window.jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
          return window.jQuery;
        }
        return null;
      };
      const DOMContentLoadedCallbacks = [];
      const onDOMContentLoaded = (callback) => {
        if (document.readyState === "loading") {
          if (!DOMContentLoadedCallbacks.length) {
            document.addEventListener("DOMContentLoaded", () => {
              for (const callback2 of DOMContentLoadedCallbacks) {
                callback2();
              }
            });
          }
          DOMContentLoadedCallbacks.push(callback);
        } else {
          callback();
        }
      };
      const isRTL = () => document.documentElement.dir === "rtl";
      const defineJQueryPlugin = (plugin) => {
        onDOMContentLoaded(() => {
          const $ = getjQuery();
          if ($) {
            const name = plugin.NAME;
            const JQUERY_NO_CONFLICT = $.fn[name];
            $.fn[name] = plugin.jQueryInterface;
            $.fn[name].Constructor = plugin;
            $.fn[name].noConflict = () => {
              $.fn[name] = JQUERY_NO_CONFLICT;
              return plugin.jQueryInterface;
            };
          }
        });
      };
      const execute = (possibleCallback, args = [], defaultValue = possibleCallback) => {
        return typeof possibleCallback === "function" ? possibleCallback.call(...args) : defaultValue;
      };
      const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
        if (!waitForTransition) {
          execute(callback);
          return;
        }
        const durationPadding = 5;
        const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
        let called = false;
        const handler = ({
          target
        }) => {
          if (target !== transitionElement) {
            return;
          }
          called = true;
          transitionElement.removeEventListener(TRANSITION_END, handler);
          execute(callback);
        };
        transitionElement.addEventListener(TRANSITION_END, handler);
        setTimeout(() => {
          if (!called) {
            triggerTransitionEnd(transitionElement);
          }
        }, emulatedDuration);
      };
      const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
        const listLength = list.length;
        let index2 = list.indexOf(activeElement);
        if (index2 === -1) {
          return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
        }
        index2 += shouldGetNext ? 1 : -1;
        if (isCycleAllowed) {
          index2 = (index2 + listLength) % listLength;
        }
        return list[Math.max(0, Math.min(index2, listLength - 1))];
      };
      exports2.defineJQueryPlugin = defineJQueryPlugin;
      exports2.execute = execute;
      exports2.executeAfterTransition = executeAfterTransition;
      exports2.findShadowRoot = findShadowRoot;
      exports2.getElement = getElement;
      exports2.getNextActiveElement = getNextActiveElement;
      exports2.getTransitionDurationFromElement = getTransitionDurationFromElement;
      exports2.getUID = getUID;
      exports2.getjQuery = getjQuery;
      exports2.isDisabled = isDisabled;
      exports2.isElement = isElement;
      exports2.isRTL = isRTL;
      exports2.isVisible = isVisible;
      exports2.noop = noop2;
      exports2.onDOMContentLoaded = onDOMContentLoaded;
      exports2.parseSelector = parseSelector;
      exports2.reflow = reflow;
      exports2.toType = toType;
      exports2.triggerTransitionEnd = triggerTransitionEnd;
      Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
    }));
  }
});

// node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/dom/event-handler.js
var require_event_handler = __commonJS({
  "node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/dom/event-handler.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_util()) : typeof define === "function" && define.amd ? define(["../util/index"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.EventHandler = factory(global.Index));
    })(exports, (function(index_js) {
      "use strict";
      const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
      const stripNameRegex = /\..*/;
      const stripUidRegex = /::\d+$/;
      const eventRegistry = {};
      let uidEvent = 1;
      const customEvents = {
        mouseenter: "mouseover",
        mouseleave: "mouseout"
      };
      const nativeEvents = /* @__PURE__ */ new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
      function makeEventUid(element, uid) {
        return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
      }
      function getElementEvents(element) {
        const uid = makeEventUid(element);
        element.uidEvent = uid;
        eventRegistry[uid] = eventRegistry[uid] || {};
        return eventRegistry[uid];
      }
      function bootstrapHandler(element, fn) {
        return function handler(event) {
          hydrateObj(event, {
            delegateTarget: element
          });
          if (handler.oneOff) {
            EventHandler2.off(element, event.type, fn);
          }
          return fn.apply(element, [event]);
        };
      }
      function bootstrapDelegationHandler(element, selector, fn) {
        return function handler(event) {
          const domElements = element.querySelectorAll(selector);
          for (let {
            target
          } = event; target && target !== this; target = target.parentNode) {
            for (const domElement of domElements) {
              if (domElement !== target) {
                continue;
              }
              hydrateObj(event, {
                delegateTarget: target
              });
              if (handler.oneOff) {
                EventHandler2.off(element, event.type, selector, fn);
              }
              return fn.apply(target, [event]);
            }
          }
        };
      }
      function findHandler(events, callable, delegationSelector = null) {
        return Object.values(events).find((event) => event.callable === callable && event.delegationSelector === delegationSelector);
      }
      function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
        const isDelegated = typeof handler === "string";
        const callable = isDelegated ? delegationFunction : handler || delegationFunction;
        let typeEvent = getTypeEvent(originalTypeEvent);
        if (!nativeEvents.has(typeEvent)) {
          typeEvent = originalTypeEvent;
        }
        return [isDelegated, callable, typeEvent];
      }
      function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
        if (typeof originalTypeEvent !== "string" || !element) {
          return;
        }
        let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
        if (originalTypeEvent in customEvents) {
          const wrapFunction = (fn2) => {
            return function(event) {
              if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
                return fn2.call(this, event);
              }
            };
          };
          callable = wrapFunction(callable);
        }
        const events = getElementEvents(element);
        const handlers = events[typeEvent] || (events[typeEvent] = {});
        const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
        if (previousFunction) {
          previousFunction.oneOff = previousFunction.oneOff && oneOff;
          return;
        }
        const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ""));
        const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
        fn.delegationSelector = isDelegated ? handler : null;
        fn.callable = callable;
        fn.oneOff = oneOff;
        fn.uidEvent = uid;
        handlers[uid] = fn;
        element.addEventListener(typeEvent, fn, isDelegated);
      }
      function removeHandler(element, events, typeEvent, handler, delegationSelector) {
        const fn = findHandler(events[typeEvent], handler, delegationSelector);
        if (!fn) {
          return;
        }
        element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
        delete events[typeEvent][fn.uidEvent];
      }
      function removeNamespacedHandlers(element, events, typeEvent, namespace) {
        const storeElementEvent = events[typeEvent] || {};
        for (const [handlerKey, event] of Object.entries(storeElementEvent)) {
          if (handlerKey.includes(namespace)) {
            removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
          }
        }
      }
      function getTypeEvent(event) {
        event = event.replace(stripNameRegex, "");
        return customEvents[event] || event;
      }
      const EventHandler2 = {
        on(element, event, handler, delegationFunction) {
          addHandler(element, event, handler, delegationFunction, false);
        },
        one(element, event, handler, delegationFunction) {
          addHandler(element, event, handler, delegationFunction, true);
        },
        off(element, originalTypeEvent, handler, delegationFunction) {
          if (typeof originalTypeEvent !== "string" || !element) {
            return;
          }
          const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
          const inNamespace = typeEvent !== originalTypeEvent;
          const events = getElementEvents(element);
          const storeElementEvent = events[typeEvent] || {};
          const isNamespace = originalTypeEvent.startsWith(".");
          if (typeof callable !== "undefined") {
            if (!Object.keys(storeElementEvent).length) {
              return;
            }
            removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
            return;
          }
          if (isNamespace) {
            for (const elementEvent of Object.keys(events)) {
              removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
            }
          }
          for (const [keyHandlers, event] of Object.entries(storeElementEvent)) {
            const handlerKey = keyHandlers.replace(stripUidRegex, "");
            if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
              removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
            }
          }
        },
        trigger(element, event, args) {
          if (typeof event !== "string" || !element) {
            return null;
          }
          const $ = index_js.getjQuery();
          const typeEvent = getTypeEvent(event);
          const inNamespace = event !== typeEvent;
          let jQueryEvent = null;
          let bubbles = true;
          let nativeDispatch = true;
          let defaultPrevented = false;
          if (inNamespace && $) {
            jQueryEvent = $.Event(event, args);
            $(element).trigger(jQueryEvent);
            bubbles = !jQueryEvent.isPropagationStopped();
            nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
            defaultPrevented = jQueryEvent.isDefaultPrevented();
          }
          const evt = hydrateObj(new Event(event, {
            bubbles,
            cancelable: true
          }), args);
          if (defaultPrevented) {
            evt.preventDefault();
          }
          if (nativeDispatch) {
            element.dispatchEvent(evt);
          }
          if (evt.defaultPrevented && jQueryEvent) {
            jQueryEvent.preventDefault();
          }
          return evt;
        }
      };
      function hydrateObj(obj, meta = {}) {
        for (const [key2, value] of Object.entries(meta)) {
          try {
            obj[key2] = value;
          } catch (_unused) {
            Object.defineProperty(obj, key2, {
              configurable: true,
              get() {
                return value;
              }
            });
          }
        }
        return obj;
      }
      return EventHandler2;
    }));
  }
});

// node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/dom/manipulator.js
var require_manipulator = __commonJS({
  "node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/dom/manipulator.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Manipulator = factory());
    })(exports, (function() {
      "use strict";
      function normalizeData(value) {
        if (value === "true") {
          return true;
        }
        if (value === "false") {
          return false;
        }
        if (value === Number(value).toString()) {
          return Number(value);
        }
        if (value === "" || value === "null") {
          return null;
        }
        if (typeof value !== "string") {
          return value;
        }
        try {
          return JSON.parse(decodeURIComponent(value));
        } catch (_unused) {
          return value;
        }
      }
      function normalizeDataKey(key2) {
        return key2.replace(/[A-Z]/g, (chr) => `-${chr.toLowerCase()}`);
      }
      const Manipulator = {
        setDataAttribute(element, key2, value) {
          element.setAttribute(`data-bs-${normalizeDataKey(key2)}`, value);
        },
        removeDataAttribute(element, key2) {
          element.removeAttribute(`data-bs-${normalizeDataKey(key2)}`);
        },
        getDataAttributes(element) {
          if (!element) {
            return {};
          }
          const attributes = {};
          const bsKeys = Object.keys(element.dataset).filter((key2) => key2.startsWith("bs") && !key2.startsWith("bsConfig"));
          for (const key2 of bsKeys) {
            let pureKey = key2.replace(/^bs/, "");
            pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1);
            attributes[pureKey] = normalizeData(element.dataset[key2]);
          }
          return attributes;
        },
        getDataAttribute(element, key2) {
          return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key2)}`));
        }
      };
      return Manipulator;
    }));
  }
});

// node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/util/config.js
var require_config = __commonJS({
  "node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/util/config.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_manipulator(), require_util()) : typeof define === "function" && define.amd ? define(["../dom/manipulator", "./index"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Config = factory(global.Manipulator, global.Index));
    })(exports, (function(Manipulator, index_js) {
      "use strict";
      class Config {
        // Getters
        static get Default() {
          return {};
        }
        static get DefaultType() {
          return {};
        }
        static get NAME() {
          throw new Error('You have to implement the static method "NAME", for each component!');
        }
        _getConfig(config2) {
          config2 = this._mergeConfigObj(config2);
          config2 = this._configAfterMerge(config2);
          this._typeCheckConfig(config2);
          return config2;
        }
        _configAfterMerge(config2) {
          return config2;
        }
        _mergeConfigObj(config2, element) {
          const jsonConfig = index_js.isElement(element) ? Manipulator.getDataAttribute(element, "config") : {};
          return {
            ...this.constructor.Default,
            ...typeof jsonConfig === "object" ? jsonConfig : {},
            ...index_js.isElement(element) ? Manipulator.getDataAttributes(element) : {},
            ...typeof config2 === "object" ? config2 : {}
          };
        }
        _typeCheckConfig(config2, configTypes = this.constructor.DefaultType) {
          for (const [property, expectedTypes] of Object.entries(configTypes)) {
            const value = config2[property];
            const valueType = index_js.isElement(value) ? "element" : index_js.toType(value);
            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
            }
          }
        }
      }
      return Config;
    }));
  }
});

// node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/base-component.js
var require_base_component = __commonJS({
  "node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/base-component.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_data(), require_event_handler(), require_config(), require_util()) : typeof define === "function" && define.amd ? define(["./dom/data", "./dom/event-handler", "./util/config", "./util/index"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.BaseComponent = factory(global.Data, global.EventHandler, global.Config, global.Index));
    })(exports, (function(Data, EventHandler2, Config, index_js) {
      "use strict";
      const VERSION = "5.3.8";
      class BaseComponent extends Config {
        constructor(element, config2) {
          super();
          element = index_js.getElement(element);
          if (!element) {
            return;
          }
          this._element = element;
          this._config = this._getConfig(config2);
          Data.set(this._element, this.constructor.DATA_KEY, this);
        }
        // Public
        dispose() {
          Data.remove(this._element, this.constructor.DATA_KEY);
          EventHandler2.off(this._element, this.constructor.EVENT_KEY);
          for (const propertyName of Object.getOwnPropertyNames(this)) {
            this[propertyName] = null;
          }
        }
        // Private
        _queueCallback(callback, element, isAnimated = true) {
          index_js.executeAfterTransition(callback, element, isAnimated);
        }
        _getConfig(config2) {
          config2 = this._mergeConfigObj(config2, this._element);
          config2 = this._configAfterMerge(config2);
          this._typeCheckConfig(config2);
          return config2;
        }
        // Static
        static getInstance(element) {
          return Data.get(index_js.getElement(element), this.DATA_KEY);
        }
        static getOrCreateInstance(element, config2 = {}) {
          return this.getInstance(element) || new this(element, typeof config2 === "object" ? config2 : null);
        }
        static get VERSION() {
          return VERSION;
        }
        static get DATA_KEY() {
          return `bs.${this.NAME}`;
        }
        static get EVENT_KEY() {
          return `.${this.DATA_KEY}`;
        }
        static eventName(name) {
          return `${name}${this.EVENT_KEY}`;
        }
      }
      return BaseComponent;
    }));
  }
});

// node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/dom/selector-engine.js
var require_selector_engine = __commonJS({
  "node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/dom/selector-engine.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_util()) : typeof define === "function" && define.amd ? define(["../util/index"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.SelectorEngine = factory(global.Index));
    })(exports, (function(index_js) {
      "use strict";
      const getSelector = (element) => {
        let selector = element.getAttribute("data-bs-target");
        if (!selector || selector === "#") {
          let hrefAttribute = element.getAttribute("href");
          if (!hrefAttribute || !hrefAttribute.includes("#") && !hrefAttribute.startsWith(".")) {
            return null;
          }
          if (hrefAttribute.includes("#") && !hrefAttribute.startsWith("#")) {
            hrefAttribute = `#${hrefAttribute.split("#")[1]}`;
          }
          selector = hrefAttribute && hrefAttribute !== "#" ? hrefAttribute.trim() : null;
        }
        return selector ? selector.split(",").map((sel) => index_js.parseSelector(sel)).join(",") : null;
      };
      const SelectorEngine = {
        find(selector, element = document.documentElement) {
          return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
        },
        findOne(selector, element = document.documentElement) {
          return Element.prototype.querySelector.call(element, selector);
        },
        children(element, selector) {
          return [].concat(...element.children).filter((child) => child.matches(selector));
        },
        parents(element, selector) {
          const parents = [];
          let ancestor = element.parentNode.closest(selector);
          while (ancestor) {
            parents.push(ancestor);
            ancestor = ancestor.parentNode.closest(selector);
          }
          return parents;
        },
        prev(element, selector) {
          let previous = element.previousElementSibling;
          while (previous) {
            if (previous.matches(selector)) {
              return [previous];
            }
            previous = previous.previousElementSibling;
          }
          return [];
        },
        // TODO: this is now unused; remove later along with prev()
        next(element, selector) {
          let next = element.nextElementSibling;
          while (next) {
            if (next.matches(selector)) {
              return [next];
            }
            next = next.nextElementSibling;
          }
          return [];
        },
        focusableChildren(element) {
          const focusables = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((selector) => `${selector}:not([tabindex^="-"])`).join(",");
          return this.find(focusables, element).filter((el) => !index_js.isDisabled(el) && index_js.isVisible(el));
        },
        getSelectorFromElement(element) {
          const selector = getSelector(element);
          if (selector) {
            return SelectorEngine.findOne(selector) ? selector : null;
          }
          return null;
        },
        getElementFromSelector(element) {
          const selector = getSelector(element);
          return selector ? SelectorEngine.findOne(selector) : null;
        },
        getMultipleElementsFromSelector(element) {
          const selector = getSelector(element);
          return selector ? SelectorEngine.find(selector) : [];
        }
      };
      return SelectorEngine;
    }));
  }
});

// node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/util/swipe.js
var require_swipe = __commonJS({
  "node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/util/swipe.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_event_handler(), require_config(), require_util()) : typeof define === "function" && define.amd ? define(["../dom/event-handler", "./config", "./index"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Swipe = factory(global.EventHandler, global.Config, global.Index));
    })(exports, (function(EventHandler2, Config, index_js) {
      "use strict";
      const NAME = "swipe";
      const EVENT_KEY = ".bs.swipe";
      const EVENT_TOUCHSTART = `touchstart${EVENT_KEY}`;
      const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY}`;
      const EVENT_TOUCHEND = `touchend${EVENT_KEY}`;
      const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY}`;
      const EVENT_POINTERUP = `pointerup${EVENT_KEY}`;
      const POINTER_TYPE_TOUCH = "touch";
      const POINTER_TYPE_PEN = "pen";
      const CLASS_NAME_POINTER_EVENT = "pointer-event";
      const SWIPE_THRESHOLD = 40;
      const Default = {
        endCallback: null,
        leftCallback: null,
        rightCallback: null
      };
      const DefaultType = {
        endCallback: "(function|null)",
        leftCallback: "(function|null)",
        rightCallback: "(function|null)"
      };
      class Swipe extends Config {
        constructor(element, config2) {
          super();
          this._element = element;
          if (!element || !Swipe.isSupported()) {
            return;
          }
          this._config = this._getConfig(config2);
          this._deltaX = 0;
          this._supportPointerEvents = Boolean(window.PointerEvent);
          this._initEvents();
        }
        // Getters
        static get Default() {
          return Default;
        }
        static get DefaultType() {
          return DefaultType;
        }
        static get NAME() {
          return NAME;
        }
        // Public
        dispose() {
          EventHandler2.off(this._element, EVENT_KEY);
        }
        // Private
        _start(event) {
          if (!this._supportPointerEvents) {
            this._deltaX = event.touches[0].clientX;
            return;
          }
          if (this._eventIsPointerPenTouch(event)) {
            this._deltaX = event.clientX;
          }
        }
        _end(event) {
          if (this._eventIsPointerPenTouch(event)) {
            this._deltaX = event.clientX - this._deltaX;
          }
          this._handleSwipe();
          index_js.execute(this._config.endCallback);
        }
        _move(event) {
          this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
        }
        _handleSwipe() {
          const absDeltaX = Math.abs(this._deltaX);
          if (absDeltaX <= SWIPE_THRESHOLD) {
            return;
          }
          const direction = absDeltaX / this._deltaX;
          this._deltaX = 0;
          if (!direction) {
            return;
          }
          index_js.execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
        }
        _initEvents() {
          if (this._supportPointerEvents) {
            EventHandler2.on(this._element, EVENT_POINTERDOWN, (event) => this._start(event));
            EventHandler2.on(this._element, EVENT_POINTERUP, (event) => this._end(event));
            this._element.classList.add(CLASS_NAME_POINTER_EVENT);
          } else {
            EventHandler2.on(this._element, EVENT_TOUCHSTART, (event) => this._start(event));
            EventHandler2.on(this._element, EVENT_TOUCHMOVE, (event) => this._move(event));
            EventHandler2.on(this._element, EVENT_TOUCHEND, (event) => this._end(event));
          }
        }
        _eventIsPointerPenTouch(event) {
          return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
        }
        // Static
        static isSupported() {
          return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
        }
      }
      return Swipe;
    }));
  }
});

// node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/carousel.js
var require_carousel = __commonJS({
  "node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/carousel.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_base_component(), require_event_handler(), require_manipulator(), require_selector_engine(), require_util(), require_swipe()) : typeof define === "function" && define.amd ? define(["./base-component", "./dom/event-handler", "./dom/manipulator", "./dom/selector-engine", "./util/index", "./util/swipe"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Carousel = factory(global.BaseComponent, global.EventHandler, global.Manipulator, global.SelectorEngine, global.Index, global.Swipe));
    })(exports, (function(BaseComponent, EventHandler2, Manipulator, SelectorEngine, index_js, Swipe) {
      "use strict";
      const NAME = "carousel";
      const DATA_KEY = "bs.carousel";
      const EVENT_KEY = `.${DATA_KEY}`;
      const DATA_API_KEY = ".data-api";
      const ARROW_LEFT_KEY = "ArrowLeft";
      const ARROW_RIGHT_KEY = "ArrowRight";
      const TOUCHEVENT_COMPAT_WAIT = 500;
      const ORDER_NEXT = "next";
      const ORDER_PREV = "prev";
      const DIRECTION_LEFT = "left";
      const DIRECTION_RIGHT = "right";
      const EVENT_SLIDE = `slide${EVENT_KEY}`;
      const EVENT_SLID = `slid${EVENT_KEY}`;
      const EVENT_KEYDOWN = `keydown${EVENT_KEY}`;
      const EVENT_MOUSEENTER = `mouseenter${EVENT_KEY}`;
      const EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY}`;
      const EVENT_DRAG_START = `dragstart${EVENT_KEY}`;
      const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
      const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
      const CLASS_NAME_CAROUSEL = "carousel";
      const CLASS_NAME_ACTIVE = "active";
      const CLASS_NAME_SLIDE = "slide";
      const CLASS_NAME_END = "carousel-item-end";
      const CLASS_NAME_START = "carousel-item-start";
      const CLASS_NAME_NEXT = "carousel-item-next";
      const CLASS_NAME_PREV = "carousel-item-prev";
      const SELECTOR_ACTIVE = ".active";
      const SELECTOR_ITEM = ".carousel-item";
      const SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM;
      const SELECTOR_ITEM_IMG = ".carousel-item img";
      const SELECTOR_INDICATORS = ".carousel-indicators";
      const SELECTOR_DATA_SLIDE = "[data-bs-slide], [data-bs-slide-to]";
      const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
      const KEY_TO_DIRECTION = {
        [ARROW_LEFT_KEY]: DIRECTION_RIGHT,
        [ARROW_RIGHT_KEY]: DIRECTION_LEFT
      };
      const Default = {
        interval: 5e3,
        keyboard: true,
        pause: "hover",
        ride: false,
        touch: true,
        wrap: true
      };
      const DefaultType = {
        interval: "(number|boolean)",
        // TODO:v6 remove boolean support
        keyboard: "boolean",
        pause: "(string|boolean)",
        ride: "(boolean|string)",
        touch: "boolean",
        wrap: "boolean"
      };
      class Carousel2 extends BaseComponent {
        constructor(element, config2) {
          super(element, config2);
          this._interval = null;
          this._activeElement = null;
          this._isSliding = false;
          this.touchTimeout = null;
          this._swipeHelper = null;
          this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
          this._addEventListeners();
          if (this._config.ride === CLASS_NAME_CAROUSEL) {
            this.cycle();
          }
        }
        // Getters
        static get Default() {
          return Default;
        }
        static get DefaultType() {
          return DefaultType;
        }
        static get NAME() {
          return NAME;
        }
        // Public
        next() {
          this._slide(ORDER_NEXT);
        }
        nextWhenVisible() {
          if (!document.hidden && index_js.isVisible(this._element)) {
            this.next();
          }
        }
        prev() {
          this._slide(ORDER_PREV);
        }
        pause() {
          if (this._isSliding) {
            index_js.triggerTransitionEnd(this._element);
          }
          this._clearInterval();
        }
        cycle() {
          this._clearInterval();
          this._updateInterval();
          this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
        }
        _maybeEnableCycle() {
          if (!this._config.ride) {
            return;
          }
          if (this._isSliding) {
            EventHandler2.one(this._element, EVENT_SLID, () => this.cycle());
            return;
          }
          this.cycle();
        }
        to(index2) {
          const items = this._getItems();
          if (index2 > items.length - 1 || index2 < 0) {
            return;
          }
          if (this._isSliding) {
            EventHandler2.one(this._element, EVENT_SLID, () => this.to(index2));
            return;
          }
          const activeIndex = this._getItemIndex(this._getActive());
          if (activeIndex === index2) {
            return;
          }
          const order = index2 > activeIndex ? ORDER_NEXT : ORDER_PREV;
          this._slide(order, items[index2]);
        }
        dispose() {
          if (this._swipeHelper) {
            this._swipeHelper.dispose();
          }
          super.dispose();
        }
        // Private
        _configAfterMerge(config2) {
          config2.defaultInterval = config2.interval;
          return config2;
        }
        _addEventListeners() {
          if (this._config.keyboard) {
            EventHandler2.on(this._element, EVENT_KEYDOWN, (event) => this._keydown(event));
          }
          if (this._config.pause === "hover") {
            EventHandler2.on(this._element, EVENT_MOUSEENTER, () => this.pause());
            EventHandler2.on(this._element, EVENT_MOUSELEAVE, () => this._maybeEnableCycle());
          }
          if (this._config.touch && Swipe.isSupported()) {
            this._addTouchEventListeners();
          }
        }
        _addTouchEventListeners() {
          for (const img of SelectorEngine.find(SELECTOR_ITEM_IMG, this._element)) {
            EventHandler2.on(img, EVENT_DRAG_START, (event) => event.preventDefault());
          }
          const endCallBack = () => {
            if (this._config.pause !== "hover") {
              return;
            }
            this.pause();
            if (this.touchTimeout) {
              clearTimeout(this.touchTimeout);
            }
            this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
          };
          const swipeConfig = {
            leftCallback: () => this._slide(this._directionToOrder(DIRECTION_LEFT)),
            rightCallback: () => this._slide(this._directionToOrder(DIRECTION_RIGHT)),
            endCallback: endCallBack
          };
          this._swipeHelper = new Swipe(this._element, swipeConfig);
        }
        _keydown(event) {
          if (/input|textarea/i.test(event.target.tagName)) {
            return;
          }
          const direction = KEY_TO_DIRECTION[event.key];
          if (direction) {
            event.preventDefault();
            this._slide(this._directionToOrder(direction));
          }
        }
        _getItemIndex(element) {
          return this._getItems().indexOf(element);
        }
        _setActiveIndicatorElement(index2) {
          if (!this._indicatorsElement) {
            return;
          }
          const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
          activeIndicator.classList.remove(CLASS_NAME_ACTIVE);
          activeIndicator.removeAttribute("aria-current");
          const newActiveIndicator = SelectorEngine.findOne(`[data-bs-slide-to="${index2}"]`, this._indicatorsElement);
          if (newActiveIndicator) {
            newActiveIndicator.classList.add(CLASS_NAME_ACTIVE);
            newActiveIndicator.setAttribute("aria-current", "true");
          }
        }
        _updateInterval() {
          const element = this._activeElement || this._getActive();
          if (!element) {
            return;
          }
          const elementInterval = Number.parseInt(element.getAttribute("data-bs-interval"), 10);
          this._config.interval = elementInterval || this._config.defaultInterval;
        }
        _slide(order, element = null) {
          if (this._isSliding) {
            return;
          }
          const activeElement = this._getActive();
          const isNext = order === ORDER_NEXT;
          const nextElement = element || index_js.getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);
          if (nextElement === activeElement) {
            return;
          }
          const nextElementIndex = this._getItemIndex(nextElement);
          const triggerEvent = (eventName) => {
            return EventHandler2.trigger(this._element, eventName, {
              relatedTarget: nextElement,
              direction: this._orderToDirection(order),
              from: this._getItemIndex(activeElement),
              to: nextElementIndex
            });
          };
          const slideEvent = triggerEvent(EVENT_SLIDE);
          if (slideEvent.defaultPrevented) {
            return;
          }
          if (!activeElement || !nextElement) {
            return;
          }
          const isCycling = Boolean(this._interval);
          this.pause();
          this._isSliding = true;
          this._setActiveIndicatorElement(nextElementIndex);
          this._activeElement = nextElement;
          const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
          const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
          nextElement.classList.add(orderClassName);
          index_js.reflow(nextElement);
          activeElement.classList.add(directionalClassName);
          nextElement.classList.add(directionalClassName);
          const completeCallBack = () => {
            nextElement.classList.remove(directionalClassName, orderClassName);
            nextElement.classList.add(CLASS_NAME_ACTIVE);
            activeElement.classList.remove(CLASS_NAME_ACTIVE, orderClassName, directionalClassName);
            this._isSliding = false;
            triggerEvent(EVENT_SLID);
          };
          this._queueCallback(completeCallBack, activeElement, this._isAnimated());
          if (isCycling) {
            this.cycle();
          }
        }
        _isAnimated() {
          return this._element.classList.contains(CLASS_NAME_SLIDE);
        }
        _getActive() {
          return SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
        }
        _getItems() {
          return SelectorEngine.find(SELECTOR_ITEM, this._element);
        }
        _clearInterval() {
          if (this._interval) {
            clearInterval(this._interval);
            this._interval = null;
          }
        }
        _directionToOrder(direction) {
          if (index_js.isRTL()) {
            return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
          }
          return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
        }
        _orderToDirection(order) {
          if (index_js.isRTL()) {
            return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
          }
          return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
        }
        // Static
        static jQueryInterface(config2) {
          return this.each(function() {
            const data = Carousel2.getOrCreateInstance(this, config2);
            if (typeof config2 === "number") {
              data.to(config2);
              return;
            }
            if (typeof config2 === "string") {
              if (data[config2] === void 0 || config2.startsWith("_") || config2 === "constructor") {
                throw new TypeError(`No method named "${config2}"`);
              }
              data[config2]();
            }
          });
        }
      }
      EventHandler2.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_SLIDE, function(event) {
        const target = SelectorEngine.getElementFromSelector(this);
        if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
          return;
        }
        event.preventDefault();
        const carousel = Carousel2.getOrCreateInstance(target);
        const slideIndex = this.getAttribute("data-bs-slide-to");
        if (slideIndex) {
          carousel.to(slideIndex);
          carousel._maybeEnableCycle();
          return;
        }
        if (Manipulator.getDataAttribute(this, "slide") === "next") {
          carousel.next();
          carousel._maybeEnableCycle();
          return;
        }
        carousel.prev();
        carousel._maybeEnableCycle();
      });
      EventHandler2.on(window, EVENT_LOAD_DATA_API, () => {
        const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);
        for (const carousel of carousels) {
          Carousel2.getOrCreateInstance(carousel);
        }
      });
      index_js.defineJQueryPlugin(Carousel2);
      return Carousel2;
    }));
  }
});

// node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/collapse.js
var require_collapse = __commonJS({
  "node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/collapse.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_base_component(), require_event_handler(), require_selector_engine(), require_util()) : typeof define === "function" && define.amd ? define(["./base-component", "./dom/event-handler", "./dom/selector-engine", "./util/index"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Collapse = factory(global.BaseComponent, global.EventHandler, global.SelectorEngine, global.Index));
    })(exports, (function(BaseComponent, EventHandler2, SelectorEngine, index_js) {
      "use strict";
      const NAME = "collapse";
      const DATA_KEY = "bs.collapse";
      const EVENT_KEY = `.${DATA_KEY}`;
      const DATA_API_KEY = ".data-api";
      const EVENT_SHOW = `show${EVENT_KEY}`;
      const EVENT_SHOWN = `shown${EVENT_KEY}`;
      const EVENT_HIDE = `hide${EVENT_KEY}`;
      const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
      const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
      const CLASS_NAME_SHOW = "show";
      const CLASS_NAME_COLLAPSE = "collapse";
      const CLASS_NAME_COLLAPSING = "collapsing";
      const CLASS_NAME_COLLAPSED = "collapsed";
      const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
      const CLASS_NAME_HORIZONTAL = "collapse-horizontal";
      const WIDTH = "width";
      const HEIGHT = "height";
      const SELECTOR_ACTIVES = ".collapse.show, .collapse.collapsing";
      const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="collapse"]';
      const Default = {
        parent: null,
        toggle: true
      };
      const DefaultType = {
        parent: "(null|element)",
        toggle: "boolean"
      };
      class Collapse2 extends BaseComponent {
        constructor(element, config2) {
          super(element, config2);
          this._isTransitioning = false;
          this._triggerArray = [];
          const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE);
          for (const elem of toggleList) {
            const selector = SelectorEngine.getSelectorFromElement(elem);
            const filterElement = SelectorEngine.find(selector).filter((foundElement) => foundElement === this._element);
            if (selector !== null && filterElement.length) {
              this._triggerArray.push(elem);
            }
          }
          this._initializeChildren();
          if (!this._config.parent) {
            this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
          }
          if (this._config.toggle) {
            this.toggle();
          }
        }
        // Getters
        static get Default() {
          return Default;
        }
        static get DefaultType() {
          return DefaultType;
        }
        static get NAME() {
          return NAME;
        }
        // Public
        toggle() {
          if (this._isShown()) {
            this.hide();
          } else {
            this.show();
          }
        }
        show() {
          if (this._isTransitioning || this._isShown()) {
            return;
          }
          let activeChildren = [];
          if (this._config.parent) {
            activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter((element) => element !== this._element).map((element) => Collapse2.getOrCreateInstance(element, {
              toggle: false
            }));
          }
          if (activeChildren.length && activeChildren[0]._isTransitioning) {
            return;
          }
          const startEvent = EventHandler2.trigger(this._element, EVENT_SHOW);
          if (startEvent.defaultPrevented) {
            return;
          }
          for (const activeInstance of activeChildren) {
            activeInstance.hide();
          }
          const dimension = this._getDimension();
          this._element.classList.remove(CLASS_NAME_COLLAPSE);
          this._element.classList.add(CLASS_NAME_COLLAPSING);
          this._element.style[dimension] = 0;
          this._addAriaAndCollapsedClass(this._triggerArray, true);
          this._isTransitioning = true;
          const complete = () => {
            this._isTransitioning = false;
            this._element.classList.remove(CLASS_NAME_COLLAPSING);
            this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);
            this._element.style[dimension] = "";
            EventHandler2.trigger(this._element, EVENT_SHOWN);
          };
          const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
          const scrollSize = `scroll${capitalizedDimension}`;
          this._queueCallback(complete, this._element, true);
          this._element.style[dimension] = `${this._element[scrollSize]}px`;
        }
        hide() {
          if (this._isTransitioning || !this._isShown()) {
            return;
          }
          const startEvent = EventHandler2.trigger(this._element, EVENT_HIDE);
          if (startEvent.defaultPrevented) {
            return;
          }
          const dimension = this._getDimension();
          this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
          index_js.reflow(this._element);
          this._element.classList.add(CLASS_NAME_COLLAPSING);
          this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);
          for (const trigger of this._triggerArray) {
            const element = SelectorEngine.getElementFromSelector(trigger);
            if (element && !this._isShown(element)) {
              this._addAriaAndCollapsedClass([trigger], false);
            }
          }
          this._isTransitioning = true;
          const complete = () => {
            this._isTransitioning = false;
            this._element.classList.remove(CLASS_NAME_COLLAPSING);
            this._element.classList.add(CLASS_NAME_COLLAPSE);
            EventHandler2.trigger(this._element, EVENT_HIDDEN);
          };
          this._element.style[dimension] = "";
          this._queueCallback(complete, this._element, true);
        }
        // Private
        _isShown(element = this._element) {
          return element.classList.contains(CLASS_NAME_SHOW);
        }
        _configAfterMerge(config2) {
          config2.toggle = Boolean(config2.toggle);
          config2.parent = index_js.getElement(config2.parent);
          return config2;
        }
        _getDimension() {
          return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
        }
        _initializeChildren() {
          if (!this._config.parent) {
            return;
          }
          const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE);
          for (const element of children) {
            const selected = SelectorEngine.getElementFromSelector(element);
            if (selected) {
              this._addAriaAndCollapsedClass([element], this._isShown(selected));
            }
          }
        }
        _getFirstLevelChildren(selector) {
          const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
          return SelectorEngine.find(selector, this._config.parent).filter((element) => !children.includes(element));
        }
        _addAriaAndCollapsedClass(triggerArray, isOpen) {
          if (!triggerArray.length) {
            return;
          }
          for (const element of triggerArray) {
            element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
            element.setAttribute("aria-expanded", isOpen);
          }
        }
        // Static
        static jQueryInterface(config2) {
          const _config = {};
          if (typeof config2 === "string" && /show|hide/.test(config2)) {
            _config.toggle = false;
          }
          return this.each(function() {
            const data = Collapse2.getOrCreateInstance(this, _config);
            if (typeof config2 === "string") {
              if (typeof data[config2] === "undefined") {
                throw new TypeError(`No method named "${config2}"`);
              }
              data[config2]();
            }
          });
        }
      }
      EventHandler2.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(event) {
        if (event.target.tagName === "A" || event.delegateTarget && event.delegateTarget.tagName === "A") {
          event.preventDefault();
        }
        for (const element of SelectorEngine.getMultipleElementsFromSelector(this)) {
          Collapse2.getOrCreateInstance(element, {
            toggle: false
          }).toggle();
        }
      });
      index_js.defineJQueryPlugin(Collapse2);
      return Collapse2;
    }));
  }
});

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/dist/cjs/popper.js
var require_popper = __commonJS({
  "node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/dist/cjs/popper.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getWindow(node) {
      if (node == null) {
        return window;
      }
      if (node.toString() !== "[object Window]") {
        var ownerDocument = node.ownerDocument;
        return ownerDocument ? ownerDocument.defaultView || window : window;
      }
      return node;
    }
    function isElement(node) {
      var OwnElement = getWindow(node).Element;
      return node instanceof OwnElement || node instanceof Element;
    }
    function isHTMLElement(node) {
      var OwnElement = getWindow(node).HTMLElement;
      return node instanceof OwnElement || node instanceof HTMLElement;
    }
    function isShadowRoot(node) {
      if (typeof ShadowRoot === "undefined") {
        return false;
      }
      var OwnElement = getWindow(node).ShadowRoot;
      return node instanceof OwnElement || node instanceof ShadowRoot;
    }
    var max2 = Math.max;
    var min = Math.min;
    var round2 = Math.round;
    function getUAString() {
      var uaData = navigator.userAgentData;
      if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
        return uaData.brands.map(function(item) {
          return item.brand + "/" + item.version;
        }).join(" ");
      }
      return navigator.userAgent;
    }
    function isLayoutViewport() {
      return !/^((?!chrome|android).)*safari/i.test(getUAString());
    }
    function getBoundingClientRect(element, includeScale, isFixedStrategy) {
      if (includeScale === void 0) {
        includeScale = false;
      }
      if (isFixedStrategy === void 0) {
        isFixedStrategy = false;
      }
      var clientRect = element.getBoundingClientRect();
      var scaleX = 1;
      var scaleY = 1;
      if (includeScale && isHTMLElement(element)) {
        scaleX = element.offsetWidth > 0 ? round2(clientRect.width) / element.offsetWidth || 1 : 1;
        scaleY = element.offsetHeight > 0 ? round2(clientRect.height) / element.offsetHeight || 1 : 1;
      }
      var _ref = isElement(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
      var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
      var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
      var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
      var width = clientRect.width / scaleX;
      var height = clientRect.height / scaleY;
      return {
        width,
        height,
        top: y,
        right: x + width,
        bottom: y + height,
        left: x,
        x,
        y
      };
    }
    function getWindowScroll(node) {
      var win2 = getWindow(node);
      var scrollLeft = win2.pageXOffset;
      var scrollTop = win2.pageYOffset;
      return {
        scrollLeft,
        scrollTop
      };
    }
    function getHTMLElementScroll(element) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
      };
    }
    function getNodeScroll(node) {
      if (node === getWindow(node) || !isHTMLElement(node)) {
        return getWindowScroll(node);
      } else {
        return getHTMLElementScroll(node);
      }
    }
    function getNodeName(element) {
      return element ? (element.nodeName || "").toLowerCase() : null;
    }
    function getDocumentElement(element) {
      return ((isElement(element) ? element.ownerDocument : (
        // $FlowFixMe[prop-missing]
        element.document
      )) || window.document).documentElement;
    }
    function getWindowScrollBarX(element) {
      return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
    }
    function getComputedStyle2(element) {
      return getWindow(element).getComputedStyle(element);
    }
    function isScrollParent(element) {
      var _getComputedStyle = getComputedStyle2(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
      return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
    }
    function isElementScaled(element) {
      var rect = element.getBoundingClientRect();
      var scaleX = round2(rect.width) / element.offsetWidth || 1;
      var scaleY = round2(rect.height) / element.offsetHeight || 1;
      return scaleX !== 1 || scaleY !== 1;
    }
    function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
      if (isFixed === void 0) {
        isFixed = false;
      }
      var isOffsetParentAnElement = isHTMLElement(offsetParent);
      var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
      var documentElement = getDocumentElement(offsetParent);
      var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
      var scroll = {
        scrollLeft: 0,
        scrollTop: 0
      };
      var offsets = {
        x: 0,
        y: 0
      };
      if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
        if (getNodeName(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
        isScrollParent(documentElement)) {
          scroll = getNodeScroll(offsetParent);
        }
        if (isHTMLElement(offsetParent)) {
          offsets = getBoundingClientRect(offsetParent, true);
          offsets.x += offsetParent.clientLeft;
          offsets.y += offsetParent.clientTop;
        } else if (documentElement) {
          offsets.x = getWindowScrollBarX(documentElement);
        }
      }
      return {
        x: rect.left + scroll.scrollLeft - offsets.x,
        y: rect.top + scroll.scrollTop - offsets.y,
        width: rect.width,
        height: rect.height
      };
    }
    function getLayoutRect(element) {
      var clientRect = getBoundingClientRect(element);
      var width = element.offsetWidth;
      var height = element.offsetHeight;
      if (Math.abs(clientRect.width - width) <= 1) {
        width = clientRect.width;
      }
      if (Math.abs(clientRect.height - height) <= 1) {
        height = clientRect.height;
      }
      return {
        x: element.offsetLeft,
        y: element.offsetTop,
        width,
        height
      };
    }
    function getParentNode(element) {
      if (getNodeName(element) === "html") {
        return element;
      }
      return (
        // this is a quicker (but less type safe) way to save quite some bytes from the bundle
        // $FlowFixMe[incompatible-return]
        // $FlowFixMe[prop-missing]
        element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
        element.parentNode || // DOM Element detected
        (isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
        // $FlowFixMe[incompatible-call]: HTMLElement is a Node
        getDocumentElement(element)
      );
    }
    function getScrollParent(node) {
      if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
        return node.ownerDocument.body;
      }
      if (isHTMLElement(node) && isScrollParent(node)) {
        return node;
      }
      return getScrollParent(getParentNode(node));
    }
    function listScrollParents(element, list) {
      var _element$ownerDocumen;
      if (list === void 0) {
        list = [];
      }
      var scrollParent = getScrollParent(element);
      var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
      var win2 = getWindow(scrollParent);
      var target = isBody ? [win2].concat(win2.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
      var updatedList = list.concat(target);
      return isBody ? updatedList : (
        // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
        updatedList.concat(listScrollParents(getParentNode(target)))
      );
    }
    function isTableElement(element) {
      return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
    }
    function getTrueOffsetParent(element) {
      if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
      getComputedStyle2(element).position === "fixed") {
        return null;
      }
      return element.offsetParent;
    }
    function getContainingBlock(element) {
      var isFirefox = /firefox/i.test(getUAString());
      var isIE = /Trident/i.test(getUAString());
      if (isIE && isHTMLElement(element)) {
        var elementCss = getComputedStyle2(element);
        if (elementCss.position === "fixed") {
          return null;
        }
      }
      var currentNode = getParentNode(element);
      if (isShadowRoot(currentNode)) {
        currentNode = currentNode.host;
      }
      while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
        var css = getComputedStyle2(currentNode);
        if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
          return currentNode;
        } else {
          currentNode = currentNode.parentNode;
        }
      }
      return null;
    }
    function getOffsetParent(element) {
      var window2 = getWindow(element);
      var offsetParent = getTrueOffsetParent(element);
      while (offsetParent && isTableElement(offsetParent) && getComputedStyle2(offsetParent).position === "static") {
        offsetParent = getTrueOffsetParent(offsetParent);
      }
      if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle2(offsetParent).position === "static")) {
        return window2;
      }
      return offsetParent || getContainingBlock(element) || window2;
    }
    var top = "top";
    var bottom = "bottom";
    var right = "right";
    var left = "left";
    var auto = "auto";
    var basePlacements = [top, bottom, right, left];
    var start = "start";
    var end = "end";
    var clippingParents = "clippingParents";
    var viewport = "viewport";
    var popper = "popper";
    var reference = "reference";
    var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
      return acc.concat([placement + "-" + start, placement + "-" + end]);
    }, []);
    var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
      return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
    }, []);
    var beforeRead = "beforeRead";
    var read = "read";
    var afterRead = "afterRead";
    var beforeMain = "beforeMain";
    var main = "main";
    var afterMain = "afterMain";
    var beforeWrite = "beforeWrite";
    var write = "write";
    var afterWrite = "afterWrite";
    var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
    function order(modifiers) {
      var map = /* @__PURE__ */ new Map();
      var visited = /* @__PURE__ */ new Set();
      var result = [];
      modifiers.forEach(function(modifier) {
        map.set(modifier.name, modifier);
      });
      function sort(modifier) {
        visited.add(modifier.name);
        var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
        requires.forEach(function(dep) {
          if (!visited.has(dep)) {
            var depModifier = map.get(dep);
            if (depModifier) {
              sort(depModifier);
            }
          }
        });
        result.push(modifier);
      }
      modifiers.forEach(function(modifier) {
        if (!visited.has(modifier.name)) {
          sort(modifier);
        }
      });
      return result;
    }
    function orderModifiers(modifiers) {
      var orderedModifiers = order(modifiers);
      return modifierPhases.reduce(function(acc, phase) {
        return acc.concat(orderedModifiers.filter(function(modifier) {
          return modifier.phase === phase;
        }));
      }, []);
    }
    function debounce(fn) {
      var pending;
      return function() {
        if (!pending) {
          pending = new Promise(function(resolve) {
            Promise.resolve().then(function() {
              pending = void 0;
              resolve(fn());
            });
          });
        }
        return pending;
      };
    }
    function mergeByName(modifiers) {
      var merged = modifiers.reduce(function(merged2, current) {
        var existing = merged2[current.name];
        merged2[current.name] = existing ? Object.assign({}, existing, current, {
          options: Object.assign({}, existing.options, current.options),
          data: Object.assign({}, existing.data, current.data)
        }) : current;
        return merged2;
      }, {});
      return Object.keys(merged).map(function(key2) {
        return merged[key2];
      });
    }
    function getViewportRect(element, strategy) {
      var win2 = getWindow(element);
      var html = getDocumentElement(element);
      var visualViewport = win2.visualViewport;
      var width = html.clientWidth;
      var height = html.clientHeight;
      var x = 0;
      var y = 0;
      if (visualViewport) {
        width = visualViewport.width;
        height = visualViewport.height;
        var layoutViewport = isLayoutViewport();
        if (layoutViewport || !layoutViewport && strategy === "fixed") {
          x = visualViewport.offsetLeft;
          y = visualViewport.offsetTop;
        }
      }
      return {
        width,
        height,
        x: x + getWindowScrollBarX(element),
        y
      };
    }
    function getDocumentRect(element) {
      var _element$ownerDocumen;
      var html = getDocumentElement(element);
      var winScroll = getWindowScroll(element);
      var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
      var width = max2(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
      var height = max2(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
      var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
      var y = -winScroll.scrollTop;
      if (getComputedStyle2(body || html).direction === "rtl") {
        x += max2(html.clientWidth, body ? body.clientWidth : 0) - width;
      }
      return {
        width,
        height,
        x,
        y
      };
    }
    function contains(parent, child) {
      var rootNode = child.getRootNode && child.getRootNode();
      if (parent.contains(child)) {
        return true;
      } else if (rootNode && isShadowRoot(rootNode)) {
        var next = child;
        do {
          if (next && parent.isSameNode(next)) {
            return true;
          }
          next = next.parentNode || next.host;
        } while (next);
      }
      return false;
    }
    function rectToClientRect(rect) {
      return Object.assign({}, rect, {
        left: rect.x,
        top: rect.y,
        right: rect.x + rect.width,
        bottom: rect.y + rect.height
      });
    }
    function getInnerBoundingClientRect(element, strategy) {
      var rect = getBoundingClientRect(element, false, strategy === "fixed");
      rect.top = rect.top + element.clientTop;
      rect.left = rect.left + element.clientLeft;
      rect.bottom = rect.top + element.clientHeight;
      rect.right = rect.left + element.clientWidth;
      rect.width = element.clientWidth;
      rect.height = element.clientHeight;
      rect.x = rect.left;
      rect.y = rect.top;
      return rect;
    }
    function getClientRectFromMixedType(element, clippingParent, strategy) {
      return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
    }
    function getClippingParents(element) {
      var clippingParents2 = listScrollParents(getParentNode(element));
      var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle2(element).position) >= 0;
      var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
      if (!isElement(clipperElement)) {
        return [];
      }
      return clippingParents2.filter(function(clippingParent) {
        return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
      });
    }
    function getClippingRect(element, boundary, rootBoundary, strategy) {
      var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
      var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
      var firstClippingParent = clippingParents2[0];
      var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
        var rect = getClientRectFromMixedType(element, clippingParent, strategy);
        accRect.top = max2(rect.top, accRect.top);
        accRect.right = min(rect.right, accRect.right);
        accRect.bottom = min(rect.bottom, accRect.bottom);
        accRect.left = max2(rect.left, accRect.left);
        return accRect;
      }, getClientRectFromMixedType(element, firstClippingParent, strategy));
      clippingRect.width = clippingRect.right - clippingRect.left;
      clippingRect.height = clippingRect.bottom - clippingRect.top;
      clippingRect.x = clippingRect.left;
      clippingRect.y = clippingRect.top;
      return clippingRect;
    }
    function getBasePlacement(placement) {
      return placement.split("-")[0];
    }
    function getVariation(placement) {
      return placement.split("-")[1];
    }
    function getMainAxisFromPlacement(placement) {
      return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
    }
    function computeOffsets(_ref) {
      var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
      var basePlacement = placement ? getBasePlacement(placement) : null;
      var variation = placement ? getVariation(placement) : null;
      var commonX = reference2.x + reference2.width / 2 - element.width / 2;
      var commonY = reference2.y + reference2.height / 2 - element.height / 2;
      var offsets;
      switch (basePlacement) {
        case top:
          offsets = {
            x: commonX,
            y: reference2.y - element.height
          };
          break;
        case bottom:
          offsets = {
            x: commonX,
            y: reference2.y + reference2.height
          };
          break;
        case right:
          offsets = {
            x: reference2.x + reference2.width,
            y: commonY
          };
          break;
        case left:
          offsets = {
            x: reference2.x - element.width,
            y: commonY
          };
          break;
        default:
          offsets = {
            x: reference2.x,
            y: reference2.y
          };
      }
      var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
      if (mainAxis != null) {
        var len = mainAxis === "y" ? "height" : "width";
        switch (variation) {
          case start:
            offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
            break;
          case end:
            offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
            break;
        }
      }
      return offsets;
    }
    function getFreshSideObject() {
      return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      };
    }
    function mergePaddingObject(paddingObject) {
      return Object.assign({}, getFreshSideObject(), paddingObject);
    }
    function expandToHashMap(value, keys) {
      return keys.reduce(function(hashMap, key2) {
        hashMap[key2] = value;
        return hashMap;
      }, {});
    }
    function detectOverflow(state, options) {
      if (options === void 0) {
        options = {};
      }
      var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
      var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
      var altContext = elementContext === popper ? reference : popper;
      var popperRect = state.rects.popper;
      var element = state.elements[altBoundary ? altContext : elementContext];
      var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
      var referenceClientRect = getBoundingClientRect(state.elements.reference);
      var popperOffsets2 = computeOffsets({
        reference: referenceClientRect,
        element: popperRect,
        strategy: "absolute",
        placement
      });
      var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
      var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
      var overflowOffsets = {
        top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
        bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
        left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
        right: elementClientRect.right - clippingClientRect.right + paddingObject.right
      };
      var offsetData = state.modifiersData.offset;
      if (elementContext === popper && offsetData) {
        var offset2 = offsetData[placement];
        Object.keys(overflowOffsets).forEach(function(key2) {
          var multiply2 = [right, bottom].indexOf(key2) >= 0 ? 1 : -1;
          var axis = [top, bottom].indexOf(key2) >= 0 ? "y" : "x";
          overflowOffsets[key2] += offset2[axis] * multiply2;
        });
      }
      return overflowOffsets;
    }
    var DEFAULT_OPTIONS = {
      placement: "bottom",
      modifiers: [],
      strategy: "absolute"
    };
    function areValidElements() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return !args.some(function(element) {
        return !(element && typeof element.getBoundingClientRect === "function");
      });
    }
    function popperGenerator(generatorOptions) {
      if (generatorOptions === void 0) {
        generatorOptions = {};
      }
      var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions3 = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
      return function createPopper2(reference2, popper2, options) {
        if (options === void 0) {
          options = defaultOptions3;
        }
        var state = {
          placement: "bottom",
          orderedModifiers: [],
          options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions3),
          modifiersData: {},
          elements: {
            reference: reference2,
            popper: popper2
          },
          attributes: {},
          styles: {}
        };
        var effectCleanupFns = [];
        var isDestroyed = false;
        var instance2 = {
          state,
          setOptions: function setOptions(setOptionsAction) {
            var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
            cleanupModifierEffects();
            state.options = Object.assign({}, defaultOptions3, state.options, options2);
            state.scrollParents = {
              reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
              popper: listScrollParents(popper2)
            };
            var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
            state.orderedModifiers = orderedModifiers.filter(function(m) {
              return m.enabled;
            });
            runModifierEffects();
            return instance2.update();
          },
          // Sync update – it will always be executed, even if not necessary. This
          // is useful for low frequency updates where sync behavior simplifies the
          // logic.
          // For high frequency updates (e.g. `resize` and `scroll` events), always
          // prefer the async Popper#update method
          forceUpdate: function forceUpdate() {
            if (isDestroyed) {
              return;
            }
            var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
            if (!areValidElements(reference3, popper3)) {
              return;
            }
            state.rects = {
              reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
              popper: getLayoutRect(popper3)
            };
            state.reset = false;
            state.placement = state.options.placement;
            state.orderedModifiers.forEach(function(modifier) {
              return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
            });
            for (var index2 = 0; index2 < state.orderedModifiers.length; index2++) {
              if (state.reset === true) {
                state.reset = false;
                index2 = -1;
                continue;
              }
              var _state$orderedModifie = state.orderedModifiers[index2], fn = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
              if (typeof fn === "function") {
                state = fn({
                  state,
                  options: _options,
                  name,
                  instance: instance2
                }) || state;
              }
            }
          },
          // Async and optimistically optimized update – it will not be executed if
          // not necessary (debounced to run at most once-per-tick)
          update: debounce(function() {
            return new Promise(function(resolve) {
              instance2.forceUpdate();
              resolve(state);
            });
          }),
          destroy: function destroy2() {
            cleanupModifierEffects();
            isDestroyed = true;
          }
        };
        if (!areValidElements(reference2, popper2)) {
          return instance2;
        }
        instance2.setOptions(options).then(function(state2) {
          if (!isDestroyed && options.onFirstUpdate) {
            options.onFirstUpdate(state2);
          }
        });
        function runModifierEffects() {
          state.orderedModifiers.forEach(function(_ref) {
            var name = _ref.name, _ref$options = _ref.options, options2 = _ref$options === void 0 ? {} : _ref$options, effect2 = _ref.effect;
            if (typeof effect2 === "function") {
              var cleanupFn = effect2({
                state,
                name,
                instance: instance2,
                options: options2
              });
              var noopFn = function noopFn2() {
              };
              effectCleanupFns.push(cleanupFn || noopFn);
            }
          });
        }
        function cleanupModifierEffects() {
          effectCleanupFns.forEach(function(fn) {
            return fn();
          });
          effectCleanupFns = [];
        }
        return instance2;
      };
    }
    var passive = {
      passive: true
    };
    function effect$2(_ref) {
      var state = _ref.state, instance2 = _ref.instance, options = _ref.options;
      var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
      var window2 = getWindow(state.elements.popper);
      var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
      if (scroll) {
        scrollParents.forEach(function(scrollParent) {
          scrollParent.addEventListener("scroll", instance2.update, passive);
        });
      }
      if (resize) {
        window2.addEventListener("resize", instance2.update, passive);
      }
      return function() {
        if (scroll) {
          scrollParents.forEach(function(scrollParent) {
            scrollParent.removeEventListener("scroll", instance2.update, passive);
          });
        }
        if (resize) {
          window2.removeEventListener("resize", instance2.update, passive);
        }
      };
    }
    var eventListeners = {
      name: "eventListeners",
      enabled: true,
      phase: "write",
      fn: function fn() {
      },
      effect: effect$2,
      data: {}
    };
    function popperOffsets(_ref) {
      var state = _ref.state, name = _ref.name;
      state.modifiersData[name] = computeOffsets({
        reference: state.rects.reference,
        element: state.rects.popper,
        strategy: "absolute",
        placement: state.placement
      });
    }
    var popperOffsets$1 = {
      name: "popperOffsets",
      enabled: true,
      phase: "read",
      fn: popperOffsets,
      data: {}
    };
    var unsetSides = {
      top: "auto",
      right: "auto",
      bottom: "auto",
      left: "auto"
    };
    function roundOffsetsByDPR(_ref, win2) {
      var x = _ref.x, y = _ref.y;
      var dpr = win2.devicePixelRatio || 1;
      return {
        x: round2(x * dpr) / dpr || 0,
        y: round2(y * dpr) / dpr || 0
      };
    }
    function mapToStyles(_ref2) {
      var _Object$assign2;
      var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
      var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
      var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
        x,
        y
      }) : {
        x,
        y
      };
      x = _ref3.x;
      y = _ref3.y;
      var hasX = offsets.hasOwnProperty("x");
      var hasY = offsets.hasOwnProperty("y");
      var sideX = left;
      var sideY = top;
      var win2 = window;
      if (adaptive) {
        var offsetParent = getOffsetParent(popper2);
        var heightProp = "clientHeight";
        var widthProp = "clientWidth";
        if (offsetParent === getWindow(popper2)) {
          offsetParent = getDocumentElement(popper2);
          if (getComputedStyle2(offsetParent).position !== "static" && position === "absolute") {
            heightProp = "scrollHeight";
            widthProp = "scrollWidth";
          }
        }
        offsetParent = offsetParent;
        if (placement === top || (placement === left || placement === right) && variation === end) {
          sideY = bottom;
          var offsetY = isFixed && offsetParent === win2 && win2.visualViewport ? win2.visualViewport.height : (
            // $FlowFixMe[prop-missing]
            offsetParent[heightProp]
          );
          y -= offsetY - popperRect.height;
          y *= gpuAcceleration ? 1 : -1;
        }
        if (placement === left || (placement === top || placement === bottom) && variation === end) {
          sideX = right;
          var offsetX = isFixed && offsetParent === win2 && win2.visualViewport ? win2.visualViewport.width : (
            // $FlowFixMe[prop-missing]
            offsetParent[widthProp]
          );
          x -= offsetX - popperRect.width;
          x *= gpuAcceleration ? 1 : -1;
        }
      }
      var commonStyles = Object.assign({
        position
      }, adaptive && unsetSides);
      var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
        x,
        y
      }, getWindow(popper2)) : {
        x,
        y
      };
      x = _ref4.x;
      y = _ref4.y;
      if (gpuAcceleration) {
        var _Object$assign;
        return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win2.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
      }
      return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
    }
    function computeStyles(_ref5) {
      var state = _ref5.state, options = _ref5.options;
      var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
      var commonStyles = {
        placement: getBasePlacement(state.placement),
        variation: getVariation(state.placement),
        popper: state.elements.popper,
        popperRect: state.rects.popper,
        gpuAcceleration,
        isFixed: state.options.strategy === "fixed"
      };
      if (state.modifiersData.popperOffsets != null) {
        state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
          offsets: state.modifiersData.popperOffsets,
          position: state.options.strategy,
          adaptive,
          roundOffsets
        })));
      }
      if (state.modifiersData.arrow != null) {
        state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
          offsets: state.modifiersData.arrow,
          position: "absolute",
          adaptive: false,
          roundOffsets
        })));
      }
      state.attributes.popper = Object.assign({}, state.attributes.popper, {
        "data-popper-placement": state.placement
      });
    }
    var computeStyles$1 = {
      name: "computeStyles",
      enabled: true,
      phase: "beforeWrite",
      fn: computeStyles,
      data: {}
    };
    function applyStyles(_ref) {
      var state = _ref.state;
      Object.keys(state.elements).forEach(function(name) {
        var style2 = state.styles[name] || {};
        var attributes = state.attributes[name] || {};
        var element = state.elements[name];
        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        }
        Object.assign(element.style, style2);
        Object.keys(attributes).forEach(function(name2) {
          var value = attributes[name2];
          if (value === false) {
            element.removeAttribute(name2);
          } else {
            element.setAttribute(name2, value === true ? "" : value);
          }
        });
      });
    }
    function effect$1(_ref2) {
      var state = _ref2.state;
      var initialStyles = {
        popper: {
          position: state.options.strategy,
          left: "0",
          top: "0",
          margin: "0"
        },
        arrow: {
          position: "absolute"
        },
        reference: {}
      };
      Object.assign(state.elements.popper.style, initialStyles.popper);
      state.styles = initialStyles;
      if (state.elements.arrow) {
        Object.assign(state.elements.arrow.style, initialStyles.arrow);
      }
      return function() {
        Object.keys(state.elements).forEach(function(name) {
          var element = state.elements[name];
          var attributes = state.attributes[name] || {};
          var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
          var style2 = styleProperties.reduce(function(style3, property) {
            style3[property] = "";
            return style3;
          }, {});
          if (!isHTMLElement(element) || !getNodeName(element)) {
            return;
          }
          Object.assign(element.style, style2);
          Object.keys(attributes).forEach(function(attribute) {
            element.removeAttribute(attribute);
          });
        });
      };
    }
    var applyStyles$1 = {
      name: "applyStyles",
      enabled: true,
      phase: "write",
      fn: applyStyles,
      effect: effect$1,
      requires: ["computeStyles"]
    };
    function distanceAndSkiddingToXY(placement, rects, offset2) {
      var basePlacement = getBasePlacement(placement);
      var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
      var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
        placement
      })) : offset2, skidding = _ref[0], distance = _ref[1];
      skidding = skidding || 0;
      distance = (distance || 0) * invertDistance;
      return [left, right].indexOf(basePlacement) >= 0 ? {
        x: distance,
        y: skidding
      } : {
        x: skidding,
        y: distance
      };
    }
    function offset(_ref2) {
      var state = _ref2.state, options = _ref2.options, name = _ref2.name;
      var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
      var data = placements.reduce(function(acc, placement) {
        acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
        return acc;
      }, {});
      var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
      if (state.modifiersData.popperOffsets != null) {
        state.modifiersData.popperOffsets.x += x;
        state.modifiersData.popperOffsets.y += y;
      }
      state.modifiersData[name] = data;
    }
    var offset$1 = {
      name: "offset",
      enabled: true,
      phase: "main",
      requires: ["popperOffsets"],
      fn: offset
    };
    var hash$1 = {
      left: "right",
      right: "left",
      bottom: "top",
      top: "bottom"
    };
    function getOppositePlacement(placement) {
      return placement.replace(/left|right|bottom|top/g, function(matched) {
        return hash$1[matched];
      });
    }
    var hash = {
      start: "end",
      end: "start"
    };
    function getOppositeVariationPlacement(placement) {
      return placement.replace(/start|end/g, function(matched) {
        return hash[matched];
      });
    }
    function computeAutoPlacement(state, options) {
      if (options === void 0) {
        options = {};
      }
      var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
      var variation = getVariation(placement);
      var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
        return getVariation(placement2) === variation;
      }) : basePlacements;
      var allowedPlacements = placements$1.filter(function(placement2) {
        return allowedAutoPlacements.indexOf(placement2) >= 0;
      });
      if (allowedPlacements.length === 0) {
        allowedPlacements = placements$1;
      }
      var overflows = allowedPlacements.reduce(function(acc, placement2) {
        acc[placement2] = detectOverflow(state, {
          placement: placement2,
          boundary,
          rootBoundary,
          padding
        })[getBasePlacement(placement2)];
        return acc;
      }, {});
      return Object.keys(overflows).sort(function(a, b) {
        return overflows[a] - overflows[b];
      });
    }
    function getExpandedFallbackPlacements(placement) {
      if (getBasePlacement(placement) === auto) {
        return [];
      }
      var oppositePlacement = getOppositePlacement(placement);
      return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
    }
    function flip(_ref) {
      var state = _ref.state, options = _ref.options, name = _ref.name;
      if (state.modifiersData[name]._skip) {
        return;
      }
      var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
      var preferredPlacement = state.options.placement;
      var basePlacement = getBasePlacement(preferredPlacement);
      var isBasePlacement = basePlacement === preferredPlacement;
      var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
      var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
        return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
          placement: placement2,
          boundary,
          rootBoundary,
          padding,
          flipVariations,
          allowedAutoPlacements
        }) : placement2);
      }, []);
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var checksMap = /* @__PURE__ */ new Map();
      var makeFallbackChecks = true;
      var firstFittingPlacement = placements2[0];
      for (var i = 0; i < placements2.length; i++) {
        var placement = placements2[i];
        var _basePlacement = getBasePlacement(placement);
        var isStartVariation = getVariation(placement) === start;
        var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
        var len = isVertical ? "width" : "height";
        var overflow = detectOverflow(state, {
          placement,
          boundary,
          rootBoundary,
          altBoundary,
          padding
        });
        var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
        if (referenceRect[len] > popperRect[len]) {
          mainVariationSide = getOppositePlacement(mainVariationSide);
        }
        var altVariationSide = getOppositePlacement(mainVariationSide);
        var checks = [];
        if (checkMainAxis) {
          checks.push(overflow[_basePlacement] <= 0);
        }
        if (checkAltAxis) {
          checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
        }
        if (checks.every(function(check) {
          return check;
        })) {
          firstFittingPlacement = placement;
          makeFallbackChecks = false;
          break;
        }
        checksMap.set(placement, checks);
      }
      if (makeFallbackChecks) {
        var numberOfChecks = flipVariations ? 3 : 1;
        var _loop = function _loop2(_i2) {
          var fittingPlacement = placements2.find(function(placement2) {
            var checks2 = checksMap.get(placement2);
            if (checks2) {
              return checks2.slice(0, _i2).every(function(check) {
                return check;
              });
            }
          });
          if (fittingPlacement) {
            firstFittingPlacement = fittingPlacement;
            return "break";
          }
        };
        for (var _i = numberOfChecks; _i > 0; _i--) {
          var _ret = _loop(_i);
          if (_ret === "break") break;
        }
      }
      if (state.placement !== firstFittingPlacement) {
        state.modifiersData[name]._skip = true;
        state.placement = firstFittingPlacement;
        state.reset = true;
      }
    }
    var flip$1 = {
      name: "flip",
      enabled: true,
      phase: "main",
      fn: flip,
      requiresIfExists: ["offset"],
      data: {
        _skip: false
      }
    };
    function getAltAxis(axis) {
      return axis === "x" ? "y" : "x";
    }
    function within(min$1, value, max$1) {
      return max2(min$1, min(value, max$1));
    }
    function withinMaxClamp(min2, value, max3) {
      var v = within(min2, value, max3);
      return v > max3 ? max3 : v;
    }
    function preventOverflow(_ref) {
      var state = _ref.state, options = _ref.options, name = _ref.name;
      var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
      var overflow = detectOverflow(state, {
        boundary,
        rootBoundary,
        padding,
        altBoundary
      });
      var basePlacement = getBasePlacement(state.placement);
      var variation = getVariation(state.placement);
      var isBasePlacement = !variation;
      var mainAxis = getMainAxisFromPlacement(basePlacement);
      var altAxis = getAltAxis(mainAxis);
      var popperOffsets2 = state.modifiersData.popperOffsets;
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
        placement: state.placement
      })) : tetherOffset;
      var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
        mainAxis: tetherOffsetValue,
        altAxis: tetherOffsetValue
      } : Object.assign({
        mainAxis: 0,
        altAxis: 0
      }, tetherOffsetValue);
      var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
      var data = {
        x: 0,
        y: 0
      };
      if (!popperOffsets2) {
        return;
      }
      if (checkMainAxis) {
        var _offsetModifierState$;
        var mainSide = mainAxis === "y" ? top : left;
        var altSide = mainAxis === "y" ? bottom : right;
        var len = mainAxis === "y" ? "height" : "width";
        var offset2 = popperOffsets2[mainAxis];
        var min$1 = offset2 + overflow[mainSide];
        var max$1 = offset2 - overflow[altSide];
        var additive2 = tether ? -popperRect[len] / 2 : 0;
        var minLen = variation === start ? referenceRect[len] : popperRect[len];
        var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
        var arrowElement = state.elements.arrow;
        var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
          width: 0,
          height: 0
        };
        var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
        var arrowPaddingMin = arrowPaddingObject[mainSide];
        var arrowPaddingMax = arrowPaddingObject[altSide];
        var arrowLen = within(0, referenceRect[len], arrowRect[len]);
        var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive2 - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
        var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive2 + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
        var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
        var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
        var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
        var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
        var tetherMax = offset2 + maxOffset - offsetModifierValue;
        var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset2, tether ? max2(max$1, tetherMax) : max$1);
        popperOffsets2[mainAxis] = preventedOffset;
        data[mainAxis] = preventedOffset - offset2;
      }
      if (checkAltAxis) {
        var _offsetModifierState$2;
        var _mainSide = mainAxis === "x" ? top : left;
        var _altSide = mainAxis === "x" ? bottom : right;
        var _offset = popperOffsets2[altAxis];
        var _len = altAxis === "y" ? "height" : "width";
        var _min = _offset + overflow[_mainSide];
        var _max = _offset - overflow[_altSide];
        var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
        var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
        var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
        var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
        var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
        popperOffsets2[altAxis] = _preventedOffset;
        data[altAxis] = _preventedOffset - _offset;
      }
      state.modifiersData[name] = data;
    }
    var preventOverflow$1 = {
      name: "preventOverflow",
      enabled: true,
      phase: "main",
      fn: preventOverflow,
      requiresIfExists: ["offset"]
    };
    var toPaddingObject = function toPaddingObject2(padding, state) {
      padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
        placement: state.placement
      })) : padding;
      return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
    };
    function arrow(_ref) {
      var _state$modifiersData$;
      var state = _ref.state, name = _ref.name, options = _ref.options;
      var arrowElement = state.elements.arrow;
      var popperOffsets2 = state.modifiersData.popperOffsets;
      var basePlacement = getBasePlacement(state.placement);
      var axis = getMainAxisFromPlacement(basePlacement);
      var isVertical = [left, right].indexOf(basePlacement) >= 0;
      var len = isVertical ? "height" : "width";
      if (!arrowElement || !popperOffsets2) {
        return;
      }
      var paddingObject = toPaddingObject(options.padding, state);
      var arrowRect = getLayoutRect(arrowElement);
      var minProp = axis === "y" ? top : left;
      var maxProp = axis === "y" ? bottom : right;
      var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
      var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
      var arrowOffsetParent = getOffsetParent(arrowElement);
      var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
      var centerToReference = endDiff / 2 - startDiff / 2;
      var min2 = paddingObject[minProp];
      var max3 = clientSize - arrowRect[len] - paddingObject[maxProp];
      var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
      var offset2 = within(min2, center, max3);
      var axisProp = axis;
      state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
    }
    function effect(_ref2) {
      var state = _ref2.state, options = _ref2.options;
      var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
      if (arrowElement == null) {
        return;
      }
      if (typeof arrowElement === "string") {
        arrowElement = state.elements.popper.querySelector(arrowElement);
        if (!arrowElement) {
          return;
        }
      }
      if (!contains(state.elements.popper, arrowElement)) {
        return;
      }
      state.elements.arrow = arrowElement;
    }
    var arrow$1 = {
      name: "arrow",
      enabled: true,
      phase: "main",
      fn: arrow,
      effect,
      requires: ["popperOffsets"],
      requiresIfExists: ["preventOverflow"]
    };
    function getSideOffsets(overflow, rect, preventedOffsets) {
      if (preventedOffsets === void 0) {
        preventedOffsets = {
          x: 0,
          y: 0
        };
      }
      return {
        top: overflow.top - rect.height - preventedOffsets.y,
        right: overflow.right - rect.width + preventedOffsets.x,
        bottom: overflow.bottom - rect.height + preventedOffsets.y,
        left: overflow.left - rect.width - preventedOffsets.x
      };
    }
    function isAnySideFullyClipped(overflow) {
      return [top, right, bottom, left].some(function(side) {
        return overflow[side] >= 0;
      });
    }
    function hide(_ref) {
      var state = _ref.state, name = _ref.name;
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var preventedOffsets = state.modifiersData.preventOverflow;
      var referenceOverflow = detectOverflow(state, {
        elementContext: "reference"
      });
      var popperAltOverflow = detectOverflow(state, {
        altBoundary: true
      });
      var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
      var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
      var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
      var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
      state.modifiersData[name] = {
        referenceClippingOffsets,
        popperEscapeOffsets,
        isReferenceHidden,
        hasPopperEscaped
      };
      state.attributes.popper = Object.assign({}, state.attributes.popper, {
        "data-popper-reference-hidden": isReferenceHidden,
        "data-popper-escaped": hasPopperEscaped
      });
    }
    var hide$1 = {
      name: "hide",
      enabled: true,
      phase: "main",
      requiresIfExists: ["preventOverflow"],
      fn: hide
    };
    var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
    var createPopper$1 = /* @__PURE__ */ popperGenerator({
      defaultModifiers: defaultModifiers$1
    });
    var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
    var createPopper = /* @__PURE__ */ popperGenerator({
      defaultModifiers
    });
    exports.applyStyles = applyStyles$1;
    exports.arrow = arrow$1;
    exports.computeStyles = computeStyles$1;
    exports.createPopper = createPopper;
    exports.createPopperLite = createPopper$1;
    exports.defaultModifiers = defaultModifiers;
    exports.detectOverflow = detectOverflow;
    exports.eventListeners = eventListeners;
    exports.flip = flip$1;
    exports.hide = hide$1;
    exports.offset = offset$1;
    exports.popperGenerator = popperGenerator;
    exports.popperOffsets = popperOffsets$1;
    exports.preventOverflow = preventOverflow$1;
  }
});

// node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/dropdown.js
var require_dropdown = __commonJS({
  "node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/dropdown.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_popper(), require_base_component(), require_event_handler(), require_manipulator(), require_selector_engine(), require_util()) : typeof define === "function" && define.amd ? define(["@popperjs/core", "./base-component", "./dom/event-handler", "./dom/manipulator", "./dom/selector-engine", "./util/index"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Dropdown = factory(global["@popperjs/core"], global.BaseComponent, global.EventHandler, global.Manipulator, global.SelectorEngine, global.Index));
    })(exports, (function(Popper, BaseComponent, EventHandler2, Manipulator, SelectorEngine, index_js) {
      "use strict";
      function _interopNamespaceDefault(e) {
        const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
        if (e) {
          for (const k in e) {
            if (k !== "default") {
              const d = Object.getOwnPropertyDescriptor(e, k);
              Object.defineProperty(n, k, d.get ? d : {
                enumerable: true,
                get: () => e[k]
              });
            }
          }
        }
        n.default = e;
        return Object.freeze(n);
      }
      const Popper__namespace = /* @__PURE__ */ _interopNamespaceDefault(Popper);
      const NAME = "dropdown";
      const DATA_KEY = "bs.dropdown";
      const EVENT_KEY = `.${DATA_KEY}`;
      const DATA_API_KEY = ".data-api";
      const ESCAPE_KEY = "Escape";
      const TAB_KEY = "Tab";
      const ARROW_UP_KEY = "ArrowUp";
      const ARROW_DOWN_KEY = "ArrowDown";
      const RIGHT_MOUSE_BUTTON = 2;
      const EVENT_HIDE = `hide${EVENT_KEY}`;
      const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
      const EVENT_SHOW = `show${EVENT_KEY}`;
      const EVENT_SHOWN = `shown${EVENT_KEY}`;
      const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
      const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY}${DATA_API_KEY}`;
      const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY}${DATA_API_KEY}`;
      const CLASS_NAME_SHOW = "show";
      const CLASS_NAME_DROPUP = "dropup";
      const CLASS_NAME_DROPEND = "dropend";
      const CLASS_NAME_DROPSTART = "dropstart";
      const CLASS_NAME_DROPUP_CENTER = "dropup-center";
      const CLASS_NAME_DROPDOWN_CENTER = "dropdown-center";
      const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
      const SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE}.${CLASS_NAME_SHOW}`;
      const SELECTOR_MENU = ".dropdown-menu";
      const SELECTOR_NAVBAR = ".navbar";
      const SELECTOR_NAVBAR_NAV = ".navbar-nav";
      const SELECTOR_VISIBLE_ITEMS = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)";
      const PLACEMENT_TOP = index_js.isRTL() ? "top-end" : "top-start";
      const PLACEMENT_TOPEND = index_js.isRTL() ? "top-start" : "top-end";
      const PLACEMENT_BOTTOM = index_js.isRTL() ? "bottom-end" : "bottom-start";
      const PLACEMENT_BOTTOMEND = index_js.isRTL() ? "bottom-start" : "bottom-end";
      const PLACEMENT_RIGHT = index_js.isRTL() ? "left-start" : "right-start";
      const PLACEMENT_LEFT = index_js.isRTL() ? "right-start" : "left-start";
      const PLACEMENT_TOPCENTER = "top";
      const PLACEMENT_BOTTOMCENTER = "bottom";
      const Default = {
        autoClose: true,
        boundary: "clippingParents",
        display: "dynamic",
        offset: [0, 2],
        popperConfig: null,
        reference: "toggle"
      };
      const DefaultType = {
        autoClose: "(boolean|string)",
        boundary: "(string|element)",
        display: "string",
        offset: "(array|string|function)",
        popperConfig: "(null|object|function)",
        reference: "(string|element|object)"
      };
      class Dropdown2 extends BaseComponent {
        constructor(element, config2) {
          super(element, config2);
          this._popper = null;
          this._parent = this._element.parentNode;
          this._menu = SelectorEngine.next(this._element, SELECTOR_MENU)[0] || SelectorEngine.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine.findOne(SELECTOR_MENU, this._parent);
          this._inNavbar = this._detectNavbar();
        }
        // Getters
        static get Default() {
          return Default;
        }
        static get DefaultType() {
          return DefaultType;
        }
        static get NAME() {
          return NAME;
        }
        // Public
        toggle() {
          return this._isShown() ? this.hide() : this.show();
        }
        show() {
          if (index_js.isDisabled(this._element) || this._isShown()) {
            return;
          }
          const relatedTarget = {
            relatedTarget: this._element
          };
          const showEvent = EventHandler2.trigger(this._element, EVENT_SHOW, relatedTarget);
          if (showEvent.defaultPrevented) {
            return;
          }
          this._createPopper();
          if ("ontouchstart" in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
            for (const element of [].concat(...document.body.children)) {
              EventHandler2.on(element, "mouseover", index_js.noop);
            }
          }
          this._element.focus();
          this._element.setAttribute("aria-expanded", true);
          this._menu.classList.add(CLASS_NAME_SHOW);
          this._element.classList.add(CLASS_NAME_SHOW);
          EventHandler2.trigger(this._element, EVENT_SHOWN, relatedTarget);
        }
        hide() {
          if (index_js.isDisabled(this._element) || !this._isShown()) {
            return;
          }
          const relatedTarget = {
            relatedTarget: this._element
          };
          this._completeHide(relatedTarget);
        }
        dispose() {
          if (this._popper) {
            this._popper.destroy();
          }
          super.dispose();
        }
        update() {
          this._inNavbar = this._detectNavbar();
          if (this._popper) {
            this._popper.update();
          }
        }
        // Private
        _completeHide(relatedTarget) {
          const hideEvent = EventHandler2.trigger(this._element, EVENT_HIDE, relatedTarget);
          if (hideEvent.defaultPrevented) {
            return;
          }
          if ("ontouchstart" in document.documentElement) {
            for (const element of [].concat(...document.body.children)) {
              EventHandler2.off(element, "mouseover", index_js.noop);
            }
          }
          if (this._popper) {
            this._popper.destroy();
          }
          this._menu.classList.remove(CLASS_NAME_SHOW);
          this._element.classList.remove(CLASS_NAME_SHOW);
          this._element.setAttribute("aria-expanded", "false");
          Manipulator.removeDataAttribute(this._menu, "popper");
          EventHandler2.trigger(this._element, EVENT_HIDDEN, relatedTarget);
        }
        _getConfig(config2) {
          config2 = super._getConfig(config2);
          if (typeof config2.reference === "object" && !index_js.isElement(config2.reference) && typeof config2.reference.getBoundingClientRect !== "function") {
            throw new TypeError(`${NAME.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
          }
          return config2;
        }
        _createPopper() {
          if (typeof Popper__namespace === "undefined") {
            throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org/docs/v2/)");
          }
          let referenceElement = this._element;
          if (this._config.reference === "parent") {
            referenceElement = this._parent;
          } else if (index_js.isElement(this._config.reference)) {
            referenceElement = index_js.getElement(this._config.reference);
          } else if (typeof this._config.reference === "object") {
            referenceElement = this._config.reference;
          }
          const popperConfig = this._getPopperConfig();
          this._popper = Popper__namespace.createPopper(referenceElement, this._menu, popperConfig);
        }
        _isShown() {
          return this._menu.classList.contains(CLASS_NAME_SHOW);
        }
        _getPlacement() {
          const parentDropdown = this._parent;
          if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
            return PLACEMENT_RIGHT;
          }
          if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
            return PLACEMENT_LEFT;
          }
          if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
            return PLACEMENT_TOPCENTER;
          }
          if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
            return PLACEMENT_BOTTOMCENTER;
          }
          const isEnd = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
          if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
            return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
          }
          return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
        }
        _detectNavbar() {
          return this._element.closest(SELECTOR_NAVBAR) !== null;
        }
        _getOffset() {
          const {
            offset
          } = this._config;
          if (typeof offset === "string") {
            return offset.split(",").map((value) => Number.parseInt(value, 10));
          }
          if (typeof offset === "function") {
            return (popperData) => offset(popperData, this._element);
          }
          return offset;
        }
        _getPopperConfig() {
          const defaultBsPopperConfig = {
            placement: this._getPlacement(),
            modifiers: [{
              name: "preventOverflow",
              options: {
                boundary: this._config.boundary
              }
            }, {
              name: "offset",
              options: {
                offset: this._getOffset()
              }
            }]
          };
          if (this._inNavbar || this._config.display === "static") {
            Manipulator.setDataAttribute(this._menu, "popper", "static");
            defaultBsPopperConfig.modifiers = [{
              name: "applyStyles",
              enabled: false
            }];
          }
          return {
            ...defaultBsPopperConfig,
            ...index_js.execute(this._config.popperConfig, [void 0, defaultBsPopperConfig])
          };
        }
        _selectMenuItem({
          key: key2,
          target
        }) {
          const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter((element) => index_js.isVisible(element));
          if (!items.length) {
            return;
          }
          index_js.getNextActiveElement(items, target, key2 === ARROW_DOWN_KEY, !items.includes(target)).focus();
        }
        // Static
        static jQueryInterface(config2) {
          return this.each(function() {
            const data = Dropdown2.getOrCreateInstance(this, config2);
            if (typeof config2 !== "string") {
              return;
            }
            if (typeof data[config2] === "undefined") {
              throw new TypeError(`No method named "${config2}"`);
            }
            data[config2]();
          });
        }
        static clearMenus(event) {
          if (event.button === RIGHT_MOUSE_BUTTON || event.type === "keyup" && event.key !== TAB_KEY) {
            return;
          }
          const openToggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);
          for (const toggle of openToggles) {
            const context = Dropdown2.getInstance(toggle);
            if (!context || context._config.autoClose === false) {
              continue;
            }
            const composedPath = event.composedPath();
            const isMenuTarget = composedPath.includes(context._menu);
            if (composedPath.includes(context._element) || context._config.autoClose === "inside" && !isMenuTarget || context._config.autoClose === "outside" && isMenuTarget) {
              continue;
            }
            if (context._menu.contains(event.target) && (event.type === "keyup" && event.key === TAB_KEY || /input|select|option|textarea|form/i.test(event.target.tagName))) {
              continue;
            }
            const relatedTarget = {
              relatedTarget: context._element
            };
            if (event.type === "click") {
              relatedTarget.clickEvent = event;
            }
            context._completeHide(relatedTarget);
          }
        }
        static dataApiKeydownHandler(event) {
          const isInput = /input|textarea/i.test(event.target.tagName);
          const isEscapeEvent = event.key === ESCAPE_KEY;
          const isUpOrDownEvent = [ARROW_UP_KEY, ARROW_DOWN_KEY].includes(event.key);
          if (!isUpOrDownEvent && !isEscapeEvent) {
            return;
          }
          if (isInput && !isEscapeEvent) {
            return;
          }
          event.preventDefault();
          const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE)[0] || SelectorEngine.next(this, SELECTOR_DATA_TOGGLE)[0] || SelectorEngine.findOne(SELECTOR_DATA_TOGGLE, event.delegateTarget.parentNode);
          const instance2 = Dropdown2.getOrCreateInstance(getToggleButton);
          if (isUpOrDownEvent) {
            event.stopPropagation();
            instance2.show();
            instance2._selectMenuItem(event);
            return;
          }
          if (instance2._isShown()) {
            event.stopPropagation();
            instance2.hide();
            getToggleButton.focus();
          }
        }
      }
      EventHandler2.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE, Dropdown2.dataApiKeydownHandler);
      EventHandler2.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown2.dataApiKeydownHandler);
      EventHandler2.on(document, EVENT_CLICK_DATA_API, Dropdown2.clearMenus);
      EventHandler2.on(document, EVENT_KEYUP_DATA_API, Dropdown2.clearMenus);
      EventHandler2.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(event) {
        event.preventDefault();
        Dropdown2.getOrCreateInstance(this).toggle();
      });
      index_js.defineJQueryPlugin(Dropdown2);
      return Dropdown2;
    }));
  }
});

// node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/util/backdrop.js
var require_backdrop = __commonJS({
  "node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/util/backdrop.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_event_handler(), require_config(), require_util()) : typeof define === "function" && define.amd ? define(["../dom/event-handler", "./config", "./index"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Backdrop = factory(global.EventHandler, global.Config, global.Index));
    })(exports, (function(EventHandler2, Config, index_js) {
      "use strict";
      const NAME = "backdrop";
      const CLASS_NAME_FADE = "fade";
      const CLASS_NAME_SHOW = "show";
      const EVENT_MOUSEDOWN = `mousedown.bs.${NAME}`;
      const Default = {
        className: "modal-backdrop",
        clickCallback: null,
        isAnimated: false,
        isVisible: true,
        // if false, we use the backdrop helper without adding any element to the dom
        rootElement: "body"
        // give the choice to place backdrop under different elements
      };
      const DefaultType = {
        className: "string",
        clickCallback: "(function|null)",
        isAnimated: "boolean",
        isVisible: "boolean",
        rootElement: "(element|string)"
      };
      class Backdrop extends Config {
        constructor(config2) {
          super();
          this._config = this._getConfig(config2);
          this._isAppended = false;
          this._element = null;
        }
        // Getters
        static get Default() {
          return Default;
        }
        static get DefaultType() {
          return DefaultType;
        }
        static get NAME() {
          return NAME;
        }
        // Public
        show(callback) {
          if (!this._config.isVisible) {
            index_js.execute(callback);
            return;
          }
          this._append();
          const element = this._getElement();
          if (this._config.isAnimated) {
            index_js.reflow(element);
          }
          element.classList.add(CLASS_NAME_SHOW);
          this._emulateAnimation(() => {
            index_js.execute(callback);
          });
        }
        hide(callback) {
          if (!this._config.isVisible) {
            index_js.execute(callback);
            return;
          }
          this._getElement().classList.remove(CLASS_NAME_SHOW);
          this._emulateAnimation(() => {
            this.dispose();
            index_js.execute(callback);
          });
        }
        dispose() {
          if (!this._isAppended) {
            return;
          }
          EventHandler2.off(this._element, EVENT_MOUSEDOWN);
          this._element.remove();
          this._isAppended = false;
        }
        // Private
        _getElement() {
          if (!this._element) {
            const backdrop = document.createElement("div");
            backdrop.className = this._config.className;
            if (this._config.isAnimated) {
              backdrop.classList.add(CLASS_NAME_FADE);
            }
            this._element = backdrop;
          }
          return this._element;
        }
        _configAfterMerge(config2) {
          config2.rootElement = index_js.getElement(config2.rootElement);
          return config2;
        }
        _append() {
          if (this._isAppended) {
            return;
          }
          const element = this._getElement();
          this._config.rootElement.append(element);
          EventHandler2.on(element, EVENT_MOUSEDOWN, () => {
            index_js.execute(this._config.clickCallback);
          });
          this._isAppended = true;
        }
        _emulateAnimation(callback) {
          index_js.executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
        }
      }
      return Backdrop;
    }));
  }
});

// node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/util/component-functions.js
var require_component_functions = __commonJS({
  "node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/util/component-functions.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require_event_handler(), require_selector_engine(), require_util()) : typeof define === "function" && define.amd ? define(["exports", "../dom/event-handler", "../dom/selector-engine", "./index"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.ComponentFunctions = {}, global.EventHandler, global.SelectorEngine, global.Index));
    })(exports, (function(exports2, EventHandler2, SelectorEngine, index_js) {
      "use strict";
      const enableDismissTrigger = (component, method = "hide") => {
        const clickEvent = `click.dismiss${component.EVENT_KEY}`;
        const name = component.NAME;
        EventHandler2.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function(event) {
          if (["A", "AREA"].includes(this.tagName)) {
            event.preventDefault();
          }
          if (index_js.isDisabled(this)) {
            return;
          }
          const target = SelectorEngine.getElementFromSelector(this) || this.closest(`.${name}`);
          const instance2 = component.getOrCreateInstance(target);
          instance2[method]();
        });
      };
      exports2.enableDismissTrigger = enableDismissTrigger;
      Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
    }));
  }
});

// node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/util/focustrap.js
var require_focustrap = __commonJS({
  "node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/util/focustrap.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_event_handler(), require_selector_engine(), require_config()) : typeof define === "function" && define.amd ? define(["../dom/event-handler", "../dom/selector-engine", "./config"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Focustrap = factory(global.EventHandler, global.SelectorEngine, global.Config));
    })(exports, (function(EventHandler2, SelectorEngine, Config) {
      "use strict";
      const NAME = "focustrap";
      const DATA_KEY = "bs.focustrap";
      const EVENT_KEY = `.${DATA_KEY}`;
      const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
      const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY}`;
      const TAB_KEY = "Tab";
      const TAB_NAV_FORWARD = "forward";
      const TAB_NAV_BACKWARD = "backward";
      const Default = {
        autofocus: true,
        trapElement: null
        // The element to trap focus inside of
      };
      const DefaultType = {
        autofocus: "boolean",
        trapElement: "element"
      };
      class FocusTrap extends Config {
        constructor(config2) {
          super();
          this._config = this._getConfig(config2);
          this._isActive = false;
          this._lastTabNavDirection = null;
        }
        // Getters
        static get Default() {
          return Default;
        }
        static get DefaultType() {
          return DefaultType;
        }
        static get NAME() {
          return NAME;
        }
        // Public
        activate() {
          if (this._isActive) {
            return;
          }
          if (this._config.autofocus) {
            this._config.trapElement.focus();
          }
          EventHandler2.off(document, EVENT_KEY);
          EventHandler2.on(document, EVENT_FOCUSIN, (event) => this._handleFocusin(event));
          EventHandler2.on(document, EVENT_KEYDOWN_TAB, (event) => this._handleKeydown(event));
          this._isActive = true;
        }
        deactivate() {
          if (!this._isActive) {
            return;
          }
          this._isActive = false;
          EventHandler2.off(document, EVENT_KEY);
        }
        // Private
        _handleFocusin(event) {
          const {
            trapElement
          } = this._config;
          if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
            return;
          }
          const elements = SelectorEngine.focusableChildren(trapElement);
          if (elements.length === 0) {
            trapElement.focus();
          } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
            elements[elements.length - 1].focus();
          } else {
            elements[0].focus();
          }
        }
        _handleKeydown(event) {
          if (event.key !== TAB_KEY) {
            return;
          }
          this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
        }
      }
      return FocusTrap;
    }));
  }
});

// node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/util/scrollbar.js
var require_scrollbar = __commonJS({
  "node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/util/scrollbar.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_manipulator(), require_selector_engine(), require_util()) : typeof define === "function" && define.amd ? define(["../dom/manipulator", "../dom/selector-engine", "./index"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Scrollbar = factory(global.Manipulator, global.SelectorEngine, global.Index));
    })(exports, (function(Manipulator, SelectorEngine, index_js) {
      "use strict";
      const SELECTOR_FIXED_CONTENT = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top";
      const SELECTOR_STICKY_CONTENT = ".sticky-top";
      const PROPERTY_PADDING = "padding-right";
      const PROPERTY_MARGIN = "margin-right";
      class ScrollBarHelper {
        constructor() {
          this._element = document.body;
        }
        // Public
        getWidth() {
          const documentWidth = document.documentElement.clientWidth;
          return Math.abs(window.innerWidth - documentWidth);
        }
        hide() {
          const width = this.getWidth();
          this._disableOverFlow();
          this._setElementAttributes(this._element, PROPERTY_PADDING, (calculatedValue) => calculatedValue + width);
          this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, (calculatedValue) => calculatedValue + width);
          this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, (calculatedValue) => calculatedValue - width);
        }
        reset() {
          this._resetElementAttributes(this._element, "overflow");
          this._resetElementAttributes(this._element, PROPERTY_PADDING);
          this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);
          this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
        }
        isOverflowing() {
          return this.getWidth() > 0;
        }
        // Private
        _disableOverFlow() {
          this._saveInitialAttribute(this._element, "overflow");
          this._element.style.overflow = "hidden";
        }
        _setElementAttributes(selector, styleProperty, callback) {
          const scrollbarWidth = this.getWidth();
          const manipulationCallBack = (element) => {
            if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
              return;
            }
            this._saveInitialAttribute(element, styleProperty);
            const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
            element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
          };
          this._applyManipulationCallback(selector, manipulationCallBack);
        }
        _saveInitialAttribute(element, styleProperty) {
          const actualValue = element.style.getPropertyValue(styleProperty);
          if (actualValue) {
            Manipulator.setDataAttribute(element, styleProperty, actualValue);
          }
        }
        _resetElementAttributes(selector, styleProperty) {
          const manipulationCallBack = (element) => {
            const value = Manipulator.getDataAttribute(element, styleProperty);
            if (value === null) {
              element.style.removeProperty(styleProperty);
              return;
            }
            Manipulator.removeDataAttribute(element, styleProperty);
            element.style.setProperty(styleProperty, value);
          };
          this._applyManipulationCallback(selector, manipulationCallBack);
        }
        _applyManipulationCallback(selector, callBack) {
          if (index_js.isElement(selector)) {
            callBack(selector);
            return;
          }
          for (const sel of SelectorEngine.find(selector, this._element)) {
            callBack(sel);
          }
        }
      }
      return ScrollBarHelper;
    }));
  }
});

// node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/modal.js
var require_modal = __commonJS({
  "node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/modal.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_base_component(), require_event_handler(), require_selector_engine(), require_backdrop(), require_component_functions(), require_focustrap(), require_util(), require_scrollbar()) : typeof define === "function" && define.amd ? define(["./base-component", "./dom/event-handler", "./dom/selector-engine", "./util/backdrop", "./util/component-functions", "./util/focustrap", "./util/index", "./util/scrollbar"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Modal = factory(global.BaseComponent, global.EventHandler, global.SelectorEngine, global.Backdrop, global.ComponentFunctions, global.Focustrap, global.Index, global.Scrollbar));
    })(exports, (function(BaseComponent, EventHandler2, SelectorEngine, Backdrop, componentFunctions_js, FocusTrap, index_js, ScrollBarHelper) {
      "use strict";
      const NAME = "modal";
      const DATA_KEY = "bs.modal";
      const EVENT_KEY = `.${DATA_KEY}`;
      const DATA_API_KEY = ".data-api";
      const ESCAPE_KEY = "Escape";
      const EVENT_HIDE = `hide${EVENT_KEY}`;
      const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`;
      const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
      const EVENT_SHOW = `show${EVENT_KEY}`;
      const EVENT_SHOWN = `shown${EVENT_KEY}`;
      const EVENT_RESIZE = `resize${EVENT_KEY}`;
      const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`;
      const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY}`;
      const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
      const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
      const CLASS_NAME_OPEN = "modal-open";
      const CLASS_NAME_FADE = "fade";
      const CLASS_NAME_SHOW = "show";
      const CLASS_NAME_STATIC = "modal-static";
      const OPEN_SELECTOR = ".modal.show";
      const SELECTOR_DIALOG = ".modal-dialog";
      const SELECTOR_MODAL_BODY = ".modal-body";
      const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="modal"]';
      const Default = {
        backdrop: true,
        focus: true,
        keyboard: true
      };
      const DefaultType = {
        backdrop: "(boolean|string)",
        focus: "boolean",
        keyboard: "boolean"
      };
      class Modal2 extends BaseComponent {
        constructor(element, config2) {
          super(element, config2);
          this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
          this._backdrop = this._initializeBackDrop();
          this._focustrap = this._initializeFocusTrap();
          this._isShown = false;
          this._isTransitioning = false;
          this._scrollBar = new ScrollBarHelper();
          this._addEventListeners();
        }
        // Getters
        static get Default() {
          return Default;
        }
        static get DefaultType() {
          return DefaultType;
        }
        static get NAME() {
          return NAME;
        }
        // Public
        toggle(relatedTarget) {
          return this._isShown ? this.hide() : this.show(relatedTarget);
        }
        show(relatedTarget) {
          if (this._isShown || this._isTransitioning) {
            return;
          }
          const showEvent = EventHandler2.trigger(this._element, EVENT_SHOW, {
            relatedTarget
          });
          if (showEvent.defaultPrevented) {
            return;
          }
          this._isShown = true;
          this._isTransitioning = true;
          this._scrollBar.hide();
          document.body.classList.add(CLASS_NAME_OPEN);
          this._adjustDialog();
          this._backdrop.show(() => this._showElement(relatedTarget));
        }
        hide() {
          if (!this._isShown || this._isTransitioning) {
            return;
          }
          const hideEvent = EventHandler2.trigger(this._element, EVENT_HIDE);
          if (hideEvent.defaultPrevented) {
            return;
          }
          this._isShown = false;
          this._isTransitioning = true;
          this._focustrap.deactivate();
          this._element.classList.remove(CLASS_NAME_SHOW);
          this._queueCallback(() => this._hideModal(), this._element, this._isAnimated());
        }
        dispose() {
          EventHandler2.off(window, EVENT_KEY);
          EventHandler2.off(this._dialog, EVENT_KEY);
          this._backdrop.dispose();
          this._focustrap.deactivate();
          super.dispose();
        }
        handleUpdate() {
          this._adjustDialog();
        }
        // Private
        _initializeBackDrop() {
          return new Backdrop({
            isVisible: Boolean(this._config.backdrop),
            // 'static' option will be translated to true, and booleans will keep their value,
            isAnimated: this._isAnimated()
          });
        }
        _initializeFocusTrap() {
          return new FocusTrap({
            trapElement: this._element
          });
        }
        _showElement(relatedTarget) {
          if (!document.body.contains(this._element)) {
            document.body.append(this._element);
          }
          this._element.style.display = "block";
          this._element.removeAttribute("aria-hidden");
          this._element.setAttribute("aria-modal", true);
          this._element.setAttribute("role", "dialog");
          this._element.scrollTop = 0;
          const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
          if (modalBody) {
            modalBody.scrollTop = 0;
          }
          index_js.reflow(this._element);
          this._element.classList.add(CLASS_NAME_SHOW);
          const transitionComplete = () => {
            if (this._config.focus) {
              this._focustrap.activate();
            }
            this._isTransitioning = false;
            EventHandler2.trigger(this._element, EVENT_SHOWN, {
              relatedTarget
            });
          };
          this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
        }
        _addEventListeners() {
          EventHandler2.on(this._element, EVENT_KEYDOWN_DISMISS, (event) => {
            if (event.key !== ESCAPE_KEY) {
              return;
            }
            if (this._config.keyboard) {
              this.hide();
              return;
            }
            this._triggerBackdropTransition();
          });
          EventHandler2.on(window, EVENT_RESIZE, () => {
            if (this._isShown && !this._isTransitioning) {
              this._adjustDialog();
            }
          });
          EventHandler2.on(this._element, EVENT_MOUSEDOWN_DISMISS, (event) => {
            EventHandler2.one(this._element, EVENT_CLICK_DISMISS, (event2) => {
              if (this._element !== event.target || this._element !== event2.target) {
                return;
              }
              if (this._config.backdrop === "static") {
                this._triggerBackdropTransition();
                return;
              }
              if (this._config.backdrop) {
                this.hide();
              }
            });
          });
        }
        _hideModal() {
          this._element.style.display = "none";
          this._element.setAttribute("aria-hidden", true);
          this._element.removeAttribute("aria-modal");
          this._element.removeAttribute("role");
          this._isTransitioning = false;
          this._backdrop.hide(() => {
            document.body.classList.remove(CLASS_NAME_OPEN);
            this._resetAdjustments();
            this._scrollBar.reset();
            EventHandler2.trigger(this._element, EVENT_HIDDEN);
          });
        }
        _isAnimated() {
          return this._element.classList.contains(CLASS_NAME_FADE);
        }
        _triggerBackdropTransition() {
          const hideEvent = EventHandler2.trigger(this._element, EVENT_HIDE_PREVENTED);
          if (hideEvent.defaultPrevented) {
            return;
          }
          const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
          const initialOverflowY = this._element.style.overflowY;
          if (initialOverflowY === "hidden" || this._element.classList.contains(CLASS_NAME_STATIC)) {
            return;
          }
          if (!isModalOverflowing) {
            this._element.style.overflowY = "hidden";
          }
          this._element.classList.add(CLASS_NAME_STATIC);
          this._queueCallback(() => {
            this._element.classList.remove(CLASS_NAME_STATIC);
            this._queueCallback(() => {
              this._element.style.overflowY = initialOverflowY;
            }, this._dialog);
          }, this._dialog);
          this._element.focus();
        }
        /**
         * The following methods are used to handle overflowing modals
         */
        _adjustDialog() {
          const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
          const scrollbarWidth = this._scrollBar.getWidth();
          const isBodyOverflowing = scrollbarWidth > 0;
          if (isBodyOverflowing && !isModalOverflowing) {
            const property = index_js.isRTL() ? "paddingLeft" : "paddingRight";
            this._element.style[property] = `${scrollbarWidth}px`;
          }
          if (!isBodyOverflowing && isModalOverflowing) {
            const property = index_js.isRTL() ? "paddingRight" : "paddingLeft";
            this._element.style[property] = `${scrollbarWidth}px`;
          }
        }
        _resetAdjustments() {
          this._element.style.paddingLeft = "";
          this._element.style.paddingRight = "";
        }
        // Static
        static jQueryInterface(config2, relatedTarget) {
          return this.each(function() {
            const data = Modal2.getOrCreateInstance(this, config2);
            if (typeof config2 !== "string") {
              return;
            }
            if (typeof data[config2] === "undefined") {
              throw new TypeError(`No method named "${config2}"`);
            }
            data[config2](relatedTarget);
          });
        }
      }
      EventHandler2.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(event) {
        const target = SelectorEngine.getElementFromSelector(this);
        if (["A", "AREA"].includes(this.tagName)) {
          event.preventDefault();
        }
        EventHandler2.one(target, EVENT_SHOW, (showEvent) => {
          if (showEvent.defaultPrevented) {
            return;
          }
          EventHandler2.one(target, EVENT_HIDDEN, () => {
            if (index_js.isVisible(this)) {
              this.focus();
            }
          });
        });
        const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
        if (alreadyOpen) {
          Modal2.getInstance(alreadyOpen).hide();
        }
        const data = Modal2.getOrCreateInstance(target);
        data.toggle(this);
      });
      componentFunctions_js.enableDismissTrigger(Modal2);
      index_js.defineJQueryPlugin(Modal2);
      return Modal2;
    }));
  }
});

// node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/tab.js
var require_tab = __commonJS({
  "node_modules/.pnpm/bootstrap@5.3.8_@popperjs+core@2.11.8/node_modules/bootstrap/js/dist/tab.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_base_component(), require_event_handler(), require_selector_engine(), require_util()) : typeof define === "function" && define.amd ? define(["./base-component", "./dom/event-handler", "./dom/selector-engine", "./util/index"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Tab = factory(global.BaseComponent, global.EventHandler, global.SelectorEngine, global.Index));
    })(exports, (function(BaseComponent, EventHandler2, SelectorEngine, index_js) {
      "use strict";
      const NAME = "tab";
      const DATA_KEY = "bs.tab";
      const EVENT_KEY = `.${DATA_KEY}`;
      const EVENT_HIDE = `hide${EVENT_KEY}`;
      const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
      const EVENT_SHOW = `show${EVENT_KEY}`;
      const EVENT_SHOWN = `shown${EVENT_KEY}`;
      const EVENT_CLICK_DATA_API = `click${EVENT_KEY}`;
      const EVENT_KEYDOWN = `keydown${EVENT_KEY}`;
      const EVENT_LOAD_DATA_API = `load${EVENT_KEY}`;
      const ARROW_LEFT_KEY = "ArrowLeft";
      const ARROW_RIGHT_KEY = "ArrowRight";
      const ARROW_UP_KEY = "ArrowUp";
      const ARROW_DOWN_KEY = "ArrowDown";
      const HOME_KEY = "Home";
      const END_KEY = "End";
      const CLASS_NAME_ACTIVE = "active";
      const CLASS_NAME_FADE = "fade";
      const CLASS_NAME_SHOW = "show";
      const CLASS_DROPDOWN = "dropdown";
      const SELECTOR_DROPDOWN_TOGGLE = ".dropdown-toggle";
      const SELECTOR_DROPDOWN_MENU = ".dropdown-menu";
      const NOT_SELECTOR_DROPDOWN_TOGGLE = `:not(${SELECTOR_DROPDOWN_TOGGLE})`;
      const SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
      const SELECTOR_OUTER = ".nav-item, .list-group-item";
      const SELECTOR_INNER = `.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`;
      const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
      const SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`;
      const SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE}[data-bs-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="list"]`;
      class Tab2 extends BaseComponent {
        constructor(element) {
          super(element);
          this._parent = this._element.closest(SELECTOR_TAB_PANEL);
          if (!this._parent) {
            return;
          }
          this._setInitialAttributes(this._parent, this._getChildren());
          EventHandler2.on(this._element, EVENT_KEYDOWN, (event) => this._keydown(event));
        }
        // Getters
        static get NAME() {
          return NAME;
        }
        // Public
        show() {
          const innerElem = this._element;
          if (this._elemIsActive(innerElem)) {
            return;
          }
          const active = this._getActiveElem();
          const hideEvent = active ? EventHandler2.trigger(active, EVENT_HIDE, {
            relatedTarget: innerElem
          }) : null;
          const showEvent = EventHandler2.trigger(innerElem, EVENT_SHOW, {
            relatedTarget: active
          });
          if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) {
            return;
          }
          this._deactivate(active, innerElem);
          this._activate(innerElem, active);
        }
        // Private
        _activate(element, relatedElem) {
          if (!element) {
            return;
          }
          element.classList.add(CLASS_NAME_ACTIVE);
          this._activate(SelectorEngine.getElementFromSelector(element));
          const complete = () => {
            if (element.getAttribute("role") !== "tab") {
              element.classList.add(CLASS_NAME_SHOW);
              return;
            }
            element.removeAttribute("tabindex");
            element.setAttribute("aria-selected", true);
            this._toggleDropDown(element, true);
            EventHandler2.trigger(element, EVENT_SHOWN, {
              relatedTarget: relatedElem
            });
          };
          this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE));
        }
        _deactivate(element, relatedElem) {
          if (!element) {
            return;
          }
          element.classList.remove(CLASS_NAME_ACTIVE);
          element.blur();
          this._deactivate(SelectorEngine.getElementFromSelector(element));
          const complete = () => {
            if (element.getAttribute("role") !== "tab") {
              element.classList.remove(CLASS_NAME_SHOW);
              return;
            }
            element.setAttribute("aria-selected", false);
            element.setAttribute("tabindex", "-1");
            this._toggleDropDown(element, false);
            EventHandler2.trigger(element, EVENT_HIDDEN, {
              relatedTarget: relatedElem
            });
          };
          this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE));
        }
        _keydown(event) {
          if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY, HOME_KEY, END_KEY].includes(event.key)) {
            return;
          }
          event.stopPropagation();
          event.preventDefault();
          const children = this._getChildren().filter((element) => !index_js.isDisabled(element));
          let nextActiveElement;
          if ([HOME_KEY, END_KEY].includes(event.key)) {
            nextActiveElement = children[event.key === HOME_KEY ? 0 : children.length - 1];
          } else {
            const isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
            nextActiveElement = index_js.getNextActiveElement(children, event.target, isNext, true);
          }
          if (nextActiveElement) {
            nextActiveElement.focus({
              preventScroll: true
            });
            Tab2.getOrCreateInstance(nextActiveElement).show();
          }
        }
        _getChildren() {
          return SelectorEngine.find(SELECTOR_INNER_ELEM, this._parent);
        }
        _getActiveElem() {
          return this._getChildren().find((child) => this._elemIsActive(child)) || null;
        }
        _setInitialAttributes(parent, children) {
          this._setAttributeIfNotExists(parent, "role", "tablist");
          for (const child of children) {
            this._setInitialAttributesOnChild(child);
          }
        }
        _setInitialAttributesOnChild(child) {
          child = this._getInnerElement(child);
          const isActive = this._elemIsActive(child);
          const outerElem = this._getOuterElement(child);
          child.setAttribute("aria-selected", isActive);
          if (outerElem !== child) {
            this._setAttributeIfNotExists(outerElem, "role", "presentation");
          }
          if (!isActive) {
            child.setAttribute("tabindex", "-1");
          }
          this._setAttributeIfNotExists(child, "role", "tab");
          this._setInitialAttributesOnTargetPanel(child);
        }
        _setInitialAttributesOnTargetPanel(child) {
          const target = SelectorEngine.getElementFromSelector(child);
          if (!target) {
            return;
          }
          this._setAttributeIfNotExists(target, "role", "tabpanel");
          if (child.id) {
            this._setAttributeIfNotExists(target, "aria-labelledby", `${child.id}`);
          }
        }
        _toggleDropDown(element, open) {
          const outerElem = this._getOuterElement(element);
          if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
            return;
          }
          const toggle = (selector, className) => {
            const element2 = SelectorEngine.findOne(selector, outerElem);
            if (element2) {
              element2.classList.toggle(className, open);
            }
          };
          toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
          toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW);
          outerElem.setAttribute("aria-expanded", open);
        }
        _setAttributeIfNotExists(element, attribute, value) {
          if (!element.hasAttribute(attribute)) {
            element.setAttribute(attribute, value);
          }
        }
        _elemIsActive(elem) {
          return elem.classList.contains(CLASS_NAME_ACTIVE);
        }
        // Try to get the inner element (usually the .nav-link)
        _getInnerElement(elem) {
          return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine.findOne(SELECTOR_INNER_ELEM, elem);
        }
        // Try to get the outer element (usually the .nav-item)
        _getOuterElement(elem) {
          return elem.closest(SELECTOR_OUTER) || elem;
        }
        // Static
        static jQueryInterface(config2) {
          return this.each(function() {
            const data = Tab2.getOrCreateInstance(this);
            if (typeof config2 !== "string") {
              return;
            }
            if (data[config2] === void 0 || config2.startsWith("_") || config2 === "constructor") {
              throw new TypeError(`No method named "${config2}"`);
            }
            data[config2]();
          });
        }
      }
      EventHandler2.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(event) {
        if (["A", "AREA"].includes(this.tagName)) {
          event.preventDefault();
        }
        if (index_js.isDisabled(this)) {
          return;
        }
        Tab2.getOrCreateInstance(this).show();
      });
      EventHandler2.on(window, EVENT_LOAD_DATA_API, () => {
        for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE)) {
          Tab2.getOrCreateInstance(element);
        }
      });
      index_js.defineJQueryPlugin(Tab2);
      return Tab2;
    }));
  }
});

// src/main.js
var import_carousel = __toESM(require_carousel(), 1);
var import_collapse = __toESM(require_collapse(), 1);
var import_dropdown = __toESM(require_dropdown(), 1);
var import_modal = __toESM(require_modal(), 1);
var import_tab = __toESM(require_tab(), 1);

// node_modules/.pnpm/is-dom-node@1.0.4/node_modules/is-dom-node/dist/is-dom-node.es.js
function isDomNode(x) {
  return typeof window.Node === "object" ? x instanceof window.Node : x !== null && typeof x === "object" && typeof x.nodeType === "number" && typeof x.nodeName === "string";
}
var is_dom_node_es_default = isDomNode;

// node_modules/.pnpm/is-dom-node-list@1.2.1/node_modules/is-dom-node-list/dist/is-dom-node-list.es.js
function isDomNodeList(x) {
  var prototypeToString = Object.prototype.toString.call(x);
  var regex = /^\[object (HTMLCollection|NodeList|Object)\]$/;
  return typeof window.NodeList === "object" ? x instanceof window.NodeList : x !== null && typeof x === "object" && typeof x.length === "number" && regex.test(prototypeToString) && (x.length === 0 || is_dom_node_es_default(x[0]));
}
var is_dom_node_list_es_default = isDomNodeList;

// node_modules/.pnpm/tealight@0.3.6/node_modules/tealight/dist/tealight.es.js
function tealight(target, context) {
  if (context === void 0) context = document;
  if (target instanceof Array) {
    return target.filter(is_dom_node_es_default);
  }
  if (is_dom_node_es_default(target)) {
    return [target];
  }
  if (is_dom_node_list_es_default(target)) {
    return Array.prototype.slice.call(target);
  }
  if (typeof target === "string") {
    try {
      var query = context.querySelectorAll(target);
      return Array.prototype.slice.call(query);
    } catch (err) {
      return [];
    }
  }
  return [];
}
var tealight_es_default = tealight;

// node_modules/.pnpm/rematrix@0.3.0/node_modules/rematrix/dist/rematrix.es.js
function format(source) {
  if (source.constructor !== Array) {
    throw new TypeError("Expected array.");
  }
  if (source.length === 16) {
    return source;
  }
  if (source.length === 6) {
    var matrix = identity();
    matrix[0] = source[0];
    matrix[1] = source[1];
    matrix[4] = source[2];
    matrix[5] = source[3];
    matrix[12] = source[4];
    matrix[13] = source[5];
    return matrix;
  }
  throw new RangeError("Expected array with either 6 or 16 values.");
}
function identity() {
  var matrix = [];
  for (var i = 0; i < 16; i++) {
    i % 5 == 0 ? matrix.push(1) : matrix.push(0);
  }
  return matrix;
}
function multiply(m, x) {
  var fm = format(m);
  var fx = format(x);
  var product = [];
  for (var i = 0; i < 4; i++) {
    var row = [fm[i], fm[i + 4], fm[i + 8], fm[i + 12]];
    for (var j = 0; j < 4; j++) {
      var k = j * 4;
      var col = [fx[k], fx[k + 1], fx[k + 2], fx[k + 3]];
      var result = row[0] * col[0] + row[1] * col[1] + row[2] * col[2] + row[3] * col[3];
      product[i + k] = result;
    }
  }
  return product;
}
function parse(source) {
  if (typeof source === "string") {
    var match = source.match(/matrix(3d)?\(([^)]+)\)/);
    if (match) {
      var raw = match[2].split(", ").map(parseFloat);
      return format(raw);
    }
  }
  return identity();
}
function rotateX(angle) {
  var theta = Math.PI / 180 * angle;
  var matrix = identity();
  matrix[5] = matrix[10] = Math.cos(theta);
  matrix[6] = matrix[9] = Math.sin(theta);
  matrix[9] *= -1;
  return matrix;
}
function rotateY(angle) {
  var theta = Math.PI / 180 * angle;
  var matrix = identity();
  matrix[0] = matrix[10] = Math.cos(theta);
  matrix[2] = matrix[8] = Math.sin(theta);
  matrix[2] *= -1;
  return matrix;
}
function rotateZ(angle) {
  var theta = Math.PI / 180 * angle;
  var matrix = identity();
  matrix[0] = matrix[5] = Math.cos(theta);
  matrix[1] = matrix[4] = Math.sin(theta);
  matrix[4] *= -1;
  return matrix;
}
function scale(scalar, scalarY) {
  var matrix = identity();
  matrix[0] = scalar;
  matrix[5] = typeof scalarY === "number" ? scalarY : scalar;
  return matrix;
}
function translateX(distance) {
  var matrix = identity();
  matrix[12] = distance;
  return matrix;
}
function translateY(distance) {
  var matrix = identity();
  matrix[13] = distance;
  return matrix;
}

// node_modules/.pnpm/miniraf@1.0.0/node_modules/miniraf/dist/miniraf.es.js
var polyfill = (function() {
  var clock = Date.now();
  return function(callback) {
    var currentTime = Date.now();
    if (currentTime - clock > 16) {
      clock = currentTime;
      callback(currentTime);
    } else {
      setTimeout(function() {
        return polyfill(callback);
      }, 0);
    }
  };
})();
var index = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || polyfill;
var miniraf_es_default = index;

// node_modules/.pnpm/scrollreveal@4.0.9/node_modules/scrollreveal/dist/scrollreveal.es.js
var defaults = {
  delay: 0,
  distance: "0",
  duration: 600,
  easing: "cubic-bezier(0.5, 0, 0, 1)",
  interval: 0,
  opacity: 0,
  origin: "bottom",
  rotate: {
    x: 0,
    y: 0,
    z: 0
  },
  scale: 1,
  cleanup: false,
  container: document.documentElement,
  desktop: true,
  mobile: true,
  reset: false,
  useDelay: "always",
  viewFactor: 0,
  viewOffset: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  afterReset: function afterReset() {
  },
  afterReveal: function afterReveal() {
  },
  beforeReset: function beforeReset() {
  },
  beforeReveal: function beforeReveal() {
  }
};
function failure() {
  document.documentElement.classList.remove("sr");
  return {
    clean: function clean2() {
    },
    destroy: function destroy2() {
    },
    reveal: function reveal2() {
    },
    sync: function sync2() {
    },
    get noop() {
      return true;
    }
  };
}
function success() {
  document.documentElement.classList.add("sr");
  if (document.body) {
    document.body.style.height = "100%";
  } else {
    document.addEventListener("DOMContentLoaded", function() {
      document.body.style.height = "100%";
    });
  }
}
var mount = { success, failure };
function isObject(x) {
  return x !== null && x instanceof Object && (x.constructor === Object || Object.prototype.toString.call(x) === "[object Object]");
}
function each(collection, callback) {
  if (isObject(collection)) {
    var keys = Object.keys(collection);
    return keys.forEach(function(key2) {
      return callback(collection[key2], key2, collection);
    });
  }
  if (collection instanceof Array) {
    return collection.forEach(function(item, i) {
      return callback(item, i, collection);
    });
  }
  throw new TypeError("Expected either an array or object literal.");
}
function logger(message) {
  var details = [], len = arguments.length - 1;
  while (len-- > 0) details[len] = arguments[len + 1];
  if (this.constructor.debug && console) {
    var report = "%cScrollReveal: " + message;
    details.forEach(function(detail) {
      return report += "\n \u2014 " + detail;
    });
    console.log(report, "color: #ea654b;");
  }
}
function rinse() {
  var this$1 = this;
  var struct = function() {
    return {
      active: [],
      stale: []
    };
  };
  var elementIds = struct();
  var sequenceIds = struct();
  var containerIds = struct();
  try {
    each(tealight_es_default("[data-sr-id]"), function(node) {
      var id = parseInt(node.getAttribute("data-sr-id"));
      elementIds.active.push(id);
    });
  } catch (e) {
    throw e;
  }
  each(this.store.elements, function(element) {
    if (elementIds.active.indexOf(element.id) === -1) {
      elementIds.stale.push(element.id);
    }
  });
  each(elementIds.stale, function(staleId) {
    return delete this$1.store.elements[staleId];
  });
  each(this.store.elements, function(element) {
    if (containerIds.active.indexOf(element.containerId) === -1) {
      containerIds.active.push(element.containerId);
    }
    if (element.hasOwnProperty("sequence")) {
      if (sequenceIds.active.indexOf(element.sequence.id) === -1) {
        sequenceIds.active.push(element.sequence.id);
      }
    }
  });
  each(this.store.containers, function(container) {
    if (containerIds.active.indexOf(container.id) === -1) {
      containerIds.stale.push(container.id);
    }
  });
  each(containerIds.stale, function(staleId) {
    var stale = this$1.store.containers[staleId].node;
    stale.removeEventListener("scroll", this$1.delegate);
    stale.removeEventListener("resize", this$1.delegate);
    delete this$1.store.containers[staleId];
  });
  each(this.store.sequences, function(sequence2) {
    if (sequenceIds.active.indexOf(sequence2.id) === -1) {
      sequenceIds.stale.push(sequence2.id);
    }
  });
  each(sequenceIds.stale, function(staleId) {
    return delete this$1.store.sequences[staleId];
  });
}
var getPrefixedCssProp = (function() {
  var properties = {};
  var style2 = document.documentElement.style;
  function getPrefixedCssProperty(name, source) {
    if (source === void 0) source = style2;
    if (name && typeof name === "string") {
      if (properties[name]) {
        return properties[name];
      }
      if (typeof source[name] === "string") {
        return properties[name] = name;
      }
      if (typeof source["-webkit-" + name] === "string") {
        return properties[name] = "-webkit-" + name;
      }
      throw new RangeError('Unable to find "' + name + '" style property.');
    }
    throw new TypeError("Expected a string.");
  }
  getPrefixedCssProperty.clearCache = function() {
    return properties = {};
  };
  return getPrefixedCssProperty;
})();
function style(element) {
  var computed = window.getComputedStyle(element.node);
  var position = computed.position;
  var config2 = element.config;
  var inline = {};
  var inlineStyle = element.node.getAttribute("style") || "";
  var inlineMatch = inlineStyle.match(/[\w-]+\s*:\s*[^;]+\s*/gi) || [];
  inline.computed = inlineMatch ? inlineMatch.map(function(m) {
    return m.trim();
  }).join("; ") + ";" : "";
  inline.generated = inlineMatch.some(function(m) {
    return m.match(/visibility\s?:\s?visible/i);
  }) ? inline.computed : inlineMatch.concat(["visibility: visible"]).map(function(m) {
    return m.trim();
  }).join("; ") + ";";
  var computedOpacity = parseFloat(computed.opacity);
  var configOpacity = !isNaN(parseFloat(config2.opacity)) ? parseFloat(config2.opacity) : parseFloat(computed.opacity);
  var opacity = {
    computed: computedOpacity !== configOpacity ? "opacity: " + computedOpacity + ";" : "",
    generated: computedOpacity !== configOpacity ? "opacity: " + configOpacity + ";" : ""
  };
  var transformations = [];
  if (parseFloat(config2.distance)) {
    var axis = config2.origin === "top" || config2.origin === "bottom" ? "Y" : "X";
    var distance = config2.distance;
    if (config2.origin === "top" || config2.origin === "left") {
      distance = /^-/.test(distance) ? distance.substr(1) : "-" + distance;
    }
    var ref = distance.match(/(^-?\d+\.?\d?)|(em$|px$|%$)/g);
    var value = ref[0];
    var unit = ref[1];
    switch (unit) {
      case "em":
        distance = parseInt(computed.fontSize) * value;
        break;
      case "px":
        distance = value;
        break;
      case "%":
        distance = axis === "Y" ? element.node.getBoundingClientRect().height * value / 100 : element.node.getBoundingClientRect().width * value / 100;
        break;
      default:
        throw new RangeError("Unrecognized or missing distance unit.");
    }
    if (axis === "Y") {
      transformations.push(translateY(distance));
    } else {
      transformations.push(translateX(distance));
    }
  }
  if (config2.rotate.x) {
    transformations.push(rotateX(config2.rotate.x));
  }
  if (config2.rotate.y) {
    transformations.push(rotateY(config2.rotate.y));
  }
  if (config2.rotate.z) {
    transformations.push(rotateZ(config2.rotate.z));
  }
  if (config2.scale !== 1) {
    if (config2.scale === 0) {
      transformations.push(scale(2e-4));
    } else {
      transformations.push(scale(config2.scale));
    }
  }
  var transform = {};
  if (transformations.length) {
    transform.property = getPrefixedCssProp("transform");
    transform.computed = {
      raw: computed[transform.property],
      matrix: parse(computed[transform.property])
    };
    transformations.unshift(transform.computed.matrix);
    var product = transformations.reduce(multiply);
    transform.generated = {
      initial: transform.property + ": matrix3d(" + product.join(", ") + ");",
      final: transform.property + ": matrix3d(" + transform.computed.matrix.join(", ") + ");"
    };
  } else {
    transform.generated = {
      initial: "",
      final: ""
    };
  }
  var transition = {};
  if (opacity.generated || transform.generated.initial) {
    transition.property = getPrefixedCssProp("transition");
    transition.computed = computed[transition.property];
    transition.fragments = [];
    var delay = config2.delay;
    var duration = config2.duration;
    var easing = config2.easing;
    if (opacity.generated) {
      transition.fragments.push({
        delayed: "opacity " + duration / 1e3 + "s " + easing + " " + delay / 1e3 + "s",
        instant: "opacity " + duration / 1e3 + "s " + easing + " 0s"
      });
    }
    if (transform.generated.initial) {
      transition.fragments.push({
        delayed: transform.property + " " + duration / 1e3 + "s " + easing + " " + delay / 1e3 + "s",
        instant: transform.property + " " + duration / 1e3 + "s " + easing + " 0s"
      });
    }
    var hasCustomTransition = transition.computed && !transition.computed.match(/all 0s|none 0s/);
    if (hasCustomTransition) {
      transition.fragments.unshift({
        delayed: transition.computed,
        instant: transition.computed
      });
    }
    var composed = transition.fragments.reduce(
      function(composition, fragment, i) {
        composition.delayed += i === 0 ? fragment.delayed : ", " + fragment.delayed;
        composition.instant += i === 0 ? fragment.instant : ", " + fragment.instant;
        return composition;
      },
      {
        delayed: "",
        instant: ""
      }
    );
    transition.generated = {
      delayed: transition.property + ": " + composed.delayed + ";",
      instant: transition.property + ": " + composed.instant + ";"
    };
  } else {
    transition.generated = {
      delayed: "",
      instant: ""
    };
  }
  return {
    inline,
    opacity,
    position,
    transform,
    transition
  };
}
function applyStyle(el, declaration) {
  declaration.split(";").forEach(function(pair) {
    var ref = pair.split(":");
    var property = ref[0];
    var value = ref.slice(1);
    if (property && value) {
      el.style[property.trim()] = value.join(":");
    }
  });
}
function clean(target) {
  var this$1 = this;
  var dirty;
  try {
    each(tealight_es_default(target), function(node) {
      var id = node.getAttribute("data-sr-id");
      if (id !== null) {
        dirty = true;
        var element = this$1.store.elements[id];
        if (element.callbackTimer) {
          window.clearTimeout(element.callbackTimer.clock);
        }
        applyStyle(element.node, element.styles.inline.generated);
        node.removeAttribute("data-sr-id");
        delete this$1.store.elements[id];
      }
    });
  } catch (e) {
    return logger.call(this, "Clean failed.", e.message);
  }
  if (dirty) {
    try {
      rinse.call(this);
    } catch (e) {
      return logger.call(this, "Clean failed.", e.message);
    }
  }
}
function destroy() {
  var this$1 = this;
  each(this.store.elements, function(element) {
    applyStyle(element.node, element.styles.inline.generated);
    element.node.removeAttribute("data-sr-id");
  });
  each(this.store.containers, function(container) {
    var target = container.node === document.documentElement ? window : container.node;
    target.removeEventListener("scroll", this$1.delegate);
    target.removeEventListener("resize", this$1.delegate);
  });
  this.store = {
    containers: {},
    elements: {},
    history: [],
    sequences: {}
  };
}
function deepAssign(target) {
  var sources = [], len = arguments.length - 1;
  while (len-- > 0) sources[len] = arguments[len + 1];
  if (isObject(target)) {
    each(sources, function(source) {
      each(source, function(data, key2) {
        if (isObject(data)) {
          if (!target[key2] || !isObject(target[key2])) {
            target[key2] = {};
          }
          deepAssign(target[key2], data);
        } else {
          target[key2] = data;
        }
      });
    });
    return target;
  } else {
    throw new TypeError("Target must be an object literal.");
  }
}
function isMobile(agent) {
  if (agent === void 0) agent = navigator.userAgent;
  return /Android|iPhone|iPad|iPod/i.test(agent);
}
var nextUniqueId = /* @__PURE__ */ (function() {
  var uid = 0;
  return function() {
    return uid++;
  };
})();
function initialize() {
  var this$1 = this;
  rinse.call(this);
  each(this.store.elements, function(element) {
    var styles = [element.styles.inline.generated];
    if (element.visible) {
      styles.push(element.styles.opacity.computed);
      styles.push(element.styles.transform.generated.final);
      element.revealed = true;
    } else {
      styles.push(element.styles.opacity.generated);
      styles.push(element.styles.transform.generated.initial);
      element.revealed = false;
    }
    applyStyle(element.node, styles.filter(function(s) {
      return s !== "";
    }).join(" "));
  });
  each(this.store.containers, function(container) {
    var target = container.node === document.documentElement ? window : container.node;
    target.addEventListener("scroll", this$1.delegate);
    target.addEventListener("resize", this$1.delegate);
  });
  this.delegate();
  this.initTimeout = null;
}
function animate(element, force) {
  if (force === void 0) force = {};
  var pristine = force.pristine || this.pristine;
  var delayed = element.config.useDelay === "always" || element.config.useDelay === "onload" && pristine || element.config.useDelay === "once" && !element.seen;
  var shouldReveal = element.visible && !element.revealed;
  var shouldReset = !element.visible && element.revealed && element.config.reset;
  if (force.reveal || shouldReveal) {
    return triggerReveal.call(this, element, delayed);
  }
  if (force.reset || shouldReset) {
    return triggerReset.call(this, element);
  }
}
function triggerReveal(element, delayed) {
  var styles = [
    element.styles.inline.generated,
    element.styles.opacity.computed,
    element.styles.transform.generated.final
  ];
  if (delayed) {
    styles.push(element.styles.transition.generated.delayed);
  } else {
    styles.push(element.styles.transition.generated.instant);
  }
  element.revealed = element.seen = true;
  applyStyle(element.node, styles.filter(function(s) {
    return s !== "";
  }).join(" "));
  registerCallbacks.call(this, element, delayed);
}
function triggerReset(element) {
  var styles = [
    element.styles.inline.generated,
    element.styles.opacity.generated,
    element.styles.transform.generated.initial,
    element.styles.transition.generated.instant
  ];
  element.revealed = false;
  applyStyle(element.node, styles.filter(function(s) {
    return s !== "";
  }).join(" "));
  registerCallbacks.call(this, element);
}
function registerCallbacks(element, isDelayed) {
  var this$1 = this;
  var duration = isDelayed ? element.config.duration + element.config.delay : element.config.duration;
  var beforeCallback = element.revealed ? element.config.beforeReveal : element.config.beforeReset;
  var afterCallback = element.revealed ? element.config.afterReveal : element.config.afterReset;
  var elapsed = 0;
  if (element.callbackTimer) {
    elapsed = Date.now() - element.callbackTimer.start;
    window.clearTimeout(element.callbackTimer.clock);
  }
  beforeCallback(element.node);
  element.callbackTimer = {
    start: Date.now(),
    clock: window.setTimeout(function() {
      afterCallback(element.node);
      element.callbackTimer = null;
      if (element.revealed && !element.config.reset && element.config.cleanup) {
        clean.call(this$1, element.node);
      }
    }, duration - elapsed)
  };
}
function sequence(element, pristine) {
  if (pristine === void 0) pristine = this.pristine;
  if (!element.visible && element.revealed && element.config.reset) {
    return animate.call(this, element, { reset: true });
  }
  var seq = this.store.sequences[element.sequence.id];
  var i = element.sequence.index;
  if (seq) {
    var visible = new SequenceModel(seq, "visible", this.store);
    var revealed = new SequenceModel(seq, "revealed", this.store);
    seq.models = { visible, revealed };
    if (!revealed.body.length) {
      var nextId = seq.members[visible.body[0]];
      var nextElement = this.store.elements[nextId];
      if (nextElement) {
        cue.call(this, seq, visible.body[0], -1, pristine);
        cue.call(this, seq, visible.body[0], 1, pristine);
        return animate.call(this, nextElement, { reveal: true, pristine });
      }
    }
    if (!seq.blocked.head && i === [].concat(revealed.head).pop() && i >= [].concat(visible.body).shift()) {
      cue.call(this, seq, i, -1, pristine);
      return animate.call(this, element, { reveal: true, pristine });
    }
    if (!seq.blocked.foot && i === [].concat(revealed.foot).shift() && i <= [].concat(visible.body).pop()) {
      cue.call(this, seq, i, 1, pristine);
      return animate.call(this, element, { reveal: true, pristine });
    }
  }
}
function Sequence(interval) {
  var i = Math.abs(interval);
  if (!isNaN(i)) {
    this.id = nextUniqueId();
    this.interval = Math.max(i, 16);
    this.members = [];
    this.models = {};
    this.blocked = {
      head: false,
      foot: false
    };
  } else {
    throw new RangeError("Invalid sequence interval.");
  }
}
function SequenceModel(seq, prop, store) {
  var this$1 = this;
  this.head = [];
  this.body = [];
  this.foot = [];
  each(seq.members, function(id, index2) {
    var element = store.elements[id];
    if (element && element[prop]) {
      this$1.body.push(index2);
    }
  });
  if (this.body.length) {
    each(seq.members, function(id, index2) {
      var element = store.elements[id];
      if (element && !element[prop]) {
        if (index2 < this$1.body[0]) {
          this$1.head.push(index2);
        } else {
          this$1.foot.push(index2);
        }
      }
    });
  }
}
function cue(seq, i, direction, pristine) {
  var this$1 = this;
  var blocked = ["head", null, "foot"][1 + direction];
  var nextId = seq.members[i + direction];
  var nextElement = this.store.elements[nextId];
  seq.blocked[blocked] = true;
  setTimeout(function() {
    seq.blocked[blocked] = false;
    if (nextElement) {
      sequence.call(this$1, nextElement, pristine);
    }
  }, seq.interval);
}
function reveal(target, options, syncing) {
  var this$1 = this;
  if (options === void 0) options = {};
  if (syncing === void 0) syncing = false;
  var containerBuffer = [];
  var sequence$$1;
  var interval = options.interval || defaults.interval;
  try {
    if (interval) {
      sequence$$1 = new Sequence(interval);
    }
    var nodes = tealight_es_default(target);
    if (!nodes.length) {
      throw new Error("Invalid reveal target.");
    }
    var elements = nodes.reduce(function(elementBuffer, elementNode) {
      var element = {};
      var existingId = elementNode.getAttribute("data-sr-id");
      if (existingId) {
        deepAssign(element, this$1.store.elements[existingId]);
        applyStyle(element.node, element.styles.inline.computed);
      } else {
        element.id = nextUniqueId();
        element.node = elementNode;
        element.seen = false;
        element.revealed = false;
        element.visible = false;
      }
      var config2 = deepAssign({}, element.config || this$1.defaults, options);
      if (!config2.mobile && isMobile() || !config2.desktop && !isMobile()) {
        if (existingId) {
          clean.call(this$1, element);
        }
        return elementBuffer;
      }
      var containerNode = tealight_es_default(config2.container)[0];
      if (!containerNode) {
        throw new Error("Invalid container.");
      }
      if (!containerNode.contains(elementNode)) {
        return elementBuffer;
      }
      var containerId;
      {
        containerId = getContainerId(
          containerNode,
          containerBuffer,
          this$1.store.containers
        );
        if (containerId === null) {
          containerId = nextUniqueId();
          containerBuffer.push({ id: containerId, node: containerNode });
        }
      }
      element.config = config2;
      element.containerId = containerId;
      element.styles = style(element);
      if (sequence$$1) {
        element.sequence = {
          id: sequence$$1.id,
          index: sequence$$1.members.length
        };
        sequence$$1.members.push(element.id);
      }
      elementBuffer.push(element);
      return elementBuffer;
    }, []);
    each(elements, function(element) {
      this$1.store.elements[element.id] = element;
      element.node.setAttribute("data-sr-id", element.id);
    });
  } catch (e) {
    return logger.call(this, "Reveal failed.", e.message);
  }
  each(containerBuffer, function(container) {
    this$1.store.containers[container.id] = {
      id: container.id,
      node: container.node
    };
  });
  if (sequence$$1) {
    this.store.sequences[sequence$$1.id] = sequence$$1;
  }
  if (syncing !== true) {
    this.store.history.push({ target, options });
    if (this.initTimeout) {
      window.clearTimeout(this.initTimeout);
    }
    this.initTimeout = window.setTimeout(initialize.bind(this), 0);
  }
}
function getContainerId(node) {
  var collections = [], len = arguments.length - 1;
  while (len-- > 0) collections[len] = arguments[len + 1];
  var id = null;
  each(collections, function(collection) {
    each(collection, function(container) {
      if (id === null && container.node === node) {
        id = container.id;
      }
    });
  });
  return id;
}
function sync() {
  var this$1 = this;
  each(this.store.history, function(record) {
    reveal.call(this$1, record.target, record.options, true);
  });
  initialize.call(this);
}
var polyfill2 = function(x) {
  return (x > 0) - (x < 0) || +x;
};
var mathSign = Math.sign || polyfill2;
function getGeometry(target, isContainer) {
  var height = isContainer ? target.node.clientHeight : target.node.offsetHeight;
  var width = isContainer ? target.node.clientWidth : target.node.offsetWidth;
  var offsetTop = 0;
  var offsetLeft = 0;
  var node = target.node;
  do {
    if (!isNaN(node.offsetTop)) {
      offsetTop += node.offsetTop;
    }
    if (!isNaN(node.offsetLeft)) {
      offsetLeft += node.offsetLeft;
    }
    node = node.offsetParent;
  } while (node);
  return {
    bounds: {
      top: offsetTop,
      right: offsetLeft + width,
      bottom: offsetTop + height,
      left: offsetLeft
    },
    height,
    width
  };
}
function getScrolled(container) {
  var top, left;
  if (container.node === document.documentElement) {
    top = window.pageYOffset;
    left = window.pageXOffset;
  } else {
    top = container.node.scrollTop;
    left = container.node.scrollLeft;
  }
  return { top, left };
}
function isElementVisible(element) {
  if (element === void 0) element = {};
  var container = this.store.containers[element.containerId];
  if (!container) {
    return;
  }
  var viewFactor = Math.max(0, Math.min(1, element.config.viewFactor));
  var viewOffset = element.config.viewOffset;
  var elementBounds = {
    top: element.geometry.bounds.top + element.geometry.height * viewFactor,
    right: element.geometry.bounds.right - element.geometry.width * viewFactor,
    bottom: element.geometry.bounds.bottom - element.geometry.height * viewFactor,
    left: element.geometry.bounds.left + element.geometry.width * viewFactor
  };
  var containerBounds = {
    top: container.geometry.bounds.top + container.scroll.top + viewOffset.top,
    right: container.geometry.bounds.right + container.scroll.left - viewOffset.right,
    bottom: container.geometry.bounds.bottom + container.scroll.top - viewOffset.bottom,
    left: container.geometry.bounds.left + container.scroll.left + viewOffset.left
  };
  return elementBounds.top < containerBounds.bottom && elementBounds.right > containerBounds.left && elementBounds.bottom > containerBounds.top && elementBounds.left < containerBounds.right || element.styles.position === "fixed";
}
function delegate(event, elements) {
  var this$1 = this;
  if (event === void 0) event = { type: "init" };
  if (elements === void 0) elements = this.store.elements;
  miniraf_es_default(function() {
    var stale = event.type === "init" || event.type === "resize";
    each(this$1.store.containers, function(container) {
      if (stale) {
        container.geometry = getGeometry.call(this$1, container, true);
      }
      var scroll = getScrolled.call(this$1, container);
      if (container.scroll) {
        container.direction = {
          x: mathSign(scroll.left - container.scroll.left),
          y: mathSign(scroll.top - container.scroll.top)
        };
      }
      container.scroll = scroll;
    });
    each(elements, function(element) {
      if (stale || element.geometry === void 0) {
        element.geometry = getGeometry.call(this$1, element);
      }
      element.visible = isElementVisible.call(this$1, element);
    });
    each(elements, function(element) {
      if (element.sequence) {
        sequence.call(this$1, element);
      } else {
        animate.call(this$1, element);
      }
    });
    this$1.pristine = false;
  });
}
function isTransformSupported() {
  var style2 = document.documentElement.style;
  return "transform" in style2 || "WebkitTransform" in style2;
}
function isTransitionSupported() {
  var style2 = document.documentElement.style;
  return "transition" in style2 || "WebkitTransition" in style2;
}
var version = "4.0.9";
var boundDelegate;
var boundDestroy;
var boundReveal;
var boundClean;
var boundSync;
var config;
var debug;
var instance;
function ScrollReveal(options) {
  if (options === void 0) options = {};
  var invokedWithoutNew = typeof this === "undefined" || Object.getPrototypeOf(this) !== ScrollReveal.prototype;
  if (invokedWithoutNew) {
    return new ScrollReveal(options);
  }
  if (!ScrollReveal.isSupported()) {
    logger.call(this, "Instantiation failed.", "This browser is not supported.");
    return mount.failure();
  }
  var buffer;
  try {
    buffer = config ? deepAssign({}, config, options) : deepAssign({}, defaults, options);
  } catch (e) {
    logger.call(this, "Invalid configuration.", e.message);
    return mount.failure();
  }
  try {
    var container = tealight_es_default(buffer.container)[0];
    if (!container) {
      throw new Error("Invalid container.");
    }
  } catch (e) {
    logger.call(this, e.message);
    return mount.failure();
  }
  config = buffer;
  if (!config.mobile && isMobile() || !config.desktop && !isMobile()) {
    logger.call(
      this,
      "This device is disabled.",
      "desktop: " + config.desktop,
      "mobile: " + config.mobile
    );
    return mount.failure();
  }
  mount.success();
  this.store = {
    containers: {},
    elements: {},
    history: [],
    sequences: {}
  };
  this.pristine = true;
  boundDelegate = boundDelegate || delegate.bind(this);
  boundDestroy = boundDestroy || destroy.bind(this);
  boundReveal = boundReveal || reveal.bind(this);
  boundClean = boundClean || clean.bind(this);
  boundSync = boundSync || sync.bind(this);
  Object.defineProperty(this, "delegate", { get: function() {
    return boundDelegate;
  } });
  Object.defineProperty(this, "destroy", { get: function() {
    return boundDestroy;
  } });
  Object.defineProperty(this, "reveal", { get: function() {
    return boundReveal;
  } });
  Object.defineProperty(this, "clean", { get: function() {
    return boundClean;
  } });
  Object.defineProperty(this, "sync", { get: function() {
    return boundSync;
  } });
  Object.defineProperty(this, "defaults", { get: function() {
    return config;
  } });
  Object.defineProperty(this, "version", { get: function() {
    return version;
  } });
  Object.defineProperty(this, "noop", { get: function() {
    return false;
  } });
  return instance ? instance : instance = this;
}
ScrollReveal.isSupported = function() {
  return isTransformSupported() && isTransitionSupported();
};
Object.defineProperty(ScrollReveal, "debug", {
  get: function() {
    return debug || false;
  },
  set: function(value) {
    return debug = typeof value === "boolean" ? value : debug;
  }
});
ScrollReveal();
var scrollreveal_es_default = ScrollReveal;

// src/script/slider.js
var SmartCarousel = class {
  constructor(element, options = {}) {
    this.container = element;
    if (!this.container) return;
    this.players = {};
    this.carousel = new bootstrap.Carousel(this.container, {
      interval: false,
      pause: false,
      keyboard: true,
      ...options
    });
    this.timer = null;
    this.startTime = null;
    this.duration = 0;
    this.init();
  }
  init() {
    this.setupObserver();
    this.container.addEventListener("slid.bs.carousel", () => this.playSlide());
    this.container.addEventListener("slide.bs.carousel", (e) => {
      clearTimeout(this.timer);
      this.stopAllVideos();
      this.emitEvent("carousel:stop");
      if (e.relatedTarget && e.relatedTarget.getAttribute("data-type") === "youtube") {
        this.loadYouTubeAPI();
      }
    });
  }
  setupObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.playSlide();
        } else {
          clearTimeout(this.timer);
          this.stopAllVideos();
        }
      });
    }, { threshold: 0.1 });
    observer.observe(this.container);
  }
  loadYouTubeAPI() {
    if (document.getElementById("yt-api-script")) return;
    const tag = document.createElement("script");
    tag.id = "yt-api-script";
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  }
  playSlide() {
    const activeItem = this.container.querySelector(".carousel-item.active");
    if (!activeItem) return;
    const type = activeItem.getAttribute("data-type");
    const video = activeItem.querySelector("video");
    if (type === "youtube") {
      this.handleYouTube(activeItem);
    } else if (type === "video" && video) {
      if (video.readyState < 2) {
        video.onloadedmetadata = () => this.handleVideo(video);
      } else {
        this.handleVideo(video);
      }
    } else {
      this.handleImage(activeItem);
    }
  }
  handleYouTube(item) {
    this.loadYouTubeAPI();
    if (typeof window.YT === "undefined" || typeof window.YT.Player === "undefined") {
      setTimeout(() => this.handleYouTube(item), 100);
      return;
    }
    window.YT.ready(() => {
      const videoId = item.getAttribute("data-video-id");
      const playerDivId = `player-${videoId}`;
      const isMuted = item.getAttribute("data-muted") !== "false";
      if (!this.players[videoId]) {
        this.players[videoId] = new window.YT.Player(playerDivId, {
          height: "100%",
          width: "100%",
          videoId,
          playerVars: {
            "autoplay": 1,
            "mute": isMuted ? 1 : 0,
            "controls": isMuted ? 0 : 1,
            "rel": 0,
            "playsinline": 1
          },
          events: {
            "onReady": (event) => {
              if (isMuted) {
                event.target.mute();
              } else {
                event.target.unMute();
                event.target.setVolume(100);
              }
              event.target.playVideo();
            },
            "onStateChange": (event) => {
              if (event.data === 0) {
                this.carousel.next();
              }
            }
          }
        });
      } else {
        this.players[videoId].seekTo(0);
        if (isMuted) {
          this.players[videoId].mute();
        } else {
          this.players[videoId].unMute();
        }
        this.players[videoId].playVideo();
      }
    });
  }
  handleVideo(video) {
    const duration = video.duration * 1e3;
    this.emitEvent("carousel:start", { duration });
    video.currentTime = 0;
    video.play().catch((err) => {
      console.warn("Otomatik oynatma engellendi, 4sn sonra ge\xE7iliyor.");
      this.setFallbackTimer(4e3);
    });
    video.onended = () => this.carousel.next();
  }
  handleImage(item) {
    let duration = parseInt(item.getAttribute("data-interval")) || 5e3;
    this.emitEvent("carousel:start", { duration });
    this.timer = setTimeout(() => {
      this.carousel.next();
    }, duration);
  }
  stopAllVideos() {
    const videos = this.container.querySelectorAll("video");
    videos.forEach((v) => {
      v.pause();
      v.currentTime = 0;
    });
    Object.values(this.players).forEach((player) => {
      if (player && typeof player.pauseVideo === "function") {
        player.pauseVideo();
        if (typeof player.seekTo === "function") {
          player.seekTo(0);
        }
      }
    });
  }
  setFallbackTimer(ms) {
    this.timer = setTimeout(() => this.carousel.next(), ms);
  }
  emitEvent(name, detail = {}) {
    const event = new CustomEvent(name, { detail });
    this.container.dispatchEvent(event);
  }
};

// node_modules/.pnpm/embla-carousel@8.6.0/node_modules/embla-carousel/esm/embla-carousel.esm.js
function isNumber(subject) {
  return typeof subject === "number";
}
function isString(subject) {
  return typeof subject === "string";
}
function isBoolean(subject) {
  return typeof subject === "boolean";
}
function isObject2(subject) {
  return Object.prototype.toString.call(subject) === "[object Object]";
}
function mathAbs(n) {
  return Math.abs(n);
}
function mathSign2(n) {
  return Math.sign(n);
}
function deltaAbs(valueB, valueA) {
  return mathAbs(valueB - valueA);
}
function factorAbs(valueB, valueA) {
  if (valueB === 0 || valueA === 0) return 0;
  if (mathAbs(valueB) <= mathAbs(valueA)) return 0;
  const diff = deltaAbs(mathAbs(valueB), mathAbs(valueA));
  return mathAbs(diff / valueB);
}
function roundToTwoDecimals(num) {
  return Math.round(num * 100) / 100;
}
function arrayKeys(array) {
  return objectKeys(array).map(Number);
}
function arrayLast(array) {
  return array[arrayLastIndex(array)];
}
function arrayLastIndex(array) {
  return Math.max(0, array.length - 1);
}
function arrayIsLastIndex(array, index2) {
  return index2 === arrayLastIndex(array);
}
function arrayFromNumber(n, startAt = 0) {
  return Array.from(Array(n), (_, i) => startAt + i);
}
function objectKeys(object) {
  return Object.keys(object);
}
function objectsMergeDeep(objectA, objectB) {
  return [objectA, objectB].reduce((mergedObjects, currentObject) => {
    objectKeys(currentObject).forEach((key2) => {
      const valueA = mergedObjects[key2];
      const valueB = currentObject[key2];
      const areObjects = isObject2(valueA) && isObject2(valueB);
      mergedObjects[key2] = areObjects ? objectsMergeDeep(valueA, valueB) : valueB;
    });
    return mergedObjects;
  }, {});
}
function isMouseEvent(evt, ownerWindow) {
  return typeof ownerWindow.MouseEvent !== "undefined" && evt instanceof ownerWindow.MouseEvent;
}
function Alignment(align, viewSize) {
  const predefined = {
    start,
    center,
    end
  };
  function start() {
    return 0;
  }
  function center(n) {
    return end(n) / 2;
  }
  function end(n) {
    return viewSize - n;
  }
  function measure(n, index2) {
    if (isString(align)) return predefined[align](n);
    return align(viewSize, n, index2);
  }
  const self2 = {
    measure
  };
  return self2;
}
function EventStore() {
  let listeners = [];
  function add(node, type, handler, options = {
    passive: true
  }) {
    let removeListener;
    if ("addEventListener" in node) {
      node.addEventListener(type, handler, options);
      removeListener = () => node.removeEventListener(type, handler, options);
    } else {
      const legacyMediaQueryList = node;
      legacyMediaQueryList.addListener(handler);
      removeListener = () => legacyMediaQueryList.removeListener(handler);
    }
    listeners.push(removeListener);
    return self2;
  }
  function clear() {
    listeners = listeners.filter((remove) => remove());
  }
  const self2 = {
    add,
    clear
  };
  return self2;
}
function Animations(ownerDocument, ownerWindow, update, render2) {
  const documentVisibleHandler = EventStore();
  const fixedTimeStep = 1e3 / 60;
  let lastTimeStamp = null;
  let accumulatedTime = 0;
  let animationId = 0;
  function init() {
    documentVisibleHandler.add(ownerDocument, "visibilitychange", () => {
      if (ownerDocument.hidden) reset();
    });
  }
  function destroy2() {
    stop();
    documentVisibleHandler.clear();
  }
  function animate3(timeStamp) {
    if (!animationId) return;
    if (!lastTimeStamp) {
      lastTimeStamp = timeStamp;
      update();
      update();
    }
    const timeElapsed = timeStamp - lastTimeStamp;
    lastTimeStamp = timeStamp;
    accumulatedTime += timeElapsed;
    while (accumulatedTime >= fixedTimeStep) {
      update();
      accumulatedTime -= fixedTimeStep;
    }
    const alpha = accumulatedTime / fixedTimeStep;
    render2(alpha);
    if (animationId) {
      animationId = ownerWindow.requestAnimationFrame(animate3);
    }
  }
  function start() {
    if (animationId) return;
    animationId = ownerWindow.requestAnimationFrame(animate3);
  }
  function stop() {
    ownerWindow.cancelAnimationFrame(animationId);
    lastTimeStamp = null;
    accumulatedTime = 0;
    animationId = 0;
  }
  function reset() {
    lastTimeStamp = null;
    accumulatedTime = 0;
  }
  const self2 = {
    init,
    destroy: destroy2,
    start,
    stop,
    update,
    render: render2
  };
  return self2;
}
function Axis(axis, contentDirection) {
  const isRightToLeft = contentDirection === "rtl";
  const isVertical = axis === "y";
  const scroll = isVertical ? "y" : "x";
  const cross = isVertical ? "x" : "y";
  const sign = !isVertical && isRightToLeft ? -1 : 1;
  const startEdge = getStartEdge();
  const endEdge = getEndEdge();
  function measureSize(nodeRect) {
    const {
      height,
      width
    } = nodeRect;
    return isVertical ? height : width;
  }
  function getStartEdge() {
    if (isVertical) return "top";
    return isRightToLeft ? "right" : "left";
  }
  function getEndEdge() {
    if (isVertical) return "bottom";
    return isRightToLeft ? "left" : "right";
  }
  function direction(n) {
    return n * sign;
  }
  const self2 = {
    scroll,
    cross,
    startEdge,
    endEdge,
    measureSize,
    direction
  };
  return self2;
}
function Limit(min = 0, max2 = 0) {
  const length = mathAbs(min - max2);
  function reachedMin(n) {
    return n < min;
  }
  function reachedMax(n) {
    return n > max2;
  }
  function reachedAny(n) {
    return reachedMin(n) || reachedMax(n);
  }
  function constrain(n) {
    if (!reachedAny(n)) return n;
    return reachedMin(n) ? min : max2;
  }
  function removeOffset(n) {
    if (!length) return n;
    return n - length * Math.ceil((n - max2) / length);
  }
  const self2 = {
    length,
    max: max2,
    min,
    constrain,
    reachedAny,
    reachedMax,
    reachedMin,
    removeOffset
  };
  return self2;
}
function Counter(max2, start, loop) {
  const {
    constrain
  } = Limit(0, max2);
  const loopEnd = max2 + 1;
  let counter = withinLimit(start);
  function withinLimit(n) {
    return !loop ? constrain(n) : mathAbs((loopEnd + n) % loopEnd);
  }
  function get() {
    return counter;
  }
  function set(n) {
    counter = withinLimit(n);
    return self2;
  }
  function add(n) {
    return clone().set(get() + n);
  }
  function clone() {
    return Counter(max2, get(), loop);
  }
  const self2 = {
    get,
    set,
    add,
    clone
  };
  return self2;
}
function DragHandler(axis, rootNode, ownerDocument, ownerWindow, target, dragTracker, location, animation, scrollTo, scrollBody, scrollTarget, index2, eventHandler, percentOfView, dragFree, dragThreshold, skipSnaps, baseFriction, watchDrag) {
  const {
    cross: crossAxis,
    direction
  } = axis;
  const focusNodes = ["INPUT", "SELECT", "TEXTAREA"];
  const nonPassiveEvent = {
    passive: false
  };
  const initEvents = EventStore();
  const dragEvents = EventStore();
  const goToNextThreshold = Limit(50, 225).constrain(percentOfView.measure(20));
  const snapForceBoost = {
    mouse: 300,
    touch: 400
  };
  const freeForceBoost = {
    mouse: 500,
    touch: 600
  };
  const baseSpeed = dragFree ? 43 : 25;
  let isMoving = false;
  let startScroll = 0;
  let startCross = 0;
  let pointerIsDown = false;
  let preventScroll = false;
  let preventClick = false;
  let isMouse = false;
  function init(emblaApi) {
    if (!watchDrag) return;
    function downIfAllowed(evt) {
      if (isBoolean(watchDrag) || watchDrag(emblaApi, evt)) down(evt);
    }
    const node = rootNode;
    initEvents.add(node, "dragstart", (evt) => evt.preventDefault(), nonPassiveEvent).add(node, "touchmove", () => void 0, nonPassiveEvent).add(node, "touchend", () => void 0).add(node, "touchstart", downIfAllowed).add(node, "mousedown", downIfAllowed).add(node, "touchcancel", up).add(node, "contextmenu", up).add(node, "click", click, true);
  }
  function destroy2() {
    initEvents.clear();
    dragEvents.clear();
  }
  function addDragEvents() {
    const node = isMouse ? ownerDocument : rootNode;
    dragEvents.add(node, "touchmove", move, nonPassiveEvent).add(node, "touchend", up).add(node, "mousemove", move, nonPassiveEvent).add(node, "mouseup", up);
  }
  function isFocusNode(node) {
    const nodeName = node.nodeName || "";
    return focusNodes.includes(nodeName);
  }
  function forceBoost() {
    const boost = dragFree ? freeForceBoost : snapForceBoost;
    const type = isMouse ? "mouse" : "touch";
    return boost[type];
  }
  function allowedForce(force, targetChanged) {
    const next = index2.add(mathSign2(force) * -1);
    const baseForce = scrollTarget.byDistance(force, !dragFree).distance;
    if (dragFree || mathAbs(force) < goToNextThreshold) return baseForce;
    if (skipSnaps && targetChanged) return baseForce * 0.5;
    return scrollTarget.byIndex(next.get(), 0).distance;
  }
  function down(evt) {
    const isMouseEvt = isMouseEvent(evt, ownerWindow);
    isMouse = isMouseEvt;
    preventClick = dragFree && isMouseEvt && !evt.buttons && isMoving;
    isMoving = deltaAbs(target.get(), location.get()) >= 2;
    if (isMouseEvt && evt.button !== 0) return;
    if (isFocusNode(evt.target)) return;
    pointerIsDown = true;
    dragTracker.pointerDown(evt);
    scrollBody.useFriction(0).useDuration(0);
    target.set(location);
    addDragEvents();
    startScroll = dragTracker.readPoint(evt);
    startCross = dragTracker.readPoint(evt, crossAxis);
    eventHandler.emit("pointerDown");
  }
  function move(evt) {
    const isTouchEvt = !isMouseEvent(evt, ownerWindow);
    if (isTouchEvt && evt.touches.length >= 2) return up(evt);
    const lastScroll = dragTracker.readPoint(evt);
    const lastCross = dragTracker.readPoint(evt, crossAxis);
    const diffScroll = deltaAbs(lastScroll, startScroll);
    const diffCross = deltaAbs(lastCross, startCross);
    if (!preventScroll && !isMouse) {
      if (!evt.cancelable) return up(evt);
      preventScroll = diffScroll > diffCross;
      if (!preventScroll) return up(evt);
    }
    const diff = dragTracker.pointerMove(evt);
    if (diffScroll > dragThreshold) preventClick = true;
    scrollBody.useFriction(0.3).useDuration(0.75);
    animation.start();
    target.add(direction(diff));
    evt.preventDefault();
  }
  function up(evt) {
    const currentLocation = scrollTarget.byDistance(0, false);
    const targetChanged = currentLocation.index !== index2.get();
    const rawForce = dragTracker.pointerUp(evt) * forceBoost();
    const force = allowedForce(direction(rawForce), targetChanged);
    const forceFactor = factorAbs(rawForce, force);
    const speed = baseSpeed - 10 * forceFactor;
    const friction = baseFriction + forceFactor / 50;
    preventScroll = false;
    pointerIsDown = false;
    dragEvents.clear();
    scrollBody.useDuration(speed).useFriction(friction);
    scrollTo.distance(force, !dragFree);
    isMouse = false;
    eventHandler.emit("pointerUp");
  }
  function click(evt) {
    if (preventClick) {
      evt.stopPropagation();
      evt.preventDefault();
      preventClick = false;
    }
  }
  function pointerDown() {
    return pointerIsDown;
  }
  const self2 = {
    init,
    destroy: destroy2,
    pointerDown
  };
  return self2;
}
function DragTracker(axis, ownerWindow) {
  const logInterval = 170;
  let startEvent;
  let lastEvent;
  function readTime(evt) {
    return evt.timeStamp;
  }
  function readPoint(evt, evtAxis) {
    const property = evtAxis || axis.scroll;
    const coord = `client${property === "x" ? "X" : "Y"}`;
    return (isMouseEvent(evt, ownerWindow) ? evt : evt.touches[0])[coord];
  }
  function pointerDown(evt) {
    startEvent = evt;
    lastEvent = evt;
    return readPoint(evt);
  }
  function pointerMove(evt) {
    const diff = readPoint(evt) - readPoint(lastEvent);
    const expired = readTime(evt) - readTime(startEvent) > logInterval;
    lastEvent = evt;
    if (expired) startEvent = evt;
    return diff;
  }
  function pointerUp(evt) {
    if (!startEvent || !lastEvent) return 0;
    const diffDrag = readPoint(lastEvent) - readPoint(startEvent);
    const diffTime = readTime(evt) - readTime(startEvent);
    const expired = readTime(evt) - readTime(lastEvent) > logInterval;
    const force = diffDrag / diffTime;
    const isFlick = diffTime && !expired && mathAbs(force) > 0.1;
    return isFlick ? force : 0;
  }
  const self2 = {
    pointerDown,
    pointerMove,
    pointerUp,
    readPoint
  };
  return self2;
}
function NodeRects() {
  function measure(node) {
    const {
      offsetTop,
      offsetLeft,
      offsetWidth,
      offsetHeight
    } = node;
    const offset = {
      top: offsetTop,
      right: offsetLeft + offsetWidth,
      bottom: offsetTop + offsetHeight,
      left: offsetLeft,
      width: offsetWidth,
      height: offsetHeight
    };
    return offset;
  }
  const self2 = {
    measure
  };
  return self2;
}
function PercentOfView(viewSize) {
  function measure(n) {
    return viewSize * (n / 100);
  }
  const self2 = {
    measure
  };
  return self2;
}
function ResizeHandler(container, eventHandler, ownerWindow, slides, axis, watchResize, nodeRects) {
  const observeNodes = [container].concat(slides);
  let resizeObserver;
  let containerSize;
  let slideSizes = [];
  let destroyed = false;
  function readSize(node) {
    return axis.measureSize(nodeRects.measure(node));
  }
  function init(emblaApi) {
    if (!watchResize) return;
    containerSize = readSize(container);
    slideSizes = slides.map(readSize);
    function defaultCallback(entries) {
      for (const entry of entries) {
        if (destroyed) return;
        const isContainer = entry.target === container;
        const slideIndex = slides.indexOf(entry.target);
        const lastSize = isContainer ? containerSize : slideSizes[slideIndex];
        const newSize = readSize(isContainer ? container : slides[slideIndex]);
        const diffSize = mathAbs(newSize - lastSize);
        if (diffSize >= 0.5) {
          emblaApi.reInit();
          eventHandler.emit("resize");
          break;
        }
      }
    }
    resizeObserver = new ResizeObserver((entries) => {
      if (isBoolean(watchResize) || watchResize(emblaApi, entries)) {
        defaultCallback(entries);
      }
    });
    ownerWindow.requestAnimationFrame(() => {
      observeNodes.forEach((node) => resizeObserver.observe(node));
    });
  }
  function destroy2() {
    destroyed = true;
    if (resizeObserver) resizeObserver.disconnect();
  }
  const self2 = {
    init,
    destroy: destroy2
  };
  return self2;
}
function ScrollBody(location, offsetLocation, previousLocation, target, baseDuration, baseFriction) {
  let scrollVelocity = 0;
  let scrollDirection = 0;
  let scrollDuration = baseDuration;
  let scrollFriction = baseFriction;
  let rawLocation = location.get();
  let rawLocationPrevious = 0;
  function seek() {
    const displacement = target.get() - location.get();
    const isInstant = !scrollDuration;
    let scrollDistance = 0;
    if (isInstant) {
      scrollVelocity = 0;
      previousLocation.set(target);
      location.set(target);
      scrollDistance = displacement;
    } else {
      previousLocation.set(location);
      scrollVelocity += displacement / scrollDuration;
      scrollVelocity *= scrollFriction;
      rawLocation += scrollVelocity;
      location.add(scrollVelocity);
      scrollDistance = rawLocation - rawLocationPrevious;
    }
    scrollDirection = mathSign2(scrollDistance);
    rawLocationPrevious = rawLocation;
    return self2;
  }
  function settled() {
    const diff = target.get() - offsetLocation.get();
    return mathAbs(diff) < 1e-3;
  }
  function duration() {
    return scrollDuration;
  }
  function direction() {
    return scrollDirection;
  }
  function velocity() {
    return scrollVelocity;
  }
  function useBaseDuration() {
    return useDuration(baseDuration);
  }
  function useBaseFriction() {
    return useFriction(baseFriction);
  }
  function useDuration(n) {
    scrollDuration = n;
    return self2;
  }
  function useFriction(n) {
    scrollFriction = n;
    return self2;
  }
  const self2 = {
    direction,
    duration,
    velocity,
    seek,
    settled,
    useBaseFriction,
    useBaseDuration,
    useFriction,
    useDuration
  };
  return self2;
}
function ScrollBounds(limit, location, target, scrollBody, percentOfView) {
  const pullBackThreshold = percentOfView.measure(10);
  const edgeOffsetTolerance = percentOfView.measure(50);
  const frictionLimit = Limit(0.1, 0.99);
  let disabled = false;
  function shouldConstrain() {
    if (disabled) return false;
    if (!limit.reachedAny(target.get())) return false;
    if (!limit.reachedAny(location.get())) return false;
    return true;
  }
  function constrain(pointerDown) {
    if (!shouldConstrain()) return;
    const edge = limit.reachedMin(location.get()) ? "min" : "max";
    const diffToEdge = mathAbs(limit[edge] - location.get());
    const diffToTarget = target.get() - location.get();
    const friction = frictionLimit.constrain(diffToEdge / edgeOffsetTolerance);
    target.subtract(diffToTarget * friction);
    if (!pointerDown && mathAbs(diffToTarget) < pullBackThreshold) {
      target.set(limit.constrain(target.get()));
      scrollBody.useDuration(25).useBaseFriction();
    }
  }
  function toggleActive(active) {
    disabled = !active;
  }
  const self2 = {
    shouldConstrain,
    constrain,
    toggleActive
  };
  return self2;
}
function ScrollContain(viewSize, contentSize, snapsAligned, containScroll, pixelTolerance) {
  const scrollBounds = Limit(-contentSize + viewSize, 0);
  const snapsBounded = measureBounded();
  const scrollContainLimit = findScrollContainLimit();
  const snapsContained = measureContained();
  function usePixelTolerance(bound, snap) {
    return deltaAbs(bound, snap) <= 1;
  }
  function findScrollContainLimit() {
    const startSnap = snapsBounded[0];
    const endSnap = arrayLast(snapsBounded);
    const min = snapsBounded.lastIndexOf(startSnap);
    const max2 = snapsBounded.indexOf(endSnap) + 1;
    return Limit(min, max2);
  }
  function measureBounded() {
    return snapsAligned.map((snapAligned, index2) => {
      const {
        min,
        max: max2
      } = scrollBounds;
      const snap = scrollBounds.constrain(snapAligned);
      const isFirst = !index2;
      const isLast = arrayIsLastIndex(snapsAligned, index2);
      if (isFirst) return max2;
      if (isLast) return min;
      if (usePixelTolerance(min, snap)) return min;
      if (usePixelTolerance(max2, snap)) return max2;
      return snap;
    }).map((scrollBound) => parseFloat(scrollBound.toFixed(3)));
  }
  function measureContained() {
    if (contentSize <= viewSize + pixelTolerance) return [scrollBounds.max];
    if (containScroll === "keepSnaps") return snapsBounded;
    const {
      min,
      max: max2
    } = scrollContainLimit;
    return snapsBounded.slice(min, max2);
  }
  const self2 = {
    snapsContained,
    scrollContainLimit
  };
  return self2;
}
function ScrollLimit(contentSize, scrollSnaps, loop) {
  const max2 = scrollSnaps[0];
  const min = loop ? max2 - contentSize : arrayLast(scrollSnaps);
  const limit = Limit(min, max2);
  const self2 = {
    limit
  };
  return self2;
}
function ScrollLooper(contentSize, limit, location, vectors) {
  const jointSafety = 0.1;
  const min = limit.min + jointSafety;
  const max2 = limit.max + jointSafety;
  const {
    reachedMin,
    reachedMax
  } = Limit(min, max2);
  function shouldLoop(direction) {
    if (direction === 1) return reachedMax(location.get());
    if (direction === -1) return reachedMin(location.get());
    return false;
  }
  function loop(direction) {
    if (!shouldLoop(direction)) return;
    const loopDistance = contentSize * (direction * -1);
    vectors.forEach((v) => v.add(loopDistance));
  }
  const self2 = {
    loop
  };
  return self2;
}
function ScrollProgress(limit) {
  const {
    max: max2,
    length
  } = limit;
  function get(n) {
    const currentLocation = n - max2;
    return length ? currentLocation / -length : 0;
  }
  const self2 = {
    get
  };
  return self2;
}
function ScrollSnaps(axis, alignment, containerRect, slideRects, slidesToScroll) {
  const {
    startEdge,
    endEdge
  } = axis;
  const {
    groupSlides
  } = slidesToScroll;
  const alignments = measureSizes().map(alignment.measure);
  const snaps = measureUnaligned();
  const snapsAligned = measureAligned();
  function measureSizes() {
    return groupSlides(slideRects).map((rects) => arrayLast(rects)[endEdge] - rects[0][startEdge]).map(mathAbs);
  }
  function measureUnaligned() {
    return slideRects.map((rect) => containerRect[startEdge] - rect[startEdge]).map((snap) => -mathAbs(snap));
  }
  function measureAligned() {
    return groupSlides(snaps).map((g) => g[0]).map((snap, index2) => snap + alignments[index2]);
  }
  const self2 = {
    snaps,
    snapsAligned
  };
  return self2;
}
function SlideRegistry(containSnaps, containScroll, scrollSnaps, scrollContainLimit, slidesToScroll, slideIndexes) {
  const {
    groupSlides
  } = slidesToScroll;
  const {
    min,
    max: max2
  } = scrollContainLimit;
  const slideRegistry = createSlideRegistry();
  function createSlideRegistry() {
    const groupedSlideIndexes = groupSlides(slideIndexes);
    const doNotContain = !containSnaps || containScroll === "keepSnaps";
    if (scrollSnaps.length === 1) return [slideIndexes];
    if (doNotContain) return groupedSlideIndexes;
    return groupedSlideIndexes.slice(min, max2).map((group, index2, groups) => {
      const isFirst = !index2;
      const isLast = arrayIsLastIndex(groups, index2);
      if (isFirst) {
        const range = arrayLast(groups[0]) + 1;
        return arrayFromNumber(range);
      }
      if (isLast) {
        const range = arrayLastIndex(slideIndexes) - arrayLast(groups)[0] + 1;
        return arrayFromNumber(range, arrayLast(groups)[0]);
      }
      return group;
    });
  }
  const self2 = {
    slideRegistry
  };
  return self2;
}
function ScrollTarget(loop, scrollSnaps, contentSize, limit, targetVector) {
  const {
    reachedAny,
    removeOffset,
    constrain
  } = limit;
  function minDistance(distances) {
    return distances.concat().sort((a, b) => mathAbs(a) - mathAbs(b))[0];
  }
  function findTargetSnap(target) {
    const distance = loop ? removeOffset(target) : constrain(target);
    const ascDiffsToSnaps = scrollSnaps.map((snap, index3) => ({
      diff: shortcut(snap - distance, 0),
      index: index3
    })).sort((d1, d2) => mathAbs(d1.diff) - mathAbs(d2.diff));
    const {
      index: index2
    } = ascDiffsToSnaps[0];
    return {
      index: index2,
      distance
    };
  }
  function shortcut(target, direction) {
    const targets = [target, target + contentSize, target - contentSize];
    if (!loop) return target;
    if (!direction) return minDistance(targets);
    const matchingTargets = targets.filter((t) => mathSign2(t) === direction);
    if (matchingTargets.length) return minDistance(matchingTargets);
    return arrayLast(targets) - contentSize;
  }
  function byIndex(index2, direction) {
    const diffToSnap = scrollSnaps[index2] - targetVector.get();
    const distance = shortcut(diffToSnap, direction);
    return {
      index: index2,
      distance
    };
  }
  function byDistance(distance, snap) {
    const target = targetVector.get() + distance;
    const {
      index: index2,
      distance: targetSnapDistance
    } = findTargetSnap(target);
    const reachedBound = !loop && reachedAny(target);
    if (!snap || reachedBound) return {
      index: index2,
      distance
    };
    const diffToSnap = scrollSnaps[index2] - targetSnapDistance;
    const snapDistance = distance + shortcut(diffToSnap, 0);
    return {
      index: index2,
      distance: snapDistance
    };
  }
  const self2 = {
    byDistance,
    byIndex,
    shortcut
  };
  return self2;
}
function ScrollTo(animation, indexCurrent, indexPrevious, scrollBody, scrollTarget, targetVector, eventHandler) {
  function scrollTo(target) {
    const distanceDiff = target.distance;
    const indexDiff = target.index !== indexCurrent.get();
    targetVector.add(distanceDiff);
    if (distanceDiff) {
      if (scrollBody.duration()) {
        animation.start();
      } else {
        animation.update();
        animation.render(1);
        animation.update();
      }
    }
    if (indexDiff) {
      indexPrevious.set(indexCurrent.get());
      indexCurrent.set(target.index);
      eventHandler.emit("select");
    }
  }
  function distance(n, snap) {
    const target = scrollTarget.byDistance(n, snap);
    scrollTo(target);
  }
  function index2(n, direction) {
    const targetIndex = indexCurrent.clone().set(n);
    const target = scrollTarget.byIndex(targetIndex.get(), direction);
    scrollTo(target);
  }
  const self2 = {
    distance,
    index: index2
  };
  return self2;
}
function SlideFocus(root, slides, slideRegistry, scrollTo, scrollBody, eventStore, eventHandler, watchFocus) {
  const focusListenerOptions = {
    passive: true,
    capture: true
  };
  let lastTabPressTime = 0;
  function init(emblaApi) {
    if (!watchFocus) return;
    function defaultCallback(index2) {
      const nowTime = (/* @__PURE__ */ new Date()).getTime();
      const diffTime = nowTime - lastTabPressTime;
      if (diffTime > 10) return;
      eventHandler.emit("slideFocusStart");
      root.scrollLeft = 0;
      const group = slideRegistry.findIndex((group2) => group2.includes(index2));
      if (!isNumber(group)) return;
      scrollBody.useDuration(0);
      scrollTo.index(group, 0);
      eventHandler.emit("slideFocus");
    }
    eventStore.add(document, "keydown", registerTabPress, false);
    slides.forEach((slide, slideIndex) => {
      eventStore.add(slide, "focus", (evt) => {
        if (isBoolean(watchFocus) || watchFocus(emblaApi, evt)) {
          defaultCallback(slideIndex);
        }
      }, focusListenerOptions);
    });
  }
  function registerTabPress(event) {
    if (event.code === "Tab") lastTabPressTime = (/* @__PURE__ */ new Date()).getTime();
  }
  const self2 = {
    init
  };
  return self2;
}
function Vector1D(initialValue) {
  let value = initialValue;
  function get() {
    return value;
  }
  function set(n) {
    value = normalizeInput(n);
  }
  function add(n) {
    value += normalizeInput(n);
  }
  function subtract(n) {
    value -= normalizeInput(n);
  }
  function normalizeInput(n) {
    return isNumber(n) ? n : n.get();
  }
  const self2 = {
    get,
    set,
    add,
    subtract
  };
  return self2;
}
function Translate(axis, container) {
  const translate = axis.scroll === "x" ? x : y;
  const containerStyle = container.style;
  let previousTarget = null;
  let disabled = false;
  function x(n) {
    return `translate3d(${n}px,0px,0px)`;
  }
  function y(n) {
    return `translate3d(0px,${n}px,0px)`;
  }
  function to(target) {
    if (disabled) return;
    const newTarget = roundToTwoDecimals(axis.direction(target));
    if (newTarget === previousTarget) return;
    containerStyle.transform = translate(newTarget);
    previousTarget = newTarget;
  }
  function toggleActive(active) {
    disabled = !active;
  }
  function clear() {
    if (disabled) return;
    containerStyle.transform = "";
    if (!container.getAttribute("style")) container.removeAttribute("style");
  }
  const self2 = {
    clear,
    to,
    toggleActive
  };
  return self2;
}
function SlideLooper(axis, viewSize, contentSize, slideSizes, slideSizesWithGaps, snaps, scrollSnaps, location, slides) {
  const roundingSafety = 0.5;
  const ascItems = arrayKeys(slideSizesWithGaps);
  const descItems = arrayKeys(slideSizesWithGaps).reverse();
  const loopPoints = startPoints().concat(endPoints());
  function removeSlideSizes(indexes, from) {
    return indexes.reduce((a, i) => {
      return a - slideSizesWithGaps[i];
    }, from);
  }
  function slidesInGap(indexes, gap) {
    return indexes.reduce((a, i) => {
      const remainingGap = removeSlideSizes(a, gap);
      return remainingGap > 0 ? a.concat([i]) : a;
    }, []);
  }
  function findSlideBounds(offset) {
    return snaps.map((snap, index2) => ({
      start: snap - slideSizes[index2] + roundingSafety + offset,
      end: snap + viewSize - roundingSafety + offset
    }));
  }
  function findLoopPoints(indexes, offset, isEndEdge) {
    const slideBounds = findSlideBounds(offset);
    return indexes.map((index2) => {
      const initial = isEndEdge ? 0 : -contentSize;
      const altered = isEndEdge ? contentSize : 0;
      const boundEdge = isEndEdge ? "end" : "start";
      const loopPoint = slideBounds[index2][boundEdge];
      return {
        index: index2,
        loopPoint,
        slideLocation: Vector1D(-1),
        translate: Translate(axis, slides[index2]),
        target: () => location.get() > loopPoint ? initial : altered
      };
    });
  }
  function startPoints() {
    const gap = scrollSnaps[0];
    const indexes = slidesInGap(descItems, gap);
    return findLoopPoints(indexes, contentSize, false);
  }
  function endPoints() {
    const gap = viewSize - scrollSnaps[0] - 1;
    const indexes = slidesInGap(ascItems, gap);
    return findLoopPoints(indexes, -contentSize, true);
  }
  function canLoop() {
    return loopPoints.every(({
      index: index2
    }) => {
      const otherIndexes = ascItems.filter((i) => i !== index2);
      return removeSlideSizes(otherIndexes, viewSize) <= 0.1;
    });
  }
  function loop() {
    loopPoints.forEach((loopPoint) => {
      const {
        target,
        translate,
        slideLocation
      } = loopPoint;
      const shiftLocation = target();
      if (shiftLocation === slideLocation.get()) return;
      translate.to(shiftLocation);
      slideLocation.set(shiftLocation);
    });
  }
  function clear() {
    loopPoints.forEach((loopPoint) => loopPoint.translate.clear());
  }
  const self2 = {
    canLoop,
    clear,
    loop,
    loopPoints
  };
  return self2;
}
function SlidesHandler(container, eventHandler, watchSlides) {
  let mutationObserver;
  let destroyed = false;
  function init(emblaApi) {
    if (!watchSlides) return;
    function defaultCallback(mutations) {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          emblaApi.reInit();
          eventHandler.emit("slidesChanged");
          break;
        }
      }
    }
    mutationObserver = new MutationObserver((mutations) => {
      if (destroyed) return;
      if (isBoolean(watchSlides) || watchSlides(emblaApi, mutations)) {
        defaultCallback(mutations);
      }
    });
    mutationObserver.observe(container, {
      childList: true
    });
  }
  function destroy2() {
    if (mutationObserver) mutationObserver.disconnect();
    destroyed = true;
  }
  const self2 = {
    init,
    destroy: destroy2
  };
  return self2;
}
function SlidesInView(container, slides, eventHandler, threshold) {
  const intersectionEntryMap = {};
  let inViewCache = null;
  let notInViewCache = null;
  let intersectionObserver;
  let destroyed = false;
  function init() {
    intersectionObserver = new IntersectionObserver((entries) => {
      if (destroyed) return;
      entries.forEach((entry) => {
        const index2 = slides.indexOf(entry.target);
        intersectionEntryMap[index2] = entry;
      });
      inViewCache = null;
      notInViewCache = null;
      eventHandler.emit("slidesInView");
    }, {
      root: container.parentElement,
      threshold
    });
    slides.forEach((slide) => intersectionObserver.observe(slide));
  }
  function destroy2() {
    if (intersectionObserver) intersectionObserver.disconnect();
    destroyed = true;
  }
  function createInViewList(inView) {
    return objectKeys(intersectionEntryMap).reduce((list, slideIndex) => {
      const index2 = parseInt(slideIndex);
      const {
        isIntersecting
      } = intersectionEntryMap[index2];
      const inViewMatch = inView && isIntersecting;
      const notInViewMatch = !inView && !isIntersecting;
      if (inViewMatch || notInViewMatch) list.push(index2);
      return list;
    }, []);
  }
  function get(inView = true) {
    if (inView && inViewCache) return inViewCache;
    if (!inView && notInViewCache) return notInViewCache;
    const slideIndexes = createInViewList(inView);
    if (inView) inViewCache = slideIndexes;
    if (!inView) notInViewCache = slideIndexes;
    return slideIndexes;
  }
  const self2 = {
    init,
    destroy: destroy2,
    get
  };
  return self2;
}
function SlideSizes(axis, containerRect, slideRects, slides, readEdgeGap, ownerWindow) {
  const {
    measureSize,
    startEdge,
    endEdge
  } = axis;
  const withEdgeGap = slideRects[0] && readEdgeGap;
  const startGap = measureStartGap();
  const endGap = measureEndGap();
  const slideSizes = slideRects.map(measureSize);
  const slideSizesWithGaps = measureWithGaps();
  function measureStartGap() {
    if (!withEdgeGap) return 0;
    const slideRect = slideRects[0];
    return mathAbs(containerRect[startEdge] - slideRect[startEdge]);
  }
  function measureEndGap() {
    if (!withEdgeGap) return 0;
    const style2 = ownerWindow.getComputedStyle(arrayLast(slides));
    return parseFloat(style2.getPropertyValue(`margin-${endEdge}`));
  }
  function measureWithGaps() {
    return slideRects.map((rect, index2, rects) => {
      const isFirst = !index2;
      const isLast = arrayIsLastIndex(rects, index2);
      if (isFirst) return slideSizes[index2] + startGap;
      if (isLast) return slideSizes[index2] + endGap;
      return rects[index2 + 1][startEdge] - rect[startEdge];
    }).map(mathAbs);
  }
  const self2 = {
    slideSizes,
    slideSizesWithGaps,
    startGap,
    endGap
  };
  return self2;
}
function SlidesToScroll(axis, viewSize, slidesToScroll, loop, containerRect, slideRects, startGap, endGap, pixelTolerance) {
  const {
    startEdge,
    endEdge,
    direction
  } = axis;
  const groupByNumber = isNumber(slidesToScroll);
  function byNumber(array, groupSize) {
    return arrayKeys(array).filter((i) => i % groupSize === 0).map((i) => array.slice(i, i + groupSize));
  }
  function bySize(array) {
    if (!array.length) return [];
    return arrayKeys(array).reduce((groups, rectB, index2) => {
      const rectA = arrayLast(groups) || 0;
      const isFirst = rectA === 0;
      const isLast = rectB === arrayLastIndex(array);
      const edgeA = containerRect[startEdge] - slideRects[rectA][startEdge];
      const edgeB = containerRect[startEdge] - slideRects[rectB][endEdge];
      const gapA = !loop && isFirst ? direction(startGap) : 0;
      const gapB = !loop && isLast ? direction(endGap) : 0;
      const chunkSize = mathAbs(edgeB - gapB - (edgeA + gapA));
      if (index2 && chunkSize > viewSize + pixelTolerance) groups.push(rectB);
      if (isLast) groups.push(array.length);
      return groups;
    }, []).map((currentSize, index2, groups) => {
      const previousSize = Math.max(groups[index2 - 1] || 0);
      return array.slice(previousSize, currentSize);
    });
  }
  function groupSlides(array) {
    return groupByNumber ? byNumber(array, slidesToScroll) : bySize(array);
  }
  const self2 = {
    groupSlides
  };
  return self2;
}
function Engine(root, container, slides, ownerDocument, ownerWindow, options, eventHandler) {
  const {
    align,
    axis: scrollAxis,
    direction,
    startIndex,
    loop,
    duration,
    dragFree,
    dragThreshold,
    inViewThreshold,
    slidesToScroll: groupSlides,
    skipSnaps,
    containScroll,
    watchResize,
    watchSlides,
    watchDrag,
    watchFocus
  } = options;
  const pixelTolerance = 2;
  const nodeRects = NodeRects();
  const containerRect = nodeRects.measure(container);
  const slideRects = slides.map(nodeRects.measure);
  const axis = Axis(scrollAxis, direction);
  const viewSize = axis.measureSize(containerRect);
  const percentOfView = PercentOfView(viewSize);
  const alignment = Alignment(align, viewSize);
  const containSnaps = !loop && !!containScroll;
  const readEdgeGap = loop || !!containScroll;
  const {
    slideSizes,
    slideSizesWithGaps,
    startGap,
    endGap
  } = SlideSizes(axis, containerRect, slideRects, slides, readEdgeGap, ownerWindow);
  const slidesToScroll = SlidesToScroll(axis, viewSize, groupSlides, loop, containerRect, slideRects, startGap, endGap, pixelTolerance);
  const {
    snaps,
    snapsAligned
  } = ScrollSnaps(axis, alignment, containerRect, slideRects, slidesToScroll);
  const contentSize = -arrayLast(snaps) + arrayLast(slideSizesWithGaps);
  const {
    snapsContained,
    scrollContainLimit
  } = ScrollContain(viewSize, contentSize, snapsAligned, containScroll, pixelTolerance);
  const scrollSnaps = containSnaps ? snapsContained : snapsAligned;
  const {
    limit
  } = ScrollLimit(contentSize, scrollSnaps, loop);
  const index2 = Counter(arrayLastIndex(scrollSnaps), startIndex, loop);
  const indexPrevious = index2.clone();
  const slideIndexes = arrayKeys(slides);
  const update = ({
    dragHandler,
    scrollBody: scrollBody2,
    scrollBounds,
    options: {
      loop: loop2
    }
  }) => {
    if (!loop2) scrollBounds.constrain(dragHandler.pointerDown());
    scrollBody2.seek();
  };
  const render2 = ({
    scrollBody: scrollBody2,
    translate,
    location: location2,
    offsetLocation: offsetLocation2,
    previousLocation: previousLocation2,
    scrollLooper,
    slideLooper,
    dragHandler,
    animation: animation2,
    eventHandler: eventHandler2,
    scrollBounds,
    options: {
      loop: loop2
    }
  }, alpha) => {
    const shouldSettle = scrollBody2.settled();
    const withinBounds = !scrollBounds.shouldConstrain();
    const hasSettled = loop2 ? shouldSettle : shouldSettle && withinBounds;
    const hasSettledAndIdle = hasSettled && !dragHandler.pointerDown();
    if (hasSettledAndIdle) animation2.stop();
    const interpolatedLocation = location2.get() * alpha + previousLocation2.get() * (1 - alpha);
    offsetLocation2.set(interpolatedLocation);
    if (loop2) {
      scrollLooper.loop(scrollBody2.direction());
      slideLooper.loop();
    }
    translate.to(offsetLocation2.get());
    if (hasSettledAndIdle) eventHandler2.emit("settle");
    if (!hasSettled) eventHandler2.emit("scroll");
  };
  const animation = Animations(ownerDocument, ownerWindow, () => update(engine2), (alpha) => render2(engine2, alpha));
  const friction = 0.68;
  const startLocation = scrollSnaps[index2.get()];
  const location = Vector1D(startLocation);
  const previousLocation = Vector1D(startLocation);
  const offsetLocation = Vector1D(startLocation);
  const target = Vector1D(startLocation);
  const scrollBody = ScrollBody(location, offsetLocation, previousLocation, target, duration, friction);
  const scrollTarget = ScrollTarget(loop, scrollSnaps, contentSize, limit, target);
  const scrollTo = ScrollTo(animation, index2, indexPrevious, scrollBody, scrollTarget, target, eventHandler);
  const scrollProgress = ScrollProgress(limit);
  const eventStore = EventStore();
  const slidesInView = SlidesInView(container, slides, eventHandler, inViewThreshold);
  const {
    slideRegistry
  } = SlideRegistry(containSnaps, containScroll, scrollSnaps, scrollContainLimit, slidesToScroll, slideIndexes);
  const slideFocus = SlideFocus(root, slides, slideRegistry, scrollTo, scrollBody, eventStore, eventHandler, watchFocus);
  const engine2 = {
    ownerDocument,
    ownerWindow,
    eventHandler,
    containerRect,
    slideRects,
    animation,
    axis,
    dragHandler: DragHandler(axis, root, ownerDocument, ownerWindow, target, DragTracker(axis, ownerWindow), location, animation, scrollTo, scrollBody, scrollTarget, index2, eventHandler, percentOfView, dragFree, dragThreshold, skipSnaps, friction, watchDrag),
    eventStore,
    percentOfView,
    index: index2,
    indexPrevious,
    limit,
    location,
    offsetLocation,
    previousLocation,
    options,
    resizeHandler: ResizeHandler(container, eventHandler, ownerWindow, slides, axis, watchResize, nodeRects),
    scrollBody,
    scrollBounds: ScrollBounds(limit, offsetLocation, target, scrollBody, percentOfView),
    scrollLooper: ScrollLooper(contentSize, limit, offsetLocation, [location, offsetLocation, previousLocation, target]),
    scrollProgress,
    scrollSnapList: scrollSnaps.map(scrollProgress.get),
    scrollSnaps,
    scrollTarget,
    scrollTo,
    slideLooper: SlideLooper(axis, viewSize, contentSize, slideSizes, slideSizesWithGaps, snaps, scrollSnaps, offsetLocation, slides),
    slideFocus,
    slidesHandler: SlidesHandler(container, eventHandler, watchSlides),
    slidesInView,
    slideIndexes,
    slideRegistry,
    slidesToScroll,
    target,
    translate: Translate(axis, container)
  };
  return engine2;
}
function EventHandler() {
  let listeners = {};
  let api;
  function init(emblaApi) {
    api = emblaApi;
  }
  function getListeners(evt) {
    return listeners[evt] || [];
  }
  function emit(evt) {
    getListeners(evt).forEach((e) => e(api, evt));
    return self2;
  }
  function on(evt, cb) {
    listeners[evt] = getListeners(evt).concat([cb]);
    return self2;
  }
  function off(evt, cb) {
    listeners[evt] = getListeners(evt).filter((e) => e !== cb);
    return self2;
  }
  function clear() {
    listeners = {};
  }
  const self2 = {
    init,
    emit,
    off,
    on,
    clear
  };
  return self2;
}
var defaultOptions = {
  align: "center",
  axis: "x",
  container: null,
  slides: null,
  containScroll: "trimSnaps",
  direction: "ltr",
  slidesToScroll: 1,
  inViewThreshold: 0,
  breakpoints: {},
  dragFree: false,
  dragThreshold: 10,
  loop: false,
  skipSnaps: false,
  duration: 25,
  startIndex: 0,
  active: true,
  watchDrag: true,
  watchResize: true,
  watchSlides: true,
  watchFocus: true
};
function OptionsHandler(ownerWindow) {
  function mergeOptions(optionsA, optionsB) {
    return objectsMergeDeep(optionsA, optionsB || {});
  }
  function optionsAtMedia(options) {
    const optionsAtMedia2 = options.breakpoints || {};
    const matchedMediaOptions = objectKeys(optionsAtMedia2).filter((media) => ownerWindow.matchMedia(media).matches).map((media) => optionsAtMedia2[media]).reduce((a, mediaOption) => mergeOptions(a, mediaOption), {});
    return mergeOptions(options, matchedMediaOptions);
  }
  function optionsMediaQueries(optionsList) {
    return optionsList.map((options) => objectKeys(options.breakpoints || {})).reduce((acc, mediaQueries) => acc.concat(mediaQueries), []).map(ownerWindow.matchMedia);
  }
  const self2 = {
    mergeOptions,
    optionsAtMedia,
    optionsMediaQueries
  };
  return self2;
}
function PluginsHandler(optionsHandler) {
  let activePlugins = [];
  function init(emblaApi, plugins) {
    activePlugins = plugins.filter(({
      options
    }) => optionsHandler.optionsAtMedia(options).active !== false);
    activePlugins.forEach((plugin) => plugin.init(emblaApi, optionsHandler));
    return plugins.reduce((map, plugin) => Object.assign(map, {
      [plugin.name]: plugin
    }), {});
  }
  function destroy2() {
    activePlugins = activePlugins.filter((plugin) => plugin.destroy());
  }
  const self2 = {
    init,
    destroy: destroy2
  };
  return self2;
}
function EmblaCarousel(root, userOptions, userPlugins) {
  const ownerDocument = root.ownerDocument;
  const ownerWindow = ownerDocument.defaultView;
  const optionsHandler = OptionsHandler(ownerWindow);
  const pluginsHandler = PluginsHandler(optionsHandler);
  const mediaHandlers = EventStore();
  const eventHandler = EventHandler();
  const {
    mergeOptions,
    optionsAtMedia,
    optionsMediaQueries
  } = optionsHandler;
  const {
    on,
    off,
    emit
  } = eventHandler;
  const reInit = reActivate;
  let destroyed = false;
  let engine2;
  let optionsBase = mergeOptions(defaultOptions, EmblaCarousel.globalOptions);
  let options = mergeOptions(optionsBase);
  let pluginList = [];
  let pluginApis;
  let container;
  let slides;
  function storeElements() {
    const {
      container: userContainer,
      slides: userSlides
    } = options;
    const customContainer = isString(userContainer) ? root.querySelector(userContainer) : userContainer;
    container = customContainer || root.children[0];
    const customSlides = isString(userSlides) ? container.querySelectorAll(userSlides) : userSlides;
    slides = [].slice.call(customSlides || container.children);
  }
  function createEngine(options2) {
    const engine3 = Engine(root, container, slides, ownerDocument, ownerWindow, options2, eventHandler);
    if (options2.loop && !engine3.slideLooper.canLoop()) {
      const optionsWithoutLoop = Object.assign({}, options2, {
        loop: false
      });
      return createEngine(optionsWithoutLoop);
    }
    return engine3;
  }
  function activate(withOptions, withPlugins) {
    if (destroyed) return;
    optionsBase = mergeOptions(optionsBase, withOptions);
    options = optionsAtMedia(optionsBase);
    pluginList = withPlugins || pluginList;
    storeElements();
    engine2 = createEngine(options);
    optionsMediaQueries([optionsBase, ...pluginList.map(({
      options: options2
    }) => options2)]).forEach((query) => mediaHandlers.add(query, "change", reActivate));
    if (!options.active) return;
    engine2.translate.to(engine2.location.get());
    engine2.animation.init();
    engine2.slidesInView.init();
    engine2.slideFocus.init(self2);
    engine2.eventHandler.init(self2);
    engine2.resizeHandler.init(self2);
    engine2.slidesHandler.init(self2);
    if (engine2.options.loop) engine2.slideLooper.loop();
    if (container.offsetParent && slides.length) engine2.dragHandler.init(self2);
    pluginApis = pluginsHandler.init(self2, pluginList);
  }
  function reActivate(withOptions, withPlugins) {
    const startIndex = selectedScrollSnap();
    deActivate();
    activate(mergeOptions({
      startIndex
    }, withOptions), withPlugins);
    eventHandler.emit("reInit");
  }
  function deActivate() {
    engine2.dragHandler.destroy();
    engine2.eventStore.clear();
    engine2.translate.clear();
    engine2.slideLooper.clear();
    engine2.resizeHandler.destroy();
    engine2.slidesHandler.destroy();
    engine2.slidesInView.destroy();
    engine2.animation.destroy();
    pluginsHandler.destroy();
    mediaHandlers.clear();
  }
  function destroy2() {
    if (destroyed) return;
    destroyed = true;
    mediaHandlers.clear();
    deActivate();
    eventHandler.emit("destroy");
    eventHandler.clear();
  }
  function scrollTo(index2, jump, direction) {
    if (!options.active || destroyed) return;
    engine2.scrollBody.useBaseFriction().useDuration(jump === true ? 0 : options.duration);
    engine2.scrollTo.index(index2, direction || 0);
  }
  function scrollNext(jump) {
    const next = engine2.index.add(1).get();
    scrollTo(next, jump, -1);
  }
  function scrollPrev(jump) {
    const prev = engine2.index.add(-1).get();
    scrollTo(prev, jump, 1);
  }
  function canScrollNext() {
    const next = engine2.index.add(1).get();
    return next !== selectedScrollSnap();
  }
  function canScrollPrev() {
    const prev = engine2.index.add(-1).get();
    return prev !== selectedScrollSnap();
  }
  function scrollSnapList() {
    return engine2.scrollSnapList;
  }
  function scrollProgress() {
    return engine2.scrollProgress.get(engine2.offsetLocation.get());
  }
  function selectedScrollSnap() {
    return engine2.index.get();
  }
  function previousScrollSnap() {
    return engine2.indexPrevious.get();
  }
  function slidesInView() {
    return engine2.slidesInView.get();
  }
  function slidesNotInView() {
    return engine2.slidesInView.get(false);
  }
  function plugins() {
    return pluginApis;
  }
  function internalEngine() {
    return engine2;
  }
  function rootNode() {
    return root;
  }
  function containerNode() {
    return container;
  }
  function slideNodes() {
    return slides;
  }
  const self2 = {
    canScrollNext,
    canScrollPrev,
    containerNode,
    internalEngine,
    destroy: destroy2,
    off,
    on,
    emit,
    plugins,
    previousScrollSnap,
    reInit,
    rootNode,
    scrollNext,
    scrollPrev,
    scrollProgress,
    scrollSnapList,
    scrollTo,
    selectedScrollSnap,
    slideNodes,
    slidesInView,
    slidesNotInView
  };
  activate(userOptions, userPlugins);
  setTimeout(() => eventHandler.emit("init"), 0);
  return self2;
}
EmblaCarousel.globalOptions = void 0;

// node_modules/.pnpm/embla-carousel-autoplay@8.6.0_embla-carousel@8.6.0/node_modules/embla-carousel-autoplay/esm/embla-carousel-autoplay.esm.js
var defaultOptions2 = {
  active: true,
  breakpoints: {},
  delay: 4e3,
  jump: false,
  playOnInit: true,
  stopOnFocusIn: true,
  stopOnInteraction: true,
  stopOnMouseEnter: false,
  stopOnLastSnap: false,
  rootNode: null
};
function normalizeDelay(emblaApi, delay) {
  const scrollSnaps = emblaApi.scrollSnapList();
  if (typeof delay === "number") {
    return scrollSnaps.map(() => delay);
  }
  return delay(scrollSnaps, emblaApi);
}
function getAutoplayRootNode(emblaApi, rootNode) {
  const emblaRootNode = emblaApi.rootNode();
  return rootNode && rootNode(emblaRootNode) || emblaRootNode;
}
function Autoplay(userOptions = {}) {
  let options;
  let emblaApi;
  let destroyed;
  let delay;
  let timerStartTime = null;
  let timerId2 = 0;
  let autoplayActive = false;
  let mouseIsOver = false;
  let playOnDocumentVisible = false;
  let jump = false;
  function init(emblaApiInstance, optionsHandler) {
    emblaApi = emblaApiInstance;
    const {
      mergeOptions,
      optionsAtMedia
    } = optionsHandler;
    const optionsBase = mergeOptions(defaultOptions2, Autoplay.globalOptions);
    const allOptions = mergeOptions(optionsBase, userOptions);
    options = optionsAtMedia(allOptions);
    if (emblaApi.scrollSnapList().length <= 1) return;
    jump = options.jump;
    destroyed = false;
    delay = normalizeDelay(emblaApi, options.delay);
    const {
      eventStore,
      ownerDocument
    } = emblaApi.internalEngine();
    const isDraggable = !!emblaApi.internalEngine().options.watchDrag;
    const root = getAutoplayRootNode(emblaApi, options.rootNode);
    eventStore.add(ownerDocument, "visibilitychange", visibilityChange);
    if (isDraggable) {
      emblaApi.on("pointerDown", pointerDown);
    }
    if (isDraggable && !options.stopOnInteraction) {
      emblaApi.on("pointerUp", pointerUp);
    }
    if (options.stopOnMouseEnter) {
      eventStore.add(root, "mouseenter", mouseEnter);
    }
    if (options.stopOnMouseEnter && !options.stopOnInteraction) {
      eventStore.add(root, "mouseleave", mouseLeave);
    }
    if (options.stopOnFocusIn) {
      emblaApi.on("slideFocusStart", stopAutoplay);
    }
    if (options.stopOnFocusIn && !options.stopOnInteraction) {
      eventStore.add(emblaApi.containerNode(), "focusout", startAutoplay);
    }
    if (options.playOnInit) startAutoplay();
  }
  function destroy2() {
    emblaApi.off("pointerDown", pointerDown).off("pointerUp", pointerUp).off("slideFocusStart", stopAutoplay);
    stopAutoplay();
    destroyed = true;
    autoplayActive = false;
  }
  function setTimer() {
    const {
      ownerWindow
    } = emblaApi.internalEngine();
    ownerWindow.clearTimeout(timerId2);
    timerId2 = ownerWindow.setTimeout(next, delay[emblaApi.selectedScrollSnap()]);
    timerStartTime = (/* @__PURE__ */ new Date()).getTime();
    emblaApi.emit("autoplay:timerset");
  }
  function clearTimer() {
    const {
      ownerWindow
    } = emblaApi.internalEngine();
    ownerWindow.clearTimeout(timerId2);
    timerId2 = 0;
    timerStartTime = null;
    emblaApi.emit("autoplay:timerstopped");
  }
  function startAutoplay() {
    if (destroyed) return;
    if (documentIsHidden()) {
      playOnDocumentVisible = true;
      return;
    }
    if (!autoplayActive) emblaApi.emit("autoplay:play");
    setTimer();
    autoplayActive = true;
  }
  function stopAutoplay() {
    if (destroyed) return;
    if (autoplayActive) emblaApi.emit("autoplay:stop");
    clearTimer();
    autoplayActive = false;
  }
  function visibilityChange() {
    if (documentIsHidden()) {
      playOnDocumentVisible = autoplayActive;
      return stopAutoplay();
    }
    if (playOnDocumentVisible) startAutoplay();
  }
  function documentIsHidden() {
    const {
      ownerDocument
    } = emblaApi.internalEngine();
    return ownerDocument.visibilityState === "hidden";
  }
  function pointerDown() {
    if (!mouseIsOver) stopAutoplay();
  }
  function pointerUp() {
    if (!mouseIsOver) startAutoplay();
  }
  function mouseEnter() {
    mouseIsOver = true;
    stopAutoplay();
  }
  function mouseLeave() {
    mouseIsOver = false;
    startAutoplay();
  }
  function play(jumpOverride) {
    if (typeof jumpOverride !== "undefined") jump = jumpOverride;
    startAutoplay();
  }
  function stop() {
    if (autoplayActive) stopAutoplay();
  }
  function reset() {
    if (autoplayActive) startAutoplay();
  }
  function isPlaying() {
    return autoplayActive;
  }
  function next() {
    const {
      index: index2
    } = emblaApi.internalEngine();
    const nextIndex = index2.clone().add(1).get();
    const lastIndex = emblaApi.scrollSnapList().length - 1;
    const kill = options.stopOnLastSnap && nextIndex === lastIndex;
    if (emblaApi.canScrollNext()) {
      emblaApi.scrollNext(jump);
    } else {
      emblaApi.scrollTo(0, jump);
    }
    emblaApi.emit("autoplay:select");
    if (kill) return stopAutoplay();
    startAutoplay();
  }
  function timeUntilNext() {
    if (!timerStartTime) return null;
    const currentDelay = delay[emblaApi.selectedScrollSnap()];
    const timePastSinceStart = (/* @__PURE__ */ new Date()).getTime() - timerStartTime;
    return currentDelay - timePastSinceStart;
  }
  const self2 = {
    name: "autoplay",
    options: userOptions,
    init,
    destroy: destroy2,
    play,
    stop,
    reset,
    isPlaying,
    timeUntilNext
  };
  return self2;
}
Autoplay.globalOptions = void 0;

// node_modules/.pnpm/animejs@4.3.6/node_modules/animejs/dist/modules/core/consts.js
var isBrowser = typeof window !== "undefined";
var win = isBrowser ? (
  /** @type {AnimeJSWindow} */
  /** @type {unknown} */
  window
) : null;
var doc = isBrowser ? document : null;
var tweenTypes = {
  OBJECT: 0,
  ATTRIBUTE: 1,
  CSS: 2,
  TRANSFORM: 3,
  CSS_VAR: 4
};
var valueTypes = {
  NUMBER: 0,
  UNIT: 1,
  COLOR: 2,
  COMPLEX: 3
};
var tickModes = {
  NONE: 0,
  AUTO: 1,
  FORCE: 2
};
var compositionTypes = {
  replace: 0,
  none: 1,
  blend: 2
};
var isRegisteredTargetSymbol = Symbol();
var isDomSymbol = Symbol();
var isSvgSymbol = Symbol();
var transformsSymbol = Symbol();
var morphPointsSymbol = Symbol();
var proxyTargetSymbol = Symbol();
var minValue = 1e-11;
var maxValue = 1e12;
var K = 1e3;
var maxFps = 240;
var emptyString = "";
var cssVarPrefix = "var(";
var shortTransforms = /* @__PURE__ */ (() => {
  const map = /* @__PURE__ */ new Map();
  map.set("x", "translateX");
  map.set("y", "translateY");
  map.set("z", "translateZ");
  return map;
})();
var validTransforms = [
  "translateX",
  "translateY",
  "translateZ",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "scale",
  "scaleX",
  "scaleY",
  "scaleZ",
  "skew",
  "skewX",
  "skewY",
  "matrix",
  "matrix3d",
  "perspective"
];
var transformsFragmentStrings = /* @__PURE__ */ validTransforms.reduce((a, v) => ({ ...a, [v]: v + "(" }), {});
var noop = () => {
};
var validRgbHslRgx = /\)\s*[-.\d]/;
var hexTestRgx = /(^#([\da-f]{3}){1,2}$)|(^#([\da-f]{4}){1,2}$)/i;
var rgbExecRgx = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i;
var rgbaExecRgx = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i;
var hslExecRgx = /hsl\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*\)/i;
var hslaExecRgx = /hsla\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i;
var digitWithExponentRgx = /[-+]?\d*\.?\d+(?:e[-+]?\d)?/gi;
var unitsExecRgx = /^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)([a-z]+|%)$/i;
var lowerCaseRgx = /([a-z])([A-Z])/g;
var transformsExecRgx = /(\w+)(\([^)]+\)+)/g;
var relativeValuesExecRgx = /(\*=|\+=|-=)/;
var cssVariableMatchRgx = /var\(\s*(--[\w-]+)(?:\s*,\s*([^)]+))?\s*\)/;

// node_modules/.pnpm/animejs@4.3.6/node_modules/animejs/dist/modules/core/globals.js
var defaults2 = {
  id: null,
  keyframes: null,
  playbackEase: null,
  playbackRate: 1,
  frameRate: maxFps,
  loop: 0,
  reversed: false,
  alternate: false,
  autoplay: true,
  persist: false,
  duration: K,
  delay: 0,
  loopDelay: 0,
  ease: "out(2)",
  composition: compositionTypes.replace,
  modifier: (v) => v,
  onBegin: noop,
  onBeforeUpdate: noop,
  onUpdate: noop,
  onLoop: noop,
  onPause: noop,
  onComplete: noop,
  onRender: noop
};
var scope = {
  /** @type {Scope} */
  current: null,
  /** @type {Document|DOMTarget} */
  root: doc
};
var globals = {
  /** @type {DefaultsParams} */
  defaults: defaults2,
  /** @type {Number} */
  precision: 4,
  /** @type {Number} equals 1 in ms mode, 0.001 in s mode */
  timeScale: 1,
  /** @type {Number} */
  tickThreshold: 200
};
var devTools = isBrowser && win.AnimeJSDevTools;
var globalVersions = { version: "4.3.6", engine: null };
if (isBrowser) {
  if (!win.AnimeJS) win.AnimeJS = [];
  win.AnimeJS.push(globalVersions);
}

// node_modules/.pnpm/animejs@4.3.6/node_modules/animejs/dist/modules/core/helpers.js
var toLowerCase = (str) => str.replace(lowerCaseRgx, "$1-$2").toLowerCase();
var stringStartsWith = (str, sub) => str.indexOf(sub) === 0;
var now = Date.now;
var isArr = Array.isArray;
var isObj = (a) => a && a.constructor === Object;
var isNum = (a) => typeof a === "number" && !isNaN(a);
var isStr = (a) => typeof a === "string";
var isFnc = (a) => typeof a === "function";
var isUnd = (a) => typeof a === "undefined";
var isNil = (a) => isUnd(a) || a === null;
var isSvg = (a) => isBrowser && a instanceof SVGElement;
var isHex = (a) => hexTestRgx.test(a);
var isRgb = (a) => stringStartsWith(a, "rgb");
var isHsl = (a) => stringStartsWith(a, "hsl");
var isCol = (a) => isHex(a) || (isRgb(a) || isHsl(a)) && (a[a.length - 1] === ")" || !validRgbHslRgx.test(a));
var isKey = (a) => !globals.defaults.hasOwnProperty(a);
var svgCssReservedProperties = ["opacity", "rotate", "overflow", "color"];
var isValidSVGAttribute = (el, propertyName) => {
  if (svgCssReservedProperties.includes(propertyName)) return false;
  if (el.getAttribute(propertyName) || propertyName in el) {
    if (propertyName === "scale") {
      const elParentNode = (
        /** @type {SVGGeometryElement} */
        /** @type {DOMTarget} */
        el.parentNode
      );
      return elParentNode && elParentNode.tagName === "filter";
    }
    return true;
  }
};
var parseNumber = (str) => isStr(str) ? parseFloat(
  /** @type {String} */
  str
) : (
  /** @type {Number} */
  str
);
var pow = Math.pow;
var sqrt = Math.sqrt;
var sin = Math.sin;
var cos = Math.cos;
var abs = Math.abs;
var floor = Math.floor;
var asin = Math.asin;
var max = Math.max;
var PI = Math.PI;
var _round = Math.round;
var clamp = (v, min, max2) => v < min ? min : v > max2 ? max2 : v;
var powCache = {};
var round = (v, decimalLength) => {
  if (decimalLength < 0) return v;
  if (!decimalLength) return _round(v);
  let p = powCache[decimalLength];
  if (!p) p = powCache[decimalLength] = 10 ** decimalLength;
  return _round(v * p) / p;
};
var lerp = (start, end, factor) => start + (end - start) * factor;
var clampInfinity = (v) => v === Infinity ? maxValue : v === -Infinity ? -maxValue : v;
var normalizeTime = (v) => v <= minValue ? minValue : clampInfinity(round(v, 11));
var cloneArray = (a) => isArr(a) ? [...a] : a;
var mergeObjects = (o1, o2) => {
  const merged = (
    /** @type {T & U} */
    { ...o1 }
  );
  for (let p in o2) {
    const o1p = (
      /** @type {T & U} */
      o1[p]
    );
    merged[p] = isUnd(o1p) ? (
      /** @type {T & U} */
      o2[p]
    ) : o1p;
  }
  return merged;
};
var forEachChildren = (parent, callback, reverse, prevProp = "_prev", nextProp = "_next") => {
  let next = parent._head;
  let adjustedNextProp = nextProp;
  if (reverse) {
    next = parent._tail;
    adjustedNextProp = prevProp;
  }
  while (next) {
    const currentNext = next[adjustedNextProp];
    callback(next);
    next = currentNext;
  }
};
var removeChild = (parent, child, prevProp = "_prev", nextProp = "_next") => {
  const prev = child[prevProp];
  const next = child[nextProp];
  prev ? prev[nextProp] = next : parent._head = next;
  next ? next[prevProp] = prev : parent._tail = prev;
  child[prevProp] = null;
  child[nextProp] = null;
};
var addChild = (parent, child, sortMethod, prevProp = "_prev", nextProp = "_next") => {
  let prev = parent._tail;
  while (prev && sortMethod && sortMethod(prev, child)) prev = prev[prevProp];
  const next = prev ? prev[nextProp] : parent._head;
  prev ? prev[nextProp] = child : parent._head = child;
  next ? next[prevProp] = child : parent._tail = child;
  child[prevProp] = prev;
  child[nextProp] = next;
};

// node_modules/.pnpm/animejs@4.3.6/node_modules/animejs/dist/modules/core/transforms.js
var parseInlineTransforms = (target, propName, animationInlineStyles) => {
  const inlineTransforms = target.style.transform;
  let inlinedStylesPropertyValue;
  if (inlineTransforms) {
    const cachedTransforms = target[transformsSymbol];
    let t;
    while (t = transformsExecRgx.exec(inlineTransforms)) {
      const inlinePropertyName = t[1];
      const inlinePropertyValue = t[2].slice(1, -1);
      cachedTransforms[inlinePropertyName] = inlinePropertyValue;
      if (inlinePropertyName === propName) {
        inlinedStylesPropertyValue = inlinePropertyValue;
        if (animationInlineStyles) {
          animationInlineStyles[propName] = inlinePropertyValue;
        }
      }
    }
  }
  return inlineTransforms && !isUnd(inlinedStylesPropertyValue) ? inlinedStylesPropertyValue : stringStartsWith(propName, "scale") ? "1" : stringStartsWith(propName, "rotate") || stringStartsWith(propName, "skew") ? "0deg" : "0px";
};

// node_modules/.pnpm/animejs@4.3.6/node_modules/animejs/dist/modules/core/colors.js
var rgbToRgba = (rgbValue) => {
  const rgba = rgbExecRgx.exec(rgbValue) || rgbaExecRgx.exec(rgbValue);
  const a = !isUnd(rgba[4]) ? +rgba[4] : 1;
  return [
    +rgba[1],
    +rgba[2],
    +rgba[3],
    a
  ];
};
var hexToRgba = (hexValue) => {
  const hexLength = hexValue.length;
  const isShort = hexLength === 4 || hexLength === 5;
  return [
    +("0x" + hexValue[1] + hexValue[isShort ? 1 : 2]),
    +("0x" + hexValue[isShort ? 2 : 3] + hexValue[isShort ? 2 : 4]),
    +("0x" + hexValue[isShort ? 3 : 5] + hexValue[isShort ? 3 : 6]),
    hexLength === 5 || hexLength === 9 ? +(+("0x" + hexValue[isShort ? 4 : 7] + hexValue[isShort ? 4 : 8]) / 255).toFixed(3) : 1
  ];
};
var hue2rgb = (p, q, t) => {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  return t < 1 / 6 ? p + (q - p) * 6 * t : t < 1 / 2 ? q : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p;
};
var hslToRgba = (hslValue) => {
  const hsla = hslExecRgx.exec(hslValue) || hslaExecRgx.exec(hslValue);
  const h = +hsla[1] / 360;
  const s = +hsla[2] / 100;
  const l = +hsla[3] / 100;
  const a = !isUnd(hsla[4]) ? +hsla[4] : 1;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = round(hue2rgb(p, q, h + 1 / 3) * 255, 0);
    g = round(hue2rgb(p, q, h) * 255, 0);
    b = round(hue2rgb(p, q, h - 1 / 3) * 255, 0);
  }
  return [r, g, b, a];
};
var convertColorStringValuesToRgbaArray = (colorString) => {
  return isRgb(colorString) ? rgbToRgba(colorString) : isHex(colorString) ? hexToRgba(colorString) : isHsl(colorString) ? hslToRgba(colorString) : [0, 0, 0, 1];
};

// node_modules/.pnpm/animejs@4.3.6/node_modules/animejs/dist/modules/core/values.js
var setValue = (targetValue, defaultValue) => {
  return isUnd(targetValue) ? defaultValue : targetValue;
};
var getFunctionValue = (value, target, index2, total, store) => {
  let func;
  if (isFnc(value)) {
    func = () => {
      const computed = (
        /** @type {Function} */
        value(target, index2, total)
      );
      return !isNaN(+computed) ? +computed : computed || 0;
    };
  } else if (isStr(value) && stringStartsWith(value, cssVarPrefix)) {
    func = () => {
      const match = value.match(cssVariableMatchRgx);
      const cssVarName = match[1];
      const fallbackValue = match[2];
      let computed = getComputedStyle(
        /** @type {HTMLElement} */
        target
      )?.getPropertyValue(cssVarName);
      if ((!computed || computed.trim() === emptyString) && fallbackValue) {
        computed = fallbackValue.trim();
      }
      return computed || 0;
    };
  } else {
    return value;
  }
  if (store) store.func = func;
  return func();
};
var getTweenType = (target, prop) => {
  return !target[isDomSymbol] ? tweenTypes.OBJECT : (
    // Handle SVG attributes
    target[isSvgSymbol] && isValidSVGAttribute(target, prop) ? tweenTypes.ATTRIBUTE : (
      // Handle CSS Transform properties differently than CSS to allow individual animations
      validTransforms.includes(prop) || shortTransforms.get(prop) ? tweenTypes.TRANSFORM : (
        // CSS variables
        stringStartsWith(prop, "--") ? tweenTypes.CSS_VAR : (
          // All other CSS properties
          prop in /** @type {DOMTarget} */
          target.style ? tweenTypes.CSS : (
            // Handle other DOM Attributes
            prop in target ? tweenTypes.OBJECT : tweenTypes.ATTRIBUTE
          )
        )
      )
    )
  );
};
var getCSSValue = (target, propName, animationInlineStyles) => {
  const inlineStyles = target.style[propName];
  if (inlineStyles && animationInlineStyles) {
    animationInlineStyles[propName] = inlineStyles;
  }
  const value = inlineStyles || getComputedStyle(target[proxyTargetSymbol] || target).getPropertyValue(propName);
  return value === "auto" ? "0" : value;
};
var getOriginalAnimatableValue = (target, propName, tweenType, animationInlineStyles) => {
  const type = !isUnd(tweenType) ? tweenType : getTweenType(target, propName);
  return type === tweenTypes.OBJECT ? target[propName] || 0 : type === tweenTypes.ATTRIBUTE ? (
    /** @type {DOMTarget} */
    target.getAttribute(propName)
  ) : type === tweenTypes.TRANSFORM ? parseInlineTransforms(
    /** @type {DOMTarget} */
    target,
    propName,
    animationInlineStyles
  ) : type === tweenTypes.CSS_VAR ? getCSSValue(
    /** @type {DOMTarget} */
    target,
    propName,
    animationInlineStyles
  ).trimStart() : getCSSValue(
    /** @type {DOMTarget} */
    target,
    propName,
    animationInlineStyles
  );
};
var getRelativeValue = (x, y, operator) => {
  return operator === "-" ? x - y : operator === "+" ? x + y : x * y;
};
var createDecomposedValueTargetObject = () => {
  return {
    /** @type {valueTypes} */
    t: valueTypes.NUMBER,
    n: 0,
    u: null,
    o: null,
    d: null,
    s: null
  };
};
var decomposeRawValue = (rawValue, targetObject) => {
  targetObject.t = valueTypes.NUMBER;
  targetObject.n = 0;
  targetObject.u = null;
  targetObject.o = null;
  targetObject.d = null;
  targetObject.s = null;
  if (!rawValue) return targetObject;
  const num = +rawValue;
  if (!isNaN(num)) {
    targetObject.n = num;
    return targetObject;
  } else {
    let str = (
      /** @type {String} */
      rawValue
    );
    if (str[1] === "=") {
      targetObject.o = str[0];
      str = str.slice(2);
    }
    const unitMatch = str.includes(" ") ? false : unitsExecRgx.exec(str);
    if (unitMatch) {
      targetObject.t = valueTypes.UNIT;
      targetObject.n = +unitMatch[1];
      targetObject.u = unitMatch[2];
      return targetObject;
    } else if (targetObject.o) {
      targetObject.n = +str;
      return targetObject;
    } else if (isCol(str)) {
      targetObject.t = valueTypes.COLOR;
      targetObject.d = convertColorStringValuesToRgbaArray(str);
      return targetObject;
    } else {
      const matchedNumbers = str.match(digitWithExponentRgx);
      targetObject.t = valueTypes.COMPLEX;
      targetObject.d = matchedNumbers ? matchedNumbers.map(Number) : [];
      targetObject.s = str.split(digitWithExponentRgx) || [];
      return targetObject;
    }
  }
};
var decomposeTweenValue = (tween, targetObject) => {
  targetObject.t = tween._valueType;
  targetObject.n = tween._toNumber;
  targetObject.u = tween._unit;
  targetObject.o = null;
  targetObject.d = cloneArray(tween._toNumbers);
  targetObject.s = cloneArray(tween._strings);
  return targetObject;
};
var decomposedOriginalValue = createDecomposedValueTargetObject();

// node_modules/.pnpm/animejs@4.3.6/node_modules/animejs/dist/modules/core/render.js
var render = (tickable, time, muteCallbacks, internalRender, tickMode) => {
  const parent = tickable.parent;
  const duration = tickable.duration;
  const completed = tickable.completed;
  const iterationDuration = tickable.iterationDuration;
  const iterationCount = tickable.iterationCount;
  const _currentIteration = tickable._currentIteration;
  const _loopDelay = tickable._loopDelay;
  const _reversed = tickable._reversed;
  const _alternate = tickable._alternate;
  const _hasChildren = tickable._hasChildren;
  const tickableDelay = tickable._delay;
  const tickablePrevAbsoluteTime = tickable._currentTime;
  const tickableEndTime = tickableDelay + iterationDuration;
  const tickableAbsoluteTime = time - tickableDelay;
  const tickablePrevTime = clamp(tickablePrevAbsoluteTime, -tickableDelay, duration);
  const tickableCurrentTime = clamp(tickableAbsoluteTime, -tickableDelay, duration);
  const deltaTime = tickableAbsoluteTime - tickablePrevAbsoluteTime;
  const isCurrentTimeAboveZero = tickableCurrentTime > 0;
  const isCurrentTimeEqualOrAboveDuration = tickableCurrentTime >= duration;
  const isSetter = duration <= minValue;
  const forcedTick = tickMode === tickModes.FORCE;
  let isOdd = 0;
  let iterationElapsedTime = tickableAbsoluteTime;
  let hasRendered = 0;
  if (iterationCount > 1) {
    const currentIteration = ~~(tickableCurrentTime / (iterationDuration + (isCurrentTimeEqualOrAboveDuration ? 0 : _loopDelay)));
    tickable._currentIteration = clamp(currentIteration, 0, iterationCount);
    if (isCurrentTimeEqualOrAboveDuration) tickable._currentIteration--;
    isOdd = tickable._currentIteration % 2;
    iterationElapsedTime = tickableCurrentTime % (iterationDuration + _loopDelay) || 0;
  }
  const isReversed = _reversed ^ (_alternate && isOdd);
  const _ease = (
    /** @type {Renderable} */
    tickable._ease
  );
  let iterationTime = isCurrentTimeEqualOrAboveDuration ? isReversed ? 0 : duration : isReversed ? iterationDuration - iterationElapsedTime : iterationElapsedTime;
  if (_ease) iterationTime = iterationDuration * _ease(iterationTime / iterationDuration) || 0;
  const isRunningBackwards = (parent ? parent.backwards : tickableAbsoluteTime < tickablePrevAbsoluteTime) ? !isReversed : !!isReversed;
  tickable._currentTime = tickableAbsoluteTime;
  tickable._iterationTime = iterationTime;
  tickable.backwards = isRunningBackwards;
  if (isCurrentTimeAboveZero && !tickable.began) {
    tickable.began = true;
    if (!muteCallbacks && !(parent && (isRunningBackwards || !parent.began))) {
      tickable.onBegin(
        /** @type {CallbackArgument} */
        tickable
      );
    }
  } else if (tickableAbsoluteTime <= 0) {
    tickable.began = false;
  }
  if (!muteCallbacks && !_hasChildren && isCurrentTimeAboveZero && tickable._currentIteration !== _currentIteration) {
    tickable.onLoop(
      /** @type {CallbackArgument} */
      tickable
    );
  }
  if (forcedTick || tickMode === tickModes.AUTO && (time >= tickableDelay && time <= tickableEndTime || // Normal render
  time <= tickableDelay && tickablePrevTime > tickableDelay || // Playhead is before the animation start time so make sure the animation is at its initial state
  time >= tickableEndTime && tickablePrevTime !== duration) || iterationTime >= tickableEndTime && tickablePrevTime !== duration || iterationTime <= tickableDelay && tickablePrevTime > 0 || time <= tickablePrevTime && tickablePrevTime === duration && completed || // Force a render if a seek occurs on an completed animation
  isCurrentTimeEqualOrAboveDuration && !completed && isSetter) {
    if (isCurrentTimeAboveZero) {
      tickable.computeDeltaTime(tickablePrevTime);
      if (!muteCallbacks) tickable.onBeforeUpdate(
        /** @type {CallbackArgument} */
        tickable
      );
    }
    if (!_hasChildren) {
      const forcedRender = forcedTick || (isRunningBackwards ? deltaTime * -1 : deltaTime) >= globals.tickThreshold;
      const absoluteTime = tickable._offset + (parent ? parent._offset : 0) + tickableDelay + iterationTime;
      let tween = (
        /** @type {Tween} */
        /** @type {JSAnimation} */
        tickable._head
      );
      let tweenTarget;
      let tweenStyle;
      let tweenTargetTransforms;
      let tweenTargetTransformsProperties;
      let tweenTransformsNeedUpdate = 0;
      while (tween) {
        const tweenComposition = tween._composition;
        const tweenCurrentTime = tween._currentTime;
        const tweenChangeDuration = tween._changeDuration;
        const tweenAbsEndTime = tween._absoluteStartTime + tween._changeDuration;
        const tweenNextRep = tween._nextRep;
        const tweenPrevRep = tween._prevRep;
        const tweenHasComposition = tweenComposition !== compositionTypes.none;
        if ((forcedRender || (tweenCurrentTime !== tweenChangeDuration || absoluteTime <= tweenAbsEndTime + (tweenNextRep ? tweenNextRep._delay : 0)) && (tweenCurrentTime !== 0 || absoluteTime >= tween._absoluteStartTime)) && (!tweenHasComposition || !tween._isOverridden && (!tween._isOverlapped || absoluteTime <= tweenAbsEndTime) && (!tweenNextRep || (tweenNextRep._isOverridden || absoluteTime <= tweenNextRep._absoluteStartTime)) && (!tweenPrevRep || (tweenPrevRep._isOverridden || absoluteTime >= tweenPrevRep._absoluteStartTime + tweenPrevRep._changeDuration + tween._delay)))) {
          const tweenNewTime = tween._currentTime = clamp(iterationTime - tween._startTime, 0, tweenChangeDuration);
          const tweenProgress = tween._ease(tweenNewTime / tween._updateDuration);
          const tweenModifier = tween._modifier;
          const tweenValueType = tween._valueType;
          const tweenType = tween._tweenType;
          const tweenIsObject = tweenType === tweenTypes.OBJECT;
          const tweenIsNumber = tweenValueType === valueTypes.NUMBER;
          const tweenPrecision = tweenIsNumber && tweenIsObject || tweenProgress === 0 || tweenProgress === 1 ? -1 : globals.precision;
          let value;
          let number;
          if (tweenIsNumber) {
            value = number = /** @type {Number} */
            tweenModifier(round(lerp(tween._fromNumber, tween._toNumber, tweenProgress), tweenPrecision));
          } else if (tweenValueType === valueTypes.UNIT) {
            number = /** @type {Number} */
            tweenModifier(round(lerp(tween._fromNumber, tween._toNumber, tweenProgress), tweenPrecision));
            value = `${number}${tween._unit}`;
          } else if (tweenValueType === valueTypes.COLOR) {
            const fn = tween._fromNumbers;
            const tn = tween._toNumbers;
            const r = round(clamp(
              /** @type {Number} */
              tweenModifier(lerp(fn[0], tn[0], tweenProgress)),
              0,
              255
            ), 0);
            const g = round(clamp(
              /** @type {Number} */
              tweenModifier(lerp(fn[1], tn[1], tweenProgress)),
              0,
              255
            ), 0);
            const b = round(clamp(
              /** @type {Number} */
              tweenModifier(lerp(fn[2], tn[2], tweenProgress)),
              0,
              255
            ), 0);
            const a = clamp(
              /** @type {Number} */
              tweenModifier(round(lerp(fn[3], tn[3], tweenProgress), tweenPrecision)),
              0,
              1
            );
            value = `rgba(${r},${g},${b},${a})`;
            if (tweenHasComposition) {
              const ns = tween._numbers;
              ns[0] = r;
              ns[1] = g;
              ns[2] = b;
              ns[3] = a;
            }
          } else if (tweenValueType === valueTypes.COMPLEX) {
            value = tween._strings[0];
            for (let j = 0, l = tween._toNumbers.length; j < l; j++) {
              const n = (
                /** @type {Number} */
                tweenModifier(round(lerp(tween._fromNumbers[j], tween._toNumbers[j], tweenProgress), tweenPrecision))
              );
              const s = tween._strings[j + 1];
              value += `${s ? n + s : n}`;
              if (tweenHasComposition) {
                tween._numbers[j] = n;
              }
            }
          }
          if (tweenHasComposition) {
            tween._number = number;
          }
          if (!internalRender && tweenComposition !== compositionTypes.blend) {
            const tweenProperty = tween.property;
            tweenTarget = tween.target;
            if (tweenIsObject) {
              tweenTarget[tweenProperty] = value;
            } else if (tweenType === tweenTypes.ATTRIBUTE) {
              tweenTarget.setAttribute(
                tweenProperty,
                /** @type {String} */
                value
              );
            } else {
              tweenStyle = /** @type {DOMTarget} */
              tweenTarget.style;
              if (tweenType === tweenTypes.TRANSFORM) {
                if (tweenTarget !== tweenTargetTransforms) {
                  tweenTargetTransforms = tweenTarget;
                  tweenTargetTransformsProperties = tweenTarget[transformsSymbol];
                }
                tweenTargetTransformsProperties[tweenProperty] = value;
                tweenTransformsNeedUpdate = 1;
              } else if (tweenType === tweenTypes.CSS) {
                tweenStyle[tweenProperty] = value;
              } else if (tweenType === tweenTypes.CSS_VAR) {
                tweenStyle.setProperty(
                  tweenProperty,
                  /** @type {String} */
                  value
                );
              }
            }
            if (isCurrentTimeAboveZero) hasRendered = 1;
          } else {
            tween._value = value;
          }
        }
        if (tweenTransformsNeedUpdate && tween._renderTransforms) {
          let str = emptyString;
          for (let key2 in tweenTargetTransformsProperties) {
            str += `${transformsFragmentStrings[key2]}${tweenTargetTransformsProperties[key2]}) `;
          }
          tweenStyle.transform = str;
          tweenTransformsNeedUpdate = 0;
        }
        tween = tween._next;
      }
      if (!muteCallbacks && hasRendered) {
        tickable.onRender(
          /** @type {JSAnimation} */
          tickable
        );
      }
    }
    if (!muteCallbacks && isCurrentTimeAboveZero) {
      tickable.onUpdate(
        /** @type {CallbackArgument} */
        tickable
      );
    }
  }
  if (parent && isSetter) {
    if (!muteCallbacks && // (tickableAbsoluteTime > 0 instead) of (tickableAbsoluteTime >= duration) to prevent floating point precision issues
    // see: https://github.com/juliangarnier/anime/issues/1088
    (parent.began && !isRunningBackwards && tickableAbsoluteTime > 0 && !completed || isRunningBackwards && tickableAbsoluteTime <= minValue && completed)) {
      tickable.onComplete(
        /** @type {CallbackArgument} */
        tickable
      );
      tickable.completed = !isRunningBackwards;
    }
  } else if (isCurrentTimeAboveZero && isCurrentTimeEqualOrAboveDuration) {
    if (iterationCount === Infinity) {
      tickable._startTime += tickable.duration;
    } else if (tickable._currentIteration >= iterationCount - 1) {
      tickable.paused = true;
      if (!completed && !_hasChildren) {
        tickable.completed = true;
        if (!muteCallbacks && !(parent && (isRunningBackwards || !parent.began))) {
          tickable.onComplete(
            /** @type {CallbackArgument} */
            tickable
          );
          tickable._resolve(
            /** @type {CallbackArgument} */
            tickable
          );
        }
      }
    }
  } else {
    tickable.completed = false;
  }
  return hasRendered;
};
var tick = (tickable, time, muteCallbacks, internalRender, tickMode) => {
  const _currentIteration = tickable._currentIteration;
  render(tickable, time, muteCallbacks, internalRender, tickMode);
  if (tickable._hasChildren) {
    const tl = (
      /** @type {Timeline} */
      tickable
    );
    const tlIsRunningBackwards = tl.backwards;
    const tlChildrenTime = internalRender ? time : tl._iterationTime;
    const tlCildrenTickTime = now();
    let tlChildrenHasRendered = 0;
    let tlChildrenHaveCompleted = true;
    if (!internalRender && tl._currentIteration !== _currentIteration) {
      const tlIterationDuration = tl.iterationDuration;
      forEachChildren(tl, (child) => {
        if (!tlIsRunningBackwards) {
          if (!child.completed && !child.backwards && child._currentTime < child.iterationDuration) {
            render(child, tlIterationDuration, muteCallbacks, 1, tickModes.FORCE);
          }
          child.began = false;
          child.completed = false;
        } else {
          const childDuration = child.duration;
          const childStartTime = child._offset + child._delay;
          const childEndTime = childStartTime + childDuration;
          if (!muteCallbacks && childDuration <= minValue && (!childStartTime || childEndTime === tlIterationDuration)) {
            child.onComplete(child);
          }
        }
      });
      if (!muteCallbacks) tl.onLoop(
        /** @type {CallbackArgument} */
        tl
      );
    }
    forEachChildren(tl, (child) => {
      const childTime = round((tlChildrenTime - child._offset) * child._speed, 12);
      const childTickMode = child._fps < tl._fps ? child.requestTick(tlCildrenTickTime) : tickMode;
      tlChildrenHasRendered += render(child, childTime, muteCallbacks, internalRender, childTickMode);
      if (!child.completed && tlChildrenHaveCompleted) tlChildrenHaveCompleted = false;
    }, tlIsRunningBackwards);
    if (!muteCallbacks && tlChildrenHasRendered) tl.onRender(
      /** @type {CallbackArgument} */
      tl
    );
    if ((tlChildrenHaveCompleted || tlIsRunningBackwards) && tl._currentTime >= tl.duration) {
      tl.paused = true;
      if (!tl.completed) {
        tl.completed = true;
        if (!muteCallbacks) {
          tl.onComplete(
            /** @type {CallbackArgument} */
            tl
          );
          tl._resolve(
            /** @type {CallbackArgument} */
            tl
          );
        }
      }
    }
  }
};

// node_modules/.pnpm/animejs@4.3.6/node_modules/animejs/dist/modules/core/styles.js
var propertyNamesCache = {};
var sanitizePropertyName = (propertyName, target, tweenType) => {
  if (tweenType === tweenTypes.TRANSFORM) {
    const t = shortTransforms.get(propertyName);
    return t ? t : propertyName;
  } else if (tweenType === tweenTypes.CSS || // Handle special cases where properties like "strokeDashoffset" needs to be set as "stroke-dashoffset"
  // but properties like "baseFrequency" should stay in lowerCamelCase
  tweenType === tweenTypes.ATTRIBUTE && (isSvg(target) && propertyName in /** @type {DOMTarget} */
  target.style)) {
    const cachedPropertyName = propertyNamesCache[propertyName];
    if (cachedPropertyName) {
      return cachedPropertyName;
    } else {
      const lowerCaseName = propertyName ? toLowerCase(propertyName) : propertyName;
      propertyNamesCache[propertyName] = lowerCaseName;
      return lowerCaseName;
    }
  } else {
    return propertyName;
  }
};
var cleanInlineStyles = (renderable) => {
  if (renderable._hasChildren) {
    forEachChildren(renderable, cleanInlineStyles, true);
  } else {
    const animation = (
      /** @type {JSAnimation} */
      renderable
    );
    animation.pause();
    forEachChildren(animation, (tween) => {
      const tweenProperty = tween.property;
      const tweenTarget = tween.target;
      if (tweenTarget[isDomSymbol]) {
        const targetStyle = (
          /** @type {DOMTarget} */
          tweenTarget.style
        );
        const originalInlinedValue = tween._inlineValue;
        const tweenHadNoInlineValue = isNil(originalInlinedValue) || originalInlinedValue === emptyString;
        if (tween._tweenType === tweenTypes.TRANSFORM) {
          const cachedTransforms = tweenTarget[transformsSymbol];
          if (tweenHadNoInlineValue) {
            delete cachedTransforms[tweenProperty];
          } else {
            cachedTransforms[tweenProperty] = originalInlinedValue;
          }
          if (tween._renderTransforms) {
            if (!Object.keys(cachedTransforms).length) {
              targetStyle.removeProperty("transform");
            } else {
              let str = emptyString;
              for (let key2 in cachedTransforms) {
                str += transformsFragmentStrings[key2] + cachedTransforms[key2] + ") ";
              }
              targetStyle.transform = str;
            }
          }
        } else {
          if (tweenHadNoInlineValue) {
            targetStyle.removeProperty(toLowerCase(tweenProperty));
          } else {
            targetStyle[tweenProperty] = originalInlinedValue;
          }
        }
        if (animation._tail === tween) {
          animation.targets.forEach((t) => {
            if (t.getAttribute && t.getAttribute("style") === emptyString) {
              t.removeAttribute("style");
            }
          });
        }
      }
    });
  }
  return renderable;
};

// node_modules/.pnpm/animejs@4.3.6/node_modules/animejs/dist/modules/core/clock.js
var Clock = class {
  /** @param {Number} [initTime] */
  constructor(initTime = 0) {
    this.deltaTime = 0;
    this._currentTime = initTime;
    this._lastTickTime = initTime;
    this._startTime = initTime;
    this._lastTime = initTime;
    this._scheduledTime = 0;
    this._frameDuration = K / maxFps;
    this._fps = maxFps;
    this._speed = 1;
    this._hasChildren = false;
    this._head = null;
    this._tail = null;
  }
  get fps() {
    return this._fps;
  }
  set fps(frameRate) {
    const previousFrameDuration = this._frameDuration;
    const fr = +frameRate;
    const fps = fr < minValue ? minValue : fr;
    const frameDuration = K / fps;
    if (fps > defaults2.frameRate) defaults2.frameRate = fps;
    this._fps = fps;
    this._frameDuration = frameDuration;
    this._scheduledTime += frameDuration - previousFrameDuration;
  }
  get speed() {
    return this._speed;
  }
  set speed(playbackRate) {
    const pbr = +playbackRate;
    this._speed = pbr < minValue ? minValue : pbr;
  }
  /**
   * @param  {Number} time
   * @return {tickModes}
   */
  requestTick(time) {
    const scheduledTime = this._scheduledTime;
    this._lastTickTime = time;
    if (time < scheduledTime) return tickModes.NONE;
    const frameDuration = this._frameDuration;
    const frameDelta = time - scheduledTime;
    this._scheduledTime += frameDelta < frameDuration ? frameDuration : frameDelta;
    return tickModes.AUTO;
  }
  /**
   * @param  {Number} time
   * @return {Number}
   */
  computeDeltaTime(time) {
    const delta = time - this._lastTime;
    this.deltaTime = delta;
    this._lastTime = time;
    return delta;
  }
};

// node_modules/.pnpm/animejs@4.3.6/node_modules/animejs/dist/modules/animation/additive.js
var additive = {
  animation: null,
  update: noop
};
var addAdditiveAnimation = (lookups2) => {
  let animation = additive.animation;
  if (!animation) {
    animation = {
      duration: minValue,
      computeDeltaTime: noop,
      _offset: 0,
      _delay: 0,
      _head: null,
      _tail: null
    };
    additive.animation = animation;
    additive.update = () => {
      lookups2.forEach((propertyAnimation) => {
        for (let propertyName in propertyAnimation) {
          const tweens = propertyAnimation[propertyName];
          const lookupTween = tweens._head;
          if (lookupTween) {
            const valueType = lookupTween._valueType;
            const additiveValues = valueType === valueTypes.COMPLEX || valueType === valueTypes.COLOR ? cloneArray(lookupTween._fromNumbers) : null;
            let additiveValue = lookupTween._fromNumber;
            let tween = tweens._tail;
            while (tween && tween !== lookupTween) {
              if (additiveValues) {
                for (let i = 0, l = tween._numbers.length; i < l; i++) additiveValues[i] += tween._numbers[i];
              } else {
                additiveValue += tween._number;
              }
              tween = tween._prevAdd;
            }
            lookupTween._toNumber = additiveValue;
            lookupTween._toNumbers = additiveValues;
          }
        }
      });
      render(animation, 1, 1, 0, tickModes.FORCE);
    };
  }
  return animation;
};

// node_modules/.pnpm/animejs@4.3.6/node_modules/animejs/dist/modules/engine/engine.js
var engineTickMethod = /* @__PURE__ */ (() => isBrowser ? requestAnimationFrame : setImmediate)();
var engineCancelMethod = /* @__PURE__ */ (() => isBrowser ? cancelAnimationFrame : clearImmediate)();
var Engine2 = class extends Clock {
  /** @param {Number} [initTime] */
  constructor(initTime) {
    super(initTime);
    this.useDefaultMainLoop = true;
    this.pauseOnDocumentHidden = true;
    this.defaults = defaults2;
    this.paused = true;
    this.reqId = 0;
  }
  update() {
    const time = this._currentTime = now();
    if (this.requestTick(time)) {
      this.computeDeltaTime(time);
      const engineSpeed = this._speed;
      const engineFps = this._fps;
      let activeTickable = (
        /** @type {Tickable} */
        this._head
      );
      while (activeTickable) {
        const nextTickable = activeTickable._next;
        if (!activeTickable.paused) {
          tick(
            activeTickable,
            (time - activeTickable._startTime) * activeTickable._speed * engineSpeed,
            0,
            // !muteCallbacks
            0,
            // !internalRender
            activeTickable._fps < engineFps ? activeTickable.requestTick(time) : tickModes.AUTO
          );
        } else {
          removeChild(this, activeTickable);
          this._hasChildren = !!this._tail;
          activeTickable._running = false;
          if (activeTickable.completed && !activeTickable._cancelled) {
            activeTickable.cancel();
          }
        }
        activeTickable = nextTickable;
      }
      additive.update();
    }
  }
  wake() {
    if (this.useDefaultMainLoop && !this.reqId) {
      this.requestTick(now());
      this.reqId = engineTickMethod(tickEngine);
    }
    return this;
  }
  pause() {
    if (!this.reqId) return;
    this.paused = true;
    return killEngine();
  }
  resume() {
    if (!this.paused) return;
    this.paused = false;
    forEachChildren(this, (child) => child.resetTime());
    return this.wake();
  }
  // Getter and setter for speed
  get speed() {
    return this._speed * (globals.timeScale === 1 ? 1 : K);
  }
  set speed(playbackRate) {
    this._speed = playbackRate * globals.timeScale;
    forEachChildren(this, (child) => child.speed = child._speed);
  }
  // Getter and setter for timeUnit
  get timeUnit() {
    return globals.timeScale === 1 ? "ms" : "s";
  }
  set timeUnit(unit) {
    const secondsScale = 1e-3;
    const isSecond = unit === "s";
    const newScale = isSecond ? secondsScale : 1;
    if (globals.timeScale !== newScale) {
      globals.timeScale = newScale;
      globals.tickThreshold = 200 * newScale;
      const scaleFactor = isSecond ? secondsScale : K;
      this.defaults.duration *= scaleFactor;
      this._speed *= scaleFactor;
    }
  }
  // Getter and setter for precision
  get precision() {
    return globals.precision;
  }
  set precision(precision) {
    globals.precision = precision;
  }
};
var engine = /* @__PURE__ */ (() => {
  const engine2 = new Engine2(now());
  if (isBrowser) {
    globalVersions.engine = engine2;
    doc.addEventListener("visibilitychange", () => {
      if (!engine2.pauseOnDocumentHidden) return;
      doc.hidden ? engine2.pause() : engine2.resume();
    });
  }
  return engine2;
})();
var tickEngine = () => {
  if (engine._head) {
    engine.reqId = engineTickMethod(tickEngine);
    engine.update();
  } else {
    engine.reqId = 0;
  }
};
var killEngine = () => {
  engineCancelMethod(
    /** @type {NodeJS.Immediate & Number} */
    engine.reqId
  );
  engine.reqId = 0;
  return engine;
};

// node_modules/.pnpm/animejs@4.3.6/node_modules/animejs/dist/modules/animation/composition.js
var lookups = {
  /** @type {TweenReplaceLookups} */
  _rep: /* @__PURE__ */ new WeakMap(),
  /** @type {TweenAdditiveLookups} */
  _add: /* @__PURE__ */ new Map()
};
var getTweenSiblings = (target, property, lookup = "_rep") => {
  const lookupMap = lookups[lookup];
  let targetLookup = lookupMap.get(target);
  if (!targetLookup) {
    targetLookup = {};
    lookupMap.set(target, targetLookup);
  }
  return targetLookup[property] ? targetLookup[property] : targetLookup[property] = {
    _head: null,
    _tail: null
  };
};
var addTweenSortMethod = (p, c) => {
  return p._isOverridden || p._absoluteStartTime > c._absoluteStartTime;
};
var overrideTween = (tween) => {
  tween._isOverlapped = 1;
  tween._isOverridden = 1;
  tween._changeDuration = minValue;
  tween._currentTime = minValue;
};
var composeTween = (tween, siblings) => {
  const tweenCompositionType = tween._composition;
  if (tweenCompositionType === compositionTypes.replace) {
    const tweenAbsStartTime = tween._absoluteStartTime;
    addChild(siblings, tween, addTweenSortMethod, "_prevRep", "_nextRep");
    const prevSibling = tween._prevRep;
    if (prevSibling) {
      const prevParent = prevSibling.parent;
      const prevAbsEndTime = prevSibling._absoluteStartTime + prevSibling._changeDuration;
      if (
        // Check if the previous tween is from a different animation
        tween.parent.id !== prevParent.id && // Check if the animation has loops
        prevParent.iterationCount > 1 && // Check if _absoluteChangeEndTime of last loop overlaps the current tween
        prevAbsEndTime + (prevParent.duration - prevParent.iterationDuration) > tweenAbsStartTime
      ) {
        overrideTween(prevSibling);
        let prevPrevSibling = prevSibling._prevRep;
        while (prevPrevSibling && prevPrevSibling.parent.id === prevParent.id) {
          overrideTween(prevPrevSibling);
          prevPrevSibling = prevPrevSibling._prevRep;
        }
      }
      const absoluteUpdateStartTime = tweenAbsStartTime - tween._delay;
      if (prevAbsEndTime > absoluteUpdateStartTime) {
        const prevChangeStartTime = prevSibling._startTime;
        const prevTLOffset = prevAbsEndTime - (prevChangeStartTime + prevSibling._updateDuration);
        const updatedPrevChangeDuration = round(absoluteUpdateStartTime - prevTLOffset - prevChangeStartTime, 12);
        prevSibling._changeDuration = updatedPrevChangeDuration;
        prevSibling._currentTime = updatedPrevChangeDuration;
        prevSibling._isOverlapped = 1;
        if (updatedPrevChangeDuration < minValue) {
          overrideTween(prevSibling);
        }
      }
      let pausePrevParentAnimation = true;
      forEachChildren(prevParent, (t) => {
        if (!t._isOverlapped) pausePrevParentAnimation = false;
      });
      if (pausePrevParentAnimation) {
        const prevParentTL = prevParent.parent;
        if (prevParentTL) {
          let pausePrevParentTL = true;
          forEachChildren(prevParentTL, (a) => {
            if (a !== prevParent) {
              forEachChildren(a, (t) => {
                if (!t._isOverlapped) pausePrevParentTL = false;
              });
            }
          });
          if (pausePrevParentTL) {
            prevParentTL.cancel();
          }
        } else {
          prevParent.cancel();
        }
      }
    }
  } else if (tweenCompositionType === compositionTypes.blend) {
    const additiveTweenSiblings = getTweenSiblings(tween.target, tween.property, "_add");
    const additiveAnimation = addAdditiveAnimation(lookups._add);
    let lookupTween = additiveTweenSiblings._head;
    if (!lookupTween) {
      lookupTween = { ...tween };
      lookupTween._composition = compositionTypes.replace;
      lookupTween._updateDuration = minValue;
      lookupTween._startTime = 0;
      lookupTween._numbers = cloneArray(tween._fromNumbers);
      lookupTween._number = 0;
      lookupTween._next = null;
      lookupTween._prev = null;
      addChild(additiveTweenSiblings, lookupTween);
      addChild(additiveAnimation, lookupTween);
    }
    const toNumber = tween._toNumber;
    tween._fromNumber = lookupTween._fromNumber - toNumber;
    tween._toNumber = 0;
    tween._numbers = cloneArray(tween._fromNumbers);
    tween._number = 0;
    lookupTween._fromNumber = toNumber;
    if (tween._toNumbers) {
      const toNumbers = cloneArray(tween._toNumbers);
      if (toNumbers) {
        toNumbers.forEach((value, i) => {
          tween._fromNumbers[i] = lookupTween._fromNumbers[i] - value;
          tween._toNumbers[i] = 0;
        });
      }
      lookupTween._fromNumbers = toNumbers;
    }
    addChild(additiveTweenSiblings, tween, null, "_prevAdd", "_nextAdd");
  }
  return tween;
};
var removeTweenSliblings = (tween) => {
  const tweenComposition = tween._composition;
  if (tweenComposition !== compositionTypes.none) {
    const tweenTarget = tween.target;
    const tweenProperty = tween.property;
    const replaceTweensLookup = lookups._rep;
    const replaceTargetProps = replaceTweensLookup.get(tweenTarget);
    const tweenReplaceSiblings = replaceTargetProps[tweenProperty];
    removeChild(tweenReplaceSiblings, tween, "_prevRep", "_nextRep");
    if (tweenComposition === compositionTypes.blend) {
      const addTweensLookup = lookups._add;
      const addTargetProps = addTweensLookup.get(tweenTarget);
      if (!addTargetProps) return;
      const additiveTweenSiblings = addTargetProps[tweenProperty];
      const additiveAnimation = additive.animation;
      removeChild(additiveTweenSiblings, tween, "_prevAdd", "_nextAdd");
      const lookupTween = additiveTweenSiblings._head;
      if (lookupTween && lookupTween === additiveTweenSiblings._tail) {
        removeChild(additiveTweenSiblings, lookupTween, "_prevAdd", "_nextAdd");
        removeChild(additiveAnimation, lookupTween);
        let shouldClean = true;
        for (let prop in addTargetProps) {
          if (addTargetProps[prop]._head) {
            shouldClean = false;
            break;
          }
        }
        if (shouldClean) {
          addTweensLookup.delete(tweenTarget);
        }
      }
    }
  }
  return tween;
};

// node_modules/.pnpm/animejs@4.3.6/node_modules/animejs/dist/modules/timer/timer.js
var resetTimerProperties = (timer) => {
  timer.paused = true;
  timer.began = false;
  timer.completed = false;
  return timer;
};
var reviveTimer = (timer) => {
  if (!timer._cancelled) return timer;
  if (timer._hasChildren) {
    forEachChildren(timer, reviveTimer);
  } else {
    forEachChildren(timer, (tween) => {
      if (tween._composition !== compositionTypes.none) {
        composeTween(tween, getTweenSiblings(tween.target, tween.property));
      }
    });
  }
  timer._cancelled = 0;
  return timer;
};
var timerId = 0;
var Timer = class extends Clock {
  /**
   * @param {TimerParams} [parameters]
   * @param {Timeline} [parent]
   * @param {Number} [parentPosition]
   */
  constructor(parameters = {}, parent = null, parentPosition = 0) {
    super(0);
    ++timerId;
    const {
      id,
      delay,
      duration,
      reversed,
      alternate,
      loop,
      loopDelay,
      autoplay,
      frameRate,
      playbackRate,
      onComplete,
      onLoop,
      onPause,
      onBegin,
      onBeforeUpdate,
      onUpdate
    } = parameters;
    if (scope.current) scope.current.register(this);
    const timerInitTime = parent ? 0 : engine._lastTickTime;
    const timerDefaults = parent ? parent.defaults : globals.defaults;
    const timerDelay = (
      /** @type {Number} */
      isFnc(delay) || isUnd(delay) ? timerDefaults.delay : +delay
    );
    const timerDuration = isFnc(duration) || isUnd(duration) ? Infinity : +duration;
    const timerLoop = setValue(loop, timerDefaults.loop);
    const timerLoopDelay = setValue(loopDelay, timerDefaults.loopDelay);
    let timerIterationCount = timerLoop === true || timerLoop === Infinity || /** @type {Number} */
    timerLoop < 0 ? Infinity : (
      /** @type {Number} */
      timerLoop + 1
    );
    if (devTools) {
      const isInfinite = timerIterationCount === Infinity;
      const registered = devTools.register(this, parameters, isInfinite);
      if (registered && isInfinite) {
        const minIterations = alternate ? 2 : 1;
        const iterations = parent ? devTools.maxNestedInfiniteLoops : devTools.maxInfiniteLoops;
        timerIterationCount = Math.max(iterations, minIterations);
      }
    }
    let offsetPosition = 0;
    if (parent) {
      offsetPosition = parentPosition;
    } else {
      if (!engine.reqId) engine.requestTick(now());
      offsetPosition = (engine._lastTickTime - engine._startTime) * globals.timeScale;
    }
    this.id = !isUnd(id) ? id : timerId;
    this.parent = parent;
    this.duration = clampInfinity((timerDuration + timerLoopDelay) * timerIterationCount - timerLoopDelay) || minValue;
    this.backwards = false;
    this.paused = true;
    this.began = false;
    this.completed = false;
    this.onBegin = onBegin || timerDefaults.onBegin;
    this.onBeforeUpdate = onBeforeUpdate || timerDefaults.onBeforeUpdate;
    this.onUpdate = onUpdate || timerDefaults.onUpdate;
    this.onLoop = onLoop || timerDefaults.onLoop;
    this.onPause = onPause || timerDefaults.onPause;
    this.onComplete = onComplete || timerDefaults.onComplete;
    this.iterationDuration = timerDuration;
    this.iterationCount = timerIterationCount;
    this._autoplay = parent ? false : setValue(autoplay, timerDefaults.autoplay);
    this._offset = offsetPosition;
    this._delay = timerDelay;
    this._loopDelay = timerLoopDelay;
    this._iterationTime = 0;
    this._currentIteration = 0;
    this._resolve = noop;
    this._running = false;
    this._reversed = +setValue(reversed, timerDefaults.reversed);
    this._reverse = this._reversed;
    this._cancelled = 0;
    this._alternate = setValue(alternate, timerDefaults.alternate);
    this._prev = null;
    this._next = null;
    this._lastTickTime = timerInitTime;
    this._startTime = timerInitTime;
    this._lastTime = timerInitTime;
    this._fps = setValue(frameRate, timerDefaults.frameRate);
    this._speed = setValue(playbackRate, timerDefaults.playbackRate);
  }
  get cancelled() {
    return !!this._cancelled;
  }
  set cancelled(cancelled) {
    cancelled ? this.cancel() : this.reset(true).play();
  }
  get currentTime() {
    return clamp(round(this._currentTime, globals.precision), -this._delay, this.duration);
  }
  set currentTime(time) {
    const paused = this.paused;
    this.pause().seek(+time);
    if (!paused) this.resume();
  }
  get iterationCurrentTime() {
    return clamp(round(this._iterationTime, globals.precision), 0, this.iterationDuration);
  }
  set iterationCurrentTime(time) {
    this.currentTime = this.iterationDuration * this._currentIteration + time;
  }
  get progress() {
    return clamp(round(this._currentTime / this.duration, 10), 0, 1);
  }
  set progress(progress) {
    this.currentTime = this.duration * progress;
  }
  get iterationProgress() {
    return clamp(round(this._iterationTime / this.iterationDuration, 10), 0, 1);
  }
  set iterationProgress(progress) {
    const iterationDuration = this.iterationDuration;
    this.currentTime = iterationDuration * this._currentIteration + iterationDuration * progress;
  }
  get currentIteration() {
    return this._currentIteration;
  }
  set currentIteration(iterationCount) {
    this.currentTime = this.iterationDuration * clamp(+iterationCount, 0, this.iterationCount - 1);
  }
  get reversed() {
    return !!this._reversed;
  }
  set reversed(reverse) {
    reverse ? this.reverse() : this.play();
  }
  get speed() {
    return super.speed;
  }
  set speed(playbackRate) {
    super.speed = playbackRate;
    this.resetTime();
  }
  /**
   * @param  {Boolean} [softReset]
   * @return {this}
   */
  reset(softReset = false) {
    reviveTimer(this);
    if (this._reversed && !this._reverse) this.reversed = false;
    this._iterationTime = this.iterationDuration;
    tick(this, 0, 1, ~~softReset, tickModes.FORCE);
    resetTimerProperties(this);
    if (this._hasChildren) {
      forEachChildren(this, resetTimerProperties);
    }
    return this;
  }
  /**
   * @param  {Boolean} internalRender
   * @return {this}
   */
  init(internalRender = false) {
    this.fps = this._fps;
    this.speed = this._speed;
    if (!internalRender && this._hasChildren) {
      tick(this, this.duration, 1, ~~internalRender, tickModes.FORCE);
    }
    this.reset(internalRender);
    const autoplay = this._autoplay;
    if (autoplay === true) {
      this.resume();
    } else if (autoplay && !isUnd(
      /** @type {ScrollObserver} */
      autoplay.linked
    )) {
      autoplay.link(this);
    }
    return this;
  }
  /** @return {this} */
  resetTime() {
    const timeScale = 1 / (this._speed * engine._speed);
    this._startTime = now() - (this._currentTime + this._delay) * timeScale;
    return this;
  }
  /** @return {this} */
  pause() {
    if (this.paused) return this;
    this.paused = true;
    this.onPause(this);
    return this;
  }
  /** @return {this} */
  resume() {
    if (!this.paused) return this;
    this.paused = false;
    if (this.duration <= minValue && !this._hasChildren) {
      tick(this, minValue, 0, 0, tickModes.FORCE);
    } else {
      if (!this._running) {
        addChild(engine, this);
        engine._hasChildren = true;
        this._running = true;
      }
      this.resetTime();
      this._startTime -= 12;
      engine.wake();
    }
    return this;
  }
  /** @return {this} */
  restart() {
    return this.reset().resume();
  }
  /**
   * @param  {Number} time
   * @param  {Boolean|Number} [muteCallbacks]
   * @param  {Boolean|Number} [internalRender]
   * @return {this}
   */
  seek(time, muteCallbacks = 0, internalRender = 0) {
    reviveTimer(this);
    this.completed = false;
    const isPaused = this.paused;
    this.paused = true;
    tick(this, time + this._delay, ~~muteCallbacks, ~~internalRender, tickModes.AUTO);
    return isPaused ? this : this.resume();
  }
  /** @return {this} */
  alternate() {
    const reversed = this._reversed;
    const count = this.iterationCount;
    const duration = this.iterationDuration;
    const iterations = count === Infinity ? floor(maxValue / duration) : count;
    this._reversed = +(this._alternate && !(iterations % 2) ? reversed : !reversed);
    if (count === Infinity) {
      this.iterationProgress = this._reversed ? 1 - this.iterationProgress : this.iterationProgress;
    } else {
      this.seek(duration * iterations - this._currentTime);
    }
    this.resetTime();
    return this;
  }
  /** @return {this} */
  play() {
    if (this._reversed) this.alternate();
    return this.resume();
  }
  /** @return {this} */
  reverse() {
    if (!this._reversed) this.alternate();
    return this.resume();
  }
  // TODO: Move all the animation / tweens / children related code to Animation / Timeline
  /** @return {this} */
  cancel() {
    if (this._hasChildren) {
      forEachChildren(this, (child) => child.cancel(), true);
    } else {
      forEachChildren(this, removeTweenSliblings);
    }
    this._cancelled = 1;
    return this.pause();
  }
  /**
   * @param  {Number} newDuration
   * @return {this}
   */
  stretch(newDuration) {
    const currentDuration = this.duration;
    const normlizedDuration = normalizeTime(newDuration);
    if (currentDuration === normlizedDuration) return this;
    const timeScale = newDuration / currentDuration;
    const isSetter = newDuration <= minValue;
    this.duration = isSetter ? minValue : normlizedDuration;
    this.iterationDuration = isSetter ? minValue : normalizeTime(this.iterationDuration * timeScale);
    this._offset *= timeScale;
    this._delay *= timeScale;
    this._loopDelay *= timeScale;
    return this;
  }
  /**
    * Cancels the timer by seeking it back to 0 and reverting the attached scroller if necessary
    * @return {this}
    */
  revert() {
    tick(this, 0, 1, 0, tickModes.AUTO);
    const ap = (
      /** @type {ScrollObserver} */
      this._autoplay
    );
    if (ap && ap.linked && ap.linked === this) ap.revert();
    return this.cancel();
  }
  /**
    * Imediatly completes the timer, cancels it and triggers the onComplete callback
    * @param  {Boolean|Number} [muteCallbacks]
    * @return {this}
    */
  complete(muteCallbacks = 0) {
    return this.seek(this.duration, muteCallbacks).cancel();
  }
  /**
   * @typedef {this & {then: null}} ResolvedTimer
   */
  /**
   * @param  {Callback<ResolvedTimer>} [callback]
   * @return Promise<this>
   */
  then(callback = noop) {
    const then = this.then;
    const onResolve = () => {
      this.then = null;
      callback(
        /** @type {ResolvedTimer} */
        this
      );
      this.then = then;
      this._resolve = noop;
    };
    return new Promise((r) => {
      this._resolve = () => r(onResolve());
      if (this.completed) this._resolve();
      return this;
    });
  }
};

// node_modules/.pnpm/animejs@4.3.6/node_modules/animejs/dist/modules/core/targets.js
function getNodeList(v) {
  const n = isStr(v) ? scope.root.querySelectorAll(v) : v;
  if (n instanceof NodeList || n instanceof HTMLCollection) return n;
}
function parseTargets(targets) {
  if (isNil(targets)) return (
    /** @type {TargetsArray} */
    []
  );
  if (!isBrowser) return (
    /** @type {JSTargetsArray} */
    isArr(targets) && targets.flat(Infinity) || [targets]
  );
  if (isArr(targets)) {
    const flattened = targets.flat(Infinity);
    const parsed = [];
    for (let i = 0, l = flattened.length; i < l; i++) {
      const item = flattened[i];
      if (!isNil(item)) {
        const nodeList2 = getNodeList(item);
        if (nodeList2) {
          for (let j = 0, jl = nodeList2.length; j < jl; j++) {
            const subItem = nodeList2[j];
            if (!isNil(subItem)) {
              let isDuplicate = false;
              for (let k = 0, kl = parsed.length; k < kl; k++) {
                if (parsed[k] === subItem) {
                  isDuplicate = true;
                  break;
                }
              }
              if (!isDuplicate) {
                parsed.push(subItem);
              }
            }
          }
        } else {
          let isDuplicate = false;
          for (let j = 0, jl = parsed.length; j < jl; j++) {
            if (parsed[j] === item) {
              isDuplicate = true;
              break;
            }
          }
          if (!isDuplicate) {
            parsed.push(item);
          }
        }
      }
    }
    return parsed;
  }
  const nodeList = getNodeList(targets);
  if (nodeList) return (
    /** @type {DOMTargetsArray} */
    Array.from(nodeList)
  );
  return (
    /** @type {TargetsArray} */
    [targets]
  );
}
function registerTargets(targets) {
  const parsedTargetsArray = parseTargets(targets);
  const parsedTargetsLength = parsedTargetsArray.length;
  if (parsedTargetsLength) {
    for (let i = 0; i < parsedTargetsLength; i++) {
      const target = parsedTargetsArray[i];
      if (!target[isRegisteredTargetSymbol]) {
        target[isRegisteredTargetSymbol] = true;
        const isSvgType = isSvg(target);
        const isDom = (
          /** @type {DOMTarget} */
          target.nodeType || isSvgType
        );
        if (isDom) {
          target[isDomSymbol] = true;
          target[isSvgSymbol] = isSvgType;
          target[transformsSymbol] = {};
        }
      }
    }
  }
  return parsedTargetsArray;
}

// node_modules/.pnpm/animejs@4.3.6/node_modules/animejs/dist/modules/core/units.js
var angleUnitsMap = { "deg": 1, "rad": 180 / PI, "turn": 360 };
var convertedValuesCache = {};
var convertValueUnit = (el, decomposedValue, unit, force = false) => {
  const currentUnit = decomposedValue.u;
  const currentNumber = decomposedValue.n;
  if (decomposedValue.t === valueTypes.UNIT && currentUnit === unit) {
    return decomposedValue;
  }
  const cachedKey = currentNumber + currentUnit + unit;
  const cached = convertedValuesCache[cachedKey];
  if (!isUnd(cached) && !force) {
    decomposedValue.n = cached;
  } else {
    let convertedValue;
    if (currentUnit in angleUnitsMap) {
      convertedValue = currentNumber * angleUnitsMap[currentUnit] / angleUnitsMap[unit];
    } else {
      const baseline = 100;
      const tempEl = (
        /** @type {DOMTarget} */
        el.cloneNode()
      );
      const parentNode = el.parentNode;
      const parentEl = parentNode && parentNode !== doc ? parentNode : doc.body;
      parentEl.appendChild(tempEl);
      const elStyle = tempEl.style;
      elStyle.width = baseline + currentUnit;
      const currentUnitWidth = (
        /** @type {HTMLElement} */
        tempEl.offsetWidth || baseline
      );
      elStyle.width = baseline + unit;
      const newUnitWidth = (
        /** @type {HTMLElement} */
        tempEl.offsetWidth || baseline
      );
      const factor = currentUnitWidth / newUnitWidth;
      parentEl.removeChild(tempEl);
      convertedValue = factor * currentNumber;
    }
    decomposedValue.n = convertedValue;
    convertedValuesCache[cachedKey] = convertedValue;
  }
  decomposedValue.t === valueTypes.UNIT;
  decomposedValue.u = unit;
  return decomposedValue;
};

// node_modules/.pnpm/animejs@4.3.6/node_modules/animejs/dist/modules/easings/none.js
var none = (t) => t;

// node_modules/.pnpm/animejs@4.3.6/node_modules/animejs/dist/modules/easings/eases/parser.js
var easeInPower = (p = 1.68) => (t) => pow(t, +p);
var easeTypes = {
  in: (easeIn) => (t) => easeIn(t),
  out: (easeIn) => (t) => 1 - easeIn(1 - t),
  inOut: (easeIn) => (t) => t < 0.5 ? easeIn(t * 2) / 2 : 1 - easeIn(t * -2 + 2) / 2,
  outIn: (easeIn) => (t) => t < 0.5 ? (1 - easeIn(1 - t * 2)) / 2 : (easeIn(t * 2 - 1) + 1) / 2
};
var halfPI = PI / 2;
var doublePI = PI * 2;
var easeInFunctions = {
  [emptyString]: easeInPower,
  Quad: easeInPower(2),
  Cubic: easeInPower(3),
  Quart: easeInPower(4),
  Quint: easeInPower(5),
  /** @type {EasingFunction} */
  Sine: (t) => 1 - cos(t * halfPI),
  /** @type {EasingFunction} */
  Circ: (t) => 1 - sqrt(1 - t * t),
  /** @type {EasingFunction} */
  Expo: (t) => t ? pow(2, 10 * t - 10) : 0,
  /** @type {EasingFunction} */
  Bounce: (t) => {
    let pow2, b = 4;
    while (t < ((pow2 = pow(2, --b)) - 1) / 11) ;
    return 1 / pow(4, 3 - b) - 7.5625 * pow((pow2 * 3 - 2) / 22 - t, 2);
  },
  /** @type {BackEasing} */
  Back: (overshoot = 1.7) => (t) => (+overshoot + 1) * t * t * t - +overshoot * t * t,
  /** @type {ElasticEasing} */
  Elastic: (amplitude = 1, period = 0.3) => {
    const a = clamp(+amplitude, 1, 10);
    const p = clamp(+period, minValue, 2);
    const s = p / doublePI * asin(1 / a);
    const e = doublePI / p;
    return (t) => t === 0 || t === 1 ? t : -a * pow(2, -10 * (1 - t)) * sin((1 - t - s) * e);
  }
};
var eases = /* @__PURE__ */ (() => {
  const list = { linear: none, none };
  for (let type in easeTypes) {
    for (let name in easeInFunctions) {
      const easeIn = easeInFunctions[name];
      const easeType = easeTypes[type];
      list[type + name] = /** @type {EasingFunctionWithParams|EasingFunction} */
      name === emptyString || name === "Back" || name === "Elastic" ? (a, b) => easeType(
        /** @type {EasingFunctionWithParams} */
        easeIn(a, b)
      ) : easeType(
        /** @type {EasingFunction} */
        easeIn
      );
    }
  }
  return (
    /** @type {EasesFunctions} */
    list
  );
})();
var easesLookups = { linear: none, none };
var parseEaseString = (string) => {
  if (easesLookups[string]) return easesLookups[string];
  if (string.indexOf("(") <= -1) {
    const hasParams = easeTypes[string] || string.includes("Back") || string.includes("Elastic");
    const parsedFn = (
      /** @type {EasingFunction} */
      hasParams ? (
        /** @type {EasingFunctionWithParams} */
        eases[string]()
      ) : eases[string]
    );
    return parsedFn ? easesLookups[string] = parsedFn : none;
  } else {
    const split = string.slice(0, -1).split("(");
    const parsedFn = (
      /** @type {EasingFunctionWithParams} */
      eases[split[0]]
    );
    return parsedFn ? easesLookups[string] = parsedFn(...split[1].split(",")) : none;
  }
};
var deprecated = ["steps(", "irregular(", "linear(", "cubicBezier("];
var parseEase = (ease) => {
  if (isStr(ease)) {
    for (let i = 0, l = deprecated.length; i < l; i++) {
      if (stringStartsWith(ease, deprecated[i])) {
        console.warn(`String syntax for \`ease: "${ease}"\` has been removed from the core and replaced by importing and passing the easing function directly: \`ease: ${ease}\``);
        return none;
      }
    }
  }
  const easeFunc = isFnc(ease) ? ease : isStr(ease) ? parseEaseString(
    /** @type {String} */
    ease
  ) : none;
  return easeFunc;
};

// node_modules/.pnpm/animejs@4.3.6/node_modules/animejs/dist/modules/animation/animation.js
var fromTargetObject = createDecomposedValueTargetObject();
var toTargetObject = createDecomposedValueTargetObject();
var inlineStylesStore = {};
var toFunctionStore = { func: null };
var fromFunctionStore = { func: null };
var keyframesTargetArray = [null];
var fastSetValuesArray = [null, null];
var keyObjectTarget = { to: null };
var tweenId = 0;
var JSAnimationId = 0;
var keyframes;
var key;
var generateKeyframes = (keyframes2, parameters) => {
  const properties = {};
  if (isArr(keyframes2)) {
    const propertyNames = [].concat(.../** @type {DurationKeyframes} */
    keyframes2.map((key2) => Object.keys(key2))).filter(isKey);
    for (let i = 0, l = propertyNames.length; i < l; i++) {
      const propName = propertyNames[i];
      const propArray = (
        /** @type {DurationKeyframes} */
        keyframes2.map((key2) => {
          const newKey = {};
          for (let p in key2) {
            const keyValue = (
              /** @type {TweenPropValue} */
              key2[p]
            );
            if (isKey(p)) {
              if (p === propName) {
                newKey.to = keyValue;
              }
            } else {
              newKey[p] = keyValue;
            }
          }
          return newKey;
        })
      );
      properties[propName] = /** @type {ArraySyntaxValue} */
      propArray;
    }
  } else {
    const totalDuration = (
      /** @type {Number} */
      setValue(parameters.duration, globals.defaults.duration)
    );
    const keys = Object.keys(keyframes2).map((key2) => {
      return { o: parseFloat(key2) / 100, p: keyframes2[key2] };
    }).sort((a, b) => a.o - b.o);
    keys.forEach((key2) => {
      const offset = key2.o;
      const prop = key2.p;
      for (let name in prop) {
        if (isKey(name)) {
          let propArray = (
            /** @type {Array} */
            properties[name]
          );
          if (!propArray) propArray = properties[name] = [];
          const duration = offset * totalDuration;
          let length = propArray.length;
          let prevKey = propArray[length - 1];
          const keyObj = { to: prop[name] };
          let durProgress = 0;
          for (let i = 0; i < length; i++) {
            durProgress += propArray[i].duration;
          }
          if (length === 1) {
            keyObj.from = prevKey.to;
          }
          if (prop.ease) {
            keyObj.ease = prop.ease;
          }
          keyObj.duration = duration - (length ? durProgress : 0);
          propArray.push(keyObj);
        }
      }
      return key2;
    });
    for (let name in properties) {
      const propArray = (
        /** @type {Array} */
        properties[name]
      );
      let prevEase;
      for (let i = 0, l = propArray.length; i < l; i++) {
        const prop = propArray[i];
        const currentEase = prop.ease;
        prop.ease = prevEase ? prevEase : void 0;
        prevEase = currentEase;
      }
      if (!propArray[0].duration) {
        propArray.shift();
      }
    }
  }
  return properties;
};
var JSAnimation = class extends Timer {
  /**
   * @param {TargetsParam} targets
   * @param {AnimationParams} parameters
   * @param {Timeline} [parent]
   * @param {Number} [parentPosition]
   * @param {Boolean} [fastSet=false]
   * @param {Number} [index=0]
   * @param {Number} [length=0]
   */
  constructor(targets, parameters, parent, parentPosition, fastSet = false, index2 = 0, length = 0) {
    super(
      /** @type {TimerParams & AnimationParams} */
      parameters,
      parent,
      parentPosition
    );
    ++JSAnimationId;
    const parsedTargets = registerTargets(targets);
    const targetsLength = parsedTargets.length;
    const kfParams = (
      /** @type {AnimationParams} */
      parameters.keyframes
    );
    const params = (
      /** @type {AnimationParams} */
      kfParams ? mergeObjects(generateKeyframes(
        /** @type {DurationKeyframes} */
        kfParams,
        parameters
      ), parameters) : parameters
    );
    const {
      id,
      delay,
      duration,
      ease,
      playbackEase,
      modifier,
      composition,
      onRender
    } = params;
    const animDefaults = parent ? parent.defaults : globals.defaults;
    const animEase = setValue(ease, animDefaults.ease);
    const animPlaybackEase = setValue(playbackEase, animDefaults.playbackEase);
    const parsedAnimPlaybackEase = animPlaybackEase ? parseEase(animPlaybackEase) : null;
    const hasSpring = !isUnd(
      /** @type {Spring} */
      animEase.ease
    );
    const tEasing = hasSpring ? (
      /** @type {Spring} */
      animEase.ease
    ) : setValue(ease, parsedAnimPlaybackEase ? "linear" : animDefaults.ease);
    const tDuration = hasSpring ? (
      /** @type {Spring} */
      animEase.settlingDuration
    ) : setValue(duration, animDefaults.duration);
    const tDelay = setValue(delay, animDefaults.delay);
    const tModifier = modifier || animDefaults.modifier;
    const tComposition = isUnd(composition) && targetsLength >= K ? compositionTypes.none : !isUnd(composition) ? composition : animDefaults.composition;
    const absoluteOffsetTime = this._offset + (parent ? parent._offset : 0);
    if (hasSpring) animEase.parent = this;
    let iterationDuration = NaN;
    let iterationDelay = NaN;
    let animationAnimationLength = 0;
    let shouldTriggerRender = 0;
    for (let targetIndex = 0; targetIndex < targetsLength; targetIndex++) {
      const target = parsedTargets[targetIndex];
      const ti = index2 || targetIndex;
      const tl = length || targetsLength;
      let lastTransformGroupIndex = NaN;
      let lastTransformGroupLength = NaN;
      for (let p in params) {
        if (isKey(p)) {
          const tweenType = getTweenType(target, p);
          const propName = sanitizePropertyName(p, target, tweenType);
          let propValue = params[p];
          const isPropValueArray = isArr(propValue);
          if (fastSet && !isPropValueArray) {
            fastSetValuesArray[0] = propValue;
            fastSetValuesArray[1] = propValue;
            propValue = fastSetValuesArray;
          }
          if (isPropValueArray) {
            const arrayLength = (
              /** @type {Array} */
              propValue.length
            );
            const isNotObjectValue = !isObj(propValue[0]);
            if (arrayLength === 2 && isNotObjectValue) {
              keyObjectTarget.to = /** @type {TweenParamValue} */
              /** @type {unknown} */
              propValue;
              keyframesTargetArray[0] = keyObjectTarget;
              keyframes = keyframesTargetArray;
            } else if (arrayLength > 2 && isNotObjectValue) {
              keyframes = [];
              propValue.forEach((v, i) => {
                if (!i) {
                  fastSetValuesArray[0] = v;
                } else if (i === 1) {
                  fastSetValuesArray[1] = v;
                  keyframes.push(fastSetValuesArray);
                } else {
                  keyframes.push(v);
                }
              });
            } else {
              keyframes = /** @type {Array.<TweenKeyValue>} */
              propValue;
            }
          } else {
            keyframesTargetArray[0] = propValue;
            keyframes = keyframesTargetArray;
          }
          let siblings = null;
          let prevTween = null;
          let firstTweenChangeStartTime = NaN;
          let lastTweenChangeEndTime = 0;
          let tweenIndex = 0;
          for (let l = keyframes.length; tweenIndex < l; tweenIndex++) {
            const keyframe = keyframes[tweenIndex];
            if (isObj(keyframe)) {
              key = keyframe;
            } else {
              keyObjectTarget.to = /** @type {TweenParamValue} */
              keyframe;
              key = keyObjectTarget;
            }
            toFunctionStore.func = null;
            fromFunctionStore.func = null;
            const computedToValue = getFunctionValue(key.to, target, ti, tl, toFunctionStore);
            let tweenToValue;
            if (isObj(computedToValue) && !isUnd(computedToValue.to)) {
              key = computedToValue;
              tweenToValue = computedToValue.to;
            } else {
              tweenToValue = computedToValue;
            }
            const tweenFromValue = getFunctionValue(key.from, target, ti, tl);
            const easeToParse = key.ease || tEasing;
            const easeFunctionResult = getFunctionValue(easeToParse, target, ti, tl);
            const keyEasing = isFnc(easeFunctionResult) || isStr(easeFunctionResult) ? easeFunctionResult : easeToParse;
            const hasSpring2 = !isUnd(keyEasing) && !isUnd(
              /** @type {Spring} */
              keyEasing.ease
            );
            const tweenEasing = hasSpring2 ? (
              /** @type {Spring} */
              keyEasing.ease
            ) : keyEasing;
            const tweenDuration = hasSpring2 ? (
              /** @type {Spring} */
              keyEasing.settlingDuration
            ) : getFunctionValue(setValue(key.duration, l > 1 ? getFunctionValue(tDuration, target, ti, tl) / l : tDuration), target, ti, tl);
            const tweenDelay = getFunctionValue(setValue(key.delay, !tweenIndex ? tDelay : 0), target, ti, tl);
            const computedComposition = getFunctionValue(setValue(key.composition, tComposition), target, ti, tl);
            const tweenComposition = isNum(computedComposition) ? computedComposition : compositionTypes[computedComposition];
            const tweenModifier = key.modifier || tModifier;
            const hasFromvalue = !isUnd(tweenFromValue);
            const hasToValue = !isUnd(tweenToValue);
            const isFromToArray = isArr(tweenToValue);
            const isFromToValue = isFromToArray || hasFromvalue && hasToValue;
            const tweenStartTime = prevTween ? lastTweenChangeEndTime + tweenDelay : tweenDelay;
            const absoluteStartTime = round(absoluteOffsetTime + tweenStartTime, 12);
            if (!shouldTriggerRender && (hasFromvalue || isFromToArray)) shouldTriggerRender = 1;
            let prevSibling = prevTween;
            if (tweenComposition !== compositionTypes.none) {
              if (!siblings) siblings = getTweenSiblings(target, propName);
              let nextSibling = siblings._head;
              while (nextSibling && !nextSibling._isOverridden && nextSibling._absoluteStartTime <= absoluteStartTime) {
                prevSibling = nextSibling;
                nextSibling = nextSibling._nextRep;
                if (nextSibling && nextSibling._absoluteStartTime >= absoluteStartTime) {
                  while (nextSibling) {
                    overrideTween(nextSibling);
                    nextSibling = nextSibling._nextRep;
                  }
                }
              }
            }
            if (isFromToValue) {
              decomposeRawValue(isFromToArray ? getFunctionValue(tweenToValue[0], target, ti, tl, fromFunctionStore) : tweenFromValue, fromTargetObject);
              decomposeRawValue(isFromToArray ? getFunctionValue(tweenToValue[1], target, ti, tl, toFunctionStore) : tweenToValue, toTargetObject);
              const originalValue = getOriginalAnimatableValue(target, propName, tweenType, inlineStylesStore);
              if (fromTargetObject.t === valueTypes.NUMBER) {
                if (prevSibling) {
                  if (prevSibling._valueType === valueTypes.UNIT) {
                    fromTargetObject.t = valueTypes.UNIT;
                    fromTargetObject.u = prevSibling._unit;
                  }
                } else {
                  decomposeRawValue(
                    originalValue,
                    decomposedOriginalValue
                  );
                  if (decomposedOriginalValue.t === valueTypes.UNIT) {
                    fromTargetObject.t = valueTypes.UNIT;
                    fromTargetObject.u = decomposedOriginalValue.u;
                  }
                }
              }
            } else {
              if (hasToValue) {
                decomposeRawValue(tweenToValue, toTargetObject);
              } else {
                if (prevTween) {
                  decomposeTweenValue(prevTween, toTargetObject);
                } else {
                  decomposeRawValue(parent && prevSibling && prevSibling.parent.parent === parent ? prevSibling._value : getOriginalAnimatableValue(target, propName, tweenType, inlineStylesStore), toTargetObject);
                }
              }
              if (hasFromvalue) {
                decomposeRawValue(tweenFromValue, fromTargetObject);
              } else {
                if (prevTween) {
                  decomposeTweenValue(prevTween, fromTargetObject);
                } else {
                  decomposeRawValue(parent && prevSibling && prevSibling.parent.parent === parent ? prevSibling._value : (
                    // No need to get and parse the original value if the tween is part of a timeline and has a previous sibling part of the same timeline
                    getOriginalAnimatableValue(target, propName, tweenType, inlineStylesStore)
                  ), fromTargetObject);
                }
              }
            }
            if (fromTargetObject.o) {
              fromTargetObject.n = getRelativeValue(
                !prevSibling ? decomposeRawValue(
                  getOriginalAnimatableValue(target, propName, tweenType, inlineStylesStore),
                  decomposedOriginalValue
                ).n : prevSibling._toNumber,
                fromTargetObject.n,
                fromTargetObject.o
              );
            }
            if (toTargetObject.o) {
              toTargetObject.n = getRelativeValue(fromTargetObject.n, toTargetObject.n, toTargetObject.o);
            }
            if (fromTargetObject.t !== toTargetObject.t) {
              if (fromTargetObject.t === valueTypes.COMPLEX || toTargetObject.t === valueTypes.COMPLEX) {
                const complexValue = fromTargetObject.t === valueTypes.COMPLEX ? fromTargetObject : toTargetObject;
                const notComplexValue = fromTargetObject.t === valueTypes.COMPLEX ? toTargetObject : fromTargetObject;
                notComplexValue.t = valueTypes.COMPLEX;
                notComplexValue.s = cloneArray(complexValue.s);
                notComplexValue.d = complexValue.d.map(() => notComplexValue.n);
              } else if (fromTargetObject.t === valueTypes.UNIT || toTargetObject.t === valueTypes.UNIT) {
                const unitValue = fromTargetObject.t === valueTypes.UNIT ? fromTargetObject : toTargetObject;
                const notUnitValue = fromTargetObject.t === valueTypes.UNIT ? toTargetObject : fromTargetObject;
                notUnitValue.t = valueTypes.UNIT;
                notUnitValue.u = unitValue.u;
              } else if (fromTargetObject.t === valueTypes.COLOR || toTargetObject.t === valueTypes.COLOR) {
                const colorValue = fromTargetObject.t === valueTypes.COLOR ? fromTargetObject : toTargetObject;
                const notColorValue = fromTargetObject.t === valueTypes.COLOR ? toTargetObject : fromTargetObject;
                notColorValue.t = valueTypes.COLOR;
                notColorValue.s = colorValue.s;
                notColorValue.d = [0, 0, 0, 1];
              }
            }
            if (fromTargetObject.u !== toTargetObject.u) {
              let valueToConvert = toTargetObject.u ? fromTargetObject : toTargetObject;
              valueToConvert = convertValueUnit(
                /** @type {DOMTarget} */
                target,
                valueToConvert,
                toTargetObject.u ? toTargetObject.u : fromTargetObject.u,
                false
              );
            }
            if (toTargetObject.d && fromTargetObject.d && toTargetObject.d.length !== fromTargetObject.d.length) {
              const longestValue = fromTargetObject.d.length > toTargetObject.d.length ? fromTargetObject : toTargetObject;
              const shortestValue = longestValue === fromTargetObject ? toTargetObject : fromTargetObject;
              shortestValue.d = longestValue.d.map((_, i) => isUnd(shortestValue.d[i]) ? 0 : shortestValue.d[i]);
              shortestValue.s = cloneArray(longestValue.s);
            }
            const tweenUpdateDuration = round(+tweenDuration || minValue, 12);
            let inlineValue = inlineStylesStore[propName];
            if (!isNil(inlineValue)) inlineStylesStore[propName] = null;
            const tween = {
              parent: this,
              id: tweenId++,
              property: propName,
              target,
              _value: null,
              _toFunc: toFunctionStore.func,
              _fromFunc: fromFunctionStore.func,
              _ease: parseEase(tweenEasing),
              _fromNumbers: cloneArray(fromTargetObject.d),
              _toNumbers: cloneArray(toTargetObject.d),
              _strings: cloneArray(toTargetObject.s),
              _fromNumber: fromTargetObject.n,
              _toNumber: toTargetObject.n,
              _numbers: cloneArray(fromTargetObject.d),
              // For additive tween and animatables
              _number: fromTargetObject.n,
              // For additive tween and animatables
              _unit: toTargetObject.u,
              _modifier: tweenModifier,
              _currentTime: 0,
              _startTime: tweenStartTime,
              _delay: +tweenDelay,
              _updateDuration: tweenUpdateDuration,
              _changeDuration: tweenUpdateDuration,
              _absoluteStartTime: absoluteStartTime,
              // NOTE: Investigate bit packing to stores ENUM / BOOL
              _tweenType: tweenType,
              _valueType: toTargetObject.t,
              _composition: tweenComposition,
              _isOverlapped: 0,
              _isOverridden: 0,
              _renderTransforms: 0,
              _inlineValue: inlineValue,
              _prevRep: null,
              // For replaced tween
              _nextRep: null,
              // For replaced tween
              _prevAdd: null,
              // For additive tween
              _nextAdd: null,
              // For additive tween
              _prev: null,
              _next: null
            };
            if (tweenComposition !== compositionTypes.none) {
              composeTween(tween, siblings);
            }
            if (isNaN(firstTweenChangeStartTime)) {
              firstTweenChangeStartTime = tween._startTime;
            }
            lastTweenChangeEndTime = round(tweenStartTime + tweenUpdateDuration, 12);
            prevTween = tween;
            animationAnimationLength++;
            addChild(this, tween);
          }
          if (isNaN(iterationDelay) || firstTweenChangeStartTime < iterationDelay) {
            iterationDelay = firstTweenChangeStartTime;
          }
          if (isNaN(iterationDuration) || lastTweenChangeEndTime > iterationDuration) {
            iterationDuration = lastTweenChangeEndTime;
          }
          if (tweenType === tweenTypes.TRANSFORM) {
            lastTransformGroupIndex = animationAnimationLength - tweenIndex;
            lastTransformGroupLength = animationAnimationLength;
          }
        }
      }
      if (!isNaN(lastTransformGroupIndex)) {
        let i = 0;
        forEachChildren(this, (tween) => {
          if (i >= lastTransformGroupIndex && i < lastTransformGroupLength) {
            tween._renderTransforms = 1;
            if (tween._composition === compositionTypes.blend) {
              forEachChildren(additive.animation, (additiveTween) => {
                if (additiveTween.id === tween.id) {
                  additiveTween._renderTransforms = 1;
                }
              });
            }
          }
          i++;
        });
      }
    }
    if (!targetsLength) {
      console.warn(`No target found. Make sure the element you're trying to animate is accessible before creating your animation.`);
    }
    if (iterationDelay) {
      forEachChildren(this, (tween) => {
        if (!(tween._startTime - tween._delay)) {
          tween._delay -= iterationDelay;
        }
        tween._startTime -= iterationDelay;
      });
      iterationDuration -= iterationDelay;
    } else {
      iterationDelay = 0;
    }
    if (!iterationDuration) {
      iterationDuration = minValue;
      this.iterationCount = 0;
    }
    this.targets = parsedTargets;
    this.id = !isUnd(id) ? id : JSAnimationId;
    this.duration = iterationDuration === minValue ? minValue : clampInfinity((iterationDuration + this._loopDelay) * this.iterationCount - this._loopDelay) || minValue;
    this.onRender = onRender || animDefaults.onRender;
    this._ease = parsedAnimPlaybackEase;
    this._delay = iterationDelay;
    this.iterationDuration = iterationDuration;
    if (!this._autoplay && shouldTriggerRender) this.onRender(this);
  }
  /**
   * @param  {Number} newDuration
   * @return {this}
   */
  stretch(newDuration) {
    const currentDuration = this.duration;
    if (currentDuration === normalizeTime(newDuration)) return this;
    const timeScale = newDuration / currentDuration;
    forEachChildren(this, (tween) => {
      tween._updateDuration = normalizeTime(tween._updateDuration * timeScale);
      tween._changeDuration = normalizeTime(tween._changeDuration * timeScale);
      tween._currentTime *= timeScale;
      tween._startTime *= timeScale;
      tween._absoluteStartTime *= timeScale;
    });
    return super.stretch(newDuration);
  }
  /**
   * @return {this}
   */
  refresh() {
    forEachChildren(this, (tween) => {
      const toFunc = tween._toFunc;
      const fromFunc = tween._fromFunc;
      if (toFunc || fromFunc) {
        if (fromFunc) {
          decomposeRawValue(fromFunc(), fromTargetObject);
          if (fromTargetObject.u !== tween._unit && tween.target[isDomSymbol]) {
            convertValueUnit(
              /** @type {DOMTarget} */
              tween.target,
              fromTargetObject,
              tween._unit,
              true
            );
          }
          tween._fromNumbers = cloneArray(fromTargetObject.d);
          tween._fromNumber = fromTargetObject.n;
        } else if (toFunc) {
          decomposeRawValue(getOriginalAnimatableValue(tween.target, tween.property, tween._tweenType), decomposedOriginalValue);
          tween._fromNumbers = cloneArray(decomposedOriginalValue.d);
          tween._fromNumber = decomposedOriginalValue.n;
        }
        if (toFunc) {
          decomposeRawValue(toFunc(), toTargetObject);
          tween._toNumbers = cloneArray(toTargetObject.d);
          tween._strings = cloneArray(toTargetObject.s);
          tween._toNumber = toTargetObject.o ? getRelativeValue(tween._fromNumber, toTargetObject.n, toTargetObject.o) : toTargetObject.n;
        }
      }
    });
    if (this.duration === minValue) this.restart();
    return this;
  }
  /**
   * Cancel the animation and revert all the values affected by this animation to their original state
   * @return {this}
   */
  revert() {
    super.revert();
    return cleanInlineStyles(this);
  }
  /**
   * @typedef {this & {then: null}} ResolvedJSAnimation
   */
  /**
   * @param  {Callback<ResolvedJSAnimation>} [callback]
   * @return Promise<this>
   */
  then(callback) {
    return super.then(callback);
  }
};
var animate2 = (targets, parameters) => new JSAnimation(targets, parameters, null, 0, false).init();

// node_modules/.pnpm/animejs@4.3.6/node_modules/animejs/dist/modules/timeline/position.js
var getPrevChildOffset = (timeline, timePosition) => {
  if (stringStartsWith(timePosition, "<")) {
    const goToPrevAnimationOffset = timePosition[1] === "<";
    const prevAnimation = (
      /** @type {Tickable} */
      timeline._tail
    );
    const prevOffset = prevAnimation ? prevAnimation._offset + prevAnimation._delay : 0;
    return goToPrevAnimationOffset ? prevOffset : prevOffset + prevAnimation.duration;
  }
};
var parseTimelinePosition = (timeline, timePosition) => {
  let tlDuration = timeline.iterationDuration;
  if (tlDuration === minValue) tlDuration = 0;
  if (isUnd(timePosition)) return tlDuration;
  if (isNum(+timePosition)) return +timePosition;
  const timePosStr = (
    /** @type {String} */
    timePosition
  );
  const tlLabels = timeline ? timeline.labels : null;
  const hasLabels = !isNil(tlLabels);
  const prevOffset = getPrevChildOffset(timeline, timePosStr);
  const hasSibling = !isUnd(prevOffset);
  const matchedRelativeOperator = relativeValuesExecRgx.exec(timePosStr);
  if (matchedRelativeOperator) {
    const fullOperator = matchedRelativeOperator[0];
    const split = timePosStr.split(fullOperator);
    const labelOffset = hasLabels && split[0] ? tlLabels[split[0]] : tlDuration;
    const parsedOffset = hasSibling ? prevOffset : hasLabels ? labelOffset : tlDuration;
    const parsedNumericalOffset = +split[1];
    return getRelativeValue(parsedOffset, parsedNumericalOffset, fullOperator[0]);
  } else {
    return hasSibling ? prevOffset : hasLabels ? !isUnd(tlLabels[timePosStr]) ? tlLabels[timePosStr] : tlDuration : tlDuration;
  }
};

// node_modules/.pnpm/animejs@4.3.6/node_modules/animejs/dist/modules/utils/random.js
var random = (min = 0, max2 = 1, decimalLength = 0) => {
  const m = 10 ** decimalLength;
  return Math.floor((Math.random() * (max2 - min + 1 / m) + min) * m) / m;
};
var shuffle = (items) => {
  let m = items.length, t, i;
  while (m) {
    i = random(0, --m);
    t = items[m];
    items[m] = items[i];
    items[i] = t;
  }
  return items;
};

// node_modules/.pnpm/animejs@4.3.6/node_modules/animejs/dist/modules/utils/stagger.js
var stagger = (val, params = {}) => {
  let values = [];
  let maxValue2 = 0;
  const from = params.from;
  const reversed = params.reversed;
  const ease = params.ease;
  const hasEasing = !isUnd(ease);
  const hasSpring = hasEasing && !isUnd(
    /** @type {Spring} */
    ease.ease
  );
  const staggerEase = hasSpring ? (
    /** @type {Spring} */
    ease.ease
  ) : hasEasing ? parseEase(ease) : null;
  const grid = params.grid;
  const axis = params.axis;
  const customTotal = params.total;
  const fromFirst = isUnd(from) || from === 0 || from === "first";
  const fromCenter = from === "center";
  const fromLast = from === "last";
  const fromRandom = from === "random";
  const isRange = isArr(val);
  const useProp = params.use;
  const val1 = isRange ? parseNumber(val[0]) : parseNumber(val);
  const val2 = isRange ? parseNumber(val[1]) : 0;
  const unitMatch = unitsExecRgx.exec((isRange ? val[1] : val) + emptyString);
  const start = params.start || 0 + (isRange ? val1 : 0);
  let fromIndex = fromFirst ? 0 : isNum(from) ? from : 0;
  return (target, i, t, tl) => {
    const [registeredTarget] = registerTargets(target);
    const total = isUnd(customTotal) ? t : customTotal;
    const customIndex = !isUnd(useProp) ? isFnc(useProp) ? useProp(registeredTarget, i, total) : getOriginalAnimatableValue(registeredTarget, useProp) : false;
    const staggerIndex = isNum(customIndex) || isStr(customIndex) && isNum(+customIndex) ? +customIndex : i;
    if (fromCenter) fromIndex = (total - 1) / 2;
    if (fromLast) fromIndex = total - 1;
    if (!values.length) {
      for (let index2 = 0; index2 < total; index2++) {
        if (!grid) {
          values.push(abs(fromIndex - index2));
        } else {
          const fromX = !fromCenter ? fromIndex % grid[0] : (grid[0] - 1) / 2;
          const fromY = !fromCenter ? floor(fromIndex / grid[0]) : (grid[1] - 1) / 2;
          const toX = index2 % grid[0];
          const toY = floor(index2 / grid[0]);
          const distanceX = fromX - toX;
          const distanceY = fromY - toY;
          let value = sqrt(distanceX * distanceX + distanceY * distanceY);
          if (axis === "x") value = -distanceX;
          if (axis === "y") value = -distanceY;
          values.push(value);
        }
        maxValue2 = max(...values);
      }
      if (staggerEase) values = values.map((val3) => staggerEase(val3 / maxValue2) * maxValue2);
      if (reversed) values = values.map((val3) => axis ? val3 < 0 ? val3 * -1 : -val3 : abs(maxValue2 - val3));
      if (fromRandom) values = shuffle(values);
    }
    const spacing = isRange ? (val2 - val1) / maxValue2 : val1;
    const offset = tl ? parseTimelinePosition(tl, isUnd(params.start) ? tl.iterationDuration : start) : (
      /** @type {Number} */
      start
    );
    let output = offset + (spacing * round(values[staggerIndex], 2) || 0);
    if (params.modifier) output = params.modifier(output);
    if (unitMatch) output = `${output}${unitMatch[2]}`;
    return output;
  };
};

// src/script/filter.js
document.addEventListener("DOMContentLoaded", () => {
  const filterGroups = document.querySelectorAll("[data-filter-group]");
  filterGroups.forEach((group) => {
    const filterButtons = group.querySelectorAll("[data-filter]");
    const filterItems = group.querySelectorAll("[data-category]");
    if (filterButtons.length === 0 || filterItems.length === 0) return;
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        const filterValue = button.getAttribute("data-filter");
        filterItems.forEach((item) => {
          const itemCategory = item.getAttribute("data-category");
          item.classList.remove("show-item");
          if (filterValue === "all" || filterValue === itemCategory) {
            item.classList.remove("d-none");
            setTimeout(() => {
              item.classList.add("show-item");
            }, 10);
          } else {
            item.classList.add("d-none");
          }
        });
      });
    });
  });
});

// src/script/product-detail-thumb-slider.js
function initProductGallery() {
  const mainNode = document.querySelector("#productCarouselMain");
  const thumbNode = document.querySelector("#productCarouselThumbs");
  if (!mainNode || !thumbNode) return;
  const wrapperNode = mainNode.closest(".main-slider-wrapper");
  const mainViewport = mainNode.querySelector(".embla__viewport");
  const thumbViewport = thumbNode.querySelector(".embla__viewport");
  if (!mainViewport || !thumbViewport || !wrapperNode) return;
  const emblaMain = EmblaCarousel(mainViewport, {
    loop: true,
    skipSnaps: false
  });
  const emblaThumbs = EmblaCarousel(thumbViewport, {
    containScroll: "keepSnaps",
    dragFree: true
  });
  const prevBtn = wrapperNode.querySelector(".prev-btn");
  const nextBtn = wrapperNode.querySelector(".next-btn");
  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      emblaMain.scrollPrev();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      emblaMain.scrollNext();
    });
  }
  const thumbSlides = emblaThumbs.slideNodes();
  const toggleThumbBtnsState = () => {
    const selected = emblaMain.selectedScrollSnap();
    emblaThumbs.scrollTo(selected);
    thumbSlides.forEach((slideNode, index2) => {
      if (index2 === selected) {
        slideNode.classList.add("is-selected");
      } else {
        slideNode.classList.remove("is-selected");
      }
    });
  };
  const onThumbClick = (index2, e) => {
    e.preventDefault();
    if (!emblaMain) return;
    emblaMain.scrollTo(index2);
  };
  thumbSlides.forEach((slideNode, index2) => {
    const btn = slideNode.querySelector(".thumb-btn");
    if (btn) {
      btn.addEventListener("click", (e) => onThumbClick(index2, e));
    }
  });
  emblaMain.on("init", toggleThumbBtnsState);
  emblaMain.on("select", toggleThumbBtnsState);
  emblaMain.on("reInit", toggleThumbBtnsState);
}

// src/main.js
window.bootstrap = {
  Carousel: import_carousel.default,
  Collapse: import_collapse.default,
  Dropdown: import_dropdown.default,
  Modal: import_modal.default,
  Tab: import_tab.default
};
document.addEventListener("DOMContentLoaded", function() {
  const sr = scrollreveal_es_default({
    duration: 1e3,
    origin: "top",
    distance: "50px",
    easing: "ease-in-out",
    reset: false
  });
  sr.reveal(".scroll-reveal");
  sr.reveal(".scroll-reveal-bottom", { origin: "bottom", distance: "100px" });
  sr.reveal(".scroll-reveal-left", { origin: "left" });
  sr.reveal(".scroll-reveal-left-step-1", {
    origin: "left",
    distance: "100px"
  });
  sr.reveal(".scroll-reveal-left-step-2", {
    origin: "left",
    distance: "150px"
  });
  sr.reveal(".scroll-reveal-right", { origin: "right" });
  sr.reveal(".scroll-reveal-top", { origin: "top" });
});
document.addEventListener("DOMContentLoaded", () => {
  const smartSliders = document.querySelectorAll(
    '[data-module="smart-slider"]'
  );
  smartSliders.forEach((sliderEl) => {
    new SmartCarousel(sliderEl);
  });
});
document.addEventListener("DOMContentLoaded", function() {
  var emblaNode = document.querySelector("#productCarouselEmbla");
  if (!emblaNode) return;
  var viewportNode = emblaNode.querySelector(".embla__viewport");
  var autoplayOptions = {
    delay: 5e3,
    stopOnMouseEnter: true,
    stopOnInteraction: false
  };
  var emblaApiProductCarousel = EmblaCarousel(
    viewportNode,
    {
      loop: true,
      align: "start"
    },
    [Autoplay(autoplayOptions)]
  );
  var prevBtnProject = emblaNode.querySelector(".prev-btn");
  var nextBtnProject = emblaNode.querySelector(".next-btn");
  if (prevBtnProject) {
    prevBtnProject.addEventListener("click", function() {
      emblaApiProductCarousel.scrollPrev();
    });
  }
  if (nextBtnProject) {
    nextBtnProject.addEventListener("click", function() {
      emblaApiProductCarousel.scrollNext();
    });
  }
});
document.querySelectorAll(".animation-text").forEach((title) => {
  title.innerHTML = title.textContent.split("").map((char) => `<span>${char}</span>`).join("");
  const spans = title.querySelectorAll("span");
  function animateIn() {
    animate2(spans, {
      opacity: 1,
      translateY: 0,
      duration: 700,
      delay: stagger(40),
      easing: "easeOutExpo"
    });
  }
  function animateOut() {
    animate2(spans, {
      opacity: 0,
      translateY: 40,
      duration: 400,
      delay: stagger(20),
      easing: "easeInExpo"
    });
  }
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        animateIn();
      } else {
        animateOut();
      }
    },
    {
      threshold: 0.6
    }
  );
  observer.observe(title);
});
document.querySelectorAll(".reveal-section").forEach((section) => {
  function show() {
    animate2(section, {
      opacity: 1,
      translateY: 0,
      duration: 600,
      easing: "easeOutCubic"
    });
  }
  function hide() {
    animate2(section, {
      opacity: 0,
      translateY: 40,
      duration: 500,
      easing: "easeInCubic"
    });
  }
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        show();
      } else {
        hide();
      }
    },
    {
      threshold: 0.2
    }
  );
  observer.observe(section);
});
var clamp2 = (v, min = 0, max2 = 1) => Math.min(max2, Math.max(min, v));
document.querySelectorAll(".reveal-3d").forEach((el) => {
  function update() {
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const startTrigger = vh;
    const endTrigger = vh * 0.3;
    const progress = clamp2(
      (startTrigger - rect.top) / (startTrigger - endTrigger)
    );
    animate2(el, {
      opacity: progress,
      scale: 0.8 + progress * 0.2,
      translateY: 100 * (1 - progress),
      translateZ: [-500 * (1 - progress), 0],
      rotateX: 15 * (1 - progress),
      duration: 0,
      easing: "linear"
    });
  }
  update();
  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );
});
document.addEventListener("DOMContentLoaded", () => {
  initProductGallery();
});
var referencesNode = document.querySelector("#referencesCarousel");
if (referencesNode) {
  const referencesViewport = referencesNode.querySelector(".embla__viewport");
  const referencesAutoplayOptions = {
    delay: 2500,
    stopOnMouseEnter: true,
    stopOnInteraction: false
  };
  const emblaApiReferences = EmblaCarousel(
    referencesViewport,
    {
      loop: true,
      align: "start",
      dragFree: true,
      containScroll: "trimSnaps"
    },
    [Autoplay(referencesAutoplayOptions)]
  );
}
document.addEventListener("DOMContentLoaded", function() {
  const modal = document.getElementById("imageZoomModal");
  if (!modal) return;
  const carouselInner = modal.querySelector(".carousel-inner");
  const images = document.querySelectorAll(".zoomable-image");
  let clickedIndex = 0;
  images.forEach((img, index2) => {
    img.closest("a").addEventListener("click", function() {
      clickedIndex = index2;
    });
  });
  modal.addEventListener("show.bs.modal", function() {
    carouselInner.innerHTML = "";
    images.forEach((img, index2) => {
      const src = img.getAttribute("src");
      const isActive = index2 === clickedIndex ? "active" : "";
      const item = `
                <div class="carousel-item ${isActive}">
                    <div class="d-flex justify-content-center align-items-center" style="height:100vh;">
                        <img src="${src}" class="img-fluid" style="max-height:90vh;">
                    </div>
                </div>
            `;
      carouselInner.insertAdjacentHTML("beforeend", item);
    });
  });
  modal.addEventListener("hidden.bs.modal", function() {
    carouselInner.innerHTML = "";
  });
});
/*! Bundled license information:

bootstrap/js/dist/dom/data.js:
  (*!
    * Bootstrap data.js v5.3.8 (https://getbootstrap.com/)
    * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)

bootstrap/js/dist/util/index.js:
  (*!
    * Bootstrap index.js v5.3.8 (https://getbootstrap.com/)
    * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)

bootstrap/js/dist/dom/event-handler.js:
  (*!
    * Bootstrap event-handler.js v5.3.8 (https://getbootstrap.com/)
    * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)

bootstrap/js/dist/dom/manipulator.js:
  (*!
    * Bootstrap manipulator.js v5.3.8 (https://getbootstrap.com/)
    * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)

bootstrap/js/dist/util/config.js:
  (*!
    * Bootstrap config.js v5.3.8 (https://getbootstrap.com/)
    * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)

bootstrap/js/dist/base-component.js:
  (*!
    * Bootstrap base-component.js v5.3.8 (https://getbootstrap.com/)
    * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)

bootstrap/js/dist/dom/selector-engine.js:
  (*!
    * Bootstrap selector-engine.js v5.3.8 (https://getbootstrap.com/)
    * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)

bootstrap/js/dist/util/swipe.js:
  (*!
    * Bootstrap swipe.js v5.3.8 (https://getbootstrap.com/)
    * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)

bootstrap/js/dist/carousel.js:
  (*!
    * Bootstrap carousel.js v5.3.8 (https://getbootstrap.com/)
    * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)

bootstrap/js/dist/collapse.js:
  (*!
    * Bootstrap collapse.js v5.3.8 (https://getbootstrap.com/)
    * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)

bootstrap/js/dist/dropdown.js:
  (*!
    * Bootstrap dropdown.js v5.3.8 (https://getbootstrap.com/)
    * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)

bootstrap/js/dist/util/backdrop.js:
  (*!
    * Bootstrap backdrop.js v5.3.8 (https://getbootstrap.com/)
    * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)

bootstrap/js/dist/util/component-functions.js:
  (*!
    * Bootstrap component-functions.js v5.3.8 (https://getbootstrap.com/)
    * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)

bootstrap/js/dist/util/focustrap.js:
  (*!
    * Bootstrap focustrap.js v5.3.8 (https://getbootstrap.com/)
    * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)

bootstrap/js/dist/util/scrollbar.js:
  (*!
    * Bootstrap scrollbar.js v5.3.8 (https://getbootstrap.com/)
    * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)

bootstrap/js/dist/modal.js:
  (*!
    * Bootstrap modal.js v5.3.8 (https://getbootstrap.com/)
    * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)

bootstrap/js/dist/tab.js:
  (*!
    * Bootstrap tab.js v5.3.8 (https://getbootstrap.com/)
    * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)

is-dom-node/dist/is-dom-node.es.js:
  (*! @license is-dom-node v1.0.4
  
  	Copyright 2018 Fisssion LLC.
  
  	Permission is hereby granted, free of charge, to any person obtaining a copy
  	of this software and associated documentation files (the "Software"), to deal
  	in the Software without restriction, including without limitation the rights
  	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  	copies of the Software, and to permit persons to whom the Software is
  	furnished to do so, subject to the following conditions:
  
  	The above copyright notice and this permission notice shall be included in all
  	copies or substantial portions of the Software.
  
  	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  	SOFTWARE.
  
  *)

is-dom-node-list/dist/is-dom-node-list.es.js:
  (*! @license is-dom-node-list v1.2.1
  
  	Copyright 2018 Fisssion LLC.
  
  	Permission is hereby granted, free of charge, to any person obtaining a copy
  	of this software and associated documentation files (the "Software"), to deal
  	in the Software without restriction, including without limitation the rights
  	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  	copies of the Software, and to permit persons to whom the Software is
  	furnished to do so, subject to the following conditions:
  
  	The above copyright notice and this permission notice shall be included in all
  	copies or substantial portions of the Software.
  
  	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  	SOFTWARE.
  
  *)

tealight/dist/tealight.es.js:
  (*! @license Tealight v0.3.6
  
  	Copyright 2018 Fisssion LLC.
  
  	Permission is hereby granted, free of charge, to any person obtaining a copy
  	of this software and associated documentation files (the "Software"), to deal
  	in the Software without restriction, including without limitation the rights
  	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  	copies of the Software, and to permit persons to whom the Software is
  	furnished to do so, subject to the following conditions:
  
  	The above copyright notice and this permission notice shall be included in all
  	copies or substantial portions of the Software.
  
  	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  	SOFTWARE.
  
  *)

rematrix/dist/rematrix.es.js:
  (*! @license Rematrix v0.3.0
  
  	Copyright 2018 Julian Lloyd.
  
  	Permission is hereby granted, free of charge, to any person obtaining a copy
  	of this software and associated documentation files (the "Software"), to deal
  	in the Software without restriction, including without limitation the rights
  	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  	copies of the Software, and to permit persons to whom the Software is
  	furnished to do so, subject to the following conditions:
  
  	The above copyright notice and this permission notice shall be included in
  	all copies or substantial portions of the Software.
  
  	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  	THE SOFTWARE.
  *)

miniraf/dist/miniraf.es.js:
  (*! @license miniraf v1.0.0
  
  	Copyright 2018 Fisssion LLC.
  
  	Permission is hereby granted, free of charge, to any person obtaining a copy
  	of this software and associated documentation files (the "Software"), to deal
  	in the Software without restriction, including without limitation the rights
  	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  	copies of the Software, and to permit persons to whom the Software is
  	furnished to do so, subject to the following conditions:
  
  	The above copyright notice and this permission notice shall be included in all
  	copies or substantial portions of the Software.
  
  	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  	SOFTWARE.
  
  *)

scrollreveal/dist/scrollreveal.es.js:
  (*! @license ScrollReveal v4.0.9
  
  	Copyright 2021 Fisssion LLC.
  
  	Licensed under the GNU General Public License 3.0 for
  	compatible open source projects and non-commercial use.
  
  	For commercial sites, themes, projects, and applications,
  	keep your source code private/proprietary by purchasing
  	a commercial license from https://scrollrevealjs.org/
  *)

animejs/dist/modules/core/consts.js:
animejs/dist/modules/core/globals.js:
animejs/dist/modules/core/helpers.js:
animejs/dist/modules/core/transforms.js:
animejs/dist/modules/core/colors.js:
animejs/dist/modules/core/values.js:
animejs/dist/modules/core/render.js:
animejs/dist/modules/core/styles.js:
animejs/dist/modules/core/clock.js:
animejs/dist/modules/core/targets.js:
animejs/dist/modules/core/units.js:
  (**
   * Anime.js - core - ESM
   * @version v4.3.6
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/animation/additive.js:
animejs/dist/modules/animation/composition.js:
animejs/dist/modules/animation/animation.js:
  (**
   * Anime.js - animation - ESM
   * @version v4.3.6
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/engine/engine.js:
  (**
   * Anime.js - engine - ESM
   * @version v4.3.6
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/timer/timer.js:
  (**
   * Anime.js - timer - ESM
   * @version v4.3.6
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/easings/none.js:
animejs/dist/modules/easings/eases/parser.js:
  (**
   * Anime.js - easings - ESM
   * @version v4.3.6
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/timeline/position.js:
  (**
   * Anime.js - timeline - ESM
   * @version v4.3.6
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/utils/random.js:
animejs/dist/modules/utils/stagger.js:
  (**
   * Anime.js - utils - ESM
   * @version v4.3.6
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/index.js:
  (**
   * Anime.js - ESM
   * @version v4.3.6
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)
*/
//# sourceMappingURL=main.js.map
