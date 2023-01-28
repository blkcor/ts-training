/* get the first value of an array*/
type First<Arr extends unknown[]> = Arr extends [infer First, ...unknown[]] ? First : never

type res1 = First<[1, 2, 3]>

/* get the last value of an array*/
type Last<Arr extends unknown[]> = Arr extends [...unknown[], infer Last] ? Last : never
type res2 = Last<[1, 2, 3]>

/* get the rest value after pop the array*/
type PopArray<Arr extends unknown[]> = Arr extends [] ? [] : Arr extends [... infer Rest, unknown] ? Rest : never
type res3 = PopArray<[1, 2, 3]>

/* get the rest value after shift the array*/
type ShiftArray<Arr extends unknown[]> = Arr extends [] ? [] : Arr extends [unknown, ... infer Rest] ? Rest : never
type res4 = ShiftArray<[1, 2, 3]>

/* judge if the string start with the detailed prefix */
type StartWith<Str extends string, Prefix extends string> = Str extends `${Prefix}${string}` ? true : false
type res5 = StartWith<'hello world', 'hello'>

/*Replace string */
type Replace<Str extends string, From extends string, To extends string> =
  Str extends `${infer Prefix}${From}${infer Suffix}` ? `${Prefix}${To}${Suffix}` : Str;
type res6 = Replace<'hello', 'el', 'ooo'>

/* Trim the string*/
//Trim Right
type TrimRight<Str extends string> = Str extends `${infer Prefix}${' ' | '\n' | '\t'}` ? TrimRight<Prefix> : Str
//Trim Left
type TrimLeft<Str extends string> = Str extends `${' ' | '\n' | '\t'}${infer Suffix}` ? TrimLeft<Suffix> : Str
//union them 
type Trim<Str extends string> = TrimLeft<TrimRight<Str>>
type res7 = Trim<" ddd ">


/* get the parameters of the function */
type GetParameter<func extends Function> = func extends (...args: infer Args) =>
  unknown ? Args : never
type res8 = GetParameter<(name: string, age: number) => string>


/*get the return type of the function */
type GetReturnType<func extends Function> =
  func extends (...args: any[]) => infer Result ? Result : never
type res9 = GetReturnType<(name: string, age: number) => string>

/* getThisParameterType */
type getThisParameterType<func extends Function> =
  func extends (this: infer thisType, args: any[]) => any ? thisType : never

class Dong {
  name: string;

  constructor() {
    this.name = "dong";
  }

  hello(this: Dong) {
    return 'hello, I\'m ' + this.name;
  }
}
const dong = new Dong()
type res10 = getThisParameterType<typeof dong.hello>


/* instance type */
interface Person {
  name: string;
}

interface PersonConstructor {
  new(name: string): Person;
}
type GetInstanceType<ConstructorType extends new (...args: any[]) => any> =
  ConstructorType extends new (...args: any) => infer InstanceType ? InstanceType : any;

type res11 = GetInstanceType<PersonConstructor>

/* get the parameter of the constructor */
type GetConstructorParameter<ConstructorType extends new (...args: any) => any> =
  ConstructorType extends new (...args: infer Args) => unknown ? Args : any;

type res12 = GetConstructorParameter<PersonConstructor>;

/* get Props value */
type GetPropsValue<Props> = 'ref' extends keyof Props ?
  Props extends { ref?: infer Value | undefined } ? Value : never
  : never
type res13 = GetPropsValue<{ ref?: 'name' }>
type res14 = GetPropsValue<{ ref?: undefined }>
