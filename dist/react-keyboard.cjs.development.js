'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var classNames = _interopDefault(require('classnames'));
var React = require('react');
var React__default = _interopDefault(React);
var axios = _interopDefault(require('axios'));
var reactTransitionGroup = require('react-transition-group');

/**
 * @description 按特定长度切割数组
 * @param {T[]} array 需要分组的数组
 * @param {number} subGroupLength 切割长度
 * @returns {T[][]} 切割后的数组
 */
var groupSplitArray = function groupSplitArray(array, subGroupLength) {
  var index = 0;
  var newArray = [];

  while (index < array.length) {
    newArray.push(array.slice(index, index += subGroupLength));
  }

  return newArray;
};

var EventEmitter = /*#__PURE__*/function () {
  function EventEmitter() {
    this.listeners = {};
  }

  var _proto = EventEmitter.prototype;

  _proto.on = function on(type, cb) {
    var _this = this;

    var cbs = this.listeners[type];

    if (!cbs) {
      cbs = [];
    }

    cbs.push(cb);
    this.listeners[type] = cbs;
    return function () {
      _this.remove(type, cb);
    };
  };

  _proto.emit = function emit(type) {
    var cbs = this.listeners[type];

    if (Array.isArray(cbs)) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      for (var i = 0; i < cbs.length; i++) {
        var cb = cbs[i];

        if (typeof cb === 'function') {
          cb.apply(void 0, args);
        }
      }
    }
  };

  _proto.remove = function remove(type, cb) {
    if (cb) {
      var cbs = this.listeners[type];
      if (!cbs) return;
      cbs = cbs.filter(function (eMap) {
        return eMap !== cb;
      });
      this.listeners[type] = cbs;
    } else {
      this.listeners[type] = null;
      delete this.listeners[type];
    }
  };

  return EventEmitter;
}();

var useEventEmitter = /*#__PURE__*/new EventEmitter();

var KeyBoardContext = /*#__PURE__*/React.createContext({
  color: '',
  modeList: [],
  handApi: '',
  transitionTime: 0,
  closeKeyBoard: function closeKeyBoard() {},
  changeDefaultBoard: function changeDefaultBoard() {}
});
var KeyBoardProvide = KeyBoardContext.Provider;

var Result = /*#__PURE__*/React.memo(function (_ref) {
  var resultVal = _ref.resultVal,
      change = _ref.change;

  var _useContext = React.useContext(KeyBoardContext),
      color = _useContext.color;

  var _useState = React.useState(''),
      status = _useState[0],
      setStatus = _useState[1];

  var _useState2 = React.useState([]),
      valueList = _useState2[0],
      setValueList = _useState2[1];

  var _useState3 = React.useState([]),
      showList = _useState3[0],
      setShowList = _useState3[1];

  var _useState4 = React.useState(0),
      showIndex = _useState4[0],
      setShowIndex = _useState4[1]; // border color


  var borderStyle = {
    borderTopColor: color
  };
  React.useEffect(function () {
    useEventEmitter.on('keyBoardChange', function (status) {
      // 会引起高度变化 需要重新计算画板
      useEventEmitter.emit('updateBound');
      setStatus(status); // 重置

      reset();
    });
    useEventEmitter.on('getWordsFromServer', function (serverData) {
      var _valueList = Array.from(new Set(serverData.replace(/\s+/g, '').split('')));

      setValueList(_valueList);
      setShowList(groupSplitArray(_valueList, 11));
    });
    return function () {
      useEventEmitter.remove('keyBoardChange');
      useEventEmitter.remove('getWordsFromServer');
    };
  }, []); // 监听传入值的变化

  React.useEffect(function () {
    var _resultVal$value;

    setShowIndex(0);

    var _valueList = (resultVal == null ? void 0 : (_resultVal$value = resultVal.value) == null ? void 0 : _resultVal$value.split('')) || [];

    setValueList(_valueList);

    if (_valueList.length === 0) {
      setShowList([]);
      return;
    }

    setShowList(groupSplitArray(_valueList, 11));
  }, [resultVal]);
  /**
   * @description 重置
   */

  function reset() {
    setShowIndex(0);
    setValueList([]);
    setShowList([]);
    useEventEmitter.emit('resultReset');
  }

  return status === 'CN' || status === 'handwrite' ? React__default.createElement("div", {
    className: "key-board-result",
    style: {
      color: color
    }
  }, status === 'CN' && React__default.createElement("div", {
    className: "key-board-code-show"
  }, resultVal.code), React__default.createElement("div", {
    className: "key-board-result-show"
  }, React__default.createElement("div", {
    className: "key-board-result-show-container"
  }, showList.length > 0 && showList[showIndex].map(function (key, index) {
    return React__default.createElement("span", {
      key: index,
      onClick: function onClick() {
        reset(); // 传递选中的字

        change && change(key);
      }
    }, index + 1, ".", key);
  })), valueList.length > 11 && React__default.createElement("div", {
    className: "key-board-result-show-more"
  }, React__default.createElement("span", {
    style: borderStyle,
    onClick: function onClick() {
      if (showIndex === 0) return;
      setShowIndex(showIndex - 1);
    }
  }), React__default.createElement("span", {
    style: borderStyle,
    onClick: function onClick() {
      if (showIndex === showList.length - 1) return;
      setShowIndex(showIndex + 1);
    }
  })))) : React__default.createElement("div", null);
});

function SvgBack(props) {
  return React.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 58.6 35.1"
  }, props), React.createElement("defs", null, React.createElement("style", null, '.st0{stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;}.st1{stroke-width:2.1499;stroke-miterlimit:10;}.st2{stroke-width:3.2571;stroke-miterlimit:10;}')), React.createElement("g", null, React.createElement("path", {
    className: "st0",
    d: "M8.4,8.8h37.1c6.7,0,12.2,5.4,12.2,12.2l0,0c0,7.2-5.8,13.1-13.1,13.1c0,0,0,0,0,0h-24"
  }), React.createElement("g", null, React.createElement("path", {
    className: "st1",
    d: "M3,9.1l8.6,6.9c0.1,0.1,0.3,0,0.3-0.1V2c0-0.2-0.2-0.2-0.3-0.1L3,8.8C2.9,8.9,2.9,9,3,9.1z"
  }), React.createElement("path", {
    className: "st2",
    d: "M10.4,4.8c0,0-5.4,4.1-5.4,4s5.6,3.8,5.6,3.8L10.4,4.8z"
  }))));
}

function SvgClose(props) {
  return React.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 50 35.93"
  }, props), React.createElement("defs", null, React.createElement("style", null, '.cls-2,.cls-3,.cls-4{stroke-width:2px;}.cls-3,.cls-4{stroke-linecap:round;}.cls-3{stroke-dasharray:3 4;}.cls-5,.cls-6{stroke-miterlimit:10;}.cls-5{stroke-width:2.2px;}.cls-6{stroke-width:3.39px;}')), React.createElement("g", null, React.createElement("g", null, React.createElement("g", null, React.createElement("g", null, React.createElement("rect", {
    className: "cls-1",
    width: "50",
    height: "27",
    rx: "5"
  }), React.createElement("rect", {
    className: "cls-2",
    x: "1",
    y: "1",
    width: "48",
    height: "25",
    rx: "4"
  })), React.createElement("g", null, React.createElement("path", {
    className: "cls-3",
    d: "M9.5,8H40.18"
  }), React.createElement("path", {
    className: "cls-3",
    d: "M9.5,13.5H40.18"
  }), React.createElement("path", {
    className: "cls-3",
    d: "M9.5,19h3.17"
  }), React.createElement("path", {
    className: "cls-4",
    d: "M16.5,19h17"
  }), React.createElement("path", {
    className: "cls-3",
    d: "M37.5,19h2.68"
  }))), React.createElement("path", {
    className: "cls-5",
    d: "M25.18,34.82l5.32-4.25a.07.07,0,0,0,0-.12H19.83a.07.07,0,0,0,0,.12l5.31,4.25A.06.06,0,0,0,25.18,34.82Z"
  }), React.createElement("circle", {
    className: "cls-6",
    cx: "25.14",
    cy: "32.58",
    r: "1"
  }))));
}

function SvgUpper(props) {
  return React.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    width: 24.37,
    height: 32.991,
    viewBox: "0 0 24.37 32.991"
  }, props), React.createElement("g", {
    transform: "translate(-437.841 -757.875)"
  }, React.createElement("path", {
    d: "M800.491,472.525l-9.622-9.889a1.53,1.53,0,0,0-2.192,0l-9.622,9.889a1.529,1.529,0,0,0,1.1,2.6h3.975a1.529,1.529,0,0,1,1.529,1.529v8.927a1.529,1.529,0,0,0,1.529,1.529h5.175a1.529,1.529,0,0,0,1.529-1.529V476.65a1.529,1.529,0,0,1,1.529-1.529h3.976A1.529,1.529,0,0,0,800.491,472.525Z",
    transform: "translate(-339.747 296.701)",
    strokeLinecap: "round",
    strokeMiterlimit: "10",
    strokeWidth: "2"
  }), React.createElement("line", {
    x2: "13.938",
    transform: "translate(442.92 789.865)",
    strokeLinecap: "round",
    strokeMiterlimit: "10",
    strokeWidth: "2"
  })));
}

function SvgDelete(props) {
  return React.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    width: 66.467,
    height: 28.8,
    viewBox: "0 0 66.467 28.8"
  }, props), React.createElement("g", {
    transform: "translate(-1618 -633)"
  }, React.createElement("path", {
    d: "M842.844,477.922l-10.988,8.855a4.545,4.545,0,0,0,0,7.078l10.988,8.855a4.545,4.545,0,0,0,2.852,1.006h44.388a4.545,4.545,0,0,0,4.546-4.545v-17.71a4.545,4.545,0,0,0-4.546-4.545H845.7A4.545,4.545,0,0,0,842.844,477.922Z",
    transform: "translate(788.837 157.084)",
    strokeLinecap: "round",
    strokeMiterlimit: "10",
    strokeWidth: "2"
  }), React.createElement("line", {
    x2: "7.743",
    y2: "7.743",
    transform: "translate(1651.233 644.027)",
    strokeLinecap: "round",
    strokeMiterlimit: "10",
    strokeWidth: "2"
  }), React.createElement("line", {
    x1: "7.743",
    y2: "7.743",
    transform: "translate(1651.233 644.027)",
    strokeLinecap: "round",
    strokeMiterlimit: "10",
    strokeWidth: "2"
  })));
}

