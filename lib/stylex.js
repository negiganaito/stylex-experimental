'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__monkey_patch__ = __monkey_patch__;
exports.keyframes = exports.inject = exports.include = exports.firstThatWorks = exports.defineVars = exports.default = exports.createTheme = exports.create = void 0;
exports.props = props;
exports.types = exports.stylex = void 0;
var _stylexInject = _interopRequireDefault(require("./stylex-inject"));
var _styleq = require("styleq");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function props() {
  const options = this;
  for (var _len = arguments.length, styles = new Array(_len), _key = 0; _key < _len; _key++) {
    styles[_key] = arguments[_key];
  }
  if (__implementations.props) {
    return __implementations.props.call(options, styles);
  }
  const [className, style] = (0, _styleq.styleq)(styles);
  const result = {};
  if (className != null && className !== '') {
    result.className = className;
  }
  if (style != null && Object.keys(style).length > 0) {
    result.style = style;
  }
  return result;
}
function stylexCreate(styles) {
  if (__implementations.create != null) {
    const create = __implementations.create;
    return create(styles);
  }
  throw new Error('stylex.create should never be called. It should be compiled away.');
}
function stylexDefineVars(styles) {
  if (__implementations.defineVars) {
    return __implementations.defineVars(styles);
  }
  throw new Error('stylex.defineVars should never be called. It should be compiled away.');
}
const stylexCreateTheme = (baseTokens, overrides) => {
  if (__implementations.createTheme) {
    return __implementations.createTheme(baseTokens, overrides);
  }
  throw new Error('stylex.createTheme should never be called. It should be compiled away.');
};
const stylexInclude = styles => {
  if (__implementations.include) {
    return __implementations.include(styles);
  }
  throw new Error('stylex.extends should never be called. It should be compiled away.');
};
const create = exports.create = stylexCreate;
const defineVars = exports.defineVars = stylexDefineVars;
const createTheme = exports.createTheme = stylexCreateTheme;
const include = exports.include = stylexInclude;
const types = exports.types = {
  angle: _v => {
    throw new Error(errorForType('angle'));
  },
  color: _v => {
    throw new Error(errorForType('color'));
  },
  url: _v => {
    throw new Error(errorForType('url'));
  },
  image: _v => {
    throw new Error(errorForType('image'));
  },
  integer: _v => {
    throw new Error(errorForType('integer'));
  },
  lengthPercentage: _v => {
    throw new Error(errorForType('lengthPercentage'));
  },
  length: _v => {
    throw new Error(errorForType('length'));
  },
  percentage: _v => {
    throw new Error(errorForType('percentage'));
  },
  number: _v => {
    throw new Error(errorForType('number'));
  },
  resolution: _v => {
    throw new Error(errorForType('resolution'));
  },
  time: _v => {
    throw new Error(errorForType('time'));
  },
  transformFunction: _v => {
    throw new Error(errorForType('transformFunction'));
  },
  transformList: _v => {
    throw new Error(errorForType('transformList'));
  }
};
const errorForType = type => `stylex.types.${type} should be compiled away by @stylexjs/babel-plugin`;
const keyframes = keyframes => {
  if (__implementations.keyframes) {
    return __implementations.keyframes(keyframes);
  }
  throw new Error('stylex.keyframes should never be called');
};
exports.keyframes = keyframes;
const firstThatWorks = function () {
  if (__implementations.firstThatWorks) {
    return __implementations.firstThatWorks(...arguments);
  }
  throw new Error('stylex.firstThatWorks should never be called.');
};
exports.firstThatWorks = firstThatWorks;
const inject = exports.inject = _stylexInject.default;
function _stylex() {
  for (var _len2 = arguments.length, styles = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    styles[_key2] = arguments[_key2];
  }
  const [className] = (0, _styleq.styleq)(styles);
  return className;
}
_stylex.props = props;
_stylex.create = create;
_stylex.defineVars = defineVars;
_stylex.createTheme = createTheme;
_stylex.include = include;
_stylex.keyframes = keyframes;
_stylex.firstThatWorks = firstThatWorks;
_stylex.inject = inject;
_stylex.types = types;
const __implementations = {};
function __monkey_patch__(key, implementation) {
  if (key === 'types') {
    Object.assign(types, implementation);
  } else {
    __implementations[key] = implementation;
  }
}
const stylex = exports.stylex = _stylex;
var _default = exports.default = _stylex;