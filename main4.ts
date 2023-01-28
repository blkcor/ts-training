import { Build } from './main3';

//Add
type Add<Num1 extends number, Num2 extends number> = [...Build<Num1, 1>, ...Build<Num2, 2>]['length']
type result1 = Add<1, 2>

//Sub
type Subtract<Num1 extends number, Num2 extends number> = Build<Num1> extends [...Build<Num2>, ...infer Rest] ? Rest['length'] : never
type result2 = Subtract<32, 23>

//Mutiple
type Multiple<Num1 extends number, Num2 extends number, ResultArr extends unknown[] = []> =
  Num2 extends 0 ? ResultArr['length'] :
  Multiple<Num1, Subtract<Num2, 1>, [...Build<Num1>, ...ResultArr]>
type result3 = Multiple<2, 9>

//devide
type Divide<Num1 extends number, Num2 extends number, ResultArr extends unknown[] = []> =
  Num1 extends 0 ? ResultArr['length'] :
  Divide<Subtract<Num1, Num2>, Num2, [unknown, ...ResultArr]>
type result4 = Divide<50, 10>

//StrLen
type StrLen<Str extends string, CountArr extends unknown[] = []> = Str extends `${string}${infer Rest}` ? StrLen<Rest, [unknown, ...CountArr]> : CountArr['length']
type result5 = StrLen<'Do U Love Me?'>

//GreaterThan
// type GreaterThan<Num1 extends number, Num2 extends number, CountArr extends unknown[] = []> =
//   Num1 extends Num2 ? false :
//   CountArr['length'] extends Num2 ? true :
//   CountArr['length'] extends Num1 ? false :
//   GreaterThan<Num1, Num2, [unknown, ...CountArr]>
type GreaterThan<Num1 extends number, Num2 extends number> =
  Build<Num1> extends [...Build<Num2>, ...infer Rest] ?
  Rest['length'] extends 0 ?
  false
  : true
  : false
type result6 = GreaterThan<1, 2>



//Fibonacci
type FibonacciLoop<
  PrevArr extends unknown[],
  CurrentArr extends unknown[],
  IndexArr extends unknown[],
  Num extends number
> = Num extends IndexArr['length'] ? CurrentArr['length'] :
  FibonacciLoop<CurrentArr, [...PrevArr, ...CurrentArr], [...IndexArr, unknown], Num>
type Fibonacci<Num extends number> = FibonacciLoop<[1], [], [], Num>

type result7 = Fibonacci<9>