function SvgHandwrite(props) {
  return React.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    width: 24.784,
    height: 33.44,
    viewBox: "0 0 24.784 33.44"
  }, props), React.createElement("g", {
    transform: "translate(-783.997 -761.616)"
  }, React.createElement("rect", {
    width: 7.324,
    height: 23.712,
    rx: 1.136,
    transform: "rotate(33.07 -892.505 1727.373)"
  }), React.createElement("rect", {
    width: 7.324,
    height: 4.946,
    rx: 1.136,
    transform: "rotate(33.07 -884.183 1729.853)"
  }), React.createElement("path", {
    d: "M785.413 788.854l-.407 3.922a1.136 1.136 0 001.693 1.1l3.425-1.953a1.137 1.137 0 00.057-1.939l-3.017-1.968a1.137 1.137 0 00-1.751.838z"
  })));
}

var KeyCodeButton = /*#__PURE__*/React.memo(function (props) {
  var _useState = React.useState(false),
      isHover = _useState[0],
      setHoverStatus = _useState[1];

  var _useContext = React.useContext(KeyBoardContext),
      color = _useContext.color;
  /**
   * @description 获取样式
   * @returns {React.CSSProperties}
   */


  function getStyle() {
    if (props.isUpper && props.type === 'upper' || props.isNum && props.type === 'change2num' || props.isSymbol && props.type === '#+=' || isHover) {
      return {
        color: '#f5f5f5',
        background: color
      };
    } else {
      return {
        color: color,
        background: '#f5f5f5'
      };
    }
  }
  /**
   * @description 获取键码
   * @returns {Record<'__html', string>}
   */


  function getCode() {
    if (props.type === 'change2lang') {
      return {
        __html: props.isCn ? '<label>中</label>/EN' : '<label>EN</label>/中'
      };
    }

    return {
      __html: props.isUpper ? props.data.toUpperCase() : props.data
    };
  }

  return React__default.createElement("button", {
    className: classNames('key-board-button', "key-board-button-" + props.type, {
      'key-board-button-active': props.isUpper && props.type === 'upper' || props.isNum && props.type === 'change2num' || props.isSymbol && props.type === '#+='
    }),
    style: getStyle(),
    onClick: function onClick(event) {
      // 阻止按钮默认行为
      event.preventDefault(); // 传递当前点击的键

      props.click && props.click({
        data: props.isUpper ? props.data.toUpperCase() : props.data,
        type: props.type
      });
    },
    onMouseEnter: function onMouseEnter() {
      setHoverStatus(true);
    },
    onMouseLeave: function onMouseLeave() {
      setHoverStatus(false);
    }
  }, props.type === 'back' ? // 图标按键
  React__default.createElement(SvgBack, {
    fill: "none",
    stroke: color
  }) : props.type === 'close' ? React__default.createElement(SvgClose, {
    fill: "none",
    stroke: color
  }) : props.type === 'handwrite' ? React__default.createElement(SvgHandwrite, {
    fill: "none",
    stroke: color
  }) : props.type === 'delete' ? React__default.createElement(SvgDelete, {
    fill: "none",
    stroke: color
  }) : props.type === 'upper' ? React__default.createElement(SvgUpper, {
    fill: "none",
    stroke: color
  }) : // 按键
  React__default.createElement("span", {
    dangerouslySetInnerHTML: getCode()
  }));
});

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

/**
 * @description axiso 配置
 * @param {number[]} lpXis 轨迹X
 * @param {number[]} lpYis 轨迹Y
 * @param {number[]} lpCis 轨迹标志位
 * @param {string} lib 中英文
 */

