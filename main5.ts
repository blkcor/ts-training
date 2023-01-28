//uppercase a letter in union type
type UpperCaseA<Item extends string> = Item extends 'a' ? Uppercase<Item> : Item
type union1 = 'a' | 'b' | 'c'
type result1 = UpperCaseA<union1>

//Camelcase Union
type CalmelcaseUnion<Item extends string> = Item extends `${infer left}_${infer right}${infer rest}` ?
  `${left}${Uppercase<right>}${rest}` : never

type union2 = 'aa_aa' | 'cc_cc' | 'bb_bb'
type result2 = CalmelcaseUnion<union2>

// IsUnion
// A extends A是为了触发分布式条件判断
// [B] extends [A]是为了不触发分布式条件判断
//分布式条件判断是联合类型独有的特性
//若传入 'a'& 'b' 永远会返回false
type IsUnion<A, B = A> = A extends A ?
  [B] extends [A] ?
  false : true : never
type union3 = 'a' | 'b'
type result3 = IsUnion<union3>

//array to union
type union4 = ['aaa', 'bbb'][number]

//于是可以这样实现BEM   block_element--modifier
type BEMResult<
  block extends string,
  element extends string[],
  modifier extends string[]
> = `${block}_${element[number]}--${modifier[number]}`
type result4 = BEMResult<"blkcor", ["name", "age"], ["chy", "love"]>

//AllCombinations example:传入 'A' | 'B' 的时候，能够返回所有的组合： 'A' | 'B' | 'BA' | 'AB'。
//first we accomplish Combination for two letters
type Combination<A extends string, B extends string> = | A | B | `${A}${B}` | `${B}${A}`
//then we accomplish AllCombination besed on the Combination
type AllCombination<A extends string, B extends string = A> = A extends A ?
  Combination<A, AllCombination<Exclude<B, A>>> : never
type result5 = AllCombination<'a' | 'v' | 's'>






