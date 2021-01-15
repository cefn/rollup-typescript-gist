export type EmitFunction<K, V> = (key: K, value?: V) => void;

export class Word {
  readonly type = "word";
  constructor(readonly id: string) {}
}