var getWordFromHandWrite = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(lpXis, lpYis, lpCis, lib) {
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return axios.post('', {
              lib: lib,
              lpXis: lpXis,
              lpYis: lpYis,
              lpCis: lpCis
            });

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getWordFromHandWrite(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var ctx; // 是否按下

var isMouseDown = false,
    x = 0,
    // 当前canvas相距左上角x
y = 0,
    // 当前canvas相距左上角y
oldX = 0,
    // 当前canvas相距左上角x
oldY = 0,
    // 当前canvas相距左上角y
clickX = [],
    // 轨迹X
clickY = [],
    // 轨迹Y
clickC = []; // 轨迹标志位，为1则是终点
// 定时器id

var timer = undefined;
var HandBoard = /*#__PURE__*/React.memo(function (props) {
  // canvas dom
  var canvas = React.useRef(null);

  var _useState = React.useState(500),
      width = _useState[0],
      setWidth = _useState[1]; // 宽


  var _useState2 = React.useState(500),
      height = _useState2[0],
      setHeight = _useState2[1]; // 高


  var _useContext = React.useContext(KeyBoardContext),
      color = _useContext.color,
      transitionTime = _useContext.transitionTime;

  React.useEffect(function () {
    var _canvas$current;

    ctx = (_canvas$current = canvas.current) == null ? void 0 : _canvas$current.getContext('2d');
    paintBoardInit();
    useEventEmitter.on('updateBound', function () {
      updateBound();
    });
    return function () {
      window.removeEventListener('transitionend', updateBound);
      window.removeEventListener('animationend', updateBound);
      window.removeEventListener('resize', updateBound);
      window.removeEventListener('scroll', updateBound);
      useEventEmitter.remove('updateBound');
    };
  }, []);
  /**
   * @description 面板初始化
   */

  function paintBoardInit() {
    reload(); // 此处兼容CSSTransition动画过程之前计算

    setTimeout(function () {
      updateBound();
    }, transitionTime);
    window.addEventListener('transitionend', updateBound);
    window.addEventListener('animationend', updateBound);
    window.addEventListener('resize', updateBound);
    window.addEventListener('scroll', updateBound);
  }
  /**
   * @description 更新尺寸以及位置
   */


  function updateBound() {
    var _document$querySelect;

    if (!document.querySelector('.paint-board')) return;
    var bound = (_document$querySelect = document.querySelector('.paint-board')) == null ? void 0 : _document$querySelect.getBoundingClientRect(); // 设置距离左上角坐标

    if (bound) {
      x = bound.x;
      y = bound.y;
    } // 设置距离宽高


    setWidth(parseFloat(window.getComputedStyle(document.querySelector('.paint-board')).width));
    setHeight(parseFloat(window.getComputedStyle(document.querySelector('.paint-board')).height));
  }
  /**
   * @description canvas重置
   */


  function reload() {
    if (!canvas || !ctx) return;
    clickX = [];
    clickY = [];
    clickC = [];
    ctx.clearRect(0, 0, width, height);
  }
  /**
   * @description 获取x坐标
   * @param {(React.TouchEvent<HTMLCanvasElement>
   *       | React.MouseEvent<HTMLCanvasElement, MouseEvent>)} event
   */


  function getCx(event) {
    // mouse事件
    if (event.type.includes('mouse')) {
      var _event = event;
      return Math.floor(_event.clientX - x);
    } else if (event.type.includes('touch')) {
      // touch事件
      var _event2 = event;
      return Math.floor(_event2.targetTouches[0].clientX - x);
    }

    return 0;
  }
  /**
   * @description 获取y坐标
   * @param {(React.TouchEvent<HTMLCanvasElement>
   *       | React.MouseEvent<HTMLCanvasElement, MouseEvent>)} event
   */


  function getCy(event) {
    // mouse事件
    if (event.type.includes('mouse')) {
      var _event = event;
      return Math.floor(_event.clientY - y);
    } else if (event.type.includes('touch')) {
      // touch事件
      var _event3 = event;
      return Math.floor(_event3.targetTouches[0].clientY - y);
    }

    return 0;
  }
  /**
   * @description 鼠标按下
   * @param {(React.TouchEvent<HTMLCanvasElement>
   *       | React.MouseEvent<HTMLCanvasElement, MouseEvent>)} event
   */


  function down(event) {
    if (!ctx) return;
    isMouseDown = true;
    var cx = getCx(event);
    var cy = getCy(event);
    timer && clearTimeout(timer);
    oldX = cx;
    oldY = cy;
    ctx.beginPath();
  }
  /**
   * @description 鼠标移动
   * @param {(React.TouchEvent<HTMLCanvasElement>
   *       | React.MouseEvent<HTMLCanvasElement, MouseEvent>)} event
   */


  function move(event) {
    if (!ctx) return; // mouse事件 阻止默认事件 touch事件不需要 详见https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener

    if (event.type.includes('mouse')) {
      event.preventDefault();
    }

    if (isMouseDown) {
      var cx = getCx(event);
      var cy = getCy(event);
      clickX.push(cx);
      clickY.push(cy);
      clickC.push(0); //画图

      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.moveTo(oldX, oldY);
      ctx.lineTo(cx, cy);
      ctx.stroke();
      oldX = cx;
      oldY = cy;
    }
  }
  /**
   * @description 鼠标松开
   */


  function mouseup() {
    if (isMouseDown) {
      isMouseDown = false;
      timer = setTimeout(function () {
        reload();
      }, 1500); //标记最后一点为终点

      clickC.pop();
      clickC.push(1);
      getWords();
    }
  }
  /**
   * @description 获取文字
   */


  function getWords() {
    return _getWords.apply(this, arguments);
  }

  function _getWords() {
    _getWords = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      var _yield$getWordFromHan, data;

      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getWordFromHandWrite(clickX, clickY, clickC, props.lib);

            case 2:
              _yield$getWordFromHan = _context.sent;
              data = _yield$getWordFromHan.data;
              useEventEmitter.emit('getWordsFromServer', (data == null ? void 0 : data.v) || '');

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _getWords.apply(this, arguments);
  }

  return React__default.createElement("div", {
    className: "paint-board"
  }, React__default.createElement("canvas", {
    ref: canvas,
    width: width,
    height: height,
    onTouchStart: down,
    onTouchMove: move,
    onTouchEnd: mouseup,
    onMouseDown: down,
    onMouseMove: move,
    onMouseUp: mouseup,
    onMouseLeave: mouseup
  }));
});

var HandBoard$1 = /*#__PURE__*/React.memo(function (props) {
  var _useContext = React.useContext(KeyBoardContext),
      closeKeyBoard = _useContext.closeKeyBoard,
      changeDefaultBoard = _useContext.changeDefaultBoard; // 手写板部分按钮列表


  var handBoardOperList = [{
    data: '中/EN',
    type: 'change2lang'
  }, {
    data: '',
    type: 'back'
  }, {
    data: '',
    type: 'delete'
  }, {
    data: '',
    type: 'close'
  }]; // 中英文模式

  var _useState = React.useState(true),
      isCn = _useState[0],
      setLanStatus = _useState[1];

  return React__default.createElement("div", {
    className: "hand-write-board"
  }, React__default.createElement(HandBoard, {
    lib: isCn ? 'CN' : 'EN'
  }), React__default.createElement("div", {
    className: "hand-write-board-opers"
  }, handBoardOperList.map(function (key) {
    return React__default.createElement(KeyCodeButton, {
      "v-for": "key in handBoardOperList",
      key: key.type,
      type: key.type,
      data: key.data,
      isCn: isCn,
      click: function click(_ref) {
        var data = _ref.data,
            type = _ref.type;

        switch (type) {
          //  关闭
          case 'close':
            {
              closeKeyBoard();
            }
            break;
          //  回退

          case 'back':
            {
              changeDefaultBoard();
              useEventEmitter.emit('keyBoardChange', isCn && 'CN');
            }
            break;
          //   语言

          case 'change2lang':
            {
              setLanStatus(!isCn);
            }
            break;
          // 删除

          case 'delete':
            {
              (props == null ? void 0 : props.trigger) && (props == null ? void 0 : props.trigger({
                data: data,
                type: type
              }));
            }
            break;
        }
      }
    });
  })));
});

var TIMEOUT = 15000;
/**
 * @description axiso 配置
 * @param {string} url
 */

var axiosConfig = function axiosConfig(url) {
  // 设置axios 接口
  axios.defaults.baseURL = url;
  axios.defaults.timeout = TIMEOUT;
  axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
};

/**
 * 收录常用汉字6763个，不支持声调，支持多音字，并按照汉字使用频率由低到高排序
 */
var pinYinNote = {
  "a": "阿啊呵腌嗄吖锕",
  "e": "额阿俄恶鹅遏鄂厄饿峨扼娥鳄哦蛾噩愕讹锷垩婀鹗萼谔莪腭锇颚呃阏屙苊轭",
  "ai": "爱埃艾碍癌哀挨矮隘蔼唉皑哎霭捱暧嫒嗳瑷嗌锿砹",
  "ei": "诶",
  "xi": "系西席息希习吸喜细析戏洗悉锡溪惜稀袭夕洒晰昔牺腊烯熙媳栖膝隙犀蹊硒兮熄曦禧嬉玺奚汐徙羲铣淅嘻歙熹矽蟋郗唏皙隰樨浠忾蜥檄郄翕阋鳃舾屣葸螅咭粞觋欷僖醯鼷裼穸饩舄禊诶菥蓰",
  "yi": "一以已意议义益亿易医艺食依移衣异伊仪宜射遗疑毅谊亦疫役忆抑尾乙译翼蛇溢椅沂泄逸蚁夷邑怡绎彝裔姨熠贻矣屹颐倚诣胰奕翌疙弈轶蛾驿壹猗臆弋铱旖漪迤佚翊诒怿痍懿饴峄揖眙镒仡黟肄咿翳挹缢呓刈咦嶷羿钇殪荑薏蜴镱噫癔苡悒嗌瘗衤佾埸圯舣酏劓",
  "an": "安案按岸暗鞍氨俺胺铵谙庵黯鹌桉埯犴揞厂广",
  "han": "厂汉韩含旱寒汗涵函喊憾罕焊翰邯撼瀚憨捍酣悍鼾邗颔蚶晗菡旰顸犴焓撖",
  "ang": "昂仰盎肮",
  "ao": "奥澳傲熬凹鳌敖遨鏖袄坳翱嗷拗懊岙螯骜獒鏊艹媪廒聱",
  "wa": "瓦挖娃洼袜蛙凹哇佤娲呙腽",
  "yu": "于与育余预域予遇奥语誉玉鱼雨渔裕愈娱欲吁舆宇羽逾豫郁寓吾狱喻御浴愉禹俞邪榆愚渝尉淤虞屿峪粥驭瑜禺毓钰隅芋熨瘀迂煜昱汩於臾盂聿竽萸妪腴圄谕觎揄龉谀俣馀庾妤瘐鬻欤鹬阈嵛雩鹆圉蜮伛纡窬窳饫蓣狳肀舁蝓燠",
  "niu": "牛纽扭钮拗妞忸狃",
  "o": "哦噢喔",
  "ba": "把八巴拔伯吧坝爸霸罢芭跋扒叭靶疤笆耙鲅粑岜灞钯捌菝魃茇",
  "pa": "怕帕爬扒趴琶啪葩耙杷钯筢",
  "pi": "被批副否皮坏辟啤匹披疲罢僻毗坯脾譬劈媲屁琵邳裨痞癖陂丕枇噼霹吡纰砒铍淠郫埤濞睥芘蚍圮鼙罴蜱疋貔仳庀擗甓陴",
  "bi": "比必币笔毕秘避闭佛辟壁弊彼逼碧鼻臂蔽拂泌璧庇痹毙弼匕鄙陛裨贲敝蓖吡篦纰俾铋毖筚荸薜婢哔跸濞秕荜愎睥妣芘箅髀畀滗狴萆嬖襞舭",
  "bai": "百白败摆伯拜柏佰掰呗擘捭稗",
  "bo": "波博播勃拨薄佛伯玻搏柏泊舶剥渤卜驳簿脖膊簸菠礴箔铂亳钵帛擘饽跛钹趵檗啵鹁擗踣",
  "bei": "北被备倍背杯勃贝辈悲碑臂卑悖惫蓓陂钡狈呗焙碚褙庳鞴孛鹎邶鐾",
  "ban": "办版半班般板颁伴搬斑扮拌扳瓣坂阪绊钣瘢舨癍",
  "pan": "判盘番潘攀盼拚畔胖叛拌蹒磐爿蟠泮袢襻丬",
  "bin": "份宾频滨斌彬濒殡缤鬓槟摈膑玢镔豳髌傧",
  "bang": "帮邦彭旁榜棒膀镑绑傍磅蚌谤梆浜蒡",
  "pang": "旁庞乓磅螃彷滂逄耪",
  "beng": "泵崩蚌蹦迸绷甭嘣甏堋",
  "bao": "报保包宝暴胞薄爆炮饱抱堡剥鲍曝葆瀑豹刨褒雹孢苞煲褓趵鸨龅勹",
  "bu": "不部步布补捕堡埔卜埠簿哺怖钚卟瓿逋晡醭钸",
  "pu": "普暴铺浦朴堡葡谱埔扑仆蒲曝瀑溥莆圃璞濮菩蹼匍噗氆攵镨攴镤",
  "mian": "面棉免绵缅勉眠冕娩腼渑湎沔黾宀眄",
  "po": "破繁坡迫颇朴泊婆泼魄粕鄱珀陂叵笸泺皤钋钷",
  "fan": "反范犯繁饭泛翻凡返番贩烦拚帆樊藩矾梵蕃钒幡畈蘩蹯燔",
  "fu": "府服副负富复福夫妇幅付扶父符附腐赴佛浮覆辅傅伏抚赋辐腹弗肤阜袱缚甫氟斧孚敷俯拂俘咐腑孵芙涪釜脯茯馥宓绂讣呋罘麸蝠匐芾蜉跗凫滏蝮驸绋蚨砩桴赙菔呒趺苻拊阝鲋怫稃郛莩幞祓艴黻黼鳆",
  "ben": "本体奔苯笨夯贲锛畚坌",
  "feng": "风丰封峰奉凤锋冯逢缝蜂枫疯讽烽俸沣酆砜葑唪",
  "bian": "变便边编遍辩鞭辨贬匾扁卞汴辫砭苄蝙鳊弁窆笾煸褊碥忭缏",
  "pian": "便片篇偏骗翩扁骈胼蹁谝犏缏",
  "zhen": "镇真针圳振震珍阵诊填侦臻贞枕桢赈祯帧甄斟缜箴疹砧榛鸩轸稹溱蓁胗椹朕畛浈",
  "biao": "表标彪镖裱飚膘飙镳婊骠飑杓髟鳔灬瘭",
  "piao": "票朴漂飘嫖瓢剽缥殍瞟骠嘌莩螵",
  "huo": "和活或货获火伙惑霍祸豁嚯藿锪蠖钬耠镬夥灬劐攉",
  "bie": "别鳖憋瘪蹩",
  "min": "民敏闽闵皿泯岷悯珉抿黾缗玟愍苠鳘",
  "fen": "分份纷奋粉氛芬愤粪坟汾焚酚吩忿棼玢鼢瀵偾鲼",
  "bing": "并病兵冰屏饼炳秉丙摒柄槟禀枋邴冫",
  "geng": "更耕颈庚耿梗埂羹哽赓绠鲠",
  "fang": "方放房防访纺芳仿坊妨肪邡舫彷枋鲂匚钫",
  "xian": "现先县见线限显险献鲜洗宪纤陷闲贤仙衔掀咸嫌掺羡弦腺痫娴舷馅酰铣冼涎暹籼锨苋蚬跹岘藓燹鹇氙莶霰跣猃彡祆筅",
  "fou": "不否缶",
  "ca": "拆擦嚓礤",
  "cha": "查察差茶插叉刹茬楂岔诧碴嚓喳姹杈汊衩搽槎镲苴檫馇锸猹",
  "cai": "才采财材菜彩裁蔡猜踩睬",
  "can": "参残餐灿惨蚕掺璨惭粲孱骖黪",
  "shen": "信深参身神什审申甚沈伸慎渗肾绅莘呻婶娠砷蜃哂椹葚吲糁渖诜谂矧胂",
  "cen": "参岑涔",
  "san": "三参散伞叁糁馓毵",
  "cang": "藏仓苍沧舱臧伧",
  "zang": "藏脏葬赃臧奘驵",
  "chen": "称陈沈沉晨琛臣尘辰衬趁忱郴宸谌碜嗔抻榇伧谶龀肜",
  "cao": "草操曹槽糙嘈漕螬艚屮",
  "ce": "策测册侧厕栅恻",
  "ze": "责则泽择侧咋啧仄箦赜笮舴昃迮帻",
  "zhai": "债择齐宅寨侧摘窄斋祭翟砦瘵哜",
  "dao": "到道导岛倒刀盗稻蹈悼捣叨祷焘氘纛刂帱忉",
  "ceng": "层曾蹭噌",
  "zha": "查扎炸诈闸渣咋乍榨楂札栅眨咤柞喳喋铡蚱吒怍砟揸痄哳齄",
  "chai": "差拆柴钗豺侪虿瘥",
  "ci": "次此差词辞刺瓷磁兹慈茨赐祠伺雌疵鹚糍呲粢",
  "zi": "资自子字齐咨滋仔姿紫兹孜淄籽梓鲻渍姊吱秭恣甾孳訾滓锱辎趑龇赀眦缁呲笫谘嵫髭茈粢觜耔",
  "cuo": "措错磋挫搓撮蹉锉厝嵯痤矬瘥脞鹾",
  "chan": "产单阐崭缠掺禅颤铲蝉搀潺蟾馋忏婵孱觇廛谄谗澶骣羼躔蒇冁",
  "shan": "山单善陕闪衫擅汕扇掺珊禅删膳缮赡鄯栅煽姗跚鳝嬗潸讪舢苫疝掸膻钐剡蟮芟埏彡骟",
  "zhan": "展战占站崭粘湛沾瞻颤詹斩盏辗绽毡栈蘸旃谵搌",
  "xin": "新心信辛欣薪馨鑫芯锌忻莘昕衅歆囟忄镡",
  "lian": "联连练廉炼脸莲恋链帘怜涟敛琏镰濂楝鲢殓潋裢裣臁奁莶蠊蔹",
  "chang": "场长厂常偿昌唱畅倡尝肠敞倘猖娼淌裳徜昶怅嫦菖鲳阊伥苌氅惝鬯",
  "zhang": "长张章障涨掌帐胀彰丈仗漳樟账杖璋嶂仉瘴蟑獐幛鄣嫜",
  "chao": "超朝潮炒钞抄巢吵剿绰嘲晁焯耖怊",
  "zhao": "着照招找召朝赵兆昭肇罩钊沼嘲爪诏濯啁棹笊",
  "zhou": "调州周洲舟骤轴昼宙粥皱肘咒帚胄绉纣妯啁诌繇碡籀酎荮",
  "che": "车彻撤尺扯澈掣坼砗屮",
  "ju": "车局据具举且居剧巨聚渠距句拒俱柜菊拘炬桔惧矩鞠驹锯踞咀瞿枸掬沮莒橘飓疽钜趄踽遽琚龃椐苣裾榘狙倨榉苴讵雎锔窭鞫犋屦醵",
  "cheng": "成程城承称盛抢乘诚呈净惩撑澄秤橙骋逞瞠丞晟铛埕塍蛏柽铖酲裎枨",
  "rong": "容荣融绒溶蓉熔戎榕茸冗嵘肜狨蝾",
  "sheng": "生声升胜盛乘圣剩牲甸省绳笙甥嵊晟渑眚",
  "deng": "等登邓灯澄凳瞪蹬噔磴嶝镫簦戥",
  "zhi": "制之治质职只志至指织支值知识直致执置止植纸拓智殖秩旨址滞氏枝芝脂帜汁肢挚稚酯掷峙炙栉侄芷窒咫吱趾痔蜘郅桎雉祉郦陟痣蛭帙枳踯徵胝栀贽祗豸鸷摭轵卮轾彘觯絷跖埴夂黹忮骘膣踬",
  "zheng": "政正证争整征郑丁症挣蒸睁铮筝拯峥怔诤狰徵钲",
  "tang": "堂唐糖汤塘躺趟倘棠烫淌膛搪镗傥螳溏帑羰樘醣螗耥铴瑭",
  "chi": "持吃池迟赤驰尺斥齿翅匙痴耻炽侈弛叱啻坻眙嗤墀哧茌豉敕笞饬踟蚩柢媸魑篪褫彳鸱螭瘛眵傺",
  "shi": "是时实事市十使世施式势视识师史示石食始士失适试什泽室似诗饰殖释驶氏硕逝湿蚀狮誓拾尸匙仕柿矢峙侍噬嗜栅拭嘘屎恃轼虱耆舐莳铈谥炻豕鲥饣螫酾筮埘弑礻蓍鲺贳",
  "qi": "企其起期气七器汽奇齐启旗棋妻弃揭枝歧欺骑契迄亟漆戚岂稽岐琦栖缉琪泣乞砌祁崎绮祺祈凄淇杞脐麒圻憩芪伎俟畦耆葺沏萋骐鳍綦讫蕲屺颀亓碛柒啐汔綮萁嘁蛴槭欹芑桤丌蜞",
  "chuai": "揣踹啜搋膪",
  "tuo": "托脱拓拖妥驼陀沱鸵驮唾椭坨佗砣跎庹柁橐乇铊沲酡鼍箨柝",
  "duo": "多度夺朵躲铎隋咄堕舵垛惰哆踱跺掇剁柁缍沲裰哚隳",
  "xue": "学血雪削薛穴靴谑噱鳕踅泶彐",
  "chong": "重种充冲涌崇虫宠忡憧舂茺铳艟",
  "chou": "筹抽绸酬愁丑臭仇畴稠瞅踌惆俦瘳雠帱",
  "qiu": "求球秋丘邱仇酋裘龟囚遒鳅虬蚯泅楸湫犰逑巯艽俅蝤赇鼽糗",
  "xiu": "修秀休宿袖绣臭朽锈羞嗅岫溴庥馐咻髹鸺貅",
  "chu": "出处础初助除储畜触楚厨雏矗橱锄滁躇怵绌搐刍蜍黜杵蹰亍樗憷楮",
  "tuan": "团揣湍疃抟彖",
  "zhui": "追坠缀揣椎锥赘惴隹骓缒",
  "chuan": "传川船穿串喘椽舛钏遄氚巛舡",
  "zhuan": "专转传赚砖撰篆馔啭颛",
  "yuan": "元员院原源远愿园援圆缘袁怨渊苑宛冤媛猿垣沅塬垸鸳辕鸢瑗圜爰芫鼋橼螈眢箢掾",
  "cuan": "窜攒篡蹿撺爨汆镩",
  "chuang": "创床窗闯幢疮怆",
  "zhuang": "装状庄壮撞妆幢桩奘僮戆",
  "chui": "吹垂锤炊椎陲槌捶棰",
  "chun": "春纯醇淳唇椿蠢鹑朐莼肫蝽",
  "zhun": "准屯淳谆肫窀",
  "cu": "促趋趣粗簇醋卒蹴猝蹙蔟殂徂",
  "dun": "吨顿盾敦蹲墩囤沌钝炖盹遁趸砘礅",
  "qu": "区去取曲趋渠趣驱屈躯衢娶祛瞿岖龋觑朐蛐癯蛆苣阒诎劬蕖蘧氍黢蠼璩麴鸲磲",
  "xu": "需许续须序徐休蓄畜虚吁绪叙旭邪恤墟栩絮圩婿戌胥嘘浒煦酗诩朐盱蓿溆洫顼勖糈砉醑",
  "chuo": "辍绰戳淖啜龊踔辶",
  "zu": "组族足祖租阻卒俎诅镞菹",
  "ji": "济机其技基记计系期际及集级几给积极己纪即继击既激绩急奇吉季齐疾迹鸡剂辑籍寄挤圾冀亟寂暨脊跻肌稽忌饥祭缉棘矶汲畸姬藉瘠骥羁妓讥稷蓟悸嫉岌叽伎鲫诘楫荠戟箕霁嵇觊麂畿玑笈犄芨唧屐髻戢佶偈笄跽蒺乩咭赍嵴虮掎齑殛鲚剞洎丌墼蕺彐芰哜",
  "cong": "从丛匆聪葱囱琮淙枞骢苁璁",
  "zong": "总从综宗纵踪棕粽鬃偬枞腙",
  "cou": "凑辏腠楱",
  "cui": "衰催崔脆翠萃粹摧璀瘁悴淬啐隹毳榱",
  "wei": "为位委未维卫围违威伟危味微唯谓伪慰尾魏韦胃畏帷喂巍萎蔚纬潍尉渭惟薇苇炜圩娓诿玮崴桅偎逶倭猥囗葳隗痿猬涠嵬韪煨艉隹帏闱洧沩隈鲔軎",
  "cun": "村存寸忖皴",
  "zuo": "作做座左坐昨佐琢撮祚柞唑嘬酢怍笮阼胙",
  "zuan": "钻纂攥缵躜",
  "da": "大达打答搭沓瘩惮嗒哒耷鞑靼褡笪怛妲",
  "dai": "大代带待贷毒戴袋歹呆隶逮岱傣棣怠殆黛甙埭诒绐玳呔迨",
  "tai": "大台太态泰抬胎汰钛苔薹肽跆邰鲐酞骀炱",
  "ta": "他它她拓塔踏塌榻沓漯獭嗒挞蹋趿遢铊鳎溻闼",
  "dan": "但单石担丹胆旦弹蛋淡诞氮郸耽殚惮儋眈疸澹掸膻啖箪聃萏瘅赕",
  "lu": "路六陆录绿露鲁卢炉鹿禄赂芦庐碌麓颅泸卤潞鹭辘虏璐漉噜戮鲈掳橹轳逯渌蓼撸鸬栌氇胪镥簏舻辂垆",
  "tan": "谈探坦摊弹炭坛滩贪叹谭潭碳毯瘫檀痰袒坍覃忐昙郯澹钽锬",
  "ren": "人任认仁忍韧刃纫饪妊荏稔壬仞轫亻衽",
  "jie": "家结解价界接节她届介阶街借杰洁截姐揭捷劫戒皆竭桔诫楷秸睫藉拮芥诘碣嗟颉蚧孑婕疖桀讦疥偈羯袷哜喈卩鲒骱",
  "yan": "研严验演言眼烟沿延盐炎燕岩宴艳颜殷彦掩淹阎衍铅雁咽厌焰堰砚唁焉晏檐蜒奄俨腌妍谚兖筵焱偃闫嫣鄢湮赝胭琰滟阉魇酽郾恹崦芫剡鼹菸餍埏谳讠厣罨",
  "dang": "当党档荡挡宕砀铛裆凼菪谠",
  "tao": "套讨跳陶涛逃桃萄淘掏滔韬叨洮啕绦饕鼗",
  "tiao": "条调挑跳迢眺苕窕笤佻啁粜髫铫祧龆蜩鲦",
  "te": "特忑忒铽慝",
  "de": "的地得德底锝",
  "dei": "得",
  "di": "的地第提低底抵弟迪递帝敌堤蒂缔滴涤翟娣笛棣荻谛狄邸嘀砥坻诋嫡镝碲骶氐柢籴羝睇觌",
  "ti": "体提题弟替梯踢惕剔蹄棣啼屉剃涕锑倜悌逖嚏荑醍绨鹈缇裼",
  "tui": "推退弟腿褪颓蜕忒煺",
  "you": "有由又优游油友右邮尤忧幼犹诱悠幽佑釉柚铀鱿囿酉攸黝莠猷蝣疣呦蚴莸莜铕宥繇卣牖鼬尢蚰侑",
  "dian": "电点店典奠甸碘淀殿垫颠滇癫巅惦掂癜玷佃踮靛钿簟坫阽",
  "tian": "天田添填甜甸恬腆佃舔钿阗忝殄畋栝掭",
  "zhu": "主术住注助属逐宁著筑驻朱珠祝猪诸柱竹铸株瞩嘱贮煮烛苎褚蛛拄铢洙竺蛀渚伫杼侏澍诛茱箸炷躅翥潴邾槠舳橥丶瘃麈疰",
  "nian": "年念酿辗碾廿捻撵拈蔫鲶埝鲇辇黏",
  "diao": "调掉雕吊钓刁貂凋碉鲷叼铫铞",
  "yao": "要么约药邀摇耀腰遥姚窑瑶咬尧钥谣肴夭侥吆疟妖幺杳舀窕窈曜鹞爻繇徭轺铫鳐崾珧",
  "die": "跌叠蝶迭碟爹谍牒耋佚喋堞瓞鲽垤揲蹀",
  "she": "设社摄涉射折舍蛇拾舌奢慑赦赊佘麝歙畲厍猞揲滠",
  "ye": "业也夜叶射野液冶喝页爷耶邪咽椰烨掖拽曳晔谒腋噎揶靥邺铘揲",
  "xie": "些解协写血叶谢械鞋胁斜携懈契卸谐泄蟹邪歇泻屑挟燮榭蝎撷偕亵楔颉缬邂鲑瀣勰榍薤绁渫廨獬躞",
  "zhe": "这者着著浙折哲蔗遮辙辄柘锗褶蜇蛰鹧谪赭摺乇磔螫",
  "ding": "定订顶丁鼎盯钉锭叮仃铤町酊啶碇腚疔玎耵",
  "diu": "丢铥",
  "ting": "听庭停厅廷挺亭艇婷汀铤烃霆町蜓葶梃莛",
  "dong": "动东董冬洞懂冻栋侗咚峒氡恫胴硐垌鸫岽胨",
  "tong": "同通统童痛铜桶桐筒彤侗佟潼捅酮砼瞳恸峒仝嗵僮垌茼",
  "zhong": "中重种众终钟忠仲衷肿踵冢盅蚣忪锺舯螽夂",
  "dou": "都斗读豆抖兜陡逗窦渎蚪痘蔸钭篼",
  "du": "度都独督读毒渡杜堵赌睹肚镀渎笃竺嘟犊妒牍蠹椟黩芏髑",
  "duan": "断段短端锻缎煅椴簖",
  "dui": "对队追敦兑堆碓镦怼憝",
  "rui": "瑞兑锐睿芮蕊蕤蚋枘",
  "yue": "月说约越乐跃兑阅岳粤悦曰钥栎钺樾瀹龠哕刖",
  "tun": "吞屯囤褪豚臀饨暾氽",
  "hui": "会回挥汇惠辉恢徽绘毁慧灰贿卉悔秽溃荟晖彗讳诲珲堕诙蕙晦睢麾烩茴喙桧蛔洄浍虺恚蟪咴隳缋哕",
  "wu": "务物无五武午吴舞伍污乌误亡恶屋晤悟吾雾芜梧勿巫侮坞毋诬呜钨邬捂鹜兀婺妩於戊鹉浯蜈唔骛仵焐芴鋈庑鼯牾怃圬忤痦迕杌寤阢",
  "ya": "亚压雅牙押鸭呀轧涯崖邪芽哑讶鸦娅衙丫蚜碣垭伢氩桠琊揠吖睚痖疋迓岈砑",
  "he": "和合河何核盖贺喝赫荷盒鹤吓呵苛禾菏壑褐涸阂阖劾诃颌嗬貉曷翮纥盍",
  "wo": "我握窝沃卧挝涡斡渥幄蜗喔倭莴龌肟硪",
  "en": "恩摁蒽",
  "n": "嗯唔",
  "er": "而二尔儿耳迩饵洱贰铒珥佴鸸鲕",
  "fa": "发法罚乏伐阀筏砝垡珐",
  "quan": "全权券泉圈拳劝犬铨痊诠荃醛蜷颧绻犭筌鬈悛辁畎",
  "fei": "费非飞肥废菲肺啡沸匪斐蜚妃诽扉翡霏吠绯腓痱芾淝悱狒榧砩鲱篚镄",
  "pei": "配培坏赔佩陪沛裴胚妃霈淠旆帔呸醅辔锫",
  "ping": "平评凭瓶冯屏萍苹乒坪枰娉俜鲆",
  "fo": "佛",
  "hu": "和护许户核湖互乎呼胡戏忽虎沪糊壶葫狐蝴弧瑚浒鹄琥扈唬滹惚祜囫斛笏芴醐猢怙唿戽槲觳煳鹕冱瓠虍岵鹱烀轷",
  "ga": "夹咖嘎尬噶旮伽尕钆尜",
  "ge": "个合各革格歌哥盖隔割阁戈葛鸽搁胳舸疙铬骼蛤咯圪镉颌仡硌嗝鬲膈纥袼搿塥哿虼",
  "ha": "哈蛤铪",
  "xia": "下夏峡厦辖霞夹虾狭吓侠暇遐瞎匣瑕唬呷黠硖罅狎瘕柙",
  "gai": "改该盖概溉钙丐芥赅垓陔戤",
  "hai": "海还害孩亥咳骸骇氦嗨胲醢",
  "gan": "干感赶敢甘肝杆赣乾柑尴竿秆橄矸淦苷擀酐绀泔坩旰疳澉",
  "gang": "港钢刚岗纲冈杠缸扛肛罡戆筻",
  "jiang": "将强江港奖讲降疆蒋姜浆匠酱僵桨绛缰犟豇礓洚茳糨耩",
  "hang": "行航杭巷夯吭桁沆绗颃",
  "gong": "工公共供功红贡攻宫巩龚恭拱躬弓汞蚣珙觥肱廾",
  "hong": "红宏洪轰虹鸿弘哄烘泓訇蕻闳讧荭黉薨",
  "guang": "广光逛潢犷胱咣桄",
  "qiong": "穷琼穹邛茕筇跫蛩銎",
  "gao": "高告搞稿膏糕镐皋羔锆杲郜睾诰藁篙缟槁槔",
  "hao": "好号毫豪耗浩郝皓昊皋蒿壕灏嚎濠蚝貉颢嗥薅嚆",
  "li": "理力利立里李历例离励礼丽黎璃厉厘粒莉梨隶栗荔沥犁漓哩狸藜罹篱鲤砺吏澧俐骊溧砾莅锂笠蠡蛎痢雳俪傈醴栎郦俚枥喱逦娌鹂戾砬唳坜疠蜊黧猁鬲粝蓠呖跞疬缡鲡鳢嫠詈悝苈篥轹",
  "jia": "家加价假佳架甲嘉贾驾嫁夹稼钾挟拮迦伽颊浃枷戛荚痂颉镓笳珈岬胛袈郏葭袷瘕铗跏蛱恝哿",
  "luo": "落罗络洛逻螺锣骆萝裸漯烙摞骡咯箩珞捋荦硌雒椤镙跞瘰泺脶猡倮蠃",
  "ke": "可科克客刻课颗渴壳柯棵呵坷恪苛咳磕珂稞瞌溘轲窠嗑疴蝌岢铪颏髁蚵缂氪骒钶锞",
  "qia": "卡恰洽掐髂袷咭葜",
  "gei": "给",
  "gen": "根跟亘艮哏茛",
  "hen": "很狠恨痕哏",
  "gou": "构购够句沟狗钩拘勾苟垢枸篝佝媾诟岣彀缑笱鞲觏遘",
  "kou": "口扣寇叩抠佝蔻芤眍筘",
  "gu": "股古顾故固鼓骨估谷贾姑孤雇辜菇沽咕呱锢钴箍汩梏痼崮轱鸪牯蛊诂毂鹘菰罟嘏臌觚瞽蛄酤牿鲴",
  "pai": "牌排派拍迫徘湃俳哌蒎",
  "gua": "括挂瓜刮寡卦呱褂剐胍诖鸹栝呙",
  "tou": "投头透偷愉骰亠",
  "guai": "怪拐乖",
  "kuai": "会快块筷脍蒯侩浍郐蒉狯哙",
  "guan": "关管观馆官贯冠惯灌罐莞纶棺斡矜倌鹳鳏盥掼涫",
  "wan": "万完晚湾玩碗顽挽弯蔓丸莞皖宛婉腕蜿惋烷琬畹豌剜纨绾脘菀芄箢",
  "ne": "呢哪呐讷疒",
  "gui": "规贵归轨桂柜圭鬼硅瑰跪龟匮闺诡癸鳜桧皈鲑刽晷傀眭妫炅庋簋刿宄匦",
  "jun": "军均俊君峻菌竣钧骏龟浚隽郡筠皲麇捃",
  "jiong": "窘炯迥炅冂扃",
  "jue": "决绝角觉掘崛诀獗抉爵嚼倔厥蕨攫珏矍蹶谲镢鳜噱桷噘撅橛孓觖劂爝",
  "gun": "滚棍辊衮磙鲧绲丨",
  "hun": "婚混魂浑昏棍珲荤馄诨溷阍",
  "guo": "国过果郭锅裹帼涡椁囗蝈虢聒埚掴猓崞蜾呙馘",
  "hei": "黑嘿嗨",
  "kan": "看刊勘堪坎砍侃嵌槛瞰阚龛戡凵莰",
  "heng": "衡横恒亨哼珩桁蘅",
  "mo": "万没么模末冒莫摩墨默磨摸漠脉膜魔沫陌抹寞蘑摹蓦馍茉嘿谟秣蟆貉嫫镆殁耱嬷麽瘼貊貘",
  "peng": "鹏朋彭膨蓬碰苹棚捧亨烹篷澎抨硼怦砰嘭蟛堋",
  "hou": "后候厚侯猴喉吼逅篌糇骺後鲎瘊堠",
  "hua": "化华划话花画滑哗豁骅桦猾铧砉",
  "huai": "怀坏淮徊槐踝",
  "huan": "还环换欢患缓唤焕幻痪桓寰涣宦垸洹浣豢奂郇圜獾鲩鬟萑逭漶锾缳擐",
  "xun": "讯训迅孙寻询循旬巡汛勋逊熏徇浚殉驯鲟薰荀浔洵峋埙巽郇醺恂荨窨蕈曛獯",
  "huang": "黄荒煌皇凰慌晃潢谎惶簧璜恍幌湟蝗磺隍徨遑肓篁鳇蟥癀",
  "nai": "能乃奶耐奈鼐萘氖柰佴艿",
  "luan": "乱卵滦峦鸾栾銮挛孪脔娈",
  "qie": "切且契窃茄砌锲怯伽惬妾趄挈郄箧慊",
  "jian": "建间件见坚检健监减简艰践兼鉴键渐柬剑尖肩舰荐箭浅剪俭碱茧奸歼拣捡煎贱溅槛涧堑笺谏饯锏缄睑謇蹇腱菅翦戬毽笕犍硷鞯牮枧湔鲣囝裥踺搛缣鹣蒹谫僭戋趼楗",
  "nan": "南难男楠喃囡赧腩囝蝻",
  "qian": "前千钱签潜迁欠纤牵浅遣谦乾铅歉黔谴嵌倩钳茜虔堑钎骞阡掮钤扦芊犍荨仟芡悭缱佥愆褰凵肷岍搴箝慊椠",
  "qiang": "强抢疆墙枪腔锵呛羌蔷襁羟跄樯戕嫱戗炝镪锖蜣",
  "xiang": "向项相想乡象响香降像享箱羊祥湘详橡巷翔襄厢镶飨饷缃骧芗庠鲞葙蟓",
  "jiao": "教交较校角觉叫脚缴胶轿郊焦骄浇椒礁佼蕉娇矫搅绞酵剿嚼饺窖跤蛟侥狡姣皎茭峤铰醮鲛湫徼鹪僬噍艽挢敫",
  "zhuo": "着著缴桌卓捉琢灼浊酌拙茁涿镯淖啄濯焯倬擢斫棹诼浞禚",
  "qiao": "桥乔侨巧悄敲俏壳雀瞧翘窍峭锹撬荞跷樵憔鞘橇峤诮谯愀鞒硗劁缲",
  "xiao": "小效销消校晓笑肖削孝萧俏潇硝宵啸嚣霄淆哮筱逍姣箫骁枭哓绡蛸崤枵魈",
  "si": "司四思斯食私死似丝饲寺肆撕泗伺嗣祀厮驷嘶锶俟巳蛳咝耜笥纟糸鸶缌澌姒汜厶兕",
  "kai": "开凯慨岂楷恺揩锴铠忾垲剀锎蒈",
  "jin": "进金今近仅紧尽津斤禁锦劲晋谨筋巾浸襟靳瑾烬缙钅矜觐堇馑荩噤廑妗槿赆衿卺",
  "qin": "亲勤侵秦钦琴禽芹沁寝擒覃噙矜嗪揿溱芩衾廑锓吣檎螓",
  "jing": "经京精境竞景警竟井惊径静劲敬净镜睛晶颈荆兢靖泾憬鲸茎腈菁胫阱旌粳靓痉箐儆迳婧肼刭弪獍",
  "ying": "应营影英景迎映硬盈赢颖婴鹰荧莹樱瑛蝇萦莺颍膺缨瀛楹罂荥萤鹦滢蓥郢茔嘤璎嬴瘿媵撄潆",
  "jiu": "就究九酒久救旧纠舅灸疚揪咎韭玖臼柩赳鸠鹫厩啾阄桕僦鬏",
  "zui": "最罪嘴醉咀蕞觜",
  "juan": "卷捐圈眷娟倦绢隽镌涓鹃鄄蠲狷锩桊",
  "suan": "算酸蒜狻",
  "yun": "员运云允孕蕴韵酝耘晕匀芸陨纭郧筠恽韫郓氲殒愠昀菀狁",
  "qun": "群裙逡麇",
  "ka": "卡喀咖咔咯佧胩",
  "kang": "康抗扛慷炕亢糠伉钪闶",
  "keng": "坑铿吭",
  "kao": "考靠烤拷铐栲尻犒",
  "ken": "肯垦恳啃龈裉",
  "yin": "因引银印音饮阴隐姻殷淫尹荫吟瘾寅茵圻垠鄞湮蚓氤胤龈窨喑铟洇狺夤廴吲霪茚堙",
  "kong": "空控孔恐倥崆箜",
  "ku": "苦库哭酷裤枯窟挎骷堀绔刳喾",
  "kua": "跨夸垮挎胯侉",
  "kui": "亏奎愧魁馈溃匮葵窥盔逵睽馗聩喟夔篑岿喹揆隗傀暌跬蒉愦悝蝰",
  "kuan": "款宽髋",
  "kuang": "况矿框狂旷眶匡筐邝圹哐贶夼诳诓纩",
  "que": "确却缺雀鹊阙瘸榷炔阕悫",
  "kun": "困昆坤捆琨锟鲲醌髡悃阃",
  "kuo": "扩括阔廓蛞",
  "la": "拉落垃腊啦辣蜡喇剌旯砬邋瘌",
  "lai": "来莱赖睐徕籁涞赉濑癞崃疠铼",
  "lan": "兰览蓝篮栏岚烂滥缆揽澜拦懒榄斓婪阑褴罱啉谰镧漤",
  "lin": "林临邻赁琳磷淋麟霖鳞凛拎遴蔺吝粼嶙躏廪檩啉辚膦瞵懔",
  "lang": "浪朗郎廊狼琅榔螂阆锒莨啷蒗稂",
  "liang": "量两粮良辆亮梁凉谅粱晾靓踉莨椋魉墚",
  "lao": "老劳落络牢捞涝烙姥佬崂唠酪潦痨醪铑铹栳耢",
  "mu": "目模木亩幕母牧莫穆姆墓慕牟牡募睦缪沐暮拇姥钼苜仫毪坶",
  "le": "了乐勒肋叻鳓嘞仂泐",
  "lei": "类累雷勒泪蕾垒磊擂镭肋羸耒儡嫘缧酹嘞诔檑",
  "sui": "随岁虽碎尿隧遂髓穗绥隋邃睢祟濉燧谇眭荽",
  "lie": "列烈劣裂猎冽咧趔洌鬣埒捩躐",
  "leng": "冷愣棱楞塄",
  "ling": "领令另零灵龄陵岭凌玲铃菱棱伶羚苓聆翎泠瓴囹绫呤棂蛉酃鲮柃",
  "lia": "俩",
  "liao": "了料疗辽廖聊寥缪僚燎缭撂撩嘹潦镣寮蓼獠钌尥鹩",
  "liu": "流刘六留柳瘤硫溜碌浏榴琉馏遛鎏骝绺镏旒熘鹨锍",
  "lun": "论轮伦仑纶沦抡囵",
  "lv": "率律旅绿虑履吕铝屡氯缕滤侣驴榈闾偻褛捋膂稆",
  "lou": "楼露漏陋娄搂篓喽镂偻瘘髅耧蝼嵝蒌",
  "mao": "贸毛矛冒貌茂茅帽猫髦锚懋袤牦卯铆耄峁瑁蟊茆蝥旄泖昴瞀",
  "long": "龙隆弄垄笼拢聋陇胧珑窿茏咙砻垅泷栊癃",
  "nong": "农浓弄脓侬哝",
  "shuang": "双爽霜孀泷",
  "shu": "术书数属树输束述署朱熟殊蔬舒疏鼠淑叔暑枢墅俞曙抒竖蜀薯梳戍恕孰沭赎庶漱塾倏澍纾姝菽黍腧秫毹殳疋摅",
  "shuai": "率衰帅摔甩蟀",
  "lve": "略掠锊",
  "ma": "么马吗摩麻码妈玛嘛骂抹蚂唛蟆犸杩",
  "me": "么麽",
  "mai": "买卖麦迈脉埋霾荬劢",
  "man": "满慢曼漫埋蔓瞒蛮鳗馒幔谩螨熳缦镘颟墁鞔",
  "mi": "米密秘迷弥蜜谜觅靡泌眯麋猕谧咪糜宓汨醚嘧弭脒冖幂祢縻蘼芈糸敉",
  "men": "们门闷瞒汶扪焖懑鞔钔",
  "mang": "忙盲茫芒氓莽蟒邙硭漭",
  "meng": "蒙盟梦猛孟萌氓朦锰檬勐懵蟒蜢虻黾蠓艨甍艋瞢礞",
  "miao": "苗秒妙描庙瞄缪渺淼藐缈邈鹋杪眇喵",
  "mou": "某谋牟缪眸哞鍪蛑侔厶",
  "miu": "缪谬",
  "mei": "美没每煤梅媒枚妹眉魅霉昧媚玫酶镁湄寐莓袂楣糜嵋镅浼猸鹛",
  "wen": "文问闻稳温纹吻蚊雯紊瘟汶韫刎璺玟阌",
  "mie": "灭蔑篾乜咩蠛",
  "ming": "明名命鸣铭冥茗溟酩瞑螟暝",
  "na": "内南那纳拿哪娜钠呐捺衲镎肭",
  "nei": "内那哪馁",
  "nuo": "难诺挪娜糯懦傩喏搦锘",
  "ruo": "若弱偌箬",
  "nang": "囊馕囔曩攮",
  "nao": "脑闹恼挠瑙淖孬垴铙桡呶硇猱蛲",
  "ni": "你尼呢泥疑拟逆倪妮腻匿霓溺旎昵坭铌鲵伲怩睨猊",
  "nen": "嫩恁",
  "neng": "能",
  "nin": "您恁",
  "niao": "鸟尿溺袅脲茑嬲",
  "nie": "摄聂捏涅镍孽捻蘖啮蹑嗫臬镊颞乜陧",
  "niang": "娘酿",
  "ning": "宁凝拧泞柠咛狞佞聍甯",
  "nu": "努怒奴弩驽帑孥胬",
  "nv": "女钕衄恧",
  "ru": "入如女乳儒辱汝茹褥孺濡蠕嚅缛溽铷洳薷襦颥蓐",
  "nuan": "暖",
  "nve": "虐疟",
  "re": "热若惹喏",
  "ou": "区欧偶殴呕禺藕讴鸥瓯沤耦怄",
  "pao": "跑炮泡抛刨袍咆疱庖狍匏脬",
  "pou": "剖掊裒",
  "pen": "喷盆湓",
  "pie": "瞥撇苤氕丿",
  "pin": "品贫聘频拼拚颦姘嫔榀牝",
  "se": "色塞瑟涩啬穑铯槭",
  "qing": "情青清请亲轻庆倾顷卿晴氢擎氰罄磬蜻箐鲭綮苘黥圊檠謦",
  "zan": "赞暂攒堑昝簪糌瓒錾趱拶",
  "shao": "少绍召烧稍邵哨韶捎勺梢鞘芍苕劭艄筲杓潲",
  "sao": "扫骚嫂梢缫搔瘙臊埽缲鳋",
  "sha": "沙厦杀纱砂啥莎刹杉傻煞鲨霎嗄痧裟挲铩唼歃",
  "xuan": "县选宣券旋悬轩喧玄绚渲璇炫萱癣漩眩暄煊铉楦泫谖痃碹揎镟儇",
  "ran": "然染燃冉苒髯蚺",
  "rang": "让壤攘嚷瓤穰禳",
  "rao": "绕扰饶娆桡荛",
  "reng": "仍扔",
  "ri": "日",
  "rou": "肉柔揉糅鞣蹂",
  "ruan": "软阮朊",
  "run": "润闰",
  "sa": "萨洒撒飒卅仨脎",
  "suo": "所些索缩锁莎梭琐嗦唆唢娑蓑羧挲桫嗍睃",
  "sai": "思赛塞腮噻鳃",
  "shui": "说水税谁睡氵",
  "sang": "桑丧嗓搡颡磉",
  "sen": "森",
  "seng": "僧",
  "shai": "筛晒",
  "shang": "上商尚伤赏汤裳墒晌垧觞殇熵绱",
  "xing": "行省星腥猩惺兴刑型形邢饧醒幸杏性姓陉荇荥擤悻硎",
  "shou": "收手受首售授守寿瘦兽狩绶艏扌",
  "shuo": "说数硕烁朔铄妁槊蒴搠",
  "su": "速素苏诉缩塑肃俗宿粟溯酥夙愫簌稣僳谡涑蔌嗉觫",
  "shua": "刷耍唰",
  "shuan": "栓拴涮闩",
  "shun": "顺瞬舜吮",
  "song": "送松宋讼颂耸诵嵩淞怂悚崧凇忪竦菘",
  "sou": "艘搜擞嗽嗖叟馊薮飕嗾溲锼螋瞍",
  "sun": "损孙笋荪榫隼狲飧",
  "teng": "腾疼藤滕誊",
  "tie": "铁贴帖餮萜",
  "tu": "土突图途徒涂吐屠兔秃凸荼钍菟堍酴",
  "wai": "外歪崴",
  "wang": "王望往网忘亡旺汪枉妄惘罔辋魍",
  "weng": "翁嗡瓮蓊蕹",
  "zhua": "抓挝爪",
  "yang": "样养央阳洋扬杨羊详氧仰秧痒漾疡泱殃恙鸯徉佯怏炀烊鞅蛘",
  "xiong": "雄兄熊胸凶匈汹芎",
  "yo": "哟唷",
  "yong": "用永拥勇涌泳庸俑踊佣咏雍甬镛臃邕蛹恿慵壅痈鳙墉饔喁",
  "za": "杂扎咱砸咋匝咂拶",
  "zai": "在再灾载栽仔宰哉崽甾",
  "zao": "造早遭枣噪灶燥糟凿躁藻皂澡蚤唣",
  "zei": "贼",
  "zen": "怎谮",
  "zeng": "增曾综赠憎锃甑罾缯",
  "zhei": "这",
  "zou": "走邹奏揍诹驺陬楱鄹鲰",
  "zhuai": "转拽",
  "zun": "尊遵鳟樽撙",
  "dia": "嗲",
  "nou": "耨"
};

function SvgDrag(props) {
  return React.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    width: "28",
    height: "29.526",
    viewBox: "0 0 28 29.526"
  }, props), React.createElement("g", {
    id: "drag",
    transform: "translate(-1623.5 -915.5)"
  }, React.createElement("line", {
    y2: "22.015",
    transform: "translate(1637.049 919.566)",
    strokeLinecap: "round",
    strokeMiterlimit: "10",
    strokeWidth: "3"
  }), React.createElement("line", {
    x1: "22.015",
    transform: "translate(1626.041 930.574)",
    strokeLinecap: "round",
    strokeMiterlimit: "10",
    strokeWidth: "3"
  }), React.createElement("path", {
    d: "M728.456,559.625l3.888-3.887,3.885,3.885",
    transform: "translate(904.603 361.262)",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "3"
  }), React.createElement("path", {
    d: "M736.229,568.465l-3.888,3.888-3.885-3.885",
    transform: "translate(904.603 371.172)",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "3"
  }), React.createElement("path", {
    d: "M735.8,561.184l3.888,3.888-3.885,3.885",
    transform: "translate(910.317 365.503)",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "3"
  }), React.createElement("path", {
    d: "M727.813,568.957l-3.888-3.888,3.885-3.885",
    transform: "translate(901.075 365.503)",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "3"
  })));
}

