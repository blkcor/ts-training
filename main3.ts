//DeepPromiseValueType
type ttt = Promise<Promise<Promise<Record<string, any>>>>
type DeepPromiseValueType<P extends Promise<unknown>> =
  P extends Promise<infer ValueType> ?
  ValueType extends Promise<unknown> ?
  DeepPromiseValueType<ValueType> : ValueType : never
type DeepPromiseValueType2<T> = T extends Promise<infer ValueType> ? DeepPromiseValueType2<ValueType> : T
//the same 
type resul1 = DeepPromiseValueType<ttt>
type resul2 = DeepPromiseValueType2<ttt>

//ReverseArr
type ReverseArray<Arr extends unknown[]> = Arr extends [infer One, ... infer rest] ? [...ReverseArray<rest>, One] : Arr
type restl3 = ReverseArray<[1, 2, 3, 4, 5, 65]>

//Includes
type IsEqual<A, B> = (A extends B ? true : false) & (B extends A ? true : false)
type Includes<Arr extends unknown[], FindingItem> = Arr extends [infer One, ...infer Rest] ?
  IsEqual<FindingItem, One> extends true ?
  true
  : Includes<Rest, FindingItem>
  : false
type resul4 = Includes<[1, 2, 3, 4, 5], 56>

//RemoveItem
type RemoveItem<Arr extends unknown[], FindingItem, ResultArr extends unknown[] = []>
  = Arr extends [infer One, ...infer Rest] ?
  IsEqual<One, FindingItem> extends true ?
  RemoveItem<Rest, FindingItem, ResultArr> :
  RemoveItem<Rest, FindingItem, [...ResultArr, One]> :
  ResultArr

type resul5 = RemoveItem<[1, 2, 3, 4, 5, 6, 5], 5, []>

//Build Arr with the same element
export type Build<Length extends number, Ele = unknown, Arr extends unknown[] = []> =
  Arr['length'] extends Length ? Arr :
  Build<Length, Ele, [...Arr, Ele]>
type resul6 = Build<5, 1>

//RepalceAll
type RepalceAll<Str extends string, from extends string, to extends string>
  = Str extends `${infer left}${from}${infer right}` ?
  `${left}${to}${RepalceAll<right, from, to>}` :
  Str
type resul7 = RepalceAll<"hello,hello,hello", "ll", "-">

//StringToUnion
type StringToUnion<Str extends string> =
  Str extends `${infer First}${infer Rest}` ?
  First | StringToUnion<Rest> :
  never
type resul8 = StringToUnion<"hello">

//ReverseStr
type ReverseStr<Str extends string, ResultStr extends string = ''> =
  Str extends `${infer First}${infer Rest}` ?
  `${ReverseStr<Rest, `${First}${ResultStr}`>}` :
  ResultStr
type resul9 = ReverseStr<"hello">


//DeepReadOnly 
//加上Obj extends any 或者 Obj extends never时触发计算
type DeepReadOnly<Obj extends Record<string, any>> = Obj extends any ? {
  readonly [Key in keyof Obj]:
  Obj[Key] extends object ?
  Obj[Key] extends Function ?
  Obj[Key] :
  DeepReadOnly<Obj[Key]> :
  Obj[Key]
} : never

type resul10 = DeepReadOnly<{
  cats: {
    cat1: {
      name: "pipi",
      age: 12
    },
    cat2: {
      name: "bendan",
      age: 21312
    }
  }
}>

