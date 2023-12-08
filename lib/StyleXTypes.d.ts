/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { CSSProperties } from './StyleXCSSTypes';

// Using an opaque type to declare ClassNames generated by stylex.
declare const StyleXClassNameTag: unique symbol;
export type StyleXClassNameFor<K, V> = string & {
  _opaque: typeof StyleXClassNameTag;
  _key: K;
  _value: V;
};

export type StyleXClassNameForValue<V> = StyleXClassNameFor<any, V>;
export type StyleXClassNameForKey<K> = StyleXClassNameFor<K, any>;
export type StyleXClassName = StyleXClassNameFor<any, any>;
// Type for arbitrarily nested Array.
export type StyleXArray<T> = T | ReadonlyArray<StyleXArray<T>>;

declare const StyleXVarTag: unique symbol;
declare class _StyleXVar<out Val> {
  private _opaque: typeof StyleXVarTag;
  private _value: Val;
}
export type StyleXVar<Val> = _StyleXVar<Val> & string;

type PseudoClassStr = `:${string}`;
type AtRuleStr = `@${string}`;

type CondStr = PseudoClassStr | AtRuleStr;

type CSSPropertiesWithExtras = Partial<
  Readonly<
    CSSProperties & {
      '::after': CSSProperties;
      '::backdrop': CSSProperties;
      '::before': CSSProperties;
      '::cue': CSSProperties;
      '::cue-region': CSSProperties;
      '::first-letter': CSSProperties;
      '::first-line': CSSProperties;
      '::file-selector-button': CSSProperties;
      '::grammar-error': CSSProperties;
      '::marker': CSSProperties;
      // This is a pattern and not a static key so it cannot be typed correctly.
      // [key: `::part(${string})` | `::slotted(${string})`]: CSSProperties;
      '::placeholder': CSSProperties;
      '::selection': CSSProperties;
      // This is a pattern and not a static key so it cannot be typed correctly.
      // '::slotted()': CSSProperties;
      '::spelling-error': CSSProperties;
      '::target-text': CSSProperties;
      '::-webkit-scrollbar'?: CSSProperties;
      // webkit styles used for Search in Safari
      '::-webkit-search-decoration'?: CSSProperties;
      '::-webkit-search-cancel-button'?: CSSProperties;
      '::-webkit-search-results-button'?: CSSProperties;
      '::-webkit-search-results-decoration'?: CSSProperties;
    }
  >
>;

export type NestedCSSPropTypes = Partial<
  Readonly<{
    [Key in keyof CSSPropertiesWithExtras]: StyleXClassNameFor<
      Key,
      CSSPropertiesWithExtras[Key]
    >;
  }>
>;

type UserAuthoredStyles = CSSPropertiesWithExtras | { [key: string]: unknown };
export type StyleXSingleStyle = false | (null | undefined | NestedCSSPropTypes);
// NOTE: `XStyle` has been deprecated in favor of `StaticStyles` and `StyleXStyles`.

export type Keyframes = Readonly<{ [name: string]: CSSProperties }>;
export type LegacyThemeStyles = Readonly<{ [constantName: string]: string }>;

type ComplexStyleValueType<T> = T extends StyleXVar<infer U>
  ? U
  : T extends string | number | null
    ? T
    : T extends ReadonlyArray<infer U>
      ? U
      : T extends Readonly<{ default: infer A; [cond: CondStr]: infer B }>
        ? ComplexStyleValueType<A> | ComplexStyleValueType<B>
        : T;

export type MapNamespace<CSS> = Readonly<{
  [Key in keyof CSS]: StyleXClassNameFor<Key, ComplexStyleValueType<CSS[Key]>>;
}>;

export type MapNamespaces<
  S extends {
    [key: string]: UserAuthoredStyles | ((...args: any) => UserAuthoredStyles);
  },
