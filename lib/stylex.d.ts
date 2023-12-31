/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import type {
  Keyframes,
  Stylex$Create,
  StyleX$DefineVars,
  StyleX$CreateTheme,
  StyleXArray,
  CompiledStyles,
  InlineStyles,
  StyleXClassNameFor,
} from './StyleXTypes';
export type {
  VarGroup,
  Theme,
  StyleXStyles,
  StyleXStylesWithout,
  StaticStyles,
  StaticStylesWithout,
} from './StyleXTypes';
import injectStyle from './stylex-inject';
export declare function props(
  this: null | undefined | unknown,
  ...styles: ReadonlyArray<
    StyleXArray<
      | (null | undefined | CompiledStyles)
      | boolean
      | Readonly<[CompiledStyles, InlineStyles]>
    >
  >
): Readonly<{
  className?: string;
  style?: Readonly<{ [$$Key$$: string]: string | number }>;
}>;
type Stylex$Include = <
  TStyles extends {
    readonly [$$Key$$: string]: StyleXClassNameFor<string, unknown>;
  },
>(
  styles: TStyles,
) => {
  readonly [Key in keyof TStyles]: TStyles[Key] extends StyleXClassNameFor<
    unknown,
    infer V
  >
    ? V
    : string;
};
export declare const create: Stylex$Create;
export declare const defineVars: StyleX$DefineVars;
export declare const createTheme: StyleX$CreateTheme;
export declare const include: Stylex$Include;
type ValueWithDefault<T> =
  | T
  | Readonly<{
      readonly default: T;
      readonly [$$Key$$: string]: ValueWithDefault<T>;
    }>;
type CSSSyntax =
  | '*'
  | '<length>'
  | '<number>'
  | '<percentage>'
  | '<length-percentage>'
  | '<color>'
  | '<image>'
  | '<url>'
  | '<integer>'
  | '<angle>'
  | '<time>'
  | '<resolution>'
  | '<transform-function>'
  | '<custom-ident>'
  | '<transform-list>';
type CSSSyntaxType = CSSSyntax | ReadonlyArray<CSSSyntax>;
interface ICSSType<T extends string | number> {
  readonly value: ValueWithDefault<T>;
  readonly syntax: CSSSyntaxType;
}
export declare const types: {
  angle: <T extends number | string>(_v: ValueWithDefault<T>) => ICSSType<T>;
  color: <T extends number | string>(_v: ValueWithDefault<T>) => ICSSType<T>;
  url: <T extends number | string>(_v: ValueWithDefault<T>) => ICSSType<T>;
  image: <T extends number | string>(_v: ValueWithDefault<T>) => ICSSType<T>;
  integer: <T extends number | string>(_v: ValueWithDefault<T>) => ICSSType<T>;
  lengthPercentage: <T extends number | string>(
    _v: ValueWithDefault<T>,
  ) => ICSSType<T>;
  length: <T extends number | string>(_v: ValueWithDefault<T>) => ICSSType<T>;
  percentage: <T extends number | string>(
    _v: ValueWithDefault<T>,
  ) => ICSSType<T>;
  number: <T extends number | string>(_v: ValueWithDefault<T>) => ICSSType<T>;
  resolution: <T extends number | string>(
    _v: ValueWithDefault<T>,
  ) => ICSSType<T>;
  time: <T extends number | string>(_v: ValueWithDefault<T>) => ICSSType<T>;
  transformFunction: <T extends number | string>(
    _v: ValueWithDefault<T>,
  ) => ICSSType<T>;
  transformList: <T extends number | string>(
    _v: ValueWithDefault<T>,
  ) => ICSSType<T>;
};
export declare const keyframes: (keyframes: Keyframes) => string;
export declare const firstThatWorks: <T extends string | number>(
  ...styles: ReadonlyArray<T>
) => ReadonlyArray<T>;
export declare const inject: typeof injectStyle;
type IStyleX = {
  (
    ...styles: ReadonlyArray<
      StyleXArray<(null | undefined | CompiledStyles) | boolean>
    >
  ): string;
  props: (
    this: null | undefined | unknown,
    ...styles: ReadonlyArray<
      StyleXArray<
        | (null | undefined | CompiledStyles)
        | boolean
        | Readonly<[CompiledStyles, InlineStyles]>
      >
    >
  ) => Readonly<{
    className?: string;
    style?: Readonly<{ [$$Key$$: string]: string | number }>;
  }>;
  create: Stylex$Create;
  defineVars: StyleX$DefineVars;
  createTheme: StyleX$CreateTheme;
  include: Stylex$Include;
  types: typeof types;
  firstThatWorks: <T extends string | number>(
    ...v: ReadonlyArray<T>
  ) => ReadonlyArray<T>;
  inject: (
    ltrRule: string,
    priority: number,
    rtlRule: null | undefined | string,
  ) => void;
  keyframes: (keyframes: Keyframes) => string;
  __customProperties?: { [$$Key$$: string]: unknown };
};
export declare const stylex: IStyleX;
declare const $$EXPORT_DEFAULT_DECLARATION$$: IStyleX;
export default $$EXPORT_DEFAULT_DECLARATION$$;