/**
 * @description 句柄拖拽事件
 * @param {HTMLElement} target
 */

function handleDragEvent(target) {
  var targetParent = target.parentNode; // PC端

  target.onmousedown = function (event) {
    //算出鼠标相对元素的位置
    var disX = event.clientX - targetParent.offsetLeft;
    var disY = event.clientY - targetParent.offsetTop;

    document.onmousemove = function (evt) {
      //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
      var left = evt.clientX - disX;
      var top = evt.clientY - disY; //移动当前元素

      targetParent.style.left = left + 'px';
      targetParent.style.top = top + 'px';
    };

    document.onmouseup = function () {
      useEventEmitter.emit('updateBound');
      document.onmousemove = null;
      document.onmouseup = null;
    };
  }; // 兼容移动端


  target.ontouchstart = function (event) {
    //算出鼠标相对元素的位置
    var clientX = event.touches[0].pageX;
    var clientY = event.touches[0].pageY;
    var disX = clientX - targetParent.offsetLeft;
    var disY = clientY - targetParent.offsetTop;

    document.ontouchmove = function (evt) {
      var clientX = evt.touches[0].pageX;
      var clientY = evt.touches[0].pageY; //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置

      var left = clientX - disX;
      var top = clientY - disY; //移动当前元素

      targetParent.style.left = left + 'px';
      targetParent.style.top = top + 'px';
    };

    document.ontouchend = function () {
      useEventEmitter.emit('updateBound');
      document.ontouchmove = null;
      document.ontouchend = null;
    };
  };
}

