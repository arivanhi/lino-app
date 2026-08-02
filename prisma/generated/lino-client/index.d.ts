
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model BankSoal
 * 
 */
export type BankSoal = $Result.DefaultSelection<Prisma.$BankSoalPayload>
/**
 * Model PenugasanLino
 * 
 */
export type PenugasanLino = $Result.DefaultSelection<Prisma.$PenugasanLinoPayload>
/**
 * Model HasilKerjaSiswa
 * 
 */
export type HasilKerjaSiswa = $Result.DefaultSelection<Prisma.$HasilKerjaSiswaPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const TipeSoal: {
  LITERASI: 'LITERASI',
  NUMERASI: 'NUMERASI'
};

export type TipeSoal = (typeof TipeSoal)[keyof typeof TipeSoal]


export const StatusTugas: {
  DRAFT: 'DRAFT',
  DITUGASKAN: 'DITUGASKAN',
  SELESAI: 'SELESAI'
};

export type StatusTugas = (typeof StatusTugas)[keyof typeof StatusTugas]

}

export type TipeSoal = $Enums.TipeSoal

export const TipeSoal: typeof $Enums.TipeSoal

export type StatusTugas = $Enums.StatusTugas

export const StatusTugas: typeof $Enums.StatusTugas

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more BankSoals
 * const bankSoals = await prisma.bankSoal.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more BankSoals
   * const bankSoals = await prisma.bankSoal.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.bankSoal`: Exposes CRUD operations for the **BankSoal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BankSoals
    * const bankSoals = await prisma.bankSoal.findMany()
    * ```
    */
  get bankSoal(): Prisma.BankSoalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.penugasanLino`: Exposes CRUD operations for the **PenugasanLino** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PenugasanLinos
    * const penugasanLinos = await prisma.penugasanLino.findMany()
    * ```
    */
  get penugasanLino(): Prisma.PenugasanLinoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.hasilKerjaSiswa`: Exposes CRUD operations for the **HasilKerjaSiswa** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HasilKerjaSiswas
    * const hasilKerjaSiswas = await prisma.hasilKerjaSiswa.findMany()
    * ```
    */
  get hasilKerjaSiswa(): Prisma.HasilKerjaSiswaDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    BankSoal: 'BankSoal',
    PenugasanLino: 'PenugasanLino',
    HasilKerjaSiswa: 'HasilKerjaSiswa'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "bankSoal" | "penugasanLino" | "hasilKerjaSiswa"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      BankSoal: {
        payload: Prisma.$BankSoalPayload<ExtArgs>
        fields: Prisma.BankSoalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BankSoalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankSoalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BankSoalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankSoalPayload>
          }
          findFirst: {
            args: Prisma.BankSoalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankSoalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BankSoalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankSoalPayload>
          }
          findMany: {
            args: Prisma.BankSoalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankSoalPayload>[]
          }
          create: {
            args: Prisma.BankSoalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankSoalPayload>
          }
          createMany: {
            args: Prisma.BankSoalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BankSoalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankSoalPayload>
          }
          update: {
            args: Prisma.BankSoalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankSoalPayload>
          }
          deleteMany: {
            args: Prisma.BankSoalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BankSoalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BankSoalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankSoalPayload>
          }
          aggregate: {
            args: Prisma.BankSoalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBankSoal>
          }
          groupBy: {
            args: Prisma.BankSoalGroupByArgs<ExtArgs>
            result: $Utils.Optional<BankSoalGroupByOutputType>[]
          }
          count: {
            args: Prisma.BankSoalCountArgs<ExtArgs>
            result: $Utils.Optional<BankSoalCountAggregateOutputType> | number
          }
        }
      }
      PenugasanLino: {
        payload: Prisma.$PenugasanLinoPayload<ExtArgs>
        fields: Prisma.PenugasanLinoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PenugasanLinoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PenugasanLinoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PenugasanLinoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PenugasanLinoPayload>
          }
          findFirst: {
            args: Prisma.PenugasanLinoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PenugasanLinoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PenugasanLinoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PenugasanLinoPayload>
          }
          findMany: {
            args: Prisma.PenugasanLinoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PenugasanLinoPayload>[]
          }
          create: {
            args: Prisma.PenugasanLinoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PenugasanLinoPayload>
          }
          createMany: {
            args: Prisma.PenugasanLinoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PenugasanLinoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PenugasanLinoPayload>
          }
          update: {
            args: Prisma.PenugasanLinoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PenugasanLinoPayload>
          }
          deleteMany: {
            args: Prisma.PenugasanLinoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PenugasanLinoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PenugasanLinoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PenugasanLinoPayload>
          }
          aggregate: {
            args: Prisma.PenugasanLinoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePenugasanLino>
          }
          groupBy: {
            args: Prisma.PenugasanLinoGroupByArgs<ExtArgs>
            result: $Utils.Optional<PenugasanLinoGroupByOutputType>[]
          }
          count: {
            args: Prisma.PenugasanLinoCountArgs<ExtArgs>
            result: $Utils.Optional<PenugasanLinoCountAggregateOutputType> | number
          }
        }
      }
      HasilKerjaSiswa: {
        payload: Prisma.$HasilKerjaSiswaPayload<ExtArgs>
        fields: Prisma.HasilKerjaSiswaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HasilKerjaSiswaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HasilKerjaSiswaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HasilKerjaSiswaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HasilKerjaSiswaPayload>
          }
          findFirst: {
            args: Prisma.HasilKerjaSiswaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HasilKerjaSiswaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HasilKerjaSiswaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HasilKerjaSiswaPayload>
          }
          findMany: {
            args: Prisma.HasilKerjaSiswaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HasilKerjaSiswaPayload>[]
          }
          create: {
            args: Prisma.HasilKerjaSiswaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HasilKerjaSiswaPayload>
          }
          createMany: {
            args: Prisma.HasilKerjaSiswaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.HasilKerjaSiswaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HasilKerjaSiswaPayload>
          }
          update: {
            args: Prisma.HasilKerjaSiswaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HasilKerjaSiswaPayload>
          }
          deleteMany: {
            args: Prisma.HasilKerjaSiswaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HasilKerjaSiswaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.HasilKerjaSiswaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HasilKerjaSiswaPayload>
          }
          aggregate: {
            args: Prisma.HasilKerjaSiswaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHasilKerjaSiswa>
          }
          groupBy: {
            args: Prisma.HasilKerjaSiswaGroupByArgs<ExtArgs>
            result: $Utils.Optional<HasilKerjaSiswaGroupByOutputType>[]
          }
          count: {
            args: Prisma.HasilKerjaSiswaCountArgs<ExtArgs>
            result: $Utils.Optional<HasilKerjaSiswaCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    bankSoal?: BankSoalOmit
    penugasanLino?: PenugasanLinoOmit
    hasilKerjaSiswa?: HasilKerjaSiswaOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PenugasanLinoCountOutputType
   */

  export type PenugasanLinoCountOutputType = {
    hasilKerjaSiswa: number
  }

  export type PenugasanLinoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hasilKerjaSiswa?: boolean | PenugasanLinoCountOutputTypeCountHasilKerjaSiswaArgs
  }

  // Custom InputTypes
  /**
   * PenugasanLinoCountOutputType without action
   */
  export type PenugasanLinoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PenugasanLinoCountOutputType
     */
    select?: PenugasanLinoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PenugasanLinoCountOutputType without action
   */
  export type PenugasanLinoCountOutputTypeCountHasilKerjaSiswaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HasilKerjaSiswaWhereInput
  }


  /**
   * Models
   */

  /**
   * Model BankSoal
   */

  export type AggregateBankSoal = {
    _count: BankSoalCountAggregateOutputType | null
    _avg: BankSoalAvgAggregateOutputType | null
    _sum: BankSoalSumAggregateOutputType | null
    _min: BankSoalMinAggregateOutputType | null
    _max: BankSoalMaxAggregateOutputType | null
  }

  export type BankSoalAvgAggregateOutputType = {
    bobotNilai: number | null
  }

  export type BankSoalSumAggregateOutputType = {
    bobotNilai: number | null
  }

  export type BankSoalMinAggregateOutputType = {
    id: string | null
    tipe: $Enums.TipeSoal | null
    tingkat: string | null
    pertanyaan: string | null
    opsiA: string | null
    opsiB: string | null
    opsiC: string | null
    opsiD: string | null
    opsiE: string | null
    kunciBenar: string | null
    bobotNilai: number | null
    pembuatId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BankSoalMaxAggregateOutputType = {
    id: string | null
    tipe: $Enums.TipeSoal | null
    tingkat: string | null
    pertanyaan: string | null
    opsiA: string | null
    opsiB: string | null
    opsiC: string | null
    opsiD: string | null
    opsiE: string | null
    kunciBenar: string | null
    bobotNilai: number | null
    pembuatId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BankSoalCountAggregateOutputType = {
    id: number
    tipe: number
    tingkat: number
    pertanyaan: number
    opsiA: number
    opsiB: number
    opsiC: number
    opsiD: number
    opsiE: number
    kunciBenar: number
    bobotNilai: number
    pembuatId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BankSoalAvgAggregateInputType = {
    bobotNilai?: true
  }

  export type BankSoalSumAggregateInputType = {
    bobotNilai?: true
  }

  export type BankSoalMinAggregateInputType = {
    id?: true
    tipe?: true
    tingkat?: true
    pertanyaan?: true
    opsiA?: true
    opsiB?: true
    opsiC?: true
    opsiD?: true
    opsiE?: true
    kunciBenar?: true
    bobotNilai?: true
    pembuatId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BankSoalMaxAggregateInputType = {
    id?: true
    tipe?: true
    tingkat?: true
    pertanyaan?: true
    opsiA?: true
    opsiB?: true
    opsiC?: true
    opsiD?: true
    opsiE?: true
    kunciBenar?: true
    bobotNilai?: true
    pembuatId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BankSoalCountAggregateInputType = {
    id?: true
    tipe?: true
    tingkat?: true
    pertanyaan?: true
    opsiA?: true
    opsiB?: true
    opsiC?: true
    opsiD?: true
    opsiE?: true
    kunciBenar?: true
    bobotNilai?: true
    pembuatId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BankSoalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BankSoal to aggregate.
     */
    where?: BankSoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BankSoals to fetch.
     */
    orderBy?: BankSoalOrderByWithRelationInput | BankSoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BankSoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BankSoals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BankSoals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BankSoals
    **/
    _count?: true | BankSoalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BankSoalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BankSoalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BankSoalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BankSoalMaxAggregateInputType
  }

  export type GetBankSoalAggregateType<T extends BankSoalAggregateArgs> = {
        [P in keyof T & keyof AggregateBankSoal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBankSoal[P]>
      : GetScalarType<T[P], AggregateBankSoal[P]>
  }




  export type BankSoalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BankSoalWhereInput
    orderBy?: BankSoalOrderByWithAggregationInput | BankSoalOrderByWithAggregationInput[]
    by: BankSoalScalarFieldEnum[] | BankSoalScalarFieldEnum
    having?: BankSoalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BankSoalCountAggregateInputType | true
    _avg?: BankSoalAvgAggregateInputType
    _sum?: BankSoalSumAggregateInputType
    _min?: BankSoalMinAggregateInputType
    _max?: BankSoalMaxAggregateInputType
  }

  export type BankSoalGroupByOutputType = {
    id: string
    tipe: $Enums.TipeSoal
    tingkat: string
    pertanyaan: string
    opsiA: string
    opsiB: string
    opsiC: string
    opsiD: string
    opsiE: string | null
    kunciBenar: string
    bobotNilai: number
    pembuatId: string
    createdAt: Date
    updatedAt: Date
    _count: BankSoalCountAggregateOutputType | null
    _avg: BankSoalAvgAggregateOutputType | null
    _sum: BankSoalSumAggregateOutputType | null
    _min: BankSoalMinAggregateOutputType | null
    _max: BankSoalMaxAggregateOutputType | null
  }

  type GetBankSoalGroupByPayload<T extends BankSoalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BankSoalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BankSoalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BankSoalGroupByOutputType[P]>
            : GetScalarType<T[P], BankSoalGroupByOutputType[P]>
        }
      >
    >


  export type BankSoalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tipe?: boolean
    tingkat?: boolean
    pertanyaan?: boolean
    opsiA?: boolean
    opsiB?: boolean
    opsiC?: boolean
    opsiD?: boolean
    opsiE?: boolean
    kunciBenar?: boolean
    bobotNilai?: boolean
    pembuatId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["bankSoal"]>



  export type BankSoalSelectScalar = {
    id?: boolean
    tipe?: boolean
    tingkat?: boolean
    pertanyaan?: boolean
    opsiA?: boolean
    opsiB?: boolean
    opsiC?: boolean
    opsiD?: boolean
    opsiE?: boolean
    kunciBenar?: boolean
    bobotNilai?: boolean
    pembuatId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BankSoalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tipe" | "tingkat" | "pertanyaan" | "opsiA" | "opsiB" | "opsiC" | "opsiD" | "opsiE" | "kunciBenar" | "bobotNilai" | "pembuatId" | "createdAt" | "updatedAt", ExtArgs["result"]["bankSoal"]>

  export type $BankSoalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BankSoal"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tipe: $Enums.TipeSoal
      tingkat: string
      pertanyaan: string
      opsiA: string
      opsiB: string
      opsiC: string
      opsiD: string
      opsiE: string | null
      kunciBenar: string
      bobotNilai: number
      pembuatId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["bankSoal"]>
    composites: {}
  }

  type BankSoalGetPayload<S extends boolean | null | undefined | BankSoalDefaultArgs> = $Result.GetResult<Prisma.$BankSoalPayload, S>

  type BankSoalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BankSoalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BankSoalCountAggregateInputType | true
    }

  export interface BankSoalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BankSoal'], meta: { name: 'BankSoal' } }
    /**
     * Find zero or one BankSoal that matches the filter.
     * @param {BankSoalFindUniqueArgs} args - Arguments to find a BankSoal
     * @example
     * // Get one BankSoal
     * const bankSoal = await prisma.bankSoal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BankSoalFindUniqueArgs>(args: SelectSubset<T, BankSoalFindUniqueArgs<ExtArgs>>): Prisma__BankSoalClient<$Result.GetResult<Prisma.$BankSoalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BankSoal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BankSoalFindUniqueOrThrowArgs} args - Arguments to find a BankSoal
     * @example
     * // Get one BankSoal
     * const bankSoal = await prisma.bankSoal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BankSoalFindUniqueOrThrowArgs>(args: SelectSubset<T, BankSoalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BankSoalClient<$Result.GetResult<Prisma.$BankSoalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BankSoal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankSoalFindFirstArgs} args - Arguments to find a BankSoal
     * @example
     * // Get one BankSoal
     * const bankSoal = await prisma.bankSoal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BankSoalFindFirstArgs>(args?: SelectSubset<T, BankSoalFindFirstArgs<ExtArgs>>): Prisma__BankSoalClient<$Result.GetResult<Prisma.$BankSoalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BankSoal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankSoalFindFirstOrThrowArgs} args - Arguments to find a BankSoal
     * @example
     * // Get one BankSoal
     * const bankSoal = await prisma.bankSoal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BankSoalFindFirstOrThrowArgs>(args?: SelectSubset<T, BankSoalFindFirstOrThrowArgs<ExtArgs>>): Prisma__BankSoalClient<$Result.GetResult<Prisma.$BankSoalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BankSoals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankSoalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BankSoals
     * const bankSoals = await prisma.bankSoal.findMany()
     * 
     * // Get first 10 BankSoals
     * const bankSoals = await prisma.bankSoal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bankSoalWithIdOnly = await prisma.bankSoal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BankSoalFindManyArgs>(args?: SelectSubset<T, BankSoalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BankSoalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BankSoal.
     * @param {BankSoalCreateArgs} args - Arguments to create a BankSoal.
     * @example
     * // Create one BankSoal
     * const BankSoal = await prisma.bankSoal.create({
     *   data: {
     *     // ... data to create a BankSoal
     *   }
     * })
     * 
     */
    create<T extends BankSoalCreateArgs>(args: SelectSubset<T, BankSoalCreateArgs<ExtArgs>>): Prisma__BankSoalClient<$Result.GetResult<Prisma.$BankSoalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BankSoals.
     * @param {BankSoalCreateManyArgs} args - Arguments to create many BankSoals.
     * @example
     * // Create many BankSoals
     * const bankSoal = await prisma.bankSoal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BankSoalCreateManyArgs>(args?: SelectSubset<T, BankSoalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a BankSoal.
     * @param {BankSoalDeleteArgs} args - Arguments to delete one BankSoal.
     * @example
     * // Delete one BankSoal
     * const BankSoal = await prisma.bankSoal.delete({
     *   where: {
     *     // ... filter to delete one BankSoal
     *   }
     * })
     * 
     */
    delete<T extends BankSoalDeleteArgs>(args: SelectSubset<T, BankSoalDeleteArgs<ExtArgs>>): Prisma__BankSoalClient<$Result.GetResult<Prisma.$BankSoalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BankSoal.
     * @param {BankSoalUpdateArgs} args - Arguments to update one BankSoal.
     * @example
     * // Update one BankSoal
     * const bankSoal = await prisma.bankSoal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BankSoalUpdateArgs>(args: SelectSubset<T, BankSoalUpdateArgs<ExtArgs>>): Prisma__BankSoalClient<$Result.GetResult<Prisma.$BankSoalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BankSoals.
     * @param {BankSoalDeleteManyArgs} args - Arguments to filter BankSoals to delete.
     * @example
     * // Delete a few BankSoals
     * const { count } = await prisma.bankSoal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BankSoalDeleteManyArgs>(args?: SelectSubset<T, BankSoalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BankSoals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankSoalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BankSoals
     * const bankSoal = await prisma.bankSoal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BankSoalUpdateManyArgs>(args: SelectSubset<T, BankSoalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BankSoal.
     * @param {BankSoalUpsertArgs} args - Arguments to update or create a BankSoal.
     * @example
     * // Update or create a BankSoal
     * const bankSoal = await prisma.bankSoal.upsert({
     *   create: {
     *     // ... data to create a BankSoal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BankSoal we want to update
     *   }
     * })
     */
    upsert<T extends BankSoalUpsertArgs>(args: SelectSubset<T, BankSoalUpsertArgs<ExtArgs>>): Prisma__BankSoalClient<$Result.GetResult<Prisma.$BankSoalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BankSoals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankSoalCountArgs} args - Arguments to filter BankSoals to count.
     * @example
     * // Count the number of BankSoals
     * const count = await prisma.bankSoal.count({
     *   where: {
     *     // ... the filter for the BankSoals we want to count
     *   }
     * })
    **/
    count<T extends BankSoalCountArgs>(
      args?: Subset<T, BankSoalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BankSoalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BankSoal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankSoalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BankSoalAggregateArgs>(args: Subset<T, BankSoalAggregateArgs>): Prisma.PrismaPromise<GetBankSoalAggregateType<T>>

    /**
     * Group by BankSoal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankSoalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BankSoalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BankSoalGroupByArgs['orderBy'] }
        : { orderBy?: BankSoalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BankSoalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBankSoalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BankSoal model
   */
  readonly fields: BankSoalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BankSoal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BankSoalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BankSoal model
   */
  interface BankSoalFieldRefs {
    readonly id: FieldRef<"BankSoal", 'String'>
    readonly tipe: FieldRef<"BankSoal", 'TipeSoal'>
    readonly tingkat: FieldRef<"BankSoal", 'String'>
    readonly pertanyaan: FieldRef<"BankSoal", 'String'>
    readonly opsiA: FieldRef<"BankSoal", 'String'>
    readonly opsiB: FieldRef<"BankSoal", 'String'>
    readonly opsiC: FieldRef<"BankSoal", 'String'>
    readonly opsiD: FieldRef<"BankSoal", 'String'>
    readonly opsiE: FieldRef<"BankSoal", 'String'>
    readonly kunciBenar: FieldRef<"BankSoal", 'String'>
    readonly bobotNilai: FieldRef<"BankSoal", 'Int'>
    readonly pembuatId: FieldRef<"BankSoal", 'String'>
    readonly createdAt: FieldRef<"BankSoal", 'DateTime'>
    readonly updatedAt: FieldRef<"BankSoal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BankSoal findUnique
   */
  export type BankSoalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankSoal
     */
    select?: BankSoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankSoal
     */
    omit?: BankSoalOmit<ExtArgs> | null
    /**
     * Filter, which BankSoal to fetch.
     */
    where: BankSoalWhereUniqueInput
  }

  /**
   * BankSoal findUniqueOrThrow
   */
  export type BankSoalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankSoal
     */
    select?: BankSoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankSoal
     */
    omit?: BankSoalOmit<ExtArgs> | null
    /**
     * Filter, which BankSoal to fetch.
     */
    where: BankSoalWhereUniqueInput
  }

  /**
   * BankSoal findFirst
   */
  export type BankSoalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankSoal
     */
    select?: BankSoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankSoal
     */
    omit?: BankSoalOmit<ExtArgs> | null
    /**
     * Filter, which BankSoal to fetch.
     */
    where?: BankSoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BankSoals to fetch.
     */
    orderBy?: BankSoalOrderByWithRelationInput | BankSoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BankSoals.
     */
    cursor?: BankSoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BankSoals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BankSoals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BankSoals.
     */
    distinct?: BankSoalScalarFieldEnum | BankSoalScalarFieldEnum[]
  }

  /**
   * BankSoal findFirstOrThrow
   */
  export type BankSoalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankSoal
     */
    select?: BankSoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankSoal
     */
    omit?: BankSoalOmit<ExtArgs> | null
    /**
     * Filter, which BankSoal to fetch.
     */
    where?: BankSoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BankSoals to fetch.
     */
    orderBy?: BankSoalOrderByWithRelationInput | BankSoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BankSoals.
     */
    cursor?: BankSoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BankSoals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BankSoals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BankSoals.
     */
    distinct?: BankSoalScalarFieldEnum | BankSoalScalarFieldEnum[]
  }

  /**
   * BankSoal findMany
   */
  export type BankSoalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankSoal
     */
    select?: BankSoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankSoal
     */
    omit?: BankSoalOmit<ExtArgs> | null
    /**
     * Filter, which BankSoals to fetch.
     */
    where?: BankSoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BankSoals to fetch.
     */
    orderBy?: BankSoalOrderByWithRelationInput | BankSoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BankSoals.
     */
    cursor?: BankSoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BankSoals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BankSoals.
     */
    skip?: number
    distinct?: BankSoalScalarFieldEnum | BankSoalScalarFieldEnum[]
  }

  /**
   * BankSoal create
   */
  export type BankSoalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankSoal
     */
    select?: BankSoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankSoal
     */
    omit?: BankSoalOmit<ExtArgs> | null
    /**
     * The data needed to create a BankSoal.
     */
    data: XOR<BankSoalCreateInput, BankSoalUncheckedCreateInput>
  }

  /**
   * BankSoal createMany
   */
  export type BankSoalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BankSoals.
     */
    data: BankSoalCreateManyInput | BankSoalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BankSoal update
   */
  export type BankSoalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankSoal
     */
    select?: BankSoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankSoal
     */
    omit?: BankSoalOmit<ExtArgs> | null
    /**
     * The data needed to update a BankSoal.
     */
    data: XOR<BankSoalUpdateInput, BankSoalUncheckedUpdateInput>
    /**
     * Choose, which BankSoal to update.
     */
    where: BankSoalWhereUniqueInput
  }

  /**
   * BankSoal updateMany
   */
  export type BankSoalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BankSoals.
     */
    data: XOR<BankSoalUpdateManyMutationInput, BankSoalUncheckedUpdateManyInput>
    /**
     * Filter which BankSoals to update
     */
    where?: BankSoalWhereInput
    /**
     * Limit how many BankSoals to update.
     */
    limit?: number
  }

  /**
   * BankSoal upsert
   */
  export type BankSoalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankSoal
     */
    select?: BankSoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankSoal
     */
    omit?: BankSoalOmit<ExtArgs> | null
    /**
     * The filter to search for the BankSoal to update in case it exists.
     */
    where: BankSoalWhereUniqueInput
    /**
     * In case the BankSoal found by the `where` argument doesn't exist, create a new BankSoal with this data.
     */
    create: XOR<BankSoalCreateInput, BankSoalUncheckedCreateInput>
    /**
     * In case the BankSoal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BankSoalUpdateInput, BankSoalUncheckedUpdateInput>
  }

  /**
   * BankSoal delete
   */
  export type BankSoalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankSoal
     */
    select?: BankSoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankSoal
     */
    omit?: BankSoalOmit<ExtArgs> | null
    /**
     * Filter which BankSoal to delete.
     */
    where: BankSoalWhereUniqueInput
  }

  /**
   * BankSoal deleteMany
   */
  export type BankSoalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BankSoals to delete
     */
    where?: BankSoalWhereInput
    /**
     * Limit how many BankSoals to delete.
     */
    limit?: number
  }

  /**
   * BankSoal without action
   */
  export type BankSoalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankSoal
     */
    select?: BankSoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankSoal
     */
    omit?: BankSoalOmit<ExtArgs> | null
  }


  /**
   * Model PenugasanLino
   */

  export type AggregatePenugasanLino = {
    _count: PenugasanLinoCountAggregateOutputType | null
    _min: PenugasanLinoMinAggregateOutputType | null
    _max: PenugasanLinoMaxAggregateOutputType | null
  }

  export type PenugasanLinoMinAggregateOutputType = {
    id: string | null
    judul: string | null
    tipe: $Enums.TipeSoal | null
    deskripsi: string | null
    tahunAjaranId: string | null
    kelasId: string | null
    guruId: string | null
    waktuMulai: Date | null
    waktuSelesai: Date | null
    status: $Enums.StatusTugas | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PenugasanLinoMaxAggregateOutputType = {
    id: string | null
    judul: string | null
    tipe: $Enums.TipeSoal | null
    deskripsi: string | null
    tahunAjaranId: string | null
    kelasId: string | null
    guruId: string | null
    waktuMulai: Date | null
    waktuSelesai: Date | null
    status: $Enums.StatusTugas | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PenugasanLinoCountAggregateOutputType = {
    id: number
    judul: number
    tipe: number
    deskripsi: number
    tahunAjaranId: number
    kelasId: number
    guruId: number
    waktuMulai: number
    waktuSelesai: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PenugasanLinoMinAggregateInputType = {
    id?: true
    judul?: true
    tipe?: true
    deskripsi?: true
    tahunAjaranId?: true
    kelasId?: true
    guruId?: true
    waktuMulai?: true
    waktuSelesai?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PenugasanLinoMaxAggregateInputType = {
    id?: true
    judul?: true
    tipe?: true
    deskripsi?: true
    tahunAjaranId?: true
    kelasId?: true
    guruId?: true
    waktuMulai?: true
    waktuSelesai?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PenugasanLinoCountAggregateInputType = {
    id?: true
    judul?: true
    tipe?: true
    deskripsi?: true
    tahunAjaranId?: true
    kelasId?: true
    guruId?: true
    waktuMulai?: true
    waktuSelesai?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PenugasanLinoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PenugasanLino to aggregate.
     */
    where?: PenugasanLinoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PenugasanLinos to fetch.
     */
    orderBy?: PenugasanLinoOrderByWithRelationInput | PenugasanLinoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PenugasanLinoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PenugasanLinos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PenugasanLinos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PenugasanLinos
    **/
    _count?: true | PenugasanLinoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PenugasanLinoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PenugasanLinoMaxAggregateInputType
  }

  export type GetPenugasanLinoAggregateType<T extends PenugasanLinoAggregateArgs> = {
        [P in keyof T & keyof AggregatePenugasanLino]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePenugasanLino[P]>
      : GetScalarType<T[P], AggregatePenugasanLino[P]>
  }




  export type PenugasanLinoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PenugasanLinoWhereInput
    orderBy?: PenugasanLinoOrderByWithAggregationInput | PenugasanLinoOrderByWithAggregationInput[]
    by: PenugasanLinoScalarFieldEnum[] | PenugasanLinoScalarFieldEnum
    having?: PenugasanLinoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PenugasanLinoCountAggregateInputType | true
    _min?: PenugasanLinoMinAggregateInputType
    _max?: PenugasanLinoMaxAggregateInputType
  }

  export type PenugasanLinoGroupByOutputType = {
    id: string
    judul: string
    tipe: $Enums.TipeSoal
    deskripsi: string | null
    tahunAjaranId: string
    kelasId: string | null
    guruId: string
    waktuMulai: Date
    waktuSelesai: Date
    status: $Enums.StatusTugas
    createdAt: Date
    updatedAt: Date
    _count: PenugasanLinoCountAggregateOutputType | null
    _min: PenugasanLinoMinAggregateOutputType | null
    _max: PenugasanLinoMaxAggregateOutputType | null
  }

  type GetPenugasanLinoGroupByPayload<T extends PenugasanLinoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PenugasanLinoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PenugasanLinoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PenugasanLinoGroupByOutputType[P]>
            : GetScalarType<T[P], PenugasanLinoGroupByOutputType[P]>
        }
      >
    >


  export type PenugasanLinoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    judul?: boolean
    tipe?: boolean
    deskripsi?: boolean
    tahunAjaranId?: boolean
    kelasId?: boolean
    guruId?: boolean
    waktuMulai?: boolean
    waktuSelesai?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    hasilKerjaSiswa?: boolean | PenugasanLino$hasilKerjaSiswaArgs<ExtArgs>
    _count?: boolean | PenugasanLinoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["penugasanLino"]>



  export type PenugasanLinoSelectScalar = {
    id?: boolean
    judul?: boolean
    tipe?: boolean
    deskripsi?: boolean
    tahunAjaranId?: boolean
    kelasId?: boolean
    guruId?: boolean
    waktuMulai?: boolean
    waktuSelesai?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PenugasanLinoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "judul" | "tipe" | "deskripsi" | "tahunAjaranId" | "kelasId" | "guruId" | "waktuMulai" | "waktuSelesai" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["penugasanLino"]>
  export type PenugasanLinoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hasilKerjaSiswa?: boolean | PenugasanLino$hasilKerjaSiswaArgs<ExtArgs>
    _count?: boolean | PenugasanLinoCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $PenugasanLinoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PenugasanLino"
    objects: {
      hasilKerjaSiswa: Prisma.$HasilKerjaSiswaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      judul: string
      tipe: $Enums.TipeSoal
      deskripsi: string | null
      tahunAjaranId: string
      kelasId: string | null
      guruId: string
      waktuMulai: Date
      waktuSelesai: Date
      status: $Enums.StatusTugas
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["penugasanLino"]>
    composites: {}
  }

  type PenugasanLinoGetPayload<S extends boolean | null | undefined | PenugasanLinoDefaultArgs> = $Result.GetResult<Prisma.$PenugasanLinoPayload, S>

  type PenugasanLinoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PenugasanLinoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PenugasanLinoCountAggregateInputType | true
    }

  export interface PenugasanLinoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PenugasanLino'], meta: { name: 'PenugasanLino' } }
    /**
     * Find zero or one PenugasanLino that matches the filter.
     * @param {PenugasanLinoFindUniqueArgs} args - Arguments to find a PenugasanLino
     * @example
     * // Get one PenugasanLino
     * const penugasanLino = await prisma.penugasanLino.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PenugasanLinoFindUniqueArgs>(args: SelectSubset<T, PenugasanLinoFindUniqueArgs<ExtArgs>>): Prisma__PenugasanLinoClient<$Result.GetResult<Prisma.$PenugasanLinoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PenugasanLino that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PenugasanLinoFindUniqueOrThrowArgs} args - Arguments to find a PenugasanLino
     * @example
     * // Get one PenugasanLino
     * const penugasanLino = await prisma.penugasanLino.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PenugasanLinoFindUniqueOrThrowArgs>(args: SelectSubset<T, PenugasanLinoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PenugasanLinoClient<$Result.GetResult<Prisma.$PenugasanLinoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PenugasanLino that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PenugasanLinoFindFirstArgs} args - Arguments to find a PenugasanLino
     * @example
     * // Get one PenugasanLino
     * const penugasanLino = await prisma.penugasanLino.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PenugasanLinoFindFirstArgs>(args?: SelectSubset<T, PenugasanLinoFindFirstArgs<ExtArgs>>): Prisma__PenugasanLinoClient<$Result.GetResult<Prisma.$PenugasanLinoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PenugasanLino that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PenugasanLinoFindFirstOrThrowArgs} args - Arguments to find a PenugasanLino
     * @example
     * // Get one PenugasanLino
     * const penugasanLino = await prisma.penugasanLino.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PenugasanLinoFindFirstOrThrowArgs>(args?: SelectSubset<T, PenugasanLinoFindFirstOrThrowArgs<ExtArgs>>): Prisma__PenugasanLinoClient<$Result.GetResult<Prisma.$PenugasanLinoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PenugasanLinos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PenugasanLinoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PenugasanLinos
     * const penugasanLinos = await prisma.penugasanLino.findMany()
     * 
     * // Get first 10 PenugasanLinos
     * const penugasanLinos = await prisma.penugasanLino.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const penugasanLinoWithIdOnly = await prisma.penugasanLino.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PenugasanLinoFindManyArgs>(args?: SelectSubset<T, PenugasanLinoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PenugasanLinoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PenugasanLino.
     * @param {PenugasanLinoCreateArgs} args - Arguments to create a PenugasanLino.
     * @example
     * // Create one PenugasanLino
     * const PenugasanLino = await prisma.penugasanLino.create({
     *   data: {
     *     // ... data to create a PenugasanLino
     *   }
     * })
     * 
     */
    create<T extends PenugasanLinoCreateArgs>(args: SelectSubset<T, PenugasanLinoCreateArgs<ExtArgs>>): Prisma__PenugasanLinoClient<$Result.GetResult<Prisma.$PenugasanLinoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PenugasanLinos.
     * @param {PenugasanLinoCreateManyArgs} args - Arguments to create many PenugasanLinos.
     * @example
     * // Create many PenugasanLinos
     * const penugasanLino = await prisma.penugasanLino.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PenugasanLinoCreateManyArgs>(args?: SelectSubset<T, PenugasanLinoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PenugasanLino.
     * @param {PenugasanLinoDeleteArgs} args - Arguments to delete one PenugasanLino.
     * @example
     * // Delete one PenugasanLino
     * const PenugasanLino = await prisma.penugasanLino.delete({
     *   where: {
     *     // ... filter to delete one PenugasanLino
     *   }
     * })
     * 
     */
    delete<T extends PenugasanLinoDeleteArgs>(args: SelectSubset<T, PenugasanLinoDeleteArgs<ExtArgs>>): Prisma__PenugasanLinoClient<$Result.GetResult<Prisma.$PenugasanLinoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PenugasanLino.
     * @param {PenugasanLinoUpdateArgs} args - Arguments to update one PenugasanLino.
     * @example
     * // Update one PenugasanLino
     * const penugasanLino = await prisma.penugasanLino.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PenugasanLinoUpdateArgs>(args: SelectSubset<T, PenugasanLinoUpdateArgs<ExtArgs>>): Prisma__PenugasanLinoClient<$Result.GetResult<Prisma.$PenugasanLinoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PenugasanLinos.
     * @param {PenugasanLinoDeleteManyArgs} args - Arguments to filter PenugasanLinos to delete.
     * @example
     * // Delete a few PenugasanLinos
     * const { count } = await prisma.penugasanLino.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PenugasanLinoDeleteManyArgs>(args?: SelectSubset<T, PenugasanLinoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PenugasanLinos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PenugasanLinoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PenugasanLinos
     * const penugasanLino = await prisma.penugasanLino.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PenugasanLinoUpdateManyArgs>(args: SelectSubset<T, PenugasanLinoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PenugasanLino.
     * @param {PenugasanLinoUpsertArgs} args - Arguments to update or create a PenugasanLino.
     * @example
     * // Update or create a PenugasanLino
     * const penugasanLino = await prisma.penugasanLino.upsert({
     *   create: {
     *     // ... data to create a PenugasanLino
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PenugasanLino we want to update
     *   }
     * })
     */
    upsert<T extends PenugasanLinoUpsertArgs>(args: SelectSubset<T, PenugasanLinoUpsertArgs<ExtArgs>>): Prisma__PenugasanLinoClient<$Result.GetResult<Prisma.$PenugasanLinoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PenugasanLinos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PenugasanLinoCountArgs} args - Arguments to filter PenugasanLinos to count.
     * @example
     * // Count the number of PenugasanLinos
     * const count = await prisma.penugasanLino.count({
     *   where: {
     *     // ... the filter for the PenugasanLinos we want to count
     *   }
     * })
    **/
    count<T extends PenugasanLinoCountArgs>(
      args?: Subset<T, PenugasanLinoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PenugasanLinoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PenugasanLino.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PenugasanLinoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PenugasanLinoAggregateArgs>(args: Subset<T, PenugasanLinoAggregateArgs>): Prisma.PrismaPromise<GetPenugasanLinoAggregateType<T>>

    /**
     * Group by PenugasanLino.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PenugasanLinoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PenugasanLinoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PenugasanLinoGroupByArgs['orderBy'] }
        : { orderBy?: PenugasanLinoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PenugasanLinoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPenugasanLinoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PenugasanLino model
   */
  readonly fields: PenugasanLinoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PenugasanLino.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PenugasanLinoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    hasilKerjaSiswa<T extends PenugasanLino$hasilKerjaSiswaArgs<ExtArgs> = {}>(args?: Subset<T, PenugasanLino$hasilKerjaSiswaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HasilKerjaSiswaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PenugasanLino model
   */
  interface PenugasanLinoFieldRefs {
    readonly id: FieldRef<"PenugasanLino", 'String'>
    readonly judul: FieldRef<"PenugasanLino", 'String'>
    readonly tipe: FieldRef<"PenugasanLino", 'TipeSoal'>
    readonly deskripsi: FieldRef<"PenugasanLino", 'String'>
    readonly tahunAjaranId: FieldRef<"PenugasanLino", 'String'>
    readonly kelasId: FieldRef<"PenugasanLino", 'String'>
    readonly guruId: FieldRef<"PenugasanLino", 'String'>
    readonly waktuMulai: FieldRef<"PenugasanLino", 'DateTime'>
    readonly waktuSelesai: FieldRef<"PenugasanLino", 'DateTime'>
    readonly status: FieldRef<"PenugasanLino", 'StatusTugas'>
    readonly createdAt: FieldRef<"PenugasanLino", 'DateTime'>
    readonly updatedAt: FieldRef<"PenugasanLino", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PenugasanLino findUnique
   */
  export type PenugasanLinoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PenugasanLino
     */
    select?: PenugasanLinoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PenugasanLino
     */
    omit?: PenugasanLinoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenugasanLinoInclude<ExtArgs> | null
    /**
     * Filter, which PenugasanLino to fetch.
     */
    where: PenugasanLinoWhereUniqueInput
  }

  /**
   * PenugasanLino findUniqueOrThrow
   */
  export type PenugasanLinoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PenugasanLino
     */
    select?: PenugasanLinoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PenugasanLino
     */
    omit?: PenugasanLinoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenugasanLinoInclude<ExtArgs> | null
    /**
     * Filter, which PenugasanLino to fetch.
     */
    where: PenugasanLinoWhereUniqueInput
  }

  /**
   * PenugasanLino findFirst
   */
  export type PenugasanLinoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PenugasanLino
     */
    select?: PenugasanLinoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PenugasanLino
     */
    omit?: PenugasanLinoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenugasanLinoInclude<ExtArgs> | null
    /**
     * Filter, which PenugasanLino to fetch.
     */
    where?: PenugasanLinoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PenugasanLinos to fetch.
     */
    orderBy?: PenugasanLinoOrderByWithRelationInput | PenugasanLinoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PenugasanLinos.
     */
    cursor?: PenugasanLinoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PenugasanLinos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PenugasanLinos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PenugasanLinos.
     */
    distinct?: PenugasanLinoScalarFieldEnum | PenugasanLinoScalarFieldEnum[]
  }

  /**
   * PenugasanLino findFirstOrThrow
   */
  export type PenugasanLinoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PenugasanLino
     */
    select?: PenugasanLinoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PenugasanLino
     */
    omit?: PenugasanLinoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenugasanLinoInclude<ExtArgs> | null
    /**
     * Filter, which PenugasanLino to fetch.
     */
    where?: PenugasanLinoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PenugasanLinos to fetch.
     */
    orderBy?: PenugasanLinoOrderByWithRelationInput | PenugasanLinoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PenugasanLinos.
     */
    cursor?: PenugasanLinoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PenugasanLinos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PenugasanLinos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PenugasanLinos.
     */
    distinct?: PenugasanLinoScalarFieldEnum | PenugasanLinoScalarFieldEnum[]
  }

  /**
   * PenugasanLino findMany
   */
  export type PenugasanLinoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PenugasanLino
     */
    select?: PenugasanLinoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PenugasanLino
     */
    omit?: PenugasanLinoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenugasanLinoInclude<ExtArgs> | null
    /**
     * Filter, which PenugasanLinos to fetch.
     */
    where?: PenugasanLinoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PenugasanLinos to fetch.
     */
    orderBy?: PenugasanLinoOrderByWithRelationInput | PenugasanLinoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PenugasanLinos.
     */
    cursor?: PenugasanLinoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PenugasanLinos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PenugasanLinos.
     */
    skip?: number
    distinct?: PenugasanLinoScalarFieldEnum | PenugasanLinoScalarFieldEnum[]
  }

  /**
   * PenugasanLino create
   */
  export type PenugasanLinoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PenugasanLino
     */
    select?: PenugasanLinoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PenugasanLino
     */
    omit?: PenugasanLinoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenugasanLinoInclude<ExtArgs> | null
    /**
     * The data needed to create a PenugasanLino.
     */
    data: XOR<PenugasanLinoCreateInput, PenugasanLinoUncheckedCreateInput>
  }

  /**
   * PenugasanLino createMany
   */
  export type PenugasanLinoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PenugasanLinos.
     */
    data: PenugasanLinoCreateManyInput | PenugasanLinoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PenugasanLino update
   */
  export type PenugasanLinoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PenugasanLino
     */
    select?: PenugasanLinoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PenugasanLino
     */
    omit?: PenugasanLinoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenugasanLinoInclude<ExtArgs> | null
    /**
     * The data needed to update a PenugasanLino.
     */
    data: XOR<PenugasanLinoUpdateInput, PenugasanLinoUncheckedUpdateInput>
    /**
     * Choose, which PenugasanLino to update.
     */
    where: PenugasanLinoWhereUniqueInput
  }

  /**
   * PenugasanLino updateMany
   */
  export type PenugasanLinoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PenugasanLinos.
     */
    data: XOR<PenugasanLinoUpdateManyMutationInput, PenugasanLinoUncheckedUpdateManyInput>
    /**
     * Filter which PenugasanLinos to update
     */
    where?: PenugasanLinoWhereInput
    /**
     * Limit how many PenugasanLinos to update.
     */
    limit?: number
  }

  /**
   * PenugasanLino upsert
   */
  export type PenugasanLinoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PenugasanLino
     */
    select?: PenugasanLinoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PenugasanLino
     */
    omit?: PenugasanLinoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenugasanLinoInclude<ExtArgs> | null
    /**
     * The filter to search for the PenugasanLino to update in case it exists.
     */
    where: PenugasanLinoWhereUniqueInput
    /**
     * In case the PenugasanLino found by the `where` argument doesn't exist, create a new PenugasanLino with this data.
     */
    create: XOR<PenugasanLinoCreateInput, PenugasanLinoUncheckedCreateInput>
    /**
     * In case the PenugasanLino was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PenugasanLinoUpdateInput, PenugasanLinoUncheckedUpdateInput>
  }

  /**
   * PenugasanLino delete
   */
  export type PenugasanLinoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PenugasanLino
     */
    select?: PenugasanLinoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PenugasanLino
     */
    omit?: PenugasanLinoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenugasanLinoInclude<ExtArgs> | null
    /**
     * Filter which PenugasanLino to delete.
     */
    where: PenugasanLinoWhereUniqueInput
  }

  /**
   * PenugasanLino deleteMany
   */
  export type PenugasanLinoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PenugasanLinos to delete
     */
    where?: PenugasanLinoWhereInput
    /**
     * Limit how many PenugasanLinos to delete.
     */
    limit?: number
  }

  /**
   * PenugasanLino.hasilKerjaSiswa
   */
  export type PenugasanLino$hasilKerjaSiswaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HasilKerjaSiswa
     */
    select?: HasilKerjaSiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HasilKerjaSiswa
     */
    omit?: HasilKerjaSiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HasilKerjaSiswaInclude<ExtArgs> | null
    where?: HasilKerjaSiswaWhereInput
    orderBy?: HasilKerjaSiswaOrderByWithRelationInput | HasilKerjaSiswaOrderByWithRelationInput[]
    cursor?: HasilKerjaSiswaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HasilKerjaSiswaScalarFieldEnum | HasilKerjaSiswaScalarFieldEnum[]
  }

  /**
   * PenugasanLino without action
   */
  export type PenugasanLinoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PenugasanLino
     */
    select?: PenugasanLinoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PenugasanLino
     */
    omit?: PenugasanLinoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenugasanLinoInclude<ExtArgs> | null
  }


  /**
   * Model HasilKerjaSiswa
   */

  export type AggregateHasilKerjaSiswa = {
    _count: HasilKerjaSiswaCountAggregateOutputType | null
    _avg: HasilKerjaSiswaAvgAggregateOutputType | null
    _sum: HasilKerjaSiswaSumAggregateOutputType | null
    _min: HasilKerjaSiswaMinAggregateOutputType | null
    _max: HasilKerjaSiswaMaxAggregateOutputType | null
  }

  export type HasilKerjaSiswaAvgAggregateOutputType = {
    nilaiAkhir: number | null
  }

  export type HasilKerjaSiswaSumAggregateOutputType = {
    nilaiAkhir: number | null
  }

  export type HasilKerjaSiswaMinAggregateOutputType = {
    id: string | null
    penugasanId: string | null
    siswaId: string | null
    fileJawabanPdf: string | null
    nilaiAkhir: number | null
    statusPengerjaan: string | null
    catatanGuru: string | null
    waktuMulai: Date | null
    waktuSelesai: Date | null
  }

  export type HasilKerjaSiswaMaxAggregateOutputType = {
    id: string | null
    penugasanId: string | null
    siswaId: string | null
    fileJawabanPdf: string | null
    nilaiAkhir: number | null
    statusPengerjaan: string | null
    catatanGuru: string | null
    waktuMulai: Date | null
    waktuSelesai: Date | null
  }

  export type HasilKerjaSiswaCountAggregateOutputType = {
    id: number
    penugasanId: number
    siswaId: number
    fileJawabanPdf: number
    nilaiAkhir: number
    statusPengerjaan: number
    catatanGuru: number
    waktuMulai: number
    waktuSelesai: number
    _all: number
  }


  export type HasilKerjaSiswaAvgAggregateInputType = {
    nilaiAkhir?: true
  }

  export type HasilKerjaSiswaSumAggregateInputType = {
    nilaiAkhir?: true
  }

  export type HasilKerjaSiswaMinAggregateInputType = {
    id?: true
    penugasanId?: true
    siswaId?: true
    fileJawabanPdf?: true
    nilaiAkhir?: true
    statusPengerjaan?: true
    catatanGuru?: true
    waktuMulai?: true
    waktuSelesai?: true
  }

  export type HasilKerjaSiswaMaxAggregateInputType = {
    id?: true
    penugasanId?: true
    siswaId?: true
    fileJawabanPdf?: true
    nilaiAkhir?: true
    statusPengerjaan?: true
    catatanGuru?: true
    waktuMulai?: true
    waktuSelesai?: true
  }

  export type HasilKerjaSiswaCountAggregateInputType = {
    id?: true
    penugasanId?: true
    siswaId?: true
    fileJawabanPdf?: true
    nilaiAkhir?: true
    statusPengerjaan?: true
    catatanGuru?: true
    waktuMulai?: true
    waktuSelesai?: true
    _all?: true
  }

  export type HasilKerjaSiswaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HasilKerjaSiswa to aggregate.
     */
    where?: HasilKerjaSiswaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HasilKerjaSiswas to fetch.
     */
    orderBy?: HasilKerjaSiswaOrderByWithRelationInput | HasilKerjaSiswaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HasilKerjaSiswaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HasilKerjaSiswas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HasilKerjaSiswas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HasilKerjaSiswas
    **/
    _count?: true | HasilKerjaSiswaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HasilKerjaSiswaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HasilKerjaSiswaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HasilKerjaSiswaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HasilKerjaSiswaMaxAggregateInputType
  }

  export type GetHasilKerjaSiswaAggregateType<T extends HasilKerjaSiswaAggregateArgs> = {
        [P in keyof T & keyof AggregateHasilKerjaSiswa]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHasilKerjaSiswa[P]>
      : GetScalarType<T[P], AggregateHasilKerjaSiswa[P]>
  }




  export type HasilKerjaSiswaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HasilKerjaSiswaWhereInput
    orderBy?: HasilKerjaSiswaOrderByWithAggregationInput | HasilKerjaSiswaOrderByWithAggregationInput[]
    by: HasilKerjaSiswaScalarFieldEnum[] | HasilKerjaSiswaScalarFieldEnum
    having?: HasilKerjaSiswaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HasilKerjaSiswaCountAggregateInputType | true
    _avg?: HasilKerjaSiswaAvgAggregateInputType
    _sum?: HasilKerjaSiswaSumAggregateInputType
    _min?: HasilKerjaSiswaMinAggregateInputType
    _max?: HasilKerjaSiswaMaxAggregateInputType
  }

  export type HasilKerjaSiswaGroupByOutputType = {
    id: string
    penugasanId: string
    siswaId: string
    fileJawabanPdf: string | null
    nilaiAkhir: number | null
    statusPengerjaan: string
    catatanGuru: string | null
    waktuMulai: Date | null
    waktuSelesai: Date | null
    _count: HasilKerjaSiswaCountAggregateOutputType | null
    _avg: HasilKerjaSiswaAvgAggregateOutputType | null
    _sum: HasilKerjaSiswaSumAggregateOutputType | null
    _min: HasilKerjaSiswaMinAggregateOutputType | null
    _max: HasilKerjaSiswaMaxAggregateOutputType | null
  }

  type GetHasilKerjaSiswaGroupByPayload<T extends HasilKerjaSiswaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HasilKerjaSiswaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HasilKerjaSiswaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HasilKerjaSiswaGroupByOutputType[P]>
            : GetScalarType<T[P], HasilKerjaSiswaGroupByOutputType[P]>
        }
      >
    >


  export type HasilKerjaSiswaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    penugasanId?: boolean
    siswaId?: boolean
    fileJawabanPdf?: boolean
    nilaiAkhir?: boolean
    statusPengerjaan?: boolean
    catatanGuru?: boolean
    waktuMulai?: boolean
    waktuSelesai?: boolean
    penugasan?: boolean | PenugasanLinoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hasilKerjaSiswa"]>



  export type HasilKerjaSiswaSelectScalar = {
    id?: boolean
    penugasanId?: boolean
    siswaId?: boolean
    fileJawabanPdf?: boolean
    nilaiAkhir?: boolean
    statusPengerjaan?: boolean
    catatanGuru?: boolean
    waktuMulai?: boolean
    waktuSelesai?: boolean
  }

  export type HasilKerjaSiswaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "penugasanId" | "siswaId" | "fileJawabanPdf" | "nilaiAkhir" | "statusPengerjaan" | "catatanGuru" | "waktuMulai" | "waktuSelesai", ExtArgs["result"]["hasilKerjaSiswa"]>
  export type HasilKerjaSiswaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    penugasan?: boolean | PenugasanLinoDefaultArgs<ExtArgs>
  }

  export type $HasilKerjaSiswaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HasilKerjaSiswa"
    objects: {
      penugasan: Prisma.$PenugasanLinoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      penugasanId: string
      siswaId: string
      fileJawabanPdf: string | null
      nilaiAkhir: number | null
      statusPengerjaan: string
      catatanGuru: string | null
      waktuMulai: Date | null
      waktuSelesai: Date | null
    }, ExtArgs["result"]["hasilKerjaSiswa"]>
    composites: {}
  }

  type HasilKerjaSiswaGetPayload<S extends boolean | null | undefined | HasilKerjaSiswaDefaultArgs> = $Result.GetResult<Prisma.$HasilKerjaSiswaPayload, S>

  type HasilKerjaSiswaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HasilKerjaSiswaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HasilKerjaSiswaCountAggregateInputType | true
    }

  export interface HasilKerjaSiswaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HasilKerjaSiswa'], meta: { name: 'HasilKerjaSiswa' } }
    /**
     * Find zero or one HasilKerjaSiswa that matches the filter.
     * @param {HasilKerjaSiswaFindUniqueArgs} args - Arguments to find a HasilKerjaSiswa
     * @example
     * // Get one HasilKerjaSiswa
     * const hasilKerjaSiswa = await prisma.hasilKerjaSiswa.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HasilKerjaSiswaFindUniqueArgs>(args: SelectSubset<T, HasilKerjaSiswaFindUniqueArgs<ExtArgs>>): Prisma__HasilKerjaSiswaClient<$Result.GetResult<Prisma.$HasilKerjaSiswaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HasilKerjaSiswa that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HasilKerjaSiswaFindUniqueOrThrowArgs} args - Arguments to find a HasilKerjaSiswa
     * @example
     * // Get one HasilKerjaSiswa
     * const hasilKerjaSiswa = await prisma.hasilKerjaSiswa.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HasilKerjaSiswaFindUniqueOrThrowArgs>(args: SelectSubset<T, HasilKerjaSiswaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HasilKerjaSiswaClient<$Result.GetResult<Prisma.$HasilKerjaSiswaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HasilKerjaSiswa that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HasilKerjaSiswaFindFirstArgs} args - Arguments to find a HasilKerjaSiswa
     * @example
     * // Get one HasilKerjaSiswa
     * const hasilKerjaSiswa = await prisma.hasilKerjaSiswa.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HasilKerjaSiswaFindFirstArgs>(args?: SelectSubset<T, HasilKerjaSiswaFindFirstArgs<ExtArgs>>): Prisma__HasilKerjaSiswaClient<$Result.GetResult<Prisma.$HasilKerjaSiswaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HasilKerjaSiswa that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HasilKerjaSiswaFindFirstOrThrowArgs} args - Arguments to find a HasilKerjaSiswa
     * @example
     * // Get one HasilKerjaSiswa
     * const hasilKerjaSiswa = await prisma.hasilKerjaSiswa.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HasilKerjaSiswaFindFirstOrThrowArgs>(args?: SelectSubset<T, HasilKerjaSiswaFindFirstOrThrowArgs<ExtArgs>>): Prisma__HasilKerjaSiswaClient<$Result.GetResult<Prisma.$HasilKerjaSiswaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HasilKerjaSiswas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HasilKerjaSiswaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HasilKerjaSiswas
     * const hasilKerjaSiswas = await prisma.hasilKerjaSiswa.findMany()
     * 
     * // Get first 10 HasilKerjaSiswas
     * const hasilKerjaSiswas = await prisma.hasilKerjaSiswa.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hasilKerjaSiswaWithIdOnly = await prisma.hasilKerjaSiswa.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HasilKerjaSiswaFindManyArgs>(args?: SelectSubset<T, HasilKerjaSiswaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HasilKerjaSiswaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HasilKerjaSiswa.
     * @param {HasilKerjaSiswaCreateArgs} args - Arguments to create a HasilKerjaSiswa.
     * @example
     * // Create one HasilKerjaSiswa
     * const HasilKerjaSiswa = await prisma.hasilKerjaSiswa.create({
     *   data: {
     *     // ... data to create a HasilKerjaSiswa
     *   }
     * })
     * 
     */
    create<T extends HasilKerjaSiswaCreateArgs>(args: SelectSubset<T, HasilKerjaSiswaCreateArgs<ExtArgs>>): Prisma__HasilKerjaSiswaClient<$Result.GetResult<Prisma.$HasilKerjaSiswaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HasilKerjaSiswas.
     * @param {HasilKerjaSiswaCreateManyArgs} args - Arguments to create many HasilKerjaSiswas.
     * @example
     * // Create many HasilKerjaSiswas
     * const hasilKerjaSiswa = await prisma.hasilKerjaSiswa.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HasilKerjaSiswaCreateManyArgs>(args?: SelectSubset<T, HasilKerjaSiswaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a HasilKerjaSiswa.
     * @param {HasilKerjaSiswaDeleteArgs} args - Arguments to delete one HasilKerjaSiswa.
     * @example
     * // Delete one HasilKerjaSiswa
     * const HasilKerjaSiswa = await prisma.hasilKerjaSiswa.delete({
     *   where: {
     *     // ... filter to delete one HasilKerjaSiswa
     *   }
     * })
     * 
     */
    delete<T extends HasilKerjaSiswaDeleteArgs>(args: SelectSubset<T, HasilKerjaSiswaDeleteArgs<ExtArgs>>): Prisma__HasilKerjaSiswaClient<$Result.GetResult<Prisma.$HasilKerjaSiswaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HasilKerjaSiswa.
     * @param {HasilKerjaSiswaUpdateArgs} args - Arguments to update one HasilKerjaSiswa.
     * @example
     * // Update one HasilKerjaSiswa
     * const hasilKerjaSiswa = await prisma.hasilKerjaSiswa.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HasilKerjaSiswaUpdateArgs>(args: SelectSubset<T, HasilKerjaSiswaUpdateArgs<ExtArgs>>): Prisma__HasilKerjaSiswaClient<$Result.GetResult<Prisma.$HasilKerjaSiswaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HasilKerjaSiswas.
     * @param {HasilKerjaSiswaDeleteManyArgs} args - Arguments to filter HasilKerjaSiswas to delete.
     * @example
     * // Delete a few HasilKerjaSiswas
     * const { count } = await prisma.hasilKerjaSiswa.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HasilKerjaSiswaDeleteManyArgs>(args?: SelectSubset<T, HasilKerjaSiswaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HasilKerjaSiswas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HasilKerjaSiswaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HasilKerjaSiswas
     * const hasilKerjaSiswa = await prisma.hasilKerjaSiswa.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HasilKerjaSiswaUpdateManyArgs>(args: SelectSubset<T, HasilKerjaSiswaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one HasilKerjaSiswa.
     * @param {HasilKerjaSiswaUpsertArgs} args - Arguments to update or create a HasilKerjaSiswa.
     * @example
     * // Update or create a HasilKerjaSiswa
     * const hasilKerjaSiswa = await prisma.hasilKerjaSiswa.upsert({
     *   create: {
     *     // ... data to create a HasilKerjaSiswa
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HasilKerjaSiswa we want to update
     *   }
     * })
     */
    upsert<T extends HasilKerjaSiswaUpsertArgs>(args: SelectSubset<T, HasilKerjaSiswaUpsertArgs<ExtArgs>>): Prisma__HasilKerjaSiswaClient<$Result.GetResult<Prisma.$HasilKerjaSiswaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HasilKerjaSiswas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HasilKerjaSiswaCountArgs} args - Arguments to filter HasilKerjaSiswas to count.
     * @example
     * // Count the number of HasilKerjaSiswas
     * const count = await prisma.hasilKerjaSiswa.count({
     *   where: {
     *     // ... the filter for the HasilKerjaSiswas we want to count
     *   }
     * })
    **/
    count<T extends HasilKerjaSiswaCountArgs>(
      args?: Subset<T, HasilKerjaSiswaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HasilKerjaSiswaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HasilKerjaSiswa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HasilKerjaSiswaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HasilKerjaSiswaAggregateArgs>(args: Subset<T, HasilKerjaSiswaAggregateArgs>): Prisma.PrismaPromise<GetHasilKerjaSiswaAggregateType<T>>

    /**
     * Group by HasilKerjaSiswa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HasilKerjaSiswaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HasilKerjaSiswaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HasilKerjaSiswaGroupByArgs['orderBy'] }
        : { orderBy?: HasilKerjaSiswaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HasilKerjaSiswaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHasilKerjaSiswaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HasilKerjaSiswa model
   */
  readonly fields: HasilKerjaSiswaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HasilKerjaSiswa.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HasilKerjaSiswaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    penugasan<T extends PenugasanLinoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PenugasanLinoDefaultArgs<ExtArgs>>): Prisma__PenugasanLinoClient<$Result.GetResult<Prisma.$PenugasanLinoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HasilKerjaSiswa model
   */
  interface HasilKerjaSiswaFieldRefs {
    readonly id: FieldRef<"HasilKerjaSiswa", 'String'>
    readonly penugasanId: FieldRef<"HasilKerjaSiswa", 'String'>
    readonly siswaId: FieldRef<"HasilKerjaSiswa", 'String'>
    readonly fileJawabanPdf: FieldRef<"HasilKerjaSiswa", 'String'>
    readonly nilaiAkhir: FieldRef<"HasilKerjaSiswa", 'Float'>
    readonly statusPengerjaan: FieldRef<"HasilKerjaSiswa", 'String'>
    readonly catatanGuru: FieldRef<"HasilKerjaSiswa", 'String'>
    readonly waktuMulai: FieldRef<"HasilKerjaSiswa", 'DateTime'>
    readonly waktuSelesai: FieldRef<"HasilKerjaSiswa", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HasilKerjaSiswa findUnique
   */
  export type HasilKerjaSiswaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HasilKerjaSiswa
     */
    select?: HasilKerjaSiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HasilKerjaSiswa
     */
    omit?: HasilKerjaSiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HasilKerjaSiswaInclude<ExtArgs> | null
    /**
     * Filter, which HasilKerjaSiswa to fetch.
     */
    where: HasilKerjaSiswaWhereUniqueInput
  }

  /**
   * HasilKerjaSiswa findUniqueOrThrow
   */
  export type HasilKerjaSiswaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HasilKerjaSiswa
     */
    select?: HasilKerjaSiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HasilKerjaSiswa
     */
    omit?: HasilKerjaSiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HasilKerjaSiswaInclude<ExtArgs> | null
    /**
     * Filter, which HasilKerjaSiswa to fetch.
     */
    where: HasilKerjaSiswaWhereUniqueInput
  }

  /**
   * HasilKerjaSiswa findFirst
   */
  export type HasilKerjaSiswaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HasilKerjaSiswa
     */
    select?: HasilKerjaSiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HasilKerjaSiswa
     */
    omit?: HasilKerjaSiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HasilKerjaSiswaInclude<ExtArgs> | null
    /**
     * Filter, which HasilKerjaSiswa to fetch.
     */
    where?: HasilKerjaSiswaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HasilKerjaSiswas to fetch.
     */
    orderBy?: HasilKerjaSiswaOrderByWithRelationInput | HasilKerjaSiswaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HasilKerjaSiswas.
     */
    cursor?: HasilKerjaSiswaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HasilKerjaSiswas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HasilKerjaSiswas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HasilKerjaSiswas.
     */
    distinct?: HasilKerjaSiswaScalarFieldEnum | HasilKerjaSiswaScalarFieldEnum[]
  }

  /**
   * HasilKerjaSiswa findFirstOrThrow
   */
  export type HasilKerjaSiswaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HasilKerjaSiswa
     */
    select?: HasilKerjaSiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HasilKerjaSiswa
     */
    omit?: HasilKerjaSiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HasilKerjaSiswaInclude<ExtArgs> | null
    /**
     * Filter, which HasilKerjaSiswa to fetch.
     */
    where?: HasilKerjaSiswaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HasilKerjaSiswas to fetch.
     */
    orderBy?: HasilKerjaSiswaOrderByWithRelationInput | HasilKerjaSiswaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HasilKerjaSiswas.
     */
    cursor?: HasilKerjaSiswaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HasilKerjaSiswas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HasilKerjaSiswas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HasilKerjaSiswas.
     */
    distinct?: HasilKerjaSiswaScalarFieldEnum | HasilKerjaSiswaScalarFieldEnum[]
  }

  /**
   * HasilKerjaSiswa findMany
   */
  export type HasilKerjaSiswaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HasilKerjaSiswa
     */
    select?: HasilKerjaSiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HasilKerjaSiswa
     */
    omit?: HasilKerjaSiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HasilKerjaSiswaInclude<ExtArgs> | null
    /**
     * Filter, which HasilKerjaSiswas to fetch.
     */
    where?: HasilKerjaSiswaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HasilKerjaSiswas to fetch.
     */
    orderBy?: HasilKerjaSiswaOrderByWithRelationInput | HasilKerjaSiswaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HasilKerjaSiswas.
     */
    cursor?: HasilKerjaSiswaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HasilKerjaSiswas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HasilKerjaSiswas.
     */
    skip?: number
    distinct?: HasilKerjaSiswaScalarFieldEnum | HasilKerjaSiswaScalarFieldEnum[]
  }

  /**
   * HasilKerjaSiswa create
   */
  export type HasilKerjaSiswaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HasilKerjaSiswa
     */
    select?: HasilKerjaSiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HasilKerjaSiswa
     */
    omit?: HasilKerjaSiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HasilKerjaSiswaInclude<ExtArgs> | null
    /**
     * The data needed to create a HasilKerjaSiswa.
     */
    data: XOR<HasilKerjaSiswaCreateInput, HasilKerjaSiswaUncheckedCreateInput>
  }

  /**
   * HasilKerjaSiswa createMany
   */
  export type HasilKerjaSiswaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HasilKerjaSiswas.
     */
    data: HasilKerjaSiswaCreateManyInput | HasilKerjaSiswaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HasilKerjaSiswa update
   */
  export type HasilKerjaSiswaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HasilKerjaSiswa
     */
    select?: HasilKerjaSiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HasilKerjaSiswa
     */
    omit?: HasilKerjaSiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HasilKerjaSiswaInclude<ExtArgs> | null
    /**
     * The data needed to update a HasilKerjaSiswa.
     */
    data: XOR<HasilKerjaSiswaUpdateInput, HasilKerjaSiswaUncheckedUpdateInput>
    /**
     * Choose, which HasilKerjaSiswa to update.
     */
    where: HasilKerjaSiswaWhereUniqueInput
  }

  /**
   * HasilKerjaSiswa updateMany
   */
  export type HasilKerjaSiswaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HasilKerjaSiswas.
     */
    data: XOR<HasilKerjaSiswaUpdateManyMutationInput, HasilKerjaSiswaUncheckedUpdateManyInput>
    /**
     * Filter which HasilKerjaSiswas to update
     */
    where?: HasilKerjaSiswaWhereInput
    /**
     * Limit how many HasilKerjaSiswas to update.
     */
    limit?: number
  }

  /**
   * HasilKerjaSiswa upsert
   */
  export type HasilKerjaSiswaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HasilKerjaSiswa
     */
    select?: HasilKerjaSiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HasilKerjaSiswa
     */
    omit?: HasilKerjaSiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HasilKerjaSiswaInclude<ExtArgs> | null
    /**
     * The filter to search for the HasilKerjaSiswa to update in case it exists.
     */
    where: HasilKerjaSiswaWhereUniqueInput
    /**
     * In case the HasilKerjaSiswa found by the `where` argument doesn't exist, create a new HasilKerjaSiswa with this data.
     */
    create: XOR<HasilKerjaSiswaCreateInput, HasilKerjaSiswaUncheckedCreateInput>
    /**
     * In case the HasilKerjaSiswa was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HasilKerjaSiswaUpdateInput, HasilKerjaSiswaUncheckedUpdateInput>
  }

  /**
   * HasilKerjaSiswa delete
   */
  export type HasilKerjaSiswaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HasilKerjaSiswa
     */
    select?: HasilKerjaSiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HasilKerjaSiswa
     */
    omit?: HasilKerjaSiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HasilKerjaSiswaInclude<ExtArgs> | null
    /**
     * Filter which HasilKerjaSiswa to delete.
     */
    where: HasilKerjaSiswaWhereUniqueInput
  }

  /**
   * HasilKerjaSiswa deleteMany
   */
  export type HasilKerjaSiswaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HasilKerjaSiswas to delete
     */
    where?: HasilKerjaSiswaWhereInput
    /**
     * Limit how many HasilKerjaSiswas to delete.
     */
    limit?: number
  }

  /**
   * HasilKerjaSiswa without action
   */
  export type HasilKerjaSiswaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HasilKerjaSiswa
     */
    select?: HasilKerjaSiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HasilKerjaSiswa
     */
    omit?: HasilKerjaSiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HasilKerjaSiswaInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const BankSoalScalarFieldEnum: {
    id: 'id',
    tipe: 'tipe',
    tingkat: 'tingkat',
    pertanyaan: 'pertanyaan',
    opsiA: 'opsiA',
    opsiB: 'opsiB',
    opsiC: 'opsiC',
    opsiD: 'opsiD',
    opsiE: 'opsiE',
    kunciBenar: 'kunciBenar',
    bobotNilai: 'bobotNilai',
    pembuatId: 'pembuatId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BankSoalScalarFieldEnum = (typeof BankSoalScalarFieldEnum)[keyof typeof BankSoalScalarFieldEnum]


  export const PenugasanLinoScalarFieldEnum: {
    id: 'id',
    judul: 'judul',
    tipe: 'tipe',
    deskripsi: 'deskripsi',
    tahunAjaranId: 'tahunAjaranId',
    kelasId: 'kelasId',
    guruId: 'guruId',
    waktuMulai: 'waktuMulai',
    waktuSelesai: 'waktuSelesai',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PenugasanLinoScalarFieldEnum = (typeof PenugasanLinoScalarFieldEnum)[keyof typeof PenugasanLinoScalarFieldEnum]


  export const HasilKerjaSiswaScalarFieldEnum: {
    id: 'id',
    penugasanId: 'penugasanId',
    siswaId: 'siswaId',
    fileJawabanPdf: 'fileJawabanPdf',
    nilaiAkhir: 'nilaiAkhir',
    statusPengerjaan: 'statusPengerjaan',
    catatanGuru: 'catatanGuru',
    waktuMulai: 'waktuMulai',
    waktuSelesai: 'waktuSelesai'
  };

  export type HasilKerjaSiswaScalarFieldEnum = (typeof HasilKerjaSiswaScalarFieldEnum)[keyof typeof HasilKerjaSiswaScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const BankSoalOrderByRelevanceFieldEnum: {
    id: 'id',
    tingkat: 'tingkat',
    pertanyaan: 'pertanyaan',
    opsiA: 'opsiA',
    opsiB: 'opsiB',
    opsiC: 'opsiC',
    opsiD: 'opsiD',
    opsiE: 'opsiE',
    kunciBenar: 'kunciBenar',
    pembuatId: 'pembuatId'
  };

  export type BankSoalOrderByRelevanceFieldEnum = (typeof BankSoalOrderByRelevanceFieldEnum)[keyof typeof BankSoalOrderByRelevanceFieldEnum]


  export const PenugasanLinoOrderByRelevanceFieldEnum: {
    id: 'id',
    judul: 'judul',
    deskripsi: 'deskripsi',
    tahunAjaranId: 'tahunAjaranId',
    kelasId: 'kelasId',
    guruId: 'guruId'
  };

  export type PenugasanLinoOrderByRelevanceFieldEnum = (typeof PenugasanLinoOrderByRelevanceFieldEnum)[keyof typeof PenugasanLinoOrderByRelevanceFieldEnum]


  export const HasilKerjaSiswaOrderByRelevanceFieldEnum: {
    id: 'id',
    penugasanId: 'penugasanId',
    siswaId: 'siswaId',
    fileJawabanPdf: 'fileJawabanPdf',
    statusPengerjaan: 'statusPengerjaan',
    catatanGuru: 'catatanGuru'
  };

  export type HasilKerjaSiswaOrderByRelevanceFieldEnum = (typeof HasilKerjaSiswaOrderByRelevanceFieldEnum)[keyof typeof HasilKerjaSiswaOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'TipeSoal'
   */
  export type EnumTipeSoalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipeSoal'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'StatusTugas'
   */
  export type EnumStatusTugasFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusTugas'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type BankSoalWhereInput = {
    AND?: BankSoalWhereInput | BankSoalWhereInput[]
    OR?: BankSoalWhereInput[]
    NOT?: BankSoalWhereInput | BankSoalWhereInput[]
    id?: StringFilter<"BankSoal"> | string
    tipe?: EnumTipeSoalFilter<"BankSoal"> | $Enums.TipeSoal
    tingkat?: StringFilter<"BankSoal"> | string
    pertanyaan?: StringFilter<"BankSoal"> | string
    opsiA?: StringFilter<"BankSoal"> | string
    opsiB?: StringFilter<"BankSoal"> | string
    opsiC?: StringFilter<"BankSoal"> | string
    opsiD?: StringFilter<"BankSoal"> | string
    opsiE?: StringNullableFilter<"BankSoal"> | string | null
    kunciBenar?: StringFilter<"BankSoal"> | string
    bobotNilai?: IntFilter<"BankSoal"> | number
    pembuatId?: StringFilter<"BankSoal"> | string
    createdAt?: DateTimeFilter<"BankSoal"> | Date | string
    updatedAt?: DateTimeFilter<"BankSoal"> | Date | string
  }

  export type BankSoalOrderByWithRelationInput = {
    id?: SortOrder
    tipe?: SortOrder
    tingkat?: SortOrder
    pertanyaan?: SortOrder
    opsiA?: SortOrder
    opsiB?: SortOrder
    opsiC?: SortOrder
    opsiD?: SortOrder
    opsiE?: SortOrderInput | SortOrder
    kunciBenar?: SortOrder
    bobotNilai?: SortOrder
    pembuatId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: BankSoalOrderByRelevanceInput
  }

  export type BankSoalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BankSoalWhereInput | BankSoalWhereInput[]
    OR?: BankSoalWhereInput[]
    NOT?: BankSoalWhereInput | BankSoalWhereInput[]
    tipe?: EnumTipeSoalFilter<"BankSoal"> | $Enums.TipeSoal
    tingkat?: StringFilter<"BankSoal"> | string
    pertanyaan?: StringFilter<"BankSoal"> | string
    opsiA?: StringFilter<"BankSoal"> | string
    opsiB?: StringFilter<"BankSoal"> | string
    opsiC?: StringFilter<"BankSoal"> | string
    opsiD?: StringFilter<"BankSoal"> | string
    opsiE?: StringNullableFilter<"BankSoal"> | string | null
    kunciBenar?: StringFilter<"BankSoal"> | string
    bobotNilai?: IntFilter<"BankSoal"> | number
    pembuatId?: StringFilter<"BankSoal"> | string
    createdAt?: DateTimeFilter<"BankSoal"> | Date | string
    updatedAt?: DateTimeFilter<"BankSoal"> | Date | string
  }, "id">

  export type BankSoalOrderByWithAggregationInput = {
    id?: SortOrder
    tipe?: SortOrder
    tingkat?: SortOrder
    pertanyaan?: SortOrder
    opsiA?: SortOrder
    opsiB?: SortOrder
    opsiC?: SortOrder
    opsiD?: SortOrder
    opsiE?: SortOrderInput | SortOrder
    kunciBenar?: SortOrder
    bobotNilai?: SortOrder
    pembuatId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BankSoalCountOrderByAggregateInput
    _avg?: BankSoalAvgOrderByAggregateInput
    _max?: BankSoalMaxOrderByAggregateInput
    _min?: BankSoalMinOrderByAggregateInput
    _sum?: BankSoalSumOrderByAggregateInput
  }

  export type BankSoalScalarWhereWithAggregatesInput = {
    AND?: BankSoalScalarWhereWithAggregatesInput | BankSoalScalarWhereWithAggregatesInput[]
    OR?: BankSoalScalarWhereWithAggregatesInput[]
    NOT?: BankSoalScalarWhereWithAggregatesInput | BankSoalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BankSoal"> | string
    tipe?: EnumTipeSoalWithAggregatesFilter<"BankSoal"> | $Enums.TipeSoal
    tingkat?: StringWithAggregatesFilter<"BankSoal"> | string
    pertanyaan?: StringWithAggregatesFilter<"BankSoal"> | string
    opsiA?: StringWithAggregatesFilter<"BankSoal"> | string
    opsiB?: StringWithAggregatesFilter<"BankSoal"> | string
    opsiC?: StringWithAggregatesFilter<"BankSoal"> | string
    opsiD?: StringWithAggregatesFilter<"BankSoal"> | string
    opsiE?: StringNullableWithAggregatesFilter<"BankSoal"> | string | null
    kunciBenar?: StringWithAggregatesFilter<"BankSoal"> | string
    bobotNilai?: IntWithAggregatesFilter<"BankSoal"> | number
    pembuatId?: StringWithAggregatesFilter<"BankSoal"> | string
    createdAt?: DateTimeWithAggregatesFilter<"BankSoal"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BankSoal"> | Date | string
  }

  export type PenugasanLinoWhereInput = {
    AND?: PenugasanLinoWhereInput | PenugasanLinoWhereInput[]
    OR?: PenugasanLinoWhereInput[]
    NOT?: PenugasanLinoWhereInput | PenugasanLinoWhereInput[]
    id?: StringFilter<"PenugasanLino"> | string
    judul?: StringFilter<"PenugasanLino"> | string
    tipe?: EnumTipeSoalFilter<"PenugasanLino"> | $Enums.TipeSoal
    deskripsi?: StringNullableFilter<"PenugasanLino"> | string | null
    tahunAjaranId?: StringFilter<"PenugasanLino"> | string
    kelasId?: StringNullableFilter<"PenugasanLino"> | string | null
    guruId?: StringFilter<"PenugasanLino"> | string
    waktuMulai?: DateTimeFilter<"PenugasanLino"> | Date | string
    waktuSelesai?: DateTimeFilter<"PenugasanLino"> | Date | string
    status?: EnumStatusTugasFilter<"PenugasanLino"> | $Enums.StatusTugas
    createdAt?: DateTimeFilter<"PenugasanLino"> | Date | string
    updatedAt?: DateTimeFilter<"PenugasanLino"> | Date | string
    hasilKerjaSiswa?: HasilKerjaSiswaListRelationFilter
  }

  export type PenugasanLinoOrderByWithRelationInput = {
    id?: SortOrder
    judul?: SortOrder
    tipe?: SortOrder
    deskripsi?: SortOrderInput | SortOrder
    tahunAjaranId?: SortOrder
    kelasId?: SortOrderInput | SortOrder
    guruId?: SortOrder
    waktuMulai?: SortOrder
    waktuSelesai?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    hasilKerjaSiswa?: HasilKerjaSiswaOrderByRelationAggregateInput
    _relevance?: PenugasanLinoOrderByRelevanceInput
  }

  export type PenugasanLinoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PenugasanLinoWhereInput | PenugasanLinoWhereInput[]
    OR?: PenugasanLinoWhereInput[]
    NOT?: PenugasanLinoWhereInput | PenugasanLinoWhereInput[]
    judul?: StringFilter<"PenugasanLino"> | string
    tipe?: EnumTipeSoalFilter<"PenugasanLino"> | $Enums.TipeSoal
    deskripsi?: StringNullableFilter<"PenugasanLino"> | string | null
    tahunAjaranId?: StringFilter<"PenugasanLino"> | string
    kelasId?: StringNullableFilter<"PenugasanLino"> | string | null
    guruId?: StringFilter<"PenugasanLino"> | string
    waktuMulai?: DateTimeFilter<"PenugasanLino"> | Date | string
    waktuSelesai?: DateTimeFilter<"PenugasanLino"> | Date | string
    status?: EnumStatusTugasFilter<"PenugasanLino"> | $Enums.StatusTugas
    createdAt?: DateTimeFilter<"PenugasanLino"> | Date | string
    updatedAt?: DateTimeFilter<"PenugasanLino"> | Date | string
    hasilKerjaSiswa?: HasilKerjaSiswaListRelationFilter
  }, "id">

  export type PenugasanLinoOrderByWithAggregationInput = {
    id?: SortOrder
    judul?: SortOrder
    tipe?: SortOrder
    deskripsi?: SortOrderInput | SortOrder
    tahunAjaranId?: SortOrder
    kelasId?: SortOrderInput | SortOrder
    guruId?: SortOrder
    waktuMulai?: SortOrder
    waktuSelesai?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PenugasanLinoCountOrderByAggregateInput
    _max?: PenugasanLinoMaxOrderByAggregateInput
    _min?: PenugasanLinoMinOrderByAggregateInput
  }

  export type PenugasanLinoScalarWhereWithAggregatesInput = {
    AND?: PenugasanLinoScalarWhereWithAggregatesInput | PenugasanLinoScalarWhereWithAggregatesInput[]
    OR?: PenugasanLinoScalarWhereWithAggregatesInput[]
    NOT?: PenugasanLinoScalarWhereWithAggregatesInput | PenugasanLinoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PenugasanLino"> | string
    judul?: StringWithAggregatesFilter<"PenugasanLino"> | string
    tipe?: EnumTipeSoalWithAggregatesFilter<"PenugasanLino"> | $Enums.TipeSoal
    deskripsi?: StringNullableWithAggregatesFilter<"PenugasanLino"> | string | null
    tahunAjaranId?: StringWithAggregatesFilter<"PenugasanLino"> | string
    kelasId?: StringNullableWithAggregatesFilter<"PenugasanLino"> | string | null
    guruId?: StringWithAggregatesFilter<"PenugasanLino"> | string
    waktuMulai?: DateTimeWithAggregatesFilter<"PenugasanLino"> | Date | string
    waktuSelesai?: DateTimeWithAggregatesFilter<"PenugasanLino"> | Date | string
    status?: EnumStatusTugasWithAggregatesFilter<"PenugasanLino"> | $Enums.StatusTugas
    createdAt?: DateTimeWithAggregatesFilter<"PenugasanLino"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PenugasanLino"> | Date | string
  }

  export type HasilKerjaSiswaWhereInput = {
    AND?: HasilKerjaSiswaWhereInput | HasilKerjaSiswaWhereInput[]
    OR?: HasilKerjaSiswaWhereInput[]
    NOT?: HasilKerjaSiswaWhereInput | HasilKerjaSiswaWhereInput[]
    id?: StringFilter<"HasilKerjaSiswa"> | string
    penugasanId?: StringFilter<"HasilKerjaSiswa"> | string
    siswaId?: StringFilter<"HasilKerjaSiswa"> | string
    fileJawabanPdf?: StringNullableFilter<"HasilKerjaSiswa"> | string | null
    nilaiAkhir?: FloatNullableFilter<"HasilKerjaSiswa"> | number | null
    statusPengerjaan?: StringFilter<"HasilKerjaSiswa"> | string
    catatanGuru?: StringNullableFilter<"HasilKerjaSiswa"> | string | null
    waktuMulai?: DateTimeNullableFilter<"HasilKerjaSiswa"> | Date | string | null
    waktuSelesai?: DateTimeNullableFilter<"HasilKerjaSiswa"> | Date | string | null
    penugasan?: XOR<PenugasanLinoScalarRelationFilter, PenugasanLinoWhereInput>
  }

  export type HasilKerjaSiswaOrderByWithRelationInput = {
    id?: SortOrder
    penugasanId?: SortOrder
    siswaId?: SortOrder
    fileJawabanPdf?: SortOrderInput | SortOrder
    nilaiAkhir?: SortOrderInput | SortOrder
    statusPengerjaan?: SortOrder
    catatanGuru?: SortOrderInput | SortOrder
    waktuMulai?: SortOrderInput | SortOrder
    waktuSelesai?: SortOrderInput | SortOrder
    penugasan?: PenugasanLinoOrderByWithRelationInput
    _relevance?: HasilKerjaSiswaOrderByRelevanceInput
  }

  export type HasilKerjaSiswaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    penugasanId_siswaId?: HasilKerjaSiswaPenugasanIdSiswaIdCompoundUniqueInput
    AND?: HasilKerjaSiswaWhereInput | HasilKerjaSiswaWhereInput[]
    OR?: HasilKerjaSiswaWhereInput[]
    NOT?: HasilKerjaSiswaWhereInput | HasilKerjaSiswaWhereInput[]
    penugasanId?: StringFilter<"HasilKerjaSiswa"> | string
    siswaId?: StringFilter<"HasilKerjaSiswa"> | string
    fileJawabanPdf?: StringNullableFilter<"HasilKerjaSiswa"> | string | null
    nilaiAkhir?: FloatNullableFilter<"HasilKerjaSiswa"> | number | null
    statusPengerjaan?: StringFilter<"HasilKerjaSiswa"> | string
    catatanGuru?: StringNullableFilter<"HasilKerjaSiswa"> | string | null
    waktuMulai?: DateTimeNullableFilter<"HasilKerjaSiswa"> | Date | string | null
    waktuSelesai?: DateTimeNullableFilter<"HasilKerjaSiswa"> | Date | string | null
    penugasan?: XOR<PenugasanLinoScalarRelationFilter, PenugasanLinoWhereInput>
  }, "id" | "penugasanId_siswaId">

  export type HasilKerjaSiswaOrderByWithAggregationInput = {
    id?: SortOrder
    penugasanId?: SortOrder
    siswaId?: SortOrder
    fileJawabanPdf?: SortOrderInput | SortOrder
    nilaiAkhir?: SortOrderInput | SortOrder
    statusPengerjaan?: SortOrder
    catatanGuru?: SortOrderInput | SortOrder
    waktuMulai?: SortOrderInput | SortOrder
    waktuSelesai?: SortOrderInput | SortOrder
    _count?: HasilKerjaSiswaCountOrderByAggregateInput
    _avg?: HasilKerjaSiswaAvgOrderByAggregateInput
    _max?: HasilKerjaSiswaMaxOrderByAggregateInput
    _min?: HasilKerjaSiswaMinOrderByAggregateInput
    _sum?: HasilKerjaSiswaSumOrderByAggregateInput
  }

  export type HasilKerjaSiswaScalarWhereWithAggregatesInput = {
    AND?: HasilKerjaSiswaScalarWhereWithAggregatesInput | HasilKerjaSiswaScalarWhereWithAggregatesInput[]
    OR?: HasilKerjaSiswaScalarWhereWithAggregatesInput[]
    NOT?: HasilKerjaSiswaScalarWhereWithAggregatesInput | HasilKerjaSiswaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"HasilKerjaSiswa"> | string
    penugasanId?: StringWithAggregatesFilter<"HasilKerjaSiswa"> | string
    siswaId?: StringWithAggregatesFilter<"HasilKerjaSiswa"> | string
    fileJawabanPdf?: StringNullableWithAggregatesFilter<"HasilKerjaSiswa"> | string | null
    nilaiAkhir?: FloatNullableWithAggregatesFilter<"HasilKerjaSiswa"> | number | null
    statusPengerjaan?: StringWithAggregatesFilter<"HasilKerjaSiswa"> | string
    catatanGuru?: StringNullableWithAggregatesFilter<"HasilKerjaSiswa"> | string | null
    waktuMulai?: DateTimeNullableWithAggregatesFilter<"HasilKerjaSiswa"> | Date | string | null
    waktuSelesai?: DateTimeNullableWithAggregatesFilter<"HasilKerjaSiswa"> | Date | string | null
  }

  export type BankSoalCreateInput = {
    id?: string
    tipe: $Enums.TipeSoal
    tingkat: string
    pertanyaan: string
    opsiA: string
    opsiB: string
    opsiC: string
    opsiD: string
    opsiE?: string | null
    kunciBenar: string
    bobotNilai?: number
    pembuatId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BankSoalUncheckedCreateInput = {
    id?: string
    tipe: $Enums.TipeSoal
    tingkat: string
    pertanyaan: string
    opsiA: string
    opsiB: string
    opsiC: string
    opsiD: string
    opsiE?: string | null
    kunciBenar: string
    bobotNilai?: number
    pembuatId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BankSoalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipeSoalFieldUpdateOperationsInput | $Enums.TipeSoal
    tingkat?: StringFieldUpdateOperationsInput | string
    pertanyaan?: StringFieldUpdateOperationsInput | string
    opsiA?: StringFieldUpdateOperationsInput | string
    opsiB?: StringFieldUpdateOperationsInput | string
    opsiC?: StringFieldUpdateOperationsInput | string
    opsiD?: StringFieldUpdateOperationsInput | string
    opsiE?: NullableStringFieldUpdateOperationsInput | string | null
    kunciBenar?: StringFieldUpdateOperationsInput | string
    bobotNilai?: IntFieldUpdateOperationsInput | number
    pembuatId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BankSoalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipeSoalFieldUpdateOperationsInput | $Enums.TipeSoal
    tingkat?: StringFieldUpdateOperationsInput | string
    pertanyaan?: StringFieldUpdateOperationsInput | string
    opsiA?: StringFieldUpdateOperationsInput | string
    opsiB?: StringFieldUpdateOperationsInput | string
    opsiC?: StringFieldUpdateOperationsInput | string
    opsiD?: StringFieldUpdateOperationsInput | string
    opsiE?: NullableStringFieldUpdateOperationsInput | string | null
    kunciBenar?: StringFieldUpdateOperationsInput | string
    bobotNilai?: IntFieldUpdateOperationsInput | number
    pembuatId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BankSoalCreateManyInput = {
    id?: string
    tipe: $Enums.TipeSoal
    tingkat: string
    pertanyaan: string
    opsiA: string
    opsiB: string
    opsiC: string
    opsiD: string
    opsiE?: string | null
    kunciBenar: string
    bobotNilai?: number
    pembuatId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BankSoalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipeSoalFieldUpdateOperationsInput | $Enums.TipeSoal
    tingkat?: StringFieldUpdateOperationsInput | string
    pertanyaan?: StringFieldUpdateOperationsInput | string
    opsiA?: StringFieldUpdateOperationsInput | string
    opsiB?: StringFieldUpdateOperationsInput | string
    opsiC?: StringFieldUpdateOperationsInput | string
    opsiD?: StringFieldUpdateOperationsInput | string
    opsiE?: NullableStringFieldUpdateOperationsInput | string | null
    kunciBenar?: StringFieldUpdateOperationsInput | string
    bobotNilai?: IntFieldUpdateOperationsInput | number
    pembuatId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BankSoalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipeSoalFieldUpdateOperationsInput | $Enums.TipeSoal
    tingkat?: StringFieldUpdateOperationsInput | string
    pertanyaan?: StringFieldUpdateOperationsInput | string
    opsiA?: StringFieldUpdateOperationsInput | string
    opsiB?: StringFieldUpdateOperationsInput | string
    opsiC?: StringFieldUpdateOperationsInput | string
    opsiD?: StringFieldUpdateOperationsInput | string
    opsiE?: NullableStringFieldUpdateOperationsInput | string | null
    kunciBenar?: StringFieldUpdateOperationsInput | string
    bobotNilai?: IntFieldUpdateOperationsInput | number
    pembuatId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PenugasanLinoCreateInput = {
    id?: string
    judul: string
    tipe: $Enums.TipeSoal
    deskripsi?: string | null
    tahunAjaranId: string
    kelasId?: string | null
    guruId: string
    waktuMulai: Date | string
    waktuSelesai: Date | string
    status?: $Enums.StatusTugas
    createdAt?: Date | string
    updatedAt?: Date | string
    hasilKerjaSiswa?: HasilKerjaSiswaCreateNestedManyWithoutPenugasanInput
  }

  export type PenugasanLinoUncheckedCreateInput = {
    id?: string
    judul: string
    tipe: $Enums.TipeSoal
    deskripsi?: string | null
    tahunAjaranId: string
    kelasId?: string | null
    guruId: string
    waktuMulai: Date | string
    waktuSelesai: Date | string
    status?: $Enums.StatusTugas
    createdAt?: Date | string
    updatedAt?: Date | string
    hasilKerjaSiswa?: HasilKerjaSiswaUncheckedCreateNestedManyWithoutPenugasanInput
  }

  export type PenugasanLinoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipeSoalFieldUpdateOperationsInput | $Enums.TipeSoal
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tahunAjaranId?: StringFieldUpdateOperationsInput | string
    kelasId?: NullableStringFieldUpdateOperationsInput | string | null
    guruId?: StringFieldUpdateOperationsInput | string
    waktuMulai?: DateTimeFieldUpdateOperationsInput | Date | string
    waktuSelesai?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusTugasFieldUpdateOperationsInput | $Enums.StatusTugas
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hasilKerjaSiswa?: HasilKerjaSiswaUpdateManyWithoutPenugasanNestedInput
  }

  export type PenugasanLinoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipeSoalFieldUpdateOperationsInput | $Enums.TipeSoal
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tahunAjaranId?: StringFieldUpdateOperationsInput | string
    kelasId?: NullableStringFieldUpdateOperationsInput | string | null
    guruId?: StringFieldUpdateOperationsInput | string
    waktuMulai?: DateTimeFieldUpdateOperationsInput | Date | string
    waktuSelesai?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusTugasFieldUpdateOperationsInput | $Enums.StatusTugas
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hasilKerjaSiswa?: HasilKerjaSiswaUncheckedUpdateManyWithoutPenugasanNestedInput
  }

  export type PenugasanLinoCreateManyInput = {
    id?: string
    judul: string
    tipe: $Enums.TipeSoal
    deskripsi?: string | null
    tahunAjaranId: string
    kelasId?: string | null
    guruId: string
    waktuMulai: Date | string
    waktuSelesai: Date | string
    status?: $Enums.StatusTugas
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PenugasanLinoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipeSoalFieldUpdateOperationsInput | $Enums.TipeSoal
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tahunAjaranId?: StringFieldUpdateOperationsInput | string
    kelasId?: NullableStringFieldUpdateOperationsInput | string | null
    guruId?: StringFieldUpdateOperationsInput | string
    waktuMulai?: DateTimeFieldUpdateOperationsInput | Date | string
    waktuSelesai?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusTugasFieldUpdateOperationsInput | $Enums.StatusTugas
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PenugasanLinoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipeSoalFieldUpdateOperationsInput | $Enums.TipeSoal
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tahunAjaranId?: StringFieldUpdateOperationsInput | string
    kelasId?: NullableStringFieldUpdateOperationsInput | string | null
    guruId?: StringFieldUpdateOperationsInput | string
    waktuMulai?: DateTimeFieldUpdateOperationsInput | Date | string
    waktuSelesai?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusTugasFieldUpdateOperationsInput | $Enums.StatusTugas
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HasilKerjaSiswaCreateInput = {
    id?: string
    siswaId: string
    fileJawabanPdf?: string | null
    nilaiAkhir?: number | null
    statusPengerjaan?: string
    catatanGuru?: string | null
    waktuMulai?: Date | string | null
    waktuSelesai?: Date | string | null
    penugasan: PenugasanLinoCreateNestedOneWithoutHasilKerjaSiswaInput
  }

  export type HasilKerjaSiswaUncheckedCreateInput = {
    id?: string
    penugasanId: string
    siswaId: string
    fileJawabanPdf?: string | null
    nilaiAkhir?: number | null
    statusPengerjaan?: string
    catatanGuru?: string | null
    waktuMulai?: Date | string | null
    waktuSelesai?: Date | string | null
  }

  export type HasilKerjaSiswaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    siswaId?: StringFieldUpdateOperationsInput | string
    fileJawabanPdf?: NullableStringFieldUpdateOperationsInput | string | null
    nilaiAkhir?: NullableFloatFieldUpdateOperationsInput | number | null
    statusPengerjaan?: StringFieldUpdateOperationsInput | string
    catatanGuru?: NullableStringFieldUpdateOperationsInput | string | null
    waktuMulai?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    waktuSelesai?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    penugasan?: PenugasanLinoUpdateOneRequiredWithoutHasilKerjaSiswaNestedInput
  }

  export type HasilKerjaSiswaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    penugasanId?: StringFieldUpdateOperationsInput | string
    siswaId?: StringFieldUpdateOperationsInput | string
    fileJawabanPdf?: NullableStringFieldUpdateOperationsInput | string | null
    nilaiAkhir?: NullableFloatFieldUpdateOperationsInput | number | null
    statusPengerjaan?: StringFieldUpdateOperationsInput | string
    catatanGuru?: NullableStringFieldUpdateOperationsInput | string | null
    waktuMulai?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    waktuSelesai?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type HasilKerjaSiswaCreateManyInput = {
    id?: string
    penugasanId: string
    siswaId: string
    fileJawabanPdf?: string | null
    nilaiAkhir?: number | null
    statusPengerjaan?: string
    catatanGuru?: string | null
    waktuMulai?: Date | string | null
    waktuSelesai?: Date | string | null
  }

  export type HasilKerjaSiswaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    siswaId?: StringFieldUpdateOperationsInput | string
    fileJawabanPdf?: NullableStringFieldUpdateOperationsInput | string | null
    nilaiAkhir?: NullableFloatFieldUpdateOperationsInput | number | null
    statusPengerjaan?: StringFieldUpdateOperationsInput | string
    catatanGuru?: NullableStringFieldUpdateOperationsInput | string | null
    waktuMulai?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    waktuSelesai?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type HasilKerjaSiswaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    penugasanId?: StringFieldUpdateOperationsInput | string
    siswaId?: StringFieldUpdateOperationsInput | string
    fileJawabanPdf?: NullableStringFieldUpdateOperationsInput | string | null
    nilaiAkhir?: NullableFloatFieldUpdateOperationsInput | number | null
    statusPengerjaan?: StringFieldUpdateOperationsInput | string
    catatanGuru?: NullableStringFieldUpdateOperationsInput | string | null
    waktuMulai?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    waktuSelesai?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumTipeSoalFilter<$PrismaModel = never> = {
    equals?: $Enums.TipeSoal | EnumTipeSoalFieldRefInput<$PrismaModel>
    in?: $Enums.TipeSoal[]
    notIn?: $Enums.TipeSoal[]
    not?: NestedEnumTipeSoalFilter<$PrismaModel> | $Enums.TipeSoal
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BankSoalOrderByRelevanceInput = {
    fields: BankSoalOrderByRelevanceFieldEnum | BankSoalOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type BankSoalCountOrderByAggregateInput = {
    id?: SortOrder
    tipe?: SortOrder
    tingkat?: SortOrder
    pertanyaan?: SortOrder
    opsiA?: SortOrder
    opsiB?: SortOrder
    opsiC?: SortOrder
    opsiD?: SortOrder
    opsiE?: SortOrder
    kunciBenar?: SortOrder
    bobotNilai?: SortOrder
    pembuatId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BankSoalAvgOrderByAggregateInput = {
    bobotNilai?: SortOrder
  }

  export type BankSoalMaxOrderByAggregateInput = {
    id?: SortOrder
    tipe?: SortOrder
    tingkat?: SortOrder
    pertanyaan?: SortOrder
    opsiA?: SortOrder
    opsiB?: SortOrder
    opsiC?: SortOrder
    opsiD?: SortOrder
    opsiE?: SortOrder
    kunciBenar?: SortOrder
    bobotNilai?: SortOrder
    pembuatId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BankSoalMinOrderByAggregateInput = {
    id?: SortOrder
    tipe?: SortOrder
    tingkat?: SortOrder
    pertanyaan?: SortOrder
    opsiA?: SortOrder
    opsiB?: SortOrder
    opsiC?: SortOrder
    opsiD?: SortOrder
    opsiE?: SortOrder
    kunciBenar?: SortOrder
    bobotNilai?: SortOrder
    pembuatId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BankSoalSumOrderByAggregateInput = {
    bobotNilai?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumTipeSoalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipeSoal | EnumTipeSoalFieldRefInput<$PrismaModel>
    in?: $Enums.TipeSoal[]
    notIn?: $Enums.TipeSoal[]
    not?: NestedEnumTipeSoalWithAggregatesFilter<$PrismaModel> | $Enums.TipeSoal
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipeSoalFilter<$PrismaModel>
    _max?: NestedEnumTipeSoalFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumStatusTugasFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusTugas | EnumStatusTugasFieldRefInput<$PrismaModel>
    in?: $Enums.StatusTugas[]
    notIn?: $Enums.StatusTugas[]
    not?: NestedEnumStatusTugasFilter<$PrismaModel> | $Enums.StatusTugas
  }

  export type HasilKerjaSiswaListRelationFilter = {
    every?: HasilKerjaSiswaWhereInput
    some?: HasilKerjaSiswaWhereInput
    none?: HasilKerjaSiswaWhereInput
  }

  export type HasilKerjaSiswaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PenugasanLinoOrderByRelevanceInput = {
    fields: PenugasanLinoOrderByRelevanceFieldEnum | PenugasanLinoOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PenugasanLinoCountOrderByAggregateInput = {
    id?: SortOrder
    judul?: SortOrder
    tipe?: SortOrder
    deskripsi?: SortOrder
    tahunAjaranId?: SortOrder
    kelasId?: SortOrder
    guruId?: SortOrder
    waktuMulai?: SortOrder
    waktuSelesai?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PenugasanLinoMaxOrderByAggregateInput = {
    id?: SortOrder
    judul?: SortOrder
    tipe?: SortOrder
    deskripsi?: SortOrder
    tahunAjaranId?: SortOrder
    kelasId?: SortOrder
    guruId?: SortOrder
    waktuMulai?: SortOrder
    waktuSelesai?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PenugasanLinoMinOrderByAggregateInput = {
    id?: SortOrder
    judul?: SortOrder
    tipe?: SortOrder
    deskripsi?: SortOrder
    tahunAjaranId?: SortOrder
    kelasId?: SortOrder
    guruId?: SortOrder
    waktuMulai?: SortOrder
    waktuSelesai?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumStatusTugasWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusTugas | EnumStatusTugasFieldRefInput<$PrismaModel>
    in?: $Enums.StatusTugas[]
    notIn?: $Enums.StatusTugas[]
    not?: NestedEnumStatusTugasWithAggregatesFilter<$PrismaModel> | $Enums.StatusTugas
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusTugasFilter<$PrismaModel>
    _max?: NestedEnumStatusTugasFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type PenugasanLinoScalarRelationFilter = {
    is?: PenugasanLinoWhereInput
    isNot?: PenugasanLinoWhereInput
  }

  export type HasilKerjaSiswaOrderByRelevanceInput = {
    fields: HasilKerjaSiswaOrderByRelevanceFieldEnum | HasilKerjaSiswaOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type HasilKerjaSiswaPenugasanIdSiswaIdCompoundUniqueInput = {
    penugasanId: string
    siswaId: string
  }

  export type HasilKerjaSiswaCountOrderByAggregateInput = {
    id?: SortOrder
    penugasanId?: SortOrder
    siswaId?: SortOrder
    fileJawabanPdf?: SortOrder
    nilaiAkhir?: SortOrder
    statusPengerjaan?: SortOrder
    catatanGuru?: SortOrder
    waktuMulai?: SortOrder
    waktuSelesai?: SortOrder
  }

  export type HasilKerjaSiswaAvgOrderByAggregateInput = {
    nilaiAkhir?: SortOrder
  }

  export type HasilKerjaSiswaMaxOrderByAggregateInput = {
    id?: SortOrder
    penugasanId?: SortOrder
    siswaId?: SortOrder
    fileJawabanPdf?: SortOrder
    nilaiAkhir?: SortOrder
    statusPengerjaan?: SortOrder
    catatanGuru?: SortOrder
    waktuMulai?: SortOrder
    waktuSelesai?: SortOrder
  }

  export type HasilKerjaSiswaMinOrderByAggregateInput = {
    id?: SortOrder
    penugasanId?: SortOrder
    siswaId?: SortOrder
    fileJawabanPdf?: SortOrder
    nilaiAkhir?: SortOrder
    statusPengerjaan?: SortOrder
    catatanGuru?: SortOrder
    waktuMulai?: SortOrder
    waktuSelesai?: SortOrder
  }

  export type HasilKerjaSiswaSumOrderByAggregateInput = {
    nilaiAkhir?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumTipeSoalFieldUpdateOperationsInput = {
    set?: $Enums.TipeSoal
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type HasilKerjaSiswaCreateNestedManyWithoutPenugasanInput = {
    create?: XOR<HasilKerjaSiswaCreateWithoutPenugasanInput, HasilKerjaSiswaUncheckedCreateWithoutPenugasanInput> | HasilKerjaSiswaCreateWithoutPenugasanInput[] | HasilKerjaSiswaUncheckedCreateWithoutPenugasanInput[]
    connectOrCreate?: HasilKerjaSiswaCreateOrConnectWithoutPenugasanInput | HasilKerjaSiswaCreateOrConnectWithoutPenugasanInput[]
    createMany?: HasilKerjaSiswaCreateManyPenugasanInputEnvelope
    connect?: HasilKerjaSiswaWhereUniqueInput | HasilKerjaSiswaWhereUniqueInput[]
  }

  export type HasilKerjaSiswaUncheckedCreateNestedManyWithoutPenugasanInput = {
    create?: XOR<HasilKerjaSiswaCreateWithoutPenugasanInput, HasilKerjaSiswaUncheckedCreateWithoutPenugasanInput> | HasilKerjaSiswaCreateWithoutPenugasanInput[] | HasilKerjaSiswaUncheckedCreateWithoutPenugasanInput[]
    connectOrCreate?: HasilKerjaSiswaCreateOrConnectWithoutPenugasanInput | HasilKerjaSiswaCreateOrConnectWithoutPenugasanInput[]
    createMany?: HasilKerjaSiswaCreateManyPenugasanInputEnvelope
    connect?: HasilKerjaSiswaWhereUniqueInput | HasilKerjaSiswaWhereUniqueInput[]
  }

  export type EnumStatusTugasFieldUpdateOperationsInput = {
    set?: $Enums.StatusTugas
  }

  export type HasilKerjaSiswaUpdateManyWithoutPenugasanNestedInput = {
    create?: XOR<HasilKerjaSiswaCreateWithoutPenugasanInput, HasilKerjaSiswaUncheckedCreateWithoutPenugasanInput> | HasilKerjaSiswaCreateWithoutPenugasanInput[] | HasilKerjaSiswaUncheckedCreateWithoutPenugasanInput[]
    connectOrCreate?: HasilKerjaSiswaCreateOrConnectWithoutPenugasanInput | HasilKerjaSiswaCreateOrConnectWithoutPenugasanInput[]
    upsert?: HasilKerjaSiswaUpsertWithWhereUniqueWithoutPenugasanInput | HasilKerjaSiswaUpsertWithWhereUniqueWithoutPenugasanInput[]
    createMany?: HasilKerjaSiswaCreateManyPenugasanInputEnvelope
    set?: HasilKerjaSiswaWhereUniqueInput | HasilKerjaSiswaWhereUniqueInput[]
    disconnect?: HasilKerjaSiswaWhereUniqueInput | HasilKerjaSiswaWhereUniqueInput[]
    delete?: HasilKerjaSiswaWhereUniqueInput | HasilKerjaSiswaWhereUniqueInput[]
    connect?: HasilKerjaSiswaWhereUniqueInput | HasilKerjaSiswaWhereUniqueInput[]
    update?: HasilKerjaSiswaUpdateWithWhereUniqueWithoutPenugasanInput | HasilKerjaSiswaUpdateWithWhereUniqueWithoutPenugasanInput[]
    updateMany?: HasilKerjaSiswaUpdateManyWithWhereWithoutPenugasanInput | HasilKerjaSiswaUpdateManyWithWhereWithoutPenugasanInput[]
    deleteMany?: HasilKerjaSiswaScalarWhereInput | HasilKerjaSiswaScalarWhereInput[]
  }

  export type HasilKerjaSiswaUncheckedUpdateManyWithoutPenugasanNestedInput = {
    create?: XOR<HasilKerjaSiswaCreateWithoutPenugasanInput, HasilKerjaSiswaUncheckedCreateWithoutPenugasanInput> | HasilKerjaSiswaCreateWithoutPenugasanInput[] | HasilKerjaSiswaUncheckedCreateWithoutPenugasanInput[]
    connectOrCreate?: HasilKerjaSiswaCreateOrConnectWithoutPenugasanInput | HasilKerjaSiswaCreateOrConnectWithoutPenugasanInput[]
    upsert?: HasilKerjaSiswaUpsertWithWhereUniqueWithoutPenugasanInput | HasilKerjaSiswaUpsertWithWhereUniqueWithoutPenugasanInput[]
    createMany?: HasilKerjaSiswaCreateManyPenugasanInputEnvelope
    set?: HasilKerjaSiswaWhereUniqueInput | HasilKerjaSiswaWhereUniqueInput[]
    disconnect?: HasilKerjaSiswaWhereUniqueInput | HasilKerjaSiswaWhereUniqueInput[]
    delete?: HasilKerjaSiswaWhereUniqueInput | HasilKerjaSiswaWhereUniqueInput[]
    connect?: HasilKerjaSiswaWhereUniqueInput | HasilKerjaSiswaWhereUniqueInput[]
    update?: HasilKerjaSiswaUpdateWithWhereUniqueWithoutPenugasanInput | HasilKerjaSiswaUpdateWithWhereUniqueWithoutPenugasanInput[]
    updateMany?: HasilKerjaSiswaUpdateManyWithWhereWithoutPenugasanInput | HasilKerjaSiswaUpdateManyWithWhereWithoutPenugasanInput[]
    deleteMany?: HasilKerjaSiswaScalarWhereInput | HasilKerjaSiswaScalarWhereInput[]
  }

  export type PenugasanLinoCreateNestedOneWithoutHasilKerjaSiswaInput = {
    create?: XOR<PenugasanLinoCreateWithoutHasilKerjaSiswaInput, PenugasanLinoUncheckedCreateWithoutHasilKerjaSiswaInput>
    connectOrCreate?: PenugasanLinoCreateOrConnectWithoutHasilKerjaSiswaInput
    connect?: PenugasanLinoWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type PenugasanLinoUpdateOneRequiredWithoutHasilKerjaSiswaNestedInput = {
    create?: XOR<PenugasanLinoCreateWithoutHasilKerjaSiswaInput, PenugasanLinoUncheckedCreateWithoutHasilKerjaSiswaInput>
    connectOrCreate?: PenugasanLinoCreateOrConnectWithoutHasilKerjaSiswaInput
    upsert?: PenugasanLinoUpsertWithoutHasilKerjaSiswaInput
    connect?: PenugasanLinoWhereUniqueInput
    update?: XOR<XOR<PenugasanLinoUpdateToOneWithWhereWithoutHasilKerjaSiswaInput, PenugasanLinoUpdateWithoutHasilKerjaSiswaInput>, PenugasanLinoUncheckedUpdateWithoutHasilKerjaSiswaInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumTipeSoalFilter<$PrismaModel = never> = {
    equals?: $Enums.TipeSoal | EnumTipeSoalFieldRefInput<$PrismaModel>
    in?: $Enums.TipeSoal[]
    notIn?: $Enums.TipeSoal[]
    not?: NestedEnumTipeSoalFilter<$PrismaModel> | $Enums.TipeSoal
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumTipeSoalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipeSoal | EnumTipeSoalFieldRefInput<$PrismaModel>
    in?: $Enums.TipeSoal[]
    notIn?: $Enums.TipeSoal[]
    not?: NestedEnumTipeSoalWithAggregatesFilter<$PrismaModel> | $Enums.TipeSoal
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipeSoalFilter<$PrismaModel>
    _max?: NestedEnumTipeSoalFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumStatusTugasFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusTugas | EnumStatusTugasFieldRefInput<$PrismaModel>
    in?: $Enums.StatusTugas[]
    notIn?: $Enums.StatusTugas[]
    not?: NestedEnumStatusTugasFilter<$PrismaModel> | $Enums.StatusTugas
  }

  export type NestedEnumStatusTugasWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusTugas | EnumStatusTugasFieldRefInput<$PrismaModel>
    in?: $Enums.StatusTugas[]
    notIn?: $Enums.StatusTugas[]
    not?: NestedEnumStatusTugasWithAggregatesFilter<$PrismaModel> | $Enums.StatusTugas
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusTugasFilter<$PrismaModel>
    _max?: NestedEnumStatusTugasFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type HasilKerjaSiswaCreateWithoutPenugasanInput = {
    id?: string
    siswaId: string
    fileJawabanPdf?: string | null
    nilaiAkhir?: number | null
    statusPengerjaan?: string
    catatanGuru?: string | null
    waktuMulai?: Date | string | null
    waktuSelesai?: Date | string | null
  }

  export type HasilKerjaSiswaUncheckedCreateWithoutPenugasanInput = {
    id?: string
    siswaId: string
    fileJawabanPdf?: string | null
    nilaiAkhir?: number | null
    statusPengerjaan?: string
    catatanGuru?: string | null
    waktuMulai?: Date | string | null
    waktuSelesai?: Date | string | null
  }

  export type HasilKerjaSiswaCreateOrConnectWithoutPenugasanInput = {
    where: HasilKerjaSiswaWhereUniqueInput
    create: XOR<HasilKerjaSiswaCreateWithoutPenugasanInput, HasilKerjaSiswaUncheckedCreateWithoutPenugasanInput>
  }

  export type HasilKerjaSiswaCreateManyPenugasanInputEnvelope = {
    data: HasilKerjaSiswaCreateManyPenugasanInput | HasilKerjaSiswaCreateManyPenugasanInput[]
    skipDuplicates?: boolean
  }

  export type HasilKerjaSiswaUpsertWithWhereUniqueWithoutPenugasanInput = {
    where: HasilKerjaSiswaWhereUniqueInput
    update: XOR<HasilKerjaSiswaUpdateWithoutPenugasanInput, HasilKerjaSiswaUncheckedUpdateWithoutPenugasanInput>
    create: XOR<HasilKerjaSiswaCreateWithoutPenugasanInput, HasilKerjaSiswaUncheckedCreateWithoutPenugasanInput>
  }

  export type HasilKerjaSiswaUpdateWithWhereUniqueWithoutPenugasanInput = {
    where: HasilKerjaSiswaWhereUniqueInput
    data: XOR<HasilKerjaSiswaUpdateWithoutPenugasanInput, HasilKerjaSiswaUncheckedUpdateWithoutPenugasanInput>
  }

  export type HasilKerjaSiswaUpdateManyWithWhereWithoutPenugasanInput = {
    where: HasilKerjaSiswaScalarWhereInput
    data: XOR<HasilKerjaSiswaUpdateManyMutationInput, HasilKerjaSiswaUncheckedUpdateManyWithoutPenugasanInput>
  }

  export type HasilKerjaSiswaScalarWhereInput = {
    AND?: HasilKerjaSiswaScalarWhereInput | HasilKerjaSiswaScalarWhereInput[]
    OR?: HasilKerjaSiswaScalarWhereInput[]
    NOT?: HasilKerjaSiswaScalarWhereInput | HasilKerjaSiswaScalarWhereInput[]
    id?: StringFilter<"HasilKerjaSiswa"> | string
    penugasanId?: StringFilter<"HasilKerjaSiswa"> | string
    siswaId?: StringFilter<"HasilKerjaSiswa"> | string
    fileJawabanPdf?: StringNullableFilter<"HasilKerjaSiswa"> | string | null
    nilaiAkhir?: FloatNullableFilter<"HasilKerjaSiswa"> | number | null
    statusPengerjaan?: StringFilter<"HasilKerjaSiswa"> | string
    catatanGuru?: StringNullableFilter<"HasilKerjaSiswa"> | string | null
    waktuMulai?: DateTimeNullableFilter<"HasilKerjaSiswa"> | Date | string | null
    waktuSelesai?: DateTimeNullableFilter<"HasilKerjaSiswa"> | Date | string | null
  }

  export type PenugasanLinoCreateWithoutHasilKerjaSiswaInput = {
    id?: string
    judul: string
    tipe: $Enums.TipeSoal
    deskripsi?: string | null
    tahunAjaranId: string
    kelasId?: string | null
    guruId: string
    waktuMulai: Date | string
    waktuSelesai: Date | string
    status?: $Enums.StatusTugas
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PenugasanLinoUncheckedCreateWithoutHasilKerjaSiswaInput = {
    id?: string
    judul: string
    tipe: $Enums.TipeSoal
    deskripsi?: string | null
    tahunAjaranId: string
    kelasId?: string | null
    guruId: string
    waktuMulai: Date | string
    waktuSelesai: Date | string
    status?: $Enums.StatusTugas
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PenugasanLinoCreateOrConnectWithoutHasilKerjaSiswaInput = {
    where: PenugasanLinoWhereUniqueInput
    create: XOR<PenugasanLinoCreateWithoutHasilKerjaSiswaInput, PenugasanLinoUncheckedCreateWithoutHasilKerjaSiswaInput>
  }

  export type PenugasanLinoUpsertWithoutHasilKerjaSiswaInput = {
    update: XOR<PenugasanLinoUpdateWithoutHasilKerjaSiswaInput, PenugasanLinoUncheckedUpdateWithoutHasilKerjaSiswaInput>
    create: XOR<PenugasanLinoCreateWithoutHasilKerjaSiswaInput, PenugasanLinoUncheckedCreateWithoutHasilKerjaSiswaInput>
    where?: PenugasanLinoWhereInput
  }

  export type PenugasanLinoUpdateToOneWithWhereWithoutHasilKerjaSiswaInput = {
    where?: PenugasanLinoWhereInput
    data: XOR<PenugasanLinoUpdateWithoutHasilKerjaSiswaInput, PenugasanLinoUncheckedUpdateWithoutHasilKerjaSiswaInput>
  }

  export type PenugasanLinoUpdateWithoutHasilKerjaSiswaInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipeSoalFieldUpdateOperationsInput | $Enums.TipeSoal
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tahunAjaranId?: StringFieldUpdateOperationsInput | string
    kelasId?: NullableStringFieldUpdateOperationsInput | string | null
    guruId?: StringFieldUpdateOperationsInput | string
    waktuMulai?: DateTimeFieldUpdateOperationsInput | Date | string
    waktuSelesai?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusTugasFieldUpdateOperationsInput | $Enums.StatusTugas
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PenugasanLinoUncheckedUpdateWithoutHasilKerjaSiswaInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipeSoalFieldUpdateOperationsInput | $Enums.TipeSoal
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tahunAjaranId?: StringFieldUpdateOperationsInput | string
    kelasId?: NullableStringFieldUpdateOperationsInput | string | null
    guruId?: StringFieldUpdateOperationsInput | string
    waktuMulai?: DateTimeFieldUpdateOperationsInput | Date | string
    waktuSelesai?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusTugasFieldUpdateOperationsInput | $Enums.StatusTugas
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HasilKerjaSiswaCreateManyPenugasanInput = {
    id?: string
    siswaId: string
    fileJawabanPdf?: string | null
    nilaiAkhir?: number | null
    statusPengerjaan?: string
    catatanGuru?: string | null
    waktuMulai?: Date | string | null
    waktuSelesai?: Date | string | null
  }

  export type HasilKerjaSiswaUpdateWithoutPenugasanInput = {
    id?: StringFieldUpdateOperationsInput | string
    siswaId?: StringFieldUpdateOperationsInput | string
    fileJawabanPdf?: NullableStringFieldUpdateOperationsInput | string | null
    nilaiAkhir?: NullableFloatFieldUpdateOperationsInput | number | null
    statusPengerjaan?: StringFieldUpdateOperationsInput | string
    catatanGuru?: NullableStringFieldUpdateOperationsInput | string | null
    waktuMulai?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    waktuSelesai?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type HasilKerjaSiswaUncheckedUpdateWithoutPenugasanInput = {
    id?: StringFieldUpdateOperationsInput | string
    siswaId?: StringFieldUpdateOperationsInput | string
    fileJawabanPdf?: NullableStringFieldUpdateOperationsInput | string | null
    nilaiAkhir?: NullableFloatFieldUpdateOperationsInput | number | null
    statusPengerjaan?: StringFieldUpdateOperationsInput | string
    catatanGuru?: NullableStringFieldUpdateOperationsInput | string | null
    waktuMulai?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    waktuSelesai?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type HasilKerjaSiswaUncheckedUpdateManyWithoutPenugasanInput = {
    id?: StringFieldUpdateOperationsInput | string
    siswaId?: StringFieldUpdateOperationsInput | string
    fileJawabanPdf?: NullableStringFieldUpdateOperationsInput | string | null
    nilaiAkhir?: NullableFloatFieldUpdateOperationsInput | number | null
    statusPengerjaan?: StringFieldUpdateOperationsInput | string
    catatanGuru?: NullableStringFieldUpdateOperationsInput | string | null
    waktuMulai?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    waktuSelesai?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}