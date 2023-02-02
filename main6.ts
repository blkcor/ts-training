import { Build } from './main3';

/* 
类型体操顺口溜

模式匹配做提取，重新构造做变换。

递归复用做循环，数组长度做计数。

联合分散可简化，特殊特性要记清。

基础扎实套路熟，类型体操可通关。
  */

//1. 模式匹配做提取 如提取参数或者返回值的类型
type GetResultType<func extends Function> = func extends ((...args: any[]) => infer ResultType) ? ResultType : never

//2. 重新构造做变换 如将索引变大写
type UpperCaseKey<Obj extends Record<string, any>> = {
  [Key in keyof Obj as Uppercase<Key & string>]: Obj[Key]
}

//3. 递归复用做循环 如将数组变为联合类型 (遇到数量不确定问题时，就要条件反射的想到递归)
type ArrayToUnion<T extends any[]> = T extends [infer Head, ...infer Tail] ? Head | ArrayToUnion<Tail> : never

//4. 数组长度做计数 如实现减法操作
type BuildArray<Len extends number, Elem = unknown, Res extends unknown[] = []> =
  Res['length'] extends Len ? Res : BuildArray<Len, Elem, [Elem, ...Res]>

type Substract<A extends number, B extends number> =
  BuildArray<A> extends [...arr1: BuildArray<B>, ...arr2: infer Rest] ? Rest['length'] : never

//5. 联合分散可简化 将联合类型中的字母a大写
type UpperCaseA<T extends string> = T extends 'a' ? Uppercase<T> : T

//6. 特殊特性要记清 比如判断一个类型是否为any应该如下：注意:number 和 string 位置的类型参数不能相同
type isAny<T> = number extends (string & T) ? true : false

//7. 基础扎实套路熟，类型体操可通关
type parseQueryString<Str extends string> =
  Str extends `${infer Param}&${infer Rest}`
  ? MergeParams<ParseParam<Param>, parseQueryString<Rest>>
  : ParseParam<Str>

type ParseParam<Str extends string> =
  Str extends `${infer Key}=${infer Value}`
  ? { [K in Key]: Value }
  : {}


type MergeParams<
  OneRecord extends Record<string, any>, OtherRecord extends Record<string, any>
> = {
    [Key in keyof OneRecord | keyof OtherRecord]:
    Key extends keyof OneRecord
    ? Key extends keyof OtherRecord
    ? MergeValues<OneRecord[Key], OtherRecord[Key]>
    : OneRecord[Key]
    : Key extends keyof OtherRecord
    ? OtherRecord[Key]
    : never
  }

type MergeValues<OneValue, OtherValue> = OneValue extends OtherValue
  ? OneValue
  : OtherValue extends any[]
  ? [OneValue, ...OtherValue]
  : [OneValue, OtherValue]