var DragHandle = /*#__PURE__*/React.memo(function (props) {
  React.useEffect(function () {
    // 执行拖拽事件
    if (document.querySelector('.key-board-drag-handle')) {
      var dragHandle = document.querySelector('.key-board-drag-handle'); // 注册拖拽

      handleDragEvent(dragHandle);
    }
  }, []);
  return React__default.createElement("div", {
    className: "key-board-drag-handle",
    style: {
      color: props.color
    }
  }, React__default.createElement("span", null, props.dargHandleText), React__default.createElement(SvgDrag, {
    fill: "none",
    stroke: props.color
  }));
});

// 符号键盘字符
var SYMBOL_CODE = {
  line1: ['[', ']', '{', '}', '+', '-', '*', '/', '%', '='],
  line2: ['_', '—', '|', '~', '^', '《', '》', '$', '&'],
  line3: ['#+=', '……', ',', '?', '!', '.', '’', '\'', "delete"]
}; // 默认键盘字符

var DEFAULT_CODE = {
  line1: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  line2: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  line3: ['upper', 'z', 'x', 'c', 'v', 'b', 'n', 'm', "delete"]
}; // 数字键盘字符

var NUMBER_CODE = {
  line1: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  line2: ['-', '/', ':', '(', ')', '¥', '@', '“', '”'],
  line3: ['#+=', '。', '，', '、', '？', '！', '.', ';', "delete"]
};

