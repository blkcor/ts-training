//isAny 
type isAny<T> = 'blkcor' extends ('chy' & T) ? true : false
type r1 = isAny<'dd'>

//more robust isEqual
type isEqual2<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false
type r2 = isEqual2<1, any>

//isUnion 
type isUnion<A, B = A> = A extends A ? [B] extends [A] ? false : true : never
type r3 = isUnion<'a' | 'b'>

//IsNever
//never比较特殊 如果条件类型参数左边为never 那么直接会返回never
//因此我们需要特殊处理一下
type isNever<T> = [T] extends [never] ? true : false
type r4 = isNever<'a'>

//除此以外，any 在条件类型中也比较特殊，如果类型参数为 any，会直接返回 trueType 和 falseType 的合并 (联合类型)
type TestAny<T> = T extends number ? 1 : 2
type r5 = TestAny<any>

//IsTuple
type NotEqual<A, B> =
  (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
  ? false : true;
type IsTuple<T> = T extends [...params: infer Elems] ? NotEqual<Elems['length'], number> : false
type r6 = IsTuple<number[]>

//UnionToInterSection
//在 TypeScript 中有函数参数是有逆变的性质的，也就是如果参数可能是多个类型，参数类型会变成它们的交叉类型。
type UnionToInterSection<U> = (U extends U ? (x: U) => unknown : never) extends (x: infer R) => unknown ? R : never
type r7 = UnionToInterSection<{ a: 1 } | { b: 2 }>

//GetOptional
type GetOptional<Obj extends Record<string, any>> = {
  [key in keyof Obj as {} extends Pick<Obj, key> ? key : never]: Obj[key]
}
type r8 = GetOptional<{
  name: 'blkcor',
  age?: 12
}>

//GetRequired
type GetRequired<Obj extends Record<string, any>> = {
  [key in keyof Obj as {} extends Pick<Obj, key> ? never : key]: Obj[key]
}
type r9 = GetRequired<
  {
    name: 'blkcor',
    age?: 12
  }
>

//RemoveIndexSignature
//什么是索引签名?
/**
 * type Dong = {
 * [key: string]: any;
 *  sleep(): void;
    }
 * 这里的[key:string]:any就是索引签名  表示可以添加任意 键为string 值为any类型的索引
 */
type RemoveIndexSignature<Obj extends Record<string, any>> = {
  [key in keyof Obj as key extends `${infer Str}` ? Str : never]: Obj[key]
}
type r10 = RemoveIndexSignature<
  {
    [key: string]: any,
    a: () => any,
    b(): void
  }
>

//ClassPublicProps  
//keyof进行遍历的时候只能拿到public的属性
class Person {
  public name: string
  private age: number
  protected hobbies: string[]

  constructor() {
    this.name = 'dong';
    this.age = 20;
    this.hobbies = ['sleep', 'eat'];
  }
}

type ClassPublicProps<Obj extends Record<string, any>> = {
  [key in keyof Obj]: Obj[key]
}
type r11 = ClassPublicProps<Person>


//as const
//ts 推导出来的类型默认并不是字面量类型
const obj = {
  a: 1,
  b: 2
}
type t = typeof obj

//那么我们如何推导出字面量类型呢？ ==> 使用 as const
const obj2 = {
  a: 1,
  b: 2
} as const
type t2 = typeof obj2
//但是加上 as const 之后推导出来的类型是带有 readonly 修饰的，所以再通过模式匹配提取类型的时候也要加上 readonly 的修饰才行。



