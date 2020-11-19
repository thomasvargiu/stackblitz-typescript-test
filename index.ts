import * as R from "fp-ts/Reader";
import { pipe, flow } from "fp-ts/function";

type Deps = {
    multiplier: number
}
const f1 = (id: string): R.Reader<{multiplier: number}, number> => ({multiplier}) => id.length * multiplier;
const f2 = (a: number) => a + 1;
const f3 = (a: number): string => 'baz'.repeat(a);

const factory = (id: string): R.Reader<Deps, string> => pipe(
    R.ask<Deps>(),
    R.map(f1(id)),
    R.map(f2),
    R.map(f3),
)

const deps = { multiplier: 2};
const result = factory('foo')(deps);
console.log(result);