export type ChangeAllKeysTo<T, Type> = {[P in keyof Required<T>]: Type}

export type NestedProperty<T, K extends string> = K extends `${infer A}.${infer B}`
  ? A extends keyof T
    ? NestedProperty<T[A], B>
    : never
  : K extends keyof T
  ? T[K]
  : never

export type ArgumentTypes<F extends Function> = F extends (...args: infer A) => unknown ? A : never