> = Readonly<{
  [Key in keyof S]: S[Key] extends (...args: infer Args) => infer Obj
    ? (...args: Args) => Readonly<[MapNamespace<Obj>, InlineStyles]>
    : MapNamespace<S[Key]>;
}>;

export type Stylex$Create = <
  const S extends {
    [key: string]: UserAuthoredStyles | ((...args: any) => UserAuthoredStyles);
  },
>(
  styles: S,
) => MapNamespaces<S>;

export type CompiledStyles =
  | Readonly<{
      [key: string]: StyleXClassName | null | void | never;
    }>
  | Readonly<{
      theme: StyleXClassName;
    }>;

declare const StyleXInlineStylesTag: unique symbol;

export type InlineStyles = typeof StyleXInlineStylesTag;

type _GenStylePropType<CSS extends UserAuthoredStyles> = Readonly<{
  [Key in keyof CSS]: StyleXClassNameFor<Key, Readonly<CSS[Key]>>;
}>;
type GenStylePropType<CSS extends UserAuthoredStyles> = Readonly<
  _GenStylePropType<CSS> &
    Partial<{
      [Key in Exclude<keyof CSSPropertiesWithExtras, keyof CSS>]: never;
    }>
>;

// Replace `XStyle` with this.
export type StaticStyles<
  CSS extends UserAuthoredStyles = CSSPropertiesWithExtras,
> = StyleXArray<false | null | GenStylePropType<CSS>>;

export type StaticStylesWithout<CSS extends UserAuthoredStyles> = StaticStyles<
  Omit<CSSPropertiesWithExtras, keyof CSS>
>;

export type StyleXStyles<
  CSS extends UserAuthoredStyles = CSSPropertiesWithExtras,
> = StyleXArray<
  | null
  | false
  | GenStylePropType<CSS>
  | Readonly<[GenStylePropType<CSS>, InlineStyles]>
>;
export type StyleXStylesWithout<CSS extends UserAuthoredStyles> = StyleXStyles<
  Omit<CSSPropertiesWithExtras, keyof CSS>
>;

declare const StyleXVarGroupTag: unique symbol;
export type VarGroup<
  Tokens extends { [key: string]: any },
  ID extends symbol = symbol,
> = Readonly<{
  [Key in keyof Tokens]: StyleXVar<Tokens[Key]>;
}> &
  Readonly<{
    __opaqueId: ID;
    __tokens: Tokens;
  }> &
  typeof StyleXVarGroupTag;

export type TokensFromVarGroup<T extends VarGroup<unknown, unknown>> =
  T['__tokens'];

export type IDFromVarGroup<T extends VarGroup<unknown, unknown>> =
  T['__opaqueId'];

type TTokens = Readonly<{
  [key: string]: string | { [key: string]: string };
}>;

export type FlattenTokens<T extends TTokens> = Readonly<{
  [Key in keyof T]: T[Key] extends { [key: string]: infer X } ? X : T[Key];
}>;

export type StyleX$DefineVars = <
  DefaultTokens extends TTokens,
  ID extends symbol = symbol,
>(
  tokens: DefaultTokens,
) => VarGroup<FlattenTokens<DefaultTokens>, ID>;

export type Theme<
  T extends VarGroup<unknown, symbol>,
  Tag extends symbol = symbol,
> = Tag &
  Readonly<{
    theme: StyleXClassNameFor<string, IDFromVarGroup<T>>;
  }>;

type OverridesForTokenType<Config extends { [key: string]: unknown }> = {
  [Key in keyof Config]:
    | Config[Key]
    | { default: Config[Key]; [atRule: AtRuleStr]: Config[Key] };
};

export type StyleX$CreateTheme = <
  TVars extends VarGroup<unknown, unknown>,
  ThemeID extends symbol = symbol,
>(
  baseTokens: TVars,
  overrides: OverridesForTokenType<TokensFromVarGroup<TVars>>,
) => Theme<TVars, ThemeID>;