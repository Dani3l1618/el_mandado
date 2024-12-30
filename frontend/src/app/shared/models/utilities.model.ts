export type Nullable<T> = T | null;

export type Undefined<T> = T | undefined;

export type Undelable<T> = Nullable<Undefined<T>>;
