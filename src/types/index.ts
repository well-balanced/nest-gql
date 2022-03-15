import { IMutation, IQuery } from '@generated'

export type Nullable<T> = T | null

type IResolver = IQuery & IMutation

export type Resolvable<T extends keyof Omit<IResolver, '__typename'>> =
  ReturnType<IResolver[T]>

export type ResolvableField<T, K extends keyof Omit<T, '__typename'>> = T[K]
