// a | b | c ---> { a:V; b:V; c:V }
export type TUnionToObj<K extends string, V = string> = {
  [P in keyof { K: K } as `${K}`]: V;
};

// { a: 1, b: { ba: { baa: 1, bab: 2 }, bb: 2} } ---> a | b.ba.baa | b.ba.bab | b.bb
export type TObjKeysToUnion<T, P extends string = ''> = T extends object
  ? {
      [K in keyof T]: TObjKeysToUnion<
        T[K],
        P extends '' ? `${K & string}` : `${P}.${K & string}`
      >;
    }[keyof T]
  : P;