var defaultLineList = [{
  data: '.?123',
  type: 'change2num'
}, {
  data: '',
  type: 'change2lang'
}, {
  data: ' ',
  type: 'space'
}, {
  data: '',
  type: 'close'
}]; // 上一次存的val值

var oldVal = '';

var DefaultBoard = function DefaultBoard(props, ref) {
  var translate = props.translate,
      trigger = props.trigger,
      change = props.change;

  var _useContext = React.useContext(KeyBoardContext),
      modeList = _useContext.modeList,
      handApi = _useContext.handApi,
      closeKeyBoard = _useContext.closeKeyBoard; // 键盘列表


  var _useState = React.useState([DEFAULT_CODE.line1, DEFAULT_CODE.line2, DEFAULT_CODE.line3]),
      lineList = _useState[0],
      setLineList = _useState[1]; // 第四行变动的键码


  var _useState2 = React.useState([]),
      line4 = _useState2[0],
      setLine4 = _useState2[1]; // 大小写


  var _useState3 = React.useState(false),
      isUpper = _useState3[0],
      setUpperStatus = _useState3[1]; // 是否显示符号键盘


  var _useState4 = React.useState(false),
      isSymbol = _useState4[0],
      setSymbolStatus = _useState4[1]; // 是否显示数字键盘


  var _useState5 = React.useState(false),
      isNum = _useState5[0],
      setNumberStatus = _useState5[1]; // 中英文模式


  var _useState6 = React.useState(true),
      isCn = _useState6[0],
      setLanStatus = _useState6[1];

  React.useEffect(function () {
    setLine4(JSON.parse(JSON.stringify(defaultLineList))); // 判定是否存在手写

    if (modeList.find(function (mode) {
      return mode === 'handwrite';
    }) && handApi) {
      setLine4(function (dataSource) {
        dataSource.splice(2, 0, {
          data: '',
          type: 'handwrite'
        });
        return dataSource;
      });
    } // 清空上一次储存的值


    useEventEmitter.on('resultReset', function () {
      oldVal = '';
    });
  }, []); // 暴露给父组件的子组件方法

  React.useImperativeHandle(ref, function () {
    return {
      keyButtonTrigger: function keyButtonTrigger(parmas) {
        keyButtonClick(parmas);
      }
    };
  });
  /**
   * @description 按钮点击事件
   * @param {IKeyCode} { data, type }
   */

  function keyButtonClick(_ref) {
    var data = _ref.data,
        type = _ref.type;

    switch (type) {
      //  关闭
      case 'close':
        {
          oldVal = '';
          closeKeyBoard();
        }
        break;
      //  大小写

      case 'upper':
        {
          oldVal = '';
          setUpperStatus(!isUpper);
        }
        break;
      //   语言

      case 'change2lang':
        {
          var status = !isCn;
          setLanStatus(status); // 默认键盘状态下

          if (!isNum && !isSymbol) {
            useEventEmitter.emit('keyBoardChange', status ? 'CN' : 'EN');
          }
        }
        break;
      //  数字键盘

      case 'change2num':
        {
          var _status = !isNum;

          setNumberStatus(_status);
          setSymbolStatus(false);

          if (_status) {
            useEventEmitter.emit('keyBoardChange', 'number');
            var numberCodeLine3List = JSON.parse(JSON.stringify(NUMBER_CODE.line3));

            if (!modeList.find(function (mode) {
              return mode === 'symbol';
            })) {
              numberCodeLine3List.shift();
              numberCodeLine3List.unshift('+');
            }

            setLineList([NUMBER_CODE.line1, NUMBER_CODE.line2, numberCodeLine3List]);
          } else {
            useEventEmitter.emit('keyBoardChange', isCn ? 'CN' : 'EN');
            setLineList([DEFAULT_CODE.line1, DEFAULT_CODE.line2, DEFAULT_CODE.line3]);
          }
        }
        break;
      // 切换符号显示

      case '#+=':
        {
          var _status2 = !isSymbol;

          setSymbolStatus(!isSymbol);

          if (_status2) {
            useEventEmitter.emit('keyBoardChange', 'symbol');
            setLineList([SYMBOL_CODE.line1, SYMBOL_CODE.line2, SYMBOL_CODE.line3]);
          } else {
            useEventEmitter.emit('keyBoardChange', 'number');
            setLineList([NUMBER_CODE.line1, NUMBER_CODE.line2, NUMBER_CODE.line3]);
          }
        }
        break;
      // 切换手写板以及删除

      case 'handwrite':
      case 'delete':
        {
          // 如果是中文模式只删存好的字段
          if (isCn && type === 'delete' && oldVal) {
            oldVal = oldVal.substr(0, oldVal.length - 1);
            translate(oldVal);
          } else {
            if (type === 'handwrite') {
              useEventEmitter.emit('keyBoardChange', 'handwrite');
            }

            trigger({
              data: data,
              type: type
            });
          }
        }
        break;
      // 默认

      default:
        {
          // 中文需要转
          if (isCn && !isNum && !isSymbol) {
            translate(oldVal + data);
            oldVal = oldVal + data;
          } else {
            // 英文直接输出
            change(data);
          }
        }
        break;
    }
  }

  return React__default.createElement("div", {
    className: "default-key-board"
  }, lineList.map(function (line, index) {
    return React__default.createElement("div", {
      className: classNames('line', "line" + (index + 1)),
      key: index
    }, line.map(function (key) {
      return React__default.createElement(KeyCodeButton, {
        isUpper: isUpper,
        key: key,
        type: key,
        data: key,
        isSymbol: isSymbol,
        click: keyButtonClick
      });
    }));
  }), React__default.createElement("div", {
    className: "line line4"
  }, line4.map(function (key, index) {
    return React__default.createElement(KeyCodeButton, {
      key: index,
      type: key.type,
      data: key.data,
      isCn: isCn,
      isNum: isNum,
      click: keyButtonClick
    });
  })));
};

