// a | b | c ---> { a:V; b:V; c:V }
export type UnionToObj<K extends string, V = string> = {
  [P in keyof { K: K } as `${K}`]: V;
};

// { a:V; b:P } ---> a | b
export type ObjToUnion<T> = {
  [P in keyof T]: P;
}[keyof T];

// { a: 1, b: { ba: { baa: 1, bab: 2 }, bb: 2} } ---> a | b.ba.baa | b.ba.bab | b.bb
export type ObjKeysToUnion<T, P extends string = ''> = T extends object
  ? {
      [K in keyof T]: ObjKeysToUnion<
        T[K],
        P extends '' ? `${K & string}` : `${P}.${K & string}`
      >;
    }[keyof T]
  : P;
