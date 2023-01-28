/* Push a element to an Arary*/
type Push<Arr extends unknown[], Ele> = [...Arr, Ele]
type resu1 = Push<[1, 2, 3], 4>

/* Unshift a element to an Array */
type Unshift<Arr extends unknown[], Ele> = [Ele, ...Arr]
type resu2 = Unshift<[1, 2, 3], 4>

/*Zip an array */
type Zip<One extends [unknown, unknown], Two extends [unknown, unknown]>
  = One extends [infer Oneone, infer OneTwo] ?
  Two extends [infer Twoone, infer Twotwo] ?
  [[Oneone, Twoone], [OneTwo, Twotwo]] : never : never
type resu3 = Zip<[1, 2], ["string", "number"]>

/* zip  arbitrary oto*/
type Zip2<One extends unknown[], Other extends unknown[]> =
  One extends [infer OneFirst, ... infer OneRest] ?
  Other extends [infer OtherFirst, ... infer OtherRest] ?
  [[OneFirst, OtherFirst], ...Zip2<OneRest, OtherRest>] : [] : []
type resu4 = Zip2<[1, 2, 3], ["string", "number", "unknown"]>

/* make the string capital(the first letter) */
type CapitalizeStr<Str extends string> = Uppercase<Str>
type resu5 = CapitalizeStr<"i love u">

/* Capitalize the first letter of the string*/
type CapitalizeTheFirstLetter<Str extends string> = Str extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : never
type resu6 = CapitalizeTheFirstLetter<"nononononono">

/* Sub the String */
type SubString<Str extends string, SubStr extends string> =
  Str extends `${infer Prefix}${SubStr}${infer Suffix}` ? `${Prefix}${Suffix}` : never
type resu7 = SubString<"hello", "ll">

/*AppendArgument  to a function */
type AppendArgument<func extends Function, Arg> = func extends (...args: infer parameters) => infer ResultType ? (parameters, Arg) => ResultType : never

/* UpperCase Key */
type UpperCaseKey<Obj extends Record<string, any>> = {
  [key in keyof Obj as Uppercase<key & string>]: Obj[key]
}
type resu8 = UpperCaseKey<{ name: 'blkcor', age: 13 }>

/* make the attributes readonly */
type ToReadOnly<T extends Record<string, any>> = {
  readonly [Key in keyof T]: T[Key]
}
type resu9 = ToReadOnly<{ name: string, age: number }>

/* ToPartial */
type ToPartial<T> = { [key in keyof T]?: T[key] }
type resu10 = ToPartial<{ name: string, age: number }>

/* ToMutable , eraser the readonly 
  Unbelievable
*/
type ToMutable<T> = {
  -readonly [key in keyof T]: T[key]
}
type resu11 = ToMutable<{ readonly name: string, age: number }>

/* ToRequired  erase the ?. sign*/
type ToRequired<T> = {
  [key in keyof T]-?: T[key]
}
type resu12 = ToRequired<{ name?: string, age: number }>

/*FilterByValueType*/
type FilterByValueType<Obj extends Record<string, any>, ValueType> =
  { [key in keyof Obj as Obj[key] extends ValueType ? key : never]: Obj[key] }
type resu13 = FilterByValueType<{ name: string, age: number }, string>