var DefaultBoard$1 = /*#__PURE__*/React.forwardRef(DefaultBoard);

var inputList = []; // 当前触发的input

var currentInput = null;

var KeyBoard = function KeyBoard(_ref, ref) {
  var _ref$autoChange = _ref.autoChange,
      autoChange = _ref$autoChange === void 0 ? true : _ref$autoChange,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? '#eaa050' : _ref$color,
      _ref$modeList = _ref.modeList,
      modeList = _ref$modeList === void 0 ? ['handwrite', 'symbol'] : _ref$modeList,
      _ref$blurHide = _ref.blurHide,
      blurHide = _ref$blurHide === void 0 ? true : _ref$blurHide,
      _ref$showHandleBar = _ref.showHandleBar,
      showHandleBar = _ref$showHandleBar === void 0 ? true : _ref$showHandleBar,
      _ref$closeOnClickModa = _ref.closeOnClickModal,
      closeOnClickModal = _ref$closeOnClickModa === void 0 ? true : _ref$closeOnClickModa,
      _ref$dargHandleText = _ref.dargHandleText,
      dargHandleText = _ref$dargHandleText === void 0 ? '将键盘拖到您喜欢的位置' : _ref$dargHandleText,
      _ref$animateClass = _ref.animateClass,
      animateClass = _ref$animateClass === void 0 ? 'move-bottom-to-top' : _ref$animateClass,
      _ref$transitionTime = _ref.transitionTime,
      transitionTime = _ref$transitionTime === void 0 ? 300 : _ref$transitionTime,
      handApi = _ref.handApi,
      modal = _ref.modal,
      keyChange = _ref.keyChange,
      onChange = _ref.onChange,
      closed = _ref.closed,
      modalClick = _ref.modalClick;

  // 键盘显隐控制
  var _useState = React.useState(false),
      keyBoardVisible = _useState[0],
      setKeyBoardVisible = _useState[1]; // 键盘展示模式


  var _useState2 = React.useState('default'),
      keyBoardMode = _useState2[0],
      setKeyBoardShowMode = _useState2[1]; // 中文模式下显示字符


  var _useState3 = React.useState({}),
      resultVal = _useState3[0],
      setResultVal = _useState3[1]; // 默认键盘的ref


  var defaultRef = React.useRef(); // 键盘组件初始化准备

  React.useEffect(function () {
    modal && addMoDal(); // 注册键盘

    signUpKeyboard();
    useEventEmitter.on('resultReset', function () {
      setResultVal({});
    }); // destory hook

    return function () {
      var _document$querySelect;

      (_document$querySelect = document.querySelector('.key-board-modal')) == null ? void 0 : _document$querySelect.removeEventListener('click', modalTrigger);
      inputList.forEach(function (input) {
        input.removeEventListener('focus', showKeyBoard);
        input.removeEventListener('blur', hideKeyBoard);
      });
    };
  }, []); // 暴露给父组件的子组件方法

  React.useImperativeHandle(ref, function () {
    return {
      // 重新给键盘注册输入框
      reSignUp: function reSignUp() {
        signUpKeyboard();
      }
    };
  });
  /**
   * @description 新增modal
   */

  function addMoDal() {
    var _document$querySelect3;

    // 如果modal存在的话继续绑定事件 - 此处解决多路由页面切换时造成的bug
    if (document.querySelector('.key-board-modal')) {
      var _document$querySelect2;

      (_document$querySelect2 = document.querySelector('.key-board-modal')) == null ? void 0 : _document$querySelect2.addEventListener('click', modalTrigger);
      return;
    } // 如果不存在modal则创建一个modal遮罩层


    var modalDom = document.createElement('div');
    modalDom.className = 'key-board-modal';
    modalDom.style.display = 'none';
    (_document$querySelect3 = document.querySelector('body')) == null ? void 0 : _document$querySelect3.appendChild(modalDom);
    modalDom.addEventListener('click', modalTrigger);
  }
  /**
   * @description 点击遮罩层
   */


  function modalTrigger() {
    // 如果点击遮罩层允许关闭则触发键盘隐藏事件
    closeOnClickModal && hideKeyBoard();

    if (modalClick) {
      modalClick();
    }
  }
  /**
   * @description 注册键盘
   */


  function signUpKeyboard() {
    // 设置baseUrl
    handApi && axiosConfig(handApi); // 给键盘绑定相应input

    document.querySelectorAll('input').forEach(function (input) {
      // 存在data-mode属性的可以注册为键盘input
      if (input.getAttribute('data-mode') !== null) {
        inputList.push(input);
        input.addEventListener('focus', showKeyBoard);
        blurHide && input.addEventListener('blur', hideKeyBoard);
      }
    });
  }
  /**
   * @description 显示键盘
   */


  function showKeyBoard(event) {
    // 显示键盘
    setKeyBoardVisible(true); // 赋值当前事件触发的input

    currentInput = event.target; // 设置默认的键盘显示模式

    setDefaultKeyBoardMode(currentInput.getAttribute('data-mode')); // 显示遮罩层

    if (document.querySelector('.key-board-modal')) {
      var keyBoardModal = document.querySelector('.key-board-modal');
      keyBoardModal.style.display = 'block';
    }
  }
  /**
   * @description 关闭键盘
   */


  function hideKeyBoard() {
    // 输入框触发blur
    currentInput && currentInput.blur();
    currentInput = null;
    setKeyBoardVisible(false); // 如果存在关闭钩子函数则触发

    closed && closed(); // 重置显示mode

    setKeyBoardShowMode('default'); // 重置中文模式下显示字符

    setResultVal({}); // 隐藏遮罩层

    if (document.querySelector('.key-board-modal')) {
      var keyBoardModal = document.querySelector('.key-board-modal');
      keyBoardModal.style.display = 'none';
    }
  }
  /**
   * @description 设置初始化键盘模式
   */


  function setDefaultKeyBoardMode(mode) {
    var _defaultRef$current, _defaultRef$current2;

    useEventEmitter.emit('keyBoardChange', 'CN');

    switch (mode) {
      // 英文键盘
      case 'en':
        setKeyBoardShowMode('default');
        (_defaultRef$current = defaultRef.current) == null ? void 0 : _defaultRef$current.keyButtonTrigger({
          data: '',
          type: 'change2lang'
        });
        break;
      // 数字键盘

      case 'number':
        setKeyBoardShowMode('default');
        (_defaultRef$current2 = defaultRef.current) == null ? void 0 : _defaultRef$current2.keyButtonTrigger({
          data: '.?123',
          type: 'change2num'
        });
        break;
      // 手写键盘

      case 'handwrite':
        if (modeList != null && modeList.find(function (mode) {
          return mode === 'handwrite';
        }) && handApi) {
          setKeyBoardShowMode('handwrite');
          useEventEmitter.emit('keyBoardChange', 'handwrite');
        } else {
          setKeyBoardShowMode('default');
        }

        break;
      // 标点键盘

      case 'symbol':
        setKeyBoardShowMode('default'); // 如果存在标点键盘才允许切换

        if (modeList != null && modeList.find(function (mode) {
          return mode === 'symbol';
        })) {
          var _defaultRef$current3, _defaultRef$current4;

          (_defaultRef$current3 = defaultRef.current) == null ? void 0 : _defaultRef$current3.keyButtonTrigger({
            data: '.?123',
            type: 'change2num'
          });
          (_defaultRef$current4 = defaultRef.current) == null ? void 0 : _defaultRef$current4.keyButtonTrigger({
            data: '#+=',
            type: '#+='
          });
        }

        break;
      // 默认

      default:
        setKeyBoardShowMode('default');
        break;
    }
  }
  /**
   * @description 模式切换
   * @param {IKeyCode} {type}
   */


  function trigger(_ref2) {
    var type = _ref2.type;

    switch (type) {
      case 'handwrite':
        {
          setKeyBoardShowMode('handwrite');
        }
        break;

      case 'delete':
        {
          if (!currentInput) return;
          var changeValue = currentInput.value.substr(0, currentInput.value.length - 1); // 自动改变

          if (autoChange) {
            currentInput.value = changeValue;
          } // 触发change事件


          onChange && onChange(changeValue);
        }
        break;
    }
  }
  /**
   * @description 文字改变
   * @param {string} value
   */


  function change(value) {
    if (!currentInput) return;
    var changeValue = currentInput.value + value; // 自动改变

    if (autoChange) {
      currentInput.value = changeValue;
    }

    onChange && onChange(changeValue);
    keyChange && keyChange(value);
  }
  /**
   * @description 拼音转中文
   * @param {string} value
   */


  function translate(value) {
    var reg = new RegExp("^" + value + "\\w*");
    var keys = Object.keys(pinYinNote).filter(function (key) {
      return reg.test(key);
    }).sort();
    setResultVal({
      code: value,
      value: value ? keys.length > 1 ? keys.reduce(function (a, b) {
        return a + pinYinNote[b];
      }, '') : pinYinNote[keys[0]] : ''
    });
    keyChange && keyChange(value);
  }

  return React__default.createElement(reactTransitionGroup.CSSTransition, {
    in: keyBoardVisible,
    classNames: classNames(animateClass),
    timeout: transitionTime,
    unmountOnExit: true
  }, React__default.createElement(KeyBoardProvide, {
    value: {
      color: color,
      handApi: handApi,
      modeList: modeList,
      transitionTime: transitionTime,
      closeKeyBoard: function closeKeyBoard() {
        hideKeyBoard();
      },
      changeDefaultBoard: function changeDefaultBoard() {
        setKeyBoardShowMode('default');
        useEventEmitter.emit('resultReset');
      }
    }
  }, React__default.createElement("div", {
    className: "key-board",
    onMouseDown: function onMouseDown(event) {
      event.preventDefault();
    }
  }, React__default.createElement("div", {
    className: "key-board-container"
  }, React__default.createElement(Result, {
    resultVal: resultVal,
    change: change
  }), React__default.createElement("div", {
    className: "key-board-area"
  }, keyBoardMode === 'default' && React__default.createElement(DefaultBoard$1, {
    ref: defaultRef,
    translate: translate,
    change: change,
    trigger: trigger
  }), keyBoardMode === 'handwrite' && React__default.createElement(HandBoard$1, {
    trigger: trigger
  }))), showHandleBar && React__default.createElement(DragHandle, {
    color: color,
    dargHandleText: dargHandleText
  }))));
};

var index = /*#__PURE__*/React.forwardRef(KeyBoard);

exports.default = index;
